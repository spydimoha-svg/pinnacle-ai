# circuit diagrams

What the diagrams specialists in this seat have learned working on Pinnacle AI.
- The geometry and circuit SVG renderers in ui.tsx share label classes (geom-vertex, geom-side) but circuits use a different wrapper class (tutor-circuit vs tutor-geom) — any new label class added to CircuitSymbol needs its CSS rule to explicitly include .tutor-circuit or it silently falls back to unstyled black text.
