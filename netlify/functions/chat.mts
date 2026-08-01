// Netlify Function (v2, web-standard handler) — same `/api/chat` contract as
// the Vercel twin. netlify.toml redirects /api/chat here.
//
// Streams a Pinnacle tutor reply as plain text from whichever FREE LLM provider
// is configured (Groq, Gemini, Cerebras, OpenRouter, or a reachable Ollama).
// No Anthropic, no paid key. Set the same env vars as Vercel (see .env.example).
//
// Note the two functions differ on purpose: Vercel needs a NAMED method export
// (`export async function POST`), Netlify v2 uses a DEFAULT export. A default
// export on Vercel is silently ignored and the request hangs — don't "unify".
import {
  activeProviders,
  streamLLM,
  failureNote,
  AllProvidersFailed,
  type WireMessage,
} from "../../api/_llm";

const MAX_MESSAGES = 30;
const MAX_CHARS = 60_000;
const DEFAULT_SYSTEM =
  "You are Pinnacle, a warm CBSE teacher for Indian school students.";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  if (activeProviders().length === 0) {
    return new Response("Tutor service is not configured", { status: 503 });
  }

  let body: {
    messages?: WireMessage[];
    system?: string;
    reminder?: string;
    /** Per-turn reply ceiling set by the lesson engine. Kept in step with the
     *  Vercel twin in api/chat.ts; a phase that must fit in 120 words needs a
     *  budget that makes that true, not a prompt that asks nicely. */
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
    },
  });
}
