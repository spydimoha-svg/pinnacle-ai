# row level security policy

What the security specialists in this seat have learned working on Pinnacle AI.
- api/state.ts's isRateLimited() has no in-memory-only fallback path when url/serviceKey are unset like chat.ts does — it assumes Supabase is configured (checked earlier in the handler), so don't port that guard blindly if editing this file again.
