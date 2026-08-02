// NCERT Class 10 Mathematics — Chapter 1: Real Numbers (rationalised syllabus).
// Verbatim exercise. In the rationalised NCERT this chapter keeps only one
// exercise, 1.1 (built on the Fundamental Theorem of Arithmetic). Euclid's
// division lemma/algorithm and the terminating-decimal-expansion test were
// removed and must not be taught. Answers are worked and stored here so the
// tutor's final results are guaranteed right.
import type { NcertChapter } from "./types";

export const C10_MATHS_REAL_NUMBERS: NcertChapter = {
  id: "c10-maths-01",
  classLevel: 10,
  subjectId: "c10-maths",
  chapterNumber: 1,
  title: "Real Numbers",
  book: "NCERT Class 10 Mathematics (rationalised)",
  concepts: [
    "The FUNDAMENTAL THEOREM OF ARITHMETIC: every composite number can be expressed as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur. Write it in standard form: primes in increasing order, repeated primes collected into powers.",
    "Because the factorisation is unique, a prime that is absent from a number's factorisation can never divide that number, however large a power is taken. This is why a number of the form 2^n or 4^n or 6^n can never end in the digit 0: ending in 0 needs both 2 and 5 as factors (since 10 = 2 x 5), and 5 never appears.",
    "HCF and LCM from the prime factorisations: factorise both numbers into primes. HCF = product of the SMALLEST power of each common prime factor. LCM = product of the GREATEST power of each prime factor present in either number (shared or not).",
    "For any two positive integers p and q: HCF(p, q) x LCM(p, q) = p x q. This relation holds for TWO numbers only; it does not extend to three or more numbers, and is used both to verify an HCF/LCM computed by factorisation and to find one of HCF, LCM or a number when the other three are given.",
    "If p is a PRIME number and p divides a^2 (a a positive integer), then p divides a. This is false if p is not prime: 4 divides 6^2 = 36 but 4 does not divide 6.",
    "Using that result, root 2 is proved irrational by contradiction: assume root 2 = a/b in lowest terms (a, b coprime, b not 0). Squaring gives 2b^2 = a^2, so 2 divides a^2, so 2 divides a (2 is prime); write a = 2c, substitute to get b^2 = 2c^2, so 2 divides b too. Now 2 divides both a and b, contradicting that they were coprime. So root 2 cannot be rational. The identical argument with the same steps proves root 3 and root 5 irrational.",
    "Numbers built by combining a rational with a known irrational are proved irrational the same way: assume the whole expression is rational, rearrange to isolate the irrational part alone on one side, and show that side would then have to be rational too, contradicting the known irrationality of root 2, root 3 or root 5.",
  ].join("\n"),
  keyFormulae: [
    "HCF x LCM = product of the two numbers (two numbers only, not three or more)",
    "HCF = product of the lowest power of each common prime factor; LCM = product of the highest power of each prime factor present in either number",
    "If prime p divides a^2, then p divides a",
  ],
  topics: [
    "Fundamental Theorem of Arithmetic",
    "Expressing a number as a product of prime factors",
    "What unique factorisation forbids (numbers that can never end in 0)",
    "HCF and LCM by prime factorisation",
    "HCF x LCM = product of the two numbers",
    "Proving root 2, root 3, root 5 irrational",
    "Proving combinations like 5 - root 3 or 3 root 2 irrational",
  ],
  exercises: [
    {
      exercise: "1.1",
      problems: [
        {
          no: "1",
          statement:
            "Express each number as a product of its prime factors: (i) 140  (ii) 156  (iii) 3825  (iv) 5005  (v) 7429",
          answer:
            "(i) 140 = 2^2 x 5 x 7. (ii) 156 = 2^2 x 3 x 13. (iii) 3825 = 3^2 x 5^2 x 17. (iv) 5005 = 5 x 7 x 11 x 13. (v) 7429 = 17 x 19 x 23.",
        },
        {
          no: "2",
          statement:
            "Find the LCM and HCF of the following pairs of integers and verify that LCM x HCF = product of the two numbers: (i) 26 and 91  (ii) 510 and 92  (iii) 336 and 54",
          answer:
            "(i) HCF = 13, LCM = 182; 13 x 182 = 2366 = 26 x 91. (ii) HCF = 2, LCM = 23460; 2 x 23460 = 46920 = 510 x 92. (iii) HCF = 6, LCM = 3024; 6 x 3024 = 18144 = 336 x 54.",
        },
        {
          no: "3",
          statement:
            "Find the LCM and HCF of the following integers by applying the prime factorisation method: (i) 12, 15 and 21  (ii) 17, 23 and 29  (iii) 8, 9 and 25",
          answer:
            "(i) HCF = 3, LCM = 420. (ii) HCF = 1, LCM = 11339. (iii) HCF = 1, LCM = 1800.",
        },
        {
          no: "4",
          statement: "Given that HCF (306, 657) = 9, find LCM (306, 657).",
          answer: "LCM = (306 x 657) / 9 = 201042 / 9 = 22338.",
        },
        {
          no: "5",
          statement: "Check whether 6^n can end with the digit 0 for any natural number n.",
          answer:
            "No. 6^n = 2^n x 3^n, so its only prime factors are 2 and 3; 5 is never a factor. A number ends in 0 only if it is divisible by 10 = 2 x 5, which needs 5 as a factor. So 6^n can never end in 0.",
        },
        {
          no: "6",
          statement:
            "Explain why 7 x 11 x 13 + 13 and 7 x 6 x 5 x 4 x 3 x 2 x 1 + 5 are composite numbers.",
          answer:
            "7 x 11 x 13 + 13 = 13 x (7 x 11 + 1) = 13 x 78 = 1014, a product of two factors other than 1 and itself, so it is composite. 7 x 6 x 5 x 4 x 3 x 2 x 1 + 5 = 5 x (7 x 6 x 4 x 3 x 2 x 1 + 1) = 5 x 1009 = 5045, also a product of two such factors, so it is composite.",
        },
        {
          no: "7",
          statement:
            "There is a circular path around a sports field. Sonia takes 18 minutes to drive one round of the field, while Ravi takes 12 minutes for the same. Suppose they both start at the same point and at the same time, and go in the same direction. After how many minutes will they meet again at the starting point?",
          answer:
            "36 minutes, the LCM of 18 and 12 (18 = 2 x 3^2, 12 = 2^2 x 3, LCM = 2^2 x 3^2 = 36).",
        },
      ],
    },
  ],
};
