window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
const grid = (w, h, xr, yr) => { let s = ""; for (let x = xr[0]; x <= xr[1]; x++) s += F.line(40 + (x - xr[0]) * (w - 60) / (xr[1] - xr[0]), 10, 40 + (x - xr[0]) * (w - 60) / (xr[1] - xr[0]), h - 10, "grid");
  for (let y = yr[0]; y <= yr[1]; y++) s += F.line(40, 10 + (yr[1] - y) * (h - 20) / (yr[1] - yr[0]), w - 20, 10 + (yr[1] - y) * (h - 20) / (yr[1] - yr[0]), "grid"); return s; };

/* ============================================================
   TRANSFORMATIONS & VECTORS  (0580: E4.8, E7.1 – E7.3, E7.5)
   ============================================================ */
TOPICS.push({
  id: "transformations", subject: "maths", unit: 7, title: "Transformations & vectors",
  blurb: "Describing and carrying out translations, reflections, rotations and enlargements (including negative scale factors), combined transformations, vector notation, vector arithmetic, magnitude, and using vectors to prove geometric results.",
  level: "Core → Extended", demo: "transform",
  syllabus: [
    ["E4.8", "Reflect shapes in given lines; rotate shapes about a given point through a given angle; construct and describe these transformations", 1],
    ["E4.8", "Enlarge shapes by a given scale factor from a given centre, including fractional and negative scale factors", 3],
    ["E4.8", "Translate shapes using a vector; describe transformations using appropriate language", 0],
    ["E7.1", "Describe a translation using a vector; add and subtract vectors; multiply a vector by a scalar", 4],
    ["E7.2", "Calculate the magnitude of a vector", 5],
    ["E7.3", "Represent vectors by directed line segments; use position vectors", 6],
    ["E7.5", "Use the sum and difference of two vectors to express given vectors in terms of two coplanar vectors; use this to solve geometric problems", 7]
  ],
  sections: [
    { h: "The four transformations (E4.8)", body: M`
<p class="lead">A <b>transformation</b> maps an <b>object</b> onto an <b>image</b>. There are four to know, and each has its own full description.</p>
<div class="viz" data-viz="transform"></div>
<table class="t"><tr><th>Transformation</th><th>What must be stated to fully describe it</th><th>Preserves</th></tr>
<tr><td>Translation</td><td>The <b>column vector</b> $\begin{pmatrix}x\\y\end{pmatrix}$</td><td>Size, shape, orientation</td></tr>
<tr><td>Reflection</td><td>The <b>mirror line</b> (equation)</td><td>Size, shape (image is "flipped")</td></tr>
<tr><td>Rotation</td><td>The <b>centre</b>, <b>angle</b>, and <b>direction</b> (clockwise/anticlockwise)</td><td>Size, shape</td></tr>
<tr><td>Enlargement</td><td>The <b>centre</b> and <b>scale factor</b> $k$</td><td>Shape, not size (unless $k=\pm1$)</td></tr></table>
<div class="callout warn"><b class="t">Full marks need every part</b>"Rotation" alone scores nothing. You must give the <b>type</b>, and every one of its defining details, in a single sentence: e.g. "rotation of 90° clockwise about (1, 2)".</div>`},

    { h: "Translation (E4.8)", body: M`
<p>A translation is described by a <b>column vector</b> $\begin{pmatrix}x\\y\end{pmatrix}$: move every point $x$ right (negative = left) and $y$ up (negative = down).</p>
${(() => { let s = grid(280, 220, [-1, 6], [-1, 5]) + F.poly([[40 + 2 * 34, 190 - 1 * 34], [40 + 3 * 34, 190 - 1 * 34], [40 + 3 * 34, 190 - 2 * 34]], "c cS", true) + F.poly([[40 + 5 * 34, 190 - 3 * 34], [40 + 6 * 34, 190 - 3 * 34], [40 + 6 * 34, 190 - 4 * 34]], "o oS", true) + F.arrow(40 + 3.5 * 34, 190 - 1.5 * 34, 40 + 5.5 * 34, 190 - 3.5 * 34, "r", 7) + F.text(260, 70, "vector (3, 2)", "tr small bold", "end");
  return F.fig(300, 225, s, "Translating the object (blue) by (3, 2) gives the image (orange).", { size: "small" }); })()}
<p><b>Describing</b> a translation from a diagram: pick any point on the object and the matching point on the image; the vector is image minus object.</p>
<details class="check"><summary>A triangle has a vertex at (2, −1). After a translation it is at (−1, 3). State the translation vector.</summary><div>$\binom{-3}{4}$.</div></details>`},

    { h: "Reflection (E4.8)", body: M`
<p>State the <b>equation of the mirror line</b>: common ones are $x=0$ (the $y$-axis), $y=0$ (the $x$-axis), $x=k$, $y=k$, $y=x$ and $y=-x$.</p>
${(() => { let s = grid(280, 220, [-4, 4], [-1, 5]) + F.line(40 + 4 * 35, 10, 40 + 4 * 35, 210, "r d") + F.text(40 + 4 * 35, 8, "y = x", "tr small bold", "middle")
    + F.poly([[40 + 5 * 35, 190 - 1 * 35], [40 + 6 * 35, 190 - 1 * 35], [40 + 6 * 35, 190 - 2 * 35]], "c cS", true) + F.poly([[40 + 1 * 35, 190 - 5 * 35], [40 + 1 * 35, 190 - 6 * 35], [40 + 2 * 35, 190 - 6 * 35]], "o oS", true);
  return F.fig(300, 225, s, "Reflection in the line y = x: coordinates swap, (a, b) → (b, a).", { size: "small" }); })()}
<p><b>Key fact:</b> every point and its image are the <b>same perpendicular distance</b> from the mirror line, on opposite sides.</p>
<p><b>Finding the mirror line</b> from an object and image: join a point to its image; the mirror line is the <b>perpendicular bisector</b> of that segment.</p>`},

    { h: "Rotation (E4.8)", body: M`
<p>State the <b>centre</b>, the <b>angle</b>, and the <b>direction</b> (clockwise or anticlockwise). $180°$ either direction gives the same result.</p>
${(() => { let s = grid(280, 220, [-4, 4], [-1, 5]) + F.circ(40 + 4 * 35, 190 - 1 * 35, 3, "k kF") + F.text(40 + 4 * 35, 190 - 1 * 35 - 10, "centre", "tm small", "middle")
    + F.poly([[40 + 5 * 35, 190 - 1 * 35], [40 + 6 * 35, 190 - 1 * 35], [40 + 6 * 35, 190 - 2 * 35]], "c cS", true) + F.poly([[40 + 3 * 35, 190], [40 + 3 * 35, 190 - 35], [40 + 2 * 35, 190 - 35]], "o oS", true)
    + F.arc(40 + 4 * 35, 190 - 1 * 35, 60, -20, 160, "r", "90° anticlockwise", 1.15);
  return F.fig(300, 225, s, "Rotating 90° anticlockwise about the marked centre.", { size: "small" }); })()}
<p><b>Tracing paper method</b> (how to actually perform a rotation): trace the object and the centre; place a pencil point on the centre and rotate the tracing paper through the given angle; press through to mark the image.</p>
<p><b>Finding the centre</b> of a rotation from an object and image: join a point to its image and construct the perpendicular bisector; do this for a <b>second</b> pair of points; the centre is where the two bisectors meet.</p>`},

    { h: "Enlargement (E4.8)", body: M`
<p>State the <b>scale factor</b> $k$ and the <b>centre</b> of enlargement.</p>
${F.row(
  (() => { let s = grid(220, 220, [-1, 5], [-1, 5]) + F.circ(40 + 0 * 36, 190, 3, "k kF") + F.poly([[40 + 1 * 36, 190 - 1 * 36], [40 + 2 * 36, 190 - 1 * 36], [40 + 2 * 36, 190 - 2 * 36]], "c cS", true) + F.poly([[40 + 2 * 36, 190 - 2 * 36], [40 + 4 * 36, 190 - 2 * 36], [40 + 4 * 36, 190 - 4 * 36]], "o oS", true) + F.line(40, 190, 40 + 4 * 36, 190 - 4 * 36, "k thin");
    return F.fig(240, 225, s, "Scale factor +2, centre (0, 0): image twice the size, same side.", { size: "small" }); })(),
  (() => { let s = grid(220, 220, [-3, 3], [-1, 5]) + F.circ(40 + 3 * 32, 190 - 2 * 32, 3, "k kF") + F.poly([[40 + 4 * 32, 190 - 3 * 32], [40 + 5 * 32, 190 - 3 * 32], [40 + 5 * 32, 190 - 4 * 32]], "c cS", true) + F.poly([[40 + 2 * 32, 190 - 1 * 32], [40 + 1 * 32, 190 - 1 * 32], [40 + 1 * 32, 190]], "o oS", true) + F.line(40 + 5 * 32, 190 - 4 * 32, 40 + 1 * 32, 190, "k thin");
    return F.fig(240, 225, s, "Scale factor −1, same centre: image is upside-down, opposite side.", { size: "small" }); })()
)}
<div class="callout key"><b class="t">Scale factor k</b>$|k|\gt1$: image larger. $0\lt|k|\lt1$: image smaller. $k$ negative: image on the <b>opposite side</b> of the centre, upside down (rotated 180°).</div>
<p><b>Finding the scale factor:</b> $k=\dfrac{\text{image length}}{\text{object length}}$. <b>Finding the centre:</b> draw lines through matching vertices of object and image; extend them until they meet — that is the centre.</p>
<details class="check"><summary>A shape is enlarged with scale factor −2 about (0,0). A point at (3, 1) maps to...?</summary><div>(−6, −2): multiply both coordinates by −2.</div></details>`},

    { h: "Combined transformations (E4.8)", body: M`
<p>A single transformation can have the same overall effect as <b>two combined</b> ones (e.g. two reflections). In exams you may be asked to describe the <b>single</b> transformation equivalent to a sequence.</p>
<div class="callout ex"><b class="t">Example</b>Reflecting in $x=0$ then in $y=0$ is the same as a single <b>rotation of 180° about the origin</b>.</div>
<p>Carry out each transformation in order, then look at the final image compared with the original object to identify the single equivalent transformation.</p>`},

    { h: "Vector notation and arithmetic (E7.1, E7.2)", body: M`
<p class="lead">A <b>vector</b> has both <b>magnitude</b> (size) and <b>direction</b>. Written as a column $\binom{x}{y}$, bold $\mathbf{a}$, or with an arrow $\overrightarrow{AB}$ (from $A$ to $B$).</p>
<div class="viz" data-viz="vectors"></div>
<ul><li><b>Addition:</b> add components; geometrically, place vectors nose-to-tail (the "triangle law").</li>
<li><b>Subtraction:</b> $\mathbf{a}-\mathbf{b}=\mathbf{a}+(-\mathbf{b})$; reverse $\mathbf{b}$'s direction then add.</li>
<li><b>Scalar multiplication:</b> $k\binom{x}{y}=\binom{kx}{ky}$: same direction if $k\gt0$, opposite if $k\lt0$; magnitude scales by $|k|$.</li>
<li><b>$\overrightarrow{AB}=-\overrightarrow{BA}$</b> (reversing the vector reverses its direction).</li></ul>
<p class="eq">$$\text{magnitude } |\mathbf{a}|=\sqrt{x^2+y^2}\quad\text{for }\mathbf{a}=\binom{x}{y}$$</p>
<div class="callout ex"><b class="t">Example</b>$\mathbf{a}=\binom{5}{-12}$. $|\mathbf{a}|=\sqrt{25+144}=\sqrt{169}=13$.</div>
<details class="check"><summary>$\mathbf{p}=\binom{3}{4}$, $\mathbf{q}=\binom{-2}{1}$. Find $2\mathbf{p}-3\mathbf{q}$ and its magnitude.</summary><div>$\binom{6}{8}-\binom{-6}{3}=\binom{12}{5}$; magnitude $=\sqrt{144+25}=13$.</div></details>`},

    { h: "Position vectors and geometric proofs (E7.3, E7.5)", body: M`
<p>The <b>position vector</b> of a point $P$ is $\overrightarrow{OP}$, its vector from the origin $O$. If $A$ and $B$ have position vectors $\mathbf{a}$ and $\mathbf{b}$:</p>
$$\overrightarrow{AB}=\mathbf{b}-\mathbf{a}\qquad(\text{"to minus from"})$$
${(() => { let s = F.circ(40, 190, 3, "k kF") + F.text(28, 200, "O", "tk small") + F.arrow(40, 190, 140, 70, "c", 7) + F.text(85, 125, "a", "tc bold") + F.arrow(40, 190, 260, 110, "o", 7) + F.text(155, 145, "b", "to bold") + F.arrow(140, 70, 260, 110, "r", 7) + F.text(205, 85, "b − a", "tr bold") + F.text(140, 55, "A", "tk small") + F.text(270, 100, "B", "tk small");
  return F.fig(300, 210, s, "AB = b − a: go from a's tip to b's tip.", { size: "small" }); })()}
<div class="callout ex"><b class="t">Midpoint / ratio proofs</b>$M$ is the midpoint of $AB$. Position vector of $M$: $\overrightarrow{OM}=\mathbf{a}+\tfrac12(\mathbf{b}-\mathbf{a})=\tfrac12(\mathbf{a}+\mathbf{b})$.</div>
<div class="callout key"><b class="t">Proving lines are parallel</b>If $\overrightarrow{PQ}=k\times\overrightarrow{RS}$ for some scalar $k$, then $PQ$ is parallel to $RS$ (and $k$ times its length). If they also share a point, they are part of the same straight line (<b>collinear</b>).</div>
<div class="callout ex"><b class="t">Worked example</b>$OABC$ is a parallelogram; $\overrightarrow{OA}=\mathbf{a}$, $\overrightarrow{OC}=\mathbf{c}$. $M$ is the midpoint of $AB$. Find $\overrightarrow{OM}$ in terms of $\mathbf{a}$ and $\mathbf{c}$.<br>Since $OABC$ is a parallelogram, $\overrightarrow{OB}=\mathbf{a}+\mathbf{c}$. $M$ is the midpoint of $AB$, so $\overrightarrow{OM}=\overrightarrow{OA}+\tfrac12\overrightarrow{AB}=\mathbf{a}+\tfrac12\mathbf{c}$ (using $\overrightarrow{AB}=\overrightarrow{OC}=\mathbf{c}$).</div>
<details class="check"><summary>In triangle OAB, P is the midpoint of OA and Q is the midpoint of OB. Show PQ is parallel to AB and find the ratio of their lengths.</summary><div>$\overrightarrow{OP}=\tfrac12\mathbf{a}$, $\overrightarrow{OQ}=\tfrac12\mathbf{b}$. $\overrightarrow{PQ}=\tfrac12\mathbf{b}-\tfrac12\mathbf{a}=\tfrac12(\mathbf{b}-\mathbf{a})=\tfrac12\overrightarrow{AB}$. So PQ ∥ AB and PQ : AB = 1 : 2.</div></details>`}
  ],
  worked: [
    { q: M`Describe fully the single transformation that maps triangle A, with vertices (1,1), (3,1), (1,3), onto triangle B with vertices (1,1), (1,3), (-1,3).`,
      steps: [M`Each vertex of A maps to a different vertex of B — check which pairs correspond by matching the right-angle vertex: (1,1)→(1,1).`, M`(3,1)→(1,3) and (1,3)→(-1,3): this looks like a 90° rotation.`, M`Testing centre (1,1): rotating (3,1) by 90° anticlockwise about (1,1) gives (1,3) ✓. Rotation 90° anticlockwise, centre (1,1).`]},
    { q: M`Triangle T has vertices (1,1), (2,1), (1,3). It is enlarged with scale factor 3, centre (0,0). Find the coordinates of the image.`,
      steps: [M`Multiply every coordinate by 3.`, M`Image vertices: (3,3), (6,3), (3,9).`]},
    { q: M`$\overrightarrow{OA}=\binom{2}{5}$, $\overrightarrow{OB}=\binom{6}{1}$. Find $\overrightarrow{AB}$ and its magnitude.`,
      steps: [M`$\overrightarrow{AB}=\overrightarrow{OB}-\overrightarrow{OA}=\binom{4}{-4}$.`, M`Magnitude $=\sqrt{16+16}=\sqrt{32}=4\sqrt2$.`]}
  ],
  formulas: [["Translation vector", M`$\binom{x}{y}$`], ["Vector magnitude", M`$|\binom xy|=\sqrt{x^2+y^2}$`], ["AB in terms of position vectors", M`$\mathbf{b}-\mathbf{a}$`], ["Scalar multiple", M`$k\binom xy=\binom{kx}{ky}$`], ["Enlargement image point", M`centre + $k\times$(point − centre)`]],
  cards: [
    ["What must a rotation description include?", "Centre, angle, direction."],
    ["What must an enlargement description include?", "Centre and scale factor."],
    ["Negative scale factor effect", "Image on the opposite side of the centre, upside down."],
    ["Reflection in y = x", "(a, b) → (b, a)"],
    ["Reflection in x-axis", "(a, b) → (a, −b)"],
    ["Finding a rotation's centre", "Perpendicular bisectors of two point–image pairs meet there."],
    ["Vector magnitude formula", "√(x² + y²)"],
    ["AB in terms of position vectors a, b", "b − a"],
    ["Condition for two vectors to be parallel", "One is a scalar multiple of the other."],
    ["Midpoint of A and B (position vectors a, b)", "½(a + b)"],
    ["Scalar multiplication effect on magnitude", "Multiplied by |k|"],
    ["Two reflections in parallel lines equivalent to", "A translation"],
    ["Two reflections in intersecting lines equivalent to", "A rotation about the intersection point"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`Translating (2, 5) by $\binom{-3}{4}$ gives`, opts: ["(−1, 9)", "(5, 1)", "(−1, 1)", "(5, 9)"], ans: 0, why: M`Add components.` },
    { type: "mcq", marks: 1, q: M`Reflecting (3, −2) in the x-axis gives`, opts: ["(−3, −2)", "(3, 2)", "(−3, 2)", "(−2, 3)"], ans: 1, why: M`y-coordinate sign flips.` },
    { type: "mcq", marks: 1, q: M`The magnitude of $\binom{6}{8}$ is`, opts: ["10", "14", "48", "7"], ans: 0, why: M`$\sqrt{36+64}$.` },
    { type: "mcq", marks: 1, q: M`An enlargement scale factor ½ makes the image`, opts: ["larger, same orientation", "smaller, same orientation", "the same size", "upside down"], ans: 1, why: M`$0\lt k\lt1$.` },
    { type: "struct", marks: 2, q: M`Describe fully the transformation that maps (2, 3) to (3, 2).`, ms: M`<b>B1</b> reflection<br><b>B1</b> in the line $y=x$` },
    { type: "struct", marks: 3, q: M`Triangle A has vertices (0,0), (2,0), (0,3). It is rotated 180° about (1,1). Find the coordinates of the image.`, ms: M`<b>M1</b> image = 2(centre) − point<br><b>A1</b> (2,2), (0,2)<br><b>A1</b> (2,−1)` },
    { type: "struct", marks: 3, q: M`$\mathbf{a}=\binom{4}{-3}$ and $\mathbf{b}=\binom{-1}{2}$. Find $3\mathbf{a}-2\mathbf{b}$ and its magnitude.`, ms: M`<b>M1</b> $\binom{12}{-9}-\binom{-2}{4}$<br><b>A1</b> $\binom{14}{-13}$<br><b>A1</b> magnitude $\sqrt{196+169}=19.1$` },
    { type: "struct", marks: 3, q: M`Shape P is enlarged, scale factor −2, centre (1, 1), to give shape Q. A vertex of P is at (3, 2). Find the corresponding vertex of Q.`, ms: M`<b>M1</b> vector from centre $=(2,1)$<br><b>M1</b> multiply by $-2$: $(-4,-2)$<br><b>A1</b> $(1-4, 1-2)=(-3,-1)$` },
    { type: "struct", marks: 4, q: M`OAB is a triangle, $\overrightarrow{OA}=\mathbf{a}$, $\overrightarrow{OB}=\mathbf{b}$. $C$ is the point on $AB$ such that $AC:CB=2:1$. Find $\overrightarrow{OC}$ in terms of $\mathbf{a}$ and $\mathbf{b}$.`, ms: M`<b>M1</b> $\overrightarrow{AB}=\mathbf{b}-\mathbf{a}$<br><b>M1</b> $\overrightarrow{AC}=\tfrac23(\mathbf{b}-\mathbf{a})$<br><b>A1</b> $\overrightarrow{OC}=\mathbf{a}+\tfrac23(\mathbf{b}-\mathbf{a})$<br><b>A1</b> $=\tfrac13\mathbf{a}+\tfrac23\mathbf{b}$` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: M`Translate the point (4, −1) by the vector $\binom{-2}{5}$.`, ms: M`<b>M1</b> add components<br><b>A1</b> (2, 4)` },
    { d: 1, type: "struct", marks: 1, q: M`Reflect the point (5, 2) in the y-axis.`, ms: M`<b>B1</b> (−5, 2)` },
    { d: 1, type: "mcq", marks: 1, q: M`Which transformation always keeps the orientation the same (no mirror-flip)?`, opts: ["reflection", "translation and rotation", "only reflection", "none"], ans: 1, why: M`Translations and rotations preserve orientation.` },
    { d: 1, type: "struct", marks: 2, q: M`Find the magnitude of the vector $\binom{-8}{15}$.`, ms: M`<b>M1</b> $\sqrt{64+225}$<br><b>A1</b> 17` },
    { d: 2, type: "struct", marks: 3, q: M`Describe fully the single transformation that maps (1, 2) onto (4, 2) and (3, 5) onto (6, 5).`, ms: M`<b>B1</b> translation<br><b>B1</b> vector $\binom{3}{0}$<br><b>B1</b> no other transformation needed (fully describes it)` },
    { d: 2, type: "struct", marks: 3, q: M`Triangle with vertices (1,1), (4,1), (1,2) is enlarged with scale factor 3, centre (1,1). Find the area of the image, given the object has area 1.5.`, ms: M`<b>M1</b> area scale factor $=3^2=9$<br><b>A1</b> $1.5\times9$<br><b>A1</b> 13.5` },
    { d: 2, type: "struct", marks: 3, q: M`$\overrightarrow{PQ}=\binom{6}{-2}$. $R$ is the point such that $\overrightarrow{PR}=\tfrac32\overrightarrow{PQ}$. Find $\overrightarrow{PR}$ and state what this tells you about P, Q and R.`, ms: M`<b>M1</b> $\tfrac32\binom{6}{-2}$<br><b>A1</b> $\binom{9}{-3}$<br><b>B1</b> P, Q, R are collinear (same direction)` },
    { d: 3, type: "struct", marks: 4, q: M`$OPQR$ is a parallelogram with $\overrightarrow{OP}=\mathbf{p}$ and $\overrightarrow{OR}=\mathbf{r}$. $S$ is the midpoint of $PQ$. Find $\overrightarrow{OS}$ and $\overrightarrow{RS}$ in terms of $\mathbf{p}$ and $\mathbf{r}$.`, ms: M`<b>M1</b> $\overrightarrow{OQ}=\mathbf{p}+\mathbf{r}$<br><b>M1</b> $\overrightarrow{OS}=\mathbf{p}+\tfrac12\mathbf{r}$<br><b>A1</b> $\overrightarrow{RS}=\overrightarrow{OS}-\mathbf{r}=\mathbf{p}-\tfrac12\mathbf{r}$` },
    { d: 3, type: "struct", marks: 4, q: M`A shape is reflected in the line $x=2$, then reflected in the line $x=5$. Describe the single transformation this is equivalent to.`, ms: M`<b>M1</b> two reflections in parallel lines give a translation<br><b>M1</b> distance between lines $=3$, translation $=2\times3=6$<br><b>A1</b> translation<br><b>A1</b> vector $\binom{6}{0}$ (direction from first to second line)` },
    { d: 3, type: "struct", marks: 4, q: M`In triangle $ABC$, $M$ is the midpoint of $BC$. $\overrightarrow{AB}=\mathbf{b}$ and $\overrightarrow{AC}=\mathbf{c}$. $G$ divides $AM$ so that $AG:GM=2:1$. Find $\overrightarrow{AG}$ in terms of $\mathbf{b}$ and $\mathbf{c}$.`, ms: M`<b>M1</b> $\overrightarrow{AM}=\tfrac12(\mathbf{b}+\mathbf{c})$<br><b>M1</b> $\overrightarrow{AG}=\tfrac23\overrightarrow{AM}$<br><b>A1</b> $=\tfrac23\times\tfrac12(\mathbf{b}+\mathbf{c})$<br><b>A1</b> $=\tfrac13(\mathbf{b}+\mathbf{c})$` }
  ]
});
}
