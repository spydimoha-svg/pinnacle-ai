// Vercel Function — see api/chat.ts for why this must be a named POST export.
//
// Server-side gate for the hidden /summit console. The passcode lives only in
// the MASTER_PASSCODE env var (never shipped to the client) and is also used
// as the HMAC key for the session token, so no extra secret needs configuring.
import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_TTL_MS = 30 * 60 * 1000;

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function issueToken(secret: string): string {
  const payload = String(Date.now() + TOKEN_TTL_MS);
  return `${payload}.${sign(payload, secret)}`;
}

function verifyToken(token: string, secret: string): boolean {
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !/^\d+$/.test(payload)) return false;
  const expected = Buffer.from(sign(payload, secret));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return false;
  }
  return Number(payload) > Date.now();
}

// Per-IP throttle on passcode attempts so MASTER_PASSCODE can't be brute
// forced by scripting POSTs. Same pattern as api/chat.ts's rate limit.
const RATE_LIMIT_WINDOW_MS = 5 * 60_000;
const RATE_LIMIT_MAX = 5;
const attemptTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attemptTimestamps.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  attemptTimestamps.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

// x-forwarded-for's first hop is client-supplied and trivially spoofed.
// x-vercel-forwarded-for (falling back to x-real-ip) is set by Vercel's own
// edge and stays correct even behind an extra proxy in front of Vercel.
function clientIp(req: Request): string {
  const ip = req.headers.get("x-vercel-forwarded-for") || req.headers.get("x-real-ip");
  return ip?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request): Promise<Response> {
  const secret = process.env.MASTER_PASSCODE;
  if (!secret) {
    return new Response("Master access not configured", { status: 503 });
  }

  let body: { passcode?: string; verify?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (typeof body.verify === "string") {
    return Response.json({ valid: verifyToken(body.verify, secret) });
  }

  if (isRateLimited(clientIp(req))) {
    return new Response("Too many attempts", { status: 429 });
  }

  const given = typeof body.passcode === "string" ? Buffer.from(body.passcode.trim().toUpperCase()) : Buffer.alloc(0);
  const expected = Buffer.from(secret.trim().toUpperCase());
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return new Response("Invalid passcode", { status: 401 });
  }
  return Response.json({ token: issueToken(secret) });
}
