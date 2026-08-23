// The engine. Every agent in this building is one headless Claude Code process.
//
// Two rules are enforced here and nowhere else:
//   1. Paid Anthropic credentials are stripped from the child environment, so
//      an agent physically cannot run on Ayaan's API key. Subscription only.
//   2. Nothing loads MCP servers or project settings. That cut the per call
//      system prompt from 57k tokens to 44k and startup from 50s to 2s.

import { spawn } from "node:child_process";
import { CONFIG, claudeBin, childEnv, browserBin, PROJECT_DIR } from "../config.mjs";

// No MCP and no project settings by default. Verified on this machine: the
// plugin and claude.ai servers never finish connecting inside a headless run,
// so leaving them on buys nothing and costs startup. Anything an agent is
// genuinely meant to reach is named explicitly below instead.
const noMcp = '{"mcpServers":{}}';

const mcpFor = (browser) => {
  const bin = browser && browserBin();
  if (!bin) return noMcp;
  return JSON.stringify({
    mcpServers: {
      // --isolated gives each agent its own profile. Without it two agents
      // fight over one Chrome profile lock. Verified: three at once, all fine.
      "chrome-devtools": { command: "node", args: [bin, "--headless", "--isolated", "--viewport", "1280x800"] },
    },
  });
};

// The flags that decide what every agent pays before it does any work.
//
// --exclude-dynamic-system-prompt-sections is the expensive one, and it is not
// obvious why. Claude Code puts the working directory, the environment and the
// current git status into the system prompt. Git status changes every time an
// agent commits, which in this office is constantly, so every agent saw a
// slightly different system prompt, missed the cache, and paid to write its own
// copy. The flag moves those sections into the first user message instead, so
// the system prompt is byte identical across all thousand of them and they
// share one cached copy.
//
// Measured here, two identical runs back to back, second run:
//   without: 10,608 cache writes, 33,058 cache reads
//   with:     5,254 cache writes, 38,151 cache reads
// Cache writes cost roughly twelve times a cache read, so that is about a third
// off the floor cost of every agent, forever, for one flag.
//
// --disable-slash-commands drops Claude Code's own bundled skills from the
// prompt. It does not touch this office's skills, which are markdown files in
// skills/ that get injected into the brief by skills.mjs and have nothing to do
// with slash commands. No agent here has ever invoked one.
const lean = (browser) => [
  "--strict-mcp-config", "--mcp-config", mcpFor(browser),
  "--setting-sources", "",
  "--exclude-dynamic-system-prompt-sections",
  "--disable-slash-commands",
];

// The real lock on the front door. The git gate cannot protect files git does
// not track: .env is gitignored, so an agent writing to it would never show up
// in `git status` and would never be reverted. These denials stop the tool call
// itself, before anything reaches disk. Verified: an agent asked to read .env
// gets refused.
// Absolute, not relative. These used to be written "Read(./.env)", which
// resolves against the working directory, so they held only because the working
// directory happened to be the project. Point an agent anywhere else and the
// same rules protect nothing: reproduced in a controlled run where an agent
// with cwd moved read this project's live 44 line .env, wrote into the office's
// own source, and wrote outside both, with zero permission denials.
//
// Absolute rules were then tested the same way and hold: forward slashes, a
// space in the path and a glob suffix are all fine. Worth knowing for later: a
// deny rule beats an allow rule, so there is no way to build an allow-list jail
// that permits one directory. Naming what is forbidden is the only primitive.
// Written against a named root rather than against the project, because an
// agent no longer always works in the project. Code writers each get their own
// git worktree so several can be gated at once, and a rule naming only the
// project would leave that tree — which holds a full checkout of this office's
// own source — completely unprotected.
//
// Both roots are always named: the tree the agent is standing in, and the real
// project, which it must not reach into from anywhere.
const rulesFor = (root) => {
  const r = root.replace(/\\/g, "/");
  return [
    `${r}/.env`, `${r}/.env.*`,
    `Read(${r}/.env)`, `Read(${r}/.env.*)`,
    `Edit(${r}/.env)`, `Edit(${r}/.env.*)`, `Write(${r}/.env)`, `Write(${r}/.env.*)`,
    `Read(${r}/pinnacle-office/state/**)`, `Edit(${r}/pinnacle-office/**)`, `Write(${r}/pinnacle-office/**)`,
    `Edit(${r}/.git/**)`, `Write(${r}/.git/**)`, `Edit(${r}/node_modules/**)`, `Write(${r}/node_modules/**)`,
  ];
};

