import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { Stage } from "./Stage";
import { TOTAL_VH, localProgress } from "./lib/chapters";
import {
  useExperienceScroll,
  useDeviceTier,
  useReducedMotion,
} from "./lib/useExperience";
import { emitOnce } from "./lib/events";
import { useSmoothScroll } from "../lib/smoothScroll";

/**
 * The cinematic narrative.
 *
 * One tall scroll container drives everything. The WebGL stage is fixed and
 * fills the viewport; the DOM copy sits above it in normal flow so it stays
 * selectable, translatable and reachable by a screen reader — the story is
 * 3D but the *content* is still HTML, which is what keeps this accessible.
 */
export default function Experience() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { master, active } = useExperienceScroll(scrollRef);
  const tier = useDeviceTier();
  const reduced = useReducedMotion();

  useSmoothScroll(!reduced);

  // The brief opens on a click that begins the journey. Until then the book
  // floats and the page does not scroll away under the visitor.
  const [begun, setBegun] = useState(false);

  useEffect(() => {
    if (!begun) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [begun]);

  const begin = () => {
    if (begun) return;
    setBegun(true);
    emitOnce("BOOK_OPEN", { progress: 0 });
    // Nudge into chapter 2 so the fall reads as a consequence of the click.
    requestAnimationFrame(() => {
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
    });
  };

  // Chapter copy fades are derived, never stateful.
  const introOpacity = useTransform(master, [0, 0.06], [1, 0]);
  const aboutOpacity = useTransform(master, [0.34, 0.42, 0.56, 0.63], [0, 1, 1, 0]);
  const finaleOpacity = useTransform(master, [0.9, 0.96], [0, 1]);

  return (
    <div className="pnz-experience bg-[#050505] text-cream">
      {/* Fixed stage. aria-hidden: it is atmosphere, the DOM below carries meaning. */}
      <div className="fixed inset-0 z-0" aria-hidden>
        <Stage master={master} active={active} tier={tier} reduced={reduced} />
      </div>

      {/* Scroll driver. Its height IS the timeline. */}
      <div ref={scrollRef} style={{ height: `${TOTAL_VH}vh` }} className="relative z-10">
        {/* ── Chapter 1: the invitation ── */}
        {/* The book owns the centre of the frame, so the copy is anchored to
            the lower third and the type is kept modest. Earlier this was
            centred and the headline printed straight across the cover. */}
        <motion.section
          style={{ opacity: introOpacity }}
          className="sticky top-0 h-screen flex flex-col items-center justify-end text-center px-6 pb-[8vh] pointer-events-none"
        >
          <p className="eyebrow mb-4">Pinnacle AI</p>
          <h1 className="font-display font-bold leading-[1.02] tracking-[-0.02em] text-[clamp(1.6rem,3.4vw,2.6rem)] max-w-2xl">
            Knowledge that evolves with you.
          </h1>
          <button
            type="button"
            onClick={begin}
            className="pnz-begin pointer-events-auto mt-8"
          >
            <span>Open the book</span>
          </button>
          <p className="text-dim text-xs mt-5 font-mono tracking-widest uppercase">
            {begun ? "Scroll to continue" : "Click to begin"}
          </p>
        </motion.section>

        {/* ── Chapter 4: About, assembled from the released knowledge ── */}
        <motion.section
          style={{ opacity: aboutOpacity }}
          className="sticky top-0 h-screen flex items-center justify-center px-6"
        >
          <div className="max-w-3xl text-center">
            <p className="eyebrow mb-4">About Pinnacle AI</p>
            <h2 className="font-display font-bold text-[clamp(1.9rem,4.6vw,3.4rem)] leading-tight mb-6">
              It doesn&rsquo;t memorise. It reads.
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              Every answer starts by pulling the exact chapter and exercise from a
              real library — NCERT, exemplars, the question bank — and teaching
              from that, not from a foggy memory. That is why it lands the real
              Exercise 2.2, not a made-up one.
            </p>
          </div>
        </motion.section>

        {/* ── Chapter 8: finale ── */}
        <motion.section
          style={{ opacity: finaleOpacity }}
          className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <h2 className="font-display font-bold text-[clamp(2rem,6vw,4.5rem)] leading-[1.02] max-w-3xl">
            Knowledge isn&rsquo;t stored.
            <br />
            <span className="pnz-gold">It evolves.</span>
          </h2>
          <a href="/login" className="btn-gold text-base !px-8 !py-4 mt-10 pnz-glow">
            Begin learning
          </a>
        </motion.section>
      </div>

      {/* Chapter readout — orients the visitor inside a long narrative. */}
      <ChapterIndicator master={master} />
    </div>
  );
}

function ChapterIndicator({ master }: { master: MotionValue<number> }) {
  const width = useTransform(master, (v: number) => `${Math.round(v * 100)}%`);
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-20 h-[2px] bg-white/5"
      aria-hidden
    >
      <motion.div className="h-full bg-gold/70" style={{ width }} />
    </div>
  );
}

export { localProgress };
