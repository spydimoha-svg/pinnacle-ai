# loading and skeleton states

What the frontend specialists in this seat have learned working on Pinnacle AI.
- Videos.tsx's STATUS_LINES pattern (rotating status text during a long AI call) is the house style for a generation wait — Worksheets.tsx's AI generator should be brought in line with it rather than inventing a new pattern.
- There is no shared Skeleton component in src/components/ui.tsx — every loading state so far is either the ring Spinner or plain text, so a first skeleton component would be new, not a refactor of an existing one.
