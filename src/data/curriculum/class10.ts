import type { Subject } from "../../lib/types";

// CLASS 10 — CBSE board year. Chapter lists, numbering and titles verified against
// the official rationalised NCERT textbooks (Reprint 2026-27 prelims/contents pages):
//   Maths     jemh1  — 14 chapters (Constructions removed; Euclid's division lemma
//                      dropped from Ch1; ch13 Statistics, ch14 Probability)
//   Science   jesc1  — 13 chapters (Periodic Classification of Elements, Sources of
//                      Energy and Sustainable Management of Natural Resources removed;
//                      "Heredity and Evolution" is now simply "Heredity")
//   SST       jess3 History (5) → jess1 Geography (7) → jess4 Pol. Science (5) →
//                      jess2 Economics (5), numbered as ONE flat 1-22 sequence.
//                      History's Indo-China / Work, Life and Leisure / Novels, Society
//                      and History are QR-code "extended learning" only — not syllabus.
//   English   jeff1 First Flight (9 prose/play + 10 poems) → jefp1 Footprints Without
//                      Feet (9). Hundred Dresses I & II and The Hack Driver are removed.

export const CLASS_10_SUBJECTS: Subject[] = [
  // ==========================================================================
  // MATHEMATICS — 80-mark theory. Unit weightage: Number Systems 6, Algebra 20,
  // Coordinate Geometry 6, Geometry 15, Trigonometry 12, Mensuration 10,
  // Statistics & Probability 11.
  // ==========================================================================
  {
    id: "c10-maths",
    name: "Mathematics",
    classLevel: 10,
    icon: "Sigma",
    color: "gold",
    chapters: [
      {
        id: "c10-maths-01",
        number: 1,
        title: "Real Numbers",
        weightage: "≈6 marks",
        keyTopics: ["Fundamental Theorem of Arithmetic", "Irrationality proofs", "HCF and LCM"],
        boardNotes:
          "Proving √2, √3 or √5 irrational is a near-annual 3-marker — the marking scheme awards a mark just for the 'let √2 = p/q where p, q are coprime' setup, which rushed students skip.",
      },
      {
        id: "c10-maths-02",
        number: 2,
        title: "Polynomials",
        weightage: "≈3 marks",
        keyTopics: ["Zeroes of a polynomial", "Relationship between zeroes and coefficients"],
        boardNotes:
          "Light chapter that reliably gives a 2-3 marker on sum/product of zeroes, plus a graph MCQ where you count zeroes from x-axis cuts — free marks lost only by misreading the curve.",
      },
      {
        id: "c10-maths-03",
        number: 3,
        title: "Pair of Linear Equations in Two Variables",
        weightage: "≈5 marks",
        keyTopics: ["Graphical method", "Substitution and elimination", "Consistency conditions"],
        boardNotes:
          "The long question is a word problem (ages, boat-and-stream, work). Framing both equations earns marks independently of the solving, so write the equations down before touching arithmetic.",
      },
      {
        id: "c10-maths-04",
        number: 4,
        title: "Quadratic Equations",
        weightage: "≈5 marks",
        keyTopics: ["Roots by factorisation", "Quadratic formula", "Discriminant and nature of roots"],
        boardNotes:
          "'Find k so the roots are equal' (D = 0) is a guaranteed short question. In word problems, explicitly rejecting the negative/invalid root is itself a marked step.",
      },
      {
        id: "c10-maths-05",
        number: 5,
        title: "Arithmetic Progressions",
        weightage: "≈6 marks",
        keyTopics: ["nth term", "Sum of first n terms", "AP word problems"],
        boardNotes:
          "Sum-of-n-terms word problems are the standard 5-marker. The classic mark-loser is mixing up aₙ with Sₙ; 'which term is zero / first negative' repeats often.",
      },
      {
        id: "c10-maths-06",
        number: 6,
        title: "Triangles",
        weightage: "≈9 marks",
        keyTopics: ["Similarity criteria", "Basic Proportionality Theorem", "Areas of similar triangles"],
        boardNotes:
          "Heaviest geometry chapter — the BPT (Thales) statement-and-proof is the classic 5-marker, and full marks need the construction plus the 'same base, between the same parallels' area argument.",
      },
      {
        id: "c10-maths-07",
        number: 7,
        title: "Coordinate Geometry",
        weightage: "≈6 marks",
        keyTopics: ["Distance formula", "Section formula", "Midpoint"],
        boardNotes:
          "Area of a triangle by coordinates is rationalised out, so collinearity is now tested via distances or section ratios instead — students still waste time on the deleted determinant method.",
      },
      {
        id: "c10-maths-08",
        number: 8,
        title: "Introduction to Trigonometry",
        weightage: "≈7 marks",
        keyTopics: ["Trigonometric ratios", "Ratios of specific angles", "Trigonometric identities"],
        boardNotes:
          "Identity-proving (sec-tan, cosec-cot) is the recurring 3-marker. Complementary-angle ratios were removed, so expect pure identity manipulation — start from the messier side and simplify.",
      },
      {
        id: "c10-maths-09",
        number: 9,
        title: "Some Applications of Trigonometry",
        weightage: "≈5 marks",
        keyTopics: ["Heights and distances", "Angle of elevation", "Angle of depression"],
        boardNotes:
          "There is always one height-and-distance question using 30°/45°/60°. A correctly labelled figure carries its own mark — students who solve mentally and skip the diagram forfeit it.",
      },
      {
        id: "c10-maths-10",
        number: 10,
        title: "Circles",
        weightage: "≈6 marks",
        keyTopics: ["Tangent to a circle", "Number of tangents from a point", "Tangent-radius property"],
        boardNotes:
          "Only two theorems are asked to be proved — tangent ⊥ radius, and equal tangent lengths from an external point — and nearly every numerical in the chapter rests on one of them.",
      },
      {
        id: "c10-maths-11",
        number: 11,
        title: "Areas Related to Circles",
        weightage: "≈4 marks",
        keyTopics: ["Area of a sector", "Area of a segment", "Perimeter of sector"],
        boardNotes:
          "Reduced to sectors and segments only. The standard error is quoting the segment formula without subtracting the triangle's area, and ignoring whether the paper says use 22/7 or 3.14.",
      },
      {
        id: "c10-maths-12",
        number: 12,
        title: "Surface Areas and Volumes",
        weightage: "≈6 marks",
        keyTopics: ["Combination of solids", "Surface area of composites", "Volume of composites"],
        boardNotes:
          "Combination-of-solids problems (cone on cylinder, hemisphere scooped out) are guaranteed; frustum is deleted. Write the combined formula before substituting — that step is separately marked.",
      },
      {
        id: "c10-maths-13",
        number: 13,
        title: "Statistics",
        weightage: "≈6 marks",
        keyTopics: ["Mean of grouped data", "Mode of grouped data", "Median of grouped data"],
        boardNotes:
          "Mean by assumed/step-deviation plus median of grouped data. The empirical relation Mode = 3 Median − 2 Mean is a repeat 1-marker, and the full working table (with cf column) must be shown.",
      },
      {
        id: "c10-maths-14",
        number: 14,
        title: "Probability",
        weightage: "≈5 marks",
        keyTopics: ["Classical probability", "Simple events", "Dice, cards and marbles"],
        boardNotes:
          "Only classical (theoretical) probability now. Marks are lost on sample-space counting — the exact composition of a 52-card deck — rather than on the formula itself.",
      },
    ],
  },

  // ==========================================================================
  // SCIENCE — 80-mark theory. Unit weightage: Chemical Substances 25,
  // World of Living 25, Natural Phenomena 12, Effects of Current 13,
  // Natural Resources 5.
  // ==========================================================================
  {
    id: "c10-science",
    name: "Science",
    classLevel: 10,
    icon: "FlaskConical",
    color: "mint",
    chapters: [
      {
        id: "c10-science-01",
        number: 1,
        title: "Chemical Reactions and Equations",
        weightage: "≈6 marks",
        keyTopics: ["Balancing equations", "Types of reactions", "Oxidation and reduction"],
        boardNotes:
          "Balance an equation and name its reaction type — asked every year. The final mark hinges on state symbols (s, l, g, aq), which most students omit after balancing correctly.",
      },
      {
        id: "c10-science-02",
        number: 2,
        title: "Acids, Bases and Salts",
        weightage: "≈6 marks",
        keyTopics: ["pH scale", "Chlor-alkali process", "Bleaching powder, baking soda, washing soda, POP"],
        boardNotes:
          "The four named salts recur annually and are asked as a bundle: chemical formula + one use + one equation. Learn them as a table, not as prose.",
      },
      {
        id: "c10-science-03",
        number: 3,
        title: "Metals and Non-metals",
        weightage: "≈6 marks",
        keyTopics: ["Reactivity series", "Extraction of metals", "Ionic compounds", "Corrosion"],
        boardNotes:
          "The reactivity series drives both displacement and extraction answers. Roasting vs calcination (and which ore each suits) is a frequent 3-marker students routinely swap.",
      },
      {
        id: "c10-science-04",
        number: 4,
        title: "Carbon and its Compounds",
        weightage: "≈7 marks",
        keyTopics: ["Covalent bonding", "Homologous series", "IUPAC nomenclature", "Soaps and micelles"],
        boardNotes:
          "Structural isomers of C4/C5 and the soap/micelle cleaning-action question dominate. Isomer marks are cut for wrong valency — every carbon must show exactly four bonds.",
      },
      {
        id: "c10-science-05",
        number: 5,
        title: "Life Processes",
        weightage: "≈8 marks",
        keyTopics: ["Nutrition", "Respiration", "Transportation", "Excretion"],
        boardNotes:
          "The single highest-weight chapter in the paper. Diagrams (nephron, human heart, digestive system) must carry exact NCERT labels — label spelling is marked, and unlabelled diagrams score zero.",
      },
      {
        id: "c10-science-06",
        number: 6,
        title: "Control and Coordination",
        weightage: "≈6 marks",
        keyTopics: ["Reflex arc", "Human brain", "Plant hormones", "Endocrine glands"],
        boardNotes:
          "Reflex arc and neuron diagrams plus a hormone table. Marks go missing when students state a hormone's function without naming its source gland — the scheme wants both.",
      },
      {
        id: "c10-science-07",
        number: 7,
        title: "How do Organisms Reproduce?",
        weightage: "≈6 marks",
        keyTopics: ["Asexual reproduction", "Sexual reproduction in plants", "Human reproductive system", "Contraception"],
        boardNotes:
          "Human reproductive system diagrams and contraceptive methods are staples. The asexual-modes question expects a named organism per mode (Hydra-budding, Planaria-regeneration), not generic description.",
      },
      {
        id: "c10-science-08",
        number: 8,
        title: "Heredity",
        weightage: "≈5 marks",
        keyTopics: ["Mendel's laws", "Monohybrid and dihybrid crosses", "Sex determination"],
        boardNotes:
          "Evolution is rationalised out of this chapter — do not revise it. Crosses must show the full Punnett square with 3:1 / 9:3:3:1 ratios stated; sex determination is the other repeat ask.",
      },
      {
        id: "c10-science-09",
        number: 9,
        title: "Light – Reflection and Refraction",
        weightage: "≈7 marks",
        keyTopics: ["Spherical mirrors", "Mirror formula", "Refraction and lenses", "Lens formula and power"],
        boardNotes:
          "Ray diagrams plus mirror/lens numericals. Sign-convention errors are the biggest single mark-loser in the whole Science paper — fix signs before substituting, not after.",
      },
      {
        id: "c10-science-10",
        number: 10,
        title: "The Human Eye and the Colourful World",
        weightage: "≈5 marks",
        keyTopics: ["Defects of vision", "Dispersion through a prism", "Scattering of light"],
        boardNotes:
          "Myopia/hypermetropia with a corrective-lens ray diagram and a power calculation is the anchor question; 'why is the sky blue / sun red at sunrise' are repeat 2-markers on scattering.",
      },
      {
        id: "c10-science-11",
        number: 11,
        title: "Electricity",
        weightage: "≈7 marks",
        keyTopics: ["Ohm's law", "Resistance in series and parallel", "Heating effect of current", "Electric power"],
        boardNotes:
          "Series/parallel numericals plus the H = I²Rt derivation. In circuit-diagram questions, ammeter must be in series and voltmeter in parallel — misplacing them costs the diagram mark outright.",
      },
      {
        id: "c10-science-12",
        number: 12,
        title: "Magnetic Effects of Electric Current",
        weightage: "≈6 marks",
        keyTopics: ["Magnetic field lines", "Fleming's left-hand rule", "Electric motor", "Electromagnetic induction"],
        boardNotes:
          "Field-line patterns and the electric-motor diagram recur. Rule questions want the rule named AND applied to the given case — stating Fleming's rule alone earns only half the marks.",
      },
      {
        id: "c10-science-13",
        number: 13,
        title: "Our Environment",
        weightage: "≈5 marks",
        keyTopics: ["Ecosystem components", "Food chains and trophic levels", "Ozone depletion", "Waste management"],
        boardNotes:
          "Now the only Natural Resources chapter (Sources of Energy and Sustainable Management are deleted). The 10% law applied to a given food chain is the standard case-based numerical.",
      },
    ],
  },

  // ==========================================================================
  // SOCIAL SCIENCE — 80-mark theory, 20 marks per book.
  // Flat numbering: History 1-5, Geography 6-12, Political Science 13-17,
  // Economics 18-22.
  // ==========================================================================
  {
    id: "c10-sst",
    name: "Social Science",
    classLevel: 10,
    icon: "Landmark",
    color: "coral",
    chapters: [
      // ---------------------------- History — India and the Contemporary World II
      {
        id: "c10-sst-01",
        number: 1,
        title: "The Rise of Nationalism in Europe",
        weightage: "≈4 marks",
        keyTopics: ["French Revolution and nationalism", "Unification of Germany and Italy", "Frédéric Sorrieu's prints"],
        boardNotes:
          "The visual-source question is almost always drawn from Sorrieu's prints here — practise reading the imagery, because describing the picture without decoding its symbolism scores nothing.",
      },
      {
        id: "c10-sst-02",
        number: 2,
        title: "Nationalism in India",
        weightage: "≈5 marks",
        keyTopics: ["Non-Cooperation Movement", "Civil Disobedience and the Salt March", "Rowlatt Act and Jallianwala Bagh"],
        boardNotes:
          "The highest-value History chapter and the source of the History map question (Congress sessions, movement sites). Dates and sequence are marked strictly — vague chronology loses marks.",
      },
      {
        id: "c10-sst-03",
        number: 3,
        title: "The Making of a Global World",
        weightage: "≈4 marks",
        keyTopics: ["Silk routes and early trade", "The Great Depression", "Bretton Woods institutions"],
        boardNotes:
          "The long question splits the Great Depression's causes from its effects on India — students who blur the two answer only half the question and cap themselves at half marks.",
      },
      {
        id: "c10-sst-04",
        number: 4,
        title: "The Age of Industrialisation",
        weightage: "≈4 marks",
        keyTopics: ["Proto-industrialisation", "Life of workers", "Decline of Indian weavers", "Market for goods"],
        boardNotes:
          "Reliably supplies a source-based extract with three sub-questions, usually on workers' lives or advertising as a historical source. Quote the extract when answering — examiners look for it.",
      },
      {
        id: "c10-sst-05",
        number: 5,
        title: "Print Culture and the Modern World",
        weightage: "≈4 marks",
        keyTopics: ["Gutenberg and the printing press", "Print in India", "Censorship and nationalism"],
        boardNotes:
          "The lightest History chapter, yet it dependably yields a 3-marker on print's role in spreading nationalism or on colonial censorship — cheap marks students skip in revision.",
      },

      // -------------------------------- Geography — Contemporary India II
      {
        id: "c10-sst-06",
        number: 6,
        title: "Resources and Development",
        weightage: "≈3 marks",
        keyTopics: ["Classification of resources", "Soil types and distribution", "Land degradation"],
        boardNotes:
          "Soil types must be tied to their regions, not just listed. Land-use data tables are the standard case-based ask — the marks are for interpreting the figures, not restating them.",
      },
      {
        id: "c10-sst-07",
        number: 7,
        title: "Forest and Wildlife Resources",
        weightage: "≈3 marks",
        keyTopics: ["Conservation of biodiversity", "Types of forests", "Community and forest conservation"],
        boardNotes:
          "Community conservation examples (Sariska, Chipko, sacred groves) are what convert a generic answer into a full-mark one — name the movement and the place, every time.",
      },
      {
        id: "c10-sst-08",
        number: 8,
        title: "Water Resources",
        weightage: "≈3 marks",
        keyTopics: ["Water scarcity", "Multipurpose river projects", "Rainwater harvesting"],
        boardNotes:
          "The Narmada Bachao Andolan critique of multipurpose projects is the repeat long question; rainwater-harvesting answers must cite a specific regional method (khadins, tankas) to score.",
      },
      {
        id: "c10-sst-09",
        number: 9,
        title: "Agriculture",
        weightage: "≈3 marks",
        keyTopics: ["Cropping seasons", "Major crops and conditions", "Institutional reforms"],
        boardNotes:
          "Rabi/kharif/zaid with crop-specific temperature and rainfall conditions is the core ask, and the map question tags major crop-producing states — learn crops with their geography attached.",
      },
      {
        id: "c10-sst-10",
        number: 10,
        title: "Minerals and Energy Resources",
        weightage: "≈3 marks",
        keyTopics: ["Types of minerals", "Distribution of minerals", "Conventional and non-conventional energy"],
        boardNotes:
          "Mineral and power-plant locations dominate the Geography map work — the highest marks-per-hour in the paper. Conventional vs non-conventional energy is the standard comparison.",
      },
      {
        id: "c10-sst-11",
        number: 11,
        title: "Manufacturing Industries",
        weightage: "≈3 marks",
        keyTopics: ["Classification of industries", "Iron and steel industry", "Industrial pollution and control"],
        boardNotes:
          "The pollution-control question expects concrete measures (treating effluents, particulate scrubbers, recycling water), not general appeals — vague 'we should save the environment' answers score nothing.",
      },
      {
        id: "c10-sst-12",
        number: 12,
        title: "Lifelines of National Economy",
        weightage: "≈3 marks",
        keyTopics: ["Roadways and railways", "Ports and airports", "Golden Quadrilateral", "International trade"],
        boardNotes:
          "Map-marking of major ports and airports is near-guaranteed here. Written questions favour why transport is called a 'lifeline' and the role of the Golden Quadrilateral.",
      },

      // ------------------------- Political Science — Democratic Politics II
      {
        id: "c10-sst-13",
        number: 13,
        title: "Power-sharing",
        weightage: "≈4 marks",
        keyTopics: ["Belgium and Sri Lanka", "Forms of power-sharing", "Prudential and moral reasons"],
        boardNotes:
          "The Belgium-vs-Sri-Lanka contrast anchors the chapter. Full marks need the forms of power-sharing plus the prudential AND moral reasons — most students give only the prudential half.",
      },
      {
        id: "c10-sst-14",
        number: 14,
        title: "Federalism",
        weightage: "≈4 marks",
        keyTopics: ["Union, State and Concurrent lists", "Language policy", "Decentralisation in India"],
        boardNotes:
          "Knowing which subject sits on which list is asked directly. Decentralisation via the 73rd/74th Amendments and India's language policy are the two recurring long questions.",
      },
      {
        id: "c10-sst-15",
        number: 15,
        title: "Gender, Religion and Caste",
        weightage: "≈4 marks",
        keyTopics: ["Sexual division of labour", "Communalism", "Caste in politics"],
        boardNotes:
          "Case-based questions hinge on distinguishing religion IN politics (legitimate) from communalism (not) — students collapse the two and lose the whole sub-question.",
      },
      {
        id: "c10-sst-16",
        number: 16,
        title: "Political Parties",
        weightage: "≈4 marks",
        keyTopics: ["Functions of parties", "National and state parties", "Challenges and reforms"],
        boardNotes:
          "Questions come paired: challenges to political parties AND the reforms addressing them. Students write the challenges well and under-write the reforms, forfeiting half the marks.",
      },
      {
        id: "c10-sst-17",
        number: 17,
        title: "Outcomes of Democracy",
        weightage: "≈4 marks",
        keyTopics: ["Accountable and responsive government", "Economic growth and inequality", "Dignity and freedom"],
        boardNotes:
          "The chapter students skim last, yet it carries a dependable 5-marker on democracy's outcomes — arguing both what democracy delivers and where it falls short is what earns full credit.",
      },

      // ------------------ Economics — Understanding Economic Development
      {
        id: "c10-sst-18",
        number: 18,
        title: "Development",
        weightage: "≈5 marks",
        keyTopics: ["Income and other goals", "Per capita income vs HDI", "Sustainable development"],
        boardNotes:
          "Nearly always a data table (income, literacy, BMI, HDI) to interpret. The marked skill is comparing states/countries from the given figures — not reciting definitions of development.",
      },
      {
        id: "c10-sst-19",
        number: 19,
        title: "Sectors of the Indian Economy",
        weightage: "≈5 marks",
        keyTopics: ["Primary, secondary and tertiary sectors", "Organised vs unorganised", "MGNREGA"],
        boardNotes:
          "The mismatch between a sector's GDP share and its employment share (agriculture especially) is asked almost every year — quote the trend, then explain disguised unemployment.",
      },
      {
        id: "c10-sst-20",
        number: 20,
        title: "Money and Credit",
        weightage: "≈5 marks",
        keyTopics: ["Double coincidence of wants", "Formal and informal credit", "Self-Help Groups"],
        boardNotes:
          "The terms-of-credit case study is the standard 4-marker. Answers must name all four terms (interest rate, collateral, documentation, mode of repayment) — three of four caps your score.",
      },
      {
        id: "c10-sst-21",
        number: 21,
        title: "Globalisation and the Indian Economy",
        weightage: "≈5 marks",
        keyTopics: ["MNCs and production networks", "Foreign trade and investment", "Fair globalisation"],
        boardNotes:
          "Marks are lost describing globalisation in the abstract. The scheme wants the mechanism — liberalisation, WTO, MNC investment — and then who gained vs who lost in India.",
      },
      {
        id: "c10-sst-22",
        number: 22,
        title: "Consumer Rights",
        weightage: "Project work only (not in the 80-mark theory paper)",
        keyTopics: ["Consumer rights and duties", "Consumer Protection Act", "Redressal mechanism"],
        boardNotes:
          "CBSE assigns this chapter to internal project work, so it is NOT examined in the theory paper — spend time on it for the 20-mark internal assessment, not for board revision.",
      },
    ],
  },

  // ==========================================================================
  // ENGLISH (Language and Literature, code 184) — 80-mark paper:
  // Reading 20, Writing & Grammar 20, Literature 40.
  // Chapters 1-19 = First Flight (book order, prose and poems interleaved),
  // chapters 20-28 = Footprints Without Feet.
  // ==========================================================================
  {
    id: "c10-english",
    name: "English",
    classLevel: 10,
    icon: "BookOpen",
    color: "sky",
    chapters: [
      // ------------------------------------------------------- First Flight
      {
        id: "c10-english-01",
        number: 1,
        title: "A Letter to God",
        weightage: "≈4 marks",
        keyTopics: ["Lencho's faith", "Irony", "G. L. Fuentes"],
        boardNotes:
          "The irony of Lencho calling the post-office staff 'a bunch of crooks' is the examiner's favourite hook — answers that retell the plot without naming the irony do not get the analysis marks.",
      },
      {
        id: "c10-english-02",
        number: 2,
        title: "Dust of Snow",
        weightage: "≈2 marks",
        keyTopics: ["Robert Frost", "Change of mood", "Symbolism of crow and hemlock"],
        boardNotes:
          "Short poem, frequent extract source. The crow and hemlock are conventionally negative yet bring joy — that reversal is the point, and it is what the 2-marker asks you to explain.",
      },
      {
        id: "c10-english-03",
        number: 3,
        title: "Fire and Ice",
        weightage: "≈2 marks",
        keyTopics: ["Robert Frost", "Desire and hatred", "End of the world"],
        boardNotes:
          "Always read as allegory: fire = desire, ice = hatred. Extract questions want the figurative reading, and a literal answer about climate scores nothing.",
      },
      {
        id: "c10-english-04",
        number: 4,
        title: "Nelson Mandela: Long Walk to Freedom",
        weightage: "≈5 marks",
        keyTopics: ["Apartheid", "Inauguration day", "Mandela's definition of courage and freedom"],
        boardNotes:
          "A standard long-answer chapter for value-based questions on courage and freedom. Mandela's line that the brave man is not he who feels no fear but conquers it is the quote to deploy.",
      },
      {
        id: "c10-english-05",
        number: 5,
        title: "A Tiger in the Zoo",
        weightage: "≈2 marks",
        keyTopics: ["Leslie Norris", "Captivity vs freedom", "Contrast structure"],
        boardNotes:
          "Built entirely on the caged-vs-wild contrast, stanza by stanza. Extract questions test that structure, so answer by pairing the two states rather than describing one.",
      },
      {
        id: "c10-english-06",
        number: 6,
        title: "Two Stories about Flying",
        weightage: "≈4 marks",
        keyTopics: ["His First Flight", "Black Aeroplane", "Overcoming fear", "Mystery of the pilot"],
        boardNotes:
          "Two separate stories under one chapter — questions name only one, so be clear which is which. The seagull's hunger-driven first flight and the unexplained pilot are the two asks.",
      },
      {
        id: "c10-english-07",
        number: 7,
        title: "How to Tell Wild Animals",
        weightage: "≈2 marks",
        keyTopics: ["Carolyn Wells", "Humour and satire", "Coined words"],
        boardNotes:
          "Comic verse — questions target the humour device (absurd identification methods, invented words like 'Bengal tiger's roar'), not animal facts.",
      },
      {
        id: "c10-english-08",
        number: 8,
        title: "The Ball Poem",
        weightage: "≈2 marks",
        keyTopics: ["John Berryman", "Loss and grief", "Growing up", "Responsibility"],
        boardNotes:
          "The ball is a symbol of first loss, not a toy. The recurring question is what the boy learns — 'the epistemology of loss' — and answers must reach the idea of accepting loss to score.",
      },
      {
        id: "c10-english-09",
        number: 9,
        title: "From the Diary of Anne Frank",
        weightage: "≈4 marks",
        keyTopics: ["Anne Frank", "Diary as a friend 'Kitty'", "Mr Keesing", "Adolescent loneliness"],
        boardNotes:
          "The Mr Keesing episode (the 'Quack, Quack, Quack' essay) is the most-asked incident; questions also probe why Anne needed to write to Kitty rather than to a person.",
      },
      {
        id: "c10-english-10",
        number: 10,
        title: "Amanda!",
        weightage: "≈2 marks",
        keyTopics: ["Robin Klein", "Nagging and freedom", "Mermaid, orphan and Rapunzel imagery"],
        boardNotes:
          "The alternating voices — parent's nagging in normal type, Amanda's fantasy in italics — are the structure being tested; identify who is speaking in the extract before interpreting.",
      },
      {
        id: "c10-english-11",
        number: 11,
        title: "Glimpses of India",
        weightage: "≈4 marks",
        keyTopics: ["A Baker from Goa", "Coorg", "Tea from Assam", "Culture and tradition"],
        boardNotes:
          "Three independent sub-texts; the paper names one. Coorg (its people, valour and coffee) and the Goan baker's enduring tradition are the sections asked most often.",
      },
      {
        id: "c10-english-12",
        number: 12,
        title: "The Trees",
        weightage: "≈2 marks",
        keyTopics: ["Adrienne Rich", "Nature and freedom", "Extended metaphor"],
        boardNotes:
          "The trees leaving the house is an extended metaphor, commonly read as women's emancipation — extract answers that stay literal about houseplants miss the intended reading.",
      },
      {
        id: "c10-english-13",
        number: 13,
        title: "Mijbil the Otter",
        weightage: "≈4 marks",
        keyTopics: ["Gavin Maxwell", "Otter as a pet", "Journey to England", "Human-animal bond"],
        boardNotes:
          "Descriptive chapter — questions ask for specific incidents (the airline box, Mij's water-play) rather than themes, so revise events with details attached.",
      },
      {
        id: "c10-english-14",
        number: 14,
        title: "Fog",
        weightage: "≈2 marks",
        keyTopics: ["Carl Sandburg", "Metaphor of the cat", "Imagery"],
        boardNotes:
          "Six lines, one device: the sustained cat metaphor. Questions ask what quality of fog each cat image conveys — silence, stealth, stillness — and expect the mapping to be spelt out.",
      },
      {
        id: "c10-english-15",
        number: 15,
        title: "Madam Rides the Bus",
        weightage: "≈4 marks",
        keyTopics: ["Vallikkannan", "Valli's curiosity", "Independence", "Encounter with death"],
        boardNotes:
          "The cow's death and Valli's sudden silence is the pivotal moment CBSE returns to — questions ask how the journey changed her, so link the incident to her loss of innocence.",
      },
      {
        id: "c10-english-16",
        number: 16,
        title: "The Tale of Custard the Dragon",
        weightage: "≈2 marks",
        keyTopics: ["Ogden Nash", "Ballad form", "Irony of the coward dragon"],
        boardNotes:
          "A ballad built on irony — the 'cowardly' dragon is the only brave one. Questions test that reversal and the poem's humour, not the sequence of events.",
      },
      {
        id: "c10-english-17",
        number: 17,
        title: "The Sermon at Benares",
        weightage: "≈4 marks",
        keyTopics: ["Gautama Buddha", "Kisa Gotami", "Mortality", "Grief and acceptance"],
        boardNotes:
          "The mustard-seed parable is the core ask: Buddha teaches by letting Kisa Gotami discover that death is universal. Value-based questions on grief route through this chapter.",
      },
      {
        id: "c10-english-18",
        number: 18,
        title: "For Anne Gregory",
        weightage: "≈2 marks",
        keyTopics: ["W. B. Yeats", "Inner vs outer beauty", "Dialogue form"],
        boardNotes:
          "Written as a dialogue — mark who speaks which stanza. The thesis (only God can love you for yourself alone) is what extract questions want articulated.",
      },
      {
        id: "c10-english-19",
        number: 19,
        title: "The Proposal",
        weightage: "≈5 marks",
        keyTopics: ["Anton Chekhov", "Farce", "Lomov, Natalya and Chubukov", "Quarrel over Oxen Meadows"],
        boardNotes:
          "The only play in the book and a favourite for long answers on character and humour — the point is that the marriage proposal succeeds despite, not because of, the quarrelling.",
      },

      // -------------------------------------------- Footprints Without Feet
      {
        id: "c10-english-20",
        number: 20,
        title: "A Triumph of Surgery",
        weightage: "≈3 marks",
        keyTopics: ["James Herriot", "Tricki the dog", "Mrs Pumphrey's indulgence", "Dr Herriot's cure"],
        boardNotes:
          "The 'surgery' is really just diet and exercise — the title's irony is the standard question, along with whether Mrs Pumphrey's love was actually harming Tricki.",
      },
      {
        id: "c10-english-21",
        number: 21,
        title: "The Thief's Story",
        weightage: "≈3 marks",
        keyTopics: ["Ruskin Bond", "Hari Singh", "Anil's trust", "Transformation"],
        boardNotes:
          "Anil's silent forgiveness — never mentioning the theft — is what reforms Hari Singh. Character-sketch questions on Anil expect that restraint to be named as kindness, not weakness.",
      },
      {
        id: "c10-english-22",
        number: 22,
        title: "The Midnight Visitor",
        weightage: "≈3 marks",
        keyTopics: ["Robert Arthur", "Ausable's presence of mind", "Anti-climax", "Balcony trick"],
        boardNotes:
          "The whole story turns on a balcony that does not exist. Questions ask how Ausable defeats Max by wit rather than action — contrast him with the conventional spy image.",
      },
      {
        id: "c10-english-23",
        number: 23,
        title: "A Question of Trust",
        weightage: "≈3 marks",
        keyTopics: ["Victor Canning", "Horace Danby", "Irony", "The woman in red"],
        boardNotes:
          "A thief robbed by another thief — the title's irony is the recurring ask. Note Horace's self-image as an honest man, which is the trait examiners want discussed.",
      },
      {
        id: "c10-english-24",
        number: 24,
        title: "Footprints without Feet",
        weightage: "≈3 marks",
        keyTopics: ["H. G. Wells", "Griffin the invisible man", "Misuse of science", "Lawlessness"],
        boardNotes:
          "The title chapter and a science-and-ethics staple: Griffin is brilliant but lawless. Questions want the argument that scientific power without responsibility becomes destructive.",
      },
      {
        id: "c10-english-25",
        number: 25,
        title: "The Making of a Scientist",
        weightage: "≈3 marks",
        keyTopics: ["Richard Ebright", "Curiosity and butterflies", "Science fairs", "Role of his mother"],
        boardNotes:
          "The most-asked question is what made Ebright a scientist — the answer must combine curiosity, competitiveness and his mother's encouragement, not just list his achievements.",
      },
      {
        id: "c10-english-26",
        number: 26,
        title: "The Necklace",
        weightage: "≈3 marks",
        keyTopics: ["Guy de Maupassant", "Matilda's discontent", "The lost necklace", "Twist ending"],
        boardNotes:
          "The classic twist — the necklace was fake and ten years were wasted. Value questions ask what Matilda should have done: confessed immediately, which is the marked answer.",
      },
      {
        id: "c10-english-27",
        number: 27,
        title: "Bholi",
        weightage: "≈3 marks",
        keyTopics: ["K. A. Abbas", "Education and empowerment", "Sulekha's transformation", "Dowry"],
        boardNotes:
          "A dependable long-answer chapter on education transforming a girl's life; the climax where Bholi rejects the dowry-demanding groom is the moment questions are built around.",
      },
      {
        id: "c10-english-28",
        number: 28,
        title: "The Book That Saved the Earth",
        weightage: "≈3 marks",
        keyTopics: ["Claire Boiko", "Martian invasion", "Mother Goose rhymes", "Misinterpretation and humour"],
        boardNotes:
          "The one-act play in the supplementary reader; humour comes from Martians misreading nursery rhymes as strategy. Questions ask how a book of rhymes averted an invasion.",
      },
    ],
  },
];
