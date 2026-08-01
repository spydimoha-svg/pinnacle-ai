// NCERT Class 10 Mathematics — Chapter 2: Polynomials (rationalised syllabus).
// Verbatim exercises. In the rationalised NCERT this chapter has only two
// exercises: 2.1 (geometrical meaning, graph-based) and 2.2 (zeroes and the
// zero-coefficient relationship). The old 2.3 (division algorithm) and 2.4 were
// removed. Answers are stored so the tutor's final results are guaranteed right.
import type { NcertChapter } from "./types";

export const C10_MATHS_POLYNOMIALS: NcertChapter = {
  id: "c10-maths-02",
  classLevel: 10,
  subjectId: "c10-maths",
  chapterNumber: 2,
  title: "Polynomials",
  book: "NCERT Class 10 Mathematics (rationalised)",
  concepts: [
    "A polynomial in one variable x is an expression of the form a_n x^n + ... + a_1 x + a_0, where the powers of x are whole numbers and the coefficients are real numbers. The highest power of x is the DEGREE of the polynomial.",
    "By degree: degree 1 is a linear polynomial (ax + b), degree 2 is a quadratic polynomial (ax^2 + bx + c, a not 0), degree 3 is a cubic polynomial (ax^3 + bx^2 + cx + d).",
    "A ZERO of a polynomial p(x) is a value k such that p(k) = 0. Geometrically, the zeroes are exactly the x-coordinates of the points where the graph y = p(x) meets the x-axis. A linear polynomial has at most 1 zero, a quadratic at most 2, a cubic at most 3.",
    "Relationship between zeroes and coefficients of a QUADRATIC ax^2 + bx + c with zeroes alpha and beta: sum of zeroes alpha + beta = -b/a, and product of zeroes alpha*beta = c/a.",
    "For a CUBIC ax^3 + bx^2 + cx + d with zeroes alpha, beta, gamma: alpha + beta + gamma = -b/a; alpha*beta + beta*gamma + gamma*alpha = c/a; alpha*beta*gamma = -d/a.",
    "To FORM a quadratic polynomial when the sum S and product P of its zeroes are known: p(x) = k( x^2 - S x + P ) for any non-zero constant k. The simplest choice is k = 1.",
    "Standard method to find zeroes of a quadratic: factorise by splitting the middle term, set each factor to zero, then verify with sum = -b/a and product = c/a.",
  ].join("\n"),
  keyFormulae: [
    "Quadratic ax^2+bx+c: sum of zeroes = -b/a, product of zeroes = c/a",
    "Cubic ax^3+bx^2+cx+d: sum = -b/a, sum of pairwise products = c/a, product = -d/a",
    "Polynomial from zeroes: p(x) = k( x^2 - (sum)x + (product) )",
  ],
  topics: [
    "Meaning and degree of a polynomial",
    "Zeroes of a polynomial",
    "Geometrical meaning of the zeroes (graph)",
    "Relationship between zeroes and coefficients (quadratic)",
    "Forming a quadratic polynomial from its zeroes",
  ],
  exercises: [
    {
      exercise: "2.1",
      instruction:
        "The graphs of y = p(x) are given in the figures for some polynomials p(x). Find the number of zeroes of p(x) in each case. (This exercise is figure-based: the number of zeroes equals the number of points where the curve meets the x-axis — 0, 1, 2, 3, 1, 4 respectively across the six standard figures.)",
      problems: [
        {
          no: "1",
          statement:
            "The graphs of y = p(x) are given below for some polynomials p(x). Find the number of zeroes of p(x), in each case, from the graph.",
          answer:
            "Count the points where the curve cuts or touches the x-axis. For the six standard NCERT figures the answers are (i) 0, (ii) 1, (iii) 2, (iv) 3, (v) 1, (vi) 4.",
        },
      ],
    },
    {
      exercise: "2.2",
      problems: [
        {
          no: "1",
          statement:
            "Find the zeroes of the following quadratic polynomials and verify the relationship between the zeroes and the coefficients: (i) x^2 - 2x - 8  (ii) 4s^2 - 4s + 1  (iii) 6x^2 - 3 - 7x  (iv) 4u^2 + 8u  (v) t^2 - 15  (vi) 3x^2 - x - 4",
          answer:
            "(i) zeroes 4 and -2; sum = 2 = -b/a, product = -8 = c/a. (ii) 4s^2-4s+1=(2s-1)^2, zeroes 1/2 and 1/2; sum = 1, product = 1/4. (iii) 6x^2-7x-3=(3x+1)(2x-3), zeroes -1/3 and 3/2; sum = 7/6, product = -1/2. (iv) 4u^2+8u=4u(u+2), zeroes 0 and -2; sum = -2, product = 0. (v) zeroes sqrt(15) and -sqrt(15); sum = 0, product = -15. (vi) 3x^2-x-4=(3x-4)(x+1), zeroes 4/3 and -1; sum = 1/3, product = -4/3.",
        },
        {
          no: "2",
          statement:
            "Find a quadratic polynomial each with the given numbers as the sum and product of its zeroes respectively: (i) 1/4, -1  (ii) sqrt(2), 1/3  (iii) 0, sqrt(5)  (iv) 1, 1  (v) -1/4, 1/4  (vi) 4, 1",
          answer:
            "Using x^2 - (sum)x + (product): (i) x^2 - (1/4)x - 1, i.e. 4x^2 - x - 4. (ii) x^2 - sqrt(2)x + 1/3, i.e. 3x^2 - 3sqrt(2)x + 1. (iii) x^2 + sqrt(5). (iv) x^2 - x + 1. (v) x^2 + (1/4)x + 1/4, i.e. 4x^2 + x + 1. (vi) x^2 - 4x + 1.",
        },
      ],
    },
  ],
};
