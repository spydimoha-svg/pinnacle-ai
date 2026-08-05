// The lesson engine.
//
// The old tutor had one prompt for every situation, so every answer came out
// the same shape: a complete, competent, unstoppable essay. A real teacher does
// not do that. A real teacher finds out what you know, teaches ONE thing,
// checks it landed, and only then moves — and if it did not land, says it again
// a different way, not the same way louder.
//
// So the shape of the reply is decided here, in code, phase by phase, and the
// model is given one small job per turn:
//
//   placement  → ask what they already know (real prerequisite questions)
//   grade      → mark those answers, then the APP draws the route map
//   teach      → one concept, one worked example, one check question
//   check      → mark the answer, name the CAUSE of any error
//   reteach    → the same idea from a different angle, simpler each time
//   recap      → what was learnt, and the board questions it answers
//
// Nothing here asks the model to decide when to move on. That is the whole
// point: the pacing belongs to the student's answers, not to the model's mood.
import type { ClassLevel, StudentMemory } from "./types";
import { SUBJECTS } from "../data/curriculum";
import { conceptMapFor, roadmapDiagram, type Concept, type ConceptMap } from "../data/concepts";
import { groundingForChapter, hasWord } from "./grounding";
import { describeLearner, type LearnerProfile } from "./learner";
import { gradeAnswer, stripScaffolding } from "./grade";
import { FORMAT_CONTRACT, FORMAT_REMINDER, GROUNDING_REMINDER } from "./persona";

export type LessonPhase =
  | "placement"
  | "grade"
  | "teach"
  | "check"
  | "reteach"
  | "recap"
  | "done";

export interface ConceptProgress {
  status: "pending" | "teaching" | "mastered" | "shaky";
  attempts: number;
  /** How simply it had to be explained before it landed. */
  levelUsed: number;
}

export interface LessonState {
  chapterId: string;
  chapterTitle: string;
  classLevel: ClassLevel;
  phase: LessonPhase;
  /** Index into the concept list. */
  index: number;
  progress: Record<string, ConceptProgress>;
  /** Which prerequisites the placement check found missing. */
  gaps: string[];
  placement?: "beginner" | "developing" | "strong";
  /** Wrong answers to the CURRENT concept's check question. */
  retries: number;
  /** Times the CURRENT concept has been re-explained from a new angle. */
  reteaches: number;
  startedAt: number;
  updatedAt: number;
}

/* ------------------------------------------------------------------ *
 * Starting a lesson
 * ------------------------------------------------------------------ */

const LEARN_INTENT =
  /\b(?:teach me|learn|start(?:ing)? (?:with|on)?|explain the (?:whole|full|entire)|from (?:scratch|zero|the beginning|basics)|walk me through|take me through|cover the (?:whole|full)|full chapter|whole chapter|complete chapter|revise the (?:whole|full))\b/i;

/** Words that mean "answer my question", not "run me a lesson". */
const DOUBT_INTENT =
  /\b(?:solve|grade|mark my|check my|what is the answer|give me (?:a|some) question|exercise \d|why does|quick doubt)\b/i;

/**
 * Does this message mean "run me a proper lesson on X"?
 *
 * Deliberately conservative: a lesson takes over the conversation, so it only
 * starts when the student clearly asked to be taught something whole, and never
 * when they asked a one-off doubt.
 */
export function detectLessonIntent(
  message: string,
  classLevel?: ClassLevel
): { chapterId: string; title: string } | null {
  if (!LEARN_INTENT.test(message)) return null;
  if (DOUBT_INTENT.test(message)) return null;

  const q = message.toLowerCase();
  const scoped = classLevel ? SUBJECTS.filter((s) => s.classLevel === classLevel) : SUBJECTS;
  const pool = scoped.length ? scoped : SUBJECTS;

  let best: { chapterId: string; title: string; score: number } | null = null;
  for (const s of pool) {
    for (const c of s.chapters) {
      let score = 0;
      const title = c.title.toLowerCase();
      if (hasWord(q, title)) score += 6;
      for (const t of c.keyTopics) {
        if (t.length > 4 && hasWord(q, t.toLowerCase())) score += 3;
      }
      if (score > 0 && (!best || score > best.score)) {
        best = { chapterId: c.id, title: c.title, score };
      }
    }
  }
  return best && best.score >= 5 ? { chapterId: best.chapterId, title: best.title } : null;
}

