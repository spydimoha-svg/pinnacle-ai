// Proves the "professional education website" redesign of .card-hover
// (src/index.css, commit "frontend: Redesign frontend styling for
// professional education website look") stays a real lift-on-hover
// micro-interaction and not a silent regression back to the old flat
// hover:border-gold-dim colour swap it replaced.
//
// This does not render anything. It reads src/index.css directly and
// parses the actual declarations, so a regression fails loud without a
// browser.
//
// Run: node scripts/qa/card-hover-motion.mjs

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

// Pull out a `.selector { ... }` block by selector text (first match).
function block(selector) {
  const escaped = selector.replace(/[.:]/g, "\\$&");
  const m = indexCss.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return m ? m[1] : null;
}

const base = block(".card-hover");
const hover = block(".card-hover:hover");
const active = block(".card-hover:active");

if (!base) {
  fail("could not find .card-hover in src/index.css — has the selector changed shape?");
} else {
  // Must animate more than just colour — a lift needs `transform` in the
  // transition list, not the old single-property `transition-colors`.
  const transitionMatch = base.match(/transition:\s*([^;]+);/);
  if (!transitionMatch) {
    fail(".card-hover has no `transition:` declaration — the lift needs transform to be animated");
  } else if (!/\btransform\b/.test(transitionMatch[1])) {
    fail(`.card-hover transition does not include transform (found: "${transitionMatch[1].trim()}") — this is a flat colour swap again, not a lift`);
  }
}

if (!hover) {
  fail(".card-hover:hover rule not found in src/index.css");
} else {
  // A "lift" must move the card up (negative Y translate), not down or nowhere.
  const translateMatch = hover.match(/translate3d\(\s*[^,]+,\s*(-?[\d.]+)px/);
  if (!translateMatch) {
    fail(".card-hover:hover has no translate3d(...) transform — nothing actually lifts on hover");
  } else if (parseFloat(translateMatch[1]) >= 0) {
    fail(`.card-hover:hover translateY is ${translateMatch[1]}px, not negative — the card does not lift upward`);
  }
  if (!/border-color/.test(hover)) {
    fail(".card-hover:hover no longer sets border-color");
  }
  if (!/box-shadow/.test(hover)) {
    fail(".card-hover:hover lost its box-shadow — the lift needs a shadow to read as raised, not just moved");
  }
}

if (!active) {
  fail(".card-hover:active rule not found in src/index.css — a press state that never settles back down");
} else if (!/translate3d\(\s*0,\s*0/.test(active)) {
  fail(".card-hover:active does not reset translateY to 0 — the card would stay lifted while pressed");
}

// The reduced-motion escape hatch is what makes an always-on transform lift
// safe: it must still zero out transition-duration globally, or every card
// hover keeps animating for users who asked for no motion.
const reducedMotionBlock = indexCss.match(
  /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\*,\s*\*::before,\s*\*::after\s*\{([^}]*)\}/
);
if (!reducedMotionBlock) {
  fail("the global `*, *::before, *::after` prefers-reduced-motion block is missing — .card-hover's transform lift would animate regardless of user preference");
} else if (!/transition-duration:\s*0\.01ms\s*!important/.test(reducedMotionBlock[1])) {
  fail("prefers-reduced-motion block no longer zeroes transition-duration — .card-hover's lift would keep animating");
}

if (failed) {
  process.exit(1);
}
console.log("PASS: .card-hover lifts with transform+shadow on hover, settles on active, and respects prefers-reduced-motion");
