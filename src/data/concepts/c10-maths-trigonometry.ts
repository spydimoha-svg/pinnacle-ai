// Class 10 Maths · Chapter 8 · Introduction to Trigonometry — the hand-authored
// concept graph.
//
// Ordered the way the rationalised NCERT chapter actually builds: which side is
// which once you pick an angle → the six ratios themselves → how the other three
// are only reciprocals → recovering every ratio from one → the exact values at
// the five special angles → sin²+cos²=1 → the two identities that fall out of it
// → proving an identity without cheating.
//
// TRIGONOMETRIC RATIOS OF COMPLEMENTARY ANGLES were deleted in the 2023
// rationalisation, so $\sin(90^\circ - A) = \cos A$ appears nowhere in this file
// and is not smuggled in through an example. The chapter now ends on identity
// manipulation, which is exactly where the board paper puts its marks.
//
// Two rules were followed in every stored answer, both of them about the app
// marking the student itself (src/lib/grade.ts) rather than asking a model:
//
//   1. The answer carries the DECISIVE value and nothing else. The grader
//      demands every number in `answer` that is not already in `q`, so an answer
//      that showed its working — "cosec²θ = 1 + cot²θ = 5" — would also demand
//      the student write the 1. A student who writes "5" is right, and the data
//      has to agree with that.
//   2. Wherever the answer is words rather than a number, it is kept short and
//      built from the words a student would actually type ("adjacent", "side"),
//      because the fallback step scores how much of the stored answer they
//      reproduced, and padding the answer with prose only lowers that score.
import type { ConceptMap } from "./types";

