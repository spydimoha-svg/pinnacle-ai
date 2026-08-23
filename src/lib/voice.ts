// Studio narration — the ElevenLabs-grade voice, for free.
//
// speech.ts uses the browser's built-in speechSynthesis. It costs nothing and
// works offline, but it is an OS voice: flat, wrongly-stressed, and on most
// Windows machines frankly robotic. A lesson narrated by it sounds like a
// screen reader, not a teacher, and that is the single biggest quality gap
// between a Pinnacle video and the ones students actually watch.
//
// This module adds a second engine: KOKORO — an 82M-parameter neural TTS
// model (Apache-2.0) that runs entirely IN THE BROWSER via WebAssembly or
// WebGPU. It is the model people reach for when they want ElevenLabs quality
// without ElevenLabs' bill: same warm, natural, social-media narrator sound,
// no API key, no account, no per-character charge, no server.
//
// Two deliberate constraints shaped how it is wired in:
//
//   1. NO NEW NPM DEPENDENCY. kokoro-js is pulled at RUNTIME from a CDN, as an
//      ES module, only when a student actually turns studio voice on. Nothing
//      enters package.json, nothing enters the app bundle, and a student who
//      never opens the video studio never downloads a byte of it.
//
//   2. IT MUST BE OPTIONAL. The model weights are ~86 MB on first use. That is
//      a real cost on Indian mobile data, so it is opt-in, it says its size
//      before it downloads, and every failure path falls back to the built-in
//      voice rather than breaking the lesson.
//
// The browser caches the weights after the first download (transformers.js
// stores them in the Cache API), so the second lesson starts instantly.
import type { NarrationLang } from "./speech";

/** Pinned: an unpinned CDN import would silently change the engine under us. */
const KOKORO_CDN = "https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/+esm";
const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";

/**
 * q8, not fp32. fp32 is ~326 MB for a quality difference that is inaudible
 * over a lesson's narration; q8 is ~86 MB and runs comfortably on the
 * mid-range Android phones most of these students are on.
 */
const DTYPE = "q8";

export type VoiceEngine = "system" | "studio";

export interface StudioVoice {
  id: string;
  label: string;
  /** Which narration languages this voice is right for. */
  langs: NarrationLang[];
  blurb: string;
}

/**
 * The shortlist, not all 55.
 *
 * Kokoro ships voices in nine languages; only the ones that can actually read
 * a CBSE lesson to an Indian student are offered. The Hindi voices are the
 * reason this engine is worth the download at all — the browser's own Hindi
 * voice is absent on most Windows installs, so Hindi narration currently
 * falls back to an English voice mangling Devanagari.
 */
export const STUDIO_VOICES: StudioVoice[] = [
  {
    id: "af_heart",
    label: "Aria — warm",
    langs: ["English", "Hinglish"],
    blurb: "Warm and close-mic'd. The social-media narrator sound.",
  },
  {
    id: "am_michael",
    label: "Michael — steady",
    langs: ["English", "Hinglish"],
    blurb: "Calm male explainer. Good for long derivations.",
  },
  {
    id: "af_bella",
    label: "Bella — bright",
    langs: ["English", "Hinglish"],
    blurb: "Higher energy, quicker. Suits a fast hook.",
  },
  {
    id: "am_puck",
    label: "Puck — playful",
    langs: ["English", "Hinglish"],
    blurb: "Light and funny. Pairs with the comic characters.",
  },
  {
    id: "bf_emma",
    label: "Emma — British",
    langs: ["English"],
    blurb: "Clipped RP. Formal, exam-hall serious.",
  },
  {
    id: "hf_alpha",
    label: "Aditi — Hindi",
    langs: ["Hindi", "Hinglish"],
    blurb: "Native Hindi. Reads Devanagari properly.",
  },
  {
    id: "hm_omega",
    label: "Omkar — Hindi",
    langs: ["Hindi", "Hinglish"],
    blurb: "Native Hindi male. Steady, teacherly.",
  },
];

/** The default voice for a narration language. */
export function defaultVoiceFor(lang: NarrationLang): string {
  if (lang === "Hindi") return "hf_alpha";
  return "af_heart";
}

export function voicesFor(lang: NarrationLang): StudioVoice[] {
  return STUDIO_VOICES.filter((v) => v.langs.includes(lang));
}

/* ------------------------------------------------------------------ *
 * Capability
 * ------------------------------------------------------------------ */

/**
 * Can this browser run the studio engine at all?
 *
 * Checked before the toggle is even offered, so a student on a browser that
 * cannot run it is never shown a switch that would fail.
 */
export function studioSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof WebAssembly === "object" &&
    typeof fetch === "function" &&
    // The model is fetched cross-origin from the CDN; without dynamic import
    // there is no way to load it.
    typeof URL.createObjectURL === "function"
  );
}

/** Rough download size shown in the UI before anyone commits to it. */
export const STUDIO_DOWNLOAD_MB = 86;

/* ------------------------------------------------------------------ *
 * Loading
 * ------------------------------------------------------------------ */

interface KokoroModel {
  generate: (
    text: string,
    opts: { voice: string; speed?: number }
  ) => Promise<{ toBlob: () => Blob }>;
}

let modelPromise: Promise<KokoroModel> | null = null;
let modelReady = false;

export function studioReady(): boolean {
  return modelReady;
}

export type LoadProgress = { loaded: number; total: number; percent: number };

/**
 * Download and initialise Kokoro. Safe to call repeatedly — the first call
 * owns the download and every later one waits on the same promise.
 *
 * `onProgress` reports the weight download so the UI can show a real bar
 * rather than an indefinite spinner on an 86 MB wait.
 */
