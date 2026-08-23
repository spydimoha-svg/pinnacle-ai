// Free multi-provider LLM layer for Pinnacle AI.
//
// Every provider here has a no-credit-card FREE tier and speaks the same
// OpenAI-compatible `/chat/completions` streaming protocol, so a single
// function drives all of them. There is NO Anthropic and NO paid key anywhere.
//
// Providers are tried in priority order. Whichever free keys you set in the
// environment become active automatically. If the first provider errors or is
// rate-limited *before* it starts streaming (bad key, 429, network blip), the
// next one in the chain takes over. Once a provider begins streaming we commit
// to it. If you set nothing, the caller falls back to the app's offline tutor.
//
// Files in `api/` that start with `_` are helpers, not HTTP routes — Vercel
// ignores them for routing and just bundles them.
//
// Set one or more of these (see .env.example):
//   GROQ_API_KEY        (+ optional GROQ_MODEL)
//   GEMINI_API_KEY      (+ optional GEMINI_MODEL)   Google AI Studio, free
//   CEREBRAS_API_KEY    (+ optional CEREBRAS_MODEL)
//   OPENROUTER_API_KEY  (+ optional OPENROUTER_MODEL)
//   GITHUB_MODELS_TOKEN (+ optional GITHUB_MODEL)    GitHub Models, free (PAT)
//   OLLAMA_BASE_URL     (+ optional OLLAMA_MODEL)    local, offline, no key
// Optional: AI_PROVIDER_ORDER, AI_MAX_TOKENS, AI_TEMPERATURE.

export interface WireMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface Provider {
  id: string;
  label: string;
  baseUrl: string;
  model: string;
  apiKey?: string; // omitted for local Ollama (no auth)
  extraHeaders?: Record<string, string>;
}

// Sensible free-tier defaults. All overridable by env so you can swap a model
// the day a provider retires one, without touching code.
//
// Verified against each provider's live /models list on 2026-08-16. Two of
// these had already been retired underneath us, which is worth knowing about
// because a retired model does not degrade — it 404s, and the provider drops
// out of the chain silently while the tutor still appears to work on whatever
// is left:
//   - gemini-2.0-flash returned 404 "no longer available". Now gemini-3.6-flash.
//   - Cerebras dropped Llama entirely (it now lists gemma-4-31b, gpt-oss-120b,
//     zai-glm-4.7). Now gpt-oss-120b.
// Groq's llama-3.3-70b-versatile is still live and stays — same family name as
// the dead Cerebras entry, different provider, genuinely still there.
const DEFAULT_MODEL: Record<string, string> = {
  groq: "llama-3.3-70b-versatile",
  gemini: "gemini-3.6-flash",
  cerebras: "gpt-oss-120b",
  openrouter: "meta-llama/llama-3.3-70b-instruct:free",
  github: "openai/gpt-4o-mini",
  ollama: "qwen2.5:3b-instruct",
};

const env = (key: string): string | undefined => {
  const v = process.env[key];
  const t = v?.trim();
  return t ? t : undefined;
};

const numEnv = (key: string, fallback: number): number => {
  const n = Number(env(key));
  return Number.isFinite(n) ? n : fallback;
};

// 1600, not 4096. Groq's free tier bills a 12,000-tokens-per-MINUTE budget and
// counts max_tokens as reserved up front, so a 4096 ceiling on top of a ~3,000
// token prompt meant the second question inside a minute hit 429 — which read
// to the student as "the tutor is broken". A tutor reply almost never needs
// more than 1600, and the ceiling only truncates; it never pads.
const MAX_TOKENS = numEnv("AI_MAX_TOKENS", 1600);

/** Keep a caller-supplied ceiling sane: never zero, never above the global cap. */
function clampTokens(requested?: number): number {
  if (!requested || !Number.isFinite(requested)) return MAX_TOKENS;
  return Math.max(120, Math.min(MAX_TOKENS, Math.round(requested)));
}
const TEMPERATURE = numEnv("AI_TEMPERATURE", 0.6);

// A provider that accepts the TCP connection but never answers (dead key,
// firewalled Ollama box) would otherwise hang the fetch until the platform's
// own hard timeout kills the whole request. Bounding each attempt lets
// streamLLM fall through to the next provider instead, the same way it
// already does for a fast 429.
const PROVIDER_TIMEOUT_MS = numEnv("AI_PROVIDER_TIMEOUT_MS", 20_000);

/** Thrown when every provider refused. `rateLimited` drives the message the
 *  student sees, which should say "wait a moment", not "something broke". */
