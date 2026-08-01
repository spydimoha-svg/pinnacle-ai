export const meta = {
  name: 'design-council',
  description:
    'Five specialist agents produce one binding design spec: creative direction, UX, motion, technical art, then a lock audit. Claude Code implements the result verbatim.',
  whenToUse:
    'Run before any visual or motion work on the Pinnacle AI experience. Pass the Claude Design reference file path as args.reference.',
  phases: [
    { title: 'Creative Direction', detail: 'story, brand emotion, user journey' },
    { title: 'UX', detail: 'layout, navigation, components, accessibility' },
    { title: 'Motion', detail: 'timelines, scroll triggers, easing, camera choreography' },
    { title: 'Technical Art', detail: 'shaders, materials, lighting, fog, particles, post FX' },
    { title: 'Lock', detail: 'contradiction audit and implementation order, no new design' },
  ],
}

/* ────────────────────────────────────────────────────────────────────────
   Schemas.

   Every council member returns structured data, not prose. That is the
   whole point of the arrangement: an agent that returns paragraphs has
   handed the implementer a set of decisions to make, and the implementer
   is explicitly forbidden from making them.
   ──────────────────────────────────────────────────────────────────────── */

const CREATIVE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['thesis', 'emotionalArc', 'journey', 'palette', 'typography', 'signature', 'prohibitions'],
  properties: {
    thesis: { type: 'string', description: 'One sentence. What this experience argues.' },
    emotionalArc: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['beat', 'feeling', 'why'],
        properties: {
          beat: { type: 'string' },
          feeling: { type: 'string' },
          why: { type: 'string', description: 'Why this feeling sells a CBSE tutor specifically.' },
        },
      },
    },
    journey: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['step', 'userGoal', 'systemResponse'],
        properties: {
          step: { type: 'string' },
          userGoal: { type: 'string' },
          systemResponse: { type: 'string' },
        },
      },
    },
    palette: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'hex', 'role'],
        properties: {
          name: { type: 'string' },
          hex: { type: 'string', pattern: '^#[0-9a-fA-F]{6}$' },
          role: { type: 'string' },
        },
      },
    },
    typography: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['role', 'family', 'weights', 'reason', 'licence'],
        properties: {
          role: { type: 'string', description: 'display | body | data | ui' },
          family: { type: 'string' },
          weights: { type: 'string' },
          reason: { type: 'string' },
          licence: { type: 'string', description: 'Must be free. Say which licence and where it is hosted.' },
        },
      },
    },
    signature: { type: 'string', description: 'The single moment the whole experience is remembered by.' },
    prohibitions: { type: 'array', items: { type: 'string' } },
  },
}

const UX_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['sections', 'navigation', 'components', 'accessibility', 'responsive'],
  properties: {
    sections: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'purpose', 'layout', 'copy', 'scrollRange'],
        properties: {
          id: { type: 'string' },
          purpose: { type: 'string' },
          layout: { type: 'string', description: 'Concrete: grid columns, alignment, max widths, padding in rem or vh.' },
          copy: { type: 'string', description: 'The literal words that appear. Write them, do not describe them.' },
          scrollRange: { type: 'string', description: 'Where in the master 0..1 timeline this section lives.' },
        },
      },
    },
    navigation: {
      type: 'object',
      additionalProperties: false,
      required: ['model', 'affordances', 'escapeHatches'],
      properties: {
        model: { type: 'string' },
        affordances: { type: 'array', items: { type: 'string' } },
        escapeHatches: {
          type: 'array',
          items: { type: 'string' },
          description: 'How a visitor skips the cinema and reaches the product.',
        },
      },
    },
    components: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'source', 'props', 'states'],
        properties: {
          name: { type: 'string' },
          source: { type: 'string', description: 'existing file path, or build new, or a free MIT library. Never paid.' },
          props: { type: 'string' },
          states: { type: 'string', description: 'default, hover, focus, active, disabled, loading, error.' },
        },
      },
    },
    accessibility: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['requirement', 'implementation', 'criterion'],
        properties: {
          requirement: { type: 'string' },
          implementation: { type: 'string', description: 'The actual attribute, role or CSS that satisfies it.' },
          criterion: { type: 'string', description: 'WCAG 2.2 reference, e.g. 2.4.7 Focus Visible AA.' },
        },
      },
    },
    responsive: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['breakpoint', 'changes'],
        properties: { breakpoint: { type: 'string' }, changes: { type: 'string' } },
      },
    },
  },
}

