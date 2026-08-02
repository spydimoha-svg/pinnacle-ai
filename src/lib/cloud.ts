// Cloud persistence for Pinnacle AI, backed by Supabase (Postgres, free tier).
//
// Every function here is a guarded no-op when Supabase isn't configured, so the
// app keeps working on localStorage alone. When it IS configured, a student's
// learning state (tutor memory, chat history, journal "blobs", worksheets) is
// mirrored to a real database — surviving a cache clear and following them
// across devices. localStorage stays as the instant-load cache and offline
// fallback; the cloud is the durable source of truth on login.
//
// The schools/resources helpers below are provided and ready (see
// supabase/schema.sql) but are not auto-wired yet — those stay local until you
// move auth server-side. See README for the next step.
import { supabase } from "./supabase";
import type {
  BlobEntry,
  ChatMessage,
  Resource,
  School,
  StudentMemory,
  Worksheet,
} from "./types";

/** The per-student payload mirrored to the `student_state` table (one row/user). */
export interface CloudUserData {
  memory: StudentMemory | null;
  chats: ChatMessage[];
  blobs: BlobEntry[];
  worksheets: Worksheet[];
}

// `student_state` is locked to the anon key at the database (see
// supabase/schema.sql) — the only door in is /api/state, which trusts nothing
// from the request body and instead verifies a Supabase-issued session token.
// That token comes from an anonymous Supabase Auth sign-in, kept one per app
// user (keyed by `userId`) in localStorage so the same student reusing this
// browser reuses the same server-verified identity, and a different student
// logging in on a shared machine gets their own. A stranger holding only the
// public anon key can mint a session of their own, but it only ever grants
// them their own empty row — never another student's.
function sessionKey(userId: string): string {
  return `pinnacle_cloud_session_${userId}`;
}

async function authToken(userId: string): Promise<string | null> {
  if (!supabase) return null;
  const key = sessionKey(userId);
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const saved = JSON.parse(stored) as {
        access_token: string;
        refresh_token: string;
      };
      const { data, error } = await supabase.auth.setSession(saved);
      if (!error && data.session) return data.session.access_token;
    } catch {
      /* stored session is corrupt or expired — fall through to a fresh one */
    }
  }
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.session) return null;
  localStorage.setItem(
    key,
    JSON.stringify({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    })
  );
  return data.session.access_token;
}

/**
 * Load a student's saved state. Returns null when Supabase is off OR no row
 * exists yet (a brand-new student) — in both cases the caller keeps local data.
 */
export async function loadUserData(userId: string): Promise<CloudUserData | null> {
  if (!supabase) return null;
  const token = await authToken(userId);
  if (!token) return null;
  const res = await fetch("/api/state", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data) return null;
  return {
    memory: (data.memory as StudentMemory | null) ?? null,
    chats: (data.chats as ChatMessage[] | null) ?? [],
    blobs: (data.blobs as BlobEntry[] | null) ?? [],
    worksheets: (data.worksheets as Worksheet[] | null) ?? [],
  };
}

/** Upsert a student's full state. Safe no-op when Supabase is off. */
export async function saveUserData(
  userId: string,
  payload: CloudUserData
): Promise<void> {
  if (!supabase) return;
  const token = await authToken(userId);
  if (!token) return;
  const res = await fetch("/api/state", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) console.warn("cloud saveUserData failed:", await res.text());
}

// ---------------------------------------------------------------------------
// Schools + school materials. Ready to use, not auto-synced yet (kept local
// until auth moves server-side). Wire these once you enable Supabase Auth.
// ---------------------------------------------------------------------------

interface SchoolRow {
  id: string;
  name: string;
  city: string;
  plan: School["plan"];
  price_per_student: number;
  students: number;
  joined: string;
  notes: string | null;
}

const rowToSchool = (r: SchoolRow): School => ({
  id: r.id,
  name: r.name,
  city: r.city,
  plan: r.plan,
  pricePerStudent: r.price_per_student,
  students: r.students,
  joined: r.joined,
  notes: r.notes ?? undefined,
});

export async function loadSchools(): Promise<School[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("schools").select("*");
  if (error || !data) return null;
  return (data as SchoolRow[]).map(rowToSchool);
}

export async function saveSchools(schools: School[]): Promise<void> {
  if (!supabase || schools.length === 0) return;
  const rows = schools.map((s) => ({
    id: s.id,
    name: s.name,
    city: s.city,
    plan: s.plan,
    price_per_student: s.pricePerStudent,
    students: s.students,
    joined: s.joined,
    notes: s.notes ?? null,
  }));
  const { error } = await supabase.from("schools").upsert(rows);
  if (error) console.warn("cloud saveSchools failed:", error.message);
}

export async function deleteSchool(id: string): Promise<void> {
  if (!supabase) return;
  await supabase.from("schools").delete().eq("id", id);
}

export async function loadSchoolResources(): Promise<Resource[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("school_resources").select("data");
  if (error || !data) return null;
  return (data as { data: Resource }[]).map((r) => r.data);
}

export async function saveSchoolResources(resources: Resource[]): Promise<void> {
  if (!supabase || resources.length === 0) return;
  const rows = resources.map((r) => ({
    id: r.id,
    school_id: r.schoolId ?? null,
    data: r,
  }));
  const { error } = await supabase.from("school_resources").upsert(rows);
  if (error) console.warn("cloud saveSchoolResources failed:", error.message);
}

export async function deleteSchoolResource(id: string): Promise<void> {
  if (!supabase) return;
  await supabase.from("school_resources").delete().eq("id", id);
}
