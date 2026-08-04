import type { Question } from "../lib/types";
import { C9_MATHS_QUESTIONS } from "./questions/c9maths";
import { C9_SCIENCE_QUESTIONS } from "./questions/c9science";
import { C9_SST_QUESTIONS } from "./questions/c9sst";
import { C9_ENGLISH_QUESTIONS } from "./questions/c9english";
import { C10_MATHS_QUESTIONS } from "./questions/c10maths";
import { C10_SCIENCE_QUESTIONS } from "./questions/c10science";
import { C10_SST_ENGLISH_QUESTIONS } from "./questions/c10sstEnglish";
import { C11_QUESTIONS } from "./questions/c11";
import { C11_ECONOMICS_QUESTIONS } from "./questions/c11economics";
import { C11_STATISTICS_QUESTIONS } from "./questions/c11statistics";
import { C12_PHYSICS_QUESTIONS } from "./questions/c12physics";
import { C12_CHEM_BIO_QUESTIONS } from "./questions/c12chemBio";
import { C12_MATHS_C11_QUESTIONS } from "./questions/c12mathsC11";
import { C12_ENGLISH_QUESTIONS } from "./questions/c12english";
import { C12_ECONOMICS_QUESTIONS } from "./questions/c12economics";

/**
 * The question bank. Every answer is written the way the CBSE marking scheme
 * rewards it — stepwise, in NCERT terminology, with the examiner's key words
 * called out separately so a student learns what actually earns the marks.
 */
export const QUESTIONS: Question[] = [
  ...C9_MATHS_QUESTIONS,
  ...C9_SCIENCE_QUESTIONS,
  ...C9_SST_QUESTIONS,
  ...C9_ENGLISH_QUESTIONS,
  ...C10_MATHS_QUESTIONS,
  ...C10_SCIENCE_QUESTIONS,
  ...C10_SST_ENGLISH_QUESTIONS,
  ...C11_QUESTIONS,
  ...C11_ECONOMICS_QUESTIONS,
  ...C11_STATISTICS_QUESTIONS,
  ...C12_PHYSICS_QUESTIONS,
  ...C12_CHEM_BIO_QUESTIONS,
  ...C12_MATHS_C11_QUESTIONS,
  ...C12_ENGLISH_QUESTIONS,
  ...C12_ECONOMICS_QUESTIONS,
];
