// A whole lesson, driven end to end by a scripted student.
//
// The audit in run.ts grades single answers. This one grades the THING WE
// BUILT: does the engine actually walk a student through a chapter one checked
// step at a time, does it hold the line on "teach one concept only", and does
// it genuinely change its words when the student says they are lost?
//
// The student here is deliberately awkward: gets a prerequisite wrong, gets one
// check right, gets one wrong, and then says "I don't understand" twice in a
// row — which is the case the old tutor handled by saying the same thing again.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
  advance,
  currentConcept,
  detectLessonIntent,
  planTurn,
  readTags,
  resolveVerdict,
  startLesson,
  buildRoadmapMessage,
  lessonMap,
  type LessonState,
} from "../../src/lib/lesson";
import { describeLearner, freshProfile, observeStudent, profileSummary } from "../../src/lib/learner";
import { buildMarkPrompt, readMark } from "../../src/lib/grade";
import { conceptMapFor } from "../../src/data/concepts";
import type { ClassLevel, StudentMemory } from "../../src/lib/types";

const BASE = process.env.QA_BASE || "https://pinnacle-ai-two.vercel.app";
const PACE = Number(process.env.QA_PACE || 20000);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const INFRA = ["per-minute limit", "connection dropped", "couldn't reach the tutor"];
const throttled = (t: string) => t.length < 700 && INFRA.some((m) => t.toLowerCase().includes(m));

