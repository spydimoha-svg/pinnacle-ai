# session and token handling

What the security specialists in this seat have learned working on Pinnacle AI.
- timingSafeEqual throws if the two buffers differ in length, so you must check .length equality first and treat that mismatch as a fail-closed 401, not skip the safe compare.
- The existing failure-logging pattern in this file uses template strings with the userId and a trailing colon-prefixed detail (see the signInWithPassword warning a few lines above) — matched that style for the new warning.
- This seat has no live Supabase access at all — no MCP server, no psql, no way to run a REST/RPC query against the project. Any task that says 'verify against the live project' needs that tool granted first, or it's unverifiable from here no matter how carefully the schema file is read.
