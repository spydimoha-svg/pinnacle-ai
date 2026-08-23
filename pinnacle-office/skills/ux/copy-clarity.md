# copy clarity

What the ux specialists in this seat have learned working on Pinnacle AI.
- The default password isn't just a UI placeholder — linkCloudProfile (store.ts:196-213) calls supabase.auth.updateUser with whatever is in the password field, so an admin who clicks through without editing it sets a real, working Supabase Auth password to "pinnacle123" for that student.
- There is no password-change-required flag or first-login gate anywhere in the codebase (verified by grep) — whatever password the admin sets at creation is permanent until manually changed by re-running enrolment.
- Blob is the daily journal that feeds the tutor's memory (per the charter), not a throwaway feature — its nav label gives no hint of that, which is a separate copy problem from the ordering one.
- 'Learn Better' is the entrance-exam mode (JEE/NEET/CUET/SAT) per config, not a generic study tip page — its label doesn't say that either, and it's actively misleading for a board-exam-only persona who might click it expecting exam tips.
- LessonVideo (lib/videoScript.ts:30-37) already carries castId, so a persisted lesson is self-contained for redisplay — it's missing only an id and the language it was generated in (createdLang is separate component state at Videos.tsx:57, not part of the type).
