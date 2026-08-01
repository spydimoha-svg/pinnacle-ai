import { Suspense, lazy, useEffect, useState } from "react";
import type { MotionValue } from "motion/react";
import type { ChapterId } from "./lib/chapters";
import type { Tier } from "./lib/useExperience";

/**
 * The WebGL stage, code-split away from the initial bundle.
 *
 * three + R3F + drei is roughly 230kB gzipped. Shipping that in the entry
 * chunk would tax every visitor — including the ones who bounce in two
 * seconds and the ones on a phone who will never see the high-tier scenes.
 * So it loads only once the experience is actually mounted and the device has
 * been judged capable, and it never blocks first paint.
 */
const SceneRoot = lazy(() =>
  import("./scenes/SceneRoot").then((m) => ({ default: m.SceneRoot }))
);

export type StageProps = {
  master: MotionValue<number>;
  active: ChapterId;
  tier: Tier;
  reduced: boolean;
};

export function Stage(props: StageProps) {
  const { tier, reduced } = props;

  // Never mount WebGL for a reduced-motion user: the brief asks for a
  // simplified path, and the honest simplification of a 3D narrative is not
  // "the same scene, slower" — it is static art plus real content.
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (reduced) return;

    // Confirm the machine can actually give us a context before we import
    // ~230kB of renderer. A failed getContext after loading is a wasted
    // download and a blank rectangle.
    let ok = false;
    try {
      const probe = document.createElement("canvas");
      ok = !!(
        probe.getContext("webgl2") ||
        probe.getContext("webgl") ||
        probe.getContext("experimental-webgl")
      );
    } catch {
      ok = false;
    }
    if (!ok) return;

    // Defer past first paint so the hero text is interactive before the
    // renderer competes for the main thread.
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setAllowed(true), { timeout: 1200 })
      : window.setTimeout(() => setAllowed(true), 320);

    return () => {
      if (window.cancelIdleCallback && typeof id === "number") {
        window.cancelIdleCallback(id);
      } else {
        clearTimeout(id as number);
      }
    };
  }, [reduced]);

  if (!allowed) return <StageFallback tier={tier} />;

  return (
    <Suspense fallback={<StageFallback tier={tier} />}>
      <SceneRoot {...props} />
    </Suspense>
  );
}

/**
 * What stands in for the canvas: while it loads, when WebGL is unavailable,
 * and permanently under reduced motion. Not a spinner — a still frame of the
 * same world, so the page never looks broken or empty.
 */
function StageFallback({ tier }: { tier: Tier }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      data-stage-fallback={tier}
    >
      <div className="pnz-stage-still" />
    </div>
  );
}
