// One-off verification for the master-login verify-branch rate limit fix.
// Drives the real POST handler with fake Requests, exercising the in-memory
// fallback path (no SUPABASE_* env vars set locally).
process.env.MASTER_PASSCODE = "TEST-PASSCODE";

const { POST } = await import("../api/master-login.ts");

let saw429 = false;
let first429At = -1;
for (let i = 1; i <= 20; i++) {
  const req = new Request("http://localhost/api/master-login", {
    method: "POST",
    headers: { "x-vercel-forwarded-for": "203.0.113.9" },
    body: JSON.stringify({ verify: "not-a-real-token" }),
  });
  const res = await POST(req);
  if (res.status === 429 && !saw429) {
    saw429 = true;
    first429At = i;
  }
  console.log(i, res.status);
}

if (!saw429) {
  console.error("FAIL: never got 429 on the verify branch");
  process.exit(1);
}
console.log(`PASS: first 429 at request #${first429At}`);
