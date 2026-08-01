export const meta = {
  name: 'design-authority',
  description: 'Four-agent design authority (Creative Director, UX, Motion, Technical Art) that turns a Claude Design reference into an implementation-ready spec pack. Claude Code implements only.',
  whenToUse: 'Run before building any Pinnacle AI frontend work. Pass the Claude Design reference as args. Output is law: Claude Code implements it verbatim with no creative decisions.',
  phases: [
    { title: 'Direction', detail: 'Creative Director: story, brand emotion, user journey' },
    { title: 'Structure', detail: 'UX Designer: layout, navigation, components, accessibility' },
    { title: 'Craft', detail: 'Motion Designer + Technical Art, in parallel' },
    { title: 'Ratify', detail: 'Cross-check the pack for conflicts and implementability' },
  ],
}

const PROJ = 'c:/pinnacle ai'

/* The Claude Design reference is the constraint every agent inherits. Passed
   as args so this workflow is reusable for any future design drop. */
const DESIGN_REF =
  typeof args === 'string'
    ? args
    : args && args.design
      ? args.design
      : '(NO DESIGN REFERENCE SUPPLIED — say so plainly in your risks field and design conservatively from the existing Pinnacle AI identity.)'

const HOUSE = `
=== PROJECT ===
Pinnacle AI: a CBSE tutoring product for classes 9-12, live and paid (Rs100-200/student).
Stack (fixed, do not propose changing it): Vite 8, React 19.2, TypeScript strict, Tailwind v4
(CSS-first @theme, NO tailwind.config.js), motion 12.42.2, gsap 3.15 (all plugins free:
SplitText, ScrollTrigger, DrawSVG, MorphSVG, Flip, ScrollSmoother), lenis 1.3.25,
three 0.185.1 + @react-three/fiber 9.6.1 + drei 10.7.7 + @react-three/postprocessing 3.0.4,
@paper-design/shaders-react 0.0.77 (Apache-2.0).

Existing identity in ${PROJ}/src/index.css @theme:
  ink #0b0c0e, pit #060708, surface #131519, raise #1b1e24, line #24272e,
  gold #e6b84c, gold-bright #f6d47c, gold-dim #8a6f2e, cream #f2efe6,
  muted #9aa1ad, dim #646b78, mint #7fc79a, coral #e2695e, sky #74a8d0, violet #a58fd6.
  Fonts: Bricolage Grotesque (display), Instrument Sans (body), Spline Sans Mono (mono).

=== HARD LAW ===
1. THE CLAUDE DESIGN REFERENCE BELOW IS THE SUPREME AUTHORITY. Where it specifies anything —
   a colour, a type size, a layout, a motion, a feeling — you follow it EXACTLY. You do not
   improve it, reinterpret it, or substitute your taste. Where it is SILENT, you decide, and
   you mark that decision explicitly as "[FILLED GAP]" so the boundary is auditable.
2. Everything must be FREE for commercial use. Already BANNED and non-negotiable:
   Theatre.js (@theatre/studio is AGPL-3.0), Rive (paid editor), Origin UI (AGPLv3),
   ReactBits (Commons Clause + pulls OGL, a second renderer), 21st.dev component CODE
   (their ToS grants no end-user licence — inspiration only, never shipped code).
3. Respect prefers-reduced-motion with a real simplified path, not a disabled one.
4. Target 60fps on mainstream hardware. Mobile must stay readable and fast.
5. WCAG AA contrast on all text.

=== YOUR OUTPUT IS A SPECIFICATION, NOT CODE ===
You are NOT writing the app. Claude Code implements. Your spec must be precise enough that an
engineer with zero creative latitude can build it without asking a single question. That means
exact hex values, exact px/rem, exact ms, exact cubic-bezier or GSAP ease names, exact property
names. "A subtle fade" is a FAILURE. "opacity 0 -> 1 over 420ms on power3.out" is correct.
Never write React components. (Technical Art is the one exception: GLSL IS the spec, so write
the actual shader source.)

=== THE CLAUDE DESIGN REFERENCE ===
${DESIGN_REF}
`

phase('Direction')

