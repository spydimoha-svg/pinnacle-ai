# rate limit and abuse

What the security specialists in this seat have learned working on Pinnacle AI.
- api/state.ts and api/master-login.ts both already guarantee Supabase is configured before isRateLimited runs (they 503 otherwise), so unlike api/chat.ts they don't need an in-memory fallback branch at all — keep that asymmetry in mind if refactoring the three into a shared helper.
- api/signup.ts's password check shares one line with several other validations (name, email) and returns a single generic 'Invalid request' message for all of them — there's no way to give a distinct 'password too short' message server-side without restructuring that block, so full client/server message parity only exists because the client-side check runs first.
