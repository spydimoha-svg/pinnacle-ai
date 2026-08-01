import { useEffect, useRef, type RefObject } from "react";
import type * as ThreeNS from "three";

type Three = typeof ThreeNS;

export type QuadContext = {
  THREE: Three;
  renderer: ThreeNS.WebGLRenderer;
  material: ThreeNS.ShaderMaterial;
  uniforms: Record<string, ThreeNS.IUniform>;
  canvas: HTMLCanvasElement;
  host: HTMLElement;
  /** Pointer in clip space (-1..1, y up). Stays at origin under reduced motion. */
  pointer: ThreeNS.Vector2;
  /** Seconds since the scene came up. Frozen at 0 under reduced motion. */
  elapsed: number;
  /** Host rect for this frame — already measured, don't measure again. */
  rect: DOMRect;
  reveal: () => void;
};

type Options = {
  hostRef: RefObject<HTMLElement | null>;
  fragmentShader: string;
  vertexShader?: string;
  buildUniforms: (THREE: Three) => Record<string, ThreeNS.IUniform>;
  /** Runs once the context exists, before the first frame. */
  onInit?: (ctx: Omit<QuadContext, "elapsed" | "rect">) => void;
  /** Per frame. Return false to skip the draw (the loop keeps running). */
  onFrame?: (ctx: QuadContext) => boolean | void;
  /** WebGL unavailable, context creation threw, or an asset gave up. */
  onFail?: () => void;
  alpha?: boolean;
  antialias?: boolean;
  /** Null leaves the buffer transparent. */
  clearColor?: number | null;
  preserveDrawingBuffer?: boolean;
  /** Backing-store scale. Raymarching costs per pixel, so nothing renders 1:1. */
  scale?: number;
  maxPixelRatio?: number;
  /** Fade the canvas in as soon as it can paint. Off when assets gate it. */
  autoReveal?: boolean;
  fadeMs?: number;
};

/**
 * Every scene on this page is the same object: one full-screen triangle-pair
 * running a raymarcher, driven by scroll and pointer. So they share one
 * lifecycle — context, sizing, viewport gating, teardown — and differ only in
 * their fragment shader and per-frame uniform writes.
 *
 * three is imported dynamically on purpose. The landing page is the first
 * thing every visitor loads, and three is ~600 KB; pulling it into the page
 * chunk would put the whole library in front of the first paint for a page
 * that is legible without any of it. It arrives after, and the scenes fade up
 * when they're ready.
 */
export function useShaderQuad({
  hostRef,
  fragmentShader,
  vertexShader = "void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }",
  buildUniforms,
  onInit,
  onFrame,
  onFail,
  alpha = false,
  antialias = false,
  clearColor = 0x050505,
  preserveDrawingBuffer = false,
  scale = 0.72,
  maxPixelRatio = 1,
  autoReveal = true,
  fadeMs = 1400,
}: Options) {
  // Everything the effect needs but must not re-run for. The scene is built
  // once; the callbacks are read through refs so a parent re-render never
  // tears down a live WebGL context.
  const cbs = useRef({ buildUniforms, onInit, onFrame, onFail });
  cbs.current = { buildUniforms, onInit, onFrame, onFail };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let raf = 0;
    let renderer: ThreeNS.WebGLRenderer | null = null;
    let canvas: HTMLCanvasElement | null = null;
    let onResize: (() => void) | null = null;
    let onPointer: ((e: PointerEvent) => void) | null = null;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // A phone GPU raymarching at desktop resolution drops to single-digit fps.
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    const renderScale = coarse ? Math.min(scale, 0.55) : scale;

    const fail = () => {
      if (disposed) return;
      if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
      canvas = null;
      cbs.current.onFail?.();
    };

    import("three")
      .then((THREE) => {
        if (disposed || !hostRef.current) return;

        canvas = document.createElement("canvas");
        canvas.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;" +
          `transition:opacity ${fadeMs}ms cubic-bezier(.22,1,.36,1);`;
        host.appendChild(canvas);

        try {
          renderer = new THREE.WebGLRenderer({
            canvas,
            alpha,
            antialias,
            preserveDrawingBuffer,
            powerPreference: "high-performance",
          });
        } catch {
          fail();
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
        if (clearColor === null) renderer.setClearColor(0x000000, 0);
        else renderer.setClearColor(clearColor, 1);

        const uniforms = cbs.current.buildUniforms(THREE);
        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
          transparent: alpha,
        });
        const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        quad.frustumCulled = false;
        const scene = new THREE.Scene();
        scene.add(quad);
        const camera = new THREE.Camera();

        const pointer = new THREE.Vector2(0, 0);
        const reveal = () => {
          if (canvas) canvas.style.opacity = "1";
        };

        // A lost context must not leave the rAF loop spinning on a dead
        // renderer — bail out and show whatever fallback the scene has.
        canvas.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
        });

        const size = () => {
          const r = host.getBoundingClientRect();
          if (r.width < 2 || r.height < 2 || !renderer || !canvas) return;
          renderer.setSize(
            Math.round(r.width * renderScale),
            Math.round(r.height * renderScale),
            false,
          );
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          if (uniforms.uRes) {
            (uniforms.uRes.value as ThreeNS.Vector2).set(
              r.width * renderScale,
              r.height * renderScale,
            );
          }
        };
        size();
        onResize = size;
        window.addEventListener("resize", size);

        if (!reduced) {
          onPointer = (e: PointerEvent) => {
            pointer.set(
              (e.clientX / window.innerWidth) * 2 - 1,
              -((e.clientY / window.innerHeight) * 2 - 1),
            );
          };
          window.addEventListener("pointermove", onPointer, { passive: true });
        }

        const base: Omit<QuadContext, "elapsed" | "rect"> = {
          THREE,
          renderer,
          material,
          uniforms,
          canvas,
          host,
          pointer,
          reveal,
        };
        cbs.current.onInit?.(base);
        if (autoReveal) reveal();

        const t0 = performance.now();
        const tick = () => {
          raf = requestAnimationFrame(tick);
          if (!renderer) return;
          const rect = host.getBoundingClientRect();
          // Off-screen scenes cost nothing. Each one owns a full viewport of
          // pixels, and there are three of them on this page.
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;
          const ctx: QuadContext = {
            ...base,
            elapsed: reduced ? 0 : (performance.now() - t0) / 1000,
            rect,
          };
          if (cbs.current.onFrame?.(ctx) === false) return;
          renderer.render(scene, camera);
        };
        tick();
      })
      .catch(fail);

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      if (onResize) window.removeEventListener("resize", onResize);
      if (onPointer) window.removeEventListener("pointermove", onPointer);
      if (renderer) {
        renderer.dispose();
        try {
          renderer.forceContextLoss();
        } catch {
          /* already gone */
        }
      }
      if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
    };
    // Built once per mount. Shader source and options are constants at every
    // call site; the mutable parts travel through `cbs`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
