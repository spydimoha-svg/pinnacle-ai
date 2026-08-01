import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

/* ── Summit mote field ─────────────────────────────────────────────────────
   A canvas rather than DOM nodes: 140 drifting particles as elements would be
   140 composited layers and a style write each per frame. On a canvas it is
   one layer and one draw call, and the whole thing costs less than a single
   blurred div.

   Everything here is deliberately cheap: no shadows, no gradients per
   particle, no per-frame allocation. Positions live in one flat Float32Array. */
const MOTES = 140;
const FIELD = {
  minR: 0.4,
  maxR: 1.9,
  rise: 0.16, // px/ms upward drift
  drift: 0.05,
};

function useMoteField(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  hostRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    // x, y, r, speed, phase, alpha — 6 floats per mote, allocated once.
    const P = new Float32Array(MOTES * 6);
    let w = 0;
    let h = 0;
    let dpr = 1;

    const seed = () => {
      for (let i = 0; i < MOTES; i++) {
        const o = i * 6;
        P[o] = Math.random() * w;
        P[o + 1] = Math.random() * h;
        P[o + 2] = FIELD.minR + Math.random() * (FIELD.maxR - FIELD.minR);
        P[o + 3] = 0.5 + Math.random();
        P[o + 4] = Math.random() * Math.PI * 2;
        P[o + 5] = 0.15 + Math.random() * 0.5;
      }
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();

    // Pointer parallax, smoothed. Stored as a plain object so the draw loop
    // never touches React.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const draw = (_t: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 100);
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < MOTES; i++) {
        const o = i * 6;
        // rise, and wrap round to the bottom
        P[o + 1] -= FIELD.rise * dt * P[o + 3] * 0.06;
        if (P[o + 1] < -4) {
          P[o + 1] = h + 4;
          P[o] = Math.random() * w;
        }
        P[o + 4] += dt * 0.0006 * P[o + 3];
        const sway = Math.sin(P[o + 4]) * FIELD.drift * dt;
        P[o] += sway;

        // depth parallax: bigger motes react more to the pointer
        const depth = P[o + 2] / FIELD.maxR;
        const px = P[o] + pointer.x * 22 * depth;
        const py = P[o + 1] + pointer.y * 14 * depth;

        ctx.globalAlpha = P[o + 5] * (0.35 + 0.65 * depth);
        ctx.fillStyle = i % 9 === 0 ? "#f6d47c" : "#cfd0ff";
        ctx.beginPath();
        ctx.arc(px, py, P[o + 2], 0, 6.283185);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let running = false;
    const start = () => {
      if (running || mq.matches) return;
      running = true;
      gsap.ticker.add(draw);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      gsap.ticker.remove(draw);
    };

    // Only run while the hero is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(host);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    host.addEventListener("pointermove", onPointer);
    const onMq = () => (mq.matches ? (stop(), ctx.clearRect(0, 0, w, h)) : start());
    mq.addEventListener?.("change", onMq);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      host.removeEventListener("pointermove", onPointer);
      mq.removeEventListener?.("change", onMq);
    };
  }, [canvasRef, hostRef]);
}

/** Cursor-following pull on the primary CTA. Transform only, so it composites. */
function useMagnetic(ref: React.RefObject<HTMLElement | null>, strength = 0.34) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const setX = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      setX((e.clientX - (r.left + r.width / 2)) * strength);
      setY((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => {
      setX(0);
      setY(0);
    };

    // Listen on a padded zone so the pull starts before the cursor arrives.
    const zone = el.parentElement ?? el;
    zone.addEventListener("pointermove", move);
    zone.addEventListener("pointerleave", reset);
    return () => {
      zone.removeEventListener("pointermove", move);
      zone.removeEventListener("pointerleave", reset);
    };
  }, [ref, strength]);
}

