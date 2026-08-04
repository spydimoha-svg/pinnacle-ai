// The figure engine: parse, CORRECT and validate every diagram the tutor draws.
//
// This lives outside components/ui.tsx on purpose. The renderer imports it, and
// so does scripts/qa (the automated tutor audit), so the QA run checks exactly
// the figure a student would have seen — not an approximation of it.
//
// The rule this file exists to enforce: a figure must agree with the maths it
// is labelled with. A model that writes "right triangle, sides 3-4-5" and then
// hands over coordinates for an equilateral triangle is not a rendering bug we
// pass through — it is a teaching error we repair before the student sees it.

export interface PlotSpec {
  fn?: string | string[];
  points?: [number, number][];
  domain?: [number, number];
  title?: string;
  /** Axis names. A graph with unnamed axes cannot be read off. */
  xLabel?: string;
  yLabel?: string;
  /** Geometry mode: connect the points into a clean labelled figure. */
  connect?: boolean;
  labels?: string[]; // vertex labels (A, B, C…)
  sideLabels?: string[]; // label for the side from point i to point i+1
  angleLabels?: string[]; // label for the interior angle at vertex i
  right?: number; // index of the vertex that carries a right-angle marker
  /** A named canonical shape, so a weak model need not invent coordinates. */
  shape?: string;
  /** Show the table of plotted values under a graph. Defaults on where useful. */
  table?: boolean;
}

/** A repair or a complaint about a figure, surfaced to the QA report. */
export interface FigureIssue {
  code:
    | "no-right-angle"
    | "right-angle-moved"
    | "sides-rebuilt"
    | "degenerate"
    | "impossible-triangle"
    | "shape-mismatch"
    | "unlabelled-axes"
    | "no-title"
    | "unlabelled-figure"
    | "unknown-shape"
    | "bad-function"
    | "empty"
    | "no-source"
    | "ammeter-in-parallel"
    | "voltmeter-in-series"
    | "empty-circuit";
  /** true when the app silently fixed it; false when it is still wrong. */
  repaired: boolean;
  detail: string;
}

const EPS = 1e-6;

/* ------------------------------------------------------------------ *
 * Named shapes
 * ------------------------------------------------------------------ */

/**
 * Canonical coordinates for common named shapes.
 *
 * Every entry here is geometrically honest: the square is a square, the
 * equilateral triangle has three equal sides. The previous table returned a
 * 4×3 rectangle for "square" and a 4-4-3.3 triangle for "equilateral", which is
 * precisely the class of error a student notices and a teacher never makes.
 */
export function canonicalShape(
  name?: string
): { points: [number, number][]; right?: number; equal?: boolean } | null {
  const key = (name || "").toLowerCase().replace(/[\s_]+/g, "-").replace(/^a-/, "");
  switch (key) {
    case "right-triangle":
    case "right-angled-triangle":
    case "right-angle-triangle":
      return { points: [[0, 0], [4, 0], [4, 3]], right: 1 };
    case "equilateral-triangle":
      // Height of an equilateral triangle of side 4 is 2√3.
      return { points: [[0, 0], [4, 0], [2, 2 * Math.sqrt(3)]], equal: true };
    case "isosceles-triangle":
      return { points: [[0, 0], [4, 0], [2, 3.4]] };
    case "scalene-triangle":
    case "acute-triangle":
    case "triangle":
      return { points: [[0, 0], [4.4, 0], [1.4, 3.1]] };
    case "obtuse-triangle":
      return { points: [[0, 0], [5, 0], [-1.2, 2.6]] };
    case "square":
      return { points: [[0, 0], [4, 0], [4, 4], [0, 4]], right: 1 };
    case "rectangle":
      return { points: [[0, 0], [4.6, 0], [4.6, 2.8], [0, 2.8]], right: 1 };
    case "parallelogram":
      return { points: [[0, 0], [4.4, 0], [5.6, 2.6], [1.2, 2.6]] };
    case "rhombus":
      return { points: [[0, 0], [3.6, 0], [5.0, 2.6], [1.4, 2.6]] };
    case "trapezium":
    case "trapezoid":
      return { points: [[0, 0], [5.2, 0], [4.0, 2.7], [1.2, 2.7]] };
    case "kite":
      return { points: [[2, 0], [4, 2.2], [2, 5], [0, 2.2]] };
    case "pentagon":
      return { points: regular(5, 2.6) };
    case "hexagon":
      return { points: regular(6, 2.6) };
    default:
      return null;
  }
}

function regular(n: number, r: number): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    out.push([Number((r * Math.cos(a)).toFixed(4)), Number((r * Math.sin(a)).toFixed(4))]);
  }
  return out;
}

