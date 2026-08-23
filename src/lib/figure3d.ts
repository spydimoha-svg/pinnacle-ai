// Parsing and checking the tutor's 3D figures.
//
// A tutor that can hand a student a real object to turn — a labelled cone, a
// Bohr atom, a ray bench — teaches something a paragraph cannot. But it only
// helps if the object is the RIGHT one, and the failure mode here is specific
// and nasty: models do not draw nonsense, they draw the near-miss. Asked for a
// concave lens they render a convex one. Asked for ammonia they render a flat
// trigonal molecule. Asked for a mirror they render a lens.
//
// A student cannot catch that. The figure looks authoritative, it is labelled,
// it is beautifully rendered, and it is teaching them the opposite of the
// truth — which they will then reproduce in an exam.
//
// So nothing reaches the screen unchecked. This module reads the words the
// tutor wrote AROUND the figure and holds the figure to them: when the prose
// says "concave" and the spec says convex, the prose wins and the spec is
// corrected; when the prose names ammonia, the molecule becomes ammonia; and
// when the figure has nothing to do with what is being taught, it is dropped
// entirely rather than shown.
import {
  resolveKind,
  type Scene3D,
  type SceneKind,
} from "../components/cast/Stage3D";

/* ------------------------------------------------------------------ *
 * Parsing
 * ------------------------------------------------------------------ */

const num = (x: unknown, lo = 0.3, hi = 3): number | undefined =>
  typeof x === "number" && Number.isFinite(x)
    ? Math.max(lo, Math.min(hi, x))
    : undefined;

const str = (x: unknown, limit = 60): string =>
  typeof x === "string" ? x.trim().slice(0, limit) : "";

/** Read a ```model block into a scene, or null if it isn't one. */
export function parseModelSpec(source: string): Scene3D | null {
  let raw: unknown;
  try {
    raw = JSON.parse(source);
  } catch {
    return null;
  }
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  const resolved = resolveKind(str(o.kind, 40));
  if (!resolved) return null;

  const variantRaw = str(o.variant, 12).toLowerCase();
  const variant =
    variantRaw === "convex" || variantRaw === "concave"
      ? (variantRaw as "convex" | "concave")
      : resolved.variant;

  const dims = ((): Record<string, string> | undefined => {
    if (!o.dims || typeof o.dims !== "object") return undefined;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(o.dims as Record<string, unknown>)) {
      const text = str(v, 24);
      if (text && k.length <= 12) out[k] = text;
    }
    return Object.keys(out).length ? out : undefined;
  })();

  return {
    kind: resolved.kind,
    // The atom's `a` is an ATOMIC NUMBER, not a size — clamping it into scene
    // units would turn every element into hydrogen.
    a: resolved.kind === "atom" ? num(o.a, 1, 20) : num(o.a),
    b: num(o.b),
    c: num(o.c),
    species: str(o.species, 12).toUpperCase().replace(/[^A-Z0-9]/g, "") || undefined,
    variant,
    label: str(o.label, 70) || undefined,
    dims,
  };
}

/* ------------------------------------------------------------------ *
 * What the prose actually asked for
 * ------------------------------------------------------------------ */

/** Molecules the renderer knows, and the words that name each one. */
const SPECIES_WORDS: { species: string; words: RegExp }[] = [
  { species: "H2O", words: /\b(?:water|h2o|h₂o)\b/i },
  { species: "CH4", words: /\b(?:methane|ch4|ch₄)\b/i },
  { species: "NH3", words: /\b(?:ammonia|nh3|nh₃)\b/i },
  { species: "CO2", words: /\b(?:carbon dioxide|co2|co₂)\b/i },
  { species: "SO2", words: /\b(?:sulphur dioxide|sulfur dioxide|so2|so₂)\b/i },
  { species: "BF3", words: /\b(?:boron trifluoride|bf3|bf₃)\b/i },
  { species: "CCl4", words: /\b(?:carbon tetrachloride|ccl4|ccl₄)\b/i },
  { species: "SF6", words: /\b(?:sulphur hexafluoride|sf6|sf₆)\b/i },
  { species: "PCl5", words: /\b(?:phosphorus pentachloride|pcl5|pcl₅)\b/i },
  { species: "H2S", words: /\b(?:hydrogen sulphide|hydrogen sulfide|h2s|h₂s)\b/i },
];

