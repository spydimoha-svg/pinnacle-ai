// Concept-graph lookup.
//
// Hand-authored maps are used where they exist. Everywhere else the map is
// DERIVED from the curriculum the app already carries — the chapter's own key
// topics become the sequence of small concepts, and the prerequisites are found
// by matching this chapter against the chapters of the classes below it.
//
// A derived map is honestly weaker than an authored one (no stored check
// answers, no worked examples), and it says so via `authored: false` — the
// lesson engine leans on the model more when teaching from one, and the tutor
// never claims an exercise number it does not hold.
import type { ClassLevel, Chapter, Subject } from "../../lib/types";
import { SUBJECTS } from "../curriculum";
import { ncertChapterById } from "../ncert";
import type { Concept, ConceptMap, Prereq } from "./types";
import { C10_MATHS_POLYNOMIALS_MAP } from "./c10-maths-polynomials";
import { C10_MATHS_TRIGONOMETRY_MAP } from "./c10-maths-trigonometry";
import { C10_MATHS_REAL_NUMBERS_MAP } from "./c10-maths-real-numbers";
import { C10_MATHS_QUADRATIC_EQUATIONS_MAP } from "./c10-maths-quadratic-equations";
import { C10_MATHS_ARITHMETIC_PROGRESSIONS_MAP } from "./c10-maths-arithmetic-progressions";
import { C10_MATHS_TRIANGLES_MAP } from "./c10-maths-triangles";
import { C12_MATHS_CONTINUITY_DIFFERENTIABILITY_MAP } from "./c12-maths-continuity-differentiability";

export type { Concept, ConceptMap, Prereq, LeadsTo } from "./types";

/** Every hand-authored map. Grows as chapters are seeded. */
const AUTHORED: ConceptMap[] = [
  C10_MATHS_POLYNOMIALS_MAP,
  C10_MATHS_TRIGONOMETRY_MAP,
  C10_MATHS_REAL_NUMBERS_MAP,
  C10_MATHS_QUADRATIC_EQUATIONS_MAP,
  C10_MATHS_ARITHMETIC_PROGRESSIONS_MAP,
  C10_MATHS_TRIANGLES_MAP,
  C12_MATHS_CONTINUITY_DIFFERENTIABILITY_MAP,
];

const STOP = new Set([
  "and", "the", "of", "in", "to", "a", "an", "with", "for", "its", "their",
  "some", "on", "by", "from", "into", "between", "using", "based", "type",
  "types", "basic", "introduction", "applications", "application", "problems",
  "concept", "concepts", "simple", "related", "other", "more", "than", "that",
  "this", "these", "those", "class", "chapter", "part", "one", "two",
]);

function words(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 3 && !STOP.has(w));
}

/** How strongly two chapter descriptions overlap, 0..1. */
function similarity(a: string, b: string): number {
  const A = new Set(words(a));
  const B = new Set(words(b));
  if (!A.size || !B.size) return 0;
  let hit = 0;
  for (const w of B) if (A.has(w)) hit++;
  return hit / Math.min(A.size, B.size);
}

function chapterText(subject: Subject, chapter: Chapter): string {
  return `${chapter.title} ${chapter.keyTopics.join(" ")} ${subject.name}`;
}

/**
 * Chapters from the classes BELOW this one that this chapter is built on.
 *
 * This is the "where does this come from" answer, and it is derived rather than
 * invented: it can only ever name a chapter that really is in the syllabus of a
 * lower class, because it searches the same curriculum the app teaches from.
 */
export function priorChapters(
  subject: Subject,
  chapter: Chapter,
  max = 3
): { subject: Subject; chapter: Chapter; score: number }[] {
  const mine = chapterText(subject, chapter);
  const out: { subject: Subject; chapter: Chapter; score: number }[] = [];
  for (const s of SUBJECTS) {
    if (s.classLevel >= subject.classLevel) continue;
    // Stay within the same broad subject family: Class 9 Maths feeds Class 10
    // Maths, not Class 10 Biology.
    const family = (n: string) => n.toLowerCase().split(/[^a-z]+/)[0];
    if (family(s.name) !== family(subject.name)) continue;
    for (const c of s.chapters) {
      const score = similarity(mine, chapterText(s, c));
      if (score >= 0.34) out.push({ subject: s, chapter: c, score });
    }
  }
  return out.sort((a, b) => b.score - a.score).slice(0, max);
}

/** Chapters in LATER classes that build on this one. */
export function laterChapters(
  subject: Subject,
  chapter: Chapter,
  max = 3
): { subject: Subject; chapter: Chapter }[] {
  const mine = chapterText(subject, chapter);
  const out: { subject: Subject; chapter: Chapter; score: number }[] = [];
  for (const s of SUBJECTS) {
    if (s.classLevel <= subject.classLevel) continue;
    const family = (n: string) => n.toLowerCase().split(/[^a-z]+/)[0];
    if (family(s.name) !== family(subject.name)) continue;
    for (const c of s.chapters) {
      const score = similarity(mine, chapterText(s, c));
      if (score >= 0.34) out.push({ subject: s, chapter: c, score });
    }
  }
  return out.sort((a, b) => b.score - a.score).slice(0, max);
}