/** Shoelace area — used to detect a degenerate (collinear) set of points. */
export function polygonArea(p: [number, number][]): number {
  let a = 0;
  for (let i = 0; i < p.length; i++) {
    const j = (i + 1) % p.length;
    a += p[i][0] * p[j][1] - p[j][0] * p[i][1];
  }
  return Math.abs(a) / 2;
}

/** Interior angle at vertex i, in degrees. */
export function angleAt(pts: [number, number][], i: number): number {
  const n = pts.length;
  if (n < 3) return NaN;
  const v = pts[i];
  const a = pts[(i - 1 + n) % n];
  const b = pts[(i + 1) % n];
  const u = [a[0] - v[0], a[1] - v[1]];
  const w = [b[0] - v[0], b[1] - v[1]];
  const mu = Math.hypot(u[0], u[1]);
  const mw = Math.hypot(w[0], w[1]);
  if (mu < EPS || mw < EPS) return NaN;
  const cos = Math.min(1, Math.max(-1, (u[0] * w[0] + u[1] * w[1]) / (mu * mw)));
  return (Math.acos(cos) * 180) / Math.PI;
}

/** Side lengths, side i running from point i to point i+1. */
export function sideLengths(pts: [number, number][]): number[] {
  return pts.map((p, i) => {
    const q = pts[(i + 1) % pts.length];
    return Math.hypot(q[0] - p[0], q[1] - p[1]);
  });
}

/** Reads "3", "5 cm", "$12$", "12 m" as a number. Returns null for "a" or "x". */
export function numericLabel(label?: string): number | null {
  if (!label) return null;
  const m = String(label).replace(/\$/g, "").match(/-?\d+(?:\.\d+)?/);
  if (!m) return null;
  const v = parseFloat(m[0]);
  return Number.isFinite(v) && v > 0 ? v : null;
}

/**
 * Build a triangle whose drawn sides are actually in the labelled ratio.
 *
 * `s[i]` is the length of the side from vertex i to vertex i+1, matching the
 * sideLabels convention. Returns null when the three lengths cannot close
 * (triangle inequality), which is itself a teaching error worth reporting.
 */
export function triangleFromSides(s: [number, number, number]): [number, number][] | null {
  const [s0, s1, s2] = s;
  if (![s0, s1, s2].every((v) => Number.isFinite(v) && v > 0)) return null;
  if (s0 + s1 <= s2 + EPS || s1 + s2 <= s0 + EPS || s2 + s0 <= s1 + EPS) return null;
  // P0 at the origin, P1 along +x at distance s0, P2 from the two circles.
  const x = (s0 * s0 + s2 * s2 - s1 * s1) / (2 * s0);
  const ySq = s2 * s2 - x * x;
  if (ySq <= 0) return null;
  return [
    [0, 0],
    [s0, 0],
    [Number(x.toFixed(6)), Number(Math.sqrt(ySq).toFixed(6))],
  ];
}

/** Index of a vertex whose angle is 90°, or -1. */
export function rightAngleIndex(pts: [number, number][], tol = 0.75): number {
  for (let i = 0; i < pts.length; i++) {
    if (Math.abs(angleAt(pts, i) - 90) <= tol) return i;
  }
  return -1;
}

/* ------------------------------------------------------------------ *
 * Parsing
 * ------------------------------------------------------------------ */

/**
 * Parse a ```plot block leniently. Models often emit near-JSON with extras (a
 * JavaScript labelFunc, comments, fn as an array). We take a fast JSON path,
 * then fall back to pulling only the fields we actually draw, so a graph never
 * collapses back into a raw code dump.
 */
export function parsePlotSpec(raw: string): PlotSpec | null {
  try {
    const j = JSON.parse(raw);
    if (j && (j.fn || j.points || j.shape)) return normalizePlot(j);
  } catch {
    /* not clean JSON — extract the drawable fields below */
  }
  const spec: PlotSpec = {};
  const fnArr = raw.match(/"fn"\s*:\s*\[([^\]]*)\]/);
  const fnStr = raw.match(/"fn"\s*:\s*"([^"]*)"/);
  if (fnArr) {
    const items = fnArr[1].match(/"([^"]*)"/g);
    if (items) spec.fn = items.map((q) => q.slice(1, -1)).filter(Boolean);
  } else if (fnStr) {
    spec.fn = fnStr[1];
  }
  const dom = raw.match(/"domain"\s*:\s*\[\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\]/);
  if (dom) spec.domain = [parseFloat(dom[1]), parseFloat(dom[2])];
  const pts = raw.match(/"points"\s*:\s*(\[\s*\[[\s\S]*?\]\s*\])/);
  if (pts) {
    try {
      spec.points = JSON.parse(pts[1]);
    } catch {
      /* ignore malformed points */
    }
  }
  const str = (key: string) => raw.match(new RegExp(`"${key}"\\s*:\\s*"([^"]*)"`))?.[1];
  const title = str("title");
  if (title) spec.title = title;
  const xl = str("xLabel");
  if (xl) spec.xLabel = xl;
  const yl = str("yLabel");
  if (yl) spec.yLabel = yl;
  if (/"connect"\s*:\s*true/.test(raw)) spec.connect = true;
  if (/"table"\s*:\s*true/.test(raw)) spec.table = true;
  const grabLabels = (key: string) => {
    const m = raw.match(new RegExp(`"${key}"\\s*:\\s*\\[([^\\]]*)\\]`));
    const items = m && m[1].match(/"([^"]*)"/g);
    return items ? items.map((q) => q.slice(1, -1)) : undefined;
  };
  const labels = grabLabels("labels");
  if (labels) spec.labels = labels;
  const sideLabels = grabLabels("sideLabels");
  if (sideLabels) spec.sideLabels = sideLabels;
  const angleLabels = grabLabels("angleLabels");
  if (angleLabels) spec.angleLabels = angleLabels;
  const right = raw.match(/"right"\s*:\s*(\d+)/);
  if (right) spec.right = parseInt(right[1], 10);
  const shape = str("shape");
  if (shape) spec.shape = shape;
  return spec.fn || spec.points || spec.shape ? spec : null;
}

