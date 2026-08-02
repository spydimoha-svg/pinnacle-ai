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
];
