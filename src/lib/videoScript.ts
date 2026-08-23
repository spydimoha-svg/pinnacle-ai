import type { ClassLevel } from "./types";
import type { NarrationLang } from "./speech";
import type { Character, Emotion } from "../data/cast";
import { resolveKind, SCENE_KINDS, type Scene3D } from "../components/cast/Stage3D";

/**
 * What appears on screen beside the character while they talk.
 *
 * The old player had one answer to this — big text — which is why every video
 * came out as narrated documentation. A lesson about a cone should show a cone
 * you can turn; a lesson about a parabola should show the curve being drawn.
 */
export type SceneVisual =
  | { type: "3d"; scene: Scene3D }
  | { type: "plot"; source: string }
  | { type: "diagram"; source: string }
  | { type: "circuit"; source: string }
  | null;

// A lesson the LessonPlayer can actually play: a hook, timed scenes, a recap.
export interface LessonScene {
  caption: string; // big on-screen keyword/line
  narration: string; // the spoken line (in the chosen language + style)
  formula?: string; // optional LaTeX shown on the scene (no $ delimiters)
  /** How the character is standing/feeling while they say it. */
  emotion?: Emotion;
  visual?: SceneVisual;
  /**
   * Where in NCERT this scene comes from — "NCERT Science X, Ch. 10.3".
   *
   * Shown on screen while the scene plays. A lesson that cites its page is a
   * lesson a student can go and check, and one they can revise from; an
   * uncited one is a stranger telling them things. It is also the honest
   * counterweight to a generated script: the citation is the claim, and a
   * scene that cannot name its source says so rather than inventing one.
   */
  source?: string;
}

export interface LessonVideo {
  title: string;
  hook: string; // spoken opening line
  scenes: LessonScene[];
  recap: string[]; // 3 quick check questions
  /** Who is teaching it. */
  castId: string;
}

export type Depth = "board" | "deeper";

/**
 * The system prompt for script generation.
 *
 * NOT the tutor persona. The persona's FORMAT_CONTRACT opens by declaring that
 * its rules "override everything else in this prompt" and then demands $...$
 * around every expression and fenced ```plot blocks — instructions that
 * directly contradict "reply with one JSON object and nothing else". A large
 * model resolves the conflict sensibly; a 3B follows whichever rule it read
 * most recently and returns a fenced tutor answer instead of a script.
 */
export const VIDEO_SYSTEM =
  "You write scripts for short animated lessons for Indian school students. You reply with ONE JSON object and absolutely nothing else: no greeting, no explanation, no markdown, no code fence, no text before or after the object. Inside the JSON you write natural spoken dialogue, not textbook prose.";

