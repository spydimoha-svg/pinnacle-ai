# colour system and contrast

What the frontend specialists in this seat have learned working on Pinnacle AI.
- -color-faint in index.css is only actually used by landing.css — safe to touch without any ripple into the dashboard/admin/master surfaces, unlike --color-dim which 30 files depend on.
- landing.css deliberately keeps its own --pa-* palette aliases scoped to .pa-root so the front door and the product can't drift apart silently — extend that pattern rather than touching @theme tokens directly when a fix is entry-page-only.
