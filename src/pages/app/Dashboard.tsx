import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Flame,
  MessageCircle,
  Mountain,
  FileText,
  NotebookPen,
  Compass,
} from "lucide-react";
import { useStore } from "../../lib/store";
import { subjectsForClass } from "../../data";
import { Empty, SectionHead, Stat, ProgressBar } from "../../components/ui";
import { Ridgeline } from "../../components/Logo";
import { buildPlan, ACTION_META } from "../../lib/mastery";

export default function Dashboard() {
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const school = useStore((s) =>
    s.schools.find((x) => x.id === s.currentUser?.schoolId)
  );
  if (!memory) return null;

  const subjects = subjectsForClass(memory.classLevel);
  const allChapters = subjects.flatMap((s) => s.chapters);
  const mastered = Object.values(memory.progress).filter(
    (p) => p.status === "mastered"
  ).length;

  const focus = memory.focusAreas[0];
  const plan = buildPlan(subjects, memory, 3);

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="relative card !bg-pit/70 overflow-hidden !p-7">
        <div className="eyebrow mb-1">
          {school ? school.name : "Pinnacle"} · Class {memory.classLevel}
        </div>
        <h1 className="font-display text-3xl font-bold text-cream">
          Chalo {memory.name}, let's climb.
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          {focus
            ? `Last time we flagged ${focus} — a focused 40 minutes today moves it from "focus area" to "strength".`
            : "Pick a chapter, or just ask the tutor where to start — it knows your class blueprint."}
        </p>
        <div className="flex flex-wrap gap-3 mt-5">
          <Link to="/app/tutor" className="btn-gold">
            <MessageCircle size={16} /> Ask the tutor
          </Link>
          <Link to="/app/worksheets" className="btn-ghost">
            <FileText size={16} /> Generate a worksheet
          </Link>
        </div>
        <Ridgeline className="absolute bottom-0 left-0 w-full h-16 opacity-70 pointer-events-none" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat
          label="Altitude"
          value={
            <span className="inline-flex items-center gap-2">
              <Mountain size={20} className="text-gold" /> {memory.altitude} m
            </span>
          }
          sub="Points climbed so far"
          accent
        />
        <Stat
          label="Streak"
          value={
            <span className="inline-flex items-center gap-2">
              <Flame size={20} className="text-coral" /> {memory.streak} days
            </span>
          }
          sub="Keep it alive today"
        />
        <Stat
          label="Chapters mastered"
          value={`${mastered} / ${allChapters.length}`}
          sub="Across all subjects"
        />
        <Stat
          label="Mode"
          value={memory.mode === "board" ? "Board" : memory.mode.toUpperCase()}
          sub={
            memory.mode === "board"
              ? "CBSE board preparation"
              : "Learn Better — entrance track"
          }
        />
      </div>

      {/* Subjects */}
      <div>
        <SectionHead
          eyebrow={`Section A · Class ${memory.classLevel}`}
          title="Your subjects"
          action={
            <Link
              to="/app/subjects"
              className="text-sm text-gold hover:text-gold-bright inline-flex items-center gap-1"
            >
              All subjects <ArrowRight size={14} />
            </Link>
          }
        />
        {subjects.length === 0 ? (
          <Empty
            title="No subjects yet"
            body={`The Class ${memory.classLevel} curriculum hasn't been loaded for your school. Check back soon, or ask the tutor anything in the meantime.`}
            action={
              <Link to="/app/tutor" className="btn-gold">
                Ask the tutor
              </Link>
            }
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subjects.slice(0, 6).map((subj) => {
              const done = subj.chapters.filter(
                (c) => memory.progress[c.id]?.status === "mastered"
              ).length;
              const pct = subj.chapters.length
                ? Math.round((done / subj.chapters.length) * 100)
                : 0;
              return (
                <Link
                  key={subj.id}
                  to="/app/subjects"
                  className="card card-hover block"
                >
                  <div className="flex items-center justify-between mb-3">
                    <BookOpen size={18} className={`text-${subj.color}`} />
                    <span className="font-mono text-xs text-dim">
                      {subj.chapters.length} ch
                    </span>
                  </div>
                  <div className="font-display font-semibold text-cream mb-2">
                    {subj.name}
                  </div>
                  <ProgressBar value={pct} />
                  <div className="text-xs text-dim mt-2">
                    {done} of {subj.chapters.length} mastered
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Today's plan — driven by the mastery model */}
      <div>
        <SectionHead
          eyebrow="Section B · Prioritised for you"
          title="Do this next"
          action={
            <Link
              to="/app/planner"
              className="text-sm text-gold hover:text-gold-bright inline-flex items-center gap-1"
            >
              Full plan <ArrowRight size={14} />
            </Link>
          }
        />
        {plan.length === 0 ? (
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/app/planner" className="card card-hover block">
              <Compass size={18} className="text-gold mb-2" />
              <div className="font-semibold text-cream text-sm mb-1">
                Run a quick check
              </div>
              <p className="text-xs text-muted">
                Rate your chapters so Pinnacle can point you at the exact next
                move. 60 seconds.
              </p>
            </Link>
            <Link to="/app/papers" className="card card-hover block">
              <FileText size={18} className="text-sky mb-2" />
              <div className="font-semibold text-cream text-sm mb-1">
                Attempt 5 PYQs
              </div>
              <p className="text-xs text-muted">
                Previous-year questions with marking-scheme answers and examiner
                keywords.
              </p>
            </Link>
            <Link to="/app/blob" className="card card-hover block">
              <NotebookPen size={18} className="text-mint mb-2" />
              <div className="font-semibold text-cream text-sm mb-1">
                Drop today's Blob
              </div>
              <p className="text-xs text-muted">
                30 seconds: what you finished, what's stuck, how you're feeling.
              </p>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-3">
            {plan.map(({ subject, chapter, action, reason }) => {
              const meta = ACTION_META[action];
              return (
                <Link
                  key={chapter.id}
                  to={meta.to}
                  className="card card-hover block"
                >
                  <div className="eyebrow-dim mb-2">{subject.name}</div>
                  <div className="font-semibold text-cream text-sm mb-1">
                    {chapter.title}
                  </div>
                  <p className="text-xs text-muted">{reason}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-gold">
                    {meta.verb} <ArrowRight size={13} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
