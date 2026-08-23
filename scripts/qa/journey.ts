// Drives the cinematic journey engine offline, without a browser or a model.
//
// The check that matters most is the third one. Every scene ends by marking
// the student against an answer stored in the concept graph, and if the marker
// cannot recognise its OWN stored answer as correct, then a student who types
// the right thing is told they are wrong — in every scene, of every journey,
// silently. That failure is invisible to a typecheck and to a build, so it is
// asserted here instead.
import { conceptMapFor } from "../../src/data/concepts";
import { subjectsForClass } from "../../src/data";
import { buildPlan } from "../../src/lib/mastery";
import type { StudentMemory } from "../../src/lib/types";
import { journeyFor, framedChapterIds } from "../../src/data/journeys";
import {
  branchAfterCheck,
  buildScenes,
  diagnose,
  flashbackFor,
  journeyProgress,
  startJourney,
} from "../../src/lib/director";

let problems = 0;

function fail(msg: string) {
  console.error(`  ✗ ${msg}`);
  problems++;
}
function pass(msg: string) {
  console.log(`  ✓ ${msg}`);
}

export function dry(): number {
  for (const chapterId of framedChapterIds()) {
    const map = conceptMapFor(chapterId);
    const framing = journeyFor(chapterId);
    console.log(`\n${chapterId} — ${framing?.title ?? "(no framing)"}`);

    if (!map) {
      fail(`no concept map for ${chapterId}`);
      continue;
    }

    const scenes = buildScenes(map, framing);

    // 1 — every concept becomes a scene, in order.
    if (scenes.length !== map.concepts.length) {
      fail(`${scenes.length} scenes for ${map.concepts.length} concepts`);
    } else {
      pass(`${scenes.length} scenes built`);
    }

    // 2 — beat order: the prediction must come BEFORE the reveal, or the
    //     student is an audience rather than a protagonist.
    let ordered = 0;
    for (const s of scenes) {
      const kinds = s.beats.map((b) => b.kind);
      const p = kinds.indexOf("predict");
      const r = kinds.indexOf("reveal");
      const c = kinds.indexOf("check");
      if (r === -1 || c === -1) {
        fail(`scene ${s.number} "${s.title}" is missing a reveal or a check`);
        continue;
      }
      if (p !== -1 && p > r) {
        fail(`scene ${s.number} "${s.title}" reveals before it predicts`);
        continue;
      }
      if (c < r) {
        fail(`scene ${s.number} "${s.title}" checks before it reveals`);
        continue;
      }
      ordered++;
    }
    if (ordered === scenes.length) pass(`beat order correct in all ${ordered} scenes`);

    // 3 — THE ONE THAT MATTERS. Feed each scene's own stored answer back in
    //     and require the marker to accept it.
    let selfMarked = 0;
    for (const s of scenes) {
      const concept = map.concepts.find((c) => c.id === s.conceptId);
      if (!concept) {
        fail(`scene ${s.number} points at a concept that does not exist`);
        continue;
      }
      const d = diagnose(concept, concept.check.answer);
      if (d.mark === "correct") {
        selfMarked++;
      } else {
        fail(
          `scene ${s.number} "${s.title}": the stored answer marks as "${d.mark}" — a correct student would be told they are wrong.\n      Q: ${concept.check.q}\n      A: ${concept.check.answer}\n      why: ${d.detail ?? d.headline}`
        );
      }
    }
    if (selfMarked === scenes.length) {
      pass(`all ${selfMarked} stored answers mark as correct`);
    }

    // 4 — a blank and a nonsense answer must NOT mark correct.
    let rejected = 0;
    for (const s of scenes) {
      const concept = map.concepts.find((c) => c.id === s.conceptId)!;
      const blank = diagnose(concept, "   ");
      const junk = diagnose(concept, "purple elephant");
      if (blank.mark !== "correct" && junk.mark !== "correct") rejected++;
      else fail(`scene ${s.number} accepts a blank or nonsense answer`);
    }
    if (rejected === scenes.length) pass("blanks and nonsense are rejected");

    // 5 — the branch ladder: reteach, then flashback, then concede.
    const state = startJourney(chapterId);
    const b1 = branchAfterCheck(state, "wrong", true);
    const b2 = branchAfterCheck({ ...state, retries: 1 }, "wrong", true);
    const b3 = branchAfterCheck({ ...state, retries: 2, flashedBack: true }, "wrong", true);
    const ok = branchAfterCheck(state, "correct", true);
    if (b1 === "reteach" && b2 === "flashback" && b3 === "concede" && ok === "advance") {
      pass("branch ladder: reteach → flashback → concede, correct advances");
    } else {
      fail(`branch ladder wrong: ${b1}, ${b2}, ${b3}, ${ok}`);
    }

    // 6 — flashbacks resolve to a real prerequisite with a real probe.
    let withFlashback = 0;
    for (const c of map.concepts) {
      const pre = flashbackFor(map, c);
      if (pre) {
        if (!pre.probe?.q || !pre.probe?.answer) {
          fail(`prereq "${pre.title}" has no usable probe question`);
        } else withFlashback++;
      }
    }
    pass(`${withFlashback}/${map.concepts.length} concepts can flash back to a checked prerequisite`);

    // 7 — progress reaches 100% when every scene is mastered.
    const done = {
      ...state,
      outcomes: Object.fromEntries(
        scenes.map((s) => [s.conceptId, "mastered" as const])
      ),
    };
    const prog = journeyProgress(scenes, done);
    if (prog.complete && prog.percent === 100) pass("progress completes at 100%");
    else fail(`progress did not complete: ${JSON.stringify(prog)}`);
  }

  // 8 — the mission YOUR JOURNEY leads with. Pure logic, so it is asserted
  //     here rather than through a server render that cannot see the store.
  const fresh: StudentMemory = {
    name: "Test",
    classLevel: 10,
    mode: "board",
    examTargets: [],
    achievements: [],
    strengths: [],
    focusAreas: [],
    streak: 1,
    lastActiveDay: "2026-08-19",
    altitude: 0,
    lastTopics: [],
    notes: [],
    progress: {},
  };
  const plan = buildPlan(subjectsForClass(10), fresh, 6);
  console.log("\nmission selection");
  if (plan.length === 0) {
    fail("a brand-new Class 10 student gets no mission — Your Journey would be empty on day one");
  } else {
    pass(`a new student's first mission is "${plan[0].chapter.title}" (${plan[0].reason})`);
    if (!plan[0].reason.trim()) fail("the mission has no reason to show the student");
    if (plan[0].mastery.score !== 0) {
      fail(`an untouched chapter reports ${plan[0].mastery.score}% mastery, not 0`);
    } else {
      pass("an untouched chapter reports 0% mastery");
    }
  }

  console.log(
    problems === 0
      ? "\nJourney engine: all checks passed.\n"
      : `\nJourney engine: ${problems} problem(s).\n`
  );
  return problems;
}
