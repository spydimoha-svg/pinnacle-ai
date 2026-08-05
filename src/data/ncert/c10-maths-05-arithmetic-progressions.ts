// NCERT Class 10 Mathematics — Chapter 5: Arithmetic Progressions (rationalised
// syllabus). Verbatim exercises. This chapter keeps its three graded exercises,
// 5.1 (recognising and building an AP), 5.2 (the nth term) and 5.3 (the sum of
// n terms). Exercise 5.4 exists in the printed book but is marked there as
// "Optional — not from the examination point of view" and is left out here for
// that reason. Answers are worked and stored here so the tutor's final results
// are guaranteed right.
import type { NcertChapter } from "./types";

export const C10_MATHS_ARITHMETIC_PROGRESSIONS: NcertChapter = {
  id: "c10-maths-05",
  classLevel: 10,
  subjectId: "c10-maths",
  chapterNumber: 5,
  title: "Arithmetic Progressions",
  book: "NCERT Class 10 Mathematics (rationalised)",
  concepts: [
    "An ARITHMETIC PROGRESSION (AP) is a list of numbers in which every term after the first is obtained by adding a fixed number to the term before it. That fixed number is the COMMON DIFFERENCE d, and it can be positive, negative or zero. The first term is written a. Written out in full, a, a+d, a+2d, a+3d, ... is the general form of an AP. An AP with a last term is finite; one that goes on forever is infinite.",
    "Finding d: subtract any term from the term that comes immediately after it, d = a(k+1) - a(k). It only needs to be found once, but to check whether a GIVEN list is an AP, every consecutive pair must give the same difference — one unequal gap rules it out, even if earlier gaps matched.",
    "THE nTH TERM: a(n) = a + (n-1)d. Reaching the nth term takes n-1 steps of size d from the first term, which is why the multiplier on d is always one less than the term's position. This turns a question like 'find the 100th term' from ninety-nine additions into one substitution.",
    "Running the nth-term formula backwards answers 'which term equals this value', 'how many terms does this AP have', and 'is this value even a term of the AP'. Substitute the known value for a(n) and solve for n: a whole, positive n confirms the value is a term (and its position); a fractional or negative n means it is not a term at all.",
    "THE SUM OF THE FIRST n TERMS: S(n) = (n/2)[2a + (n-1)d]. It comes from writing the sum forwards, writing it again backwards, and adding the two — every paired column comes to 2a + (n-1)d, and there are n such pairs counted twice. When the last term l is known instead of d, the shorter S(n) = (n/2)(a + l) does the same job.",
    "A term can be recovered from sums alone, without knowing a or d: a(n) = S(n) - S(n-1), because S(n) already contains every term up to the nth and S(n-1) contains every term up to the one before it. In particular a(1) = S(1).",
    "Word problems: identify the quantity that increases or decreases by a fixed amount, name its first value a and its common difference d, then apply the nth-term or sum formula. Reject any n that is not a positive whole number, since a term position cannot be fractional or negative.",
  ].join("\n"),
  keyFormulae: [
    "General form of an AP: a, a+d, a+2d, a+3d, ...",
    "nth term: a(n) = a + (n-1)d",
    "Sum of first n terms: S(n) = (n/2)[2a + (n-1)d] = (n/2)(a + l), where l is the last term",
    "Recovering a term from sums: a(n) = S(n) - S(n-1)",
  ],
  topics: [
    "What makes a list an AP, and the common difference d",
    "Writing an AP from a and d, and testing whether a given list is an AP",
    "The nth term formula and using it forwards",
    "Running the nth-term formula backwards: which term, how many terms, is a value a term",
    "Sum of the first n terms, and the short form using the last term",
    "Recovering a term from the sum formula",
    "Word problems leading to an AP",
  ],
  exercises: [
    {
      exercise: "5.1",
      problems: [
        {
          no: "1",
          statement:
            "In which of the following situations, does the list of numbers involved make an arithmetic progression, and why? (i) The taxi fare after each km when the fare is Rs 15 for the first km and Rs 8 for each additional km. (ii) The amount of air present in a cylinder when a vacuum pump removes 1/4 of the air remaining in the cylinder at a time. (iii) The cost of digging a well after every metre of digging, when it costs Rs 150 for the first metre and rises by Rs 50 for each subsequent metre. (iv) The amount of money in the account every year, when Rs 10000 is deposited at compound interest at 8% per annum.",
          answer:
            "(i) Yes; d = 8. Fares are 15, 23, 31, 39, ... (ii) No; the amount left each time is 3/4 of the previous amount, not a fixed difference. (iii) Yes; d = 50. Costs are 150, 200, 250, 300, ... (iv) No; compound interest multiplies the amount by a fixed factor each year, not adds a fixed amount.",
        },
        {
          no: "2",
          statement:
            "Write first four terms of the AP, when the first term a and the common difference d are given as follows: (i) a = 10, d = 10 (ii) a = -2, d = 0 (iii) a = 4, d = -3 (iv) a = -1, d = 1/2 (v) a = -1.25, d = -0.25",
          answer:
            "(i) 10, 20, 30, 40. (ii) -2, -2, -2, -2. (iii) 4, 1, -2, -5. (iv) -1, -1/2, 0, 1/2. (v) -1.25, -1.5, -1.75, -2.0.",
        },
        {
          no: "3",
          statement:
            "For the following APs, write the first term and the common difference: (i) 3, 1, -1, -3, ... (ii) -5, -1, 3, 7, ... (iii) 1/3, 5/3, 9/3, 13/3, ... (iv) 0.6, 1.7, 2.8, 3.9, ...",
          answer:
            "(i) a = 3, d = -2. (ii) a = -5, d = 4. (iii) a = 1/3, d = 4/3. (iv) a = 0.6, d = 1.1.",
        },
        {
          no: "4",
          statement:
            "Which of the following are APs? If they form an AP, find the common difference d and write three more terms. (i) 2, 4, 8, 16, ... (ii) 2, 5/2, 3, 7/2, ... (iii) -1.2, -3.2, -5.2, -7.2, ... (iv) -10, -6, -2, 2, ... (v) 3, 3+sqrt(2), 3+2sqrt(2), 3+3sqrt(2), ... (vi) 0.2, 0.22, 0.222, 0.2222, ... (vii) 0, -4, -8, -12, ... (viii) -1/2, -1/2, -1/2, -1/2, ... (ix) 1, 3, 9, 27, ... (x) a, 2a, 3a, 4a, ... (xi) a, a^2, a^3, a^4, ... (xii) sqrt(2), sqrt(8), sqrt(18), sqrt(32), ... (xiii) sqrt(3), sqrt(6), sqrt(9), sqrt(12), ... (xiv) 1^2, 3^2, 5^2, 7^2, ... (xv) 1^2, 5^2, 7^2, 73, ...",
          answer:
            "(i) Not an AP (differences 2, 4, 8 are not equal). (ii) AP, d = 1/2; next terms 4, 9/2, 5. (iii) AP, d = -2; next terms -9.2, -11.2, -13.2. (iv) AP, d = 4; next terms 6, 10, 14. (v) AP, d = sqrt(2); next terms 3+4sqrt(2), 3+5sqrt(2), 3+6sqrt(2). (vi) Not an AP (differences 0.02, 0.002, 0.0002 are not equal). (vii) AP, d = -4; next terms -16, -20, -24. (viii) AP, d = 0; next terms -1/2, -1/2, -1/2. (ix) Not an AP (differences 2, 6, 18 are not equal). (x) AP, d = a; next terms 5a, 6a, 7a. (xi) Not an AP in general (differences a^2-a, a^3-a^2 are not equal for a not 0 or 1). (xii) AP, d = sqrt(2) (list is sqrt(2), 2sqrt(2), 3sqrt(2), 4sqrt(2)); next terms sqrt(50), sqrt(72), sqrt(98). (xiii) Not an AP (sqrt(3), sqrt(6), sqrt(9), sqrt(12) do not have equal differences). (xiv) Not an AP (list is 1, 9, 25, 49; differences 8, 16, 24 are not equal). (xv) AP, d = 24 (list is 1, 25, 49, 73); next terms 97, 121, 145.",
        },
      ],
    },
    {
      exercise: "5.2",
      problems: [
        {
          no: "1",
          statement:
            "Fill in the blanks in the following table, given that a is the first term, d the common difference and a(n) the nth term of the AP: (i) a = 7, d = 3, n = 8, a(n) = ? (ii) a = -18, d = ?, n = 10, a(n) = 0 (iii) a = ?, d = -3, n = 18, a(n) = -5 (iv) a = -18.9, d = 2.5, n = ?, a(n) = 3.6 (v) a = 3.5, d = 0, n = 105, a(n) = ?",
          answer:
            "(i) a(n) = 28. (ii) d = 2. (iii) a = 46. (iv) n = 10. (v) a(n) = 3.5.",
        },
        {
          no: "2",
          statement:
            "Choose the correct choice in the following and justify: (i) 30th term of the AP: 10, 7, 4, ..., is (A) 97 (B) 77 (C) -77 (D) -87 (ii) 11th term of the AP: -3, -1/2, 2, ..., is (A) 28 (B) 22 (C) -38 (D) -48 1/2",
          answer:
            "(i) (C) -77, since a = 10, d = -3, a30 = 10 + 29(-3) = -77. (ii) (B) 22, since a = -3, d = 5/2, a11 = -3 + 10(5/2) = 22.",
        },
        {
          no: "3",
          statement:
            "In the following APs, find the missing terms in the boxes: (i) 2, __, 26 (ii) __, 13, __, 3 (iii) 5, __, __, 9 1/2 (iv) -4, __, __, __, __, 6 (v) __, 38, __, __, __, -22",
          answer:
            "(i) 14 (AP: 2, 14, 26). (ii) 18 and 8 (AP: 18, 13, 8, 3). (iii) 6 1/2 and 8 (AP: 5, 6 1/2, 8, 9 1/2). (iv) -2, 0, 2, 4 (AP: -4, -2, 0, 2, 4, 6). (v) 53, 23, 8, -7 (AP: 53, 38, 23, 8, -7, -22).",
        },
        {
          no: "4",
          statement: "Which term of the AP: 3, 8, 13, 18, ..., is 78?",
          answer: "The 16th term.",
        },
        {
          no: "5",
          statement:
            "Find the number of terms in each of the following APs: (i) 7, 13, 19, ..., 205 (ii) 18, 15 1/2, 13, ..., -47",
          answer: "(i) 34 terms. (ii) 27 terms.",
        },
        {
          no: "6",
          statement: "Check whether -150 is a term of the AP: 11, 8, 5, 2, ...",
          answer:
            "No; solving -150 = 11 + (n-1)(-3) gives n = 54 1/3, which is not a positive integer, so -150 is not a term.",
        },
        {
          no: "7",
          statement: "Find the 31st term of an AP whose 11th term is 38 and the 16th term is 73.",
          answer: "a = -32, d = 7; the 31st term is 178.",
        },
        {
          no: "8",
          statement:
            "An AP consists of 50 terms of which 3rd term is 12 and the last term is 106. Find the 29th term.",
          answer: "a = 8, d = 2; the 29th term is 64.",
        },
        {
          no: "9",
          statement: "If the 3rd and the 9th terms of an AP are 4 and -8 respectively, which term of this AP is zero?",
          answer: "The 5th term (a = 8, d = -2).",
        },
        {
          no: "10",
          statement: "The 17th term of an AP exceeds its 10th term by 7. Find the common difference.",
          answer: "d = 1.",
        },
        {
          no: "11",
          statement: "Which term of the AP: 3, 15, 27, 39, ... will be 132 more than its 54th term?",
          answer: "The 65th term.",
        },
        {
          no: "12",
          statement:
            "Two APs have the same common difference. The difference between their 100th terms is 100, what is the difference between their 1000th terms?",
          answer: "Also 100, since the difference between corresponding terms of two APs with equal d is constant.",
        },
        {
          no: "13",
          statement: "How many three-digit numbers are divisible by 7?",
          answer: "128 (the AP 105, 112, ..., 994 has 128 terms).",
        },
        {
          no: "14",
          statement: "How many multiples of 4 lie between 10 and 250?",
          answer: "60 (the AP 12, 16, ..., 248 has 60 terms).",
        },
        {
          no: "15",
          statement:
            "For what value of n, are the nth terms of two APs: 63, 65, 67, ... and 3, 10, 17, ... equal?",
          answer: "n = 13.",
        },
        {
          no: "16",
          statement: "Determine the AP whose third term is 16 and the 7th term exceeds the 5th term by 12.",
          answer: "d = 6, a = 4; the AP is 4, 10, 16, 22, ...",
        },
        {
          no: "17",
          statement: "Find the 20th term from the last term of the AP: 3, 8, 13, ..., 253.",
          answer: "158.",
        },
        {
          no: "18",
          statement:
            "The sum of the 4th and 8th terms of an AP is 24 and the sum of the 6th and 10th terms is 44. Find the first three terms of the AP.",
          answer: "a = -13, d = 5; the first three terms are -13, -8, -3.",
        },
        {
          no: "19",
          statement:
            "Subba Rao started work in 1995 at an annual salary of Rs 5000 and received an increment of Rs 200 each year. In which year did his income reach Rs 7000?",
          answer: "2005 (the 11th term of the AP).",
        },
        {
          no: "20",
          statement:
            "Ramkali saved Rs 5 in the first week of a year and then increased her weekly savings by Rs 1.75. If in the nth week, her weekly savings become Rs 20.75, find n.",
          answer: "n = 10.",
        },
      ],
    },
    {
      exercise: "5.3",
      problems: [
        {
          no: "1",
          statement:
            "Find the sum of the following APs: (i) 2, 7, 12, ..., to 10 terms. (ii) -37, -33, -29, ..., to 12 terms. (iii) 0.6, 1.7, 2.8, ..., to 100 terms. (iv) 1/15, 1/12, 1/10, ..., to 11 terms.",
          answer: "(i) 245. (ii) -180. (iii) 5505. (iv) 33/20.",
        },
        {
          no: "2",
          statement:
            "Find the sums given below: (i) 7 + 10 1/2 + 14 + ... + 84 (ii) 34 + 32 + 30 + ... + 10 (iii) -5 + (-8) + (-11) + ... + (-230)",
          answer: "(i) 1046.5. (ii) 286. (iii) -8930.",
        },
        {
          no: "3",
          statement:
            "In an AP: (i) given a = 5, d = 3, a(n) = 50, find n and S(n). (ii) given a = 7, a(13) = 35, find d and S(13). (iii) given a(12) = 37, d = 3, find a and S(12). (iv) given a(3) = 15, S(10) = 125, find d and a(10). (v) given d = 5, S(9) = 75, find a and a(9). (vi) given a = 2, d = 8, S(n) = 90, find n and a(n). (vii) given a = 8, a(n) = 62, S(n) = 210, find n and d. (viii) given a(n) = 4, d = 2, S(n) = -14, find n and a. (ix) given a = 3, n = 8, S = 192, find d. (x) given l = 28, S = 144, and there are total 9 terms. Find a.",
          answer:
            "(i) n = 16, S(16) = 440. (ii) d = 7/3, S(13) = 273. (iii) a = 4, S(12) = 246. (iv) d = -1, a(10) = 8. (v) a = -35/3, a(9) = 85/3. (vi) n = 5, a(5) = 34. (vii) n = 6, d = 54/5. (viii) n = 7, a = -8. (ix) d = 6. (x) a = 4.",
        },
        {
          no: "4",
          statement: "How many terms of the AP: 9, 17, 25, ... must be taken to give a sum of 636?",
          answer: "n = 12.",
        },
        {
          no: "5",
          statement:
            "The first term of an AP is 5, the last term is 45 and the sum is 400. Find the number of terms and the common difference.",
          answer: "n = 16, d = 8/3.",
        },
        {
          no: "6",
          statement:
            "The first and the last terms of an AP are 17 and 350 respectively. If the common difference is 9, how many terms are there and what is their sum?",
          answer: "n = 38 terms, sum = 6973.",
        },
        {
          no: "7",
          statement: "Find the sum of first 22 terms of an AP in which d = 7 and 22nd term is 149.",
          answer: "1661 (a = 2).",
        },
        {
          no: "8",
          statement:
            "Find the sum of first 51 terms of an AP whose second and third terms are 14 and 18 respectively.",
          answer: "5610 (a = 10, d = 4).",
        },
        {
          no: "9",
          statement:
            "If the sum of first 7 terms of an AP is 49 and that of 17 terms is 289, find the sum of first n terms.",
          answer: "S(n) = n^2 (a = 1, d = 2).",
        },
        {
          no: "10",
          statement:
            "Show that a1, a2, ..., an, ... form an AP where an is defined as below: (i) an = 3 + 4n (ii) an = 9 - 5n. Also find the sum of the first 15 terms in each case.",
          answer:
            "(i) a = 7, d = 4 (a(n) is linear in n), sum of first 15 terms = 525. (ii) a = 4, d = -5, sum of first 15 terms = -465.",
        },
        {
          no: "11",
          statement:
            "If the sum of the first n terms of an AP is 4n - n^2, what is the first term (that is S1)? What is the sum of first two terms? What is the second term? Similarly, find the 3rd, the 10th and the nth terms.",
          answer:
            "First term S(1) = 3. Sum of first two terms S(2) = 4. Second term a(2) = 1. Third term a(3) = -1. 10th term a(10) = -15. nth term a(n) = 5 - 2n.",
        },
        {
          no: "12",
          statement: "Find the sum of the first 40 positive integers divisible by 6.",
          answer: "4920.",
        },
        {
          no: "13",
          statement: "Find the sum of the first 15 multiples of 8.",
          answer: "960.",
        },
        {
          no: "14",
          statement: "Find the sum of the odd numbers between 0 and 50.",
          answer: "625.",
        },
        {
          no: "15",
          statement:
            "A contract on construction job specifies a penalty for delay of completion beyond a certain date as follows: Rs 200 for the first day, Rs 250 for the second day, Rs 300 for the third day, etc., the penalty for each succeeding day being Rs 50 more than for the preceding day. How much money the contractor has to pay as penalty, if he has delayed the work by 30 days?",
          answer: "Rs 27750.",
        },
        {
          no: "16",
          statement:
            "A sum of Rs 700 is to be used to give seven cash prizes to students of a school for their overall academic performance. If each prize is Rs 20 less than its preceding prize, find the value of each of the prizes.",
          answer: "Rs 160, 140, 120, 100, 80, 60, 40.",
        },
        {
          no: "17",
          statement:
            "In a school, students thought of planting trees in and around the school to reduce air pollution. It was decided that the number of trees, that each section of each class will plant, will be the same as the class, in which they are studying, e.g., a section of Class I will plant 1 tree, a section of Class II will plant 2 trees and so on till Class XII. There are three sections of each class. How many trees will be planted by the students?",
          answer: "234 trees.",
        },
        {
          no: "18",
          statement:
            "A spiral is made up of successive semicircles, with centres alternately at A and B, starting with centre at A, of radii 0.5 cm, 1.0 cm, 1.5 cm, 2.0 cm, ... What is the total length of such a spiral made up of thirteen consecutive semicircles? (Take pi = 22/7)",
          answer: "143 cm.",
        },
        {
          no: "19",
          statement:
            "200 logs are stacked in the following manner: 20 logs in the bottom row, 19 in the next row, 18 in the row next to it and so on. In how many rows are the 200 logs placed and how many logs are in the top row?",
          answer: "16 rows, with 5 logs in the top row.",
        },
        {
          no: "20",
          statement:
            "In a potato race, a bucket is placed at the starting point, which is 5 m from the first potato, and the other potatoes are placed 3 m apart in a straight line. There are ten potatoes in the line. A competitor starts from the bucket, picks up the nearest potato, runs back with it, drops it in the bucket, runs back to pick up the next potato, runs to the bucket to drop it in, and she continues in the same way until all the potatoes are in the bucket. What is the total distance the competitor has to run?",
          answer: "370 m.",
        },
      ],
    },
  ],
};
