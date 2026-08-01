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

export async function POST(req: Request): Promise<Response> {
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
