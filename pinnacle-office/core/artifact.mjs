// A report as something you can actually read.
//
// Every briefing was a markdown file behind a dashboard, shown as raw text in a
// modal. He asked for the report itself: a document that opens on its own when
// he asks for one. This turns the markdown into that document, once, so the
// panel in the office and the standalone page are never two different renderers
// disagreeing about the same file.

const esc = (s) => String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

// Inline marks, applied after escaping so a report can never inject markup.
const inline = (s) =>
  esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>");

export function mdHtml(md = "") {
  const out = [];
  let list = null;
  const shut = () => { if (list) { out.push(`</${list}>`); list = null; } };
  const open = (tag) => { if (list !== tag) { shut(); out.push(`<${tag}>`); list = tag; } };

  for (const raw of String(md).split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (!line.trim()) { shut(); continue; }

    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { shut(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }

    if (/^\s*>/.test(line)) { shut(); out.push(`<blockquote>${inline(line.replace(/^\s*>\s?/, ""))}</blockquote>`); continue; }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) { shut(); out.push("<hr>"); continue; }

    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ol) { open("ol"); out.push(`<li>${inline(ol[1])}</li>`); continue; }

    const ul = line.match(/^\s*[-*]\s+(.*)$/);
    if (ul) { open("ul"); out.push(`<li>${inline(ul[1])}</li>`); continue; }

    shut();
    out.push(`<p>${inline(line)}</p>`);
  }
  shut();
  return out.join("\n");
}

// The standalone page, for a new tab or a file on his desktop. Self contained:
// no fonts, no scripts, nothing fetched, so it still reads with the office shut
// and the network off.
export function artifactPage({ title, body, when }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<style>
:root{--bg:#0a0a0a;--ink:#c5b6af;--dim:rgba(197,182,175,.58);--faint:rgba(197,182,175,.34);--line:rgba(197,182,175,.2);--acid:#ebfb1d}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);
     font:300 15px/1.62 system-ui,-apple-system,"Segoe UI",sans-serif;padding:clamp(24px,6vw,88px)}
main{max-width:74ch;margin:0 auto}
.mark{font:400 9.8px/1.6 ui-monospace,"Cascadia Mono",Consolas,monospace;letter-spacing:.02em;
      color:var(--faint);text-transform:uppercase;display:flex;gap:14px;border-bottom:1px solid var(--line);
      padding-bottom:12px;margin-bottom:clamp(26px,5vw,54px)}
.mark s{flex:1;border-bottom:1px dotted var(--line);text-decoration:none;transform:translateY(-4px)}
h1{font-weight:400;text-transform:uppercase;letter-spacing:-.05em;line-height:.9;
   font-size:clamp(30px,6vw,62px);margin:0 0 .5em}
h2{font-weight:400;text-transform:uppercase;letter-spacing:-.02em;font-size:clamp(17px,2.4vw,23px);
   margin:2.2em 0 .55em;color:var(--ink)}
h3{font-weight:400;font-size:15px;margin:1.8em 0 .4em;color:var(--dim)}
p{margin:0 0 1em;color:var(--dim)}
b{font-weight:500;color:var(--ink)}
ul,ol{margin:0 0 1.2em;padding-left:1.1em;color:var(--dim)}
li{margin:0 0 .45em}li::marker{color:var(--acid)}
code{font-family:ui-monospace,"Cascadia Mono",Consolas,monospace;font-size:.88em;color:var(--acid)}
blockquote{margin:0 0 1.2em;padding:12px 16px;border-left:2px solid var(--acid);
           background:rgba(235,251,29,.05);color:var(--ink)}
hr{border:0;border-top:1px solid var(--line);margin:2.4em 0}
@media print{body{background:#fff;color:#111}p,ul,ol{color:#333}}
</style></head><body><main>
<div class="mark"><span>Pinnacle Office</span><s></s><span>${esc(when || "")}</span></div>
${body}
</main></body></html>`;
}
