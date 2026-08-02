// Cloud persistence for Pinnacle AI, backed by Supabase (Postgres, free tier).
//
// Every function here is a guarded no-op when Supabase isn't configured, so the
// app keeps working on localStorage alone. When it IS configured, a student's
// learning state (tutor memory, chat history, journal "blobs", worksheets) is
// mirrored to a real database — surviving a cache clear and following them
// across devices. localStorage stays as the instant-load cache and offline
// fallback; the cloud is the durable source of truth on login.
//
// The school_resources helpers below are provided and ready (see
// supabase/schema.sql) but are not auto-wired yet — those stay local until you
// move auth server-side. See README for the next step.
import { supabase } from "./supabase";
import type {
  BlobEntry,
  ChatMessage,
  Resource,
  StudentMemory,
  Worksheet,
} from "./types";
import type { LearnerProfile } from "./learner";

/** The per-student payload mirrored to the `student_state` table (one row/user). */
export interface CloudUserData {
  memory: StudentMemory | null;
  chats: ChatMessage[];
  blobs: BlobEntry[];
  worksheets: Worksheet[];
  profile?: LearnerProfile | null;
}

// `student_state` is locked to the anon key at the database (see
// supabase/schema.sql) — the only door in is /api/state, which trusts nothing
// from the request body and instead verifies a Supabase-issued session token.
// That token comes from a Supabase Auth identity keyed to the student's own
// email+password, so the SAME identity — and the same student_state row — is
// reachable from any browser or after a cache clear, not just the one that
// created it. A cached session is kept per app user (keyed by `userId`) in
// localStorage purely to skip a network round trip on repeat visits; when it's
// missing or stale, signing back in with the student's own credentials is what
// recovers the original identity instead of minting a fresh, empty one.
function sessionKey(userId: string): string {
  return `pinnacle_cloud_session_${userId}`;
}

// How long to back off after a failed email link before minting another
// anonymous identity for the same user — without this, a losing device in a
// two-device race retries signInAnonymously()+updateUser() on every sync and
// burns a fresh Supabase Auth user each time.
const LINK_COOLDOWN_MS = 5 * 60 * 1000;

function linkCooldownKey(userId: string): string {
  return `${sessionKey(userId)}_link_cooldown`;
}

async function authToken(
  userId: string,
  email: string,
  password: string
): Promise<string | null> {
  if (!supabase) return null;
  const key = sessionKey(userId);
  const stored = localStorage.getItem(key);
  const hadStoredSession = Boolean(stored);
  try {
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
    // No usable local session — a new device, or this one had storage cleared.
    // Sign in with the student's own credentials first, so this lands back on
    // the SAME Supabase identity (and student_state row) as before.
    const signedIn = await supabase.auth.signInWithPassword({ email, password });
    let session = signedIn.data.session;
    if (!session) {
      // First time this student's data has ever synced anywhere: create the
      // identity and link these credentials to it, so the next device can
      // find it via signInWithPassword instead of getting a fresh empty one.
      const cdKey = linkCooldownKey(userId);
      if (Date.now() < Number(localStorage.getItem(cdKey) || 0)) return null;
      if (hadStoredSession) {
        console.warn(
          `cloud authToken: stored session for user ${userId} failed to restore and signInWithPassword did not recover it — minting a new anonymous identity, previous student_state row may be orphaned`
        );
      }
      const anon = await supabase.auth.signInAnonymously();
      session = anon.data.session;
      if (session) {
        const { error: linkError } = await supabase.auth.updateUser({
          email,
          password,
        });
        if (linkError) {
          localStorage.setItem(cdKey, String(Date.now() + LINK_COOLDOWN_MS));
          console.warn(
            `cloud authToken: linking credentials to new anonymous identity for user ${userId} failed — refusing to persist an orphaned session:`,
            linkError.message
          );
          return null;
        }
      }
    }
    if (!session) return null;
    localStorage.setItem(
      key,
      JSON.stringify({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      })
    );
    return session.access_token;
  } catch {
    // Network unreachable (flaky 4G, offline) — fall back to local-only.
    return null;
  }
}

/**
 * Load a student's saved state. Returns null when Supabase is off OR no row
 * exists yet (a brand-new student) — in both cases the caller keeps local data.
 */
export async function loadUserData(
  userId: string,
  email: string,
  password: string
): Promise<CloudUserData | null> {
  if (!supabase) return null;
  const token = await authToken(userId, email, password);
  if (!token) return null;
  try {
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
      profile: (data.learner_profile as LearnerProfile | null) ?? null,
    };
  } catch {
    // Network unreachable — caller keeps local data.
    return null;
  }
}

/** Upsert a student's full state. Safe no-op when Supabase is off. */
export async function saveUserData(
  userId: string,
  email: string,
  password: string,
  payload: CloudUserData
): Promise<void> {
  if (!supabase) return;
  const token = await authToken(userId, email, password);
  if (!token) return;
  try {
    const res = await fetch("/api/state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.warn("cloud saveUserData failed:", await res.text());
  } catch (err) {
    // Network unreachable — local state stays the source of truth for now.
    console.warn("cloud saveUserData unreachable:", err);
  }
}

// school_resources has no anon-key grant at all (see supabase/schema.sql) —
// the only door in is /api/resources, which trusts nothing from the request
// and instead verifies the caller's Supabase bearer token carries
// app_metadata.role === "admin" before touching the table. That token is the
// same one Login.tsx stores under this key on admin sign-in (see
// Protected.tsx) — a student never has it, so these become no-ops for them
// instead of a network call an unauthorized caller could probe.
const ADMIN_TOKEN_KEY = "pinnacle-admin-token";

export async function loadSchoolResources(): Promise<Resource[] | null> {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!token) return null;
  try {
    const res = await fetch("/api/resources", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return (await res.json()) as Resource[];
  } catch {
    return null;
  }
}

export async function saveSchoolResources(resources: Resource[]): Promise<void> {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!token || resources.length === 0) return;
  try {
    const res = await fetch("/api/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ resources }),
    });
    if (!res.ok) console.warn("cloud saveSchoolResources failed:", await res.text());
  } catch (err) {
    console.warn("cloud saveSchoolResources unreachable:", err);
  }
}

export async function deleteSchoolResource(id: string): Promise<void> {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!token) return;
  try {
    const res = await fetch(`/api/resources?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) console.warn("cloud deleteSchoolResource failed:", await res.text());
  } catch (err) {
    console.warn("cloud deleteSchoolResource unreachable:", err);
  }
}
