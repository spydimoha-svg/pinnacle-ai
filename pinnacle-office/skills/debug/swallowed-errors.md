# swallowed errors

What the debug specialists in this seat have learned working on Pinnacle AI.
- Profile.tsx's Save-button disabled check already compares target.trim() against memory.targetScore, so the only actual bug was the input never re-seeding after mount — worth checking other useState(memory?.x ?? ...) seeds in this file for the same pattern if CloudSync ever hydrates more fields late.
