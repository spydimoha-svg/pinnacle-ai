// Vercel Function (web `fetch`-style API — see api/chat.ts for why a named
// method export, not a default export, is required here).
//
// Self-serve DPDP right-to-erasure: deletes the caller's own auth.users row,
// which cascades to student_state via the on_auth_user_deleted trigger (see
// supabase/schema.sql). Same service_role-gated, token-verified pattern as
// api/state.ts — the caller's identity is never taken from the request body,
// only from a bearer token verified against Supabase's auth server, so
// nobody can delete another student's account by editing a user_id in JSON.
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
// edge and stays correct even behind an extra proxy in front of Vercel.
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

// Low ceiling — a real student deletes their account once. Backed by the
// shared rate_limit_hit() RPC (see supabase/schema.sql) so the limit is
// atomic across every instance, same pattern as api/state.ts.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

// Per-user throttling alone can't stop many compromised tokens or a
// client-side retry bug from together hammering deleteUser() at once. This
// caps total deletes across all users/IPs in the same window, same
// global-cap pattern as GLOBAL_RATE_LIMIT_MAX in api/state.ts.
const GLOBAL_RATE_LIMIT_MAX = 20;

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
  const admin = createClient(url!, serviceKey!);
  const { data, error } = await admin.rpc("rate_limit_hit", {
    p_key: `delete-account:${key}`,
    p_window_ms: RATE_LIMIT_WINDOW_MS,
    p_max: max,
  });
  if (error) {
    console.error("rate_limit_hit error:", error.message);
    return isRateLimitedInMemory(key, max);
  }
  return data === true;
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
  if (await isRateLimited("global", GLOBAL_RATE_LIMIT_MAX)) {
    return new Response("Too many requests", { status: 429 });
  }

  const admin = createClient(url, serviceKey);
  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) {
    console.error("delete-account failed:", error.message);
    return new Response("Delete failed", { status: 500 });
  }
  return new Response(null, { status: 204 });
}
