import { marked } from "marked";
import markedKatex from "marked-katex-extension";
marked.use(markedKatex({ throwOnError: false, output: "html", nonStandard: true }));

const cases: [string, string][] = [
  ["single-line $$", "$$D = b^2 - 4ac$$"],
  ["multi-line $$ (newline inside)", "$$\nD = b^2 - 4ac\n$$"],
  ["multi-line $$ (content wraps)", "$$D =\nb^2 - 4ac$$"],
  ["aligned, one line", "$$\\begin{aligned}D &= 36-24 \\\\ &= 12\\end{aligned}$$"],
  ["aligned, multi-line", "$$\\begin{aligned}\nD &= 36-24 \\\\\n&= 12\n\\end{aligned}$$"],
  ["$$ on own lines, aligned", "$$\n\\begin{aligned}\nD &= 36-24 \\\\\n&= 12\n\\end{aligned}\n$$"],
];

export function main(): number {
  for (const [name, src] of cases) {
    const html = marked.parse(src) as string;
    const rendered = html.includes("katex");
    console.log(`${(rendered ? "RENDERS" : "FAILS  ").padEnd(9)} ${name}`);
  }
  return 0;
}
