import { useEffect, useMemo, useRef, useState } from "react";
import { characterById } from "../data/cast";
import type { Emotion } from "../data/cast";
import { Toon } from "./cast/Toon";
import { Stage3D } from "./cast/Stage3D";
import { Markdown } from "./ui";
import type { SceneVisual } from "../lib/videoScript";
import { motion, AnimatePresence } from "motion/react";
import katex from "katex";
import DOMPurify from "dompurify";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Sparkles,
} from "lucide-react";
import type { LessonVideo } from "../lib/videoScript";
import type { NarrationLang } from "../lib/speech";
import {
  speak,
  speechAvailable,
  estimateSeconds,
  primeVoices,
  stopSpeech,
} from "../lib/speech";

type StepKind = "hook" | "scene" | "recap";

/**
 * What appears beside the character.
 *
 * A 3D object goes to the renderer; a plot or a diagram is handed to the same
 * Markdown pipeline the tutor uses, so a graph inside a video is drawn by the
 * exact engine (axes, scale, table of values, corrected geometry) that draws a
 * graph inside a lesson. One figure engine, one standard.
 */
function SceneVisualView({ visual }: { visual: SceneVisual }) {
  if (!visual) return null;
  if (visual.type === "3d") return <Stage3D scene={visual.scene} />;
  const fence = visual.type === "plot" ? "plot" : "mermaid";
  return (
    <div className="pnz-scene-figure">
      <Markdown text={["```" + fence, visual.source, "```"].join("\n")} />
    </div>
  );
}

interface Step {
  kind: StepKind;
  label: string;
  caption: string;
  narration: string;
  formula?: string;
  recap?: string[];
  accent: string;
  emotion?: Emotion;
  visual?: SceneVisual;
}

const ACCENTS = ["#f2dca8", "#6fa8c9", "#a58fd6", "#6fb98c", "#e2564a", "#f2dca8"];

