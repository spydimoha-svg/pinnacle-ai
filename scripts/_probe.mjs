import { readFileSync } from "node:fs";
for (const line of readFileSync(".env","utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/); if (m) process.env[m[1]] = m[2].trim();
}
const { createServer } = await import("vite");
const v = await createServer({ configFile:false, server:{middlewareMode:true,hmr:false,watch:null}, optimizeDeps:{noDiscovery:true}, appType:"custom", logLevel:"warn" });
const m = await v.ssrLoadModule("/scripts/qa/_probe.ts");
m.main(); await v.close();
