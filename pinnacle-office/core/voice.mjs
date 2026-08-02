// Pinnacle's voice.
//
// Three ways she can talk, in the order they cost anything:
//
//   edge          the browser's own neural voices. Free, no key, no account,
//                 nothing leaves the machine. Edge exposes Microsoft's online
//                 neural voices to the Web Speech API; Chrome here does not,
//                 which is why the office opens in Edge.
//   elevenlabs    the best of the three by a distance, and the only one that
//                 costs money past its free tier. Needs Ayaan's own key.
//   responsive    responsivevoice.org. Free for personal use only, and it is a
//                 third party script that gets sent everything she says.
//
// The key never reaches the browser and never reaches git: it is read here,
// used here, and only audio goes back out. voice.json is gitignored.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(HERE, "..", "voice.json");

export function settings() {
  try {
    const raw = JSON.parse(fs.readFileSync(FILE, "utf8"));
    return { provider: "edge", voice: "", key: "", ...raw };
  } catch {
    return { provider: "edge", voice: "", key: "" };
  }
}

// What the browser is allowed to know: which engine, and whether it is usable.
// Never the key.
export function publicSettings() {
  const s = settings();
  const ready = s.provider === "edge" || (s.provider === "responsive" ? !!s.key : !!s.key);
  return { provider: s.provider, ready, voice: s.provider === "responsive" ? s.voice : "", key: s.provider === "responsive" ? s.key : "" };
}

// Returns audio bytes, or null when the browser should speak for itself.
export async function say(text) {
  const s = settings();
  if (s.provider !== "elevenlabs" || !s.key || !text) return null;

  const id = s.voice || "EXAVITQu4vr4xnSDxMaL";  // Sarah, one of the stock voices
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(id)}`, {
    method: "POST",
    headers: { "xi-api-key": s.key, "content-type": "application/json", accept: "audio/mpeg" },
    body: JSON.stringify({
      text: String(text).slice(0, 800),
      model_id: s.model || "eleven_turbo_v2_5",
      // Turned down from the defaults on purpose. High stability reads like a
      // newsreader; this is somebody talking to you across a desk.
      voice_settings: { stability: 0.38, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true },
    }),
  });
  if (!r.ok) throw new Error(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return Buffer.from(await r.arrayBuffer());
}
