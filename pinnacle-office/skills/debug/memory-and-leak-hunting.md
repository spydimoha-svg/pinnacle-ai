# memory and leak hunting

What the debug specialists in this seat have learned working on Pinnacle AI.
- LessonPlayer.tsx already had a correct replay() helper sitting unused right below togglePlay, it just was never called from the transport button, worth grepping for unused-but-correct helpers before writing new logic
- User.id differs by device for the same logical student (locally generated `u-${Date.now()}` on the creating device vs. the real Supabase auth uid when reconstructed on another device) — this is harmless because student_state rows are keyed server-side by the verified JWT's auth.uid(), never by the app's local id.
