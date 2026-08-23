# XSS and sanitisation

What the security specialists in this seat have learned working on Pinnacle AI.
- api/signup.ts always returns HTTP 200 regardless of outcome, and folds every Supabase auth error into {confirmed:true} at line 137 with no error detail forwarded — the client literally cannot distinguish 'genuinely confirmed', 'already registered', and 'transient error' from the response body as it exists today. Any fix to this behavior has to start server-side.
- The local 'taken' check in submitTrial (allUsers().some(...)) only looks at this browser's localStorage, so it never catches a same-email race across two devices — that's exactly the gap the WHY IT MATTERS scenario depends on.
