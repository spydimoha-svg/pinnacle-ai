// Deterministic checks on the figure engine.
//
// These are the exact failures Zainul reported, written down as cases so they
// cannot come back silently: a trigonometry question that produced an
// equilateral triangle, a graph with no scale and no working, a "square" that
// was a rectangle. No network, no model — just the geometry.
import {
  angleAt,
  auditFigure,
  correctGeometry,
  compileFn,
  correctCircuit,
  figureFitsProse,
  isDrawable,
  parseCircuitSpec,
  parsePlotSpec,
  rightAngleIndex,
  sideLengths,
  valueTable,
  type PlotSpec,
} from "../../src/lib/figure";
import { checkModel, parseModelSpec } from "../../src/lib/figure3d";

interface Case {
  name: string;
  /** Exactly what a model emitted, warts and all. */
  block: string;
  check: (spec: PlotSpec) => string | null; // null = pass, string = failure reason
}

const near = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

const CASES: Case[] = [
  {
    name: "trig: 'right triangle' with equilateral coordinates is redrawn right-angled",
    block: '{"shape":"right-triangle","points":[[0,0],[4,0],[2,3.46]],"labels":["A","B","C"],"sideLabels":["c","a","b"],"right":1,"title":"Right triangle"}',
    check: (spec) => {
      const { points } = correctGeometry(spec);
      const i = rightAngleIndex(points);
      return i >= 0 ? null : `no 90° angle after correction (angles ${points.map((_, k) => angleAt(points, k).toFixed(1))})`;
    },
  },
  {
    name: "3-4-5 is DRAWN 3-4-5, not just labelled that way",
    block: '{"shape":"triangle","points":[[0,0],[5,0],[2.5,4]],"sideLabels":["3","4","5"],"labels":["A","B","C"],"title":"3-4-5"}',
    check: (spec) => {
      const { points } = correctGeometry(spec);
      const s = sideLengths(points);
      const k = s[0] / 3;
      if (!near(s[1] / k, 4, 0.02) || !near(s[2] / k, 5, 0.02)) {
        return `drawn sides ${s.map((v) => v.toFixed(2)).join(", ")} are not in 3:4:5`;
      }
      return rightAngleIndex(points) >= 0 ? null : "a 3-4-5 triangle must contain a right angle";
    },
  },
  {
    name: "right-angle marker moves to the vertex that is actually 90°",
    block: '{"points":[[0,0],[4,0],[4,3]],"right":0,"labels":["A","B","C"],"sideLabels":["4","3","5"]}',
    check: (spec) => {
      const { spec: fixed } = correctGeometry(spec);
      return fixed.right === 1 ? null : `marker left on vertex ${fixed.right}, should be 1`;
    },
  },
  {
    name: "'square' really is a square",
    block: '{"shape":"square","labels":["P","Q","R","S"],"sideLabels":["4","4","4","4"]}',
    check: (spec) => {
      const { points } = correctGeometry(spec);
      const s = sideLengths(points);
      const equal = s.every((v) => near(v, s[0]));
      const square = rightAngleIndex(points) >= 0;
      return equal && square ? null : `sides ${s.map((v) => v.toFixed(2)).join(", ")}`;
    },
  },
  {
    name: "'equilateral' really is equilateral",
    block: '{"shape":"equilateral-triangle","labels":["A","B","C"],"sideLabels":["6","6","6"]}',
    check: (spec) => {
      const { points } = correctGeometry(spec);
      const s = sideLengths(points);
      const equal = s.every((v) => near(v, s[0]));
      const angles = points.map((_, i) => angleAt(points, i));
      const sixty = angles.every((a) => Math.abs(a - 60) < 0.5);
      return equal && sixty ? null : `angles ${angles.map((a) => a.toFixed(1)).join(", ")}`;
    },
  },
  {
    name: "impossible side labels are reported, not quietly drawn",
    block: '{"shape":"triangle","sideLabels":["1","2","9"],"labels":["A","B","C"],"title":"Bad"}',
    check: (spec) => {
      const { issues } = correctGeometry(spec);
      return issues.some((i) => i.code === "impossible-triangle")
        ? null
        : "a 1-2-9 triangle cannot exist and should have been flagged";
    },
  },
  {
    name: "a graph carries a readable table of values",
    block: '{"fn":["x^2-2x-8"],"domain":[-4,6],"title":"$y = x^2-2x-8$"}',
    check: (spec) => {
      const f = compileFn((spec.fn as string[])[0]);
      if (!f) return "function did not compile";
      const rows = valueTable(f, spec.domain!);
      if (rows.length < 3) return "no table of values";
      const bad = rows.find((r) => !near(r.y, r.x * r.x - 2 * r.x - 8, 0.01));
      return bad ? `table value wrong at x=${bad.x}` : null;
    },
  },
  {
    name: "unlabelled geometry is called out",
    block: '{"shape":"triangle","points":[[0,0],[4,0],[1,3]]}',
    check: (spec) => {
      const issues = auditFigure(spec);
      return issues.some((i) => i.code === "unlabelled-figure") ? null : "missing labels went unreported";
    },
  },
  {
    name: "y= and f(x)= prefixes still plot",
    block: '{"fn":["y = 2x - 4"],"domain":[-1,5],"title":"line"}',
    check: (spec) => {
      const f = compileFn((spec.fn as string[])[0]);
      if (!f) return "did not compile";
      return near(f(3), 2, 0.001) ? null : `f(3) = ${f(3)}, expected 2`;
    },
  },
  {
    name: "an implicit line equation still plots",
    block: '{"fn":["2x + 3y = 6"],"domain":[-2,5],"title":"line"}',
    check: (spec) => {
      const f = compileFn((spec.fn as string[])[0]);
      if (!f) return "2x + 3y = 6 did not compile";
      // y = (6 - 2x)/3 → at x = 0, y = 2; at x = 3, y = 0.
      if (Math.abs(f(0) - 2) > 0.001) return `f(0) = ${f(0)}, expected 2`;
      if (Math.abs(f(3) - 0) > 0.001) return `f(3) = ${f(3)}, expected 0`;
      return null;
    },
  },
  {
    name: "a triangle under prose about the water cycle is dropped",
    block: '{"shape":"right-triangle","labels":["A","B","C"],"sideLabels":["3","4","5"],"right":1}',
    check: (spec) =>
      figureFitsProse(spec, "Water evaporates from the sea, condenses into clouds, and falls as rain.")
        ? "an unrelated triangle was kept"
        : null,
  },
  {
    name: "a triangle under prose about triangles is kept",
    block: '{"shape":"right-triangle","labels":["A","B","C"],"sideLabels":["3","4","5"],"right":1}',
    check: (spec) =>
      figureFitsProse(spec, "In this right triangle the hypotenuse is the longest side.")
        ? null
        : "a relevant triangle was dropped",
  },
  {
    name: "an unknown shape with no points is not drawn at all",
    block: '{"shape":"convex-lens","title":"A convex lens"}',
    check: (spec) => (isDrawable(spec) ? "an undrawable figure was treated as drawable" : null),
  },
  {
    name: "nothing executes: an injected expression is refused",
    block: '{"fn":["constructor(alert(1))"],"domain":[0,1]}',
    check: (spec) => (compileFn((spec.fn as string[])[0]) === null ? null : "an unsafe expression compiled"),
  },
];


