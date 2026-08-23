// Vercel Function (web `fetch`-style API — a named HTTP method export; see
// api/chat.ts for why a default export silently hangs here).
//
// The AI checker behind the on-screen marking console (/admin/evaluate).
// Given one question, its CBSE marking scheme and one student's answer, it
// returns a STRUCTURED first-pass evaluation: marks suggested, which value
// points were found, which were missed, and how confident it is.
//
// TEACHERS ONLY. Unlike /api/chat — which any signed-in student may call —
// this route requires a Supabase session whose app_metadata.role is "admin"
// (the school-teacher role). app_metadata can only be written with the
// service-role key, never by the signed-in user, so a student cannot promote
// themselves into this endpoint by editing localStorage or the request body.
//
// It fails CLOSED: with no Supabase project configured there is no authority
// that can vouch for anyone's role, so rather than fall open the way
// /api/chat does for students, this answers 503 and the console drops to its
// local rule-based marker (see src/lib/osm.ts). A teacher-only tool that
// stops being teacher-only when a env var is missing is not teacher-only.
import { createClient } from "@supabase/supabase-js";
import {
  activeProviders,
  streamLLM,
  AllProvidersFailed,
} from "./_llm.js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Escape hatch for local development against no Supabase project at all.
 *  Must be set explicitly; absent (i.e. in production) the role check stands. */
const ALLOW_UNAUTHENTICATED = process.env.EVALUATE_ALLOW_NO_AUTH === "1";

// Same-origin check, identical to api/chat.ts and api/state.ts. Origin can't
// be set by page JS, so it blocks browser-forged cross-site requests on its
// own; Referer is checked only when the browser sends one, since privacy
// browsers strip it and would otherwise lock real teachers out.
function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;
  const matchesHost = (value: string | null) => {
    if (!value) return false;
    try {
      return new URL(value).host === host;
    } catch {
      return false;
    }
  };
  const referer = req.headers.get("referer");
  return (
    matchesHost(req.headers.get("origin")) && (!referer || matchesHost(referer))
  );
}

function clientIp(req: Request): string {
  const ip =
    req.headers.get("x-vercel-forwarded-for") || req.headers.get("x-real-ip");
  return ip?.split(",")[0]?.trim() || "unknown";
}

/**
 * The verified teacher behind this request, or null.
 *
 * Two things must both hold: Supabase's own auth server accepts the bearer
 * token, AND that user carries the admin role in app_metadata. A student's
 * perfectly valid session token fails the second half.
 */
async function verifiedTeacherId(req: Request): Promise<string | null> {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return null;
  const admin = createClient(supabaseUrl, supabaseServiceKey);
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user.app_metadata?.role === "admin" ? data.user.id : null;
}

// A marking pass is a burst activity: an evaluator works down a 35-answer
// script and fires one call per answer. The per-minute allowance is therefore
// higher than the tutor's, but still bounded so one console can't drain the
// shared free-tier budget every student's tutor depends on.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 40;
const GLOBAL_RATE_LIMIT_MAX = 200;

const fallbackTimestamps = new Map<string, number[]>();

