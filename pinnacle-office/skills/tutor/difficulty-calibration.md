# difficulty calibration

What the tutor specialists in this seat have learned working on Pinnacle AI.
- Tutor.tsx:184 is where the fallback lives: `plan?.maxTokens ?? (needsSimpler ? ... : 620)`. Any new lesson phase added to lesson.ts needs its own maxTokens or it silently inherits the free-chat budget rather than erroring — there's no type-level enforcement that every phase sets one.
- The second-pass generateOnce() verdict call at Tutor.tsx:285 only fires for chapters with no authored check answer (~270 of them) and is a second async gap after the main stream's genRef check at line 252 — any future async work added inside that check-phase block after the first genRef guard needs its own recheck too, since genRef is only reliable at the instant right after an await returns.
- ENTRANCE_EXAMS[].subjects strings aren't exact SUBJECTS[].name matches for NEET and SAT — NEET says 'Biology (Botany + Zoology)' and SAT says 'Reading & Writing (Evidence-based English)', so any future subject filtering against SUBJECTS needs a substring/fuzzy match, not equality.