export function buildVideoJsonPrompt(opts: {
  topic: string;
  style: string;
  language: NarrationLang;
  depth: Depth;
  classLevel: ClassLevel;
  character: Character;
}): string {
  const depthLine =
    opts.depth === "board"
      ? "Board basics: stick to exactly what CBSE asks at this class, use marking-scheme wording for key terms."
      : "Learn Better: go one level deeper than NCERT and build entrance-exam intuition, but keep every scene visual and friendly.";

  const c = opts.character;

  return [
    "You are writing the script for a short CARTOON lesson. An animated character is drawn on screen, speaks these lines out loud, and things appear beside them as they talk. Output ONLY one JSON object, nothing else. No markdown, no code fence, no commentary.",
    "",
    `Topic: ${opts.topic}`,
    `Class: ${opts.classLevel} (CBSE)`,
    `Narration language: ${opts.language} (write every spoken line and caption in this language)`,
    `Depth: ${depthLine}`,
    "",
    `Stay strictly inside the CBSE Class ${opts.classLevel} syllabus. If "${opts.topic}" is not part of that syllabus, or belongs to a different class, do NOT teach it — instead pick the nearest topic that IS in the Class ${opts.classLevel} CBSE syllabus and have the character gently say so before teaching that instead (e.g. "That's not on your Class ${opts.classLevel} syllabus, but here's something close that is...").`,
    "",
    `## The character speaking. This is not a style note — it is who is on screen.`,
    `Name: ${c.name}`,
    `Who they are: ${c.persona}`,
    `How they talk: ${c.voice}`,
    `Their catchphrases (use one or two, naturally, never all): ${c.catchphrases.map((p) => `"${p}"`).join(" ")}`,
    `Their running jokes — a student who watches these regularly recognises them, so land at least one: ${c.runningGags.join(" ")}`,
    opts.style ? `The student also asked for: ${opts.style}` : "",
    "",
    "## Teach from NCERT, and say so",
    "- Everything you teach must be the NCERT treatment of the topic: the same definitions, the same worked method, the same terminology the book uses. A student who learns your version and then opens the book must recognise it.",
    '- Give each scene a "source" naming the NCERT chapter and section it comes from. It appears on screen, so it must be real. If you are not sure of the exact section, name the chapter only; if you are not sure of the chapter, leave "source" out entirely. Never invent a page or section number.',
    "",
    "## How to write the lines",
    "- Write SPOKEN dialogue, not narration and not documentation. It is one person talking to one student.",
    "- Short sentences. Ordinary words. If a technical term is unavoidable, the character says the plain-English meaning in the same breath.",
    "- Never write like a textbook: no 'it can be observed that', no 'thus we conclude', no 'in this video we will learn'.",
    "- The character reacts: gets excited at the good bit, admits which step is annoying, warns where marks get lost.",
    "- Teach ONE idea per scene, building in order, so the last scene completes the picture.",
    "",
    "## The JSON",
    "{",
    '  "title": "short lesson title",',
    `  "hook": "the character's first spoken line — an irresistible opener, in their voice",`,
    '  "scenes": [',
    "    {",
    '      "caption": "3-6 word on-screen keyword, normal words with spaces",',
    '      "say": "1-3 sentences of SPOKEN dialogue in character",',
    '      "emotion": "explain | think | excited | oops | point | proud",',
    '      "formula": "optional LaTeX WITHOUT dollar signs, e.g. b^2-4ac",',
    '      "visual": { see below, or omit },',
    '      "source": "where in NCERT this comes from, e.g. NCERT Science X, Ch. 10.3 — or omit it if you genuinely do not know"',
    "    }",
    "  ],",
    '  "recap": ["question 1", "question 2", "question 3"]',
    "}",
    "",
    "## visual — what appears beside the character. Pick the one that actually helps.",
    'A real 3D object the student can turn. This is the strongest teaching tool here — reach for it first whenever the topic has a shape, a structure or a bench:',
    '  {"type":"3d","kind":"cone","a":1.4,"b":2.2,"dims":{"r":"7 cm","h":"24 cm","l":"25 cm"},"label":"the tent"}',
    "",
    "  kind must be EXACTLY one of these. Say which one you mean — never a general word:",
    "    Solids (mensuration): cube, cuboid, sphere, cylinder, cone, hemisphere, prism, pyramid, frustum",
    "    Chemistry: atom, molecule, benzene, lattice",
    "    Physics: lens, mirror, wave, incline, magnet, solar, axes",
    "",
    "  Naming the exact object is the most important thing you do here, because the near-misses are what wreck a diagram:",
    '    - For kind "lens" and kind "mirror" you MUST also set "variant": "convex" or "concave". A convex lens converges light and a concave one spreads it; drawing the wrong one teaches the opposite physics. Never leave it out.',
    '    - For kind "molecule" you MUST set "species" to the formula: "H2O", "CH4", "NH3", "CO2", "SO2", "BF3", "CCl4", "SF6", "PCl5", "H2S". The app draws each one at its true bond angle, so NH3 comes out as a pyramid at 107 degrees and BF3 comes out flat at 120. Guessing a number of arms instead gets the shape wrong.',
    '    - For kind "atom", "a" is the ATOMIC NUMBER (a:11 is sodium, drawn 2,8,1). It is not a size.',
    '    - For kind "incline", "a" is the angle in degrees. For kind "wave", "a" is how tight the waves are and "b" is the amplitude.',
    "",
    '  "dims" writes the real numbers from the question onto the parts they measure: {"r":"7 cm","h":"24 cm"}. Use the keys the shape has — r, h, l for a cone; l, b, h for a cuboid; r for a sphere; f for a lens or mirror. The app decides where each label goes, so a value can never land on the wrong edge. Always pass dims when the question gives real numbers.',
    "",
    'A drawn graph or a labelled shape (best for functions, geometry, trigonometry):',
    '  {"type":"plot","spec":{"fn":["x^2-2x-8"],"domain":[-4,6],"title":"y = x^2 - 2x - 8"}}',
    '  or {"type":"plot","spec":{"shape":"right-triangle","labels":["A","C","B"],"sideLabels":["3","4","5"],"right":1}}',
    'A process or cycle as boxes and arrows (best for reactions, cycles, sequences of events):',
    '  {"type":"diagram","mermaid":"flowchart LR\n  A[Heat] --> B[Melts] --> C[Boils]"}',
    'A circuit diagram (best for electricity: cells, resistors, ammeters, voltmeters, switches):',
    '  {"type":"circuit","spec":{"title":"Series circuit","components":[{"kind":"cell","label":"6V"},{"kind":"switch","label":"K"},{"kind":"ammeter"},{"kind":"resistor","label":"R1 = 5Ω"},{"kind":"resistor","label":"R2 = 10Ω"}]}}',
    '  component kind is one of: cell, battery, resistor, bulb, switch, ammeter, voltmeter, rheostat. Give every resistor/bulb its own label.',
    '  To show two resistors in parallel, give them the same "branch" number, e.g. {"kind":"resistor","label":"R1","branch":1}, {"kind":"resistor","label":"R2","branch":1}.',
    '  A voltmeter is ALWAYS across a component, never in the main loop — the app moves it automatically if you get this wrong, but write it correctly: give it its own branch number.',
    "",
    "Rules for visuals:",
    "- EVERY scene should have a visual, and at least FOUR must. A talking head with nothing to look at is the thing we are replacing.",
    '- Prefer type "3d" wherever the topic has a shape, a structure, a bench or a field. A student who can turn the object learns it; a student reading the word does not.',
    "- If you are not certain which exact object a topic needs, choose a different visual type rather than guessing between two similar ones. A wrong diagram is worse than no diagram.",
    "- A shape with sides or angles is ALWAYS type plot, never mermaid — mermaid can only draw boxes joined by arrows.",
    "- An electric circuit is ALWAYS type circuit, never mermaid or plot — only circuit draws real cell/resistor/meter symbols.",
    "- The character should refer to what is on screen: 'look at the base', 'watch the curve cross here'.",
    "",
    "Rules:",
    "- Exactly 5 or 6 scenes, in teaching order (simple to full understanding).",
    '- If a scene involves ANY equation, formula or relationship, include "formula" as plain LaTeX WITHOUT dollar signs.',
    "- Keep total spoken time around 3 minutes. No emojis. Valid JSON only, with double quotes.",
  ]
    .filter(Boolean)
    .join("\n");
}

