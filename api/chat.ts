// Vercel Function (web `fetch`-style API — a named HTTP method export).
// A `export default (req) => Response` handler is NOT valid here: Vercel's Node
// runtime treats a default export as `(req, res) => void` and ignores the
// returned Response, so the request hangs until it times out.
//
// Streams a Pinnacle tutor reply as plain text from whichever FREE LLM
// provider you have configured (Groq, Gemini, Cerebras, OpenRouter, or a local
// Ollama). No Anthropic, no paid key. See api/_llm.ts and .env.example.
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

// Same-origin only: a browser fetch from our own frontend sends an
// Origin/Referer that matches the Host it's calling. A scripted call
// (curl, node fetch) either omits Origin or sends a mismatched one.
function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;
  const matchesHost = (value: string | null) => {
    if (!value) return false;
    try {
      return new URL(value).host === host;
    } catch {
      return false;
    }
  };
  return (
    matchesHost(req.headers.get("origin")) ||
    matchesHost(req.headers.get("referer"))
  );
}

// Cheap per-IP throttle so a scripted loop can't burn through the shared
// Groq free-tier token budget and starve real students mid-lesson.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const requestTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestTimestamps.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  requestTimestamps.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request): Promise<Response> {
  if (!isSameOrigin(req)) {
    return new Response("Forbidden", { status: 403 });
  }
  if (isRateLimited(clientIp(req))) {
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
    (body.system?.length ?? 0);
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
