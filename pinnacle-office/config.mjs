// Pinnacle Office - global tunables.
//
// Everything the office does is driven from here. Change a number, restart,
// and the whole organisation behaves differently. No other file needs edits.

import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const OFFICE_DIR = path.dirname(fileURLToPath(import.meta.url));
export const PROJECT_DIR = path.resolve(OFFICE_DIR, "..");
export const STATE_DIR = path.join(OFFICE_DIR, "state");
export const REPORTS_DIR = path.join(OFFICE_DIR, "reports");

// Tools the office owns, kept outside the project so they are never part of a
// diff, never reverted by the gate, and never committed. Only `readdoc` lives
// here today: a python venv holding one pure-python library that turns a PDF
// into text. It was built rather than installed because all three ready made
// assistants that do this also wanted the microphone, the mouse, WhatsApp, the
// camera, or in one case a copy of his Anthropic key.
export const TOOLS_DIR = process.env.PINNACLE_TOOLS_DIR ||
  path.join(process.env.USERPROFILE || process.env.HOME || "", "pinnacle-tools", "docs");

const num = (key, fallback) => Number(process.env[key] ?? fallback);
const flag = (key, fallback) => (process.env[key] ?? String(fallback)) === "true";

// Locate the Claude Code binary. We never fall back to an API key: if this
// binary is missing the office refuses to start rather than silently billing.
export function claudeBin() {
  const candidates = [
    process.env.PINNACLE_CLAUDE_BIN,
    path.join(process.env.USERPROFILE || process.env.HOME || "", ".local/bin/claude.exe"),
    path.join(process.env.USERPROFILE || process.env.HOME || "", ".local/bin/claude"),
  ].filter(Boolean);
  return candidates.find((p) => existsSync(p)) || "claude";
}

