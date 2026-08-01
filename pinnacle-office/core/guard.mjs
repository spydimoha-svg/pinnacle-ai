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

function run(cmd, args, timeout = 300_000) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd: PROJECT_DIR, shell: needsShell(cmd), windowsHide: true });
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
  const { out } = await git("status", "--porcelain");
  return out
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => ({ code: l.slice(0, 2).trim(), file: l.slice(2).trim().replace(/^"|"$/g, "") }));
}

const isForbidden = (file) => CONFIG.forbidden.some((f) => file.replace(/\\/g, "/").startsWith(f.replace(/\\/g, "/")));

// Throw away everything since the last commit. Tracked files are restored,
// files the agent invented are deleted.
export async function revertAll() {
  const changes = await changedFiles();
  await git("checkout", "--", ".");
  for (const c of changes) {
    if (c.code === "??") {
      const target = path.join(PROJECT_DIR, c.file);
      try { fs.rmSync(target, { recursive: true, force: true }); } catch {}
    }
  }
  return changes.map((c) => c.file);
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
  await git("add", "-A");
  const res = await git("commit", "-m", message);
  const head = await git("rev-parse", "--short", "HEAD");
  return { ok: res.code === 0, sha: head.out.trim() };
}

export async function diffStat() {
  const { out } = await git("diff", "--stat", "HEAD");
  return out.trim().split("\n").slice(-1)[0] || "";
}
