import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Local dev runs the UI on plain `vite`, and the tutor's /api/chat is served
    // by the local keyless brain (scripts/ollama-dev-server.mjs on :3002), which
    // streams from a local Ollama model. No key, no daily limit. Start it with
    // `node scripts/ollama-dev-server.mjs`. Dev-only: no effect on the prod build.
    proxy: {
      "/api": {
        target: "http://localhost:3002",
        changeOrigin: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 900,
  },
});
