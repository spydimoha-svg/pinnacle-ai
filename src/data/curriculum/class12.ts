import type { Subject } from "../../lib/types";

// CLASS 12 — CBSE board year. Chapter lists, titles and numbering verified against
// the CURRENT rationalised NCERT textbooks and the official CBSE Senior Secondary
// Curriculum 2025-26 (cbseacademic.nic.in/web_material/CurriculumMain26/SrSec/).
//
// Verification notes (July 2026):
// - Physics: 14 chapters (Part I 1-8, Part II 9-14). Communication Systems deleted.
//   Unit marks: I+II=16, III+IV=17, V+VI=18, VII+VIII=12, IX=7 → 70.
// - Chemistry: 10 chapters (Part I 1-5, Part II 6-10). Solid State, Surface Chemistry,
//   General Principles of Isolation, p-Block, Polymers and Chemistry in Everyday Life
//   are all deleted. K2Cr2O7/KMnO4, actinides, vitamins, hormones and nucleic acids
//   are all still IN (confirmed from the official syllabus PDF — many sites say otherwise).
// - Maths: 13 chapters (Part I 1-6, Part II 7-13). 3D Geometry is lines-only (planes
//   deleted); Probability is Bayes-only (random variables / binomial distribution deleted).
// - Biology: 13 chapters. Reproduction in Organisms, Strategies for Enhancement in Food
//   Production and Environmental Issues were deleted. Unit marks: 16/20/12/12/10 → 70.
// - English: Flamingo prose (8) → Flamingo poetry (5) → Vistas (6) = 19, flat numbering.
//   Deleted: "An Elementary School Classroom in a Slum" (Flamingo), "Should Wizard Hit
//   Mommy?" and "Evans Tries an O-Level" (Vistas). Literature section = 40 marks
//   (Flamingo 27, Vistas 13).

