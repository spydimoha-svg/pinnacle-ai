#!/usr/bin/env node
// Pinnacle. Ayaan's chief of staff.
//
//   node pinnacle-office/pinnacle.mjs            open the dashboard, nobody working
//   node pinnacle-office/pinnacle.mjs start      open it AND put everyone to work
//   node pinnacle-office/pinnacle.mjs once tutor one planning round, one task
//   node pinnacle-office/pinnacle.mjs brief      write a briefing now
//   node pinnacle-office/pinnacle.mjs roster     print the org chart

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { CONFIG, claudeBin } from "./config.mjs";
import { DEPARTMENTS, TOTAL_HEADCOUNT, buildRoster } from "./core/org.mjs";
import { state, setOffice, flush, bus } from "./core/store.mjs";
import { startOffice, stopOffice, writeBriefing, runOnce } from "./core/chief.mjs";
import { serve } from "./server.mjs";

// The default is deliberately not "start". It used to be, and adding a case
// with that name silently made the bare command put a thousand agents to work
// again, which is the one thing here that spends his money.
const [cmd = "dashboard", arg] = process.argv.slice(2);

if (!existsSync(claudeBin()) && claudeBin() !== "claude") {
  console.error("Claude Code binary not found. Set PINNACLE_CLAUDE_BIN to its full path.");
  process.exit(1);
}

if (process.env.ANTHROPIC_API_KEY) {
  console.log("  Note: an ANTHROPIC_API_KEY exists on this machine. Every agent is spawned without it,");
  console.log("  so the office runs on your Claude Code subscription and cannot bill that key.\n");
}

switch (cmd) {
  case "roster": {
    const roster = buildRoster();
    console.log(`\n  Pinnacle Office. ${TOTAL_HEADCOUNT} staff across ${DEPARTMENTS.length} departments.\n`);
    for (const d of DEPARTMENTS) {
      const mine = roster.filter((a) => a.dept === d.key);
      const managers = mine.filter((a) => a.rank === "manager").length;
      console.log(`  ${d.name.padEnd(18)} ${String(d.headcount).padStart(4)} staff   1 head, ${managers} managers, ${mine.length - managers - 1} specialists   ${d.kind}`);
    }
    console.log("");
    break;
  }

  case "brief":
    await writeBriefing();
    flush();
    process.exit(0);

  case "once": {
    // Single supervised round: one head plans, one specialist works, then stop.
    const dept = DEPARTMENTS.find((d) => d.key === arg);
    if (!dept) { console.error(`Unknown department. One of: ${DEPARTMENTS.map((d) => d.key).join(", ")}`); process.exit(1); }
    console.log(`  ${dept.name} is starting a supervised round.\n`);
    bus.on("event", (e) => {
      const detail = e.label || e.text || e.title || e.detail || e.summary || e.error || e.finding || "";
      if (e.type !== "agent.step" || e.kind === "tool") console.log(`  ${e.type.padEnd(14)} ${String(detail).slice(0, 110)}`);
    });
    const out = await runOnce(dept.key);
    const t = out.task;
    console.log("\n  Result: " + (t ? JSON.stringify({ status: t.status, summary: t.summary, changed: t.changed, sha: t.sha, reason: t.reason }, null, 2) : "no task was filed"));
    process.exit(0);
  }

  // Putting a thousand agents to work spends his subscription and lets them
  // edit real code, so it has to be asked for. It used to be what the bare
  // command did, which meant restarting the building to look at it started
  // billing him, and the running flag persists so the dashboard then claimed
  // work was happening after a crash when nothing was.
  case "start":
    serve();
    open();
    startOffice();
    break;

  default:
    setOffice({ running: false });
    serve();
    open();
}

// Edge, deliberately. It is the only browser on this machine that exposes
// Microsoft's free neural voices to a web page, which is the difference between
// Pinnacle sounding like a person and sounding like a station announcement.
// Chrome only offers the five old SAPI voices. Set PINNACLE_BROWSER=default to
// use whatever the system prefers instead.
function open() {
  const url = `http://localhost:${CONFIG.port}`;
  const useEdge = process.platform === "win32" && process.env.PINNACLE_BROWSER !== "default";
  const cmd = useEdge
    ? ["cmd", ["/c", "start", "", "msedge", url]]
    : process.platform === "win32" ? ["cmd", ["/c", "start", "", url]]
    : process.platform === "darwin" ? ["open", [url]]
    : ["xdg-open", [url]];

  const child = spawn(cmd[0], cmd[1], { detached: true, stdio: "ignore", windowsHide: true });
  // spawn reports a missing binary asynchronously, so a try/catch here would
  // never see it. If Edge is not there, fall back rather than open nothing.
  child.on("error", () => {
    if (!useEdge) return console.error(`  Could not open a browser. Go to ${url}`);
    spawn("cmd", ["/c", "start", "", url], { detached: true, stdio: "ignore", windowsHide: true }).unref();
  });
  child.unref();
}

// Never leave the office in a half open state.
for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    console.log("\n  Closing the office. Agents finish their current task and state is saved.");
    stopOffice();
    setTimeout(() => process.exit(0), 500);
  });
}

// Nothing gets to die quietly. Without these, a rejected promise anywhere in
// the office either vanished or took the process down with a bare stack trace
// and no hint about what state was left behind.
process.on("unhandledRejection", (reason) => {
  console.error("\n  [office] something failed and nobody caught it:", reason?.stack || reason);
  console.error("  The office is still open. State was saved. This is a defect, not a normal failure.\n");
  try { flush(); } catch {}
});

process.on("uncaughtException", (err) => {
  console.error("\n  [office] fatal:", err?.stack || err);
  console.error("  Marking the office closed so the next start is clean.\n");
  try { stopOffice(); } catch {}
  setTimeout(() => process.exit(1), 300);
});
