// Sourced worksheet generation.
//
// The old generator drew from one pool — the curated question bank — shuffled
// it, and called the result a worksheet. Two things were wrong with that. It
// could not tell a student WHERE a question came from, so there was no way to
// know whether they were practising the actual NCERT exercise or something the
// app made up. And it had no shape: ten questions of whatever marks happened
// to come out of the shuffle is not how any CBSE paper is built.
//
// This module fixes both.
//
//   PROVENANCE. Every question carries where it came from, and the tiers are
//   ordered by how much authority they have: the printed NCERT exercise first,
//   then NCERT Exemplar, then CBSE's own sample papers, then previous-year
//   questions, then the curated bank, and only then anything a model wrote.
//   The NCERT tier is VERBATIM — the exact words in the book, with a link to
//   the page in the official PDF — because a student who has practised the
//   real exercise has practised the thing the paper is set from.
//
//   SHAPE. A worksheet is filled against a blueprint modelled on CBSE's own
//   paper design: a mix of objective, short, long and case-based questions
//   across a spread of marks. Every worksheet therefore covers every question
//   type the paper will actually ask, instead of whatever the shuffle produced.
import type {
  ClassLevel,
  Provenance,
  Question,
  QuestionType,
  SourceTier,
} from "./types";

export type { Provenance, SourceTier };
import { QUESTIONS } from "../data";
import { NCERT } from "../data/ncert";
import type { NcertChapter, NcertProblem } from "../data/ncert/types";

/* ------------------------------------------------------------------ *
 * Provenance
 * ------------------------------------------------------------------ */

export const TIER_ORDER: SourceTier[] = [
  "ncert-exercise",
  "ncert-exemplar",
  "cbse-sqp",
  "pyq",
  "cambridge-pastpaper",
  "igcse-textbook",
  "cengage",
  "hc-verma",
  "arihant",
  "rd-sharma",
  "bank",
  "generated",
];

export const TIER_LABEL: Record<SourceTier, string> = {
  "ncert-exercise": "NCERT exercise",
  "ncert-exemplar": "NCERT Exemplar",
  "cbse-sqp": "CBSE sample paper",
  pyq: "Previous-year question",
  bank: "Pinnacle bank",
  generated: "AI-written",
  "cambridge-pastpaper": "Cambridge Past Paper",
  "igcse-textbook": "IGCSE Text Reference",
  cengage: "Cengage Learning",
  "hc-verma": "HC Verma Concepts of Physics",
  arihant: "Arihant Series",
  "rd-sharma": "RD Sharma Reference",
};

export const TIER_CHIP: Record<SourceTier, string> = {
  "ncert-exercise": "chip-gold",
  "ncert-exemplar": "chip-mint",
  "cbse-sqp": "chip-sky",
  pyq: "chip-sky",
  bank: "chip",
  generated: "chip-coral",
  "cambridge-pastpaper": "chip-gold",
  "igcse-textbook": "chip-mint",
  cengage: "chip-gold",
  "hc-verma": "chip-gold",
  arihant: "chip-gold",
  "rd-sharma": "chip-gold",
};

export interface SourcedQuestion extends Question {
  provenance: Provenance;
}

/* ------------------------------------------------------------------ *
 * Linking to the book
 * ------------------------------------------------------------------ */

/**
 * NCERT publishes every chapter as a separate PDF under a stable code:
 * `iemh1` is Class 9 Mathematics, `jesc1` is Class 10 Science, and so on, with
 * the two-digit chapter number appended. Verified live against ncert.nic.in.
 *
 * A subject with no entry simply gets no link, which is the honest outcome —
 * a guessed code produces a 404 in a student's face.
 */
const NCERT_BOOK_CODE: Record<string, string> = {
  "c9-maths": "iemh1",
  "c9-science": "iesc1",
  "c10-maths": "jemh1",
  "c10-science": "jesc1",
};

export function ncertBookUrl(
  subjectId: string,
  chapterNumber: number,
  page?: number
): string | undefined {
  const code = NCERT_BOOK_CODE[subjectId];
  if (!code || chapterNumber < 1 || chapterNumber > 20) return undefined;
  const url = `https://ncert.nic.in/textbook/pdf/${code}${String(chapterNumber).padStart(2, "0")}.pdf`;
  // #page=N is the PDF open-parameter every major viewer honours, so the book
  // opens on the printed page the question is actually on rather than at the
  // chapter's first page. Only appended when the page is known.
  return page && page > 0 ? `${url}#page=${page}` : url;
}

