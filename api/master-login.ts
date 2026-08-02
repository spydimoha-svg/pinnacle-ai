// Vercel Function — see api/chat.ts for why this must be a named POST export.
//
// Server-side gate for the hidden /summit console. The passcode lives only in
// the MASTER_PASSCODE env var (never shipped to the client) and is also used
// as the HMAC key for the session token, so no extra secret needs configuring.
import { createHmac, timingSafeEqual } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const TOKEN_TTL_MS = 30 * 60 * 1000;
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Same-origin only. Sec-Fetch-Site is set by the browser itself and can't be
// set by page JS or a fetch() call — but a raw HTTP client (curl, node fetch)
// can set it by hand too, since nothing stops a script from sending any
// header it likes. So it's never trusted alone: Origin *and* Referer must
// also genuinely match Host, which a script can forge individually but
// rarely bothers matching both to the real Host at once. Same check as
// api/chat.ts.
function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;
  const matchesHost = (value: string | null) => {
    if (!value) return false;
    try {
      return new URL(value).host === host;
    } catch {
      return false;
    }
  };
  return (
    matchesHost(req.headers.get("origin")) &&
    matchesHost(req.headers.get("referer"))
  );
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function issueToken(secret: string): string {
  const payload = String(Date.now() + TOKEN_TTL_MS);
  return `${payload}.${sign(payload, secret)}`;
}

function verifyToken(token: string, secret: string): boolean {
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !/^\d+$/.test(payload)) return false;
  const expected = Buffer.from(sign(payload, secret));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return false;
  }
  return Number(payload) > Date.now();
}

// Per-IP throttle on passcode attempts so MASTER_PASSCODE can't be brute
// forced by scripting POSTs. Same pattern as api/chat.ts's rate limit.
const RATE_LIMIT_WINDOW_MS = 5 * 60_000;
const RATE_LIMIT_MAX = 5;

// The verify branch just checks a token's HMAC signature — it doesn't attempt
// the passcode, so it gets its own generous budget under a separate key.
// Otherwise a team member re-mounting Protected.tsx across a few /master
// pages burns the same 5-per-5-minute budget meant to stop passcode
// brute-forcing and locks themselves out of their own console.
const VERIFY_RATE_LIMIT_MAX = 60;

// In-memory fallback only: used when Supabase isn't configured at all, so
// there's no shared store to throttle against. When Supabase IS configured,
// the module-level Map is not enough — Vercel resets it on every cold start
// and keeps it separate per concurrent instance, letting a brute-forcer get
// a fresh attempt budget for free. The real counter lives in Postgres via
// rate_limit_hit() (see supabase/schema.sql), shared and updated atomically
// across every instance.
const attemptTimestamps = new Map<string, number[]>();

function isRateLimitedInMemory(key: string, max: number): boolean {
  const now = Date.now();
  const recent = (attemptTimestamps.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  attemptTimestamps.set(key, recent);
  return recent.length > max;
}

async function isRateLimited(key: string, max: number): Promise<boolean> {
  if (!supabaseUrl || !supabaseServiceKey) return isRateLimitedInMemory(key, max);
  const admin = createClient(supabaseUrl, supabaseServiceKey);
  const { data, error } = await admin.rpc("rate_limit_hit", {
    p_key: key,
    p_window_ms: RATE_LIMIT_WINDOW_MS,
    p_max: max,
  });
  if (error) {
    console.error("rate_limit_hit error:", error.message);
    return isRateLimitedInMemory(key, max);
  }
  return data === true;
}

// x-forwarded-for's first hop is client-supplied and trivially spoofed.
// x-vercel-forwarded-for (falling back to x-real-ip) is set by Vercel's own
// edge and stays correct even behind an extra proxy in front of Vercel.
function clientIp(req: Request): string {
  const ip = req.headers.get("x-vercel-forwarded-for") || req.headers.get("x-real-ip");
  return ip?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request): Promise<Response> {
  if (!isSameOrigin(req)) {
    return new Response("Forbidden", { status: 403 });
  }

  const secret = process.env.MASTER_PASSCODE;
  if (!secret) {
    return new Response("Master access not configured", { status: 503 });
  }

  let body: { passcode?: string; verify?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const ip = clientIp(req);

  if (typeof body.verify === "string") {
    if (await isRateLimited(`master-login:verify:${ip}`, VERIFY_RATE_LIMIT_MAX)) {
      return new Response("Too many attempts", { status: 429 });
    }
    return Response.json({ valid: verifyToken(body.verify, secret) });
  }

  if (await isRateLimited(`master-login:${ip}`, RATE_LIMIT_MAX)) {
    return new Response("Too many attempts", { status: 429 });
  }

  const given = typeof body.passcode === "string" ? Buffer.from(body.passcode.trim().toUpperCase()) : Buffer.alloc(0);
  const expected = Buffer.from(secret.trim().toUpperCase());
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return new Response("Invalid passcode", { status: 401 });
  }
  return Response.json({ token: issueToken(secret) });
}
