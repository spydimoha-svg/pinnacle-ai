// Class 10 Maths · Chapter 2 · Polynomials — the hand-authored concept graph.
//
// Ordered the way the rationalised NCERT chapter actually builds: what a
// polynomial is → what a zero is → what a zero LOOKS like on a graph → the
// relationship between the zeroes and the coefficients → building a polynomial
// backwards from its zeroes → the cubic case.
//
// Every check question here has a stored answer, so the tutor grades against
// the truth instead of against its own memory of the truth.
import type { ConceptMap } from "./types";

export const C10_MATHS_POLYNOMIALS_MAP: ConceptMap = {
  chapterId: "c10-maths-02",
  chapterTitle: "Polynomials",
  classLevel: 10,
  subject: "Mathematics",
  authored: true,
  bigIdea:
    "A polynomial's zeroes and its coefficients are two views of the same object: you can read the zeroes off the graph, and you can predict their sum and product from the coefficients without solving anything.",

  prereqs: [
    {
      id: "p-expr",
      from: "Class 9 · Polynomials",
      title: "What a polynomial is, and its degree",
      why: "Class 10 assumes you can already look at an expression and say 'that is a quadratic'. Everything in this chapter is sorted by degree.",
      probe: {
        q: "What is the degree of $3x^2 + 2x - 1$, and what type of polynomial is it?",
        answer: "Degree 2; it is a quadratic polynomial.",
      },
    },
    {
      id: "p-value",
      from: "Class 9 · Polynomials",
      title: "Finding the value p(a) by substitution",
      why: "A zero is defined by p(k) = 0, so if substituting is shaky, the whole definition of a zero stays fuzzy.",
      probe: {
        q: "If $p(x) = x^2 - 4$, what is $p(3)$?",
        answer: "$p(3) = 9 - 4 = 5$.",
      },
    },
    {
      id: "p-factor",
      from: "Class 9 · Factorisation",
      title: "Splitting the middle term",
      why: "It is the standard method for finding the zeroes of a quadratic in this chapter. Without it every zero has to be guessed.",
      probe: {
        q: "Factorise $x^2 + 5x + 6$.",
        answer: "$(x + 2)(x + 3)$.",
      },
    },
    {
      id: "p-coord",
      from: "Class 9 · Coordinate Geometry",
      title: "Plotting a point and reading the x-axis",
      why: "The geometric meaning of a zero is 'where the curve cuts the x-axis'. That sentence is meaningless without the axes.",
      probe: {
        q: "A point lies on the x-axis. What is its y-coordinate?",
        answer: "0.",
      },
    },
  ],

  concepts: [
    {
      id: "c-what",
      title: "What a polynomial is (and what it is not)",
      oneLine:
        "A polynomial in x is a sum of terms $a x^n$ where every power of x is a whole number.",
      brief:
        "A polynomial in one variable x has the form $a_n x^n + a_{n-1}x^{n-1} + \\dots + a_1 x + a_0$, with real coefficients and WHOLE NUMBER powers. The highest power is the degree. Degree 1 = linear ($ax + b$), degree 2 = quadratic ($ax^2 + bx + c$, $a \\neq 0$), degree 3 = cubic ($ax^3 + bx^2 + cx + d$). What disqualifies an expression: a negative power ($x^{-1}$), a fractional power ($\\sqrt{x} = x^{1/2}$), or a variable in a denominator.",
      example:
        "$5x^3 - 2x + 7$ is a cubic polynomial. $\\dfrac{1}{x} + 3$ is NOT a polynomial, because $\\dfrac{1}{x} = x^{-1}$ has a negative power.",
      check: {
        q: "Is $2x^2 + \\dfrac{3}{x}$ a polynomial? Say yes or no, and why.",
        answer:
          "No. $\\dfrac{3}{x} = 3x^{-1}$ has a negative power, and a polynomial only allows whole-number powers.",
        hint: "Rewrite $\\dfrac{3}{x}$ using a power of $x$, then look at that power.",
      },
      mistakes: [
        "Calling $\\sqrt{x}$ a polynomial term — the power is $\\tfrac12$, not a whole number.",
        "Reading the degree off the first term instead of the highest power.",
      ],
      needs: ["p-expr"],
      marks: "1 mark, usually as an MCQ",
    },
    {
      id: "c-zero",
      title: "What a zero of a polynomial means",
      oneLine: "$k$ is a zero of $p(x)$ when $p(k) = 0$.",
      brief:
        "A zero of $p(x)$ is any value $k$ that makes the polynomial equal zero: $p(k) = 0$. You check a candidate by substituting it. A linear polynomial has at most 1 zero, a quadratic at most 2, a cubic at most 3 — the degree caps the number of zeroes. 'Zero of a polynomial' and 'root of an equation' are the same number seen from two sides.",
      example:
        "For $p(x) = x^2 - 4$: $p(2) = 4 - 4 = 0$, so 2 is a zero. $p(-2) = 4 - 4 = 0$, so $-2$ is a zero too. A quadratic stops at two.",
      check: {
        q: "Is $x = 3$ a zero of $p(x) = x^2 - 5x + 6$? Show the substitution.",
        answer: "$p(3) = 9 - 15 + 6 = 0$, so yes, 3 is a zero.",
        hint: "Put 3 everywhere you see x, and see whether the total comes to 0.",
      },
      mistakes: [
        "Answering with the value of $p(k)$ instead of saying whether it is 0.",
        "Sign slips when substituting a negative value into $x^2$.",
      ],
      needs: ["p-value"],
      marks: "1–2 marks",
    },
    {
      id: "c-graph-linear",
      title: "A linear polynomial is a straight line",
      oneLine:
        "The graph of $y = ax + b$ is a straight line, and its single zero is where that line crosses the x-axis.",
      brief:
        "Plot $y = ax + b$ by taking two or three values of x, working out y for each, and joining the points. The line meets the x-axis exactly once, at $x = -b/a$ — which is precisely the zero you get by solving $ax + b = 0$. This is the first half of the chapter's big idea: a zero is a crossing point.",
      example:
        "$y = 2x - 4$: at $x = 0$, $y = -4$; at $x = 2$, $y = 0$; at $x = 3$, $y = 2$. The line cuts the x-axis at $x = 2$, and solving $2x - 4 = 0$ also gives $x = 2$.",
      figure:
        '```plot\n{"fn":["2x-4"],"domain":[-1,5],"title":"$y = 2x - 4$ cuts the x-axis at its zero","xLabel":"x","yLabel":"y"}\n```',
      check: {
        q: "Where does the graph of $y = 3x + 6$ cut the x-axis?",
        answer: "At $x = -2$, because $3x + 6 = 0$ gives $x = -2$. The point is $(-2, 0)$.",
        hint: "On the x-axis, y is 0. So set the whole expression equal to 0.",
      },
      mistakes: [
        "Giving the y-intercept instead of the x-intercept.",
        "Writing the answer as a number when the question asked for a point.",
      ],
      needs: ["p-coord"],
      marks: "1–2 marks",
    },
    {
      id: "c-graph-quadratic",
      title: "A quadratic is a parabola, and its zeroes are its x-intercepts",
      oneLine:
        "The graph of $y = ax^2 + bx + c$ is a parabola which can cut the x-axis twice, touch it once, or miss it entirely.",
      brief:
        "The graph of a quadratic is a parabola: it opens upwards when $a > 0$ and downwards when $a < 0$. The x-coordinates of the points where it meets the x-axis are exactly the zeroes. Three cases: it cuts the axis at two points (two distinct zeroes), it touches at one point (two equal zeroes), or it never meets the axis (no real zero). This is why the geometric picture and the algebra always agree.",
      example:
        "$y = x^2 - 2x - 8$ factorises as $(x - 4)(x + 2)$, so the zeroes are 4 and $-2$ — and the parabola crosses the x-axis at exactly $(4, 0)$ and $(-2, 0)$.",
      figure:
        '```plot\n{"fn":["x^2-2x-8"],"domain":[-4,6],"title":"$y = x^2 - 2x - 8$: zeroes at $x = -2$ and $x = 4$","xLabel":"x","yLabel":"y"}\n```',
      check: {
        q: "A parabola touches the x-axis at exactly one point. How many zeroes does the polynomial have, and what is special about them?",
        answer: "Two zeroes, but they are equal (coincident) — a repeated zero.",
        hint: "The degree still caps the count at two. Ask what happens when both zeroes land at the same place.",
      },
      mistakes: [
        "Saying a touching parabola has one zero — it has two equal ones.",
        "Reading zeroes off the y-axis instead of the x-axis.",
      ],
      needs: ["p-coord", "p-factor"],
      marks: "2–3 marks; the graph-reading version is a favourite",
    },
    {
      id: "c-sum-product",
      title: "Sum and product of the zeroes of a quadratic",
      oneLine:
        "For $ax^2 + bx + c$ with zeroes $\\alpha$ and $\\beta$: $\\alpha + \\beta = -\\dfrac{b}{a}$ and $\\alpha\\beta = \\dfrac{c}{a}$.",
      brief:
        "This is the heart of the chapter. You can state the sum and the product of the zeroes straight from the coefficients, without finding the zeroes at all. For $ax^2 + bx + c$: sum $= -b/a$, product $= c/a$. Note the minus sign on the sum — it is where most marks are lost. It also gives you a free check: find the zeroes by factorising, then verify that they add and multiply to the right values.",
      example:
        "$x^2 - 2x - 8$: here $a = 1$, $b = -2$, $c = -8$. Sum $= -(-2)/1 = 2$, product $= -8/1 = -8$. The zeroes are 4 and $-2$: $4 + (-2) = 2$ and $4 \\times (-2) = -8$. Both check out.",
      check: {
        q: "For $p(x) = x^2 - 7x + 10$, write down the sum and the product of the zeroes WITHOUT finding them.",
        answer: "Sum $= -(-7)/1 = 7$; product $= 10/1 = 10$.",
        hint: "Read off $a$, $b$ and $c$ first, then use $-b/a$ and $c/a$. Watch the sign on b.",
      },
      mistakes: [
        "Dropping the minus sign and answering $b/a$ for the sum — the single most common error in this chapter.",
        "Forgetting to divide by $a$ when $a \\neq 1$.",
      ],
      needs: ["p-expr"],
      marks: "2–3 marks, near-guaranteed in the board paper",
    },
    {
      id: "c-form",
      title: "Building a quadratic from its zeroes",
      oneLine:
        "Knowing the sum S and product P of the zeroes, the polynomial is $k(x^2 - Sx + P)$.",
      brief:
        "Run the relationship backwards. If the zeroes add to S and multiply to P, then $p(x) = k(x^2 - Sx + P)$ for any non-zero constant k, and k = 1 gives the simplest answer. The minus sign sits in front of S. If you are given the zeroes themselves rather than S and P, work them out first.",
      example:
        "Zeroes 3 and $-2$: $S = 1$, $P = -6$, so $p(x) = x^2 - x - 6$. Check by factorising: $(x - 3)(x + 2) = x^2 - x - 6$.",
      check: {
        q: "Find a quadratic polynomial whose zeroes are 5 and 2.",
        answer: "$S = 7$, $P = 10$, so $p(x) = x^2 - 7x + 10$.",
        hint: "Add the zeroes to get S, multiply them to get P, then slot into $x^2 - Sx + P$.",
      },
      mistakes: [
        "Writing $x^2 + Sx + P$ and losing the sign.",
        "Claiming it is the only answer — any non-zero multiple k works.",
      ],
      needs: ["p-factor"],
      marks: "2 marks",
    },
    {
      id: "c-cubic",
      title: "The cubic case",
      oneLine:
        "For $ax^3 + bx^2 + cx + d$ with zeroes $\\alpha, \\beta, \\gamma$: $\\alpha+\\beta+\\gamma = -\\dfrac{b}{a}$, $\\alpha\\beta+\\beta\\gamma+\\gamma\\alpha = \\dfrac{c}{a}$, $\\alpha\\beta\\gamma = -\\dfrac{d}{a}$.",
      brief:
        "The same pattern one degree up, and the signs alternate: $-b/a$, then $+c/a$, then $-d/a$. Three zeroes at most. The middle one is the sum of the products taken two at a time, which is the part students skip.",
      example:
        "$x^3 - 6x^2 + 11x - 6$ has zeroes 1, 2, 3. Sum $= 6 = -(-6)/1$. Pairwise sum $= 1(2) + 2(3) + 3(1) = 11 = 11/1$. Product $= 6 = -(-6)/1$. All three agree.",
      check: {
        q: "For $2x^3 - 5x^2 + 4x - 3$, what is the sum of the zeroes?",
        answer: "$-b/a = -(-5)/2 = \\dfrac{5}{2}$.",
        hint: "Same rule as the quadratic for the sum: $-b/a$. Here $a = 2$ and $b = -5$.",
      },
      mistakes: [
        "Using $-d/a$ for the sum instead of the product.",
        "Forgetting the middle relationship exists at all.",
      ],
      needs: ["c-sum-product"],
      marks: "3 marks",
    },
  ],

  leadsTo: [
    {
      title: "Quadratic Equations",
      where: "Class 10 · Chapter 4",
      why: "Finding a zero of $ax^2+bx+c$ and solving $ax^2+bx+c=0$ are the same act. The quadratic formula is the general version of what you do here by factorising.",
    },
    {
      title: "Pair of Linear Equations",
      where: "Class 10 · Chapter 3",
      why: "The same 'a solution is where the graph crosses' idea, one dimension up: two lines meeting instead of one line crossing an axis.",
    },
    {
      title: "Complex Numbers and Quadratic Equations",
      where: "Class 11",
      why: "The parabola that misses the x-axis has no REAL zero. Class 11 gives those missing zeroes a home.",
    },
    {
      title: "Application of Derivatives",
      where: "Class 12 / JEE",
      why: "Sketching any curve starts with finding where it meets the axes — exactly the skill this chapter builds.",
    },
  ],
};
