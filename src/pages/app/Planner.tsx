import { useState } from "react";
import { Link } from "react-router-dom";
import { Gauge, ArrowRight, Compass, ListChecks, Map } from "lucide-react";
import { useStore } from "../../lib/store";
import { subjectsForClass } from "../../data";
import { SectionHead, Empty } from "../../components/ui";
import {
  overallMastery,
  subjectMastery,
  chapterMastery,
  masteryBand,
  buildPlan,
  ACTION_META,
  CONFIDENCE_LEVELS,
  currentLevelKey,
  type MasteryBand,
  type ConfidenceLevel,
} from "../../lib/mastery";
import type { Chapter } from "../../lib/types";

const BAND_VAR: Record<MasteryBand, string> = {
  untouched: "var(--color-dim)",
  shaky: "var(--color-coral)",
  building: "var(--color-sky)",
  strong: "var(--color-mint)",
};
const BAND_LABEL: Record<MasteryBand, string> = {
  untouched: "Not started",
  shaky: "Shaky",
  building: "Building",
  strong: "Strong",
};
const LEVEL_VAR: Record<string, string> = {
  dim: "var(--color-dim)",
  coral: "var(--color-coral)",
  sky: "var(--color-sky)",
  mint: "var(--color-mint)",
};

/** A slim, band-coloured mastery bar. */
function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 rounded-full bg-raise overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }}
      />
    </div>
  );
}

