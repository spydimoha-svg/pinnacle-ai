// The concept graph: a chapter broken into the small ideas it is actually made
// of, each with what it stands on and what it leads to.
//
// This is the data the lesson engine teaches from. Its job is to make "teach me
// polynomials from scratch" a sequence of checked steps instead of one essay,
// and to let the tutor say — truthfully, from data — "this bit rests on what
// you did in Class 9, let's check that first".
import type { ClassLevel } from "../../lib/types";

/** Something from an earlier class that this chapter is built on. */
export interface Prereq {
  id: string;
  /** Where it comes from, e.g. "Class 9 · Polynomials". */
  from: string;
  title: string;
  /** Why this chapter needs it, in one line a student understands. */
  why: string;
  /**
   * A 15-second question that proves whether the student has it. Kept in data
   * so the placement check is always a real, correct question — never one the
   * model invented on the spot.
   */
  probe: { q: string; answer: string };
}

/** One teachable idea. Small enough to explain and check in a single exchange. */
export interface Concept {
  id: string;
  title: string;
  /** The idea itself, in one sentence. */
  oneLine: string;
  /**
   * What the tutor must get across — the real content, so the explanation is
   * grounded even when no NCERT text matches the phrasing the student used.
   */
  brief: string;
  /** A worked example to teach from, exact so it cannot be misremembered. */
  example?: string;
  /** The check question. Correct answer stored, so grading is never a guess. */
  check: { q: string; answer: string; hint: string };
  /** What students get wrong here, and what the wrong answer usually means. */
  mistakes?: string[];
  /** A figure worth drawing for this concept — handed to the model verbatim. */
  figure?: string;
  /** Prereq ids from the chapter's prereq list that this concept leans on. */
  needs?: string[];
  /** Marks this idea typically carries in the board paper. */
  marks?: string;
}

/** Where the chapter goes next — the "why am I learning this" answer. */
export interface LeadsTo {
  title: string;
  where: string;
  why: string;
}

export interface ConceptMap {
  /** Matches the curriculum chapterId, e.g. "c10-maths-02". */
  chapterId: string;
  chapterTitle: string;
  classLevel: ClassLevel;
  subject: string;
  /** One line on what the whole chapter is really about. */
  bigIdea: string;
  prereqs: Prereq[];
  concepts: Concept[];
  leadsTo: LeadsTo[];
  /** True when hand-authored; false when derived from chapter metadata. */
  authored: boolean;
}
