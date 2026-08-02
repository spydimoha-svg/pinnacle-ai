// NCERT grounding corpus + retrieval.
//
// findNcertForQuery() reads what the student typed ("teach me polynomials",
// "solve exercise 2.2") and returns the exact chapter (and exercise, if named).
// buildGroundingContent() formats the matched real text for injection into the
// tutor's system prompt. This is what stops the tutor inventing a random
// exercise: it can only work from the verbatim text we hand it.
import type { ClassLevel } from "../../lib/types";
import type { NcertChapter, NcertExercise } from "./types";
import { C9_MATHS_NUMBER_SYSTEMS } from "./c9-maths-01-number-systems";
import { C10_MATHS_REAL_NUMBERS } from "./c10-maths-01-real-numbers";
import { C10_MATHS_POLYNOMIALS } from "./c10-maths-polynomials";
import { C10_MATHS_QUADRATIC_EQUATIONS } from "./c10-maths-04-quadratic-equations";
import { C10_MATHS_TRIGONOMETRY } from "./c10-maths-trigonometry";
import { C10_SCIENCE_CHEMICAL_REACTIONS } from "./c10-science-01-chemical-reactions";
import { C10_SCIENCE_ACIDS_BASES_SALTS } from "./c10-science-02-acids-bases-salts";
import { C10_SCIENCE_METALS_NONMETALS } from "./c10-science-03-metals-nonmetals";

/** Every grounded chapter. Grows as the library is seeded. */
export const NCERT: NcertChapter[] = [
  C9_MATHS_NUMBER_SYSTEMS,
  C10_MATHS_REAL_NUMBERS,
  C10_MATHS_POLYNOMIALS,
  C10_MATHS_QUADRATIC_EQUATIONS,
  C10_MATHS_TRIGONOMETRY,
  C10_SCIENCE_CHEMICAL_REACTIONS,
  C10_SCIENCE_ACIDS_BASES_SALTS,
  C10_SCIENCE_METALS_NONMETALS,
];

export interface NcertMatch {
  chapter: NcertChapter;
  /** Set when the student named a specific exercise, e.g. "2.2". */
  exercise?: NcertExercise;
  /**
   * Set when the student named an exercise this chapter does NOT have, e.g.
   * "Exercise 2.9". Without this the retrieval quietly handed over the whole
   * chapter and the model answered a DIFFERENT exercise under the number the
   * student asked for — worse than refusing, because it looks right.
   */
  missingExercise?: string;
}

export function ncertChapterById(chapterId: string): NcertChapter | undefined {
  return NCERT.find((c) => c.id === chapterId);
}

const STOP = new Set([
  "the", "a", "an", "of", "to", "me", "my", "is", "in", "on", "and", "for",
  "teach", "explain", "solve", "do", "help", "with", "please", "give", "show",
  "how", "what", "chapter", "exercise", "question", "ncert", "class", "from",
]);

/**
 * Pick the grounded chapter (and exercise) the student is asking about.
 * Matches an explicit exercise number first, then chapter title/topic keywords,
 * scoped to the student's class when we know it.
 */
