// Bootstrap for the tutor audit.
//
// The audit has to import the app's REAL modules (persona.ts, grounding.ts,
// figure.ts) or it would be auditing a copy of the app rather than the app.
// Vite is already a dev dependency, so its SSR module loader runs the
// TypeScript directly — no extra tooling, no build step, nothing to keep in
// sync.
import { createServer } from "vite";

const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
  appType: "custom",
  logLevel: "warn",
});

try {
  const mod = await vite.ssrLoadModule("/scripts/qa/run.ts");
  const blockers = await mod.main();
  await vite.close();
  process.exit(blockers > 0 ? 1 : 0);
} catch (err) {
  console.error(err);
  await vite.close();
  process.exit(2);
}
