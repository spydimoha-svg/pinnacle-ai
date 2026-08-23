# anonymous to registered upgrade

What the auth specialists in this seat have learned working on Pinnacle AI.
- signInAnonymously() in this file is reached via two distinct paths: a brand-new student who never synced (expected, no stored session) and a returning student whose stored session died and whose signInWithPassword retry also failed (silent data-loss risk). Gate any future warning/logging on `hadStoredSession` (or equivalent) to avoid alarming on the normal new-user path.
