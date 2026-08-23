// The Director.
//
// This is the engine behind a cinematic journey: it decides what happens next,
// beat by beat, and it is ORDINARY CODE. That is a deliberate architectural
// choice, not a shortcut.
//
// The obvious reading of "the AI is the director" is to ask a model, before
// every beat, what the scene should be, how fast to reveal it, how hard the
// next question should be and which branch to take. That costs roughly nine
// extra calls per scene against a per-minute free-tier token budget, and — far
// worse — it is unreliable: a small model asked to choose a branch will happily
// declare a struggling student ready to move on. lesson.ts already learnt this
// lesson and says so in its own header. The pacing belongs to the student's
// answers, not to the model's mood.
//
// So the model, when it is reachable at all, only ever writes PROSE. Every
// decision below — which beat, which branch, when to flash back, when a concept
// is mastered — is made here, from the concept graph and the student's actual
// answers. A journey therefore plays identically offline, on a 3B local model,
// and on a frontier one. Only the wording changes.
import type { Concept, ConceptMap, Prereq } from "../data/concepts";
import { gradeAnswer, type Mark } from "./grade";
import type { LearnerProfile } from "./learner";

/* ------------------------------------------------------------------ *
 * Beats
 * ------------------------------------------------------------------ */

/**
 * The atomic unit of a scene.
 *
 * `predict` is the one that matters most. The spec's demand that the student
 * be the protagonist is not a matter of tone — it is structural, and this is
 * where it lives: a prediction beat runs BEFORE the reveal, so the student
 * commits to an answer before being told one. Everything else is presentation.
 */
export type BeatKind =
  | "setup"
  | "predict"
  | "reveal"
  | "formalise"
  | "check"
  | "diagnose"
  | "flashback"
  | "mastery";

export interface Beat {
  kind: BeatKind;
  /** What the student reads. Markdown; may carry a ```plot fence. */
  body: string;
  /** Present on predict/check/flashback beats — the thing being asked. */
  question?: string;
  /** Stored answer. Never shown before the student commits. */
  answer?: string;
  hint?: string;
  /** Free-text label for the scene rail. */
  caption?: string;
}

export interface Scene {
  id: string;
  conceptId: string;
  /** 1-based, as printed on the rail. */
  number: number;
  /** The narrative title — "The Equation That Hides", not "Concept 3". */
  title: string;
  /** Marks this idea typically carries, when the map knows. */
  marks?: string;
  beats: Beat[];
}

/* ------------------------------------------------------------------ *
 * Narrative framing
 * ------------------------------------------------------------------ */

/**
 * The authored film-grammar for one chapter: what each concept's scene is
 * called, how it opens, and what the student is asked to predict before
 * anything is revealed.
 *
 * Kept as DATA next to the concept graph rather than generated, because a
 * generated opening line is exactly the kind of thing that reads as filler,
 * and the whole point of the framing is that it does not.
 */
export interface SceneFraming {
  conceptId: string;
  title: string;
  /** The narrative setup — one or two sentences, in the second person. */
  setup: string;
  /** What the student commits to before the reveal. */
  predict?: { question: string; answer: string; hint?: string };
  /** A figure for the reveal, as a ```plot fence body (without the fence). */
  plot?: string;
}

export interface JourneyFraming {
  chapterId: string;
  /** The chapter's narrative title — the thing on the poster. */
  title: string;
  /** The opening line of the whole journey. */
  opening: string;
  /** The closing line, shown at mastery. */
  closing: string;
  scenes: SceneFraming[];
}

/* ------------------------------------------------------------------ *
 * Building the scenes
 * ------------------------------------------------------------------ */

const fence = (body: string) => "\n\n```plot\n" + body.trim() + "\n```\n";

/**
 * Turn a concept map plus its framing into playable scenes.
 *
 * Every line of teaching comes from the map — `oneLine`, `brief`, `example`,
 * and the stored `check` — so a scene can never teach something the graph does
 * not actually contain. The framing supplies only the storytelling around it.
 */
