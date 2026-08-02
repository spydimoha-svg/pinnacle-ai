// Proves /api/chat cannot be reached by a script that has no session and no
// forged Origin — the #1 open risk in the vision doc: a bare request can drain
// the free-tier quota real students depend on that same minute.
//
// The body sent is deliberately malformed JSON. That is not what is under
// test — it is what keeps this test free: a same-origin/session check that
// fails returns 401/403 before the body is ever read, so a rejection never
// reaches the LLM. If the gate is missing, the request falls through to
// `await req.json()` and fails there with 400 — proof it got past the gate,
// without spending a single token against the shared quota.
//
// Netlify runs the same /api/chat contract behind a redirect to its own
// function (see netlify/functions/chat.mts) with its own rate limiter and
// PERSONA_GUARD copy — that twin has drifted from the Vercel one before, so
// it gets the identical probe whenever a base for it is supplied.
//
// Run:  node scripts/qa/api-access.mjs
//       node scripts/qa/api-access.mjs --base http://localhost:3002
//       node scripts/qa/api-access.mjs --netlify-base https://pinnacle-ai.netlify.app

const argv = process.argv.slice(2);
const argOf = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const BASE = argOf("base", process.env.QA_BASE || "https://pinnacle-ai-two.vercel.app");
const NETLIFY_BASE = argOf("netlify-base", process.env.QA_NETLIFY_BASE);

const GATE_STATUSES = new Set([401, 403]);

// Probes one deploy target's /api/chat with no session, no auth header, no
// Origin. Returns true if the gate held.
async function checkGate(label, base) {
  const url = `${base}/api/chat`;
  console.log(`[${label}] Requesting ${url} with no session, no auth header, no Origin.`);

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Malformed on purpose — see file header. A real message body would
      // work just as well to reach the gate, but would also risk a live LLM
      // call if the gate is missing.
      body: "{not json",
    });
  } catch (err) {
    console.log(`[${label}] could not reach ${url}: ${err.message}`);
    return false;
  }

  const body = (await res.text().catch(() => "")).slice(0, 200);

  if (GATE_STATUSES.has(res.status)) {
    console.log(`[${label}] rejected with ${res.status} before the request body was even read — the gate held.`);
    return true;
  }

  console.log(`[${label}] unauthenticated request was served`);
  console.log(`  status: ${res.status}`);
  console.log(`  body:   ${body}`);
  return false;
}

async function main() {
  const targets = [["vercel", BASE]];
  if (NETLIFY_BASE) targets.push(["netlify", NETLIFY_BASE]);

  const results = await Promise.all(targets.map(([label, base]) => checkGate(label, base)));
  process.exit(results.every(Boolean) ? 0 : 1);
}

main();
