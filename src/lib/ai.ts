import type { ChatMessage } from "./types";

export interface WireMessage {
  role: "user" | "assistant";
  content: string;
}

export function toWire(messages: ChatMessage[]): WireMessage[] {
  return messages.map((m) => ({ role: m.role, content: m.content }));
}

/**
 * Streams a tutor reply from /api/chat (a free LLM provider, server-side key).
 * Yields plain-text chunks. Throws if the endpoint is unreachable so the
 * caller can fall back to offline mode.
 */
export async function* streamChat(
  messages: WireMessage[],
  system: string,
  signal?: AbortSignal,
  /**
   * A short instruction replayed as a system turn AFTER the history. Use it for
   * rules the model must not drift away from over a long chat — the tutor's
   * LaTeX-and-diagrams contract, above all. See lib/persona.ts.
   */
  reminder?: string,
  /**
   * Hard ceiling on this reply, set per lesson phase. The prompt asks for
   * brevity; this enforces it, which is the only version a small local model
   * respects.
   */
  maxTokens?: number
): AsyncGenerator<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Last 10 turns, not 24. Every token of history is charged against the
    // free tier's per-minute budget, and a tutor rarely needs more than the
    // last few exchanges — the durable context lives in the memory block of
    // the system prompt, not in the transcript.
    body: JSON.stringify({ messages: messages.slice(-10), system, reminder, maxTokens }),
    signal,
  });
  if (!res.ok || !res.body) {
    throw new Error(`chat endpoint returned ${res.status}`);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    yield decoder.decode(value, { stream: true });
  }
}

/**
 * Offline fallback tutor — used in local dev without the serverless function,
 * or if the API is down. Honest about its limits, still useful.
 */
export function offlineTutorReply(lastUserMessage: string): string {
  const q = lastUserMessage.toLowerCase();

  const tips = [
    "**While I reconnect, here's the board-topper drill for any topic:**",
    "1. Read the NCERT section once, slowly. CBSE answers are marked against NCERT wording.",
    "2. Write the definition + formula from memory. Check the exact key words.",
    "3. Solve 2 intext + 2 exercise questions without looking.",
    "4. Finish with one previous-year question from the Papers section.",
    "",
    "Open **Library** for your NCERT books and sample papers, or **Worksheets** to generate practice on this topic — those work fully offline.",
  ].join("\n");

  let opening = "Hmm, my full brain isn't reachable right now (no connection to the tutor service).";
  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    opening = "Hey! I'm running in offline mode right now, so I can't teach live.";
  }
  return `${opening}\n\n${tips}`;
}

/** Quick non-streaming helper for one-shot generations (storyboards, reflections). */
export async function generateOnce(
  prompt: string,
  system: string,
  signal?: AbortSignal,
  reminder?: string,
  maxTokens?: number
): Promise<string> {
  let out = "";
  for await (const chunk of streamChat(
    [{ role: "user", content: prompt }],
    system,
    signal,
    reminder,
    maxTokens
  )) {
    out += chunk;
  }
  return out;
}
