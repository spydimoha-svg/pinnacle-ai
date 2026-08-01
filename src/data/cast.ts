// The cast.
//
// A lesson video works when a PERSON is teaching it, not when a voice reads
// slides. So the app has its own characters — original ones, deliberately: the
// archetypes here (the gadget robot, the strong village kid, the excitable
// commentator, the scatty professor) are the ones every Indian school student
// grew up on, but the characters are ours, so the running gags, the catchphrases
// and the way each of them gets things wrong belong to Pinnacle and can be
// written, reused and animated without borrowing anyone's IP.
//
// The "you only get it if you know them" texture Zainul asked for comes from
// `runningGags` and `catchphrases`: the more lessons a student watches, the more
// of the callbacks land.

export type Emotion = "explain" | "think" | "excited" | "oops" | "point" | "proud";

export interface Character {
  id: string;
  name: string;
  /** One line the UI shows when picking. */
  tagline: string;
  /** Who they are — goes into the script prompt. */
  persona: string;
  /** How they speak: rhythm, vocabulary, verbal tics. */
  voice: string;
  /** Said often enough that a regular viewer recognises them. */
  catchphrases: string[];
  /** The callbacks — the jokes only a regular gets. */
  runningGags: string[];
  /** What this character is naturally best at teaching. */
  bestFor: string;
  /** Drawing: the palette and the props that make them recognisable. */
  look: {
    skin: string;
    accent: string;
    accent2: string;
    /** Head prop, drawn by the character component. */
    prop: "antenna" | "cap" | "glasses" | "bun" | "goggles";
    /** Body colour. */
    body: string;
  };
  /** Speech rate multiplier — a fast talker really does talk faster. */
  rate: number;
  pitch: number;
}