const CREATIVE = {
  type: 'object',
  required: ['thesis', 'emotionalArc', 'journey', 'voice', 'signature', 'filledGaps', 'risks'],
  properties: {
    thesis: { type: 'string', description: 'One paragraph: what this experience IS and why it exists. The single idea everything serves.' },
    emotionalArc: {
      type: 'array',
      description: 'Ordered beats. What the visitor should FEEL at each, and the concrete trigger that causes it.',
      items: {
        type: 'object',
        required: ['beat', 'feeling', 'trigger', 'payoff'],
        properties: {
          beat: { type: 'string' },
          feeling: { type: 'string' },
          trigger: { type: 'string', description: 'The concrete on-screen event: scroll depth, click, hover.' },
          payoff: { type: 'string', description: 'What the visitor gets for the attention they just spent.' },
        },
      },
    },
    journey: { type: 'string', description: 'The user journey end to end, including entry, the decision moment, and exit to the product.' },
    voice: { type: 'string', description: 'Brand voice with 3+ real example lines of copy written in it. Not adjectives.' },
    signature: { type: 'string', description: 'The ONE element this experience is remembered by. Be specific and singular.' },
    filledGaps: { type: 'string', description: 'Every decision you made where the design reference was silent.' },
    risks: { type: 'string' },
  },
}

const direction = await agent(
  `${HOUSE}

YOU ARE AGENT 1: CREATIVE DIRECTOR.

You own the story, the brand emotion and the user journey. Nothing else — do not specify
layouts, motion curves or materials; three other directors own those and will read your output.

Deliver:
1. THESIS. The single idea. Everything downstream must be able to justify itself against it.
2. EMOTIONAL ARC. The ordered beats, each with the feeling, the concrete trigger, and the payoff.
   Be honest about attention: a visitor who scrolls must be repaid for it at every beat.
3. USER JOURNEY. Entry, progression, the decision moment, exit into the product.
4. VOICE. With real example lines, written out. Pinnacle's audience is Indian CBSE students
   aged 14-18 and the schools that buy for them. Write copy that respects both.
5. SIGNATURE. The one thing this is remembered by.

Read ${PROJ}/src/index.css and ${PROJ}/src/pages/Landing.tsx first so your direction is grounded
in the identity that already exists rather than inventing a second brand.

Where the design reference speaks, obey it. Where it is silent, decide and flag it.`,
  { label: 'creative-director', phase: 'Direction', schema: CREATIVE }
)

phase('Structure')

const UX = {
  type: 'object',
  required: ['layouts', 'components', 'navigation', 'accessibility', 'responsive', 'filledGaps', 'risks'],
  properties: {
    layouts: {
      type: 'array',
      description: 'One entry per section/chapter, in order.',
      items: {
        type: 'object',
        required: ['id', 'purpose', 'structure', 'typography', 'spacing'],
        properties: {
          id: { type: 'string' },
          purpose: { type: 'string', description: 'Which emotional beat this serves.' },
          structure: { type: 'string', description: 'Exact layout: grid/flex, columns, alignment, max-widths in px or rem, ASCII wireframe encouraged.' },
          typography: { type: 'string', description: 'Exact: family, weight, size (clamp() where fluid), line-height, letter-spacing, colour token.' },
          spacing: { type: 'string', description: 'Exact padding/margin/gap values from an 8pt scale.' },
        },
      },
    },
    components: {
      type: 'array',
      description: 'Every reusable component, with states.',
      items: {
        type: 'object',
        required: ['name', 'spec', 'states'],
        properties: {
          name: { type: 'string' },
          spec: { type: 'string' },
          states: { type: 'string', description: 'default / hover / active / focus-visible / disabled / loading, each with exact values.' },
        },
      },
    },
    navigation: { type: 'string', description: 'Nav model, scroll behaviour, how a visitor orients inside a long narrative, and how they skip it.' },
    accessibility: { type: 'string', description: 'Semantic structure, heading order, focus management, keyboard path, ARIA, contrast ratios computed against the real tokens, reduced-motion fallback.' },
    responsive: { type: 'string', description: 'Exact breakpoints and what changes at each. Mobile is not an afterthought.' },
    filledGaps: { type: 'string' },
    risks: { type: 'string' },
  },
}

