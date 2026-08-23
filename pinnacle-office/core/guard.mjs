// The gate. No agent's work reaches the codebase without passing through here.
//
// Sequence for every code task: snapshot -> agent edits -> forbidden paths
// reverted -> typecheck -> build -> commit, or the whole change is thrown away.
// This is why 1000 autonomous agents cannot wreck the project.
//
// Every function here takes the directory it is to work in, defaulting to the
// project itself. That parameter is what lets several writers be gated at the
// same time: each one runs this whole sequence inside its own git worktree (see
// trees.mjs), so the diff, the typecheck, the build and the review all belong
// to exactly one agent even when three of them are working at once.

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { PROJECT_DIR, CONFIG } from "../config.mjs";
import { lendEnv } from "./trees.mjs";

// npm and npx are .cmd shims on Windows and need a shell. git is a real exe
// and must NOT get one: with shell:true its args are concatenated unescaped,
// which silently breaks any commit message containing a space.
const needsShell = (cmd) => process.platform === "win32" && /^(npm|npx|yarn|pnpm)$/.test(cmd);

// The office must never revert, stage or commit its own source. Without this
// exclusion an agent's rollback wipes uncommitted changes to the very code
// running the rollback, and then commits the deletion. Learned the hard way.
const SCOPE = ["--", ".", ":(exclude)pinnacle-office"];

// `out` is stdout alone and `all` is both streams. Which one a caller wants is
// not a detail: a build failure is only legible with stderr in it, while
// anything that parses git output one line per file must never see stderr. On
// Windows git warns about LF endings on stderr on almost every command, and
// folded together those warnings parse as filenames. That reached `git status
// --porcelain` here, where a warning became a file to revert.
function run(cmd, args, timeout = 300_000, cwd = PROJECT_DIR) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd,
      shell: needsShell(cmd),
      windowsHide: true,
      env: { ...process.env, NODE_NO_WARNINGS: "1" },
    });
    let out = "";
    let err = "";
    const timer = setTimeout(() => child.kill("SIGKILL"), timeout);
    child.stdout.on("data", (c) => (out += c));
    child.stderr.on("data", (c) => (err += c));
    child.on("close", (code) => { clearTimeout(timer); resolve({ code, out, err, all: out + err }); });
    child.on("error", (e) => { clearTimeout(timer); resolve({ code: 1, out: "", err: e.message, all: e.message }); });
  });
}

const gitIn = (dir, ...args) => run("git", args, 120_000, dir);
const git = (...args) => gitIn(PROJECT_DIR, ...args);

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

export async function changedFiles(dir = PROJECT_DIR) {
  const { out } = await gitIn(dir, "status", "--porcelain", ...SCOPE);
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
export async function revertAll(dir = PROJECT_DIR) {
  const changes = await changedFiles(dir);
  await gitIn(dir, "checkout", ...SCOPE);
  const gone = [];
  const survived = [];
  for (const c of changes) {
    const target = path.join(dir, c.file);
    if (c.code === "??") {
      try { fs.rmSync(target, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch {}
      if (fs.existsSync(target)) { survived.push(c.file); continue; }
    }
    gone.push(c.file);
  }
  return Object.assign(gone, { survived });
}

// Undo only the files an agent had no business touching, keep the rest.
export async function revertForbidden(dir = PROJECT_DIR) {
  const changes = await changedFiles(dir);
  const bad = changes.filter((c) => isForbidden(c.file));
  for (const c of bad) {
    if (c.code === "??") { try { fs.rmSync(path.join(dir, c.file), { force: true, recursive: true }); } catch {} }
    else await gitIn(dir, "checkout", "--", c.file);
  }
  return bad.map((c) => c.file);
}

// Typecheck then build. First failure wins and its tail is handed back to the
// agent's manager as the reason for rejection.
// The build reads .env, so gating inside a worktree without it would not be
// gating the same code the project builds. It is lent for the length of the
// build and taken back straight after. Safe by sequencing, not by trust: the
// agent's process has already exited by the time this runs, and it was denied
// .env at the permission layer while it was alive.
export async function verify(onStep = () => {}, dir = PROJECT_DIR) {
  const takeBack = dir === PROJECT_DIR ? () => {} : lendEnv(dir);
  try {
    for (const step of CONFIG.gate) {
      onStep(step.name);
      const { code, all } = await run(step.cmd, step.args, 420_000, dir);
      if (code !== 0) return { ok: false, step: step.name, detail: all.split("\n").filter(Boolean).slice(-14).join("\n") };
    }
    return { ok: true };
  } finally {
    takeBack();
  }
}

export async function commit(message, dir = PROJECT_DIR) {
  await gitIn(dir, "add", "-A", ...SCOPE);
  const res = await gitIn(dir, "commit", "-m", message);
  const head = await gitIn(dir, "rev-parse", "--short", "HEAD");
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
export async function diffText(limit = 26_000, dir = PROJECT_DIR) {
  const { out } = await gitIn(dir, "diff", ...SCOPE);
  let patch = out;

  for (const c of await changedFiles(dir)) {
    if (c.code !== "??") continue;
    for (const file of expand(c.file, dir)) {
      try {
        patch += `\n--- NEW FILE ${file} ---\n${fs.readFileSync(path.join(dir, file), "utf8")}\n`;
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
function expand(rel, dir = PROJECT_DIR) {
  const abs = path.join(dir, rel);
  try {
    if (!fs.statSync(abs).isDirectory()) return [rel];
    return fs.readdirSync(abs, { recursive: true, withFileTypes: true })
      .filter((e) => e.isFile())
      .map((e) => path.relative(dir, path.join(e.parentPath ?? e.path, e.name)).replace(/\\/g, "/"));
  } catch {
    return [rel];
  }
}
