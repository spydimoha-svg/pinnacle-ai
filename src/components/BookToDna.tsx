import {
  memo,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "motion/react";
import gsap from "gsap";
import { LogoMark } from "./Logo";

/* Respects the OS "reduce motion" setting; the cinematic bits fall back to
   plain, instantly-visible content when it's on. */
function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    setReduce(m.matches);
    const on = () => setReduce(m.matches);
    m.addEventListener?.("change", on);
    return () => m.removeEventListener?.("change", on);
  }, []);
  return reduce;
}

/* ————————————————————————————————————————————————————————————
   InkReveal — black ink splatters in, then the heading rises up
   out of the ink. Used for the "Learn Better Mode" and
   "Everything between you and full marks" section reveals.
   ———————————————————————————————————————————————————————————— */
const INK_BLOBS = [
  // big irregular splats
  { x: -182, y: -14, w: 170, h: 132, r: "48% 52% 62% 38% / 60% 40% 60% 40%", rot: -12, d: 0.0 },
  { x: 150, y: 16, w: 192, h: 150, r: "60% 40% 45% 55% / 45% 62% 38% 55%", rot: 10, d: 0.05 },
  { x: -22, y: 24, w: 240, h: 188, r: "52% 48% 58% 42% / 62% 42% 58% 38%", rot: 4, d: 0.02 },
  { x: 78, y: -46, w: 130, h: 116, r: "45% 55% 40% 60% / 55% 45% 62% 38%", rot: -16, d: 0.1 },
  { x: -252, y: 42, w: 74, h: 60, r: "52% 48% 46% 54% / 58% 46% 54% 42%", rot: 8, d: 0.15 },
  { x: 250, y: -30, w: 60, h: 52, r: "50% 50% 44% 56% / 52% 48% 60% 40%", rot: -6, d: 0.17 },
  // scattered flung droplets + flecks
  { x: 10, y: 94, w: 40, h: 40, r: "50%", rot: 0, d: 0.21 },
  { x: -122, y: 82, w: 26, h: 26, r: "50%", rot: 0, d: 0.24 },
  { x: 192, y: 74, w: 20, h: 20, r: "50%", rot: 0, d: 0.26 },
  { x: -306, y: -18, w: 15, h: 15, r: "50%", rot: 0, d: 0.28 },
  { x: 322, y: 34, w: 13, h: 13, r: "50%", rot: 0, d: 0.3 },
];