const MOTION_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['curves', 'timelines', 'camera', 'choreography', 'reducedMotion', 'forbidden'],
  properties: {
    curves: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'value', 'useFor'],
        properties: {
          name: { type: 'string' },
          value: { type: 'string', description: 'cubic-bezier(a,b,c,d) or a named gsap ease. Exact.' },
          useFor: { type: 'string' },
        },
      },
    },
    timelines: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'trigger', 'scrub', 'range', 'steps'],
        properties: {
          id: { type: 'string' },
          trigger: { type: 'string' },
          scrub: { type: 'string', description: 'true, a number, or "time-based" if not scrubbed.' },
          range: { type: 'string', description: 'start and end, in ScrollTrigger syntax or master 0..1.' },
          steps: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['target', 'property', 'from', 'to', 'at', 'ease'],
              properties: {
                target: { type: 'string' },
                property: { type: 'string' },
                from: { type: 'string' },
                to: { type: 'string' },
                at: { type: 'string', description: 'Position in the timeline, absolute or relative.' },
                ease: { type: 'string' },
              },
            },
          },
        },
      },
    },
    camera: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['chapter', 'position', 'lookAt', 'fov', 'ease', 'note'],
        properties: {
          chapter: { type: 'string' },
          position: { type: 'string', description: 'x, y, z as numbers.' },
          lookAt: { type: 'string' },
          fov: { type: 'string' },
          ease: { type: 'string' },
          note: { type: 'string', description: 'The cinematographic intent in one line.' },
        },
      },
    },
    choreography: {
      type: 'string',
      description: 'How the beats overlap and hand off. What must never move at the same time as what.',
    },
    reducedMotion: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['timelineId', 'fallback'],
        properties: {
          timelineId: { type: 'string' },
          fallback: { type: 'string', description: 'A real static or crossfade alternative, not "disabled".' },
        },
      },
    },
    forbidden: {
      type: 'array',
      items: { type: 'string' },
      description: 'Motions that would break the brand, listed so the implementer can refuse them.',
    },
  },
}

const TECHART_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['materials', 'lighting', 'atmosphere', 'shaders', 'particles', 'postProcessing', 'budgets'],
  properties: {
    materials: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['target', 'type', 'params', 'maps'],
        properties: {
          target: { type: 'string', description: 'Which mesh or surface.' },
          type: { type: 'string', description: 'MeshPhysicalMaterial, MeshStandardMaterial, ShaderMaterial, etc.' },
          params: { type: 'string', description: 'Every parameter with its exact value.' },
          maps: {
            type: 'string',
            description:
              'Normal, roughness, AO and how each is produced. Procedural or canvas generated only, no paid or downloaded texture.',
          },
        },
      },
    },
    lighting: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'type', 'position', 'color', 'intensity', 'shadow'],
        properties: {
          name: { type: 'string' },
          type: { type: 'string' },
          position: { type: 'string' },
          color: { type: 'string' },
          intensity: { type: 'string' },
          shadow: { type: 'string', description: 'castShadow, map size, bias, and which tier enables it.' },
        },
      },
    },
    atmosphere: {
      type: 'object',
      additionalProperties: false,
      required: ['fog', 'background', 'environment', 'toneMapping'],
      properties: {
        fog: { type: 'string' },
        background: { type: 'string' },
        environment: { type: 'string', description: 'Procedural or drei Environment preset. Must be free and local.' },
        toneMapping: { type: 'string' },
      },
    },
    shaders: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'appliedTo', 'uniforms', 'approach', 'glsl'],
        properties: {
          name: { type: 'string' },
          appliedTo: { type: 'string' },
          uniforms: { type: 'string', description: 'Name, type, default, animated range.' },
          approach: { type: 'string', description: 'onBeforeCompile patch or full ShaderMaterial, and why.' },
          glsl: { type: 'string', description: 'The actual GLSL, or the exact function bodies that matter.' },
        },
      },
    },
    particles: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'counts', 'motion', 'material', 'cpuCost'],
        properties: {
          name: { type: 'string' },
          counts: { type: 'string', description: 'low, mid, high tier counts.' },
          motion: { type: 'string', description: 'Where the motion is computed. Vertex shader is strongly preferred.' },
          material: { type: 'string' },
          cpuCost: { type: 'string', description: 'How many values the CPU writes per frame.' },
        },
      },
    },
    postProcessing: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['effect', 'params', 'tierGate', 'reason'],
        properties: {
          effect: { type: 'string' },
          params: { type: 'string' },
          tierGate: { type: 'string', description: 'Which device tiers get it.' },
          reason: { type: 'string' },
        },
      },
    },
    budgets: {
      type: 'object',
      additionalProperties: false,
      required: ['targetFps', 'drawCalls', 'triangles', 'textureMemory', 'degradeStrategy'],
      properties: {
        targetFps: { type: 'string' },
        drawCalls: { type: 'string' },
        triangles: { type: 'string' },
        textureMemory: { type: 'string' },
        degradeStrategy: { type: 'string' },
      },
    },
  },
}

