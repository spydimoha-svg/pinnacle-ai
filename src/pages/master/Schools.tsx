import { useState } from "react";
import {
  Building2,
  CalendarDays,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import type { School } from "../../lib/types";
import { useStore } from "../../lib/store";
import { SectionHead, Empty, Modal } from "../../components/ui";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const PLAN_CHIP: Record<School["plan"], string> = {
  free: "chip-mint",
  standard: "chip-sky",
  premium: "chip-gold",
};

const PLAN_LABEL: Record<School["plan"], string> = {
  free: "Free",
  standard: "Standard",
  premium: "Premium",
};

interface FormState {
  name: string;
  city: string;
  plan: School["plan"];
  pricePerStudent: string;
  students: string;
  notes: string;
}

const BLANK: FormState = {
  name: "",
  city: "",
  plan: "standard",
  pricePerStudent: "150",
  students: "0",
  notes: "",
};

function formatJoined(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Schools() {
  const schools = useStore((s) => s.schools);
  const upsertSchool = useStore((s) => s.upsertSchool);
  const removeSchool = useStore((s) => s.removeSchool);

  const [open, setOpen] = useState(false);
  /** null → adding; otherwise the school being edited */
  const [editing, setEditing] = useState<School | null>(null);
  const [form, setForm] = useState<FormState>(BLANK);
  const [removing, setRemoving] = useState<School | null>(null);

  const startAdd = () => {
    setEditing(null);
    setForm(BLANK);
    setOpen(true);
  };

  const startEdit = (s: School) => {
    setEditing(s);
    setForm({
      name: s.name,
      city: s.city,
      plan: s.plan,
      pricePerStudent: String(s.pricePerStudent),
      students: String(s.students),
      notes: s.notes ?? "",
    });
    setOpen(true);
  };

  const setPlan = (plan: School["plan"]) =>
    setForm((f) => ({
      ...f,
      plan,
      pricePerStudent: plan === "free" ? "0" : f.pricePerStudent,
    }));

  const canSave = form.name.trim().length > 0 && form.city.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    const price =
      form.plan === "free"
        ? 0
        : Math.max(0, Math.round(Number(form.pricePerStudent) || 0));
    const students = Math.max(0, Math.round(Number(form.students) || 0));
    const notes = form.notes.trim();
    const school: School = {
      id: editing ? editing.id : `sch-${Date.now()}`,
      name: form.name.trim(),
      city: form.city.trim(),
      plan: form.plan,
      pricePerStudent: price,
      students,
      joined: editing ? editing.joined : new Date().toLocaleDateString("en-CA"),
      ...(notes ? { notes } : {}),
    };
    upsertSchool(school);
    setOpen(false);
  };

  const confirmRemove = (s: School) => setRemoving(s);

  return (
    <div className="space-y-8">
      <div>
        <div className="eyebrow mb-1">Summit view · Schools</div>
        <h1 className="font-display text-3xl font-bold text-cream">Schools</h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          Every school on Pinnacle, with its plan and headcount. Pricing lives
          on the Pricing control page — this is the roster.
        </p>
      </div>

      <div>
        <SectionHead
          eyebrow={`Section A · ${schools.length} on the platform`}
          title="The roster"
          action={
            <button className="btn-gold" onClick={startAdd}>
              <Plus size={16} strokeWidth={1.8} /> Add school
            </button>
          }
        />

        {schools.length === 0 ? (
          <Empty
            title="No schools yet"
            body="The platform is empty. Onboard your first school and set its plan — everything else flows from there."
            action={
              <button className="btn-gold" onClick={startAdd}>
                <Plus size={16} strokeWidth={1.8} /> Add school
              </button>
            }
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {schools.map((s) => (
              <div key={s.id} className="card flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <Building2
                    size={18}
                    strokeWidth={1.8}
                    className="text-gold shrink-0 mt-0.5"
                  />
                  <span className={PLAN_CHIP[s.plan]}>{PLAN_LABEL[s.plan]}</span>
                </div>
                <div className="font-display font-semibold text-cream">
                  {s.name}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-dim mt-1">
                  <MapPin size={13} strokeWidth={1.8} /> {s.city}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="card-inset !p-3">
                    <div className="font-mono text-sm text-cream inline-flex items-center gap-1.5">
                      <Users size={13} strokeWidth={1.8} className="text-sky" />
                      {s.students.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[11px] text-dim">Students</div>
                  </div>
                  <div className="card-inset !p-3">
                    <div className="font-mono text-sm text-cream">
                      {s.plan === "free" ? "Free" : `${inr(s.pricePerStudent)}/mo`}
                    </div>
                    <div className="text-[11px] text-dim">Per student</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-dim mt-3">
                  <CalendarDays size={13} strokeWidth={1.8} /> Joined{" "}
                  {formatJoined(s.joined)}
                </div>

                {s.notes && (
                  <p className="text-xs text-muted mt-2 border-l-2 border-line pl-3">
                    {s.notes}
                  </p>
                )}

                <div className="flex gap-2 mt-4 pt-3 border-t border-line/60">
                  <button
                    className="btn-ghost !px-3 !py-1.5 !text-xs flex-1"
                    onClick={() => startEdit(s)}
                  >
                    <Pencil size={14} strokeWidth={1.8} /> Edit
                  </button>
                  <button
                    className="btn-danger !px-3 !py-1.5 !text-xs"
                    onClick={() => confirmRemove(s)}
                  >
                    <Trash2 size={14} strokeWidth={1.8} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? `Edit ${editing.name}` : "Add school"}
      >
        <div className="space-y-4">
          <div>
            <label className="label" htmlFor="sch-name">
              School name
            </label>
            <input
              id="sch-name"
              className="input"
              placeholder="e.g. St. Xavier's Senior Secondary"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="label" htmlFor="sch-city">
              City
            </label>
            <input
              id="sch-city"
              className="input"
              placeholder="e.g. Chennai"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="sch-plan">
                Plan
              </label>
              <select
                id="sch-plan"
                className="input"
                value={form.plan}
                onChange={(e) => setPlan(e.target.value as School["plan"])}
              >
                <option value="free">Free</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="sch-price">
                ₹ per student / month
              </label>
              <input
                id="sch-price"
                className="input"
                type="number"
                min={0}
                step={10}
                disabled={form.plan === "free"}
                value={form.pricePerStudent}
                onChange={(e) =>
                  setForm((f) => ({ ...f, pricePerStudent: e.target.value }))
                }
              />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="sch-students">
              Students
            </label>
            <input
              id="sch-students"
              className="input"
              type="number"
              min={0}
              value={form.students}
              onChange={(e) =>
                setForm((f) => ({ ...f, students: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="label" htmlFor="sch-notes">
              Notes (optional)
            </label>
            <input
              id="sch-notes"
              className="input"
              placeholder="e.g. Pilot school, classes 9–12 onboarded"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button className="btn-gold flex-1" onClick={save} disabled={!canSave}>
              {editing ? "Save changes" : "Add school"}
            </button>
            <button className="btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={removing !== null}
        onClose={() => setRemoving(null)}
        title={removing ? `Remove ${removing.name}?` : "Remove school?"}
      >
        <p className="text-sm text-muted mb-5">
          Their students lose access immediately. This cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button className="btn-ghost" onClick={() => setRemoving(null)}>
            Keep it
          </button>
          <button
            className="btn-danger"
            onClick={() => {
              if (removing) removeSchool(removing.id);
              setRemoving(null);
            }}
          >
            Yes, remove it
          </button>
        </div>
      </Modal>
    </div>
  );
}
