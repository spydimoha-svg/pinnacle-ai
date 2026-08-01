import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageCircle,
  Mountain,
  Rocket,
  ShieldAlert,
  Target,
  Undo2,
} from "lucide-react";
import { useStore } from "../../lib/store";
import { ENTRANCE_EXAMS } from "../../data";
import { SectionHead, Empty } from "../../components/ui";
import type { EntranceExam } from "../../lib/types";

export default function Entrance() {
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const setMode = useStore((s) => s.setMode);
  const updateMemory = useStore((s) => s.updateMemory);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  if (!memory) return null;

  const activeExam = ENTRANCE_EXAMS.find((e) => e.id === memory.mode);
  const boardActive = memory.mode === "board";

  const switchTo = (exam: EntranceExam) => {
    setMode(exam.id);
    const targets = memory.examTargets.map((t) => {
      const known = ENTRANCE_EXAMS.find(
        (e) =>
          e.id.toLowerCase() === t.toLowerCase() ||
          e.name.toLowerCase() === t.toLowerCase()
      );
      return known ? known.id : t;
    });
    if (!targets.includes(exam.id)) targets.push(exam.id);
    updateMemory({ examTargets: [...new Set(targets)] });
  };

  const togglePattern = (id: string) =>
    setExpanded((e) => ({ ...e, [id]: !e[id] }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="eyebrow mb-1">Learn Better · Beyond boards</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          The same chapters, taught deeper.
        </h1>
        <p className="text-muted text-sm mt-2 max-w-2xl">
          Flip a track on and all of Pinnacle adapts — the tutor teaches your
          chapters at entrance depth, worksheets pull entrance-style questions,
          and video picks match your target exam. Your board progress stays
          exactly where it is; switch back any time.
        </p>
      </div>

      {/* What changes — only when a track is active */}
      {activeExam && (
        <div className="card !bg-pit/70 !border-gold-dim">
          <div className="eyebrow mb-1">
            What changes · {activeExam.name} track on
          </div>
          <h2 className="font-display text-xl font-semibold text-cream mb-4">
            Pinnacle is now teaching for {activeExam.name}
          </h2>
          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            <div className="card-inset">
              <Rocket size={18} className="text-gold mb-2" strokeWidth={1.8} />
              <div className="font-semibold text-cream text-sm mb-1">
                Entrance-depth teaching
              </div>
              <p className="text-xs text-muted">
                The tutor goes past NCERT — derivations, edge cases and the
                twists {activeExam.name} setters love.
              </p>
            </div>
            <div className="card-inset">
              <Target size={18} className="text-sky mb-2" strokeWidth={1.8} />
              <div className="font-semibold text-cream text-sm mb-1">
                MCQ strategy
              </div>
              <p className="text-xs text-muted">
                Elimination, estimation and time-per-question drills instead of
                long written answers.
              </p>
            </div>
            <div className="card-inset">
              <ShieldAlert
                size={18}
                className="text-coral mb-2"
                strokeWidth={1.8}
              />
              <div className="font-semibold text-cream text-sm mb-1">
                Negative-marking discipline
              </div>
              <p className="text-xs text-muted">
                When to attempt, when to skip — practice that trains you not to
                donate marks.
              </p>
            </div>
          </div>
          <Link to="/app/tutor" className="btn-gold">
            <MessageCircle size={16} /> Start an entrance-level session
          </Link>
        </div>
      )}

      {/* Board mode — the default climb */}
      <div className={`card md:flex items-center gap-6 ${boardActive ? "!border-gold-dim" : ""}`}>
        <Mountain size={20} className="text-gold shrink-0 hidden md:block" strokeWidth={1.8} />
        <div className="flex-1">
          <div className="font-display font-semibold text-cream mb-1">
            CBSE Board mode
          </div>
          <p className="text-sm text-muted max-w-xl">
            The default climb — NCERT-first teaching, marking-scheme answers and
            board-paper practice. This is where full marks in the boards are won.
          </p>
        </div>
        <div className="mt-4 md:mt-0 shrink-0">
          {boardActive ? (
            <span className="chip-gold">
              <Check size={13} /> Active now
            </span>
          ) : (
            <button className="btn-gold" onClick={() => setMode("board")}>
              <Undo2 size={16} /> Back to Board mode
            </button>
          )}
        </div>
      </div>

      {/* Entrance tracks */}
      <div>
        <SectionHead
          eyebrow="Section A · Entrance tracks"
          title="Pick your target exam"
        />
        {ENTRANCE_EXAMS.length === 0 ? (
          <Empty
            title="No tracks yet"
            body="Entrance tracks are being loaded into your library. Check back soon — Board mode has everything you need meanwhile."
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {ENTRANCE_EXAMS.map((exam) => {
              const isActive = memory.mode === exam.id;
              const open = !!expanded[exam.id];
              return (
                <div
                  key={exam.id}
                  className={`card flex flex-col ${isActive ? "!border-gold-dim" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-xl font-bold text-cream">
                        {exam.name}
                      </div>
                      <div className="font-mono text-xs text-dim mt-0.5">
                        {exam.fullName}
                      </div>
                    </div>
                    {isActive && (
                      <span className="chip-gold shrink-0">
                        <Check size={13} /> Active
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted mt-3">{exam.audience}</p>
                  <div className="font-mono text-xs text-dim mt-2">
                    {exam.subjects.join(" · ")}
                  </div>

                  <div className="card-inset mt-4">
                    <div className="eyebrow-dim mb-1.5">How prep differs</div>
                    <p className="text-sm text-muted">{exam.approach}</p>
                  </div>

                  <div className="mt-4">
                    <div className="eyebrow-dim mb-2">High-yield areas</div>
                    <div className="flex flex-wrap gap-1.5">
                      {exam.highYield.map((h) => (
                        <span key={h} className="chip">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    className="mt-4 flex items-center justify-between w-full text-left text-sm text-muted hover:text-cream transition-colors"
                    onClick={() => togglePattern(exam.id)}
                    aria-expanded={open}
                  >
                    <span className="font-semibold">Exam pattern</span>
                    {open ? (
                      <ChevronUp size={16} strokeWidth={1.8} />
                    ) : (
                      <ChevronDown size={16} strokeWidth={1.8} />
                    )}
                  </button>
                  {open && (
                    <p className="text-sm text-muted mt-2 border-l-2 border-gold-dim pl-3">
                      {exam.pattern}
                    </p>
                  )}

                  <div className="mt-auto pt-5 flex flex-wrap items-center justify-between gap-3">
                    {isActive ? (
                      <Link to="/app/tutor" className="btn-ghost">
                        <MessageCircle size={16} /> Start a session
                      </Link>
                    ) : (
                      <button
                        className="btn-gold"
                        onClick={() => switchTo(exam)}
                      >
                        <Rocket size={16} /> Switch to this track
                      </button>
                    )}
                    <a
                      href={exam.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-sky hover:text-cream transition-colors"
                    >
                      Official site <ExternalLink size={12} strokeWidth={1.8} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