export function normalizePlot(j: Record<string, unknown>): PlotSpec {
  const spec: PlotSpec = {};
  if (typeof j.fn === "string") spec.fn = j.fn;
  else if (Array.isArray(j.fn)) spec.fn = j.fn.filter((x): x is string => typeof x === "string");
  if (Array.isArray(j.domain) && j.domain.length === 2) {
    spec.domain = [Number(j.domain[0]), Number(j.domain[1])];
  }
  if (Array.isArray(j.points)) spec.points = j.points as [number, number][];
  if (typeof j.title === "string") spec.title = j.title;
  if (typeof j.xLabel === "string") spec.xLabel = j.xLabel;
  if (typeof j.yLabel === "string") spec.yLabel = j.yLabel;
  if (j.connect === true) spec.connect = true;
  if (j.table === true) spec.table = true;
  if (typeof j.shape === "string") spec.shape = j.shape;
  const strArr = (v: unknown) =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : undefined;
  spec.labels = strArr(j.labels);
  spec.sideLabels = strArr(j.sideLabels);
  spec.angleLabels = strArr(j.angleLabels);
  if (typeof j.right === "number") spec.right = j.right;
  // A figure with vertex labels or a named shape is geometry even if `connect`
  // was omitted.
  if ((spec.labels?.length || spec.sideLabels?.length || spec.shape) && (spec.points || spec.shape))
    spec.connect = true;
  return spec;
}

export function isGeometry(spec: PlotSpec): boolean {
  return Boolean(spec.connect || spec.shape || (spec.labels?.length && spec.points));
}

/* ------------------------------------------------------------------ *
 * Correction
 * ------------------------------------------------------------------ */

export interface Corrected {
  spec: PlotSpec;
  points: [number, number][];
  issues: FigureIssue[];
}

/**
 * Turn whatever the model emitted into a figure that is true to its own labels.
 *
 * Order of trust, highest first:
 *   1. Numeric side labels  — if it says 3, 4, 5 then the drawing is 3-4-5.
 *   2. A named shape        — "right-triangle" draws a real right triangle.
 *   3. Supplied coordinates — used only when they are non-degenerate.
 * The right-angle marker is then placed where the geometry actually has 90°,
 * never where the model claimed if that claim is false.
 */
