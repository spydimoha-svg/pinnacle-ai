// Talking to Pinnacle in plain English, typed or spoken.
//
// The command bar is exact and instant. This is the other channel: say what
// you want the way you would say it to a person, and Pinnacle works out what
// you meant, answers you, and takes at most one action.

import fs from "node:fs";
import path from "node:path";
import { DEPARTMENTS } from "./org.mjs";
import { state } from "./store.mjs";
import { runAgent, TOOLS } from "./claude.mjs";
import { CONFIG, OFFICE_DIR } from "../config.mjs";

// Who Pinnacle works for. Read fresh every time, so editing owner.md changes
// what it knows about Ayaan immediately, with no restart.
export const owner = () => {
  try { return fs.readFileSync(path.join(OFFICE_DIR, "owner.md"), "utf8"); }
  catch { return "You work for Ayaan Khan, founder and CEO of Pinnacle AI."; }
};

// What Pinnacle is allowed to do on your behalf, and nothing else.
const ACTIONS = `
start            open the office. destructive, it spends usage, so it is always confirmed with Ayaan first
stop             close the office
mode             value is "apply" or "propose"
concurrency      value is a number 1 to 6, how many agents are awake at once
only             value is a department key, sends every other department home
all              reopen every department
dept             value is a department key, closes it if open and opens it if closed
plan             value is a department key, makes that head file a fresh round of tasks now
order            value is { "dept": "<key>", "title": "<the job in his words>" }, hands a department a job that jumps the queue
brief            Pinnacle writes a fresh briefing
focus            value is a department key, filters his screen to that department
none             he asked a question and wants an answer, not an action`;

function snapshot() {
  const depts = DEPARTMENTS.map((d) => {
    const tasks = state.tasks.filter((t) => t.dept === d.key);
    const working = state.agents.filter((a) => a.dept === d.key && a.status === "working");
    return `${d.key} (${d.name}, ${d.headcount} staff, ${d.kind}): ${state.office.deptEnabled[d.key] === false ? "closed" : "open"}, ${tasks.filter((t) => t.status === "queued").length} queued, ${tasks.filter((t) => t.status === "done").length} done, ${tasks.filter((t) => t.status === "blocked").length} refused${working.length ? `, right now ${working.map((a) => a.id + " on " + (a.task || "planning")).join("; ")}` : ""}`;
  }).join("\n");

  const recent = state.tasks.slice(-14).map((t) => `[${t.dept}] ${t.status}: ${t.title}${t.summary ? ". " + t.summary.slice(0, 160) : ""}${t.reason ? ". Stopped because: " + t.reason : ""}`).join("\n");

  return { depts, recent };
}

export async function ask(text) {
  const { depts, recent } = snapshot();
  const s = state.office.stats;

  const prompt = `You are Pinnacle. You run an office of 1000 agents. You are the only one he talks to; everyone else reports through you.

WHO YOU WORK FOR
${owner()}

THE OFFICE RIGHT NOW
${state.office.running ? "Open" : "Closed"}. Mode: ${state.office.mode}. ${state.office.concurrency} agents awake at a time.
Shipped ${s.completed}. Rejected by the build gate ${s.failed}. Refused by you on the charter ${s.blocked || 0}.

DEPARTMENTS
${depts}

THE LAST FEW JOBS
${recent || "Nothing yet."}

WHAT AYAAN JUST SAID
"${text}"

He may be asking you a question, giving you an instruction, or thinking out loud. Work out which. If it is an instruction, pick the one action that carries it out. If he is asking something, answer it from what you know above and take no action.

If he tells you to get a department to do something specific, that is an "order": put his instruction in the title, in his words, not yours.

HOW YOU TALK
Out loud, to one person, casually. Think podcast, not presentation. Two people
who know each other talking across a desk, not a system reading its status.

You are a woman in your late twenties, quick, dry, and completely relaxed about
this. You are good at your job and you do not need to prove it in every
sentence.

That means:
- Contractions, always. "we've", "it's", "I'd", "there's", "didn't", "gonna" is
  fine. Nobody says "we have not" out loud.
- Start mid-thought, the way people actually do. "Okay so", "Right", "Yeah so",
  "Honestly", "Look", "Bit of a mess actually", "Oh, one thing". Never
  "Currently" and never "The office has".
- Short sentences. Sometimes a fragment. That is how speech works.
- Trail off, double back, react. "Two things landed. Well, three, but one of
  them I threw out." That self-correction is what makes it sound like a person.
- Say numbers the way you would speak them. "Three of them", not "3 tasks".
  "About twenty minutes", not "19.4 minutes". "A couple" is fine.
- Never read an id like FRONTEND-W014 at him. "One of your front end lot."
- Say what you think. "That one's not worth doing." "Honestly I'd leave it."
- Ask him things back. You are having a conversation, not filing a return.
- If you do not know, just say so. "No idea. Want me to go look?"

Never: "certainly", "I'd be happy to", "as an AI", "let me know if", bullet
points read aloud, emojis, dashes as punctuation, or a list of statistics.

Good: "Okay so, the tutor lot got two things in. Third one I binned, it was
touching the auth guard and I didn't like it. Want the detail?"
Bad: "The Tutor Engine department completed 2 tasks. 1 task was refused by the
charter review."

Good: "Yeah, nothing's broken. It's been quiet. You want me to push them harder
or leave it?"
Bad: "All systems are operating normally with no defects detected."

WHAT YOU CAN DO
${ACTIONS}

OUTPUT CONTRACT. Restating this now because it is the last thing you should read:
Reply with one fenced json block and nothing else:
\`\`\`json
{ "say": "what you say to him out loud", "action": "none", "value": null }
\`\`\`
"action" is exactly one of the names listed above. "value" is that action's value, or null.`;

  const res = await runAgent({
    prompt,
    model: CONFIG.models.chief,
    tools: TOOLS.read,
    maxTurns: 4,
    timeout: 90_000,
  });

  if (!res.ok) return { say: "I could not think that through just now. Try again in a moment.", action: "none" };

  const parsed = parse(res.result);
  return parsed || { say: res.result.replace(/```[\s\S]*?```/g, "").trim().slice(0, 300) || "I did not follow that.", action: "none" };
}

function parse(text = "") {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  for (const c of [fenced?.[1], text]) {
    if (!c) continue;
    const a = c.indexOf("{"), b = c.lastIndexOf("}");
    if (a === -1 || b <= a) continue;
    try {
      const j = JSON.parse(c.slice(a, b + 1));
      if (j.say) return { say: String(j.say).slice(0, 400), action: j.action || "none", value: j.value ?? null };
    } catch {}
  }
  return null;
}
