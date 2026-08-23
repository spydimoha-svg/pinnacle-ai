// Renders the new student surfaces to HTML, without a browser.
//
// A typecheck proves the types line up; a build proves the bundle links.
// Neither proves the component actually renders — a hook called conditionally,
// a `.map` over something undefined, a context read outside its provider, or a
// selector that returns null on first paint all compile perfectly and then
// throw white-screen on the student's first visit.
//
// So each page is rendered to a string here. It is not a substitute for
// clicking through, but it catches the whole class of "builds fine, crashes on
// open" bugs, and unlike a browser session it runs anywhere and repeats.
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Journey from "../../src/pages/app/Journey";
import Trial from "../../src/pages/app/Trial";
import Evaluate from "../../src/pages/admin/Evaluate";
import YourJourney from "../../src/pages/app/YourJourney";
import Worlds from "../../src/pages/app/Worlds";
import { useStore } from "../../src/lib/store";
import { USERS, SCHOOLS } from "../../src/data/schools";

let problems = 0;
const fail = (m: string) => {
  console.error(`  ✗ ${m}`);
  problems++;
};
const pass = (m: string) => console.log(`  ✓ ${m}`);

/** Render one route and return the HTML, or throw. */
function renderAt(path: string, pattern: string, element: React.ReactNode) {
  return renderToString(
    createElement(
      MemoryRouter,
      { initialEntries: [path] },
      createElement(
        Routes,
        null,
        createElement(Route, { path: pattern, element })
      )
    )
  );
}

function check(
  name: string,
  path: string,
  pattern: string,
  element: React.ReactNode,
  mustContain: string[]
) {
  let html = "";
  try {
    html = renderAt(path, pattern, element);
  } catch (err) {
    fail(`${name} threw while rendering: ${(err as Error).message}`);
    return;
  }
  if (html.trim().length < 40) {
    fail(`${name} rendered essentially nothing (${html.length} chars)`);
    return;
  }
  const missing = mustContain.filter((t) => !html.includes(t));
  if (missing.length) {
    fail(`${name} rendered but is missing: ${missing.join(", ")}`);
    return;
  }
  pass(`${name} renders (${html.length} chars)`);
}

export function dry(): number {
  console.log("Render smoke test\n");

  // NOTE ON WHAT THIS TEST CAN AND CANNOT PROVE.
  //
  // Zustand v5 backs useStore with useSyncExternalStore, whose SERVER snapshot
  // is getInitialState() — deliberately, so a server render can never disagree
  // with the client's first paint. The consequence here is that setState below
  // is invisible to renderToString: every component sees the store's initial
  // state no matter what we seed.
  //
  // So this file proves the thing it can actually prove, which is also the
  // thing worth proving: no surface throws, and every surface degrades to an
  // honest empty state rather than a white screen. Signed-in behaviour is
  // asserted where it is genuinely testable — buildPlan's mission selection is
  // pure and is checked in scripts/qa/journey.ts instead of being faked here.
  const student = USERS.find((u) => u.role === "student")!;
  useStore.setState({
    currentUser: student,
    schools: SCHOOLS,
    memories: {
      [student.id]: {
        name: "Aarav",
        classLevel: 10,
        mode: "board",
        examTargets: [],
        achievements: [],
        strengths: [],
        focusAreas: [],
        streak: 3,
        lastActiveDay: "2026-08-19",
        altitude: 120,
        lastTopics: [],
        notes: [],
        progress: {},
      },
    },
  });

  // 1 — the journey's title card. The student's first frame.
  check(
    "Journey · opening",
    "/app/journey/c10-maths-04",
    "/app/journey/:chapterId",
    createElement(Journey),
    ["The Number That Knows the Answer", "Begin"]
  );

  // 2 — a chapter with no concept map must degrade to an honest empty state,
  //     never a crash. This is the common case across 274 chapters.
  check(
    "Journey · unmapped chapter",
    "/app/journey/c12-physics-99",
    "/app/journey/:chapterId",
    createElement(Journey),
    ["No journey here yet"]
  );

  // 3 — the trial brief, with real questions behind it.
  check(
    "Trial · brief",
    "/app/trial/c10-maths-04",
    "/app/trial/:chapterId",
    createElement(Trial),
    ["Final trial", "Begin the trial"]
  );

  // 4 — a chapter with too few marking-scheme answers must say so rather than
  //     serve an empty paper.
  check(
    "Trial · no questions",
    "/app/trial/c12-physics-99",
    "/app/trial/:chapterId",
    createElement(Trial),
    ["No trial for this chapter yet"]
  );

  // 5 — YOUR JOURNEY, with no session. Must degrade, never white-screen.
  check(
    "Your Journey · no session",
    "/app",
    "/app",
    createElement(YourJourney),
    ["Not signed in"]
  );

  // 6 — WORLDS, with no session. Same contract.
  check(
    "Worlds · no session",
    "/app/subjects",
    "/app/subjects",
    createElement(Worlds),
    ["Not signed in"]
  );

  // 7 — the teacher console. Rendered as a STUDENT here on purpose: the route
  //     guard lives upstream, but the page itself must not explode or leak a
  //     marking console to whoever reaches it.
  let leaked = false;
  try {
    const html = renderAt(
      "/admin/evaluate",
      "/admin/evaluate",
      createElement(Evaluate)
    );
    leaked = html.includes("New evaluation");
    pass(`Evaluate renders for a non-teacher without throwing`);
  } catch (err) {
    fail(`Evaluate threw: ${(err as Error).message}`);
  }
  if (leaked) {
    fail(
      "Evaluate showed the marking console to a student-role session — the page is relying entirely on the router guard"
    );
  } else {
    pass("Evaluate shows no marking console without a linked school");
  }

  console.log(
    problems === 0
      ? "\nRender: all surfaces render.\n"
      : `\nRender: ${problems} problem(s).\n`
  );
  return problems;
}
