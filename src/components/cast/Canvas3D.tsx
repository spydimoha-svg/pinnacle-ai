import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Html, Line, OrbitControls } from "@react-three/drei";
import { Quaternion, Shape, Vector3, type Group, type Mesh } from "three";
import type { Scene3D } from "./Stage3D";

// The actual three.js scene. Split from Stage3D so it can be code-split: this
// module pulls in the whole renderer, and most sessions never open a video.
//
// Two rules govern everything below, because a wrong diagram teaches a wrong
// thing more effectively than no diagram at all:
//
//   ACCURACY. Every shape is built from the real quantity it represents. A
//   water molecule is bent at 104.5 degrees because water IS bent at 104.5
//   degrees, not because that angle looked right. Methane's four bonds sit on
//   true tetrahedral vertices. Element colours follow the CPK convention the
//   textbooks use, so oxygen is red here and red in the book.
//
//   LABELS. An unlabelled solid is a decoration. Every object names its parts
//   and its dimensions — r, h, l on the solids, the element symbol on every
//   atom, the bond angle on every molecule — so a student can read the figure
//   without the narration.

const GOLD = "#e8c889";
const SKY = "#4a9eda";
const MINT = "#7fd1c1";
const VIOLET = "#a78bfa";
const AXIS = "#6f6f6f";

/* ------------------------------------------------------------------ *
 * Shared parts
 * ------------------------------------------------------------------ */

function Spinner({
  children,
  spin = true,
}: {
  children: React.ReactNode;
  spin?: boolean;
}) {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (spin && ref.current) ref.current.rotation.y += dt * 0.35;
  });
  return <group ref={ref}>{children}</group>;
}

/** A floating text label, positioned in scene space. */
function Tag({
  at,
  children,
  tone = "plain",
}: {
  at: [number, number, number];
  children: React.ReactNode;
  tone?: "plain" | "dim";
}) {
  return (
    <Html
      center
      position={at}
      className={tone === "dim" ? "pnz-3d-label pnz-3d-label-dim" : "pnz-3d-label"}
      // Labels behind the object should not float in front of it.
      occlude={false}
    >
      {children}
    </Html>
  );
}

/**
 * A straight measured line with ticks at both ends — the way a textbook marks
 * a radius or a height, rather than a bare floating letter.
 */
function Dimension({
  from,
  to,
  label,
  color = MINT,
}: {
  from: [number, number, number];
  to: [number, number, number];
  label: string;
  color?: string;
}) {
  const mid: [number, number, number] = [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2,
  ];
  return (
    <group>
      <Line points={[from, to]} color={color} lineWidth={1.6} />
      <Tag at={mid}>{label}</Tag>
    </group>
  );
}

/**
 * A bond between two points, correctly oriented in THREE dimensions.
 *
 * The previous version rotated the cylinder with atan2(y, x) about z, which
 * ignores the z component entirely. That is invisible on a flat molecule like
 * water and visibly wrong on every 3D one: methane's four bonds pointed off
 * into space instead of at its hydrogens. A quaternion that maps the
 * cylinder's own +Y axis onto the bond direction is right in every case.
 */
