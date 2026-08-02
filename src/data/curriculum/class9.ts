import type { Subject } from "../../lib/types";

// Class IX curriculum — verified against the CURRENT rationalised NCERT books and the
// official CBSE Secondary Curriculum 2025-26 (cbseacademic.nic.in, Maths_Sec_2025-26.pdf).
//
// Notes on accuracy:
// - Chapter numbers follow the rationalised NCERT textbook order (post-2023 renumbering),
//   NOT the pre-rationalisation numbering still floating around on coaching sites.
// - Maths: rationalised book is 12 chapters (Areas of Parallelograms & Triangles,
//   Constructions and Probability were dropped; later chapters renumbered).
// - Science: rationalised book is 12 chapters (Diversity in Living Organisms,
//   Why Do We Fall Ill and Natural Resources were dropped).
// - The CBSE 2025-26 Maths syllabus splits Class IX content into summatively-assessed
//   topics and "assessed only formatively" topics. That split is captured in boardNotes
//   for the affected chapters — it is quoted from the official curriculum PDF, and it is
//   the single most common thing Class IX students over- or under-study.
// - Class IX is not a board year, so per-chapter `weightage` is deliberately omitted:
//   CBSE publishes marks per UNIT (e.g. Geometry 27, Algebra 20), not per chapter, and
//   splitting unit marks across chapters would be invention rather than data.

const maths: Subject = {
  id: "c9-maths",
  name: "Mathematics",
  classLevel: 9,
  icon: "Sigma",
  color: "gold",
  chapters: [
    {
      id: "c9-maths-01",
      number: 1,
      title: "Number Systems",
      keyTopics: [
        "Rational and irrational numbers on the number line",
        "Decimal expansions (terminating / recurring)",
        "Laws of exponents for real numbers",
        "Rationalising the denominator",
      ],
      boardNotes:
        "Representing √2 or √3 on the number line via the spiral construction is a recurring 3-4 marker judged on the accuracy of the diagram, and rationalising a denominator with a binomial surd is the standard follow-up question.",
    },
    {
      id: "c9-maths-02",
      number: 2,
      title: "Polynomials",
      keyTopics: [
        "Degree, zeroes and types of polynomials",
        "Remainder Theorem",
        "Factor Theorem and factorisation",
        "Algebraic identities up to degree three",
      ],
      boardNotes:
        "Applying the Factor Theorem to check whether (x − a) divides a polynomial, and expanding using the (a+b+c)³-type identities, are the two question types that repeat most; showing the substitution step is where marks are actually awarded, not the final value.",
    },
    {
      id: "c9-maths-03",
      number: 3,
      title: "Coordinate Geometry",
      keyTopics: [
        "Cartesian plane, axes and origin",
        "Quadrants and sign conventions",
        "Plotting points from a table",
      ],
      boardNotes:
        "Tested only as short 1-2 mark questions — naming the quadrant of a point or plotting a table of values — since the chapter mainly sets up the graphing skill used in Linear Equations in Two Variables.",
    },
    {
      id: "c9-maths-04",
      number: 4,
      title: "Linear Equations in Two Variables",
      keyTopics: [
        "Form ax + by + c = 0",
        "A linear equation has infinitely many solutions",
        "Drawing the graph of a linear equation",
      ],
      boardNotes:
        "The standard question gives one linear equation, asks students to find y for two values of x, plot the line, and read a value off the graph — losing the mark for an unscaled or unlabelled axis is the most common slip.",
    },
    {
      id: "c9-maths-05",
      number: 5,
      title: "Introduction to Euclid's Geometry",
      keyTopics: [
        "Euclid's definitions, axioms and postulates",
        "The five postulates",
        "Equivalent versions of the fifth postulate",
      ],
      boardNotes:
        "Low-weight and mostly definitional — expect a question naming Euclid's postulates or asking which everyday statement illustrates an axiom, not a construction or proof.",
    },
    {
      id: "c9-maths-06",
      number: 6,
      title: "Lines and Angles",
      keyTopics: [
        "Pairs of angles and linear pair",
        "Parallel lines cut by a transversal",
        "Angle sum property of a triangle",
      ],
      boardNotes:
        "Angle-chasing with parallel lines is the recurring proof question — full marks require naming the specific reason (e.g. 'corresponding angles', 'co-interior angles are supplementary') at each step, not just the final angle value.",
    },
    {
      id: "c9-maths-07",
      number: 7,
      title: "Triangles",
      keyTopics: [
        "Congruence criteria: SAS, ASA, AAS, SSS, RHS",
        "Properties of an isosceles triangle",
        "Inequalities in a triangle",
      ],
      boardNotes:
        "Proving two triangles congruent is the standard 3-5 marker; the congruence criterion used (SAS/ASA/AAS/SSS/RHS) must be named explicitly as its own step or the proof loses marks even with the right final conclusion.",
    },
    {
      id: "c9-maths-08",
      number: 8,
      title: "Quadrilaterals",
      keyTopics: [
        "Angle sum property of a quadrilateral",
        "Properties and tests for a parallelogram",
        "The Mid-point Theorem and its converse",
      ],
      boardNotes:
        "The Mid-point Theorem and its converse is the most repeated proof in the chapter, usually combined with a parallelogram-properties question in the same long-answer slot.",
    },
    {
      id: "c9-maths-09",
      number: 9,
      title: "Circles",
      keyTopics: [
        "Chords and their distance from the centre",
        "Angle subtended by an arc at the centre",
        "Cyclic quadrilaterals",
      ],
      boardNotes:
        "Theorems on equal chords and angles subtended by an arc are proved almost every year; 'equal chords are equidistant from the centre' and its converse are the pair students most often confuse with each other.",
    },
    {
      id: "c9-maths-10",
      number: 10,
      title: "Heron's Formula",
      keyTopics: [
        "Semi-perimeter of a triangle",
        "Area of a triangle by Heron's formula",
        "Areas of scalene and equilateral triangles",
      ],
      boardNotes:
        "Per the CBSE 2025-26 syllabus only the triangle-area use of Heron's formula is examined in the written paper; extending it to quadrilaterals is listed as formatively assessed only.",
    },
    {
      id: "c9-maths-11",
      number: 11,
      title: "Surface Areas and Volumes",
      keyTopics: [
        "Surface area of a right circular cone",
        "Surface area of a sphere and hemisphere",
        "Volume of a right circular cone",
        "Volume of a sphere",
      ],
      boardNotes:
        "CBSE 2025-26 examines only spheres (including hemispheres) and right circular cones here; cubes, cuboids and cylinders are retained in the syllabus but assessed formatively, so exam questions come from cones and spheres.",
    },
    {
      id: "c9-maths-12",
      number: 12,
      title: "Statistics",
      keyTopics: [
        "Bar graphs",
        "Histograms with varying base lengths",
        "Frequency polygons",
      ],
      boardNotes:
        "The written paper tests graphical representation only — bar graphs, histograms with varying base lengths and frequency polygons; mean, median and mode of ungrouped data is formative-only in 2025-26.",
    },
  ],
};

