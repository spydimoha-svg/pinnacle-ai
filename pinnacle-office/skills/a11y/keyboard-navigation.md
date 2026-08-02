# keyboard navigation

What the a11y specialists in this seat have learned working on Pinnacle AI.
- The active-route match in Layout.tsx sorts NAV items by descending 'to' length before matching so nested routes like /app/planner don't false-match against /app (which uses end:true anyway), worth keeping if NAV gains more nested paths without end:true
