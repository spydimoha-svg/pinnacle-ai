// Proves the things design/BRAND-BRAINSTORM.md called "already strong — do
// not touch without reason" stay true, and that the one debt item it found
// (six off-token colours in landing.css) does not silently grow while it
// waits for someone to pick it up. See design/BRAND-BRAINSTORM.md.
//
// This does not render anything. It reads source files directly, so a
// regression on any of these fails loud without a browser.
//
// Run: node scripts/qa/brand-identity.mjs

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync, statSync } from "node:fs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

let failed = false;
function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failed = true;
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?)$/.test(name)) out.push(p);
  }
  return out;
}

// 1. One mark everywhere. The peak's path data is the mark's fingerprint —
// if it shows up in a second file, someone forked the logo again (the exact
// regression Logo.tsx's own comment says happened once already).
const PEAK_PATH = "M13 1.6 L25 20.6 H16.6 L13 14.6 L9.4 20.6 H1 Z";
const srcFiles = walk(path.join(root, "src"));
const filesWithMark = srcFiles.filter((f) => readFileSync(f, "utf8").includes(PEAK_PATH));

if (filesWithMark.length === 0) {
  fail("the peak mark path data is not found anywhere in src/ — has Logo.tsx changed shape?");
} else if (filesWithMark.length > 1) {
  fail(
    `the peak mark is drawn in ${filesWithMark.length} files, not one: ${filesWithMark
      .map((f) => path.relative(root, f))
      .join(", ")} — one brand, one mark`
  );
}

// 2. theme-color in index.html must track --color-ink exactly, not a
// second hardcoded copy of "the same" colour that can quietly drift.
const indexHtml = readFileSync(path.join(root, "index.html"), "utf8");
const indexCss = readFileSync(path.join(root, "src/index.css"), "utf8");

const themeColorMatch = indexHtml.match(/name="theme-color"\s+content="(#[0-9a-fA-F]{6})"/);
const inkTokenMatch = indexCss.match(/--color-ink:\s*(#[0-9a-fA-F]{6})/);

if (!themeColorMatch) {
  fail("index.html has no theme-color meta tag");
} else if (!inkTokenMatch) {
  fail("src/index.css has no --color-ink token");
} else if (themeColorMatch[1].toLowerCase() !== inkTokenMatch[1].toLowerCase()) {
  fail(
    `theme-color (${themeColorMatch[1]}) no longer matches --color-ink (${inkTokenMatch[1]}) — the browser chrome and the app disagree on ink black`
  );
}

// 3. The gold accent stays gold. Ruled out explicitly in the brainstorm's
// "explicit non-ideas": no hue swap for novelty. A gold hex has red and
// green channels well above blue; a blue/purple refresh would not.
const goldMatch = indexCss.match(/--color-gold:\s*#([0-9a-fA-F]{6})/);
if (!goldMatch) {
  fail("src/index.css has no --color-gold token");
} else {
  const hex = goldMatch[1];
  const [r, g, b] = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((h) => parseInt(h, 16));
  if (!(r > b && g > b)) {
    fail(`--color-gold (#${hex}) no longer reads as a warm gold (r=${r} g=${g} b=${b}) — has the hue been swapped?`);
  }
}

// 4. The one documented gap (off-token literal hex values inside landing.css's
// .pa-root block) is a known, named debt — not a licence for more of it.
// Ratchet: fail if the count grows past what BRAND-BRAINSTORM.md counted.
const landingCss = readFileSync(path.join(root, "src/pages/landing.css"), "utf8");
const rootBlockMatch = landingCss.match(/\.pa-root\s*\{([\s\S]*?)\n\}/);
const BASELINE_OFF_TOKEN_COUNT = 6;

if (!rootBlockMatch) {
  fail("could not find the .pa-root token block in src/pages/landing.css — has it moved or been renamed?");
} else {
  const literalHexVars = [...rootBlockMatch[1].matchAll(/--pa-[\w-]+:\s*#[0-9a-fA-F]{3,6};/g)];
  console.log(`off-token literal hex values in .pa-root: ${literalHexVars.length} (baseline ${BASELINE_OFF_TOKEN_COUNT})`);
  if (literalHexVars.length > BASELINE_OFF_TOKEN_COUNT) {
    fail(
      `.pa-root gained more off-token colours (${literalHexVars.length}, was ${BASELINE_OFF_TOKEN_COUNT}) — new hex values that don't trace to a --color-* token in index.css: ${literalHexVars
        .map((m) => m[0])
        .join(" ")}`
    );
  }
}

if (failed) {
  process.exit(1);
}
console.log("PASS: single logo mark, theme-color/--color-ink in sync, gold hue intact, off-token colours have not grown past the documented baseline");