/** Elements, for setting an atom's atomic number from its name. */
const ELEMENT_Z: Record<string, number> = {
  hydrogen: 1, helium: 2, lithium: 3, beryllium: 4, boron: 5, carbon: 6,
  nitrogen: 7, oxygen: 8, fluorine: 9, neon: 10, sodium: 11, magnesium: 12,
  aluminium: 13, aluminum: 13, silicon: 14, phosphorus: 15, sulphur: 16,
  sulfur: 16, chlorine: 17, argon: 18, potassium: 19, calcium: 20,
};

/**
 * Words that decide between the two members of a lookalike pair.
 *
 * "Converging" and "diverging" are included because that is how the physics is
 * usually phrased, and a model that writes "a diverging lens" while emitting
 * `variant: "convex"` is making exactly the error this catches.
 */
const CONVEX_WORDS = /\b(?:convex|converging|convergent|bi-?convex)\b/i;
const CONCAVE_WORDS = /\b(?:concave|diverging|divergent|bi-?concave)\b/i;

const MIRROR_WORDS = /\b(?:mirror|reflect(?:ion|s|ed)?|silvered)\b/i;
const LENS_WORDS = /\b(?:lens|refract(?:ion|s|ed)?)\b/i;

/**
 * Words that tell us which family of object the explanation is about.
 *
 * Every pattern is plural-safe on purpose. A trailing \b after a stem silently
 * refuses the plural — /\belectron\b/ does not match "electrons", which is the
 * form students and teachers actually write — and with the relevance rule
 * below being strict, a missed word throws away a GOOD figure rather than
 * letting a bad one through. So every stem spells its optional "s" out.
 */
const KIND_WORDS: { kind: SceneKind; words: RegExp }[] = [
  { kind: "cone", words: /\bcones?\b|\bconical\b|\bslant height\b/i },
  { kind: "cube", words: /\bcubes?\b|\bcubical\b/i },
  { kind: "cuboid", words: /\bcuboids?\b|\brectangular (?:box|block|solid)\b/i },
  { kind: "sphere", words: /\bspheres?\b|\bspherical\b|\bballs?\b/i },
  { kind: "hemisphere", words: /\bhemispheres?\b|\bhemispherical\b|\bdomes?\b|\bbowls?\b/i },
  { kind: "cylinder", words: /\bcylinders?\b|\bcylindrical\b/i },
  { kind: "prism", words: /\bprisms?\b/i },
  { kind: "pyramid", words: /\bpyramids?\b/i },
  { kind: "frustum", words: /\bfrust(?:um|a)\b|\bbuckets?\b|\btruncated cone\b/i },
  {
    kind: "atom",
    words: /\batoms?\b|\batomic\b|\bshells?\b|\belectrons?\b|\bbohr\b|\bnucleus\b|\bconfiguration\b|\bvalency\b/i,
  },
  {
    kind: "molecule",
    // Naming the species counts as talking about the molecule: a passage about
    // ammonia may never use the word "molecule" at all.
    words:
      /\bmolecul|\bbond angles?\b|\bvsepr\b|\btetrahedral\b|\bpyramidal\b|\blone pairs?\b|\bcovalent\b|\bwater\b|\bmethane\b|\bammonia\b|\bcarbon dioxide\b|\bh2o\b|\bch4\b|\bnh3\b|\bco2\b/i,
  },
  { kind: "benzene", words: /\bbenzene\b|\baromatic\b|\bc6h6\b/i },
  {
    kind: "lattice",
    words: /\blattices?\b|\bunit cells?\b|\bcrystals?\b|\bcrystalline\b|\bionic (?:solid|compound|bond)/i,
  },
  { kind: "lens", words: LENS_WORDS },
  { kind: "mirror", words: MIRROR_WORDS },
  {
    kind: "wave",
    words: /\bwaves?\b|\bwavelength\b|\bamplitude\b|\boscillat|\bfrequency\b|\bcrests?\b|\btroughs?\b/i,
  },
  { kind: "incline", words: /\binclined plane\b|\binclines?\b|\bslopes?\b|\bramps?\b|\bfriction\b/i },
  {
    kind: "magnet",
    words: /\bmagnets?\b|\bmagnetic\b|\bfield lines?\b|\bnorth pole\b|\bsouth pole\b|\bsolenoids?\b/i,
  },
  { kind: "solar", words: /\bsolar system\b|\bplanets?\b|\borbits?\b|\bsuns?\b/i },
  { kind: "axes", words: /\bvectors?\b|\baxes\b|\bcoordinates?\b|\bresolv|\bcomponents?\b/i },
];