/* ------------------------------------------------------------------ *
 * The 3D accuracy guard
 * ------------------------------------------------------------------ *
 *
 * The failure mode here is never nonsense — it is the near-miss. A model
 * asked for a concave lens draws a convex one; asked for ammonia it draws the
 * flat trigonal molecule. Both look authoritative, both are labelled, and both
 * teach the opposite of the truth to a student who cannot tell. Each case
 * below is one of those swaps, written down so it cannot come back quietly.
 */
interface ModelCase {
  name: string;
  block: string;
  /** The words the tutor wrote around the figure. */
  prose: string;
  /** null = the figure should be dropped entirely. */
  expect: ((scene: Record<string, unknown>) => string | null) | null;
}

const MODEL_CASES: ModelCase[] = [
  {
    name: "a convex spec under concave prose is corrected to concave",
    block: '{"kind":"lens","variant":"convex"}',
    prose: "A concave lens always spreads the rays out, so the image is virtual.",
    expect: (s) => (s.variant === "concave" ? null : `variant stayed ${String(s.variant)}`),
  },
  {
    name: "'diverging lens' counts as concave even without the word",
    block: '{"kind":"lens","variant":"convex"}',
    prose: "Here is a diverging lens. Parallel rays leave it spreading apart.",
    expect: (s) => (s.variant === "concave" ? null : `variant stayed ${String(s.variant)}`),
  },
  {
    name: "a lens drawn under mirror prose becomes a mirror",
    block: '{"kind":"lens","variant":"concave"}',
    prose: "A concave mirror reflects the parallel rays back through its focus.",
    expect: (s) => (s.kind === "mirror" ? null : `kind stayed ${String(s.kind)}`),
  },
  {
    name: "a lens with no variant and no word either way is refused, not guessed",
    block: '{"kind":"lens"}',
    prose: "Light bends when it passes from air into glass.",
    expect: null,
  },
  {
    name: "prose comparing both lenses leaves an explicit variant alone",
    block: '{"kind":"lens","variant":"convex"}',
    prose: "A convex lens converges light while a concave lens diverges it.",
    expect: (s) => (s.variant === "convex" ? null : `variant became ${String(s.variant)}`),
  },
  {
    name: "ammonia prose overrides a water spec",
    block: '{"kind":"molecule","species":"H2O"}',
    prose: "Ammonia, NH3, has a lone pair on the nitrogen, so the shape is pyramidal.",
    expect: (s) => (s.species === "NH3" ? null : `species stayed ${String(s.species)}`),
  },
  {
    name: "a molecule with no species and no name in the prose is refused",
    block: '{"kind":"molecule"}',
    prose: "Bond angles depend on how many lone pairs the central atom carries.",
    expect: null,
  },
  {
    name: "an atom takes its shells from the element being taught",
    block: '{"kind":"atom","a":3}',
    prose: "Sodium has eleven electrons, so its configuration is 2, 8, 1.",
    expect: (s) => (s.a === 11 ? null : `atomic number stayed ${String(s.a)}`),
  },
  {
    name: "an atomic number is not squeezed into scene units",
    block: '{"kind":"atom","a":17}',
    prose: "Chlorine has seventeen electrons.",
    expect: (s) => (s.a === 17 ? null : `atomic number became ${String(s.a)}`),
  },
  {
    name: "a cone under prose about the water cycle is dropped",
    block: '{"kind":"cone","a":1.4,"b":2.2}',
    prose: "Evaporation, condensation and precipitation repeat in a cycle.",
    expect: null,
  },
  {
    name: "a cone under prose about a cone is kept",
    block: '{"kind":"cone","a":1.4,"b":2.2,"dims":{"r":"7 cm"}}',
    prose: "The curved surface area of a cone uses the slant height, not the height.",
    expect: (s) => (s.kind === "cone" ? null : `kind became ${String(s.kind)}`),
  },
  {
    name: "'concave-mirror' as a bare kind resolves to kind + variant",
    block: '{"kind":"concave-mirror"}',
    prose: "A concave mirror is used in a torch reflector.",
    expect: (s) =>
      s.kind === "mirror" && s.variant === "concave"
        ? null
        : `got ${String(s.kind)}/${String(s.variant)}`,
  },
  {
    name: "an unknown object is refused rather than approximated",
    block: '{"kind":"dodecahedron"}',
    prose: "A dodecahedron has twelve faces.",
    expect: null,
  },
  {
    name: "dimension labels survive onto the figure",
    block: '{"kind":"cylinder","a":1,"b":2,"dims":{"r":"7 cm","h":"24 cm"}}',
    prose: "This cylinder has radius 7 cm and height 24 cm.",
    expect: (s) => {
      const d = s.dims as Record<string, string> | undefined;
      return d?.r === "7 cm" && d?.h === "24 cm" ? null : `dims came through as ${JSON.stringify(d)}`;
    },
  },
];