export function HeroAscent() {
  const hostRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const ridgeRef = useRef<SVGPathElement>(null);

  useMoteField(canvasRef, hostRef);
  useMagnetic(ctaRef);

  useEffect(() => {
    const host = hostRef.current;
    const headline = headlineRef.current;
    if (!host || !headline) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // everything is already in its final state in the markup

    const ctx = gsap.context(() => {
      // SplitText is free in GSAP 3.13+; chars give us the kinetic rise.
      // `ignore` keeps the shimmer word intact: it paints via
      // `background-clip: text`, and splitting it into per-char spans would
      // give each char a transparent fill with no background to clip, so the
      // word disappears entirely.
      const split = new SplitText(headline, {
        type: "chars,lines",
        linesClass: "pnz-line",
        ignore: ".pnz-shimmer",
      });

      gsap.set(host.querySelectorAll("[data-hero-fade]"), { opacity: 0, y: 18 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // The ignored shimmer word is not in split.chars, so animate it
      // alongside them as a single unit — same rise, same feel.
      const risers = [
        ...split.chars,
        ...Array.from(headline.querySelectorAll(".pnz-shimmer")),
      ];

      tl.from(risers, {
        yPercent: 118,
        rotateZ: 4,
        opacity: 0,
        duration: 0.9,
        stagger: { each: 0.018, from: "start" },
      })
        .to(
          host.querySelectorAll("[data-hero-fade]"),
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        );

      // The ridgeline draws itself under the copy.
      if (ridgeRef.current) {
        tl.from(
          ridgeRef.current,
          { drawSVG: "0%", duration: 1.4, ease: "power2.inOut" },
          "-=0.9"
        );
      }

      // Scroll parallax: the headline drifts up and dims as you leave.
      gsap.to(headline, {
        yPercent: -18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: host,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => split.revert();
    }, host);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={hostRef}
      className="pnz-hero relative z-10 min-h-[92vh] flex items-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      />

      {/* Ridgeline that traces itself in behind the copy. */}
      <svg
        aria-hidden
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-40 z-0 opacity-60"
      >
        <path
          ref={ridgeRef}
          d="M0 200 L180 150 L268 176 L420 96 L520 140 L640 60 L760 128 L900 84 L1040 148 L1200 110"
          fill="none"
          stroke="url(#pnzRidge)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="pnzRidge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e6b84c" stopOpacity="0" />
            <stop offset="0.5" stopColor="#f6d47c" stopOpacity="0.9" />
            <stop offset="1" stopColor="#e6b84c" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-5 w-full">
        <div
          data-hero-fade
          className="eyebrow mb-5 inline-flex items-center gap-2"
        >
          <span className="pnz-live-dot" />
          For CBSE classes 9 – 12 · runs on a private, keyless brain
        </div>

        <h1
          ref={headlineRef}
          className="font-display font-bold leading-[0.94] tracking-[-0.03em] text-[clamp(2.8rem,9vw,7.5rem)] max-w-5xl"
        >
          <span className="text-cream">Your board buddy,</span>
          <br />
          at the <span className="pnz-shimmer">pinnacle</span> of teaching.
        </h1>

        <p
          data-hero-fade
          className="text-muted max-w-xl mt-8 text-lg leading-relaxed"
        >
          A 24/7 teacher that reads the real NCERT book, teaches one concept at a
          time, draws the diagrams and graphs, and marks you the way the board
          marks — knowing exactly what{" "}
          <em className="text-cream not-italic font-semibold">you</em> need next.
        </p>

        <div data-hero-fade className="flex flex-wrap items-center gap-3 mt-10">
          <span className="pnz-magnet-zone inline-flex">
            <Link
              ref={ctaRef}
              to="/login"
              className="btn-gold text-base !px-7 !py-3.5 pnz-glow"
            >
              Start climbing <ArrowRight size={16} />
            </Link>
          </span>
          <Link to="/pricing" className="btn-ghost text-base !px-6 !py-3.5">
            From ₹100/student
          </Link>
        </div>

        <div data-hero-fade className="mt-8 flex flex-wrap gap-2">
          <span className="chip">Reads the real NCERT</span>
          <span className="chip">Marking-scheme answers</span>
          <span className="chip">Graphs · diagrams · math</span>
          <span className="chip">JEE · NEET · CUET · SAT modes</span>
        </div>
      </div>
    </section>
  );
}
