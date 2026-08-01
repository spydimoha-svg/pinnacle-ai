// Runs the figure-engine checks through Vite's SSR loader (see scripts/qa.mjs).
import { createServer } from "vite";

const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
  appType: "custom",
  logLevel: "warn",
});
try {
  const mod = await vite.ssrLoadModule("/scripts/qa/figures.ts");
  const failed = mod.main();
  await vite.close();
  process.exit(failed > 0 ? 1 : 0);
} catch (err) {
  console.error(err);
  await vite.close();
  process.exit(2);
}
