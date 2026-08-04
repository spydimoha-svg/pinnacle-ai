import type { Question } from "../../lib/types";

// CLASS 12 ECONOMICS — Introductory Macroeconomics (Part A) and Indian
// Economic Development (Part B). Chapter ids copied verbatim from
// src/data/curriculum/class12.ts.

export const C12_ECONOMICS_QUESTIONS: Question[] = [
  // ── 1. National Income and Related Aggregates ──
  {
    id: "q-c12-economics-01-1",
    subjectId: "c12-economics",
    chapterId: "c12-economics-01",
    classLevel: 12,
    text: "Distinguish between GDP at market price and NNP at factor cost. Given a hypothetical economy where GDP at market price is ₹1,000 crore, depreciation is ₹50 crore, net indirect taxes are ₹80 crore and net factor income from abroad is −₹10 crore, calculate NNP at factor cost.",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "GDP at market price (GDP MP) is the value of all final goods and services produced within the domestic territory of a country during a year, valued at market prices, i.e. inclusive of net indirect taxes. NNP at factor cost (also called National Income) is the sum of factor incomes earned by normal residents of a country, both within the country and abroad, after deducting depreciation and net indirect taxes.\n\nCalculation:\nGDP MP = ₹1,000 crore\nLess Depreciation = ₹50 crore → NDP MP = ₹950 crore\nLess Net Indirect Taxes = ₹80 crore → NDP FC = ₹870 crore\nAdd Net Factor Income from Abroad (−₹10 crore) → NNP FC = ₹860 crore\n\nNNP at factor cost = ₹860 crore.",
    keywords: [
      "GDP MP: domestic territory, market prices (includes net indirect taxes)",
      "NNP FC: factor incomes to normal residents, net of depreciation and net indirect taxes",
      "NDP MP = GDP MP − depreciation",
      "NDP FC = NDP MP − net indirect taxes",
      "NNP FC = NDP FC + net factor income from abroad = ₹860 crore",
    ],
    examinerTip:
      "Work through the four-step chain (GDP MP → NDP MP → NDP FC → NNP FC) explicitly and show each subtraction/addition — a correct final number with no working loses the method marks.",
  },
  {
    id: "q-c12-economics-01-2",
    subjectId: "c12-economics",
    chapterId: "c12-economics-01",
    classLevel: 12,
    text: "Which of the following is NOT included while estimating national income?\n(A) Payment of fees to a lawyer by a firm\n(B) Purchase of a second-hand car\n(C) Salary paid to government employees\n(D) Wheat grown by a farmer for self-consumption",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (B) Purchase of a second-hand car.\n\nThe sale of a second-hand car does not add to the current year's output — it is merely a transfer of an already-existing asset, and any brokerage/commission earned on it (not the full sale value) is what would be included. Wheat grown for self-consumption is included at imputed value since it is part of current production.",
    keywords: [
      "second-hand goods transactions are excluded — no new production in the current year",
      "only brokerage/commission on a second-hand sale is included",
      "self-consumed farm output IS included at imputed value",
    ],
  },

  // ── 2. Money and Banking ──
  {
    id: "q-c12-economics-02-1",
    subjectId: "c12-economics",
    chapterId: "c12-economics-02",
    classLevel: 12,
    text: "If the Legal Reserve Ratio (LRR) is 20% and the commercial banking system receives an initial deposit of ₹10,000, calculate the total deposit the banking system can create. Also state the money multiplier.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "Money multiplier = 1/LRR = 1/0.20 = 5.\n\nTotal deposit created by the banking system = Initial deposit × Money multiplier = ₹10,000 × 5 = ₹50,000.\n\nThis happens because a bank keeps only the LRR (20%) as cash reserve and lends out the rest (80%); when that loan is spent and redeposited elsewhere in the banking system, the process repeats, and the geometric sum of this chain of deposits equals the initial deposit divided by the LRR.",
    keywords: [
      "money multiplier = 1/LRR",
      "multiplier = 1/0.20 = 5",
      "total deposit created = ₹10,000 × 5 = ₹50,000",
      "banks keep LRR as reserve, lend the rest, which returns as fresh deposits elsewhere",
    ],
    examinerTip:
      "State the formula 1/LRR before substituting — the marking scheme gives a separate mark for the formula, distinct from the arithmetic.",
  },
  {
    id: "q-c12-economics-02-2",
    subjectId: "c12-economics",
    chapterId: "c12-economics-02",
    classLevel: 12,
    text: "The rate at which the Reserve Bank of India lends money to commercial banks against approved securities, without any restriction on the purpose of the loan, is called:\n(A) Repo Rate\n(B) Reverse Repo Rate\n(C) Bank Rate\n(D) Cash Reserve Ratio",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (C) Bank Rate.\n\nBank Rate is the rate at which RBI lends long-term funds to commercial banks against approved securities with no restriction on end-use. Repo Rate is specifically the rate for short-term borrowing against government securities under a repurchase agreement, which is the key distinction examiners test.",
    keywords: [
      "Bank Rate: RBI's rate for long-term lending against approved securities, no end-use restriction",
      "Repo Rate: short-term borrowing under a repurchase agreement — do not confuse the two",
    ],
  },

  // ── 3. Determination of Income and Employment ──
  {
    id: "q-c12-economics-03-1",
    subjectId: "c12-economics",
    chapterId: "c12-economics-03",
    classLevel: 12,
    text: "In an economy, the Marginal Propensity to Consume (MPC) is 0.8. Calculate the investment multiplier and the total increase in national income if investment increases by ₹200 crore.",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "Investment multiplier, k = 1/(1 − MPC) = 1/(1 − 0.8) = 1/0.2 = 5.\n\nIncrease in national income (ΔY) = k × ΔI = 5 × ₹200 crore = ₹1,000 crore.\n\nThis works because an initial rise in investment creates equivalent income, a fraction (MPC) of which is spent as consumption, generating further income in successive rounds; the sum of this infinite geometric series of rounds of spending equals k times the initial injection.",
    keywords: [
      "k = 1/(1 − MPC) = 1/MPS",
      "k = 1/0.2 = 5",
      "ΔY = k × ΔI = 5 × 200 = ₹1,000 crore",
      "multiplier works through successive rounds of consumption spending",
    ],
    examinerTip:
      "Quote the multiplier formula in terms of MPC (or equivalently 1/MPS) explicitly before substituting — the formula itself is a separate mark.",
  },
  {
    id: "q-c12-economics-03-2",
    subjectId: "c12-economics",
    chapterId: "c12-economics-03",
    classLevel: 12,
    text: "'Deficient demand' in an economy refers to a situation where aggregate demand is:\n(A) Equal to aggregate supply at full employment\n(B) Greater than aggregate supply at full employment\n(C) Less than aggregate supply at full employment\n(D) Equal to zero",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (C) Less than aggregate supply at full employment.\n\nDeficient demand arises when aggregate demand falls short of the aggregate supply corresponding to full-employment output, leading to unsold stocks, a fall in production and involuntary unemployment — it is corrected by expansionary fiscal or monetary measures.",
    keywords: [
      "deficient demand: AD < full-employment AS",
      "leads to unplanned inventory build-up, output cuts, unemployment",
      "corrected by expansionary fiscal/monetary policy",
    ],
  },

  // ── 4. Government Budget and the Economy ──
  {
    id: "q-c12-economics-04-1",
    subjectId: "c12-economics",
    chapterId: "c12-economics-04",
    classLevel: 12,
    text: "Classify the following government budget items as revenue receipts or capital receipts, giving a reason: (i) Tax on income, (ii) Recovery of loans given to state governments, (iii) Dividends received from a public sector undertaking.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "(i) Tax on income — Revenue receipt, because it neither creates a liability nor reduces any asset of the government; it is a compulsory, non-repayable payment.\n\n(ii) Recovery of loans given to state governments — Capital receipt, because it reduces a financial asset of the government (the outstanding loan), even though it does not create a new liability.\n\n(iii) Dividends received from a PSU — Revenue receipt, because it is a regular, non-repayable inflow that neither creates a liability nor reduces an asset.",
    keywords: [
      "revenue receipt: neither creates a liability nor reduces an asset",
      "capital receipt: either creates a liability or reduces an asset",
      "tax revenue and dividends → revenue receipts",
      "recovery of loans → capital receipt (reduces an asset)",
    ],
  },
  {
    id: "q-c12-economics-04-2",
    subjectId: "c12-economics",
    chapterId: "c12-economics-04",
    classLevel: 12,
    text: "Fiscal deficit in a government budget is defined as:\n(A) Total expenditure minus total receipts excluding borrowings\n(B) Revenue expenditure minus revenue receipts\n(C) Total expenditure minus revenue receipts\n(D) Primary deficit minus interest payments",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (A) Total expenditure minus total receipts excluding borrowings.\n\nFiscal deficit = Total expenditure − (Revenue receipts + Non-debt-creating capital receipts). It measures the total borrowing requirement of the government during the year, unlike revenue deficit (option B), which measures only the shortfall on the revenue account.",
    keywords: [
      "fiscal deficit = total expenditure − total receipts excluding borrowings",
      "measures the government's total borrowing requirement",
      "distinct from revenue deficit, which covers only revenue account",
    ],
  },

  // ── 5. Balance of Payments ──
  {
    id: "q-c12-economics-05-1",
    subjectId: "c12-economics",
    chapterId: "c12-economics-05",
    classLevel: 12,
    text: "Distinguish between the current account and the capital account of India's Balance of Payments, with one example of a transaction under each.",
    marks: 3,
    type: "sa",
    source: "important",
    answer:
      "The current account records transactions relating to trade in goods (visible/merchandise trade), services (invisibles, such as banking, insurance and shipping), and unilateral transfers and factor income, which do not create any future liability or claim. Example: export of textiles to another country.\n\nThe capital account records transactions that alter a country's external assets and liabilities — such as loans, foreign direct investment, and portfolio investment — and therefore create a future claim or liability. Example: a foreign company setting up a factory in India (FDI inflow).",
    keywords: [
      "current account: trade in goods and services, transfers, factor income — no future claim/liability",
      "capital account: transactions changing external assets/liabilities — creates a future claim/liability",
      "example current account: export/import of goods",
      "example capital account: FDI/portfolio investment/loans",
    ],
  },
  {
    id: "q-c12-economics-05-2",
    subjectId: "c12-economics",
    chapterId: "c12-economics-05",
    classLevel: 12,
    text: "Under a flexible (floating) exchange rate system, the rate of exchange between two currencies is determined by:\n(A) The central bank fixing a rate and defending it\n(B) The forces of demand for and supply of foreign exchange in the market\n(C) An agreement between the governments of the two countries\n(D) The IMF setting a common rate for member countries",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (B) The forces of demand for and supply of foreign exchange in the market.\n\nUnder a flexible exchange rate system, the rate is left to be determined by market demand and supply of foreign exchange with no central bank intervention, unlike a fixed exchange rate where the government/central bank officially pegs and defends the rate.",
    keywords: [
      "flexible exchange rate: determined by market demand and supply of forex",
      "no central bank intervention, unlike fixed exchange rate",
    ],
  },

  // ── 6. Development Experience (1947-90) and Economic Reforms since 1991 ──
  {
    id: "q-c12-economics-06-1",
    subjectId: "c12-economics",
    chapterId: "c12-economics-06",
    classLevel: 12,
    text: "How did the industrial licensing system followed before 1991 curb the growth of the private corporate sector in India?",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "Under the Industrial Policy Resolution of 1956 and subsequent policy, almost every private firm needed a government licence before it could set up, expand capacity, change its product line, or even close down. This 'licence-permit raj' curbed growth of the private corporate sector because: (i) it discouraged efficient firms from expanding production even when there was market demand, since expansion first required bureaucratic approval; (ii) it created long delays and scope for corruption, as licences depended on official discretion rather than commercial judgement; and (iii) since new entrants could rarely obtain licences to compete, existing licence-holders were shielded from competition and had little incentive to improve efficiency or quality. These distortions were among the reasons cited for the 1991 reforms, which abolished industrial licensing for all but a handful of industries.",
    keywords: [
      "licence required for setting up, expanding or changing production line",
      "discouraged efficient firms from expanding despite demand",
      "led to delay and corruption in the approval process",
      "sheltered existing firms from competition, no incentive to improve efficiency",
      "abolished for most industries under the 1991 reforms",
    ],
  },
  {
    id: "q-c12-economics-06-2",
    subjectId: "c12-economics",
    chapterId: "c12-economics-06",
    classLevel: 12,
    text: "The Goods and Services Tax (GST), introduced in India in 2017, is best described as:\n(A) A tax levied only on imported goods\n(B) A single, comprehensive indirect tax on the supply of goods and services, replacing multiple indirect taxes\n(C) A direct tax on individual income replacing income tax\n(D) A tax levied only by state governments on agricultural produce",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (B) A single, comprehensive indirect tax on the supply of goods and services, replacing multiple indirect taxes.\n\nGST subsumed a range of central and state indirect taxes (such as excise duty, service tax and VAT) into one tax on the supply of goods and services across the country, aimed at creating a common national market and reducing the cascading effect of 'tax on tax'.",
    keywords: [
      "GST: single indirect tax on supply of goods and services",
      "replaced multiple central/state indirect taxes (excise, service tax, VAT)",
      "aim: common national market, removal of cascading tax effect",
    ],
  },

  // ── 7. Current Challenges facing Indian Economy ──
  {
    id: "q-c12-economics-07-1",
    subjectId: "c12-economics",
    chapterId: "c12-economics-07",
    classLevel: 12,
    text: "Distinguish between the formal (organised) and informal (unorganised) sectors of employment, and state why growth of the informal sector is a matter of policy concern.",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "The formal (organised) sector comprises enterprises registered with the government, where employees enjoy secure jobs, fixed working hours, and additional benefits such as paid leave, provident fund, gratuity and pension. The informal (unorganised) sector consists of small, scattered, largely unregistered units where employment is casual and insecure, workers can be dismissed without notice, and there is usually no social security cover.\n\nThe growth of the informal sector is a policy concern because the overwhelming majority of India's workforce is employed in it, meaning most workers lack income security, safe working conditions and social protection; policy therefore focuses on both generating more formal-sector jobs and extending basic protections (minimum wages, safety, social security) to informal workers.",
    keywords: [
      "formal sector: registered, secure jobs, social security benefits",
      "informal sector: unregistered, insecure, no social security",
      "majority of India's workforce is in the informal sector",
      "policy concern: lack of income security and social protection for most workers",
    ],
  },
  {
    id: "q-c12-economics-07-2",
    subjectId: "c12-economics",
    chapterId: "c12-economics-07",
    classLevel: 12,
    text: "'Organic farming' is best described as a method of cultivation that:\n(A) Relies entirely on genetically modified seeds\n(B) Uses chemical fertilisers and pesticides exclusively for higher yield\n(C) Avoids chemical fertilisers and pesticides, relying on bio-fertilisers, crop rotation and organic waste\n(D) Is practised only for export crops and never for food grains",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (C) Avoids chemical fertilisers and pesticides, relying on bio-fertilisers, crop rotation and organic waste.\n\nOrganic farming is a whole-system approach to farming that avoids synthetic chemical inputs, using instead bio-fertilisers, organic manure, crop rotation and biological pest control, aimed at sustaining soil fertility and reducing input costs and environmental damage over time.",
    keywords: [
      "organic farming avoids chemical fertilisers and pesticides",
      "relies on bio-fertilisers, organic manure, crop rotation, biological pest control",
      "aim: sustain soil fertility, cut input cost, reduce environmental harm",
    ],
  },

  // ── 8. Development Experience of India: A Comparison with Neighbours ──
  {
    id: "q-c12-economics-08-1",
    subjectId: "c12-economics",
    chapterId: "c12-economics-08",
    classLevel: 12,
    text: "Compare the development strategies adopted by India and China after the initiation of their respective economic reforms.",
    marks: 4,
    type: "sa",
    source: "important",
    answer:
      "China began market-oriented reforms in 1978, well ahead of India's 1991 reforms. China dismantled its commune system through the Household Responsibility System in agriculture, adopted a dual-track pricing system, and opened its economy through the Open Door Policy, using Special Economic Zones to attract export-oriented foreign investment in manufacturing.\n\nIndia's reforms of 1991 came later and were prompted by a balance of payments crisis; they focused on liberalisation (removing industrial licensing), privatisation (disinvestment in PSUs) and globalisation (lowering trade barriers, encouraging FDI), with a relatively greater emphasis on the services sector than on export-oriented manufacturing.\n\nBecause China's reforms began earlier and were more strongly export-manufacturing led, China achieved a higher and more sustained GDP growth rate than India over the following decades, though India's growth has increasingly been services-driven.",
    keywords: [
      "China: reforms from 1978, Household Responsibility System, Open Door Policy, SEZs, export-led manufacturing",
      "India: reforms from 1991, triggered by BoP crisis, LPG framework, services-sector led",
      "China's earlier start and manufacturing focus gave it a higher sustained growth rate",
    ],
  },
  {
    id: "q-c12-economics-08-2",
    subjectId: "c12-economics",
    chapterId: "c12-economics-08",
    classLevel: 12,
    text: "Among India, China and Pakistan, which country has consistently recorded the lowest Human Development Index (HDI) ranking in recent decades, reflecting comparatively weaker outcomes in education and health indicators?\n(A) China\n(B) India\n(C) Pakistan\n(D) All three rank equally on HDI",
    marks: 1,
    type: "mcq",
    source: "pyq",
    answer:
      "Correct option: (C) Pakistan.\n\nAmong the three neighbours, Pakistan has generally ranked lowest on the Human Development Index, reflecting comparatively weaker indicators of education (notably literacy and school enrolment) and health, while China has consistently ranked highest, aided by its stronger economic growth and greater social-sector investment.",
    keywords: [
      "Pakistan generally ranks lowest of the three on HDI",
      "reflects weaker education (literacy/enrolment) and health indicators",
      "China ranks highest, backed by stronger growth and social-sector spending",
    ],
  },
];
