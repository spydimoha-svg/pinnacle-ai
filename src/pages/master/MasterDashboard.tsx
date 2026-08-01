import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Gift,
  IndianRupee,
  Radar,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import { useStore } from "../../lib/store";
import { SUBJECTS, QUESTIONS, RESOURCES, VIDEOS } from "../../data";
import { SectionHead, Stat } from "../../components/ui";
import { Ridgeline } from "../../components/Logo";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function MasterDashboard() {
  const currentUser = useStore((s) => s.currentUser);
  const schools = useStore((s) => s.schools);

  const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);
  const mrr = schools.reduce((sum, s) => sum + s.students * s.pricePerStudent, 0);
  const freeSchools = schools.filter((s) => s.plan === "free").length;

  const contentStats = [
    { label: "Subjects", value: SUBJECTS.length },
    { label: "Questions", value: QUESTIONS.length },
    { label: "Resources", value: RESOURCES.length },
    { label: "Videos", value: VIDEOS.length },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="relative card !bg-pit/70 overflow-hidden !p-7">
        <div className="eyebrow mb-1">Summit view · Pinnacle Master</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          Welcome back, {currentUser?.name ?? "operator"}.
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          The whole mountain from up here — schools, revenue, content and the
          CBSE watch. Everything on this console writes straight to the
          platform.
        </p>
        <Ridgeline className="absolute bottom-0 left-0 w-full h-16 opacity-70 pointer-events-none" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat
          label="Schools"
          value={
            <span className="inline-flex items-center gap-2">
              <Building2 size={20} strokeWidth={1.8} className="text-gold" />
              {schools.length}
            </span>
          }
          sub="On the platform"
          accent
        />
        <Stat
          label="Students"
          value={
            <span className="inline-flex items-center gap-2">
              <Users size={20} strokeWidth={1.8} className="text-sky" />
              {totalStudents.toLocaleString("en-IN")}
            </span>
          }
          sub="Across all schools"
        />
        <Stat
          label="Projected MRR"
          value={
            <span className="inline-flex items-center gap-2">
              <IndianRupee size={20} strokeWidth={1.8} className="text-mint" />
              {mrr.toLocaleString("en-IN")}
            </span>
          }
          sub="Students × price, per month"
        />
        <Stat
          label="Free schools"
          value={
            <span className="inline-flex items-center gap-2">
              <Gift size={20} strokeWidth={1.8} className="text-coral" />
              {freeSchools}
            </span>
          }
          sub="Riding free, your call"
        />
      </div>

      {/* Revenue + platform health */}
      <div className="grid lg:grid-cols-3 gap-3 items-start">
        <div className="card lg:col-span-2">
          <SectionHead
            eyebrow="Section A · Revenue"
            title="Revenue by school"
            action={
              <Link
                to="/master/pricing"
                className="text-sm text-gold hover:text-gold-bright inline-flex items-center gap-1"
              >
                Adjust pricing <ArrowRight size={14} strokeWidth={1.8} />
              </Link>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="eyebrow-dim font-normal pb-2 pr-4">School</th>
                  <th className="eyebrow-dim font-normal pb-2 pr-4 text-right">
                    Students
                  </th>
                  <th className="eyebrow-dim font-normal pb-2 pr-4 text-right">
                    ₹ / student
                  </th>
                  <th className="eyebrow-dim font-normal pb-2 text-right">
                    Monthly
                  </th>
                </tr>
              </thead>
              <tbody>
                {schools.map((s) => (
                  <tr key={s.id} className="border-t border-line/60">
                    <td className="py-2.5 pr-4">
                      <span className="text-cream font-medium">{s.name}</span>
                      <span className="text-dim text-xs ml-2">{s.city}</span>
                    </td>
                    <td className="py-2.5 pr-4 text-right font-mono text-muted">
                      {s.students.toLocaleString("en-IN")}
                    </td>
                    <td className="py-2.5 pr-4 text-right font-mono text-muted">
                      {s.plan === "free" ? "—" : inr(s.pricePerStudent)}
                    </td>
                    <td className="py-2.5 text-right font-mono">
                      {s.plan === "free" ? (
                        <span className="text-mint">Free</span>
                      ) : (
                        <span className="text-gold">
                          {inr(s.students * s.pricePerStudent)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-line">
                  <td className="py-2.5 pr-4 text-cream font-semibold">Total</td>
                  <td className="py-2.5 pr-4 text-right font-mono text-cream">
                    {totalStudents.toLocaleString("en-IN")}
                  </td>
                  <td className="py-2.5 pr-4" />
                  <td className="py-2.5 text-right font-mono text-gold font-semibold">
                    {inr(mrr)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <SectionHead eyebrow="Section B · Platform" title="Platform health" />
          <div className="grid grid-cols-2 gap-2 mb-4">
            {contentStats.map((c) => (
              <div key={c.label} className="card-inset !p-3">
                <div className="font-mono text-lg text-cream">{c.value}</div>
                <div className="text-xs text-dim">{c.label}</div>
              </div>
            ))}
          </div>
          <div className="ridge-rule mb-4" />
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs text-muted">Tutor model</div>
            <span className="chip-mint">
              <Sparkles size={13} strokeWidth={1.8} /> Free AI · live
            </span>
          </div>
          <p className="text-xs text-dim mt-2">
            Served via /api/chat across free providers (Groq, Gemini, Cerebras,
            OpenRouter, Ollama) with automatic fallback. Drops to offline drill
            mode if none are reachable.
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <SectionHead eyebrow="Section C · Console" title="Run the platform" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link to="/master/schools" className="card card-hover block">
            <Building2 size={18} strokeWidth={1.8} className="text-gold mb-2" />
            <div className="font-semibold text-cream text-sm mb-1">Schools</div>
            <p className="text-xs text-muted">
              Onboard new schools, edit details, and see who's on which plan.
            </p>
          </Link>
          <Link to="/master/pricing" className="card card-hover block">
            <SlidersHorizontal
              size={18}
              strokeWidth={1.8}
              className="text-mint mb-2"
            />
            <div className="font-semibold text-cream text-sm mb-1">
              Pricing control
            </div>
            <p className="text-xs text-muted">
              The levers. Set per-school prices, grant free tiers, watch MRR
              move.
            </p>
          </Link>
          <Link to="/master/updates" className="card card-hover block">
            <Radar size={18} strokeWidth={1.8} className="text-sky mb-2" />
            <div className="font-semibold text-cream text-sm mb-1">
              CBSE Watch
            </div>
            <p className="text-xs text-muted">
              Circulars, datesheets and syllabus changes rolled into the tutor
              daily.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