const settingsFor = (root = PROJECT_DIR) => JSON.stringify({
  permissions: {
    deny: [
      "Read(./.env)", "Read(./.env.*)", "Edit(./.env)", "Edit(./.env.*)", "Write(./.env)", "Write(./.env.*)",
      ...rulesFor(PROJECT_DIR),
      ...(root === PROJECT_DIR ? [] : rulesFor(root)),
      "Read(./pinnacle-office/state/**)", "Edit(./pinnacle-office/**)", "Write(./pinnacle-office/**)",
      "Edit(./.git/**)", "Write(./.git/**)", "Edit(./node_modules/**)", "Write(./node_modules/**)",
      "Bash(git push:*)", "Bash(git commit:*)", "Bash(git reset:*)", "Bash(git checkout:*)",
      "Bash(npm publish:*)", "Bash(vercel:*)", "Bash(curl:*)", "Bash(rm:*)",

      // gh. Agents get a tight read-only list of it (TOOLS.github below); these
      // are the ways round that list, and every one of them was found rather
      // than guessed.
      //
      // `gh api` cannot be made read-only by prefix rules and is refused
      // outright: it switches to POST the moment any -f field is present, with
      // no method flag to match on, flags may appear after the path where a
      // prefix rule cannot see them, and `gh api graphql -f query='mutation{}'`
      // performs any mutation the API exposes under one allowed prefix.
      "Bash(gh api:*)",
      // Each of these plants something that runs LATER under a different name,
      // so the permission layer never sees the payload.
      "Bash(gh alias:*)", "Bash(gh extension:*)", "Bash(gh ext:*)",
      // A remote shell and a file copy off this machine.
      "Bash(gh codespace:*)", "Bash(gh cs:*)",
      // The token itself, and everything that writes.
      "Bash(gh auth:*)", "Bash(gh config:*)", "Bash(gh secret:*)", "Bash(gh ssh-key:*)",
      "Bash(gh gist:*)", "Bash(gh repo delete:*)", "Bash(gh repo create:*)", "Bash(gh repo fork:*)",
      "Bash(gh pr merge:*)", "Bash(gh pr create:*)", "Bash(gh pr close:*)", "Bash(gh pr edit:*)",
      "Bash(gh issue create:*)", "Bash(gh issue close:*)", "Bash(gh issue edit:*)", "Bash(gh issue delete:*)",
      "Bash(gh release create:*)", "Bash(gh release delete:*)", "Bash(gh release upload:*)",
      "Bash(gh workflow run:*)", "Bash(gh workflow enable:*)", "Bash(gh workflow disable:*)",
      "Bash(gh run rerun:*)", "Bash(gh run cancel:*)", "Bash(gh run delete:*)", "Bash(gh run download:*)",
      "Bash(gh cache delete:*)", "Bash(gh label create:*)", "Bash(gh label delete:*)",
    ],
  },
});

// One string per root, built once. There are only ever a handful of roots: the
// project and one per writer slot.
const settingsCache = new Map();
const settings = (root) => {
  if (!settingsCache.has(root)) settingsCache.set(root, settingsFor(root));
  return settingsCache.get(root);
};

