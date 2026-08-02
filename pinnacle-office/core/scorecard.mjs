// Proficiency. Every agent carries a record, and the record decides who gets
// the next job.
//
// Without this the office is 1000 interchangeable strangers. With it, the
// specialists who ship clean work rise to the harder tasks, and the ones who
// keep getting refused stop being handed anything that matters.

import { state, setAgent, emit } from "./store.mjs";

const blank = () => ({ runs: 0, shipped: 0, refused: 0, reverted: 0, failed: 0, ms: 0, turns: 0, streak: 0 });

// Reading a record must never create one. Assigning on read gave all 1000
// agents an empty card the first time anyone was ranked, and left them showing
// a score of undefined.
export const cardOf = (agent) => agent.card || blank();

// 0 to 100. Shipping clean is the whole job, so acceptance dominates. Speed is
// a tiebreaker, never a reason to prefer sloppy work.
export function proficiency(agent) {
  const c = cardOf(agent);
  if (!c.runs) return 50; // untested, mid table, so new agents still get work
  const accept = c.shipped / c.runs;
  const harm = (c.refused * 2 + c.reverted) / c.runs; // a refusal costs double
  const speed = c.shipped ? Math.min(1, 420_000 / (c.ms / Math.max(1, c.shipped))) : 0.5;
  const raw = accept * 78 + speed * 12 + Math.min(c.streak, 5) * 2;
  return Math.max(0, Math.min(100, Math.round(raw - harm * 26)));
}

// Below this an agent is benched: still on the roster, no longer picked.
const FLOOR = 22;
export const benched = (agent) => cardOf(agent).runs >= 3 && proficiency(agent) < FLOOR;

export function record(agentId, { outcome, ms = 0, turns = 0 }) {
  const agent = state.agents.find((a) => a.id === agentId);
  if (!agent) return;
  const c = agent.card || (agent.card = blank());
  c.runs++;
  c.ms += ms;
  c.turns += turns;
  if (outcome === "shipped") { c.shipped++; c.streak++; }
  else { c[outcome === "refused" ? "refused" : outcome === "reverted" ? "reverted" : "failed"]++; c.streak = 0; }

  const score = proficiency(agent);
  setAgent(agentId, { card: c, score });
  if (benched(agent)) emit("staff.benched", { agent: agentId, dept: agent.dept, score, detail: `${agent.title} is benched after ${c.runs} jobs at ${score} out of 100` });
  return score;
}

// Who should take this job. Best available specialist, hardest tasks to the
// strongest, and never someone who is benched.
export function bestFor(dept, risk = "low") {
  const pool = state.agents.filter((a) => a.dept === dept && a.status === "idle" && a.rank !== "head" && !benched(a));
  if (!pool.length) return null;
  // Specialists do the work; managers only step in when no specialist is free.
  // Without this tiebreak, everyone starts on zero runs and the managers, who
  // come first in the roster, silently absorb every early task.
  const rank = (a) => (a.rank === "worker" ? 0 : 1);
  const ranked = pool.map((a) => ({ a, s: proficiency(a), runs: cardOf(a).runs }));
  // High risk work goes to the proven. Low risk work spreads out, so the bench
  // keeps learning instead of ossifying around five favourites.
  if (risk === "high" || risk === "med" || risk === "medium") {
    return ranked.sort((x, y) => rank(x.a) - rank(y.a) || y.s - x.s || x.runs - y.runs)[0].a;
  }
  return ranked.sort((x, y) => rank(x.a) - rank(y.a) || x.runs - y.runs || y.s - x.s)[0].a;
}

export function deptCard(deptKey) {
  const mine = state.agents.filter((a) => a.dept === deptKey && a.card?.runs);
  if (!mine.length) return { score: null, runs: 0, avgMin: 0, bench: 0 };
  const runs = mine.reduce((n, a) => n + a.card.runs, 0);
  const ms = mine.reduce((n, a) => n + a.card.ms, 0);
  const shipped = mine.reduce((n, a) => n + a.card.shipped, 0);
  return {
    score: Math.round(mine.reduce((n, a) => n + proficiency(a), 0) / mine.length),
    runs,
    shipped,
    avgMin: Math.round(ms / runs / 6000) / 10,
    bench: state.agents.filter((a) => a.dept === deptKey && benched(a)).length,
  };
}

// Dismiss a specialist and put a fresh one in the seat the same second.
//
// The roster is fixed at 1000, so "replacing" someone is not deleting a row: it
// is clearing the record, wiping the accumulated habits, and handing the seat
// to a new specialist with the same brief and none of the baggage. Work carries
// on immediately because the seat never goes empty.
export function dismiss(agentId, reason = "") {
  const agent = state.agents.find((a) => a.id === agentId);
  if (!agent) return null;
  if (agent.rank === "head") return { error: "Heads plan the department. Dismiss a specialist, or close the department instead." };

  const was = { score: proficiency(agent), ...cardOf(agent) };
  const gen = (agent.generation || 1) + 1;

  Object.assign(agent, {
    generation: gen,
    // Same seat, same specialty, new person in it.
    title: agent.title.replace(/\s*\(gen \d+\)$/, "") + (gen > 1 ? ` (gen ${gen})` : ""),
    card: null,
    score: undefined,
    status: "idle",
    task: null,
    done: 0,
    dismissedAt: Date.now(),
  });

  emit("staff.dismissed", {
    agent: agentId,
    dept: agent.dept,
    reason: reason || "dismissed by Ayaan",
    was,
    detail: `${agentId} dismissed after ${was.runs} job${was.runs === 1 ? "" : "s"} at ${was.score} out of 100. A fresh specialist has the seat.`,
  });
  return { ok: true, agent: agentId, replacedBy: `${agentId} gen ${gen}`, was };
}

// Clear out everyone in a department who is under the floor, all at once.
export function dismissBenched(deptKey) {
  const out = state.agents.filter((a) => (!deptKey || a.dept === deptKey) && benched(a)).map((a) => a.id);
  out.forEach((id) => dismiss(id, "below the floor"));
  return out;
}

// The whole building, best first. This is what Pinnacle reads when Ayaan asks
// who is actually any good.
export function leaderboard(limit = 12) {
  return state.agents
    .filter((a) => a.card?.runs)
    .map((a) => ({ id: a.id, title: a.title, dept: a.dept, specialty: a.specialty, score: proficiency(a), ...a.card }))
    .sort((x, y) => y.score - x.score || y.shipped - x.shipped)
    .slice(0, limit);
}