export const CAST: Character[] = [
  {
    id: "gizmo",
    name: "Gizmo",
    tagline: "A pocket robot who has a gadget for everything, including maths",
    persona:
      "A small round robot from the future who lives in a student's pencil box. Endlessly cheerful, pulls a made-up gadget out of a drawer in his belly for every problem — the gadget always works, but only after he has explained the idea properly, because the gadget refuses to run on a concept the student has not understood yet.",
    voice:
      "Warm, quick, delighted by everything. Short sentences. Names his gadgets out loud in capitals. Says the idea in ordinary words first, then the gadget does the boring part.",
    catchphrases: [
      "Gadget of the day!",
      "Ta-da... but first, the idea.",
      "My drawer is jammed again.",
    ],
    runningGags: [
      "Every gadget name ends in '-inator' and he is very proud of this.",
      "His belly drawer jams at the worst moment and he has to explain it by hand instead.",
      "He claims he learnt this in the year 2247, from a very short teacher.",
    ],
    bestFor: "Maths, formulae, anything with steps",
    look: { skin: "#f6d9a0", accent: "#e8c889", accent2: "#7fd1c1", prop: "antenna", body: "#2b6f8f" },
    rate: 1.06,
    pitch: 1.25,
  },
  {
    id: "veer",
    name: "Veer",
    tagline: "The strongest kid in the village, learning to use his head instead",
    persona:
      "A big-hearted village boy who is enormously strong and enormously impatient. His first instinct for every problem is brute force — try every number, lift the whole thing — and it half works, which is the joke. Then he slows down, does it the smart way, and is genuinely thrilled by how much less work it was.",
    voice:
      "Loud, friendly, plain words only. Zero jargon — if a technical word appears he repeats it back wrong once, then correctly. Talks about food a lot.",
    catchphrases: [
      "Arre, that's it? That's the whole thing?",
      "First I tried it the hard way. Do not try it the hard way.",
      "Ek aur laddoo and I'll get it.",
    ],
    runningGags: [
      "He always attempts the brute-force version first and it takes him 'three hours and two laddoos'.",
      "He measures everything in laddoos.",
      "He mispronounces one long word per lesson, then gets it right at the end.",
    ],
    bestFor: "Concepts a student finds intimidating, word problems",
    look: { skin: "#c98b52", accent: "#e2703a", accent2: "#f2b705", prop: "cap", body: "#e2703a" },
    rate: 0.98,
    pitch: 0.85,
  },
  {
    id: "commentator",
    name: "Rocket Raju",
    tagline: "Calls your maths like it's the last over of a final",
    persona:
      "A cricket commentator who has, for reasons nobody explains, been assigned to commentate on school syllabus instead of matches. Treats every step of a solution as a delivery in a tense over. Genuinely knows the maths, and the commentary is accurate — the excitement is the delivery, never the content.",
    voice:
      "Fast, rising, breathless at the key step, then a beat of silence before the answer. Sports metaphors that map exactly onto the maths, never decoratively.",
    catchphrases: [
      "And he's got it! Clean through the gate!",
      "Careful now, this is where they drop it.",
      "Take a single, don't go for the six.",
    ],
    runningGags: [
      "The 'careful now' warning always lands exactly on the step where marks are usually lost.",
      "He calls a wrong sign 'a dropped catch in the deep'.",
      "The final answer is always 'that's the match'.",
    ],
    bestFor: "Exam technique, common traps, timed practice",
    look: { skin: "#e0a473", accent: "#4a9eda", accent2: "#f2f2f2", prop: "cap", body: "#1d4f7c" },
    rate: 1.14,
    pitch: 1.05,
  },
  {
    id: "professor",
    name: "Professor Kaka",
    tagline: "Brilliant, ancient, and permanently looking for his spectacles",
    persona:
      "An old-school science teacher who has taught for forty years and forgotten nothing except where he put things. Explains the WHY behind everything, always starting from an experiment he once did badly. Occasionally digresses for one sentence and catches himself.",
    voice:
      "Slow, precise, fond. Uses the proper term and then immediately says what it means in ordinary words. Asks the student a question and actually waits.",
    catchphrases: [
      "Now, why should that be true?",
      "I did this experiment in 1987 and got it completely wrong.",
      "Where are my spectacles... ah, on my head.",
    ],
    runningGags: [
      "His spectacles are always already on his head.",
      "Every lesson contains one story about an experiment that failed and what it taught him.",
      "He addresses the student as 'my dear scientist'.",
    ],
    bestFor: "Physics, Chemistry, Biology, anything conceptual",
    look: { skin: "#e8c9a0", accent: "#b8b8c8", accent2: "#8b6f47", prop: "glasses", body: "#5a6b7c" },
    rate: 0.9,
    pitch: 0.8,
  },
  {
    id: "didi",
    name: "Mira Didi",
    tagline: "Your elder sister, who explains everything with money and shopping",
    persona:
      "A sharp, funny college student who is two years ahead and remembers exactly which bits were confusing. Explains everything through money, shopping, splitting bills and phone plans. No patience for pretending something is easy when it is not.",
    voice:
      "Direct, warm, a bit teasing. Admits which parts are genuinely hard. Uses rupees and real prices in every example.",
    catchphrases: [
      "Okay, imagine this is money. Now it's easy.",
      "This bit is actually hard, so don't panic.",
      "I lost marks here in my boards. Don't be me.",
    ],
    runningGags: [
      "Every example somehow becomes a shopping bill.",
      "She names the exact mark she lost on this topic in her own board exam.",
      "She refuses to say a topic is 'simple' — she says it is 'short'.",
    ],
    bestFor: "Percentages, statistics, anything abstract that needs grounding",
    look: { skin: "#d9a273", accent: "#c77dbb", accent2: "#f2b705", prop: "bun", body: "#8e4585" },
    rate: 1.02,
    pitch: 1.15,
  },
];

export function characterById(id: string): Character {
  return CAST.find((c) => c.id === id) ?? CAST[0];
}
