// The question battery the tutor audit fires at the live app.
//
// These are written the way a student actually types — including the sloppy,
// under-specified and trap versions — because that is what the tutor has to
// survive. Each probe declares what a correct answer MUST contain, so the run
// is a pass/fail audit rather than a pile of transcripts nobody reads.

export interface Probe {
  id: string;
  /** What the student types. Several strings = a multi-turn conversation. */
  turns: string[];
  classLevel?: 9 | 10 | 11 | 12;
  /** Why this probe exists — printed in the report next to any failure. */
  why: string;
  expect?: {
    /** A drawn figure is mandatory for this answer. */
    figure?: boolean;
    /** The figure must contain a genuine 90° angle. */
    rightAngle?: boolean;
    /** The figure must be a graph of a function, with a scale. */
    graph?: boolean;
    /** Must refuse honestly rather than invent content. */
    honestRefusal?: boolean;
    /** Words that must appear (case-insensitive) — the real subject matter. */
    mustMention?: string[];
    /** Words that must NOT appear. */
    mustNotMention?: string[];
    /** Cap on length: a tutor answers, it does not lecture. */
    maxWords?: number;
    /** The reply has to hand the student something to do. */
    endsWithQuestion?: boolean;
    /** Each turn must read easier than the one before it. */
    simplifies?: boolean;
    /** A later turn must reuse something the student said earlier. */
    remembers?: string;
  };
}