const ux = await agent(
  `${HOUSE}

YOU ARE AGENT 2: UX DESIGNER.

The Creative Director has ruled. Their direction is now part of your law:
${JSON.stringify(direction).slice(0, 7000)}

You own layout, navigation, component specification and accessibility. You do NOT own motion
(Agent 3) or materials/shaders (Agent 4). Do not specify animation curves or 3D materials.

Deliver:
1. LAYOUTS, one per section, in order, each tied to a named emotional beat. Exact numbers.
2. COMPONENT INVENTORY with every interaction state including focus-visible. Reuse the existing
   classes in ${PROJ}/src/index.css (.card, .btn-gold, .btn-ghost, .chip, .eyebrow, .input,
   .marks) wherever they fit rather than inventing parallel ones — read that file first and say
   which existing classes you are reusing and which genuinely need to be new.
3. NAVIGATION. Include how someone SKIPS the narrative and goes straight to signing in. A
   cinematic journey that traps a returning user is a failure.
4. ACCESSIBILITY. Compute real contrast ratios against the actual token hex values. Give the
   heading order. Give the full keyboard path. Specify what reduced-motion users get INSTEAD —
   a real experience, not an absence.
5. RESPONSIVE. Exact breakpoints. Indian mobile traffic is majority; treat it as primary.`,
  { label: 'ux-designer', phase: 'Structure', schema: UX }
)

phase('Craft')

const MOTION = {
  type: 'object',
  required: ['timelines', 'scrollModel', 'curves', 'choreography', 'reducedMotion', 'filledGaps', 'risks'],
  properties: {
    timelines: {
      type: 'array',
      description: 'Every animation, as an implementable timeline.',
      items: {
        type: 'object',
        required: ['id', 'trigger', 'steps'],
        properties: {
          id: { type: 'string' },
          trigger: { type: 'string', description: 'Exact: ScrollTrigger start/end/scrub values, or the DOM event.' },
          steps: { type: 'string', description: 'Ordered steps with exact target, property, from, to, duration ms, ease name, stagger, and position on the timeline.' },
        },
      },
    },
    scrollModel: { type: 'string', description: 'How scroll drives everything: Lenis config, gsap.ticker wiring, ScrollTrigger setup, pinning, scrub values, chapter windows as 0-1 ranges.' },
    curves: { type: 'string', description: 'The named easing set with exact cubic-bezier or GSAP names, and the rule for when each is used.' },
    choreography: { type: 'string', description: 'How beats overlap and hand off. Anticipation, follow-through, secondary motion, overlapping action. What must never move at the same time.' },
    reducedMotion: { type: 'string', description: 'The genuinely simplified alternative path, specified as precisely as the full one.' },
    filledGaps: { type: 'string' },
    risks: { type: 'string' },
  },
}

const TECHART = {
  type: 'object',
  required: ['materials', 'lighting', 'shaders', 'particles', 'postFx', 'budget', 'filledGaps', 'risks'],
  properties: {
    materials: {
      type: 'array',
      items: {
        type: 'object',
        required: ['target', 'spec'],
        properties: {
          target: { type: 'string' },
          spec: { type: 'string', description: 'Exact three material class and every parameter value: colour, roughness, metalness, clearcoat, ior, transmission, emissive, map generation.' },
        },
      },
    },
    lighting: { type: 'string', description: 'The full rig: every light with type, colour hex, intensity, position, and how it changes across the narrative. Include shadow settings and their cost.' },
    shaders: { type: 'string', description: 'ACTUAL GLSL source for every custom shader, with all uniforms declared and explained. This is the one place you write real code.' },
    particles: { type: 'string', description: 'Exact counts per device tier, spawn volume, motion model, blending, and why the chosen approach (points vs instanced) is right.' },
    postFx: { type: 'string', description: 'Exact @react-three/postprocessing effect chain in order, with every setting and the measured cost of each.' },
    budget: { type: 'string', description: 'Per-tier draw call, triangle and texture budget. State plainly what must be cut on low tier.' },
    filledGaps: { type: 'string' },
    risks: { type: 'string' },
  },
}

/* Motion and Technical Art both depend on Direction + Structure but not on each other,
   so they run concurrently rather than one waiting on the other. */