export class AllProvidersFailed extends Error {
  constructor(
    message: string,
    readonly rateLimited: boolean,
    readonly detail: string
  ) {
    super(message);
    this.name = "AllProvidersFailed";
  }
}

/**
 * What the student reads when nothing answered. A rate limit is a wait, not a
 * fault, and saying so stops it reading as "the app is broken" — which is how
 * the old single "connection dropped" line landed on every kind of failure.
 */
export function failureNote(err: unknown, streamed: boolean): string {
  if (err instanceof AllProvidersFailed && err.rateLimited) {
    return streamed
      ? "\n\n_(I hit the free tutor's per-minute limit mid-answer. Give it about a minute, then ask me to continue.)_"
      : "I've hit the free tutor's per-minute limit — that's a busy moment, not a problem with your question. Wait about a minute and send it again.\n\nMeanwhile **Library**, **Worksheets** and **Papers & PYQs** all work without me.";
  }
  return streamed
    ? "\n\n_(The tutor connection dropped mid-answer — ask me to continue.)_"
    : "I couldn't reach the tutor service just now. Try again in a moment — **Library**, **Worksheets** and **Papers & PYQs** work without me in the meantime.";
}

/**
 * Build the active provider chain from the environment.
 * Order is the priority order; only providers you have a key for appear.
 */
export function activeProviders(): Provider[] {
  const factories: Record<string, () => Provider[] | Provider | null> = {
    // Groq contributes SEVERAL entries from one key. Its rate limit is per
    // model, so when the 70B is out of per-minute budget a different model on
    // the same key still answers instantly. That matters because it has
    // historically been the only provider here with quota left, so without this
    // the very first 429 ends the conversation.
    //
    // The reason logged for the others was "Gemini over daily limit (429),
    // Cerebras out of credit (402)". Rechecked live on 2026-08-16:
    //   - Gemini: the key is fine. The 429 diagnosis was wrong — the model id
    //     had been retired (404), which is a permanent failure wearing a
    //     temporary failure's clothes. Fixed above; gemini-3.6-flash answers.
    //   - Cerebras: still a real 402, on a current model id. That account
    //     needs credit before it contributes anything, so treat this provider
    //     as absent rather than as a fallback that exists.
    // So the chain that actually carries traffic today is Groq, then Gemini.
    groq: () => {
      const apiKey = env("GROQ_API_KEY");
      if (!apiKey) return null;
      const primary = env("GROQ_MODEL") || DEFAULT_MODEL.groq;
      const fallbacks = (
        env("GROQ_FALLBACK_MODELS") || "openai/gpt-oss-120b,llama-3.1-8b-instant"
      )
        .split(",")
        .map((s) => s.trim())
        .filter((m) => m && m !== primary);
      return [primary, ...fallbacks].map((model, i) => ({
        id: i === 0 ? "groq" : `groq:${model}`,
        label: i === 0 ? "Groq" : `Groq (${model})`,
        baseUrl: "https://api.groq.com/openai/v1",
        model,
        apiKey,
      }));
    },
    gemini: () => {
      const apiKey = env("GEMINI_API_KEY") || env("GOOGLE_API_KEY");
      return apiKey
        ? {
            id: "gemini",
            label: "Gemini",
            baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
            model: env("GEMINI_MODEL") || DEFAULT_MODEL.gemini,
            apiKey,
          }
        : null;
    },
    cerebras: () => {
      const apiKey = env("CEREBRAS_API_KEY");
      return apiKey
        ? {
            id: "cerebras",
            label: "Cerebras",
            baseUrl: "https://api.cerebras.ai/v1",
            model: env("CEREBRAS_MODEL") || DEFAULT_MODEL.cerebras,
            apiKey,
          }
        : null;
    },
    openrouter: () => {
      const apiKey = env("OPENROUTER_API_KEY");
      return apiKey
        ? {
            id: "openrouter",
            label: "OpenRouter",
            baseUrl: "https://openrouter.ai/api/v1",
            model: env("OPENROUTER_MODEL") || DEFAULT_MODEL.openrouter,
            apiKey,
            // Recommended by OpenRouter, not required.
            extraHeaders: {
              "HTTP-Referer":
                env("OPENROUTER_SITE") || "https://pinnacle-ai-two.vercel.app",
              "X-Title": "Pinnacle AI",
            },
          }
        : null;
    },
    github: () => {
      // GitHub Models: free, OpenAI-compatible. Needs a GitHub PAT (classic or
      // fine-grained) with the "models: read" permission. GITHUB_TOKEN is the
      // Actions fallback name.
      const apiKey = env("GITHUB_MODELS_TOKEN") || env("GITHUB_TOKEN");
      return apiKey
        ? {
            id: "github",
            label: "GitHub Models",
            baseUrl: "https://models.github.ai/inference",
            model: env("GITHUB_MODEL") || DEFAULT_MODEL.github,
            apiKey,
          }
        : null;
    },
    ollama: () => {
      const base = env("OLLAMA_BASE_URL");
      return base
        ? {
            id: "ollama",
            label: "Ollama (local)",
            baseUrl: base.replace(/\/+$/, ""),
            model: env("OLLAMA_MODEL") || DEFAULT_MODEL.ollama,
          }
        : null;
    },
  };

  const order = (env("AI_PROVIDER_ORDER") || "groq,openrouter,github,gemini,cerebras,ollama")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const chain: Provider[] = [];
  for (const id of order) {
    const factory = factories[id];
    if (!factory) continue;
    const made = factory();
    if (!made) continue;
    if (Array.isArray(made)) chain.push(...made);
    else chain.push(made);
  }
  return chain;
}

