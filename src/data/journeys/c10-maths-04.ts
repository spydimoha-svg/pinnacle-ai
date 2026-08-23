// Class 10 Maths · Chapter 4 · Quadratic Equations — the film grammar.
//
// This file holds ONLY the storytelling: what each scene is called, how it
// opens, and what the student is made to commit to before anything is
// revealed. Every word of actual teaching still comes from the concept graph
// in src/data/concepts/c10-maths-quadratic-equations.ts, so this file can
// never introduce maths the graph does not contain.
//
// The predictions are the load-bearing part. Each one is chosen so that the
// COMMON WRONG ANSWER is genuinely tempting — a prediction nobody gets wrong
// teaches nothing, and a prediction nobody can attempt is just a quiz. Each
// has a stored answer, marked mechanically by grade.ts.
import type { JourneyFraming } from "../../lib/director";

export const C10_MATHS_04_JOURNEY: JourneyFraming = {
  chapterId: "c10-maths-04",
  title: "The Number That Knows the Answer",

  opening:
    "Somewhere in this chapter there is a single number that can tell you how many solutions an equation has — before you have found a single one of them. Everything here builds towards it.",

  closing:
    "You can now look at any quadratic, work out one number, and say what its roots will be like without solving it. That is not a trick. That is what understanding a structure buys you.",

  scenes: [
    {
      conceptId: "c-standard",
      title: "The Disguise",
      setup:
        "Almost no exam question hands you a quadratic. It hands you something wearing brackets, and asks a question that only makes sense once you have stripped them off. Before you can do anything at all, you have to find out what you are actually looking at.",
      predict: {
        question:
          "Is $(x - 2)(x + 1) = (x - 1)(x + 3)$ a quadratic equation? Answer yes or no.",
        answer:
          "No — expanding both sides cancels the $x^2$ terms and leaves $3x - 1 = 0$, which is linear.",
        hint: "Expand both sides fully before you decide. Watch what happens to the $x^2$ terms.",
      },
    },
    {
      conceptId: "c-root",
      title: "What It Means to Be a Solution",
      setup:
        "A root is not something you find. It is something you can test. That distinction is worth more marks than it sounds, because it turns a whole class of questions into arithmetic you already know how to do.",
      predict: {
        question:
          "Without solving anything: is $x = -1$ a root of $x^2 + 4x + 3 = 0$?",
        answer: "Yes — substituting $x = -1$ gives $1 - 4 + 3 = 0$.",
        hint: "Put $-1$ everywhere you see $x$, and remember $(-1)^2 = 1$.",
      },
    },
    {
      conceptId: "c-factorise",
      title: "The Rule That Only Works Against Zero",
      setup:
        "There is one rule here that does all the work, and one condition that everybody forgets. If a product of two things equals zero, one of them must be zero. That is only true against zero — and the exam knows it.",
      predict: {
        question:
          "From $(x - 1)(x - 2) = 6$, a student writes $x - 1 = 6$ or $x - 2 = 6$. Is that valid?",
        answer:
          "No — the zero product rule only works when the product equals zero. Expand, move the 6 across, and factorise the new equation instead.",
        hint: "Ask yourself what the rule actually says. Does 6 have the same property as 0 here?",
      },
    },
    {
      conceptId: "c-formula",
      title: "The Tool That Never Fails",
      setup:
        "Factorisation is fast when it works and useless when it does not. The formula always works. The only thing that goes wrong with it is the signs — so write $a$, $b$ and $c$ down with their signs before you substitute anything.",
      predict: {
        question:
          "In $4x^2 + 4x - 3 = 0$, what are the values of $a$, $b$ and $c$?",
        answer: "$a = 4$, $b = 4$, $c = -3$.",
        hint: "The sign in front of a term belongs to that coefficient.",
      },
    },
    {
      conceptId: "c-discriminant",
      title: "The Number That Knows",
      setup:
        "This is the scene the whole chapter has been walking towards. Under the square root in the formula sits $b^2 - 4ac$. Its SIGN alone decides everything about the roots — and you can read it off without solving anything. Look at the three curves: same shape, three completely different fates.",
      predict: {
        question:
          "A parabola crosses the x-axis at two separate points. Is $b^2 - 4ac$ positive, zero, or negative?",
        answer: "Positive — two distinct real roots.",
        hint: "Each crossing point is a real root. How many are there?",
      },
      // Three parabolas, one per case, on one pair of axes: D > 0 cuts the
      // axis twice, D = 0 touches it once, D < 0 misses it entirely. The
      // discriminant is easier to believe than to be told.
      plot: `{"fn":["x^2-4","x^2","x^2+3"],"domain":[-4,4],"title":"D > 0 cuts, D = 0 touches, D < 0 misses","xLabel":"x","yLabel":"y"}`,
    },
    {
      conceptId: "c-equal-roots",
      title: "Running It Backwards",
      setup:
        "Now the question turns around. Instead of being given an equation and asked about its roots, you are told what the roots are like and asked to find the missing coefficient. The discriminant is still the whole answer — you just start from the other end.",
      predict: {
        question:
          "For $x^2 + kx + 9 = 0$ to have two EQUAL roots, what condition must $k$ satisfy?",
        answer: "$k^2 - 36 = 0$, so $k = 6$ or $k = -6$.",
        hint: "Equal roots means the discriminant is exactly zero. Write $b^2 - 4ac = 0$ and solve for $k$.",
      },
    },
    {
      conceptId: "c-word",
      title: "The Root You Have to Throw Away",
      setup:
        "The last scene is the one that costs the most marks. A worded problem gives you two roots, and the situation itself forbids one of them. Nobody is 4 years old and negative. Nobody buys $-3$ articles. Finding both roots is half the question; knowing which one to discard, and saying why, is the other half.",
      predict: {
        question:
          "Solving for a rectangle's breadth gives $b = 16$ or $b = -33/2$. Which root do you keep, and why?",
        answer:
          "Keep $b = 16$ — a breadth cannot be negative, so the negative root is rejected.",
        hint: "Ask what the unknown physically is. Can it be negative?",
      },
    },
  ],
};
