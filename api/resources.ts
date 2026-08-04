// Vercel Function (web `fetch`-style API — see api/chat.ts for why a named
// method export, not a default export, is required here).
//
// The only thing allowed to touch `school_resources` — the anon key has NO
// grant on this table at all (see supabase/schema.sql). Uses the Supabase
// service_role key, which bypasses RLS, so this function is the sole gate,
// and the gate it enforces is app_metadata.role === "admin" scoped to
// app_metadata.school_id: a school admin's materials are meant to be
// visible to every logged-in student of that school, but only an admin of
// that same school may read or write them, and app_metadata can only be set
// with the service-role key — never by the signed-in user themselves. Same
// pattern as Protected.tsx's admin route check.
import { createClient } from "@supabase/supabase-js";

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Same-origin only. Sec-Fetch-Site is set by the browser itself and can't be
// set by page JS or a fetch() call — but a raw HTTP client (curl, node fetch)
// can set it by hand too, since nothing stops a script from sending any
// header it likes. So it's never trusted alone: Origin *and* Referer must
// also genuinely match Host, which a script can forge individually but
// rarely bothers matching both to the real Host at once. Same check as
// api/chat.ts and api/state.ts.
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

type VerifiedAdmin = { id: string; schoolId: string };

// school_id lives in app_metadata (not user_metadata) for the same reason
// role does: only the service-role key can set it, so an admin can never
// grant themselves another school's scope by editing their own profile.
// x-forwarded-for's first hop is client-supplied and trivially spoofed.
// x-vercel-forwarded-for (falling back to x-real-ip) is set by Vercel's own
// edge and stays correct even behind an extra proxy in front of Vercel:
// https://vercel.com/docs/headers/request-headers#x-vercel-forwarded-for
function clientIp(req: Request): string {
  const ip = req.headers.get("x-vercel-forwarded-for") || req.headers.get("x-real-ip");
  return ip?.split(",")[0]?.trim() || "unknown";
}

async function verifiedAdmin(req: Request): Promise<VerifiedAdmin | null> {
  if (!url || !serviceKey) return null;
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return null;
  const admin = createClient(url, serviceKey);
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  if (data.user.app_metadata?.role !== "admin") return null;
  const schoolId = data.user.app_metadata?.school_id;
  if (typeof schoolId !== "string" || !schoolId) return null;
  return { id: data.user.id, schoolId };
}

// Same shared-Postgres rate limit as api/state.ts and api/master-login.ts —
// an in-memory Map's ceiling is per-instance, not global, under Vercel's
// horizontal scaling.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

const fallbackTimestamps = new Map<string, number[]>();

function isRateLimitedInMemory(key: string): boolean {
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
  return recent.length > RATE_LIMIT_MAX;
}

async function isRateLimited(key: string): Promise<boolean> {
  const admin = createClient(url!, serviceKey!);
  const { data, error } = await admin.rpc("rate_limit_hit", {
    p_key: `resources:${key}`,
    p_window_ms: RATE_LIMIT_WINDOW_MS,
    p_max: RATE_LIMIT_MAX,
  });
  if (error) {
    console.error("rate_limit_hit error:", error.message);
    return isRateLimitedInMemory(key);
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
  const adminAuth = await verifiedAdmin(req);
  if (!adminAuth) return new Response("Unauthorized", { status: 401 });
  if (await isRateLimited(`user:${adminAuth.id}`)) {
    return new Response("Too many requests", { status: 429 });
  }

  const admin = createClient(url, serviceKey);
  const { data, error } = await admin
    .from("school_resources")
    .select("data")
    .eq("school_id", adminAuth.schoolId);
  if (error) {
    console.error("resources GET failed:", error.message);
    return new Response("Sync failed", { status: 500 });
  }
  return Response.json((data ?? []).map((r) => r.data));
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
  const adminAuth = await verifiedAdmin(req);
  if (!adminAuth) return new Response("Unauthorized", { status: 401 });
  if (await isRateLimited(`user:${adminAuth.id}`)) {
    return new Response("Too many requests", { status: 429 });
  }

  const MAX_BODY_BYTES = 200_000;
  const text = await req.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    return new Response("Payload too large", { status: 413 });
  }

  let body: { resources?: unknown };
  try {
    body = JSON.parse(text);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (!Array.isArray(body.resources) || body.resources.length === 0) {
    return new Response("Invalid resources shape", { status: 400 });
  }

  const items = body.resources as {
    id?: unknown;
    schoolId?: unknown;
    url?: unknown;
  }[];
  const hasValidScheme = (value: unknown): boolean => {
    if (typeof value !== "string") return true;
    try {
      return ["http:", "https:"].includes(new URL(value).protocol);
    } catch {
      return false;
    }
  };
  if (
    items.some(
      (r) => typeof r.id !== "string" || !r.id || !hasValidScheme(r.url)
    )
  ) {
    return new Response("Invalid resources shape", { status: 400 });
  }
  // The caller's own school always wins over any schoolId in the body, so an
  // admin can never write into another school's rows by supplying its id.
  const rows = items.map((r) => ({
    id: r.id as string,
    school_id: adminAuth.schoolId,
    data: { ...r, schoolId: adminAuth.schoolId },
  }));

  const admin = createClient(url, serviceKey);
  const { error } = await admin.from("school_resources").upsert(rows);
  if (error) {
    console.error("resources POST failed:", error.message);
    return new Response("Sync failed", { status: 500 });
  }
  return new Response(null, { status: 204 });
}

export async function DELETE(req: Request): Promise<Response> {
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
  const adminAuth = await verifiedAdmin(req);
  if (!adminAuth) return new Response("Unauthorized", { status: 401 });
  if (await isRateLimited(`user:${adminAuth.id}`)) {
    return new Response("Too many requests", { status: 429 });
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  const admin = createClient(url, serviceKey);
  const { error } = await admin
    .from("school_resources")
    .delete()
    .eq("id", id)
    .eq("school_id", adminAuth.schoolId);
  if (error) {
    console.error("resources DELETE failed:", error.message);
    return new Response("Sync failed", { status: 500 });
  }
  return new Response(null, { status: 204 });
}
