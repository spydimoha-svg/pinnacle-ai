// NCERT Class 9 Mathematics — Chapter 1: Number Systems (rationalised syllabus).
// Verbatim exercises. The rationalisation dropped the section "Representing
// Real Numbers on the Number Line" (successive magnification of a decimal
// like 3.765) entirely — do not teach it. The two exercises that followed it
// were renumbered down: what the original book called Exercise 1.5 (rationalising
// denominators) is now Exercise 1.4, and Exercise 1.6 (laws of exponents) is now
// Exercise 1.5. Answers are worked and stored here so the tutor's final results
// are guaranteed right.
import type { NcertChapter } from "./types";

export const C9_MATHS_NUMBER_SYSTEMS: NcertChapter = {
  id: "c9-maths-01",
  classLevel: 9,
  subjectId: "c9-maths",
  chapterNumber: 1,
  title: "Number Systems",
  book: "NCERT Class 9 Mathematics (rationalised)",
  concepts: [
    "A RATIONAL number is any number that can be written as p/q, where p and q are integers and q is not 0. Between any two rational numbers there are infinitely many other rational numbers.",
    "An IRRATIONAL number cannot be written in the form p/q. Every irrational number is a real number, but not every real number is irrational — rationals and irrationals together make up the real numbers. The square root of a positive integer is irrational unless that integer is a perfect square (root 4, root 9, root 16 are rational; root 2, root 3, root 5 are not).",
    "root 5 (and any root n) can be located exactly on the number line using Pythagoras: build a right triangle with legs whose squares add to n (for root 5, legs 2 and 1, since 2^2 + 1^2 = 5), giving a hypotenuse of length root n, then swing that length onto the number line with a compass.",
    "DECIMAL EXPANSIONS decide rational vs irrational: a number is rational exactly when its decimal expansion either terminates or is non-terminating but recurring (a block of digits repeats forever). A number is irrational exactly when its decimal expansion is non-terminating AND non-recurring.",
    "For p/q in lowest terms (no common factor between p and q other than 1), the decimal expansion TERMINATES if and only if q has no prime factors other than 2 and 5 (q = 2^m x 5^n). If q has any other prime factor, the expansion is non-terminating recurring.",
    "Converting a recurring decimal back to p/q: let x equal the decimal, multiply by a power of 10 that shifts the repeating block to align with itself, subtract to cancel the repeating part, then solve for x. This also shows 0.999... = 1 exactly, not merely 'close to' 1.",
    "OPERATIONS ON REAL NUMBERS: rational +/- irrational is always irrational. But irrational +/- irrational, or irrational x irrational, can land back on a rational number (e.g. (3 + root23) - root23 = 3, or root2 x root2 = 2) — each case has to be worked out, not assumed.",
    "RATIONALISING A DENOMINATOR that has a surd: multiply top and bottom by whatever turns the denominator into a difference of squares (its conjugate), so the surd cancels out of the denominator. E.g. multiplying 1/(root a - root b) by (root a + root b)/(root a + root b) gives a denominator of a - b.",
    "LAWS OF EXPONENTS extend to rational and real exponents, for a > 0: a^m . a^n = a^(m+n); (a^m)^n = a^(mn); a^m / a^n = a^(m-n); a^m . b^m = (ab)^m. A fractional exponent is a root: a^(1/n) is the nth root of a, and a^(p/q) = (a^p)^(1/q), the qth root of a^p.",
  ].join("\n"),
  keyFormulae: [
    "p/q (lowest terms) terminates iff q has no prime factors other than 2 and 5",
    "a^m . a^n = a^(m+n); (a^m)^n = a^(mn); a^m / a^n = a^(m-n); a^m . b^m = (ab)^m",
    "a^(1/n) = nth root of a (a > 0); a^(p/q) = (a^p)^(1/q)",
  ],
  topics: [
    "Rational numbers and finding rational numbers between two given numbers",
    "Irrational numbers and real numbers",
    "Representing root n on the number line using Pythagoras",
    "Decimal expansions: terminating vs non-terminating recurring vs non-recurring",
    "Converting a recurring decimal to p/q form",
    "Operations on rational and irrational numbers",
    "Rationalising the denominator",
    "Laws of exponents for real numbers",
  ],
  exercises: [
    {
      exercise: "1.1",
      problems: [
        {
          no: "1",
          statement:
            "Is zero a rational number? Can you write it in the form p/q, where p and q are integers and q ≠ 0?",
          answer:
            "Yes. Zero can be written as 0/1 (or 0/q for any nonzero integer q), which is exactly the p/q form of a rational number.",
        },
        {
          no: "2",
          statement: "Find six rational numbers between 3 and 4.",
          answer:
            "Write 3 = 21/7 and 4 = 28/7. Six rational numbers between them: 22/7, 23/7, 24/7, 25/7, 26/7, 27/7.",
        },
        {
          no: "3",
          statement: "Find five rational numbers between 3/5 and 4/5.",
          answer:
            "Write 3/5 = 18/30 and 4/5 = 24/30. Five rational numbers between them: 19/30, 20/30, 21/30, 22/30, 23/30.",
        },
        {
          no: "4",
          statement:
            "State whether the following statements are true or false. Give reasons for your answers. (i) Every natural number is a whole number. (ii) Every integer is a whole number. (iii) Every rational number is a whole number.",
          answer:
            "(i) True — whole numbers are 0, 1, 2, 3, ..., which include every natural number. (ii) False — negative integers such as -1 or -2 are not whole numbers. (iii) False — a rational number such as 1/2 is not a whole number.",
        },
      ],
    },
    {
      exercise: "1.2",
      problems: [
        {
          no: "1",
          statement:
            "State whether the following statements are true or false. Justify your answers. (i) Every irrational number is a real number. (ii) Every point on the number line is of the form root m, where m is a natural number. (iii) Every real number is an irrational number.",
          answer:
            "(i) True — the real numbers are exactly the rationals together with the irrationals, so every irrational number is real. (ii) False — a point such as -2 lies on the number line but is not root m for any natural number m, since root m is never negative. (iii) False — rational numbers like 1/2 or 3 are real but not irrational.",
        },
        {
          no: "2",
          statement:
            "Are the square roots of all positive integers irrational? If not, give an example of the square root of a number that is a rational number.",
          answer:
            "No. For example root 4 = 2 and root 9 = 3, both rational. Only the square root of an integer that is not a perfect square is irrational.",
        },
        {
          no: "3",
          statement: "Show how root 5 can be represented on the number line.",
          answer:
            "Draw a right triangle OAB with OA = 2 units along the number line and AB = 1 unit perpendicular to it at A; by Pythagoras OB = root(2^2 + 1^2) = root 5. With centre O and radius OB, draw an arc cutting the number line at C; then OC = root 5, so C represents root 5.",
        },
      ],
    },
    {
      exercise: "1.3",
      problems: [
        {
          no: "1",
          statement:
            "Write the following in decimal form and say what kind of decimal expansion each has: (i) 36/100 (ii) 1/11 (iii) 4 1/8 (iv) 3/13 (v) 2/11 (vi) 329/400",
          answer:
            "(i) 36/100 = 0.36, terminating. (ii) 1/11 = 0.overline(09), non-terminating recurring. (iii) 4 1/8 = 33/8 = 4.125, terminating. (iv) 3/13 = 0.overline(230769), non-terminating recurring. (v) 2/11 = 0.overline(18), non-terminating recurring. (vi) 329/400 = 0.8225, terminating.",
        },
        {
          no: "2",
          statement:
            "You know that 1/7 = 0.overline(142857). Can you predict what the decimal expansions of 2/7, 3/7, 4/7, 5/7, 6/7 are, without actually doing the long division? If so, how?",
          answer:
            "Yes. 2/7 = 0.overline(285714), 3/7 = 0.overline(428571), 4/7 = 0.overline(571428), 5/7 = 0.overline(714285), 6/7 = 0.overline(857142) — each is a cyclic shift of the repeating block 142857 of 1/7, because multiplying 1/7 by 2, 3, 4, 5 or 6 cyclically permutes that block.",
        },
        {
          no: "3",
          statement:
            "Express the following in the form p/q, where p and q are integers and q ≠ 0: (i) 0.overline(6) (ii) 0.4overline(7) (iii) 0.overline(001)",
          answer:
            "(i) 0.overline(6) = 6/9 = 2/3. (ii) 0.4overline(7) = 43/90 (let x = 0.4777...; 100x - 10x = 47.777... - 4.777... = 43, so 90x = 43). (iii) 0.overline(001) = 1/999.",
        },
        {
          no: "4",
          statement:
            "Express 0.99999.... in the form p/q. Are you surprised by your answer? With your teacher and classmates discuss why the answer makes sense.",
          answer:
            "Let x = 0.999...; 10x = 9.999...; 10x - x = 9, so 9x = 9 and x = 1. So 0.999... = 1 exactly — it makes sense because there is no real number strictly between 0.999... and 1, so they must be the same number.",
        },
        {
          no: "5",
          statement:
            "What can the maximum number of digits be in the repeating block of digits in the decimal expansion of 1/17? Perform the division to check your answer.",
          answer:
            "At most 16 digits (one less than the denominator 17). Long division gives 1/17 = 0.overline(0588235294117647), a repeating block of 16 digits.",
        },
        {
          no: "6",
          statement:
            "Look at several examples of rational numbers in the form p/q (q ≠ 0), where p and q are integers with no common factors other than 1 and having terminating decimal representations. Can you guess what property q must satisfy?",
          answer:
            "q must have no prime factors other than 2 and 5, i.e. q = 2^m x 5^n for non-negative integers m and n.",
        },
        {
          no: "7",
          statement: "Write three numbers whose decimal expansions are non-terminating non-recurring.",
          answer:
            "Any three such patterns work, e.g. 0.202002000200002..., 0.03003000300003..., 0.505500555055550... — none of these settle into a repeating block, so each is irrational.",
        },
        {
          no: "8",
          statement: "Find three different irrational numbers between the rational numbers 5/7 and 9/11.",
          answer:
            "5/7 = 0.overline(714285) and 9/11 = 0.overline(81). Three irrational numbers strictly between them: 0.72022002200022..., 0.75075007500075..., 0.79079907999...",
        },
        {
          no: "9",
          statement:
            "Classify the following numbers as rational or irrational: (i) root 23 (ii) root 225 (iii) 0.3796 (iv) 7.478478... (v) 1.101001000100001...",
          answer:
            "(i) root 23 — irrational (23 is not a perfect square). (ii) root 225 = 15 — rational. (iii) 0.3796 — rational (terminating). (iv) 7.478478... = 7.overline(478) — rational (non-terminating recurring). (v) 1.101001000100001... — irrational (non-terminating, non-recurring).",
        },
      ],
    },
    {
      exercise: "1.4",
      instruction:
        "Renumbered from the original Exercise 1.5 after the rationalisation removed the number-line-construction section that used to sit between this exercise and Exercise 1.3.",
      problems: [
        {
          no: "1",
          statement:
            "Classify the following numbers as rational or irrational: (i) 2 - root 5 (ii) (3 + root 23) - root 23 (iii) 2 root 7 / 7 root 7 (iv) 1/root 2 (v) 2 pi",
          answer:
            "(i) Irrational (rational minus irrational is irrational). (ii) = 3, rational. (iii) = 2/7, rational. (iv) Irrational. (v) Irrational.",
        },
        {
          no: "2",
          statement:
            "Simplify each of the following expressions: (i) (3 + root 3)(2 + root 2) (ii) (3 + root 3)(3 - root 3) (iii) (root 5 + root 2)^2 (iv) (root 5 - root 2)(root 5 + root 2)",
          answer:
            "(i) 6 + 3 root 2 + 2 root 3 + root 6. (ii) 9 - 3 = 6. (iii) 5 + 2 root 10 + 2 = 7 + 2 root 10. (iv) 5 - 2 = 3.",
        },
        {
          no: "3",
          statement:
            "Recall, pi is defined as the ratio of the circumference (say c) of a circle to its diameter (say d), that is pi = c/d. This seems to contradict the fact that pi is irrational. How will you resolve this contradiction?",
          answer:
            "There is no real contradiction: any physical measurement of c and d with an instrument only ever gives approximate, rational values. c/d computed from those measured values is only approximately pi; the true ratio of the exact circumference to the exact diameter is irrational.",
        },
        {
          no: "4",
          statement: "Represent root 9.3 on the number line.",
          answer:
            "Mark A at 9.3 units from O, then B at 1 more unit beyond A (OB = 10.3). Draw a semicircle on OB with centre at its midpoint. Erect a perpendicular to OB at A meeting the semicircle at D; then AD = root 9.3. With centre A and radius AD, draw an arc cutting the number line at E; E represents root 9.3.",
        },
        {
          no: "5",
          statement:
            "Rationalise the denominators of the following: (i) 1/root 7 (ii) 1/(root 7 - root 6) (iii) 1/(root 5 + root 2) (iv) 1/(root 7 - 2)",
          answer:
            "(i) root 7 / 7. (ii) root 7 + root 6 (multiply by root 7 + root 6, denominator becomes 7 - 6 = 1). (iii) (root 5 - root 2)/3. (iv) (root 7 + 2)/3.",
        },
      ],
    },
    {
      exercise: "1.5",
      instruction: "Renumbered from the original Exercise 1.6.",
      problems: [
        {
          no: "1",
          statement: "Find: (i) 64^(1/2) (ii) 32^(1/5) (iii) 125^(1/3)",
          answer: "(i) 64 = 2^6, so 64^(1/2) = 2^3 = 8. (ii) 32 = 2^5, so 32^(1/5) = 2. (iii) 125 = 5^3, so 125^(1/3) = 5.",
        },
        {
          no: "2",
          statement: "Find: (i) 9^(3/2) (ii) 32^(2/5) (iii) 16^(3/4) (iv) 125^(-1/3)",
          answer:
            "(i) 9^(3/2) = 3^3 = 27. (ii) 32^(2/5) = 2^2 = 4. (iii) 16^(3/4) = 2^3 = 8. (iv) 125^(-1/3) = 1/5.",
        },
        {
          no: "3",
          statement:
            "Simplify: (i) 2^(2/3) . 2^(1/5) (ii) (1/3^3)^7 (iii) 11^(1/2) / 11^(1/4) (iv) 7^(1/2) . 8^(1/2)",
          answer:
            "(i) 2^(2/3 + 1/5) = 2^(13/15). (ii) 3^(-21) = 1/3^21. (iii) 11^(1/2 - 1/4) = 11^(1/4). (iv) (7 x 8)^(1/2) = root 56 = 2 root 14.",
        },
      ],
    },
  ],
};
