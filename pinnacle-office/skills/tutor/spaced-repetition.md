# spaced repetition

What the tutor specialists in this seat have learned working on Pinnacle AI.
- MAX_GROUNDING_CHARS is a module-level const declared textually after buildCurriculumGrounding originally; moved it above the function it's now used inside for readability, though it worked either way since the function body only executes on later calls, not at module load.
- Tutor.tsx only has one call site that passes startChapterId to send() (the autoPrompt effect), so the guard could go there instead of inside send() itself, keeping the diff to the effect rather than the shared send path.
