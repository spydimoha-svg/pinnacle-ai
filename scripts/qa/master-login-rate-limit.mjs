// Proves /api/master-login throttles passcode brute-forcing per IP.
// Drives the real POST handler in-process (no network hop) against the
// in-memory fallback rate limiter (no SUPABASE_* env vars set locally).
//
// Same-origin headers (host/origin/referer) are required here, unlike the
// disposable script this replaces: master-login.ts rejects any request that
// fails isSameOrigin() with 403 before it ever reaches the rate limiter, so
// a request missing them never proves anything about the throttle.
//
// Run: node scripts/qa/master-login-rate-limit.mjs

process.env.MASTER_PASSCODE = "TEST-PASSCODE";

const { POST } = await import("../../api/master-login.ts");

const HOST = "pinnacle-ai-two.vercel.app";
const IP = "203.0.113.9";
const RATE_LIMIT_MAX = 5; // must match RATE_LIMIT_MAX in api/master-login.ts

function attempt(n) {
  const req = new Request(`https://${HOST}/api/master-login`, {
    method: "POST",
    headers: {
      host: HOST,
      origin: `https://${HOST}`,
      referer: `https://${HOST}/summit`,
      "x-vercel-forwarded-for": IP,
    },
    body: JSON.stringify({ passcode: "WRONG-PASSCODE" }),
  });
  return POST(req).then((res) => {
    console.log(n, res.status);
    return res.status;
  });
}

let failed = false;
for (let i = 1; i <= RATE_LIMIT_MAX; i++) {
  const status = await attempt(i);
  if (status === 429) {
    console.error(`FAIL: got 429 on attempt #${i}, before the ${RATE_LIMIT_MAX + 1}th attempt`);
    failed = true;
  }
}

const sixth = await attempt(RATE_LIMIT_MAX + 1);
if (sixth !== 429) {
  console.error(`FAIL: expected 429 on attempt #${RATE_LIMIT_MAX + 1}, got ${sixth}`);
  failed = true;
}

if (failed) process.exit(1);
console.log(`PASS: 429 returned on attempt #${RATE_LIMIT_MAX + 1} as expected`);