export function correctGeometry(spec: PlotSpec): Corrected {
  const issues: FigureIssue[] = [];
  const given = (Array.isArray(spec.points) ? spec.points : []).filter(
    (p) => Array.isArray(p) && p.length === 2 && Number.isFinite(p[0]) && Number.isFinite(p[1])
  ) as [number, number][];

  let pts: [number, number][] = given;
  let right = spec.right;
  const shapeKey = (spec.shape || "").toLowerCase();
  const wantsRight = /right/.test(shapeKey) || typeof spec.right === "number";
  const degenerate = pts.length < 3 || polygonArea(pts) < 1e-6;

  // 1. Numeric side labels win: rebuild the triangle so it matches its numbers.
  const sl = spec.sideLabels ?? [];
  const nums = sl.map(numericLabel);
  const allThree = nums.length === 3 && nums.every((n): n is number => n !== null);
  if (allThree) {
    const built = triangleFromSides(nums as [number, number, number]);
    if (built) {
      const before = pts.length >= 3 ? sideLengths(pts) : null;
      // Only call it a repair if the drawing would actually have differed.
      const ratioOff =
        !before ||
        before.length !== 3 ||
        (() => {
          const k = before[0] / (nums[0] as number);
          return before.some((v, i) => Math.abs(v / (nums[i] as number) - k) > 0.02 * k);
        })();
      pts = built;
      if (ratioOff) {
        issues.push({
          code: "sides-rebuilt",
          repaired: true,
          detail: `Redrew the figure from its own side labels (${sl.join(", ")}) — the supplied coordinates were not in that ratio.`,
        });
      }
    } else {
      issues.push({
        code: "impossible-triangle",
        repaired: false,
        detail: `Side labels ${sl.join(", ")} cannot form a triangle (they break the triangle inequality). The maths in the answer is wrong, not just the picture.`,
      });
    }
  }

  // 2. A named shape, when we have no usable coordinates.
  if (pts.length < 3 || polygonArea(pts) < 1e-6) {
    const canon = canonicalShape(spec.shape);
    if (canon) {
      pts = canon.points;
      if (right == null) right = canon.right;
      if (given.length && degenerate) {
        issues.push({
          code: "degenerate",
          repaired: true,
          detail: `The supplied points were collinear or too few; drew a correct "${spec.shape}" instead.`,
        });
      }
    } else if (spec.shape) {
      issues.push({
        code: "unknown-shape",
        repaired: false,
        detail: `Unknown shape "${spec.shape}" and no usable points.`,
      });
    }
  }

  if (pts.length < 2) {
    issues.push({ code: "empty", repaired: false, detail: "No drawable geometry." });
    return { spec, points: pts, issues };
  }

  // 3. A named shape must actually be that shape.
  if (pts.length >= 3) {
    const sides = sideLengths(pts);
    const key = shapeKey.replace(/[\s_]+/g, "-");
    const equalSides = sides.every((v) => Math.abs(v - sides[0]) < 0.02 * sides[0]);
    if (key.includes("equilateral") && !equalSides) {
      const canon = canonicalShape("equilateral-triangle")!;
      pts = canon.points;
      issues.push({
        code: "shape-mismatch",
        repaired: true,
        detail: "Called it equilateral but the sides were unequal; drew a true equilateral triangle.",
      });
    } else if (key === "square" && !(equalSides && rightAngleIndex(pts) >= 0)) {
      pts = canonicalShape("square")!.points;
      issues.push({
        code: "shape-mismatch",
        repaired: true,
        detail: "Called it a square but the figure was not one; drew a true square.",
      });
    }
  }

  // 4. The right-angle marker goes where the geometry really is 90°.
  if (pts.length >= 3) {
    const found = rightAngleIndex(pts);
    if (wantsRight) {
      if (found < 0) {
        // It claims a right angle and has none. Rebuild rather than lie.
        const canon = canonicalShape(pts.length === 3 ? "right-triangle" : "rectangle")!;
        pts = canon.points;
        right = canon.right;
        issues.push({
          code: "no-right-angle",
          repaired: true,
          detail:
            "The figure was labelled right-angled but had no 90° angle — the classic 'equilateral triangle for a trigonometry question' error. Redrew it as a real right triangle.",
        });
      } else if (right !== found) {
        issues.push({
          code: "right-angle-moved",
          repaired: true,
          detail: `Right-angle marker was on vertex ${right}, but the 90° angle is at vertex ${found}. Moved it.`,
        });
        right = found;
      }
    } else if (found >= 0 && right == null) {
      right = found; // mark a right angle that is genuinely there
    }
  }

  const out: PlotSpec = { ...spec, right, points: pts };
  return { spec: out, points: pts, issues };
}

/* ------------------------------------------------------------------ *
 * Circuit diagrams (CBSE Class 10 Ch 12 "Electricity", Class 12 Ch 3
 * "Current Electricity") — a schematic, not a geometry figure, so it gets
 * its own spec and correction pass rather than being bent to fit PlotSpec.
 *
 * Resistors are drawn as the rectangle-box symbol NCERT uses (IS convention),
 * not the American zigzag — the same "convention beats aesthetics" rule the
 * geometry engine follows for right-angle markers.
 * ------------------------------------------------------------------ */

export type CircuitPart =
  | "cell" | "battery" | "resistor" | "bulb" | "switch" | "ammeter" | "voltmeter" | "rheostat";

const CIRCUIT_PARTS = new Set<CircuitPart>([
  "cell", "battery", "resistor", "bulb", "switch", "ammeter", "voltmeter", "rheostat",
]);

export interface CircuitComponent {
  kind: CircuitPart;
  label?: string;
  /** 0/undefined = the main series loop. A shared positive number groups components into one parallel branch. */
  branch?: number;
}

export interface CircuitSpec {
  title?: string;
  components: CircuitComponent[];
}

export function normalizeCircuit(j: Record<string, unknown>): CircuitSpec {
  const spec: CircuitSpec = { components: [] };
  if (typeof j.title === "string") spec.title = j.title;
  const arr = Array.isArray(j.components) ? j.components : [];
  spec.components = arr
    .map((c): CircuitComponent | null => {
      if (!c || typeof c !== "object") return null;
      const o = c as Record<string, unknown>;
      const kind = String(o.kind || "").toLowerCase() as CircuitPart;
      if (!CIRCUIT_PARTS.has(kind)) return null;
      const label = typeof o.label === "string" && o.label.trim() ? o.label.trim() : undefined;
      const branch = typeof o.branch === "number" && o.branch > 0 ? Math.round(o.branch) : undefined;
      return { kind, label, branch };
    })
    .filter((c): c is CircuitComponent => c !== null);
  return spec;
}

