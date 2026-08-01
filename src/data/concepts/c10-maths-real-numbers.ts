// Class 10 Maths · Chapter 1 · Real Numbers — the hand-authored concept graph.
//
// The chapter is two halves joined by a single fact. The fact is the
// Fundamental Theorem of Arithmetic: a number's prime factorisation is unique.
// The first half spends that fact on HCF and LCM; the second half spends the
// very same fact on proving that $\sqrt{2}$ can never be written as a fraction.
//
// Ordered the way the rationalised NCERT actually builds it: FTA → what
// uniqueness FORBIDS (why $6^n$ can never end in 0) → HCF and LCM from the
// factorisations → HCF × LCM = product → picking the right one in a word
// problem → "if a prime divides $a^2$ it divides $a$" → the $\sqrt{2}$ proof →
// proving things like $5 - \sqrt{3}$ irrational.
//
// Deliberately absent: Euclid's division lemma and the terminating-decimal
// test. Both were removed in the rationalised syllabus, and teaching a student
// something the board will not ask is stealing their revision time.
//
// Also deliberately absent: `figure`. The app's plot block draws functions and
// triangles. The only natural picture in this chapter is a factor tree, which
// is neither, and a diagram that misrepresents the maths teaches worse than no
// diagram at all.
//
// Every check answer below was worked out by hand, because the app marks the
// student against it without asking any model.
import type { ConceptMap } from "./types";

