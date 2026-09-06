import type { Subject } from "../../lib/types";

// Class VI curriculum — CBSE / NCERT rationalised syllabus
const maths: Subject = {
  id: "c6-maths",
  name: "Mathematics",
  classLevel: 6,
  icon: "Sigma",
  color: "gold",
  chapters: [
    { id: "c6-maths-01", number: 1, title: "Knowing Our Numbers", keyTopics: ["Large numbers", "Place value & estimation", "Use of brackets", "Roman numerals"] },
    { id: "c6-maths-02", number: 2, title: "Whole Numbers", keyTopics: ["Predecessor and successor", "Number line representation", "Properties of whole numbers"] },
    { id: "c6-maths-03", number: 3, title: "Playing with Numbers", keyTopics: ["Factors and multiples", "Prime and composite numbers", "Tests of divisibility", "HCF and LCM"] },
    { id: "c6-maths-04", number: 4, title: "Basic Geometrical Ideas", keyTopics: ["Points, lines and rays", "Curves and polygons", "Angles, triangles and quadrilaterals", "Circles"] },
    { id: "c6-maths-05", number: 5, title: "Understanding Elementary Shapes", keyTopics: ["Measuring line segments", "Right, straight and complete angles", "Classification of triangles", "3D shapes"] },
    { id: "c6-maths-06", number: 6, title: "Integers", keyTopics: ["Positive and negative numbers", "Representation on number line", "Addition and subtraction of integers"] },
    { id: "c6-maths-07", number: 7, title: "Fractions", keyTopics: ["Proper, improper and mixed fractions", "Equivalent fractions", "Simplest form", "Comparing fractions"] },
    { id: "c6-maths-08", number: 8, title: "Decimals", keyTopics: ["Tenths, hundredths and thousandths", "Comparing decimals", "Using decimals in money, length and weight"] },
    { id: "c6-maths-09", number: 9, title: "Data Handling", keyTopics: ["Recording and organizing data", "Pictographs", "Bar graphs"] },
    { id: "c6-maths-10", number: 10, title: "Mensuration", keyTopics: ["Perimeter of regular polygons", "Area of rectangle and square"] },
    { id: "c6-maths-11", number: 11, title: "Algebra", keyTopics: ["Introduction to variables", "Matchstick patterns", "Algebraic expressions and equations"] },
    { id: "c6-maths-12", number: 12, title: "Ratio and Proportion", keyTopics: ["Concept of ratio", "Unitary method", "Proportion"] },
  ],
};

const science: Subject = {
  id: "c6-science",
  name: "Science",
  classLevel: 6,
  icon: "FlaskConical",
  color: "mint",
  chapters: [
    { id: "c6-science-01", number: 1, title: "Components of Food", keyTopics: ["Nutrients in food", "Balanced diet", "Deficiency diseases"] },
    { id: "c6-science-02", number: 2, title: "Sorting Materials into Groups", keyTopics: ["Properties of materials", "Solubility, transparency and density"] },
    { id: "c6-science-03", number: 3, title: "Separation of Substances", keyTopics: ["Handpicking, winnowing and sieving", "Sedimentation, decantation and filtration", "Evaporation"] },
    { id: "c6-science-04", number: 4, title: "Getting to Know Plants", keyTopics: ["Herbs, shrubs and trees", "Stem, root and leaf anatomy", "Flower structure"] },
    { id: "c6-science-05", number: 5, title: "Body Movements", keyTopics: ["Human skeleton and joints", "Gait of animals (earthworm, snail, cockroach, birds, fish, snakes)"] },
    { id: "c6-science-06", number: 6, title: "The Living Organisms — Characteristics & Habitats", keyTopics: ["Organisms and their surroundings", "Adaptations in terrestrial and aquatic habitats"] },
    { id: "c6-science-07", number: 7, title: "Motion and Measurement of Distances", keyTopics: ["Standard units of measurement", "Types of motion (rectilinear, circular, periodic)"] },
    { id: "c6-science-08", number: 8, title: "Light, Shadows and Reflections", keyTopics: ["Opaque, transparent and translucent objects", "Formation of shadows", "Pinhole camera and mirrors"] },
    { id: "c6-science-09", number: 9, title: "Electricity and Circuits", keyTopics: ["Electric cell and bulb", "Electric circuit and switch", "Conductors and insulators"] },
    { id: "c6-science-10", number: 10, title: "Fun with Magnets", keyTopics: ["Discovery of magnets", "Magnetic and non-magnetic materials", "Poles of a magnet and compass"] },
  ],
};

export const CLASS_6_SUBJECTS: Subject[] = [maths, science];
