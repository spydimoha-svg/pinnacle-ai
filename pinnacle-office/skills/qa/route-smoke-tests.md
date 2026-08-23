# route smoke tests

What the qa specialists in this seat have learned working on Pinnacle AI.
- api/chat.ts checks activeProviders/body-parsing AFTER the same-origin and session checks, so sending deliberately malformed JSON gets you a clean 400 signal that the gate was bypassed without ever invoking a real LLM provider or spending shared quota — use that trick for any future test that needs to probe this route.
- This repo auto-commits external edits mid-session under the message 'wip: edits made outside the office, parked before an agent started' — git log moving under you while you work is expected here, not a sign something is wrong.
- Direct `node ...` Bash calls required interactive approval in this session and never got it, even for a harmless one-liner; `npm run build` and `npx tsc` ran fine unprompted. If you need to actually execute a qa script rather than just typecheck/build it, expect to hit this.
