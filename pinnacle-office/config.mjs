// Pinnacle Office - global tunables.
//
// Everything the office does is driven from here. Change a number, restart,
// and the whole organisation behaves differently. No other file needs edits.

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const OFFICE_DIR = path.dirname(fileURLToPath(import.meta.url));
export const PROJECT_DIR = path.resolve(OFFICE_DIR, "..");
export const STATE_DIR = path.join(OFFICE_DIR, "state");
export const REPORTS_DIR = path.join(OFFICE_DIR, "reports");

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
  concurrency: num("PINNACLE_CONCURRENCY", 3),

  // Only one agent may hold the codebase at a time. This is not a limitation
  // we can wish away: two agents editing the same tree makes the build gate
  // meaningless. Researchers, auditors and analysts run in parallel around it.
  writerConcurrency: 1,

  // 'apply'   - code departments may edit files (gated by build + git revert)
  // 'propose' - nobody edits anything, every department writes reports only
  mode: process.env.PINNACLE_MODE || "apply",

  models: {
    head: process.env.PINNACLE_MODEL_HEAD || "sonnet",
    worker: process.env.PINNACLE_MODEL_WORKER || "sonnet",
    chief: process.env.PINNACLE_MODEL_CHIEF || "sonnet",
  },

  // Wall clock ceilings, milliseconds.
  timeout: { head: num("PINNACLE_TIMEOUT_HEAD", 8 * 60_000), worker: num("PINNACLE_TIMEOUT_WORKER", 12 * 60_000) },

  maxTurns: { head: num("PINNACLE_TURNS_HEAD", 40), worker: num("PINNACLE_TURNS_WORKER", 80) },

  // Pinnacle's own review. Nothing an agent produces is accepted until this
  // has passed. Turning it off is not recommended and is why it defaults on.
  warden: {
    enabled: flag("PINNACLE_WARDEN", true),
    model: process.env.PINNACLE_MODEL_WARDEN || "sonnet",
    maxTurns: num("PINNACLE_WARDEN_TURNS", 8),
    timeout: num("PINNACLE_WARDEN_TIMEOUT", 5 * 60_000),
  },

  // Tasks a department head is allowed to file per planning round.
  tasksPerPlan: num("PINNACLE_TASKS_PER_PLAN", 5),

  // Write an executive briefing after this many finished tasks.
  briefingEvery: num("PINNACLE_BRIEFING_EVERY", 8),

  // Rate limit backoff. When Claude says slow down, the whole office sleeps.
  cooldownMs: num("PINNACLE_COOLDOWN_MS", 10 * 60_000),

  // Pause between ticks so the office does not hammer the account.
  tickIdleMs: num("PINNACLE_TICK_IDLE_MS", 15_000),

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

// Env handed to every child. Anthropic paid credentials are stripped so the
// agents can only ever run on the Claude Code subscription.
export function childEnv() {
  const env = { ...process.env };
  delete env.ANTHROPIC_API_KEY;
  delete env.ANTHROPIC_AUTH_TOKEN;
  delete env.ANTHROPIC_BASE_URL;
  delete env.CLAUDE_CODE_USE_BEDROCK;
  delete env.CLAUDE_CODE_USE_VERTEX;
  env.PINNACLE_CHILD = "1";
  return env;
}
