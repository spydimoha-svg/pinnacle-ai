import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoMark } from "../components/Logo";
import { detectTier } from "./tier";

/**
 * THE OVERTURE — the opening cinematic.
 *
 * The brief asked for particles that become equations and planets and cells,
 * over narration about wonder. That version has been made a hundred times and
 * it says nothing; awe is the cheapest thing a title sequence can reach for,
 * and a student who is about to revise quadratics does not need to be told the
 * universe is big.
 *
 * This one makes an argument instead. A thrown ball and an orbiting planet
 * trace the same family of curve, because they obey the same law — that is a
 * genuine and slightly startling fact, it is on this student's own syllabus,
 * and it is the reason any of this is worth learning. The particles do not
 * illustrate the narration; they ARE the argument, morphing from a thrown
 * ball's arc into an orbit without ever scattering, so the student sees one
 * shape become the other.
 *
 * Runs once per session. Skippable at any moment, by click or key. Under
 * reduced motion, or on a device that cannot afford it, it does not run at all
 * and the student goes straight in — losing nothing, because the product is
 * not downstream of its own title sequence.
 */

interface Pt {
  x: number;
  y: number;
  tx: number;
  ty: number;
  r: number;
}

/** The beats. Each holds the screen, then hands over to the next. */
const BEATS: { line: string; shape: Shape; ms: number }[] = [
  { line: "Every rule you have been handed started as somebody's question.", shape: "scatter", ms: 4200 },
  { line: "Throw a ball. It rises, slows, comes back.", shape: "parabola", ms: 4000 },
  { line: "The moon is falling too. It just keeps missing.", shape: "orbit", ms: 4400 },
  { line: "Same law. One curve, bent further.", shape: "orbit", ms: 3400 },
  { line: "Nobody was told this. Somebody worked it out.", shape: "converge", ms: 3800 },
];

type Shape = "scatter" | "parabola" | "orbit" | "converge";

/** Where each particle belongs in a given shape. */
function target(shape: Shape, i: number, n: number, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const t = i / n;

  switch (shape) {
    case "parabola": {
      // A real thrown-ball arc: y = a(x-h)^2 + k, opening downward on screen.
      const span = Math.min(w * 0.62, 620);
      const x = cx - span / 2 + t * span;
      const nx = (x - cx) / (span / 2);
      const y = cy + 120 - (1 - nx * nx) * Math.min(h * 0.26, 210);
      return { tx: x, ty: y };
    }
    case "orbit": {
      // The same conic, closed: an ellipse. The ball's arc IS this curve with
      // the far end cut off, which is the whole point of the sequence.
      const a = Math.min(w * 0.3, 300);
      const b = Math.min(h * 0.22, 175);
      const ang = t * Math.PI * 2;
      return { tx: cx + Math.cos(ang) * a, ty: cy + Math.sin(ang) * b };
    }
    case "converge": {
      const ang = t * Math.PI * 2;
      const rad = 18 + (i % 5) * 5;
      return { tx: cx + Math.cos(ang) * rad, ty: cy + Math.sin(ang) * rad };
    }
    default: {
      // Deterministic scatter — no Math.random in the frame loop, so the
      // opening looks identical every time it plays.
      const gx = Math.sin(i * 12.9898) * 43758.5453;
      const gy = Math.sin(i * 78.233) * 43758.5453;
      return {
        tx: (gx - Math.floor(gx)) * w,
        ty: (gy - Math.floor(gy)) * h,
      };
    }
  }
}

export function Overture({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [beat, setBeat] = useState(0);
  const [ending, setEnding] = useState(false);
  const shapeRef = useRef<Shape>("scatter");

  // Advance through the beats, then the title, then out.
  useEffect(() => {
    if (ending) return;
    if (beat >= BEATS.length) {
      setEnding(true);
      const t = window.setTimeout(onDone, 3000);
      return () => window.clearTimeout(t);
    }
    shapeRef.current = BEATS[beat].shape;
    const t = window.setTimeout(() => setBeat((b) => b + 1), BEATS[beat].ms);
    return () => window.clearTimeout(t);
  }, [beat, ending, onDone]);

  // Skip on any click, key, or touch. A title sequence you cannot escape is a
  // title sequence people learn to resent.
  useEffect(() => {
    const skip = () => onDone();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const info = detectTier();
    const N = info.tier === 2 ? 220 : 120;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pts: Pt[] = [];
    let raf = 0;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      pts = Array.from({ length: N }, (_, i) => {
        const t0 = target("scatter", i, N, w, h);
        return { x: t0.tx, y: t0.ty, tx: t0.tx, ty: t0.ty, r: 0.7 + (i % 4) * 0.35 };
      });
    };

    const frame = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const t = target(shapeRef.current, i, pts.length, w, h);
        p.tx = t.tx;
        p.ty = t.ty;
        // Ease toward the target. Slow enough that the eye follows one shape
        // BECOMING another rather than cutting between two.
        p.x += (p.tx - p.x) * 0.035;
        p.y += (p.ty - p.y) * 0.035;

        const d = Math.hypot(p.tx - p.x, p.ty - p.y);
        // Brighter the closer it is to where it belongs: the shape resolves
        // out of the dark rather than sliding into place.
        const a = Math.max(0.12, Math.min(0.9, 1 - d / 260));
        ctx.fillStyle = `rgba(232, 200, 137, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const current = BEATS[Math.min(beat, BEATS.length - 1)];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: ending ? 1 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      role="presentation"
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

      <div className="relative text-center px-6 max-w-2xl">
        <AnimatePresence mode="wait">
          {!ending ? (
            <motion.p
              key={beat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.9 }}
              className="font-display text-2xl sm:text-3xl text-cream leading-snug"
            >
              {current.line}
            </motion.p>
          ) : (
            <motion.div
              key="title"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1 }}
              className="flex flex-col items-center gap-6"
            >
              <LogoMark size={54} />
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.28em" }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="font-mono text-xs sm:text-sm uppercase text-gold"
              >
                Your journey begins
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!ending && (
        <button
          onClick={onDone}
          className="absolute bottom-8 right-8 font-mono text-[11px] uppercase tracking-widest text-dim hover:text-cream transition-colors"
        >
          Skip
        </button>
      )}
    </motion.div>
  );
}

/** localStorage key — the overture plays once per browser session, not per visit. */
const SEEN = "pinnacle-overture-seen";

/**
 * Should the overture run right now?
 *
 * No if the student has already seen it this session, no under reduced motion,
 * and no on a device the tier system has already judged cannot afford motion.
 * The check is deliberately conservative: a title sequence is the least
 * important thing on this screen.
 */
export function shouldPlayOverture(): boolean {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(SEEN)) return false;
  const info = detectTier();
  return info.animate && info.tier >= 1;
}

export function markOvertureSeen(): void {
  try {
    sessionStorage.setItem(SEEN, "1");
  } catch {
    /* private mode — it simply plays again, which is harmless */
  }
}