const [motion, techArt] = await parallel([
  () =>
    agent(
      `${HOUSE}

YOU ARE AGENT 3: MOTION DESIGNER.

Creative Direction (law): ${JSON.stringify(direction).slice(0, 5000)}
UX Structure (law): ${JSON.stringify(ux).slice(0, 7000)}

You own GSAP timelines, ScrollTrigger, camera choreography, motion curves and the Three.js
animation choreography. You do NOT own materials, lighting or shaders — Agent 4 owns those.

Deliver every animation as a timeline an engineer can type in directly: exact targets, exact
properties, exact from/to values, exact durations in ms, exact ease names, exact stagger, exact
position parameters. A step that says "fade in" is a failure; "opacity 0->1, 420ms, power3.out,
stagger 60ms from centre, at -=0.2" is correct.

Known constraints from the existing codebase, which you must design within:
- Lenis MUST share one clock with ScrollTrigger: lenis.on('scroll', ScrollTrigger.update),
  gsap.ticker.add(t => lenis.raf(t*1000)), gsap.ticker.lagSmoothing(0). Two rAF loops caused
  real judder here already.
- Never animate box-shadow, background-position, filter, width/height/top/left. Transform and
  opacity only, or a pseudo-element cross-fade.
- Never call setState inside a frame loop.
- A CSS prefers-reduced-motion block does NOT stop JS-driven motion; the app is wrapped in
  MotionConfig reducedMotion="user" for that.

Specify the reduced-motion path with the same precision as the full one.`,
      { label: 'motion-designer', phase: 'Craft', schema: MOTION }
    ),
  () =>
    agent(
      `${HOUSE}

YOU ARE AGENT 4: TECHNICAL ART DIRECTOR.

Creative Direction (law): ${JSON.stringify(direction).slice(0, 5000)}
UX Structure (law): ${JSON.stringify(ux).slice(0, 5000)}

You own shaders, Three.js materials, lighting, fog, particle systems and GPU effects. You do NOT
own timing or choreography — Agent 3 owns those. Specify what things LOOK like and what they
cost, not when they move.

The current build was rejected by the client as looking "non-realistic, like old animations, like
a kid animated it". Your job is to close exactly that gap. It is a MATERIALS AND LIGHTING problem,
not a timing problem. Flat MeshStandardMaterial on BoxGeometry will never read as leather.

Deliver:
1. MATERIALS. Exact three class and every parameter. Where realism needs normal/roughness/AO maps,
   specify how to GENERATE them procedurally on a canvas at runtime — no downloaded assets, no
   licences, no network. Give the generation algorithm.
2. LIGHTING. The full rig, every light with hex, intensity, position. How it evolves across the
   narrative. Shadow map sizes and their real cost.
3. SHADERS. Write the ACTUAL GLSL. Vertex and fragment. Declare every uniform and explain it.
   Verify your own syntax; state whether it targets WebGL2. Include precision qualifiers.
4. PARTICLES. Counts per tier, spawn volume, motion model, blending mode.
5. POST FX. The exact effect chain in order with every setting. Bloom threshold matters enormously
   against a #050505 ground — give the real number.
6. BUDGET. Per-tier draw calls, triangles, texture memory. Say plainly what gets cut on low tier.

Be honest where a technique is too expensive to ship, and give the cheaper alternative that still
reads as premium.`,
      { label: 'technical-art', phase: 'Craft', schema: TECHART }
    ),
])

phase('Ratify')

const RATIFY = {
  type: 'object',
  required: ['implementable', 'conflicts', 'gaps', 'verdict'],
  properties: {
    implementable: { type: 'boolean', description: 'True only if an engineer could build this with ZERO creative decisions.' },
    conflicts: { type: 'string', description: 'Every place two directors contradict each other, with the resolution.' },
    gaps: { type: 'string', description: 'Every place the spec is too vague to implement without inventing something.' },
    verdict: { type: 'string' },
  },
}

const ratified = await agent(
  `You are the design authority's final check before this pack becomes law for an engineer who is
forbidden from making creative decisions. Be ruthless. The pack FAILS if it contains a single
instruction an engineer would have to interpret.

Creative Direction: ${JSON.stringify(direction).slice(0, 5000)}
UX: ${JSON.stringify(ux).slice(0, 6000)}
Motion: ${JSON.stringify(motion).slice(0, 6000)}
Technical Art: ${JSON.stringify(techArt).slice(0, 7000)}

Check hardest for:
1. VAGUENESS. Any "subtle", "smooth", "elegant", "premium", "nice" with no number attached is a
   gap. List every one with the file/section it appears in.
2. CONTRADICTIONS. UX says one type size, Motion animates a different one. Tech Art lights for a
   mood Creative Direction did not ask for. Find them and resolve them.
3. GLSL CORRECTNESS. Read the shader source for real syntax errors, undeclared uniforms, missing
   precision qualifiers, WebGL1-vs-2 assumptions. Do not assume it compiles.
4. LICENCE BREACHES. Any banned library sneaking back in.
5. ACCESSIBILITY. Are the contrast ratios actually computed, or asserted? Recompute a sample.
6. FEASIBILITY. Would this hit 60fps? Is the low tier actually shippable?

Modify nothing. Report precisely.`,
  { label: 'ratify', phase: 'Ratify', schema: RATIFY }
)

log(`spec pack complete — implementable: ${ratified?.implementable}`)

return { direction, ux, motion, techArt, ratified }
