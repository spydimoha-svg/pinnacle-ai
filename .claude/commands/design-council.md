---
description: Run the five agent design council over a Claude Design reference, then implement the locked spec verbatim
argument-hint: <path to the Claude Design reference> [| scope | extra constraints]
---

Run the design council over the reference the user just supplied.

Arguments given: $ARGUMENTS

Steps, in order. Do not skip and do not improvise.

1. Resolve the reference. `$ARGUMENTS` is normally a path under `design/reference/`. If it is a URL, fetch it and save it to `design/reference/` first so the council reads a stable file. If it is empty, ask which reference to use and stop.

2. Read the reference yourself before spawning anything. You need to know what the council is being asked to serve.

3. Call the `design-council` workflow:
   - `name: "design-council"`
   - `args: { reference: "<resolved path>", scope: "<scope or omit>", notes: "<extra constraints or omit>" }`

4. When it returns, write the full spec to `design/law/DESIGN_LAW.md` using the template at `design/law/TEMPLATE.md`. That file is now law. Every value in the implementation traces back to a line in it.

5. Report the verdict, the resolved contradictions, and any BLOCKING ambiguity. A blocking ambiguity goes to the user as a question. You never answer it yourself.

6. If the verdict is `LOCKED` and nothing is blocking, implement the `implementationOrder` step by step. You are the engineer. Read `design/IMPLEMENTER.md` and obey it: no redesign, no substitutions, no improvements. If a spec value is wrong or impossible, stop and report it. Do not fix it by taste.

7. Verify each step the way the spec's `verify` field says to verify it. Screenshot means take the screenshot and look at it.
