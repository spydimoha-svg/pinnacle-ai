# The design council

Five agents. Four design, one builds. The design output is law.

## Why this exists

The previous approach had one agent designing and engineering in the same breath. That agent kept making creative decisions mid implementation, which is how the experience ended up looking like nobody had directed it. Separating the two is the fix: the council decides, the engineer types.

## The five

| # | Agent | Owns | Never touches |
|---|---|---|---|
| 1 | Creative director | Story, brand emotion, user journey, palette, type voice | Layout, timing, materials |
| 2 | UX designer | Layout, navigation, components, states, accessibility, responsive | Story, timing, materials |
| 3 | Motion designer | Timelines, ScrollTrigger, easing curves, camera choreography, beat order | Colour, copy, materials |
| 4 | Technical artist | Shaders, materials, lighting, fog, particles, post FX, frame budget | Timing, layout, story |
| 5 | Claude Code | Engineering only | Every creative decision above |

A sixth pass, the spec lock auditor, runs after agent 4. It designs nothing. It only hunts for contradictions between the four, flags anything an engineer would have to invent, and produces the implementation order.

They run in sequence, not in parallel. Each inherits the one above as binding. Running motion and technical art at the same time would produce two specs that disagree about what the frame budget is for.

## The flow

```
Claude Design  ->  design/reference/<file>
                        |
                        v
              /design-council <file>
                        |
        1 creative -> 2 ux -> 3 motion -> 4 tech art -> lock
                        |
                        v
             design/law/DESIGN_LAW.md   (binding)
                        |
                        v
              Claude Code implements verbatim
```

## How to use it

1. Produce the design in Claude Design.
2. Save or paste it into `design/reference/`. Anything readable works: HTML, a screenshot, a markdown spec, a Figma link.
3. Run `/design-council design/reference/<your file>`.
4. Read the verdict. Answer any blocking question. Nobody else may answer it.
5. The engineer builds `design/law/DESIGN_LAW.md` step by step and verifies each step the way the spec says.

Optional second and third arguments narrow the scope and add constraints:

```
/design-council design/reference/hero.html | chapters 1 to 4 only | keep the existing crimson spine leak
```

## The rules that never move

- The reference is law. The council serves it and does not improve it.
- Free and open source only. No paid API, asset, font or plugin.
- The engineer implements and does not design. Full charter in `IMPLEMENTER.md`.
- A spec that is wrong gets revised, not patched in code.
- Nothing ships to production without an explicit go.
