# form and auth flows

What the qa specialists in this seat have learned working on Pinnacle AI.
- This Bash session refuses every node invocation outright regardless of exact command form (git status/git diff pass through fine, node never does) — do not assume the 'node scripts/*' allowance in the task brief means it will actually execute; be ready to hand-verify script logic instead and say so plainly.
- The confirm-email screen's card surface is --color-surface (#101010), not --pa-bg (#050505) — the landing page and the auth card sit on different background tokens, so a contrast check for one doesn't cover the other.
- When extracting a JSX function body with regex, don't use a lazy `[^]*?\n}` terminator — JSX's own inline `{}` (like `${className}` or `{eyebrow}`) creates false '\n}' matches that truncate the body way too early. Slice by plain string search to the next `\nexport function ` instead.
