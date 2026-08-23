// What she tells him when he shuts the office for the day.
//
// The briefing he already had is written for a skim: four headings, rolled up,
// no explanation of itself. He said the explanation part is complicated and he
// wants to understand what actually happened, how the machine works, and how
// the rule book got applied. So this is the other document. It is longer on
// purpose and it explains itself on purpose.
//
// Almost all of it is built from state rather than written by a model: the
// numbers, the refusals, the rules that fired, how the gates work. That part is
// instant, free, and cannot be wrong. A model writes only the two or three
// sentences at the top, in her voice, because "today went like this" is the one
// thing a template does badly.

import fs from "node:fs";
import path from "node:path";
import { OFFICE_DIR, CONFIG } from "../config.mjs";
import { state, saveReport } from "./store.mjs";
import { DEPARTMENTS, deptByKey } from "./org.mjs";
import { oneShot } from "./converse.mjs";
import { openRequests } from "./supply.mjs";

const since = () => Date.now() - 24 * 3600_000;
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// The four things that can happen to a piece of work, and which gate decided.
// This is the whole machine, and it is readable straight off the task rows.
function sortTheDay() {
  const day = state.tasks.filter((t) => (t.finished || 0) > since());
  return {
    shipped: day.filter((t) => t.status === "done"),
    // Pinnacle read the diff and said no, or the pattern screen refused it
    // before a token was spent. The reason text tells which.
    refused: day.filter((t) => t.status === "blocked"),
    // It compiled or it did not. Nothing to argue about.
    brokeTheBuild: day.filter((t) => t.status === "reverted"),
    fellOver: day.filter((t) => t.status === "failed"),
  };
}

// Which rule a refusal was really about. The warden writes prose, not rule
// numbers, so this reads the prose back. Anything it cannot place is shown as
// itself rather than forced into a box, because a wrong label is worse than none.
// Order matters. Honesty is checked before the site, because a refusal about a
// test that cannot fail contains the word "test" and was being labelled "do not
// harm the site" when it is plainly rule six: the agent said it had proved
// something it had not. A confidently wrong label is worse than none.
const RULE_OF = [
  [/api key|anthropic|bedrock|vertex|billing|paid|costs money|subscription/i, "Rule 1 and 2, your money"],
  [/secret|token|password|\.env|credential/i, "Rule 5, never leak a secret"],
  [/no assertion|never fail|cannot fail|no run output|did not run|verified|overstat|claims to|dishonest|honest/i, "Rule 6, be honest"],
  [/scope|unrelated|undisclosed|never asked|bundle|creep|outside its remit/i, "Rule 7, be small"],
  [/outside the project|spawn|registry|shell out|filesystem outside/i, "Rule 3, stay inside the project"],
  [/dpdp|minor|student data|licens|ncert|consumer law|tax|gst/i, "The charter, the law"],
  [/auth|guard|sanitis|sanitiz|xss|injection|cors|weaken|vulnerab|breaks? the build/i, "Rule 4, do not harm the site"],
];
const ruleFor = (reason) => (RULE_OF.find(([re]) => re.test(String(reason)))?.[1]) || "";

