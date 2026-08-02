#!/usr/bin/env node
// Guards daily student routes from pulling in the 3D/animation bundle.
// Runs a real `vite build` in memory (no files written) and walks the
// emitted chunk graph for each route entry, failing if three.js, gsap or
// the shader library end up reachable from a page a student hits every day.
import { build } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../..");

const ENTRY_PAGES = [
  "src/pages/app/Tutor.tsx",
  "src/pages/app/Dashboard.tsx",
  "src/pages/app/Chapter.tsx",
  "src/pages/app/Subjects.tsx",
];

const BANNED = ["three", "gsap", "@paper-design/shaders-react"];

function bannedPackage(moduleId) {
  if (!moduleId) return null;
  const normalized = moduleId.replace(/\\/g, "/");
  const marker = "/node_modules/";
  const at = normalized.lastIndexOf(marker);
  if (at === -1) return null;
  const rel = normalized.slice(at + marker.length);
  return BANNED.find((pkg) => rel === pkg || rel.startsWith(`${pkg}/`)) ?? null;
}

console.log("Running vite build to inspect the emitted chunk graph...");
const result = await build({ root, logLevel: "warn", build: { write: false, sourcemap: false } });
const outputs = Array.isArray(result) ? result.flatMap((r) => r.output) : result.output;

const chunksByFile = new Map();
for (const item of outputs) {
  if (item.type === "chunk") chunksByFile.set(item.fileName, item);
}

function entryChunkFor(pagePath) {
  const target = path.resolve(root, pagePath).replace(/\\/g, "/");
  for (const chunk of chunksByFile.values()) {
    if (chunk.facadeModuleId?.replace(/\\/g, "/") === target) return chunk;
  }
  return null;
}

let failed = false;

for (const page of ENTRY_PAGES) {
  const entry = entryChunkFor(page);
  if (!entry) {
    console.error(`FAIL ${page}: no emitted chunk found for this page (check the lazy import in App.tsx)`);
    failed = true;
    continue;
  }

  const queue = [entry];
  const seen = new Set([entry.fileName]);
  let offender = null;

  while (queue.length && !offender) {
    const chunk = queue.shift();
    const moduleIds = chunk.moduleIds ?? Object.keys(chunk.modules ?? {});
    for (const moduleId of moduleIds) {
      const pkg = bannedPackage(moduleId);
      if (pkg) {
        offender = { pkg, moduleId, via: chunk.fileName };
        break;
      }
    }
    if (offender) break;
    for (const fileName of [...(chunk.imports ?? []), ...(chunk.dynamicImports ?? [])]) {
      if (seen.has(fileName)) continue;
      seen.add(fileName);
      const next = chunksByFile.get(fileName);
      if (next) queue.push(next);
    }
  }

  if (offender) {
    console.error(`FAIL ${page}: chunk ${offender.via} pulls in "${offender.pkg}" via ${offender.moduleId}`);
    failed = true;
  } else {
    console.log(`OK   ${page}: no three/gsap/shaders reachable`);
  }
}

if (failed) {
  console.error("\nbundle guard failed");
  process.exit(1);
}
console.log("\nbundle guard passed");
