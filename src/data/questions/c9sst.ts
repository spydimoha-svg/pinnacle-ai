import type { Question } from "../../lib/types";

/**
 * CLASS 9 — SOCIAL SCIENCE (c9-sst), HISTORY AND GEOGRAPHY SECTIONS.
 *
 * Chapter ids copied verbatim from src/data/curriculum/class9.ts. History
 * (c9-sst-01 to c9-sst-05) is checked against the NCERT text India and the
 * Contemporary World – I. Geography (c9-sst-06 to c9-sst-11) is checked
 * against the NCERT text Contemporary India – I. Political Science and
 * Economics (c9-sst-12 to c9-sst-20) are not covered here.
 *
 * `year` is set ONLY where a question is a verbatim board repeat with a known
 * year. Everything else is "important" — no year is guessed.
 */
export const C9_SST_QUESTIONS: Question[] = [
  // ==========================================================================
  // Chapter 1 — The French Revolution
  // ==========================================================================
  {
    id: "q-c9-sst-01-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-01",
    classLevel: 9,
    text: "Explain any three features of the Constitution of 1791 in France.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The National Assembly drafted the Constitution of 1791, which restructured the French state.

(i) Separation of powers — the constitution vested the power to make laws in the National Assembly, which was indirectly elected. Powers were separated between the legislature, the executive and the judiciary, a principle put forward by the political philosopher Montesquieu.

(ii) A constitutional monarchy — France became a constitutional monarchy; the king's powers were checked and balanced by the elected Assembly, and he was no longer an absolute ruler.

(iii) Declaration of the Rights of Man — the constitution began with a Declaration of the Rights of Man and Citizen, guaranteeing natural and inalienable rights such as the right to life, freedom of speech, freedom of opinion and equality before the law.

Thus the Constitution of 1791 limited the powers of the monarch and established a system based on the separation of powers and natural rights.`,
    keywords: [
      "power to make laws vested in National Assembly",
      "separation of powers — Montesquieu",
      "constitutional monarchy",
      "Declaration of the Rights of Man and Citizen",
    ],
    examinerTip:
      "Students often describe only the Declaration of Rights and forget the separation-of-powers and constitutional-monarchy points — three distinct features are wanted, not elaboration on one.",
  },
  {
    id: "q-c9-sst-01-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-01",
    classLevel: 9,
    text: "Distinguish between 'active citizens' and 'passive citizens' under the Constitution of 1791.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `The Constitution of 1791 gave the right to vote only to men above 25 years of age who paid taxes equal to at least three days of a labourer's wage. These men were called 'active citizens'.

The rest of the men and all the women were classed as 'passive citizens', and did not have the right to vote. To qualify as a member of the National Assembly, a man had to belong to the highest bracket of taxpayers.

Thus voting rights under the 1791 constitution were tied to property and gender, not to citizenship alone.`,
    keywords: [
      "active citizens — men above 25 paying tax equal to 3 days' wage",
      "passive citizens — remaining men and all women",
      "no voting right for passive citizens",
    ],
    examinerTip:
      "Both categories must be defined with their qualifying condition; naming only 'active citizens' without the tax criterion loses a mark.",
  },
  {
    id: "q-c9-sst-01-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-01",
    classLevel: 9,
    text: "Describe the Reign of Terror under Robespierre.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `The period from 1793 to 1794 is referred to as the Reign of Terror, under the leadership of Maximilien Robespierre.

(i) Severe control and punishment — Robespierre followed a policy of strict control and punishment. All those whom he considered enemies of the republic — ex-nobles, clergy, and members of other political parties — were arrested, imprisoned and tried by a revolutionary tribunal.

(ii) Guillotine — if the accused were found guilty, they were guillotined, a device consisting of two poles and a blade used for beheading.

(iii) Economic controls — Robespierre's government issued laws placing a maximum ceiling on wages and prices. Meat and bread were rationed, and peasants were forced to transport their grain to the cities and sell it at prices fixed by the government.

(iv) Equality in daily life — the use of white flour was forbidden; all citizens, rich or poor, were required to eat the same kind of bread, the pain d'égalité (equality bread), and equality was also practised through forms of address such as 'citoyen' and 'citoyenne' in place of Monsieur and Madame.

(v) Curtailment of freedoms and fall of Robespierre — freedom of the press was curtailed, and all such policies were enforced so strictly that even Robespierre's own supporters began demanding moderation. In July 1794 he was tried by the revolutionary tribunal, arrested and the next day sent to the guillotine.

Thus the Reign of Terror combined political repression with economic control, and ended with the execution of Robespierre himself.`,
    keywords: [
      "revolutionary tribunal",
      "guillotine",
      "ceiling on wages and prices",
      "pain d'égalité — equal bread for rich and poor",
      "Robespierre guillotined July 1794",
    ],
    examinerTip:
      "This is a five-mark 'describe' — a one-line answer naming only the guillotine will not score full marks; the economic controls and Robespierre's own fall must also be covered.",
  },

  // ==========================================================================
  // Chapter 2 — Socialism in Europe and the Russian Revolution
  // ==========================================================================
  {
    id: "q-c9-sst-02-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-02",
    classLevel: 9,
    text: "What was 'Bloody Sunday'?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `On 9 January 1905, a day known as Bloody Sunday, a procession of workers led by Father Gapon, marching towards the Winter Palace in St Petersburg to present a petition to the Tsar, was attacked by police and Cossacks.

Over 100 workers were killed and about 300 wounded. The incident sparked widespread protests across the country and started the events that came to be called the 1905 Revolution.`,
    keywords: [
      "9 January 1905",
      "Father Gapon led the procession",
      "workers fired upon near Winter Palace",
      "sparked the 1905 Revolution",
    ],
    examinerTip:
      "Date and the Gapon-led procession are both examiner keywords — a vague answer like 'workers were killed by police' without the date or the petition loses marks.",
  },
  {
    id: "q-c9-sst-02-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-02",
    classLevel: 9,
    text: "Describe how the February Revolution of 1917 led to the abdication of the Tsar.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `The February Revolution began in Petrograd (the capital, renamed from St Petersburg) in 1917.

(i) Strikes over bread and autocracy — on 22 February a lockout took place at a factory on the right bank of the river. Workers of 50 other factories joined a strike in sympathy, demanding bread and an end to autocracy. Curfew was imposed by the government but the workers defied it and came out on the streets on 23-25 February.

(ii) Government response — the government suspended the Duma, and called out the cavalry and police to control the situation. On 27 February, however, a cavalry unit refused to fire on protesters in the streets. A large number of soldiers also joined the striking workers, forming a 'soviet' or 'council', in the same building as the Duma.

(iii) Petrograd Soviet formed — this Petrograd Soviet, made up of soldiers and workers, was formed to represent the striking population.

(iv) Abdication — a delegation went to see the Tsar. Military commanders advised him to abdicate. He accepted their advice, and abdicated on 2 March 1917.

(v) Provisional Government — Soviet leaders and Duma leaders formed a Provisional Government to run the country, and restrictions on public meetings and associations were lifted.

Thus popular strikes, joined by mutinying soldiers, deprived the Tsar of military support, forcing his abdication and ending Romanov rule in Russia.`,
    keywords: [
      "strikes at Petrograd factories, February 1917",
      "cavalry unit refused to fire",
      "Petrograd Soviet of soldiers and workers formed",
      "Tsar abdicated 2 March 1917",
      "Provisional Government formed",
    ],
    examinerTip:
      "The abdication is the last step, not the whole answer — students who jump straight to 'the Tsar abdicated' without the strikes and the mutiny of soldiers leave most of the five marks unclaimed.",
  },
  {
    id: "q-c9-sst-02-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-02",
    classLevel: 9,
    text: "What social changes took place in Russia after the October Revolution of 1917?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The Bolsheviks, led by Lenin, seized power in the October Revolution of 1917 and introduced sweeping social changes.

(i) Nationalisation — in November 1917 the Bolshevik government nationalised banking and industry, taking them out of private hands.

(ii) Land redistribution — land was declared social property, and peasant committees were allowed to seize and redistribute the land of the nobility among themselves.

(iii) End of aristocratic titles — in cities, the Bolsheviks banned the use of titles of nobility, and introduced new uniforms for the army and officials, along with a redesigned Russian flag.

Thus the October Revolution ended private ownership of major industry and land held by nobility, replacing it with state and collective control.`,
    keywords: [
      "banking and industry nationalised",
      "land declared social property, seized by peasant committees",
      "aristocratic titles abolished",
    ],
    examinerTip:
      "Three distinct changes are wanted — 'the Bolsheviks nationalised things' repeated three ways does not count as three separate value points.",
  },

  // ==========================================================================
  // Chapter 3 — Nazism and the Rise of Hitler
  // ==========================================================================
  {
    id: "q-c9-sst-03-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-03",
    classLevel: 9,
    text: "What was the Enabling Act of 1933?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `The Enabling Act was passed on 23 March 1933. It gave Hitler's government the power to sidestep Parliament and rule by decree, establishing a dictatorship in Germany.

All political parties except the Nazi Party were banned, and the state took direct control over the economy, media, army and judiciary.`,
    keywords: [
      "passed 23 March 1933",
      "power to rule by decree, bypassing Parliament",
      "all parties except the Nazi Party banned",
    ],
    examinerTip:
      "The date is frequently misremembered as 30 January 1933, which is when Hitler became Chancellor — that is a different event. The Enabling Act followed on 23 March 1933.",
  },
  {
    id: "q-c9-sst-03-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-03",
    classLevel: 9,
    text: "Explain the economic and political crises in Germany that helped Hitler rise to power.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Several crises in Weimar Germany created the conditions for Hitler's rise.

(i) Treaty of Versailles — the Treaty of Versailles of 1919, which formally ended the First World War, was harsh and humiliating for Germany. Germany lost territories and colonies, its resources were depleted, and it was forced to pay compensation of 6 billion pounds. Germans deeply resented both the treaty and the Weimar Republic which had signed it.

(ii) Hyperinflation — in 1923 Germany refused to pay reparations, leading French occupation of its major industrial area, Ruhr, and Germany printed paper currency recklessly, causing hyperinflation — money lost its worth and prices of everyday goods rose astronomically.

(iii) The Great Depression — the Wall Street Exchange crash of 1929 and the subsequent Great Depression hit Germany hard. By 1932 industrial production fell by 40 per cent, unemployment reached 6 million, and the middle class in particular feared proletarianisation.

(iv) Weak parliamentary system — the Weimar constitution had inherent defects; proportional representation made majorities difficult, and Article 48 gave the President the power to impose emergency rule and govern by decree, weakening the legislature's authority.

(v) Hitler's appeal — Hitler exploited this economic distress and political instability, promising a strong, stable government and the restoration of German dignity, and was appointed Chancellor on 30 January 1933.

Thus economic devastation combined with a weak, resented republic created the space that Hitler and the Nazi Party filled.`,
    keywords: [
      "Treaty of Versailles — territorial and financial losses",
      "1923 hyperinflation",
      "Great Depression 1929 — unemployment, industrial fall",
      "Article 48 — rule by decree",
      "Hitler appointed Chancellor 30 January 1933",
    ],
    examinerTip:
      "This is asking for CAUSES, not a biography of Hitler — answers that describe his early life or the Beer Hall Putsch instead of the economic/political crisis miss the question.",
  },
  {
    id: "q-c9-sst-03-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-03",
    classLevel: 9,
    text: "Describe any three features of Nazi propaganda.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The Nazis were masters of the art of propaganda.

(i) Visual and mass media — they made powerful use of visual images, films, radio, posters, catchy slogans and leaflets to win support for their ideas and popularise their worldview.

(ii) Dehumanising imagery — in Nazi propaganda images, Jews were regularly juxtaposed with those of vermin like rats and pests, to build public acceptance of persecution.

(iii) Propaganda through schooling — Nazi ideology was imparted through school textbooks that reflected Nazi race science; children were even taught to be loyal Nazis in classes on Biology, Mathematics and Geography, and the Hitler Youth movement glorified war, aggression and violence while teaching children to despise democracy.

Thus the Nazis used every available medium, including education, to spread their ideology.`,
    keywords: [
      "films, radio, posters and slogans",
      "Jews juxtaposed with vermin in imagery",
      "Nazified school textbooks and Hitler Youth",
    ],
    examinerTip:
      "Three separate propaganda channels are expected — repeating 'posters showed Jews badly' three times does not earn three marks.",
  },

  // ==========================================================================
  // Chapter 4 — Forest Society and Colonialism
  // ==========================================================================
  {
    id: "q-c9-sst-04-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-04",
    classLevel: 9,
    text: "What is scientific forestry? Explain any two of its features.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Scientific forestry is a system of cutting trees, planted and controlled by the forest department, in a way that maintains a continual supply of timber for colonial needs. Dietrich Brandis, appointed the first Inspector General of Forests in India in 1864, helped set up this system.

(i) Plantations of a single species — old, diverse natural forests, with many different types of trees, were cut down, and in their place, one type of commercially valuable tree, such as pine, sal or teak, was planted in straight rows; this is called a plantation.

(ii) Working plans — forest officials surveyed the forests, estimated the area under different types of trees, and made working plans for forest management. These plans decided how much of the plantation area was to be cut each year, and specified the area to be replanted so that it could be cut again in a stipulated number of years.

Thus scientific forestry replaced diverse natural forests with regulated, commercially managed plantations.`,
    keywords: [
      "Dietrich Brandis, first Inspector General of Forests, 1864",
      "diverse forests replaced by single-species plantations",
      "working plans for planting and felling cycles",
    ],
    examinerTip:
      "'Scientific forestry' sounds like it means conservation — students often write the opposite of the correct definition. It refers to commercial plantation management, not protection of natural diversity.",
  },
  {
    id: "q-c9-sst-04-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-04",
    classLevel: 9,
    text: "Explain how the new forest laws affected the everyday lives of villagers in colonial India.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `The Indian Forest Act of 1865 was amended in 1878 and 1927, and forests were divided into reserved, protected and village forests, with reserved forests being the best forests.

(i) Everyday practices became illegal — practices essential to rural life, such as cutting wood for houses or boats, grazing cattle, collecting fruits and roots, and hunting and fishing, became illegal. People were forced to steal wood from the forests, and if caught, were at the mercy of forest guards who would often demand bribes.

(ii) Harassment by forest guards and police — women who collected fuelwood were particularly harassed. Both police and forest guards began extracting free food from villagers as they passed through.

(iii) Restrictions on shifting cultivation — European foresters regarded shifting cultivation as harmful for forests, since land under this form of cultivation could not grow trees for railway timber for decades, and it was also difficult for the government to calculate taxes for shifting cultivation. The government therefore decided to ban shifting cultivation, forcing many cultivators to change their livelihoods.

(iv) Forced labour — villagers were required to work without payment, a system called begar, for the forest department, building roads, felling trees and transporting timber.

(v) Loss of grazing and hunting rights — pastoralists and hunting-gathering communities lost access to their traditional grazing lands and hunting grounds, and some hunting communities were even classified as 'criminal tribes' under laws such as the Criminal Tribes Act of 1871.

Thus the forest laws converted everyday subsistence activities into criminal offences and disrupted the traditional livelihoods of forest-dependent people.`,
    keywords: [
      "grazing, collecting and hunting made illegal",
      "bribes to forest guards",
      "shifting cultivation banned",
      "begar — forced unpaid labour",
      "Criminal Tribes Act 1871",
    ],
    examinerTip:
      "Five marks means five distinct effects on villagers' lives are expected — listing only 'grazing and hunting became illegal' caps the answer well short of full marks.",
  },
  {
    id: "q-c9-sst-04-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-04",
    classLevel: 9,
    text: "Who was Gunda Dhur, and what was his role in the Bastar rebellion of 1910?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Gunda Dhur was a leader from the village of Nethanar who led the Bastar rebellion of 1910 in present-day Chhattisgarh, against the colonial government's forest reservation policies.

Villagers protested against reservation of two-thirds of the forest, which stopped shifting cultivation, hunting and the collection of forest produce. It took the British three months, from February to May 1910, to regain control, and Gunda Dhur was never captured.`,
    keywords: [
      "Gunda Dhur, village of Nethanar",
      "Bastar rebellion, 1910",
      "protest against reservation of two-thirds of forest",
      "never captured by the British",
    ],
    examinerTip:
      "Both the name-region link and the specific grievance (two-thirds reservation) are keyword points — naming Gunda Dhur without the reservation policy loses a mark.",
  },

  // ==========================================================================
  // Chapter 5 — Pastoralists in the Modern World
  // ==========================================================================
  {
    id: "q-c9-sst-05-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-05",
    classLevel: 9,
    text: "Name any three pastoral communities of India, along with the region they belong to.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `India has a number of pastoral communities that move with their herds across regions in search of pasture:

(i) Gujjar Bakarwals of Jammu and Kashmir — herders of goats and sheep.

(ii) Gaddi shepherds of Himachal Pradesh.

(iii) Dhangars of Maharashtra — herders of sheep and goats who also wove blankets from wool.

(Other valid examples: Bhotiyas, Sherpas and Kinnauris of Garhwal and Kumaon, and Raikas of Rajasthan.)`,
    keywords: [
      "Gujjar Bakarwals — Jammu and Kashmir",
      "Gaddi shepherds — Himachal Pradesh",
      "Dhangars — Maharashtra",
      "Raikas — Rajasthan (alternative)",
    ],
    examinerTip:
      "The community must be paired correctly with its region — 'Gaddis of Rajasthan' or similar mismatched pairing loses the mark even if the name is right.",
  },
  {
    id: "q-c9-sst-05-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-05",
    classLevel: 9,
    text: "What were the Waste Land Rules, and how did they affect Indian pastoralists?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `From the mid-nineteenth century, the colonial government enacted Waste Land Rules in various parts of India, giving uncultivated land to select individuals, with tax concessions, on condition that the land was brought under cultivation.

Some of the lands taken over were grazing tracts regularly used by pastoralists. As these lands were enclosed and turned into cultivated fields, the movement of pastoralists was restricted, and their grazing grounds shrank.`,
    keywords: [
      "uncultivated land given to select individuals with tax incentives",
      "grazing tracts used by pastoralists were taken over",
      "restricted pastoral movement",
    ],
    examinerTip:
      "The purpose of the rule (encouraging cultivation) and its side-effect on pastoralists (loss of grazing land) are both needed — stating only that 'grazing land was taken' without why loses a mark.",
  },
  {
    id: "q-c9-sst-05-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-05",
    classLevel: 9,
    text: "Describe the effects of colonial rule on the Maasai pastoralists of East Africa.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Maasailand, once stretching across a huge area from north Kenya to the steppes of northern Tanzania, was transformed by colonial rule.

(i) Loss of the best grazing lands — from the late nineteenth century, European colonists began occupying Maasai lands, pushing them into a small area in south Kenya and north Tanzania, and taking over the best grazing lands for their own use.

(ii) Territory split by a colonial boundary — in 1885, Maasailand was cut into two by an international boundary between British Kenya and German Tanganyika. The Maasai lost about 60 per cent of their pre-colonial lands, and were confined to arid and semi-arid areas with uncertain rainfall and poor pastures.

(iii) Restriction to reserves — the colonial government forced the Maasai to stay within the boundaries of special reserves, and prevented them from moving into new areas in search of pastures.

(iv) Loss to game reserves — local movements were further restricted by the expansion of game reserves such as the Serengeti Park, from which Maasai herders were barred, even though these had traditionally been their grazing tracts.

(v) Overstocking and deterioration of pastures — confined to a small area, the Maasai could no longer move their large stock over vast tracts, so the remaining grazing lands suffered from continuous and intensive grazing, and pastures deteriorated in quality.

(vi) Weakening of traditional authority — colonial administration weakened the traditional institutions of elders and warriors, since chiefs were now appointed by the colonial government for administrative convenience, often without any traditional standing among the Maasai.

Thus colonial rule severely reduced Maasai pastureland, disrupted their mobility and undermined their traditional social organisation.`,
    keywords: [
      "1885 boundary split Maasailand between Kenya and Tanganyika",
      "lost about 60% of pre-colonial lands",
      "confined to reserves, barred from game reserves like Serengeti",
      "overstocking and deteriorating pastures",
      "traditional authority of elders and warriors weakened",
    ],
    examinerTip:
      "This is a five-mark 'describe' expecting multiple distinct effects — land loss, the international boundary, game reserves and the weakening of the elders' authority are all separate value points, not restatements of the same idea.",
  },

  // ==========================================================================
  // Chapter 6 — India: Size and Location
  // ==========================================================================
  {
    id: "q-c9-sst-06-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-06",
    classLevel: 9,
    text: "Which is the standard meridian of India? Why was it selected?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `The Standard Meridian of India is 82°30'E longitude, which passes through Mirzapur (in Uttar Pradesh).

It was selected because it is the meridian located approximately at the middle of India's longitudinal extent (68°7'E to 97°25'E), so that the local time at this meridian could be taken as the standard time for the whole country.`,
    keywords: [
      "82°30'E longitude",
      "passes through Mirzapur",
      "chosen as it is near the centre of India's longitudinal extent",
    ],
    examinerTip:
      "Both the value 82°30'E and the place name Mirzapur are separate keyword points — giving only the number without Mirzapur is an incomplete answer.",
  },
  {
    id: "q-c9-sst-06-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-06",
    classLevel: 9,
    text: "Name the countries that share a land boundary with India, and identify India's two island groups.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `India shares its land boundaries with Pakistan and Afghanistan in the north-west; China (Tibet), Nepal and Bhutan in the north; and Myanmar and Bangladesh in the east.

India's two island groups are the Lakshadweep Islands, in the Arabian Sea, and the Andaman and Nicobar Islands, in the Bay of Bengal.

Thus India shares land frontiers with seven neighbouring countries and has two island groups located in different seas.`,
    keywords: [
      "Pakistan, Afghanistan, China, Nepal, Bhutan, Myanmar, Bangladesh",
      "Lakshadweep — Arabian Sea",
      "Andaman and Nicobar — Bay of Bengal",
    ],
    examinerTip:
      "Sri Lanka is a maritime neighbour separated by the Palk Strait, not a land-boundary neighbour — including it here is a common error.",
  },
  {
    id: "q-c9-sst-06-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-06",
    classLevel: 9,
    text: "Describe India's location and its significance in South Asia.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `India occupies an important strategic location in South Asia.

(i) Latitudinal and longitudinal extent — India lies entirely in the Northern Hemisphere, between latitudes 8°4'N and 37°6'N, and longitudes 68°7'E and 97°25'E, giving it a north-south extent of about 3,214 km and an east-west extent of about 2,933 km.

(ii) Size — India's total area is about 3.28 million sq km, making it the seventh largest country in the world, and it accounts for about 2.4 per cent of the total world area.

(iii) Position on the Tropic of Cancer — the Tropic of Cancer (23°30'N) divides the country into almost two equal halves, running through the middle, so India has both tropical and sub-tropical climatic conditions.

(iv) Peninsular location — India's southward extension and the Indian Ocean at its immediate south have given it a strategic location, since the Indian peninsula, with the Arabian Sea on its west and the Bay of Bengal on its east, points towards the Indian Ocean.

(v) Trade and cultural contact — India's central location between East and West Asia has facilitated the country's trade with Europe, Africa, and countries lying to the east of India, since it is a meeting point of routes across the Indian Ocean.

Thus India's size and central location have given it a distinct geographical, climatic and strategic advantage in South Asia.`,
    keywords: [
      "8°4'N to 37°6'N, 68°7'E to 97°25'E",
      "seventh largest country, 3.28 million sq km",
      "Tropic of Cancer (23°30'N) divides India into two halves",
      "peninsular location between Arabian Sea and Bay of Bengal",
      "strategic position for trade across the Indian Ocean",
    ],
    examinerTip:
      "Five marks needs distinct dimensions of location — extent, size, the Tropic of Cancer, and strategic/trade significance are separate value points, not one repeated idea.",
  },

  // ==========================================================================
  // Chapter 7 — Physical Features of India
  // ==========================================================================
  {
    id: "q-c9-sst-07-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-07",
    classLevel: 9,
    text: "Name the three broad divisions of the Himalayas from north to south, based on relief.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `From north to south, the Himalayas are divided into three parallel ranges:

(i) The Himadri (Greater/Inner Himalayas) — the northernmost and most continuous range, with an average height of 6,000 m, containing all the major Himalayan peaks.

(ii) The Himachal (Lesser Himalaya) — lying to the south of the Himadri, with an average elevation of 3,700 to 4,500 m, comprising ranges like the Pir Panjal and Dhauladhar.

(iii) The Shiwaliks — the outermost range, with an altitude varying between 900 and 1,100 m, made up of unconsolidated sediments brought down by rivers from the main Himalayan ranges.`,
    keywords: [
      "Himadri — northernmost, average 6,000 m",
      "Himachal (Lesser Himalaya) — 3,700-4,500 m",
      "Shiwaliks — outermost, 900-1,100 m, unconsolidated sediments",
    ],
    examinerTip:
      "The order must be north to south (Himadri, Himachal, Shiwaliks) — reversing the order or omitting one range loses marks even if all three names are known.",
  },
  {
    id: "q-c9-sst-07-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-07",
    classLevel: 9,
    text: "Distinguish between Bhabar and Terai regions of the Northern Plains.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The Bhabar and Terai are two distinct belts running parallel to the Shiwaliks, part of the Northern Plains.

(i) Bhabar — a narrow belt, about 8 to 10 km wide, lying parallel to the Shiwalik foothills, where the rivers coming down from the mountains deposit pebbles over a large area, making the region porous.

(ii) Terai — the belt lying south of, and adjoining, the Bhabar belt, where the streams and rivers re-emerge and create a wet, swampy and marshy region, which was once thickly forested and rich in wildlife.

(iii) Present use — the Terai has, after clearing of a large part of the forest, been turned into a fertile agricultural land, especially for rice, wheat and sugarcane cultivation.

Thus the Bhabar is a porous, gravel-based belt where streams disappear, while the Terai, just south of it, is where these streams resurface as a wet, marshy tract.`,
    keywords: [
      "Bhabar — narrow, porous, pebble belt below the Shiwaliks",
      "Terai — wet, swampy belt south of Bhabar where streams re-emerge",
      "Terai now cleared for agriculture",
    ],
    examinerTip:
      "Students often reverse the two — Bhabar is where rivers disappear underground, Terai is where they resurface; getting this order backwards loses the distinguishing mark.",
  },
  {
    id: "q-c9-sst-07-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-07",
    classLevel: 9,
    text: "Describe the physiographic divisions of India.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `India can be divided into the following major physiographic divisions.

(i) The Himalayan Mountains — a young, fold mountain system running along the northern border, formed by the collision of the Indian Plate with the Eurasian Plate, and consisting of three parallel ranges: the Himadri, Himachal and Shiwaliks.

(ii) The Northern Plains — formed by the alluvial deposits carried by the Indus, Ganga and Brahmaputra rivers and their tributaries, this is one of the most fertile and densely populated physiographic divisions of India.

(iii) The Peninsular Plateau — a tableland composed of old crystalline, igneous and metamorphic rocks, formed due to the breaking and drifting of the Gondwana landmass, comprising the Central Highlands and the Deccan Plateau.

(iv) The Indian Desert (Thar Desert) — lying towards the western margins of the Aravali Hills, an undulating sandy plain covered with sand dunes, with low rainfall (below 150 mm per year) and a hot, dry climate.

(v) The Coastal Plains — narrow plains along the Arabian Sea (west coast) and the Bay of Bengal (east coast), and the Islands — the Lakshadweep Islands of coral origin and the Andaman and Nicobar Islands of volcanic origin.

Thus India displays great physiographic diversity, from young fold mountains in the north to ancient plateaus, deserts, plains and islands.`,
    keywords: [
      "Himalayas — young fold mountains, Indian-Eurasian Plate collision",
      "Northern Plains — alluvial, formed by Indus, Ganga, Brahmaputra",
      "Peninsular Plateau — old crystalline rock, from Gondwana land",
      "Thar Desert — west of Aravalis, sand dunes",
      "Coastal Plains and Islands — Lakshadweep (coral), Andaman and Nicobar (volcanic)",
    ],
    examinerTip:
      "All five divisions are expected for full marks — a common shortfall is describing only the Himalayas and Northern Plains and skipping the plateau, desert and coasts.",
  },

  // ==========================================================================
  // Chapter 8 — Drainage
  // ==========================================================================
  {
    id: "q-c9-sst-08-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-08",
    classLevel: 9,
    text: "Distinguish between Himalayan rivers and Peninsular rivers.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Himalayan and Peninsular rivers differ in origin, nature and flow.

(i) Nature of flow — Himalayan rivers are perennial, since they receive water from rain as well as from melting snow of the lofty Himalayan mountains, while most Peninsular rivers are seasonal, depending largely on rainfall during the monsoon.

(ii) Course — Himalayan rivers pass through large mountain ranges, forming gorges through vigorous erosional activity, while Peninsular rivers flow through shallower valleys as they have attained a graded profile over a long span of time.

(iii) Age of the river system — Himalayan rivers are young and youthful, exhibiting middle- and lower-stage features, while Peninsular river basins are old, having reached an almost final stage of their life cycle.

Thus Himalayan rivers are snow-fed and perennial with young courses, while Peninsular rivers are rain-fed and largely seasonal with graded, older courses.`,
    keywords: [
      "Himalayan rivers — perennial, snow and rain fed",
      "Peninsular rivers — seasonal, rain fed only",
      "Himalayan rivers young with gorges; Peninsular rivers old with graded profile",
    ],
    examinerTip:
      "The key discriminator examiners look for is perennial versus seasonal nature and its cause — merely saying 'Himalayan rivers are bigger' without the snow-melt reason misses the concept.",
  },
  {
    id: "q-c9-sst-08-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-08",
    classLevel: 9,
    text: "Name the three major Himalayan river systems and one important tributary of each.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `The three major Himalayan river systems are:

(i) The Indus system — with tributaries such as the Satluj, Beas, Ravi, Chenab and Jhelum.

(ii) The Ganga system — with tributaries such as the Yamuna, Gomti, Ghaghara, Kosi and Chambal.

(iii) The Brahmaputra system — which enters India from the east, with tributaries such as the Dibang and Lohit.`,
    keywords: [
      "Indus — e.g. Satluj/Chenab/Jhelum",
      "Ganga — e.g. Yamuna/Ghaghara/Kosi",
      "Brahmaputra — e.g. Dibang/Lohit",
    ],
    examinerTip:
      "The tributary named must genuinely belong to that river system — pairing the Chambal (a Ganga/Yamuna tributary) with the Indus, for instance, is a common mismatch error.",
  },
  {
    id: "q-c9-sst-08-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-08",
    classLevel: 9,
    text: "Explain the causes of river pollution in India and any two steps taken to control it.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Rivers in India, especially the Ganga and the Yamuna, have become severely polluted.

(i) Domestic and municipal waste — untreated domestic sewage from towns and cities located along the river banks is a major source of water pollution.

(ii) Industrial effluents — increasing urbanisation and industrialisation have led to large quantities of untreated industrial effluents being released directly into the rivers.

(iii) Agricultural runoff — chemical fertilisers and pesticides used in agriculture along river basins add to the pollution load when they are washed into the rivers.

(iv) Religious and social practices — immersion of ashes and unburnt corpses, and the dumping of flower offerings and other religious waste, further pollute the water.

Two steps taken to control this:

(v) River-cleaning plans — river action plans such as the Ganga Action Plan and the Yamuna Action Plan were launched by the government to reduce pollution load and improve water quality.

(vi) Public awareness and afforestation — awareness campaigns among the public about conserving rivers, along with afforestation programmes along river banks to reduce soil erosion and siltation into the rivers.

Thus a combination of domestic, industrial, agricultural and social causes has polluted India's rivers, and cleaning plans along with public participation are being used to address it.`,
    keywords: [
      "untreated domestic sewage",
      "untreated industrial effluents",
      "chemical fertilisers and pesticides",
      "Ganga Action Plan / Yamuna Action Plan",
      "public awareness and afforestation along river banks",
    ],
    examinerTip:
      "The question has two parts — causes AND control steps — an answer that lists only causes, however detailed, cannot get full marks without the control measures.",
  },

  // ==========================================================================
  // Chapter 9 — Climate
  // ==========================================================================
  {
    id: "q-c9-sst-09-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-09",
    classLevel: 9,
    text: "Name the four seasons into which the year is divided in India, based on the monsoon.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `India's year is divided into four seasons:

(i) The cold weather season (winter) — from December to February.

(ii) The hot weather season (summer) — from March to May.

(iii) The advancing monsoon (rainy season) — from June to September.

(iv) The retreating/post-monsoon season (autumn) — from October to November.`,
    keywords: [
      "cold weather season — December to February",
      "hot weather season — March to May",
      "advancing monsoon — June to September",
      "retreating monsoon — October to November",
    ],
    examinerTip:
      "The month ranges are examiner keywords — naming the four seasons without their approximate months loses marks in a 'name and describe' style question.",
  },
  {
    id: "q-c9-sst-09-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-09",
    classLevel: 9,
    text: "What is meant by the 'break' in the monsoon? Give one reason for it.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The monsoon rainfall in India does not fall continuously for days; it has wet and dry spells, a phenomenon known as 'breaks' in the monsoon.

(i) Meaning — these breaks are related to the passage of the rain-bearing monsoon trough, whose position and orientation determine the spatial distribution of rainfall.

(ii) Cause — when the monsoon trough lies over the plains, rainfall occurs in the plains, but when it shifts towards the foothills of the Himalayas, dry spells occur in the plains while heavy rainfall occurs in the sub-Himalayan region.

(iii) Effect on cyclonic depressions — the frequency and intensity of tropical depressions originating from the Bay of Bengal, which move along the trough, also affect the duration and frequency of these breaks.

Thus monsoon 'breaks' are periods without rain within the rainy season, caused mainly by shifts in the position of the monsoon trough.`,
    keywords: [
      "wet and dry spells within the monsoon season",
      "linked to shifting position of the monsoon trough",
      "trough over Himalayan foothills causes dry spell in the plains",
    ],
    examinerTip:
      "A vague answer like 'sometimes it stops raining' without linking it to the monsoon trough's position does not earn the concept mark.",
  },
  {
    id: "q-c9-sst-09-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-09",
    classLevel: 9,
    text: "Explain the mechanism of the monsoon, including its onset and withdrawal.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `The monsoon is a unique climatic phenomenon that governs India's seasonal rhythm.

(i) Differential heating and low pressure — in summer, the landmass of north-central Asia gets intensely heated, creating a low-pressure area, while the Inter Tropical Convergence Zone (ITCZ) shifts over the Ganga plain, and this low-pressure trough attracts the south-east trade winds of the southern hemisphere.

(ii) Southwest monsoon winds — these trade winds cross the equator and, deflected by the Coriolis force, enter India as south-west monsoon winds, picking up moisture as they cross the warm Indian Ocean.

(iii) Onset and 'burst' — the monsoon arrives at the southern tip of India by the beginning of June, and its arrival is termed the 'burst' of the monsoon, since it is accompanied by sudden, often violent thunder and lightning.

(iv) Two branches — the monsoon divides into the Arabian Sea branch and the Bay of Bengal branch; the Arabian Sea branch reaches the Western Ghats and Mumbai by around 10 June, while the Bay of Bengal branch strikes the Meghalaya hills and advances rapidly, covering most of the country by mid-July.

(v) Retreat — by early October, with the low-pressure trough over the northwestern plains weakening, the monsoon begins to withdraw from north-western India; by the end of December, it has withdrawn from the rest of the country, and skies become clear.

Thus the monsoon mechanism, from onset to retreat, is driven by seasonal pressure changes linked to differential heating of land and sea.`,
    keywords: [
      "differential heating creates low pressure over north-central Asia",
      "ITCZ shift attracts south-east trades, deflected as south-west monsoon",
      "'burst' of monsoon at southern tip of India by early June",
      "Arabian Sea branch and Bay of Bengal branch",
      "retreat begins early October, complete by end December",
    ],
    examinerTip:
      "This is a five-mark mechanism question — an answer describing only 'it rains because of moist winds from the sea' without the pressure system, the two branches and withdrawal timing will not score full marks.",
  },

  // ==========================================================================
  // Chapter 10 — Natural Vegetation and Wildlife
  // ==========================================================================
  {
    id: "q-c9-sst-10-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-10",
    classLevel: 9,
    text: "What is the difference between a flora and a fauna? Give one example of each found in India.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Plant life in a particular region or period is called its flora, while animal life of a region or period is termed its fauna.

An example of flora native to India is sal, and an example of native fauna is the Indian elephant.`,
    keywords: [
      "flora — plant life of a region",
      "fauna — animal life of a region",
      "example of each, e.g. sal (flora), Indian elephant (fauna)",
    ],
    examinerTip:
      "Students sometimes swap the two terms — flora is always plants, fauna is always animals; reversing this loses the definition mark even with correct examples.",
  },
  {
    id: "q-c9-sst-10-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-10",
    classLevel: 9,
    text: "Name any three types of vegetation found in India, based on their characteristics.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `India's vegetation can be classified into several types based on the specific climatic regions:

(i) Tropical Evergreen Forests — found in areas receiving more than 200 cm of rainfall, with a short dry season, such as the western slope of the Western Ghats, hills of the northeastern states, and the Andaman and Nicobar Islands; trees like rosewood, mahogany and ebony are found here.

(ii) Tropical Deciduous Forests — the most widespread forests in India, found in regions with 200 cm to 70 cm of rainfall; trees such as teak, sal, peepal and neem shed their leaves for about six to eight weeks in the dry season.

(iii) Thorn Forests and Scrubs — found in the semi-arid regions of India receiving less than 70 cm of rainfall, consisting of a variety of grasses and shrubs, such as babool, ber and wild date palms, adapted to conserve moisture.

(Other valid types: Montane Forests, found in hilly and mountainous areas; and Mangrove Forests, found along coasts and river deltas such as the Ganga-Brahmaputra delta.)`,
    keywords: [
      "Tropical Evergreen — >200 cm rainfall, e.g. rosewood",
      "Tropical Deciduous — 200-70 cm rainfall, e.g. teak, sal",
      "Thorn Forests and Scrubs — <70 cm rainfall, e.g. babool",
    ],
    examinerTip:
      "The rainfall range is the examiner keyword that distinguishes each type — naming just 'evergreen, deciduous, thorn forest' without their rainfall/region association is an incomplete answer.",
  },
  {
    id: "q-c9-sst-10-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-10",
    classLevel: 9,
    text: "Describe the steps taken by the Government of India to conserve wildlife and forests.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Recognising that the diversity of flora and fauna is a valuable heritage, the government has taken several conservation measures.

(i) National parks and wildlife sanctuaries — the government has established a number of national parks, wildlife sanctuaries and biosphere reserves to protect the natural habitats of wild flora and fauna, such as Corbett National Park and Kaziranga National Park.

(ii) Project Tiger — launched in 1973 to protect the tiger population, which was declining due to poaching and habitat loss; several tiger reserves such as Corbett, Sunderban and Bandhavgarh were set up under this project.

(iii) Biosphere reserves — special multipurpose protected areas within which both the human population and the wildlife are protected, along with the traditional lifestyle of the inhabitants residing within it, for instance the Nilgiri Biosphere Reserve.

(iv) Legislation — laws such as the Wildlife Protection Act were enacted to prevent hunting, protect endangered species, and regulate trade in wildlife products.

(v) Afforestation and Joint Forest Management — programmes to increase forest cover through afforestation, and Joint Forest Management (JFM), in which local communities participate along with the government in the protection and management of forests, sharing in the benefits.

Thus conservation efforts combine protected areas, dedicated species projects, legislation and community participation to preserve India's biodiversity.`,
    keywords: [
      "national parks, wildlife sanctuaries and biosphere reserves",
      "Project Tiger, launched 1973",
      "Nilgiri Biosphere Reserve as example",
      "Wildlife Protection Act",
      "Joint Forest Management (JFM) with local community participation",
    ],
    examinerTip:
      "Five distinct measures are wanted — repeating 'the government made national parks' in different words for all five points, without naming Project Tiger or JFM, caps the answer well short of full marks.",
  },

  // ==========================================================================
  // Chapter 11 — Population
  // ==========================================================================
  {
    id: "q-c9-sst-11-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-11",
    classLevel: 9,
    text: "Define population density. What was India's population density as per the 2011 Census?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Population density is the number of persons living per unit area, usually expressed as the number of persons per square kilometre.

As per the 2011 Census, India's population density was 382 persons per square kilometre, making it one of the most densely populated countries in the world.`,
    keywords: [
      "persons living per unit area (per sq km)",
      "2011 Census figure — 382 persons per sq km",
    ],
    examinerTip:
      "The 2011 Census figure (382 persons per sq km) is the examiner-specific value point — a definition alone without this figure earns only partial marks.",
  },
  {
    id: "q-c9-sst-11-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-11",
    classLevel: 9,
    text: "Distinguish between the natural growth of population and migration as processes of population change.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Population change occurs due to three processes: birth rates, death rates and migration.

(i) Natural growth — this is the change in population due to births and deaths; the difference between the birth rate and the death rate of a region is termed its natural growth of population.

(ii) Migration — this is the movement of people across regions and territories; migration can be internal (within the country, which does not change the size of the population but influences the distribution of population within the country) or international (which changes both the size and distribution of the population of the country).

(iii) Direction of migration — migration can be from rural to urban areas, as people move from villages to cities, usually in search of employment and better opportunities, unlike natural growth which is not directional but purely a function of births and deaths.

Thus natural growth reflects the balance of births and deaths, while migration reflects the physical movement of people, and only international migration changes the country's total population size.`,
    keywords: [
      "natural growth — difference between birth rate and death rate",
      "migration — movement of people, internal or international",
      "internal migration changes distribution, not size; international migration changes both",
    ],
    examinerTip:
      "The internal-versus-international migration distinction, and its differing effect on population size, is the value point most answers miss.",
  },
  {
    id: "q-c9-sst-11-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-11",
    classLevel: 9,
    text: "Explain the main objectives of the National Population Policy (NPP), 2000.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `The National Population Policy (NPP) 2000 was formulated by the Government of India to address the challenges of a growing population.

(i) Immediate objective — to address the unmet needs for contraception, healthcare infrastructure, and health personnel, and to provide integrated service delivery for basic reproductive and child healthcare.

(ii) Medium-term objective — to bring the total fertility rate (TFR) to replacement levels, so that the average number of children a woman bears over her lifetime stabilises the population.

(iii) Long-term objective — to achieve a stable population by the year 2045, at a level consistent with the requirements of sustainable economic growth, social development, and protection of the environment.

(iv) Free and compulsory education — the policy aims to make school education up to age 14 free and compulsory, and to reduce dropout rates for both boys and girls.

(v) Reduction of infant and maternal mortality — the policy sets targets to reduce the infant mortality rate to below 30 per 1,000 live births, and to bring down maternal mortality, along with universal immunisation of children.

Thus the NPP 2000 sets immediate, medium-term and long-term goals, aiming at both population stabilisation and improved social indicators such as education and child health.`,
    keywords: [
      "immediate objective — meet contraception and healthcare needs",
      "medium-term objective — total fertility rate to replacement level",
      "long-term objective — stable population by 2045",
      "free and compulsory education up to age 14",
      "reduce infant mortality rate below 30 per 1,000 live births",
    ],
    examinerTip:
      "The three time-frame objectives (immediate, medium-term, long-term) are the structure examiners look for — an answer that lists only generic 'family planning' measures without this structure misses the main scoring points.",
  },
];
