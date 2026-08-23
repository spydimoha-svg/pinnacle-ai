import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock, Flag } from "lucide-react";
import { useStore } from "../../lib/store";
import { Markdown, Empty } from "../../components/ui";
import { conceptMapFor } from "../../data/concepts";
import { journeyFor } from "../../data/journeys";
import { questionsFor, getChapter } from "../../data";
import { gradeAnswer } from "../../lib/grade";
import type { Question } from "../../lib/types";

/**
 * THE FINAL TRIAL.
 *
 * Deliberately the least cinematic screen in the product. Everywhere else the
 * interface reveals, animates and encourages; here it does none of those
 * things, because the contrast IS the design. A trial that felt like the rest
 * of the journey would not feel like a trial, and the student would not get
 * the one thing this screen exists to give them: an honest rehearsal of what
 * the exam hall is actually like.
 *
 * So: no character, no motion, no hints, no marking until the end. A timer, a
 * question, an answer box, and navigation. Then the debrief.
 */

type Phase = "brief" | "running" | "debrief";

interface Attempt {
  question: Question;
  answer: string;
  /** Seconds spent with this question on screen. */
  seconds: number;
}

/** Minutes allowed, from the marks on the paper — CBSE's own rough rate. */
function minutesFor(marks: number): number {
  return Math.max(5, Math.round(marks * 1.5));
}