export interface ModelCheck {
  scene: Scene3D;
  /** Set when the guard changed the figure to match the explanation. */
  corrected?: string;
}

/**
 * Hold a figure to the words around it.
 *
 * Returns the scene to draw — corrected where the prose was unambiguous — or
 * null when the figure does not belong under this explanation at all.
 *
 * The prose wins every disagreement, and that is the right way round: the
 * words are what the student is being taught, so a figure that contradicts
 * them is the thing that is wrong. The one exception is silence — prose that
 * says nothing either way leaves the spec alone.
 */
export function checkModel(scene: Scene3D, prose: string): ModelCheck | null {
  const p = prose.slice(0, 4000);
  let corrected: string | undefined;
  const out: Scene3D = { ...scene };

  // 1. Lens vs mirror. The commonest swap, and the one that inverts the ray
  //    diagram completely: a mirror sends light back, a lens lets it through.
  const saysMirror = MIRROR_WORDS.test(p);
  const saysLens = LENS_WORDS.test(p);
  if (out.kind === "lens" && saysMirror && !saysLens) {
    out.kind = "mirror";
    corrected = "the explanation is about a mirror, so a mirror is drawn";
  } else if (out.kind === "mirror" && saysLens && !saysMirror) {
    out.kind = "lens";
    corrected = "the explanation is about a lens, so a lens is drawn";
  }

  // 2. Convex vs concave. Also inverting: one converges, the other spreads.
  if (out.kind === "lens" || out.kind === "mirror") {
    const saysConvex = CONVEX_WORDS.test(p);
    const saysConcave = CONCAVE_WORDS.test(p);
    // Only act when the prose is unambiguous. A passage comparing the two
    // mentions both, and there is no telling from words alone which one this
    // particular figure is meant to be.
    if (saysConvex !== saysConcave) {
      const wanted = saysConvex ? "convex" : "concave";
      if (out.variant !== wanted) {
        out.variant = wanted;
        corrected = `the explanation describes a ${wanted} ${out.kind}, so that is what is drawn`;
      }
    } else if (!out.variant) {
      // Neither named and none supplied: there is no safe default here, and a
      // coin-flip figure in a physics answer is worse than no figure.
      return null;
    }
  }

  // 3. Which molecule. "Three bonds" is not a species; ammonia and boron
  //    trifluoride both have three and they are different shapes.
  if (out.kind === "molecule") {
    const named = SPECIES_WORDS.find((s) => s.words.test(p));
    if (named && out.species !== named.species) {
      out.species = named.species;
      corrected = `the explanation is about ${named.species}, so that molecule is drawn`;
    }
    if (!out.species && !named) return null;
  }

  // 4. Which element. An atom diagram whose shells do not match the element
  //    being discussed is the whole answer to "write its configuration",
  //    wrong.
  if (out.kind === "atom") {
    const entry = Object.entries(ELEMENT_Z).find(([name]) =>
      new RegExp(`\\b${name}\\b`, "i").test(p)
    );
    if (entry && out.a !== entry[1]) {
      out.a = entry[1];
      corrected = `the explanation is about ${entry[0]}, so its shells are drawn`;
    }
  }

  // 5. Relevance. A gold cone under an explanation of the water cycle is worse
  //    than nothing, because a student trusts a picture more than a paragraph.
  //
  //    The figure has to EARN its place: the explanation must actually be
  //    about this object. Silence is not consent — a spec nothing in the prose
  //    supports is a spec the model reached for out of habit, and the 2D
  //    figure engine has taken the same line for the same reason (see
  //    figureFitsProse in lib/figure.ts).
  const mine = KIND_WORDS.find((k) => k.kind === out.kind);
  if (mine && !mine.words.test(p)) return null;

  return { scene: out, corrected };
}
