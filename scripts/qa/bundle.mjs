#!/usr/bin/env node
// Guards daily student routes from pulling in the 3D/animation bundle, and
// guards the master passcode from ever reaching a client chunk. Runs a real
// `vite build` in memory (no files written) and walks the emitted chunk
// graph for each route entry.
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

const MASTER_PAGES = [
  "src/pages/MasterAccess.tsx",
  "src/pages/master/MasterDashboard.tsx",
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

// Catches both the real secret (if the runner has it set, e.g. in CI) and
// any hardcoded stand-in someone pastes into client source regardless.
const MASTER_PASSCODE = process.env.MASTER_PASSCODE;
const PASSCODE_LITERAL = /MASTER_PASSCODE\s*[:=]\s*["'`]([^"'`]+)["'`]/;

function passcodeLeak(code) {
  if (MASTER_PASSCODE && code.includes(MASTER_PASSCODE)) return `contains the live MASTER_PASSCODE value`;
  const literal = code.match(PASSCODE_LITERAL);
  if (literal) return `hardcodes "${literal[0]}"`;
  return null;
}

function reachableChunks(entry, chunksByFile) {
  const queue = [entry];
  const seen = new Set([entry.fileName]);
  const chunks = [entry];
  while (queue.length) {
    const chunk = queue.shift();
    for (const fileName of [...(chunk.imports ?? []), ...(chunk.dynamicImports ?? [])]) {
      if (seen.has(fileName)) continue;
      seen.add(fileName);
      const next = chunksByFile.get(fileName);
      if (next) {
        chunks.push(next);
        queue.push(next);
      }
    }
  }
  return chunks;
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

for (const page of [...ENTRY_PAGES, ...MASTER_PAGES]) {
  const entry = entryChunkFor(page);
  if (!entry) {
    console.error(`FAIL ${page}: no emitted chunk found for this page (check the lazy import in App.tsx)`);
    failed = true;
    continue;
  }

  const chunks = reachableChunks(entry, chunksByFile);
  const checkBanned = ENTRY_PAGES.includes(page);

  let offender = null;
  if (checkBanned) {
    outer: for (const chunk of chunks) {
      const moduleIds = chunk.moduleIds ?? Object.keys(chunk.modules ?? {});
      for (const moduleId of moduleIds) {
        const pkg = bannedPackage(moduleId);
        if (pkg) {
          offender = { pkg, moduleId, via: chunk.fileName };
          break outer;
        }
      }
    }
  }

  if (offender) {
    console.error(`FAIL ${page}: chunk ${offender.via} pulls in "${offender.pkg}" via ${offender.moduleId}`);
    failed = true;
    continue;
  }

  let leak = null;
  for (const chunk of chunks) {
    const reason = passcodeLeak(chunk.code ?? "");
    if (reason) {
      leak = { via: chunk.fileName, reason };
      break;
    }
  }

  if (leak) {
    console.error(`FAIL ${page}: chunk ${leak.via} ${leak.reason}`);
    failed = true;
  } else {
    console.log(`OK   ${page}: no master passcode leak${checkBanned ? ", no three/gsap/shaders" : ""}`);
  }
}

if (failed) {
  console.error("\nbundle guard failed");
  process.exit(1);
}
console.log("\nbundle guard passed");
