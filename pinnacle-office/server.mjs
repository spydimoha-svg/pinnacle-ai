// The office building. A zero dependency http server that serves the floor
// plan and streams what every agent is doing, live.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { OFFICE_DIR, REPORTS_DIR, CONFIG } from "./config.mjs";
import { DEPARTMENTS, TOTAL_HEADCOUNT } from "./core/org.mjs";
import { state, bus, setOffice, recentEvents, listReports, emit, setTask } from "./core/store.mjs";
import { startOffice, stopOffice, writeBriefing, forcePlan } from "./core/chief.mjs";
import { ask } from "./core/talk.mjs";
import * as skills from "./core/skills.mjs";
import { proficiency, leaderboard, deptCard, dismiss, dismissBenched } from "./core/scorecard.mjs";
import { openRequests, readRequests, approve, decline } from "./core/supply.mjs";
import { publicSettings, say } from "./core/voice.mjs";
import * as converse from "./core/converse.mjs";
import { assignWork, spokenPlan, routerLine } from "./core/plan.mjs";
import { mdHtml, artifactPage } from "./core/artifact.mjs";

// What she says the instant he finishes asking for something, while she works
// out whose job it is. Rotated so she does not say the same word every time.
const ACK = ["Right, on it.", "Yep, taking that.", "Got it.", "Okay, hang on."];

