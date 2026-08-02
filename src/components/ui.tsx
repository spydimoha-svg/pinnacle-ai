import { useEffect, useRef, useState, type ReactNode } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import markedKatex from "marked-katex-extension";
import { Lightbulb } from "lucide-react";
import {
  angleAt,
  compileFn,
  correctGeometry,
  figureFitsProse,
  isDrawable,
  isGeometry,
  isTextArt,
  parsePlotSpec,
  rootsOf,
  sideLengths,
  valueTable,
  type PlotSpec,
} from "../lib/figure";

// Render LaTeX math ($...$ and $$...$$) in tutor output. KaTeX runs
// synchronously, so it also works on the live streaming draft. output:"html"
// keeps math as styled spans that survive DOMPurify's default profile.
marked.use(markedKatex({ throwOnError: false, output: "html", nonStandard: true }));

/** Board-paper style section header: gold mono eyebrow + display title. */
export function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        <div className="eyebrow mb-1">{eyebrow}</div>
        <h2 className="text-xl font-semibold text-cream">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: ReactNode;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="card">
      <div className="eyebrow-dim mb-2">{label}</div>
      <div
        className={`font-display text-2xl font-bold ${accent ? "text-gold" : "text-cream"}`}
      >
        {value}
      </div>
      {sub && <div className="text-xs text-dim mt-1">{sub}</div>}
    </div>
  );
}