/**
 * The NCERT Exemplar, chapter by chapter.
 *
 * Exemplar is a SEPARATE book from the textbook, published under a different
 * path and a different code, and it is where the harder board questions come
 * from — the ones the textbook exercise never prepares you for. A worksheet
 * that claims to be "well rounded" without it is really just the easy half.
 *
 * The code is built from two facts: `i` is Class 9 and `j` is Class 10, and
 * the digit after "eep" is the subject — 1 for Science, 2 for Mathematics.
 * So Class 10 Maths Chapter 4 is `jeep204.pdf`. Verified live against
 * ncert.nic.in on 2026-08-19; every combination below was fetched and returned
 * a real application/pdf, not the site's 404 page.
 */
const EXEMPLAR_PATH: Record<string, { cls: "IX" | "X"; subject: string; code: string }> = {
  "c9-maths": { cls: "IX", subject: "mathematics", code: "ieep2" },
  "c9-science": { cls: "IX", subject: "science", code: "ieep1" },
  "c10-maths": { cls: "X", subject: "mathematics", code: "jeep2" },
  "c10-science": { cls: "X", subject: "science", code: "jeep1" },
};

/**
 * Link to the Exemplar chapter for this subject, or undefined when we do not
 * publish one for it. A guessed path produces a 404 in a student's face, so an
 * unknown subject gets no link at all — the same rule the textbook links use.
 */
export function ncertExemplarUrl(
  subjectId: string,
  chapterNumber: number,
  page?: number
): string | undefined {
  const e = EXEMPLAR_PATH[subjectId];
  if (!e || chapterNumber < 1 || chapterNumber > 20) return undefined;
  const file = `${e.code}${String(chapterNumber).padStart(2, "0")}.pdf`;
  const url = `https://ncert.nic.in/pdf/publication/exemplarproblem/class${e.cls}/${e.subject}/${file}`;
  return page && page > 0 ? `${url}#page=${page}` : url;
}

/** The Exemplar's own answer booklet for a subject, when one is published. */
export function ncertExemplarAnswersUrl(subjectId: string): string | undefined {
  const e = EXEMPLAR_PATH[subjectId];
  if (!e) return undefined;
  return `https://ncert.nic.in/pdf/publication/exemplarproblem/class${e.cls}/${e.subject}/${e.code}an.pdf`;
}

/** Does this subject have an Exemplar we can point a student at? */
export function hasExemplar(subjectId: string): boolean {
  return subjectId in EXEMPLAR_PATH;
}

/* ------------------------------------------------------------------ *
 * Reading an NCERT problem as an exam question
 * ------------------------------------------------------------------ */

/**
 * How many marks is this printed exercise problem worth, and what type is it?
 *
 * The book does not say — exercises are not marked — so this is inferred, and
 * the UI labels it as a suggestion rather than a fact. The signals are the
 * ones an examiner actually uses: what the problem ASKS FOR (state, define,
 * prove, derive) and how much work the statement implies.
 */
export function weighNcertProblem(p: NcertProblem): {
  marks: Question["marks"];
  type: QuestionType;
} {
  const t = p.statement.toLowerCase();
  const len = p.statement.length;

  // Objective phrasing: a choice is offered, or a single value is wanted.
  if (/\b(?:which of the following|choose the correct|tick|\(a\).*\(b\).*\(c\))/.test(t)) {
    return { marks: 1, type: "mcq" };
  }
  // One-liners: state, name, write, define, is ... ?
  if (/^\s*(?:state|name|write down|define|is|are)\b/.test(t) && len < 140) {
    return { marks: 1, type: "vsa" };
  }
  // The heavy verbs: a proof or a derivation is never a one-marker.
  if (/\b(?:prove|show that|derive|establish|deduce)\b/.test(t)) {
    return { marks: len > 220 ? 5 : 3, type: len > 220 ? "la" : "sa" };
  }
  // A situation with several parts is a case-study question in all but name.
  if (/\((?:i|ii|iii|iv)\)/.test(t) || /\b(?:read the following|situation)\b/.test(t)) {
    return { marks: 4, type: "case" };
  }
  if (/\b(?:find|solve|determine|calculate|evaluate)\b/.test(t)) {
    if (len > 260) return { marks: 5, type: "la" };
    if (len > 120) return { marks: 3, type: "sa" };
    return { marks: 2, type: "sa" };
  }
  if (len < 90) return { marks: 1, type: "vsa" };
  if (len > 260) return { marks: 5, type: "la" };
  return { marks: 3, type: "sa" };
}

