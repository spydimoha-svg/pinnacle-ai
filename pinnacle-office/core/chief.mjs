// Pinnacle. The chief of staff, and the loop that never stops.
//
// Heads plan, workers execute, the gate accepts or throws the work away, and
// every few finished tasks Pinnacle writes Ayaan a briefing. That is the
// whole machine.

import { DEPARTMENTS, deptByKey } from "./org.mjs";
import * as skills from "./skills.mjs";
import { record, bestFor, proficiency } from "./scorecard.mjs";
import { state, emit, setOffice, setAgent, addTask, setTask, queued, pickAgent, saveReport, flush } from "./store.mjs";
import { runAgent, TOOLS, isRateLimited } from "./claude.mjs";
import { headBrief, workerBrief, chiefBrief, DOCTRINE } from "./briefs.mjs";
import { ensureRepo, verify, commit, revertAll, revertForbidden, changedFiles, diffText } from "./guard.mjs";
import { screen, review } from "./warden.mjs";
import { catalog, requestTool } from "./supply.mjs";
import { owner } from "./talk.mjs";
import { CONFIG } from "../config.mjs";

let inflight = 0;
let writerBusy = false;
let sinceBriefing = 0;
const lastPlanned = new Map();
// Skill files that have grown past the point anyone would read them. Rewritten
// when the floor is quiet, never in the middle of real work.
const sharpenQueue = new Set();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Models wrap json in prose no matter how firmly you ask, and they put real
// line breaks inside json strings, which is invalid json. Try the clean parse
// first, then repair the newlines, then give up.
function extractJson(text = "") {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  for (const candidate of [fenced?.[1], text]) {
    if (!candidate) continue;
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start === -1 || end <= start) continue;
    const slice = candidate.slice(start, end + 1);
    try { return JSON.parse(slice); } catch {}
    try { return JSON.parse(repairNewlines(slice)); } catch {}
  }
  return null;
}

// Escape line breaks that appear inside a json string literal.
function repairNewlines(s) {
  let out = "";
  let inString = false;
  let escaped = false;
  for (const ch of s) {
    if (escaped) { out += ch; escaped = false; continue; }
    if (ch === "\\") { out += ch; escaped = true; continue; }
    if (ch === '"') { inString = !inString; out += ch; continue; }
    if (inString && (ch === "\n" || ch === "\r")) { out += "\\n"; continue; }
    out += ch;
  }
  return out;
}

// Advisory departments hand back a json header and then their document.
const splitReport = (text = "") => text.split(/^---REPORT---\s*$/m)[1]?.trim() || "";

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

// What an agent is allowed to reach for. Everyone can look things up, because
// an agent guessing at the CBSE syllabus or the DPDP Act is worse than one that
// checks. Only Supply may inspect what is installed on the machine.
function toolsFor(dept, isCodeWrite) {
  const base = isCodeWrite ? [...TOOLS.write, ...TOOLS.build] : TOOLS.read;
  const kit = [...base, ...TOOLS.research];
  return dept.key === "supply" ? [...kit, ...TOOLS.survey] : kit;
}

// An agent that says it needs something does not go without and does not
// improvise. The request is recorded once however many agents ask for it, and
// only the first ask becomes a Supply job.
function raiseRequests(needs, agent, dept) {
  for (const need of (needs || []).slice(0, 3)) {
    const what = typeof need === "string" ? need : need?.what;
    const why = typeof need === "string" ? "" : need?.why;
    if (!what || String(what).trim().length < 4) continue;
    const req = requestTool({ what, why, dept: dept.key, agent: agent.id });
    if (!req || req.asks > 1) continue;
    addTask({
      dept: "supply",
      title: `Source: ${String(what).trim()}`.slice(0, 120),
      why: `${agent.title} in ${dept.name} needed it. ${why || ""}`.trim(),
      acceptance: "Name the exact tool, prove it is free and current, write the one command that installs it, and say what it can reach on this machine.",
      specialty: "developer tooling",
      risk: "low",
      raisedBy: agent.id,
      requestId: req.id,
    });
    emit("supply.requested", { dept: dept.key, agent: agent.id, need: String(what).slice(0, 120) });
  }
}