function Bond({
  from,
  to,
  color = "#9a9a9a",
  radius = 0.06,
  order = 1,
}: {
  from: Vector3;
  to: Vector3;
  color?: string;
  radius?: number;
  order?: number;
}) {
  const { mid, quaternion, length, offsetAxis } = useMemo(() => {
    const dir = new Vector3().subVectors(to, from);
    const len = dir.length();
    const q = new Quaternion().setFromUnitVectors(
      new Vector3(0, 1, 0),
      dir.clone().normalize()
    );
    // Any axis perpendicular to the bond will do for splitting a double or
    // triple bond into parallel rods.
    const perp = new Vector3(0, 0, 1).cross(dir).normalize();
    if (perp.lengthSq() < 0.01) perp.set(1, 0, 0);
    return {
      mid: new Vector3().addVectors(from, to).multiplyScalar(0.5),
      quaternion: q,
      length: len,
      offsetAxis: perp,
    };
  }, [from, to]);

  const rods = Math.max(1, Math.min(3, order));
  const spread = radius * 2.4;

  return (
    <group>
      {Array.from({ length: rods }).map((_, i) => {
        const shift = (i - (rods - 1) / 2) * spread;
        const p = mid.clone().addScaledVector(offsetAxis, shift);
        return (
          <mesh key={i} position={p} quaternion={quaternion}>
            <cylinderGeometry args={[radius, radius, length, 12]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Solids — with their dimensions marked
 * ------------------------------------------------------------------ */

/** A solid, drawn with its edges picked out — the way a textbook draws it. */
function Solid({ scene }: { scene: Scene3D }) {
  const a = scene.a ?? 1.4;
  const b = scene.b ?? a;
  const c = scene.c ?? a;

  /**
   * The text for a marked dimension.
   *
   * When the lesson supplied a real quantity for this part ("r = 7 cm") it is
   * shown; otherwise the bare symbol. Keyed by part name, so a value can never
   * be drawn against an edge it does not measure — the failure that makes a
   * figure actively wrong rather than merely plain.
   */
  const dim = (key: string, symbol: string) => {
    const v = scene.dims?.[key];
    return v ? `${symbol} = ${v}` : symbol;
  };
  const common = {
    color: GOLD,
    transparent: true,
    opacity: 0.34,
    roughness: 0.35,
    metalness: 0.1,
  };

  const geometry = () => {
    switch (scene.kind) {
      case "cube":
        return <boxGeometry args={[a, a, a]} />;
      case "cuboid":
        return <boxGeometry args={[a, b, c]} />;
      case "sphere":
        return <sphereGeometry args={[a, 48, 32]} />;
      case "hemisphere":
        return <sphereGeometry args={[a, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />;
      case "cylinder":
        return <cylinderGeometry args={[a, a, b, 48]} />;
      case "cone":
        return <coneGeometry args={[a, b, 48]} />;
      case "frustum":
        return <cylinderGeometry args={[c, a, b, 48]} />;
      case "prism":
        return <cylinderGeometry args={[a, a, b, 3]} />;
      case "pyramid":
        return <coneGeometry args={[a, b, 4]} />;
      default:
        return <boxGeometry args={[a, a, a]} />;
    }
  };

  /**
   * The dimensions this particular solid is defined by.
   *
   * This is the difference between "a gold cone is spinning" and a figure a
   * student can compute from: a cone needs r, h and the slant l that its
   * curved-surface-area formula uses, and l is derived from the other two
   * rather than guessed, so the figure and the formula always agree.
   */
  const marks = () => {
    switch (scene.kind) {
      case "cone": {
        const h = b;
        const l = Math.sqrt(a * a + h * h);
        return (
          <>
            <Dimension from={[0, -h / 2, 0]} to={[a, -h / 2, 0]} label={dim("r", "r")} />
            <Dimension from={[0, -h / 2, 0]} to={[0, h / 2, 0]} label={dim("h", "h")} color={SKY} />
            <Dimension
              from={[a, -h / 2, 0]}
              to={[0, h / 2, 0]}
              // The slant is DERIVED, never guessed, so the figure and the
              // curved-surface-area formula can never disagree.
              label={scene.dims?.l ? `l = ${scene.dims.l}` : `l = ${l.toFixed(1)}`}
              color={VIOLET}
            />
          </>
        );
      }
      case "cylinder":
        return (
          <>
            <Dimension from={[0, -b / 2, 0]} to={[a, -b / 2, 0]} label={dim("r", "r")} />
            <Dimension from={[a, -b / 2, 0]} to={[a, b / 2, 0]} label={dim("h", "h")} color={SKY} />
          </>
        );
      case "frustum":
        return (
          <>
            <Dimension from={[0, b / 2, 0]} to={[c, b / 2, 0]} label={dim("r2", "r₂")} />
            <Dimension from={[0, -b / 2, 0]} to={[a, -b / 2, 0]} label={dim("r1", "r₁")} />
            <Dimension from={[0, -b / 2, 0]} to={[0, b / 2, 0]} label={dim("h", "h")} color={SKY} />
          </>
        );
      case "sphere":
        return <Dimension from={[0, 0, 0]} to={[a, 0, 0]} label={dim("r", "r")} />;
      case "hemisphere":
        return (
          <>
            <Dimension from={[0, 0, 0]} to={[a, 0, 0]} label={dim("r", "r")} />
            <Tag at={[0, -0.35, 0]} tone="dim">
              flat face
            </Tag>
          </>
        );
      case "cuboid":
        return (
          <>
            <Dimension from={[-a / 2, -b / 2, c / 2]} to={[a / 2, -b / 2, c / 2]} label={dim("l", "l")} />
            <Dimension from={[a / 2, -b / 2, c / 2]} to={[a / 2, b / 2, c / 2]} label={dim("h", "h")} color={SKY} />
            <Dimension from={[a / 2, -b / 2, c / 2]} to={[a / 2, -b / 2, -c / 2]} label={dim("b", "b")} color={VIOLET} />
          </>
        );
      case "cube":
        return <Dimension from={[-a / 2, -a / 2, a / 2]} to={[a / 2, -a / 2, a / 2]} label={dim("a", "a")} />;
      case "pyramid":
        return (
          <>
            <Dimension from={[0, -b / 2, 0]} to={[a, -b / 2, 0]} label={dim("a", "a/2")} />
            <Dimension from={[0, -b / 2, 0]} to={[0, b / 2, 0]} label={dim("h", "h")} color={SKY} />
          </>
        );
      default:
        return null;
    }
  };

  const top = Math.max(a, b) / 2 + 1.1;

  return (
    <Spinner spin={scene.spin !== false}>
      <mesh castShadow>
        {geometry()}
        <meshStandardMaterial {...common} />
        <Edges scale={1.001} threshold={15} color={GOLD} />
      </mesh>
      {marks()}
      {scene.label && <Tag at={[0, top, 0]}>{scene.label}</Tag>}
    </Spinner>
  );
}

/* ------------------------------------------------------------------ *
 * Chemistry — real molecular geometry
 * ------------------------------------------------------------------ */

/**
 * CPK colours, the convention every chemistry textbook and model kit uses.
 * Getting these right is not decoration: a student who has handled a model kit
 * reads the colour before the label.
 */
const ELEMENT: Record<string, { color: string; radius: number }> = {
  H: { color: "#f2f2f2", radius: 0.26 },
  B: { color: "#ffb5b5", radius: 0.40 },
  C: { color: "#3d3d3d", radius: 0.42 },
  N: { color: "#3050f8", radius: 0.40 },
  O: { color: "#e5322d", radius: 0.38 },
  F: { color: "#7fd13b", radius: 0.34 },
  Na: { color: "#ab5cf2", radius: 0.5 },
  Mg: { color: "#8aff00", radius: 0.48 },
  P: { color: "#ff8000", radius: 0.46 },
  S: { color: "#ffd123", radius: 0.46 },
  Cl: { color: "#1ff01f", radius: 0.44 },
  K: { color: "#8f40d4", radius: 0.55 },
  Ca: { color: "#3dff00", radius: 0.52 },
  Br: { color: "#a62929", radius: 0.48 },
};

function el(sym: string) {
  return ELEMENT[sym] ?? { color: MINT, radius: 0.4 };
}

/**
 * VSEPR geometries, as unit direction vectors.
 *
 * These are the real angles, not approximations chosen to look tidy:
 * tetrahedral is 109.47 degrees, trigonal planar is exactly 120, and a bent
 * or pyramidal shape takes the measured angle of the specific molecule.
 */
function geometryDirs(
  shape: string,
  angleDeg?: number
): Vector3[] {
  const rad = ((angleDeg ?? 109.47) * Math.PI) / 180;
  switch (shape) {
    case "linear":
      return [new Vector3(1, 0, 0), new Vector3(-1, 0, 0)];
    case "bent": {
      // Split the real bond angle about the +Y axis, so the figure measures
      // the angle the caption claims.
      const half = rad / 2;
      return [
        new Vector3(Math.sin(half), Math.cos(half), 0),
        new Vector3(-Math.sin(half), Math.cos(half), 0),
      ];
    }
    case "trigonal-planar":
      return [0, 1, 2].map((i) => {
        const t = (i * 2 * Math.PI) / 3;
        return new Vector3(Math.cos(t), Math.sin(t), 0);
      });
    case "trigonal-pyramidal": {
      // Three bonds on a cone whose half-angle reproduces the stated H-N-H
      // angle; the lone pair sits on the axis above.
      const half = rad / 2;
      const s = Math.sin(half) * 1.15;
      const y = -Math.cos(half) * 0.6;
      return [0, 1, 2].map((i) => {
        const t = (i * 2 * Math.PI) / 3;
        return new Vector3(Math.cos(t) * s, y, Math.sin(t) * s).normalize();
      });
    }
    case "tetrahedral":
      return [
        new Vector3(1, 1, 1),
        new Vector3(-1, -1, 1),
        new Vector3(-1, 1, -1),
        new Vector3(1, -1, -1),
      ].map((v) => v.normalize());
    case "octahedral":
      return [
        new Vector3(1, 0, 0),
        new Vector3(-1, 0, 0),
        new Vector3(0, 1, 0),
        new Vector3(0, -1, 0),
        new Vector3(0, 0, 1),
        new Vector3(0, 0, -1),
      ];
    case "trigonal-bipyramidal":
      return [
        new Vector3(0, 1, 0),
        new Vector3(0, -1, 0),
        ...[0, 1, 2].map((i) => {
          const t = (i * 2 * Math.PI) / 3;
          return new Vector3(Math.cos(t), 0, Math.sin(t));
        }),
      ];
    default:
      return [new Vector3(1, 0, 0), new Vector3(-1, 0, 0)];
  }
}

interface Species {
  formula: string;
  name: string;
  centre: string;
  ligand: string;
  count: number;
  shape: string;
  angle?: number;
  bondOrder?: number;
  lonePairs?: number;
  /** Bond length in scene units. */
  length?: number;
}

/**
 * The molecules a CBSE student actually meets, each with its real shape.
 *
 * Naming a species is what stops the model picking a lookalike. Asked for
 * "the shape of ammonia" the old code could only be handed `a = 3` and drew a
 * flat three-armed thing; here "NH3" resolves to a trigonal pyramid at 107
 * degrees with its lone pair drawn, which is the whole point of the figure.
 */
const SPECIES: Record<string, Species> = {
  H2O: { formula: "H₂O", name: "Water", centre: "O", ligand: "H", count: 2, shape: "bent", angle: 104.5, lonePairs: 2, length: 1.3 },
  H2S: { formula: "H₂S", name: "Hydrogen sulphide", centre: "S", ligand: "H", count: 2, shape: "bent", angle: 92.1, lonePairs: 2, length: 1.5 },
  CH4: { formula: "CH₄", name: "Methane", centre: "C", ligand: "H", count: 4, shape: "tetrahedral", angle: 109.47, length: 1.4 },
  NH3: { formula: "NH₃", name: "Ammonia", centre: "N", ligand: "H", count: 3, shape: "trigonal-pyramidal", angle: 107, lonePairs: 1, length: 1.35 },
  CO2: { formula: "CO₂", name: "Carbon dioxide", centre: "C", ligand: "O", count: 2, shape: "linear", angle: 180, bondOrder: 2, length: 1.5 },
  SO2: { formula: "SO₂", name: "Sulphur dioxide", centre: "S", ligand: "O", count: 2, shape: "bent", angle: 119, bondOrder: 2, lonePairs: 1, length: 1.5 },
  BF3: { formula: "BF₃", name: "Boron trifluoride", centre: "B", ligand: "F", count: 3, shape: "trigonal-planar", angle: 120, length: 1.45 },
  CCl4: { formula: "CCl₄", name: "Carbon tetrachloride", centre: "C", ligand: "Cl", count: 4, shape: "tetrahedral", angle: 109.47, length: 1.7 },
  SF6: { formula: "SF₆", name: "Sulphur hexafluoride", centre: "S", ligand: "F", count: 6, shape: "octahedral", angle: 90, length: 1.5 },
  PCl5: { formula: "PCl₅", name: "Phosphorus pentachloride", centre: "P", ligand: "Cl", count: 5, shape: "trigonal-bipyramidal", length: 1.7 },
};

/** Ball-and-stick, built from the species' real geometry and labelled. */
function Molecule({ scene }: { scene: Scene3D }) {
  const key = (scene.species ?? "H2O").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const spec = SPECIES[key] ?? SPECIES.H2O;
  const len = spec.length ?? 1.4;
  const dirs = geometryDirs(spec.shape, spec.angle).slice(0, spec.count);
  const centre = el(spec.centre);
  const ligand = el(spec.ligand);
  const origin = useMemo(() => new Vector3(0, 0, 0), []);

  return (
    <Spinner spin={scene.spin !== false}>
      {/* central atom */}
      <mesh>
        <sphereGeometry args={[centre.radius, 32, 24]} />
        <meshStandardMaterial color={centre.color} roughness={0.4} />
      </mesh>
      <Tag at={[0, centre.radius + 0.28, 0]}>{spec.centre}</Tag>

      {dirs.map((d, i) => {
        const p = d.clone().multiplyScalar(len);
        return (
          <group key={i}>
            <Bond from={origin} to={p} order={spec.bondOrder ?? 1} />
            <mesh position={p}>
              <sphereGeometry args={[ligand.radius, 24, 18]} />
              <meshStandardMaterial color={ligand.color} roughness={0.4} />
            </mesh>
            <Tag at={[p.x, p.y + ligand.radius + 0.24, p.z]} tone="dim">
              {spec.ligand}
            </Tag>
          </group>
        );
      })}

      {/* Lone pairs — the reason ammonia is a pyramid and not a triangle. */}
      {Array.from({ length: spec.lonePairs ?? 0 }).map((_, i) => {
        const side = i === 0 ? 1 : -1;
        const y = centre.radius + 0.5;
        const x = (spec.lonePairs === 1 ? 0 : side * 0.28);
        return (
          <group key={`lp-${i}`} position={[x, y, 0]}>
            {[-0.11, 0.11].map((dx, j) => (
              <mesh key={j} position={[dx, 0, 0]}>
                <sphereGeometry args={[0.075, 12, 10]} />
                <meshStandardMaterial color={SKY} emissive={SKY} emissiveIntensity={0.7} />
              </mesh>
            ))}
          </group>
        );
      })}

      <Tag at={[0, -len - 0.9, 0]}>
        {spec.name} · {spec.formula}
      </Tag>
      <Tag at={[0, -len - 1.35, 0]} tone="dim">
        {spec.shape.replace(/-/g, " ")}
        {spec.angle ? ` · ${spec.angle}°` : ""}
      </Tag>
    </Spinner>
  );
}

/** Benzene: a planar hexagon with the delocalised ring drawn as a ring. */
function Benzene({ scene }: { scene: Scene3D }) {
  const R = 1.4;
  const carbons = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => {
        const t = (i * Math.PI) / 3;
        return new Vector3(Math.cos(t) * R, 0, Math.sin(t) * R);
      }),
    []
  );
  const hydrogens = useMemo(
    () => carbons.map((c) => c.clone().multiplyScalar(1.72)),
    [carbons]
  );

  return (
    <Spinner spin={scene.spin !== false}>
      {carbons.map((c, i) => (
        <group key={i}>
          <mesh position={c}>
            <sphereGeometry args={[el("C").radius, 24, 18]} />
            <meshStandardMaterial color={el("C").color} roughness={0.4} />
          </mesh>
          <Bond from={c} to={carbons[(i + 1) % 6]} />
          <Bond from={c} to={hydrogens[i]} radius={0.05} />
          <mesh position={hydrogens[i]}>
            <sphereGeometry args={[el("H").radius, 18, 14]} />
            <meshStandardMaterial color={el("H").color} roughness={0.4} />
          </mesh>
        </group>
      ))}
      {/* The delocalised π system — drawn as the circle the textbook draws,
          not as alternating double bonds, because that IS the teaching point. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R * 0.62, 0.028, 10, 80]} />
        <meshBasicMaterial color={SKY} />
      </mesh>
      <Tag at={[0, 1.35, 0]}>Benzene · C₆H₆</Tag>
      <Tag at={[0, -1.3, 0]} tone="dim">
        planar hexagon · 120° · delocalised π
      </Tag>
    </Spinner>
  );
}

/** The rock-salt lattice — alternating ions on a cube. */
function Lattice({ scene }: { scene: Scene3D }) {
  const n = 3;
  const gap = 0.9;
  const cells = useMemo(() => {
    const out: { p: [number, number, number]; sym: string }[] = [];
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        for (let z = 0; z < n; z++) {
          out.push({
            p: [(x - 1) * gap, (y - 1) * gap, (z - 1) * gap],
            sym: (x + y + z) % 2 === 0 ? "Na" : "Cl",
          });
        }
      }
    }
    return out;
  }, []);

  return (
    <Spinner spin={scene.spin !== false}>
      {cells.map((c, i) => (
        <mesh key={i} position={c.p}>
          <sphereGeometry args={[c.sym === "Na" ? 0.24 : 0.34, 20, 16]} />
          <meshStandardMaterial color={el(c.sym).color} roughness={0.45} />
        </mesh>
      ))}
      <Tag at={[0, 1.9, 0]}>{scene.label ?? "Sodium chloride lattice"}</Tag>
      <Tag at={[0, -1.85, 0]} tone="dim">
        Na⁺ small · Cl⁻ large · 6:6 coordination
      </Tag>
    </Spinner>
  );
}

/* ------------------------------------------------------------------ *
 * Physics
 * ------------------------------------------------------------------ */

/** Electrons per shell for atomic number Z, filling K, L, M, N as 2, 8, 8, 2. */
function shellsFor(z: number): number[] {
  const capacity = [2, 8, 8, 2];
  const out: number[] = [];
  let left = Math.max(1, Math.min(20, Math.round(z)));
  for (const cap of capacity) {
    if (left <= 0) break;
    const n = Math.min(cap, left);
    out.push(n);
    left -= n;
  }
  return out;
}

const SHELL_NAMES = ["K", "L", "M", "N"];
const ELEMENT_SYMBOL: Record<number, string> = {
  1: "H", 2: "He", 3: "Li", 4: "Be", 5: "B", 6: "C", 7: "N", 8: "O",
  9: "F", 10: "Ne", 11: "Na", 12: "Mg", 13: "Al", 14: "Si", 15: "P",
  16: "S", 17: "Cl", 18: "Ar", 19: "K", 20: "Ca",
};

/**
 * A Bohr atom with the RIGHT electrons in the RIGHT shells.
 *
 * `a` is the ATOMIC NUMBER, so a=11 draws sodium as 2, 8, 1 — the configuration
 * a student is actually asked to reproduce — instead of a single decorative
 * ring holding however many dots fitted. Each shell is named K, L, M, N and
 * carries its own count, because "2, 8, 1" is the answer to the question.
 */
function Atom({ scene }: { scene: Scene3D }) {
  const z = Math.max(1, Math.min(20, Math.round(scene.a ?? 11)));
  const shells = shellsFor(z);
  const ring = useRef<Group>(null);
  useFrame((state) => {
    if (ring.current) ring.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.44, 32, 24]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} />
      </mesh>
      <Tag at={[0, -0.75, 0]}>{ELEMENT_SYMBOL[z] ?? `Z = ${z}`}</Tag>

      <group ref={ring}>
        {shells.map((count, si) => {
          const radius = 1.15 + si * 0.75;
          return (
            <group key={si}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, 0.01, 8, 96]} />
                <meshBasicMaterial color={si % 2 ? VIOLET : MINT} />
              </mesh>
              {Array.from({ length: count }).map((_, ei) => {
                const angle = (ei / count) * Math.PI * 2;
                return (
                  <mesh
                    key={ei}
                    position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
                  >
                    <sphereGeometry args={[0.11, 16, 12]} />
                    <meshStandardMaterial color={SKY} emissive={SKY} emissiveIntensity={0.6} />
                  </mesh>
                );
              })}
            </group>
          );
        })}
      </group>

      {/* Shell labels sit outside the spinning group so they stay readable. */}
      {shells.map((count, si) => (
        <Tag key={si} at={[0, 0.34 + si * 0.44, -(1.15 + si * 0.75)]} tone="dim">
          {SHELL_NAMES[si]} = {count}
        </Tag>
      ))}

      {scene.label && (
        <Tag at={[0, 1.15 + shells.length * 0.75 + 0.55, 0]}>{scene.label}</Tag>
      )}
    </group>
  );
}

/**
 * A spherical mirror bench — the other half of Class 10 Light, and previously
 * missing entirely, which meant every mirror question fell through to the
 * default branch and was answered with a gold cube.
 *
 * The reflected rays go back towards the side the light came from. That is the
 * one thing that distinguishes a mirror figure from a lens figure, and a
 * generated "mirror" whose rays carry on through the surface is a lens diagram
 * with the wrong caption.
 */
function Mirror({ scene }: { scene: Scene3D }) {
  const concave = scene.variant ? scene.variant === "concave" : (scene.a ?? 1) >= 0;
  const f = 1.8;
  const rays = [0.8, -0.8];
  // Concave faces the incoming light; convex bulges towards it.
  const surfaceX = concave ? 1.7 : -1.7;

  return (
    <group>
      <Line points={[[-4.2, 0, 0], [4.2, 0, 0]]} color={AXIS} lineWidth={1.2} />

      <mesh
        position={[surfaceX, 0, 0]}
        rotation={[0, concave ? Math.PI / 2 : -Math.PI / 2, 0]}
      >
        <sphereGeometry args={[2.4, 44, 26, 0, Math.PI * 2, 0, Math.PI / 5]} />
        <meshStandardMaterial color={SKY} metalness={0.85} roughness={0.15} side={2} />
      </mesh>

      {rays.map((y, i) => {
        // Where the ray actually meets the silvered surface.
        const hitX = concave ? -0.05 : -1.55;
        return (
          <group key={i}>
            <Line points={[[-4, y, 0], [hitX, y, 0]]} color={GOLD} lineWidth={2} />
            {concave ? (
              // Converges: crosses the axis at the real focus in front.
              <Line
                points={[[hitX, y, 0], [-f, 0, 0], [-3.4, -y * 0.85, 0]]}
                color={MINT}
                lineWidth={2}
              />
            ) : (
              <>
                {/* Diverges on reflection... */}
                <Line points={[[hitX, y, 0], [-4, y * 2.1, 0]]} color={MINT} lineWidth={2} />
                {/* ...and appears to come from a focus BEHIND the mirror. */}
                <Line
                  points={[[hitX, y, 0], [f, 0, 0]]}
                  color={MINT}
                  lineWidth={1}
                  dashed
                  dashSize={0.12}
                  gapSize={0.1}
                />
              </>
            )}
          </group>
        );
      })}

      {/* F and the centre of curvature, on the side each actually lies. */}
      {[
        { x: concave ? -f : f, name: "F" },
        { x: concave ? -f * 2 : f * 2, name: "C" },
      ].map((m) => (
        <group key={m.name}>
          <mesh position={[m.x, 0, 0]}>
            <sphereGeometry args={[0.07, 12, 10]} />
            <meshBasicMaterial color={GOLD} />
          </mesh>
          <Tag at={[m.x, -0.36, 0]} tone="dim">
            {m.name}
          </Tag>
        </group>
      ))}

      <Tag at={[0, 2.0, 0]}>
        {scene.label ??
          (concave ? "Concave (converging) mirror" : "Convex (diverging) mirror")}
      </Tag>
      <Tag at={[0, -2.0, 0]} tone="dim">
        {concave
          ? "real focus in front · rays reflect back and meet at F"
          : "virtual focus behind · reflected rays spread out"}
      </Tag>
    </group>
  );
}

function Solar({ scene }: { scene: Scene3D }) {
  const g = useRef<Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.25;
  });
  const planets = [
    { r: 1.4, size: 0.16, color: SKY },
    { r: 2.2, size: 0.22, color: MINT },
    { r: 3.0, size: 0.19, color: VIOLET },
  ];
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.7, 32, 24]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.8} />
      </mesh>
      <group ref={g}>
        {planets.map((p, i) => (
          <group key={i} rotation={[0, (i * Math.PI) / 3, 0]}>
            <mesh position={[p.r, 0, 0]}>
              <sphereGeometry args={[p.size, 20, 16]} />
              <meshStandardMaterial color={p.color} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[p.r, 0.008, 8, 96]} />
              <meshBasicMaterial color="#5a5a5a" />
            </mesh>
          </group>
        ))}
      </group>
      {scene.label && <Tag at={[0, 2.4, 0]}>{scene.label}</Tag>}
    </group>
  );
}

