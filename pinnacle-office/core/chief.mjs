// Pinnacle. The chief of staff, and the loop that never stops.
//
// Heads plan, workers execute, the gate accepts or throws the work away, and
// every few finished tasks Pinnacle writes Zainul a briefing. That is the
// whole machine.

import { DEPARTMENTS, deptByKey } from "./org.mjs";
import { state, emit, setOffice, setAgent, addTask, setTask, queued, pickAgent, saveReport, flush } from "./store.mjs";
import { runAgent, TOOLS, isRateLimited } from "./claude.mjs";
import { headBrief, workerBrief, chiefBrief, DOCTRINE } from "./briefs.mjs";
import { ensureRepo, verify, commit, revertAll, revertForbidden, changedFiles } from "./guard.mjs";
import { CONFIG } from "../config.mjs";

let inflight = 0;
let writerBusy = false;
let sinceBriefing = 0;
const lastPlanned = new Map();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Models sometimes wrap json in prose no matter how firmly you ask. Take the
// biggest balanced object we can find rather than failing the whole task.
function extractJson(text = "") {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidates = [fenced?.[1], text];
  for (const c of candidates) {
    if (!c) continue;
    const start = c.indexOf("{");
    const end = c.lastIndexOf("}");
    if (start === -1 || end <= start) continue;
    try { return JSON.parse(c.slice(start, end + 1)); } catch {}
  }
  return null;
}

const enabledDepts = () => DEPARTMENTS.filter((d) => state.office.deptEnabled[d.key] !== false);

function recentTitles(deptKey, n = 8) {
  return state.tasks.filter((t) => t.dept === deptKey && t.status === "done").slice(-n).map((t) => t.title);
}

// ------------------------------------------------------------------ planning

async function planDepartment(dept) {
  const head = state.agents.find((a) => a.dept === dept.key && a.rank === "head");
  setAgent(head.id, { status: "working" });
  emit("plan.start", { dept: dept.key, agent: head.id, title: `${head.title} is planning` });
  lastPlanned.set(dept.key, Date.now());

  const res = await runAgent({
    prompt: headBrief({ dept, recent: recentTitles(dept.key), mode: state.office.mode }),
    system: DOCTRINE,
    model: CONFIG.models.head,
    tools: TOOLS.read,
    maxTurns: CONFIG.maxTurns.head,
    timeout: CONFIG.timeout.head,
    onEvent: (e) => emit("agent.step", { agent: head.id, dept: dept.key, ...e }),
  });

  setAgent(head.id, { status: "idle", done: head.done + 1 });

  if (!res.ok) return handleFailure(res, dept.key, head.id, "planning");

  const plan = extractJson(res.result);
  if (!plan?.tasks?.length) {
    emit("plan.empty", { dept: dept.key, agent: head.id, detail: res.result.slice(0, 200) });
    return;
  }

  for (const t of plan.tasks.slice(0, CONFIG.tasksPerPlan)) {
    addTask({
      dept: dept.key,
      title: String(t.title || "untitled").slice(0, 120),
      why: String(t.why || ""),
      files: Array.isArray(t.files) ? t.files.slice(0, 6) : [],
      acceptance: String(t.acceptance || ""),
      specialty: String(t.specialty || ""),
      risk: t.risk || "low",
      plannedBy: head.id,
    });
  }
  emit("plan.done", { dept: dept.key, agent: head.id, count: plan.tasks.length, finding: plan.finding || "" });
}

// ----------------------------------------------------------------- execution

async function executeTask(task) {
  const dept = deptByKey(task.dept);
  const agent = pickAgent(task.dept, "worker") || pickAgent(task.dept, "manager");
  if (!agent) { setTask(task.id, { status: "queued" }); return; }

  const isCodeWrite = dept.kind === "code" && state.office.mode === "apply";
  if (isCodeWrite) writerBusy = true;

  setAgent(agent.id, { status: "working", task: task.title });
  setTask(task.id, { status: "running", agent: agent.id, started: Date.now() });
  emit("task.start", { taskId: task.id, dept: dept.key, agent: agent.id, title: task.title });

  // The tree must be clean before a writer starts or we cannot attribute the
  // diff to this agent.
  if (isCodeWrite) {
    const dirty = await changedFiles();
    if (dirty.length) await revertAll();
  }

  const res = await runAgent({
    prompt: workerBrief({ dept, agent, task, mode: state.office.mode }),
    system: DOCTRINE,
    model: CONFIG.models.worker,
    tools: isCodeWrite ? [...TOOLS.write, ...TOOLS.build] : TOOLS.read,
    canEdit: isCodeWrite,
    maxTurns: CONFIG.maxTurns.worker,
    timeout: CONFIG.timeout.worker,
    onEvent: (e) => emit("agent.step", { agent: agent.id, dept: dept.key, ...e }),
  });

  const report = extractJson(res.result) || {};

  if (!res.ok) {
    if (isCodeWrite) { await revertAll(); writerBusy = false; }
    setAgent(agent.id, { status: "idle", task: null });
    setTask(task.id, { status: "failed", reason: res.error, finished: Date.now() });
    state.office.stats.failed++;
    return handleFailure(res, dept.key, agent.id, task.title);
  }

  // Gate the change.
  if (isCodeWrite) {
    const smuggled = await revertForbidden();
    if (smuggled.length) emit("guard.blocked", { agent: agent.id, files: smuggled });

    const touched = await changedFiles();
    if (touched.length) {
      emit("gate.start", { taskId: task.id, files: touched.length });
      const check = await verify((step) => emit("gate.step", { taskId: task.id, step }));
      if (!check.ok) {
        const lost = await revertAll();
        state.office.stats.reverted++;
        state.office.stats.failed++;
        setAgent(agent.id, { status: "idle", task: null });
        setTask(task.id, { status: "reverted", reason: `${check.step} failed`, detail: check.detail, finished: Date.now() });
        emit("task.reverted", { taskId: task.id, dept: dept.key, agent: agent.id, title: task.title, step: check.step, detail: check.detail, files: lost.length });
        writerBusy = false;
        return;
      }
      if (CONFIG.autoCommit) {
        const c = await commit(`${task.dept}: ${task.title}\n\nBy ${agent.id} (${agent.specialty}). Task ${task.id}.`);
        setTask(task.id, { sha: c.sha });
      }
    }
    writerBusy = false;
  }

  // Analysis departments deliver documents, not diffs.
  if (dept.kind === "report" && report.body) {
    const name = `${dept.key}-${task.id}-${task.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}.md`;
    const file = saveReport(name, `# ${task.title}\n\nBy ${agent.title} (${agent.id})\n\n${report.body}\n`);
    setTask(task.id, { report: file });
  }

  setAgent(agent.id, { status: "idle", task: null, done: agent.done + 1 });
  setTask(task.id, {
    status: "done",
    outcome: report.outcome || "done",
    summary: report.summary || res.result.slice(0, 200),
    changed: report.changed || [],
    verified: report.verified || "",
    cost: res.cost,
    finished: Date.now(),
  });
  state.office.stats.completed++;
  sinceBriefing++;
  emit("task.done", { taskId: task.id, dept: dept.key, agent: agent.id, title: task.title, summary: report.summary || "", changed: (report.changed || []).length });
}

