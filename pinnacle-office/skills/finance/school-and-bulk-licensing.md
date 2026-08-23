# school and bulk licensing

What the finance specialists in this seat have learned working on Pinnacle AI.
- Every AI feature in this app (chat, worksheets, journal reflections, video storyboards) routes through the single /api/chat endpoint and the same provider chain in api/_llm.ts — there is no separate cost surface to model per feature, and no per-token billing exists anywhere in the stack. The constraint is Groq's free 30 RPM / 6,000 TPM / 14,400 RPD per-model quota, not a dollar figure.
- Per code comments in api/_llm.ts as of this reading, the Gemini key is over its daily free quota and the Cerebras account is out of credit — meaning in practice Groq alone (3 chained models) is currently carrying the entire tutor. That's a single point of failure the finance model has to assume, not a diversified free-provider portfolio.
- School B2B edtech in India (Extramarks) prices per student PER YEAR (₹100-500), not per month like a consumer SaaS. Pinnacle's current /pricing sticker (₹100-200/month = ₹1,200-2,400/year) is priced against the wrong reference class entirely.
