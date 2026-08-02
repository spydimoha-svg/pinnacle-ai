// NCERT Class 10 Mathematics — Chapter 3: Pair of Linear Equations in Two
// Variables (rationalised syllabus). Verbatim exercises. In the rationalised
// NCERT this chapter keeps three exercises: 3.1 (forming equations and the
// graphical method, including the a1/a2, b1/b2, c1/c2 consistency test), 3.2
// (substitution method) and 3.3 (elimination method). The pre-rationalisation
// Exercise 3.4 (cross-multiplication method) and Exercise 3.5 (equations
// reducible to a pair of linear equations, e.g. 1/x + 1/y forms) were deleted
// wholesale and must not be taught. Answers are worked and stored here so the
// tutor's final results are guaranteed right.
import type { NcertChapter } from "./types";

export const C10_MATHS_PAIR_OF_LINEAR_EQUATIONS: NcertChapter = {
  id: "c10-maths-03",
  classLevel: 10,
  subjectId: "c10-maths",
  chapterNumber: 3,
  title: "Pair of Linear Equations in Two Variables",
  book: "NCERT Class 10 Mathematics (rationalised)",
  concepts: [
    "A LINEAR EQUATION IN TWO VARIABLES has the general form ax + by + c = 0, where a, b, c are real numbers and a, b are not both zero. A PAIR of such equations, a1x + b1y + c1 = 0 and a2x + b2y + c2 = 0, can be solved graphically or algebraically.",
    "GRAPHICAL METHOD: each linear equation is a straight line. Plot each line from two solutions and read off where they meet. Three cases arise: (i) the lines INTERSECT at a single point — the pair has a UNIQUE solution and is CONSISTENT; (ii) the lines are PARALLEL — the pair has NO solution and is INCONSISTENT; (iii) the lines are COINCIDENT (the same line drawn twice) — the pair has INFINITELY MANY solutions and is DEPENDENT (which is always consistent).",
    "THE RATIO TEST decides which of the three cases holds without drawing anything, by comparing a1/a2, b1/b2 and c1/c2: if a1/a2 is not equal to b1/b2, the lines intersect (unique solution, consistent). If a1/a2 = b1/b2 is not equal to c1/c2, the lines are parallel (no solution, inconsistent). If a1/a2 = b1/b2 = c1/c2, the lines are coincident (infinitely many solutions, dependent and consistent).",
    "SUBSTITUTION METHOD: from one equation, write one variable in terms of the other (say y in terms of x). Substitute this expression into the OTHER equation, which then becomes an equation in one variable only — solve it, then substitute back to get the second variable. If this step produces a statement with no variable that is TRUE (like 18 = 18), the pair has infinitely many solutions. If it produces a statement that is FALSE (like -4 = 0), the pair is inconsistent and has no solution.",
    "ELIMINATION METHOD: multiply one or both equations by suitable non-zero constants so that the coefficients of one variable (x or y) become numerically equal in both equations, then add or subtract the equations to eliminate that variable, leaving one equation in the other variable. Solve it, then substitute back into either original equation for the first variable. As with substitution, a true statement with no variable left over means infinitely many solutions, and a false one means no solution (inconsistent).",
    "WORD PROBLEMS: name the two unknowns, translate each sentence of the problem into one linear equation (do this for both sentences independently — do not solve while framing), then solve the pair by substitution or elimination. Framing both equations correctly earns marks on its own, independent of whether the arithmetic that follows is right. A common setup is a two-digit number with tens digit x and units digit y, written as 10x + y; the number with digits reversed is 10y + x.",
  ].join("\n"),
  keyFormulae: [
    "General form: ax + by + c = 0, a and b not both zero",
    "a1/a2 not equal to b1/b2: unique solution (intersecting lines, consistent)",
    "a1/a2 = b1/b2 not equal to c1/c2: no solution (parallel lines, inconsistent)",
    "a1/a2 = b1/b2 = c1/c2: infinitely many solutions (coincident lines, dependent and consistent)",
    "Two-digit number with tens digit x, units digit y: 10x + y; reversed: 10y + x",
  ],
  topics: [
    "Forming a pair of linear equations from a word problem",
    "Graphical method: plotting lines and reading the solution",
    "Consistent, inconsistent and dependent pairs of equations",
    "The a1/a2, b1/b2, c1/c2 ratio test for intersecting, parallel or coincident lines",
    "Solving a pair of linear equations by substitution",
    "Solving a pair of linear equations by elimination",
    "Recognising infinitely many solutions or no solution during substitution/elimination",
    "Word problems: ages, fractions, digits of a two-digit number, cost/rate problems, fixed-plus-variable charges",
  ],
  exercises: [
    {
      exercise: "3.1",
      problems: [
        {
          no: "1",
          statement:
            "Form the pair of linear equations in the following problems, and find their solutions graphically: (i) 10 students of Class X took part in a Mathematics quiz. If the number of girls is 4 more than the number of boys, find the number of boys and girls who took part in the quiz. (ii) 5 pencils and 7 pens together cost Rs 50, whereas 7 pencils and 5 pens together cost Rs 46. Find the cost of one pencil and that of one pen.",
          answer:
            "(i) With boys x and girls y: x + y = 10, y = x + 4, giving x = 3, y = 7 — 3 boys and 7 girls. (ii) With pencil cost x and pen cost y: 5x + 7y = 50, 7x + 5y = 46, giving x = 3, y = 5 — pencil Rs 3, pen Rs 5.",
        },
        {
          no: "2",
          statement:
            "On comparing the ratios a1/a2, b1/b2 and c1/c2, find out whether the lines representing the following pairs of linear equations intersect at a point, are parallel or coincident: (i) 5x - 4y + 8 = 0 and 7x + 6y - 9 = 0  (ii) 9x + 3y + 12 = 0 and 18x + 6y + 24 = 0  (iii) 6x - 3y + 10 = 0 and 2x - y + 9 = 0",
          answer:
            "(i) a1/a2 = 5/7, b1/b2 = -2/3 — not equal, so intersecting lines (unique solution). (ii) a1/a2 = b1/b2 = c1/c2 = 1/2 — coincident lines (infinitely many solutions). (iii) a1/a2 = b1/b2 = 3, c1/c2 = 10/9 — parallel lines (no solution).",
        },
        {
          no: "3",
          statement:
            "On comparing the ratios a1/a2, b1/b2 and c1/c2, find out whether the following pair of linear equations are consistent, or inconsistent: (i) 3x + 2y = 5; 2x - 3y = 7  (ii) 2x - 3y = 8; 4x - 6y = 9  (iii) 3/2 x + 5/3 y = 7; 9x - 10y = 14  (iv) 5x - 3y = 11; -10x + 6y = -22  (v) 4/3 x + 2y = 8; 2x + 3y = 12",
          answer:
            "(i) a1/a2 not equal to b1/b2 — consistent, unique solution. (ii) a1/a2 = b1/b2 = 1/2 not equal to c1/c2 = 8/9 — inconsistent, no solution. (iii) a1/a2 = 1/6, b1/b2 = -1/6 — not equal, consistent, unique solution. (iv) a1/a2 = b1/b2 = c1/c2 = -1/2 — consistent, infinitely many solutions. (v) a1/a2 = b1/b2 = c1/c2 = 2/3 — consistent, infinitely many solutions.",
        },
        {
          no: "4",
          statement:
            "Which of the following pairs of linear equations are consistent/inconsistent? If consistent, obtain the solution graphically: (i) x + y = 5, 2x + 2y = 10  (ii) x - y = 8, 3x - 3y = 16  (iii) 2x + y - 6 = 0, 4x - 2y - 4 = 0  (iv) 2x - 2y - 2 = 0, 4x - 4y - 5 = 0",
          answer:
            "(i) Consistent, infinitely many solutions (coincident lines; every point with x + y = 5). (ii) Inconsistent, no solution (parallel lines). (iii) Consistent, unique solution x = 2, y = 2. (iv) Inconsistent, no solution (parallel lines).",
        },
        {
          no: "5",
          statement:
            "Half the perimeter of a rectangular garden, whose length is 4 m more than its width, is 36 m. Find the dimensions of the garden.",
          answer:
            "With length l and width w: l + w = 36, l = w + 4, giving w = 16 m, l = 20 m. Length 20 m, width 16 m.",
        },
        {
          no: "6",
          statement:
            "Given the linear equation 2x + 3y - 8 = 0, write another linear equation in two variables such that the geometrical representation of the pair so formed is: (i) intersecting lines  (ii) parallel lines  (iii) coincident lines",
          answer:
            "(i) x - y - 1 = 0 (a1/a2 not equal to b1/b2). (ii) 6x + 9y - 10 = 0 (a1/a2 = b1/b2 = 1/3, not equal to c1/c2). (iii) 4x + 6y - 16 = 0 (a1/a2 = b1/b2 = c1/c2 = 1/2). Any equation satisfying the same ratio condition is also correct.",
        },
        {
          no: "7",
          statement:
            "Draw the graphs of the equations x - y + 1 = 0 and 3x + 2y - 12 = 0. Determine the coordinates of the vertices of the triangle formed by these lines and the x-axis, and shade the triangular region.",
          answer:
            "Vertices: (-1, 0), (4, 0) and (2, 3) — the first two are the x-intercepts of the two lines, and the third is their point of intersection.",
        },
      ],
    },
    {
      exercise: "3.2",
      problems: [
        {
          no: "1",
          statement:
            "Solve the following pair of linear equations by the substitution method: (i) x + y = 14, x - y = 4  (ii) s - t = 3, s/3 + t/2 = 6  (iii) 3x - y = 3, 9x - 3y = 9  (iv) 0.2x + 0.3y = 1.3, 0.4x + 0.5y = 2.3  (v) sqrt(2)x + sqrt(3)y = 0, sqrt(3)x - sqrt(8)y = 0  (vi) 3x/2 - 5y/3 = -2, x/3 + y/2 = 13/6",
          answer:
            "(i) x = 9, y = 5. (ii) s = 9, t = 6. (iii) The second equation is 3 times the first, so infinitely many solutions (any x, y with 3x - y = 3). (iv) x = 2, y = 3. (v) x = 0, y = 0. (vi) x = 2, y = 3.",
        },
        {
          no: "2",
          statement:
            "Solve 2x + 3y = 11 and 2x - 4y = -24 and hence find the value of 'm' for which y = mx + 3.",
          answer: "x = -2, y = 5; substituting gives 5 = -2m + 3, so m = -1.",
        },
        {
          no: "3",
          statement:
            "Form the pair of linear equations for the following problems and find their solution by substitution method: (i) The difference between two numbers is 26 and one number is three times the other. Find them. (ii) The larger of two supplementary angles exceeds the smaller by 18 degrees. Find them. (iii) The coach of a cricket team buys 7 bats and 6 balls for Rs 3800. Later, she buys 3 bats and 5 balls for Rs 1750. Find the cost of each bat and each ball. (iv) The taxi charges in a city consist of a fixed charge together with the charge for the distance covered. For a distance of 10 km, the charge paid is Rs 105 and for a journey of 15 km, the charge paid is Rs 155. What are the fixed charges and the charge per km? How much does a person have to pay for travelling a distance of 25 km? (v) A fraction becomes 9/11 if 2 is added to both the numerator and the denominator. If 3 is added to both the numerator and the denominator it becomes 5/6. Find the fraction. (vi) Five years hence, the age of Jacob will be three times that of his son. Five years ago, Jacob's age was seven times that of his son. What are their present ages?",
          answer:
            "(i) Numbers are 39 and 13. (ii) Angles are 99 degrees and 81 degrees. (iii) Bat Rs 500, ball Rs 50. (iv) Fixed charge Rs 5, charge Rs 10 per km; a 25 km journey costs Rs 255. (v) Fraction is 7/9. (vi) Jacob is 40 years old, his son is 10 years old.",
        },
      ],
    },
    {
      exercise: "3.3",
      problems: [
        {
          no: "1",
          statement:
            "Solve the following pair of linear equations by the elimination method and the substitution method: (i) x + y = 5 and 2x - 3y = 4  (ii) 3x + 4y = 10 and 2x - 2y = 2  (iii) 3x - 5y - 4 = 0 and 9x = 2y + 7  (iv) x/2 + 2y/3 = -1 and x - y/3 = 3",
          answer:
            "(i) x = 19/5, y = 6/5. (ii) x = 2, y = 1. (iii) x = 9/13, y = -5/13. (iv) x = 2, y = -3.",
        },
        {
          no: "2",
          statement:
            "Form the pair of linear equations in the following problems, and find their solutions (if they exist) by the elimination method: (i) If we add 1 to the numerator and subtract 1 from the denominator, a fraction reduces to 1. It becomes 1/2 if we only add 1 to the denominator. What is the fraction? (ii) Five years ago, Nuri was thrice as old as Sonu. Ten years later, Nuri will be twice as old as Sonu. How old are Nuri and Sonu? (iii) The sum of the digits of a two-digit number is 9. Also, nine times this number is twice the number obtained by reversing the order of the digits. Find the number. (iv) Meena went to a bank to withdraw Rs 2000. She asked the cashier to give her Rs 50 and Rs 100 notes only. Meena got 25 notes in all. Find how many notes of Rs 50 and Rs 100 she received. (v) A lending library has a fixed charge for the first three days and an additional charge for each day thereafter. Saritha paid Rs 27 for a book kept for seven days, while Susy paid Rs 21 for the book she kept for five days. Find the fixed charge and the charge for each extra day.",
          answer:
            "(i) Fraction is 1/3. (ii) Nuri is 50 years old, Sonu is 20 years old. (iii) The number is 18. (iv) 10 notes of Rs 50 and 15 notes of Rs 100. (v) Fixed charge Rs 15, extra charge Rs 3 per day.",
        },
      ],
    },
  ],
};
