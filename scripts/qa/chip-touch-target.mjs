// Proves chip buttons stay thumb-sized on touch devices. Chips double as
// filter/reply buttons (Papers, Worksheets, Tutor quick replies) but are
// also used read-only as static badges (marks tags, status pills). The fix
// in src/index.css (commit "frontend: Create front end based on reference
// research") raises tap height to min-h-10 py-2 only inside
// @media (pointer: coarse), and only for the `button.` element selector, so
// a student's thumb gets a bigger target without fattening every read-only
// badge on desktop.
//
// This does not render anything. It reads src/index.css directly and parses
// the actual declarations, so a silent revert of the touch rule, or the
// touch rule leaking onto non-button chips, both fail loud.
//
// Run: node scripts/qa/chip-touch-target.mjs

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const indexCss = readFileSync(path.join(root, "src/index.css"), "utf8");

let failed = false;
function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failed = true;
}

const CHIP_VARIANTS = ["chip", "chip-gold", "chip-mint", "chip-coral", "chip-sky"];

// 1. Base chip rules (outside any media query) must stay a compact py-1
// badge — this is what keeps read-only chips (e.g. .marks-adjacent status
// pills) from growing on desktop or on non-button elements.
for (const variant of CHIP_VARIANTS) {
  const escaped = variant.replace(/[.:]/g, "\\$&");
  const m = indexCss.match(new RegExp(`\\.${escaped}\\s*\\{([^}]*)\\}`));
  if (!m) {
    fail(`.${variant} rule not found in src/index.css`);
    continue;
  }
  if (!/\bpy-1\b/.test(m[1])) {
    fail(`.${variant} base rule no longer uses py-1 (found: "${m[1].trim()}")`);
  }
  if (/\bmin-h-10\b/.test(m[1])) {
    fail(`.${variant} base rule sets min-h-10 outside the touch media query — this would grow every chip, including read-only badges`);
  }
}

// 2. The pointer:coarse block must exist, target every chip variant via the
// `button.` element selector (not the bare class, which would also swell
// non-interactive chips), and stretch tap height.
const mediaMatch = indexCss.match(/@media \(pointer: coarse\)\s*\{([\s\S]*?)\n  \}/);
if (!mediaMatch) {
  fail("no @media (pointer: coarse) block found in src/index.css — the touch tap-target fix is gone");
} else {
  const body = mediaMatch[1];

  for (const variant of CHIP_VARIANTS) {
    const escaped = variant.replace(/[.:]/g, "\\$&");
    if (!new RegExp(`button\\.${escaped}\\b`).test(body)) {
      fail(`@media (pointer: coarse) block no longer targets button.${variant}`);
    }
  }

  const declMatch = body.match(/\{([^}]*)\}/);
  if (!declMatch) {
    fail("@media (pointer: coarse) block has no declaration body");
  } else {
    const decl = declMatch[1];
    if (!/\bmin-h-10\b/.test(decl)) {
      fail(`@media (pointer: coarse) declaration no longer sets min-h-10 (found: "${decl.trim()}")`);
    }
    if (!/\bpy-2\b/.test(decl)) {
      fail(`@media (pointer: coarse) declaration no longer sets py-2 (found: "${decl.trim()}")`);
    }
  }

  // The rule must live inside pointer:coarse only, never unconditionally —
  // guard against someone "fixing" this by hoisting it out of the query.
  const outsideMediaQuery = indexCss.replace(mediaMatch[0], "");
  if (/button\.chip[\w-]*\s*\{[^}]*min-h-10/.test(outsideMediaQuery)) {
    fail("button.chip min-h-10 rule found outside @media (pointer: coarse) — it would apply to mouse users too");
  }
}

if (failed) {
  process.exit(1);
}
console.log("PASS: chip buttons grow to min-h-10 py-2 on touch devices only, base badge sizing stays untouched");
