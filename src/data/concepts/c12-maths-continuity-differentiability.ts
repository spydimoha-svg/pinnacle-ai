// Class 12 Maths · Chapter 5 · Continuity and Differentiability — the
// hand-authored concept graph.
//
// Ordered the way the rationalised NCERT chapter actually builds: what
// continuity at a point means → what differentiability adds on top of it →
// the chain rule that makes every later technique possible → implicit
// differentiation → inverse trig derivatives → logarithmic/exponential
// differentiation → parametric forms and second order derivatives.
//
// Rolle's theorem and the Mean Value Theorem were rationalised out of this
// chapter — neither appears anywhere below, on purpose.
import type { ConceptMap } from "./types";

export const C12_MATHS_CONTINUITY_DIFFERENTIABILITY_MAP: ConceptMap = {
  chapterId: "c12-maths-05",
  chapterTitle: "Continuity and Differentiability",
  classLevel: 12,
  subject: "Mathematics",
  authored: true,
  bigIdea:
    "Continuity asks whether a function's graph can be drawn through a point without lifting the pen; differentiability asks the stronger question of whether that point also has one well-defined tangent slope. Every differentiable function is continuous, but a continuous function can still have a corner — like $|x|$ at $x=0$ — where no single slope exists. Everything after that in this chapter is the same question, 'what is the slope here', asked of functions too tangled to differentiate directly: composites need the chain rule, equations that mix x and y need implicit differentiation, $x^{g(x)}$ needs logs, and curves given by a parameter t need one extra step.",

  prereqs: [
    {
      id: "p-limit",
      from: "Class 11 · Limits and Derivatives",
      title: "Evaluating a limit as x approaches a value",
      why: "Continuity is defined entirely in terms of left-hand and right-hand limits. If evaluating a limit is shaky, LHL = RHL = f(a) is just three unfamiliar symbols.",
      probe: {
        q: "Evaluate $\\displaystyle\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}$.",
        answer: "Factor: $\\dfrac{(x-2)(x+2)}{x-2} = x + 2$, so the limit is $2 + 2 = 4$.",
      },
    },
    {
      id: "p-first-principle",
      from: "Class 11 · Limits and Derivatives",
      title: "Finding a derivative from first principles",
      why: "Differentiability is defined by the same limit — $\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}$ — taken from the left and from the right. Without the first-principles definition, LHD and RHD have nothing to stand on.",
      probe: {
        q: "Using first principles, find the derivative of $f(x) = x^2$.",
        answer:
          "$f'(x) = \\lim_{h\\to0}\\dfrac{(x+h)^2 - x^2}{h} = \\lim_{h\\to0}\\dfrac{2xh+h^2}{h} = \\lim_{h\\to0}(2x+h) = 2x$.",
      },
    },
    {
      id: "p-algebra",
      from: "Class 11 · Limits and Derivatives",
      title: "Product and quotient rules for derivatives",
      why: "Logarithmic differentiation and parametric derivatives both lean on the product and quotient rules at nearly every step — this chapter assumes they are already automatic.",
      probe: {
        q: "Differentiate $y = x^2 \\sin x$ using the product rule.",
        answer: "$\\dfrac{dy}{dx} = 2x\\sin x + x^2\\cos x$.",
      },
    },
  ],

  concepts: [
    {
      id: "c-continuity",
      title: "Continuity at a point: LHL = RHL = f(a)",
      oneLine:
        "$f$ is continuous at $x = a$ when the left-hand limit, the right-hand limit, and $f(a)$ are all equal.",
      brief:
        "A function $f$ is continuous at $x = a$ if all three of these are equal: the left-hand limit $\\lim_{x\\to a^-} f(x)$, the right-hand limit $\\lim_{x\\to a^+} f(x)$, and the value $f(a)$ itself. For a piecewise function this means working out LHL from the branch that applies just below $a$, RHL from the branch just above $a$, and $f(a)$ from whichever branch actually contains the point $a$ — then comparing all three. If any two disagree, the function is discontinuous at $a$. This has to be written out explicitly as three separate lines in a board answer; stating 'the function is continuous' without showing LHL, RHL and f(a) loses marks even if the conclusion is right.",
      example:
        "Check continuity of $f(x) = \\begin{cases} 2x+3, & x<2 \\\\ x^2+1, & x\\geq 2\\end{cases}$ at $x=2$. LHL $=\\lim_{x\\to2^-}(2x+3)=7$. RHL $=\\lim_{x\\to2^+}(x^2+1)=5$. $f(2)=5$. LHL $\\neq$ RHL, so $f$ is discontinuous at $x=2$.",
      figure:
        '```plot\n{"fn":["2x+3","x^2+1"],"domain":[0,4],"title":"$f$ jumps from 7 to 5 at $x=2$: LHL \\u2260 RHL","xLabel":"x","yLabel":"y"}\n```',
      check: {
        q: "Check the continuity of $f(x) = \\begin{cases} 3x-2, & x\\leq 2 \\\\ x^2-1, & x>2\\end{cases}$ at $x=2$.",
        answer:
          "LHL $= f(2) = 3(2)-2 = 4$ (the $x\\leq2$ branch covers $x=2$ itself). RHL $=\\lim_{x\\to2^+}(x^2-1)=3$. Since LHL $=4 \\neq 3=$ RHL, $f$ is discontinuous at $x=2$.",
        hint: "Work out the left-hand limit, the right-hand limit and $f(2)$ as three separate lines, then compare all three.",
      },
      mistakes: [
        "Only checking $f(a)$ exists and skipping the limit comparison entirely.",
        "Using the wrong branch for $f(a)$ when the boundary point could belong to either piece.",
      ],
      needs: ["p-limit"],
      marks: "2–3 marks",
    },
    {
      id: "c-differentiability",
      title: "Differentiability at a point: LHD = RHD",
      oneLine:
        "$f$ is differentiable at $x=a$ when the left-hand derivative equals the right-hand derivative — differentiable always implies continuous, never the other way round.",
      brief:
        "LHD $=\\lim_{h\\to0^-}\\dfrac{f(a+h)-f(a)}{h}$ and RHD $=\\lim_{h\\to0^+}\\dfrac{f(a+h)-f(a)}{h}$. $f$ is differentiable at $a$ only when these two one-sided limits are equal and finite. Every differentiable function is continuous there, but the converse fails: $f(x)=|x|$ is continuous at $x=0$ yet has a sharp corner, so its two one-sided slopes disagree and it is NOT differentiable at 0. This is the standard counter-example the board expects, and 'differentiable' should never be assumed just because a function 'looks smooth' in a sketch.",
      example:
        "$f(x)=|x|$ at $x=0$: LHD $=\\lim_{h\\to0^-}\\dfrac{|h|-0}{h}=\\lim_{h\\to0^-}\\dfrac{-h}{h}=-1$. RHD $=\\lim_{h\\to0^+}\\dfrac{|h|}{h}=1$. LHD $\\neq$ RHD, so $|x|$ is not differentiable at $x=0$, even though it is continuous there.",
      check: {
        q: "Is $f(x)=|x-2|$ differentiable at $x=2$? Show LHD and RHD.",
        answer:
          "LHD $=\\lim_{h\\to0^-}\\dfrac{|h|-0}{h}=\\lim_{h\\to0^-}\\dfrac{-h}{h}=-1$. RHD $=\\lim_{h\\to0^+}\\dfrac{|h|}{h}=1$. Since LHD $\\neq$ RHD, $f$ is not differentiable at $x=2$, although it is continuous there.",
        hint: "Write $f(2+h)$ using $|h|$, then split into $h<0$ (where $|h|=-h$) and $h>0$ (where $|h|=h$) separately.",
      },
      mistakes: [
        "Assuming continuous automatically means differentiable — it is a one-way implication only.",
        "Forgetting to split $|h|$ into cases before cancelling the $h$ in the denominator.",
      ],
      needs: ["p-first-principle", "c-continuity"],
      marks: "2 marks",
    },
    {
      id: "c-chain-rule",
      title: "The chain rule for composite functions",
      oneLine:
        "For $y=f(g(x))$: $\\dfrac{dy}{dx}=f'(g(x))\\cdot g'(x)$ — differentiate the outside, then multiply by the derivative of the inside.",
      brief:
        "When $y$ is a function of $u$, and $u$ is itself a function of $x$, the chain rule says $\\dfrac{dy}{dx}=\\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}$. In practice: differentiate the outer function while leaving the inner function untouched, then multiply by the derivative of the inner function. This one rule is what makes every other technique in this chapter possible — implicit differentiation, inverse trig derivatives and logarithmic differentiation are all the chain rule applied to a specific shape of function.",
      example:
        "$y=\\sin(x^2)$. Outer function is $\\sin(\\cdot)$, inner is $x^2$. $\\dfrac{dy}{dx}=\\cos(x^2)\\cdot 2x = 2x\\cos(x^2)$.",
      check: {
        q: "Differentiate $y=(3x^2+1)^5$.",
        answer:
          "$\\dfrac{dy}{dx}=5(3x^2+1)^4 \\cdot 6x = 30x(3x^2+1)^4$.",
        hint: "The outer function is 'something to the power 5'. Differentiate that first, keeping the inside as it is, then multiply by the derivative of $3x^2+1$.",
      },
      mistakes: [
        "Forgetting to multiply by the derivative of the inner function.",
        "Differentiating the inner function first and the outer function second — the order matters for keeping track, not the final product, but skipping a factor is the common failure.",
      ],
      needs: ["p-first-principle"],
      marks: "1–2 marks, usually embedded inside a bigger derivative question",
    },
    {
      id: "c-implicit",
      title: "Implicit differentiation",
      oneLine:
        "When $y$ is not isolated, differentiate both sides with respect to x, treating y as a function of x and applying the chain rule to every y-term.",
      brief:
        "Some relations, like $x^2+y^2=25$, are not written as $y=$ some expression in x. To differentiate them: differentiate both sides of the equation term by term with respect to x, and every time you differentiate a term containing y, multiply by $\\dfrac{dy}{dx}$ (chain rule, since y is itself a function of x). Then collect all the $\\dfrac{dy}{dx}$ terms on one side and solve for $\\dfrac{dy}{dx}$ algebraically.",
      example:
        "$x^2+y^2=25$. Differentiate both sides: $2x+2y\\dfrac{dy}{dx}=0$, so $\\dfrac{dy}{dx}=-\\dfrac{x}{y}$.",
      check: {
        q: "Find $\\dfrac{dy}{dx}$ if $x^2+xy+y^2=100$.",
        answer:
          "Differentiate term by term: $2x + \\left(x\\dfrac{dy}{dx}+y\\right) + 2y\\dfrac{dy}{dx}=0$. Collect: $\\dfrac{dy}{dx}(x+2y) = -(2x+y)$, so $\\dfrac{dy}{dx}=-\\dfrac{2x+y}{x+2y}$.",
        hint: "The middle term $xy$ needs the product rule as well as the chain rule, since it has both x and y in it.",
      },
      mistakes: [
        "Differentiating a y-term without multiplying by $\\dfrac{dy}{dx}$.",
        "Forgetting the product rule on mixed terms like $xy$.",
      ],
      needs: ["c-chain-rule"],
      marks: "2–3 marks",
    },
    {
      id: "c-inverse-trig",
      title: "Derivatives of inverse trigonometric functions",
      oneLine:
        "$\\dfrac{d}{dx}(\\sin^{-1}x)=\\dfrac{1}{\\sqrt{1-x^2}}$, $\\dfrac{d}{dx}(\\cos^{-1}x)=-\\dfrac{1}{\\sqrt{1-x^2}}$, $\\dfrac{d}{dx}(\\tan^{-1}x)=\\dfrac{1}{1+x^2}$ — then chain rule for a composite argument.",
      brief:
        "The three standard results to memorise exactly: $\\dfrac{d}{dx}(\\sin^{-1}x)=\\dfrac{1}{\\sqrt{1-x^2}}$, $\\dfrac{d}{dx}(\\cos^{-1}x)=-\\dfrac{1}{\\sqrt{1-x^2}}$, and $\\dfrac{d}{dx}(\\tan^{-1}x)=\\dfrac{1}{1+x^2}$. When the argument is not just x but some function $g(x)$, apply the chain rule exactly as with any composite: differentiate using the standard result with $g(x)$ in place of x, then multiply by $g'(x)$.",
      example:
        "$y=\\sin^{-1}(2x)$. $\\dfrac{dy}{dx}=\\dfrac{1}{\\sqrt{1-(2x)^2}}\\cdot 2 = \\dfrac{2}{\\sqrt{1-4x^2}}$.",
      check: {
        q: "Differentiate $y=\\tan^{-1}(x^2)$.",
        answer:
          "$\\dfrac{dy}{dx}=\\dfrac{1}{1+(x^2)^2}\\cdot 2x = \\dfrac{2x}{1+x^4}$.",
        hint: "Use $\\dfrac{d}{dx}(\\tan^{-1}u)=\\dfrac{1}{1+u^2}$ with $u=x^2$, then don't forget the chain-rule factor $\\dfrac{du}{dx}$.",
      },
      mistakes: [
        "Using $\\dfrac{1}{1+x^2}$ even when the argument is not plain x.",
        "Mixing up the sign between $\\sin^{-1}$ (positive) and $\\cos^{-1}$ (negative).",
      ],
      needs: ["c-chain-rule"],
      marks: "2–3 marks",
    },
    {
      id: "c-log-exp",
      title: "Logarithmic and exponential differentiation",
      oneLine:
        "For $y=[f(x)]^{g(x)}$, take $\\ln$ of both sides first — it turns a variable exponent into a product you can differentiate implicitly.",
      brief:
        "A function like $y=x^x$ cannot be differentiated by the power rule (exponent is a constant) or the exponential rule (base is a constant) because both the base and the exponent depend on x. The fix: take $\\ln$ of both sides, $\\ln y = g(x)\\ln f(x)$, which turns the power into a product. Differentiate implicitly: $\\dfrac{1}{y}\\dfrac{dy}{dx} = g'(x)\\ln f(x) + g(x)\\dfrac{f'(x)}{f(x)}$, then multiply through by the original y to isolate $\\dfrac{dy}{dx}$. The same log trick also simplifies differentiating a long chain of products or quotients. Separately, remember the two base derivatives this all rests on: $\\dfrac{d}{dx}(e^x)=e^x$ and $\\dfrac{d}{dx}(\\ln x)=\\dfrac{1}{x}$, each combined with the chain rule when the argument is not plain x.",
      example:
        "$y=x^x$. $\\ln y = x\\ln x$. Differentiate: $\\dfrac{1}{y}\\dfrac{dy}{dx}=\\ln x + x\\cdot\\dfrac{1}{x} = \\ln x + 1$. So $\\dfrac{dy}{dx}=x^x(\\ln x+1)$.",
      check: {
        q: "Differentiate $y=x^{\\sin x}$ using logarithmic differentiation.",
        answer:
          "$\\ln y=\\sin x\\ln x$. Differentiate: $\\dfrac{1}{y}\\dfrac{dy}{dx}=\\cos x\\ln x + \\dfrac{\\sin x}{x}$. So $\\dfrac{dy}{dx}=x^{\\sin x}\\left(\\cos x\\ln x + \\dfrac{\\sin x}{x}\\right)$.",
        hint: "Take $\\ln$ of both sides first so the exponent $\\sin x$ becomes a coefficient, then differentiate implicitly and multiply back by the original $y=x^{\\sin x}$ at the end.",
      },
      mistakes: [
        "Trying to use the plain power rule on $x^x$ — it does not apply when the exponent also contains x.",
        "Forgetting to multiply the final bracket back by y to get $\\dfrac{dy}{dx}$ instead of $\\dfrac{1}{y}\\dfrac{dy}{dx}$.",
      ],
      needs: ["c-implicit", "p-algebra"],
      marks: "3–5 marks, a near-guaranteed question every year",
    },
    {
      id: "c-parametric-second",
      title: "Parametric forms and second order derivatives",
      oneLine:
        "If $x=f(t)$ and $y=g(t)$, then $\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}$; for the second derivative, differentiate $\\dfrac{dy}{dx}$ with respect to t again and divide by $\\dfrac{dx}{dt}$ once more — never $\\dfrac{d^2y/dt^2}{d^2x/dt^2}$.",
      brief:
        "When both x and y are given in terms of a third variable t, find $\\dfrac{dy}{dx}$ by dividing $\\dfrac{dy}{dt}$ by $\\dfrac{dx}{dt}$ — never by differentiating y with respect to x directly. For the second derivative $\\dfrac{d^2y}{dx^2}$, the common mistake is to divide $\\dfrac{d^2y}{dt^2}$ by $\\dfrac{d^2x}{dt^2}$; that is wrong. The correct route is: write $\\dfrac{dy}{dx}$ as a function of t as above, differentiate that whole expression with respect to t, and divide the result by $\\dfrac{dx}{dt}$ once more.",
      example:
        "$x=t^2$, $y=t^3$. $\\dfrac{dx}{dt}=2t$, $\\dfrac{dy}{dt}=3t^2$, so $\\dfrac{dy}{dx}=\\dfrac{3t^2}{2t}=\\dfrac{3t}{2}$. For the second derivative: differentiate $\\dfrac{3t}{2}$ with respect to t to get $\\dfrac{3}{2}$, then divide by $\\dfrac{dx}{dt}=2t$: $\\dfrac{d^2y}{dx^2}=\\dfrac{3/2}{2t}=\\dfrac{3}{4t}$.",
      check: {
        q: "If $x=a\\cos\\theta$ and $y=a\\sin\\theta$, find $\\dfrac{dy}{dx}$.",
        answer:
          "$\\dfrac{dx}{d\\theta}=-a\\sin\\theta$, $\\dfrac{dy}{d\\theta}=a\\cos\\theta$, so $\\dfrac{dy}{dx}=\\dfrac{a\\cos\\theta}{-a\\sin\\theta}=-\\cot\\theta$.",
        hint: "Differentiate x and y separately with respect to $\\theta$, then divide $dy/d\\theta$ by $dx/d\\theta$ — do not try to eliminate $\\theta$ first.",
      },
      mistakes: [
        "Dividing the second derivatives with respect to t directly instead of re-differentiating $\\dfrac{dy}{dx}$.",
        "Eliminating the parameter to get y in terms of x before differentiating, which is slower and error-prone compared to the direct ratio.",
      ],
      needs: ["c-chain-rule", "p-algebra"],
      marks: "3–5 marks, a near-guaranteed question every year",
    },
  ],

  leadsTo: [
    {
      title: "Application of Derivatives",
      where: "Class 12 · Chapter 6",
      why: "Rate of change, increasing/decreasing behaviour, and maxima–minima all start from a derivative found exactly the way this chapter teaches.",
    },
    {
      title: "Integrals",
      where: "Class 12 · Chapter 7",
      why: "Integration is differentiation run backwards — recognising which derivative rule produced a given expression is how you spot the right integration technique.",
    },
  ],
};
