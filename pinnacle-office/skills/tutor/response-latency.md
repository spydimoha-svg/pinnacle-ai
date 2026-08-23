# response latency

What the tutor specialists in this seat have learned working on Pinnacle AI.
- This repo has zero test infrastructure (no vitest/jest configured anywhere, confirmed via package.json), so any 'add a unit test' acceptance criterion for src/lib/* currently can't be satisfied literally without first standing up a test runner, which is outside a single narrow task's scope.
- grounding.ts's hasWord was module-private; it is now exported so lesson.ts can share it instead of re-implementing the same escape+regex logic a second time.
