# streaming correctness

What the backend specialists in this seat have learned working on Pinnacle AI.
- netlify/functions is NOT in tsconfig's include (only src and api are), so tsc --noEmit never typechecks this file — Netlify's esbuild bundler at deploy time only transpiles, it doesn't typecheck either. Don't assume a green tsc run covers this directory.
- Netlify Functions v2 pass a context object as the second handler argument with an ip field set by Netlify's own edge (not client-spoofable) — no @netlify/functions package is installed for its types, so it's typed inline here rather than imported.
- api/chat.ts's isSameOrigin changed underneath this task mid-flight (someone else's concurrent edit added a Sec-Fetch-Site check and switched Origin/Referer from OR to AND) — always re-read the reference file right before finishing, not just at the start.
