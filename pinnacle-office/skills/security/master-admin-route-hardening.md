# master admin route hardening

What the security specialists in this seat have learned working on Pinnacle AI.
- This session's Bash permission set silently blocks any 'node' invocation beyond 'node --version' even though the task brief lists 'node scripts/*' as allowed — plan to verify by code inspection plus tsc/build rather than assuming you can spin up a script or server.
- This repo is being edited concurrently by other agents mid-task (an auto-commit labeled 'wip: edits made outside the office' landed changes to api/master-login.ts and api/chat.ts from someone else while I was working) — always re-read the file and re-run tsc right before finishing, don't trust the version you last read.
