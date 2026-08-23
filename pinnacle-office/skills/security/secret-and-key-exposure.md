# secret and key exposure

What the security specialists in this seat have learned working on Pinnacle AI.
- master-login.ts parsed req.json() before its own rate-limit checks ran, so the size cap had to sit ahead of the rate-limit block too, not just ahead of JSON.parse — otherwise a large body still gets buffered and decoded on every rate-limited attempt.
