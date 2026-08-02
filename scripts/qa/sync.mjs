// Proves (or disproves) that cloud sync merges instead of clobbering.
//
// CloudSync.tsx pulls the cloud row on login and hands it to
// applyCloudUserData in src/lib/store.ts with no timestamp check — cloud
// always wins. A student who progresses locally while a push failed or was
// still debounced can have that progress erased by the next login's pull.
// This drives the real store (no mocks) through exactly that sequence.
import { createServer } from "vite";

// zustand's persist middleware reads/writes localStorage at store-creation
// time; Node has none, so stub a bare in-memory one before the module loads.
const mem = new Map();
global.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => void mem.set(k, String(v)),
  removeItem: (k) => void mem.delete(k),
  clear: () => mem.clear(),
};

const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
  appType: "custom",
  logLevel: "warn",
});

let fail = 0;
try {
  const { useStore } = await vite.ssrLoadModule("/src/lib/store.ts");

  const userId = "qa-sync-student";
  useStore.setState({
    currentUser: { id: userId, name: "QA", email: "qa@test", password: "x", role: "student", classLevel: 10 },
  });

  // Local progress the student earned since the last successful cloud push.
  useStore.getState().recordProgress({
    chapterId: "real-numbers",
    status: "mastered",
    confidence: 90,
    lastStudied: "2026-08-02",
  });

  const beforeProgress = useStore.getState().memories[userId]?.progress ?? {};
  if (!beforeProgress["real-numbers"]) {
    console.log("  FAIL  setup: local progress was not recorded");
    fail++;
  } else {
    console.log("  ok    local progress recorded before sync");
  }

  // An older/empty cloud snapshot — e.g. the row from before this chapter
  // was studied, or a push that never landed.
  const staleCloud = {
    memory: {
      name: "QA",
      classLevel: 10,
      mode: "board",
      examTargets: [],
      achievements: [],
      strengths: [],
      focusAreas: [],
      streak: 1,
      altitude: 0,
      lastTopics: [],
      notes: [],
      progress: {},
    },
    chats: [],
    blobs: [],
    worksheets: [],
  };
  useStore.getState().applyCloudUserData(userId, staleCloud);

  const afterProgress = useStore.getState().memories[userId]?.progress ?? {};
  if (!afterProgress["real-numbers"]) {
    console.log("  FAIL  applyCloudUserData clobbered newer local progress with a stale cloud snapshot");
    fail++;
  } else {
    console.log("  ok    local progress survived an older cloud snapshot");
  }
} catch (err) {
  console.error(err);
  fail++;
} finally {
  await vite.close();
}

console.log(fail === 0 ? "\ncloud sync merge check passed" : `\n${fail} failed`);
process.exit(fail ? 1 : 0);
