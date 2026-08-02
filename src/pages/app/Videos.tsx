import { useEffect, useState } from "react";
import { Clapperboard, MonitorPlay, Play, ScrollText } from "lucide-react";
import { useStore } from "../../lib/store";
import { getSubject, videosForClass } from "../../data";
import { Empty, SectionHead, Spinner } from "../../components/ui";
import { LessonPlayer } from "../../components/LessonPlayer";
import { generateOnce } from "../../lib/ai";
import {
  buildVideoJsonPrompt,
  parseLessonVideo,
  VIDEO_SYSTEM,
  type LessonVideo,
} from "../../lib/videoScript";
import type { ClassLevel, VideoRec } from "../../lib/types";
import { CAST, characterById } from "../../data/cast";
import { Toon } from "../../components/cast/Toon";

type Lang = VideoRec["language"];
type Depth = "board" | "deeper";

// Style is now a note on top of a real character, not a substitute for one.
const STYLE_CHIPS = [
  "Make it funny",
  "Use lots of examples",
  "Keep it exam-focused",
  "Go slow, I'm new to this",
];

const STATUS_LINES = [
  "Sketching scene one on the storyboard...",
  "Auditioning your narrator...",
  "Writing a hook you can't skip...",
  "Cutting the boring bits...",
  "Colour-grading the summit shot...",
  "Adding the recap questions...",
];

const LANGS: Lang[] = ["English", "Hindi", "Hinglish"];