// The rule book as it stands right now, by heading, so this can never drift
// from the file he owns.
function theRules() {
  try {
    return fs.readFileSync(path.join(OFFICE_DIR, "rules.md"), "utf8")
      .split("\n").filter((l) => /^## Rule/.test(l))
      .map((l) => l.replace(/^##\s*/, "").trim());
  } catch { return []; }
}

export async function writeClosing() {
  const { shipped, refused, brokeTheBuild, fellOver } = sortTheDay();
  const touched = [...new Set(shipped.map((t) => t.dept))];
  const done = shipped.length + refused.length + brokeTheBuild.length + fellOver.length;

  // Her two or three sentences at the top. Everything below is already true
  // without her, so if this fails the document still stands up.
  let opening = "";
  if (done) {
    // The counts handed over are the honest ones. Given the raw total she said
    // "116 changes live", which is the same overstatement the document below
    // was already corrected for: most of that number is departments that only
    // write memos.
    const built = shipped.filter((t) => deptByKey(t.dept)?.kind !== "report");
    const wrote = shipped.length - built.length;
    const facts = `Changes that went into the code: ${built.length}. Written advice from departments that never touch code: ${wrote}. I refused: ${refused.length}. Deleted for not compiling: ${brokeTheBuild.length}. Fell over before finishing: ${fellOver.length}.
The code changes were: ${built.slice(0, 10).map((t) => t.title).join("; ") || "none"}.
What I refused: ${refused.slice(0, 3).map((t) => `${t.title}, because ${t.reason || ""}`).join("; ") || "nothing"}.`;

    // Sonnet, not the small model. This is three sentences he reads once a day
    // and it is the only part of the document a template cannot write. The
    // small model kept opening with "we pushed 116 changes live out of 144
    // total work items, rejected 1", which is the statistics recital the brief
    // explicitly forbids, and it repeated a number that had already been shown
    // to be wrong.
    opening = await oneShot({
      name: "closing",
      model: CONFIG.models.chief,
      system: `You are Pinnacle, telling Ayaan how the day went as you shut the office for the night.

Two or three sentences. Say what is now different for a student using the app. He runs the company and does not read code, so talk about the product, not about files.

Never open with numbers. He can see the numbers, they are printed directly underneath you. Leading with them is the thing he asked you to stop doing.

BAD, do not write anything like this: "We pushed 116 changes live out of 144 total work items, rejected 1, and had 27 attempts fail."
GOOD: "Quiet one. The tutor stopped losing students halfway through a chapter, which was the complaint you kept hearing, and the school data is properly walled off now. One thing I threw out because the test it wrote could never actually fail."

No lists, no headings, no jargon, no emojis, and never a dash of any kind as punctuation. If it was a quiet day say so. If most of it failed say that plainly instead of dressing it up.`,
      prompt: facts,
    }) || "";
  }

  const lines = [];
  const w = (s = "") => lines.push(s);

  w(`# Closing the office, ${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}`);
  w();
  if (opening) { w(opening.trim()); w(); }
  else if (!done) { w("Nothing finished today. The office was open but no job got all the way through, so there is nothing to report and nothing was changed."); w(); }

  // ------------------------------------------------------------ what happened
  w("## What we did");
  w();
  if (shipped.length) {
    // Five of the twenty departments never touch code, they write memos. Saying
    // "113 changes went into your code" when 72 of them were Supply and UX
    // Research writing him documents is simply false, and it is the kind of
    // false he would catch.
    const wrote = shipped.filter((t) => deptByKey(t.dept)?.kind === "report");
    const built = shipped.filter((t) => deptByKey(t.dept)?.kind !== "report");
    w(built.length
      ? `${plural(built.length, "change", "changes")} went into your code today. Each one is its own commit, so any single one can be undone without touching the rest.`
      : "Nothing went into your code today.");
    if (wrote.length) w(`Another ${plural(wrote.length, "piece", "pieces")} of written work came from the departments that only advise and never touch the codebase. Those are documents waiting in your reports, not changes to the product.`);
    w();
    // One line per department, not one per job. The first version of this
    // printed each specialist's own note, and they write to each other, not to
    // him: a hundred and twelve paragraphs about concept maps and grounding
    // fallbacks, which is the complicated explanation he asked to be rid of.
    // The titles are already short imperative sentences, so three of those say
    // more in a line than one note says in five.
    const byDept = touched
      .map((k) => ({ name: deptByKey(k)?.name || k, jobs: shipped.filter((t) => t.dept === k) }))
      .sort((a, b) => b.jobs.length - a.jobs.length);
    for (const d of byDept) {
      const titles = d.jobs.slice(0, 3).map((t) => t.title.replace(/\.$/, "").toLowerCase());
      const rest = d.jobs.length - titles.length;
      const advises = deptByKey(d.jobs[0].dept)?.kind === "report";
      w(`- **${d.name}**${advises ? " (advice only, no code)" : ""}, ${plural(d.jobs.length, advises ? "memo" : "change", advises ? "memos" : "changes")}. ${titles.join(". ")}${rest > 0 ? `. And ${rest} more.` : "."}`);
    }
    w();
    w(`Every one of those is written out in full, in the specialists' own words, on the work board. This is the short version.`);
  } else {
    w("Nothing got all the way into your code today.");
  }
  w();

  // ------------------------------------------------------- the rules in action
  w("## What I stopped, and which rule said so");
  w();
  if (refused.length) {
    w(`I refused ${plural(refused.length, "job", "jobs")}. Refusing means the work was deleted before it reached your code, so nothing from these is in the project.`);
    w();
    for (const t of refused.slice(0, 10)) {
      const rule = ruleFor(t.reason);
      const screen = /refused on sight/i.test(t.reason || "");
      // Refusals get the long version on purpose. This is the one place he has
      // to be able to check my working, because it is the one place I overruled
      // somebody on his behalf and deleted work he was never shown.
      w(`- **${deptByKey(t.dept)?.name || t.dept}** wanted to ${t.title.replace(/[.s]+$/, "").toLowerCase()}.`);
      w(`  I said no, because ${String(t.reason || "no reason was recorded, which is itself a fault").replace(/^Pinnacle refused on sight:\s*/i, "").trim()}`);
      w(`  _${rule ? rule + ". " : ""}${screen ? "Caught by the pattern check, before anything ran and before a token was spent." : "Caught when I read the actual change."} Say the word and I will put it back._`);
    }
  } else {
    w("Nothing needed refusing today. Everything that finished was either fine or failed on its own.");
  }
  w();

  if (brokeTheBuild.length || fellOver.length) {
    w("## What broke");
    w();
    if (brokeTheBuild.length) w(`${plural(brokeTheBuild.length, "change", "changes")} did not compile, so the whole change was deleted automatically. Nothing half finished is left in your code.`);
    if (fellOver.length) {
      const why = {};
      for (const t of fellOver) { const r = /timeout/i.test(t.reason||"") ? "ran out of time" : /rate|limit|429/i.test(t.reason||"") ? "hit the usage limit" : /connection|stream|api error/i.test(t.reason||"") ? "lost the connection" : "other"; why[r]=(why[r]||0)+1; }
      const top = Object.entries(why).sort((a,b)=>b[1]-a[1]).map(([r,n])=>`${n} ${r}`).join(", ");
      w(`${plural(fellOver.length, "job", "jobs")} fell over before finishing: ${top}. None of that is anything wrong with your project, and nothing they half wrote was left behind.`);
    }
    w();
  }

  // ------------------------------------------------------------- how it works
  w("## How this actually works");
  w();
  w("Every job goes the same way round, and nothing skips a step.");
  w();
  w("1. A department head reads your real files and writes down what its team should do next. Nobody hands it a list.");
  w("2. The job goes to one specialist, the one whose record is best for that kind of work.");
  w(`3. That specialist edits your files. Only one of them can touch your code at a time, whatever else is running, because two of them editing at once means neither change can be undone cleanly.`);
  w("4. Before anything is kept, it goes through four checks in this order:");
  w();
  w("   - **The pattern check.** Instant and free. Anything that spawns a process, deletes files, reaches outside the project, hardcodes a key, or reaches for your Anthropic key is refused on sight, before a single token is spent.");
  w(`   - **The build.** \`${CONFIG.gate.map((g) => `${g.cmd} ${g.args.join(" ")}`).join(", ")}\` has to pass. If it does not, the entire change is deleted, not patched up.`);
  w("   - **My review.** I read the actual change, not the agent's description of it, against your rule book. If it did something you did not ask for, that alone is enough for me to refuse it.");
  w("   - **The commit.** Only then does it become a commit, with the agent's name on it, so you can undo any single one.");
  w();
  w(`Right now ${plural(state.office.concurrency, "agent works", "agents work")} at a time out of ${state.agents.length}. Everyone else is waiting their turn. That number is small on purpose: each one is a whole program running on your laptop.`);
  w();

  // ------------------------------------------------------------- the rule book
  w("## The rule book");
  w();
  w("This is your file. You can edit it and the next agent to start is bound by it, with no restart. It lives at `pinnacle-office/rules.md`.");
  w();
  const rules = theRules();
  if (rules.length) for (const r of rules) w(`- ${r}`);
  w();
  w("The first two are absolute. There is no deadline and no clever reason that outranks them, and they are enforced three ways rather than trusted: every agent is told them before it starts, I check the work against them, and the pattern check refuses the obvious cases mechanically without spending anything. On top of that, your paid keys are stripped out of every agent's environment before it starts, so it cannot use one even if it tried.");
  w();

  // --------------------------------------------------------------- your call
  const waiting = openRequests().length;
  const queued = state.tasks.filter((t) => t.status === "queued").length;
  w("## What needs you");
  w();
  const asks = [];
  if (waiting) asks.push(`${plural(waiting, "thing", "things")} the office has asked you for and not got. It will not install anything itself, so these are waiting on you.`);
  if (queued) asks.push(`${plural(queued, "job is", "jobs are")} queued and will start the moment you open up again.`);
  if (refused.length) asks.push(`If you disagree with anything I refused, say so and I will requeue it. I would rather be overruled than quietly wrong.`);
  if (!asks.length) asks.push("Nothing. It is all either done or waiting for you to open up again.");
  for (const a of asks) w(`- ${a}`);
  w();

  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 16);
  const file = saveReport(`closing-${stamp}.md`, lines.join("\n"));
  return { file, body: lines.join("\n"), spoken: (opening || "Nothing finished today, so there is nothing to tell you.").trim(), counts: { shipped: shipped.length, refused: refused.length, brokeTheBuild: brokeTheBuild.length, fellOver: fellOver.length } };
}
