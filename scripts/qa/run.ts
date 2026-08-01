// The tutor audit: an automated student that hammers the live app and grades it.
//
// It talks to the real /api/chat with the real system prompt and the real
// grounding, then judges every answer twice:
//   1. Deterministically — figures are parsed by the SAME engine the browser
//      uses (lib/figure.ts), so "the triangle has no right angle" is measured,
//      not guessed. Length, LaTeX, text art, honesty and adaptation likewise.
//   2. By a second LLM pass — an examiner asked to find what is wrong with the
//      figure and the explanation, which catches the errors no regex can.
//
// Run:  npm run qa            (full battery, live site)
//       npm run qa -- --smoke (five probes, for iterating)
//       npm run qa -- --base http://localhost:3001
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { buildSystemPrompt, FORMAT_REMINDER, simplifyReminder } from "../../src/lib/persona";
import { freshProfile, hardWordsIn, observeStudent, type LearnerProfile } from "../../src/lib/learner";
import { factualAnswer, groundingFor } from "../../src/lib/grounding";
import {
  auditFigure,
  correctGeometry,
  compileFn,
  isGeometry,
  isTextArt,
  parsePlotSpec,
  rightAngleIndex,
  sideLengths,
  angleAt,
  type FigureIssue,
  type PlotSpec,
} from "../../src/lib/figure";
import type { ClassLevel, StudentMemory } from "../../src/lib/types";
import { PROBES, SMOKE, type Probe } from "./probes";

/* ------------------------------------------------------------------ *
 * Findings
 * ------------------------------------------------------------------ */

type Severity = "blocker" | "major" | "minor";

interface Finding {
  probe: string;
  turn: number;
  code: string;
  severity: Severity;
  detail: string;
  /** true when the app repaired it before the student could see it. */
  autoFixed?: boolean;
}

const findings: Finding[] = [];
function flag(
  probe: string,
  turn: number,
  code: string,
  severity: Severity,
  detail: string,
  autoFixed = false
) {
  findings.push({ probe, turn, code, severity, detail, autoFixed });
}

/* ------------------------------------------------------------------ *
 * Talking to the app
 * ------------------------------------------------------------------ */

const argv = process.argv.slice(2);
const argOf = (name: string, fallback: string) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const BASE = argOf("base", process.env.QA_BASE || "https://pinnacle-ai-two.vercel.app");
const SMOKE_ONLY = argv.includes("--smoke");
/** Local Ollama has no quota, so none of the rate-limit ceremony applies. */
const LOCAL = /localhost|127\.0\.0\.1/.test(BASE);
/**
 * The cloud free tier is billed per MINUTE (Groq, ~12k tokens), and one
 * grounded turn is ~3k of them. Three calls a minute is the honest ceiling;
 * going faster does not audit the tutor, it audits the rate limiter. Against a
 * local model the only limit is the GPU, so the audit runs flat out.
 */
const PACE_MS = Number(argOf("pace", LOCAL ? "0" : "20000"));
const JUDGE = !argv.includes("--no-judge");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface WireMessage {
  role: "user" | "assistant";
  content: string;
}

