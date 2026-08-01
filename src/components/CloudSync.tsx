// Invisible component that keeps the signed-in student's learning state in sync
// with the Supabase cloud database. Mounted once at the app root.
//
// Behaviour:
//   - Supabase not configured  -> renders null, does nothing (localStorage only).
//   - On login / refresh        -> pulls that student's saved state from the
//                                  cloud (cloud wins) when a row exists.
//   - On any change             -> debounced push of the student's state up.
//
// It never blocks the UI and never throws into the render tree.
import { useEffect, useRef } from "react";
import { useStore } from "../lib/store";
import { cloudEnabled } from "../lib/supabase";
import { loadUserData, saveUserData, type CloudUserData } from "../lib/cloud";

const DEBOUNCE_MS = 1500;

function snapshot(userId: string): CloudUserData {
  const s = useStore.getState();
  return {
    memory: s.memories[userId] ?? null,
    chats: s.chats[userId] ?? [],
    blobs: s.blobs[userId] ?? [],
    worksheets: s.worksheets[userId] ?? [],
  };
}

export default function CloudSync() {
  const userId = useStore((s) => s.currentUser?.id ?? null);
  const role = useStore((s) => s.currentUser?.role ?? null);
  const lastPushed = useRef<string>("");

  // Hydrate this student's state from the cloud on login / refresh.
  useEffect(() => {
    if (!cloudEnabled() || !userId || role !== "student") return;
    let cancelled = false;
    (async () => {
      const data = await loadUserData(userId);
      if (cancelled || !data) return; // no cloud row yet -> keep local, it'll push up
      useStore.getState().applyCloudUserData(userId, data);
      // Don't immediately echo the freshly-pulled state back to the cloud.
      lastPushed.current = JSON.stringify(snapshot(userId));
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, role]);

  // Push changes up (debounced) whenever the student's slice changes.
  useEffect(() => {
    if (!cloudEnabled() || !userId || role !== "student") return;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const unsub = useStore.subscribe(() => {
      const current = useStore.getState().currentUser;
      if (!current || current.id !== userId) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const payload = snapshot(userId);
        const sig = JSON.stringify(payload);
        if (sig === lastPushed.current) return;
        lastPushed.current = sig;
        void saveUserData(userId, payload);
      }, DEBOUNCE_MS);
    });

    return () => {
      if (timer) clearTimeout(timer);
      unsub();
    };
  }, [userId, role]);

  return null;
}
