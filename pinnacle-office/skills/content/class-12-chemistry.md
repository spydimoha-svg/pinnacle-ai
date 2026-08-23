# class 12 chemistry

What the content specialists in this seat have learned working on Pinnacle AI.
- There's a second file, src/data/questions/c12mathsC11.ts, that also contains a couple of c11-chemistry questions (chapters 01 and 04) — it's out of scope for this task but means chapter 04 isn't fully empty across the whole app, only in c11.ts.
- The queue handed me a task that commit e4c25b1 (content: Add a second verified question to every Class 12 Maths chapter) already fully completed — worth checking git log on the target file before starting any 'add a second question' task in this content area.
- The rationalised NCERT PDF is fetchable at ncert.nic.in/textbook/pdf/jemh105.pdf and WebFetch saves the binary to a local tool-results file when it can't parse it inline — run readdoc on that saved path instead of re-fetching, it gets clean OCR text with page markers.
- Chapter 5 AP has no deletions from the pre-rationalised book except that Exercise 5.4 (5 problems) is explicitly marked optional/non-examinable in the book itself, unlike Chapter 1 and Chapter 4 where whole sections were physically cut.
