# input validation

What the backend specialists in this seat have learned working on Pinnacle AI.
- The size check reads the full body with req.text() and measures via TextEncoder before parsing, so it correctly rejects oversized payloads even if they are not valid JSON, avoiding wasted parse work on garbage.
