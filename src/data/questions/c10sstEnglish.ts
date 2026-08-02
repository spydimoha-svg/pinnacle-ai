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
    id: "q-c10-sst-01-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-01",
    classLevel: 10,
    text: "Explain the process of unification of Germany under the leadership of Otto von Bismarck.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Nationalism in Germany was carried forward under Prussian leadership, with Prussia taking on the leadership of the movement for national unification.

(i) Zollverein — in 1834, a customs union, the Zollverein, was formed at the initiative of Prussia and joined by most German states. It abolished tariff barriers and reduced the number of currencies from over thirty to two, creating a sense of economic unity among the German states even before political unification.

(ii) Three wars — the architect of German unification was Prussian Chancellor Otto von Bismarck, carried out with the help of the Prussian army and bureaucracy. Prussia fought three wars — with Austria, Denmark and France — over seven years, which ended in Prussian victory and completed the process of unification.

(iii) Proclamation at Versailles — on 18 January 1871, an assembly comprising princes of the German states and representatives of the army gathered at Versailles to proclaim the new German Empire headed by Kaiser William I of Prussia.

Thus German unification was achieved through Prussian military strength and diplomacy rather than through a popular liberal-democratic movement.`,
    keywords: [
      "Zollverein customs union, 1834",
      "Otto von Bismarck / Prussia led unification",
      "three wars — Austria, Denmark, France",
      "Kaiser William I proclaimed at Versailles, 1871",
      "Prussian army and bureaucracy",
    ],
    examinerTip:
      "Germany's unification is remembered for being led 'from above' by Prussian state power, unlike a popular movement — say this explicitly, and name Versailles, 1871.",
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
    id: "q-c10-sst-03-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-03",
    classLevel: 10,
    text: "What were the Bretton Woods institutions? Explain the role of the International Monetary Fund (IMF) and the World Bank.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The Bretton Woods Conference of July 1944 established the International Monetary Fund (IMF) and the World Bank, known as the Bretton Woods institutions, to finance post-war reconstruction and manage the economic problems of the international economy.

(i) International Monetary Fund (IMF) — set up to deal with external surpluses and deficits of its member nations, and to maintain stability of exchange rates between currencies as part of the international monetary system.

(ii) World Bank — set up to finance the reconstruction of the war-ravaged economies of Europe, and later to finance infrastructure and development projects in developing countries.

(iii) Fixed exchange rate — the Bretton Woods system was based on fixed exchange rates, in which national currencies were pegged to the US dollar at a fixed exchange rate, and the dollar itself was anchored to gold at a fixed price of $35 per ounce.

The Bretton Woods institutions thus began a new phase of international economic cooperation and are today powerful institutions guiding the financial and monetary policies of the world.`,
    keywords: [
      "Bretton Woods Conference, July 1944",
      "IMF — external surpluses/deficits, exchange rate stability",
      "World Bank — reconstruction and development finance",
      "fixed exchange rate system",
      "dollar pegged to gold at $35 per ounce",
    ],
    examinerTip:
      "State the year (1944) and both institutions by name with their DISTINCT roles — students merge the IMF and the World Bank into one vague description and lose the differentiation marks.",
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
    id: "q-c10-sst-04-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-04",
    classLevel: 10,
    text: "What is meant by proto-industrialisation? Explain with reference to Europe.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Proto-industrialisation refers to the phase of industrialisation that was not based in factories but was linked to large-scale industrial production for an international market, before the coming of factories in England and Europe.

(i) Merchants moving to the countryside — merchants from towns in Europe began moving to the countryside, supplying money to peasants and artisan households and persuading them to produce for an international market, since production within towns was regulated by powerful trade guilds that controlled prices and restricted the entry of new merchants.

(ii) Symbiotic relationship with agriculture — poor peasants and artisans eagerly agreed to work for the merchants because it added to their meagre income from cultivation, which was shrinking due to the subdivision of land, and allowed a fuller use of family labour resources.

(iii) Town-country link — merchants were based in towns but the work was done mostly in the countryside; this decentralised production system, in which the merchant clothier controlled the market while production took place within the rural household, is what is called proto-industrialisation.

Thus proto-industrialisation was a rural, household-based system that expanded production well before factories were built.`,
    keywords: [
      "large-scale production for an international market",
      "before factories existed",
      "merchants moved to the countryside",
      "trade guilds restricted urban production",
      "peasant households / part-time rural work",
      "merchant clothier controlled the market",
    ],
    examinerTip:
      "The definition hinges on TWO things — an international market AND no factory — losing either half is a half-mark answer. Name the trade-guild restriction as the reason merchants left the towns.",
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
  {
    id: "q-c10-sst-05-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-05",
    classLevel: 10,
    text: "Explain how print culture created the conditions within which the French Revolution occurred.",
    marks: 3,
    type: "sa",
    source: "pyq",
    answer: `Historians have argued that print culture created the conditions within which the French Revolution occurred, in the following ways:

(i) Spread of Enlightenment ideas — print popularised the ideas of thinkers such as Voltaire and Rousseau, whose writings were read widely and discussed critically. These ideas emphasised the rule of reason rather than custom, and the need to question everything through reason and rationality.

(ii) A new culture of dialogue and debate — print created a new culture where ideas of individual rights and the sovereignty of the people were debated, popularising the ideas of thinkers who challenged the authority of the church and the despotic power of the state, eroding the legitimacy of the Old Regime.

(iii) Common questioning of established beliefs — by the 1780s there was an outpouring of literature that mocked royalty and criticised their morality, and by the time the revolution broke out, people were convinced that their action could change society, a belief print had helped create.

