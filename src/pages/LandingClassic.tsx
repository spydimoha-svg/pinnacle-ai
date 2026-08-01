/**
 * The previous Pinnacle landing page (book intro -> DNA -> feature grid).
 *
 * Superseded by the PinnacleAI Landing design import, but kept intact and
 * unrouted so the earlier art direction is one import away if we want it back.
 */
import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  MessageCircle,
  FileText,
  Library,
  Clapperboard,
  Rocket,
  NotebookPen,
  Building2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Logo } from "../components/Logo";
import { BookIntro } from "../components/BookIntro";
import { BookToDna, InkReveal } from "../components/BookToDna";
import { HeroAscent } from "../components/HeroAscent";
import { useSmoothScroll } from "../lib/smoothScroll";
import { useReveals } from "../lib/reveal";

const FEATURES = [
  {
    icon: MessageCircle,
    title: "A teacher who never sleeps",
    body: "The Pinnacle tutor teaches like your favourite teacher — one concept at a time, checks your understanding, and grades your answers the way a CBSE examiner marks them.",
  },
  {
    icon: FileText,
    title: "Worksheets built for you",
    body: "Generate practice sets from PYQs, exemplar and important questions — filtered by chapter and marks, with marking-scheme answers and examiner keywords.",
  },
  {
    icon: Library,
    title: "Every book in one place",
    body: "NCERT textbooks, exemplars, CBSE sample papers, syllabus documents and your own school's material — organised by class and subject.",
  },
  {
    icon: Clapperboard,
    title: "Videos on demand",
    body: "Ask for any topic as an animated lesson with your favourite characters, plus curated best-of-YouTube explainers in your language.",
  },
  {
    icon: Rocket,
    title: "Learn Better mode",
    body: "Flip a switch to go beyond boards — the same chapters, taught at JEE, NEET, CUET or SAT depth, with entrance-style questions.",
  },
  {
    icon: NotebookPen,
    title: "The Blob",
    body: "A daily check-in that's yours. Write what you finished, what's hard, what's on your mind — Pinnacle reads between the lines and adjusts your plan.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Your school joins",
    body: "The preset Pinnacle library (NCERT + CBSE analysis) is ready on day one. Your school's admin adds material only your school sees.",
  },
  {
    n: "02",
    title: "Pinnacle learns you",
    body: "It remembers your name, your strong chapters, your weak spots, your streak — and teaches accordingly. You and your tutor level up together.",
  },
  {
    n: "03",
    title: "You climb",
    body: "Sit with Pinnacle for an hour and walk out with a chapter done: taught, practised with PYQs, and self-tested. Altitude points track the climb.",
  },
];

/**
 * Marks a block for the batched GSAP reveal pass (see lib/reveal.ts).
 * `delay` is kept for call-site compatibility but ordering is now handled by
 * ScrollTrigger's stagger, which reads far more natural than fixed offsets.
 */
function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={className ? `pnz-reveal ${className}` : "pnz-reveal"}>
      {children}
    </div>
  );
}

