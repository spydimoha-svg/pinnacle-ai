// Class 10 Maths · Chapter 6 · Triangles — the hand-authored concept graph.
//
// Ordered the way the rationalised NCERT chapter actually builds: what "similar"
// means for any figure → what it means precisely, with BOTH conditions and the
// letter order that carries them → the Basic Proportionality Theorem → its
// converse → the three similarity criteria (AA, SSS, SAS) → and finally the
// scale factor put to work measuring something nobody can reach with a tape.
//
// One warning worth writing down, because it decides what is NOT in this file.
// The 2023 rationalisation cut three famous results out of this chapter: the
// ratio of the areas of two similar triangles, Pythagoras' theorem, and the
// converse of Pythagoras. They are gone from the syllabus, so they are gone from
// here. A tutor that teaches them is spending a student's evening on marks that
// no longer exist. What is left is exactly five examinable results — BPT, its
// converse, AAA/AA, SSS and SAS — and this file is those five plus the language
// needed to state them.
//
// Every check question below has a stored answer, and the app marks against it
// without asking a model. So the answers are written so that the number a
// correct student actually writes is the number sitting in the answer, and no
// stray working number is smuggled in beside it.
import type { ConceptMap } from "./types";

export const C10_MATHS_TRIANGLES_MAP: ConceptMap = {
  chapterId: "c10-maths-06",
  chapterTitle: "Triangles",
  classLevel: 10,
  subject: "Mathematics",
  authored: true,
  bigIdea:
    "Two triangles of the same shape share a single number — the scale factor — and once you have earned the right to use it, every corresponding length in the two triangles is locked to every other. The chapter is about earning that right: three ways to prove the shapes match, and what a line drawn parallel to one side does to the other two.",

  // The four things Class 9 has to have left behind. Congruence supplies the
  // language, Lines and Angles supplies almost every pair of equal angles the
  // chapter ever uses, the Mid-point Theorem is the Basic Proportionality
  // Theorem in disguise, and the area formula is the engine of its proof.
  prereqs: [
    {
      id: "p-congruent",
      from: "Class 9 · Triangles",
      title: "Congruent triangles, and what the order of the letters means",
      why: "Similarity is congruence with the 'same size' condition dropped, and it inherits the same rule about letter order: in $\\triangle ABC \\sim \\triangle PQR$, A goes with P, B with Q, C with R. A student who reads the correspondence loosely pairs the wrong sides and gets every ratio in this chapter upside down.",
      probe: {
        q: "In $\\triangle ABC \\cong \\triangle PQR$, $AB = 5$ cm and $BC = 6$ cm. What is $PQ + QR$?",
        answer: "$PQ = AB = 5$ cm and $QR = BC = 6$ cm, so $PQ + QR = 11$ cm.",
      },
    },
    {
      id: "p-angles",
      from: "Class 9 · Lines and Angles",
      title: "The angle sum of a triangle, and the angles a transversal makes with parallel lines",
      why: "Both facts run this chapter. Equal angles nearly always arrive from a transversal cutting a pair of parallel lines — corresponding angles equal, alternate angles equal — and the AA criterion needs only TWO pairs of equal angles because the angle sum hands you the third for free.",
      probe: {
        q: "In $\\triangle ABC$, $\\angle A = 65^\\circ$ and $\\angle B = 55^\\circ$. What is $\\angle C$?",
        answer: "$\\angle C = 60^\\circ$.",
      },
    },
    {
      id: "p-midpoint",
      from: "Class 9 · Quadrilaterals",
      title: "The Mid-point Theorem",
      why: "The segment joining the mid-points of two sides is parallel to the third side and half its length. That is the Basic Proportionality Theorem in the one case where the ratio is $1:1$. Seeing it that way turns the new theorem into a generalisation of something already known, instead of one more rule to memorise.",
      probe: {
        q: "In $\\triangle ABC$, $D$ and $E$ are the mid-points of $AB$ and $AC$. If $BC = 14$ cm, how long is $DE$?",
        answer: "$DE = 7$ cm.",
      },
    },
    {
      id: "p-area",
      from: "Class 9 · Heron's Formula",
      title: "The area of a triangle from its base and height",
      why: "NCERT proves the Basic Proportionality Theorem by comparing two triangles that stand on the same line and therefore have the same height, so their areas are in the ratio of their bases. If $\\text{area} = \\dfrac{1}{2} \\times \\text{base} \\times \\text{height}$ is not automatic, that proof is unreadable.",
      probe: {
        q: "A triangle has base $8$ cm and height $5$ cm. What is its area?",
        answer: "Area $=$ half of $8 \\times 5 = 20$ square cm.",
      },
    },
  ],

  // Eight ideas. The first two are language — get them wrong and every later
  // ratio is written down back to front. The middle two are the parallel-line
  // theorem and its converse. The last four are the tools the board paper
  // actually asks for.
  concepts: [
    {
      id: "c-similar-figures",
      title: "Similar figures: the same shape, any size",
      oneLine:
        "Two figures are similar when they have exactly the same shape, whether or not they have the same size.",
      brief:
        "Congruent means same shape AND same size; similar means same shape, size free. So every pair of congruent figures is similar — congruence is just the case where the scale factor is 1 — but not the other way round. Some families are always similar to one another: any two circles, any two squares, any two equilateral triangles, because their shape is fixed by their definition and only the size is left to choose. Other families are not: two rectangles, two isosceles triangles and two rhombuses can be quite different shapes. A photograph enlarged, a map, a scale model — all similar to the original.",
      example:
        "A circle of radius $3$ cm and a circle of radius $7$ cm are similar; so are a $3$ cm square and a $7$ cm square. But a $3$ cm by $7$ cm rectangle and a $3$ cm by $4$ cm rectangle are not similar, even though both are rectangles.",
      check: {
        q: "Are all rectangles similar to one another? Say yes or no, and why.",
        answer:
          "No. All rectangles have four right angles, but their sides need not be in the same ratio, so two rectangles need not be the same shape.",
        hint: "Both conditions have to hold. The angles are certainly fine — check whether the sides are forced to be in the same ratio.",
      },
      mistakes: [
        "Treating 'similar' as a loose word meaning 'a bit alike'. In geometry it is exact: same shape, and nothing else assumed.",
        "Saying similar figures cannot be congruent. Congruent figures are similar, with scale factor 1.",
      ],
      needs: ["p-congruent"],
      marks: "1 mark, usually an MCQ or an assertion-reason",
    },
    {
      id: "c-similar-polygons",
      title: "What similarity means precisely, and what the letters are telling you",
      oneLine:
        "Two polygons are similar when their corresponding angles are equal AND their corresponding sides are in the same ratio — both, not either.",
      brief:
        "Write it as $\\triangle ABC \\sim \\triangle PQR$. The order of the letters IS the correspondence: A with P, B with Q, C with R. That single convention tells you $\\angle A = \\angle P$, $\\angle B = \\angle Q$, $\\angle C = \\angle R$, and $\\dfrac{AB}{PQ} = \\dfrac{BC}{QR} = \\dfrac{CA}{RP}$. The common value of those three ratios is the scale factor. Both conditions are genuinely needed for polygons: a square and a rectangle have all angles equal but sides not proportional, while a square and a rhombus have sides proportional but angles unequal. Neither pair is similar. Triangles are the lucky case — for them each condition forces the other, which is exactly what the criteria later in the chapter say.",
      example:
        "If $\\triangle ABC \\sim \\triangle PQR$ with $AB = 6$ cm and $PQ = 9$ cm, the scale factor is $\\dfrac{6}{9} = \\dfrac{2}{3}$, so $BC$ is $\\dfrac{2}{3}$ of $QR$ and $CA$ is $\\dfrac{2}{3}$ of $RP$ — the same fraction every time.",
      check: {
        q: "If $\\triangle ABC \\sim \\triangle PQR$, is $\\dfrac{AB}{QR}$ one of the equal ratios? Say yes or no, and why.",
        answer:
          "No. The order of the letters pairs $A$ with $P$, $B$ with $Q$ and $C$ with $R$, so $AB$ corresponds to $PQ$; the equal ratios are $\\dfrac{AB}{PQ} = \\dfrac{BC}{QR} = \\dfrac{CA}{RP}$.",
        hint: "Read the two names in step, first letter against first letter. Which side of the second triangle sits opposite $AB$?",
      },
      mistakes: [
        "Pairing sides by how they look in the diagram instead of by the order of the letters in the similarity statement.",
        "Writing one ratio the right way up and the next one inverted, so the scale factor changes halfway through the solution.",
        "Claiming two polygons are similar on the strength of equal angles alone — true for triangles, false for polygons in general.",
      ],
      needs: ["p-congruent"],
      marks: "1 mark on its own, but it decides whether the 3-mark questions come out",
    },
    {
      id: "c-bpt",
      title: "The Basic Proportionality Theorem (Thales' theorem)",
      oneLine:
        "A line drawn parallel to one side of a triangle cuts the other two sides in the same ratio.",
      brief:
        "In $\\triangle ABC$, let $D$ lie on $AB$ and $E$ on $AC$ with $DE \\parallel BC$. Then $\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$. The proof is on the syllabus, and it is an area argument: join $BE$ and $CD$. Triangles $ADE$ and $BDE$ have the same height measured from $E$, so $\\dfrac{\\text{ar}(ADE)}{\\text{ar}(BDE)} = \\dfrac{AD}{DB}$; triangles $ADE$ and $DEC$ have the same height measured from $D$, so $\\dfrac{\\text{ar}(ADE)}{\\text{ar}(DEC)} = \\dfrac{AE}{EC}$. But $\\triangle BDE$ and $\\triangle DEC$ stand on the same base $DE$ and between the same parallels $DE$ and $BC$, so their areas are equal — which makes the two ratios equal. The result also comes in the part-to-whole forms $\\dfrac{AD}{AB} = \\dfrac{AE}{AC}$ and $\\dfrac{AB}{DB} = \\dfrac{AC}{EC}$; all three are the same theorem, and you must use the SAME form on both sides of the equation.",
      example:
        "In $\\triangle ABC$ with $DE \\parallel BC$: if $AD = 2$ cm, $DB = 3$ cm and $AE = 4$ cm, then $\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$ gives $\\dfrac{2}{3} = \\dfrac{4}{EC}$, so $EC = 6$ cm.",
      check: {
        q: "In $\\triangle ABC$, $DE \\parallel BC$ with $D$ on $AB$ and $E$ on $AC$. If $AD = 3$ cm, $DB = 5$ cm and $AE = 6$ cm, find $EC$.",
        answer: "$\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$, so $EC = 10$ cm.",
        hint: "The parallel line splits $AB$ and $AC$ in the same ratio. Write that ratio for both sides and cross-multiply.",
      },
      mistakes: [
        "Mixing the forms: using $\\dfrac{AD}{DB}$ on one side and $\\dfrac{AE}{AC}$ on the other.",
        "Treating $DB$ as the whole side $AB$. $DB$ is the leftover piece, $AB = AD + DB$.",
        "Applying the theorem when the line is not parallel to a side — no parallel, no theorem.",
      ],
      needs: ["p-area", "p-angles", "p-midpoint"],
      marks: "2–3 marks; the statement-and-proof version is a standard 3-mark question",
    },
    {
      id: "c-bpt-converse",
      title: "The converse: equal ratios prove the line is parallel",
      oneLine:
        "If a line divides two sides of a triangle in the same ratio, then that line is parallel to the third side.",
      brief:
        "Run the theorem backwards. If $D$ lies on $AB$, $E$ lies on $AC$ and $\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$, you may conclude $DE \\parallel BC$. This is the only tool the chapter gives you for PROVING two lines parallel, so any question that ends 'show that $DE \\parallel BC$' is asking for this. The working is always the same three steps: compute the first ratio in lowest terms, compute the second in lowest terms, and say they are equal. Note that the Mid-point Theorem from Class 9 is just this converse with both ratios equal to $1:1$.",
      example:
        "$AD = 2$ cm, $DB = 3$ cm, $AE = 4$ cm, $EC = 6$ cm. Then $\\dfrac{AD}{DB} = \\dfrac{2}{3}$ and $\\dfrac{AE}{EC} = \\dfrac{4}{6} = \\dfrac{2}{3}$. The ratios agree, so $DE \\parallel BC$.",
      check: {
        q: "In $\\triangle PQR$, $S$ lies on $PQ$ and $T$ lies on $PR$, with $PS = 4$ cm, $SQ = 6$ cm, $PT = 6$ cm and $TR = 9$ cm. Is $ST$ parallel to $QR$? Say yes or no, and why.",
        answer:
          "Yes. $PS : SQ = 4 : 6 = 2 : 3$ and $PT : TR = 6 : 9 = 2 : 3$, so the two ratios are equal and $ST$ is parallel to $QR$ by the converse of the Basic Proportionality Theorem.",
        hint: "Work out both ratios in their lowest terms and compare them. Equal ratios are what the converse needs.",
      },
      mistakes: [
        "Comparing $PS : PT$ instead of $PS : SQ$ — pairing the two triangles' sides across each other rather than along each side.",
        "Stopping at 'the ratios are equal' without naming the converse of the Basic Proportionality Theorem, which is where the reasoning mark sits.",
        "Using the theorem itself when the parallel is what you were asked to prove — that is assuming the answer.",
      ],
      needs: ["p-midpoint"],
      marks: "2 marks",
    },
    {
      id: "c-aa",
      title: "The AA (AAA) criterion",
      oneLine:
        "If two angles of one triangle are equal to two angles of another, the triangles are similar.",
      brief:
        "The full statement is AAA: if the corresponding angles of two triangles are equal, their corresponding sides are automatically in the same ratio, so the triangles are similar. In practice you only ever check two pairs, because the angle sum forces the third — that is why everyone calls it AA. This is the criterion most questions use, and the equal angles almost always come from one of three places: a pair of parallel lines (corresponding or alternate angles), two lines crossing (vertically opposite angles), or an angle the two triangles simply share. Once similarity is established you may write down the side ratios and use them to find a missing length.",
      example:
        "In $\\triangle ABC$, $DE \\parallel BC$ with $D$ on $AB$ and $E$ on $AC$. Then $\\angle A$ is common to $\\triangle ADE$ and $\\triangle ABC$, and $\\angle ADE = \\angle ABC$ because they are corresponding angles on the parallels. Two pairs, so $\\triangle ADE \\sim \\triangle ABC$ by AA.",
      check: {
        q: "In $\\triangle ABC$ and $\\triangle PQR$, $\\angle A = \\angle P$ and $\\angle B = \\angle Q$. If $AB = 4$ cm, $BC = 5$ cm and $PQ = 12$ cm, find $QR$.",
        answer:
          "The triangles are similar by AA, so $\\dfrac{AB}{PQ} = \\dfrac{BC}{QR}$ and $QR = 15$ cm.",
        hint: "Two equal angles are enough to make the triangles similar. Then pair the sides by the letter order and set the two ratios equal.",
      },
      mistakes: [
        "Hunting for a third pair of equal angles before daring to use the criterion — the angle sum has already given it to you.",
        "Establishing similarity correctly and then pairing $BC$ with $PQ$ instead of $QR$.",
        "Assuming equal angles make the triangles congruent. Same shape, not same size.",
      ],
      needs: ["p-angles"],
      marks: "3 marks; by far the most used criterion in the paper",
    },
    {
      id: "c-sss",
      title: "The SSS criterion for similarity",
      oneLine:
        "If all three pairs of corresponding sides are in the same ratio, the triangles are similar.",
      brief:
        "If $\\dfrac{AB}{PQ} = \\dfrac{BC}{QR} = \\dfrac{CA}{RP}$, then $\\triangle ABC \\sim \\triangle PQR$, and the corresponding angles are then equal automatically. Two points of care. First, this is a RATIO criterion, unlike SSS congruence in Class 9 where the sides had to be equal; a ratio of 1 is the congruent case. Second, you must pair the sides correctly before dividing — the safe method is to sort each triangle's sides and match longest with longest, shortest with shortest. All three ratios have to reduce to the same number; two out of three proves nothing.",
      example:
        "$\\triangle ABC$ with sides $3$, $4$, $6$ and $\\triangle PQR$ with sides $9$, $12$, $18$: the ratios are $\\dfrac{3}{9}$, $\\dfrac{4}{12}$ and $\\dfrac{6}{18}$, and all three come to $\\dfrac{1}{3}$, so the triangles are similar.",
      check: {
        q: "In $\\triangle ABC$, $AB = 4$ cm, $BC = 5$ cm and $CA = 6$ cm. In $\\triangle PQR$, $PQ = 8$ cm, $QR = 10$ cm and $RP = 12$ cm. Are the two triangles similar? Say yes or no, and why.",
        answer:
          "Yes. $\\dfrac{AB}{PQ} = \\dfrac{BC}{QR} = \\dfrac{CA}{RP} = \\dfrac{1}{2}$, so all three pairs of sides are in the same ratio and the triangles are similar by SSS.",
        hint: "Divide each side of the first triangle by the side it corresponds to in the second, and see whether the three answers agree.",
      },
      mistakes: [
        "Subtracting the sides instead of dividing them — a constant difference is not similarity.",
        "Checking only two of the three ratios and declaring the triangles similar.",
        "Matching the sides in the order they were listed rather than by size, so a genuinely similar pair looks wrong.",
      ],
      needs: ["p-congruent"],
      marks: "1–2 marks",
    },
    {
      id: "c-sas",
      title: "The SAS criterion, and the word 'included'",
      oneLine:
        "If one angle of a triangle equals one angle of another and the sides containing those angles are in the same ratio, the triangles are similar.",
      brief:
        "The condition is $\\angle A = \\angle P$ together with $\\dfrac{AB}{PQ} = \\dfrac{AC}{PR}$ — and notice which sides those are. $AB$ and $AC$ are the two sides that meet at $A$, so $\\angle A$ is the angle INCLUDED between them. If the equal angle is not the included one, the criterion does not apply and the triangles need not be similar; this is the same trap as SAS congruence in Class 9. So the routine is: identify the equal angle first, then take the two sides that form it, then check their ratio against the matching pair in the other triangle.",
      example:
        "$\\angle A = \\angle P = 50^\\circ$, $AB = 4$ cm, $AC = 6$ cm, $PQ = 6$ cm, $PR = 9$ cm. Then $\\dfrac{AB}{PQ} = \\dfrac{4}{6} = \\dfrac{2}{3}$ and $\\dfrac{AC}{PR} = \\dfrac{6}{9} = \\dfrac{2}{3}$, and $\\angle A$ sits between $AB$ and $AC$, so $\\triangle ABC \\sim \\triangle PQR$ by SAS.",
      check: {
        q: "In $\\triangle ABC$ and $\\triangle PQR$, $\\dfrac{AB}{PQ} = \\dfrac{AC}{PR}$ and $\\angle B = \\angle Q$. Does the SAS criterion prove the two triangles similar? Say yes or no, and why.",
        answer:
          "No. The equal angle must be the one included between the two proportional sides. $AB$ and $AC$ include $\\angle A$, so SAS needs $\\angle A = \\angle P$, not $\\angle B = \\angle Q$.",
        hint: "Look at which two sides are in the ratio, and ask which angle sits between them.",
      },
      mistakes: [
        "Using any equal angle at all, rather than the one enclosed by the two proportional sides.",
        "Taking sides that do not meet at the marked angle, for instance $AB$ and $BC$ for $\\angle A$.",
        "Forgetting that SAS similarity needs a RATIO of sides, and looking for equal lengths instead.",
      ],
      needs: ["p-congruent"],
      marks: "2–3 marks",
    },
    {
      id: "c-apply",
      title: "Putting the scale factor to work",
      oneLine:
        "Once two triangles are similar, every pair of corresponding lengths shares the one scale factor — which lets you measure things you cannot reach.",
      brief:
        "If $\\triangle ABC \\sim \\triangle PQR$ with scale factor $k$, then $k$ is not just the ratio of the sides: the corresponding altitudes are in the ratio $k$, the corresponding medians are in the ratio $k$, and the perimeters are in the ratio $k$ too, because a perimeter is only a sum of sides each multiplied by $k$. The classic use is measuring height by shadow. At one moment of the day the sun's rays arrive at the same angle everywhere, and a pole and a tower both stand vertically, so the pole-and-shadow triangle and the tower-and-shadow triangle have two equal angles and are similar by AA. That gives $\\dfrac{\\text{height}}{\\text{shadow}}$ the same value for both, and the unreachable height falls out of a ratio.",
      example:
        "A $3$ m pole casts a $4$ m shadow, so the sun's ray from the tip of the pole to the tip of the shadow is $5$ m. At the same moment a tower casts a $20$ m shadow. Since $\\dfrac{\\text{height}}{\\text{shadow}}$ is the same for both, the tower's height is $15$ m.",
      figure:
        '```plot\n{"shape":"right-triangle","labels":["A","B","C"],"sideLabels":["4 m","3 m","sun\'s ray"],"right":1,"title":"A 3 m pole BC standing on its 4 m shadow AB"}\n```',
      check: {
        q: "A vertical pole $6$ m tall casts a shadow $4$ m long on the ground. At the same time a tower casts a shadow $28$ m long. How tall is the tower?",
        answer:
          "The pole and the tower each make a similar right triangle with its own shadow, so height and shadow are in the same ratio for both, and the tower is $42$ m tall.",
        hint: "The two triangles are similar, so height divided by shadow is the same number for the pole and for the tower.",
      },
      mistakes: [
        "Setting up $\\dfrac{\\text{pole}}{\\text{tower}} = \\dfrac{\\text{tower's shadow}}{\\text{pole's shadow}}$ — one of the two fractions has been inverted.",
        "Adding the shadow to the height somewhere, instead of keeping the two triangles' measurements on their own sides of the ratio.",
        "Believing the ratio only applies to sides, and re-deriving it from scratch when a question asks about perimeters or medians.",
      ],
      needs: ["p-angles"],
      marks: "3 marks",
    },
  ],

  leadsTo: [
    {
      title: "Introduction to Trigonometry",
      where: "Class 10 · Chapter 8",
      why: "$\\sin \\theta$ is defined as a ratio of two sides of a right triangle — but which right triangle? It does not matter, and AA is the reason: every right triangle containing the angle $\\theta$ is similar to every other, so the ratio depends on the angle alone. Without this chapter, trigonometry would not even be well defined.",
    },
    {
      title: "Coordinate Geometry",
      where: "Class 10 · Chapter 7",
      why: "The section formula is derived by dropping perpendiculars to the x-axis and reading off two similar triangles. The ratio $m_1 : m_2$ in that formula is a Basic Proportionality Theorem ratio wearing coordinates.",
    },
    {
      title: "Some Applications of Trigonometry",
      where: "Class 10 · Chapter 9",
      why: "Heights and distances is the shadow trick with the second object replaced by an angle of elevation. The same picture — a vertical object, a horizontal ground line, a slanting line of sight — and the same reason it works.",
    },
    {
      title: "Straight Lines",
      where: "Class 11",
      why: "The slope of a line is the same wherever you measure it, because every right triangle you draw between two points on the line is similar to every other. Similarity is what makes 'the' slope a single number.",
    },
  ],
};
