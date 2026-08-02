# keyboard navigation

What the a11y specialists in this seat have learned working on Pinnacle AI.
- The active-route match in Layout.tsx sorts NAV items by descending 'to' length before matching so nested routes like /app/planner don't false-match against /app (which uses end:true anyway), worth keeping if NAV gains more nested paths without end:true
- Modal had zero focus handling before this, not even an initial focus target, so any keyboard user could tab straight through the dialog into the page behind it. The fix uses a single keydown listener scoped to the open effect rather than per-element handlers, since the dialog's children are arbitrary and unknown to Modal itself.
