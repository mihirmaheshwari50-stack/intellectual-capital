window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;

/* ============================================================
   SIMILARITY & CONGRUENCE  (0580: E4.5)
   ============================================================ */
TOPICS.push({
  id: "similarity", subject: "maths", unit: 4, title: "Similarity & congruence",
  blurb: "Similar shapes and scale factors, finding unknown lengths, the length/area/volume scale factor relationship, and the four tests for congruent triangles.",
  level: "Core → Extended", demo: "congruence",
  syllabus: [
    ["E4.5", "Calculate lengths of similar shapes; use the relationship between linear, area and volume scale factors", 0],
    ["E4.5", "Use the basic congruence criteria for triangles (SSS, SAS, ASA, RHS)", 3]
  ],
  sections: [
    { h: "Similar shapes (E4.5)", body: M`
<p class="lead">Two shapes are <b>similar</b> if one is an enlargement of the other: <b>matching angles are equal</b> and <b>matching sides are in the same ratio</b> (the <b>scale factor</b>).</p>
${(() => { let s = F.poly([[30, 130], [130, 130], [60, 40]], "k cS", true) + F.text(80, 150, "6 cm", "tk small") + F.poly([[180, 130], [330, 130], [218, 20]], "k cS", true) + F.text(255, 150, "9 cm", "tk small") + F.arrow(140, 80, 170, 80, "k", 8);
  return F.fig(360, 165, s, "Similar triangles: angles match, sides are all in the same ratio (here × 1.5).", { size: "small" }); })()}
<p>To find a missing length, identify <b>corresponding</b> sides (same relative position — often opposite equal angles), find the scale factor, then scale.</p>
<div class="callout ex"><b class="t">Example</b>Triangles $ABC$ and $PQR$ are similar; $AB=8$ cm corresponds to $PQ=12$ cm; $BC=10$ cm. Find $QR$.<br>Scale factor $PQ\div AB=12\div8=1.5$. $QR=10\times1.5=15$ cm.</div>
<div class="callout warn"><b class="t">Finding corresponding sides</b>Match sides by the angles at their ends, not by the order letters happen to be written. Sketch both shapes the same way round if it helps.</div>
<p><b>Overlapping similar triangles</b> (a common diagram): often share an angle, and have a pair of parallel lines creating equal corresponding angles — prove similarity first (equal angles, AA), then scale.</p>
${(() => { let s = F.poly([[40, 170], [280, 170], [160, 20]], "k") + F.line(100, 110, 220, 110, "c thick") + F.text(60, 190, "A", "tk small") + F.text(260, 190, "B", "tk small") + F.text(160, 10, "C", "tk small") + F.text(85, 125, "D", "tk small") + F.text(235, 125, "E", "tk small") + F.text(160, 195, "DE ∥ AB, so △CDE ~ △CAB", "tc small bold", "middle");
  return F.fig(320, 210, s, "A line parallel to one side of a triangle creates a smaller similar triangle.", { size: "small" }); })()}`},

    { h: "Length, area and volume scale factors (E4.5)", body: M`
<div class="viz" data-viz="similarScale"></div>
<div class="callout key"><b class="t">The rule</b>If the <b>length</b> scale factor is $k$:<br>• <b>Area</b> scale factor $=k^2$<br>• <b>Volume</b> scale factor $=k^3$</div>
<p><b>Why:</b> area is a product of two lengths ($k\times k$); volume is a product of three ($k\times k\times k$).</p>
<table class="t"><tr><th>Quantity</th><th>Scale factor</th><th>Example (k = 3)</th></tr>
<tr><td>Length, perimeter</td><td>$k$</td><td>×3</td></tr><tr><td>Area, surface area</td><td>$k^2$</td><td>×9</td></tr><tr><td>Volume, mass (same material)</td><td>$k^3$</td><td>×27</td></tr></table>
<div class="callout ex"><b class="t">Worked example</b>Two similar bottles have heights 12 cm and 18 cm. The smaller holds 400 ml. Find the capacity of the larger.<br>Length scale factor $=\tfrac{18}{12}=1.5$. Volume scale factor $=1.5^3=3.375$. Capacity $=400\times3.375=1350$ ml.</div>
<div class="callout ex"><b class="t">Working backwards from area</b>Two similar fields have areas 50 m² and 200 m². The smaller has a fence of length 30 m. Find the length of fence for the larger.<br>Area ratio $=200\div50=4$. Length scale factor $=\sqrt4=2$. Fence $=30\times2=60$ m.</div>
<details class="check"><summary>Two similar statues have masses 8 kg and 27 kg (same material). Find the ratio of their heights.</summary><div>Volume (and mass) ratio 8:27; length ratio $=\sqrt[3]{8}:\sqrt[3]{27}=2:3$.</div></details>`},

    { h: "Congruent triangles: the four tests (E4.5)", body: M`
<p class="lead">Two shapes are <b>congruent</b> if they are <b>exactly</b> the same shape and size (one is a reflection, rotation or translation of the other — scale factor 1).</p>
<div class="viz" data-viz="congruence"></div>
<table class="t"><tr><th>Test</th><th>What must match</th></tr>
<tr><td><b>SSS</b></td><td>All three sides</td></tr>
<tr><td><b>SAS</b></td><td>Two sides and the <b>included</b> angle (the angle between them)</td></tr>
<tr><td><b>ASA</b> (or AAS)</td><td>Two angles and a corresponding side</td></tr>
<tr><td><b>RHS</b></td><td>Right angle, hypotenuse and one other side (right-angled triangles only)</td></tr></table>
<div class="callout warn"><b class="t">Not a valid test</b>"AAA" only proves <b>similarity</b>, not congruence (the triangles could be different sizes). "SSA" (two sides and a non-included angle) is <b>not</b> generally valid either — except in the special RHS case.</div>
<p><b>Using congruence in proofs:</b> state which triangles, list the three matching facts with reasons, name the test, then state the conclusion (e.g. "so AB = CD", matching sides of congruent triangles).</p>
<div class="callout ex"><b class="t">Worked example</b>In the diagram, $AB=CD$, $AD=CB$ and they share side $BD$. Prove triangles $ABD$ and $CDB$ are congruent.<br>$AB=CD$ (given); $AD=CB$ (given); $BD$ is common. SSS. So the triangles are congruent, meaning angle $ABD=$ angle $CDB$, etc.</div>`},

    { h: "Putting it together", body: M`
<p>Exam questions often combine similarity with other topics: areas, trigonometry, or circle theorems (e.g. two triangles formed by a chord and tangent, shown similar using the alternate segment theorem).</p>
<div class="callout ex"><b class="t">Example</b>In the diagram, $AB\parallel DC$, and diagonals $AC$, $BD$ meet at $X$. $AX=6$, $XC=9$, $BX=8$. Show triangles $AXB$ and $CXD$ are similar and find $XD$.<br>Angle $AXB=$ angle $CXD$ (vertically opposite). Angle $XAB=$ angle $XCD$ (alternate angles, $AB\parallel DC$). Two angles match: similar (AA).<br>Scale factor $=XC\div XA=9\div6=1.5$; so $XD=BX\times1.5=12$.</div>`}
  ],
  worked: [
    { q: M`Triangles $ABC$ and $XYZ$ are similar, with $AB$ corresponding to $XY$. $AB=5$ cm, $XY=8$ cm, $BC=7$ cm, area of $ABC=15$ cm². Find $YZ$ and the area of $XYZ$.`,
      steps: [M`Length scale factor $=8\div5=1.6$.`, M`$YZ=7\times1.6=11.2$ cm.`, M`Area scale factor $=1.6^2=2.56$; area of $XYZ=15\times2.56=38.4$ cm².`]},
    { q: M`Two similar cylinders have radii 4 cm and 10 cm. The smaller has volume 120 cm³. Find the volume of the larger.`,
      steps: [M`Length scale factor $=10\div4=2.5$.`, M`Volume scale factor $=2.5^3=15.625$.`, M`Volume $=120\times15.625=1875$ cm³.`]},
    { q: M`$ABCD$ is a kite with $AB=AD$ and $CB=CD$. $AC$ is a diagonal. Prove triangles $ABC$ and $ADC$ are congruent.`,
      steps: [M`$AB=AD$ (given).`, M`$CB=CD$ (given).`, M`$AC$ is common to both.`, M`SSS: the triangles are congruent.`]}
  ],
  formulas: [["Length scale factor", "k"], ["Area scale factor", M`$k^2$`], ["Volume scale factor", M`$k^3$`], ["Congruence tests", "SSS, SAS, ASA, RHS"]],
  cards: [
    ["Similar shapes", "Same shape, angles equal, sides in the same ratio."],
    ["Congruent shapes", "Exactly the same shape and size."],
    ["Length scale factor k → area scale factor", "k²"],
    ["Length scale factor k → volume scale factor", "k³"],
    ["Area ratio 9:4 → length ratio", "3:2"],
    ["Volume ratio 27:8 → length ratio", "3:2"],
    ["SSS test", "All three sides equal."],
    ["SAS test", "Two sides and the included angle."],
    ["ASA test", "Two angles and the included side."],
    ["RHS test", "Right angle, hypotenuse, one other side."],
    ["Is AAA a congruence test?", "No — only proves similarity."],
    ["Is SSA a valid congruence test?", "Not in general (RHS is the exception)."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`Two similar shapes have length ratio 2:5. Their area ratio is`, opts: ["2:5", "4:25", "4:10", "8:125"], ans: 1, why: M`Square the ratio.` },
    { type: "mcq", marks: 1, q: M`Two similar solids have volume ratio 8:27. Their length ratio is`, opts: ["8:27", "2:3", "4:9", "2:9"], ans: 1, why: M`Cube root.` },
    { type: "mcq", marks: 1, q: M`Which test is NOT valid for proving triangle congruence in general?`, opts: ["SSS", "SAS", "AAA", "RHS"], ans: 2, why: M`AAA only shows similarity.` },
    { type: "struct", marks: 3, q: M`Two similar triangles have corresponding sides 6 cm and 15 cm. The smaller has area 20 cm². Find the area of the larger.`, ms: M`<b>M1</b> scale factor $=2.5$<br><b>M1</b> area factor $=6.25$<br><b>A1</b> 125 cm²` },
    { type: "struct", marks: 3, q: M`Two similar bottles have heights 10 cm and 25 cm. The larger holds 2000 ml. Find the capacity of the smaller.`, ms: M`<b>M1</b> scale factor $=0.4$<br><b>M1</b> volume factor $=0.064$<br><b>A1</b> 128 ml` },
    { type: "struct", marks: 4, q: M`In triangle $ABC$, $D$ is on $AB$ and $E$ is on $AC$ with $DE\parallel BC$. $AD=4$, $DB=6$, $AE=5$. Find $EC$ and the ratio of areas of $ADE$ to $ABC$.`, ms: M`<b>M1</b> scale factor $=\dfrac{4}{10}=0.4$<br><b>M1</b> $AE\div AC=0.4\Rightarrow AC=12.5$<br><b>A1</b> $EC=7.5$<br><b>A1</b> area ratio $0.4^2=0.16=4:25$` },
    { type: "struct", marks: 3, q: M`State the congruence test and the three matching facts for two triangles that share a common side, with two pairs of equal angles at either end of it.`, ms: M`<b>B1</b> ASA<br><b>B1</b> two angle pairs equal<br><b>B1</b> the shared side equal (common to both)` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`State the test for congruence that uses all three sides.`, ms: M`<b>B1</b> SSS` },
    { d: 1, type: "struct", marks: 2, q: M`Two similar shapes have length scale factor 3. State the area and volume scale factors.`, ms: M`<b>B1</b> area: 9<br><b>B1</b> volume: 27` },
    { d: 1, type: "mcq", marks: 1, q: M`Triangles with sides 3,4,5 and 6,8,10 are`, opts: ["congruent", "similar", "neither", "both"], ans: 1, why: M`Same ratio, different size.` },
    { d: 2, type: "struct", marks: 3, q: M`Two similar triangles have areas 32 cm² and 50 cm². The smaller has a side of length 8 cm. Find the corresponding side of the larger.`, ms: M`<b>M1</b> area ratio $=50/32=1.5625$<br><b>M1</b> length factor $=\sqrt{1.5625}=1.25$<br><b>A1</b> 10 cm` },
    { d: 2, type: "struct", marks: 3, q: M`Two similar cones have heights 6 cm and 9 cm. The smaller has surface area 75 cm². Find the surface area of the larger.`, ms: M`<b>M1</b> scale factor $=1.5$<br><b>M1</b> area factor $=2.25$<br><b>A1</b> 168.75 cm²` },
    { d: 2, type: "struct", marks: 3, q: M`In triangles $PQR$ and $STU$, $PQ=ST$, angle $Q=$ angle $T$, and $QR=TU$. State the congruence test and what can be concluded about $PR$ and $SU$.`, ms: M`<b>B1</b> SAS<br><b>B1</b> triangles are congruent<br><b>B1</b> $PR=SU$` },
    { d: 3, type: "struct", marks: 4, q: M`Two similar containers have volumes 64 cm³ and 1000 cm³. The smaller has a base diameter of 4 cm. (a) Find the length scale factor. (b) Find the base diameter of the larger. (c) If the smaller takes 2 minutes to fill at a constant rate, and both are filled at the same rate per unit area of base, estimate the filling time for the larger (assume similar shapes fill proportionally to volume ÷ base area, i.e. proportionally to height).`, ms: M`<b>M1</b> volume ratio $1000/64=15.625$<br><b>A1</b> length factor $=\sqrt[3]{15.625}=2.5$<br><b>A1</b> diameter $=10$ cm<br><b>B1</b> height scales by 2.5, so time ≈ $2\times2.5=5$ minutes (accept reasoned alternative)` },
    { d: 3, type: "struct", marks: 4, q: M`$ABCD$ is a parallelogram. $M$ is the midpoint of $DC$. $AM$ and $BD$ meet at $X$. Prove that triangles $AXB$ and $MXD$ are similar, and find the ratio $DX:XB$.`, ms: M`<b>B1</b> angle $AXB=$ angle $MXD$ (vertically opposite)<br><b>B1</b> angle $ABX=$ angle $MDX$ (alternate angles, $AB\parallel DC$)<br><b>B1</b> similar (AA)<br><b>A1</b> $DX:XB=DM:AB=1:2$` }
  ]
});
}
