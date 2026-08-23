# syllabus grounding

What the tutor specialists in this seat have learned working on Pinnacle AI.
- Before touching lesson.ts, grep for groundedSource( first — it's already threaded through planTeach, planCheck and planReteach, so a repeat task here is a no-op, not a bug.
- The `!plan` guard on the lastTopics write already suppresses every lesson-phase turn, not just check — so a repeat 'stop recording chip text' task here is a no-op. The gap left behind was that it also suppressed the legitimate lesson-start message, so lastTopics went silent for anyone using the lesson flow. Check for that regression before assuming the guard alone is the fix.
- `lessonMap(active)?.chapterTitle` (already imported in Tutor.tsx, used for the on-screen lessonTitle) is the source of truth for the chapter name — use it instead of truncating the raw prompt text.
- scoreChapter's chNo check ran last and was unconditional, so it double-counted as the sole signal for every subject sharing that chapter number — gating it on score>0 (computed from the same function's earlier lines) was enough, no restructuring needed.
