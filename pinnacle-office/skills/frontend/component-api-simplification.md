# component API simplification

What the frontend specialists in this seat have learned working on Pinnacle AI.
- The design system already ships pnz-shimmer and pnz-glow CSS classes (index.css) used by HeroAscent/Landing — no new CSS effects were needed, only reuse.
- LandingClassic.tsx + HeroAscent.tsx are dead code, kept unrouted on purpose per their own comments — don't touch them expecting user-facing effect.
