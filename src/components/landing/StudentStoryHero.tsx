import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Feather, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function StudentStoryHero() {
  const [act, setAct] = useState<1 | 2 | 3>(1);

  // Auto-progress through acts if unclicked to demonstrate the story
  useEffect(() => {
    const timer = setInterval(() => {
      setAct((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto my-12 p-6 md:p-10 rounded-3xl bg-gradient-to-b from-pit/90 via-raise/80 to-pit/90 border border-gold-dim/40 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Glow aura */}
      <div
        className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
          act === 3 ? "bg-gold/25 scale-125" : "bg-sky/15 scale-100"
        }`}
        aria-hidden="true"
      />

      {/* Story Stage Selector */}
      <div className="flex items-center justify-between gap-2 mb-8 pb-4 border-b border-line/60">
        <div className="eyebrow-gold flex items-center gap-2">
          <Sparkles size={14} className="text-gold animate-pulse" />
          <span>A Student's Story · The Ascent</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setAct(1)}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              act === 1 ? "bg-coral/20 text-coral border border-coral/40" : "text-dim hover:text-cream"
            }`}
          >
            Act I: The Weight
          </button>
          <button
            onClick={() => setAct(2)}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              act === 2 ? "bg-coral/30 text-coral font-bold border border-coral/60" : "text-dim hover:text-cream"
            }`}
          >
            Act II: Overrun
          </button>
          <button
            onClick={() => setAct(3)}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              act === 3 ? "bg-gold/20 text-gold font-bold border border-gold/60 shadow-lg" : "text-dim hover:text-cream"
            }`}
          >
            Act III: Weightless
          </button>
        </div>
      </div>

      {/* Main Interactive Narrative Display */}
      <div className="grid md:grid-cols-12 gap-8 items-center min-h-[22rem]">
        {/* Left Column: Visual Illustration Stage */}
        <div className="md:col-span-6 relative flex items-center justify-center p-8 rounded-2xl bg-pit/80 border border-line/50 overflow-hidden">
          {/* ACT 1: Heavy Backpack & Pressure */}
          {act === 1 && (
            <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-coral/10 border border-coral/30 flex items-center justify-center shadow-inner">
                  <span className="text-4xl">🎒</span>
                </div>
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-coral/80 text-cream font-mono text-[10px]">
                  50+ Kg Books
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold text-cream text-lg">Burdened by Heavy Books</p>
                <p className="text-xs text-muted max-w-xs">
                  NCERT, RD Sharma, HC Verma, Cengage, Arihant, IGCSE Past Papers... hundreds of pages of unorganized pressure.
                </p>
              </div>
              <div className="flex gap-2 text-[11px] font-mono text-coral/90 bg-coral/10 px-3 py-1 rounded-full border border-coral/20">
                <span>⚡ Exam Stress</span>
                <span>•</span>
                <span>📚 Overwhelming Syllabi</span>
              </div>
            </div>
          )}

          {/* ACT 2: Overrun by Piles */}
          {act === 2 && (
            <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
              <div className="relative flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-coral/20 border border-coral/50 flex items-center justify-center animate-pulse">
                  <span className="text-5xl">📦</span>
                </div>
                <span className="absolute -top-3 -left-4 text-2xl rotate-12">📚</span>
                <span className="absolute -bottom-2 -right-4 text-2xl -rotate-12">📑</span>
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold text-coral text-lg">Completely Overrun</p>
                <p className="text-xs text-muted max-w-xs">
                  "Where do I begin? Should I solve Level 1 NCERT or Level 3 Cengage?" The pressure buries the joy of learning.
                </p>
              </div>
              <div className="flex gap-2 text-[11px] font-mono text-coral bg-coral/20 px-3 py-1 rounded-full border border-coral/40">
                <span>🚨 Confusion & Pressure</span>
              </div>
            </div>
          )}

          {/* ACT 3: Pinnacle AI Lifts Everything Effortlessly */}
          {act === 3 && (
            <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gold/20 border-2 border-gold/70 flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.3)]">
                  <span className="text-5xl animate-bounce">☝️✨</span>
                </div>
                <div className="absolute -top-2 -right-6 px-2 py-0.5 rounded bg-gold text-ink font-mono font-bold text-[10px] shadow">
                  Lifting on One Finger
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-display font-bold text-gold text-xl">Weightless Mastery!</p>
                <p className="text-xs text-cream/90 max-w-xs">
                  Pinnacle AI organizes every book into structured progression levels. Learning becomes intuitive, personal, and effortless.
                </p>
              </div>
              <div className="flex gap-2 text-[11px] font-mono text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                <span>✨ 1:1 Guided Ascent</span>
                <span>•</span>
                <span>🎯 Structured Progression</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Narrative Copy & Actions */}
        <div className="md:col-span-6 space-y-5 text-left">
          {act === 1 && (
            <div className="space-y-3">
              <div className="eyebrow-dim">Act I · The Struggle</div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-cream">
                "My backpack was heavy, but the mental pressure was heavier."
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Stacking NCERT next to RD Sharma, HC Verma, and Cengage... every student starts with a mountain of unorganized books, wondering how anyone survives the syllabus.
              </p>
            </div>
          )}

          {act === 2 && (
            <div className="space-y-3">
              <div className="eyebrow-dim">Act II · The Overwhelm</div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-coral">
                "Too many books. No clear path."
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                When you don't know whether to solve NCERT exercises or jump straight into advanced PYQs, anxiety takes over. Memorization replaces true understanding.
              </p>
            </div>
          )}

          {act === 3 && (
            <div className="space-y-3">
              <div className="eyebrow-gold">Act III · The Pinnacle Effect</div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-cream">
                "Then Pinnacle AI turned mountains into steps."
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Level 1 Core → Level 2 Standard → Level 3 Advanced. Pinnacle AI structures every question from verified sources and guides you step-by-step.
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/login" className="btn-gold pnz-glow">
              <span>Experience Pinnacle AI</span>
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => setAct((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)))}
              className="btn-ghost !px-3 !py-2 text-xs"
            >
              <span>Next Act ({act}/3)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
