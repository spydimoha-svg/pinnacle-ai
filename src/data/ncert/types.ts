// Real, verbatim NCERT content — the ground truth the tutor reads from.
//
// This is the fix for the tutor "going off": instead of answering an exercise
// from the model's fuzzy memory (and inventing a random problem), the app keeps
// the ACTUAL exercise text here, retrieves the exact one the student asked for,
// and hands it to the model with a hard instruction to solve only that.
//
// Keyed to the same chapterId as the curriculum (e.g. "c10-maths-02"), so a
// grounded chapter lines up 1:1 with the chapter cards elsewhere in the app.
import type { ClassLevel } from "../../lib/types";

/** One problem inside an NCERT exercise, verbatim. */
export interface NcertProblem {
  /** Problem label as printed, e.g. "1", "1(iii)", "2". */
  no: string;
  /** The exact problem statement as printed in the book. */
  statement: string;
  /** Final answer(s), kept so the tutor's result is guaranteed correct. */
  answer?: string;
  /** Optional worked NCERT-method solution, when we want a locked reference. */
  solution?: string;
  /**
   * Page in the chapter PDF where this problem is printed, 1-based.
   *
   * Optional: an unknown page is left unset rather than guessed, because a
   * link that opens the wrong page is worse than one that opens the chapter.
   */
  page?: number;
}

/** One numbered exercise, e.g. "Exercise 2.2". */
export interface NcertExercise {
  /** Exercise number as printed, e.g. "2.2". */
  exercise: string;
  /** Optional shared instruction line printed above the problems. */
  instruction?: string;
  /** Page the exercise begins on, used when a problem has no page of its own. */
  page?: number;
  problems: NcertProblem[];
}

/** A full grounded chapter: concept notes + every exercise. */
export interface NcertChapter {
  /** Matches the curriculum chapterId, e.g. "c10-maths-02". */
  id: string;
  classLevel: ClassLevel;
  /** Matches the curriculum subjectId, e.g. "c10-maths". */
  subjectId: string;
  chapterNumber: number;
  title: string;
  /** Source book, e.g. "NCERT Class 10 Mathematics (rationalised)". */
  book: string;
  /** Plain-language concept notes the tutor teaches FROM (the real chapter, digested). */
  concepts: string;
  /** The formulae/results the chapter establishes, for quick reference. */
  keyFormulae?: string[];
  /** Subtopics — used to generate one question per topic on a worksheet. */
  topics: string[];
  exercises: NcertExercise[];
}
