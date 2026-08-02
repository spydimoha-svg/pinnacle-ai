// NCERT Class 10 Science — Chapter 1: Chemical Reactions and Equations
// (rationalised syllabus). The end-of-chapter "Exercises" (Q1-Q20), verbatim,
// with answers verified against the NCERT text so the tutor's final results
// are guaranteed correct — this is the single most board-tested chapter in
// Class 10 Science and was previously missing from the grounding corpus.
import type { NcertChapter } from "./types";

export const C10_SCIENCE_CHEMICAL_REACTIONS: NcertChapter = {
  id: "c10-science-01",
  classLevel: 10,
  subjectId: "c10-science",
  chapterNumber: 1,
  title: "Chemical Reactions and Equations",
  book: "NCERT Class 10 Science (rationalised)",
  concepts: [
    "A CHEMICAL REACTION converts one or more substances (reactants) into one or more new substances (products) with different properties. It is usually accompanied by an observable change: change of state, change in colour, evolution of a gas, or change in temperature.",
    "A CHEMICAL EQUATION is the short-hand representation of a reaction, reactants on the left and products on the right of an arrow.",
    "A BALANCED chemical equation has an equal number of atoms of each element on both sides, in obedience of the LAW OF CONSERVATION OF MASS (mass is neither created nor destroyed in a chemical reaction). Balancing is done by the hit-and-trial method, adjusting whole-number coefficients in front of formulae — the formulae themselves (subscripts) are never changed.",
    "A balanced equation is made more informative by adding physical states in brackets — (s) solid, (l) liquid, (g) gas, (aq) aqueous — and by writing the reaction condition (heat/Δ, catalyst, light, electricity) over the arrow.",
    "COMBINATION reaction: two or more reactants combine to give a single product, A + B -> AB. e.g. CaO(s) + H2O(l) -> Ca(OH)2(aq).",
    "DECOMPOSITION reaction: a single reactant breaks down into two or more simpler products, AB -> A + B — the exact opposite of a combination reaction. It needs energy, supplied as heat (thermal decomposition), light (photolytic decomposition), or electricity (electrolytic decomposition).",
    "DISPLACEMENT reaction: a more reactive element displaces a less reactive element from its compound, A + BC -> AC + B. e.g. Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s).",
    "DOUBLE DISPLACEMENT reaction: two compounds exchange ions, AB + CD -> AD + CB. When one product is an insoluble solid it is also called a PRECIPITATION reaction, e.g. Na2SO4(aq) + BaCl2(aq) -> BaSO4(s) + 2NaCl(aq).",
    "A reaction that releases heat to the surroundings is EXOTHERMIC (e.g. respiration, burning of fuels). A reaction that absorbs heat is ENDOTHERMIC (e.g. thermal decomposition of CaCO3).",
    "OXIDATION and REDUCTION, in terms of oxygen: oxidation is the GAIN of oxygen (or loss of hydrogen) by a substance; reduction is the LOSS of oxygen (or gain of hydrogen). A reaction where both happen together is a REDOX reaction.",
    "Everyday effects of oxidation: CORROSION is the slow eating away of a metal by substances around it — moisture, air, acids — e.g. rusting of iron, tarnishing of silver, the green coat on copper. RANCIDITY is the aerial oxidation of oils and fats in food, giving a bad smell and taste; it is slowed by antioxidants, airtight containers, refrigeration, or by flushing packets with nitrogen gas.",
  ].join("\n"),
  keyFormulae: [
    "Law of Conservation of Mass: total mass of reactants = total mass of products, so every chemical equation must be balanced",
    "Combination: A + B -> AB",
    "Decomposition: AB -> A + B",
    "Displacement: A + BC -> AC + B",
    "Double displacement: AB + CD -> AD + CB",
    "Oxidation = gain of oxygen / loss of hydrogen; Reduction = loss of oxygen / gain of hydrogen",
  ],
  topics: [
    "Chemical reactions and how to identify them",
    "Writing and balancing a chemical equation",
    "Balance the number of atoms on both sides of an equation",
    "Physical states and conditions written in an equation",
    "Combination reactions",
    "Decomposition reactions (thermal, photolytic, electrolytic)",
    "Displacement and double displacement reactions",
    "Precipitation reactions",
    "Oxidation and reduction in terms of oxygen",
    "Exothermic and endothermic reactions",
    "Corrosion",
    "Rancidity",
  ],
  exercises: [
    {
      exercise: "Exercises",
      problems: [
        {
          no: "1",
          statement:
            "Which of the statements about the reaction below are incorrect?\n2PbO(s) + C(s) -> 2Pb(s) + CO2(g)\n(a) Lead is getting reduced.\n(b) Carbon dioxide is getting oxidised.\n(c) Carbon is getting oxidised.\n(d) Lead oxide is getting reduced.\n(i) (a) and (b)  (ii) (a) and (c)  (iii) (a), (b) and (c)  (iv) all",
          answer:
            "(i) (a) and (b) are incorrect. It is lead OXIDE that is reduced to lead (not lead itself), and it is CARBON that is oxidised to carbon dioxide (not carbon dioxide itself). Statements (c) and (d) are correct as written.",
        },
        {
          no: "2",
          statement:
            "Fe2O3 + 2Al -> Al2O3 + 2Fe. The above reaction is an example of a\n(i) combination reaction  (ii) double displacement reaction  (iii) decomposition reaction  (iv) displacement reaction",
          answer:
            "(iv) displacement reaction. Aluminium, being more reactive than iron, displaces iron from iron(III) oxide. This is the (highly exothermic) thermite reaction, used to join railway tracks.",
        },
        {
          no: "3",
          statement:
            "What happens when dilute hydrochloric acid is added to iron fillings? Tick the correct answer.\n(i) Hydrogen gas and iron chloride are produced.\n(ii) Chlorine gas and iron hydroxide are produced.\n(iii) No reaction takes place.\n(iv) Iron salt and water are produced.",
          answer:
            "(i) Fe(s) + 2HCl(aq) -> FeCl2(aq) + H2(g). Hydrogen gas and iron(II) chloride are produced; this is a displacement reaction.",
        },
        {
          no: "4",
          statement:
            "What is a balanced chemical equation? Why should chemical equations be balanced?",
          answer:
            "A balanced chemical equation has an equal number of atoms of each element on the reactant side and the product side. Equations must be balanced because of the Law of Conservation of Mass: atoms are neither created nor destroyed in a chemical reaction, so the mass of reactants must equal the mass of products.",
        },
        {
          no: "5",
          statement:
            "Translate the following statements into chemical equations and then balance them:\n(i) Hydrogen gas combines with nitrogen to form ammonia.\n(ii) Hydrogen sulphide gas burns in air to give water and sulphur dioxide.\n(iii) Barium chloride reacts with aluminium sulphate to give aluminium chloride and a precipitate of barium sulphate.\n(iv) Potassium metal reacts with water to give potassium hydroxide and hydrogen gas.",
          answer:
            "(i) N2(g) + 3H2(g) -> 2NH3(g)\n(ii) 2H2S(g) + 3O2(g) -> 2H2O(l) + 2SO2(g)\n(iii) 3BaCl2(aq) + Al2(SO4)3(aq) -> 2AlCl3(aq) + 3BaSO4(s)\n(iv) 2K(s) + 2H2O(l) -> 2KOH(aq) + H2(g)",
        },
        {
          no: "6",
          statement:
            "Balance the following chemical equations:\n(i) HNO3 + Ca(OH)2 -> Ca(NO3)2 + H2O\n(ii) NaOH + H2SO4 -> Na2SO4 + H2O\n(iii) NaCl + AgNO3 -> AgCl + NaNO3\n(iv) BaCl2 + H2SO4 -> BaSO4 + HCl",
          answer:
            "(i) 2HNO3 + Ca(OH)2 -> Ca(NO3)2 + 2H2O\n(ii) 2NaOH + H2SO4 -> Na2SO4 + 2H2O\n(iii) NaCl + AgNO3 -> AgCl + NaNO3 (already balanced)\n(iv) BaCl2 + H2SO4 -> BaSO4 + 2HCl",
        },
        {
          no: "7",
          statement:
            "Write the balanced chemical equations for the following reactions:\n(i) Calcium hydroxide + Carbon dioxide -> Calcium carbonate + Water\n(ii) Zinc + Silver nitrate -> Zinc nitrate + Silver\n(iii) Aluminium + Copper chloride -> Aluminium chloride + Copper\n(iv) Barium chloride + Potassium sulphate -> Barium sulphate + Potassium chloride",
          answer:
            "(i) Ca(OH)2 + CO2 -> CaCO3 + H2O\n(ii) Zn + 2AgNO3 -> Zn(NO3)2 + 2Ag\n(iii) 2Al + 3CuCl2 -> 2AlCl3 + 3Cu\n(iv) BaCl2 + K2SO4 -> BaSO4 + 2KCl",
        },
        {
          no: "8",
          statement:
            "Write the balanced chemical equation for the following and identify the type of reaction in each case:\n(i) Potassium bromide(aq) + Barium iodide(aq) -> Potassium iodide(aq) + Barium bromide(s)\n(ii) Zinc carbonate(s) -> Zinc oxide(s) + Carbon dioxide(g)\n(iii) Hydrogen(g) + Chlorine(g) -> Hydrogen chloride(g)\n(iv) Magnesium(s) + Hydrochloric acid(aq) -> Magnesium chloride(aq) + Hydrogen(g)",
          answer:
            "(i) 2KBr(aq) + BaI2(aq) -> 2KI(aq) + BaBr2(s) — double displacement (precipitation) reaction.\n(ii) ZnCO3(s) -> ZnO(s) + CO2(g) — decomposition (thermal decomposition) reaction.\n(iii) H2(g) + Cl2(g) -> 2HCl(g) — combination reaction.\n(iv) Mg(s) + 2HCl(aq) -> MgCl2(aq) + H2(g) — displacement reaction.",
        },
        {
          no: "9",
          statement:
            "What does one mean by exothermic and endothermic reactions? Give examples.",
          answer:
            "Exothermic: a reaction that releases heat/energy to the surroundings. Example: CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l) + heat (burning of natural gas); respiration is also exothermic. Endothermic: a reaction that absorbs heat/energy from the surroundings. Example: CaCO3(s) --heat--> CaO(s) + CO2(g) (thermal decomposition of limestone).",
        },
        {
          no: "10",
          statement: "Why is respiration considered an exothermic reaction? Explain.",
          answer:
            "In respiration, glucose obtained from food combines with oxygen inside cells to release carbon dioxide, water and energy: C6H12O6(aq) + 6O2(g) -> 6CO2(g) + 6H2O(l) + energy. Because energy is released rather than absorbed, respiration is exothermic; this energy powers the body's life processes.",
        },
        {
          no: "11",
          statement:
            "Why are decomposition reactions called the opposite of combination reactions? Write equations for these reactions.",
          answer:
            "A combination reaction joins two or more substances into a single product, A + B -> AB, while a decomposition reaction breaks a single substance into two or more simpler products, AB -> A + B — exactly the reverse process. Combination: CaO(s) + H2O(l) -> Ca(OH)2(aq). Decomposition: CaCO3(s) --heat--> CaO(s) + CO2(g).",
        },
        {
          no: "12",
          statement:
            "Write one equation each for decomposition reactions where energy is supplied in the form of heat, light or electricity.",
          answer:
            "Heat (thermal decomposition): CaCO3(s) --heat--> CaO(s) + CO2(g).\nLight (photolytic decomposition): 2AgCl(s) --sunlight--> 2Ag(s) + Cl2(g).\nElectricity (electrolytic decomposition): 2H2O(l) --electricity--> 2H2(g) + O2(g).",
        },
        {
          no: "13",
          statement:
            "What is the difference between displacement and double displacement reactions? Write equations for these reactions.",
          answer:
            "In a displacement reaction a more reactive element displaces a less reactive element from its compound: A + BC -> AC + B, e.g. Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s). In a double displacement reaction two compounds exchange ions to form two new compounds, often precipitating one: AB + CD -> AD + CB, e.g. Na2SO4(aq) + BaCl2(aq) -> BaSO4(s) + 2NaCl(aq).",
        },
        {
          no: "14",
          statement:
            "In the refining of silver, the recovery of silver from silver nitrate solution involved displacement by copper metal. Write down the reaction involved.",
          answer:
            "2AgNO3(aq) + Cu(s) -> Cu(NO3)2(aq) + 2Ag(s). Copper is more reactive than silver, so it displaces silver from silver nitrate solution.",
        },
        {
          no: "15",
          statement: "What do you mean by a precipitation reaction? Explain by giving examples.",
          answer:
            "A precipitation reaction is one in which an insoluble solid (a precipitate) forms when two solutions of soluble salts are mixed. Example: Na2SO4(aq) + BaCl2(aq) -> BaSO4(s) + 2NaCl(aq); white insoluble barium sulphate is the precipitate. Example: AgNO3(aq) + NaCl(aq) -> AgCl(s) + NaNO3(aq).",
        },
        {
          no: "16",
          statement:
            "Explain the following in terms of gain or loss of oxygen, with two examples each:\n(a) Oxidation\n(b) Reduction",
          answer:
            "(a) Oxidation is the gain of oxygen (or loss of hydrogen) by a substance. Examples: 2Cu(s) + O2(g) -> 2CuO(s); 4Na(s) + O2(g) -> 2Na2O(s).\n(b) Reduction is the loss of oxygen (or gain of hydrogen) by a substance. Examples: CuO(s) + H2(g) -> Cu(s) + H2O(l); ZnO(s) + C(s) -> Zn(s) + CO(g).",
        },
        {
          no: "17",
          statement:
            "A shiny brown coloured element 'X' on heating in air becomes black in colour. Name the element 'X' and the black coloured compound formed.",
          answer:
            "X is copper (Cu). On heating in air it forms black copper(II) oxide (CuO): 2Cu(s) + O2(g) --heat--> 2CuO(s).",
        },
        {
          no: "18",
          statement: "Why do we apply paint on iron articles?",
          answer:
            "Iron corrodes (rusts) when its surface is in contact with moisture and air/oxygen, forming reddish-brown hydrated iron(III) oxide. A coat of paint keeps air and moisture away from the metal surface, so it prevents rusting/corrosion.",
        },
        {
          no: "19",
          statement: "Oil and fat containing food items are flushed with nitrogen. Why?",
          answer:
            "Oils and fats undergo aerial oxidation over time, turning rancid and spoiling their smell and taste. Nitrogen is an inert gas, so flushing food packets with nitrogen keeps oxygen away from the food and delays rancidity, keeping it fresh longer.",
        },
        {
          no: "20",
          statement: "Explain the following terms with one example each:\n(a) Corrosion\n(b) Rancidity",
          answer:
            "(a) Corrosion is the slow deterioration of a metal caused by attack from substances around it, such as moisture, air or acids. Example: rusting of iron (formation of reddish-brown hydrated iron(III) oxide); the green coat that forms on copper is another example.\n(b) Rancidity is the aerial oxidation of oils and fats present in food, which spoils their smell and taste. Example: cooking oil or fried snacks smelling and tasting 'off' after being left exposed to air for a long time.",
        },
      ],
    },
  ],
};
