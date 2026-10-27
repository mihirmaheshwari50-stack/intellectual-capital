window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
const circ = (extra, cap, o = {}) => F.fig(o.w || 320, o.h || 300, F.circ((o.w || 320) / 2, (o.h || 300) / 2, o.r || 110, "k") + extra, cap, { size: o.size || "small" });

/* ============================================================
   CIRCLE THEOREMS  (0580: E4.3, E4.4)
   ============================================================ */
TOPICS.push({
  id: "circles", subject: "maths", unit: 4, title: "Circle theorems",
  blurb: "Circle vocabulary, chord and tangent properties, and every circle theorem: angle in a semicircle, angle at the centre, angles in the same segment, cyclic quadrilaterals, tangent–radius and the alternate segment theorem.",
  level: "Core → Extended", demo: "circleTheorem",
  syllabus: [
    ["E4.3", "Use geometrical properties of circles: centre, radius, diameter, chord, tangent, arc, sector, segment", 0],
    ["E4.3", "A perpendicular from the centre to a chord bisects the chord; equal chords are equidistant from the centre", 1],
    ["E4.3", "A tangent is perpendicular to the radius at the point of contact; tangents from the same external point are equal in length", 2],
    ["E4.4", "Calculate unknown angles using circle theorems: angle in a semicircle, angle at the centre, angles in the same segment", 3],
    ["E4.4", "Calculate unknown angles using circle theorems: cyclic quadrilaterals, alternate segment theorem", 4]
  ],
  sections: [
    { h: "Circle vocabulary (E4.3)", body: M`
${circ(F.line(160, 150, 160, 40, "c thick") + F.text(140, 90, "radius", "tc bold", "end") + F.line(50, 150, 270, 150, "o thick") + F.text(160, 170, "diameter", "to bold") + F.path("M110,230 Q160,260 210,230", "b thick") + F.text(160, 278, "arc", "tb bold") + F.path("M80,180 L240,180", "g thick") + F.text(160, 198, "chord", "tg bold") + F.path("M270,200 L330,230", "r thick") + F.text(300, 190, "tangent", "tr bold"), "Key parts of a circle.")}
<table class="t"><tr><th>Term</th><th>Meaning</th></tr>
<tr><td>Radius</td><td>Centre to any point on the circle</td></tr>
<tr><td>Diameter</td><td>A chord through the centre; $=2\times$radius</td></tr>
<tr><td>Chord</td><td>A straight line joining two points on the circle</td></tr>
<tr><td>Arc</td><td>Part of the circumference</td></tr>
<tr><td>Sector</td><td>Region between two radii and an arc ("pizza slice")</td></tr>
<tr><td>Segment</td><td>Region between a chord and an arc</td></tr>
<tr><td>Tangent</td><td>A line that touches the circle at exactly one point</td></tr>
<tr><td>Cyclic quadrilateral</td><td>A quadrilateral with all 4 vertices on a circle</td></tr></table>`},

    { h: "Chords and perpendicular bisectors (E4.3)", body: M`
${circ(F.line(70, 150, 250, 150, "c thick") + F.line(160, 150, 160, 40, "r thick") + F.rightAngle(160, 150, -1, 0, 0, -1, 14), "The perpendicular from the centre to a chord bisects the chord.")}
<ul><li>A line from the centre <b>perpendicular to a chord bisects it</b> (cuts it in half). The converse is also true: the line joining the centre to the midpoint of a chord is perpendicular to it.</li>
<li><b>Equal chords are equidistant from the centre</b> (and chords the same distance from the centre are equal).</li></ul>
<div class="callout ex"><b class="t">Example</b>A chord of length 16 cm is 6 cm from the centre of a circle. Find the radius.<br>Half the chord is 8 cm; by Pythagoras, $r^2=8^2+6^2=100$, so $r=10$ cm.</div>`},

    { h: "Tangent properties (E4.3)", body: M`
${F.row(
  circ(F.line(160, 40, 160, 150, "c thick") + F.line(40, 260, 280, 40, "r thick").replace('x1="40" y1="260" x2="280" y2="40"', 'x1="60" y1="240" x2="260" y2="60"') + F.rightAngle(160, 150, 0, -1, -1, 1, 14), "A tangent is perpendicular to the radius at the point of contact.", { w: 300, h: 290, r: 110 }),
  circ(F.line(160, 150, 280, 90, "r thick") + F.line(160, 150, 280, 210, "r thick") + F.circ(280, 90, 4, "k kF") + F.circ(280, 210, 4, "k kF") + F.text(295, 150, "P", "tk bold", "start"), "Two tangents from the same external point P are equal in length.", { w: 310, h: 290, r: 110 })
)}
<p>$PA=PB$ (tangents from $P$); triangle $POA\cong$ triangle $POB$ (RHS), so $PO$ <b>bisects</b> angle $APB$ and angle $AOB$.</p>
<details class="check"><summary>Two tangents from point P to a circle of radius 5 cm meet at 70°. Find the distance from P to the centre.</summary><div>Each tangent makes 90° with its radius; half the angle at P is 35°; $\sin35°=5/PO$, so $PO=5/\sin35°=8.72$ cm.</div></details>`},

    { h: "Angle in a semicircle (E4.4)", body: M`
<div class="viz" data-viz="circleTheorem"></div>
${circ(F.line(50, 160, 270, 160, "k thick") + F.line(50, 160, 150, 60, "c thick") + F.line(270, 160, 150, 60, "c thick") + F.rightAngle(150, 60, -1, 1, 1, 1, 16) + F.text(50, 180, "A", "tk bold") + F.text(270, 180, "B", "tk bold") + F.text(150, 42, "C", "tk bold"), "The angle in a semicircle (angle ACB, standing on diameter AB) is always 90°.")}
<div class="callout key"><b class="t">Theorem</b>The angle in a semicircle is a right angle: if $AB$ is a diameter and $C$ is any other point on the circle, angle $ACB=90^\circ$.</div>`},

    { h: "Angle at the centre and angles in the same segment (E4.4)", body: M`
<div class="viz" data-viz="circleCentre"></div>
<div class="callout key"><b class="t">Theorem 1</b>The angle at the <b>centre</b> is <b>twice</b> the angle at the <b>circumference</b>, when both are subtended by the same arc.</div>
${circ(F.line(160, 160, 80, 90, "c thick") + F.line(160, 160, 240, 90, "c thick") + F.line(100, 240, 80, 90, "r thick") + F.line(100, 240, 240, 90, "r thick") + F.text(80, 75, "A", "tk bold") + F.text(240, 75, "A", "tk bold").replace('>A<', '>B<') + F.text(100, 258, "C", "tk bold"), "Angle at centre AOB = 2 × angle at circumference ACB.")}
<div class="callout key"><b class="t">Theorem 2</b>Angles subtended by the same arc at the circumference, on the <b>same side</b> (same segment), are <b>equal</b>.</div>
${circ(F.line(70, 190, 250, 110, "k thick") + F.line(70, 190, 160, 60, "c thick") + F.line(250, 110, 160, 60, "c thick") + F.line(70, 190, 190, 230, "r thick") + F.line(250, 110, 190, 230, "r thick") + F.text(70, 210, "A", "tk bold") + F.text(250, 95, "B", "tk bold") + F.text(160, 42, "C", "tk bold") + F.text(190, 252, "D", "tk bold"), "Angle ACB = angle ADB: both stand on arc AB from the same side.")}`},

    { h: "Cyclic quadrilaterals (E4.4)", body: M`
<div class="viz" data-viz="cyclicQuad"></div>
<div class="callout key"><b class="t">Theorem</b>Opposite angles of a <b>cyclic quadrilateral</b> (all 4 vertices on a circle) sum to $180^\circ$: they are <b>supplementary</b>.</div>
<p>A useful consequence: the <b>exterior</b> angle of a cyclic quadrilateral equals the <b>interior opposite</b> angle (since both pair with the same interior angle to make $180^\circ$).</p>
<details class="check"><summary>ABCD is a cyclic quadrilateral with angle A = 85° and angle B = 110°. Find angles C and D.</summary><div>C = 180 − 85 = 95°. D = 180 − 110 = 70°.</div></details>`},

    { h: "The alternate segment theorem (E4.4)", body: M`
${circ(F.line(60, 260, 270, 110, "r thick") + F.circ(160, 190, 4, "k kF") + F.line(160, 190, 90, 70, "k thick") + F.line(160, 190, 240, 60, "k thick") + F.line(90, 70, 240, 60, "k thick") + F.text(160, 212, "T", "tk bold") + F.text(75, 60, "A", "tk bold") + F.text(252, 48, "B", "tk bold") + F.arc(160, 190, 40, -162, -115, "o", "x", 1.3), "The angle between the tangent at T and chord TA equals angle TBA in the alternate segment.")}
<div class="callout key"><b class="t">Theorem</b>The angle between a <b>tangent</b> and a <b>chord</b> drawn from the point of contact equals the angle subtended by that chord in the <b>alternate segment</b> (the segment on the other side of the chord).</div>
<p><b>Why "alternate":</b> the angle is on the opposite side of the chord from the tangent angle you're matching it with.</p>
<p><b>Spotting it:</b> look for a tangent, a chord from the point of contact, and a triangle formed with a point on the far arc.</p>`},

    { h: "Putting theorems together", body: M`
<p>Harder problems chain several theorems. Work through <b>step by step</b>, writing the <b>reason</b> for every angle you find — reasons are usually worth marks too.</p>
<div class="callout ex"><b class="t">Worked example</b>O is the centre. Angle $AOB=136°$. $C$ is on the major arc. Find angle $ACB$ and angle $OAB$.<br>Angle at centre = 2 × angle at circumference: angle $ACB=136\div2=68°$.<br>Triangle $OAB$ is isosceles ($OA=OB$, radii): angle $OAB=\dfrac{180-136}{2}=22°$.</div>
<table class="t"><tr><th>Circle theorem</th><th>One-line reason to write</th></tr>
<tr><td>Semicircle</td><td>"angle in a semicircle is 90°"</td></tr>
<tr><td>Centre/circumference</td><td>"angle at centre is twice angle at circumference"</td></tr>
<tr><td>Same segment</td><td>"angles in the same segment are equal"</td></tr>
<tr><td>Cyclic quadrilateral</td><td>"opposite angles of a cyclic quadrilateral sum to 180°"</td></tr>
<tr><td>Tangent–radius</td><td>"tangent is perpendicular to the radius"</td></tr>
<tr><td>Two tangents</td><td>"tangents from an external point are equal"</td></tr>
<tr><td>Alternate segment</td><td>"angle between tangent and chord equals angle in alternate segment"</td></tr>
<tr><td>Isosceles radii</td><td>"base angles of isosceles triangle OXY are equal (OX = OY, radii)"</td></tr></table>`}
  ],
  worked: [
    { q: M`O is the centre of a circle. A, B, C lie on the circle with angle $ACB=47°$. Find angle $AOB$ (the reflex or non-reflex angle, as appropriate) and explain.`,
      steps: [M`Angle at the centre is twice the angle at the circumference subtended by the same arc.`, M`Angle $AOB=2\times47=94°$ (the angle on the same side as C).`]},
    { q: M`ABCD is a cyclic quadrilateral. Angle $BAD=112°$ and angle $ABC=85°$. Find angle $BCD$ and angle $ADC$.`,
      steps: [M`Opposite angles sum to 180°.`, M`Angle $BCD=180-112=68°$.`, M`Angle $ADC=180-85=95°$.`]},
    { q: M`TA is a tangent to a circle at A. Chord AB makes an angle of 58° with the tangent. Find the angle subtended by AB at a point C on the major arc.`,
      steps: [M`Alternate segment theorem: the angle between the tangent and chord equals the angle in the alternate segment.`, M`Angle $ACB=58°$.`]}
  ],
  formulas: [["Angle in a semicircle", M`$90^\circ$`], ["Angle at centre", M`$=2\times$ angle at circumference`], ["Same segment", "angles equal"], ["Cyclic quadrilateral", M`opposite angles sum to $180^\circ$`], ["Tangent–radius", M`$90^\circ$ at the point of contact`], ["Two tangents", "equal in length"]],
  cards: [
    ["Angle in a semicircle", "90°"],
    ["Angle at the centre vs circumference", "Centre angle is twice the circumference angle."],
    ["Angles in the same segment", "Equal"],
    ["Opposite angles of a cyclic quadrilateral", "Sum to 180°"],
    ["Angle between tangent and radius", "90°"],
    ["Tangents from the same external point", "Equal in length"],
    ["Alternate segment theorem", "Tangent–chord angle = angle in the alternate segment"],
    ["Perpendicular from centre to a chord", "Bisects the chord"],
    ["Equal chords", "Equidistant from the centre"],
    ["Exterior angle of a cyclic quadrilateral", "Equals the interior opposite angle"],
    ["Triangle formed by two radii", "Isosceles (both sides are radii)"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`AB is a diameter. C is on the circle. Angle ACB =`, opts: ["45°", "60°", "90°", "depends on position"], ans: 2, why: M`Angle in a semicircle.` },
    { type: "mcq", marks: 1, q: M`The angle at the centre is 100°. The angle at the circumference on the same arc is`, opts: ["50°", "100°", "200°", "80°"], ans: 0, why: M`Half the centre angle.` },
    { type: "mcq", marks: 1, q: M`In a cyclic quadrilateral, one angle is 76°. The opposite angle is`, opts: ["76°", "104°", "180°", "14°"], ans: 1, why: M`$180-76$.` },
    { type: "mcq", marks: 1, q: M`A tangent meets a radius at the point of contact at`, opts: ["45°", "60°", "90°", "it varies"], ans: 2, why: M`Always 90°.` },
    { type: "struct", marks: 2, q: M`O is the centre. Angle at the centre AOB = 150°. Find angle ACB where C is on the major arc.`, ms: M`<b>M1</b> half of 150<br><b>A1</b> 75°` },
    { type: "struct", marks: 3, q: M`ABCD is a cyclic quadrilateral with angle DAB = 97° and angle ABC = 103°. Find angle BCD and angle CDA.`, ms: M`<b>M1</b> opposite angles sum to 180°<br><b>A1</b> BCD = 83°<br><b>A1</b> CDA = 77°` },
    { type: "struct", marks: 3, q: M`PA and PB are tangents to a circle centre O, touching at A and B. Angle APB = 50°. Find angle AOB.`, ms: M`<b>M1</b> angles in quadrilateral OAPB sum to 360°<br><b>M1</b> two right angles (tangent ⟂ radius) = 180°<br><b>A1</b> angle AOB = 360 − 180 − 50 = 130°` },
    { type: "struct", marks: 3, q: M`A chord of length 24 cm is drawn in a circle of radius 13 cm. Find its distance from the centre.`, ms: M`<b>M1</b> half chord = 12<br><b>M1</b> $d=\sqrt{13^2-12^2}$<br><b>A1</b> 5 cm` },
    { type: "struct", marks: 3, q: M`TA is a tangent at A. Angle between TA and chord AB is 64°. Find the angle subtended by AB at a point on the major arc, and state the theorem used.`, ms: M`<b>B1</b> 64°<br><b>B1</b> alternate segment theorem<br><b>B1</b> correctly identifies the angle position` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`Name the circle theorem that gives angle ACB = 90° when AB is a diameter.`, ms: M`<b>B1</b> angle in a semicircle` },
    { d: 1, type: "struct", marks: 2, q: M`O is the centre of a circle, angle at centre = 84°. Find the angle at the circumference on the same arc.`, ms: M`<b>M1</b> ÷2<br><b>A1</b> 42°` },
    { d: 1, type: "mcq", marks: 1, q: M`A tangent and the radius to the point of contact meet at`, opts: ["0°", "45°", "90°", "180°"], ans: 2, why: M`Right angle.` },
    { d: 1, type: "struct", marks: 2, q: M`In a cyclic quadrilateral, angle B = 68° and angle D = 2x. Find x.`, ms: M`<b>M1</b> $68+2x=180$<br><b>A1</b> $x=56$` },
    { d: 2, type: "struct", marks: 3, q: M`A, B, C, D lie on a circle. Angle ACB = 35° and angle ADB = 2y − 5. Find y.`, ms: M`<b>M1</b> angles in the same segment are equal<br><b>M1</b> $2y-5=35$<br><b>A1</b> $y=20$` },
    { d: 2, type: "struct", marks: 3, q: M`PA and PB are tangents from P to a circle, centre O, radius 6 cm. OP = 10 cm. Find the length of PA.`, ms: M`<b>M1</b> angle OAP = 90° (tangent ⟂ radius)<br><b>M1</b> Pythagoras: $PA^2=10^2-6^2$<br><b>A1</b> 8 cm` },
    { d: 2, type: "struct", marks: 3, q: M`Chord AB subtends an angle of 76° at the centre O. Find the two base angles of isosceles triangle OAB.`, ms: M`<b>M1</b> OA = OB (radii), isosceles<br><b>M1</b> $(180-76)\div2$<br><b>A1</b> 52° each` },
    { d: 3, type: "struct", marks: 4, q: M`O is the centre of a circle. A, B, C are on the circumference, with B between the arcs so that angle AOB = 124° and angle BOC = 110° (both non-reflex, together making up angle AOC the long way round is not needed). Find the reflex angle AOC, and the angle ABC at the circumference standing on the reflex angle.`, ms: M`<b>M1</b> angles at a point sum to 360°: reflex AOC = 360 − 124 − 110<br><b>A1</b> reflex AOC = 126°<br><b>M1</b> angle at centre = 2 × angle at circumference<br><b>A1</b> angle ABC = 126 ÷ 2 = 63°` },
    { d: 3, type: "struct", marks: 4, q: M`TA is a tangent to a circle at A; AB is a chord, and C is a point on the major arc. Angle BAT = 40° and angle ABC = 75°. Find angle ACB and angle BAC.`, ms: M`<b>B1</b> angle ACB = 40° (alternate segment theorem)<br><b>M1</b> angles in triangle ABC sum to 180°<br><b>A1</b> angle BAC = 180 − 40 − 75 = 65°` },
    { d: 3, type: "struct", marks: 4, q: M`ABCD is a cyclic quadrilateral with angle ABC = 100°. TA is a tangent at A, and the angle between TA and chord AB is 55°. Find angle ADC and angle ACB.`, ms: M`<b>M1</b> angle ADC = 180 − 100 = 80° (cyclic quadrilateral)<br><b>A1</b> 80°<br><b>M1</b> alternate segment theorem: angle ACB = angle between tangent TA and chord AB<br><b>A1</b> angle ACB = 55°` }
  ]
});
}