export function ProgressBar({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={`h-1.5 rounded-full bg-raise overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-gold transition-all duration-500"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

export function MarksBadge({ marks }: { marks: number }) {
  return <span className="marks">[{marks}]</span>;
}

/** The revealed marking-scheme answer, examiner keywords and examiner tip for
 * a question — shared by Chapter, Papers and Worksheets so the three stay in
 * visual lockstep. */
export function MarkingSchemeReveal({
  answer,
  keywords,
  examinerTip,
}: {
  answer: string;
  keywords: string[];
  examinerTip?: string;
}) {
  return (
    <div className="space-y-3">
      <div>
        <div className="eyebrow-dim mb-2">Marking-scheme answer</div>
        <Markdown text={answer} />
      </div>
      {keywords.length > 0 && (
        <div>
          <div className="eyebrow-dim mb-2">Examiner looks for</div>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((k) => (
              <span key={k} className="chip-gold">
                {k}
              </span>
            ))}
          </div>
        </div>
      )}
      {examinerTip && (
        <p className="text-xs text-muted flex items-start gap-2">
          <Lightbulb size={14} className="text-gold shrink-0 mt-0.5" />
          {examinerTip}
        </p>
      )}
    </div>
  );
}

export function Empty({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="card text-center py-12">
      <div className="font-display text-lg font-semibold text-cream mb-1">
        {title}
      </div>
      <p className="text-sm text-muted max-w-md mx-auto mb-4">{body}</p>
      {action}
    </div>
  );
}

export function Spinner({ size = 18 }: { size?: number }) {
  return (
    <span
      className="inline-block rounded-full border-2 border-line border-t-gold animate-spin align-middle"
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const focusable = () =>
      dialog?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      ) ?? [];
    (focusable()[0] ?? dialog)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(focusable());
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-pit/80 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="card max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <button
            className="text-dim hover:text-cream text-xl leading-none px-2"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Models emit math as $..$/$$..$$ OR \(..\)/\[..\]. Normalise to what KaTeX reads. */
function normalizeMath(t: string): string {
  return (
    t
      // \[..\] → display, \(..\) → inline
      .replace(/\\\[([\s\S]*?)\\\]/g, (_m, e) => `\n\n$$${e.trim()}$$\n\n`)
      .replace(/\\\(([\s\S]*?)\\\)/g, (_m, e) => `$${e}$`)
      // Isolate every $$..$$ display block onto its own line with blank lines
      // around it. Small models routinely glue a $$ block straight onto the
      // surrounding text with no blank line; marked then folds it into a
      // paragraph, the block-level KaTeX rule never fires, and the $$ leaks as
      // raw text — or, in dense passages, the inline rule mis-pairs the $$ and
      // feeds KaTeX a huge wrong string that renders as red errors. Forcing each
      // $$..$$ to stand alone makes display math render reliably.
      .replace(/\$\$\s*([\s\S]+?)\s*\$\$/g, (_m, e) => `\n\n$$${e.trim()}$$\n\n`)
  );
}
function proseHtml(text: string): string {
  const raw = marked.parse(normalizeMath(text), { async: false, breaks: true }) as string;
  return DOMPurify.sanitize(raw);
}

// --- Mermaid diagrams: lazy-loaded (heavy + async), kept out of the main bundle.
let mermaidLoad: Promise<any> | null = null;
function getMermaid(): Promise<any> {
  if (!mermaidLoad) {
    mermaidLoad = import("mermaid").then((mod) => {
      mod.default.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        // The app is dark-only, so there is no scheme to branch on. Mermaid's
        // own "dark" theme is lavender and grey, which next to the gold read as
        // a screenshot borrowed from another product. This is the Pinnacle
        // palette, in Pinnacle's type.
        theme: "base",
        // Never let mermaid paint its own "Syntax error in text" graphic into
        // the page: a student who asked for a triangle should not be shown a
        // parser complaint and a library version number.
        suppressErrorRendering: true,
        // Rough edges and slightly imperfect boxes, the way a teacher draws a
        // flowchart on a board — not the way a machine emits one.
        look: "handDrawn",
        handDrawnSeed: 1,
        fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif",
        themeVariables: {
          background: "#050505",
          mainBkg: "#101010",
          primaryColor: "#101010",
          primaryTextColor: "#f0ede6",
          primaryBorderColor: "#8a6524",
          secondaryColor: "#17171a",
          secondaryTextColor: "#f0ede6",
          secondaryBorderColor: "#8a6524",
          tertiaryColor: "#0b0b0c",
          tertiaryTextColor: "#f0ede6",
          tertiaryBorderColor: "#1e1e20",
          lineColor: "#c79e4f",
          textColor: "#f0ede6",
          nodeBorder: "#8a6524",
          nodeTextColor: "#f0ede6",
          clusterBkg: "#0b0b0c",
          clusterBorder: "#1e1e20",
          edgeLabelBackground: "#050505",
          titleColor: "#e8c889",
          fontSize: "14px",
        },
        flowchart: {
          htmlLabels: false,
          curve: "basis",
          padding: 14,
          nodeSpacing: 40,
          rankSpacing: 46,
        },
        sequence: { useMaxWidth: true },
      });
      return mod.default;
    });
  }
  return mermaidLoad;
}
let diagramSeq = 0;
function Mermaid({ source }: { source: string }) {
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let alive = true;
    setSvg("");
    setFailed(false);
    getMermaid()
      // parse() throws on bad syntax; render() does not — it happily returns an
      // SVG of the error message. Validating first is the only way to know.
      .then(async (mm) => {
        await mm.parse(source);
        return mm.render(`pnz-diagram-${++diagramSeq}`, source);
      })
      .then((res: { svg: string }) => {
        // mermaid securityLevel:"strict" already sanitizes (strips HTML/script from
        // labels); a second DOMPurify pass was emptying the SVG <text> nodes.
        if (alive) setSvg(res.svg);
      })
      .catch(() => { if (alive) setFailed(true); });
    return () => { alive = false; };
  }, [source]);
  // Raw mermaid source means nothing to a Class 10 student, so a diagram that
  // will not draw says so in words instead of dumping its own markup.
  if (failed) {
    return (
      <p className="text-sm text-dim italic my-3">
        (I couldn't draw that one properly — ask me to try it again.)
      </p>
    );
  }
  if (!svg) return <div className="text-xs text-muted my-3">drawing diagram…</div>;
  return <div className="tutor-diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}

// --- Function/point graphs + labeled geometry: a small dependency-free SVG
// plotter. The parsing, the canonical shapes and the correction pass all live
// in lib/figure.ts so the automated tutor audit checks the same figure the
// student sees; this file only draws.
// Tokens, not literals: a graph drawn by the tutor should be in the same four
// colours as the rest of the product.
const CURVE_COLORS = [
  "var(--color-gold)",
  "var(--color-sky)",
  "var(--color-violet)",
  "var(--color-mint)",
];

/**
 * A clean, labeled geometric figure (triangle, quadrilateral, …) drawn from a
 * few connected points — the professional replacement for ASCII-art diagrams.
 * Preserves aspect ratio so a right triangle actually looks right.
 */
const VERTEX_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H"];

function GeometryFigure({ spec, pts }: { spec: PlotSpec; pts: [number, number][] }) {
  const W = 380, H = 268, pad = 46;
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const xmin = Math.min(...xs), xmax = Math.max(...xs);
  const ymin = Math.min(...ys), ymax = Math.max(...ys);
  const rx = Math.max(1e-6, xmax - xmin);
  const ry = Math.max(1e-6, ymax - ymin);
  const scale = Math.min((W - 2 * pad) / rx, (H - 2 * pad) / ry);
  const drawnW = rx * scale, drawnH = ry * scale;
  const offX = (W - drawnW) / 2, offY = (H - drawnH) / 2;
  const sx = (x: number) => offX + (x - xmin) * scale;
  const sy = (y: number) => offY + (ymax - y) * scale; // flip: maths y-up → svg y-down
  const S = (p: [number, number]) => [sx(p[0]), sy(p[1])] as [number, number];

  const scr = pts.map(S);
  const cx = scr.reduce((s, p) => s + p[0], 0) / scr.length;
  const cy = scr.reduce((s, p) => s + p[1], 0) / scr.length;
  const outward = (x: number, y: number, dist: number): [number, number] => {
    const dx = x - cx, dy = y - cy;
    const m = Math.hypot(dx, dy) || 1;
    return [x + (dx / m) * dist, y + (dy / m) * dist];
  };

  const poly = scr.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") + " Z";

  // Right-angle marker: a small square tucked into the corner at spec.right.
  let rightMark = "";
  if (typeof spec.right === "number" && spec.right >= 0 && spec.right < scr.length && scr.length >= 3) {
    const i = spec.right;
    const v = scr[i];
    const p = scr[(i - 1 + scr.length) % scr.length];
    const n = scr[(i + 1) % scr.length];
    const unit = (from: number[], to: number[]) => {
      const dx = to[0] - from[0], dy = to[1] - from[1];
      const m = Math.hypot(dx, dy) || 1;
      return [dx / m, dy / m];
    };
    const u1 = unit(v, p), u2 = unit(v, n);
    const d = 13;
    const a1 = [v[0] + u1[0] * d, v[1] + u1[1] * d];
    const a2 = [v[0] + u1[0] * d + u2[0] * d, v[1] + u1[1] * d + u2[1] * d];
    const a3 = [v[0] + u2[0] * d, v[1] + u2[1] * d];
    rightMark = `M${a1[0].toFixed(1)},${a1[1].toFixed(1)} L${a2[0].toFixed(1)},${a2[1].toFixed(1)} L${a3[0].toFixed(1)},${a3[1].toFixed(1)}`;
  }

  // Interior angle arcs. A geometry figure with no angle on it is half a
  // figure: most board questions are answered by reading an angle off it.
  const arcs =
    scr.length >= 3
      ? scr.map((v, i) => {
          const label = spec.angleLabels?.[i];
          const isRight = i === spec.right;
          if (!label && !isRight) return null;
          if (isRight && !label) return null; // the square marker already says 90°
          const prev = scr[(i - 1 + scr.length) % scr.length];
          const next = scr[(i + 1) % scr.length];
          const ang = (p: number[]) => Math.atan2(p[1] - v[1], p[0] - v[0]);
          let a1 = ang(prev), a2 = ang(next);
          let delta = a2 - a1;
          while (delta <= -Math.PI) delta += 2 * Math.PI;
          while (delta > Math.PI) delta -= 2 * Math.PI;
          const r = 22;
          const sweep = delta > 0 ? 1 : 0;
          const p1 = [v[0] + r * Math.cos(a1), v[1] + r * Math.sin(a1)];
          const p2 = [v[0] + r * Math.cos(a2), v[1] + r * Math.sin(a2)];
          const mid = a1 + delta / 2;
          const lp = [v[0] + (r + 13) * Math.cos(mid), v[1] + (r + 13) * Math.sin(mid)];
          return {
            i,
            d: `M${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 0 ${sweep} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`,
            label,
            lx: lp[0],
            ly: lp[1],
          };
        })
      : [];

  // The true, measured angle at each vertex — used for the accessible
  // description so a screen reader hears a real figure, not "diagram".
  const described =
    scr.length >= 3
      ? pts
          .map((_, i) => `${spec.labels?.[i] ?? VERTEX_NAMES[i] ?? i} ≈ ${Math.round(angleAt(pts, i))}°`)
          .join(", ")
      : "";

  return (
    <figure className="tutor-plot tutor-geom">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${spec.title ?? "Diagram"}. Angles: ${described}.`}
      >
        <path d={poly} fill="rgba(232,200,137,0.10)" stroke="var(--color-gold)" strokeWidth="2" strokeLinejoin="round" />
        {arcs.map(
          (a) =>
            a && (
              <g key={`a${a.i}`}>
                <path d={a.d} fill="none" stroke="var(--color-gold-bright)" strokeWidth="1.2" opacity="0.85" />
                <text x={a.lx} y={a.ly} className="geom-angle" textAnchor="middle" dominantBaseline="middle">
                  {a.label}
                </text>
              </g>
            )
        )}
        {rightMark && <path d={rightMark} fill="none" stroke="var(--color-gold-bright)" strokeWidth="1.4" />}
        {/* side labels at each edge midpoint */}
        {(spec.sideLabels ?? []).map((lbl, i) => {
          if (!lbl || i >= scr.length) return null;
          const a1 = scr[i], b1 = scr[(i + 1) % scr.length];
          const mid: [number, number] = [(a1[0] + b1[0]) / 2, (a1[1] + b1[1]) / 2];
          const [lx, ly] = outward(mid[0], mid[1], 14);
          return (
            <text key={`s${i}`} x={lx} y={ly} className="geom-side" textAnchor="middle" dominantBaseline="middle">{lbl}</text>
          );
        })}
        {/* vertices + vertex labels. Unnamed vertices are named A, B, C… here:
            an unlabelled board diagram scores zero, so the app never ships one. */}
        {scr.map((p, i) => {
          const lbl = spec.labels?.[i] || VERTEX_NAMES[i] || "";
          const [lx, ly] = outward(p[0], p[1], 16);
          return (
            <g key={`v${i}`}>
              <circle cx={p[0]} cy={p[1]} r="3" fill="var(--color-gold-bright)" />
              {lbl && <text x={lx} y={ly} className="geom-vertex" textAnchor="middle" dominantBaseline="middle">{lbl}</text>}
            </g>
          );
        })}
      </svg>
      {spec.title && <Caption text={spec.title} />}
    </figure>
  );
}

/**
 * A figure's caption, rendered through the same markdown+KaTeX pipeline as the
 * prose. A graph captioned "y = x^2 - 2x - 8" in plain text under an answer
 * that sets every other expression as real maths looks like the machine forgot
 * — the model is asked to write titles as $...$ and this renders them.
 */
function Caption({ text }: { text: string }) {
  const html = DOMPurify.sanitize(
    marked.parseInline(normalizeMath(text), { async: false }) as string
  );
  return <figcaption dangerouslySetInnerHTML={{ __html: html }} />;
}

/** A round number to step an axis by: 1, 2, 5, 10, 20, 50 … for the range. */
function niceStep(range: number, target = 6): number {
  if (!Number.isFinite(range) || range <= 0) return 1;
  const rough = range / target;
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const n = rough / mag;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * mag;
}

function ticksFor(min: number, max: number): number[] {
  const step = niceStep(max - min);
  const out: number[] = [];
  for (let t = Math.ceil(min / step) * step; t <= max + step * 1e-6; t += step) {
    // Kill -0 and floating-point dust like 1.9999999999998.
    const v = Math.abs(t) < step * 1e-6 ? 0 : Number(t.toPrecision(12));
    out.push(v);
  }
  return out;
}

function FunctionPlot({ spec }: { spec: PlotSpec }) {
  const W = 380, H = 262, pad = 40;
  // Geometry mode: a connected, labeled figure rather than a graph. The
  // correction pass runs first, so what is drawn agrees with what it is
  // labelled — a "right triangle, 3-4-5" is drawn 3-4-5 with the right angle
  // where the geometry actually puts it, whatever the model claimed.
  if (isGeometry(spec)) {
    const fixed = correctGeometry(spec);
    if (fixed.points.length >= 2) return <GeometryFigure spec={fixed.spec} pts={fixed.points} />;
  }
  const curves: [number, number][][] = [];
  const hasPoints = Array.isArray(spec.points) && spec.points.length > 0;
  if (hasPoints) {
    const sc = (spec.points as [number, number][]).filter(
      (p) => Array.isArray(p) && p.length === 2 && Number.isFinite(p[0]) && Number.isFinite(p[1])
    );
    if (sc.length) curves.push(sc);
  }
  const fns = typeof spec.fn === "string" ? [spec.fn] : Array.isArray(spec.fn) ? spec.fn : [];
  const [a, b] = spec.domain && spec.domain.length === 2 ? spec.domain : [-10, 10];
  const compiled: { f: (x: number) => number; curve: [number, number][] }[] = [];
  for (const fnStr of fns) {
    const f = compileFn(fnStr);
    if (!f) continue;
    const c: [number, number][] = [];
    for (let i = 0; i <= 160; i++) {
      const x = a + ((b - a) * i) / 160;
      const y = f(x);
      if (Number.isFinite(y)) c.push([x, y]);
    }
    if (c.length) {
      curves.push(c);
      compiled.push({ f, curve: c });
    }
  }
  if (!curves.length) {
    return <pre><code>{typeof spec.fn === "string" ? spec.fn : JSON.stringify(spec)}</code></pre>;
  }
  const all = curves.flat();
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);
  let xmin = Math.min(...xs), xmax = Math.max(...xs);
  let ymin = Math.min(...ys), ymax = Math.max(...ys);
  if (fns.length && ymax - ymin > 400) { ymin = Math.max(ymin, -40); ymax = Math.min(ymax, 40); }
  if (xmin === xmax) { xmin -= 1; xmax += 1; }
  if (ymin === ymax) { ymin -= 1; ymax += 1; }
  const px = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (W - 2 * pad);
  const py = (y: number) => H - pad - ((y - ymin) / (ymax - ymin)) * (H - 2 * pad);
  const yAxis = xmin <= 0 && xmax >= 0 ? px(0) : null;
  const xAxis = ymin <= 0 && ymax >= 0 ? py(0) : null;

  // A graph with no scale on it teaches nothing — the student cannot read a
  // value off it, which is most of what a board question asks them to do.
  const xTicks = ticksFor(xmin, xmax);
  const yTicks = ticksFor(ymin, ymax);
  const xBase = xAxis ?? H - pad; // labels ride the axis, or the frame if it is off-screen
  const yBase = yAxis ?? pad;
  // Only for a single curve: several overlapping sets of roots is clutter.
  const roots =
    compiled.length === 1 && !hasPoints ? rootsOf(compiled[0].curve, compiled[0].f) : [];

  // The working behind the curve. A student asked to "draw the graph" is being
  // marked on the table of values as much as on the curve, and a line that
  // appears with no numbers behind it teaches nothing about where it came from.
  const table =
    compiled.length === 1 && !hasPoints && spec.table !== false
      ? valueTable(compiled[0].f, [a, b])
      : [];
  const xName = spec.xLabel || "x";
  const yName = spec.yLabel || "y";

  return (
    <figure className="tutor-plot">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${spec.title ?? "Graph"}. Horizontal axis ${xName} from ${xmin.toFixed(0)} to ${xmax.toFixed(0)}, vertical axis ${yName}${roots.length ? `. Cuts the ${xName}-axis at ${roots.join(" and ")}` : ""}.`}
      >
        <defs>
          <marker id="pnz-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-gold-dim, #8a6524)" />
          </marker>
        </defs>
        <g className="grid">
          {xTicks.map((t) => (
            <line key={`gx${t}`} x1={px(t)} y1={pad} x2={px(t)} y2={H - pad} />
          ))}
          {yTicks.map((t) => (
            <line key={`gy${t}`} x1={pad} y1={py(t)} x2={W - pad} y2={py(t)} />
          ))}
        </g>
        {/* Axes, arrowed and NAMED. An unnamed axis is the single most common
            reason a board diagram loses its mark. */}
        {xAxis !== null && (
          <>
            <line x1={pad} y1={xAxis} x2={W - pad + 8} y2={xAxis} className="ax" markerEnd="url(#pnz-arrow)" />
            <text x={W - pad + 12} y={xAxis + 4} className="axis-name" textAnchor="start">{xName}</text>
          </>
        )}
        {yAxis !== null && (
          <>
            <line x1={yAxis} y1={H - pad} x2={yAxis} y2={pad - 8} className="ax" markerEnd="url(#pnz-arrow)" />
            <text x={yAxis + 6} y={pad - 12} className="axis-name" textAnchor="start">{yName}</text>
          </>
        )}
        {xAxis !== null && yAxis !== null && (
          <text x={yAxis - 5} y={xAxis + 13} className="tick" textAnchor="end">0</text>
        )}
        <g className="tick">
          {xTicks.map((t) =>
            // A tick that sits under a marked root would print the same number
            // twice, once either side of the axis.
            t === 0 || roots.some((r) => Math.abs(r - t) < 1e-6) ? null : (
              <text key={`tx${t}`} x={px(t)} y={xBase + 13} textAnchor="middle">
                {t}
              </text>
            )
          )}
          {yTicks.map((t) =>
            t === 0 ? null : (
              <text key={`ty${t}`} x={yBase - 6} y={py(t)} textAnchor="end" dominantBaseline="middle">
                {t}
              </text>
            )
          )}
        </g>
        {curves.map((c, ci) => {
          if (hasPoints && ci === 0) {
            return (
              <g key={ci}>
                {c.map((p, i) => (
                  <circle key={i} cx={px(p[0])} cy={py(p[1])} r="3.2" className="pt" />
                ))}
              </g>
            );
          }
          const d = c
            .filter((p) => p[1] >= ymin && p[1] <= ymax)
            .map((p, i) => `${i ? "L" : "M"}${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}`)
            .join(" ");
          return (
            <path
              key={ci}
              d={d}
              fill="none"
              stroke={CURVE_COLORS[ci % CURVE_COLORS.length]}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          );
        })}
        {/* The points from the table, marked on the curve. This is what makes the
            line traceable: every dot is a row the student can check by hand. */}
        {table.map((row) =>
          row.y >= ymin && row.y <= ymax ? (
            <circle key={`p${row.x}`} cx={px(row.x)} cy={py(row.y)} r="2.6" className="plotted" />
          ) : null
        )}
        {/* Where the curve cuts the x-axis, called out the way a textbook does. */}
        {roots.map((r) => (
          <g key={`r${r}`} className="root">
            <circle cx={px(r)} cy={py(0)} r="3.6" />
            <text x={px(r)} y={py(0) - 10} textAnchor="middle">
              {r}
            </text>
          </g>
        ))}
      </svg>
      {table.length > 0 && (
        <table className="plot-table">
          <tbody>
            <tr>
              <th scope="row">{xName}</th>
              {table.map((r) => (
                <td key={`tx${r.x}`}>{r.x}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">{yName}</th>
              {table.map((r) => (
                <td key={`ty${r.x}`}>{r.y}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
      {spec.title && <Caption text={spec.title} />}
    </figure>
  );
}

type Seg = { type: "prose" | "mermaid" | "plot"; content: string };
function segmentContent(text: string): Seg[] {
  const re = /```(mermaid|plot)\s*\n([\s\S]*?)```/g;
  const segs: Seg[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) segs.push({ type: "prose", content: text.slice(last, m.index) });
    segs.push({ type: m[1] as "mermaid" | "plot", content: m[2].trim() });
    last = re.lastIndex;
  }
  if (last < text.length) segs.push({ type: "prose", content: text.slice(last) });
  return segs.length ? segs : [{ type: "prose", content: text }];
}

/**
 * Renders tutor/AI markdown with LaTeX math, mermaid diagrams and drawn graphs.
 * While `streaming`, diagram/plot blocks show as code and only render once the
 * message is complete, to avoid drawing half-finished sources every token.
 */
/**
 * Text art, removed before it can render.
 *
 * The prompt forbids it and the cloud model obeys, but the local 3B brain still
 * types triangles out of pipes and dashes — and one bad habit in the transcript
 * teaches the next reply to do the same. Enforcing it here means no model, on
 * any day, can put a keyboard drawing in front of a student. Real figures live
 * in ```plot and ```mermaid blocks, which are left alone.
 */
const ART_NOTE = "\n\n_(I sketched that in text — ask me to draw it properly.)_\n\n";

function stripTextArt(text: string): string {
  const out = text.replace(
    /```([a-zA-Z]*)[ \t]*\n([\s\S]*?)```/g,
    (whole, lang: string, body: string) => {
      const tag = (lang || "").toLowerCase();
      if (tag === "mermaid" || tag === "plot") return whole;
      return isTextArt(body) ? ART_NOTE : whole;
    }
  );
  // A reply cut off by the token ceiling leaves its last fence unclosed, and
  // markdown still renders that to the end as a code block. Every closed fence
  // is gone by now, so a surviving ``` can only be that one.
  const open = /```([a-zA-Z]*)[ \t]*\n([\s\S]*)$/.exec(out);
  if (open && open.index !== undefined) {
    const tag = (open[1] || "").toLowerCase();
    if (tag !== "mermaid" && tag !== "plot" && isTextArt(open[2])) {
      return out.slice(0, open.index) + ART_NOTE;
    }
  }
  return out;
}

export function Markdown({ text, streaming }: { text: string; streaming?: boolean }) {
  // Not while streaming: a half-arrived code block looks like text art, and
  // deleting it mid-flight makes the answer flicker.
  const segs = segmentContent(streaming ? text : stripTextArt(text));
  // The words around the figures, used to judge whether a figure belongs here.
  const prose = segs
    .filter((s) => s.type === "prose")
    .map((s) => s.content)
    .join(" ");
  return (
    <div className="prose-tutor">
      {segs.map((s, i) => {
        if (s.type === "prose") {
          return <div key={i} dangerouslySetInnerHTML={{ __html: proseHtml(s.content) }} />;
        }
        if (streaming) {
          return <pre key={i}><code>{s.content}</code></pre>;
        }
        if (s.type === "mermaid") return <Mermaid key={i} source={s.content} />;
        const spec = parsePlotSpec(s.content);
        // Three ways a figure gets dropped instead of drawn, all of them
        // better than what they replace:
        //   • it will not parse            → the raw JSON is not a diagram
        //   • there is nothing drawable    → an empty frame teaches nothing
        //   • it has nothing to do with the answer → a labelled triangle under
        //     an explanation of the water cycle is worse than no picture,
        //     because a student trusts a picture more than a paragraph.
        if (!spec || !isDrawable(spec) || !figureFitsProse(spec, prose)) return null;
        return <FunctionPlot key={i} spec={spec} />;
      })}
    </div>
  );
}