function isRateLimitedInMemory(key: string, max: number): boolean {
  const now = Date.now();
  for (const [k, timestamps] of fallbackTimestamps) {
    if (now - timestamps[timestamps.length - 1] >= RATE_LIMIT_WINDOW_MS) {
      fallbackTimestamps.delete(k);
    }
  }
  const recent = (fallbackTimestamps.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  fallbackTimestamps.set(key, recent);
  return recent.length > max;
}

async function isRateLimited(key: string, max: number): Promise<boolean> {
  if (!supabaseUrl || !supabaseServiceKey) {
    return isRateLimitedInMemory(key, max);
  }
  const admin = createClient(supabaseUrl, supabaseServiceKey);
  const { data, error } = await admin.rpc("rate_limit_hit", {
    p_key: `evaluate:${key}`,
    p_window_ms: RATE_LIMIT_WINDOW_MS,
    p_max: max,
  });
  if (error) {
    console.error("rate_limit_hit error:", error.message);
    return isRateLimitedInMemory(key, max);
  }
  return data === true;
}

/* ------------------------------------------------------------------ *
 * The marking prompt
 * ------------------------------------------------------------------ */

// Written against how CBSE marking schemes actually work: marks are awarded
// per VALUE POINT, not per impression of quality. An examiner reads for the
// listed points, ticks the ones present, and totals them. Anything the model
// is allowed to do beyond that — reward flair, punish handwriting, deduct for
// a wording it prefers — is a mark a real evaluator would not have moved.
const SYSTEM = [
  "You are an assistant examiner for CBSE on-screen marking (OSM). You mark ONE answer against ONE marking scheme and return JSON only.",
  "",
  "Follow CBSE marking-scheme discipline exactly:",
  "- Marks are awarded per VALUE POINT present in the answer. Never for neatness, length, confidence or style.",
  "- Award full marks for a correct answer in the student's own words. NCERT wording is not required; the idea is.",
  "- A correct final result with valid working earns full marks even if the method differs from the scheme.",
  "- Award step marks for correct intermediate steps when the final answer is wrong.",
  "- Do not deduct twice for the same error carried forward. Follow through: if a wrong value from step 1 is used correctly afterwards, later steps still earn their marks.",
  "- Spelling, grammar and handwriting carry no marks and no penalty, except where the question is testing that.",
  "- Blank or irrelevant answers score zero.",
  "- Never award more than the maximum. Award in the smallest unit the scheme uses (halves are allowed).",
  "",
  "You are a FIRST PASS, not the examiner of record. A human teacher reads and may overturn everything you say, so state your confidence honestly and say 'low' whenever the answer is ambiguous, unreadable, or turns on a judgement a human should make.",
].join("\n");

const SHAPE = `Return ONLY a JSON object, no prose before or after, no markdown fence:
{
  "awarded": <number, 0 to maxMarks, halves allowed>,
  "valuePoints": [{ "point": "<the scheme point, quoted short>", "found": true|false, "marks": <number this point is worth> }],
  "missed": ["<what the student needed to say and did not>"],
  "errors": ["<a specific mistake made, if any>"],
  "remark": "<one sentence the teacher could write in the margin, addressed to the student>",
  "confidence": "high"|"medium"|"low",
  "aiWritten": { "likelihood": "low"|"medium"|"high", "why": "<short reason, or empty>" }
}`;

// The AI-authorship read is a SIGNAL, not a verdict, and the prompt says so.
// Detectors are wrong often enough that a confident accusation from one is a
// real risk to a real student; a teacher can act on "worth a conversation",
// nobody should act on "this was AI".
const AI_CHECK = [
  "For aiWritten, judge only whether the prose reads as machine-generated for a school student under exam conditions: unnaturally even register, textbook-perfect structure with no crossings-out of thought, generic hedging, or vocabulary far outside the rest of the script.",
  "This is a signal for the teacher to look closer, never an accusation. If the answer is short, factual, formulaic, or simply well-taught, the likelihood is 'low' — most good answers are just good answers. Reserve 'high' for prose that a class 9-12 student writing by hand would not plausibly produce.",
].join(" ");

interface EvaluateBody {
  question?: string;
  /** The model answer / marking scheme text. */
  scheme?: string;
  /** Examiner key words the scheme awards marks for. */
  keywords?: string[];
  maxMarks?: number;
  studentAnswer?: string;
  /** Free-text context: class, subject, question type. Display only. */
  context?: string;
}

const MAX_FIELD = 8_000;

function str(v: unknown, limit = MAX_FIELD): string {
  return typeof v === "string" ? v.slice(0, limit) : "";
}

/** Pull the JSON object out of a reply that may still be wrapped in prose. */
function extractJson(raw: string): unknown {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = fenced ? fenced[1] : raw;
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(body.slice(start, end + 1));
  } catch {
    return null;
  }
}

const LIKELIHOOD = new Set(["low", "medium", "high"]);
const CONFIDENCE = new Set(["high", "medium", "low"]);

/**
 * Coerce whatever the model returned into the exact shape the console reads.
 *
 * Everything is clamped server-side: a model that hallucinates 9 marks out of
 * 3, or an `awarded` string instead of a number, must not be able to put a
 * nonsense figure in front of an evaluator who is moving fast down a script.
 */
function normalise(parsed: unknown, maxMarks: number) {
  const o = (parsed ?? {}) as Record<string, unknown>;
  const rawAwarded = Number(o.awarded);
  // Round to the nearest half — the smallest unit CBSE schemes use.
  const awarded = Number.isFinite(rawAwarded)
    ? Math.max(0, Math.min(maxMarks, Math.round(rawAwarded * 2) / 2))
    : 0;

  const valuePoints = Array.isArray(o.valuePoints)
    ? o.valuePoints.slice(0, 20).map((p) => {
        const it = (p ?? {}) as Record<string, unknown>;
        const m = Number(it.marks);
        return {
          point: str(it.point, 300),
          found: it.found === true,
          marks: Number.isFinite(m) ? Math.max(0, Math.min(maxMarks, m)) : 0,
        };
      })
    : [];

  const list = (v: unknown) =>
    Array.isArray(v)
      ? v.slice(0, 10).map((x) => str(x, 300)).filter(Boolean)
      : [];

  const ai = (o.aiWritten ?? {}) as Record<string, unknown>;
  const likelihood = str(ai.likelihood, 10).toLowerCase();
  const confidence = str(o.confidence, 10).toLowerCase();

  return {
    awarded,
    valuePoints,
    missed: list(o.missed),
    errors: list(o.errors),
    remark: str(o.remark, 400),
    confidence: CONFIDENCE.has(confidence) ? confidence : "low",
    aiWritten: {
      likelihood: LIKELIHOOD.has(likelihood) ? likelihood : "low",
      why: str(ai.why, 300),
    },
  };
}

