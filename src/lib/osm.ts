// On-Screen Marking (OSM) — the evaluation engine behind /admin/evaluate.
//
// Modelled on how CBSE's own OSM works: an evaluator opens a scanned answer
// script, reads it question by question against the marking scheme, ticks the
// value points that are present and awards marks per point. The total is a
// sum of ticks, not an impression.
//
// Two things mark here, and the split matters:
//
//   1. localMark()   — runs in the browser, instantly, free, offline. It can
//                      settle numeric and key-word answers on its own.
//   2. aiCheck()     — asks /api/evaluate (teachers only, server-side key) for
//                      a structured first pass on the answers judgement can't
//                      settle mechanically.
//
// Neither is the examiner. Every mark either produces is a SUGGESTION that a
// human teacher accepts or overrides before the sheet can be locked — which
// is also exactly how real OSM treats its assistive tooling.
import { supabase } from "./supabase";
import { gradeAnswer } from "./grade";
import type { ClassLevel, Question } from "./types";

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */

/** One value point in a marking scheme, and what it is worth. */
export interface ValuePoint {
  point: string;
  marks: number;
  /** Whether the evaluator (or the checker) found it in the answer. */
  found: boolean;
}

export type Confidence = "high" | "medium" | "low";
export type Likelihood = "low" | "medium" | "high";

/** What a checker — local or AI — proposes for one answer. */
export interface CheckResult {
  awarded: number;
  valuePoints: ValuePoint[];
  missed: string[];
  errors: string[];
  remark: string;
  confidence: Confidence;
  aiWritten: { likelihood: Likelihood; why: string };
  /** Which checker produced this. */
  source: "local" | "ai";
}

/** One question on the script, its scheme, the answer, and the marks. */
export interface ScriptItem {
  id: string;
  /** Question number as printed on the paper ("Q7 (b)"). */
  number: string;
  question: string;
  /** The marking scheme's expected answer. */
  scheme: string;
  keywords: string[];
  maxMarks: number;
  /** The student's answer, transcribed or typed. */
  answer: string;
  /** Marks the TEACHER awarded. null until they decide. */
  awarded: number | null;
  /** The evaluator's own margin remark. */
  remark: string;
  /** Value points the evaluator has ticked. */
  valuePoints: ValuePoint[];
  /** The last first-pass suggestion, kept beside the teacher's decision. */
  check: CheckResult | null;
  /** Set when the teacher has signed off on this answer. */
  settled: boolean;
}

/** A whole answer script being evaluated. */
export interface Script {
  id: string;
  /** Anonymous roll/booklet number — OSM never shows the candidate's name. */
  bookletNo: string;
  classLevel: ClassLevel;
  subjectId: string;
  paperTitle: string;
  /** Object URLs / data URLs of scanned pages, in order. */
  pages: string[];
  items: ScriptItem[];
  createdAt: string;
  /** Once locked the marks are final and the sheet is read-only. */
  lockedAt?: string;
  /** Name of the teacher who signed it off. */
  evaluator?: string;
  schoolId?: string;
}

/* ------------------------------------------------------------------ *
 * Building a script
 * ------------------------------------------------------------------ */

