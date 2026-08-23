# auth bypass paths

What the security specialists in this seat have learned working on Pinnacle AI.
- The ownership check query (`.in('id', ids)`, no school filter) can't be reused for the cap check because it needs the opposite filter (`.eq('school_id', ...)`, no id filter) — they're two separate round trips to Supabase, not something to dedupe.
