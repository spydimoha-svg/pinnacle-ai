// Isolated working trees, one per code writer.
//
// The office used to allow exactly one agent to write code at a time, because
// two agents editing the same checkout makes the build gate meaningless: the
// diff Pinnacle reads is a mix of both, so neither change can be attributed and
// neither can be reverted cleanly. That is not a theory. Measured in this
// office's own logs before the lock existed: 764 overlapping pairs of code
// tasks, up to eight agents in one tree at once, and the whole accessibility
// department refused for scope creep on each other's diffs.
//
// The lock was the right fix for the wrong constraint. The constraint is one
// tree, not one writer. `git worktree` gives every writer its own full checkout
// sharing one object store, so N agents can edit, typecheck, build and be
// reviewed at the same time, each on a diff that is provably theirs alone.
//
// Only the last step is serialised: landing a finished commit on master. That
// takes milliseconds, against the eight to twelve minutes an agent takes, so in
// practice the writers really do run in parallel.

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { PROJECT_DIR, STATE_DIR, CONFIG } from "../config.mjs";
import { state } from "./store.mjs";
import { deptByKey } from "./org.mjs";

// Under state/, which is gitignored, so the trees never appear in the project's
// own `git status`. Also outside tsconfig's `include` (src, api) and outside
// anything vite walks, so a worktree cannot end up compiled into a build of the
// real project.
export const TREES_DIR = path.join(STATE_DIR, "trees");

const needsShell = (cmd) => process.platform === "win32" && /^(npm|npx|yarn|pnpm)$/.test(cmd);

// stdout and stderr are kept apart on purpose. Git writes advice to stderr even
// when it succeeds, and on Windows it does so constantly: every file with LF
// endings produces "warning: in the working copy of 'x', LF will be replaced by
// CRLF". Folding that into stdout means a line-per-file parse reads those
// warnings as filenames. Caught here by test: `git diff --name-only` after a
// failed merge reported a CRLF warning as a conflicting file.
function run(cmd, args, cwd, timeout = 120_000) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, shell: needsShell(cmd), windowsHide: true, env: { ...process.env, NODE_NO_WARNINGS: "1" } });
    let out = "";
    let err = "";
    const timer = setTimeout(() => child.kill("SIGKILL"), timeout);
    child.stdout.on("data", (c) => (out += c));
    child.stderr.on("data", (c) => (err += c));
    child.on("close", (code) => { clearTimeout(timer); resolve({ code, out, err, all: out + err }); });
    child.on("error", (e) => { clearTimeout(timer); resolve({ code: 1, out: "", err: e.message, all: e.message }); });
  });
}

// Git's own stdout, split into lines, with its chatter left out.
const lines = (res) => res.out.split("\n").map((l) => l.trim()).filter(Boolean);

const git = (cwd, ...args) => run("git", args, cwd);

// Every operation that mutates the MAIN repository runs one at a time: adding a
// worktree, parking Ayaan's edits, landing a commit. Git takes a lock on the
// index and refuses concurrent writers, and a failed `git commit` here would be
// reported to an agent as its own change being rejected. The writers themselves
// are not serialised by this; only their few milliseconds of contact with the
// shared repo are.
let chain = Promise.resolve();
function exclusive(fn) {
  const next = chain.then(fn, fn);
  // Never let one caller's rejection poison the queue for everybody after it.
  chain = next.then(() => {}, () => {});
  return next;
}

// The pool. A worktree is expensive to create once (a full checkout) and nearly
// free to reuse, so slots are kept and reset between tasks rather than being
// built and destroyed per task.
const slots = [];

// The dashboard can raise this while the office runs, so the pool grows on
// demand rather than being sized once at boot.
const limit = () => Math.max(1, Number(state.office.writers || CONFIG.writerConcurrency) || 1);

export const inUse = () => slots.filter((s) => s.busy).length;
export const poolSize = () => slots.length;

// node_modules is 500 MB and gitignored, so it is never part of a checkout.
// Link it rather than copying: the gate runs `npm run build` in here and needs
// the real dependency tree. A junction on Windows because it needs no admin
// rights, a directory symlink everywhere else.
async function linkModules(dir) {
  const link = path.join(dir, "node_modules");
  const target = path.join(PROJECT_DIR, "node_modules");
  if (fs.existsSync(link)) return true;
  if (!fs.existsSync(target)) return false;
  if (process.platform === "win32") {
    // A junction, not a symlink: junctions need no administrator rights and no
    // developer mode, which a symlink to a directory does on Windows.
    const res = await run("cmd", ["/c", "mklink", "/J", link, target], PROJECT_DIR);
    return res.code === 0 || fs.existsSync(link);
  }
  try { fs.symlinkSync(target, link, "dir"); return true; } catch { return false; }
}