function mmss(total: number): string {
  const m = Math.floor(Math.max(0, total) / 60);
  const s = Math.max(0, total) % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Trial() {
  const { chapterId = "" } = useParams();
  const assessChapter = useStore((s) => s.assessChapter);

  const map = useMemo(() => conceptMapFor(chapterId), [chapterId]);
  const framing = useMemo(() => journeyFor(chapterId), [chapterId]);
  const found = useMemo(() => getChapter(chapterId), [chapterId]);

  // Real questions with real marking-scheme answers. A trial built from
  // model-written questions would be rehearsing the wrong exam.
  const questions = useMemo(
    () =>
      questionsFor({ chapterId })
        .filter((q) => q.answer && q.answer.trim().length > 0)
        .slice(0, 8),
    [chapterId]
  );

  const totalMarks = questions.reduce((n, q) => n + q.marks, 0);
  const limitSeconds = minutesFor(totalMarks) * 60;

  const [phase, setPhase] = useState<Phase>("brief");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [perQuestion, setPerQuestion] = useState<number[]>([]);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    setAnswers(Array(questions.length).fill(""));
    setPerQuestion(Array(questions.length).fill(0));
  }, [questions.length]);

  // One timer for the whole paper, plus per-question accounting so the debrief
  // can say something true about time management rather than guessing.
  useEffect(() => {
    if (phase !== "running") return;
    tickRef.current = window.setInterval(() => {
      setElapsed((e) => e + 1);
      setPerQuestion((p) => {
        const next = [...p];
        next[index] = (next[index] ?? 0) + 1;
        return next;
      });
    }, 1000);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [phase, index]);

  useEffect(() => {
    if (phase === "running" && elapsed >= limitSeconds) setPhase("debrief");
  }, [elapsed, limitSeconds, phase]);

  if (!found || questions.length === 0) {
    return (
      <Empty
        title="No trial for this chapter yet"
        body="A trial is built from real questions with real marking schemes. This chapter doesn't have enough of them loaded — practise with a worksheet instead."
      />
    );
  }

  const attempts: Attempt[] = questions.map((q, i) => ({
    question: q,
    answer: answers[i] ?? "",
    seconds: perQuestion[i] ?? 0,
  }));

  /* ---------- marking ---------- */

  const marked = attempts.map((a) => {
    const { mark, why } = gradeAnswer(
      a.question.text,
      a.question.answer,
      a.answer
    );
    // Partial credit: a wholly unmarked answer scores nothing, an "unsure"
    // answer is given the benefit of the doubt at half, because a mechanical
    // marker that cannot decide must not decide against the student.
    const awarded =
      mark === "correct"
        ? a.question.marks
        : mark === "unsure" && a.answer.trim()
          ? Math.round(a.question.marks / 2)
          : 0;
    return { ...a, mark, why, awarded };
  });

  const scored = marked.reduce((n, m) => n + m.awarded, 0);
  const percent = totalMarks ? Math.round((scored / totalMarks) * 100) : 0;

  /* ---------- brief ---------- */

  if (phase === "brief") {
    return (
      <div className="max-w-lg mx-auto min-h-[60vh] flex flex-col justify-center gap-7">
        <div className="space-y-3">
          <div className="eyebrow">Final trial</div>
          <h1 className="font-display text-3xl font-bold text-cream">
            {framing?.title ?? found.chapter.title}
          </h1>
          <p className="text-muted">
            {questions.length} questions · {totalMarks} marks ·{" "}
            {minutesFor(totalMarks)} minutes.
          </p>
        </div>
        <div className="card-inset space-y-2 text-sm text-muted">
          <p>No hints. No marking until you finish. The clock does not stop.</p>
          <p>
            Answer in your own words — the marker reads for the idea, not your
            wording. If you are stuck, move on and come back; the debrief will
            show you where your time actually went.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-gold" onClick={() => setPhase("running")}>
            <Flag size={15} /> Begin the trial
          </button>
          <Link to={`/app/journey/${chapterId}`} className="btn-ghost">
            Back
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- running ---------- */

  if (phase === "running") {
    const q = questions[index];
    const left = limitSeconds - elapsed;
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-line">
          <span className="font-mono text-sm text-cream">
            Q{index + 1}
            <span className="text-dim">/{questions.length}</span>
          </span>
          <span className="font-mono text-xs text-dim">{q.marks} marks</span>
          <div className="flex-1" />
          <span
            className={`font-mono text-sm flex items-center gap-1.5 ${
              left < 60 ? "text-coral" : "text-muted"
            }`}
          >
            <Clock size={14} /> {mmss(left)}
          </span>
        </div>

        <div className="text-cream">
          <Markdown text={q.text} />
        </div>

        <textarea
          className="input min-h-40 resize-y"
          value={answers[index] ?? ""}
          onChange={(e) =>
            setAnswers((a) => {
              const next = [...a];
              next[index] = e.target.value;
              return next;
            })
          }
          placeholder="Your answer"
        />

        <div className="flex flex-wrap items-center gap-2">
          <button
            className="btn-ghost"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            <ChevronLeft size={15} /> Previous
          </button>
          {index < questions.length - 1 ? (
            <button
              className="btn-gold"
              onClick={() => setIndex((i) => i + 1)}
            >
              Next <ChevronRight size={15} />
            </button>
          ) : (
            <button className="btn-gold" onClick={() => setPhase("debrief")}>
              <Flag size={15} /> Finish
            </button>
          )}
          <div className="flex-1" />
          <button
            className="btn-ghost !text-xs"
            onClick={() => setPhase("debrief")}
          >
            Submit early
          </button>
        </div>

        {/* Question navigator — plain squares, answered or not. */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-line/60">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-7 w-7 rounded border font-mono text-xs ${
                i === index
                  ? "border-gold text-gold"
                  : answers[i]?.trim()
                    ? "border-mint/50 text-mint"
                    : "border-line text-dim"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ---------- debrief ---------- */

  const wrong = marked.filter((m) => m.mark !== "correct");
  const slowest = [...marked].sort((a, b) => b.seconds - a.seconds)[0];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="eyebrow">The debrief</div>
        <div className="flex items-end gap-4">
          <div className="font-display text-5xl font-bold text-gold">
            {scored}
            <span className="text-dim text-2xl font-normal">/{totalMarks}</span>
          </div>
          <div className="font-mono text-sm text-muted pb-2">
            {percent}% · {mmss(elapsed)} of {mmss(limitSeconds)} used
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="card-inset">
          <div className="eyebrow-dim mb-1">Answered</div>
          <div className="font-mono text-lg text-cream">
            {marked.filter((m) => m.answer.trim()).length}/{questions.length}
          </div>
        </div>
        <div className="card-inset">
          <div className="eyebrow-dim mb-1">Fully correct</div>
          <div className="font-mono text-lg text-mint">
            {marked.filter((m) => m.mark === "correct").length}
          </div>
        </div>
        <div className="card-inset">
          <div className="eyebrow-dim mb-1">Longest question</div>
          <div className="font-mono text-lg text-cream">
            {mmss(slowest?.seconds ?? 0)}
          </div>
        </div>
      </div>

      {/* Director's cut — §23. Not a list of red crosses: for each miss, what
          the question actually wanted, what you wrote, and the one thing to
          recognise next time. */}
      {wrong.length > 0 && (
        <div className="space-y-3">
          <div className="eyebrow">Director's cut · where it turned</div>
          {wrong.map((m, i) => (
            <div key={i} className="card space-y-3">
              <div className="flex items-center gap-2">
                <span className="chip-coral font-mono">
                  {m.awarded}/{m.question.marks}
                </span>
                <span className="font-mono text-xs text-dim">
                  {mmss(m.seconds)} spent
                </span>
              </div>

              <div className="text-sm text-cream">
                <Markdown text={m.question.text} />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="eyebrow-dim mb-1">What you wrote</div>
                  <p className="text-muted italic">
                    {m.answer.trim() || "— nothing —"}
                  </p>
                </div>
                <div>
                  <div className="eyebrow-dim mb-1">What earns the marks</div>
                  <div className="text-muted">
                    <Markdown text={m.question.answer} />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-line/60 space-y-1.5">
                <p className="text-xs text-coral">
                  Where it turned: {m.why}.
                </p>
                {m.question.keywords.length > 0 && (
                  <p className="text-xs text-dim">
                    The examiner is reading for:{" "}
                    <span className="text-muted">
                      {m.question.keywords.join(", ")}
                    </span>
                  </p>
                )}
                {m.question.examinerTip && (
                  <p className="text-xs text-gold-bright/90">
                    Next time: {m.question.examinerTip}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          className="btn-gold"
          onClick={() =>
            assessChapter(
              chapterId,
              map?.chapterTitle ?? found.chapter.title,
              percent >= 80 ? "mastered" : percent >= 50 ? "revising" : "learning",
              percent
            )
          }
        >
          Save this result
        </button>
        <Link to={`/app/journey/${chapterId}`} className="btn-ghost">
          Back to the journey
        </Link>
      </div>
    </div>
  );
}
