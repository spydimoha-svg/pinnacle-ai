import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Momentum scrolling for the public marketing pages.
 *
 * Scoped deliberately: the app shell (Tutor, Papers) has its own internal
 * scroll containers, and hijacking the window scroll there fights them.
 *
 * The important part is the clock. Lenis and GSAP must share ONE ticker —
 * running Lenis on its own requestAnimationFrame while ScrollTrigger runs on
 * gsap.ticker means the two disagree about the scroll position by up to a
 * frame, which reads as exactly the judder Lenis is supposed to remove. So
 * Lenis is driven off gsap.ticker, and every Lenis scroll event pushes
 * ScrollTrigger forward in the same tick.
 */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    // A user who asked the OS for less motion should get the native scroll.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Coarse pointers (phones) already have excellent native momentum —
    // layering Lenis on top makes it feel laggy, not smoother.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Exponential ease-out: fast pickup, long quiet settle.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });

    // One clock: Lenis advances on GSAP's ticker, and ScrollTrigger is
    // recomputed from Lenis's own scroll event rather than the native one.
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000); // gsap ticker is in seconds
    gsap.ticker.add(tick);
    // Frame-drop compensation makes GSAP jump time forward after a stall,
    // which teleports a smooth-scrolled page. Off.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP's default
      lenis.destroy();
    };
  }, [enabled]);
}
