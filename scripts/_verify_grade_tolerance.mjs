import { createRequire } from "module";
const require = createRequire(import.meta.url);
const g = require("C:/pinnacle ai/.grade_tolerance_check/grade.js");

let ok = true;
function check(label, question, correct, student, expectMark) {
  const { mark } = g.gradeAnswer(question, correct, student);
  const pass = mark === expectMark;
  if (!pass) ok = false;
  console.log(pass ? "PASS" : "FAIL", label, "->", mark, "expected", expectMark);
}

check("decimal within tolerance of fraction", "What is 1/3?", "1/3", "0.33", "correct");
check("decimal far from fraction", "What is 1/3?", "1/3", "0.5", "wrong");
check("sign error still detected", "Solve x - 2 = 0", "x = 2", "x = -2", "wrong");
check("exact integer still correct", "What is 2+2?", "4", "4", "correct");

process.exit(ok ? 0 : 1);