export function buildScenes(
  map: ConceptMap,
  framing: JourneyFraming | null
): Scene[] {
  return map.concepts.map((concept, i) => {
    const f = framing?.scenes.find((s) => s.conceptId === concept.id);
    const beats: Beat[] = [];

    beats.push({
      kind: "setup",
      caption: "The setup",
      body: f?.setup ?? concept.oneLine,
    });

    // Predict BEFORE reveal, always, when the framing gives us something to
    // ask. A scene with no prediction is a scene the student watches.
    if (f?.predict) {
      beats.push({
        kind: "predict",
        caption: "Your call",
        body: "Commit to an answer before you read on. Being wrong here costs nothing — it is how the next part lands.",
        question: f.predict.question,
        answer: f.predict.answer,
        hint: f.predict.hint,
      });
    }

    beats.push({
      kind: "reveal",
      caption: "The idea",
      body: concept.oneLine + (f?.plot ? fence(f.plot) : ""),
    });

    beats.push({
      kind: "formalise",
      caption: "In full",
      body: concept.example
        ? `${concept.brief}\n\n**Worked example.** ${concept.example}`
        : concept.brief,
    });

    beats.push({
      kind: "check",
      caption: "Prove it",
      body: "One question. Answer it in your own words — spelling and working do not matter, the idea does.",
      question: concept.check.q,
      answer: concept.check.answer,
      hint: concept.check.hint,
    });

    return {
      id: `sc-${concept.id}`,
      conceptId: concept.id,
      number: i + 1,
      title: f?.title ?? concept.title,
      marks: concept.marks,
      beats,
    };
  });
}

/* ------------------------------------------------------------------ *
 * Diagnosis
 * ------------------------------------------------------------------ */

export type Cause =
  | "blank"
  | "prerequisite"
  | "known-mistake"
  | "sign-slip"
  | "partial"
  | "wrong-idea";

export interface Diagnosis {
  mark: Mark;
  cause: Cause;
  /** One line naming what actually went wrong, in the student's terms. */
  headline: string;
  /** The detail, drawn from the concept's own list of known mistakes. */
  detail?: string;
}

/**
 * Why was this answer wrong?
 *
 * §17 of the specification asks for a named cause rather than a red cross, and
 * this is where that promise is either kept or broken. It is kept by refusing
 * to guess: the mark comes from grade.ts, which compares values mechanically,
 * and the explanation comes from the concept's own authored `mistakes` list.
 * Nothing here invents a diagnosis it cannot support.
 */
export function diagnose(concept: Concept, student: string): Diagnosis {
  const trimmed = student.trim();
  if (!trimmed) {
    return {
      mark: "wrong",
      cause: "blank",
      headline: "Nothing written yet.",
      detail: "Even a guess is worth more than a blank — it tells me where you are.",
    };
  }

  const { mark, why } = gradeAnswer(concept.check.q, concept.check.answer, trimmed);

  if (mark === "correct") {
    return { mark, cause: "partial", headline: "That's it.", detail: why };
  }

  // A sign slip is a specific, nameable error and grade.ts already detects it.
  // Naming it precisely is the difference between "wrong" and "I know exactly
  // what you did".
  if (/sign error/i.test(why)) {
    return {
      mark,
      cause: "sign-slip",
      headline: "Your method is right — a sign flipped.",
      detail: why,
    };
  }

  // Does the answer match a mistake this concept is KNOWN to produce? That is
  // a far more useful thing to say than "incorrect".
  const hit = concept.mistakes?.find((m) => sharesLanguage(m, trimmed));
  if (hit) {
    return {
      mark,
      cause: "known-mistake",
      headline: "This is the classic trap in this idea.",
      detail: hit,
    };
  }

  if (/only \d+ of \d+|partial/i.test(why)) {
    return {
      mark,
      cause: "partial",
      headline: "Part of this is right.",
      detail: why,
    };
  }

  return {
    mark,
    cause: mark === "unsure" ? "partial" : "wrong-idea",
    headline:
      mark === "unsure"
        ? "I can't tell from this — say a bit more."
        : "The calculation isn't the problem. The model behind it is.",
    detail: why,
  };
}

