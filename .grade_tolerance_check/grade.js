"use strict";
// Marking a check answer without asking the model.
//
// The lesson engine needs one bit back from every check: did they get it, yes
// or no. Asking the model to report that on a control line works on a 70B and
// fails flatly on a local 3B, which simply does not emit the line — and an
// engine that cannot read a verdict can never mark anything mastered, so the
// student is stuck on step one forever.
//
// The fix is to stop asking. The correct answer is already sitting in the
// concept graph, so the app can mark the answer itself, instantly, for free,
// identically on every model. The model's verdict is now only consulted when
// the text genuinely cannot be judged mechanically.
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeAnswer = gradeAnswer;
exports.buildMarkPrompt = buildMarkPrompt;
exports.readMark = readMark;
exports.stripScaffolding = stripScaffolding;
/** Strip LaTeX and formatting down to comparable plain text. */
function plain(s) {
    return s
        .replace(/\$+/g, " ")
        .replace(/\\d?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "$1/$2")
        .replace(/\\sqrt\s*\{([^{}]*)\}/g, "√$1")
        .replace(/\\(?:times|cdot)/g, "*")
        .replace(/\\(?:neq|ne)/g, "!=")
        .replace(/\\[a-zA-Z]+/g, " ")
        .replace(/[{}]/g, " ")
        .replace(/\s+/g, " ")
        .toLowerCase()
        .trim();
}
/**
 * Every number in a string, as comparable values.
 *
 * "9 - 15 + 6 = 0" yields 9, -15, 6, 0. Signs are attached because a sign slip
 * is the single most common wrong answer in this syllabus, and "-2" must not
 * be accepted as "2".
 */
function numbers(s) {
    const out = [];
    // A surd's coefficient and radicand are one value, not two interchangeable
    // ones: "5√2" and "2√5" both contain the digits 5 and 2, but only one of
    // them equals 5*sqrt(2). Fold each match to that single number before the
    // plain digit scan below, so it can't be split apart and reordered.
    const withoutSurds = s.replace(/(-?\d+(?:\.\d+)?)?\s*√\s*\(?(-?\d+(?:\.\d+)?)\)?/g, (_m, coeff, rad) => {
        out.push(Number(((coeff ? parseFloat(coeff) : 1) * Math.sqrt(parseFloat(rad))).toFixed(4)));
        return " ";
    });
    const re = /(-?\d+(?:\.\d+)?)(?:\s*\/\s*(-?\d+(?:\.\d+)?))?/g;
    let m;
    while ((m = re.exec(withoutSurds)) !== null) {
        const a = parseFloat(m[1]);
        if (m[2]) {
            const b = parseFloat(m[2]);
            if (b !== 0)
                out.push(Number((a / b).toFixed(4)));
        }
        else {
            out.push(a);
        }
    }
    return out;
}
const YES = /\b(?:yes|yeah|yep|correct|true|it is|sahi)\b/i;
const NO = /\b(?:no|nope|not|isn'?t|is not|cannot|can'?t|false|nahi)\b/i;
/** Which way does this answer point: affirmative, negative, or neither? */
function polarity(s) {
    const head = s.trim().slice(0, 60);
    // The FIRST word carries the verdict in a yes/no answer; later "not"s are
    // usually part of the reason ("No, because a polynomial cannot have…").
    if (/^\W*(?:yes|yeah|yep)\b/i.test(head))
        return "yes";
    if (/^\W*(?:no|nope)\b/i.test(head))
        return "no";
    if (YES.test(head) && !NO.test(head))
        return "yes";
    if (NO.test(head) && !YES.test(head))
        return "no";
    return null;
}
/** Words that carry meaning, for the "did they say the right thing" check. */
function keyWords(s) {
    const stop = new Set([
        "the", "and", "for", "with", "that", "this", "have", "has", "are", "is",
        "it", "its", "a", "an", "of", "to", "in", "on", "so", "because", "since",
        "we", "you", "your", "not", "no", "yes", "be", "as", "at", "by", "or",
        "then", "than", "when", "which", "what", "why", "how", "here", "there",
    ]);
    return new Set(plain(s)
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length > 2 && !stop.has(w)));
}
/**
 * Mark a student's answer against the stored correct one.
 *
 * Deliberately strict about being sure: it returns "unsure" rather than guess,
 * because marking a right answer wrong is the fastest way to lose a student's
 * trust, and marking a wrong one right teaches them the error.
 */
