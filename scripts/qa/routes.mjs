// SSR smoke test: does every /app, /admin and /master route render on the
// server without throwing — once for a logged-out visitor, once for a
// freshly seeded student with empty progress?
//
// Page components are React.lazy() in src/App.tsx so the browser only ever
// downloads the page it's visiting. renderToString is synchronous and can't
// wait for a lazy import to resolve, so rendering App.tsx as-is would just
// print the Suspense fallback for every route and never touch real page
// code — a test that always passes. This harness resolves each page module
// itself and rebuilds App.tsx's Protected -> Layout -> page nesting by hand
// instead of going through the lazy wrappers, so a crash in Dashboard,
// Tutor, Chapter etc. actually surfaces here.
//
// Run: node scripts/qa/routes.mjs
import { createServer } from "vite";
import { createElement as h } from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// zustand's persist middleware reaches for localStorage the moment the store
// module is created; Node has none, so hand it an inert stand-in first.
globalThis.localStorage ??= { getItem: () => null, setItem: () => {}, removeItem: () => {} };

const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
  appType: "custom",
  logLevel: "warn",
});
const load = (path) => vite.ssrLoadModule(path).then((m) => m.default);

const SECTIONS = [
  {
    prefix: "/app",
    role: "student",
    dir: "app",
    pages: {
      "": "Dashboard",
      planner: "Planner",
      tutor: "Tutor",
      subjects: "Subjects",
      "chapter/:chapterId": "Chapter",
      worksheets: "Worksheets",
      papers: "Papers",
      library: "Library",
      videos: "Videos",
      entrance: "Entrance",
      blob: "Blob",
      profile: "Profile",
    },
  },
  {
    prefix: "/admin",
    role: "admin",
    dir: "admin",
    pages: { "": "AdminDashboard", materials: "Materials", students: "Students" },
  },
  {
    prefix: "/master",
    role: "master",
    dir: "master",
    pages: {
      "": "MasterDashboard",
      schools: "Schools",
      pricing: "PricingControl",
      updates: "Updates",
    },
  },
];

const [Protected, Layout, useStore, SUBJECTS] = await Promise.all([
  load("/src/components/Protected.tsx"),
  load("/src/components/Layout.tsx"),
  vite.ssrLoadModule("/src/lib/store.ts").then((m) => m.useStore),
  vite.ssrLoadModule("/src/data/index.ts").then((m) => m.SUBJECTS),
]);

for (const section of SECTIONS) {
  section.components = {};
  for (const [key, file] of Object.entries(section.pages)) {
    section.components[key] = await load(`/src/pages/${section.dir}/${file}.tsx`);
  }
}

// A real chapter a class 10 student would actually click into, so the
// dynamic /app/chapter/:chapterId route exercises real lookup logic instead
// of the "chapter not found" empty state.
const class10 = SUBJECTS.find((s) => s.classLevel === 10) ?? SUBJECTS[0];
const chapterId = class10.chapters[0].id;

function sectionRoute(section) {
  const children = Object.entries(section.components).map(([key, Component]) =>
    key === ""
      ? h(Route, { key: "index", index: true, element: h(Component) })
      : h(Route, { key, path: key, element: h(Component) })
  );
  return h(
    Route,
    {
      key: section.prefix,
      path: section.prefix,
      element: h(Protected, { role: section.role }, h(Layout, { role: section.role })),
    },
    ...children
  );
}

const tree = h(Routes, null, ...SECTIONS.map(sectionRoute));

const ROUTES = SECTIONS.flatMap((section) =>
  Object.keys(section.pages).map((key) => {
    const suffix = key.replace(":chapterId", chapterId);
    return suffix ? `${section.prefix}/${suffix}` : section.prefix;
  })
);

function render(path) {
  return renderToString(h(MemoryRouter, { initialEntries: [path] }, tree));
}

let failed = 0;
function checkRoute(state, path) {
  try {
    render(path);
    console.log(`  ok    [${state}] ${path}`);
  } catch (err) {
    failed++;
    console.log(`  FAIL  [${state}] ${path}\n        ${err.stack ?? err.message}`);
  }
}

console.log("SSR route smoke\n");

// Any hydration left over from a previous run's localStorage stub should
// never win over the state this script is about to set explicitly.
await useStore.persist?.rehydrate?.();

console.log("-- logged out --");
useStore.setState({ currentUser: null });
for (const path of ROUTES) checkRoute("logged-out", path);

console.log("\n-- fresh student, empty progress --");
const STUDENT = {
  id: "qa-ssr-student",
  name: "QA Student",
  email: "qa-ssr@pinnacle.test",
  password: "x",
  role: "student",
  classLevel: 10,
};
const FRESH_MEMORY = {
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
  progress: {},
};
useStore.setState({ currentUser: STUDENT, memories: { [STUDENT.id]: FRESH_MEMORY } });
for (const path of ROUTES) checkRoute("fresh-student", path);

await vite.close();
console.log(failed ? `\n${failed} route/state combination(s) threw` : "\nall routes render clean, both states");
process.exit(failed ? 1 : 0);