export const CONFIG = {
  port: num("PINNACLE_PORT", 4270),

  // How many agents may be awake at once. Writers are serialised separately
  // (see below) because they all share one working tree.
  //
  // Ayaan wants all thousand working. All thousand are in the rotation and get
  // real jobs, but they cannot all hold a Claude process at the same instant:
  // each awake agent is a subprocess on his laptop, and a thousand of them
  // would take the machine down and hit the rate limit in seconds. This is how
  // many are genuinely awake at once. Everything read only (planning, analysis,
  // research) runs in parallel up to this; only code writers queue behind the
  // one working tree.
  // Was 8. Windows ran out of room: 19 head agents died with 0xC0000142, which
  // is a DLL failing to initialise because the machine could not give the
  // process what it needed, plus 5 more with 0x40010004. That is 24 failures
  // caused by nothing except asking for too many at once. This machine had
  // 1.9 GB free when it was measured and a browser agent takes half of that.
  // Raise it in the dashboard if you want, it is a live setting.
  //
  // Now 2, halved from 4 because Ayaan asked for half the agents and this is
  // the number that actually costs him. The thousand on the roster are free:
  // an agent asleep in a list is a name and a specialty, and it bills nothing.
  // Only an awake one holds a Claude process and spends tokens, so this line is
  // the whole bill. Two awake instead of four is half the burn per hour the
  // office is open, and it also removes the resource exhaustion that killed 24
  // agents outright at higher settings, which was the most wasteful failure of
  // all: full token cost, no work, reverted.
  //
  // What this does not do is make a single task cheaper. The same task costs
  // the same tokens whether it runs beside one other or three. This halves the
  // rate, not the price. The price is handled by style.md and maxTurns below.
  //
  // Now 4, because he asked for the office to take several jobs at once. Worth
  // being plain about the trade, since the 2 above was chosen to save him money:
  // this is roughly twice the burn per hour the office is open. It is not twice
  // the cost of the work, because the same queue is being drained either way,
  // just faster. What it does buy is the thing that was actually missing. His
  // own logs: 45.5 agent-hours spread over 87.9 wall-hours, an average of 0.52
  // agents working at any moment, because 15 of the 20 departments write code
  // and all of them were queued behind one writer.
  concurrency: num("PINNACLE_CONCURRENCY", 4),

  // How many agents may be writing code at the same time.
  //
  // This was 1 for a long time, and the reasoning behind it was sound but aimed
  // at the wrong thing. Two agents editing the SAME checkout makes the build
  // gate meaningless, because the diff Pinnacle reads is a mix of both and
  // neither can be attributed or reverted. That really happened here: 764
  // overlapping pairs of code tasks and up to eight agents in one tree.
  //
  // The constraint is one tree, not one writer. Each writer now gets its own
  // git worktree (core/trees.mjs), so its diff, its typecheck, its build and
  // its review are all provably its own. Only landing the finished commit on
  // master is serialised, and that takes milliseconds against an eight minute
  // task.
  //
  // What sets the ceiling now is the machine, not correctness. Each writer is a
  // Claude process plus, at gate time, its own `npm run build`. Three concurrent
  // builds is what this laptop takes without swapping. Never set this higher
  // than `concurrency`: a writer is also an awake agent, so the smaller of the
  // two always wins.
  writerConcurrency: num("PINNACLE_WRITERS", 3),

  // 'apply'   - code departments may edit files (gated by build + git revert)
  // 'propose' - nobody edits anything, every department writes reports only
  mode: process.env.PINNACLE_MODE || "apply",

  models: {
    head: process.env.PINNACLE_MODEL_HEAD || "sonnet",
    worker: process.env.PINNACLE_MODEL_WORKER || "sonnet",
    chief: process.env.PINNACLE_MODEL_CHIEF || "sonnet",
    // Works out which of the twenty departments owns what he just said. It is a
    // reading comprehension question against a list, which is what the small
    // model is good at, and it sits between him and his work being filed.
    router: process.env.PINNACLE_MODEL_ROUTER || "haiku",
  },

  // Wall clock ceilings, milliseconds.
  timeout: { head: num("PINNACLE_TIMEOUT_HEAD", 8 * 60_000), worker: num("PINNACLE_TIMEOUT_WORKER", 12 * 60_000) },

  // Worker was 80. In 663 tasks exactly one ever reached it, so at 80 this
  // ceiling was not catching anything: the 720s timeout fired first, 16 times,
  // and a timeout is the most expensive way to stop an agent because the work
  // is reverted and the whole twelve minutes of tokens buys nothing.
  //
  // The tail is the problem, not the median. Measured over 205 agents: 35 steps
  // at the median, 156 at p90, 484 at p99, and one agent that reached 2,911.
  // Nothing legitimate lives up there. 50 puts the ceiling where it binds on a
  // flailing agent before the clock does.
  //
  // The trade is real and worth knowing: a task that would genuinely have
  // finished on turn 60 now fails instead. Nothing in the log says those exist,
  // but the log cannot prove a negative. Raise it here if honest work starts
  // dying at the limit.
  maxTurns: { head: num("PINNACLE_TURNS_HEAD", 40), worker: num("PINNACLE_TURNS_WORKER", 50) },

  // A hard ceiling on what one agent may spend. Past it the process is killed
  // mid sentence. Not a request to the agent, not a line in the rule book an
  // agent could talk itself out of: the office counts the tokens as they stream
  // back and stops the run.
  //
  // Counts output, fresh input, and cache writes. Excludes cache reads, which
  // are re-reads of context the office already paid for at roughly a tenth the
  // price, and which a warm agent racks up by the million without costing much.
  //
  // These first numbers are estimates, and they are deliberately generous. The
  // office had no per task token record until now, so there was nothing to size
  // them from. Every finished task now writes its real usage into the event log
  // and the day's write up, so after one full day these can be set from what
  // actually happened rather than from a guess. Expect to lower them.
  //
  // The point is not to trim a normal task. It is that the agent that ran for
  // 2,911 steps cannot happen again.
  tokenCap: {
    worker: num("PINNACLE_TOKENS_WORKER", 350_000),
    head: num("PINNACLE_TOKENS_HEAD", 150_000),
    warden: num("PINNACLE_TOKENS_WARDEN", 100_000),
  },

  // Pinnacle's own review. Nothing an agent produces is accepted until this
  // has passed. Turning it off is not recommended and is why it defaults on.
  warden: {
    enabled: flag("PINNACLE_WARDEN", true),
    model: process.env.PINNACLE_MODEL_WARDEN || "sonnet",
    maxTurns: num("PINNACLE_WARDEN_TURNS", 8),
    timeout: num("PINNACLE_WARDEN_TIMEOUT", 5 * 60_000),
  },

  // Talking to her. Nothing to do with the office: this is the channel he uses
  // when he just wants to talk to someone.
  //
  // One Claude Code process, opened when he opens the page and held there for
  // the whole conversation. Spawning one per message is what made her slow:
  // measured across 23 real conversations in his own log, that was a median of
  // 8.9 seconds and never once under five. Held open, measured through the
  // server: 1.51s to her first word, 2.19s on a question worth thinking about.
  talk: {
    model: process.env.PINNACLE_TALK_MODEL || "opus",
    // Retire the held-open process after this many turns and start a fresh one
    // carrying the last few exchanges. Without it her first word arrives later
    // every turn, because the process re-sends the whole conversation each time.
    recycleAfter: num("PINNACLE_TALK_RECYCLE_AFTER", 8),
    // Longest she is allowed to leave him standing there before the line is
    // declared dead, killed, and reopened on the next thing he says.
    answerMs: num("PINNACLE_TALK_ANSWER_MS", 60_000),
    // Let go of a held-open process if he has walked away from the page.
    idleMs: num("PINNACLE_TALK_IDLE_MS", 20 * 60_000),
    // Last resort only, for when the subscription rate limits her. Free and
    // offline, because rule 2 says the fallback cannot be a paid API.
    ollama: process.env.PINNACLE_OLLAMA || "http://localhost:11434",
    localModel: process.env.PINNACLE_TALK_LOCAL_MODEL || "qwen2.5:3b-instruct",
  },

  // Tasks a department head is allowed to file per planning round.
  tasksPerPlan: num("PINNACLE_TASKS_PER_PLAN", 5),

  // Write an executive briefing after this many finished tasks.
  briefingEvery: num("PINNACLE_BRIEFING_EVERY", 8),

  // Rate limit backoff. When Claude says slow down, the whole office sleeps.
  cooldownMs: num("PINNACLE_COOLDOWN_MS", 10 * 60_000),

  // Pause between ticks when there is genuinely nothing runnable.
  //
  // Was 15s, and it was costing real time rather than protecting anything. The
  // loop only reaches this line when nothing can start, and the commonest
  // reason for that used to be "the one writer is busy and everything queued is
  // code" — so the office slept fifteen seconds at a time while holding a full
  // queue. With several writers that case is rarer, and when it does happen the
  // right answer is to look again shortly, not to nap.
  //
  // This is not a rate limit and never was. Nothing is spent by looking at a
  // queue. Real rate limiting is cooldownMs above, which is triggered by the
  // API actually saying so.
  tickIdleMs: num("PINNACLE_TICK_IDLE_MS", 3_000),

  // Commit each accepted change so every agent action is revertable.
  autoCommit: flag("PINNACLE_AUTOCOMMIT", true),

  // Paths no agent may ever touch, whatever it decides it needs.
  forbidden: [
    ".env",
    ".env.local",
    ".git/",
    "node_modules/",
    "pinnacle-office/state/",
    "pinnacle-office/core/",
    "pinnacle-office/config.mjs",
    ".vercel/",
  ],

  // Build gate. Every code change must survive this or it is reverted.
  // `npm run build` already runs `tsc --noEmit` first, so one step covers both.
  gate: [{ name: "build", cmd: "npm", args: ["run", "build"] }],
};