function findChapter(chapterId: string): { subject: Subject; chapter: Chapter } | null {
  for (const s of SUBJECTS) {
    const c = s.chapters.find((ch) => ch.id === chapterId);
    if (c) return { subject: s, chapter: c };
  }
  return null;
}

/**
 * Build a concept map from what the app already knows about a chapter.
 *
 * Each key topic becomes one concept, in the order the syllabus lists them —
 * which is the order the book teaches them. The check questions are left as
 * instructions rather than fixed text, because a made-up "correct answer" is
 * worse than none: the engine tells the model to ask its own question and mark
 * it against the grounded chapter notes instead.
 */
function deriveMap(subject: Subject, chapter: Chapter): ConceptMap {
  const ncert = ncertChapterById(chapter.id);
  const topics = chapter.keyTopics.length
    ? chapter.keyTopics
    : ncert?.topics ?? [chapter.title];

  const concepts: Concept[] = topics.map((topic, i) => ({
    id: `${chapter.id}-t${i + 1}`,
    title: topic,
    oneLine: `${topic} — the ${ordinal(i + 1)} idea in ${chapter.title}.`,
    brief:
      `Teach "${topic}" as it appears in ${chapter.title} (Class ${subject.classLevel} ${subject.name}). ` +
      `Use the chapter's own notes and definitions from the source block, not a general-knowledge version of the topic.`,
    check: {
      q: "",
      answer: "",
      hint: "",
    },
    marks: chapter.weightage,
  }));

  const prereqs: Prereq[] = priorChapters(subject, chapter).map((p, i) => ({
    id: `${chapter.id}-p${i + 1}`,
    from: `Class ${p.subject.classLevel} · ${p.chapter.title}`,
    title: p.chapter.keyTopics[0] ?? p.chapter.title,
    why: `${chapter.title} assumes you can already use ${p.chapter.title} from Class ${p.subject.classLevel}.`,
    probe: { q: "", answer: "" },
  }));

  return {
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    classLevel: subject.classLevel,
    subject: subject.name,
    authored: false,
    bigIdea: chapter.boardNotes || `What ${chapter.title} is really about, and how the board asks it.`,
    prereqs,
    concepts,
    leadsTo: laterChapters(subject, chapter).map((l) => ({
      title: l.chapter.title,
      where: `Class ${l.subject.classLevel}`,
      why: `Builds directly on ${chapter.title}.`,
    })),
  };
}

function ordinal(n: number): string {
  const names = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
  return names[n - 1] ?? `${n}th`;
}

/** The concept map for a chapter: authored where we have one, derived otherwise. */
export function conceptMapFor(chapterId: string): ConceptMap | null {
  const authored = AUTHORED.find((m) => m.chapterId === chapterId);
  if (authored) return authored;
  const found = findChapter(chapterId);
  return found ? deriveMap(found.subject, found.chapter) : null;
}

export function conceptById(map: ConceptMap, conceptId: string): Concept | undefined {
  return map.concepts.find((c) => c.id === conceptId);
}

/**
 * The chapter's route, drawn.
 *
 * Built in code from the concept graph, never asked of the model: the one thing
 * a student must be able to trust completely is the map of where they are.
 */
export function roadmapDiagram(map: ConceptMap, doneIds: string[] = [], currentId?: string): string {
  const safe = (s: string) => s.replace(/["\n]/g, " ").replace(/[{}[\]()|]/g, "").slice(0, 44).trim();
  const lines: string[] = ["flowchart TD"];

  if (map.prereqs.length) {
    lines.push(`  subgraph PRIOR["Comes from earlier classes"]`);
    lines.push(`    direction LR`);
    map.prereqs.forEach((p, i) => {
      lines.push(`    P${i}["${safe(p.from)}: ${safe(p.title)}"]`);
    });
    lines.push("  end");
  }

  lines.push(`  subgraph NOW["${safe(map.chapterTitle)} — step by step"]`);
  lines.push(`    direction TB`);
  map.concepts.forEach((c, i) => {
    const mark = doneIds.includes(c.id) ? "done " : c.id === currentId ? "you are here " : "";
    lines.push(`    C${i}["${mark}${i + 1}. ${safe(c.title)}"]`);
  });
  lines.push("  end");
  for (let i = 1; i < map.concepts.length; i++) lines.push(`  C${i - 1} --> C${i}`);
  if (map.prereqs.length) lines.push(`  P0 --> C0`);

  if (map.leadsTo.length) {
    lines.push(`  subgraph NEXT["Where it takes you"]`);
    lines.push(`    direction LR`);
    map.leadsTo.slice(0, 3).forEach((l, i) => {
      lines.push(`    N${i}["${safe(l.where)}: ${safe(l.title)}"]`);
    });
    lines.push("  end");
    lines.push(`  C${map.concepts.length - 1} --> N0`);
  }

  return "```mermaid\n" + lines.join("\n") + "\n```";
}
