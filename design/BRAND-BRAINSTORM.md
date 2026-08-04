# Brand identity brainstorm

Ayaan asked for ideas to make the brand better. This is that — a read of what
is already strong, three concrete gaps found while reading the token system,
and a prioritised list of ideas. Nothing in this file is implemented; it is
input for Ayaan to pick from, and for whoever picks an item to run through
`/design-council` if it touches the landing narrative, or straight to code if
it is a token-only fix.

## What is already strong — do not touch without reason

- **"Summit at night."** Ink black, one gold accent, crimson eyebrow, quiet
  mint/coral/sky/violet for subject and status colour. This is a real, held
  point of view, not a template. It reads like a company, not a hackathon
  project.
- **One mark everywhere.** `LogoMark` in `src/components/Logo.tsx` is used in
  the app header, the landing header, the sub-nav and the favicon. No second
  logo drawing exists anywhere. That discipline is rare and worth protecting.
- **The landing's cinematic build.** Portal, DNA helix, depth scan, the
  ridgeline motif — `src/pages/Landing.tsx` and `src/components/landing/**`
  already tell a six-chapter story ("descend into understanding") with a
  fallback path that stays legible if WebGL never paints. This is not a gap.

## Three concrete gaps, found reading the code

1. **`landing.css` leaks five colours outside the token system.**
   `--pa-gold-quiet: #c6a25a`, `--pa-white: #ffffff`, `--pa-ash: #cfcac1`,
   `--pa-grey-2: #a8a29a`, `--pa-grey-3: #bdb8ae`, `--pa-grey-4: #8a857c`
   (landing.css:27, 30, 33, 35–37) are hand-picked hex values that do not
   trace back to a `--color-*` token in `index.css`. Every other landing
   colour maps cleanly (`--pa-gold: var(--color-gold)` etc). This is the one
   direct violation of the department's own rule — "if a value is not a
   token it does not belong in a component" — and it is the cheapest, lowest
   risk fix on this list: fold each into an existing near-neighbour token
   (`--pa-grey-2/3/4` are all within a few percent of `--color-muted` /
   `--color-dim`) or promote them to real tokens in `index.css` if the design
   genuinely needs a fourth grey step.
2. **No social share card.** `index.html` has no `og:image`, `og:title`,
   `og:description` or `twitter:card`. A parent who shares a Pinnacle AI link
   in a WhatsApp family group — which is the single most likely way this
   product actually spreads in the target market — gets a bare grey link box,
   not a preview. This is a trust surface, not decoration: it is often the
   first thing a parent sees, before the landing page loads at all.
2b. There is no static image to point `og:image` at yet (`public/landing/`
   only has the two WebGL fallback stills). Whoever picks this up needs a
   1200×630 export of the gold peak on ink black before the meta tags do
   anything.
3. **`LandingClassic.tsx` still ships.** A second, earlier landing page lives
   at `src/pages/LandingClassic.tsx` alongside the current one. Not a design
   flaw by itself, but worth Ayaan's eyes: if it is not reachable from any
   route it is dead weight in the bundle; if it is reachable (an A/B path, a
   fallback), that is two brand voices a visitor could land on depending on
   which URL they got.

## Ideas, prioritised

### Tier 1 — small, safe, obviously worth doing
- Fix the six off-token colours above (landing.css:27–37). Half a day, zero
  visual risk if the near-neighbour mapping is checked against a screenshot.
- Add the OG/Twitter card meta tags plus one static export of the mark on the
  ink-black field. Turns every shared link into a brand impression instead of
  a blank box.
- `theme-color` in index.html is already `#050505` (ink) — correct and
  already token-true, worth noting so nobody "fixes" it by accident.

### Tier 2 — worth a `/design-council` pass before anyone builds
- **A second accent for "trust," separate from gold.** Gold currently carries
  every job: merit, the CTA, the wordmark, the shimmer. A parent-facing
  surface (pricing, a security/privacy note, a school sign-up page) arguably
  wants a calmer, less celebratory colour so gold keeps meaning "achievement"
  and doesn't get diluted into "just the brand colour." Candidate: extend the
  existing `--color-sky` role rather than inventing a new hue — it is already
  in the system as a quiet identifier and is unused as a primary action
  colour anywhere.
- **A parent-mode visual register.** Right now the landing's voice ("descend
  into understanding", cinematic scroll) is written for the student who lands
  on it directly. A parent evaluating this for their child in under a minute
  — per the company's own definition of winning — may be better served by a
  calmer, faster-scanning variant of the same tokens: same palette, same
  mark, shorter copy, proof-first (marking-scheme accuracy, data safety)
  instead of narrative-first. This is a content/IA question as much as a
  visual one — flagging it here because it is squarely a brand-trust gap, not
  a request to fork the landing page.
- **Marking-scheme visual motif.** The product's actual differentiator —
  examiner-keyword, marking-scheme answers — has no visual signature yet.
  The `.marks` chip (`[3]` style, index.css:114-117) exists inside the app
  but the landing never shows it. A glimpse of an actual marked answer, styled
  the way a CBSE answer sheet is annotated, would sell the real feature
  instead of an abstract "descend into understanding" metaphor. Strong
  candidate for chapter 02 ("How it teaches") on the landing.

### Tier 3 — bigger bets, need Ayaan's call before any agent touches them
- **A second, quieter landing entry point** for links shared by a school
  (bulk sign-up) versus a single family — different trust signals, same
  tokens. Only worth it if Supply/Growth confirms schools are actually a
  distribution channel yet.
- **Print identity.** Worksheets and generated PDFs are a named product
  surface but were out of scope for this pass (not in `design/**`,
  `src/index.css`, `src/pages/landing.css` or `src/components/**`) — flagging
  because a worksheet a student prints for revision is a brand touchpoint
  with zero on-screen polish applied to it today. Someone in Content or
  Front End owns that file format; Design should be looped in before it ships
  a look of its own.

## Explicit non-ideas

Ruled out on purpose, so nobody re-proposes them:
- **A gradient refresh / different accent hue.** The gold-on-ink identity is
  distinctive and deliberate. Changing the hue for novelty is exactly the
  "generic AI aesthetic" the department guardrail warns against — a new
  purple or blue gradient would make this look like every other AI product,
  not less like one.
- **A second logo mark for the app vs the landing.** Explicitly reversed in
  `Logo.tsx`'s own comment for a documented reason (one brand, one mark). Do
  not re-fork it.
