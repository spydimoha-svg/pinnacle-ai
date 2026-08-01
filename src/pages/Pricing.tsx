import { Link } from "react-router-dom";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Logo, Ridgeline } from "../components/Logo";
import { useSmoothScroll } from "../lib/smoothScroll";
import { useReveals } from "../lib/reveal";

const PLANS: {
  id: string;
  name: string;
  price: string;
  per: string;
  blurb: string;
  features: string[];
  featured?: boolean;
}[] = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    per: "for partner schools",
    blurb:
      "Everything included — granted by the Pinnacle team to schools we partner with early.",
    features: [
      "Full preset CBSE library — NCERT, exemplar, PYQs",
      "Pinnacle tutor, worksheets and the Blob",
      "Learn Better entrance tracks",
      "School-scoped material uploads",
      "Granted directly by the Pinnacle team",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "₹100–150",
    per: "per student / month",
    blurb:
      "The full Pinnacle experience for any school — every student gets a teacher who never sleeps.",
    features: [
      "Full library — NCERT, exemplar, sample papers, PYQs",
      "Unlimited tutor sessions, marked like a CBSE examiner",
      "Worksheet generator with marking-scheme answers",
      "The Blob — daily check-ins with reflections",
      "Admin uploads, private to your school",
    ],
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹200",
    per: "per student / month",
    blurb:
      "For schools that want the whole mountain — priority video and visibility across the network.",
    features: [
      "Everything in Standard",
      "Video Studio priority — animated lessons first in queue",
      "Cross-school shared library access",
      "Admin analytics — class, chapter and student level",
      "Priority support for teachers and admins",
    ],
  },
];

const FAQS = [
  {
    q: "Is my school's material private?",
    a: "Yes. Pinnacle is multi-school by design — notes, worksheets and internal papers your admins upload are visible only to your school's students. Cross-school sharing exists only on Premium, and only for schools that opt in.",
  },
  {
    q: "What about individual students?",
    a: "Pinnacle is sold to schools, so students get access through their school at no extra cost to them. If your school isn't on Pinnacle yet, write to us — we'll reach out to them, and individual plans are on our roadmap.",
  },
  {
    q: "How does the free tier work?",
    a: "Partner schools get the full Standard experience at ₹0, granted by the Pinnacle team — usually early-adopter schools who help us shape the product. There's no card, no trial clock, no feature cuts.",
  },
  {
    q: "Can we switch plans?",
    a: "Any time. Plans are managed per school by the Pinnacle team, changes apply from the next month, and nothing is lost when you move — student memories, progress and uploaded material all carry over.",
  },
  {
    q: "Does Learn Better mode cost extra?",
    a: "No. The JEE, NEET, CUET and SAT tracks are part of every plan, including Free. Entrance prep shouldn't be a paywall.",
  },
];

export default function Pricing() {
  useSmoothScroll();
  useReveals();

  return (
    <div className="min-h-screen bg-ink">
      {/* Nav */}
      <header className="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between">
        <Link to="/" aria-label="Pinnacle AI home">
          <Logo size={30} />
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/" className="btn-ghost !py-2 text-sm">
            Home
          </Link>
          <Link to="/login" className="btn-gold !py-2 text-sm">
            Sign in
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-5 pt-14 pb-16 overflow-hidden">
        <div className="eyebrow mb-4">Plans · Per school, per student</div>
        <h1 className="font-display font-bold text-cream leading-[1.08] text-4xl sm:text-5xl max-w-2xl">
          Pricing that respects a{" "}
          <span className="text-gold">student's pocket</span>.
        </h1>
        <p className="text-muted max-w-xl mt-5 text-lg">
          One tuition class costs more per month than a whole year of Pinnacle.
          Schools pay per student, students pay nothing extra — and every plan
          includes the tutor, the library and Learn Better mode.
        </p>
        <Ridgeline className="absolute bottom-0 left-0 w-full h-20 opacity-70 pointer-events-none" />
      </section>

      <div className="ridge-rule" />

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`pnz-reveal pnz-card card flex flex-col relative ${
                plan.featured ? "!border-gold-dim !bg-pit/70" : ""
              }`}
            >
              {plan.featured && (
                <span className="chip-gold absolute -top-3.5 left-5">
                  Most schools pick this
                </span>
              )}
              <div className="eyebrow-dim mb-3 mt-1">{plan.name}</div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-cream">
                  {plan.price}
                </span>
                <span className="font-mono text-xs text-dim">{plan.per}</span>
              </div>
              <p className="text-sm text-muted mt-3">{plan.blurb}</p>
              <ul className="mt-5 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check
                      size={16}
                      strokeWidth={1.8}
                      className={`shrink-0 mt-0.5 ${
                        plan.featured ? "text-gold" : "text-mint"
                      }`}
                    />
                    <span className="text-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Talk to us */}
        <div className="card mt-6 md:flex items-center gap-6">
          <p className="flex-1 text-sm text-muted">
            <span className="text-cream font-semibold">
              Pricing is set per school by the Pinnacle team
            </span>{" "}
            — talk to us and we'll find the plan that fits your student strength
            and budget.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3 shrink-0">
            <a href="mailto:team@pinnacle.ai" className="btn-gold">
              <Mail size={16} /> Talk to us
            </a>
            <Link to="/login" className="btn-ghost">
              Sign in <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="ridge-rule" />

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="eyebrow mb-2">Frequently asked</div>
        <h2 className="font-display text-3xl font-bold text-cream mb-10">
          The questions schools ask us
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {FAQS.map((f) => (
            <div key={f.q} className="pnz-reveal pnz-card card">
              <div className="font-display font-semibold text-cream mb-1.5">
                {f.q}
              </div>
              <p className="text-sm text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size={22} />
          <p className="text-xs text-dim">
            Pinnacle AI — the peak of all edtech. Built for CBSE students, by a
            student.
          </p>
          <div className="flex gap-4 text-xs text-dim">
            <Link to="/" className="hover:text-gold">
              Home
            </Link>
            <Link to="/login" className="hover:text-gold">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