// Tool sets. Anything not listed is denied, because a headless session cannot
// answer a permission prompt and therefore refuses by default.
export const TOOLS = {
  read: ["Read", "Grep", "Glob"],
  write: ["Read", "Grep", "Glob", "Edit", "Write", "NotebookEdit"],
  build: ["Bash(npm run build)", "Bash(npx tsc:*)", "Bash(node scripts:*)", "Bash(git diff:*)", "Bash(git status:*)"],
  // Research. Every department gets this: an agent that cannot look anything up
  // is guessing, and a guess about the CBSE syllabus or the DPDP Act is worse
  // than no answer.
  research: ["WebSearch", "WebFetch"],
  // Procurement only. Read-only inspection of what is installed and available,
  // so Supply can answer "can we use this" without installing anything.
  survey: ["Bash(npm view:*)", "Bash(npm ls:*)", "Bash(npx --version)", "Bash(where:*)", "Bash(claude mcp list)", "Bash(gh --version)", "Bash(node --version)", "Bash(python --version)"],

  // GitHub, read only. Every entry is allowed at noun AND verb, never at the
  // bare noun: `Bash(gh run:*)` would quietly also permit `gh run delete`, and
  // `Bash(gh pr:*)` would permit `gh pr merge`. `gh auth status` is written
  // without `:*` on purpose, because that is an exact match and it is the only
  // way to allow it while still refusing `gh auth status --show-token`.
  //
  // Worth knowing: gh is signed in from its own config file whether or not it
  // is handed a token, so this list, not the token's scopes, is what actually
  // holds an agent to reading.
  github: [
    "Bash(gh --version)", "Bash(gh auth status)",
    "Bash(gh search repos:*)", "Bash(gh search code:*)", "Bash(gh search issues:*)",
    "Bash(gh search prs:*)", "Bash(gh search commits:*)",
    "Bash(gh repo view:*)", "Bash(gh repo list:*)",
    "Bash(gh issue list:*)", "Bash(gh issue view:*)",
    "Bash(gh pr list:*)", "Bash(gh pr view:*)", "Bash(gh pr diff:*)", "Bash(gh pr checks:*)",
    "Bash(gh release list:*)", "Bash(gh release view:*)",
    "Bash(gh run list:*)", "Bash(gh run view:*)",
    "Bash(gh workflow list:*)", "Bash(gh workflow view:*)",
    "Bash(gh label list:*)", "Bash(gh cache list:*)",
  ],

  // Reading a document he has given them. One command, and it can only read a
  // file and print it: no network, no environment, no subprocess, no writing.
  // Two supply requests were open asking for exactly this and agents were stuck
  // on a government PDF they had been handed and could not open.
  // The last two are there because the first thing an agent does with a command
  // it has been told about is check the command exists. With only the first
  // pattern allowed, `command -v readdoc` was refused, and the agent concluded
  // it had no such tool and stopped. Verified: that is exactly what happened.
  docs: ["Bash(readdoc:*)", "Bash(command -v readdoc)", "Bash(which readdoc)"],

  // A real browser on the real GPU. Verified: WebGL2 through ANGLE on Direct3D11
  // on this machine's Intel Arc, not software rendering, so an agent changing
  // three.js or a shader can actually look at what it did.
  //
  // Costs about a second of startup, which is inside the noise, and about half
  // a gigabyte of memory, which is not. See browserFor() for who gets it.
  browser: [
    "mcp__chrome-devtools__new_page", "mcp__chrome-devtools__navigate_page", "mcp__chrome-devtools__close_page",
    "mcp__chrome-devtools__take_screenshot", "mcp__chrome-devtools__take_snapshot",
    "mcp__chrome-devtools__evaluate_script", "mcp__chrome-devtools__resize_page",
    "mcp__chrome-devtools__list_console_messages", "mcp__chrome-devtools__list_network_requests",
    "mcp__chrome-devtools__click", "mcp__chrome-devtools__fill", "mcp__chrome-devtools__wait_for",
  ],
};

/**
 * Run one agent to completion.
 * @param {object} o
 * @param {string} o.prompt        the brief
 * @param {string} o.system        appended to the system prompt
 * @param {string} o.model         sonnet | opus | haiku
 * @param {string[]} o.tools       allowed tool list
 * @param {boolean} o.canEdit      grants acceptEdits permission mode
 * @param {number} o.maxTurns
 * @param {number} o.timeout       ms before the process is killed
 * @param {number} o.tokenCap      hard ceiling on billable tokens; killed past it
 * @param {string} o.cwd           the tree this agent works in. Writers get their own
 * @param {(ev:object)=>void} o.onEvent  live stream callback
 */