// Take the link back out. `git worktree remove` walks the tree it is deleting
// and will not finish while a junction to a 500 MB dependency tree is sitting
// in it, so this has to happen first. Caught by test: teardown reported success
// and left every worktree still registered.
//
// rmdir and not rm -r, deliberately. rmdir removes a junction without following
// it, and refuses outright to delete a real directory that has anything in it.
// So the worst case if this is ever pointed at the wrong path is that nothing
// happens, rather than the project's node_modules being deleted.
function unlinkModules(dir) {
  const link = path.join(dir, "node_modules");
  try {
    if (!fs.lstatSync(link).isSymbolicLink()) return false;
  } catch { return false; }
  try { fs.rmdirSync(link); return true; } catch {}
  try { fs.unlinkSync(link); return true; } catch {}
  return false;
}

// The build reads .env, so a worktree without it does not gate the same code
// the main tree would. It is copied in for the build and deleted straight
// after, never while an agent is alive: by the time verify() runs the agent's
// process has already exited. Agents are denied .env at the permission layer
// anyway, on both the project path and their own tree's path.
export function lendEnv(dir) {
  const names = [".env", ".env.local"];
  const lent = [];
  for (const name of names) {
    const from = path.join(PROJECT_DIR, name);
    const to = path.join(dir, name);
    if (!fs.existsSync(from) || fs.existsSync(to)) continue;
    try { fs.copyFileSync(from, to); lent.push(to); } catch {}
  }
  return () => { for (const f of lent) { try { fs.rmSync(f, { force: true }); } catch {} } };
}

// Bring a slot back to a clean checkout of whatever master is right now.
// `clean -fd` and not `-fdx`: -x deletes ignored files, which here means the
// node_modules link and every build cache, so the next task would have to
// relink and rebuild from cold.
async function reset(dir, head) {
  await git(dir, "reset", "--hard", head);
  await git(dir, "clean", "-fd");
  await git(dir, "checkout", "--detach", head);
}

// Park whatever is sitting uncommitted in the main tree. These are Ayaan's own
// edits, never an agent's, so they are committed and never reverted. Doing it
// here means a new writer starts from a checkout that includes his work in
// progress, and that landing a merge later cannot fail on a dirty tree.
// Is somebody editing the project itself right now? In this design nobody
// should be: writers work in their own trees and everyone else only reads. But
// "should be" is what this whole file exists to stop relying on.
//
// This guard was written after it went wrong. Running the new code while an
// older single-tree office was still live, parkMain twice committed an agent's
// half finished edit as "your own uncommitted edits", ungated and unreviewed —
// the exact failure the office already has a scar from, where 139 commits of
// agent code reached git wearing Ayaan's name. Uncommitted work in the project
// is only safe to assume is his if no agent can be making it.
function mainTreeWriterLive() {
  return state.tasks.some((t) => t.status === "running" && !t.tree && deptByKey(t.dept)?.kind === "code");
}

async function parkMain() {
  // Skipping is always safe. A worktree made from HEAD without his newest edits
  // just means an agent starts from committed code, and a merge that cannot
  // land on a dirty tree is reported as a collision and redone. Both are
  // recoverable. Committing somebody else's work in progress is not.
  if (mainTreeWriterLive()) return { parked: 0, skipped: true };

  const dirty = lines(await git(PROJECT_DIR, "status", "--porcelain", "--", ".", ":(exclude)pinnacle-office"));
  if (!dirty.length) return { parked: 0 };
  await git(PROJECT_DIR, "add", "-A", "--", ".", ":(exclude)pinnacle-office");
  await git(PROJECT_DIR, "commit", "-m", "wip: edits made outside the office, parked before an agent started");
  return { parked: dirty.length };
}

/**
 * Take a working tree for one code task. Blocks nothing: the caller has already
 * checked there is a free writer slot.
 * @returns {Promise<{id:string, dir:string, base:string, parked:number}|null>}
 */
