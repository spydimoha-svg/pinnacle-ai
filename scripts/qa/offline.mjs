// offlineTutorReply() is what a class 10 student on a dead 4G connection
// actually sees when /api/chat is unreachable. It must stay honest about
// what it can't do offline (no diagrams, no plots) and keep pointing at the
// two pages that genuinely work offline: Library and Worksheets.
//
// ai.ts imports supabase.ts, which reads `import.meta.env` at module load —
// undefined under plain Node ESM, so this loads it through Vite's SSR module
// runner (same trick as routes.mjs) instead of a bare node import.
//
// Run: node scripts/qa/offline.mjs
import { createServer } from "vite";

const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
  appType: "custom",
  logLevel: "warn",
});
const { offlineTutorReply } = await vite.ssrLoadModule("/src/lib/ai.ts");

const SAMPLES = [
  "hi",
  "hello there",
  "can you explain photosynthesis",
  "draw me a graph of this function",
  "plot the sine curve for me",
  "",
];

const CODE_FENCE = /```(plot|mermaid)/i;
const DRAW_PROMISE = /let me draw/i;
const HELP_POINTER = /library|worksheets/i;

let failed = 0;

for (const lastMessage of SAMPLES) {
  const reply = offlineTutorReply(lastMessage);
  const problems = [];

  if (CODE_FENCE.test(reply)) problems.push("contains a plot/mermaid code fence it can't render offline");
  if (DRAW_PROMISE.test(reply)) problems.push("promises to draw something it can't deliver offline");
  if (!HELP_POINTER.test(reply)) problems.push("doesn't point to Library or Worksheets");

  const label = lastMessage === "" ? "(empty message)" : JSON.stringify(lastMessage);
  if (problems.length) {
    failed++;
    console.log(`  FAIL  ${label}\n        ${problems.join("\n        ")}`);
  } else {
    console.log(`  ok    ${label}`);
  }
}

await vite.close();
console.log(
  failed ? `\n${failed} sample(s) got a broken offline reply` : "\noffline fallback stays honest across all samples"
);
process.exit(failed ? 1 : 0);
