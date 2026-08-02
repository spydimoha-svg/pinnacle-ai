// The office building. A zero dependency http server that serves the floor
// plan and streams what every agent is doing, live.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { OFFICE_DIR, REPORTS_DIR, CONFIG } from "./config.mjs";
import { DEPARTMENTS, TOTAL_HEADCOUNT } from "./core/org.mjs";
import { state, bus, setOffice, recentEvents, listReports, emit, setTask } from "./core/store.mjs";
import { startOffice, stopOffice, writeBriefing, forcePlan, orderTask } from "./core/chief.mjs";
import { ask } from "./core/talk.mjs";
import * as skills from "./core/skills.mjs";
import { proficiency, leaderboard, deptCard, dismiss, dismissBenched } from "./core/scorecard.mjs";
import { openRequests, readRequests, approve, decline } from "./core/supply.mjs";
import { publicSettings, say } from "./core/voice.mjs";

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
        blocked: tasks.filter((t) => t.status === "blocked").length,
        card: deptCard(d.key),
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
    supplyOpen: openRequests().length,
    now: Date.now(),
  };
}

// One throw in any route used to take the whole office down: the listener is
// async, so an exception became an unhandled rejection and Node exited. Every
// request now runs inside a boundary that answers with a 500 and keeps the
// building open.
const server = http.createServer((req, res) => {
  route(req, res).catch((err) => {
    emit("office.fault", { detail: `Request ${req.method} ${req.url} failed: ${err.message}` });
    console.error("[office] route threw", err);
    if (!res.headersSent) json(res, { error: "The office hit an internal error handling that request.", detail: String(err.message || err) }, 500);
    else res.end();
  });
});

