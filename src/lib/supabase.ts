// Supabase client for Pinnacle AI's cloud database (free tier: Postgres).
//
// This is OPTIONAL and additive. If the two env vars below are not set, the app
// runs exactly as before with localStorage only. When they are set, student
// learning data, schools, and school materials sync to a real Postgres database
// so they survive a cache clear and follow the student across devices.
//
// Set in a local `.env` (for `vercel dev`) and in your host's env vars:
//   VITE_SUPABASE_URL       = https://<project-ref>.supabase.co
//   VITE_SUPABASE_ANON_KEY  = <the anon/public key>
// Run supabase/schema.sql once in the Supabase SQL editor to create the tables.
//
// The @supabase/supabase-js SDK is a dynamic import, not a static one, so its
// ~100KB never lands in the entry chunk every visitor downloads — only pages
// that actually reach this module's cloud-enabled branch (post-login) fetch it.
import type { SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True when a Supabase project is configured. Guards every cloud call. */
export const cloudEnabled = (): boolean => Boolean(url && anonKey);

export const supabase: SupabaseClient | null = cloudEnabled()
  ? (await import("@supabase/supabase-js")).createClient(url as string, anonKey as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;
