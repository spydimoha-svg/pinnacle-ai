// NCERT Class 10 Mathematics — Chapter 4: Quadratic Equations (rationalised syllabus).
// Verbatim exercises. In the rationalised NCERT this chapter keeps three
// exercises: 4.1 (standard form, checking a quadratic, framing one from a
// situation), 4.2 (roots by factorisation), and 4.3, which is the OLD 4.4
// renumbered (nature of roots via the discriminant, plus feasibility word
// problems). The old 4.3 (completing the square) was deleted wholesale and
// must not be taught. Answers are worked and stored here so the tutor's final
// results are guaranteed right.
import type { NcertChapter } from "./types";

export const C10_MATHS_QUADRATIC_EQUATIONS: NcertChapter = {
  id: "c10-maths-04",
  classLevel: 10,
  subjectId: "c10-maths",
  chapterNumber: 4,
  title: "Quadratic Equations",
  book: "NCERT Class 10 Mathematics (rationalised)",
  concepts: [
    "A quadratic equation in one variable x is any equation that can be rearranged into the STANDARD FORM ax^2 + bx + c = 0, where a, b, c are real numbers and a not 0. If a = 0 the x^2 term vanishes and the equation is linear, not quadratic. The given form is rarely the standard form: expand every bracket, bring every term to the left, collect like terms, then read off a, b, c with their signs.",
    "A ROOT (or solution) of ax^2 + bx + c = 0 is a number k such that substituting x = k makes the left side equal 0. This is the same idea as a zero of the polynomial ax^2 + bx + c from Chapter 2. A quadratic equation has at most two roots. Verifying a root needs only substitution, not solving.",
    "SOLVING BY FACTORISATION: with the equation in standard form, split the middle term (find two numbers whose product is a*c and whose sum is b) to write the left side as (bracket)(bracket) = 0. Then apply the zero product rule: if A*B = 0 then A = 0 or B = 0, giving the two roots. This rule only works against 0 on the right — from (x-1)(x-2) = 6 you cannot set a bracket equal to 6; expand, move the 6 across, and factorise the new equation instead.",
    "THE QUADRATIC FORMULA solves any quadratic that has real roots: x = (-b +/- sqrt(b^2 - 4ac)) / 2a. Write a, b, c with their signs first, then substitute; the +/- produces both roots from one line. The rationalised NCERT no longer derives this by completing the square — it is stated and used directly as a tool.",
    "The DISCRIMINANT is D = b^2 - 4ac, the expression under the square root in the formula. Its sign alone decides the nature of the roots, without solving the equation: D > 0 gives two distinct real roots, D = 0 gives two equal real roots (the same number twice), and D < 0 gives no real roots, because no real number squares to a negative.",
    "Working backwards: when a question describes the KIND of roots and asks for a missing coefficient, translate the description into a condition on D and solve it. 'Equal roots' becomes D = 0. 'Two distinct real roots' becomes D > 0 and 'no real roots' becomes D < 0 (these give a range, not a single value). If the unknown is the coefficient of x^2, also require it to be non-zero, or the equation stops being quadratic.",
    "WORD PROBLEMS: name the unknown, write every other quantity in terms of it, turn the situation into an equation, put it in standard form, and solve (usually by factorisation, sometimes by testing the discriminant first when the question asks 'is it possible'). Then reject any root the real situation forbids — a negative age, length, speed or count, or a fractional number of people or articles — and answer in words.",
  ].join("\n"),
  keyFormulae: [
    "Standard form: ax^2 + bx + c = 0, a not 0",
    "Quadratic formula: x = (-b +/- sqrt(b^2 - 4ac)) / 2a",
    "Discriminant D = b^2 - 4ac: D > 0 two distinct real roots, D = 0 two equal real roots, D < 0 no real roots",
  ],
  topics: [
    "Standard form of a quadratic equation",
    "Checking whether an equation is quadratic after rearranging",
    "Roots and verifying a root by substitution",
    "Solving by factorisation (splitting the middle term) and the zero product rule",
    "The quadratic formula",
    "Discriminant and nature of roots",
    "Finding an unknown coefficient from the nature of the roots",
    "Word problems leading to a quadratic equation, including feasibility ('is it possible') problems",
    "Rejecting a root the real situation forbids",
  ],
  exercises: [
    {
      exercise: "4.1",
      problems: [
        {
          no: "1",
          statement:
            "Check whether the following are quadratic equations: (i) (x + 1)^2 = 2(x - 3)  (ii) x^2 - 2x = (-2)(3 - x)  (iii) (x - 2)(x + 1) = (x - 1)(x + 3)  (iv) (x - 3)(2x + 1) = x(x + 5)  (v) (2x - 1)(x - 3) = (x + 5)(x - 1)  (vi) x^2 + 3x + 1 = (x - 2)^2  (vii) (x + 2)^3 = 2x(x^2 - 1)  (viii) x^3 - 4x^2 - x + 1 = (x - 2)^3",
          answer:
            "(i) Yes; simplifies to x^2 + 7 = 0. (ii) Yes; simplifies to x^2 - 4x + 6 = 0. (iii) No; simplifies to 3x - 1 = 0, linear (a = 0). (iv) Yes; simplifies to x^2 - 10x - 3 = 0. (v) Yes; simplifies to x^2 - 11x + 8 = 0. (vi) No; simplifies to 7x - 3 = 0, linear (a = 0). (vii) No; simplifies to x^3 - 6x^2 - 14x - 8 = 0, degree 3. (viii) Yes; simplifies to 2x^2 - 13x + 9 = 0.",
        },
        {
          no: "2",
          statement:
            "Represent the following situations in the form of quadratic equations: (i) The area of a rectangular plot is 528 m^2. The length of the plot (in metres) is one more than twice its breadth. We need to find the length and breadth of the plot. (ii) The product of two consecutive positive integers is 306. We need to find the integers. (iii) Rohan's mother is 26 years older than him. The product of their ages (in years) 3 years from now will be 360. We would like to find Rohan's present age. (iv) A train travels a distance of 480 km at a uniform speed. If the speed had been 8 km/h less, then it would have taken 3 hours more to cover the same distance. We need to find the speed of the train.",
          answer:
            "(i) With breadth b: 2b^2 + b - 528 = 0. (ii) With smaller integer x: x^2 + x - 306 = 0. (iii) With Rohan's present age x: x^2 + 32x - 273 = 0. (iv) With speed x km/h: x^2 - 8x - 1280 = 0.",
        },
      ],
    },
    {
      exercise: "4.2",
      problems: [
        {
          no: "1",
          statement:
            "Find the roots of the following quadratic equations by factorisation: (i) x^2 - 3x - 10 = 0  (ii) 2x^2 + x - 6 = 0  (iii) sqrt(2)x^2 + 7x + 5sqrt(2) = 0  (iv) 2x^2 - x + 1/8 = 0  (v) 100x^2 - 20x + 1 = 0",
          answer:
            "(i) x = 5 or x = -2. (ii) x = -2 or x = 3/2. (iii) x = -5/sqrt(2) or x = -sqrt(2). (iv) x = 1/4 (equal roots). (v) x = 1/10 (equal roots).",
        },
        {
          no: "2",
          statement:
            "Solve the problems given in Example 1: (i) John and Jivanti together have 45 marbles. Both of them lost 5 marbles each, and the product of the number of marbles they now have is 124. We would like to find out how many marbles they had to start with. (ii) A cottage industry produces a certain number of toys in a day. The cost of production of each toy (in rupees) was found to be 55 minus the number of toys produced in a day. On a particular day, the total cost of production was Rs 750. We would like to find out the number of toys produced on that day.",
          answer:
            "(i) With John's marbles x: (x - 5)(40 - x) = 124 gives x^2 - 45x + 324 = 0, so x = 9 or x = 36 — John and Jivanti had 9 and 36 marbles (in either order). (ii) With toys produced x: x(55 - x) = 750 gives x^2 - 55x + 750 = 0, so x = 25 or x = 30; both are valid, so 25 or 30 toys were produced that day.",
        },
        {
          no: "3",
          statement: "Find two numbers whose sum is 27 and product is 182.",
          answer: "13 and 14.",
        },
        {
          no: "4",
          statement: "Find two consecutive positive integers, sum of whose squares is 365.",
          answer: "13 and 14.",
        },
        {
          no: "5",
          statement:
            "The altitude of a right triangle is 7 cm less than its base. If the hypotenuse is 13 cm, find the other two sides.",
          answer: "Base = 12 cm, altitude = 5 cm.",
        },
        {
          no: "6",
          statement:
            "A cottage industry produces a certain number of pottery articles in a day. It was observed on a particular day that the cost of production of each article (in rupees) was 3 more than twice the number of articles produced on that day. If the total cost of production on that day was Rs 90, find the number of articles produced and the cost of each article.",
          answer: "6 articles were produced, at a cost of Rs 15 each.",
        },
      ],
    },
    {
      exercise: "4.3",
      instruction:
        "Renumbered from the pre-rationalisation Exercise 4.4 (nature of roots); the completing-the-square exercise that used to sit at 4.3 was deleted.",
      problems: [
        {
          no: "1",
          statement:
            "Find the nature of the roots of the following quadratic equations. If the real roots exist, find them: (i) 2x^2 - 3x + 5 = 0  (ii) 3x^2 - 4sqrt(3)x + 4 = 0  (iii) 2x^2 - 6x + 3 = 0",
          answer:
            "(i) D = -31 < 0, no real roots. (ii) D = 0, two equal real roots x = 2sqrt(3)/3 (both roots). (iii) D = 12 > 0, two distinct real roots x = (3 + sqrt(3))/2 and x = (3 - sqrt(3))/2.",
        },
        {
          no: "2",
          statement:
            "Find the values of k for each of the following quadratic equations, so that they have two equal roots: (i) 2x^2 + kx + 3 = 0  (ii) kx(x - 2) + 6 = 0",
          answer:
            "(i) k = 2sqrt(6) or k = -2sqrt(6). (ii) k = 6 (k = 0 is rejected, since it would make the equation not quadratic).",
        },
        {
          no: "3",
          statement:
            "Is it possible to design a rectangular mango grove whose length is twice its breadth, and the area is 800 m^2? If so, find its length and breadth.",
          answer: "Yes; breadth = 20 m, length = 40 m.",
        },
        {
          no: "4",
          statement:
            "Is the following situation possible? If so, determine their present ages. The sum of the ages of two friends is 20 years. Four years ago, the product of their ages (in years) was 48.",
          answer:
            "No; the equation x^2 - 20x + 112 = 0 has discriminant D = -48 < 0, so no real ages satisfy the situation.",
        },
        {
          no: "5",
          statement:
            "Is it possible to design a rectangular park of perimeter 80 m and area 400 m^2? If so, find its length and breadth.",
          answer: "Yes; length = breadth = 20 m (a square).",
        },
      ],
    },
  ],
};
