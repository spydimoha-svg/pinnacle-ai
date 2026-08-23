import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Flame, Mountain } from "lucide-react";
import { useStore } from "../../lib/store";
import { subjectsForClass } from "../../data";
import {
  buildPlan,
  chapterMastery,
  overallMastery,
  weightageMarks,
} from "../../lib/mastery";
import { framedChapterIds } from "../../data/journeys";
import { WorldCanvas, worldForSubject } from "../../cinema/WorldCanvas";
import { Empty } from "../../components/ui";

/**
 * YOUR JOURNEY — what used to be the dashboard.
 *
 * The old page opened with four stat tiles and nine cards, which is the shape
 * of an admin panel: everything visible at once, nothing more important than
 * anything else, and the student left to work out where to start. A student
 * opening a study app has exactly one question, and it is not "how am I doing
 * across five dimensions". It is "what do I do now".
 *
 * So this page answers that question and then stops. One mission fills the
 * screen. Everything else — mastery, weak areas, what is coming — is real and
 * available, but it is folded away until asked for, because information the
 * student has not asked for is noise competing with the one instruction that
 * matters.
 */
export default function YourJourney() {
  const currentUser = useStore((s) => s.currentUser);
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const subjects = useMemo(
    () => (memory ? subjectsForClass(memory.classLevel) : []),
    [memory]
  );

  const plan = useMemo(
    () => (memory ? buildPlan(subjects, memory, 6) : []),
    [subjects, memory]
  );

  if (!currentUser || !memory) {
    return (
      <Empty
        title="Not signed in"
        body="Sign in to pick your journey back up."
      />
    );
  }

  const mission = plan[0];
  const rest = plan.slice(1, 4);
  const overall = overallMastery(subjects, memory);
  const framed = framedChapterIds();

  // Where BEGIN actually goes. A chapter with authored film grammar opens as a
  // journey; everything else opens with the tutor, which teaches the same
  // syllabus without the scenes. Sending a student to a journey that does not
  // exist would be the worst possible first impression of the format.
  const missionHref = mission
    ? framed.includes(mission.chapter.id)
      ? `/app/journey/${mission.chapter.id}`
      : `/app/chapter/${mission.chapter.id}`
    : "/app/subjects";

  const missionNumber = String(
    Object.keys(memory.progress).length + 1
  ).padStart(2, "0");

  return (
    <MotionConfig reducedMotion={reduced ? "always" : "never"}>
      <WorldCanvas
        world={mission ? worldForSubject(mission.subject.name) : "mathematics"}
        intensity={0.6}
      />

      <div className="max-w-3xl mx-auto space-y-12">
        {/* Who and where — one quiet line, not a header block. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <span className="eyebrow">
            {memory.name} · Class {memory.classLevel}
          </span>
          <div className="flex-1" />
          <span className="chip" title="Study streak">
            <Flame size={12} className="text-coral" /> {memory.streak}
          </span>
          <span className="chip-gold" title="Altitude climbed">
            <Mountain size={12} /> {memory.altitude} m
          </span>
        </motion.div>

        {mission ? (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-7"
          >
            <div className="space-y-3">
              <div className="font-mono text-xs tracking-[0.2em] text-gold-deep uppercase">
                Mission {missionNumber}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream leading-[1.05] max-w-2xl">
                {mission.chapter.title}
              </h1>
              <p className="text-muted text-lg max-w-xl">{mission.reason}</p>
            </div>

            {/* The numbers that justify the mission, as a line of type rather
                than a row of tiles. */}
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-sm">
              <span className="text-dim">
                Mastery{" "}
                <span className="text-cream text-base">
                  {mission.mastery.score}%
                </span>
              </span>
              <span className="text-dim">
                Target <span className="text-gold text-base">80%</span>
              </span>
              <span className="text-dim">
                Worth{" "}
                <span className="text-cream text-base">
                  {weightageMarks(mission.chapter)} marks
                </span>
              </span>
              <span className="text-dim">{mission.subject.name}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link to={missionHref} className="btn-gold !px-7 !py-3">
                Begin <ArrowRight size={16} />
              </Link>
              {framed.includes(mission.chapter.id) && (
                <span className="font-mono text-xs text-gold-deep">
                  plays as a journey
                </span>
              )}
            </div>
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h1 className="font-display text-4xl font-bold text-cream">
              Nothing is due.
            </h1>
            <p className="text-muted text-lg max-w-xl">
              Every chapter you have started is strong and fresh. Open a new
              world when you are ready for the next one.
            </p>
            <Link to="/app/subjects" className="btn-gold">
              Choose a world <ArrowRight size={16} />
            </Link>
          </motion.section>
        )}

        {/* Everything else, folded away until asked for. */}
        <div className="pt-2">
          <button
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-dim hover:text-cream transition-colors"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            <ChevronDown
              size={14}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
            {expanded ? "Less" : "Where you stand"}
          </button>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-7 space-y-9"
            >
              <div className="space-y-2">
                <div className="eyebrow-dim">Overall mastery</div>
                <div className="flex items-end gap-4">
                  <span className="font-display text-5xl font-bold text-gold">
                    {overall}%
                  </span>
                  <span className="text-muted text-sm pb-2">
                    across Class {memory.classLevel}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-line overflow-hidden max-w-md">
                  <div
                    className="h-full bg-gold transition-all duration-700"
                    style={{ width: `${overall}%` }}
                  />
                </div>
              </div>

              {rest.length > 0 && (
                <div className="space-y-3">
                  <div className="eyebrow-dim">Then these</div>
                  <div className="divide-y divide-line/60 border-t border-line/60">
                    {rest.map((p) => (
                      <Link
                        key={p.chapter.id}
                        to={`/app/chapter/${p.chapter.id}`}
                        className="flex items-baseline gap-4 py-3 group"
                      >
                        <span className="font-mono text-xs text-dim w-10 shrink-0">
                          {p.mastery.score}%
                        </span>
                        <span className="text-cream group-hover:text-gold transition-colors">
                          {p.chapter.title}
                        </span>
                        <span className="text-xs text-dim ml-auto shrink-0 max-sm:hidden">
                          {p.subject.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {memory.focusAreas.length > 0 && (
                <div className="space-y-2">
                  <div className="eyebrow-dim">Weak ground</div>
                  <div className="flex flex-wrap gap-2">
                    {memory.focusAreas.map((f) => (
                      <span key={f} className="chip-coral">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {memory.strengths.length > 0 && (
                <div className="space-y-2">
                  <div className="eyebrow-dim">Solid ground</div>
                  <div className="flex flex-wrap gap-2">
                    {memory.strengths.map((f) => (
                      <span key={f} className="chip-mint">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Narrative progress — §24. Growth said in words, because a
                  percentage does not feel like anything. */}
              {Object.keys(memory.progress).length > 0 && (
                <div className="space-y-2">
                  <div className="eyebrow-dim">How far you've come</div>
                  <p className="text-muted max-w-xl">
                    You have opened{" "}
                    <span className="text-cream">
                      {Object.keys(memory.progress).length}
                    </span>{" "}
                    chapters and mastered{" "}
                    <span className="text-cream">
                      {
                        Object.values(memory.progress).filter(
                          (p) => chapterMastery(p).status === "mastered"
                        ).length
                      }
                    </span>
                    . Your streak is {memory.streak} day
                    {memory.streak === 1 ? "" : "s"} long.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
