// Vercel Function — see api/chat.ts for why this must be a named POST export.
//
// Server-side counterpart to Login.tsx's trial signup. Performs the same
// signInAnonymously()+updateUser() link that used to run in the browser with
// the public anon key — unthrottled and scriptable straight off the bundle —
// but here with the service-role key and behind the same origin check and
// per-IP rate limit as api/chat.ts, so a loop can't mint unlimited anonymous
// Auth users and drain the project's shared free-tier quota.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Same-origin only. Origin can't be set by page JS or a fetch() call, so it
// already blocks browser-forged cross-site requests on its own — a raw HTTP
// client (curl, node fetch) can still forge it, but that's true of every
// header. Referer is checked too when the browser sends one, since a script
// forging Origin alone rarely bothers matching Referer to the real Host too
// — but Referer isn't required, since privacy browsers and extensions
// (Brave, Firefox strict mode, many ad-blockers) strip it by default and
// would otherwise lock real students out for a header their own browser
// removed. Same check as api/chat.ts.
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
  const referer = req.headers.get("referer");
  return (
    matchesHost(req.headers.get("origin")) && (!referer || matchesHost(referer))
  );
}

// Per-IP throttle on trial signups. Same window as api/chat.ts, but a lower
// ceiling — a real student only ever signs up once.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

// Per-IP alone lets a botnet spread across many IPs keep minting anonymous
// Auth users. This caps total signups across all IPs in the same window,
// regardless of source, guarding the shared Supabase Auth free-tier quota —
// same global-cap pattern as GLOBAL_RATE_LIMIT_MAX in api/chat.ts.
const GLOBAL_RATE_LIMIT_MAX = 100;

// In-memory fallback only: used when Supabase isn't configured at all, so
// there's no shared store to throttle against. Same caveat as api/chat.ts —
// this Map doesn't survive a cold start or span concurrent instances, but the
// real counter lives in Postgres via rate_limit_hit() whenever Supabase is
// configured (which is also the only case this endpoint has anything to do).
const fallbackTimestamps = new Map<string, number[]>();

function isRateLimitedInMemory(key: string, max: number): boolean {
  const now = Date.now();
  const recent = (fallbackTimestamps.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  fallbackTimestamps.set(key, recent);
  return recent.length > max;
}

async function isRateLimited(key: string, max: number = RATE_LIMIT_MAX): Promise<boolean> {
  if (!supabaseUrl || !supabaseServiceKey) return isRateLimitedInMemory(key, max);
  const admin = createClient(supabaseUrl, supabaseServiceKey);
  const { data, error } = await admin.rpc("rate_limit_hit", {
    p_key: `signup:${key}`,
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
  if (await isRateLimited(`ip:${clientIp(req)}`)) {
    return new Response("Too many requests", { status: 429 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    // Cloud sync isn't configured — the caller's local trial account stands
    // alone, same as the old client-side linkTrialCloudProfile's no-op path.
    return Response.json({ confirmed: true });
  }

  const MAX_BODY_BYTES = 10_000;
  const text = await req.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    return new Response("Payload too large", { status: 413 });
  }

  let body: {
    name?: string;
    email?: string;
    password?: string;
    classLevel?: number;
    schoolId?: string;
  };
  try {
    body = JSON.parse(text);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!name || !email || password.length < 6) {
    return new Response("Invalid request", { status: 400 });
  }

  if (await isRateLimited("global", GLOBAL_RATE_LIMIT_MAX)) {
    return new Response("Too many requests", { status: 429 });
  }

  const admin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  try {
    const { data: anon } = await admin.auth.signInAnonymously();
    if (!anon.session) return Response.json({ confirmed: true });
    const { data: updated, error } = await admin.auth.updateUser({
      email,
      password,
      data: {
        name,
        classLevel: typeof body.classLevel === "number" ? body.classLevel : null,
        schoolId: typeof body.schoolId === "string" ? body.schoolId : null,
      },
    });
    // Fails open (confirmed: true) on any cloud error — same as the old
    // linkTrialCloudProfile — so a flaky connection never blocks the local
    // trial account.
    if (error) return Response.json({ confirmed: true });
    return Response.json({ confirmed: Boolean(updated.user?.email_confirmed_at) });
  } catch {
    return Response.json({ confirmed: true });
  }
}
