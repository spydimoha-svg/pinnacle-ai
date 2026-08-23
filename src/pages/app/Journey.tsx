import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ChevronLeft,
  Compass,
  Flag,
  Lightbulb,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useStore } from "../../lib/store";
import { Markdown, Empty } from "../../components/ui";
import { conceptMapFor } from "../../data/concepts";
import { journeyFor } from "../../data/journeys";
import { WorldCanvas, type WorldName } from "../../cinema/WorldCanvas";
import {
  branchAfterCheck,
  buildScenes,
  diagnose,
  directorsCut,
  flashbackFor,
  journeyProgress,
  startJourney,
  type Beat,
  type JourneyState,
  type Scene,
} from "../../lib/director";

/**
 * A cinematic learning journey.
 *
 * One beat on screen at a time, and the student commits to a prediction before
 * anything is revealed. That ordering is the whole design: it is what makes
 * them the protagonist rather than the audience, and it is enforced by the
 * Director, not by tone of voice.
 *
 * Nothing here calls a model. Every line comes from the authored concept graph
 * and every mark from grade.ts, so a journey plays identically offline — which
 * is also why it costs nothing to run.
 */

/* ------------------------------------------------------------------ *
 * The rail
 * ------------------------------------------------------------------ */

function Rail({
  scenes,
  state,
  onJump,
}: {
  scenes: Scene[];
  state: JourneyState;
  onJump: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
      {scenes.map((s, i) => {
        const outcome = state.outcomes[s.conceptId];
        const active = i === state.sceneIndex;
        const reached = i <= state.sceneIndex;
        return (
          <button
            key={s.id}
            onClick={() => reached && onJump(i)}
            disabled={!reached}
            title={s.title}
            className={`h-1.5 flex-1 min-w-8 rounded-full transition-colors ${
              active
                ? "bg-gold"
                : outcome === "mastered"
                  ? "bg-mint/70"
                  : outcome === "shaky"
                    ? "bg-coral/60"
                    : reached
                      ? "bg-line"
                      : "bg-line/40"
            }`}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Beat renderers
 * ------------------------------------------------------------------ */

function AskBeat({
  beat,
  onSubmit,
  label,
}: {
  beat: Beat;
  onSubmit: (answer: string) => void;
  label: string;
}) {
  const [value, setValue] = useState("");
  const [showHint, setShowHint] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue("");
    setShowHint(false);
    ref.current?.focus();
  }, [beat]);

  return (
    <div className="space-y-4">
      <p className="text-muted">{beat.body}</p>
      <div className="card-inset">
        <Markdown text={beat.question ?? ""} />
      </div>
      <textarea
        ref={ref}
        className="input min-h-24 resize-y"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Your answer — plain words are fine"
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && value.trim()) {
            onSubmit(value);
          }
        }}
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          className="btn-gold"
          onClick={() => value.trim() && onSubmit(value)}
          disabled={!value.trim()}
        >
          {label} <ArrowRight size={15} />
        </button>
        {beat.hint && (
          <button
            className="btn-ghost !text-xs"
            onClick={() => setShowHint((v) => !v)}
          >
            <Lightbulb size={14} /> {showHint ? "Hide hint" : "Nudge me"}
          </button>
        )}
      </div>
      {showHint && beat.hint && (
        <p className="text-sm text-gold-bright/90 border-l-2 border-gold-dim pl-3">
          {beat.hint}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The page
 * ------------------------------------------------------------------ */

export default function Journey() {
  const { chapterId = "" } = useParams();
  const reduced = useReducedMotion();

  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const profile = useStore((s) => s.profile);
  const setProfile = useStore((s) => s.setProfile);
  const assessChapter = useStore((s) => s.assessChapter);

  const map = useMemo(() => conceptMapFor(chapterId), [chapterId]);
  const framing = useMemo(() => journeyFor(chapterId), [chapterId]);
  const scenes = useMemo(
    () => (map ? buildScenes(map, framing) : []),
    [map, framing]
  );

  // The world is the subject's, not the chapter's — every maths journey shares
  // one light, so a student moving between chapters stays in the same place.
  const world: WorldName = useMemo(() => {
    const s = (map?.subject ?? "").toLowerCase();
    if (s.includes("phys")) return "physics";
    if (s.includes("chem")) return "chemistry";
    if (s.includes("bio")) return "biology";
    return "mathematics";
  }, [map]);

  const [state, setState] = useState<JourneyState>(() => startJourney(chapterId));
  const [opened, setOpened] = useState(false);
  const [feedback, setFeedback] = useState<{
    tone: "good" | "bad" | "note";
    headline: string;
    detail?: string;
  } | null>(null);
  const [extra, setExtra] = useState<Beat | null>(null);

  if (!map || scenes.length === 0) {
    return (
      <Empty
        title="No journey here yet"
        body="This chapter doesn't have a concept map loaded. Try the Tutor for it instead — it teaches from the same syllabus, just without the scenes."
      />
    );
  }

  const scene = scenes[state.sceneIndex];
  const beat = extra ?? scene.beats[state.beatIndex];
  const progress = journeyProgress(scenes, state);
  const concept = map.concepts.find((c) => c.id === scene.conceptId)!;
  const finished = state.sceneIndex >= scenes.length;

  /* ---------- transitions ---------- */

  const nextBeat = () => {
    setFeedback(null);
    setExtra(null);
    if (state.beatIndex + 1 < scene.beats.length) {
      setState((s) => ({ ...s, beatIndex: s.beatIndex + 1 }));
    } else {
      advanceScene("mastered");
    }
  };

  const advanceScene = (outcome: "mastered" | "shaky") => {
    setFeedback(null);
    setExtra(null);
    const conceptId = scene.conceptId;
    setState((s) => ({
      ...s,
      outcomes: { ...s.outcomes, [conceptId]: outcome },
      sceneIndex: s.sceneIndex + 1,
      beatIndex: 0,
      retries: 0,
      flashedBack: false,
      story: [
        ...s.story,
        {
          at: Date.now(),
          kind: outcome === "mastered" ? "mastery" : "misconception",
          conceptId,
          detail:
            outcome === "mastered"
              ? `Cleared "${scene.title}".`
              : `Left "${scene.title}" shaky — worth another pass.`,
        },
      ],
    }));
  };

  /* ---------- the two answering beats ---------- */

  const onPredict = (answer: string) => {
    // A prediction is never marked wrong out loud. Its job is commitment, not
    // assessment — punishing a guess here would teach the student to stop
    // guessing, which destroys the mechanism.
    const d = diagnose(
      { ...concept, check: { q: beat.question ?? "", answer: beat.answer ?? "", hint: "" } },
      answer
    );
    const right = d.mark === "correct";
    setFeedback({
      tone: right ? "good" : "note",
      headline: right ? "You called it." : "Hold that thought.",
      detail: right
        ? "Now watch why."
        : "Keep your answer in mind and see how it compares.",
    });
    setState((s) => ({
      ...s,
      story: [
        ...s.story,
        {
          at: Date.now(),
          kind: "prediction",
          conceptId: scene.conceptId,
          detail: `Predicted: "${answer.trim().slice(0, 120)}" — ${right ? "correct" : "not quite"}.`,
        },
      ],
    }));
  };

  const onCheck = (answer: string) => {
    const d = diagnose(concept, answer);

    if (d.mark === "correct") {
      setFeedback({ tone: "good", headline: d.headline, detail: d.detail });
      const p = profile();
      setProfile({ ...p, firstTimeWins: p.firstTimeWins + 1, updatedAt: Date.now() });
      return;
    }

    const prereq = flashbackFor(map, concept);
    const branch = branchAfterCheck(state, d.mark, !!prereq);

    setState((s) => ({
      ...s,
      retries: s.retries + 1,
      story: [
        ...s.story,
        {
          at: Date.now(),
          kind: "misconception",
          conceptId: scene.conceptId,
          detail: `${d.headline} ${d.detail ?? ""}`.trim(),
        },
      ],
    }));

    setFeedback({ tone: "bad", headline: d.headline, detail: d.detail });

    if (branch === "flashback" && prereq) {
      // §11: go back to what this idea STANDS ON, and check it for real.
      setState((s) => ({ ...s, flashedBack: true }));
      setExtra({
        kind: "flashback",
        caption: "Back a step",
        body: `This rests on something earlier — **${prereq.title}** (${prereq.from}). ${prereq.why}`,
        question: prereq.probe.q,
        answer: prereq.probe.answer,
        hint: "Take your time. Getting this straight is what unblocks the scene above.",
      });
      return;
    }

    if (branch === "reteach") {
      const p = profile();
      setProfile({ ...p, reteaches: p.reteaches + 1, updatedAt: Date.now() });
      setExtra({
        kind: "formalise",
        caption: "Again, differently",
        body: `${concept.oneLine}\n\n${concept.brief}`,
      });
      return;
    }

    if (branch === "concede") {
      setFeedback({
        tone: "note",
        headline: "Let's not grind on this one.",
        detail:
          "I've marked it shaky and we'll come back to it. Sitting on a single idea until it cracks is how people give up.",
      });
    }
  };

  /* ---------- the opening ---------- */

  if (!opened) {
    return (
      <MotionConfig reducedMotion={reduced ? "always" : "never"}>
        <WorldCanvas world={world} />
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-5 max-w-xl"
          >
            <div className="eyebrow">
              Class {map.classLevel} · {map.subject} · {map.chapterTitle}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream leading-[1.05]">
              {framing?.title ?? map.chapterTitle}
            </h1>
            <p className="text-muted text-lg">
              {framing?.opening ?? map.bigIdea}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <button className="btn-gold !px-7 !py-3" onClick={() => setOpened(true)}>
              <Sparkles size={16} /> Begin
            </button>
            <span className="font-mono text-xs text-dim">
              {scenes.length} scenes · about {scenes.length * 3} minutes
            </span>
          </motion.div>
        </div>
      </MotionConfig>
    );
  }

  /* ---------- the closing ---------- */

  if (finished) {
    const cut = directorsCut(state);
    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <div className="eyebrow">Journey complete</div>
          <h1 className="font-display text-4xl font-bold text-cream">
            {framing?.title ?? map.chapterTitle}
          </h1>
          <p className="text-muted text-lg">{framing?.closing ?? map.bigIdea}</p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="chip-gold font-mono">
              {progress.mastered}/{progress.total} mastered
            </span>
            {progress.shaky > 0 && (
              <span className="chip-coral font-mono">{progress.shaky} shaky</span>
            )}
          </div>
        </div>

        {cut.length > 0 && (
          <div className="space-y-3">
            <div className="eyebrow">Director's cut · where your reasoning turned</div>
            {cut.map((e, i) => (
              <div key={i} className="card-inset">
                <div className="font-mono text-xs text-gold mb-1">
                  {scenes.find((s) => s.conceptId === e.conceptId)?.title ?? e.conceptId}
                </div>
                <p className="text-sm text-muted">{e.detail}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <button
            className="btn-ghost"
            onClick={() => {
              setState(startJourney(chapterId));
              setOpened(false);
            }}
          >
            <RotateCcw size={15} /> Run it again
          </button>
          <button
            className="btn-gold"
            onClick={() =>
              assessChapter(
                chapterId,
                map.chapterTitle,
                progress.shaky > 0 ? "learning" : "revising",
                progress.percent
              )
            }
          >
            Save my progress
          </button>
          <Link to={`/app/trial/${chapterId}`} className="btn-gold">
            <Flag size={15} /> Face the final trial
          </Link>
          <Link to="/app/subjects" className="btn-ghost">
            <Compass size={15} /> Next world
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- the scene ---------- */

  const isAsk =
    beat.kind === "predict" || beat.kind === "check" || beat.kind === "flashback";

  return (
    <MotionConfig reducedMotion={reduced ? "always" : "never"}>
      {/* Dimmer during a scene than on the title card: the student is reading
          here, and atmosphere must never compete with the sentence. */}
      <WorldCanvas world={world} intensity={0.55} />
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Link to="/app/subjects" className="btn-ghost !px-2 !py-1 !text-xs">
              <ChevronLeft size={13} /> Leave
            </Link>
            <div className="flex-1" />
            <span className="font-mono text-xs text-dim">
              Scene {scene.number} of {scenes.length}
            </span>
          </div>
          <Rail
            scenes={scenes}
            state={state}
            onJump={(i) =>
              setState((s) => ({ ...s, sceneIndex: i, beatIndex: 0, retries: 0 }))
            }
          />
        </div>

        <div>
          <div className="eyebrow mb-1">
            {beat.caption ?? "Scene"}
            {scene.marks ? ` · ${scene.marks}` : ""}
          </div>
          <h2 className="font-display text-2xl font-bold text-cream">
            {scene.title}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${scene.id}-${state.beatIndex}-${extra?.kind ?? ""}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32 }}
          >
            {isAsk ? (
              <AskBeat
                beat={beat}
                label={beat.kind === "predict" ? "Commit" : "Answer"}
                onSubmit={beat.kind === "check" ? onCheck : onPredict}
              />
            ) : (
              <Markdown text={beat.body} />
            )}
          </motion.div>
        </AnimatePresence>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card-inset border-l-2 ${
              feedback.tone === "good"
                ? "!border-l-mint"
                : feedback.tone === "bad"
                  ? "!border-l-coral"
                  : "!border-l-gold"
            }`}
          >
            <div
              className={`font-semibold text-sm mb-1 ${
                feedback.tone === "good"
                  ? "text-mint"
                  : feedback.tone === "bad"
                    ? "text-coral"
                    : "text-gold"
              }`}
            >
              {feedback.headline}
            </div>
            {feedback.detail && (
              <p className="text-sm text-muted">{feedback.detail}</p>
            )}
          </motion.div>
        )}

        {/* Forward control. An asking beat with no verdict yet must not offer
            one — that is the only thing holding the predict-before-reveal
            order in place. */}
        {(!isAsk || feedback) && (
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button className="btn-gold" onClick={nextBeat}>
              Continue <ArrowRight size={15} />
            </button>
            {feedback?.tone === "bad" && (
              <button
                className="btn-ghost !text-xs"
                onClick={() => advanceScene("shaky")}
              >
                Move on for now
              </button>
            )}
          </div>
        )}

        <div className="font-mono text-[11px] text-dim pt-4 border-t border-line/50">
          Class {map.classLevel} · {map.chapterTitle}
          {map.authored ? " · authored from NCERT" : " · derived map"}
          {memory ? ` · ${memory.name}'s run` : ""}
        </div>
      </div>
    </MotionConfig>
  );
}
