import type { Question } from "../../lib/types";

// CLASS 9 MATHEMATICS — board-style question bank.
// Chapter ids copied verbatim from src/data/curriculum/class9.ts (c9-maths-01 … c9-maths-12).
// Aligned to the current (rationalised) NCERT Class 9 syllabus. `year` is omitted
// throughout — the stems are verified NCERT/board staples, but a specific year we
// cannot confirm would mislead the student.

export const C9_MATHS_QUESTIONS: Question[] = [
  // ── CH 1 · NUMBER SYSTEMS ──
  {
    id: "q-c9-maths-01-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-01",
    classLevel: 9,
    text: "Rationalise the denominator of 1/(√3 − √2).",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Multiply numerator and denominator by the conjugate (√3 + √2):\n\n1/(√3 − √2) × (√3 + √2)/(√3 + √2)\n= (√3 + √2) / ((√3)² − (√2)²)\n= (√3 + √2) / (3 − 2)\n= √3 + √2.",
    keywords: [
      "multiply by the conjugate (√3 + √2)",
      "use (a − b)(a + b) = a² − b²",
      "denominator becomes 3 − 2 = 1",
      "answer √3 + √2",
    ],
    examinerTip:
      "The mark for 'rationalising' is earned by choosing the conjugate — write that step explicitly before simplifying, don't jump to the answer.",
  },
  {
    id: "q-c9-maths-01-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-01",
    classLevel: 9,
    text: "Find one rational and one irrational number between 1/3 and 1/2.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "A rational number between them is their average:\n(1/3 + 1/2)/2 = (5/6)/2 = 5/12.\n\nAs decimals, 1/3 = 0.333… and 1/2 = 0.5. An irrational number between them is any non-terminating, non-recurring decimal in this range, e.g. 0.4040040004…\n\nSo 5/12 (rational) and 0.4040040004… (irrational) lie between 1/3 and 1/2.",
    keywords: [
      "rational = average (1/3 + 1/2)/2 = 5/12",
      "convert to decimals 0.333… and 0.5",
      "irrational = non-terminating non-recurring, e.g. 0.4040040004…",
    ],
    examinerTip:
      "For the irrational one, the number must be non-terminating AND non-recurring — a value like 0.45 (terminating) or 0.454545… (recurring) is rational and loses the mark.",
  },

  // ── CH 2 · POLYNOMIALS ──
  {
    id: "q-c9-maths-02-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-02",
    classLevel: 9,
    text: "Factorise x³ − 3x² − 9x − 5 using the Factor Theorem.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Let p(x) = x³ − 3x² − 9x − 5.\nCheck x = −1: p(−1) = −1 − 3 + 9 − 5 = 0, so (x + 1) is a factor.\n\nDivide p(x) by (x + 1):\nx³ − 3x² − 9x − 5 = (x + 1)(x² − 4x − 5).\n\nFactorise the quadratic by splitting the middle term (−5x + x):\nx² − 4x − 5 = x² − 5x + x − 5 = x(x − 5) + 1(x − 5) = (x − 5)(x + 1).\n\nTherefore x³ − 3x² − 9x − 5 = (x + 1)²(x − 5).",
    keywords: [
      "p(−1) = 0, so (x + 1) is a factor",
      "divide to get quadratic x² − 4x − 5",
      "split middle term: (x − 5)(x + 1)",
      "final answer (x + 1)²(x − 5)",
    ],
    examinerTip:
      "State the Factor Theorem conclusion in words ('since p(−1) = 0, (x + 1) is a factor') — that sentence carries a mark separate from the arithmetic.",
  },
  {
    id: "q-c9-maths-02-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-02",
    classLevel: 9,
    text: "If x + 1/x = 5, find the value of x² + 1/x² and x³ + 1/x³.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Square both sides:\n(x + 1/x)² = x² + 2 + 1/x² = 25\n⇒ x² + 1/x² = 25 − 2 = 23.\n\nUsing (x + 1/x)³ = x³ + 1/x³ + 3(x + 1/x):\n5³ = x³ + 1/x³ + 3(5)\n125 = x³ + 1/x³ + 15\n⇒ x³ + 1/x³ = 125 − 15 = 110.",
    keywords: [
      "square: x² + 1/x² = 25 − 2 = 23",
      "use (x + 1/x)³ = x³ + 1/x³ + 3(x + 1/x)",
      "x³ + 1/x³ = 125 − 15 = 110",
    ],
    examinerTip:
      "Don't try to find x itself — the identities give the answer directly. Quoting the identity before substituting earns a method mark.",
  },
  {
    id: "q-c9-maths-02-3",
    subjectId: "c9-maths",
    chapterId: "c9-maths-02",
    classLevel: 9,
    text: "Using a suitable identity, evaluate 104 × 96.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Write as (100 + 4)(100 − 4) and use (a + b)(a − b) = a² − b²:\n104 × 96 = 100² − 4² = 10000 − 16 = 9984.",
    keywords: [
      "write 104 × 96 = (100 + 4)(100 − 4)",
      "identity a² − b²",
      "10000 − 16 = 9984",
    ],
  },

  // ── CH 3 · COORDINATE GEOMETRY ──
  {
    id: "q-c9-maths-03-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-03",
    classLevel: 9,
    text: "In which quadrant or on which axis do the points (−3, 5), (2, 0) and (0, −4) lie?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "(−3, 5): x is negative, y is positive → Quadrant II.\n(2, 0): y-coordinate is 0 → lies on the x-axis.\n(0, −4): x-coordinate is 0 → lies on the y-axis.",
    keywords: [
      "(−3, 5) → Quadrant II (−, +)",
      "(2, 0) → on the x-axis (y = 0)",
      "(0, −4) → on the y-axis (x = 0)",
    ],
    examinerTip:
      "A point with a zero coordinate is ON an axis, not in a quadrant — a common slip that loses an easy mark.",
  },

  // ── CH 4 · LINEAR EQUATIONS IN TWO VARIABLES ──
  {
    id: "q-c9-maths-04-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-04",
    classLevel: 9,
    text: "Write 2x + 3y = 6 in the form ax + by + c = 0 and find any two solutions.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "In the form ax + by + c = 0: 2x + 3y − 6 = 0, so a = 2, b = 3, c = −6.\n\nTwo solutions:\nPut x = 0 ⇒ 3y = 6 ⇒ y = 2 → (0, 2).\nPut y = 0 ⇒ 2x = 6 ⇒ x = 3 → (3, 0).",
    keywords: [
      "2x + 3y − 6 = 0 (a = 2, b = 3, c = −6)",
      "x = 0 gives (0, 2)",
      "y = 0 gives (3, 0)",
    ],
  },

  // ── CH 6 · LINES AND ANGLES ──
  {
    id: "q-c9-maths-06-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-06",
    classLevel: 9,
    text: "Prove that if two lines intersect each other, then the vertically opposite angles are equal.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Let two lines AB and CD intersect at O, forming angles ∠AOC, ∠BOD, ∠AOD and ∠BOC.\n\nTo prove: ∠AOC = ∠BOD.\n\nRay OA stands on line CD, so ∠AOC + ∠AOD = 180° (linear pair) … (i)\nRay OD stands on line AB, so ∠AOD + ∠BOD = 180° (linear pair) … (ii)\n\nFrom (i) and (ii): ∠AOC + ∠AOD = ∠AOD + ∠BOD.\nCancelling ∠AOD from both sides: ∠AOC = ∠BOD.\n\nHence the vertically opposite angles are equal.",
    keywords: [
      "linear pair: ∠AOC + ∠AOD = 180°",
      "linear pair: ∠AOD + ∠BOD = 180°",
      "equate and cancel ∠AOD",
      "∠AOC = ∠BOD",
    ],
    examinerTip:
      "Each linear-pair statement is a mark; the final cancellation is the third. Always name the pair of angles you are equating.",
  },

  // ── CH 7 · TRIANGLES ──
  {
    id: "q-c9-maths-07-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-07",
    classLevel: 9,
    text: "Prove that the angles opposite to equal sides of an isosceles triangle are equal.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Given: Triangle ABC with AB = AC.\nTo prove: ∠B = ∠C.\nConstruction: Draw AD, the bisector of ∠A, meeting BC at D.\n\nIn △ABD and △ACD:\nAB = AC (given)\n∠BAD = ∠CAD (AD bisects ∠A)\nAD = AD (common)\n∴ △ABD ≅ △ACD (SAS)\n\nBy CPCT, ∠B = ∠C.\nHence the angles opposite the equal sides are equal.",
    keywords: [
      "construction: bisector AD of ∠A",
      "AB = AC, ∠BAD = ∠CAD, AD common",
      "△ABD ≅ △ACD by SAS",
      "∠B = ∠C by CPCT",
    ],
    examinerTip:
      "Name the congruence rule (SAS) and end with CPCT — examiners award a mark specifically for quoting CPCT, not just 'so the angles are equal'.",
  },

  // ── CH 9 · CIRCLES ──
  {
    id: "q-c9-maths-09-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-09",
    classLevel: 9,
    text: "Prove that equal chords of a circle subtend equal angles at the centre.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Given: A circle with centre O and two equal chords AB = CD.\nTo prove: ∠AOB = ∠COD.\n\nIn △AOB and △COD:\nOA = OC (radii of the same circle)\nOB = OD (radii of the same circle)\nAB = CD (given, equal chords)\n∴ △AOB ≅ △COD (SSS)\n\nBy CPCT, ∠AOB = ∠COD.\nHence equal chords subtend equal angles at the centre.",
    keywords: [
      "OA = OC and OB = OD (radii)",
      "AB = CD (equal chords, given)",
      "△AOB ≅ △COD by SSS",
      "∠AOB = ∠COD by CPCT",
    ],
  },

  // ── CH 10 · HERON'S FORMULA ──
  {
    id: "q-c9-maths-10-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-10",
    classLevel: 9,
    text: "Find the area of a triangle whose sides are 40 cm, 24 cm and 32 cm using Heron's formula.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Sides a = 40, b = 24, c = 32.\nSemi-perimeter s = (40 + 24 + 32)/2 = 96/2 = 48 cm.\n\nHeron's formula: Area = √[s(s − a)(s − b)(s − c)]\n= √[48 × (48 − 40) × (48 − 24) × (48 − 32)]\n= √[48 × 8 × 24 × 16]\n= √147456\n= 384 cm².",
    keywords: [
      "s = 48 cm",
      "Area = √[s(s − a)(s − b)(s − c)]",
      "√[48 × 8 × 24 × 16]",
      "384 cm²",
    ],
    examinerTip:
      "Show the s(s − a)(s − b)(s − c) substitution fully before taking the root — the marks are for the setup, not just the final number.",
  },

  // ── CH 11 · SURFACE AREAS AND VOLUMES ──
  {
    id: "q-c9-maths-11-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-11",
    classLevel: 9,
    text: "A cylinder has radius 7 cm and height 10 cm. Find its curved surface area and volume. (Take π = 22/7.)",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Curved surface area = 2πrh = 2 × (22/7) × 7 × 10 = 2 × 22 × 10 = 440 cm².\n\nVolume = πr²h = (22/7) × 7² × 10 = (22/7) × 49 × 10 = 22 × 7 × 10 = 1540 cm³.",
    keywords: [
      "CSA = 2πrh = 440 cm²",
      "Volume = πr²h = 1540 cm³",
      "correct units (cm² for area, cm³ for volume)",
    ],
    examinerTip:
      "Units are marked: area in cm², volume in cm³. Mixing them up, or dropping them, costs a mark even when the number is right.",
  },

  // ── CH 12 · STATISTICS ──
  {
    id: "q-c9-maths-12-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-12",
    classLevel: 9,
    text: "The mean of the observations 8, 12, x, 20 and 22 is 16. Find the value of x.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Mean = (sum of observations)/(number of observations).\n16 = (8 + 12 + x + 20 + 22)/5\n16 × 5 = 62 + x\n80 = 62 + x\n⇒ x = 18.",
    keywords: [
      "Mean = sum ÷ number of observations",
      "80 = 62 + x",
      "x = 18",
    ],
  },
];