/** Turn one printed NCERT problem into a sourced worksheet question. */
function fromNcert(
  chapter: NcertChapter,
  exercise: string,
  p: NcertProblem,
  exercisePage?: number
): SourcedQuestion {
  const { marks, type } = weighNcertProblem(p);
  // The problem's own page when it has one, otherwise the page the exercise
  // starts on — near enough that the student lands in the right place.
  const page = p.page ?? exercisePage;
  const bookUrl = ncertBookUrl(chapter.subjectId, chapter.chapterNumber, page);
  return {
    id: `ncert-${chapter.id}-${exercise}-${p.no}`,
    subjectId: chapter.subjectId,
    chapterId: chapter.id,
    classLevel: chapter.classLevel,
    text: p.statement,
    marks,
    type,
    source: "exemplar",
    // The book prints the answer; the worked solution is the marking scheme
    // when we have one, and the bare answer when we do not.
    answer: p.solution || p.answer || "",
    // The value points an examiner looks for. NCERT exercises have no keyword
    // list, so the answer's own substance is the nearest honest thing — an
    // empty list is better than an invented one.
    keywords: [],
    examinerTip: p.answer && p.solution ? `Final answer: ${p.answer}` : undefined,
    provenance: {
      tier: "ncert-exercise",
      label: `${chapter.book} · Exercise ${exercise}, Q${p.no}`,
      book: chapter.book,
      exercise,
      problemNo: p.no,
      bookUrl,
      bookPage: page,
      verbatim: true,
    },
  };
}

