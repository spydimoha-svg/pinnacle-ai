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
    id: "q-c11-physics-03-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-03",
    classLevel: 11,
    text: "A ball is projected with a speed of 10 m/s at an angle of 45° with the horizontal. Find its maximum height and horizontal range. (Take g = 10 m/s².)",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Maximum height: H = u² sin²θ / 2g = 10² × sin²45° / (2 × 10) = 100 × 0.5 / 20 = 2.5 m.\n\nHorizontal range: R = u² sin2θ / g = 10² × sin90° / 10 = 100 × 1 / 10 = 10 m.",
    keywords: [
      "H = u² sin²θ / 2g = 2.5 m",
      "R = u² sin2θ / g = 10 m",
      "at 45°, sin2θ = 1 gives maximum range",
    ],
    examinerTip:
      "45° gives the maximum range for a given speed since sin2θ is maximum (=1) at θ = 45° — a common one-mark conceptual follow-up.",
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
    id: "q-c11-physics-06-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-06",
    classLevel: 11,
    text: "The moment of inertia of a uniform disc of mass M and radius R about an axis passing through its centre, perpendicular to its plane, is:\n(A) MR²\n(B) ½MR²\n(C) ¼MR²\n(D) 2MR²",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (B) ½MR².\n\nFor a uniform disc rotating about an axis through its centre and perpendicular to its plane, the standard result is I = ½MR², obtained by integrating dI = r² dm over the disc.",
    keywords: [
      "disc about central axis ⊥ to its plane",
      "I = ½MR² (standard result)",
      "option (B)",
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

  {
    id: "q-c11-physics-08-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-08",
    classLevel: 11,
    text: "A steel wire of length 2 m and cross-sectional area 2 × 10⁻⁶ m² is stretched by 0.5 mm when a force of 100 N is applied along its length. Calculate Young's modulus of the wire.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Young's modulus Y = (F/A) / (ΔL/L) = FL / (A ΔL).\n\nY = (100 × 2) / (2 × 10⁻⁶ × 0.5 × 10⁻³) = 200 / (1 × 10⁻⁹) = 2 × 10¹¹ N/m².",
    keywords: [
      "Y = stress / strain = FL / (A ΔL)",
      "substitute F = 100 N, L = 2 m, A = 2 × 10⁻⁶ m², ΔL = 0.5 × 10⁻³ m",
      "Y = 2 × 10¹¹ N/m² (typical for steel)",
    ],
  },
  {
    id: "q-c11-physics-09-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-09",
    classLevel: 11,
    text: "In a hydraulic lift, the smaller piston has a cross-sectional area of 5 cm² and the larger piston has an area of 500 cm². What force must be applied on the smaller piston to lift a load of 20000 N placed on the larger piston?",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "By Pascal's law, pressure applied at the smaller piston is transmitted equally to the larger piston: F₁/A₁ = F₂/A₂.\n\nF₁ = F₂ × A₁/A₂ = 20000 × 5/500 = 200 N.",
    keywords: [
      "Pascal's law: pressure transmitted equally, F₁/A₁ = F₂/A₂",
      "F₁ = F₂ × (A₁/A₂)",
      "F₁ = 20000 × 5/500 = 200 N",
    ],
    examinerTip:
      "This is the working principle of a hydraulic lift/brake — a small force on the narrow piston produces a large force on the wide piston, at the cost of a smaller displacement on the wide side.",
  },
  {
    id: "q-c11-physics-10-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-10",
    classLevel: 11,
    text: "Calculate the heat required to raise the temperature of 2 kg of water from 20°C to 80°C. (Specific heat capacity of water = 4200 J/kg·K.)",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Heat required Q = mcΔT.\n\nQ = 2 × 4200 × (80 − 20) = 2 × 4200 × 60 = 504000 J = 5.04 × 10⁵ J.",
    keywords: [
      "Q = mcΔT",
      "ΔT = 80 − 20 = 60 K",
      "Q = 2 × 4200 × 60 = 5.04 × 10⁵ J",
    ],
  },
  {
    id: "q-c11-physics-11-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-11",
    classLevel: 11,
    text: "A gas absorbs 500 J of heat from its surroundings and does 200 J of work in expanding. Using the first law of thermodynamics, find the change in the internal energy of the gas.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "The first law of thermodynamics states ΔU = Q − W, where Q is the heat supplied to the system and W is the work done by the system.\n\nHere Q = +500 J (absorbed) and W = +200 J (done by the gas on expansion).\n\nΔU = Q − W = 500 − 200 = 300 J. The internal energy of the gas increases by 300 J.",
    keywords: [
      "first law: ΔU = Q − W",
      "Q = +500 J, W = +200 J",
      "ΔU = 300 J (increase)",
    ],
  },
  {
    id: "q-c11-physics-12-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-12",
    classLevel: 11,
    text: "Calculate the rms speed of oxygen (O₂) molecules at 300 K. (Molar mass of O₂ = 32 × 10⁻³ kg/mol, R = 8.31 J/mol·K.)",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "The rms speed is given by v_rms = √(3RT/M).\n\nv_rms = √(3 × 8.31 × 300 / 32 × 10⁻³) = √(7479 / 0.032) = √(233718.75) ≈ 483 m/s.",
    keywords: [
      "v_rms = √(3RT/M)",
      "substitute R = 8.31, T = 300 K, M = 32 × 10⁻³ kg/mol",
      "v_rms ≈ 483 m/s",
    ],
  },
  {
    id: "q-c11-physics-13-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-13",
    classLevel: 11,
    text: "The time period of a simple pendulum of length 1 m at a place where g = 9.8 m/s² is close to:\n(A) 1 s\n(B) 2 s\n(C) 3 s\n(D) 4 s",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (B) 2 s.\n\nT = 2π√(L/g) = 2π√(1/9.8) = 2π × 0.319 ≈ 2.0 s.",
    keywords: [
      "T = 2π√(L/g) for a simple pendulum",
      "T = 2π√(1/9.8) ≈ 2.0 s",
      "option (B)",
    ],
  },
  {
    id: "q-c11-physics-14-x1",
    subjectId: "c11-physics",
    chapterId: "c11-physics-14",
    classLevel: 11,
    text: "A string of mass 0.02 kg and length 2 m is stretched under a tension of 40 N. Find the speed of a transverse wave on the string.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Linear mass density μ = mass / length = 0.02 / 2 = 0.01 kg/m.\n\nSpeed of a transverse wave on a stretched string: v = √(T/μ) = √(40 / 0.01) = √4000 ≈ 63.2 m/s.",
    keywords: [
      "μ = m/L = 0.01 kg/m",
      "v = √(T/μ)",
      "v = √4000 ≈ 63.2 m/s",
    ],
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
    id: "q-c11-biology-01-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-01",
    classLevel: 11,
    text: "State the rules of binomial nomenclature, with a suitable example.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Binomial nomenclature (given by Carl Linnaeus) names every organism with two words: the genus name followed by the species name.\n\nRules: the first word (genus) begins with a capital letter and the second word (species) begins with a lowercase letter; both words are Latinised and printed in italics (or separately underlined when handwritten). For example, the mango is named Mangifera indica.",
    keywords: [
      "two-word name: genus + species",
      "genus capitalised, species lowercase, both italicised/underlined",
      "example — Mangifera indica",
    ],
  },
  {
    id: "q-c11-biology-02-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-02",
    classLevel: 11,
    text: "In Whittaker's five kingdom classification, which kingdom do bacteria belong to? Give two characteristic features of that kingdom.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Bacteria belong to Kingdom Monera.\n\nTwo characteristic features: (i) the cells are prokaryotic — they lack a membrane-bound nucleus and membrane-bound organelles; (ii) a rigid cell wall is present, and nutrition may be autotrophic or heterotrophic.",
    keywords: [
      "bacteria → Kingdom Monera",
      "prokaryotic cells — no membrane-bound nucleus/organelles",
      "cell wall present; autotrophic or heterotrophic nutrition",
    ],
  },
  {
    id: "q-c11-biology-03-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-03",
    classLevel: 11,
    text: "Why are bryophytes called the 'amphibians of the plant kingdom'?",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Bryophytes grow in soil and can live on land, but their motile, flagellated male gametes (antherozoids) must swim through a film of water to reach the egg in the archegonium for fertilisation. Because they can live on land but still depend on external water to reproduce, just as amphibians live on land but return to water to breed, bryophytes are called the amphibians of the plant kingdom.",
    keywords: [
      "bryophytes live on land (soil-rooted)",
      "flagellated male gametes need a film of water to swim to the archegonium",
      "land life + water-dependent reproduction ⇒ 'amphibians of the plant kingdom'",
    ],
  },
  {
    id: "q-c11-biology-04-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-04",
    classLevel: 11,
    text: "List the four features that place an animal in Phylum Chordata.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "The four diagnostic features of Phylum Chordata are: (i) a notochord present at some stage, (ii) a dorsal, hollow nerve cord, (iii) paired pharyngeal gill slits, and (iv) a post-anal tail.",
    keywords: [
      "notochord present at some stage of life",
      "dorsal, hollow nerve cord",
      "paired pharyngeal gill slits and a post-anal tail",
    ],
  },
  {
    id: "q-c11-biology-05-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-05",
    classLevel: 11,
    text: "Define inflorescence and differentiate between racemose and cymose inflorescence.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "An inflorescence is the arrangement of flowers on the floral axis of a plant.\n\nIn a racemose inflorescence, the main axis continues to grow and produces flowers laterally in an acropetal order (younger flowers near the tip). In a cymose inflorescence, the main axis terminates in a flower, so its growth is limited, and flowers are produced in a basipetal order (older flowers near the tip).",
    keywords: [
      "inflorescence = arrangement of flowers on the floral axis",
      "racemose: main axis keeps growing, flowers acropetal",
      "cymose: main axis ends in a flower, flowers basipetal",
    ],
  },
  {
    id: "q-c11-biology-06-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-06",
    classLevel: 11,
    text: "What is meristematic tissue? Name its three types based on position in the plant body.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Meristematic tissue is a group of actively dividing, undifferentiated cells that is responsible for growth in plants.\n\nBased on position, it is of three types: apical meristem (at the tips of roots and shoots), intercalary meristem (at the base of internodes/leaves, e.g. in grasses), and lateral meristem (along the sides of roots/stems, e.g. vascular cambium and cork cambium).",
    keywords: [
      "meristem = actively dividing, undifferentiated cells for growth",
      "apical meristem — at root/shoot tips",
      "intercalary meristem (base of internodes) and lateral meristem (cambium)",
    ],
  },
  {
    id: "q-c11-biology-07-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-07",
    classLevel: 11,
    text: "Name the four basic types of animal tissue and state one function of epithelial tissue.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "The four basic types of animal tissue are epithelial, connective, muscular and neural tissue.\n\nEpithelial tissue covers body surfaces and lines internal cavities and organs; it functions in protection, and in some regions also in absorption and secretion.",
    keywords: [
      "epithelial, connective, muscular, neural tissue",
      "epithelial tissue covers/lines surfaces and cavities",
      "functions: protection, and absorption/secretion at some sites",
    ],
  },
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

  {
    id: "q-c11-biology-10-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-10",
    classLevel: 11,
    text: "Name the four phases of mitosis in order and state one key event of each.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Mitosis has four phases:\n\nProphase — chromatin condenses into distinct chromosomes and the mitotic spindle begins to form.\nMetaphase — chromosomes align at the equatorial plate (metaphase plate).\nAnaphase — the centromere splits and sister chromatids separate and move to opposite poles.\nTelophase — chromosomes decondense and the nuclear envelope reassembles around each set, followed by cytokinesis.",
    keywords: [
      "prophase — chromatin condenses into chromosomes, spindle forms",
      "metaphase — chromosomes align at the equatorial plate",
      "anaphase — chromatids separate to poles; telophase — nuclear envelope reforms",
    ],
  },
  {
    id: "q-c11-biology-11-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-11",
    classLevel: 11,
    text: "In the chloroplast, where do the light reactions occur and where does the Calvin cycle (dark reaction) occur?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "The light reactions of photosynthesis occur in the thylakoid membranes (grana) of the chloroplast, where light energy is used to split water, generate ATP and NADPH, and release oxygen. The Calvin cycle (dark reaction) occurs in the stroma of the chloroplast, where ATP and NADPH are used to fix CO₂ and synthesise sugars.",
    keywords: [
      "light reactions occur in the thylakoid membrane (grana)",
      "produce ATP, NADPH and O₂ from water splitting",
      "Calvin cycle (CO₂ fixation) occurs in the stroma",
    ],
  },
  {
    id: "q-c11-biology-12-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-12",
    classLevel: 11,
    text: "Where in the cell does glycolysis take place, and what is its net ATP yield per glucose molecule?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Glycolysis takes place in the cytoplasm of the cell. One molecule of glucose is broken down into two molecules of pyruvate, with a net gain of 2 ATP (4 ATP produced minus 2 ATP used) and 2 NADH per glucose molecule.",
    keywords: [
      "glycolysis occurs in the cytoplasm",
      "glucose → 2 pyruvate",
      "net yield: 2 ATP and 2 NADH per glucose",
    ],
  },
  {
    id: "q-c11-biology-13-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-13",
    classLevel: 11,
    text: "Name the five major plant growth regulators and state one function of auxin.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "The five major plant growth regulators are auxin, gibberellin, cytokinin, ethylene and abscisic acid.\n\nAuxin promotes cell elongation in shoots, and it also maintains apical dominance (suppressing the growth of lateral/axillary buds).",
    keywords: [
      "auxin, gibberellin, cytokinin, ethylene, abscisic acid",
      "auxin promotes cell elongation",
      "auxin maintains apical dominance",
    ],
  },
  {
    id: "q-c11-biology-14-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-14",
    classLevel: 11,
    text: "Explain the mechanism of inspiration during normal quiet breathing in humans.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "During inspiration, the diaphragm contracts and flattens, and the external intercostal muscles contract, lifting the ribs and sternum outward and upward. Both actions increase the volume of the thoracic (chest) cavity, which decreases the pulmonary (intra-pulmonary) pressure below atmospheric pressure. Air therefore flows from the region of higher pressure outside into the lungs until the two pressures are equal.",
    keywords: [
      "diaphragm contracts and flattens; external intercostal muscles contract",
      "thoracic volume increases",
      "pulmonary pressure falls below atmospheric pressure ⇒ air flows into the lungs",
    ],
  },
  {
    id: "q-c11-biology-15-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-15",
    classLevel: 11,
    text: "What is a cardiac cycle? State its approximate duration in a healthy adult at rest.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "A cardiac cycle is the sequence of events that occurs in one complete heartbeat — atrial systole (contraction), ventricular systole, followed by joint diastole (relaxation) of the atria and ventricles.\n\nIn a healthy adult at rest, one cardiac cycle takes about 0.8 seconds, corresponding to a heart rate of about 72 beats per minute.",
    keywords: [
      "cardiac cycle = events in one heartbeat: atrial systole, ventricular systole, joint diastole",
      "duration ≈ 0.8 s",
      "corresponds to ≈ 72 beats per minute",
    ],
  },
  {
    id: "q-c11-biology-16-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-16",
    classLevel: 11,
    text: "Name the functional unit of the human kidney and state the three stages of urine formation.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "The functional unit of the human kidney is the nephron.\n\nUrine is formed in three stages: glomerular filtration (blood is filtered at the glomerulus into the Bowman's capsule), reabsorption (useful substances like glucose, amino acids and most water are reabsorbed back into the blood along the tubule), and tubular secretion (additional wastes, such as H⁺ and K⁺, are secreted into the tubule).",
    keywords: [
      "nephron = functional unit of the kidney",
      "glomerular filtration at the Bowman's capsule",
      "tubular reabsorption and tubular secretion",
    ],
  },
  {
    id: "q-c11-biology-17-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-17",
    classLevel: 11,
    text: "According to the sliding filament theory, how does a skeletal muscle contract?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "According to the sliding filament theory, muscle contraction occurs when the thin actin filaments slide over the thick myosin filaments, shortening the sarcomere, while the lengths of the individual actin and myosin filaments themselves do not change.\n\nA nerve impulse triggers the release of Ca²⁺ into the sarcoplasm, exposing the actin binding sites; myosin heads then bind actin to form cross bridges and pull the actin filaments inward using energy from ATP hydrolysis, repeating this cycle to produce contraction.",
    keywords: [
      "actin (thin) filaments slide over myosin (thick) filaments",
      "sarcomere shortens; filament lengths themselves stay the same",
      "Ca²⁺ release and ATP-powered myosin cross bridges drive the sliding",
    ],
  },
  {
    id: "q-c11-biology-18-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-18",
    classLevel: 11,
    text: "Describe how a nerve impulse is transmitted across a chemical synapse.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "When a nerve impulse reaches the axon terminal (synaptic knob) of the presynaptic neuron, it causes Ca²⁺ ions to enter the terminal. This triggers synaptic vesicles to fuse with the presynaptic membrane and release neurotransmitter into the synaptic cleft. The neurotransmitter diffuses across the cleft and binds to receptors on the postsynaptic membrane, opening ion channels there and generating a new electrical impulse in the postsynaptic neuron.",
    keywords: [
      "impulse at the axon terminal triggers Ca²⁺ influx",
      "synaptic vesicles release neurotransmitter into the synaptic cleft",
      "neurotransmitter binds postsynaptic receptors, generating a new impulse",
    ],
  },
  {
    id: "q-c11-biology-19-x1",
    subjectId: "c11-biology",
    chapterId: "c11-biology-19",
    classLevel: 11,
    text: "Name the hormones secreted by the adrenal medulla and state their principal function during stress.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "The adrenal medulla secretes adrenaline (epinephrine) and noradrenaline (norepinephrine).\n\nDuring stress, these hormones increase heart rate, blood pressure and the rate of conversion of glycogen to glucose, preparing the body to cope with emergency situations — the 'fight or flight' response.",
    keywords: [
      "adrenal medulla secretes adrenaline and noradrenaline",
      "increase heart rate and blood pressure",
      "raise blood glucose — the 'fight or flight' response",
    ],
  },

  // ── ENGLISH (Hornbill) ──
  {
    id: "q-c11-english-01-x1",
    subjectId: "c11-english",
    chapterId: "c11-english-01",
    classLevel: 11,
    text: "Why did the author's grandmother stop talking to him for a few days after he started attending the city school?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "At the city school the author was taught music as part of the curriculum. His grandmother strongly disapproved of this — she believed music and singing were not meant for respectable, God-fearing people and associated them with beggars and prostitutes. She was so hurt and disturbed by the idea that she stopped speaking to him for nearly two days, and their relationship changed after this from then on she kept a distance whenever he practised music.",
    keywords: [
      "author's school introduced music lessons",
      "grandmother saw music as unfit for respectable/religious people",
      "she stopped talking to him for a couple of days in protest",
    ],
    examinerTip:
      "Anchor the answer in the shift in the grandmother-grandson bond — this incident marks the first big change described in the essay, from companionship to silent disapproval.",
  },
  {
    id: "q-c11-english-02-x1",
    subjectId: "c11-english",
    chapterId: "c11-english-02",
    classLevel: 11,
    text: "In the poem 'A Photograph', why does the poet feel 'terribly transient' at the end?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "The poet looks at an old photograph of her mother as a young girl at the seaside, laughing with her cousins. That mother laughed again, years later, on seeing how dated the photograph looked. Now the mother herself has been dead for twelve years, and even her laughter — once so alive — is silent. The girl in the photograph, the mother's laughter, and finally the mother's own life have all, one after another, passed into the past, which is why the poet feels everything is 'terribly transient', that nothing, however precious, stays.",
    keywords: [
      "photograph shows mother as a girl with cousins at the beach",
      "mother later laughed at the photo herself, before she died",
      "girl, laughter and mother herself have all now vanished with time",
    ],
    examinerTip:
      "Trace all three losses in order (the girl, the laughter, the mother) — the poem builds its sense of transience cumulatively across the three stanzas.",
  },
  {
    id: "q-c11-english-03-x1",
    subjectId: "c11-english",
    chapterId: "c11-english-03",
    classLevel: 11,
    text: "Describe the incident of the huge wave that struck the yacht Wavewalker, and its immediate effect on the family.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "While sailing towards Cape Town, a huge wave suddenly rose behind the yacht Wavewalker and struck it from the rear, flipping the boat end over end. The cabin windows were smashed and the boat was flooded with water. Mary, the author's wife, was flung across the cabin and suffered a broken rib and a deep gash on her forehead, while their son Jonathan was badly bruised. The crew had to bail out water constantly and make emergency repairs to keep the damaged yacht afloat until they could reach the nearest port, Melbourne.",
    keywords: [
      "rogue wave struck the yacht from behind and capsized it end over end",
      "cabin windows smashed, boat flooded with water",
      "Mary injured (broken rib, gashed forehead); crew bailed and repaired to reach Melbourne",
    ],
  },
  {
    id: "q-c11-english-04-x1",
    subjectId: "c11-english",
    chapterId: "c11-english-04",
    classLevel: 11,
    text: "What did the 2005 CT scan of Tutankhamun's mummy reveal, and how did it change earlier theories about his death?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "In 2005, a team of Egyptian scientists led by Dr Zahi Hawass carried out the first-ever CT scan of Tutankhamun's mummy, producing over 1,700 digital images of the body from a fifteen-minute scan. The images showed no evidence of a blow to the back of the head, which weakened the long-standing murder theory. Instead, the scan revealed a fracture of the left thighbone just above the knee, and scientists suggested that an infection setting in from this fracture shortly before death could have been the actual cause of death, rather than assassination.",
    keywords: [
      "CT scan (2005) by Zahi Hawass's team produced ~1,700 images",
      "no evidence of a blow to the skull — weakened the murder theory",
      "fractured left thighbone; infection from it suggested as cause of death",
    ],
  },
  {
    id: "q-c11-english-05-x1",
    subjectId: "c11-english",
    chapterId: "c11-english-05",
    classLevel: 11,
    text: "How does Ted Hughes bring out the contrast between stillness and movement in the poem 'The Laburnum Top'?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "At the start of the poem the laburnum tree stands 'quite still' in the silence of a September afternoon, with its yellowing leaves and empty seed pods showing no sign of life. The stillness breaks the moment a goldfinch arrives with her fledglings; the tree suddenly seems to come alive with their twittering and quick movements, compared to a machine starting up. Once the goldfinch family has fed and flown off with a call, the tree slowly goes 'quite still again', returning to its original stillness — showing how a brief visit of life can animate something that looks completely lifeless.",
    keywords: [
      "tree begins and ends in stillness ('quite still') in September's silence",
      "goldfinch and fledglings arrive, tree seems to 'come alive', compared to a starting engine",
      "birds fly off, tree returns to stillness — contrast of movement within stillness",
    ],
  },
  {
    id: "q-c11-english-06-x1",
    subjectId: "c11-english",
    chapterId: "c11-english-06",
    classLevel: 11,
    text: "In 'The Voice of the Rain', how does Walt Whitman compare the cycle of rain to the cycle of a poem or song?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "The rain, personified in the poem, explains that it rises invisibly from the land and the bottomless sea, forms clouds, and descends to wash and give new life to the earth, only to return again to the place it came from. Whitman then draws a parallel with a song or a poem: like the rain, it too issues forth from an unknown source (the heart or spirit), performs its duty of beautifying and cleansing the world, and then returns — 'reck'd or unreck'd', that is, whether or not it is valued by others — to the place of its origin, completing an unending, eternal cycle.",
    keywords: [
      "rain rises invisibly from land and sea, forms clouds, descends to renew the earth, returns to source",
      "poem/song compared to rain — both arise from an unseen origin and return to it after fulfilling their duty",
      "cycle is eternal, regardless of whether the song is valued ('reck'd or unreck'd')",
    ],
  },
  {
    id: "q-c11-english-07-x1",
    subjectId: "c11-english",
    chapterId: "c11-english-07",
    classLevel: 11,
    text: "According to Nani Palkhivala in 'The Ailing Planet: the Green Movement's Role', why is the Green movement one of the most important movements of our time?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Palkhivala argues that unlike other movements confined to particular nations, ideologies or interest groups, the Green movement concerns the survival of the earth itself and every form of life on it. He describes the planet as 'ailing', suffering from the rapid depletion of finite natural resources, extinction of species, depletion of the ozone layer and deforestation, all caused by an over-emphasis on economic growth and rampant over-population. Because these threats affect the whole planet rather than any one nation, he considers the Green movement to be one of the most important, and most encouraging, developments of the twentieth century.",
    keywords: [
      "Green movement concerns the whole planet and all life, unlike movements limited to one nation or group",
      "earth described as 'ailing' — resource depletion, species extinction, ozone depletion, over-population",
      "causes traced to over-emphasis on economic growth without ecological balance",
    ],
  },
  {
    id: "q-c11-english-08-x1",
    subjectId: "c11-english",
    chapterId: "c11-english-08",
    classLevel: 11,
    text: "In the poem 'Childhood', at what points does the poet feel he lost his childhood?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "The poet says he lost his childhood at several stages. At eleven, he stopped believing that 'the wise, the good, the true' — the adults around him — never lied, once he realised grown-ups too could be dishonest. At twelve, he stopped believing that heaven could be found somewhere beyond the sky, once he understood it was not a physical place. Finally, he realises that his childhood did not leave in one clear moment at all — it is somewhere lost inside him, in 'a corner of my mind', so that he can never point to exactly where or when it ended.",
    keywords: [
      "at 11, stopped believing adults ('the wise, the good, the true') always tell the truth",
      "at 12, stopped believing heaven lies somewhere beyond the sky",
      "finally realises childhood is lost inside him, not locatable in time or place",
    ],
  },
  {
    id: "q-c11-english-09-x1",
    subjectId: "c11-english",
    chapterId: "c11-english-09",
    classLevel: 11,
    text: "What was Professor Gaitonde's 'catastrophe theory' about the Battle of Panipat in the story 'The Adventure'?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Professor Gaitonde, a historian, believed that history could have branched differently at critical turning points, or 'catastrophes'. He focused on the Third Battle of Panipat (1761), historically a crushing defeat for the Marathas against Ahmad Shah Abdali. In his theory, if the Maratha commander Sadashiv Rao Bhau had not been killed and the Marathas had won the battle instead, the subsequent course of Indian history — including the extent of British expansion in India — would have been entirely different. After a car accident, Gaitonde finds himself transported into exactly such an alternate world, where the Marathas won Panipat and history unfolded differently.",
    keywords: [
      "catastrophe theory: history can branch at a critical turning point",
      "focused on the Third Battle of Panipat (1761), where the Marathas were historically defeated",
      "imagines a world where the Marathas won under Sadashiv Rao Bhau, changing the course of Indian history",
    ],
  },
  {
    id: "q-c11-english-10-x1",
    subjectId: "c11-english",
    chapterId: "c11-english-10",
    classLevel: 11,
    text: "Describe the hardships the author faced while travelling towards Mount Kailash in 'Silk Road'.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Travelling across the high Tibetan plateau, the author had to endure biting cold winds and low temperatures at very high altitude, along with breathlessness caused by the thin air. The terrain of the Changthang plateau was harsh and largely uninhabited, forcing the group to depend on yaks and trucks for transport and on iodine tablets to purify drinking water. At one point the author was frightened by an enormous Tibetan mastiff guarding a nomad's tent. Despite these difficulties, the author pressed on to complete the pilgrimage to Mount Kailash, held sacred by both Hindus and Buddhists.",
    keywords: [
      "extreme cold, high winds and breathlessness at high altitude on the Tibetan plateau",
      "harsh Changthang terrain — travel by yak and truck, water purified with iodine tablets",
      "encounter with a huge Tibetan mastiff; journey ends at the sacred Mount Kailash",
    ],
  },
  {
    id: "q-c11-english-11-x1",
    subjectId: "c11-english",
    chapterId: "c11-english-11",
    classLevel: 11,
    text: "How does Elizabeth Jennings bring out the generation gap between the father and the son in the poem 'Father to Son'?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "The father, who is the speaker, admits that despite sharing blood and a home, he does not understand his son, whose silence and different views feel like a closed door to him. He feels they have drifted apart over the years into 'strangers', each unable to bridge the gap in values and communication between them. Yet the poem ends not in complete despair but with the father's hope of reconciliation — he wishes to start afresh and truly get to know his son, even though he admits he does not know how to find the right words to do so.",
    keywords: [
      "father admits he does not understand his son despite their blood relationship",
      "silence and differing values have made them feel like 'strangers' to each other",
      "poem ends with the father's hope of reconciliation and a fresh start, despite the gap",
    ],
  },
];