/** Pull the outermost {...} block out of a noisy model reply. */
function sliceJsonObject(raw: string): string | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return raw.slice(start, end + 1);
}

/**
 * Find the JSON object by counting braces, not by looking for the last one.
 *
 * `indexOf("{") … lastIndexOf("}")` breaks on two things a small model does
 * constantly: it writes a sentence before the JSON ("Here is the lesson {as
 * requested}:"), which anchors the start on the wrong brace, and it writes a
 * sentence after it, which is swept into the slice and fails the parse. This
 * walks the string, respects string literals and escapes, and returns exactly
 * one object.
 *
 * When the reply was cut off by the token ceiling the scan runs out of input,
 * and rather than give up it closes the structures that are still open — so a
 * lesson truncated after four scenes yields four scenes instead of nothing.
 */
function extractJsonObject(raw: string): string | null {
  const start = raw.indexOf("{");
  if (start === -1) return null;

  const stack: string[] = [];
  let inString = false;
  let escaped = false;

  for (let i = start; i < raw.length; i++) {
    const ch = raw[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === "{" || ch === "[") stack.push(ch === "{" ? "}" : "]");
    else if (ch === "}" || ch === "]") {
      if (stack[stack.length - 1] === ch) stack.pop();
      else return raw.slice(start, i); // mismatched — hand back what we have
      if (!stack.length) return raw.slice(start, i + 1); // complete object
    }
  }

  // Ran out of input: repair the truncation rather than lose the lesson.
  let out = raw.slice(start);
  if (inString) {
    // Drop the half-written value and its key, then close the string.
    const lastQuote = out.lastIndexOf('"');
    const lastComma = Math.max(out.lastIndexOf(","), out.lastIndexOf("{"), out.lastIndexOf("["));
    out = lastComma > 0 && lastComma < lastQuote ? out.slice(0, lastComma) : out + '"';
  }
  // A dangling key with no value, or a trailing comma, would still fail.
  out = out.replace(/,\s*"[^"]*"\s*:\s*$/, "").replace(/,\s*$/, "");
  out = out.replace(/"[^"]*"\s*:\s*$/, "").replace(/,\s*$/, "");
  while (stack.length) out += stack.pop();
  return out;
}

