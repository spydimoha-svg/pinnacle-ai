import { useState } from "react";
import { Flame, Mountain, NotebookPen, Send } from "lucide-react";
import { useStore } from "../../lib/store";
import { Empty, SectionHead, Spinner } from "../../components/ui";
import { LogoMark } from "../../components/Logo";
import { generateOnce } from "../../lib/ai";
import { buildSystemPrompt } from "../../lib/persona";
import type { BlobEntry } from "../../lib/types";

const NO_BLOBS: BlobEntry[] = [];

const CANNED_REFLECTION =
  "I couldn't reach my full brain to write you a proper note, but I read every word. Showing up to write this counts — that's the habit that quietly moves marks. Bring whatever fought back today to the tutor tomorrow and we'll take it apart together.";

/**
 * Condense "what's fighting back" into a focus area the tutor and the dashboard
 * can quote back. Cuts on a word boundary — a mid-word slice reads as broken
 * where it's shown ("...and can'").
 */
function shortenFocus(text: string): string {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= 60) return clean;
  const cut = clean.slice(0, 60);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 24 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\-—'"]+$/, "")}…`;
}

/** Local calendar date as YYYY-MM-DD, offset in days. */
function isoDay(offset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export default function Blob() {
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const blobs = useStore((s) =>
    s.currentUser ? (s.blobs[s.currentUser.id] ?? NO_BLOBS) : NO_BLOBS
  );
  const addBlob = useStore((s) => s.addBlob);
  const updateBlob = useStore((s) => s.updateBlob);
  const addAltitude = useStore((s) => s.addAltitude);
  const updateMemory = useStore((s) => s.updateMemory);
  const touchStreak = useStore((s) => s.touchStreak);

  const [completed, setCompleted] = useState("");
  const [fighting, setFighting] = useState("");
  const [freeform, setFreeform] = useState("");
  const [mood, setMood] = useState("");
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  if (!memory) return null;

  const today = isoDay();
  const hasToday = blobs.some((b) => b.date === today);

  const canSubmit =
    completed.trim().length > 0 ||
    fighting.trim().length > 0 ||
    freeform.trim().length > 0;

  const submit = async () => {
    if (!canSubmit) return;

    const entry: BlobEntry = {
      id: `b-${Date.now()}`,
      date: today,
      completedToday: completed.trim(),
      difficulties: fighting.trim(),
      freeform: freeform.trim(),
      moodEmojiFree: mood.trim(),
    };

    addBlob(entry);
    addAltitude(10);
    touchStreak();

    // Feed the tutor's memory: what's fighting back becomes a focus area.
    if (entry.difficulties) {
      const focus = shortenFocus(entry.difficulties);
      const current = useStore.getState().memory()?.focusAreas ?? [];
      const next = [
        ...current.filter((f) => f.toLowerCase() !== focus.toLowerCase()),
        focus,
      ].slice(-5);
      updateMemory({ focusAreas: next });
    }

    setCompleted("");
    setFighting("");
    setFreeform("");
    setMood("");

    // Ask Pinnacle for a reflection, asynchronously.
    setPendingIds((p) => new Set(p).add(entry.id));
    try {
      const mem = useStore.getState().memory();
      const system = buildSystemPrompt(mem);
      const prompt = [
        "This is my blob — my private daily check-in, not a study question.",
        `What I got done today: ${entry.completedToday || "(left blank)"}`,
        `What's fighting back: ${entry.difficulties || "(left blank)"}`,
        `Everything else (school, life, whatever): ${entry.freeform || "(left blank)"}`,
        `My mood in a word: ${entry.moodEmojiFree || "(left blank)"}`,
        "",
        "Reply as my caring teacher in 3-5 sentences, informal tone. Acknowledge the human stuff first, pull out ONE study insight from what I wrote, and end with ONE concrete next step I can actually do. No headings, no bullet lists — just talk to me.",
      ].join("\n");
      const reflection = (await generateOnce(prompt, system)).trim();
      updateBlob(entry.id, { reflection: reflection || CANNED_REFLECTION });
    } catch {
      updateBlob(entry.id, { reflection: CANNED_REFLECTION });
    } finally {
      setPendingIds((p) => {
        const next = new Set(p);
        next.delete(entry.id);
        return next;
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="eyebrow mb-1">Daily check-in · Private</div>
        <h1 className="font-display text-3xl font-bold text-cream">The Blob</h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          Thirty seconds, zero judgment. Only you and Pinnacle read this — and
          it's how the tutor learns what to teach you next.
        </p>
      </div>

      {/* Composer */}
      <div className="card !p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <NotebookPen size={18} strokeWidth={1.8} className="text-mint" />
            <h2 className="font-display text-lg font-semibold text-cream">
              Today's blob
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {memory.streak >= 2 && (
              <span className="chip-coral">
                <Flame size={13} strokeWidth={1.8} /> {memory.streak} days in a
                row
              </span>
            )}
            <span className="chip-gold">
              <Mountain size={13} strokeWidth={1.8} /> +10 m per blob
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="blob-done">
                What did you get done today?
              </label>
              <input
                id="blob-done"
                className="input"
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
                placeholder="Finished electrostatics numericals, revised Ch 2…"
              />
            </div>
            <div>
              <label className="label" htmlFor="blob-fighting">
                What's fighting back?
              </label>
              <input
                id="blob-fighting"
                className="input"
                value={fighting}
                onChange={(e) => setFighting(e.target.value)}
                placeholder="Organic mechanisms just won't stick…"
              />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="blob-freeform">
              Anything else — school, life, whatever
            </label>
            <textarea
              id="blob-freeform"
              className="input resize-y min-h-28"
              rows={4}
              value={freeform}
              onChange={(e) => setFreeform(e.target.value)}
              placeholder="Dump it all here. Nobody grades the Blob."
            />
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="w-36">
              <label className="label" htmlFor="blob-mood">
                Mood, one word
              </label>
              <input
                id="blob-mood"
                className="input"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="fried"
              />
            </div>
            <button className="btn-gold" onClick={submit} disabled={!canSubmit}>
              <Send size={16} strokeWidth={1.8} />
              {hasToday ? "Add another blob" : "Save today's blob"}
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <SectionHead eyebrow="Section B · The record" title="Past blobs" />
        {blobs.length === 0 ? (
          <Empty
            title="Nothing here yet"
            body="Your first blob starts the record. Write one line about today — Pinnacle will write one back."
          />
        ) : (
          <div className="space-y-3">
            {blobs.map((b) => (
              <div key={b.id} className="card space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-dim">{b.date}</span>
                  <div className="flex items-center gap-2">
                    {b.moodEmojiFree && (
                      <span className="chip">mood · {b.moodEmojiFree}</span>
                    )}
                    {b.date === today && (
                      <span className="chip-gold">Today</span>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {b.completedToday && (
                    <div>
                      <div className="eyebrow-dim mb-1">Got done</div>
                      <p className="text-sm text-cream/90">
                        {b.completedToday}
                      </p>
                    </div>
                  )}
                  {b.difficulties && (
                    <div>
                      <div className="eyebrow-dim mb-1">Fighting back</div>
                      <p className="text-sm text-cream/90">{b.difficulties}</p>
                    </div>
                  )}
                  {b.freeform && (
                    <div className="sm:col-span-2">
                      <div className="eyebrow-dim mb-1">Everything else</div>
                      <p className="text-sm text-cream/90 whitespace-pre-wrap">
                        {b.freeform}
                      </p>
                    </div>
                  )}
                </div>

                {b.reflection ? (
                  <div className="card-inset flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      <LogoMark size={24} />
                    </div>
                    <div>
                      <div className="eyebrow-dim mb-1">Pinnacle's note</div>
                      <p className="text-sm text-cream/90 leading-relaxed">
                        {b.reflection}
                      </p>
                    </div>
                  </div>
                ) : pendingIds.has(b.id) ? (
                  <div className="card-inset flex items-center gap-3">
                    <Spinner size={16} />
                    <span className="text-sm text-muted">
                      Pinnacle is reading your blob…
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
