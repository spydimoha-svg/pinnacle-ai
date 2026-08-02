// NCERT Class 10 Science — Chapter 2: Acids, Bases and Salts (rationalised
// syllabus). The end-of-chapter "Exercises" (Q1-15), verbatim, with answers
// verified against the NCERT text — one of the most board-tested Class 10
// Science chapters and previously missing from the grounding corpus.
import type { NcertChapter } from "./types";

export const C10_SCIENCE_ACIDS_BASES_SALTS: NcertChapter = {
  id: "c10-science-02",
  classLevel: 10,
  subjectId: "c10-science",
  chapterNumber: 2,
  title: "Acids, Bases and Salts",
  book: "NCERT Class 10 Science (rationalised)",
  concepts: [
    "ACID-BASE INDICATORS are dyes or mixtures of dyes used to show whether a substance is acidic or basic by a change in colour: litmus (blue turns red in acid, red turns blue in base), phenolphthalein (colourless in acid, pink in base) and methyl orange are common ones. OLFACTORY INDICATORS change smell in acidic or basic media, e.g. onion and vanilla essence/clove oil.",
    "ACID + METAL -> SALT + HYDROGEN GAS. e.g. 2HCl(aq) + Zn(s) -> ZnCl2(aq) + H2(g). The evolved gas is tested by bringing a burning candle/matchstick near it: it burns with a pop sound.",
    "BASE + (some) METAL -> SALT + HYDROGEN GAS, where the salt formed is a metal-oxide anion (e.g. sodium zincate): 2NaOH(aq) + Zn(s) -> Na2ZnO2(s) + H2(g). This reaction does not happen with all metals.",
    "METAL CARBONATE/METAL HYDROGENCARBONATE + ACID -> SALT + CARBON DIOXIDE + WATER. e.g. Na2CO3(s) + 2HCl(aq) -> 2NaCl(aq) + H2O(l) + CO2(g); NaHCO3(s) + HCl(aq) -> NaCl(aq) + H2O(l) + CO2(g). The CO2 evolved turns lime water milky: Ca(OH)2(aq) + CO2(g) -> CaCO3(s) + H2O(l); on passing excess CO2 the milkiness disappears as soluble calcium hydrogencarbonate forms: CaCO3(s) + H2O(l) + CO2(g) -> Ca(HCO3)2(aq).",
    "NEUTRALISATION REACTION: ACID + BASE -> SALT + WATER, e.g. NaOH(aq) + HCl(aq) -> NaCl(aq) + H2O(l), or ionically H+(aq) + OH-(aq) -> H2O(l).",
    "METAL OXIDE + ACID -> SALT + WATER (metal oxides are therefore called BASIC OXIDES), e.g. CuO + 2HCl -> CuCl2 + H2O (solution turns blue-green). NON-METALLIC OXIDES are ACIDIC IN NATURE because they react with a base to give salt and water, similar to an acid, e.g. CO2 with lime water.",
    "Acids contain H+ as the cation (with an anion such as Cl- in HCl, NO3- in HNO3, SO4(2-) in H2SO4, CH3COO- in CH3COOH); it is the H+(aq) ion that is responsible for acidic properties, shown by the bulb glowing when an acid solution is tested for electrical conductivity (ions carry the current). Glucose and alcohol solutions do NOT conduct electricity, so they are not acids even though they contain hydrogen.",
    "Hydrogen ions cannot exist alone in water — they combine with a water molecule to form the HYDRONIUM ION: H+ + H2O -> H3O+, so acidic ions are always written H+(aq) or H3O+. Dry HCl gas does not turn dry litmus paper red because the separation of H+ from HCl needs water; only moist litmus (or HCl dissolved in water) shows the acidic behaviour: HCl + H2O -> H3O+ + Cl-.",
    "Bases dissolved in water generate hydroxide, OH-(aq), ions, e.g. NaOH(s) --H2O--> Na+(aq) + OH-(aq); KOH(s) --H2O--> K+(aq) + OH-(aq); Mg(OH)2(s) --H2O--> Mg2+(aq) + 2OH-(aq). A base that is soluble in water is called an ALKALI (all bases are not alkalis).",
    "Dissolving an acid or a base in water is a highly EXOTHERMIC process. Concentrated acid must always be added slowly to water with constant stirring, never water to acid, because adding water to concentrated acid can make the heat generated splash the mixture out and cause burns, and the container may crack from local heating. Mixing acid or base with water decreases the concentration of H3O+/OH- ions per unit volume — this is called DILUTION.",
    "The pH SCALE (generally 0 to 14) measures hydrogen ion concentration using a universal indicator: pH < 7 is acidic, pH = 7 is neutral, pH > 7 is basic/alkaline. The higher the H3O+ concentration, the LOWER the pH. As pH rises from 7 to 14, OH- concentration (alkali strength) increases. 'p' in pH stands for German 'potenz' (power).",
    "STRENGTH of an acid/base depends on the number of H+/OH- ions it produces at a given concentration: a STRONG ACID (e.g. HCl) ionises fully and gives more H+ ions than a WEAK ACID (e.g. acetic/CH3COOH) of the same concentration, which ionises only partially.",
    "Importance of pH: the human body works within pH 7.0-7.8, and living organisms tolerate only a narrow pH range. Rain with pH below 5.6 is called ACID RAIN; it lowers river pH and harms aquatic life. Tooth decay starts when mouth pH falls below 5.5, corroding the calcium hydroxyapatite in enamel — using basic toothpaste after eating neutralises the acid formed by bacteria acting on food. The stomach's HCl aids digestion; excess acid (indigestion) is relieved with basic ANTACIDS such as milk of magnesia [Mg(OH)2]. Bee-sting acid is relieved with a mild base like baking soda; nettle-sting methanoic acid is treated by rubbing with the (basic) dock-plant leaf.",
    "SALT FAMILIES: salts sharing the same positive or negative radical belong to a family, e.g. NaCl and Na2SO4 (sodium salts); NaCl and KCl (chloride salts). pH OF SALTS: a salt of a STRONG ACID + STRONG BASE is NEUTRAL (pH 7); a salt of a STRONG ACID + WEAK BASE is ACIDIC (pH < 7); a salt of a STRONG BASE + WEAK ACID is BASIC (pH > 7). NaCl (from HCl + NaOH) is a neutral salt.",
    "CHEMICALS FROM COMMON SALT (NaCl is the raw material for all of these): CHLOR-ALKALI PROCESS — electrolysis of brine gives NaOH, with Cl2 at the anode and H2 at the cathode: 2NaCl(aq) + 2H2O(l) -> 2NaOH(aq) + Cl2(g) + H2(g). BLEACHING POWDER — chlorine + dry slaked lime: 2Ca(OH)2 + 2Cl2 -> Ca(ClO)2 + CaCl2 + 2H2O; used to bleach cotton/linen/wood pulp, as an oxidising agent, and to disinfect drinking water. BAKING SODA (sodium hydrogencarbonate, NaHCO3) — NaCl + H2O + CO2 + NH3 -> NH4Cl + NaHCO3; heating gives 2NaHCO3 --heat--> Na2CO3 + H2O + CO2; it is a mild non-corrosive base, used in baking powder (with tartaric acid, releasing CO2 to make cakes soft/spongy), as an antacid ingredient, and in soda-acid fire extinguishers. WASHING SODA (Na2CO3.10H2O) — made by recrystallising sodium carbonate (obtained by heating baking soda) with water: Na2CO3 + 10H2O -> Na2CO3.10H2O; used in glass, soap and paper industries, to make sodium compounds like borax, as a cleaning agent, and to remove permanent hardness of water.",
    "WATER OF CRYSTALLISATION is the fixed number of water molecules in one formula unit of a salt, e.g. hydrated copper sulphate CuSO4.5H2O (blue; turns white on heating, blue again on adding water) and gypsum CaSO4.2H2O. PLASTER OF PARIS is calcium sulphate hemihydrate, CaSO4.½H2O, made by heating gypsum at 373 K; mixed with water it re-forms gypsum as a hard solid: CaSO4.½H2O + 1½H2O -> CaSO4.2H2O. It must be stored in a moisture-proof container (else it absorbs moisture and sets/turns to gypsum inside the container) and is used for supporting fractured bones, making toys, decoration material and smoothing surfaces.",
  ].join("\n"),
  keyFormulae: [
    "Acid + Metal -> Salt + Hydrogen gas",
    "Metal carbonate/Metal hydrogencarbonate + Acid -> Salt + Carbon dioxide + Water",
    "Acid + Base -> Salt + Water (neutralisation); H+(aq) + OH-(aq) -> H2O(l)",
    "Metal oxide + Acid -> Salt + Water (metal oxides are basic oxides)",
    "pH < 7 acidic, pH = 7 neutral, pH > 7 basic; lower pH = higher H+(aq)/H3O+ concentration",
    "Strong acid/base + strong base/acid salt -> neutral (pH 7); strong acid + weak base -> acidic salt (pH < 7); strong base + weak acid -> basic salt (pH > 7)",
    "Chlor-alkali: 2NaCl(aq) + 2H2O(l) -> 2NaOH(aq) + Cl2(g) + H2(g)",
    "Bleaching powder: 2Ca(OH)2 + 2Cl2 -> Ca(ClO)2 + CaCl2 + 2H2O",
    "Baking soda on heating: 2NaHCO3 --heat--> Na2CO3 + H2O + CO2",
    "Plaster of Paris + water -> Gypsum: CaSO4.½H2O + 1½H2O -> CaSO4.2H2O",
  ],
  topics: [
    "Acid-base indicators (litmus, phenolphthalein, methyl orange) and olfactory indicators",
    "Reaction of acids and bases with metals",
    "Reaction of metal carbonates and metal hydrogencarbonates with acids",
    "Neutralisation reaction between acids and bases",
    "Reaction of metal oxides with acids and non-metallic oxides with bases",
    "What acids and bases have in common: H+(aq) and OH-(aq) ions, conductivity",
    "Role of water in forming acidic/basic ions; hydronium ion",
    "Dilution and the exothermic nature of mixing acid/base with water",
    "The pH scale and strength of acids and bases",
    "Importance of pH in daily life, digestion, tooth decay and agriculture",
    "Families of salts and pH of salts",
    "Chemicals from common salt: sodium hydroxide, bleaching powder, baking soda, washing soda",
    "Water of crystallisation and Plaster of Paris",
  ],
  exercises: [
    {
      exercise: "Exercises",
      problems: [
        {
          no: "1",
          statement: "A solution turns red litmus blue, its pH is likely to be\n(a) 1  (b) 4  (c) 5  (d) 10",
          answer: "(d) 10. Turning red litmus blue means the solution is basic, and basic solutions have pH greater than 7.",
        },
        {
          no: "2",
          statement:
            "A solution reacts with crushed egg-shells to give a gas that turns lime-water milky. The solution contains\n(a) NaCl  (b) HCl  (c) LiCl  (d) KCl",
          answer:
            "(b) HCl. Egg-shells are made of calcium carbonate; only an acid (HCl) reacts with a carbonate to release CO2, which turns lime water milky. NaCl, LiCl and KCl are neutral salts and do not react with carbonates this way.",
        },
        {
          no: "3",
          statement:
            "10 mL of a solution of NaOH is found to be completely neutralised by 8 mL of a given solution of HCl. If we take 20 mL of the same solution of NaOH, the amount of HCl solution (the same solution as before) required to neutralise it will be\n(a) 4 mL  (b) 8 mL  (c) 12 mL  (d) 16 mL",
          answer:
            "(d) 16 mL. The volume of NaOH is doubled (10 mL to 20 mL) at the same concentration, so the volume of HCl needed to neutralise it also doubles: 8 mL x 2 = 16 mL.",
        },
        {
          no: "4",
          statement:
            "Which one of the following types of medicines is used for treating indigestion?\n(a) Antibiotic\n(b) Analgesic\n(c) Antacid\n(d) Antiseptic",
          answer: "(c) Antacid. Antacids are mild bases that neutralise excess stomach acid causing indigestion.",
        },
        {
          no: "5",
          statement:
            "Write word equations and then balanced equations for the reaction taking place when –\n(a) dilute sulphuric acid reacts with zinc granules.\n(b) dilute hydrochloric acid reacts with magnesium ribbon.\n(c) dilute sulphuric acid reacts with aluminium powder.\n(d) dilute hydrochloric acid reacts with iron filings.",
          answer:
            "(a) Zinc + Dilute sulphuric acid -> Zinc sulphate + Hydrogen: Zn(s) + H2SO4(aq) -> ZnSO4(aq) + H2(g)\n(b) Magnesium + Dilute hydrochloric acid -> Magnesium chloride + Hydrogen: Mg(s) + 2HCl(aq) -> MgCl2(aq) + H2(g)\n(c) Aluminium + Dilute sulphuric acid -> Aluminium sulphate + Hydrogen: 2Al(s) + 3H2SO4(aq) -> Al2(SO4)3(aq) + 3H2(g)\n(d) Iron + Dilute hydrochloric acid -> Iron(II) chloride + Hydrogen: Fe(s) + 2HCl(aq) -> FeCl2(aq) + H2(g)",
        },
        {
          no: "6",
          statement:
            "Compounds such as alcohols and glucose also contain hydrogen but are not categorised as acids. Describe an Activity to prove it.",
          answer:
            "Set up a 100 mL beaker with two nails fixed on a cork, connected through a bulb and switch to a 6-volt battery (as in Activity 2.8). Pour dilute HCl into the beaker and switch on the circuit — the bulb glows, showing the acid conducts electricity because it ionises to give H+(aq) ions. Empty and rinse the beaker, then repeat separately with glucose solution and with alcohol solution: in both cases the bulb does NOT glow, showing these solutions do not produce ions/H+(aq) despite containing hydrogen atoms. This proves glucose and alcohol are not acids, since acidic behaviour needs H+(aq) ions in solution, not just hydrogen atoms in the molecule.",
        },
        {
          no: "7",
          statement: "Why does distilled water not conduct electricity, whereas rain water does?",
          answer:
            "Distilled water is pure H2O with no dissolved ions, so it cannot carry electric current. Rain water dissolves acidic gases/carbon dioxide from the atmosphere as it falls, forming weak acids that ionise to give H+(aq) ions, so rain water contains ions and conducts electricity.",
        },
        {
          no: "8",
          statement: "Why does dry HCl gas not show acidic behaviour in the absence of water?",
          answer:
            "Acidic behaviour comes from H+(aq) ions, but hydrogen ions cannot exist alone — they must combine with water to form H3O+. The separation of H+ from the HCl molecule (HCl + H2O -> H3O+ + Cl-) can only take place in the presence of water. Without water, dry HCl gas does not ionise, so it shows no acidic behaviour.",
        },
        {
          no: "9",
          statement:
            "Five solutions A, B, C, D and E when tested with universal indicator showed pH as 4, 1, 11, 7 and 9, respectively. Which solution is\n(a) neutral?\n(b) strongly alkaline?\n(c) strongly acidic?\n(d) weakly acidic?\n(e) weakly alkaline?\nArrange the pH in increasing order of hydrogen-ion concentration.",
          answer:
            "(a) neutral: D (pH 7)\n(b) strongly alkaline: C (pH 11)\n(c) strongly acidic: B (pH 1)\n(d) weakly acidic: A (pH 4)\n(e) weakly alkaline: E (pH 9)\nIncreasing order of hydrogen-ion concentration (lower pH means higher H+ concentration, so this is decreasing order of pH): C (11) < E (9) < D (7) < A (4) < B (1).",
        },
        {
          no: "10",
          statement:
            "Equal lengths of magnesium ribbons are taken in test tubes A and B. Hydrochloric acid (HCl) is added to test tube A, while acetic acid (CH3COOH) is added to test tube B. Amount and concentration taken for both the acids are same. In which test tube will the fizzing occur more vigorously and why?",
          answer:
            "The fizzing (evolution of hydrogen gas) will be more vigorous in test tube A, with HCl. HCl is a strong acid and ionises almost completely to give a high concentration of H+ ions, while acetic acid is a weak acid and ionises only partially at the same concentration, giving fewer H+ ions. More H+ ions available to react with the magnesium means a faster reaction and more vigorous fizzing in test tube A.",
        },
        {
          no: "11",
          statement: "Fresh milk has a pH of 6. How do you think the pH will change as it turns into curd? Explain your answer.",
          answer:
            "The pH will decrease, falling below 6 as milk turns into curd. Bacteria (lactic acid bacteria) convert the lactose (milk sugar) into lactic acid during curdling, and this increase in acid content lowers the pH.",
        },
        {
          no: "12",
          statement:
            "A milkman adds a very small amount of baking soda to fresh milk.\n(a) Why does he shift the pH of the fresh milk from 6 to slightly alkaline?\n(b) Why does this milk take a long time to set as curd?",
          answer:
            "(a) Baking soda (sodium hydrogencarbonate) is a mild base. Adding a little of it to the mildly acidic fresh milk (pH 6) neutralises some of the acid and shifts the pH to slightly alkaline, which slows down the souring/spoiling of the milk.\n(b) Curd sets when lactic acid bacteria produce enough lactic acid to bring the milk's pH down into the acidic range. Because the milk is now slightly alkaline instead of pH 6, it takes longer for the bacteria's acid production to lower the pH enough for curdling, so the milk takes a longer time to set as curd.",
        },
        {
          no: "13",
          statement: "Plaster of Paris should be stored in a moisture-proof container. Explain why?",
          answer:
            "Plaster of Paris (calcium sulphate hemihydrate, CaSO4.½H2O) readily absorbs moisture from the air. On contact with water it reacts to form gypsum (CaSO4.2H2O) and sets into a hard mass: CaSO4.½H2O + 1½H2O -> CaSO4.2H2O. If not stored in a moisture-proof container, it would absorb atmospheric moisture and set/harden inside the container itself, becoming useless.",
        },
        {
          no: "14",
          statement: "What is a neutralisation reaction? Give two examples.",
          answer:
            "A neutralisation reaction is the reaction between an acid and a base to form a salt and water: Acid + Base -> Salt + Water. Examples: NaOH(aq) + HCl(aq) -> NaCl(aq) + H2O(l); KOH(aq) + HNO3(aq) -> KNO3(aq) + H2O(l).",
        },
        {
          no: "15",
          statement: "Give two important uses of washing soda and baking soda.",
          answer:
            "Washing soda (sodium carbonate, Na2CO3.10H2O): (i) used in the glass, soap and paper industries; (ii) used for removing permanent hardness of water.\nBaking soda (sodium hydrogencarbonate, NaHCO3): (i) used as an ingredient in antacids to neutralise excess acid in the stomach and relieve indigestion; (ii) used in making baking powder (with tartaric acid) — the CO2 released makes bread/cake soft and spongy — and in soda-acid fire extinguishers.",
        },
      ],
    },
  ],
};