export function loadStudio(
  onProgress?: (p: LoadProgress) => void
): Promise<KokoroModel> {
  if (modelPromise) return modelPromise;

  modelPromise = (async () => {
    // @vite-ignore keeps the bundler from trying to resolve and inline a URL
    // that is deliberately fetched at runtime.
    const mod = (await import(/* @vite-ignore */ KOKORO_CDN)) as {
      KokoroTTS: {
        from_pretrained: (
          id: string,
          opts: Record<string, unknown>
        ) => Promise<KokoroModel>;
      };
    };

    // WebGPU where it exists (roughly 5-10x faster to synthesise), WASM
    // everywhere else. Both produce identical audio.
    const device =
      typeof navigator !== "undefined" && "gpu" in navigator ? "webgpu" : "wasm";

    // transformers.js reports progress per file; the weights dominate, so the
    // bar tracks whichever file is currently downloading.
    const progress_callback = onProgress
      ? (p: { status?: string; loaded?: number; total?: number }) => {
          if (p.status === "progress" && p.total) {
            onProgress({
              loaded: p.loaded ?? 0,
              total: p.total,
              percent: Math.round(((p.loaded ?? 0) / p.total) * 100),
            });
          }
        }
      : undefined;

    const tts = await mod.KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: DTYPE,
      device,
      progress_callback,
    });
    modelReady = true;
    return tts;
  })();

  // A failed download must not poison every later attempt: clear the cached
  // promise so pressing "try again" genuinely retries.
  modelPromise.catch(() => {
    modelPromise = null;
    modelReady = false;
  });

  return modelPromise;
}

/* ------------------------------------------------------------------ *
 * Synthesis
 * ------------------------------------------------------------------ */

/**
 * Kokoro reads plain prose. Anything the script carries for the SCREEN — LaTeX
 * delimiters, markdown emphasis, stray symbols — must be spoken as words or
 * removed, or the narrator reads "dollar b squared minus four a c dollar".
 */
export function speakable(text: string): string {
  return text
    .replace(/\$+/g, " ")
    .replace(/\*\*|__|[*_`#]/g, " ")
    .replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "$1 over $2")
    .replace(/\\sqrt\s*\{([^{}]*)\}/g, "root $1")
    .replace(/\\(?:times|cdot)/g, " times ")
    .replace(/\\(?:pm)/g, " plus or minus ")
    .replace(/\\(?:leq|le)\b/g, " less than or equal to ")
    .replace(/\\(?:geq|ge)\b/g, " greater than or equal to ")
    .replace(/\\(?:neq|ne)\b/g, " not equal to ")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[{}]/g, " ")
    .replace(/\^2\b/g, " squared ")
    .replace(/\^3\b/g, " cubed ")
    .replace(/\s*=\s*/g, " equals ")
    .replace(/\s+/g, " ")
    .trim();
}

/** One rendered line of narration, ready to play. */
export interface RenderedLine {
  url: string;
  /** Seconds, measured from the decoded clip once it loads. */
  duration: number;
}

/**
 * Render one line to an object URL.
 *
 * Throws if the engine isn't loaded or synthesis fails; every caller is
 * expected to fall back to the system voice rather than surface an error.
 */
export async function renderLine(
  text: string,
  voiceId: string,
  speed = 1
): Promise<string> {
  const tts = await loadStudio();
  const clean = speakable(text);
  if (!clean) throw new Error("nothing to say");
  const audio = await tts.generate(clean, { voice: voiceId, speed });
  return URL.createObjectURL(audio.toBlob());
}

/**
 * Render a whole lesson up front, in order.
 *
 * Synthesis on WASM takes a second or two per line — fine as a one-off before
 * the video starts, unacceptable as a stall between every scene. So the player
 * renders the full script first behind a progress bar, then plays it gapless.
 *
 * `signal` aborts a long render when the student navigates away; already-made
 * URLs are revoked by the caller via `releaseNarration`.
 */
export async function renderNarration(
  lines: string[],
  voiceId: string,
  opts: {
    speed?: number;
    onLine?: (done: number, total: number) => void;
    signal?: AbortSignal;
  } = {}
): Promise<(string | null)[]> {
  const out: (string | null)[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (opts.signal?.aborted) break;
    try {
      out.push(await renderLine(lines[i], voiceId, opts.speed));
    } catch {
      // One bad line must not sink the lesson — the player speaks this one
      // with the system voice and carries on.
      out.push(null);
    }
    opts.onLine?.(i + 1, lines.length);
  }
  return out;
}

/** Free every object URL a render produced. */
export function releaseNarration(urls: (string | null)[]): void {
  for (const u of urls) {
    if (u) {
      try {
        URL.revokeObjectURL(u);
      } catch {
        /* ignore */
      }
    }
  }
}

/* ------------------------------------------------------------------ *
 * Playback
 * ------------------------------------------------------------------ */

export interface PlayHandle {
  cancel: () => void;
}

/**
 * Play one pre-rendered clip, honouring the same contract speech.ts uses:
 * onEnd fires exactly once, and cancel() is safe at any time.
 */
export function playClip(
  url: string,
  opts: { rate?: number; onEnd?: () => void; onError?: () => void }
): PlayHandle {
  const audio = new Audio(url);
  audio.playbackRate = opts.rate ?? 1;

  let done = false;
  const finish = (fn?: () => void) => {
    if (done) return;
    done = true;
    fn?.();
  };

  audio.onended = () => finish(opts.onEnd);
  audio.onerror = () => finish(opts.onError ?? opts.onEnd);
  // Autoplay can be refused when playback wasn't started by a gesture; treat
  // that as "this line is over" so the lesson keeps moving instead of hanging.
  void audio.play().catch(() => finish(opts.onError ?? opts.onEnd));

  return {
    cancel: () => {
      done = true;
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        /* ignore */
      }
    },
  };
}
