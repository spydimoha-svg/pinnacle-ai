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
// - Economics (Indian Economic Development): "Poverty" (old ch 4) and
//   "Infrastructure" (old ch 8) removed; the remaining 8 chapters are
//   renumbered 1-8. "Statistics for Economics" (the Part A book) is out of
//   scope here — only the Part B book is modelled as a subject.
//
// Per-chapter weightage and board-question notes: Class XI has no external
// CBSE board exam, but CBSE's own curriculum document publishes a unit-wise
// Question Paper Design for the school-conducted annual exam (mirroring the
// Class XII board format), and schools set papers to it. Marks below are
// that unit weightage split across the chapters within each unit; English
// has no official design, so its weightage follows the same prose > poetry
// convention used in the Class XII Flamingo chapters.

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
        weightage: "≈3 marks",
        keyTopics: [
          "SI units and base quantities",
          "Dimensional analysis",
          "Significant figures",
          "Errors in measurement",
        ],
        boardNotes:
          "Mostly tested through MCQs on significant figures and dimensional consistency; the classic short question is checking a formula's dimensional correctness, and marks are lost by dropping units in the final answer rather than by wrong physics.",
      },
      {
        id: "c11-physics-02",
        number: 2,
        title: "Motion in a Straight Line",
        weightage: "≈4 marks",
        keyTopics: [
          "Instantaneous velocity and speed",
          "Acceleration",
          "Kinematic equations",
          "Relative velocity",
        ],
        boardNotes:
          "Velocity-time and position-time graph interpretation is the recurring ask — reading area under a v-t graph as displacement, and slope as acceleration, is tested more often than the kinematic equations themselves.",
      },
      {
        id: "c11-physics-03",
        number: 3,
        title: "Motion in a Plane",
        weightage: "≈5 marks",
        keyTopics: [
          "Scalars and vectors",
          "Vector addition and resolution",
          "Projectile motion",
          "Uniform circular motion",
        ],
        boardNotes:
          "Projectile motion (range, maximum height, time of flight) is the standard numerical; resolving the initial velocity into components before substituting is a separately marked step that rushed answers skip.",
      },
      {
        id: "c11-physics-04",
        number: 4,
        title: "Laws of Motion",
        weightage: "≈7 marks",
        keyTopics: [
          "Newton's three laws",
          "Conservation of momentum",
          "Friction",
          "Dynamics of circular motion",
        ],
        boardNotes:
          "Free-body diagrams for connected-block or pulley problems carry their own marks — a numerical answer without one is marked incomplete; friction on an incline is the other reliable long question.",
      },
      {
        id: "c11-physics-05",
        number: 5,
        title: "Work, Energy and Power",
        weightage: "≈6 marks",
        keyTopics: [
          "Work-energy theorem",
          "Potential energy of a spring",
          "Conservation of mechanical energy",
          "Collisions",
        ],
        boardNotes:
          "Elastic vs inelastic collision numericals are the anchor question; stating which quantity (momentum, kinetic energy, or both) is conserved before solving is the step examiners look for first.",
      },
      {
        id: "c11-physics-06",
        number: 6,
        title: "System of Particles and Rotational Motion",
        weightage: "≈7 marks",
        keyTopics: [
          "Centre of mass",
          "Torque and angular momentum",
          "Moment of inertia",
          "Rotational dynamics about a fixed axis",
        ],
        boardNotes:
          "Moment of inertia by the parallel and perpendicular axis theorems is the heaviest derivation in the unit; torque-and-angular-momentum numericals expect the axis of rotation stated explicitly before computing I.",
      },
      {
        id: "c11-physics-07",
        number: 7,
        title: "Gravitation",
        weightage: "≈5 marks",
        keyTopics: [
          "Kepler's laws",
          "Universal law of gravitation",
          "Acceleration due to gravity",
          "Escape speed and earth satellites",
        ],
        boardNotes:
          "Escape speed and the orbital velocity of a satellite are the standard numericals; Kepler's third law (T² ∝ r³) shows up as a quick comparison between two orbits rather than a full derivation.",
      },
      {
        id: "c11-physics-08",
        number: 8,
        title: "Mechanical Properties of Solids",
        weightage: "≈3 marks",
        keyTopics: [
          "Stress and strain",
          "Hooke's law",
          "Young's modulus",
          "Elastic behaviour of materials",
        ],
        boardNotes:
          "Stress-strain curve interpretation (elastic limit, yield point, fracture point) is asked as a labelled-graph question more often than a numerical on Young's modulus.",
      },
      {
        id: "c11-physics-09",
        number: 9,
        title: "Mechanical Properties of Fluids",
        weightage: "≈4 marks",
        keyTopics: [
          "Pascal's law",
          "Bernoulli's principle",
          "Viscosity and Stokes' law",
          "Surface tension",
        ],
        boardNotes:
          "Bernoulli's principle applied to a venturimeter or a leaking tank is the standard numerical; Stokes' law and terminal velocity is the other repeat short question, and mixing up viscosity with surface tension is the common slip.",
      },
      {
        id: "c11-physics-10",
        number: 10,
        title: "Thermal Properties of Matter",
        weightage: "≈4 marks",
        keyTopics: [
          "Thermal expansion",
          "Specific heat capacity",
          "Calorimetry and change of state",
          "Heat transfer",
        ],
        boardNotes:
          "Calorimetry numericals (mixing two substances at different temperatures) are the reliable long question; the change-of-state graph, with its flat melting and boiling plateaus, is tested as a labelled-diagram question.",
      },
      {
        id: "c11-physics-11",
        number: 11,
        title: "Thermodynamics",
        weightage: "≈5 marks",
        keyTopics: [
          "Zeroth and first law",
          "Thermodynamic processes",
          "Second law of thermodynamics",
          "Heat engines and refrigerators",
        ],
        boardNotes:
          "The first law applied to isothermal and adiabatic processes is the standard short question; stating the sign convention for heat absorbed and work done before substituting is what separates full marks from a wrong-sign answer.",
      },
      {
        id: "c11-physics-12",
        number: 12,
        title: "Kinetic Theory",
        weightage: "≈4 marks",
        keyTopics: [
          "Behaviour of gases and ideal gas equation",
          "Kinetic theory postulates",
          "Law of equipartition of energy",
          "Mean free path",
        ],
        boardNotes:
          "The relation between pressure and rms speed, and the law of equipartition of energy for different degrees of freedom, are the two concepts examiners return to — students often forget diatomic gases carry 5, not 3, degrees of freedom at room temperature.",
      },
      {
        id: "c11-physics-13",
        number: 13,
        title: "Oscillations",
        weightage: "≈4 marks",
        keyTopics: [
          "Periodic motion",
          "Simple harmonic motion",
          "Oscillations of a loaded spring",
          "Simple pendulum and energy in SHM",
        ],
        boardNotes:
          "Deriving the time period of a simple pendulum or a spring-mass system from the SHM differential equation is the standard 3-marker; energy in SHM (kinetic and potential varying with position) is the usual follow-up.",
      },
      {
        id: "c11-physics-14",
        number: 14,
        title: "Waves",
        weightage: "≈5 marks",
        keyTopics: [
          "Transverse and longitudinal waves",
          "Speed of a travelling wave",
          "Superposition and standing waves",
          "Beats",
        ],
        boardNotes:
          "Standing waves on a stretched string and the beats phenomenon are the recurring numericals; students frequently confuse wave speed (fixed by the medium) with particle speed (which varies with position and time).",
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
        weightage: "≈7 marks",
        keyTopics: [
          "Laws of chemical combination",
          "Mole concept and molar mass",
          "Empirical and molecular formula",
          "Stoichiometric calculations",
        ],
        boardNotes:
          "Empirical and molecular formula numericals from percentage composition are near-guaranteed; limiting reagent problems are the other repeat question, and skipping the mole-ratio table is the usual mark-loser.",
      },
      {
        id: "c11-chemistry-02",
        number: 2,
        title: "Structure of Atom",
        weightage: "≈9 marks",
        keyTopics: [
          "Bohr's model for hydrogen atom",
          "Quantum mechanical model",
          "Quantum numbers and orbitals",
          "Electronic configuration",
        ],
        boardNotes:
          "Writing electronic configurations using the Aufbau principle, Pauli exclusion and Hund's rule, and identifying the four quantum numbers for a given electron, are the two set-piece short questions; de Broglie wavelength numericals are the other recurring ask.",
      },
      {
        id: "c11-chemistry-03",
        number: 3,
        title: "Classification of Elements and Periodicity in Properties",
        weightage: "≈6 marks",
        keyTopics: [
          "Modern periodic law",
          "s-, p-, d-, f- blocks",
          "Periodic trends in properties",
        ],
        boardNotes:
          "Explaining a periodic trend (ionisation enthalpy, atomic radius, electronegativity) with a reason, not just stating the trend, is what the marking scheme rewards — anomalies like the Group 13/14 zig-zag are a common trap.",
      },
      {
        id: "c11-chemistry-04",
        number: 4,
        title: "Chemical Bonding and Molecular Structure",
        weightage: "≈7 marks",
        keyTopics: [
          "Bond parameters and VSEPR theory",
          "Valence bond theory and hybridisation",
          "Molecular orbital theory",
          "Hydrogen bonding",
        ],
        boardNotes:
          "Predicting shape by VSEPR theory and assigning hybridisation for a given molecule (like SF6, PCl5 or NH3) is the anchor question; molecular orbital diagrams for simple diatomics (O2, N2) are asked to justify bond order and magnetic behaviour.",
      },
      {
        id: "c11-chemistry-05",
        number: 5,
        title: "Thermodynamics",
        weightage: "≈9 marks",
        keyTopics: [
          "Internal energy and enthalpy",
          "Calorimetry and Hess's law",
          "Entropy and spontaneity",
          "Gibbs energy change",
        ],
        boardNotes:
          "Numericals combining Hess's law with enthalpy of formation or combustion are the standard long question; ΔG = ΔH − TΔS is used to predict spontaneity, and sign errors on ΔH for exothermic reactions are the most common slip.",
      },
      {
        id: "c11-chemistry-06",
        number: 6,
        title: "Equilibrium",
        weightage: "≈7 marks",
        keyTopics: [
          "Equilibrium constant and reaction quotient",
          "Le Chatelier's principle",
          "Ionisation of acids and bases, pH",
          "Buffers and solubility equilibria",
        ],
        boardNotes:
          "ICE-table numericals for Kc/Kp and pH calculations for weak acids or bases (using Ka and the degree of dissociation) are the recurring long questions; Le Chatelier's principle is tested as a predict-the-shift question on a given equilibrium.",
      },
      {
        id: "c11-chemistry-07",
        number: 7,
        title: "Redox Reactions",
        weightage: "≈4 marks",
        keyTopics: [
          "Oxidation number",
          "Balancing redox reactions",
          "Redox reactions and electrode processes",
        ],
        boardNotes:
          "Balancing a redox equation by the ion-electron (half-reaction) method in acidic or basic medium is the standard 3-marker; assigning oxidation numbers correctly to atoms in a polyatomic ion is where most marks are lost.",
      },
      {
        id: "c11-chemistry-08",
        number: 8,
        title: "Organic Chemistry – Some Basic Principles and Techniques",
        weightage: "≈11 marks",
        keyTopics: [
          "IUPAC nomenclature",
          "Isomerism",
          "Electronic effects and reaction mechanism",
          "Purification and analysis of organic compounds",
        ],
        boardNotes:
          "IUPAC naming and identifying the type of isomerism (chain, position, functional) for a given set of compounds is guaranteed every year; showing curved-arrow electron movement for inductive or resonance effects is what separates full marks from a bare correct answer.",
      },
      {
        id: "c11-chemistry-09",
        number: 9,
        title: "Hydrocarbons",
        weightage: "≈10 marks",
        keyTopics: [
          "Alkanes and conformations",
          "Alkenes and alkynes",
          "Aromatic hydrocarbons and benzene",
          "Carcinogenicity and toxicity",
        ],
        boardNotes:
          "Markovnikov/anti-Markovnikov addition to alkenes and the mechanism of electrophilic substitution in benzene are the two reliable long questions; naming the correct major product, not just the reaction type, is where marks are actually awarded.",
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
        weightage: "≈4 marks",
        keyTopics: [
          "Types of sets and subsets",
          "Venn diagrams",
          "Operations on sets",
          "Complement of a set",
        ],
        boardNotes:
          "Venn-diagram word problems on unions and intersections of two or three sets are the standard short question; the formula n(A∪B∪C) is expected to be written out before substituting values, not applied silently.",
      },
      {
        id: "c11-maths-02",
        number: 2,
        title: "Relations and Functions",
        weightage: "≈6 marks",
        keyTopics: [
          "Cartesian product of sets",
          "Relations",
          "Functions, domain and range",
        ],
        boardNotes:
          "Finding the domain and range of a given real function is the recurring short question; students frequently give the range as the whole codomain instead of computing it from the function's actual output values.",
      },
      {
        id: "c11-maths-03",
        number: 3,
        title: "Trigonometric Functions",
        weightage: "≈13 marks",
        keyTopics: [
          "Radian measure and unit circle",
          "Trigonometric identities",
          "Sum and difference formulae",
          "Multiple angle identities",
        ],
        boardNotes:
          "The heaviest chapter in the unit — proving a trigonometric identity using sum, difference and multiple-angle formulae is the guaranteed long question; starting from the more complicated side of the identity is the examiner-recommended approach.",
      },
      {
        id: "c11-maths-04",
        number: 4,
        title: "Complex Numbers and Quadratic Equations",
        weightage: "≈6 marks",
        keyTopics: [
          "Algebra of complex numbers",
          "Modulus and conjugate",
          "Argand plane and polar form",
          "Quadratic equations with complex roots",
        ],
        boardNotes:
          "Finding the modulus-argument (polar) form of a complex number and solving a quadratic with complex roots are the two repeat short questions; forgetting to rationalise the denominator when dividing complex numbers is the common slip.",
      },
      {
        id: "c11-maths-05",
        number: 5,
        title: "Linear Inequalities",
        weightage: "≈3 marks",
        keyTopics: [
          "Linear inequalities in one variable",
          "Algebraic solutions",
          "Representation on the number line",
        ],
        boardNotes:
          "Graphing the solution set of a system of two linear inequalities is the standard short question; the inequality direction flipping on multiplication or division by a negative number is the usual mark-loser.",
      },
      {
        id: "c11-maths-06",
        number: 6,
        title: "Permutations and Combinations",
        weightage: "≈6 marks",
        keyTopics: [
          "Fundamental principle of counting",
          "Factorial notation",
          "Permutations",
          "Combinations",
        ],
        boardNotes:
          "Word problems distinguishing when order matters (permutation) from when it doesn't (combination) are the anchor question; arrangements with repetition restrictions, like letters of a word or people who must sit together, are the recurring long question.",
      },
      {
        id: "c11-maths-07",
        number: 7,
        title: "Binomial Theorem",
        weightage: "≈4 marks",
        keyTopics: [
          "Binomial theorem for positive integral indices",
          "Pascal's triangle",
          "Simple applications",
        ],
        boardNotes:
          "Finding a specific term (the middle term, or the term independent of x) using the general term Tr+1 is the guaranteed short question; a sign error in (a − b)ⁿ expansions is the most common slip.",
      },
      {
        id: "c11-maths-08",
        number: 8,
        title: "Sequences and Series",
        weightage: "≈6 marks",
        keyTopics: [
          "Sequences and series",
          "Arithmetic mean",
          "Geometric progression",
          "Relationship between A.M. and G.M.",
        ],
        boardNotes:
          "Sum of a geometric progression to n terms, and the relationship between AM and GM for two numbers, are the recurring questions; special series (sum of squares or cubes of the first n natural numbers) are tested as a direct-formula short question.",
      },
      {
        id: "c11-maths-09",
        number: 9,
        title: "Straight Lines",
        weightage: "≈4 marks",
        keyTopics: [
          "Slope of a line",
          "Various forms of the equation of a line",
          "Distance of a point from a line",
        ],
        boardNotes:
          "Finding the equation of a line given two points, or a point and a slope, is the standard short question; the distance-of-a-point-from-a-line formula is the usual follow-up, and sign errors inside the absolute value are the common slip.",
      },
      {
        id: "c11-maths-10",
        number: 10,
        title: "Conic Sections",
        weightage: "≈6 marks",
        keyTopics: ["Circle", "Parabola", "Ellipse", "Hyperbola"],
        boardNotes:
          "Finding the equation of a circle, parabola or ellipse from given focus, directrix or vertex conditions is the anchor long question; identifying the correct standard form — which axis the conic opens along — before substituting is what the marking scheme checks first.",
      },
      {
        id: "c11-maths-11",
        number: 11,
        title: "Introduction to Three Dimensional Geometry",
        weightage: "≈2 marks",
        keyTopics: [
          "Coordinate axes and planes in space",
          "Coordinates of a point in space",
          "Distance between two points",
        ],
        boardNotes:
          "A light chapter, usually tested only through the distance formula and the section formula in three dimensions — a direct 2-mark numerical rather than a proof.",
      },
      {
        id: "c11-maths-12",
        number: 12,
        title: "Limits and Derivatives",
        weightage: "≈8 marks",
        keyTopics: [
          "Intuitive idea of limits",
          "Limits of trigonometric functions",
          "Derivative from first principle",
          "Algebra of derivatives",
        ],
        boardNotes:
          "Evaluating a limit of the standard (sin x)/x or (eˣ−1)/x form, and finding a derivative from first principles, are both guaranteed; the algebra of limits (sum, product, quotient rules) must be shown as separate steps, not skipped to the final answer.",
      },
      {
        id: "c11-maths-13",
        number: 13,
        title: "Statistics",
        weightage: "≈5 marks",
        keyTopics: [
          "Measures of dispersion",
          "Range and mean deviation",
          "Variance and standard deviation",
        ],
        boardNotes:
          "Mean deviation about the mean/median and variance/standard deviation for grouped data are the standard long question; the working table with the deviation column shown carries its own marks independent of the final number.",
      },
      {
        id: "c11-maths-14",
        number: 14,
        title: "Probability",
        weightage: "≈7 marks",
        keyTopics: [
          "Random experiments and sample space",
          "Events and their types",
          "Axiomatic approach to probability",
        ],
        boardNotes:
          "Classical probability word problems on cards, dice and coins dominate; correctly counting the sample space (using permutations/combinations where needed) is where most marks are lost, not the probability formula itself.",
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
        weightage: "≈2 marks",
        keyTopics: [
          "Characteristics of living organisms",
          "Diversity in the living world",
          "Taxonomic categories",
          "Binomial nomenclature",
        ],
        boardNotes:
          "Almost always a 1-2 mark question on taxonomic hierarchy or the rules of binomial nomenclature (genus capitalised, species lower case, both italicised) — a light chapter mainly tested through terminology.",
      },
      {
        id: "c11-biology-02",
        number: 2,
        title: "Biological Classification",
        weightage: "≈4 marks",
        keyTopics: [
          "Five kingdom classification",
          "Monera, Protista and Fungi",
          "Viruses, viroids and prions",
          "Lichens",
        ],
        boardNotes:
          "Distinguishing features of the five kingdoms, especially Monera vs Protista and the modes of nutrition in fungi, is the recurring short question; viruses are non-cellular and must not be described as belonging to any kingdom.",
      },
      {
        id: "c11-biology-03",
        number: 3,
        title: "Plant Kingdom",
        weightage: "≈4 marks",
        keyTopics: ["Algae", "Bryophytes", "Pteridophytes", "Gymnosperms"],
        boardNotes:
          "The alternation-of-generations diagram (haplontic, diplontic, haplo-diplontic life cycles) and a tabular comparison of algae, bryophytes, pteridophytes and gymnosperms are the standard long question.",
      },
      {
        id: "c11-biology-04",
        number: 4,
        title: "Animal Kingdom",
        weightage: "≈5 marks",
        keyTopics: [
          "Basis of classification",
          "Non-chordate phyla",
          "Phylum Chordata",
        ],
        boardNotes:
          "Classifying a named animal by its phylum or class using diagnostic features (symmetry, body cavity, segmentation) is the anchor question; the marking scheme wants the specific feature that identifies the group, not a general description of the animal.",
      },
      {
        id: "c11-biology-05",
        number: 5,
        title: "Morphology of Flowering Plants",
        weightage: "≈4 marks",
        keyTopics: [
          "Root, stem and leaf",
          "Inflorescence",
          "Flower, fruit and seed",
          "Floral formula and diagram",
        ],
        boardNotes:
          "Drawing and labelling the floral diagram and writing the floral formula for a named family (like Fabaceae or Solanaceae) is the guaranteed long question; every symbol in the formula is separately marked.",
      },
      {
        id: "c11-biology-06",
        number: 6,
        title: "Anatomy of Flowering Plants",
        weightage: "≈3 marks",
        keyTopics: [
          "Meristematic and permanent tissues",
          "Tissue systems",
          "Anatomy of dicot and monocot root, stem and leaf",
        ],
        boardNotes:
          "Labelled T.S. diagrams comparing dicot and monocot root or stem are the standard long question; secondary growth (vascular cambium activity) is the usual follow-up short question.",
      },
      {
        id: "c11-biology-07",
        number: 7,
        title: "Structural Organisation in Animals",
        weightage: "≈3 marks",
        keyTopics: [
          "Animal tissues",
          "Epithelial, connective, muscular and neural tissue",
          "Morphology and anatomy of frog",
        ],
        boardNotes:
          "The frog's digestive or circulatory system diagram, and distinguishing the four types of animal tissue with an example each, are the recurring questions — naming a tissue without its specific location loses marks.",
      },
      {
        id: "c11-biology-08",
        number: 8,
        title: "Cell: The Unit of Life",
        weightage: "≈5 marks",
        keyTopics: [
          "Cell theory",
          "Prokaryotic and eukaryotic cells",
          "Cell organelles",
          "Nucleus and chromosomes",
        ],
        boardNotes:
          "Labelled diagrams of the mitochondrion or chloroplast, and differences between prokaryotic and eukaryotic cells, are the anchor long question; the marking scheme wants structure linked to function, not structure alone.",
      },
      {
        id: "c11-biology-09",
        number: 9,
        title: "Biomolecules",
        weightage: "≈6 marks",
        keyTopics: [
          "Carbohydrates and lipids",
          "Proteins and nucleic acids",
          "Enzymes and their properties",
          "Metabolic basis for living",
        ],
        boardNotes:
          "Enzyme properties (effect of temperature, pH and substrate concentration on reaction rate) and the structural levels of a protein are the recurring long questions; naming the correct bond (peptide, glycosidic) in a given macromolecule is where marks are usually lost.",
      },
      {
        id: "c11-biology-10",
        number: 10,
        title: "Cell Cycle and Cell Division",
        weightage: "≈4 marks",
        keyTopics: [
          "Phases of the cell cycle",
          "Mitosis",
          "Meiosis",
          "Significance of cell division",
        ],
        boardNotes:
          "The stages of mitosis and meiosis with labelled diagrams, and the significance of crossing over in prophase I, are the standard long question; confusing the events of meiosis I with meiosis II is the most common slip.",
      },
      {
        id: "c11-biology-11",
        number: 11,
        title: "Photosynthesis in Higher Plants",
        weightage: "≈5 marks",
        keyTopics: [
          "Light reaction and photophosphorylation",
          "C3 and C4 pathways",
          "Photorespiration",
          "Factors affecting photosynthesis",
        ],
        boardNotes:
          "The light reaction (Z-scheme, photophosphorylation) and the Calvin cycle are the anchor long question; distinguishing C3 from C4 plants by leaf anatomy (Kranz anatomy) and their carboxylating enzyme is the recurring comparison.",
      },
      {
        id: "c11-biology-12",
        number: 12,
        title: "Respiration in Plants",
        weightage: "≈4 marks",
        keyTopics: [
          "Glycolysis",
          "Krebs cycle",
          "Electron transport system",
          "Respiratory quotient",
        ],
        boardNotes:
          "The net ATP yield from glycolysis, the Krebs cycle and the electron transport chain is the standard numerical-style question; students frequently misstate where each stage occurs — cytoplasm vs mitochondrial matrix vs inner membrane.",
      },
      {
        id: "c11-biology-13",
        number: 13,
        title: "Plant Growth and Development",
        weightage: "≈3 marks",
        keyTopics: [
          "Phases and rate of growth",
          "Differentiation and dedifferentiation",
          "Plant growth regulators",
          "Photoperiodism and vernalisation",
        ],
        boardNotes:
          "The physiological effects of the five plant growth regulators (auxin, gibberellin, cytokinin, ethylene, ABA) are tested as a match-the-hormone-to-its-effect question; photoperiodism (short-day vs long-day plants) is the other recurring short question.",
      },
      {
        id: "c11-biology-14",
        number: 14,
        title: "Breathing and Exchange of Gases",
        weightage: "≈3 marks",
        keyTopics: [
          "Human respiratory system",
          "Mechanism of breathing",
          "Transport of gases",
          "Disorders of the respiratory system",
        ],
        boardNotes:
          "The mechanism of inspiration and expiration (diaphragm and intercostal muscle action) and the oxygen dissociation curve are the standard questions; students often skip explaining why the curve is sigmoid (cooperative binding), which is the actual concept being tested.",
      },
      {
        id: "c11-biology-15",
        number: 15,
        title: "Body Fluids and Circulation",
        weightage: "≈4 marks",
        keyTopics: [
          "Blood and lymph",
          "Human circulatory system",
          "Cardiac cycle and ECG",
          "Disorders of the circulatory system",
        ],
        boardNotes:
          "A labelled diagram of the human heart with blood flow direction, and reading a normal ECG trace (P, QRS, T waves), are the anchor questions; naming a cardiac disorder without linking it to the correct chamber or valve loses marks.",
      },
      {
        id: "c11-biology-16",
        number: 16,
        title: "Excretory Products and their Elimination",
        weightage: "≈3 marks",
        keyTopics: [
          "Modes of excretion",
          "Human excretory system",
          "Urine formation and concentration",
          "Disorders of the excretory system",
        ],
        boardNotes:
          "The nephron diagram with the mechanism of urine formation (filtration, reabsorption, secretion) is the guaranteed long question; the role of ADH and the counter-current mechanism in concentrating urine is the usual follow-up.",
      },
      {
        id: "c11-biology-17",
        number: 17,
        title: "Locomotion and Movement",
        weightage: "≈2 marks",
        keyTopics: [
          "Types of movement",
          "Muscle structure and contraction",
          "Skeletal system and joints",
          "Disorders of the muscular and skeletal system",
        ],
        boardNotes:
          "The sliding filament theory of muscle contraction and classifying joints with an example each are the recurring short questions; a light chapter that rarely carries a full long-answer question on its own.",
      },
      {
        id: "c11-biology-18",
        number: 18,
        title: "Neural Control and Coordination",
        weightage: "≈3 marks",
        keyTopics: [
          "Human neural system",
          "Neuron and generation of nerve impulse",
          "Transmission of impulses across a synapse",
          "Human brain",
        ],
        boardNotes:
          "The generation and transmission of a nerve impulse across a synapse, and a labelled diagram of the human brain, are the standard long question; resting vs action potential — which ions move, and in which direction — is where most marks are lost.",
      },
      {
        id: "c11-biology-19",
        number: 19,
        title: "Chemical Coordination and Integration",
        weightage: "≈3 marks",
        keyTopics: [
          "Endocrine glands and hormones",
          "Hormones of the heart, kidney and GI tract",
          "Mechanism of hormone action",
        ],
        boardNotes:
          "Matching each endocrine gland to its hormone and the hormone's effect is the recurring table-style question; hypo- and hyper-secretion disorders (like of the thyroid) are the usual short-answer follow-up.",
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
        weightage: "≈6 marks",
        keyTopics: [
          "Khushwant Singh",
          "Grandmother's character sketch",
          "Bond across generations",
        ],
        boardNotes:
          "The grandmother's transformation across three phases of the narrator's life is the standard long answer; tracing all three stages — the village, the city before the dog, the city after — is what earns full marks, not a description of any one phase alone.",
      },
      {
        id: "c11-english-02",
        number: 2,
        title: "A Photograph",
        weightage: "≈4 marks",
        keyTopics: [
          "Poem — Shirley Toulson",
          "Transience of time",
          "Memory and loss",
        ],
        boardNotes:
          "The poem's central irony — the sea's constancy set against the mother's mortality — is the extract-based question examiners return to; 'this circumstance' and the closing silence as symbols of unspoken grief are the value points expected by name.",
      },
      {
        id: "c11-english-03",
        number: 3,
        title: "We’re Not Afraid to Die... if We Can All Be Together",
        weightage: "≈6 marks",
        keyTopics: [
          "Gordon Cook and Alan East",
          "Survival at sea",
          "Courage and family unity",
        ],
        boardNotes:
          "How the family's courage and teamwork saved them during the storm is the near-certain long question; naming specific actions — the makeshift sea anchor, the emergency raft — rather than a general account of the storm is what the scheme rewards.",
      },
      {
        id: "c11-english-04",
        number: 4,
        title: "Discovering Tut: the Saga Continues",
        weightage: "≈5 marks",
        keyTopics: [
          "A.R. Williams",
          "Tutankhamun's mummy and CT scan",
          "Archaeology and forensic science",
        ],
        boardNotes:
          "The role of forensic technology (the CT scan) in resolving old myths about Tutankhamun's death is the standard question; the finding that malaria, not murder, likely caused his death is the fact examiners check for by name.",
      },
      {
        id: "c11-english-05",
        number: 5,
        title: "The Laburnum Top",
        weightage: "≈3 marks",
        keyTopics: [
          "Poem — Ted Hughes",
          "Imagery of stillness and motion",
          "Bird and tree symbiosis",
        ],
        boardNotes:
          "The contrast between the tree's stillness and its sudden motion when the goldfinch arrives is the extract question examiners set; naming the goldfinch and its call is expected, not a vague description of 'a bird'.",
      },
      {
        id: "c11-english-06",
        number: 6,
        title: "The Voice of the Rain",
        weightage: "≈3 marks",
        keyTopics: [
          "Poem — Walt Whitman",
          "Water cycle as metaphor",
          "Poetry and eternal return",
        ],
        boardNotes:
          "The water cycle as a metaphor for poetry and renewal is the central idea tested; the paradox in the rain's own answer — that it descends to lave the drought, yet has its origin and return in the sea — is the line examiners quote in the extract.",
      },
      {
        id: "c11-english-07",
        number: 7,
        title: "The Ailing Planet: the Green Movement’s Role",
        weightage: "≈5 marks",
        keyTopics: [
          "Nani Palkhivala",
          "Sustainable development",
          "Holistic view of the earth",
        ],
        boardNotes:
          "The distinction between anthropocentrism and biocentrism in environmental thinking is the concept examiners check for by name; supporting figures like the ozone hole support the answer but are not the core point being tested.",
      },
      {
        id: "c11-english-08",
        number: 8,
        title: "Childhood",
        weightage: "≈4 marks",
        keyTopics: [
          "Poem — Markus Natten",
          "Loss of innocence",
          "Growing up and individuality",
        ],
        boardNotes:
          "The specific moments the poet identifies as marking the loss of childhood innocence — age eleven, no longer believing in Adam and Eve, no longer believing God spoke in the tree — are what the marking scheme wants named, not a generic 'growing up is hard' answer.",
      },
      {
        id: "c11-english-09",
        number: 9,
        title: "The Adventure",
        weightage: "≈5 marks",
        keyTopics: [
          "Jayant Narlikar",
          "Alternate history and parallel worlds",
          "Catastrophe theory and quantum ideas",
        ],
        boardNotes:
          "Distinguishing catastrophe theory (multiple co-existing histories) from simple predestination is the concept tested; the Battle of Panipat as the story's turning point should be named explicitly in any answer on the alternate timeline.",
      },
      {
        id: "c11-english-10",
        number: 10,
        title: "Silk Road",
        weightage: "≈5 marks",
        keyTopics: [
          "Nick Middleton",
          "Travelogue to Mount Kailash",
          "Landscape and hardship",
        ],
        boardNotes:
          "The physical hardships of the journey (altitude sickness, extreme cold) alongside the cultural significance of Mount Kailash are both expected in a full-marks answer; describing only the scenery without the pilgrimage context misses half the question.",
      },
      {
        id: "c11-english-11",
        number: 11,
        title: "Father to Son",
        weightage: "≈3 marks",
        keyTopics: [
          "Poem — Elizabeth Jennings",
          "Generation gap",
          "Alienation and reconciliation",
        ],
        boardNotes:
          "The poem's central irony — a father and son who share blood but not understanding — is the extract question examiners set; the surrounding silence and the closing wish to truly know one another are the lines the marking scheme quotes.",
      },
    ],
  },

  // --------------------------------------------------------------- Economics
  // Indian Economic Development — the Part B book for the Commerce/Humanities
  // Economics paper. Part A ("Statistics for Economics") is not modelled.
  {
    id: "c11-economics",
    name: "Economics",
    classLevel: 11,
    icon: "TrendingUp",
    color: "gold",
    chapters: [
      {
        id: "c11-economics-01",
        number: 1,
        title: "Indian Economy on the Eve of Independence",
        weightage: "≈5 marks",
        keyTopics: [
          "Colonial economic policies",
          "Agricultural sector under British rule",
          "Deindustrialisation of handicrafts",
          "Occupational structure and demographic condition",
        ],
        boardNotes:
          "Explaining the low level of economic development at independence — stagnant agriculture, ruined handicrafts, and a colonial trade policy designed to serve Britain — is the standard long question; naming specific causes rather than describing poverty in general is what the marking scheme rewards.",
      },
      {
        id: "c11-economics-02",
        number: 2,
        title: "Indian Economy 1950-1990",
        weightage: "≈5 marks",
        keyTopics: [
          "Goals of five year plans",
          "Agriculture — land reforms and the Green Revolution",
          "Industry — Industrial Policy Resolution 1956 and licensing",
          "Trade policy — import substitution",
        ],
        boardNotes:
          "Evaluating the Green Revolution (both its yield gains and its regional/farmer-size inequities) and explaining why the licence-permit system was criticised are the two recurring long questions; a one-sided answer that omits the criticism loses marks.",
      },
      {
        id: "c11-economics-03",
        number: 3,
        title: "Liberalisation, Privatisation and Globalisation: An Appraisal",
        weightage: "≈5 marks",
        keyTopics: [
          "Background of the 1991 economic crisis",
          "Liberalisation, privatisation and globalisation as policy",
          "Disinvestment",
          "Outcomes of economic reforms since 1991",
        ],
        boardNotes:
          "Distinguishing the three components of the 1991 reforms — liberalisation, privatisation, globalisation — with a concrete measure under each is the anchor question; assessing reforms against both growth and equity/employment outcomes is expected, not growth figures alone.",
      },
      {
        id: "c11-economics-04",
        number: 4,
        title: "Human Capital Formation in India",
        weightage: "≈4 marks",
        keyTopics: [
          "Human capital versus physical capital",
          "Sources of human capital formation",
          "Growth of the education sector in India",
          "State of health infrastructure",
        ],
        boardNotes:
          "Distinguishing human capital from human development, and listing the sources of human capital formation (education, health, on-the-job training) with an example each, is the standard short question.",
      },
      {
        id: "c11-economics-05",
        number: 5,
        title: "Rural Development",
        weightage: "≈4 marks",
        keyTopics: [
          "Credit and marketing in rural development",
          "Agricultural diversification",
          "Sustainable development and organic farming",
          "Rural banking and self-help groups",
        ],
        boardNotes:
          "The role of institutional credit (cooperatives, regional rural banks, self-help groups) in reducing farmers' dependence on moneylenders is the recurring long question; naming the specific institution rather than 'banks' in general is where marks are actually awarded.",
      },
      {
        id: "c11-economics-06",
        number: 6,
        title: "Employment: Growth, Informalisation and Other Issues",
        weightage: "≈4 marks",
        keyTopics: [
          "Workers and employment — key concepts",
          "Growth and changing structure of employment",
          "Informalisation of the Indian workforce",
          "Government schemes for employment generation",
        ],
        boardNotes:
          "Distinguishing formal (organised) from informal (unorganised) sector employment by job security and social protection, not just sector name, is the concept examiners check for; naming a specific government employment scheme (like MGNREGA) is the usual follow-up.",
      },
      {
        id: "c11-economics-07",
        number: 7,
        title: "Environment and Sustainable Development",
        weightage: "≈4 marks",
        keyTopics: [
          "Functions of the environment",
          "State of India's environment",
          "Sustainable development",
          "Strategies for sustainable development",
        ],
        boardNotes:
          "Listing the four functions of the environment (supplying resources, assimilating waste, sustaining life, aesthetic value) and explaining why development must be sustainable across generations are the recurring short questions.",
      },
      {
        id: "c11-economics-08",
        number: 8,
        title: "Comparative Development Experiences of India and Its Neighbours",
        weightage: "≈7 marks",
        keyTopics: [
          "Development strategies of India, Pakistan and China",
          "Demographic indicators across the three economies",
          "GDP growth and sectoral contribution compared",
          "Human development indicators compared",
        ],
        boardNotes:
          "A tabular comparison of India, Pakistan and China on a named indicator (GDP growth rate, or a human development indicator) is the standard long question; stating the specific development strategy each country adopted, not just the outcome numbers, is what the scheme rewards.",
      },
    ],
  },

  // ------------------------------------------------ Statistics for Economics
  // Part A of the XI Economics paper — a separate NCERT book from "Indian
  // Economic Development" (Part B, modelled above as "c11-economics"), so it
  // gets its own chapter numbering starting at 1.
  {
    id: "c11-statistics",
    name: "Statistics for Economics",
    classLevel: 11,
    icon: "BarChart3",
    color: "gold",
    chapters: [
      {
        id: "c11-statistics-01",
        number: 1,
        title: "Introduction",
        weightage: "≈2 marks",
        keyTopics: [
          "What is Economics?",
          "Meaning and scope of statistics",
          "Functions and importance of statistics in Economics",
        ],
        boardNotes:
          "Explaining why an economist needs statistics — to describe, compare and forecast economic variables — with a one-line functional definition is the standard short question here.",
      },
      {
        id: "c11-statistics-02",
        number: 2,
        title: "Collection of Data",
        weightage: "≈4 marks",
        keyTopics: [
          "Primary and secondary sources of data",
          "Concepts of sampling; census versus sample survey",
          "Methods of collecting data",
          "Census of India and the National Sample Survey Organisation (NSSO)",
        ],
        boardNotes:
          "Distinguishing primary from secondary data with an example, and naming Census of India versus NSSO as the two key official secondary sources (what each actually surveys), is the recurring question; a generic 'government data' answer does not score.",
      },
      {
        id: "c11-statistics-03",
        number: 3,
        title: "Organisation of Data",
        weightage: "≈4 marks",
        keyTopics: [
          "Meaning and types of variables",
          "Raw data versus arrayed data",
          "Frequency distribution — class intervals, class limits, class width",
        ],
        boardNotes:
          "Constructing a frequency distribution table from a given raw data set, correctly choosing exclusive versus inclusive class intervals, is the standard numerical; the concept check is distinguishing a discrete from a continuous variable.",
      },
      {
        id: "c11-statistics-04",
        number: 4,
        title: "Presentation of Data",
        weightage: "≈5 marks",
        keyTopics: [
          "Tabular presentation of data",
          "Diagrammatic presentation — bar diagrams and pie diagrams",
          "Frequency diagrams — histogram, polygon and ogive",
          "Arithmetic line graphs (time series graphs)",
        ],
        boardNotes:
          "Drawing a specified diagram (usually a histogram, ogive or pie diagram) from given data, with correctly labelled axes and scale, is the standard question; picking the right diagram type for the kind of data given is what the marking scheme actually checks first.",
      },
      {
        id: "c11-statistics-05",
        number: 5,
        title: "Measures of Central Tendency",
        weightage: "≈10 marks",
        keyTopics: [
          "Arithmetic mean — direct, short-cut and step-deviation methods",
          "Median, including for grouped data",
          "Mode, including for grouped data",
        ],
        boardNotes:
          "A numerical calculating mean, median or mode from grouped data is the anchor long question every year; using the wrong class-interval convention (exclusive/inclusive) before applying the formula is the most common way marks are lost.",
      },
      {
        id: "c11-statistics-06",
        number: 6,
        title: "Correlation",
        weightage: "≈8 marks",
        keyTopics: [
          "Meaning and properties of correlation; scatter diagram",
          "Karl Pearson's coefficient of correlation (two-variable ungrouped data)",
          "Spearman's rank correlation — non-repeated and repeated ranks",
        ],
        boardNotes:
          "Computing Karl Pearson's coefficient or Spearman's rank correlation (including the repeated-ranks correction term) from a given data set is the standard numerical; interpreting the sign and magnitude of the result in words is the follow-up part that is often skipped.",
      },
      {
        id: "c11-statistics-07",
        number: 7,
        title: "Index Numbers",
        weightage: "≈7 marks",
        keyTopics: [
          "Meaning and types of index numbers",
          "Wholesale Price Index, Consumer Price Index and Index of Industrial Production",
          "Uses of index numbers; inflation and index numbers",
          "Simple aggregative method",
        ],
        boardNotes:
          "Constructing an index number by the simple aggregative method, and distinguishing WPI from CPI by what each measures and who uses it, is the recurring question; naming CPI as the basis for dearness allowance revision is a common follow-up.",
      },
    ],
  },
];
