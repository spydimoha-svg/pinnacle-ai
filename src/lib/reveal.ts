import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll reveals for the marketing pages.
 *
 * Replaces one framer-motion IntersectionObserver + React state update per
 * element with a single batched ScrollTrigger pass. Nothing re-renders while
 * you scroll — GSAP writes transforms straight to the DOM, and batching means
 * a row of cards animates as one stagger instead of three racing observers.
 *
 * Only opacity and translate are touched, so every reveal stays composited.
 */
export function useReveals(deps: unknown[] = []) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = gsap.utils.toArray<HTMLElement>(".pnz-reveal");
    if (!targets.length) return;

    if (reduced.matches) {
      // Show everything immediately; never leave content hidden.
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 26, willChange: "transform, opacity" });

      ScrollTrigger.batch(targets, {
        start: "top 88%",
        once: true,
        batchMax: 3,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            stagger: 0.09,
            overwrite: true,
            // Drop the layer hint once settled so we don't hold memory
            // for elements that will never move again.
            onComplete() {
              gsap.set(this.targets(), { willChange: "auto" });
            },
          }),
      });
    });

    // Late-loading fonts and images shift layout; stale trigger positions are
    // the usual cause of a reveal firing at the wrong scroll offset.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
