# rate limit handling

What the backend specialists in this seat have learned working on Pinnacle AI.
- The timeout signal covers the full fetch lifecycle including body streaming, not just connect/headers, since AbortSignal.timeout fires unconditionally at N ms after creation regardless of activity — so 20s was picked generously to avoid cutting off a genuinely slow-but-working stream. If a future provider needs longer to finish streaming a full answer, AI_PROVIDER_TIMEOUT_MS is the escape hatch.