/**
 * Escape raw newlines that appear INSIDE a JSON string value.
 *
 * A model writing a mermaid source often presses enter instead of writing \n,
 * which is a control character in a string literal and is rejected outright by
 * JSON.parse — taking the whole lesson with it.
 */
function escapeControlChars(s: string): string {
  let out = "";
  let inString = false;
  let escaped = false;
  for (const ch of s) {
    if (inString) {
      if (escaped) {
        escaped = false;
        out += ch;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        out += ch;
        continue;
      }
      if (ch === '"') inString = false;
      else if (ch === "\n") { out += "\\n"; continue; }
      else if (ch === "\r") { out += "\\r"; continue; }
      else if (ch === "\t") { out += "\\t"; continue; }
      out += ch;
      continue;
    }
    if (ch === '"') inString = true;
    out += ch;
  }
  return out;
}

/** Remove trailing commas and code fences that trip JSON.parse. */
function relaxJson(s: string): string {
  return s
    .replace(/```(?:json)?/gi, "")
    .replace(/,\s*([}\]])/g, "$1")
    .trim();
}

/**
 * Models routinely emit LaTeX inside JSON with single backslashes ("\frac",
 * "\pm"), which is invalid JSON and makes JSON.parse throw — taking the whole
 * lesson down with it. This doubles every backslash that isn't already a valid
 * JSON escape, leaving real escapes (\\, \", \/, \uXXXX) untouched, so
 * commands like \frac and \sqrt survive into the parsed string.
 */
function fixLatexEscapes(s: string): string {
  return escapeFixer(s, /\\(["\\/])|\\(u[0-9a-fA-F]{4})|\\([\s\S])/g);
}

/**
 * The same repair, but treating \n \t \r \b \f as the JSON escapes they are.
 *
 * These two readings genuinely conflict and no single rule serves both: in
 * `"\frac{1}{2}"` the \f is the start of a LaTeX command and must be doubled,
 * while in `"flowchart LR\n  A --> B"` the \n is a real newline and doubling it
 * puts the literal characters backslash-n into the mermaid source. \t collides
 * with \theta and \times, \b with \beta, \r with \rightarrow.
 *
 * So both readings are tried as separate parse candidates, and whichever
 * produces valid JSON with usable scenes wins. Guessing once would be wrong
 * about half the time.
 */
function fixJsonEscapes(s: string): string {
  return escapeFixer(s, /\\(["\\/bfnrt])|\\(u[0-9a-fA-F]{4})|\\([\s\S])/g);
}

/**
 * Does any string in this object contain a control character?
 *
 * Form feed and backspace are what a swallowed \frac or \beta leaves behind.
 * They never occur in a real lesson script, so finding one is proof that this
 * reading of the escapes was the wrong one.
 */
function hasControlChars(value: unknown, depth = 0): boolean {
  if (depth > 6) return false;
  if (typeof value === "string") return /[]/.test(value);
  if (Array.isArray(value)) return value.some((v) => hasControlChars(v, depth + 1));
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((v) => hasControlChars(v, depth + 1));
  }
  return false;
}

function escapeFixer(s: string, re: RegExp): string {
  return s
    .replace(re, (_m, simple, uni, other) => {
      if (simple) return "\\" + simple;
      if (uni) return "\\" + uni;
      return "\\\\" + other;
    })
    .replace(/\\$/, "\\\\");
}

/** Strip emojis/pictographs — models sneak them in despite instructions. */
function stripEmoji(s: string): string {
  return s.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{20E3}]/gu, "");
}

/** A spoken line or a caption: emoji out, runs of whitespace tidied. */
function asString(v: unknown): string {
  return typeof v === "string" ? stripEmoji(v.trim()).replace(/\s{2,}/g, " ").trim() : "";
}

/**
 * A structured source (mermaid, a plot spec) with its LAYOUT INTACT.
 *
 * mermaid is newline-delimited and indentation-sensitive, so the whitespace
 * tidy that is right for a spoken line is fatal here: "flowchart LR\n  A --> B"
 * collapses onto one line, mermaid.parse throws, and the student is shown
 * "I couldn't draw that one properly" in the middle of the video — for every
 * process diagram in every lesson. The app's own prompt is what taught the
 * model to indent it in the first place.
 */
function asSource(v: unknown): string {
  return typeof v === "string" ? stripEmoji(v).replace(/[ \t]+$/gm, "").trim() : "";
}

/** Some small models return run-together captions ("NatureOfRoots"); space them. */
function niceCaption(v: unknown): string {
  const s = asString(v);
  if (s && !/\s/.test(s) && /[a-z0-9][A-Z]/.test(s)) {
    return s.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  }
  return s;
}

function cleanFormula(v: unknown): string | undefined {
  const s = asString(v);
  if (!s) return undefined;
  // strip any stray $ the model added despite instructions
  const f = s.replace(/\$/g, "").trim();
  return f || undefined;
}

const EMOTIONS: Emotion[] = ["explain", "think", "excited", "oops", "point", "proud"];
// One list, imported from the renderer. It used to be duplicated here and had
// drifted three kinds behind, so every scene calling for one of the newer
// objects was silently dropped as unknown.
const KINDS_3D: string[] = SCENE_KINDS;

function coerceEmotion(v: unknown): Emotion | undefined {
  const s = asString(v).toLowerCase() as Emotion;
  return EMOTIONS.includes(s) ? s : undefined;
}

/**
 * Read the scene's visual, tolerantly.
 *
 * Models hand this back in whatever shape they feel like — `spec` as an object,
 * as a string of JSON, or the plot fields spread straight onto the visual. All
 * three are accepted, because a dropped visual turns the scene back into the
 * talking-head slide this rewrite exists to kill.
 */
function coerceVisual(v: unknown): SceneVisual {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const type = asString(o.type).toLowerCase();

  if (type === "3d" || KINDS_3D.includes(asString(o.kind).toLowerCase())) {
    // resolveKind, not a bare list check: it accepts the disambiguated names a
    // script should be writing ("concave-mirror") and returns the variant that
    // goes with them, so the naming can never be lost between the script and
    // the renderer. Anything it cannot identify is dropped rather than drawn
    // as the nearest lookalike.
    const resolved = resolveKind(asString(o.kind));
    if (!resolved) return null;

    // Scene units, not real-world ones. A model reading "a cone of radius 7 cm"
    // sends a:7 and puts the object through the camera; a:0 makes it vanish.
    const num = (x: unknown) =>
      typeof x === "number" && Number.isFinite(x) && x > 0
        ? Math.max(0.3, Math.min(3, x))
        : undefined;

    // The atom's `a` is an ATOMIC NUMBER, not a size, so it must not be
    // squeezed into the 0.3-3 scene-unit range that suits a cone's radius —
    // that clamp turned every element into hydrogen.
    const atomicNumber = (x: unknown) =>
      typeof x === "number" && Number.isFinite(x) && x >= 1
        ? Math.max(1, Math.min(20, Math.round(x)))
        : undefined;

    const variant = ((): "convex" | "concave" | undefined => {
      const v = asString(o.variant).toLowerCase();
      if (v === "convex" || v === "concave") return v;
      return resolved.variant;
    })();

    // Real quantities the lesson names ("r = 7 cm"), keyed by the part they
    // measure. Strings only — the renderer decides where each key belongs.
    const dims = ((): Record<string, string> | undefined => {
      const raw = o.dims;
      if (!raw || typeof raw !== "object") return undefined;
      const out: Record<string, string> = {};
      for (const [k, val] of Object.entries(raw as Record<string, unknown>)) {
        const text = asString(val);
        if (text && k.length <= 12) out[k] = text.slice(0, 24);
      }
      return Object.keys(out).length ? out : undefined;
    })();

    return {
      type: "3d",
      scene: {
        kind: resolved.kind,
        species: asString(o.species).toUpperCase().replace(/[^A-Z0-9]/g, "") || undefined,
        variant,
        a: resolved.kind === "atom" ? atomicNumber(o.a) : num(o.a),
        b: num(o.b),
        c: num(o.c),
        label: asString(o.label) || undefined,
        dims,
      },
    };
  }

  if (type === "diagram" || o.mermaid) {
    const src = asSource(o.mermaid) || asSource(o.source) || asSource(o.spec);
    return src ? { type: "diagram", source: src } : null;
  }

  if (type === "circuit" || o.components) {
    const spec = o.spec ?? { title: o.title, components: o.components };
    if (typeof spec === "string") {
      const t = asSource(spec);
      return t.startsWith("{") && /"components"/.test(t) ? { type: "circuit", source: t } : null;
    }
    const source = JSON.stringify(spec);
    return source && source !== "{}" ? { type: "circuit", source } : null;
  }

  if (type === "plot" || o.spec || o.fn || o.shape) {
    const spec =
      o.spec ??
      { fn: o.fn, domain: o.domain, shape: o.shape, labels: o.labels, sideLabels: o.sideLabels, right: o.right, title: o.title };
    // A small model sometimes DESCRIBES the figure where a spec belongs —
    // "a graph of y = x squared crossing at -2 and 4". Passing that through
    // renders a raw code block on the video stage, which is worse than showing
    // nothing, so prose here is dropped rather than displayed.
    if (typeof spec === "string") {
      const t = asSource(spec);
      return t.startsWith("{") && /"(?:fn|points|shape)"/.test(t) ? { type: "plot", source: t } : null;
    }
    const source = JSON.stringify(spec);
    return source && source !== "{}" ? { type: "plot", source } : null;
  }
  return null;
}

function coerceScene(v: unknown): LessonScene | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const narration =
    asString(o.say) || asString(o.narration) || asString(o.speak) || asString(o.voice) || asString(o.line);
  const caption =
    niceCaption(o.caption) ||
    niceCaption(o.onscreen) ||
    niceCaption(o.text) ||
    niceCaption(o.title);
  if (!narration && !caption) return null;
  return {
    caption: caption || narration.slice(0, 42),
    narration: narration || caption,
    formula: cleanFormula(o.formula ?? o.latex ?? o.math),
    emotion: coerceEmotion(o.emotion ?? o.mood ?? o.pose),
    visual: coerceVisual(o.visual ?? o.scene3d ?? o.graphic),
    source: asString(o.source ?? o.ncert ?? o.reference).slice(0, 90) || undefined,
  };
}

/**
 * The prompt requires at least 3 of 5-6 scenes to carry a visual — a talking
 * head with nothing to look at is the thing this rewrite exists to kill. A
 * small model that ignores the rule still parses cleanly, so this is the only
 * place left to catch an all-text lesson before it ships.
 */
function warnIfTooFewVisuals(title: string, scenes: LessonScene[]): void {
  const withVisual = scenes.filter((s) => s.visual != null).length;
  if (withVisual < 3) {
    console.warn(
      `[videoScript] "${title}": only ${withVisual}/${scenes.length} scenes have a visual (need at least 3) — this will play as a talking head.`,
    );
  }
}

/**
 * Turn a model reply into a playable LessonVideo. Tries strict JSON first, then
 * a relaxed parse, and finally salvages scenes from a partial object. Throws
 * only if nothing usable can be recovered.
 */
export function parseLessonVideo(raw: string, fallbackTitle: string, castId = "gizmo"): LessonVideo {
  const block = extractJsonObject(raw) ?? sliceJsonObject(raw) ?? raw;

  let obj: Record<string, unknown> | null = null;
  // Strict first (never alters valid content), then relaxed, then with raw
  // control characters escaped, then with LaTeX backslashes repaired, then
  // both — first success wins.
  const relaxed = relaxJson(block);
  for (const candidate of [
    block,
    relaxed,
    escapeControlChars(relaxed),
    fixLatexEscapes(relaxed),
    fixLatexEscapes(escapeControlChars(relaxed)),
    fixJsonEscapes(relaxed),
    fixJsonEscapes(escapeControlChars(relaxed)),
  ]) {
    try {
      const parsed = JSON.parse(candidate);
      // A parse that SUCCEEDS can still be the wrong reading. "\frac{1}{2}"
      // is valid JSON — \f is the form-feed escape — so the strict pass
      // silently turns a fraction into a control character followed by "rac".
      // No lesson script contains a form feed or a backspace, so their presence
      // means a LaTeX command was eaten and the next candidate should be tried.
      if (parsed && typeof parsed === "object" && !hasControlChars(parsed)) {
        obj = parsed as Record<string, unknown>;
        break;
      }
    } catch {
      /* try next */
    }
  }

  if (obj) {
    const scenesRaw = Array.isArray(obj.scenes) ? obj.scenes : [];
    const scenes = scenesRaw.map(coerceScene).filter((s): s is LessonScene => !!s);
    if (scenes.length) {
      warnIfTooFewVisuals(asString(obj.title) || fallbackTitle, scenes);
      return {
        castId,
        title: asString(obj.title) || fallbackTitle,
        hook: asString(obj.hook) || asString(obj.intro) || `Let's crack ${fallbackTitle}.`,
        scenes,
        recap: (Array.isArray(obj.recap) ? obj.recap : [])
          .map(asString)
          .filter(Boolean)
          .slice(0, 3),
      };
    }
  }

  // Last resort: build scenes from any "narration"/"caption" pairs we can find,
  // even in malformed JSON, so the student still gets a playable lesson.
  // The prompt asks the model for "say". Matching only "narration" — the
  // INTERNAL field name, which no prompt ever requests — meant the one code
  // path written to rescue a partial reply could essentially never fire.
  const unescape = (s: string) => s.replace(/\\"/g, '"').replace(/\\n/g, " ").replace(/\\\\/g, "\\");
  const narr = [
    ...raw.matchAll(/"(?:say|narration|speak|voice|line)"\s*:\s*"((?:[^"\\]|\\.)*)"/g),
  ].map((m) => unescape(m[1]));
  const caps = [...raw.matchAll(/"caption"\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => unescape(m[1]));
  if (narr.length) {
    const scenes: LessonScene[] = narr.map((n, i) => ({
      caption: caps[i] || n.slice(0, 42),
      narration: n,
    }));
    warnIfTooFewVisuals(fallbackTitle, scenes);
    return {
      castId,
      title: fallbackTitle,
      hook: `Let's crack ${fallbackTitle}.`,
      scenes,
      recap: [],
    };
  }

  throw new Error("Could not parse a lesson from the model reply.");
}
