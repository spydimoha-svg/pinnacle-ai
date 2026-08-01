import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import { localProgress } from "../../lib/chapters";
import { emitOnce } from "../../lib/events";
import type { Tier } from "../../lib/useExperience";
import {
  ATLAS_COLS,
  ATLAS_ROWS,
  buildGlyphAtlas,
  layoutWords,
} from "./glyphAtlas";

/**
 * Chapters 3-4: real formulas and letters escape the open book, drift, then
 * settle into words.
 *
 * Every fleck is a textured glyph from a runtime atlas, not a coloured quad —
 * a quad is confetti no matter how it moves. Instanced so 120 glyphs cost one
 * draw call, with a per-instance UV offset choosing which atlas cell each one
 * shows, and a second offset it lerps toward so a glyph can BECOME the letter
 * it needs to be when the word assembles.
 */

type Archetype = "orbit" | "spiral" | "drift" | "fold" | "flock";
const ARCHETYPES: Archetype[] = ["orbit", "spiral", "drift", "fold", "flock"];

const TIER_COUNT: Record<Tier, number> = { low: 44, mid: 84, high: 128 };

/** The words the swarm resolves into. */
const WORDS = ["IT DOESNT", "MEMORISE"];

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _home = new THREE.Vector3();

type Glyph = {
  archetype: Archetype;
  seed: number;
  radius: number;
  speed: number;
  phase: number;
  scale: number;
  spin: THREE.Vector3;
  delay: number;
  /** Atlas cell while loose. */
  cellFree: number;
  /** Atlas cell + position once it lands in a word; null = never lands. */
  slot: { x: number; y: number; cell: number } | null;
};

function buildGlyphs(count: number): Glyph[] {
  const slots = layoutWords(WORDS);
  const out: Glyph[] = [];

  for (let i = 0; i < count; i++) {
    // Only as many glyphs as the words need actually land; the rest keep
    // drifting behind, which is what stops the assembly reading as a grid.
    const slot = i < slots.length ? slots[i] : null;

    out.push({
      archetype: ARCHETYPES[i % ARCHETYPES.length],
      seed: Math.random(),
      radius: 0.8 + Math.random() * 2.4,
      speed: 0.22 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      scale: 0.15 + Math.random() * 0.12,
      spin: new THREE.Vector3(
        (Math.random() - 0.5) * 0.9,
        (Math.random() - 0.5) * 0.9,
        (Math.random() - 0.5) * 0.6
      ),
      delay: Math.random() * 0.4,
      cellFree: Math.floor(Math.random() * ATLAS_COLS * ATLAS_ROWS),
      slot,
    });
  }
  return out;
}

function escapePosition(g: Glyph, t: number, out: THREE.Vector3): THREE.Vector3 {
  const a = g.phase + t * g.speed;
  switch (g.archetype) {
    case "orbit":
      return out.set(
        Math.cos(a) * g.radius,
        Math.sin(a * 0.6) * g.radius * 0.4,
        Math.sin(a) * g.radius * 0.6
      );
    case "spiral": {
      const r = g.radius * (0.4 + 0.6 * ((Math.sin(a * 0.4) + 1) * 0.5));
      return out.set(Math.cos(a * 1.5) * r, (a * 0.1) % 2.6 - 1.1, Math.sin(a * 1.5) * r);
    }
    case "drift":
      return out.set(
        Math.sin(a * 0.45) * g.radius,
        Math.cos(a * 0.3) * g.radius * 0.65,
        Math.sin(a * 0.2 + g.seed * 6) * g.radius * 0.5
      );
    case "fold": {
      const k = Math.sin(a * 0.65);
      return out.set(k * g.radius, Math.cos(a * 0.85) * 0.95, -Math.abs(k) * g.radius * 0.45);
    }
    case "flock":
    default: {
      const head = t * 0.3;
      return out.set(
        Math.cos(head + g.seed * 2.2) * g.radius,
        Math.sin(head * 1.2 + g.seed * 4.1) * 1.1,
        Math.sin(head + g.seed * 2.2) * g.radius * 0.7
      );
    }
  }
}