export const PROBES: Probe[] = [
  // ---------- The teaching flow ----------
  {
    id: "learn-from-scratch",
    turns: ["I want to learn polynomials from scratch."],
    classLevel: 10,
    why: "The headline behaviour: a real teacher finds out what you know before teaching, and does not dump the chapter.",
    expect: {
      maxWords: 260,
      endsWithQuestion: true,
      mustNotMention: ["Exercise 2.3"],
    },
  },
  {
    id: "one-concept-at-a-time",
    turns: ["Teach me the whole trigonometry chapter right now, everything."],
    classLevel: 10,
    why: "Asked for everything at once, a teacher still starts with one idea and checks it landed.",
    expect: { maxWords: 400, endsWithQuestion: true },
  },
  {
    id: "prior-class-link",
    turns: ["I don't get quadratic equations at all. Start me from zero."],
    classLevel: 10,
    why: "Must reach back to the Class 9 foundation (factorising, polynomials) instead of starting mid-air.",
    expect: { endsWithQuestion: true, maxWords: 320 },
  },

  // ---------- Figures: the errors Zainul reported ----------
  {
    id: "trig-right-triangle",
    turns: ["Explain sin, cos and tan to me with a diagram of a right-angled triangle."],
    classLevel: 10,
    why: "The reported bug: asked for a right-angled triangle, the tutor drew an equilateral one.",
    expect: { figure: true, rightAngle: true, mustMention: ["hypotenuse"] },
  },
  {
    id: "pythagoras-345",
    turns: ["Draw a right triangle with sides 3, 4 and 5 and show me why Pythagoras works."],
    classLevel: 10,
    why: "The drawn figure must be in the 3-4-5 ratio it is labelled with, right angle between 3 and 4.",
    expect: { figure: true, rightAngle: true },
  },
  {
    id: "quadratic-graph",
    turns: ["Draw the graph of x^2 - 2x - 8 and show me its zeroes."],
    classLevel: 10,
    why: "The reported bug: a bare line with no scale, no labels and no working behind it.",
    expect: { figure: true, graph: true, mustMention: ["zero"] },
  },
  {
    id: "linear-graph",
    turns: ["Show me the graph of 2x + 3y = 6 and how to plot it."],
    classLevel: 10,
    why: "A plotted line must come with the points it was plotted through.",
    expect: { figure: true },
  },
  {
    id: "shape-not-mermaid",
    turns: ["Draw an isosceles triangle ABC and mark the equal sides."],
    classLevel: 9,
    why: "Shapes must go through the plotter; mermaid cannot draw a triangle and produces boxes.",
    expect: { figure: true, mustNotMention: ["flowchart"] },
  },
  {
    id: "process-diagram",
    turns: ["Explain the water cycle with a diagram."],
    classLevel: 9,
    why: "A process IS a mermaid flowchart — the tutor must pick the right tool, not refuse to draw.",
    expect: { figure: true, mustNotMention: ["imagine a", "I cannot draw", "can't draw"] },
  },
  {
    id: "physics-figure",
    turns: ["Explain how a convex lens forms an image, with a diagram."],
    classLevel: 10,
    why: "Science diagrams are where text art creeps back in.",
    expect: { figure: true, mustNotMention: ["imagine a", "I cannot draw"] },
  },

  // ---------- Grounding and honesty ----------
  {
    id: "real-exercise",
    turns: ["Solve NCERT Exercise 2.2 question 1 of polynomials."],
    classLevel: 10,
    why: "The grounded path: it must solve the real printed problems, not invented ones.",
    expect: { mustMention: ["zero"], mustNotMention: ["arithmetic progression"] },
  },
  {
    id: "fake-exercise",
    turns: ["Solve NCERT Exercise 2.9 question 4 of Class 10 polynomials."],
    classLevel: 10,
    why: "Exercise 2.9 does not exist. Inventing it is the failure mode this app was built to kill.",
    expect: { honestRefusal: true },
  },
  {
    id: "wrong-class-content",
    turns: ["Is the division algorithm for polynomials in my Class 10 board syllabus?"],
    classLevel: 10,
    why: "Rationalised NCERT removed it. A tutor that does not know the current syllabus wastes the student's month.",
    expect: { maxWords: 220 },
  },

  // ---------- Marking discipline ----------
  {
    id: "grade-my-answer",
    turns: [
      "Grade this like a CBSE examiner, 3 marks: 'Sum of zeroes is -b/a and product is c/a because that is the formula.'",
    ],
    classLevel: 10,
    why: "Grading must name what is missing and show the full-marks version, not just award a number.",
    expect: { maxWords: 350 },
  },
  {
    id: "wrong-answer-diagnosis",
    turns: ["I solved x^2 - 5x + 6 and got zeroes 2 and -3. Is that right?"],
    classLevel: 10,
    why: "The zeroes are 2 and 3. A teacher finds the CAUSE of the sign slip, not just the right answer.",
    expect: { mustMention: ["3"], endsWithQuestion: true },
  },

  // ---------- Adaptation: how THIS child understands ----------
  {
    id: "adapts-when-lost",
    turns: [
      "Explain what a zero of a polynomial means.",
      "I didn't understand that at all.",
      "Still confused. Explain it like I'm 10 years old.",
    ],
    classLevel: 10,
    why: "The core ask: when the child does not get it, the words must get simpler each time, not louder.",
    expect: { simplifies: true, maxWords: 300 },
  },
  {
    id: "remembers-the-child",
    turns: [
      "I only understand things when you explain with cricket examples. I hate abstract stuff.",
      "Now explain what an average (mean) is.",
    ],
    classLevel: 9,
    why: "It must remember HOW this child understands and teach the next topic that way.",
    expect: { remembers: "cricket" },
  },
  {
    id: "remembers-across-topics",
    turns: [
      "My name is Aarav and I keep losing marks because I forget units.",
      "Teach me how to find the speed of an object.",
    ],
    classLevel: 9,
    why: "A stated weakness must change the teaching of the very next topic.",
    expect: { remembers: "unit" },
  },
  {
    id: "slow-it-down",
    turns: [
      "Teach me the relationship between zeroes and coefficients.",
      "Too fast. Break it into smaller steps.",
    ],
    classLevel: 10,
    why: "Pace is part of teaching. 'Smaller steps' must actually produce smaller steps.",
    expect: { simplifies: true },
  },

  // ---------- Boundaries ----------
  {
    id: "off-topic",
    turns: ["Who is going to win the next election?"],
    why: "Stays a teacher, redirects kindly, no lecture.",
    expect: { maxWords: 120 },
  },
];

/** A quick smoke subset for iterating without burning the free-tier budget. */
export const SMOKE = new Set([
  "trig-right-triangle",
  "quadratic-graph",
  "learn-from-scratch",
  "adapts-when-lost",
  "fake-exercise",
]);
