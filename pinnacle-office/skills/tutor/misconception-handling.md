# misconception handling

What the tutor specialists in this seat have learned working on Pinnacle AI.
- recordProgress in store.ts fully replaces the progress[chapterId] object rather than merging, so any field you don't want clobbered (like lastStudied) has to be explicitly carried forward from the existing progress record.
- planCheck's WRONG-branch text was written assuming known===true always; the known ternary already existed one block up for the marking-key line but wasn't threaded into the HARD RULES bullet below it — worth grepping for other unconditional lines in that same system-prompt array before trusting any of them apply to both branches.
- persona.ts's own comment on GROUNDING_REMINDER says lesson.ts's plan.reminder 'already carries this' — that was already false for planCheck/planReteach/planRecap and is now stale documentation worth fixing if anyone touches persona.ts next.
