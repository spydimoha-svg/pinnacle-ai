import type {
  Chapter,
  ChapterProgress,
  ProgressStatus,
  StudentMemory,
  Subject,
} from "./types";

// Pinnacle's mastery model. It never invents a score — it reads the real
// signals already in the student's memory (status, self-confidence, and how
// long ago the chapter was studied) and turns them into one honest number,
// then uses those numbers to decide what the student should climb next.

const STATUS_BASE: Record<ProgressStatus, number> = {
  "not-started": 0,
  learning: 35,
  revising: 65,
  mastered: 92,
};

// After this many days without study, a chapter is "due" and its score decays
// (spaced repetition — even a mastered chapter fades if never revisited).
const STALE_AFTER: Record<ProgressStatus, number> = {
  "not-started": Infinity,
  learning: 6,
  revising: 12,
  mastered: 24,
};

export interface MasteryInfo {
  score: number; // 0..100
  status: ProgressStatus;
  stale: boolean;
  daysSince: number | null;
}

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function daysSince(iso?: string): number | null {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return Math.max(0, Math.floor((Date.now() - d.getTime()) / 86_400_000));
}

export function chapterMastery(p?: ChapterProgress): MasteryInfo {
  if (!p || p.status === "not-started") {
    return {
      score: p?.confidence ?? 0,
      status: "not-started",
      stale: false,
      daysSince: daysSince(p?.lastStudied),
    };
  }
  const base = STATUS_BASE[p.status];
  let score = Math.round(base * 0.55 + (p.confidence ?? base) * 0.45);

  const ds = daysSince(p.lastStudied);
  let stale = false;
  if (ds != null && ds > STALE_AFTER[p.status]) {
    stale = true;
    const over = ds - STALE_AFTER[p.status];
    const factor = Math.max(0.5, 1 - over / (STALE_AFTER[p.status] * 3));
    score = Math.max(STATUS_BASE.learning, Math.round(score * factor));
  }
  return { score: clamp(score), status: p.status, stale, daysSince: ds };
}

/** Board marks a chapter typically carries, parsed from its weightage note. */
export function weightageMarks(ch: Chapter): number {
  const w = (ch.weightage ?? "").toLowerCase();
  if (!w) return 4;
  // Chapters CBSE routes to project / internal assessment carry ~no theory marks,
  // so they shouldn't dominate board revision priority.
  if (/project|internal|not in the|not examined/.test(w)) return 2;
  // Prefer a number that is actually "N marks", and ignore paper totals (e.g.
  // "not in the 80-mark theory paper") by capping anything unrealistically big.
  const m = w.match(/(\d+)\s*-?\s*mark/) ?? w.match(/(\d+)/);
  if (!m) return 4;
  const n = parseInt(m[1], 10);
  return n >= 40 ? 4 : n;
}

/** Weightage-weighted average mastery across a subject's chapters. */
export function subjectMastery(subject: Subject, memory: StudentMemory): number {
  let sSum = 0;
  let wSum = 0;
  for (const ch of subject.chapters) {
    const w = weightageMarks(ch);
    sSum += chapterMastery(memory.progress[ch.id]).score * w;
    wSum += w;
  }
  return wSum ? Math.round(sSum / wSum) : 0;
}

export function overallMastery(subjects: Subject[], memory: StudentMemory): number {
  let sSum = 0;
  let wSum = 0;
  for (const s of subjects) {
    for (const ch of s.chapters) {
      const w = weightageMarks(ch);
      sSum += chapterMastery(memory.progress[ch.id]).score * w;
      wSum += w;
    }
  }
  return wSum ? Math.round(sSum / wSum) : 0;
}

export type MasteryBand = "untouched" | "shaky" | "building" | "strong";

export function masteryBand(mi: MasteryInfo): MasteryBand {
  if (mi.status === "not-started") return "untouched";
  if (mi.score < 55) return "shaky";
  if (mi.score < 85) return "building";
  return "strong";
}