function Formula({ tex, accent }: { tex: string; accent: string }) {
  const html = useMemo(() => {
    try {
      // KaTeX renders with trust disabled by default; sanitize the output too
      // to match the app's markdown pipeline and satisfy CSP hygiene.
      return DOMPurify.sanitize(
        katex.renderToString(tex, { displayMode: true, throwOnError: false })
      );
    } catch {
      return "";
    }
  }, [tex]);
  if (!html) return null;
  return (
    <div
      className="mt-5"
      style={{ fontSize: 30, color: accent }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function LessonPlayer({
  video,
  language,
  onExit,
}: {
  video: LessonVideo;
  language: NarrationLang;
  onExit?: () => void;
}) {
  const steps = useMemo<Step[]>(() => {
    const arr: Step[] = [];
    arr.push({
      kind: "hook",
      label: "Hook",
      caption: video.title,
      narration: video.hook,
      emotion: "excited",
      accent: "#f2dca8",
    });
    video.scenes.forEach((s, idx) =>
      arr.push({
        kind: "scene",
        label: `Scene ${idx + 1} / ${video.scenes.length}`,
        caption: s.caption,
        narration: s.narration,
        formula: s.formula,
        emotion: s.emotion,
        visual: s.visual,
        accent: ACCENTS[idx % ACCENTS.length],
      })
    );
    if (video.recap.length) {
      arr.push({
        kind: "recap",
        label: "Recap",
        caption: "Quick recap",
        narration: "Quick recap. " + video.recap.join(". "),
        recap: video.recap,
        emotion: "proud",
        accent: "#7fc79a",
      });
    }
    return arr;
  }, [video]);

  const cast = useMemo(() => characterById(video.castId), [video.castId]);

  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const iRef = useRef(i);
  iRef.current = i;

  useEffect(() => {
    primeVoices();
    return () => stopSpeech();
  }, []);

  // The narration + auto-advance engine. Re-runs whenever the step, play state,
  // mute, or language changes; cleans up the current line on the way out.
  useEffect(() => {
    if (!started || !playing) return;
    const step = steps[i];
    if (!step) return;

    const advance = () => {
      if (iRef.current >= steps.length - 1) {
        setPlaying(false);
      } else {
        setI(iRef.current + 1);
      }
    };

    if (muted || !speechAvailable()) {
      const t = window.setTimeout(advance, estimateSeconds(step.narration) * 1000);
      return () => window.clearTimeout(t);
    }
    const handle = speak(step.narration, { lang: language, onEnd: advance });
    return () => handle.cancel();
  }, [i, playing, muted, language, started, steps]);

  function begin() {
    setStarted(true);
    setI(0);
    setPlaying(true);
  }
  function togglePlay() {
    if (!started) return begin();
    setPlaying((p) => !p);
  }
  function go(delta: number) {
    stopSpeech();
    setI((prev) => Math.min(steps.length - 1, Math.max(0, prev + delta)));
  }
  function replay() {
    stopSpeech();
    setStarted(true);
    setI(0);
    setPlaying(true);
  }

  const step = steps[i];
  const atEnd = i === steps.length - 1;
  const progress = ((i + (playing ? 0.5 : atEnd ? 1 : 0)) / steps.length) * 100;

  return (
    <div className="space-y-3">
      {/* Stage */}
      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden border border-line select-none"
        style={{ background: "#07080b" }}
      >
        {/* animated accent wash */}
        <AnimatePresence>
          <motion.div
            key={`bg-${i}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              background: `radial-gradient(120% 90% at 50% 0%, ${step.accent}22, transparent 60%), radial-gradient(90% 80% at 80% 100%, ${step.accent}14, transparent 55%)`,
            }}
          />
        </AnimatePresence>
        <div className="pnz-grid absolute inset-0 opacity-40" aria-hidden />

        {/* top bar */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 py-3 z-20">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted truncate max-w-[60%]">
            {video.title}
          </div>
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: step.accent }}
            >
              {step.label}
            </span>
            <button
              onClick={() => setMuted((m) => !m)}
              className="text-muted hover:text-cream transition"
              aria-label={muted ? "Unmute narration" : "Mute narration"}
              title={muted ? "Narration off" : "Narration on"}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            {onExit && (
              <button
                onClick={() => {
                  stopSpeech();
                  onExit();
                }}
                className="text-muted hover:text-cream transition"
                aria-label="Close player"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* The character. Standing on the stage the whole time, not a portrait
            in a corner: they arrive at the start, react to what they are
            saying, and mouth the words while the voice speaks. */}
        <div className="pnz-toon-stage z-10">
          <Toon
            character={cast}
            emotion={step.emotion ?? (step.kind === "recap" ? "proud" : "explain")}
            talking={started && playing && !muted}
            entering={i === 0}
            size={190}
          />
          <div className="pnz-toon-name" style={{ color: step.accent }}>
            {cast.name}
          </div>
        </div>

        {/* scene body */}
        <div className="pnz-scene-body z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`scene-${i}`}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
              className="max-w-2xl w-full text-center"
            >
              {step.kind !== "scene" && (
                <div
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] mb-3"
                  style={{ color: step.accent }}
                >
                  <Sparkles size={13} /> {step.kind === "hook" ? "Pinnacle lesson" : "You've got this"}
                </div>
              )}
              <h3
                className="font-display font-bold text-cream leading-[1.05]"
                style={{ fontSize: step.kind === "hook" ? 40 : step.visual ? 24 : 34, textWrap: "balance" }}
              >
                {step.caption}
              </h3>
              {step.visual && <SceneVisualView visual={step.visual} />}
              {step.formula && <Formula tex={step.formula} accent={step.accent} />}
              {step.recap && (
                <ol className="mt-5 space-y-2 text-left inline-block">
                  {step.recap.map((q, qi) => (
                    <motion.li
                      key={qi}
                      className="flex items-start gap-3 text-cream/90"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + qi * 0.25 }}
                    >
                      <span
                        className="font-mono text-sm mt-0.5"
                        style={{ color: step.accent }}
                      >
                        {qi + 1}.
                      </span>
                      <span className="text-[15px]">{q}</span>
                    </motion.li>
                  ))}
                </ol>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* subtitle (the spoken line) */}
        <div className="absolute bottom-0 inset-x-0 px-6 pb-5 pt-16 z-10 bg-gradient-to-t from-black/70 to-transparent">
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center text-sm sm:text-base text-cream/85 max-w-2xl mx-auto"
            >
              {step.narration}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* progress bar */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-20">
          <motion.div
            className="h-full"
            style={{ background: step.accent }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* poster / start overlay */}
        <AnimatePresence>
          {!started && (
            <motion.button
              onClick={begin}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 cursor-pointer"
              style={{ background: "rgba(6,7,11,0.72)", backdropFilter: "blur(3px)" }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              aria-label="Play the lesson"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                A Pinnacle lesson
              </div>
              <div className="font-display text-3xl sm:text-4xl font-bold text-cream max-w-2xl text-center px-8">
                {video.title}
              </div>
              <div className="h-16 w-16 rounded-full grid place-items-center bg-gold text-ink pnz-glow">
                <Play size={26} fill="currentColor" />
              </div>
              <div className="text-xs text-muted">
                {speechAvailable()
                  ? "Narrated aloud · plays in your browser"
                  : "Plays in your browser (no narration voice found)"}
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* transport controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          className="btn-dark !px-3"
          onClick={() => go(-1)}
          disabled={i === 0}
          aria-label="Previous scene"
        >
          <SkipBack size={16} />
        </button>
        <button className="btn-gold !px-5" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
          {playing ? "Pause" : started ? (atEnd ? "Replay" : "Play") : "Play lesson"}
        </button>
        <button
          className="btn-dark !px-3"
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label="Next scene"
        >
          <SkipForward size={16} />
        </button>
        <button className="btn-ghost !px-3" onClick={replay} aria-label="Restart from the top">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
