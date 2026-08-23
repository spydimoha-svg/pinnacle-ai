// State and the event bus. Plain JSON on disk, no database, no dependency.
// Everything the dashboard shows is read from here, so the office survives a
// restart and you can inspect its brain with a text editor.

import fs from "node:fs";
import path from "node:path";
import { EventEmitter } from "node:events";
import { STATE_DIR, REPORTS_DIR, CONFIG } from "../config.mjs";
import { buildRoster, DEPARTMENTS } from "./org.mjs";

fs.mkdirSync(STATE_DIR, { recursive: true });
fs.mkdirSync(REPORTS_DIR, { recursive: true });

export const bus = new EventEmitter();
bus.setMaxListeners(0);

const file = (name) => path.join(STATE_DIR, name);

// A missing file on a first run is normal. A file that exists but will not
// parse is not: the fallback used to be promoted straight to the new truth and
// written back within 1.5 seconds, so one corrupt agents.json permanently
// erased every agent's record without a word. Now the damaged file is kept
// aside and the loss is stated out loud.
function readJson(name, fallback) {
  const target = file(name);
  if (!fs.existsSync(target)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(target, "utf8"));
  } catch (err) {
    const rescued = target + ".corrupt";
    try { fs.copyFileSync(target, rescued); } catch {}
    console.error(`\n  [office] ${name} could not be read (${err.message}).`);
    console.error(`  A copy is at ${rescued}. Starting from defaults for this file, so anything it held is not in memory.\n`);
    return fallback;
  }
}

// Write to a temp file then rename, so a crash mid write cannot corrupt state.
function writeJson(name, value) {
  const tmp = file(name + ".tmp");
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2));
  fs.renameSync(tmp, file(name));
}

const defaultOffice = () => ({
  running: false,
  mode: CONFIG.mode,
  concurrency: CONFIG.concurrency,
  // How many of those awake agents may be writing code at once. Each holds its
  // own working tree, so this is a limit on the machine, not on correctness.
  writers: CONFIG.writerConcurrency,
  startedAt: null,
  cooldownUntil: 0,
  deptEnabled: Object.fromEntries(DEPARTMENTS.map((d) => [d.key, true])),
  stats: { planned: 0, completed: 0, failed: 0, reverted: 0, blocked: 0, briefings: 0 },
});

const saved = readJson("office.json", {});
export const state = {
  office: {
    ...defaultOffice(), ...saved,
    stats: { ...defaultOffice().stats, ...(saved.stats || {}) },
    // How many work at once is a tuning knob, not accumulated state. Saved state
    // was winning over config.mjs, so the number he set there did nothing and the
    // office stayed on whatever it was told once, months ago. He can still change
    // it while it runs; a restart puts it back to what the config says.
    concurrency: CONFIG.concurrency,
    writers: CONFIG.writerConcurrency,
  },
  agents: readJson("agents.json", null) || buildRoster(),
  tasks: readJson("tasks.json", []),
};

// Roster shape changes when departments change. Rebuild, but carry every
// agent's record and history across so nobody loses their track record.
// Comparing lengths alone is not enough: moving 25 seats between departments
// keeps the total at 1000 while changing who exists.
const signature = (list) => list.map((a) => a.id).sort().join(",");
const fresh = buildRoster();
if (signature(state.agents) !== signature(fresh)) {
  const prior = new Map(state.agents.map((a) => [a.id, a]));
  state.agents = fresh.map((a) => {
    const was = prior.get(a.id);
    return was ? { ...a, done: was.done || 0, card: was.card, score: was.score, task: null } : a;
  });
}
// Nobody is mid task across a restart. Send everyone back to their desk and
// requeue whatever was in flight, otherwise a task the office died on stays
// "running" forever and its department never plans again.
state.agents.forEach((a) => { if (a.status === "working") { a.status = "idle"; a.task = null; } });
state.tasks.forEach((t) => { if (t.status === "running" || t.status === "claimed") t.status = "queued"; });

let dirty = false;
const touch = () => { dirty = true; };
setInterval(() => {
  if (!dirty) return;
  dirty = false;
  writeJson("office.json", state.office);
  writeJson("agents.json", state.agents);
  writeJson("tasks.json", state.tasks.slice(-800));
}, 1500).unref();

export function flush() {
  dirty = false;
  writeJson("office.json", state.office);
  writeJson("agents.json", state.agents);
  writeJson("tasks.json", state.tasks.slice(-800));
}

// Every meaningful thing that happens becomes an event: the dashboard streams
// these live and the executive briefing is written from them.
export function emit(type, data = {}) {
  const event = { t: Date.now(), type, ...data };
  fs.appendFile(file("events.jsonl"), JSON.stringify(event) + "\n", () => {});
  bus.emit("event", event);
  touch();
  return event;
}

export function recentEvents(limit = 200) {
  try {
    const lines = fs.readFileSync(file("events.jsonl"), "utf8").trim().split("\n");
    return lines.slice(-limit).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  } catch {
    return [];
  }
}

export function setOffice(patch) {
  Object.assign(state.office, patch);
  touch();
}

export function setAgent(id, patch) {
  const agent = state.agents.find((a) => a.id === id);
  if (agent) { Object.assign(agent, patch); touch(); }
  return agent;
}

export function addTask(task) {
  const full = { id: `T${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`, status: "queued", created: Date.now(), ...task };
  state.tasks.push(full);
  state.office.stats.planned++;
  touch();
  return full;
}

export function setTask(id, patch) {
  const task = state.tasks.find((t) => t.id === id);
  if (task) { Object.assign(task, patch); touch(); }
  return task;
}

export const queued = (dept) => state.tasks.filter((t) => t.status === "queued" && (!dept || t.dept === dept));
export const running = () => state.tasks.filter((t) => t.status === "running");

// Free workers in a department, least busy first, so the load spreads across
// the roster instead of hammering the same three agents forever.
export function pickAgent(dept, rank = "worker") {
  return state.agents
    .filter((a) => a.dept === dept && a.rank === rank && a.status === "idle")
    .sort((a, b) => a.done - b.done)[0];
}

export function saveReport(name, body) {
  const dir = path.join(REPORTS_DIR, new Date().toISOString().slice(0, 10));
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, name);
  fs.writeFileSync(target, body);
  return path.relative(REPORTS_DIR, target).replace(/\\/g, "/");
}

export function listReports(limit = 60) {
  const out = [];
  const walk = (dir, rel = "") => {
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full, path.posix.join(rel, e.name));
      else out.push({ path: path.posix.join(rel, e.name), mtime: fs.statSync(full).mtimeMs });
    }
  };
  walk(REPORTS_DIR);
  return out.sort((a, b) => b.mtime - a.mtime).slice(0, limit);
}
