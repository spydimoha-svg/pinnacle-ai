import { useRef } from "react";
import { Link } from "react-router-dom";
import { PortalVortex } from "../components/landing/PortalVortex";
import { DnaHelix } from "../components/landing/DnaHelix";
import { DepthScan } from "../components/landing/DepthScan";
import { useLandingChrome } from "../components/landing/useLandingChrome";
import { LogoMark } from "../components/Logo";
import "./landing.css";

/**
 * The PinnacleAI landing page — a six-chapter descent, ported from the Claude
 * Design source `PinnacleAI Landing.dc.html`.
 *
 * Three WebGL scenes carry it (portal, helix, depth scan) and each one is
 * optional: the page is fully legible and fully navigable if none of them ever
 * paint. The previous landing is kept at pages/LandingClassic.tsx.
 *
 * Where the design mocks a CTA as an in-page anchor, it is resolved here to
 * the real destination: every gold "Begin Learning" starts the product, the
 * ghost links continue the narrative.
 */

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Statistics",
  "Economics",
  "Accountancy",
  "Business Studies",
  "English",
  "History",
  "Geography",
  "Political Science",
  "Environmental Science",
];

const EXAMS = ["CBSE", "ICSE", "JEE", "NEET", "IB", "SAT"];

const STATS = [
  { n: "1:1", l: ["Tutoring depth,", "at any hour"] },
  { n: "14", l: ["Subjects mapped", "to syllabus"] },
  { n: "0", l: ["Answers given", "without reasoning"] },
];

const METHOD = [
  {
    n: "01",
    title: "Adaptive explanation",
    body: "The same concept, re-explained through the frame you already understand — geometry through motion, chemistry through cooking, whatever lands.",
  },
  {
    n: "02",
    title: "Questions before answers",
    body: "A patient tutor asks what you think first. It corrects the reasoning, not just the result — so the next problem gets easier, not the same.",
  },
  {
    n: "03",
    title: "Structured mastery",
    body: "Every topic sits in a map of what it depends on. Weak foundations get rebuilt before the exam finds them.",
  },
];