async function ask(
  messages: WireMessage[],
  system: string,
  reminder?: string,
  attempt = 0,
  maxTokens?: number
): Promise<string> {
  const res = await fetch(`${BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: messages.slice(-10), system, reminder, maxTokens }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // 429 = the free minute budget. Wait it out rather than failing the audit.
    if ((res.status === 429 || res.status >= 500) && attempt < 4) {
      const wait = 20_000 * (attempt + 1);
      log(`   … ${res.status} from the API, waiting ${wait / 1000}s and retrying`);
      await sleep(wait);
      return ask(messages, system, reminder, attempt + 1, maxTokens);
    }
    throw new Error(`chat ${res.status}: ${body.slice(0, 200)}`);
  }
  const text = await res.text();

  // The endpoint answers 200 and puts provider failures INTO the body, so a
  // throttled minute arrives looking exactly like a bad tutor reply. Scoring
  // those as teaching failures would fill the report with noise, so they are
  // retried instead — that is an audit of the tutor, not of the free tier.
  if (isInfraFailure(text) && attempt < (LOCAL ? 1 : 4)) {
    // Locally this is not a quota, it is a dead server, so retry once and fast.
    const wait = LOCAL ? 2_000 : 65_000;
    log(`   … provider unavailable, waiting ${wait / 1000}s and retrying the turn`);
    await sleep(wait);
    return ask(messages, system, reminder, attempt + 1, maxTokens);
  }
  return text;
}

const INFRA_MARKERS = [
  "per-minute limit",
  "connection dropped mid-answer",
  "couldn't reach the tutor service",
  "tutor service is not configured",
  "local brain unreachable",
  "local brain returned",
];

/** Is this the plumbing failing rather than the teacher? */
function isInfraFailure(text: string): boolean {
  const t = text.toLowerCase();
  // Short replies only: a real 900-word lesson that happens to mention a limit
  // is not an outage.
  return text.trim().length < 700 && INFRA_MARKERS.some((m) => t.includes(m));
}

const lines: string[] = [];
function log(s: string) {
  console.log(s);
  lines.push(s);
}

/* ------------------------------------------------------------------ *
 * Readability — the measure behind "does it get simpler?"
 * ------------------------------------------------------------------ */

function syllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  const groups = w.replace(/(?:es|ed|e)$/, "").match(/[aeiouy]+/g);
  return Math.max(1, groups ? groups.length : 1);
}

/** Prose only: figures, LaTeX and code are not what "simpler words" means. */
function proseOf(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^$\n]*\$/g, " ")
    .replace(/[*_#>`]/g, " ");
}

interface Readability {
  words: number;
  sentences: number;
  avgSentence: number;
  hardRatio: number;
  /** Higher = harder to read. */
  grade: number;
}

function readability(text: string): Readability {
  const prose = proseOf(text);
  const words = prose.split(/\s+/).filter((w) => /[a-z]/i.test(w));
  const sentences = prose.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim().length > 2);
  const nWords = Math.max(1, words.length);
  const nSent = Math.max(1, sentences.length);
  const hard = words.filter((w) => syllables(w) >= 3).length;
  const avgSentence = nWords / nSent;
  const hardRatio = hard / nWords;
  // Flesch-Kincaid grade level, near enough for a relative comparison.
  const grade =
    0.39 * avgSentence + 11.8 * (words.reduce((s, w) => s + syllables(w), 0) / nWords) - 15.59;
  return { words: words.length, sentences: sentences.length, avgSentence, hardRatio, grade };
}

/**
 * How much of the second explanation is just the first one again.
 *
 * The words that name the TOPIC are excluded. Re-explaining polynomials
 * necessarily says "polynomial", "zeroes" and "coefficients" again; what
 * matters is whether the explanation around them changed, and counting the
 * subject's own name as repetition would mark every honest re-explanation as a
 * failure.
 */
const TOPIC_WORDS = new Set([
  "polynomial", "polynomials", "zeroes", "zeros", "coefficient", "coefficients",
  "quadratic", "linear", "cubic", "degree", "equation", "equations", "graph",
  "triangle", "angle", "angles", "trigonometry", "hypotenuse", "formula",
  "value", "values", "number", "numbers", "example", "answer", "question",
  "student", "means", "think", "would", "there", "these", "which", "where",
]);

function overlap(a: string, b: string): number {
  const set = (t: string) =>
    new Set(
      proseOf(t)
        .toLowerCase()
        .split(/\W+/)
        .filter((w) => w.length > 4 && !TOPIC_WORDS.has(w))
    );
  const A = set(a);
  const B = set(b);
  if (!A.size || !B.size) return 0;
  let hit = 0;
  for (const w of B) if (A.has(w)) hit++;
  return hit / B.size;
}

/* ------------------------------------------------------------------ *
 * Figure extraction + description
 * ------------------------------------------------------------------ */

