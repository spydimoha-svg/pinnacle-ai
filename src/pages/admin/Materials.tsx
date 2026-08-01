import { useState } from "react";
import type { FormEvent } from "react";
import { ExternalLink, FilePlus2, Lock, Trash2 } from "lucide-react";
import { useStore } from "../../lib/store";
import { Empty, SectionHead } from "../../components/ui";
import type { ClassLevel, Resource, ResourceKind } from "../../lib/types";

const KIND_OPTIONS: { value: ResourceKind; label: string }[] = [
  { value: "school", label: "School material" },
  { value: "notes", label: "Notes" },
  { value: "sample-paper", label: "Sample paper" },
  { value: "pyq", label: "Previous-year questions" },
  { value: "syllabus", label: "Syllabus" },
];

const KIND_LABEL: Record<ResourceKind, string> = {
  ncert: "NCERT",
  exemplar: "Exemplar",
  "sample-paper": "Sample paper",
  pyq: "PYQ",
  syllabus: "Syllabus",
  notes: "Notes",
  school: "School material",
};

const KIND_CHIP: Record<ResourceKind, string> = {
  ncert: "chip",
  exemplar: "chip",
  "sample-paper": "chip-sky",
  pyq: "chip-sky",
  syllabus: "chip",
  notes: "chip-mint",
  school: "chip-gold",
};

const CLASS_LEVELS: ClassLevel[] = [9, 10, 11, 12];

export default function Materials() {
  const currentUser = useStore((s) => s.currentUser);
  const school = useStore((s) =>
    s.schools.find((x) => x.id === s.currentUser?.schoolId)
  );
  const schoolResources = useStore((s) => s.schoolResources);
  const addSchoolResource = useStore((s) => s.addSchoolResource);
  const removeSchoolResource = useStore((s) => s.removeSchoolResource);

  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<ResourceKind>("school");
  const [classLevel, setClassLevel] = useState<ClassLevel>(10);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [savedTitle, setSavedTitle] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (!school || !currentUser) {
    return (
      <Empty
        title="No school linked"
        body="Your admin account isn't attached to a school yet. Ask Pinnacle Master to link your school, then sign in again."
      />
    );
  }

  const schoolId = school.id;
  const adminName = currentUser.name;
  const materials = schoolResources.filter((r) => r.schoolId === schoolId);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const resource: Resource = {
      id: `r-sch-${Date.now()}`,
      title: title.trim(),
      kind,
      classLevel,
      url: url.trim() || undefined,
      description: description.trim(),
      schoolId,
      addedBy: adminName,
      addedOn: new Date().toLocaleDateString("en-CA"),
    };
    addSchoolResource(resource);
    setSavedTitle(resource.title);
    setTitle("");
    setUrl("");
    setDescription("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="eyebrow mb-1">School console · {school.name}</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          Materials
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          Add your school's notes, sample papers and circulars. Students see
          them beside the preset CBSE library, the moment you save.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Add material form */}
        <div className="space-y-3">
          <form onSubmit={submit} className="card space-y-4">
            <SectionHead eyebrow="Section A · Upload" title="Add material" />
            <div>
              <label className="label" htmlFor="mat-title">
                Title
              </label>
              <input
                id="mat-title"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Half-yearly sample paper — Science"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor="mat-kind">
                  Kind
                </label>
                <select
                  id="mat-kind"
                  className="input"
                  value={kind}
                  onChange={(e) => setKind(e.target.value as ResourceKind)}
                >
                  {KIND_OPTIONS.map((k) => (
                    <option key={k.value} value={k.value}>
                      {k.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="mat-class">
                  Class
                </label>
                <select
                  id="mat-class"
                  className="input"
                  value={classLevel}
                  onChange={(e) =>
                    setClassLevel(Number(e.target.value) as ClassLevel)
                  }
                >
                  {CLASS_LEVELS.map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="label" htmlFor="mat-url">
                Link (optional)
              </label>
              <input
                id="mat-url"
                className="input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://drive.google.com/…"
              />
            </div>
            <div>
              <label className="label" htmlFor="mat-desc">
                Description
              </label>
              <textarea
                id="mat-desc"
                className="input min-h-20 resize-y"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What it covers and who should use it"
              />
            </div>
            <button type="submit" className="btn-gold w-full">
              <FilePlus2 size={16} /> Add material
            </button>
            {savedTitle && (
              <p className="text-xs text-mint">
                "{savedTitle}" is live for your students.
              </p>
            )}
          </form>

          {/* Privacy note */}
          <div className="card-inset flex items-start gap-3">
            <Lock size={16} className="text-gold mt-0.5 shrink-0" />
            <p className="text-xs text-muted">
              Only {school.name} students see these. Other schools on Pinnacle
              never see your uploads — every school's library is its own.
            </p>
          </div>
        </div>

        {/* Materials list */}
        <div className="lg:col-span-2">
          <SectionHead
            eyebrow="Section B · Library"
            title={`Your materials (${materials.length})`}
          />
          {materials.length === 0 ? (
            <Empty
              title="Nothing uploaded yet"
              body="Add your first material with the form — a sample paper, class notes, or the school syllabus. It appears here and on every student's resources page."
            />
          ) : (
            <div className="space-y-3">
              {materials.map((r) => (
                <div key={r.id} className="card">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={KIND_CHIP[r.kind]}>
                      {KIND_LABEL[r.kind]}
                    </span>
                    <span className="chip">
                      <span className="font-mono">Class {r.classLevel}</span>
                    </span>
                  </div>
                  <div className="font-display font-semibold text-cream">
                    {r.title}
                  </div>
                  {r.description && (
                    <p className="text-sm text-muted mt-1">{r.description}</p>
                  )}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-line/60">
                    <span className="font-mono text-xs text-dim">
                      Added by {r.addedBy} · {r.addedOn}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {r.url && (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-ghost !px-3 !py-1.5 !text-xs"
                        >
                          <ExternalLink size={14} /> Open
                        </a>
                      )}
                      {confirmId === r.id ? (
                        <>
                          <span className="text-xs text-coral">
                            Remove this material?
                          </span>
                          <button
                            className="btn-danger !px-3 !py-1.5 !text-xs"
                            onClick={() => {
                              removeSchoolResource(r.id);
                              setConfirmId(null);
                            }}
                          >
                            Remove
                          </button>
                          <button
                            className="btn-ghost !px-3 !py-1.5 !text-xs"
                            onClick={() => setConfirmId(null)}
                          >
                            Keep
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn-danger !px-3 !py-1.5 !text-xs"
                          onClick={() => setConfirmId(r.id)}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
