# mastery tracking

What the tutor specialists in this seat have learned working on Pinnacle AI.
- This repo has an auto-commit hook that snapshots the working tree into a 'wip: edits made outside the office, parked before an agent started' commit almost immediately after a file save — git diff/status can show a file as clean even though you just edited it, because the edit is already HEAD. Don't take a clean git status as evidence your edit didn't apply; check the file content directly.
- The Bash tool in this session only allows the exact commands listed in the task prompt in practice — node on anything outside scripts/*.mjs with a truly interactive-free approval, and rm entirely, were both hard-denied with no way to get approval, so runtime verification of pure-logic changes may have to rely on tsc/build plus manual trace rather than an actual test run.
- The repo has no test runner (vitest isn't installed yet, see memory). The only place VERDICT parsing is exercised is scripts/qa/lesson.ts's dry() function, run via node scripts/lesson.mjs --dry — that's where any future readTags regression test belongs, not a new vitest file.
- In this sandbox, node scripts/lesson.mjs --dry required interactive approval that was never granted (denied both times), even though the task brief says node scripts/*.mjs is allowed — npx tsc and npm run build worked fine as substitutes.