const science: Subject = {
  id: "c9-science",
  name: "Science",
  classLevel: 9,
  icon: "FlaskConical",
  color: "mint",
  chapters: [
    {
      id: "c9-science-01",
      number: 1,
      title: "Matter in Our Surroundings",
      keyTopics: [
        "Physical nature and characteristics of matter",
        "States of matter and interconversion",
        "Effect of temperature and pressure",
        "Evaporation and latent heat",
      ],
      boardNotes:
        "Falls in Science's highest-weightage unit (Matter — 25 of 80 marks); 'why does a desert cooler work better in dry weather' style reasoning questions on latent heat and evaporation repeat almost every year.",
    },
    {
      id: "c9-science-02",
      number: 2,
      title: "Is Matter Around Us Pure?",
      keyTopics: [
        "Mixtures, solutions and concentration",
        "Colloids and suspensions (Tyndall effect)",
        "Separation techniques",
        "Physical vs chemical changes",
      ],
      boardNotes:
        "Separating the components of a mixture is explicitly marked excluded in the CBSE 2025-26 syllabus, so exam questions stay on classifying a given example as element/compound/mixture or colloid/suspension by property, not on naming separation apparatus.",
    },
    {
      id: "c9-science-03",
      number: 3,
      title: "Atoms and Molecules",
      keyTopics: [
        "Laws of chemical combination",
        "Atomic and molecular masses",
        "Writing chemical formulae and valency",
        "Mole concept and Avogadro number",
      ],
      boardNotes:
        "Numericals computing molecular mass from atomic masses, and writing chemical formulae from valency using the criss-cross method, are the two question types that appear almost every year.",
    },
    {
      id: "c9-science-04",
      number: 4,
      title: "Structure of the Atom",
      keyTopics: [
        "Thomson, Rutherford and Bohr models",
        "Distribution of electrons in shells",
        "Valency, atomic number and mass number",
        "Isotopes and isobars",
      ],
      boardNotes:
        "Distributing electrons in shells by the 2n² rule and finding valency, atomic number and mass number from a given atomic structure is the standard short-answer pair; isotopes are tested more often via real-world uses than via calculation.",
    },
    {
      id: "c9-science-05",
      number: 5,
      title: "The Fundamental Unit of Life",
      keyTopics: [
        "Cell as the basic unit of life",
        "Plasma membrane, diffusion and osmosis",
        "Cell organelles and their functions",
        "Prokaryotic vs eukaryotic cells",
      ],
      boardNotes:
        "Diagram-labelling of a plant or animal cell and distinguishing diffusion from osmosis are the most repeated questions; 'why is the cell called the structural and functional unit of life' is a standard 2-3 mark reasoning question.",
    },
    {
      id: "c9-science-06",
      number: 6,
      title: "Tissues",
      keyTopics: [
        "Meristematic and permanent plant tissues",
        "Epithelial and connective tissues",
        "Muscular and nervous tissues",
      ],
      boardNotes:
        "Identifying a tissue type from a description of its location and function (e.g. 'tissue at the root tip that keeps dividing') is the standard short-answer format, more often than diagram-drawing.",
    },
    {
      id: "c9-science-07",
      number: 7,
      title: "Motion",
      keyTopics: [
        "Distance vs displacement",
        "Speed, velocity and acceleration",
        "Equations of motion and graphs",
        "Uniform circular motion",
      ],
      boardNotes:
        "Falls in Science's heaviest-weighted unit (Motion, Force and Work — 27 of 80 marks); numericals using the three equations of motion, and reading a velocity-time graph to find distance or acceleration, are near-certain.",
    },
    {
      id: "c9-science-08",
      number: 8,
      title: "Force and Laws of Motion",
      keyTopics: [
        "Newton's three laws of motion",
        "Inertia and mass",
        "Momentum and F = ma",
        "Conservation of momentum",
      ],
      boardNotes:
        "Conservation of momentum is listed in the CBSE 2025-26 syllabus as assessed only formatively, so the annual exam stays on Newton's three laws and numericals on F = ma — don't over-prepare the momentum-conservation derivation for the written paper.",
    },
    {
      id: "c9-science-09",
      number: 9,
      title: "Gravitation",
      keyTopics: [
        "Universal law of gravitation",
        "Free fall and acceleration due to gravity",
        "Mass vs weight",
        "Thrust, pressure, buoyancy and Archimedes' principle",
      ],
      boardNotes:
        "Universal-law-of-gravitation numericals (finding force, or 'g' at a given height) and Archimedes' Principle numericals on buoyant force are the two calculation types that repeat; mass vs weight is a frequent one-mark conceptual trap.",
    },
    {
      id: "c9-science-10",
      number: 10,
      title: "Work and Energy",
      keyTopics: [
        "Work done by a constant force",
        "Kinetic and potential energy",
        "Law of conservation of energy",
        "Power and the commercial unit of energy",
      ],
      boardNotes:
        "The commercial unit of energy (kWh) is explicitly excluded from the CBSE 2025-26 syllabus, so numericals stay on work done by a constant force and the interconversion of kinetic/potential energy during free fall.",
    },
    {
      id: "c9-science-11",
      number: 11,
      title: "Sound",
      keyTopics: [
        "Production and propagation of sound",
        "Characteristics of a sound wave",
        "Reflection, echo and reverberation",
        "Structure of the human ear and SONAR",
      ],
      boardNotes:
        "Reflection-of-sound numericals (echo, reverberation) using speed = distance/time, and labelling the structure of the human ear, are the two most repeated question types.",
    },
    {
      id: "c9-science-12",
      number: 12,
      title: "Improvement in Food Resources",
      keyTopics: [
        "Crop variety improvement and cropping patterns",
        "Manures and fertilisers",
        "Animal husbandry and poultry farming",
        "Fisheries and bee-keeping",
      ],
      boardNotes:
        "Lightest-weighted chapter in Science (Unit IV, only 6 of 80 marks); expect short definitional questions on a named method (e.g. cross-breeding, vermicompost) rather than a long derivation-style answer.",
    },
  ],
};