let seq = 0;
const uid = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${(seq++).toString(36)}`;

/** Turn a bank question into a blank, unmarked script item. */
export function itemFromQuestion(q: Question, number: string): ScriptItem {
  return {
    id: uid("it"),
    number,
    question: q.text,
    scheme: q.answer,
    keywords: [...q.keywords],
    maxMarks: q.marks,
    answer: "",
    awarded: null,
    remark: "",
    valuePoints: schemeToValuePoints(q.answer, q.keywords, q.marks),
    check: null,
    settled: false,
  };
}

/** A blank item for a question the teacher types in themselves. */
export function blankItem(number: string, maxMarks = 3): ScriptItem {
  return {
    id: uid("it"),
    number,
    question: "",
    scheme: "",
    keywords: [],
    maxMarks,
    answer: "",
    awarded: null,
    remark: "",
    valuePoints: [],
    check: null,
    settled: false,
  };
}

export function newScript(opts: {
  bookletNo: string;
  classLevel: ClassLevel;
  subjectId: string;
  paperTitle: string;
  schoolId?: string;
}): Script {
  return {
    id: uid("scr"),
    bookletNo: opts.bookletNo,
    classLevel: opts.classLevel,
    subjectId: opts.subjectId,
    paperTitle: opts.paperTitle,
    pages: [],
    items: [],
    createdAt: new Date().toISOString(),
    schoolId: opts.schoolId,
  };
}

/**
 * Split a marking scheme into the value points marks are awarded against.
 *
 * A CBSE scheme is written as a list of creditable points, each carrying a
 * fraction of the total. The bank stores that as prose plus a keyword list,
 * so this reconstructs the list: keywords first (they ARE the examiner's
 * value points — that is what the field is for), falling back to splitting
 * the model answer into its steps when a question has no keywords.
 */
export function schemeToValuePoints(
  scheme: string,
  keywords: string[],
  maxMarks: number
): ValuePoint[] {
  const points = keywords.length
    ? keywords
    : scheme
        // Numbered or bulleted steps, then sentences, then nothing.
        .split(/\n+|(?<=\.)\s+(?=[A-Z(])/)
        .map((s) => s.replace(/^\s*(?:\d+[.)]|[-*•])\s*/, "").trim())
        .filter((s) => s.length > 3)
        .slice(0, Math.max(2, maxMarks * 2));

  if (points.length === 0) return [];
  // Distribute the marks evenly, then push the rounding remainder onto the
  // first point so the parts always sum exactly to the maximum.
  const each = Math.round((maxMarks / points.length) * 2) / 2;
  const vps = points.map((point) => ({ point, marks: each, found: false }));
  const drift = maxMarks - each * points.length;
  if (drift !== 0) vps[0].marks = Math.max(0, vps[0].marks + drift);
  return vps;
}

/* ------------------------------------------------------------------ *
 * The local (offline) marker
 * ------------------------------------------------------------------ */

const stop = new Set([
  "the", "and", "for", "with", "that", "this", "have", "has", "are", "is",
  "it", "its", "a", "an", "of", "to", "in", "on", "so", "because", "since",
  "we", "you", "your", "not", "no", "yes", "be", "as", "at", "by", "or",
  "then", "than", "when", "which", "what", "why", "how", "here", "there",
]);

function words(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !stop.has(w))
  );
}

/**
 * Is this value point present in the answer?
 *
 * A keyword is usually a short phrase ("chlorophyll", "sum of roots = -b/a").
 * It counts as found when the substantive words of the phrase appear — not
 * as an exact string match, because a student who writes the same idea in a
 * different order has earned the mark and an exact match would rob them.
 */
function pointFound(point: string, answer: string): boolean {
  const a = answer.toLowerCase();
  if (a.includes(point.toLowerCase().trim())) return true;
  const need = [...words(point)];
  if (need.length === 0) return false;
  const have = words(answer);
  const hit = need.filter((w) => have.has(w)).length;
  // Every word of a one- or two-word point must be there; longer phrases pass
  // on two thirds, since a student rarely reproduces a whole phrase verbatim.
  return need.length <= 2 ? hit === need.length : hit / need.length >= 0.66;
}

/**
 * Mark one answer without the network.
 *
 * Confident on numeric answers (gradeAnswer settles those exactly) and on
 * answers whose value points are literally present. Reports "low" confidence
 * — and the teacher sees that — wherever the judgement is really a human's.
 */
export function localMark(item: ScriptItem): CheckResult {
  const answer = item.answer.trim();
  if (!answer) {
    return {
      awarded: 0,
      valuePoints: item.valuePoints.map((v) => ({ ...v, found: false })),
      missed: item.valuePoints.map((v) => v.point),
      errors: [],
      remark: "No answer written.",
      confidence: "high",
      aiWritten: { likelihood: "low", why: "" },
      source: "local",
    };
  }

  const vps = item.valuePoints.map((v) => ({
    ...v,
    found: pointFound(v.point, answer),
  }));
  const fromPoints = vps
    .filter((v) => v.found)
    .reduce((n, v) => n + v.marks, 0);

  // The mechanical grader is the authority on numeric answers — it compares
  // the values themselves rather than the words around them.
  const mech = item.scheme
    ? gradeAnswer(item.question, item.scheme, answer)
    : { mark: "unsure" as const, why: "no scheme supplied" };

  let awarded = Math.round(Math.min(item.maxMarks, fromPoints) * 2) / 2;
  let confidence: Confidence = "low";
  let remark = "";

  if (mech.mark === "correct") {
    awarded = item.maxMarks;
    confidence = "high";
    remark = `Correct — ${mech.why}.`;
  } else if (mech.mark === "wrong") {
    // Wrong final answer still earns step marks for the points that ARE there,
    // capped below full: a wrong result cannot be a full-mark answer.
    awarded = Math.min(awarded, Math.max(0, item.maxMarks - 1));
    confidence = vps.length ? "medium" : "high";
    remark = `${mech.why.charAt(0).toUpperCase()}${mech.why.slice(1)}.`;
  } else if (vps.length) {
    const hit = vps.filter((v) => v.found).length;
    confidence = hit === vps.length || hit === 0 ? "medium" : "low";
    remark =
      hit === 0
        ? "None of the scheme's value points appear — check by eye."
        : `${hit} of ${vps.length} value points found.`;
  } else {
    remark = "Nothing to mark against mechanically — needs your eye.";
  }

  return {
    awarded,
    valuePoints: vps,
    missed: vps.filter((v) => !v.found).map((v) => v.point),
    errors: [],
    remark,
    confidence,
    aiWritten: localAiSignal(answer),
    source: "local",
  };
}

/**
 * A crude, honest AI-authorship signal for when the model isn't reachable.
 *
 * It looks for the two things that actually separate pasted machine prose
 * from a handwritten exam answer: connective scaffolding no student writes
 * under time pressure, and a suspiciously even sentence rhythm. It says so
 * quietly — the console renders this as "worth a look", never a verdict.
 */
function localAiSignal(answer: string): { likelihood: Likelihood; why: string } {
  // Short answers carry no signal at all. Most CBSE answers are short, so
  // this is the common case and it must not produce noise.
  if (answer.length < 400) return { likelihood: "low", why: "" };

  const sentences = answer
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);
  if (sentences.length < 4) return { likelihood: "low", why: "" };

  const tells = [
    /\b(?:furthermore|moreover|in conclusion|it is important to note|overall|additionally|delve into|multifaceted)\b/gi,
    /\b(?:plays a (?:crucial|vital|significant) role|a wide range of|it is worth noting)\b/gi,
  ];
  const phrases = tells.reduce(
    (n, re) => n + (answer.match(re)?.length ?? 0),
    0
  );

  const lengths = sentences.map((s) => s.length);
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const sd = Math.sqrt(
    lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / lengths.length
  );
  // Human writing varies; a coefficient of variation under ~0.25 across many
  // sentences is unusually metronomic.
  const even = sd / mean < 0.25 && sentences.length >= 6;

  if (phrases >= 3 && even) {
    return {
      likelihood: "high",
      why: "connective phrasing plus an unusually even sentence rhythm",
    };
  }
  if (phrases >= 2 || even) {
    return {
      likelihood: "medium",
      why: phrases >= 2 ? "essay connectives uncommon in exam answers" : "unusually even sentence rhythm",
    };
  }
  return { likelihood: "low", why: "" };
}

/* ------------------------------------------------------------------ *
 * The AI checker
 * ------------------------------------------------------------------ */

export class CheckerUnavailable extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
    this.name = "CheckerUnavailable";
  }
}

/**
 * Ask the server-side checker for a first pass on one answer.
 *
 * Sends the teacher's Supabase session token; /api/evaluate rejects anyone
 * whose app_metadata.role isn't "admin", so this is teacher-only end to end
 * rather than only in the routing. Throws CheckerUnavailable when the service
 * is off or over quota, and the console falls back to localMark().
 */
export async function aiCheck(
  item: ScriptItem,
  context: string,
  signal?: AbortSignal
): Promise<CheckResult> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (supabase) {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      headers.Authorization = `Bearer ${data.session.access_token}`;
    }
  }

  let res: Response;
  try {
    res = await fetch("/api/evaluate", {
      method: "POST",
      headers,
      body: JSON.stringify({
        question: item.question,
        scheme: item.scheme,
        keywords: item.keywords,
        maxMarks: item.maxMarks,
        studentAnswer: item.answer,
        context,
      }),
      signal,
    });
  } catch {
    throw new CheckerUnavailable(0, "Could not reach the checker.");
  }

  if (!res.ok) {
    const message =
      res.status === 403
        ? "The checker refused this session — sign in again as a teacher."
        : res.status === 429
          ? "The free checker is at its per-minute limit. Wait a moment."
          : res.status === 503
            ? "The AI checker isn't configured — marking locally instead."
            : "The checker could not evaluate this answer.";
    throw new CheckerUnavailable(res.status, message);
  }

  const data = (await res.json()) as Omit<CheckResult, "source">;

  // The server clamps `awarded`, but the value points come back as the model
  // worded them; re-anchor them onto the scheme's own points where they match
  // so the evaluator's tick list stays the scheme's list, not the model's.
  const valuePoints: ValuePoint[] = item.valuePoints.length
    ? item.valuePoints.map((v) => {
        const hit = data.valuePoints?.find(
          (p) => p.point && pointFound(p.point, v.point)
        );
        return { ...v, found: hit ? hit.found : false };
      })
    : (data.valuePoints ?? []);

  return { ...data, valuePoints, source: "ai" };
}

/* ------------------------------------------------------------------ *
 * Totals
 * ------------------------------------------------------------------ */

export function scriptTotals(script: Script) {
  const max = script.items.reduce((n, i) => n + i.maxMarks, 0);
  const awarded = script.items.reduce((n, i) => n + (i.awarded ?? 0), 0);
  const settled = script.items.filter((i) => i.settled).length;
  const flagged = script.items.filter(
    (i) => i.check?.aiWritten.likelihood === "high"
  ).length;
  return {
    max,
    awarded,
    settled,
    total: script.items.length,
    flagged,
    percent: max ? Math.round((awarded / max) * 100) : 0,
    complete: script.items.length > 0 && settled === script.items.length,
  };
}

/** CBSE-style grade band for the award sheet. */
export function gradeBand(percent: number): string {
  if (percent >= 91) return "A1";
  if (percent >= 81) return "A2";
  if (percent >= 71) return "B1";
  if (percent >= 61) return "B2";
  if (percent >= 51) return "C1";
  if (percent >= 41) return "C2";
  if (percent >= 33) return "D";
  return "E — needs improvement";
}