export default function Planner() {
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const assessChapter = useStore((s) => s.assessChapter);

  const subjects = memory ? subjectsForClass(memory.classLevel) : [];
  const [checkSubjectId, setCheckSubjectId] = useState<string>("");

  if (!memory) return null;

  const overall = overallMastery(subjects, memory);
  const plan = buildPlan(subjects, memory, 6);

  // band counts across every chapter this class has
  const counts: Record<MasteryBand, number> = {
    untouched: 0,
    shaky: 0,
    building: 0,
    strong: 0,
  };
  for (const s of subjects) {
    for (const ch of s.chapters) {
      counts[masteryBand(chapterMastery(memory.progress[ch.id]))]++;
    }
  }

  const checkSubject =
    subjects.find((s) => s.id === checkSubjectId) ?? subjects[0];

  function setConfidence(chapter: Chapter, level: ConfidenceLevel) {
    // One atomic update — progress, strengths/focus and altitude together, read
    // off the latest memory so rapid ratings can't overwrite each other.
    assessChapter(chapter.id, chapter.title, level.status, level.confidence);
  }

  return (
    <div className="space-y-8">
      {/* Header + overall mastery */}
      <div className="card !p-7">
        <div className="eyebrow mb-1 inline-flex items-center gap-2">
          <Compass size={13} /> Your climb plan · Class {memory.classLevel}
        </div>
        <h1 className="font-display text-3xl font-bold text-cream">
          Exactly what to do next, {memory.name}.
        </h1>
        <p className="text-muted text-sm mt-2 max-w-xl">
          Pinnacle reads how far each chapter has climbed — how you rated it, how
          long since you touched it, how much it's worth in boards — and lines up
          the moves that lift your marks the most.
        </p>

        <div className="mt-6 grid sm:grid-cols-[auto_1fr] gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 grid place-items-center">
              <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="var(--color-raise)"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${overall} 100`}
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-xl font-bold text-cream">
                  {overall}
                </span>
              </div>
            </div>
            <div>
              <div className="eyebrow-dim">Overall mastery</div>
              <div className="text-sm text-muted mt-1 max-w-40">
                Weighted by how much each chapter counts in the exam.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(Object.keys(counts) as MasteryBand[]).map((b) => (
              <span
                key={b}
                className="chip"
                style={{ borderColor: `${BAND_VAR[b]}55` }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: BAND_VAR[b] }}
                />
                {counts[b]} {BAND_LABEL[b]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* The plan */}
      <div>
        <SectionHead
          eyebrow="Section A · Prioritised for you"
          title="Your next moves"
        />
        {plan.length === 0 ? (
          <Empty
            title="Nothing urgent — you're on top of it"
            body="Every chapter is either strong or freshly revised. Do a quick check below to keep the map honest, or push into Learn Better mode."
          />
        ) : (
          <div className="space-y-3">
            {plan.map(({ subject, chapter, mastery, action, reason }, i) => {
              const band = masteryBand(mastery);
              const meta = ACTION_META[action];
              return (
                <div
                  key={chapter.id}
                  className="card pnz-card flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="font-mono text-sm text-gold-dim w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="eyebrow-dim">{subject.name}</span>
                      <span
                        className="font-mono text-[10px] uppercase tracking-wider px-1.5 rounded"
                        style={{
                          color: BAND_VAR[band],
                          border: `1px solid ${BAND_VAR[band]}55`,
                        }}
                      >
                        {BAND_LABEL[band]}
                      </span>
                    </div>
                    <div className="font-display font-semibold text-cream truncate">
                      {chapter.title}
                    </div>
                    <div className="text-xs text-muted mt-1">{reason}</div>
                    <div className="mt-2 max-w-xs">
                      <Bar value={mastery.score} color={BAND_VAR[band]} />
                    </div>
                  </div>
                  <Link
                    to={meta.to}
                    className="btn-gold shrink-0 self-start sm:self-center"
                  >
                    {meta.verb} <ArrowRight size={15} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick check */}
      <div>
        <SectionHead
          eyebrow="Section B · 60-second diagnostic"
          title="Quick check"
          action={
            <div className="inline-flex items-center gap-2 text-xs text-dim">
              <ListChecks size={14} /> Rate each chapter honestly
            </div>
          }
        />
        <div className="card !p-6 space-y-5">
          <div>
            <label className="label" htmlFor="check-subject">
              Subject
            </label>
            <select
              id="check-subject"
              className="input max-w-xs"
              value={checkSubject?.id ?? ""}
              onChange={(e) => setCheckSubjectId(e.target.value)}
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} · {subjectMastery(s, memory)}%
                </option>
              ))}
            </select>
          </div>

          {checkSubject && (
            <div className="divide-y divide-line/60">
              {checkSubject.chapters.map((ch) => {
                const active = currentLevelKey(memory.progress[ch.id]);
                return (
                  <div
                    key={ch.id}
                    className="py-3 flex flex-col md:flex-row md:items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-cream font-medium truncate">
                        {ch.number}. {ch.title}
                      </div>
                      {ch.weightage && (
                        <div className="text-xs text-dim">{ch.weightage}</div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {CONFIDENCE_LEVELS.map((lvl) => {
                        const on = active === lvl.key;
                        return (
                          <button
                            key={lvl.key}
                            onClick={() => setConfidence(ch, lvl)}
                            className="text-xs rounded-full px-3 py-1 border transition-colors"
                            style={{
                              color: on ? "var(--color-ink)" : LEVEL_VAR[lvl.color],
                              background: on ? LEVEL_VAR[lvl.color] : "transparent",
                              borderColor: `${LEVEL_VAR[lvl.color]}66`,
                            }}
                          >
                            {lvl.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <p className="text-xs text-dim">
            Your ratings feed the tutor too — flag a chapter "Shaky" and it starts
            steering practice there.
          </p>
        </div>
      </div>

      {/* Mastery map */}
      <div>
        <SectionHead
          eyebrow="Section C · The whole picture"
          title="Mastery map"
          action={
            <div className="inline-flex items-center gap-2 text-xs text-dim">
              <Map size={14} /> Every chapter, every subject
            </div>
          }
        />
        <div className="grid md:grid-cols-2 gap-3">
          {subjects.map((subject) => {
            const sm = subjectMastery(subject, memory);
            return (
              <div key={subject.id} className="card">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-display font-semibold text-cream">
                    {subject.name}
                  </div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                    <Gauge size={13} /> {sm}%
                  </div>
                </div>
                <Bar value={sm} color="var(--color-gold)" />
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {subject.chapters.map((ch) => {
                    const mi = chapterMastery(memory.progress[ch.id]);
                    const band = masteryBand(mi);
                    return (
                      <span
                        key={ch.id}
                        title={`${ch.title} — ${BAND_LABEL[band]}${
                          mi.status !== "not-started" ? ` (${mi.score}%)` : ""
                        }`}
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ background: BAND_VAR[band] }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