Thus, while it would be wrong to say print directly caused the revolution, it did create the conditions for the people to think differently and question established authority.`,
    keywords: [
      "Enlightenment thinkers — Voltaire and Rousseau",
      "rule of reason",
      "criticism of monarchy / despotism",
      "print created conditions, did not directly cause the revolution",
      "new culture of dialogue and debate",
    ],
    examinerTip:
      "The exact CBSE phrasing is 'print did not directly cause the Revolution but created the CONDITIONS for it' — omitting this qualifying line is a common half-mark loss.",
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
    id: "q-c10-sst-06-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-06",
    classLevel: 10,
    text: "Distinguish between alluvial soil and black soil with reference to their formation and distribution in India.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) Formation — alluvial soil is formed mainly by the deposition of silt carried by rivers, and covers the vast plains stretching from Punjab to the deltas of the eastern coast. Black soil, on the other hand, is formed from the weathering of lava rock flows and is ideal for growing cotton, hence also called regur soil or black cotton soil.

(ii) Distribution — alluvial soil is found in the northern plains and river valleys, including the deltas of the eastern coast, and covers about 40 per cent of the total area of the country. Black soil is spread over the Deccan trap, covering most of the Maharashtra plateau and parts of Gujarat, Madhya Pradesh and the north-western Deccan plateau.

(iii) Fertility and moisture — alluvial soils are generally very fertile and are ideal for growing sugarcane, paddy, wheat and other cereal and pulse crops. Black soils are made up of extremely fine clayey material, are well known for their capacity to hold moisture, and are rich in soil nutrients such as calcium carbonate, magnesium, potash and lime, but are poor in phosphoric content.

Thus alluvial soil is river-formed and covers the northern plains, whereas black soil is lava-derived and covers the Deccan plateau.`,
    keywords: [
      "alluvial soil — deposited by rivers",
      "black soil — weathering of lava / Deccan trap",
      "black soil = regur / black cotton soil",
      "alluvial in northern plains, about 40% of area",
      "black soil in Maharashtra plateau / Deccan trap",
      "black soil holds moisture, rich in lime/calcium/potash",
    ],
    examinerTip:
      "'Regur' and 'black cotton soil' are the exact NCERT names for black soil — using them earns the identification mark even if the rest of the answer is thin.",
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
    id: "q-c10-sst-07-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-07",
    classLevel: 10,
    text: "What is Project Tiger? Explain any two of its measures for conserving the tiger population in India.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Project Tiger, launched in 1973, is a centrally sponsored wildlife conservation project in India aimed at ensuring a viable population of tigers in their natural habitat.

(i) Reason for the project — the tiger population in India, estimated at 55,000 at the turn of the century, had dropped to 1,827 by 1973, largely due to poaching for trade, shrinking habitat and depletion of the prey base, since tiger skin had traditionally been in great demand and its parts have been used in traditional medicines in various countries.

(ii) Creation of tiger reserves — the project established several tiger reserves across India (for example, Corbett National Park in Uttarakhand, Sunderbans National Park in West Bengal and Bandhavgarh National Park in Madhya Pradesh), keeping core areas free from human activities such as forestry, grazing and hunting.

(iii) Poaching control and monitoring — Project Tiger involved strict anti-poaching measures, protection of the tiger's habitat and prey base, and periodic census of the tiger population, and it has been credited with stabilising and, in later years, increasing the tiger population.

Thus Project Tiger combines habitat protection, anti-poaching enforcement and scientific monitoring to conserve India's tiger population.`,
    keywords: [
      "Project Tiger launched 1973",
      "tiger population fell from 55,000 to 1,827",
      "poaching / shrinking habitat / depleting prey base",
      "tiger reserves — Corbett, Sunderbans, Bandhavgarh",
      "core areas free from human activity",
      "anti-poaching measures / census",
    ],
    examinerTip:
      "The population figures (55,000 falling to 1,827) are a fixed NCERT statistic examiners check for — quote them, and name at least one actual tiger reserve rather than saying 'reserves were set up'.",
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
    id: "q-c10-sst-08-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-08",
    classLevel: 10,
    text: "Describe any three traditional methods of rainwater harvesting practised in different parts of India.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `In ancient India, people had an in-depth knowledge of rainwater harvesting techniques and practised it through structures suited to the local ecological conditions.

(i) Guls or kuls of the Western Himalayas — in the hill and mountain regions, people built diversion channels called guls or kuls, which carried water from mountain streams to the fields for agriculture.

(ii) Rooftop rainwater harvesting in Rajasthan — in the arid and semi-arid regions of Rajasthan, particularly Bikaner, Phalodi and Barmer, almost all houses had underground tanks called tankas for storing drinking water, connected to rooftop catchment areas through pipes.

(iii) Khadins and johads — in western Rajasthan, embankments called khadins were built to harvest streams for irrigation, while in other regions small check dams called johads collected rainwater and improved percolation and groundwater recharge.

(iv) Bamboo drip irrigation in Meghalaya — a 200-year-old system of tapping stream and spring water using bamboo pipes channels water over hundreds of metres to water the roots of a plant drop by drop.

Thus rainwater harvesting methods across India were designed to suit the local terrain, rainfall and needs of the people.`,
    keywords: [
      "guls / kuls — Western Himalayas",
      "rooftop harvesting / tankas — Rajasthan (Bikaner, Phalodi)",
      "khadins — embankments for irrigation",
      "johads — check dams",
      "bamboo drip irrigation — Meghalaya",
    ],
    examinerTip:
      "Each method needs its NAMED region attached — 'people harvested rainwater in tanks' with no place name earns almost nothing. Tankas and khadins in Rajasthan are the most commonly tested pair.",
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
    id: "q-c10-sst-09-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-09",
    classLevel: 10,
    text: "Explain any three institutional and technological reforms introduced by the Government of India to modernise agriculture.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) Green Revolution — the government initiated the Green Revolution, based on the use of package technology (high-yielding variety seeds, chemical fertilisers, pesticides, assured irrigation), though these benefits were not spread evenly and remained concentrated in states like Punjab, Haryana and western Uttar Pradesh.

(ii) Land reforms — after Independence, land reforms became the first priority, with the abolition of the zamindari system and other steps taken to change the ownership of landholdings, so that ownership rights were given to the tenants who had actual possession of the land.

(iii) Minimum support price — in the 1980s and 1990s, the government provided a minimum support price (MSP) for important crops to check speculation and hoarding, and to ensure that farmers get remunerative and stable prices for their produce.

(iv) Rural credit and insurance — crop insurance against drought, flood, cyclone, fire and disease, and the establishment of Grameen banks and cooperative societies that provide loans to farmers at lower rates of interest, have supported small and marginal farmers; the Kisan Credit Card (KCC) and Personal Accident Insurance Scheme (PAIS) are examples of such measures.

Thus land reforms, the Green Revolution, price support and rural credit together modernised Indian agriculture, though regional disparities remain.`,
    keywords: [
      "Green Revolution — HYV seeds, fertilisers, irrigation",
      "land reforms / abolition of zamindari",
      "minimum support price (MSP)",
      "crop insurance",
      "Kisan Credit Card (KCC)",
      "Grameen banks / cooperative credit",
    ],
    examinerTip:
      "Name the specific instruments — MSP, KCC, crop insurance — a general line like 'the government helped farmers' earns no marks. Note that Green Revolution benefits were regionally uneven (Punjab, Haryana, western UP).",
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
    id: "q-c10-sst-10-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-10",
    classLevel: 10,
    text: "Why is there a need to develop non-conventional sources of energy in India? Explain with any two examples.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(i) Need for non-conventional sources — growing energy consumption has made the country increasingly dependent on fossil fuels such as coal and petroleum, which are limited, non-renewable and cause pollution when used; hence there is a need to shift to non-polluting and renewable sources such as solar, wind, tidal and biogas.

