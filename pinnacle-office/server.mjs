// The office building. A zero dependency http server that serves the floor
// plan and streams what every agent is doing, live.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { OFFICE_DIR, REPORTS_DIR, CONFIG } from "./config.mjs";
import { DEPARTMENTS, TOTAL_HEADCOUNT } from "./core/org.mjs";
import { state, bus, setOffice, recentEvents, listReports, emit } from "./core/store.mjs";
import { startOffice, stopOffice, writeBriefing } from "./core/chief.mjs";

const json = (res, body, code = 200) => {
  res.writeHead(code, { "content-type": "application/json", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
};

function snapshot() {
  const byDept = Object.fromEntries(
    DEPARTMENTS.map((d) => {
      const tasks = state.tasks.filter((t) => t.dept === d.key);
      const agents = state.agents.filter((a) => a.dept === d.key);
      return [d.key, {
        key: d.key,
        name: d.name,
        kind: d.kind,
        priority: d.priority,
        headcount: d.headcount,
        enabled: state.office.deptEnabled[d.key] !== false,
        working: agents.filter((a) => a.status === "working").map((a) => ({ id: a.id, title: a.title, task: a.task || "" })),
        queued: tasks.filter((t) => t.status === "queued").length,
        done: tasks.filter((t) => t.status === "done").length,
        failed: tasks.filter((t) => t.status === "failed" || t.status === "reverted").length,
      }];
    })
  );

  return {
    office: state.office,
    headcount: TOTAL_HEADCOUNT,
    awake: state.agents.filter((a) => a.status === "working").length,
    departments: byDept,
    tasks: state.tasks.slice(-60).reverse(),
    reports: listReports(30),
    now: Date.now(),
  };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (url.pathname === "/") {
    const html = fs.readFileSync(path.join(OFFICE_DIR, "ui", "office.html"));
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(html);
  }

  if (url.pathname === "/api/state") return json(res, snapshot());

  if (url.pathname === "/api/events") return json(res, recentEvents(Number(url.searchParams.get("n") || 120)));

  if (url.pathname === "/api/agents") {
    const dept = url.searchParams.get("dept");
    return json(res, state.agents.filter((a) => !dept || a.dept === dept).map(({ id, rank, title, specialty, reportsTo, status, done, task }) => ({ id, rank, title, specialty, reportsTo, status, done, task })));
  }

  if (url.pathname === "/api/report") {
    const rel = (url.searchParams.get("path") || "").replace(/\\/g, "/");
    const target = path.resolve(REPORTS_DIR, rel);
    if (!target.startsWith(path.resolve(REPORTS_DIR)) || !fs.existsSync(target)) return json(res, { error: "not found" }, 404);
    return json(res, { path: rel, body: fs.readFileSync(target, "utf8") });
  }

  if (url.pathname === "/api/task") {
    const task = state.tasks.find((t) => t.id === url.searchParams.get("id"));
    return task ? json(res, task) : json(res, { error: "not found" }, 404);
  }

  // Server sent events. One connection per open dashboard, no polling.
  if (url.pathname === "/api/stream") {
    res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache", connection: "keep-alive" });
    res.write(`data: ${JSON.stringify({ type: "hello" })}\n\n`);
    const onEvent = (ev) => res.write(`data: ${JSON.stringify(ev)}\n\n`);
    bus.on("event", onEvent);
    const beat = setInterval(() => res.write(": beat\n\n"), 20000);
    req.on("close", () => { bus.off("event", onEvent); clearInterval(beat); });
    return;
  }

  if (url.pathname === "/api/control" && req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    let cmd = {};
    try { cmd = JSON.parse(body || "{}"); } catch {}

    switch (cmd.action) {
      case "start":
        startOffice();
        break;
      case "stop":
        stopOffice();
        emit("office.command", { detail: "Zainul stopped the office. Running agents finish their current task." });
        break;
      case "mode":
        setOffice({ mode: cmd.value === "propose" ? "propose" : "apply" });
        emit("office.command", { detail: `Mode set to ${state.office.mode}` });
        break;
      case "concurrency":
        setOffice({ concurrency: Math.max(1, Math.min(8, Number(cmd.value) || 1)) });
        emit("office.command", { detail: `Concurrency set to ${state.office.concurrency}` });
        break;
      case "dept":
        state.office.deptEnabled[cmd.value] = !state.office.deptEnabled[cmd.value];
        emit("office.command", { detail: `${cmd.value} ${state.office.deptEnabled[cmd.value] ? "reopened" : "closed"}` });
        break;
      case "brief":
        writeBriefing();
        break;
      case "clearCooldown":
        setOffice({ cooldownUntil: 0 });
        break;
      default:
        return json(res, { error: "unknown action" }, 400);
    }
    return json(res, { ok: true, office: state.office });
  }

  res.writeHead(404);
  res.end("not found");
});

export function serve() {
  server.listen(CONFIG.port, () => {
    console.log(`\n  Pinnacle Office is open at http://localhost:${CONFIG.port}\n`);
  });
}