/**
 * A lens on a bench with rays through it — labelled F, 2F and the optic axis.
 *
 * `a >= 0` is convex (converging), `a < 0` concave (diverging). The two are
 * the classic lookalike pair a student must never confuse, so the figure names
 * which one it is rather than leaving it to be inferred from the curvature.
 */
function Lens({ scene }: { scene: Scene3D }) {
  // The NAME decides, not the sign of a number. `variant` is what the script
  // writes when it knows which lens it means; the sign of `a` survives only as
  // a fallback for older scripts, and it is the encoding that used to draw a
  // converging lens for every concave-lens question ever generated.
  const convex = scene.variant ? scene.variant === "convex" : (scene.a ?? 1) >= 0;
  const f = 1.8;
  return (
    <group>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        scale={convex ? [1, 0.22, 1] : [1, 0.1, 1]}
      >
        <sphereGeometry args={[1.3, 40, 24]} />
        <meshPhysicalMaterial
          color={SKY}
          transparent
          opacity={0.42}
          roughness={0.05}
          transmission={0.7}
          thickness={0.5}
        />
      </mesh>

      {/* principal axis */}
      <Line points={[[-4, 0, 0], [4, 0, 0]]} color={AXIS} lineWidth={1.2} />

      {/* focal points, both sides */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * f, 0, 0]}>
            <sphereGeometry args={[0.07, 12, 10]} />
            <meshBasicMaterial color={GOLD} />
          </mesh>
          <Tag at={[s * f, -0.36, 0]} tone="dim">
            {s > 0 ? "F" : "F′"}
          </Tag>
          <mesh position={[s * f * 2, 0, 0]}>
            <sphereGeometry args={[0.055, 12, 10]} />
            <meshBasicMaterial color={AXIS} />
          </mesh>
          <Tag at={[s * f * 2, -0.36, 0]} tone="dim">
            {s > 0 ? "2F" : "2F′"}
          </Tag>
        </group>
      ))}

      {/* parallel rays in, refracted out */}
      {[0.55, -0.55].map((y, i) => (
        <group key={i}>
          <Line points={[[-3.6, y, 0], [0, y, 0]]} color={GOLD} lineWidth={2} />
          <Line
            points={
              convex
                ? [[0, y, 0], [f, 0, 0], [3.4, -y * 0.9, 0]]
                : // Diverging: the outgoing ray bends AWAY, and the dashed
                  // back-projection meets at the virtual focus on the near side.
                  [[0, y, 0], [3.4, y * 2.1, 0]]
            }
            color={MINT}
            lineWidth={2}
          />
          {!convex && (
            <Line
              points={[[0, y, 0], [-f, 0, 0]]}
              color={MINT}
              lineWidth={1}
              dashed
              dashSize={0.12}
              gapSize={0.1}
            />
          )}
        </group>
      ))}

      <Tag at={[0, 1.9, 0]}>
        {scene.label ?? (convex ? "Convex (converging) lens" : "Concave (diverging) lens")}
      </Tag>
      <Tag at={[0, -1.9, 0]} tone="dim">
        {convex ? "real focus · rays meet at F" : "virtual focus · rays appear to come from F"}
      </Tag>
    </group>
  );
}

