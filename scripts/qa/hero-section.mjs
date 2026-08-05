// Proves the shared premium Hero component (src/components/ui.tsx, commit
// "frontend: Research and implement premium hero sections throughout
// interface") stays a real shared component and doesn't quietly regress:
// the ambient glow must stay clipped to its wrapper, the glow must stay a
// static gradient (not an animation — the brand is "calm, never busy"), and
// a consuming page (Pricing) must keep using the shared component instead
// of drifting back to its own duplicated hero markup.
//
// This does not render anything. It reads src/components/ui.tsx, src/index.css
// and src/pages/Pricing.tsx directly and parses the actual source, so a
// silent revert on any of the three files fails loud without a browser.
//
// Run: node scripts/qa/hero-section.mjs

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const uiSrc = readFileSync(path.join(root, "src/components/ui.tsx"), "utf8");
const indexCss = readFileSync(path.join(root, "src/index.css"), "utf8");
const pricingSrc = readFileSync(path.join(root, "src/pages/Pricing.tsx"), "utf8");

let failed = false;
function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failed = true;
}

// 1. The shared Hero component must still exist and export the contract
//    other pages build on: eyebrow, title, and an internal glow + Ridgeline.
// Sliced by plain string search (not a brace-matching regex) so the JSX's
// own `{`/`}` (e.g. `${className}`, `{eyebrow}`) can't cut the match short.
const heroStart = uiSrc.indexOf("export function Hero(");
if (heroStart === -1) {
  fail("could not find `export function Hero(` in src/components/ui.tsx — has it been removed or renamed?");
} else {
  const nextExport = uiSrc.indexOf("\nexport function ", heroStart + 1);
  const body = nextExport === -1 ? uiSrc.slice(heroStart) : uiSrc.slice(heroStart, nextExport);

  // The glow is absolutely positioned and extends outside the box (negative
  // inset), so the wrapper MUST be `relative overflow-hidden` or the glow
  // leaks past the hero into whatever content sits below/beside it.
  const wrapperMatch = body.match(/<div className=\{`([^`]*)`\}>/);
  if (!wrapperMatch) {
    fail("Hero's root wrapper div no longer uses a template-literal className — cannot verify it clips the glow");
  } else {
    const wrapperClasses = wrapperMatch[1];
    if (!/\brelative\b/.test(wrapperClasses)) {
      fail("Hero's root wrapper lost the `relative` class — the glow (position:absolute) would escape into the page's own stacking context");
    }
    if (!/\boverflow-hidden\b/.test(wrapperClasses)) {
      fail("Hero's root wrapper lost `overflow-hidden` — the glow's negative inset would bleed past the hero's box");
    }
  }

  if (!/pnz-hero-glow/.test(body)) {
    fail("Hero no longer renders the .pnz-hero-glow element — the ambient gold glow behind the heading is gone");
  }

  if (!/<Ridgeline\b/.test(body)) {
    fail("Hero no longer renders <Ridgeline /> — the signature mountain motif at the base of the hero is gone");
  }

  if (!/<h1\b/.test(body)) {
    fail("Hero no longer renders an <h1> for the title — every page hero should have exactly one top-level heading");
  }
}

// 2. .pnz-hero-glow must stay a static, absolutely-positioned gradient — no
//    animation. The commit that added it says so explicitly: "the brand is
//    calm, never busy, so this is one radial gradient, not a pulse."
const glowMatch = indexCss.match(/\.pnz-hero-glow\s*\{([^}]*)\}/);
if (!glowMatch) {
  fail(".pnz-hero-glow rule not found in src/index.css");
} else {
  const glowBody = glowMatch[1];
  if (!/position:\s*absolute/.test(glowBody)) {
    fail(".pnz-hero-glow is no longer position:absolute — it would push the hero's layout instead of sitting behind it");
  }
  if (!/radial-gradient/.test(glowBody)) {
    fail(".pnz-hero-glow no longer uses a radial-gradient background");
  }
  if (/animation\s*:/.test(glowBody) || /@keyframes/.test(glowBody)) {
    fail(".pnz-hero-glow has gained an animation — the hero glow is meant to be static, not a pulse");
  }
}

// 3. Pricing must still consume the shared component, not a duplicated,
//    independently-driftable inline hero (the thing this component replaced).
if (!/import\s*\{[^}]*\bHero\b[^}]*\}\s*from\s*["']\.\.\/components\/ui["']/.test(pricingSrc)) {
  fail("src/pages/Pricing.tsx no longer imports Hero from ../components/ui");
}
if (!/<Hero\b/.test(pricingSrc)) {
  fail("src/pages/Pricing.tsx no longer renders <Hero ... /> — it may have reverted to its own duplicated hero markup");
}

if (failed) {
  process.exit(1);
}
console.log("PASS: shared Hero component stays clipped, static and in use by Pricing.tsx");
