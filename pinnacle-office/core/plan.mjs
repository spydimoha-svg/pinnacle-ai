// The plan she hands back the second he stops talking.
//
// Before this, telling her to do something produced one queued row and nothing
// else: no answer to "how are you going to do this", no name against it, and
// nothing to look at. Now every order comes back as a plan with a real seat
// named on every step, already filed, in about a millisecond, because none of
// this goes near a model. A model would take four seconds to do worse.

import { DEPARTMENTS, deptByKey } from "./org.mjs";
import { addTask, emit, state } from "./store.mjs";
import { bestFor, proficiency } from "./scorecard.mjs";

// Which team owns a sentence. The index is built from the org chart itself, so
// a new department is understood the moment it is added and named nowhere else.
const STOP = new Set(["the", "and", "for", "with", "that", "this", "into", "from", "make", "fix", "our", "your", "please", "want", "need", "should", "does", "can", "all", "app", "site", "page", "work", "working", "code"]);
const words = (s) => String(s).toLowerCase().match(/[a-z]{3,}/g) || [];

const INDEX = DEPARTMENTS.map((d) => ({
  key: d.key,
  terms: new Set([...words(d.key), ...words(d.name), ...d.specialties.flatMap(words)].filter((w) => !STOP.has(w))),
}));

// What is wrong beats what it is wrong with. "The lesson player keeps crashing"
// is the Defect Squad, not the Tutor Engine, and "you could hack the api" is
// Security, not Back End. Matching on the noun alone sent every one of those to
// the wrong team, because he names the surface and describes the symptom.
const SYMPTOM = [
  [/\bbug|broken|crash|defect|not working|doesn'?t work|fails|failing|glitch|freezes|blank screen|throws/, "debug"],
  [/hack|exploit|\bxss\b|injection|vulnerab|breach|steal|leak|bypass|unauthenti/, "security"],
  [/\bslow\b|laggy|takes ages|load time|freezing up|janky|stutter/, "performance"],
  [/confus|can'?t find|cannot find|nobody can find|hard to find|gets stuck|no idea what/, "ux"],
  [/screen reader|keyboard only|colour contrast|color contrast|too small to tap/, "a11y"],
  [/no tests|untested|keeps regress|broke again/, "qa"],
];

// What he actually says, which is rarely the department's own name.
const SAYS = [
  [/\bfront[\s-]?end|\bui\b|button|layout|spacing|responsive|mobile view/, "frontend"],
  [/\bback[\s-]?end|\bapi\b|endpoint|serverless|streaming/, "backend"],
  [/tutor|teach|explain|lesson|hint|answer|mastery|prompt/, "tutor"],
  [/syllabus|chapter|ncert|question bank|content|curriculum|marking/, "content"],
  [/video|narration|explainer/, "video"],
  [/diagram|figure|circuit|ray optic|graph/, "diagrams"],
  [/\btest|\bqa\b|smoke|regression|coverage/, "qa"],
  [/bug|broken|crash|defect|error|not working|fails|glitch/, "debug"],
  [/secur|hack|exploit|xss|injection|auth bypass|vulnerab/, "security"],
  [/database|schema|supabase|migration|row level/, "database"],
  [/log ?in|login|sign ?up|session|account|password|otp/, "auth"],
  [/slow|speed|fast|performance|bundle|lighthouse|lcp|load time/, "performance"],
  [/design|brand|logo|landing|visual|typography|colour|color/, "design"],
  [/confus|user research|journey|onboard|friction|usability/, "ux"],
  [/accessib|screen reader|keyboard|contrast|a11y/, "a11y"],
  [/deploy|build pipeline|vercel|netlify|rollback|monitor/, "devops"],
  [/pricing|revenue|unit econom|money|charge|subscription|profit/, "finance"],
  [/\bgst\b|\btax\b|invoice|bookkeep|accounts|\bca\b/, "accounting"],
  [/legal|privacy policy|terms|dpdp|licence|license|copyright/, "legal"],
  [/install|\bmcp\b|\bcli\b|dataset|library|source a|find me a tool/, "supply"],
  [/growth|marketing|seo|referral|school partnership|acquisition/, "growth"],
];

export function pickDept(line) {
  const said = String(line).toLowerCase();
  const score = new Map();
  const add = (key, n) => score.set(key, (score.get(key) || 0) + n);

  for (const [re, key] of SYMPTOM) if (re.test(said)) add(key, 3);
  for (const [re, key] of SAYS) if (re.test(said)) add(key, 1);

  // Nothing he said named a team or a symptom, so fall back to the org chart's
  // own vocabulary: every specialty in the building, matched word by word.
  if (!score.size) {
    const w = words(said).filter((x) => !STOP.has(x));
    for (const d of INDEX) {
      const hits = w.reduce((n, x) => n + (d.terms.has(x) ? 1 : 0), 0);
      if (hits) add(d.key, hits);
    }
  }
  if (!score.size) return null;
  return [...score].sort((a, b) => b[1] - a[1])[0][0];
}

// One breath can hold several jobs. Split only on the words a person actually
// uses to mean "and after that", never on a bare "and", because "the login and
// signup form" is one job and splitting it files two half tasks.
function steps(text) {
  return String(text)
    .split(/\s*(?:,?\s*(?:and then|then|after that|after which|followed by|also)\s+|\s*;\s*|\n+|\s(?=\d[.)]\s))/i)
    .map((s) => s.replace(/^\s*\d[.)]\s*/, "").replace(/^(?:and|also|please|can you|could you|i want you to|i need you to)\s+/i, "").trim())
    .filter((s) => s.length > 3)
    .slice(0, 3);
}

