// Shared domain types for Pinnacle AI. Every data file and page conforms to these.

export type Role = "student" | "admin" | "master";
export type ClassLevel = 9 | 10 | 11 | 12;
/** Study mode — CBSE board prep, or an entrance-exam track ("Learn Better"). */
export type Mode = "board" | "jee" | "neet" | "cuet" | "sat";

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
  /** Model answer written the way the CBSE marking scheme expects it */
  answer: string;
  /** CBSE key words / value points the examiner looks for */
  keywords: string[];
  examinerTip?: string;
}

export type ResourceKind =
  | "ncert"
  | "exemplar"
  | "sample-paper"
  | "pyq"
  | "syllabus"
  | "notes"
  | "school";

export interface Resource {
  id: string;
  title: string;
  kind: ResourceKind;
  classLevel: ClassLevel;
  subjectId?: string;
  url?: string;
  description: string;
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