export function findNcertForQuery(
  query: string,
  classLevel?: ClassLevel
): NcertMatch | null {
  const q = query.toLowerCase();
  const pool = classLevel
    ? NCERT.filter((c) => c.classLevel === classLevel)
    : NCERT;
  const scope = pool.length ? pool : NCERT;

  // 1) Explicit exercise / example number like "exercise 2.2", "ex 2.2", "2.2".
  const exMatch = q.match(/\b(?:exercise|example|ex\.?)\s*\.?\s*(\d+\.\d+)\b/) ||
    q.match(/\b(\d+\.\d+)\b/);
  if (exMatch) {
    const num = exMatch[1];
    const chapterNo = parseInt(num.split(".")[0], 10);
    for (const c of scope) {
      if (c.chapterNumber !== chapterNo) continue;
      const exercise = c.exercises.find((e) => e.exercise === num);
      if (exercise) return { chapter: c, exercise };
      // We hold this chapter verbatim and it has no such exercise, so the
      // number is wrong (or was removed by the rationalised syllabus). Say so
      // explicitly instead of falling through to "here is the whole chapter",
      // which is what let the tutor answer 2.2 when 2.9 was asked for.
      return { chapter: c, missingExercise: num };
    }
    // Numbered but we don't have that chapter loaded at all.
  }

  // 2) Keyword match against chapter title + topics.
  const words = q.split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w));
  let best: { chapter: NcertChapter; score: number } | null = null;
  for (const c of scope) {
    const hay = (c.title + " " + c.topics.join(" ")).toLowerCase();
    let score = 0;
    if (hay.includes(c.title.toLowerCase()) && q.includes(c.title.toLowerCase())) {
      score += 5; // full title hit, e.g. "polynomials"
    }
    for (const w of words) if (hay.includes(w)) score += 1;
    if (score > 0 && (!best || score > best.score)) best = { chapter: c, score };
  }
  if (best) return { chapter: best.chapter };

  // 3) Explicit "chapter N" with no keyword.
  const chNo = q.match(/\bchapter\s*(\d+)\b/);
  if (chNo) {
    const n = parseInt(chNo[1], 10);
    const c = scope.find((x) => x.chapterNumber === n);
    if (c) return { chapter: c };
  }

  return null;
}

/** Format the matched real NCERT text for injection into the system prompt. */
export function buildGroundingContent(match: NcertMatch): string {
  const { chapter, exercise, missingExercise } = match;
  const lines: string[] = [];
  lines.push(`Book: ${chapter.book}`);
  lines.push(`Chapter ${chapter.chapterNumber}: ${chapter.title}`);
  if (missingExercise) {
    lines.push("");
    lines.push(
      `!! THE STUDENT ASKED FOR EXERCISE ${missingExercise}, WHICH DOES NOT EXIST IN THIS CHAPTER. ` +
        `This chapter has exactly these exercises: ${chapter.exercises.map((e) => e.exercise).join(", ")}. ` +
        `You MUST tell the student plainly that there is no Exercise ${missingExercise} in ${chapter.title}, name the exercises that do exist, and ask which one they meant. ` +
        `Do NOT solve a different exercise and label it ${missingExercise}. Do NOT invent problems for it.`
    );
  }
  lines.push("");
  lines.push("CONCEPT NOTES (teach strictly from these):");
  lines.push(chapter.concepts);
  if (chapter.keyFormulae?.length) {
    lines.push("");
    lines.push("KEY RESULTS: " + chapter.keyFormulae.join("; "));
  }
  lines.push("");
  lines.push("TOPICS IN THIS CHAPTER: " + chapter.topics.join("; "));

  // When the named exercise does not exist, the problems are withheld: the
  // reply due here is "there is no 2.9, did you mean 2.2?", and a model holding
  // a list of solvable problems will solve them instead of asking.
  const exercisesToShow = missingExercise ? [] : exercise ? [exercise] : chapter.exercises;
  for (const ex of exercisesToShow) {
    lines.push("");
    lines.push(`EXERCISE ${ex.exercise} (verbatim NCERT):`);
    if (ex.instruction) lines.push(ex.instruction);
    for (const p of ex.problems) {
      lines.push(`Q${p.no}. ${p.statement}`);
      if (p.answer) lines.push(`   Correct answer(s): ${p.answer}`);
      if (p.solution) lines.push(`   Reference solution: ${p.solution}`);
    }
  }
  return lines.join("\n");
}

/**
 * One-call helper for the chat: returns the grounding text for a student
 * message, or null when nothing in the library matches.
 */
export function groundingForMessage(
  message: string,
  classLevel?: ClassLevel
): string | null {
  const match = findNcertForQuery(message, classLevel);
  return match ? buildGroundingContent(match) : null;
}
