// Proves the "Confirm your email" instruction on the sign-up flow stays
// readable. FRONTEND-W003 moved this paragraph from text-dim to text-muted
// because text-dim reads under 4:1 on the .card surface, below WCAG AA's
// 4.5:1 floor for normal text — see src/pages/Login.tsx and the commit
// "frontend: Build the frontend entry interface with premium design".
//
// This does not render the page. It reads the source class and the actual
// color tokens it resolves to, then computes the real contrast ratio, so a
// silent revert of the class OR a repaint of the color tokens both fail loud.
//
// Run: node scripts/qa/login-contrast.mjs

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const loginSrc = readFileSync(path.join(root, "src/pages/Login.tsx"), "utf8");
const indexCss = readFileSync(path.join(root, "src/index.css"), "utf8");

let failed = false;
function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failed = true;
}

// 1. The confirmation instruction must not regress to the low-contrast class.
const paraClassMatch = loginSrc.match(/<p className="([^"]*)"[^>]*>\s*\n\s*We've sent a confirmation link/);
if (!paraClassMatch) {
  fail("could not find the confirm-email paragraph in src/pages/Login.tsx (markup changed shape)");
} else {
  const classes = paraClassMatch[1];
  if (/\btext-dim\b/.test(classes)) {
    fail(`confirm-email paragraph uses text-dim again (classes: "${classes}") — under 4:1 on the card surface`);
  }
  if (!/\btext-muted\b/.test(classes)) {
    fail(`confirm-email paragraph no longer uses text-muted (classes: "${classes}")`);
  }
}

// 2. The color tokens text-muted/text-dim resolve to must actually clear AA.
function hexOf(varName) {
  const m = indexCss.match(new RegExp(`--${varName}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) fail(`could not find --${varName} in src/index.css`);
  return m ? m[1] : "#000000";
}

function relLuminance(hex) {
  const [r, g, b] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map((h) => parseInt(h, 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hexA, hexB) {
  const L1 = relLuminance(hexA);
  const L2 = relLuminance(hexB);
  const [lighter, darker] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (lighter + 0.05) / (darker + 0.05);
}

const surface = hexOf("color-surface");
const muted = hexOf("color-muted");
const dim = hexOf("color-dim");

const AA_NORMAL_TEXT = 4.5;
const mutedRatio = contrastRatio(muted, surface);
const dimRatio = contrastRatio(dim, surface);

console.log(`text-muted (${muted}) on .card surface (${surface}): ${mutedRatio.toFixed(2)}:1`);
console.log(`text-dim   (${dim}) on .card surface (${surface}): ${dimRatio.toFixed(2)}:1`);

if (mutedRatio < AA_NORMAL_TEXT) {
  fail(
    `text-muted only reaches ${mutedRatio.toFixed(2)}:1 on the card surface, below the ${AA_NORMAL_TEXT}:1 AA floor — the fix no longer clears AA even though the class is right`
  );
}

if (failed) {
  process.exit(1);
}
console.log("PASS: confirm-email instruction uses text-muted, which clears WCAG AA on the card surface");