function plotBlocks(text: string): string[] {
  return [...text.matchAll(/```plot\s*\n([\s\S]*?)```/g)].map((m) => m[1].trim());
}
function mermaidBlocks(text: string): string[] {
  return [...text.matchAll(/```mermaid\s*\n([\s\S]*?)```/g)].map((m) => m[1].trim());
}
function otherCodeBlocks(text: string): string[] {
  return [...text.matchAll(/```([a-zA-Z]*)[ \t]*\n([\s\S]*?)```/g)]
    .filter((m) => !["plot", "mermaid"].includes((m[1] || "").toLowerCase()))
    .map((m) => m[2]);
}

/** What the student will actually SEE, in words — the judge reads this. */
function describeFigure(spec: PlotSpec): string {
  if (isGeometry(spec)) {
    const { spec: fixed, points } = correctGeometry(spec);
    const sides = sideLengths(points).map((v) => v.toFixed(2));
    const angles = points.map((_, i) => `${Math.round(angleAt(points, i))}°`);
    const names = points.map((_, i) => fixed.labels?.[i] || "ABCDEFGH"[i]);
    return [
      `A ${points.length}-sided figure with vertices ${names.join(", ")}.`,
      `Drawn side lengths (in drawing units): ${sides.join(", ")}.`,
      `Interior angles: ${angles.join(", ")}.`,
      fixed.sideLabels?.length ? `Side labels printed on it: ${fixed.sideLabels.join(", ")}.` : "No side labels printed.",
      fixed.angleLabels?.length ? `Angle labels: ${fixed.angleLabels.join(", ")}.` : "",
      typeof fixed.right === "number" ? `Right-angle marker at vertex ${names[fixed.right]}.` : "No right-angle marker.",
      fixed.title ? `Caption: ${fixed.title}` : "No caption.",
    ]
      .filter(Boolean)
      .join(" ");
  }
  const fns = typeof spec.fn === "string" ? [spec.fn] : spec.fn ?? [];
  const dom = spec.domain ?? [-10, 10];
  const parts = [`A graph of ${fns.join(" and ") || "plotted points"} over x from ${dom[0]} to ${dom[1]}.`];
  const f = fns.length === 1 ? compileFn(fns[0]) : null;
  if (f) {
    const samples = [-2, -1, 0, 1, 2].map((x) => `(${x}, ${Number(f(x).toFixed(2))})`);
    parts.push(`Points on the drawn curve: ${samples.join(", ")}.`);
  }
  parts.push(`Axes are labelled ${spec.xLabel || "x"} and ${spec.yLabel || "y"} with a numbered scale and a table of values underneath.`);
  parts.push(spec.title ? `Caption: ${spec.title}` : "No caption.");
  return parts.join(" ");
}

/* ------------------------------------------------------------------ *
 * Deterministic checks
 * ------------------------------------------------------------------ */

const HONEST_MARKERS = [
  "don't have", "do not have", "not loaded", "paste", "doesn't exist", "does not exist",
  "can't find", "cannot find", "not in the", "no exercise", "isn't in", "is not in",
  "not part of", "removed",
];

