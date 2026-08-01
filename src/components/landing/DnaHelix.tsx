import { useRef } from "react";
import type * as ThreeNS from "three";
import { useShaderQuad } from "./useShaderQuad";

/**
 * The double helix behind "Knowledge has a structure" — raymarched, and lit by
 * the same procedural studio as the portal so the two hero scenes read as one
 * light rig rather than two effects.
 *
 * Scrolling the section winds the strand. That scrub happens in the shader
 * (uScroll feeds the twist phase), not in JS, so there is no geometry to
 * rebuild and nothing to fall out of sync with the scroll position.
 */
const FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uScroll;
uniform vec2 uPointer; uniform float uFade;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float sdCap(vec3 p, vec3 a, vec3 b, float r) {
  vec3 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

// The helix lives in twist-space: unwinding p.xz turns each strand into a line.
float helix(vec3 p) {
  float TW = 1.15;
  float phase = p.y * TW + uTime * 0.22 + uScroll * 2.4;
  vec3 q = p;
  q.xz *= rot(phase);
  float R = 0.56;
  float sA = length(q.xz - vec2(R, 0.0)) - 0.150;
  float sB = length(q.xz + vec2(R, 0.0)) - 0.150;
  float d = min(sA, sB);
  // Rungs: repeated along the axis, drawn between the two strands.
  float SP = 0.40;
  float yi = floor(p.y / SP + 0.5);
  for (int k = -1; k <= 1; k++) {
    float y = (yi + float(k)) * SP;
    float ph = y * TW + uTime * 0.22 + uScroll * 2.4;
    vec3 r = p; r.y -= y; r.xz *= rot(ph);
    d = min(d, sdCap(r, vec3(-R, 0.0, 0.0), vec3(R, 0.0, 0.0), 0.062));
  }
  return d / (1.0 + R * TW);
}

vec3 env(vec3 d) {
  float up = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 c = mix(vec3(0.030, 0.026, 0.022), vec3(0.135, 0.122, 0.108), up);
  c += vec3(1.0, 0.965, 0.90) * pow(max(dot(d, normalize(vec3(0.52, 0.74, 0.42))), 0.0), 9.0) * 2.6;
  c += vec3(0.80, 0.115, 0.185) * pow(max(dot(d, normalize(vec3(-0.86, 0.12, 0.30))), 0.0), 3.4) * 1.85;
  c += vec3(0.92, 0.735, 0.375) * pow(max(dot(d, normalize(vec3(0.14, -0.84, 0.32))), 0.0), 3.0) * 1.30;
  c += vec3(0.62, 0.66, 0.74) * pow(max(dot(d, normalize(vec3(0.10, 0.20, -0.96))), 0.0), 5.0) * 0.70;
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  // Sits right of centre so the left-anchored copy keeps clean darkness.
  uv.x -= 0.30;
  vec3 ro = vec3(0.0, 0.0, 2.75);
  vec3 rd = normalize(vec3(uv, -1.75));
  float sway = uPointer.x * 0.13;
  ro.xz *= rot(sway); rd.xz *= rot(sway);
  ro.y += uPointer.y * 0.20;

  float t = 0.0, hit = 0.0;
  for (int i = 0; i < 110; i++) {
    float d = helix(ro + rd * t);
    if (d < 0.0016) { hit = 1.0; break; }
    t += max(d * 0.85, 0.0016);
    if (t > 9.0) break;
  }

  vec3 col = vec3(0.0);
  if (hit > 0.5) {
    vec3 p = ro + rd * t;
    vec2 e = vec2(0.0022, 0.0);
    vec3 n = normalize(vec3(
      helix(p + e.xyy) - helix(p - e.xyy),
      helix(p + e.yxy) - helix(p - e.yxy),
      helix(p + e.yyx) - helix(p - e.yyx)));
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 2.6);
    col = env(reflect(rd, n)) * (0.42 + fres * 1.55);
    // Key-lit diffuse gives the tubes a lit side, which pure reflection cannot.
    vec3 L = normalize(vec3(0.52, 0.74, 0.42));
    float dif = max(dot(n, L), 0.0);
    col += mix(vec3(0.30, 0.055, 0.085), vec3(0.62, 0.50, 0.30), dif) * (0.16 + dif * 0.52);
    vec3 rim = mix(vec3(0.74, 0.10, 0.17), vec3(0.93, 0.77, 0.44), clamp(p.y * 0.20 + 0.50, 0.0, 1.0));
    col += rim * pow(fres, 1.4) * 1.05;
    col *= 1.0 - clamp((t - 2.0) * 0.10, 0.0, 0.42);
  }

  col *= uFade;
  col += (hash(gl_FragCoord.xy + fract(uTime) * 91.0) - 0.5) * 0.020;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

export function DnaHelix() {
  const host = useRef<HTMLDivElement>(null);
  const fade = useRef(0);

  useShaderQuad({
    hostRef: host,
    fragmentShader: FRAG,
    buildUniforms: (THREE) => ({
      uRes: { value: new THREE.Vector2(2, 2) },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uFade: { value: 0 },
    }),
    onFrame: ({ uniforms, pointer, elapsed, rect }) => {
      fade.current += (1 - fade.current) * 0.03;
      uniforms.uFade.value = fade.current;
      uniforms.uTime.value = elapsed;
      const travel = (window.innerHeight - rect.top) / (rect.height + window.innerHeight);
      uniforms.uScroll.value = travel < 0 ? 0 : travel > 1 ? 1 : travel;
      (uniforms.uPointer.value as ThreeNS.Vector2).lerp(pointer, 0.055);
    },
  });

  return <div ref={host} className="pa-stage" aria-hidden="true" />;
}
