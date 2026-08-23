# persona consistency

What the tutor specialists in this seat have learned working on Pinnacle AI.
- The overlap loop's haystack (`hay`) was built from title + keyTopics specifically to catch partial title-word matches when the full title phrase doesn't appear in the query — don't remove title from it, only keyTopics, or partial title matches stop contributing.
- The AI worksheet path lives entirely in Worksheets.tsx (generateAI, buildAiWorksheetPrompt, parseWorksheetJson) not in src/lib/ai.ts — ai.ts only has generateOnce as the raw model call, all worksheet-specific prompting and JSON salvage logic is local to the page component.
