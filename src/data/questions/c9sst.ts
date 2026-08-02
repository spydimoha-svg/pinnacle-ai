import type { Question } from "../../lib/types";

/**
 * CLASS 9 — SOCIAL SCIENCE (c9-sst), ALL FOUR SECTIONS.
 *
 * Chapter ids copied verbatim from src/data/curriculum/class9.ts. History
 * (c9-sst-01 to c9-sst-05) is checked against the NCERT text India and the
 * Contemporary World – I. Geography (c9-sst-06 to c9-sst-11) is checked
 * against the NCERT text Contemporary India – I. Political Science
 * (c9-sst-12 to c9-sst-16) is checked against Democratic Politics – I.
 * Economics (c9-sst-17 to c9-sst-20) is checked against the NCERT
 * Economics textbook.
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

  // ==========================================================================
  // Chapter 12 — What is Democracy? Why Democracy?
  // ==========================================================================
  {
    id: "q-c9-sst-12-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-12",
    classLevel: 9,
    text: "Define democracy. State any two features of a democratic government.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Democracy is a form of government in which the rulers are elected by the people.

(i) The final decision-making power rests with those elected by the people.

(ii) The government is chosen through a free and fair electoral competition, in which every adult citizen has one vote of equal value.`,
    keywords: [
      "rulers elected by the people",
      "final decision-making power with elected representatives",
      "one person, one vote, one value",
    ],
    examinerTip:
      "A definition alone without at least one distinguishing feature (free elections, one-person-one-vote) is treated as incomplete in a 'define and state features' question.",
  },
  {
    id: "q-c9-sst-12-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-12",
    classLevel: 9,
    text: "Give three arguments against democracy that are raised by its critics.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Critics of democracy raise several arguments against it.

(i) Instability — since leaders in a democracy keep changing, this leads to instability in government policy.

(ii) Delay in decision-making — democracy is based on consultation and negotiation, which takes time, so it leads to delays in decision-making.

(iii) Corruption — since elections involve a lot of money and muscle power, ordinary and less wealthy people cannot hope to become elected representatives, and this money-based electoral competition also breeds corruption.

Thus critics argue that democracy is unstable, slow in decision-making and vulnerable to corruption.`,
    keywords: [
      "leadership changes cause instability",
      "consultation causes delay in decisions",
      "corruption linked to money-based elections",
    ],
    examinerTip:
      "Three distinct criticisms are wanted — the chapter also allows 'elected leaders do not know the best interest of the people' and 'it is about political and not economic equality' as valid alternative points.",
  },
  {
    id: "q-c9-sst-12-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-12",
    classLevel: 9,
    text: "Explain any five reasons why democracy is considered a better form of government than any other.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Democracy is considered the best form of government for the following reasons.

(i) Promotes equality — democracy promotes equality among citizens; every citizen has one vote of equal value, regardless of wealth or status.

(ii) Enhances dignity of the individual — democracy is based on the recognition that all individuals are equal, and this enhances the dignity and self-respect of the citizen.

(iii) Improves quality of decision-making — because a democracy involves wider consultation and discussion before major decisions are taken, it improves the quality of decision-making even though it takes more time.

(iv) Provides a method to deal with differences and conflicts — in a society with regional, religious and other differences, democracy is the best way to reconcile competing demands through discussion rather than force.

(v) Allows room to correct mistakes — a democratic government is accountable to the people, and if a decision taken by rulers is wrong, either it can be corrected or the rulers can be replaced, which is not easily possible in a non-democratic set-up.

Thus democracy scores over other forms of government mainly because it is more accountable, promotes equality, and provides peaceful means to handle differences and correct mistakes.`,
    keywords: [
      "promotes political equality among citizens",
      "enhances dignity and self-respect of citizens",
      "improves quality of decision-making through consultation",
      "peaceful way of handling differences and conflicts",
      "provides room to correct mistakes; accountable government",
    ],
    examinerTip:
      "Five distinct reasons are expected — the exercise routinely penalises answers that restate 'people choose their leaders' five different ways instead of covering equality, dignity, decision quality, conflict-handling and accountability.",
  },

  // ==========================================================================
  // Chapter 13 — Constitutional Design
  // ==========================================================================
  {
    id: "q-c9-sst-13-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-13",
    classLevel: 9,
    text: "What was apartheid?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Apartheid was the system of racial discrimination practised in South Africa, under which the white European minority ruled over and discriminated against the native black African population and other non-white races.

Under apartheid, non-white people could not vote, and there were separate facilities and areas for whites and blacks. It was abolished after a long struggle led by the African National Congress and Nelson Mandela, and a new democratic constitution was adopted in 1996.`,
    keywords: [
      "system of racial discrimination in South Africa",
      "white minority discriminated against black majority",
      "ended through the struggle led by the African National Congress / Nelson Mandela",
    ],
    examinerTip:
      "A common error is describing apartheid as a general term for discrimination — it must be tied specifically to South Africa's racial policy for full marks.",
  },
  {
    id: "q-c9-sst-13-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-13",
    classLevel: 9,
    text: "What is a constitution? Mention any three things that a constitution does for a country.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `A constitution is the supreme law that lays down the fundamental principles according to which a country is governed.

(i) Trust and coordination — it generates a minimum degree of trust and coordination among different sections of society, which is necessary for democratic government.

(ii) Specifies who holds power — it specifies how the government will be constituted, who will have the power to take decisions in a country, and how the government will be formed.

(iii) Limits and rights — it lays down limits on the powers of the government, and defines what rights citizens are entitled to.

Thus the constitution provides the basic rules that allow a certain minimum of coordination among members of society while defining the powers of government and the rights of citizens.`,
    keywords: [
      "supreme law of the country",
      "generates trust and coordination among people",
      "specifies who has decision-making power / how government is formed",
      "sets limits on government power and defines citizens' rights",
    ],
    examinerTip:
      "Three separate functions are expected — 'it is the highest law' repeated three ways will not be credited as three distinct value points.",
  },
  {
    id: "q-c9-sst-13-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-13",
    classLevel: 9,
    text: "Describe how the Constitution of India was made by the Constituent Assembly.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `The Constitution of India was framed by a Constituent Assembly, specially elected for this purpose.

(i) Formation of the Assembly — elections to the Constituent Assembly were held in 1946; after Partition, the Assembly that met for India had 299 members.

(ii) First meeting — the Assembly held its first sitting on 9 December 1946, and took nearly three years to complete the historic task of drafting the constitution.

(iii) Drafting Committee — a Drafting Committee was set up to prepare a draft constitution, and Dr B. R. Ambedkar was its chairman; Dr Rajendra Prasad was the President of the Constituent Assembly.

(iv) Deliberation — every provision of the constitution was discussed and debated thoroughly in the Assembly, clause by clause, before it was adopted.

(v) Adoption and enforcement — the Constitution was adopted on 26 November 1949, and it came into force on 26 January 1950, a day now celebrated as Republic Day.

Thus the Indian Constitution was the product of nearly three years of careful, democratic deliberation by an elected Assembly rather than being imposed by any single authority.`,
    keywords: [
      "Constituent Assembly, 299 members, first meeting 9 December 1946",
      "Drafting Committee chaired by Dr B. R. Ambedkar",
      "Dr Rajendra Prasad, President of the Constituent Assembly",
      "adopted 26 November 1949",
      "came into force 26 January 1950 (Republic Day)",
    ],
    examinerTip:
      "Both the adoption date (26 November 1949) and the enforcement date (26 January 1950) are frequently confused with each other — examiners specifically check that students do not swap them.",
  },

  // ==========================================================================
  // Chapter 14 — Electoral Politics
  // ==========================================================================
  {
    id: "q-c9-sst-14-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-14",
    classLevel: 9,
    text: "What is a reserved constituency? Give one example.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `A reserved constituency is one where only a candidate belonging to a specific social group, such as Scheduled Castes (SC) or Scheduled Tribes (ST), is allowed to contest the election, so as to ensure their fair representation in legislatures.

For example, out of the total Lok Sabha seats, a certain number are reserved for candidates from the SC and ST communities, in proportion to their share of the population.`,
    keywords: [
      "only candidates from a specific group (SC/ST) can contest",
      "ensures fair representation of that social group",
      "example — SC/ST reserved Lok Sabha seats",
    ],
    examinerTip:
      "Students often confuse reservation of seats with reservation of voters — in a reserved constituency, everyone can vote, but only candidates from the reserved category can stand for election.",
  },
  {
    id: "q-c9-sst-14-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-14",
    classLevel: 9,
    text: "Explain any three powers of the Election Commission of India that help it conduct free and fair elections.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The Election Commission of India (ECI) is an independent and powerful body that conducts elections in the country.

(i) Full control over the election process — the ECI takes decisions on every aspect of conducting elections, from the announcement of elections to the declaration of results.

(ii) Implementation of the Model Code of Conduct — it enforces the code of conduct on parties and candidates, and can impose penalties, including cancellation of the election in a constituency, for its violation.

(iii) Control over government machinery on election duty — when elections are being conducted, government officers on election duty work under the control of the ECI and not the ordinary government, so that elections can be conducted in a free and fair manner.

Thus the ECI's independence from the government and its wide powers over the entire election machinery allow it to ensure free and fair elections.`,
    keywords: [
      "conducts elections from announcement to results",
      "enforces the Model Code of Conduct",
      "government officials on election duty work under ECI's control",
    ],
    examinerTip:
      "The independence of the ECI from the ruling government is the underlying concept examiners look for — an answer describing only 'it conducts voting' without mentioning its independent authority is incomplete.",
  },
  {
    id: "q-c9-sst-14-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-14",
    classLevel: 9,
    text: "Describe the various stages involved in the election process in India.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Elections in India, held to constitute the Lok Sabha and state legislative assemblies, involve the following stages.

(i) Delimitation of constituencies — the country is divided into different constituencies for the purpose of elections, and their boundaries are redrawn periodically based on population changes.

(ii) Preparation of electoral rolls — a list of all those who are eligible to vote, called the voters' list or electoral roll, is prepared and revised regularly.

(iii) Nomination of candidates — political parties nominate their candidates, who file their nomination papers along with a declaration of their assets and criminal cases, if any.

(iv) Election campaign — candidates and parties campaign to seek votes, holding public meetings and rallies, and are bound by the Model Code of Conduct during this period.

(v) Polling and counting of votes — voting takes place through Electronic Voting Machines (EVMs) on the day (or days) of polling, after which votes are counted and the result declared, with the candidate securing the highest number of votes declared elected.

Thus the electoral process moves through delimitation, voter-list preparation, nomination, campaigning, and finally polling and counting, all overseen by the Election Commission.`,
    keywords: [
      "delimitation of constituencies",
      "preparation of the electoral roll / voters' list",
      "nomination of candidates with declaration of assets and criminal cases",
      "election campaign under the Model Code of Conduct",
      "polling by EVM, counting of votes and declaration of result",
    ],
    examinerTip:
      "The stages must be in the correct sequence — delimitation and the voter list come before nomination and campaigning; jumbling the order costs marks even if all stages are named.",
  },

  // ==========================================================================
  // Chapter 15 — Working of Institutions
  // ==========================================================================
  {
    id: "q-c9-sst-15-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-15",
    classLevel: 9,
    text: "Mention any two powers of the Prime Minister of India.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `The Prime Minister is the head of the government and the most powerful functionary in the Indian political system.

(i) The Prime Minister chairs Cabinet meetings and coordinates the work of different departments.

(ii) The Prime Minister allocates and reshuffles work among ministers, and can also dismiss a minister, since all ministers work under their leadership.`,
    keywords: [
      "chairs Cabinet meetings",
      "coordinates the work of different ministries/departments",
      "allocates work and can dismiss ministers",
    ],
    examinerTip:
      "The Prime Minister, not the President, is the real executive head in India's parliamentary system — mixing up the two roles is a frequent error here.",
  },
  {
    id: "q-c9-sst-15-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-15",
    classLevel: 9,
    text: "Distinguish between the Lok Sabha and the Rajya Sabha.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The Indian Parliament consists of two houses, the Lok Sabha and the Rajya Sabha, which differ in the following ways.

(i) Method of election — members of the Lok Sabha are directly elected by the people, whereas members of the Rajya Sabha are elected indirectly, by the elected members of state legislative assemblies.

(ii) Powers over the government — the Lok Sabha is more powerful; the Council of Ministers, including the Prime Minister, is responsible to the Lok Sabha and can be removed by it through a no-confidence motion, a power the Rajya Sabha does not have.

(iii) Tenure — the Lok Sabha is not a permanent house and can be dissolved before the completion of its five-year term, whereas the Rajya Sabha is a permanent house that is never fully dissolved, with one-third of its members retiring every two years.

Thus while both houses make laws, the Lok Sabha is directly elected and holds the government accountable, while the Rajya Sabha is an indirectly elected permanent body with lesser powers over the executive.`,
    keywords: [
      "Lok Sabha directly elected; Rajya Sabha indirectly elected by state legislators",
      "only Lok Sabha can remove the government through a no-confidence motion",
      "Lok Sabha is not permanent; Rajya Sabha is a permanent house",
    ],
    examinerTip:
      "The power to make the government resign (via a no-confidence motion) belongs only to the Lok Sabha — students who claim both houses share this power lose the key distinguishing point.",
  },
  {
    id: "q-c9-sst-15-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-15",
    classLevel: 9,
    text: "Explain the powers and position of the President of India.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `The President of India is the head of the Indian state and the formal head of the government, executive, legislature and armed forces.

(i) Election — the President is not directly elected by the people; rather, they are elected indirectly, by an electoral college consisting of elected Members of Parliament and elected members of state legislative assemblies.

(ii) Nominal head — all major decisions of the government are taken in the name of the President, but almost always on the advice of the Prime Minister and the Council of Ministers, which is why the President is called a nominal or constitutional head.

(iii) Formal powers — the President appoints the Prime Minister, and on the Prime Minister's advice appoints other ministers; all laws and major policies of the government are made in the President's name.

(iv) Discretionary power in special situations — if no single party or coalition gets a clear majority, the President has some discretion in inviting the leader of the party best placed to form a stable government to become Prime Minister.

(v) Limits on power — the President generally acts on the advice of the Council of Ministers and does not use their powers independently, except in rare and special circumstances such as a hung Parliament.

Thus, though vested with vast formal powers, the President in practice acts mostly on the advice of the elected Council of Ministers, making the office largely a constitutional/nominal one, with real executive power resting with the Prime Minister.`,
    keywords: [
      "elected indirectly by an electoral college of MPs and MLAs",
      "called nominal/constitutional head",
      "acts on the advice of the Prime Minister and Council of Ministers",
      "appoints the Prime Minister",
      "discretionary power in a hung Parliament",
    ],
    examinerTip:
      "The core scoring idea is the gap between the President's formal powers and their actual exercise on ministerial advice — an answer that lists only formal powers without this 'nominal head' concept misses the main point of the question.",
  },

  // ==========================================================================
  // Chapter 16 — Democratic Rights
  // ==========================================================================
  {
    id: "q-c9-sst-16-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-16",
    classLevel: 9,
    text: "What is the Right to Constitutional Remedies? Why is it considered important?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `The Right to Constitutional Remedies gives citizens the right to approach the Supreme Court or a High Court directly if they believe that any of their Fundamental Rights have been violated.

It is considered important because it makes the other Fundamental Rights enforceable, and Dr B. R. Ambedkar therefore called it "the heart and soul" of the Constitution.`,
    keywords: [
      "right to approach the Supreme Court/High Court if Fundamental Rights are violated",
      "makes other Fundamental Rights enforceable",
      "Ambedkar called it the heart and soul of the Constitution",
    ],
    examinerTip:
      "The Ambedkar quotation ('heart and soul') is a specific keyword examiners look for when the question asks 'why is it important' — a generic answer without it scores lower.",
  },
  {
    id: "q-c9-sst-16-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-16",
    classLevel: 9,
    text: "Name the six Fundamental Rights guaranteed by the Indian Constitution.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The Indian Constitution guarantees six Fundamental Rights to its citizens:

(i) Right to Equality

(ii) Right to Freedom

(iii) Right against Exploitation

(iv) Right to Freedom of Religion

(v) Cultural and Educational Rights

(vi) Right to Constitutional Remedies

(The Right to Property was originally a Fundamental Right but was removed from this list by the 44th Constitutional Amendment of 1978, and is now a legal right under Article 300A.)`,
    keywords: [
      "Right to Equality",
      "Right to Freedom, Right against Exploitation, Right to Freedom of Religion",
      "Cultural and Educational Rights, Right to Constitutional Remedies",
    ],
    examinerTip:
      "Right to Property is a common wrong addition — it was removed as a Fundamental Right by the 44th Amendment in 1978 and is now only a legal right, so it must not be listed among the six.",
  },
  {
    id: "q-c9-sst-16-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-16",
    classLevel: 9,
    text: "Explain, with examples, the significance of any five Fundamental Rights guaranteed by the Indian Constitution.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Fundamental Rights are the basic rights of citizens guaranteed by the Constitution, enforceable by courts.

(i) Right to Equality — this guarantees equality before the law, prohibits discrimination on grounds of religion, race, caste, sex or place of birth, and abolishes untouchability, e.g. no citizen can be denied access to shops or wells on grounds of caste.

(ii) Right to Freedom — this includes freedom of speech and expression, freedom to assemble peacefully, and freedom to form associations and unions, e.g. citizens can criticise government policies publicly.

(iii) Right against Exploitation — this prohibits human trafficking, forced labour (begar), and the employment of children below 14 years in hazardous work such as factories and mines.

(iv) Right to Freedom of Religion — every person is free to profess, practise and propagate any religion of their choice, and the state does not favour any one religion.

(v) Cultural and Educational Rights — this protects the right of minorities to conserve their language and culture, and to establish and administer their own educational institutions.

Thus the Fundamental Rights together protect citizens' equality, personal liberty, dignity, religious freedom and cultural identity against arbitrary state or social action.`,
    keywords: [
      "Right to Equality — no discrimination, abolition of untouchability",
      "Right to Freedom — speech, assembly, association",
      "Right against Exploitation — bans forced labour and child labour in hazardous work",
      "Right to Freedom of Religion — free to profess and propagate any religion",
      "Cultural and Educational Rights — minorities can preserve language/culture and run institutions",
    ],
    examinerTip:
      "Each right chosen must be paired with a concrete example — naming only the right's title without illustrating what it protects against loses the explanatory marks.",
  },

  // ==========================================================================
  // Chapter 17 — The Story of Village Palampur
  // ==========================================================================
  {
    id: "q-c9-sst-17-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-17",
    classLevel: 9,
    text: "Name the four factors of production discussed in the chapter.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `The four factors of production needed for producing any good or service are:

(i) Land (and other natural resources)

(ii) Labour

(iii) Physical capital

(iv) Human capital`,
    keywords: [
      "land / natural resources",
      "labour",
      "physical capital",
      "human capital",
    ],
    examinerTip:
      "All four terms together are the value point — students who name only 'land, labour and capital' and omit human capital give an incomplete answer.",
  },
  {
    id: "q-c9-sst-17-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-17",
    classLevel: 9,
    text: "What is multiple cropping? How have farmers in Palampur been able to practise it?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Multiple cropping is the practice of growing more than one crop on the same piece of land during the year.

(i) Meaning — instead of growing a single crop, farmers grow two, three or even more crops on the same land in one farming year.

(ii) Palampur's farmers — most farmers in Palampur grow at least two main crops in a year, and some, using modern methods, are able to grow a third crop of potato between the rabi and kharif seasons.

(iii) Role of irrigation — this has been made possible by well-developed irrigation, since all the land in Palampur is irrigated (from wells and the electric tube well), ending the dependence on the monsoon alone.

Thus assured irrigation is what allows Palampur's farmers to practise multiple cropping and raise farm production through the year.`,
    keywords: [
      "growing more than one crop on the same land in a year",
      "Palampur farmers grow two crops, some grow a third crop of potato",
      "made possible by irrigation (wells, electric tube well) rather than monsoon dependence",
    ],
    examinerTip:
      "The link to irrigation is the key reasoning step — merely stating 'farmers grow many crops' without explaining that assured water supply enables this misses the underlying concept.",
  },
  {
    id: "q-c9-sst-17-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-17",
    classLevel: 9,
    text: "Describe the non-farm activities found in Palampur.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Besides farming, about a fourth of the working people in Palampur are engaged in various non-farm activities.

(i) Dairy — many families keep buffaloes, feeding them on farm-grown fodder, and sell the milk in the nearby town of Raiganj, providing an important non-farm income source.

(ii) Small-scale manufacturing — this involves simple production methods, carried out mostly by hand, with a few workers, usually done at home or in the fields, for example, making baskets or other small goods.

(iii) Shopkeeping — small shopkeepers in Palampur buy various goods from the wholesale market in the nearby town and sell them in the village.

(iv) Transport — with the growth of production and other activities, a demand has arisen for a variety of transport services, and Palampur has a variety of modes of transport, from bullock carts and tongas to jeeps, tractors and trucks, and many people work as rickshaw or tempo drivers.

(v) Non-agricultural labour — some families also earn a livelihood by working as labourers in the non-farm activities described above, since the fixed land in the village cannot provide work to the growing population.

Thus, since farming alone cannot employ everyone in Palampur, dairy, small manufacturing, shopkeeping and transport provide the additional non-farm livelihoods.`,
    keywords: [
      "dairy — buffaloes fed on farm fodder, milk sold in Raiganj",
      "small-scale manufacturing — simple, mostly by hand, at home",
      "shopkeeping — goods bought from town wholesale market",
      "transport — bullock carts, tongas, jeeps, tractors, trucks",
      "growing population cannot all be absorbed by fixed farm land",
    ],
    examinerTip:
      "Five marks needs multiple distinct non-farm activities named with a Palampur-specific detail each (Raiganj for dairy, for instance) — a generic 'some people do other jobs' answer scores poorly.",
  },

  // ==========================================================================
  // Chapter 18 — People as Resource
  // ==========================================================================
  {
    id: "q-c9-sst-18-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-18",
    classLevel: 9,
    text: "What is human capital?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Human capital refers to the stock of skill, education and abilities embodied in the people of a country, which enables them to contribute productively to the economy.

Investment in education, training and health helps build human capital, just as investment in machines and buildings builds physical capital.`,
    keywords: [
      "stock of skill, education and ability embodied in people",
      "built through investment in education, training and health",
    ],
    examinerTip:
      "Human capital must be linked to investment in people (education/health), not simply defined as 'population' — treating the two as the same concept is a common confusion.",
  },
  {
    id: "q-c9-sst-18-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-18",
    classLevel: 9,
    text: "Distinguish between economic activities and non-economic activities.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Human activities can be divided into economic and non-economic activities based on whether they contribute to the national income.

(i) Economic activities — these are activities undertaken for a monetary gain and contribute to the national income; they are further divided into market activities, which involve remuneration to anyone who performs them, whether in the primary, secondary or tertiary sector.

(ii) Non-economic activities — these are activities performed out of love, obligation or a sense of social/religious commitment, and are not remunerated in monetary terms, such as unpaid domestic and voluntary work.

(iii) Example — a teacher's paid work at school is an economic activity, while unpaid household work done by a family member, or activities like helping neighbours or religious/charitable service, is a non-economic activity.

Thus the key distinction is whether the activity generates monetary remuneration and adds to the national income (economic) or not (non-economic).`,
    keywords: [
      "economic activities — for monetary gain, add to national income",
      "non-economic activities — unpaid, done out of love/obligation, not counted in national income",
      "example distinguishing paid work from unpaid domestic/voluntary work",
    ],
    examinerTip:
      "Unpaid housework is frequently miscounted by students as an economic activity because it involves 'work' — the deciding factor is the absence of monetary remuneration and its exclusion from national income.",
  },
  {
    id: "q-c9-sst-18-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-18",
    classLevel: 9,
    text: "Explain the role of education and health in the formation of human capital, and describe the types of unemployment found in India.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Education and health are the two major sources of human capital formation in a country.

(i) Role of education — education helps a person acquire skills, knowledge and information, improves productivity, and provides different tools to understand and reflect on social, political, and cultural changes; the country's National Policy on Education addresses issues such as poor school infrastructure and shortage of trained teachers.

(ii) Role of health — a healthy individual can perform better at their work, and the ability of workers to realise their potential depends on their nutritional and health status; expenditure on health is therefore also seen as an investment.

(iii) Disguised unemployment — this occurs mostly in the agricultural sector, where more people are engaged in a job than actually required, so removing them would not reduce total output at all, e.g. family members all working on a small farm that could be managed by fewer of them.

(iv) Seasonal unemployment — this occurs when people are not able to find jobs during some months of the year, since agricultural activities in India are seasonal in nature, for example between the sowing and harvesting seasons.

(v) Educated unemployment — a distinctive feature of India, where a large number of educated youth, including technically qualified people, are unable to find jobs matching their qualifications.

Thus education and health investments build the human capital of the workforce, while unemployment in India shows up mainly in disguised, seasonal and educated forms rather than as simple joblessness alone.`,
    keywords: [
      "education improves skill, productivity and access to opportunity",
      "health/nutrition affects a worker's productive capacity",
      "disguised unemployment — agriculture, removing workers doesn't cut output",
      "seasonal unemployment — no work in the off season for agriculture",
      "educated unemployment — qualified youth unable to find matching jobs",
    ],
    examinerTip:
      "This is a two-part question — education/health AND unemployment types — an answer covering only human capital formation without naming disguised, seasonal and educated unemployment will not score full marks.",
  },

  // ==========================================================================
  // Chapter 19 — Poverty as a Challenge
  // ==========================================================================
  {
    id: "q-c9-sst-19-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-19",
    classLevel: 9,
    text: "What is the poverty line? How is it estimated in India?",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `The poverty line is a benchmark used to define a person as poor, based on the income or consumption level needed to fulfil a minimum acceptable standard of living.

In India it is estimated in monetary terms, using a minimum calorie requirement along with expenditure on items such as clothing, footwear, fuel, education and healthcare, converted into a per capita monthly expenditure figure; as per the 2011-12 estimates, this was about Rs 816 per person per month in rural areas and Rs 1,000 per person per month in urban areas.`,
    keywords: [
      "minimum income/consumption level needed for a minimum standard of living",
      "based on minimum calorie requirement plus non-food expenditure, in monetary terms",
      "2011-12 estimate — about Rs 816/month rural, Rs 1,000/month urban",
    ],
    examinerTip:
      "The rural and urban poverty-line figures are examiner-specific value points, and rural is always lower than urban since cost of living is lower — reversing the two figures is a common error.",
  },
  {
    id: "q-c9-sst-19-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-19",
    classLevel: 9,
    text: "Who are the poorest of the poor? Name any two social and two economic groups that are most vulnerable to poverty in India.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Poverty in India is not uniform across all groups — some social and economic groups are more vulnerable than others.

(i) Social groups — Scheduled Caste (SC) and Scheduled Tribe (ST) households are among the most vulnerable social groups to poverty.

(ii) Economic groups — rural agricultural labour households and urban casual labour households are the most vulnerable economic groups.

(iii) Poorest of the poor — within these vulnerable groups, women, elderly people and female-headed households are generally the poorest of the poor, since they have little to fall back on when in crisis, and are often the ones facing extreme deprivation within poor households.

Thus the poorest of the poor are concentrated among SC/ST families, casual/agricultural labour households, and within them, women and the elderly.`,
    keywords: [
      "Scheduled Castes and Scheduled Tribes as vulnerable social groups",
      "rural agricultural labour households and urban casual labour households as vulnerable economic groups",
      "women, children, elderly, female-headed households as the poorest of the poor",
    ],
    examinerTip:
      "The distinction between 'social' groups (caste-based, SC/ST) and 'economic' groups (labour-based) is what the question is testing — mixing the two categories together loses the classification mark.",
  },
  {
    id: "q-c9-sst-19-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-19",
    classLevel: 9,
    text: "Explain any three causes of poverty in India and describe any two anti-poverty measures taken by the government.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Poverty in India has deep historical and structural causes, and the government has responded with several anti-poverty programmes.

Causes:

(i) Colonial policies — British colonial rule, and the low level of economic development it left behind, destroyed traditional handicrafts and discouraged industrialisation, keeping incomes low.

(ii) High population growth — the rapid growth of population, particularly among the poor, has added more mouths to feed and led to a fall in the per capita availability of resources.

(iii) Unequal distribution — unequal distribution of land and other resources, along with the erosion of common resources like forests and water bodies that the poor depend on, has also been a major cause of poverty.

Anti-poverty measures:

(iv) Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA), 2005 — this act guarantees 100 days of wage employment in a year to one member of every rural household, providing a legal guarantee of work.

(v) Public Distribution System (PDS) and self-employment schemes — the government runs the PDS to provide subsidised food grains to poor households, alongside self-employment programmes that provide loans at subsidised rates to encourage the poor to set up small businesses.

Thus poverty in India stems from historical, demographic and distributional causes, and is being addressed through employment guarantee, food security and self-employment schemes.`,
    keywords: [
      "colonial policies and low economic development",
      "high population growth reducing per capita resources",
      "unequal distribution of land/resources; erosion of common resources",
      "MGNREGA 2005 — 100 days guaranteed wage employment",
      "Public Distribution System / self-employment schemes as anti-poverty measures",
    ],
    examinerTip:
      "This is a two-part question — causes AND measures — an answer with five causes and no anti-poverty scheme, or vice versa, is capped well below full marks since both parts carry weight.",
  },

  // ==========================================================================
  // Chapter 20 — Food Security in India
  // ==========================================================================
  {
    id: "q-c9-sst-20-1",
    subjectId: "c9-sst",
    chapterId: "c9-sst-20",
    classLevel: 9,
    text: "What is food security? Name its three components.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Food security means availability, accessibility and affordability of food to all people at all times, so that no one has to live in hunger or fear of starvation.

Its three components are: (i) availability of food, meaning food production within the country along with food stocks and imports; (ii) accessibility, meaning food is within reach of every person; and (iii) affordability, meaning an individual has enough money to buy sufficient, safe and nutritious food to meet their dietary needs.`,
    keywords: [
      "availability, accessibility and affordability of food",
      "ensures no one goes hungry or fears starvation",
    ],
    examinerTip:
      "All three components must be named together — an answer giving only 'availability of food' as the definition, without accessibility and affordability, is incomplete.",
  },
  {
    id: "q-c9-sst-20-2",
    subjectId: "c9-sst",
    chapterId: "c9-sst-20",
    classLevel: 9,
    text: "What is meant by 'buffer stock'? Why does the government create it?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Buffer stock is the stock of foodgrains, namely wheat and rice, procured by the government through the Food Corporation of India (FCI).

(i) Procurement — the FCI purchases wheat and rice from farmers in states where there is surplus production, at a pre-announced price called the Minimum Support Price (MSP).

(ii) Purpose — the foodgrains procured are stored in granaries so that they can be distributed in the deficit areas and among the poorer sections of society at a price lower than the market price, known as the Issue Price.

(iii) Meeting shortages — buffer stock also helps to resolve the problem of shortage of food during adverse weather conditions, such as a drought, or during a calamity, when production is expected to fall.

Thus the buffer stock is created to ensure food security, by making surplus grain available in times and places of shortage at an affordable, subsidised price.`,
    keywords: [
      "stock of wheat and rice procured by the Food Corporation of India",
      "procured at the Minimum Support Price (MSP) from farmers in surplus states",
      "distributed at a subsidised Issue Price in deficit areas / during scarcity",
    ],
    examinerTip:
      "MSP (paid to farmers) and Issue Price (charged to consumers) are two distinct terms examiners check for — using one term for both loses a mark.",
  },
  {
    id: "q-c9-sst-20-3",
    subjectId: "c9-sst",
    chapterId: "c9-sst-20",
    classLevel: 9,
    text: "Explain the role of the Public Distribution System (PDS) in ensuring food security in India.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `The Public Distribution System (PDS) is the government's most important instrument for ensuring food security to the poorer sections of society.

(i) Ration shops — the food procured by the Food Corporation of India is distributed through government-regulated ration shops, also called Fair Price Shops, which are now present in most localities, villages, towns and cities.

(ii) Items distributed — ration shops keep a stock of foodgrains such as wheat and rice, sugar and kerosene oil for cooking, which are sold to people at a price lower than the market price, against a valid ration card.

(iii) Types of ration cards — the government issues Antyodaya cards for the poorest of the poor, BPL (Below Poverty Line) cards for other poor families, and APL (Above Poverty Line) cards for those above the poverty line, with different subsidised prices for each category.

(iv) Related schemes — special schemes such as Antyodaya Anna Yojana (AAY) provide highly subsidised food to the poorest families, and revamped PDS schemes have been introduced to strengthen food distribution in remote and backward areas.

(v) Role during crises — the PDS also helped avert famine-like conditions and stabilised prices during periods of shortage, such as during droughts, by ensuring a continuous supply of subsidised foodgrains.

Thus, through a network of ration shops and categorised ration cards, the PDS makes food available, accessible and affordable to vulnerable sections of the population.`,
    keywords: [
      "distribution through ration shops / Fair Price Shops",
      "sells foodgrains, sugar and kerosene below market price against a ration card",
      "Antyodaya, BPL and APL categories of ration cards",
      "Antyodaya Anna Yojana for the poorest families",
      "helps avert famine and stabilise prices during shortages",
    ],
    examinerTip:
      "The three ration-card categories (Antyodaya, BPL, APL) are a specific examiner keyword set — naming only 'BPL and APL cards' and omitting Antyodaya, which covers the poorest of the poor, is a common gap.",
  },
];
