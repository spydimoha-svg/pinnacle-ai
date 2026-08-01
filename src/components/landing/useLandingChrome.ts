import { useEffect, type RefObject } from "react";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const DOTS = 9;

/**
 * Everything on the landing page that reacts to scroll or pointer but isn't
 * WebGL: the title-card dismissal, the reveal pass, the chapter rail on the
 * right, and the light that follows the cursor across the header.
 *
 * rAF is the source of truth and the scroll listener is only a fast path, so a
 * coalesced or dropped scroll event can never leave the narrative frozen
 * mid-chapter. Both call the same sync, which bails immediately when nothing
 * has moved and no reveal is still pending.
 *
 * Note this page runs on native scroll — no Lenis. Every scene here already
 * eases toward its own scroll target in its render loop, and layering momentum
 * scrolling underneath that smooths an already-smoothed value, which reads as
 * lag between the copy and the scene behind it.
 */
export function useLandingChrome(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.documentElement.classList.add("pa-lock");

    const nav = root.querySelector<HTMLElement>("[data-pa-nav]");
    const vignette = root.querySelector<HTMLElement>("[data-pa-vignette]");
    const intro = root.querySelector<HTMLElement>("[data-pa-intro]");
    const introBar = root.querySelector<HTMLElement>("[data-pa-intro-bar]");
    const header = root.querySelector<HTMLElement>("[data-pa-header]");
    const dots = Array.from(root.querySelectorAll<HTMLElement>("[data-pa-dot]"));
    const reveals = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Anything already inside the first screen is treated as arrived — a page
    // that fades its own hero in on load just looks slow.
    for (const el of reveals) {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.82) {
        el.dataset.hidden = "1";
      }
    }
    let pending = reveals.some((el) => el.dataset.hidden === "1");

    let introDone = false;
    const t0 = performance.now();

    /* The title card dismisses itself in pure CSS. It must never be able to
       gate the page on WebGL or on a timer firing — this only fast-forwards it
       when the visitor starts scrolling before it has finished. */
    const finishIntro = () => {
      if (introDone) return;
      introDone = true;
      if (introBar) {
        introBar.style.animation = "none";
        introBar.style.width = "100%";
      }
      if (intro) {
        intro.style.animation = "none";
        intro.style.transition = "opacity 700ms cubic-bezier(.22,1,.36,1)";
        intro.style.opacity = "0";
      }
    };

    let lastY = -1;

    const sync = () => {
      const y = window.scrollY;
      const moved = y !== lastY;
      if (!moved && !pending) return;
      lastY = y;

      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = clamp(y / max, 0, 1);

      if (moved) {
        if (nav) nav.style.opacity = p > 0.09 ? "1" : "0";

        const idx = Math.min(DOTS, Math.floor(p * (DOTS - 0.001)) + 1);
        dots.forEach((d, i) => {
          const on = i + 1 === idx;
          d.style.width = on ? "22px" : "10px";
          // The rail warms to gold as the page arrives at its last chapter.
          d.style.background = on
            ? p > 0.78
              ? "rgba(232,200,137,0.95)"
              : "rgba(255,255,255,0.85)"
            : "rgba(255,255,255,0.22)";
        });

        if (vignette) vignette.style.opacity = String(lerp(1, 0.72, seg(p, 0.78, 1)));
      }

      if (pending) {
        const vh = window.innerHeight;
        pending = false;
        for (const el of reveals) {
          if (el.dataset.hidden !== "1") continue;
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.86 && r.bottom > 0) el.dataset.hidden = "0";
          else pending = true;
        }
      }

      if (!introDone && (p > 0.01 || performance.now() - t0 > 2600)) finishIntro();
    };

    let raf = requestAnimationFrame(function tick() {
      raf = requestAnimationFrame(tick);
      sync();
    });
    const onScroll = () => sync();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Reveal thresholds and the rail are measured against the viewport, so a
    // resize (or a phone rotating) has to re-test everything.
    const onResize = () => {
      lastY = -1;
      pending = reveals.some((el) => el.dataset.hidden === "1");
    };
    window.addEventListener("resize", onResize);

    /* A soft light that follows the cursor across the header. Cheap: one
       gradient string per pointer event on an element that is already its own
       compositing layer. */
    let onPointer: ((e: PointerEvent) => void) | null = null;
    if (!reduced && header) {
      onPointer = (e: PointerEvent) => {
        const r = header.getBoundingClientRect();
        header.style.background =
          `radial-gradient(460px 140px at ${(e.clientX - r.left).toFixed(0)}px ` +
          `${(e.clientY - r.top).toFixed(0)}px, rgba(232,200,137,0.06), rgba(5,5,5,0) 72%)`;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    sync();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (onPointer) window.removeEventListener("pointermove", onPointer);
      document.documentElement.classList.remove("pa-lock");
    };
  }, [rootRef]);
}

/* The landing's type used to be injected here. It now loads from index.html,
   because Hanken Grotesk and JetBrains Mono are the whole product's type, not
   this page's — see the @theme block in index.css. */