export const CLASS_12_SUBJECTS: Subject[] = [
  // ==========================================================================
  // PHYSICS
  // ==========================================================================
  {
    id: "c12-physics",
    name: "Physics",
    classLevel: 12,
    icon: "Atom",
    color: "violet",
    chapters: [
      {
        id: "c12-physics-01",
        number: 1,
        title: "Electric Charges and Fields",
        weightage: "≈4 marks",
        keyTopics: [
          "Coulomb's law and superposition",
          "Electric field and field lines",
          "Electric dipole and torque",
          "Gauss's theorem and its applications",
        ],
        boardNotes:
          "Gauss's theorem applied to the infinite wire, the infinite plane sheet and the thin spherical shell is the recurring derivation — the syllabus names exactly those three, and marks go for drawing and justifying the Gaussian surface, not just the final formula.",
      },
      {
        id: "c12-physics-02",
        number: 2,
        title: "Electrostatic Potential and Capacitance",
        weightage: "≈5 marks",
        keyTopics: [
          "Potential due to a point charge and dipole",
          "Equipotential surfaces",
          "Capacitors, combinations and dielectrics",
          "Energy stored in a capacitor",
        ],
        boardNotes:
          "The dielectric-slab question (battery connected vs disconnected) is the classic trap — state which quantity stays constant before computing; note the syllabus now says energy stored is 'formulae only, no derivation'.",
      },
      {
        id: "c12-physics-03",
        number: 3,
        title: "Current Electricity",
        weightage: "≈7 marks",
        keyTopics: [
          "Drift velocity, mobility and Ohm's law",
          "Resistivity and temperature dependence",
          "EMF, internal resistance and cell combinations",
          "Kirchhoff's rules and Wheatstone bridge",
        ],
        boardNotes:
          "Drift velocity → Ohm's law and the Wheatstone bridge balance condition are the repeat asks; potentiometer and metre bridge now survive only in the practical syllabus, so don't burn time on them as theory derivations.",
      },
      {
        id: "c12-physics-04",
        number: 4,
        title: "Moving Charges and Magnetism",
        weightage: "≈5 marks",
        keyTopics: [
          "Biot–Savart law and circular loop",
          "Ampere's law and infinitely long straight wire",
          "Force on a moving charge and on a conductor",
          "Torque on a current loop; moving coil galvanometer",
        ],
        boardNotes:
          "The moving coil galvanometer — current sensitivity and conversion to ammeter/voltmeter — is the set-piece long answer; the cyclotron was rationalised out and the solenoid is qualitative only, so don't prepare those derivations.",
      },
      {
        id: "c12-physics-05",
        number: 5,
        title: "Magnetism and Matter",
        weightage: "≈3 marks",
        keyTopics: [
          "Bar magnet as an equivalent solenoid",
          "Magnetic field lines",
          "Magnetisation of materials",
          "Dia-, para- and ferromagnetic substances",
        ],
        boardNotes:
          "Now an almost entirely qualitative chapter — the reliable 2-marker is comparing dia-, para- and ferromagnetic substances with examples and the effect of temperature; Earth's magnetism is no longer in the syllabus.",
      },
      {
        id: "c12-physics-06",
        number: 6,
        title: "Electromagnetic Induction",
        weightage: "≈4 marks",
        keyTopics: [
          "Faraday's laws of induction",
          "Lenz's law and induced EMF",
          "Self induction",
          "Mutual induction",
        ],
        boardNotes:
          "Self and mutual inductance of solenoid coils is the standard numerical; Lenz's law questions expect an explicit energy-conservation justification, not just the direction of induced current — eddy currents were rationalised out.",
      },
      {
        id: "c12-physics-07",
        number: 7,
        title: "Alternating Current",
        weightage: "≈5 marks",
        keyTopics: [
          "Peak and RMS values",
          "Reactance, impedance and series LCR (phasors)",
          "Resonance, power factor and wattless current",
          "AC generator and transformer",
        ],
        boardNotes:
          "Series LCR resonance and the transformer are the repeat 5-markers; the phasor diagram itself carries marks, and power factor / wattless current is the standard 2-mark follow-up.",
      },
      {
        id: "c12-physics-08",
        number: 8,
        title: "Electromagnetic Waves",
        weightage: "≈3 marks",
        keyTopics: [
          "Displacement current",
          "Characteristics and transverse nature of EM waves",
          "Electromagnetic spectrum and uses",
        ],
        boardNotes:
          "Almost always 1–2 marks of pure recall — order the spectrum by frequency/wavelength and give one use per band; displacement current is the only conceptual question that reliably appears.",
      },
      {
        id: "c12-physics-09",
        number: 9,
        title: "Ray Optics and Optical Instruments",
        weightage: "≈7 marks",
        keyTopics: [
          "Spherical mirrors and mirror formula",
          "Total internal reflection and optical fibres",
          "Lens maker's formula and combinations of lenses",
          "Prism, microscope and astronomical telescope",
        ],
        boardNotes:
          "Refraction at a spherical surface → lens maker's formula, and the microscope/astronomical telescope ray diagram with magnifying power, are near-certain; a mislabelled ray diagram costs more marks than the algebra ever will.",
      },
      {
        id: "c12-physics-10",
        number: 10,
        title: "Wave Optics",
        weightage: "≈8 marks",
        keyTopics: [
          "Wavefront and Huygens' principle",
          "Laws of reflection and refraction using wavefronts",
          "Young's double-slit experiment and fringe width",
          "Single-slit diffraction (qualitative)",
        ],
        boardNotes:
          "CBSE now specifies fringe width as 'final expression only, no derivation' — so expect β = λD/d numericals instead; diffraction is qualitative and polarisation is out, which makes proving the laws of reflection/refraction by Huygens' principle the real derivation to drill.",
      },
      {
        id: "c12-physics-11",
        number: 11,
        title: "Dual Nature of Radiation and Matter",
        weightage: "≈4 marks",
        keyTopics: [
          "Photoelectric effect; Hertz and Lenard's observations",
          "Einstein's photoelectric equation",
          "Experimental study and stopping potential",
          "de Broglie relation and matter waves",
        ],
        boardNotes:
          "The stopping-potential vs frequency graph tied to Einstein's equation is the standard 3-marker; students routinely lose marks by not stating that intensity raises photocurrent but never the maximum kinetic energy.",
      },
      {
        id: "c12-physics-12",
        number: 12,
        title: "Atoms",
        weightage: "≈4 marks",
        keyTopics: [
          "Alpha-particle scattering and Rutherford's model",
          "Bohr model of the hydrogen atom",
          "Radius, velocity and energy in the nth orbit",
          "Hydrogen line spectra (qualitative)",
        ],
        boardNotes:
          "Bohr's postulates leading to the expression for radius and energy of the nth orbit is the reliable derivation; line spectra are qualitative only now, so learn the series names and transitions rather than grinding Rydberg numericals.",
      },
      {
        id: "c12-physics-13",
        number: 13,
        title: "Nuclei",
        weightage: "≈4 marks",
        keyTopics: [
          "Composition and size of the nucleus",
          "Nuclear force",
          "Mass defect and binding energy",
          "BE per nucleon curve; fission and fusion",
        ],
        boardNotes:
          "The binding-energy-per-nucleon curve is asked almost every year and you must read BOTH fission and fusion off the same graph; radioactivity, the decay law and half-life were rationalised out of this chapter entirely.",
      },
      {
        id: "c12-physics-14",
        number: 14,
        title: "Semiconductor Electronics: Materials, Devices and Simple Circuits",
        weightage: "≈7 marks",
        keyTopics: [
          "Energy bands in conductors, semiconductors and insulators",
          "Intrinsic and extrinsic semiconductors (p and n type)",
          "p-n junction and I-V characteristics",
          "Diode as a rectifier",
        ],
        boardNotes:
          "The full-wave rectifier circuit with input/output waveforms is the guaranteed long answer; with Zener, LED, photodiode, solar cell, transistors and logic gates all rationalised out, the whole 7 marks now rest on the p-n junction and the rectifier.",
      },
    ],
  },

  // ==========================================================================
  // CHEMISTRY
  // ==========================================================================
  {
    id: "c12-chemistry",
    name: "Chemistry",
    classLevel: 12,
    icon: "FlaskConical",
    color: "mint",
    chapters: [
      {
        id: "c12-chemistry-01",
        number: 1,
        title: "Solutions",
        weightage: "≈7 marks",
        keyTopics: [
          "Types of solutions and concentration",
          "Raoult's law and solubility of gases",
          "Colligative properties",
          "Abnormal molar mass and van't Hoff factor",
        ],
        boardNotes:
          "Numericals on depression in freezing point / elevation in boiling point carrying the van't Hoff factor are near-certain; the mark is lost by ignoring association or dissociation of the solute rather than by the arithmetic.",
      },
      {
        id: "c12-chemistry-02",
        number: 2,
        title: "Electrochemistry",
        weightage: "≈9 marks",
        keyTopics: [
          "Galvanic cells, EMF and standard electrode potential",
          "Nernst equation and its applications",
          "Conductance, molar conductivity and Kohlrausch's law",
          "Batteries, fuel cells and corrosion",
        ],
        boardNotes:
          "The highest-weighted unit in the paper — the Nernst equation numerical and the ΔG° = −nFE°cell link appear almost every year; write the balanced cell reaction and identify n BEFORE substituting, or the sign of the answer goes wrong.",
      },
      {
        id: "c12-chemistry-03",
        number: 3,
        title: "Chemical Kinetics",
        weightage: "≈7 marks",
        keyTopics: [
          "Rate of reaction and factors affecting it",
          "Order and molecularity; rate law",
          "Integrated rate equations and half-life (zero and first order)",
          "Collision theory, activation energy and Arrhenius equation",
        ],
        boardNotes:
          "The first-order k = (2.303/t)log(a/(a−x)) numerical is a fixture and the two-temperature Arrhenius question is the other repeat; carrying units on k is the fastest way to prove the order and pick up the reasoning mark.",
      },
      {
        id: "c12-chemistry-04",
        number: 4,
        title: "The d- and f-Block Elements",
        weightage: "≈7 marks",
        keyTopics: [
          "General trends in first-row transition metals",
          "Variable oxidation states, colour and magnetic properties",
          "Preparation and properties of K₂Cr₂O₇ and KMnO₄",
          "Lanthanide contraction and actinides",
        ],
        boardNotes:
          "Reason-based questions dominate ('why is Mn²⁺ stable', 'why do transition metals form alloys/interstitial compounds'); the K₂Cr₂O₇ and KMnO₄ preparations plus their oxidising reactions in acidic medium are the recurring 3-marker — both are still very much in the syllabus.",
      },
      {
        id: "c12-chemistry-05",
        number: 5,
        title: "Coordination Compounds",
        weightage: "≈7 marks",
        keyTopics: [
          "Ligands, coordination number and IUPAC nomenclature",
          "Werner's theory and valence bond theory",
          "Crystal field theory, colour and magnetism",
          "Structure, stereoisomerism and importance",
        ],
        boardNotes:
          "Hybridisation of a named complex (e.g. [Fe(CN)₆]³⁻) with its magnetic moment is asked nearly every year; CFT splitting read against the spectrochemical series to explain colour and inner- vs outer-orbital complexes is the standard 3-marker.",
      },
      {
        id: "c12-chemistry-06",
        number: 6,
        title: "Haloalkanes and Haloarenes",
        weightage: "≈6 marks",
        keyTopics: [
          "Nature of the C–X bond",
          "Substitution mechanisms (SN1 and SN2)",
          "Optical rotation and chirality",
          "Haloarenes and directive influence of halogen",
        ],
        boardNotes:
          "SN1 vs SN2 reactivity order plus the mechanism itself carry the marks — and the marks are lost by omitting stereochemistry: SN2 gives inversion, SN1 gives racemisation. Environmental effects of freons/DDT are easy 1-markers.",
      },
      {
        id: "c12-chemistry-07",
        number: 7,
        title: "Alcohols, Phenols and Ethers",
        weightage: "≈6 marks",
        keyTopics: [
          "Preparation and properties of alcohols",
          "Acidic nature of phenol; electrophilic substitution",
          "Mechanism of dehydration of alcohols",
          "Ethers — Williamson synthesis and properties",
        ],
        boardNotes:
          "The acidity comparison (phenol vs alcohol vs substituted phenols) justified by resonance / electron effects is a fixture; Williamson synthesis, Reimer–Tiemann and Kolbe's reaction are the named reactions that recur in the conversion question.",
      },
      {
        id: "c12-chemistry-08",
        number: 8,
        title: "Aldehydes, Ketones and Carboxylic Acids",
        weightage: "≈8 marks",
        keyTopics: [
          "Nature of carbonyl group; nucleophilic addition mechanism",
          "Reactivity of alpha hydrogen",
          "Named reactions (Aldol, Cannizzaro, Clemmensen)",
          "Acidic nature and properties of carboxylic acids",
        ],
        boardNotes:
          "The heaviest organic chapter — distinguishing tests (Tollens', Fehling's, iodoform) and named reactions (Aldol, Cannizzaro, Hell–Volhard–Zelinsky) are the dependable marks, while the multi-step conversion is where most students bleed them.",
      },
      {
        id: "c12-chemistry-09",
        number: 9,
        title: "Amines",
        weightage: "≈6 marks",
        keyTopics: [
          "Classification, structure and preparation",
          "Basicity of amines",
          "Identification of primary, secondary and tertiary amines",
          "Diazonium salts and their reactions",
        ],
        boardNotes:
          "Basic strength order of amines in the gas phase vs in aqueous solution is asked constantly and needs the solvation argument; diazonium conversions (Sandmeyer, Gattermann) make this chapter the backbone of the organic conversion question.",
      },
      {
        id: "c12-chemistry-10",
        number: 10,
        title: "Biomolecules",
        weightage: "≈7 marks",
        keyTopics: [
          "Carbohydrates — mono, oligo and polysaccharides",
          "Proteins, peptide bond, structure and denaturation",
          "Enzymes, vitamins and hormones",
          "Nucleic acids — DNA and RNA",
        ],
        boardNotes:
          "Almost pure recall, so it is the cheapest 7 marks in the paper — DNA vs RNA differences, the four levels of protein structure and vitamin deficiency diseases repeat yearly; vitamins, hormones and nucleic acids are all still in the syllabus despite what many guides claim.",
      },
    ],
  },

  // ==========================================================================
  // MATHEMATICS
  // ==========================================================================
  {
    id: "c12-maths",
    name: "Mathematics",
    classLevel: 12,
    icon: "Sigma",
    color: "gold",
    chapters: [
      {
        id: "c12-maths-01",
        number: 1,
        title: "Relations and Functions",
        weightage: "≈5 marks",
        keyTopics: [
          "Types of relations",
          "Equivalence relations",
          "One-one and onto functions",
        ],
        boardNotes:
          "Proving a given relation is an equivalence relation is the standard 5-marker — reflexive, symmetric and transitive must each be shown separately and explicitly, because the marking scheme awards them as separate marks.",
      },
      {
        id: "c12-maths-02",
        number: 2,
        title: "Inverse Trigonometric Functions",
        weightage: "≈3 marks",
        keyTopics: [
          "Definition, domain and range",
          "Principal value branch",
          "Graphs of inverse trigonometric functions",
        ],
        boardNotes:
          "Nearly always a 1–2 mark principal-value question; the trap is quoting an answer outside the principal branch, which scores zero however clean the working — properties/identities were rationalised out.",
      },
      {
        id: "c12-maths-03",
        number: 3,
        title: "Matrices",
        weightage: "≈5 marks",
        keyTopics: [
          "Order, types and equality of matrices",
          "Operations and their properties",
          "Transpose; symmetric and skew-symmetric matrices",
          "Invertible matrices",
        ],
        boardNotes:
          "Expressing a matrix as the sum of a symmetric and a skew-symmetric matrix is the recurring 3-marker; the rest surfaces as 1-mark MCQs on order, equality and non-commutativity of multiplication.",
      },
      {
        id: "c12-maths-04",
        number: 4,
        title: "Determinants",
        weightage: "≈5 marks",
        keyTopics: [
          "Determinants up to 3×3; area of a triangle",
          "Minors, cofactors and adjoint",
          "Inverse of a square matrix",
          "Solving linear equations by the matrix method",
        ],
        boardNotes:
          "Solving a three-variable system by X = A⁻¹B is a near-certain 5-marker — always check |A| ≠ 0 and say so, since consistency/inconsistency is itself a marked step.",
      },
      {
        id: "c12-maths-05",
        number: 5,
        title: "Continuity and Differentiability",
        weightage: "≈8 marks",
        keyTopics: [
          "Continuity and differentiability",
          "Chain rule; implicit and inverse trig derivatives",
          "Logarithmic and exponential differentiation",
          "Parametric forms and second order derivatives",
        ],
        boardNotes:
          "Logarithmic differentiation of xʸ-type functions and second-order derivatives of parametric forms repeat every year; checking continuity at a point demands LHL = RHL = f(a) written out explicitly — Rolle's and Mean Value theorems were rationalised out.",
      },
      {
        id: "c12-maths-06",
        number: 6,
        title: "Application of Derivatives",
        weightage: "≈7 marks",
        keyTopics: [
          "Rate of change of quantities",
          "Increasing and decreasing functions",
          "Maxima and minima",
        ],
        boardNotes:
          "The maxima–minima word problem (largest volume / least cost) is the guaranteed 5-marker and the maximum must be justified by the first or second derivative test, not merely located; tangents, normals and approximations are no longer in the syllabus.",
      },
      {
        id: "c12-maths-07",
        number: 7,
        title: "Integrals",
        weightage: "≈10 marks",
        keyTopics: [
          "Integration by substitution",
          "Integration by partial fractions",
          "Integration by parts",
          "Definite integrals and their properties",
        ],
        boardNotes:
          "The single highest-yield chapter — expect one by-parts, one partial-fractions and one properties-of-definite-integrals question; the ∫₀ᵃ f(x)dx = ∫₀ᵃ f(a−x)dx trick recurs constantly, and integral-as-limit-of-a-sum is now out.",
      },
      {
        id: "c12-maths-08",
        number: 8,
        title: "Application of Integrals",
        weightage: "≈5 marks",
        keyTopics: [
          "Area under simple curves",
          "Area bounded by lines, circles, parabolas and ellipses",
        ],
        boardNotes:
          "Rationalised down to areas under simple curves in standard form only (area between two curves is out); the rough sketch with correct limits carries real marks — students lose them by not splitting the region at intersection points.",
      },
      {
        id: "c12-maths-09",
        number: 9,
        title: "Differential Equations",
        weightage: "≈5 marks",
        keyTopics: [
          "Order and degree; general and particular solutions",
          "Variable separable method",
          "Homogeneous differential equations",
          "Linear differential equations and integrating factor",
        ],
        boardNotes:
          "One linear DE solved by integrating factor and one homogeneous DE are the standard pair; order/degree turns up as a 1-mark MCQ where the catch is that degree is undefined unless the equation is a polynomial in its derivatives.",
      },
      {
        id: "c12-maths-10",
        number: 10,
        title: "Vector Algebra",
        weightage: "≈7 marks",
        keyTopics: [
          "Direction cosines and direction ratios",
          "Types of vectors and components",
          "Scalar (dot) product and projection",
          "Vector (cross) product and its applications",
        ],
        boardNotes:
          "Dot and cross product applications — area of a triangle/parallelogram and projection of a vector — are the repeat questions; a routine loss is returning a scalar where the question demanded a vector, or vice versa.",
      },
      {
        id: "c12-maths-11",
        number: 11,
        title: "Three Dimensional Geometry",
        weightage: "≈7 marks",
        keyTopics: [
          "Direction cosines of a line",
          "Vector and cartesian equation of a line",
          "Angle between two lines",
          "Skew lines and shortest distance",
        ],
        boardNotes:
          "Shortest distance between two skew lines is the dependable 5-marker; critically, planes were rationalised OUT — 3D is lines-only now, so do not study plane equations, angle between planes or distance of a point from a plane for the board.",
      },
      {
        id: "c12-maths-12",
        number: 12,
        title: "Linear Programming",
        weightage: "≈5 marks",
        keyTopics: [
          "LPP terminology, constraints and objective function",
          "Feasible and infeasible regions (bounded and unbounded)",
          "Graphical solution in two variables",
        ],
        boardNotes:
          "Always a graphical two-variable LPP with up to three non-trivial constraints — the corner-point table is where the marks live, and an unbounded region needs the extra check that the open half-plane shares no point with the feasible region.",
      },
      {
        id: "c12-maths-13",
        number: 13,
        title: "Probability",
        weightage: "≈8 marks",
        keyTopics: [
          "Conditional probability",
          "Multiplication theorem on probability",
          "Independent events and total probability",
          "Bayes' theorem",
        ],
        boardNotes:
          "Bayes' theorem is asked almost every year as a 4–5 marker and now carries the chapter, because random variables, mean/variance and the binomial distribution were all rationalised out — a tree diagram of the partition earns the method marks.",
      },
    ],
  },

  // ==========================================================================
  // BIOLOGY
  // ==========================================================================
  {
    id: "c12-biology",
    name: "Biology",
    classLevel: 12,
    icon: "Dna",
    color: "coral",
    chapters: [
      {
        id: "c12-biology-01",
        number: 1,
        title: "Sexual Reproduction in Flowering Plants",
        weightage: "≈6 marks",
        keyTopics: [
          "Pre-fertilisation structures and events",
          "Pollination and outbreeding devices",
          "Double fertilisation",
          "Post-fertilisation events, apomixis and polyembryony",
        ],
        boardNotes:
          "The L.S. of an anatropous ovule and the embryo sac are near-guaranteed easy marks if labelled exactly as NCERT labels them; double fertilisation and outbreeding devices are the standard short answers. (Reproduction in Organisms was deleted, so this is now Chapter 1.)",
      },
      {
        id: "c12-biology-02",
        number: 2,
        title: "Human Reproduction",
        weightage: "≈7 marks",
        keyTopics: [
          "Male and female reproductive systems",
          "Gametogenesis — spermatogenesis and oogenesis",
          "Menstrual cycle",
          "Fertilisation, implantation, pregnancy and lactation",
        ],
        boardNotes:
          "Spermatogenesis vs oogenesis and hormonal control of the menstrual cycle are the repeat long answers — name the hormone AND its source, because the marking scheme splits those into separate marks.",
      },
      {
        id: "c12-biology-03",
        number: 3,
        title: "Reproductive Health",
        weightage: "≈3 marks",
        keyTopics: [
          "Reproductive health problems and strategies",
          "Contraception methods",
          "MTP and sexually transmitted infections",
          "Infertility and assisted reproductive technologies",
        ],
        boardNotes:
          "Low weightage but the easiest marks in the unit — ART techniques (ZIFT, GIFT, IVF, ICSI) and misuse of amniocentesis are the standard asks; describe what the technique actually does rather than just expanding the abbreviation.",
      },
      {
        id: "c12-biology-04",
        number: 4,
        title: "Principles of Inheritance and Variation",
        weightage: "≈8 marks",
        keyTopics: [
          "Mendel's laws of inheritance",
          "Incomplete dominance and co-dominance",
          "Linkage, recombination and sex determination",
          "Pedigree analysis and genetic disorders",
        ],
        boardNotes:
          "The genetic cross is compulsory — write parental genotypes, gametes and the phenotypic ratio as separate steps, since a correct final ratio with no Punnett square still loses method marks; pedigree and blood-group problems are the reliable 3-markers.",
      },
      {
        id: "c12-biology-05",
        number: 5,
        title: "Molecular Basis of Inheritance",
        weightage: "≈8 marks",
        keyTopics: [
          "DNA structure and packaging",
          "DNA replication",
          "Transcription and the genetic code",
          "Translation, lac operon and Human Genome Project",
        ],
        boardNotes:
          "The lac operon and the Griffith / Hershey–Chase experiments are the near-certain long answers; the replication fork and transcription unit diagrams are cheap marks when the polarity (5'→3') is labelled correctly — that polarity is the most common silent error.",
      },
      {
        id: "c12-biology-06",
        number: 6,
        title: "Evolution",
        weightage: "≈4 marks",
        keyTopics: [
          "Origin of life and evidences of evolution",
          "Darwinian natural selection",
          "Hardy–Weinberg principle",
          "Adaptive radiation and human evolution",
        ],
        boardNotes:
          "Hardy–Weinberg equilibrium — the p² + 2pq + q² = 1 numerical and the five factors that disturb it — is the question CBSE keeps returning to; industrial melanism is the example examiners expect for natural selection in action.",
      },
      {
        id: "c12-biology-07",
        number: 7,
        title: "Human Health and Disease",
        weightage: "≈7 marks",
        keyTopics: [
          "Common diseases and their pathogens",
          "Immunity — innate and acquired",
          "AIDS and cancer",
          "Drugs and alcohol abuse",
        ],
        boardNotes:
          "Pathogen-to-disease matching is guaranteed and needs the exact pathogen name plus the vector; the antibody structure diagram and active vs passive immunity are the repeat short answers.",
      },
      {
        id: "c12-biology-08",
        number: 8,
        title: "Microbes in Human Welfare",
        weightage: "≈5 marks",
        keyTopics: [
          "Microbes in household products",
          "Industrial products and fermentation",
          "Sewage treatment and energy generation",
          "Biofertilisers and biocontrol agents",
        ],
        boardNotes:
          "Pure name-recall — tie each microbe to its exact product (Lactobacillus, Saccharomyces, Aspergillus niger, Trichoderma, Monascus purpureus); the sewage treatment sequence with BOD is the standard long answer. (Strategies for Enhancement in Food Production was deleted.)",
      },
      {
        id: "c12-biology-09",
        number: 9,
        title: "Biotechnology: Principles and Processes",
        weightage: "≈5 marks",
        keyTopics: [
          "Restriction enzymes and cloning vectors",
          "Recombinant DNA technology",
          "PCR and gel electrophoresis",
          "Bioreactors and downstream processing",
        ],
        boardNotes:
          "The steps of rDNA technology and the pBR322 vector diagram repeat constantly; the three PCR steps are frequently asked — name denaturation, annealing and extension with their temperatures, as the temperatures themselves carry marks.",
      },
      {
        id: "c12-biology-10",
        number: 10,
        title: "Biotechnology and its Applications",
        weightage: "≈7 marks",
        keyTopics: [
          "Bt crops and pest-resistant plants",
          "RNA interference",
          "Gene therapy and molecular diagnosis",
          "Transgenic animals, biopiracy and patents",
        ],
        boardNotes:
          "Bt cotton, RNAi in nematode-resistant tobacco and ADA-deficiency gene therapy are the three case studies CBSE recycles; explain the mechanism step by step — naming the technique alone scores about half.",
      },
      {
        id: "c12-biology-11",
        number: 11,
        title: "Organisms and Populations",
        weightage: "≈3 marks",
        keyTopics: [
          "Population attributes",
          "Population growth models",
          "Population interactions",
          "Adaptations",
        ],
        boardNotes:
          "Exponential vs logistic growth is the reliable 3-marker — draw both curves on one axis and mark the carrying capacity K; mutualism examples (fig–wasp, orchid–bee) are the other repeat.",
      },
      {
        id: "c12-biology-12",
        number: 12,
        title: "Ecosystem",
        weightage: "≈3 marks",
        keyTopics: [
          "Ecosystem patterns and components",
          "Productivity and decomposition",
          "Energy flow and food chains",
          "Ecological pyramids",
        ],
        boardNotes:
          "The inverted pyramid of biomass in a sea ecosystem versus the pyramid of energy (which is always upright) is the classic trap question; the 10% law and the steps of decomposition are the dependable short answers.",
      },
      {
        id: "c12-biology-13",
        number: 13,
        title: "Biodiversity and Conservation",
        weightage: "≈4 marks",
        keyTopics: [
          "Biodiversity concept, patterns and importance",
          "Loss of biodiversity and its causes",
          "In-situ and ex-situ conservation",
          "Hotspots, Red Data Book, sacred groves and Ramsar sites",
        ],
        boardNotes:
          "The 'evil quartet' of biodiversity loss and in-situ vs ex-situ conservation with Indian examples are the repeat questions; the species–area relationship (S = CA^Z) turns up as a 2-marker. (Environmental Issues was deleted.)",
      },
    ],
  },

  // ==========================================================================
  // ENGLISH (Flamingo prose → Flamingo poetry → Vistas, one flat sequence)
  // ==========================================================================
  {
    id: "c12-english",
    name: "English",
    classLevel: 12,
    icon: "BookOpen",
    color: "sky",
    chapters: [
      // ---------------------------------------------------- Flamingo — Prose
      {
        id: "c12-english-01",
        number: 1,
        title: "The Last Lesson",
        weightage: "≈6 marks",
        keyTopics: ["Linguistic chauvinism", "Franz's change of heart", "M. Hamel and the Alsace setting"],
        boardNotes:
          "The 'key to their prison' line about holding fast to your language is the extract examiners keep choosing — name linguistic chauvinism and the pain of a lost mother tongue explicitly; retelling the plot caps you at half marks.",
      },
      {
        id: "c12-english-02",
        number: 2,
        title: "Lost Spring",
        weightage: "≈6 marks",
        keyTopics: ["Saheb in Seemapuri", "Mukesh in Firozabad", "Child labour and the poverty trap"],
        boardNotes:
          "The two-part structure means questions almost always ask you to compare Saheb and Mukesh — Mukesh dares to dream, Saheb does not; 'web of poverty' and the 'stigma of caste' are value points the marking scheme looks for by name.",
      },
      {
        id: "c12-english-03",
        number: 3,
        title: "Deep Water",
        weightage: "≈5 marks",
        keyTopics: ["Douglas's fear of water", "Overcoming fear through will", "Role of the instructor"],
        boardNotes:
          "Reliably a long answer on how Douglas conquered his fear — the marking scheme rewards the terror → systematic training → triumph sequence plus a stated life lesson ('all we have to fear is fear itself'), not a swimming-pool narration.",
      },
      {
        id: "c12-english-04",
        number: 4,
        title: "The Rattrap",
        weightage: "≈5 marks",
        keyTopics: ["The rattrap metaphor", "Edla's compassion", "Redemption through kindness"],
        boardNotes:
          "Trace the rattrap metaphor from the peddler's own idea to his escape from it — that arc IS the answer; Edla's compassion as the agent of redemption is the value point, and human goodness is the theme to name.",
      },
      {
        id: "c12-english-05",
        number: 5,
        title: "Indigo",
        weightage: "≈6 marks",
        keyTopics: ["Champaran sharecroppers", "Gandhi's method of leadership", "Self-reliance and civil disobedience"],
        boardNotes:
          "The near-certain long answer is Gandhi's leadership style — cite the 15% refund compromise (the amount mattered less than the landlords surrendering prestige), the lawyers' change of heart, and self-reliance as the lasting lesson.",
      },
      {
        id: "c12-english-06",
        number: 6,
        title: "Poets and Pancakes",
        weightage: "≈4 marks",
        keyTopics: ["Gemini Studios and its make-up department", "Gentle satire and irony", "Subbu and the office hierarchy"],
        boardNotes:
          "Asked for its gentle satire on the Gemini Studios hierarchy, not its events — the humour and irony ARE the answer, so quote Asokamitran's understatement rather than summarising who did what.",
      },
      {
        id: "c12-english-07",
        number: 7,
        title: "The Interview",
        weightage: "≈4 marks",
        keyTopics: ["The interview as a modern art form", "Celebrity opinions on interviews", "Umberto Eco's interview"],
        boardNotes:
          "A two-part chapter and questions exploit that — contrast the celebrities' hostility (Marquez, Rushdie, thinking it diminishes them) with Eco's ease and his 'empty spaces' theory; knowing only Part I is the standard trap.",
      },
      {
        id: "c12-english-08",
        number: 8,
        title: "Going Places",
        weightage: "≈4 marks",
        keyTopics: ["Sophie's fantasies", "Jansie as the foil", "Escapism versus reality"],
        boardNotes:
          "The whole question is fantasy vs reality — name Sophie's daydreaming as escapism from her working-class limits and use Jansie's realism as the deliberate contrast; the ambiguous canal ending should be read as her retreat into fantasy.",
      },

      // --------------------------------------------------- Flamingo — Poetry
      {
        id: "c12-english-09",
        number: 9,
        title: "My Mother at Sixty-six",
        weightage: "≈6 marks",
        keyTopics: ["Fear of loss and ageing", "Similes and imagery", "The parting smile"],
        boardNotes:
          "Extracts target the two similes — 'her face ashen like that of a corpse' and 'as a late winter's moon' — plus the ironic 'smile and smile and smile' ending; quote the image first, then explain, since bare explanation without the quote loses a mark.",
      },
      {
        id: "c12-english-10",
        number: 10,
        title: "Keeping Quiet",
        weightage: "≈5 marks",
        keyTopics: ["Value of silence and introspection", "Stillness versus inactivity", "Universal brotherhood"],
        boardNotes:
          "The marks turn on one distinction: Neruda says stillness is NOT total inactivity and explicitly wants 'no truck with death' — students who write that he wants death or idleness lose the central point.",
      },
      {
        id: "c12-english-11",
        number: 11,
        title: "A Thing of Beauty",
        weightage: "≈4 marks",
        keyTopics: ["Beauty as a source of joy", "Catalogue of beautiful things", "Endymion and immortality"],
        boardNotes:
          "Short and heavily quoted — the 'endless fountain of immortal drink' and the list of beautiful things are the standard extract; mention it is an excerpt from Endymion, and that beauty's joy outlasts human suffering.",
      },
      {
        id: "c12-english-12",
        number: 12,
        title: "A Roadside Stand",
        weightage: "≈4 marks",
        keyTopics: ["Rural-urban economic divide", "Broken promises of progress", "Frost's social protest"],
        boardNotes:
          "A poem of social protest — keep the answer on the money the villagers never see and the politicians' hollow promises; writing about scenery or the beauty of the countryside misses Frost's anger entirely.",
      },
      {
        id: "c12-english-13",
        number: 13,
        title: "Aunt Jennifer's Tigers",
        weightage: "≈5 marks",
        keyTopics: ["Gender oppression in marriage", "Contrast between tigers and Aunt", "Art outliving the artist"],
        boardNotes:
          "A feminist reading is expected — the tigers' fearless 'chivalric certainty' against the 'massive weight of Uncle's wedding band'; that contrast IS the answer, and 'the tigers will go on prancing' after her death is the closing point.",
      },

      // ---------------------------------------------- Vistas (Supplementary)
      {
        id: "c12-english-14",
        number: 14,
        title: "The Third Level",
        weightage: "≈4 marks",
        keyTopics: ["Escape from modern anxiety", "Reality versus fantasy", "Sam's letter twist"],
        boardNotes:
          "Read the third level as a psychological escape from the insecurity of modern life, not as literal time travel; Sam's first-day-cover letter is the usual extract and is the proof Charley's fantasy is shared, not unique.",
      },
      {
        id: "c12-english-15",
        number: 15,
        title: "The Tiger King",
        weightage: "≈5 marks",
        keyTopics: ["Satire on autocracy and vanity", "Irony of the hundredth tiger", "Kalki's mock-heroic style"],
        boardNotes:
          "'How is the title ironic?' is asked repeatedly — a wooden toy tiger kills the man who slaughtered ninety-nine real ones; frame the answer around satire of autocratic power and vanity, using the irony as the spine.",
      },
      {
        id: "c12-english-16",
        number: 16,
        title: "Journey to the end of the Earth",
        weightage: "≈4 marks",
        keyTopics: ["Antarctica and Gondwana", "Climate change evidence", "Students on Ice programme"],
        boardNotes:
          "The most fact-heavy chapter in Vistas — Gondwana, the 'Students on Ice' programme and the phytoplankton argument are the value points, and precise names/figures are exactly what earns the marks here.",
      },
      {
        id: "c12-english-17",
        number: 17,
        title: "The Enemy",
        weightage: "≈5 marks",
        keyTopics: ["Sadao's moral conflict", "Humanity above nationalism", "Hana's role and racial prejudice"],
        boardNotes:
          "The guaranteed long answer is Sadao's conflict between patriotism and the doctor's oath — frame it as duty vs prejudice, credit Hana's part in overcoming her own revulsion, and conclude that humanity transcends war.",
      },
      {
        id: "c12-english-18",
        number: 18,
        title: "On the Face of It",
        weightage: "≈4 marks",
        keyTopics: ["Derry and Mr Lamb's friendship", "Alienation of the disabled", "Perception versus reality"],
        boardNotes:
          "The theme examiners want stated: the actual pain of a physical impairment is far less than the sense of alienation it causes — so the answer is about being an outsider and Mr Lamb's healing acceptance, not about a burnt face.",
      },
      {
        id: "c12-english-19",
        number: 19,
        title: "Memories of Childhood",
        weightage: "≈4 marks",
        keyTopics: [
          "Zitkala-Sa — The Cutting of My Long Hair",
          "Bama — We Too are Human Beings",
          "Racial and caste oppression; resistance",
        ],
        boardNotes:
          "Two separate autobiographical accounts in one chapter — questions ask you to compare racial oppression (Zitkala-Sa) with caste oppression (Bama), so answering from only one half is the most common way students lose marks here.",
      },
    ],
  },

  // ==========================================================================
  // ECONOMICS (Part A: Introductory Macroeconomics, Part B: Indian Economic
  // Development — code 030. Verified against the official CBSE Class 12
  // Economics 2025-26 syllabus: 8 units, Part A = 40 marks, Part B = 40 marks.
  // "Introductory Microeconomics" is not part of this paper.)
  // ==========================================================================
  {
    id: "c12-economics",
    name: "Economics",
    classLevel: 12,
    icon: "TrendingUp",
    color: "gold",
    chapters: [
      {
        id: "c12-economics-01",
        number: 1,
        title: "National Income and Related Aggregates",
        weightage: "≈10 marks",
        keyTopics: [
          "Basic concepts: consumption/capital/final/intermediate goods, stocks and flows",
          "Circular flow of income; value added, expenditure and income methods",
          "GNP, NNP, GDP and NDP at market price and factor cost",
          "Real vs nominal GDP, GDP deflator, GDP and welfare",
        ],
        boardNotes:
          "Numericals computing GNP/NNP/GDP/NDP by the value-added, expenditure or income method carry most of this unit's marks; correctly including or excluding items like depreciation and net factor income from abroad is where students most often lose them.",
      },
      {
        id: "c12-economics-02",
        number: 2,
        title: "Money and Banking",
        weightage: "≈6 marks",
        keyTopics: [
          "Meaning and functions of money; supply of money",
          "Money creation by the commercial banking system",
          "Central bank functions (RBI): bank of issue, government's bank, banker's bank",
          "Credit control: Bank Rate, CRR, SLR, Repo/Reverse Repo, open market operations",
        ],
        boardNotes:
          "The money-creation (deposit multiplier) numerical and RBI's quantitative credit-control tools are the recurring questions; mixing up CRR with SLR, or Repo with Reverse Repo, is the standard way marks are lost here.",
      },
      {
        id: "c12-economics-03",
        number: 3,
        title: "Determination of Income and Employment",
        weightage: "≈12 marks",
        keyTopics: [
          "Aggregate demand and its components",
          "Propensity to consume and to save (average and marginal)",
          "Short-run equilibrium output and the investment multiplier",
          "Excess and deficient demand; fiscal and monetary correctives",
        ],
        boardNotes:
          "The highest-weighted chapter in Part A — the investment-multiplier numerical (change in income from a change in investment via MPC) and deriving short-run equilibrium output are near-certain; the fiscal/monetary measures to correct excess or deficient demand are the standard follow-up theory question.",
      },
      {
        id: "c12-economics-04",
        number: 4,
        title: "Government Budget and the Economy",
        weightage: "≈6 marks",
        keyTopics: [
          "Meaning, objectives and components of the government budget",
          "Revenue vs capital receipts; revenue vs capital expenditure",
          "Balanced, surplus and deficit budgets",
          "Measures of government deficit and their significance",
        ],
        boardNotes:
          "Classifying a given budget item as a revenue or capital receipt/expenditure is the reliable short answer; explaining fiscal deficit, how it is financed and what a rising fiscal deficit signals is the standard higher-mark question.",
      },
      {
        id: "c12-economics-05",
        number: 5,
        title: "Balance of Payments",
        weightage: "≈6 marks",
        keyTopics: [
          "Balance of payments account: meaning and components",
          "Surplus and deficit in the balance of payments",
          "Fixed, flexible and managed floating exchange rates",
          "Determination of exchange rate in a free market",
        ],
        boardNotes:
          "Classifying a given transaction under the current or capital account is the common short answer; the merits and demerits of fixed versus flexible exchange rate systems is the standard higher-mark comparison.",
      },
      {
        id: "c12-economics-06",
        number: 6,
        title: "Development Experience (1947-90) and Economic Reforms since 1991",
        weightage: "≈12 marks",
        keyTopics: [
          "State of the Indian economy on the eve of independence",
          "Goals of the five year plans; agriculture, industry and foreign-trade policy, 1950-91",
          "Need for and features of the 1991 economic reforms (LPG policy)",
          "Concepts of demonetisation and GST",
        ],
        boardNotes:
          "This chapter now folds the pre-1991 development experience together with the 1991 reforms — expect a question linking a specific pre-1991 problem (e.g. the licence-permit system) to the reform that addressed it, with demonetisation and GST as the newer additions to know.",
      },
      {
        id: "c12-economics-07",
        number: 7,
        title: "Current Challenges facing Indian Economy",
        weightage: "≈20 marks",
        keyTopics: [
          "Human capital formation and the growth of India's education sector",
          "Rural development: credit and marketing, cooperatives, agricultural diversification, organic farming",
          "Employment: workforce participation, formal vs informal sectors, problems and policies",
          "Sustainable economic development and its effects on resources and the environment",
        ],
        boardNotes:
          "The single highest-weighted chapter in the whole paper, spanning four distinct topics — human capital, rural development, employment and sustainable development — so a long answer can be drawn from any one of the four rather than one dominant theme.",
      },
      {
        id: "c12-economics-08",
        number: 8,
        title: "Development Experience of India: A Comparison with Neighbours",
        weightage: "≈8 marks",
        keyTopics: [
          "Development strategies of India, Pakistan and China",
          "Comparative indicators: economic growth and population",
          "Sectoral development across the three economies",
          "Other Human Development Indicators",
        ],
        boardNotes:
          "Comparing India, Pakistan and China on a named indicator (e.g. GDP growth rate or an HDI-related measure) is the standard question — the usual mark loss is leaving out the third country rather than getting the comparison itself wrong.",
      },
    ],
  },
];
