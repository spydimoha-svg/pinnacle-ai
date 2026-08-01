import type { Question } from "../../lib/types";

// CLASS 10 SCIENCE — board question bank.
// Chapter ids copied exactly from src/data/curriculum/class10.ts (c10-science-01 … c10-science-13).
// Answers written in NCERT terminology, stepwise, the way the CBSE marking scheme awards marks.
// `source: "pyq"` is used only for questions that are unambiguously repeated board asks; a `year`
// is claimed only where genuinely confident — otherwise the question is tagged "important"/"sample".

export const C10_SCIENCE_QUESTIONS: Question[] = [
  // ==========================================================================
  // CH 1 — Chemical Reactions and Equations
  // ==========================================================================
  {
    id: "q-c10-science-01-1",
    subjectId: "c10-science",
    chapterId: "c10-science-01",
    classLevel: 10,
    text: "Write balanced chemical equations, with state symbols, for the following and identify the type of reaction in each case: (a) Iron reacts with steam to form iron(II,III) oxide and hydrogen gas. (b) Barium chloride solution reacts with sodium sulphate solution to give a white precipitate of barium sulphate and sodium chloride solution. (c) Lead nitrate is heated strongly to give lead oxide, nitrogen dioxide and oxygen.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "(a) 3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)\nType: Displacement reaction (iron displaces hydrogen from steam). It is also a redox reaction.\n\n(b) BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s) + 2NaCl(aq)\nType: Double displacement reaction (specifically a precipitation reaction — the white precipitate is BaSO₄).\n\n(c) 2Pb(NO₃)₂(s) --Heat--> 2PbO(s) + 4NO₂(g) + O₂(g)\nType: Thermal decomposition reaction (brown fumes are of nitrogen dioxide).\n\nEach equation is balanced (atoms of every element are equal on both sides) and carries the correct state symbols (s), (l), (g), (aq).",
    keywords: [
      "3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)",
      "displacement reaction",
      "BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s) + 2NaCl(aq)",
      "double displacement / precipitation",
      "thermal decomposition",
      "state symbols (s), (l), (g), (aq)",
    ],
    examinerTip:
      "Balancing earns the first mark and the reaction type the second — but the state symbols carry their own mark. Students who balance perfectly and write no (s)/(g)/(aq) lose one mark per equation.",
  },
  {
    id: "q-c10-science-01-2",
    subjectId: "c10-science",
    chapterId: "c10-science-01",
    classLevel: 10,
    text: "Why is respiration considered an exothermic reaction? Explain with the help of a balanced chemical equation.",
    marks: 2,
    type: "vsa",
    source: "pyq",
    answer:
      "During respiration, glucose taken in through food is broken down by oxidation with the oxygen we breathe in, and energy is released in the process.\n\nC₆H₁₂O₆(aq) + 6O₂(g) → 6CO₂(g) + 6H₂O(l) + Energy\n\nBecause energy (heat) is released along with the products rather than absorbed, respiration is classified as an exothermic reaction. This released energy is used by the cells to carry out all life processes, which is why we feel warm.",
    keywords: [
      "glucose is oxidised",
      "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy",
      "energy is released",
      "exothermic",
    ],
    examinerTip:
      "The word 'Energy' must actually appear on the product side of the equation — an equation without it does not prove the reaction is exothermic, and the second mark is withheld.",
  },
  {
    id: "q-c10-science-01-3",
    subjectId: "c10-science",
    chapterId: "c10-science-01",
    classLevel: 10,
    text: "Fe₂O₃ + 2Al → Al₂O₃ + 2Fe\nThe above reaction is an example of a:\n(a) combination reaction\n(b) double displacement reaction\n(c) decomposition reaction\n(d) displacement reaction",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "(d) displacement reaction.\n\nAluminium is more reactive than iron, so it displaces iron from iron(III) oxide. The reaction is highly exothermic and is known as the thermite reaction; the molten iron produced is used to join cracked railway tracks and machine parts.",
    keywords: ["displacement reaction", "aluminium more reactive than iron", "thermite reaction"],
    examinerTip:
      "Students see two compounds on each side and tick 'double displacement'. Check the reactant side: one element (Al) plus one compound means displacement, never double displacement.",
  },

  // ==========================================================================
  // CH 2 — Acids, Bases and Salts
  // ==========================================================================
  {
    id: "q-c10-science-02-1",
    subjectId: "c10-science",
    chapterId: "c10-science-02",
    classLevel: 10,
    text: "(a) Write the chemical name, chemical formula and one important use of each of the following: bleaching powder, baking soda, washing soda and plaster of Paris. (b) Write the balanced chemical equation for the preparation of bleaching powder and for the preparation of plaster of Paris.",
    marks: 5,
    type: "la",
    source: "pyq",
    answer:
      "(a)\n1. Bleaching powder — chemical name: calcium oxychloride; formula: CaOCl₂; use: for bleaching cotton and linen in the textile industry, and for disinfecting drinking water to make it free of germs.\n2. Baking soda — chemical name: sodium hydrogencarbonate; formula: NaHCO₃; use: as an ingredient of baking powder to make cakes and bread fluffy, and as a mild antacid to relieve acidity in the stomach.\n3. Washing soda — chemical name: sodium carbonate decahydrate; formula: Na₂CO₃·10H₂O; use: for removing the permanent hardness of water, and as a cleaning agent in homes and industry.\n4. Plaster of Paris — chemical name: calcium sulphate hemihydrate; formula: CaSO₄·½H₂O; use: for plastering fractured bones in hospitals (as a plaster cast), and for making toys and smooth surfaces.\n\n(b)\nPreparation of bleaching powder — chlorine is passed over dry slaked lime:\nCa(OH)₂(s) + Cl₂(g) → CaOCl₂(s) + H₂O(l)\n\nPreparation of plaster of Paris — gypsum is heated to 373 K (100 °C):\nCaSO₄·2H₂O(s) --373 K--> CaSO₄·½H₂O(s) + 1½H₂O(g)\n\nNote: Plaster of Paris, on mixing with a proper quantity of water, sets into a hard solid mass of gypsum again:\nCaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O",
    keywords: [
      "CaOCl₂ — calcium oxychloride",
      "NaHCO₃ — sodium hydrogencarbonate",
      "Na₂CO₃·10H₂O — sodium carbonate decahydrate",
      "CaSO₄·½H₂O — calcium sulphate hemihydrate",
      "Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O",
      "gypsum heated to 373 K",
    ],
    examinerTip:
      "Gypsum must be heated to exactly 373 K — writing 'heated strongly' loses the mark, because above 373 K all the water is driven off and you get anhydrous CaSO₄ (dead burnt plaster), not POP. Also, the ½ in CaSO₄·½H₂O is marked; CaSO₄·H₂O is wrong.",
  },
  {
    id: "q-c10-science-02-2",
    subjectId: "c10-science",
    chapterId: "c10-science-02",
    classLevel: 10,
    text: "A solution turns red litmus blue. Its pH is likely to be:\n(a) 1\n(b) 4\n(c) 5\n(d) 10",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "(d) 10.\n\nA solution that turns red litmus blue is basic in nature. Basic solutions have a pH greater than 7, so out of the given options only pH 10 is possible. (pH 1, 4 and 5 are all less than 7 and therefore acidic — they would turn blue litmus red instead.)",
    keywords: ["turns red litmus blue means basic", "pH greater than 7", "pH = 10"],
    examinerTip:
      "Read the direction of the colour change carefully. 'Red litmus → blue' means base; 'blue litmus → red' means acid. Students who reverse this pick option (a) and lose the whole mark.",
  },

  // ==========================================================================
  // CH 3 — Metals and Non-metals
  // ==========================================================================
  {
    id: "q-c10-science-03-1",
    subjectId: "c10-science",
    chapterId: "c10-science-03",
    classLevel: 10,
    text: "Distinguish between roasting and calcination. Write one balanced chemical equation for each, taking zinc ores as the example, and write the equation for obtaining zinc metal from its oxide.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Roasting: The sulphide ore is heated strongly in the presence of excess air (oxygen) to convert it into the oxide.\n2ZnS(s) + 3O₂(g) --Heat--> 2ZnO(s) + 2SO₂(g)\n(zinc blende)\n\nCalcination: The carbonate ore is heated strongly in the absence of, or in a limited supply of, air to convert it into the oxide.\nZnCO₃(s) --Heat--> ZnO(s) + CO₂(g)\n(calamine)\n\nDifference in one line: roasting is done for sulphide ores in excess air, calcination is done for carbonate ores in limited air.\n\nReduction of the oxide to the metal — zinc oxide is reduced to zinc by heating with carbon (a reducing agent):\nZnO(s) + C(s) → Zn(s) + CO(g)\n\nConclusion: Both roasting and calcination convert the ore into the metal oxide, because the oxide is easier to reduce to the free metal than the sulphide or carbonate.",
    keywords: [
      "roasting — sulphide ore, excess air",
      "calcination — carbonate ore, limited air",
      "2ZnS + 3O₂ → 2ZnO + 2SO₂",
      "ZnCO₃ → ZnO + CO₂",
      "ZnO + C → Zn + CO",
      "oxide is easier to reduce",
    ],
    examinerTip:
      "The two are swapped constantly. Anchor it: roaSting = Sulphide. Also, the ore type ('sulphide' / 'carbonate') and the air condition ('excess' / 'limited') are two separate marking points — stating only one is a half answer.",
  },
  {
    id: "q-c10-science-03-2",
    subjectId: "c10-science",
    chapterId: "c10-science-03",
    classLevel: 10,
    text: "Give reasons for the following observations: (a) Sodium metal is kept immersed in kerosene oil. (b) Aluminium is a highly reactive metal, yet it is used to make cooking utensils. (c) Silver articles turn black after some time when exposed to air. (d) When an iron nail is dipped in copper sulphate solution, the blue colour of the solution fades and a brown deposit appears on the nail. (e) Iron sheets are coated with a layer of zinc before use. Support your answers with balanced chemical equations wherever possible.",
    marks: 5,
    type: "la",
    source: "important",
    answer:
      "(a) Sodium is so highly reactive that it reacts vigorously with the oxygen and moisture of air and catches fire spontaneously. Keeping it immersed in kerosene oil cuts off contact with air and moisture, so accidental fires are prevented.\n\n(b) Aluminium is reactive, so on exposure to air it immediately forms a thin, hard, tough and impervious layer of aluminium oxide (Al₂O₃) on its surface. This oxide layer sticks firmly and prevents any further reaction of the metal underneath with air, water or food. Aluminium is also a good conductor of heat and has a high melting point — hence it is safe for cooking utensils.\n\n(c) Silver reacts with hydrogen sulphide (H₂S) present in air to form a black coating of silver sulphide on the surface. This is corrosion of silver (tarnishing).\n2Ag(s) + H₂S(g) → Ag₂S(s) + H₂(g)\n\n(d) Iron is more reactive than copper, so iron displaces copper from copper sulphate solution. The blue colour of Cu²⁺ ions fades and is replaced by the pale green colour of iron(II) sulphate, while the displaced reddish-brown copper deposits on the nail.\nFe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)\n   (blue)              (pale green)  (brown deposit)\nThis is a displacement reaction.\n\n(e) The process is called galvanisation. Zinc is more reactive than iron, so the zinc layer corrodes in preference to the iron and protects it. Even if the coating is scratched, the exposed iron does not rust because zinc continues to be attacked first (sacrificial protection). This prevents rusting of the iron sheet.",
    keywords: [
      "sodium reacts vigorously with oxygen and moisture — catches fire",
      "protective layer of aluminium oxide (Al₂O₃)",
      "2Ag + H₂S → Ag₂S (black silver sulphide)",
      "Fe + CuSO₄ → FeSO₄ + Cu — displacement",
      "galvanisation — zinc more reactive, sacrificial protection",
    ],
    examinerTip:
      "In 'give reasons' questions, the mark is for the reason, not the restatement. Writing 'aluminium forms an oxide layer' scores; adding that the layer is 'tough and prevents further corrosion' is what completes it. In (d), both colour changes (blue fading AND pale green appearing) are needed.",
  },

  // ==========================================================================
  // CH 4 — Carbon and its Compounds
  // ==========================================================================
  {
    id: "q-c10-science-04-1",
    subjectId: "c10-science",
    chapterId: "c10-science-04",
    classLevel: 10,
    text: "Explain the cleansing action of soap. What is a micelle? Why does soap not work effectively with hard water?",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Structure of a soap molecule: A soap molecule has two distinct ends —\n(i) a hydrophilic (water-loving) ionic end, the carboxylate head –COO⁻Na⁺, which dissolves in water, and\n(ii) a hydrophobic (water-hating) end, the long hydrocarbon chain, which dissolves in oil and grease.\n\nCleansing action: Most dirt is oily in nature. When soap is dissolved in water, the hydrophobic hydrocarbon tails attach themselves to the oily dirt while the ionic heads remain in the water. The soap molecules therefore arrange themselves in a radial cluster with the hydrocarbon tails pointing inwards, towards the oil droplet, and the ionic heads pointing outwards, into the water. Such a spherical aggregate is called a micelle. The oily dirt is thus trapped at the centre of the micelle and is lifted off the cloth. Because the ionic heads on the surface of neighbouring micelles repel each other, the micelles stay suspended in water as a colloid and do not come together. On agitating the cloth and rinsing it with water, the dirt-laden micelles are washed away, and the cloth is cleaned.\n\nSoap and hard water: Hard water contains calcium and magnesium ions. Soap reacts with these ions to form an insoluble curdy white precipitate called scum. Soap is thus wasted in forming scum instead of forming a lather, so it does not clean effectively in hard water.",
    keywords: [
      "hydrophilic ionic end and hydrophobic hydrocarbon chain",
      "micelle — spherical aggregate",
      "hydrocarbon tail in oily dirt, ionic head in water",
      "micelles remain suspended as a colloid",
      "calcium and magnesium ions form scum",
    ],
    examinerTip:
      "'Soap removes dirt' earns nothing. The marks live in the two-ended structure and in stating which end faces the oil and which faces the water — get that orientation the wrong way round and the whole explanation is marked wrong.",
  },
  {
    id: "q-c10-science-04-2",
    subjectId: "c10-science",
    chapterId: "c10-science-04",
    classLevel: 10,
    text: "Draw the structures of all the possible isomers of pentane (C₅H₁₂) and give the IUPAC name of each. What are structural isomers?",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Structural isomers are compounds that have the same molecular formula but different structures (different arrangements of atoms).\n\nPentane, C₅H₁₂, has three structural isomers:\n\n1. Straight chain — n-pentane\n   CH₃ – CH₂ – CH₂ – CH₂ – CH₃\n   IUPAC name: Pentane\n\n2. Branched, one methyl group on carbon-2 — iso-pentane\n           CH₃\n            |\n   CH₃ – CH – CH₂ – CH₃\n   IUPAC name: 2-methylbutane\n   (longest chain = 4 carbons = butane; one –CH₃ branch at position 2)\n\n3. Branched, two methyl groups on carbon-2 — neo-pentane\n           CH₃\n            |\n   CH₃ –  C  – CH₃\n            |\n           CH₃\n   IUPAC name: 2,2-dimethylpropane\n   (longest chain = 3 carbons = propane; two –CH₃ branches, both at position 2)\n\nCheck: in every structure each carbon atom has exactly four bonds and the molecular formula is C₅H₁₂.",
    keywords: [
      "same molecular formula, different structure",
      "n-pentane (pentane)",
      "2-methylbutane",
      "2,2-dimethylpropane",
      "each carbon shows four bonds",
    ],
    examinerTip:
      "Two traps. First, students draw a fourth 'isomer' by bending the chain — a bent chain is the same molecule, not a new isomer. Second, every carbon must show exactly four bonds; a carbon with three or five bonds loses that isomer's mark even if the name is right.",
  },

  // ==========================================================================
  // CH 5 — Life Processes
  // ==========================================================================
  {
    id: "q-c10-science-05-1",
    subjectId: "c10-science",
    chapterId: "c10-science-05",
    classLevel: 10,
    text: "Draw a labelled diagram of the human heart (a schematic sectional view) and trace the path of blood through it. What is double circulation, and why is it necessary in human beings?",
    marks: 5,
    type: "la",
    source: "pyq",
    answer:
      "Diagram — a schematic sectional view of the human heart, showing four chambers, must carry these NCERT labels:\n• Right atrium and Left atrium (upper chambers)\n• Right ventricle and Left ventricle (lower chambers)\n• Vena cava (entering the right atrium)\n• Pulmonary artery (leaving the right ventricle, going to the lungs)\n• Pulmonary veins (entering the left atrium, coming from the lungs)\n• Aorta (leaving the left ventricle)\n• Valves (between each atrium and its ventricle, and at the exit of each ventricle)\n• Lungs (shown to one side, connected by the pulmonary vessels)\n\nPath of blood:\n1. Deoxygenated blood from all parts of the body is brought by the vena cava into the RIGHT ATRIUM.\n2. The right atrium contracts and blood passes through a valve into the RIGHT VENTRICLE.\n3. The right ventricle contracts and pumps the blood through the PULMONARY ARTERY to the LUNGS, where it is oxygenated.\n4. Oxygenated blood returns from the lungs through the PULMONARY VEINS into the LEFT ATRIUM.\n5. The left atrium contracts and blood passes through a valve into the LEFT VENTRICLE.\n6. The left ventricle contracts and pumps the oxygenated blood into the AORTA, which distributes it to all parts of the body.\n\nDouble circulation: In one complete cycle of the body, the blood passes through the heart TWICE — once as deoxygenated blood on its way to the lungs (pulmonary circulation) and once as oxygenated blood on its way to the body (systemic circulation). This is called double circulation.\n\nWhy it is necessary: It keeps oxygenated and deoxygenated blood completely separate, so the blood sent to the body organs is fully oxygenated. Birds and mammals are warm-blooded and need a great deal of energy to maintain their body temperature, so they need a highly efficient supply of oxygen — which only this separation can provide.\n\nAdditional value points:\n• The walls of the ventricles are thicker than those of the atria because the ventricles have to pump blood into various organs.\n• The left ventricle has the thickest wall of all because it pumps blood, at high pressure, to the whole body.\n• Valves ensure that blood does not flow backwards when the atria or ventricles contract.",
    keywords: [
      "right atrium, left atrium, right ventricle, left ventricle",
      "vena cava, pulmonary artery, pulmonary veins, aorta",
      "valves prevent backward flow",
      "blood passes twice through the heart in one cycle",
      "prevents mixing of oxygenated and deoxygenated blood",
      "warm-blooded animals need high energy",
    ],
    examinerTip:
      "The diagram mark is for the LABELS, not the drawing — an unlabelled heart scores zero however neat it is. The commonest error is labelling the vessel from the right ventricle as a 'vein': it carries deoxygenated blood but it is the pulmonary ARTERY, because arteries carry blood away from the heart.",
  },
  {
    id: "q-c10-science-05-2",
    subjectId: "c10-science",
    chapterId: "c10-science-05",
    classLevel: 10,
    text: "Draw a labelled diagram of a nephron and explain how urine is formed in it. Name the organs of the human excretory system.",
    marks: 5,
    type: "la",
    source: "pyq",
    answer:
      "Organs of the human excretory system: a pair of kidneys, a pair of ureters, a urinary bladder and a urethra.\n\nDiagram — a nephron (the basic filtration unit of the kidney) must carry these NCERT labels:\n• Glomerulus — a cluster of very thin-walled blood capillaries\n• Bowman's capsule — the cup-shaped bag enclosing the glomerulus\n• Afferent arteriole (bringing blood in from the renal artery) and Efferent arteriole (carrying blood out)\n• Tubular part of the nephron — proximal convoluted tubule, loop of Henle, distal convoluted tubule\n• Peritubular capillaries surrounding the tubule\n• Collecting duct\n• Renal artery and Renal vein\n\nFormation of urine — three steps:\n\nStep 1 — Glomerular filtration:\nBlood enters the glomerulus through the afferent arteriole at high pressure. The thin walls of the glomerular capillaries act as a filter. Water, glucose, amino acids, salts and urea are filtered out of the blood into the Bowman's capsule. Blood cells and large proteins are too big to pass and stay behind in the blood. The liquid collected in the Bowman's capsule is the glomerular filtrate.\n\nStep 2 — Selective reabsorption:\nAs the filtrate flows along the tubular part of the nephron, the substances that are still useful to the body — glucose, amino acids, salts and a major amount of water — are selectively reabsorbed into the blood in the peritubular capillaries surrounding the tubule.\n\nStep 3 — Formation and collection of urine:\nThe amount of water reabsorbed depends on how much excess water there is in the body and on how much dissolved waste has to be excreted. The fluid remaining after reabsorption is urine. It flows from the collecting duct into the ureter, is carried to the urinary bladder where it is stored, and is finally passed out through the urethra.\n\nConclusion: The nephron thus removes the nitrogenous waste urea from the blood while conserving all the useful substances, so that only the waste is excreted.",
    keywords: [
      "glomerulus and Bowman's capsule",
      "glomerular filtration at high pressure",
      "selective reabsorption of glucose, amino acids, salts and water",
      "loop of Henle and collecting duct",
      "kidneys, ureters, urinary bladder, urethra",
    ],
    examinerTip:
      "Students name the steps but never say WHAT is reabsorbed. The marking scheme wants the list — glucose, amino acids, salts and a major amount of water — spelt out. Also spell 'Bowman's capsule' correctly; label spelling is marked here.",
  },
  {
    id: "q-c10-science-05-3",
    subjectId: "c10-science",
    chapterId: "c10-science-05",
    classLevel: 10,
    text: "Write the balanced chemical equation for photosynthesis. List the events that occur during the process and state where in the leaf they take place.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Balanced equation for photosynthesis:\n6CO₂(g) + 12H₂O(l) --Sunlight, Chlorophyll--> C₆H₁₂O₆(aq) + 6O₂(g) + 6H₂O(l)\n\nEvents that occur during photosynthesis (NCERT lists three):\n1. Absorption of light energy by chlorophyll.\n2. Conversion of light energy to chemical energy, and splitting of water molecules into hydrogen and oxygen.\n3. Reduction of carbon dioxide to carbohydrates.\n\nThese steps need not take place one immediately after the other — for example, in desert plants the carbon dioxide is taken up at night and the rest of the process occurs during the day.\n\nSite: The events take place in the chloroplasts of the mesophyll cells of the leaf. The chloroplasts contain the green pigment chlorophyll. Carbon dioxide enters through the stomata (tiny pores on the leaf surface, each guarded by a pair of guard cells), and water is brought to the leaf by the xylem.\n\nConclusion: Photosynthesis is the autotrophic mode of nutrition by which green plants convert light energy into chemical energy stored as carbohydrate (starch).",
    keywords: [
      "6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O",
      "absorption of light energy by chlorophyll",
      "splitting of water molecules",
      "reduction of carbon dioxide to carbohydrates",
      "chloroplasts, stomata, guard cells",
    ],
    examinerTip:
      "The three 'events' are a marking-scheme list — reproduce them as three numbered points, not as a paragraph. Also write the conditions (sunlight, chlorophyll) ON the arrow; writing them as reactants is treated as an error.",
  },

  // ==========================================================================
  // CH 6 — Control and Coordination
  // ==========================================================================
  {
    id: "q-c10-science-06-1",
    subjectId: "c10-science",
    chapterId: "c10-science-06",
    classLevel: 10,
    text: "What is a reflex action? With the help of a labelled sketch, trace the sequence of events in a reflex arc when a person touches a hot object. Why is the reflex arc completed at the level of the spinal cord and not through the brain?",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Reflex action: A reflex action is a sudden, rapid and involuntary response of the body to a stimulus. It happens without any conscious thinking — for example, jerking the hand back on touching a hot object.\n\nReflex arc — the sequence of events (labels for the sketch):\n1. RECEPTOR — the heat/pain receptor in the skin of the hand detects the stimulus (the hot object).\n2. SENSORY NEURON — carries the impulse as an electrical signal from the receptor to the spinal cord.\n3. SPINAL CORD — the impulse enters the spinal cord, where a RELAY NEURON (interneuron) in the grey matter passes it directly on.\n4. MOTOR NEURON — carries the impulse from the spinal cord to the effector.\n5. EFFECTOR — the muscle of the arm contracts and the hand is pulled away.\n\nIn short:\nReceptor → Sensory neuron → Spinal cord (relay neuron) → Motor neuron → Effector (muscle) → Response\n\nWhy at the level of the spinal cord:\n• Thinking is a complex activity of the brain and is comparatively a slow process. If the impulse had to travel to the brain, be interpreted, and a decision sent back, the delay would be enough for the hand to be burnt.\n• The nerves from all over the body meet in a bundle in the spinal cord on their way to the brain. Reflex arcs have therefore evolved as an efficient short-cut connection at this point, giving an immediate response and protecting the body from injury.\n\n(Note: the brain is still informed of the event, but the response has already happened by then.)",
    keywords: [
      "sudden, rapid, involuntary response to a stimulus",
      "Receptor → Sensory neuron → Spinal cord → Motor neuron → Effector",
      "relay neuron in the spinal cord",
      "thinking is a slow process",
      "nerves meet in a bundle in the spinal cord",
    ],
    examinerTip:
      "Two marks hide in exactness. 'Nerve' is not an answer — name the SENSORY neuron, RELAY neuron and MOTOR neuron separately, and end at the EFFECTOR (muscle), not at 'hand'. And the reason must say thinking is SLOW, not that the brain is 'not involved' — the brain does receive the information.",
  },
  {
    id: "q-c10-science-06-2",
    subjectId: "c10-science",
    chapterId: "c10-science-06",
    classLevel: 10,
    text: "Draw a labelled diagram of a neuron. Explain how information travels through a neuron and how it is passed on to the next cell.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Diagram — a neuron (nerve cell), the structural and functional unit of the nervous system, must carry these NCERT labels:\n• Dendrite (with the dendritic tip) — the branched receiving end\n• Cell body (cyton), containing the nucleus and cytoplasm\n• Axon — the long fibre carrying the impulse away\n• Nerve endings / axonal end (axon terminals)\n• Synapse — the gap between the nerve ending of one neuron and the dendrite of the next\n\nHow information travels:\n1. Information is acquired at the DENDRITIC TIP of the nerve cell.\n2. It sets off a chemical reaction there that creates an ELECTRICAL IMPULSE.\n3. This impulse travels from the dendrite to the CELL BODY, and then along the AXON to its end.\n4. At the end of the axon, the electrical impulse causes the release of some CHEMICALS (neurotransmitters).\n5. These chemicals cross the SYNAPSE — the tiny gap between two neurons — and start a similar electrical impulse in the dendrite of the NEXT NEURON.\n6. A similar synapse finally delivers such impulses from neurons to other cells, such as MUSCLE CELLS or GLANDS.\n\nConclusion: The nervous impulse thus travels electrically within a neuron and chemically across a synapse, and this one-way arrangement is what allows the message to move only in one direction.",
    keywords: [
      "dendrite, cell body (cyton), axon, nerve ending",
      "electrical impulse",
      "synapse",
      "chemicals released at the end of the axon",
      "impulse delivered to muscle cells or glands",
    ],
    examinerTip:
      "The examiner wants both mechanisms named: ELECTRICAL along the neuron, CHEMICAL across the synapse. Students describe the whole journey as electrical and lose the synapse mark. Also, 'axon' and 'dendrite' must not be swapped — information comes IN at the dendrite and goes OUT along the axon.",
  },
  {
    id: "q-c10-science-06-3",
    subjectId: "c10-science",
    chapterId: "c10-science-06",
    classLevel: 10,
    text: "Name the hormone secreted by the thyroid gland and state its function. Why is it advised to use iodised salt?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Hormone: Thyroxine, secreted by the THYROID GLAND.\n\nFunction: Thyroxine regulates carbohydrate, protein and fat metabolism in the body, so as to provide the best balance for growth.\n\nWhy iodised salt is advised: Iodine is essential for the thyroid gland to make the hormone thyroxine. If iodine is deficient in the diet, thyroxine cannot be synthesised, and the person is likely to suffer from goitre — a disease in which the neck appears swollen. Iodised salt supplies the necessary iodine and therefore prevents goitre.",
    keywords: [
      "thyroxine",
      "thyroid gland",
      "regulates carbohydrate, protein and fat metabolism",
      "iodine is necessary for the synthesis of thyroxine",
      "deficiency causes goitre",
    ],
    examinerTip:
      "In every hormone question, name the SOURCE GLAND along with the hormone and the function — the marking scheme awards all three separately, and students routinely give the function while forgetting to name the gland.",
  },

  // ==========================================================================
  // CH 7 — How do Organisms Reproduce?
  // ==========================================================================
  {
    id: "q-c10-science-07-1",
    subjectId: "c10-science",
    chapterId: "c10-science-07",
    classLevel: 10,
    text: "List any five modes of asexual reproduction, naming one organism that reproduces by each mode, and describe each mode in one line.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "1. Fission (binary fission) — Amoeba, Leishmania.\n   The single-celled parent simply splits into two daughter cells. In Amoeba the split can happen in any plane; in Leishmania, which has a whip-like flagellum, binary fission occurs in a definite orientation with respect to the flagellum.\n   (Multiple fission — Plasmodium — the parent cell divides into many daughter cells at one time.)\n\n2. Fragmentation — Spirogyra.\n   The filament simply breaks up into two or more fragments on maturing, and each fragment grows into a new individual.\n\n3. Regeneration — Planaria (also Hydra).\n   If the individual is cut into pieces, each piece grows into a complete organism, because the specialised cells proliferate and make large numbers of cells which then form different cell types and tissues.\n\n4. Budding — Hydra (also yeast).\n   Using regenerative cells, the parent puts out a bud — a small outgrowth — which develops into a tiny individual and detaches from the parent body on maturing.\n\n5. Vegetative propagation — Bryophyllum (leaf notches), also sugarcane, rose, grapes, potato.\n   New plants are produced from the vegetative parts of the plant — root, stem or leaf — without any seed.\n\n6. Spore formation — Rhizopus (bread mould).\n   The erect thread-like hyphae bear tiny blob-on-a-stick structures called sporangia, which contain hundreds of spores; each spore, on landing in a suitable moist surface, germinates into a new individual.\n\nCommon feature: In all these modes only one parent is involved, no gametes fuse, and the offspring are practically identical to the parent.",
    keywords: [
      "binary fission — Amoeba / Leishmania",
      "fragmentation — Spirogyra",
      "regeneration — Planaria",
      "budding — Hydra / yeast",
      "vegetative propagation — Bryophyllum",
      "spore formation — Rhizopus",
    ],
    examinerTip:
      "Half the mark for each mode is the ORGANISM. 'Budding' with no example, or the wrong pairing (Planaria-budding, Hydra-fragmentation), gets cut. Learn them strictly as mode-plus-organism pairs.",
  },
  {
    id: "q-c10-science-07-2",
    subjectId: "c10-science",
    chapterId: "c10-science-07",
    classLevel: 10,
    text: "List three distinct categories of contraceptive methods used by human beings, giving one example of each, and state how each works. Why is contraception adopted?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "1. Barrier methods — example: condoms (used on the penis or in the vagina).\n   How they work: physical devices that prevent the sperms from reaching and fertilising the egg. They also protect against sexually transmitted diseases.\n\n2. Chemical / hormonal methods — example: oral contraceptive pills (also hormone-releasing implants such as the loop or copper-T are used as devices; hormonal pills are taken orally).\n   How they work: they change the hormonal balance of the body so that eggs are not released and fertilisation cannot occur. They can, however, cause side effects.\n\n3. Surgical methods — example: vasectomy in males (the vas deferens is blocked to stop sperm transfer) and tubectomy in females (the fallopian tube is blocked to stop the egg from reaching the uterus).\n   How they work: they permanently prevent the gametes from meeting. If done properly, they are safe, but surgery can cause infection and other problems if not done carefully.\n\n(Devices such as the loop or copper-T placed in the uterus prevent pregnancy but can cause side effects due to irritation of the uterus.)\n\nWhy contraception is adopted: To avoid pregnancy — either to space or limit the number of children — because sexual intercourse for reasons other than reproduction is normal; and, at the level of the population, to keep the rising population in check, since the size of the human population is linked to the availability of resources.",
    keywords: [
      "barrier methods — condoms — prevent sperm from reaching the egg",
      "hormonal methods — oral pills — change the hormonal balance so eggs are not released",
      "surgical methods — vasectomy and tubectomy",
      "prevent gametes from meeting",
      "keep the population in check",
    ],
    examinerTip:
      "The question asks for three CATEGORIES, not three products. Listing condom, copper-T and pills as three 'methods' collapses two categories into one and caps you at partial marks — name the category first, then the example.",
  },

  // ==========================================================================
  // CH 8 — Heredity
  // ==========================================================================
  {
    id: "q-c10-science-08-1",
    subjectId: "c10-science",
    chapterId: "c10-science-08",
    classLevel: 10,
    text: "A pure-bred tall pea plant is crossed with a pure-bred short pea plant. (a) What will the plants of the F₁ generation look like, and why? (b) When the F₁ plants are self-pollinated, work out the F₂ generation using a Punnett square and give the phenotypic and genotypic ratios. (c) What two conclusions did Mendel draw from this experiment?",
    marks: 5,
    type: "la",
    source: "pyq",
    answer:
      "Let T = the factor (allele) for tallness (dominant) and t = the factor for shortness (recessive).\nPure-bred (homozygous) tall parent = TT. Pure-bred short parent = tt.\n\n(a) PARENT CROSS: TT × tt\nGametes: T from the tall parent, t from the short parent.\nF₁ generation: all plants are Tt.\nAppearance: ALL F₁ plants are TALL.\nReason: Both factors T and t are present in every F₁ plant, but only the effect of T is expressed. T is therefore the dominant factor and t is the recessive factor. (Law of Dominance.)\n\n(b) F₁ SELF-POLLINATION: Tt × Tt\nGametes from each parent: T and t.\n\nPunnett square:\n            T           t\n     +-----------+-----------+\n  T  |    TT     |    Tt     |\n     +-----------+-----------+\n  t  |    Tt     |    tt     |\n     +-----------+-----------+\n\nF₂ generation:\nGenotypes: TT : Tt : tt = 1 : 2 : 1\nPhenotypes: TT (tall), Tt (tall), Tt (tall), tt (short)\n           → Tall : Short = 3 : 1\n\nSo the F₂ generation shows a phenotypic ratio of 3 : 1 (tall : short) and a genotypic ratio of 1 : 2 : 1 (TT : Tt : tt).\n\n(c) Mendel's conclusions:\n1. Law of Dominance — when two contrasting factors for a trait are present together, only one of them (the dominant one) expresses itself in the F₁ generation; the other (the recessive one) does not show, but is NOT lost.\n2. Law of Segregation — the two factors of a pair separate (segregate) during gamete formation, each gamete receiving only one factor of the pair. That is why the short trait, which had disappeared in F₁, reappears in one quarter of the F₂ plants. Traits are therefore inherited independently of each other as discrete units.\n\nConclusion: The reappearance of the short plants in F₂ proves that the recessive factor t was present but unexpressed in the F₁ plants.",
    keywords: [
      "TT × tt, F₁ = Tt, all tall",
      "T is dominant, t is recessive",
      "Punnett square TT : Tt : tt",
      "phenotypic ratio 3 : 1 (tall : short)",
      "genotypic ratio 1 : 2 : 1",
      "recessive trait reappears in F₂ — it was not lost",
    ],
    examinerTip:
      "Three marks are procedural: define your symbols (T, t) before you start, draw the gametes on the outside of the Punnett square, and state BOTH ratios — students write 3:1 and forget the genotypic 1:2:1. Do not revise evolution for this chapter; it has been rationalised out.",
  },
  {
    id: "q-c10-science-08-2",
    subjectId: "c10-science",
    chapterId: "c10-science-08",
    classLevel: 10,
    text: "How is the sex of a child determined in human beings? Explain why the mother is not responsible for the sex of her child.",
    marks: 2,
    type: "vsa",
    source: "pyq",
    answer:
      "Human beings have 23 pairs of chromosomes: 22 pairs are autosomes and 1 pair is the sex chromosomes.\n• A female has two X chromosomes (XX).\n• A male has one X and one Y chromosome (XY).\n\nTherefore:\n• All the eggs (ova) produced by the mother carry an X chromosome — she can give only X.\n• The father produces two kinds of sperms: half carry an X chromosome and half carry a Y chromosome.\n\nDetermination:\n• If a sperm carrying an X chromosome fertilises the egg (X), the zygote is XX → the child is a GIRL.\n• If a sperm carrying a Y chromosome fertilises the egg (X), the zygote is XY → the child is a BOY.\n\nConclusion: Since the mother can contribute only an X chromosome to every child, the sex of the child depends entirely on which type of sperm — X-bearing or Y-bearing — from the FATHER fertilises the egg. The mother is therefore in no way responsible for the sex of her child.",
    keywords: [
      "22 pairs autosomes + 1 pair sex chromosomes",
      "female XX, male XY",
      "all eggs carry X",
      "half the sperms carry X, half carry Y",
      "sex of the child is determined by the father",
    ],
    examinerTip:
      "The conclusion sentence — that the father determines the sex because the mother can give only X — is itself a marked point. Writing the XX/XY chromosome facts alone, without drawing that conclusion, answers only half the question.",
  },

  // ==========================================================================
  // CH 9 — Light: Reflection and Refraction
  // ==========================================================================
  {
    id: "q-c10-science-09-1",
    subjectId: "c10-science",
    chapterId: "c10-science-09",
    classLevel: 10,
    text: "An object 5.0 cm high is placed at a distance of 20 cm in front of a concave mirror of focal length 15 cm. Find the position, nature and size of the image formed.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Given (applying the New Cartesian Sign Convention):\nHeight of object, h = +5.0 cm\nObject distance, u = −20 cm (object is always placed to the left of the mirror)\nFocal length, f = −15 cm (concave mirror — its focus is in front of the mirror)\n\nStep 1 — Mirror formula:\n1/v + 1/u = 1/f\n\nStep 2 — Substitute:\n1/v = 1/f − 1/u\n1/v = 1/(−15) − 1/(−20)\n1/v = −1/15 + 1/20\n1/v = (−4 + 3)/60\n1/v = −1/60\nv = −60 cm\n\nPosition: The image is formed 60 cm in front of the mirror (on the same side as the object). The negative sign shows it is a REAL image.\n\nStep 3 — Magnification:\nm = −v/u = −(−60)/(−20) = −60/20 = −3\nThe negative magnification confirms the image is real and INVERTED, and |m| = 3 > 1 means it is ENLARGED (3 times the object).\n\nStep 4 — Size of the image:\nm = h′/h  ⟹  h′ = m × h = (−3) × 5.0 cm = −15 cm\nThe height of the image is 15 cm, and the minus sign again shows the image is inverted (formed below the principal axis).\n\nConclusion: The image is formed 60 cm in front of the concave mirror; it is real, inverted, enlarged, and 15 cm in size.\n(Check: u = 20 cm lies between f = 15 cm and 2f = 30 cm — for a concave mirror an object between F and C must give a real, inverted, enlarged image beyond C. This agrees with v = 60 cm.)",
    keywords: [
      "u = −20 cm, f = −15 cm (New Cartesian Sign Convention)",
      "1/v + 1/u = 1/f",
      "v = −60 cm — real image, 60 cm in front of the mirror",
      "m = −v/u = −3",
      "h′ = −15 cm — inverted and enlarged",
    ],
    examinerTip:
      "This is the single biggest mark-loser in the paper: fix the signs BEFORE substituting, never after. For a concave mirror f is negative and u is always negative. And do not stop at v — 'position, nature and size' means you must state real/virtual, erect/inverted AND the size in cm, each carrying a mark.",
  },
  {
    id: "q-c10-science-09-2",
    subjectId: "c10-science",
    chapterId: "c10-science-09",
    classLevel: 10,
    text: "A concave lens of focal length 15 cm forms an image 10 cm from the lens. How far is the object placed from the lens? Find the magnification and state the nature of the image. Also find the power of this lens.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Given (New Cartesian Sign Convention):\nFocal length, f = −15 cm (concave lens — always negative)\nImage distance, v = −10 cm (a concave lens always forms a virtual image on the same side as the object, i.e. to the left)\n\nStep 1 — Lens formula:\n1/v − 1/u = 1/f\n\nStep 2 — Substitute:\n1/u = 1/v − 1/f\n1/u = 1/(−10) − 1/(−15)\n1/u = −1/10 + 1/15\n1/u = (−3 + 2)/30\n1/u = −1/30\nu = −30 cm\n\nThe object is placed 30 cm from the lens (on its left).\n\nStep 3 — Magnification:\nm = v/u = (−10)/(−30) = +1/3 = +0.33\n\nNature of the image: The positive magnification shows the image is VIRTUAL and ERECT, and m = 1/3 < 1 shows it is DIMINISHED (one-third the size of the object). It is formed 10 cm from the lens, on the same side as the object.\n\nStep 4 — Power of the lens:\nf = −15 cm = −0.15 m\nP = 1/f (in metres) = 1/(−0.15) = −6.67 D\n\nConclusion: The object is 30 cm in front of the lens; the image is virtual, erect and diminished (one-third the size), and the power of the lens is −6.67 D.",
    keywords: [
      "f = −15 cm, v = −10 cm",
      "1/v − 1/u = 1/f",
      "u = −30 cm",
      "m = v/u = +1/3 — virtual, erect, diminished",
      "P = 1/f(m) = −6.67 D",
    ],
    examinerTip:
      "Two silent traps. (1) The lens formula is 1/v − 1/u = 1/f — a MINUS, not the plus used for mirrors; students carry the mirror formula over and lose everything. (2) Magnification for a lens is m = v/u (no minus sign), unlike m = −v/u for a mirror. And f must be converted to METRES before finding P.",
  },
  {
    id: "q-c10-science-09-3",
    subjectId: "c10-science",
    chapterId: "c10-science-09",
    classLevel: 10,
    text: "The image formed by a concave mirror is observed to be virtual, erect and larger than the object. Where should be the position of the object?\n(a) Between the principal focus and the centre of curvature\n(b) At the centre of curvature\n(c) Beyond the centre of curvature\n(d) Between the pole of the mirror and its principal focus",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "(d) Between the pole of the mirror and its principal focus.\n\nA concave mirror forms a virtual, erect and enlarged image only when the object lies between the pole (P) and the principal focus (F). In every other position of the object the concave mirror forms a real and inverted image. (This is the arrangement used in a shaving mirror and by dentists.)",
    keywords: [
      "between the pole and the principal focus",
      "virtual, erect and enlarged",
      "concave mirror",
      "used as a shaving mirror",
    ],
    examinerTip:
      "The keyword is VIRTUAL. A concave mirror gives a virtual image in exactly one object position — between P and F. Options (a) and (c) both give real images, so they can be eliminated on sight.",
  },

  // ==========================================================================
  // CH 10 — The Human Eye and the Colourful World
  // ==========================================================================
  {
    id: "q-c10-science-10-1",
    subjectId: "c10-science",
    chapterId: "c10-science-10",
    classLevel: 10,
    text: "The far point of a myopic person is 80 cm in front of the eye. (a) Name the defect and state its two causes. (b) What is the nature and power of the lens required to correct the problem? (c) Describe, in words, the ray diagram for the corrected eye.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "(a) Defect: MYOPIA, also called near-sightedness. Such a person can see nearby objects clearly but cannot see distant objects distinctly, because the image of a distant object is formed IN FRONT OF the retina instead of on it.\nTwo causes:\n(i) excessive curvature of the eye lens (the lens is too converging), and\n(ii) elongation of the eyeball.\n\n(b) Correction: A CONCAVE (diverging) lens of suitable power is used. It diverges the incoming rays slightly before they enter the eye, so that the image of a distant object is pushed back on to the retina.\n\nThe corrective lens must form the image of an object at infinity at the far point of the eye (80 cm), so that the eye can then see it.\nObject distance, u = −∞ (object at infinity)\nImage distance, v = −80 cm = −0.8 m (the far point, in front of the lens)\n\nLens formula: 1/v − 1/u = 1/f\n1/f = 1/(−0.8) − 1/(−∞)\n1/f = −1.25 − 0\n1/f = −1.25\nf = −0.8 m = −80 cm\n\nPower, P = 1/f (in metres) = 1/(−0.8)\nP = −1.25 D\n\nSo a concave lens of power −1.25 D (focal length 80 cm) is required. The negative sign confirms the lens is concave.\n\n(c) Ray diagram in words: Parallel rays coming from a distant object strike the concave corrective lens and are diverged. They now appear to come from the far point of the eye, 80 cm in front of it. The eye lens then converges these rays exactly on to the RETINA, and the distant object is seen clearly.\n\nConclusion: The defect is myopia; it is corrected by a concave lens of power −1.25 D.",
    keywords: [
      "myopia / near-sightedness",
      "image forms in front of the retina",
      "excessive curvature of the eye lens or elongation of the eyeball",
      "concave (diverging) lens",
      "P = 1/f = −1.25 D",
    ],
    examinerTip:
      "The sign of the answer IS a mark: myopia is always corrected by a concave lens, so P must come out negative — a positive answer means you have made a sign error, and you should spot it before writing the conclusion. Also, f must be in metres before computing P: using 80 cm gives 0.0125 D, which is nonsense.",
  },
  {
    id: "q-c10-science-10-2",
    subjectId: "c10-science",
    chapterId: "c10-science-10",
    classLevel: 10,
    text: "Explain, on the basis of the scattering of light: (a) why the sky appears blue on a clear day, (b) why the Sun appears reddish at sunrise and sunset, and (c) why the sky appears dark instead of blue to an astronaut in space.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "Basic principle: The amount of scattering of light by particles depends on the size of the particles compared with the wavelength of light. Very fine particles scatter mainly the shorter wavelengths (blue), while larger particles scatter the longer wavelengths (red) as well.\n\n(a) Why the sky is blue:\nThe molecules of air and the other fine particles in the atmosphere have a size SMALLER than the wavelength of visible light. These particles are more effective in scattering light of shorter wavelengths at the blue end than light of longer wavelengths at the red end. The blue light is thus scattered in all directions and reaches our eyes from every part of the sky, so the clear sky appears blue.\n(Red light has a wavelength about 1.8 times that of blue light, so it is scattered far less.)\n\n(b) Why the Sun appears reddish at sunrise and sunset:\nAt sunrise and sunset the Sun is near the horizon, so its light has to travel a LARGER DISTANCE through thicker layers of the earth's atmosphere before reaching us. Most of the blue light and the other shorter wavelengths are scattered away by the particles along this long path. The light that finally reaches our eyes is therefore mainly of the longer wavelengths, and the Sun appears reddish.\nAt noon the Sun is overhead, its light travels a comparatively shorter distance through the atmosphere, so it appears white as very little of the blue and violet is removed.\n\n(c) Why the sky appears dark to an astronaut:\n At the great heights at which an astronaut travels there is NO ATMOSPHERE — there are no molecules or fine particles to scatter the sunlight. Since no light is scattered towards the astronaut's eyes from the sky, the sky appears dark (black) to them, while the Sun still appears as a bright disc.\n\nConclusion: All three observations follow from the same fact — the scattering of shorter (blue) wavelengths by the fine particles of the atmosphere.",
    keywords: [
      "particles smaller than the wavelength of light",
      "shorter wavelength (blue) is scattered more than red",
      "light travels a larger distance through the atmosphere at sunrise/sunset",
      "blue is scattered away, longer wavelengths reach the eye",
      "no atmosphere, hence no scattering — sky appears dark",
    ],
    examinerTip:
      "Say WHY blue is scattered more — because the particle size is smaller than the wavelength of light. 'Blue scatters more' asserted without that reason is a statement, not an explanation, and the examiner cuts it. In (b), the marked idea is the LARGER DISTANCE travelled, not that the Sun 'is far away'.",
  },

  // ==========================================================================
  // CH 11 — Electricity
  // ==========================================================================
  {
    id: "q-c10-science-11-1",
    subjectId: "c10-science",
    chapterId: "c10-science-11",
    classLevel: 10,
    text: "State Ohm's law. Draw the shape of the V–I graph for a metallic conductor and state what its slope represents. List the factors on which the resistance of a conductor depends.",
    marks: 2,
    type: "vsa",
    source: "pyq",
    answer:
      "Ohm's law: The potential difference V across the ends of a given metallic conductor in an electric circuit is directly proportional to the current I flowing through it, PROVIDED ITS TEMPERATURE REMAINS THE SAME.\n\nV ∝ I\n⟹ V = IR, where the constant R is the resistance of the conductor.\n⟹ R = V/I. The SI unit of resistance is the ohm (Ω).\n\nV–I graph: For a metallic conductor obeying Ohm's law, the graph of V (on the y-axis) against I (on the x-axis) is a STRAIGHT LINE PASSING THROUGH THE ORIGIN. The slope of this line, V/I, gives the RESISTANCE R of the conductor.\n\nFactors on which resistance depends:\n1. Length of the conductor (l) — R is directly proportional to l.\n2. Area of cross-section (A) — R is inversely proportional to A (a thicker wire has less resistance).\n3. Nature of the material of the conductor — through its resistivity ρ.\n4. Temperature of the conductor.\nCombining these: R = ρ l / A.",
    keywords: [
      "V is directly proportional to I",
      "provided the temperature remains the same",
      "V = IR",
      "straight line through the origin; slope gives R",
      "R = ρl/A — length, area of cross-section, nature of material, temperature",
    ],
    examinerTip:
      "The clause 'provided the temperature remains constant' is a separate marking point — a statement of Ohm's law without it is incomplete and is routinely cut to half. Plot V on the y-axis and I on the x-axis, or your slope gives 1/R instead of R.",
  },
  {
    id: "q-c10-science-11-2",
    subjectId: "c10-science",
    chapterId: "c10-science-11",
    classLevel: 10,
    text: "Two resistors of 6 Ω and 3 Ω are connected in parallel with each other. This parallel combination is connected in series with a 4 Ω resistor, and the whole arrangement is connected across a 6 V battery. Draw the circuit diagram and calculate: (a) the total resistance of the circuit, (b) the total current drawn from the battery, (c) the potential difference across the parallel combination, and (d) the current flowing through the 6 Ω resistor.",
    marks: 5,
    type: "la",
    source: "important",
    answer:
      "Circuit diagram (description): The 6 Ω and 3 Ω resistors are drawn side by side between the same two points (parallel). This combination is joined end-to-end with the 4 Ω resistor (series), and the two free ends are connected to the 6 V battery through a plug key. An AMMETER is connected IN SERIES with the 4 Ω resistor to read the total current, and a VOLTMETER is connected IN PARALLEL across the parallel combination.\n\nGiven: R₁ = 6 Ω, R₂ = 3 Ω (in parallel); R₃ = 4 Ω (in series); V = 6 V\n\n(a) Total resistance:\nFor the parallel part:\n1/R_p = 1/R₁ + 1/R₂\n1/R_p = 1/6 + 1/3\n1/R_p = 1/6 + 2/6 = 3/6 = 1/2\nR_p = 2 Ω\n\nFor the whole circuit (R_p in series with R₃):\nR = R_p + R₃ = 2 Ω + 4 Ω\nR = 6 Ω\n\n(b) Total current drawn from the battery:\nBy Ohm's law, I = V/R\nI = 6 V / 6 Ω\nI = 1 A\n\n(c) Potential difference across the parallel combination:\nThe total current 1 A flows through the parallel combination (R_p = 2 Ω).\nV_p = I × R_p = 1 A × 2 Ω\nV_p = 2 V\n(Check: p.d. across the 4 Ω resistor = 1 × 4 = 4 V; 2 V + 4 V = 6 V = supply voltage. ✓)\n\n(d) Current through the 6 Ω resistor:\nIn a parallel combination, the SAME potential difference (2 V) acts across each resistor.\nI₁ = V_p / R₁ = 2 V / 6 Ω\nI₁ = 0.33 A (that is, 1/3 A)\n(Check: current through 3 Ω = 2/3 = 0.67 A; I₁ + I₂ = 0.33 + 0.67 = 1 A = total current. ✓)\n\nConclusion: Total resistance = 6 Ω, total current = 1 A, p.d. across the parallel combination = 2 V, and the current through the 6 Ω resistor = 0.33 A.",
    keywords: [
      "1/R_p = 1/R₁ + 1/R₂ gives R_p = 2 Ω",
      "R = R_p + R₃ = 6 Ω",
      "I = V/R = 1 A",
      "same potential difference across resistors in parallel",
      "I₁ = V_p/R₁ = 0.33 A",
      "ammeter in series, voltmeter in parallel",
    ],
    examinerTip:
      "Two habitual errors. (1) Students compute 1/R_p and then forget to invert it, writing R_p = 1/2 Ω — always finish the reciprocal. (2) In part (d) they use the full 6 V across the 6 Ω resistor; only 2 V acts across the parallel section. And in the diagram, an ammeter drawn in parallel or a voltmeter in series forfeits the diagram mark outright.",
  },
  {
    id: "q-c10-science-11-3",
    subjectId: "c10-science",
    chapterId: "c10-science-11",
    classLevel: 10,
    text: "An electric bulb is rated 220 V and 100 W. Calculate (a) its resistance while glowing, (b) the current drawn by it when operated at 220 V, and (c) the energy consumed in kWh if the bulb is used for 5 hours every day for 30 days. Also state the heating effect relation on which an electric iron works.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Given: V = 220 V, P = 100 W\n\n(a) Resistance of the bulb:\nP = V²/R\n⟹ R = V²/P\nR = (220 V)² / 100 W\nR = 48400 / 100\nR = 484 Ω\n\n(b) Current drawn:\nP = VI\n⟹ I = P/V\nI = 100 W / 220 V\nI = 0.45 A (approximately; exactly 5/11 A)\n\n(c) Energy consumed:\nTime of use, t = 5 h/day × 30 days = 150 h\nEnergy, E = P × t = 100 W × 150 h = 15000 Wh\nE = 15000 / 1000 kWh\nE = 15 kWh (that is, 15 'units')\n\nHeating effect: An electric iron works on the JOULE'S HEATING EFFECT of electric current, given by\nH = I²Rt\nwhere H is the heat produced in joules, I the current, R the resistance of the element and t the time for which the current flows. Because the heat produced is proportional to R, the element of an electric iron is made of an alloy (nichrome) of high resistivity and high melting point, so that it becomes very hot without melting.\n\nConclusion: R = 484 Ω, I = 0.45 A, and the energy consumed in 30 days = 15 kWh.",
    keywords: [
      "R = V²/P = 484 Ω",
      "I = P/V = 0.45 A",
      "E = P × t = 15 kWh",
      "1 kWh = 1 unit",
      "H = I²Rt — Joule's heating effect",
    ],
    examinerTip:
      "Commercial energy is billed in kWh, not joules — divide watt-hours by 1000 and write the unit 'kWh'. Leaving the answer as 15000 Wh or converting to joules when the question says kWh loses the final mark, and every formula must be written before substitution because CBSE awards a step mark for the formula itself.",
  },

  // ==========================================================================
  // CH 12 — Magnetic Effects of Electric Current
  // ==========================================================================
  {
    id: "q-c10-science-12-1",
    subjectId: "c10-science",
    chapterId: "c10-science-12",
    classLevel: 10,
    text: "State Fleming's left-hand rule. With the help of a labelled diagram, explain the principle and working of an electric motor. What is the function of the split ring in it?",
    marks: 5,
    type: "la",
    source: "pyq",
    answer:
      "FLEMING'S LEFT-HAND RULE:\nStretch the thumb, forefinger and middle finger of your LEFT hand so that they are mutually perpendicular to each other. If the FOREFINGER points in the direction of the MAGNETIC FIELD and the MIDDLE FINGER in the direction of the CURRENT, then the THUMB will point in the direction of the MOTION (i.e. of the force acting on the conductor).\n\nPRINCIPLE OF AN ELECTRIC MOTOR:\nAn electric motor works on the principle that when a rectangular coil carrying current is placed in a magnetic field, the coil experiences a force and rotates. It converts electrical energy into mechanical energy.\n\nLabels required on the diagram:\n• Rectangular armature coil ABCD, wound on a soft iron core\n• Strong field magnet — north pole (N) and south pole (S)\n• Split ring commutator — the two halves of a ring, P and Q\n• Carbon brushes X and Y (pressing against the split ring)\n• Axle\n• Battery and key\n\nWORKING:\n1. Current from the battery enters the coil through brush X and the split ring half P. In the coil, current flows in the direction A → B → C → D.\n2. Arm AB carries current in one direction and arm CD in the opposite direction, while both lie in the same magnetic field.\n3. By Fleming's left-hand rule, the force acting on arm AB pushes it DOWNWARDS, and the force on arm CD pushes it UPWARDS (the forces are equal, opposite and not along the same line).\n4. These two forces form a couple, and the coil rotates anticlockwise about the axle.\n5. After the coil has turned through half a rotation, the split ring halves P and Q change contact with the brushes — P now touches Y and Q touches X.\n6. Therefore the direction of the current through the coil is REVERSED: it now flows D → C → B → A. Since the arms have also exchanged places, the force on each arm continues to push the coil in the SAME rotational sense, and the rotation continues without stopping.\n\nFUNCTION OF THE SPLIT RING:\nThe split ring acts as a COMMUTATOR. It reverses the direction of the current flowing through the coil after every half rotation. Without this reversal the coil would stop after half a turn (the couple would reverse and push it back); with it, the coil keeps rotating continuously in the same direction.\n\nConclusion: The motor thus rotates continuously, converting electrical energy into mechanical energy.",
    keywords: [
      "thumb, forefinger and middle finger of the LEFT hand mutually perpendicular",
      "forefinger = magnetic field, middle finger = current, thumb = motion/force",
      "coil ABCD, split ring commutator, brushes X and Y",
      "forces on AB and CD act in opposite directions — coil rotates",
      "split ring reverses the direction of current after every half rotation",
      "converts electrical energy into mechanical energy",
    ],
    examinerTip:
      "'State the rule' is only half of what is asked — you must then APPLY it to arms AB and CD and say which way each is pushed, or you get half the marks. Also, use the LEFT hand for the motor (force) and the RIGHT hand for the generator (induced current); swapping them is the classic slip.",
  },
  {
    id: "q-c10-science-12-2",
    subjectId: "c10-science",
    chapterId: "c10-science-12",
    classLevel: 10,
    text: "What is electromagnetic induction? State Fleming's right-hand rule. List two ways in which an induced current can be produced in a coil.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer:
      "ELECTROMAGNETIC INDUCTION:\nElectromagnetic induction is the process by which a CHANGING magnetic field in a conductor induces a current in it. In other words, when a conductor is moved in a magnetic field (or the magnetic field around a conductor is changed), a potential difference is set up across the conductor and, if the circuit is closed, an induced current flows. The phenomenon was discovered by Michael Faraday.\nThe induced current is largest when the direction of motion of the coil is at right angles to the magnetic field.\n\nFLEMING'S RIGHT-HAND RULE:\nStretch the thumb, forefinger and middle finger of your RIGHT hand so that they are mutually perpendicular to each other. If the FOREFINGER points in the direction of the MAGNETIC FIELD and the THUMB in the direction of MOTION of the conductor, then the MIDDLE FINGER will point in the direction of the INDUCED CURRENT.\n\nTWO WAYS OF PRODUCING AN INDUCED CURRENT IN A COIL:\n1. By moving a bar magnet towards or away from the coil (or by moving the coil towards or away from a stationary magnet) — the relative motion changes the magnetic field around the coil.\n2. By changing the current in a nearby coil connected to a battery — for example, by switching the current on or off, or by moving the current-carrying coil relative to the first one. The changing magnetic field of that coil induces a current in the first coil.\n\nApplication: This phenomenon is the principle of the electric generator, which converts mechanical energy into electrical energy.",
    keywords: [
      "changing magnetic field induces a current",
      "Michael Faraday",
      "RIGHT hand — forefinger = field, thumb = motion, middle finger = induced current",
      "relative motion between the magnet and the coil",
      "changing the current in a nearby coil",
      "principle of the electric generator",
    ],
    examinerTip:
      "The word that earns the mark is CHANGING (or 'relative motion') — a steady magnetic field induces nothing. And in the right-hand rule the thumb and middle finger swap roles compared with the left-hand rule: here the thumb is motion and the middle finger is the induced current.",
  },

  // ==========================================================================
  // CH 13 — Our Environment
  // ==========================================================================
  {
    id: "q-c10-science-13-1",
    subjectId: "c10-science",
    chapterId: "c10-science-13",
    classLevel: 10,
    text: "Read the passage and answer the questions that follow.\n\nIn a grassland ecosystem, the following food chain operates:\nGrass → Grasshopper → Frog → Snake\nThe grass, being the producer, has captured 10,000 J of solar energy and made it available at its trophic level.\n\n(a) Name the producer in this food chain and state the trophic level occupied by the frog.\n(b) State the '10 per cent law' and, using it, calculate the energy available to the snake. Show all the steps.\n(c) Why are food chains generally made up of only three or four trophic levels?\n(d) If DDT was sprayed on this grassland, in which organism of the chain would its concentration be the highest, and what is this phenomenon called?",
    marks: 4,
    type: "case",
    source: "important",
    answer:
      "(a) Producer: GRASS (it is autotrophic and captures solar energy through photosynthesis).\nThe frog occupies the THIRD trophic level; it is a secondary consumer.\n(Grass = first trophic level/producer; grasshopper = second trophic level/primary consumer; frog = third trophic level/secondary consumer; snake = fourth trophic level/tertiary consumer.)\n\n(b) The 10 per cent law: Only about 10 PER CENT of the energy available at one trophic level is transferred to the next trophic level and is available for the transfer to the next higher level. The remaining about 90 per cent is used up by the organism in its own life processes and is lost to the surroundings as heat.\n\nCalculation:\nEnergy available at the grass (producer) = 10,000 J\nEnergy available to the grasshopper = 10% of 10,000 J = (10/100) × 10,000 = 1,000 J\nEnergy available to the frog = 10% of 1,000 J = (10/100) × 1,000 = 100 J\nEnergy available to the snake = 10% of 100 J = (10/100) × 100 = 10 J\n\nHence the energy available to the snake = 10 J.\n\n(c) Because the transfer of energy is only 10 per cent at each step, the energy left after each transfer falls very steeply. After four trophic levels the energy remaining (10 J out of the original 10,000 J) is so small that it cannot sustain any further trophic level. Also, since energy flow is unidirectional and is lost as heat at each level, it never returns to the previous level. Food chains are therefore generally limited to three or four trophic levels.\n\n(d) The concentration of DDT would be HIGHEST in the SNAKE, the organism at the highest trophic level. This is because DDT is a non-biodegradable pesticide; it is not broken down, so it enters the food chain at the producer level and becomes progressively more concentrated at each successive trophic level. The phenomenon is called BIOLOGICAL MAGNIFICATION (biomagnification).\n\nConclusion: Only 10 J of the original 10,000 J reaches the snake, while the harmful DDT becomes most concentrated there — energy decreases up the chain, but non-biodegradable poisons increase.",
    keywords: [
      "grass is the producer",
      "frog — third trophic level, secondary consumer",
      "10 per cent law — only 10% is transferred, 90% is lost as heat",
      "10,000 J → 1,000 J → 100 J → 10 J",
      "energy flow is unidirectional",
      "biological magnification — highest in the snake",
    ],
    examinerTip:
      "Show every 10 per cent step separately — CBSE awards step marks, and a bare '10 J' with no working scores one mark instead of two. And count trophic levels from the PRODUCER as level one: students start counting at the grasshopper and place the frog at level two.",
  },
  {
    id: "q-c10-science-13-2",
    subjectId: "c10-science",
    chapterId: "c10-science-13",
    classLevel: 10,
    text: "How is ozone formed in the upper atmosphere? Why is the ozone layer important, and what has caused its depletion?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer:
      "Formation: Ozone (O₃) at the higher levels of the atmosphere is a product of ultraviolet (UV) radiation acting on oxygen (O₂) molecules. The higher-energy UV radiation splits an oxygen molecule into free oxygen atoms, which then combine with oxygen molecules to form ozone:\nO₂ --UV--> O + O\nO + O₂ → O₃ (ozone)\n\nImportance: Ozone is a deadly poison at ground level, but at the higher levels of the atmosphere it performs an essential function — it SHIELDS THE SURFACE OF THE EARTH FROM THE ULTRAVIOLET RADIATION of the Sun. This UV radiation is highly damaging to organisms; for example, it is known to cause skin cancer in human beings.\n\nCause of depletion: The amount of ozone began to drop sharply from the 1980s onwards. This drop was linked to synthetic chemicals like CHLOROFLUOROCARBONS (CFCs), which are used as refrigerants and in fire extinguishers.\n\nAction taken: In 1987 the United Nations Environment Programme (UNEP) succeeded in forging an agreement to freeze CFC production at 1986 levels.\n\nConclusion: Ozone is formed by UV acting on O₂, protects life on earth by absorbing UV radiation, and is being depleted mainly by CFCs.",
    keywords: [
      "O₂ --UV--> O + O; O + O₂ → O₃",
      "shields the earth's surface from ultraviolet radiation",
      "UV causes skin cancer",
      "chlorofluorocarbons (CFCs)",
      "UNEP — CFC production frozen at 1986 levels",
    ],
    examinerTip:
      "Do not write that ozone is formed by 'oxygen atoms joining together' — the marking scheme wants the two-step mechanism with UV splitting O₂ first. Also name CFCs specifically; 'pollution' or 'gases' as a cause of depletion earns nothing.",
  },
];
