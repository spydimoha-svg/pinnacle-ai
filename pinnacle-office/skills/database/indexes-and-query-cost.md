# indexes and query cost

What the database specialists in this seat have learned working on Pinnacle AI.
- authToken already had a stray try/catch around JSON.parse only — the outer network calls (setSession, signInWithPassword, signInAnonymously, updateUser) were unguarded, so wrap the whole function body, not just the parse step.