/** Tailwind colour token for a band — matches the app palette. */
export const BAND_COLOR: Record<MasteryBand, string> = {
  untouched: "dim",
  shaky: "coral",
  building: "sky",
  strong: "mint",
};

// ————— The planner —————

export type PlanAction = "learn" | "practice" | "revise";

export interface PlanItem {
  subject: Subject;
  chapter: Chapter;
  mastery: MasteryInfo;
  action: PlanAction;
  reason: string;
  priority: number;
}

export const ACTION_META: Record<
  PlanAction,
  { verb: string; label: string; to: string }
> = {
  learn: { verb: "Learn", label: "Learn it with the tutor", to: "/app/tutor" },
  practice: { verb: "Practise", label: "Practise questions", to: "/app/worksheets" },
  revise: { verb: "Revise", label: "Quick revision", to: "/app/tutor" },
};

function matchesFocus(focus: string, ch: Chapter, s: Subject): boolean {
  const f = focus.trim().toLowerCase();
  if (!f) return false;
  return (
    ch.title.toLowerCase().includes(f) ||
    s.name.toLowerCase().includes(f) ||
    (ch.keyTopics ?? []).some((k) => k.toLowerCase().includes(f))
  );
}

/**
 * Rank every chapter by "what moves the marks most, soonest": weightage times
 * the mastery gap, boosted for revision-due and flagged focus areas. Chapters
 * that are already strong and fresh drop off the list. Returns the top `limit`.
 */
export function buildPlan(
  subjects: Subject[],
  memory: StudentMemory,
  limit = 6
): PlanItem[] {
  const items: PlanItem[] = [];

  for (const subject of subjects) {
    for (const chapter of subject.chapters) {
      const mi = chapterMastery(memory.progress[chapter.id]);
      const w = weightageMarks(chapter);
      const gap = 1 - mi.score / 100;
      let priority = w * gap;
      let action: PlanAction;
      let reason: string;

      if (mi.status === "not-started") {
        action = "learn";
        reason = `Not started · about ${w} marks in boards`;
        priority += w * 0.15;
      } else if (mi.stale) {
        action = "revise";
        reason = `Revision due · last studied ${mi.daysSince} day${mi.daysSince === 1 ? "" : "s"} ago`;
        priority += w * 0.5;
      } else if (mi.score < 60) {
        action = "practice";
        reason = `Still shaky at ${mi.score}% · high weightage`;
      } else if (mi.score < 85) {
        action = "practice";
        reason = `Almost there at ${mi.score}% · lock it in`;
        priority *= 0.7;
      } else {
        continue; // strong and fresh — nothing to do right now
      }

      if (memory.focusAreas.some((f) => matchesFocus(f, chapter, subject))) {
        priority += 5;
        reason = `You flagged this · ${reason}`;
      }

      items.push({ subject, chapter, mastery: mi, action, reason, priority });
    }
  }

  items.sort((a, b) => b.priority - a.priority);
  return items.slice(0, limit);
}

// ————— The quick-check diagnostic —————

export interface ConfidenceLevel {
  key: string;
  label: string;
  status: ProgressStatus;
  confidence: number;
  color: string; // palette token
}

export const CONFIDENCE_LEVELS: ConfidenceLevel[] = [
  { key: "none", label: "Not yet", status: "not-started", confidence: 5, color: "dim" },
  { key: "shaky", label: "Shaky", status: "learning", confidence: 30, color: "coral" },
  { key: "getting", label: "Getting it", status: "revising", confidence: 65, color: "sky" },
  { key: "solid", label: "Solid", status: "mastered", confidence: 92, color: "mint" },
];

/** Which confidence button is currently reflected by a chapter's progress. */
export function currentLevelKey(p?: ChapterProgress): string | null {
  if (!p) return null;
  const byStatus = CONFIDENCE_LEVELS.find((l) => l.status === p.status);
  return byStatus?.key ?? null;
}
