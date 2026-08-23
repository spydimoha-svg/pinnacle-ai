# mobile responsive behaviour

What the frontend specialists in this seat have learned working on Pinnacle AI.
- This dev environment cannot run `npm run dev` or use mcp__chrome-devtools__emulate (both need approval that isn't granted to this role) and the browser window has a hard floor around 504px CSS width, so true 360px testing isn't possible here — the closest honest proxy is 504px, which shares the same breakpoint tier as 360px in this codebase's CSS.
- `.chip`/`.chip-gold`/etc are reused for two different jobs: static read-only badges (dozens of spans across the app) and tappable filter/reply buttons (Papers, Worksheets, Tutor, Videos, Profile). Any future chip sizing change should target `button.chip*` specifically, not the base class, or it'll bloat every badge in the app.
