import { useEffect, useState } from "react";
import type { Character, Emotion } from "../../data/cast";

/**
 * A drawn, animated cartoon teacher.
 *
 * The point of this component is that a character is ON SCREEN and moving while
 * it teaches — blinking, breathing, mouthing the words, reacting to what it is
 * saying. A voice over a slide is a document being read aloud; a character that
 * looks at you and points at the thing it is talking about is a lesson.
 *
 * Everything is inline SVG driven by React state, so it is a few kilobytes, it
 * needs no assets, no network and no licence, and it animates smoothly on the
 * cheap Android phones most of these students actually use.
 */

const MOUTHS: Record<string, string> = {
  // Closed / rest
  rest: "M -13 8 Q 0 14 13 8",
  // Open shapes, cycled while speaking to read as talking
  a: "M -12 4 Q 0 22 12 4 Q 0 12 -12 4",
  o: "M -8 4 Q 0 20 8 4 Q 0 10 -8 4",
  e: "M -14 6 Q 0 16 14 6 Q 0 10 -14 6",
  smile: "M -14 4 Q 0 18 14 4",
  flat: "M -12 9 L 12 9",
  oops: "M -9 12 Q 0 2 9 12",
};

const TALK_CYCLE = ["a", "e", "o", "rest", "a", "o"];

interface Pose {
  mouth: keyof typeof MOUTHS;
  brow: number;
  /** Arm rotation in degrees. */
  armL: number;
  armR: number;
  headTilt: number;
  eyeScale: number;
}

const POSES: Record<Emotion, Pose> = {
  explain: { mouth: "smile", brow: 0, armL: -12, armR: 26, headTilt: -2, eyeScale: 1 },
  think: { mouth: "flat", brow: -4, armL: -6, armR: 68, headTilt: 7, eyeScale: 0.86 },
  excited: { mouth: "a", brow: -7, armL: -46, armR: 52, headTilt: -5, eyeScale: 1.18 },
  oops: { mouth: "oops", brow: 6, armL: 16, armR: -14, headTilt: 9, eyeScale: 1.05 },
  point: { mouth: "smile", brow: -2, armL: -8, armR: 84, headTilt: -3, eyeScale: 1 },
  proud: { mouth: "smile", brow: -5, armL: -28, armR: 28, headTilt: 0, eyeScale: 1.05 },
};