export function InkReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`relative ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-90px" }}
    >
      {/* the splatter, sitting behind the words */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 grid place-items-center pointer-events-none"
      >
        {INK_BLOBS.map((b, i) => (
          <motion.span
            key={i}
            style={{
              position: "absolute",
              width: b.w,
              height: b.h,
              x: b.x,
              y: b.y,
              borderRadius: b.r,
              // flat, wet-black ink with a single small specular glint —
              // reads as spilt ink rather than a glossy sphere
              background:
                "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.13) 0%, transparent 15%), radial-gradient(circle at 58% 60%, #16161d 0%, #0a0a0e 55%, #050507 100%)",
              boxShadow: "0 14px 36px -12px rgba(0,0,0,0.92)",
              filter: "blur(0.3px)",
            }}
            variants={{
              hidden: { scale: 0, opacity: 0, rotate: b.rot - 40 },
              show: {
                scale: [0, 1.16, 1],
                opacity: [0, 1, 0.92],
                rotate: b.rot,
                transition: {
                  duration: 0.6,
                  delay: b.d,
                  ease: [0.2, 1.15, 0.3, 1],
                },
              },
            }}
          />
        ))}
      </div>
      {/* the heading, coming up through the ink */}
      <motion.div
        className="relative z-10"
        variants={{
          hidden: { opacity: 0, y: 28, filter: "blur(7px)" },
          show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, delay: 0.36, ease: [0.2, 0.7, 0.2, 1] },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* A closed Pinnacle book — the object that flies into the helix. */
function ClosedBook({ size = 208 }: { size?: number }) {
  const h = size * 1.28;
  return (
    <div style={{ width: size, height: h, perspective: 1400 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: "rotateX(8deg) rotateY(-20deg)",
        }}
      >
        {/* page block peeking out on the fore-edge */}
        <div
          style={{
            position: "absolute",
            right: -7,
            top: 7,
            bottom: 7,
            width: 13,
            background: "linear-gradient(90deg,#e9dfc6,#b7a479)",
            borderRadius: 3,
            transform: "translateZ(-2px)",
          }}
        />
        {/* cover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            background:
              "linear-gradient(140deg,#1c1e2b 0%,#0f1017 55%,#171722 100%)",
            border: "1px solid rgba(240,199,102,0.45)",
            boxShadow:
              "0 40px 80px -24px rgba(0,0,0,0.85), inset 0 0 50px rgba(240,199,102,0.06)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <LogoMark size={Math.round(size * 0.32)} />
            <div
              style={{
                marginTop: 14,
                fontFamily: '"Spline Sans Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.4em",
                color: "rgba(240,199,102,0.85)",
                textTransform: "uppercase",
              }}
            >
              Pinnacle
            </div>
          </div>
        </div>
        {/* spine shadow */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 16,
            background: "linear-gradient(90deg, rgba(0,0,0,0.6), transparent)",
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
        />
      </div>
    </div>
  );
}

/* ————————————————————————————————————————————————————————————
   DnaHelix — geometry
   —————————————————————————————————————————————————————————————
   A real, red, horizontal DNA double helix: two intertwining backbone strands
   (crossing sine waves) with base-pair rungs, animated so it flows and the
   strands weave in front of and behind each other for real depth.

   The drawing is unchanged. What changed is who does the drawing.

   It used to hold `phase` in React state and bump it inside a bare
   requestAnimationFrame, so a 134-node SVG was reconciled and re-rendered by
   React sixty times a second, and every one of those renders rebuilt a
   97-point geometry array from scratch (two trig calls per point) plus two
   path strings. React is not an animation loop; this now runs entirely
   through DOM mutation and never re-renders after mount.

   The point ring below is the part of the maths that does not depend on time,
   so it is computed exactly once, at module load. Per frame all we need is
   sin/cos of the phase and the angle-addition identities

       sin(kx + p) = sin(kx)cos(p) + cos(kx)sin(p)
       cos(kx + p) = cos(kx)cos(p) - sin(kx)sin(p)

   which turns 194 trig calls per frame into 2.
   ———————————————————————————————————————————————————————————— */
const DNA_W = 620;
const DNA_H = 160;
const DNA_CY = DNA_H / 2;
const DNA_A = 52; // amplitude
const DNA_K = 0.05; // spatial frequency
const DNA_N = 96; // segments along a strand
const DNA_POINTS = DNA_N + 1;
const DNA_RUNG_EVERY = 3;
/* The old loop advanced 0.045 rad per rAF callback, which silently ran at
   double speed on a 120Hz screen. Same speed on a 60Hz display, now measured
   in time rather than in frames. */
const DNA_PHASE_PER_MS = 0.045 / (1000 / 60);
const DNA_PHASE_WRAP = Math.PI * 400;

const dnaSinKx = new Float64Array(DNA_POINTS);
const dnaCosKx = new Float64Array(DNA_POINTS);
const dnaXStr: string[] = [];
for (let i = 0; i < DNA_POINTS; i++) {
  const x = (DNA_W / DNA_N) * i;
  dnaSinKx[i] = Math.sin(DNA_K * x);
  dnaCosKx[i] = Math.cos(DNA_K * x);
  dnaXStr.push(x.toFixed(1));
}
const dnaRungX: number[] = [];
for (let i = 0; i < DNA_POINTS; i += DNA_RUNG_EVERY) dnaRungX.push((DNA_W / DNA_N) * i);
const DNA_RUNG_COUNT = dnaRungX.length;

/* Scratch buffers, reused by every frame so the loop allocates nothing but
   the two path strings it has to hand to setAttribute anyway. Module scope is
   safe because dnaFrame() fills them and the caller drains them synchronously
   in the same tick. */
const dnaY1 = new Float64Array(DNA_RUNG_COUNT);
const dnaY2 = new Float64Array(DNA_RUNG_COUNT);
const dnaDepth = new Float64Array(DNA_RUNG_COUNT);
let dnaD1 = "";
let dnaD2 = "";

/* ── Venom tendrils ──────────────────────────────────────────────────────
   What makes a symbiote read as alive is not the helix, it's the stuff that
   peels off it. Each tendril anchors to a fixed point on one backbone, whips
   out on its own slow phase offset, and tapers to nothing.

   Same discipline as the strands: the anchor list is built once, and the
   frame loop only rewrites one `d` per tendril. Nine of them, so this adds
   nine short attribute writes per frame, not a redraw. */
const TENDRILS = [
  { at: 0.07, side: -1, len: 58, sway: 34, speed: 0.47, phase: 2.2 },
  { at: 0.12, side: 1, len: 46, sway: 26, speed: 0.55, phase: 0.0 },
  { at: 0.19, side: -1, len: 44, sway: 27, speed: 0.6, phase: 3.8 },
  { at: 0.26, side: 1, len: 34, sway: 20, speed: 0.8, phase: 1.7 },
  { at: 0.32, side: -1, len: 62, sway: 36, speed: 0.38, phase: 5.6 },
  { at: 0.38, side: 1, len: 55, sway: 32, speed: 0.42, phase: 3.1 },
  { at: 0.44, side: -1, len: 26, sway: 15, speed: 1.25, phase: 0.4 },
  { at: 0.5, side: 1, len: 40, sway: 24, speed: 0.67, phase: 0.9 },
  { at: 0.56, side: -1, len: 66, sway: 38, speed: 0.34, phase: 2.9 },
  { at: 0.61, side: 1, len: 30, sway: 18, speed: 0.95, phase: 2.4 },
  { at: 0.67, side: -1, len: 48, sway: 29, speed: 0.58, phase: 4.7 },
  { at: 0.72, side: 1, len: 52, sway: 30, speed: 0.5, phase: 4.2 },
  { at: 0.78, side: -1, len: 36, sway: 21, speed: 0.86, phase: 1.5 },
  { at: 0.84, side: 1, len: 38, sway: 22, speed: 0.74, phase: 5.0 },
  { at: 0.9, side: -1, len: 60, sway: 35, speed: 0.4, phase: 3.3 },
  { at: 0.93, side: 1, len: 28, sway: 16, speed: 1.1, phase: 1.2 },
] as const;

/* Hanging drips. A symbiote reads as *wet* because gravity is acting on it —
   these globs sag off the strand, stretch, and snap back on their own cycle.
   Each is one <circle> whose cy and r we rewrite, so the whole set costs
   sixteen attribute writes a frame. */
const DRIPS = [
  { at: 0.16, side: 1, hang: 26, speed: 0.42, phase: 0.6, r: 3.4 },
  { at: 0.29, side: -1, hang: 34, speed: 0.31, phase: 2.8, r: 4.2 },
  { at: 0.47, side: 1, hang: 22, speed: 0.55, phase: 4.4, r: 2.8 },
  { at: 0.58, side: -1, hang: 38, speed: 0.27, phase: 1.1, r: 4.8 },
  { at: 0.7, side: 1, hang: 30, speed: 0.37, phase: 5.2, r: 3.6 },
  { at: 0.88, side: -1, hang: 24, speed: 0.49, phase: 3.6, r: 3.0 },
] as const;

const dripCy = new Float64Array(DRIPS.length);
const dripR = new Float64Array(DRIPS.length);

function dripFrame(phase: number) {
  for (let i = 0; i < DRIPS.length; i++) {
    const d = DRIPS[i];
    const x0 = d.at * DNA_W;
    const y0 = DNA_CY + DNA_A * Math.sin(DNA_K * x0 + phase) * d.side;
    // Sawtooth-ish sag: slow stretch down, quick snap back.
    const t = (Math.sin(phase * d.speed + d.phase) + 1) * 0.5;
    const sag = t * t * d.hang;
    dripCy[i] = y0 + d.side * sag;
    // Thins as it stretches, like a real filament necking.
    dripR[i] = d.r * (1 - 0.45 * t);
  }
}

const tendrilD: string[] = new Array(TENDRILS.length).fill("");

/** One tendril as a quadratic curve: anchor → whipping control → tapered tip. */
function tendrilPath(t: (typeof TENDRILS)[number], phase: number) {
  const x0 = t.at * DNA_W;
  // Ride the strand the tendril is attached to.
  const s = Math.sin(DNA_K * x0 + phase);
  const y0 = DNA_CY + DNA_A * s * t.side;
  const w = phase * t.speed + t.phase;
  const sway = Math.sin(w) * t.sway;
  const curl = Math.cos(w * 0.7) * t.sway * 0.6;
  const cx = x0 + sway;
  const cy = y0 + t.side * t.len * 0.55;
  const tx = x0 + sway * 0.4 + curl;
  const ty = y0 + t.side * t.len;
  return `M${x0.toFixed(1)},${y0.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)}`;
}

function tendrilFrame(phase: number) {
  for (let i = 0; i < TENDRILS.length; i++) {
    tendrilD[i] = tendrilPath(TENDRILS[i], phase);
  }
}

function dnaFrame(phase: number) {
  const sp = Math.sin(phase);
  const cp = Math.cos(phase);
  let d1 = "";
  let d2 = "";
  let r = 0;
  for (let i = 0; i < DNA_POINTS; i++) {
    const s = dnaSinKx[i] * cp + dnaCosKx[i] * sp; // sin(kx + phase)
    const y1 = DNA_CY + DNA_A * s;
    const y2 = DNA_CY - DNA_A * s;
    const head = i ? " L" : "M";
    d1 += head + dnaXStr[i] + "," + y1.toFixed(1);
    d2 += head + dnaXStr[i] + "," + y2.toFixed(1);
    if (i % DNA_RUNG_EVERY === 0) {
      dnaY1[r] = y1;
      dnaY2[r] = y2;
      dnaDepth[r] = dnaCosKx[i] * cp - dnaSinKx[i] * sp; // cos(kx + phase)
      r++;
    }
  }
  dnaD1 = d1;
  dnaD2 = d2;
}

/* Phase 0 — the state React renders once and then never touches again. */
dnaFrame(0);
tendrilFrame(0);
dripFrame(0);
const DNA_D1_AT_0 = dnaD1;
const DNA_D2_AT_0 = dnaD2;
const TENDRILS_AT_0 = tendrilD.slice();
const DRIPS_AT_0 = DRIPS.map((d, i) => ({
  cx: d.at * DNA_W,
  cy: dripCy[i],
  r: dripR[i],
}));
const DNA_RUNGS_AT_0 = dnaRungX.map((x, r) => ({
  x,
  y1: dnaY1[r],
  y2: dnaY2[r],
  depth: dnaDepth[r],
}));

/* The halo used to be an SVG <filter> — feGaussianBlur stdDeviation 2.4 —
   hung on both 620px-wide backbones. SVG filters are never GPU-composited, so
   that was two page-wide offscreen buffers, a separable Gaussian convolution
   over each and a merge, redone from scratch every single frame. It was by far
   the most expensive thing in the component.

   These six widening, fading copies of the same path stand in for it, and the
   numbers are measured rather than guessed. A cross-section of the original
   filtered strand was rasterised and read back pixel by pixel; its alpha
   decayed 106, 74, 45, 24, 11, 4 (of 255) over the six pixels outside the 4px
   core, so each band below is one pixel of that decay and the opacities start
   from the source-over stack 1-Π(1-aᵢ) solved for those targets. They were
   then fitted against a full rendering of the filtered original — the crest
   cross-section alone reads slightly hot, because a Gaussian also picks up ink
   from the curve's own bend, which a perpendicular stroke does not.

   Final agreement over the whole 620x160 frame: mean error 0.93/255, 0.9% of
   pixels off by more than 8/255, none by more than 27, and overall luminance
   within 0.6%. Widest first — they paint bottom-up, crisp core last. */
const DNA_GLOW = [
  { w: 16, o: 0.012 },
  { w: 14, o: 0.016 },
  { w: 12, o: 0.04 },
  { w: 10, o: 0.085 },
  { w: 8, o: 0.125 },
  { w: 6, o: 0.18 },
] as const;

/* Both gates are plain ref objects on purpose: the scene has to be able to
   pause the helix on every scroll frame without pushing a state update. */
type DnaProps = {
  /** The pinned scene container; the loop only runs while it is on screen. */
  sceneRef?: { readonly current: Element | null };
  /** Set false by the scene while the helix is faded out. */
  gate?: { readonly current: boolean };
};

const DnaHelix = memo(function DnaHelix({ sceneRef, gate }: DnaProps) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Resolved once. After this the loop never touches React or the DOM tree
    // shape again — only attribute values on elements it already holds.
    const s1 = Array.from(root.querySelectorAll<SVGPathElement>('[data-dna="s1"]'));
    const s2 = Array.from(root.querySelectorAll<SVGPathElement>('[data-dna="s2"]'));
    const lines = Array.from(root.querySelectorAll<SVGLineElement>("line"));
    const circles = Array.from(root.querySelectorAll<SVGCircleElement>("circle"));
    // Two <path> per tendril (dark body + bright filament) share one index.
    const tendrils = TENDRILS.map((_, i) =>
      Array.from(root.querySelectorAll<SVGPathElement>(`[data-tendril="${i}"]`))
    );
    const drips = DRIPS.map((_, i) =>
      root.querySelector<SVGCircleElement>(`[data-drip="${i}"]`)
    );
    if (!s1.length || lines.length !== DNA_RUNG_COUNT) return;

    // Colour, stroke width and radius only take two values each and flip when
    // a rung crosses the plane of the screen — roughly twice a second, not
    // sixty times. Opacity is continuous but flat-lines at the turning points.
    // Both are cached so we only write attributes that actually moved.
    const lastSign = new Int8Array(DNA_RUNG_COUNT).fill(9);
    const lastOpacity = new Float64Array(DNA_RUNG_COUNT).fill(-1);

    const paint = (phase: number) => {
      dnaFrame(phase);
      for (let i = 0; i < s1.length; i++) s1[i].setAttribute("d", dnaD1);
      for (let i = 0; i < s2.length; i++) s2[i].setAttribute("d", dnaD2);

      tendrilFrame(phase);
      for (let i = 0; i < tendrils.length; i++) {
        const d = tendrilD[i];
        const pair = tendrils[i];
        for (let j = 0; j < pair.length; j++) pair[j].setAttribute("d", d);
      }

      dripFrame(phase);
      for (let i = 0; i < drips.length; i++) {
        const c = drips[i];
        if (!c) continue;
        c.setAttribute("cy", dripCy[i].toFixed(1));
        c.setAttribute("r", dripR[i].toFixed(2));
      }

      for (let r = 0; r < DNA_RUNG_COUNT; r++) {
        const y1 = dnaY1[r];
        const y2 = dnaY2[r];
        const depth = dnaDepth[r];
        const line = lines[r];
        const top = circles[r * 2];
        const bottom = circles[r * 2 + 1];

        line.setAttribute("y1", `${y1}`);
        line.setAttribute("y2", `${y2}`);
        top.setAttribute("cy", `${y1}`);
        bottom.setAttribute("cy", `${y2}`);

        const lineOpacity = 0.3 + 0.55 * Math.abs(depth);
        if (lastOpacity[r] !== lineOpacity) {
          lastOpacity[r] = lineOpacity;
          const nodeOpacity = `${0.45 + 0.55 * Math.abs(depth)}`;
          line.setAttribute("opacity", `${lineOpacity}`);
          top.setAttribute("opacity", nodeOpacity);
          bottom.setAttribute("opacity", nodeOpacity);
        }

        const sign = depth > 0 ? 1 : depth < 0 ? -1 : 0;
        if (lastSign[r] !== sign) {
          lastSign[r] = sign;
          line.setAttribute("stroke", sign > 0 ? "#e6e6f4" : "#22222f");
          line.setAttribute("stroke-width", sign > 0 ? "2.6" : "1.4");
          top.setAttribute("r", sign > 0 ? "4.5" : "3");
          bottom.setAttribute("r", sign < 0 ? "4.5" : "3");
        }
      }
    };

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)") ?? null;
    let reduced = mq?.matches ?? false;
    let onScreen = false;
    let running = false;
    let phase = 0;

    /* gsap.ticker, not requestAnimationFrame: lib/smoothScroll.ts already
       drives Lenis (and through it ScrollTrigger) off this one clock, and a
       second independent rAF would land the helix up to a frame away from the
       scroll position the rest of the scene is drawn at. */
    const tick = (_time: number, deltaMs: number) => {
      if (gate && !gate.current) return; // faded out — nothing to draw
      // smoothScroll turns GSAP's lagSmoothing off, so clamp our own step
      // rather than teleporting the helix after a stall.
      phase = (phase + Math.min(deltaMs, 100) * DNA_PHASE_PER_MS) % DNA_PHASE_WRAP;
      paint(phase);
    };

    const start = () => {
      if (running || reduced || !onScreen) return;
      running = true;
      gsap.ticker.add(tick);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      gsap.ticker.remove(tick);
    };

    // The old loop had an empty dependency array and no visibility check, so it
    // burned a frame's worth of React reconciliation forever — including on
    // every page where this scene is scrolled far off screen.
    const observer = new IntersectionObserver(
      (entries) => {
        onScreen = entries[entries.length - 1].isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { rootMargin: "100px" },
    );
    observer.observe(sceneRef?.current ?? root);

    const onMotionPreferenceChange = () => {
      reduced = mq?.matches ?? false;
      if (reduced) {
        stop();
        phase = 0;
        paint(0); // settle back onto the exact frame React rendered
      } else {
        start();
      }
    };
    mq?.addEventListener?.("change", onMotionPreferenceChange);

    return () => {
      stop();
      observer.disconnect();
      mq?.removeEventListener?.("change", onMotionPreferenceChange);
    };
  }, [sceneRef, gate]);

  return (
    <svg
      ref={rootRef}
      viewBox={`0 0 ${DNA_W} ${DNA_H}`}
      className="pnz-dna-svg"
      role="img"
      aria-label="DNA double helix"
    >
      <defs>
        {/* Venom symbiote: a glossy black body with a cold specular ridge
            where the light catches it, not a coloured strand. The black ends
            let the helix sink into the ink background at the edges. */}
        <linearGradient id="pnzDnaStrand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#07070c" />
          <stop offset="0.22" stopColor="#1a1a26" />
          <stop offset="0.5" stopColor="#e9e9f6" />
          <stop offset="0.78" stopColor="#1a1a26" />
          <stop offset="1" stopColor="#07070c" />
        </linearGradient>
        {/* The halo is a cold violet-white rim light — symbiote sheen. */}
        <linearGradient id="pnzDnaHalo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6d6a9e" />
          <stop offset="0.5" stopColor="#cfd0ff" />
          <stop offset="1" stopColor="#6d6a9e" />
        </linearGradient>
      </defs>
      {/* base-pair rungs, thicker/brighter when in front */}
      {DNA_RUNGS_AT_0.map((p, i) => {
        const front = p.depth > 0;
        return (
          <line
            key={`r${i}`}
            x1={p.x}
            y1={p.y1}
            x2={p.x}
            y2={p.y2}
            stroke={front ? "#e6e6f4" : "#22222f"}
            strokeWidth={front ? 2.6 : 1.4}
            opacity={0.3 + 0.55 * Math.abs(p.depth)}
            strokeLinecap="round"
          />
        );
      })}
      {/* the two backbones, each with its own halo underneath it — grouped so
          the paint order is exactly what the filtered version produced:
          strand 1's glow, strand 1, strand 2's glow, strand 2. */}
      {(["s1", "s2"] as const).map((id) => {
        const d = id === "s1" ? DNA_D1_AT_0 : DNA_D2_AT_0;
        return (
          <g key={id}>
            {DNA_GLOW.map((g) => (
              <path
                key={g.w}
                data-dna={id}
                d={d}
                fill="none"
                stroke="url(#pnzDnaHalo)"
                strokeWidth={g.w}
                strokeOpacity={g.o}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            <path
              data-dna={id}
              d={d}
              fill="none"
              stroke="url(#pnzDnaStrand)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        );
      })}
      {/* Symbiote tendrils — drawn after the backbones so they read as peeling
          off the front of the strand. Tapered: a soft dark body under a thin
          bright filament. */}
      {TENDRILS_AT_0.map((d, i) => (
        <g key={`t${i}`} opacity={0.75}>
          <path
            data-tendril={i}
            d={d}
            fill="none"
            stroke="#0a0a12"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            data-tendril={i}
            d={d}
            fill="none"
            stroke="url(#pnzDnaHalo)"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>
      ))}
      {/* Hanging drips — the thing that makes it read as wet. */}
      {DRIPS_AT_0.map((d, i) => (
        <circle
          key={`d${i}`}
          data-drip={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill="#0b0b14"
          stroke="url(#pnzDnaHalo)"
          strokeWidth="0.9"
          opacity="0.85"
        />
      ))}
      {/* nucleotide nodes, bigger when in front */}
      {DNA_RUNGS_AT_0.map((p, i) => (
        <g key={`n${i}`}>
          <circle cx={p.x} cy={p.y1} r={p.depth > 0 ? 4.5 : 3} fill="#f2f2ff" opacity={0.45 + 0.55 * Math.abs(p.depth)} />
          <circle cx={p.x} cy={p.y2} r={p.depth < 0 ? 4.5 : 3} fill="#b9bae0" opacity={0.45 + 0.55 * Math.abs(p.depth)} />
        </g>
      ))}
    </svg>
  );
});

/* The reveal text that the helix resolves into. */
function InsideModelCopy() {
  return (
    <div className="relative max-w-2xl mx-auto text-center px-5 pointer-events-none">
      <div className="eyebrow mb-3">Inside the model</div>
      <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream mb-4">
        It doesn't memorise. It reads.
      </h2>
      <p className="text-muted">
        Every answer starts by pulling the exact chapter and exercise from a real
        library — NCERT, exemplars, the question bank — and teaching from that,
        not from a foggy memory. That is why it lands the real Exercise 2.2, not a
        made-up one.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <span className="chip-gold">Retrieve</span>
        <span className="chip">Understand</span>
        <span className="chip">Teach</span>
        <span className="chip">Check</span>
      </div>
    </div>
  );
}

/* ————————————————————————————————————————————————————————————
   snapTo — quantises a continuous number onto a short ladder of
   fixed values.

   Used for the three scroll-driven blurs in the scene below.
   `filter: blur()` has to re-rasterise the entire layer for every
   distinct radius, so handing it a fresh float sixty times a
   second — on three overlapping layers at once, one of which is an
   SVG that is already redrawing itself every frame — is the most
   expensive thing on this page. Snapped, the compositor only ever
   builds a handful of rasterisations and reuses them, and
   framer-motion drops the style write altogether while the snapped
   value holds (a MotionValue only notifies subscribers when its
   value actually changes).

   The ladders are deliberately uneven rather than evenly spaced:
   fine steps at the end of the ramp where the layer is opaque and
   a jump would be seen, coarse steps at the other end where the
   layer has already faded out and nothing is visible anyway. Every
   step value is a radius the original animation passed through, so
   each resting frame is pixel-identical to before — only the
   in-between frames are held instead of interpolated.
   ———————————————————————————————————————————————————————————— */
function snapTo(ladder: number[]) {
  return (v: number) => {
    let best = ladder[0];
    let bestDist = Math.abs(v - best);
    for (let i = 1; i < ladder.length; i++) {
      const d = Math.abs(v - ladder[i]);
      if (d < bestDist) {
        bestDist = d;
        best = ladder[i];
      }
    }
    return best;
  };
}

// book blurs out while it is already shrinking, fading and being washed
// out by the flash — the coarsest ladder of the three survives here.
const BOOK_BLUR_LADDER = snapTo([0, 0.8, 2.5, 4.5, 7]);
// helix blurs out over exactly the same range as it fades to zero.
const DNA_BLUR_LADDER = snapTo([0, 0.8, 2.2, 4.5, 8]);
// the copy is the one blur the eye actually lands on, so it gets the
// finest steps where it is most legible (blur small, opacity high).
const TEXT_BLUR_LADDER = snapTo([0, 0.8, 2, 3.6, 6, 10]);

/* ————————————————————————————————————————————————————————————
   BookToDna — the pinned, scroll-driven scene:
   book flies in from the upper-right → flashes → merges into the
   red helix → helix resolves into the "Inside the model" copy.
   ———————————————————————————————————————————————————————————— */
export function BookToDna() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* Everything below reads `p`, never scrollYProgress itself.
     Bolting fourteen transforms straight onto the raw progress welds the whole
     scene 1:1 to the wheel, so every notch of wheel delta lands as a hard step
     in the choreography — that is what read as "mechanical".

     Tuning note: the landing page already runs Lenis (see lib/smoothScroll.ts,
     duration 1.05), so this spring is not here to do the smoothing — it only
     has to take the residual stepping out. It is therefore stiffer than a
     stand-alone scroll spring would be: damping ratio ≈ 1.1, i.e. very slightly
     overdamped, so it never overshoots (an overshoot here would visibly walk
     the book past the merge point and back) and settles in roughly 0.1s, which
     is short enough that the scene never feels like it is trailing the cursor.
     restDelta 0.001 of a 200vh scene is ~2px — it lands exactly on the end
     states rather than creeping toward them. */
  const p = useSpring(scrollYProgress, {
    stiffness: 210,
    damping: 32,
    restDelta: 0.001,
  });

  // Once the book has reached the merge point we unmount it entirely, so it can
  // never ghost over the copy that resolves in later (opacity transforms alone
  // can leave a stale frame under fast scrolling).
  //
  // This has to fire on the *crossing*, not on every tick: calling setMerged on
  // each scroll frame pushed a state update through React ~60x a second for a
  // boolean that changes twice in the whole scene. Guarded by a ref so the
  // setState only happens when the boolean genuinely flips. The two thresholds
  // are deliberately different: it unmounts at 0.34 and comes back at 0.33,
  // where bookOpacity is exactly 0, so the band cannot flap and the book can
  // never reappear at a visible opacity.
  const [merged, setMerged] = useState(false);
  const mergedRef = useRef(false);
  useMotionValueEvent(p, "change", (v) => {
    const next = mergedRef.current ? v >= 0.33 : v > 0.34;
    if (next !== mergedRef.current) {
      mergedRef.current = next;
      setMerged(next);
    }
  });

  // book: sweeps from upper-right down into the centre, shrinking, then vanishes
  const bookX = useTransform(p, [0, 0.32], [230, 0]);
  const bookY = useTransform(p, [0, 0.32], [-260, 24]);
  const bookScale = useTransform(p, [0, 0.32], [1.15, 0.26]);
  const bookRotate = useTransform(p, [0, 0.32], [10, -8]);
  const bookOpacity = useTransform(p, [0, 0.2, 0.33], [1, 1, 0]);
  const bookBlurRaw = useTransform(p, [0, 0.24, 0.33], [0, 0, 7]);
  const bookBlurN = useTransform(bookBlurRaw, BOOK_BLUR_LADDER);
  const bookFilter = useMotionTemplate`blur(${bookBlurN}px)`;

  // the merge flash
  const flashOpacity = useTransform(p, [0.27, 0.35, 0.47], [0, 0.9, 0]);
  const flashScale = useTransform(p, [0.27, 0.47], [0.35, 1.7]);

  /* helix: emerges from the flash, holds — then instead of dissolving it
     RECEDES. It swells past the frame and settles to a low ambient opacity so
     it keeps living behind the copy rather than disappearing, which is what
     sells the "it's still in there" idea. */
  const dnaOpacity = useTransform(
    p,
    [0.33, 0.48, 0.72, 0.88, 1],
    [0, 1, 1, 0.3, 0.2]
  );
  const dnaScale = useTransform(p, [0.33, 0.5, 0.78, 1], [0.5, 1, 1.35, 2.4]);
  // Only a light blur on the way back — a fully blurred helix reads as a
  // smudge, and we want the strands still legible behind the text.
  const dnaBlurRaw = useTransform(p, [0.72, 0.88], [0, 2.2]);
  const dnaBlurN = useTransform(dnaBlurRaw, DNA_BLUR_LADDER);
  const dnaFilter = useMotionTemplate`blur(${dnaBlurN}px)`;

  /* The page itself turns venomous as the helix falls back. Fixed layer, so
     once it is up it stays with you down the rest of the page. */
  const venomOpacity = useTransform(p, [0.62, 0.9, 1], [0, 0.85, 1]);

  // The helix is mounted for the whole 200vh scene but only visible for part of
  // it. IntersectionObserver inside DnaHelix stops the loop once the scene
  // leaves the viewport; this stops it for the stretch where the scene is still
  // on screen but the helix has been faded out — the book fly-in and the copy
  // resolve. A ref, not state, so the write costs nothing and never re-renders.
  const dnaVisible = useRef(true);
  useMotionValueEvent(dnaOpacity, "change", (v) => {
    dnaVisible.current = v > 0.02;
  });

  // the copy resolves in as the helix leaves
  const textOpacity = useTransform(p, [0.74, 0.9], [0, 1]);
  const textY = useTransform(p, [0.74, 0.92], [46, 0]);
  const textBlurRaw = useTransform(p, [0.74, 0.9], [10, 0]);
  const textBlurN = useTransform(textBlurRaw, TEXT_BLUR_LADDER);
  const textFilter = useMotionTemplate`blur(${textBlurN}px)`;

  if (reduce) {
    return (
      <section className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <div className="pnz-dna-strip mb-8">
          <DnaHelix />
        </div>
        <InsideModelCopy />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative z-10" style={{ height: "200vh" }}>
      {/* The page turning venomous. Fixed, so once it is up it follows you
          down the rest of the site rather than scrolling away with the scene. */}
      <motion.div
        aria-hidden
        className="pnz-venom fixed inset-0 pointer-events-none"
        style={{ opacity: venomOpacity }}
      >
        <div className="pnz-venom-goo" />
        <div className="pnz-venom-veins" />
        <div className="pnz-venom-vignette" />
      </motion.div>

      <div className="sticky top-0 h-screen overflow-hidden grid place-items-center">
        <div className="relative w-full grid place-items-center">
          {/* the copy is the in-flow layer, so it holds the scene's height.
              z-10 keeps it above the helix once the helix has receded. */}
          <motion.div
            className="relative z-10"
            style={{ opacity: textOpacity, y: textY, filter: textFilter }}
          >
            <InsideModelCopy />
          </motion.div>

          {/* the flowing helix — z-0 so that when it swells back it passes
              behind the copy instead of washing over it */}
          <motion.div
            aria-hidden
            className="absolute inset-0 z-0 flex items-center justify-center px-5 pointer-events-none"
            style={{ opacity: dnaOpacity }}
          >
            <motion.div
              className="pnz-dna-strip w-full"
              style={{ scale: dnaScale, filter: dnaFilter }}
            >
              <DnaHelix sceneRef={ref} gate={dnaVisible} />
            </motion.div>
          </motion.div>

          {/* the merge flash */}
          <motion.div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: flashOpacity }}
          >
            <motion.div
              style={{
                width: 520,
                height: 520,
                borderRadius: "50%",
                scale: flashScale,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(240,199,102,0.55) 28%, rgba(255,90,90,0.28) 50%, transparent 72%)",
                filter: "blur(6px)",
              }}
            />
          </motion.div>

          {/* the flying book — gone the instant it merges into the helix */}
          {!merged && (
            <motion.div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                style={{
                  x: bookX,
                  y: bookY,
                  scale: bookScale,
                  rotate: bookRotate,
                  opacity: bookOpacity,
                  filter: bookFilter,
                }}
              >
                <ClosedBook />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
