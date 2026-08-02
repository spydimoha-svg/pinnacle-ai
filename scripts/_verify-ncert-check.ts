import { findNcertForQuery, buildGroundingContent } from "../src/data/ncert/index";

const m = findNcertForQuery("exercise 3.2", 10);
if (!m || !m.exercise) {
  console.error("FAIL: no match or no exercise", m);
  process.exit(1);
}
console.log("chapterId:", m.chapter.id);
console.log("exercise:", m.exercise.exercise);
console.log("problemCount:", m.exercise.problems.length);
console.log(buildGroundingContent(m).slice(0, 400));