export function Toon({
  character,
  emotion = "explain",
  talking = false,
  entering = false,
  size = 210,
}: {
  character: Character;
  emotion?: Emotion;
  talking?: boolean;
  /** Play the arrival animation — the character coming out to teach. */
  entering?: boolean;
  size?: number;
}) {
  const pose = POSES[emotion] ?? POSES.explain;
  const [blink, setBlink] = useState(false);
  const [mouthIdx, setMouthIdx] = useState(0);

  // Blinking. Irregular on purpose: a perfectly periodic blink reads as a
  // machine, and the whole illusion rests on it not doing that.
  useEffect(() => {
    let timer: number;
    const schedule = () => {
      timer = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 120);
        schedule();
      }, 1800 + Math.random() * 3200);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, []);

  // Mouth movement, only while the voice is actually speaking.
  useEffect(() => {
    if (!talking) {
      setMouthIdx(0);
      return;
    }
    const id = window.setInterval(() => setMouthIdx((i) => (i + 1) % TALK_CYCLE.length), 135);
    return () => window.clearInterval(id);
  }, [talking]);

  const mouth = talking ? MOUTHS[TALK_CYCLE[mouthIdx]] : MOUTHS[pose.mouth];
  const { look } = character;

  return (
    <svg
      viewBox="-100 -130 200 260"
      width={size}
      height={(size * 260) / 200}
      className={`pnz-toon ${entering ? "pnz-toon-enter" : ""}`}
      role="img"
      aria-label={`${character.name}, ${emotion}`}
    >
      <defs>
        <radialGradient id={`glow-${character.id}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor={look.accent} stopOpacity="0.30" />
          <stop offset="100%" stopColor={look.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* the pool of light they stand in */}
      <ellipse cx="0" cy="112" rx="76" ry="15" fill={`url(#glow-${character.id})`} />

      <g className="pnz-toon-body">
        {/* arms: drawn before the body so the shoulders sit on top */}
        <g transform={`rotate(${pose.armL} -42 22)`} className="pnz-toon-arm">
          <path d="M -42 22 q -18 16 -20 40" stroke={look.body} strokeWidth="13" fill="none" strokeLinecap="round" />
          <circle cx="-62" cy="64" r="9" fill={look.skin} />
        </g>
        <g transform={`rotate(${-pose.armR} 42 22)`} className="pnz-toon-arm">
          <path d="M 42 22 q 18 16 20 40" stroke={look.body} strokeWidth="13" fill="none" strokeLinecap="round" />
          <circle cx="62" cy="64" r="9" fill={look.skin} />
        </g>

        {/* torso */}
        <path d="M -40 18 q 40 -14 80 0 l 8 76 q -48 12 -96 0 z" fill={look.body} />
        <path d="M -14 18 q 14 22 28 0" fill="none" stroke={look.accent2} strokeWidth="4" strokeLinecap="round" />

        {/* head */}
        <g transform={`rotate(${pose.headTilt} 0 -30)`} className="pnz-toon-head">
          <ellipse cx="0" cy="-34" rx="52" ry="48" fill={look.skin} />

          {/* hair / prop */}
          {look.prop === "antenna" && (
            <g className="pnz-toon-antenna">
              <line x1="0" y1="-80" x2="0" y2="-100" stroke={look.accent2} strokeWidth="5" strokeLinecap="round" />
              <circle cx="0" cy="-104" r="8" fill={look.accent} />
            </g>
          )}
          {look.prop === "cap" && (
            <>
              <path d="M -54 -54 q 54 -46 108 0 z" fill={look.accent} />
              <path d="M -54 -54 q -16 2 -22 10 l 76 0 z" fill={look.accent} opacity="0.85" />
            </>
          )}
          {look.prop === "bun" && (
            <>
              <path d="M -54 -46 q 54 -50 108 0 q -54 -22 -108 0 z" fill={look.accent} />
              <circle cx="0" cy="-88" r="17" fill={look.accent} />
            </>
          )}
          {look.prop === "glasses" && (
            <>
              <path d="M -52 -52 q 52 -40 104 0 q -52 -18 -104 0 z" fill={look.accent} />
              {/* spectacles pushed up on the forehead, where they always are */}
              <g stroke={look.accent2} strokeWidth="3.5" fill="none">
                <circle cx="-20" cy="-70" r="13" />
                <circle cx="20" cy="-70" r="13" />
                <line x1="-7" y1="-70" x2="7" y2="-70" />
              </g>
            </>
          )}
          {look.prop === "goggles" && (
            <g stroke={look.accent2} strokeWidth="4" fill="none">
              <rect x="-34" y="-84" width="68" height="20" rx="9" />
            </g>
          )}

          {/* brows */}
          <path
            d={`M -30 ${-50 + pose.brow} q 12 -7 24 0`}
            stroke="#2a2118"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M 6 ${-50 + pose.brow} q 12 -7 24 0`}
            stroke="#2a2118"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* eyes */}
          <g>
            <ellipse cx="-18" cy="-33" rx="11" ry={blink ? 1.2 : 12 * pose.eyeScale} fill="#fdfdfb" />
            <ellipse cx="18" cy="-33" rx="11" ry={blink ? 1.2 : 12 * pose.eyeScale} fill="#fdfdfb" />
            {!blink && (
              <>
                <circle cx="-16" cy="-31" r="5.4" fill="#221c14" />
                <circle cx="20" cy="-31" r="5.4" fill="#221c14" />
                <circle cx="-14" cy="-33" r="1.9" fill="#fff" />
                <circle cx="22" cy="-33" r="1.9" fill="#fff" />
              </>
            )}
          </g>

          {/* mouth */}
          <g transform="translate(0 -8)">
            <path d={mouth} fill={talking ? "#5b2b2b" : "none"} stroke="#3a2418" strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* cheeks */}
          <circle cx="-36" cy="-16" r="7" fill={look.accent} opacity="0.35" />
          <circle cx="36" cy="-16" r="7" fill={look.accent} opacity="0.35" />
        </g>
      </g>
    </svg>
  );
}
