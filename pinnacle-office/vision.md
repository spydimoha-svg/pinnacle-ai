# What we are building

Read this before you plan or pick up anything. The charter says what you may not
do. This says what we are trying to become, so you can work out for yourself
what is worth doing. Ayaan owns this document. Agents can never edit it.

## The company

Pinnacle AI is a CBSE tutoring web app for Indian students in classes 9 to 12.
It teaches the way the boards actually mark: NCERT-rooted explanations,
marking-scheme answers with examiner keywords, past-paper practice, generated
worksheets, narrated lesson videos, an entrance mode for JEE, NEET, CUET and
SAT, and a daily journal that feeds the tutor's memory of each student.

It runs on free LLM providers behind one serverless function, with automatic
fallback. It is live at pinnacle-ai-two.vercel.app.

## Who we are for

A class 10 student on a cheap Android phone on 4G, at 11pm, the week before a
board exam, who is stuck on one question and has nobody to ask. Every decision
gets judged against that student. Not against a demo, not against a screenshot,
not against what looks impressive in a changelog.

Their parent is the one who pays, and has to be able to see within a minute that
this is worth money. Their school is the way we reach a hundred of them at once.

## What winning looks like

1. **The tutor is right.** Correct, inside the syllabus, pitched at the class,
   worked example first. A wrong answer key or an invented NCERT exercise number
   is the worst defect this codebase can have.
2. **It is fast on a bad phone.** Under three seconds to something useful, on
   4G, on a low-end device. We ship three.js and gsap to children on budget
   handsets. That is a debt, not a feature.
3. **It is trusted.** A student's data is safe, a logged-out stranger can read
   nothing, and the DPDP Act position on minors' data is defensible today, not
   after launch.
4. **It is finishable.** A student can start a chapter and know what to do next.
   Progress that goes nowhere is worse than no progress bar.
5. **It looks like a company built it.** Calm, deliberate, never busy. Premium
   without being decorative.

## What is actually wrong right now

This is the honest state. You are allowed to work on any of it without being
asked, if it is inside your department's scope.

- `/api/chat` is public and unauthenticated. The login page is a client-side
  gate only. Anyone with the URL can drain the free-tier quota that real
  students depend on.
- The master console passcode lives in `src/data/schools.ts`, which ships to the
  browser bundle. It hides `/summit`; it does not protect it.
- There is no rate limiting per IP or per user anywhere.
- Progress tracking exists per chapter, but the diagnostic and planner page that
  would make it mean something is designed and not built.
- The bundle carries three.js, gsap and shaders to students who do not need them
  on most routes.
- Supabase is optional, so two code paths exist for every read and write of
  student state. Both have to be correct and only one is usually tested.

## How to decide what to work on

Ask, in this order:

1. Does it make the tutor's answers more correct for a student on the syllabus?
2. Does it stop a student losing data, losing access, or being exposed?
3. Does it make the thing they use every day faster or clearer on a cheap phone?
4. Does it make a parent more willing to pay, or a school more willing to sign?

If a task does not answer one of those, it is decoration. File something better.

Impact is measured in students helped, not in lines changed or tasks closed.

## How we work

- Free tier or open source only, everywhere, forever. No paid API, ever, for any
  reason. This is not a budget preference, it is a hard constraint on the design.
- The shortest change that achieves the result is the correct change. A large
  diff for a small task is a signal that something unrequested came with it.
- One concern per change. Do the task you were given. If you think something
  else matters more, say so in `followups` and do your task anyway.
- Everything is reversible. Every accepted change is committed on its own so it
  can be pulled back out.
- Never claim you verified something you did not run.

## What Ayaan has asked for, standing

- The tutor is the product. It should keep getting better continuously, not in
  bursts when somebody remembers it.
- Nothing runs on a paid Anthropic key. The office runs on his Claude Code
  subscription and nothing else.
- The site must be secure with no loopholes. Assume someone is actively trying
  to get free access, other students' data, or master admin.
- Agents stay on the task they were given, and declare it in their report when
  they did not.
- Reports are for him to read, so they say what actually moved and what needs
  him to decide. No cheerleading, no filler.
