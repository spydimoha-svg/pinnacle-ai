// Proves /api/chat throttles per-IP requests so a scripted loop can't drain
// the shared free-tier LLM quota real students depend on.
// Drives the real POST handler in-process (no network hop) against the
// in-memory fallback rate limiter (no SUPABASE_* env vars set locally).
//
// Same-origin headers (host/origin/referer) are required: chat.ts rejects any
// request that fails isSameOrigin() with 403 before it ever reaches the rate
// limiter, so a request missing them never proves anything about the
// throttle. Same pattern as scripts/qa/master-login-rate-limit.mjs.
//
// No provider API keys are set, so requests that get past the limiter hit
// activeProviders().length === 0 and return 503 immediately, without ever
// reading the body or making a network call — keeping this test fast and
// offline.
//
// Run: node scripts/qa/chat-rate-limit.mjs

delete process.env.VITE_SUPABASE_URL;
delete process.env.SUPABASE_SERVICE_ROLE_KEY;
for (const key of [
  "GROQ_API_KEY",
  "GEMINI_API_KEY",
  "GOOGLE_API_KEY",
  "CEREBRAS_API_KEY",
  "OPENROUTER_API_KEY",
  "GITHUB_MODELS_TOKEN",
  "GITHUB_TOKEN",
  "OLLAMA_BASE_URL",
]) {
  delete process.env[key];
}

const { POST } = await import("../../api/chat.ts");

const HOST = "pinnacle-ai-two.vercel.app";
const IP = "203.0.113.9";
const RATE_LIMIT_MAX = 20; // must match RATE_LIMIT_MAX in api/chat.ts

function attempt(n) {
  const req = new Request(`https://${HOST}/api/chat`, {
    method: "POST",
    headers: {
      host: HOST,
      origin: `https://${HOST}`,
      referer: `https://${HOST}/tutor`,
      "x-vercel-forwarded-for": IP,
    },
    body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }),
  });
  return POST(req).then((res) => {
    console.log(n, res.status);
    return res.status;
  });
}

let failed = false;
for (let i = 1; i <= 25; i++) {
  const status = await attempt(i);
  const shouldBe429 = i > RATE_LIMIT_MAX;
  if (shouldBe429 && status !== 429) {
    console.error(`FAIL: expected 429 on request #${i} (over the ${RATE_LIMIT_MAX}/min cap), got ${status}`);
    failed = true;
  }
  if (!shouldBe429 && status === 429) {
    console.error(`FAIL: got 429 on request #${i}, before the ${RATE_LIMIT_MAX + 1}th request`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`PASS: 429 returned starting at request #${RATE_LIMIT_MAX + 1} as expected`);
