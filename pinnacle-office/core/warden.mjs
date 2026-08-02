// The authority. Nothing an agent produces reaches the project until Pinnacle
// has looked at it and signed it off against the charter.
//
// Two passes, cheapest first:
//   1. A pattern screen that costs nothing and catches the obviously dangerous.
//      Anything it marks `block` is refused without spending a single token.
//   2. Pinnacle itself reads the patch and rules on it: safe for the machine,
//      safe for the site, lawful, honest, proportionate.

import fs from "node:fs";
import path from "node:path";
import { OFFICE_DIR, CONFIG } from "../config.mjs";
import { runAgent, TOOLS } from "./claude.mjs";

const CHARTER = path.join(OFFICE_DIR, "charter.md");
const charter = () => { try { return fs.readFileSync(CHARTER, "utf8"); } catch { return "Do no harm to the machine, the site, or the law."; } };

// `block` refuses on sight. `flag` is handed to Pinnacle as a specific concern
// to rule on, because context decides whether it is fine.
const RULES = [
  // The machine
  { level: "block", why: "spawns a process", re: /\b(child_process|execSync|spawnSync|\bexec\(|\bspawn\()/ },
  { level: "block", why: "deletes files from disk", re: /\b(rmSync|unlinkSync|rmdirSync|fs\.rm\b|rimraf)/ },
  { level: "block", why: "reaches outside the project folder", re: /["'`](?:[A-Za-z]:[\\/](?!pinnacle)|\/etc\/|\/usr\/|~\/\.)/ },
  { level: "block", why: "runs a shell or a system tool", re: /\b(powershell|cmd\s*\/c|schtasks|reg\s+add|sudo\s)/i },
  { level: "block", why: "adds an install hook to package.json", re: /"(?:pre|post)?install"\s*:/ },
  // The site
  { level: "block", why: "executes a string as code", re: /\b(eval\(|new\s+Function\()/ },
  { level: "flag", why: "writes raw HTML into the page", re: /dangerouslySetInnerHTML|\.innerHTML\s*=/ },
  { level: "flag", why: "removes or bypasses sanitisation", re: /^-.*(DOMPurify|sanitize|escapeHtml)/m },
  { level: "flag", why: "removes an auth or route guard", re: /^-.*(Protected|requireAuth|isAdmin|currentUser|role\s*===)/m },
  { level: "flag", why: "opens CORS", re: /Access-Control-Allow-Origin["'\s:]*\*/ },
  // Secrets
  { level: "block", why: "hardcodes what looks like a live key", re: /\b(sk-[A-Za-z0-9]{16,}|AIza[0-9A-Za-z_-]{20,}|gsk_[A-Za-z0-9]{20,}|eyJ[A-Za-z0-9_-]{30,})/ },
  { level: "block", why: "reads the env file directly", re: /readFileSync\([^)]*\.env|require\(["']dotenv/ },
  { level: "flag", why: "touches the service role key", re: /service_role|SUPABASE_SERVICE/ },
  // Integrity
  { level: "flag", why: "silences the type checker", re: /@ts-ignore|@ts-nocheck|\bas\s+any\b/ },
  { level: "flag", why: "deletes a test", re: /^-.*(expect\(|assert\(|test\(|describe\()/m },
  { level: "flag", why: "adds a dependency", re: /^\+\s*"[^"]+"\s*:\s*"[\^~]?\d/m },
  { level: "flag", why: "calls out to a new host", re: /^\+.*(fetch|axios)\(\s*["'`]https?:\/\//m },
  // Data and the law
  { level: "flag", why: "collects personal data from a minor", re: /\b(dateOfBirth|dob|aadhaar|phoneNumber|guardian|address|pincode)\b/i },
  { level: "flag", why: "adds a tracker or third party script", re: /googletagmanager|google-analytics|facebook\.net|hotjar|clarity\.ms|<script[^>]+src=/ },
];

export function screen(patch = "") {
  const hits = [];
  for (const rule of RULES) if (rule.re.test(patch)) hits.push({ level: rule.level, why: rule.why });
  return { blocked: hits.filter((h) => h.level === "block"), flags: hits.filter((h) => h.level === "flag") };
}

const CONTRACT = `OUTPUT CONTRACT. Restating this now because it is the last thing you should read:
Reply with one fenced json block and nothing else:
\`\`\`json
{ "verdict": "approve", "risk": "low", "reason": "one sentence, plain English, why you ruled that way", "concerns": ["anything you noticed that is not blocking"] }
\`\`\`
"verdict" is approve or refuse. "risk" is none, low, medium or high. Refuse if the charter says refuse. Approve if it is clean. Do not hedge and do not refuse for style.`;

// Pinnacle reads the patch and rules on it.
export async function review({ task, agent, dept, patch, flags = [], onEvent }) {
  const screened = flags.length ? `\nTHE PATTERN SCREEN FLAGGED THESE, RULE ON EACH ONE\n${flags.map((f) => "- " + f.why).join("\n")}\n` : "";
  const code = dept.kind === "code";

  const prompt = `You are Pinnacle, Ayaan's assistant. You are the last authority before an agent's work touches his project. You answer to him, not to the agent.

YOUR CHARTER
${charter()}

WHAT THE AGENT WAS ASKED TO DO
${task.title}
Department: ${dept.name}. Specialist: ${agent.id}, ${agent.specialty}.
Done means: ${task.acceptance || "not stated"}

WHAT THE AGENT SAYS IT DID
${task.summary || "no summary given"}
Claims to have verified: ${task.verified || "nothing stated"}
${task.drift ? `IT ADMITS IT DID SOMETHING ELSE: ${task.drift}
Weigh that honestly. Owning up is worth something, but it does not make off task work acceptable.` : ""}
${task.outOfScope?.length ? `IT TOUCHED ${task.outOfScope.length} FILE(S) OUTSIDE ITS DEPARTMENT'S SCOPE: ${task.outOfScope.slice(0, 8).join(", ")}
This is drift whether or not it admitted to it. An agent working outside its remit is how a codebase gets quietly pulled apart by people who each thought they were helping. Refuse unless the task genuinely could not be done any other way.` : ""}
${screened}
${code ? "THE ACTUAL CHANGE IT MADE" : "THE ADVICE IT FILED, WHICH AYAAN MAY ACT ON"}
\`\`\`${code ? "diff" : "markdown"}
${patch || "(nothing produced)"}
\`\`\`

Judge what is actually there, not the explanation of it. The agent cannot see this review and cannot argue with it. ${code
  ? "If the diff does something the task did not ask for, that alone is grounds to refuse."
  : "Refuse advice that states a legal or tax position confidently without basis, that would put Ayaan on the wrong side of the DPDP Act or consumer law, or that recommends collecting data from students he cannot lawfully collect."}

${CONTRACT}`;

  const res = await runAgent({
    prompt,
    model: CONFIG.warden.model,
    tools: TOOLS.read,
    maxTurns: CONFIG.warden.maxTurns,
    timeout: CONFIG.warden.timeout,
    onEvent,
  });

  if (!res.ok) return { verdict: "approve", risk: "unknown", reason: `Pinnacle could not review this (${res.error}), letting the build gate decide`, degraded: true };

  const parsed = parseVerdict(res.result);
  return parsed || { verdict: "approve", risk: "unknown", reason: "Pinnacle's ruling could not be read, letting the build gate decide", degraded: true };
}

function parseVerdict(text = "") {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  for (const c of [fenced?.[1], text]) {
    if (!c) continue;
    const a = c.indexOf("{"), b = c.lastIndexOf("}");
    if (a === -1 || b <= a) continue;
    try {
      const j = JSON.parse(c.slice(a, b + 1));
      if (j.verdict) return { verdict: j.verdict === "refuse" ? "refuse" : "approve", risk: j.risk || "low", reason: String(j.reason || "").slice(0, 300), concerns: j.concerns || [] };
    } catch {}
  }
  return null;
}
