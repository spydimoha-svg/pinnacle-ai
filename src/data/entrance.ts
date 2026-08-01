import type { EntranceExam } from "../lib/types";

// Entrance-exam tracks for "Learn Better" mode.
// Patterns verified against 2025-26 official NTA / College Board structures.
export const ENTRANCE_EXAMS: EntranceExam[] = [
  {
    id: "jee",
    name: "JEE",
    fullName: "Joint Entrance Examination (Main + Advanced)",
    audience:
      "Class 11-12 PCM students aiming for engineering seats at IITs, NITs, IIITs and GFTIs.",
    pattern:
      "JEE Main Paper 1 (B.E./B.Tech): computer-based, 3 hours, 75 compulsory questions for 300 marks — each of Physics, Chemistry and Mathematics has 20 MCQs (Section A) plus 5 numerical-value questions (Section B, all compulsory since 2025). Marking is +4/−1 for both MCQs and numericals; numerical answers are rounded to the nearest integer. Two Main sessions (January and April); best NTA score counts. Top ~2.5 lakh qualify for JEE Advanced: two compulsory 3-hour papers with multi-format questions (single/multiple correct MCQs, numericals, matching) and partial/negative marking that changes each year.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    approach:
      "Boards reward stating the standard method neatly; JEE rewards choosing the right method under time pressure across mixed-concept problems. Treat NCERT as the floor, then build depth with derivation-level understanding and thousands of timed multi-step problems. Because every question carries negative marking, accuracy and question selection matter as much as coverage — practice full mock papers, not just chapter exercises.",
    highYield: [
      "Calculus (limits, differentiation, definite integration and applications)",
      "Coordinate geometry (straight lines, circles, conic sections)",
      "Mechanics (laws of motion, work-energy, rotation)",
      "Electrostatics and current electricity",
      "Modern physics (photoelectric effect, atoms, nuclei)",
      "Organic chemistry reaction mechanisms (GOC, hydrocarbons, name reactions)",
      "Chemical and ionic equilibrium plus thermodynamics",
    ],
    officialUrl: "https://jeemain.nta.nic.in",
  },
  {
    id: "neet",
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test (UG)",
    audience:
      "Class 11-12 PCB students aiming for MBBS, BDS, AYUSH, veterinary and nursing seats across India.",
    pattern:
      "Single pen-and-paper (OMR) exam, 3 hours, 180 compulsory MCQs for 720 marks: Physics 45, Chemistry 45, Biology 90 (45 Botany + 45 Zoology). Marking is +4 for a correct answer, −1 for a wrong one, 0 for unattempted. The optional-question format used during COVID years is gone — since 2025 all 180 questions are compulsory. Offered in 13 languages; one attempt per year.",
    subjects: ["Physics", "Chemistry", "Biology (Botany + Zoology)"],
    approach:
      "NEET is the most NCERT-faithful of the big entrances — a large share of Biology and inorganic Chemistry questions lift lines, diagrams and tables straight from the textbook, so master NCERT line-by-line rather than chasing extra reference books. Where boards test explanation in long answers, NEET tests recall precision and speed: 180 questions in 180 minutes leaves about a minute per question. Physics needs board-plus problem drilling, but Biology revision cycles and MCQ accuracy decide the rank.",
    highYield: [
      "Human physiology (digestion, breathing, circulation, neural and chemical control)",
      "Genetics and evolution (inheritance, molecular basis of inheritance)",
      "Ecology and environment",
      "Plant physiology and reproduction in organisms",
      "Organic chemistry (GOC, hydrocarbons, biomolecules)",
      "Chemical bonding and coordination compounds",
      "Modern physics and semiconductors",
    ],
    officialUrl: "https://neet.nta.nic.in",
  },
  {
    id: "cuet",
    name: "CUET",
    fullName: "Common University Entrance Test (UG)",
    audience:
      "Class 12 students of any stream seeking UG admission to central universities (DU, BHU, JNU, AMU, Jamia) and many state/private universities.",
    pattern:
      "Computer-based test in shifts. Every paper is uniform: 50 compulsory MCQs in 60 minutes for 250 marks, with +5 for a correct answer and −1 for a wrong one. Candidates choose up to 5 subjects from three sections — 13 language papers (Section I), 23 domain subjects based on the Class 12 syllabus (Section II), and a General Aptitude Test (Section III) covering general knowledge, reasoning and numerical ability. Universities decide which subject combinations they count.",
    subjects: [
      "Languages (13 options, e.g. English, Hindi)",
      "Domain subjects (23 options mapped to Class 12 syllabus)",
      "General Aptitude Test",
    ],
    approach:
      "CUET tests the same Class 12 NCERT syllabus as boards, but as fast objective MCQs instead of written answers — so the content overlaps almost fully while the skill does not. Shift from writing practiced answers to eliminating options quickly: facts, definitions, data interpretation and assertion-reason questions dominate. Pick your 5 subjects around the programmes you want, and add separate practice for the General Aptitude Test since boards never cover it.",
    highYield: [
      "NCERT Class 12 domain-subject mastery (questions rarely leave the syllabus)",
      "Language section: reading comprehension and vocabulary in context",
      "Assertion-reason and match-the-column question formats",
      "General Test: percentage, ratio, profit-loss arithmetic",
      "Logical reasoning (series, syllogisms, arrangements)",
      "Current affairs and static general knowledge",
    ],
    officialUrl: "https://cuet.nta.nic.in",
  },
  {
    id: "sat",
    name: "SAT",
    fullName: "SAT (Digital) — College Board",
    audience:
      "Students targeting undergraduate admission to US universities and other institutions worldwide (plus some Indian private universities) that accept SAT scores.",
    pattern:
      "Fully digital, taken on the Bluebook app: 2 hours 14 minutes, 98 questions, scored 400-1600 with no negative marking. Two section-adaptive sections — Reading & Writing (two 27-question, 32-minute modules) and Math (two 22-question, 35-minute modules); your first-module performance decides whether the second module is harder (higher score ceiling) or easier. Reading & Writing uses short single-passage questions; Math is ~75% MCQ and ~25% student-produced responses, with the built-in Desmos calculator allowed throughout. Offered on multiple international test dates each year; retakes allowed.",
    subjects: ["Reading & Writing (Evidence-based English)", "Mathematics"],
    approach:
      "Unlike CBSE's syllabus-recall exams, the SAT tests reasoning skills — reading evidence, editing sentences and applying algebra — so cramming content matters far less than pattern fluency and timing. CBSE students are usually strong on SAT Math (it stops around Class 10 level: algebra, data analysis, basic trig) but need deliberate work on evidence-based reading, US-style grammar conventions and the adaptive pacing. Prep with official College Board/Khan Academy practice and full digital mocks in Bluebook; since there is no negative marking, never leave a question blank.",
    highYield: [
      "Linear equations, systems and inequalities (Heart of Algebra)",
      "Problem-solving and data analysis (ratios, percentages, statistics)",
      "Advanced math (quadratics, exponentials, nonlinear functions)",
      "Craft and structure: vocabulary in context and text purpose",
      "Command of evidence (textual and quantitative)",
      "Standard English conventions (punctuation, verb agreement, modifiers)",
      "Transitions and rhetorical synthesis",
    ],
    officialUrl: "https://satsuite.collegeboard.org",
  },
];
