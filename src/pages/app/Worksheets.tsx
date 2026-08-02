import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Eye,
  FilePlus2,
  FileText,
  Info,
  Mountain,
  Sparkles,
} from "lucide-react";
import type { Question, Worksheet, WorksheetItem } from "../../lib/types";
import { useStore } from "../../lib/store";
import { getSubject, questionsFor, subjectsForClass } from "../../data";
import { generateOnce } from "../../lib/ai";
import { Empty, MarkingSchemeReveal, MarksBadge, SectionHead } from "../../components/ui";

const MARKS_OPTIONS = [1, 2, 3, 5] as const;
const COUNT_OPTIONS = [5, 10, 15] as const;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- AI worksheet generator: fresh questions, one per topic, weightage-first ---
function clampMarks(m: unknown): 1 | 2 | 3 | 4 | 5 | 6 {
  const n = Math.round(Number(m));
  return (Number.isFinite(n) ? Math.min(6, Math.max(1, n)) : 3) as 1 | 2 | 3 | 4 | 5 | 6;
}
const VALID_TYPES = ["mcq", "vsa", "sa", "la", "case"] as const;
function validType(t: unknown): Question["type"] {
  return typeof t === "string" && (VALID_TYPES as readonly string[]).includes(t)
    ? (t as Question["type"])
    : "sa";
}
function parseWorksheetJson(raw: string): Array<Record<string, unknown>> {
  const start = raw.indexOf("[");
  if (start === -1) return [];
  const body = raw.slice(start);
  // 1) Clean full parse when the array is intact.
  const end = body.lastIndexOf("]");
  if (end > 0) {
    try {
      const arr = JSON.parse(body.slice(0, end + 1));
      if (Array.isArray(arr) && arr.length) return arr;
    } catch {
      /* fall through to salvage */
    }
  }
  // 2) Salvage: pull out every complete top-level {...} object, so a worksheet
  //    that was truncated mid-stream still yields all the questions that arrived.
  const objs: Array<Record<string, unknown>> = [];
  let depth = 0;
  let objStart = -1;
  let inStr = false;
  let esc = false;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') inStr = true;
    else if (ch === "{") {
      if (depth === 0) objStart = i;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && objStart >= 0) {
        try {
          objs.push(JSON.parse(body.slice(objStart, i + 1)));
        } catch {
          /* skip a malformed object */
        }
        objStart = -1;
      }
    }
  }
  return objs;
}
function buildAiWorksheetPrompt(
  subjectName: string,
  chapterNames: string,
  topics: string[],
  examples: string,
  count: number,
  classLevel: number
): string {
  return [
    `You are a CBSE examiner setting a Class ${classLevel} ${subjectName} practice worksheet.`,
    `Chapter(s): ${chapterNames}.`,
    `Create exactly ${count} board-style questions.`,
    `RULES:`,
    `- Cover ONE question per topic, moving across every topic in this list: ${topics.join("; ")}.`,
    `- Order the questions by board weightage: put the highest-mark questions first, then the lower ones.`,
    `- Base them on NCERT and typical board papers, but CHANGE the numbers and values so each question is fresh, not copied.`,
    `- For every question give a CONCISE CBSE marking-scheme answer (2 to 4 lines, key steps only) and the exact examiner keywords.`,
    `- Write all mathematics in LaTeX using $...$.`,
    examples ? `Level reference (match this difficulty, do not copy):\n${examples}` : "",
    `Return ONLY a JSON array, with no prose and no code fences, in exactly this shape:`,
    `[{"topic":"...","marks":3,"type":"sa","text":"...","answer":"...","keywords":["kw1","kw2"],"examinerTip":"..."}]`,
    `"type" is one of mcq, vsa, sa, la, case. "marks" is a whole number from 1 to 6.`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function Worksheets() {
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const worksheetsRaw = useStore((s) =>
    s.currentUser ? s.worksheets[s.currentUser.id] : undefined
  );
  const addWorksheet = useStore((s) => s.addWorksheet);
  const updateWorksheet = useStore((s) => s.updateWorksheet);
  const addAltitude = useStore((s) => s.addAltitude);

  const worksheets = worksheetsRaw ?? [];

  // Generator form
  const [subjectId, setSubjectId] = useState("");
  const [chapterIds, setChapterIds] = useState<string[]>([]);
  const [marksMix, setMarksMix] = useState<number[]>([]);
  const [count, setCount] = useState<number>(10);
  const [genNote, setGenNote] = useState<string | null>(null);
  const [aiBusy, setAiBusy] = useState(false);

  // Which worksheet is open for attempting
  const [openId, setOpenId] = useState<string | null>(null);

  const subjects = useMemo(
    () => (memory ? subjectsForClass(memory.classLevel) : []),
    [memory]
  );
  const subject = subjects.find((s) => s.id === subjectId);

  if (!memory) return null;

  const openWorksheet = worksheets.find((w) => w.id === openId) ?? null;

  function toggleChapter(id: string) {
    setChapterIds((cur) =>
      cur.includes(id) ? cur.filter((c) => c !== id) : [...cur, id]
    );
  }

  function toggleMarks(m: number) {
    setMarksMix((cur) =>
      cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]
    );
  }

  function generate() {
    if (!memory || !subjectId) return;
    const marks = marksMix.length ? marksMix : undefined;

    const byChapters = (qs: Question[]) =>
      chapterIds.length
        ? qs.filter((q) => chapterIds.includes(q.chapterId))
        : qs;

    let pool = byChapters(
      questionsFor({ subjectId, classLevel: memory.classLevel, marks })
    );
    let relaxed = false;
    if (pool.length < count && marks) {
      const wide = byChapters(
        questionsFor({ subjectId, classLevel: memory.classLevel })
      );
      if (wide.length > pool.length) {
        pool = wide;
        relaxed = true;
      }
    }
    if (pool.length === 0) {
      setGenNote(
        "No questions in the bank match that selection yet. Try different chapters or clear the marks mix."
      );
      return;
    }

    const picked = shuffle(pool).slice(0, count);
    const totalMarks = picked.reduce((sum, q) => sum + q.marks, 0);
    const subj = getSubject(subjectId);
    const topic =
      chapterIds.length === 1
        ? (subj?.chapters.find((c) => c.id === chapterIds[0])?.title ??
          subj?.name ??
          "Practice")
        : (subj?.name ?? "Practice");

    const items: WorksheetItem[] = picked.map((q) => ({
      question: q,
      revealed: false,
    }));
    const ws: Worksheet = {
      id: `ws-${Date.now()}`,
      title: `${topic} practice · ${totalMarks} marks`,
      createdAt: new Date().toISOString(),
      subjectId,
      chapterIds: chapterIds.length
        ? chapterIds
        : [...new Set(picked.map((q) => q.chapterId))],
      totalMarks,
      items,
      completed: false,
    };
    addWorksheet(ws);
    setGenNote(
      relaxed
        ? "The marks mix was too narrow, so we relaxed it to fill the worksheet."
        : picked.length < count
          ? `Only ${picked.length} matching questions exist in the bank right now, so the worksheet is shorter than requested.`
          : null
    );
    setOpenId(ws.id);
  }

  async function generateAI() {
    if (!memory || !subjectId) return;
    setAiBusy(true);
    setGenNote(null);
    try {
      const subj = getSubject(subjectId);
      if (!subj) return;
      const chs = chapterIds.length
        ? subj.chapters.filter((c) => chapterIds.includes(c.id))
        : subj.chapters;
      const topics = [...new Set(chs.flatMap((c) => c.keyTopics))];
      const chapterNames = chs.map((c) => `${c.number}. ${c.title}`).join("; ");
      const examples = chs
        .flatMap((c) => questionsFor({ chapterId: c.id }))
        .slice(0, 3)
        .map((q) => `- [${q.marks}m] ${q.text}`)
        .join("\n");
      const prompt = buildAiWorksheetPrompt(
        subj.name,
        chapterNames,
        topics,
        examples,
        count,
        memory.classLevel
      );
      const raw = await generateOnce(
        prompt,
        "You are a precise CBSE examiner and question setter. Output only valid JSON, nothing else."
      );
      const parsed = parseWorksheetJson(raw);
      if (!parsed.length) {
        setGenNote("The AI could not produce a clean set this time — try again in a moment.");
        return;
      }
      parsed.sort((a, b) => clampMarks(b.marks) - clampMarks(a.marks));
      const picked = parsed.slice(0, count);
      const primaryChapter =
        chapterIds.length === 1 ? chapterIds[0] : (chs[0]?.id ?? subjectId);
      const items: WorksheetItem[] = picked.map((p, i) => ({
        question: {
          id: `aiq-${Date.now()}-${i}`,
          subjectId,
          chapterId: primaryChapter,
          classLevel: memory.classLevel,
          text: String(p.text ?? "").trim() || "Question unavailable",
          marks: clampMarks(p.marks),
          type: validType(p.type),
          source: "important",
          answer: String(p.answer ?? "").trim(),
          keywords: Array.isArray(p.keywords) ? p.keywords.map(String) : [],
          examinerTip: p.examinerTip ? String(p.examinerTip) : undefined,
        },
        revealed: false,
      }));
      const totalMarks = items.reduce((s, it) => s + it.question.marks, 0);
      const topic = chs.length === 1 ? chs[0].title : subj.name;
      const ws: Worksheet = {
        id: `ws-${Date.now()}`,
        title: `${topic} · AI practice · ${totalMarks} marks`,
        createdAt: new Date().toISOString(),
        subjectId,
        chapterIds: chapterIds.length ? chapterIds : chs.map((c) => c.id),
        totalMarks,
        items,
        completed: false,
      };
      addWorksheet(ws);
      setOpenId(ws.id);
    } catch {
      setGenNote("Generation failed — the tutor brain may be busy. Try again.");
    } finally {
      setAiBusy(false);
    }
  }

  function setAnswer(ws: Worksheet, index: number, value: string) {
    const items = ws.items.map((it, i) =>
      i === index ? { ...it, studentAnswer: value } : it
    );
    updateWorksheet(ws.id, { items });
  }

  function reveal(ws: Worksheet, index: number) {
    const items = ws.items.map((it, i) =>
      i === index ? { ...it, revealed: true } : it
    );
    updateWorksheet(ws.id, { items });
  }

  function markComplete(ws: Worksheet) {
    if (ws.completed) return;
    updateWorksheet(ws.id, { completed: true });
    addAltitude(ws.totalMarks, `Completed worksheet: ${ws.title}`);
  }

  /* ————— Attempt view ————— */
  if (openWorksheet) {
    const ws = openWorksheet;
    const wsSubject = getSubject(ws.subjectId);
    const answered = ws.items.filter(
      (it) => (it.studentAnswer ?? "").trim().length > 0
    ).length;

    return (
      <div className="space-y-6">
        <div>
          <button
            className="text-sm text-muted hover:text-cream inline-flex items-center gap-1.5 mb-4"
            onClick={() => {
              setOpenId(null);
              setGenNote(null);
            }}
          >
            <ArrowLeft size={15} /> All worksheets
          </button>
          <div className="eyebrow mb-1">
            Worksheet · {wsSubject?.name ?? "Practice"} · Class{" "}
            {memory.classLevel}
          </div>
          <h1 className="font-display text-3xl font-bold text-cream">
            {ws.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="chip font-mono">{ws.items.length} questions</span>
            <span className="chip font-mono">{ws.totalMarks} marks total</span>
            <span className="chip font-mono">
              {answered} / {ws.items.length} attempted
            </span>
            {ws.completed && (
              <span className="chip-mint">
                <CheckCircle2 size={13} /> Completed
              </span>
            )}
          </div>
        </div>

        {genNote && (
          <div className="card-inset flex items-start gap-2.5 text-sm text-muted">
            <Info size={16} className="text-sky shrink-0 mt-0.5" />
            {genNote}
          </div>
        )}

        <div className="space-y-4">
          {ws.items.map((item, i) => (
            <QuestionAttempt
              key={item.question.id}
              item={item}
              number={i + 1}
              onAnswer={(v) => setAnswer(ws, i, v)}
              onReveal={() => reveal(ws, i)}
            />
          ))}
        </div>

        <div className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-display font-semibold text-cream">
              Done with the paper?
            </div>
            <p className="text-sm text-muted">
              Marking it complete adds {ws.totalMarks} m of altitude to your
              climb.
            </p>
          </div>
          {ws.completed ? (
            <span className="chip-mint">
              <CheckCircle2 size={14} /> Worksheet completed
            </span>
          ) : (
            <button className="btn-gold" onClick={() => markComplete(ws)}>
              <Mountain size={16} /> Mark complete · +{ws.totalMarks} m
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ————— Generator + list view ————— */
  return (
    <div className="space-y-8">
      <div>
        <div className="eyebrow mb-1">Practice · Class {memory.classLevel}</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          Worksheets
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          Build a board-style practice set from the question bank, attempt it in
          your own words, then check yourself against the marking scheme.
        </p>
      </div>

      {/* Generate panel */}
      <div className="card !p-6 space-y-5">
        <div className="eyebrow-dim">Section A · Generate</div>

        <div>
          <span className="label">Subject</span>
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => (
              <button
                key={s.id}
                className={subjectId === s.id ? "chip-gold" : "chip"}
                onClick={() => {
                  setSubjectId(s.id);
                  setChapterIds([]);
                  setGenNote(null);
                }}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {subject && (
          <div>
            <span className="label">
              Chapters{" "}
              <span className="normal-case text-dim font-normal">
                — leave empty for the whole subject
              </span>
            </span>
            <div className="flex flex-wrap gap-2">
              {subject.chapters.map((c) => (
                <button
                  key={c.id}
                  className={chapterIds.includes(c.id) ? "chip-gold" : "chip"}
                  onClick={() => toggleChapter(c.id)}
                >
                  <span className="font-mono">{c.number}.</span> {c.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <span className="label">
              Marks mix{" "}
              <span className="normal-case text-dim font-normal">
                — empty means any
              </span>
            </span>
            <div className="flex flex-wrap gap-2">
              {MARKS_OPTIONS.map((m) => (
                <button
                  key={m}
                  className={marksMix.includes(m) ? "chip-gold" : "chip"}
                  onClick={() => toggleMarks(m)}
                >
                  <span className="font-mono">[{m}]</span>{" "}
                  {m === 1 ? "mark" : "marks"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="label">Questions</span>
            <div className="flex flex-wrap gap-2">
              {COUNT_OPTIONS.map((c) => (
                <button
                  key={c}
                  className={count === c ? "chip-gold" : "chip"}
                  onClick={() => setCount(c)}
                >
                  <span className="font-mono">{c}</span> questions
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button className="btn-gold" disabled={!subjectId} onClick={generate}>
            <FilePlus2 size={16} /> From question bank
          </button>
          <button
            className="btn-ghost"
            disabled={!subjectId || aiBusy}
            onClick={generateAI}
          >
            <Sparkles size={16} />{" "}
            {aiBusy ? "Generating fresh set…" : "Generate fresh with AI"}
          </button>
          {!subjectId && (
            <span className="text-xs text-dim">Pick a subject to start.</span>
          )}
          {genNote && (
            <span className="text-xs text-sky inline-flex items-center gap-1.5">
              <Info size={13} /> {genNote}
            </span>
          )}
        </div>
      </div>

      {/* Past worksheets */}
      <div>
        <SectionHead
          eyebrow="Section B · Your papers"
          title="Previously generated"
        />
        {worksheets.length === 0 ? (
          <Empty
            title="No worksheets yet"
            body="Generate your first practice set above — pick a subject, a couple of chapters, and a marks mix that matches your board paper."
          />
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {worksheets.map((w) => {
              const subj = getSubject(w.subjectId);
              const attempted = w.items.filter(
                (it) => (it.studentAnswer ?? "").trim().length > 0
              ).length;
              return (
                <button
                  key={w.id}
                  className="card card-hover text-left w-full"
                  onClick={() => {
                    setGenNote(null);
                    setOpenId(w.id);
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <FileText
                      size={18}
                      className={subj ? `text-${subj.color}` : "text-gold"}
                    />
                    {w.completed ? (
                      <span className="chip-mint">
                        <CheckCircle2 size={12} /> Completed
                      </span>
                    ) : (
                      <span className="chip font-mono">
                        {attempted}/{w.items.length} attempted
                      </span>
                    )}
                  </div>
                  <div className="font-display font-semibold text-cream mb-1">
                    {w.title}
                  </div>
                  <div className="flex items-center justify-between text-xs text-dim">
                    <span className="font-mono">
                      {w.items.length} Q · {w.totalMarks} marks ·{" "}
                      {new Date(w.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <ChevronRight size={14} />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function QuestionAttempt({
  item,
  number,
  onAnswer,
  onReveal,
}: {
  item: WorksheetItem;
  number: number;
  onAnswer: (value: string) => void;
  onReveal: () => void;
}) {
  const q = item.question;
  const promptId = `ws-q-${q.id}`;
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4 mb-3">
        <p id={promptId} className="text-[15px] text-cream leading-relaxed">
          <span className="font-mono text-gold mr-2">Q{number}.</span>
          {q.text}
        </p>
        <MarksBadge marks={q.marks} />
      </div>

      <textarea
        className="input min-h-24 resize-y font-body"
        placeholder="Write your answer the way you would in the board exam…"
        aria-labelledby={promptId}
        value={item.studentAnswer ?? ""}
        onChange={(e) => onAnswer(e.target.value)}
      />

      {!item.revealed ? (
        <button className="btn-ghost mt-3 !py-2 text-xs" onClick={onReveal}>
          <Eye size={14} /> Reveal marking scheme
        </button>
      ) : (
        <div className="card-inset mt-3">
          <MarkingSchemeReveal
            answer={q.answer}
            keywords={q.keywords}
            examinerTip={q.examinerTip}
          />
        </div>
      )}
    </div>
  );
}
