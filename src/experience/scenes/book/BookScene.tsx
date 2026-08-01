import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import { localProgress } from "../../lib/chapters";
import { emitOnce } from "../../lib/events";
import type { Tier } from "../../lib/useExperience";

/**
 * Chapters 1-2: the black leather book.
 *
 * Built from geometry rather than a loaded GLB on purpose — a book is boxes
 * and a cylinder, and generating it costs nothing to download, has no licence
 * attached, and lets the page block be a real stack we can riffle.
 *
 * Everything animates inside useFrame off the scroll MotionValue. Nothing in
 * this file ever calls setState.
 */

/* Proportions matter more than size here. A real hardback is close to 1:1.4
   w:h; the first pass was 1:1.41 but far too large for a 42deg lens at z=4.9,
   where it filled ~77% of frame height and read as a wall rather than an
   object floating in a room. */
const COVER = { w: 1.48, h: 2.08, t: 0.075 };
const PAGES = { w: 1.4, h: 1.99, t: 0.3 };
const LEAF_COUNT = 14;

export function BookScene({
  master,
  reduced,
  tier,
}: {
  master: MotionValue<number>;
  reduced: boolean;
  tier: Tier;
}) {
  const group = useRef<THREE.Group>(null);
  const frontCover = useRef<THREE.Group>(null);
  const leaves = useRef<THREE.Mesh[]>([]);
  const rim = useRef<THREE.PointLight>(null);

  /* Materials are created once and shared. Re-creating a MeshStandardMaterial
     per frame is the classic R3F leak — it recompiles the shader program. */
  const mats = useMemo(() => {
    const leather = new THREE.MeshStandardMaterial({
      color: "#0a0a0c",
      roughness: 0.82,
      metalness: 0.06,
    });
    const edge = new THREE.MeshStandardMaterial({
      color: "#120406",
      roughness: 0.6,
      metalness: 0.15,
      emissive: new THREE.Color("#7c0f18"),
      emissiveIntensity: 0.55,
    });
    /* Two paper materials. A single flat one made the block read as a grey
       slab: real page stacks are bright on the fore-edge where light rakes
       across hundreds of edges, and much darker on the faces, which sit in
       their own shadow. Splitting them is what turns the slab back into paper. */
    const paper = new THREE.MeshStandardMaterial({
      color: "#8d8578",
      roughness: 1,
      metalness: 0,
    });
    const paperEdge = new THREE.MeshStandardMaterial({
      color: "#e8e0cd",
      roughness: 0.88,
      metalness: 0,
      // Picks up the crimson leaking from the spine, so the block is lit from
      // inside the book rather than only from the key light.
      emissive: new THREE.Color("#3a1216"),
      emissiveIntensity: 0.45,
    });
    return { leather, edge, paper, paperEdge };
  }, []);

  const leafGeo = useMemo(
    () => new THREE.BoxGeometry(PAGES.w, PAGES.h, PAGES.t / LEAF_COUNT),
    []
  );
  const coverGeo = useMemo(
    () => new THREE.BoxGeometry(COVER.w, COVER.h, COVER.t),
    []
  );

  useFrame((state) => {
    const g = group.current;
    if (!g) return;

    const p = master.get();
    const pBook = localProgress(p, "book");
    const pAct = localProgress(p, "activation");
    const t = state.clock.elapsedTime;

    /* ── Chapter 1: idle float ──────────────────────────────────────────
       Two sine terms at incommensurate frequencies so the loop never reads
       as a loop — a single sine is instantly recognisable as machine motion. */
    const idle = reduced ? 0 : 1;
    const floatY = idle * (Math.sin(t * 0.62) * 0.085 + Math.sin(t * 0.29) * 0.045);
    const floatRotX = idle * Math.sin(t * 0.41) * 0.05;
    const floatRotZ = idle * Math.cos(t * 0.33) * 0.038;

    /* ── Chapter 2: the fall ────────────────────────────────────────────
       Gravity, not a tween. The book accelerates on a quadratic and the
       overshoot at impact is a real settle, which is what gives it weight.
       A linear or eased-out drop reads as weightless every time.

       It falls INTO frame centre, it does not fall out of frame: it starts
       lifted and settles to y=0, so the book is dead centre for the riffle
       and stays the subject. The first pass drove it to -1.85 and left it
       parked at the bottom of the screen for every chapter after. */
    const fall = pAct < 0.42 ? Math.pow(pAct / 0.42, 2) : 1;
    // Starts only slightly lifted. A big drop looked dramatic in isolation but
    // parked the book off-centre for the whole of chapter 1, which is the one
    // chapter where it is the sole subject.
    const dropY = (1 - fall) * 0.55;

    // Impact settle: a fast damped oscillation right after landing.
    const sinceImpact = Math.max(0, pAct - 0.42);
    const settle =
      sinceImpact > 0 && sinceImpact < 0.18
        ? Math.sin(sinceImpact * 90) * Math.exp(-sinceImpact * 28) * 0.14
        : 0;

    g.position.y = floatY + dropY + settle;
    g.rotation.x = floatRotX + fall * 0.32;
    g.rotation.z = floatRotZ - fall * 0.1;

    // Tilt toward the reader as it settles, so the opening is legible.
    g.rotation.x += pAct > 0.42 ? THREE.MathUtils.lerp(0, -0.72, (pAct - 0.42) / 0.35) : 0;

    /* ── The cover opening ──────────────────────────────────────────── */
    if (frontCover.current) {
      const open = pAct < 0.5 ? 0 : Math.min(1, (pAct - 0.5) / 0.34);
      // Ease-out so the cover decelerates into rest instead of stopping dead.
      const eased = 1 - Math.pow(1 - open, 3);
      frontCover.current.rotation.y = -eased * Math.PI * 0.86;
      if (open > 0.05) emitOnce("BOOK_OPEN", { progress: open });
    }

    /* ── Page riffle ────────────────────────────────────────────────────
       Each leaf lifts on its own offset so the stack peels rather than
       hinging as one slab. Cheap: 14 rotation writes, no geometry churn. */
    const riffle = pAct < 0.6 ? 0 : (pAct - 0.6) / 0.4;
    for (let i = 0; i < leaves.current.length; i++) {
      const leaf = leaves.current[i];
      if (!leaf) continue;
      const offset = i / LEAF_COUNT;
      const local = THREE.MathUtils.clamp((riffle - offset * 0.55) * 2.4, 0, 1);
      const curl = 1 - Math.pow(1 - local, 2);
      leaf.rotation.y = -curl * Math.PI * 0.82;
      // Pages bow as they lift; a flat rotating plane looks like card, not paper.
      leaf.position.x = -curl * 0.06;
    }
    if (riffle > 0.08) emitOnce("PAGE_FLIP", { progress: riffle });

    /* ── Crimson leak from the edges ────────────────────────────────────
       Dim while closed, flares as the book opens — the light was always
       inside, the opening just lets it out. */
    if (rim.current) {
      const open = pAct < 0.5 ? 0 : Math.min(1, (pAct - 0.5) / 0.34);
      rim.current.intensity = 1.1 + open * 7.5 + (idle ? Math.sin(t * 1.7) * 0.18 : 0);
    }

    // Chapter 1 breathing scale, barely perceptible, keeps it feeling alive.
    const breathe = idle ? 1 + Math.sin(t * 0.5) * 0.006 : 1;
    const intro = THREE.MathUtils.lerp(0.86, 1, Math.min(1, pBook * 1.4));

    /* The book stays the anchor of the whole first half. It is open and
       centred through the riffle and the knowledge release, and only eases
       back — smaller and slightly further away, never off screen — once the
       About copy needs the foreground. It is still there, still open. */
    const recede = THREE.MathUtils.clamp((p - 0.38) / 0.14, 0, 1);
    const recedeEase = recede * recede * (3 - 2 * recede);
    g.position.z = -recedeEase * 1.5;
    g.position.y -= recedeEase * 0.45;

    g.scale.setScalar(breathe * intro * (1 - recedeEase * 0.34));
  });

  return (
    <group ref={group}>
      {/* Key: cold and low, so the book is mostly silhouette to begin with. */}
      <ambientLight intensity={0.14} color="#8890a8" />
      <directionalLight position={[3, 5, 4]} intensity={0.5} color="#aab2c8" />
      {/* The crimson leaking from inside the pages. */}
      <pointLight ref={rim} position={[0, 0, 0.1]} distance={5.5} color="#c8202f" />

      {/* Back cover */}
      <mesh geometry={coverGeo} material={mats.leather} position={[0, 0, -PAGES.t / 2 - COVER.t / 2]} castShadow={tier === "high"} />

      {/* Page block — individually hinged leaves so they can riffle.
          Six faces per leaf: the fore-edge (index 0, +X) gets the bright
          material, every other face the darker one. */}
      <group position={[-PAGES.w / 2, 0, 0]}>
        {Array.from({ length: LEAF_COUNT }, (_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) leaves.current[i] = el;
            }}
            geometry={leafGeo}
            material={[
              mats.paperEdge, // +X, the fore-edge the reader sees
              mats.paper, // -X, the spine side
              mats.paperEdge, // +Y, head
              mats.paperEdge, // -Y, tail
              mats.paper, // +Z
              mats.paper, // -Z
            ]}
            position={[
              PAGES.w / 2,
              0,
              PAGES.t / 2 - (i + 0.5) * (PAGES.t / LEAF_COUNT),
            ]}
          />
        ))}
      </group>

      {/* Front cover, hinged at the spine */}
      <group ref={frontCover} position={[-COVER.w / 2, 0, PAGES.t / 2 + COVER.t / 2]}>
        <mesh geometry={coverGeo} material={mats.leather} position={[COVER.w / 2, 0, 0]} castShadow={tier === "high"} />
      </group>

      {/* Spine, with the emissive edge that leaks crimson */}
      <mesh
        material={mats.edge}
        position={[-COVER.w / 2 - 0.02, 0, 0]}
      >
        <boxGeometry args={[0.07, COVER.h, PAGES.t + COVER.t * 2]} />
      </mesh>
    </group>
  );
}
