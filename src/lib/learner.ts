// How THIS child understands.
//
// Two students can be in the same class, on the same chapter, on the same day
// and need completely different lessons: one wants the rule stated cleanly, one
// needs it in cricket, one needs every step written out with numbers under ten.
// A tutor that teaches both of them the same way is not teaching, it is
// broadcasting.
//
// The profile is built from what the student actually says and does — it is
// never guessed from their marks — and it is persisted, so the tutor still
// knows them next week.

export type Modality = "analogy" | "steps" | "visual" | "story" | "formal" | "practice";

export interface LearnerProfile {
  /**
   * Pitch level for the NEXT explanation.
   * 1 = normal for the class, 2 = simpler words, 3 = smallest possible steps.
   * Rises when the student says they are lost, falls slowly when they succeed.
   */
  level: 1 | 2 | 3;
  /** Teaching moves that have demonstrably landed for this student. */
  worksWith: Modality[];
  /** Moves that have visibly failed. */
  avoids: Modality[];
  /** Things they like — the raw material for analogies they will actually get. */
  interests: string[];
  /** Their own recurring errors, in their own terms. */
  habits: string[];
  /** How they like to be spoken to. */
  language: "English" | "Hinglish" | "Hindi";
  /** Total re-explanations ever needed. High = pitch lower by default. */
  reteaches: number;
  /** Concepts they got first time. */
  firstTimeWins: number;
  updatedAt: number;
}

export function freshProfile(): LearnerProfile {
  return {
    level: 1,
    worksWith: [],
    avoids: [],
    interests: [],
    habits: [],
    language: "English",
    reteaches: 0,
    firstTimeWins: 0,
    updatedAt: Date.now(),
  };
}

/**
 * Things a school student is likely to actually care about, each with the words
 * that give it away. Matching on a fixed list (rather than asking a model to
 * "extract interests") keeps this cheap, instant and impossible to hallucinate.
 */
const INTERESTS: Record<string, RegExp> = {
  cricket: /\bcricket|\bipl\b|batsman|bowler|virat|dhoni|sachin|wicket|over rate/i,
  football: /\bfootball|soccer|messi|ronaldo|fifa|penalty kick/i,
  gaming: /\bgam(?:e|ing|es)\b|bgmi|pubg|free fire|minecraft|valorant|xbox|playstation/i,
  music: /\bmusic|song|guitar|piano|rap\b|singer|spotify/i,
  cooking: /\bcook|recipe|baking|kitchen|biryani|chai\b/i,
  movies: /\bmovie|film|cinema|netflix|marvel|bollywood/i,
  anime: /\banime|manga|naruto|one piece|dragon ball|pokemon/i,
  cars: /\bcar\b|bike\b|motorcycle|f1\b|formula one|engine/i,
  phones: /\bphone|instagram|youtube|reels|whatsapp|snapchat/i,
  animals: /\bdog|cat\b|animal|pet\b|bird/i,
  space: /\bspace|planet|rocket|astronaut|nasa|galaxy|star\b/i,
  money: /\bmoney|shopping|rupees|price|discount|business/i,
  chess: /\bchess|checkmate|pawn\b/i,
  dance: /\bdance|dancing|choreo/i,
};

