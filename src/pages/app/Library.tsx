import { useState } from "react";
import {
  BookMarked,
  BookOpen,
  ExternalLink,
  FileClock,
  FileText,
  ListChecks,
  Lock,
  NotebookPen,
  School,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useStore } from "../../lib/store";
import { getSubject, resourcesForClass, subjectsForClass } from "../../data";
import { Empty, SectionHead } from "../../components/ui";
import type { ClassLevel, Resource, ResourceKind } from "../../lib/types";

/** Kind sections in the order they appear on the shelf. */
const KIND_SECTIONS: { kind: ResourceKind; title: string; icon: LucideIcon }[] =
  [
    { kind: "ncert", title: "NCERT textbooks", icon: BookOpen },
    { kind: "exemplar", title: "Exemplar", icon: BookMarked },
    {
      kind: "sample-paper",
      title: "Sample papers & marking schemes",
      icon: FileText,
    },
    { kind: "pyq", title: "Previous year papers", icon: FileClock },
    { kind: "syllabus", title: "Syllabus", icon: ListChecks },
    { kind: "notes", title: "Notes", icon: NotebookPen },
  ];

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

function ResourceCard({
  resource,
  icon: Icon,
  meta,
}: {
  resource: Resource;
  icon: LucideIcon;
  meta?: string;
}) {
  const subject = resource.subjectId
    ? getSubject(resource.subjectId)
    : undefined;
  return (
    <div className="card flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-3">
        <Icon size={18} strokeWidth={1.8} className="text-gold" />
        <span className="font-mono text-xs text-dim text-right">
          {subject ? subject.name : "All subjects"}
        </span>
      </div>
      <div className="font-display font-semibold text-cream mb-1">
        {resource.title}
      </div>
      <p className="text-xs text-muted flex-1">{resource.description}</p>
      {meta && <div className="font-mono text-[11px] text-dim mt-2">{meta}</div>}
      {resource.url ? (
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost mt-4 self-start"
        >
          <ExternalLink size={16} strokeWidth={1.8} /> Open
        </a>
      ) : (
        <div className="font-mono text-[11px] text-dim mt-4">
          On the shelf — link coming soon
        </div>
      )}
    </div>
  );
}

export default function Library() {
  const currentUser = useStore((s) => s.currentUser);
  const memory = useStore((s) =>
    s.currentUser ? s.memories[s.currentUser.id] : null
  );
  const school = useStore((s) =>
    s.schools.find((x) => x.id === s.currentUser?.schoolId)
  );
  const schoolResources = useStore((s) => s.schoolResources);

  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);

  const classLevel = (memory?.classLevel ??
    currentUser?.classLevel ??
    10) as ClassLevel;
  const subjects = subjectsForClass(classLevel);
  const library = resourcesForClass(classLevel);

  const matches = (r: Resource) =>
    !subjectFilter || !r.subjectId || r.subjectId === subjectFilter;

  const mySchoolResources = schoolResources.filter(
    (r) =>
      r.schoolId &&
      r.schoolId === currentUser?.schoolId &&
      r.classLevel === classLevel
  );

  const sections = KIND_SECTIONS.map((sec) => ({
    ...sec,
    items: library.filter((r) => r.kind === sec.kind && matches(r)),
  })).filter((sec) => sec.items.length > 0);

  const letterStart = school ? 1 : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="eyebrow mb-1">Library · Class {classLevel}</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          Everything official, one shelf
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          NCERT books, sample papers, syllabus and your school's own material —
          the exact sources CBSE sets papers from, nothing extra.
        </p>
      </div>

      {/* School materials — multi-tenant, scoped to this school */}
      {school && (
        <div>
          <SectionHead
            eyebrow={`Section A · ${school.name}`}
            title="From your school"
          />
          {mySchoolResources.length === 0 ? (
            <Empty
              title={`Nothing from ${school.name} yet`}
              body="Your school hasn't added anything yet. Notes, worksheets and datesheets your teachers upload will appear here first."
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {mySchoolResources.map((r) => (
                <ResourceCard
                  key={r.id}
                  resource={r}
                  icon={School}
                  meta={[
                    r.addedBy ? `Added by ${r.addedBy}` : null,
                    r.addedOn
                      ? new Date(r.addedOn).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Subject filter */}
      <div>
        <div className="eyebrow-dim mb-3">Filter · Subject</div>
        <div className="flex flex-wrap gap-2">
          <button
            className={
              subjectFilter === null
                ? "chip-gold cursor-pointer"
                : "chip cursor-pointer hover:text-cream"
            }
            onClick={() => setSubjectFilter(null)}
          >
            All subjects
          </button>
          {subjects.map((s) => (
            <button
              key={s.id}
              className={
                subjectFilter === s.id
                  ? "chip-gold cursor-pointer"
                  : "chip cursor-pointer hover:text-cream"
              }
              onClick={() =>
                setSubjectFilter(subjectFilter === s.id ? null : s.id)
              }
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Pinnacle library, section by section */}
      {sections.length === 0 ? (
        <Empty
          title="Nothing on this shelf yet"
          body={
            subjectFilter
              ? "No resources for this subject filter yet — switch back to all subjects to see the full library."
              : "The Pinnacle library for your class is being stocked. Check back soon."
          }
          action={
            subjectFilter ? (
              <button
                className="btn-ghost"
                onClick={() => setSubjectFilter(null)}
              >
                Show all subjects
              </button>
            ) : undefined
          }
        />
      ) : (
        sections.map((sec, i) => (
          <div key={sec.kind}>
            <SectionHead
              eyebrow={`Section ${LETTERS[letterStart + i]} · Pinnacle library`}
              title={sec.title}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sec.items.map((r) => (
                <ResourceCard key={r.id} resource={r} icon={sec.icon} />
              ))}
            </div>
          </div>
        ))
      )}

      <div className="ridge-rule" />

      {/* Locked teaser — cross-school add-on */}
      <div className="card !bg-pit/70 !p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="rounded-xl bg-raise border border-line p-3 self-start">
            <Lock size={18} strokeWidth={1.8} className="text-gold" />
          </div>
          <div className="flex-1">
            <div className="eyebrow-dim mb-1">Locked · Premium add-on</div>
            <div className="font-display font-semibold text-cream">
              Other schools' libraries
            </div>
            <p className="text-sm text-muted mt-1 max-w-xl">
              Partner schools across India share their best notes, question
              banks and pre-board papers on Pinnacle. Schools on the Premium
              plan can unlock cross-school sharing — every partner library on
              this shelf, for every student. Ask your school to talk to
              Pinnacle.
            </p>
          </div>
          <span className="chip-gold self-start whitespace-nowrap">
            Premium schools only
          </span>
        </div>
      </div>
    </div>
  );
}