/** A travelling wave, with wavelength and amplitude marked. */
function Wave({ scene }: { scene: Scene3D }) {
  const g = useRef<Group>(null);
  const beads = 60;
  const k = scene.a ?? 1.4;
  const amp = scene.b ?? 0.7;
  const lambda = (2 * Math.PI) / k;

  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    g.current.children.forEach((child, i) => {
      const x = (i / beads) * 8 - 4;
      (child as Mesh).position.y = Math.sin(x * k - t * 2.2) * amp;
    });
  });

  return (
    <group>
      <Line points={[[-4.2, 0, 0], [4.2, 0, 0]]} color={AXIS} lineWidth={1.2} />
      <group ref={g}>
        {Array.from({ length: beads }).map((_, i) => (
          <mesh key={i} position={[(i / beads) * 8 - 4, 0, 0]}>
            <sphereGeometry args={[0.07, 10, 8]} />
            <meshStandardMaterial color={i % 10 === 0 ? GOLD : SKY} />
          </mesh>
        ))}
      </group>
      {/* λ measured across exactly one cycle, and A from axis to crest. */}
      <Dimension from={[-4, -amp - 0.45, 0]} to={[-4 + lambda, -amp - 0.45, 0]} label="λ" />
      <Dimension from={[4.05, 0, 0]} to={[4.05, amp, 0]} label="A" color={VIOLET} />
      <Tag at={[0, amp + 1.05, 0]}>{scene.label ?? "Travelling wave"}</Tag>
    </group>
  );
}

