import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useStore } from "../../lib/store";
import { subjectsForClass } from "../../data";
import { chapterMastery, subjectMastery, weightageMarks } from "../../lib/mastery";
import { framedChapterIds } from "../../data/journeys";
import { WorldCanvas, worldForSubject } from "../../cinema/WorldCanvas";
import { Empty } from "../../components/ui";
import type { Subject } from "../../lib/types";

/**
 * WORLDS — what used to be the subject list.
 *
 * The old page put every subject in a card and every chapter in a row, which
 * is a filing cabinet: correct, complete, and completely inert. A subject is
 * not a folder. It is somewhere you go, and it should look different when you
 * arrive.
 *
 * So each subject is a world with its own light, and entering one changes the
 * whole screen rather than expanding a panel. Inside, chapters are laid out as
 * a path — one continuous line with the student's position on it — because the
 * order of a syllabus is real information that a grid throws away.
 */

/** What each world is made of, in one line. Sets the mood before the maths. */
const WORLD_BLURB: Record<string, string> = {
  mathematics: "Structure, pattern, and proof. Nothing here is opinion.",
  physics: "Motion, force, light and time. The rules the world already obeys.",
  chemistry: "Matter, bonds and change. Why anything holds together at all.",
  biology: "Cells, systems and life. Machinery that built itself.",
};

function WorldTile({
  subject,
  mastery,
  onEnter,
}: {
  subject: Subject;
  mastery: number;
  onEnter: () => void;
}) {
  const world = worldForSubject(subject.name);
  return (
    <motion.button
      layoutId={`world-${subject.id}`}
      onClick={onEnter}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="group relative text-left overflow-hidden rounded-lg border border-line hover:border-gold-dim bg-pit/40 p-6 min-h-44 flex flex-col justify-between"
    >
      {/* The world's light, bleeding in from one corner. */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity"
        style={{
          background:
            world === "physics"
              ? "#6fa8c9"
              : world === "chemistry"
                ? "#a58fd6"
                : world === "biology"
                  ? "#6fb98c"
                  : "#e8c889",
        }}
      />
      <div className="relative space-y-2">
        <h2 className="font-display text-2xl font-bold text-cream group-hover:text-gold transition-colors">
          {subject.name}
        </h2>
        <p className="text-sm text-muted max-w-xs">{WORLD_BLURB[world]}</p>
      </div>
      <div className="relative flex items-end justify-between gap-4 pt-4">
        <span className="font-mono text-xs text-dim">
          {subject.chapters.length} journeys
        </span>
        <span className="font-mono text-sm text-gold">{mastery}%</span>
      </div>
      {/* Mastery as the world's own horizon line. */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gold/70 transition-all duration-700"
        style={{ width: `${mastery}%` }}
      />
    </motion.button>
  );
}

export default function Worlds() {
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const reduced = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  const subjects = useMemo(
    () => (memory ? subjectsForClass(memory.classLevel) : []),
    [memory]
  );

  if (!memory) {
    return <Empty title="Not signed in" body="Sign in to open your worlds." />;
  }

  const open = subjects.find((s) => s.id === openId) ?? null;
  const framed = framedChapterIds();

  return (
    <MotionConfig reducedMotion={reduced ? "always" : "never"}>
      <WorldCanvas
        world={open ? worldForSubject(open.name) : "mathematics"}
        intensity={open ? 0.7 : 0.45}
      />

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="space-y-2">
              <div className="eyebrow">Class {memory.classLevel}</div>
              <h1 className="font-display text-4xl font-bold text-cream">
                Choose a world
              </h1>
              <p className="text-muted max-w-lg">
                Each one runs on its own rules. You can enter any of them, in
                any order.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {subjects.map((s) => (
                <WorldTile
                  key={s.id}
                  subject={s}
                  mastery={subjectMastery(s, memory)}
                  onEnter={() => setOpenId(s.id)}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="inside"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto space-y-9"
          >
            <div className="space-y-4">
              <button
                onClick={() => setOpenId(null)}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-dim hover:text-cream transition-colors"
              >
                <ArrowLeft size={13} /> All worlds
              </button>
              <div className="space-y-2">
                <h1 className="font-display text-4xl font-bold text-cream">
                  {open.name}
                </h1>
                <p className="text-muted max-w-lg">
                  {WORLD_BLURB[worldForSubject(open.name)]}
                </p>
                <div className="font-mono text-sm text-gold pt-1">
                  {subjectMastery(open, memory)}% explored
                </div>
              </div>
            </div>

            {/* The path. One continuous line, chapters as stations on it, so
                the order of the syllabus is visible rather than implied. */}
            <div className="relative pl-7">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
              <div className="space-y-1">
                {open.chapters.map((ch) => {
                  const mi = chapterMastery(memory.progress[ch.id]);
                  const isJourney = framed.includes(ch.id);
                  const dot =
                    mi.status === "mastered"
                      ? "bg-mint border-mint"
                      : mi.status === "not-started"
                        ? "bg-pit border-line"
                        : "bg-gold border-gold";
                  return (
                    <Link
                      key={ch.id}
                      to={isJourney ? `/app/journey/${ch.id}` : `/app/chapter/${ch.id}`}
                      className="group relative flex items-baseline gap-4 py-3 -ml-7 pl-7 rounded hover:bg-raise/40 transition-colors"
                    >
                      <span
                        className={`absolute left-0 top-[1.15rem] h-[15px] w-[15px] rounded-full border-2 ${dot} transition-colors`}
                      />
                      <span className="font-mono text-[11px] text-dim w-6 shrink-0">
                        {ch.number}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="text-cream group-hover:text-gold transition-colors">
                          {ch.title}
                        </span>
                        {isJourney && (
                          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-gold-deep">
                            journey
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-xs text-dim shrink-0">
                        {weightageMarks(ch)}m
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-dim opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
