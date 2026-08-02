// NCERT Class 10 Mathematics — Chapter 8: Introduction to Trigonometry
// (rationalised syllabus). Verbatim exercises. In the rationalised NCERT this
// chapter keeps three exercises: 8.1 (the six ratios and one-ratio-to-all-others),
// 8.2 (exact values at 0/30/45/60/90 and combined evaluations) and 8.3 (the three
// Pythagorean identities and identity proofs). The old section on trigonometric
// ratios of complementary angles (sin(90-A) = cos A etc.) was deleted in the 2023
// rationalisation and its exercise removed — do not teach it for this chapter.
// Answers are worked and stored here so the tutor's final results are guaranteed
// right; for the "prove that" identity questions the answer field states the
// proved equality and solution sketches the key algebraic step.
import type { NcertChapter } from "./types";

export const C10_MATHS_TRIGONOMETRY: NcertChapter = {
  id: "c10-maths-08",
  classLevel: 10,
  subjectId: "c10-maths",
  chapterNumber: 8,
  title: "Introduction to Trigonometry",
  book: "NCERT Class 10 Mathematics (rationalised)",
  concepts: [
    "In a right triangle, fix one acute angle, say angle A. The side facing A (not touching it) is the side OPPOSITE to A. The remaining side that, with the hypotenuse, forms angle A is the side ADJACENT to A. The hypotenuse is the side facing the right angle and never changes. Which side counts as opposite and which as adjacent depends on which acute angle you choose — they swap if you switch to the other acute angle.",
    "The six trigonometric ratios of acute angle A: sin A = opposite/hypotenuse, cos A = adjacent/hypotenuse, tan A = opposite/adjacent, cosec A = hypotenuse/opposite, sec A = hypotenuse/adjacent, cot A = adjacent/opposite. Each ratio is a pure number — the units cancel.",
    "cosec A, sec A and cot A are exactly the reciprocals of sin A, cos A and tan A respectively: cosec A = 1/sin A, sec A = 1/cos A, cot A = 1/tan A. Also tan A = sin A / cos A and cot A = cos A / sin A.",
    "The values of the trigonometric ratios of an angle depend only on the angle, not on the size of the triangle drawn: a bigger similar triangle scales every side by the same factor, which cancels out of every ratio. So knowing one ratio (e.g. sin A = 8/17) lets you build a triangle with those sides scaled by k, find the third side with the Pythagoras theorem, and read off every other ratio.",
    "Since the hypotenuse is the longest side, sin A and cos A can never exceed 1, while sec A and cosec A are always at least 1. tan A and cot A have no such bound.",
    "Exact trigonometric ratios of 0 degrees, 30 degrees, 45 degrees, 60 degrees and 90 degrees: sin runs 0, 1/2, 1/root2, root3/2, 1 in that order, and cos is the same list reversed. tan = sin/cos, and tan 90 degrees is not defined because cos 90 degrees = 0. cosec, sec and cot are undefined wherever the ratio underneath them is zero (cosec 0, cot 0, sec 90 not defined).",
    "The first trigonometric identity: sin^2 A + cos^2 A = 1 for every A from 0 degrees to 90 degrees. It comes directly from dividing the Pythagoras theorem (AB^2 + BC^2 = AC^2) by AC^2, so it holds for every acute angle without exception.",
    "Dividing the same Pythagoras relation by AB^2 gives 1 + tan^2 A = sec^2 A, true for 0 degrees <= A < 90 degrees (undefined at 90 degrees). Dividing it by BC^2 gives cot^2 A + 1 = cosec^2 A, true for 0 degrees < A <= 90 degrees (undefined at 0 degrees).",
    "To prove a trigonometric identity: work on the more complicated side only, usually by converting every ratio to sin and cos, and simplify it step by step until it matches the other side exactly. Never cross-multiply or square both sides of the identity you are trying to prove — that assumes the result before it is shown.",
  ].join("\n"),
  keyFormulae: [
    "sin A = opp/hyp, cos A = adj/hyp, tan A = opp/adj",
    "cosec A = 1/sin A, sec A = 1/cos A, cot A = 1/tan A, tan A = sin A/cos A",
    "sin 0,30,45,60,90 = 0, 1/2, 1/root2, root3/2, 1 and cos is the same list reversed",
    "sin^2 A + cos^2 A = 1",
    "1 + tan^2 A = sec^2 A (A not 90 degrees)",
    "cot^2 A + 1 = cosec^2 A (A not 0 degrees)",
  ],
  topics: [
    "Sides of a right triangle named from an acute angle (opposite, adjacent, hypotenuse)",
    "The six trigonometric ratios",
    "Reciprocal ratios and tan A = sin A / cos A",
    "Finding all ratios from one given ratio",
    "Trigonometric ratios of 0, 30, 45, 60, 90 degrees",
    "Evaluating expressions using the specific-angle table",
    "The identity sin^2 A + cos^2 A = 1",
    "The identities 1 + tan^2 A = sec^2 A and cot^2 A + 1 = cosec^2 A",
    "Proving trigonometric identities",
  ],
  exercises: [
    {
      exercise: "8.1",
      problems: [
        {
          no: "1",
          statement:
            "In triangle ABC, right-angled at B, AB = 24 cm, BC = 7 cm. Determine: (i) sin A, cos A (ii) sin C, cos C",
          answer:
            "AC = 25 cm. (i) sin A = 7/25, cos A = 24/25. (ii) sin C = 24/25, cos C = 7/25.",
        },
        {
          no: "2",
          statement:
            "In a right triangle PQR, right-angled at Q, with PQ = 12 cm and hypotenuse PR = 13 cm, find tan P - cot R.",
          answer:
            "QR = 5 cm (Pythagoras). tan P = QR/PQ = 5/12 and cot R = QR/PQ = 5/12, so tan P - cot R = 0.",
        },
        {
          no: "3",
          statement: "If sin A = 3/4, calculate cos A and tan A.",
          answer: "cos A = root7 / 4 and tan A = 3/root7.",
        },
        {
          no: "4",
          statement: "Given 15 cot A = 8, find sin A and sec A.",
          answer: "sin A = 15/17 and sec A = 17/8.",
        },
        {
          no: "5",
          statement: "Given sec theta = 13/12, calculate all other trigonometric ratios.",
          answer:
            "sin theta = 5/13, cos theta = 12/13, tan theta = 5/12, cot theta = 12/5, cosec theta = 13/5.",
        },
        {
          no: "6",
          statement:
            "If A and B are acute angles such that cos A = cos B, then show that angle A = angle B.",
          answer:
            "Proved: for right triangles ABC and PQR with cos A = cos B, AB/AC = PQ/PR = k, and by Pythagoras BC/QR also equals k, so AB/PQ = AC/PR = BC/QR; by the SSS similarity criterion the triangles are similar, hence angle A = angle B.",
        },
        {
          no: "7",
          statement:
            "If cot theta = 7/8, evaluate: (i) (1 + sin theta)(1 - sin theta) / [(1 + cos theta)(1 - cos theta)]  (ii) cot^2 theta",
          answer: "Both (i) and (ii) equal 49/64.",
        },
        {
          no: "8",
          statement:
            "If 3 cot A = 4, check whether (1 - tan^2 A)/(1 + tan^2 A) = cos^2 A - sin^2 A or not.",
          answer: "Yes, both sides equal 7/25.",
        },
        {
          no: "9",
          statement:
            "In triangle ABC, right-angled at B, if tan A = 1/root3, find the value of: (i) sin A cos C + cos A sin C  (ii) cos A cos C - sin A sin C",
          answer:
            "tan A = 1/root3 means angle A = 30 degrees, so angle C = 60 degrees (angle B = 90 degrees). (i) sin A cos C + cos A sin C = sin(A+C) = sin 90 degrees = 1. (ii) cos A cos C - sin A sin C = cos(A+C) = cos 90 degrees = 0.",
        },
        {
          no: "10",
          statement:
            "In triangle PQR, right-angled at Q, PR + QR = 25 cm and PQ = 5 cm. Determine the values of sin P, cos P and tan P.",
          answer: "QR = 12 cm, PR = 13 cm. sin P = 12/13, cos P = 5/13, tan P = 12/5.",
        },
        {
          no: "11",
          statement:
            "State whether the following are true or false. Justify your answer. (i) The value of tan A is always less than 1. (ii) sec A = 12/5 for some value of angle A. (iii) cos A is the abbreviation used for the cosecant of angle A. (iv) cot A is the product of cot and A. (v) sin theta = 4/3 for some angle theta.",
          answer:
            "(i) False, e.g. tan 60 degrees = root3 > 1. (ii) True, since 12/5 > 1 and sec A can be any value >= 1. (iii) False, cos A is the abbreviation for cosine of A, not cosecant. (iv) False, cot A is a single symbol for the cotangent ratio, not a product. (v) False, sin theta can never exceed 1.",
        },
      ],
    },
    {
      exercise: "8.2",
      problems: [
        {
          no: "1",
          statement:
            "Evaluate the following: (i) sin 60 degrees cos 30 degrees + sin 30 degrees cos 60 degrees (ii) 2 tan^2 45 degrees + cos^2 30 degrees - sin^2 60 degrees (iii) cos 45 degrees / (sec 30 degrees + cosec 30 degrees) (iv) (sin 30 degrees + tan 45 degrees - cosec 60 degrees) / (sec 30 degrees + cos 60 degrees + cot 45 degrees) (v) (5 cos^2 60 degrees + 4 sec^2 30 degrees - tan^2 45 degrees) / (sin^2 30 degrees + cos^2 30 degrees)",
          answer:
            "(i) 1. (ii) 2. (iii) (3root2 - root6)/8. (iv) (3root3 - 4)/(3root3 + 4). (v) 67/12.",
        },
        {
          no: "2",
          statement:
            "Choose the correct option and justify your choice: (i) 2 tan 30 degrees / (1 + tan^2 30 degrees) = (A) sin 60 degrees (B) cos 60 degrees (C) tan 60 degrees (D) sin 30 degrees. (ii) (1 - tan^2 45 degrees) / (1 + tan^2 45 degrees) = (A) tan 90 degrees (B) 1 (C) sin 45 degrees (D) 0. (iii) sin 2A = 2 sin A is true when A = (A) 0 degrees (B) 30 degrees (C) 45 degrees (D) 60 degrees. (iv) 2 tan 30 degrees / (1 - tan^2 30 degrees) = (A) cos 60 degrees (B) sin 60 degrees (C) tan 60 degrees (D) sin 30 degrees",
          answer:
            "(i) (A) sin 60 degrees. (ii) (D) 0. (iii) (A) 0 degrees. (iv) (C) tan 60 degrees.",
        },
        {
          no: "3",
          statement:
            "If tan(A + B) = root3 and tan(A - B) = 1/root3; 0 degrees < A + B <= 90 degrees; A > B, find A and B.",
          answer: "A = 45 degrees and B = 15 degrees.",
        },
        {
          no: "4",
          statement:
            "State whether the following are true or false. Justify your answer. (i) sin(A + B) = sin A + sin B. (ii) The value of sin theta increases as theta increases. (iii) The value of cos theta increases as theta increases. (iv) sin theta = cos theta for all values of theta. (v) cot A is not defined for A = 0 degrees.",
          answer:
            "(i) False. (ii) True, for 0 degrees to 90 degrees. (iii) False, cos theta decreases as theta increases. (iv) False. (v) True, since cot A = cos A / sin A and sin 0 degrees = 0.",
        },
      ],
    },
    {
      exercise: "8.3",
      problems: [
        {
          no: "1",
          statement: "Express the trigonometric ratios sin A, sec A and tan A in terms of cot A.",
          answer:
            "sin A = 1/root(1 + cot^2 A); sec A = root(1 + cot^2 A)/cot A; tan A = 1/cot A.",
        },
        {
          no: "2",
          statement: "Write all the other trigonometric ratios of angle A in terms of sec A.",
          answer:
            "cos A = 1/sec A; sin A = root(sec^2 A - 1)/sec A; tan A = root(sec^2 A - 1); cot A = 1/root(sec^2 A - 1); cosec A = sec A/root(sec^2 A - 1).",
        },
        {
          no: "3",
          statement:
            "Choose the correct option. Justify your choice. (i) 9 sec^2 A - 9 tan^2 A = (A) 1 (B) 9 (C) 8 (D) 0. (ii) (1 + tan theta + sec theta)(1 + cot theta - cosec theta) = (A) 0 (B) 1 (C) 2 (D) -1. (iii) (sec A + tan A)(1 - sin A) = (A) sec A (B) sin A (C) cosec A (D) cos A. (iv) (1 + tan^2 A)/(1 + cot^2 A) = (A) sec^2 A (B) -1 (C) cot^2 A (D) tan^2 A",
          answer: "(i) (B) 9. (ii) (C) 2. (iii) (D) cos A. (iv) (D) tan^2 A.",
        },
        {
          no: "4",
          statement:
            "Prove the following identities, where the angles involved are acute angles for which the expressions are defined. (i) (cosec theta - cot theta)^2 = (1 - cos theta)/(1 + cos theta) (ii) cos A/(1 + sin A) + (1 + sin A)/cos A = 2 sec A (iii) tan theta/(1 - cot theta) + cot theta/(1 - tan theta) = 1 + sec theta cosec theta (iv) (1 + sec A)/sec A = sin^2 A/(1 - cos A) (v) (cos A - sin A + 1)/(cos A + sin A - 1) = cosec A + cot A, using the identity cosec^2 A = 1 + cot^2 A (vi) root[(1 + sin A)/(1 - sin A)] = sec A + tan A (vii) (sin theta - 2 sin^3 theta)/(2 cos^3 theta - cos theta) = tan theta (viii) (sin A + cosec A)^2 + (cos A + sec A)^2 = 7 + tan^2 A + cot^2 A (ix) 1/[(cosec A - sin A)(sec A - cos A)] = tan A + cot A (x) [(1 + tan^2 A)/(1 + cot^2 A)] = [(1 - tan A)/(1 - cot A)]^2 = tan^2 A",
          answer:
            "All ten are identities and each is proved true for every acute angle in its defined range.",
          solution:
            "(i) cosec theta - cot theta = (1 - cos theta)/sin theta; squaring and using sin^2 theta = (1-cos theta)(1+cos theta) cancels one (1-cos theta) factor, leaving (1-cos theta)/(1+cos theta). (ii) Combine over the common denominator cos A(1+sin A); the numerator cos^2 A + (1+sin A)^2 reduces to 2(1+sin A) using sin^2+cos^2=1, leaving 2/cos A = 2 sec A. (iii) Convert every ratio to sin theta and cos theta and simplify both fractions over a common denominator; it collapses to 1 + sec theta cosec theta. (iv) LHS = 1/sec A + 1 = 1 + cos A; RHS = (1-cos^2 A)/(1-cos A) = 1 + cos A; equal. (v) Divide numerator and denominator by sin A and apply cosec^2 A = 1 + cot^2 A as in the chapter's worked Example 11 pattern. (vi) Multiply inside the root by (1+sin A)/(1+sin A) to get (1+sin A)^2/cos^2 A, then take the square root. (vii) Numerator = sin theta(1 - 2 sin^2 theta); since 1-2sin^2 theta = 2cos^2 theta - 1, it matches the denominator's factor cos theta(2cos^2 theta - 1) after cancelling, leaving tan theta. (viii) Expand both squares; sin^2 A+cos^2 A=1, cosec^2 A=1+cot^2 A, sec^2 A=1+tan^2 A combine to give 7 + tan^2 A + cot^2 A. (ix) cosec A - sin A = cos^2 A/sin A and sec A - cos A = sin^2 A/cos A; their product is sin A cos A, whose reciprocal equals tan A + cot A = (sin^2 A+cos^2 A)/(sin A cos A). (x) (1+tan^2 A)/(1+cot^2 A) = sec^2 A/cosec^2 A = tan^2 A directly; separately (1-tan A)/(1-cot A) simplifies to -tan A, whose square is also tan^2 A.",
        },
      ],
    },
  ],
};