/** A block on an incline with the three forces resolved and named. */
function Incline({ scene }: { scene: Scene3D }) {
  const deg = Math.max(10, Math.min(60, scene.a ?? 30));
  const th = (deg * Math.PI) / 180;
  const base = 3.4;
  const height = base * Math.tan(th);

  // Block sits on the slope, halfway up.
  const bx = -base / 2 + base * 0.55;
  const by = -height / 2 + (base * 0.45) * Math.tan(th);

  // Built from the real triangle so the drawn angle equals the labelled one —
  // a wedge drawn "about 30 degrees" is the kind of small lie that makes a
  // student's own diagram wrong later.
  const wedge = useMemo(() => {
    const sh = new Shape();
    sh.moveTo(-base / 2, -height / 2);
    sh.lineTo(base / 2, -height / 2);
    sh.lineTo(-base / 2, height / 2);
    sh.closePath();
    return sh;
  }, [base, height]);

  return (
    <group position={[0, -0.4, 0]}>
      {/* the wedge */}
      <mesh position={[0, 0, 0]}>
        <extrudeGeometry args={[wedge, { depth: 1.2, bevelEnabled: false }]} />
        <meshStandardMaterial color={GOLD} transparent opacity={0.28} />
      </mesh>

      <mesh position={[bx, by + 0.22, 0.6]}>
        <boxGeometry args={[0.5, 0.36, 0.5]} />
        <meshStandardMaterial color={SKY} />
      </mesh>

      {/* forces */}
      <Line points={[[bx, by + 0.2, 0.6], [bx, by - 1.1, 0.6]]} color={VIOLET} lineWidth={2.4} />
      <Tag at={[bx + 0.28, by - 1.25, 0.6]}>mg</Tag>

      <Line
        points={[
          [bx, by + 0.2, 0.6],
          [bx + Math.sin(th) * 1.0, by + 0.2 + Math.cos(th) * 1.0, 0.6],
        ]}
        color={MINT}
        lineWidth={2.4}
      />
      <Tag at={[bx + Math.sin(th) * 1.2, by + Math.cos(th) * 1.2 + 0.3, 0.6]}>N</Tag>

      <Line
        points={[
          [bx, by + 0.2, 0.6],
          [bx - Math.cos(th) * 1.0, by + 0.2 + Math.sin(th) * 1.0, 0.6],
        ]}
        color={GOLD}
        lineWidth={2.4}
      />
      <Tag at={[bx - Math.cos(th) * 1.25, by + Math.sin(th) * 1.2 + 0.28, 0.6]}>f</Tag>

      <Tag at={[-base / 2 + 0.55, -height / 2 + 0.16, 0.6]} tone="dim">
        θ = {deg}°
      </Tag>
      <Tag at={[0, height / 2 + 0.85, 0]}>{scene.label ?? "Block on an incline"}</Tag>
      <Tag at={[0, -height / 2 - 0.85, 0]} tone="dim">
        mg sin θ down the slope · mg cos θ into it
      </Tag>
    </group>
  );
}

