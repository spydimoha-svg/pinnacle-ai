// Vercel Function (web `fetch`-style API — a named HTTP method export).
// A `export default (req) => Response` handler is NOT valid here: Vercel's Node
// runtime treats a default export as `(req, res) => void` and ignores the
// returned Response, so the request hangs until it times out.
//
// Streams a Pinnacle tutor reply as plain text from whichever FREE LLM
// provider you have configured (Groq, Gemini, Cerebras, OpenRouter, or a local
// Ollama). No Anthropic, no paid key. See api/_llm.ts and .env.example.
import { createClient } from "@supabase/supabase-js";
import {
  activeProviders,
  streamLLM,
  failureNote,
  AllProvidersFailed,
  type WireMessage,
} from "./_llm.js";

const MAX_MESSAGES = 30;
const MAX_CHARS = 60_000;
const DEFAULT_SYSTEM =
  "You are Pinnacle, a warm CBSE teacher for Indian school students.";

// Same-origin only. Sec-Fetch-Site is set by the browser itself and can't be
// set by page JS or a fetch() call, so it's the strongest signal: trust it
// whenever present. A script (curl, node fetch) can forge Origin/Referer by
// hand, but rarely bothers setting both to the same value, so browsers old
// enough to omit Sec-Fetch-Site still need Origin *and* Referer to agree.
function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;
  const secFetchSite = req.headers.get("sec-fetch-site");
  if (secFetchSite) return secFetchSite === "same-origin";
  const matchesHost = (value: string | null) => {
    if (!value) return false;
    try {
      return new URL(value).host === host;
    } catch {
      return false;
    }
  };
  return (
    matchesHost(req.headers.get("origin")) &&
    matchesHost(req.headers.get("referer"))
  );
}

// Origin/Referer only prove the request *claims* to come from our page — a
// scripted client sets both by hand. When Supabase is configured, also require
// a session token verified against Supabase's own auth server (the same check
// api/state.ts uses), so a forged-Origin request with no real session is
// rejected before any provider is called. When Supabase isn't configured
// there's no session system to check against, so this step is skipped and the
// origin + rate-limit checks below are all that apply.
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function hasVerifiedSession(req: Request): Promise<boolean> {
  if (!supabaseUrl || !supabaseServiceKey) return true;
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return false;
  const admin = createClient(supabaseUrl, supabaseServiceKey);
  const { data, error } = await admin.auth.getUser(token);
  return !error && !!data.user;
}

// Cheap per-IP throttle so a scripted loop can't burn through the shared
// Groq free-tier token budget and starve real students mid-lesson.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

// In-memory fallback only: used when Supabase isn't configured at all, so
// there's no shared store to throttle against. When Supabase IS configured,
// the module-level Map is not enough — Vercel resets it on every cold start
// and keeps it separate per concurrent instance, so an attacker spread
// across instances (or who just waits one out) gets a fresh budget for
// free. The real counter lives in Postgres via rate_limit_hit() (see
// supabase/schema.sql), which every instance shares and updates atomically.
const fallbackTimestamps = new Map<string, number[]>();

function isRateLimitedInMemory(ip: string): boolean {
  const now = Date.now();
  for (const [key, timestamps] of fallbackTimestamps) {
    if (now - timestamps[timestamps.length - 1] >= RATE_LIMIT_WINDOW_MS) {
      fallbackTimestamps.delete(key);
    }
  }
  const recent = (fallbackTimestamps.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  fallbackTimestamps.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

async function isRateLimited(ip: string): Promise<boolean> {
  if (!supabaseUrl || !supabaseServiceKey) return isRateLimitedInMemory(ip);
  const admin = createClient(supabaseUrl, supabaseServiceKey);
  const { data, error } = await admin.rpc("rate_limit_hit", {
    p_key: `chat:${ip}`,
    p_window_ms: RATE_LIMIT_WINDOW_MS,
    p_max: RATE_LIMIT_MAX,
  });
  if (error) {
    console.error("rate_limit_hit error:", error.message);
    return isRateLimitedInMemory(ip);
  }
  return data === true;
}

// x-forwarded-for's first hop is client-supplied and trivially spoofed.
// x-vercel-forwarded-for (falling back to x-real-ip) is set by Vercel's own
// edge and stays correct even behind an extra proxy in front of Vercel:
// https://vercel.com/docs/headers/request-headers#x-vercel-forwarded-for
function clientIp(req: Request): string {
  const ip = req.headers.get("x-vercel-forwarded-for") || req.headers.get("x-real-ip");
  return ip?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request): Promise<Response> {
  if (!isSameOrigin(req)) {
    return new Response("Forbidden", { status: 403 });
  }
  if (!(await hasVerifiedSession(req))) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (await isRateLimited(clientIp(req))) {
    return new Response("Too many requests", { status: 429 });
  }

  if (activeProviders().length === 0) {
    // No free provider configured — the client drops to offline tutor mode.
    return new Response("Tutor service is not configured", { status: 503 });
  }

  let body: {
    messages?: WireMessage[];
    system?: string;
    reminder?: string;
    /** Per-turn reply ceiling set by the lesson engine. */
    maxTokens?: number;
  };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES);

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response("No user message", { status: 400 });
  }
  const totalChars =
    messages.reduce((n, m) => n + m.content.length, 0) +
    (body.system?.length ?? 0) +
    (body.reminder?.length ?? 0);
  if (totalChars > MAX_CHARS) {
    return new Response("Conversation too long", { status: 413 });
  }

  const abort = new AbortController();
  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      let streamed = false;
      try {
        for await (const chunk of streamLLM(
          messages,
          body.system || DEFAULT_SYSTEM,
          abort.signal,
          body.reminder,
          typeof body.maxTokens === "number" ? body.maxTokens : undefined
        )) {
          streamed = true;
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (err) {
        controller.enqueue(encoder.encode(failureNote(err, streamed)));
        console.error(
          "chat stream error:",
          err instanceof AllProvidersFailed ? err.detail : err
        );
      } finally {
        controller.close();
      }
    },
    cancel() {
      abort.abort();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
