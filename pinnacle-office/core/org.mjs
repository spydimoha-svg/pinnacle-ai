// The organisation: 21 departments, 1000 named agents, one chain of command.
//
// Structure per department: 1 head -> managers (1 per 12 people) -> workers.
// Heads plan. Managers review. Workers execute one narrow task each.
// Every department reports upward to Pinnacle, who reports to Ayaan.

export const DEPARTMENTS = [
  {
    key: "frontend",
    name: "Front End",
    headcount: 85,
    kind: "code",
    priority: 2,
    scope: ["src/components/**", "src/pages/**", "src/index.css", "src/App.tsx"],
    mission:
      "Take the interface from good to obviously premium. Typography rhythm, spacing scale, colour discipline, motion that feels intentional, empty and loading states, mobile layout. The product is a study tool for Indian school students on cheap phones: it must feel fast and calm, never busy.",
    guardrails: [
      "Never break an existing route or component contract.",
      "No new dependencies. The bundle is already heavy with three.js and gsap.",
      "Prefer deleting code over adding it. A smaller diff that achieves the same visual result is the better answer.",
      "Every change must survive a mobile viewport at 360px wide.",
    ],
    specialties: [
      "typography and reading rhythm", "spacing and layout grid", "colour system and contrast",
      "motion and micro interaction", "empty and error states", "loading and skeleton states",
      "mobile responsive behaviour", "component API simplification", "dark surface treatment",
      "iconography consistency", "form and input polish", "navigation and information scent",
    ],
  },
  {
    key: "backend",
    name: "Back End",
    headcount: 30,
    kind: "code",
    priority: 2,
    scope: ["api/**", "scripts/**", "netlify/**"],
    mission:
      "Make the serverless API correct, cheap and boring. Provider fallback that actually falls back, streaming that never half dies, input validation, sane errors, no secret leakage into responses.",
    guardrails: [
      "Relative imports inside api/ must keep their .js extension or Vercel breaks.",
      "Never introduce a paid provider. Free tiers only.",
      "No secret may ever reach the client or a log line.",
      "Shorter is better: if a function is over 60 lines it probably wants splitting or deleting.",
    ],
    specialties: [
      "provider fallback logic", "streaming correctness", "input validation", "error shape and status codes",
      "rate limit handling", "timeout and abort handling", "response caching", "logging hygiene",
      "cold start cost", "payload size", "serverless config", "dead code removal",
    ],
  },
  {
    key: "tutor",
    name: "Tutor Engine",
    headcount: 85,
    kind: "code",
    priority: 1,
    scope: ["src/lib/ai.ts", "src/lib/lesson.ts", "src/lib/persona.ts", "src/lib/grounding.ts", "src/lib/grade.ts", "src/lib/mastery.ts", "src/pages/app/Tutor.tsx", "src/pages/app/Chapter.tsx"],
    mission:
      "The tutor is the product. Make its explanations correct, syllabus bound, step by step, and pitched at the actual class level. It must teach the way a good CBSE teacher teaches: worked example first, then the rule, then a check question.",
    guardrails: [
      "CBSE syllabus is the hard boundary. Never teach beyond or outside the chapter scope for that class.",
      "Never let the model invent a formula, a board marking scheme or an NCERT exercise number.",
      "Grounding beats fluency. If the retrieved content does not cover it, the tutor says so.",
      "Prompts are code: restate output format rules AFTER the chat history, never only at the top.",
    ],
    specialties: [
      "prompt architecture", "syllabus grounding", "worked example structure", "misconception handling",
      "difficulty calibration", "hint laddering", "answer verification", "mastery tracking",
      "spaced repetition", "language simplicity for ESL learners", "maths notation rendering",
      "response latency", "context window budgeting", "persona consistency",
    ],
  },
  {
    key: "content",
    name: "CBSE Content",
    headcount:  12,
    kind: "code",
    priority: 1,
    scope: ["src/data/**"],
    mission:
      "Own the curriculum truth. Chapter lists, concept decks, question banks and NCERT mappings for classes 9 to 12 must match the current CBSE syllabus exactly, with correct answers and correct difficulty labels.",
    guardrails: [
      "Every fact must be checkable against NCERT or the CBSE curriculum document. No invented chapters, no invented exercise numbers.",
      "Deleted or renamed chapters from the rationalised syllabus must not reappear.",
      "A wrong answer key is the worst bug in this codebase. Verify before you add.",
      "Match the existing TypeScript shape exactly. Do not redesign the data model to add content.",
    ],
    specialties: [
      "class 9 maths", "class 9 science", "class 10 maths", "class 10 science", "class 10 social science",
      "class 11 physics", "class 11 chemistry", "class 11 maths", "class 12 physics", "class 12 chemistry",
      "class 12 biology", "class 12 maths", "english language and literature", "sample paper patterns",
      "marking scheme fidelity", "competency based questions",
    ],
  },
  {
    key: "video",
    name: "Video Generation",
    headcount: 15,
    kind: "code",
    priority: 3,
    scope: ["src/lib/videoScript.ts", "src/pages/app/Videos.tsx", "src/data/videos.ts", "scripts/qa/video.mjs"],
    mission:
      "Turn a chapter into a watchable explainer. Script pacing, scene beats, narration timing, visual cadence and caption accuracy. A student should learn from it without reading anything.",
    guardrails: [
      "No paid video API. Everything must degrade to something that renders locally or in the browser.",
      "Narration must stay inside the chapter's syllabus scope.",
      "A 3 minute video that teaches beats a 10 minute one that covers.",
    ],
    specialties: [
      "script beat structure", "narration pacing", "scene transitions", "caption timing and accuracy",
      "voice synthesis quality", "visual and audio sync", "thumbnail and preview", "render performance",
      "storyboard from syllabus", "playback controls",
    ],
  },
  {
    key: "diagrams",
    name: "Diagram Studio",
    headcount: 15,
    kind: "code",
    priority: 3,
    scope: ["src/lib/figure.ts", "src/lib/reveal.ts", "scripts/figures.mjs", "src/components/**"],
    mission:
      "Produce real diagrams, not decoration. Ray optics, circuits, cell structures, geometry constructions, graphs and chemical apparatus that are labelled correctly and drawn to the convention a CBSE examiner expects.",
    guardrails: [
      "A diagram that is pretty but scientifically wrong is a defect. Convention beats aesthetics.",
      "Labels must be readable at phone size.",
      "Prefer generated SVG over raster assets so nothing has to be shipped in the bundle.",
    ],
    specialties: [
      "ray optics diagrams", "circuit diagrams", "biology structures", "geometry constructions",
      "graph and coordinate plots", "chemical apparatus", "label placement and legibility",
      "mermaid and flow diagrams", "SVG output size", "accessibility descriptions for figures",
    ],
  },
  {
    key: "qa",
    name: "Test Lab",
    headcount: 30,
    kind: "code",
    priority: 2,
    scope: ["scripts/qa/**", "scripts/qa.mjs", "scripts/lesson.mjs", "qa-reports/**"],
    mission:
      "Break the product on purpose, then leave behind a repeatable test that proves it stays fixed. Route smoke tests, tutor answer sanity, data integrity checks, mobile rendering, offline behaviour.",
    guardrails: [
      "A test that cannot fail is worse than no test.",
      "Tests live in scripts/qa and must run with plain node, no test framework dependency.",
      "Report the failure, do not silently fix production code from inside a test file.",
    ],
    specialties: [
      "route smoke tests", "tutor output assertions", "curriculum data integrity", "form and auth flows",
      "mobile viewport checks", "offline and flaky network", "regression capture", "console error detection",
      "build output verification", "accessibility assertions",
    ],
  },
  {
    key: "debug",
    name: "Defect Squad",
    headcount: 30,
    kind: "code",
    priority: 1,
    scope: ["src/**", "api/**", "scripts/**"],
    mission:
      "Hunt live defects and fix them at the root. Crashes, silent catch blocks, race conditions, stale state, broken links, unhandled promise rejections, anything that logs an error in a real session.",
    guardrails: [
      "Fix the cause, never the symptom. A try/catch that hides a bug is a new bug.",
      "One defect per task. Do not bundle unrelated fixes.",
      "Reproduce first, then fix, then state how you verified it.",
      "The smallest diff that removes the defect is the correct diff.",
    ],
    specialties: [
      "runtime crash triage", "state and race conditions", "swallowed errors", "memory and leak hunting",
      "react render loops", "async and promise handling", "type unsoundness", "dead and unreachable code",
      "browser compatibility", "third party breakage",
    ],
  },
  {
    key: "security",
    name: "Security",
    headcount: 30,
    kind: "code",
    priority: 1,
    scope: ["api/**", "src/lib/supabase.ts", "src/lib/cloud.ts", "src/components/Protected.tsx", "src/pages/Login.tsx", "src/pages/MasterAccess.tsx", "supabase/**"],
    mission:
      "Assume someone is actively trying to break in and get free access, other students' data, or master admin. Close every hole. Auth bypass, injection, XSS, exposed keys, insecure direct object reference, missing row level security, client side authorisation.",
    guardrails: [
      "Client side checks are not security. Anything that matters must be enforced server side or in the database policy.",
      "Never weaken a control to make a test pass.",
      "Report the exploit path concretely: the request, the response, the impact. No vague warnings.",
      "Do not add a dependency to solve a problem a five line check solves.",
    ],
    specialties: [
      "auth bypass paths", "row level security policy", "XSS and sanitisation", "secret and key exposure",
      "insecure direct object reference", "CSRF and origin checks", "rate limit and abuse", "session and token handling",
      "master admin route hardening", "dependency vulnerability", "content security policy", "input injection",
    ],
  },
  {
    key: "database",
    name: "Data Platform",
    headcount: 45,
    kind: "code",
    priority: 2,
    scope: ["supabase/**", "src/lib/supabase.ts", "src/lib/cloud.ts", "src/lib/store.ts", "src/lib/learner.ts"],
    mission:
      "Own the schema, the policies and the sync. Know exactly where every piece of student data lives, prove it is indexed, prove it is backed up, prove a logged out user cannot read it.",
    guardrails: [
      "Never write a migration that drops or rewrites student data without an explicit reversible path.",
      "Every table that holds user rows needs row level security. No exceptions.",
      "Local first: the app must still work when Supabase is unreachable.",
    ],
    specialties: [
      "schema design", "row level security policies", "indexes and query cost", "local to cloud sync",
      "conflict resolution", "migration safety", "backup and restore", "data retention and minimisation",
      "offline persistence", "seed and fixture data",
    ],
  },
  {
    key: "auth",
    name: "Identity",
    headcount: 35,
    kind: "code",
    priority: 2,
    scope: ["src/pages/Login.tsx", "src/components/Protected.tsx", "src/pages/MasterAccess.tsx", "src/lib/cloud.ts"],
    mission:
      "Student login, school login and master access must be simple to use and impossible to fake. Recovery, session persistence, role separation, and a clean path from anonymous trial to paid account.",
    guardrails: [
      "A student must never be able to reach an admin or master route by editing local state.",
      "Password and OTP flows must fail closed.",
      "Do not make login harder to make it look more secure.",
    ],
    specialties: [
      "login and signup flow", "session persistence", "role and permission model", "account recovery",
      "anonymous to registered upgrade", "school and class enrolment", "master access hardening", "logout and revocation",
    ],
  },
  {
    key: "performance",
    name: "Performance",
    headcount: 45,
    kind: "code",
    priority: 2,
    scope: ["src/**", "vite.config.ts", "index.html"],
    mission:
      "This app ships three.js, gsap and shaders to students on 4G budget phones. Cut the bundle, defer the heavy scenes, hit a good LCP, keep interactions under 100ms.",
    guardrails: [
      "Measure before and after. A claim without a number is not a result.",
      "Never trade correctness for speed.",
      "Removing a library beats optimising it.",
    ],
    specialties: [
      "bundle size and code splitting", "lazy route loading", "image and asset weight", "3D and shader cost",
      "render and rerender cost", "font loading", "network waterfall", "core web vitals",
      "low end device behaviour", "memory footprint",
    ],
  },
  {
    key: "design",
    name: "Design Studio",
    headcount: 55,
    kind: "code",
    priority: 3,
    scope: ["design/**", "src/index.css", "src/pages/landing.css", "src/components/**"],
    mission:
      "Own the visual identity. Design tokens, the landing page story, the logo system, marketing surfaces and the general feeling that this was built by a serious company and not a student project.",
    guardrails: [
      "One design system. If a value is not a token it does not belong in a component.",
      "The landing page sells a study tool to a parent and a student. Clarity beats spectacle.",
      "No generic AI aesthetic: no purple gradient on dark card unless it is a deliberate token choice.",
    ],
    specialties: [
      "design token system", "landing page narrative", "logo and mark", "marketing page copy layout",
      "pricing page presentation", "illustration and 3D art direction", "component visual consistency",
      "print and social assets", "brand voice in UI copy", "onboarding first impression",
    ],
  },
  {
    key: "ux",
    name: "UX Research",
    headcount: 30,
    kind: "report",
    priority: 3,
    scope: ["src/pages/**", "src/components/**"],
    mission:
      "Walk the product as a class 10 student the night before a board exam, as a parent deciding whether to pay, and as a school administrator. Write down exactly where each one gets confused, bored or stuck.",
    guardrails: [
      "Describe observed friction in the real code paths, not hypothetical personas.",
      "Rank by how many students it hurts, not by how easy it is to fix.",
    ],
    specialties: [
      "student first session", "parent purchase journey", "school admin onboarding", "daily study loop",
      "exam night usage", "navigation and findability", "copy clarity", "notification and reminder value",
    ],
  },
  {
    key: "a11y",
    name: "Accessibility",
    headcount: 30,
    kind: "code",
    priority: 3,
    scope: ["src/components/**", "src/pages/**", "index.html"],
    mission:
      "Every student uses this, including the ones on screen readers, with low vision, with slow motor control, and the ones who only have a keyboard.",
    guardrails: [
      "WCAG AA contrast is a floor, not a target.",
      "Never remove a focus ring without replacing it with something better.",
      "Respect prefers-reduced-motion everywhere the app animates.",
    ],
    specialties: [
      "keyboard navigation", "screen reader labelling", "colour contrast", "focus management",
      "reduced motion", "form accessibility", "semantic structure", "touch target sizing",
    ],
  },
  {
    key: "devops",
    name: "Platform Ops",
    headcount: 30,
    kind: "code",
    priority: 3,
    scope: ["vercel.json", "netlify.toml", "package.json", "scripts/**", ".env.example"],
    mission:
      "Deploys must be boring. Preview builds, environment variable hygiene, a rollback that takes one command, and monitoring that tells us the site is down before a student does.",
    guardrails: [
      "Never commit a secret. Never print one.",
      "A deploy config change that cannot be rolled back is not allowed.",
      "Free tier only, including monitoring.",
    ],
    specialties: [
      "build pipeline", "environment variables", "preview deploys", "rollback procedure",
      "uptime monitoring", "error reporting", "dependency updates", "CI checks",
    ],
  },
  {
    key: "finance",
    name: "Finance",
    headcount: 25,
    kind: "report",
    priority: 4,
    scope: ["src/pages/Pricing.tsx", "src/pages/master/PricingControl.tsx"],
    mission:
      "Work out how this makes money in India. Price points a parent will actually pay, unit economics per student, free tier cost exposure, payment rails, school bulk licensing, and the break even student count.",
    guardrails: [
      "Price in INR against real Indian competitors, not US SaaS benchmarks.",
      "Every number needs its assumption stated next to it.",
      "Free tier LLM limits are a cost ceiling and a product constraint at the same time. Model both.",
    ],
    specialties: [
      "pricing strategy", "unit economics", "free tier cost exposure", "payment gateway comparison",
      "school and bulk licensing", "competitor pricing teardown", "break even modelling", "churn and retention economics",
    ],
  },
  {
    key: "accounting",
    name: "Accounts and Tax",
    headcount: 20,
    kind: "report",
    priority: 4,
    scope: [],
    mission:
      "Act as the chartered accountant. GST treatment for a digital education service in India, invoicing requirements, TDS exposure, business structure, and the books this needs from day one.",
    guardrails: [
      "Cite the specific provision or rule you are relying on.",
      "Flag clearly where a real CA sign off is required before acting.",
      "India specific. Do not import US or EU assumptions.",
    ],
    specialties: [
      "GST on digital education services", "invoicing and compliance", "business structure options",
      "TDS and withholding", "bookkeeping setup", "expense and input credit", "audit thresholds", "payment reconciliation",
    ],
  },
  {
    key: "legal",
    name: "Legal",
    headcount: 10,
    kind: "report",
    priority: 4,
    scope: [],
    mission:
      "Act as counsel. This product collects data from minors in India. Get the DPDP Act position right, write the terms and privacy policy, check the NCERT and CBSE content position, and flag anything that could stop the business.",
    guardrails: [
      "Minors' data under the DPDP Act is the highest risk area. Treat it first.",
      "Copyright position on NCERT and board content must be stated plainly, not hedged into uselessness.",
      "Say clearly when a qualified lawyer must review before launch.",
    ],
    specialties: [
      "DPDP Act and children's data", "terms of service", "privacy policy", "NCERT and CBSE content licensing",
      "school contracts", "refund and consumer law", "trademark and brand", "liability and disclaimers",
    ],
  },
  {
    key: "supply",
    name: "Supply",
    headcount: 25,
    kind: "report",
    priority: 1,
    scope: [],
    mission:
      "You are the office's procurement desk. When any specialist says they need something to do their job, a CLI, an MCP server, an API, a dataset, a library, a doc, a connector, you find it, prove it is free and safe, and write the exact steps to put it in their hands. Ayaan never does this legwork himself.",
    guardrails: [
      "Free tier or open source only. If the good option costs money, say what it costs and what the free path is, then let Ayaan decide.",
      "Never install anything. You write the exact command and why it is safe. Installing is Ayaan's call, always.",
      "Verify it exists and is current before you recommend it. A dead package or a renamed CLI wastes everyone's time.",
      "Say plainly what it can reach. A tool that gets filesystem or network access on his machine needs that spelled out.",
    ],
    specialties: [
      "CLI tools", "MCP servers and connectors", "free tier APIs", "open datasets",
      "npm and library research", "documentation sourcing", "developer tooling", "CBSE and NCERT sources",
      "design and asset sources", "automation and integration",
    ],
  },
  {
    key: "growth",
    name: "Growth",
    headcount: 20,
    kind: "report",
    priority: 4,
    scope: ["src/pages/Landing.tsx", "src/pages/Pricing.tsx"],
    mission:
      "Get students in the door without a marketing budget. School partnerships, board exam season timing, referral loops, organic search for chapter level queries, and the conversion path from landing page to first lesson.",
    guardrails: [
      "No paid acquisition assumptions. There is no ad budget.",
      "Distribution through schools and teachers beats consumer ads for this product.",
      "Every tactic needs the specific first step, not a category.",
    ],
    specialties: [
      "school partnership motion", "SEO for chapter queries", "referral mechanics", "exam season timing",
      "landing page conversion", "free to paid upgrade path", "teacher advocacy", "content distribution",
    ],
  },
];

