/**
 * The master timeline.
 *
 * The brief's central rule is "scroll is the master animation timeline" and
 * "avoid page-like sections". So the whole experience is ONE normalised 0..1
 * progress value, and a chapter is nothing more than a named window inside it.
 *
 * Everything downstream reads local progress (0..1 within its own window)
 * rather than raw scroll, which is what lets a chapter be retimed by editing
 * one number here instead of touching its animation code.
 */

export const CHAPTER_IDS = [
  "book",
  "activation",
  "release",
  "about",
  "dna",
  "intelligence",
  "brain",
  "finale",
] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];

export type Chapter = {
  id: ChapterId;
  /** Window inside the master 0..1 timeline. */
  start: number;
  end: number;
  /** Scroll length this chapter occupies, in viewport heights. */
  vh: number;
  title: string;
  /** Whether this chapter needs the WebGL canvas mounted. */
  webgl: boolean;
};

/**
 * Windows are derived from `vh` rather than hand-written, so retiming a
 * chapter is a single number change and the rest stays consistent. Total
 * scroll length is the sum, currently 1150vh.
 */
const PLAN: Array<Omit<Chapter, "start" | "end">> = [
  { id: "book", vh: 130, title: "The Book", webgl: true },
  { id: "activation", vh: 120, title: "Activation", webgl: true },
  { id: "release", vh: 170, title: "Knowledge Escapes", webgl: true },
  { id: "about", vh: 200, title: "About Pinnacle AI", webgl: true },
  { id: "dna", vh: 150, title: "DNA", webgl: true },
  { id: "intelligence", vh: 160, title: "Living Intelligence", webgl: true },
  { id: "brain", vh: 130, title: "Neural Brain", webgl: true },
  { id: "finale", vh: 90, title: "Finale", webgl: true },
];

export const TOTAL_VH = PLAN.reduce((sum, c) => sum + c.vh, 0);

export const CHAPTERS: Chapter[] = (() => {
  let acc = 0;
  return PLAN.map((c) => {
    const start = acc / TOTAL_VH;
    acc += c.vh;
    return { ...c, start, end: acc / TOTAL_VH };
  });
})();

export const CHAPTER_BY_ID = Object.fromEntries(
  CHAPTERS.map((c) => [c.id, c])
) as Record<ChapterId, Chapter>;

/** Master progress -> 0..1 inside a chapter, clamped at both ends. */
export function localProgress(master: number, id: ChapterId): number {
  const c = CHAPTER_BY_ID[id];
  if (master <= c.start) return 0;
  if (master >= c.end) return 1;
  return (master - c.start) / (c.end - c.start);
}

/** True while the chapter is on screen, with a lead-in so it can prepare. */
export function isChapterLive(master: number, id: ChapterId, lead = 0.04): boolean {
  const c = CHAPTER_BY_ID[id];
  return master >= c.start - lead && master <= c.end + lead;
}

export function chapterAt(master: number): Chapter {
  for (const c of CHAPTERS) if (master < c.end) return c;
  return CHAPTERS[CHAPTERS.length - 1];
}

/* ── Motion tokens ────────────────────────────────────────────────────────
   The brief specifies cubic-bezier(.22,1,.36,1) as the default easing and
   demands physically believable motion. Centralised so a chapter never
   hand-rolls a curve. */
export const EASE = {
  /** The brief's default. Fast out, long settle. */
  default: [0.22, 1, 0.36, 1] as const,
  /** GSAP string form of the same feel. */
  gsap: "power4.out",
  /** For weight and impact — the book landing. */
  impact: "power3.in",
  /** Camera moves: never linear, never bouncy. */
  camera: "power2.inOut",
} as const;

export const DURATION = {
  micro: 0.18,
  ui: 0.42,
  scene: 0.9,
  cinematic: 1.6,
} as const;

/** Master scroll spring. Tuned overdamped so the story never overshoots. */
export const SCROLL_SPRING = {
  stiffness: 190,
  damping: 34,
  restDelta: 0.0005,
} as const;
