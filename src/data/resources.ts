import type { Resource } from "../lib/types";

// Official, freely available CBSE/NCERT resources with real, verified links.
//
// URL notes (verified July 2026):
// - NCERT per-book deep links (textbook.php?jemh1=0-14 style) now render a JS
//   picker page, so textbook entries link the official listing page and the
//   description tells the student which book to pick from the dropdowns.
// - CBSE sample papers: cbseacademic.nic.in/SQP_CLASSX_2025-26.html and
//   SQP_CLASSXII_2025-26.html both live and full of SQPs + marking schemes.
// - CBSE curriculum for session 2025-26: cbseacademic.nic.in/curriculum_2026.html.
// - CBSE PYQ archive: cbse.gov.in/cbsenew/question-paper.html (2022-2026 papers).
// - NCERT Exemplar: ncert.nic.in/exemplar-problems.php (class tabs, PDF + answers).

const NCERT_TEXTBOOKS = "https://ncert.nic.in/textbook.php";
const NCERT_EXEMPLAR = "https://ncert.nic.in/exemplar-problems.php";
const CBSE_SQP_X = "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html";
const CBSE_SQP_XII = "https://cbseacademic.nic.in/SQP_CLASSXII_2025-26.html";
const CBSE_CURRICULUM = "https://cbseacademic.nic.in/curriculum_2026.html";
const CBSE_PYQ = "https://www.cbse.gov.in/cbsenew/question-paper.html";
const DIKSHA = "https://diksha.gov.in/";
const CBSE_QBANK = "https://www.cbse.gov.in/cbsenew/question_bank.html";

