import { useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, useMotionValueEvent } from "motion/react";
import type { MotionValue } from "motion/react";
import { CHAPTERS, SCROLL_SPRING, localProgress, type ChapterId } from "./chapters";

/**
 * Reads the OS reduced-motion preference and keeps tracking it.
 * The brief requires a genuinely simplified path, not a disabled one, so every
 * chapter branches on this rather than being switched off.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Device capability tiers. The brief demands 60fps on mainstream hardware and
 * a readable mobile experience, which means the same scene has to render at
 * three different costs rather than being cut entirely.
 *
 * Deliberately conservative: this decides particle counts and postprocessing,
 * and guessing high on a weak machine is far worse than guessing low on a
 * strong one.
 */
export type Tier = "low" | "mid" | "high";

export function useDeviceTier(): Tier {
  return useMemo<Tier>(() => {
    if (typeof window === "undefined") return "mid";

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    // deviceMemory is Chromium-only; absent elsewhere, so it can only downgrade.
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const narrow = window.innerWidth < 820;

    if (coarse || narrow) return cores >= 8 && (mem ?? 4) >= 6 ? "mid" : "low";
    if (cores <= 4 || (mem !== undefined && mem <= 4)) return "low";
    if (cores >= 8 && (mem ?? 8) >= 8) return "high";
    return "mid";
  }, []);
}

export type ExperienceScroll = {
  /** Raw 0..1 across the whole narrative. */
  raw: MotionValue<number>;
  /** Spring-smoothed master progress. Everything visual reads this. */
  master: MotionValue<number>;
  /** Current chapter id, as React state (changes ~8 times, so state is fine). */
  active: ChapterId;
  /** 1 when scrolling down, -1 up. A ref: it updates every frame. */
  direction: React.RefObject<1 | -1>;
};

/**
 * The single scroll source for the whole experience.
 *
 * Only ONE useScroll exists in the app. Every chapter derives from the spring
 * output, so the entire narrative shares one clock and cannot drift apart —
 * the same reason Lenis is pinned to gsap.ticker in lib/smoothScroll.ts.
 */
export function useExperienceScroll(
  ref: React.RefObject<HTMLElement | null>
): ExperienceScroll {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const master = useSpring(scrollYProgress, SCROLL_SPRING);

  const [active, setActive] = useState<ChapterId>("book");
  const activeRef = useRef<ChapterId>("book");
  const direction = useRef<1 | -1>(1);
  const last = useRef(0);

  useMotionValueEvent(master, "change", (v) => {
    direction.current = v >= last.current ? 1 : -1;
    last.current = v;

    // Only push a state update when the chapter genuinely changes. Setting it
    // per frame would re-render the whole tree ~60x a second for a value that
    // changes eight times in the entire experience.
    let next: ChapterId = CHAPTERS[CHAPTERS.length - 1].id;
    for (const c of CHAPTERS) {
      if (v < c.end) {
        next = c.id;
        break;
      }
    }
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  });

  return { raw: scrollYProgress, master, active, direction };
}

/** A chapter's own 0..1 progress, derived from master. */
export function useChapterProgress(
  master: MotionValue<number>,
  id: ChapterId
): MotionValue<number> {
  return useTransform(master, (v) => localProgress(v, id));
}
