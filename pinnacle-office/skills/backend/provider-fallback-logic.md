# provider fallback logic

What the backend specialists in this seat have learned working on Pinnacle AI.
- api/master-login.ts's rate limit state (attemptTimestamps Map) is in-memory per function instance, not shared across Vercel's serverless instances or regions, so the real-world throttle is weaker than the 5-per-window number suggests if traffic spreads across cold starts. Worth knowing if someone later treats this as a hard guarantee.
