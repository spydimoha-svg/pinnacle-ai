import { useEffect, useRef } from "react";
import { detectTier, type Tier } from "./tier";

/**
 * The world behind the scene.
 *
 * An ambient field of drifting points that link up when they drift close
 * enough — structure forming and dissolving out of scattered parts, which is
 * both the right feeling for a maths journey and the only metaphor this layer
 * is asked to carry. It sits behind the content at low opacity and is never
 * interactive.
 *
 * Canvas 2D, not WebGL, and that is a considered choice rather than a cheap
 * one. Browsers cap live WebGL contexts at roughly 8-16, and the lesson stage
 * (components/cast/Canvas3D) genuinely needs one to render a labelled solid or
 * a molecule. Spending a context on background decoration would risk the
 * browser silently killing the context that is actually teaching something.
 * Canvas 2D also starts faster and costs far less battery on the mid-range
 * Android phones most of these students are holding.
 *
 * Every visual decision here defers to cinema/tier.ts, so a student who asked
 * for reduced motion, or whose phone cannot afford this, simply gets nothing —
 * and loses no part of the lesson.
 */

export type WorldName = "mathematics" | "physics" | "chemistry" | "biology";

/** Each world gets its own light. Restrained: one hue, low alpha. */
const PALETTE: Record<WorldName, { dot: string; link: string }> = {
  mathematics: { dot: "232, 200, 137", link: "232, 200, 137" }, // gold
  physics: { dot: "111, 168, 201", link: "111, 168, 201" }, // sky
  chemistry: { dot: "165, 143, 214", link: "165, 143, 214" }, // violet
  biology: { dot: "111, 185, 140", link: "111, 185, 140" }, // mint
};

/** Map a subject's name to its world. One light per subject, always. */
export function worldForSubject(subjectName: string): WorldName {
  const n = subjectName.toLowerCase();
  if (n.includes("phys")) return "physics";
  if (n.includes("chem")) return "chemistry";
  if (n.includes("bio")) return "biology";
  return "mathematics";
}

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function WorldCanvas({
  world = "mathematics",
  /** 0..1 — how present the field is. Kept low; this is atmosphere. */
  intensity = 1,
}: {
  world?: WorldName;
  intensity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const info = detectTier();
    if (!info.animate || info.particles === 0) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const colors = PALETTE[world] ?? PALETTE.mathematics;
    const tier: Tier = info.tier;
    // Linking every pair is O(n^2); at tier 2 that is 70*70 checks a frame,
    // which is fine, but the link radius is what actually costs fill time.
    const linkDist = tier === 2 ? 130 : 96;

    let dots: Dot[] = [];
    let raf = 0;
    let running = true;
    // devicePixelRatio is capped: a 3x phone screen would otherwise render
    // nine times the pixels for a background nobody is looking at.
    const dpr = Math.min(window.devicePixelRatio || 1, tier === 2 ? 2 : 1.5);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = Array.from({ length: info.particles }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        // Slow. Anything faster reads as a screensaver and pulls the eye off
        // the sentence the student is meant to be reading.
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.3 + 0.5,
      }));
    };

    const frame = () => {
      if (!running) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        // Wrap rather than bounce: a bounce draws attention to the edge.
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        if (d.y > h + 10) d.y = -10;
      }

      // Links first, so the points sit on top of their own connections.
      if (tier === 2) {
        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist > linkDist) continue;
            const a = (1 - dist / linkDist) * 0.16 * intensity;
            ctx.strokeStyle = `rgba(${colors.link}, ${a})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        ctx.fillStyle = `rgba(${colors.dot}, ${0.42 * intensity})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    // A background field animating in a tab nobody is looking at is pure
    // battery cost, so it stops the moment the tab is hidden.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [world, intensity]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
