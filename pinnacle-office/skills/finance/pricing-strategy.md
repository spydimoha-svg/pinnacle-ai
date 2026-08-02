# pricing strategy

What the finance specialists in this seat have learned working on Pinnacle AI.
- PricingControl.tsx's own 'blended price' divides MRR by ALL students including Free-plan ones (line 36: mrr/totalStudents), which understates the real price a paying student pays and has nothing to do with cost — it's a revenue-only metric wearing a cost-adjacent name. Any future cost/breakeven UI on this page needs a separate calculation, not a reuse of `blended`.
