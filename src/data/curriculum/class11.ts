import type { Subject } from "../../lib/types";

// Class XI curriculum — chapter lists and numbering verified against the
// CURRENT rationalised NCERT textbooks (Reprint 2026-27) for session 2025-26.
// Source of truth: the official contents pages on ncert.nic.in, cross-checked
// against the individual chapter PDFs.
//
// Rationalisation notes (chapters that NO LONGER exist — do not re-add):
// - Physics: "Physical World" removed; Part I is ch 1-7, Part II is ch 8-14,
//   numbered continuously (keph201 = Chapter 8, keph207 = Chapter 14).
// - Chemistry: down to 9 units. "States of Matter", "The s-Block Elements",
//   "The p-Block Elements (Group 13 & 14)" and "Environmental Chemistry" removed.
//   Part I = Units 1-6, Part II = Units 7-9, numbered continuously.
// - Maths: "Principle of Mathematical Induction" and "Mathematical Reasoning"
//   removed; the remaining 14 chapters are renumbered 1-14.
// - Biology: "Transport in Plants", "Mineral Nutrition" and "Digestion and
//   Absorption" removed; the remaining 19 chapters are renumbered 1-19.
// - English (Hornbill): "Landscape of the Soul" and the play "The Browning
//   Version" removed. Six prose pieces remain (NCERT numbers only the prose);
//   the five poems are unnumbered in the book, so we number prose + poetry as
//   one flat sequence in the order they appear in the textbook.

