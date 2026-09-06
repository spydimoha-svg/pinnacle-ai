// Shared domain types for Pinnacle AI. Every data file and page conforms to these.

export type Role = "student" | "admin" | "master";
export type ClassLevel = 6 | 7 | 8 | 9 | 10 | 11 | 12;
/** Study mode — CBSE board prep, entrance exam tracks, or international boards. */
export type Mode = "board" | "jee" | "neet" | "cuet" | "sat" | "igcse" | "cambridge";

export interface School {
  id: string;
  name: string;
  city: string;
  /** Pricing plan is controlled from the Pinnacle Master console. */
  plan: "free" | "standard" | "premium";
  /** ₹ per student per month. 0 for free schools. */
  pricePerStudent: number;
  students: number;
  joined: string; // ISO date
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  schoolId?: string;
  classLevel?: ClassLevel;
}

export type ProgressStatus = "not-started" | "learning" | "revising" | "mastered";

export interface ChapterProgress {
  chapterId: string;
  status: ProgressStatus;
  /** 0–100, self-reported + inferred */
  confidence: number;
  lastStudied?: string; // ISO date
  /** Set once the chapter's mastery altitude has been credited. */
  masteryAwarded?: boolean;
}

/** Pinnacle's memory of a student — grows as the student grows. */
export interface StudentMemory {
  name: string;
  classLevel: ClassLevel;
  mode: Mode;
  targetScore?: string;
  examTargets: string[];
  achievements: string[];
  strengths: string[];
  focusAreas: string[];
  /** Consecutive study days */
  streak: number;
  /** ISO day (YYYY-MM-DD) the student was last active */
  lastActiveDay?: string;
  /** Altitude points — progress metaphor; climbing toward the pinnacle */
  altitude: number;
  lastTopics: string[];
  /** Free-form notes the tutor keeps about the student */
  notes: string[];
  progress: Record<string, ChapterProgress>;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  /** e.g. "≈8 marks in boards" */
  weightage?: string;
  keyTopics: string[];
  /** How CBSE tends to ask this chapter */
  boardNotes?: string;
}

export interface Subject {
  id: string;
  name: string;
  classLevel: ClassLevel;
  /** lucide icon name used by pages (decorative) */
  icon: string;
  /** one of: gold | mint | coral | sky | violet */
  color: "gold" | "mint" | "coral" | "sky" | "violet";
  chapters: Chapter[];
}

export type QuestionType = "mcq" | "vsa" | "sa" | "la" | "case";
export type QuestionSource = "pyq" | "sample" | "exemplar" | "important";

/**
 * Where a question came from, most authoritative first.
 *
 * The ordering is the point: a question printed in the NCERT exercise carries
 * more weight than one from the Exemplar, which carries more than a past
 * paper, which carries more than anything a model wrote. A worksheet that
 * cannot say which of these a question is cannot be trusted as practice.
 */
export type SourceTier =
  | "ncert-exercise"
  | "ncert-exemplar"
  | "cbse-sqp"
  | "pyq"
  | "bank"
  | "generated"
  | "cambridge-pastpaper"
  | "igcse-textbook"
  | "cengage"
  | "hc-verma"
  | "arihant"
  | "rd-sharma";

export interface Provenance {
  tier: SourceTier;
  /** One line a student can read: "NCERT Class 10 Maths · Ex 4.2, Q3". */
  label: string;
  book?: string;
  exercise?: string;
  problemNo?: string;
  year?: number;
  bookUrl?: string;
  bookPage?: number;
  verbatim: boolean;
  /** Progression Level: 1 = Core, 2 = Standard Reference, 3 = Advanced */
  level?: 1 | 2 | 3;
}

export interface Question {
  id: string;
  subjectId: string;
  chapterId: string;
  classLevel: ClassLevel;
  text: string;
  marks: 1 | 2 | 3 | 4 | 5 | 6;
  type: QuestionType;
  year?: number;
  source: QuestionSource;
  /** Model answer written the way the exam marking scheme expects it */
  answer: string;
  /** Key words / value points the examiner looks for */
  keywords: string[];
  examinerTip?: string;
  /** Where this question came from. Absent on older saved worksheets. */
  provenance?: Provenance;
}

export type ResourceKind =
  | "ncert"
  | "exemplar"
  | "sample-paper"
  | "pyq"
  | "syllabus"
  | "notes"
  | "school"
  | "reference-book"
  | "reference-math"
  | "reference-physics"
  | "reference-chemistry"
  | "reference-biology"
  | "reference-guide";

export interface Resource {
  id: string;
  title: string;
  kind: ResourceKind;
  classLevel: ClassLevel;
  subjectId?: string;
  url?: string;
  description: string;
  /** Publisher e.g. "Dhanpat Rai", "Cengage Learning", "Arihant Publications", "Cambridge University Press" */
  publisher?: string;
  /** Primary author e.g. "R.D. Sharma", "H.C. Verma", "S.L. Arora", "David Rayner", "Tom Duncan" */
  author?: string;
  /** Series or edition info e.g. "Concepts of Physics", "All-in-One", "Hodder IGCSE" */
  series?: string;
  /** Recommended usage category or strategy */
  category?: string;
  /** Progression Level: 1 = Core, 2 = Standard Reference, 3 = Advanced */
  level?: 1 | 2 | 3;
  /** Target Board or Curriculum */
  board?: "CBSE" | "IGCSE" | "Cambridge" | "JEE" | "NEET" | "SAT";
  /** Set when a school admin uploaded it — visible only to that school (multi-tenant). */
  schoolId?: string;
  addedBy?: string;
  addedOn?: string;
}

export interface VideoRec {
  id: string;
  title: string;
  channel: string;
  language: "English" | "Hindi" | "Hinglish";
  url: string;
  subjectId: string;
  classLevel: ClassLevel;
  topic: string;
  /** Why Pinnacle recommends this one */
  why: string;
}

export interface EntranceExam {
  id: Mode;
  name: string;
  fullName: string;
  audience: string;
  pattern: string;
  subjects: string[];
  /** How prep differs from board prep */
  approach: string;
  /** Chapters/areas with highest weightage */
  highYield: string[];
  officialUrl: string;
}

export interface WorksheetItem {
  question: Question;
  studentAnswer?: string;
  revealed: boolean;
}

export interface Worksheet {
  id: string;
  title: string;
  createdAt: string;
  subjectId: string;
  chapterIds: string[];
  totalMarks: number;
  items: WorksheetItem[];
  completed: boolean;
}

export interface BlobEntry {
  id: string;
  date: string; // ISO date
  completedToday: string;
  difficulties: string;
  freeform: string;
  moodEmojiFree: string; // short mood word, no emoji policy for UI text is fine, students can type anything
  /** Pinnacle's reflection on the entry */
  reflection?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  ts: number;
}

export interface CbseUpdate {
  id: string;
  date: string;
  title: string;
  summary: string;
  tag: "syllabus" | "datesheet" | "sample-paper" | "circular" | "result";
  url?: string;
}
