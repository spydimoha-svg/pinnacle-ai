import type { Question } from "../../lib/types";

// CLASS 12 PHYSICS — board-style question bank.
// Chapter ids copied verbatim from src/data/curriculum/class12.ts (c12-physics-01 … c12-physics-14).
// Every numerical below has been worked through end to end; constants used are the ones CBSE
// prints on the paper (h = 6.63e-34 J s, e = 1.6e-19 C, m_e = 9.1e-31 kg, 1 u = 931.5 MeV/c^2).

export const C12_PHYSICS_QUESTIONS: Question[] = [
  // ==========================================================================
  // Ch 1 — Electric Charges and Fields
  // ==========================================================================
  {
    id: "q-c12-physics-01-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-01",
    classLevel: 12,
    text: "Derive an expression for the electric field intensity at a point on the axial line of an electric dipole of dipole moment p, at a distance r from its centre. Hence write the expression for a short dipole.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Let the dipole consist of charges −q at A and +q at B, separated by 2a.
Dipole moment p = q(2a), directed from −q to +q.
Let P lie on the axial line at distance r from the centre O, on the side of +q.

Field at P due to +q (directed along OP, i.e. away from B):
E₁ = (1/4πε₀) · q/(r − a)²

Field at P due to −q (directed along PO, i.e. towards A):
E₂ = (1/4πε₀) · q/(r + a)²

Since E₁ and E₂ are oppositely directed and E₁ > E₂, the resultant is along OP:
E = E₁ − E₂ = (1/4πε₀) · q [ 1/(r − a)² − 1/(r + a)² ]
E = (1/4πε₀) · q [ (r + a)² − (r − a)² ] / (r² − a²)²
E = (1/4πε₀) · q (4ar) / (r² − a²)²
E = (1/4πε₀) · 2(q·2a)r / (r² − a²)²

∴ E_axial = (1/4πε₀) · 2pr / (r² − a²)²,  directed along p (from −q to +q).

For a SHORT dipole, r >> a, so a² is neglected in comparison with r²:
E_axial = (1/4πε₀) · 2p / r³

Conclusion: the axial field of a short dipole is (1/4πε₀)(2p/r³), directed parallel to the dipole moment, and it falls off as 1/r³ — faster than the 1/r² field of a point charge.`,
    keywords: [
      "dipole moment p = q(2a)",
      "E = (1/4πε₀)·2pr/(r² − a²)²",
      "short dipole r >> a",
      "E = (1/4πε₀)·2p/r³",
      "directed along p",
    ],
    examinerTip:
      "Marks are lost for not stating the DIRECTION of the resultant field and for not writing the condition r >> a before dropping a² — the approximation step itself carries a mark.",
  },
  {
    id: "q-c12-physics-01-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-01",
    classLevel: 12,
    text: "A point charge q is placed at the centre of a cube of side a. The electric flux through one face of the cube is:\n(a) q/ε₀   (b) q/(6ε₀)   (c) q/(8ε₀)   (d) q/(24ε₀)",
    marks: 1,
    type: "mcq",
    source: "important",
    answer: `(b) q/(6ε₀)

Reason: By Gauss's theorem the total flux through the closed cubical surface is φ_total = q_enclosed/ε₀ = q/ε₀.
The charge sits at the centre, so by symmetry the six faces are equivalent and share the flux equally.
∴ φ_one face = (1/6)(q/ε₀) = q/(6ε₀)`,
    keywords: ["Gauss's theorem", "φ_total = q/ε₀", "symmetry — six identical faces", "q/(6ε₀)"],
    examinerTip:
      "Only the symmetry argument justifies the ÷6 — it works because the charge is at the CENTRE. Move it to a corner and the answer becomes q/(24ε₀), which is why option (d) is there.",
  },

  // ==========================================================================
  // Ch 2 — Electrostatic Potential and Capacitance
  // ==========================================================================
  {
    id: "q-c12-physics-02-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-02",
    classLevel: 12,
    text: "Derive an expression for the electric potential at a point situated at a distance r from a point charge Q. Draw the equipotential surfaces for such a charge.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `Definition: the electric potential at a point is the work done by an external agent in bringing a unit positive charge from infinity to that point, without acceleration.

Let a point charge +Q be at O and P be a point at distance r from O.
Consider a unit positive test charge at a distance x from O.
Electrostatic force on it (repulsive, along outward x̂):
F_E = (1/4πε₀) · Q/x²

The external force needed to move it without acceleration is F_ext = −F_E.
Work done in bringing the test charge from infinity to P:
W = ∫(from ∞ to r) F_ext · dx = −∫(from ∞ to r) (1/4πε₀)(Q/x²) dx
W = −(1/4πε₀) Q [ −1/x ] (from ∞ to r)
W = −(1/4πε₀) Q ( −1/r − 0 )
W = (1/4πε₀) · Q/r

Since the test charge is unity, V = W:
∴ V = (1/4πε₀) · Q/r

Equipotential surfaces: concentric spheres centred on the charge, drawn with increasing spacing outwards (since V ∝ 1/r), each everywhere perpendicular to the radial field lines.

Conclusion: the potential of a point charge is (1/4πε₀)(Q/r) — a scalar, positive for +Q and negative for −Q, and zero at infinity.`,
    keywords: [
      "work done in bringing unit positive charge from infinity",
      "V = (1/4πε₀)·Q/r",
      "V is a scalar; zero at infinity",
      "equipotential surfaces are concentric spheres",
      "equipotential surface ⊥ electric field lines",
    ],
    examinerTip:
      "State 'without acceleration' in the definition and keep the limits ∞ → r on the integral; students who integrate r → ∞ get the sign wrong and lose the derivation mark even though the final formula looks right.",
  },
  {
    id: "q-c12-physics-02-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-02",
    classLevel: 12,
    text: "A parallel plate capacitor is charged by a battery to store energy U₀. The battery is then DISCONNECTED and a dielectric slab of dielectric constant K is inserted so as to completely fill the space between the plates. The energy now stored in the capacitor is:\n(a) K U₀   (b) U₀/K   (c) K² U₀   (d) U₀",
    marks: 1,
    type: "mcq",
    source: "important",
    answer: `(b) U₀/K

Reason: the battery is disconnected, so the CHARGE Q on the plates stays constant.
Capacitance becomes C = K C₀.
Energy U = Q²/(2C) = Q²/(2K C₀) = U₀/K.

∴ the stored energy decreases to U₀/K (the slab is pulled in, so the field does work on it).`,
    keywords: [
      "battery disconnected ⇒ charge Q constant",
      "C = K C₀",
      "U = Q²/2C",
      "energy decreases to U₀/K",
    ],
    examinerTip:
      "The whole question is 'which quantity is held constant'. Battery disconnected ⇒ Q constant ⇒ use U = Q²/2C (energy falls). Battery still connected ⇒ V constant ⇒ use U = ½CV² (energy rises to KU₀). Write that line first, every time.",
  },

  // ==========================================================================
  // Ch 3 — Current Electricity
  // ==========================================================================
  {
    id: "q-c12-physics-03-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-03",
    classLevel: 12,
    text: "(a) Define drift velocity and relaxation time. Derive an expression for the drift velocity of free electrons in a conductor in terms of the applied electric field. (b) Hence deduce Ohm's law and obtain an expression for the resistivity of the conductor in terms of the number density of free electrons and the relaxation time.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `(a) DEFINITIONS
Drift velocity (v_d): the average velocity with which free electrons in a conductor get drifted in a direction opposite to the applied electric field.
Relaxation time (τ): the average time interval between two successive collisions of an electron with the ions/atoms of the lattice.

DERIVATION OF DRIFT VELOCITY
Let a potential difference V be applied across a conductor of length l and uniform area of cross-section A, having n free electrons per unit volume.
Electric field set up:  E = V/l
Force on each electron:  F = −eE
Acceleration:  a = F/m = −eE/m

If u₁, u₂, … u_N are the thermal (random) velocities of the N free electrons just after their last collision and t₁, t₂, … t_N the times elapsed since then, the velocity of the i-th electron is
v_i = u_i + a t_i

Averaging over all N electrons:
v_d = (1/N) Σ v_i = (1/N) Σ u_i + a (1/N) Σ t_i

The thermal velocities are completely random, so (1/N) Σ u_i = 0, and (1/N) Σ t_i = τ.
∴ v_d = a τ = −(eE/m) τ

Magnitude:  v_d = eEτ/m  (directed opposite to E)

(b) DEDUCTION OF OHM'S LAW
In time Δt all electrons within a length v_d Δt cross any section, so the charge crossing is
q = n A v_d Δt · e
Current:  I = q/Δt = n e A v_d
Substituting v_d = eEτ/m:
I = n e A (eEτ/m) = (n e² A τ / m) E
Putting E = V/l:
I = (n e² A τ / m) · (V/l)

⇒ V/I = m l / (n e² A τ)

At constant temperature n, τ, m, e, l and A are all constants, so V/I is a constant = R.
∴ V = IR, i.e. V ∝ I — this is Ohm's law.

RESISTIVITY
Comparing R = m l /(n e² A τ) with R = ρ l/A:
∴ ρ = m / (n e² τ)   and   σ = 1/ρ = n e² τ / m

Conclusion: drift velocity v_d = eEτ/m, current I = neAv_d, V ∝ I at constant temperature (Ohm's law), and the resistivity of the material is ρ = m/(ne²τ).`,
    keywords: [
      "average velocity opposite to applied field",
      "relaxation time τ — average time between successive collisions",
      "v_d = eEτ/m",
      "I = n e A v_d",
      "ρ = m/(n e² τ)",
      "V ∝ I at constant temperature",
    ],
    examinerTip:
      "The mark for Ohm's law is for the sentence 'at constant temperature n, τ, l, A are constant, therefore V/I is constant' — not for writing V = IR. Also state explicitly that the average thermal velocity is zero, since that is a separate marked step.",
  },
  {
    id: "q-c12-physics-03-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-03",
    classLevel: 12,
    text: "A copper wire of cross-sectional area 1.0 × 10⁻⁷ m² carries a steady current of 1.5 A. If the number density of free electrons in copper is 8.5 × 10²⁸ m⁻³, estimate the drift speed of the electrons. (e = 1.6 × 10⁻¹⁹ C)",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Formula:  I = n e A v_d  ⇒  v_d = I / (n e A)

Substitution:
v_d = 1.5 / [ (8.5 × 10²⁸ m⁻³)(1.6 × 10⁻¹⁹ C)(1.0 × 10⁻⁷ m²) ]
v_d = 1.5 / (1.36 × 10³)

Result:
v_d = 1.1 × 10⁻³ m s⁻¹  (≈ 1.1 mm s⁻¹)

Conclusion: the drift speed is only about a millimetre per second — the current appears instantly not because electrons move fast, but because the electric field is set up along the conductor at nearly the speed of light.`,
    keywords: ["I = n e A v_d", "v_d = I/(neA)", "1.1 × 10⁻³ m/s", "very small drift speed"],
    examinerTip:
      "Convert nothing and drop nothing: the area is already in m². The commonest loss is writing the answer without the unit m s⁻¹, or quoting mm s⁻¹ while the arithmetic was done in metres.",
  },

  // ==========================================================================
  // Ch 4 — Moving Charges and Magnetism
  // ==========================================================================
  {
    id: "q-c12-physics-04-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-04",
    classLevel: 12,
    text: "State Biot–Savart law. Using it, derive an expression for the magnetic field at a point on the axis of a circular current-carrying loop of radius R, at a distance x from its centre. Hence find the field at the centre of the loop.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `BIOT–SAVART LAW
The magnitude of the magnetic field dB due to a current element I dl at a point whose position vector relative to the element is r is
dB = (μ₀/4π) · I |dl × r̂| / r² = (μ₀/4π) · I dl sinθ / r²
where θ is the angle between dl and r. In vector form:
dB = (μ₀/4π) · I (dl × r̂)/r²
The direction of dB is perpendicular to the plane containing dl and r, given by the right-hand screw rule.

DERIVATION — FIELD ON THE AXIS OF A CIRCULAR LOOP
Let a circular loop of radius R carry current I. Let P be a point on its axis at distance x from the centre O.
Consider a small current element I dl on the loop. Its distance from P is
r = √(R² + x²)
The element dl is perpendicular to r, so θ = 90° and sinθ = 1.

∴ dB = (μ₀/4π) · I dl / (R² + x²)

dB is perpendicular to the plane containing dl and r. Resolve dB into:
• a component dB sinφ = dB · R/√(R² + x²), along the axis
• a component dB cosφ = dB · x/√(R² + x²), perpendicular to the axis

For every element there is a diametrically opposite element whose perpendicular component is equal and opposite, so ALL perpendicular components cancel in pairs. Only the axial components add up.

B = ∮ dB · R/√(R² + x²)
B = (μ₀/4π) · I R / (R² + x²)^{3/2} · ∮ dl
Since ∮ dl = 2πR (circumference):
B = (μ₀/4π) · I R (2πR) / (R² + x²)^{3/2}

∴ B = μ₀ I R² / [ 2 (R² + x²)^{3/2} ],  directed along the axis of the loop.

FIELD AT THE CENTRE
Put x = 0:
B = μ₀ I R² / (2 R³)
∴ B_centre = μ₀ I / (2R)

Conclusion: the axial field of a circular loop is μ₀IR²/[2(R²+x²)^{3/2}], directed along the axis (sense given by the right-hand thumb rule), reducing to μ₀I/2R at the centre. For N turns, multiply by N.`,
    keywords: [
      "dB = (μ₀/4π)·I dl sinθ/r²",
      "perpendicular components cancel in pairs by symmetry",
      "∮dl = 2πR",
      "B = μ₀IR²/[2(R² + x²)^{3/2}]",
      "B_centre = μ₀I/2R",
    ],
    examinerTip:
      "The symmetry sentence — 'the perpendicular components of diametrically opposite elements cancel' — is a marked step; a derivation that silently integrates only the axial component loses it. Also state that dl ⊥ r so sinθ = 1.",
  },

  {
    id: "q-c12-physics-04-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-04",
    classLevel: 12,
    text: "Two long straight parallel conductors carry currents of 5 A and 8 A in the same direction. They are separated by a distance of 4 cm. Calculate the force per unit length between the two conductors, and state whether it is attractive or repulsive. (μ₀ = 4π × 10⁻⁷ T m A⁻¹)",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Formula:  F/l = μ₀ I₁ I₂ / (2π d)

Substitution:
F/l = (4π × 10⁻⁷ × 5 × 8) / (2π × 0.04)
F/l = (4 × 10⁻⁷ × 40) / (2 × 0.04)     [π cancels]
F/l = (1.6 × 10⁻⁵) / (0.08)

Result:
F/l = 2 × 10⁻⁴ N m⁻¹

Since the currents are in the SAME direction, the force is ATTRACTIVE.

Conclusion: the two wires attract each other with a force of 2 × 10⁻⁴ N per metre of length.`,
    keywords: [
      "F/l = μ₀I₁I₂/(2πd)",
      "π cancels between μ₀ and 2π",
      "F/l = 2 × 10⁻⁴ N/m",
      "same direction currents ⇒ attractive",
    ],
    examinerTip:
      "State the direction rule explicitly — like currents (same direction) attract, unlike currents repel. This one line is a separate mark from the numerical value.",
  },

  // ==========================================================================
  // Ch 5 — Magnetism and Matter
  // ==========================================================================
  {
    id: "q-c12-physics-05-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-05",
    classLevel: 12,
    text: "Distinguish between diamagnetic, paramagnetic and ferromagnetic substances on the basis of (i) magnetic susceptibility and (ii) their behaviour in a non-uniform magnetic field. Give one example of each.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `DIAMAGNETIC
(i) Susceptibility χ is small and NEGATIVE (−1 ≤ χ < 0); relative permeability μ_r < 1.
(ii) Feebly repelled by a magnet; in a non-uniform field it moves from the stronger to the weaker part of the field.
Example: bismuth (also copper, water, nitrogen).

PARAMAGNETIC
(i) Susceptibility χ is small and POSITIVE (0 < χ << 1); μ_r slightly > 1. χ varies inversely with temperature (Curie's law, χ ∝ 1/T).
(ii) Feebly attracted; in a non-uniform field it moves from the weaker to the stronger part of the field.
Example: aluminium (also sodium, calcium, oxygen).

FERROMAGNETIC
(i) Susceptibility χ is very large and POSITIVE (χ >> 1); μ_r >> 1.
(ii) Strongly attracted; in a non-uniform field it moves rapidly from the weaker to the stronger part of the field.
Example: iron (also cobalt, nickel, gadolinium).

Conclusion: the sign and magnitude of χ separates the three classes — χ negative (dia), small positive (para), very large positive (ferro); above the Curie temperature a ferromagnetic substance becomes paramagnetic.`,
    keywords: [
      "χ small and negative; μ_r < 1",
      "χ small and positive; μ_r slightly > 1",
      "χ very large and positive; μ_r >> 1",
      "moves from stronger to weaker field (diamagnetic)",
      "moves from weaker to stronger field (para/ferro)",
      "bismuth / aluminium / iron",
    ],
    examinerTip:
      "Write the sign of χ, not just 'low' or 'high' — the sign is the mark. And answer the field question in the direction asked (strong → weak for diamagnetic); saying only 'repelled' is half an answer.",
  },

  {
    id: "q-c12-physics-05-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-05",
    classLevel: 12,
    text: "A short bar magnet is placed in a uniform external magnetic field of 0.16 T, with its axis making an angle of 30° with the field. It experiences a torque of 0.032 N m. Calculate the magnetic moment of the magnet.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Formula:  τ = M B sinθ  ⇒  M = τ / (B sinθ)

Substitution:
M = 0.032 / (0.16 × sin30°)
M = 0.032 / (0.16 × 0.5)
M = 0.032 / 0.08

Result:
M = 0.4 J T⁻¹  (A m²)

Conclusion: the magnetic moment of the bar magnet is 0.4 J T⁻¹.`,
    keywords: ["τ = M B sinθ", "M = τ/(B sinθ)", "M = 0.4 J/T"],
    examinerTip:
      "Use sinθ, not cosθ — torque on a dipole is τ = M × B, whose magnitude involves sin of the angle between the dipole axis and the field, a common mix-up with the potential energy formula U = −MB cosθ.",
  },

  // ==========================================================================
  // Ch 6 — Electromagnetic Induction
  // ==========================================================================
  {
    id: "q-c12-physics-06-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-06",
    classLevel: 12,
    text: "Define self-inductance of a coil. Derive an expression for the self-inductance of a long air-cored solenoid of length l, area of cross-section A and having N turns.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `DEFINITION
The self-inductance L of a coil is numerically equal to the magnetic flux linked with the coil when unit current flows through it: Nφ = L I.
Equivalently, L is numerically equal to the emf induced in the coil when the current through it changes at unit rate: ε = −L (dI/dt).
SI unit: henry (H).

DERIVATION
Let a long solenoid of length l and cross-sectional area A have N turns, so the number of turns per unit length is
n = N/l

For a long solenoid, the magnetic field well inside is uniform and axial:
B = μ₀ n I

Magnetic flux through ONE turn:
φ = B A = μ₀ n I A

Total flux linkage with all N turns:
Nφ = N (μ₀ n I A) = (n l)(μ₀ n I A)      [since N = n l]
Nφ = μ₀ n² l A I

But by definition Nφ = L I. Comparing:

∴ L = μ₀ n² l A = μ₀ N² A / l

Conclusion: the self-inductance of a long air-cored solenoid is L = μ₀N²A/l henry — it depends only on the geometry (N, A, l) and the medium, not on the current. If a core of relative permeability μ_r is inserted, L = μ₀ μ_r n² l A, which is why iron cores are used to obtain large inductance.`,
    keywords: [
      "Nφ = L I",
      "B = μ₀ n I inside a long solenoid",
      "flux linkage Nφ = μ₀ n² l A I",
      "L = μ₀ n² l A = μ₀ N² A / l",
      "depends on geometry and medium, not on current",
    ],
    examinerTip:
      "Use the total flux LINKAGE Nφ, not the flux φ through one turn — forgetting the factor N is the single commonest error and it costs the answer mark (you get N instead of N²).",
  },

  {
    id: "q-c12-physics-06-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-06",
    classLevel: 12,
    text: "A circular coil of 100 turns and area 0.01 m² is placed with its plane perpendicular to a magnetic field. The field is increased steadily from 0.2 T to 0.8 T in 0.1 s. Calculate the emf induced in the coil.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Formula:  ε = N (dΦ/dt) = N A (dB/dt)

Substitution:
dB = 0.8 − 0.2 = 0.6 T,  dt = 0.1 s
ε = 100 × 0.01 × (0.6 / 0.1)
ε = 100 × 0.01 × 6

Result:
ε = 6 V

Conclusion: an emf of 6 V is induced in the coil while the field is changing.`,
    keywords: ["ε = N dΦ/dt", "Φ = BA (field ⊥ plane)", "dB/dt = 6 T/s", "ε = 6 V"],
    examinerTip:
      "The area A is constant here — only B changes, so dΦ/dt = A(dB/dt). If instead the coil were being rotated or resized, the product rule for Φ = BA cosθ would be needed.",
  },

  // ==========================================================================
  // Ch 7 — Alternating Current
  // ==========================================================================
  {
    id: "q-c12-physics-07-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-07",
    classLevel: 12,
    text: "(a) A series LCR circuit is connected to an AC source of voltage v = v_m sin ωt. Using a phasor diagram, obtain an expression for the impedance of the circuit and the phase angle between the voltage and the current. (b) State the condition for resonance and obtain the resonant frequency. (c) A series LCR circuit with L = 5.0 H, C = 80 μF and R = 40 Ω is connected to a variable-frequency 230 V source. Find the resonant angular frequency and the rms current at resonance.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `(a) PHASOR DIAGRAM AND IMPEDANCE
In a series LCR circuit the same current i = i_m sin(ωt + φ) flows through all three elements. Take the current phasor I along the reference direction.
• V_R is in phase with I           → V_R = I R
• V_L leads I by π/2                → V_L = I X_L,  X_L = ωL
• V_C lags I by π/2                 → V_C = I X_C,  X_C = 1/ωC

V_L and V_C are antiparallel, so their resultant is (V_L − V_C).
From the right-angled phasor triangle (V_R along the base, (V_L − V_C) perpendicular to it):

V² = V_R² + (V_L − V_C)²
V² = (IR)² + (I X_L − I X_C)²
V = I √( R² + (X_L − X_C)² )

∴ Impedance  Z = V/I = √( R² + (X_L − X_C)² ) = √( R² + (ωL − 1/ωC)² )

Phase angle:
tan φ = (V_L − V_C)/V_R = (X_L − X_C)/R
∴ φ = tan⁻¹[ (ωL − 1/ωC) / R ]
If X_L > X_C the current LAGS the voltage (inductive); if X_C > X_L the current LEADS the voltage (capacitive).

(b) RESONANCE
At resonance the circuit is purely resistive, i.e. X_L = X_C:
ω₀L = 1/(ω₀C)
ω₀² = 1/(LC)

∴ Resonant angular frequency  ω₀ = 1/√(LC),   resonant frequency f₀ = 1/(2π√(LC))
At resonance Z is MINIMUM and equal to R, the current is MAXIMUM (i_rms = V_rms/R) and φ = 0.

(c) NUMERICAL
Formula: ω₀ = 1/√(LC)
Substitution: ω₀ = 1/√(5.0 H × 80 × 10⁻⁶ F) = 1/√(4.0 × 10⁻⁴) = 1/(2.0 × 10⁻²)
Result: ω₀ = 50 rad s⁻¹

At resonance Z = R = 40 Ω.
Formula: I_rms = V_rms / R
Substitution: I_rms = 230 V / 40 Ω
Result: I_rms = 5.75 A ≈ 5.8 A

Conclusion: Z = √(R² + (X_L − X_C)²), φ = tan⁻¹[(X_L − X_C)/R]; at ω₀ = 1/√(LC) = 50 rad s⁻¹ the impedance drops to R = 40 Ω and the rms current peaks at 5.75 A.`,
    keywords: [
      "V_L leads I by π/2; V_C lags I by π/2",
      "Z = √(R² + (X_L − X_C)²)",
      "tan φ = (X_L − X_C)/R",
      "resonance condition X_L = X_C",
      "ω₀ = 1/√(LC)",
      "at resonance Z = R minimum, current maximum",
    ],
    examinerTip:
      "The phasor diagram itself carries a mark — draw it and label V_R, V_L, V_C and I. In part (c) students substitute 80 instead of 80 × 10⁻⁶ F; convert μF to farad before touching the square root.",
  },

  {
    id: "q-c12-physics-07-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-07",
    classLevel: 12,
    text: "A step-up transformer has 200 turns on its primary coil and 4000 turns on its secondary coil. If the primary is connected to a 220 V AC mains supply, calculate the voltage across the secondary (assume an ideal transformer).",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Formula:  V_s / V_p = N_s / N_p

Substitution:
V_s = V_p × (N_s / N_p)
V_s = 220 × (4000 / 200)
V_s = 220 × 20

Result:
V_s = 4400 V

Conclusion: the secondary voltage is 4400 V, stepped up because N_s > N_p, consistent with an ideal transformer where power input equals power output.`,
    keywords: ["V_s/V_p = N_s/N_p", "step-up ⇒ N_s > N_p", "V_s = 4400 V"],
    examinerTip:
      "Turns ratio gives the voltage ratio directly for an IDEAL transformer only — real transformers have copper and iron losses, which is why part (b) style questions often ask you to state that assumption.",
  },

  // ==========================================================================
  // Ch 8 — Electromagnetic Waves
  // ==========================================================================
  {
    id: "q-c12-physics-08-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-08",
    classLevel: 12,
    text: "The displacement current between the plates of a parallel plate capacitor being charged is given by:\n(a) ε₀ (dΦ_E/dt)   (b) μ₀ (dΦ_B/dt)   (c) ε₀ (dΦ_B/dt)   (d) −(dΦ_E/dt)",
    marks: 1,
    type: "mcq",
    source: "important",
    answer: `(a) ε₀ (dΦ_E/dt)

Reason: Maxwell showed that a changing electric field between the capacitor plates behaves like a current, called the displacement current:
i_d = ε₀ (dΦ_E/dt)
where Φ_E is the electric flux between the plates. It is exactly equal to the conduction current i_c in the connecting wires, which makes Ampere's circuital law consistent for any surface bounded by the same loop (Ampere–Maxwell law):
∮ B·dl = μ₀ (i_c + i_d)`,
    keywords: [
      "displacement current i_d = ε₀ dΦ_E/dt",
      "changing electric flux",
      "Ampere–Maxwell law",
      "i_d = i_c",
    ],
    examinerTip:
      "Do not mix it up with Faraday's law (dΦ_B/dt gives induced emf, not displacement current). Displacement current comes from the changing ELECTRIC flux and carries the constant ε₀, not μ₀.",
  },

  {
    id: "q-c12-physics-08-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-08",
    classLevel: 12,
    text: "A microwave oven operates at a frequency of 2450 MHz. Calculate the wavelength of the microwaves it produces. (c = 3 × 10⁸ m s⁻¹)",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Formula:  c = f λ  ⇒  λ = c/f

Substitution:
λ = (3 × 10⁸ m s⁻¹) / (2450 × 10⁶ Hz)
λ = (3 × 10⁸) / (2.45 × 10⁹)

Result:
λ = 0.1224 m ≈ 12.2 cm

Conclusion: the wavelength of the microwaves is about 12.2 cm, which lies in the microwave region of the electromagnetic spectrum (between radio waves and infrared).`,
    keywords: ["c = fλ", "λ = c/f", "λ ≈ 12.2 cm", "microwave region of EM spectrum"],
    examinerTip:
      "Convert MHz to Hz before dividing (×10⁶), and keep c and f in the same unit system — mixing cm and m mid-calculation is the commonest slip here.",
  },

  // ==========================================================================
  // Ch 9 — Ray Optics and Optical Instruments
  // ==========================================================================
  {
    id: "q-c12-physics-09-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-09",
    classLevel: 12,
    text: "(a) Derive the lens maker's formula 1/f = (n − 1)(1/R₁ − 1/R₂) for a thin double convex lens of refractive index n kept in air, stating the assumptions made. (b) A double convex lens made of glass of refractive index 1.55 has both faces of the same radius of curvature 20 cm. Find its focal length.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `(a) DERIVATION

Assumptions:
1. The lens is THIN, so its thickness is negligible compared with the object and image distances.
2. The object is a point object lying on the principal axis.
3. The aperture is small and the rays are PARAXIAL (make small angles with the principal axis).

Let the lens be made of material of refractive index n₂, kept in a medium of refractive index n₁, with the two surfaces having radii of curvature R₁ and R₂.
The image is formed in two steps.

STEP 1 — Refraction at the first surface (n₁ → n₂), radius R₁.
Object at O, distance u. It would form an intermediate image I₁ at distance v₁.
Using the refraction-at-a-single-spherical-surface formula:
n₂/v₁ − n₁/u = (n₂ − n₁)/R₁      … (i)

STEP 2 — Refraction at the second surface (n₂ → n₁), radius R₂.
I₁ acts as the (virtual) object for the second surface, at distance v₁; the final image is at v.
n₁/v − n₂/v₁ = (n₁ − n₂)/R₂      … (ii)

Adding (i) and (ii), the n₂/v₁ terms cancel:
n₁/v − n₁/u = (n₂ − n₁)/R₁ + (n₁ − n₂)/R₂
n₁/v − n₁/u = (n₂ − n₁)(1/R₁ − 1/R₂)

Dividing throughout by n₁:
1/v − 1/u = (n₂/n₁ − 1)(1/R₁ − 1/R₂)

For an object at infinity (u = ∞), the image forms at the principal focus, v = f:
1/f = (n₂/n₁ − 1)(1/R₁ − 1/R₂)

For a lens kept in AIR, n₁ = 1 and n₂ = n:

∴ 1/f = (n − 1)(1/R₁ − 1/R₂)     — the lens maker's formula.

(b) NUMERICAL
Given: n = 1.55, R₁ = +20 cm, R₂ = −20 cm (Cartesian sign convention: for a double convex lens the second surface is concave to the incoming light).

Formula: 1/f = (n − 1)(1/R₁ − 1/R₂)
Substitution:
1/f = (1.55 − 1) [ 1/20 − 1/(−20) ] cm⁻¹
1/f = (0.55)(1/20 + 1/20) = (0.55)(2/20) = (0.55)(0.1)
1/f = 0.055 cm⁻¹

Result: f = 1/0.055 = 18.18 cm ≈ 18.2 cm

Conclusion: the focal length is about +18.2 cm; the positive sign confirms the lens is converging.`,
    keywords: [
      "thin lens, paraxial rays, small aperture",
      "n₂/v₁ − n₁/u = (n₂ − n₁)/R₁",
      "n₁/v − n₂/v₁ = (n₁ − n₂)/R₂",
      "1/f = (n − 1)(1/R₁ − 1/R₂)",
      "R₁ = +20 cm, R₂ = −20 cm",
      "f ≈ +18.2 cm, converging",
    ],
    examinerTip:
      "In part (b) the marks are won or lost on the SIGN of R₂. For a double convex lens R₁ = +20 cm and R₂ = −20 cm; writing both as +20 gives 1/f = 0 and an infinite focal length. Also state the assumptions in (a) — they are separately marked.",
  },

  {
    id: "q-c12-physics-09-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-09",
    classLevel: 12,
    text: "The refractive index of glass with respect to air is 1.5. Calculate the critical angle for a ray of light travelling from glass to air.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Formula:  sin C = 1/n   (n = refractive index of glass w.r.t. air)

Substitution:
sin C = 1/1.5 = 0.667

Result:
C = sin⁻¹(0.667)
C ≈ 41.8°

Conclusion: for angles of incidence in glass greater than about 41.8°, light travelling towards the rarer medium (air) undergoes total internal reflection instead of refracting out.`,
    keywords: [
      "sin C = 1/n",
      "n = 1.5 ⇒ sin C = 0.667",
      "C ≈ 41.8°",
      "total internal reflection beyond C",
    ],
    examinerTip:
      "Use n = refractive index of the DENSER medium (glass) with respect to the rarer one (air) in sin C = 1/n — using the reciprocal by mistake gives sin C > 1, which is impossible and is a common self-check to catch the error.",
  },

  // ==========================================================================
  // Ch 10 — Wave Optics
  // ==========================================================================
  {
    id: "q-c12-physics-10-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-10",
    classLevel: 12,
    text: "In Young's double-slit experiment the two slits are 0.28 mm apart and the screen is placed 1.4 m away. The distance between the central bright fringe and the fourth bright fringe is measured to be 1.2 cm. (a) Write the expression for fringe width and determine the wavelength of the light used. (b) How would the fringe width change if the entire apparatus were immersed in water of refractive index 4/3?",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(a) FRINGE WIDTH AND WAVELENGTH
Fringe width (separation between two consecutive bright or dark fringes):
β = λD/d

Position of the n-th bright fringe from the centre:
x_n = n λ D / d

Given: d = 0.28 mm = 0.28 × 10⁻³ m, D = 1.4 m, n = 4, x₄ = 1.2 cm = 1.2 × 10⁻² m

Formula: x₄ = 4λD/d  ⇒  λ = x₄ d / (4 D)

Substitution:
λ = (1.2 × 10⁻² m)(0.28 × 10⁻³ m) / (4 × 1.4 m)
λ = (3.36 × 10⁻⁶) / (5.6)

Result: λ = 6.0 × 10⁻⁷ m = 600 nm

(b) APPARATUS IMMERSED IN WATER
Frequency is unchanged, but the wavelength in water is
λ_w = λ / n = λ / (4/3) = 3λ/4

Since β ∝ λ (D and d are unchanged),
β_w = λ_w D / d = (3/4)(λD/d) = (3/4) β

Conclusion: the wavelength used is 600 nm, and on immersing the apparatus in water the fringe width DECREASES to three-fourths of its value in air (the fringe pattern contracts).`,
    keywords: [
      "β = λD/d",
      "x_n = n λ D / d",
      "λ = x₄ d / 4D",
      "λ = 6.0 × 10⁻⁷ m = 600 nm",
      "λ_w = λ/n ⇒ β_w = 3β/4",
      "fringe width decreases",
    ],
    examinerTip:
      "x₄ is the distance of the FOURTH fringe from the centre, so divide by 4 — students who use β = 1.2 cm directly get four times the wavelength. Convert mm and cm to metres before substituting, and quote λ in nm as well.",
  },

  {
    id: "q-c12-physics-10-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-10",
    classLevel: 12,
    text: "Unpolarised light of intensity I₀ is incident on a polaroid. The transmitted light then falls on a second polaroid (analyser) whose pass axis makes an angle of 60° with that of the first. Find the intensity of light emerging from the analyser, in terms of I₀.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `STEP 1 — First polaroid (unpolarised light)
Unpolarised light passing through a polaroid is reduced to half its intensity, regardless of the orientation of the pass axis:
I₁ = I₀/2

STEP 2 — Second polaroid (Malus's law)
The light emerging from the first polaroid is now plane polarised, so Malus's law applies at the analyser:
I₂ = I₁ cos²θ,  θ = 60°

Substitution:
I₂ = (I₀/2) × cos²60°
I₂ = (I₀/2) × (1/2)²
I₂ = (I₀/2) × (1/4)

Result:
I₂ = I₀/8

Conclusion: the intensity of light emerging from the analyser is I₀/8.`,
    keywords: [
      "unpolarised light through first polaroid ⇒ I₁ = I₀/2",
      "Malus's law I₂ = I₁ cos²θ",
      "cos²60° = 1/4",
      "I₂ = I₀/8",
    ],
    examinerTip:
      "The halving rule (I₀/2) applies ONLY at the first polaroid, where the incident light is unpolarised. Malus's law (cos²θ) applies only from the second polaroid onwards, where the incident light is already polarised — mixing these two steps up is the standard error.",
  },

  // ==========================================================================
  // Ch 11 — Dual Nature of Radiation and Matter
  // ==========================================================================
  {
    id: "q-c12-physics-11-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-11",
    classLevel: 12,
    text: "(a) Write Einstein's photoelectric equation and use it to explain why photoemission does not take place below a certain threshold frequency, however intense the incident radiation may be. (b) The work function of caesium metal is 2.14 eV. Light of frequency 6.0 × 10¹⁴ Hz is incident on the metal surface. Calculate the maximum kinetic energy of the emitted photoelectrons and the stopping potential. (h = 6.63 × 10⁻³⁴ J s, 1 eV = 1.6 × 10⁻¹⁹ J)",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `(a) EINSTEIN'S PHOTOELECTRIC EQUATION
Radiation of frequency ν consists of photons each of energy hν. A photon is absorbed by a single electron in a one-to-one collision. Part of the energy, equal to the work function φ₀, is spent in liberating the electron from the metal surface; the rest appears as kinetic energy:

K_max = hν − φ₀   (with φ₀ = hν₀, where ν₀ is the threshold frequency)
i.e.  K_max = h(ν − ν₀)

Explanation: kinetic energy cannot be negative, so emission is possible only if hν ≥ φ₀, i.e. ν ≥ ν₀.
If ν < ν₀, a single photon simply does not carry enough energy to free an electron. Increasing the INTENSITY only increases the NUMBER of photons per second, not the energy hν of each photon — and since one electron absorbs only one photon, no electron can accumulate enough energy. Hence no photoemission occurs below the threshold frequency, however intense the radiation.

(b) NUMERICAL
Formula: E = hν
Substitution: E = (6.63 × 10⁻³⁴ J s)(6.0 × 10¹⁴ s⁻¹) = 3.978 × 10⁻¹⁹ J
In eV: E = 3.978 × 10⁻¹⁹ / 1.6 × 10⁻¹⁹ = 2.49 eV

Formula: K_max = hν − φ₀
Substitution: K_max = 2.49 eV − 2.14 eV
Result: K_max = 0.35 eV  ( = 0.35 × 1.6 × 10⁻¹⁹ = 5.6 × 10⁻²⁰ J )

Formula: e V₀ = K_max  ⇒  V₀ = K_max / e
Substitution: V₀ = (0.35 eV)/e
Result: V₀ = 0.35 V

Conclusion: the maximum kinetic energy of the photoelectrons is 0.35 eV and the stopping potential is 0.35 V.`,
    keywords: [
      "K_max = hν − φ₀ = h(ν − ν₀)",
      "one photon is absorbed by one electron",
      "intensity increases number of photons, not energy per photon",
      "K_max = 0.35 eV",
      "stopping potential V₀ = 0.35 V",
    ],
    examinerTip:
      "The explanation mark is for saying that intensity raises the NUMBER of photons but never the energy hν of a single photon, and that one electron absorbs only one photon. In (b), if K_max is in eV then V₀ is numerically the same in volts — do not divide by 1.6 × 10⁻¹⁹ again.",
  },

  {
    id: "q-c12-physics-11-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-11",
    classLevel: 12,
    text: "An electron, initially at rest, is accelerated through a potential difference of 100 V. Calculate the de Broglie wavelength associated with it. (h = 6.63 × 10⁻³⁴ J s, m_e = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C)",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `The kinetic energy gained equals the work done by the accelerating field: (1/2)mv² = eV, so the momentum is
p = mv = √(2 m e V)

Formula:  λ = h/p = h / √(2 m e V)

Substitution:
2 m e V = 2 × (9.1 × 10⁻³¹)(1.6 × 10⁻¹⁹)(100) = 2.912 × 10⁻⁴⁷
√(2.912 × 10⁻⁴⁷) = 5.40 × 10⁻²⁴ kg m s⁻¹

λ = (6.63 × 10⁻³⁴) / (5.40 × 10⁻²⁴)

Result:
λ ≈ 1.23 × 10⁻¹⁰ m = 1.23 Å

Conclusion: the de Broglie wavelength of the electron is about 1.23 Å — comparable to the spacing between atoms in a crystal, which is why electron beams of this energy show diffraction from a crystal lattice.`,
    keywords: [
      "eV = (1/2)mv² ⇒ p = √(2meV)",
      "λ = h/p",
      "λ ≈ 1.23 × 10⁻¹⁰ m = 1.23 Å",
      "comparable to interatomic spacing",
    ],
    examinerTip:
      "Students often forget to take the square root of 2meV before dividing into h, getting an answer three orders of magnitude off. Keep every quantity in SI units throughout — do not switch to eV mid-calculation.",
  },

  // ==========================================================================
  // Ch 12 — Atoms
  // ==========================================================================
  {
    id: "q-c12-physics-12-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-12",
    classLevel: 12,
    text: "State Bohr's postulates for the hydrogen atom. Using them, derive an expression for the radius of the n-th orbit of the electron. Hence calculate the radius of the first Bohr orbit.",
    marks: 3,
    type: "sa",
    source: "important",
    answer: `BOHR'S POSTULATES
1. (Stationary orbits) The electron revolves round the nucleus only in certain permitted circular orbits, called stationary orbits, in which it does NOT radiate energy.
2. (Quantisation of angular momentum) Only those orbits are permitted for which the angular momentum of the electron is an integral multiple of h/2π:
   m v r = n h / 2π,  n = 1, 2, 3, …
3. (Frequency condition) Energy is emitted or absorbed only when the electron jumps from one stationary orbit to another, the frequency being given by hν = E_i − E_f.

DERIVATION OF THE RADIUS OF THE n-th ORBIT
The electrostatic attraction of the nucleus provides the necessary centripetal force. For hydrogen (Z = 1):

(1/4πε₀)(e²/r²) = m v² / r
⇒ m v² = e² / (4πε₀ r)      … (i)

From Bohr's second postulate:
v = n h / (2π m r)      … (ii)

Substituting (ii) in (i):
m [ n h / (2π m r) ]² = e² / (4πε₀ r)
m · n² h² / (4π² m² r²) = e² / (4πε₀ r)
n² h² / (4π² m r²) = e² / (4πε₀ r)

Cross-multiplying and solving for r:
r = 4πε₀ n² h² / (4π² m e²)

∴ r_n = n² h² ε₀ / (π m e²)

So r_n ∝ n² — the orbits are not equally spaced but crowd apart as n².

RADIUS OF THE FIRST BOHR ORBIT (n = 1)
Substitution:
r₁ = (1)²(6.63 × 10⁻³⁴ J s)²(8.85 × 10⁻¹² C² N⁻¹ m⁻²) / [ π (9.1 × 10⁻³¹ kg)(1.6 × 10⁻¹⁹ C)² ]
r₁ = (4.40 × 10⁻⁶⁷ × 8.85 × 10⁻¹²) / (7.32 × 10⁻⁶⁸)
r₁ = 3.89 × 10⁻⁷⁸ / 7.32 × 10⁻⁶⁸

Result: r₁ = 5.3 × 10⁻¹¹ m = 0.53 Å

Conclusion: r_n = n²h²ε₀/(πme²), i.e. r_n ∝ n²; the radius of the first orbit — the Bohr radius — is 0.53 Å.`,
    keywords: [
      "stationary orbits — electron does not radiate",
      "m v r = n h/2π",
      "electrostatic force provides centripetal force",
      "r_n = n² h² ε₀ / (π m e²)",
      "r_n ∝ n²",
      "r₁ = 0.53 Å = 5.3 × 10⁻¹¹ m",
    ],
    examinerTip:
      "Write the force-balance equation and the quantisation condition as two clearly numbered equations before eliminating v — the marking scheme awards those two steps separately. Quoting r_n ∝ n² without the derivation scores nothing.",
  },

  {
    id: "q-c12-physics-12-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-12",
    classLevel: 12,
    text: "Using the Rydberg formula, calculate the wavelength of the first line of the Balmer series (transition from n = 3 to n = 2) in the hydrogen spectrum. (R = 1.097 × 10⁷ m⁻¹)",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `Formula:  1/λ = R ( 1/n_f² − 1/n_i² ),  n_f = 2, n_i = 3

Substitution:
1/λ = R ( 1/2² − 1/3² ) = R ( 1/4 − 1/9 ) = R (5/36)
1/λ = (1.097 × 10⁷)(0.1389)
1/λ = 1.524 × 10⁶ m⁻¹

Result:
λ = 1 / (1.524 × 10⁶)
λ = 6.56 × 10⁻⁷ m = 656 nm

Conclusion: the first line of the Balmer series (Hα) has a wavelength of about 656 nm, in the red region of the visible spectrum.`,
    keywords: [
      "1/λ = R(1/n_f² − 1/n_i²)",
      "Balmer series ⇒ n_f = 2",
      "5/36 factor for n_i = 3",
      "λ ≈ 656 nm (Hα, red)",
    ],
    examinerTip:
      "For the Balmer series n_f is always 2 (the electron falls TO the n=2 level); confusing n_f and n_i flips the sign inside the bracket and gives a negative, meaningless wavelength.",
  },

  // ==========================================================================
  // Ch 13 — Nuclei
  // ==========================================================================
  {
    id: "q-c12-physics-13-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-13",
    classLevel: 12,
    text: "CASE STUDY: Read the passage and answer the questions that follow.\n\nThe mass of every nucleus is found to be LESS than the sum of the masses of its constituent protons and neutrons. This difference in mass is converted into the energy that binds the nucleons together, in accordance with Einstein's mass-energy relation E = mc². When the binding energy per nucleon is plotted against the mass number A, the curve rises steeply for light nuclei, becomes almost flat at about 8.5 MeV per nucleon in the range A ≈ 30 to A ≈ 120 (peaking near ⁵⁶Fe), and then falls slowly to about 7.6 MeV per nucleon for A ≈ 240. Nuclei near the peak of this curve are the most tightly bound and hence the most stable.\n\n(i) Define mass defect. (1 mark)\n(ii) Calculate the binding energy of the ⁸O¹⁶ nucleus. Given: mass of ¹H atom = 1.007825 u, mass of neutron = 1.008665 u, mass of ⁸O¹⁶ atom = 15.994915 u, 1 u = 931.5 MeV/c². (2 marks)\n(iii) Why does the binding energy per nucleon decrease for nuclei with A > 56, and which nuclear process does this make possible? (1 mark)",
    marks: 4,
    type: "case",
    source: "important",
    answer: `(i) MASS DEFECT
The mass defect (Δm) of a nucleus is the difference between the sum of the masses of its constituent nucleons in the free state and the actual mass of the nucleus:
Δm = [ Z m_p + (A − Z) m_n ] − M_nucleus
It is this missing mass that appears as the binding energy of the nucleus (E_b = Δm c²).

(ii) BINDING ENERGY OF ⁸O¹⁶
For ⁸O¹⁶: Z = 8 protons, A − Z = 16 − 8 = 8 neutrons.
(Atomic masses are used throughout, so the 8 electron masses cancel between the 8 hydrogen atoms and the oxygen atom.)

Formula: Δm = [ Z m(¹H) + (A − Z) m_n ] − M(⁸O¹⁶)

Substitution:
Δm = [ 8 × 1.007825 u + 8 × 1.008665 u ] − 15.994915 u
Δm = [ 8.062600 u + 8.069320 u ] − 15.994915 u
Δm = 16.131920 u − 15.994915 u
Δm = 0.137005 u

Formula: E_b = Δm × 931.5 MeV/u
Substitution: E_b = 0.137005 × 931.5 MeV

Result: E_b = 127.6 MeV
(Binding energy per nucleon = 127.6/16 = 7.98 MeV per nucleon.)

(iii) WHY BE/NUCLEON FALLS FOR A > 56
The nuclear force is short-range and saturates — a nucleon interacts only with its immediate neighbours, so the attractive binding contribution grows roughly in proportion to A. The Coulomb repulsion, however, is long-range and acts between EVERY pair of protons, so it grows roughly as Z². In heavy nuclei this rising repulsion increasingly offsets the attraction, and the binding energy per nucleon falls.

Process made possible: NUCLEAR FISSION — a heavy nucleus (e.g. ²³⁵U) splits into two middle-mass nuclei which lie nearer the peak of the curve and therefore have a HIGHER binding energy per nucleon. The nucleons become more tightly bound, and the difference in binding energy is released as energy.

Conclusion: the binding energy of ⁸O¹⁶ is 127.6 MeV (≈ 7.98 MeV per nucleon), and the fall of the curve beyond A ≈ 56 is what makes fission of heavy nuclei energy-releasing.`,
    keywords: [
      "Δm = [Z m_p + (A − Z) m_n] − M_nucleus",
      "E_b = Δm c² = Δm × 931.5 MeV",
      "Δm = 0.137005 u",
      "E_b = 127.6 MeV",
      "nuclear force is short-range and saturates; Coulomb repulsion ∝ Z²",
      "fission — products have higher BE per nucleon",
    ],
    examinerTip:
      "Do not round Δm early — 0.137005 u carries the answer, and rounding to 0.14 u gives 130 MeV and loses the accuracy mark. Also note that because ATOMIC masses are given, the electron masses cancel; do not subtract them separately.",
  },

  {
    id: "q-c12-physics-13-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-13",
    classLevel: 12,
    text: "The half-life of a radioactive substance is 30 days. Calculate (a) its decay constant, and (b) the time taken for its activity to fall to one-fourth of its initial value.",
    marks: 2,
    type: "vsa",
    source: "important",
    answer: `(a) DECAY CONSTANT
Formula:  λ = 0.693 / T½

Substitution:  λ = 0.693 / 30
Result:  λ = 0.0231 day⁻¹

(b) TIME FOR ACTIVITY TO FALL TO 1/4
Activity A = A₀ e^(−λt), and A/A₀ = (1/2)^n where n is the number of half-lives elapsed.
A/A₀ = 1/4 = (1/2)²  ⇒  n = 2 half-lives

Substitution:  t = n × T½ = 2 × 30

Result:  t = 60 days

Conclusion: the decay constant is 0.0231 per day, and the activity falls to a quarter of its initial value after 60 days — two half-lives.`,
    keywords: [
      "λ = 0.693/T½",
      "λ = 0.0231 day⁻¹",
      "A/A₀ = (1/2)ⁿ",
      "1/4 = (1/2)² ⇒ 2 half-lives",
      "t = 60 days",
    ],
    examinerTip:
      "For simple fractions like 1/2, 1/4, 1/8 it is faster and safer to count half-lives directly than to solve e^(−λt) = 1/4 for t — both give 60 days, but the half-life route avoids a logarithm and an arithmetic slip.",
  },

  // ==========================================================================
  // Ch 14 — Semiconductor Electronics
  // ==========================================================================
  {
    id: "q-c12-physics-14-1",
    subjectId: "c12-physics",
    chapterId: "c12-physics-14",
    classLevel: 12,
    text: "(a) With the help of a circuit diagram, explain the working of a full-wave rectifier using a centre-tap transformer and two junction diodes. Draw the input and output waveforms. (b) Explain briefly how a depletion region and a barrier potential are formed in a p-n junction.",
    marks: 5,
    type: "la",
    source: "important",
    answer: `(a) FULL-WAVE RECTIFIER

Circuit: the AC input is fed to the primary of a centre-tapped transformer. The two ends A and B of the secondary are connected to the p-sides of diodes D₁ and D₂ respectively. The n-sides of both diodes are joined together and taken to one end of the load resistance R_L; the centre tap of the secondary is connected to the other end of R_L. The output is taken across R_L.

Working:
The centre tap makes the voltages at A and B always OPPOSITE in sign with respect to the centre tap.

• During the POSITIVE half cycle of the input, end A is positive with respect to the centre tap. Therefore D₁ is FORWARD biased and conducts, while D₂ is simultaneously REVERSE biased and does not conduct. Current flows through D₁ and then through R_L from top to bottom.

• During the NEGATIVE half cycle, end B is positive with respect to the centre tap. Now D₂ is FORWARD biased and conducts, while D₁ is REVERSE biased. Current flows through D₂ and then through R_L — again from top to bottom, i.e. in the SAME direction as before.

Hence the two diodes conduct in alternate half cycles, but the current through the load is unidirectional in BOTH half cycles. The output is a pulsating DC.

Waveforms:
• Input: a full sinusoid — alternate positive and negative half cycles.
• Output across R_L: a series of positive pulses in BOTH half cycles (both halves rectified, no gaps).

(A capacitor filter across R_L is used to smooth this pulsating DC.)

(b) FORMATION OF DEPLETION REGION AND BARRIER POTENTIAL

In a p-n junction the p-side has a high concentration of holes and the n-side a high concentration of electrons.
1. Because of this concentration gradient, holes DIFFUSE from p → n and electrons diffuse from n → p, giving a diffusion current.
2. A hole that leaves the p-side leaves behind an immobile NEGATIVE acceptor ion; an electron that leaves the n-side leaves behind an immobile POSITIVE donor ion. Diffusing carriers also recombine near the junction.
3. Thus a narrow region on either side of the junction is left with no free charge carriers, only immobile charged ions. This is the DEPLETION REGION (negative space charge on the p-side, positive space charge on the n-side).
4. This space charge sets up an electric field from the n-side to the p-side, and hence a potential difference across the junction called the BARRIER POTENTIAL (V_b ≈ 0.3 V for Ge, ≈ 0.7 V for Si). It opposes further diffusion and drives a drift current in the opposite sense.
5. Equilibrium is reached when the drift current becomes equal and opposite to the diffusion current, so that the net current is zero.

Conclusion: in a full-wave rectifier each diode conducts for one half cycle and the load current is unidirectional for the whole cycle; in a p-n junction, diffusion followed by the build-up of immobile space charge creates the depletion region and the barrier potential, which halt further diffusion at equilibrium.`,
    keywords: [
      "centre-tap transformer; two diodes conduct in alternate half cycles",
      "D₁ forward biased in the positive half cycle, D₂ in the negative half cycle",
      "current through R_L is in the same direction in both halves",
      "pulsating DC output; both halves rectified",
      "diffusion of majority carriers leaves immobile ions ⇒ depletion region",
      "barrier potential opposes diffusion; diffusion current = drift current at equilibrium",
    ],
    examinerTip:
      "The output waveform must show pulses in BOTH half cycles with no gaps — drawing the half-wave output (gaps in alternate halves) is the commonest error. And the key sentence for full marks is that the current through R_L flows in the SAME direction in both half cycles.",
  },
  {
    id: "q-c12-physics-14-2",
    subjectId: "c12-physics",
    chapterId: "c12-physics-14",
    classLevel: 12,
    text: "Which of the following statements about a Zener diode is correct?\n(a) It is always operated in the forward-biased region.\n(b) It is a special-purpose diode used as a voltage regulator, operated in the reverse breakdown region.\n(c) It generates an AC voltage from a DC input.\n(d) It has an I-V characteristic identical to an ordinary p-n junction diode.",
    marks: 1,
    type: "mcq",
    source: "important",
    answer: `(b) It is a special-purpose diode used as a voltage regulator, operated in the reverse breakdown region.

Reason: a Zener diode is heavily doped so that it has a sharp, well-defined reverse breakdown voltage (the Zener voltage V_Z). Once reverse biased beyond V_Z, the voltage across it stays almost constant even as the current through it changes considerably — this is exactly the property exploited to hold a load voltage steady, i.e. voltage regulation.`,
    keywords: [
      "heavily doped ⇒ sharp reverse breakdown at V_Z",
      "operated in reverse breakdown region",
      "voltage across it stays nearly constant",
      "used as a voltage regulator",
    ],
    examinerTip:
      "The one word that decides this question is 'reverse' — a Zener diode is deliberately operated in reverse breakdown, unlike an ordinary diode which is damaged by reaching that region.",
  },
];
