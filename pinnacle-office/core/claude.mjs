// The engine. Every agent in this building is one headless Claude Code process.
//
// Two rules are enforced here and nowhere else:
//   1. Paid Anthropic credentials are stripped from the child environment, so
//      an agent physically cannot run on Ayaan's API key. Subscription only.
//   2. Nothing loads MCP servers or project settings. That cut the per call
//      system prompt from 57k tokens to 44k and startup from 50s to 2s.

import { spawn } from "node:child_process";
import { claudeBin, childEnv, PROJECT_DIR } from "../config.mjs";

const LEAN = ["--strict-mcp-config", "--mcp-config", '{"mcpServers":{}}', "--setting-sources", ""];

// The real lock on the front door. The git gate cannot protect files git does
// not track: .env is gitignored, so an agent writing to it would never show up
// in `git status` and would never be reverted. These denials stop the tool call
// itself, before anything reaches disk. Verified: an agent asked to read .env
// gets refused.
const SETTINGS = JSON.stringify({
  permissions: {
    deny: [
      "Read(./.env)", "Read(./.env.*)", "Edit(./.env)", "Edit(./.env.*)", "Write(./.env)", "Write(./.env.*)",
      "Read(./pinnacle-office/state/**)", "Edit(./pinnacle-office/**)", "Write(./pinnacle-office/**)",
      "Edit(./.git/**)", "Write(./.git/**)", "Edit(./node_modules/**)", "Write(./node_modules/**)",
      "Bash(git push:*)", "Bash(git commit:*)", "Bash(git reset:*)", "Bash(git checkout:*)",
      "Bash(npm publish:*)", "Bash(vercel:*)", "Bash(curl:*)", "Bash(rm:*)",
    ],
  },
});

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
 * @param {(ev:object)=>void} o.onEvent  live stream callback
 */
export function runAgent({ prompt, system, model = "sonnet", tools = TOOLS.read, canEdit = false, maxTurns = 40, timeout = 600_000, onEvent = () => {} }) {
  const args = [
    "-p",
    "--output-format", "stream-json",
    "--verbose",
    "--model", model,
    "--max-turns", String(maxTurns),
    "--allowedTools", tools.join(","),
    "--disallowedTools", "Task,KillShell",
    "--settings", SETTINGS,
    ...LEAN,
  ];
  if (system) args.push("--append-system-prompt", system);
  if (canEdit) args.push("--permission-mode", "acceptEdits");

  return new Promise((resolve) => {
    const child = spawn(claudeBin(), args, {
      cwd: PROJECT_DIR,
      env: childEnv(),
      windowsHide: true,
      stdio: ["pipe", "pipe", "pipe"],
    });

    let buffer = "";
    let stderr = "";
    let done = false;
    const out = { ok: false, result: "", cost: 0, turns: 0, sessionId: null, error: null, denials: [], tools: [] };

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
        out.cost = ev.total_cost_usd || 0;
        out.turns = ev.num_turns || 0;
        out.denials = ev.permission_denials || [];
        out.result = typeof ev.result === "string" ? ev.result : "";
        if (ev.is_error || ev.subtype !== "success") {
          finish({ ok: false, error: ev.api_error_status || ev.subtype || "agent error" });
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
  return /rate.?limit|429|usage limit|too many requests|overloaded|quota/i.test(String(error));
}