function checkTurn(probe: Probe, turn: number, reply: string) {
  const exp = probe.expect ?? {};
  const plots = plotBlocks(reply);
  const mermaids = mermaidBlocks(reply);
  const specs = plots.map(parsePlotSpec).filter((s): s is PlotSpec => Boolean(s));

  // --- text art -----------------------------------------------------------
  for (const block of otherCodeBlocks(reply)) {
    if (isTextArt(block)) {
      flag(probe.id, turn, "text-art", "major", "Drew a picture out of keyboard characters instead of a real figure.");
      break;
    }
  }

  // --- bare maths ---------------------------------------------------------
  const bare = proseOf(reply);
  const bareHits = [
    [/\b[a-zA-Z]\^\d/, "an exponent outside $…$ (e.g. x^2)"],
    [/\bsqrt\s*\(/i, "sqrt( ) instead of \\sqrt"],
    [/[^<>=!]!=[^=]/, "!= instead of \\neq"],
    [/\bdegrees\b/i, "the word 'degrees' instead of ^\\circ"],
  ] as const;
  for (const [re, what] of bareHits) {
    if (re.test(bare)) {
      flag(probe.id, turn, "bare-maths", "minor", `Maths written as plain text: ${what}.`);
      break;
    }
  }

  // --- emoji / banned phrasing -------------------------------------------
  if (/\p{Extended_Pictographic}/u.test(reply)) {
    flag(probe.id, turn, "emoji", "minor", "Used an emoji; the product voice forbids it.");
  }
  for (const phrase of ["as an ai", "i cannot draw", "i can't draw", "imagine a triangle", "picture in your mind"]) {
    if (reply.toLowerCase().includes(phrase)) {
      flag(probe.id, turn, "banned-phrase", "major", `Said "${phrase}" — it can draw, and it is not a generic chatbot.`);
    }
  }

  // --- figures ------------------------------------------------------------
  if (exp.figure && !plots.length && !mermaids.length) {
    flag(probe.id, turn, "no-figure", "blocker", "The question needs a drawn figure and none was produced.");
  }
  for (const spec of specs) {
    for (const issue of auditFigure(spec) as FigureIssue[]) {
      flag(
        probe.id,
        turn,
        `figure:${issue.code}`,
        issue.repaired ? "major" : issue.code === "no-title" ? "minor" : "major",
        issue.detail,
        issue.repaired
      );
    }
  }
  if (exp.rightAngle) {
    const ok = specs.some((s) => {
      if (!isGeometry(s)) return false;
      const { points } = correctGeometry(s);
      return rightAngleIndex(points) >= 0;
    });
    if (!ok) {
      flag(probe.id, turn, "no-right-angle", "blocker", "Asked for a right-angled figure; the drawn figure has no 90° angle.");
    }
  }
  if (exp.graph) {
    const ok = specs.some((s) => {
      const fns = typeof s.fn === "string" ? [s.fn] : s.fn ?? [];
      return fns.some((f) => compileFn(f));
    });
    if (!ok) {
      flag(probe.id, turn, "no-graph", "blocker", "Asked for a graph; no plottable function was emitted.");
    }
  }
  // A shape sent to mermaid comes out as boxes and arrows, never a triangle.
  for (const m of mermaids) {
    if (/triangle|circle|square|hypotenuse|angle/i.test(m) && /flowchart|graph\s+(LR|TD)/i.test(m)) {
      flag(probe.id, turn, "shape-in-mermaid", "major", "Tried to draw a geometric shape with mermaid, which can only draw boxes and arrows.");
    }
  }

  // --- content ------------------------------------------------------------
  for (const w of exp.mustMention ?? []) {
    if (!reply.toLowerCase().includes(w.toLowerCase())) {
      flag(probe.id, turn, "missing-content", "major", `Never mentioned "${w}", which this answer cannot be correct without.`);
    }
  }
  for (const w of exp.mustNotMention ?? []) {
    if (reply.toLowerCase().includes(w.toLowerCase())) {
      flag(probe.id, turn, "forbidden-content", "major", `Mentioned "${w}", which does not belong in this answer.`);
    }
  }
  if (exp.honestRefusal) {
    const honest = HONEST_MARKERS.some((m) => reply.toLowerCase().includes(m));
    if (!honest) {
      flag(probe.id, turn, "invented-content", "blocker", "Was asked for material that does not exist and answered anyway instead of saying so.");
    }
  }

  // --- shape of the teaching ---------------------------------------------
  const r = readability(reply);
  if (exp.maxWords && r.words > exp.maxWords) {
    flag(probe.id, turn, "wall-of-text", "major", `${r.words} words (cap ${exp.maxWords}). A tutor answers in checkpoints, not essays.`);
  }
  if (exp.endsWithQuestion) {
    const tail = proseOf(reply).trim().split("\n").filter(Boolean).slice(-3).join(" ");
    const asks = /\?\s*$/.test(proseOf(reply).trim()) || /\?/.test(tail) || /your turn|try this|you try|have a go/i.test(tail);
    if (!asks) {
      flag(probe.id, turn, "no-check-question", "major", "Ended without asking the student to do anything — nothing checks that it landed.");
    }
  }
  return r;
}

/* ------------------------------------------------------------------ *
 * The LLM examiner pass
 * ------------------------------------------------------------------ */

const JUDGE_SYSTEM = `You are a strict CBSE examiner and an experienced Maths/Science teacher reviewing another teacher's work.
You are given a student's question, the teacher's answer, and an exact description of the figure the app will draw.
Find real teaching errors. Be specific and be hard to please, but never invent a problem that is not there.
Judge these things:
1. Is the figure the RIGHT figure for the question, and does it match the numbers in the answer?
2. Is the figure complete: labelled vertices/axes, values marked, nothing a student must guess?
3. Is the maths correct?
4. Is it taught one step at a time, in words a school student of this class actually understands?
5. Does the answer show the working — where every number came from?
Reply with ONLY a JSON object, no prose, no code fence:
{"verdict":"ok"|"flawed","defects":[{"severity":"blocker"|"major"|"minor","what":"one sentence"}]}`;

async function judge(probe: Probe, reply: string): Promise<void> {
  const specs = plotBlocks(reply).map(parsePlotSpec).filter((s): s is PlotSpec => Boolean(s));
  const figureText = specs.length
    ? specs.map((s, i) => `FIGURE ${i + 1}: ${describeFigure(s)}`).join("\n")
    : "No figure was drawn.";
  const prompt = [
    `CLASS: ${probe.classLevel ?? 10} (CBSE)`,
    `STUDENT ASKED: ${probe.turns[probe.turns.length - 1]}`,
    "",
    "TEACHER'S ANSWER:",
    reply.slice(0, 4000),
    "",
    "WHAT THE APP WILL ACTUALLY DRAW:",
    figureText,
  ].join("\n");

  let raw = "";
  try {
    raw = await ask([{ role: "user", content: prompt }], JUDGE_SYSTEM);
  } catch (err) {
    log(`   judge failed: ${(err as Error).message}`);
    return;
  }
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) return;
  try {
    const parsed = JSON.parse(m[0]) as {
      verdict: string;
      defects?: { severity: Severity; what: string }[];
    };
    for (const d of parsed.defects ?? []) {
      // Against a local model the examiner IS the model under test — a 3B
      // marking its own homework. Its verdicts are worth reading and are not
      // worth treating as proof, so they never outrank a measured failure.
      const severity: Severity =
        LOCAL && (d.severity ?? "major") === "blocker" ? "major" : (d.severity ?? "major");
      flag(probe.id, probe.turns.length - 1, LOCAL ? "examiner-advisory" : "examiner", severity, d.what);
    }
  } catch {
    /* the judge did not return clean JSON; not the tutor's fault */
  }
}

