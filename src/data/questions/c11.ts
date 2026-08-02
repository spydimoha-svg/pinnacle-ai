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
