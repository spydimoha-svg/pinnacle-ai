// How an agent gets better at its job.
//
// Every specialty owns one skill file. It goes into that specialist's brief
// before they start, and whatever they learn on the job is appended when they
// finish. So the hundredth ray optics diagram is drawn by someone who has read
// the notes from the previous ninety nine, not by a stranger.
//
// Files live in pinnacle-office/skills/<dept>/<specialty>.md and are plain
// markdown. Read them, edit them, delete a bad lesson. They are yours.

import fs from "node:fs";
import path from "node:path";
import { OFFICE_DIR, CONFIG } from "../config.mjs";
import { runAgent, TOOLS } from "./claude.mjs";

const SKILLS_DIR = path.join(OFFICE_DIR, "skills");
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const fileFor = (dept, specialty) => path.join(SKILLS_DIR, dept, slug(specialty) + ".md");

// The cap exists so a skill file stays something an agent will actually read.
// Past it, the file gets rewritten tighter instead of growing forever.
const MAX_LESSONS = 30;

export function read(dept, specialty) {
  try { return fs.readFileSync(fileFor(dept, specialty), "utf8"); } catch { return ""; }
}

export function lessons(dept, specialty) {
  return read(dept, specialty).split("\n").filter((l) => l.trim().startsWith("- "));
}

// Append what an agent learned, skipping anything it already knows. Dedupe is
// deliberately loose: near duplicates are the main way these files rot.
export function learn(dept, specialty, lines = []) {
  const clean = lines.map((l) => String(l).trim().replace(/^[-*]\s*/, "")).filter((l) => l.length > 12 && l.length < 400);
  if (!clean.length) return 0;

  const file = fileFor(dept, specialty);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const current = read(dept, specialty);
  const head = current || `# ${specialty}\n\nWhat the ${dept} specialists in this seat have learned working on Pinnacle AI.\n`;
  const known = lessons(dept, specialty).map((l) => key(l));

  // Dedupe against the file AND within this batch. Agents routinely write the
  // same lesson twice in one report, worded differently.
  const seen = [...known];
  const fresh = [];
  for (const l of clean) {
    if (seen.some((k) => similar(k, key(l)))) continue;
    seen.push(key(l));
    fresh.push(l);
  }
  if (!fresh.length) return 0;

  fs.writeFileSync(file, head.trimEnd() + "\n" + fresh.map((l) => `- ${l}`).join("\n") + "\n");
  return fresh.length;
}

// The significant words of a lesson, as a set.
const key = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter((w) => w.length > 3).sort().join(" ");

// Two lessons are the same idea if most of their significant words overlap.
// Exact matching never fired: agents reword the same lesson every time.
function similar(a, b) {
  const A = new Set(a.split(" ")), B = new Set(b.split(" "));
  if (!A.size || !B.size) return false;
  let shared = 0;
  for (const w of A) if (B.has(w)) shared++;
  return shared / Math.min(A.size, B.size) >= 0.6;
}

export const overCap = (dept, specialty) => lessons(dept, specialty).length > MAX_LESSONS;

// Rewrite a bloated skill file into something sharper. Merges duplicates,
// drops what turned out to be wrong, keeps what is specific to this codebase.
export async function sharpen(dept, specialty) {
  const body = read(dept, specialty);
  if (!body) return { ok: false };

  const res = await runAgent({
    prompt: `You are the most experienced ${specialty} specialist in the ${dept} department of Pinnacle Office. Below is the accumulated set of lessons your seat has written while working on Pinnacle AI, a CBSE tutoring web app.

It has grown past the point where anyone will read it. Rewrite it.

${body}

Rules for the rewrite:
- Merge lessons that say the same thing. Keep the more specific wording.
- Delete anything generic enough to be true of any codebase. "Write clean code" is worthless. "api/ imports need the .js extension or Vercel breaks" is gold.
- Delete anything that contradicts a later lesson. Later wins.
- Keep every lesson that names a real file, a real constraint, or a real mistake made here.
- At most ${MAX_LESSONS - 8} bullets. Fewer is better.

OUTPUT CONTRACT. Restating this now because it is the last thing you should read:
Reply with the rewritten markdown file and nothing else. Start with the "# ${specialty}" heading, then one short paragraph, then the bullets. No fenced code block around the whole thing, no commentary.`,
    model: CONFIG.models.worker,
    tools: TOOLS.read,
    maxTurns: 4,
    timeout: 3 * 60_000,
  });

  if (!res.ok || !res.result.includes("- ")) return { ok: false };
  fs.writeFileSync(fileFor(dept, specialty), res.result.replace(/^```\w*\n?|```$/g, "").trim() + "\n");
  return { ok: true, before: lessons(dept, specialty).length };
}

// A count for the dashboard: how much the office has actually learned.
export function stats() {
  let files = 0, total = 0;
  const walk = (dir) => {
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.isDirectory()) walk(path.join(dir, e.name));
      else if (e.name.endsWith(".md")) {
        files++;
        total += fs.readFileSync(path.join(dir, e.name), "utf8").split("\n").filter((l) => l.trim().startsWith("- ")).length;
      }
    }
  };
  walk(SKILLS_DIR);
  return { files, lessons: total };
}
