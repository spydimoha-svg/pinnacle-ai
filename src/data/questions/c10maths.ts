import type { Question } from "../../lib/types";

// CLASS 10 MATHEMATICS — board-style question bank.
// Chapter ids copied verbatim from src/data/curriculum/class10.ts (c10-maths-01 … c10-maths-14).
// Every question is checked against the RATIONALISED NCERT syllabus:
//   - Ch 1: no Euclid's division lemma, no decimal-expansion section.
//   - Ch 3: no cross-multiplication, no equations reducible to linear form (so no
//           boat-and-stream reciprocal problems — those need the deleted method).
//   - Ch 6: Areas of Similar Triangles and Pythagoras Theorem are DELETED — only
//           similarity criteria + BPT are examinable.
//   - Ch 7: area of a triangle by coordinates deleted.
//   - Ch 8: ratios of complementary angles deleted.
//   - Ch 12: frustum and conversion of solids deleted — combinations of solids only.
//   - Ch 13: ogive / cumulative frequency curve deleted.
// `source: "pyq"` marks questions that are genuine, repeatedly-set CBSE board asks.
// `year` is deliberately omitted throughout: the question stems are verified board
// staples, but attaching a specific year we cannot confirm would mislead the student.

export const C10_MATHS_QUESTIONS: Question[] = [
  // ==========================================================================
  // CHAPTER 1 — REAL NUMBERS
  // ==========================================================================
  {
    id: "q-c10-maths-01-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-01",
    classLevel: 10,
    text: "Prove that √5 is irrational.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Let us assume, to the contrary, that √5 is rational.\n\nThen there exist integers a and b (b ≠ 0) such that\n√5 = a/b, where a and b are coprime, i.e. HCF(a, b) = 1.\n\nSo, √5 b = a\nSquaring both sides: 5b² = a²  … (i)\n\n⇒ 5 divides a².\nSince 5 is a prime, by the Fundamental Theorem of Arithmetic, 5 divides a.\nLet a = 5c for some integer c.\n\nSubstituting a = 5c in (i):\n5b² = (5c)² = 25c²\n⇒ b² = 5c²\n⇒ 5 divides b².\nSince 5 is a prime, 5 divides b.\n\nTherefore 5 is a common factor of both a and b.\nBut this contradicts the fact that a and b are coprime (HCF = 1).\n\nThis contradiction has arisen because of our incorrect assumption that √5 is rational.\n\nHence, √5 is irrational.",
    keywords: [
      "let us assume, to the contrary",
      "a and b are coprime / HCF(a, b) = 1",
      "5b² = a², so 5 divides a²",
      "5 is prime, therefore 5 divides a",
      "contradicts that a and b are coprime",
      "hence √5 is irrational",
    ],
    examinerTip:
      "The 'coprime' setup line and the phrase 'since 5 is prime, 5 divides a' each carry a mark — students who jump straight from 5b² = a² to '5 divides a' lose them. Always finish with the contradiction sentence, not just the algebra.",
  },
  {
    id: "q-c10-maths-01-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-01",
    classLevel: 10,
    text: "Given that HCF(306, 657) = 9, find LCM(306, 657).",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "For any two positive integers a and b,\nHCF(a, b) × LCM(a, b) = a × b\n\nSubstituting a = 306, b = 657 and HCF = 9:\n9 × LCM(306, 657) = 306 × 657\n9 × LCM(306, 657) = 201042\n\nLCM(306, 657) = 201042 / 9 = 22338\n\nHence, LCM(306, 657) = 22338.",
    keywords: [
      "HCF × LCM = product of the two numbers",
      "9 × LCM = 306 × 657",
      "306 × 657 = 201042",
      "LCM = 22338",
    ],
    examinerTip:
      "Write the relation HCF × LCM = a × b as a separate step before substituting — it is worth a mark on its own even if the multiplication slips. This identity holds for TWO numbers only; it is not valid for three.",
  },
  {
    id: "q-c10-maths-01-3",
    subjectId: "c10-maths",
    chapterId: "c10-maths-01",
    classLevel: 10,
    text:
      "If two positive integers a and b are written as a = x³y² and b = xy³, where x and y are prime numbers, then HCF(a, b) is:\n(A) xy\n(B) xy²\n(C) x³y³\n(D) x²y²",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (B) xy²\n\nReason: The HCF is the product of the SMALLEST power of each common prime factor.\na = x³y², b = x¹y³\nFor x: smaller power = x¹\nFor y: smaller power = y²\n\nHence HCF(a, b) = xy².\n(For reference, LCM = x³y³, the product of the greatest powers.)",
    keywords: [
      "HCF = product of smallest power of each common prime factor",
      "smallest power of x is x¹",
      "smallest power of y is y²",
      "HCF = xy²",
    ],
    examinerTip:
      "Students reflexively pick option (C) x³y³ — that is the LCM, not the HCF. Fix the rule as: HCF → smallest powers, LCM → greatest powers.",
  },

  // ==========================================================================
  // CHAPTER 2 — POLYNOMIALS
  // ==========================================================================
  {
    id: "q-c10-maths-02-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-02",
    classLevel: 10,
    text:
      "Find the zeroes of the quadratic polynomial x² + 7x + 10 and verify the relationship between the zeroes and the coefficients.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "p(x) = x² + 7x + 10\n\nSplitting the middle term (7 = 5 + 2 and 5 × 2 = 10):\nx² + 5x + 2x + 10 = 0\nx(x + 5) + 2(x + 5) = 0\n(x + 5)(x + 2) = 0\n\nSo the zeroes are x = −5 and x = −2.\nLet α = −5 and β = −2.\n\nVerification: comparing x² + 7x + 10 with ax² + bx + c gives a = 1, b = 7, c = 10.\n\nSum of zeroes = α + β = (−5) + (−2) = −7\n−b/a = −7/1 = −7 ✓\n\nProduct of zeroes = αβ = (−5)(−2) = 10\nc/a = 10/1 = 10 ✓\n\nHence the relationship between the zeroes and the coefficients is verified.",
    keywords: [
      "splitting the middle term",
      "(x + 5)(x + 2) = 0",
      "zeroes are −5 and −2",
      "sum of zeroes = −b/a",
      "product of zeroes = c/a",
    ],
    examinerTip:
      "The verification is separately marked — finding the zeroes alone caps you at 2 of 3. Also, the zeroes of (x + 5)(x + 2) are −5 and −2, NOT 5 and 2; sign flips here are the single commonest error in this chapter.",
  },
  {
    id: "q-c10-maths-02-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-02",
    classLevel: 10,
    text:
      "A quadratic polynomial whose zeroes are 5 and −3 is:\n(A) x² + 2x − 15\n(B) x² − 2x + 15\n(C) x² − 2x − 15\n(D) x² + 2x + 15",
    marks: 1,
    type: "mcq",
    source: "sample",
    answer:
      "Correct option: (C) x² − 2x − 15\n\nReason: Sum of zeroes = 5 + (−3) = 2\nProduct of zeroes = 5 × (−3) = −15\n\nA quadratic polynomial is given by\np(x) = k[x² − (sum of zeroes)x + (product of zeroes)]\np(x) = k[x² − 2x + (−15)]\n\nTaking k = 1: p(x) = x² − 2x − 15.",
    keywords: [
      "sum of zeroes = 2",
      "product of zeroes = −15",
      "x² − (sum)x + (product)",
      "x² − 2x − 15",
    ],
    examinerTip:
      "The minus sign belongs only to the sum term. Writing x² + 2x − 15 (option A) means you forgot the leading minus in the standard form x² − (α + β)x + αβ.",
  },

  // ==========================================================================
  // CHAPTER 3 — PAIR OF LINEAR EQUATIONS IN TWO VARIABLES
  // ==========================================================================
  {
    id: "q-c10-maths-03-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-03",
    classLevel: 10,
    text:
      "The taxi charges in a city consist of a fixed charge together with the charge for the distance covered. For a distance of 10 km, the charge paid is ₹105 and for a journey of 15 km, the charge paid is ₹155. What are the fixed charges and the charge per km? How much does a person have to pay for travelling a distance of 25 km?",
    marks: 5,
    type: "la",
    source: "pyq",
    answer:
      "Let the fixed charge be ₹x and the charge per km be ₹y.\n\nFraming the equations:\nFor 10 km: x + 10y = 105  … (i)\nFor 15 km: x + 15y = 155  … (ii)\n\nSolving by elimination — subtracting (i) from (ii):\n(x + 15y) − (x + 10y) = 155 − 105\n5y = 50\ny = 10\n\nSubstituting y = 10 in (i):\nx + 10(10) = 105\nx + 100 = 105\nx = 5\n\nSo, fixed charge = ₹5 and charge per km = ₹10.\n\nCharge for a journey of 25 km:\n= x + 25y\n= 5 + 25(10)\n= 5 + 250\n= ₹255\n\nHence the fixed charge is ₹5, the charge per km is ₹10, and a person travelling 25 km has to pay ₹255.",
    keywords: [
      "let fixed charge = ₹x and charge per km = ₹y",
      "x + 10y = 105 and x + 15y = 155",
      "elimination method",
      "fixed charge = ₹5, charge per km = ₹10",
      "charge for 25 km = ₹255",
    ],
    examinerTip:
      "Both equations carry marks independently of the solving, so frame and number them before doing any arithmetic. Do not stop at x and y — the last part (25 km) is separately marked, and the answer must carry the ₹ sign.",
  },
  {
    id: "q-c10-maths-03-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-03",
    classLevel: 10,
    text:
      "For which value of k will the following pair of linear equations have no solution?\n3x + y = 1\n(2k − 1)x + (k − 1)y = 2k + 1",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Writing both equations in the standard form ax + by + c = 0:\n3x + y − 1 = 0        ⇒ a₁ = 3, b₁ = 1, c₁ = −1\n(2k − 1)x + (k − 1)y − (2k + 1) = 0  ⇒ a₂ = 2k − 1, b₂ = k − 1, c₂ = −(2k + 1)\n\nFor a pair of linear equations to have NO solution (the lines are parallel):\na₁/a₂ = b₁/b₂ ≠ c₁/c₂\n\nTaking a₁/a₂ = b₁/b₂:\n3/(2k − 1) = 1/(k − 1)\n3(k − 1) = 2k − 1\n3k − 3 = 2k − 1\nk = 2\n\nChecking the condition b₁/b₂ ≠ c₁/c₂ for k = 2:\nb₁/b₂ = 1/(2 − 1) = 1\nc₁/c₂ = (−1)/(−5) = 1/5\nSince 1 ≠ 1/5, the condition is satisfied.\n\nHence, k = 2.",
    keywords: [
      "standard form ax + by + c = 0",
      "no solution ⇒ a₁/a₂ = b₁/b₂ ≠ c₁/c₂",
      "3(k − 1) = 2k − 1",
      "k = 2",
      "verify b₁/b₂ ≠ c₁/c₂",
    ],
    examinerTip:
      "Two marks vanish here for the same two reasons: not shifting the constant across so that c₁ = −1 (not +1), and not checking the ≠ c₁/c₂ part. Solving a₁/a₂ = b₁/b₂ alone only guarantees the lines are parallel OR coincident.",
  },

  // ==========================================================================
  // CHAPTER 4 — QUADRATIC EQUATIONS
  // ==========================================================================
  {
    id: "q-c10-maths-04-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-04",
    classLevel: 10,
    text:
      "A train travels a distance of 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the speed of the train.",
    marks: 5,
    type: "la",
    source: "pyq",
    answer:
      "Let the uniform speed of the train be x km/h, where x > 0.\n\nTime taken at speed x km/h = 360/x hours\nTime taken at speed (x + 5) km/h = 360/(x + 5) hours\n\nAccording to the question, the second journey takes 1 hour less:\n360/x − 360/(x + 5) = 1\n\n360[(x + 5) − x] = x(x + 5)\n360(5) = x² + 5x\n1800 = x² + 5x\nx² + 5x − 1800 = 0\n\nSolving by splitting the middle term (45 × (−40) = −1800 and 45 + (−40) = 5):\nx² + 45x − 40x − 1800 = 0\nx(x + 45) − 40(x + 45) = 0\n(x + 45)(x − 40) = 0\n\nx = −45  or  x = 40\n\nSince the speed of a train cannot be negative, x = −45 is rejected.\n\nHence, the speed of the train is 40 km/h.",
    keywords: [
      "let the speed be x km/h",
      "time = distance / speed, so 360/x − 360/(x + 5) = 1",
      "x² + 5x − 1800 = 0",
      "(x + 45)(x − 40) = 0",
      "speed cannot be negative, so x = −45 is rejected",
      "speed = 40 km/h",
    ],
    examinerTip:
      "Explicitly writing 'speed cannot be negative, so x = −45 is rejected' is itself a marked step — dropping the root silently costs a mark. The final answer must carry the unit km/h.",
  },
  {
    id: "q-c10-maths-04-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-04",
    classLevel: 10,
    text: "Find the value of k for which the quadratic equation 2x² + kx + 3 = 0 has two equal roots.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Comparing 2x² + kx + 3 = 0 with ax² + bx + c = 0:\na = 2, b = k, c = 3\n\nFor two equal (real) roots, the discriminant must be zero:\nD = b² − 4ac = 0\n\nSubstituting:\nk² − 4(2)(3) = 0\nk² − 24 = 0\nk² = 24\nk = ±√24 = ±2√6\n\nHence, k = 2√6 or k = −2√6.",
    keywords: [
      "equal roots ⇒ D = b² − 4ac = 0",
      "k² − 24 = 0",
      "k = ±2√6",
    ],
    examinerTip:
      "Give BOTH values — writing only k = 2√6 halves the mark. Also simplify √24 to 2√6; the marking scheme expects the surd in simplest form.",
  },

  // ==========================================================================
  // CHAPTER 5 — ARITHMETIC PROGRESSIONS
  // ==========================================================================
  {
    id: "q-c10-maths-05-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-05",
    classLevel: 10,
    text:
      "The sum of the 3rd and the 7th terms of an AP is 6 and their product is 8. Find the sum of the first sixteen terms of the AP.",
    marks: 5,
    type: "la",
    source: "pyq",
    answer:
      "Let the first term be a and the common difference be d.\naₙ = a + (n − 1)d\n\nGiven a₃ + a₇ = 6:\n(a + 2d) + (a + 6d) = 6\n2a + 8d = 6\na + 4d = 3\n⇒ a = 3 − 4d  … (i)\n\nGiven a₃ × a₇ = 8:\n(a + 2d)(a + 6d) = 8\n\nUsing (i): a + 2d = (3 − 4d) + 2d = 3 − 2d\n     and  a + 6d = (3 − 4d) + 6d = 3 + 2d\n\nSo (3 − 2d)(3 + 2d) = 8\n9 − 4d² = 8\n4d² = 1\nd² = 1/4\nd = 1/2  or  d = −1/2\n\nCase 1: d = 1/2 ⇒ a = 3 − 4(1/2) = 1\nSₙ = n/2 [2a + (n − 1)d]\nS₁₆ = 16/2 [2(1) + 15(1/2)]\n   = 8 [2 + 7.5]\n   = 8 × 9.5 = 76\n\nCase 2: d = −1/2 ⇒ a = 3 − 4(−1/2) = 5\nS₁₆ = 16/2 [2(5) + 15(−1/2)]\n   = 8 [10 − 7.5]\n   = 8 × 2.5 = 20\n\nHence, the sum of the first sixteen terms is 76 or 20.",
    keywords: [
      "aₙ = a + (n − 1)d",
      "2a + 8d = 6, i.e. a + 4d = 3",
      "(3 − 2d)(3 + 2d) = 8 ⇒ d = ±1/2",
      "Sₙ = n/2 [2a + (n − 1)d]",
      "S₁₆ = 76 or 20",
    ],
    examinerTip:
      "d comes out as ±1/2, so there are TWO answers — students who take only the positive d forfeit the final two marks. Note also that here (n − 1)d uses 15, not 16; using n instead of (n − 1) is the classic Sₙ slip.",
  },
  {
    id: "q-c10-maths-05-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-05",
    classLevel: 10,
    text:
      "CASE STUDY: A cricket stadium has 15 rows of seats in one of its stands. The first row has 20 seats, the second row has 22 seats, the third row has 24 seats, and this pattern continues to the last row.\n\nBased on the above information, answer the following:\n(i) Write the AP formed by the number of seats in the rows and state its common difference. (1 mark)\n(ii) How many seats are there in the 10th row? (1 mark)\n(iii) Find the total number of seats in the stand.\n     OR\n     Which row has exactly 40 seats? (2 marks)",
    marks: 4,
    type: "case",
    source: "sample",
    answer:
      "(i) The number of seats row-wise forms the AP: 20, 22, 24, …\nFirst term a = 20\nCommon difference d = 22 − 20 = 2\n\n(ii) aₙ = a + (n − 1)d\na₁₀ = 20 + (10 − 1)(2)\n   = 20 + 18\n   = 38\nHence, the 10th row has 38 seats.\n\n(iii) Sₙ = n/2 [2a + (n − 1)d], with n = 15\nS₁₅ = 15/2 [2(20) + (15 − 1)(2)]\n   = 15/2 [40 + 28]\n   = 15/2 × 68\n   = 15 × 34\n   = 510\nHence, the stand has a total of 510 seats.\n\nOR\n\naₙ = 40\n20 + (n − 1)(2) = 40\n(n − 1)(2) = 20\nn − 1 = 10\nn = 11\nHence, the 11th row has exactly 40 seats.",
    keywords: [
      "AP: 20, 22, 24, … with a = 20 and d = 2",
      "aₙ = a + (n − 1)d",
      "a₁₀ = 38 seats",
      "Sₙ = n/2 [2a + (n − 1)d]",
      "S₁₅ = 510 seats",
      "n = 11 (11th row)",
    ],
    examinerTip:
      "Part (iii) asks for a SUM (Sₙ) while part (ii) asks for a TERM (aₙ) — mixing the two formulas is the standard mark-loser in AP case studies. In the OR alternative, n is a row number, so it must come out as a positive whole number; a fraction means an arithmetic error.",
  },

  // ==========================================================================
  // CHAPTER 6 — TRIANGLES
  // ==========================================================================
  {
    id: "q-c10-maths-06-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-06",
    classLevel: 10,
    text:
      "State and prove the Basic Proportionality Theorem (Thales' Theorem).",
    marks: 5,
    type: "la",
    source: "pyq",
    answer:
      "STATEMENT: If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, then the other two sides are divided in the same ratio.\n\nGIVEN: A triangle ABC in which a line parallel to BC intersects AB at D and AC at E, i.e. DE ∥ BC.\n\nTO PROVE: AD/DB = AE/EC\n\nCONSTRUCTION: Join BE and CD. Draw EM ⊥ AB and DN ⊥ AC.\n\nPROOF:\nar(ADE) = ½ × base × height = ½ × AD × EM\nar(BDE) = ½ × DB × EM\n\nTherefore ar(ADE)/ar(BDE) = (½ × AD × EM)/(½ × DB × EM) = AD/DB  … (i)\n\nSimilarly, taking AC as the base:\nar(ADE) = ½ × AE × DN\nar(DEC) = ½ × EC × DN\n\nTherefore ar(ADE)/ar(DEC) = (½ × AE × DN)/(½ × EC × DN) = AE/EC  … (ii)\n\nNow, ΔBDE and ΔDEC are on the same base DE and between the same parallels DE and BC.\nTriangles on the same base and between the same parallels are equal in area.\nTherefore ar(BDE) = ar(DEC)  … (iii)\n\nFrom (i), (ii) and (iii):\nar(ADE)/ar(BDE) = ar(ADE)/ar(DEC)\n⇒ AD/DB = AE/EC\n\nHence proved.",
    keywords: [
      "line drawn parallel to one side of a triangle divides the other two sides in the same ratio",
      "construction: join BE and CD, draw EM ⊥ AB and DN ⊥ AC",
      "ar(ADE)/ar(BDE) = AD/DB",
      "ar(ADE)/ar(DEC) = AE/EC",
      "ΔBDE and ΔDEC are on the same base DE and between the same parallels",
      "ar(BDE) = ar(DEC)",
    ],
    examinerTip:
      "The Given–To prove–Construction–Proof skeleton is marked in four separate chunks, and the construction (EM ⊥ AB, DN ⊥ AC) plus a labelled figure carry marks on their own. The single most-missed line is 'same base DE and between the same parallels DE and BC' — without it ar(BDE) = ar(DEC) is unjustified and the proof is incomplete.",
  },
  {
    id: "q-c10-maths-06-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-06",
    classLevel: 10,
    text:
      "A vertical pole of length 6 m casts a shadow 4 m long on the ground and at the same time a tower casts a shadow 28 m long. Find the height of the tower.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Let AB be the pole of height 6 m with shadow BC = 4 m, and PQ be the tower of height h m with shadow QR = 28 m.\n\nIn ΔABC and ΔPQR:\n∠B = ∠Q = 90°  (both the pole and the tower are vertical to the ground)\n∠C = ∠R      (the sun's rays fall at the same angle at the same time)\nTherefore ΔABC ~ ΔPQR  (AA similarity criterion)\n\nSince corresponding sides of similar triangles are proportional:\nAB/PQ = BC/QR\n6/h = 4/28\n\n4h = 6 × 28 = 168\nh = 168/4 = 42\n\nHence, the height of the tower is 42 m.",
    keywords: [
      "AA similarity criterion",
      "sun's rays fall at the same angle at the same time",
      "corresponding sides of similar triangles are proportional",
      "6/h = 4/28",
      "height of tower = 42 m",
    ],
    examinerTip:
      "Name the similarity criterion (AA) and justify the equal angle by the sun's rays — a bare proportion with no reason loses the reasoning mark. Keep the ratio consistent: height/height = shadow/shadow, never height/shadow of the same object mixed with the other.",
  },

  // ==========================================================================
  // CHAPTER 7 — COORDINATE GEOMETRY
  // ==========================================================================
  {
    id: "q-c10-maths-07-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-07",
    classLevel: 10,
    text:
      "Find the ratio in which the line segment joining A(1, −5) and B(−4, 5) is divided by the x-axis. Also find the coordinates of the point of division.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Let the x-axis divide the line segment AB in the ratio k : 1 at the point P(x, 0).\n(Any point on the x-axis has y-coordinate = 0.)\n\nBy the section formula, for A(1, −5) and B(−4, 5):\ny = (k·y₂ + 1·y₁)/(k + 1)\n\nSince P lies on the x-axis, y = 0:\n0 = [k(5) + 1(−5)]/(k + 1)\n0 = 5k − 5\n5k = 5\nk = 1\n\nHence the required ratio is k : 1 = 1 : 1.\n\nNow the x-coordinate of P:\nx = (k·x₂ + 1·x₁)/(k + 1)\n  = [1(−4) + 1(1)]/(1 + 1)\n  = (−4 + 1)/2\n  = −3/2\n\nHence, the x-axis divides AB in the ratio 1 : 1 and the point of division is (−3/2, 0).",
    keywords: [
      "let the ratio be k : 1",
      "any point on the x-axis has y = 0",
      "section formula y = (ky₂ + y₁)/(k + 1)",
      "ratio = 1 : 1",
      "point of division = (−3/2, 0)",
    ],
    examinerTip:
      "Set the y-coordinate to zero (x-axis), not the x-coordinate — students who confuse the two axes lose the whole question. The second part (coordinates of P) is separately marked, so do not stop at the ratio.",
  },
  {
    id: "q-c10-maths-07-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-07",
    classLevel: 10,
    text: "Find the value(s) of y for which the distance between the points P(2, −3) and Q(10, y) is 10 units.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "By the distance formula:\nPQ = √[(x₂ − x₁)² + (y₂ − y₁)²]\n\nPQ = √[(10 − 2)² + (y − (−3))²] = 10\n√[8² + (y + 3)²] = 10\n\nSquaring both sides:\n64 + (y + 3)² = 100\n(y + 3)² = 36\ny + 3 = ±6\n\ny + 3 = 6 ⇒ y = 3\ny + 3 = −6 ⇒ y = −9\n\nHence, y = 3 or y = −9.",
    keywords: [
      "distance formula √[(x₂ − x₁)² + (y₂ − y₁)²]",
      "64 + (y + 3)² = 100",
      "(y + 3)² = 36 ⇒ y + 3 = ±6",
      "y = 3 or y = −9",
    ],
    examinerTip:
      "Taking the square root gives ±6, so there are two answers — writing only y = 3 costs half the marks. Watch the sign: y − (−3) = y + 3, not y − 3.",
  },

  // ==========================================================================
  // CHAPTER 8 — INTRODUCTION TO TRIGONOMETRY
  // ==========================================================================
  {
    id: "q-c10-maths-08-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-08",
    classLevel: 10,
    text: "Prove that (cosec θ − cot θ)² = (1 − cos θ)/(1 + cos θ).",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Taking the LHS (the messier side) and converting to sin θ and cos θ:\n\nLHS = (cosec θ − cot θ)²\n   = (1/sin θ − cos θ/sin θ)²\n   = [(1 − cos θ)/sin θ]²\n   = (1 − cos θ)²/sin²θ\n\nUsing the identity sin²θ + cos²θ = 1, so sin²θ = 1 − cos²θ:\n\n   = (1 − cos θ)²/(1 − cos²θ)\n\nFactorising the denominator as a difference of two squares, 1 − cos²θ = (1 − cos θ)(1 + cos θ):\n\n   = (1 − cos θ)(1 − cos θ) / [(1 − cos θ)(1 + cos θ)]\n\nCancelling the common factor (1 − cos θ):\n\n   = (1 − cos θ)/(1 + cos θ)\n   = RHS\n\nHence proved.",
    keywords: [
      "cosec θ = 1/sin θ and cot θ = cos θ/sin θ",
      "[(1 − cos θ)/sin θ]²",
      "sin²θ = 1 − cos²θ",
      "1 − cos²θ = (1 − cos θ)(1 + cos θ)",
      "LHS = RHS, hence proved",
    ],
    examinerTip:
      "Start from the LHS and convert everything to sin θ and cos θ — that first conversion carries a mark. The step that gets skipped is factorising 1 − cos²θ as (1 − cos θ)(1 + cos θ); without it the cancellation is unjustified. Never work on both sides at once and never cross-multiply while 'proving'.",
  },
  {
    id: "q-c10-maths-08-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-08",
    classLevel: 10,
    text: "If sin A = 1/2, then the value of cot A is:\n(A) √3\n(B) 1/√3\n(C) √3/2\n(D) 1",
    marks: 1,
    type: "mcq",
    source: "important",
    answer:
      "Correct option: (A) √3\n\nReason: sin A = 1/2 = sin 30°, so A = 30°.\ncot A = cot 30° = √3.\n\n(Alternatively: sin A = 1/2 ⇒ cos A = √(1 − sin²A) = √(1 − 1/4) = √3/2,\nso cot A = cos A / sin A = (√3/2)/(1/2) = √3.)",
    keywords: [
      "sin A = 1/2 ⇒ A = 30°",
      "cot 30° = √3",
      "cot A = cos A / sin A",
    ],
    examinerTip:
      "Option (B) 1/√3 is tan 30°, not cot 30° — the standard trap. Memorise the specific-angle table as a grid rather than as isolated values.",
  },

  // ==========================================================================
  // CHAPTER 9 — SOME APPLICATIONS OF TRIGONOMETRY
  // ==========================================================================
  {
    id: "q-c10-maths-09-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-09",
    classLevel: 10,
    text:
      "The angle of elevation of the top of a building from the foot of a tower is 30° and the angle of elevation of the top of the tower from the foot of the building is 60°. If the tower is 50 m high, find the height of the building.",
    marks: 5,
    type: "la",
    source: "pyq",
    answer:
      "Let AB be the tower of height 50 m and CD be the building of height h m, standing on the same level ground with BD = d m as the distance between their feet.\n(Draw the figure: two vertical lines AB and CD on the same horizontal line BD, with the angle of elevation of A from D being 60° and of C from B being 30°.)\n\nStep 1 — Using the tower (elevation of A from D is 60°):\nIn right ΔABD, tan 60° = AB/BD\n√3 = 50/d\nd = 50/√3 m  … (i)\n\nStep 2 — Using the building (elevation of C from B is 30°):\nIn right ΔCDB, tan 30° = CD/BD\n1/√3 = h/d\nh = d/√3\n\nStep 3 — Substituting d from (i):\nh = (50/√3)/√3\nh = 50/(√3 × √3)\nh = 50/3\nh = 16 2/3 m ≈ 16.67 m\n\nHence, the height of the building is 50/3 m, i.e. 16.67 m (approx).",
    keywords: [
      "labelled figure showing both angles of elevation",
      "tan 60° = 50/d ⇒ d = 50/√3 m",
      "tan 30° = h/d",
      "h = 50/3 m",
      "height of the building = 16.67 m (approx)",
    ],
    examinerTip:
      "The labelled figure carries its own mark — solving mentally and skipping the diagram forfeits it. The commonest error is attaching the wrong angle to the wrong object: 60° is measured at the foot of the BUILDING looking at the tower, so it goes with the 50 m height.",
  },
  {
    id: "q-c10-maths-09-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-09",
    classLevel: 10,
    text:
      "A tree breaks due to a storm and the broken part bends so that the top of the tree touches the ground, making an angle of 30° with the ground. The distance between the foot of the tree and the point where the top touches the ground is 8 m. Find the height of the tree.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Let A be the foot of the tree, B the point where it breaks, and C the point on the ground where the top touches, so that ∠BCA = 30° and AC = 8 m.\nAB is the unbroken vertical part and BC is the broken part (which was originally vertical too).\n∠BAC = 90°.\n\nStep 1 — Find AB (the standing part):\ntan 30° = AB/AC\n1/√3 = AB/8\nAB = 8/√3 m\n\nStep 2 — Find BC (the broken part):\ncos 30° = AC/BC\n√3/2 = 8/BC\nBC = 16/√3 m\n\nStep 3 — Height of the tree = AB + BC (the broken part is the same length it was before breaking):\nHeight = 8/√3 + 16/√3\n    = 24/√3\n    = (24 × √3)/(√3 × √3)\n    = 24√3/3\n    = 8√3 m ≈ 13.86 m\n\nHence, the height of the tree is 8√3 m, i.e. about 13.86 m.",
    keywords: [
      "height of tree = standing part + broken part (AB + BC)",
      "tan 30° = AB/8 ⇒ AB = 8/√3 m",
      "cos 30° = 8/BC ⇒ BC = 16/√3 m",
      "rationalising 24/√3 = 8√3",
      "height = 8√3 m ≈ 13.86 m",
    ],
    examinerTip:
      "The height is AB + BC, not just AB — students stop at the standing part and lose the final marks. The broken part is the HYPOTENUSE, so use cos 30° (or sin 30°) for it, never tan. Rationalise the surd before writing the final answer with the unit.",
  },

  // ==========================================================================
  // CHAPTER 10 — CIRCLES
  // ==========================================================================
  {
    id: "q-c10-maths-10-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-10",
    classLevel: 10,
    text: "Prove that the lengths of tangents drawn from an external point to a circle are equal.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "GIVEN: A circle with centre O and an external point P. PQ and PR are two tangents drawn from P, touching the circle at Q and R respectively.\n\nTO PROVE: PQ = PR\n\nCONSTRUCTION: Join OQ, OR and OP.\n\nPROOF:\nSince the tangent at any point of a circle is perpendicular to the radius through the point of contact,\n∠OQP = 90° and ∠ORP = 90°.\n\nNow, in right triangles ΔOQP and ΔORP:\nOQ = OR      (radii of the same circle)\nOP = OP      (common hypotenuse)\n∠OQP = ∠ORP = 90°\n\nTherefore ΔOQP ≅ ΔORP  (RHS congruence rule)\n\nHence PQ = PR  (by CPCT — corresponding parts of congruent triangles)\n\nHence proved, the lengths of tangents drawn from an external point to a circle are equal.",
    keywords: [
      "the tangent at any point of a circle is perpendicular to the radius through the point of contact",
      "∠OQP = ∠ORP = 90°",
      "OQ = OR (radii of the same circle)",
      "OP = OP (common hypotenuse)",
      "RHS congruence rule",
      "PQ = PR by CPCT",
    ],
    examinerTip:
      "Quote the tangent-perpendicular-radius property by name before using the 90° angles, and cite RHS (not SSS or SAS) — it is the only rule that fits a right angle plus hypotenuse plus one side. Finishing with 'by CPCT' is a marked step.",
  },
  {
    id: "q-c10-maths-10-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-10",
    classLevel: 10,
    text:
      "A tangent PQ at a point P of a circle of radius 5 cm meets a line through the centre O at a point Q so that OQ = 12 cm. Find the length of PQ.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "PQ is a tangent to the circle at P and OP is the radius through the point of contact.\nSince the tangent at any point of a circle is perpendicular to the radius through the point of contact,\n∠OPQ = 90°.\n\nSo ΔOPQ is a right triangle, right-angled at P, with OQ as the hypotenuse.\n\nOQ² = OP² + PQ²\n(12)² = (5)² + PQ²\n144 = 25 + PQ²\nPQ² = 144 − 25 = 119\nPQ = √119 cm ≈ 10.9 cm\n\nHence, the length of the tangent PQ is √119 cm.",
    keywords: [
      "tangent is perpendicular to the radius at the point of contact",
      "∠OPQ = 90°",
      "OQ² = OP² + PQ²",
      "PQ² = 144 − 25 = 119",
      "PQ = √119 cm",
    ],
    examinerTip:
      "OQ (12 cm) is the HYPOTENUSE, not a leg — students who write PQ² = 144 + 25 have mis-seen the right angle, which is at P (the point of contact), never at O. Leave the answer as √119 cm unless a decimal is asked for, and keep the unit.",
  },

  // ==========================================================================
  // CHAPTER 11 — AREAS RELATED TO CIRCLES
  // ==========================================================================
  {
    id: "q-c10-maths-11-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-11",
    classLevel: 10,
    text:
      "A chord of a circle of radius 10 cm subtends a right angle at the centre. Find the area of the corresponding minor segment. (Use π = 3.14)",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Given: radius r = 10 cm, angle subtended at the centre θ = 90°, π = 3.14.\nLet AB be the chord and O the centre, so ∠AOB = 90°.\n\nStep 1 — Area of the sector OAB:\nArea of sector = (θ/360°) × πr²\n        = (90/360) × 3.14 × (10)²\n        = (1/4) × 3.14 × 100\n        = 78.5 cm²\n\nStep 2 — Area of ΔOAB:\nOA = OB = 10 cm and ∠AOB = 90°, so ΔOAB is right-angled at O.\nArea of ΔOAB = ½ × base × height\n       = ½ × OA × OB\n       = ½ × 10 × 10\n       = 50 cm²\n\nStep 3 — Area of the minor segment:\nArea of minor segment = Area of sector − Area of ΔOAB\n            = 78.5 − 50\n            = 28.5 cm²\n\nHence, the area of the minor segment is 28.5 cm².",
    keywords: [
      "area of sector = (θ/360) × πr²",
      "area of sector = 78.5 cm²",
      "area of ΔOAB = ½ × 10 × 10 = 50 cm²",
      "segment = sector − triangle",
      "area of minor segment = 28.5 cm²",
    ],
    examinerTip:
      "The whole question turns on subtracting the triangle — quoting the sector area as the segment area is the classic error. Use the π the paper specifies (3.14 here, not 22/7), and write cm² on every area.",
  },
  {
    id: "q-c10-maths-11-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-11",
    classLevel: 10,
    text: "Find the area of a sector of a circle with radius 6 cm if the angle of the sector is 60°. (Use π = 22/7)",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Given: radius r = 6 cm, angle of the sector θ = 60°, π = 22/7.\n\nArea of sector = (θ/360°) × πr²\n        = (60/360) × (22/7) × (6)²\n        = (1/6) × (22/7) × 36\n        = (22 × 36)/(7 × 6)\n        = (22 × 6)/7\n        = 132/7 cm²\n        = 18.86 cm² (approx)\n\nHence, the area of the sector is 132/7 cm², i.e. about 18.86 cm².",
    keywords: [
      "area of sector = (θ/360) × πr²",
      "(60/360) × (22/7) × 36",
      "132/7 cm²",
      "≈ 18.86 cm²",
    ],
    examinerTip:
      "θ/360 is the fraction of the WHOLE circle — dividing by 180 (or forgetting the fraction entirely and giving πr²) is the usual slip. Square the radius before multiplying, and end with cm².",
  },

  // ==========================================================================
  // CHAPTER 12 — SURFACE AREAS AND VOLUMES
  // ==========================================================================
  {
    id: "q-c10-maths-12-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-12",
    classLevel: 10,
    text:
      "A tent is in the shape of a cylinder surmounted by a conical top. If the height and diameter of the cylindrical part are 2.1 m and 4 m respectively, and the slant height of the conical top is 2.8 m, find the area of the canvas used for making the tent. Also find the cost of the canvas of the tent at the rate of ₹500 per m². (Use π = 22/7)",
    marks: 5,
    type: "la",
    source: "pyq",
    answer:
      "Given: for the cylindrical part, height h = 2.1 m and diameter = 4 m, so radius r = 4/2 = 2 m.\nFor the conical top, slant height l = 2.8 m and the same radius r = 2 m.\n\nThe canvas covers only the CURVED surfaces (the tent has no top disc and no canvas floor):\n\nArea of canvas = CSA of cylinder + CSA of cone\n        = 2πrh + πrl\n        = πr(2h + l)\n\nStep 1 — CSA of the cylinder:\n2πrh = 2 × (22/7) × 2 × 2.1\n   = 2 × 22 × 2 × 0.3\n   = 26.4 m²\n\nStep 2 — CSA of the cone:\nπrl = (22/7) × 2 × 2.8\n  = 22 × 2 × 0.4\n  = 17.6 m²\n\nStep 3 — Total area of canvas:\nTotal = 26.4 + 17.6 = 44 m²\n\nStep 4 — Cost of the canvas at ₹500 per m²:\nCost = 44 × 500 = ₹22000\n\nHence, 44 m² of canvas is used and its cost is ₹22,000.",
    keywords: [
      "radius r = diameter/2 = 2 m",
      "area of canvas = CSA of cylinder + CSA of cone = 2πrh + πrl",
      "CSA of cylinder = 26.4 m²",
      "CSA of cone = 17.6 m²",
      "total canvas = 44 m²",
      "cost = 44 × 500 = ₹22,000",
    ],
    examinerTip:
      "Write the combined formula (2πrh + πrl) before substituting — that step is separately marked. Two traps: the question gives the DIAMETER (halve it to 2 m), and only the curved surfaces are canvas, so adding πr² for a base or top is wrong. Carry m² through and put the ₹ on the cost.",
  },
  {
    id: "q-c10-maths-12-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-12",
    classLevel: 10,
    text:
      "CASE STUDY: A carpenter makes a wooden toy by mounting a cone on a hemisphere of the same radius. The radius of the hemisphere is 3.5 cm and the total height of the toy is 15.5 cm. The toy is to be painted on its entire outer surface.\n\nBased on the above information, answer the following: (Use π = 22/7)\n(i) Find the height of the conical part. (1 mark)\n(ii) Find the slant height of the conical part. (1 mark)\n(iii) Find the total surface area of the toy. (2 marks)",
    marks: 4,
    type: "case",
    source: "sample",
    answer:
      "Given: radius r = 3.5 cm (same for the cone and the hemisphere), total height of the toy = 15.5 cm.\n\n(i) Height of the conical part:\nTotal height = height of cone + radius of hemisphere\n15.5 = h + 3.5\nh = 15.5 − 3.5 = 12 cm\nHence the height of the conical part is 12 cm.\n\n(ii) Slant height of the cone:\nl = √(r² + h²)\n = √((3.5)² + (12)²)\n = √(12.25 + 144)\n = √156.25\n = 12.5 cm\nHence the slant height is 12.5 cm.\n\n(iii) Total surface area of the toy:\nThe painted surface = CSA of cone + CSA of hemisphere\n(the flat circular faces are joined together and are not exposed)\n\nTSA = πrl + 2πr²\n\nCSA of cone = πrl = (22/7) × 3.5 × 12.5 = 11 × 12.5 = 137.5 cm²\nCSA of hemisphere = 2πr² = 2 × (22/7) × (3.5)² = 2 × (22/7) × 12.25 = 2 × 38.5 = 77 cm²\n\nTSA = 137.5 + 77 = 214.5 cm²\n\nHence, the total surface area of the toy is 214.5 cm².",
    keywords: [
      "height of cone = total height − radius of hemisphere = 12 cm",
      "l = √(r² + h²) = 12.5 cm",
      "TSA = CSA of cone + CSA of hemisphere = πrl + 2πr²",
      "πrl = 137.5 cm², 2πr² = 77 cm²",
      "TSA = 214.5 cm²",
    ],
    examinerTip:
      "The hemisphere's radius, not its diameter, is subtracted from the total height — subtracting 7 cm is the standard error. Do not add the base area πr² of the cone: that circle sits on the hemisphere and is not painted. Hemisphere CSA is 2πr² (3πr² is its TOTAL surface area, which does not apply here).",
  },

  // ==========================================================================
  // CHAPTER 13 — STATISTICS
  // ==========================================================================
  {
    id: "q-c10-maths-13-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-13",
    classLevel: 10,
    text:
      "Find the mean of the following distribution by the step-deviation method:\n\nMarks   : 0–10 | 10–20 | 20–30 | 30–40 | 40–50\nStudents:  5   |   8   |  15   |   9   |   3",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Let the assumed mean a = 25 and the class size h = 10.\nFor each class, xᵢ = class mark = (lower limit + upper limit)/2 and uᵢ = (xᵢ − a)/h.\n\nWorking table:\n\nClass  | fᵢ | xᵢ | uᵢ = (xᵢ − 25)/10 | fᵢuᵢ\n0–10  |  5 |  5 |  −2        | −10\n10–20 |  8 | 15 |  −1        |  −8\n20–30 | 15 | 25 |   0        |   0\n30–40 |  9 | 35 |   1        |   9\n40–50 |  3 | 45 |   2        |   6\n-----------------------------------------\nTotal | Σfᵢ = 40 |    |        | Σfᵢuᵢ = −3\n\nBy the step-deviation method:\nMean x̄ = a + h × (Σfᵢuᵢ / Σfᵢ)\n    = 25 + 10 × (−3/40)\n    = 25 − 30/40\n    = 25 − 0.75\n    = 24.25\n\nHence, the mean marks = 24.25.",
    keywords: [
      "class mark xᵢ = (lower limit + upper limit)/2",
      "assumed mean a = 25, class size h = 10",
      "uᵢ = (xᵢ − a)/h",
      "Σfᵢ = 40, Σfᵢuᵢ = −3",
      "x̄ = a + h(Σfᵢuᵢ/Σfᵢ)",
      "mean = 24.25",
    ],
    examinerTip:
      "The full working table (xᵢ, uᵢ, fᵢuᵢ columns with totals) carries most of the marks — an answer with no table scores almost nothing even if 24.25 is right. Keep the signs on the negative uᵢ values, and remember to multiply by h; leaving it out gives 24.925, a classic wrong answer.",
  },
  {
    id: "q-c10-maths-13-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-13",
    classLevel: 10,
    text:
      "Find the median of the following frequency distribution:\n\nClass    : 0–10 | 10–20 | 20–30 | 30–40 | 40–50\nFrequency:  5   |   8   |  20   |  15   |   7",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "First prepare the cumulative frequency (cf) table:\n\nClass  | f  | cf\n0–10  |  5 |  5\n10–20 |  8 | 13\n20–30 | 20 | 33\n30–40 | 15 | 48\n40–50 |  7 | 55\n-------------------\n     N = Σf = 55\n\nN/2 = 55/2 = 27.5\n\nThe cumulative frequency just greater than 27.5 is 33, which corresponds to the class 20–30.\nTherefore the median class is 20–30.\n\nHere: l = 20 (lower limit of the median class)\n   cf = 13 (cumulative frequency of the class preceding the median class)\n   f = 20 (frequency of the median class)\n   h = 10 (class size)\n\nMedian = l + [(N/2 − cf)/f] × h\n    = 20 + [(27.5 − 13)/20] × 10\n    = 20 + (14.5/20) × 10\n    = 20 + 7.25\n    = 27.25\n\nHence, the median = 27.25.",
    keywords: [
      "cumulative frequency (cf) column",
      "N = 55, N/2 = 27.5",
      "median class = 20–30 (cf just greater than N/2)",
      "Median = l + [(N/2 − cf)/f] × h",
      "median = 27.25",
    ],
    examinerTip:
      "The cf column is compulsory — without it the median class cannot be justified and marks are cut even if the answer is right. 'cf' in the formula is that of the class BEFORE the median class (13 here, not 33), and f is the frequency of the median class only.",
  },
  {
    id: "q-c10-maths-13-3",
    subjectId: "c10-maths",
    chapterId: "c10-maths-13",
    classLevel: 10,
    text:
      "The table below shows the ages of the patients admitted to a hospital during a year. Find the mode of the data.\n\nAge (in years) : 5–15 | 15–25 | 25–35 | 35–45 | 45–55 | 55–65\nNo. of patients:  6   |  11   |  21   |  23   |  14   |   5",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "The class with the maximum frequency is 35–45 (frequency 23).\nTherefore the modal class is 35–45.\n\nHere: l = 35  (lower limit of the modal class)\n   f₁ = 23 (frequency of the modal class)\n   f₀ = 21 (frequency of the class preceding the modal class)\n   f₂ = 14 (frequency of the class succeeding the modal class)\n   h = 10  (class size)\n\nMode = l + [(f₁ − f₀)/(2f₁ − f₀ − f₂)] × h\n\nSubstituting:\nMode = 35 + [(23 − 21)/(2 × 23 − 21 − 14)] × 10\n   = 35 + [2/(46 − 35)] × 10\n   = 35 + (2/11) × 10\n   = 35 + 20/11\n   = 35 + 1.82\n   = 36.8 (approx)\n\nHence, the mode of the data is 36.8 years.",
    keywords: [
      "modal class = class with the maximum frequency = 35–45",
      "Mode = l + [(f₁ − f₀)/(2f₁ − f₀ − f₂)] × h",
      "l = 35, f₁ = 23, f₀ = 21, f₂ = 14, h = 10",
      "2f₁ − f₀ − f₂ = 46 − 35 = 11",
      "mode = 36.8 years",
    ],
    examinerTip:
      "Identify and name the modal class first — the marking scheme awards it separately. f₀ is the frequency BEFORE and f₂ the frequency AFTER the modal class; swapping them is the standard error. Write the identification of l, f₁, f₀, f₂, h as a list before substituting, and give the answer in years.",
  },
  {
    id: "q-c10-maths-13-4",
    subjectId: "c10-maths",
    chapterId: "c10-maths-13",
    classLevel: 10,
    text: "The mean and the median of a distribution are 26.4 and 28 respectively. Find its mode.",
    marks: 1,
    type: "vsa",
    source: "important",
    answer:
      "By the empirical relationship between the three measures of central tendency:\n3 Median = Mode + 2 Mean\ni.e. Mode = 3 Median − 2 Mean\n\nSubstituting Median = 28 and Mean = 26.4:\nMode = 3(28) − 2(26.4)\n   = 84 − 52.8\n   = 31.2\n\nHence, the mode = 31.2.",
    keywords: [
      "empirical relationship: 3 Median = Mode + 2 Mean",
      "Mode = 3 Median − 2 Mean",
      "Mode = 84 − 52.8 = 31.2",
    ],
    examinerTip:
      "The 3 multiplies the MEDIAN and the 2 multiplies the MEAN — reversing them gives 25.2 and no marks. Write the relation before substituting.",
  },

  // ==========================================================================
  // CHAPTER 14 — PROBABILITY
  // ==========================================================================
  {
    id: "q-c10-maths-14-1",
    subjectId: "c10-maths",
    chapterId: "c10-maths-14",
    classLevel: 10,
    text:
      "One card is drawn at random from a well-shuffled deck of 52 playing cards. Find the probability of getting:\n(i) a king of red colour\n(ii) a face card\n(iii) a jack of hearts\n(iv) a spade",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Total number of possible outcomes = 52 (all cards are equally likely).\nProbability of an event E, P(E) = (Number of outcomes favourable to E)/(Total number of outcomes)\n\n(i) A king of red colour:\nThere are 4 kings in a deck, of which 2 are red (king of hearts and king of diamonds).\nFavourable outcomes = 2\nP(king of red colour) = 2/52 = 1/26\n\n(ii) A face card:\nFace cards are the jack, queen and king — 3 in each of the 4 suits.\nFavourable outcomes = 3 × 4 = 12\nP(face card) = 12/52 = 3/13\n\n(iii) A jack of hearts:\nThere is exactly 1 jack of hearts.\nFavourable outcomes = 1\nP(jack of hearts) = 1/52\n\n(iv) A spade:\nThere are 13 cards in the spade suit.\nFavourable outcomes = 13\nP(spade) = 13/52 = 1/4\n\nHence, the required probabilities are 1/26, 3/13, 1/52 and 1/4 respectively.",
    keywords: [
      "P(E) = number of favourable outcomes / total number of outcomes",
      "total outcomes = 52",
      "2 red kings ⇒ 1/26",
      "12 face cards (jack, queen, king × 4 suits) ⇒ 3/13",
      "1 jack of hearts ⇒ 1/52",
      "13 spades ⇒ 1/4",
    ],
    examinerTip:
      "Marks are lost on deck composition, not on the formula: there are 12 face cards (aces are NOT face cards) and 2 red kings, not 4. Reduce every fraction to lowest terms and never write probability as a ratio like 2 : 52.",
  },
  {
    id: "q-c10-maths-14-2",
    subjectId: "c10-maths",
    chapterId: "c10-maths-14",
    classLevel: 10,
    text:
      "A bag contains 3 red balls and 5 black balls. A ball is drawn at random from the bag. What is the probability that the ball drawn is NOT red?\n(A) 3/8\n(B) 5/8\n(C) 3/5\n(D) 1/8",
    marks: 1,
    type: "mcq",
    source: "important",
    answer:
      "Correct option: (B) 5/8\n\nReason: Total number of balls = 3 + 5 = 8\nP(red) = 3/8\n\nP(not red) = 1 − P(red) = 1 − 3/8 = 5/8\n\n(Directly: the balls that are not red are the 5 black ones, so P(not red) = 5/8.)",
    keywords: [
      "total number of balls = 8",
      "P(red) = 3/8",
      "P(not E) = 1 − P(E)",
      "P(not red) = 5/8",
    ],
    examinerTip:
      "Option (A) 3/8 is P(red) — read whether the question asks for the event or its complement. The total (8) must include every ball in the bag, not just one colour.",
  },
];