// ----------------------------------------------------------------- execution

// Only one agent may hold the codebase at a time, so if a task ever throws
// while holding that lock the whole office stops writing code, forever, with
// no error anywhere. The lock and the agent's desk are released in a finally
// block precisely because an unexpected throw is the case that matters.
async function executeTask(task) {
  const dept = deptByKey(task.dept);
  // A task Pinnacle named a seat for goes to that seat. She told him who had it
  // the moment he asked, so handing it to somebody else would make her a liar.
  const named = task.assignedTo && state.agents.find((a) => a.id === task.assignedTo && a.status === "idle");
  const agent = named || bestFor(task.dept, task.risk) || pickAgent(task.dept, "manager");
  if (!agent) { setTask(task.id, { status: "queued" }); return; }
  try {
    return await runTask(task, dept, agent);
  } catch (err) {
    setTask(task.id, { status: "failed", reason: `crashed: ${err.message}`, finished: Date.now() });
    state.office.stats.failed++;
    emit("agent.error", { dept: dept.key, agent: agent.id, what: task.title, error: String(err.stack || err).slice(0, 300) });
  } finally {
    writerBusy = false;
    if (state.agents.find((a) => a.id === agent.id)?.status === "working") setAgent(agent.id, { status: "idle", task: null });
  }
}

