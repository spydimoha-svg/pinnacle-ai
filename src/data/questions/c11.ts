import type { Question } from "../../lib/types";

// CLASS 11 — board + entrance (JEE / NEET) foundation question bank.
// Chapter ids copied verbatim from src/data/curriculum/class11.ts.
// This batch thickens Class 11 (previously thin) AND serves the "Learn Better"
// entrance track: the JEE/NEET syllabus is built on exactly these Class 11
// chapters, so a few MCQs are included alongside board-style questions.
// Ids use an "-x" suffix so they never collide with the existing c11 questions
// that live in the Class 12 files.

export const C11_QUESTIONS: Question[] = [
  // ── PHYSICS ──
  {
    id: "q-c11-physics-01-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-01",
    classLevel: 11,
    text: "The dimensional formula of pressure is:\n(A) [M L T⁻²]\n(B) [M L⁻¹ T⁻²]\n(C) [M L² T⁻²]\n(D) [M L⁻¹ T⁻¹]",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (B) [M L⁻¹ T⁻²].\n\nPressure = Force / Area. Force has dimensions [M L T⁻²] and area has [L²], so pressure = [M L T⁻²] / [L²] = [M L⁻¹ T⁻²].",
    keywords: [
      "pressure = force / area",
      "force = [M L T⁻²], area = [L²]",
      "pressure = [M L⁻¹ T⁻²] → option (B)",
    ],
    examinerTip:
      "In JEE, derive the dimension from the defining relation (P = F/A) rather than trying to recall it — same for any 'odd one out' dimensional MCQ.",
  },
  {
    id: "q-c11-physics-02-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-02",
    classLevel: 11,
    text: "A ball is thrown vertically upward with a speed of 20 m/s. Find the maximum height reached and the time taken to reach it. (Take g = 10 m/s².)",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "At the highest point the velocity v = 0. Take upward as positive, a = −g = −10 m/s².\n\nMaximum height (v² = u² − 2gh):\n0 = 20² − 2(10)h ⇒ h = 400/20 = 20 m.\n\nTime to reach the top (v = u − gt):\n0 = 20 − 10t ⇒ t = 2 s.",
    keywords: [
      "at top v = 0",
      "v² = u² − 2gh ⇒ h = 20 m",
      "v = u − gt ⇒ t = 2 s",
    ],
    examinerTip:
      "State the condition 'v = 0 at the highest point' explicitly — it is the physics mark; the algebra is the method mark.",
  },
  {
    id: "q-c11-physics-04-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-04",
    classLevel: 11,
    text: "The apparent weight of a person standing in a lift that is falling freely under gravity is:\n(A) mg\n(B) 2mg\n(C) zero\n(D) mg/2",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (C) zero.\n\nIn free fall the lift and person both accelerate downward at a = g. The apparent weight (normal reaction) is N = m(g − a) = m(g − g) = 0. This is the state of weightlessness.",
    keywords: [
      "free fall ⇒ a = g downward",
      "N = m(g − a) = 0",
      "weightlessness → option (C)",
    ],
  },
  {
    id: "q-c11-physics-05-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-05",
    classLevel: 11,
    text: "A body of mass 2 kg is accelerated from 5 m/s to 15 m/s. Using the work–energy theorem, find the work done on it.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Work–energy theorem: Work done = change in kinetic energy = ½mv² − ½mu².\n\nW = ½ × 2 × (15² − 5²) = 1 × (225 − 25) = 200 J.",
    keywords: [
      "W = ΔKE = ½mv² − ½mu²",
      "½ × 2 × (225 − 25)",
      "W = 200 J",
    ],
  },
  {
    id: "q-c11-physics-07-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-07",
    classLevel: 11,
    text: "Define escape velocity and show that it equals √(2gR). Estimate its value for the Earth (g = 9.8 m/s², R = 6.4 × 10⁶ m).",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Escape velocity is the minimum speed with which a body must be projected from a planet's surface so that it just escapes the planet's gravitational field (reaching infinity with zero speed).\n\nEnergy conservation: ½mv_e² = GMm/R.\nSince g = GM/R², we have GM = gR², so ½v_e² = gR ⇒ v_e = √(2gR).\n\nFor Earth: v_e = √(2 × 9.8 × 6.4 × 10⁶) ≈ √(1.25 × 10⁸) ≈ 1.12 × 10⁴ m/s ≈ 11.2 km/s.",
    keywords: [
      "minimum speed to escape the gravitational field",
      "½mv_e² = GMm/R and GM = gR²",
      "v_e = √(2gR)",
      "≈ 11.2 km/s for Earth",
    ],
    examinerTip:
      "Escape velocity is independent of the mass and direction of projection — a favourite one-mark trap in both boards and JEE.",
  },

  // ── CHEMISTRY ──
  {
    id: "q-c11-chemistry-01-x1",
    subjectId: "c11-chemistry",
    chapterId: "c11-chemistry-01",
    classLevel: 11,
    text: "Calculate the number of moles and the number of molecules in 9.8 g of sulphuric acid, H₂SO₄. (Molar mass = 98 g/mol, N_A = 6.022 × 10²³.)",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Moles n = mass / molar mass = 9.8 / 98 = 0.1 mol.\nMolecules = n × N_A = 0.1 × 6.022 × 10²³ = 6.022 × 10²² molecules.",
    keywords: [
      "n = mass / molar mass = 0.1 mol",
      "molecules = n × 6.022 × 10²³",
      "6.022 × 10²² molecules",
    ],
  },
  {
    id: "q-c11-chemistry-02-x1",
    subjectId: "c11-chemistry",
    chapterId: "c11-chemistry-02",
    classLevel: 11,
    text: "The maximum number of electrons that can be accommodated in a subshell for which the azimuthal quantum number l = 2 is:\n(A) 2\n(B) 6\n(C) 10\n(D) 14",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (C) 10.\n\nl = 2 is the d-subshell. The number of orbitals in a subshell is (2l + 1) = 5, and each orbital holds 2 electrons, so the maximum is 2 × 5 = 10 electrons.",
    keywords: [
      "l = 2 → d-subshell",
      "orbitals = (2l + 1) = 5",
      "max electrons = 2 × (2l + 1) = 10 → option (C)",
    ],
  },
  {
    id: "q-c11-chemistry-03-x1",
    subjectId: "c11-chemistry",
    chapterId: "c11-chemistry-03",
    classLevel: 11,
    text: "Among the elements Na, Mg, Al and Si (all in Period 3), which has the largest atomic radius?\n(A) Na\n(B) Mg\n(C) Al\n(D) Si",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (A) Na.\n\nAcross a period from left to right, the nuclear charge increases while electrons enter the same shell, so the atomic radius decreases. Na is furthest left among these, so it has the largest atomic radius.",
    keywords: [
      "atomic radius decreases across a period",
      "increasing nuclear charge pulls electrons in",
      "Na (leftmost) is largest → option (A)",
    ],
  },

  // ── MATHEMATICS ──
  {
    id: "q-c11-maths-03-x1",
    subjectId: "c11-maths",
    chapterId: "c11-maths-03",
    classLevel: 11,
    text: "Find the exact value of sin 75°.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Write 75° = 45° + 30° and use sin(A + B) = sin A cos B + cos A sin B:\n\nsin 75° = sin 45° cos 30° + cos 45° sin 30°\n= (1/√2)(√3/2) + (1/√2)(1/2)\n= (√3 + 1) / (2√2)\n= (√6 + √2) / 4.",
    keywords: [
      "75° = 45° + 30°",
      "sin(A + B) = sinA cosB + cosA sinB",
      "= (√3 + 1)/(2√2) = (√6 + √2)/4",
    ],
    examinerTip:
      "Rationalise the final surd to (√6 + √2)/4 — leaving it as (√3 + 1)/(2√2) is usually accepted, but the rationalised form is the model answer.",
  },
  {
    id: "q-c11-maths-04-x1",
    subjectId: "c11-maths",
    chapterId: "c11-maths-04",
    classLevel: 11,
    text: "Find the modulus and argument of the complex number z = 1 + √3 i.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "For z = a + bi with a = 1, b = √3:\n\nModulus |z| = √(a² + b²) = √(1 + 3) = √4 = 2.\n\nArgument: tan θ = b/a = √3/1 = √3. Since a > 0 and b > 0, z lies in the first quadrant, so θ = π/3 (i.e. 60°).\n\nHence |z| = 2 and arg(z) = π/3.",
    keywords: [
      "|z| = √(a² + b²) = 2",
      "tan θ = b/a = √3",
      "first quadrant ⇒ arg = π/3",
    ],
    examinerTip:
      "Always check the quadrant from the signs of a and b before quoting the argument — tan θ = √3 alone also fits 240°, which would be wrong here.",
  },
  {
    id: "q-c11-maths-08-x1",
    subjectId: "c11-maths",
    chapterId: "c11-maths-08",
    classLevel: 11,
    text: "Find the sum of the first 20 terms of the arithmetic progression 2, 5, 8, 11, …",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "First term a = 2, common difference d = 3, n = 20.\n\nS_n = (n/2)[2a + (n − 1)d]\nS₂₀ = (20/2)[2(2) + (20 − 1)(3)]\n= 10[4 + 57]\n= 10 × 61\n= 610.",
    keywords: [
      "a = 2, d = 3, n = 20",
      "S_n = (n/2)[2a + (n − 1)d]",
      "S₂₀ = 10 × 61 = 610",
    ],
  },
  {
    id: "q-c11-maths-12-x1",
    subjectId: "c11-maths",
    chapterId: "c11-maths-12",
    classLevel: 11,
    text: "Evaluate lim (x → 2) of (x² − 4)/(x − 2).",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Direct substitution gives 0/0, so factorise the numerator:\nx² − 4 = (x − 2)(x + 2).\n\nlim (x → 2) (x − 2)(x + 2)/(x − 2) = lim (x → 2) (x + 2) = 2 + 2 = 4.",
    keywords: [
      "0/0 form ⇒ factorise",
      "x² − 4 = (x − 2)(x + 2)",
      "cancel (x − 2), substitute ⇒ 4",
    ],
    examinerTip:
      "State that direct substitution gives the 0/0 indeterminate form first — that observation is what justifies factorising, and it is marked.",
  },

  // ── BIOLOGY (NEET foundation) ──
  {
    id: "q-c11-biology-08-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-08",
    classLevel: 11,
    text: "Which of the following is absent in a prokaryotic cell?\n(A) Ribosomes\n(B) Cell membrane\n(C) Nuclear membrane\n(D) Cytoplasm",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (C) Nuclear membrane.\n\nProkaryotic cells (e.g. bacteria) have no membrane-bound nucleus — their genetic material lies free in the cytoplasm in a region called the nucleoid. They do possess ribosomes (70S), a cell membrane and cytoplasm.",
    keywords: [
      "prokaryotes have no membrane-bound nucleus",
      "DNA lies free in the nucleoid",
      "ribosomes, membrane, cytoplasm are present → answer (C)",
    ],
  },
  {
    id: "q-c11-biology-09-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-09",
    classLevel: 11,
    text: "Name the bond that links amino acids in a protein, and state the class of biomolecule to which enzymes belong.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Amino acids in a protein are joined by peptide bonds (formed between the –COOH group of one amino acid and the –NH₂ group of the next, with the loss of water).\n\nEnzymes are proteins — they act as biological catalysts that speed up metabolic reactions.",
    keywords: [
      "peptide bond links amino acids",
      "formed between –COOH and –NH₂ (loss of water)",
      "enzymes are proteins (biocatalysts)",
    ],
  },
];
