# empty and error states

What the frontend specialists in this seat have learned working on Pinnacle AI.
- Worksheets.tsx's genNote was a bare string reused for both success-path notices and hard failures — any future message added there needs a kind of "info"|"error", not just text, or this regresses.