export function acquire() {
  return exclusive(async () => {
    let slot = slots.find((s) => !s.busy);
    if (!slot) {
      if (slots.length >= limit()) return null;
      slot = { id: `w${slots.length}`, dir: path.join(TREES_DIR, `w${slots.length}`), busy: false, ready: false };
      slots.push(slot);
    }
    slot.busy = true;

    const { parked } = await parkMain();
    const head = (await git(PROJECT_DIR, "rev-parse", "HEAD")).out.trim();

    try {
      if (!slot.ready || !fs.existsSync(path.join(slot.dir, ".git"))) {
        fs.mkdirSync(TREES_DIR, { recursive: true });
        // A slot can exist on disk from a previous run of the office. Detach it
        // from git's registry first, or `worktree add` refuses the path.
        if (fs.existsSync(slot.dir)) {
          unlinkModules(slot.dir);
          await git(PROJECT_DIR, "worktree", "remove", "--force", slot.dir);
          try { fs.rmSync(slot.dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 }); } catch {}
        }
        await git(PROJECT_DIR, "worktree", "prune");
        const add = await git(PROJECT_DIR, "worktree", "add", "--detach", slot.dir, head);
        if (add.code !== 0) throw new Error(`could not create a working tree: ${add.all.trim().slice(-200)}`);
        slot.ready = true;
      } else {
        await reset(slot.dir, head);
      }

      if (!(await linkModules(slot.dir))) throw new Error("node_modules could not be linked into the working tree, so the build gate would fail for the wrong reason");

      return { id: slot.id, dir: slot.dir, base: head, parked };
    } catch (err) {
      slot.busy = false;
      slot.ready = false;
      throw err;
    }
  });
}

export function release(tree) {
  const slot = slots.find((s) => s.id === tree?.id);
  if (slot) slot.busy = false;
}

/**
 * Commit an accepted change inside its own tree, then land it on master.
 *
 * Serialised, and deliberately a merge rather than a copy of the files: two
 * writers that started from the same commit and touched the same lines must
 * collide loudly here rather than one silently overwriting the other. A
 * collision is reported, not resolved — the loser's work is thrown away and the
 * task goes back on the board, which is the same thing that happens when the
 * build fails.
 *
 * @returns {Promise<{ok:boolean, sha?:string, conflict?:boolean, reason?:string, files?:string[]}>}
 */
export function land(tree, message) {
  return exclusive(async () => {
    const scope = ["--", ".", ":(exclude)pinnacle-office"];

    await git(tree.dir, "add", "-A", ...scope);
    const made = await git(tree.dir, "commit", "-m", message);
    if (made.code !== 0) return { ok: false, reason: `nothing could be committed: ${made.all.trim().slice(-200)}` };
    const sha = (await git(tree.dir, "rev-parse", "HEAD")).out.trim();

    // Master may have moved while this agent worked. Park anything Ayaan typed
    // in the meantime so the merge has a clean tree to land on.
    await parkMain();

    const merge = await git(PROJECT_DIR, "merge", "--no-edit", sha);
    if (merge.code !== 0) {
      const conflicts = lines(await git(PROJECT_DIR, "diff", "--name-only", "--diff-filter=U"));
      await git(PROJECT_DIR, "merge", "--abort");
      return {
        ok: false,
        conflict: true,
        files: conflicts,
        reason: conflicts.length
          ? `another agent changed ${conflicts.slice(0, 4).join(", ")} while this one was working, and the two edits cannot both be kept`
          : `the change could not be landed: ${merge.all.trim().slice(-200)}`,
      };
    }

    const head = (await git(PROJECT_DIR, "rev-parse", "--short", "HEAD")).out.trim();
    return { ok: true, sha: head };
  });
}

// Give the disk back. Called when the office closes; the trees are a cache, so
// losing them costs one checkout each on the next open and nothing else.
export function teardown() {
  return exclusive(async () => {
    // Whatever this process created, plus anything a previous run of the office
    // left behind. The pool lives in memory, so after a restart it is empty and
    // iterating it alone would walk straight past trees that are still on disk
    // and still registered with git.
    let onDisk = [];
    try { onDisk = fs.readdirSync(TREES_DIR, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => ({ id: e.name, dir: path.join(TREES_DIR, e.name) })); } catch {}
    const all = [...slots, ...onDisk.filter((d) => !slots.some((s) => s.id === d.id))];

    const left = [];
    for (const slot of all) {
      unlinkModules(slot.dir);
      const res = await git(PROJECT_DIR, "worktree", "remove", "--force", slot.dir);
      // Never claim a tree is gone without looking. The first version of this
      // reported every slot removed while git still had all of them registered,
      // because the node_modules junction stopped the delete and the failure
      // was swallowed.
      if (res.code !== 0 || fs.existsSync(slot.dir)) left.push(slot.id);
      slot.ready = false;
      slot.busy = false;
    }
    await git(PROJECT_DIR, "worktree", "prune");
    return { removed: all.length - left.length, left };
  });
}
