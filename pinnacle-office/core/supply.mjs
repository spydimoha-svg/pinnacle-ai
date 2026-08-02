// The supply desk.
//
// When a specialist hits a wall because it does not have a tool, it says so in
// its report instead of improvising. That request lands here, Supply researches
// it, and the answer goes into a catalog that every agent reads before it
// starts work. Ayaan never has to go and find a CLI for anybody.
//
// Supply never installs anything. It writes the exact command and the reason it
// is safe, and that lands on Ayaan's desk as a request he approves or refuses.

import fs from "node:fs";
import path from "node:path";
import { OFFICE_DIR } from "../config.mjs";

const SUPPLY_DIR = path.join(OFFICE_DIR, "supply");
const CATALOG = path.join(SUPPLY_DIR, "catalog.md");
const REQUESTS = path.join(SUPPLY_DIR, "requests.json");

fs.mkdirSync(SUPPLY_DIR, { recursive: true });

// What every agent is told it already has. Kept short on purpose: this goes
// into a thousand briefs, so every line has to earn its place.
const BASE = `- Read, Grep, Glob: the whole repository.
- WebSearch and WebFetch: look anything up. Use them rather than guessing at a syllabus, a law, an API or a version number.
- Edit and Write: your own department's files, if you are a building department.
- Bash, but only: npm run build, npx tsc, node scripts/*, git diff, git status.`;

export function catalog() {
  let extra = "";
  try { extra = fs.readFileSync(CATALOG, "utf8").split("\n").filter((l) => l.trim().startsWith("- ")).join("\n"); } catch {}
  return BASE + (extra ? "\n" + extra : "");
}

export function readRequests() {
  try { return JSON.parse(fs.readFileSync(REQUESTS, "utf8")); } catch { return []; }
}

function writeRequests(list) {
  fs.writeFileSync(REQUESTS, JSON.stringify(list.slice(-200), null, 2));
}

const key = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// A specialist asked for something. Record it once, no matter how many agents
// ask for the same thing, and count the demand.
export function requestTool({ what, why, dept, agent }) {
  if (!what || String(what).length < 3) return null;
  const list = readRequests();
  const existing = list.find((r) => key(r.what) === key(what));
  if (existing) {
    existing.asks++;
    if (!existing.depts.includes(dept)) existing.depts.push(dept);
    writeRequests(list);
    return existing;
  }
  const entry = { id: "R" + Date.now().toString(36), what: String(what).slice(0, 160), why: String(why || "").slice(0, 300), depts: [dept], firstAsked: Date.now(), asks: 1, status: "open", agent };
  list.push(entry);
  writeRequests(list);
  return entry;
}

export function openRequests() {
  return readRequests().filter((r) => r.status === "open").sort((a, b) => b.asks - a.asks);
}

// Supply answered one. The finding goes in the catalog so every future agent
// sees it, and the install command waits for Ayaan.
export function fulfil(id, { verdict, summary, install, safety, url }) {
  const list = readRequests();
  const r = list.find((x) => x.id === id);
  if (!r) return null;
  Object.assign(r, { status: verdict === "none" ? "dead-end" : "answered", summary, install, safety, url, answered: Date.now() });
  writeRequests(list);

  if (verdict !== "none" && summary) {
    const head = fs.existsSync(CATALOG) ? fs.readFileSync(CATALOG, "utf8") : "# What the office has\n\nAdded by Supply as agents ask for things. Everything here is already available or needs one command from Ayaan.\n";
    fs.writeFileSync(CATALOG, head.trimEnd() + `\n- ${summary}${url ? ` (${url})` : ""}${install ? ` Install: \`${install}\`` : ""}\n`);
  }
  return r;
}

export function approve(id) {
  const list = readRequests();
  const r = list.find((x) => x.id === id);
  if (r) { r.status = "approved"; r.approved = Date.now(); writeRequests(list); }
  return r;
}

export function decline(id) {
  const list = readRequests();
  const r = list.find((x) => x.id === id);
  if (r) { r.status = "declined"; writeRequests(list); }
  return r;
}
