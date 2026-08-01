import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import { localProgress } from "../../lib/chapters";

/**
 * The dust the brief asks the cursor to stir, and the burst the book throws up
 * when it lands.
 *
 * One THREE.Points with a custom shader, not instanced meshes: at 1600
 * particles instancing still costs a draw call's worth of matrix work per
 * frame on the CPU, whereas points move entirely on the GPU. All motion is
 * computed in the vertex shader from a per-particle seed, so the CPU writes
 * exactly four uniforms per frame regardless of particle count.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uImpact;   // 0..1 burst envelope from the book landing
  uniform vec2  uPointer;  // -1..1 cursor, already smoothed on the CPU
  uniform float uSize;

  attribute vec3  aSeed;   // random per particle: drift axis + phase
  attribute float aScale;

  varying float vAlpha;
  varying float vWarm;

  void main() {
    vec3 pos = position;

    // Slow convection. Three incommensurate frequencies so the field never
    // visibly loops.
    float t = uTime * 0.09;
    pos.x += sin(t * 1.31 + aSeed.x * 6.283) * 0.34 * aSeed.z;
    pos.y += cos(t * 0.97 + aSeed.y * 6.283) * 0.28 * aSeed.z;
    pos.z += sin(t * 0.71 + aSeed.z * 6.283) * 0.22 * aSeed.x;

    // Cursor stirs the field: nearer particles are pushed more, which reads
    // as the air moving rather than the dust being dragged.
    float depth = smoothstep(-3.0, 3.0, pos.z);
    pos.xy += uPointer * 0.5 * depth * aSeed.z;

    // Impact burst: radial shove outward and up, decaying with the envelope.
    if (uImpact > 0.001) {
      vec3 dir = normalize(pos - vec3(0.0, -1.6, 0.0) + 0.0001);
      pos += dir * uImpact * 1.9 * aSeed.z;
      pos.y += uImpact * 0.7 * aSeed.x;
    }

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Perspective-correct sizing, clamped so nothing becomes a screen-filling
    // sprite when it drifts past the camera.
    gl_PointSize = clamp(uSize * aScale * (7.0 / -mv.z), 0.6, 9.0);

    // Fade with distance so the field dissolves into the fog instead of
    // ending on a hard edge.
    vAlpha = smoothstep(16.0, 4.0, -mv.z) * (0.22 + 0.78 * aSeed.z);
    vWarm  = step(0.93, aSeed.y); // ~7% carry the crimson
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  varying float vWarm;

  void main() {
    // Round, soft-edged point. Discarding outside the disc is cheaper than
    // sampling a texture and avoids shipping one.
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;

    float soft = smoothstep(0.25, 0.02, d);
    vec3 cool = vec3(0.78, 0.80, 0.92);
    vec3 warm = vec3(0.85, 0.16, 0.20);
    vec3 col  = mix(cool, warm, vWarm);

    gl_FragColor = vec4(col, soft * vAlpha);
  }
`;

export function DustField({
  count,
  master,
  reduced,
}: {
  count: number;
  master: MotionValue<number>;
  reduced: boolean;
}) {
  const points = useRef<THREE.Points>(null);
  const pointer = useRef(new THREE.Vector2());

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Cylindrical-ish volume around the book, denser near the middle.
      const r = Math.pow(Math.random(), 0.62) * 7.5;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8.5;
      positions[i * 3 + 2] = Math.sin(a) * r * 0.7 - 1.0;

      seeds[i * 3] = Math.random();
      seeds[i * 3 + 1] = Math.random();
      seeds[i * 3 + 2] = 0.25 + Math.random() * 0.75;
      scales[i] = 0.5 + Math.random() * 1.6;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 3));
    g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const m = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uImpact: { value: 0 },
        uPointer: { value: new THREE.Vector2() },
        uSize: { value: 2.4 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: g, material: m };
  }, [count]);

  useFrame((state, delta) => {
    const u = material.uniforms;
    u.uTime.value = state.clock.elapsedTime;

    if (!reduced) {
      // Smooth the pointer on the CPU so the shader gets a settled value and
      // the field never snaps.
      pointer.current.lerp(state.pointer, 1 - Math.pow(0.002, delta));
      (u.uPointer.value as THREE.Vector2).copy(pointer.current);
    }

    // Impact envelope: sharp attack the instant the book lands, quick decay.
    const pAct = localProgress(master.get(), "activation");
    const since = pAct - 0.42;
    u.uImpact.value =
      since > 0 && since < 0.3 ? Math.exp(-since * 16) * (1 - Math.exp(-since * 90)) : 0;
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
