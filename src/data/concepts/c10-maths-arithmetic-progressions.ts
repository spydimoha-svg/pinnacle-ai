// Class 10 Maths · Chapter 5 · Arithmetic Progressions — the hand-authored concept graph.
//
// Ordered the way the rationalised NCERT chapter actually builds: what makes a
// list an AP → writing one down from a and d → testing a list you are handed →
// the nth term → running the nth term backwards to find n → the sum of n terms →
// the short sum formula when the last term is known → pulling one term back out
// of S_n.
//
// Two rules were followed everywhere in this file, both of them about the app
// marking answers itself (src/lib/grade.ts) rather than asking a model:
//
//   1. The stored answer carries the FINAL value and nothing else. The grader
//      requires every number in `answer` that is not already in `q`, so an
//      answer that showed its working — "a_15 = 4 + 14 × 5 = 74" — would demand
//      the student also write 14 and 5. A student who writes "74" is right, and
//      the data has to agree with that.
//   2. Yes/no answers open with "No"/"Yes" and then give a short reason built
//      from the words a student would actually use ("differences", "equal"), so
//      the reason-matching step recognises a correct explanation.
import type { ConceptMap } from "./types";

export const C10_MATHS_ARITHMETIC_PROGRESSIONS_MAP: ConceptMap = {
  chapterId: "c10-maths-05",
  chapterTitle: "Arithmetic Progressions",
  classLevel: 10,
  subject: "Mathematics",
  authored: true,
  bigIdea:
    "An AP is a list that moves in equal steps, and that single step size is enough to jump straight to the 100th term without listing the 99 before it — and to add up the whole list in one line.",

  // Nothing exotic here: this chapter is arithmetic with negatives, substitution
  // into a formula, and solving one linear equation. When a student stalls in
  // Chapter 5 it is almost always one of these four, not the AP itself.
  prereqs: [
    {
      id: "p-neg",
      from: "Class 9 · Number Systems",
      title: "Adding and subtracting negative numbers",
      why: "An AP is allowed to run downwards, and then finding $d$, listing the terms and using $a + (n-1)d$ are all subtractions that cross zero.",
      probe: {
        q: "What is $-15 + 4$?",
        answer: "$-11$.",
      },
    },
    {
      id: "p-value",
      from: "Class 9 · Polynomials",
      title: "Finding the value of an expression by substituting a number",
      why: "Every term of an AP is $a + (n-1)d$ with a number put in for $n$. If substitution is shaky, every nth-term and sum question collapses at the first step.",
      probe: {
        q: "If $p(x) = 4x + 1$, what is $p(5)$?",
        answer: "$p(5) = 21$.",
      },
    },
    {
      id: "p-simplify",
      from: "Class 9 · Polynomials",
      title: "Expanding a bracket and collecting like terms",
      why: "$a + (n-1)d$ is only usable once you can open it up: $5 + (n-1)2$ has to become $2n + 3$ before you can see that the terms of an AP sit on a straight line.",
      probe: {
        q: "Expand and simplify $7 + (n-1)3$.",
        answer: "$3n + 4$.",
      },
    },
    {
      id: "p-solve",
      from: "Class 9 · Linear Equations in Two Variables",
      title: "Solving a linear equation for the unknown",
      why: "'Which term of this AP is 95?' is nothing more than the equation $a + (n-1)d = 95$ solved for $n$.",
      probe: {
        q: "Solve $3x + 5 = 41$.",
        answer: "$x = 12$.",
      },
    },
  ],

  concepts: [
    {
      id: "c-what",
      title: "What makes a list an AP",
      oneLine:
        "In an AP every term is the previous term plus the same fixed number $d$, called the common difference.",
      brief:
        "An arithmetic progression is a list $a_1, a_2, a_3, \\dots$ in which each term after the first is obtained by ADDING a fixed number to the one before it. That fixed number is the common difference $d$, and you find it by subtracting a term from the term that follows it: $d = a_2 - a_1 = a_3 - a_2$, and so on. $d$ may be positive (the list climbs), negative (it falls) or zero (every term identical). The first term is written $a$. This is not a made-up object: an auto fare that starts at ₹30 and adds ₹12 a kilometre, or a stack of logs with two fewer in each row going up, is an AP.",
      example:
        "3, 7, 11, 15, $\\dots$ is an AP because $7 - 3 = 4$, $11 - 7 = 4$ and $15 - 11 = 4$; here $a = 3$ and $d = 4$. So is 18, 14, 10, 6, with $a = 18$ and $d = -4$ — a negative $d$ only means the list runs downhill.",
      check: {
        q: "What is the common difference of the AP 8, 5, 2, $-1$, $\\dots$?",
        answer: "$d = -3$, found by subtracting a term from the one after it.",
        hint: "Subtract a term from the term that comes AFTER it, in that order, and keep whatever sign you get.",
      },
      mistakes: [
        "Computing $a_1 - a_2$ instead of $a_2 - a_1$, which flips the sign of $d$ and poisons every later step.",
        "Assuming a list must increase — a falling list is still an AP.",
        "Calling 2, 4, 8, 16 an AP: those terms are multiplied by 2, and the differences 2, 4, 8 are not equal.",
      ],
      needs: ["p-neg"],
      marks: "1 mark, usually the opening question on the chapter",
    },
    {
      id: "c-general",
      title: "Writing the AP down from $a$ and $d$",
      oneLine:
        "Given the first term $a$ and the common difference $d$, the AP is $a,\\ a+d,\\ a+2d,\\ a+3d,\\ \\dots$",
      brief:
        "Two numbers fix an entire AP: the first term $a$ and the common difference $d$. Written out in full it reads $a,\\ a+d,\\ a+2d,\\ a+3d,\\ \\dots$ — and notice that the multiplier of $d$ is always ONE LESS than the position of the term. The second term carries one $d$, the fourth carries three. That single observation is the whole reason the nth-term formula looks the way it does. An AP that stops has a last term and is called finite (2, 4, 6, $\\dots$, 100); one written with $\\dots$ and no end is infinite.",
      example:
        "$a = 5$, $d = 3$ gives 5, 8, 11, 14, $\\dots$ — and $a = -2$, $d = 4$ gives $-2$, 2, 6, 10, $\\dots$",
      check: {
        q: "Write the first four terms of the AP with first term $a = 7$ and common difference $d = -2$.",
        answer: "7, 5, 3, 1.",
        hint: "Begin at the first term and add $d$ each time — adding a negative number moves you down.",
      },
      mistakes: [
        "Starting the list at $a + d$ and quietly losing the first term.",
        "Adding 2 instead of $-2$ because the minus sign was dropped somewhere.",
        "Writing four terms AFTER the first — the first term is already term one.",
      ],
      needs: ["p-neg"],
      marks: "1 mark",
    },
    {
      id: "c-is-ap",
      title: "Testing whether a given list is an AP",
      oneLine:
        "A list is an AP only if EVERY pair of neighbours has the same difference — one bad gap rules it out.",
      brief:
        "Work out $a_2 - a_1$, then $a_3 - a_2$, then $a_4 - a_3$. If they are all the same number, the list is an AP and that number is $d$; if even one is different, it is not, and no amount of pattern-spotting rescues it. Two traps the board leans on: lists that pass the first test and fail later (2, 4, 6, 9), and lists whose terms are built by multiplying (2, 6, 18, 54), where the differences 4, 12, 36 grow.",
      example:
        "1, 4, 9, 16 has differences 3, 5, 7 — not equal, so it is NOT an AP. But $\\sqrt2, \\sqrt8, \\sqrt{18}, \\sqrt{32}$ IS one: simplified it reads $\\sqrt2, 2\\sqrt2, 3\\sqrt2, 4\\sqrt2$, so $d = \\sqrt2$. Simplify before you judge.",
      check: {
        q: "Is the list 2, 6, 10, 15 an AP? Say yes or no, and why.",
        answer: "No — the differences $4, 4, 5$ are not equal, so it is not an AP.",
        hint: "Work out all three gaps, not just the first one.",
      },
      mistakes: [
        "Checking only the first two terms and declaring the whole list an AP.",
        "Rejecting $\\sqrt2, \\sqrt8, \\sqrt{18}, \\sqrt{32}$ before simplifying the surds.",
        "Saying it is an AP because 'it has a pattern' — the pattern has to be adding the SAME number every time.",
      ],
      needs: ["p-neg"],
      marks: "1–2 marks",
    },
    {
      id: "c-nth",
      title: "The nth term",
      oneLine:
        "$a_n = a + (n-1)d$ — start at the first term and take $n-1$ steps of size $d$.",
      brief:
        "To reach the nth term you begin at $a$ and take $n - 1$ steps of size $d$, so $a_n = a + (n-1)d$. The $n-1$ is the entire point: reaching the 15th term takes 14 steps, not 15. This formula is what makes the chapter worth learning — the 100th term is one substitution away instead of ninety-nine additions. Opened up, $a_n = dn + (a - d)$, which is a linear expression in $n$; that is why the terms of an AP, plotted against their positions, lie on a straight line.",
      example:
        "For 4, 9, 14, $\\dots$: $a = 4$ and $d = 5$, so $a_{10} = 4 + 9 \\times 5 = 49$. Counting it out gives 4, 9, 14, 19, 24, 29, 34, 39, 44, 49 — the same 49, the slow way.",
      figure:
        '```plot\n{"fn":["5x-1"],"domain":[1,8],"title":"$a_n = 5n - 1$: the terms of the AP 4, 9, 14, ... lie on a straight line","xLabel":"n (term number)","yLabel":"$a_n$"}\n```',
      check: {
        q: "Find the 15th term of the AP 4, 9, 14, $\\dots$",
        answer: "$a_{15} = 74$.",
        hint: "Write down $a$ and $d$ first, then remember how many steps it takes to get from term one to term fifteen.",
      },
      mistakes: [
        "Using $a + nd$ and landing one term too far along.",
        "Taking $d$ as $a_1 - a_2$, so every term comes out with the wrong sign.",
        "Confusing $a_n$ with $S_n$ — this formula gives ONE term, not a running total.",
      ],
      needs: ["p-value", "p-simplify"],
      marks: "2 marks on its own, and the first step of most 3-mark questions",
    },
    {
      id: "c-which-term",
      title: "Running the nth-term formula backwards",
      oneLine:
        "Set $a + (n-1)d$ equal to the value you were given and solve for $n$.",
      brief:
        "The same formula answers the reverse question: 'which term is 95?', 'how many terms does this AP have?', 'is 150 a term of this AP?'. Put the known value in place of $a_n$ and solve the linear equation for $n$. Two things earn or lose the marks here. First, $n$ must come out a positive WHOLE number; a fraction or a negative means the value is simply not a term of that AP, and saying so is the answer. Second, for a finite AP, the $n$ you get from the LAST term is the number of terms in it.",
      example:
        "How many terms are there in 7, 13, 19, $\\dots$, 205? Here $a = 7$ and $d = 6$, so solve $7 + (n-1)6 = 205$: that gives $(n-1)6 = 198$, then $n - 1 = 33$, so $n = 34$. The AP has 34 terms.",
      check: {
        q: "Which term of the AP 5, 11, 17, 23, $\\dots$ is 95?",
        answer: "The 16th term.",
        hint: "Put the given value in place of $a_n$ and solve for $n$; a whole-number $n$ confirms it really is a term.",
      },
      mistakes: [
        "Answering with the value instead of the position — the question asks which term, so the answer is a term number.",
        "Accepting a fractional $n$ rather than concluding that the value is not a term at all.",
        "Forgetting that the number of terms in a finite AP comes from its last term.",
      ],
      needs: ["p-value", "p-solve"],
      marks: "2–3 marks",
    },
    {
      id: "c-sum",
      title: "Sum of the first $n$ terms",
      oneLine:
        "$S_n = \\dfrac{n}{2}\\left[\\,2a + (n-1)d\\,\\right]$",
      brief:
        "Adding terms one at a time is hopeless past a handful, so pair them: write the list forwards, write it again backwards underneath, and add the two rows. Every column comes to the same total, $2a + (n-1)d$, and there are $n$ columns — but each term has been counted twice, hence the $\\dfrac{n}{2}$ in front. Everything inside the bracket is known the moment you know $a$ and $d$. Keep $S_n$ and $a_n$ firmly apart: $a_n$ is one term, $S_n$ is the total of all the terms up to it.",
      example:
        "$1 + 2 + 3 + \\dots + 100$ is an AP with $a = 1$, $d = 1$, $n = 100$, so $S_{100} = \\dfrac{100}{2}\\left[2 + 99\\right] = 50 \\times 101 = 5050$.",
      figure:
        '```plot\n{"fn":["2.5x^2-0.5x"],"domain":[0,10],"title":"Running total of the AP 2, 7, 12, ... — sums curve upwards even though the terms rise evenly","xLabel":"n (number of terms added)","yLabel":"$S_n$"}\n```',
      check: {
        q: "Find the sum of the first 10 terms of the AP 2, 7, 12, $\\dots$",
        answer: "$S_{10} = 245$.",
        hint: "Write down $a$, $d$ and $n$, then work out the square bracket on its own before multiplying by $\\dfrac{n}{2}$.",
      },
      mistakes: [
        "Writing $a$ where the formula wants $2a$.",
        "Working out the tenth term and stopping — that is $a_{10}$, not the total.",
        "Computing $\\dfrac{n}{2} \\times 2a + (n-1)d$ and leaving the last piece outside the bracket.",
      ],
      needs: ["p-value", "p-simplify"],
      marks: "3 marks, and the 5-mark word problem is built on it",
    },
    {
      id: "c-sum-last",
      title: "The short sum formula, when the last term is known",
      oneLine:
        "If the last term is $l$, then $S_n = \\dfrac{n}{2}(a + l)$ — the average of the two ends, times how many terms there are.",
      brief:
        "When the AP is finite and its last term $l$ is in front of you, $d$ is not needed at all: $S_n = \\dfrac{n}{2}(a + l)$. It is the same formula as before — substitute $l = a + (n-1)d$ into $\\dfrac{n}{2}[2a + (n-1)d]$ and it collapses to this. Read it as 'the average of the first and last term, multiplied by the number of terms', which is why it is so fast. If $n$ is not given, find it from the last term first.",
      example:
        "$5 + 10 + 15 + \\dots + 50$ has $a = 5$, $l = 50$ and $n = 10$, so $S_{10} = \\dfrac{10}{2}(5 + 50) = 5 \\times 55 = 275$.",
      check: {
        q: "An AP has 20 terms. Its first term is 3 and its last term is 60. What is its sum?",
        answer: "$S = 630$.",
        hint: "You do not need $d$ for this one. Add the two end terms, halve the number of terms, and multiply.",
      },
      mistakes: [
        "Reaching for $2a + (n-1)d$ when the last term has already been handed to you.",
        "Using $\\dfrac{n}{2}(a + l)$ when the value given is some middle term rather than the LAST term.",
        "Halving the sum instead of halving $n$.",
      ],
      needs: ["p-value"],
      marks: "2–3 marks",
    },
    {
      id: "c-sn-to-an",
      title: "Getting a term back out of $S_n$",
      oneLine:
        "$a_n = S_n - S_{n-1}$: a term is exactly what the running total gains when that term joins it.",
      brief:
        "Some questions hand you a rule for the SUM, such as $S_n = n^2 + 3n$, and ask for a term. You do not need $a$ or $d$ to answer. $S_n$ already contains every term up to the nth, and $S_{n-1}$ contains every term up to the one before it, so the difference between them is precisely $a_n$. Two consequences worth memorising: $a_1 = S_1$, and once you have two consecutive terms you also have $d$.",
      example:
        "Take $S_n = n^2 + 3n$. Then $S_1 = 1 + 3 = 4$, so $a_1 = 4$. And $S_2 = 4 + 6 = 10$, so $a_2 = S_2 - S_1 = 10 - 4 = 6$. Two terms in, $d = 2$ as well, and the AP is 4, 6, 8, $\\dots$",
      check: {
        q: "For an AP, $S_n = 2n^2 + 3n$. Find its third term.",
        answer: "$a_3 = 13$.",
        hint: "Work out the total after three terms and the total after two terms; the third term is the gap between them.",
      },
      mistakes: [
        "Answering with $S_3$ instead of $S_3 - S_2$.",
        "Substituting $n = 3$ into the $S_n$ rule and calling the result the third term.",
        "Forgetting the free fact that $a_1 = S_1$.",
      ],
      needs: ["p-value", "p-simplify"],
      marks: "2–3 marks",
    },
  ],

  // Where the equal-steps idea is actually spent later. The Chapter 4 link is
  // the honest one to lead with: the 5-mark AP question in the board paper is
  // usually finished with a quadratic, not with AP work.
  leadsTo: [
    {
      title: "Quadratic Equations",
      where: "Class 10 · Chapter 4",
      why: "'How many terms of this AP add up to 636?' puts $n$ inside $\\dfrac{n}{2}[2a+(n-1)d]$ and hands you a quadratic in $n$. You solve it exactly as in Chapter 4 — and then reject the negative or fractional root, because a number of terms cannot be either.",
    },
    {
      title: "Coordinate Geometry",
      where: "Class 10 · Chapter 7",
      why: "Because $a_n$ is linear in $n$, the points $(1, a_1), (2, a_2), (3, a_3), \\dots$ are collinear — and proving points collinear is exactly what Chapter 7 asks of you.",
    },
    {
      title: "Statistics",
      where: "Class 10 · Chapter 13",
      why: "The step-deviation method works only because the class marks of a grouped table form an AP with common difference $h$. Dividing by $h$ is the AP structure being used, not a trick.",
    },
    {
      title: "Sequences and Series",
      where: "Class 11",
      why: "The AP is the first sequence you meet. Class 11 keeps the machinery — nth term, sum of $n$ terms — and changes the step from adding $d$ to multiplying by $r$, giving the GP.",
    },
  ],
};
