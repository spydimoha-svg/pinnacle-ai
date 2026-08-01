import * as THREE from "three";

/**
 * A glyph atlas drawn at runtime on a 2D canvas.
 *
 * The first pass used untextured planes and they read as confetti, because a
 * coloured quad IS confetti — what makes this knowledge is that each fleck is
 * a real equation, letter or symbol.
 *
 * Drawn rather than downloaded: the browser already has the fonts, so this
 * costs one canvas at startup, ships no font file, needs no network and
 * carries no licence. Uploaded once as a single texture, so all glyph variety
 * is free at render time — the instances differ only by a UV offset.
 */

/** Cells are square in the atlas; the mesh applies the real aspect. */
export const ATLAS_COLS = 8;
export const ATLAS_ROWS = 8;
export const ATLAS_CELLS = ATLAS_COLS * ATLAS_ROWS;

/**
 * Real CBSE material, which is the point — a student should be able to spot
 * the quadratic formula going past. Short, high-contrast, legible at ~40px.
 */
const GLYPHS: string[] = [
  // Equations a Class 10-12 student actually meets
  "E=mc²", "a²+b²=c²", "πr²", "F=ma", "PV=nRT", "∫f(x)dx",
  "dy/dx", "√2", "sin²θ", "log₁₀", "Σn", "x=−b±√Δ",
  "H₂O", "CO₂", "NaCl", "C₆H₁₂O₆", "CH₄", "NH₃",
  "λ=h/p", "v=u+at", "½mv²", "V=IR", "P=VI", "ρ",
  // Symbols
  "∞", "∂", "Δ", "θ", "α", "β", "γ", "μ",
  "≈", "≠", "≤", "≥", "∴", "∵", "±", "→",
  // Letters and digits — the raw material of the words they assemble into
  "A", "B", "C", "D", "E", "F", "G", "H",
  "I", "K", "L", "M", "N", "O", "P", "R",
  "S", "T", "U", "V", "W", "X", "Y", "Z",
];

let cached: THREE.CanvasTexture | null = null;

export function buildGlyphAtlas(): THREE.CanvasTexture {
  if (cached) return cached;

  // 128px cells: crisp at the sizes these render, and 1024² is a single
  // cheap upload that every GPU handles without mipmapping complaints.
  const CELL = 128;
  const canvas = document.createElement("canvas");
  canvas.width = ATLAS_COLS * CELL;
  canvas.height = ATLAS_ROWS * CELL;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context unavailable for glyph atlas");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff"; // tinted per-instance; keep the atlas neutral

  for (let i = 0; i < ATLAS_CELLS; i++) {
    const text = GLYPHS[i % GLYPHS.length];
    const cx = (i % ATLAS_COLS) * CELL + CELL / 2;
    const cy = Math.floor(i / ATLAS_COLS) * CELL + CELL / 2;

    // Shrink the face until the glyph fits its cell — the formulas are far
    // wider than the single letters and must not bleed into neighbours, or
    // every instance shows a sliver of the one next door.
    let size = 54;
    const serif = '"Instrument Serif", Georgia, "Times New Roman", serif';
    do {
      ctx.font = `${size}px ${serif}`;
      if (ctx.measureText(text).width <= CELL * 0.84) break;
      size -= 2;
    } while (size > 12);

    ctx.fillText(text, cx, cy);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  // Padding inside each cell means bleeding is already avoided; clamping stops
  // the edge row sampling across the wrap.
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 4;
  tex.needsUpdate = true;

  cached = tex;
  return tex;
}

/** The word the swarm settles into, as a per-glyph layout. */
export type WordSlot = { x: number; y: number; cell: number };

/**
 * Lay real words out on a baseline grid. The brief asks for the glyphs to
 * "place into words", so the assembly target has to BE words rather than an
 * abstract lattice — otherwise the payoff of the whole chapter is a rectangle.
 */
export function layoutWords(lines: string[], width = 3.9): WordSlot[] {
  const slots: WordSlot[] = [];
  const lineHeight = 0.52;
  const yTop = ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, li) => {
    const chars = line.split("");
    const step = width / Math.max(1, chars.length);
    const x0 = -width / 2 + step / 2;

    chars.forEach((ch, ci) => {
      if (ch === " ") return;
      // Map the character onto its atlas cell so the assembled word is
      // actually readable, not a random glyph in the right place.
      const upper = ch.toUpperCase();
      let cell = GLYPHS.findIndex((g) => g === upper);
      if (cell < 0) cell = 40 + (upper.charCodeAt(0) % 24); // letters block
      slots.push({ x: x0 + ci * step, y: yTop - li * lineHeight, cell });
    });
  });

  return slots;
}
