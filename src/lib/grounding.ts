// Layered retrieval that feeds the tutor REAL content for any topic.
//
// Order of preference for a student message:
//   1. Verbatim NCERT exercise (src/data/ncert) — exact problems, when loaded.
//   2. Curriculum chapter + the real question bank (src/data) — covers ALL 274
//      chapters with curated concept/board notes and real marking-scheme answers.
// Whichever matches becomes the grounded source the tutor must teach from. If
// nothing matches, we return null and the persona's honesty rule kicks in.
import type { ClassLevel, Chapter, Subject } from "./types";
import { SUBJECTS, questionsFor } from "../data";
import { findNcertForQuery, buildGroundingContent } from "../data/ncert";

const STOP = new Set([
  "the", "a", "an", "of", "to", "me", "my", "is", "in", "on", "and", "for",
  "teach", "explain", "solve", "help", "with", "please", "give", "show", "how",
  "what", "chapter", "exercise", "question", "questions", "ncert", "class",
  "from", "about", "this", "that", "some", "make", "want", "need", "learn",
]);

function scoreChapter(q: string, subject: Subject, chapter: Chapter): number {
  let score = 0;
  const title = chapter.title.toLowerCase();
  if (q.includes(title)) score += 6;
  if (q.includes(subject.name.toLowerCase())) score += 1;
  for (const t of chapter.keyTopics) {
    if (t.length > 3 && q.includes(t.toLowerCase())) score += 3;
  }
  const hay = (title + " " + chapter.keyTopics.join(" ")).toLowerCase();
  const words = q.split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !STOP.has(w));
  for (const w of words) if (hay.includes(w)) score += 1;
  const chNo = q.match(/\bchapter\s*(\d+)\b/);
  if (chNo && parseInt(chNo[1], 10) === chapter.number) score += 4;
  return score;
}

function findCurriculumChapter(
  query: string,
  classLevel?: ClassLevel
): { subject: Subject; chapter: Chapter } | null {
  const q = query.toLowerCase();
  const scoped = classLevel
    ? SUBJECTS.filter((s) => s.classLevel === classLevel)
    : SUBJECTS;
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
    lines.push("");
    lines.push(
      "REAL EXAM QUESTIONS FROM THIS CHAPTER (with marking-scheme answers) — use these as ground truth for questions, worked examples and the way marks are awarded:"
    );
    for (const question of qs) {
      lines.push(
        `[${question.marks}-mark ${question.type}, ${question.source}] ${question.text}`
      );
      if (question.answer) lines.push(`   Answer: ${question.answer}`);
      if (question.keywords?.length) {
        lines.push(`   Examiner keywords: ${question.keywords.join(", ")}`);
      }
      if (question.examinerTip) lines.push(`   Examiner tip: ${question.examinerTip}`);
    }
  }
  return lines.join("\n");
}

/**
 * Real grounded source text for a student message, or null when nothing in the
 * library matches (the tutor then answers honestly without inventing content).
 */
/**
 * Hard ceiling on the grounded source. The free tier charges every prompt token
 * against a per-minute budget, and an unbounded block here is what pushes a
 * normal second question over the limit.
 */
const MAX_GROUNDING_CHARS = 6000;

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
  const ncert = findNcertForQuery(message, classLevel);
  if (!ncert?.missingExercise) return null;
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
  classLevel?: ClassLevel
): string | null {
  const ncert = findNcertForQuery(message, classLevel);
  if (ncert) return capped(buildGroundingContent(ncert));

  const cc = findCurriculumChapter(message, classLevel);
  if (cc) return capped(buildCurriculumGrounding(cc.subject, cc.chapter));

  return null;
}
