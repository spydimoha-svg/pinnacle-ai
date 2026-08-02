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

  if (
    typeof body.passcode !== "string" ||
    body.passcode.trim().toUpperCase() !== secret.trim().toUpperCase()
  ) {
    return new Response("Invalid passcode", { status: 401 });
  }
  return Response.json({ token: issueToken(secret) });
}