export function KnowledgeField({
  master,
  reduced,
  tier,
}: {
  master: MotionValue<number>;
  reduced: boolean;
  tier: Tier;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = TIER_COUNT[tier];
  const glyphs = useMemo(() => buildGlyphs(count), [count]);
  const atlas = useMemo(() => buildGlyphAtlas(), []);

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1), []);

  /* Per-instance UV offset. Drives which atlas cell an instance samples, and
     it is animated, so a drifting formula can morph into the exact letter its
     word slot needs as it lands. */
  const uvOffset = useMemo(
    () => new THREE.InstancedBufferAttribute(new Float32Array(count * 2), 2),
    [count]
  );

  const material = useMemo(() => {
    const m = new THREE.MeshBasicMaterial({
      map: atlas,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });

    // Patch the built-in shader rather than writing one from scratch: we only
    // need per-instance UV windowing, and this keeps three's instancing,
    // fog and colour management intact.
    m.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
           attribute vec2 aUvOffset;
           varying vec2 vCell;`
        )
        .replace(
          "#include <uv_vertex>",
          `#include <uv_vertex>
           vCell = aUvOffset;`
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
           varying vec2 vCell;
           const vec2 CELL = vec2(1.0 / ${ATLAS_COLS}.0, 1.0 / ${ATLAS_ROWS}.0);`
        )
        .replace(
          "#include <map_fragment>",
          `vec2 cellUv = vCell + fract(vMapUv) * CELL;
           vec4 sampledDiffuseColor = texture2D(map, cellUv);
           diffuseColor *= sampledDiffuseColor;`
        );
    };
    return m;
  }, [atlas]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const parchment = new THREE.Color("#e8e2d2");
    const crimson = new THREE.Color("#d8404c");
    const gold = new THREE.Color("#e6b84c");
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      const c = r > 0.88 ? gold : r > 0.7 ? crimson : parchment;
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const im = mesh.current;
    if (!im) return;

    const p = master.get();
    const pRelease = localProgress(p, "release");
    const pAbout = localProgress(p, "about");
    const t = reduced ? 0 : state.clock.elapsedTime;

    if (pRelease > 0.03) emitOnce("KNOWLEDGE_RELEASE", { progress: pRelease });

    const uvArr = uvOffset.array as Float32Array;

    for (let i = 0; i < glyphs.length; i++) {
      const g = glyphs[i];

      const born = THREE.MathUtils.clamp((pRelease - g.delay) / (1 - g.delay), 0, 1);
      const settleRaw = g.slot
        ? THREE.MathUtils.clamp((pAbout - (0.3 - g.delay * 0.4)) / 0.45, 0, 1)
        : 0;
      const settle = settleRaw * settleRaw * (3 - 2 * settleRaw);

      escapePosition(g, t, _p);
      // Emerge from inside the open book rather than appearing mid-orbit.
      _p.multiplyScalar(0.15 + 0.85 * born);
      _p.y -= (1 - born) * 0.9;

      if (g.slot) {
        _home.set(g.slot.x, g.slot.y, -0.9);
        _p.lerp(_home, settle);
      }

      // Free glyphs tumble; landing ones square up to face the reader.
      _e.set(
        g.spin.x * t * (1 - settle) + g.phase * (1 - settle),
        g.spin.y * t * (1 - settle) + g.phase * (1 - settle),
        g.spin.z * t * (1 - settle)
      );
      _q.setFromEuler(_e);

      const s = g.scale * (0.3 + 0.7 * born) * (1 + settle * 0.25);
      _s.set(s, s, s);

      _m.compose(_p, _q, _s);
      im.setMatrixAt(i, _m);

      // Morph the glyph itself into the letter its slot needs, right at the
      // end of the settle so the change is hidden by the motion.
      const cell = g.slot && settle > 0.72 ? g.slot.cell : g.cellFree;
      uvArr[i * 2] = (cell % ATLAS_COLS) / ATLAS_COLS;
      uvArr[i * 2 + 1] = 1 - (Math.floor(cell / ATLAS_COLS) + 1) / ATLAS_ROWS;
    }

    im.instanceMatrix.needsUpdate = true;
    uvOffset.needsUpdate = true;

    const out = 1 - THREE.MathUtils.clamp((p - 0.6) / 0.06, 0, 1);
    const rising = THREE.MathUtils.clamp(pRelease * 3, 0, 1);
    material.opacity = 0.95 * out * rising;
    im.visible = material.opacity > 0.01;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, count]}
      frustumCulled={false}
      // eslint-disable-next-line react/no-unknown-property
      instanceColor={new THREE.InstancedBufferAttribute(colors, 3)}
    >
      {/* eslint-disable-next-line react/no-unknown-property */}
      <instancedBufferAttribute attach="geometry-attributes-aUvOffset" args={[uvOffset.array as Float32Array, 2]} />
    </instancedMesh>
  );
}
