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
// Run:  node scripts/qa/api-access.mjs
//       node scripts/qa/api-access.mjs --base http://localhost:3002

const argv = process.argv.slice(2);
const argOf = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const BASE = argOf("base", process.env.QA_BASE || "https://pinnacle-ai-two.vercel.app");

const GATE_STATUSES = new Set([401, 403]);

async function main() {
  const url = `${BASE}/api/chat`;
  console.log(`Requesting ${url} with no session, no auth header, no Origin.`);

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
    console.log(`could not reach ${url}: ${err.message}`);
    process.exit(1);
    return;
  }

  const body = (await res.text().catch(() => "")).slice(0, 200);

  if (GATE_STATUSES.has(res.status)) {
    console.log(`rejected with ${res.status} before the request body was even read — the gate held.`);
    process.exit(0);
    return;
  }

  console.log(`unauthenticated request was served`);
  console.log(`  status: ${res.status}`);
  console.log(`  body:   ${body}`);
  process.exit(1);
}

main();
