import { findNcertForQuery, buildGroundingContent } from "../src/data/ncert/index.ts";
import { unlinkSync, existsSync } from "fs";

const m = findNcertForQuery("exercise 3.2", 10);
if (!m || !m.exercise) {
  console.error("FAIL: no match or no exercise", m);
} else {
  console.log("chapterId:", m.chapter.id);
  console.log("exercise:", m.exercise.exercise);
  console.log("problemCount:", m.exercise.problems.length);
  console.log(buildGroundingContent(m).slice(0, 500));
}

const strayTs = new URL("./_verify-ncert-check.ts", import.meta.url);
if (existsSync(strayTs)) unlinkSync(strayTs);
unlinkSync(new URL(import.meta.url));
