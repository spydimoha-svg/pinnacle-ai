import { useEffect, useState } from "react";
import {
  Award,
  MessageCircle,
  Mountain,
  Plus,
  Target,
  Trash2,
  X,
} from "lucide-react";
import { useStore } from "../../lib/store";
import { subjectsForClass } from "../../data";
import { Modal, ProgressBar, SectionHead } from "../../components/ui";
import { Ridgeline } from "../../components/Logo";

const EXAM_OPTIONS: { id: string; label: string; hint: string }[] = [
  { id: "jee", label: "JEE", hint: "Engineering" },
  { id: "neet", label: "NEET", hint: "Medical" },
  { id: "cuet", label: "CUET", hint: "Central universities" },
  { id: "sat", label: "SAT", hint: "Study abroad" },
];

/** Add/remove chip editor for strengths and focus areas. */
function ChipEditor({
  items,
  chipClass,
  placeholder,
  onChange,
}: {
  items: string[];
  chipClass: string;
  placeholder: string;
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    if (!items.some((i) => i.toLowerCase() === v.toLowerCase())) {
      onChange([...items, v]);
    }
    setDraft("");
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {items.length === 0 && (
          <span className="text-xs text-dim">Nothing recorded yet.</span>
        )}
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className={chipClass}>
            {item}
            <button
              className="text-current/70 hover:text-current cursor-pointer"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              aria-label={`Remove ${item}`}
            >
              <X size={12} strokeWidth={1.8} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
          placeholder={placeholder}
        />
        <button className="btn-ghost shrink-0 !px-3" onClick={add} aria-label="Add">
          <Plus size={16} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

export default function Profile() {
  const user = useStore((s) => s.currentUser);
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const school = useStore((s) =>
    s.schools.find((x) => x.id === s.currentUser?.schoolId)
  );
  const updateMemory = useStore((s) => s.updateMemory);
  const clearChat = useStore((s) => s.clearChat);

  const [target, setTarget] = useState(memory?.targetScore ?? "");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setTarget(memory?.targetScore ?? "");
  }, [memory?.targetScore]);

  if (!user || !memory) return null;

  const subjects = subjectsForClass(memory.classLevel);
  const achievements = [...memory.achievements].reverse();
  const recentTopics = [...memory.lastTopics].reverse();

  const toggleExam = (id: string) => {
    const next = memory.examTargets.includes(id)
      ? memory.examTargets.filter((e) => e !== id)
      : [...memory.examTargets, id];
    updateMemory({ examTargets: next });
  };

  const saveTarget = () => {
    const v = target.trim();
    updateMemory({ targetScore: v || undefined });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="eyebrow mb-1">Memory file · Class {memory.classLevel}</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          What Pinnacle knows about you
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          The tutor reads this before every lesson. Keep it honest — the better
          the memory, the sharper the teaching.
        </p>
      </div>

      {/* Identity + altitude */}
      <div className="grid lg:grid-cols-3 gap-3">
        <div className="card lg:col-span-2">
          <div className="eyebrow-dim mb-4">Identity</div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <div className="label !mb-0.5">Name</div>
              <div className="text-cream font-semibold">{user.name}</div>
            </div>
            <div>
              <div className="label !mb-0.5">Class</div>
              <div className="text-cream font-semibold font-mono">
                {memory.classLevel} · CBSE
              </div>
            </div>
            <div>
              <div className="label !mb-0.5">School</div>
              <div className="text-cream font-semibold">
                {school ? `${school.name}, ${school.city}` : "Independent"}
              </div>
            </div>
            <div>
              <div className="label !mb-0.5">Mode</div>
              <div className="text-cream font-semibold">
                {memory.mode === "board"
                  ? "Board prep"
                  : `${memory.mode.toUpperCase()} · Learn Better`}
              </div>
            </div>
          </div>
        </div>

        <div className="relative card !bg-pit/70 overflow-hidden">
          <div className="eyebrow-dim mb-3">Altitude</div>
          <div className="font-display text-5xl font-bold text-gold inline-flex items-baseline gap-2">
            <Mountain size={26} strokeWidth={1.8} className="self-center" />
            {memory.altitude}
            <span className="text-lg text-gold-dim font-mono">m</span>
          </div>
          <div className="text-xs text-dim mt-2">
            Every chapter, worksheet and blob climbs you higher.
          </div>
          <Ridgeline className="absolute bottom-0 left-0 w-full h-14 opacity-70 pointer-events-none" />
        </div>
      </div>

      {/* Targets */}
      <div>
        <SectionHead eyebrow="Section A · Targets" title="Where you're aiming" />
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} strokeWidth={1.8} className="text-gold" />
              <span className="font-semibold text-cream text-sm">
                Target score
              </span>
            </div>
            <div className="flex gap-2">
              <input
                className="input"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveTarget();
                }}
                placeholder="e.g. 95% aggregate, or 90+ in Science"
              />
              <button
                className="btn-gold shrink-0"
                onClick={saveTarget}
                disabled={target.trim() === (memory.targetScore ?? "")}
              >
                Save
              </button>
            </div>
            <p className="text-xs text-dim mt-2">
              The tutor calibrates its expectations to this number.
            </p>
          </div>

          <div className="card">
            <div className="font-semibold text-cream text-sm mb-3">
              Entrance exam targets
            </div>
            <div className="flex flex-wrap gap-2">
              {EXAM_OPTIONS.map((exam) => {
                const on = memory.examTargets.includes(exam.id);
                return (
                  <button
                    key={exam.id}
                    className={`${on ? "chip-gold" : "chip"} cursor-pointer hover:border-gold-dim transition-colors`}
                    onClick={() => toggleExam(exam.id)}
                    aria-pressed={on}
                  >
                    {exam.label}
                    <span className="text-[10px] opacity-70">{exam.hint}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-dim mt-3">
              Picking a target unlocks its Learn Better track in the Entrance
              section — prep that goes a level beyond boards.
            </p>
          </div>
        </div>
      </div>

      {/* Strengths + focus areas */}
      <div>
        <SectionHead
          eyebrow="Section B · The map"
          title="Strengths and focus areas"
        />
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="card">
            <div className="font-semibold text-cream text-sm mb-3">
              Strengths
            </div>
            <ChipEditor
              items={memory.strengths}
              chipClass="chip-mint"
              placeholder="Add a strength — e.g. Trigonometry"
              onChange={(next) => updateMemory({ strengths: next })}
            />
          </div>
          <div className="card">
            <div className="font-semibold text-cream text-sm mb-3">
              Focus areas
            </div>
            <ChipEditor
              items={memory.focusAreas}
              chipClass="chip-coral"
              placeholder="Add a focus area — e.g. Organic chemistry"
              onChange={(next) => updateMemory({ focusAreas: next })}
            />
            <p className="text-xs text-dim mt-3">
              The Blob and the tutor add to this list on their own too.
            </p>
          </div>
        </div>
      </div>

      {/* Progress + achievements + topics */}
      <div>
        <SectionHead eyebrow="Section C · The climb" title="Progress so far" />
        <div className="grid lg:grid-cols-3 gap-3">
          <div className="card lg:col-span-1">
            <div className="eyebrow-dim mb-4">By subject</div>
            {subjects.length === 0 ? (
              <p className="text-xs text-dim">
                No subjects mapped for your class yet.
              </p>
            ) : (
              <div className="space-y-4">
                {subjects.map((subj) => {
                  const done = subj.chapters.filter(
                    (c) => memory.progress[c.id]?.status === "mastered"
                  ).length;
                  const pct = subj.chapters.length
                    ? Math.round((done / subj.chapters.length) * 100)
                    : 0;
                  return (
                    <div key={subj.id}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm text-cream">{subj.name}</span>
                        <span className="font-mono text-xs text-dim">
                          {done} / {subj.chapters.length}
                        </span>
                      </div>
                      <ProgressBar value={pct} className="mt-1.5" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Award size={16} strokeWidth={1.8} className="text-gold" />
              <span className="eyebrow-dim">Achievements</span>
            </div>
            <ol className="space-y-3 border-l border-line pl-4">
              {achievements.map((a, i) => (
                <li key={`${a}-${i}`} className="relative">
                  <span
                    className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full ${
                      i === 0 ? "bg-gold" : "bg-line"
                    }`}
                  />
                  <span
                    className={`text-sm ${i === 0 ? "text-cream" : "text-muted"}`}
                  >
                    {a}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle
                size={16}
                strokeWidth={1.8}
                className="text-sky"
              />
              <span className="eyebrow-dim">Recent topics with the tutor</span>
            </div>
            {recentTopics.length === 0 ? (
              <p className="text-xs text-dim">
                Nothing yet — ask the tutor something and it starts remembering.
              </p>
            ) : (
              <ul className="space-y-2">
                {recentTopics.map((t, i) => (
                  <li key={`${t}-${i}`} className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-cream/90">{t}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div>
        <div className="ridge-rule mb-6" />
        <div className="card border-coral/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-cream text-sm mb-1">
                Reset tutor chat
              </div>
              <p className="text-xs text-muted max-w-md">
                Wipes your conversation history with the tutor. Your memory
                file — progress, strengths, altitude — stays untouched.
              </p>
            </div>
            <button className="btn-danger" onClick={() => setConfirmOpen(true)}>
              <Trash2 size={16} strokeWidth={1.8} /> Reset chat
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Reset tutor chat?"
      >
        <p className="text-sm text-muted mb-5">
          This deletes every message between you and the tutor, permanently.
          The tutor will still remember you — this only clears the
          conversation itself.
        </p>
        <div className="flex justify-end gap-2">
          <button className="btn-ghost" onClick={() => setConfirmOpen(false)}>
            Keep it
          </button>
          <button
            className="btn-danger"
            onClick={() => {
              clearChat();
              setConfirmOpen(false);
            }}
          >
            Yes, reset it
          </button>
        </div>
      </Modal>
    </div>
  );
}