(ii) Solar energy — India is a tropical country with enormous possibilities of tapping solar energy, and photovoltaic technology converts sunlight directly into electricity, which is especially useful in rural and remote areas.

(iii) Wind energy — India now has the largest wind energy generating programme in Asia, and the largest wind farm cluster is located in Tamil Nadu, from Nagercoil to Madurai; wind farms are also found in Andhra Pradesh, Karnataka, Gujarat, Kerala and Maharashtra.

(iv) Biogas — biogas is produced from decomposing farm waste, animal and human waste, especially in rural areas where cattle dung, called gobar gas, provides both fuel and improved-quality manure enriched in nitrogen and phosphorus.

Thus developing non-conventional energy reduces dependence on exhaustible fossil fuels and provides cleaner, decentralised power, especially for rural India.`,
    keywords: [
      "fossil fuels are limited and polluting",
      "solar energy — photovoltaic technology",
      "wind energy — Tamil Nadu (Nagercoil to Madurai) largest cluster",
      "biogas / gobar gas — manure and fuel",
      "largest wind energy programme in Asia",
    ],
    examinerTip:
      "Name the Tamil Nadu wind-farm belt (Nagercoil–Madurai) and 'gobar gas' specifically — a generic 'India uses solar and wind power' answer loses the location and named-example marks.",
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
    id: "q-c10-sst-11-2",
    subjectId: "c10-sst",
    chapterId: "c10-sst-11",
    classLevel: 10,
    text: "Classify industries on the basis of ownership, giving one example of each.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `On the basis of ownership, industries are classified into the following categories:

(i) Public sector — owned and operated by the government, for example Hindustan Aeronautics Limited (HAL), Bharat Heavy Electricals Limited (BHEL) and the Steel Authority of India Limited (SAIL).

(ii) Private sector — owned and operated by individuals or a group of individuals, for example the Tata Iron and Steel Company (TISCO).

(iii) Joint sector — jointly run by the state and individuals or a group of individuals, for example Oil India Limited (OIL), jointly owned by the government and private companies.

(iv) Cooperative sector — owned and operated by the producers or suppliers of raw materials, workers, or both, who pool resources and share the profits or losses proportionally, for example Amul, the dairy cooperative in Gujarat, and the sugar industry cooperatives in Maharashtra.

This classification shows that Indian industry is run through a mix of government, private, joint and cooperative ownership.`,
    keywords: [
      "public sector — HAL / BHEL / SAIL",
      "private sector — TISCO",
      "joint sector — OIL",
      "cooperative sector — Amul / Maharashtra sugar cooperatives",
      "owned and operated by government / individuals / both",
    ],
    examinerTip:
      "Each category needs its NAMED example — writing 'government-owned' and 'privately owned' without the actual company names (SAIL, TISCO, Amul) loses the identification mark for each.",
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
  {
    id: "q-c10-english-03-1",
    subjectId: "c10-english",
    chapterId: "c10-english-03",
    classLevel: 10,
    text: "In Robert Frost's 'Fire and Ice', what do 'fire' and 'ice' stand for? Which force does the poet consider more destructive, and why? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `Fire and ice are used figuratively, not literally. Fire stands for desire — greed, passion and uncontrolled want — while ice stands for hatred — coldness, indifference and cruelty. Both, the poet says, are capable of ending the world.

Frost says that if he had to choose only once, he would say the world will end in fire, siding with those who favour desire as the greater destructive force. But he adds that if the world had to perish twice, his own experience of hatred (ice) is great enough to know that it too would be equally destructive, and 'would suffice'. The poem thus suggests that unchecked desire and unchecked hatred are equally capable of destroying the world.`,
    keywords: [
      "fire = desire",
      "ice = hatred",
      "world will end in fire (favours desire)",
      "hatred / ice is also great and would suffice",
      "figurative / allegorical reading",
      "both equally destructive",
    ],
    examinerTip:
      "A literal answer about global warming or an ice age scores nothing — the key wants the allegory (fire=desire, ice=hatred) stated explicitly before you explain which one Frost favours.",
  },
  {
    id: "q-c10-english-05-1",
    subjectId: "c10-english",
    chapterId: "c10-english-05",
    classLevel: 10,
    text: "In Leslie Norris's 'A Tiger in the Zoo', contrast the tiger's life in the wild jungle with its life in the cage. (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `The poem is built entirely on the contrast between the tiger's natural freedom and its present captivity.

In the wild, the tiger would have moved quietly, its stripes fitted to the pattern of the forest shadows, and it would have hidden in the tall grass near the water hole, ready to spring at a deer, or terrorised villages, snarling around houses at night. It was a creature of power, cunning and freedom.