export default function Landing() {
  const root = useRef<HTMLDivElement>(null);
  const mastery = useRef<HTMLElement>(null);

  useLandingChrome(root);

  return (
    <div className="pa-root" ref={root}>
      {/* Title card. Pure CSS, so it can never gate the page on WebGL. */}
      <div className="pa-intro" data-pa-intro>
        <span className="pa-intro-label">Preparing the scene</span>
        <span className="pa-intro-track">
          <span className="pa-intro-bar" data-pa-intro-bar />
        </span>
      </div>

      <div className="pa-vignette" data-pa-vignette aria-hidden="true" />
      <div className="pa-grain" aria-hidden="true" />

      <header className="pa-header" data-pa-header>
        <a className="pa-brand" href="#pa-top" aria-label="PinnacleAI, back to top">
          <LogoMark size={26} />
          <span className="pa-wordmark">
            Pinnacle<span>AI</span>
          </span>
        </a>
        {/* Hidden over the portal and lifted in once the descent starts — but
            it ships visible, so a failed chrome pass can't hide Sign in. */}
        <nav className="pa-nav" data-pa-nav>
          <a className="pa-nav-hide-sm" href="#pa-about">
            About
          </a>
          <a className="pa-nav-hide-sm" href="#pa-teaching">
            How it teaches
          </a>
          <a href="#pa-finale">Begin</a>
          <Link className="pa-nav-key" to="/login">
            Sign in
          </Link>
        </nav>
      </header>

      {/* Chapter rail. Decorative — the sections it tracks are all reachable
          from the nav and by scrolling. */}
      <aside className="pa-rail" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} data-pa-dot style={i === 0 ? { width: 22, background: "rgba(255,255,255,0.85)" } : undefined} />
        ))}
      </aside>

      <main className="pa-main">
        {/* ————— 00 · Portal ————— */}
        <section id="pa-top" className="pa-portal">
          <PortalVortex />
          <div className="pa-portal-veil" aria-hidden="true" />

          <div className="pa-portal-inner">
            <p className="pa-kicker pa-veil-in">PinnacleAI · Adaptive learning</p>
            <h1 className="pa-h1 pa-display">
              <span className="pa-h1-line">
                <span>Descend into</span>
              </span>
              <span className="pa-h1-line">
                <span>understanding</span>
              </span>
            </h1>
            <p className="pa-lede pa-portal-lede pa-veil-in">
              An adaptive tutor that finds the exact place your understanding stops — and
              rebuilds from there. Not answers. Understanding.
            </p>
            <div className="pa-cta-row pa-veil-in">
              <Link className="pa-btn-gold" to="/login">
                <span className="pa-shine pa-shine-late" aria-hidden="true" />
                <span>Begin Learning</span>
              </Link>
              <a className="pa-btn-ghost" href="#pa-teaching">
                See how it teaches
              </a>
            </div>
          </div>

          <div className="pa-scrollhint" aria-hidden="true">
            <b>Scroll</b>
            <i />
          </div>
        </section>

        {/* ————— 01 · About ————— */}
        <section id="pa-about" className="pa-about">
          <div className="pa-about-body pa-reveal" data-reveal>
            <p className="pa-kicker">About PinnacleAI</p>
            <h2>We don't hand you answers. We build understanding.</h2>
            <p className="pa-copy">
              Most tools optimise for the fastest route to a correct answer. That produces
              marks, not mastery. PinnacleAI works the other way: it finds the exact place
              your understanding stops, and rebuilds from there.
            </p>
            <p className="pa-copy">
              Built for students preparing for school and competitive examinations — and for
              the parents and teachers who need to see the progress, not just the score.
            </p>
            <div className="pa-stats">
              {STATS.map((s) => (
                <div key={s.n}>
                  <p className="pa-stat-n">{s.n}</p>
                  <p className="pa-stat-l">
                    {s.l[0]}
                    <br />
                    {s.l[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ————— 01c · Subjects ————— */}
        <section className="pa-marquee-wrap">
          <p className="pa-marquee-label pa-reveal" data-reveal>
            Mapped to syllabus
          </p>
          <div className="pa-marquee pa-reveal" data-reveal>
            {/* Two identical runs: the track translates exactly -50%, so the
                seam lands where the second run starts and never shows. */}
            <div className="pa-marquee-track">
              <div className="pa-marquee-run">
                {SUBJECTS.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <div className="pa-marquee-run" aria-hidden="true">
                {SUBJECTS.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ————— 02 · How it teaches ————— */}
        <section id="pa-teaching" className="pa-teaching">
          <div className="pa-teaching-inner">
            <div className="pa-teaching-head pa-reveal" data-reveal>
              <p className="pa-kicker pa-kicker-tight">Chapter 02 · How it teaches</p>
              <h2>Three ways it adapts to you.</h2>
            </div>
            <div className="pa-cards">
              {METHOD.map((m) => (
                <div className="pa-card pa-reveal" data-reveal key={m.n}>
                  <p className="pa-card-n">{m.n}</p>
                  <h3>{m.title}</h3>
                  <p className="pa-copy">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ————— 03 · Structure ————— */}
        <section className="pa-structure">
          <div className="pa-panel">
            <div className="pa-panel-bg" aria-hidden="true">
              <DnaHelix />
              <div className="pa-panel-veil-a" />
              <div className="pa-panel-veil-b" />
            </div>

            <nav className="pa-subnav">
              <a className="pa-subnav-brand" href="#pa-top">
                <LogoMark size={17} />
                <span>PinnacleAI</span>
              </a>
              <div className="pa-subnav-links">
                <a href="#pa-teaching">Method</a>
                <a href="#pa-mastery">Subjects</a>
                <Link to="/pricing">Pricing</Link>
                <a href="#pa-about">About</a>
              </div>
              <div className="pa-subnav-auth">
                <Link className="pa-pill-ghost" to="/login">
                  Log in
                </Link>
                <Link className="pa-pill-gold" to="/login">
                  Sign up
                </Link>
              </div>
            </nav>

            <div className="pa-panel-copy pa-reveal" data-reveal>
              <p className="pa-kicker">Chapter 03 · Structure</p>
              <h2 className="pa-display">Knowledge has a structure</h2>
              <p className="pa-lede">
                Ideas are not a list — they are a strand, each one bonded to the one beneath
                it. Learn in that order and nothing needs memorising twice.
              </p>
              <div className="pa-panel-actions">
                <Link className="pa-btn-gold" to="/login">
                  <span className="pa-shine" aria-hidden="true" />
                  <span>Begin Learning</span>
                  <svg
                    style={{ position: "relative" }}
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
                <a className="pa-textlink" href="#pa-teaching">
                  See how it teaches
                </a>
              </div>
            </div>
          </div>

          <div className="pa-exams pa-reveal" data-reveal>
            <p className="pa-exams-label">Preparing students for</p>
            <div className="pa-exams-list">
              {EXAMS.map((e) => (
                <span key={e}>{e}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ————— 04 · Adaptation ————— */}
        <section className="pa-adapt">
          <div className="pa-adapt-body pa-reveal" data-reveal>
            <p className="pa-kicker pa-kicker-tight">Chapter 04 · Adaptation</p>
            <h2>Intelligence isn't fixed.</h2>
            <p className="pa-copy">
              It flows toward whatever you don't understand yet, and thins out where you're
              already strong. The lesson reshapes itself around you.
            </p>
          </div>
        </section>

        {/* ————— 05 · Mastery ————— */}
        <section id="pa-mastery" className="pa-mastery" ref={mastery}>
          <div className="pa-mastery-sticky">
            <div className="pa-mastery-veil" aria-hidden="true" />
            <DepthScan sectionRef={mastery} />
            <div className="pa-mastery-copy pa-reveal" data-reveal>
              <p className="pa-kicker">Chapter 05 · Mastery</p>
              <h2 className="pa-display">Understanding is built, not handed over</h2>
              <p className="pa-lede">
                We find the exact place your understanding stops — and rebuild from there.
              </p>
              <a className="pa-btn-ghost" href="#pa-finale">
                <span>Begin Learning</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M11 5V17" />
                  <path d="M6 12L11 17L16 12" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ————— 06 · Begin ————— */}
        <section id="pa-finale" className="pa-finale">
          <div className="pa-reveal" data-reveal>
            <p className="pa-kicker pa-kicker-gold">Chapter 06 · Begin</p>
            <h2>
              Knowledge isn't stored.
              <br />
              <em>It evolves.</em>
            </h2>
            <p className="pa-finale-lede">
              Start with one question. The strand builds itself from there.
            </p>
            <div className="pa-finale-actions">
              <Link className="pa-btn-gold" to="/login">
                <span className="pa-shine" aria-hidden="true" />
                <span>Begin Learning</span>
              </Link>
              <a className="pa-finale-alt" href="#pa-teaching">
                See how it works
              </a>
            </div>
          </div>

          <footer className="pa-footer">
            <span>PinnacleAI · {new Date().getFullYear()}</span>
            <a href="#pa-about">About</a>
            <a href="#pa-teaching">Method</a>
            <Link to="/pricing">Pricing</Link>
          </footer>
        </section>
      </main>
    </div>
  );
}
