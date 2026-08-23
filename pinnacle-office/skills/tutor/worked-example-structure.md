# worked example structure

What the tutor specialists in this seat have learned working on Pinnacle AI.
- The prompt text itself is what triggers startLesson via detectLessonIntent's fuzzy title match in lib/lesson.ts, so reusing the exact same prompt string through router state (instead of chapterId directly) meant zero changes to lesson.ts were needed.
- Tutor.tsx clears location.state via navigate(pathname, {replace:true, state:null}) right after reading it, so a page refresh or back-navigation never resends the lesson prompt.
- readMark's bare-word fallback (/\bcorrect\b|\bright\b/) runs after the incorrect/wrong check, so negation has to be tested before that fallback, not folded into it, or 'not wrong' style replies get double-negated wrong.