const LOCK_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdict', 'contradictions', 'ambiguities', 'budgetRisks', 'implementationOrder', 'definitionOfDone'],
  properties: {
    verdict: { type: 'string', description: 'LOCKED or NEEDS_REVISION.' },
    contradictions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['between', 'issue', 'resolution'],
        properties: {
          between: { type: 'string', description: 'Which two council members disagree.' },
          issue: { type: 'string' },
          resolution: { type: 'string', description: 'Which one wins and why. Upstream wins on intent, downstream on feasibility.' },
        },
      },
    },
    ambiguities: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['question', 'blocking'],
        properties: {
          question: { type: 'string', description: 'Something the implementer would have to invent. Flag it, do not answer it.' },
          blocking: { type: 'string', description: 'yes or no.' },
        },
      },
    },
    budgetRisks: { type: 'array', items: { type: 'string' } },
    implementationOrder: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['step', 'files', 'dependsOn', 'verify'],
        properties: {
          step: { type: 'string' },
          files: { type: 'string' },
          dependsOn: { type: 'string' },
          verify: { type: 'string', description: 'How the implementer proves this step landed. Screenshot, typecheck, measured fps.' },
        },
      },
    },
    definitionOfDone: { type: 'array', items: { type: 'string' } },
  },
}

/* ────────────────────────────────────────────────────────────────────────
   Inputs and the shared constitution.
   ──────────────────────────────────────────────────────────────────────── */

const reference = (args && args.reference) || ''
const scope = (args && args.scope) || 'The full cinematic narrative at src/experience/, chapters 1 through 8.'
const notes = (args && args.notes) || ''

if (!reference) {
  log('No args.reference supplied. The council will work from the repo brief instead of a Claude Design file.')
} else {
  log(`Reference under law: ${reference}`)
}

const LAW = [
  'PROJECT: Pinnacle AI, a CBSE tutor web app. The cinematic narrative lives in src/experience/.',
  'Read src/experience/ and src/index.css before you specify anything, so your spec meets the code that exists.',
  '',
  'THE REFERENCE IS LAW.',
  reference
    ? `A design reference has been supplied at: ${reference}\nRead it first, in full. Everything you specify serves it. You may not restyle it, rescope it, or improve on it. If it is silent on something, you fill that gap in its own idiom.`
    : 'No external reference was supplied. Derive from the brief and code already in the repo. Do not invent a competing visual direction.',
  '',
  'HARD CONSTRAINTS, non negotiable:',
  '1. Free and open source only. No paid API, no paid asset, no paid font, no paid plugin, no paid model.',
  '2. Banned outright: Theatre.js (AGPL), Rive (paid editor), Origin UI (AGPL), ReactBits (Commons Clause), Aceternity (requires a tailwind.config.js that does not exist here).',
  '3. Verified free and allowed: gsap plus every plugin, motion, lenis, three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, @paper-design/shaders-react, Magic UI, Motion Primitives.',
  '4. Stack: Vite 8, React 19.2, TypeScript strict, Tailwind v4 CSS first @theme. There is no tailwind.config.js and there will never be one.',
  '5. Lenis and ScrollTrigger already share a single clock through gsap.ticker. Never propose a second requestAnimationFrame loop.',
  '6. 60fps on a mid tier laptop. In the DOM layer animate transform and opacity only.',
  '7. Reduced motion gets a real designed fallback, never a switched off animation.',
  '8. Textures, fonts and environments are generated at runtime or shipped from the repo. Nothing is fetched from a CDN at render time.',
  '',
  'YOUR OUTPUT IS A BUILD ORDER, NOT A MOOD BOARD.',
  'Give numbers. Hex values, rem and vh values, seconds, cubic bezier curves, Vector3 positions, uniform names with ranges.',
  'An engineer must be able to type your spec straight into a file without making one creative decision.',
  'The words elegant, smooth, premium, immersive and cinematic are banned unless immediately followed by the exact values that produce them.',
  '',
  'YOU ARE READ ONLY. Read any file you need. Do not write, edit or create a single file. Implementation belongs to someone else.',
  'Stay in your lane. Do not do the job of another council member; if you need something from them, state the dependency instead of deciding it.',
  notes ? `\nEXTRA CONSTRAINTS FROM THE CLIENT:\n${notes}` : '',
].join('\n')

