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
  {
    id: "q-c9-maths-03-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-03",
    classLevel: 9,
    text: "Plot the points P(3, 2), Q(−3, 2), R(−3, −2) and S(3, −2) on a graph. Name the figure PQRS and find its area.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Plotting: P(3, 2) lies in Quadrant I, Q(−3, 2) in Quadrant II, R(−3, −2) in Quadrant III, S(3, −2) in Quadrant IV.\n\nPQ is the horizontal segment from x = −3 to x = 3 at y = 2, so PQ = 6 units.\nQR is the vertical segment from y = 2 to y = −2 at x = −3, so QR = 4 units.\n\nAll angles are right angles and opposite sides are equal, so PQRS is a rectangle.\nArea = PQ × QR = 6 × 4 = 24 square units.",
    keywords: [
      "one point plotted correctly in each quadrant",
      "PQ = 6 units, QR = 4 units",
      "figure PQRS is a rectangle",
      "area = 6 × 4 = 24 square units",
    ],
    examinerTip:
      "Read side lengths directly off the axes (difference of x-coordinates or y-coordinates) — there is no need for the distance formula, which isn't part of this chapter.",
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
  {
    id: "q-c9-maths-04-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-04",
    classLevel: 9,
    text: "If (2, 0) is a solution of the equation 2x + 3y = k, find the value of k.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Since (2, 0) is a solution, it must satisfy 2x + 3y = k.\nSubstitute x = 2, y = 0:\n2(2) + 3(0) = k\n4 + 0 = k\n⇒ k = 4.",
    keywords: [
      "substitute x = 2, y = 0 into 2x + 3y = k",
      "4 + 0 = k",
      "k = 4",
    ],
  },

  // ── CH 5 · INTRODUCTION TO EUCLID'S GEOMETRY ──
  {
    id: "q-c9-maths-05-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-05",
    classLevel: 9,
    text: "State any two of Euclid's postulates and use one of Euclid's axioms to show that 'the whole is greater than the part'.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Two of Euclid's postulates:\n1. A straight line may be drawn from any one point to any other point.\n2. A terminated line (line segment) can be produced indefinitely.\n\nTo show 'the whole is greater than the part':\nLet AB be a line segment and let C be a point on AB between A and B.\nThen AC is a part of AB, and AB = AC + CB.\nSince CB is a magnitude greater than zero, AB is greater than AC.\nThis is Euclid's fifth common notion (axiom): the whole is greater than the part.",
    keywords: [
      "state two postulates correctly (in Euclid's words)",
      "AB = AC + CB for C between A and B",
      "CB > 0 so AB > AC",
      "identify this as Euclid's axiom 'the whole is greater than the part'",
    ],
    examinerTip:
      "Postulates and axioms (common notions) are different lists — mixing them up loses the identification mark even if the statement itself is correct.",
  },
  {
    id: "q-c9-maths-05-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-05",
    classLevel: 9,
    text: "Euclid's fifth postulate implies the existence of parallel lines. State the equivalent version of the fifth postulate given by Playfair.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Playfair's axiom (equivalent to Euclid's fifth postulate): For every line l and for every point P not lying on l, there exists a unique line m passing through P and parallel to l.\n\nThis equivalent version is the one commonly used to define parallel lines in school geometry.",
    keywords: [
      "for a line l and a point P not on l",
      "there exists a unique line m through P parallel to l",
      "this is Playfair's axiom, equivalent to the fifth postulate",
    ],
    examinerTip:
      "The word 'unique' is the key term — stating merely that a parallel line exists, without uniqueness, does not earn full marks.",
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
  {
    id: "q-c9-maths-06-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-06",
    classLevel: 9,
    text: "Two supplementary angles are in the ratio 4 : 5. Find the two angles.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Let the angles be 4x and 5x.\nSince they are supplementary, 4x + 5x = 180°.\n9x = 180°\n⇒ x = 20°.\n\nSo the angles are 4x = 80° and 5x = 100°.",
    keywords: [
      "let angles be 4x and 5x",
      "4x + 5x = 180°",
      "x = 20°",
      "angles are 80° and 100°",
    ],
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
  {
    id: "q-c9-maths-07-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-07",
    classLevel: 9,
    text: "ABC is an isosceles triangle with AB = AC. The bisectors of ∠B and ∠C intersect each other at O. Show that BO = CO.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Given: AB = AC, and BO, CO bisect ∠B and ∠C respectively.\nTo prove: BO = CO.\n\nSince AB = AC, the angles opposite them are equal: ∠B = ∠C (angles opposite equal sides).\n\nSince BO bisects ∠B, ∠OBC = ½∠B.\nSince CO bisects ∠C, ∠OCB = ½∠C.\nAs ∠B = ∠C, it follows that ∠OBC = ∠OCB.\n\nIn △OBC, since ∠OBC = ∠OCB, the sides opposite these equal angles are equal:\n∴ OC = OB, i.e. BO = CO.",
    keywords: [
      "∠B = ∠C since AB = AC (angles opposite equal sides)",
      "∠OBC = ½∠B and ∠OCB = ½∠C",
      "∠OBC = ∠OCB",
      "BO = CO (sides opposite equal angles in △OBC)",
    ],
    examinerTip:
      "The final step uses the converse of the isosceles triangle theorem (equal angles ⇒ equal sides) — name it, don't just assert BO = CO.",
  },

  // ── CH 8 · QUADRILATERALS ──
  {
    id: "q-c9-maths-08-1",
    subjectId: "c9-maths",
    chapterId: "c9-maths-08",
    classLevel: 9,
    text: "Prove that the diagonal of a parallelogram divides it into two congruent triangles.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Given: Parallelogram ABCD with diagonal AC.\nTo prove: △ABC ≅ △CDA.\n\nSince AB ∥ DC and AC is a transversal, ∠BAC = ∠DCA (alternate angles) … (i)\nSince BC ∥ AD and AC is a transversal, ∠BCA = ∠DAC (alternate angles) … (ii)\nAC = AC (common)\n\nFrom (i), (ii) and the common side, △ABC ≅ △CDA (ASA).\nHence the diagonal divides the parallelogram into two congruent triangles.",
    keywords: [
      "∠BAC = ∠DCA (alternate angles, AB ∥ DC)",
      "∠BCA = ∠DAC (alternate angles, BC ∥ AD)",
      "AC common",
      "△ABC ≅ △CDA by ASA",
    ],
    examinerTip:
      "Name which pair of sides is parallel before quoting the alternate-angle property — the examiner wants the reason attached to each angle equality, not just the ASA conclusion.",
  },
  {
    id: "q-c9-maths-08-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-08",
    classLevel: 9,
    text: "In a triangle ABC, D and E are the mid-points of sides AB and AC respectively. Using the Mid-point Theorem, show that DE ∥ BC and DE = ½ BC.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Given: D and E are mid-points of AB and AC.\nTo prove: DE ∥ BC and DE = ½ BC.\n\nProduce DE to F such that DE = EF, and join CF.\nIn △AED and △CEF: AE = CE (E is mid-point of AC), ∠AED = ∠CEF (vertically opposite), DE = EF (construction).\n∴ △AED ≅ △CEF (SAS), so CF = AD and ∠ADE = ∠CFE.\n\nSince AD = DB (D is mid-point of AB) and CF = AD, we get CF = DB.\nAlso ∠ADE = ∠CFE makes AB ∥ CF (equal alternate angles), so DB ∥ CF.\nSince DB = CF and DB ∥ CF, DBCF is a parallelogram, so DF ∥ BC and DF = BC.\n\nSince DE = ½ DF, DE ∥ BC and DE = ½ BC.\nThis is the Mid-point Theorem.",
    keywords: [
      "construction: produce DE to F with DE = EF, join CF",
      "△AED ≅ △CEF by SAS",
      "DBCF is a parallelogram since DB = CF and DB ∥ CF",
      "DE ∥ BC and DE = ½ BC",
    ],
    examinerTip:
      "This proof needs the construction line — attempting it without extending DE to F leaves no way to build the parallelogram, and most students lose marks here for skipping that step.",
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
  {
    id: "q-c9-maths-09-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-09",
    classLevel: 9,
    text: "Prove that equal chords of a circle are equidistant from the centre.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Given: A circle with centre O, and chords AB = CD. OM ⊥ AB at M and ON ⊥ CD at N.\nTo prove: OM = ON.\n\nThe perpendicular from the centre to a chord bisects the chord, so:\nAM = AB/2 and CN = CD/2.\nSince AB = CD, AM = CN.\n\nIn right triangles OMA and ONC:\nOA = OC (radii of the same circle)\nAM = CN (shown above)\n∠OMA = ∠ONC = 90°\n∴ △OMA ≅ △ONC (RHS)\n\nBy CPCT, OM = ON.\nHence equal chords are equidistant from the centre.",
    keywords: [
      "perpendicular from centre bisects the chord: AM = AB/2, CN = CD/2",
      "AB = CD ⇒ AM = CN",
      "△OMA ≅ △ONC by RHS (OA = OC, AM = CN, right angle)",
      "OM = ON by CPCT",
    ],
    examinerTip:
      "State the 'perpendicular from the centre bisects the chord' property explicitly before using AM = CN — it is a separate mark from the RHS congruence.",
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
  {
    id: "q-c9-maths-10-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-10",
    classLevel: 9,
    text: "Find the area of a triangle whose sides are 13 cm, 14 cm and 15 cm using Heron's formula.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Sides a = 13, b = 14, c = 15.\nSemi-perimeter s = (13 + 14 + 15)/2 = 42/2 = 21 cm.\n\nHeron's formula: Area = √[s(s − a)(s − b)(s − c)]\n= √[21 × (21 − 13) × (21 − 14) × (21 − 15)]\n= √[21 × 8 × 7 × 6]\n= √7056\n= 84 cm².",
    keywords: [
      "s = 21 cm",
      "Area = √[s(s − a)(s − b)(s − c)]",
      "√[21 × 8 × 7 × 6]",
      "84 cm²",
    ],
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
  {
    id: "q-c9-maths-11-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-11",
    classLevel: 9,
    text: "A cone has radius 7 cm and slant height 25 cm. Find its curved surface area and volume. (Take π = 22/7.)",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Curved surface area = πrl = (22/7) × 7 × 25 = 22 × 25 = 550 cm².\n\nHeight h = √(l² − r²) = √(25² − 7²) = √(625 − 49) = √576 = 24 cm.\n\nVolume = (1/3)πr²h = (1/3) × (22/7) × 7² × 24 = (1/3) × 22 × 7 × 24 = (1/3) × 3696 = 1232 cm³.",
    keywords: [
      "CSA = πrl = 550 cm²",
      "h = √(l² − r²) = 24 cm",
      "Volume = (1/3)πr²h",
      "Volume = 1232 cm³",
    ],
    examinerTip:
      "The slant height is not the height — find h from l² = r² + h² before using the volume formula, which needs h, not l.",
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
  {
    id: "q-c9-maths-12-2",
    subjectId: "c9-maths",
    chapterId: "c9-maths-12",
    classLevel: 9,
    text: "Find the median of the data: 24, 36, 46, 17, 18, 25, 35.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Arrange the data in ascending order:\n17, 18, 24, 25, 35, 36, 46.\n\nNumber of observations n = 7 (odd), so the median is the value of the ((n + 1)/2)th term = 4th term.\n\nThe 4th term is 25.\n∴ Median = 25.",
    keywords: [
      "arrange data in ascending order",
      "n = 7 is odd, median is the ((n+1)/2)th term",
      "4th term = 25",
      "median = 25",
    ],
    examinerTip:
      "Forgetting to sort the data first is the most common error — the median formula only works on ordered data.",
  },
];
