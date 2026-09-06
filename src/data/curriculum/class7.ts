import type { Subject } from "../../lib/types";

// Class VII curriculum — CBSE / NCERT rationalised syllabus
const maths: Subject = {
  id: "c7-maths",
  name: "Mathematics",
  classLevel: 7,
  icon: "Sigma",
  color: "gold",
  chapters: [
    { id: "c7-maths-01", number: 1, title: "Integers", keyTopics: ["Properties of addition & subtraction of integers", "Multiplication & division of integers"] },
    { id: "c7-maths-02", number: 2, title: "Fractions and Decimals", keyTopics: ["Multiplication & division of fractions", "Multiplication & division of decimals"] },
    { id: "c7-maths-03", number: 3, title: "Data Handling", keyTopics: ["Arithmetic mean, mode and median", "Double bar graphs", "Chance and probability"] },
    { id: "c7-maths-04", number: 4, title: "Simple Equations", keyTopics: ["Setting up an equation", "Solving an equation", "Applications to practical situations"] },
    { id: "c7-maths-05", number: 5, title: "Lines and Angles", keyTopics: ["Complementary & supplementary angles", "Adjacent & vertically opposite angles", "Pairs of lines & transversal"] },
    { id: "c7-maths-06", number: 6, title: "The Triangle and its Properties", keyTopics: ["Medians and altitudes of a triangle", "Exterior angle property", "Angle sum property", "Pythagoras property"] },
    { id: "c7-maths-07", number: 7, title: "Comparing Quantities", keyTopics: ["Equivalent ratios and percentage", "Profit and loss", "Simple interest"] },
    { id: "c7-maths-08", number: 8, title: "Rational Numbers", keyTopics: ["Positive & negative rational numbers", "Representation on number line", "Operations on rational numbers"] },
    { id: "c7-maths-09", number: 9, title: "Perimeter and Area", keyTopics: ["Area of parallelogram and triangle", "Circumference and area of circle"] },
    { id: "c7-maths-10", number: 10, title: "Algebraic Expressions", keyTopics: ["Terms, factors and coefficients", "Addition & subtraction of expressions", "Finding the value of an expression"] },
    { id: "c7-maths-11", number: 11, title: "Exponents and Powers", keyTopics: ["Laws of exponents", "Decimal number system and standard form"] },
    { id: "c7-maths-12", number: 12, title: "Symmetry", keyTopics: ["Lines of symmetry for regular polygons", "Rotational symmetry"] },
  ],
};

const science: Subject = {
  id: "c7-science",
  name: "Science",
  classLevel: 7,
  icon: "FlaskConical",
  color: "mint",
  chapters: [
    { id: "c7-science-01", number: 1, title: "Nutrition in Plants", keyTopics: ["Autotrophic & heterotrophic nutrition", "Photosynthesis process", "Parasites, saprotrophs and symbiosis"] },
    { id: "c7-science-02", number: 2, title: "Nutrition in Animals", keyTopics: ["Human digestive system", "Digestion in grass-eating animals", "Feeding and digestion in Amoeba"] },
    { id: "c7-science-03", number: 3, title: "Heat", keyTopics: ["Hot and cold objects", "Clinical & laboratory thermometers", "Conduction, convection and radiation"] },
    { id: "c7-science-04", number: 4, title: "Acids, Bases and Salts", keyTopics: ["Natural indicators (litmus, turmeric, china rose)", "Neutralisation in everyday life"] },
    { id: "c7-science-05", number: 5, title: "Physical and Chemical Changes", keyTopics: ["Differences between physical and chemical changes", "Rusting of iron & crystallisation"] },
    { id: "c7-science-06", number: 6, title: "Respiration in Organisms", keyTopics: ["Aerobic & anaerobic respiration", "Breathing mechanism in humans, insects, earthworms, and fish"] },
    { id: "c7-science-07", number: 7, title: "Transportation in Animals and Plants", keyTopics: ["Human circulatory system (blood, blood vessels, heart)", "Excretion in animals", "Transport of water & food in plants"] },
    { id: "c7-science-08", number: 8, title: "Reproduction in Plants", keyTopics: ["Asexual reproduction (budding, fragmentation, spore formation)", "Sexual reproduction (pollination & fertilisation)"] },
    { id: "c7-science-09", number: 9, title: "Motion and Time", keyTopics: ["Slow or fast motion", "Speed formula", "Measurement of time & simple pendulum", "Distance-time graph"] },
    { id: "c7-science-10", number: 10, title: "Electric Current and Its Effects", keyTopics: ["Symbols of electric components", "Heating effect of electric current & fuse", "Electromagnet"] },
    { id: "c7-science-11", number: 11, title: "Light", keyTopics: ["Light travels along straight lines", "Reflection & plane mirrors", "Concave & convex mirrors / lenses", "Newton's disc"] },
    { id: "c7-science-12", number: 12, title: "Forests: Our Lifeline", keyTopics: ["Forest structure & canopy", "Interdependence of plants and animals", "Decomposers"] },
    { id: "c7-science-13", number: 13, title: "Wastewater Story", keyTopics: ["Sewage treatment plant (STP)", "Sanitation and disease", "Alternative arrangements for sewage disposal"] },
  ],
};

export const CLASS_7_SUBJECTS: Subject[] = [maths, science];
