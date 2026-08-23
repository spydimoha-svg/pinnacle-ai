# language simplicity for ESL learners

What the tutor specialists in this seat have learned working on Pinnacle AI.
- The clicked-chapter path (startChapterId) already had the correct exact-id grounding fallback; the bug was that detectLessonIntent's matched chapterId was discarded once startLesson returned null instead of being reused the same way.
