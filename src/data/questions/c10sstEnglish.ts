import type { Question } from "../../lib/types";

/**
 * CLASS 10 — SOCIAL SCIENCE (c10-sst) and ENGLISH (c10-english).
 *
 * Chapter ids copied verbatim from src/data/curriculum/class10.ts.
 * All SST content is checked against the rationalised NCERT texts:
 *   jess3 (India and the Contemporary World II), jess1 (Contemporary India II),
 *   jess4 (Democratic Politics II), jess2 (Understanding Economic Development).
 * English content is checked against jeff1 (First Flight) and jefp1 (Footprints
 * Without Feet).
 *
 * `year` is set ONLY where the question is a verbatim board repeat AND the year is
 * known with confidence. Where a question is a well-established board repeat but the
 * exact year is not certain, source is "pyq" with no year. Everything else is
 * "important" or "sample". No year is guessed.
 */
export const C10_SST_ENGLISH_QUESTIONS: Question[] = [
  // ==========================================================================
  // HISTORY — India and the Contemporary World II
  // ==========================================================================
  {
    id: "q-c10-sst-01-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-01",
    classLevel: 10,
    text: "Describe any three provisions of the Treaty of Vienna of 1815.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer: `The Treaty of Vienna, 1815 was drawn up by the European powers — Britain, Russia, Prussia and Austria — who had collectively defeated Napoleon. The host was the Austrian Chancellor Duke Metternich, and the object was to undo most of the changes brought about in Europe during the Napoleonic wars and to restore the conservative order. Its provisions were:

(i) Restoration of the monarchy — the Bourbon dynasty, which had been deposed during the French Revolution, was restored to power in France, and France lost the territories it had annexed under Napoleon.

(ii) A series of states was set up on the boundaries of France to prevent French expansion in future — the kingdom of the Netherlands, which included Belgium, was set up in the north, and Genoa was added to Piedmont in the south.

(iii) The victorious powers were compensated — Prussia was given important new territories on its western frontiers, while Austria was given control of northern Italy. Russia was given part of Poland and Prussia a portion of Saxony. The German confederation of 39 states set up by Napoleon was left untouched.

Thus the Treaty of Vienna aimed at restoring the old monarchies and creating a new conservative order in Europe.`,
    keywords: [
      "Duke Metternich",
      "Bourbon dynasty restored",
      "conservative order",
      "kingdom of the Netherlands (including Belgium)",
      "German confederation of 39 states",
      "Genoa added to Piedmont",
    ],
    examinerTip:
      "Three DISTINCT provisions are wanted, each as a separate value point. Students write one long paragraph about Metternich and the conservative order and never get to three provisions — number them (i), (ii), (iii).",
  },
  {
    id: "q-c10-sst-02-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-02",
    classLevel: 10,
    text: "Explain how the Non-Cooperation Movement unfolded in the cities, and why it gradually slowed down there.",
    marks: 5,
    type: "la",
    source: "pyq",
    answer: `The Non-Cooperation Movement started in January 1921 and in the cities it was led largely by the middle class.

How it unfolded in the cities:
(i) Middle-class participation — thousands of students left government-controlled schools and colleges, headmasters and teachers resigned, and lawyers gave up their legal practices.
(ii) Boycott of councils — the council elections were boycotted in most provinces except Madras, where the Justice Party, the party of the non-Brahmans, felt that entering the council was one way of gaining some power that usually only Brahmans had access to.
(iii) Economic boycott — foreign goods were boycotted, liquor shops were picketed, and foreign cloth was burnt in huge bonfires.
(iv) Effect on trade — the import of foreign cloth halved between 1921 and 1922, its value dropping from Rs 102 crore to Rs 57 crore. Merchants and traders refused to trade in foreign goods or finance foreign trade. As people discarded imported cloth and wore only Indian cloth, the production of Indian textile mills and handlooms went up.

Why the movement slowed down in the cities:
(v) Khadi cloth was often more expensive than mass-produced mill cloth and the poor could not afford to buy it, so they could not boycott mill cloth for long. Similarly, for the boycott of British institutions to succeed, alternative Indian institutions had to be set up, and these were slow to come up. Students and teachers therefore began trickling back to government schools and lawyers joined back work in government courts.

Thus the movement was vigorous in the cities at first, but its economic and institutional costs made it difficult for the urban middle class to sustain.`,
    keywords: [
      "students left government-controlled schools and colleges",
      "Justice Party in Madras",
      "foreign cloth burnt in bonfires",
      "import of foreign cloth halved — Rs 102 crore to Rs 57 crore",
      "khadi was expensive",
      "alternative Indian institutions were slow to come up",
    ],
    examinerTip:
      "The question has two halves — how it spread AND why it slowed. Students spend all five marks on the spread and never write the khadi-cost / no-alternative-institutions reasons, capping themselves at about three marks.",
  },
  {
    id: "q-c10-sst-02-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-02",
    classLevel: 10,
    text: "Why did Mahatma Gandhi decide to withdraw the Non-Cooperation Movement in February 1922?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `(i) In February 1922 at Chauri Chaura in Gorakhpur (Uttar Pradesh), a peaceful demonstration in a bazaar turned into a violent clash with the police, in which a police station was set on fire and policemen were killed.

(ii) Mahatma Gandhi felt that the movement was turning violent in many places, and that satyagrahis needed to be properly trained before they would be ready for mass struggles. Since the movement rested on non-violence, he called it off — a decision endorsed by the Congress at Bardoli.

Hence the Chauri Chaura incident and the fear of losing the non-violent character of the struggle led Gandhiji to withdraw the movement.`,
    keywords: [
      "Chauri Chaura",
      "movement turning violent",
      "satyagrahis needed proper training",
      "non-violence",
    ],
    examinerTip:
      "Naming Chauri Chaura alone is only half the answer — the second mark is for Gandhiji's REASON (the movement was turning violent and satyagrahis were untrained), which most students omit.",
  },
  {
    id: "q-c10-sst-03-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-03",
    classLevel: 10,
    text: "Explain any three factors that led to the Great Depression of 1929.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The Great Depression began around 1929 and lasted till the mid-1930s, and no single factor caused it.

(i) Agricultural overproduction — agricultural economies were the worst hit, since prices fell even more than those of industrial goods. As agricultural prices fell sharply and unevenly, farm produce prices fell so much that in order to maintain their overall income rural households sold more, which caused prices to fall even further.

(ii) US overseas lending withdrawn — many countries financed their investments through loans from the USA. American overseas lenders panicked at the first sign of trouble and reduced their overseas loans in the first half of 1928. Countries that depended on US loans faced an acute crisis, for example in Latin America and Central Europe.

(iii) Collapse of the US banking system — the withdrawal of loans affected the rest of the world in different ways; the US banking system itself collapsed. As agricultural and industrial businesses were badly hit and unable to repay what they had borrowed, many banks went bankrupt and closed down, forcing farmers to sell their assets for very little to meet debt and repay loans.

Thus falling agricultural prices, the drying up of US loans and the collapse of banks together produced the worldwide depression.`,
    keywords: [
      "agricultural overproduction",
      "prices of agricultural goods fell sharply",
      "US overseas lending withdrawn / reduced",
      "countries dependent on US loans faced crisis",
      "collapse of the US banking system",
      "banks went bankrupt / closed down",
    ],
    examinerTip:
      "Three DISTINCT causes are wanted, not three effects. Students describe the misery of the Depression instead of its causes — keep the answer to the agricultural, the lending and the banking factors.",
  },
  {
    id: "q-c10-sst-04-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-04",
    classLevel: 10,
    text: "Explain any three problems faced by the Indian handloom weavers by the end of the nineteenth century.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `By the end of the nineteenth century, weavers all over India faced a series of problems.

(i) Decline of export market — first, the export market collapsed and the local market shrank, being glutted with cheap machine-made imported goods from Manchester, which flooded Indian markets with imported cotton textiles.

(ii) Shortage and high cost of raw cotton — as raw cotton exports from India increased and prices rose, weavers were starved of raw material and had to buy raw cotton at exorbitant prices, and this cost could not be met by weavers.

(iii) Effect of the American Civil War — then the American Civil War broke out and cotton supplies from the US were cut off, so Britain turned to India for raw cotton. As raw cotton exports from India increased, the price of raw cotton shot up within India itself, and weavers were starved of raw material and had to buy cotton at very high prices.

(iv) Decline of quality — by the twentieth century, weavers and other craftspeople faced yet another problem — the yarn made in Indian spinning mills was often of poor quality, so weavers had to import both fine yarn (mostly from Britain) and lower-quality yarn produced in Indian mills, which affected the quality of the final woven product.

Thus the loss of the export market, the raw-cotton crisis caused by the American Civil War, and the flood of Manchester imports together devastated the weavers.`,
    keywords: [
      "collapse of export market",
      "flood of Manchester imports",
      "American Civil War cut cotton supply to Britain",
      "raw cotton exports from India increased / price of raw cotton shot up",
      "weavers starved of raw material",
      "poor quality yarn from Indian spinning mills",
    ],
    examinerTip:
      "The American Civil War point is the one students omit, yet it is a named value point on its own — it explains WHY raw cotton became costly in India, not just that it did.",
  },
  {
    id: "q-c10-sst-05-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-05",
    classLevel: 10,
    text: "Explain the role of print culture in the growth of nationalism in India.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) Print connected communities and people across regions — from the 1820s Indian-language newspapers and journals (for example, Rammohun Roy's Sambad Kaumudi, 1821) carried public debate, reported colonial misrule and shaped a shared public opinion beyond a single locality.

(ii) The nationalist press grew in spite of censorship — vernacular newspapers reported colonial misrule and encouraged nationalist activities. When the Punjab revolutionaries were deported in 1907, Balgangadhar Tilak wrote with great sympathy about them in his Kesari; this led to his imprisonment in 1908, which in turn provoked widespread protests all over India.

(iii) Censorship itself fuelled nationalism — after the revolt of 1857 the government imposed strict control, and the Vernacular Press Act of 1878, modelled on the Irish Press Laws, allowed the government to censor reports and editorials and to confiscate the press. Such repression made freedom of speech and expression a nationalist demand.

Thus print created a shared national consciousness and turned the press into an instrument of anti-colonial protest.`,
    keywords: [
      "vernacular press",
      "Vernacular Press Act 1878",
      "Tilak's Kesari",
      "censorship",
      "freedom of speech and expression",
      "shared public opinion / nationalist ideas",
    ],
    examinerTip:
      "Generic answers ('print spread awareness among people') earn almost nothing. Every value point must carry a NAMED example — Kesari, the Vernacular Press Act, Sambad Kaumudi — which is what the key actually rewards.",
  },

  // ==========================================================================
  // GEOGRAPHY — Contemporary India II
  // ==========================================================================
  {
    id: "q-c10-sst-06-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-06",
    classLevel: 10,
    text: "Describe any three problems caused by the indiscriminate use of resources by human beings.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) Depletion of resources — resources have been depleted for satisfying the greed of a few individuals rather than the need of all.

(ii) Accumulation of resources in a few hands — this has divided society into two segments, the haves and the have-nots, that is, the rich and the poor.

(iii) Global ecological crises — indiscriminate exploitation of resources has led to global warming, ozone layer depletion, environmental pollution and land degradation, which threaten the very survival of life.

Therefore resource planning and equitable, sustainable use are essential, since an equitable distribution of resources is necessary for a sustained quality of life and global peace.`,
    keywords: [
      "depletion of resources",
      "greed of a few individuals",
      "haves and have-nots",
      "global warming",
      "ozone layer depletion",
      "land degradation",
    ],
    examinerTip:
      "'Haves and have-nots' and 'greed of a few' are the exact NCERT phrases the key looks for — paraphrasing them as 'some people are rich' loses the value point. End with the sustainable-development conclusion.",
  },
  {
    id: "q-c10-sst-07-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-07",
    classLevel: 10,
    text: "Describe how local communities are involved in the conservation of forests and wildlife in India, with examples.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `In India, local communities have been at the forefront of conservation, often protecting habitats in sacred groves called sarnas, devarakudu, kan, rai and others.

(i) Chipko Movement — the Chipko movement in the Himalayas has not only successfully resisted deforestation in several areas but has also shown that community afforestation with indigenous species can be enormously successful. Villagers, especially women, hugged the trees to prevent them from being felled.

(ii) Joint Forest Management — the Joint Forest Management (JFM) programme, which began in Odisha in 1988, provides a good example of the government (forest department) collaborating with local communities to protect and manage forests, and to share the benefits arising from it.

(iii) Beej Bachao Andolan and Navdanya — in many cases, people's participation has also relied on the indigenous species for conservation, for example the initiatives of the Beej Bachao Andolan in Tehri and Navdanya, that have shown that a large number of indigenous crop varieties are being cultivated using organic methods without pesticides and fertilisers.

(iv) Sacred groves — certain societies revere a particular tree that they have preserved from time immemorial, for example the Mundas and the Santhal worship mahua and kadamba trees, and the Sarna at Chipko in the Bishnoi villages of Rajasthan, where the Bishnoi community members refused to cut trees even at the cost of their lives, protecting blackbucks, chinkaras, peacocks and other creatures.

Hence local participation, from the Chipko movement to sacred groves, shows that community involvement is central to sustainable conservation in India.`,
    keywords: [
      "Chipko Movement",
      "Joint Forest Management (JFM) — began in Odisha, 1988",
      "sacred groves — sarnas, devarakudu, kan, rai",
      "Bishnoi community of Rajasthan",
      "Beej Bachao Andolan / Navdanya",
      "indigenous species conservation",
    ],
    examinerTip:
      "The examples ARE the marks — 'people help conserve forests' with no named movement earns almost nothing. Name at least two of Chipko, JFM, sacred groves or the Bishnois with their location.",
  },
  {
    id: "q-c10-sst-08-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-08",
    classLevel: 10,
    text: "Multi-purpose river projects are today opposed on a number of grounds. Examine any five such grounds.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Multi-purpose projects, once called the 'temples of modern India' by Jawaharlal Nehru, are now opposed on the following grounds:

(i) Ecological damage to the river — regulating and damming rivers affects their natural flow, causing poor sediment flow and excessive sedimentation at the bottom of the reservoir. This results in rockier stream beds and poorer habitats for the river's aquatic life.

(ii) Fragmentation of rivers — dams fragment rivers, making it difficult for aquatic fauna to migrate, especially for spawning. Reservoirs built on floodplains also submerge the existing vegetation and soil, leading to its decomposition over time.

(iii) Displacement of local communities — large dams have caused large-scale displacement. Local people had to give up their land, their livelihood and their meagre access to and control over resources 'for the greater good of the nation'. This triggered movements such as the Narmada Bachao Andolan and the Tehri Dam Andolan.

(iv) Changed cropping pattern and social divide — irrigation has shifted farmers to water-intensive commercial crops, causing salinisation of the soil, and has widened the social gap between richer landowners and the landless poor.

(v) Floods and land degradation — ironically, dams built to control floods have triggered floods due to sedimentation in the reservoir, and the flood plains have been deprived of silt, a natural fertiliser, adding to land degradation. Multi-purpose projects have also induced earthquakes, caused water-borne diseases and pests, and created pollution from excessive use of water. Inter-state water disputes over sharing costs and benefits (for example, over the Krishna–Godavari waters) are a further ground of opposition.

Hence, while multi-purpose projects deliver irrigation and power, their ecological and social costs have made them deeply contested.`,
    keywords: [
      "poor sediment flow / excessive sedimentation",
      "fragment rivers — aquatic fauna cannot migrate for spawning",
      "large-scale displacement of local communities",
      "Narmada Bachao Andolan",
      "salinisation of soil",
      "flood plains deprived of silt",
    ],
    examinerTip:
      "Five separate grounds are needed, one mark each. Students repeat 'displacement' three times in different words — that counts once. Mix ecological, social and hydrological grounds to earn all five.",
  },
  {
    id: "q-c10-sst-09-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-09",
    classLevel: 10,
    text: "Describe the geographical conditions required for the growth of wheat in India and name any two major wheat-producing states.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Wheat is the second most important cereal crop and the main food crop of north and north-western India. It is a rabi crop.

(i) Temperature — it requires a cool growing season and bright sunshine at the time of ripening.

(ii) Rainfall — it requires 50 to 75 cm of annual rainfall, evenly distributed over the growing season.

(iii) Growing zones — there are two important wheat-growing zones in the country: the Ganga–Satluj plains in the north-west and the black soil region of the Deccan.

Major wheat-producing states: Punjab, Haryana, Uttar Pradesh, Bihar, Rajasthan and parts of Madhya Pradesh (any two).

Thus wheat needs a cool, moist growing period and a warm, bright ripening period, conditions best met in the north-western plains, where the success of the green revolution further supported its growth.`,
    keywords: [
      "rabi crop",
      "cool growing season",
      "bright sunshine at the time of ripening",
      "50 to 75 cm annual rainfall",
      "Ganga-Satluj plains",
      "Punjab / Haryana / Uttar Pradesh",
    ],
    examinerTip:
      "'Bright sunshine at the time of ripening' is a marked point on its own — students write only 'cool climate and moderate rainfall' and lose it. Always state the crop season (rabi) first.",
  },
  {
    id: "q-c10-sst-10-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-10",
    classLevel: 10,
    text: "Which one of the following minerals is formed by the decomposition of surface rocks, the removal of soluble constituents leaving behind a residual mass of weathered material?\n(a) Coal\n(b) Bauxite\n(c) Gold\n(d) Zinc",
    marks: 1,
    type: "mcq",
    source: "sample",
    answer: `(b) Bauxite.

Bauxite deposits are formed by the decomposition of a wide variety of rocks rich in aluminium silicates; the soluble constituents are removed by weathering and a residual mass of weathered material containing the ore is left behind. Aluminium is obtained from bauxite. (Coal is a sedimentary/organic deposit formed in rock beds; gold and zinc typically occur in veins and lodes or as placer deposits.)`,
    keywords: ["Bauxite", "decomposition of rocks", "residual mass of weathered material", "aluminium silicates"],
    examinerTip:
      "Students confuse the four modes of mineral occurrence — veins and lodes (gold, zinc), beds and layers (coal), residual weathering (bauxite), and placer/alluvial deposits. Learn one named mineral per mode.",
  },
  {
    id: "q-c10-sst-11-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-11",
    classLevel: 10,
    text: "Suggest any three steps to minimise the environmental degradation caused by industrial development in India.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) Control of water pollution — minimise the use of water for processing by reusing and recycling it in two or more successive stages; harvest rainwater to meet water requirements; and treat hot water and effluents before releasing them into rivers and ponds. Effluent treatment has three phases — primary treatment by mechanical means (screening, grinding, flocculation and sedimentation), secondary treatment by a biological process, and tertiary treatment by biological, chemical and physical processes, which includes the recycling of wastewater. Overdrawing of groundwater by industry must be regulated legally.

(ii) Control of air pollution — particulate matter in the air can be reduced by fitting smoke stacks in factories with electrostatic precipitators, fabric filters, scrubbers and inertial separators. Smoke can be reduced by using oil or gas instead of coal in factories.

(iii) Control of noise pollution — generators should be fitted with silencers, machinery and equipment can be redesigned to increase energy efficiency and reduce noise, and noise-absorbing material may be used, while workers are given earplugs and earphones.

Hence a combination of treatment, technology and legal regulation is needed for sustainable industrial development.`,
    keywords: [
      "reusing and recycling water in successive stages",
      "treatment of effluents — primary, secondary, tertiary",
      "electrostatic precipitators / fabric filters / scrubbers",
      "oil or gas instead of coal",
      "silencers on generators",
      "rainwater harvesting",
    ],
    examinerTip:
      "Vague appeals like 'factories should not pollute the environment' score zero. The key rewards NAMED technical measures — precipitators, scrubbers, silencers, three-phase effluent treatment. Organise by water, air, noise.",
  },

  {
    id: "q-c10-sst-12-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-12",
    classLevel: 10,
    text: "Why is transportation called the lifeline of a nation and its economy? Explain with reference to the Golden Quadrilateral.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) Transport as a lifeline — efficient means of transport are prerequisites for fast development. Today, India is well netted with various modes of transport, and it is the network of transport that has made it possible to conquer distances, bringing different parts of the country closer together, so that goods produced in one part of the country can reach markets in other parts, and mobility of people and goods across the country becomes possible.

(ii) Golden Quadrilateral — with a view to reduce the time and distance between the mega cities of Delhi, Mumbai, Chennai and Kolkata, the government has built the Golden Quadrilateral Super Highways to connect these four cities. The North–South corridor, linking Srinagar and Kanyakumari, and the East–West corridor, connecting Silchar and Porbandar, are part of the same project. This project is being implemented by the National Highways Authority of India (NHAI).

(iii) Effect on the economy — these highway projects are aimed at reducing the time and distance between the mega cities of India, and will improve the quality of national highways and rationalise the freight and passenger traffic, thereby aiding industrial growth and trade.

Since no other network can substitute for the movement of raw materials, finished goods, and people that transport provides, it is rightly called the lifeline of the national economy.`,
    keywords: [
      "network of transport connects different parts of the country",
      "Golden Quadrilateral — Delhi, Mumbai, Chennai, Kolkata",
      "North-South and East-West corridors",
      "National Highways Authority of India (NHAI)",
      "reduces time and distance",
      "aids industrial growth and trade",
    ],
    examinerTip:
      "Name all four cities of the Golden Quadrilateral and both corridors (North-South, East-West) — a general answer about 'good roads help the economy' without these named details loses the specific value points.",
  },
  {
    id: "q-c10-sst-12-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-12",
    classLevel: 10,
    text: "Which one of the following provides the cheapest mode of transport, particularly for bulky and heavy goods, over long distances?\n(a) Roadways\n(b) Airways\n(c) Waterways\n(d) Pipelines",
    marks: 1,
    type: "mcq",
    source: "sample",
    answer: `(c) Waterways.

Water transport is the cheapest means of transport for bulky and heavy goods carried over long distances, since it is fuel-efficient and environment friendly. India has an extensive network of inland waterways in the form of rivers, canals, backwaters and creeks, in addition to a long coastline used for coastal shipping. (Roadways suit short distances and door-to-door service; airways are the fastest but costliest; pipelines carry liquids and gases, not general bulky goods.)`,
    keywords: ["waterways", "cheapest for bulky/heavy goods", "long distances", "fuel-efficient"],
    examinerTip:
      "Match each mode to its distinguishing feature: roadways — door-to-door and short distance; railways — bulk goods over medium/long land distance; waterways — cheapest, bulky goods; airways — fastest, costliest; pipelines — liquids and gases only.",
  },

  // ==========================================================================
  // POLITICAL SCIENCE — Democratic Politics II
  // ==========================================================================
  {
    id: "q-c10-sst-13-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-13",
    classLevel: 10,
    text: "Describe the accommodative measures adopted by the Belgian leaders to solve the ethnic problem of their country.",
    marks: 5,
    type: "la",
    source: "pyq",
    answer: `Belgium is an ethnically diverse country: 59 per cent of its people live in the Flemish region and speak Dutch, 40 per cent live in the Wallonia region and speak French, and the remaining 1 per cent speak German. In the capital, Brussels, 80 per cent speak French and 20 per cent speak Dutch, making the Dutch-speaking majority of the country a minority in the capital. Between 1970 and 1993 the Belgian leaders amended the constitution four times to work out an accommodative arrangement:

(i) Equality in the central government — the number of Dutch- and French-speaking ministers shall be equal in the central government. Some special laws require the support of a majority of members from each linguistic group, so no single community can make decisions unilaterally.

(ii) Strong state governments — many powers of the central government have been given to the state governments of the two regions of the country, and these state governments are not subordinate to the central government.

(iii) Separate government for Brussels — Brussels has a separate government in which both the communities have equal representation. The French-speaking people accepted equal representation in Brussels because the Dutch-speaking community accepted equal representation in the central government.

(iv) Community government — apart from the central and state governments, there is a third kind of government, the 'community government', elected by people belonging to one language community — Dutch, French and German-speaking — no matter where they live. This government has power regarding cultural, educational and language-related issues.

(v) Outcome — this arrangement, though complicated, helped to avoid civic strife between the two major communities and a possible division of the country on linguistic lines. It is also why Brussels was chosen as the headquarters of the European Union.

Thus the Belgian model shows that respecting and accommodating diversity, rather than imposing majority will, is the way to hold a diverse country together.`,
    keywords: [
      "equal number of Dutch and French speaking ministers",
      "state governments not subordinate to the central government",
      "Brussels has a separate government with equal representation",
      "community government",
      "cultural, educational and language-related issues",
      "avoided civic strife / division of the country",
    ],
    examinerTip:
      "The 'community government' is the point students forget, and it is the most distinctive feature of the Belgian model. Also state the 59/40/1 and Brussels 80/20 figures — they earn the introductory mark.",
  },
  {
    id: "q-c10-sst-14-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-14",
    classLevel: 10,
    text: "Describe the three-fold distribution of legislative powers between the Union Government and the State Governments under the Indian Constitution.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The Indian Constitution provides a three-fold distribution of legislative powers through three lists:

(i) Union List — it includes subjects of national importance such as defence of the country, foreign affairs, banking, communications and currency. They are included in this list because we need a uniform policy on these matters throughout the country. The Union Government alone can make laws relating to the subjects mentioned in the Union List.

(ii) State List — it contains subjects of state and local importance such as police, trade, commerce, agriculture and irrigation. The State Governments alone can make laws relating to the subjects mentioned in the State List.

(iii) Concurrent List — it includes subjects of common interest to both the Union Government and the State Governments, such as education, forest, trade unions, marriage, adoption and succession. Both the Union and the State Governments can make laws on these subjects. If their laws conflict with each other, the law made by the Union Government will prevail.

In addition, subjects that do not fall in any of these three lists are called residuary subjects (for example, computer software), and the Union Government has the power to legislate on them.`,
    keywords: [
      "Union List — defence, foreign affairs, banking, communications, currency",
      "State List — police, trade, commerce, agriculture, irrigation",
      "Concurrent List — education, forest, trade unions, marriage, adoption, succession",
      "Union law prevails in case of conflict",
      "residuary subjects",
    ],
    examinerTip:
      "Each list needs its NCERT examples — a list named without its subjects gets half credit. The conflict rule ('Union law prevails') and residuary powers are the two lines that lift this from 2 to 3 marks.",
  },
  {
    id: "q-c10-sst-14-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-14",
    classLevel: 10,
    text: "'Education' is a subject that falls under which one of the following lists of the Indian Constitution?\n(a) Union List\n(b) State List\n(c) Concurrent List\n(d) Residuary subjects",
    marks: 1,
    type: "mcq",
    source: "sample",
    answer: `(c) Concurrent List.

Education is a subject of common interest to both the Union and the State Governments, and therefore both can make laws on it; if their laws conflict, the law made by the Union Government prevails. (Defence and currency are in the Union List; police and agriculture are in the State List; computer software is an example of a residuary subject.)`,
    keywords: ["Concurrent List", "common interest to both Union and State", "Union law prevails"],
    examinerTip:
      "Education, forest, trade unions, marriage, adoption and succession are the six Concurrent List examples in NCERT — memorise them as a set, because this 1-marker is asked directly with different subjects each year.",
  },
  {
    id: "q-c10-sst-15-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-15",
    classLevel: 10,
    text: "Distinguish between communalism and secularism, and explain how communal politics works in India.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) Communalism — communalism is a belief that people belonging to a particular religion have a fundamentally different set of interests from those belonging to another religion, and that the interests of the followers of one religion are dissimilar and opposed to the interests of the followers of another. This belief is one of the bases of communal politics.

(ii) How communal politics works — communal politics is based on the idea that religion is the principal basis of a social community, and it involves several things any one of which can take a communal form: the assertion of the domination of one's own religion over other religions; the desire for a nation to be based on one religion; the seeking of political dominance for the community that follows one particular religion; and the belief that followers of a particular religion belong to one community and their identity is based on their religious identification. Communal politics uses religious symbols, leaders, fears and belief for political mobilisation, and can take the form of communal prejudices, stereotypes of religious communities, communal tension, and even large-scale violence such as communal riots.

(iii) Secularism, in contrast, treats religion as a private matter for the individual and does not tie political rights, duties or entitlements to a person's religion. The Indian Constitution does not give a special status to any one religion, and citizens are free to profess, practise and propagate any religion or none.

Thus while secularism separates religion from the state, communalism turns religious identity into the basis of political claims, which is why the Indian state, though secular in the constitution, still has to guard against communal politics in practice.`,
    keywords: [
      "communalism — religion as fundamentally different set of interests",
      "religion as the principal basis of social community",
      "communal prejudice, stereotypes, tension, violence / riots",
      "secularism — religion is a private matter",
      "no special status to any one religion",
      "religion used for political mobilisation",
    ],
    examinerTip:
      "The distinction between religion IN politics (legitimate, e.g. seeking policy on religious grounds openly) and COMMUNALISM (using religion to dominate or exclude another community) is the exact hinge the marking scheme checks — do not conflate the two.",
  },
  {
    id: "q-c10-sst-15-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-15",
    classLevel: 10,
    text: "How has the increasing role of women's movements changed the sexual division of labour in India? Explain with examples.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) Sexual division of labour — in most societies, work inside the home is traditionally treated as a woman's responsibility, involving daily domestic chores, while men are seen as breadwinners. This division often works to the disadvantage of women, since their housework is not valued and hence not counted in the calculation of the gross national product.

(ii) Rise in women's political participation — women's movements have raised demands for greater representation of women in decision-making bodies. As a result of sustained efforts, the proportion of women in the legislature has slowly increased in India — for example, more than 40 per cent of the elected members in the local government bodies (panchayats and municipalities) are women, as one-third of seats in local government are now reserved for women.

(iii) Legal and awareness changes — women's movements have fought for equal wages, changes to inheritance laws to give women equal rights to ancestral property, employment and education, and against the practice of dowry and violence against women, which has made society more aware of the inequality faced by women.

Though women still lag far behind men despite these constitutional and legal provisions of equality — for example, the literacy rate among women is only 65.46 per cent compared to 81.03 per cent among men — the women's movement has significantly weakened the rigid sexual division of labour by bringing women into public and political life.`,
    keywords: [
      "sexual division of labour — housework treated as woman's responsibility",
      "housework not valued / not counted in GNP",
      "one-third reservation for women in local government (panchayats/municipalities)",
      "more than 40 per cent women in local bodies",
      "equal wages / property / education demands",
      "literacy gap between men and women",
    ],
    examinerTip:
      "The reservation figure for women in local government is a fixed NCERT statistic that examiners check for precisely — state it as 'one-third of seats reserved' and note the higher actual share (40%+), not a vague 'more women got involved'.",
  },
  {
    id: "q-c10-sst-16-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-16",
    classLevel: 10,
    text: "Describe any three challenges faced by political parties in India, and suggest one reform for each.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) Lack of internal democracy — power is concentrated in the hands of one or a few leaders at the top. Parties do not hold organisational meetings or internal elections regularly, do not keep membership registers, and ordinary members have no information about what happens inside. Loyalty to leaders becomes more important than loyalty to party principles.
Reform: a law can make it compulsory for parties to maintain a register of members, follow their own constitution, and hold open elections to the highest posts.

(ii) Dynastic succession — because parties are not transparent, leaders favour people close to them and even their family members. In many parties the top positions are controlled by members of one family, which is unfair to other members and bad for democracy as inexperienced people acquire power.
Reform: an independent authority can be given the power to act as a judge in case of party disputes, and internal elections can break family control.

(iii) Growing role of money and muscle power — parties tend to nominate candidates who can raise money and sometimes support criminals who can win elections; rich people and companies who fund parties gain influence over policy.
Reform: state funding of elections, and stricter regulation of party finances and candidate selection.

(A further challenge is that parties do not offer a meaningful choice, as ideological differences among them have narrowed.) Reforms will work only when public pressure through petitions, publicity and agitations backs them.`,
    keywords: [
      "lack of internal democracy",
      "dynastic succession",
      "money and muscle power",
      "no meaningful choice to voters",
      "register of members / open internal elections",
      "state funding of elections",
    ],
    examinerTip:
      "The paper pairs challenges with reforms. Students write the three challenges fully and then stop — every unwritten reform is a lost half-mark, so answer in challenge-then-reform pairs, not in two blocks.",
  },
  {
    id: "q-c10-sst-17-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-17",
    classLevel: 10,
    text: "'Democracies are better than any other form of government in accommodating social diversities.' Justify the statement with three arguments.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) Democracies develop a procedure for competition — no society can fully and permanently resolve conflicts among different groups, but democracy evolves a procedure to conduct this competition peacefully. This reduces the possibility of tensions becoming explosive or violent, and the ability to handle social differences, divisions and conflicts is thus a definite plus point of democratic regimes.

(ii) It requires the majority to work with the minority — the first condition of accommodation is that the majority must always work with the minority so that the government functions to represent the general view, and not just the view of the majority. Democracy is not simply rule by majority opinion.

(iii) Majority rule must not become the rule of a majority community — the rule of the majority does not mean the rule of the majority community in terms of religion, race or linguistic group. Democracy remains democracy only as long as every citizen has a chance of being in the majority at some point of time.

The contrast between Belgium, which accommodated its linguistic communities through power-sharing, and Sri Lanka, whose majoritarian measures led to civil war, proves that democracies which respect these conditions handle diversity far better than non-democratic regimes.`,
    keywords: [
      "procedure to conduct competition",
      "reduce the possibility of tensions becoming explosive",
      "majority must work with the minority",
      "not the rule of the majority community",
      "every citizen has a chance of being in the majority",
      "Belgium and Sri Lanka",
    ],
    examinerTip:
      "The two CONDITIONS are the marked content, not a general essay on democracy. Adding the Belgium-versus-Sri-Lanka contrast as your conclusion is what turns a 2-mark answer into a 3-mark one.",
  },

  // ==========================================================================
  // ECONOMICS — Understanding Economic Development
  // ==========================================================================
  {
    id: "q-c10-sst-18-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-18",
    classLevel: 10,
    text: "Why do different persons have different notions of development? Explain with two examples.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Different persons have different developmental goals because what may be development for one may not be development for the other; it may even be destructive for the other. People seek things that are most important for them, and their goals depend on their situation in life.

Example 1: An industrialist wants more dams to get more electricity for his factory, but the tribals displaced by the construction of the dam oppose it, because for them the dam means the loss of land, home and livelihood.

Example 2: A landless labourer wants more days of work and better wages, whereas the rich farmer of the same village wants cheap labour and higher prices for his crop. (Equally, a girl may want the same freedom that her brother gets, while for her brother this may be seen as a hindrance.)

Hence developmental goals are not only different but can even be conflicting.`,
    keywords: [
      "different developmental goals",
      "what is development for one may not be for another",
      "may even be destructive",
      "conflicting goals",
      "industrialist vs displaced tribals",
      "landless labourer vs rich farmer",
    ],
    examinerTip:
      "The examiner wants CONFLICTING pairs, not two unrelated wishes. Writing 'a farmer wants rain and a student wants marks' misses the point — the two goals must clash, which is the whole idea of the chapter.",
  },
  {
    id: "q-c10-sst-19-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-19",
    classLevel: 10,
    text: "Explain the mismatch between the share of the primary sector in India's GDP and its share in employment. What is disguised unemployment?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) The mismatch — over the years, production in the secondary and tertiary sectors has increased many times, but employment in these sectors has not increased to the same extent. As per NCERT data, more than half of the workers in the country are still working in the primary sector, mainly in agriculture, and they produce only about a quarter of the GDP. In contrast, the secondary and tertiary sectors produce about three-fourths of the produce, while employing less than half the people.

(ii) The reason — not enough jobs were created in the secondary and tertiary sectors, so workers who were not needed in agriculture could not move out of it. This means there are more people working in agriculture than are actually necessary.

(iii) Disguised unemployment — it is a situation in which more people are engaged in work than are actually required, so that even if some of them are withdrawn, total production does not fall. Their contribution to output is nearly zero, and the work of one person is shared by many. For example, if a family of five works on a small plot on which two people are enough, the other three are in disguised unemployment. It is also called underemployment, and it is found not only in agriculture but also in the service sector, among casual workers such as painters, plumbers, repair persons and street vendors.

Thus the primary sector supports the largest workforce while contributing the least per worker, which is why creating employment in the other sectors is essential.`,
    keywords: [
      "more than half the workers in the primary sector",
      "producing only about a quarter of the GDP",
      "not enough jobs created in secondary and tertiary sectors",
      "disguised unemployment / underemployment",
      "removing workers does not reduce production",
      "work of one person shared by many",
    ],
    examinerTip:
      "The definition of disguised unemployment must include the test — 'even if some workers are removed, production remains the same'. Students describe a big family on a small farm without stating that test, and lose the definition mark.",
  },
  {
    id: "q-c10-sst-20-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-20",
    classLevel: 10,
    text:
      "Read the case and answer the questions that follow.\n\n" +
      "Rama is a small farmer in a village. To meet the expenses of cultivation she needs Rs 30,000. The village moneylender is willing to lend her the money at 4 per cent per month, without any paperwork, but on the condition that she sells her produce only to him at a price he fixes. The nearby bank will lend her the same amount at 12 per cent per annum, but asks for the papers of her land as security and for proof of her income. Rama has no land papers in her own name, and so she borrows from the moneylender. Her crop fails; she is unable to repay, and she has to borrow again to survive.\n\n" +
      "(a) Identify the terms of credit mentioned in the case. (2)\n" +
      "(b) Why is credit from the moneylender said to push borrowers like Rama into a debt trap? (1)\n" +
      "(c) Suggest one measure by which Rama could get cheap credit. (1)",
    marks: 4,
    type: "case",
    source: "important",
    answer: `(a) Terms of credit — every loan agreement specifies an interest rate, collateral, documentation requirement and the mode of repayment, and together these are called the terms of credit. In the case:
• Interest rate — 4 per cent per month (that is, 48 per cent per annum) from the moneylender, against 12 per cent per annum from the bank.
• Collateral — the bank asks for the papers of her land as security. Collateral is an asset the borrower owns (land, building, vehicle, livestock, deposits with banks) and uses as a guarantee to the lender until the loan is repaid; if the borrower fails to repay, the lender has the right to sell the collateral to obtain payment.
• Documentation — the bank requires land papers and proof of income; the moneylender requires none.
• Mode of repayment — Rama must sell her produce only to the moneylender at a price fixed by him.
The terms of credit vary depending on the nature of the lender and the borrower.

(b) Debt trap — the interest rate is extremely high (48 per cent per annum) and the mode of repayment is unfavourable, since she cannot get a fair price for her produce. When the crop fails, she cannot repay the loan; the loan amount grows over time and she has to borrow again to survive. Credit in this case, instead of helping her improve her earnings, leaves her worse off — it pushes her into a situation from which recovery is very painful. She may even have to sell part of her land to repay.

(c) Measure — Rama should be given access to formal-sector credit from a bank or cooperative at a low interest rate, or she can join a Self-Help Group (SHG). An SHG of 15–20 members pools small savings, gives its members small loans at reasonable interest and without collateral, and after a year or two becomes eligible for a bank loan in the group's name, with the group deciding the loans and ensuring repayment. This frees her from the moneylender.

Conclusion: cheap and affordable credit from formal sources is crucial for the country's development, which is why the Reserve Bank of India supervises banks and why the spread of formal credit to poor households must be increased.`,
    keywords: [
      "terms of credit — interest rate, collateral, documentation, mode of repayment",
      "collateral as security",
      "debt trap",
      "high rate of interest",
      "formal sector credit / low interest",
      "Self-Help Group (SHG)",
    ],
    examinerTip:
      "The key awards all FOUR terms of credit — naming only interest rate and collateral caps you at half marks on part (a). In (c) name the SHG mechanism specifically; 'she should take a bank loan' alone is not enough, since her problem is that she has no collateral.",
  },
  {
    id: "q-c10-sst-21-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-21",
    classLevel: 10,
    text: "Explain any three ways in which multinational corporations (MNCs) control and spread their production across countries.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `An MNC is a company that owns or controls production in more than one nation. It sets up offices and factories in regions where it can get cheap labour and other resources, close to the markets, with favourable government policies, so that its cost of production is low and its profits are higher. MNCs spread production in the following ways:

(i) Joint production with local companies — the MNC sets up production jointly with a local company. The benefit to the local company is two-fold: first, the MNC can provide money for additional investments, such as buying new machines for faster production; and second, it may bring with it the latest technology for producing goods.

(ii) Buying up local companies — the most common route for MNC investment is to buy up local companies and then expand production. MNCs with huge wealth can quite easily do so, for example, Cargill Foods, a very large American MNC, bought over Parakh Foods in India and thereby became the largest producer of edible oil in the country.

(iii) Placing orders with small producers — large MNCs in developed countries place orders for production with small producers, for example, of garments, footwear and sports items. The products are supplied to the MNCs, which then sell these under their own brand names to customers. These large MNCs have tremendous power to determine the price, quality, delivery and labour conditions of these distant producers.

In this way, MNCs are not merely selling in many countries; production in distant locations is being linked and controlled by them, which is the key element of globalisation today.`,
    keywords: [
      "own or control production in more than one nation",
      "cheap labour and other resources",
      "joint production with local companies",
      "buying up local companies — Cargill Foods / Parakh Foods",
      "placing orders with small producers",
      "determine price, quality, delivery and labour conditions",
    ],
    examinerTip:
      "The scheme wants the MECHANISM, not a description of globalisation. Write the three routes as separate headed points and attach the NCERT example (Cargill–Parakh Foods) — a named example is worth a mark on its own.",
  },

  {
    id: "q-c10-sst-22-1",
    subjectId: "c10-sst",
    chapterId: "c10-sst-22",
    classLevel: 10,
    text:
      "PROJECT WORK (internal assessment only — Consumer Rights is not examined in the 80-mark theory paper). " +
      "As part of your class project on consumer awareness, visit a local shop or interview a family member about a purchase where a product or service was found defective or unsatisfactory. Prepare a short project report covering: " +
      "(a) the consumer rights you would invoke and why; (b) the redressal forum available (District, State or National Consumer Court) based on the value of the goods/compensation claimed; and (c) the role of the COPRA, 1986 helpline and the 'jaago grahak jaago' campaign in consumer awareness.",
    marks: 5,
    type: "la",
    source: "sample",
    answer: `This is a PROJECT WORK task for internal assessment (Consumer Rights carries no marks in the theory paper). A sample project structure:

(a) Consumer rights invoked — the Right to Information (to know particulars of the good/service being bought, such as ingredients, price, batch number, date of manufacture, expiry and address of manufacturer); the Right to Seek Redressal against unfair or restrictive trade practices; and if the product endangers life or property, the Right to Safety. The report should quote the specific defect found and match it to the specific right.

(b) Redressal forum — under the Consumer Protection Act (COPRA), 1986, a three-tier judicial machinery exists at the district, state and national levels. A consumer can make use of the district-level court for cases valued up to Rs 20 lakh, the state-level court for cases between Rs 20 lakh and Rs 1 crore, and the national-level court for cases above Rs 1 crore. If the first appeal does not satisfy the consumer, they can also appeal in the state and then the national court. The report should state which level applies to the case investigated, based on the value claimed.

(c) COPRA and awareness — the COPRA, 1986 is popularly known as the consumer's right and enacted by the Indian parliament, and it is this act which enabled the formation of the consumer forums. It has led to the setting up of separate departments of consumer affairs in central and state governments. The 'Jaago Grahak Jaago' campaign, run by the Consumer Affairs Department of the Government of India, and other measures, along with the COPRA helpline, have taken up the cause of consumer awareness and made consumer rights more meaningful.

Presentation: the project should be written up with the family/shop interview details, a photo or bill of the defective product if available, and a one-paragraph conclusion on what the consumer should have done differently, since this is scored as internal assessment on originality, presentation and correct application of the rights and redressal machinery — not recalled for the board theory exam.`,
    keywords: [
      "PROJECT WORK — not in the 80-mark theory paper",
      "Right to Information / Right to Safety / Right to Seek Redressal",
      "three-tier redressal machinery — district, state, national",
      "COPRA, 1986",
      "Jaago Grahak Jaago campaign",
      "consumer awareness / helpline",
    ],
    examinerTip:
      "Consumer Rights is assessed only as the 20-mark internal project, never as a theory-paper question — do not spend board-revision time memorising this as if it carries theory marks. For the project itself, the marks are for correctly matching the right and the forum to the real case investigated, not for reciting the chapter.",
  },

  // ==========================================================================
  // ENGLISH — First Flight (jeff1)
  // ==========================================================================
  {
    id: "q-c10-english-02-1",
    subjectId: "c10-english",
    chapterId: "c10-english-02",
    classLevel: 10,
    text:
      "Read the extract and answer the question that follows.\n\n" +
      "'The way a crow\nShook down on me\nThe dust of snow\nFrom a hemlock tree\n\n" +
      "Has given my heart\nA change of mood\nAnd saved some part\nOf a day I had rued.'\n\n" +
      "Why has Robert Frost chosen the crow and the hemlock tree rather than a more pleasant bird and tree? What effect does this choice create? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `The crow and the hemlock tree are deliberately chosen because both are traditionally symbols of sorrow and gloom — the crow is a black, harsh-voiced bird associated with bad omens, and the hemlock is a poisonous tree. Frost does not choose a songbird or a flowering tree because he wants the setting to match his depressed mood, the mood of a day he 'had rued'.

The effect is one of irony and contrast: it is precisely these gloomy, unpleasant objects that give his heart 'a change of mood' and save part of his ruined day. Through this symbolism Frost conveys that even the smallest, most ordinary and seemingly unpromising moments in nature have the power to heal a troubled mind, and that joy can come from unexpected sources.`,
    keywords: [
      "crow and hemlock — symbols of sorrow / gloom / bad omen",
      "hemlock is a poisonous tree",
      "symbolism",
      "irony / contrast",
      "change of mood",
      "healing power of nature",
    ],
    examinerTip:
      "Half the marks here are for naming the device (symbolism, and the resulting irony). Students explain the mood change but never say WHY the negative images matter — the contrast is the answer, not a decoration on it.",
  },
  {
    id: "q-c10-english-04-1",
    subjectId: "c10-english",
    chapterId: "c10-english-04",
    classLevel: 10,
    text: "'It is not the absence of fear but the triumph over it that makes a man brave.' In the light of Nelson Mandela's 'Long Walk to Freedom', discuss Mandela's ideas of courage and of freedom, and what they teach us. (100–120 words)",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Nelson Mandela, speaking after his inauguration as the first black President of South Africa on 10 May 1994, redefines both courage and freedom through his own experience.

Courage: Mandela says that in the decades of struggle he saw men and women risk and give their lives for an idea, and he learned that courage was not the absence of fear, but the triumph over it. In his words, the brave man is not he who does not feel afraid, but he who conquers that fear. Courage, therefore, is not fearlessness but persistence in spite of fear — and he had felt fear more times than he could remember, yet hid it behind a mask of boldness.

Freedom: as a boy Mandela thought he was born free — free to run in the fields, to swim in the clear stream, to roast mealies under the stars. But he slowly realised that these were only 'transitory freedoms', and that his boyhood freedom was an illusion, because as a black man he was not free to be a man of his own choosing. His hunger for his own freedom then became a greater hunger for the freedom of his people. He also insists that the oppressor must be liberated just as surely as the oppressed, for a man who takes away another man's freedom is a prisoner of hatred, locked behind the bars of prejudice and narrow-mindedness.

What it teaches us: Mandela teaches that true bravery lies in facing our fears rather than pretending we have none, and that freedom is indivisible — no one is truly free while others are in chains. His twin obligations, to his family and to his people, show that personal courage must be placed at the service of a just cause. His life proves that love comes more naturally to the human heart than hate.`,
    keywords: [
      "courage is the triumph over fear, not the absence of fear",
      "transitory freedoms",
      "freedom was an illusion",
      "hunger for his own freedom became hunger for the freedom of his people",
      "the oppressor must be liberated just as surely as the oppressed",
      "prisoner of hatred / bars of prejudice and narrow-mindedness",
    ],
    examinerTip:
      "This is a value-based long answer, not a summary of the inauguration ceremony. Quote Mandela's own lines on fear and on 'transitory freedoms', and close with the takeaway — answers that merely narrate the chapter lose the analysis and value marks.",
  },
  {
    id: "q-c10-english-08-1",
    subjectId: "c10-english",
    chapterId: "c10-english-08",
    classLevel: 10,
    text: "In 'The Ball Poem', why does the poet not offer the boy money to buy another ball? What does the boy finally learn? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `The poet does not offer money because the ball is not merely a toy that can be replaced — it stands for the boy's happy, carefree childhood and all the memories attached to it. As the poet says, 'Money is external'; a new ball bought with money would not restore what has been lost. Buying him another ball would also cheat him of a lesson he must learn for himself, so the poet deliberately stands back and lets him grieve.

What the boy learns is 'the epistemology of loss' — the knowledge of what loss means. He learns that in this world of possessions things once lost are gone forever, that grief must be experienced and not escaped, and that he must 'stand up' and take responsibility, accepting a truth every man must one day know.`,
    keywords: [
      "ball symbolises childhood / memories, not a toy",
      "Money is external",
      "cannot be replaced / lost forever",
      "epistemology of loss",
      "how to stand up",
      "responsibility / growing up / accepting loss",
    ],
    examinerTip:
      "The marked phrase is 'the epistemology of loss' — an answer that stops at 'the boy was sad about his ball' gets no analysis mark. State that the ball is a SYMBOL of lost childhood before explaining the lesson.",
  },
  {
    id: "q-c10-english-14-1",
    subjectId: "c10-english",
    chapterId: "c10-english-14",
    classLevel: 10,
    text:
      "Read the extract and answer the question that follows.\n\n" +
      "'The fog comes\non little cat feet.\n\nIt sits looking\nover harbor and city\non silent haunches\nand then moves on.'\n\n" +
      "The phrase 'on silent haunches' chiefly conveys that the fog\n" +
      "(a) rushes noisily across the harbour\n" +
      "(b) settles quietly and motionlessly, crouching like a cat\n" +
      "(c) is frightened of the city below\n" +
      "(d) destroys everything it touches",
    marks: 1,
    type: "mcq",
    source: "sample",
    answer: `(b) settles quietly and motionlessly, crouching like a cat.

The whole poem rests on a single sustained metaphor in which Carl Sandburg compares the fog to a cat without using 'like' or 'as'. 'Haunches' are the hind legs on which a cat crouches; 'silent haunches' therefore pictures the fog squatting noiselessly and stilly over the harbour and city, watching, before it 'moves on'. The three cat images map onto three qualities of fog — 'little cat feet' (it arrives stealthily and soundlessly), 'sits looking… on silent haunches' (it settles motionless and silent), and 'moves on' (it drifts away as suddenly and indifferently as a cat).`,
    keywords: ["metaphor", "sustained/extended comparison of fog to a cat", "silent", "still / crouching", "stealth"],
    examinerTip:
      "Extract MCQs on 'Fog' test the metaphor, not vocabulary. If asked to name the device, write METAPHOR, not simile — there is no 'like' or 'as' anywhere in the poem, and calling it a simile costs the mark outright.",
  },
  {
    id: "q-c10-english-19-1",
    subjectId: "c10-english",
    chapterId: "c10-english-19",
    classLevel: 10,
    text: "'The Proposal' is a farce. Justify this by referring to the quarrels between Lomov and Natalya. (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `A farce is a comedy built on exaggerated, improbable situations and ridiculous behaviour, and Chekhov's one-act play is exactly that.

Lomov, a nervous thirty-five-year-old landowner, comes formally dressed to Chubukov's house to propose to Natalya. Before he can propose, he mentions Oxen Meadows, and the two quarrel violently over the ownership of a worthless strip of land — with Chubukov joining in and abusing Lomov, who leaves in a fit of palpitations. When Natalya learns he had come to propose, she screams for him to be brought back; but the moment he returns they begin a second, equally absurd quarrel over whose dog is better, Lomov's Guess or Natalya's Squeezer.

The farce is complete at the end: Chubukov thrusts their hands together and hurries the marriage through, and even as they are declared engaged the couple resume quarrelling about the dogs. The characters argue over trifles instead of the matter at hand, and the marriage succeeds despite, not because of, their courtship — which is the comic point of the play.`,
    keywords: [
      "farce — exaggerated, improbable situations",
      "quarrel over Oxen Meadows",
      "quarrel over the dogs Guess and Squeezer",
      "trivial issues",
      "Chubukov joins the quarrel / thrusts their hands together",
      "quarrelling even after the engagement",
    ],
    examinerTip:
      "Both quarrels must be named with their subjects (Oxen Meadows AND the dogs) — one example is not a justification. The clinching detail is that they are still quarrelling after Chubukov marries them off.",
  },

  // ==========================================================================
  // ENGLISH — Footprints Without Feet (jefp1)
  // ==========================================================================
  {
    id: "q-c10-english-24-1",
    subjectId: "c10-english",
    chapterId: "c10-english-24",
    classLevel: 10,
    text: "'Griffin was a brilliant scientist, but a lawless person.' Discuss with reference to 'Footprints without Feet', and explain what the story teaches about science and responsibility. (100–120 words)",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Griffin's brilliance: Griffin was indeed a brilliant scientist. He carried out experiment after experiment to prove that the human body could become invisible, and finally swallowed rare drugs that made his body as transparent as a sheet of glass, though it remained as solid as ever. It was a discovery no one before him had made.

His lawlessness: however, every use he made of that discovery was criminal. When his landlord, who disliked him, tried to eject him, Griffin set fire to the house in revenge and, to escape unseen, removed his clothes and became invisible. In London he found being invisible in mid-winter meant walking about naked in the cold; he entered a big London store for warmth, helped himself to clothes and food, and when the assistants discovered him he had to strip and flee again. He then robbed a theatrical company's shop in Drury Lane, attacking the shopkeeper from behind, knocking him out and stealing his money along with bandages, dark glasses, false nose and a hat. He fled to the quiet village of Iping with stolen money, took rooms at the inn, and when the money ran out he burgled the clergyman's study. When Mrs Hall the landlady confronted him and Constable Jaffers tried to arrest him, he flung off his bandages and knocked people about — 'an eccentric scientist' turned homeless wanderer and thief.

What it teaches: Wells shows that scientific genius without moral responsibility becomes destructive. Griffin's invisibility, which could have benefited humanity, is used only for arson, theft and assault, and in the end it makes him a lonely fugitive, unable even to live among people. Science must be governed by ethics and law; power without responsibility harms both society and the scientist himself.`,
    keywords: [
      "brilliant scientist — rare drugs made his body transparent",
      "set fire to the landlord's house",
      "robbed the theatrical company's shop in Drury Lane",
      "burgled the clergyman's study at Iping",
      "eccentric scientist / lawless person / homeless wanderer",
      "science without responsibility is destructive",
    ],
    examinerTip:
      "The question has two halves — brilliance AND lawlessness — plus a value conclusion. Students narrate the Iping episodes only; you must first prove the brilliance (the drugs, the transparency) and then list at least three separate crimes, closing with the science-and-ethics point.",
  },
  {
    id: "q-c10-english-26-1",
    subjectId: "c10-english",
    chapterId: "c10-english-26",
    classLevel: 10,
    text: "In 'The Necklace', what would you have done in Matilda's place after losing the necklace? Justify your answer with reference to the story. (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `In Matilda's place I would have gone straight to Madame Forestier and confessed the truth about the lost necklace.

Justification from the story: Madame Forestier was a generous friend who had lent the necklace readily and without hesitation, and she never even opened the case when it was returned — which shows she attached little value to it. Had Matilda confessed, she would have learnt at once that the necklace was an imitation, worth at most five hundred francs, and not a diamond one worth thirty-six thousand.

Instead, false pride and the fear of being thought dishonest made the Loisels replace it secretly, borrowing at ruinous terms, and they spent ten long years in dreadful drudgery — Matilda doing the housework, washing and bargaining in the streets — to repay the debt, losing her youth and beauty for nothing. The lesson is that honesty at the right moment would have saved a decade of suffering, and that we should be content with what we have rather than live on vain appearances.`,
    keywords: [
      "confessed the truth to Madame Forestier",
      "the necklace was an imitation / worth at most five hundred francs",
      "false pride / vanity",
      "ten years of drudgery to repay the debt",
      "honesty",
      "contentment / do not live on appearances",
    ],
    examinerTip:
      "This is a value-based question: the marked answer is 'confess immediately', and it must be JUSTIFIED from the text. Answers that only retell the twist, or that praise Matilda's hard work without naming her pride, miss the value point.",
  },

  // ==========================================================================
  // ENGLISH — Writing Skills (filed under Ch 1, 'A Letter to God')
  // ==========================================================================
  {
    id: "q-c10-english-01-1",
    subjectId: "c10-english",
    chapterId: "c10-english-01",
    classLevel: 10,
    text:
      "WRITING SKILLS (Formal Letter). In 'A Letter to God' Lencho writes to the one authority he trusts. In your town, too, people have no one to turn to: the streets of your locality have remained waterlogged since the last spell of rain, causing traffic jams and the spread of disease, and repeated complaints to the municipal office have gone unanswered.\n\n" +
      "You are Karan / Karuna of 24, Mall Road, Dehradun. Write a letter to the Editor of a national daily, drawing the attention of the authorities to the problem and suggesting remedial measures. (100–120 words)",
    marks: 5,
    type: "la",
    source: "important",
    answer: `24, Mall Road
Dehradun

15 December 20XX

The Editor
The Times of India
Dehradun

Subject: Waterlogging in the streets of Mall Road locality

Sir

Through the columns of your esteemed daily, I wish to draw the attention of the municipal authorities to the acute problem of waterlogging in our locality.

Ever since the last spell of rain, the streets of Mall Road have remained under stagnant water because the drains are choked and have not been desilted for months. Traffic crawls through the flooded stretch and jams are a daily ordeal, while pedestrians and school children wade through filthy water. Worse, the stagnant pools have become breeding grounds for mosquitoes, and cases of dengue and malaria have already been reported in the area. Repeated written complaints to the municipal office have gone unanswered.

I therefore urge the authorities to desilt and repair the drains immediately, to install a pumping arrangement at the low-lying crossing, to fill the potholes, and to have the area fogged regularly. Prompt action will spare the residents a great deal of hardship and ill health.

Thanking you

Yours truly
Karan`,
    keywords: [
      "sender's address, date, receiver's designation and address",
      "Subject line",
      "salutation 'Sir' and 'Yours truly'",
      "problem — choked drains, waterlogging, traffic jams, mosquitoes/disease",
      "authorities' inaction despite complaints",
      "suggested remedies — desilting, pumping, fogging, repair of roads",
    ],
    examinerTip:
      "Marks split as Format 1, Content 2, Expression/Accuracy 2. The commonest losses are a missing SUBJECT line and no suggested remedies — a letter that only complains cannot get full content marks. Keep it 100-120 words and formal; no contractions, no 'Dear Editor'.",
  },
];
