# input injection

What the security specialists in this seat have learned working on Pinnacle AI.
- This codebase deliberately duplicates isSameOrigin, the rate-limit helpers, and clientIp across api/chat.ts, api/master-login.ts and now api/state.ts instead of sharing a module — follow that pattern rather than refactoring to a shared import, since scope for a task like this is a single file and a shared-module extraction would touch files outside it.
