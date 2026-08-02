const LEAKED_HEADINGS =
  /^\s{0,3}(?:#{1,6}|\*{1,3})\s*(?:the one idea|worked example|re-?ask[^\n]*|what has to land|the idea|check question|hard rules?|shape of this reply|use this worked example|draw this figure|your reply|instructions?)\s*:?\s*\*{0,3}\s*:?\s*$/gim;

const cases = [
  ["### Worked example:", ""],
  ["**Worked example:**", ""],
  ["**Re-ask exactly what they got wrong:**", ""],
  ["#### Re-ask exactly what they got wrong here:", ""],
  ["**The one idea:**", ""],
  ["*Check question:*", ""],
  ["**Hard rules:**", ""],
  ["Normal sentence with worked example in it, not a heading.", "Normal sentence with worked example in it, not a heading."],
];

let ok = true;
for (const [input, expected] of cases) {
  const stripped = input.replace(LEAKED_HEADINGS, "").trim();
  const pass = stripped === expected;
  if (!pass) ok = false;
  console.log(pass ? "PASS" : "FAIL", JSON.stringify(input), "->", JSON.stringify(stripped));
}
process.exit(ok ? 0 : 1);