export const C10_MATHS_REAL_NUMBERS_MAP: ConceptMap = {
  chapterId: "c10-maths-01",
  chapterTitle: "Real Numbers",
  classLevel: 10,
  subject: "Mathematics",
  authored: true,
  bigIdea:
    "Every whole number is built out of primes in exactly one way, and that one fact does two jobs: it hands you the HCF and LCM of any pair of numbers, and it lets you prove that numbers like $\\sqrt{2}$ can never be written as a fraction.",

  // All four prereqs sit in Class 9 · Number Systems, and that is not laziness:
  // Class 10 Chapter 1 is the direct sequel to that chapter. Class 9 told the
  // student that $\sqrt{2}$ is irrational. Class 10 makes them prove it.
  prereqs: [
    {
      id: "p-powers",
      from: "Class 9 · Number Systems",
      title: "Powers, and the laws of exponents",
      why: "Prime factorisations are written as powers ($360 = 2^3 \\times 3^2 \\times 5$), and the HCF and the LCM are read off by comparing those powers. If $2^3$ does not read instantly as 8, none of that machinery works.",
      probe: {
        q: "What single number is $2^3 \\times 2^2$ equal to?",
        answer: "$32$.",
      },
    },
    {
      id: "p-pq",
      from: "Class 9 · Number Systems",
      title: "Rational numbers and the $\\dfrac{p}{q}$ form",
      why: "Every proof in the second half of this chapter opens with 'suppose it CAN be written as $\\dfrac{a}{b}$, where a and b have no common factor'. If that sentence is not automatic, the proof reads as magic.",
      probe: {
        q: "Is $\\dfrac{7}{2}$ a rational number? Say yes or no, and why.",
        answer:
          "Yes — 7 and 2 are integers and the denominator is not zero, so it is rational.",
      },
    },
    {
      id: "p-irrational",
      from: "Class 9 · Number Systems",
      title: "Irrational numbers",
      why: "Section 1.3 does not introduce irrational numbers, it proves that a particular number is one. The student is expected to already know what that claim is claiming.",
      probe: {
        q: "Is $\\sqrt{2}$ a rational number? Say yes or no, and why.",
        answer:
          "No — $\\sqrt{2}$ cannot be written as $\\dfrac{p}{q}$, so it is irrational.",
      },
    },
    {
      id: "p-ops",
      from: "Class 9 · Number Systems",
      title: "Operations on real numbers",
      why: "The last part of the chapter leans on Class 9's rules — a rational plus an irrational is irrational, a non-zero rational times an irrational is irrational — while quietly relying on the exception that two irrationals together can land back on a rational.",
      probe: {
        q: "Is $\\sqrt{2} \\times \\sqrt{2}$ a rational number? Say yes or no.",
        answer: "Yes — it equals 2, and 2 is rational.",
      },
    },
  ],

  concepts: [
    {
      id: "c-fta",
      title: "The Fundamental Theorem of Arithmetic",
      oneLine:
        "Every composite number is a product of primes, and apart from the order of the factors that product is the only one possible.",
      brief:
        "Take any composite number and keep splitting it until nothing splits any further: what you are left with is a list of primes. The theorem says two things. First, that this always works — every composite number CAN be written as a product of primes. Second, and this is the half that does the real work later, that the list is UNIQUE apart from the order you write it in. The tidy way to write it is standard form: the primes in increasing order, repeats collected into powers. Note that 1 is neither prime nor composite; it is left out precisely so that the factorisation stays unique.",
      example:
        "$3825$: divide by 5 to get 765, by 5 again to get 153, by 3 to get 51, by 3 again to get 17 — and 17 is prime. So $3825 = 3^2 \\times 5^2 \\times 17$, and no other collection of primes multiplies to 3825.",
      check: {
        q: "Write 255 as a product of its prime factors.",
        answer: "$255 = 3 \\times 5 \\times 17$.",
        hint: "Divide by the smallest prime that goes in exactly, then divide what is left the same way, until what remains is itself prime.",
      },
      mistakes: [
        "Stopping at a factor pair like $3 \\times 85$ — both are factors, but 85 is not prime, so the job is not finished.",
        "Including 1 as a factor. 1 is not prime, and allowing it would destroy the uniqueness the whole chapter rests on.",
      ],
      needs: ["p-powers"],
      marks: "1 mark on its own, and the first line of most 2–3 mark HCF/LCM answers",
    },
    {
      id: "c-uniqueness",
      title: "What uniqueness forbids",
      oneLine:
        "If a prime is missing from a number's factorisation, that prime can never divide the number — however large you make it.",
      brief:
        "Because the prime factorisation is unique, the primes in a number are a fixed, closed list. Nothing you do can smuggle in a prime that was not there. Two board questions live on this. (1) 'Can $a^n$ end with the digit 0?' A number ends in 0 exactly when 10 divides it, and $10 = 2 \\times 5$, so BOTH 2 and 5 must sit in its factorisation. (2) 'Explain why $7 \\times 11 \\times 13 + 13$ is composite.' Take the common factor out: $13(7 \\times 11 + 1) = 13 \\times 78$. You have named a factor other than 1 and the number itself, so it is composite.",
      example:
        "$4^n = (2^2)^n = 2^{2n}$. The only prime anywhere in it is 2, so 5 never divides $4^n$, so $4^n$ can never end in the digit 0 — for any n at all.",
      check: {
        q: "Can $6^n$ end with the digit 0 for any natural number n? Say yes or no, and why.",
        answer:
          "No — 5 is not a factor of $6^n$, and every number ending in 0 has 5 as a factor.",
        hint: "A number ends in 0 exactly when 10 divides it. Which primes make up 10, and is each of them inside $6^n$?",
      },
      mistakes: [
        "Trying n = 1, 2, 3, seeing 6, 36, 216 and calling it proved. A handful of cases is not a proof; the factorisation argument covers every n at once.",
        "Answering 'it always ends in 6' — true, but that is an observation about the pattern, not the reason the board wants.",
      ],
      needs: ["p-powers"],
      marks: "2 marks",
    },
    {
      id: "c-hcf-lcm",
      title: "HCF and LCM from the prime factorisations",
      oneLine:
        "Factorise both numbers; the HCF takes the SMALLEST power of each common prime, the LCM takes the GREATEST power of every prime that appears in either.",
      brief:
        "Write both numbers in standard form. For the HCF (highest common factor), look only at the primes the two numbers share and take the lower power of each. For the LCM (lowest common multiple), look at every prime that appears in either number — shared or not — and take the higher power of each. The step that gets dropped is that second one: a prime living in only one of the two numbers still belongs in the LCM, because the LCM has to be a multiple of that number too.",
      example:
        "$6 = 2 \\times 3$ and $20 = 2^2 \\times 5$. The only shared prime is 2, at its lower power, so HCF $= 2$. The primes involved altogether are 2, 3 and 5, at their higher powers, so LCM $= 2^2 \\times 3 \\times 5 = 60$.",
      check: {
        q: "Find the HCF and the LCM of 15 and 25.",
        answer: "HCF $= 5$ and LCM $= 75$.",
        hint: "Prime-factorise both numbers first. Then take the lower power of each prime they share, and the higher power of every prime that shows up at all.",
      },
      mistakes: [
        "Swapping the rules and taking the highest power for the HCF. Sanity check: the HCF can never be larger than either number, and the LCM can never be smaller.",
        "Leaving out a prime that sits in only one of the two numbers when building the LCM.",
      ],
      needs: ["p-powers"],
      marks: "2–3 marks; asked in some form nearly every year",
    },
    {
      id: "c-product",
      title: "HCF × LCM = the product of the two numbers",
      oneLine:
        "For any two positive integers a and b, $\\text{HCF}(a,b) \\times \\text{LCM}(a,b) = a \\times b$.",
      brief:
        "Look at any one prime: the HCF takes its lower power and the LCM takes its higher power, and lower + higher is exactly the two powers added — which is what you get by multiplying a and b. So multiplying the HCF by the LCM rebuilds $a \\times b$ prime by prime. Two uses: check an HCF/LCM you have just computed, or find the fourth quantity when the other three are given. One hard limit — this holds for TWO numbers only. For three numbers it simply fails: 6, 72 and 120 have HCF 6 and LCM 360, and $6 \\times 360 = 2160$, nowhere near $6 \\times 72 \\times 120 = 51840$.",
      example:
        "$96 = 2^5 \\times 3$ and $404 = 2^2 \\times 101$, so HCF $= 2^2 = 4$. Then LCM $= \\dfrac{96 \\times 404}{4} = \\dfrac{38784}{4} = 9696$, with no need to build it prime by prime.",
      check: {
        q: "The HCF of two numbers is 9 and their LCM is 90. If one of the numbers is 18, what is the other one?",
        answer: "The other number is 45.",
        hint: "The HCF times the LCM equals the two numbers multiplied together. Three of those four quantities are already in front of you.",
      },
      mistakes: [
        "Adding the HCF and the LCM instead of multiplying them.",
        "Applying the rule to three numbers. It is a two-number rule, and the board has asked exactly this trap.",
      ],
      needs: ["p-powers"],
      marks: "1–2 marks",
    },
    {
      id: "c-choose",
      title: "HCF or LCM? Reading the word problem",
      oneLine:
        "Cutting, sharing or grouping into the largest equal pieces is an HCF question; repeating cycles meeting up again is an LCM question.",
      brief:
        "The arithmetic in these questions is the easy part; picking the right tool is where the marks go. Ask what the answer has to do. If it must divide each given number — the largest tin that measures out both tankers, the biggest identical bags you can pack, the longest tape that measures both rooms — it is the HCF. If it must be a multiple of each given number — the two joggers back at the start together, the bells ringing together again, the smallest number of sweets that shares out exactly among 12 or 18 children — it is the LCM. Shortcut phrasing: 'largest / maximum' points at the HCF, 'again / together / smallest such number' points at the LCM.",
      example:
        "24 chocolates and 36 toffees, packed into identical bags with nothing left over: the number of bags is HCF$(24, 36) = 12$, so each bag gets 2 chocolates and 3 toffees.",
      check: {
        q: "Two friends jog around a circular track. One takes 12 minutes for a round, the other takes 18 minutes. If they start together, after how many minutes will they next be at the starting point together?",
        answer: "After 36 minutes, the LCM of 12 and 18.",
        hint: "Each of them is back at the start only after a whole number of rounds. You want the first time that is true for both at once.",
      },
      mistakes: [
        "Reaching for the HCF because it is the easier calculation — here the HCF is 6, and after 6 minutes neither runner has completed a round.",
        "Adding the two times together, which answers a question nobody asked.",
      ],
      marks: "2–3 marks as a word problem",
    },
    {
      id: "c-prime-square",
      title: "If a prime divides $a^2$, it divides a",
      oneLine:
        "For a PRIME p: whenever p divides $a^2$, p must also divide a.",
      brief:
        "Write a as its product of primes. Then $a^2$ is that same list written out twice, so $a^2$ contains exactly the primes a contained — no new ones, because the factorisation is unique. If p turns up in $a^2$, it was already in a. The word 'prime' is load-bearing and the theorem is false without it: 4 divides $6^2 = 36$, yet 4 does not divide 6. This small result is the hinge the whole irrationality proof turns on, and in the exam you may quote it rather than reprove it.",
      example:
        "$a = 10$, so $a^2 = 100$. 5 divides 100, and sure enough 5 divides 10. Same for 2: it divides 100, and it divides 10.",
      check: {
        q: "A prime number p divides $a^2$, where a is a positive integer. Must p also divide a? Say yes or no, and why.",
        answer:
          "Yes — p is prime, so every prime factor of $a^2$ is a factor of a; p divides a.",
        hint: "Write the prime factorisation of $a^2$: it is the factorisation of a with every power doubled. Which primes can possibly appear in it?",
      },
      mistakes: [
        "Using it when p is not prime. 4 divides $6^2$ but not 6 — the theorem never claimed otherwise.",
        "Proving it from scratch in the exam and running out of time. It is a stated theorem; quote it.",
      ],
      needs: ["c-fta"],
      marks: "1 mark to state; it is the engine of the 3-mark proof that follows",
    },
    {
      id: "c-root2",
      title: "Proving $\\sqrt{2}$ is irrational",
      oneLine:
        "Assume $\\sqrt{2} = \\dfrac{a}{b}$ with a and b sharing no factor; the assumption forces 2 into BOTH a and b, which is the contradiction.",
      brief:
        "This is proof by contradiction, and every line has a job. Suppose $\\sqrt{2}$ is rational. Then $\\sqrt{2} = \\dfrac{a}{b}$ where a and b are integers, $b \\neq 0$, and a and b have no common factor other than 1 — you may always cancel down to that. So $b\\sqrt{2} = a$, and squaring gives $2b^2 = a^2$. So 2 divides $a^2$, and since 2 is prime, 2 divides a. Write $a = 2c$. Substituting: $2b^2 = 4c^2$, so $b^2 = 2c^2$, so 2 divides $b^2$, so 2 divides b. Now 2 divides both a and b — but we said they had no common factor. The only thing that can be wrong is the assumption we started from. Therefore $\\sqrt{2}$ is irrational. The identical argument works for $\\sqrt{3}$ and $\\sqrt{5}$; only the prime changes.",
      example:
        "For $\\sqrt{5}$: $5b^2 = a^2$, so 5 divides $a^2$, so 5 divides a; put $a = 5c$ to get $b^2 = 5c^2$, so 5 divides b. Common factor 5, contradiction, done.",
      check: {
        q: "In the proof that $\\sqrt{2}$ is irrational we reach $2b^2 = a^2$ and then say that 2 divides a. Which property of the number 2 makes that step legal?",
        answer: "That 2 is prime — a prime that divides $a^2$ divides a.",
        hint: "The step is quoting the theorem you have just met, not doing arithmetic. That theorem has one condition attached.",
      },
      mistakes: [
        "Forgetting to say at the start that a and b have no common factor. Without that line there is nothing to contradict at the end, and the proof scores almost nothing.",
        "Stopping at '2 divides a' and thinking it is finished. You must run the same argument again on b to get the contradiction.",
      ],
      needs: ["p-pq", "p-irrational", "c-prime-square"],
      marks: "3 marks; the most repeated long answer in this chapter",
    },
    {
      id: "c-combine",
      title: "Proving numbers like $5 - \\sqrt{3}$ are irrational",
      oneLine:
        "Assume the whole expression is rational, isolate the surd, and you are left claiming an irrational number equals a fraction.",
      brief:
        "Once $\\sqrt{2}$, $\\sqrt{3}$ and $\\sqrt{5}$ are known to be irrational, the board asks you to build on them. The method never changes. For $5 - \\sqrt{3}$: suppose it is rational, say $5 - \\sqrt{3} = \\dfrac{a}{b}$. Rearranging, $\\sqrt{3} = 5 - \\dfrac{a}{b}$, and the right-hand side is a rational minus a rational, which is rational. That makes $\\sqrt{3}$ rational, which it is not. Contradiction, so $5 - \\sqrt{3}$ is irrational. For $3\\sqrt{2}$ you divide instead of subtracting: $\\sqrt{2} = \\dfrac{a}{3b}$, again a ratio of integers. Underneath sit the Class 9 rules — a rational added to or subtracted from an irrational is irrational, and a NON-ZERO rational times an irrational is irrational.",
      example:
        "$3\\sqrt{2}$: if $3\\sqrt{2} = \\dfrac{a}{b}$ then $\\sqrt{2} = \\dfrac{a}{3b}$, a ratio of two integers and therefore rational. But $\\sqrt{2}$ is irrational. So $3\\sqrt{2}$ is irrational.",
      check: {
        q: "Is $5 - \\sqrt{3}$ a rational number? Say yes or no, and why.",
        answer:
          "No — a rational minus an irrational is always irrational, so $5 - \\sqrt{3}$ is irrational.",
        hint: "Suppose it were rational, then get $\\sqrt{3}$ alone on one side. What kind of number would the other side have to be?",
      },
      mistakes: [
        "Writing only 'it is irrational because $\\sqrt{3}$ is irrational'. For 3 marks the board wants the assumption, the rearrangement and the contradiction written out.",
        "Assuming two irrationals must add to an irrational: $(2 + \\sqrt{3}) + (2 - \\sqrt{3}) = 4$, which is rational.",
      ],
      needs: ["p-ops", "p-pq"],
      marks: "3 marks",
    },
  ],

  leadsTo: [
    {
      title: "Quadratic Equations",
      where: "Class 10 · Chapter 4",
      why: "The roots come out as $\\dfrac{-b \\pm \\sqrt{D}}{2a}$. Deciding whether those roots are rational or irrational is precisely the skill this chapter builds — it comes down to whether D is a perfect square.",
    },
    {
      title: "Introduction to Trigonometry",
      where: "Class 10 · Chapter 8",
      why: "The standard values are irrational numbers such as $\\dfrac{\\sqrt{3}}{2}$, and you are expected to leave them in surd form. This chapter is why rounding them off is a loss of information, not a tidy-up.",
    },
    {
      title: "Complex Numbers and Quadratic Equations",
      where: "Class 11",
      why: "This chapter finishes the real number line: rationals and irrationals together, nothing missing. Class 11 makes the next extension, for the numbers whose square is negative.",
    },
    {
      title: "Proof by contradiction",
      where: "Class 11 onwards, and every competitive paper",
      why: "The $\\sqrt{2}$ argument is most students' first real proof. Assume the opposite, follow it until it collapses — it is the standard way to prove that something is impossible.",
    },
  ],
};
