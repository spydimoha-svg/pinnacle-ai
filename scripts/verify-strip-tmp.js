const fs = require("fs");
const LEAKED_ANSWER = /^\s{0,4}[-*]?\s*\*{0,2}(?:answer|correct answer|hint)\*{0,2}\s*:\s*.*$/gim;
const LEAKED_SOLUTION_LABEL = /^(\s{0,4}[-*]?\s*)\*{0,2}solution\*{0,2}\s*:\s*/gim;
function strip(text, opts = {}) {
  let out = text;
  out = out.replace(LEAKED_ANSWER, (line) =>
    opts.keepHint && /^\s{0,4}[-*]?\s*\*{0,2}hint/i.test(line) ? line : ""
  );
  out = out.replace(LEAKED_SOLUTION_LABEL, "$1");
  return out.replace(/\n{3,}/g, "\n\n").trim();
}
console.log(JSON.stringify(strip("**Solution:** Substitute x=2 into x^2-2x-8 to get -8.")));
console.log(JSON.stringify(strip("**Answer:** -3, 4")));
fs.unlinkSync(__filename);