/** A bar magnet with its field lines running N to S outside the magnet. */
function Magnet({ scene }: { scene: Scene3D }) {
  const loops = [0.55, 0.95, 1.4, 1.9];
  return (
    <group>
      <mesh position={[-0.75, 0, 0]}>
        <boxGeometry args={[1.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#e5322d" />
      </mesh>
      <mesh position={[0.75, 0, 0]}>
        <boxGeometry args={[1.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#4a9eda" />
      </mesh>
      <Tag at={[-0.75, 0.55, 0.35]}>N</Tag>
      <Tag at={[0.75, 0.55, 0.35]}>S</Tag>

      {loops.map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
          <torusGeometry args={[1.5 + i * 0.42, 0.014, 8, 96]} />
          <meshBasicMaterial color={MINT} />
        </mesh>
      ))}
      <Tag at={[0, 2.5, 0]}>{scene.label ?? "Bar magnet field"}</Tag>
      <Tag at={[0, -2.4, 0]} tone="dim">
        field lines leave N, enter S, never cross
      </Tag>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Maths
 * ------------------------------------------------------------------ */

/** Labelled 3D axes — for coordinate geometry and vectors. */
function Axes({ scene }: { scene: Scene3D }) {
  const L = 2.6;
  const v = new Vector3(scene.a ?? 1.6, scene.b ?? 1.2, scene.c ?? 1.0);
  return (
    <group>
      <Line points={[[-L, 0, 0], [L, 0, 0]]} color={GOLD} lineWidth={1.8} />
      <Line points={[[0, -L, 0], [0, L, 0]]} color={MINT} lineWidth={1.8} />
      <Line points={[[0, 0, -L], [0, 0, L]]} color={SKY} lineWidth={1.8} />
      <Tag at={[L + 0.25, 0, 0]}>x</Tag>
      <Tag at={[0, L + 0.25, 0]}>y</Tag>
      <Tag at={[0, 0, L + 0.25]}>z</Tag>

      {/* the vector itself, with its components dropped to the axes */}
      <Line points={[[0, 0, 0], [v.x, v.y, v.z]]} color={VIOLET} lineWidth={3} />
      <Line points={[[v.x, 0, 0], [v.x, v.y, 0], [v.x, v.y, v.z]]} color={AXIS} lineWidth={1} dashed dashSize={0.1} gapSize={0.08} />
      <Line points={[[0, 0, 0], [v.x, 0, 0]]} color={AXIS} lineWidth={1} dashed dashSize={0.1} gapSize={0.08} />
      <Tag at={[v.x, v.y + 0.3, v.z]}>
        ({v.x.toFixed(1)}, {v.y.toFixed(1)}, {v.z.toFixed(1)})
      </Tag>
      <Tag at={[0, -L - 0.5, 0]} tone="dim">
        |v| = {v.length().toFixed(2)}
      </Tag>
      {scene.label && <Tag at={[0, L + 0.8, 0]}>{scene.label}</Tag>}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Root
 * ------------------------------------------------------------------ */

export default function Canvas3D({ scene }: { scene: Scene3D }) {
  const body = () => {
    switch (scene.kind) {
      case "atom":
        return <Atom scene={scene} />;
      case "solar":
        return <Solar scene={scene} />;
      case "lens":
        return <Lens scene={scene} />;
      case "mirror":
        return <Mirror scene={scene} />;
      case "wave":
        return <Wave scene={scene} />;
      case "molecule":
        return <Molecule scene={scene} />;
      case "benzene":
        return <Benzene scene={scene} />;
      case "lattice":
        return <Lattice scene={scene} />;
      case "incline":
        return <Incline scene={scene} />;
      case "magnet":
        return <Magnet scene={scene} />;
      case "axes":
        return <Axes scene={scene} />;
      default:
        return <Solid scene={scene} />;
    }
  };

  return (
    <Canvas camera={{ position: [3.4, 2.2, 4.6], fov: 45 }} dpr={[1, 1.8]}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 5]} intensity={1.15} />
      <pointLight position={[-4, -2, -3]} intensity={0.5} color={SKY} />
      {body()}
      {/* The student can turn it AND pull it closer. Being able to look at the
          back of a cone, or get near enough to read a bond angle, is most of
          the reason to render one at all. */}
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={2.4}
        maxDistance={11}
        autoRotate={false}
      />
    </Canvas>
  );
}