/** Parse a ```circuit block leniently, the same tolerance parsePlotSpec gives models. */
export function parseCircuitSpec(raw: string): CircuitSpec | null {
  try {
    const j = JSON.parse(raw);
    if (j && Array.isArray(j.components)) return normalizeCircuit(j);
  } catch {
    /* not clean JSON */
  }
  return null;
}

export interface CorrectedCircuit {
  spec: CircuitSpec;
  issues: FigureIssue[];
}

const isSource = (p: CircuitPart) => p === "cell" || p === "battery";

/**
 * Repair the two circuit mistakes a board examiner actually marks down:
 * an ammeter wired into a parallel branch (it must read the main current,
 * so it belongs in series) and a voltmeter wired into the main loop (it
 * must read a potential difference across a component, so it belongs in
 * its own parallel branch). A circuit with no power source at all is given
 * one rather than drawn as a dead loop.
 */
export function correctCircuit(spec: CircuitSpec): CorrectedCircuit {
  const issues: FigureIssue[] = [];
  let parts = spec.components;

  if (!parts.some((c) => isSource(c.kind))) {
    parts = [{ kind: "cell", label: "Cell" }, ...parts];
    issues.push({
      code: "no-source",
      repaired: true,
      detail: "No cell or battery in the circuit — a closed circuit needs a source; added a default cell.",
    });
  }

  // A source reads as the loop's supply, never as a load in a branch.
  parts = parts.map((c) => (isSource(c.kind) && c.branch ? { ...c, branch: undefined } : c));

  if (parts.some((c) => c.kind === "ammeter" && c.branch)) {
    parts = parts.map((c) => (c.kind === "ammeter" ? { ...c, branch: undefined } : c));
    issues.push({
      code: "ammeter-in-parallel",
      repaired: true,
      detail: "An ammeter reads the circuit current and must sit in series in the main loop — moved it off the parallel branch.",
    });
  }

  if (parts.some((c) => c.kind === "voltmeter" && !c.branch)) {
    const maxBranch = Math.max(0, ...parts.map((c) => c.branch ?? 0));
    parts = parts.map((c) => (c.kind === "voltmeter" && !c.branch ? { ...c, branch: maxBranch + 1 } : c));
    issues.push({
      code: "voltmeter-in-series",
      repaired: true,
      detail: "A voltmeter reads a potential difference and must be connected in parallel, not wired into the main loop — moved it to its own branch.",
    });
  }

  if (!parts.some((c) => !isSource(c.kind))) {
    issues.push({
      code: "empty-circuit",
      repaired: false,
      detail: "Nothing but a power source — a circuit needs a load to actually do something.",
    });
  }

  return { spec: { ...spec, components: parts }, issues };
}

/** Everything wrong with a circuit, after repairs. */
export function auditCircuit(spec: CircuitSpec): FigureIssue[] {
  const { spec: fixed, issues } = correctCircuit(spec);
  const out = [...issues];
  if (!fixed.title) out.push({ code: "no-title", repaired: false, detail: "Circuit has no title/caption." });
  const unlabelled = fixed.components.filter((c) => !c.label && c.kind !== "switch").length;
  if (unlabelled) {
    out.push({
      code: "unlabelled-figure",
      repaired: false,
      detail: `${unlabelled} component(s) have no label — a board diagram names every cell, resistor and meter.`,
    });
  }
  return out;
}

export function isDrawableCircuit(spec: CircuitSpec): boolean {
  return spec.components.length > 0;
}

/* ------------------------------------------------------------------ *
 * Auditing (used by the renderer's dev checks and by scripts/qa)
 * ------------------------------------------------------------------ */