export async function POST(req: Request): Promise<Response> {
  if (!isSameOrigin(req)) {
    return new Response("Forbidden", { status: 403 });
  }

  // Throttle on IP before the bearer token reaches Supabase's Auth API, so a
  // same-origin flood of garbage tokens can't force an unthrottled flood of
  // getUser() calls against the shared free-tier Auth quota.
  if (await isRateLimited(`ip:${clientIp(req)}`, RATE_LIMIT_MAX)) {
    return new Response("Too many requests", { status: 429 });
  }

  let teacherId: string | null = null;
  if (supabaseUrl && supabaseServiceKey) {
    teacherId = await verifiedTeacherId(req);
    if (!teacherId) {
      // Deliberately indistinguishable from "not signed in": a student who
      // pokes this endpoint learns nothing about who may call it.
      return new Response("Forbidden", { status: 403 });
    }
  } else if (!ALLOW_UNAUTHENTICATED) {
    // No authority to check a role against. Fail closed; the console falls
    // back to its offline rule-based marker.
    return new Response("Evaluation service is not configured", {
      status: 503,
    });
  }

  if (await isRateLimited(teacherId ? `teacher:${teacherId}` : `ip:${clientIp(req)}`, RATE_LIMIT_MAX)) {
    return new Response("Too many requests", { status: 429 });
  }
  if (await isRateLimited("global", GLOBAL_RATE_LIMIT_MAX)) {
    return new Response("Too many requests", { status: 429 });
  }

  if (activeProviders().length === 0) {
    return new Response("Evaluation service is not configured", { status: 503 });
  }

  const MAX_BODY_BYTES = 200_000;
  const text = await req.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    return new Response("Payload too large", { status: 413 });
  }

  let body: EvaluateBody;
  try {
    body = JSON.parse(text);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const question = str(body.question).trim();
  const scheme = str(body.scheme).trim();
  const studentAnswer = str(body.studentAnswer).trim();
  const context = str(body.context, 300).trim();
  const keywords = Array.isArray(body.keywords)
    ? body.keywords.slice(0, 30).map((k) => str(k, 120)).filter(Boolean)
    : [];
  const rawMax = Number(body.maxMarks);
  const maxMarks = Number.isFinite(rawMax)
    ? Math.max(1, Math.min(20, Math.round(rawMax)))
    : 1;

  if (!question || !studentAnswer) {
    return new Response("Question and student answer are required", {
      status: 400,
    });
  }

  const user = [
    context && `Context: ${context}`,
    `Maximum marks: ${maxMarks}`,
    `Question: ${question}`,
    scheme
      ? `Marking scheme (the expected answer):\n${scheme}`
      : "Marking scheme: none supplied — mark against the syllabus-correct answer you would expect, and set confidence to at most 'medium'.",
    keywords.length
      ? `Value points / key words the scheme awards:\n${keywords.map((k) => `- ${k}`).join("\n")}`
      : "",
    `Student's answer (verbatim, transcription of a handwritten script — ignore spelling and transcription noise):\n${studentAnswer}`,
    "",
    AI_CHECK,
    "",
    SHAPE,
  ]
    .filter(Boolean)
    .join("\n\n");

  // The reminder sits AFTER the message, so JSON-only is the last instruction
  // read before generation — the same recency trick api/chat.ts uses for its
  // persona guard, and the difference between clean JSON and a chatty preamble
  // on the smaller free models.
  const reminder =
    "Reply with the JSON object only. No greeting, no explanation, no markdown fence. Never award more than the maximum marks.";

  let raw = "";
  try {
    for await (const chunk of streamLLM(
      [{ role: "user", content: user }],
      SYSTEM,
      req.signal,
      reminder,
      700
    )) {
      raw += chunk;
      // A model that ignores "JSON only" and starts writing an essay would
      // otherwise burn the whole token ceiling before failing to parse.
      if (raw.length > 12_000) break;
    }
  } catch (err) {
    console.error(
      "evaluate error:",
      err instanceof AllProvidersFailed ? err.detail : err
    );
    const rateLimited = err instanceof AllProvidersFailed && err.rateLimited;
    return new Response(
      rateLimited
        ? "The free evaluation model is at its per-minute limit — wait about a minute."
        : "Could not reach the evaluation model",
      { status: rateLimited ? 429 : 502 }
    );
  }

  const parsed = extractJson(raw);
  if (!parsed) {
    return new Response("The model did not return a usable evaluation", {
      status: 502,
    });
  }

  return new Response(JSON.stringify(normalise(parsed, maxMarks)), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
