import type { Subject } from "../lib/types";
import { CLASS_9_SUBJECTS } from "./curriculum/class9";
import { CLASS_10_SUBJECTS } from "./curriculum/class10";
import { CLASS_11_SUBJECTS } from "./curriculum/class11";
import { CLASS_12_SUBJECTS } from "./curriculum/class12";

/**
 * The CBSE/NCERT curriculum map for classes 9–12, on the current rationalised
 * syllabus. Chapter ids follow {subjectId}-{NN} where NN is the chapter's
 * number in its NCERT textbook — the question bank, resources and videos all
 * reference these ids.
 */
export const SUBJECTS: Subject[] = [
  ...CLASS_9_SUBJECTS,
  ...CLASS_10_SUBJECTS,
  ...CLASS_11_SUBJECTS,
  ...CLASS_12_SUBJECTS,
];
