// Drives the cinematic journey engine through the real code (see scripts/qa/journey.ts).
import { createServer } from "vite";

const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
  appType: "custom",
  logLevel: "warn",
});
try {
  const mod = await vite.ssrLoadModule("/scripts/qa/journey.ts");
  const problems = mod.dry();
  await vite.close();
  process.exit(problems > 0 ? 1 : 0);
} catch (err) {
  console.error(err);
  await vite.close();
  process.exit(2);
}
