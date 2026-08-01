import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Library,
  Lightbulb,
  MessageCircle,
} from "lucide-react";
import type { Question, QuestionSource } from "../../lib/types";
import { useStore } from "../../lib/store";
import { getSubject, questionsFor, subjectsForClass } from "../../data";
import { Empty, MarksBadge, Markdown } from "../../components/ui";

const SOURCE_META: Record<QuestionSource, { label: string; chip: string }> = {
  pyq: { label: "PYQ", chip: "chip-sky" },
  sample: { label: "Sample paper", chip: "chip-mint" },
  important: { label: "Important", chip: "chip-coral" },
  exemplar: { label: "NCERT Exemplar", chip: "chip" },
};

export default function Papers() {
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const navigate = useNavigate();

  const [subjectId, setSubjectId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [marks, setMarks] = useState<number | null>(null);
  const [source, setSource] = useState<QuestionSource | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [copyNote, setCopyNote] = useState<{ id: string; text: string } | null>(
    null
  );
  const jumpTimer = useRef<number | null>(null);

  const classLevel = memory?.classLevel;

  const classQuestions = useMemo(
    () => (classLevel ? questionsFor({ classLevel }) : []),
    [classLevel]
  );

  const subjects = useMemo(
    () => (classLevel ? subjectsForClass(classLevel) : []),
    [classLevel]
  );

  useEffect(
    () => () => {
      if (jumpTimer.current !== null) window.clearTimeout(jumpTimer.current);
    },
    []
  );

  if (!memory || !classLevel) return null;

  const subject = subjects.find((s) => s.id === subjectId);

  const marksOptions = [...new Set(classQuestions.map((q) => q.marks))].sort(
    (a, b) => a - b
  );
  const yearOptions = [
    ...new Set(
      classQuestions
        .map((q) => q.year)
        .filter((y): y is number => typeof y === "number")
    ),
  ].sort((a, b) => b - a);

  const filtered = classQuestions.filter(
    (q) =>
      (!subjectId || q.subjectId === subjectId) &&
      (!chapterId || q.chapterId === chapterId) &&
      (marks === null || q.marks === marks) &&
      (source === null || q.source === source) &&
      (year === null || q.year === year)
  );

  const pyqCount = classQuestions.filter((q) => q.source === "pyq").length;
  const anyFilter =
    !!subjectId || !!chapterId || marks !== null || source !== null || year !== null;

  function resetFilters() {
    setSubjectId("");
    setChapterId("");
    setMarks(null);
    setSource(null);
    setYear(null);
  }

  async function practiceInTutor(q: Question) {
    try {
      await navigator.clipboard.writeText(q.text);
      setCopyNote({ id: q.id, text: "Question copied — paste it to the tutor" });
    } catch {
      setCopyNote({
        id: q.id,
        text: "Opening the tutor — ask it about this question there",
      });
    }
    if (jumpTimer.current !== null) window.clearTimeout(jumpTimer.current);
    jumpTimer.current = window.setTimeout(() => navigate("/app/tutor"), 900);
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="eyebrow mb-1">
          Question bank · Class {memory.classLevel}
        </div>
        <h1 className="font-display text-3xl font-bold text-cream">
          Papers and PYQs
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          Previous-year board questions with the marking-scheme answer, the
          keywords examiners award marks for, and the tip that saves you one.
        </p>
      </div>

      {/* Counts strip */}
      <div className="card !p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          <span className="text-muted">
            <span className="font-mono text-gold">{pyqCount}</span> PYQs for
            your class
          </span>
          <span className="text-muted">
            <span className="font-mono text-cream">
              {classQuestions.length}
            </span>{" "}
            questions in the bank
          </span>
          {yearOptions.length > 0 && (
            <span className="text-muted">
              <span className="font-mono text-cream">
                {yearOptions[yearOptions.length - 1]}–{yearOptions[0]}
              </span>{" "}
              covered
            </span>
          )}
        </div>
        <Link
          to="/app/library"
          className="text-sm text-gold hover:text-gold-bright inline-flex items-center gap-1.5 shrink-0"
        >
          <Library size={15} /> Full official papers in the Library{" "}
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Filter bar */}
      <div className="card !p-5 space-y-4">
        <div className="eyebrow-dim">Section A · Filter</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <label className="label" htmlFor="pq-subject">
              Subject
            </label>
            <select
              id="pq-subject"
              className="input"
              value={subjectId}
              onChange={(e) => {
                setSubjectId(e.target.value);
                setChapterId("");
              }}
            >
              <option value="">All subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="pq-chapter">
              Chapter
            </label>
            <select
              id="pq-chapter"
              className="input"
              value={chapterId}
              onChange={(e) => setChapterId(e.target.value)}
              disabled={!subject}
            >
              <option value="">
                {subject ? "All chapters" : "Pick a subject first"}
              </option>
              {subject?.chapters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.number}. {c.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="pq-year">
              Year
            </label>
            <select
              id="pq-year"
              className="input"
              value={year ?? ""}
              onChange={(e) =>
                setYear(e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">Any year</option>
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow-dim mr-1">Marks</span>
            {marksOptions.map((m) => (
              <button
                key={m}
                className={marks === m ? "chip-gold" : "chip"}
                onClick={() => setMarks(marks === m ? null : m)}
              >
                <span className="font-mono">[{m}]</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow-dim mr-1">Source</span>
            {(Object.keys(SOURCE_META) as QuestionSource[]).map((s) => (
              <button
                key={s}
                className={source === s ? "chip-gold" : "chip"}
                onClick={() => setSource(source === s ? null : s)}
              >
                {SOURCE_META[s].label}
              </button>
            ))}
          </div>
          {anyFilter && (
            <button
              className="text-xs text-dim hover:text-cream underline underline-offset-2"
              onClick={resetFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Question cards */}
      <div>
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <div className="eyebrow mb-1">Section B · Questions</div>
            <h2 className="text-xl font-semibold text-cream font-display">
              {filtered.length} {filtered.length === 1 ? "question" : "questions"}
            </h2>
          </div>
        </div>

        {filtered.length === 0 ? (
          <Empty
            title="Nothing matches those filters"
            body="The bank is growing chapter by chapter. Widen the filters or clear them to see everything available for your class."
            action={
              anyFilter ? (
                <button className="btn-ghost" onClick={resetFilters}>
                  Clear filters
                </button>
              ) : undefined
            }
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((q) => (
              <PaperQuestion
                key={q.id}
                q={q}
                open={!!expanded[q.id]}
                note={copyNote?.id === q.id ? copyNote.text : null}
                onToggle={() =>
                  setExpanded((e) => ({ ...e, [q.id]: !e[q.id] }))
                }
                onPractice={() => practiceInTutor(q)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PaperQuestion({
  q,
  open,
  note,
  onToggle,
  onPractice,
}: {
  q: Question;
  open: boolean;
  note: string | null;
  onToggle: () => void;
  onPractice: () => void;
}) {
  const meta = SOURCE_META[q.source];
  const subj = getSubject(q.subjectId);
  const chapter = subj?.chapters.find((c) => c.id === q.chapterId);

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <p className="text-[15px] text-cream leading-relaxed">
          <span className="font-mono text-gold mr-2">Q.</span>
          {q.text}
        </p>
        <MarksBadge marks={q.marks} />
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className={meta.chip}>
          {meta.label}
          {q.year ? <span className="font-mono">· {q.year}</span> : null}
        </span>
        {subj && (
          <span className="chip">
            {subj.name}
            {chapter ? ` · Ch ${chapter.number}` : ""}
          </span>
        )}
        <span className="chip font-mono uppercase">{q.type}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button className="btn-ghost !py-2 text-xs" onClick={onToggle}>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {open ? "Hide marking scheme" : "Marking scheme answer"}
        </button>
        <button className="btn-dark !py-2 text-xs" onClick={onPractice}>
          <MessageCircle size={14} /> Practice this in the tutor
        </button>
        {note && (
          <span className="text-xs text-mint inline-flex items-center gap-1.5">
            <ClipboardCheck size={14} /> {note}
          </span>
        )}
      </div>

      {open && (
        <div className="card-inset mt-4 space-y-3">
          <div className="eyebrow-dim">Marking scheme answer</div>
          <Markdown text={q.answer} />
          {q.keywords.length > 0 && (
            <div>
              <div className="eyebrow-dim mb-2">Examiner looks for</div>
              <div className="flex flex-wrap gap-1.5">
                {q.keywords.map((k) => (
                  <span key={k} className="chip-gold">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
          {q.examinerTip && (
            <p className="text-xs text-muted flex items-start gap-2">
              <Lightbulb size={14} className="text-gold shrink-0 mt-0.5" />
              {q.examinerTip}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
