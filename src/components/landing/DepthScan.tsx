import { useRef, useState, type RefObject } from "react";
import type * as ThreeNS from "three";
import { useShaderQuad } from "./useShaderQuad";

const COLOR_SRC = "/landing/scan-color.png";
const DEPTH_SRC = "/landing/scan-depth.webp";

/**
 * The mastery scene: a photograph displaced by its own depth map, with a tiled
 * dot matrix that lights only where the scan plane crosses that depth — so the
 * dots crawl over the form in three dimensions instead of sitting flat on it.
 *
 * The sweep is driven by how far the (240vh, sticky) section has travelled,
 * which is why it takes the outer section rather than measuring its own host:
 * a sticky element's own rect stops moving, so it can't tell you anything
 * about scroll progress.
 *
 * If WebGL or either texture is unavailable, the flat photograph is the
 * fallback — the section still says what it means without the scan.
 */
const FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uMap; uniform sampler2D uDepth;
uniform vec2 uPointer; uniform float uProgress; uniform float uAspect;
varying vec2 vUv;

float cellNoise(vec2 p) {
  vec2 i = floor(p);
  return fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453123);
}

float dotField(vec2 uv, float depth) {
  vec2 tUv = vec2(uv.x * uAspect, uv.y);
  vec2 tiling = vec2(120.0);
  vec2 tiled = mod(tUv * tiling, 2.0) - 1.0;
  float bright = cellNoise(tUv * tiling * 0.5);
  float dots = (1.0 - smoothstep(0.49, 0.5, length(tiled))) * bright;
  // Only the shell of the form at the current scan depth lights up.
  float flow = 1.0 - smoothstep(0.0, 0.035, abs(depth - uProgress));
  return dots * flow;
}

void main() {
  float depth = texture2D(uDepth, vUv).r;
  vec4 src = texture2D(uMap, vUv + depth * uPointer * 0.01);
  float m = dotField(vUv, depth) * 14.0;
  float glow = 0.0;
  for (int i = 0; i < 6; i++) {
    float a = float(i) * 1.0472;
    vec2 o = vec2(cos(a), sin(a)) * 0.007;
    glow += dotField(vUv + o, texture2D(uDepth, vUv + o).r);
  }
  glow = glow / 6.0 * 5.2;
  vec3 mask = vec3(m + glow, glow * 0.10, glow * 0.14);
  vec3 col = 1.0 - (1.0 - src.rgb) * (1.0 - mask);
  float band = 1.0 - smoothstep(0.0, 0.05, abs(vUv.y - uProgress));
  col += vec3(0.86, 0.05, 0.10) * band * 0.30;
  float a = max(src.a, min(1.0, m + glow));
  gl_FragColor = vec4(col, a);
}
`;

const VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

export function DepthScan({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const host = useRef<HTMLDivElement>(null);
  const at = useRef<number | null>(null);
  const [failed, setFailed] = useState(false);

  useShaderQuad({
    hostRef: host,
    fragmentShader: FRAG,
    vertexShader: VERT,
    alpha: true,
    antialias: true,
    clearColor: null,
    scale: 1,
    maxPixelRatio: 1.75,
    autoReveal: false,
    fadeMs: 900,
    onFail: () => setFailed(true),
    buildUniforms: (THREE) => ({
      uMap: { value: null },
      uDepth: { value: null },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uProgress: { value: 0 },
      uAspect: { value: 1 },
    }),
    onInit: ({ THREE, uniforms, canvas, reveal }) => {
      const loader = new THREE.TextureLoader();
      let pending = 2;
      let broke = false;

      const give = () => {
        if (broke) return;
        broke = true;
        canvas.style.display = "none";
        setFailed(true);
      };
      const done = () => {
        if (--pending === 0 && !broke) reveal();
      };

      const color = loader.load(COLOR_SRC, done, undefined, give);
      const depth = loader.load(DEPTH_SRC, done, undefined, give);
      for (const t of [color, depth]) {
        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;
      }
      uniforms.uMap.value = color;
      uniforms.uDepth.value = depth;

      // TextureLoader never errors on a stalled response, only on a failed
      // one, so a hung request has to be timed out by hand.
      window.setTimeout(() => {
        if (pending > 0) give();
      }, 8000);
    },
    onFrame: ({ uniforms, pointer }) => {
      const section = sectionRef.current;
      if (!section) return false;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -vh * 0.3 || r.top > vh * 1.3) return false;

      let travel = (vh - r.top) / (r.height + vh);
      travel = travel < 0 ? 0 : travel > 1 ? 1 : travel;
      // The sweep spends itself across the middle of the section and is held
      // at both ends, so it doesn't start mid-form or finish off-screen.
      let swept = (travel - 0.16) / 0.68;
      swept = swept < 0 ? 0 : swept > 1 ? 1 : swept;
      if (at.current === null) at.current = swept;
      at.current += (swept - at.current) * 0.1;

      uniforms.uProgress.value = at.current;
      (uniforms.uPointer.value as ThreeNS.Vector2).lerp(pointer, 0.08);
    },
  });

  return (
    <div ref={host} className="pa-scan-stage" aria-hidden="true">
      <img
        className="pa-scan-fallback"
        src={COLOR_SRC}
        alt=""
        style={failed ? { opacity: 0.85 } : undefined}
      />
    </div>
  );
}