async function openStream(
  provider: Provider,
  messages: WireMessage[],
  signal?: AbortSignal,
  /** Per-request ceiling from the lesson engine; falls back to the global one. */
  maxTokens?: number
): Promise<Response> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (provider.apiKey) headers["Authorization"] = `Bearer ${provider.apiKey}`;
  Object.assign(headers, provider.extraHeaders ?? {});

  const timeout = AbortSignal.timeout(PROVIDER_TIMEOUT_MS);
  return fetch(`${provider.baseUrl}/chat/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: provider.model,
      messages,
      stream: true,
      temperature: TEMPERATURE,
      // A phase that must fit in 120 words gets a budget that makes that true.
      // Asking politely for brevity in the prompt works on a large model and is
      // ignored by a small one; a token ceiling is not negotiable.
      max_tokens: clampTokens(maxTokens),
    }),
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  });
}

/**
 * Streams plain-text reply chunks from the first working free provider.
 *
 * - Falls through the chain on pre-stream failures (missing/invalid key, 429,
 *   network error, retired model).
 * - Commits to a provider once it responds 200 and starts streaming.
 * - Yields text deltas only; the caller pipes them straight to the browser,
 *   preserving the existing plain-text `/api/chat` contract.
 *
 * Throws `no-providers` if nothing is configured (caller shows offline tutor).
 */
export async function* streamLLM(
  messages: WireMessage[],
  system: string,
  signal?: AbortSignal,
  reminder?: string,
  maxTokens?: number
): AsyncGenerator<string> {
  const providers = activeProviders();
  if (providers.length === 0) throw new Error("no-providers");

  // The reminder is a second system turn placed AFTER the history, not before
  // it. A rule stated only at the top of a long prompt loses to the style of
  // the model's own most recent reply — measurably so (see lib/persona.ts).
  // Sitting last, it is the final thing read before generation.
  const payload: WireMessage[] = [
    ...(system ? [{ role: "system" as const, content: system }] : []),
    ...messages,
    ...(reminder ? [{ role: "system" as const, content: reminder }] : []),
  ];

  const failures: string[] = [];
  let sawRateLimit = false;

  for (const provider of providers) {
    let res: Response;
    try {
      res = await openStream(provider, payload, signal, maxTokens);
    } catch (err) {
      failures.push(`${provider.label}: ${(err as Error)?.message ?? "unreachable"}`);
      continue; // couldn't even reach it — try the next free provider
    }

    if (!res.ok || !res.body) {
      if (res.status === 429) sawRateLimit = true;
      // Read a little of the error body: knowing 429-vs-402-vs-401 is the
      // difference between "wait ten seconds" and "this key is finished".
      let detail = "";
      try {
        detail = (await res.text()).slice(0, 200).replace(/\s+/g, " ");
      } catch {
        /* ignore */
      }
      failures.push(`${provider.label}: ${res.status} ${detail}`);
      continue;
    }

    // Committed. Parse the OpenAI-style Server-Sent Events stream.
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // SSE frames are separated by newlines; keep the trailing partial line.
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const raw of lines) {
        const line = raw.trim();
        if (!line || line.startsWith(":")) continue; // keep-alive / comment
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (data === "[DONE]") return;
        try {
          const json = JSON.parse(data);
          const delta = json?.choices?.[0]?.delta?.content;
          if (typeof delta === "string" && delta.length) yield delta;
        } catch {
          // partial or non-JSON keep-alive frame — ignore
        }
      }
    }
    return; // stream finished cleanly
  }

  // Every configured provider failed before streaming a single token.
  throw new AllProvidersFailed(
    "all-providers-failed",
    sawRateLimit,
    failures.join(" | ")
  );
}