function gradeAnswer(question, correct, student) {
    const s = plain(student);
    const c = plain(correct);
    if (!s || s.length < 2)
        return { mark: "unsure", why: "empty answer" };
    // A request for a hint is not an attempt at the question — grading it wrong
    // would spend a retry on the app's own "Give me a hint" chip.
    if (/\bhint\b/i.test(student)) {
        return { mark: "unsure", why: "the student asked for a hint" };
    }
    // "I don't know" is an answer, and an honest one.
    if (/\b(?:i don'?t know|no idea|not sure|dunno|idk|skip)\b/i.test(student)) {
        return { mark: "wrong", why: "the student said they do not know" };
    }
    // 1. Yes/no questions are decided by polarity first — a student who says
    //    "yes" to a "no" answer is wrong however good their reason sounds.
    const cp = polarity(correct);
    const sp = polarity(student);
    const asksYesNo = /\b(?:is|are|does|do|can|will)\b.*\?|\byes or no\b/i.test(question);
    if (cp && (asksYesNo || sp)) {
        if (sp && sp !== cp)
            return { mark: "wrong", why: `answered "${sp}" where the answer is "${cp}"` };
        if (sp === cp) {
            // Right polarity: check the reason too, when the answer gives one.
            const cw = keyWords(correct);
            const sw = keyWords(student);
            let hit = 0;
            for (const w of cw)
                if (sw.has(w))
                    hit++;
            const ratio = cw.size ? hit / cw.size : 0;
            return ratio >= 0.22
                ? { mark: "correct", why: "right answer with a matching reason" }
                : { mark: "unsure", why: "right yes/no, but the reason does not obviously match" };
        }
    }
    // 2. Numeric questions: the values that matter are the ones in the answer
    //    that are NOT already in the question. Everything else was just copied.
    //    Exponents (the "2" in "x^2") are stripped first: they are not values a
    //    student could copy as a coefficient, so they must not shadow a genuine
    //    answer value that happens to share the same digit (e.g. a root of 2).
    const stripExponents = (s) => s.replace(/\^\s*-?\d+(?:\.\d+)?/g, " ");
    const qNums = new Set(numbers(stripExponents(plain(question))));
    const cNums = numbers(stripExponents(c));
    const essential = cNums.filter((n) => !qNums.has(n));
    if (essential.length) {
        const sNums = numbers(stripExponents(s));
        // A student may write a fraction's decimal ("0.33" for "1/3"), so numbers
        // are compared within a small tolerance rather than as exact floats.
        const near = (n) => sNums.some((x) => Math.abs(x - n) < 0.01);
        const found = essential.filter(near);
        if (found.length === essential.length) {
            return { mark: "correct", why: `all key values present (${essential.join(", ")})` };
        }
        // A wrong sign is a specific, nameable error rather than a blank miss.
        const flipped = essential.filter((n) => !near(n) && near(-n));
        if (flipped.length) {
            return { mark: "wrong", why: `sign error: expected ${flipped.join(", ")}, got the negative of it` };
        }
        if (found.length === 0) {
            return { mark: "wrong", why: `none of the key values (${essential.join(", ")}) appear` };
        }
        return { mark: "wrong", why: `only ${found.length} of ${essential.length} key values are right` };
    }
    // 3. Wholly verbal answers: fall back to how much of the answer's substance
    //    the student reproduced. A low score here is not proof of error, so it
    //    reports "unsure" and lets the model's own judgement decide.
    const cw = keyWords(correct);
    const sw = keyWords(student);
    if (!cw.size)
        return { mark: "unsure", why: "no stored answer to mark against" };
    let hit = 0;
    for (const w of cw)
        if (sw.has(w))
            hit++;
    const ratio = hit / cw.size;
    if (ratio >= 0.5)
        return { mark: "correct", why: `matched ${Math.round(ratio * 100)}% of the answer's key terms` };
    if (ratio <= 0.15)
        return { mark: "wrong", why: "the answer shares almost nothing with the correct one" };
    return { mark: "unsure", why: `partial match (${Math.round(ratio * 100)}%)` };
}
/**
 * The last resort: ask the model one closed question.
 *
 * Used only when the answer genuinely cannot be marked mechanically. A small
 * model is unreliable at emitting a formatted control line at the end of a long
 * teaching reply, but it is perfectly reliable at answering "RIGHT or WRONG"
 * when that is the only thing it has been asked to do. Costs one very short
 * call, and it is the difference between a stuck lesson and a moving one.
 *
 * `isBrief` is set for chapters with no authored answer key (every chapter that
 * is not hand-seeded): there is no stored correct answer to quote, only the
 * concept's brief describing what the answer must show.
 */
function buildMarkPrompt(question, correct, student, opts = {}) {
    const label = opts.isBrief ? "What a correct answer must show" : "Correct answer";
    return {
        system: opts.isBrief
            ? "You mark one school answer. There is no fixed wording for a correct answer here, only what the idea requires. Reply with exactly one word: RIGHT or WRONG. No punctuation, no explanation, no other words. Judge only whether the student's answer demonstrates that understanding; wording, spelling and working do not matter."
            : "You mark one school answer. Reply with exactly one word: RIGHT or WRONG. No punctuation, no explanation, no other words. Judge only whether the student reached the same result as the correct answer; wording, spelling and working do not matter.",
        user: `Question: ${question}\n${label}: ${correct}\nStudent's answer: ${student}\n\nOne word, RIGHT or WRONG:`,
    };
}
/** Read the one-word reply. Anything ambiguous counts as not yet learnt. */
function readMark(reply) {
    const t = reply.trim().toLowerCase();
    if (/^\W*right\b/.test(t))
        return true;
    if (/^\W*wrong\b/.test(t))
        return false;
    // Some models answer "correct"/"incorrect" however firmly you ask.
    if (/\bincorrect\b|\bwrong\b/.test(t))
        return false;
    return /\bcorrect\b|\bright\b/.test(t);
}
/* ------------------------------------------------------------------ *
 * Cleaning up after a small model
 * ------------------------------------------------------------------ */
/**
 * Headings and scaffolding a weak model copies straight out of the prompt.
 *
 * A local 3B treats a structured instruction as a form to fill in: told "the
 * one idea: X" and "re-ask a smaller version", it prints "### The one idea:"
 * and "#### Re-ask exactly what they got wrong here:" as literal headings — and
 * worse, prints the stored **Answer:** line, handing the student the answer to
 * the question it is in the middle of asking them.
 *
 * The prompts are written to discourage this. This strips whatever gets through
 * anyway, because no student should ever see the machinery.
 */
const LEAKED_HEADINGS = /^\s{0,3}(?:#{1,6}|\*{1,3})\s*(?:the one idea|worked example|re-?ask[^\n]*|what has to land|the idea|check question|hard rules?|shape of this reply|use this worked example|draw this figure|your reply|instructions?)\s*:?\s*\*{0,3}\s*:?\s*$/gim;
/** A stored answer key, printed under the question it belongs to. */
const LEAKED_ANSWER = /^\s{0,4}[-*]?\s*\*{0,2}(?:answer|correct answer|solution|hint)\*{0,2}\s*:\s*.*$/gim;
const LEAKED_TAGS = /^\s*@@[A-Z]+\s*:.*$/gim;
/**
 * Remove the scaffolding, keeping the teaching.
 *
 * `keepHint` is true in phases where a hint is a legitimate part of the reply
 * (a check turn is supposed to hint), and false while teaching, where a printed
 * "Answer:" line is always the model leaking its key.
 */
function stripScaffolding(text, opts = {}) {
    let out = text.replace(LEAKED_TAGS, "").replace(LEAKED_HEADINGS, "");
    out = out.replace(LEAKED_ANSWER, (line) => opts.keepHint && /^\s{0,4}[-*]?\s*\*{0,2}hint/i.test(line) ? line : "");
    return out.replace(/\n{3,}/g, "\n\n").trim();
}
