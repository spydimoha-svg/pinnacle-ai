import type { Question } from "../../lib/types";

// CLASS 12 ENGLISH — Flamingo Prose (c12-english-01 … c12-english-08).
// Chapter ids copied verbatim from src/data/curriculum/class12.ts.
// Every answer is built around the value points already named in that file's
// boardNotes for each chapter — no new claims about the text are introduced here.

export const C12_ENGLISH_QUESTIONS: Question[] = [
  // ==========================================================================
  // Ch 1 — The Last Lesson
  // ==========================================================================
  {
    id: "q-c12-english-01-1",
    subjectId: "c12-english",
    chapterId: "c12-english-01",
    classLevel: 12,
    text: "M. Hamel calls the French language 'the key to their prison'. What did he mean by this, and how does the idea shape the message of the story?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `M. Hamel means that even though the people of Alsace have lost their land to Prussian rule, their language remains something the conquerors cannot take from them — as long as they hold fast to their own tongue, they hold on to their identity and dignity, as if it were a key that can still open the door out of captivity.

This is M. Hamel's way of naming linguistic chauvinism from the other side: he is condemning his own countrymen, who postponed learning their mother tongue, and at the same time warning that when a people cling to their language, it is the surest way to keep their freedom alive even under foreign occupation. The idea shapes the whole story's message — that losing one's mother tongue is as painful and dangerous as losing one's political freedom, and that language is the last fortress of a nation's identity.

This is also why Franz's change of heart matters: his sudden regret at not having learned French properly, and his new-found love for his last lesson, dramatise exactly the lesson M. Hamel wants Alsace to learn — too late for Franz personally, but as a warning to the reader.`,
    keywords: [
      "key to their prison",
      "linguistic chauvinism",
      "language as identity/freedom",
      "Franz's change of heart",
      "M. Hamel and the Alsace setting",
    ],
    examinerTip:
      "Name linguistic chauvinism and the pain of losing a mother tongue explicitly — retelling the plot of the last class without stating this idea caps the answer at half marks.",
  },
  {
    id: "q-c12-english-01-2",
    subjectId: "c12-english",
    chapterId: "c12-english-01",
    classLevel: 12,
    text: "What was unusual about the atmosphere in M. Hamel's classroom on the day of the last lesson, and what did the presence of the village elders at the back of the room signify?",
    marks: 4,
    type: "sa",
    source: "important",
    answer: `On an ordinary day the classroom would be noisy at the start of school, with desks banging and lessons repeated aloud, but on this day Franz finds an unusual, solemn stillness — no noise at all, and M. Hamel walking up and down instead with a terrible ruler under his arm, gentle rather than angry even though Franz arrives late.

M. Hamel is also dressed unusually, in his best clothes reserved for inspection days or prize-giving — his beautiful green coat, frilled shirt, and the little black silk cap — signalling that he treats this ordinary Monday lesson with the same solemnity as the most important occasions of the school year.

Most striking of all, the back benches, usually empty, are filled with village elders — old Hauser with his spectacles and his old primer, the former mayor, the former postmaster, and other older people of the village — sitting quietly through the lesson. Their presence is a silent tribute to M. Hamel's forty years of service and an expression of regret at not having valued their own language and schooling enough while they could still choose it; it shows that the loss of the last French lesson is felt by the whole community, not just by the schoolchildren.`,
    keywords: [
      "unusual stillness instead of the daily noise",
      "M. Hamel's best clothes",
      "village elders on the back benches",
      "old Hauser and his primer",
      "community's silent tribute and regret",
    ],
    examinerTip:
      "List the specific unusual details — M. Hamel's clothes and the elders at the back — and state plainly that they signify the whole village's tribute, not just describe the classroom.",
  },

  // ==========================================================================
  // Ch 2 — Lost Spring
  // ==========================================================================
  {
    id: "q-c12-english-02-1",
    subjectId: "c12-english",
    chapterId: "c12-english-02",
    classLevel: 12,
    text: "Compare Saheb and Mukesh as children caught in the 'web of poverty' in Anees Jung's Lost Spring.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Anees Jung's Lost Spring is built in two parts, and each part gives us a boy trapped in the same poverty but responding to it very differently.

Saheb-e-Alam, in "Sometimes I Find a Rupee, Sometimes a Whole Silver Coin", is a ragpicker in the Seemapuri slum near Delhi. For Saheb, garbage is gold — it is his only means of survival. He and thousands like him migrated from Bangladesh after their homes were lost, and they now live in a settlement without an identity, without permits, but with ration cards that at least let them buy food. When Saheb takes a job at a tea stall, he becomes bonded to it and loses the carefree, barefoot freedom he once had as a ragpicker — Anees Jung uses this to show that even a small step "up" only tightens the web of poverty around him. Saheb does not dare to dream; he simply drifts through his circumstances.

Mukesh, in "I Want to Drive a Car", belongs to a family of bangle makers in Firozabad, where generations have worked around dangerous glass furnaces, losing their eyesight to the very glitter they produce. Unlike Saheb, Mukesh dares to dream — he wants to become a motor mechanic and drive a car himself, breaking away from the family's traditional occupation, even though the "stigma of caste" and the pressure of family, apathetic parents, moneylenders and the police keep most children of Firozabad trapped in the same cycle.

Thus, both boys are victims of the same web of poverty, but Saheb accepts his fate passively while Mukesh's dream — however uncertain its outcome — is the story's one flicker of hope.`,
    keywords: [
      "web of poverty",
      "Saheb in Seemapuri",
      "Mukesh in Firozabad",
      "Mukesh dares to dream, Saheb does not",
      "stigma of caste",
      "child labour",
    ],
    examinerTip:
      "The comparison itself is the answer — a summary of only one boy's story, without setting it against the other, is the most common way marks are lost here.",
  },
  {
    id: "q-c12-english-02-2",
    subjectId: "c12-english",
    chapterId: "c12-english-02",
    classLevel: 12,
    text: "Why does Anees Jung title her essay 'Lost Spring'? What, according to her, keeps children like Saheb and Mukesh from ever escaping the poverty they are born into?",
    marks: 4,
    type: "sa",
    source: "important",
    answer: `The title 'Lost Spring' uses spring as a symbol of childhood — the season of hope, growth and carefree play — and calls it "lost" because the children Anees Jung writes about are robbed of exactly this: Saheb and the ragpickers of Seemapuri, and Mukesh and the bangle makers of Firozabad, never get to experience a real childhood free of labour and want, growing old before their years in the struggle simply to survive.

Jung is careful to identify what keeps this poverty a "web" rather than a passing hardship: for Saheb's community, it is the absence of an identity — as migrants from Bangladesh they have no proper documentation or rights, only ration cards that let them buy grain but nothing else, so their poverty is structural, not accidental. For Mukesh's community in Firozabad, it is a combination of the "stigma of caste" that ties bangle-making families to their inherited trade, the crushing grip of moneylenders (sahukars), apathetic parents worn down by tradition, and an indifferent administration and police force who exploit the workers rather than protect them, including from illegal, hazardous glass furnaces that ruin their eyesight.

Jung's underlying argument is that poverty here is not simply a lack of money but a "vicious circle" maintained by social apathy — of parents, garib nawaz (self-styled patrons), bureaucrats and law-enforcers alike — so that even children who dare to dream, like Mukesh, face structures deliberately or carelessly built to keep them exactly where they are.`,
    keywords: [
      "spring as symbol of childhood, lost to poverty",
      "Seemapuri — no identity, only ration cards",
      "Firozabad — stigma of caste, sahukars",
      "vicious circle of poverty",
      "apathy of parents, bureaucrats, police",
    ],
    examinerTip:
      "Explain the title's symbolism first, then name the structural causes — identity-lessness in Seemapuri and caste plus moneylenders in Firozabad — rather than a general statement that 'poverty is bad'.",
  },

  // ==========================================================================
  // Ch 3 — Deep Water
  // ==========================================================================
  {
    id: "q-c12-english-03-1",
    subjectId: "c12-english",
    chapterId: "c12-english-03",
    classLevel: 12,
    text: "How did William Douglas overcome his fear of water, and what life lesson did he draw from the experience?",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Douglas's fear of water began in childhood, when a boy knocked him down in the YMCA pool as a joke and he sank to the bottom, terrified, swallowing water and nearly drowning before he was rescued. The experience left him with a deep-seated terror of water that stayed with him for years, even though outwardly he continued to swim in lakes and rivers.

Determined to conquer this fear rather than live with it, Douglas hired an instructor and underwent a systematic, months-long training programme: first a rope was tied round his chest so the instructor could pull him up if he went under, and he practised putting his face in the water and exhaling, then inhaling above the surface; next he practised kicking with a rope attached, then moving his arms; and finally he put all these separate movements together into a complete stroke. Even after this training, when he tried alone in a lake, the old terror briefly returned — so he forced himself to go back into the water and swim the length of the pool alone, again and again, until the fear was fully gone.

The life lesson Douglas draws is that fear is often worse than the danger itself — he recalls Roosevelt's words, "All we have to fear is fear itself" — and that fear can be conquered only through deliberate, sustained effort and by facing the exact experience that caused it, not by avoiding it.`,
    keywords: [
      "terror at the YMCA pool",
      "systematic training with the instructor",
      "rope tied round his chest",
      "swims the length of the pool alone",
      "all we have to fear is fear itself",
    ],
    examinerTip:
      "The marking scheme rewards the terror → systematic training → triumph sequence plus the stated life lesson — a narration of the swimming-pool incident alone, without this arc, loses marks.",
  },
  {
    id: "q-c12-english-03-2",
    subjectId: "c12-english",
    chapterId: "c12-english-03",
    classLevel: 12,
    text: "Describe exactly what happened when the boy threw Douglas into the YMCA pool, and explain why the psychological effects of the experience outlasted any physical harm.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `A boy about eighteen years old came to the pool one day, picked Douglas up bodily and threw him into the deep end as a joke, expecting him, like most boys, to know how to swim. Douglas, only about ten or eleven and unable to swim, sank straight to the bottom, and in that instant of terror planned to make one big jump and spring to the surface like a cork — but his legs would not move, and he went down again and again, swallowing water each time, his lungs aching, his senses blurring, until he passed into a kind of paralysed unconsciousness before someone finally pulled him out.

Physically, Douglas recovered within minutes — he was back on his feet with no lasting injury. But the psychological effect proved far more lasting: for years afterward, even the sight of a swimming pool, lake or placid creek could bring back a wave of the same paralysing terror, and it kept him from canoeing, boating and fishing trips he would otherwise have enjoyed. Douglas himself makes the point directly — the physical danger passed in minutes, but the fear it planted took years of deliberate, systematic effort to remove, showing that trauma can outlast the incident that caused it by a very long margin.`,
    keywords: [
      "boy of eighteen throws Douglas in as a joke",
      "sinks, plans a jump, legs paralysed with fear",
      "swallows water repeatedly, loses consciousness",
      "no lasting physical injury",
      "psychological terror outlasts the physical danger",
    ],
    examinerTip:
      "Narrate the pool incident in sequence and then explicitly contrast the brief physical danger with the years-long psychological fear — the contrast itself is the value point examiners look for.",
  },

  // ==========================================================================
  // Ch 4 — The Rattrap
  // ==========================================================================
  {
    id: "q-c12-english-04-1",
    subjectId: "c12-english",
    chapterId: "c12-english-04",
    classLevel: 12,
    text: "Trace how the image of the rattrap becomes a metaphor for human life in Selma Lagerlöf's story.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `The peddler himself first conceives of the rattrap idea: wandering the world selling rattraps, he comes to see the world as nothing but a big rattrap, set out to trap people with its riches, joys, shelter and food — once a person is tempted to grab at these, the trap snaps shut and there is no escape.

The peddler applies this idea cynically to himself and to others he meets — the crofter who is robbed, the ironmaster who mistakes him for an old regimental comrade — believing everyone is either bait or prey in this same trap. But it is Edla Willmansson's genuine compassion, her kindness in treating him with respect and trust despite knowing he is a thief, that begins to change him. On Christmas Day he leaves her a gift: an actual rattrap, along with a letter in which he now calls himself "Captain von Stahle" and thanks her for helping him escape the trap of bitterness and suspicion he had been caught in.

The rattrap thus moves from being the peddler's cynical metaphor for a world designed to catch and ruin the poor, to becoming, at the end, a symbol of the redemption Edla's compassion makes possible — the peddler escapes the trap he once believed inescapable, and the theme of human goodness triumphs.`,
    keywords: [
      "world as a big rattrap",
      "bait: riches, shelter, joy",
      "Edla's compassion",
      "redemption through kindness",
      "Captain von Stahle letter",
    ],
    examinerTip:
      "The arc from the peddler's own cynical idea to his escape from it IS the answer — naming Edla's compassion as the agent of that redemption is the value point to state explicitly.",
  },
  {
    id: "q-c12-english-04-2",
    subjectId: "c12-english",
    chapterId: "c12-english-04",
    classLevel: 12,
    text: "How does the crofter's hospitality towards the peddler, and the peddler's betrayal of it, set up the theme of trust in 'The Rattrap'?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Early in the story, a lonely old crofter takes the wandering peddler into his cottage for the night, sharing his food and tobacco freely and treating him as a welcome guest rather than a stranger to be feared. In his loneliness, the crofter grows confiding and even boastful, telling the peddler that he sold his cow for thirty kronor and keeps the money hidden in the cottage — an act of trust extended to a man he has known for only an evening.

The peddler repays this trust with theft: once the crofter is asleep, he steals the thirty kronor and slips away into the forest, later losing his way among the trees exactly as if he himself had wandered into the great rattrap he keeps comparing the world to.

This early episode matters because it seems to confirm the peddler's own cynical philosophy — that the world is a trap baited with money and comfort, and that anyone, given the chance, will take the bait — before the story goes on to overturn that philosophy through Edla's very different, sustained trust in him at the ironmaster's house, which the peddler this time does not betray.`,
    keywords: [
      "crofter's hospitality and confided savings",
      "peddler steals the thirty kronor",
      "confirms the peddler's cynical rattrap philosophy",
      "sets up the later contrast with Edla's trust",
    ],
    examinerTip:
      "Frame the crofter episode as proof of the peddler's cynicism first — the marks come from linking it forward to how Edla's trust later reverses this same pattern, not just narrating the theft.",
  },

  // ==========================================================================
  // Ch 5 — Indigo
  // ==========================================================================
  {
    id: "q-c12-english-05-1",
    subjectId: "c12-english",
    chapterId: "c12-english-05",
    classLevel: 12,
    text: "What does the Champaran episode in 'Indigo' reveal about Gandhi's method of leadership?",
    marks: 6,
    type: "la",
    source: "important",
    answer: `Gandhi travelled to Champaran at the request of Rajkumar Shukla to investigate the plight of sharecroppers forced under the tinkathia system to grow indigo on three-twentieths of their land for their British landlords, even after synthetic indigo had made natural indigo unprofitable, so that landlords began accepting payment to release peasants from the arrangement instead.

Gandhi's leadership shows itself first in his method of enquiry — he insisted on hearing the peasants' own depositions directly, in their own words, and involved local lawyers and the peasants themselves rather than simply arguing the case for them, teaching them along the way that they could stand up for their own rights and freedom from fear. When the British sued him for defying an order to leave Champaran, Gandhi's decision to plead guilty and accept the punishment rather than offer bail was itself a lesson in civil disobedience — obeying a law he considered unjust would have been a greater wrong.

The Champaran episode's real symbolic victory is the compromise in which the landlords agreed to refund only 25 per cent of the money they had illegally taken. Gandhi tells his co-workers that the amount refunded mattered far less than the fact that the landlords had, for the first time, surrendered part of their prestige — the peasants had learnt that they had rights and defenders, and this taught them courage. Even the local lawyers, who had never before dared to work directly with peasants, changed their attitude towards Gandhi's insistence on self-reliance.

Thus Champaran reveals Gandhi's leadership as one built on personal example, courage to face imprisonment, and teaching people self-reliance and fearlessness — lessons Gandhi himself calls the deeper purpose of the whole episode.`,
    keywords: [
      "tinkathia system",
      "peasants' own depositions",
      "pleads guilty rather than offer bail",
      "15% (25%) refund compromise — prestige over amount",
      "lawyers' change of heart",
      "self-reliance and civil disobedience",
    ],
    examinerTip:
      "Cite the refund compromise explicitly and state that the amount mattered less than the landlords surrendering prestige — this is the near-certain long answer and self-reliance is the lasting lesson examiners expect named.",
  },
  {
    id: "q-c12-english-05-2",
    subjectId: "c12-english",
    chapterId: "c12-english-05",
    classLevel: 12,
    text: "How did Rajkumar Shukla persuade Gandhi to visit Champaran, and what does his persistence reveal about him?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Rajkumar Shukla was a poor, unlettered but resolute peasant from Champaran who had heard about the injustice of the indigo sharecropping system and was determined to bring it to Gandhi's attention. He first approached Gandhi at the Lucknow session of the Congress in 1916 and pleaded with him to visit Champaran, though Gandhi at the time knew nothing about indigo and had no plans to go there.

Shukla did not give up after this one meeting — he followed Gandhi to Cawnpore and then all the way to Gandhi's ashram near Ahmedabad, staying there for weeks, patiently waiting until Gandhi's other engagements were done, and gently but persistently reminding him of his promise to visit Champaran.

Gandhi himself admits he agreed largely because of Shukla's sheer tenacity rather than any prior conviction about the cause, calling him steadfast in his own quiet, illiterate way. This persistence reveals Shukla as a man of unwavering determination and courage, willing to travel and wait indefinitely for a cause larger than himself, and it is this very quality — an ordinary peasant's refusal to be brushed aside — that set in motion the entire Champaran campaign.`,
    keywords: [
      "meets Gandhi at the Lucknow Congress session, 1916",
      "follows Gandhi to Cawnpore and then to the ashram",
      "waits patiently for weeks",
      "Gandhi agrees because of Shukla's tenacity",
      "illiterate peasant's determination",
    ],
    examinerTip:
      "The value point is Shukla's persistence itself, not the indigo issue — trace the specific stages (Lucknow, Cawnpore, the ashram) to show it was sustained pursuit, not a single request, that convinced Gandhi.",
  },

  // ==========================================================================
  // Ch 6 — Poets and Pancakes
  // ==========================================================================
  {
    id: "q-c12-english-06-1",
    subjectId: "c12-english",
    chapterId: "c12-english-06",
    classLevel: 12,
    text: "How does Asokamitran use gentle satire to expose the hierarchy and pretensions at Gemini Studios' make-up department?",
    marks: 4,
    type: "sa",
    source: "important",
    answer: `Asokamitran's account of the make-up department at Gemini Studios is built almost entirely on gentle satire rather than plot — the humour and irony are themselves the point of the chapter, not a decoration around it.

He mocks the elaborate office hierarchy — the way a make-up man's rank determined which star he was allowed to touch up, and the absurd amount of face powder used to lighten complexions until performers looked "extra fair," which the writer wryly notes had more to do with class snobbery than with acting need. The figure of Subbu, the resourceful and multi-talented but perennially underappreciated employee, is used to gently satirise how Gemini Studios' founder S. S. Vasan surrounded himself with people who flattered him while genuine talent like Subbu's went unrewarded with real authority. The account of the poet-turned-office-boy who briefly appears with legendary poet-cum-freedom-fighter Subramania Bharati's connections is another instance of quiet irony — greatness sitting unnoticed in a corner of the studio's petty office politics.

Through this understated, often self-deprecating tone, Asokamitran exposes how a place built around glamour and art was, underneath, run by ordinary, often silly, office rivalries and status games — the satire is gentle because the writer never condemns anyone outright, only lets their pretensions speak for themselves.`,
    keywords: [
      "Gemini Studios make-up department hierarchy",
      "gentle satire and irony",
      "Subbu and the office hierarchy",
      "understatement",
    ],
    examinerTip:
      "The question is about the satire on the hierarchy, not the events themselves — quote or point to specific instances of understatement rather than summarising who did what at the studio.",
  },
  {
    id: "q-c12-english-06-2",
    subjectId: "c12-english",
    chapterId: "c12-english-06",
    classLevel: 12,
    text: "What does Asokamitran mean when he says Gemini Studios achieved 'national integration' quite unselfconsciously, and how is this an example of his ironic style?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Asokamitran notes that Gemini Studios drew together people from every corner of India — Bengal, Maharashtra, Andhra, Punjab, Tamil Nadu and elsewhere — who worked side by side on films, with English becoming the practical, functional language that let them communicate across their many mother tongues.

He points out, with quiet irony, that this coming together of people from different linguistic and regional backgrounds happened simply because a film studio needed it to run smoothly, not because of any deliberate ideology — yet it achieved, in ordinary daily practice, exactly what the "socially conscious" intelligentsia of the time spoke about earnestly, with "knitted eyebrows," as the lofty goal of "national integration."

The irony lies in this contrast between effortless, practical unity at Gemini Studios and the self-important rhetoric about national integration current elsewhere — Asokamitran's understated observation suggests that genuine integration is often achieved through shared, ordinary work rather than through solemn public discourse about it.`,
    keywords: [
      "people from many regions working together at Gemini Studios",
      "English as the functional common language",
      "achieved unselfconsciously, not by design",
      "contrast with the 'socially conscious' intelligentsia's rhetoric",
      "irony of practical unity versus lofty talk",
    ],
    examinerTip:
      "Name the phrase 'national integration' and state explicitly that it happened by practical necessity, not design — the irony against the intelligentsia's rhetoric is the point being tested.",
  },

  // ==========================================================================
  // Ch 7 — The Interview
  // ==========================================================================
  {
    id: "q-c12-english-07-1",
    subjectId: "c12-english",
    chapterId: "c12-english-07",
    classLevel: 12,
    text: "'The interview is looked upon as an intrusion into one's privacy by some, while others enjoy the celebrity status it brings.' Discuss with reference to the celebrities' views cited and Umberto Eco's response to being interviewed.",
    marks: 4,
    type: "sa",
    source: "important",
    answer: `Christopher Silvester's introduction, in the first part of "The Interview", records the hostility many celebrated writers felt towards being interviewed. Rudyard Kipling called it "a monstrous impertinence" and likened it to being shot; Saul Bellow believed it reduced a serious writer's status to that of a performing celebrity, "like a chimp doing tricks"; H. G. Wells and V. S. Naipaul also treated interviews with contempt or refusal, seeing the form as diminishing and even predatory towards a writer's real work.

Against this, the second part of the chapter — the actual interview of Umberto Eco by Mukund Padmanabhan — presents a strikingly different attitude. Eco appears completely at ease with the interview process, treating it good-humouredly rather than as an intrusion. He is candid about how he manages to write so much across so many fields, attributing it to using "interstices," the small gaps of time between commitments, and explains his idea of "empty spaces" — that most of what looks like idle or wasted time is in fact where real thinking and writing gets done.

The chapter's structure deliberately contrasts these two positions: the celebrities' hostility on one side and Eco's genial openness on the other, so that answering from only the first part — the general views on interviews — while ignoring Eco's own interview is the standard trap the chapter sets for students.`,
    keywords: [
      "interview as a modern art form / intrusion",
      "Marquez, Rushdie, Kipling on interviews",
      "Umberto Eco's ease",
      "empty spaces / interstices theory",
    ],
    examinerTip:
      "This is a two-part chapter and questions exploit that — answering only from Part I's celebrity hostility, without Eco's contrasting ease and his 'empty spaces' idea, is the standard way marks are lost.",
  },
  {
    id: "q-c12-english-07-2",
    subjectId: "c12-english",
    chapterId: "c12-english-07",
    classLevel: 12,
    text: "According to Christopher Silvester, what value does the interview hold as a historical record, even for those who publicly despised it — with reference to Lenin?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Christopher Silvester argues that despite the hostility many writers and public figures expressed towards being interviewed, the interview form has become an indispensable source of historical and biographical record — preserving, in a subject's own words, opinions, character and detail that formal writing or official records often do not capture.

He offers Lenin as a striking example: Lenin dismissed the interview as a "bourgeois" medium, unworthy of a serious revolutionary and beneath the dignity of his cause. Yet he still gave a number of interviews during his political life, recognising their practical value as a tool for reaching a wider public and shaping opinion in favour of his revolution.

Silvester uses this example to make his larger point — that even public figures who condemned the interview in principle relied on it in practice, which is exactly why the form has endured as a valuable record of how significant people actually spoke, thought and represented themselves to the world, regardless of their stated contempt for it.`,
    keywords: [
      "interview as an important historical/biographical record",
      "Lenin calls it a 'bourgeois' medium",
      "Lenin still gives interviews for propaganda value",
      "hostility in principle versus reliance in practice",
    ],
    examinerTip:
      "Name Lenin specifically and the contradiction between his stated contempt and his actual use of interviews — this contradiction is exactly what the question is testing.",
  },

  // ==========================================================================
  // Ch 8 — Going Places
  // ==========================================================================
  {
    id: "q-c12-english-08-1",
    subjectId: "c12-english",
    chapterId: "c12-english-08",
    classLevel: 12,
    text: "Bring out the theme of fantasy versus reality in 'Going Places', with reference to Sophie and Jansie.",
    marks: 4,
    type: "sa",
    source: "important",
    answer: `Sophie, a working-class teenage girl, constantly escapes her limited circumstances through elaborate daydreams — she imagines owning a boutique, becoming an actress, and, most fantastically, believes she may actually meet and marry the famous footballer Danny Casey after a chance sighting near the stadium. These fantasies are Sophie's way of coping with a future she otherwise expects to be as ordinary and constrained as her surroundings.

Jansie, Sophie's more practical and grounded friend, functions as the deliberate foil to this escapism — she accepts the reality that she will most likely work in the biscuit factory like the other girls of their background, and she is skeptical, even mildly mocking, of Sophie's grand claims about meeting Casey. Through Jansie's realism, the story sharpens just how far Sophie's fantasy departs from what is actually possible for her.

The ambiguous ending, where Sophie sits alone by the canal waiting for a meeting with Casey that clearly will never happen, should be read not as an unresolved plot point but as Sophie's retreat further into fantasy rather than facing her reality — the story closes with escapism unbroken, underlining that Sophie's daydreaming is itself the tragedy, born of the limits her working-class life imposes on her.`,
    keywords: [
      "Sophie's fantasies",
      "Jansie as the foil",
      "escapism versus reality",
      "ambiguous canal ending as retreat into fantasy",
    ],
    examinerTip:
      "The whole question is fantasy vs reality — name Sophie's daydreaming as escapism from her working-class limits and use Jansie's realism as the deliberate contrast, rather than simply narrating the Danny Casey episode.",
  },

  // ==========================================================================
  // Ch 9 — My Mother at Sixty-six
  // ==========================================================================
  {
    id: "q-c12-english-09-1",
    subjectId: "c12-english",
    chapterId: "c12-english-09",
    classLevel: 12,
    text: "Explain the two similes Kamala Das uses for her mother in 'My Mother at Sixty-six', and how the poem's ending reflects the poet's feelings.",
    marks: 4,
    type: "sa",
    source: "important",
    answer: `Driving to the airport, the poet looks at her mother dozing beside her and sees her face "ashen like that of a corpse" — a simile that startles the poet into suddenly realising, with pain, that her mother truly is as old as she looks. She quickly pushes the thought away and looks instead at young trees "sprinting" past and merry children spilling out of their homes, images of youth and vitality that contrast with her mother's ageing.

After the security check at the airport, she looks at her mother again and this time compares her wan, pale face to "a late winter's moon" — a second simile that, unlike the first, is gentler but still carries the same fading, dwindling quality, deepening the poet's "old familiar ache," the childhood fear of losing a parent.

Despite this ache, all the poet says aloud is "See you soon, Amma," and all she does is "smile and smile and smile" — the repetition making the smile sound forced and hollow rather than happy. This ironic parting gesture, hiding real fear and pain behind a brave, reassuring face, is the poem's closing comment on how people often mask their deepest anxieties about ageing and mortality in ordinary partings.`,
    keywords: [
      "ashen like that of a corpse",
      "as a late winter's moon",
      "old familiar ache / childhood's fear",
      "smile and smile and smile — irony",
    ],
    examinerTip:
      "Quote the image first, then explain it — bare explanation of the similes without the actual quoted phrase loses a mark; the ironic repetition in 'smile and smile and smile' must be named as masking fear, not real happiness.",
  },

  // ==========================================================================
  // Ch 10 — Keeping Quiet
  // ==========================================================================
  {
    id: "q-c12-english-10-1",
    subjectId: "c12-english",
    chapterId: "c12-english-10",
    classLevel: 12,
    text: "What does Pablo Neruda mean by 'keeping quiet' in the poem, and why does he say this stillness should not be confused with death?",
    marks: 4,
    type: "sa",
    source: "important",
    answer: `Neruda invites the whole world to count to twelve and keep still for once, without the usual rush of languages, engines and hurried activity. He extends this stillness to fishermen who would stop harming whales, and to men gathering salt or waging war, imagining a moment of universal pause and introspection that could bring about a rare, unaccustomed sense of human brotherhood — a moment of feeling "a sudden strangeness" together.

Neruda is explicit that this stillness must not be confused with total inactivity or with death — he states directly, "I want no truck with death," making clear that keeping quiet is not about giving up on life or stopping altogether. Instead, it is a temporary, deliberate pause: life goes on, but for once without the ceaseless motion and aggression that keep people from ever reflecting on what they are doing to each other and to the earth.

The poem's underlying idea is that this stillness offers a chance for self-introspection and for humanity to save itself from the very "sadness" of never understanding itself or threatening its own survival — Neruda even suggests that perhaps the earth itself can teach us this lesson, since in nature things seem dead in winter and later come back to life.`,
    keywords: [
      "counting to twelve and keeping still",
      "no truck with death",
      "stillness is not total inactivity",
      "universal brotherhood / introspection",
      "earth as teacher — apparent death and renewal",
    ],
    examinerTip:
      "The marks turn on one distinction: state explicitly that Neruda wants stillness, not death or idleness — an answer that reads the poem as wishing for inactivity or death loses the central point.",
  },

  // ==========================================================================
  // Ch 11 — A Thing of Beauty
  // ==========================================================================
  {
    id: "q-c12-english-11-1",
    subjectId: "c12-english",
    chapterId: "c12-english-11",
    classLevel: 12,
    text: "How does John Keats develop the idea that 'a thing of beauty is a joy forever' in the poem, with reference to the catalogue of beautiful things he lists?",
    marks: 4,
    type: "sa",
    source: "important",
    answer: `Keats opens the excerpt from Endymion with the famous line, "A thing of beauty is a joy forever," and immediately explains why: its loveliness increases with time and it never passes into nothingness, so it will always remain a quiet, peaceful bower for us to sleep in, full of sweet dreams, good health and calm breathing.

To support this, Keats lists a wide catalogue of beautiful, everyday things that keep a wreath of flowers binding us to the earth despite life's despondence — the sun, the moon, trees young and old giving shade to simple sheep, daffodils growing among green surroundings, clear cool streams making a cooling shelter against the hot summer heat, and the musk-rose blooms among the thick undergrowth of the forest. He calls this abundance of natural beauty "an endless fountain of immortal drink, pouring unto us from the heaven's brink."

The poem's deeper claim is that in spite of all the pain, suffering, and lack of noble qualities among humankind, some shape of beauty is always at work to move away the pall — the dark cloud — from our spirits, which is why Keats values beauty as something that outlasts and outweighs human suffering.`,
    keywords: [
      "a thing of beauty is a joy forever",
      "catalogue of beautiful things — sun, moon, trees, daffodils, musk-rose",
      "endless fountain of immortal drink",
      "excerpt from Endymion",
      "beauty moves away the pall from dark spirits",
    ],
    examinerTip:
      "The chapter is short and heavily quoted — name it as an excerpt from Endymion and quote at least one image from the catalogue rather than only paraphrasing 'beauty makes us happy'.",
  },

  // ==========================================================================
  // Ch 12 — A Roadside Stand
  // ==========================================================================
  {
    id: "q-c12-english-12-1",
    subjectId: "c12-english",
    chapterId: "c12-english-12",
    classLevel: 12,
    text: "'A Roadside Stand' is a poem of social protest. Discuss with reference to the rural-urban divide Robert Frost presents.",
    marks: 4,
    type: "sa",
    source: "important",
    answer: `Robert Frost's poem describes a small, shabby roadside stand set up by poor rural people beside a highway, hoping for a little money from the wealthy city folk speeding past in their cars. The stand's crude, pleading signboard begs passers-by to stop and buy their produce or crafts, but the cars merely glance and speed away, sometimes even scornful of the "childish" landscape the villagers offer.

Frost turns the poem into social protest by attacking the false promises made to the rural poor — politicians and city planners promise to move them to "villages in the city's edge," provide them with movies and the "throngs of artists" for entertainment, and modernise their lives, but these promises never materialise, leaving the villagers poorer and more neglected than before. Frost bitterly calls such reformers "greedy good-doers" and "beneficent beasts of prey," accusing them of exploiting the poor in the very act of claiming to help them.

The poem's anger is directed squarely at this economic and social injustice — the money that never reaches the rural poor and the empty promises of progress — rather than at the beauty or hardship of country life itself; the speaker even imagines, in his frustration, that it would be kinder to put the roadside sellers "out of their pain" than to let false hope of the city's wealth go on tormenting them.`,
    keywords: [
      "roadside stand and the passing cars",
      "false promises of the city's wealth",
      "greedy good-doers, beneficent beasts of prey",
      "money the villagers never see",
      "Frost's anger — social protest, not scenery",
    ],
    examinerTip:
      "Keep the answer on the money the villagers never see and the politicians' hollow promises — writing about the beauty or hardship of the countryside instead of the economic injustice misses Frost's protest entirely.",
  },

  // ==========================================================================
  // Ch 13 — Aunt Jennifer's Tigers
  // ==========================================================================
  {
    id: "q-c12-english-13-1",
    subjectId: "c12-english",
    chapterId: "c12-english-13",
    classLevel: 12,
    text: "Bring out the contrast between the tigers and Aunt Jennifer in Adrienne Rich's 'Aunt Jennifer's Tigers', and explain how the poem comments on marriage.",
    marks: 5,
    type: "sa",
    source: "important",
    answer: `Aunt Jennifer embroiders a panel of tigers that prance across the screen with "sleek chivalric certainty" — bold, bright, fearless creatures who "do not fear the men beneath the tree" and move with a confident, prancing pride. They represent everything Aunt Jennifer herself is denied: freedom, fearlessness and untroubled self-assurance.

Aunt Jennifer herself is presented in sharp contrast — her fingers, as she works the wool, flutter nervously through her needle, and even "the ivory needle" feels hard for her to pull, showing her physical weakness and fatigue. The reason is made explicit: "the massive weight of Uncle's wedding band sits heavily upon Aunt Jennifer's hand," the wedding ring standing as a symbol of a controlling, oppressive marriage that has drained her of vitality and confidence.

In the final stanza, Rich extends this contrast beyond Aunt Jennifer's life: when she is dead, her hands, "terrified," will finally lie still, "ringed with ordeals she was mastered by" — the ordeals of her marriage will only end with her death. Yet the tigers she created "will go on prancing, proud and unafraid," continuing to embody the freedom she never had. The poem is thus a feminist reading of marriage as confinement, where art created by an oppressed woman outlives and transcends the very oppression that produced it.`,
    keywords: [
      "tigers' sleek chivalric certainty",
      "fluttering fingers, ivory needle hard to pull",
      "massive weight of Uncle's wedding band",
      "ringed with ordeals she was mastered by",
      "the tigers will go on prancing",
    ],
    examinerTip:
      "A feminist reading is expected — the tigers' fearlessness against the weight of Uncle's wedding band IS the answer, and closing on 'the tigers will go on prancing' after Aunt Jennifer's death is the point examiners look for.",
  },

  // ==========================================================================
  // Ch 14 — The Third Level
  // ==========================================================================
  {
    id: "q-c12-english-14-1",
    subjectId: "c12-english",
    chapterId: "c12-english-14",
    classLevel: 12,
    text: "What is the 'third level' in Jack Finney's story, and how does Sam's letter prove that Charley's experience was more than a personal fantasy?",
    marks: 4,
    type: "sa",
    source: "important",
    answer: `Charley, the narrator, claims to have stumbled onto a third level at Grand Central Station — a level that officially does not exist, since the station has only two — which turns out to be a gateway back to the year 1894. He tries to buy tickets there to escape with his wife Louisa to a simpler, calmer past, away from the anxieties of modern life such as the threat of nuclear war, high taxes and constant tension.

Charley's psychiatrist friend dismisses this as a "waking-dream wish fulfillment," a symptom of Charley's own insecurity, and Charley himself briefly doubts his own experience after he fails to find the third level again despite repeated searching.

The final twist, however, is Sam's letter: Sam, a friend of Charley's who vanished mysteriously, is discovered to have actually reached 1894 and settled there — Charley finds a first-day-cover envelope, addressed to him and postmarked in the past, tucked inside his father's stamp collection, in which Sam writes that he found the third level too and is now happily living in Galesburg in 1894. This proves the third level was not just Charley's private fantasy but a real, shared escape from modern-day anxiety.`,
    keywords: [
      "third level does not officially exist",
      "escape from modern anxiety",
      "waking-dream wish fulfillment",
      "Sam's first-day-cover letter",
      "reality versus fantasy — the letter as proof",
    ],
    examinerTip:
      "Read the third level as a psychological escape from the insecurity of modern life, not literal time travel — Sam's letter is the proof that the escape was shared and real within the story, not unique to Charley alone.",
  },

  // ==========================================================================
  // Ch 15 — The Tiger King
  // ==========================================================================
  {
    id: "q-c12-english-15-1",
    subjectId: "c12-english",
    chapterId: "c12-english-15",
    classLevel: 12,
    text: "How is the title 'The Tiger King' ironic? Discuss with reference to the prophecy and the Maharaja's death.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `At birth, astrologers prophesy that the Maharaja of Pratibandapuram will one day die at the hands of a tiger, specifically the hundredth tiger he encounters. Determined to defy this prophecy, the young king declares he will personally kill a hundred tigers and vows to marry only into a family that owns plenty of tigers for him to hunt, becoming obsessively devoted to tiger-hunting as a means of controlling his fate.

Kalki uses this obsession to satirise the vanity and irresponsible autocracy of India's princely rulers — the Maharaja hunts recklessly, bans anyone else from hunting tigers in his kingdom, even risking a high British officer's displeasure and bribing him with diamond rings to avoid a hunt that might let the officer kill "his" tigers, showing how petty self-interest outweighs any real concern for his subjects or the state.

The irony sharpens when, after killing ninety-nine tigers, the Maharaja's hundredth hunt only wounds an old, weak tiger, which he claims is dead — but the tiger merely faints from shock and does not actually die from his shot, meaning the king unknowingly fails to complete his hundred. To keep up the appearance of having fulfilled his vow, the dead body of a tiger is quietly substituted. The prophecy is finally, ironically, fulfilled when the Maharaja gifts his son a cheap wooden toy tiger for his birthday; a splinter from its rough surface pierces his hand, the wound turns septic, and the great slayer of ninety-nine real tigers dies from an infection caused by a toy — the hundredth "tiger" getting him after all.`,
    keywords: [
      "prophecy of the hundredth tiger",
      "satire on autocracy and vanity",
      "hundredth tiger only fainted, not killed",
      "wooden toy tiger causes fatal infection",
      "mock-heroic, Kalki's ironic style",
    ],
    examinerTip:
      "'How is the title ironic?' is asked repeatedly — the answer's spine is that a wooden toy tiger kills the man who slaughtered ninety-nine real ones; frame this explicitly as satire of autocratic power and vanity, not just a plot summary.",
  },

  // ==========================================================================
  // Ch 16 — Journey to the end of the Earth
  // ==========================================================================
  {
    id: "q-c12-english-16-1",
    subjectId: "c12-english",
    chapterId: "c12-english-16",
    classLevel: 12,
    text: "What does Tishani Doshi's account of her voyage to Antarctica reveal about the continent's geological history and its relevance to climate change today?",
    marks: 5,
    type: "la",
    source: "important",
    answer: `Tishani Doshi travels to Antarctica aboard the Russian research vessel Akademik Shokalskiy as part of the "Students on Ice" programme, which takes high school students from around the world to Antarctica to educate them about the continent's fragile environment and the urgency of climate change, so that they can return home as ambassadors for the planet.

In Antarctica, she learns that 650 million years ago all the continents were part of one giant supercontinent called Gondwana, which included Antarctica, India, Australia, Africa and South America joined together; only 3.5 million years ago did Antarctica assume its current icy, isolated position. This deep geological history explains why Antarctica alone, among the continents, has never sustained a single human being, yet still shares a distant common origin with the warmer lands humans now inhabit.

Doshi presents Antarctica as a giant "heat sink" that reflects sunlight and helps keep the earth's temperature regulated, and as a crucial storehouse of scientific evidence for climate change — ice cores and geological layers preserve a record of the earth's past climate, while microscopic organisms called phytoplankton, at the base of the food chain, are shown to be extremely sensitive to rising carbon dioxide levels, making them an early-warning indicator of global warming's effects on ocean ecosystems.`,
    keywords: [
      "Gondwana supercontinent, 650 million years ago",
      "Students on Ice programme",
      "Antarctica as a heat sink",
      "ice cores and climate record",
      "phytoplankton and carbon dioxide",
    ],
    examinerTip:
      "This is the most fact-heavy chapter in Vistas — precise names and figures (Gondwana, 650 million years, phytoplankton, Students on Ice) are exactly what earns the marks, not general description of the scenery.",
  },

  // ==========================================================================
  // Ch 17 — The Enemy
  // ==========================================================================
  {
    id: "q-c12-english-17-1",
    subjectId: "c12-english",
    chapterId: "c12-english-17",
    classLevel: 12,
    text: "Describe Dr Sadao Hoki's moral conflict in 'The Enemy', and how Hana's role helps resolve it.",
    marks: 6,
    type: "la",
    source: "important",
    answer: `Dr Sadao Hoki, a Japanese surgeon trained in America, finds a badly wounded American soldier washed up on the private beach behind his house during the Second World War. As a doctor bound by his professional oath, Sadao feels compelled to save the wounded man's life, but as a loyal Japanese citizen in wartime, sheltering an enemy soldier is treasonous and could endanger his family and his own position, since Japanese servants leave the household in silent disapproval and a general is soon expected to send assassins.

This is the story's central moral conflict: duty to a professional, humane oath to heal versus the pressure of nationalism and wartime hatred that brands the American simply as "the enemy." Sadao operates on the soldier in his own home, using his surgical skill to remove a bullet and save his life, even while privately unsure whether he is doing right by his country.

Hana, his wife, plays a crucial role in resolving this conflict — though she is initially repulsed by touching the enemy soldier's wound and fears for her family's safety and reputation, she overcomes her own prejudice and revulsion to assist Sadao throughout the surgery and the soldier's recovery, showing that compassion can triumph over both fear and hatred.

In the end, Sadao helps the recovering soldier escape by boat to a nearby uninhabited island, giving him supplies and a lit lantern signal for a passing fishing boat, choosing humanity over reporting him despite the risk. The general who was to send assassins forgets amid his own preoccupations, and the assassins never come — the story closes on the idea that humanity and individual conscience can transcend nationalism and the hatred bred by war.`,
    keywords: [
      "duty of the doctor's oath versus patriotism",
      "Sadao shelters and operates on the American soldier",
      "Hana overcomes her own revulsion and prejudice",
      "helps the soldier escape by boat",
      "humanity transcends war and nationalism",
    ],
    examinerTip:
      "The guaranteed long answer is Sadao's conflict between patriotism and the doctor's oath — frame it as duty versus prejudice, credit Hana's part in overcoming her own revulsion, and conclude that humanity transcends war.",
  },

  // ==========================================================================
  // Ch 18 — On the Face of It
  // ==========================================================================
  {
    id: "q-c12-english-18-1",
    subjectId: "c12-english",
    chapterId: "c12-english-18",
    classLevel: 12,
    text: "What theme does Susan Hill develop through Derry and Mr Lamb's friendship in 'On the Face of It'?",
    marks: 4,
    type: "sa",
    source: "important",
    answer: `Derry, a teenage boy whose face has been badly disfigured and scarred by acid on one side, has withdrawn into himself, avoiding people because of the way they stare, mock or pity him — he hides in his mother's garden shed to escape being seen. There he meets Mr Lamb, an elderly man with an artificial leg who lives alone in a house with an orchard whose gate, unlike everyone else's, is always open to all — children, bees and strangers alike.

Mr Lamb, who is also treated as an outsider by the village because of his disability and his eccentric openness, refuses to let his own impairment define or limit him, and through easy, accepting conversation he gradually persuades Derry that it is not the burnt face itself that is the real problem, but the alienation and self-pity that Derry's own fear of others' reactions has caused him.

The story's theme, made explicit through Mr Lamb's words and example, is that the actual physical pain of a disability or disfigurement is far less than the sense of isolation and alienation it can cause if a person lets other people's reactions define their own sense of self — friendship and acceptance, as Mr Lamb offers Derry, can heal that alienation even though they cannot heal the physical scar itself.`,
    keywords: [
      "Derry's disfigured face and self-isolation",
      "Mr Lamb's open orchard gate",
      "alienation greater than physical pain",
      "acceptance versus prejudice",
      "perception versus reality",
    ],
    examinerTip:
      "State the theme examiners want: the actual pain of a physical impairment is far less than the sense of alienation it causes — the answer is about being an outsider and Mr Lamb's healing acceptance, not a description of the burnt face.",
  },

  // ==========================================================================
  // Ch 19 — Memories of Childhood
  // ==========================================================================
  {
    id: "q-c12-english-19-1",
    subjectId: "c12-english",
    chapterId: "c12-english-19",
    classLevel: 12,
    text: "Compare the experiences of racial discrimination and caste discrimination described by Zitkala-Sa and Bama in 'Memories of Childhood'.",
    marks: 6,
    type: "la",
    source: "important",
    answer: `"Memories of Childhood" brings together two separate autobiographical accounts of oppression suffered in childhood, one racial and one based on caste, and questions on this chapter expect both to be discussed together.

In "The Cutting of My Long Hair," Zitkala-Sa, a young Native American girl forced into an American boarding school, describes how the school authorities decide to cut her long hair without her consent — among her people, short, "shingled" hair was worn only by mourners and unshingled hair by the brave, so losing her hair by force feels like an assault on her identity and dignity. She resists, hiding under a bed, but is dragged out, tied to a chair, and her hair is shingled despite her protest, leaving her feeling like "one of many little animals driven by a herder," her individuality and culture forcibly erased by an institution meant to "civilise" her.

In "We Too Are Human Beings," Bama, a Dalit child in Tamil Nadu, recounts watching an elderly man from her community carry a packet of snacks by its string, without touching it directly, to his upper-caste landlord, and walking in a comic, servile manner to entertain the upper-caste onlookers on the way. When Bama's brother explains that this humiliation is because of the elder's "untouchable" caste, Bama is shocked and angered, and resolves that the only way out of this discrimination is through education, hard work and self-respect — earning power and status that caste alone denies her people.

Both accounts show a child's growing awareness of institutionalised prejudice — racial in Zitkala-Sa's case, caste-based in Bama's — and both end not in despair but in the seeds of resistance: Zitkala-Sa's account exposes the cruelty of forced assimilation, while Bama's ends with her personal resolve to fight caste oppression through education rather than accept it as fate.`,
    keywords: [
      "Zitkala-Sa — forced cutting of hair, racial assimilation",
      "Bama — the elder carrying the packet by its string",
      "caste-based untouchability",
      "resistance — Bama's resolve through education",
      "both halves of the chapter must be compared",
    ],
    examinerTip:
      "Two separate autobiographical accounts in one chapter — questions ask you to compare racial oppression (Zitkala-Sa) with caste oppression (Bama), so answering from only one half is the most common way marks are lost here.",
  },
];