export const CLASS_11_SUBJECTS: Subject[] = [
  // ------------------------------------------------------------------ Physics
  {
    id: "c11-physics",
    name: "Physics",
    classLevel: 11,
    icon: "Atom",
    color: "violet",
    chapters: [
      {
        id: "c11-physics-01",
        number: 1,
        title: "Units and Measurement",
        keyTopics: [
          "SI units and base quantities",
          "Dimensional analysis",
          "Significant figures",
          "Errors in measurement",
        ],
      },
      {
        id: "c11-physics-02",
        number: 2,
        title: "Motion in a Straight Line",
        keyTopics: [
          "Instantaneous velocity and speed",
          "Acceleration",
          "Kinematic equations",
          "Relative velocity",
        ],
      },
      {
        id: "c11-physics-03",
        number: 3,
        title: "Motion in a Plane",
        keyTopics: [
          "Scalars and vectors",
          "Vector addition and resolution",
          "Projectile motion",
          "Uniform circular motion",
        ],
      },
      {
        id: "c11-physics-04",
        number: 4,
        title: "Laws of Motion",
        keyTopics: [
          "Newton's three laws",
          "Conservation of momentum",
          "Friction",
          "Dynamics of circular motion",
        ],
      },
      {
        id: "c11-physics-05",
        number: 5,
        title: "Work, Energy and Power",
        keyTopics: [
          "Work-energy theorem",
          "Potential energy of a spring",
          "Conservation of mechanical energy",
          "Collisions",
        ],
      },
      {
        id: "c11-physics-06",
        number: 6,
        title: "System of Particles and Rotational Motion",
        keyTopics: [
          "Centre of mass",
          "Torque and angular momentum",
          "Moment of inertia",
          "Rotational dynamics about a fixed axis",
        ],
      },
      {
        id: "c11-physics-07",
        number: 7,
        title: "Gravitation",
        keyTopics: [
          "Kepler's laws",
          "Universal law of gravitation",
          "Acceleration due to gravity",
          "Escape speed and earth satellites",
        ],
      },
      {
        id: "c11-physics-08",
        number: 8,
        title: "Mechanical Properties of Solids",
        keyTopics: [
          "Stress and strain",
          "Hooke's law",
          "Young's modulus",
          "Elastic behaviour of materials",
        ],
      },
      {
        id: "c11-physics-09",
        number: 9,
        title: "Mechanical Properties of Fluids",
        keyTopics: [
          "Pascal's law",
          "Bernoulli's principle",
          "Viscosity and Stokes' law",
          "Surface tension",
        ],
      },
      {
        id: "c11-physics-10",
        number: 10,
        title: "Thermal Properties of Matter",
        keyTopics: [
          "Thermal expansion",
          "Specific heat capacity",
          "Calorimetry and change of state",
          "Heat transfer",
        ],
      },
      {
        id: "c11-physics-11",
        number: 11,
        title: "Thermodynamics",
        keyTopics: [
          "Zeroth and first law",
          "Thermodynamic processes",
          "Second law of thermodynamics",
          "Heat engines and refrigerators",
        ],
      },
      {
        id: "c11-physics-12",
        number: 12,
        title: "Kinetic Theory",
        keyTopics: [
          "Behaviour of gases and ideal gas equation",
          "Kinetic theory postulates",
          "Law of equipartition of energy",
          "Mean free path",
        ],
      },
      {
        id: "c11-physics-13",
        number: 13,
        title: "Oscillations",
        keyTopics: [
          "Periodic motion",
          "Simple harmonic motion",
          "Oscillations of a loaded spring",
          "Simple pendulum and energy in SHM",
        ],
      },
      {
        id: "c11-physics-14",
        number: 14,
        title: "Waves",
        keyTopics: [
          "Transverse and longitudinal waves",
          "Speed of a travelling wave",
          "Superposition and standing waves",
          "Beats",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- Chemistry
  {
    id: "c11-chemistry",
    name: "Chemistry",
    classLevel: 11,
    icon: "FlaskConical",
    color: "mint",
    chapters: [
      {
        id: "c11-chemistry-01",
        number: 1,
        title: "Some Basic Concepts of Chemistry",
        keyTopics: [
          "Laws of chemical combination",
          "Mole concept and molar mass",
          "Empirical and molecular formula",
          "Stoichiometric calculations",
        ],
      },
      {
        id: "c11-chemistry-02",
        number: 2,
        title: "Structure of Atom",
        keyTopics: [
          "Bohr's model for hydrogen atom",
          "Quantum mechanical model",
          "Quantum numbers and orbitals",
          "Electronic configuration",
        ],
      },
      {
        id: "c11-chemistry-03",
        number: 3,
        title: "Classification of Elements and Periodicity in Properties",
        keyTopics: [
          "Modern periodic law",
          "s-, p-, d-, f- blocks",
          "Periodic trends in properties",
        ],
      },
      {
        id: "c11-chemistry-04",
        number: 4,
        title: "Chemical Bonding and Molecular Structure",
        keyTopics: [
          "Bond parameters and VSEPR theory",
          "Valence bond theory and hybridisation",
          "Molecular orbital theory",
          "Hydrogen bonding",
        ],
      },
      {
        id: "c11-chemistry-05",
        number: 5,
        title: "Thermodynamics",
        keyTopics: [
          "Internal energy and enthalpy",
          "Calorimetry and Hess's law",
          "Entropy and spontaneity",
          "Gibbs energy change",
        ],
      },
      {
        id: "c11-chemistry-06",
        number: 6,
        title: "Equilibrium",
        keyTopics: [
          "Equilibrium constant and reaction quotient",
          "Le Chatelier's principle",
          "Ionisation of acids and bases, pH",
          "Buffers and solubility equilibria",
        ],
      },
      {
        id: "c11-chemistry-07",
        number: 7,
        title: "Redox Reactions",
        keyTopics: [
          "Oxidation number",
          "Balancing redox reactions",
          "Redox reactions and electrode processes",
        ],
      },
      {
        id: "c11-chemistry-08",
        number: 8,
        title: "Organic Chemistry – Some Basic Principles and Techniques",
        keyTopics: [
          "IUPAC nomenclature",
          "Isomerism",
          "Electronic effects and reaction mechanism",
          "Purification and analysis of organic compounds",
        ],
      },
      {
        id: "c11-chemistry-09",
        number: 9,
        title: "Hydrocarbons",
        keyTopics: [
          "Alkanes and conformations",
          "Alkenes and alkynes",
          "Aromatic hydrocarbons and benzene",
          "Carcinogenicity and toxicity",
        ],
      },
    ],
  },

  // -------------------------------------------------------------- Mathematics
  {
    id: "c11-maths",
    name: "Mathematics",
    classLevel: 11,
    icon: "Sigma",
    color: "gold",
    chapters: [
      {
        id: "c11-maths-01",
        number: 1,
        title: "Sets",
        keyTopics: [
          "Types of sets and subsets",
          "Venn diagrams",
          "Operations on sets",
          "Complement of a set",
        ],
      },
      {
        id: "c11-maths-02",
        number: 2,
        title: "Relations and Functions",
        keyTopics: [
          "Cartesian product of sets",
          "Relations",
          "Functions, domain and range",
        ],
      },
      {
        id: "c11-maths-03",
        number: 3,
        title: "Trigonometric Functions",
        keyTopics: [
          "Radian measure and unit circle",
          "Trigonometric identities",
          "Sum and difference formulae",
          "Multiple angle identities",
        ],
      },
      {
        id: "c11-maths-04",
        number: 4,
        title: "Complex Numbers and Quadratic Equations",
        keyTopics: [
          "Algebra of complex numbers",
          "Modulus and conjugate",
          "Argand plane and polar form",
          "Quadratic equations with complex roots",
        ],
      },
      {
        id: "c11-maths-05",
        number: 5,
        title: "Linear Inequalities",
        keyTopics: [
          "Linear inequalities in one variable",
          "Algebraic solutions",
          "Representation on the number line",
        ],
      },
      {
        id: "c11-maths-06",
        number: 6,
        title: "Permutations and Combinations",
        keyTopics: [
          "Fundamental principle of counting",
          "Factorial notation",
          "Permutations",
          "Combinations",
        ],
      },
      {
        id: "c11-maths-07",
        number: 7,
        title: "Binomial Theorem",
        keyTopics: [
          "Binomial theorem for positive integral indices",
          "Pascal's triangle",
          "Simple applications",
        ],
      },
      {
        id: "c11-maths-08",
        number: 8,
        title: "Sequences and Series",
        keyTopics: [
          "Sequences and series",
          "Arithmetic mean",
          "Geometric progression",
          "Relationship between A.M. and G.M.",
        ],
      },
      {
        id: "c11-maths-09",
        number: 9,
        title: "Straight Lines",
        keyTopics: [
          "Slope of a line",
          "Various forms of the equation of a line",
          "Distance of a point from a line",
        ],
      },
      {
        id: "c11-maths-10",
        number: 10,
        title: "Conic Sections",
        keyTopics: ["Circle", "Parabola", "Ellipse", "Hyperbola"],
      },
      {
        id: "c11-maths-11",
        number: 11,
        title: "Introduction to Three Dimensional Geometry",
        keyTopics: [
          "Coordinate axes and planes in space",
          "Coordinates of a point in space",
          "Distance between two points",
        ],
      },
      {
        id: "c11-maths-12",
        number: 12,
        title: "Limits and Derivatives",
        keyTopics: [
          "Intuitive idea of limits",
          "Limits of trigonometric functions",
          "Derivative from first principle",
          "Algebra of derivatives",
        ],
      },
      {
        id: "c11-maths-13",
        number: 13,
        title: "Statistics",
        keyTopics: [
          "Measures of dispersion",
          "Range and mean deviation",
          "Variance and standard deviation",
        ],
      },
      {
        id: "c11-maths-14",
        number: 14,
        title: "Probability",
        keyTopics: [
          "Random experiments and sample space",
          "Events and their types",
          "Axiomatic approach to probability",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ Biology
  {
    id: "c11-biology",
    name: "Biology",
    classLevel: 11,
    icon: "Dna",
    color: "coral",
    chapters: [
      {
        id: "c11-biology-01",
        number: 1,
        title: "The Living World",
        keyTopics: [
          "Characteristics of living organisms",
          "Diversity in the living world",
          "Taxonomic categories",
          "Binomial nomenclature",
        ],
      },
      {
        id: "c11-biology-02",
        number: 2,
        title: "Biological Classification",
        keyTopics: [
          "Five kingdom classification",
          "Monera, Protista and Fungi",
          "Viruses, viroids and prions",
          "Lichens",
        ],
      },
      {
        id: "c11-biology-03",
        number: 3,
        title: "Plant Kingdom",
        keyTopics: ["Algae", "Bryophytes", "Pteridophytes", "Gymnosperms"],
      },
      {
        id: "c11-biology-04",
        number: 4,
        title: "Animal Kingdom",
        keyTopics: [
          "Basis of classification",
          "Non-chordate phyla",
          "Phylum Chordata",
        ],
      },
      {
        id: "c11-biology-05",
        number: 5,
        title: "Morphology of Flowering Plants",
        keyTopics: [
          "Root, stem and leaf",
          "Inflorescence",
          "Flower, fruit and seed",
          "Floral formula and diagram",
        ],
      },
      {
        id: "c11-biology-06",
        number: 6,
        title: "Anatomy of Flowering Plants",
        keyTopics: [
          "Meristematic and permanent tissues",
          "Tissue systems",
          "Anatomy of dicot and monocot root, stem and leaf",
        ],
      },
      {
        id: "c11-biology-07",
        number: 7,
        title: "Structural Organisation in Animals",
        keyTopics: [
          "Animal tissues",
          "Epithelial, connective, muscular and neural tissue",
          "Morphology and anatomy of frog",
        ],
      },
      {
        id: "c11-biology-08",
        number: 8,
        title: "Cell: The Unit of Life",
        keyTopics: [
          "Cell theory",
          "Prokaryotic and eukaryotic cells",
          "Cell organelles",
          "Nucleus and chromosomes",
        ],
      },
      {
        id: "c11-biology-09",
        number: 9,
        title: "Biomolecules",
        keyTopics: [
          "Carbohydrates and lipids",
          "Proteins and nucleic acids",
          "Enzymes and their properties",
          "Metabolic basis for living",
        ],
      },
      {
        id: "c11-biology-10",
        number: 10,
        title: "Cell Cycle and Cell Division",
        keyTopics: [
          "Phases of the cell cycle",
          "Mitosis",
          "Meiosis",
          "Significance of cell division",
        ],
      },
      {
        id: "c11-biology-11",
        number: 11,
        title: "Photosynthesis in Higher Plants",
        keyTopics: [
          "Light reaction and photophosphorylation",
          "C3 and C4 pathways",
          "Photorespiration",
          "Factors affecting photosynthesis",
        ],
      },
      {
        id: "c11-biology-12",
        number: 12,
        title: "Respiration in Plants",
        keyTopics: [
          "Glycolysis",
          "Krebs cycle",
          "Electron transport system",
          "Respiratory quotient",
        ],
      },
      {
        id: "c11-biology-13",
        number: 13,
        title: "Plant Growth and Development",
        keyTopics: [
          "Phases and rate of growth",
          "Differentiation and dedifferentiation",
          "Plant growth regulators",
          "Photoperiodism and vernalisation",
        ],
      },
      {
        id: "c11-biology-14",
        number: 14,
        title: "Breathing and Exchange of Gases",
        keyTopics: [
          "Human respiratory system",
          "Mechanism of breathing",
          "Transport of gases",
          "Disorders of the respiratory system",
        ],
      },
      {
        id: "c11-biology-15",
        number: 15,
        title: "Body Fluids and Circulation",
        keyTopics: [
          "Blood and lymph",
          "Human circulatory system",
          "Cardiac cycle and ECG",
          "Disorders of the circulatory system",
        ],
      },
      {
        id: "c11-biology-16",
        number: 16,
        title: "Excretory Products and their Elimination",
        keyTopics: [
          "Modes of excretion",
          "Human excretory system",
          "Urine formation and concentration",
          "Disorders of the excretory system",
        ],
      },
      {
        id: "c11-biology-17",
        number: 17,
        title: "Locomotion and Movement",
        keyTopics: [
          "Types of movement",
          "Muscle structure and contraction",
          "Skeletal system and joints",
          "Disorders of the muscular and skeletal system",
        ],
      },
      {
        id: "c11-biology-18",
        number: 18,
        title: "Neural Control and Coordination",
        keyTopics: [
          "Human neural system",
          "Neuron and generation of nerve impulse",
          "Transmission of impulses across a synapse",
          "Human brain",
        ],
      },
      {
        id: "c11-biology-19",
        number: 19,
        title: "Chemical Coordination and Integration",
        keyTopics: [
          "Endocrine glands and hormones",
          "Hormones of the heart, kidney and GI tract",
          "Mechanism of hormone action",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ English
  // Hornbill — the main reader. NCERT numbers only the six prose pieces; the
  // five poems sit between them, unnumbered. We number both as one flat
  // sequence in the exact order they appear in the rationalised textbook.
  {
    id: "c11-english",
    name: "English",
    classLevel: 11,
    icon: "BookOpen",
    color: "sky",
    chapters: [
      {
        id: "c11-english-01",
        number: 1,
        title: "The Portrait of a Lady",
        keyTopics: [
          "Khushwant Singh",
          "Grandmother's character sketch",
          "Bond across generations",
        ],
      },
      {
        id: "c11-english-02",
        number: 2,
        title: "A Photograph",
        keyTopics: [
          "Poem — Shirley Toulson",
          "Transience of time",
          "Memory and loss",
        ],
      },
      {
        id: "c11-english-03",
        number: 3,
        title: "We’re Not Afraid to Die... if We Can All Be Together",
        keyTopics: [
          "Gordon Cook and Alan East",
          "Survival at sea",
          "Courage and family unity",
        ],
      },
      {
        id: "c11-english-04",
        number: 4,
        title: "Discovering Tut: the Saga Continues",
        keyTopics: [
          "A.R. Williams",
          "Tutankhamun's mummy and CT scan",
          "Archaeology and forensic science",
        ],
      },
      {
        id: "c11-english-05",
        number: 5,
        title: "The Laburnum Top",
        keyTopics: [
          "Poem — Ted Hughes",
          "Imagery of stillness and motion",
          "Bird and tree symbiosis",
        ],
      },
      {
        id: "c11-english-06",
        number: 6,
        title: "The Voice of the Rain",
        keyTopics: [
          "Poem — Walt Whitman",
          "Water cycle as metaphor",
          "Poetry and eternal return",
        ],
      },
      {
        id: "c11-english-07",
        number: 7,
        title: "The Ailing Planet: the Green Movement’s Role",
        keyTopics: [
          "Nani Palkhivala",
          "Sustainable development",
          "Holistic view of the earth",
        ],
      },
      {
        id: "c11-english-08",
        number: 8,
        title: "Childhood",
        keyTopics: [
          "Poem — Markus Natten",
          "Loss of innocence",
          "Growing up and individuality",
        ],
      },
      {
        id: "c11-english-09",
        number: 9,
        title: "The Adventure",
        keyTopics: [
          "Jayant Narlikar",
          "Alternate history and parallel worlds",
          "Catastrophe theory and quantum ideas",
        ],
      },
      {
        id: "c11-english-10",
        number: 10,
        title: "Silk Road",
        keyTopics: [
          "Nick Middleton",
          "Travelogue to Mount Kailash",
          "Landscape and hardship",
        ],
      },
      {
        id: "c11-english-11",
        number: 11,
        title: "Father to Son",
        keyTopics: [
          "Poem — Elizabeth Jennings",
          "Generation gap",
          "Alienation and reconciliation",
        ],
      },
    ],
  },
];