/** Everything wrong with a figure, after repairs. */
export function auditFigure(spec: PlotSpec): FigureIssue[] {
  const issues: FigureIssue[] = [];
  if (isGeometry(spec)) {
    const { spec: fixed, points, issues: repairs } = correctGeometry(spec);
    issues.push(...repairs);
    if (points.length >= 3) {
      const need = points.length;
      if (!fixed.labels?.filter(Boolean).length) {
        issues.push({
          code: "unlabelled-figure",
          repaired: false,
          detail: "No vertex labels — a board diagram always names its vertices.",
        });
      } else if (fixed.labels.filter(Boolean).length < need) {
        issues.push({
          code: "unlabelled-figure",
          repaired: false,
          detail: `Only ${fixed.labels.filter(Boolean).length} of ${need} vertices are labelled.`,
        });
      }
      if (!fixed.sideLabels?.filter(Boolean).length && !fixed.angleLabels?.filter(Boolean).length) {
        issues.push({
          code: "unlabelled-figure",
          repaired: false,
          detail: "No side or angle labels — nothing on the figure can be measured or used.",
        });
      }
    }
  } else {
    const fns = typeof spec.fn === "string" ? [spec.fn] : spec.fn ?? [];
    for (const f of fns) {
      if (!compileFn(f)) {
        issues.push({ code: "bad-function", repaired: false, detail: `Cannot plot "${f}".` });
      }
    }
    if (!fns.length && !spec.points?.length) {
      issues.push({ code: "empty", repaired: false, detail: "Nothing to plot." });
    }
  }
  if (!spec.title) {
    issues.push({ code: "no-title", repaired: false, detail: "Figure has no title/caption." });
  }
  return issues;
}

/* ------------------------------------------------------------------ *
 * Safe expression compiler (no eval, no new Function)
 * ------------------------------------------------------------------ */

const MATH_FNS: Record<string, (n: number) => number> = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos,
  atan: Math.atan, sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs, exp: Math.exp,
  log: Math.log, log10: Math.log10, sign: Math.sign, floor: Math.floor,
  ceil: Math.ceil, round: Math.round,
};

/**
 * Compile a safe f(x) from an LLM-provided expression using a tiny
 * recursive-descent parser. Unknown identifiers or illegal characters return
 * null, so nothing can be executed.
 */
export function compileFn(expr: string): ((x: number) => number) | null {
  const raw0 = String(expr || "").toLowerCase().replace(/\s+/g, "");
  const src = raw0
    // "y=x^2-4" and "f(x)=x^2-4" are what models write half the time.
    .replace(/^y=/, "")
    .replace(/^f\(x\)=/, "")
    .replace(/^p\(x\)=/, "");
  if (!src) return null;
  // An implicit line — "2x+3y=6" — is how a student's textbook writes it and
  // how the model repeats it back. Rearranging it is the app's job, not the
  // student's: refusing to plot it means the commonest Class 10 graph question
  // silently produces no graph at all.
  if (/y/.test(src)) return compileImplicit(raw0);
  const raw: string[] = [];
  const re = /([0-9]*\.?[0-9]+)|([a-z_][a-z0-9_]*)|(\*\*|[-+*/^(),])/g;
  let cursor = 0;
  let mt: RegExpExecArray | null;
  while ((mt = re.exec(src)) !== null) {
    if (mt.index !== cursor) return null; // an illegal character sat in the gap
    raw.push(mt[0]);
    cursor = re.lastIndex;
  }
  if (cursor !== src.length) return null;
  for (const t of raw) {
    if (/^[a-z_]/.test(t) && t !== "x" && t !== "pi" && t !== "e" && !(t in MATH_FNS)) return null;
  }
  // Insert explicit * for implicit multiplication: 2x, 3(x+1), (x-1)(x+1), 2sin(x).
  const isValueEnd = (t: string) =>
    /^[0-9.]/.test(t) || t === "x" || t === "pi" || t === "e" || t === ")";
  const startsFactor = (t: string) =>
    /^[0-9.]/.test(t) || t === "x" || t === "pi" || t === "e" || t === "(" || t in MATH_FNS;
  const tokens: string[] = [];
  for (let i = 0; i < raw.length; i++) {
    tokens.push(raw[i]);
    if (i + 1 < raw.length && isValueEnd(raw[i]) && startsFactor(raw[i + 1])) tokens.push("*");
  }

  type Fn = (x: number) => number;
  let pos = 0;
  const peek = () => tokens[pos];
  const eat = (t?: string) => {
    if (t !== undefined && tokens[pos] !== t) throw new Error("parse");
    return tokens[pos++];
  };
  function parseExpr(): Fn {
    let left = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const op = eat();
      const right = parseTerm();
      const l = left;
      left = op === "+" ? (x) => l(x) + right(x) : (x) => l(x) - right(x);
    }
    return left;
  }
  function parseTerm(): Fn {
    let left = parsePow();
    while (peek() === "*" || peek() === "/") {
      const op = eat();
      const right = parsePow();
      const l = left;
      left = op === "*" ? (x) => l(x) * right(x) : (x) => l(x) / right(x);
    }
    return left;
  }
  function parsePow(): Fn {
    const base = parseUnary();
    if (peek() === "^" || peek() === "**") {
      eat();
      const exp = parsePow();
      return (x) => Math.pow(base(x), exp(x));
    }
    return base;
  }
  function parseUnary(): Fn {
    if (peek() === "-") { eat(); const v = parseUnary(); return (x) => -v(x); }
    if (peek() === "+") { eat(); return parseUnary(); }
    return parseAtom();
  }
  function parseAtom(): Fn {
    const t = peek();
    if (t === "(") { eat("("); const v = parseExpr(); eat(")"); return v; }
    if (t === "x") { eat(); return (x) => x; }
    if (t === "pi") { eat(); return () => Math.PI; }
    if (t === "e") { eat(); return () => Math.E; }
    if (t in MATH_FNS) { eat(); eat("("); const a = parseExpr(); eat(")"); const fn = MATH_FNS[t]; return (x) => fn(a(x)); }
    if (t !== undefined && /^[0-9.]/.test(t)) { eat(); const n = parseFloat(t); return () => n; }
    throw new Error("parse");
  }
  try {
    const fn = parseExpr();
    if (pos !== tokens.length) return null;
    return Number.isFinite(fn(0.37)) || Number.isFinite(fn(1)) ? fn : null;
  } catch {
    return null;
  }
}