export function runAgent({ prompt, system, model = "sonnet", tools = TOOLS.read, canEdit = false, browser = false, maxTurns = 40, timeout = 600_000, tokenCap = CONFIG.tokenCap.worker, cwd = PROJECT_DIR, onEvent = () => {} }) {
  const args = [
    "-p",
    "--output-format", "stream-json",
    "--verbose",
    "--model", model,
    "--max-turns", String(maxTurns),
    "--allowedTools", tools.join(","),
    "--disallowedTools", "Task,KillShell",
    "--settings", settings(cwd),
    ...lean(browser),
  ];
  if (system) args.push("--append-system-prompt", system);
  if (canEdit) args.push("--permission-mode", "acceptEdits");

  return new Promise((resolve) => {
    const child = spawn(claudeBin(), args, {
      cwd,
      env: childEnv(),
      windowsHide: true,
      stdio: ["pipe", "pipe", "pipe"],
    });

    let buffer = "";
    let stderr = "";
    let done = false;
    const out = { ok: false, result: "", cost: 0, turns: 0, sessionId: null, error: null, denials: [], tools: [], tokens: { in: 0, out: 0, cacheWrite: 0, cacheRead: 0, billable: 0 } };

    // What the cap counts, and what it deliberately does not.
    //
    // Cache reads are excluded. A warm agent re-reads the same context every
    // turn, so over fifty turns that number reaches millions while costing
    // roughly a tenth of fresh input per token. Counting it would kill
    // well-behaved agents for being warm, which is the opposite of the point.
    // It is still recorded, just not charged against the ceiling.
    //
    // What is counted is what the office actually generates and sends new:
    // output, fresh input, and the writes that build the cache.
    let warned = false;
    const charge = (u) => {
      if (!u) return;
      out.tokens.in += u.input_tokens || 0;
      out.tokens.out += u.output_tokens || 0;
      out.tokens.cacheWrite += u.cache_creation_input_tokens || 0;
      out.tokens.cacheRead += u.cache_read_input_tokens || 0;
      out.tokens.billable = out.tokens.in + out.tokens.out + out.tokens.cacheWrite;

      if (!warned && tokenCap && out.tokens.billable > tokenCap * 0.8) {
        warned = true;
        onEvent({ kind: "budget", label: `${Math.round(out.tokens.billable / 1000)}k of ${Math.round(tokenCap / 1000)}k tokens used` });
      }
      if (tokenCap && out.tokens.billable > tokenCap && !done) {
        child.kill("SIGKILL");
        finish({ ok: false, error: `token cap: used ${Math.round(out.tokens.billable / 1000)}k of ${Math.round(tokenCap / 1000)}k allowed` });
      }
    };

    const finish = (patch = {}) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve({ ...out, ...patch });
    };

    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      finish({ ok: false, error: `timeout after ${Math.round(timeout / 1000)}s` });
    }, timeout);

    child.stdout.on("data", (chunk) => {
      buffer += chunk;
      let nl;
      while ((nl = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line) continue;
        let ev;
        try { ev = JSON.parse(line); } catch { continue; }
        handle(ev);
      }
    });

    function handle(ev) {
      if (ev.type === "system" && ev.subtype === "init") out.sessionId = ev.session_id;

      if (ev.type === "assistant") {
        charge(ev.message?.usage);
        for (const block of ev.message?.content || []) {
          if (block.type === "tool_use") {
            const label = describeTool(block);
            out.tools.push(label);
            onEvent({ kind: "tool", label });
          } else if (block.type === "text" && block.text.trim()) {
            onEvent({ kind: "say", text: block.text.trim().slice(0, 400) });
          }
        }
      }

      if (ev.type === "result") {
        // The run's own final tally. Authoritative where the per turn events
        // disagree, because it counts what the CLI actually billed.
        if (ev.usage) {
          out.tokens.in = ev.usage.input_tokens ?? out.tokens.in;
          out.tokens.out = ev.usage.output_tokens ?? out.tokens.out;
          out.tokens.cacheWrite = ev.usage.cache_creation_input_tokens ?? out.tokens.cacheWrite;
          out.tokens.cacheRead = ev.usage.cache_read_input_tokens ?? out.tokens.cacheRead;
          out.tokens.billable = out.tokens.in + out.tokens.out + out.tokens.cacheWrite;
        }
        out.cost = ev.total_cost_usd || 0;
        out.turns = ev.num_turns || 0;
        out.denials = ev.permission_denials || [];
        out.result = typeof ev.result === "string" ? ev.result : "";
        if (ev.is_error || ev.subtype !== "success") {
          // A run can come back flagged as an error while its subtype still
          // says "success", and this used to hand that word straight through,
          // so a task sat on the board marked failed for the reason "success"
          // and whatever actually went wrong was never written down.
          const why = ev.api_error_status || (ev.subtype !== "success" && ev.subtype) || ev.error || (typeof ev.result === "string" && ev.result.slice(0, 160)) || "agent error";
          finish({ ok: false, error: String(why) });
        } else {
          finish({ ok: true });
        }
      }
    }

    child.stderr.on("data", (c) => { stderr += c; });

    child.on("error", (err) => finish({ ok: false, error: `spawn failed: ${err.message}` }));
    child.on("close", (code) => finish({ ok: false, error: out.error || stderr.trim().slice(-300) || `exited ${code}` }));

    child.stdin.write(prompt);
    child.stdin.end();
  });
}

function describeTool(block) {
  const i = block.input || {};
  const short = (p) => String(p || "").replace(/\\/g, "/").split("/").slice(-2).join("/");
  switch (block.name) {
    case "Read": return `read ${short(i.file_path)}`;
    case "Edit": return `edit ${short(i.file_path)}`;
    case "Write": return `write ${short(i.file_path)}`;
    case "Grep": return `search "${String(i.pattern || "").slice(0, 40)}"`;
    case "Glob": return `find ${i.pattern || ""}`;
    case "Bash": return `run ${String(i.command || "").slice(0, 50)}`;
    default: return block.name.toLowerCase();
  }
}

// A rate limit is the one failure the office must not fight. When we see one
// the whole building goes quiet for a while instead of retrying into the wall.
export function isRateLimited(error = "") {
  const e = String(error);
  // "429" used to match anywhere in the string, so a line number, a byte count
  // or a task id containing those three digits shut the whole office down for
  // ten minutes. It happened four times. It now has to look like a status code.
  return /rate.?limit|usage limit|too many requests|overloaded|quota/i.test(e) || /\b429\b/.test(e);
}
