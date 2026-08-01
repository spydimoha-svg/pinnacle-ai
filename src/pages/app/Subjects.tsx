import { useState } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BookOpen,
  BookText,
  Briefcase,
  Calculator,
  ChevronRight,
  Cpu,
  Dna,
  Feather,
  FlaskConical,
  Globe,
  History,
  Landmark,
  Languages,
  Leaf,
  Microscope,
  PenLine,
  Scale,
  ScrollText,
  Sigma,
  TrendingUp,
} from "lucide-react";
import { useStore } from "../../lib/store";
import { subjectsForClass } from "../../data";
import type { ProgressStatus, Subject } from "../../lib/types";
import { Empty, ProgressBar } from "../../components/ui";

/** Static lookup from subject.icon strings to imported lucide icons. */
const SUBJECT_ICONS: Record<string, LucideIcon> = {
  Atom,
  BookOpen,
  BookText,
  Briefcase,
  Calculator,
  Cpu,
  Dna,
  Feather,
  FlaskConical,
  Globe,
  History,
  Landmark,
  Languages,
  Leaf,
  Microscope,
  PenLine,
  Scale,
  ScrollText,
  Sigma,
  TrendingUp,
};

function subjectIcon(name: string): LucideIcon {
  return SUBJECT_ICONS[name] ?? BookOpen;
}

const COLOR_TEXT: Record<Subject["color"], string> = {
  gold: "text-gold",
  mint: "text-mint",
  coral: "text-coral",
  sky: "text-sky",
  violet: "text-violet",
};

const STATUS_META: Record<ProgressStatus, { label: string; cls: string }> = {
  "not-started": { label: "Not started", cls: "text-dim border-line bg-raise" },
  learning: { label: "Learning", cls: "text-sky border-sky/30 bg-sky/10" },
  revising: { label: "Revising", cls: "text-violet border-violet/30 bg-violet/10" },
  mastered: { label: "Mastered", cls: "text-gold border-gold-dim/50 bg-gold/10" },
};

function StatusPill({ status }: { status: ProgressStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider whitespace-nowrap ${meta.cls}`}
    >
      {meta.label}
    </span>
  );
}

export default function Subjects() {
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!memory) return null;

  const subjects = subjectsForClass(memory.classLevel);
  if (subjects.length === 0) {
    return (
      <Empty
        title="No subjects yet"
        body={`The Class ${memory.classLevel} curriculum hasn't been loaded for your school. Check back soon, or ask the tutor anything in the meantime.`}
        action={
          <Link to="/app/tutor" className="btn-gold">
            Ask the tutor
          </Link>
        }
      />
    );
  }

  const selected =
    subjects.find((s) => s.id === selectedId) ?? subjects[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="eyebrow mb-1">Section A · Class {memory.classLevel}</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          Your subjects
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          Pick a subject to see its chapters, board weightage and your progress.
          Open any chapter to learn it properly — teaching, PYQs and videos in
          one place.
        </p>
      </div>

      {/* Subject grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {subjects.map((subj) => {
          const Icon = subjectIcon(subj.icon);
          const done = subj.chapters.filter(
            (c) => memory.progress[c.id]?.status === "mastered"
          ).length;
          const pct = subj.chapters.length
            ? Math.round((done / subj.chapters.length) * 100)
            : 0;
          const active = subj.id === selected.id;
          return (
            <button
              key={subj.id}
              type="button"
              onClick={() => setSelectedId(subj.id)}
              aria-pressed={active}
              className={`card card-hover block text-left w-full ${
                active ? "!border-gold-dim" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className={COLOR_TEXT[subj.color]}
                />
                <span className="font-mono text-xs text-dim">
                  {subj.chapters.length} ch
                </span>
              </div>
              <div className="font-display font-semibold text-cream mb-2">
                {subj.name}
              </div>
              <ProgressBar value={pct} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-dim">
                  {done} of {subj.chapters.length} mastered
                </span>
                {active && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gold">
                    Open
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Chapter list for the selected subject */}
      <div>
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <div className="eyebrow-dim mb-1">Chapters · {selected.name}</div>
            <h2 className="text-xl font-semibold text-cream font-display">
              {selected.chapters.length} chapters in the blueprint
            </h2>
          </div>
        </div>

        <div className="card !p-0 overflow-hidden divide-y divide-line">
          {selected.chapters.map((ch) => {
            const prog = memory.progress[ch.id];
            const status: ProgressStatus = prog?.status ?? "not-started";
            const confidence = prog?.confidence ?? 0;
            return (
              <Link
                key={ch.id}
                to={`/app/chapter/${ch.id}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-raise transition-colors group"
              >
                <span className="font-mono text-xs text-dim w-7 shrink-0">
                  {String(ch.number).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-cream truncate group-hover:text-gold-bright transition-colors">
                    {ch.title}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <StatusPill status={status} />
                    <span className="inline-flex items-center gap-2">
                      <ProgressBar value={confidence} className="w-16" />
                      <span className="font-mono text-[10px] text-dim">
                        {confidence}%
                      </span>
                    </span>
                  </div>
                </div>
                {ch.weightage && (
                  <span className="marks hidden sm:inline">{ch.weightage}</span>
                )}
                <ChevronRight
                  size={16}
                  strokeWidth={1.8}
                  className="text-dim group-hover:text-gold transition-colors shrink-0"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
