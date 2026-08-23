import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  FileSignature,
  Images,
  Lock,
  Plus,
  RotateCw,
  ScanLine,
  Sparkles,
  Trash2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useStore } from "../../lib/store";
import { Empty, SectionHead, Spinner } from "../../components/ui";
import { QUESTIONS, subjectsForClass } from "../../data";
import {
  aiCheck,
  blankItem,
  CheckerUnavailable,
  gradeBand,
  itemFromQuestion,
  localMark,
  newScript,
  schemeToValuePoints,
  scriptTotals,
  type CheckResult,
  type Script,
  type ScriptItem,
} from "../../lib/osm";
import type { ClassLevel, Question } from "../../lib/types";

const CLASS_LEVELS: ClassLevel[] = [9, 10, 11, 12];

const CONFIDENCE_CHIP: Record<CheckResult["confidence"], string> = {
  high: "chip-mint",
  medium: "chip-sky",
  low: "chip-coral",
};

/* ------------------------------------------------------------------ *
 * Setup — assembling a script to mark
 * ------------------------------------------------------------------ */

function Setup({
  schoolId,
  onOpen,
}: {
  schoolId: string;
  onOpen: (s: Script) => void;
}) {
  const [bookletNo, setBookletNo] = useState("");
  const [classLevel, setClassLevel] = useState<ClassLevel>(10);
  const [subjectId, setSubjectId] = useState("");
  const [paperTitle, setPaperTitle] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  const subjects = subjectsForClass(classLevel);
  useEffect(() => {
    // Class changed under the selected subject: drop a subject that no longer
    // exists at this level rather than silently filtering to nothing.
    if (subjectId && !subjects.some((s) => s.id === subjectId)) {
      setSubjectId("");
      setPicked([]);
    }
  }, [subjectId, subjects]);

  const available: Question[] = useMemo(
    () =>
      subjectId
        ? QUESTIONS.filter(
            (q) => q.subjectId === subjectId && q.classLevel === classLevel
          )
        : [],
    [subjectId, classLevel]
  );

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const pickedMarks = available
    .filter((q) => picked.includes(q.id))
    .reduce((n, q) => n + q.marks, 0);

  const start = (e: FormEvent) => {
    e.preventDefault();
    if (!bookletNo.trim()) return;
    const script = newScript({
      bookletNo: bookletNo.trim(),
      classLevel,
      subjectId,
      paperTitle:
        paperTitle.trim() ||
        `${subjects.find((s) => s.id === subjectId)?.name ?? "Paper"} — Class ${classLevel}`,
      schoolId,
    });
    // Numbering follows the order the questions were picked, the way they sit
    // on the printed paper — not the bank's own order.
    script.items = picked
      .map((id) => available.find((q) => q.id === id))
      .filter((q): q is Question => !!q)
      .map((q, i) => itemFromQuestion(q, `Q${i + 1}`));
    if (script.items.length === 0) {
      script.items = [blankItem("Q1")];
    }
    onOpen(script);
  };

  return (
    <form onSubmit={start} className="card space-y-4">
      <SectionHead
        eyebrow="Section A · Open a script"
        title="New evaluation"
      />
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="ev-booklet">
            Booklet / roll number
          </label>
          <input
            id="ev-booklet"
            className="input"
            value={bookletNo}
            onChange={(e) => setBookletNo(e.target.value)}
            placeholder="B-104238"
            required
          />
          <p className="text-xs text-dim mt-1">
            Anonymous, like real OSM — never the student's name.
          </p>
        </div>
        <div>
          <label className="label" htmlFor="ev-paper">
            Paper
          </label>
          <input
            id="ev-paper"
            className="input"
            value={paperTitle}
            onChange={(e) => setPaperTitle(e.target.value)}
            placeholder="Half-yearly — Science"
          />
        </div>
        <div>
          <label className="label" htmlFor="ev-class">
            Class
          </label>
          <select
            id="ev-class"
            className="input"
            value={classLevel}
            onChange={(e) => {
              setClassLevel(Number(e.target.value) as ClassLevel);
              setPicked([]);
            }}
          >
            {CLASS_LEVELS.map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="ev-subject">
            Subject
          </label>
          <select
            id="ev-subject"
            className="input"
            value={subjectId}
            onChange={(e) => {
              setSubjectId(e.target.value);
              setPicked([]);
            }}
          >
            <option value="">Choose a subject…</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {subjectId && (
        <div>
          <div className="flex items-end justify-between gap-3 mb-2">
            <label className="label !mb-0">
              Questions on this paper ({picked.length} picked · {pickedMarks}{" "}
              marks)
            </label>
            {picked.length > 0 && (
              <button
                type="button"
                className="btn-ghost !px-2 !py-1 !text-xs"
                onClick={() => setPicked([])}
              >
                Clear
              </button>
            )}
          </div>
          <div className="card-inset max-h-72 overflow-y-auto space-y-1.5">
            {available.length === 0 ? (
              <p className="text-sm text-dim">
                No bank questions for this subject yet — start anyway and type
                the questions in as you mark.
              </p>
            ) : (
              available.map((q) => (
                <label
                  key={q.id}
                  className="flex items-start gap-2.5 text-sm text-muted cursor-pointer hover:text-cream py-1"
                >
                  <input
                    type="checkbox"
                    className="mt-1 accent-[#d4af37]"
                    checked={picked.includes(q.id)}
                    onChange={() => toggle(q.id)}
                  />
                  <span className="min-w-0">
                    <span className="font-mono text-xs text-gold mr-2">
                      {q.marks}m
                    </span>
                    {q.text}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>
      )}

      <button type="submit" className="btn-gold w-full">
        <ScanLine size={16} /> Open script for marking
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ *
 * Script viewer — the scanned answer booklet
 * ------------------------------------------------------------------ */

function ScriptViewer({
  pages,
  onAdd,
  onClear,
}: {
  pages: string[];
  onAdd: (urls: string[]) => void;
  onClear: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (index > pages.length - 1) setIndex(Math.max(0, pages.length - 1));
  }, [pages.length, index]);

  const pick = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onAdd(files.map((f) => URL.createObjectURL(f)));
    // Reset so re-picking the same file fires change again.
    e.target.value = "";
  };

  return (
    <div className="card !p-0 overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-line bg-pit/60">
        <span className="eyebrow-dim">Answer script</span>
        <div className="flex-1" />
        {pages.length > 0 && (
          <>
            <span className="font-mono text-xs text-dim">
              {index + 1}/{pages.length}
            </span>
            <button
              className="btn-ghost !px-2 !py-1"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              className="btn-ghost !px-2 !py-1"
              onClick={() => setIndex((i) => Math.min(pages.length - 1, i + 1))}
              disabled={index >= pages.length - 1}
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
            <button
              className="btn-ghost !px-2 !py-1"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
              aria-label="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              className="btn-ghost !px-2 !py-1"
              onClick={() => setZoom((z) => Math.min(4, z + 0.25))}
              aria-label="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
            <button
              className="btn-ghost !px-2 !py-1"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              aria-label="Rotate page"
            >
              <RotateCw size={14} />
            </button>
            <button
              className="btn-ghost !px-2 !py-1"
              onClick={onClear}
              aria-label="Remove all pages"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
        <button
          className="btn-ghost !px-2 !py-1 !text-xs"
          onClick={() => fileRef.current?.click()}
        >
          <Images size={14} /> Add pages
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={pick}
        />
      </div>

      <div className="flex-1 min-h-[24rem] max-h-[70vh] overflow-auto bg-black/30 flex items-start justify-center p-3">
        {pages.length === 0 ? (
          <div className="self-center text-center max-w-xs">
            <ScanLine size={28} className="text-gold mx-auto mb-3" />
            <p className="text-sm text-muted">
              Add photos or scans of the answer booklet to mark on screen.
            </p>
            <p className="text-xs text-dim mt-2">
              No scans? Type each answer into the marking panel instead — the
              checker works either way.
            </p>
          </div>
        ) : (
          <img
            src={pages[index]}
            alt={`Answer script page ${index + 1}`}
            className="max-w-none origin-top transition-transform"
            style={{
              width: `${zoom * 100}%`,
              transform: `rotate(${rotation}deg)`,
            }}
          />
        )}
      </div>

      {pages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto p-2 border-t border-line bg-pit/60">
          {pages.map((p, i) => (
            <button
              key={p}
              onClick={() => setIndex(i)}
              className={`h-14 w-11 shrink-0 rounded overflow-hidden border ${
                i === index ? "border-gold" : "border-line"
              }`}
              aria-label={`Go to page ${i + 1}`}
            >
              <img src={p} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The first-pass panel
 * ------------------------------------------------------------------ */

function CheckPanel({
  check,
  maxMarks,
  onAccept,
}: {
  check: CheckResult;
  maxMarks: number;
  onAccept: () => void;
}) {
  const ai = check.aiWritten;
  return (
    <div className="card-inset space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="eyebrow-dim">
          {check.source === "ai" ? "AI checker" : "Local checker"} · suggestion
        </span>
        <span className={CONFIDENCE_CHIP[check.confidence]}>
          {check.confidence} confidence
        </span>
        <div className="flex-1" />
        <span className="font-display text-lg font-bold text-gold">
          {check.awarded}
          <span className="text-dim text-sm font-normal">/{maxMarks}</span>
        </span>
      </div>

      {check.confidence === "low" && (
        <p className="text-xs text-coral">
          Low confidence — read this answer yourself before awarding.
        </p>
      )}

      {check.valuePoints.length > 0 && (
        <ul className="space-y-1">
          {check.valuePoints.map((v, i) => (
            <li
              key={`${v.point}-${i}`}
              className="flex items-start gap-2 text-sm"
            >
              {v.found ? (
                <Check size={14} className="text-mint mt-0.5 shrink-0" />
              ) : (
                <X size={14} className="text-coral mt-0.5 shrink-0" />
              )}
              <span className={v.found ? "text-muted" : "text-dim"}>
                {v.point}
                <span className="font-mono text-xs text-dim ml-2">
                  {v.marks}m
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {check.errors.length > 0 && (
        <div>
          <div className="eyebrow-dim mb-1">Errors</div>
          <ul className="text-sm text-muted list-disc pl-4 space-y-0.5">
            {check.errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {check.remark && <p className="text-sm text-muted italic">{check.remark}</p>}

      {ai.likelihood !== "low" && (
        <div className="flex items-start gap-2 rounded-md border border-coral/40 bg-coral/5 p-2.5">
          <AlertTriangle size={15} className="text-coral mt-0.5 shrink-0" />
          <p className="text-xs text-muted">
            <span className="text-coral font-semibold">
              {ai.likelihood === "high" ? "Strong" : "Possible"} sign of
              AI-written prose
            </span>
            {ai.why && ` — ${ai.why}`}. This is a prompt to talk to the student,
            not proof. Detectors are wrong often enough that no mark should
            turn on this alone.
          </p>
        </div>
      )}

      <button className="btn-ghost w-full !py-2 !text-xs" onClick={onAccept}>
        <Check size={14} /> Accept {check.awarded} mark
        {check.awarded === 1 ? "" : "s"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The marking workspace
 * ------------------------------------------------------------------ */

function Workspace({
  script,
  evaluator,
  onChange,
  onClose,
}: {
  script: Script;
  evaluator: string;
  onChange: (s: Script) => void;
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);
  const [checking, setChecking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const item = script.items[active];
  const totals = scriptTotals(script);
  const locked = !!script.lockedAt;

  const patchItem = (patch: Partial<ScriptItem>) =>
    onChange({
      ...script,
      items: script.items.map((it, i) =>
        i === active ? { ...it, ...patch } : it
      ),
    });

  const runCheck = async () => {
    if (!item || !item.answer.trim()) {
      setNotice("Transcribe the student's answer first.");
      return;
    }
    setChecking(true);
    setNotice(null);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const context = `Class ${script.classLevel} CBSE, ${script.paperTitle}, question ${item.number}`;
    try {
      const result = await aiCheck(item, context, controller.signal);
      patchItem({ check: result });
    } catch (err) {
      if (controller.signal.aborted) return;
      // The AI is an accelerator, not a dependency: whatever went wrong, the
      // evaluator still gets a first pass from the local marker and keeps
      // moving down the script.
      const fallback = localMark(item);
      patchItem({ check: fallback });
      setNotice(
        err instanceof CheckerUnavailable
          ? `${err.message} Marked locally instead.`
          : "The checker failed — marked locally instead."
      );
    } finally {
      setChecking(false);
    }
  };

  const award = (marks: number) => {
    const clamped = Math.max(
      0,
      Math.min(item.maxMarks, Math.round(marks * 2) / 2)
    );
    patchItem({ awarded: clamped });
  };

  const settle = () => {
    if (item.awarded === null) return;
    patchItem({ settled: true });
    const next = script.items.findIndex((it, i) => i > active && !it.settled);
    if (next !== -1) setActive(next);
  };

  const addQuestion = () => {
    const items = [...script.items, blankItem(`Q${script.items.length + 1}`)];
    onChange({ ...script, items });
    setActive(items.length - 1);
  };

  const lock = () => {
    onChange({
      ...script,
      lockedAt: new Date().toISOString(),
      evaluator,
    });
  };

  if (locked) {
    return (
      <AwardSheet script={script} onClose={onClose} />
    );
  }

  return (
    <div className="space-y-4">
      {/* Booklet header */}
      <div className="card !py-3 flex flex-wrap items-center gap-3">
        <button className="btn-ghost !px-3 !py-1.5 !text-xs" onClick={onClose}>
          <ChevronLeft size={14} /> All scripts
        </button>
        <div className="min-w-0">
          <div className="font-mono text-sm text-gold">
            {script.bookletNo}
          </div>
          <div className="text-xs text-dim truncate">
            {script.paperTitle} · Class {script.classLevel}
          </div>
        </div>
        <div className="flex-1" />
        <span className="chip">
          {totals.settled}/{totals.total} marked
        </span>
        {totals.flagged > 0 && (
          <span className="chip-coral">
            <AlertTriangle size={12} /> {totals.flagged} flagged
          </span>
        )}
        <span className="chip-gold font-mono">
          {totals.awarded}/{totals.max}
        </span>
        <button
          className="btn-gold !px-3 !py-1.5 !text-xs"
          onClick={lock}
          disabled={!totals.complete}
          title={
            totals.complete
              ? "Sign off and finalise these marks"
              : "Award every question first"
          }
        >
          <Lock size={14} /> Lock & sign
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 items-start">
        <ScriptViewer
          pages={script.pages}
          onAdd={(urls) =>
            onChange({ ...script, pages: [...script.pages, ...urls] })
          }
          onClear={() => onChange({ ...script, pages: [] })}
        />

        {/* Marking panel */}
        <div className="space-y-3">
          {/* Question navigator */}
          <div className="flex flex-wrap gap-1.5">
            {script.items.map((it, i) => (
              <button
                key={it.id}
                onClick={() => setActive(i)}
                className={`h-8 min-w-8 px-2 rounded-md border font-mono text-xs transition-colors ${
                  i === active
                    ? "border-gold text-gold bg-gold/10"
                    : it.settled
                      ? "border-mint/50 text-mint"
                      : "border-line text-dim hover:text-cream"
                }`}
                title={
                  it.settled ? `Awarded ${it.awarded}/${it.maxMarks}` : "Not marked"
                }
              >
                {it.number}
              </button>
            ))}
            <button
              onClick={addQuestion}
              className="h-8 px-2 rounded-md border border-line text-dim hover:text-cream"
              aria-label="Add a question"
            >
              <Plus size={14} />
            </button>
          </div>

          {!item ? (
            <Empty
              title="No questions on this script"
              body="Add one with the + button to start marking."
            />
          ) : (
            <div className="card space-y-4">
              <div className="flex items-start justify-between gap-3">
                <span className="chip-gold font-mono">{item.number}</span>
                <div className="flex items-center gap-2">
                  <label className="label !mb-0" htmlFor="ev-max">
                    Max
                  </label>
                  <input
                    id="ev-max"
                    type="number"
                    min={1}
                    max={20}
                    className="input !w-16 !py-1 text-center font-mono"
                    value={item.maxMarks}
                    onChange={(e) =>
                      patchItem({
                        maxMarks: Math.max(
                          1,
                          Math.min(20, Number(e.target.value) || 1)
                        ),
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="ev-question">
                  Question
                </label>
                <textarea
                  id="ev-question"
                  className="input min-h-16 resize-y text-sm"
                  value={item.question}
                  onChange={(e) => patchItem({ question: e.target.value })}
                  placeholder="Type or paste the question as printed"
                />
              </div>

              <div>
                <label className="label" htmlFor="ev-scheme">
                  Marking scheme
                </label>
                <textarea
                  id="ev-scheme"
                  className="input min-h-20 resize-y text-sm"
                  value={item.scheme}
                  onChange={(e) => patchItem({ scheme: e.target.value })}
                  onBlur={(e) =>
                    // Re-derive the tick list when the scheme is edited by
                    // hand, so the value points always match what the
                    // evaluator is actually marking against.
                    patchItem({
                      valuePoints: schemeToValuePoints(
                        e.target.value,
                        item.keywords,
                        item.maxMarks
                      ),
                    })
                  }
                  placeholder="The expected answer, as the CBSE scheme words it"
                />
              </div>

              <div>
                <label className="label" htmlFor="ev-answer">
                  Student's answer (transcribe from the script)
                </label>
                <textarea
                  id="ev-answer"
                  className="input min-h-28 resize-y text-sm"
                  value={item.answer}
                  onChange={(e) =>
                    patchItem({ answer: e.target.value, check: null })
                  }
                  placeholder="Type what the student wrote, exactly"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  className="btn-gold !py-2 !text-xs"
                  onClick={runCheck}
                  disabled={checking}
                >
                  {checking ? <Spinner size={14} /> : <Sparkles size={14} />}
                  {checking ? "Checking…" : "Run AI check"}
                </button>
                <button
                  className="btn-ghost !py-2 !text-xs"
                  onClick={() => patchItem({ check: localMark(item) })}
                  disabled={checking}
                >
                  Check offline
                </button>
              </div>

              {notice && <p className="text-xs text-coral">{notice}</p>}

              {item.check && (
                <CheckPanel
                  check={item.check}
                  maxMarks={item.maxMarks}
                  onAccept={() => award(item.check!.awarded)}
                />
              )}

              {/* Value point ticks — the evaluator's own, not the checker's */}
              {item.valuePoints.length > 0 && (
                <div>
                  <div className="eyebrow-dim mb-2">
                    Value points — tick what you found
                  </div>
                  <div className="space-y-1">
                    {item.valuePoints.map((v, i) => (
                      <label
                        key={`${v.point}-${i}`}
                        className="flex items-start gap-2 text-sm text-muted cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mt-1 accent-[#d4af37]"
                          checked={v.found}
                          onChange={() => {
                            const valuePoints = item.valuePoints.map((x, j) =>
                              j === i ? { ...x, found: !x.found } : x
                            );
                            // Ticking a point moves the running mark with it,
                            // the way an OSM tick does. The teacher can still
                            // override the total below.
                            const sum = valuePoints
                              .filter((x) => x.found)
                              .reduce((n, x) => n + x.marks, 0);
                            patchItem({
                              valuePoints,
                              awarded: Math.min(item.maxMarks, sum),
                            });
                          }}
                        />
                        <span>
                          {v.point}
                          <span className="font-mono text-xs text-dim ml-2">
                            {v.marks}m
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Award */}
              <div className="pt-3 border-t border-line/60 space-y-3">
                <div className="flex items-center gap-3">
                  <label className="label !mb-0" htmlFor="ev-award">
                    Marks awarded
                  </label>
                  <input
                    id="ev-award"
                    type="number"
                    step={0.5}
                    min={0}
                    max={item.maxMarks}
                    className="input !w-24 !py-1.5 text-center font-mono text-lg"
                    value={item.awarded ?? ""}
                    onChange={(e) =>
                      award(e.target.value === "" ? 0 : Number(e.target.value))
                    }
                    placeholder="—"
                  />
                  <span className="text-dim font-mono">/ {item.maxMarks}</span>
                  <div className="flex-1" />
                  <button
                    className="btn-ghost !px-3 !py-1.5 !text-xs"
                    onClick={() => award(item.maxMarks)}
                  >
                    Full
                  </button>
                  <button
                    className="btn-ghost !px-3 !py-1.5 !text-xs"
                    onClick={() => award(0)}
                  >
                    Zero
                  </button>
                </div>

                <div>
                  <label className="label" htmlFor="ev-remark">
                    Margin remark (the student reads this)
                  </label>
                  <input
                    id="ev-remark"
                    className="input"
                    value={item.remark}
                    onChange={(e) => patchItem({ remark: e.target.value })}
                    placeholder="Step 2 missing — no formula quoted"
                  />
                </div>

                <button
                  className="btn-gold w-full"
                  onClick={settle}
                  disabled={item.awarded === null}
                >
                  <Check size={16} />{" "}
                  {item.settled ? "Re-confirm & next" : "Award & next"}
                </button>
                <p className="text-xs text-dim text-center">
                  Every mark here is yours. The checker only ever suggests.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The signed award sheet
 * ------------------------------------------------------------------ */

function AwardSheet({
  script,
  onClose,
}: {
  script: Script;
  onClose: () => void;
}) {
  const totals = scriptTotals(script);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button className="btn-ghost !px-3 !py-1.5 !text-xs" onClick={onClose}>
          <ChevronLeft size={14} /> All scripts
        </button>
        <div className="flex-1" />
        <button
          className="btn-ghost !px-3 !py-1.5 !text-xs"
          onClick={() => window.print()}
        >
          Print award sheet
        </button>
      </div>

      <div className="card space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-1">Award sheet · signed</div>
            <h2 className="font-display text-2xl font-bold text-cream">
              {script.bookletNo}
            </h2>
            <p className="text-sm text-muted">
              {script.paperTitle} · Class {script.classLevel}
            </p>
          </div>
          <div className="text-right">
            <div className="font-display text-4xl font-bold text-gold">
              {totals.awarded}
              <span className="text-dim text-xl font-normal">
                /{totals.max}
              </span>
            </div>
            <div className="font-mono text-xs text-muted mt-1">
              {totals.percent}% · {gradeBand(totals.percent)}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-line">
                <th className="py-2 pr-3 eyebrow-dim font-normal">Q</th>
                <th className="py-2 pr-3 eyebrow-dim font-normal">Marks</th>
                <th className="py-2 eyebrow-dim font-normal">Remark</th>
              </tr>
            </thead>
            <tbody>
              {script.items.map((it) => (
                <tr key={it.id} className="border-b border-line/40">
                  <td className="py-2 pr-3 font-mono text-gold whitespace-nowrap">
                    {it.number}
                  </td>
                  <td className="py-2 pr-3 font-mono text-cream whitespace-nowrap">
                    {it.awarded ?? 0}/{it.maxMarks}
                  </td>
                  <td className="py-2 text-muted">
                    {it.remark || it.check?.remark || "—"}
                    {it.check?.aiWritten.likelihood === "high" && (
                      <span className="chip-coral ml-2">
                        <AlertTriangle size={11} /> review authorship
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-line text-xs text-dim">
          <FileSignature size={14} className="text-gold" />
          Signed by {script.evaluator} on{" "}
          {new Date(script.lockedAt!).toLocaleString("en-IN")}. Marks are final.
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export default function Evaluate() {
  const currentUser = useStore((s) => s.currentUser);
  const school = useStore((s) =>
    s.schools.find((x) => x.id === s.currentUser?.schoolId)
  );
  const scripts = useStore((s) => s.scripts);
  const saveScript = useStore((s) => s.saveScript);
  const removeScript = useStore((s) => s.removeScript);
  const [openId, setOpenId] = useState<string | null>(null);

  if (!school || !currentUser) {
    return (
      <Empty
        title="No school linked"
        body="Your teacher account isn't attached to a school yet. Ask Pinnacle Master to link your school, then sign in again."
      />
    );
  }

  const mine = scripts.filter((s) => s.schoolId === school.id);
  const open = mine.find((s) => s.id === openId) ?? null;

  return (
    <div className="space-y-8">
      <div>
        <div className="eyebrow mb-1">
          School console · Teachers only · {school.name}
        </div>
        <h1 className="font-display text-3xl font-bold text-cream">
          On-screen marking
        </h1>
        <p className="text-muted text-sm mt-2 max-w-xl">
          Mark answer scripts the way CBSE's OSM does — booklet on the left,
          marking scheme on the right, marks awarded per value point. The AI
          checker runs a first pass; you award every mark.
        </p>
      </div>

      {open ? (
        <Workspace
          script={open}
          evaluator={currentUser.name}
          onChange={saveScript}
          onClose={() => setOpenId(null)}
        />
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <Setup
            schoolId={school.id}
            onOpen={(s) => {
              saveScript(s);
              setOpenId(s.id);
            }}
          />

          <div className="lg:col-span-2">
            <SectionHead
              eyebrow="Section B · Scripts"
              title={`Evaluations (${mine.length})`}
            />
            {mine.length === 0 ? (
              <Empty
                title="No scripts yet"
                body="Open your first script with the form. Pick the questions on the paper, add the scanned booklet, and start marking."
              />
            ) : (
              <div className="space-y-3">
                {mine.map((s) => {
                  const t = scriptTotals(s);
                  return (
                    <div key={s.id} className="card">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="chip-gold font-mono">
                          {s.bookletNo}
                        </span>
                        <span className="chip">Class {s.classLevel}</span>
                        {s.lockedAt ? (
                          <span className="chip-mint">
                            <Lock size={11} /> Signed
                          </span>
                        ) : (
                          <span className="chip-sky">
                            {t.settled}/{t.total} marked
                          </span>
                        )}
                        {t.flagged > 0 && (
                          <span className="chip-coral">
                            <AlertTriangle size={11} /> {t.flagged}
                          </span>
                        )}
                      </div>
                      <div className="font-display font-semibold text-cream">
                        {s.paperTitle}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-line/60">
                        <span className="font-mono text-xs text-dim">
                          {t.awarded}/{t.max} · {t.percent}%
                          {s.lockedAt && ` · ${gradeBand(t.percent)}`}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            className="btn-ghost !px-3 !py-1.5 !text-xs"
                            onClick={() => setOpenId(s.id)}
                          >
                            {s.lockedAt ? "View award sheet" : "Continue marking"}
                          </button>
                          <button
                            className="btn-danger !px-3 !py-1.5 !text-xs"
                            onClick={() => removeScript(s.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
