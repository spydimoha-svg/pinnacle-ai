# navigation and findability

What the ux specialists in this seat have learned working on Pinnacle AI.
- Passwords are stored and compared as plaintext (store.ts login(): u.password === password), not hashed. A 'reveal password' action is just a matter of rendering the existing field — no backend lookup needed. Whoever builds this should know they're exposing plaintext by design, not adding a new leak.
- addStudent() has no counterpart updateStudent()/resetPassword() in the store yet — a reset action needs a new store method that mutates extraUsers in place by id and re-runs linkCloudProfile() so the change also lands in Supabase auth, otherwise the student can reset locally on the admin's browser but still log in with the old password from their own device.
- extraUsers is local-only state (persisted via zustand persist), so this roster only shows students created on this admin's own browser/device. A lookup/reset UI here will silently miss students enrolled from a different device, which is a bigger existing gap than this task but shapes what 'lookup' can promise in the copy.
