// Drives a whole simulated lesson through the real engine (see scripts/qa.mjs).
import { createServer } from "vite";

const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
  appType: "custom",
  logLevel: "warn",
});
try {
  const mod = await vite.ssrLoadModule("/scripts/qa/lesson.ts");
  // --dry proves the engine offline; without it the run also talks to the API.
  const problems = process.argv.includes("--dry") ? mod.dry() : await mod.main();
  await vite.close();
  process.exit(problems > 0 ? 1 : 0);
} catch (err) {
  console.error(err);
  await vite.close();
  process.exit(2);
}
