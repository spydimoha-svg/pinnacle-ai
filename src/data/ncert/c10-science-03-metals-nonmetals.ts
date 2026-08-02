// NCERT Class 10 Science — Chapter 3: Metals and Non-metals (rationalised
// syllabus). Concept notes and the end-of-chapter "Exercises" (Q1-16),
// verbatim, with answers verified against the NCERT text — reactivity series,
// extraction and corrosion are heavily board-tested and were previously
// missing from the grounding corpus.
import type { NcertChapter } from "./types";

export const C10_SCIENCE_METALS_NONMETALS: NcertChapter = {
  id: "c10-science-03",
  classLevel: 10,
  subjectId: "c10-science",
  chapterNumber: 3,
  title: "Metals and Non-metals",
  book: "NCERT Class 10 Science (rationalised)",
  concepts: [
    "PHYSICAL PROPERTIES OF METALS: METALLIC LUSTRE (freshly cut surface shines); MALLEABILITY (can be hammered into thin sheets, e.g. gold, silver, aluminium); DUCTILITY (can be drawn into thin wires, e.g. gold gives the finest wire); good CONDUCTORS OF HEAT AND ELECTRICITY (silver and copper are the best conductors, lead and mercury are poor conductors); SONOROUS (produce a ringing sound when struck, so used to make bells); generally have HIGH MELTING AND BOILING POINTS and are hard, except sodium and potassium which are soft and can be cut with a knife, and have low melting points. Mercury is the only metal that is liquid at room temperature.",
    "PHYSICAL PROPERTIES OF NON-METALS: generally NOT lustrous (except iodine, which is lustrous, and graphite/diamond); NOT malleable or ductile — non-metal solids are brittle and break into pieces when hammered; generally poor conductors of heat and electricity (graphite is an exception — it conducts electricity); low melting and boiling points (except diamond, which has a very high melting point, and graphite). Carbon can exist in different forms (ALLOTROPES) — diamond and graphite are both made of carbon but have very different physical properties.",
    "REACTIVITY WITH OXYGEN: metals react with oxygen to form METAL OXIDES, which are BASIC in nature, e.g. 2Cu + O2 -> heat -> 2CuO; 4Al + 3O2 -> 2Al2O3. Sodium and potassium react so vigorously with oxygen at room temperature that they are stored in kerosene oil to prevent contact with air. Magnesium ribbon burns in air with a dazzling white flame to form magnesium oxide: 2Mg + O2 -> 2MgO. Some metal oxides, like aluminium oxide (Al2O3) and zinc oxide (ZnO), show both acidic and basic behaviour — these are called AMPHOTERIC OXIDES; e.g. Al2O3 + 6HCl -> 2AlCl3 + 3H2O (basic behaviour) and Al2O3 + 2NaOH -> 2NaAlO2 + H2O (acidic behaviour). Most metal oxides are insoluble in water, but some dissolve to form ALKALIS, e.g. Na2O + H2O -> 2NaOH.",
    "Non-metals react with oxygen to form non-metal oxides, which are ACIDIC (turn moist blue litmus red) or NEUTRAL (e.g. CO, NO, H2O), e.g. S + O2 -> SO2 (sulphur dioxide, acidic — dissolves in water to form sulphurous acid, turns moist litmus red, no effect on dry litmus).",
    "REACTIVITY WITH WATER: metals react with water to produce a metal oxide/hydroxide and hydrogen gas. Potassium and sodium react so violently with cold water that the reaction is exothermic enough to catch fire: 2K + 2H2O -> 2KOH + H2 + heat; 2Na + 2H2O -> 2NaOH + H2 + heat. Calcium reacts less violently — the heat evolved is not enough to ignite hydrogen — and the calcium starts floating because bubbles of hydrogen gas stick to its surface: Ca + 2H2O -> Ca(OH)2 + H2. Magnesium does not react with cold water but reacts with hot water. Aluminium, iron and zinc do not react with cold or hot water, but react with steam to give the metal oxide and hydrogen: 2Al + 3H2O(steam) -> Al2O3 + 3H2; 3Fe + 4H2O(steam) -> Fe3O4 + 4H2. Metals like lead, copper, silver and gold do not react with water at all.",
    "REACTIVITY WITH DILUTE ACIDS: metals more reactive than hydrogen displace hydrogen gas from dilute acids to form a salt, e.g. Mg + 2HCl -> MgCl2 + H2; Zn + H2SO4 -> ZnSO4 + H2; Fe + 2HCl -> FeCl2 + H2. Iron and aluminium are examples of metals that displace hydrogen from dilute acids (they are more reactive than hydrogen). Copper and mercury do NOT displace hydrogen from dilute acids because they are less reactive than hydrogen. Metal + dilute HCl/H2SO4 -> Salt + Hydrogen gas is tested with a burning matchstick — the gas burns with a pop sound. (Nitric acid is a strong oxidising agent and is not used for this test, since it oxidises the hydrogen produced to water except with very dilute HNO3 with Mg and Mn.)",
    "REACTIVITY WITH OTHER METAL SALT SOLUTIONS (DISPLACEMENT REACTIONS): a more reactive metal displaces a less reactive metal from its salt solution, e.g. Fe + CuSO4 -> FeSO4 + Cu (iron nail turns the blue copper sulphate solution pale green and copper is deposited); Zn + CuSO4 -> ZnSO4 + Cu; Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag (copper displaces silver, giving a blue solution and depositing silver). A less reactive metal cannot displace a more reactive metal from its salt solution.",
    "THE REACTIVITY SERIES is a list of common metals arranged in order of decreasing reactivity, determined from the reactions above: K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Hg > Ag > Au. Potassium and sodium are the most reactive; gold, silver, mercury and copper are among the least reactive (copper, silver and gold are called NOBLE METALS because they are largely unreactive).",
    "HOW DO METALS AND NON-METALS REACT: atoms achieve a stable electronic configuration (a complete octet, like the nearest noble gas) either by gaining/losing electrons (forming ions) or by sharing electrons. Metal atoms LOSE electrons from their outermost shell to form positively charged CATIONS; non-metal atoms GAIN electrons to form negatively charged ANIONS. Compounds formed this way, by the transfer of electrons from a metal to a non-metal, are called IONIC COMPOUNDS or ELECTROVALENT COMPOUNDS.",
    "FORMATION OF SODIUM CHLORIDE: Na (2,8,1) loses one electron from its outermost shell to form Na+ (2,8), and Cl (2,8,7) gains that electron to form Cl- (2,8,8); the oppositely charged Na+ and Cl- ions attract each other and are held together by strong electrostatic force of attraction to form NaCl. FORMATION OF MAGNESIUM CHLORIDE: Mg (2,8,2) loses two electrons to form Mg2+ (2,8), and two Cl atoms each gain one electron to form two Cl- ions, giving MgCl2.",
    "PROPERTIES OF IONIC COMPOUNDS: solid and generally hard due to strong inter-ionic attraction; generally brittle and break into pieces when pressure is applied; have HIGH MELTING AND BOILING POINTS because a considerable amount of energy is required to break the strong inter-ionic attraction; generally soluble in water and insoluble in solvents like kerosene and petrol; do NOT conduct electricity in the SOLID state (ions are held rigidly and cannot move) but DO conduct electricity when dissolved in water or in the MOLTEN state (the ions become free to move and carry charge).",
    "OCCURRENCE OF METALS: the earth's crust is the major source of metals, and sea water contains soluble salts such as sodium chloride and magnesium chloride. A MINERAL is a naturally occurring substance in which a metal or its compound is found in the earth's crust. In some minerals a particular metal compound is abundant and can be profitably extracted — these minerals are called ORES. The unwanted rocky/earthy material mixed with an ore is called GANGUE.",
    "EXTRACTION OF METALS depends on the metal's position in the reactivity series. Metals at the BOTTOM of the series (gold, silver, platinum, copper) are the least reactive and are found in nature in the FREE (native) state. Metals in the MIDDLE of the series (like iron, zinc, lead, copper) are moderately reactive and are usually found as OXIDES, SULPHIDES or CARBONATES; sulphide and carbonate ores are first converted to oxides before reduction, because metals are more easily obtained from their oxides. Metals at the TOP of the series (potassium, sodium, calcium, magnesium, aluminium) are highly reactive and cannot be obtained by heating with carbon — they are extracted by ELECTROLYTIC REDUCTION, e.g. molten aluminium oxide gives aluminium at the cathode.",
    "ROASTING is heating a sulphide ore strongly in the presence of excess air to convert it into an oxide, e.g. 2ZnS + 3O2 -> heat -> 2ZnO + 2SO2. CALCINATION is heating a carbonate ore strongly in the LIMITED presence of (or absence of) air to convert it into an oxide, e.g. ZnCO3 -> heat -> ZnO + CO2. Metal oxides of metals below the middle of the reactivity series (moderately reactive, e.g. zinc, iron) are then reduced to the metal by heating with a reducing agent such as carbon, e.g. ZnO + C -> Zn + CO. Highly reactive metal oxides (of metals above carbon in the series, e.g. sodium, magnesium, aluminium) cannot be reduced by carbon and are reduced by ELECTROLYSIS instead.",
    "REFINING OF METALS: most metals extracted by these processes need to be purified — the most widely used method is ELECTROLYTIC REFINING. A thick block of the impure metal is made the ANODE and a thin strip of the pure metal is made the CATHODE, in a solution of the metal salt as the ELECTROLYTE. On passing current, the impure metal from the anode dissolves into the electrolyte and an equivalent amount of pure metal from the electrolyte is deposited on the cathode; the soluble impurities go into the solution while insoluble impurities settle at the bottom of the anode as ANODE MUD.",
    "CORROSION: when a metal is attacked by substances around it, such as moisture, acids etc., it is said to corrode, and this phenomenon is called CORROSION, e.g. silver articles turn black after some time due to a coating of silver sulphide; copper reacts with moist carbon dioxide in air to form a green coating of basic copper carbonate; iron, when exposed to moist air for a long time, develops a coating of a brown flaky substance called RUST (hydrated iron(III) oxide, Fe2O3.xH2O) — this is called RUSTING. Corrosion of iron causes damage to buildings, bridges, ships and other iron objects, and is a huge economic problem every year.",
    "PREVENTION OF CORROSION: by PAINTING or applying GREASE/OIL (keeps out moisture and air); by GALVANISATION — depositing a thin layer of zinc on iron/steel objects, which protects the iron even if the zinc coating is broken (zinc is more reactive and corrodes preferentially, a sacrificial protection); by ALLOYING (mixing with another metal); by ELECTROPLATING (depositing a thin layer of a less reactive metal like chromium or tin).",
    "ALLOYS are homogeneous mixtures of two or more metals, or a metal and a non-metal, that cannot be separated into their components by physical methods. Alloying changes properties: pure iron is soft and stretches easily when hot, but mixed with a small amount of carbon it becomes hard and strong (STEEL); iron mixed with nickel and chromium gives STAINLESS STEEL, which is hard and does not rust. If one of the metals in the alloy is mercury, the alloy is called an AMALGAM. Brass (copper + zinc) and bronze (copper + tin) are not attacked by any single reagent that corrodes their components. Solder (lead + tin), used for welding electrical wires, has a low melting point.",
  ].join("\n"),
  keyFormulae: [
    "Metal + Oxygen -> Metal oxide (basic); Non-metal + Oxygen -> Non-metal oxide (acidic or neutral)",
    "Amphoteric oxides: Al2O3, ZnO react with both acids and bases",
    "Metal + Dilute acid -> Salt + Hydrogen gas (only metals above hydrogen in the reactivity series)",
    "More reactive metal + Salt solution of less reactive metal -> New salt + Less reactive metal (displacement)",
    "Reactivity series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Hg > Ag > Au",
    "Roasting (sulphide ore, excess air): 2ZnS + 3O2 -> 2ZnO + 2SO2",
    "Calcination (carbonate ore, limited air): ZnCO3 -> ZnO + CO2",
    "Reduction of oxide by carbon: ZnO + C -> Zn + CO",
    "Iron + steam -> Iron oxide + Hydrogen: 3Fe + 4H2O -> Fe3O4 + 4H2",
    "Rust: hydrated iron(III) oxide, Fe2O3.xH2O; prevented by painting, oiling, galvanising, alloying",
  ],
  topics: [
    "Physical properties of metals and non-metals",
    "Reaction of metals with oxygen, water, dilute acids",
    "Displacement reactions and the reactivity series",
    "Formation and properties of ionic (electrovalent) compounds",
    "Occurrence of metals: minerals, ores and gangue",
    "Extraction of metals based on reactivity: native metals, reduction, electrolysis",
    "Roasting and calcination",
    "Refining of metals by electrolytic refining",
    "Corrosion of metals and its prevention",
    "Alloys",
  ],
  exercises: [
    {
      exercise: "Exercises",
      problems: [
        {
          no: "1",
          statement:
            "Which of the following pairs will give displacement reactions?\n(a) NaCl solution and copper metal\n(b) MgCl2 solution and aluminium metal\n(c) FeSO4 solution and silver metal\n(d) AgNO3 solution and copper metal",
          answer:
            "(d) AgNO3 solution and copper metal. Copper is more reactive than silver, so it displaces silver from silver nitrate solution: Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag. In the other pairs the metal given is less reactive than the metal already in the salt, so no displacement occurs.",
        },
        {
          no: "2",
          statement:
            "Which of the following methods is suitable for preventing an iron frying pan from rusting?\n(a) Applying grease\n(b) Applying paint\n(c) Applying a coating of zinc\n(d) All of the above",
          answer:
            "(c) Applying a coating of zinc (galvanising). Grease cannot be used on a frying pan because it would spoil the food, and paint cannot be used because the pan is heated and washed repeatedly and the paint would come off; a zinc coating withstands this use and protects the iron.",
        },
        {
          no: "3",
          statement:
            "An element reacts with oxygen to give a compound with a high melting point. This compound is also soluble in water. The element is likely to be\n(a) calcium\n(b) carbon\n(c) silicon\n(d) iron",
          answer:
            "(a) calcium. Calcium reacts with oxygen to form calcium oxide (CaO), an ionic compound with a high melting point that is soluble in water, forming calcium hydroxide.",
        },
        {
          no: "4",
          statement:
            "Food cans are coated with tin and not with zinc because\n(a) zinc is costlier than tin\n(b) zinc has a higher melting point than tin\n(c) zinc is less reactive than tin\n(d) zinc is more reactive than tin",
          answer:
            "(d) zinc is more reactive than tin. Since zinc is more reactive, it would react with the food acids faster than tin, so the less reactive tin is used for safety even though it is coated over an iron can.",
        },
        {
          no: "5",
          statement:
            "You are given a hammer, a battery, a bulb, wires and a switch.\n(a) How could you use them to distinguish between samples of metals and non-metals?\n(b) Assess the usefulness of these tests in distinguishing between metals and non-metals.",
          answer:
            "(a) Malleability test: strike each sample with the hammer. If it flattens into a sheet without breaking, it is a metal (malleable); if it breaks into pieces, it is a non-metal (brittle). Conductivity test: connect the sample into a circuit with the battery, bulb, wires and switch. If the bulb glows, the sample is a metal (good conductor); if it does not glow, the sample is a non-metal (poor conductor).\n(b) These tests are useful in general but not absolute: sodium and potassium are metals but are soft and not malleable in the usual sense, and graphite is a non-metal that conducts electricity. So the tests correctly classify most samples but have known exceptions.",
        },
        {
          no: "6",
          statement: "What are amphoteric oxides? Give two examples of amphoteric oxides.",
          answer:
            "Amphoteric oxides are metal oxides that react with both acids and bases to produce salt and water, showing both acidic and basic behaviour. Examples: aluminium oxide (Al2O3) and zinc oxide (ZnO). Al2O3 + 6HCl -> 2AlCl3 + 3H2O (basic behaviour, reacting with acid); Al2O3 + 2NaOH -> 2NaAlO2 + H2O (acidic behaviour, reacting with base).",
        },
        {
          no: "7",
          statement: "Name two metals which will displace hydrogen from dilute acids, and two metals which will not.",
          answer:
            "Metals that displace hydrogen from dilute acids (more reactive than hydrogen): iron and aluminium (also magnesium, zinc). Metals that do NOT displace hydrogen from dilute acids (less reactive than hydrogen): copper and mercury (also silver, gold).",
        },
        {
          no: "8",
          statement: "In the electrolytic refining of a metal M, what would you take as the anode, the cathode and the electrolyte?",
          answer:
            "Anode: a thick block/rod of the impure metal M. Cathode: a thin strip of the pure metal M. Electrolyte: a solution of a soluble salt of the same metal M. On passing current, metal from the impure anode dissolves into the electrolyte and an equivalent amount of pure metal is deposited on the cathode; soluble impurities go into solution and insoluble ones settle as anode mud.",
        },
        {
          no: "9",
          statement:
            "Pratyush took sulphur powder on a spatula and heated it. He collected the gas evolved by inverting a test tube over it, as shown in the figure.\n(a) What will be the action of gas on (i) dry litmus paper? (ii) moist litmus paper?\n(b) Write a balanced chemical equation for the reaction taking place.",
          answer:
            "(a)(i) No action on dry litmus paper. (ii) The gas turns moist blue litmus paper red, showing it is acidic.\n(b) S(s) + O2(g) -> SO2(g). The gas is sulphur dioxide; it dissolves in the moisture on the litmus paper to form sulphurous acid, which turns the litmus red, showing that oxides of non-metals are acidic in nature.",
        },
        {
          no: "10",
          statement: "State two ways to prevent the rusting of iron.",
          answer:
            "(i) By painting, oiling or greasing the surface, which keeps out the moisture and air (both are needed for rusting) that would otherwise reach the iron.\n(ii) By galvanisation — coating the iron object with a thin layer of zinc. Even if the zinc layer is broken, the zinc continues to protect the iron because zinc is more reactive and corrodes in preference to the iron.",
        },
        {
          no: "11",
          statement: "What type of oxides are formed when non-metals combine with oxygen?",
          answer:
            "Non-metals combine with oxygen to form acidic oxides (which turn moist blue litmus red, e.g. SO2, CO2) or, in some cases, neutral oxides that show neither acidic nor basic behaviour (e.g. CO, H2O).",
        },
        {
          no: "12",
          statement: "Which chemical process is used for obtaining a metal from its oxide?",
          answer:
            "Reduction. The metal oxide is heated with a suitable reducing agent (such as carbon, or by electrolysis for highly reactive metals) to remove the oxygen and obtain the free metal, e.g. ZnO + C -> Zn + CO.",
        },
        {
          no: "13",
          statement:
            "Metallic oxides of zinc, magnesium and copper were heated with the following metals.\n\nMetal | Zinc oxide | Magnesium oxide | Copper oxide\nMagnesium | ? | ? | ?\nZinc | ? | ? | ?\nCopper | ? | ? | ?\n\nIn which cases will you find displacement reactions taking place?",
          answer:
            "Magnesium is more reactive than both zinc and copper, so it displaces zinc from zinc oxide (Mg + ZnO -> MgO + Zn) and copper from copper oxide (Mg + CuO -> MgO + Cu); it does not react with magnesium oxide (its own oxide). Zinc is more reactive than copper but less reactive than magnesium, so it displaces copper from copper oxide (Zn + CuO -> ZnO + Cu), but does not displace magnesium from magnesium oxide and does not react with its own oxide. Copper is the least reactive of the three, so it cannot displace either zinc or magnesium from their oxides and does not react with its own oxide.",
        },
        {
          no: "14",
          statement: "Differentiate between metal and non-metal on the basis of their chemical properties.",
          answer:
            "Reaction with oxygen: metals form basic oxides (some amphoteric); non-metals form acidic or neutral oxides.\nReaction with water: many metals react with water to give a metal oxide/hydroxide and hydrogen (reactivity varies widely); non-metals generally do not react with water.\nReaction with dilute acids: metals above hydrogen in the reactivity series displace hydrogen gas from dilute acids to form a salt; non-metals do not react with dilute acids to give hydrogen.\nDisplacement reactions: a more reactive metal displaces a less reactive metal from its salt solution; non-metals do not show this kind of reaction with metal salt solutions.\nNature of compounds formed: metals lose electrons to form cations and generally form ionic compounds with non-metals; non-metals gain electrons to form anions and typically form covalent compounds with each other.",
        },
        {
          no: "15",
          statement:
            "A man went door to door posing as a goldsmith's representative and promised to bring back the lost shine of old and dull gold jewellery. An unsuspecting lady gave a set of gold bangles to him which he dipped in a solution kept in a plastic bucket. The bangles sparkled like new but their weight was reduced drastically. She realised this only after the man had left. Can you play the detective to find out the composition of the solution he had used?",
          answer:
            "The solution was aqua regia — a freshly prepared mixture of concentrated hydrochloric acid and concentrated nitric acid in the ratio 3:1. Aqua regia can dissolve gold, so dipping the bangles in it removed a layer of gold (making them shine, since the surface tarnish is dissolved away along with metal) while reducing their actual weight, cheating the lady of part of her gold.",
        },
        {
          no: "16",
          statement: "Give reasons why copper is used to make hot water tanks and not steel (an alloy of iron).",
          answer:
            "Copper is less reactive than iron and does not react with cold water, hot water or steam. Steel is an alloy of iron, and iron reacts with steam: 3Fe(s) + 4H2O(g) -> Fe3O4(s) + 4H2(g). If hot water tanks were made of steel, the iron would react with the steam produced by the hot water and corrode; copper does not undergo this reaction, so it is used instead.",
        },
      ],
    },
  ],
};
