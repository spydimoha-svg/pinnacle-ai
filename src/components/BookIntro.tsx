import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sigma, Atom, FlaskConical, Globe2, PenTool, Compass } from "lucide-react";
import { LogoMark } from "./Logo";

// The signature entry moment. Only a book floats in the dark. You CLICK it; it
// settles onto an unseen surface, opens, its pages flip in a loop, and formulas,
// symbols and the name stream out and line up. On-brand: Pinnacle teaches from
// the real book.

// symbols + short formulas that burst out of the opened book
const BURST = [
  { t: "∑", x: -280, y: -150, d: 0.0, c: "#F0C766", s: 40 },
  { t: "π", x: 260, y: -180, d: 0.05, c: "#4DD0E1", s: 34 },
  { t: "√2", x: -330, y: 30, d: 0.1, c: "#7C5CFF", s: 30 },
  { t: "∫", x: 320, y: -30, d: 0.15, c: "#F0C766", s: 40 },
  { t: "E=mc²", x: -240, y: 165, d: 0.2, c: "#4DD0E1", s: 24 },
  { t: "H₂O", x: 250, y: 170, d: 0.25, c: "#7C5CFF", s: 26 },
  { t: "a²+b²", x: -140, y: -240, d: 0.3, c: "#F0C766", s: 24 },
  { t: "sinθ", x: 150, y: 235, d: 0.35, c: "#4DD0E1", s: 24 },
  { t: "∞", x: 360, y: 90, d: 0.4, c: "#F0C766", s: 34 },
  { t: "Δ", x: -360, y: -50, d: 0.45, c: "#7C5CFF", s: 32 },
];

const ICON_BURST = [
  { Icon: Sigma, x: -190, y: -90, d: 0.08, c: "#F0C766" },
  { Icon: Atom, x: 180, y: -100, d: 0.16, c: "#4DD0E1" },
  { Icon: FlaskConical, x: -210, y: 90, d: 0.24, c: "#7C5CFF" },
  { Icon: Globe2, x: 210, y: 80, d: 0.32, c: "#4DD0E1" },
  { Icon: PenTool, x: -80, y: 175, d: 0.4, c: "#F0C766" },
  { Icon: Compass, x: 90, y: -180, d: 0.48, c: "#7C5CFF" },
];

const TITLE = "PINNACLE AI";

