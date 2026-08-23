// Who owns what he just said, and which seat is doing it.
//
// Every job comes back as a plan with a real specialist named against every
// step, already filed. He never names a department: he says what he wants and
// this works out whose it is.
//
// It used to do that by matching keywords, on the argument that a model would
// take four seconds to do it worse. That argument was wrong, and measurably:
// against fourteen things he might actually say, none of which named a team,
// keywords got two right and sent six to the Defect Squad by default. Reading
// it gets twelve and explains each one. So it costs about five seconds now,
// and the keyword pass below is kept as the thing that catches it if the model
// is slow or unavailable, because work he asked for must never just vanish.

import { DEPARTMENTS, deptByKey } from "./org.mjs";
import { addTask, emit, state } from "./store.mjs";
import { bestFor, proficiency } from "./scorecard.mjs";
import { oneShot } from "./converse.mjs";
import { CONFIG } from "../config.mjs";

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

// ---------------------------------------------------------------- reading it

// Everything above is keyword matching, and keyword matching cannot do this
// job. Measured against fourteen things he might actually say, none of which
// named a team: it got two right. Six matched nothing at all and fell through
// to the Defect Squad. The ones it was confident about were confidently wrong,
// which is worse: "can we prove we are allowed to use NCERT text" went to
// Content instead of Legal, and "someone could read another student's data"
// went to the Test Lab instead of Security.
//
// He should not have to name a department. So she reads it instead, against the
// real org chart, and the keyword pass below is what catches her if she falls.

const CHART = () => DEPARTMENTS.map((d) =>
  `${d.key} (${d.name}, ${d.kind === "code" ? "writes code" : "writes advice only"}): ${d.mission.split(".")[0]}. Specialties: ${d.specialties.slice(0, 6).join(", ")}.`
).join("\n");

// The chart lives in the system prompt because it never changes. It used to be
// pasted into every question instead, which meant five thousand characters of
// org chart went down the wire on every job he handed out and each one took
// thirteen seconds. Sent once, the question itself is two lines.
const ROUTER = () => `You are the chief of staff for an engineering office of 1000 people. Ayaan describes something he wants in his own words. You decide which department owns it, and you never ask him which.

THE DEPARTMENTS
${CHART()}

Two rules decide most of it:
- What is WRONG beats what it is wrong WITH. "The lesson player keeps crashing" is the Defect Squad, not the Tutor Engine. "Someone could read another student's data" is Security, not Back End.
- What he is really asking for beats the nouns he used. "Can we prove we are allowed to use NCERT text" is a licensing question, so it is Legal, even though it says NCERT.

If one sentence genuinely holds two separate jobs, split it. Never split one job into pieces. Most of the time it is one job.

Every time, reply with one fenced json block and nothing else:
\`\`\`json
{ "jobs": [ { "step": "the job as an instruction, under 12 words, imperative", "dept": "one department key", "why": "six words on why that team" } ] }
\`\`\``;

// What the router line is, so the server can open it before he needs it.
// Never recycled. Retiring a line costs a ten to eighteen second boot on the
// next question, and this one has nothing to gain: its per turn prompt is one
// short sentence, so its context barely grows. Measured: turn 1 took 10.5s and
// turn 9, straight after a recycle, took 18.6s, while every warm turn between
// them was around 5.2s.
export const routerLine = () => ({ name: "router", model: CONFIG.models.router, system: ROUTER(), recycleAfter: Infinity });

// Her reading of it. Falls back to the keyword pass on any failure, so this can
// be slow, unavailable or wrong and work still gets filed.
export async function readTask(text) {
  const said = String(text).trim().slice(0, 600);

  try {
    // On its own held-open line, not hers, so routing questions never land in
    // the middle of a conversation she is having. Spawning a whole process for
    // this took 17 seconds a job, which is a long time to stand there after
    // asking for something.
    const answer = await oneShot({ ...routerLine(), prompt: `Ayaan said: "${said}"` });
    if (!answer) return null;
    const fenced = answer.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] || answer;
    const a = fenced.indexOf("{"), b = fenced.lastIndexOf("}");
    if (a === -1 || b <= a) return null;
    const parsed = JSON.parse(fenced.slice(a, b + 1));
    const valid = (parsed.jobs || [])
      .filter((j) => j?.step && deptByKey(j.dept))
      .map((j) => ({ step: String(j.step).slice(0, 120), dept: j.dept, why: String(j.why || "").slice(0, 80) }))
      .slice(0, 3);
    return valid.length ? valid : null;
  } catch {
    return null;
  }
}

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

export async function assignWork(text, { dept: forced } = {}) {
  const asked = clean(text);
  const rows = [];
  const taken = busySeats();

  // She reads it first. Only if that fails does it fall back to matching words,
  // which is what it used to do for everything and got right two times in
  // fourteen. If he named a department himself, that still wins over both.
  const read = forced ? null : await readTask(asked);
  const jobs = read || steps(asked).map((line) => ({ step: line, dept: forced || pickDept(line) || "debug", why: "" }));

  for (const job of jobs) {
    const key = forced || job.dept;
    const dept = deptByKey(key);
    if (!dept) continue;
    if (state.office.deptEnabled[key] === false) continue;

    const line = job.step;
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
      why: job.why || "",
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
  // The proof task is not one of the things he asked for, it is the office
  // checking its own work. Counting it made her say "I've split that into two"
  // at him every single time he asked for one thing, which reads as her having
  // misunderstood before she has even said who has it.
  const work = plan.rows.filter((r) => !r.proof);
  const proof = plan.rows.find((r) => r.proof);
  const [first, ...rest] = work;
  if (!first) return "Nothing in that I could hand to anyone.";

  const lead = rest.length
    ? `${work.length} things there. ${first.deptName} take the first, that's ${first.agent}. ${rest.map((r) => `${r.deptName} the next, ${r.agent}`).join(". ")}.`
    : `That's ${first.deptName}. ${first.agent} has it.`;
  const checked = proof ? ` Test Lab prove it after.` : "";
  const tail = plan.running ? " They're on it." : " It's queued. Say open up and they start.";
  return lead + checked + tail;
}