export const RESOURCES: Resource[] = [
  // ---------------------------------------------------------------- NCERT (9)
  {
    id: "r-ncert-c9-maths",
    title: "NCERT Mathematics — Class IX (Textbook PDF)",
    kind: "ncert",
    classLevel: 9,
    subjectId: "c9-maths",
    url: NCERT_TEXTBOOKS,
    description:
      "The official NCERT textbook, chapter-wise PDFs. On the listing page pick Class IX → Mathematics (deep links change, so we link the official listing).",
  },
  {
    id: "r-ncert-c9-science",
    title: "NCERT Science — Class IX (Textbook PDF)",
    kind: "ncert",
    classLevel: 9,
    subjectId: "c9-science",
    url: NCERT_TEXTBOOKS,
    description:
      "Official NCERT Science textbook. Pick Class IX → Science on the listing page. In-text and back-exercise questions are where board questions come from.",
  },
  {
    id: "r-ncert-c9-sst",
    title: "NCERT Social Science — Class IX (all four books)",
    kind: "ncert",
    classLevel: 9,
    subjectId: "c9-sst",
    url: NCERT_TEXTBOOKS,
    description:
      "History (India and the Contemporary World I), Geography (Contemporary India I), Political Science (Democratic Politics I) and Economics — pick Class IX → Social Science on the listing page.",
  },
  {
    id: "r-ncert-c9-english",
    title: "NCERT English — Class IX (Beehive + Moments)",
    kind: "ncert",
    classLevel: 9,
    subjectId: "c9-english",
    url: NCERT_TEXTBOOKS,
    description:
      "Beehive (main reader) and Moments (supplementary reader) — pick Class IX → English on the listing page. Literature questions are set only from these two.",
  },

  // --------------------------------------------------------------- NCERT (10)
  {
    id: "r-ncert-c10-maths",
    title: "NCERT Mathematics — Class X (Textbook PDF)",
    kind: "ncert",
    classLevel: 10,
    subjectId: "c10-maths",
    url: NCERT_TEXTBOOKS,
    description:
      "The official NCERT textbook — every board question is rooted here. Pick Class X → Mathematics on the listing page (deep links change, so we link the official listing).",
  },
  {
    id: "r-ncert-c10-science",
    title: "NCERT Science — Class X (Textbook PDF)",
    kind: "ncert",
    classLevel: 10,
    subjectId: "c10-science",
    url: NCERT_TEXTBOOKS,
    description:
      "Official NCERT Science textbook. Pick Class X → Science. Diagrams and activity boxes routinely become 3-mark board questions.",
  },
  {
    id: "r-ncert-c10-sst",
    title: "NCERT Social Science — Class X (all four books)",
    kind: "ncert",
    classLevel: 10,
    subjectId: "c10-sst",
    url: NCERT_TEXTBOOKS,
    description:
      "History (India and the Contemporary World II), Geography (Contemporary India II), Political Science (Democratic Politics II) and Understanding Economic Development — pick Class X → Social Science.",
  },
  {
    id: "r-ncert-c10-english",
    title: "NCERT English — Class X (First Flight + Footprints Without Feet)",
    kind: "ncert",
    classLevel: 10,
    subjectId: "c10-english",
    url: NCERT_TEXTBOOKS,
    description:
      "First Flight (prose + poetry) and Footprints Without Feet (supplementary) — pick Class X → English. All literature questions in the board paper come from these.",
  },

  // --------------------------------------------------------------- NCERT (11)
  {
    id: "r-ncert-c11-physics",
    title: "NCERT Physics — Class XI (Part I & II)",
    kind: "ncert",
    classLevel: 11,
    subjectId: "c11-physics",
    url: NCERT_TEXTBOOKS,
    description:
      "Both parts of the official Physics textbook — pick Class XI → Physics on the listing page. Derivations asked in exams follow the NCERT sequence exactly.",
  },
  {
    id: "r-ncert-c11-chemistry",
    title: "NCERT Chemistry — Class XI (Part I & II)",
    kind: "ncert",
    classLevel: 11,
    subjectId: "c11-chemistry",
    url: NCERT_TEXTBOOKS,
    description:
      "Both parts of the official Chemistry textbook — pick Class XI → Chemistry. NCERT lines are quoted verbatim in board answers; read it before any guide.",
  },
  {
    id: "r-ncert-c11-biology",
    title: "NCERT Biology — Class XI (Textbook PDF)",
    kind: "ncert",
    classLevel: 11,
    subjectId: "c11-biology",
    url: NCERT_TEXTBOOKS,
    description:
      "The official Biology textbook — pick Class XI → Biology. For Biology (boards and NEET alike) the NCERT text IS the syllabus, line by line.",
  },
  {
    id: "r-ncert-c11-maths",
    title: "NCERT Mathematics — Class XI (Textbook PDF)",
    kind: "ncert",
    classLevel: 11,
    subjectId: "c11-maths",
    url: NCERT_TEXTBOOKS,
    description:
      "The official Mathematics textbook — pick Class XI → Mathematics. Miscellaneous exercises here are the difficulty bar for school exams.",
  },

  // --------------------------------------------------------------- NCERT (12)
  {
    id: "r-ncert-c12-physics",
    title: "NCERT Physics — Class XII (Part I & II)",
    kind: "ncert",
    classLevel: 12,
    subjectId: "c12-physics",
    url: NCERT_TEXTBOOKS,
    description:
      "Both parts of the official Physics textbook — pick Class XII → Physics on the listing page. Board derivations and diagrams are checked against NCERT notation.",
  },
  {
    id: "r-ncert-c12-chemistry",
    title: "NCERT Chemistry — Class XII (Part I & II)",
    kind: "ncert",
    classLevel: 12,
    subjectId: "c12-chemistry",
    url: NCERT_TEXTBOOKS,
    description:
      "Both parts of the official Chemistry textbook — pick Class XII → Chemistry. Name reactions and intext questions reappear in the board paper almost every year.",
  },
  {
    id: "r-ncert-c12-biology",
    title: "NCERT Biology — Class XII (Textbook PDF)",
    kind: "ncert",
    classLevel: 12,
    subjectId: "c12-biology",
    url: NCERT_TEXTBOOKS,
    description:
      "The official Biology textbook — pick Class XII → Biology. Diagrams (with exact NCERT labels) are worth easy marks in every board paper.",
  },
  {
    id: "r-ncert-c12-maths",
    title: "NCERT Mathematics — Class XII (Part I & II)",
    kind: "ncert",
    classLevel: 12,
    subjectId: "c12-maths",
    url: NCERT_TEXTBOOKS,
    description:
      "Both parts of the official Mathematics textbook — pick Class XII → Mathematics. Examples and miscellaneous exercises are the single richest source of board questions.",
  },

  // ------------------------------------------------------------ Exemplar (9-10)
  {
    id: "r-exemplar-c9-maths",
    title: "NCERT Exemplar Problems — Mathematics IX",
    kind: "exemplar",
    classLevel: 9,
    subjectId: "c9-maths",
    url: NCERT_EXEMPLAR,
    description:
      "Official higher-order problem book with answers — pick Class IX → Mathematics on the exemplar page. Great for the tricky 4-5 mark and assertion-reason questions.",
  },
  {
    id: "r-exemplar-c9-science",
    title: "NCERT Exemplar Problems — Science IX",
    kind: "exemplar",
    classLevel: 9,
    subjectId: "c9-science",
    url: NCERT_EXEMPLAR,
    description:
      "Official Science exemplar (MCQs + short/long answers) — pick Class IX → Science. Competency-based school questions are frequently lifted from here.",
  },
  {
    id: "r-exemplar-c10-maths",
    title: "NCERT Exemplar Problems — Mathematics X",
    kind: "exemplar",
    classLevel: 10,
    subjectId: "c10-maths",
    url: NCERT_EXEMPLAR,
    description:
      "Official higher-order problem book with answers — pick Class X → Mathematics. The Standard Maths paper's toughest questions look exactly like these.",
  },
  {
    id: "r-exemplar-c10-science",
    title: "NCERT Exemplar Problems — Science X",
    kind: "exemplar",
    classLevel: 10,
    subjectId: "c10-science",
    url: NCERT_EXEMPLAR,
    description:
      "Official Science exemplar — pick Class X → Science. The board's assertion-reason and case-based MCQs are modelled on this book.",
  },

  // ----------------------------------------------------------- Exemplar (11-12)
  {
    id: "r-exemplar-c11-physics",
    title: "NCERT Exemplar Problems — Physics XI",
    kind: "exemplar",
    classLevel: 11,
    subjectId: "c11-physics",
    url: NCERT_EXEMPLAR,
    description:
      "Official Physics exemplar with answers — pick Class XI → Physics. Bridges the gap between NCERT exercises and JEE-Main-level thinking.",
  },
  {
    id: "r-exemplar-c11-chemistry",
    title: "NCERT Exemplar Problems — Chemistry XI",
    kind: "exemplar",
    classLevel: 11,
    subjectId: "c11-chemistry",
    url: NCERT_EXEMPLAR,
    description:
      "Official Chemistry exemplar — pick Class XI → Chemistry. Strong on conceptual MCQs for equilibrium, thermodynamics and bonding.",
  },
  {
    id: "r-exemplar-c11-biology",
    title: "NCERT Exemplar Problems — Biology XI",
    kind: "exemplar",
    classLevel: 11,
    subjectId: "c11-biology",
    url: NCERT_EXEMPLAR,
    description:
      "Official Biology exemplar — pick Class XI → Biology. The MCQ sets are excellent early NEET practice grounded in NCERT lines.",
  },
  {
    id: "r-exemplar-c11-maths",
    title: "NCERT Exemplar Problems — Mathematics XI",
    kind: "exemplar",
    classLevel: 11,
    subjectId: "c11-maths",
    url: NCERT_EXEMPLAR,
    description:
      "Official Mathematics exemplar — pick Class XI → Mathematics. Harder-than-textbook problems for functions, trigonometry and P&C.",
  },
  {
    id: "r-exemplar-c12-physics",
    title: "NCERT Exemplar Problems — Physics XII",
    kind: "exemplar",
    classLevel: 12,
    subjectId: "c12-physics",
    url: NCERT_EXEMPLAR,
    description:
      "Official Physics exemplar — pick Class XII → Physics. Board case-study and MCQ sections borrow heavily from these problems.",
  },
  {
    id: "r-exemplar-c12-chemistry",
    title: "NCERT Exemplar Problems — Chemistry XII",
    kind: "exemplar",
    classLevel: 12,
    subjectId: "c12-chemistry",
    url: NCERT_EXEMPLAR,
    description:
      "Official Chemistry exemplar — pick Class XII → Chemistry. Assertion-reason and matching questions here mirror the current board pattern.",
  },
  {
    id: "r-exemplar-c12-biology",
    title: "NCERT Exemplar Problems — Biology XII",
    kind: "exemplar",
    classLevel: 12,
    subjectId: "c12-biology",
    url: NCERT_EXEMPLAR,
    description:
      "Official Biology exemplar — pick Class XII → Biology. Doubles as high-quality NEET MCQ practice straight from NCERT.",
  },
  {
    id: "r-exemplar-c12-maths",
    title: "NCERT Exemplar Problems — Mathematics XII",
    kind: "exemplar",
    classLevel: 12,
    subjectId: "c12-maths",
    url: NCERT_EXEMPLAR,
    description:
      "Official Mathematics exemplar — pick Class XII → Mathematics. Toughens you up for the 5-mark calculus and vector questions.",
  },

  // ------------------------------------------------------------- Sample papers
  {
    id: "r-sqp-c10",
    title: "CBSE Sample Question Papers 2025-26 — Class X",
    kind: "sample-paper",
    classLevel: 10,
    url: CBSE_SQP_X,
    description:
      "Official SQPs with marking schemes for every subject — the single best predictor of your actual paper. Solve them timed, then mark yourself with the scheme.",
  },
  {
    id: "r-sqp-c12",
    title: "CBSE Sample Question Papers 2025-26 — Class XII",
    kind: "sample-paper",
    classLevel: 12,
    url: CBSE_SQP_XII,
    description:
      "Official SQPs + marking schemes for all Class XII subjects. The marking scheme shows the exact value points examiners award — study it as hard as the paper.",
  },
  {
    id: "r-sqp-c9",
    title: "CBSE Sample Paper Design for Class IX (via Class X SQPs)",
    kind: "sample-paper",
    classLevel: 9,
    url: CBSE_SQP_X,
    description:
      "CBSE publishes SQPs only for board classes, and Class IX school exams follow the Class X paper design. Use the official Class X SQPs to learn the format and question styles.",
  },
  {
    id: "r-sqp-c11",
    title: "CBSE Sample Paper Design for Class XI (via Class XII SQPs)",
    kind: "sample-paper",
    classLevel: 11,
    url: CBSE_SQP_XII,
    description:
      "CBSE issues SQPs only for Classes X and XII; Class XI exams mirror the Class XII blueprint. Use the official Class XII SQPs to see section weighting and question types.",
  },

  // ---------------------------------------------------------------------- PYQs
  {
    id: "r-pyq-c10",
    title: "CBSE Previous Year Question Papers — Class X",
    kind: "pyq",
    classLevel: 10,
    url: CBSE_PYQ,
    description:
      "The official CBSE archive of actual board papers (2022-2026, all sets, including compartment). Nothing beats solving real papers under a timer.",
  },
  {
    id: "r-pyq-c12",
    title: "CBSE Previous Year Question Papers — Class XII",
    kind: "pyq",
    classLevel: 12,
    url: CBSE_PYQ,
    description:
      "Official archive of real Class XII board papers, year-wise and set-wise. Do the last 3 years for every subject before the boards — patterns repeat.",
  },

  // ------------------------------------------------------------------ Syllabus
  {
    id: "r-syllabus-c9",
    title: "CBSE Curriculum 2025-26 — Secondary (Class IX)",
    kind: "syllabus",
    classLevel: 9,
    url: CBSE_CURRICULUM,
    description:
      "The official syllabus PDFs under 'Secondary Curriculum (IX-X)' — chapter list, deleted topics, internal assessment split and unit-wise marks.",
  },
  {
    id: "r-syllabus-c10",
    title: "CBSE Curriculum 2025-26 — Secondary (Class X)",
    kind: "syllabus",
    classLevel: 10,
    url: CBSE_CURRICULUM,
    description:
      "The official Class X syllabus under 'Secondary Curriculum (IX-X)'. Check it before studying anything — guides often include deleted topics.",
  },
  {
    id: "r-syllabus-c11",
    title: "CBSE Curriculum 2025-26 — Senior Secondary (Class XI)",
    kind: "syllabus",
    classLevel: 11,
    url: CBSE_CURRICULUM,
    description:
      "Official syllabus PDFs under 'Senior Secondary Curriculum (XI-XII)' — unit weightage, practicals split and prescribed books for every subject.",
  },
  {
    id: "r-syllabus-c12",
    title: "CBSE Curriculum 2025-26 — Senior Secondary (Class XII)",
    kind: "syllabus",
    classLevel: 12,
    url: CBSE_CURRICULUM,
    description:
      "The official Class XII syllabus under 'Senior Secondary Curriculum (XI-XII)'. Unit-wise marks here decide where your revision hours should go.",
  },

  // --------------------------------------------------------------------- Notes
  {
    id: "r-notes-diksha-c9",
    title: "DIKSHA — Energised NCERT Textbooks & Lessons (Class IX)",
    kind: "notes",
    classLevel: 9,
    url: DIKSHA,
    description:
      "Government learning platform (Ministry of Education) with NCERT/CBSE-aligned explainer videos, practice and QR-coded textbook content. Free, in 22 languages.",
  },
  {
    id: "r-notes-diksha-c11",
    title: "DIKSHA — Energised NCERT Textbooks & Lessons (Class XI)",
    kind: "notes",
    classLevel: 11,
    url: DIKSHA,
    description:
      "Free official platform with chapter-wise videos, virtual labs and practice aligned to NCERT for Class XI. Useful for concept-first revision without ads or paywalls.",
  },
  {
    id: "r-notes-qbank-c10",
    title: "CBSE Question Bank (Competency-Based) — Class X",
    kind: "notes",
    classLevel: 10,
    url: CBSE_QBANK,
    description:
      "CBSE's own subject-wise question banks for case-based and competency questions — the newest question style in the boards, straight from the source.",
  },
  {
    id: "r-notes-qbank-c12",
    title: "CBSE Question Bank (Competency-Based) — Class XII",
    kind: "notes",
    classLevel: 12,
    url: CBSE_QBANK,
    description:
      "Official CBSE competency-based question banks for Class XII. Practice these to stop losing marks on the application-style questions that now dominate papers.",
  },
];