function handleFailure(res, dept, agent, what) {
  if (isRateLimited(res.error)) {
    const until = Date.now() + CONFIG.cooldownMs;
    setOffice({ cooldownUntil: until });
    emit("office.cooldown", { until, reason: res.error });
    return;
  }
  emit("agent.error", { dept, agent, what, error: String(res.error).slice(0, 300) });
}

// ------------------------------------------------------------------ briefing

async function writeBriefing() {
  sinceBriefing = 0;
  const since = state.tasks.filter((t) => t.finished && t.finished > Date.now() - 6 * 3600_000);
  const lines = since.slice(-40).map((t) => `[${t.dept}] ${t.status}: ${t.title}. ${t.summary || t.reason || ""}`).join("\n");
  if (!lines) return;

  emit("briefing.start", {});
  const uptimeMs = Date.now() - (state.office.startedAt || Date.now());
  const res = await runAgent({
    prompt: chiefBrief({
      window: lines,
      stats: state.office.stats,
      uptime: `${Math.floor(uptimeMs / 3600_000)}h ${Math.floor((uptimeMs % 3600_000) / 60_000)}m`,
    }),
    system: DOCTRINE,
    model: CONFIG.models.chief,
    tools: TOOLS.read,
    maxTurns: 8,
    timeout: 5 * 60_000,
  });
  if (!res.ok) return;

  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 16);
  const file = saveReport(`briefing-${stamp}.md`, res.result);
  state.office.stats.briefings++;
  emit("briefing.done", { file, text: res.result });
  flush();
}

// ---------------------------------------------------------------- the loop

// Whether this department is due for a planning round: nothing left in its
// queue and it has not just planned.
function needsPlan(dept) {
  if (queued(dept.key).length) return false;
  if (state.tasks.some((t) => t.status === "running" && t.dept === dept.key)) return false;
  return Date.now() - (lastPlanned.get(dept.key) || 0) > 60_000;
}

function nextRunnable() {
  const enabled = new Set(enabledDepts().map((d) => d.key));
  const ready = queued().filter((t) => enabled.has(t.dept));
  for (const task of ready) {
    const dept = deptByKey(task.dept);
    const isCodeWrite = dept.kind === "code" && state.office.mode === "apply";
    if (isCodeWrite && writerBusy) continue;
    if (!pickAgent(task.dept, "worker") && !pickAgent(task.dept, "manager")) continue;
    return task;
  }
  return null;
}

function nextToPlan() {
  return enabledDepts()
    .filter(needsPlan)
    .sort((a, b) => a.priority - b.priority || (lastPlanned.get(a.key) || 0) - (lastPlanned.get(b.key) || 0))[0];
}

export async function startOffice() {
  if (state.office.running) return;
  const repo = await ensureRepo();
  if (repo.created) emit("office.repo", { detail: "Created a git repo for this project so every agent change is revertable" });

  setOffice({ running: true, startedAt: state.office.startedAt || Date.now() });
  emit("office.start", { mode: state.office.mode, concurrency: state.office.concurrency });

  while (state.office.running) {
    if (Date.now() < state.office.cooldownUntil) { await sleep(5000); continue; }

    if (sinceBriefing >= CONFIG.briefingEvery && inflight === 0) { await writeBriefing(); continue; }

    if (inflight >= state.office.concurrency) { await sleep(1000); continue; }

    const task = nextRunnable();
    if (task) {
      setTask(task.id, { status: "claimed" });
      inflight++;
      executeTask(task).catch((e) => emit("agent.error", { error: String(e).slice(0, 200) })).finally(() => { inflight--; });
      continue;
    }

    const dept = nextToPlan();
    if (dept) {
      inflight++;
      planDepartment(dept).catch((e) => emit("agent.error", { dept: dept.key, error: String(e).slice(0, 200) })).finally(() => { inflight--; });
      continue;
    }

    await sleep(CONFIG.tickIdleMs);
  }

  emit("office.stop", {});
  flush();
}

export function stopOffice() {
  setOffice({ running: false });
  flush();
}

export { writeBriefing };
