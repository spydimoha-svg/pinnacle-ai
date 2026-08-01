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
  figureFitsProse,
  isDrawable,
  parsePlotSpec,
  rightAngleIndex,
  sideLengths,
  valueTable,
  type PlotSpec,
} from "../../src/lib/figure";

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
  return failed;
}