/** Every printed exercise problem available for these chapters. */
export function ncertPool(chapterIds: string[]): SourcedQuestion[] {
  const out: SourcedQuestion[] = [];
  for (const chapter of NCERT) {
    if (chapterIds.length && !chapterIds.includes(chapter.id)) continue;
    for (const ex of chapter.exercises) {
      for (const p of ex.problems) {
        if (p.statement.trim().length > 12) {
          out.push(fromNcert(chapter, ex.exercise, p, ex.page));
        }
      }
    }
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * The rest of the sourced pools
 * ------------------------------------------------------------------ */

/** Which tier a curated bank question belongs to. */
function tierOf(q: Question): SourceTier {
  switch (q.source) {
    case "exemplar":
      return "ncert-exemplar";
    case "sample":
      return "cbse-sqp";
    case "pyq":
      return "pyq";
    default:
      return "bank";
  }
}

function labelFor(q: Question, tier: SourceTier): string {
  switch (tier) {
    case "ncert-exemplar":
      return `NCERT Exemplar · Class ${q.classLevel}`;
    case "cbse-sqp":
      return `CBSE Sample Paper${q.year ? ` ${q.year}` : ""} · Class ${q.classLevel}`;
    case "pyq":
      return `CBSE Board${q.year ? ` ${q.year}` : ""} · Class ${q.classLevel}`;
    default:
      return `Pinnacle question bank · Class ${q.classLevel}`;
  }
}

/** The curated bank, tagged with where each question actually came from. */
export function bankPool(opts: {
  subjectId: string;
  classLevel: ClassLevel;
  chapterIds: string[];
}): SourcedQuestion[] {
  return QUESTIONS.filter(
    (q) =>
      q.subjectId === opts.subjectId &&
      q.classLevel === opts.classLevel &&
      (opts.chapterIds.length === 0 || opts.chapterIds.includes(q.chapterId))
  ).map((q) => {
    const tier = tierOf(q);
    return {
      ...q,
      provenance: {
        tier,
        label: labelFor(q, tier),
        year: q.year,
        verbatim: tier === "pyq" || tier === "cbse-sqp",
      },
    };
  });
}

/* ------------------------------------------------------------------ *
 * The blueprint
 * ------------------------------------------------------------------ */

export interface Slot {
  type: QuestionType;
  marks: Question["marks"];
}

/**
 * The shape of a well-rounded worksheet.
 *
 * Proportions follow CBSE's paper design — objective, very short, short, long,
 * case-based — but not its exact counts: a real paper is over half MCQs, which
 * makes sense for a three-hour exam and makes for very poor practice. This is
 * weighted towards the questions a student learns most from writing, while
 * still guaranteeing at least one of every type they will meet on the day.
 */
const MIX: { type: QuestionType; marks: Question["marks"]; share: number }[] = [
  { type: "mcq", marks: 1, share: 0.25 },
  { type: "vsa", marks: 2, share: 0.2 },
  { type: "sa", marks: 3, share: 0.3 },
  { type: "la", marks: 5, share: 0.15 },
  { type: "case", marks: 4, share: 0.1 },
];

export function blueprint(count: number): Slot[] {
  const slots: Slot[] = [];
  if (count <= 0) return slots;

  // Below five questions there is no room for one of everything, so the mix
  // collapses to the types that carry the most teaching per question.
  if (count < 5) {
    const short: Slot[] = [
      { type: "sa", marks: 3 },
      { type: "vsa", marks: 2 },
      { type: "la", marks: 5 },
      { type: "mcq", marks: 1 },
    ];
    return short.slice(0, count);
  }

  // One of each first — a worksheet missing case-based questions entirely is
  // the exact gap students report in the real exam.
  for (const m of MIX) slots.push({ type: m.type, marks: m.marks });

  let left = count - slots.length;
  // Then fill by share, largest first, so rounding never starves a type.
  const byShare = [...MIX].sort((a, b) => b.share - a.share);
  let i = 0;
  while (left > 0) {
    const m = byShare[i % byShare.length];
    slots.push({ type: m.type, marks: m.marks });
    left--;
    i++;
  }

  // Order the paper the way CBSE prints it: objective first, longest last.
  const order: QuestionType[] = ["mcq", "vsa", "sa", "case", "la"];
  return slots.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
}

/* ------------------------------------------------------------------ *
 * Assembly
 * ------------------------------------------------------------------ */

export interface BuildResult {
  questions: SourcedQuestion[];
  /** Slots nothing could fill — what an AI pass would have to write. */
  gaps: Slot[];
  /** How many questions came from each tier, for the provenance summary. */
  tally: Record<SourceTier, number>;
}

/** How well does a candidate fit a slot? Higher is better; -1 is unusable. */
function fit(q: SourcedQuestion, slot: Slot): number {
  let score = 0;
  if (q.type === slot.type) score += 4;
  // A 3-mark question standing in for a 2-mark slot is fine; a 1-mark one
  // standing in for a 5-mark slot is not.
  const gap = Math.abs(q.marks - slot.marks);
  if (gap === 0) score += 3;
  else if (gap === 1) score += 1;
  else if (gap >= 3) return -1;
  return score;
}

/**
 * Fill the blueprint from the sourced pools, best source first.
 *
 * Nothing is ever used twice, and a slot that no real question fits is left as
 * a gap rather than padded with something that does not belong there. The
 * caller decides whether to have a model write the gaps — and if it does, they
 * come back tagged "AI-written", never dressed up as sourced.
 */
export function buildWorksheet(opts: {
  subjectId: string;
  classLevel: ClassLevel;
  chapterIds: string[];
  count: number;
  /** Restrict to printed NCERT exercises only. */
  ncertOnly?: boolean;
}): BuildResult {
  const slots = blueprint(opts.count);
  const ncert = ncertPool(opts.chapterIds).filter(
    (q) => q.subjectId === opts.subjectId && q.classLevel === opts.classLevel
  );
  const bank = opts.ncertOnly ? [] : bankPool(opts);

  const pools: Record<SourceTier, SourcedQuestion[]> = {
    "ncert-exercise": ncert,
    "ncert-exemplar": bank.filter((q) => q.provenance.tier === "ncert-exemplar"),
    "cbse-sqp": bank.filter((q) => q.provenance.tier === "cbse-sqp"),
    "cambridge-pastpaper": bank.filter((q) => q.provenance.tier === "cambridge-pastpaper"),
    "igcse-textbook": bank.filter((q) => q.provenance.tier === "igcse-textbook"),
    cengage: bank.filter((q) => q.provenance.tier === "cengage"),
    "hc-verma": bank.filter((q) => q.provenance.tier === "hc-verma"),
    arihant: bank.filter((q) => q.provenance.tier === "arihant"),
    "rd-sharma": bank.filter((q) => q.provenance.tier === "rd-sharma"),
    pyq: bank.filter((q) => q.provenance.tier === "pyq"),
    bank: bank.filter((q) => q.provenance.tier === "bank"),
    generated: [],
  };

  const used = new Set<string>();
  const questions: SourcedQuestion[] = [];
  const gaps: Slot[] = [];
  const tally: Record<SourceTier, number> = {
    "ncert-exercise": 0,
    "ncert-exemplar": 0,
    "cbse-sqp": 0,
    "cambridge-pastpaper": 0,
    "igcse-textbook": 0,
    cengage: 0,
    "hc-verma": 0,
    arihant: 0,
    "rd-sharma": 0,
    pyq: 0,
    bank: 0,
    generated: 0,
  };

  for (const slot of slots) {
    let best: { q: SourcedQuestion; score: number } | null = null;
    // Walk the tiers in authority order and stop at the first that can fill
    // this slot properly — a printed NCERT question beats a better-fitting
    // one from a weaker source, which is the whole point of the ordering.
    for (const tier of TIER_ORDER) {
      for (const q of pools[tier]) {
        if (used.has(q.id)) continue;
        const score = fit(q, slot);
        if (score < 0) continue;
        if (!best || score > best.score) best = { q, score };
      }
      // A good fit in this tier wins outright; a poor one keeps looking, so a
      // badly-matched NCERT question doesn't block a well-matched exemplar.
      if (best && best.score >= 5) break;
    }
    if (best) {
      used.add(best.q.id);
      questions.push(best.q);
      tally[best.q.provenance.tier]++;
    } else {
      gaps.push(slot);
    }
  }

  return { questions, gaps, tally };
}

/** A one-line summary of where a worksheet's questions came from. */
export function provenanceSummary(tally: Record<SourceTier, number>): string {
  const parts = TIER_ORDER.filter((t) => tally[t] > 0).map(
    (t) => `${tally[t]} ${TIER_LABEL[t].toLowerCase()}`
  );
  if (!parts.length) return "No sourced questions.";
  return parts.join(" · ");
}

/**
 * The prompt for filling the gaps a real source could not.
 *
 * It is told exactly which slots are missing and what the sourced questions
 * already cover, so it writes to the hole in the paper rather than another
 * variation on what is already there.
 */
export function buildGapPrompt(opts: {
  subjectName: string;
  classLevel: ClassLevel;
  chapterNames: string;
  topics: string[];
  gaps: Slot[];
  covered: string[];
}): string {
  return [
    `You are a CBSE examiner setting Class ${opts.classLevel} ${opts.subjectName} questions.`,
    `Chapter(s): ${opts.chapterNames}.`,
    "",
    `Write exactly ${opts.gaps.length} questions, one for each of these slots, in this order:`,
    ...opts.gaps.map(
      (g, i) => `  ${i + 1}. type "${g.type}", ${g.marks} mark${g.marks === 1 ? "" : "s"}`
    ),
    "",
    opts.covered.length
      ? `The worksheet ALREADY has these questions, taken from NCERT and past papers. Do not repeat them or write near-duplicates of them:\n${opts.covered.map((c) => `  - ${c}`).join("\n")}`
      : "",
    "",
    "RULES:",
    `- Stay inside the NCERT Class ${opts.classLevel} treatment of these chapters. Same definitions, same methods, same terminology.`,
    `- Spread them across these topics: ${opts.topics.join("; ")}.`,
    "- Write in the style of the printed exercises, but with your own numbers — never copy a question you have memorised.",
    "- Give a CONCISE CBSE marking-scheme answer (2 to 4 lines, key steps only) and the exact examiner keywords marks are awarded for.",
    "- Write all mathematics in LaTeX using $...$.",
    "- A case-based question gives a short real situation and then asks its parts.",
    "",
    "Return ONLY a JSON array, no prose and no code fences, in exactly this shape:",
    `[{"topic":"...","marks":3,"type":"sa","text":"...","answer":"...","keywords":["kw1","kw2"],"examinerTip":"..."}]`,
  ]
    .filter(Boolean)
    .join("\n");
}