function runModelCases(): { failed: number; total: number } {
  let failed = 0;
  console.log("\n3D figure accuracy guard\n");
  for (const c of MODEL_CASES) {
    const parsed = parseModelSpec(c.block);
    const checked = parsed ? checkModel(parsed, c.prose) : null;
    const scene = checked?.scene as unknown as Record<string, unknown> | undefined;

    if (c.expect === null) {
      if (scene) {
        console.log(`  FAIL  ${c.name}\n        expected the figure to be dropped, got ${JSON.stringify(scene)}`);
        failed++;
      } else {
        console.log(`  ok    ${c.name}`);
      }
      continue;
    }

    if (!scene) {
      console.log(`  FAIL  ${c.name}\n        the figure was dropped, but it should have been drawn`);
      failed++;
      continue;
    }
    const problem = c.expect(scene);
    if (problem) {
      console.log(`  FAIL  ${c.name}\n${problem}`);
      failed++;
    } else {
      console.log(`  ok    ${c.name}`);
    }
  }
  console.log(`\n${MODEL_CASES.length - failed}/${MODEL_CASES.length} passed`);
  return { failed, total: MODEL_CASES.length };
}

export function main(): number {
  let failed = 0;
  console.log("Figure engine checks\n");
  for (const c of CASES) {
    const spec = parsePlotSpec(c.block);
    if (!spec) {
      console.log(`  FAIL  ${c.name}\n        the block did not parse at all`);
      failed++;
      continue;
    }
    const problem = c.check(spec);
    if (problem) {
      console.log(`  FAIL  ${c.name}\n        ${problem}`);
      failed++;
    } else {
      console.log(`  ok    ${c.name}`);
    }
  }
  console.log(`\n${CASES.length - failed}/${CASES.length} passed`);
  const models = runModelCases();
  return failed + models.failed;
}
