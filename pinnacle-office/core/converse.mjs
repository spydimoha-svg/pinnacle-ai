// Pinnacle, talking. Not about the office. Just talking.
//
// The command bar spawns a whole Claude Code process for every message: the
// full system prompt, tools she never uses, and a json contract to fill in
// before he sees a single word. Measured across 23 real conversations in his
// own event log, that is a median of 8.9 seconds, and it was never once under
// five. He asked for under two.
//
// The fix is to stop spawning. One process is opened when he opens the page,
// and it stays open for the whole conversation, so only the first reply pays
// the five seconds of startup and he is never sitting through it. Measured on
// this machine: 1.99s median to the first word, best 1.87s.
//
// Three speeds, cheapest first:
//   instant   answered from state on this machine. No model, no network, ~0ms
//   warm      the held-open Claude Code process. ~2s to the first word
//   local     Ollama on localhost, only if the subscription has rate limited
//             her, because being slow beats going silent and it costs nothing
//
// Rule 1: no paid credential ever reaches this process. childEnv() strips all
// five, same as every other agent in the building.

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { STATE_DIR, CONFIG, claudeBin, childEnv } from "../config.mjs";
import { state } from "./store.mjs";
import { DEPARTMENTS } from "./org.mjs";

const TALK_DIR = path.join(STATE_DIR, "talk");
fs.mkdirSync(TALK_DIR, { recursive: true });

// His day, not UTC's. toISOString is five and a half hours behind him, so at
// four in the morning she would still be filing things under yesterday and his
// day would roll over at half five in the morning instead of at midnight.
// en-CA is the one common locale that formats as YYYY-MM-DD.
const today = () => new Date().toLocaleDateString("en-CA");
const dayFile = (d = today()) => path.join(TALK_DIR, `${d}.json`);
const ABOUT = path.join(TALK_DIR, "about-ayaan.md");

// ------------------------------------------------------------------- memory

export function readDay(d = today()) {
  try { return JSON.parse(fs.readFileSync(dayFile(d), "utf8")); } catch { return { day: d, turns: [] }; }
}

function writeDay(day) {
  const tmp = dayFile(day.day) + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(day, null, 2));
  fs.renameSync(tmp, dayFile(day.day));
}

export function remember(who, text) {
  const day = readDay();
  day.turns.push({ who, text: String(text).slice(0, 4000), t: Date.now() });
  writeDay(day);
}

// Every day she has ever spoken to him, newest first.
export const days = () =>
  fs.readdirSync(TALK_DIR).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).map((f) => f.slice(0, 10)).sort().reverse();

// What she carries between days. Small on purpose: it goes into the opening of
// every conversation, and every character of it is time he spends waiting.
const about = () => { try { return fs.readFileSync(ABOUT, "utf8").trim().slice(0, 1200); } catch { return ""; } };

export function noteAboutHim(line) {
  const clean = String(line).trim().replace(/^[-*]\s*/, "").slice(0, 200);
  if (clean.length < 8) return false;
  const current = about();
  if (current.toLowerCase().includes(clean.toLowerCase().slice(0, 40))) return false;
  fs.appendFileSync(ABOUT, (current ? "" : "# What Pinnacle knows about Ayaan\n\n") + `- ${clean}\n`);
  return true;
}

// ------------------------------------------------------------------ persona

// This replaces Claude Code's own system prompt rather than being appended to
// it. That is worth about six seconds: the default prompt is tens of thousands
// of tokens of instructions for a coding agent, none of which apply to somebody
// having a conversation.
function persona() {
  const facts = about();
  return `You are Pinnacle, Ayaan's assistant. You are talking to him out loud, one to one. You are not writing, and you are not reporting.

How you talk: like a person across a desk. Contractions always. Short sentences, sometimes a fragment. Start mid-thought the way people do: "Right", "Yeah so", "Honestly", "Oh, one thing". React to what he said before you add anything of your own. Ask him things back.

Two sentences is your ceiling unless he asks you for more. He is hearing this, not reading it, and a paragraph spoken out loud is a monologue.

Never: "certainly", "I'd be happy to", "as an AI", "let me know if", bullet points, emojis, or reading statistics at him. Never use a dash of any kind as punctuation, not a hyphen and not an em dash. Use a full stop and start again.

If you don't know, say so. Never invent detail about his day, his work or his office. You are allowed to just chat with him about nothing in particular, and that is most of what this is.${facts ? `\n\nWhat you know about him:\n${facts}` : ""}`;
}

