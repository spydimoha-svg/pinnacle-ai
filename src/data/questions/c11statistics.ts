import type { Question } from "../../lib/types";

// CLASS 11 STATISTICS FOR ECONOMICS (Part A).
// Chapter ids copied verbatim from src/data/curriculum/class11.ts.

export const C11_STATISTICS_QUESTIONS: Question[] = [
  // ── 1. Introduction ──
  {
    id: "q-c11-statistics-01-1",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-01",
    classLevel: 11,
    text: "Distinguish between 'statistics' in its singular sense and 'statistics' in its plural sense.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "In the singular sense, statistics refers to the subject itself — the science dealing with the collection, organisation, presentation, analysis and interpretation of numerical data. In the plural sense, statistics refers to the numerical data themselves — the aggregates of facts, such as figures on population, production or prices, that are collected for a definite purpose.",
    keywords: [
      "singular sense = the subject/science of methods (collection, organisation, presentation, analysis, interpretation)",
      "plural sense = the numerical data/aggregates of facts themselves",
    ],
  },
  {
    id: "q-c11-statistics-01-2",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-01",
    classLevel: 11,
    text: "Which of the following is NOT a function of statistics in Economics?\n(A) It simplifies complex, unwieldy data into a few comparable figures\n(B) It presents economic facts in a definite, precise form\n(C) It determines a single named student's exact marks in an exam\n(D) It helps in formulating and testing economic hypotheses",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (C) It determines a single named student's exact marks in an exam.\n\nStatistics deals with aggregates of facts, not with isolated figures about a single individual — one student's marks in isolation is not a statistical fact. Simplifying complex data, presenting facts precisely, and testing hypotheses are all recognised functions of statistics.",
    keywords: [
      "statistics deals with aggregates of facts, not an isolated individual figure",
      "functions: simplifies data, presents facts precisely, helps test hypotheses, aids forecasting",
    ],
  },

  // ── 2. Collection of Data ──
  {
    id: "q-c11-statistics-02-1",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-02",
    classLevel: 11,
    text: "Distinguish between a census survey and a sample survey. Which method did Census of India 2011 use?",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "In a census survey, data is collected from every single unit of the population — no unit is left out. In a sample survey, data is collected only from a representative subset (sample) of the population, and the results are generalised to the whole population through statistical inference. A census gives more accurate and detailed results but is costly, time-consuming and impractical for large or dynamic populations; a sample survey is cheaper, faster and often sufficiently accurate if the sample is chosen properly.\n\nCensus of India 2011 used the census method — it enumerated every single household and individual in the country, not a sample.",
    keywords: [
      "census = every unit of the population covered",
      "sample survey = only a representative subset covered, generalised by inference",
      "census: more accurate but costly and time-consuming; sample: cheaper and faster",
      "Census of India 2011 was a complete census, not a sample survey",
    ],
  },
  {
    id: "q-c11-statistics-02-2",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-02",
    classLevel: 11,
    text: "The National Sample Survey Organisation (NSSO), now part of the National Statistical Office (NSO), primarily conducts which of the following?\n(A) A complete population census every ten years\n(B) Sample surveys on socio-economic aspects such as employment, consumer expenditure and health\n(C) Only the agricultural census\n(D) Statutory audits of company balance sheets",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (B) Sample surveys on socio-economic aspects such as employment, consumer expenditure and health.\n\nThe NSSO conducts nationwide sample surveys on a wide range of socio-economic subjects — it is a key secondary source of data for economists, distinct from the Census of India, which is a complete enumeration conducted every ten years by the Registrar General and Census Commissioner.",
    keywords: [
      "NSSO conducts sample surveys, not a complete census",
      "covers employment, consumer expenditure, health and other socio-economic subjects",
      "distinct from Census of India, which is a complete enumeration",
    ],
  },

  // ── 3. Organisation of Data ──
  {
    id: "q-c11-statistics-03-1",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-03",
    classLevel: 11,
    text: "Distinguish between a discrete variable and a continuous variable, giving one example of each.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "A discrete variable can take only certain fixed (whole-number) values within its range and cannot take fractional values in between — for example, the number of children in a family (0, 1, 2, 3, ...). A continuous variable can take any value, including fractional values, within a given range — for example, the height of students in a class (e.g. 152.3 cm, 152.31 cm), which can vary continuously.",
    keywords: [
      "discrete variable: takes only fixed/whole-number values, e.g. number of children in a family",
      "continuous variable: can take any value including fractions within a range, e.g. height or weight",
    ],
  },
  {
    id: "q-c11-statistics-03-2",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-03",
    classLevel: 11,
    text: "The marks (out of 50) scored by 20 students are:\n23, 45, 12, 34, 29, 8, 17, 38, 42, 26, 31, 15, 49, 22, 7, 33, 28, 19, 44, 36\n\nConstruct a frequency distribution table using exclusive class intervals of width 10, starting from 0-10.",
    marks: 4,
    type: "la",
    source: "important",
    answer:
      "Using exclusive class intervals of width 10:\n\n| Class interval | Tally | Frequency |\n|---|---|---|\n| 0-10 | 7, 8 | 2 |\n| 10-20 | 12, 15, 17, 19 | 4 |\n| 20-30 | 22, 23, 26, 28, 29 | 5 |\n| 30-40 | 31, 33, 34, 36, 38 | 5 |\n| 40-50 | 42, 44, 45, 49 | 4 |\n\nTotal frequency = 2 + 4 + 5 + 5 + 4 = 20, which matches the number of students, confirming every value has been placed in exactly one class.",
    keywords: [
      "exclusive method: upper limit of a class excluded from that class, included in the next",
      "correct tallying of all 20 values into the five classes",
      "frequencies 2, 4, 5, 5, 4 summing to 20",
    ],
    examinerTip:
      "Always total the frequency column and check it equals the number of observations given — a mismatched total is the most common way marks are lost on this question.",
  },

  // ── 4. Presentation of Data ──
  {
    id: "q-c11-statistics-04-1",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-04",
    classLevel: 11,
    text: "Distinguish between a histogram and a simple bar diagram.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "A histogram is used to represent a continuous frequency distribution — the class intervals are marked on the X-axis and the bars (rectangles) are drawn adjacent to each other with no gaps, because the area of each rectangle represents the frequency of that class. A simple bar diagram is used to represent discrete or categorical data — the bars are of equal width but are drawn with uniform gaps between them, and it is the height (not the area) of each bar that represents the value.",
    keywords: [
      "histogram: for continuous class-interval data, bars adjacent with no gaps, area represents frequency",
      "bar diagram: for discrete/categorical data, bars drawn with gaps, height represents value",
    ],
  },
  {
    id: "q-c11-statistics-04-2",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-04",
    classLevel: 11,
    text: "An ogive (cumulative frequency curve) is most commonly drawn to graphically locate which measure?\n(A) Arithmetic mean\n(B) Mode\n(C) Median\n(D) Range",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (C) Median.\n\nThe median can be located graphically by drawing the 'less than' and 'more than' ogives on the same graph — the value of the variable at their point of intersection gives the median. This is a standard graphical alternative to calculating the median using the formula.",
    keywords: [
      "ogive = cumulative frequency curve",
      "point of intersection of 'less than' and 'more than' ogives gives the median",
    ],
  },

  // ── 5. Measures of Central Tendency ──
  {
    id: "q-c11-statistics-05-1",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-05",
    classLevel: 11,
    text: "Calculate the arithmetic mean of the following distribution using the step-deviation method:\n\n| Class interval | 0-10 | 10-20 | 20-30 | 30-40 | 40-50 |\n|---|---|---|---|---|---|\n| Frequency | 5 | 8 | 15 | 16 | 6 |",
    marks: 5,
    type: "la",
    source: "important",
    answer:
      "Take assumed mean A = 25 (mid-point of 20-30) and h = 10.\n\n| CI | Mid-point (x) | f | d' = (x-A)/h | f×d' |\n|---|---|---|---|---|\n| 0-10 | 5 | 5 | -2 | -10 |\n| 10-20 | 15 | 8 | -1 | -8 |\n| 20-30 | 25 | 15 | 0 | 0 |\n| 30-40 | 35 | 16 | 1 | 16 |\n| 40-50 | 45 | 6 | 2 | 12 |\n\nN = Σf = 50, Σf·d' = -10-8+0+16+12 = 10\n\nMean = A + (Σf·d'/N) × h = 25 + (10/50) × 10 = 25 + 2 = 27\n\nThe arithmetic mean of the distribution is 27.",
    keywords: [
      "formula: Mean = A + (Σfd'/N) × h",
      "correct mid-points and step-deviations from assumed mean A = 25",
      "N = 50, Σfd' = 10, mean = 27",
    ],
    examinerTip:
      "State the assumed mean A and class width h explicitly before the table — the examiner checks the formula is written correctly, not just the final number.",
  },
  {
    id: "q-c11-statistics-05-2",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-05",
    classLevel: 11,
    text: "Calculate the median of the following distribution:\n\n| Class interval | 0-10 | 10-20 | 20-30 | 30-40 | 40-50 |\n|---|---|---|---|---|---|\n| Frequency | 5 | 10 | 10 | 10 | 5 |",
    marks: 5,
    type: "la",
    source: "important",
    answer:
      "Cumulative frequencies: 0-10 → 5; 10-20 → 15; 20-30 → 25; 30-40 → 35; 40-50 → 40.\n\nN = 40, so N/2 = 20. The median class is the one whose cumulative frequency first equals or exceeds 20, which is 20-30 (cumulative frequency 25).\n\nFor the median class: L (lower limit) = 20, cf (cumulative frequency of the class before it) = 15, f (frequency of median class) = 10, h (class width) = 10.\n\nMedian = L + [(N/2 - cf)/f] × h = 20 + [(20-15)/10] × 10 = 20 + 5 = 25\n\nThe median of the distribution is 25.",
    keywords: [
      "formula: Median = L + [(N/2 - cf)/f] × h",
      "median class identified correctly as 20-30 (first cf ≥ N/2)",
      "N = 40, N/2 = 20, cf before median class = 15, median = 25",
    ],
    examinerTip:
      "Identify the median class correctly first — the most common error is using the frequency of the wrong class in the formula.",
  },

  // ── 6. Correlation ──
  {
    id: "q-c11-statistics-06-1",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-06",
    classLevel: 11,
    text: "Calculate Karl Pearson's coefficient of correlation between X and Y from the data below, and interpret the result:\n\nX: 3, 5, 6, 8, 9\nY: 2, 4, 5, 6, 8",
    marks: 6,
    type: "la",
    source: "important",
    answer:
      "Mean of X = (3+5+6+8+9)/5 = 31/5 = 6.2\nMean of Y = (2+4+5+6+8)/5 = 25/5 = 5\n\n| X | Y | dx=(X-6.2) | dy=(Y-5) | dx·dy | dx² | dy² |\n|---|---|---|---|---|---|---|\n| 3 | 2 | -3.2 | -3 | 9.6 | 10.24 | 9 |\n| 5 | 4 | -1.2 | -1 | 1.2 | 1.44 | 1 |\n| 6 | 5 | -0.2 | 0 | 0 | 0.04 | 0 |\n| 8 | 6 | 1.8 | 1 | 1.8 | 3.24 | 1 |\n| 9 | 8 | 2.8 | 3 | 8.4 | 7.84 | 9 |\n\nΣdx·dy = 21, Σdx² = 22.8, Σdy² = 20\n\nr = Σ(dx·dy) / √(Σdx² × Σdy²) = 21 / √(22.8 × 20) = 21 / √456 ≈ 21 / 21.35 ≈ 0.98\n\nSince r is close to +1, X and Y are very strongly and positively correlated — as X increases, Y increases in almost the same proportion.",
    keywords: [
      "formula: r = Σ(dx·dy) / √(Σdx² × Σdy²), deviations taken from the actual means",
      "correct mean X = 6.2, mean Y = 5",
      "r ≈ 0.98",
      "interpretation: strong positive correlation between X and Y",
    ],
    examinerTip:
      "Show the deviation table with dx, dy, dx·dy, dx² and dy² columns explicitly — the marking scheme awards marks for each correct column, not just the final r.",
  },
  {
    id: "q-c11-statistics-06-2",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-06",
    classLevel: 11,
    text: "State the range within which the Karl Pearson correlation coefficient always lies, and explain what a value of -1, 0 and +1 each indicate.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "The correlation coefficient (r) always lies between -1 and +1, i.e. -1 ≤ r ≤ +1. A value of r = +1 indicates perfect positive correlation (both variables move in the same direction in exact proportion). A value of r = -1 indicates perfect negative correlation (the variables move in exactly opposite directions in exact proportion). A value of r = 0 indicates no linear correlation between the two variables.",
    keywords: [
      "r always lies between -1 and +1",
      "r = +1: perfect positive correlation",
      "r = -1: perfect negative correlation",
      "r = 0: no linear correlation",
    ],
  },

  // ── 7. Index Numbers ──
  {
    id: "q-c11-statistics-07-1",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-07",
    classLevel: 11,
    text: "Distinguish between the Wholesale Price Index (WPI) and the Consumer Price Index (CPI).",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "The Wholesale Price Index (WPI) measures the change in the general price level of goods traded in bulk (wholesale) at the first point of sale, typically between businesses, and does not include services. It is widely used to measure inflation at the wholesale/producer level. The Consumer Price Index (CPI) measures the change in the average retail prices of a fixed basket of goods and services actually consumed by a specific class of consumers (e.g. industrial workers, agricultural labourers or urban non-manual employees), and is used to measure the cost of living. CPI is the index used as the basis for revising dearness allowance (DA) of employees, since it reflects retail prices actually faced by consumers.",
    keywords: [
      "WPI: wholesale/bulk prices at the first point of sale, excludes services",
      "CPI: retail prices of a fixed basket of goods and services for a specific consumer class",
      "CPI is used as the basis for dearness allowance (DA) revision",
    ],
  },
  {
    id: "q-c11-statistics-07-2",
    subjectId: "c11-statistics",
    chapterId: "c11-statistics-07",
    classLevel: 11,
    text: "From the data below, construct a price index number for the current year using the simple aggregative method, taking the given year as the base:\n\n| Commodity | Base year price (₹) | Current year price (₹) |\n|---|---|---|\n| A | 10 | 12 |\n| B | 20 | 25 |\n| C | 30 | 33 |\n| D | 40 | 50 |",
    marks: 4,
    type: "la",
    source: "important",
    answer:
      "Simple aggregative method: Price Index = (ΣP1 / ΣP0) × 100\n\nΣP0 (base year prices) = 10 + 20 + 30 + 40 = 100\nΣP1 (current year prices) = 12 + 25 + 33 + 50 = 120\n\nPrice Index = (120 / 100) × 100 = 120\n\nThe price index number is 120, meaning prices have risen by 20% over the base year on average.",
    keywords: [
      "formula: Price Index = (ΣP1/ΣP0) × 100",
      "ΣP0 = 100, ΣP1 = 120",
      "index = 120, i.e. a 20% rise over the base year",
    ],
    examinerTip:
      "State the formula before substituting values, and express the final index number as a percentage rise/fall over the base year — a bare number without this interpretation loses the last mark.",
  },
];
