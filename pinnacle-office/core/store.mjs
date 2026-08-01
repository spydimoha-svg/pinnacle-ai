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

function readJson(name, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file(name), "utf8"));
  } catch {
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
  startedAt: null,
  cooldownUntil: 0,
  deptEnabled: Object.fromEntries(DEPARTMENTS.map((d) => [d.key, true])),
  stats: { planned: 0, completed: 0, failed: 0, reverted: 0, briefings: 0 },
});

export const state = {
  office: { ...defaultOffice(), ...readJson("office.json", {}) },
  agents: readJson("agents.json", null) || buildRoster(),
  tasks: readJson("tasks.json", []),
};

// Roster shape changes when departments change. Rebuild but keep counters.
if (state.agents.length !== buildRoster().length) {
  const prior = new Map(state.agents.map((a) => [a.id, a]));
  state.agents = buildRoster().map((a) => ({ ...a, done: prior.get(a.id)?.done || 0 }));
}
state.agents.forEach((a) => (a.status = a.status === "working" ? "idle" : a.status));

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