// The browser an agent drives when it needs to actually look at the site.
//
// It must be launched as `node <the built file>`, never through npx. Measured:
// npx takes 8.10s to answer `initialize` even warm, and a headless run does not
// wait for it, so the agent starts with no browser, does not know it has no
// browser, and confidently reports that the tool does not exist. Direct node
// answers in 1.79s and hands over 29 working tools.
export function browserBin() {
  const local = path.join(PROJECT_DIR, "node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js");
  if (existsSync(local)) return local;
  // Wherever npx last cached it. The hash in that path is not stable, so it is
  // found rather than hardcoded, and if it is gone the browser is simply not
  // offered instead of being offered and silently not working.
  const cache = path.join(process.env.LOCALAPPDATA || "", "npm-cache/_npx");
  try {
    for (const dir of readdirSync(cache)) {
      const p = path.join(cache, dir, "node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js");
      if (existsSync(p)) return p;
    }
  } catch {}
  return null;
}

// Env handed to every child. Anthropic paid credentials are stripped so the
// agents can only ever run on the Claude Code subscription.
export function childEnv() {
  const env = { ...process.env };
  delete env.ANTHROPIC_API_KEY;
  delete env.ANTHROPIC_AUTH_TOKEN;
  delete env.ANTHROPIC_BASE_URL;
  delete env.CLAUDE_CODE_USE_BEDROCK;
  delete env.CLAUDE_CODE_USE_VERTEX;

  // Every other credential on the machine, which used to be handed to all 1000
  // of them. Found by looking: VERCEL_TOKEN, sixty characters, deploys to
  // production. FIRECRAWL_API_KEY, which is a service that bills. A GitHub
  // token with write scope. None of the three is needed by any agent: gh signs
  // itself in from its own config, and deploying is Ayaan's decision made in
  // the server, not an agent's made in a subprocess.
  //
  // The pattern sweep is the point. Naming the three would protect against the
  // three that happen to be set today and nothing he adds tomorrow.
  for (const name of Object.keys(env)) {
    if (/(^|_)(TOKEN|SECRET|PASSWORD|CREDENTIALS?)$|_API_KEY$|^AWS_|^AZURE_|^GH_TOKEN$/i.test(name)) delete env[name];
  }

  // The office's own tools, on the path of its agents and nowhere else. Adding
  // this to his system PATH would have handed it to everything on the machine;
  // this way only agents the office starts can see it.
  //
  // Every spelling of it. Windows stores this as `Path`, and spreading
  // process.env keeps that spelling, so setting `PATH` created a second
  // variable the child ignored and the tool was invisible. The agent reported,
  // correctly and uselessly, that it had no such command.
  for (const name of Object.keys(env)) {
    if (name.toLowerCase() === "path") env[name] = `${TOOLS_DIR};${env[name]}`;
  }

  // gh runs whatever these hold. `gh --paginate` with a hostile GH_PAGER is the
  // oldest trick there is, so both are pinned to something that cannot execute.
  env.GH_PAGER = "cat";
  env.GH_BROWSER = "";
  env.GH_PROMPT_DISABLED = "1";
  env.GH_NO_UPDATE_NOTIFIER = "1";

  env.PINNACLE_CHILD = "1";
  return env;
}
