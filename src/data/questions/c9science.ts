import type { Question } from "../../lib/types";

// CLASS 9 SCIENCE — board-style question bank.
// Chapter ids copied verbatim from src/data/curriculum/class9.ts (c9-science-01 … c9-science-12).
// Physics, chemistry and biology of the current NCERT Class 9 syllabus. `year`
// is omitted; stems are verified NCERT/board staples.

export const C9_SCIENCE_QUESTIONS: Question[] = [
  // ── CH 1 · MATTER IN OUR SURROUNDINGS ──
  {
    id: "q-c9-science-01-1",
    subjectId: "c9-science",
    chapterId: "c9-science-01",
    classLevel: 9,
    text: "Why does evaporation cause cooling? State two factors that increase the rate of evaporation.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "During evaporation, the faster-moving (higher-energy) particles at the surface of a liquid escape into the air. To do so they absorb the required latent heat of vaporisation from the surroundings and from the liquid itself. As the surroundings lose this heat, their temperature falls — so evaporation produces a cooling effect.\n\nTwo factors that increase the rate of evaporation:\n1. An increase in surface area.\n2. An increase in temperature (also: an increase in wind speed, or a decrease in humidity).",
    keywords: [
      "high-energy surface particles escape",
      "absorb latent heat of vaporisation from surroundings",
      "surroundings lose heat → cooling",
      "factors: surface area, temperature, wind speed, humidity",
    ],
    examinerTip:
      "The word 'latent heat' (or 'heat absorbed from the surroundings') is the key value point — 'particles escape' alone is not enough for full marks.",
  },
  {
    id: "q-c9-science-01-2",
    subjectId: "c9-science",
    chapterId: "c9-science-01",
    classLevel: 9,
    text: "Convert 25°C to the kelvin scale. Why is the kelvin scale preferred in scientific work?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "K = °C + 273, so 25°C = 25 + 273 = 298 K.\n\nThe kelvin scale is preferred because 0 K (−273°C) is the absolute zero, the lowest possible temperature at which molecular motion theoretically stops, so kelvin readings are never negative and relate directly to the kinetic energy of particles.",
    keywords: [
      "K = °C + 273",
      "298 K",
      "0 K = absolute zero, no negative readings",
    ],
  },

  // ── CH 2 · IS MATTER AROUND US PURE? ──
  {
    id: "q-c9-science-02-1",
    subjectId: "c9-science",
    chapterId: "c9-science-02",
    classLevel: 9,
    text: "Give three differences between a mixture and a compound.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Mixture vs Compound:\n1. Composition: A mixture has a variable composition; a compound has a fixed composition by mass.\n2. Properties: A mixture shows the properties of its constituents; a compound has entirely new properties, different from its elements.\n3. Separation: The components of a mixture can be separated by physical methods; a compound can be separated only by chemical methods.\n(Also: no energy change on making a mixture; heat/light is usually evolved or absorbed when a compound forms.)",
    keywords: [
      "variable vs fixed composition",
      "shows constituent properties vs new properties",
      "physical separation vs chemical separation",
    ],
    examinerTip:
      "Present it as a two-column comparison — CBSE awards a mark per correctly paired difference, so pair each point (mixture side AND compound side).",
  },
  {
    id: "q-c9-science-02-2",
    subjectId: "c9-science",
    chapterId: "c9-science-02",
    classLevel: 9,
    text: "Name the technique used to separate a mixture of common salt and ammonium chloride. Explain briefly.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Sublimation is used. The mixture is heated in a china dish covered with an inverted funnel; ammonium chloride sublimes (turns directly from solid to vapour) and re-solidifies on the cooler funnel walls, while common salt, which does not sublime, is left behind in the dish.",
    keywords: [
      "technique: sublimation",
      "NH4Cl sublimes and re-deposits on cooler surface",
      "common salt does not sublime, remains behind",
    ],
  },

  // ── CH 3 · ATOMS AND MOLECULES ──
  {
    id: "q-c9-science-03-1",
    subjectId: "c9-science",
    chapterId: "c9-science-03",
    classLevel: 9,
    text: "Calculate the number of moles and the number of molecules in 22 g of carbon dioxide (CO₂). (Molar mass of CO₂ = 44 g/mol, N_A = 6.022 × 10²³.)",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Number of moles n = given mass / molar mass = 22 / 44 = 0.5 mol.\n\nNumber of molecules = n × N_A = 0.5 × 6.022 × 10²³ = 3.011 × 10²³ molecules.",
    keywords: [
      "moles = mass ÷ molar mass = 22/44 = 0.5 mol",
      "molecules = moles × 6.022 × 10²³",
      "3.011 × 10²³ molecules",
    ],
    examinerTip:
      "Write the formula (n = m/M) before the numbers — the method line is a mark even if the arithmetic slips.",
  },
  {
    id: "q-c9-science-03-2",
    subjectId: "c9-science",
    chapterId: "c9-science-03",
    classLevel: 9,
    text: "Define 'chemical formula'. Write the chemical formula of aluminium oxide, given the valency of aluminium is 3 and of oxygen is 2.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "A chemical formula is the symbolic representation of the composition of a compound, showing the elements present and the ratio in which their atoms combine.\n\nFor aluminium oxide: criss-crossing the valencies (Al = 3, O = 2) gives the formula Al₂O₃.",
    keywords: [
      "chemical formula = symbolic representation of composition/ratio of atoms",
      "criss-cross valencies 3 and 2",
      "Al₂O₃",
    ],
  },

  // ── CH 4 · STRUCTURE OF THE ATOM ──
  {
    id: "q-c9-science-04-1",
    subjectId: "c9-science",
    chapterId: "c9-science-04",
    classLevel: 9,
    text: "Write the distribution of electrons in a sulphur atom (Z = 16) and state its valency.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Electronic configuration (using the 2n² rule, filling K, L, M shells):\nK = 2, L = 8, M = 6, i.e. 2, 8, 6.\n\nThe outermost shell has 6 electrons; it needs 2 more to complete the octet, so the valency of sulphur is 2.",
    keywords: [
      "distribution 2, 8, 6 (K, L, M)",
      "outermost shell has 6 electrons",
      "valency = 8 − 6 = 2",
    ],
  },
  {
    id: "q-c9-science-04-2",
    subjectId: "c9-science",
    chapterId: "c9-science-04",
    classLevel: 9,
    text: "An atom has 2 electrons in its first shell, 8 in the second shell and 2 in the third shell. Find its atomic number and state the number of valence electrons.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Atomic number = total number of electrons = 2 + 8 + 2 = 12.\n\nThe outermost (third) shell has 2 electrons, so the number of valence electrons is 2.",
    keywords: [
      "atomic number = 2+8+2 = 12",
      "outermost shell electrons = valence electrons",
      "valence electrons = 2",
    ],
  },

  // ── CH 5 · THE FUNDAMENTAL UNIT OF LIFE ──
  {
    id: "q-c9-science-05-1",
    subjectId: "c9-science",
    chapterId: "c9-science-05",
    classLevel: 9,
    text: "Give three differences between a plant cell and an animal cell.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Plant cell vs Animal cell:\n1. Cell wall: A plant cell has a cell wall (of cellulose) outside the membrane; an animal cell has no cell wall.\n2. Plastids: Plant cells contain plastids (e.g. chloroplasts); animal cells generally lack plastids.\n3. Vacuole: A plant cell has a single large central vacuole; animal cells have small, temporary vacuoles (or none).\n(Also: centrioles are present in animal cells but usually absent in plant cells.)",
    keywords: [
      "cell wall present vs absent",
      "plastids/chloroplasts present vs absent",
      "large central vacuole vs small/no vacuole",
    ],
    examinerTip:
      "Pair each difference (plant side and animal side). A single-sided statement like 'has a cell wall' earns only half the point.",
  },
  {
    id: "q-c9-science-05-2",
    subjectId: "c9-science",
    chapterId: "c9-science-05",
    classLevel: 9,
    text: "Why is the mitochondrion called the 'powerhouse of the cell'?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "The mitochondrion is called the powerhouse of the cell because cellular respiration takes place within it, breaking down food to release energy that is stored in the form of ATP (adenosine triphosphate) molecules, which the cell then uses to carry out its various activities.",
    keywords: [
      "site of cellular respiration",
      "releases energy from food, stored as ATP",
      "ATP used for cell's energy needs",
    ],
  },

  // ── CH 6 · TISSUES ──
  {
    id: "q-c9-science-06-1",
    subjectId: "c9-science",
    chapterId: "c9-science-06",
    classLevel: 9,
    text: "Name the two components of the vascular tissue in plants and state the function of each.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "The two components are xylem and phloem.\nXylem conducts water and dissolved minerals from the roots to the rest of the plant (upward transport).\nPhloem transports food (prepared in the leaves) to all other parts of the plant (transport in both directions).",
    keywords: [
      "xylem and phloem",
      "xylem — conducts water and minerals upward",
      "phloem — transports food to all parts",
    ],
  },
  {
    id: "q-c9-science-06-2",
    subjectId: "c9-science",
    chapterId: "c9-science-06",
    classLevel: 9,
    text: "What is the function of areolar tissue? Where is it found in the human body?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Areolar tissue fills the space inside organs, supports internal organs, and helps in repair of tissues. It is found between the skin and muscles, around blood vessels and nerves, and in the bone marrow.",
    keywords: [
      "fills space inside organs, supports organs",
      "helps in repair of tissues",
      "found between skin and muscles / around vessels and nerves",
    ],
  },

  // ── CH 7 · MOTION ──
  {
    id: "q-c9-science-07-1",
    subjectId: "c9-science",
    chapterId: "c9-science-07",
    classLevel: 9,
    text: "A body starts from rest and moves with uniform acceleration 2 m/s² for 5 s. Find its final velocity and the distance travelled.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Given u = 0, a = 2 m/s², t = 5 s.\n\nFinal velocity: v = u + at = 0 + 2 × 5 = 10 m/s.\n\nDistance: s = ut + ½at² = 0 + ½ × 2 × 5² = ½ × 2 × 25 = 25 m.",
    keywords: [
      "v = u + at = 10 m/s",
      "s = ut + ½at² = 25 m",
      "correct units (m/s and m)",
    ],
    examinerTip:
      "List the known quantities (u, a, t) first — that step is marked, and it stops sign/formula errors.",
  },
  {
    id: "q-c9-science-07-2",
    subjectId: "c9-science",
    chapterId: "c9-science-07",
    classLevel: 9,
    text: "Distinguish between uniform circular motion and uniform linear motion. Give one example of uniform circular motion.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "In uniform linear motion a body covers equal distances in equal intervals of time along a straight line, so its velocity stays constant. In uniform circular motion a body moves along a circular path at constant speed, but because its direction keeps changing, its velocity is not constant — the motion is accelerated.\n\nExample of uniform circular motion: the tip of the second hand of a clock (or a satellite orbiting the Earth at constant speed).",
    keywords: [
      "linear motion: straight line, constant velocity",
      "circular motion: constant speed but changing direction → accelerated",
      "example: second hand of a clock / satellite in circular orbit",
    ],
  },

  // ── CH 8 · FORCE AND LAWS OF MOTION ──
  {
    id: "q-c9-science-08-1",
    subjectId: "c9-science",
    chapterId: "c9-science-08",
    classLevel: 9,
    text: "State Newton's second law of motion and use it to find the acceleration produced when a force of 20 N acts on a body of mass 4 kg.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Newton's second law: The rate of change of momentum of a body is directly proportional to the applied (net) force and takes place in the direction of the force. This gives F = ma.\n\nFor the numerical part:\na = F/m = 20 N / 4 kg = 5 m/s².",
    keywords: [
      "rate of change of momentum ∝ applied force",
      "in the direction of the force",
      "F = ma",
      "a = F/m = 5 m/s²",
    ],
    examinerTip:
      "State the law in the momentum form, then reduce to F = ma — quoting only 'F = ma' without the statement loses the statement mark.",
  },
  {
    id: "q-c9-science-08-2",
    subjectId: "c9-science",
    chapterId: "c9-science-08",
    classLevel: 9,
    text: "Why does a passenger standing in a bus fall backward when the bus suddenly starts moving? Name the law involved.",
    marks: 2,
    type: "vsa",
    source: "pyq",
    answer:
      "This happens because of the law of inertia (Newton's first law of motion). When the bus is at rest, the passenger's feet (in contact with the bus floor) start moving forward along with the bus, but the upper part of the body tends to remain at rest due to inertia of rest. This makes the passenger fall backward.",
    keywords: [
      "law: inertia / Newton's first law",
      "feet move with bus, upper body resists change (inertia of rest)",
      "passenger falls backward",
    ],
  },

  // ── CH 9 · GRAVITATION ──
  {
    id: "q-c9-science-09-1",
    subjectId: "c9-science",
    chapterId: "c9-science-09",
    classLevel: 9,
    text: "Differentiate between the mass and the weight of a body. Find the weight of a body of mass 10 kg on the Earth. (g = 9.8 m/s².)",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Mass vs Weight:\n- Mass is the amount of matter in a body; it is constant everywhere and is measured in kilograms (kg).\n- Weight is the force with which the Earth attracts the body (W = mg); it varies with location (with g) and is measured in newtons (N).\n\nWeight on Earth: W = mg = 10 × 9.8 = 98 N.",
    keywords: [
      "mass = amount of matter, constant, in kg",
      "weight = force of gravity W = mg, varies, in N",
      "W = 10 × 9.8 = 98 N",
    ],
    examinerTip:
      "Give the units in the definitions (kg for mass, N for weight) — that distinction is itself a value point.",
  },
  {
    id: "q-c9-science-09-2",
    subjectId: "c9-science",
    chapterId: "c9-science-09",
    classLevel: 9,
    text: "State the universal law of gravitation.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Every object in the universe attracts every other object with a force that is directly proportional to the product of their masses and inversely proportional to the square of the distance between them, and this force acts along the line joining the two objects. That is, F = G m₁m₂ / d², where G is the universal gravitational constant.",
    keywords: [
      "F ∝ product of masses (m1 m2)",
      "F ∝ 1/d² (inverse square of distance)",
      "F = G m1 m2 / d²",
    ],
  },

  // ── CH 10 · WORK AND ENERGY ──
  {
    id: "q-c9-science-10-1",
    subjectId: "c9-science",
    chapterId: "c9-science-10",
    classLevel: 9,
    text: "A body of mass 5 kg is moving with a velocity of 10 m/s. Find its kinetic energy. If it is raised to a height of 4 m, find its potential energy. (g = 9.8 m/s².)",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Kinetic energy: KE = ½mv² = ½ × 5 × 10² = ½ × 5 × 100 = 250 J.\n\nPotential energy: PE = mgh = 5 × 9.8 × 4 = 196 J.",
    keywords: [
      "KE = ½mv² = 250 J",
      "PE = mgh = 196 J",
      "energy in joules (J)",
    ],
  },
  {
    id: "q-c9-science-10-2",
    subjectId: "c9-science",
    chapterId: "c9-science-10",
    classLevel: 9,
    text: "Define the SI unit of work. A force of 7 N displaces a body through a distance of 8 m in the direction of the force. Calculate the work done.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "The SI unit of work is the joule (J): 1 joule of work is done when a force of 1 newton displaces a body through 1 metre in the direction of the force.\n\nWork done W = F × s = 7 × 8 = 56 J.",
    keywords: [
      "1 J = 1 N force displacing body 1 m in direction of force",
      "W = F × s",
      "W = 56 J",
    ],
  },

  // ── CH 11 · SOUND ──
  {
    id: "q-c9-science-11-1",
    subjectId: "c9-science",
    chapterId: "c9-science-11",
    classLevel: 9,
    text: "The speed of sound in a medium is 340 m/s and the frequency of a wave is 170 Hz. Find its wavelength. State the relation you used.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Relation: v = f λ, where v is speed, f is frequency and λ is wavelength.\n\nλ = v/f = 340 / 170 = 2 m.",
    keywords: [
      "v = f λ",
      "λ = v/f = 340/170",
      "wavelength = 2 m",
    ],
  },
  {
    id: "q-c9-science-11-2",
    subjectId: "c9-science",
    chapterId: "c9-science-11",
    classLevel: 9,
    text: "Why can sound not travel through vacuum? What kind of wave is a sound wave — transverse or longitudinal — and why?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Sound needs a material medium (solid, liquid or gas) to travel because it propagates through the vibration and collision of the medium's particles; a vacuum has no particles to vibrate or transmit these vibrations, so sound cannot travel through it.\n\nSound is a longitudinal wave because the particles of the medium vibrate back and forth parallel to (along) the direction in which the wave travels, producing alternating compressions and rarefactions.",
    keywords: [
      "sound needs particles of a medium to vibrate/collide",
      "vacuum has no particles → no sound",
      "longitudinal: particle vibration parallel to wave direction, compressions and rarefactions",
    ],
  },

  // ── CH 12 · IMPROVEMENT IN FOOD RESOURCES ──
  {
    id: "q-c9-science-12-1",
    subjectId: "c9-science",
    chapterId: "c9-science-12",
    classLevel: 9,
    text: "Give two differences between manure and fertiliser.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "1. Nature: Manure is a natural substance made by decomposing animal and plant waste; a fertiliser is a chemical (commercially manufactured) substance.\n2. Nutrients: Manure is relatively poor in specific plant nutrients but adds a lot of humus (organic matter) to the soil; fertilisers are very rich in specific nutrients (N, P, K) but add no humus.",
    keywords: [
      "manure = natural/organic; fertiliser = chemical/manufactured",
      "manure adds humus; fertiliser rich in N, P, K but no humus",
    ],
    examinerTip:
      "The 'humus vs nutrient-rich' contrast is the point examiners look for, not just 'natural vs chemical'.",
  },
  {
    id: "q-c9-science-12-2",
    subjectId: "c9-science",
    chapterId: "c9-science-12",
    classLevel: 9,
    text: "What is mixed cropping? How is it different from intercropping?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Mixed cropping is growing two or more crops simultaneously on the same piece of land, mixing the seeds before sowing, to minimise the risk of total crop failure due to unfavourable weather.\n\nIt differs from intercropping, where two or more crops are grown in a definite pattern of alternating rows (in a fixed ratio), which allows better use of resources like nutrients, water and sunlight and enables inputs to be applied to one crop without affecting the other.",
    keywords: [
      "mixed cropping = two/more crops sown together, mixed seeds, to reduce risk of crop failure",
      "intercropping = crops grown in definite alternating row pattern",
      "intercropping allows better resource use / selective input application",
    ],
  },
];