export function startLesson(chapterId: string, classLevel: ClassLevel): LessonState | null {
  const map = conceptMapFor(chapterId);
  if (!map || !map.concepts.length) return null;
  return {
    chapterId,
    chapterTitle: map.chapterTitle,
    classLevel,
    phase: "placement",
    index: 0,
    progress: Object.fromEntries(
      map.concepts.map((c) => [c.id, { status: "pending", attempts: 0, levelUsed: 1 } as ConceptProgress])
    ),
    gaps: [],
    retries: 0,
    reteaches: 0,
    startedAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function currentConcept(state: LessonState): Concept | null {
  const map = conceptMapFor(state.chapterId);
  if (!map) return null;
  return map.concepts[state.index] ?? null;
}

export function lessonMap(state: LessonState): ConceptMap | null {
  return conceptMapFor(state.chapterId);
}

export function masteredIds(state: LessonState): string[] {
  return Object.entries(state.progress)
    .filter(([, p]) => p.status === "mastered")
    .map(([id]) => id);
}

/* ------------------------------------------------------------------ *
 * Control tags
 * ------------------------------------------------------------------ */

/**
 * The model reports its verdict on a final tagged line, which the app reads and
 * removes before the student sees anything. Asking for a machine-readable
 * verdict is what lets the ENGINE decide whether to move on — rather than
 * hoping the prose said "well done" and meaning it.
 */
const TAG_RE = /^\s*@@(PLACEMENT|GAPS|VERDICT)\s*:\s*(.*)$/gim;

export interface Verdict {
  clean: string;
  mastered?: boolean;
  placement?: "beginner" | "developing" | "strong";
  gaps?: string[];
  /** Who decided `mastered` — the app's own marking, or the model's line. */
  markedBy?: "app" | "model";
  why?: string;
  /**
   * True when a check-phase message was a genuine doubt, not an attempt at
   * the check question — e.g. "wait, why do we flip the sign here?". The
   * reply already answers it directly, so this must never be treated as a
   * wrong answer.
   */
  isDoubt?: boolean;
}

export function readTags(reply: string, phase?: LessonPhase): Verdict {
  const out: Verdict = { clean: reply };
  let m: RegExpExecArray | null;
  TAG_RE.lastIndex = 0;
  while ((m = TAG_RE.exec(reply)) !== null) {
    const key = m[1].toUpperCase();
    const value = m[2].trim().toLowerCase();
    if (key === "VERDICT") {
      if (/question|doubt|clarif/.test(value)) {
        out.isDoubt = true;
      } else {
        const negated = /\b(not|no|never)\b|n't/.test(value);
        const positive = /\b(master(?:ed)?|correct|right|yes|pass(?:ed)?)\b/.test(value);
        out.mastered = positive && !negated;
      }
      out.markedBy = "model";
    }
    if (key === "PLACEMENT") {
      out.placement = /strong/.test(value)
        ? "strong"
        : /develop|middl|partial/.test(value)
          ? "developing"
          : "beginner";
    }
    if (key === "GAPS") {
      out.gaps = value === "none" ? [] : value.split(/[,\s]+/).filter(Boolean);
    }
  }
  out.clean = stripScaffolding(reply.replace(TAG_RE, ""), {
    keepHint: phase === "check" || phase === "reteach",
  });
  return out;
}

/**
 * The verdict for a check turn, decided by the APP wherever it can be.
 *
 * The model's own @@VERDICT line is consulted only when the answer cannot be
 * marked mechanically. A local 3B never writes that line at all, and a lesson
 * whose progress depends on a line the model does not write is a lesson that
 * never progresses — the student answers correctly and stays on step one
 * forever. The correct answer is already in the concept graph, so the app marks
 * it: instantly, free, and identically on every model.
 */
// The model is asked to tag a genuine doubt with @@VERDICT: question instead
// of grading it, but a local 3B unreliably emits that line at all. When it
// doesn't, this catches the obvious question shapes mechanically so a
// clarifying question is never run through the grader and marked wrong.
const DOUBT_RE = /^(why|what|how|does|is)\b|\?\s*$/i;

export function resolveVerdict(
  concept: Concept | null,
  studentAnswer: string,
  fromModel: Verdict
): Verdict {
  // A doubt was never an attempt at the check answer, so there is nothing
  // here for the mechanical grader to mark — marking it would score a
  // clarifying question against the answer key it has nothing to do with.
  if (fromModel.isDoubt) return fromModel;
  // A nervous but real attempt ("is it -3?", "would the answer be 5?") still
  // matches DOUBT_RE's question shape, but it carries a value the grader can
  // actually check — only a message with no attempted value at all (no digit
  // to grade) is a pure doubt with nothing to mark.
  const hasAttemptedValue = /\d/.test(studentAnswer);
  if ((DOUBT_RE.test(studentAnswer.trim()) && !hasAttemptedValue) || /\bhint\b/i.test(studentAnswer)) {
    return { ...fromModel, isDoubt: true, mastered: undefined };
  }
  if (!concept?.check.q || !concept.check.answer) return fromModel;
  const { mark, why } = gradeAnswer(concept.check.q, concept.check.answer, studentAnswer);
  if (mark === "unsure") return fromModel;
  return { ...fromModel, mastered: mark === "correct", markedBy: "app", why };
}

/* ------------------------------------------------------------------ *
 * Prompts, one per phase
 * ------------------------------------------------------------------ */

function header(map: ConceptMap, memory: StudentMemory | null, profile: LearnerProfile): string {
  return [
    `You are Pinnacle, teaching ${memory?.name ?? "a student"} (Class ${map.classLevel}, CBSE) through the chapter "${map.chapterTitle}" (${map.subject}).`,
    `The big idea of this chapter: ${map.bigIdea}`,
    "",
    "You are a real teacher taking one student through one chapter, not a chatbot answering a query. That means: one idea at a time, check it landed, and never move on because you have run out of things to say.",
    "",
    describeLearner(profile),
  ].join("\n");
}

function groundedSource(chapterId: string, classLevel: ClassLevel): string {
  const g = groundingForChapter(chapterId, classLevel);
  return g
    ? `\n## THE REAL SOURCE — teach only from this\n<<<NCERT\n${g}\nNCERT>>>\nDo not substitute a different problem, exercise or number. If something is not in here, say so instead of inventing it.\n`
    : `\n## NO CURATED SOURCE FOR THIS TOPIC\nNothing was retrieved from the NCERT/board content store for this chapter. You are about to teach from your own general knowledge, unchecked against the syllabus text. If there is any real chance of being wrong — a formula, a definition, a numeric answer, an NCERT exercise or example number, a marking-scheme detail — say plainly that you are going from memory and not from the loaded chapter text, before you give it. Do not present an unsourced answer with the same confidence as a grounded one.\n`;
}

/**
 * persona.ts's boundary rules — never invent an NCERT exercise/formula, never
 * teach outside this student's own class syllabus — live in buildSystemPrompt's
 * "Boundaries" section, but every lesson phase below builds its system prompt
 * from scratch and never sees that function. Without this line repeated here,
 * the guardrail goes silent for the whole time a lesson is actually teaching.
 *
 * Every call site passes map.classLevel — the concept map's own class — so a
 * check against that same value is a tautology; it never catches a student who
 * reached an out-of-class chapter directly (a shared link, a stale bookmark
 * after a class change). This checks the map's class against the STUDENT's own
 * remembered class instead, the same mismatch persona.ts's classBoundary
 * guards against outside a lesson. Entrance tracks (jee/neet/cuet/sat) are
 * exempt, mirroring persona.ts's classBoundary: their syllabus spans Class 11
 * AND 12 together, so a Class 11 student on a Class 12 concept map is correct,
 * not a mismatch.
 */
function syllabusGuard(map: ConceptMap, memory: StudentMemory | null): string {
  const mismatch =
    memory && memory.mode === "board" && memory.classLevel !== map.classLevel
      ? ` This student is in Class ${memory.classLevel}, but this chapter is Class ${map.classLevel} CBSE syllabus — that is NOT their own class. Say so plainly, name the class it actually belongs to, and redirect instead of teaching it.`
      : "";
  return `- Never invent an NCERT exercise number, formula or marking scheme: if it was not given to you above, say plainly you don't have that exact one instead of making it up. Silently confirm this concept genuinely belongs to the Class ${map.classLevel} CBSE syllabus before teaching it; if it does not, say which class it actually belongs to and redirect instead of teaching it.${mismatch}`;
}

export interface TurnPlan {
  system: string;
  reminder: string;
  /** Sent as the user turn when the app is driving (not the student's words). */
  drive?: string;
  phase: LessonPhase;
  /** Appended by the APP after the model's reply — never model-generated. */
  appendAfter?: string;
  /**
   * A hard ceiling on the reply, enforced by the server rather than requested
   * in the prompt. "Under 120 words" is advice a 3B ignores; a token budget is
   * arithmetic it cannot argue with. Roughly 1.6 tokens per word, plus room for
   * a figure block.
   */
  maxTokens?: number;
}

/** The opening move: find out what they already know. */
function planPlacement(map: ConceptMap, memory: StudentMemory | null, profile: LearnerProfile): TurnPlan {
  const probes = map.prereqs.filter((p) => p.probe.q).slice(0, 3);
  const list = probes.length
    ? probes.map((p, i) => `${i + 1}. ${p.probe.q}`).join("\n")
    : `1. In one line, what do you already know about ${map.chapterTitle}?`;
  const last = probes.length + 1;

  return {
    phase: "placement",
    system: [
      FORMAT_CONTRACT,
      "",
      header(map, memory, profile),
      "",
      "## THIS REPLY ONLY: find out what they already know. Teach nothing.",
      "Before a good teacher explains anything, they find out where the student actually is. That is this reply, and only this reply.",
      "",
      "Produce EXACTLY this, in this order:",
      `1. One warm sentence: you will take ${map.chapterTitle} from the beginning, together.`,
      `2. One sentence naming what this chapter is really about, in plain words.`,
      `3. One line saying you need to check ${probes.length ? "a couple of things from earlier classes" : "where they are"} first, because this chapter is built on them.`,
      "4. Then these questions, numbered, copied EXACTLY as written, one per line, nothing added to them:",
      list,
      `${last}. And in one line: how much of ${map.chapterTitle} have you done before? "Nothing at all" is a perfectly good answer.`,
      "",
      "HARD RULES for this reply:",
      "- Do NOT teach, define, explain or give examples. Not one.",
      "- Do NOT answer your own questions.",
      "- Do NOT list what the chapter will cover.",
      "- No figure in this reply.",
      "- Under 120 words in total.",
      "- End after the last question. Nothing follows it.",
      syllabusGuard(map, memory),
    ].join("\n"),
    reminder: [
      "Remember: this reply asks the questions and stops. No teaching, no definitions, no examples, no answering your own questions. Under 120 words.",
      FORMAT_REMINDER,
    ].join("\n\n"),
    maxTokens: 300,
  };
}

/** Mark the placement answers, then the app draws the map. */
function planGrade(
  map: ConceptMap,
  memory: StudentMemory | null,
  profile: LearnerProfile,
  state: LessonState
): TurnPlan {
  const probes = map.prereqs.filter((p) => p.probe.q).slice(0, 3);
  const key = probes
    .map((p, i) => `Q${i + 1} (id ${p.id}) — "${p.probe.q}" — correct answer: ${p.probe.answer}`)
    .join("\n");

  return {
    phase: "grade",
    system: [
      FORMAT_CONTRACT,
      "",
      header(map, memory, profile),
      "",
      "## THIS REPLY ONLY: mark their placement answers. Still teach nothing.",
      "Here is the answer key for what you just asked:",
      key || "(no fixed key — judge their self-assessment fairly)",
      "",
      "Produce EXACTLY this:",
      "1. One short line per question: right / nearly / not yet — and where they missed it, the correct answer in one clause. Kind, specific, never sarcastic. A student who got it wrong should feel found, not caught.",
      "2. ONE line saying where you will start because of what they showed, naming the gap if there is one.",
      "",
      "HARD RULES:",
      "- Do NOT start teaching the first concept. The next message does that.",
      "- Do NOT list the chapter contents — the app draws the route map itself, right under your reply.",
      "- Under 130 words.",
      "",
      syllabusGuard(map, memory),
      "",
      "Then, as the very last lines, output these two control lines exactly (the student never sees them):",
      "@@PLACEMENT: beginner|developing|strong",
      `@@GAPS: comma-separated ids of the prerequisites they missed (from: ${probes.map((p) => p.id).join(", ") || "none"}), or the word none`,
    ].join("\n"),
    reminder: [
      "Mark the answers, say where you'll start, stop. No teaching yet. Finish with the two @@ control lines.",
      FORMAT_REMINDER,
    ].join("\n\n"),
    maxTokens: 340,
    appendAfter: buildRoadmapMessage(map, state),
  };
}

/** The route map, drawn by the app so it is always true. */
export function buildRoadmapMessage(map: ConceptMap, state: LessonState): string {
  const lines: string[] = [];
  lines.push("");
  lines.push(`**Here is the whole route for ${map.chapterTitle} — where it comes from, the steps we'll take, and where it takes you.**`);
  lines.push("");
  lines.push(roadmapDiagram(map, masteredIds(state), map.concepts[state.index]?.id));
  lines.push("");
  if (map.prereqs.length) {
    lines.push("**What this chapter stands on**");
    for (const p of map.prereqs) {
      lines.push(`- **${p.from}** — ${p.title}. ${p.why}`);
    }
    lines.push("");
  }
  if (map.leadsTo.length) {
    lines.push("**Why it matters later**");
    for (const l of map.leadsTo.slice(0, 3)) {
      lines.push(`- **${l.where} · ${l.title}** — ${l.why}`);
    }
    lines.push("");
  }
  lines.push(`We'll go one step at a time. ${map.concepts.length} steps in total, and I'll check each one with you before we move.`);
  return lines.join("\n");
}

/** Teach exactly one concept. */
function planTeach(
  map: ConceptMap,
  memory: StudentMemory | null,
  profile: LearnerProfile,
  state: LessonState,
  concept: Concept
): TurnPlan {
  const n = state.index + 1;
  const total = map.concepts.length;
  const gapNote = state.gaps.length
    ? `They were shaky on: ${state.gaps
        .map((g) => map.prereqs.find((p) => p.id === g)?.title)
        .filter(Boolean)
        .join(", ")}. Repair that in one line as it comes up, without making a lesson of it.`
    : "";

  const needs = (concept.needs ?? [])
    .map((id) => map.prereqs.find((p) => p.id === id))
    .filter(Boolean)
    .map((p) => `${p!.from} — ${p!.title}`);

  return {
    phase: "teach",
    system: [
      FORMAT_CONTRACT,
      "",
      header(map, memory, profile),
      groundedSource(map.chapterId, map.classLevel),
      `## THIS REPLY ONLY: teach step ${n} of ${total}. Nothing else in the chapter exists right now.`,
      "",
      "Everything below describes what to SAY. None of it is a template. Never print these descriptions, never print a heading like \"The one idea\" or \"Worked example\", and never print the word \"Answer\" followed by the solution. You are talking to a student, so write what a teacher would actually say out loud.",
      "",
      `The idea you are teaching is ${concept.title}, which in one sentence is: ${concept.oneLine}`,
      `What has to land: ${concept.brief}`,
      concept.example ? `Teach it through this exact worked example, not one of your own: ${concept.example}` : "",
      needs.length ? `It rests on ${needs.join("; ")} — remind them in one clause, no more.` : "",
      concept.mistakes?.length ? `Warn them, in one line, about this: ${concept.mistakes.join(" ")}` : "",
      concept.figure
        ? `**Draw this figure, exactly as given, in its own block:**\n${concept.figure}`
        : "If a figure genuinely helps this idea, draw one with the plot/mermaid rules above. If it does not, skip it.",
      gapNote,
      "",
      "Shape of this reply, in this order:",
      "1. The worked example, every step shown, no step skipped.",
      "2. The idea in plain words, drawn out of that example. Two sentences at most.",
      "3. One line on the mistake to avoid.",
      concept.check.q
        ? `4. Then this check question, copied EXACTLY, on its own line, as the last thing in the reply:\n"${concept.check.q}"`
        : "4. Then ONE short check question that this student can answer in a line, testing exactly this idea and nothing else.",
      "",
      "HARD RULES:",
      `- Teach ONLY "${concept.title}". The other ${total - 1} steps come later, and mentioning them now is the failure mode we are fixing.`,
      "- Under 170 words of prose (the figure and the maths do not count).",
      "- Do NOT answer your own check question.",
      "- Do NOT summarise the chapter, and do not preview what is next.",
      "- No 'in conclusion', no motivational sign-off. End on the question.",
      syllabusGuard(map, memory),
    ]
      .filter(Boolean)
      .join("\n"),
    reminder: [
      `You are teaching ONE step: "${concept.title}". Not the chapter. Under 170 words.`,
      concept.check.q ? `End with exactly this question and nothing after it: "${concept.check.q}"` : "End with one short check question and nothing after it.",
      FORMAT_REMINDER,
    ].join("\n\n"),
    // 170 words of prose plus room for a worked example and a figure block.
    maxTokens: 340,
  };
}

/** Mark the check answer and name the cause of any error. */
function planCheck(
  map: ConceptMap,
  memory: StudentMemory | null,
  profile: LearnerProfile,
  state: LessonState,
  concept: Concept
): TurnPlan {
  const known = concept.check.q && concept.check.answer;
  return {
    phase: "check",
    system: [
      FORMAT_CONTRACT,
      "",
      header(map, memory, profile),
      groundedSource(map.chapterId, map.classLevel),
      `## THIS REPLY ONLY: mark the answer they just gave on "${concept.title}".`,
      "",
      "What follows is private. It is the marking key, not a template. NEVER print the correct answer as an \"Answer:\" line, never print these headings, and never re-state the instructions — the student sees only your reply to them.",
      "",
      "FIRST, decide what their message actually is. Most of the time it is an attempt at the check question — mark it as below. But sometimes it is a genuine doubt instead, e.g. \"wait, why do we flip the sign here?\" or \"what does that symbol mean?\" — a question ABOUT the idea, not a go at answering it. A doubt is not a wrong answer, so never grade one as one.",
      "If it is a doubt: answer it directly and simply, tied to this concept, in a couple of sentences. Do not say 'not yet' or hint that they got something wrong — they have not attempted anything yet. End by putting the exact same check question back to them so they can still have a go. Finish with @@VERDICT: question instead of the line below.",
      "If it is an attempt at the check question, mark it as below.",
      "",
      known
        ? `The question you asked was: ${concept.check.q}\nIt is correct if it comes to: ${concept.check.answer}\nIf they are stuck, steer them with this idea in your own words: ${concept.check.hint}`
        : `You asked them a check question on "${concept.title}". Mark it against the chapter's own content: ${concept.brief}`,
      concept.mistakes?.length ? `Typical wrong answers here and what they mean: ${concept.mistakes.join(" ")}` : "",
      "",
      "If they are RIGHT:",
      "- Say so in one line, and name the principle they just used correctly, so the win is attached to something.",
      "- Do NOT re-teach it. Do NOT add extra facts. Stop there.",
      "- Under 60 words.",
      "",
      "If they are WRONG or half right:",
      "- Do NOT hand over the full solution.",
      "- Name the REAL cause in one line: a gap in the idea, the wrong formula, a sign slip, an arithmetic slip, or a misread question. Naming the cause is the entire job — 'that's incorrect' teaches nothing.",
      known
        ? "- Give the hint above, in your own warmer words."
        : "- Give a hint drawn only from the chapter brief and the typical wrong answers above, in your own warmer words. Never invent a hint from outside them.",
      "- Re-ask a SMALLER version of the same question that isolates exactly the bit they got wrong.",
      "- Under 110 words. No lecture.",
      "",
      "Either way, never say 'good question' or 'great job' unless they earned it.",
      "",
      syllabusGuard(map, memory),
      "",
      "Last line of your reply, exactly, and never anything after it:",
      "@@VERDICT: mastered|not-yet|question",
    ]
      .filter(Boolean)
      .join("\n"),
    reminder: [
      "First check: is this an attempt at the answer, or a genuine doubt? A doubt gets answered directly, not graded — end that reply with @@VERDICT: question and put the check question back to them. Otherwise mark it: if wrong, name the cause, hint, re-ask smaller — do not give the answer away. Finish with the @@VERDICT line.",
      FORMAT_REMINDER,
    ].join("\n\n"),
    maxTokens: 260,
  };
}

/** Say it again, differently. This is where the tutor earns its name. */
function planReteach(
  map: ConceptMap,
  memory: StudentMemory | null,
  profile: LearnerProfile,
  state: LessonState,
  concept: Concept
): TurnPlan {
  // Counted in re-explanations, not in wrong answers: a student can miss the
  // same check twice for reasons that have nothing to do with the explanation,
  // and jumping straight to the simplest possible version would be patronising.
  const attempt = state.reteaches + 1;
  const interests = profile.interests.length ? profile.interests.join(", ") : "everyday things like money, food, cricket or a phone";

  const ladder =
    attempt <= 1
      ? [
          "ATTEMPT 2 — same idea, different angle:",
          "- Drop every technical word you used last time. If you must use one, put the plain meaning right beside it.",
          `- Open with a concrete comparison to something they know (${interests}), then walk from that comparison into the maths in two steps.`,
          "- Use one small worked example with numbers under 20.",
          "- Under 130 words.",
        ]
      : [
          "ATTEMPT 3 — smallest possible steps:",
          "- One short sentence per line. Nothing longer than about twelve words.",
          "- Number the steps 1, 2, 3. Each step does exactly one thing.",
          "- Numbers small enough to do in the head. No algebra where a number will do.",
          "- Show the FIRST step worked out completely, then ask them to do only the second.",
          "- Under 100 words.",
          "- If a picture would settle it, draw one.",
        ];

  return {
    phase: "reteach",
    system: [
      FORMAT_CONTRACT,
      "",
      header(map, memory, profile),
      groundedSource(map.chapterId, map.classLevel),
      `## THIS REPLY ONLY: they did not understand "${concept.title}". Explain it again, DIFFERENTLY.`,
      "",
      "These are instructions, not a form to fill in. Do not print any heading from them, do not print an \"Answer:\" line, and do not repeat the instructions back. Write only what you would say aloud to the student.",
      "",
      `The idea, unchanged: ${concept.oneLine}`,
      `What still has to land: ${concept.brief}`,
      "",
      "The rule that matters most here: repeating yourself in the same words, more slowly, is not teaching. If an explanation did not work, the explanation was wrong for this student — change the ANGLE, not the volume. New words, new example, new way in.",
      "",
      ...ladder,
      "",
      "FORBIDDEN in this reply:",
      "- Re-using the sentences, the example or the framing you used last time.",
      "- 'As I said', 'like I explained', 'simply put', 'basically' — all of them mean you are about to repeat yourself.",
      "- Any hint that they are slow for not getting it.",
      syllabusGuard(map, memory),
      "",
      "End with ONE very small question — smaller than the last one — that they can almost certainly get right. Confidence first, difficulty after.",
    ].join("\n"),
    reminder: [
      "Different words, different example, different angle from your last explanation. Simpler and shorter. End on one very easy question.",
      FORMAT_REMINDER,
    ].join("\n\n"),
    // Deliberately tighter than the teach budget: a re-explanation that runs
    // longer than the explanation that already failed is not a simplification.
    maxTokens: attempt <= 1 ? 320 : 240,
  };
}

/** Close the chapter. */
function planRecap(
  map: ConceptMap,
  memory: StudentMemory | null,
  profile: LearnerProfile,
  state: LessonState
): TurnPlan {
  const done = map.concepts.map((c, i) => `${i + 1}. ${c.title}`).join("\n");
  return {
    phase: "recap",
    system: [
      FORMAT_CONTRACT,
      "",
      header(map, memory, profile),
      groundedSource(map.chapterId, map.classLevel),
      `## THIS REPLY ONLY: close out ${map.chapterTitle}.`,
      `They have worked through every step:\n${done}`,
      "",
      "Produce EXACTLY this:",
      "1. One line of genuine, specific praise — name what they actually did, not 'well done'.",
      "2. The chapter in five lines: one line per step, the idea only, as a revision card they can re-read in a minute.",
      "3. The one mistake most likely to cost them marks in the board exam on this chapter.",
      "4. Two board-style questions to try now, with marks shown. Take them from THE REAL SOURCE above — reuse or lightly adapt its exercises and examples, never a question you recall from elsewhere. If the source above does not give you enough to build two, say plainly you're short one instead of inventing it. Questions only — no answers.",
      "",
      syllabusGuard(map, memory),
      "",
      "Under 220 words.",
    ].join("\n"),
    reminder: [
      "Revision card, the trap, two questions with no answers. Under 220 words.",
      FORMAT_REMINDER,
    ].join("\n\n"),
    maxTokens: 520,
  };
}

/* ------------------------------------------------------------------ *
 * The public step function
 * ------------------------------------------------------------------ */

/** What the tutor should send next, given where the lesson is. */
export function planTurn(
  state: LessonState,
  profile: LearnerProfile,
  memory: StudentMemory | null
): TurnPlan | null {
  const map = conceptMapFor(state.chapterId);
  if (!map) return null;
  const concept = map.concepts[state.index];

  switch (state.phase) {
    case "placement":
      return planPlacement(map, memory, profile);
    case "grade":
      return planGrade(map, memory, profile, state);
    case "teach":
      return concept ? planTeach(map, memory, profile, state, concept) : planRecap(map, memory, profile, state);
    case "check":
      return concept ? planCheck(map, memory, profile, state, concept) : planRecap(map, memory, profile, state);
    case "reteach":
      return concept ? planReteach(map, memory, profile, state, concept) : planRecap(map, memory, profile, state);
    case "recap":
      return planRecap(map, memory, profile, state);
    default:
      return null;
  }
}

/**
 * Advance the lesson using the student's message and the tutor's verdict.
 *
 * The engine, not the model, decides what happens next — which is why a student
 * who keeps missing the check keeps getting the same concept, and a student who
 * gets it moves on immediately.
 */
export function advance(
  state: LessonState,
  verdict: Verdict,
  signals: { lost: boolean; wantsSlower: boolean }
): LessonState {
  const map = conceptMapFor(state.chapterId);
  if (!map) return state;
  const next: LessonState = {
    ...state,
    progress: { ...state.progress },
    updatedAt: Date.now(),
  };
  const concept = map.concepts[state.index];

  switch (state.phase) {
    case "placement":
      next.phase = "grade";
      break;

    case "grade": {
      if (verdict.placement) next.placement = verdict.placement;
      if (verdict.gaps) next.gaps = verdict.gaps;
      next.phase = "teach";
      break;
    }

    case "teach": {
      if (concept) {
        next.progress[concept.id] = {
          ...next.progress[concept.id],
          status: "teaching",
          attempts: (next.progress[concept.id]?.attempts ?? 0) + 1,
        };
      }
      // After teaching, the student's next message is an attempt at the check —
      // unless they said outright that they are lost, in which case there is no
      // point marking an answer they never gave.
      next.phase = signals.lost || signals.wantsSlower ? "reteach" : "check";
      break;
    }

    case "check": {
      // A doubt asked mid-check was never an attempt at the question, so it
      // is not a wrong answer either — the reply already answered it
      // directly. Stay on the check, untouched, for their real attempt.
      if (verdict.isDoubt) break;
      if (verdict.mastered) {
        if (concept) {
          next.progress[concept.id] = {
            ...next.progress[concept.id],
            status: "mastered",
            levelUsed: state.reteaches + 1,
          };
        }
        next.retries = 0;
        next.reteaches = 0;
        next.index = state.index + 1;
        next.phase = next.index >= map.concepts.length ? "recap" : "teach";
      } else {
        if (concept) {
          next.progress[concept.id] = { ...next.progress[concept.id], status: "shaky" };
        }
        next.retries = state.retries + 1;
        // Two failed checks means the explanation is the problem, not the
        // student. Stop re-asking and re-explain from a different angle.
        //
        // Once we have already re-explained this idea, one wrong answer is
        // enough: asking the same student the same thing a third time, after an
        // explanation that visibly did not land, is where a real lesson goes
        // sour. Saying outright that they are lost short-circuits it too.
        const explainAgain = state.reteaches > 0 || signals.lost || signals.wantsSlower;
        next.phase = explainAgain || next.retries >= 2 ? "reteach" : "check";
      }
      break;
    }

    case "reteach": {
      next.reteaches = state.reteaches + 1;
      // A third re-explanation of the same thing is a wall. Mark it shaky,
      // move on, and let the recap bring it back rather than grinding here.
      if (next.reteaches >= 3) {
        if (concept) {
          next.progress[concept.id] = { ...next.progress[concept.id], status: "shaky" };
        }
        next.retries = 0;
        next.reteaches = 0;
        next.index = state.index + 1;
        next.phase = next.index >= map.concepts.length ? "recap" : "teach";
      } else {
        // Back to the check, but the counter is reset: the last explanation is
        // gone, so the student starts this idea with a clean slate.
        next.retries = 0;
        next.phase = "check";
      }
      break;
    }

    case "recap":
      next.phase = "done";
      break;
  }

  return next;
}

/** Progress as a fraction, for the UI rail. */
export function lessonProgress(state: LessonState): { done: number; total: number } {
  const map = conceptMapFor(state.chapterId);
  const total = map?.concepts.length ?? 0;
  const done = masteredIds(state).length;
  return { done, total };
}
