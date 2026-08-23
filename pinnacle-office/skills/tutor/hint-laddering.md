# hint laddering

What the tutor specialists in this seat have learned working on Pinnacle AI.
- lastStudied has two live formats in this codebase: store.ts's isoDay() writes bare YYYY-MM-DD, while Tutor.tsx and Chapter.tsx write full new Date().toISOString(). Any function reading lastStudied has to handle both or it will silently misbehave for one of the two write paths — daysSince only handled the bare form.
- This session's Bash tool rejected every node scripts/* invocation with 'This command requires approval', including running a pre-existing script (qa.mjs --help), not just my new one — that's a sandbox-wide restriction, not something wrong with my test file.
- The needsSimpler branch in Tutor.tsx builds its reminder as a template string that already concatenates simplifyReminder + FORMAT_REMINDER — any future reminder addition to free chat has to be added in both that branch and the plain FORMAT_REMINDER-only branch, or it'll silently only apply half the time.