// Social Science — ONE flat sequence across the four NCERT books:
// History 01-05, Geography 06-11, Political Science 12-16, Economics 17-20.
const sst: Subject = {
  id: "c9-sst",
  name: "Social Science",
  classLevel: 9,
  icon: "Landmark",
  color: "coral",
  chapters: [
    // ---- History: India and the Contemporary World – I (5 chapters)
    {
      id: "c9-sst-01",
      number: 1,
      title: "The French Revolution",
      keyTopics: [
        "French society in the late 18th century",
        "Outbreak of the revolution and the Estates General",
        "The Reign of Terror and rise of Napoleon",
        "Abolition of slavery",
      ],
      boardNotes:
        "Source-based questions quoting a primary text (a revolutionary pamphlet, the Declaration of the Rights of Man) are common; timeline-ordering of events from the Estates General to the Reign of Terror is a frequent short-answer format.",
    },
    {
      id: "c9-sst-02",
      number: 2,
      title: "Socialism in Europe and the Russian Revolution",
      keyTopics: [
        "Liberals, radicals and conservatives",
        "The February and October Revolutions",
        "Making of a socialist society",
        "Stalinism and collectivisation",
      ],
      boardNotes:
        "Distinguishing the February Revolution from the October Revolution by cause and outcome is the most repeated short-answer question; collectivisation under Stalin is tested more often than the details of War Communism.",
    },
    {
      id: "c9-sst-03",
      number: 3,
      title: "Nazism and the Rise of Hitler",
      keyTopics: [
        "The Weimar Republic and its crises",
        "Hitler's rise to power",
        "Nazi worldview, schooling and youth",
        "The Holocaust",
      ],
      boardNotes:
        "Value-based questions on the Holocaust and on Nazi propaganda in schools are common, alongside a straightforward timeline question tracing Hitler's rise via the Weimar Republic's economic crisis.",
    },
    {
      id: "c9-sst-04",
      number: 4,
      title: "Forest Society and Colonialism",
      keyTopics: [
        "Deforestation and scientific forestry",
        "Forest Acts and the impact on villagers",
        "Rebellion in Bastar",
        "Forest transformations in Java",
      ],
      boardNotes:
        "Comparing colonial forest policy in India with the Bastar rebellion or with Java is the standard long-answer format; 'scientific forestry' is a term examiners specifically check students can define, not just describe.",
    },
    {
      id: "c9-sst-05",
      number: 5,
      title: "Pastoralists in the Modern World",
      keyTopics: [
        "Pastoral nomads and their movements",
        "Colonial rule and grazing laws",
        "Pastoralism in Africa and the Maasai",
      ],
      boardNotes:
        "Naming a specific pastoral community (Gujjar Bakarwals, Raikas, Maasai) and describing its seasonal movement is the recurring short-answer format, more often than a generic definition of pastoralism.",
    },

    // ---- Geography: Contemporary India – I (6 chapters)
    {
      id: "c9-sst-06",
      number: 6,
      title: "India — Size and Location",
      keyTopics: [
        "Latitudinal and longitudinal extent",
        "Standard Meridian (82°30'E)",
        "India's neighbours and land/water frontiers",
      ],
      boardNotes:
        "Map-based questions locating India's neighbouring countries or identifying the Standard Meridian are compulsory in this chapter; 82°30'E is one of the single most commonly tested facts in the whole subject.",
    },
    {
      id: "c9-sst-07",
      number: 7,
      title: "Physical Features of India",
      keyTopics: [
        "Plate tectonics and the making of India's relief",
        "The Himalayas and the Northern Plains",
        "Peninsular Plateau and the Indian Desert",
        "Coastal plains and islands",
      ],
      boardNotes:
        "Map-work identifying a named physiographic division (e.g. the Purvanchal hills, the Malwa Plateau) is standard, alongside a short-answer question distinguishing the Himalayas' three parallel ranges.",
    },
    {
      id: "c9-sst-08",
      number: 8,
      title: "Drainage",
      keyTopics: [
        "Himalayan vs Peninsular rivers",
        "The Ganga and Brahmaputra systems",
        "Lakes and their importance",
        "River pollution and river-cleaning plans",
      ],
      boardNotes:
        "Distinguishing a Himalayan river from a Peninsular river by origin and flow pattern is the most repeated short-answer question; naming rivers on the outline map is a compulsory map-work item.",
    },
    {
      id: "c9-sst-09",
      number: 9,
      title: "Climate",
      keyTopics: [
        "Factors and controls of India's climate",
        "Mechanism, onset and withdrawal of the monsoon",
        "The four seasons",
        "Distribution of rainfall; monsoon as a unifying bond",
      ],
      boardNotes:
        "Explaining the mechanism of monsoon onset and withdrawal is the standard long-answer question; 'monsoon as a unifying bond' is a recurring reasoning question, not just a factual recall one.",
    },
    {
      id: "c9-sst-10",
      number: 10,
      title: "Natural Vegetation and Wildlife",
      keyTopics: [
        "Factors: relief, soil, climate",
        "Types of vegetation, from tropical evergreen to montane",
        "Wildlife and conservation efforts",
      ],
      boardNotes:
        "Matching a named vegetation type (tropical evergreen, deciduous, thorn, montane) to the region and rainfall it needs is the standard short-answer format, alongside a question on a named conservation project or protected area.",
    },
    {
      id: "c9-sst-11",
      number: 11,
      title: "Population",
      keyTopics: [
        "Population size, distribution and density",
        "Population growth and processes of change",
        "Age composition, sex ratio and literacy",
        "National Population Policy",
      ],
      boardNotes:
        "Reading a population/age-composition graph or table is common, alongside a short-answer question distinguishing 'population growth' from 'population change' (the latter includes migration).",
    },

    // ---- Political Science: Democratic Politics – I (5 chapters)
    {
      id: "c9-sst-12",
      number: 12,
      title: "What is Democracy? Why Democracy?",
      keyTopics: [
        "Features of democracy",
        "Arguments for and against democracy",
        "Broader meanings of democracy",
      ],
      boardNotes:
        "'Give two arguments for and against democracy' is the standard long-answer format; examiners specifically credit students who cite a real example rather than a purely abstract argument.",
    },
    {
      id: "c9-sst-13",
      number: 13,
      title: "Constitutional Design",
      keyTopics: [
        "Democratic constitution in South Africa",
        "Why and how India's Constitution was made",
        "The Constituent Assembly",
        "Philosophy of the Constitution and the Preamble",
      ],
      boardNotes:
        "The South Africa case study is tested as a standalone short-answer question as often as India's own Constitution-making; naming the Constituent Assembly's key features (timeframe, key debates) is a recurring factual question.",
    },
    {
      id: "c9-sst-14",
      number: 14,
      title: "Electoral Politics",
      keyTopics: [
        "Why elections are necessary",
        "System of elections in India",
        "Reserved constituencies",
        "Election Commission and free and fair elections",
      ],
      boardNotes:
        "Explaining why India uses reserved constituencies, and describing the Election Commission's role in ensuring free and fair elections, are the two long-answer questions that repeat most.",
    },
    {
      id: "c9-sst-15",
      number: 15,
      title: "Working of Institutions",
      keyTopics: [
        "Parliament: Lok Sabha and Rajya Sabha",
        "Political executive: PM and Council of Ministers",
        "The President's role",
        "The judiciary and judicial review",
      ],
      boardNotes:
        "Case-based questions describing a real or hypothetical government decision and asking which institution — Parliament, PM, President, judiciary — is responsible are the standard format in this chapter.",
    },
    {
      id: "c9-sst-16",
      number: 16,
      title: "Democratic Rights",
      keyTopics: [
        "Why we need rights in a democracy",
        "Fundamental Rights in the Indian Constitution",
        "Right to Constitutional Remedies",
        "Expanding scope of rights",
      ],
      boardNotes:
        "Naming and briefly explaining the six Fundamental Rights is a compulsory short-answer question; the Right to Constitutional Remedies is specifically tested as 'the right that protects all other rights'.",
    },

    // ---- Economics (4 chapters)
    {
      id: "c9-sst-17",
      number: 17,
      title: "The Story of Village Palampur",
      keyTopics: [
        "Factors of production",
        "Farming in Palampur and land distribution",
        "Multiple cropping and modern farming methods",
        "Non-farm activities",
      ],
      boardNotes:
        "Case-based questions built around the Palampur example itself (its farming, wells, non-farm activities) are the standard format, since the chapter is written as one continuous case study rather than a set of separate facts.",
    },
    {
      id: "c9-sst-18",
      number: 18,
      title: "People as Resource",
      keyTopics: [
        "Human capital formation",
        "Economic and non-economic activities",
        "Quality of population: education and health",
        "Unemployment and its types",
      ],
      boardNotes:
        "Distinguishing economic from non-economic activities, and describing under-employment vs disguised unemployment with an example, are the two most repeated short-answer questions.",
    },
    {
      id: "c9-sst-19",
      number: 19,
      title: "Poverty as a Challenge",
      keyTopics: [
        "The poverty line and poverty estimates",
        "Vulnerable groups and inter-state disparities",
        "Causes of poverty",
        "Anti-poverty measures",
      ],
      boardNotes:
        "Explaining the poverty line and identifying which social groups are most vulnerable to poverty is the standard long-answer question; a case-based question using a poverty-estimate table or graph is common.",
    },
    {
      id: "c9-sst-20",
      number: 20,
      title: "Food Security in India",
      keyTopics: [
        "What is food security; who is food-insecure",
        "Buffer stock and the Public Distribution System",
        "Green Revolution and self-sufficiency",
        "Role of cooperatives",
      ],
      boardNotes:
        "Explaining the role of buffer stock and the Public Distribution System together is the standard long-answer question; the Green Revolution's link to self-sufficiency is tested more often than the PDS's implementation problems.",
    },
  ],
};

