import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  Gauge,
  Lightbulb,
  MessageCircle,
  PlaySquare,
} from "lucide-react";
import { useStore } from "../../lib/store";
import { getChapter, questionsFor, videosForClass } from "../../data";
import type { ProgressStatus, Question } from "../../lib/types";
import { Empty, MarkingSchemeReveal, MarksBadge, ProgressBar, SectionHead } from "../../components/ui";

const STATUS_OPTIONS: { value: ProgressStatus; label: string }[] = [
  { value: "not-started", label: "Not started" },
  { value: "learning", label: "Learning" },
  { value: "revising", label: "Revising" },
  { value: "mastered", label: "Mastered" },
];

const SOURCE_LABEL: Record<Question["source"], string> = {
  pyq: "Board PYQ",
  sample: "Sample paper",
  exemplar: "NCERT Exemplar",
  important: "Important",
};

const TYPE_LABEL: Record<Question["type"], string> = {
  mcq: "MCQ",
  vsa: "Very short answer",
  sa: "Short answer",
  la: "Long answer",
  case: "Case study",
};

function QuestionCard({ q, index }: { q: Question; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card !p-0 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="eyebrow-dim">
            Q{index + 1} · {SOURCE_LABEL[q.source]}
            {q.year ? ` ${q.year}` : ""} · {TYPE_LABEL[q.type]}
          </div>
          <MarksBadge marks={q.marks} />
        </div>
        <p className="text-sm text-cream leading-relaxed">{q.text}</p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-bright transition-colors"
        >
          {open ? (
            <ChevronDown size={14} strokeWidth={1.8} />
          ) : (
            <ChevronRight size={14} strokeWidth={1.8} />
          )}
          {open ? "Hide marking scheme" : "Show marking scheme"}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-ink/60 p-5">
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

export default function ChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const recordProgress = useStore((s) => s.recordProgress);
  const addAltitude = useStore((s) => s.addAltitude);

  const found = chapterId ? getChapter(chapterId) : undefined;
  if (!found) {
    return (
      <Empty
        title="Chapter not found"
        body="This chapter isn't in your class blueprint — it may have moved with a syllabus update."
        action={
          <Link to="/app/subjects" className="btn-gold">
            <ArrowLeft size={16} /> Back to subjects
          </Link>
        }
      />
    );
  }

  const { subject, chapter } = found;
  const progress = memory?.progress[chapter.id];
  const status: ProgressStatus = progress?.status ?? "not-started";
  const confidence = progress?.confidence ?? 0;
  const masteryAwarded = progress?.masteryAwarded ?? false;

  const questions = questionsFor({ chapterId: chapter.id });
  const videos = videosForClass(subject.classLevel)
    .filter((v) => v.subjectId === subject.id)
    .slice(0, 3);

  const saveProgress = (next: {
    status?: ProgressStatus;
    confidence?: number;
  }) => {
    const nextStatus = next.status ?? status;
    const statusChanged = next.status !== undefined && next.status !== status;
    const award = nextStatus === "mastered" && !masteryAwarded;
    recordProgress({
      chapterId: chapter.id,
      status: nextStatus,
      confidence: next.confidence ?? confidence,
      lastStudied: statusChanged
        ? new Date().toISOString()
        : progress?.lastStudied,
      masteryAwarded: masteryAwarded || nextStatus === "mastered",
    });
    if (award) {
      addAltitude(15, `Mastered: ${chapter.title}`);
    }
  };

  const teachMe = () => {
    const prompt = `Teach me chapter ${chapter.number}: ${chapter.title} (${subject.name}) properly — explain, example, then check me`;
    navigate("/app/tutor", { state: { autoPrompt: prompt } });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card !bg-pit/70 !p-7">
        <Link
          to="/app/subjects"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-cream transition-colors mb-4"
        >
          <ArrowLeft size={14} strokeWidth={1.8} /> All subjects
        </Link>
        <div className="eyebrow mb-1">Section A · {subject.name}</div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-bold text-cream">
            <span className="font-mono text-xl text-dim align-middle mr-3">
              {String(chapter.number).padStart(2, "0")}
            </span>
            {chapter.title}
          </h1>
          {chapter.weightage && (
            <span className="marks">{chapter.weightage}</span>
          )}
        </div>

        {chapter.keyTopics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {chapter.keyTopics.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        )}

        {chapter.boardNotes && (
          <div className="flex items-start gap-2.5 card-inset !border-gold-dim/40 mt-5 max-w-2xl">
            <Lightbulb
              size={16}
              strokeWidth={1.8}
              className="text-gold mt-0.5 shrink-0"
            />
            <p className="text-xs text-muted leading-relaxed">
              <span className="font-semibold text-gold">
                How boards ask this ·{" "}
              </span>
              {chapter.boardNotes}
            </p>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Right rail first in DOM so actions show above PYQs on mobile */}
        <div className="space-y-4 lg:order-2">
          {/* Learn this chapter */}
          <div className="card">
            <div className="eyebrow-dim mb-3">Learn this chapter</div>
            <div className="space-y-2">
              <button type="button" onClick={teachMe} className="btn-gold w-full">
                <MessageCircle size={16} strokeWidth={1.8} /> Teach me this
                chapter
              </button>
              <Link to="/app/worksheets" className="btn-ghost w-full">
                <FileText size={16} strokeWidth={1.8} /> Generate worksheet
              </Link>
              <Link to="/app/videos" className="btn-ghost w-full">
                <PlaySquare size={16} strokeWidth={1.8} /> Best videos
              </Link>
            </div>
            <p className="text-xs text-dim mt-3">
              One focused hour: teaching first, then PYQs below, then mark your
              progress.
            </p>
          </div>

          {/* Progress control */}
          {memory && (
            <div className="card">
              <div className="eyebrow-dim mb-3">Your progress</div>
              <label className="label" htmlFor="chapter-status">
                Status
              </label>
              <select
                id="chapter-status"
                className="input mb-4"
                value={status}
                onChange={(e) =>
                  saveProgress({ status: e.target.value as ProgressStatus })
                }
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              <label className="label" htmlFor="chapter-confidence">
                <span className="inline-flex items-center gap-1.5">
                  <Gauge size={13} strokeWidth={1.8} /> Confidence
                </span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="chapter-confidence"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={confidence}
                  onChange={(e) =>
                    saveProgress({ confidence: Number(e.target.value) })
                  }
                  className="w-full accent-gold"
                />
                <span className="font-mono text-xs text-gold w-10 text-right">
                  {confidence}%
                </span>
              </div>
              <p className="text-xs text-dim mt-3">
                Setting a chapter to Mastered climbs you 15 m of altitude.
              </p>
            </div>
          )}

          {/* Recommended videos */}
          <div className="card">
            <div className="eyebrow-dim mb-3">Recommended videos</div>
            {videos.length === 0 ? (
              <p className="text-xs text-dim">
                No {subject.name} picks yet — browse the full video library.
              </p>
            ) : (
              <div className="space-y-3">
                {videos.map((v) => (
                  <a
                    key={v.id}
                    href={v.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card-inset block hover:border-gold-dim transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-semibold text-cream group-hover:text-gold-bright transition-colors">
                        {v.title}
                      </div>
                      <ExternalLink
                        size={14}
                        strokeWidth={1.8}
                        className="text-dim mt-0.5 shrink-0"
                      />
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-dim mt-1">
                      {v.channel} · {v.language}
                    </div>
                    <p className="text-xs text-muted mt-1.5">{v.why}</p>
                  </a>
                ))}
              </div>
            )}
            <Link
              to="/app/videos"
              className="text-xs text-gold hover:text-gold-bright inline-flex items-center gap-1 mt-3"
            >
              All videos <ChevronRight size={12} strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        {/* PYQ section */}
        <div className="lg:col-span-2 lg:order-1">
          <SectionHead
            eyebrow={`Section B · ${subject.name}`}
            title="Board questions from this chapter"
          />
          {questions.length === 0 ? (
            <Empty
              title="No board questions yet"
              body="This chapter's PYQ bank is still being filled. Generate a worksheet instead — the tutor writes fresh board-style questions on demand."
              action={
                <Link to="/app/worksheets" className="btn-gold">
                  <FileText size={16} /> Generate worksheet
                </Link>
              }
            />
          ) : (
            <div className="space-y-3">
              {questions.map((q, i) => (
                <QuestionCard key={q.id} q={q} index={i} />
              ))}
              <div className="flex items-center gap-3 pt-1">
                <div className="ridge-rule flex-1" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-dim">
                  {questions.length} questions ·{" "}
                  {questions.reduce((sum, q) => sum + q.marks, 0)} marks total
                </span>
                <div className="ridge-rule flex-1" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