export const C10_MATHS_TRIGONOMETRY_MAP: ConceptMap = {
  chapterId: "c10-maths-08",
  chapterTitle: "Introduction to Trigonometry",
  classLevel: 10,
  subject: "Mathematics",
  authored: true,
  bigIdea:
    "Fix one acute angle of a right triangle and the shape of the whole triangle is fixed with it — so the ratio of any two sides depends on that angle alone and on nothing else. Write those ratios down and Pythagoras turns into $\\sin^2 A + \\cos^2 A = 1$.",

  // This chapter needs surprisingly little geometry and a surprising amount of
  // Class 9 arithmetic. When a student stalls in Chapter 8 it is almost never
  // the triangle — it is that $\left(\frac{\sqrt3}{2}\right)^2$ or
  // $1 - \cos^2\theta$ stopped them dead.
  prereqs: [
    {
      id: "p-angle-sum",
      from: "Class 9 · Lines and Angles",
      title: "The three angles of a triangle add up to $180^\\circ$",
      why: "Every ratio in this chapter is defined for an ACUTE angle inside a right-angled triangle. The angle sum is what guarantees the other two angles really are acute, and it is why $0^\\circ$ to $90^\\circ$ is the only range the chapter ever talks about.",
      probe: {
        q: "One angle of a triangle is a right angle. What do the other two angles add up to?",
        answer: "$90^\\circ$.",
      },
    },
    {
      id: "p-surds",
      from: "Class 9 · Number Systems",
      title: "Squaring and simplifying a surd",
      why: "The exact values in this chapter are nothing but surds: $\\dfrac{\\sqrt{3}}{2}$, $\\dfrac{1}{\\sqrt{2}}$, $\\sqrt{3}$. Checking $\\sin^2 A + \\cos^2 A = 1$ at $30^\\circ$ means squaring them, and a student who cannot square $\\dfrac{\\sqrt{3}}{2}$ cannot verify a single line of the chapter.",
      probe: {
        q: "What is $\\left(\\dfrac{\\sqrt{3}}{2}\\right)^2$?",
        answer: "$\\dfrac{3}{4}$.",
      },
    },
    {
      id: "p-rationalise",
      from: "Class 9 · Number Systems",
      title: "Rationalising a denominator",
      why: "$\\tan 30^\\circ$ comes out as $\\dfrac{1}{\\sqrt{3}}$ and the marked form is often $\\dfrac{\\sqrt{3}}{3}$. The same move clears the root out of answers like $\\dfrac{6}{\\sqrt{3}}$, which is how nearly every height-and-distance answer in Chapter 9 finishes.",
      probe: {
        q: "Simplify $\\dfrac{6}{\\sqrt{3}}$ so that no square root is left in the denominator.",
        answer: "$2\\sqrt{3}$.",
      },
    },
    {
      id: "p-algebra-id",
      from: "Class 9 · Polynomials",
      title: "The identity $a^2 - b^2 = (a+b)(a-b)$",
      why: "Identity proofs live on it. The moment $1 - \\cos^2\\theta$ appears you are meant to see $(1-\\cos\\theta)(1+\\cos\\theta)$ and cancel — that one step is the difference between a finished proof and a stuck one in the 3-mark question.",
      probe: {
        q: "Factorise $x^2 - 25$.",
        answer: "$(x - 5)(x + 5)$.",
      },
    },
  ],

  concepts: [
    {
      id: "c-sides",
      title: "The three sides, named from an angle",
      oneLine:
        "The hypotenuse never moves, but which side counts as 'opposite' and which as 'adjacent' depends entirely on the acute angle you have chosen to look from.",
      brief:
        "In a right-angled triangle the side facing the right angle is the HYPOTENUSE. It is the longest side and it does not care which angle you are working with. Now pick one acute angle, say $\\angle A$. The side facing $\\angle A$ — the one that does not touch it — is the side OPPOSITE to $\\angle A$ (older books call it the perpendicular). The remaining side, the one that forms $\\angle A$ together with the hypotenuse, is the side ADJACENT to $\\angle A$ (the base). Switch your attention to the other acute angle and opposite and adjacent trade places. Nothing about the triangle changed; only the angle you are standing at did. This is the single idea the rest of the chapter is built on, and it is where most wrong answers are actually born.",
      example:
        "In $\\triangle ABC$, right-angled at $B$, with $AB = 4$ cm, $BC = 3$ cm and $AC = 5$ cm: for $\\angle A$ the opposite side is $BC = 3$ cm and the adjacent side is $AB = 4$ cm. For $\\angle C$ the opposite side is $AB = 4$ cm and the adjacent side is $BC = 3$ cm. In both cases the hypotenuse is $AC = 5$ cm.",
      figure:
        '```plot\n{"shape":"right-triangle","labels":["A","B","C"],"sideLabels":["4 cm","3 cm","5 cm"],"right":1,"title":"Right-angled at B: from A, BC is opposite and AB is adjacent"}\n```',
      check: {
        q: "In $\\triangle ABC$, right-angled at $B$, the side $BC$ lies opposite angle $A$. Name $BC$ with respect to angle $C$.",
        answer: "$BC$ is the side adjacent to angle $C$.",
        hint: "Go and stand at $C$ instead of $A$. Does $BC$ touch that angle, or face it from across the triangle?",
      },
      mistakes: [
        "Locking 'opposite' and 'adjacent' onto particular letters instead of onto the angle being used — so $\\sin$ and $\\cos$ come out swapped.",
        "Calling the hypotenuse the adjacent side. The hypotenuse touches the angle too, but it is never counted as the adjacent side; it has its own name.",
      ],
      needs: ["p-angle-sum"],
      marks: "Rarely asked by itself, but it silently decides whether every other answer in the chapter is right",
    },
    {
      id: "c-ratios",
      title: "The six trigonometric ratios",
      oneLine:
        "$\\sin A = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}$, $\\cos A = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}$, $\\tan A = \\dfrac{\\text{opposite}}{\\text{adjacent}}$ — and three more that turn these upside down.",
      brief:
        "For an acute angle $A$ in a right triangle: $\\sin A = \\dfrac{\\text{opp}}{\\text{hyp}}$, $\\cos A = \\dfrac{\\text{adj}}{\\text{hyp}}$, $\\tan A = \\dfrac{\\text{opp}}{\\text{adj}}$, $\\mathrm{cosec}\\, A = \\dfrac{\\text{hyp}}{\\text{opp}}$, $\\sec A = \\dfrac{\\text{hyp}}{\\text{adj}}$, $\\cot A = \\dfrac{\\text{adj}}{\\text{opp}}$. Three things to notice straight away. (1) A ratio is a PURE NUMBER: the centimetres cancel, so no answer here ever carries a unit. (2) $\\sin$ on its own means nothing — it is always $\\sin$ OF an angle, and $\\sin A$ is not $\\sin \\times A$. (3) Because the hypotenuse is the longest side, $\\sin A$ and $\\cos A$ can never exceed $1$, while $\\sec A$ and $\\mathrm{cosec}\\, A$ can never fall below $1$. $\\tan A$ and $\\cot A$ have no such ceiling.",
      example:
        "In $\\triangle ABC$, right-angled at $B$, $AB = 24$ cm and $BC = 7$ cm, so $AC = \\sqrt{24^2 + 7^2} = 25$ cm. Then $\\sin A = \\dfrac{BC}{AC} = \\dfrac{7}{25}$, $\\cos A = \\dfrac{AB}{AC} = \\dfrac{24}{25}$ and $\\tan A = \\dfrac{BC}{AB} = \\dfrac{7}{24}$.",
      figure:
        '```plot\n{"shape":"right-triangle","labels":["A","B","C"],"sideLabels":["24 cm","7 cm","25 cm"],"right":1,"title":"From A: opposite 7, adjacent 24, hypotenuse 25"}\n```',
      check: {
        q: "In $\\triangle PQR$, right-angled at $Q$, $PQ = 3$ cm, $QR = 4$ cm and $PR = 5$ cm. Find $\\sin P$.",
        answer: "$\\sin P = \\dfrac{QR}{PR} = \\dfrac{4}{5}$.",
        hint: "Stand at $P$. Which side faces you, and which side is the hypotenuse? $\\sin$ is the first over the second.",
      },
      mistakes: [
        "Using the side that touches the angle as the 'opposite' one — the single commonest cause of a swapped $\\sin$ and $\\cos$.",
        "Leaving units in the answer: $\\dfrac{4 \\text{ cm}}{5 \\text{ cm}}$ is just $\\dfrac{4}{5}$.",
        "Writing an answer bigger than $1$ for $\\sin$ or $\\cos$ — that is a guaranteed sign the hypotenuse ended up on top.",
      ],
      needs: ["p-angle-sum"],
      marks: "1–2 marks on its own, and the opening step of most of the 3-markers",
    },
    {
      id: "c-reciprocals",
      title: "Reciprocals, and $\\tan$ as $\\sin$ over $\\cos$",
      oneLine:
        "$\\mathrm{cosec}$, $\\sec$ and $\\cot$ are only the reciprocals of $\\sin$, $\\cos$ and $\\tan$, and $\\tan A = \\dfrac{\\sin A}{\\cos A}$.",
      brief:
        "$\\mathrm{cosec}\\, A = \\dfrac{1}{\\sin A}$, $\\sec A = \\dfrac{1}{\\cos A}$, $\\cot A = \\dfrac{1}{\\tan A}$. Note the pairing that catches everyone: $\\sec$ goes with $\\cos$ and $\\mathrm{cosec}$ goes with $\\sin$ — the 'co' crosses over. Next, since $\\sin A = \\dfrac{\\text{opp}}{\\text{hyp}}$ and $\\cos A = \\dfrac{\\text{adj}}{\\text{hyp}}$, dividing one by the other cancels the hypotenuse and leaves $\\dfrac{\\sin A}{\\cos A} = \\dfrac{\\text{opp}}{\\text{adj}} = \\tan A$. In the same way $\\cot A = \\dfrac{\\cos A}{\\sin A}$. So of the six ratios only two are genuinely independent; the other four are built out of $\\sin$ and $\\cos$. That is exactly why the first move in almost every proof later in this chapter is 'convert everything to $\\sin$ and $\\cos$'.",
      example:
        "If $\\sin A = \\dfrac{7}{25}$ and $\\cos A = \\dfrac{24}{25}$, then $\\mathrm{cosec}\\, A = \\dfrac{25}{7}$, $\\sec A = \\dfrac{25}{24}$, $\\tan A = \\dfrac{7/25}{24/25} = \\dfrac{7}{24}$ and $\\cot A = \\dfrac{24}{7}$.",
      check: {
        q: "If $\\sin A = \\dfrac{3}{5}$ and $\\cos A = \\dfrac{4}{5}$, write $\\tan A$ and $\\sec A$.",
        answer: "$\\tan A = \\dfrac{3}{4}$ and $\\sec A = \\dfrac{5}{4}$.",
        hint: "One of them is a division of the two ratios you were given; the other is one of them flipped over. Decide which ratio $\\sec$ belongs to first.",
      },
      mistakes: [
        "Pairing $\\sec$ with $\\sin$ and $\\mathrm{cosec}$ with $\\cos$. It is the other way round, and the MCQ in the paper is usually built on precisely this slip.",
        "Writing $\\cot A = \\dfrac{\\sin A}{\\cos A}$. $\\cot$ is $\\cos$ over $\\sin$ — the reciprocal of $\\tan$.",
      ],
      marks: "1 mark, usually as an MCQ",
    },
    {
      id: "c-one-to-all",
      title: "From one ratio to all the others",
      oneLine:
        "A single trigonometric ratio fixes the shape of the triangle, so from it you can recover every other ratio using Pythagoras.",
      brief:
        "Told that $\\sin A = \\dfrac{8}{17}$, treat the $8$ and the $17$ as real lengths: the side opposite $A$ is $8k$ and the hypotenuse is $17k$ for some $k > 0$. Pythagoras gives the third side, and then every ratio can be read straight off the triangle. The $k$ cancels out of each one, and that cancellation is the whole point of the chapter: enlarging the triangle changes the lengths but not the ratios, because a triangle with the same acute angle is a SIMILAR triangle and its sides stay in the same proportion. So a trigonometric ratio depends on the angle and on nothing else — not on how big you drew the picture.",
      example:
        "Given $\\sin A = \\dfrac{8}{17}$: opposite $= 8k$, hypotenuse $= 17k$, so adjacent $= \\sqrt{289k^2 - 64k^2} = 15k$. Hence $\\cos A = \\dfrac{15}{17}$, $\\tan A = \\dfrac{8}{15}$, $\\cot A = \\dfrac{15}{8}$, $\\sec A = \\dfrac{17}{15}$ and $\\mathrm{cosec}\\, A = \\dfrac{17}{8}$.",
      figure:
        '```plot\n{"shape":"right-triangle","labels":["A","B","C"],"sideLabels":["15","8","17"],"right":1,"title":"sin A = 8/17 forces the third side to be 15"}\n```',
      check: {
        q: "If $\\cos A = \\dfrac{5}{13}$, find $\\sin A$.",
        answer: "$\\sin A = \\dfrac{12}{13}$.",
        hint: "$\\cos$ tells you the adjacent side and the hypotenuse. Get the third side from Pythagoras before you write anything down.",
      },
      mistakes: [
        "Reading $\\cos A = \\dfrac{5}{13}$ as 'opposite is 5' — $\\cos$ hands you the ADJACENT side.",
        "Adding instead of subtracting inside the square root. The hypotenuse is the longest side, so the third side comes from $\\text{hyp}^2 - \\text{known}^2$.",
        "Worrying that the answer depends on the actual size of the triangle. It does not; the $k$ always cancels.",
      ],
      needs: ["p-surds"],
      marks: "2–3 marks — 'if $\\sin A = \\dots$, find $\\dots$' is a fixture of the paper",
    },
    {
      id: "c-specific",
      title: "The exact ratios of $0^\\circ$, $30^\\circ$, $45^\\circ$, $60^\\circ$ and $90^\\circ$",
      oneLine:
        "Five angles have exact values worth knowing cold, and the whole table is really one row read forwards and backwards.",
      brief:
        "For $0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$ in that order: $\\sin$ runs $0$, $\\dfrac{1}{2}$, $\\dfrac{1}{\\sqrt{2}}$, $\\dfrac{\\sqrt{3}}{2}$, $1$. $\\cos$ is the same list read backwards: $1$, $\\dfrac{\\sqrt{3}}{2}$, $\\dfrac{1}{\\sqrt{2}}$, $\\dfrac{1}{2}$, $0$. Divide to get $\\tan$: $0$, $\\dfrac{1}{\\sqrt{3}}$, $1$, $\\sqrt{3}$, and NOT DEFINED at $90^\\circ$ because $\\cos 90^\\circ = 0$. The reciprocals follow, and they are undefined wherever the ratio underneath them is zero: $\\mathrm{cosec}\\, 0^\\circ$, $\\cot 0^\\circ$, $\\sec 90^\\circ$ are all not defined. Do not memorise this as ten unrelated facts. The $\\sin$ row is $\\dfrac{\\sqrt{0}}{2}, \\dfrac{\\sqrt{1}}{2}, \\dfrac{\\sqrt{2}}{2}, \\dfrac{\\sqrt{3}}{2}, \\dfrac{\\sqrt{4}}{2}$ — one pattern, and $\\cos$ is it reversed.",
      example:
        "Where the values come from. A right triangle with both legs $1$ has hypotenuse $\\sqrt{2}$ and both acute angles $45^\\circ$, so $\\sin 45^\\circ = \\dfrac{1}{\\sqrt{2}}$. An equilateral triangle of side $2$ cut down its middle gives a right triangle with sides $1$, $\\sqrt{3}$, $2$ and angles $30^\\circ$ and $60^\\circ$, so $\\sin 30^\\circ = \\dfrac{1}{2}$ and $\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$.",
      check: {
        q: "Find the value of $\\sin 60^\\circ \\cos 30^\\circ + \\cos 60^\\circ \\sin 30^\\circ$.",
        answer: "$1$ — the two products come to three-quarters and one-quarter.",
        hint: "Replace each of the four ratios by its exact value from the table, multiply the pairs, then add. Nothing else is needed.",
      },
      mistakes: [
        "Mixing up $\\tan 30^\\circ = \\dfrac{1}{\\sqrt{3}}$ with $\\cot 30^\\circ = \\sqrt{3}$ — the classic MCQ trap.",
        "Writing $\\tan 90^\\circ = \\infty$. The expected words are 'not defined'.",
        "Squaring wrongly: $\\left(\\dfrac{\\sqrt{3}}{2}\\right)^2$ is $\\dfrac{3}{4}$, not $\\dfrac{\\sqrt{3}}{4}$.",
      ],
      needs: ["p-surds", "p-rationalise"],
      marks: "2 marks; an 'evaluate this expression' question appears nearly every year",
    },
    {
      id: "c-identity-1",
      title: "The first identity: $\\sin^2 A + \\cos^2 A = 1$",
      oneLine:
        "$\\sin^2 A + \\cos^2 A = 1$ for every angle $A$ from $0^\\circ$ to $90^\\circ$ — it is Pythagoras, rewritten in ratios.",
      brief:
        "Take a right triangle with opposite $a$, adjacent $b$ and hypotenuse $c$. Pythagoras says $a^2 + b^2 = c^2$. Divide every term by $c^2$: $\\dfrac{a^2}{c^2} + \\dfrac{b^2}{c^2} = 1$, which is $\\sin^2 A + \\cos^2 A = 1$. Nothing new was assumed — the identity IS the Pythagoras theorem wearing different clothes, which is why it holds for every $A$ in $0^\\circ \\le A \\le 90^\\circ$ and not just for a few. That universality is what makes it an identity rather than an equation to be solved. The two rearrangements you will use constantly are $\\sin^2 A = 1 - \\cos^2 A$ and $\\cos^2 A = 1 - \\sin^2 A$. On notation: $\\sin^2 A$ means $(\\sin A)^2$, never $\\sin(A^2)$.",
      example:
        "Check it at $30^\\circ$: $\\sin^2 30^\\circ + \\cos^2 30^\\circ = \\left(\\dfrac{1}{2}\\right)^2 + \\left(\\dfrac{\\sqrt{3}}{2}\\right)^2 = \\dfrac{1}{4} + \\dfrac{3}{4} = 1$. Check it at $45^\\circ$: $\\dfrac{1}{2} + \\dfrac{1}{2} = 1$. It never fails, which is the whole meaning of the word identity.",
      check: {
        q: "If $\\sin\\theta = \\dfrac{1}{2}$, what is the value of $\\sin^2\\theta + \\cos^2\\theta$?",
        answer: "$1$ — the identity holds for every angle, whatever $\\sin\\theta$ happens to be.",
        hint: "You are allowed to work out $\\cos\\theta$ and grind it out, but read the identity again first and ask whether the value of $\\theta$ can change the total.",
      },
      mistakes: [
        "Reading $\\sin^2 A$ as $\\sin(A^2)$ and trying to square the angle.",
        "Writing $\\sin A + \\cos A = 1$. It is the SQUARES that add to one; $\\sin 30^\\circ + \\cos 30^\\circ$ is not $1$.",
        "Treating it as an equation to solve for $A$. It is true for every $A$, so there is nothing to solve.",
      ],
      needs: ["p-surds"],
      marks: "1–2 marks alone, and a step inside almost every 3-marker in the chapter",
    },
    {
      id: "c-identity-2",
      title: "The other two identities, and where they come from",
      oneLine:
        "Divide $\\sin^2 A + \\cos^2 A = 1$ by $\\cos^2 A$ to get $1 + \\tan^2 A = \\sec^2 A$; divide it by $\\sin^2 A$ to get $1 + \\cot^2 A = \\mathrm{cosec}^2 A$.",
      brief:
        "These are not two more facts to memorise; they are the first identity divided through. Dividing $\\sin^2 A + \\cos^2 A = 1$ by $\\cos^2 A$ gives $\\tan^2 A + 1 = \\sec^2 A$, true for every $A$ except $90^\\circ$, where $\\cos A = 0$ and the division is illegal. Dividing instead by $\\sin^2 A$ gives $1 + \\cot^2 A = \\mathrm{cosec}^2 A$, true for every $A$ except $0^\\circ$. Fix the pairing in your head: $\\tan$ lives with $\\sec$, $\\cot$ lives with $\\mathrm{cosec}$ — the same 'co' pairing as the reciprocals. The forms you will actually reach for in a proof are the rearranged ones: $\\sec^2 A - \\tan^2 A = 1$ and $\\mathrm{cosec}^2 A - \\cot^2 A = 1$.",
      example:
        "If $\\tan A = \\dfrac{3}{4}$, then $\\sec^2 A = 1 + \\dfrac{9}{16} = \\dfrac{25}{16}$, so $\\sec A = \\dfrac{5}{4}$ — taking the positive root, since $A$ is acute and every ratio of an acute angle is positive.",
      check: {
        q: "If $\\cot\\theta = 2$, find $\\mathrm{cosec}^2\\theta$.",
        answer: "$\\mathrm{cosec}^2\\theta = 5$.",
        hint: "$\\cot$ pairs with $\\mathrm{cosec}$. Write down the identity that contains both of them, then substitute — no triangle needed.",
      },
      mistakes: [
        "Pairing $\\tan$ with $\\mathrm{cosec}$ or $\\cot$ with $\\sec$, which produces an identity that is simply false.",
        "Writing $\\sec^2 A = \\tan^2 A - 1$. $\\sec$ is the bigger one, so the $1$ is added to $\\tan^2 A$, and $\\sec^2 A - \\tan^2 A = 1$.",
        "Forgetting to square: from $\\mathrm{cosec}^2\\theta = 5$ the ratio itself is $\\sqrt{5}$, not $5$.",
      ],
      needs: ["p-algebra-id"],
      marks: "2–3 marks",
    },
    {
      id: "c-prove",
      title: "Proving an identity",
      oneLine:
        "Start on the messier side and work it down to the other side — never operate on both sides at once.",
      brief:
        "An identity is PROVED, not solved, and the method carries the marks. (1) Choose ONE side, normally the more complicated one, and transform only that side until it becomes the other. (2) The first move that nearly always helps is converting everything into $\\sin$ and $\\cos$. (3) Then use the tools you have: $\\sin^2 + \\cos^2 = 1$ to trade one for the other, $a^2 - b^2 = (a+b)(a-b)$ to factorise something like $1 - \\cos^2\\theta$, or an LCM to combine two fractions. (4) Close with '$=$ RHS, hence proved'. What throws the marks away: cross-multiplying across the equals sign, or squaring both sides — both assume the two sides are already equal, which is the very thing you were asked to establish.",
      example:
        "Prove $(\\mathrm{cosec}\\,\\theta - \\cot\\theta)^2 = \\dfrac{1 - \\cos\\theta}{1 + \\cos\\theta}$. Taking the LHS, the messier side: $\\left(\\dfrac{1}{\\sin\\theta} - \\dfrac{\\cos\\theta}{\\sin\\theta}\\right)^2 = \\dfrac{(1-\\cos\\theta)^2}{\\sin^2\\theta} = \\dfrac{(1-\\cos\\theta)^2}{1-\\cos^2\\theta} = \\dfrac{(1-\\cos\\theta)^2}{(1-\\cos\\theta)(1+\\cos\\theta)} = \\dfrac{1-\\cos\\theta}{1+\\cos\\theta} = $ RHS. Hence proved.",
      check: {
        q: "In a proof you reach $\\dfrac{\\mathrm{cosec}^2\\theta - \\cot^2\\theta}{\\sin^2\\theta + \\cos^2\\theta}$. What does it simplify to?",
        answer: "$1$, because the top and the bottom are each equal to $1$.",
        hint: "Look at the numerator and the denominator separately. Each of them is an identity you already know, written out in full.",
      },
      mistakes: [
        "Working on both sides at the same time and meeting in the middle. It looks convincing and earns almost nothing.",
        "Cross-multiplying to clear the fractions — that uses the result before it has been proved.",
        "Stopping one line early. The final '$=$ RHS, hence proved' is a mark on its own.",
      ],
      needs: ["p-algebra-id"],
      marks: "3 marks — the identity proof is the recurring long question in this chapter",
    },
  ],

  leadsTo: [
    {
      title: "Some Applications of Trigonometry",
      where: "Class 10 · Chapter 9",
      why: "The very next chapter, and it adds almost no new theory. A height-and-distance problem is one right triangle, one angle of elevation taken from the table you learnt here, and one ratio chosen because it links the side you know to the side you want.",
    },
    {
      title: "Trigonometric Functions",
      where: "Class 11",
      why: "Angles walk off the triangle: past $90^\\circ$, into negatives, measured in radians and read off a unit circle. $\\sin$ and $\\cos$ stop being side ratios and become functions of any real number — but $\\sin^2 + \\cos^2 = 1$ survives that move completely untouched.",
    },
    {
      title: "Straight Lines",
      where: "Class 11",
      why: "The slope of a line is defined as $\\tan\\theta$, where $\\theta$ is the angle the line makes with the x-axis. 'Rise over run' and 'opposite over adjacent' are the same fraction.",
    },
    {
      title: "Motion in a Plane — resolving vectors",
      where: "Class 11 Physics",
      why: "Splitting a force or a velocity into horizontal and vertical parts is exactly $F\\cos\\theta$ and $F\\sin\\theta$. A large part of Class 11 mechanics is this chapter applied to arrows instead of triangles.",
    },
  ],
};