// The best available specialist, not just any free one. High risk work goes
// to the proven; routine work spreads so the bench keeps improving.
async function runTask(task, dept, agent) {

  const isCodeWrite = dept.kind === "code" && state.office.mode === "apply";
  const startedAt = Date.now();
  if (isCodeWrite) writerBusy = true;

  setAgent(agent.id, { status: "working", task: task.title });
  setTask(task.id, { status: "running", agent: agent.id, started: Date.now() });
  emit("task.start", { taskId: task.id, dept: dept.key, agent: agent.id, title: task.title });

  // The tree must be clean before a writer starts or we cannot attribute the
  // diff to this agent. Park whatever is already there in a commit. Never
  // revert it: those are Ayaan's own uncommitted edits, not an agent's.
  if (isCodeWrite) {
    const dirty = await changedFiles();
    if (dirty.length) {
      const parked = await commit("wip: edits made outside the office, parked before an agent started");
      emit("office.parked", { files: dirty.length, sha: parked.sha });
    }
  }

  const res = await runAgent({
    prompt: workerBrief({
      dept, agent, task, mode: state.office.mode,
      learned: skills.read(dept.key, agent.specialty),
      catalog: catalog(),
    }),
    system: DOCTRINE,
    model: CONFIG.models.worker,
    tools: toolsFor(dept, isCodeWrite),
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
    record(agent.id, { outcome: "failed", ms: Date.now() - startedAt, turns: res.turns });
    return handleFailure(res, dept.key, agent.id, task.title);
  }

  // Gate the change.
  if (isCodeWrite) {
    const smuggled = await revertForbidden();
    if (smuggled.length) emit("guard.blocked", { agent: agent.id, files: smuggled });

    const touched = await changedFiles();
    if (touched.length) {
      // Pinnacle's pattern screen runs first because it costs nothing. What it
      // blocks never reaches a build, a review, or the project.
      // Did they do the job, or something adjacent to it? Two checks, because
      // asking an agent to confess is not the same as knowing.
      const outOfScope = dept.scope.length
        ? touched.filter((f) => !dept.scope.some((sc) => f.startsWith(sc.replace(/\*+$/, ""))))
        : [];
      if (outOfScope.length) {
        emit("agent.drift", { agent: agent.id, dept: dept.key, title: task.title, files: outOfScope.slice(0, 6) });
      }
      if (report.drift) {
        emit("agent.drift", { agent: agent.id, dept: dept.key, title: task.title, said: report.drift });
      }
      setTask(task.id, { drift: report.drift || "", outOfScope });

      const patch = await diffText();
      const { blocked, flags } = screen(patch);
      if (blocked.length) {
        await revertAll();
        const reason = "Pinnacle refused on sight: " + blocked.map((b) => b.why).join(", ");
        finishBlocked(task, agent, dept, reason, "high");
        writerBusy = false;
        return;
      }

      emit("gate.start", { taskId: task.id, files: touched.length });
      const check = await verify((step) => emit("gate.step", { taskId: task.id, step }));
      if (!check.ok) {
        const lost = await revertAll();
        state.office.stats.reverted++;
        state.office.stats.failed++;
        setAgent(agent.id, { status: "idle", task: null });
        setTask(task.id, { status: "reverted", reason: `${check.step} failed`, detail: check.detail, finished: Date.now() });
        record(agent.id, { outcome: "reverted", ms: Date.now() - startedAt, turns: res.turns });
        emit("task.reverted", { taskId: task.id, dept: dept.key, agent: agent.id, title: task.title, step: check.step, detail: check.detail, files: lost.length });
        writerBusy = false;
        return;
      }
      // It compiles. Now Pinnacle reads it and rules on it.
      if (CONFIG.warden.enabled) {
        emit("warden.start", { taskId: task.id, dept: dept.key, agent: agent.id, title: task.title });
        const ruling = await review({ task: { ...task, summary: report.summary, verified: report.verified, drift: report.drift || "", outOfScope }, agent, dept, patch, flags, onEvent: (e) => emit("agent.step", { agent: "PINNACLE", dept: dept.key, ...e }) });
        setTask(task.id, { ruling });
        if (ruling.verdict === "refuse") {
          await revertAll();
          finishBlocked(task, agent, dept, ruling.reason, ruling.risk);
          writerBusy = false;
          return;
        }
        emit("warden.pass", { taskId: task.id, dept: dept.key, title: task.title, risk: ruling.risk, reason: ruling.reason, degraded: ruling.degraded });
      }

      if (CONFIG.autoCommit) {
        const c = await commit(`${task.dept}: ${task.title}\n\nBy ${agent.id} (${agent.specialty}). Task ${task.id}.\nCleared by Pinnacle.`);
        setTask(task.id, { sha: c.sha });
      }
    }
    writerBusy = false;
  }

  // Analysis departments deliver documents, not diffs. Pinnacle reads those
  // too: bad legal or tax advice is its own kind of harm, and Ayaan might act
  // on it. A flagged memo is kept, with the warning stapled to the top.
  const body = dept.kind === "report" ? splitReport(res.result) || report.body : "";
  if (body) {
    let header = "";
    if (CONFIG.warden.enabled) {
      emit("warden.start", { taskId: task.id, dept: dept.key, agent: agent.id, title: task.title });
      const ruling = await review({ task: { ...task, summary: report.summary }, agent, dept, patch: body.slice(0, 22_000) });
      setTask(task.id, { ruling });
      if (ruling.verdict === "refuse") {
        header = `> **Pinnacle flagged this memo before you read it.** ${ruling.reason}\n\n`;
        state.office.stats.blocked++;
        emit("warden.block", { taskId: task.id, dept: dept.key, agent: agent.id, title: task.title, reason: ruling.reason, risk: ruling.risk });
      } else {
        emit("warden.pass", { taskId: task.id, dept: dept.key, title: task.title, risk: ruling.risk, reason: ruling.reason, degraded: ruling.degraded });
      }
    }
    const name = `${dept.key}-${task.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 44)}.md`;
    const file = saveReport(name, `# ${task.title}\n\nFiled by ${agent.title} (${agent.id}), ${dept.name}.\n\n${header}${body}\n`);
    setTask(task.id, { report: file });
  }

  // The job is accepted. Bank what this seat learned, so the next specialist to
  // sit in it starts from here instead of from nothing.
  const gained = skills.learn(dept.key, agent.specialty, report.learned || []);
  if (gained) emit("skill.learned", { dept: dept.key, agent: agent.id, specialty: agent.specialty, count: gained, first: String((report.learned || [])[0] || "").slice(0, 140) });
  if (skills.overCap(dept.key, agent.specialty)) sharpenQueue.add(`${dept.key}::${agent.specialty}`);

  // Anything the agent needed and did not have becomes a Supply job.
  raiseRequests(report.needs, agent, dept);

  const score = record(agent.id, { outcome: "shipped", ms: Date.now() - startedAt, turns: res.turns });
  setAgent(agent.id, { status: "idle", task: null, done: agent.done + 1 });
  setTask(task.id, {
    status: "done",
    outcome: report.outcome || "done",
    summary: report.summary || res.result.replace(/```[\s\S]*?```/g, "").trim().slice(0, 220) || "no summary returned",
    changed: report.changed || [],
    verified: report.verified || "",
    note: report.note || "",
    learned: report.learned || [],
    minutes: Math.round((Date.now() - startedAt) / 6000) / 10,
    score,
    cost: res.cost,
    finished: Date.now(),
  });
  state.office.stats.completed++;
  sinceBriefing++;
  emit("task.done", { taskId: task.id, dept: dept.key, agent: agent.id, title: task.title, summary: report.summary || "", changed: (report.changed || []).length });
  // The specialist reports to the CEO in their own words.
  if (report.note) emit("staff.report", { taskId: task.id, dept: dept.key, agent: agent.id, who: agent.title, note: report.note, ruling: state.tasks.find((t) => t.id === task.id)?.ruling?.verdict || "" });
}

// Refused by Pinnacle. The work is already gone by the time this runs; this
// records why, so a refusal is never silent.
function finishBlocked(task, agent, dept, reason, risk) {
  setAgent(agent.id, { status: "idle", task: null });
  setTask(task.id, { status: "blocked", reason, risk, finished: Date.now() });
  record(agent.id, { outcome: "refused", ms: Date.now() - (task.started || Date.now()) });
  state.office.stats.blocked++;
  emit("warden.block", { taskId: task.id, dept: dept.key, agent: agent.id, title: task.title, reason, risk });
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
  // Nothing has finished, so there is nothing to summarise and no reason to
  // spend a model run saying so. He still asked for a report, so he gets one:
  // where the floor actually stands, written from state, instantly.
  if (!lines) return standingReport();

  emit("briefing.start", {});
  const uptimeMs = Date.now() - (state.office.startedAt || Date.now());
  const res = await runAgent({
    prompt: chiefBrief({
      window: lines,
      stats: state.office.stats,
      uptime: `${Math.floor(uptimeMs / 3600_000)}h ${Math.floor((uptimeMs % 3600_000) / 60_000)}m`,
      owner: owner(),
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

// Where the floor stands right now, with no model involved. This is what "give
// me a report" produces before anything has finished, and it takes no time and
// no usage to write.
function standingReport() {
  const s = state.office.stats;
  const q = queued();
  const live = state.agents.filter((a) => a.status === "working");
  const byDept = DEPARTMENTS.map((d) => ({ d, n: q.filter((t) => t.dept === d.key).length })).filter((x) => x.n);
  const stamp = new Date();

  const body = `# Where the floor stands

Written ${stamp.toLocaleString()}. Nothing has finished since the last briefing, so this is the standing position rather than a summary of work.

## The office

The office is ${state.office.running ? "open" : "closed"}, in ${state.office.mode} mode, running up to ${state.office.concurrency} agents at once. ${live.length ? `${live.length} ${live.length === 1 ? "specialist is" : "specialists are"} mid task.` : "Nobody is mid task."}

## What is waiting

${byDept.length ? byDept.map((x) => `- ${x.d.name}: ${x.n} ${x.n === 1 ? "job" : "jobs"} queued`).join("\n") : "- Nothing is queued. Give a department a job, or open up and let the heads plan."}

${q.filter((t) => t.fromAyaan).length ? `${q.filter((t) => t.fromAyaan).length} of those you asked for yourself, and they run first.` : ""}

## Running totals

- Shipped: ${s.completed}
- Refused by Pinnacle: ${s.blocked || 0}
- Reverted for failing the build: ${s.reverted || 0}
- Failed outright: ${s.failed || 0}

## Your call

${state.office.running ? "Nothing needs you right now." : q.length ? "The queue has work in it and the office is shut. Say open the office and they start." : "Give the floor something to do."}
`;

  const file = saveReport(`standing-${stamp.toISOString().replace(/[:.]/g, "-").slice(0, 16)}.md`, body);
  emit("briefing.done", { file, text: body });
  flush();
}

// ---------------------------------------------------------------- the loop

// Departments Ayaan told to plan right now, queue or no queue.
const forced = new Set();
export const forcePlan = (deptKey) => forced.add(deptKey);

// Hand a department a task yourself. It goes to the front of the queue.
export function orderTask(deptKey, title) {
  return addTask({ dept: deptKey, title, why: "Ordered directly by Ayaan.", files: [], acceptance: "Ayaan asked for this. Use your judgement on what done means, and say what you decided.", fromAyaan: true, plannedBy: "AYAAN" });
}

// Whether this department is due for a planning round: nothing left in its
// queue and it has not just planned.
function needsPlan(dept) {
  if (forced.has(dept.key)) { forced.delete(dept.key); return true; }
  if (queued(dept.key).length) return false;
  if (state.tasks.some((t) => t.status === "running" && t.dept === dept.key)) return false;
  return Date.now() - (lastPlanned.get(dept.key) || 0) > 60_000;
}

function nextRunnable() {
  const enabled = new Set(enabledDepts().map((d) => d.key));
  // Anything Ayaan ordered himself jumps the queue, then departments run in
  // priority order.
  // A proof task waits for the work it is proving, or it tests the old code and
  // passes for the wrong reason.
  const settled = (id) => !state.tasks.some((t) => t.id === id && t.status !== "done" && t.status !== "cancelled");
  const ready = queued()
    .filter((t) => enabled.has(t.dept))
    .filter((t) => !t.after?.length || t.after.every(settled))
    .sort((a, b) => (b.fromAyaan ? 1 : 0) - (a.fromAyaan ? 1 : 0) || deptByKey(a.dept).priority - deptByKey(b.dept).priority);
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

// True only while this process is actually running the loop. `office.running`
// is persisted, so after a crash or a killed terminal it stays true on disk and
// startOffice used to return here instantly and silently, leaving a dashboard
// that claimed to be open while nothing worked.
let looping = false;

export async function startOffice() {
  if (looping) return;
  if (state.office.running) {
    emit("office.recovered", { detail: "The office was left marked open by a previous run that did not shut down cleanly. Restarting the loop." });
  }
  looping = true;
  const repo = await ensureRepo();
  if (repo.created) emit("office.repo", { detail: "Created a git repo for this project so every agent change is revertable" });

  setOffice({ running: true, startedAt: state.office.startedAt || Date.now() });
  emit("office.start", { mode: state.office.mode, concurrency: state.office.concurrency });

  while (state.office.running) {
    if (Date.now() < state.office.cooldownUntil) { await sleep(5000); continue; }

    if (sinceBriefing >= CONFIG.briefingEvery && inflight === 0) { await writeBriefing(); continue; }

    // Quiet time is spent sharpening. A playbook nobody will read is worth
    // nothing, so an overgrown one gets rewritten before more work lands on it.
    if (sharpenQueue.size && inflight === 0) {
      const [next] = sharpenQueue;
      sharpenQueue.delete(next);
      const [dk, specialty] = next.split("::");
      emit("skill.sharpen", { dept: dk, specialty });
      const out = await skills.sharpen(dk, specialty);
      if (out.ok) emit("skill.sharpened", { dept: dk, specialty, detail: `${specialty} playbook rewritten tighter` });
      continue;
    }

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

  looping = false;
  emit("office.stop", {});
  flush();
}

export function stopOffice() {
  setOffice({ running: false });
  flush();
}

// One supervised round: a head plans, one specialist executes, then stop.
// Use this to watch a department work before trusting it unattended.
export async function runOnce(deptKey) {
  await ensureRepo();
  const dept = deptByKey(deptKey);
  await planDepartment(dept);
  const task = queued(deptKey)[0];
  if (!task) return { planned: 0 };
  await executeTask(task);
  flush();
  return { task: state.tasks.find((t) => t.id === task.id) };
}

export { writeBriefing, planDepartment, executeTask };