export default function Videos() {
  const currentUser = useStore((s) => s.currentUser);
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const classLevel = (memory?.classLevel ??
    currentUser?.classLevel ??
    10) as ClassLevel;

  // — Studio state (nothing here is persisted, by design) —
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("");
  const [castId, setCastId] = useState(CAST[0].id);
  const [language, setLanguage] = useState<Lang>("English");
  const [depth, setDepth] = useState<Depth>("board");
  const [busy, setBusy] = useState(false);
  const [lesson, setLesson] = useState<LessonVideo | null>(null);
  const [createdLang, setCreatedLang] = useState<Lang>("English");
  const [showScript, setShowScript] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    if (!busy) return;
    const t = window.setInterval(
      () => setStatusIdx((i) => (i + 1) % STATUS_LINES.length),
      2200
    );
    return () => window.clearInterval(t);
  }, [busy]);

  async function create() {
    const t = topic.trim();
    if (!t || busy) return;
    setBusy(true);
    setError(null);
    setLesson(null);
    setShowScript(false);
    setStatusIdx(0);
    try {
      const maxTokens =
        1500 +
        (depth === "deeper" ? 400 : 0) +
        (language !== "English" ? 400 : 0);
      const out = await generateOnce(
        buildVideoJsonPrompt({
          topic: t,
          style: style.trim(),
          language,
          depth,
          classLevel,
          character: characterById(castId),
        }),
        // A lean, JSON-only system prompt. The tutor persona used to sit here,
        // and its format contract ("these rules override everything else",
        // wrap all maths in $...$, use fenced plot blocks) fights the one thing
        // this call needs: a bare JSON object.
        VIDEO_SYSTEM,
        undefined,
        undefined,
        maxTokens
      );
      const parsed = parseLessonVideo(out, t, castId);
      setLesson(parsed);
      setCreatedLang(language);
    } catch {
      setError(
        "The video engine couldn't build a clean lesson this time — usually a connection hiccup or a scrambled reply, not you. Your settings are safe; press Create again, or ask the tutor to walk you through the topic meanwhile."
      );
    } finally {
      setBusy(false);
    }
  }

  // — Curated videos —
  const videos = videosForClass(classLevel);
  const subjectIds = Array.from(new Set(videos.map((v) => v.subjectId)));
  const languages = Array.from(new Set(videos.map((v) => v.language)));
  const [vSubject, setVSubject] = useState<string | null>(null);
  const [vLang, setVLang] = useState<Lang | null>(null);
  const shown = videos.filter(
    (v) =>
      (!vSubject || v.subjectId === vSubject) && (!vLang || v.language === vLang)
  );

  const chipCls = (active: boolean) =>
    active ? "chip-gold cursor-pointer" : "chip cursor-pointer hover:text-cream";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="eyebrow mb-1">Videos · Class {classLevel}</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          Watch it click
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          Turn any topic into an animated lesson in your language, or jump
          straight to the best explainers YouTube has for your class.
        </p>
      </div>

      {/* A — Video Studio */}
      <div>
        <SectionHead
          eyebrow="Section A · Prompt to lesson"
          title="Video Studio"
        />
        <div className="card !p-6 space-y-5">
          <div>
            <label className="label" htmlFor="vs-topic">
              Topic
            </label>
            <input
              id="vs-topic"
              className="input"
              placeholder='Try "Refraction through a glass slab" or "Nature of roots of a quadratic"'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") create();
              }}
            />
          </div>

          {/* Who is teaching it. Picking a face before a topic is the point:
              the lesson is written in that character's voice, with their jokes,
              and they are drawn on screen saying it. */}
          <div>
            <label className="label">Who teaches it</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-1">
              {CAST.map((c) => {
                const active = castId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCastId(c.id)}
                    className={`pnz-cast-card ${active ? "is-active" : ""}`}
                    aria-pressed={active}
                    title={c.persona}
                  >
                    <Toon character={c} emotion={active ? "excited" : "explain"} size={74} />
                    <span className="pnz-cast-name">{c.name}</span>
                    <span className="pnz-cast-tag">{c.bestFor}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-dim mt-2">
              {characterById(castId).tagline}
            </p>
          </div>

          <div>
            <label className="label" htmlFor="vs-style">
              Anything else? (optional)
            </label>
            <input
              id="vs-style"
              className="input"
              placeholder="e.g. keep it exam-focused, or go really slow"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 mt-2.5">
              {STYLE_CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={chipCls(style === c)}
                  onClick={() => setStyle(style === c ? "" : c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="vs-lang">
                Language
              </label>
              <select
                id="vs-lang"
                className="input"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Lang)}
              >
                {LANGS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="vs-depth">
                Depth
              </label>
              <select
                id="vs-depth"
                className="input"
                value={depth}
                onChange={(e) => setDepth(e.target.value as Depth)}
              >
                <option value="board">Board basics</option>
                <option value="deeper">Learn Better</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              className="btn-gold"
              onClick={create}
              disabled={busy || !topic.trim()}
            >
              {busy ? (
                <Spinner size={16} />
              ) : (
                <Clapperboard size={16} strokeWidth={1.8} />
              )}
              {busy ? "Creating..." : "Create my lesson"}
            </button>
            {busy && (
              <span className="font-mono text-xs text-muted">
                {STATUS_LINES[statusIdx]}
              </span>
            )}
          </div>

          {error && (
            <div className="card-inset !border-coral/40">
              <div className="text-sm font-semibold text-coral mb-1">
                Offline for a moment
              </div>
              <p className="text-sm text-muted">{error}</p>
            </div>
          )}

          {lesson && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="eyebrow">Your lesson · {createdLang}</div>
                <button
                  type="button"
                  className="chip cursor-pointer hover:text-cream"
                  onClick={() => setShowScript((s) => !s)}
                >
                  <ScrollText size={13} />
                  {showScript ? "Hide script" : "Read the script"}
                </button>
              </div>

              <LessonPlayer
                key={lesson.title + lesson.scenes.length}
                video={lesson}
                language={createdLang}
              />

              {showScript && (
                <div className="card-inset space-y-3">
                  <div>
                    <div className="eyebrow-dim mb-1">Hook</div>
                    <p className="text-sm text-cream">{lesson.hook}</p>
                  </div>
                  {lesson.scenes.map((s, idx) => (
                    <div key={idx} className="border-t border-line/60 pt-3">
                      <div className="font-mono text-xs text-gold mb-1">
                        Scene {idx + 1} · {s.caption}
                      </div>
                      <p className="text-sm text-muted">{s.narration}</p>
                    </div>
                  ))}
                  {lesson.recap.length > 0 && (
                    <div className="border-t border-line/60 pt-3">
                      <div className="eyebrow-dim mb-1">Recap</div>
                      <ol className="list-decimal pl-5 text-sm text-muted space-y-1">
                        {lesson.recap.map((q, qi) => (
                          <li key={qi}>{q}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <p className="text-xs text-dim">
            Built and narrated in your browser — no key, no upload. Uses your
            device's voices for narration; if you hear silence, your browser has
            no voice installed and the lesson still plays with subtitles.
          </p>
        </div>
      </div>

      <div className="ridge-rule" />

      {/* B — Best on YouTube */}
      <div>
        <SectionHead
          eyebrow="Section B · Curated by Pinnacle"
          title="Best on YouTube"
        />
        {videos.length === 0 ? (
          <Empty
            title="No videos curated yet"
            body="We're still watching everything YouTube has for your class so you don't have to. The shortlist lands here soon."
          />
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                className={chipCls(vSubject === null)}
                onClick={() => setVSubject(null)}
              >
                All subjects
              </button>
              {subjectIds.map((id) => (
                <button
                  key={id}
                  className={chipCls(vSubject === id)}
                  onClick={() => setVSubject(vSubject === id ? null : id)}
                >
                  {getSubject(id)?.name ?? id}
                </button>
              ))}
              <span className="w-px self-stretch bg-line mx-1" aria-hidden />
              <button
                className={chipCls(vLang === null)}
                onClick={() => setVLang(null)}
              >
                Any language
              </button>
              {languages.map((l) => (
                <button
                  key={l}
                  className={chipCls(vLang === l)}
                  onClick={() => setVLang(vLang === l ? null : l)}
                >
                  {l}
                </button>
              ))}
            </div>

            {shown.length === 0 ? (
              <Empty
                title="No match for that filter"
                body="Nothing curated for this subject and language combination yet — loosen one of the filters."
              />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {shown.map((v) => (
                  <div key={v.id} className="card flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <MonitorPlay
                        size={18}
                        strokeWidth={1.8}
                        className="text-coral"
                      />
                      <span className="font-mono text-xs text-dim">
                        {v.language}
                      </span>
                    </div>
                    <div className="font-display font-semibold text-cream mb-1">
                      {v.title}
                    </div>
                    <div className="font-mono text-xs text-dim mb-2">
                      {v.channel} · {getSubject(v.subjectId)?.name ?? "General"}{" "}
                      · {v.topic}
                    </div>
                    <p className="text-xs text-muted flex-1">{v.why}</p>
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost mt-4 self-start"
                    >
                      <Play size={16} strokeWidth={1.8} /> Watch
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
