// Vercel Function (web `fetch`-style API — see api/chat.ts for why a named
// method export, not a default export, is required here).
//
// The only thing allowed to touch `student_state` now that the anon key is
// locked out at the database (see supabase/schema.sql). Uses the Supabase
// service_role key — a server-only secret, never shipped to the browser via
// VITE_ — which bypasses RLS entirely, so this function is the sole gate.
//
// The caller's identity is never taken from the request body. It comes from
// verifying the bearer token against Supabase's auth server, so nobody can
// read or overwrite another student's row by editing a user_id in JSON.
//
// Requires SUPABASE_SERVICE_ROLE_KEY set in the host's env (Vercel project
// settings, not .env — it must never carry a VITE_ prefix or it would be
// bundled into client JS). Reuses VITE_SUPABASE_URL for the project URL.
import { createClient } from "@supabase/supabase-js";

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

// x-forwarded-for's first hop is client-supplied and trivially spoofed.
// x-vercel-forwarded-for (falling back to x-real-ip) is set by Vercel's own
// edge and stays correct even behind an extra proxy in front of Vercel:
// https://vercel.com/docs/headers/request-headers#x-vercel-forwarded-for
function clientIp(req: Request): string {
  const ip = req.headers.get("x-vercel-forwarded-for") || req.headers.get("x-real-ip");
  return ip?.split(",")[0]?.trim() || "unknown";
}

async function verifiedUserId(req: Request): Promise<string | null> {
  if (!url || !serviceKey) return null;
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return null;
  const admin = createClient(url, serviceKey);
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user.id;
}

// Cheap per-user throttle so a scripted loop can't self-mint anon Supabase
// sessions and fill the shared 500MB free-tier Postgres. Backed by the
// shared rate_limit_hit() RPC (see supabase/schema.sql) rather than an
// in-memory Map, so the limit is atomic across every instance and survives
// cold starts — same pattern as api/chat.ts and api/master-login.ts.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

// Per-user throttling alone can't stop many trial accounts from together
// filling the one shared 500MB free-tier Postgres project. This caps total
// state requests across all users/IPs in the same window, same global-cap
// pattern as GLOBAL_RATE_LIMIT_MAX in api/chat.ts and api/master-login.ts.
const GLOBAL_RATE_LIMIT_MAX = 300;

// In-memory fallback only, for when the RPC call itself errors (e.g. a
// transient Postgres blip) — same pattern as api/chat.ts and
// api/master-login.ts. Failing open here would hand an attacker an
// unthrottled write window at exactly the moment Postgres is already under
// strain.
const fallbackTimestamps = new Map<string, number[]>();

function isRateLimitedInMemory(key: string, max: number): boolean {
  const now = Date.now();
  for (const [k, timestamps] of fallbackTimestamps) {
    if (now - timestamps[timestamps.length - 1] >= RATE_LIMIT_WINDOW_MS) {
      fallbackTimestamps.delete(k);
    }
  }
  const recent = (fallbackTimestamps.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  fallbackTimestamps.set(key, recent);
  return recent.length > max;
}

async function isRateLimited(key: string, max: number = RATE_LIMIT_MAX): Promise<boolean> {
  const admin = createClient(url!, serviceKey!);
  const { data, error } = await admin.rpc("rate_limit_hit", {
    p_key: `state:${key}`,
    p_window_ms: RATE_LIMIT_WINDOW_MS,
    p_max: max,
  });
  if (error) {
    console.error("rate_limit_hit error:", error.message);
    return isRateLimitedInMemory(key, max);
  }
  return data === true;
}

export async function GET(req: Request): Promise<Response> {
  if (!isSameOrigin(req)) {
    return new Response("Forbidden", { status: 403 });
  }
  if (!url || !serviceKey) {
    return new Response("Cloud sync is not configured", { status: 503 });
  }
  // IP-throttle before the bearer token ever reaches Supabase's Auth API —
  // otherwise a same-origin flood of garbage tokens forces an unthrottled
  // flood of getUser() calls against the shared free-tier Auth quota.
  if (await isRateLimited(`ip:${clientIp(req)}`)) {
    return new Response("Too many requests", { status: 429 });
  }
  const userId = await verifiedUserId(req);
  if (!userId) return new Response("Unauthorized", { status: 401 });
  if (await isRateLimited(`user:${userId}`)) {
    return new Response("Too many requests", { status: 429 });
  }
  if (await isRateLimited("global", GLOBAL_RATE_LIMIT_MAX)) {
    return new Response("Too many requests", { status: 429 });
  }

  const admin = createClient(url, serviceKey);
  const { data, error } = await admin
    .from("student_state")
    .select("memory, chats, blobs, worksheets")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) {
    console.error("state GET failed:", error.message);
    return new Response("Sync failed", { status: 500 });
  }
  return Response.json(data ?? null);
}

export async function POST(req: Request): Promise<Response> {
  if (!isSameOrigin(req)) {
    return new Response("Forbidden", { status: 403 });
  }
  if (!url || !serviceKey) {
    return new Response("Cloud sync is not configured", { status: 503 });
  }
  // IP-throttle before the bearer token ever reaches Supabase's Auth API —
  // otherwise a same-origin flood of garbage tokens forces an unthrottled
  // flood of getUser() calls against the shared free-tier Auth quota.
  if (await isRateLimited(`ip:${clientIp(req)}`)) {
    return new Response("Too many requests", { status: 429 });
  }
  const userId = await verifiedUserId(req);
  if (!userId) return new Response("Unauthorized", { status: 401 });
  if (await isRateLimited(`user:${userId}`)) {
    return new Response("Too many requests", { status: 429 });
  }
  if (await isRateLimited("global", GLOBAL_RATE_LIMIT_MAX)) {
    return new Response("Too many requests", { status: 429 });
  }

  // Chat history is capped client-side at 80 messages (see src/lib/store.ts);
  // 200KB comfortably fits that plus journal memory, blobs and worksheets
  // while capping the per-IP abuse ceiling to ~4MB/min at the 20/min limit
  // above, instead of the old 1MB limit's ~20MB/min.
  const MAX_BODY_BYTES = 200_000;
  const text = await req.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    return new Response("Payload too large", { status: 413 });
  }

  let body: {
    memory?: unknown;
    chats?: unknown;
    blobs?: unknown;
    worksheets?: unknown;
  };
  try {
    body = JSON.parse(text);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const isPlainObject = (v: unknown): boolean =>
    typeof v === "object" && v !== null && !Array.isArray(v);
  if (
    (body.memory !== undefined && body.memory !== null && !isPlainObject(body.memory)) ||
    (body.chats !== undefined && !Array.isArray(body.chats)) ||
    (body.blobs !== undefined && !Array.isArray(body.blobs)) ||
    (body.worksheets !== undefined && !Array.isArray(body.worksheets))
  ) {
    return new Response("Invalid state shape", { status: 400 });
  }

  const admin = createClient(url, serviceKey);
  const { error } = await admin.from("student_state").upsert({
    user_id: userId,
    memory: body.memory ?? null,
    chats: body.chats ?? [],
    blobs: body.blobs ?? [],
    worksheets: body.worksheets ?? [],
    updated_at: new Date().toISOString(),
  });
  if (error) {
    console.error("state POST failed:", error.message);
    return new Response("Sync failed", { status: 500 });
  }
  return new Response(null, { status: 204 });
}
