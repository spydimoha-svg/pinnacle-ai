// The gate. No agent's work reaches the codebase without passing through here.
//
// Sequence for every code task: snapshot -> agent edits -> forbidden paths
// reverted -> typecheck -> build -> commit, or the whole change is thrown away.
// This is why 1000 autonomous agents cannot wreck the project.

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { PROJECT_DIR, CONFIG } from "../config.mjs";

// npm and npx are .cmd shims on Windows and need a shell. git is a real exe
// and must NOT get one: with shell:true its args are concatenated unescaped,
// which silently breaks any commit message containing a space.
const needsShell = (cmd) => process.platform === "win32" && /^(npm|npx|yarn|pnpm)$/.test(cmd);

// The office must never revert, stage or commit its own source. Without this
// exclusion an agent's rollback wipes uncommitted changes to the very code
// running the rollback, and then commits the deletion. Learned the hard way.
const SCOPE = ["--", ".", ":(exclude)pinnacle-office"];

function run(cmd, args, timeout = 300_000) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd: PROJECT_DIR,
      shell: needsShell(cmd),
      windowsHide: true,
      env: { ...process.env, NODE_NO_WARNINGS: "1" },
    });
    let out = "";
    const timer = setTimeout(() => child.kill("SIGKILL"), timeout);
    child.stdout.on("data", (c) => (out += c));
    child.stderr.on("data", (c) => (out += c));
    child.on("close", (code) => { clearTimeout(timer); resolve({ code, out }); });
    child.on("error", (e) => { clearTimeout(timer); resolve({ code: 1, out: e.message }); });
  });
}

const git = (...args) => run("git", args, 120_000);

// The project sits inside a repo rooted at C:\ with no commits, which means
// there is no usable history here. Give the project its own repo so every
// agent change is a revertable commit.
export async function ensureRepo() {
  const top = await git("rev-parse", "--show-toplevel");
  const root = top.out.trim().replace(/\//g, path.sep).replace(/\\+$/, "");
  const here = PROJECT_DIR.replace(/\//g, path.sep);
  if (top.code === 0 && root.toLowerCase() === here.toLowerCase()) return { created: false };

  await git("init");
  await git("config", "user.name", "Pinnacle Office");
  await git("config", "user.email", "office@pinnacle.local");

  const ignore = path.join(PROJECT_DIR, ".gitignore");
  const current = fs.existsSync(ignore) ? fs.readFileSync(ignore, "utf8") : "";
  const need = ["pinnacle-office/state", "pinnacle-office/reports", "qa-reports"];
  const missing = need.filter((line) => !current.includes(line));
  if (missing.length) fs.writeFileSync(ignore, current.trimEnd() + "\n" + missing.join("\n") + "\n");

  await git("add", "-A");
  await git("commit", "-m", "Baseline before Pinnacle Office starts work");
  return { created: true };
}

export async function changedFiles() {
  const { out } = await git("status", "--porcelain", ...SCOPE);
  return out
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => ({ code: l.slice(0, 2).trim(), file: l.slice(2).trim().replace(/^"|"$/g, "") }));
}

const isForbidden = (file) => CONFIG.forbidden.some((f) => file.replace(/\\/g, "/").startsWith(f.replace(/\\/g, "/")));

// Throw away everything since the last commit. Tracked files are restored,
// files the agent invented are deleted.
//
// This used to report every file as reverted whether or not the delete worked.
// On Windows an open editor or a dev server holds a handle and rmSync throws
// EBUSY, so a rejected agent's build-breaking file survived while the office
// announced it had been thrown away. The next task then committed the survivor
// as "your own uncommitted edits" and every task after that failed the gate on
// somebody else's code. It now retries the lock, then tells the truth.
export async function revertAll() {
  const changes = await changedFiles();
  await git("checkout", ...SCOPE);
  const gone = [];
  const survived = [];
  for (const c of changes) {
    const target = path.join(PROJECT_DIR, c.file);
    if (c.code === "??") {
      try { fs.rmSync(target, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch {}
      if (fs.existsSync(target)) { survived.push(c.file); continue; }
    }
    gone.push(c.file);
  }
  return Object.assign(gone, { survived });
}

// Undo only the files an agent had no business touching, keep the rest.
export async function revertForbidden() {
  const changes = await changedFiles();
  const bad = changes.filter((c) => isForbidden(c.file));
  for (const c of bad) {
    if (c.code === "??") { try { fs.rmSync(path.join(PROJECT_DIR, c.file), { force: true, recursive: true }); } catch {} }
    else await git("checkout", "--", c.file);
  }
  return bad.map((c) => c.file);
}

// Typecheck then build. First failure wins and its tail is handed back to the
// agent's manager as the reason for rejection.
export async function verify(onStep = () => {}) {
  for (const step of CONFIG.gate) {
    onStep(step.name);
    const { code, out } = await run(step.cmd, step.args, 420_000);
    if (code !== 0) return { ok: false, step: step.name, detail: out.split("\n").filter(Boolean).slice(-14).join("\n") };
  }
  return { ok: true };
}

export async function commit(message) {
  await git("add", "-A", ...SCOPE);
  const res = await git("commit", "-m", message);
  const head = await git("rev-parse", "--short", "HEAD");
  return { ok: res.code === 0, sha: head.out.trim() };
}

export async function diffStat() {
  const { out } = await git("diff", "--stat", "HEAD");
  return out.trim().split("\n").slice(-1)[0] || "";
}

// The full patch an agent produced, for Pinnacle to review before it is
// allowed anywhere near a commit. Untracked files are appended in full,
// because a brand new file is exactly where something nasty would hide.
//
// The trap this used to fall into: `git status --porcelain` collapses a whole
// new directory into a single entry like `?? src/thing/`, and `git diff` never
// shows untracked paths at all. Reading that entry throws EISDIR, which was
// swallowed, so every file inside a new folder was missing from the patch.
// The pattern screen is a regex pass over this string and Pinnacle's review
// reads the same string, so both approved code neither of them had seen, and
// the office committed it saying "Cleared by Pinnacle". A new folder is the
// ordinary shape of new work in this tree, so this was not an edge case.
export async function diffText(limit = 26_000) {
  const { out } = await git("diff", ...SCOPE);
  let patch = out;

  for (const c of await changedFiles()) {
    if (c.code !== "??") continue;
    for (const file of expand(c.file)) {
      try {
        patch += `\n--- NEW FILE ${file} ---\n${fs.readFileSync(path.join(PROJECT_DIR, file), "utf8")}\n`;
      } catch (err) {
        // Never let an unreadable file vanish. Say so in the patch itself so
        // the reviewer is told to look rather than shown nothing.
        patch += `\n--- NEW FILE ${file} COULD NOT BE READ (${err.code || err.message}). REVIEW IT BY HAND BEFORE APPROVING ---\n`;
      }
    }
  }
  return patch.length > limit ? patch.slice(0, limit) + `\n... patch truncated at ${limit} characters. Anything past here is unreviewed ...` : patch;
}

// One porcelain entry can be a whole tree. Walk it into real files.
function expand(rel) {
  const abs = path.join(PROJECT_DIR, rel);
  try {
    if (!fs.statSync(abs).isDirectory()) return [rel];
    return fs.readdirSync(abs, { recursive: true, withFileTypes: true })
      .filter((e) => e.isFile())
      .map((e) => path.relative(PROJECT_DIR, path.join(e.parentPath ?? e.path, e.name)).replace(/\\/g, "/"));
  } catch {
    return [rel];
  }
}
