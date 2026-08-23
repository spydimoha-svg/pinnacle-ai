# build output verification

What the qa specialists in this seat have learned working on Pinnacle AI.
- The redesign commit (52dd5c0) only touched .card-hover in src/index.css: it moved from `transition-colors` + `hover:border-gold-dim` to a transform-based lift (translate3d -2px, box-shadow glow) with a matching :active settle. Test that block specifically, not the whole file.
- In this session, Bash silently gates every `node <anything>` invocation except the literal `node --version` behind an approval step that never resolves, even though the task brief lists `node scripts/*` as pre-approved. `npx tsc` and `git status`/`git diff` work fine. Worth flagging to whoever owns the sandbox config before assigning more Test Lab tasks that need script execution.