// Strip the way he addresses her off the front, so the task title reads as an
// instruction rather than as a transcript of him talking.
const TO_HER = /^\s*(?:hey\s+|ok(?:ay)?\s+)?pinnacle[\s,]*|^\s*(?:can you|could you|i want you to|i need you to|please)\s+/gi;
const clean = (s) => String(s).replace(TO_HER, "").trim().replace(/^./, (c) => c.toUpperCase());

const riskOf = (line) => (/secur|payment|delete|migration|auth|schema|refactor/i.test(line) ? "med" : "low");

// Seats already carrying something that has not finished. Everyone is "idle"
// until the loop actually starts them, so without this she names the same
// specialist for every job she hands out and three of them sit in one queue.
const busySeats = () =>
  new Set(state.tasks
    .filter((t) => t.assignedTo && (t.status === "queued" || t.status === "claimed" || t.status === "running"))
    .map((t) => t.assignedTo));

// Give a step to a real seat. This is the seat that will actually run it, not a
// guess: the task carries the id and the loop honours it.
function seatFor(deptKey, risk, taken) {
  const free = (a) => a && !taken.has(a.id);
  const first = bestFor(deptKey, risk);
  if (free(first)) return first;
  // The best of them is already holding something, so go down the bench: fewest
  // jobs done first, which is also how all thousand of them get a turn.
  return state.agents
    .filter((a) => a.dept === deptKey && a.rank === "worker" && a.status === "idle" && free(a))
    .sort((a, b) => (a.card?.runs || 0) - (b.card?.runs || 0) || proficiency(b) - proficiency(a))[0]
    || state.agents.find((a) => a.dept === deptKey && a.rank !== "head" && free(a))
    || first;
}

export function assignWork(text, { dept: forced } = {}) {
  const asked = clean(text);
  const rows = [];
  const taken = busySeats();

  for (const line of steps(asked)) {
    const key = forced || pickDept(line) || "debug";
    const dept = deptByKey(key);
    if (!dept) continue;
    if (state.office.deptEnabled[key] === false) continue;

    const title = clean(line).slice(0, 120);
    const risk = riskOf(line);
    const seat = seatFor(key, risk, taken);
    if (seat) taken.add(seat.id);
    const task = addTask({
      dept: key,
      title,
      why: `Ayaan asked for this himself: "${asked.slice(0, 180)}"`,
      acceptance: "Ayaan asked for this. Use your judgement on what done means, and say plainly what you decided and why.",
      specialty: seat?.specialty || "",
      risk,
      fromAyaan: true,
      plannedBy: "AYAAN",
      assignedTo: seat?.id || null,
    });
    rows.push({
      n: rows.length + 1,
      step: title,
      dept: key,
      deptName: dept.name,
      kind: dept.kind,
      agent: seat?.id || "",
      agentTitle: seat?.title || "",
      specialty: seat?.specialty || "",
      taskId: task.id,
    });
  }

  if (!rows.length) return null;

  // Anything that edits real code gets proved by somebody who did not write it.
  // That is the difference between handing out a job and solving a problem.
  const writes = rows.some((r) => r.kind === "code");
  if (writes && state.office.mode === "apply" && state.office.deptEnabled.qa !== false) {
    const seat = seatFor("qa", "low", taken);
    const title = `Prove it: ${rows[0].step}`.slice(0, 120);
    const task = addTask({
      dept: "qa",
      title,
      why: `${rows.map((r) => r.deptName).join(" and ")} ${rows.length === 1 ? "is" : "are"} changing this for Ayaan. Prove it works and stays working.`,
      acceptance: "A test in scripts/qa that fails if this breaks again, and the output of running it.",
      specialty: seat?.specialty || "regression capture",
      risk: "low",
      fromAyaan: true,
      plannedBy: "AYAAN",
      assignedTo: seat?.id || null,
      after: rows.map((r) => r.taskId),
    });
    rows.push({ n: rows.length + 1, step: title, dept: "qa", deptName: "Test Lab", kind: "code", agent: seat?.id || "", agentTitle: seat?.title || "", specialty: seat?.specialty || "", taskId: task.id, proof: true });
  }

  emit("office.assigned", {
    detail: `You gave the floor a job. ${rows.length} step${rows.length === 1 ? "" : "s"}: ${rows.map((r) => `${r.deptName} (${r.agent})`).join(", ")}`,
  });

  return { asked, rows, running: state.office.running };
}

// What she says out loud. The chart carries the detail; this is the two seconds
// of speech that goes with it, and it names names because he asked her to.
export function spokenPlan(plan) {
  const [first, ...rest] = plan.rows;
  const one = plan.rows.length === 1;
  const lead = one
    ? `Right. That's ${first.deptName}. I've given it to ${first.agent}, ${first.specialty}.`
    : `Right, I've split that into ${plan.rows.length}. ${first.deptName} take the first, that's ${first.agent}. ${rest.map((r) => `${r.deptName} ${r.proof ? "prove it" : "take the next"}, ${r.agent}`).join(". ")}.`;
  const tail = plan.running
    ? " They're on it. I'll tell you when the first one lands."
    : " It's all queued. The office is shut, so say open up and they start.";
  return lead + tail;
}