export default function LandingClassic() {
  // The book intro plays on entry. Click the book (or Skip) to reveal the site.
  const [intro, setIntro] = useState(true);

  // Momentum scroll + batched reveals. Reveals re-init once the intro clears,
  // since everything below it is measured only after the overlay unmounts.
  useSmoothScroll(!intro);
  useReveals([intro]);

  function endIntro() {
    setIntro(false);
  }

  return (
    <div className="relative min-h-screen bg-ink overflow-x-clip">
      {intro && <BookIntro onDone={endIntro} />}

      <Aurora />

      {/* Nav */}
      <motion.header
        className="relative z-10 max-w-6xl mx-auto px-5 py-5 flex items-center justify-between"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <Logo size={30} />
        <nav className="flex items-center gap-2">
          <Link to="/pricing" className="btn-ghost !py-2 text-sm">
            Pricing
          </Link>
          <Link to="/login" className="btn-gold !py-2 text-sm">
            Sign in
          </Link>
        </nav>
      </motion.header>

      {/* Hero — kinetic SplitText rise, mote field, self-drawing ridgeline */}
      <HeroAscent />

      <div className="ridge-rule relative z-10" />

      {/* Specimen strip */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 py-16">
        <Reveal>
          <div className="card !p-0 overflow-hidden pnz-card">
            <div className="px-6 py-3 border-b border-line flex items-center justify-between">
              <span className="eyebrow-dim">Specimen · how Pinnacle answers</span>
              <span className="marks">[3]</span>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div>
                <div className="font-mono text-xs text-dim mb-2">Q 12.</div>
                <p className="text-cream font-medium">
                  Prove that √2 is an irrational number.
                </p>
                <p className="text-xs text-dim mt-3 font-mono">
                  CBSE 2024 · Mathematics · Section B
                </p>
              </div>
              <div className="card-inset text-sm text-muted leading-relaxed">
                <span className="text-gold font-semibold">
                  Assume, to the contrary,
                </span>{" "}
                that √2 is rational ⇒ √2 = a/b, a and b{" "}
                <span className="text-gold font-semibold">coprime</span> … ⇒ 2
                divides both a and b — a{" "}
                <span className="text-gold font-semibold">contradiction</span>.
                Hence √2 is irrational.
                <div className="mt-3 text-xs text-dim">
                  Gold words = the exact keywords the CBSE key awards marks for.
                  Pinnacle teaches you to write them every time.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Inside the model — the book flies in, flashes, and merges into the
          red helix, which then resolves into the copy. Scroll-driven. */}
      <BookToDna />

      {/* Learn Better Mode — revealed out of an ink splatter */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 py-28">
        <InkReveal className="text-center">
          <div className="eyebrow mb-3">One switch</div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-cream leading-[1.02]">
            Learn Better <span className="pnz-shimmer">Mode</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto mt-5 text-lg">
            Flip it on and the same chapter is retaught at JEE, NEET, CUET or SAT
            depth — deeper concepts, faster methods, entrance-style questions.
            Boards by day, ranks by night.
          </p>
        </InkReveal>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 pb-20">
        <div className="mb-10">
          <div className="eyebrow mb-2">What's inside</div>
          <InkReveal>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream">
              Everything between you and full marks.
            </h2>
          </InkReveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08}>
              <div className="card pnz-card h-full">
                <Icon size={20} className="text-gold mb-3" strokeWidth={1.8} />
                <div className="font-display font-semibold text-cream mb-1.5">
                  {title}
                </div>
                <p className="text-sm text-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="ridge-rule relative z-10" />

      {/* How it works */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 py-20">
        <Reveal>
          <div className="eyebrow mb-2">The climb</div>
          <h2 className="font-display text-3xl font-bold text-cream mb-10">
            How Pinnacle works
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="card pnz-card h-full">
                <div className="font-mono text-gold-dim text-sm mb-3">{s.n}</div>
                <div className="font-display font-semibold text-cream mb-1.5">
                  {s.title}
                </div>
                <p className="text-sm text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Schools */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 pb-20">
        <Reveal>
          <div className="card pnz-card md:flex items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Building2 size={18} className="text-gold" />
                <span className="eyebrow">For schools</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-cream mb-2">
                Your school's material, your students only.
              </h3>
              <p className="text-sm text-muted max-w-xl">
                Pinnacle is multi-school by design. Admins upload notes, worksheets
                and internal papers that stay private to their school, layered on
                top of the preset CBSE library.
              </p>
            </div>
            <div className="mt-6 md:mt-0 shrink-0 space-y-2">
              <div className="chip-gold">
                <ShieldCheck size={13} /> School-scoped content
              </div>
              <div className="chip">₹100–200 per student</div>
              <div className="chip">Free tier for partner schools</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-line">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size={22} />
          <p className="text-xs text-dim">
            Pinnacle AI — the peak of all edtech. Built for CBSE students, by a
            student.
          </p>
          <div className="flex gap-4 text-xs text-dim">
            <Link to="/pricing" className="hover:text-gold">
              Pricing
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

/**
 * Ambient futuristic backdrop: drifting aurora blobs + faint grid.
 *
 * The drift is pure CSS keyframes on promoted layers, not JS. Each blob is a
 * 620px element under a 70px blur — driving those from framer-motion forced
 * the browser to re-rasterise the blur on every frame from the main thread,
 * which was the heaviest cost on this page. As composited transforms they are
 * effectively free, and they keep animating smoothly even while React is busy.
 */
function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="pnz-grid absolute inset-0" />
      <div
        className="pnz-blob pnz-blob-a"
        style={{ background: "radial-gradient(circle, rgba(240,199,102,0.18), transparent 60%)", top: "-10%", left: "-5%" }}
      />
      <div
        className="pnz-blob pnz-blob-b"
        style={{ background: "radial-gradient(circle, rgba(77,208,225,0.14), transparent 60%)", top: "20%", right: "-8%" }}
      />
      <div
        className="pnz-blob pnz-blob-c"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.14), transparent 60%)", bottom: "-10%", left: "25%" }}
      />
    </div>
  );
}
