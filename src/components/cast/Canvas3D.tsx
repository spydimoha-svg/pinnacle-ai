import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Html, OrbitControls } from "@react-three/drei";
import type { Group, Mesh } from "three";
import type { Scene3D } from "./Stage3D";

// The actual three.js scene. Split from Stage3D so it can be code-split: this
// module pulls in the whole renderer, and most sessions never open a video.

const GOLD = "#e8c889";
const SKY = "#4a9eda";
const MINT = "#7fd1c1";
const VIOLET = "#a78bfa";

function Spinner({ children, spin = true }: { children: React.ReactNode; spin?: boolean }) {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (spin && ref.current) ref.current.rotation.y += dt * 0.35;
  });
  return <group ref={ref}>{children}</group>;
}

/** A solid, drawn with its edges picked out — the way a textbook draws it. */
function Solid({ scene }: { scene: Scene3D }) {
  const a = scene.a ?? 1.4;
  const b = scene.b ?? a;
  const c = scene.c ?? a;
  const common = { color: GOLD, transparent: true, opacity: 0.34, roughness: 0.35, metalness: 0.1 };

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
        return <cylinderGeometry args={[a, a, b ?? 2, 48]} />;
      case "cone":
        return <coneGeometry args={[a, b ?? 2.2, 48]} />;
      case "prism":
        return <cylinderGeometry args={[a, a, b ?? 2, 3]} />;
      case "pyramid":
        return <coneGeometry args={[a, b ?? 2, 4]} />;
      default:
        return <boxGeometry args={[a, a, a]} />;
    }
  };

  return (
    <Spinner spin={scene.spin !== false}>
      <mesh castShadow>
        {geometry()}
        <meshStandardMaterial {...common} />
        <Edges scale={1.001} threshold={15} color={GOLD} />
      </mesh>
      {scene.label && (
        <Html center position={[0, (b ?? a) / 2 + 1.1, 0]} className="pnz-3d-label">
          {scene.label}
        </Html>
      )}
    </Spinner>
  );
}

function Atom({ scene }: { scene: Scene3D }) {
  const electrons = Math.max(1, Math.min(8, Math.round(scene.a ?? 3)));
  const ring = useRef<Group>(null);
  useFrame((state) => {
    if (ring.current) ring.current.rotation.y = state.clock.elapsedTime * 0.8;
  });
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.6, 32, 24]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} />
      </mesh>
      <group ref={ring}>
        {Array.from({ length: electrons }).map((_, i) => {
          const angle = (i / electrons) * Math.PI * 2;
          const r = 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r * 0.4, Math.sin(angle) * r]}>
              <sphereGeometry args={[0.17, 16, 12]} />
              <meshStandardMaterial color={SKY} emissive={SKY} emissiveIntensity={0.6} />
            </mesh>
          );
        })}
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.012, 8, 96]} />
        <meshBasicMaterial color={MINT} />
      </mesh>
      <mesh rotation={[Math.PI / 2, Math.PI / 3, 0]}>
        <torusGeometry args={[2, 0.012, 8, 96]} />
        <meshBasicMaterial color={VIOLET} />
      </mesh>
      {scene.label && (
        <Html center position={[0, 2.6, 0]} className="pnz-3d-label">
          {scene.label}
        </Html>
      )}
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
      {scene.label && (
        <Html center position={[0, 2.4, 0]} className="pnz-3d-label">
          {scene.label}
        </Html>
      )}
    </group>
  );
}

/** A lens on a bench with a ray through it — optics, in three dimensions. */
function Lens({ scene }: { scene: Scene3D }) {
  const convex = (scene.a ?? 1) >= 0;
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]} scale={[1, 0.22, 1]}>
        <sphereGeometry args={[1.3, 40, 24]} />
        <meshPhysicalMaterial color={SKY} transparent opacity={0.42} roughness={0.05} transmission={0.7} thickness={0.5} />
      </mesh>
      {/* principal axis */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 8, 8]} />
        <meshBasicMaterial color="#7a7a7a" />
      </mesh>
      {/* incoming and refracted rays */}
      {[0.55, -0.55].map((y, i) => (
        <group key={i}>
          <mesh position={[-2, y, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
            <meshBasicMaterial color={GOLD} />
          </mesh>
          <mesh
            position={[1.4, y / 2, 0]}
            rotation={[0, 0, Math.PI / 2 + (convex ? -y * 0.32 : y * 0.32)]}
          >
            <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
            <meshBasicMaterial color={MINT} />
          </mesh>
        </group>
      ))}
      {scene.label && (
        <Html center position={[0, 1.9, 0]} className="pnz-3d-label">
          {scene.label}
        </Html>
      )}
    </group>
  );
}

/** A travelling wave — for sound, light and SHM. */
function Wave({ scene }: { scene: Scene3D }) {
  const g = useRef<Group>(null);
  const beads = 60;
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    g.current.children.forEach((child, i) => {
      const x = (i / beads) * 8 - 4;
      (child as Mesh).position.y = Math.sin(x * (scene.a ?? 1.4) - t * 2.2) * (scene.b ?? 0.7);
    });
  });
  return (
    <group>
      <group ref={g}>
        {Array.from({ length: beads }).map((_, i) => (
          <mesh key={i} position={[(i / beads) * 8 - 4, 0, 0]}>
            <sphereGeometry args={[0.07, 10, 8]} />
            <meshStandardMaterial color={i % 10 === 0 ? GOLD : SKY} />
          </mesh>
        ))}
      </group>
      {scene.label && (
        <Html center position={[0, 1.8, 0]} className="pnz-3d-label">
          {scene.label}
        </Html>
      )}
    </group>
  );
}

/** Ball-and-stick: water by default, methane when a = 4. */
function Molecule({ scene }: { scene: Scene3D }) {
  const arms = Math.max(2, Math.min(4, Math.round(scene.a ?? 2)));
  const positions: [number, number, number][] =
    arms === 4
      ? [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]]
      : [[1.1, 0.8, 0], [-1.1, 0.8, 0]];
  return (
    <Spinner>
      <mesh>
        <sphereGeometry args={[0.55, 32, 24]} />
        <meshStandardMaterial color={VIOLET} />
      </mesh>
      {positions.map((p, i) => (
        <group key={i}>
          <mesh position={p}>
            <sphereGeometry args={[0.3, 24, 18]} />
            <meshStandardMaterial color={MINT} />
          </mesh>
          <mesh position={[p[0] / 2, p[1] / 2, p[2] / 2]} rotation={[0, 0, Math.atan2(p[1], p[0]) - Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, Math.hypot(p[0], p[1], p[2]), 10]} />
            <meshStandardMaterial color="#8a8a8a" />
          </mesh>
        </group>
      ))}
      {scene.label && (
        <Html center position={[0, 1.9, 0]} className="pnz-3d-label">
          {scene.label}
        </Html>
      )}
    </Spinner>
  );
}

export default function Canvas3D({ scene }: { scene: Scene3D }) {
  const body = () => {
    switch (scene.kind) {
      case "atom":
        return <Atom scene={scene} />;
      case "solar":
        return <Solar scene={scene} />;
      case "lens":
        return <Lens scene={scene} />;
      case "wave":
        return <Wave scene={scene} />;
      case "molecule":
        return <Molecule scene={scene} />;
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
      {/* The student can turn it. Being able to look at the back of a cone is
          most of the reason to render one at all. */}
      <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
    </Canvas>
  );
}
