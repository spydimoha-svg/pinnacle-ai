import { Link } from "react-router-dom";
import { Compass, Home, ArrowLeft } from "lucide-react";
import { Logo } from "../components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-between p-5 text-center">
      {/* Header Logo */}
      <header className="w-full max-w-6xl mx-auto py-5 flex items-center justify-between">
        <Link to="/" aria-label="Pinnacle AI Home">
          <Logo size={28} />
        </Link>
        <Link to="/app" className="btn-ghost !py-2 text-sm">
          Go to App
        </Link>
      </header>

      {/* Main 404 Card */}
      <main className="my-auto max-w-lg w-full card !p-8 md:!p-12 space-y-6 border border-gold-dim/40 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto text-gold">
          <Compass size={32} className="animate-spin-slow" />
        </div>

        <div>
          <span className="eyebrow-gold mb-2 block font-mono text-xs">Error 404 · Trail Not Found</span>
          <h1 className="font-display text-4xl font-bold text-cream">
            Off the Peak
          </h1>
          <p className="text-sm text-muted mt-3 leading-relaxed">
            The page or chapter you are looking for has moved, expired, or does not exist on Pinnacle AI.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="btn-gold w-full sm:w-auto">
            <Home size={16} /> Return to Summit
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-ghost w-full sm:w-auto"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto py-6 border-t border-line text-xs text-dim flex justify-between items-center">
        <span>Pinnacle AI · 404 Station</span>
        <Link to="/pricing" className="hover:text-gold">
          Pricing & Plans
        </Link>
      </footer>
    </div>
  );
}
