// Class 10 Maths · Chapter 3 · Pair of Linear Equations in Two Variables — the
// hand-authored concept graph.
//
// Ordered the way the rationalised NCERT chapter builds it: the general form of
// a pair → the graphical picture of what "solving" it means → the ratio test
// that reads off the picture without drawing it → substitution → elimination →
// the true/false statement that appears when a pair is dependent or
// inconsistent → framing a word problem as a pair and solving it.
//
// Cross-multiplication (old Exercise 3.4) and equations reducible to a pair of
// linear equations (old Exercise 3.5, the 1/x + 1/y forms) were DELETED in the
// 2023 rationalisation and are not taught here — see src/data/ncert/c10-maths-03.
//
// Every check question and worked example below is either lifted verbatim from
// the NCERT exercises this chapter actually carries, or worked by hand and
// checked against them, so the answers below can be trusted the way the
// quadratic-equations map's answers are.
import type { ConceptMap } from "./types";

export const C10_MATHS_LINEAR_EQUATIONS_MAP: ConceptMap = {
  chapterId: "c10-maths-03",
  chapterTitle: "Pair of Linear Equations in Two Variables",
  classLevel: 10,
  subject: "Mathematics",
  authored: true,
  bigIdea:
    "Two equations in x and y are two lines. Solving the pair is finding the one point both lines agree on — and the ratio of their coefficients tells you whether that point exists, and how many there are, before you solve anything.",

  prereqs: [
    {
      id: "p-form",
      from: "Class 9 · Linear Equations in Two Variables",
      title: "General form and identifying a, b, c",
      why: "A pair is two equations of the form $ax + by + c = 0$ side by side. You cannot compare $a_1/a_2$ or plug into either solving method until every equation is rearranged into this form and its coefficients read off correctly, signs included.",
      probe: {
        q: "Write $2x = 7 - 3y$ in the form $ax + by + c = 0$, and state the value of $c$.",
        answer: "$c = -7$, from $2x + 3y - 7 = 0$.",
      },
    },
    {
      id: "p-solution",
      from: "Class 9 · Linear Equations in Two Variables",
      title: "Finding a solution by substituting a value for one variable",
      why: "Every method in this chapter ends the same way: an equation in one variable is solved, and that value is pushed back into an equation to find the other. If picking x and solving for y is shaky, back-substitution is unreachable.",
      probe: {
        q: "If $2x + y = 10$, what is $y$ when $x = 3$?",
        answer: "$y = 4$.",
      },
    },
    {
      id: "p-plot",
      from: "Class 9 · Coordinate Geometry",
      title: "Plotting a point from its coordinates",
      why: "The graphical method is nothing but drawing two lines from plotted points and reading off where they cross. One misplaced point tilts the whole line and hands you the wrong solution.",
      probe: {
        q: "In which quadrant does the point $(-3, 2)$ lie?",
        answer: "Quadrant II.",
      },
    },
  ],

  concepts: [
    {
      id: "c-standard",
      title: "The general form of a pair of linear equations",
      oneLine:
        "A pair puts two equations of the form $ax + by + c = 0$ together: $a_1x+b_1y+c_1=0$ and $a_2x+b_2y+c_2=0$.",
      brief:
        "A linear equation in two variables is any equation that can be REARRANGED into $ax + by + c = 0$, with a and b not both zero. A pair of linear equations is two such equations considered together, and the subscript says which is which — the first equation gives $a_1, b_1, c_1$ and the second gives $a_2, b_2, c_2$. Everything in this chapter, the graphical picture, the ratio test, substitution and elimination, works on this pair at once, so the first move on any question is always the same: rearrange BOTH equations to this form before doing anything else.",
      example:
        "$3x = 5 - 2y$ and $2y - 4 = 6x$ rearrange to $3x + 2y - 5 = 0$ and $6x - 2y + 4 = 0$. So $a_1=3, b_1=2, c_1=-5$ and $a_2=6, b_2=-2, c_2=4$.",
      check: {
        q: "Write the pair $x + 2y = 6$ and $3x - y = 4$ in the form $ax+by+c=0$, and state $a_2$, $b_2$ and $c_2$ (from the second equation).",
        answer: "$a_2 = 3$, $b_2 = -1$, $c_2 = -4$, from $3x - y - 4 = 0$.",
        hint: "Move every term to the left of the equals sign in both equations. The one written second gives the subscript-2 values.",
      },
      mistakes: [
        "Reading a, b, c off an equation before moving every term to one side.",
        "Swapping which equation is 'first' and which is 'second' partway through a question, which flips every subscript that follows.",
        "Dropping a sign when a term crosses the equals sign.",
      ],
      needs: ["p-form"],
      marks: "1 mark on its own, and every later method depends on it being right",
    },
    {
      id: "c-graphical",
      title: "Graphical method: the three ways two lines can meet",
      oneLine:
        "Plot both lines. They either intersect once, run parallel, or lie exactly on top of each other — and each picture is a different kind of answer.",
      brief:
        "Each linear equation is a straight line, found by plotting two or three of its solutions and joining them. Two lines in a plane can only relate in three ways. INTERSECTING at a single point: the pair has a UNIQUE solution and is called CONSISTENT. PARALLEL, never meeting: the pair has NO solution and is INCONSISTENT. COINCIDENT, the same line drawn twice: the pair has INFINITELY MANY solutions, and is called DEPENDENT (which counts as consistent, since solutions do exist). Reading the answer off the graph means reading the coordinates of the crossing point — and a graph without labelled, evenly scaled axes loses the mark even when the lines are drawn correctly.",
      example:
        "$x + y = 7$ has solutions $(0,7)$ and $(7,0)$. $x - y = 1$ has solutions $(0,-1)$ and $(1,0)$. Plotted together the lines cross at $(4,3)$, so the unique solution is $x=4, y=3$.",
      figure:
        '```plot\n{"fn":["-x+7","x-1"],"domain":[0,7],"title":"$x+y=7$ and $x-y=1$ intersect at $(4,3)$: the unique solution","xLabel":"x","yLabel":"y"}\n```',
      check: {
        q: "The graphs of $x + y = 5$ and $2x + 2y = 10$ are drawn. What do you expect to see, and what does it say about the number of solutions?",
        answer: "The same line drawn twice — coincident lines — because the second equation is the first multiplied by 2. So the pair has infinitely many solutions.",
        hint: "Divide the second equation through by 2 and compare it directly with the first.",
      },
      mistakes: [
        "Calling two close but distinct lines coincident instead of checking whether they are really the same equation.",
        "Plotting only two points close together, which makes a small drawing error tilt the whole line.",
        "Losing the mark for an unscaled or unlabelled axis even when the lines themselves are right.",
      ],
      needs: ["p-plot", "p-solution"],
      marks: "3–4 marks when asked directly; the picture behind every question in this chapter",
    },
    {
      id: "c-ratio",
      title: "The ratio test: deciding without drawing anything",
      oneLine:
        "Compare $a_1/a_2$, $b_1/b_2$ and $c_1/c_2$: how many of them are equal tells you intersecting, parallel or coincident.",
      brief:
        "The three graphical cases can be read straight off the coefficients, with no plotting at all. If $a_1/a_2 \\neq b_1/b_2$: the lines intersect — unique solution, consistent. If $a_1/a_2 = b_1/b_2 \\neq c_1/c_2$: the lines are parallel — no solution, inconsistent. If $a_1/a_2 = b_1/b_2 = c_1/c_2$: the lines are coincident — infinitely many solutions, dependent and consistent. Both equations must be in the form $ax+by+c=0$ first, with every sign carried through, and checking two ratios only is not enough — the case is decided by how many of the three actually match.",
      example:
        "$5x - 4y + 8 = 0$ and $7x + 6y - 9 = 0$: $a_1/a_2 = 5/7$, $b_1/b_2 = -4/6 = -2/3$. These are not equal, so the lines intersect at a single point — a unique solution.",
      check: {
        q: "Without drawing, determine whether $2x - 3y = 8$ and $4x - 6y = 9$ is consistent or inconsistent.",
        answer: "Inconsistent, no solution — $a_1/a_2 = b_1/b_2 = 1/2$, but $c_1/c_2 = 8/9$, which is different.",
        hint: "Write both equations as $ax+by+c=0$ first, then compare all three ratios, not just the first two.",
      },
      mistakes: [
        "Stopping after $a_1/a_2 = b_1/b_2$ and declaring the lines coincident without checking $c_1/c_2$ too.",
        "Losing a sign when moving a constant to the left, which flips $c_1/c_2$ and the whole verdict with it.",
        "Concluding 'no solution' whenever the ratios look equal, instead of checking whether all three match (coincident) or only the first two (parallel).",
      ],
      needs: ["p-form"],
      marks: "2 marks alone, or the opening step of a 3-mark consistency question",
    },
    {
      id: "c-substitution",
      title: "Substitution method",
      oneLine:
        "Solve one equation for one variable, substitute that expression into the other equation, then solve what is left.",
      brief:
        "Pick whichever equation makes isolating a variable easiest, and write that variable in terms of the other. Substitute the resulting expression into the OTHER equation — never back into the same one — which turns it into an equation in a single variable. Solve that, then substitute the value found back into either original equation to get the second variable. State both values as the final answer.",
      example:
        "$x+y=14$ and $x-y=4$. From the first, $x = 14-y$. Substituting into the second: $(14-y)-y=4 \\Rightarrow 14-2y=4 \\Rightarrow y=5$. Then $x=14-5=9$.",
      check: {
        q: "Solve by substitution: $s - t = 3$ and $\\dfrac{s}{3} + \\dfrac{t}{2} = 6$.",
        answer: "$s = 9$, $t = 6$.",
        hint: "From the first equation, $s = t + 3$. Substitute this into the second equation and clear the fractions before solving for t.",
      },
      mistakes: [
        "Substituting the expression back into the same equation it came from, which just confirms $0=0$ and finds nothing.",
        "Solving for the first variable and stopping, without substituting back for the second.",
        "Losing a sign when isolating a variable that has a negative coefficient.",
      ],
      needs: ["p-solution"],
      marks: "3 marks; the most common algebraic method this chapter is examined on",
    },
    {
      id: "c-elimination",
      title: "Elimination method",
      oneLine:
        "Scale one or both equations so a variable's coefficients match, then add or subtract to remove it.",
      brief:
        "Multiply one or both equations by suitable non-zero constants so that the coefficient of x (or of y) becomes numerically the same in both. If those matched coefficients have the SAME sign, subtract the equations to cancel that variable; if they have OPPOSITE signs, add them. Either way one variable disappears, leaving a single equation in the other — solve it, then substitute back into either original equation for the first variable.",
      example:
        "$3x+4y=10$ and $2x-2y=2$. Multiplying the second by 2 gives $4x-4y=4$. Adding this to the first: $7x=14 \\Rightarrow x=2$. Substituting back into $2x-2y=2$: $4-2y=2 \\Rightarrow y=1$.",
      check: {
        q: "Solve by elimination: $x + y = 5$ and $2x - 3y = 4$.",
        answer: "$x = \\dfrac{19}{5}$, $y = \\dfrac{6}{5}$.",
        hint: "Multiply the first equation by 3 so the y-coefficients are equal and opposite, then add the two equations.",
      },
      mistakes: [
        "Adding when the matched coefficients need subtracting, or the reverse — check the signs before combining.",
        "Multiplying only one side of an equation by the scaling constant instead of every term.",
        "Forgetting to substitute back for the second variable once the first is found.",
      ],
      needs: ["p-solution"],
      marks: "3 marks",
    },
    {
      id: "c-special-cases",
      title: "Reading off infinitely many solutions or no solution",
      oneLine:
        "If both variables cancel and a TRUE statement is left, the pair has infinitely many solutions. If a FALSE one is left, it has none.",
      brief:
        "Substitution and elimination usually end with one variable's value. Sometimes both variables cancel out instead, and what is left is a statement with no variable in it at all — and that statement itself is the answer. If it is TRUE, like $9=9$, every point on the line satisfies both equations: infinitely many solutions, a dependent pair. If it is FALSE, like $0=7$, no point can satisfy both: no solution, an inconsistent pair. Either way, do not keep solving — the statement has already answered the question.",
      example:
        "$3x-y=3$ and $9x-3y=9$. From the first, $y=3x-3$. Substituting into the second: $9x-3(3x-3)=9 \\Rightarrow 9x-9x+9=9 \\Rightarrow 9=9$, always true. The pair has infinitely many solutions.",
      check: {
        q: "Multiplying $2x - 3y = 8$ by 2 gives $4x - 6y = 16$. Subtracting $4x - 6y = 9$ from this gives what statement, and what does it say about the pair?",
        answer: "$0 = 7$, which is false — so the pair is inconsistent and has no solution.",
        hint: "Subtract the two equations with matching y-coefficients and see what is left once x and y have both cancelled.",
      },
      mistakes: [
        "Treating a false statement like $0=7$ as 'x and y both equal 0' instead of 'no solution exists'.",
        "Treating a true statement like $0=0$ as a mistake in the working, rather than infinitely many solutions.",
        "Continuing to hunt for a numeric x and y after the variables have already cancelled and the statement has answered the question.",
      ],
      needs: ["p-solution"],
      marks: "1–2 marks, usually hidden inside a substitution or elimination question rather than asked on its own",
    },
    {
      id: "c-word",
      title: "Word problems: naming the unknowns and framing both equations",
      oneLine:
        "Name the two unknowns, turn each sentence into one equation, then solve the pair by substitution or elimination.",
      brief:
        "This chapter's long question is always a word problem, and the routine does not change. Name both unknowns with letters and SAY what each stands for. Translate the FIRST sentence into one equation, and the SECOND sentence into another — independently, without solving either while framing it. Only once both equations exist, solve the pair. A common setup: a two-digit number with tens digit x and units digit y is written $10x+y$, and the number with its digits reversed is $10y+x$. Framing both equations correctly earns marks on its own, separately from whether the arithmetic that follows is right.",
      example:
        "5 pencils and 7 pens together cost Rs 50, and 7 pencils and 5 pens together cost Rs 46. With pencil cost x and pen cost y: $5x+7y=50$ and $7x+5y=46$. Solving gives $x=3, y=5$ — pencil Rs 3, pen Rs 5.",
      check: {
        q: "The sum of the digits of a two-digit number is 9. Nine times this number is twice the number obtained by reversing its digits. Find the number.",
        answer: "The number is 18.",
        hint: "Let the tens digit be x and the units digit be y, so the number is $10x+y$ and its reverse is $10y+x$. Turn each sentence into one equation in x and y.",
      },
      mistakes: [
        "Writing the reversed number as $10x+y$ again instead of $10y+x$.",
        "Solving for x and stopping, instead of using it to state the actual quantity the question asked for.",
        "Skipping the sentence that names each unknown, which costs a mark even when the equations and arithmetic are correct.",
      ],
      needs: ["p-form", "p-solution"],
      marks: "3 marks, usually the longest question from this chapter",
    },
  ],

  leadsTo: [
    {
      title: "Arithmetic Progressions",
      where: "Class 10 · Chapter 5",
      why: "Finding the first term and common difference from two given terms means writing two equations in a and d and solving them simultaneously — the same substitution and elimination used here.",
    },
    {
      title: "Determinants",
      where: "Class 12",
      why: "Cramer's rule generalises elimination into a single formula built straight from the coefficients — the a1, b1, c1 you already read off a pair of equations here become the entries of a matrix.",
    },
    {
      title: "Linear Programming",
      where: "Class 12",
      why: "The corner points of a feasible region are found by solving two constraint equations together, exactly this chapter's method, now applied to inequalities instead of a single pair.",
    },
    {
      title: "Kirchhoff's Laws",
      where: "Class 12 Physics",
      why: "Loop and junction equations in a circuit are a pair (or more) of linear equations in unknown currents, solved by elimination the way a pair of equations is solved here.",
    },
  ],
};