In the cage, all of this is denied. It patrols a concrete cell, hardly aware of the few stone-manacled steps it can pace, baring fangs at the strolling crowds instead of at prey, and at night it stares with its eyes at brilliant stars — a hint at its longing for the lost freedom of the wild.`,
    keywords: [
      "wild — stalking in shadow of stripes, near the water hole, terrorising villages",
      "cage — concrete cell, stalking a few short steps",
      "on pads of velvet quiet / cruel claws (wild power)",
      "baring fangs at strolling crowds (captivity)",
      "stares at brilliant stars (longing for freedom)",
      "contrast structure of the poem",
    ],
    examinerTip:
      "The poem alternates jungle stanzas with cage stanzas — answer in the same paired structure (wild, then cage) rather than describing only one state, since the contrast itself is the marked idea.",
  },
  {
    id: "q-c10-english-06-1",
    subjectId: "c10-english",
    chapterId: "c10-english-06",
    classLevel: 10,
    text: "In 'His First Flight' (from 'Two Stories about Flying'), what made the young seagull finally fly? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `The young seagull was afraid to fly. He watched his brothers and sister fly and eat, and though he was hungry, he could not summon the courage to launch himself off the ledge, even after his father and mother tried coaxing, scolding and finally shamed and starved him into trying.

What finally made him fly was hunger, not courage. When his mother flew up to him with a piece of fish, he could not bear the hunger any longer and dived at it — an involuntary lunge that took him off the ledge into the air. Once falling through space, his lifted wings instinctively caught the wind, and he found himself gliding and then flying, discovering that flight came naturally once he stopped being afraid.`,
    keywords: [
      "seagull afraid to fly, unlike his siblings",
      "hunger forced him to act",
      "dived at the piece of fish held by his mother",
      "instinct took over once he was in the air",
      "wings caught the wind / glided",
      "fear versus hunger",
    ],
    examinerTip:
      "Name the trigger precisely — it is hunger for the fish, not sudden courage — since the marking scheme treats 'he decided to be brave' as a paraphrase that misses the actual cause given in the story.",
  },
  {
    id: "q-c10-english-06-2",
    subjectId: "c10-english",
    chapterId: "c10-english-06",
    classLevel: 10,
    text: "In 'Black Aeroplane' (from 'Two Stories about Flying'), who guided the narrator's plane through the storm, and what happens when he reaches the airport? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `Flying over France at night, the narrator's plane runs into a fierce storm with heavy black clouds all around. A mysterious black aeroplane, with a pilot the narrator never sees clearly, appears beside him and silently guides him safely through the storm, out into clear sky, until the narrator can see the lights of the airport.

The black plane then simply disappears — it is not on the airport's radar and no other aircraft was reported flying near him. The woman controller at the airport tells him there was no other plane in the sky that night, leaving the pilot's identity a mystery. The story suggests, without stating outright, that the mysterious pilot may have been a guardian figure or an old, deceased pilot who had once flown that very route.`,
    keywords: [
      "storm with black clouds over France",
      "mysterious black aeroplane guided him",
      "pilot never clearly seen",
      "plane disappears at the airport",
      "no other aircraft was on the radar / reported",
      "mystery left unexplained",
    ],
    examinerTip:
      "'Two Stories about Flying' has two separate stories — always check which one the question names. Do not blend the seagull's hunger with the mystery pilot; they are unrelated in every way except the shared title.",
  },
  {
    id: "q-c10-english-07-1",
    subjectId: "c10-english",
    chapterId: "c10-english-07",
    classLevel: 10,
    text: "How does Carolyn Wells create humour in the poem 'How to Tell Wild Animals'? Give two examples. (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `The poem is a mock-serious set of instructions for identifying wild animals, and its humour lies in the fact that by the time you can apply the 'test' given, the animal has usually already attacked or killed you — the identification method is useless.

Example 1: the poet says if a tawny, tailless beast 'lets you scratch its head', it is a Bear; but if it 'lies on you and eats you', it was a Lion — you identify it only after being eaten.

