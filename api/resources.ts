// Vercel Function (web `fetch`-style API — see api/chat.ts for why a named
// method export, not a default export, is required here).
//
// The only thing allowed to touch `school_resources` — the anon key has NO
// grant on this table at all (see supabase/schema.sql). Uses the Supabase
// service_role key, which bypasses RLS, so this function is the sole gate,
// and the gate it enforces is app_metadata.role === "admin": a school
// admin's materials are meant to be visible to every logged-in student, but
// only an admin may write them, and app_metadata can only be set with the
// service-role key — never by the signed-in user themselves. Same pattern
// as Protected.tsx's admin route check.
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

async function verifiedAdminId(req: Request): Promise<string | null> {
  if (!url || !serviceKey) return null;
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return null;
  const admin = createClient(url, serviceKey);
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  if (data.user.app_metadata?.role !== "admin") return null;
  return data.user.id;
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
  const adminId = await verifiedAdminId(req);
  if (!adminId) return new Response("Unauthorized", { status: 401 });
  if (await isRateLimited(`user:${adminId}`)) {
    return new Response("Too many requests", { status: 429 });
  }

  const admin = createClient(url, serviceKey);
  const { data, error } = await admin.from("school_resources").select("data");
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
  const adminId = await verifiedAdminId(req);
  if (!adminId) return new Response("Unauthorized", { status: 401 });
  if (await isRateLimited(`user:${adminId}`)) {
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

  const items = body.resources as { id?: unknown; schoolId?: unknown }[];
  if (items.some((r) => typeof r.id !== "string" || !r.id)) {
    return new Response("Invalid resources shape", { status: 400 });
  }
  const rows = items.map((r) => ({
    id: r.id as string,
    school_id: typeof r.schoolId === "string" ? r.schoolId : null,
    data: r,
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
  const adminId = await verifiedAdminId(req);
  if (!adminId) return new Response("Unauthorized", { status: 401 });
  if (await isRateLimited(`user:${adminId}`)) {
    return new Response("Too many requests", { status: 429 });
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  const admin = createClient(url, serviceKey);
  const { error } = await admin.from("school_resources").delete().eq("id", id);
  if (error) {
    console.error("resources DELETE failed:", error.message);
    return new Response("Sync failed", { status: 500 });
  }
  return new Response(null, { status: 204 });
}
