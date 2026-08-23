# answer verification

What the tutor specialists in this seat have learned working on Pinnacle AI.
- stripScaffolding's LEAKED_TAGS regex in src/lib/grade.ts is the canonical pattern for what counts as a control line, TAG_RE in lesson.ts must stay in sync with it or this class of bug recurs silently since nothing throws, mastery just stops updating.
- The NCERT exercise answers stored in src/data/ncert/c10-maths-*.ts are a ready-made verification source for authoring concept maps: several of this chapter's check questions and examples are lifted straight from there (e.g. the 5 pencils/7 pens problem, the reversed two-digit-number problem), which is faster and safer than hand-deriving new numbers.