const LIKES = /\b(?:i (?:like|love|play|watch|follow|enjoy)|my favourite|my favorite|i'?m into|obsessed with|fan of)\b/i;

const LOST = /\b(?:i (?:don'?t|do not) (?:get|understand)|didn'?t understand|not clear|confus(?:ed|ing)|no idea|makes no sense|lost\b|samajh nahi|nahi samjha|too hard|too tough)\b/i;
const TOO_FAST = /\b(?:too fast|slow down|slower|smaller steps|step by step|one at a time|break it down|bit by bit)\b/i;
const SIMPLER = /\b(?:simpl(?:er|y)|easier|easy words|like i'?m \d+|explain like|in simple|basic words|plain english|dumb it down)\b/i;
const GOT_IT = /\b(?:got it|understood|makes sense|i see|clear now|samajh (?:gaya|gayi)|okay got|yes i (?:get|understand))\b/i;

// Every verb carries \w*, because a student writes "I keep forgetting", not
// "I forget". An exact-word pattern quietly learns nothing from the sentence a
// student is most likely to actually type.
const MISS = String.raw`(?:forget\w*|forgot|miss\w*|los\w*|skip\w*|drop\w*)`;
const HABIT_PATTERNS: [RegExp, string][] = [
  [new RegExp(String.raw`\bunits?\b.*${MISS}|${MISS}.*\bunits?\b`, "i"), "forgets to write units"],
  [/\bsigns?\b.*\b(?:mistak\w*|wrong|error|slip\w*|confus\w*)|(?:minus|negative)\b.*\b(?:mistak\w*|confus\w*|wrong)/i, "makes sign errors"],
  [/\bformula(?:s|e)?\b.*\b(?:forget\w*|forgot|mix\w*|confus\w*|remember\w*)/i, "mixes up formulae"],
  [/\bcalculation|arithmetic|silly mistake|careless/i, "loses marks to careless calculation"],
  [new RegExp(String.raw`\bsteps?\b.*${MISS}`, "i"), "skips steps in the working"],
  [/\btime\b.*\b(?:run out|short|slow)|\bslow\b.*\bexam/i, "runs short of time in exams"],
  [new RegExp(String.raw`\bdiagrams?\b.*(?:${MISS}|\bbad\b|can'?t)`, "i"), "forgets the diagram"],
];

const HINGLISH = /\b(?:kya|hai|nahi|samajh|acha|thik|bhai|yaar|matlab|kaise|chalo|bilkul)\b/i;

/**
 * Read one student message and update what we know about them.
 *
 * Pure and cheap: no model call, so it runs on every single message without
 * costing a token or a millisecond the student would notice.
 */
export function observeStudent(
  profile: LearnerProfile,
  text: string
): { profile: LearnerProfile; lost: boolean; wantsSlower: boolean; gotIt: boolean } {
  const p: LearnerProfile = {
    ...profile,
    worksWith: [...profile.worksWith],
    avoids: [...profile.avoids],
    interests: [...profile.interests],
    habits: [...profile.habits],
  };

  // Interests: only when they say they LIKE it, or the whole message is about
  // it. "Explain projectiles using cricket" counts; "a cricket ball of mass
  // 200g" inside a physics question does not.
  for (const [name, re] of Object.entries(INTERESTS)) {
    if (!re.test(text)) continue;
    const explicit = LIKES.test(text) || /\b(?:using|with|in terms of|like)\b/i.test(text);
    if (explicit && !p.interests.includes(name)) p.interests.push(name);
  }
  p.interests = p.interests.slice(-5);

  for (const [re, habit] of HABIT_PATTERNS) {
    if (re.test(text) && !p.habits.includes(habit)) p.habits.push(habit);
  }
  p.habits = p.habits.slice(-5);

  if (HINGLISH.test(text)) p.language = "Hinglish";

  const lost = LOST.test(text);
  const wantsSlower = TOO_FAST.test(text) || SIMPLER.test(text);
  const gotIt = GOT_IT.test(text);

  if (lost || wantsSlower) {
    p.level = Math.min(3, p.level + 1) as 1 | 2 | 3;
    p.reteaches += 1;
    if (wantsSlower && !p.worksWith.includes("steps")) p.worksWith.push("steps");
    if (p.interests.length && !p.worksWith.includes("analogy")) p.worksWith.push("analogy");
    // Whatever we just did clearly did not work at this level.
    if (p.level >= 3 && !p.avoids.includes("formal")) p.avoids.push("formal");
  } else if (gotIt) {
    p.firstTimeWins += 1;
    // Ease back up only after two clean wins, so one lucky guess does not undo
    // a level the student genuinely needed.
    if (p.firstTimeWins % 2 === 0) p.level = Math.max(1, p.level - 1) as 1 | 2 | 3;
  }

  p.updatedAt = Date.now();
  return { profile: p, lost, wantsSlower, gotIt };
}

/** Record that a particular teaching move worked (or did not). */
export function recordMove(
  profile: LearnerProfile,
  modality: Modality,
  worked: boolean
): LearnerProfile {
  const worksWith = profile.worksWith.filter((m) => m !== modality);
  const avoids = profile.avoids.filter((m) => m !== modality);
  if (worked) worksWith.push(modality);
  else avoids.push(modality);
  return {
    ...profile,
    worksWith: worksWith.slice(-4),
    avoids: avoids.slice(-3),
    updatedAt: Date.now(),
  };
}

const LEVEL_STYLE: Record<1 | 2 | 3, string> = {
  1: "Normal level for their class. Proper terms, used precisely, with the meaning given once.",
  2: "Simpler. Short sentences. Everyday words. Every technical term gets a plain-English gloss the moment it appears, and every claim gets a concrete number behind it.",
  3: "The smallest steps you can make. One short sentence per line. Numbers small enough to do in your head. No technical word survives without an immediate plain replacement. Assume nothing.",
};

/**
 * The profile as a prompt block.
 *
 * This is the sentence that makes the tutor teach a person rather than a topic,
 * so it is written as an instruction, not as a data dump.
 */
export function describeLearner(profile: LearnerProfile): string {
  const lines: string[] = ["## How THIS student understands (obey this over your own habits)"];
  lines.push(`- Pitch: ${LEVEL_STYLE[profile.level]}`);
  if (profile.interests.length) {
    lines.push(
      `- They like: ${profile.interests.join(", ")}. When an analogy would help, build it out of one of these — a comparison to something they already love does the work of three paragraphs. Do not force one where it does not fit.`
    );
  }
  if (profile.worksWith.length) {
    lines.push(`- What has actually worked for them: ${profile.worksWith.join(", ")}. Lead with it.`);
  }
  if (profile.avoids.length) {
    lines.push(`- What has NOT worked for them: ${profile.avoids.join(", ")}. Do not open with it again.`);
  }
  if (profile.habits.length) {
    lines.push(
      `- Their recurring mistakes: ${profile.habits.join("; ")}. Watch for these specifically in their answers and pre-empt them while teaching.`
    );
  }
  if (profile.language === "Hinglish") {
    lines.push("- They write in Hinglish, so a natural word of Hindi here and there is welcome. Keep every technical term in English.");
  }
  if (profile.reteaches >= 3) {
    lines.push(
      `- They have needed ${profile.reteaches} re-explanations so far. Start lower than feels necessary; being too simple costs nothing, being too fast costs the whole lesson.`
    );
  }
  return lines.join("\n");
}

/**
 * The long words in a reply, worst first.
 *
 * Fed back to the model as an explicit do-not-use list when a student says they
 * are lost. Words that ARE the topic (the ones the student themselves used, or
 * that name the chapter) are kept out of the list: telling a tutor not to say
 * "polynomial" while teaching polynomials makes the next answer worse, not
 * simpler.
 */
export function hardWordsIn(text: string, keep: string[] = [], max = 8): string[] {
  const protectedWords = new Set(keep.flatMap((k) => k.toLowerCase().split(/\W+/)));
  const prose = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\$[^$]*\$/g, " ")
    .toLowerCase();
  const counts = new Map<string, number>();
  for (const w of prose.split(/[^a-z]+/)) {
    if (w.length < 7 || protectedWords.has(w)) continue;
    // 3+ syllables is the usual readability threshold for a "hard" word.
    const groups = w.replace(/(?:es|ed|e)$/, "").match(/[aeiouy]+/g);
    if (!groups || groups.length < 3) continue;
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .slice(0, max)
    .map(([w]) => w);
}

/** A one-line human summary for the UI. */
export function profileSummary(profile: LearnerProfile): string {
  const bits: string[] = [];
  bits.push(profile.level === 1 ? "normal pace" : profile.level === 2 ? "simpler words" : "smallest steps");
  if (profile.interests.length) bits.push(`likes ${profile.interests.slice(0, 2).join(" & ")}`);
  if (profile.habits.length) bits.push(profile.habits[0]);
  return bits.join(" · ");
}
