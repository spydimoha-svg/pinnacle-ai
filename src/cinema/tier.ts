// How much cinema can this device afford?
//
// The rendering tier is decided once, from what the device and the student
// actually tell us, and every visual layer reads it rather than guessing. The
// rule that governs all three tiers: THE STORY IS IDENTICAL AT EVERY TIER.
// Tier 0 is not a degraded product — it is the same journey with the motion
// removed, which is exactly what a student who asked for reduced motion wants
// and exactly what a student on a ₹8,000 phone needs.

export type Tier = 0 | 1 | 2;

export interface TierInfo {
  tier: Tier;
  /** Why this tier was chosen — surfaced in dev, never to a student. */
  reason: string;
  /** Ambient particle budget for this device. */
  particles: number;
  /** Whether ambient motion should run at all. */
  animate: boolean;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Detect the tier.
 *
 * Deliberately conservative: anything we cannot confirm is treated as the
 * cheaper option. A stutter costs more trust than a missing gradient buys.
 */
export function detectTier(): TierInfo {
  if (typeof window === "undefined") {
    return { tier: 0, reason: "no window", particles: 0, animate: false };
  }

  if (prefersReducedMotion()) {
    return {
      tier: 0,
      reason: "prefers-reduced-motion",
      particles: 0,
      animate: false,
    };
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
    connection?: { saveData?: boolean };
  };

  // Data Saver is an explicit request to spend less of the student's money.
  // Ambient decoration is the first thing that should go.
  if (nav.connection?.saveData) {
    return { tier: 0, reason: "save-data", particles: 0, animate: false };
  }

  const memory = nav.deviceMemory ?? 4;
  const cores = nav.hardwareConcurrency ?? 4;
  const narrow = window.innerWidth < 820;

  if (memory <= 2 || cores <= 2) {
    return {
      tier: 1,
      reason: `low-end device (${memory}GB, ${cores} cores)`,
      particles: 24,
      animate: true,
    };
  }

  if (narrow) {
    return { tier: 1, reason: "small viewport", particles: 34, animate: true };
  }

  return { tier: 2, reason: "full", particles: 70, animate: true };
}
