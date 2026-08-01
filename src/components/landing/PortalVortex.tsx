import { useRef } from "react";
import type * as ThreeNS from "three";
import { useShaderQuad } from "./useShaderQuad";

/**
 * A raymarched liquid-metal column, twisted and rippling — the portal behind
 * the hero.
 *
 * Deliberately texture-free: the studio it reflects is procedural, so the
 * whole scene is one shader program and zero samplers. Black chrome with
 * crimson at the base and gold at the crown, which is the brand read as light
 * rather than as paint.
 */
const FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uPointer; uniform float uFade;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// The column: twisted over its height, its radius rippled by travelling folds.
float column(vec3 p) {
  p.xz *= rot(p.y * 0.62 + uTime * 0.10 + uPointer.x * 0.42);
  float a = atan(p.z, p.x);
  float r = length(p.xz);
  float base = 0.50 + sin(p.y * 0.42) * 0.05;
  float folds = sin(a * 7.0 + p.y * 3.1 - uTime * 1.05) * 0.052
              + sin(a * 3.0 - p.y * 2.2 + uTime * 0.68) * 0.074
              + sin(p.y * 5.6 + uTime * 1.45) * 0.028;
  folds += (noise(vec2(a * 2.6, p.y * 1.9 - uTime * 0.26)) - 0.5) * 0.085;
  return r - (base + folds);
}

// The procedural studio the metal reflects: soft key, crimson kicker, gold bounce.
vec3 env(vec3 d) {
  float up = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 c = mix(vec3(0.006, 0.005, 0.004), vec3(0.032, 0.029, 0.026), up);
  c += vec3(1.0, 0.965, 0.90) * pow(max(dot(d, normalize(vec3(0.52, 0.74, 0.42))), 0.0), 42.0) * 2.2;
  c += vec3(0.80, 0.115, 0.185) * pow(max(dot(d, normalize(vec3(-0.86, 0.12, 0.30))), 0.0), 11.0) * 1.05;
  c += vec3(0.92, 0.735, 0.375) * pow(max(dot(d, normalize(vec3(0.14, -0.84, 0.32))), 0.0), 9.0) * 0.52;
  c += vec3(0.62, 0.66, 0.74) * pow(max(dot(d, normalize(vec3(0.10, 0.20, -0.96))), 0.0), 16.0) * 0.26;
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 0.0, 3.45);
  vec3 rd = normalize(vec3(uv, -2.05));
  float sway = uPointer.x * 0.16;
  ro.xz *= rot(sway); rd.xz *= rot(sway);
  ro.y += uPointer.y * 0.22;

  float t = 0.0; float hit = 0.0;
  for (int i = 0; i < 64; i++) {
    float d = column(ro + rd * t);
    if (d < 0.0018) { hit = 1.0; break; }
    t += d * 0.82;
    if (t > 8.0) break;
  }

  vec3 col = vec3(0.0);
  if (hit > 0.5) {
    vec3 p = ro + rd * t;
    vec2 e = vec2(0.0014, 0.0);
    vec3 n = normalize(vec3(
      column(p + e.xyy) - column(p - e.xyy),
      column(p + e.yxy) - column(p - e.yxy),
      column(p + e.yyx) - column(p - e.yyx)));
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.6);
    col = env(reflect(rd, n)) * (0.055 + fres * 1.15);
    // The rim runs crimson at the base into gold at the crown.
    vec3 rim = mix(vec3(0.74, 0.10, 0.17), vec3(0.93, 0.77, 0.44), clamp(p.y * 0.17 + 0.52, 0.0, 1.0));
    col += rim * pow(fres, 1.5) * 0.42;
    col *= 1.0 - clamp((t - 2.0) * 0.15, 0.0, 0.52);
  }

  float vig = length(uv * vec2(0.70, 1.0));
  col *= 1.0 - smoothstep(0.34, 1.05, vig);
  col *= uFade;
  col += (hash(gl_FragCoord.xy + fract(uTime) * 91.0) - 0.5) * 0.020;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

export function PortalVortex() {
  const host = useRef<HTMLDivElement>(null);
  const fade = useRef(0);

  useShaderQuad({
    hostRef: host,
    fragmentShader: FRAG,
    buildUniforms: (THREE) => ({
      uRes: { value: new THREE.Vector2(2, 2) },
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uFade: { value: 0 },
    }),
    onFrame: ({ uniforms, pointer, elapsed }) => {
      // The scene doesn't cut in, it surfaces — a slow exponential lift out of
      // black that lands under the title as it finishes rising.
      fade.current += (1 - fade.current) * 0.03;
      uniforms.uFade.value = fade.current;
      uniforms.uTime.value = elapsed;
      (uniforms.uPointer.value as ThreeNS.Vector2).lerp(pointer, 0.055);
    },
  });

  return <div ref={host} className="pa-stage" aria-hidden="true" />;
}
