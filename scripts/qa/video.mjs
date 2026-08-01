// Checks on the video script parser.
//
// Every case here is a confirmed way a small local model breaks the studio:
// collapsed mermaid indentation, a reply cut at the token ceiling, commentary
// wrapped around the JSON, a raw newline inside a string, LaTeX backslashes,
// out-of-range 3D sizes, and prose written where a plot spec belongs.
import { createServer } from "vite";
const vite = await createServer({ configFile:false, server:{middlewareMode:true,hmr:false,watch:null}, optimizeDeps:{noDiscovery:true}, appType:"custom", logLevel:"warn" });
const { parseLessonVideo } = await vite.ssrLoadModule("/src/lib/videoScript.ts");

let fail = 0;
const t = (name, fn) => { try { const r = fn(); if (r) { console.log(`  FAIL  ${name}\n        ${r}`); fail++; } else console.log(`  ok    ${name}`); } catch (e) { console.log(`  FAIL  ${name}\n        threw: ${e.message}`); fail++; } };

// 1. mermaid indentation must survive
t("an indented mermaid diagram survives intact", () => {
  const raw = JSON.stringify({ title:"T", hook:"h", scenes:[{caption:"Cycle", say:"Watch this.", visual:{type:"diagram", mermaid:"flowchart LR\n  A[Heat] --> B[Melts] --> C[Boils]"}}], recap:[] });
  const v = parseLessonVideo(raw, "T");
  const src = v.scenes[0].visual?.source ?? "";
  if (!src.includes("\n")) return `newlines collapsed: ${JSON.stringify(src)}`;
  if (!/A\[Heat\] --> B/.test(src)) return `arrows lost: ${JSON.stringify(src)}`;
  return null;
});

// 2. truncated reply must salvage scenes
t("a reply cut off at the token ceiling still yields scenes", () => {
  const raw = '{"title":"Nature of Roots","hook":"Let us go.","scenes":[{"caption":"Discriminant","say":"Look at b squared minus 4ac."},{"caption":"Zero case","say":"When it is zero the roots ar';
  const v = parseLessonVideo(raw, "Roots");
  if (v.scenes.length < 1) return "no scenes recovered";
  return null;
});

// 3. trailing commentary must not break it
t("trailing commentary after the JSON is ignored", () => {
  const raw = 'Here is the lesson {as requested}:\n```json\n{"title":"X","hook":"h","scenes":[{"caption":"A","say":"one"},{"caption":"B","say":"two"}],"recap":["q"]}\n```\nI used the caption and say fields.';
  const v = parseLessonVideo(raw, "X");
  if (v.scenes.length !== 2) return `expected 2 scenes, got ${v.scenes.length}`;
  return null;
});

// 4. a real newline inside a string must not kill the parse
t("a raw newline inside a string value is repaired", () => {
  const raw = '{"title":"X","hook":"h","scenes":[{"caption":"Cycle","say":"Watch.","visual":{"type":"diagram","mermaid":"flowchart LR\n  A --> B"}}],"recap":[]}';
  const v = parseLessonVideo(raw, "X");
  if (!v.scenes.length) return "no scenes";
  if (v.scenes[0].visual?.type !== "diagram") return "diagram lost";
  return null;
});

// 5. LaTeX with single backslashes still parses AND keeps 

t("LaTeX backslashes are repaired without eating newlines", () => {
  const B = String.fromCharCode(92); // a real backslash, immune to shell mangling
  const raw = '{"title":"X","hook":"h","scenes":[{"caption":"F","say":"Here.","formula":"' + B + 'frac{-b}{2a}"}],"recap":[]}';
  const v = parseLessonVideo(raw, "X");
  if (!v.scenes.length) return "no scenes";
  const f = v.scenes[0].formula ?? "";
  if (!f.includes("frac")) return `formula lost: ${JSON.stringify(f)}`;
  if (/[]/.test(f)) return `formula contains a control char: ${JSON.stringify(f)}`;
  return null;
});

// 6. 3D dimensions clamped
t("an out-of-range 3D dimension is clamped, not passed through", () => {
  const raw = JSON.stringify({ title:"X", hook:"h", scenes:[{caption:"Cone", say:"Look.", visual:{type:"3d", kind:"cone", a:7, b:0}}], recap:[] });
  const v = parseLessonVideo(raw, "X");
  const s = v.scenes[0].visual;
  if (s?.type !== "3d") return "visual lost";
  if (s.scene.a > 3) return `a=${s.scene.a} not clamped`;
  if (s.scene.b === 0) return "b=0 passed through, object would vanish";
  return null;
});

// 7. prose in a plot spec is dropped, not rendered as a code block
t("prose where a plot spec belongs is dropped", () => {
  const raw = JSON.stringify({ title:"X", hook:"h", scenes:[{caption:"G", say:"Look.", visual:{type:"plot", spec:"a graph of y = x squared crossing at -2 and 4"}}], recap:[] });
  const v = parseLessonVideo(raw, "X");
  if (v.scenes[0].visual) return `prose kept as ${v.scenes[0].visual.type}`;
  return null;
});

console.log(fail === 0 ? "\nall video parser checks passed" : `\n${fail} failed`);
await vite.close();
process.exit(fail ? 1 : 0);