/* ────────────────────────────────────────────────────────────────────────
   The council. Strictly sequential: each member inherits the decisions of
   the one above and is bound by them. Running motion and technical art in
   parallel would be faster and would produce two specs that disagree about
   what the frame budget is for.
   ──────────────────────────────────────────────────────────────────────── */

phase('Creative Direction')
const creative = await agent(
  `${LAW}

YOU ARE AGENT 1: THE CREATIVE DIRECTOR.
You own the story, the brand emotion and the user journey. Nothing else. No layout, no timings, no shaders.

SCOPE: ${scope}

Deliver:
- The one sentence thesis. What does this experience argue about learning?
- The emotional arc beat by beat, with what the visitor feels and why that feeling specifically sells a CBSE tutor to an Indian student or their parent.
- The user journey from landing to the moment they want an account.
- The palette as named hex values, each with the job it does.
- The typographic voice: display, body and data faces, with the personality reason and the free licence for each.
- The one signature moment the experience is remembered by.
- The prohibitions: what this brand must never look like.

Ground every choice in real CBSE study, in NCERT chapters and exercise numbers and exam pressure, not in generic edtech uplift.`,
  { label: 'creative-director', phase: 'Creative Direction', schema: CREATIVE_SCHEMA }
)

phase('UX')
const ux = await agent(
  `${LAW}

YOU ARE AGENT 2: THE UX DESIGNER.
You own layout, navigation, component inventory and accessibility. You do not touch story or motion timing.

THE CREATIVE DIRECTION IS BINDING. Serve it, do not revise it:
${JSON.stringify(creative, null, 2)}

SCOPE: ${scope}

Deliver:
- Every section: id, purpose, exact layout, the literal copy that appears, and where it sits in the master 0..1 scroll timeline.
- The navigation model, including how a visitor who does not want the cinema reaches the product in one action.
- The component inventory: name, whether it exists in the repo or must be built, props, and every interaction state.
- Accessibility as concrete implementations against WCAG 2.2 AA. Keyboard path through the whole narrative, focus visibility on a near black ground, what a screen reader hears while a WebGL canvas is on screen, contrast ratios for the palette above.
- Responsive behaviour at each breakpoint, including what happens to the 3D on a phone.

Audit the existing sections in src/experience/Experience.tsx and say plainly which survive and which are replaced.`,
  { label: 'ux-designer', phase: 'UX', schema: UX_SCHEMA }
)

