# error shape and status codes

What the backend specialists in this seat have learned working on Pinnacle AI.
- The vulnerable line was 6 lines below where you'd expect to check body shape — messages filtering happens first, so the new guard has to sit right after JSON.parse and before the messages reduce, not inline with the other message validation.