Example 2: for the Crocodile, if a reptile 'weeps' while eating you, it is a Crocodile, but if it 'gives a friendly little smile', it is only a Hyena — the distinction arrives too late to matter, which is the deliberate absurdity that makes the poem funny.`,
    keywords: [
      "mock-serious / absurd identification instructions",
      "you are already being attacked / eaten before identifying the animal",
      "Bear scratches its head vs Lion lies on you and eats you",
      "Crocodile weeps vs Hyena's friendly smile",
      "irony / exaggeration",
      "coined comic detail (e.g. Bengal Tiger's 'friendly little smile' of Hyena)",
    ],
    examinerTip:
      "Two SEPARATE named examples are wanted (Lion/Bear and Crocodile/Hyena or similar) — a general statement that 'the poem is funny' with no textual detail earns almost nothing.",
  },
  {
    id: "q-c10-english-09-1",
    subjectId: "c10-english",
    chapterId: "c10-english-09",
    classLevel: 10,
    text: "In 'From the Diary of Anne Frank', why did Anne Frank feel the need for a diary, and what happened in the 'Mr Keesing' episode? (100–120 words)",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Anne's need for a diary: Anne says she wants to write because she has no real friend, only acquaintances and fun-loving companions with whom she can never discuss anything beyond everyday things; her many friends and admirers cannot become the intimate friend she longs for. Paper, she feels, has more patience than people, and so she decides to make her diary itself her friend, and to call this friend 'Kitty', since she does not want to set down a series of bald facts as most people do in a diary.

The Mr Keesing episode: Mr Keesing, Anne's maths teacher, was annoyed by her constant talking in class and punished her by setting extra homework — an essay titled 'A Chatterbox'. Anne wrote three sides proving that talking was a feminine trait she had inherited from her mother and that she could not do much to cure herself of the habit, which amused Mr Keesing. He then set 'An Incorrigible Chatterbox', and finally, after Anne talked again, 'Quack, Quack, Quack, said Mistress Chatterback', a title given in fun by a classmate, Sanne. This time Anne wrote a comic poem, describing a mother duck and a father swan who bit their chattering son to death for talking too much, which so amused Mr Keesing that after this he never punished her again and let her talk in class, even making jokes about it.`,
    keywords: [
      "no true friend / paper has more patience than people",
      "diary named 'Kitty'",
      "Mr Keesing — maths teacher annoyed by her talking",
      "essay 'A Chatterbox' / 'An Incorrigible Chatterbox' / 'Quack, Quack, Quack, said Mistress Chatterback'",
      "poem about the mother duck and father swan",
      "Mr Keesing never punished her again after that",
    ],
    examinerTip:
      "Two distinct parts are asked — WHY a diary, and the Keesing episode — students often answer only one. All three essay titles, in order, are separately markable value points; naming just one caps the answer.",
  },
  {
    id: "q-c10-english-10-1",
    subjectId: "c10-english",
    chapterId: "c10-english-10",
    classLevel: 10,
    text: "In Robin Klein's poem 'Amanda!', what does Amanda long for, and how does the poet contrast this with her real life? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `Amanda longs to escape the constant nagging of her mother — to sit properly, stop biting her nails, stand up straight — and imagines herself instead as a mermaid, an orphan and Rapunzel locked in a tower, figures who are all, in their own way, free from adult supervision and interference.

The poet contrasts Amanda's real life, filled with continuous scolding printed in ordinary type, with her fantasy life, printed in italics, where she is unbothered, unbossed and undisturbed. Even Rapunzel, though imprisoned in a tower, is 'never told to do anything' — showing that Amanda would rather be a captive in her own imagination than a supervised child in real life, because her fantasy at least offers freedom from nagging.`,
    keywords: [
      "escape from nagging (sit up, don't bite nails, stand up straight)",
      "fantasy figures — mermaid, orphan, Rapunzel",
      "normal type (mother's nagging) vs italics (Amanda's fantasy)",
      "Rapunzel 'never told to do anything'",
      "longs for freedom from adult supervision",
      "irony — prefers imprisonment in fantasy to freedom in real life",
    ],
    examinerTip:
      "Identify the typography before interpreting: plain text is the mother nagging, italics are Amanda's daydream. Missing this structural cue is the commonest reason students misattribute lines to the wrong speaker.",
  },
  {
    id: "q-c10-english-11-1",
    subjectId: "c10-english",
    chapterId: "c10-english-11",
    classLevel: 10,
    text: "Describe the land and people of Coorg as depicted in 'Glimpses of India'. (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `Coorg, India's smallest district, lies between the mountains of Karnataka, and its unique environment gives it India's best climate. Its steep hills and evergreen rainforests are home to exotic wildlife, and it is also the source of the river Kaveri, which winds its way into Tamil Nadu.

The Kodavus, the people of Coorg, are a martial race — independent, unique and the only people in India permitted to carry firearms without a licence. Historians believe they descend from Arabs, or Greeks who came with Alexander's army, since they wear a kind of kuppia similar to the Kurdish outfits worn by the Arabs, or that they are descendants of Greek soldiers who married locally. Coorg is also known for growing coffee, and its people are as passionate about honouring their martial past — hockey and the army being their favoured pursuits — as they are hospitable to visitors.`,
    keywords: [
      "smallest district of Karnataka",
      "best climate in India / evergreen rainforests",
      "source of the river Kaveri",
      "Kodavus — martial race, allowed to carry firearms without a licence",
      "possible Greek or Arab ancestry",
      "coffee cultivation / hockey and army as favoured pursuits",
    ],
    examinerTip:
      "'Glimpses of India' has three unrelated sub-texts (baker, Coorg, tea) — a Coorg question answered with baker or tea details earns nothing. Name at least one theory of Kodavu ancestry, since it is a distinctive, markable fact.",
  },
  {
    id: "q-c10-english-12-1",
    subjectId: "c10-english",
    chapterId: "c10-english-12",
    classLevel: 10,
    text: "In Adrienne Rich's poem 'The Trees', what does the image of the trees leaving the house symbolise? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `On the surface, the poem describes potted trees inside a house coming to life at night, growing leaves, and slowly forcing their way out through the windows into the forest outside, from where they have long been absent.

Symbolically, the trees represent people, and especially women, who have long been confined indoors, forced into a domesticated, restricted existence. Their painful, halting journey out — 'stumbling', 'like newly discharged patients' — into 'a night that is stormy and full of stars' represents a struggle for freedom and self-realisation after a long confinement, even though that freedom is uncertain and difficult. The moon, watching from indoors, is unable to do anything to help or hinder this movement toward liberation.`,
    keywords: [
      "trees = symbol for confined/domesticated people (often read as women)",
      "leaving the house = breaking free of confinement",
      "extended/sustained metaphor",
      "'stumbling' / 'newly discharged patients' — painful, difficult freedom",
      "night full of stars — the unknown but desired outside world",
      "moon watches helplessly from indoors",
    ],
    examinerTip:
      "A literal answer about houseplants growing outward scores nothing on its own — the marking key wants the extended-metaphor reading (confinement to freedom) stated explicitly.",
  },
  {
    id: "q-c10-english-13-1",
    subjectId: "c10-english",
    chapterId: "c10-english-13",
    classLevel: 10,
    text: "Describe Mijbil's journey from Iraq to England as narrated in Gavin Maxwell's 'Mijbil the Otter'. (100–120 words)",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Gavin Maxwell acquired Mijbil, a smooth-coated otter cub, in Basra, Iraq, to replace a dog he had wanted, after learning that an otter might make an even better pet. Mij quickly became attached to him, following him about like a dog and sleeping curled into the curve of his stomach.

The journey to England was eventful. On the flight from Basra, Mij was confined in a small cabin bag, but he escaped, caused chaos, and had to be recaptured, after which the author had to keep him quiet by taking him to the lavatory and letting him play in the wash-basin with water, which fascinated him. In London, the author had to walk him on a lead to a waiting taxi; a large crowd gathered and someone shouted that it was a baby seal, causing near-panic. Throughout, Mij's playful curiosity, his love of water, and his loud chirming cries when distressed reveal a deep and endearing bond between the otter and his master, which only grew once Mij was safely settled in England.`,
    keywords: [
      "acquired in Basra, Iraq, as a substitute for a dog",
      "escaped from the cabin bag on the flight",
      "played with water in the lavatory wash-basin",
      "mistaken for a baby seal at London airport",
      "walked on a lead / caused a crowd to gather",
      "close, affectionate bond between Mij and the author",
    ],
    examinerTip:
      "Questions on this chapter want specific INCIDENTS with detail (the wash-basin, the baby-seal remark), not a general 'the otter was loved' summary — the events themselves are the value points.",
  },
  {
    id: "q-c10-english-15-1",
    subjectId: "c10-english",
    chapterId: "c10-english-15",
    classLevel: 10,
    text: "In 'Madam Rides the Bus', how did the bus journey change Valli? (100–120 words)",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Valli, an eight-year-old girl living beside a bus stop, was fascinated for a whole year by the ply of buses on the new bus route and desperately wanted to take a ride, all alone, without her mother. She saved every coin she could and finally boarded the bus for Rani, the neighbouring village, refusing all help from fellow passengers, determined to see and experience everything with her own sharp, curious eyes — the paddy fields, canals, cattle, and every detail of the road.

The turning point came when the bus ran over and killed a young calf. Valli, who till then had chattered and argued fearlessly with the conductor and passengers, was suddenly overcome by grief and cried silently, thinking of the calf's mother who would be looking for it. On the return journey she remained quiet, no longer the bold, garrulous child she had been. When she reached home, she did not tell her mother the full truth of what had happened, and simply said the journey was 'nothing much'.

Thus the journey, which began as an adventure driven by curiosity and a desire for independence, ended by giving Valli her first brush with the pain of death and loss, marking a quiet passage out of pure childhood innocence.`,
    keywords: [
      "saved money over a year to ride the bus alone",
      "curious, argumentative, self-reliant on the outward journey",
      "bus runs over and kills a calf",
      "grief / silence overtakes her afterwards",
      "does not tell her mother the full truth",
      "loss of innocence / first encounter with death",
    ],
    examinerTip:
      "The calf's death is the hinge of the whole answer — before-and-after must be shown as a contrast (talkative and fearless, then silent and subdued), not just narrated as one more event in the journey.",
  },
  {
    id: "q-c10-english-16-1",
    subjectId: "c10-english",
    chapterId: "c10-english-16",
    classLevel: 10,
    text: "In Ogden Nash's 'The Tale of Custard the Dragon', how does the poet build up irony around Custard's cowardice? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `The whole household — Belinda, the black cat Ink, the grey mouse Blink and the little pet dog Mustard — are described as bold and brave, always wishing for a fight, while Custard the dragon, with sharp teeth and spikes on top, is repeatedly called a coward who cries for a nice safe cage.

The irony unfolds when a real pirate climbs in through the window: the 'brave' Belinda, Ink, Blink and Mustard all hide in fright, while Custard alone, the supposed coward, gobbles up the pirate to save the household. Once the danger passes, everyone claims they would have been brave too, but Custard now weeps and wishes he were 'only a coward' again — showing that true courage often hides behind an apparent coward, while the boastfully brave prove cowardly when real danger appears.`,
    keywords: [
      "Belinda, Ink, Blink, Mustard called brave; Custard called coward",
      "real pirate climbs through the window",
      "the 'brave' ones hide; Custard alone fights",
      "Custard swallows the pirate",
      "role reversal / irony",
      "everyone claims bravery afterwards, but Custard wishes to be a coward again",
    ],
    examinerTip:
      "The word IRONY (or 'reversal') should appear explicitly in the answer — describing the plot without naming the device is treated as a narration, not the analysis the question actually asks for.",
  },
  {
    id: "q-c10-english-17-1",
    subjectId: "c10-english",
    chapterId: "c10-english-17",
    classLevel: 10,
    text: "In 'The Sermon at Benares', how does the Buddha use the parable of the mustard seed to console Kisa Gotami? What is the sermon's message? (100–120 words)",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Kisa Gotami, grief-stricken after the death of her only son, carried his body from house to house begging for medicine to bring him back to life. Someone directed her to the Buddha, who told her he could restore her son if she brought him a handful of mustard seed from a house where no one — father, mother, child, servant or friend — had ever died.

Kisa Gotami went from house to house; every family readily gave her mustard seed, but she could not find a single house that had not lost someone to death. As the day wore on, she realised the truth the Buddha wanted her to discover for herself: that death is not confined to her alone, but is the common and universal lot of all living things, and that there is no cure for it. She then understood that grief must give way to acceptance, buried her son, and returned to the Buddha, who preached the sermon at Benares that unrest and pain lie in wanting things to last forever when nothing does; only by giving up craving and self can one attain peace, since everyone must eventually pass through the same 'flood' as her child had.`,
    keywords: [
      "Kisa Gotami's dead son / seeking medicine to revive him",
      "Buddha's condition — mustard seed from a house where no one has died",
      "she finds every house has lost someone",
      "death is universal / common lot of all",
      "acceptance of grief, buries the child",
      "craving and attachment cause pain; giving them up brings peace",
    ],
    examinerTip:
      "The value the examiner wants is that Kisa Gotami discovers the truth HERSELF through the failed search, not that the Buddha simply tells her death is universal — the parable's method (self-realisation) is as markable as its content.",
  },
  {
    id: "q-c10-english-18-1",
    subjectId: "c10-english",
    chapterId: "c10-english-18",
    classLevel: 10,
    text: "In W. B. Yeats's poem 'For Anne Gregory', what does the young man mean when he says only God could love Anne 'for herself alone'? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `The poem is a dialogue: a young man tells Anne, admired for her lovely yellow hair, that men can never love her 'for herself alone' — they will always be captivated by her outer, physical beauty, her 'yellow hair', rather than by her inner self.

Anne protests that she could dye or change her hair colour to test whether men would still love her for who she truly is. But the young man insists that this will not work, because it is human nature to be drawn to external appearance; only God, who looks into the heart rather than at appearances, is capable of loving a person purely for her inner self, regardless of outward beauty. The poem thus contrasts superficial, appearance-based human love with the ideal of a deeper, unconditional love.`,
    keywords: [
      "dialogue form — young man and Anne",
      "'yellow hair' = symbol of physical/outer beauty",
      "men love for outer appearance, not inner self",
      "Anne's proposal to dye her hair",
      "only God can love for the self alone",
      "contrast between physical and inner beauty",
    ],
    examinerTip:
      "Identify the SPEAKER of each stanza first — this is a two-voice dialogue and misattributing a line to the wrong speaker is the commonest error the marking scheme penalises.",
  },
  {
    id: "q-c10-english-20-1",
    subjectId: "c10-english",
    chapterId: "c10-english-20",
    classLevel: 10,
    text: "In James Herriot's 'A Triumph of Surgery', what was really wrong with Tricki, and how was he actually cured? Why is the title ironic? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `Tricki, Mrs Pumphrey's pampered pet dog, was not suffering from any disease requiring surgery. He was overfed with rich food, chocolates, cream cakes and titbits at every hour, and given no exercise, which made him listless, overweight, and unable even to stand properly.

Dr Herriot's 'cure' was simply to admit Tricki to the surgery for a fortnight, cut off the extra feeding entirely, and let him exercise and mix with the other dogs, feeding him a normal diet instead. Tricki recovered completely within a fortnight, active and playful once again. The title is ironic because no actual surgery was performed — the 'triumph' was really achieved through withdrawal of excessive food and normal exercise, exposing the harm caused by Mrs Pumphrey's over-indulgent love.`,
    keywords: [
      "overfeeding and lack of exercise, not disease",
      "admitted to the surgery, kept off rich food",
      "normal diet and exercise with other dogs",
      "recovered within a fortnight",
      "no actual surgery performed",
      "title is ironic",
    ],
    examinerTip:
      "State explicitly that NO surgery took place — the irony of the title is a separately marked point, and an answer that only describes the diagnosis and recovery without naming the irony is incomplete.",
  },
  {
    id: "q-c10-english-21-1",
    subjectId: "c10-english",
    chapterId: "c10-english-21",
    classLevel: 10,
    text: "In Ruskin Bond's 'The Thief's Story', how does Anil's trust change Hari Singh? (100–120 words)",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Hari Singh, a fifteen-year-old orphan and practised thief, befriends Anil, a young man who earns his living by wrestling and freelance writing, and persuades him to teach him wrestling in exchange for food and a place to sleep. Anil, though poor himself, trusts Hari completely, teaches him to read and write, and even leaves money lying about, seemingly careless of it.

One night, after Anil receives a large sum of money from selling a story, Hari Singh steals it and runs to the railway station, planning to catch a train and escape. But at the station, he begins to think of Anil's kindness and trust, and realises he cannot become a full-fledged thief, jumping trains and picking pockets forever, when Anil had begun teaching him something worthwhile. Ashamed, he returns before dawn, replaces the money where he found it, and stays on, waiting for Anil to teach him more. The next morning, Anil, who had apparently realised the money was gone and returned, makes no mention of the theft at all — his silent trust and refusal to accuse Hari is what finally reforms him, more effectively than any punishment could have.`,
    keywords: [
      "Hari Singh — orphan, practised thief, befriends Anil",
      "Anil teaches him to read and write, trusts him with money",
      "steals the money after the sale of Anil's story",
      "changes his mind at the railway station",
      "returns the money before dawn",
      "Anil never mentions the theft — silent trust reforms Hari",
    ],
    examinerTip:
      "The reform happens BEFORE Hari knows Anil is aware of the theft — his change of heart is driven by his own conscience and Anil's earlier kindness, not by fear of being caught. Anil's silence afterward is the confirming, not the causing, act.",
  },
  {
    id: "q-c10-english-22-1",
    subjectId: "c10-english",
    chapterId: "c10-english-22",
    classLevel: 10,
    text: "In Robert Arthur's 'The Midnight Visitor', how does Ausable outwit Max without using any weapon? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `Max, a spy, breaks into secret agent Ausable's hotel room at gunpoint, demanding a valuable report on defence plans that Ausable is carrying. Ausable, fat and unglamorous, unlike the fictional secret agents Fowler (a young reporter present) had imagined, calmly tells Max that the balcony outside is used constantly by the police, since it is being used for that purpose to catch smugglers.

When a knock comes at the door, Ausable claims it is the waiter with dinner, and warns Max that if the waiter finds an armed intruder, the ensuing scandal could embarrass Max's superiors — so Max, panicked, hides on the (non-existent) balcony to avoid being seen, and disappears into the night, having never really existed. Ausable defeats Max entirely through wit, presence of mind and quick invention, not through any weapon or physical action, which is the story's central twist.`,
    keywords: [
      "Max breaks in at gunpoint demanding the report",
      "Ausable invents a story about the balcony being watched by police",
      "knock at the door used as a pretext",
      "Max hides on the balcony, which does not exist",
      "Max disappears / falls to his 'death' in the invented scenario",
      "wit and presence of mind, not force",
    ],
    examinerTip:
      "The 'balcony' is fictional — the twist is that Ausable's room has NO balcony, and the whole story is a lie constructed on the spot. Missing that the balcony does not exist is the single most common error in retellings.",
  },
  {
    id: "q-c10-english-23-1",
    subjectId: "c10-english",
    chapterId: "c10-english-23",
    classLevel: 10,
    text: "In Victor Canning's 'A Question of Trust', how is Horace Danby, an expert safe-breaker, himself cheated? Why is the story's ending ironic? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `Horace Danby was a respectable, elderly locksmith by day and an accomplished but non-violent safe-breaker by night, who stole once a year, purely to buy rare books he loved, and had never been caught in twenty years.

Planning to rob Shotover Grange while its owner was away, he unexpectedly encountered a woman calling herself Elizabeth, who caught him red-handed but, instead of exposing him, persuaded him to open the safe for her, claiming she needed papers to prevent a divorce. He willingly opened it and handed her the jewels inside; she then gave him a drugged drink, locked him in, and made off with the jewels, leaving Horace to be found by the police and arrested. The irony is that a lifelong thief, always so careful and precise, was himself robbed and betrayed by a bigger, cleverer thief posing as a trusting woman.`,
    keywords: [
      "Horace Danby — respectable locksmith, secret safe-breaker",
      "stole once a year to buy rare books",
      "Elizabeth caught him but persuaded him to open the safe for her",
      "drugged drink / locked in",
      "she takes the jewels and escapes",
      "irony — a thief himself robbed / betrayed",
    ],
    examinerTip:
      "'A Question of Trust' is about trust misplaced twice — Horace trusts Elizabeth, and the title's irony is that the very question of trust defeats the trusting thief himself. State this irony explicitly, not just the plot sequence.",
  },
  {
    id: "q-c10-english-25-1",
    subjectId: "c10-english",
    chapterId: "c10-english-25",
    classLevel: 10,
    text: "What made Richard Ebright 'The Making of a Scientist'? Discuss the role of his mother and his own curiosity. (100–120 words)",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Richard Ebright's development into a scientist began in his childhood, driven above all by intense curiosity. As a boy, he collected butterflies with his mother, who encouraged this hobby by giving him a book, 'The Travels of Monarch X', about the migration of monarch butterflies, which set him on the path of scientific inquiry. He went on to collect all twenty-five species of butterflies found near his home, then moved to collecting other things — rocks, fossils, coins, insects — mounting an ever-growing museum in his room, always guided by his mother's constant encouragement and her habit of asking questions that made him think and read further to find the answers.

At Linsly School, his interest deepened into research. In seventh grade, at a science fair, his hypothesis about a disease killing monarch caterpillars was disproved, but a scientist he met suggested he test whether viruses could be the cause — this led to an award-winning project. In high school, competing at the Bio Genesis Fund research competition, he collaborated on and helped design a synthetic honeybee hormone, work that was published in a scientific journal.

Ebright's own explanation for his success combined native intelligence, an inherited love of science from his mother, competitiveness, and above all, his willingness to work exceedingly hard.`,
    keywords: [
      "curiosity about butterflies from childhood",
      "mother's encouragement — 'The Travels of Monarch X'",
      "collected all 25 local species, then rocks, fossils, coins",
      "monarch caterpillar disease hypothesis / science fair",
      "synthetic honeybee hormone research published",
      "combination of curiosity, mother's encouragement, competitiveness and hard work",
    ],
    examinerTip:
      "The examiner wants the CHAIN of causes — childhood curiosity, then his mother's specific encouragement, then formal research — not just a list of his achievements. Ebright's own stated combination (intelligence, competitiveness, hard work) is a value point worth quoting directly.",
  },
  {
    id: "q-c10-english-27-1",
    subjectId: "c10-english",
    chapterId: "c10-english-27",
    classLevel: 10,
    text: "How does education empower Bholi in K. A. Abbas's story 'Bholi'? (100–120 words)",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Bholi, the fourth daughter of Numberdar Ramlal, was disfigured by an attack of smallpox at ten months and, being slow to speak and learn, was considered ugly and stupid by her family and neighbours, treated with neglect and even cruelty at home.

When a primary school for girls opened in the village, Ramlal was reluctant, but Bholi was sent since the family thought no one would marry her in any case. At school, a kind, patient teacher gave Bholi confidence for the first time in her life, and she gradually blossomed, learning to read, write and speak fluently, and to think for herself.

The turning point comes years later, when Bholi is to be married to Bishamber, a much older widower who demands a large dowry, revealing at the very wedding that he has decayed teeth and is only marrying her for the dowry money, and further demands more money on seeing her pockmarked face. Bholi, now educated and self-assured, publicly refuses to marry him, walks away from the wedding, and declares that she would rather remain unmarried than be bought or humiliated. Education has thus given her not just literacy but the confidence, self-respect and independence to reject an exploitative marriage and to choose her own path, later becoming a teacher herself.`,
    keywords: [
      "disfigured by smallpox / considered ugly and dumb by her family",
      "sent to the newly opened girls' school",
      "kind teacher gives her confidence",
      "learns to speak, read and think for herself",
      "Bishamber demands dowry and reveals decayed teeth at the wedding",
      "Bholi refuses to marry him, becomes independent (later a teacher)",
    ],
    examinerTip:
      "The dowry-demanding groom's decayed teeth and his greed for more money AT the wedding are the specific, named details the key checks for — a vague 'she refused to marry him' without this context loses marks.",
  },
  {
    id: "q-c10-english-28-1",
    subjectId: "c10-english",
    chapterId: "c10-english-28",
    classLevel: 10,
    text: "In Claire Boiko's play 'The Book That Saved the Earth', how do the Martians misinterpret Mother Goose rhymes, and how does this save the earth from invasion? (40–50 words)",
    marks: 2,
    type: "sa",
    source: "important",
    answer: `In the year 2040, the Martians plan to invade Earth, believing humans to be a primitive species. Their Chief Investigator, Omega, reads a Mother Goose book found among the ruins of a library and, along with the Great Think-Tank Computer, hilariously misinterprets its simple nursery rhymes as evidence of a technologically advanced and mysterious civilisation.

For example, 'Hey diddle diddle, the cat and the fiddle, the cow jumped over the moon' is read as proof that Earth has anti-gravity devices allowing cows to leap over the moon; 'Little Miss Muffet' is thought to be a coded message about a dangerous local creature called a 'spider'; and 'Old Mother Hubbard' is taken to describe a food shortage. Terrified by these misreadings of Earth's supposed power, the Martian invasion fleet retreats in fear, and a simple book of nursery rhymes ends up saving the Earth from being conquered.`,
    keywords: [
      "Martians plan to invade Earth in 2040",
      "Omega and Think-Tank misread the Mother Goose book",
      "'cow jumped over the moon' read as anti-gravity technology",
      "'Little Miss Muffet' / the spider misread as a dangerous creature",
      "misinterpretation causes fear",
      "Martian invasion called off / Earth saved",
    ],
    examinerTip:
      "At least two named misreadings (the cow-over-the-moon and Miss Muffet's spider are the most-asked) should be given with what the Martians wrongly concluded — a general 'they got scared of the book' answer misses the specific humour the key rewards.",
  },
];
