// Start the UI and the local brain together.
//
//   npm run dev:all
//
// `npm run dev` alone serves the UI but leaves /api/chat proxying to nothing,
// and the tutor reports itself offline — which looks like a broken tutor rather
// than a missing second process. This starts both and keeps them tied: kill one
// and the other goes with it, so there is never a stray brain holding :3002 or
// a GPU-resident model after the UI is gone.
//
// No `concurrently` dependency: two child_process spawns and a signal handler
// is the whole job, and the repo keeps its dependency list short on purpose.

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// npm on Windows is npm.cmd, and spawn without a shell will not find it.
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

const children = [];
let shuttingDown = false;

function start(name, args) {
  const child = spawn(npm, args, {
    cwd: ROOT,
    stdio: ["ignore", "inherit", "inherit"],
    shell: process.platform === "win32",
  });
  child.on("exit", (code) => {
    if (shuttingDown) return;
    // One half dying makes the other half useless and confusing — a UI with no
    // brain is exactly the "tutor is offline" state this script exists to stop.
    console.log(`\n[dev] ${name} exited (${code}) — shutting the other down too.`);
    shutdown(code ?? 1);
  });
  children.push({ name, child });
}

function shutdown(code) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const { child } of children) {
    if (!child.killed) child.kill();
  }
  process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

console.log("[dev] starting local brain (:3002) and vite (:5173)");
console.log("[dev] the brain needs Ollama running — `ollama serve`\n");
start("brain", ["run", "brain"]);
start("vite", ["run", "dev"]);
