import type { Question } from "../../lib/types";

// CLASS 12 — CHEMISTRY + BIOLOGY question bank.
// Chapter ids copied verbatim from src/data/curriculum/class12.ts.
//
// Sourcing policy: `year` is set ONLY where the question is confidently a genuine
// board PYQ of that year. Questions modelled on NCERT exercises / marking-scheme
// staples that recur across sessions are tagged "important" with no year rather
// than being dressed up as a dated PYQ.

export const C12_CHEM_BIO_QUESTIONS: Question[] = [
  // ==========================================================================
  // CHEMISTRY — c12-chemistry
  // ==========================================================================

  // ---------------------------------------------- 01 Solutions
  {
    id: "q-c12-chemistry-01-1",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-01",
    classLevel: 12,
    text: "0.1 M aqueous KCl has a higher boiling point than 0.1 M aqueous glucose. Give reason.",
    marks: 1,
    type: "vsa",
    source: "important",
    answer: `KCl is an electrolyte and dissociates in water as KCl → K⁺ + Cl⁻, so its van't Hoff factor i ≈ 2, whereas glucose is a non-electrolyte and does not dissociate (i = 1).

Elevation in boiling point is a colligative property and depends on the NUMBER of solute particles, not their nature. For the same molarity KCl furnishes nearly twice the number of particles, hence ΔT_b of KCl is nearly double that of glucose and its boiling point is higher.`,
    keywords: [
      "dissociates into K⁺ and Cl⁻",
      "van't Hoff factor i ≈ 2",
      "colligative property",
      "number of solute particles",
      "ΔT_b nearly double",
    ],
    examinerTip:
      "The mark is for 'number of particles', not for saying KCl is ionic — write the dissociation equation and quote i ≈ 2 explicitly.",
  },
  {
    id: "q-c12-chemistry-01-2",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-01",
    classLevel: 12,
    text: "2 g of benzoic acid (C₆H₅COOH) dissolved in 25 g of benzene shows a depression in freezing point equal to 1.62 K. Molal depression constant for benzene is 4.9 K kg mol⁻¹. What is the percentage association of the acid if it forms a dimer in solution?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Step 1 — Molality of the solution (assuming NO association):
Molar mass of C₆H₅COOH = 122 g mol⁻¹
Moles of benzoic acid = 2 / 122 = 0.0164 mol
Mass of benzene = 25 g = 0.025 kg
m = 0.0164 / 0.025 = 0.656 mol kg⁻¹

Step 2 — Calculated (normal) depression:
ΔT_f (calculated) = K_f × m = 4.9 × 0.656 = 3.21 K

Step 3 — van't Hoff factor:
i = ΔT_f (observed) / ΔT_f (calculated) = 1.62 / 3.21 = 0.504
(i < 1 confirms association.)

Step 4 — Relation between i and α for dimerisation:
2 C₆H₅COOH ⇌ (C₆H₅COOH)₂
i = 1 − α/2
0.504 = 1 − α/2
α/2 = 0.496  ⇒  α = 0.992

Step 5 — Result:
Percentage association = 0.992 × 100 = 99.2 %

Conclusion: about 99.2 % of the benzoic acid exists as the dimer in benzene.`,
    keywords: [
      "ΔT_f = K_f × m",
      "i = observed / calculated ΔT_f",
      "i < 1 indicates association",
      "i = 1 − α/2 for dimer",
      "99.2 % association",
    ],
    examinerTip:
      "Students use i = 1 + α (the dissociation formula) here and lose every step mark after it — for a dimer n = 2, so i = 1 − α/2.",
  },

  // ---------------------------------------------- 02 Electrochemistry
  {
    id: "q-c12-chemistry-02-1",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-02",
    classLevel: 12,
    text: "Calculate the EMF of the following cell at 298 K and the standard Gibbs energy change for the cell reaction:\nMg(s) | Mg²⁺ (0.001 M) || Cu²⁺ (0.0001 M) | Cu(s)\nGiven E°(Mg²⁺/Mg) = −2.37 V, E°(Cu²⁺/Cu) = +0.34 V, F = 96500 C mol⁻¹.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Step 1 — Electrode reactions and cell reaction:
Anode (oxidation, LHS): Mg(s) → Mg²⁺(aq) + 2e⁻
Cathode (reduction, RHS): Cu²⁺(aq) + 2e⁻ → Cu(s)
Overall cell reaction: Mg(s) + Cu²⁺(aq) → Mg²⁺(aq) + Cu(s),  n = 2

Step 2 — Standard cell potential:
E°_cell = E°_cathode − E°_anode
E°_cell = 0.34 − (−2.37) = 2.71 V

Step 3 — Nernst equation at 298 K:
E_cell = E°_cell − (0.0591 / n) log ([Mg²⁺] / [Cu²⁺])

Step 4 — Substitution:
E_cell = 2.71 − (0.0591 / 2) log (0.001 / 0.0001)
E_cell = 2.71 − (0.02955) log (10)
E_cell = 2.71 − 0.02955 × 1
E_cell = 2.6805 ≈ 2.68 V

Step 5 — Standard Gibbs energy change:
ΔG° = − n F E°_cell
ΔG° = − 2 × 96500 C mol⁻¹ × 2.71 V
ΔG° = − 523030 J mol⁻¹ = − 523.03 kJ mol⁻¹

Conclusion: E_cell = 2.68 V and ΔG° = −523.03 kJ mol⁻¹. ΔG° is negative, so the cell reaction is spontaneous.`,
    keywords: [
      "E°_cell = E°_cathode − E°_anode",
      "Nernst equation E_cell = E°_cell − (0.0591/n) log Q",
      "n = 2",
      "E_cell = 2.68 V",
      "ΔG° = −nFE°_cell = −523.03 kJ mol⁻¹",
    ],
    examinerTip:
      "Two habitual losses: putting the reaction quotient upside down (products/reactants — Mg²⁺ on top), and using E_cell instead of E°_cell in ΔG° = −nFE°_cell.",
  },
  {
    id: "q-c12-chemistry-02-2",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-02",
    classLevel: 12,
    text: "State Kohlrausch's law of independent migration of ions. Calculate Λ°_m for acetic acid, given Λ°_m(CH₃COONa) = 91.0, Λ°_m(HCl) = 425.9 and Λ°_m(NaCl) = 126.4 S cm² mol⁻¹.",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `Statement: Kohlrausch's law of independent migration of ions states that the limiting molar conductivity of an electrolyte is the sum of the individual contributions of its cation and anion, each ion migrating independently of the other ion.
Λ°_m = ν₊ λ°₊ + ν₋ λ°₋

Calculation:
Λ°_m(CH₃COOH) = Λ°_m(CH₃COONa) + Λ°_m(HCl) − Λ°_m(NaCl)
Λ°_m(CH₃COOH) = 91.0 + 425.9 − 126.4
Λ°_m(CH₃COOH) = 390.5 S cm² mol⁻¹

Conclusion: the limiting molar conductivity of acetic acid is 390.5 S cm² mol⁻¹. It cannot be obtained by extrapolation because acetic acid is a weak electrolyte.`,
    keywords: [
      "limiting molar conductivity",
      "sum of individual contributions of the ions",
      "ions migrate independently",
      "390.5 S cm² mol⁻¹",
      "weak electrolyte — cannot extrapolate",
    ],
    examinerTip:
      "Write the combination equation before substituting, and never drop the unit S cm² mol⁻¹ — the marking scheme deducts for a bare number.",
  },

  // ---------------------------------------------- 03 Chemical Kinetics
  {
    id: "q-c12-chemistry-03-1",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-03",
    classLevel: 12,
    text: "A first order reaction takes 40 minutes for 30 % decomposition. Calculate its rate constant and its half-life (t₁/₂).",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Step 1 — First order integrated rate equation:
k = (2.303 / t) log ([R]₀ / [R])

Step 2 — Substitution:
Let [R]₀ = 100. Decomposed = 30, so [R] remaining = 100 − 30 = 70, and t = 40 min.
k = (2.303 / 40) log (100 / 70)
k = (0.0576) × log (1.4286)
k = 0.0576 × 0.1549
k = 8.92 × 10⁻³ min⁻¹

Step 3 — Half-life of a first order reaction:
t₁/₂ = 0.693 / k
t₁/₂ = 0.693 / (8.92 × 10⁻³)
t₁/₂ = 77.7 min

Conclusion: k = 8.92 × 10⁻³ min⁻¹ and t₁/₂ = 77.7 minutes. Note that t₁/₂ is independent of the initial concentration for a first order reaction.`,
    keywords: [
      "k = (2.303/t) log([R]₀/[R])",
      "[R] = 70 (not 30)",
      "k = 8.92 × 10⁻³ min⁻¹",
      "t₁/₂ = 0.693/k",
      "t₁/₂ = 77.7 min",
    ],
    examinerTip:
      "The classic blunder is substituting the amount DECOMPOSED (30) instead of the amount REMAINING (70) — and time must stay in minutes so k carries min⁻¹.",
  },
  {
    id: "q-c12-chemistry-03-2",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-03",
    classLevel: 12,
    text: "Read the passage and answer the questions.\nFor the reaction A + B → Products, the following initial-rate data were obtained at constant temperature:\nExp 1: [A] = 0.1 M, [B] = 0.1 M, initial rate = 6.0 × 10⁻³ mol L⁻¹ min⁻¹\nExp 2: [A] = 0.3 M, [B] = 0.2 M, initial rate = 7.2 × 10⁻² mol L⁻¹ min⁻¹\nExp 3: [A] = 0.3 M, [B] = 0.4 M, initial rate = 2.88 × 10⁻¹ mol L⁻¹ min⁻¹\nExp 4: [A] = 0.4 M, [B] = 0.1 M, initial rate = 2.40 × 10⁻² mol L⁻¹ min⁻¹\n(a) Determine the order of the reaction with respect to A.\n(b) Determine the order with respect to B.\n(c) Write the rate law and the overall order.\n(d) Calculate the rate constant with its units.",
    marks: 4,
    type: "case",
    source: "important",
    answer: `Let rate = k [A]^x [B]^y.

(a) Order with respect to A — compare Exp 1 and Exp 4 ([B] is constant at 0.1 M):
[A] increases 0.1 → 0.4, i.e. 4 times.
Rate increases 6.0 × 10⁻³ → 2.40 × 10⁻², i.e. 4 times.
4 = (4)^x ⇒ x = 1. Order with respect to A = 1.

(b) Order with respect to B — compare Exp 2 and Exp 3 ([A] is constant at 0.3 M):
[B] increases 0.2 → 0.4, i.e. 2 times.
Rate increases 7.2 × 10⁻² → 2.88 × 10⁻¹, i.e. 4 times.
4 = (2)^y ⇒ y = 2. Order with respect to B = 2.

(c) Rate law: Rate = k [A]¹ [B]²
Overall order = x + y = 1 + 2 = 3 (third order reaction).

(d) Rate constant — substitute Exp 1:
6.0 × 10⁻³ = k (0.1)¹ (0.1)²
6.0 × 10⁻³ = k × 1.0 × 10⁻³
k = 6.0 L² mol⁻² min⁻¹

Conclusion: Rate = 6.0 [A][B]² mol L⁻¹ min⁻¹, the reaction is first order in A, second order in B and third order overall.`,
    keywords: [
      "compare experiments with one concentration constant",
      "order w.r.t. A = 1, order w.r.t. B = 2",
      "Rate = k[A][B]²",
      "overall order = 3",
      "k = 6.0 L² mol⁻² min⁻¹",
    ],
    examinerTip:
      "Order is found from data, never from stoichiometry. The unit of k for an nth order reaction is mol^(1−n) L^(n−1) time⁻¹ — for n = 3 that is L² mol⁻² min⁻¹, and a missing unit costs the last mark.",
  },

  // ---------------------------------------------- 04 The d- and f-Block Elements
  {
    id: "q-c12-chemistry-04-1",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-04",
    classLevel: 12,
    text: "Give reasons: (a) Mn²⁺ is more resistant to oxidation to Mn³⁺ than Fe²⁺ is to Fe³⁺. (b) Transition metals form interstitial compounds. (c) E°(Cu²⁺/Cu) is positive (+0.34 V), unlike that of the other members of the 3d series.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(a) Mn²⁺ has the configuration 3d⁵, which is exactly half-filled and therefore has extra stability due to symmetrical distribution and maximum exchange energy. Oxidising it to Mn³⁺ (3d⁴) destroys that stability, so Mn²⁺ resists oxidation. Fe²⁺ is 3d⁶; on oxidation it gives Fe³⁺ (3d⁵), the stable half-filled configuration, so Fe²⁺ is readily oxidised.

(b) Transition metals have voids (interstitial sites) in their crystal lattices. Small non-metal atoms such as hydrogen, carbon, nitrogen and boron get trapped in these voids, forming interstitial compounds. These are non-stoichiometric, very hard, retain metallic conductivity and have high melting points.

(c) The sum of the enthalpy of atomisation and the ionisation enthalpy needed to convert Cu(s) → Cu²⁺(g) is very high for copper, and this is NOT balanced by its hydration enthalpy. Hence the overall energy change for Cu(s) → Cu²⁺(aq) is unfavourable and E°(Cu²⁺/Cu) comes out positive.`,
    keywords: [
      "3d⁵ half-filled — extra stability / exchange energy",
      "Fe³⁺ is 3d⁵ so Fe²⁺ oxidises easily",
      "small atoms H, C, N trapped in interstitial voids",
      "non-stoichiometric, hard, high melting",
      "high atomisation + ionisation enthalpy not balanced by hydration enthalpy",
    ],
    examinerTip:
      "Reason-based questions need the electronic configuration written out (3d⁵, 3d⁶) — 'because it is more stable' with no configuration scores zero.",
  },
  {
    id: "q-c12-chemistry-04-2",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-04",
    classLevel: 12,
    text: "Write the ionic equation for the reaction of acidified potassium dichromate with potassium iodide, and state the change in oxidation state of chromium.",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `Ionic equation:
Cr₂O₇²⁻ + 14 H⁺ + 6 I⁻ → 2 Cr³⁺ + 7 H₂O + 3 I₂

Oxidation state change of chromium:
In Cr₂O₇²⁻ chromium is in the +6 oxidation state; in Cr³⁺ it is in the +3 oxidation state.
Hence Cr is reduced from +6 to +3 (a gain of 3 electrons per Cr atom, 6 electrons per dichromate ion).

Conclusion: acidified K₂Cr₂O₇ acts as a strong oxidising agent, oxidising iodide to iodine, while the orange dichromate is itself reduced to the green Cr³⁺ ion.`,
    keywords: [
      "Cr₂O₇²⁻ + 14H⁺ + 6I⁻ → 2Cr³⁺ + 7H₂O + 3I₂",
      "+6 to +3",
      "oxidising agent",
      "iodide oxidised to iodine",
      "orange to green",
    ],
    examinerTip:
      "The equation must be balanced for charge as well as atoms — an unbalanced equation earns nothing however correct the products, so always check 14 H⁺ and 7 H₂O.",
  },

  // ---------------------------------------------- 05 Coordination Compounds
  {
    id: "q-c12-chemistry-05-1",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-05",
    classLevel: 12,
    text: "[Fe(CN)₆]³⁻ and [FeF₆]³⁻ are both octahedral, yet one is a low-spin and the other a high-spin complex. On the basis of valence bond theory, state the type of hybridisation, the number of unpaired electrons and the magnetic moment (spin only) of each. (Atomic number of Fe = 26)",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `In both complexes iron is in the +3 oxidation state: Fe³⁺ = [Ar] 3d⁵ 4s⁰.

(i) [Fe(CN)₆]³⁻
CN⁻ is a strong field ligand, so it causes pairing of the 3d electrons. The 3d⁵ electrons rearrange as t₂g⁵ e_g⁰, leaving two 3d orbitals vacant.
Hybridisation: d²sp³ (inner orbital / low spin complex), octahedral shape.
Number of unpaired electrons, n = 1
μ = √[n(n + 2)] = √[1(1 + 2)] = √3 = 1.73 BM → paramagnetic.

(ii) [FeF₆]³⁻
F⁻ is a weak field ligand, so it does NOT cause pairing. The five 3d electrons remain unpaired and outer orbitals are used.
Hybridisation: sp³d² (outer orbital / high spin complex), octahedral shape.
Number of unpaired electrons, n = 5
μ = √[5(5 + 2)] = √35 = 5.92 BM → strongly paramagnetic.

Conclusion: the difference arises solely from the ligand field strength — CN⁻ lies high and F⁻ low in the spectrochemical series.`,
    keywords: [
      "Fe³⁺ = 3d⁵",
      "CN⁻ strong field ligand causes pairing — d²sp³, inner orbital, low spin",
      "F⁻ weak field ligand — sp³d², outer orbital, high spin",
      "μ = √[n(n+2)] BM",
      "1.73 BM and 5.92 BM",
    ],
    examinerTip:
      "Find the oxidation state and the d-configuration FIRST — students who jump straight to hybridisation usually use Fe⁰ or Fe²⁺ and lose the whole question. Magnetic moment must carry the unit BM.",
  },
  {
    id: "q-c12-chemistry-05-2",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-05",
    classLevel: 12,
    text: "(a) Write the IUPAC name of [Pt(NH₃)₂Cl₂]. (b) This complex shows two geometrical isomers — name them and state which one is used as an anticancer drug. (c) What type of isomerism is shown by [Co(NH₃)₅(NO₂)]Cl₂ because of the NO₂⁻ ligand?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(a) IUPAC name of [Pt(NH₃)₂Cl₂]: diamminedichloridoplatinum(II).

(b) Being a square planar complex of the type [Ma₂b₂], it shows geometrical (cis-trans) isomerism:
- cis-isomer: the two NH₃ groups (and the two Cl⁻ groups) occupy adjacent positions. This is CIS-PLATIN, and it is the isomer used as an anticancer drug — it binds to DNA in cancer cells and prevents replication.
- trans-isomer: the two NH₃ groups (and the two Cl⁻ groups) are opposite each other. TRANS-PLATIN is therapeutically inactive.

(c) NO₂⁻ is an ambidentate ligand — it can coordinate to the metal either through the nitrogen atom (as –NO₂, nitro) or through an oxygen atom (as –ONO, nitrito). Because the same ligand can bind through two different donor atoms, [Co(NH₃)₅(NO₂)]Cl₂ shows LINKAGE ISOMERISM.`,
    keywords: [
      "diamminedichloridoplatinum(II)",
      "square planar — cis-trans (geometrical) isomerism",
      "cis-platin is the anticancer drug, trans-platin is inactive",
      "NO₂⁻ is an ambidentate ligand",
      "linkage isomerism",
    ],
    examinerTip:
      "Students frequently swap the two isomers — it is the CIS form (identical ligands adjacent) that is the anticancer drug; say so explicitly rather than just naming both isomers.",
  },

  // ---------------------------------------------- 06 Haloalkanes and Haloarenes
  {
    id: "q-c12-chemistry-06-1",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-06",
    classLevel: 12,
    text: "(a) Write the mechanism of the reaction of CH₃CH₂Br with aqueous KOH. (b) Arrange the following in increasing order of reactivity towards SN1 reaction: 1-bromobutane, 2-bromobutane, 2-bromo-2-methylpropane, bromomethane.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(a) Mechanism — SN2 (bimolecular nucleophilic substitution), because CH₃CH₂Br is a primary alkyl halide.

Step 1: The nucleophile OH⁻ attacks the carbon bearing bromine from the BACK side, exactly opposite to the leaving group Br⁻.
Step 2: A transition state is formed in which the carbon is simultaneously partially bonded to both OH and Br (carbon is pentacoordinate, sp² with the two partial bonds perpendicular to the plane):
   HO⁻ ---- C ---- Br  (transition state)
Step 3: As the C–OH bond forms, the C–Br bond breaks; Br⁻ leaves and the product CH₃CH₂OH is formed.

Key features: the reaction occurs in ONE step, rate = k[CH₃CH₂Br][OH⁻] (second order, bimolecular), and the configuration at the carbon is INVERTED (Walden inversion — the umbrella turning inside out in the wind).

(b) SN1 proceeds through a carbocation intermediate, so reactivity follows carbocation stability (3° > 2° > 1° > methyl).
Increasing order of SN1 reactivity:
bromomethane < 1-bromobutane < 2-bromobutane < 2-bromo-2-methylpropane`,
    keywords: [
      "SN2 — back side attack",
      "transition state, carbon partially bonded to both nucleophile and leaving group",
      "single step, rate = k[RX][OH⁻], bimolecular",
      "inversion of configuration (Walden inversion)",
      "SN1 order follows carbocation stability 3° > 2° > 1° > methyl",
    ],
    examinerTip:
      "The stereochemistry mark is the one everyone forgets — you must state that SN2 gives inversion of configuration, not merely draw the arrows.",
  },
  {
    id: "q-c12-chemistry-06-2",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-06",
    classLevel: 12,
    text: "(a) Chlorobenzene has a much lower dipole moment than cyclohexyl chloride. Explain why. (b) Chlorobenzene is extremely unreactive towards nucleophilic substitution reactions even though chlorine is an ortho/para directing group in electrophilic substitution. Explain why.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(a) In chlorobenzene, chlorine is attached to an sp² hybridised carbon of the benzene ring. A lone pair on chlorine is delocalised into the ring by RESONANCE, giving the C–Cl bond partial double bond character; this pulls electron density away from chlorine towards the ring and reduces the polarity of the C–Cl bond, so chlorobenzene has a low dipole moment.
In cyclohexyl chloride, chlorine is attached to an sp³ hybridised carbon with no such resonance possible, so the C–Cl bond remains fully polar and the dipole moment is higher.

(b) Reasons for the low reactivity of chlorobenzene towards nucleophilic substitution:
1. Resonance effect: as in (a), the partial double bond character makes the C–Cl bond shorter and stronger than a normal C–Cl single bond, so it is much harder to break.
2. The carbon bearing Cl is sp² hybridised; sp² carbon is more electronegative than sp³ carbon and holds the bonding electron pair of the C–Cl bond more tightly, resisting attack by a nucleophile.
3. Any nucleophile approaching the ring is repelled by the high electron density of the ring (itself increased by the resonance donation from Cl), which further discourages nucleophilic attack.

Conclusion: the very resonance that makes chlorine an o/p-director in electrophilic substitution is what makes the C–Cl bond too strong for nucleophilic substitution.`,
    keywords: [
      "resonance gives C–Cl partial double bond character in chlorobenzene",
      "lower dipole moment than cyclohexyl chloride",
      "sp² carbon holds C–Cl electron pair more tightly",
      "shorter, stronger C–Cl bond resists nucleophilic attack",
      "electron-rich ring repels the incoming nucleophile",
    ],
    examinerTip:
      "The same resonance argument answers both parts — examiners want the SAME reason (delocalisation of Cl lone pair into the ring) applied twice, to dipole moment and to reactivity, not two unrelated explanations.",
  },

  // ---------------------------------------------- 07 Alcohols, Phenols and Ethers
  {
    id: "q-c12-chemistry-07-1",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-07",
    classLevel: 12,
    text: "(a) Arrange in increasing order of acid strength and justify: ethanol, phenol, p-cresol, p-nitrophenol. (b) Write the chemical equation for Kolbe's reaction. (c) Write the chemical equation for Reimer–Tiemann reaction.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(a) Increasing order of acid strength:
ethanol < p-cresol < phenol < p-nitrophenol

Justification:
- Ethanol is the weakest acid because the ethoxide ion has NO resonance stabilisation, and the alkyl group is electron releasing (+I), which intensifies the negative charge on oxygen.
- In phenol the phenoxide ion is stabilised by resonance (the negative charge is delocalised over the benzene ring), so phenol is far more acidic than ethanol.
- p-cresol carries –CH₃, an electron releasing group (+I, hyperconjugation). It increases electron density on the ring, destabilises the phenoxide ion and so decreases acidity below that of phenol.
- p-nitrophenol carries –NO₂, a strong electron withdrawing group (–I and –R). It disperses the negative charge of the phenoxide ion, stabilises it, and so makes p-nitrophenol the strongest acid of the four.

(b) Kolbe's reaction:
C₆H₅OH + NaOH → C₆H₅O⁻Na⁺ (sodium phenoxide)
C₆H₅O⁻Na⁺ + CO₂ --(400 K, 4–7 atm)--> sodium salicylate --(H₃O⁺)--> salicylic acid (2-hydroxybenzoic acid)

(c) Reimer–Tiemann reaction:
C₆H₅OH + CHCl₃ + 3 NaOH (aq) --(340 K)--> intermediate salt --(H₃O⁺)--> salicylaldehyde (2-hydroxybenzaldehyde)
The electrophile is dichlorocarbene, :CCl₂.`,
    keywords: [
      "phenoxide ion stabilised by resonance",
      "electron releasing group (+I) decreases acidity",
      "electron withdrawing –NO₂ (–I, –R) increases acidity",
      "Kolbe's reaction gives salicylic acid",
      "Reimer–Tiemann gives salicylaldehyde via dichlorocarbene :CCl₂",
    ],
    examinerTip:
      "Justify with the stability of the ANION (phenoxide), not of the acid molecule — and both named reactions need the reagent AND the condition (400 K/4–7 atm; CHCl₃ + NaOH at 340 K) written on the arrow.",
  },
  {
    id: "q-c12-chemistry-07-2",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-07",
    classLevel: 12,
    text: "Write the mechanism of acid-catalysed dehydration of ethanol to ethene using concentrated H₂SO₄. Name the type of mechanism involved.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Dehydration of ethanol with concentrated H₂SO₄ at 443 K proceeds by an E1 (unimolecular elimination) mechanism, in three steps:

Step 1 — Protonation of the –OH group:
CH₃CH₂OH + H₂SO₄ → CH₃CH₂O⁺H₂ + HSO₄⁻
The oxygen of ethanol is protonated, converting the poor leaving group (OH⁻) into a good leaving group (H₂O).

Step 2 — Formation of the carbocation (slow, rate-determining step):
CH₃CH₂O⁺H₂ → CH₃CH₂⁺ + H₂O
The protonated alcohol loses a water molecule to form a carbocation.

Step 3 — Elimination of a β-hydrogen (fast step):
CH₃CH₂⁺ → CH₂=CH₂ + H⁺
The HSO₄⁻ (or another base) removes a proton from the carbon adjacent to the carbocation, forming the C=C double bond and regenerating H⁺, which is why the acid is a catalyst.

Conclusion: overall, CH₃CH₂OH --(conc. H₂SO₄, 443 K)--> CH₂=CH₂ + H₂O, proceeding through an E1 pathway with a carbocation intermediate.`,
    keywords: [
      "protonation of –OH gives a good leaving group",
      "loss of water forms a carbocation — rate determining step",
      "loss of β-hydrogen forms the C=C bond",
      "E1 (unimolecular elimination) mechanism",
      "conc. H₂SO₄, 443 K",
    ],
    examinerTip:
      "Label the carbocation step as the RATE DETERMINING STEP and name the mechanism as E1 explicitly — a mechanism drawn correctly but left unnamed loses a mark in the CBSE scheme.",
  },

  // ---------------------------------------------- 08 Aldehydes, Ketones and Carboxylic Acids
  {
    id: "q-c12-chemistry-08-1",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-08",
    classLevel: 12,
    text: "(a) How will you distinguish between benzaldehyde and acetophenone by two chemical tests? (b) Write the chemical equation for the Cannizzaro reaction of benzaldehyde. (c) Write the product formed when ethanal is treated with dilute NaOH, and name the reaction. (d) Why is the boiling point of ethanoic acid higher than that of propan-1-ol of comparable molar mass?",
    marks: 5,
    type: "la",
    source: "important",
    answer: `(a) Distinction between benzaldehyde (C₆H₅CHO) and acetophenone (C₆H₅COCH₃):

Test 1 — Tollens' reagent [ammoniacal silver nitrate, Ag(NH₃)₂⁺]:
Benzaldehyde is an aldehyde, so it is oxidised and gives a bright SILVER MIRROR on the walls of the test tube.
C₆H₅CHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → C₆H₅COO⁻ + 2Ag↓ + 4NH₃ + 2H₂O
Acetophenone is a ketone and gives NO silver mirror (negative test).

Test 2 — Iodoform test (I₂ / NaOH):
Acetophenone contains the CH₃CO– group attached to carbon, so it gives a YELLOW PRECIPITATE of iodoform (CHI₃).
C₆H₅COCH₃ + 3I₂ + 4NaOH → C₆H₅COONa + CHI₃↓ + 3NaI + 3H₂O
Benzaldehyde has no CH₃CO– group and gives NO yellow precipitate (negative test).

(b) Cannizzaro reaction — benzaldehyde has NO alpha hydrogen, so on treatment with concentrated alkali it undergoes disproportionation (self oxidation–reduction):
2 C₆H₅CHO + conc. NaOH → C₆H₅CH₂OH + C₆H₅COO⁻Na⁺
(benzyl alcohol + sodium benzoate)

(c) Aldol condensation. Ethanal has alpha hydrogen, so with dilute NaOH:
2 CH₃CHO --(dil. NaOH)--> CH₃CH(OH)CH₂CHO  (3-hydroxybutanal, the "aldol")
On heating, the aldol loses water:
CH₃CH(OH)CH₂CHO --(Δ, –H₂O)--> CH₃CH=CHCHO  (but-2-enal)

(d) Ethanoic acid molecules form INTERMOLECULAR HYDROGEN BONDING and exist as a cyclic DIMER in which two hydrogen bonds hold two molecules together. Alcohols also hydrogen bond but do not form such a stable dimer. Hence more energy is needed to separate carboxylic acid molecules and its boiling point is higher.`,
    keywords: [
      "Tollens' reagent — silver mirror with aldehyde only",
      "iodoform test — yellow precipitate of CHI₃ with CH₃CO– group",
      "Cannizzaro — no alpha hydrogen, disproportionation",
      "benzyl alcohol and sodium benzoate",
      "aldol condensation gives 3-hydroxybutanal then but-2-enal",
      "intermolecular hydrogen bonding — cyclic dimer",
    ],
    examinerTip:
      "For a distinguishing test you must name the reagent AND the observation for BOTH compounds — 'benzaldehyde gives silver mirror' alone is half a mark; you have to add that acetophenone does not.",
  },

  // ---------------------------------------------- 09 Amines
  {
    id: "q-c12-chemistry-09-1",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-09",
    classLevel: 12,
    text: "(a) Arrange the following in increasing order of basic strength in aqueous solution: NH₃, C₂H₅NH₂, (C₂H₅)₂NH, (C₂H₅)₃N. Give reason. (b) Why is aniline a weaker base than ethylamine? (c) Write the chemical equation for the Sandmeyer reaction used to prepare chlorobenzene from benzenediazonium chloride.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(a) Increasing order of basic strength in AQUEOUS solution:
NH₃ < C₂H₅NH₂ < (C₂H₅)₃N < (C₂H₅)₂NH

Reason: basicity in water is decided by three competing factors —
(i) +I (electron releasing) effect of the alkyl groups, which increases electron density on nitrogen and hence basicity;
(ii) steric hindrance, which increases with the number of alkyl groups and hinders protonation;
(iii) solvation (stabilisation of the substituted ammonium cation by hydrogen bonding with water), which decreases as alkyl groups replace the N–H hydrogens.
In the secondary amine the +I effect and solvation are best balanced, so (C₂H₅)₂NH is the strongest base; the tertiary amine loses out through steric hindrance and poor solvation, and NH₃ is the weakest through having no +I effect at all.
(In the gas phase, where solvation is absent, the order is purely the +I order: NH₃ < C₂H₅NH₂ < (C₂H₅)₂NH < (C₂H₅)₃N.)

(b) In aniline the lone pair of electrons on nitrogen is DELOCALISED over the benzene ring by resonance, so it is less available for donation to a proton. Also the nitrogen is attached to an sp² hybridised carbon which is more electronegative than the sp³ carbon of ethylamine. In ethylamine the lone pair is fully available and is further intensified by the +I effect of the ethyl group. Hence aniline is a weaker base than ethylamine.

(c) Sandmeyer reaction:
C₆H₅N₂⁺Cl⁻ --(CuCl / HCl)--> C₆H₅Cl + N₂↑`,
    keywords: [
      "+I effect, steric hindrance and solvation",
      "(C₂H₅)₂NH is the strongest base in aqueous solution",
      "lone pair delocalised over the ring by resonance",
      "nitrogen attached to sp² carbon",
      "Sandmeyer — CuCl/HCl, N₂ evolved",
    ],
    examinerTip:
      "Quoting only the +I effect gives the GAS-PHASE order and loses the mark when the question says 'in aqueous solution' — you must bring in solvation and steric hindrance.",
  },

  // ---------------------------------------------- 10 Biomolecules
  {
    id: "q-c12-chemistry-10-1",
    subjectId: "c12-chemistry",
    chapterId: "c12-chemistry-10",
    classLevel: 12,
    text: "(a) Write two differences between DNA and RNA. (b) What is the difference between a nucleoside and a nucleotide?",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `(a) Differences between DNA and RNA (any two):
1. Sugar: DNA contains 2-deoxy-D-(–)-ribose, whereas RNA contains D-(–)-ribose.
2. Bases: DNA contains the bases adenine, guanine, cytosine and THYMINE; RNA contains adenine, guanine, cytosine and URACIL (thymine is replaced by uracil).
3. Structure: DNA has a double stranded α-helix structure; RNA is normally single stranded.
4. Function: DNA is the store of hereditary information and can self-replicate; RNA is mainly concerned with protein synthesis.

(b) Nucleoside = base + sugar. A nitrogenous base is attached at the C-1' position of the pentose sugar by an N-glycosidic linkage.
Nucleotide = base + sugar + phosphate. It is a nucleoside in which the C-5' hydroxyl group of the sugar is esterified with a phosphoric acid molecule.
In short: nucleotide = nucleoside + phosphate group.`,
    keywords: [
      "2-deoxy-D-(–)-ribose in DNA, D-(–)-ribose in RNA",
      "thymine in DNA, uracil in RNA",
      "DNA double stranded helix, RNA single stranded",
      "nucleoside = base + sugar",
      "nucleotide = base + sugar + phosphate",
    ],
    examinerTip:
      "Name the sugars exactly (2-deoxy-D-ribose, not 'deoxy sugar') — this chapter is a recall chapter and the key awards the precise NCERT term, not a paraphrase.",
  },

  // ==========================================================================
  // BIOLOGY — c12-biology
  // ==========================================================================

  // ---------------------------------- 01 Sexual Reproduction in Flowering Plants
  {
    id: "q-c12-biology-01-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-01",
    classLevel: 12,
    text: "Describe the process of double fertilisation in an angiosperm. Why is it so called?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `After the pollen tube enters the embryo sac through the micropyle, it enters one of the synergids (guided by the filiform apparatus) and releases its TWO male gametes into the cytoplasm of the synergid. Two fusions then take place:

1. SYNGAMY: One male gamete moves towards the egg cell and fuses with its nucleus. This fusion of one male gamete with the egg (n + n) forms the diploid ZYGOTE (2n), which later develops into the embryo.

2. TRIPLE FUSION: The other male gamete moves towards the two polar nuclei located in the central cell and fuses with them. Since three haploid nuclei fuse (one male gamete + two polar nuclei), it is called triple fusion, and the product is the triploid PRIMARY ENDOSPERM NUCLEUS (PEN, 3n). The central cell thereafter becomes the primary endosperm cell (PEC), which develops into the endosperm — the nutritive tissue for the developing embryo.

Why "double fertilisation": because TWO fusion events — syngamy and triple fusion — occur inside one embryo sac, the phenomenon is termed double fertilisation. It is unique to flowering plants.`,
    keywords: [
      "syngamy — male gamete fuses with egg, forms diploid zygote (2n)",
      "triple fusion — male gamete fuses with two polar nuclei",
      "primary endosperm nucleus (PEN), triploid (3n)",
      "primary endosperm cell (PEC) develops into endosperm",
      "two fusions in one embryo sac — hence double fertilisation",
    ],
    examinerTip:
      "The terms 'syngamy', 'triple fusion' and 'primary endosperm nucleus' are separately marked — describing the events correctly but without naming them costs 2 of the 3 marks.",
  },
  {
    id: "q-c12-biology-01-2",
    subjectId: "c12-biology",
    chapterId: "c12-biology-01",
    classLevel: 12,
    text: "Name and explain any two outbreeding devices that flowering plants have developed to discourage self-pollination.",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `Continued self-pollination causes inbreeding depression, so plants have evolved outbreeding devices. Any two of the following:

1. Different maturation times: In some species the pollen is released BEFORE the stigma becomes receptive, or the stigma becomes receptive long before the pollen is released. This asynchrony prevents self-pollination.

2. Different positioning: The anther and the stigma are placed at different positions in the flower, so the pollen cannot come into contact with the stigma of the same flower.

3. Self-incompatibility: This is a genetic mechanism in which the pollen grain of the same flower fails to germinate on the stigma, or the pollen tube fails to grow, thereby preventing self-fertilisation.

4. Unisexuality: The production of unisexual flowers (e.g. in monoecious plants such as castor and maize, which prevents autogamy but not geitonogamy; in dioecious plants such as papaya, where male and female flowers are on different plants, both autogamy and geitonogamy are prevented).`,
    keywords: [
      "inbreeding depression",
      "pollen release and stigma receptivity at different times",
      "anther and stigma at different positions",
      "self-incompatibility — genetic mechanism",
      "unisexual flowers — dioecious prevents autogamy and geitonogamy",
    ],
    examinerTip:
      "Say 'inbreeding depression' as the reason and use the terms autogamy/geitonogamy — the marking scheme rewards the NCERT vocabulary, not a general description of cross-pollination.",
  },

  // ---------------------------------- 02 Human Reproduction
  {
    id: "q-c12-biology-02-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-02",
    classLevel: 12,
    text: "Describe the four phases of the menstrual cycle in a human female. Name the hormones involved in each phase and state their source.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `The menstrual cycle is the cyclic change in the reproductive tract of primate females, repeating about every 28/29 days. It begins at menarche and ceases at menopause.

1. MENSTRUAL PHASE (days 1–5):
The endometrial lining of the uterus breaks down and menstrual flow occurs. It is caused by the fall in the level of PROGESTERONE following degeneration of the corpus luteum. Menstruation occurs ONLY if the released ovum is not fertilised.

2. FOLLICULAR PHASE / PROLIFERATIVE PHASE (days 5–13):
The primary follicles in the ovary grow into a fully mature Graafian follicle. Simultaneously the endometrium regenerates through proliferation.
Hormones: FSH (follicle stimulating hormone) from the ANTERIOR PITUITARY stimulates follicular growth; the growing follicles secrete OESTROGENS, which cause proliferation of the endometrium.

3. OVULATORY PHASE (about day 14):
Both LH and FSH attain a peak level in the middle of the cycle. The rapid secretion of LH — the LH SURGE — induces rupture of the Graafian follicle and thereby the release of the ovum (ovulation).
Hormones: LH and FSH from the ANTERIOR PITUITARY.

4. LUTEAL PHASE / SECRETORY PHASE (days 15–28):
The remaining parts of the Graafian follicle transform into the CORPUS LUTEUM, which secretes large amounts of PROGESTERONE. Progesterone is essential for maintenance of the endometrium, which is necessary for implantation of the fertilised ovum.
If fertilisation does NOT occur, the corpus luteum degenerates into the corpus albicans, progesterone falls, the endometrium disintegrates and menstruation begins again.
If fertilisation DOES occur, the corpus luteum persists, progesterone remains high and menstrual cycles cease during pregnancy.`,
    keywords: [
      "menstrual phase — breakdown of endometrium, ovum not fertilised",
      "follicular/proliferative phase — FSH from anterior pituitary, oestrogen from growing follicle",
      "LH surge induces rupture of Graafian follicle — ovulation",
      "luteal/secretory phase — corpus luteum secretes progesterone",
      "progesterone maintains endometrium for implantation",
      "corpus luteum degenerates to corpus albicans if no fertilisation",
    ],
    examinerTip:
      "Every hormone must carry its SOURCE (FSH and LH — anterior pituitary; progesterone — corpus luteum), because the key splits hormone and source into separate marks. Also write 'LH surge' by name for ovulation.",
  },

  // ---------------------------------- 03 Reproductive Health
  {
    id: "q-c12-biology-03-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-03",
    classLevel: 12,
    text: "Expand ZIFT and GIFT and state how the two techniques differ from each other.",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `ZIFT = Zygote Intra Fallopian Transfer.
GIFT = Gamete Intra Fallopian Transfer.

Difference:
- In ZIFT, the ovum is fertilised in the laboratory (in vitro), and the ZYGOTE or the early embryo up to the 8-blastomere stage is then transferred into the FALLOPIAN TUBE of the female, where it completes further development. (An embryo with MORE than 8 blastomeres is instead transferred into the uterus — that is IUT, intra uterine transfer.)
- In GIFT, no in vitro fertilisation occurs. An OVUM collected from a donor is transferred into the fallopian tube of another female who cannot produce ova but can provide a suitable environment for fertilisation and further development.

Conclusion: ZIFT transfers a zygote/early embryo already formed outside the body, whereas GIFT transfers an unfertilised gamete (ovum) so that fertilisation takes place inside the recipient's fallopian tube.`,
    keywords: [
      "Zygote Intra Fallopian Transfer",
      "Gamete Intra Fallopian Transfer",
      "zygote or early embryo up to 8 blastomeres",
      "ovum from a donor transferred into fallopian tube",
      "suitable environment for fertilisation and further development",
    ],
    examinerTip:
      "Expanding the abbreviation alone earns half — you must state what is actually transferred (zygote vs unfertilised ovum) and the '8 blastomeres' cut-off that separates ZIFT from IUT.",
  },

  // ---------------------------------- 04 Principles of Inheritance and Variation
  {
    id: "q-c12-biology-04-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-04",
    classLevel: 12,
    text: "A normal-visioned woman, whose father was colour blind, marries a normal-visioned man. Work out a cross to show the possible genotypes and phenotypes of their progeny. What is the probability that their son will be colour blind? Why is colour blindness more common in males than in females?",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Colour blindness is an X-linked RECESSIVE disorder. Let X^C = allele for normal vision (dominant) and X^c = allele for colour blindness (recessive).

Step 1 — Genotype of the parents:
The woman's father was colour blind, so his genotype was X^c Y. A father passes his only X chromosome to ALL his daughters. Therefore the woman must have received X^c from him. Since she herself is normal-visioned, her other X must be X^C.
∴ Woman (carrier) = X^C X^c
The man is normal-visioned ⇒ Man = X^C Y

Step 2 — Cross:
Parents:   X^C X^c   ×   X^C Y
Gametes:   X^C , X^c      X^C , Y

Step 3 — Punnett square:
              X^C            Y
  X^C   |  X^C X^C      |  X^C Y
  X^c   |  X^C X^c      |  X^c Y

Step 4 — Progeny:
Genotypes: X^C X^C : X^C X^c : X^C Y : X^c Y = 1 : 1 : 1 : 1
Phenotypes:
- X^C X^C — normal-visioned girl (25 %)
- X^C X^c — normal-visioned CARRIER girl (25 %)
- X^C Y  — normal-visioned boy (25 %)
- X^c Y  — COLOUR BLIND boy (25 %)
So all daughters are normal-visioned (half of them carriers), and half of the sons are colour blind.

Step 5 — Probability:
Probability that a SON will be colour blind = 1/2 = 50 %.
(Probability that any child will be a colour blind son = 1/4 = 25 %.)

Why colour blindness is commoner in males:
A male is hemizygous — he has only ONE X chromosome, so a single recessive allele X^c is enough to express the trait. A female has TWO X chromosomes and must be homozygous recessive (X^c X^c) to be colour blind; if she carries only one X^c she is a normal-visioned carrier. Since the recessive allele is rare, the chance of a female inheriting it from BOTH parents is much lower, so the disorder appears far more often in males.`,
    keywords: [
      "X-linked recessive",
      "carrier mother X^C X^c, normal father X^C Y",
      "Punnett square with gametes shown",
      "colour blind son X^c Y — 50 % of sons",
      "males are hemizygous — single recessive allele expresses",
    ],
    examinerTip:
      "Write parental genotypes, gametes and the Punnett square as separate steps — the correct ratio with no working still loses the method marks. Also read the wording: 'probability that their SON is colour blind' is 1/2, not 1/4.",
  },
  {
    id: "q-c12-biology-04-2",
    subjectId: "c12-biology",
    chapterId: "c12-biology-04",
    classLevel: 12,
    text: "In a family pedigree, a phenotypically normal father and a phenotypically normal mother have a daughter who is affected by a disorder. (a) Is the disorder dominant or recessive? Give reason. (b) Is it autosomal or sex-linked? Give reason. (c) Write the genotypes of both parents.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(a) The disorder is RECESSIVE.
Reason: Both parents are unaffected (normal), yet they have produced an affected offspring. A trait that "skips" and reappears in the progeny of two unaffected parents must be recessive — the parents were unaffected carriers. If the trait were dominant, at least one parent would have had to show it.

(b) The disorder is AUTOSOMAL, not sex-linked.
Reason: The affected child is a DAUGHTER. If the trait were X-linked recessive, the affected daughter would have to be X^a X^a, which means she must have received one X^a from her father. The father would then be X^a Y and would himself be affected — but he is phenotypically normal. This contradiction rules out X-linkage, so the gene must lie on an autosome.

(c) Let A = normal allele (dominant), a = allele for the disorder (recessive).
Affected daughter = aa. She received one 'a' from each parent, and both parents are phenotypically normal.
∴ Father = Aa (heterozygous carrier) and Mother = Aa (heterozygous carrier).
Their cross Aa × Aa gives 1 AA : 2 Aa : 1 aa, i.e. a 3 normal : 1 affected phenotypic ratio, with a 25 % chance of an affected child.`,
    keywords: [
      "recessive — unaffected parents produce affected offspring",
      "autosomal — affected daughter but father is normal",
      "X-linked recessive would require an affected father",
      "both parents heterozygous carriers Aa × Aa",
      "3 normal : 1 affected, 25 % risk",
    ],
    examinerTip:
      "The autosomal-vs-sex-linked mark hinges entirely on the SEX of the affected child — for an affected daughter you must argue that an X-linked recessive would force the father to be affected too.",
  },

  // ---------------------------------- 05 Molecular Basis of Inheritance
  {
    id: "q-c12-biology-05-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-05",
    classLevel: 12,
    text: "Explain the lac operon in E. coli. How does it work in the presence and in the absence of lactose?",
    marks: 5,
    type: "la",
    source: "important",
    answer: `The lac operon was worked out by Francois Jacob and Jacques Monod. It is an example of NEGATIVE regulation of transcription in a prokaryote, and lactose acts as the INDUCER — hence it is an inducible operon.

Components of the lac operon:
- Regulator gene (i gene): lies outside the operon and codes for the REPRESSOR protein. ('i' stands for inhibitor, not inducer.)
- Promoter (p): the site where RNA polymerase binds.
- Operator (o): the site adjacent to the promoter where the repressor binds.
- Structural genes — three of them:
  z gene → beta-galactosidase, which hydrolyses lactose into galactose and glucose;
  y gene → permease, which increases the permeability of the cell to beta-galactosides;
  a gene → transacetylase.

IN THE ABSENCE OF LACTOSE (operon SWITCHED OFF):
The i gene produces the repressor protein. The repressor binds to the operator region of the operon. This physically blocks RNA polymerase, which therefore cannot transcribe the structural genes. No enzymes are made — the operon is repressed. This prevents the cell from wasting energy making enzymes it does not need.

IN THE PRESENCE OF LACTOSE (operon SWITCHED ON — induction):
Lactose is transported into the cell by permease and acts as the INDUCER. The inducer binds to the repressor protein and INACTIVATES it (an allosteric change). The inactivated repressor can no longer bind to the operator. The operator is now free, so RNA polymerase binds the promoter and transcribes the structural genes, producing a single POLYCISTRONIC mRNA. This mRNA is translated into beta-galactosidase, permease and transacetylase, which then metabolise the lactose.

Conclusion: the lac operon is switched on by its own substrate and switched off when the substrate is exhausted — regulation is at the level of TRANSCRIPTION.`,
    keywords: [
      "i gene (regulator) codes for repressor protein",
      "structural genes z, y, a — beta-galactosidase, permease, transacetylase",
      "repressor binds operator, blocks RNA polymerase — operon off",
      "lactose acts as inducer, inactivates the repressor",
      "polycistronic mRNA",
      "negative regulation at transcription level",
    ],
    examinerTip:
      "Two habitual errors: writing that the i gene makes the inducer (it makes the REPRESSOR), and saying the repressor binds the promoter (it binds the OPERATOR). Name all three enzymes with their genes.",
  },
  {
    id: "q-c12-biology-05-2",
    subjectId: "c12-biology",
    chapterId: "c12-biology-05",
    classLevel: 12,
    text: "Write any three salient features of the double-helix model of DNA proposed by Watson and Crick.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Salient features of the Watson–Crick double-helix model (any three):

1. DNA is made of two polynucleotide chains, with a backbone of sugar–phosphate and the bases projecting inwards.

2. The two chains have ANTIPARALLEL polarity — one runs in the 5' → 3' direction and the other in the 3' → 5' direction.

3. The bases of the two strands are paired through HYDROGEN BONDS. Adenine pairs with thymine by TWO hydrogen bonds and guanine pairs with cytosine by THREE hydrogen bonds. Hence a purine always pairs with a pyrimidine, which keeps the distance between the two strands uniform.

4. The two chains are coiled in a RIGHT-HANDED fashion. The pitch of the helix is 3.4 nm and there are roughly 10 base pairs in each turn, so the distance between two adjacent base pairs is about 0.34 nm.

5. The plane of one base pair stacks over the other, and this base stacking, together with the hydrogen bonds, confers stability on the helical structure.`,
    keywords: [
      "two polynucleotide chains, sugar–phosphate backbone",
      "antiparallel polarity — 5'→3' and 3'→5'",
      "A=T two hydrogen bonds, G≡C three hydrogen bonds",
      "right-handed helix, pitch 3.4 nm, ~10 base pairs per turn, 0.34 nm rise",
      "base stacking confers stability",
    ],
    examinerTip:
      "The two figures examiners look for are 3.4 nm pitch and 0.34 nm between base pairs — mixing them up (writing 3.4 nm between base pairs) is the standard silent error.",
  },

  // ---------------------------------- 06 Evolution
  {
    id: "q-c12-biology-06-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-06",
    classLevel: 12,
    text: "In a population of 1000 individuals, 360 belong to the genotype AA, 480 to Aa and the remaining 160 to aa. Calculate the allele frequencies of A and a, and state whether the population is in Hardy–Weinberg equilibrium. List any two factors that can disturb this equilibrium.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Step 1 — Total alleles:
Each individual is diploid, so 1000 individuals carry 2 × 1000 = 2000 alleles at this locus.

Step 2 — Frequency of allele A (p):
Number of A alleles = (2 × number of AA) + (1 × number of Aa) = (2 × 360) + 480 = 720 + 480 = 1200
p = 1200 / 2000 = 0.6

Step 3 — Frequency of allele a (q):
Number of a alleles = (2 × number of aa) + (1 × number of Aa) = (2 × 160) + 480 = 320 + 480 = 800
q = 800 / 2000 = 0.4
Check: p + q = 0.6 + 0.4 = 1 ✓

Step 4 — Test for Hardy–Weinberg equilibrium (p² + 2pq + q² = 1):
Expected AA = p² × 1000 = (0.6)² × 1000 = 0.36 × 1000 = 360 — observed 360 ✓
Expected Aa = 2pq × 1000 = 2 × 0.6 × 0.4 × 1000 = 0.48 × 1000 = 480 — observed 480 ✓
Expected aa = q² × 1000 = (0.4)² × 1000 = 0.16 × 1000 = 160 — observed 160 ✓

Conclusion: the observed genotype numbers match the expected ones exactly, so the population IS in Hardy–Weinberg equilibrium (allele frequencies are stable and the population is not evolving at this locus).

Two factors that disturb Hardy–Weinberg equilibrium (any two of five):
1. Gene migration (gene flow) — movement of individuals into or out of the population.
2. Genetic drift — random change in allele frequency, marked in small populations (founder effect).
3. Mutation — appearance of new alleles.
4. Genetic recombination during sexual reproduction.
5. Natural selection.`,
    keywords: [
      "p + q = 1 and p² + 2pq + q² = 1",
      "p = 0.6, q = 0.4",
      "heterozygotes contribute one allele of each type",
      "expected values match observed — population is in equilibrium",
      "gene flow, genetic drift, mutation, recombination, natural selection",
    ],
    examinerTip:
      "The universal slip is counting only the homozygotes — every Aa individual contributes ONE A and ONE a to the allele pool, and forgetting that wrecks p and q.",
  },

  // ---------------------------------- 07 Human Health and Disease
  {
    id: "q-c12-biology-07-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-07",
    classLevel: 12,
    text: "Name the causative organism of (a) malaria, (b) typhoid, (c) amoebiasis and (d) filariasis. In each case name the vector or the mode of transmission.",
    marks: 4,
    type: "case",
    source: "important",
    answer: `(a) MALARIA
Pathogen: Plasmodium — the species P. vivax, P. malariae and P. falciparum (malignant malaria, the most serious form, is caused by P. falciparum).
Vector/transmission: the bite of an infected FEMALE ANOPHELES mosquito.

(b) TYPHOID
Pathogen: Salmonella typhi, a bacterium.
Transmission: through contaminated food and water; the pathogen enters the small intestine and migrates to other organs through the blood. (Diagnosis is by the Widal test.)

(c) AMOEBIASIS (amoebic dysentery)
Pathogen: Entamoeba histolytica, a protozoan parasite of the large intestine.
Vector/transmission: HOUSEFLIES act as mechanical carriers, transmitting the parasite from the faeces of an infected person to food and water, thereby contaminating it.

(d) FILARIASIS (elephantiasis)
Pathogen: Wuchereria bancrofti and Wuchereria malayi — filarial worms.
Vector: the bite of an infected FEMALE CULEX mosquito.

Conclusion: in each case control depends on breaking the transmission route — vector control for malaria and filariasis, and hygiene/sanitation for typhoid and amoebiasis.`,
    keywords: [
      "Plasmodium vivax, P. malariae, P. falciparum — female Anopheles",
      "Salmonella typhi — contaminated food and water",
      "Entamoeba histolytica — houseflies as mechanical carriers",
      "Wuchereria bancrofti and W. malayi — female Culex",
      "vector control and hygiene break transmission",
    ],
    examinerTip:
      "Write the genus AND species in NCERT spelling, and never forget 'FEMALE' Anopheles / 'FEMALE' Culex — the key marks the word female separately.",
  },
  {
    id: "q-c12-biology-07-2",
    subjectId: "c12-biology",
    chapterId: "c12-biology-07",
    classLevel: 12,
    text: "Differentiate between active immunity and passive immunity, giving one example of each.",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `ACTIVE IMMUNITY:
- The host's own body produces antibodies in response to exposure to antigens (living or dead pathogens, or their proteins).
- It is SLOW to develop and takes time to give its full effective response.
- It is long lasting, because memory cells (memory B and T cells) are formed.
- Example: immunity developed after an actual infection (e.g. chickenpox), or after VACCINATION/immunisation.

PASSIVE IMMUNITY:
- Ready-made antibodies made in another organism are directly given to the body; the host does not make them itself.
- It is FAST — protection is immediate.
- It is short lived, because no memory cells are formed.
- Example: the antibodies (IgA) that a foetus/infant receives from the mother through the placenta and through colostrum; or the anti-tetanus serum (preformed antibodies) injected after an injury or a snake bite.

Conclusion: active immunity is slow but durable; passive immunity is instant but temporary.`,
    keywords: [
      "active — host produces its own antibodies against antigen",
      "passive — ready-made antibodies given directly",
      "active is slow but long lasting, memory cells formed",
      "passive is immediate but short lived, no memory cells",
      "colostrum / anti-tetanus serum as passive; vaccination as active",
    ],
    examinerTip:
      "Both an example AND the memory-cell point are marked — writing only the definitions caps you at half. Colostrum (rich in IgA) is the example the key prefers for passive immunity.",
  },

  // ---------------------------------- 08 Microbes in Human Welfare
  {
    id: "q-c12-biology-08-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-08",
    classLevel: 12,
    text: "Explain the secondary treatment of sewage. What is BOD, and how does the BOD of sewage change during this treatment?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Secondary treatment is also called BIOLOGICAL TREATMENT.

Steps:
1. The primary effluent (obtained after physical removal of floating and sedimentable solids) is passed into large AERATION TANKS, where it is constantly agitated mechanically and air is pumped in.
2. This allows vigorous growth of useful aerobic microbes into FLOCS — masses of bacteria associated together with fungal filaments to form mesh-like structures.
3. While growing, these microbes consume the major part of the organic matter in the effluent. This significantly reduces the BOD of the effluent.
4. Once the BOD is reduced, the effluent is passed into a SETTLING TANK where the bacterial flocs are allowed to sediment. This sediment is called ACTIVATED SLUDGE.
5. A small part of the activated sludge is pumped back into the aeration tank to serve as the INOCULUM. The remaining major part is pumped into large tanks called ANAEROBIC SLUDGE DIGESTERS, where anaerobic bacteria digest the bacteria and the fungi in the sludge and produce a mixture of gases — methane, hydrogen sulphide and carbon dioxide — which forms BIOGAS.

BOD (Biochemical Oxygen Demand): the amount of oxygen that would be consumed if all the organic matter in one litre of water were oxidised by bacteria. BOD is therefore a measure of the organic matter present in the water — the greater the BOD, the more polluted the water.

Change in BOD: the sewage entering has a HIGH BOD. As the flocs consume the organic matter in the aeration tank, the BOD falls SHARPLY. The treated effluent is released into natural water bodies only after its BOD has been sufficiently reduced.`,
    keywords: [
      "aeration tank, constant agitation, air pumped in",
      "flocs — bacteria associated with fungal filaments, mesh-like",
      "BOD = oxygen consumed if organic matter in one litre is oxidised by bacteria",
      "settling tank gives activated sludge; part returned as inoculum",
      "anaerobic sludge digesters produce biogas (methane, H₂S, CO₂)",
    ],
    examinerTip:
      "Define BOD in the exact NCERT wording ('per litre', 'oxidised by bacteria') — a vague 'oxygen needed by microbes' loses the mark. Also state clearly that BOD DECREASES, and say where the activated sludge goes.",
  },
  {
    id: "q-c12-biology-08-2",
    subjectId: "c12-biology",
    chapterId: "c12-biology-08",
    classLevel: 12,
    text: "Name the microbe from which each of the following is obtained: (a) the antibiotic penicillin, (b) the blood-cholesterol lowering statin, (c) citric acid, (d) the immunosuppressive agent cyclosporin A.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `(a) Penicillin — obtained from the mould PENICILLIUM NOTATUM. (Discovered by Alexander Fleming; Fleming, Ernst Chain and Howard Florey shared the Nobel Prize in 1945.)

(b) Statins — produced by the yeast MONASCUS PURPUREUS, used as a blood-cholesterol lowering agent. It acts by competitively inhibiting the enzyme responsible for the synthesis of cholesterol.

(c) Citric acid — obtained from the fungus ASPERGILLUS NIGER.

(d) Cyclosporin A — produced by the fungus TRICHODERMA POLYSPORUM, used as an immunosuppressive agent in organ transplant patients.`,
    keywords: [
      "Penicillium notatum",
      "Monascus purpureus",
      "Aspergillus niger",
      "Trichoderma polysporum",
      "immunosuppressive agent in organ transplant patients",
    ],
    examinerTip:
      "This is pure name-recall and spelling is marked — Trichoderma polysporum gives cyclosporin A while Monascus purpureus gives statins; swapping the two is the commonest mix-up.",
  },

  // ---------------------------------- 09 Biotechnology: Principles and Processes
  {
    id: "q-c12-biology-09-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-09",
    classLevel: 12,
    text: "Name the three steps of a PCR cycle, state the approximate temperature of each and explain what happens in each step. Why is Taq polymerase used?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `PCR — Polymerase Chain Reaction — is used to amplify a gene of interest in vitro using two sets of primers and a thermostable DNA polymerase. Each cycle has three steps:

1. DENATURATION (about 94–95 °C):
The double stranded DNA template is heated at high temperature, so the hydrogen bonds break and the two strands separate. This gives two single stranded templates.

2. ANNEALING (about 50–60 °C):
The reaction is cooled. Two sets of PRIMERS (small chemically synthesised oligonucleotides complementary to the regions of DNA) base-pair with (anneal to) the two separated single strands, defining the segment to be copied.

3. EXTENSION (about 72 °C):
The enzyme DNA polymerase EXTENDS the primers using the nucleotides (dNTPs) provided in the reaction and the genomic DNA as template. The gene of interest is thus copied.

Repeating these three steps many times amplifies the segment to approximately a BILLION copies.

Why Taq polymerase: Taq polymerase is a THERMOSTABLE DNA polymerase isolated from the bacterium Thermus aquaticus. An ordinary DNA polymerase would be denatured (destroyed) by the high temperature used in the denaturation step and would have to be added afresh every cycle. Taq polymerase remains active during the high-temperature-induced denaturation of double stranded DNA, so the cycles can be run continuously in one tube.`,
    keywords: [
      "denaturation at 94–95 °C — strands separate",
      "annealing at 50–60 °C — two sets of primers base-pair",
      "extension at 72 °C — DNA polymerase extends primers using dNTPs",
      "Taq polymerase from Thermus aquaticus — thermostable",
      "amplification to about a billion copies",
    ],
    examinerTip:
      "The temperatures carry marks on their own — never write the steps without them. And the Taq answer must say 'remains active at the high denaturation temperature', not merely 'it is from a bacterium'.",
  },
  {
    id: "q-c12-biology-09-2",
    subjectId: "c12-biology",
    chapterId: "c12-biology-09",
    classLevel: 12,
    text: "What are restriction enzymes? Explain the terms 'palindromic sequence' and 'sticky ends' with reference to the action of EcoRI.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Restriction enzymes: these are the "molecular scissors" of recombinant DNA technology. They belong to a larger class called NUCLEASES. Exonucleases remove nucleotides from the ends of the DNA, whereas ENDONUCLEASES make cuts at specific positions WITHIN the DNA. Each restriction endonuclease recognises a specific recognition sequence in the DNA and cuts it there. The first restriction endonuclease was Hind II.

Palindromic sequence: a palindrome in DNA is a sequence of base pairs that reads the SAME on the two strands when read in the SAME direction (i.e. 5' → 3' on both strands). For EcoRI the recognition site is:
   5' — G A A T T C — 3'
   3' — C T T A A G — 5'
Reading 5'→3' on the top strand gives GAATTC, and reading 5'→3' on the bottom strand also gives GAATTC — hence it is palindromic.

Sticky ends: EcoRI does not cut the two strands at the centre of the palindrome; it cuts a little away from the centre, between the same two bases (G and A) on both strands. Because the cut is staggered, each fragment is left with a short SINGLE STRANDED overhang (AATT). These overhangs are called sticky ends because they form hydrogen bonds with their complementary counterparts on any other DNA cut with the SAME enzyme. This stickiness is what allows DNA ligase to join a vector and a foreign DNA fragment, making recombinant DNA possible.

Conclusion: because vector and insert are cut with the same restriction enzyme, they carry complementary sticky ends and can be joined.`,
    keywords: [
      "restriction endonuclease — molecular scissors, cuts within DNA",
      "palindromic sequence reads the same 5'→3' on both strands",
      "EcoRI site GAATTC",
      "staggered cut away from the centre gives single stranded overhangs",
      "sticky ends joined by DNA ligase",
    ],
    examinerTip:
      "A DNA palindrome is not an English palindrome — you must say 'reads the same on both strands when read in the same 5'→3' direction', and show the GAATTC/CTTAAG double strand to earn it.",
  },

  // ---------------------------------- 10 Biotechnology and its Applications
  {
    id: "q-c12-biology-10-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-10",
    classLevel: 12,
    text: "What is Bt cotton? Explain how the Bt toxin, which is produced by a bacterium, kills the insect but does not kill the bacterium itself.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Bt cotton: Bt cotton is a transgenic cotton plant into which specific cry genes from the bacterium BACILLUS THURINGIENSIS have been introduced. The gene cryIAc (and cryIIAb) controls the cotton bollworm, while cryIAb controls the corn borer. The transgenic plant therefore makes the toxin itself and is resistant to these insect pests.

Why the toxin does not kill the bacterium:
Bacillus thuringiensis forms protein crystals during a particular phase of its growth, and these crystals contain the toxic insecticidal protein. However, the toxin exists in the bacterium in an INACTIVE PROTOXIN form. Being inactive, it does no harm to the bacterium itself.

How it kills the insect:
1. Once an insect ingests the inactive protoxin, it is converted into the ACTIVE form of the toxin due to the ALKALINE pH of the insect's gut, which solubilises the crystals.
2. The activated toxin then binds to the surface of the MIDGUT EPITHELIAL CELLS.
3. It creates PORES that cause cell swelling and LYSIS.
4. This eventually causes the death of the insect.

Conclusion: the toxin is a pH-activated protoxin — safe inside the bacterium (and in the plant), lethal only in the alkaline insect gut.`,
    keywords: [
      "cry genes from Bacillus thuringiensis",
      "cryIAc and cryIIAb — cotton bollworm; cryIAb — corn borer",
      "toxin exists as inactive protoxin",
      "alkaline pH of insect gut solubilises the crystal and activates the toxin",
      "binds midgut epithelial cells, creates pores, causes swelling and lysis",
    ],
    examinerTip:
      "The whole 'why not the bacterium' mark is the word PROTOXIN plus the ALKALINE gut pH — students who only say 'the insect eats it and dies' get about half.",
  },
  {
    id: "q-c12-biology-10-2",
    subjectId: "c12-biology",
    chapterId: "c12-biology-10",
    classLevel: 12,
    text: "Explain how RNA interference (RNAi) has been used to develop a nematode-resistant tobacco plant.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The problem: the nematode MELOIDOGYNE INCOGNITA infects the roots of tobacco plants and causes a great reduction in yield.

The principle — RNA interference (RNAi): RNAi is a method of cellular defence that takes place in all eukaryotic organisms. It involves the SILENCING of a specific mRNA due to a complementary double stranded RNA (dsRNA) molecule that binds to and prevents translation of that mRNA. The source of this complementary RNA may be from an infection by viruses having RNA genomes or from mobile genetic elements (transposons).

The strategy:
1. Nematode-specific genes were introduced into the host tobacco plant using AGROBACTERIUM TUMEFACIENS as the vector.
2. The introduced DNA was constructed so that it produced BOTH sense and antisense RNA in the host cells.
3. Being complementary to each other, these two RNAs formed a DOUBLE STRANDED RNA (dsRNA).
4. This dsRNA initiated RNAi and thus SILENCED the specific mRNA of the nematode.
5. As a consequence, the parasite could not survive in a transgenic host expressing this specific interfering RNA.

Conclusion: the transgenic tobacco plant is protected from Meloidogyne incognita, and the strategy is highly specific because the silencing targets only the nematode's own mRNA.`,
    keywords: [
      "Meloidogyne incognita infects tobacco roots",
      "RNAi — silencing of a specific mRNA by complementary dsRNA",
      "Agrobacterium tumefaciens as vector",
      "host produces both sense and antisense RNA",
      "dsRNA silences nematode mRNA — parasite cannot survive",
    ],
    examinerTip:
      "Both 'sense AND antisense RNA' and the resulting 'double stranded RNA' must appear — writing only 'antisense RNA was introduced' misses the mechanism mark.",
  },

  // ---------------------------------- 11 Organisms and Populations
  {
    id: "q-c12-biology-11-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-11",
    classLevel: 12,
    text: "Differentiate between exponential and logistic population growth. Write the equation for logistic growth and explain each term.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `EXPONENTIAL GROWTH:
- Occurs when resources (food and space) are UNLIMITED.
- Each species is able to realise its full innate potential to grow in number.
- The curve is J-SHAPED when population density is plotted against time.
- Equation: dN/dt = rN, whose integral form is N_t = N₀ e^(rt), where 'r' is the intrinsic rate of natural increase.

LOGISTIC GROWTH:
- Occurs when resources are LIMITED, which is the reality in nature. Competition between individuals results, and the fittest survive and reproduce.
- Every habitat has a limited CARRYING CAPACITY (K) — the maximum number of individuals it can support.
- The population first shows a lag phase, then a phase of acceleration followed by deceleration, and finally an asymptote when N reaches K.
- The curve is SIGMOID (S-shaped), also called the Verhulst–Pearl logistic growth curve.

Equation for logistic growth:
   dN/dt = rN [(K − N) / K]

Terms:
N = population density (population size) at time t
r = intrinsic rate of natural increase
K = carrying capacity of the habitat
t = time
(K − N)/K = the fraction of the carrying capacity still unused; as N approaches K this term approaches zero, so dN/dt approaches zero and growth stops.

Conclusion: since resources for growth are finite and become limiting sooner or later, the LOGISTIC model is considered a more realistic description of population growth in nature.`,
    keywords: [
      "exponential — unlimited resources, J-shaped, dN/dt = rN",
      "logistic — limited resources, sigmoid (S-shaped) curve",
      "carrying capacity K",
      "dN/dt = rN [(K − N)/K]",
      "Verhulst–Pearl logistic growth; logistic is more realistic",
    ],
    examinerTip:
      "Write (K − N)/K, not (K − N)/N — and if a graph is asked, draw BOTH curves on the same axes with K marked as a dashed asymptote, because the label K itself carries a mark.",
  },

  // ---------------------------------- 12 Ecosystem
  {
    id: "q-c12-biology-12-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-12",
    classLevel: 12,
    text: "Why is the pyramid of biomass in a sea ecosystem generally inverted, while the pyramid of energy is never inverted? Explain.",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `Inverted pyramid of biomass in a sea:
In an aquatic (sea) ecosystem the producers are tiny PHYTOPLANKTON, which have a very small standing crop (biomass) at any given moment but a very high rate of reproduction and turnover. Because they multiply and are consumed so rapidly, this small biomass of phytoplankton is able to support a much LARGER standing crop of zooplankton and fishes. Since the biomass of the producers is less than that of the consumers they support, the pyramid of biomass is INVERTED (narrow at the base and broader upwards).

Pyramid of energy is always upright:
The pyramid of energy is based on the RATE of energy flow (energy per unit area per unit time), not on a standing crop measured at one instant. When energy flows from one trophic level to the next, a large part of it is lost as heat in respiration and metabolic activities, and only about 10 % is transferred to the next level (the 10 per cent law). Therefore the energy available at any trophic level is always LESS than that at the level below it, and no ecosystem can have more energy at a higher trophic level than at a lower one. Hence the pyramid of energy can NEVER be inverted; it is always upright.`,
    keywords: [
      "phytoplankton — small standing crop but high turnover / rate of reproduction",
      "supports a larger standing crop of zooplankton and fishes",
      "pyramid of biomass is a standing crop at a given moment",
      "pyramid of energy is based on rate of energy flow",
      "energy lost as heat in respiration; 10 per cent law — always upright",
    ],
    examinerTip:
      "The word 'turnover' (or 'rate of reproduction') is what unlocks the biomass mark, and 'rate of energy flow' plus the 10 % law is what unlocks the energy mark — a general answer about 'more fish than plants' gets nothing.",
  },

  // ---------------------------------- 13 Biodiversity and Conservation
  {
    id: "q-c12-biology-13-1",
    subjectId: "c12-biology",
    chapterId: "c12-biology-13",
    classLevel: 12,
    text: "Name and explain the four major causes of biodiversity loss, collectively called the 'Evil Quartet'. Give one example for each.",
    marks: 4,
    type: "case",
    source: "important",
    answer: `Edward Wilson's four major causes of biodiversity loss — 'The Evil Quartet':

1. HABITAT LOSS AND FRAGMENTATION:
This is the most important cause driving animals and plants to extinction. Once-continuous habitats are destroyed or broken into small patches, and mammals and birds requiring large territories, plus animals with migratory habits, are badly affected — populations decline.
Example: the tropical rain forests, which once covered more than 14 % of the earth's land surface, now cover no more than 6 %; the Amazon rain forest ("the lungs of the planet") is being cut and cleared for cultivating soya beans and for conversion to grasslands for raising beef cattle.

2. OVER-EXPLOITATION:
Humans have always depended on nature for food and shelter, but when 'need' turns into 'greed' it leads to over-exploitation of natural resources.
Example: Steller's sea cow and the passenger pigeon were driven to extinction by over-exploitation; many marine fish populations around the world are over-harvested, endangering their continued existence.

3. ALIEN SPECIES INVASIONS:
When alien species are introduced unintentionally or deliberately, some turn invasive and cause the decline or extinction of indigenous species.
Example: the Nile perch introduced into Lake Victoria in East Africa eventually led to the extinction of an ecologically unique assemblage of more than 200 species of cichlid fish; the invasive weeds Parthenium (carrot grass), Lantana and Eichhornia (water hyacinth); the African catfish Clarias gariepinus introduced for aquaculture threatens indigenous catfishes in our rivers.

4. CO-EXTINCTIONS:
When a species becomes extinct, the plant and animal species associated with it in an obligatory way also become extinct.
Example: when a host fish species becomes extinct, its unique assemblage of parasites also meets the same fate; in a plant–pollinator mutualism where the two have co-evolved, the extinction of one invariably leads to the extinction of the other.`,
    keywords: [
      "habitat loss and fragmentation — most important cause",
      "over-exploitation — Steller's sea cow, passenger pigeon",
      "alien species invasion — Nile perch in Lake Victoria, Parthenium, Lantana, Eichhornia",
      "co-extinctions — obligate associates, host–parasite, plant–pollinator mutualism",
      "tropical rain forests reduced from 14 % to 6 %",
    ],
    examinerTip:
      "Each cause needs its NAME plus an example — the examples are what separate full marks from half, and 'Nile perch in Lake Victoria' and 'Steller's sea cow' are the exact ones the key expects.",
  },
  {
    id: "q-c12-biology-13-2",
    subjectId: "c12-biology",
    chapterId: "c12-biology-13",
    classLevel: 12,
    text: "Distinguish between in-situ and ex-situ conservation, giving two Indian examples of each.",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `IN-SITU CONSERVATION ("on site"):
The threatened species are protected in their NATURAL HABITAT, so that the entire ecosystem is conserved along with the species. It is the more effective approach because the whole biodiversity of the region, including species we have not yet discovered, is saved together.
Indian examples (any two): biodiversity hotspots (Western Ghats and Sri Lanka, Indo-Burma, Himalaya); National Parks (India has 90+, e.g. Jim Corbett); Wildlife Sanctuaries (500+); Biosphere Reserves (14+, e.g. Nilgiri); SACRED GROVES — forest patches around places of worship, protected by tribal communities, e.g. in the Khasi and Jaintia Hills of Meghalaya, the Aravalli Hills of Rajasthan, and the Western Ghat regions of Karnataka and Maharashtra.

EX-SITU CONSERVATION ("off site"):
Threatened animals and plants are taken OUT of their natural habitat and placed in a special setting where they can be protected and given special care.
Indian examples (any two): zoological parks; botanical gardens; wildlife safari parks; cryopreservation of gametes at −196 °C in liquid nitrogen; in vitro fertilisation and tissue culture propagation; SEED BANKS.

Conclusion: in-situ conserves the species together with its habitat and ecosystem, whereas ex-situ conserves the species away from its habitat under human care.`,
    keywords: [
      "in-situ — conserved in the natural habitat, whole ecosystem protected",
      "biodiversity hotspots, national parks, wildlife sanctuaries, biosphere reserves, sacred groves",
      "ex-situ — taken out of natural habitat, special care",
      "zoological parks, botanical gardens, seed banks",
      "cryopreservation of gametes at −196 °C in liquid nitrogen",
    ],
    examinerTip:
      "Sacred groves (Khasi and Jaintia Hills) are IN-situ, not ex-situ — that misclassification is the standard error here, and Indian examples are required, not generic ones.",
  },
];
