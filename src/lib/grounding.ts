// Layered retrieval that feeds the tutor REAL content for any topic.
//
// Order of preference for a student message:
//   1. Verbatim NCERT exercise (src/data/ncert) — exact problems, when loaded.
//   2. Curriculum chapter + the real question bank (src/data) — covers ALL 274
//      chapters with curated concept/board notes and real marking-scheme answers.
// Whichever matches becomes the grounded source the tutor must teach from. If
// nothing matches, we return null and the persona's honesty rule kicks in.
import type { ClassLevel, Chapter, Subject, Mode } from "./types";
import { SUBJECTS, questionsFor } from "../data";
import { findNcertForQuery, buildGroundingContent, ncertChapterById, NCERT } from "../data/ncert";

// findNcertForQuery falls back to searching the FULL NCERT set when its class
// filter leaves an empty pool (see its "scope = pool.length ? pool : NCERT").
// NCERT only holds Class 9-10 chapters, so a Class 11/12 or entrance-track
// student's query would otherwise silently match a wrong-class chapter. Only
// call it for a class it actually has content for.
const NCERT_CLASS_LEVELS = new Set(NCERT.map((c) => c.classLevel));

const STOP = new Set([
  "the", "a", "an", "of", "to", "me", "my", "is", "in", "on", "and", "for",
  "teach", "explain", "solve", "help", "with", "please", "give", "show", "how",
  "what", "chapter", "exercise", "question", "questions", "ncert", "class",
  "from", "about", "this", "that", "some", "make", "want", "need", "learn",
]);

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Whole-word match so a short word doesn't score just for appearing inside a
// longer, unrelated word (e.g. "sin" inside "using").
export function hasWord(haystack: string, needle: string): boolean {
  if (!needle) return false;
  return new RegExp(`\\b${escapeRegExp(needle)}\\b`).test(haystack);
}

function scoreChapter(q: string, subject: Subject, chapter: Chapter): number {
  let score = 0;
  const title = chapter.title.toLowerCase();
  if (hasWord(q, title)) score += 6;
  if (hasWord(q, subject.name.toLowerCase())) score += 1;
  for (const t of chapter.keyTopics) {
    if (t.length > 3 && hasWord(q, t.toLowerCase())) score += 3;
  }
  // Title only: keyTopics already scored above, so including them here would
  // let a single shared keyTopic word double-count (+3 then +1) and cross the
  // score>=4 grounding threshold on its own.
  const words = q.split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !STOP.has(w));
  for (const w of words) if (hasWord(title, w)) score += 1;
  const chNo = q.match(/\bchapter\s*(\d+)\b/);
  if (chNo && parseInt(chNo[1], 10) === chapter.number) score += 4;
  return score;
}

// persona.ts's classBoundary tells an entrance student (jee/neet/cuet/sat) that
// their syllabus spans Class 11 AND 12 together, whichever of the two they are
// registered in. Grounding search must honour that or the tutor silently falls
// back to unsourced teaching for half the student's own syllabus.
const ENTRANCE_CLASS_LEVELS: ClassLevel[] = [11, 12];

function classLevelsFor(classLevel?: ClassLevel, mode?: Mode): ClassLevel[] | null {
  if (mode && mode !== "board") return ENTRANCE_CLASS_LEVELS;
  return classLevel ? [classLevel] : null;
}

function findCurriculumChapter(
  query: string,
  classLevel?: ClassLevel,
  mode?: Mode
): { subject: Subject; chapter: Chapter } | null {
  const q = query.toLowerCase();
  const levels = classLevelsFor(classLevel, mode);
  const scoped = levels ? SUBJECTS.filter((s) => levels.includes(s.classLevel)) : SUBJECTS;
  const pool = scoped.length ? scoped : SUBJECTS;
  let best: { subject: Subject; chapter: Chapter; score: number } | null = null;
  for (const s of pool) {
    for (const c of s.chapters) {
      const score = scoreChapter(q, s, c);
      if (score >= 4 && (!best || score > best.score)) {
        best = { subject: s, chapter: c, score };
      }
    }
  }
  return best ? { subject: best.subject, chapter: best.chapter } : null;
}

/**
 * Hard ceiling on the grounded source. The free tier charges every prompt token
 * against a per-minute budget, and an unbounded block here is what pushes a
 * normal second question over the limit.
 */
const MAX_GROUNDING_CHARS = 6000;

