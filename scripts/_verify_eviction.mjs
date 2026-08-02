// Standalone replica of api/chat.ts's isRateLimited, with an injectable clock,
// to verify stale IP entries get evicted from requestTimestamps.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const requestTimestamps = new Map();

function isRateLimited(ip, now) {
  for (const [key, timestamps] of requestTimestamps) {
    if (now - timestamps[timestamps.length - 1] >= RATE_LIMIT_WINDOW_MS) {
      requestTimestamps.delete(key);
    }
  }
  const recent = (requestTimestamps.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  requestTimestamps.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

let t = 0;
for (let i = 0; i < 500; i++) {
  isRateLimited(`ip-${i}`, t);
}
console.log("after burst from 500 distinct IPs:", requestTimestamps.size);

t += RATE_LIMIT_WINDOW_MS + 1;
isRateLimited("ip-new", t);
console.log("after window elapses + one new request:", requestTimestamps.size);

if (requestTimestamps.size !== 1 || !requestTimestamps.has("ip-new")) {
  console.error("FAIL: stale IPs were not evicted");
  process.exit(1);
}
console.log("PASS: only the active IP remains");
