window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;

/* ============================================================
   ANGLES, POLYGONS & CONSTRUCTIONS  (0580: E4.1, E4.2, E4.5, E4.6, E6.7)
   ============================================================ */
TOPICS.push({
  id: "angles", subject: "maths", unit: 4, title: "Angles, polygons & constructions",
  blurb: "Angle facts at a point, on a line and between parallel lines, triangle and polygon angle sums, interior and exterior angles, symmetry, bearings, and ruler-and-compass constructions and loci.",
  level: "Core → Extended", demo: "construct",
  syllabus: [
    ["E4.1", "Use geometrical terms; use and interpret vocabulary of triangles, quadrilaterals, polygons and solids", 0],
    ["E4.2", "Calculate unknown angles using properties of angles at a point, on a line, in a triangle, and parallel lines", 1],
    ["E4.2", "Calculate unknown angles using properties of quadrilaterals, and interior/exterior angles of polygons", 3],
    ["E4.5", "Calculate lengths and angles using properties of similar and congruent shapes (see Similarity & congruence)", 0],
    ["E4.6", "Recognise and describe line and rotational symmetry in two dimensions, including order of symmetry", 6],
    ["E4.7", "Use and interpret three-figure bearings (see Trigonometry)", 0],
    ["E6.7", "Measure and draw lines and angles; construct a triangle given three sides; construct perpendiculars, angle bisectors and simple loci", 7]
  ],
  sections: [
    { h: "Basic angle facts (E4.2)", body: M`
<div class="viz" data-viz="angleFacts"></div>
<table class="t"><tr><th>Fact</th><th>Rule</th></tr>
<tr><td>Angles on a straight line</td><td>sum to $180^\circ$</td></tr>
<tr><td>Angles around a point</td><td>sum to $360^\circ$</td></tr>
<tr><td>Vertically opposite angles</td><td>equal (formed where two lines cross)</td></tr>
<tr><td>Angles in a triangle</td><td>sum to $180^\circ$</td></tr>
<tr><td>Base angles of an isosceles triangle</td><td>equal</td></tr>
<tr><td>Exterior angle of a triangle</td><td>= sum of the two opposite interior angles</td></tr></table>
${(() => { let s = F.poly([[40, 150], [220, 150], [160, 30]], "k cS", true) + F.line(220, 150, 290, 150, "k") + F.text(70, 170, "a", "tk bold") + F.text(195, 170, "b", "tk bold") + F.text(160, 50, "c", "tk bold") + F.arc(220, 150, 30, 130, 180, "r", "d", 1.3) + F.text(248, 125, "d", "tr bold");
  return F.fig(320, 185, s, "Exterior angle d = a + c (the two angles not next to it).", { size: "small" }); })()}
<details class="check"><summary>A triangle has angles 2x, 3x and x + 20. Find x.</summary><div>6x + 20 = 180 → x = 26.7° (1 d.p.).</div></details>`},

    { h: "Parallel lines (E4.2)", body: M`
<p class="lead">When a line (a <b>transversal</b>) crosses two <b>parallel</b> lines, equal and supplementary angle pairs are created.</p>
${(() => { let s = F.line(20, 60, 460, 60, "k") + F.line(20, 160, 460, 160, "k") + F.line(60, 20, 340, 200, "k") + F.text(470, 64, "parallel", "tm small", "start") + F.text(470, 164, "parallel", "tm small", "start");
  const P = (x, y, a, c) => F.arc(x, y, 20, a, a + 60, c) ;
  s += F.text(130, 45, "a", "tr bold") + F.text(230, 45, "b", "tb bold") + F.text(130, 85, "d", "tg bold") + F.text(230, 85, "c", "to bold");
  s += F.text(173, 145, "e", "tr bold") + F.text(260, 145, "f", "tb bold") + F.text(173, 185, "h", "tg bold") + F.text(260, 185, "g", "to bold");
  return F.fig(560, 210, s, "A transversal crossing two parallel lines creates 8 angles in matching patterns at each crossing.", { size: "wide" }); })()}
<table class="t"><tr><th>Name</th><th>Position</th><th>Rule</th></tr>
<tr><td><b>Corresponding</b> angles</td><td>Same position at each crossing (an "F" shape)</td><td>Equal: $a=e$, $b=f$, $d=h$, $c=g$</td></tr>
<tr><td><b>Alternate</b> angles</td><td>Opposite sides of the transversal, between the lines (a "Z" shape)</td><td>Equal: $c=e$, $d=f$</td></tr>
<tr><td><b>Co-interior</b> (allied) angles</td><td>Same side of the transversal, between the lines (a "C"/"U" shape)</td><td>Sum to $180^\circ$: $c+f=180^\circ$, $d+e=180^\circ$</td></tr></table>
<div class="callout key"><b class="t">Memory aids</b>F = corresponding (equal). Z = alternate (equal). C/U = co-interior (sum 180°). Always name <b>which</b> rule you used: "angles on a straight line" is a different reason from "alternate angles" even when both give 70°.</div>`},

    { h: "Quadrilaterals (E4.1, E4.2)", body: M`
<p>Angles in <b>any</b> quadrilateral sum to $360^\circ$ (split it into 2 triangles). Special quadrilaterals:</p>
<table class="t"><tr><th>Shape</th><th>Properties</th></tr>
<tr><td>Parallelogram</td><td>Opposite sides parallel and equal; opposite angles equal; diagonals bisect each other</td></tr>
<tr><td>Rectangle</td><td>Parallelogram with all angles $90^\circ$; diagonals equal</td></tr>
<tr><td>Rhombus</td><td>Parallelogram with all sides equal; diagonals bisect each other <b>at right angles</b> and bisect the vertex angles</td></tr>
<tr><td>Square</td><td>Rectangle and rhombus combined</td></tr>
<tr><td>Trapezium</td><td>Exactly one pair of parallel sides</td></tr>
<tr><td>Kite</td><td>Two pairs of adjacent equal sides; one pair of equal angles; diagonals cross at right angles</td></tr></table>`},

    { h: "Polygons: interior and exterior angles (E4.2)", body: M`
<div class="viz" data-viz="polygonSum"></div>
<p class="eq">$$\text{sum of interior angles of an }n\text{-sided polygon}=(n-2)\times180^\circ$$</p>
<p>For a <b>regular</b> polygon (all sides and angles equal), each interior angle $=\dfrac{(n-2)\times180^\circ}{n}$.</p>
<div class="callout key"><b class="t">Exterior angles</b>The <b>exterior</b> angles of any convex polygon sum to $360^\circ$ (walk all the way round). For a regular polygon, each exterior angle $=\dfrac{360^\circ}{n}$, and <b>interior + exterior = $180^\circ$</b> (angles on a straight line).</div>
<table class="t"><tr><th>Polygon</th><th>$n$</th><th>Interior sum</th><th>Each interior (regular)</th><th>Each exterior (regular)</th></tr>
<tr><td>Triangle</td><td>3</td><td>$180^\circ$</td><td>$60^\circ$</td><td>$120^\circ$</td></tr>
<tr><td>Quadrilateral</td><td>4</td><td>$360^\circ$</td><td>$90^\circ$</td><td>$90^\circ$</td></tr>
<tr><td>Pentagon</td><td>5</td><td>$540^\circ$</td><td>$108^\circ$</td><td>$72^\circ$</td></tr>
<tr><td>Hexagon</td><td>6</td><td>$720^\circ$</td><td>$120^\circ$</td><td>$60^\circ$</td></tr>
<tr><td>Octagon</td><td>8</td><td>$1080^\circ$</td><td>$135^\circ$</td><td>$45^\circ$</td></tr>
<tr><td>Decagon</td><td>10</td><td>$1440^\circ$</td><td>$144^\circ$</td><td>$36^\circ$</td></tr></table>
<div class="callout ex"><b class="t">Finding n from the angle</b>A regular polygon has interior angle $156^\circ$. Exterior angle $=180-156=24^\circ$. $n=360\div24=15$ sides.</div>
<details class="check"><summary>Find the sum of interior angles of a 15-sided polygon.</summary><div>(15 − 2) × 180° = 2340°.</div></details>`},

    { h: "Symmetry (E4.6)", body: M`
<p><b>Line symmetry:</b> a shape has a line of symmetry if folding along that line makes the two halves match exactly. The <b>order of symmetry</b> (rotational symmetry) is the number of positions in a full turn where the shape looks the same (minimum 1, meaning no rotational symmetry beyond the trivial).</p>
${(() => { let s = "";
  const sq = (x, y, sz) => F.rect(x, y, sz, sz, "c cS");
  const tri = (x, y, w, h) => F.poly([[x + w / 2, y], [x, y + h], [x + w, y + h]], "c cS", true);
  const pent = (x, y, r) => F.poly(Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [x + r * Math.cos(a), y + r + r * Math.sin(a)]; }), "c cS", true);
  const para = (x, y, w, h, sk) => F.poly([[x + sk, y], [x + w + sk, y], [x + w - sk, y + h], [x - sk, y + h]], "c cS", true);
  const items = [["square", sq(32, 10, 56), 4, 4], ["rectangle", F.rect(16, 18, 88, 44, "c cS"), 2, 2], ["equilateral triangle", tri(10, 10, 80, 60), 3, 3], ["regular pentagon", pent(60, 8, 44), 5, 5], ["parallelogram", para(20, 16, 70, 48, 16), 0, 2], ["isosceles triangle", tri(20, 10, 60, 60), 1, 1]];
  items.forEach(([n, svg, lines, rot], i) => { const x = 20 + (i % 3) * 170, y = 20 + Math.floor(i / 3) * 150;
    s += `<g transform="translate(${x},${y})">${svg}</g>` + F.text(x + 60, y + 95, n, "tk small bold", "middle") + F.text(x + 60, y + 111, `${lines} line(s), order ${rot}`, "tm small", "middle"); });
  return F.fig(540, 300, s, "Lines of symmetry and rotational order for common shapes.", { size: "wide" }); })()}
<table class="t"><tr><th>Shape</th><th>Lines of symmetry</th><th>Order of rotational symmetry</th></tr>
<tr><td>Equilateral triangle</td><td>3</td><td>3</td></tr><tr><td>Square</td><td>4</td><td>4</td></tr>
<tr><td>Rectangle (not square)</td><td>2</td><td>2</td></tr><tr><td>Rhombus</td><td>2</td><td>2</td></tr>
<tr><td>Regular pentagon</td><td>5</td><td>5</td></tr><tr><td>Regular hexagon</td><td>6</td><td>6</td></tr>
<tr><td>Parallelogram</td><td>0</td><td>2</td></tr><tr><td>Isosceles triangle (not equilateral)</td><td>1</td><td>1</td></tr>
<tr><td>Circle</td><td>infinite</td><td>infinite</td></tr></table>
<p>For a <b>regular $n$-gon</b>: $n$ lines of symmetry, order of rotational symmetry $n$.</p>`},

    { h: "Constructions with ruler and compasses (E6.7)", body: M`
<p class="lead">Use a straight edge (ruler) and compasses only — no protractor — for these classic constructions. Keep all construction arcs visible: they are part of the method and often carry marks.</p>
<div class="viz" data-viz="angleFacts"></div>
<p>Use the <b>construction lab</b> at the bottom of the page to step through each one. The four constructions you must know:</p>
<ol class="steps"><li><b>Perpendicular bisector of a line segment AB</b>: with compasses set to more than half $AB$, draw arcs from $A$ and from $B$ that cross above and below the line; join the crossing points.</li>
<li><b>Bisector of an angle</b>: draw an arc from the vertex crossing both arms; from those two points draw equal arcs that cross; join the vertex to the crossing point.</li>
<li><b>Perpendicular from a point to a line</b>: draw an arc from the point crossing the line twice; from those two points draw equal arcs crossing on the far side; join.</li>
<li><b>Triangle given three sides (SSS)</b>: draw the base accurately; from each end, draw an arc with the other two side lengths; join the arcs' intersection to both ends of the base.</li></ol>
<div class="callout warn"><b class="t">Marks</b>"Construct" means with compasses and leaving the arcs visible — a protractor gets you 0 marks even for a correct-looking angle. "Draw" or "measure" allows a protractor/ruler as normal.</div>`},

    { h: "Loci (E6.7)", body: M`
<p>A <b>locus</b> (plural <b>loci</b>) is the set of all points satisfying a given rule.</p>
<table class="t"><tr><th>Rule</th><th>Locus</th></tr>
<tr><td>Fixed distance $r$ from a point $P$</td><td>A circle, radius $r$, centre $P$</td></tr>
<tr><td>Equidistant from two points $A$ and $B$</td><td>The perpendicular bisector of $AB$</td></tr>
<tr><td>Equidistant from two lines (that meet)</td><td>The angle bisector between them</td></tr>
<tr><td>Fixed distance $d$ from a line</td><td>Two parallel lines, distance $d$ either side (with semicircular ends if the line is a segment)</td></tr></table>
${(() => { let s = F.line(30, 100, 220, 100, "k") + F.line(30, 70, 220, 70, "m d") + F.line(30, 130, 220, 130, "m d") + F.circ(30, 100, 30, "m d") + F.text(220, 60, "", "tm small") ;
  s += F.text(260, 70, "fixed distance", "tm small", "start") + F.text(260, 86, "from a line segment", "tm small", "start");
  return F.fig(500, 155, s, "Locus of points a fixed distance from a line segment: a running-track shape.", { size: "small" }); })()}
<div class="callout ex"><b class="t">Combining loci</b>"A goat is tied to a post at the corner of a rectangular field by a 5 m rope. Sketch the region it can reach." Draw a quarter-circle of radius 5 m inside the field from the post (the walls block the rest), extending around any corner the rope reaches.</div>
<p><b>Shading a region</b> defined by several loci: draw each locus, then shade the area that satisfies <b>all</b> the conditions (e.g. "closer to $A$ than $B$, and within 4 cm of $C$").</p>`}
  ],
  worked: [
    { q: M`In the diagram, two parallel lines are cut by a transversal. One angle is $68^\circ$. Find the co-interior angle and the alternate angle on the other parallel line.`,
      steps: [M`Co-interior (allied) angles sum to $180^\circ$: $180-68=112^\circ$.`, M`Alternate angles are equal: the alternate angle is $68^\circ$.`]},
    { q: M`A regular polygon has an exterior angle of $24^\circ$. Find the number of sides and the sum of interior angles.`,
      steps: [M`$n=360\div24=15$.`, M`Sum of interior angles $=(15-2)\times180=2340^\circ$.`]},
    { q: M`Construct a triangle with sides 6 cm, 7 cm and 5 cm using only a ruler and compasses.`,
      steps: [M`Draw the 7 cm base.`, M`From one end, draw an arc of radius 6 cm; from the other end, draw an arc of radius 5 cm.`, M`Join both ends of the base to where the arcs cross.`]}
  ],
  formulas: [["Angles on a line", M`$180^\circ$`], ["Angles at a point", M`$360^\circ$`], ["Triangle angle sum", M`$180^\circ$`], ["Polygon interior sum", M`$(n-2)\times180^\circ$`], ["Regular polygon interior angle", M`$\dfrac{(n-2)\times180^\circ}{n}$`], ["Exterior angle sum", M`$360^\circ$ (any convex polygon)`]],
  cards: [
    ["Angles on a straight line", "Sum to 180°"],
    ["Angles around a point", "Sum to 360°"],
    ["Vertically opposite angles", "Equal"],
    ["Exterior angle of a triangle", "Equals the sum of the two opposite interior angles"],
    ["Corresponding angles (F)", "Equal"],
    ["Alternate angles (Z)", "Equal"],
    ["Co-interior angles (C)", "Sum to 180°"],
    ["Angles in any quadrilateral", "Sum to 360°"],
    ["Interior angle sum formula", "(n − 2) × 180°"],
    ["Exterior angles of a polygon sum to", "360°"],
    ["Regular polygon: lines of symmetry", "n (same as number of sides)"],
    ["Perpendicular bisector construction", "Equal arcs from both ends crossing above and below"],
    ["Angle bisector construction", "Arc from vertex, then equal arcs from where it crosses the arms"],
    ["Locus: fixed distance from a point", "A circle"],
    ["Locus: equidistant from two points", "The perpendicular bisector"],
    ["Locus: equidistant from two lines", "The angle bisector"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`The sum of the interior angles of a hexagon is`, opts: ["360°", "540°", "720°", "900°"], ans: 2, why: M`$(6-2)\times180$.` },
    { type: "mcq", marks: 1, q: M`A regular polygon has exterior angle 40°. It has`, opts: ["8 sides", "9 sides", "10 sides", "12 sides"], ans: 1, why: M`$360\div40$.` },
    { type: "mcq", marks: 1, q: M`Alternate angles are shown by which letter shape?`, opts: ["F", "Z", "C", "X"], ans: 1, why: M`Z-angles.` },
    { type: "mcq", marks: 1, q: M`A kite has rotational symmetry of order`, opts: ["0", "1", "2", "4"], ans: 1, why: M`No rotational symmetry beyond the trivial (order 1).` },
    { type: "struct", marks: 2, q: M`Two angles on a straight line are $3x$ and $x+40$. Find $x$.`, ms: M`<b>M1</b> $3x+x+40=180$<br><b>A1</b> $x=35$` },
    { type: "struct", marks: 3, q: M`A pentagon has angles $90°, 100°, 110°, 120°$ and $x$. Find $x$.`, ms: M`<b>M1</b> sum $=540°$<br><b>M1</b> $90+100+110+120=420$<br><b>A1</b> $x=120°$` },
    { type: "struct", marks: 3, q: M`In a parallelogram, one angle is $65°$. Find the other three angles, giving reasons.`, ms: M`<b>B1</b> opposite angle $65°$ (opposite angles equal)<br><b>B1</b> adjacent angles $115°$ (co-interior / angles sum to $360°$)<br><b>B1</b> correctly identifies all four` },
    { type: "struct", marks: 3, q: M`Construct the perpendicular bisector of a line segment $AB$ of length 8 cm, describing your method.`, ms: M`<b>B1</b> compasses set to more than 4 cm<br><b>B1</b> arcs from A and B crossing above and below<br><b>B1</b> straight line joining the crossing points` },
    { type: "struct", marks: 2, q: M`State the number of lines of symmetry and the order of rotational symmetry of a regular octagon.`, ms: M`<b>B1</b> 8 lines of symmetry<br><b>B1</b> order 8` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`State the sum of the angles in a triangle.`, ms: M`<b>B1</b> 180°` },
    { d: 1, type: "struct", marks: 2, q: M`Two parallel lines are cut by a transversal. One angle is 72°. Find the corresponding angle.`, ms: M`<b>B1</b> 72°<br><b>B1</b> reason: corresponding angles are equal` },
    { d: 1, type: "mcq", marks: 1, q: M`A square has rotational symmetry of order`, opts: ["1", "2", "4", "8"], ans: 2, why: M`Order 4.` },
    { d: 1, type: "struct", marks: 2, q: M`Find the sum of the interior angles of a quadrilateral, and the size of each angle if it is a regular quadrilateral.`, ms: M`<b>B1</b> 360°<br><b>B1</b> 90° each` },
    { d: 2, type: "struct", marks: 3, q: M`A regular polygon has an interior angle of 150°. Find the number of sides.`, ms: M`<b>M1</b> exterior angle $=30°$<br><b>M1</b> $360\div30$<br><b>A1</b> 12` },
    { d: 2, type: "struct", marks: 3, q: M`In triangle ABC, angle A = 54° and AB = AC. Find angle B and angle C.`, ms: M`<b>M1</b> isosceles: angles B and C equal<br><b>M1</b> $180-54=126$<br><b>A1</b> both $63°$` },
    { d: 2, type: "struct", marks: 3, q: M`Construct an angle of 60° using ruler and compasses only, and bisect it to make 30°.`, ms: M`<b>B1</b> equilateral triangle construction for 60°<br><b>B1</b> angle bisector arcs drawn<br><b>B1</b> 30° line correctly constructed` },
    { d: 2, type: "struct", marks: 2, q: M`Describe the locus of a point that moves so it is always 3 cm from a fixed point O.`, ms: M`<b>B2</b> a circle of radius 3 cm centred at O` },
    { d: 3, type: "struct", marks: 4, q: M`A quadrilateral's four exterior angles are in the ratio 2 : 3 : 4 : 6. Find each exterior angle, and hence each interior angle.`, ms: M`<b>M1</b> total ratio parts $=15$<br><b>M1</b> one part $=360\div15=24°$<br><b>A1</b> exterior angles 48°, 72°, 96°, 144°<br><b>A1</b> interior angles 132°, 108°, 84°, 36°` },
    { d: 3, type: "struct", marks: 4, q: M`A goat is tethered by a 4 m rope to a corner of a rectangular barn measuring 6 m by 3 m, outside the barn. Describe and find the area it can graze (take π = 3.14).`, ms: M`<b>M1</b> 3/4 circle radius 4 m around the main corner<br><b>M1</b> plus 1/4 circle radius 1 m where the rope wraps round the 3 m side (4 − 3)<br><b>A1</b> areas: $\tfrac34\pi(4)^2=37.68$, $\tfrac14\pi(1)^2=0.785$<br><b>A1</b> total ≈ 38.5 m²` },
    { d: 3, type: "struct", marks: 3, q: M`Find the number of sides of a polygon in which the sum of interior angles is 4 times the sum of exterior angles.`, ms: M`<b>M1</b> $(n-2)\times180=4\times360$<br><b>M1</b> $n-2=8$<br><b>A1</b> $n=10$` }
  ]
});
}