function buildCurriculumGrounding(subject: Subject, chapter: Chapter): string {
  const lines: string[] = [];
  lines.push(`Subject: ${subject.name} (Class ${subject.classLevel}, CBSE)`);
  lines.push(`Chapter ${chapter.number}: ${chapter.title}`);
  if (chapter.weightage) lines.push(`Board weightage: ${chapter.weightage}`);
  if (chapter.keyTopics.length) {
    lines.push(`Topics in this chapter: ${chapter.keyTopics.join("; ")}`);
  }
  if (chapter.boardNotes) lines.push(`Board notes: ${chapter.boardNotes}`);

  // Six, not ten. Each entry carries a question, its full marking-scheme
  // answer, keywords and an examiner tip, so ten of them added well over a
  // thousand tokens to every single request — against a 12k-per-minute free
  // budget. Six is still plenty of ground truth to teach and mark from.
  const qs = questionsFor({ chapterId: chapter.id }).slice(0, 6);
  if (qs.length) {
    const header = [
      "",
      "REAL EXAM QUESTIONS FROM THIS CHAPTER (with marking-scheme answers) — use these as ground truth for questions, worked examples and the way marks are awarded:",
    ];
    const questionLines: string[] = [];
    for (const question of qs) {
      const block = [
        `[${question.marks}-mark ${question.type}, ${question.source}] ${question.text}`,
      ];
      if (question.answer) block.push(`   Answer: ${question.answer}`);
      if (question.keywords?.length) {
        block.push(`   Examiner keywords: ${question.keywords.join(", ")}`);
      }
      if (question.examinerTip) block.push(`   Examiner tip: ${question.examinerTip}`);

      // A question and its marking-scheme answer travel together or not at
      // all. Char-truncating mid-block would strand the question with no
      // ground truth for its answer, inviting the model to invent one.
      const next = [...lines, ...header, ...questionLines, ...block].join("\n");
      if (next.length > MAX_GROUNDING_CHARS) break;
      questionLines.push(...block);
    }
    if (questionLines.length) lines.push(...header, ...questionLines);
  }
  return lines.join("\n");
}

/**
 * Real grounded source text for a student message, or null when nothing in the
 * library matches (the tutor then answers honestly without inventing content).
 */
function capped(text: string): string {
  if (text.length <= MAX_GROUNDING_CHARS) return text;
  // Cut at a line boundary so a question never ends mid-sentence and gets
  // taught as if that were the whole problem.
  const cut = text.lastIndexOf("\n", MAX_GROUNDING_CHARS);
  return text.slice(0, cut > 0 ? cut : MAX_GROUNDING_CHARS);
}

/**
 * The answer the app can give without asking a model anything.
 *
 * A student naming an exercise that does not exist is a question of FACT, and
 * the fact is already in the library. Handing it to the model and asking it to
 * refuse politely works on a large model and fails on a small one — measured on
 * the local 3B, it was told in capitals that Exercise 2.9 does not exist and it
 * solved Exercise 2.2 under that number anyway. So the app answers this one.
 */
export function factualAnswer(
  message: string,
  classLevel?: ClassLevel
): string | null {
  if (classLevel !== undefined && !NCERT_CLASS_LEVELS.has(classLevel)) return null;
  const ncert = findNcertForQuery(message, classLevel);
  if (!ncert?.missingExercise) return null;
  // findNcertForQuery falls back to matching a bare "N.N" (e.g. a student's own
  // answer, "I got 1.5"), which is not a claim about an exercise number. Only
  // report a missing exercise when the student actually named one.
  if (!/\b(?:exercise|example|ex\.?)\s*\.?\s*\d+\.\d+\b/i.test(message)) return null;
  const have = ncert.chapter.exercises.map((e) => e.exercise);
  return [
    `There is no **Exercise ${ncert.missingExercise}** in ${ncert.chapter.title} (${ncert.chapter.book}).`,
    "",
    have.length
      ? `That chapter has ${have.length === 1 ? "only one exercise" : `${have.length} exercises`}: **${have.join("** and **")}**.`
      : "I don't have that chapter's exercises loaded yet.",
    "",
    "I'm not going to solve a different exercise and label it with the number you asked for, because you'd revise the wrong thing. Tell me which one you meant, or paste the question exactly as it's printed and I'll solve that.",
  ].join("\n");
}

export function groundingFor(
  message: string,
  classLevel?: ClassLevel,
  mode?: Mode
): string | null {
  const levels = classLevelsFor(classLevel, mode);
  const ncert = levels
    ? (levels
        .filter((lvl) => NCERT_CLASS_LEVELS.has(lvl))
        .map((lvl) => findNcertForQuery(message, lvl))
        .find(Boolean) ?? null)
    : findNcertForQuery(message, classLevel);
  if (ncert) return capped(buildGroundingContent(ncert));

  const cc = findCurriculumChapter(message, classLevel, mode);
  if (cc) return capped(buildCurriculumGrounding(cc.subject, cc.chapter));

  return null;
}

/**
 * Ground on a chapter that is already known, not guessed. A structured lesson
 * always knows exactly which chapter it is teaching, so it must never fall
 * back to the fuzzy keyword search above — a wrong-chapter match there is the
 * one grounding failure that actively teaches the wrong thing.
 */
export function groundingForChapter(
  chapterId: string,
  classLevel?: ClassLevel,
  mode?: Mode
): string | null {
  const ncert = ncertChapterById(chapterId);
  if (ncert) return capped(buildGroundingContent({ chapter: ncert }));

  const levels = classLevelsFor(classLevel, mode);
  for (const s of SUBJECTS) {
    if (levels && !levels.includes(s.classLevel)) continue;
    const c = s.chapters.find((ch) => ch.id === chapterId);
    if (c) return capped(buildCurriculumGrounding(s, c));
  }
  return null;
}