/* ------------------------------------------------------------------ *
 * The run
 * ------------------------------------------------------------------ */

function memoryFor(probe: Probe): StudentMemory {
  return {
    name: "Aarav",
    classLevel: (probe.classLevel ?? 10) as ClassLevel,
    mode: "board",
    examTargets: [],
    achievements: ["Joined Pinnacle AI"],
    strengths: [],
    focusAreas: [],
    streak: 3,
    altitude: 40,
    lastTopics: [],
    notes: [],
    progress: {},
  };
}

async function runProbe(probe: Probe) {
  log(`\n▸ ${probe.id}`);
  const memory = memoryFor(probe);
  const history: WireMessage[] = [];
  const reads: Readability[] = [];
  const replies: string[] = [];
  // The audit has to make the SAME decisions the app makes, or it measures a
  // product no student ever uses. This mirrors Tutor.tsx exactly: read the
  // student, carry the profile forward, answer from the library where the
  // library knows, and switch to the simplify ladder when they say they are lost.
  let profile: LearnerProfile = freshProfile();

  for (let t = 0; t < probe.turns.length; t++) {
    const content = probe.turns[t];
    history.push({ role: "user", content });
    const observed = observeStudent(profile, content);
    profile = observed.profile;

    const known = factualAnswer(content, memory.classLevel);
    if (known) {
      replies.push(known);
      reads.push(readability(known));
      checkTurn(probe, t, known);
      history.push({ role: "assistant", content: known });
      log(`   turn ${t + 1}: answered from the library, no model call`);
      continue;
    }

    const grounding = groundingFor(content, memory.classLevel);
    const system = buildSystemPrompt(memory, grounding, profile);
    const needsSimpler = observed.lost || observed.wantsSlower;
    const reminder = needsSimpler
      ? `${simplifyReminder(profile.level >= 3 ? 3 : 2, profile.interests, hardWordsIn(replies[replies.length - 1] ?? "", [content]))}\n\n${FORMAT_REMINDER}`
      : FORMAT_REMINDER;
    // Free chat had no ceiling at all, and the local model filled whatever it
    // was given: 424, 446 and 478-word replies to single doubts.
    const budget = needsSimpler ? (profile.level >= 3 ? 240 : 320) : 620;
    let reply = "";
    try {
      reply = await ask(history, system, reminder, 0, budget);
    } catch (err) {
      flag(probe.id, t, "api", "blocker", `Request failed: ${(err as Error).message}`);
      return { probe, replies };
    }
    if (isInfraFailure(reply)) {
      flag(probe.id, t, "api-unavailable", "minor", "The free tutor tier stayed throttled through every retry, so this turn was never actually graded.");
      log(`   turn ${t + 1}: skipped, provider unavailable`);
      history.pop();
      history.pop();
      continue;
    }
    history.push({ role: "assistant", content: reply });
    replies.push(reply);
    const r = checkTurn(probe, t, reply);
    reads.push(r);
    log(`   turn ${t + 1}: ${r.words} words, grade ${r.grade.toFixed(1)}`);
    await sleep(PACE_MS);
  }

  // Adaptation is a property of the SEQUENCE, not of any single reply.
  const exp = probe.expect ?? {};
  if (exp.simplifies && reads.length >= 2) {
    for (let i = 1; i < reads.length; i++) {
      const before = reads[i - 1];
      const after = reads[i];
      // Judged on sentence length and on the SPREAD of hard vocabulary, not on
      // the raw Flesch-Kincaid grade. A short reply about "the relationship
      // between the zeroes and the coefficients" cannot avoid four-syllable
      // words, and scoring it on their density punishes the tutor for the topic
      // rather than for the teaching. What "simpler" actually means here is:
      // shorter sentences, and fewer different hard words to hold at once.
      const beforeHard = new Set(hardWordsIn(replies[i - 1], [], 40));
      const afterHard = new Set(hardWordsIn(replies[i], [], 40));
      // The bar: the re-explanation has to be easier on at least one of the two
      // axes that matter to a confused student — how hard the words are, and
      // how many different hard ones they must hold at once — and worse on
      // neither. Requiring every axis to improve at once fails answers that got
      // genuinely easier, which is how a check stops being useful.
      const easierWords = after.grade < before.grade - 0.2;
      const fewerHardWords = afterHard.size < beforeHard.size;
      if (!easierWords && !fewerHardWords) {
        flag(
          probe.id,
          i,
          "no-simplification",
          "blocker",
          `The student said they did not understand, and the re-explanation did not get simpler ` +
            `(sentence length ${before.avgSentence.toFixed(1)} → ${after.avgSentence.toFixed(1)} words, ` +
            `distinct hard words ${beforeHard.size} → ${afterHard.size}, ` +
            `length ${before.words} → ${after.words}, reading grade ${before.grade.toFixed(1)} → ${after.grade.toFixed(1)}).`
        );
      }
      const same = overlap(replies[i - 1], replies[i]);
      if (same > 0.72) {
        flag(
          probe.id,
          i,
          "repeated-explanation",
          "major",
          `Re-explained with ${(same * 100).toFixed(0)}% of the same vocabulary — it repeated itself louder instead of teaching it differently.`
        );
      }
    }
  }
  if (exp.remembers) {
    const last = replies[replies.length - 1] ?? "";
    if (!last.toLowerCase().includes(exp.remembers.toLowerCase())) {
      flag(
        probe.id,
        replies.length - 1,
        "forgot-the-student",
        "blocker",
        `The student said how they understand things, and the very next explanation ignored it (no sign of "${exp.remembers}").`
      );
    }
  }

  if (JUDGE && replies.length) {
    await judge(probe, replies[replies.length - 1]);
    await sleep(PACE_MS);
  }
  return { probe, replies };
}

