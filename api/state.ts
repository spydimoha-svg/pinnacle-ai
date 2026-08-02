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

export async function GET(req: Request): Promise<Response> {
  if (!url || !serviceKey) {
    return new Response("Cloud sync is not configured", { status: 503 });
  }
  const userId = await verifiedUserId(req);
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const admin = createClient(url, serviceKey);
  const { data, error } = await admin
    .from("student_state")
    .select("memory, chats, blobs, worksheets")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) return new Response(error.message, { status: 500 });
  return Response.json(data ?? null);
}

export async function POST(req: Request): Promise<Response> {
  if (!url || !serviceKey) {
    return new Response("Cloud sync is not configured", { status: 503 });
  }
  const userId = await verifiedUserId(req);
  if (!userId) return new Response("Unauthorized", { status: 401 });

  let body: {
    memory?: unknown;
    chats?: unknown;
    blobs?: unknown;
    worksheets?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
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
  if (error) return new Response(error.message, { status: 500 });
  return new Response(null, { status: 204 });
}
