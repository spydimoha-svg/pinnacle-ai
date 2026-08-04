// Proves buildPlan (src/lib/mastery.ts) actually sorts by priority, not just
// computes it. Planner.tsx and Dashboard.tsx both trust index 0 of this array
// to be "what the student should do next" — a dropped, inverted, or unstable
// .sort() call would leave the real top-priority chapter buried, or drop
// silently to iteration order, while every other check in this file still
// passes.
//
// Run: node scripts/qa/plan-sort.mjs
import { createServer } from "vite";

const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
  appType: "custom",
  logLevel: "warn",
});

let fail = 0;
try {
  const { buildPlan } = await vite.ssrLoadModule("/src/lib/mastery.ts");

  const chapter = (id, number, weightage) => ({
    id,
    number,
    title: id,
    weightage,
    keyTopics: [],
  });

  // Inserted lowest-weightage first, so a correct descending-priority sort
  // must fully reverse this order to pass. c-strong-fresh sits in the middle
  // of the input so an accidental "just return the array" bug can't hide it
  // by luck of position.
  const subjects = [
    {
      id: "s1",
      name: "Maths",
      classLevel: 10,
      icon: "calculator",
      color: "gold",
      chapters: [
        chapter("c-low", 1, "2 marks"),
        chapter("c-mid", 2, "5 marks"),
        chapter("c-strong-fresh", 3, "6 marks"),
        chapter("c-high", 4, "8 marks"),
      ],
    },
  ];

  const memory = {
    name: "QA",
    classLevel: 10,
    mode: "board",
    examTargets: [],
    achievements: [],
    strengths: [],
    focusAreas: [],
    streak: 0,
    altitude: 0,
    lastTopics: [],
    notes: [],
    progress: {
      // Mastered and studied today: strong, fresh, must drop out of the plan
      // entirely rather than just sort to the bottom.
      "c-strong-fresh": {
        chapterId: "c-strong-fresh",
        status: "mastered",
        confidence: 95,
        lastStudied: new Date().toISOString(),
      },
    },
  };

  const plan = buildPlan(subjects, memory, 10);
  const ids = plan.map((item) => item.chapter.id);

  const expectedIds = ["c-high", "c-mid", "c-low"];
  if (JSON.stringify(ids) === JSON.stringify(expectedIds)) {
    console.log(`  ok    plan is sorted highest-priority first: ${ids.join(" > ")}`);
  } else {
    console.log(`  FAIL  plan order is ${JSON.stringify(ids)}, expected ${JSON.stringify(expectedIds)}`);
    fail++;
  }

  if (ids.includes("c-strong-fresh")) {
    console.log("  FAIL  a mastered, freshly-studied chapter should not appear in the plan at all");
    fail++;
  } else {
    console.log("  ok    strong-and-fresh chapter correctly excluded from the plan");
  }

  let monotonic = true;
  for (let i = 1; i < plan.length; i++) {
    if (plan[i].priority > plan[i - 1].priority) monotonic = false;
  }
  if (monotonic) {
    console.log("  ok    priority is non-increasing across the returned plan");
  } else {
    console.log(`  FAIL  priorities are not sorted: ${plan.map((p) => p.priority).join(", ")}`);
    fail++;
  }
} catch (err) {
  console.error(err);
  fail++;
} finally {
  await vite.close();
}

console.log(fail === 0 ? "\nplan sort order check passed" : `\n${fail} failed`);
process.exit(fail ? 1 : 0);