/** Loose overlap test: does the student's answer echo this known mistake? */
function sharesLanguage(mistake: string, student: string): boolean {
  const words = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .replace(/\$[^$]*\$/g, " ")
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length > 4)
    );
  const m = words(mistake);
  const s = words(student);
  if (m.size === 0) return false;
  let hit = 0;
  for (const w of m) if (s.has(w)) hit++;
  return hit >= 2 && hit / m.size >= 0.2;
}

/* ------------------------------------------------------------------ *
 * Journey state
 * ------------------------------------------------------------------ */

export type SceneOutcome = "pending" | "mastered" | "shaky";

export interface StoryEvent {
  at: number;
  kind: "prediction" | "discovery" | "misconception" | "flashback" | "mastery";
  conceptId: string;
  detail: string;
}

export interface JourneyState {
  chapterId: string;
  sceneIndex: number;
  beatIndex: number;
  outcomes: Record<string, SceneOutcome>;
  /** Wrong answers on the CURRENT scene's check. */
  retries: number;
  /** Whether a flashback has already been spent on this scene. */
  flashedBack: boolean;
  story: StoryEvent[];
  startedAt: number;
}

export function startJourney(chapterId: string): JourneyState {
  return {
    chapterId,
    sceneIndex: 0,
    beatIndex: 0,
    outcomes: {},
    retries: 0,
    flashedBack: false,
    story: [],
    startedAt: Date.now(),
  };
}

/**
 * The prerequisite to fall back to when a scene will not land.
 *
 * §11's flashback is not a second explanation — it is a return to the thing
 * the current idea STANDS ON. The concept graph already records that in
 * `concept.needs`, and each prereq carries a probe question with a stored
 * answer, so the flashback can actually check the foundation rather than just
 * assert it.
 */
export function flashbackFor(
  map: ConceptMap,
  concept: Concept
): Prereq | null {
  const id = concept.needs?.[0];
  if (!id) return null;
  return map.prereqs.find((p) => p.id === id) ?? null;
}

/**
 * Should this scene be re-pitched, flashed back, or let go?
 *
 * Two wrong answers is the point at which repeating yourself stops working and
 * something structural is missing — so the second failure spends the flashback
 * rather than a third rewording. After that the scene is marked shaky and the
 * journey moves on: holding a student on one idea until they crack is how
 * people quit.
 */
export type Branch = "advance" | "reteach" | "flashback" | "concede";

export function branchAfterCheck(
  state: JourneyState,
  mark: Mark,
  hasFlashback: boolean
): Branch {
  if (mark === "correct") return "advance";
  const retries = state.retries + 1;
  if (retries === 1) return "reteach";
  if (retries === 2 && hasFlashback && !state.flashedBack) return "flashback";
  return retries >= 3 ? "concede" : "reteach";
}

/**
 * How simply the next explanation should be pitched.
 *
 * Reads the learner's own profile rather than a global setting, so a student
 * who has needed things broken down before starts lower here too.
 */
export function pitchFor(profile: LearnerProfile, retries: number): 1 | 2 | 3 {
  const base = profile.level;
  const raised = Math.min(3, base + retries);
  return raised as 1 | 2 | 3;
}

/* ------------------------------------------------------------------ *
 * Progress
 * ------------------------------------------------------------------ */

export function journeyProgress(scenes: Scene[], state: JourneyState) {
  const total = scenes.length;
  const mastered = scenes.filter(
    (s) => state.outcomes[s.conceptId] === "mastered"
  ).length;
  const shaky = scenes.filter(
    (s) => state.outcomes[s.conceptId] === "shaky"
  ).length;
  return {
    total,
    mastered,
    shaky,
    settled: mastered + shaky,
    percent: total ? Math.round((mastered / total) * 100) : 0,
    complete: total > 0 && mastered + shaky === total,
  };
}

/**
 * The Director's Cut: what the student predicted, what happened, and where
 * their reasoning actually turned. Built entirely from the story log, so it
 * costs nothing and can never contradict what really occurred.
 */
export function directorsCut(state: JourneyState): StoryEvent[] {
  return state.story.filter(
    (e) => e.kind === "misconception" || e.kind === "prediction"
  );
}
