import type { Question } from "../../lib/types";

// CLASS 11 ECONOMICS — Indian Economic Development (Part B).
// Chapter ids copied verbatim from src/data/curriculum/class11.ts.

export const C11_ECONOMICS_QUESTIONS: Question[] = [
  // ── 1. Indian Economy on the Eve of Independence ──
  {
    id: "q-c11-economics-01-1",
    subjectId: "c11-economics",
    chapterId: "c11-economics-01",
    classLevel: 11,
    text: "Explain how British colonial rule caused the deindustrialisation of India's handicraft industry.",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "British policy had two aims: reduce India to a supplier of raw materials and a market for British manufactured goods. This was achieved by (i) discriminatory tariff policy — heavy export duty on Indian handicraft goods leaving for Britain, while British manufactured goods entered India duty-free or at very low duty, making Indian goods uncompetitive; (ii) the decline of Indian princely courts, which had been the traditional patrons of fine handicrafts; and (iii) the arrival of cheap machine-made textiles from British mills after the Industrial Revolution. This combination destroyed the export market and shrank the domestic market for Indian handicrafts, forcing artisans out of their traditional occupation without a corresponding rise in industrial employment to absorb them.",
    keywords: [
      "discriminatory tariff — export duty on Indian goods, free entry for British goods",
      "loss of royal patronage for handicrafts",
      "competition from cheap machine-made British textiles",
      "no corresponding industrial growth to absorb displaced artisans",
    ],
    examinerTip:
      "Name all three causes (tariff policy, loss of patronage, foreign competition) — a one-cause answer is marked incomplete even if that cause is correct.",
  },
  {
    id: "q-c11-economics-01-2",
    subjectId: "c11-economics",
    chapterId: "c11-economics-01",
    classLevel: 11,
    text: "At the time of independence, roughly what share of India's workforce was dependent on agriculture?\n(A) About 30%\n(B) About 50%\n(C) About 70-75%\n(D) About 90%",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (C) About 70-75%.\n\nAt independence, agriculture was the largest employer, engaging roughly 70-75% of the workforce, while its contribution to national income was much lower — reflecting very low productivity per worker in the sector.",
    keywords: [
      "agriculture employed ≈70-75% of the workforce in 1947",
      "occupational structure did not change significantly under colonial rule",
      "low agricultural productivity despite high dependence",
    ],
  },

  // ── 2. Indian Economy 1950-1990 ──
  {
    id: "q-c11-economics-02-1",
    subjectId: "c11-economics",
    chapterId: "c11-economics-02",
    classLevel: 11,
    text: "What was the Green Revolution? Explain one benefit and one limitation of the strategy adopted.",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "The Green Revolution refers to the large jump in foodgrain production, mainly wheat, achieved from the mid-1960s through the use of High Yielding Variety (HYV) seeds, along with chemical fertilisers and assured irrigation.\n\nBenefit: India moved from a state of dependence on foodgrain imports (like under PL-480) towards self-sufficiency in foodgrains, and the country built up buffer stocks that provided a cushion against famine.\n\nLimitation: The benefits were concentrated in states with assured irrigation, such as Punjab, Haryana and western Uttar Pradesh, and among farmers large enough to afford the HYV seed-fertiliser-irrigation package. Small farmers and rain-fed regions were left behind, widening regional and inter-farmer inequality.",
    keywords: [
      "HYV seeds + fertiliser + assured irrigation, from mid-1960s",
      "benefit: self-sufficiency in foodgrains, buffer stocks",
      "limitation: gains concentrated in irrigated states (Punjab, Haryana, western UP) and larger farmers",
      "regional and inter-farmer inequality widened",
    ],
  },
  {
    id: "q-c11-economics-02-2",
    subjectId: "c11-economics",
    chapterId: "c11-economics-02",
    classLevel: 11,
    text: "Why was India's industrial licensing system (the 'licence-permit raj') criticised before 1991?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Under the Industrial Policy Resolution of 1956, most industries required a government licence to be set up, expanded, or to change what they produced. This was criticised because: (i) it discouraged efficient firms from expanding output since a licence had to be secured first; (ii) it created scope for corruption and delay, as bureaucratic approval was needed at every stage; and (iii) it protected inefficient producers from competition, since new firms could not easily enter to challenge them, so there was little incentive to improve quality or reduce cost.",
    keywords: [
      "licence required to start, expand or diversify production",
      "discouraged efficient firms from expanding",
      "encouraged corruption and delay",
      "sheltered inefficient producers from competition",
    ],
  },

  // ── 3. Liberalisation, Privatisation and Globalisation ──
  {
    id: "q-c11-economics-03-1",
    subjectId: "c11-economics",
    chapterId: "c11-economics-03",
    classLevel: 11,
    text: "What immediate economic crisis in 1991 forced India to adopt the New Economic Policy? Briefly describe the three components of the reform.",
    marks: 5,
    type: "la",
    source: "important",
    answer:
      "By 1991, India faced a severe balance of payments crisis: foreign exchange reserves fell to a level barely sufficient to cover about two weeks of essential imports, the fiscal deficit was very high, and inflation had risen sharply. India had to airlift its gold reserves as collateral to raise emergency loans, and in return for a loan from the IMF and World Bank, agreed to a structural adjustment programme. This led to the New Economic Policy of 1991, built on three components:\n\n1. Liberalisation — removing government controls, such as abolishing industrial licensing for most industries and reducing restrictions on private investment.\n2. Privatisation — reducing the role of public sector enterprises through disinvestment (sale of government equity in PSUs) and giving greater role to the private sector.\n3. Globalisation — integrating the Indian economy with the world economy, by reducing import tariffs, removing quantitative restrictions on trade, and encouraging foreign direct and portfolio investment.",
    keywords: [
      "1991 balance of payments crisis, low forex reserves, gold pledged",
      "IMF/World Bank loan tied to structural adjustment",
      "liberalisation: abolition of industrial licensing",
      "privatisation: disinvestment of PSUs",
      "globalisation: lower tariffs, encouragement of FDI",
    ],
    examinerTip:
      "Name all three components separately with one concrete measure under each — a merged or vague answer that does not distinguish liberalisation from privatisation loses marks.",
  },
  {
    id: "q-c11-economics-03-2",
    subjectId: "c11-economics",
    chapterId: "c11-economics-03",
    classLevel: 11,
    text: "'Disinvestment' as used in the 1991 reforms refers to:\n(A) The government investing more capital in loss-making PSUs\n(B) The sale of a part of government equity in public sector enterprises\n(C) A ban on private investment in core industries\n(D) Foreign companies withdrawing investment from India",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (B) The sale of a part of government equity in public sector enterprises.\n\nDisinvestment was undertaken to improve the financial discipline and performance of PSUs, and to raise resources for the government, by selling part of its equity holding in these enterprises.",
    keywords: [
      "disinvestment = sale of government equity in PSUs",
      "aim: improve financial discipline, raise resources",
    ],
  },

  // ── 4. Human Capital Formation in India ──
  {
    id: "q-c11-economics-04-1",
    subjectId: "c11-economics",
    chapterId: "c11-economics-04",
    classLevel: 11,
    text: "Distinguish between human capital and human development.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Human capital treats education and health as a means to raise labour productivity — an investment that increases the future income-earning capacity of a person, similar to physical capital. Human development, by contrast, treats education and health as inherently valuable ends in themselves, contributing directly to a person's well-being and freedom, regardless of any resulting increase in productivity or income.",
    keywords: [
      "human capital: education/health as investment, means to raise productivity",
      "human development: education/health as an end in itself, part of well-being",
      "human capital views people as means to growth; human development views people as the goal",
    ],
  },
  {
    id: "q-c11-economics-04-2",
    subjectId: "c11-economics",
    chapterId: "c11-economics-04",
    classLevel: 11,
    text: "State any three sources of human capital formation in India.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Three sources of human capital formation are: (i) Investment in education — spending by government and households on schools, colleges and vocational training, which raises knowledge and skill levels; (ii) Investment in health — expenditure on preventive and curative medical care, sanitation and nutrition, which increases the productive years and efficiency of the workforce; and (iii) On-the-job training — firms bearing the cost of training workers, either while working (on-the-job) or through formal institutions, which raises the skill level of employees.",
    keywords: [
      "expenditure on education",
      "expenditure on health",
      "on-the-job training by firms",
      "(migration and information are additional valid sources)",
    ],
  },

  // ── 5. Rural Development ──
  {
    id: "q-c11-economics-05-1",
    subjectId: "c11-economics",
    chapterId: "c11-economics-05",
    classLevel: 11,
    text: "Explain the role of institutional credit agencies in reducing the rural poor's dependence on moneylenders.",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "Before institutional credit expanded, rural households depended heavily on moneylenders, who charged very high rates of interest and often trapped borrowers in debt. To address this, India built a network of institutional credit sources: cooperative credit societies, commercial banks (including their rural branches expanded after bank nationalisation), and Regional Rural Banks (RRBs) set up specifically to serve farmers and rural artisans at reasonable interest rates. NABARD (National Bank for Agriculture and Rural Development) was set up as the apex institution to coordinate and refinance this rural credit system. More recently, Self-Help Groups (SHGs), which pool the small savings of their members and lend among themselves, have emerged as an important source of micro-credit that reaches even those without collateral to offer a bank.",
    keywords: [
      "moneylenders charged exploitative interest rates before institutional credit",
      "cooperative societies, commercial banks, Regional Rural Banks (RRBs)",
      "NABARD as apex refinancing institution",
      "Self-Help Groups (SHGs) provide collateral-free micro-credit",
    ],
  },
  {
    id: "q-c11-economics-05-2",
    subjectId: "c11-economics",
    chapterId: "c11-economics-05",
    classLevel: 11,
    text: "What is meant by agricultural diversification, and why is it necessary?",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Agricultural diversification means expanding the range of activities in the rural economy beyond crop production alone, to include allied activities such as animal husbandry, poultry, fisheries and horticulture, as well as non-farm activities. It is necessary because a large section of the rural workforce depends on agriculture, which offers seasonal and often underemployed work; diversifying into allied and non-farm activities generates additional, more stable sources of income and employment and reduces the risk that comes from relying on a single crop-dependent income.",
    keywords: [
      "diversification = expanding beyond crop production into allied/non-farm activities",
      "examples: animal husbandry, fisheries, horticulture",
      "reason: reduce seasonal underemployment and income risk of relying on one crop",
    ],
  },

  // ── 6. Employment: Growth, Informalisation and Other Issues ──
  {
    id: "q-c11-economics-06-1",
    subjectId: "c11-economics",
    chapterId: "c11-economics-06",
    classLevel: 11,
    text: "Distinguish between the formal (organised) and informal (unorganised) sectors of employment.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "The formal (organised) sector includes enterprises registered with the government, where employment is more secure — workers get assured work hours, additional benefits such as paid leave, provident fund and gratuity, and protection against arbitrary dismissal. The informal (unorganised) sector consists of small, scattered and largely unregistered units where employment is not secure, workers can be dismissed without notice or compensation, and they generally receive no social security benefits. The distinction is based on job security and social protection, not merely on the size of the enterprise.",
    keywords: [
      "formal sector: registered enterprises, secure employment, social security benefits (PF, gratuity, paid leave)",
      "informal sector: unregistered, insecure employment, no social security",
      "distinction based on job security/social protection, not size alone",
    ],
  },
  {
    id: "q-c11-economics-06-2",
    subjectId: "c11-economics",
    chapterId: "c11-economics-06",
    classLevel: 11,
    text: "The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) guarantees how many days of wage employment in a financial year to a rural household whose adult members volunteer for unskilled manual work?\n(A) 50 days\n(B) 100 days\n(C) 150 days\n(D) 200 days",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (B) 100 days.\n\nMGNREGA legally guarantees 100 days of wage employment in a financial year to every rural household whose adult members are willing to do unskilled manual work, aimed at enhancing livelihood security in rural areas.",
    keywords: [
      "MGNREGA guarantees 100 days of wage employment per financial year",
      "applies to rural households willing to do unskilled manual work",
    ],
  },

  // ── 7. Environment and Sustainable Development ──
  {
    id: "q-c11-economics-07-1",
    subjectId: "c11-economics",
    chapterId: "c11-economics-07",
    classLevel: 11,
    text: "State the four major functions performed by the environment.",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "The environment performs four major functions: (i) it supplies resources — renewable and non-renewable, used in production and consumption; (ii) it assimilates waste generated by production and consumption activities; (iii) it sustains life by providing genetic and biodiversity, and maintaining the ecosystem; and (iv) it provides aesthetic services such as scenic beauty, that add to the quality of life.",
    keywords: [
      "supplies resources (renewable and non-renewable)",
      "assimilates waste",
      "sustains life — biodiversity and ecosystem",
      "provides aesthetic services",
    ],
  },
  {
    id: "q-c11-economics-07-2",
    subjectId: "c11-economics",
    chapterId: "c11-economics-07",
    classLevel: 11,
    text: "Define sustainable development.",
    marks: 2,
    type: "sa",
    source: "important",
    answer:
      "Sustainable development, as defined by the Brundtland Commission Report (Our Common Future, 1987), is development that meets the needs of the present generation without compromising the ability of future generations to meet their own needs.",
    keywords: [
      "meets needs of the present without compromising future generations' ability to meet their needs",
      "Brundtland Commission definition",
    ],
  },

  // ── 8. Comparative Development Experiences of India and Its Neighbours ──
  {
    id: "q-c11-economics-08-1",
    subjectId: "c11-economics",
    chapterId: "c11-economics-08",
    classLevel: 11,
    text: "Briefly describe the key reforms China introduced from 1978 that transformed its economy.",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "China began economic reforms in 1978, well before India's 1991 reforms. Key measures included: (i) dismantling the commune system in agriculture and introducing the Household Responsibility System, under which farmers were given land-use rights and could sell surplus produce; (ii) a dual-track pricing system, letting some goods be sold at government-fixed prices and the rest at market prices; and (iii) the Open Door Policy, which opened China's economy to foreign trade and investment through Special Economic Zones (SEZs) that offered tax incentives to attract foreign firms.",
    keywords: [
      "reforms began in 1978, ahead of India's 1991 reforms",
      "Household Responsibility System replaced the commune system in agriculture",
      "dual-track (dual) pricing system",
      "Open Door Policy and Special Economic Zones (SEZs) to attract foreign investment",
    ],
  },
  {
    id: "q-c11-economics-08-2",
    subjectId: "c11-economics",
    chapterId: "c11-economics-08",
    classLevel: 11,
    text: "Among India, China and Pakistan, which country recorded the highest GDP growth rate in the decades following its economic reforms, largely credited to its early start (1978) and sustained investment in infrastructure and export-oriented manufacturing?\n(A) India\n(B) Pakistan\n(C) China\n(D) All three grew at nearly the same rate",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (C) China.\n\nChina's reforms, begun in 1978, combined with heavy investment in infrastructure and an export-oriented manufacturing strategy, delivered a sustained high growth rate that outpaced both India and Pakistan over the following decades.",
    keywords: [
      "China's reforms started earliest (1978)",
      "export-oriented manufacturing and infrastructure investment",
      "China recorded the highest sustained GDP growth of the three economies",
    ],
  },
];
