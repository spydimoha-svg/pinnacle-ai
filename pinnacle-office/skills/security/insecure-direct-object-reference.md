# insecure direct object reference

What the security specialists in this seat have learned working on Pinnacle AI.
- The rate limit map is in-memory per serverless instance, so on Vercel with multiple concurrent instances the effective global ceiling is higher than 20/min if requests land on different instances — same caveat already true for chat.ts and master-login.ts, not something this task needed to fix.
- Login.tsx's non-cloud path (`login(email, password)`) sets role purely from the local store with no server backing it at all, so when Supabase isn't configured there is no legitimate way for a browser to prove admin — deny is the only correct behavior, not a stub check.
- The admin session token students never see is already sitting in localStorage as pinnacle-admin-token (set by Login.tsx, checked by Protected.tsx) — reuse that key rather than inventing a new one, cloud.ts doesn't need to import supabase.ts's client for this at all since the server does the verification.