// English — one subject, Beehive (01-09) then Moments (10-17).
// Beehive pairs a prose lesson with a poem per chapter; the paired poem is the first
// keyTopic. Rationalised out and therefore absent here: Beehive prose "Packing" and
// "The Bond of Love", Beehive poems "The Duck and the Kangaroo" and "The Snake Trying";
// Moments stories "Weathering the Storm in Ersama" and "The Accidental Tourist".
const english: Subject = {
  id: "c9-english",
  name: "English",
  classLevel: 9,
  icon: "BookOpen",
  color: "sky",
  chapters: [
    // ---- Beehive (main reader): prose + paired poem
    {
      id: "c9-english-01",
      number: 1,
      title: "The Fun They Had",
      keyTopics: [
        "Poem: The Road Not Taken (Robert Frost)",
        "Isaac Asimov; Margie's mechanical teacher",
        "Schools of the future vs schools of the past",
      ],
      boardNotes:
        "Extract-based comprehension typically quotes Margie's diary entry; the paired poem is examined separately in the poetry section, most often via a value-based question on the choices we make.",
    },
    {
      id: "c9-english-02",
      number: 2,
      title: "The Sound of Music",
      keyTopics: [
        "Poem: Wind (Subramania Bharati)",
        "Evelyn Glennie: deafness and percussion",
        "Bismillah Khan and the shehnai",
      ],
      boardNotes:
        "Character-based long-answer questions comparing Evelyn Glennie and Bismillah Khan — how each overcame a challenge to master music — are the standard format for this chapter.",
    },
    {
      id: "c9-english-03",
      number: 3,
      title: "The Little Girl",
      keyTopics: [
        "Poem: Rain on the Roof (Coates Kinney)",
        "Kezia's fear of her father",
        "A changing father-daughter relationship",
      ],
      boardNotes:
        "The recurring long-answer question traces how Kezia's feelings about her father change across the story — examiners specifically want the 'before and after' contrast, not just a plot summary.",
    },
    {
      id: "c9-english-04",
      number: 4,
      title: "A Truly Beautiful Mind",
      keyTopics: [
        "Poem: The Lake Isle of Innisfree (W. B. Yeats)",
        "Einstein's childhood and education",
        "Theory of relativity; the letter to Roosevelt",
        "Einstein as a pacifist",
      ],
      boardNotes:
        "Factual short-answer questions on milestones in Einstein's life (the patent office job, the theory of relativity, the Roosevelt letter) are standard, alongside a value-based question on Einstein as a pacifist.",
    },
    {
      id: "c9-english-05",
      number: 5,
      title: "The Snake and the Mirror",
      keyTopics: [
        "Poem: A Legend of the Northland (Phoebe Cary)",
        "The doctor's night with a snake",
        "Vanity, humour and the ironic ending",
      ],
      boardNotes:
        "A recurring question asks students to explain the irony or humour in the story's ending — the doctor's vanity being upstaged by the very snake he feared.",
    },
    {
      id: "c9-english-06",
      number: 6,
      title: "My Childhood",
      keyTopics: [
        "Poem: No Men Are Foreign (James Kirkup)",
        "A. P. J. Abdul Kalam's childhood in Rameswaram",
        "Communal harmony and breaking social barriers",
      ],
      boardNotes:
        "Value-based questions on communal harmony, drawn from Kalam's Rameswaram childhood, are standard alongside factual recall of the people who influenced him early on.",
    },
    {
      id: "c9-english-07",
      number: 7,
      title: "Reach for the Top",
      keyTopics: [
        "Poem: On Killing a Tree (Gieve Patel)",
        "Santosh Yadav: twice up Everest",
        "Maria Sharapova's rise to world No. 1",
        "Determination against the odds",
      ],
      boardNotes:
        "Compare-and-contrast long-answer questions pairing Santosh Yadav and Maria Sharapova — different fields, same determination — are the standard format for this chapter.",
    },
    {
      id: "c9-english-08",
      number: 8,
      title: "Kathmandu",
      keyTopics: [
        "Poem: A Slumber Did My Spirit Seal (William Wordsworth)",
        "Vikram Seth's travelogue",
        "Pashupatinath vs Baudhnath: a study in contrast",
        "The flute seller",
      ],
    },
    {
      id: "c9-english-09",
      number: 9,
      title: "If I Were You",
      keyTopics: [
        "One-act play by Douglas James",
        "Gerrard outwits the Intruder",
        "Presence of mind and wit as weapons",
      ],
    },

    // ---- Moments (supplementary reader)
    {
      id: "c9-english-10",
      number: 10,
      title: "The Lost Child",
      keyTopics: [
        "Mulk Raj Anand",
        "The village fair and a child's desires",
        "Security of parents over every temptation",
      ],
    },
    {
      id: "c9-english-11",
      number: 11,
      title: "The Adventures of Toto",
      keyTopics: [
        "Ruskin Bond",
        "Toto the mischievous monkey",
        "Humour and the cost of keeping a pet",
      ],
    },
    {
      id: "c9-english-12",
      number: 12,
      title: "Iswaran the Storyteller",
      keyTopics: [
        "R. K. Laxman",
        "Iswaran's exaggerated tall tales",
        "The ghost story and its twist ending",
      ],
    },
    {
      id: "c9-english-13",
      number: 13,
      title: "In the Kingdom of Fools",
      keyTopics: [
        "A folk tale retold by A. K. Ramanujan",
        "The foolish king and his minister",
        "The guru and disciple's presence of mind",
        "Justice turned upside down",
      ],
    },
    {
      id: "c9-english-14",
      number: 14,
      title: "The Happy Prince",
      keyTopics: [
        "Oscar Wilde",
        "The statue and the swallow",
        "Sacrifice, compassion and true beauty",
      ],
    },
    {
      id: "c9-english-15",
      number: 15,
      title: "The Last Leaf",
      keyTopics: [
        "O. Henry",
        "Johnsy's illness and the ivy leaf",
        "Behrman's masterpiece and his sacrifice",
      ],
    },
    {
      id: "c9-english-16",
      number: 16,
      title: "A House Is Not a Home",
      keyTopics: [
        "Zan Gaudioso",
        "Losing a home to fire",
        "Kindness of classmates and the cat's return",
        "Home is people, not a building",
      ],
    },
    {
      id: "c9-english-17",
      number: 17,
      title: "The Beggar",
      keyTopics: [
        "Anton Chekhov",
        "Lushkoff's transformation through work",
        "Sergei's firmness and Olga's compassion",
        "Dignity of labour",
      ],
    },
  ],
};

export const CLASS_9_SUBJECTS: Subject[] = [maths, science, sst, english];
