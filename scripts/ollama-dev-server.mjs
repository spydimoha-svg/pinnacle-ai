// Local, keyless brain for Pinnacle AI dev.
//
// Plain `vite` serves the UI but can't run the /api serverless function, and
// the free cloud providers have daily limits. This tiny server answers
// POST /api/chat by streaming from a local Ollama model — no key, no limit.
// vite.config.ts proxies /api to it (http://localhost:3002), so the app's
// tutor and video studio talk to Ollama unchanged.
//
// Run:  node scripts/ollama-dev-server.mjs
//
// GPU notes (RTX 500 Ada, 4 GB): the 3B model + an 8k KV cache is ~2.5 GB, so
// it lives fully on the GPU. We pass num_gpu:99 to force full offload and use
// ONE options object for both the warm-up and every request, so Ollama loads
// the model exactly once and never reloads mid-session (a config change is what
// triggers the ~10s reload). For extra speed you can start the Ollama server
// itself with OLLAMA_FLASH_ATTENTION=1 and OLLAMA_KV_CACHE_TYPE=q8_0.
import http from "node:http";

const OLLAMA_CHAT = "http://localhost:11434/api/chat";
const MODEL = process.env.OLLAMA_MODEL || "qwen2.5:3b-instruct";
// 1600 to match the cloud default. At 900 a full tutor answer — explanation,
// figure, worked steps, closing question — was being cut off mid-sentence, and
// a truncated figure block is exactly what leaks half-drawn text art. Local
// inference has no rate limit, so the only cost of the higher ceiling is a
// second or two.
const MAX_TOKENS = Number(process.env.AI_MAX_TOKENS || 1600);
// Big enough to hold the persona prompt + the full NCERT grounding block without
// truncation — the default (~4k) can silently drop grounding and make the tutor
// "go off". A 3B with GQA keeps the KV cache tiny, so 8k is cheap on 4 GB.
const NUM_CTX = Number(process.env.OLLAMA_NUM_CTX || 8192);
const KEEP_ALIVE = process.env.OLLAMA_KEEP_ALIVE || "2h";
const PORT = 3002;

// The SAME options for warm-up and requests → one model load, no reloads.
const OPTIONS = {
  num_gpu: 99, // offload every layer to the GPU
  num_ctx: NUM_CTX,
  temperature: 0.5,
  num_predict: MAX_TOKENS,
};

async function warm() {
  try {
    const t0 = Date.now();
    await fetch(OLLAMA_CHAT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: "ok" }],
        stream: false,
        keep_alive: KEEP_ALIVE,
        options: OPTIONS,
      }),
    });
    console.log(
      `[ollama-dev] "${MODEL}" warmed on GPU in ${Date.now() - t0}ms (ctx ${NUM_CTX}, keep_alive ${KEEP_ALIVE})`
    );
  } catch {
    console.log("[ollama-dev] warm-up failed — is Ollama running?");
  }
}
warm();

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }
  if (req.method !== "POST" || req.url !== "/api/chat") {
    res.writeHead(404);
    return res.end("not found");
  }

  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", async () => {
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      res.writeHead(400);
      return res.end("invalid json");
    }
    const messages = Array.isArray(parsed.messages) ? parsed.messages : [];
    const system =
      parsed.system || "You are Pinnacle, a warm CBSE teacher for Indian students.";
    // The reminder goes AFTER the history, exactly as the two deployed twins do
    // (api/chat.ts, netlify/functions/chat.mts). It carries the LaTeX-and-
    // diagrams contract, and a 3B model needs it more than the 70B does, not
    // less — without it the local tutor writes x^2 and describes figures in
    // words instead of drawing them.
    const payload = [
      { role: "system", content: system },
      ...messages,
      ...(parsed.reminder ? [{ role: "system", content: parsed.reminder }] : []),
    ];

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    });

    try {
      // A per-turn ceiling from the lesson engine. num_predict is the ONLY
      // option varied per request: changing anything else (num_ctx, num_gpu)
      // makes Ollama reload the model and costs ~10s, so the rest of OPTIONS
      // stays byte-identical to the warm-up.
      const want = Number(parsed.maxTokens);
      const options =
        Number.isFinite(want) && want > 0
          ? { ...OPTIONS, num_predict: Math.max(120, Math.min(MAX_TOKENS, Math.round(want))) }
          : OPTIONS;

      const r = await fetch(OLLAMA_CHAT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          messages: payload,
          stream: true,
          keep_alive: KEEP_ALIVE,
          options,
        }),
      });
      if (!r.ok || !r.body) {
        res.end(`\n\n_(Local brain returned ${r.status}. Is the model pulled?)_`);
        return;
      }
      // Ollama's native /api/chat streams newline-delimited JSON objects:
      //   {"message":{"content":"..."},"done":false} ... {"done":true,...stats}
      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() || "";
        for (const raw of lines) {
          const line = raw.trim();
          if (!line) continue;
          try {
            const j = JSON.parse(line);
            const delta = j.message?.content;
            if (delta) res.write(delta);
            if (j.done) {
              res.end();
              return;
            }
          } catch {
            /* partial line — wait for the rest */
          }
        }
      }
      res.end();
    } catch {
      res.end("\n\n_(Local brain unreachable — start Ollama, then reload.)_");
    }
  });
});

server.listen(PORT, () => {
  console.log(
    `[ollama-dev] keyless brain on http://localhost:${PORT} using ${MODEL} (num_gpu 99, ctx ${NUM_CTX})`
  );
});
