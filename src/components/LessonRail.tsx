import { Check, CircleDot, Lock, X, TriangleAlert } from "lucide-react";
import { lessonMap, type LessonState } from "../lib/lesson";
import { profileSummary, type LearnerProfile } from "../lib/learner";

const PHASE_LABEL: Record<string, string> = {
  placement: "Finding out what you know",
  grade: "Reading your answers",
  teach: "Teaching this step",
  check: "Checking it landed",
  reteach: "Explaining it a different way",
  recap: "Wrapping up the chapter",
  done: "Chapter complete",
};

/**
 * The lesson rail: where the student is in the chapter, which steps are behind
 * them, and what the tutor currently thinks about how they learn.
 *
 * Shown because a student walking through a chapter one step at a time needs to
 * see that it IS a route with an end — otherwise "one small step" reads as
 * "this is going nowhere".
 */
export function LessonRail({
  state,
  profile,
  onQuit,
}: {
  state: LessonState;
  profile: LearnerProfile;
  onQuit: () => void;
}) {
  const map = lessonMap(state);
  if (!map) return null;
  const done = Object.values(state.progress).filter((p) => p.status === "mastered").length;

  return (
    <div className="card !p-4 mb-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="eyebrow mb-0.5">
            Lesson · step {Math.min(state.index + 1, map.concepts.length)} of {map.concepts.length}
          </div>
          <div className="font-display text-base font-semibold text-cream truncate">
            {map.chapterTitle}
          </div>
          <div className="text-xs text-dim mt-0.5">{PHASE_LABEL[state.phase] ?? state.phase}</div>
        </div>
        <button className="btn-ghost !py-1.5 !px-2.5 text-xs shrink-0" onClick={onQuit} title="Leave the lesson and go back to free chat">
          <X size={13} /> Leave
        </button>
      </div>

      <ol className="space-y-1.5">
        {map.concepts.map((c, i) => {
          const p = state.progress[c.id];
          const current = i === state.index;
          const mastered = p?.status === "mastered";
          const shaky = p?.status === "shaky";
          return (
            <li
              key={c.id}
              className={`flex items-start gap-2 text-xs ${
                current ? "text-cream" : mastered ? "text-muted" : "text-dim"
              }`}
            >
              <span className="mt-0.5 shrink-0">
                {mastered ? (
                  <Check size={13} className="text-mint" />
                ) : shaky ? (
                  <TriangleAlert size={13} className="text-gold" />
                ) : current ? (
                  <CircleDot size={13} className="text-gold" />
                ) : (
                  <Lock size={13} className="opacity-40" />
                )}
              </span>
              <span className={current ? "font-medium" : ""}>{c.title}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 pt-3 border-t border-line flex items-center justify-between gap-3 text-[11px] text-dim">
        <span>
          {done} of {map.concepts.length} locked in
        </span>
        {/* What the tutor has worked out about this student, shown plainly —
            a claim about how someone learns should be visible to them. */}
        <span className="truncate" title="How I'm teaching you right now">
          Teaching you: {profileSummary(profile)}
        </span>
      </div>
      {!map.authored && (
        <p className="text-[11px] text-dim mt-2 italic">
          This chapter's steps come from the syllabus outline, so the questions are written live rather than pulled from a stored set.
        </p>
      )}
    </div>
  );
}