export function BookIntro({ onDone }: { onDone: () => void }) {
  // idle -> opening -> burst -> exit
  const [phase, setPhase] = useState<"idle" | "opening" | "burst" | "exit">(
    "idle"
  );

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) onDone();
  }, [onDone]);

  function open() {
    if (phase !== "idle") return;
    setPhase("opening");
    window.setTimeout(() => setPhase("burst"), 950);
    window.setTimeout(() => setPhase("exit"), 3600);
    window.setTimeout(() => onDone(), 4400);
  }

  const opened = phase === "burst" || phase === "opening";
  const bursting = phase === "burst";

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(130% 100% at 50% 35%, #12142400 0%, #0a0b14 45%, #050509 100%), #060710",
      }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      <Stars />

      <button
        onClick={onDone}
        className="absolute top-6 right-6 z-20 font-mono text-xs tracking-widest uppercase text-white/35 hover:text-white/80 transition"
      >
        Skip
      </button>

      {/* growing halo of light from inside the book */}
      <motion.div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 620,
          height: 620,
          background:
            "radial-gradient(circle, rgba(240,199,102,0.4) 0%, rgba(124,92,255,0.14) 42%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={{
          scale: bursting ? 1.25 : opened ? 0.75 : 0.34,
          opacity: opened ? 1 : 0.15,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* THE BOOK */}
      <motion.div
        role="button"
        aria-label="Open the book to enter"
        tabIndex={0}
        onClick={open}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
        style={{ perspective: 1800, cursor: phase === "idle" ? "pointer" : "default" }}
        initial={{ y: 120, opacity: 0, scale: 0.8 }}
        animate={{
          y: opened ? 8 : 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {/* gentle idle breathing */}
        <motion.div
          animate={
            phase === "idle"
              ? { y: [0, -10, 0], rotateZ: [-0.6, 0.6, -0.6] }
              : { y: 0, rotateZ: 0 }
          }
          transition={{ duration: 4, repeat: phase === "idle" ? Infinity : 0, ease: "easeInOut" }}
        >
          <div
            style={{
              position: "relative",
              width: 300,
              height: 380,
              transformStyle: "preserve-3d",
              transform: "rotateX(10deg)",
            }}
          >
            {/* inner pages */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 10,
                background: "linear-gradient(180deg,#f7f3e7,#e6dcc2)",
                boxShadow: "inset 0 0 40px rgba(120,90,20,0.18)",
                overflow: "hidden",
              }}
            >
              <FlipPages active={bursting} />
            </div>

            {/* spine */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 18,
                background: "linear-gradient(90deg, rgba(0,0,0,0.55), transparent)",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />

            {/* front cover hinged on left */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 10,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                background:
                  "linear-gradient(140deg,#1c1e2b 0%,#0f1017 55%,#171722 100%)",
                border: "1px solid rgba(240,199,102,0.4)",
                boxShadow:
                  "0 40px 80px -24px rgba(0,0,0,0.85), inset 0 0 50px rgba(240,199,102,0.06)",
                display: "grid",
                placeItems: "center",
              }}
              animate={{ rotateY: opened ? -162 : 0 }}
              transition={{ duration: 1.15, ease: [0.4, 0, 0.2, 1] }}
            >
              <div style={{ textAlign: "center", backfaceVisibility: "hidden" }}>
                <LogoMark size={86} />
                <div
                  style={{
                    marginTop: 18,
                    fontFamily: '"Spline Sans Mono", monospace',
                    fontSize: 12,
                    letterSpacing: "0.4em",
                    color: "rgba(240,199,102,0.85)",
                    textTransform: "uppercase",
                  }}
                >
                  Pinnacle
                </div>
              </div>
            </motion.div>

            {/* soft shadow on the invisible surface (appears once opened) */}
            <motion.div
              aria-hidden
              style={{
                position: "absolute",
                left: "50%",
                bottom: -60,
                width: 340,
                height: 90,
                transform: "translateX(-50%)",
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.55), transparent 70%)",
                filter: "blur(10px)",
              }}
              animate={{ opacity: opened ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* click hint (idle only) */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            className="absolute bottom-[18%] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="font-mono text-xs uppercase"
              style={{ letterSpacing: "0.45em", color: "rgba(240,199,102,0.8)" }}
            >
              Click the book to begin
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* bursting symbols */}
      {BURST.map((b, i) => (
        <motion.span
          key={`f${i}`}
          className="absolute pointer-events-none font-display"
          style={{
            color: b.c,
            fontSize: b.s,
            textShadow: `0 0 18px ${b.c}`,
            fontWeight: 600,
          }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={
            bursting
              ? { x: b.x, y: b.y, scale: 1, opacity: [0, 1, 1, 0.85] }
              : { x: 0, y: 0, scale: 0, opacity: 0 }
          }
          transition={{ duration: 1.5, delay: b.d, ease: "easeOut" }}
        >
          {b.t}
        </motion.span>
      ))}

      {/* bursting icon tiles */}
      {ICON_BURST.map(({ Icon, x, y, d, c }, i) => (
        <motion.div
          key={`i${i}`}
          className="absolute pointer-events-none"
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={bursting ? { x, y, scale: 1, opacity: 1 } : { x: 0, y: 0, scale: 0, opacity: 0 }}
          transition={{ duration: 1.4, delay: d, ease: "easeOut" }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              display: "grid",
              placeItems: "center",
              borderRadius: 13,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${c}66`,
              boxShadow: `0 0 26px ${c}55`,
              backdropFilter: "blur(4px)",
            }}
          >
            <Icon size={22} color={c} strokeWidth={1.6} />
          </div>
        </motion.div>
      ))}

      {/* the name lines up */}
      <div className="absolute bottom-[15%] flex flex-col items-center">
        <div className="flex">
          {TITLE.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="font-display font-bold"
              style={{ fontSize: 40, color: "#F5F1E6", letterSpacing: "0.04em" }}
              initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
              animate={
                bursting
                  ? { opacity: ch === " " ? 0 : 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 26, filter: "blur(6px)" }
              }
              transition={{ duration: 0.5, delay: 0.5 + i * 0.06 }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="font-mono uppercase mt-2"
          style={{ fontSize: 11, letterSpacing: "0.4em", color: "rgba(240,199,102,0.75)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: bursting ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          the book that teaches back
        </motion.div>
      </div>
    </motion.div>
  );
}

function FlipPages({ active }: { active: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, perspective: 900 }}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "left center",
            background: "linear-gradient(90deg,#fdfaf1 0%,#efe7d2 100%)",
            borderLeft: "1px solid rgba(180,150,80,0.25)",
            boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
            backfaceVisibility: "hidden",
          }}
          initial={{ rotateY: 0 }}
          animate={active ? { rotateY: [-2, -178] } : { rotateY: 0 }}
          transition={{
            duration: 1,
            delay: 0.3 + i * 0.4,
            repeat: Infinity,
            repeatDelay: 1.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Stars() {
  const dots = Array.from({ length: 60 }, (_, i) => {
    const a = (i * 2654435761) % 1000;
    const b = (i * 40503) % 1000;
    return {
      left: (a / 1000) * 100,
      top: (b / 1000) * 100,
      s: (i % 3) + 1,
      o: 0.2 + (i % 5) * 0.12,
    };
  });
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.s,
            height: d.s,
            background: "#cfd8ff",
            opacity: d.o,
          }}
          animate={{ opacity: [d.o, d.o * 0.3, d.o] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
