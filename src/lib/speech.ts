// Keyless, free narration using the browser's built-in Web Speech API.
// No API key, no network — the voices ship with the OS/browser. This is what
// makes a Pinnacle lesson actually *speak* while it plays.

export type NarrationLang = "English" | "Hindi" | "Hinglish";

export function speechAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

let cachedVoices: SpeechSynthesisVoice[] = [];

/** Voices load asynchronously on most browsers; keep a live cache. */
export function primeVoices(): void {
  if (!speechAvailable()) return;
  const load = () => {
    const v = window.speechSynthesis.getVoices();
    if (v.length) cachedVoices = v;
  };
  load();
  window.speechSynthesis.onvoiceschanged = load;
}

/** Best-effort match of a voice to the chosen narration language. */
export function pickVoice(lang: NarrationLang): SpeechSynthesisVoice | null {
  const voices = cachedVoices.length
    ? cachedVoices
    : speechAvailable()
      ? window.speechSynthesis.getVoices()
      : [];
  if (!voices.length) return null;

  const byLang = (prefix: string) =>
    voices.find((v) => v.lang?.toLowerCase().startsWith(prefix));

  if (lang === "Hindi") {
    return byLang("hi") ?? byLang("en-in") ?? byLang("en") ?? voices[0];
  }
  // Hinglish is Latin-script Hindi — an Indian-English voice reads it most
  // naturally; fall back to any English, then a Hindi voice.
  if (lang === "Hinglish") {
    return byLang("en-in") ?? byLang("en") ?? byLang("hi") ?? voices[0];
  }
  return byLang("en-in") ?? byLang("en") ?? voices[0];
}

/** BCP-47 tag for the utterance, used when no exact voice is found. */
function langTag(lang: NarrationLang): string {
  if (lang === "Hindi") return "hi-IN";
  return "en-IN";
}

export interface SpeakHandle {
  cancel: () => void;
}

/**
 * Speak one line. Calls onEnd exactly once (on natural end, error, or the
 * safety timeout that guards against Chrome's long-utterance hang). Returns a
 * handle so the caller can cancel on pause/unmount.
 */
export function speak(
  text: string,
  opts: {
    lang: NarrationLang;
    rate?: number;
    onEnd?: () => void;
    onError?: () => void;
  }
): SpeakHandle {
  if (!speechAvailable() || !text.trim()) {
    // No speech engine — resolve immediately so the player still advances.
    opts.onEnd?.();
    return { cancel: () => {} };
  }

  const synth = window.speechSynthesis;
  synth.cancel(); // never overlap lines

  const u = new SpeechSynthesisUtterance(text);
  const voice = pickVoice(opts.lang);
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? langTag(opts.lang);
  u.rate = opts.rate ?? 0.98;
  u.pitch = 1;

  let done = false;
  const finish = (fn?: () => void) => {
    if (done) return;
    done = true;
    window.clearTimeout(guard);
    fn?.();
  };

  u.onend = () => finish(opts.onEnd);
  u.onerror = () => finish(opts.onError ?? opts.onEnd);

  // Safety net: estimate the line's length and force-advance if the engine
  // silently stalls (a known Chrome bug on some builds).
  const words = text.trim().split(/\s+/).length;
  const estMs = Math.max(3500, words * 420) + 4000;
  const guard = window.setTimeout(() => finish(opts.onEnd), estMs);

  synth.speak(u);
  return {
    cancel: () => {
      done = true;
      window.clearTimeout(guard);
      try {
        synth.cancel();
      } catch {
        /* ignore */
      }
    },
  };
}

/** Estimated seconds a line of narration will take (for the muted timeline). */
export function estimateSeconds(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3.5, words * 0.42);
}

export function stopSpeech(): void {
  if (speechAvailable()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }
  }
}
