import { useState } from "react";
import { IndianRupee, SlidersHorizontal } from "lucide-react";
import type { School } from "../../lib/types";
import { useStore } from "../../lib/store";
import { SectionHead, Empty } from "../../components/ui";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const DEFAULT_TIERS = [
  {
    plan: "Starter",
    price: "₹100",
    blurb: "AI tutor, full question bank and the NCERT library. The essentials, per student per month.",
  },
  {
    plan: "Standard",
    price: "₹150",
    blurb: "Everything in Starter plus worksheets, progress memory and the school admin console.",
  },
  {
    plan: "Premium",
    price: "₹200",
    blurb: "The full climb: entrance-exam tracks, curated videos and priority onboarding support.",
  },
];

export default function PricingControl() {
  const schools = useStore((s) => s.schools);
  const upsertSchool = useStore((s) => s.upsertSchool);
  // Per-school edit buffer so an empty field can be shown while typing without
  // persisting it as ₹0. Keyed by school id.
  const [priceBuf, setPriceBuf] = useState<Record<string, string>>({});

  const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);
  const mrr = schools.reduce((sum, s) => sum + s.students * s.pricePerStudent, 0);
  const blended = totalStudents > 0 ? Math.round(mrr / totalStudents) : 0;

  const setPlan = (s: School, plan: School["plan"]) =>
    upsertSchool({
      ...s,
      plan,
      pricePerStudent: plan === "free" ? 0 : s.pricePerStudent,
    });

  const setPrice = (s: School, raw: string) => {
    if (s.plan === "free") return;
    setPriceBuf((b) => ({ ...b, [s.id]: raw }));
    // An empty / non-numeric field is a transient editing state — never persist
    // it as ₹0. Only a real number writes through.
    if (raw.trim() === "" || !Number.isFinite(Number(raw))) return;
    const price = Math.max(0, Math.round(Number(raw)));
    upsertSchool({ ...s, pricePerStudent: price });
  };

  const commitPrice = (s: School) =>
    // On blur, drop the buffer so the field snaps back to the persisted value
    // (a field left empty reverts instead of sticking at 0).
    setPriceBuf((b) => {
      if (!(s.id in b)) return b;
      const next = { ...b };
      delete next[s.id];
      return next;
    });

  return (
    <div className="space-y-8">
      <div>
        <div className="eyebrow mb-1">Summit view · Pricing</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          Pricing control
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          The levers. Every change here writes straight to the platform — no
          save button, no confirmation dance.
        </p>
      </div>

      {/* Summary */}
      <div className="card !bg-pit/70 !p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <div>
            <div className="eyebrow-dim mb-1">Blended price</div>
            <div className="font-display text-2xl font-bold text-cream">
              {inr(blended)}
              <span className="text-sm text-dim font-body font-normal">
                {" "}
                / student
              </span>
            </div>
          </div>
          <div>
            <div className="eyebrow-dim mb-1">Projected MRR</div>
            <div className="font-display text-2xl font-bold text-gold">
              {inr(mrr)}
            </div>
          </div>
          <div>
            <div className="eyebrow-dim mb-1">Students billed</div>
            <div className="font-display text-2xl font-bold text-cream">
              {schools
                .filter((s) => s.plan !== "free")
                .reduce((sum, s) => sum + s.students, 0)
                .toLocaleString("en-IN")}
              <span className="text-sm text-dim font-body font-normal">
                {" "}
                of {totalStudents.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
        <div className="ridge-rule my-4" />
        <p className="text-xs text-muted">
          You set the price. Some schools ride free — that's your call.
        </p>
      </div>

      {/* Per-school levers */}
      <div>
        <SectionHead
          eyebrow="Section A · Per school"
          title="School-by-school levers"
        />
        {schools.length === 0 ? (
          <Empty
            title="Nothing to price"
            body="No schools on the platform yet. Add one from the Schools page and its pricing lever appears here."
          />
        ) : (
          <div className="space-y-2">
            {schools.map((s) => {
              const monthly = s.students * s.pricePerStudent;
              return (
                <div
                  key={s.id}
                  className="card flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-cream truncate">
                      {s.name}
                    </div>
                    <div className="text-xs text-dim">
                      {s.city} ·{" "}
                      <span className="font-mono">
                        {s.students.toLocaleString("en-IN")}
                      </span>{" "}
                      students
                    </div>
                  </div>

                  <div className="flex items-end gap-3">
                    <div>
                      <label className="label" htmlFor={`plan-${s.id}`}>
                        Plan
                      </label>
                      <select
                        id={`plan-${s.id}`}
                        className="input !w-32"
                        value={s.plan}
                        onChange={(e) =>
                          setPlan(s, e.target.value as School["plan"])
                        }
                      >
                        <option value="free">Free</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                    <div>
                      <label className="label" htmlFor={`price-${s.id}`}>
                        ₹ / student
                      </label>
                      <input
                        id={`price-${s.id}`}
                        className="input !w-28"
                        type="number"
                        min={0}
                        step={10}
                        disabled={s.plan === "free"}
                        value={priceBuf[s.id] ?? String(s.pricePerStudent)}
                        onChange={(e) => setPrice(s, e.target.value)}
                        onBlur={() => commitPrice(s)}
                      />
                    </div>
                    <div className="text-right min-w-24 pb-2.5">
                      <div className="eyebrow-dim mb-0.5">Monthly</div>
                      {s.plan === "free" ? (
                        <span className="chip-mint">Free</span>
                      ) : s.pricePerStudent === 0 ? (
                        <span className="chip-coral" title="Set a price — this school is on a paid plan but billing nothing">
                          No price set
                        </span>
                      ) : (
                        <span className="font-mono text-gold">
                          {inr(monthly)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Default tiers */}
      <div>
        <SectionHead
          eyebrow="Section B · Rate card"
          title="Default pricing tiers"
        />
        <div className="card">
          <div className="flex items-center gap-2 text-xs text-muted mb-4">
            <SlidersHorizontal size={14} strokeWidth={1.8} className="text-gold" />
            These are the public rate-card defaults shown on /pricing. Any
            school can be overridden above — the levers always win.
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {DEFAULT_TIERS.map((t) => (
              <div key={t.plan} className="card-inset">
                <div className="flex items-center justify-between mb-2">
                  <span className="eyebrow-dim">{t.plan}</span>
                  <IndianRupee
                    size={14}
                    strokeWidth={1.8}
                    className="text-gold-dim"
                  />
                </div>
                <div className="font-display text-xl font-bold text-cream">
                  {t.price}
                  <span className="text-xs text-dim font-body font-normal">
                    {" "}
                    / student / month
                  </span>
                </div>
                <p className="text-xs text-muted mt-2">{t.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