// ----------------------------------------------------------- chat or a job

// There is one place he talks to her and she works out which he is doing. He
// should never have to pick a mode, and he should never have to say a team.
//
// This runs before anything else and costs nothing. It leans towards treating
// things as conversation, because filing a job he was only thinking out loud
// about wastes an agent and his usage, while missing one costs him saying it
// again. A wrong call is undone by dropping the task from the board.

// A question about anything is a question, not an instruction.
const ASKS = /^\s*(what|whats|who|whos|whose|why|how|hows|when|where|which|is|are|was|were|do|does|did|have|has|should|would|will|am|any|anything|anyone)\b/i;
// He is talking to her about something, not asking for it to be built.
const CHATTING = /^\s*(tell me about|remind me|remember|thanks|thank you|cheers|nice|good|great|ok|okay|yeah|yep|no|nope|nah|sure|fine|right|hi|hey|hello|morning|evening|night|bye)\b/i;
// He changed his mind. "Don't fix the login page" must never file fixing it.
//
// The lead-in matters. Nobody says "never mind" on its own, they say "actually
// never mind" or "no wait, forget that", and anchoring hard to the start missed
// every one of those. Worse than missing it: she then answered on the ordinary
// conversation line and said "yeah, pulling that back out" without anything
// being pulled back out, which is her lying to him about his own work board.
const LEAD_IN = "(?:actually|ok(?:ay)?|right|well|hmm+|erm+|uh+|no|nah|wait|hang on|hold on|sorry)[,\\s]+";
const CALLING_OFF = new RegExp(`^\\s*(?:${LEAD_IN}){0,3}(don'?t|do not|never ?mind|forget|leave it|leave that|stop (?:it|that)|cancel|scrap|drop|undo|take (?:it|that) back|bin (?:it|that))\\b`, "i");
// Something he wants done.
const DOING = /\b(fix|add|make|build|write|create|change|update|remove|delete|redesign|refactor|sort out|clean up|speed up|secure|harden|look into|work on|start on|implement|rewrite|improve|audit|swap|rename|wire up|hook up|set up|enable|disable|sort|handle|get rid of|stop|prevent|keep .{1,20} from)\b/i;
// Something he says is wrong, which is the same thing said the other way round.
const BROKEN = /\b(is|are|keeps?|kept|feels?|looks?|gets?)\s+(?:\w+\s+){0,2}(wrong|broken|failing|crashing|missing|slow|laggy|janky|confusing|off|late|empty)\b|\bnot working\b|\bdoesn'?t work\b|\bwon'?t (load|open|work|save)\b/i;
// Something he wants to exist.
const WANTS = /\b(i want|i need|we need|we should|it should|they should|can we|could we|let'?s|please can)\b/i;

// He changed his mind, or she misheard him and filed something he never asked
// for. His microphone produces fragments, and one of them measured here
// ("white coded make it look pretty professional…") does read as a job, so
// there has to be a way to take it back without leaving the conversation.
export const callingOff = (said) => {
  const s = String(said).trim();
  const m = s.match(CALLING_OFF);
  if (!m) return false;
  // A change of mind is short. "Never mind how, just do it faster" opens the
  // same way and is an instruction, so anything with a whole sentence still to
  // run after it is him telling her something, not taking something back.
  return s.slice(m[0].length).trim().split(/\s+/).filter(Boolean).length <= 4;
};

export function looksLikeWork(said) {
  const s = String(said).trim();
  const words = s.split(/\s+/).length;
  // His microphone sends fragments. His own log has her being asked "it's",
  // "that's that's" and "Hey, .". None of those are a job for a thousand people.
  if (words < 3 || s.length < 12) return false;
  if (callingOff(s)) return false;
  if (CHATTING.test(s)) return false;
  if (ASKS.test(s)) return false;
  return DOING.test(s) || BROKEN.test(s) || WANTS.test(s);
}

// ------------------------------------------------------------- instant answers

// A model would take two seconds to do these worse. plan.mjs already works this
// way for handing out work; this is the same bargain. Anything that is really a
// lookup gets answered off state, now, having spent nothing.
function instant(text) {
  const q = text.toLowerCase().trim().replace(/[?.!]+$/, "");
  const s = state.office.stats;
  const working = state.agents.filter((a) => a.status === "working");

  if (/^(is the office (open|on|running)|are (they|the agents) working|is anyone working|anyone working)$/.test(q))
    return state.office.running
      ? `Yeah, open. ${working.length ? `${working.length} of them mid task right now.` : "Nobody's picked anything up this second though."}`
      : "No, it's shut. Nobody's working. Want me to open it?";

  if (/^(who'?s working|who is working|what are they doing|what's everyone doing)$/.test(q))
    return working.length
      ? `${working.length} on the go. ${working.slice(0, 3).map((a) => `${DEPARTMENTS.find((d) => d.key === a.dept)?.name || a.dept} on ${a.task}`).join(". ")}${working.length > 3 ? ". And a few more." : ""}`
      : state.office.running ? "Nobody this second, they're between jobs." : "Nobody. The office is shut.";

  if (/^(how many.*(done|shipped|completed)|what have they (done|shipped))$/.test(q))
    return `${s.completed} shipped. ${s.failed} failed and ${s.blocked || 0} I refused outright.`;

  return null;
}

// --------------------------------------------------------------- the warm line

// Two Claude Code processes, held open. Everything below exists so that he
// never waits for a spawn.
//
// This held a second, faster line for one-word replies, on the theory that
// Opus was too slow for "yeah" and "go on". Measured through the real server it
// was not: Opus answered in 1.51s and 2.19s while the quick line took 2.90s and
// 2.72s, and its replies ignored the brief and used punctuation he had asked
// not to see. A second process for worse answers no faster is not a trade, so
// there is one line and Opus is on it.
const lines = new Map();

// Measured on this machine, six turns per config: haiku at 1.99s median to the
// first word, versus 2.13s without these two flags and 8.9s the old way.
// --disable-slash-commands and excluding the dynamic sections both shave real
// time off every turn because they shrink what is re-sent each time.
function argv(model, system) {
  return [
    "-p",
    "--input-format", "stream-json",
    "--output-format", "stream-json",
    "--verbose",
    "--include-partial-messages",
    "--exclude-dynamic-system-prompt-sections",
    "--disable-slash-commands",
    "--model", model,
    "--system-prompt", system,
    // She is having a conversation. She has no business reading his files or
    // running anything, and every tool definition left in is prompt she pays
    // for on every single turn.
    "--disallowedTools", "Read,Grep,Glob,Bash,Edit,Write,WebSearch,WebFetch,Task,TodoWrite,NotebookEdit",
    "--strict-mcp-config", "--mcp-config", '{"mcpServers":{}}',
    "--setting-sources", "",
  ];
}

function openLine(name, model, system, recycleAfter) {
  const child = spawn(claudeBin(), argv(model, system), { env: childEnv(), windowsHide: true, stdio: ["pipe", "pipe", "pipe"] });
  const l = { name, model, recycleAfter, child, busy: false, waiting: null, buf: "", t0: 0, first: null, text: "", seeded: false, turns: 0, lastUsed: Date.now(), stderr: "" };

  child.stdout.on("data", (chunk) => {
    l.buf += chunk;
    let nl;
    while ((nl = l.buf.indexOf("\n")) !== -1) {
      const raw = l.buf.slice(0, nl).trim();
      l.buf = l.buf.slice(nl + 1);
      if (!raw) continue;
      let ev; try { ev = JSON.parse(raw); } catch { continue; }

      if (ev.type === "stream_event" && ev.event?.delta?.text) {
        l.first ??= Date.now() - l.t0;
        l.text += ev.event.delta.text;
        l.onDelta?.(ev.event.delta.text);
      }
      if (ev.type === "result") {
        const err = ev.is_error || ev.subtype !== "success" ? (ev.api_error_status || ev.subtype || "error") : null;
        l.waiting?.({ text: l.text.trim(), first: l.first, error: err });
      }
    }
  });

  child.stderr.on("data", (c) => { l.stderr = (l.stderr + c).slice(-500); });
  // A dead line must never leave him waiting forever on a promise nobody will
  // settle. Whoever was mid question gets told, and the next message opens a
  // fresh process rather than writing into a closed pipe.
  const drop = () => { if (lines.get(name) === l) lines.delete(name); };
  child.on("close", () => { l.waiting?.({ text: l.text.trim(), first: l.first, error: l.stderr || "the line dropped" }); drop(); });
  child.on("error", (e) => { l.waiting?.({ text: "", first: null, error: e.message }); drop(); });

  return l;
}

function lineFor(name, model, system, recycleAfter = CONFIG.talk.recycleAfter) {
  const held = lines.get(name);
  if (held && !held.child.killed) { held.lastUsed = Date.now(); return held; }
  const fresh = openLine(name, model, system, recycleAfter);
  lines.set(name, fresh);
  return fresh;
}

// The line she talks to him on.
const talkLine = () => lineFor("talk", CONFIG.talk.model, persona());

// Open the line before he says anything. The first turn on a cold process costs
// three to five seconds of startup, and this is how he stops paying it: the
// page calls this the moment it loads, so by the time he has finished talking
// she is already listening.
export function warm(also = []) {
  talkLine();
  // Anything else that will be asked a question the moment he says something,
  // opened now rather than when he is standing there waiting. The router is the
  // one that matters: cold it took 10.1s to work out which team owns a job,
  // warm it is under 6.
  for (const spec of also) lineFor(spec.name, spec.model, spec.system, spec.recycleAfter);
  return true;
}

/**
 * One question on a held-open line of its own, for the parts of the office that
 * need a fast answer rather than a conversation. Routing a job to a department
 * used to spawn a whole process for the question and took 17 seconds; on a warm
 * line it is a couple.
 * @param {object} o
 * @param {string} o.name    which line to hold open. Its own, not hers
 * @param {string} o.system  the whole system prompt for that line
 * @param {string} o.model
 * @param {string} o.prompt
 */
export async function oneShot({ name, system, model, prompt }) {
  const out = await ask(prompt, () => {}, { name, model, system });
  if (out.error && !out.text) return null;
  return out.text || null;
}

export const ready = () => [...lines.values()].some((l) => !l.child.killed);

export function hangUp() {
  for (const l of lines.values()) { try { l.child.stdin.end(); l.child.kill(); } catch {} }
  lines.clear();
}

// She is holding processes open on his laptop. If he has walked away, let them go.
setInterval(() => {
  for (const [name, l] of lines) {
    if (Date.now() - l.lastUsed <= CONFIG.talk.idleMs) continue;
    try { l.child.stdin.end(); l.child.kill(); } catch {}
    lines.delete(name);
  }
}, 60_000).unref();

// A held-open process re-sends the whole conversation on every turn, so her
// first word arrives later and later as the day goes on. Measured: 2.98s, then
// 3.35s, then 3.97s, then 4.09s, on four consecutive two word replies. Left
// alone she would be crawling by the evening.
//
// So the line is retired every so often and a fresh one takes over, seeded with
// the last few exchanges. She remembers the conversation because the transcript
// on disk is the real memory; the process is just the thing holding it open.
function recycleIfStale(name) {
  const l = lines.get(name);
  if (!l || l.turns < (l.recycleAfter ?? CONFIG.talk.recycleAfter)) return;
  try { l.child.stdin.end(); l.child.kill(); } catch {}
  lines.delete(name);
}

function ask(text, onDelta, spec = {}) {
  const { name = "talk", model = CONFIG.talk.model, system = persona(), recycleAfter } = spec;
  return new Promise((resolve) => {
    recycleIfStale(name);
    const l = lineFor(name, model, system, recycleAfter);
    if (l.busy) return resolve({ text: "", error: "still answering the last one" });
    l.turns = (l.turns || 0) + 1;
    l.busy = true;
    l.t0 = Date.now(); l.first = null; l.text = ""; l.onDelta = onDelta;

    // A held-open process that never answers used to leave this promise unsettled
    // forever, and because the line is also marked busy, every message after it
    // was refused too. One silent child wedged the whole channel until restart.
    const bell = setTimeout(() => {
      l.waiting?.({ text: l.text.trim(), first: l.first, error: "she did not answer in time" });
      try { l.child.kill(); } catch {}
      lines.delete(name);
    }, CONFIG.talk.answerMs);

    l.waiting = (out) => {
      clearTimeout(bell);
      l.busy = false; l.waiting = null; l.onDelta = null; l.lastUsed = Date.now();
      resolve(out);
    };
    try {
      l.child.stdin.write(JSON.stringify({ type: "user", message: { role: "user", content: [{ type: "text", text }] } }) + "\n");
    } catch (err) {
      l.busy = false;
      resolve({ text: "", error: err.message });
    }
  });
}

// A fresh process has no memory of yesterday, or of five minutes ago if it was
// idled out. The first message it ever gets carries the tail of the transcript
// so she picks up mid conversation instead of introducing herself again.
// Each line seeds independently: the quick line and the Opus line are separate
// processes with separate memories, so whichever one he lands on next has to be
// caught up on what the other one heard.
function withCatchUp(said, l) {
  if (l.seeded) return said;
  l.seeded = true;
  const turns = readDay().turns.slice(-10);
  if (!turns.length) return said;
  const tail = turns.map((t) => `${t.who === "ayaan" ? "He said" : "You said"}: ${t.text}`).join("\n");
  return `[Earlier in this conversation today, for your memory only. Do not mention it or react to it, just carry on naturally.]\n${tail}\n\n[He now says]\n${said}`;
}

// --------------------------------------------------------------- last resort

// Only when the subscription has rate limited her. Free, offline, and worse,
// but going quiet on him is worse still. Rule 2 is why this is Ollama and not
// a paid API with a spare key.
async function localReply(said, onDelta) {
  const r = await fetch(`${CONFIG.talk.ollama}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: CONFIG.talk.localModel,
      stream: true,
      keep_alive: "2h",
      options: { num_gpu: 99, num_ctx: 4096, temperature: 0.75, num_predict: 200 },
      messages: [
        { role: "system", content: persona() },
        ...readDay().turns.slice(-8).map((t) => ({ role: t.who === "ayaan" ? "user" : "assistant", content: t.text })),
        { role: "user", content: said },
      ],
    }),
    signal: AbortSignal.timeout(60_000),
  });
  if (!r.ok || !r.body) throw new Error(`local brain said ${r.status}`);
  const reader = r.body.getReader();
  const dec = new TextDecoder();
  let buf = "", text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let nl;
    while ((nl = buf.indexOf("\n")) !== -1) {
      const l = buf.slice(0, nl).trim(); buf = buf.slice(nl + 1);
      if (!l) continue;
      try { const j = JSON.parse(l); if (j.message?.content) { text += j.message.content; onDelta(j.message.content); } } catch {}
    }
  }
  return text.trim();
}

// ------------------------------------------------------------------ the reply

/**
 * What she says back. Streams as she says it.
 * @param {string} text  what he said
 * @param {(chunk:string)=>void} onDelta  each fragment, the moment it arrives
 */
export async function reply(text, onDelta = () => {}) {
  const said = String(text).trim().slice(0, 2000);
  if (!said) return { say: "Didn't catch that.", via: "instant" };

  remember("ayaan", said);

  // He told her to hold on to something. Do it, say so, spend nothing.
  const note = said.match(/^(?:remember|note|don'?t forget)(?: that)?[,:]?\s+(.{8,})$/i);
  if (note) {
    const say = noteAboutHim(note[1]) ? "Got it, I'll hang on to that." : "Already had that one.";
    onDelta(say); remember("pinnacle", say);
    return { say, via: "instant" };
  }

  const quick = instant(said);
  if (quick) { onDelta(quick); remember("pinnacle", quick); return { say: quick, via: "instant", ms: 0 }; }

  const out = await ask(withCatchUp(said, talkLine()), onDelta);
  if (out.text && !out.error) {
    remember("pinnacle", out.text);
    return { say: out.text, via: CONFIG.talk.model, ms: out.first };
  }

  // The line failed. Say what actually happened, in her voice, and fall back to
  // the free brain rather than leaving him talking to a spinner.
  hangUp();
  const limited = /rate.?limit|429|usage limit|overloaded|quota/i.test(String(out.error));
  try {
    const say = await localReply(said, onDelta);
    if (!say) throw new Error("nothing came back");
    remember("pinnacle", say);
    return { say, via: "local", degraded: limited ? "rate limited, running on the local brain" : "the line dropped, running on the local brain" };
  } catch {
    const say = limited
      ? "I'm rate limited for a bit. Give me a few minutes and I'll be back."
      : "That one fell over on me. Say it again?";
    onDelta(say); remember("pinnacle", say);
    return { say, via: "down", error: String(out.error || "").slice(0, 200) };
  }
}

// ----------------------------------------------------------------- the greeting

// She speaks first on a new day. Not a status report and not a cron job that
// fired: she picks up where they left off, the way somebody does when they have
// not seen you since yesterday.
export const greetingDue = () => readDay().turns.length === 0;

export async function greeting(onDelta = () => {}) {
  const prior = days().filter((d) => d !== today());
  const last = prior[0] ? readDay(prior[0]) : null;
  const lastAt = last?.turns.at(-1)?.t;
  const gap = lastAt ? Math.round((Date.now() - lastAt) / 86_400_000) : 0;
  const hour = new Date().getHours();
  const when = hour < 5 ? "the middle of the night" : hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const brief = `[Not from him. This is you deciding to speak first.]

It is ${when} where he is. ${last
    ? `You last spoke ${gap <= 1 ? "yesterday" : `${gap} days ago`}. The end of it went:\n${last.turns.slice(-6).map((t) => `${t.who === "ayaan" ? "He said" : "You said"}: ${t.text}`).join("\n")}`
    : "You have never spoken to him before."}
The office is ${state.office.running ? "open" : "shut"}.

Say hello. One or two sentences, out loud, the way you would to somebody you know. ${last
    ? "Pick the thread back up if there is anything worth picking up. Otherwise just say hello properly and ask how he is."
    : "Say who you are in a line and ask him something."} No status report, no lists, no mention of these instructions.`;

  // The brief above already carries the catch-up, so the line must not add it.
  talkLine().seeded = true;
  const out = await ask(brief, onDelta);
  if (out.text && !out.error) { remember("pinnacle", out.text); return { say: out.text, via: CONFIG.talk.model, ms: out.first }; }

  const say = last ? "Hey. Been a bit. What's on today?" : "Hey, I'm Pinnacle. I'll be around whenever you feel like talking. How's things?";
  onDelta(say); remember("pinnacle", say);
  return { say, via: "instant" };
}