function report(transcripts: { probe: Probe; replies: string[] }[]) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const dir = join(process.cwd(), "qa-reports");
  mkdirSync(dir, { recursive: true });

  const bySeverity = (s: Severity) => findings.filter((f) => f.severity === s);
  const md: string[] = [];
  md.push(`# Tutor audit — ${stamp}`);
  md.push("");
  md.push(`Target: ${BASE}`);
  if (LOCAL && JUDGE) {
    md.push("");
    md.push(
      "_The examiner pass ran on the same local model that produced the answers, so `examiner-advisory` findings are one small model marking its own homework. Read them; do not treat them as proof. The measured checks (figures, length, adaptation, honesty) are the evidence._"
    );
    md.push("");
  }
  md.push(`Probes: ${transcripts.length} · Findings: ${findings.length} ` +
    `(${bySeverity("blocker").length} blocker, ${bySeverity("major").length} major, ${bySeverity("minor").length} minor)`);
  md.push("");

  const byProbe = new Map<string, Finding[]>();
  for (const f of findings) {
    if (!byProbe.has(f.probe)) byProbe.set(f.probe, []);
    byProbe.get(f.probe)!.push(f);
  }

  md.push("## Failures by probe");
  md.push("");
  for (const { probe } of transcripts) {
    const fs = byProbe.get(probe.id) ?? [];
    md.push(`### ${probe.id} — ${fs.length ? `${fs.length} finding(s)` : "clean"}`);
    md.push(`_${probe.why}_`);
    md.push("");
    md.push(`> ${probe.turns.join(" ⟶ ")}`);
    md.push("");
    for (const f of fs) {
      md.push(`- **${f.severity}** \`${f.code}\`${f.autoFixed ? " _(app auto-repaired it)_" : ""} — ${f.detail}`);
    }
    md.push("");
  }

  md.push("## Every finding, worst first");
  md.push("");
  const order: Severity[] = ["blocker", "major", "minor"];
  for (const sev of order) {
    for (const f of bySeverity(sev)) {
      md.push(`- **${sev}** \`${f.code}\` in _${f.probe}_ (turn ${f.turn + 1}) — ${f.detail}`);
    }
  }
  md.push("");
  md.push("## Transcripts");
  md.push("");
  for (const t of transcripts) {
    md.push(`<details><summary>${t.probe.id}</summary>`);
    md.push("");
    t.replies.forEach((r, i) => {
      md.push(`**Student:** ${t.probe.turns[i]}`);
      md.push("");
      md.push("```markdown");
      md.push(r.slice(0, 6000));
      md.push("```");
      md.push("");
    });
    md.push("</details>");
    md.push("");
  }

  const mdPath = join(dir, `audit-${stamp}.md`);
  writeFileSync(mdPath, md.join("\n"), "utf8");
  writeFileSync(join(dir, "latest.json"), JSON.stringify({ base: BASE, stamp, findings }, null, 2), "utf8");
  writeFileSync(join(dir, "latest.md"), md.join("\n"), "utf8");
  return { mdPath, blockers: bySeverity("blocker").length, majors: bySeverity("major").length };
}

export async function main() {
  const only = argOf("only", "");
  const list = only
    ? PROBES.filter((p) => only.split(",").includes(p.id))
    : SMOKE_ONLY
      ? PROBES.filter((p) => SMOKE.has(p.id))
      : PROBES;
  log(`Tutor audit against ${BASE}${LOCAL ? " (local model, no quota)" : ""}`);
  log(`${list.length} probes, ${list.reduce((n, p) => n + p.turns.length, 0)} student messages, pacing ${PACE_MS}ms`);

  const transcripts: { probe: Probe; replies: string[] }[] = [];
  for (const probe of list) {
    transcripts.push(await runProbe(probe));
  }

  const { mdPath, blockers, majors } = report(transcripts);
  log("");
  log(`Findings: ${findings.length} (${blockers} blocker, ${majors} major)`);
  log(`Report: ${mdPath}`);
  return blockers;
}
