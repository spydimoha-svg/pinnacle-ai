// Class 10 Maths · Chapter 4 · Quadratic Equations — the hand-authored concept graph.
//
// Ordered the way the rationalised NCERT chapter actually builds: what makes an
// equation quadratic → what a root is → solving by factorisation → the quadratic
// formula → the discriminant and the nature of the roots → running the
// discriminant backwards to pin down a missing coefficient → turning a worded
// situation into an equation and throwing away the root reality forbids.
//
// Completing the square was DELETED in the 2023 rationalisation, and it is not
// smuggled back in here. The formula is stated and used as a tool, which is
// exactly where the current book leaves it.
//
// Every check question has a stored answer that was worked out by hand, because
// the app marks the student against this text without asking a model. A stored
// answer carrying stray working — the 36 and the 24 on the way to a discriminant
// of 12 — makes the app demand those numbers too, and fails a student who was
// right. So the answers below hold the decisive value and nothing else.
import type { ConceptMap } from "./types";

export const C10_MATHS_QUADRATIC_EQUATIONS_MAP: ConceptMap = {
  chapterId: "c10-maths-04",
  chapterTitle: "Quadratic Equations",
  classLevel: 10,
  subject: "Mathematics",
  authored: true,
  bigIdea:
    "Force the equation to equal zero and everything follows: a product that equals zero hands you its roots one bracket at a time, and the single number $b^2 - 4ac$ tells you how many real roots exist before you have found any of them.",

  prereqs: [
    {
      id: "p-identity",
      from: "Class 9 · Polynomials",
      title: "Expanding brackets and products",
      why: "Board questions almost never hand you $ax^2 + bx + c = 0$. They hand you $x(2x+3) = x^2+1$ or $(x-2)(x+3) = 5$, and you cannot name a, b or c until you have expanded and collected. Step one of this chapter is Class 9 algebra.",
      probe: {
        q: "Expand $(x + 3)^2$ and write the result in the form $x^2 + bx + c$.",
        answer: "$x^2 + 6x + 9$.",
      },
    },
    {
      id: "p-factor",
      from: "Class 9 · Polynomials",
      title: "Factorising by splitting the middle term",
      why: "It is how the roots are found in most of this chapter. Without it, every root has to be guessed and the whole factorisation method collapses.",
      probe: {
        q: "Factorise $x^2 + 9x + 20$.",
        answer: "$(x + 4)(x + 5)$.",
      },
    },
    {
      id: "p-value",
      from: "Class 9 · Polynomials",
      title: "Finding the value of a polynomial by substitution",
      why: "A root is DEFINED by substitution — k is a root when the left side becomes 0 at $x = k$. If substituting is shaky, 'verify that 2 is a root' is an unanswerable question.",
      probe: {
        q: "If $p(x) = x^2 - 3x + 1$, what is $p(2)$?",
        answer: "$p(2) = -1$.",
      },
    },
    {
      id: "p-surd",
      from: "Class 9 · Number Systems",
      title: "Simplifying a square root",
      why: "The quadratic formula ends in $\\sqrt{b^2 - 4ac}$, and the final mark is for the simplified form. A root left as $\\sqrt{20}$ instead of $2\\sqrt{5}$ is an unfinished answer.",
      probe: {
        q: "Write $\\sqrt{20}$ in its simplest surd form.",
        answer: "$2\\sqrt{5}$.",
      },
    },
  ],

  concepts: [
    {
      id: "c-standard",
      title: "What makes an equation quadratic (standard form)",
      oneLine:
        "A quadratic equation is any equation that can be written as $ax^2 + bx + c = 0$ with $a \\neq 0$.",
      brief:
        "A quadratic equation in one variable x is any equation that can be REARRANGED into $ax^2 + bx + c = 0$, where a, b, c are real numbers and $a \\neq 0$. That condition on a is the whole definition: if $a = 0$ the $x^2$ term vanishes and what is left is linear. The form on the page is rarely the standard form, so the first move is always the same — expand every bracket, bring every term to the left of the equals sign, collect like terms, and only then read off a, b and c with their signs attached.",
      example:
        "$x(2x + 3) = x^2 + 1$ expands to $2x^2 + 3x = x^2 + 1$. Taking everything to the left: $x^2 + 3x - 1 = 0$. So $a = 1$, $b = 3$, $c = -1$, and it is a quadratic equation.",
      check: {
        q: "Write $3x^2 - 5 = 2x(x + 4)$ in standard form $ax^2 + bx + c = 0$, and state the value of $b$.",
        answer:
          "$b = -8$ — once the brackets are expanded and everything is collected on the left, the middle term is $-8x$.",
        hint: "Expand the right side first, then move every term to the left. The $x$ terms are the ones that combine.",
      },
      mistakes: [
        "Reading a, b, c off the equation BEFORE rearranging it — here that gives $b = 0$, which is wrong.",
        "Dropping the sign when carrying a term across the equals sign.",
        "Calling $0x^2 + 4x + 1 = 0$ quadratic. With $a = 0$ it is linear.",
      ],
      needs: ["p-identity"],
      marks: "1 mark on its own, and it is step one of every longer question",
    },
    {
      id: "c-root",
      title: "What a root of a quadratic equation is",
      oneLine:
        "$k$ is a root of $ax^2 + bx + c = 0$ when substituting $x = k$ makes the left side 0.",
      brief:
        "A root — also called a solution — is a number that satisfies the equation: put it in place of x and the left side comes to 0. It is the same object as a zero of the polynomial $ax^2 + bx + c$ from Chapter 2; 'zero of a polynomial' and 'root of an equation' are two names for one number. A quadratic has AT MOST two roots, never three. Verifying a root needs no solving at all: substitute, and see whether you land on 0.",
      example:
        "Is 3 a root of $x^2 - 5x + 6 = 0$? Substituting gives $9 - 15 + 6 = 0$, so yes. Is 1 a root? $1 - 5 + 6 = 2$, which is not 0, so no.",
      check: {
        q: "Is $x = -2$ a root of $x^2 + 3x + 2 = 0$? Say yes or no, and why.",
        answer: "Yes, it is a root: substituting $x = -2$ gives $0$.",
        hint: "Put $-2$ everywhere you see x. Remember $(-2)^2$ is positive.",
      },
      mistakes: [
        "Squaring a negative wrongly: $(-2)^2 = 4$, not $-4$. This one error flips the verdict.",
        "Substituting into part of the expression and forgetting the constant term.",
        "Reporting the value of the left side instead of saying whether it is 0.",
      ],
      needs: ["p-value"],
      marks: "1 mark, usually phrased as 'verify that … is a root'",
    },
    {
      id: "c-factorise",
      title: "Solving by factorisation and the zero product rule",
      oneLine:
        "Write the equation as (bracket)(bracket) $= 0$, then set each bracket to 0 separately.",
      brief:
        "Two steps, and the second is the real mathematics. FIRST, with the equation in standard form, factorise the left side by splitting the middle term: find two numbers whose product is $a \\times c$ and whose sum is b. SECOND, apply the zero product rule — if $A \\times B = 0$ then $A = 0$ or $B = 0$ — so each bracket is set equal to zero on its own, producing the two roots. The rule works ONLY against 0. From $(x-1)(x-2) = 6$ you may not write $x - 1 = 6$; you must expand, take the 6 across, and start again.",
      example:
        "$x^2 - 5x + 6 = 0$. Two numbers with product $+6$ and sum $-5$ are $-2$ and $-3$, so $x^2 - 2x - 3x + 6 = x(x-2) - 3(x-2) = (x-2)(x-3)$. Then $(x-2)(x-3) = 0$ gives $x = 2$ or $x = 3$.",
      figure:
        '```plot\n{"fn":["x^2-5x+6"],"domain":[-1,6],"title":"$y = x^2 - 5x + 6$ meets the x-axis at its two roots","xLabel":"x","yLabel":"y"}\n```',
      check: {
        q: "Solve $x^2 - 3x - 10 = 0$ by factorisation.",
        answer: "$x = 5$ or $x = -2$.",
        hint: "Find two numbers that multiply to $-10$ and add to $-3$, then set each bracket equal to zero.",
      },
      mistakes: [
        "Setting a bracket equal to the number on the right when the right side was not 0.",
        "Giving only one root and stopping.",
        "Sign flip at the last step: $(x - 5)(x + 2) = 0$ gives $x = 5$ and $x = -2$, not $x = -5$ and $x = 2$.",
      ],
      needs: ["p-factor"],
      marks: "2–3 marks; the most common way this chapter is examined",
    },
    {
      id: "c-formula",
      title: "The quadratic formula",
      oneLine:
        "For $ax^2 + bx + c = 0$: $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$, provided $b^2 - 4ac \\ge 0$.",
      brief:
        "When the middle term will not split into whole numbers, the formula solves any quadratic that has real roots. Write down a, b and c WITH their signs first, then substitute. The $\\pm$ is what produces two roots from one line of working, and the whole numerator sits over $2a$. If $b^2 - 4ac$ turns out negative you stop there — there is no real root to write. The rationalised NCERT no longer derives this by completing the square, so it is learnt and used as a stated tool.",
      example:
        "$2x^2 - 7x + 3 = 0$ has $a = 2$, $b = -7$, $c = 3$. Then $b^2 - 4ac = 49 - 24 = 25$ and $\\sqrt{25} = 5$, so $x = \\dfrac{7 \\pm 5}{4}$, giving $x = 3$ and $x = \\dfrac{1}{2}$.",
      check: {
        q: "Use the quadratic formula to solve $4x^2 + 4x - 3 = 0$.",
        answer: "$x = \\dfrac{1}{2}$ or $x = -\\dfrac{3}{2}$.",
        hint: "Take $a = 4$, $b = 4$, $c = -3$ and work out $b^2 - 4ac$ first — it comes out a perfect square, so the roots are fractions, not surds.",
      },
      mistakes: [
        "Dividing only the square root by $2a$ instead of the whole numerator.",
        "Writing $b^2$ as negative when b is negative — $(-7)^2 = 49$.",
        "Losing the $\\pm$ and reporting one root.",
      ],
      needs: ["p-surd"],
      marks: "3 marks",
    },
    {
      id: "c-discriminant",
      title: "The discriminant and the nature of the roots",
      oneLine:
        "$D = b^2 - 4ac$ decides the roots in advance: $D > 0$ two distinct, $D = 0$ two equal, $D < 0$ none real.",
      brief:
        "The expression under the square root in the formula is called the discriminant, $D = b^2 - 4ac$, and its SIGN alone settles what kind of roots the equation has. $D > 0$: two distinct real roots. $D = 0$: two equal real roots — the same number twice, not one root. $D < 0$: no real roots, because no real number squares to a negative. Geometrically it is the parabola cutting the x-axis at two points, touching it at one, or missing it entirely. You need only a, b and c; the equation never has to be solved.",
      example:
        "$2x^2 - 4x + 3 = 0$: $D = 16 - 24 = -8$, which is negative, so there are no real roots. $x^2 - 4x + 4 = 0$: $D = 16 - 16 = 0$, so it has two equal real roots, both $x = 2$.",
      figure:
        '```plot\n{"fn":["x^2-2x-3","x^2-2x+1","x^2-2x+3"],"domain":[-2,4],"title":"$D>0$ cuts the axis, $D=0$ touches it, $D<0$ misses it","xLabel":"x","yLabel":"y"}\n```',
      check: {
        q: "Find the discriminant of $2x^2 - 6x + 3 = 0$ and say what it tells you about the roots.",
        answer: "$D = 12$, which is positive, so the equation has two distinct real roots.",
        hint: "Use $D = b^2 - 4ac$ with $a = 2$, $b = -6$, $c = 3$. The SIGN of what you get answers the second half.",
      },
      mistakes: [
        "Reading $D = 0$ as 'one root'. The correct phrase is two equal real roots.",
        "Computing $b^2 + 4ac$ — the minus sign in the discriminant is not optional.",
        "Writing $(-6)^2 = -36$ and turning a positive discriminant negative.",
      ],
      marks: "1–2 marks, and it is near certain to appear",
    },
    {
      id: "c-equal-roots",
      title: "Working backwards from the nature of the roots",
      oneLine:
        "Given the KIND of roots, turn that description into a condition on D and solve it for the unknown coefficient.",
      brief:
        "The board's favourite use of the discriminant: you are told what the roots are like and asked for a missing letter in the equation. Translate the words into a statement about D, then solve that statement. 'Equal roots' becomes $D = 0$, an equation you can solve. 'Two distinct real roots' becomes $D > 0$ and 'no real roots' becomes $D < 0$ — inequalities, so the answer is a range, not a number. One trap: when the unknown sits in a, you must also insist $a \\neq 0$, or the equation stops being quadratic.",
      example:
        "For which k does $x^2 + kx + 16 = 0$ have equal roots? $D = k^2 - 64 = 0$, so $k^2 = 64$ and $k = \\pm 8$. Both work: $x^2 + 8x + 16 = (x+4)^2$ and $x^2 - 8x + 16 = (x-4)^2$.",
      check: {
        q: "Find the value of $k$ for which $kx^2 - 12x + 9 = 0$ has two equal roots.",
        answer: "$k = 4$, since equal roots need a discriminant of zero.",
        hint: "Set $b^2 - 4ac$ equal to zero, taking $a = k$, and solve the resulting equation for k.",
      },
      mistakes: [
        "Solving $k^2 = 64$ and reporting only the positive value.",
        "Allowing $k = 0$ when k is the coefficient of $x^2$ — that answer is not a quadratic equation.",
        "Using $D > 0$ or $D = b^2$ for equal roots instead of $D = 0$.",
      ],
      marks: "2–3 marks",
    },
    {
      id: "c-word",
      title: "Turning a situation into a quadratic, and rejecting the impossible root",
      oneLine:
        "Name the unknown, write everything else in terms of it, solve, then throw away the root the real situation forbids.",
      brief:
        "Situational problems are where this chapter earns its long question, and the routine never changes. Name the unknown with a letter and SAY what it stands for. Write every other quantity in terms of that letter. Turn the sentence containing 'is', 'total', 'product' or 'sum' into an equation. Push it into standard form and solve. Then do the step students skip: test both roots against reality. Ages, lengths, breadths, speeds, times and counts cannot be negative, and a number of people or articles cannot be a fraction. Reject the impossible root in writing, and answer the question that was actually asked, in words.",
      example:
        "The product of two consecutive positive integers is 306. Let them be x and $x+1$: $x(x+1) = 306$ gives $x^2 + x - 306 = 0$, which factorises as $(x + 18)(x - 17) = 0$, so $x = 17$ or $x = -18$. A positive integer cannot be $-18$, so the integers are 17 and 18.",
      check: {
        q: "The product of two consecutive positive integers is 156. Find the two integers.",
        answer: "The integers are 12 and 13.",
        hint: "Call the smaller integer x, so the next one is $x + 1$, and write down what their product equals.",
      },
      mistakes: [
        "Answering with x when the question asked for both numbers, or for the age NOW rather than the age then.",
        "Keeping a negative root as an answer for a length, an age or a number of items.",
        "Never stating what x represents, which loses a mark even when the arithmetic is perfect.",
      ],
      needs: ["p-factor"],
      marks: "3 marks, usually the longest question from this chapter",
    },
  ],

  leadsTo: [
    {
      title: "Arithmetic Progressions",
      where: "Class 10 · Chapter 5",
      why: "$S_n = \\dfrac{n}{2}[2a + (n-1)d]$ is a quadratic in n, so 'how many terms add up to 78?' is solved exactly as here — including rejecting the root that is negative or a fraction, because n counts terms.",
    },
    {
      title: "Complex Numbers and Quadratic Equations",
      where: "Class 11",
      why: "The case $D < 0$ that you are told to abandon here is where Class 11 begins. Those missing roots exist; they just are not real numbers.",
    },
    {
      title: "Motion in a Straight Line",
      where: "Class 11 Physics",
      why: "$s = ut + \\tfrac12 at^2$ is a quadratic in t, so 'when does the ball hit the ground?' is this chapter with a stopwatch — and the negative time is rejected for the same reason a negative length is.",
    },
    {
      title: "Application of Derivatives",
      where: "Class 12 / JEE",
      why: "Finding a maximum or minimum means solving $f'(x) = 0$, and for the cubics that appear there, that equation is a quadratic. The formula and the discriminant never leave.",
    },
  ],
};
