#!/usr/bin/env node
// Pinnacle. Zainul's chief of staff.
//
//   node pinnacle-office/pinnacle.mjs            open the office and start work
//   node pinnacle-office/pinnacle.mjs open       dashboard only, nobody working
//   node pinnacle-office/pinnacle.mjs once tutor one planning round, one task
//   node pinnacle-office/pinnacle.mjs brief      write a briefing now
//   node pinnacle-office/pinnacle.mjs roster     print the org chart

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { CONFIG, claudeBin } from "./config.mjs";
import { DEPARTMENTS, TOTAL_HEADCOUNT, buildRoster } from "./core/org.mjs";
import { state, setOffice, flush } from "./core/store.mjs";
import { startOffice, stopOffice, writeBriefing } from "./core/chief.mjs";
import { serve } from "./server.mjs";

const [cmd = "start", arg] = process.argv.slice(2);

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
    // Single supervised round, for checking the machine before letting it run.
    const dept = DEPARTMENTS.find((d) => d.key === arg);
    if (!dept) { console.error(`Unknown department. One of: ${DEPARTMENTS.map((d) => d.key).join(", ")}`); process.exit(1); }
    for (const d of DEPARTMENTS) state.office.deptEnabled[d.key] = d.key === dept.key;
    setOffice({ concurrency: 1 });
    serve();
    open();
    startOffice();
    break;
  }

  case "open":
    setOffice({ running: false });
    serve();
    open();
    break;

  default:
    serve();
    open();
    startOffice();
}

function open() {
  const url = `http://localhost:${CONFIG.port}`;
  const cmd = process.platform === "win32" ? ["cmd", ["/c", "start", "", url]] : process.platform === "darwin" ? ["open", [url]] : ["xdg-open", [url]];
  try { spawn(cmd[0], cmd[1], { detached: true, stdio: "ignore", windowsHide: true }).unref(); } catch {}
}

// Never leave the office in a half open state.
for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    console.log("\n  Closing the office. Agents finish their current task and state is saved.");
    stopOffice();
    setTimeout(() => process.exit(0), 500);
  });
}