async function route(req, res) {
  const url = new URL(req.url, "http://localhost");

  if (url.pathname === "/") {
    const html = fs.readFileSync(path.join(OFFICE_DIR, "ui", "office.html"));
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(html);
  }

  // The staff photographs. Served from disk rather than a CDN so the office
  // still works with the network off, and confined to one folder of jpegs so a
  // crafted path cannot walk out of it and read something else.
  if (url.pathname.startsWith("/faces/")) {
    const name = path.basename(url.pathname);
    if (!/^[a-z0-9_-]+\.jpg$/i.test(name)) return res.writeHead(404).end();
    try {
      const img = fs.readFileSync(path.join(OFFICE_DIR, "ui", "faces", name));
      res.writeHead(200, { "content-type": "image/jpeg", "cache-control": "public, max-age=86400" });
      return res.end(img);
    } catch { return res.writeHead(404).end(); }
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

  // The standard Pinnacle holds everyone to. Readable from the dashboard so
  // Ayaan can see exactly what is being enforced on his behalf.
  if (url.pathname === "/api/charter") {
    try { return json(res, { body: fs.readFileSync(path.join(OFFICE_DIR, "charter.md"), "utf8") }); }
    catch { return json(res, { error: "charter.md is missing" }, 404); }
  }

  // One agent, everything about it: its record, what it has learned, and every
  // job it has ever been given.
  if (url.pathname === "/api/agent") {
    const id = url.searchParams.get("id");
    const a = state.agents.find((x) => x.id === id);
    if (!a) return json(res, { error: "no such agent" }, 404);
    return json(res, {
      ...a,
      score: proficiency(a),
      skill: skills.read(a.dept, a.specialty),
      lessons: skills.lessons(a.dept, a.specialty).length,
      history: state.tasks.filter((t) => t.agent === id).slice(-25).reverse(),
    });
  }

  // The bench, best first.
  if (url.pathname === "/api/leaderboard") {
    return json(res, { top: leaderboard(Number(url.searchParams.get("n") || 12)), skills: skills.stats() });
  }

  // What the office has asked Ayaan to get for it.
  if (url.pathname === "/api/supply") return json(res, { requests: openRequests(), all: readRequests().slice(-40) });

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

  // Plain English, typed or spoken. Pinnacle answers and may act.
  // Which engine is doing her voice. The key itself never comes through here.
  if (url.pathname === "/api/voice") return json(res, publicSettings());

  // She speaks. If a paid engine is configured this returns real audio; if not
  // it returns 204 and the browser uses its own neural voices, which cost
  // nothing. Either way the key stays on this side of the wire.
  if (url.pathname === "/api/say" && req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    let asked = {};
    try { asked = JSON.parse(body || "{}"); } catch { return json(res, { error: "bad json" }, 400); }
    let audio = null;
    try {
      audio = await say(asked.text);
    } catch (err) {
      emit("office.fault", { detail: `Voice engine refused: ${err.message}` });
      return json(res, { error: err.message }, 502);
    }
    if (!audio) return res.writeHead(204).end();
    res.writeHead(200, { "content-type": "audio/mpeg", "cache-control": "no-store" });
    return res.end(audio);
  }

  if (url.pathname === "/api/ask" && req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    // This parse used to be unguarded. Because the request listener is async,
    // one malformed POST became an unhandled rejection and killed the whole
    // office, dashboard and all.
    let said = {};
    try { said = JSON.parse(body || "{}"); } catch { return json(res, { say: "That did not arrive as valid JSON." }, 400); }
    const text = String(said.text || "").slice(0, 600);
    if (!text.trim()) return json(res, { say: "I did not catch that." });
    emit("ceo.said", { text });
    const reply = await ask(text);
    emit("pinnacle.said", { text: reply.say, action: reply.action });
    return json(res, reply);
  }

  if (url.pathname === "/api/control" && req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    let cmd = {};
    try { cmd = JSON.parse(body || "{}"); } catch {}

    switch (cmd.action) {
      // Opening the office spends subscription usage and lets agents edit real
      // code, so it cannot be triggered by a stray click or a stale browser
      // tab. The caller has to say so on purpose.
      case "start":
        if (cmd.value !== "confirm") return json(res, { error: "start requires an explicit confirm" }, 400);
        startOffice();
        break;
      case "stop":
        stopOffice();
        emit("office.command", { detail: "Ayaan stopped the office. Running agents finish their current task." });
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
      case "only":
        for (const d of DEPARTMENTS) state.office.deptEnabled[d.key] = d.key === cmd.value;
        emit("office.command", { detail: `Everyone sent home except ${cmd.value}` });
        break;
      case "all":
        for (const d of DEPARTMENTS) state.office.deptEnabled[d.key] = true;
        emit("office.command", { detail: "All 20 departments open" });
        break;
      case "plan":
        forcePlan(cmd.value);
        emit("office.command", { detail: `${cmd.value} told to plan a new round now` });
        break;
      case "order": {
        const t = orderTask(cmd.value.dept, cmd.value.title);
        emit("office.command", { detail: `You gave ${cmd.value.dept} a job: ${cmd.value.title}` });
        return json(res, { ok: true, task: t });
      }
      case "retry": {
        const t = state.tasks.find((x) => x.id === cmd.value);
        if (t) { setTask(t.id, { status: "queued", reason: null, agent: null, fromAyaan: true }); emit("office.command", { detail: `Requeued: ${t.title}` }); }
        break;
      }
      case "cancel": {
        const t = state.tasks.find((x) => x.id === cmd.value);
        if (t && t.status === "queued") { setTask(t.id, { status: "cancelled" }); emit("office.command", { detail: `Dropped: ${t.title}` }); }
        break;
      }
      // Supply never installs. Ayaan runs the command, then tells the office
      // it now has the thing, or that it is not getting it.
      case "approveTool": {
        const r = approve(cmd.value);
        if (r) emit("supply.approved", { detail: `You approved ${r.what}. Every agent will be told the office has it.` });
        break;
      }
      case "declineTool": {
        const r = decline(cmd.value);
        if (r) emit("supply.declined", { detail: `You declined ${r.what}. Nobody will ask for it again.` });
        break;
      }
      // Dismiss a specialist and seat a fresh one the same second. The roster
      // stays at 1000 and the queue never stalls.
      case "dismiss": {
        const out = dismiss(cmd.value, cmd.reason);
        if (out?.error) return json(res, out, 400);
        if (out) emit("office.command", { detail: `Dismissed ${cmd.value}. A fresh specialist has the seat and work continues.` });
        return json(res, out || { error: "no such agent" }, out ? 200 : 404);
      }
      case "clearBench": {
        const out = dismissBenched(cmd.value || null);
        emit("office.command", {
          detail: out.length
            ? `Dismissed ${out.length} underperformer${out.length === 1 ? "" : "s"}. Fresh specialists are in those seats.`
            : "Nobody is below the floor.",
        });
        return json(res, { dismissed: out });
      }
      case "brief":
        writeBriefing();
        break;
      case "clearCooldown":
        setOffice({ cooldownUntil: 0 });
        emit("office.command", { detail: "Cooldown cleared, back to work" });
        break;
      default:
        return json(res, { error: "unknown action" }, 400);
    }
    return json(res, { ok: true, office: state.office });
  }

  res.writeHead(404);
  res.end("not found");
}

export function serve() {
  // A port already in use is the one startup failure worth explaining, since
  // the usual cause is an office that is already open in another window.
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`\n  Port ${CONFIG.port} is already taken. The office may already be open at http://localhost:${CONFIG.port}`);
      console.error(`  Close that one, or start this on another port: PINNACLE_PORT=4271 npm run office\n`);
    } else {
      console.error("\n  The office could not open:", err.message, "\n");
    }
    process.exit(1);
  });
  server.listen(CONFIG.port, () => {
    console.log(`\n  Pinnacle Office is open at http://localhost:${CONFIG.port}\n`);
  });
}