async function ask(
  messages: { role: "user" | "assistant"; content: string }[],
  system: string,
  reminder: string,
  attempt = 0,
  maxTokens?: number
): Promise<string> {
  const res = await fetch(`${BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: messages.slice(-8), system, reminder, maxTokens }),
  });
  const text = res.ok ? await res.text() : `HTTP ${res.status}`;
  if ((!res.ok || throttled(text)) && attempt < 5) {
    console.log(`    … throttled, waiting 65s`);
    await sleep(65_000);
    return ask(messages, system, reminder, attempt + 1, maxTokens);
  }
  return text;
}

/**
 * The scripted student.
 *
 * Earlier versions used a fixed list of replies, which stopped matching the
 * lesson the moment the engine did something different from what the script
 * assumed — so a stall looked like a wrong answer and the run proved nothing.
 * This student answers whatever question is actually in front of it, using the
 * stored correct answer from the concept graph, and is deliberately wrong at
 * chosen points so the reteach branch is exercised too.
 */
function studentReply(
  phase: string,
  concept: { check: { q: string; answer: string }; title: string } | null,
  prereqs: { probe: { q: string; answer: string } }[],
  wrongAt: Set<number>,
  conceptIndex: number,
  attempt: number
): string {
  // The opener comes BEFORE the questions exist; the answers come one turn
  // later, when the engine has moved to marking them.
  if (phase === "placement") return "I want to learn polynomials from scratch.";
  if (phase === "grade") {
    const answers = prereqs
      .filter((p) => p.probe.q)
      .slice(0, 3)
      .map((p, i) => `${i + 1}. ${p.probe.answer}`);
    answers.push(`${answers.length + 1}. I have not done this chapter at all.`);
    return answers.join(" ");
  }
  if (!concept) return "Okay.";
  // Deliberately wrong the first time round on the chosen steps.
  if (wrongAt.has(conceptIndex) && attempt === 0) {
    return "I think it is the other way round, so the answer is 0.";
  }
  if (phase === "reteach") return "Okay, that's much clearer now.";
  return concept.check.answer;
}

const memory: StudentMemory = {
  name: "Aarav",
  classLevel: 10 as ClassLevel,
  mode: "board",
  examTargets: [],
  achievements: [],
  strengths: [],
  focusAreas: [],
  streak: 2,
  altitude: 30,
  lastTopics: [],
  notes: [],
  progress: {},
};

function words(t: string): number {
  return t.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
}

/**
 * The engine, checked without spending a single token.
 *
 * Everything that decides HOW the tutor behaves — the phase order, the word
 * caps, what goes in each prompt, when a student is re-taught rather than
 * re-asked — is pure code here, so it can be proven correct offline. The live
 * run above only tests whether the model obeys it.
 */
export function dry(): number {
  const problems: string[] = [];
  const ok = (cond: unknown, msg: string) => {
    if (!cond) problems.push(msg);
  };

  const map = conceptMapFor("c10-maths-02")!;
  ok(map.authored, "the polynomials map should be hand-authored");
  ok(map.concepts.length >= 6, "polynomials should break into at least 6 steps");
  ok(
    map.prereqs.every((p) => /Class 9/.test(p.from)),
    "every polynomials prerequisite should point back to Class 9"
  );
  ok(
    map.concepts.every((c) => c.check.q && c.check.answer),
    "every authored concept needs a check question WITH a stored answer"
  );
  ok(map.leadsTo.length >= 3, "the chapter should say where it leads");

  // A derived chapter (no authored map) must still produce a usable lesson.
  const derived = conceptMapFor("c10-maths-04");
  ok(derived !== null, "a chapter with no authored map must still derive one");
  ok(!derived?.authored, "a derived map must be honest that it is derived");
  ok((derived?.concepts.length ?? 0) > 0, "a derived map must still have steps");

  // Intent detection: lessons start on a real request and never on a doubt.
  const starts = [
    "I want to learn polynomials from scratch.",
    "teach me polynomials",
    "walk me through the whole polynomials chapter",
  ];
  const doesNot = [
    "solve exercise 2.2 of polynomials",
    "what is a zero of a polynomial",
    "grade my answer on polynomials",
  ];
  for (const s of starts) {
    ok(detectLessonIntent(s, 10)?.chapterId === "c10-maths-02", `should start a lesson: "${s}"`);
  }
  for (const s of doesNot) {
    ok(detectLessonIntent(s, 10) === null, `should NOT hijack into a lesson: "${s}"`);
  }

  // The phase machine.
  let state = startLesson("c10-maths-02", 10)!;
  ok(state.phase === "placement", "a lesson opens by finding out what they know");

  const p1 = planTurn(state, freshProfile(), memory)!;
  ok(/find out what they already know/i.test(p1.system), "the opening prompt must forbid teaching");
  ok(
    p1.system.includes(map.prereqs[0].probe.q),
    "the opening prompt must carry the real prerequisite question, verbatim"
  );

  state = advance(state, { clean: "" }, { lost: false, wantsSlower: false });
  ok(state.phase === "grade", "after asking, it marks");

  const p2 = planTurn(state, freshProfile(), memory)!;
  ok(Boolean(p2.appendAfter), "the app must attach its own route map after grading");
  ok(/```mermaid/.test(p2.appendAfter ?? ""), "the route map must be a real drawn diagram");
  ok(/Class 9/.test(p2.appendAfter ?? ""), "the route map must show where the chapter comes from");

  state = advance(
    state,
    { clean: "", placement: "beginner", gaps: ["p-value"] },
    { lost: false, wantsSlower: false }
  );
  ok(state.phase === "teach" && state.placement === "beginner", "placement result is recorded");
  ok(state.gaps.includes("p-value"), "a missed prerequisite is remembered");

  const p3 = planTurn(state, freshProfile(), memory)!;
  ok(
    p3.system.includes(map.concepts[0].check.q),
    "the teaching prompt hands over the exact check question"
  );
  ok(/Teach ONLY/i.test(p3.system), "the teaching prompt must forbid covering the rest of the chapter");
  ok(!p3.system.includes(map.concepts[2].brief), "step 1 must not leak step 3's content");

  // Right answer moves on; wrong answer does not.
  state = advance(state, { clean: "" }, { lost: false, wantsSlower: false });
  ok(state.phase === "check", "after teaching it checks");
  const before = state.index;
  state = advance(state, { clean: "", mastered: false }, { lost: false, wantsSlower: false });
  ok(state.index === before, "a wrong answer must NOT advance the lesson");
  ok(state.retries === 1, "a wrong answer counts as a retry");
  state = advance(state, { clean: "", mastered: false }, { lost: false, wantsSlower: false });
  ok(state.phase === "reteach", "two wrong answers means the explanation is at fault, so re-explain");

  // The re-explanation must actually escalate.
  let profile = freshProfile();
  profile = observeStudent(profile, "I don't understand this at all").profile;
  ok(profile.level === 2, "saying you are lost raises the simplicity level");
  const r2 = planTurn(state, profile, memory)!;
  ok(/ATTEMPT 2/.test(r2.system), "the first re-explanation uses the level-2 ladder");
  ok(/different angle/i.test(r2.system), "the re-explanation prompt must demand a different angle");

  state = advance(state, { clean: "" }, { lost: true, wantsSlower: false });
  state = advance(state, { clean: "", mastered: false }, { lost: true, wantsSlower: false });
  const r3 = planTurn(state, profile, memory);
  ok(r3 !== null && /ATTEMPT 3/.test(r3.system), "the second re-explanation escalates to smallest steps");

  // Mastery advances and is recorded.
  let s2 = startLesson("c10-maths-02", 10)!;
  s2 = { ...s2, phase: "check" };
  s2 = advance(s2, { clean: "", mastered: true }, { lost: false, wantsSlower: false });
  ok(s2.index === 1, "a correct answer moves to the next step");
  ok(s2.progress[map.concepts[0].id].status === "mastered", "the step is marked mastered");
  ok(s2.retries === 0, "retries reset on success");

  // The end of the chapter.
  let s3 = startLesson("c10-maths-02", 10)!;
  s3 = { ...s3, phase: "check", index: map.concepts.length - 1 };
  s3 = advance(s3, { clean: "", mastered: true }, { lost: false, wantsSlower: false });
  ok(s3.phase === "recap", "finishing the last step goes to the recap");

  // The learner profile.
  let lp = freshProfile();
  lp = observeStudent(lp, "I only understand things when you explain with cricket examples").profile;
  ok(lp.interests.includes("cricket"), "a stated interest is remembered");
  lp = observeStudent(lp, "I keep forgetting to write units").profile;
  ok(lp.habits.some((h) => /unit/.test(h)), "a stated weakness is remembered");
  const described = describeLearner(lp);
  ok(/cricket/.test(described), "the profile must reach the prompt");
  ok(/unit/.test(described), "the weakness must reach the prompt");
  const teachPrompt = planTurn(startLesson("c10-maths-02", 10)!, lp, memory)!.system;
  ok(/cricket/.test(teachPrompt), "every lesson prompt carries how this child understands");

  // Control tags never reach the student.
  const tagged = "Nice, that's right.\n@@VERDICT: mastered";
  const read = readTags(tagged);
  ok(read.mastered === true, "the verdict is read");
  ok(!/@@/.test(read.clean), "control tags are stripped before display");

  // "not mastered" contains the substring "master" — must not be read as mastered.
  ok(
    readTags("Not quite.\n@@VERDICT: not mastered").mastered === false,
    '"not mastered" must resolve to mastered:false, not true'
  );
  ok(
    readTags("Have another go.\n@@VERDICT: not-yet").mastered === false,
    '"not-yet" must resolve to mastered:false'
  );
  ok(
    readTags("Spot on.\n@@VERDICT: mastered").mastered === true,
    '"mastered" must still resolve to mastered:true'
  );

  console.log("Engine checks (no tokens spent)\n");
  if (problems.length) {
    for (const p of problems) console.log(`  FAIL  ${p}`);
  }
  console.log(`\n${problems.length === 0 ? "all checks passed" : `${problems.length} failed`}`);
  return problems.length;
}

