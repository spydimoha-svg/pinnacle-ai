# touch target sizing

What the a11y specialists in this seat have learned working on Pinnacle AI.
- ui.tsx got silently reverted to its pre-edit state mid-task, presumably from another concurrent process touching the same file. Whoever edits this file next should git diff immediately after editing, not just after Read, since a Read-then-Edit can pass even if the file was reverted between your Edit call and your verification step.
