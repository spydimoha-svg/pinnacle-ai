import { useState } from "react";
import { ExternalLink, Radar, RefreshCw } from "lucide-react";
import type { CbseUpdate } from "../../lib/types";
import { CBSE_UPDATES } from "../../data";
import { SectionHead, Empty } from "../../components/ui";

const TAG_CHIP: Record<CbseUpdate["tag"], string> = {
  syllabus: "chip-sky",
  datesheet: "chip-coral",
  "sample-paper": "chip-gold",
  circular: "chip-mint",
  result: "chip",
};

const TAG_LABEL: Record<CbseUpdate["tag"], string> = {
  syllabus: "Syllabus",
  datesheet: "Datesheet",
  "sample-paper": "Sample paper",
  circular: "Circular",
  result: "Result",
};

const SOURCES = [
  {
    name: "cbse.gov.in",
    url: "https://www.cbse.gov.in",
    what: "Circulars, datesheets, results",
  },
  {
    name: "cbseacademic.nic.in",
    url: "https://cbseacademic.nic.in",
    what: "Curriculum, sample papers, marking schemes",
  },
  {
    name: "ncert.nic.in",
    url: "https://ncert.nic.in",
    what: "Textbooks and exemplar problems",
  },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Updates() {
  const [checkNote, setCheckNote] = useState(false);
  const updates = [...CBSE_UPDATES].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="eyebrow mb-1">Summit view · CBSE Watch</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          CBSE Watch
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          What the board changed, and when. Everything landing here flows into
          the tutor's context and the question bank — students never study a
          stale blueprint.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 items-start">
        {/* Feed */}
        <div className="lg:col-span-2">
          <SectionHead
            eyebrow={`Section A · ${updates.length} tracked`}
            title="The feed"
          />
          {updates.length === 0 ? (
            <Empty
              title="Nothing tracked yet"
              body="The watcher hasn't logged any CBSE changes. The feed fills as circulars, datesheets and sample papers land."
            />
          ) : (
            <div className="card">
              <ol className="relative border-l border-line ml-1.5 space-y-7">
                {updates.map((u) => (
                  <li key={u.id} className="pl-5 relative">
                    <span
                      className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold border-2 border-surface"
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs text-dim">
                        {formatDate(u.date)}
                      </span>
                      <span className={TAG_CHIP[u.tag]}>{TAG_LABEL[u.tag]}</span>
                    </div>
                    <div className="font-display font-semibold text-cream text-sm">
                      {u.title}
                    </div>
                    <p className="text-xs text-muted mt-1 max-w-prose">
                      {u.summary}
                    </p>
                    {u.url && (
                      <a
                        href={u.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-sky hover:text-cream mt-1.5"
                      >
                        Source <ExternalLink size={12} strokeWidth={1.8} />
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Automation + sources */}
        <div className="space-y-3 lg:sticky lg:top-6">
          <div className="card">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-2 font-display font-semibold text-cream text-sm">
                <Radar size={18} strokeWidth={1.8} className="text-gold" />
                Automation
              </div>
              <span className="chip-gold">Preview — feed is curated</span>
            </div>
            <p className="text-xs text-muted">
              Every day the watcher checks cbse.gov.in and cbseacademic.nic.in
              for new circulars, datesheets, sample papers and syllabus
              changes. Anything new is summarised, tagged, and rolled into the
              tutor's context and the question bank overnight.
            </p>
            <div className="ridge-rule my-4" />
            <button
              className="btn-dark w-full opacity-60"
              onClick={() => setCheckNote(true)}
            >
              <RefreshCw size={16} strokeWidth={1.8} /> Run check now
            </button>
            {checkNote && (
              <p className="font-mono text-xs text-gold mt-3">
                Watcher runs nightly at 02:00 IST — next run scheduled.
              </p>
            )}
          </div>

          <div className="card">
            <div className="eyebrow-dim mb-3">Official sources</div>
            <ul className="space-y-3">
              {SOURCES.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-sm text-sky hover:text-cream"
                  >
                    {s.name} <ExternalLink size={13} strokeWidth={1.8} />
                  </a>
                  <div className="text-xs text-dim">{s.what}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
