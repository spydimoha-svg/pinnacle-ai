import { Suspense, lazy, useMemo } from "react";
import { ErrorBoundary } from "../ErrorBoundary";

/**
 * The 3D half of a lesson video.
 *
 * A cone is a cone. Showing a student the word "cone" over a voice saying
 * "cone" teaches nothing they did not already have; rotating an actual cone
 * next to its slant height does. So the script can call for a real object, and
 * this renders one — solids for mensuration, an atom for chemistry, the sky for
 * astronomy, a lens bench for optics.
 *
 * Loaded lazily: three.js is heavy, and a student reading a doubt in the Tutor
 * should never pay for a renderer they are not looking at.
 */

export type SceneKind =
  | "cube" | "cuboid" | "sphere" | "cylinder" | "cone" | "hemisphere" | "prism" | "pyramid"
  | "atom" | "solar" | "lens" | "wave" | "molecule";

export interface Scene3D {
  kind: SceneKind;
  /** Dimensions the lesson is actually talking about, in scene units. */
  a?: number;
  b?: number;
  c?: number;
  /** Text label floated next to the object. */
  label?: string;
  spin?: boolean;
}

const SCENE_KINDS: SceneKind[] = [
  "cube", "cuboid", "sphere", "cylinder", "cone", "hemisphere", "prism", "pyramid",
  "atom", "solar", "lens", "wave", "molecule",
];

export function isScene3D(v: unknown): v is Scene3D {
  return Boolean(v && typeof v === "object" && SCENE_KINDS.includes((v as Scene3D).kind));
}

const Canvas3D = lazy(() => import("./Canvas3D"));

export function Stage3D({ scene }: { scene: Scene3D }) {
  // Remounting on every render would restart the animation each tick.
  const key = useMemo(() => `${scene.kind}-${scene.a}-${scene.b}-${scene.c}`, [scene]);
  return (
    <div className="pnz-stage3d">
      {/* three.js throws on geometry it cannot build, WebGL can fail to start
          on a cheap device, and a lazy chunk can fail to download — none of
          which Suspense catches. Any of them would otherwise blank the entire
          page mid-lesson. */}
      <ErrorBoundary
        fallback={
          <div className="pnz-stage3d-loading">
            (The 3D model wouldn't load on this device.)
          </div>
        }
      >
        <Suspense fallback={<div className="pnz-stage3d-loading">building the model…</div>}>
          <Canvas3D key={key} scene={scene} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
