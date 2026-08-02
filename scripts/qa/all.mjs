// Runs the QA scripts that catch data loss, SSR crashes, bundle bloat and
// the open-chat risk. None of these have a caller of their own, so wire
// them into one gate that fails loud when any of them does.
//
// Run: node scripts/qa/all.mjs
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const CHECKS = ["sync.mjs", "routes.mjs", "bundle.mjs", "api-access.mjs"];

const results = CHECKS.map((script) => {
  console.log(`\n=== ${script} ===`);
  const { status } = spawnSync(process.execPath, [path.join(dir, script)], { stdio: "inherit" });
  return { script, pass: status === 0 };
});

console.log("\n=== summary ===");
for (const { script, pass } of results) {
  console.log(`  ${pass ? "PASS" : "FAIL"}  ${script}`);
}

const failed = results.filter((r) => !r.pass);
process.exit(failed.length ? 1 : 0);