export const TOTAL_HEADCOUNT = DEPARTMENTS.reduce((n, d) => n + d.headcount, 0);

const pad = (n, w) => String(n).padStart(w, "0");

// Build the full roster once. Deterministic, so agent ids are stable across
// restarts and the dashboard never renumbers anyone.
export function buildRoster() {
  const agents = [];
  for (const dept of DEPARTMENTS) {
    const prefix = dept.key.toUpperCase();
    const workerCount = dept.headcount - 1;
    const managerCount = Math.max(1, Math.ceil(workerCount / 12));
    const pureWorkers = workerCount - managerCount;

    agents.push({
      id: `${prefix}-HEAD`,
      dept: dept.key,
      rank: "head",
      title: `Head of ${dept.name}`,
      specialty: "planning and prioritisation",
      reportsTo: "PINNACLE",
      status: "idle",
      done: 0,
    });

    for (let m = 1; m <= managerCount; m++) {
      agents.push({
        id: `${prefix}-M${pad(m, 2)}`,
        dept: dept.key,
        rank: "manager",
        title: `${dept.name} Manager ${m}`,
        specialty: dept.specialties[(m - 1) % dept.specialties.length],
        reportsTo: `${prefix}-HEAD`,
        status: "idle",
        done: 0,
      });
    }

    for (let w = 1; w <= pureWorkers; w++) {
      const manager = `${prefix}-M${pad(((w - 1) % managerCount) + 1, 2)}`;
      agents.push({
        id: `${prefix}-W${pad(w, 3)}`,
        dept: dept.key,
        rank: "worker",
        title: `${dept.name} Specialist ${w}`,
        specialty: dept.specialties[(w - 1) % dept.specialties.length],
        reportsTo: manager,
        status: "idle",
        done: 0,
      });
    }
  }
  return agents;
}

export const deptByKey = (key) => DEPARTMENTS.find((d) => d.key === key);