/**
 * Solve an equation written in x and y for y, when it is linear in y.
 *
 * Covers "2x + 3y = 6", "3y - x = 0", "x + y = 5" — the whole family of
 * straight lines as they are actually printed in the book. The trick avoids any
 * symbolic algebra: an expression linear in y satisfies h(y) = my + c, so two
 * evaluations give m and c exactly, and y = -c/m.
 */
function compileImplicit(expr: string): ((x: number) => number) | null {
  const sides = expr.split("=");
  if (sides.length > 2) return null;
  const lhs = compileXY(sides[0]);
  const rhs = sides.length === 2 ? compileXY(sides[1]) : () => 0;
  if (!lhs || !rhs) return null;
  const h = (x: number, y: number) => lhs(x, y) - rhs(x, y);
  return (x: number) => {
    const c = h(x, 0);
    const m = h(x, 1) - c;
    if (!Number.isFinite(m) || Math.abs(m) < 1e-12) return NaN; // y does not appear
    return -c / m;
  };
}

/** The same safe parser, over two variables. */
function compileXY(expr: string): ((x: number, y: number) => number) | null {
  const src = String(expr || "").toLowerCase().replace(/\s+/g, "");
  if (!src) return null;
  const raw: string[] = [];
  const re = /([0-9]*\.?[0-9]+)|([a-z_][a-z0-9_]*)|(\*\*|[-+*/^(),])/g;
  let cursor = 0;
  let mt: RegExpExecArray | null;
  while ((mt = re.exec(src)) !== null) {
    if (mt.index !== cursor) return null;
    raw.push(mt[0]);
    cursor = re.lastIndex;
  }
  if (cursor !== src.length) return null;
  for (const t of raw) {
    if (/^[a-z_]/.test(t) && !["x", "y", "pi", "e"].includes(t) && !(t in MATH_FNS)) return null;
  }
  const isValueEnd = (t: string) =>
    /^[0-9.]/.test(t) || t === "x" || t === "y" || t === "pi" || t === "e" || t === ")";
  const startsFactor = (t: string) =>
    /^[0-9.]/.test(t) || t === "x" || t === "y" || t === "pi" || t === "e" || t === "(" || t in MATH_FNS;
  const tokens: string[] = [];
  for (let i = 0; i < raw.length; i++) {
    tokens.push(raw[i]);
    if (i + 1 < raw.length && isValueEnd(raw[i]) && startsFactor(raw[i + 1])) tokens.push("*");
  }

  type Fn2 = (x: number, y: number) => number;
  let pos = 0;
  const peek = () => tokens[pos];
  const eat = (t?: string) => {
    if (t !== undefined && tokens[pos] !== t) throw new Error("parse");
    return tokens[pos++];
  };
  function parseExpr(): Fn2 {
    let left = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const op = eat();
      const right = parseTerm();
      const l = left;
      left = op === "+" ? (x, y) => l(x, y) + right(x, y) : (x, y) => l(x, y) - right(x, y);
    }
    return left;
  }
  function parseTerm(): Fn2 {
    let left = parsePow();
    while (peek() === "*" || peek() === "/") {
      const op = eat();
      const right = parsePow();
      const l = left;
      left = op === "*" ? (x, y) => l(x, y) * right(x, y) : (x, y) => l(x, y) / right(x, y);
    }
    return left;
  }
  function parsePow(): Fn2 {
    const base = parseUnary();
    if (peek() === "^" || peek() === "**") {
      eat();
      const exp = parsePow();
      return (x, y) => Math.pow(base(x, y), exp(x, y));
    }
    return base;
  }
  function parseUnary(): Fn2 {
    if (peek() === "-") { eat(); const v = parseUnary(); return (x, y) => -v(x, y); }
    if (peek() === "+") { eat(); return parseUnary(); }
    return parseAtom();
  }
  function parseAtom(): Fn2 {
    const t = peek();
    if (t === "(") { eat("("); const v = parseExpr(); eat(")"); return v; }
    if (t === "x") { eat(); return (x) => x; }
    if (t === "y") { eat(); return (_x, y) => y; }
    if (t === "pi") { eat(); return () => Math.PI; }
    if (t === "e") { eat(); return () => Math.E; }
    if (t in MATH_FNS) { eat(); eat("("); const a = parseExpr(); eat(")"); const fn = MATH_FNS[t]; return (x, y) => fn(a(x, y)); }
    if (t !== undefined && /^[0-9.]/.test(t)) { eat(); const n = parseFloat(t); return () => n; }
    throw new Error("parse");
  }
  try {
    const fn = parseExpr();
    return pos === tokens.length ? fn : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Does this figure belong to this answer?
 * ------------------------------------------------------------------ */

const GEOMETRY_WORDS =
  /\b(?:triangle|square|rectangle|circle|angle|angles|side|sides|hypotenuse|vertex|vertices|polygon|quadrilateral|parallelogram|rhombus|trapezium|trapezoid|pentagon|hexagon|diagonal|perpendicular|degree|degrees|opposite|adjacent|base|height|altitude|sin|cos|tan|theta|pythagoras|pythagorean)\b/i;

/**
 * Is a drawn shape actually about what the answer is about?
 *
 * Measured on the local 3B: asked to explain the water cycle, it produced a
 * labelled triangle. The geometry is valid, the figure is well formed, and it
 * is completely unrelated to the lesson — which is worse than no figure, since
 * a student trusts a picture more than a paragraph. When nothing in the prose
 * is geometric, the shape does not belong to this answer.
 */
export function figureFitsProse(spec: PlotSpec, prose: string): boolean {
  if (!isGeometry(spec)) return true; // a graph is judged by its own function
  if (GEOMETRY_WORDS.test(prose)) return true;
  if (spec.shape && new RegExp(`\\b${spec.shape.replace(/[-_]/g, "[ -]?")}\\b`, "i").test(prose)) {
    return true;
  }
  // Vertex names being discussed ("in triangle ABC…") also count.
  const labels = (spec.labels ?? []).filter(Boolean);
  if (labels.length >= 3 && prose.includes(labels.join(""))) return true;
  return false;
}

/** Is there genuinely anything to draw? */
export function isDrawable(spec: PlotSpec): boolean {
  if (isGeometry(spec)) {
    const { points } = correctGeometry(spec);
    return points.length >= 2;
  }
  const fns = typeof spec.fn === "string" ? [spec.fn] : (spec.fn ?? []);
  if (fns.some((f) => compileFn(f))) return true;
  return Array.isArray(spec.points) && spec.points.length > 0;
}

/**
 * The table of values behind a curve.
 *
 * "Where did the line come from?" is the fair question a student asks of a bare
 * graph, and the textbook always answers it with a small x/y table before the
 * plot. Whole integers inside the domain, so the numbers are ones a student can
 * check by hand.
 */
export function valueTable(
  f: (x: number) => number,
  domain: [number, number],
  max = 9
): { x: number; y: number }[] {
  const [a, b] = domain;
  const lo = Math.ceil(Math.min(a, b));
  const hi = Math.floor(Math.max(a, b));
  const span = hi - lo;
  if (!Number.isFinite(span) || span < 1) return [];
  const step = Math.max(1, Math.ceil((span + 1) / max));
  const rows: { x: number; y: number }[] = [];
  for (let x = lo; x <= hi; x += step) {
    const y = f(x);
    if (Number.isFinite(y)) rows.push({ x, y: Number(y.toFixed(2)) });
  }
  return rows.length >= 3 ? rows : [];
}

/** Where a sampled curve crosses y = 0, refined by bisection. */
export function rootsOf(curve: [number, number][], f: (x: number) => number): number[] {
  const roots: number[] = [];
  for (let i = 1; i < curve.length; i++) {
    const [x0, y0] = curve[i - 1];
    const [x1, y1] = curve[i];
    if (!Number.isFinite(y0) || !Number.isFinite(y1)) continue;
    if (y0 === 0) roots.push(x0);
    else if (y0 * y1 < 0) {
      let lo = x0, hi = x1;
      for (let k = 0; k < 40; k++) {
        const mid = (lo + hi) / 2;
        if (f(lo) * f(mid) <= 0) hi = mid;
        else lo = mid;
      }
      roots.push((lo + hi) / 2);
    }
  }
  return [...new Set(roots.map((r) => Number(r.toFixed(2))))].slice(0, 6);
}

/** Is this code block a picture typed out of keyboard characters? */
export function isTextArt(block: string): boolean {
  const lines = block.split("\n").filter((l) => l.trim().length);
  if (lines.length < 2) return false;
  const dense = lines.join("").replace(/\s/g, "");
  if (dense.length < 6) return false;
  const strokes = (dense.match(/[|/\\_+\-=°*]/g) || []).length;
  return strokes / dense.length >= 0.4;
}
