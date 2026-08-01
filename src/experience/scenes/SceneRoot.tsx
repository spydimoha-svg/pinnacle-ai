import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import type { ChapterId } from "../lib/chapters";
import { isChapterLive, localProgress } from "../lib/chapters";
import type { Tier } from "../lib/useExperience";
import { BookScene } from "./book/BookScene";
import { DustField } from "./book/DustField";
import { KnowledgeField } from "./knowledge/KnowledgeField";

export type SceneRootProps = {
  master: MotionValue<number>;
  active: ChapterId;
  tier: Tier;
  reduced: boolean;
};

/** Per-tier render settings. Everything expensive is a function of this. */
const TIER_SETTINGS: Record<Tier, { dpr: [number, number]; dust: number; shadows: boolean }> = {
  low: { dpr: [1, 1.2], dust: 220, shadows: false },
  mid: { dpr: [1, 1.6], dust: 700, shadows: false },
  high: { dpr: [1, 2], dust: 1600, shadows: true },
};

export function SceneRoot({ master, tier, reduced }: SceneRootProps) {
  const settings = TIER_SETTINGS[tier];

  // PerformanceMonitor can downgrade us at runtime if the machine turns out
  // slower than the static tier guess. Static detection reads specs; this
  // reads reality.
  const [degraded, setDegraded] = useState(false);
  const effective = degraded
    ? { ...settings, dust: Math.round(settings.dust * 0.4), shadows: false }
    : settings;

  return (
    <Canvas
      className="pnz-canvas"
      dpr={effective.dpr}
      gl={{
        antialias: tier === "high",
        alpha: true,
        powerPreference: "high-performance",
        // The narrative lives in near-black; ACES keeps the crimson and gold
        // from clipping to flat colour when the bloom comes up in ch. 8.
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 100 }}
      // The scene is pure atmosphere until it is scrolled into; no point
      // paying for frames nobody sees.
      frameloop="always"
    >
      <PerformanceMonitor
        onDecline={() => setDegraded(true)}
        // A couple of bad seconds is noise; sustained decline is a real signal.
        flipflops={3}
      />
      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />

      {/* Near-darkness to open, per the brief. Light grows with the story. */}
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 18]} />

      <Suspense fallback={null}>
        <Cinematography master={master} reduced={reduced} />
        <BookScene master={master} reduced={reduced} tier={tier} />
        <DustField count={effective.dust} master={master} reduced={reduced} />
        <KnowledgeField master={master} reduced={reduced} tier={tier} />
      </Suspense>
    </Canvas>
  );
}

/**
 * The camera as a cinematographer, per the Motion Bible: slow dollies, subtle
 * orbit, no linear moves, no shake except on impact.
 *
 * Reads the motion value inside useFrame rather than subscribing, so camera
 * work never triggers a React render.
 */
function Cinematography({
  master,
  reduced,
}: {
  master: MotionValue<number>;
  reduced: boolean;
}) {
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const p = master.get();
    const cam = state.camera;

    // Chapter 1 dollies slowly in from 6.6 to 4.9 — the "camera slowly dollies
    // inward" beat. Later chapters pull back out for the finale.
    const dolly =
      p < 0.13
        ? THREE.MathUtils.lerp(6.6, 4.9, localProgress(p, "book"))
        : p > 0.92
          ? THREE.MathUtils.lerp(4.9, 9.5, localProgress(p, "finale"))
          : 4.9;

    // Cursor gives a restrained parallax orbit — it should read as the room
    // breathing, not as a joystick. 0.42 was far too much: against a book only
    // 0.3 deep it slid the cover clean off the page block and the two read as
    // separate objects. Kept well under the book's depth.
    const px = reduced ? 0 : pointer.current.x * 0.16;
    const py = reduced ? 0 : pointer.current.y * 0.1;

    const damp = 1 - Math.pow(0.0016, delta); // frame-rate independent easing
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, px, damp);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, py, damp);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, dolly, damp * 0.6);
    cam.lookAt(target.current);
  });

  useFrame(({ pointer: p }) => {
    pointer.current.x = p.x;
    pointer.current.y = p.y;
  });

  return null;
}

export { isChapterLive };
