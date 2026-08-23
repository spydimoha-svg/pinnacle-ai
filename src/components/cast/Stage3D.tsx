import { Suspense, lazy, useMemo } from "react";
import { ErrorBoundary } from "../ErrorBoundary";

/**
 * The 3D half of a lesson.
 *
 * A cone is a cone. Showing a student the word "cone" over a voice saying
 * "cone" teaches nothing they did not already have; rotating an actual cone
 * next to its slant height does. So the script can call for a real object, and
 * this renders one — solids for mensuration, Bohr shells for chemistry, a ray
 * bench for optics, a lattice for bonding.
 *
 * Two rules govern everything in here, and they are the whole reason the kind
 * vocabulary looks the way it does:
 *
 *   1. NAME THE THING EXACTLY. There is no "lens" and no "mirror". There is
 *      `lens-convex` and `lens-concave`, `mirror-concave` and `mirror-convex`,
 *      and they draw genuinely different ray paths. A converging lens shown
 *      where a diverging one belongs is not a cosmetic slip — it teaches the
 *      opposite physics, and it is the single most common figure error in
 *      generated science material.
 *
 *   2. LABEL EVERY PART. An unlabelled diagram is a picture; a labelled one is
 *      a figure. Each object anchors its labels to the geometry they name, so
 *      "r" sits on the radius it measures and "F" sits at the actual focus.
 *
 * Loaded lazily: three.js is heavy, and a student reading a doubt in the Tutor
 * should never pay for a renderer they are not looking at.
 */

/** Solids — mensuration, surface area and volume. */
export type SolidKind =
  | "cube"
  | "cuboid"
  | "sphere"
  | "cylinder"
  | "cone"
  | "hemisphere"
  | "prism"
  | "pyramid"
  | "frustum";

/** Physics benches. */
export type PhysicsKind =
  | "lens"
  | "mirror"
  | "wave"
  | "incline"
  | "magnet"
  | "solar"
  | "axes";

/** Chemistry. */
export type ChemistryKind = "atom" | "molecule" | "benzene" | "lattice";

export type SceneKind = SolidKind | PhysicsKind | ChemistryKind;

export interface Scene3D {
  kind: SceneKind;
  /**
   * For kind "molecule": WHICH molecule, by formula ("H2O", "CH4", "NH3",
   * "CO2", "SO2", "BF3", "CCl4", "SF6", "PCl5", "H2S").
   *
   * Naming the species is what stops a lookalike being drawn. Asked for
   * ammonia, a numeric "three arms" hint produced a flat trigonal figure;
   * "NH3" resolves to the trigonal pyramid at 107 degrees with its lone pair,
   * which is the entire teaching point of that diagram.
   */
  species?: string;
  /**
   * For kind "lens" and kind "mirror": WHICH one.
   *
   * The same principle as `species`, applied to the other classic lookalike
   * pair. A converging lens drawn where a diverging one belongs teaches the
   * opposite physics, and inferring it from the sign of a numeric field — the
   * old encoding — failed silently every time a model wrote a plain positive
   * number, which is most of the time. Naming it cannot fail that way.
   */
  variant?: "convex" | "concave";
  /** Dimensions the lesson is actually talking about, in scene units. */
  a?: number;
  b?: number;
  c?: number;
  /** Text label floated above the object — usually the figure's caption. */
  label?: string;
  /**
   * Real quantities, in the student's own units, pinned to the parts they
   * measure: { r: "7 cm", h: "24 cm" }. The renderer knows where each key
   * belongs on each shape, so a value can never end up labelling the wrong
   * edge. Unknown keys are ignored rather than drawn somewhere arbitrary.
   */
  dims?: Record<string, string>;
  spin?: boolean;
}

export const SOLID_KINDS: SolidKind[] = [
  "cube", "cuboid", "sphere", "cylinder", "cone", "hemisphere", "prism",
  "pyramid", "frustum",
];

export const PHYSICS_KINDS: PhysicsKind[] = [
  "lens", "mirror", "wave", "incline", "magnet", "solar", "axes",
];

export const CHEMISTRY_KINDS: ChemistryKind[] = [
  "atom", "molecule", "benzene", "lattice",
];

export const SCENE_KINDS: SceneKind[] = [
  ...SOLID_KINDS,
  ...PHYSICS_KINDS,
  ...CHEMISTRY_KINDS,
];

/**
 * A model asked for a figure by name. Resolve it to the kind AND the variant,
 * so "concave mirror" can never arrive as a bare "mirror" and be drawn as
 * whichever one the renderer defaults to.
 */
const ALIASES: Record<string, { kind: SceneKind; variant?: "convex" | "concave" }> = {
  "convex-lens": { kind: "lens", variant: "convex" },
  "converging-lens": { kind: "lens", variant: "convex" },
  "concave-lens": { kind: "lens", variant: "concave" },
  "diverging-lens": { kind: "lens", variant: "concave" },
  "convex-mirror": { kind: "mirror", variant: "convex" },
  "concave-mirror": { kind: "mirror", variant: "concave" },
  "spherical-mirror": { kind: "mirror" },
  water: { kind: "molecule" },
  methane: { kind: "molecule" },
  ammonia: { kind: "molecule" },
  crystal: { kind: "lattice" },
  "unit-cell": { kind: "lattice" },
  magnet: { kind: "magnet" },
  "bar-magnet": { kind: "magnet" },
  "inclined-plane": { kind: "incline" },
  slope: { kind: "incline" },
  vector: { kind: "axes" },
  frustrum: { kind: "frustum" },
};

/**
 * Resolve a model-supplied kind string into a real kind and, where the name
 * carried it, the variant that disambiguates it.
 *
 * Returns null for anything unrecognised: a figure that cannot be identified
 * is dropped, never approximated with the nearest lookalike.
 */
export function resolveKind(
  raw: string
): { kind: SceneKind; variant?: "convex" | "concave" } | null {
  const k = raw.trim().toLowerCase().replace(/[\s_]+/g, "-");
  if ((SCENE_KINDS as string[]).includes(k)) return { kind: k as SceneKind };
  return ALIASES[k] ?? null;
}

export function isScene3D(v: unknown): v is Scene3D {
  return Boolean(
    v &&
      typeof v === "object" &&
      (SCENE_KINDS as string[]).includes((v as Scene3D).kind)
  );
}

const Canvas3D = lazy(() => import("./Canvas3D"));

export function Stage3D({ scene }: { scene: Scene3D }) {
  // Remounting on every render would restart the animation each tick.
  const key = useMemo(
    () => `${scene.kind}-${scene.species ?? ""}-${scene.a}-${scene.b}-${scene.c}`,
    [scene]
  );
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
        <Suspense
          fallback={<div className="pnz-stage3d-loading">building the model…</div>}
        >
          <Canvas3D key={key} scene={scene} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
