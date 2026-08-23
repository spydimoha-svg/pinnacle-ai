# privacy policy

What the legal specialists in this seat have learned working on Pinnacle AI.
- The User type (src/lib/types.ts) has no field for date of birth, guardian name, or guardian contact — a consent flow can't be bolted onto the current data model without a schema change first, this isn't just a missing UI screen.
- Enrollment is admin-initiated, not self-service: the school admin (src/pages/admin/Students.tsx) creates the account and hands the student a password. The student never goes through any screen a consent checkbox could live on, and neither does a parent — the whole notice-and-consent moment structurally doesn't exist in this flow.
- DPDP Rules 2025 (notified 13 Nov 2025) Rule 10 requires verifiable parental consent by specific technical means (e.g. DigiLocker-linked identity), not a self-declared checkbox — so even a quick checkbox fix would not itself be compliant.