// What she filed in the last few minutes, so "never mind" can take it back.
const justFiled = [];

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
    // ?raw downloads the markdown itself, so a briefing is a file on his
    // machine rather than something trapped behind a dashboard.
    if (url.searchParams.get("raw")) {
      res.writeHead(200, {
        "content-type": "text/markdown; charset=utf-8",
        "content-disposition": `attachment; filename="${path.basename(target)}"`,
        "cache-control": "no-store",
      });
      return res.end(fs.readFileSync(target));
    }
    const body = fs.readFileSync(target, "utf8");
    const when = new Date(fs.statSync(target).mtimeMs).toLocaleString();
    // ?html is the document itself: a page he can open, keep, or print. The
    // office panel gets the same rendering from the json below, so the two can
    // never drift into disagreeing about the same file.
    if (url.searchParams.get("html")) {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
      return res.end(artifactPage({ title: path.basename(target), body: mdHtml(body), when }));
    }
    return json(res, { path: rel, body, html: mdHtml(body), when, title: path.basename(target) });
  }

  // What the company is for. Every agent reads it before it plans or works, so
  // Ayaan gets to read exactly what they were told.
  if (url.pathname === "/api/vision") {
    try { return json(res, { body: fs.readFileSync(path.join(OFFICE_DIR, "vision.md"), "utf8") }); }
    catch { return json(res, { error: "vision.md is missing" }, 404); }
  }

  // He tells her what he wants, in his own words, naming nobody. She works out
  // which of the twenty departments owns it, names a real seat against every
  // step, and files it.
  //
  // This used to match keywords instead, on the grounds that a model would take
  // four seconds to do it worse. It did not do it worse. Measured on fourteen
  // things he might actually say, none naming a team, keywords got two right and
  // sent six to the Defect Squad by default. She gets twelve, and explains each.
  if (url.pathname === "/api/assign" && req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    let asked = {};
    try { asked = JSON.parse(body || "{}"); } catch { return json(res, { error: "bad json" }, 400); }
    const text = String(asked.text || "").trim().slice(0, 600);
    if (text.length < 4) return json(res, { error: "there was nothing in that to hand out" }, 400);
    if (asked.dept && !DEPARTMENTS.some((d) => d.key === asked.dept)) return json(res, { error: `no department called ${asked.dept}` }, 400);
    const plan = await assignWork(text, { dept: asked.dept });
    if (!plan) return json(res, { error: "I could not work out who that belongs to" }, 400);
    return json(res, { ...plan, say: spokenPlan(plan) });
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

  // Just talking. Nothing to do with the office, and it works with the office
  // shut, which is the whole point of it.
  if (url.pathname === "/talk") {
    // Open both lines the instant the page is requested, so the startup cost is
    // paid while the HTML is still rendering rather than after he has spoken.
    converse.warm([routerLine()]);
    const html = fs.readFileSync(path.join(OFFICE_DIR, "ui", "talk.html"));
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(html);
  }

  if (url.pathname === "/api/talk" && req.method === "GET") {
    return json(res, {
      day: converse.readDay(),
      days: converse.days().slice(0, 30),
      greetingDue: converse.greetingDue(),
      ready: converse.ready(),
      office: { running: state.office.running },
    });
  }

  // Her reply, streamed a fragment at a time. He hears the first word about two
  // seconds in rather than waiting nine for the whole thing, which is most of
  // what "make her faster" actually meant.
  if (url.pathname === "/api/talk" && req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    let said = {};
    try { said = JSON.parse(body || "{}"); } catch { return json(res, { error: "bad json" }, 400); }
    const text = String(said.text || "").trim().slice(0, 2000);
    const opening = said.greeting === true;
    if (!opening && !text) return json(res, { error: "nothing said" }, 400);

    res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-store", connection: "keep-alive" });
    const send = (type, data) => res.write(`data: ${JSON.stringify({ type, ...data })}\n\n`);

    const started = Date.now();
    let firstAt = null;
    const onDelta = (chunk) => { firstAt ??= Date.now() - started; send("delta", { text: chunk }); };

    if (!opening) emit("ceo.said", { text, channel: "talk" });

    // One place, and she works out which he is doing. He does not pick a mode
    // and he does not name a team: if what he said is a job, it is read, given
    // to whoever owns it, and she tells him who has it. If it is not, she just
    // talks to him. Getting this wrong towards conversation is cheap, so it
    // leans that way.
    // "Never mind", right after she filed something. She takes it straight back
    // off the board rather than making him go and find it. Only what she filed
    // in the last few minutes, and only if it has not started yet, because
    // cancelling something an agent is already mid way through is not undoing.
    if (!opening && converse.callingOff(text) && justFiled.length) {
      converse.remember("ayaan", text);
      const dropped = justFiled.filter((f) => Date.now() - f.at < 5 * 60_000)
        .map((f) => state.tasks.find((t) => t.id === f.id))
        .filter((t) => t && t.status === "queued");
      justFiled.length = 0;
      for (const t of dropped) setTask(t.id, { status: "cancelled" });
      const say = dropped.length
        ? `Taken back off the board${dropped.length > 1 ? `, all ${dropped.length} of them` : ""}. Nobody started it.`
        : "Nothing of mine left to take back, that one's already running.";
      onDelta(say);
      converse.remember("pinnacle", say);
      emit("pinnacle.said", { text: say, channel: "talk", via: "cancelled" });
      send("done", { say, via: "cancelled", ms: firstAt ?? 0 });
      return res.end();
    }

    if (!opening && converse.looksLikeWork(text)) {
      converse.remember("ayaan", text);
      // Reading it and finding the right team takes about five seconds. Nobody
      // stands there silently for five seconds after being asked to do
      // something, so she answers the moment he stops talking and names the
      // team when she has it. Both halves are true when she says them.
      onDelta(ACK[Math.floor(Date.now() / 1000) % ACK.length] + " ");
      const plan = await assignWork(text);
      if (plan) {
        const say = spokenPlan(plan);
        onDelta(say);
        converse.remember("pinnacle", say);
        emit("pinnacle.said", { text: say, channel: "talk", via: "filed" });
        justFiled.length = 0;
        for (const row of plan.rows) justFiled.push({ id: row.taskId, at: Date.now() });
        send("done", { say, via: "filed", ms: firstAt ?? 0, filed: plan.rows.map((r) => ({ dept: r.deptName, agent: r.agent, step: r.step })) });
        return res.end();
      }
      // Nobody could be found for it, so it was probably just talk after all.
    }

    const out = opening ? await converse.greeting(onDelta) : await converse.reply(text, onDelta);
    emit("pinnacle.said", { text: out.say, channel: "talk", via: out.via, ms: firstAt ?? out.ms ?? 0 });
    send("done", { say: out.say, via: out.via, ms: firstAt ?? out.ms ?? 0, degraded: out.degraded || "" });
    return res.end();
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
        setOffice({ concurrency: Math.max(1, Math.min(40, Number(cmd.value) || 1)) });
        emit("office.command", { detail: `Concurrency set to ${state.office.concurrency}` });
        break;
      // How many may be writing code at once. Each writer gets its own working
      // tree, so this is a limit on what the machine can carry, not on whether
      // the gate still means anything. A writer is also an awake agent, so the
      // effective number is never more than the concurrency above.
      case "writers": {
        setOffice({ writers: Math.max(1, Math.min(12, Number(cmd.value) || 1)) });
        const effective = Math.min(state.office.writers, state.office.concurrency);
        emit("office.command", {
          detail: effective < state.office.writers
            ? `Writers set to ${state.office.writers}, but only ${effective} can run: that is the concurrency. Raise speed to use them all.`
            : `Writers set to ${state.office.writers}. Each one works in its own copy of the codebase.`,
        });
        break;
      }
      // These three take a department and none of them checked they had one.
      // Unvalidated, "only" with a value that is not a department set every
      // single department to false and sent the entire office home while
      // announcing it had kept one open. "dept" invented a phantom key and said
      // "undefined reopened". "plan" added a key nothing would ever match and
      // silently did nothing, forever. All three are one guard.
      case "dept":
      case "only":
      case "plan": {
        const key = String(cmd.value || "");
        if (!DEPARTMENTS.some((d) => d.key === key)) return json(res, { error: `no department called ${key || "(nothing)"}` }, 400);
        if (cmd.action === "dept") {
          state.office.deptEnabled[key] = !state.office.deptEnabled[key];
          emit("office.command", { detail: `${key} ${state.office.deptEnabled[key] ? "reopened" : "closed"}` });
        } else if (cmd.action === "only") {
          for (const d of DEPARTMENTS) state.office.deptEnabled[d.key] = d.key === key;
          emit("office.command", { detail: `Everyone sent home except ${key}` });
        } else {
          forcePlan(key);
          emit("office.command", { detail: `${key} told to plan a new round now` });
        }
        break;
      }
      case "all":
        for (const d of DEPARTMENTS) state.office.deptEnabled[d.key] = true;
        emit("office.command", { detail: "All 20 departments open" });
        break;
      case "order": {
        // She fills this in from what he said, so it arrives malformed often
        // enough to matter. An unguarded read here threw a 500 and he saw a
        // job silently not happen.
        //
        // It also used to refuse outright unless she had named a department,
        // which is how "the assistant still requires me to tell a team"
        // survived being fixed everywhere else: he speaks, she cannot say which
        // of twenty teams owns it, and the job is thrown away with a 400 he
        // never sees. A job with no team named is now read and routed, exactly
        // like the typed one. He only ever names a team if he wants to.
        const title = String(cmd.value?.title || (typeof cmd.value === "string" ? cmd.value : "")).trim();
        if (!title) return json(res, { error: "a job needs something to do" }, 400);
        const dept = cmd.value?.dept;
        if (dept && !DEPARTMENTS.some((d) => d.key === dept)) return json(res, { error: `no department called ${dept}` }, 400);
        const plan = await assignWork(title, { dept });
        if (!plan) return json(res, { error: "I could not work out who that belongs to" }, 400);
        emit("office.command", { detail: `You gave the floor a job: ${title}. ${plan.rows.map((r) => r.deptName).join(", ")}` });
        return json(res, { ok: true, ...plan, say: spokenPlan(plan) });
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