export async function main(): Promise<number> {
  const map = conceptMapFor("c10-maths-02");
  if (!map) {
    console.log("no concept map for c10-maths-02");
    return 1;
  }
  console.log(`Lesson: ${map.chapterTitle} — ${map.concepts.length} steps, ${map.prereqs.length} prerequisites`);
  console.log(`Prerequisites found: ${map.prereqs.map((p) => p.from).join(" | ")}`);
  console.log("");

  let state: LessonState | null = startLesson("c10-maths-02", 10);
  if (!state) return 1;
  let profile = freshProfile();
  const history: { role: "user" | "assistant"; content: string }[] = [];
  const transcript: string[] = [`# Simulated lesson — ${map.chapterTitle}`, ""];
  const problems: string[] = [];
  // Get step 2 wrong on the first try, so the run covers both branches.
  const wrongAt = new Set([1]);
  const attempts = new Map<number, number>();
  const MAX_TURNS = 26;

  for (let turn = 0; turn < MAX_TURNS && state && state.phase !== "done"; turn++) {
    const concept = currentConcept(state);
    const attempt = attempts.get(state.index) ?? 0;
    const said = studentReply(state.phase, concept, map.prereqs, wrongAt, state.index, attempt);
    if (state.phase === "check") attempts.set(state.index, attempt + 1);
    const observed = observeStudent(profile, said);
    profile = observed.profile;

    if ((observed.lost || observed.wantsSlower) && (state.phase === "teach" || state.phase === "check")) {
      state = { ...state, phase: "reteach" };
    }

    const plan = planTurn(state, profile, memory);
    if (!plan) break;

    history.push({ role: "user", content: said });
    const raw = await ask(history, plan.system, plan.reminder, 0, plan.maxTokens);
    if (throttled(raw)) {
      console.log(`  turn ${turn + 1}: provider unavailable, stopping early`);
      problems.push("The free tier ran out mid-run, so the lesson was not fully exercised.");
      break;
    }
    let v = readTags(raw);
    if (plan.phase === "check") {
      v = resolveVerdict(currentConcept(state), said, v);
      const concept = currentConcept(state);
      if (v.mastered === undefined && concept?.check.answer) {
        const mp = buildMarkPrompt(concept.check.q, concept.check.answer, said);
        const word = await ask([{ role: "user", content: mp.user }], mp.system, "", 0, 8);
        v = { ...v, mastered: readMark(word), markedBy: "app", why: `second pass said "${word.trim().slice(0, 12)}"` };
      }
    }
    let shown = v.clean;
    if (plan.appendAfter) shown += `\n${plan.appendAfter}`;
    history.push({ role: "assistant", content: v.clean });

    const w = words(v.clean);
    console.log(
      `  turn ${turn + 1} [${plan.phase}] ${w} words` +
        (v.mastered !== undefined
        ? ` · verdict ${v.mastered ? "mastered" : "not yet"} (by ${v.markedBy ?? "?"}${v.why ? `: ${v.why}` : ""})`
        : "") +
        (v.placement ? ` · placement ${v.placement}` : "")
    );

    // The rules the engine is supposed to enforce, checked.
    if (plan.phase === "placement" && /zero of a polynomial is|degree of a polynomial is/i.test(v.clean)) {
      problems.push("Turn 1 started teaching instead of only asking placement questions.");
    }
    if (plan.phase === "teach" && w > 260) {
      problems.push(`A teach turn ran to ${w} words — the cap is a checkpoint, not an essay.`);
    }
    if (plan.phase === "check" && v.mastered === undefined) {
      problems.push("A check turn produced no verdict at all — neither the app's marking nor the model's line — so the engine could not tell whether to move on.");
    }
    // The scaffolding leak: a small model printing the marking key back at the
    // student, answer and all.
    if (/^\s*#{1,6}\s*(?:the one idea|worked example|re-?ask)/im.test(v.clean)) {
      problems.push(`Turn ${turn + 1} printed the prompt's own headings as if they were the lesson.`);
    }
    if (/^\s*[-*]?\s*\*{0,2}answer\*{0,2}\s*:/im.test(v.clean) && plan.phase !== "grade") {
      problems.push(`Turn ${turn + 1} printed an "Answer:" line — it handed over the marking key.`);
    }

    transcript.push(
      `## Turn ${turn + 1} — phase: ${plan.phase}${concept ? ` — step ${state.index + 1}: ${concept.title}` : ""}`,
      "",
      `**Student:** ${said}`,
      "",
      shown,
      ""
    );

    state = advance(state, v, { lost: observed.lost, wantsSlower: observed.wantsSlower });
    await sleep(PACE);
  }

  if (state) {
    const done = Object.values(state.progress).filter((p) => p.status === "mastered").length;
    console.log("");
    console.log(`Ended at step ${state.index + 1} (${state.phase}), ${done} concept(s) locked in`);
    if (done === 0) {
      problems.push("The student answered correctly and NOTHING was marked mastered — the lesson cannot progress.");
    } else if (done < map.concepts.length - 1) {
      problems.push(`Only ${done} of ${map.concepts.length} steps were locked in before the run ended.`);
    }
    console.log(`Learner profile now: ${profileSummary(profile)} (level ${profile.level}, ${profile.reteaches} reteaches)`);
    transcript.push("## The route map the app draws", "", buildRoadmapMessage(lessonMap(state)!, state));
  }

  if (problems.length) {
    console.log("\nProblems:");
    for (const p of problems) console.log(`  - ${p}`);
  } else {
    console.log("\nNo rule violations: every turn stayed inside its phase and its word budget.");
  }

  const dir = join(process.cwd(), "qa-reports");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "lesson-run.md"), transcript.join("\n"), "utf8");
  console.log(`Transcript: qa-reports/lesson-run.md`);
  return problems.length;
}
