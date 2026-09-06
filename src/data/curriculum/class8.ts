import type { Subject } from "../../lib/types";

// Class VIII curriculum — CBSE / NCERT rationalised syllabus
const maths: Subject = {
  id: "c8-maths",
  name: "Mathematics",
  classLevel: 8,
  icon: "Sigma",
  color: "gold",
  chapters: [
    { id: "c8-maths-01", number: 1, title: "Rational Numbers", keyTopics: ["Closure, commutativity & associativity", "Distributivity of multiplication over addition", "Representation on number line"] },
    { id: "c8-maths-02", number: 2, title: "Linear Equations in One Variable", keyTopics: ["Solving equations having variables on both sides", "Applications to word problems"] },
    { id: "c8-maths-03", number: 3, title: "Understanding Quadrilaterals", keyTopics: ["Polygons and sum of exterior angles", "Kinds of quadrilaterals (trapezium, kite, parallelogram)", "Special parallelograms (rhombus, rectangle, square)"] },
    { id: "c8-maths-04", number: 4, title: "Data Handling", keyTopics: ["Organizing data & frequency distribution", "Pie charts (circle graphs)", "Chance and probability"] },
    { id: "c8-maths-05", number: 5, title: "Squares and Square Roots", keyTopics: ["Properties of square numbers", "Finding square roots via prime factorisation and division method"] },
    { id: "c8-maths-06", number: 6, title: "Cubes and Cube Roots", keyTopics: ["Cube numbers and patterns", "Cube roots by prime factorisation method"] },
    { id: "c8-maths-07", number: 7, title: "Comparing Quantities", keyTopics: ["Ratios and percentages", "Discount, tax (GST), profit & loss", "Compound interest formula"] },
    { id: "c8-maths-08", number: 8, title: "Algebraic Expressions and Identities", keyTopics: ["Monomials, binomials and polynomials", "Multiplication of expressions", "Standard algebraic identities"] },
    { id: "c8-maths-09", number: 9, title: "Mensuration", keyTopics: ["Area of trapezium and general quadrilateral", "Surface area of cube, cuboid and cylinder", "Volume of cube, cuboid and cylinder"] },
    { id: "c8-maths-10", number: 10, title: "Exponents and Powers", keyTopics: ["Powers with negative exponents", "Laws of exponents", "Standard form for very small/large numbers"] },
    { id: "c8-maths-11", number: 11, title: "Direct and Inverse Proportions", keyTopics: ["Direct proportion concept & formula", "Inverse proportion concept & formula"] },
    { id: "c8-maths-12", number: 12, title: "Factorisation", keyTopics: ["Factorisation by common factors & grouping", "Factorisation using identities", "Division of algebraic expressions"] },
    { id: "c8-maths-13", number: 13, title: "Introduction to Graphs", keyTopics: ["Line graph and linear graphs", "Coordinates of a point", "Applications of graphs"] },
  ],
};

const science: Subject = {
  id: "c8-science",
  name: "Science",
  classLevel: 8,
  icon: "FlaskConical",
  color: "mint",
  chapters: [
    { id: "c8-science-01", number: 1, title: "Crop Production and Management", keyTopics: ["Preparation of soil, sowing & adding manure/fertiliser", "Irrigation methods", "Harvesting & storage of grains"] },
    { id: "c8-science-02", number: 2, title: "Microorganisms: Friend and Foe", keyTopics: ["Types of microorganisms", "Friendly microorganisms & commercial uses", "Harmful microorganisms & food preservation"] },
    { id: "c8-science-03", number: 3, title: "Coal and Petroleum", keyTopics: ["Inexhaustible & exhaustible natural resources", "Coal formation & products (coke, tar, gas)", "Petroleum refining & natural gas"] },
    { id: "c8-science-04", number: 4, title: "Combustion and Flame", keyTopics: ["Combustion & ignition temperature", "Structure of a flame", "Types of fuels & fuel efficiency"] },
    { id: "c8-science-05", number: 5, title: "Conservation of Plants and Animals", keyTopics: ["Deforestation & its consequences", "Biosphere reserves, national parks & sanctuaries", "Endemic species & Red Data Book"] },
    { id: "c8-science-06", number: 6, title: "Reproduction in Animals", keyTopics: ["Modes of reproduction", "Male & female reproductive organs", "Fertilisation (internal vs external)", "Viviparous vs oviparous animals"] },
    { id: "c8-science-07", number: 7, title: "Reaching the Age of Adolescence", keyTopics: ["Adolescence & puberty changes", "Hormones & endocrine glands", "Reproductive health & personal hygiene"] },
    { id: "c8-science-08", number: 8, title: "Force and Pressure", keyTopics: ["Contact vs non-contact forces", "Pressure formula (P = F/A)", "Atmospheric pressure & liquid pressure"] },
    { id: "c8-science-09", number: 9, title: "Friction", keyTopics: ["Factors affecting friction", "Static, sliding & rolling friction", "Friction as a necessary evil", "Reducing & increasing friction"] },
    { id: "c8-science-10", number: 10, title: "Sound", keyTopics: ["Sound produced by vibrating bodies", "Propagation of sound & vacuum", "Human ear mechanism", "Amplitude, time period & frequency"] },
    { id: "c8-science-11", number: 11, title: "Chemical Effects of Electric Current", keyTopics: ["Conduction in liquids & electrolytes", "Electroplating and its industrial applications"] },
    { id: "c8-science-12", number: 12, title: "Some Natural Phenomena", keyTopics: ["Charging by rubbing & electroscope", "Lightning & safety measures", "Earthquakes & seismic waves"] },
    { id: "c8-science-13", number: 13, title: "Light", keyTopics: ["Laws of reflection", "Regular vs diffused reflection", "Multiple images & kaleidoscope", "Human eye structure & care"] },
  ],
};

export const CLASS_8_SUBJECTS: Subject[] = [maths, science];