phase('Motion')
const motion = await agent(
  `${LAW}

YOU ARE AGENT 3: THE MOTION DESIGNER.
You own timelines, scroll triggers, easing curves, camera choreography and the order beats fire in. You do not choose colours, copy or materials.

BINDING UPSTREAM DECISIONS.
Creative direction:
${JSON.stringify(creative, null, 2)}

UX:
${JSON.stringify(ux, null, 2)}

SCOPE: ${scope}

Deliver:
- The named easing curve set as exact cubic bezier or gsap ease strings, each with what it is used for. One curve family for the whole site.
- Every timeline: id, trigger, scrub setting, scroll range, and each step as target, property, from, to, position and ease.
- Camera choreography per chapter: position, lookAt, fov, ease, and the cinematographic intent in one line. Dollies and orbits, no linear moves, no shake except on impact.
- The choreography rules: what overlaps, what hands off, and what must never move at the same time as what.
- A real reduced motion fallback per timeline.
- The forbidden list: motions that would break this brand, so the implementer can refuse them.

The client's standing complaint is that the current motion reads as old and unrealistic. Diagnose that in motion terms specifically: weight, anticipation, follow through, secondary motion, overlap, settle. Then specify the values that fix it.
Read src/experience/scenes/book/BookScene.tsx and src/experience/scenes/SceneRoot.tsx and say exactly which numbers in them are wrong.`,
  { label: 'motion-designer', phase: 'Motion', schema: MOTION_SCHEMA }
)

phase('Technical Art')
const techArt = await agent(
  `${LAW}

YOU ARE AGENT 4: THE TECHNICAL ARTIST.
You own shaders, materials, lighting, fog, particle systems and post processing. You do not change timing, layout or story.

BINDING UPSTREAM DECISIONS.
Creative direction:
${JSON.stringify(creative, null, 2)}

UX:
${JSON.stringify(ux, null, 2)}

Motion:
${JSON.stringify(motion, null, 2)}

SCOPE: ${scope}

Deliver:
- Materials per surface with every parameter valued, and how each normal, roughness and AO map is produced procedurally or on a canvas at runtime. No downloaded or paid texture.
- The lighting rig: every light with type, position, colour, intensity, and its shadow settings and tier gate.
- Atmosphere: fog, background, environment and tone mapping.
- Shaders: name, what they are applied to, uniforms with types and animated ranges, whether they patch via onBeforeCompile or replace the material, and the GLSL that matters.
- Particle systems: tier counts, where motion is computed, material, and how many values the CPU writes per frame.
- Post processing stack with parameters and tier gates.
- Budgets: target fps, draw calls, triangles, texture memory, and the degrade strategy when PerformanceMonitor reports decline.

The client's standing complaint is that the render reads as flat and fake. Diagnose it in surface terms: the book is currently MeshStandardMaterial on a BoxGeometry under two lights, with no bevel, no grain, no self shadowing, no environment reflection and no post processing. Specify what turns that into believable leather, paper and gold.
Read src/experience/scenes/book/BookScene.tsx, DustField.tsx, knowledge/KnowledgeField.tsx and SceneRoot.tsx first.`,
  { label: 'technical-artist', phase: 'Technical Art', schema: TECHART_SCHEMA }
)

phase('Lock')
const lock = await agent(
  `${LAW}

YOU ARE AGENT 5A: THE SPEC LOCK AUDITOR.
You design NOTHING. You add no colour, no timing, no material. Your only job is to make this spec safe to implement blind.

THE FOUR SPECS:
Creative direction:
${JSON.stringify(creative, null, 2)}

UX:
${JSON.stringify(ux, null, 2)}

Motion:
${JSON.stringify(motion, null, 2)}

Technical art:
${JSON.stringify(techArt, null, 2)}

Deliver:
- Contradictions between council members, with which side wins. Upstream wins on intent, downstream wins on feasibility.
- Ambiguities: anything an implementer would have to invent. Flag the question, mark it blocking or not. Do NOT answer it yourself.
- Budget risks: where this spec will miss 60fps, named concretely.
- The implementation order as steps, each with the files it touches, what it depends on, and how the implementer proves it landed.
- The definition of done as checkable statements.

Verdict is LOCKED only if an engineer could build this without a single creative decision. Otherwise NEEDS_REVISION.
Be adversarial. A spec that passes your audit and then falls apart in code is your failure.`,
  { label: 'spec-lock', phase: 'Lock', schema: LOCK_SCHEMA }
)

log(`Council verdict: ${lock.verdict}`)
if (lock.contradictions && lock.contradictions.length) {
  log(`${lock.contradictions.length} contradiction(s) resolved.`)
}
const blocking = (lock.ambiguities || []).filter((a) => String(a.blocking).toLowerCase() === 'yes')
if (blocking.length) {
  log(`${blocking.length} BLOCKING ambiguity(ies). These go to the client, not to the implementer.`)
}

return { reference, scope, creative, ux, motion, techArt, lock }
