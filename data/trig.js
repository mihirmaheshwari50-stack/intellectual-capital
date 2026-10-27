window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
//@@HELPERS-START
// ---- diagram helpers for this topic ----
const triOAH = (angleAt, cap) => {
  const A = [60, 200], B = [340, 200], Cc = [340, 50];
  let s = F.poly([A, B, Cc], "k cS", true) + F.rightAngle(340, 200, -1, 0, 0, -1, 16);
  if (angleAt === "A") {
    s += F.arc(60, 200, 46, 0, 28.2, "k", "θ", 1.45);
    s += F.line(A[0], A[1], Cc[0], Cc[1], "b thick") + F.line(B[0], B[1], Cc[0], Cc[1], "o thick") + F.line(A[0], A[1], B[0], B[1], "g thick");
    s += F.text(180, 110, "hypotenuse", "tb bold", "end") + F.text(352, 130, "opposite", "to bold", "start") + F.text(200, 224, "adjacent", "tg bold");
  } else {
    s += F.arc(340, 50, 40, 208.2, 270, "k", "θ", 1.45);
    s += F.line(A[0], A[1], Cc[0], Cc[1], "b thick") + F.line(A[0], A[1], B[0], B[1], "o thick") + F.line(B[0], B[1], Cc[0], Cc[1], "g thick");
    s += F.text(180, 110, "hypotenuse", "tb bold", "end") + F.text(352, 130, "adjacent", "tg bold", "start") + F.text(200, 224, "opposite", "to bold");
  }
  return F.fig(440, 240, s, cap, { size: "small" });
};
const sinPlot = (o = {}) => F.plot(Object.assign({ w: 520, h: 230, x: [0, 380], y: [-1.4, 1.4], gridStep: [90, 0.5], ticks: { x: [90, 180, 270, 360], y: [-1, 1] }, tickFmt: { x: v => v + "°" }, m: { l: 34, r: 16, t: 14, b: 30 } }, o));
//@@HELPERS-END

/* ============================================================
   TRIGONOMETRY  (0580: E6.1–E6.6, E4.3 bearings)
   ============================================================ */
TOPICS.push({
  id: "trig", subject: "maths", unit: 6, title: "Trigonometry",
  blurb: "Pythagoras, SOH CAH TOA, exact values, trig graphs, sine and cosine rules, bearings and 3D.",
  level: "Core → Extended", demo: "trig",
  syllabus: [
    ["E6.1", "Know and use Pythagoras' theorem (and its converse)", 1],
    ["E6.2", "Use the sine, cosine and tangent ratios to find lengths in right-angled triangles", 2],
    ["E6.2", "Use inverse ratios to find angles in right-angled triangles", 3],
    ["E6.2", "Solve problems involving angles of elevation and depression", 4],
    ["E6.3", "Know the exact values of sin, cos and tan of 0°, 30°, 45°, 60° and 90°", 5],
    ["E6.4", "Recognise, sketch and interpret the graphs of $y=\\sin x$, $y=\\cos x$, $y=\\tan x$ for $0^\\circ\\le x\\le360^\\circ$", 6],
    ["E6.4", "Solve trigonometric equations such as $\\sin x=k$ for $0^\\circ\\le x\\le360^\\circ$", 7],
    ["E6.5", "Use the sine rule to find sides and angles, including the ambiguous case", 8],
    ["E6.5", "Use the cosine rule to find sides and angles", 9],
    ["E6.5", "Use the formula area $=\\tfrac12ab\\sin C$", 10],
    ["E4.3", "Use three-figure bearings and scale drawings", 11],
    ["E6.6", "Use Pythagoras and trigonometry in 3D, including the angle between a line and a plane", 12]
  ],
  sections: [
    { h: "Why trigonometry works", body: M`
<p class="lead">Trigonometry links the <b>angles</b> of a triangle to the <b>lengths</b> of its sides. All of it rests on one fact about similar triangles.</p>
<p>Take any right-angled triangle containing an angle $\theta$. Every other right-angled triangle with the same angle $\theta$ has the same three angles ($90^\circ$, $\theta$ and $90^\circ-\theta$), so it is an enlargement of the first one: the triangles are <b>similar</b>. In similar shapes, every length is multiplied by the same scale factor, so the <b>ratio</b> of any two sides stays the same however big or small the triangle is.</p>
<div class="viz" data-viz="similar"></div>
<p>So for a given angle, "opposite ÷ hypotenuse" is always the same number, whatever the size of the triangle. Mathematicians named these fixed ratios:</p>
$$\sin\theta=\frac{\text{opposite}}{\text{hypotenuse}}\qquad\cos\theta=\frac{\text{adjacent}}{\text{hypotenuse}}\qquad\tan\theta=\frac{\text{opposite}}{\text{adjacent}}$$
<p>Your calculator stores these ratios for every angle. That's all "sin" is: a lookup of the opposite-to-hypotenuse ratio for that angle.</p>
<h3>Naming the sides</h3>
${F.row(triOAH("A", "Relative to the angle θ at the bottom left."), triOAH("C", "The same triangle, relative to the other angle: opposite and adjacent <b>swap</b>. The hypotenuse never moves."))}
<ul><li><b>Hypotenuse</b>: the longest side, always <b>opposite the right angle</b>.</li>
<li><b>Opposite</b>: the side across from the angle you're using (it doesn't touch the angle).</li>
<li><b>Adjacent</b>: the side next to the angle that isn't the hypotenuse.</li></ul>
<p>Opposite and adjacent only make sense relative to a <b>particular angle</b>. Labelling from the wrong angle is a very common source of wrong answers, so mark the angle first, then label O, A, H.</p>
<div class="callout key"><b class="t">SOH CAH TOA</b>$\textbf{S}\text{in}=\dfrac{\textbf{O}}{\textbf{H}}$, $\;\textbf{C}\text{os}=\dfrac{\textbf{A}}{\textbf{H}}$, $\;\textbf{T}\text{an}=\dfrac{\textbf{O}}{\textbf{A}}$. To choose: circle the two sides involved in the question (one you know, one you want). The pair of letters tells you which ratio to use. If no angle is involved at all, use Pythagoras.</div>
<p>Because the hypotenuse is the longest side, $\sin\theta$ and $\cos\theta$ are always between 0 and 1 for angles in a right-angled triangle. $\tan\theta$ can be any positive number: it's less than 1 below 45°, equal to 1 at 45°, and greater than 1 above 45°.</p>`},

    { h: "Pythagoras' theorem (E6.1)", body: M`
$$a^2+b^2=c^2\qquad(c\text{ is the hypotenuse})$$
<p class="lead">In a right-angled triangle, the square on the hypotenuse equals the sum of the squares on the other two sides.</p>
<h3>Why it's true</h3>
${(() => { const o = 30, a = 150, b = 90, s2 = a + b, P = (x, y) => [o + x, o + y];
  let s = F.rect(o, o, s2, s2, "k");
  [[P(a, 0), P(s2, 0), P(s2, a)], [P(s2, a), P(s2, s2), P(b, s2)], [P(b, s2), P(0, s2), P(0, b)], [P(0, b), P(0, 0), P(a, 0)]].forEach(t => s += F.poly(t, "k oS", true));
  s += F.poly([P(a, 0), P(s2, a), P(b, s2), P(0, b)], "b thick bS", true) + F.text(o + s2 / 2, o + s2 / 2 + 7, "c²", "tb bold serif big");
  s += F.text(o + a / 2, o - 8, "a", "tk bold serif") + F.text(o + a + b / 2, o - 8, "b", "tk bold serif") + F.text(o - 10, o + b / 2 + 5, "b", "tk bold serif", "end") + F.text(o - 10, o + b + a / 2 + 5, "a", "tk bold serif", "end");
  return F.fig(300, 300, s, "A square of side $a+b$ holds four copies of the triangle and a tilted square of side $c$.", { size: "small" }); })()}
<p>The big square has area $(a+b)^2$. It's also made of four triangles, each of area $\tfrac12ab$, plus the tilted square $c^2$:</p>
$$(a+b)^2=4\times\tfrac12ab+c^2\;\Rightarrow\;a^2+2ab+b^2=2ab+c^2\;\Rightarrow\;a^2+b^2=c^2$$
<h3>Using it</h3>
<ul><li><b>Finding the hypotenuse:</b> square, <b>add</b>, square root. Sides 5 and 12: $c=\sqrt{25+144}=\sqrt{169}=13$.</li>
<li><b>Finding a shorter side:</b> square, <b>subtract</b>, square root. Hypotenuse 10, side 6: $a=\sqrt{100-36}=8$.</li></ul>
<div class="callout tip"><b class="t">Sense check</b>The hypotenuse must be the longest side. If your "shorter side" comes out longer than the hypotenuse, you added when you should have subtracted.</div>
<h3>The converse: proving a right angle</h3>
<p>If the sides of a triangle satisfy $a^2+b^2=c^2$, the angle opposite $c$ <b>is</b> a right angle. Sides 9, 12, 15: $81+144=225=15^2$ ✓, so it's right-angled. Sides 7, 8, 10: $49+64=113\neq100$, so it's not. In fact $113>100$ means the largest angle is acute; if $a^2+b^2\lt c^2$ the largest angle is obtuse.</p>
<p><b>Pythagorean triples</b> to recognise instantly: 3-4-5, 5-12-13, 8-15-17, 7-24-25, and their multiples (6-8-10, 9-12-15, 10-24-26).</p>
<h3>Where Pythagoras hides</h3>
<ul><li><b>Isosceles triangles</b>: the line of symmetry is a perpendicular height, which makes two right-angled triangles.</li>
<li><b>Distance between points</b>: from $(1,2)$ to $(7,10)$: across 6, up 8, so the distance is 10.</li>
<li><b>Rectangles</b>: the diagonal of a $5\times12$ rectangle is 13.</li>
<li><b>Circles</b>: a tangent meets a radius at 90°, and the angle in a semicircle is 90°.</li></ul>
<details class="check"><summary>An isosceles triangle has sides 10 cm, 10 cm and 12 cm. Find its height and area.</summary><div>Half the base is 6, so height $=\sqrt{100-36}=8$ cm. Area $=\tfrac12\times12\times8=48$ cm².</div></details>
<details class="check"><summary>Is a triangle with sides 20, 21 and 29 right-angled?</summary><div>$400+441=841=29^2$, so yes.</div></details>`},

    { h: "Finding sides with SOH CAH TOA (E6.2)", body: M`
<ol class="steps-inline"><li>Mark the given angle. Label the sides O, A, H relative to it.</li>
<li>Identify the side you know and the side you want. Choose sin, cos or tan.</li>
<li>Write the equation, e.g. $\sin35^\circ=\dfrac{x}{12}$.</li>
<li>Rearrange and calculate. Give the answer to 3 s.f. unless told otherwise.</li></ol>
${F.row(
  (() => { let s = F.poly([[40, 190], [300, 190], [300, 60]], "k cS", true) + F.rightAngle(300, 190, -1, 0, 0, -1, 14) + F.arc(40, 190, 50, 0, 26.6, "k", "35°", 1.6) + F.text(160, 110, "12", "tb bold big", "end") + F.text(312, 130, "x", "to bold big serif", "start");
    return F.fig(360, 220, s, "Unknown on <b>top</b>: $\\sin35^\\circ=\\dfrac x{12}$, so $x=12\\sin35^\\circ=6.88$"); })(),
  (() => { let s = F.poly([[40, 190], [300, 190], [300, 60]], "k cS", true) + F.rightAngle(300, 190, -1, 0, 0, -1, 14) + F.arc(40, 190, 50, 0, 26.6, "k", "35°", 1.6) + F.text(160, 110, "y", "tb bold big serif", "end") + F.text(170, 212, "8", "tg bold big");
    return F.fig(360, 230, s, "Unknown on the <b>bottom</b>: $\\cos35^\\circ=\\dfrac 8y$, so $y=\\dfrac{8}{\\cos35^\\circ}=9.77$"); })()
)}
<p>When the unknown is in the <b>numerator</b>, multiply: $x=12\sin35^\circ$. When it's in the <b>denominator</b>, the unknown and the trig value swap places: from $\cos35^\circ=\dfrac8y$, multiply both sides by $y$ to get $y\cos35^\circ=8$, then divide: $y=\dfrac{8}{\cos35^\circ}$.</p>
<div class="callout tip"><b class="t">The triangle trick</b>For $\sin=\dfrac OH$, draw a triangle with O on top and S and H underneath. Cover the one you want: O = S × H, and H = O ÷ S. The same works for CAH and TOA.</div>
<div class="callout warn"><b class="t">Calculator in degrees</b>Check for a small D or DEG on the screen. In radian mode, $\sin30$ gives $-0.988$ instead of $0.5$. Every trig answer will be wrong but look plausible. Test with $\sin30=0.5$ at the start of every exam.</div>
<div class="callout ex"><b class="t">Worked example</b>A ladder 6.5 m long leans against a wall at 72° to the ground. How high up the wall does it reach?<br>Hypotenuse 6.5 (the ladder), height is opposite the 72° angle, so use sin: $h=6.5\sin72^\circ=6.18$ m.</div>
<details class="check"><summary>In a right-angled triangle, the side adjacent to a 50° angle is 7 cm. Find the opposite side.</summary><div>$\tan50^\circ=\dfrac{x}{7}$, so $x=7\tan50^\circ=8.34$ cm.</div></details>
<details class="check"><summary>The side opposite a 28° angle is 5 cm. Find the hypotenuse.</summary><div>$\sin28^\circ=\dfrac{5}{h}$, so $h=\dfrac{5}{\sin28^\circ}=10.7$ cm.</div></details>`},

    { h: "Finding angles: inverse trig (E6.2)", body: M`
<p class="lead">To find an angle you work backwards from the ratio, using the <b>inverse</b> functions $\sin^{-1}$, $\cos^{-1}$ and $\tan^{-1}$ (SHIFT + sin on most calculators).</p>
<p>$\sin^{-1}(0.5)$ asks: "which angle has a sine of 0.5?" The answer is $30^\circ$. It is <b>not</b> $\dfrac{1}{\sin0.5}$. The "$-1$" here means <i>inverse function</i>, not reciprocal.</p>
${(() => { let s = F.poly([[40, 190], [320, 190], [320, 70]], "k cS", true) + F.rightAngle(320, 190, -1, 0, 0, -1, 14) + F.arc(40, 190, 50, 0, 23.2, "r", "θ", 1.55) + F.text(332, 136, "4.2 cm", "to bold", "start") + F.text(180, 214, "9.8 cm", "tg bold");
  return F.fig(400, 230, s, "Opposite 4.2 and adjacent 9.8 give $\\tan\\theta=\\dfrac{4.2}{9.8}$, so $\\theta=\\tan^{-1}(0.4286)=23.2^\\circ$", { size: "small" }); })()}
<ol class="steps-inline"><li>Label O, A, H relative to the <b>unknown</b> angle.</li><li>Pick the ratio from the two known sides.</li><li>Write $\theta=\tan^{-1}\!\left(\dfrac{4.2}{9.8}\right)$ and type it in one go.</li><li>Round to 1 d.p. (the standard for angles).</li></ol>
<div class="callout warn"><b class="t">Accuracy</b>If you round the ratio first ($0.4286\to0.43$) you get $23.3^\circ$, which may lose the accuracy mark. Type the fraction straight into the inverse function, or use the ANS key.</div>
<p>Once you have one angle, the third angle is $90^\circ$ minus it. Use this as a check if you calculate both.</p>
<details class="check"><summary>A ramp rises 1.2 m over a horizontal distance of 8 m. Find its angle to the horizontal.</summary><div>$\theta=\tan^{-1}\!\left(\dfrac{1.2}{8}\right)=8.5^\circ$.</div></details>
<details class="check"><summary>Hypotenuse 15, adjacent 11. Find the angle.</summary><div>$\theta=\cos^{-1}\!\left(\dfrac{11}{15}\right)=42.8^\circ$.</div></details>`},

    { h: "Angles of elevation and depression (E6.2)", body: M`
<p class="lead">Both are measured <b>from the horizontal</b>. Elevation is looking <b>up</b> and depression is looking <b>down</b>. Neither is ever measured from the vertical.</p>
${(() => { let s = F.line(30, 220, 520, 220, "k") + F.rect(430, 60, 40, 160, "k mS") + F.circ(80, 208, 10, "k bS");
  s += F.line(80, 208, 450, 60, "c mid") + F.line(80, 208, 300, 208, "m d") + F.arc(80, 208, 70, 0, 21.8, "c", "elevation", 1.75);
  s += F.line(450, 60, 230, 60, "m d") + F.arc(450, 60, 70, 180, 201.8, "o", "depression", 1.7);
  s += F.text(470, 50, "top of tower", "tk small", "middle") + F.text(80, 240, "observer", "tk small");
  return F.fig(540, 260, s, "The angle of elevation from the observer equals the angle of depression from the top, because the two horizontals are parallel (alternate angles).", { size: "wide" }); })()}
<p>Draw the horizontal line at the observer's eye (dashed), then the line of sight. The angle between them is what you're given. Because the horizontal lines at the top and bottom are <b>parallel</b>, the angle of depression from the top equals the angle of elevation from the bottom: they're <b>alternate angles</b>. So you can always move the angle to the bottom of the diagram, inside the right-angled triangle.</p>
<div class="callout ex"><b class="t">Worked example</b>From the top of a 50 m cliff, the angle of depression of a boat is 20°. How far is the boat from the foot of the cliff?<br>The angle at the boat (elevation) is also 20°. Opposite (50) and adjacent ($d$): $\tan20^\circ=\dfrac{50}{d}$, so $d=\dfrac{50}{\tan20^\circ}=137$ m.</div>
<h3>Two-angle problems</h3>
${(() => { const g = 220, Tx = 480, Th = 70; let s = F.line(20, g, 520, g, "k") + F.line(Tx, g, Tx, Th, "k thick") + F.rightAngle(Tx, g, -1, 0, 0, -1, 12);
  s += F.line(80, g, Tx, Th, "c mid") + F.line(260, g, Tx, Th, "o mid") + F.arc(80, g, 54, 0, 20.6, "c", "30°", 1.5) + F.arc(260, g, 44, 0, 34.3, "o", "45°", 1.5);
  s += F.dot(80, g, "k") + F.dot(260, g, "k") + F.text(80, g + 20, "P", "tk bold") + F.text(260, g + 20, "Q", "tk bold") + F.dim(80, g + 34, 260, g + 34, "20 m", "m") + F.text(Tx + 10, (g + Th) / 2, "h", "tk bold big serif", "start");
  return F.fig(540, 280, s, "Two triangles share the height $h$. Write $h$ two ways and solve.", { size: "wide" }); })()}
<p>From P the angle of elevation is 30°; from Q, 20 m closer, it's 45°. Let $d$ be the distance from Q to the tower's base:</p>
<ul><li>From Q: $\tan45^\circ=\dfrac hd$, so $h=d$.</li><li>From P: $\tan30^\circ=\dfrac{h}{d+20}$, so $h=(d+20)\tan30^\circ$.</li>
<li>Equate: $d=(d+20)\tan30^\circ\Rightarrow d(1-\tan30^\circ)=20\tan30^\circ\Rightarrow d=27.3$, so $h=27.3$ m.</li></ul>
<h3>Shortest distance</h3>
<p>The shortest distance from a point to a straight line (a path, a coastline) is the <b>perpendicular</b> distance. That perpendicular gives you a right angle to work with.</p>
<details class="check"><summary>A kite string is 45 m long and makes an angle of elevation of 52°. How high is the kite (ignore the person's height)?</summary><div>$45\sin52^\circ=35.5$ m.</div></details>`},

    { h: "Exact values (E6.3)", body: M`
<p class="lead">For 30°, 45° and 60° the ratios have exact surd values. Non-calculator questions expect them, so you need to know them, or better, be able to rebuild them in 20 seconds.</p>
${F.row(
  (() => { let s = F.poly([[40, 230], [280, 230], [160, 22]], "m d thin", true) + F.poly([[40, 230], [160, 230], [160, 22]], "k bS", true) + F.rightAngle(160, 230, -1, 0, 0, -1, 12);
    s += F.text(100, 252, "1", "tk bold big") + F.text(172, 130, "√3", "tk bold big", "start") + F.text(88, 120, "2", "tk bold big", "end") + F.arc(40, 230, 34, 0, 60, "o", "60°", 1.7) + F.arc(160, 22, 40, 240, 270, "o", "30°", 1.6);
    return F.fig(320, 270, s, "Half of an equilateral triangle of side 2: sides 1, √3, 2 with angles 30°, 60°, 90°."); })(),
  (() => { let s = F.poly([[50, 220], [230, 220], [230, 40]], "k gS", true) + F.rightAngle(230, 220, -1, 0, 0, -1, 12);
    s += F.text(140, 244, "1", "tk bold big") + F.text(244, 136, "1", "tk bold big", "start") + F.text(124, 120, "√2", "tk bold big", "end") + F.arc(50, 220, 40, 0, 45, "o", "45°", 1.6);
    return F.fig(300, 260, s, "Isosceles right-angled triangle with legs 1: hypotenuse √2, both angles 45°."); })()
)}
<p>The height of the equilateral triangle comes from Pythagoras: $\sqrt{2^2-1^2}=\sqrt3$. Now read each ratio straight from the triangles:</p>
<table class="t"><tr><th>$\theta$</th><th>0°</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th></tr>
<tr><td>$\sin\theta$</td><td>0</td><td>$\tfrac12$</td><td>$\tfrac{1}{\sqrt2}=\tfrac{\sqrt2}{2}$</td><td>$\tfrac{\sqrt3}{2}$</td><td>1</td></tr>
<tr><td>$\cos\theta$</td><td>1</td><td>$\tfrac{\sqrt3}{2}$</td><td>$\tfrac{\sqrt2}{2}$</td><td>$\tfrac12$</td><td>0</td></tr>
<tr><td>$\tan\theta$</td><td>0</td><td>$\tfrac{1}{\sqrt3}=\tfrac{\sqrt3}{3}$</td><td>1</td><td>$\sqrt3$</td><td>undefined</td></tr></table>
<p>The 0° and 90° values come from imagining the angle squashed flat (opposite → 0) or standing up (adjacent → 0). $\tan90^\circ$ would mean dividing by zero, so it's undefined.</p>
<div class="callout tip"><b class="t">Patterns that help</b>The sin row is $\tfrac{\sqrt0}2,\tfrac{\sqrt1}2,\tfrac{\sqrt2}2,\tfrac{\sqrt3}2,\tfrac{\sqrt4}2$ and the cos row is the same backwards, because $\cos\theta=\sin(90^\circ-\theta)$. And $\tan\theta=\dfrac{\sin\theta}{\cos\theta}$ always: $\tan60^\circ=\dfrac{\sqrt3/2}{1/2}=\sqrt3$.</div>
<div class="callout ex"><b class="t">Worked example (no calculator)</b>A right-angled triangle has hypotenuse 10 cm and an angle of 60°. Find the exact side opposite the 60°.<br>$x=10\sin60^\circ=10\times\dfrac{\sqrt3}{2}=5\sqrt3$ cm.</div>
<details class="check"><summary>Find the exact value of $\sin45^\circ\times\cos45^\circ+\tan60^\circ\times\tan30^\circ$.</summary><div>$\dfrac{\sqrt2}{2}\cdot\dfrac{\sqrt2}{2}+\sqrt3\cdot\dfrac1{\sqrt3}=\dfrac24+1=\dfrac32$.</div></details>`},

    { h: "Graphs of sin, cos and tan (E6.4)", body: M`
<p class="lead">Trig ratios aren't just for triangles. Defining them on a <b>unit circle</b> extends them to every angle, including obtuse, reflex and beyond 360°, and gives them their famous wave-shaped graphs.</p>
<p>Put a point on a circle of radius 1, at angle $\theta$ anticlockwise from the positive $x$-axis. Draw a right-angled triangle down to the axis. The hypotenuse is 1, so $\sin\theta=\dfrac{\text{opp}}{1}$, which is the point's <b>height</b> $y$, and $\cos\theta$ is its <b>horizontal position</b> $x$. As the point goes round, $y$ and $x$ rise and fall: that's where the waves come from. Below 0 they become <b>negative</b>, which is why trig values can be negative.</p>
<div class="viz" data-viz="trigGraph"></div>
${sinPlot({ curves: [{ f: x => Math.sin(x * Math.PI / 180), c: "b thick", label: "y = sin x", lpos: [300, -0.866], ldx: 10, ldy: 4 }], marks: [{ x: 90, y: 1, c: "b", label: "(90°, 1)", pos: "ne" }, { x: 270, y: -1, c: "b", label: "(270°, −1)", pos: "se" }, { x: 180, y: 0, c: "k" }, { x: 360, y: 0, c: "k" }], cap: "$y=\\sin x$: starts at 0, maximum 1 at 90°, back to 0 at 180°, minimum −1 at 270°, 0 again at 360°." })}
${sinPlot({ curves: [{ f: x => Math.cos(x * Math.PI / 180), c: "o thick", label: "y = cos x", lpos: [300, 0.5], ldx: 10, ldy: 4 }], marks: [{ x: 0, y: 1, c: "o", label: "(0°, 1)", pos: "ne" }, { x: 180, y: -1, c: "o", label: "(180°, −1)", pos: "se" }, { x: 90, y: 0, c: "k" }, { x: 270, y: 0, c: "k" }], cap: "$y=\\cos x$: the same wave shifted 90° left. It starts at its maximum, crosses zero at 90° and 270°, and has a minimum at 180°." })}
${F.plot({ w: 520, h: 280, x: [0, 380], y: [-4, 4], gridStep: [90, 1], ticks: { x: [90, 180, 270, 360], y: [-3, -2, -1, 1, 2, 3] }, tickFmt: { x: v => v + "°" }, m: { l: 34, r: 16, t: 14, b: 30 },
  curves: [{ f: x => Math.tan(x * Math.PI / 180), dom: [0, 89], c: "g thick" }, { f: x => Math.tan(x * Math.PI / 180), dom: [91, 269], c: "g thick", label: "y = tan x", lpos: [150, -0.58], ldx: 6, ldy: 18 }, { f: x => Math.tan(x * Math.PI / 180), dom: [271, 360], c: "g thick" }],
  marks: [{ x: 45, y: 1, c: "g", label: "(45°, 1)", pos: "w" }, { x: 180, y: 0, c: "k" }],
  extra: (X, Y) => F.line(X(90), Y(-4), X(90), Y(4), "r d") + F.line(X(270), Y(-4), X(270), Y(4), "r d") + F.text(X(90) + 4, Y(3.6), "asymptote", "tr small", "start"),
  cap: "$y=\\tan x$: repeats every 180°, passes through (0°, 0), (180°, 0), (360°, 0), and has vertical asymptotes at 90° and 270°, where it shoots off to ±∞." })}
<table class="t"><tr><th></th><th>$y=\sin x$</th><th>$y=\cos x$</th><th>$y=\tan x$</th></tr>
<tr><td>Value at 0°</td><td>0</td><td>1</td><td>0</td></tr>
<tr><td>Range of $y$</td><td>$-1\le y\le1$</td><td>$-1\le y\le1$</td><td>all real numbers</td></tr>
<tr><td>Period (repeats every)</td><td>360°</td><td>360°</td><td>180°</td></tr>
<tr><td>Max / min</td><td>1 at 90°, −1 at 270°</td><td>1 at 0° and 360°, −1 at 180°</td><td>none</td></tr>
<tr><td>Zeros (0–360°)</td><td>0°, 180°, 360°</td><td>90°, 270°</td><td>0°, 180°, 360°</td></tr>
<tr><td>Asymptotes</td><td>—</td><td>—</td><td>$x=90^\circ$, $x=270^\circ$</td></tr></table>
<h3>Symmetries you'll use to solve equations</h3>
<ul><li>$\sin x$ is symmetric about $x=90^\circ$ (and $270^\circ$): $\;\sin(180^\circ-x)=\sin x$. For example, $\sin150^\circ=\sin30^\circ=0.5$.</li>
<li>$\cos x$ is symmetric about $x=180^\circ$: $\;\cos(360^\circ-x)=\cos x$. For example, $\cos300^\circ=\cos60^\circ=0.5$.</li>
<li>$\tan x$ repeats every 180°: $\;\tan(x+180^\circ)=\tan x$.</li></ul>
<div class="callout tip"><b class="t">Sketching in the exam</b>Mark 90°, 180°, 270° and 360° on the $x$-axis and ±1 on the $y$-axis first. Then plot the five key points and join them with a smooth wave. The waves are rounded at the peaks, not pointed.</div>
<details class="check"><summary>For which values of $x$ between 0° and 360° is $\cos x$ negative?</summary><div>$90^\circ\lt x\lt 270^\circ$, where the cos graph is below the axis.</div></details>`},

    { h: "Solving trig equations (E6.4)", body: M`
<p class="lead">An equation like $\sin x=0.5$ has <b>infinitely many</b> solutions, because the wave keeps repeating. You'll be asked for all solutions in a range, usually $0^\circ\le x\le360^\circ$. The calculator gives only one, and the graph gives you the rest.</p>
${sinPlot({ curves: [{ f: x => Math.sin(x * Math.PI / 180), c: "b thick" }, { f: x => 0.5, c: "r mid", label: "y = 0.5", lpos: [370, 0.5], ldx: -50, ldy: -6 }], marks: [{ x: 30, y: 0.5, c: "r", label: "30°", pos: "nw" }, { x: 150, y: 0.5, c: "r", label: "150°", pos: "ne" }],
  extra: (X, Y) => F.line(X(30), Y(.5), X(30), Y(0), "r d thin") + F.line(X(150), Y(.5), X(150), Y(0), "r d thin"),
  cap: "$\\sin x=0.5$: the line meets the curve twice between 0° and 360°. The calculator gives 30°, and symmetry about 90° gives $180^\\circ-30^\\circ=150^\\circ$." })}
<ol class="steps-inline"><li>Rearrange to $\sin x=k$ (or cos, or tan).</li>
<li>Use the inverse on your calculator to get the <b>principal value</b> $\alpha$.</li>
<li>Use the symmetry of the graph to find the second value:
<br>$\sin$: $\;180^\circ-\alpha$ &nbsp;|&nbsp; $\cos$: $\;360^\circ-\alpha$ &nbsp;|&nbsp; $\tan$: $\;\alpha+180^\circ$</li>
<li>Add or subtract 360° to bring any answers into the required range, and discard any outside it.</li>
<li><b>Sketch</b> the graph with the line $y=k$ to check how many solutions there should be.</li></ol>
${sinPlot({ curves: [{ f: x => Math.sin(x * Math.PI / 180), c: "b thick" }, { f: x => -0.4, c: "r mid", label: "y = −0.4", lpos: [10, -0.4], ldx: 4, ldy: 18 }], marks: [{ x: 203.6, y: -0.4, c: "r", label: "203.6°", pos: "sw" }, { x: 336.4, y: -0.4, c: "r", label: "336.4°", pos: "se" }],
  extra: (X, Y) => F.line(X(203.6), Y(-.4), X(203.6), Y(0), "r d thin") + F.line(X(336.4), Y(-.4), X(336.4), Y(0), "r d thin"),
  cap: "$\\sin x=-0.4$: the calculator gives −23.6°, which is outside the range. The two solutions in range are $180^\\circ+23.6^\\circ$ and $360^\\circ-23.6^\\circ$." })}
<div class="callout ex"><b class="t">Worked example: negative value</b>Solve $\sin x=-0.4$, $0^\circ\le x\le360^\circ$.<br>$\sin^{-1}(-0.4)=-23.6^\circ$ (out of range). By the symmetry rule, $180^\circ-(-23.6^\circ)=203.6^\circ$. Adding 360° to the original: $-23.6^\circ+360^\circ=336.4^\circ$.<br>Solutions: $203.6^\circ$ and $336.4^\circ$.</div>
<div class="callout ex"><b class="t">Worked example: cos</b>Solve $2\cos x+1=0$, $0^\circ\le x\le360^\circ$.<br>$\cos x=-\tfrac12\Rightarrow\alpha=\cos^{-1}(-0.5)=120^\circ$. Second: $360^\circ-120^\circ=240^\circ$. Solutions $120^\circ$ and $240^\circ$.</div>
<div class="callout ex"><b class="t">Worked example: tan</b>Solve $\tan x=2$, $0^\circ\le x\le360^\circ$.<br>$\alpha=63.4^\circ$, then $63.4^\circ+180^\circ=243.4^\circ$. (Adding another 180° gives 423.4°, out of range.)</div>
<div class="callout warn"><b class="t">Lost marks</b>Giving only the calculator answer (one solution out of two). Including answers outside the range: you lose a mark for each extra. Trying to solve $\sin x=1.3$: there's no solution, because $-1\le\sin x\le1$.</div>
<details class="check"><summary>Solve $\cos x=0.3$ for $0^\circ\le x\le360^\circ$.</summary><div>$72.5^\circ$ and $360^\circ-72.5^\circ=287.5^\circ$.</div></details>
<details class="check"><summary>Solve $3\tan x=-4$ for $0^\circ\le x\le360^\circ$.</summary><div>$\tan x=-\tfrac43$, $\alpha=-53.1^\circ$. Add 180°: $126.9^\circ$. Add 360°: $306.9^\circ$.</div></details>`},

    { h: "The sine rule (E6.5)", body: M`
<p class="lead">For triangles <b>without</b> a right angle, SOH CAH TOA no longer applies directly. Two new rules take over. First, the labelling convention:</p>
${(() => { const A = [50, 220], B = [420, 220], Cc = [300, 50]; let s = F.poly([A, B, Cc], "k cS", true);
  s += F.text(36, 236, "A", "tk bold big") + F.text(434, 236, "B", "tk bold big") + F.text(300, 38, "C", "tk bold big");
  s += F.text(375, 130, "a", "to bold big serif", "start") + F.text(160, 126, "b", "to bold big serif", "end") + F.text(235, 246, "c", "to bold big serif");
  return F.fig(470, 260, s, "Angles are capital letters at the vertices. Each side is the lowercase letter of the angle <b>opposite</b> it: side $a$ is opposite angle $A$.", { size: "small" }); })()}
$$\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}\qquad\text{or flipped}\qquad\frac{\sin A}{a}=\frac{\sin B}{b}=\frac{\sin C}{c}$$
<h3>Why it's true</h3>
${(() => { const A = [50, 220], B = [420, 220], Cc = [300, 50], H = [300, 220]; let s = F.poly([A, B, Cc], "k cS", true) + F.line(300, 50, 300, 220, "r mid d") + F.rightAngle(300, 220, -1, 0, 0, -1, 12);
  s += F.text(312, 150, "h", "tr bold big serif", "start") + F.text(36, 236, "A", "tk bold") + F.text(434, 236, "B", "tk bold") + F.text(300, 38, "C", "tk bold") + F.text(160, 126, "b", "to bold serif", "end") + F.text(375, 130, "a", "to bold serif", "start");
  return F.fig(470, 250, s, "Drop the perpendicular $h$ from C. In the left triangle $h=b\\sin A$; in the right one $h=a\\sin B$.", { size: "small" }); })()}
<p>Both expressions equal $h$, so $b\sin A=a\sin B$. Divide both sides by $\sin A\sin B$ to get $\dfrac{a}{\sin A}=\dfrac{b}{\sin B}$. Dropping the perpendicular from a different vertex brings in $c$.</p>
<h3>When to use it</h3>
<p>Use the sine rule when you know <b>a side and its opposite angle</b> (a "matching pair"), plus one more side or angle. In practice that's AAS or ASA (two angles and a side), or SSA (two sides and a non-included angle).</p>
<div class="callout ex"><b class="t">Worked example: finding a side</b>$A=48^\circ$, $B=71^\circ$, $a=12$ cm. Find $b$.<br>Pair: $a$ and $A$. Put the unknown on top: $\dfrac{b}{\sin71^\circ}=\dfrac{12}{\sin48^\circ}\Rightarrow b=\dfrac{12\sin71^\circ}{\sin48^\circ}=15.3$ cm.</div>
<div class="callout ex"><b class="t">Worked example: finding an angle</b>$a=9$, $b=7$, $A=65^\circ$. Find $B$.<br>Use the flipped form so the unknown is on top: $\dfrac{\sin B}{7}=\dfrac{\sin65^\circ}{9}\Rightarrow\sin B=0.7049\Rightarrow B=44.8^\circ$.</div>
<h3>The ambiguous case</h3>
${(() => { const A = [40, 220]; const ang = 35 * Math.PI / 180, b = 230, Cc = [A[0] + b * Math.cos(ang), A[1] - b * Math.sin(ang)], a = 160;
  const h = b * Math.sin(ang), dx = Math.sqrt(a * a - h * h), B1 = [Cc[0] - dx, 220], B2 = [Cc[0] + dx, 220];
  let s = F.line(20, 220, 520, 220, "m thin") + F.line(A[0], A[1], Cc[0], Cc[1], "k thick") + F.line(Cc[0], Cc[1], B1[0], B1[1], "o thick") + F.line(Cc[0], Cc[1], B2[0], B2[1], "b thick");
  s += F.path(`M${B1[0] - 30},${220 - 50} A${a},${a} 0 0 0 ${B2[0] + 25},${220 - 40}`, "m d thin");
  s += F.arc(A[0], A[1], 40, 0, 35, "k", "35°", 1.5) + F.dot(B1[0], B1[1], "o") + F.dot(B2[0], B2[1], "b") + F.text(B1[0], 240, "B₁", "to bold") + F.text(B2[0], 240, "B₂", "tb bold") + F.text(A[0] - 6, 240, "A", "tk bold") + F.text(Cc[0], Cc[1] - 10, "C", "tk bold");
  s += F.text(120, 140, "b", "tk bold serif big", "end") + F.text((Cc[0] + B1[0]) / 2 - 8, (Cc[1] + 220) / 2, "a", "to bold serif big", "end") + F.text((Cc[0] + B2[0]) / 2 + 8, (Cc[1] + 220) / 2, "a", "tb bold serif big", "start");
  return F.fig(540, 260, s, "Given $A$, $b$ and a shorter side $a$, the side $a$ can swing to meet the base at two points, giving two different triangles: one with an acute angle at B, one obtuse.", { size: "wide" }); })()}
<p>When you use the sine rule to find an <b>angle</b>, remember that $\sin\theta=\sin(180^\circ-\theta)$. So $\sin B=0.8264$ gives $B=55.7^\circ$ <b>or</b> $B=124.3^\circ$. Both are possible if $124.3^\circ$ plus the known angle is less than $180^\circ$. Usually the diagram tells you which one: if angle B is clearly obtuse, use $180^\circ-$ the calculator value.</p>
<div class="callout tip"><b class="t">When can't it be ambiguous?</b>If the side opposite the known angle is the <b>longer</b> of the two given sides, only the acute answer works. Ambiguity needs the side opposite the known angle to be the shorter one.</div>
<details class="check"><summary>In triangle PQR, $P=40^\circ$, $p=7$ and $q=9$. Find the two possible values of $Q$.</summary><div>$\sin Q=\dfrac{9\sin40^\circ}{7}=0.8264$, so $Q=55.7^\circ$ or $124.3^\circ$. Both are valid since $124.3+40<180$.</div></details>`},

    { h: "The cosine rule (E6.5)", body: M`
$$a^2=b^2+c^2-2bc\cos A\qquad\qquad\cos A=\frac{b^2+c^2-a^2}{2bc}$$
<p class="lead">The cosine rule handles the two situations the sine rule can't: <b>two sides and the angle between them</b> (SAS) to find the third side, and <b>three sides</b> (SSS) to find an angle.</p>
${F.row(
  (() => { let s = F.poly([[40, 200], [330, 200], [230, 40]], "k cS", true) + F.arc(40, 200, 46, 0, 39.5, "r", "62°", 1.55) + F.text(124, 112, "10", "tb bold big", "end") + F.text(185, 224, "7", "tb bold big") + F.text(290, 118, "?", "tr bold big", "start");
    return F.fig(370, 240, s, "SAS: two sides and the <b>included</b> angle, so find the third side."); })(),
  (() => { let s = F.poly([[40, 200], [330, 200], [210, 50]], "k cS", true) + F.text(116, 116, "5", "tb bold big", "end") + F.text(185, 224, "9", "tb bold big") + F.text(282, 120, "7", "tb bold big", "start") + F.arc(210, 50, 34, 221.4, 308.7, "r", "?", 1.6);
    return F.fig(370, 240, s, "SSS: all three sides, so find any angle. Start with the largest (opposite the longest side)."); })()
)}
<h3>Making sense of it</h3>
<p>It's <b>Pythagoras with a correction term</b>. If $A=90^\circ$, $\cos A=0$ and the rule becomes $a^2=b^2+c^2$. If $A$ is acute, $\cos A>0$, so you subtract: $a$ is shorter than the Pythagoras value (the sides close in). If $A$ is obtuse, $\cos A<0$, so you effectively add: $a$ is longer.</p>
<p>The <b>letters must match</b>: the side on the left ($a$) is opposite the angle in the cosine ($A$), and $b$ and $c$ are the two sides that form that angle. You can relabel any triangle to fit.</p>
<div class="callout ex"><b class="t">Worked example: finding a side (SAS)</b>$b=10$, $c=7$, $A=62^\circ$. Find $a$.<br>$a^2=10^2+7^2-2(10)(7)\cos62^\circ=149-140(0.46947)=149-65.73=83.27$.<br>$a=\sqrt{83.27}=9.13$ cm.</div>
<div class="callout warn"><b class="t">Calculator trap</b>Typing "149 − 140" first and then multiplying by cos 62° gives $9\times0.469$, which is wrong. BIDMAS says multiply before subtracting. Either type the whole expression in one go, or work out $140\cos62^\circ$ first.</div>
<div class="callout ex"><b class="t">Worked example: finding an angle (SSS)</b>Sides 5, 7, 9. Find the largest angle (opposite 9).<br>$\cos\theta=\dfrac{5^2+7^2-9^2}{2(5)(7)}=\dfrac{25+49-81}{70}=\dfrac{-7}{70}=-0.1$.<br>$\theta=\cos^{-1}(-0.1)=95.7^\circ$. A negative cosine means obtuse, and $\cos^{-1}$ handles this correctly. Unlike the sine rule, the cosine rule is <b>never ambiguous</b>.</div>
<h3>Choosing the right rule</h3>
<table class="t"><tr><th>You know</th><th>You want</th><th>Use</th></tr>
<tr><td>Right angle, two sides</td><td>third side</td><td>Pythagoras</td></tr>
<tr><td>Right angle, a side and an angle</td><td>side or angle</td><td>SOH CAH TOA</td></tr>
<tr><td>Two sides + included angle (SAS)</td><td>third side</td><td>Cosine rule</td></tr>
<tr><td>Three sides (SSS)</td><td>an angle</td><td>Cosine rule (rearranged)</td></tr>
<tr><td>A side + opposite angle + one more</td><td>side or angle</td><td>Sine rule</td></tr>
<tr><td>Two sides + included angle</td><td>area</td><td>$\tfrac12ab\sin C$</td></tr></table>
<details class="check"><summary>Two sides of a triangle are 8 cm and 11 cm with 125° between them. Find the third side.</summary><div>$a^2=64+121-176\cos125^\circ=185+100.95=285.95$, so $a=16.9$ cm. (Subtracting a negative adds.)</div></details>`},

    { h: "Area of a triangle: ½ab sin C (E6.5)", body: M`
$$\text{Area}=\tfrac12ab\sin C$$
<p class="lead">This lets you find the area without knowing the perpendicular height, as long as you have <b>two sides and the angle between them</b>.</p>
${(() => { let s = F.poly([[40, 210], [400, 210], [250, 50]], "k cS", true) + F.line(250, 50, 250, 210, "r mid d") + F.rightAngle(250, 210, -1, 0, 0, -1, 12);
  s += F.text(240, 150, "h = b sin C", "tr bold", "end") + F.arc(400, 210, 50, 133.2, 180, "k", "C", 1.5) + F.text(220, 232, "a", "tb bold serif big") + F.text(340, 118, "b", "tb bold serif big", "start");
  return F.fig(440, 250, s, "The height is $h=b\\sin C$, so area $=\\tfrac12\\times\\text{base}\\times\\text{height}=\\tfrac12ab\\sin C$.", { size: "small" }); })()}
<p>It's just "½ × base × height" with the height worked out by trigonometry. The angle must be <b>between</b> the two sides you use (the included angle). With sides $a$ and $b$ you need angle $C$.</p>
<div class="callout ex"><b class="t">Worked example</b>Sides 7 cm and 10 cm, included angle 62°: area $=\tfrac12(7)(10)\sin62^\circ=35\times0.8829=30.9$ cm².</div>
<div class="callout ex"><b class="t">Working backwards</b>A triangle has area 30 cm² and sides 8 cm and 10 cm. Find the acute angle between them.<br>$\tfrac12(8)(10)\sin C=30\Rightarrow\sin C=0.75\Rightarrow C=48.6^\circ$. (The obtuse $131.4^\circ$ gives the same area.)</div>
<p><b>Segments of circles</b>: area of a segment = area of the sector $-$ area of the triangle, using $\tfrac12r^2\sin\theta$ for the triangle formed by two radii.</p>
<details class="check"><summary>Find the area of a parallelogram with sides 6 cm and 9 cm and an angle of 70°.</summary><div>Two congruent triangles: $2\times\tfrac12(6)(9)\sin70^\circ=54\sin70^\circ=50.7$ cm².</div></details>`},

    { h: "Bearings (E4.3)", body: M`
<p class="lead">A bearing describes a direction as an angle measured <b>clockwise from North</b>, always written with <b>three figures</b>: 045°, 120°, 300°.</p>
${F.row(
  (() => { const P = [150, 150]; let s = F.arrow(P[0], P[1], P[0], 30, "k mid", 10) + F.text(P[0], 22, "N", "tk bold") + F.arrow(P[0], P[1], P[0] + 120 * Math.sin(Math.PI / 3), P[1] - 120 * Math.cos(Math.PI / 3), "c thick", 10) + F.path(`M${P[0]},${P[1] - 50} A50,50 0 0 1 ${P[0] + 50 * Math.sin(Math.PI / 3)},${P[1] - 50 * Math.cos(Math.PI / 3)}`, "r mid") + F.text(P[0] + 30, P[1] - 60, "060°", "tr bold", "start") + F.dot(P[0], P[1], "k") + F.text(P[0] - 10, P[1] + 18, "A", "tk bold") + F.text(P[0] + 112, P[1] - 64, "B", "tk bold");
    return F.fig(300, 200, s, "The bearing of B from A is 060°: stand at A, face North, turn 60° clockwise."); })(),
  (() => { const A = [70, 170], B = [240, 100]; const th = 68 * Math.PI / 180;
    let s = F.arrow(A[0], A[1], A[0], A[1] - 120, "k mid", 9) + F.text(A[0], A[1] - 128, "N", "tk bold") + F.arrow(B[0], B[1], B[0], B[1] - 80, "k mid", 9) + F.text(B[0], B[1] - 88, "N", "tk bold") + F.line(A[0], A[1], B[0], B[1], "c thick");
    s += F.path(`M${A[0]},${A[1] - 40} A40,40 0 0 1 ${A[0] + 40 * Math.sin(th)},${A[1] - 40 * Math.cos(th)}`, "r mid") + F.text(A[0] + 26, A[1] - 46, "068°", "tr bold small", "start");
    s += F.path(`M${B[0]},${B[1] - 34} A34,34 0 1 1 ${B[0] - 34 * Math.sin(th)},${B[1] + 34 * Math.cos(th)}`, "o mid") + F.text(B[0] + 42, B[1] + 34, "248°", "to bold small", "start");
    s += F.dot(A[0], A[1], "k") + F.dot(B[0], B[1], "k") + F.text(A[0] - 12, A[1] + 6, "A", "tk bold", "end") + F.text(B[0] + 10, B[1] - 4, "B", "tk bold", "start");
    return F.fig(320, 220, s, "Back bearing: B from A is 068°, so A from B is $068^\\circ+180^\\circ=248^\\circ$."); })()
)}
<h3>Rules that solve every bearings question</h3>
<ol class="steps-inline"><li>Draw a <b>North line at every point</b> you stand at.</li>
<li>North lines are <b>parallel</b>, so use parallel-line angle facts: <b>co-interior</b> angles add to 180° and <b>alternate</b> angles are equal.</li>
<li><b>Back bearing</b>: the bearing of A from B = bearing of B from A <b>± 180°</b> (add if less than 180°, subtract if more).</li>
<li>Turn the bearings into angles <i>inside</i> a triangle, solve the triangle with Pythagoras, SOH CAH TOA, the sine rule or the cosine rule, then convert back into a bearing.</li></ol>
${(() => { const A = [70, 230], k = 22; const b1 = 60 * Math.PI / 180, b2 = 150 * Math.PI / 180;
  const B = [A[0] + 8 * k * Math.sin(b1), A[1] - 8 * k * Math.cos(b1)], Cc = [B[0] + 5 * k * Math.sin(b2), B[1] - 5 * k * Math.cos(b2)];
  let s = F.arrow(A[0], A[1], A[0], A[1] - 120, "k", 8) + F.text(A[0], A[1] - 128, "N", "tk bold") + F.arrow(B[0], B[1], B[0], B[1] - 70, "k", 8) + F.text(B[0], B[1] - 78, "N", "tk bold");
  s += F.line(A[0], A[1], B[0], B[1], "c thick") + F.line(B[0], B[1], Cc[0], Cc[1], "c thick") + F.line(A[0], A[1], Cc[0], Cc[1], "r mid d");
  s += F.text((A[0] + B[0]) / 2 - 10, (A[1] + B[1]) / 2 - 4, "8 km", "tc bold", "end") + F.text((B[0] + Cc[0]) / 2 + 10, (B[1] + Cc[1]) / 2 - 2, "5 km", "tc bold", "start");
  s += F.rightAngle(B[0], B[1], -Math.sin(b1), Math.cos(b1), Math.sin(b2), -Math.cos(b2), 12);
  s += F.dot(A[0], A[1]) + F.dot(B[0], B[1]) + F.dot(Cc[0], Cc[1]) + F.text(A[0] - 10, A[1] + 6, "A", "tk bold", "end") + F.text(B[0] - 10, B[1] + 2, "B", "tk bold", "end") + F.text(Cc[0] + 10, Cc[1] + 6, "C", "tk bold", "start");
  return F.fig(440, 270, s, "A to B: 8 km on 060°. B to C: 5 km on 150°. The direction changes by exactly 90°, so the angle at B is a right angle.", { size: "small" }); })()}
<div class="callout ex"><b class="t">Worked example</b>A boat sails 8 km from A to B on a bearing of 060°, then 5 km to C on a bearing of 150°. Find the distance and bearing of C from A.<br>Angle $ABC$: the bearing turns from 060° to 150°, a change of 90°, so $ABC=90^\circ$.<br>$AC=\sqrt{8^2+5^2}=\sqrt{89}=9.43$ km.<br>Angle $BAC=\tan^{-1}\!\left(\tfrac58\right)=32.0^\circ$. C is clockwise of B as seen from A, so the bearing is $060^\circ+32.0^\circ=092^\circ$.</div>
<div class="callout warn"><b class="t">Common mistakes</b>Measuring anticlockwise, or from East. Writing 92° instead of 092°. Mixing up "B from A" (stand at A) with "A from B" (stand at B). Forgetting that the angle at B usually needs co-interior angles, not the bearing itself.</div>
<p><b>Scale drawings:</b> convert distances with the scale (e.g. 1 cm : 2 km means 8 km is 4 cm), draw North lines, measure bearings carefully with a protractor, and measure answers back off the drawing. Accuracy expected: ±2 mm and ±2°.</p>
<details class="check"><summary>The bearing of Q from P is 295°. What is the bearing of P from Q?</summary><div>$295^\circ-180^\circ=115^\circ$.</div></details>`},

    { h: "Trigonometry in 3D (E6.6)", body: M`
<p class="lead">There is no new 3D formula. Every 3D question is solved by finding a <b>right-angled triangle hidden inside the shape</b>, drawing it flat, and using Pythagoras or SOH CAH TOA. Often you need two triangles in a row.</p>
${(() => { const P = { A: [60, 240], B: [300, 240], C: [390, 180], D: [150, 180], E: [60, 140], F: [300, 140], G: [390, 80], H: [150, 80] };
  const L = (a, b, c = "k") => F.line(P[a][0], P[a][1], P[b][0], P[b][1], c);
  let s = L("A", "B") + L("B", "C") + L("C", "G") + L("E", "F") + L("F", "G") + L("G", "H") + L("H", "E") + L("A", "E") + L("B", "F") + L("A", "D", "m d") + L("D", "C", "m d") + L("D", "H", "m d");
  s += F.poly([P.A, P.C, P.G], "r thick oS", true) + F.rightAngle(390, 180, -1, 0.25, 0, -1, 12) + F.arc(60, 240, 56, 10.3, 25.9, "r", "θ", 1.45);
  Object.entries(P).forEach(([k, [x, y]]) => s += F.text(x + (x < 200 ? -10 : 10), y + (y > 200 ? 16 : -6), k, "tk bold", x < 200 ? "end" : "start"));
  s += F.text(180, 262, "6", "tk bold") + F.text(358, 220, "4", "tk bold", "start") + F.text(410, 134, "3", "tk bold", "start");
  return F.fig(460, 280, s, "Cuboid 6 × 4 × 3. The space diagonal AG, the base diagonal AC and the vertical edge CG form a right-angled triangle (shaded).", { size: "small" }); })()}
<h3>Lengths: Pythagoras twice</h3>
<p>Base diagonal: $AC=\sqrt{6^2+4^2}=\sqrt{52}$. Then the right-angled triangle $ACG$ has legs $\sqrt{52}$ and 3: $AG=\sqrt{52+9}=\sqrt{61}=7.81$. In general, the space diagonal of an $a\times b\times c$ cuboid is $\sqrt{a^2+b^2+c^2}$.</p>
<h3>The angle between a line and a plane</h3>
<p>Drop a perpendicular from the top of the line straight down to the plane. The point where it lands, joined to the bottom of the line, is the line's <b>projection</b> (its shadow under a light directly overhead). The angle between the line and the plane is the angle between the line and its projection. So the triangle is: <b>line, projection, perpendicular height</b>.</p>
<p>For $AG$ and the base: the projection is $AC$ and the height is $CG$. So $\tan\theta=\dfrac{3}{\sqrt{52}}$, giving $\theta=22.6^\circ$.</p>
${(() => { const A = [70, 240], B = [290, 240], C = [370, 180], D = [150, 180], M = [220, 210], V = [220, 50];
  let s = F.poly([A, B, C], "k", false) + F.line(A[0], A[1], D[0], D[1], "m d") + F.line(D[0], D[1], C[0], C[1], "m d");
  [A, B, C].forEach(p => s += F.line(V[0], V[1], p[0], p[1], "k")); s += F.line(V[0], V[1], D[0], D[1], "m d");
  s += F.poly([V, M, A], "r thick oS", true) + F.line(A[0], A[1], C[0], C[1], "m d thin") + F.rightAngle(220, 210, 0, -1, -1, 0.21, 10) + F.arc(70, 240, 44, 11.3, 51.7, "r", "θ", 1.5);
  s += F.text(V[0], V[1] - 10, "V", "tk bold") + F.text(M[0] + 8, M[1] + 16, "M", "tk bold", "start") + F.text(A[0] - 8, A[1] + 14, "A", "tk bold", "end") + F.text(228, 130, "10", "tr bold", "start");
  return F.fig(440, 280, s, "Square-based pyramid with apex V above the centre M of the base. The edge VA, the half-diagonal MA and the height VM make a right-angled triangle.", { size: "small" }); })()}
<div class="callout ex"><b class="t">Worked example</b>A pyramid has an 8 cm × 8 cm square base and its apex is 10 cm above the centre. Find the angle between a sloping edge and the base.<br>Half the base diagonal: $MA=\tfrac12\sqrt{8^2+8^2}=\tfrac12\sqrt{128}=5.657$.<br>$\tan\theta=\dfrac{VM}{MA}=\dfrac{10}{5.657}$, so $\theta=60.5^\circ$.</div>
<div class="callout tip"><b class="t">Method for any 3D question</b>(1) Identify the right-angled triangle containing what you want. (2) Redraw it flat and label it. (3) If a side is missing, find it from another right-angled triangle first, usually one on the base. (4) Keep exact values ($\sqrt{52}$) or full calculator values until the end.</div>
<details class="check"><summary>For the 6 × 4 × 3 cuboid, find the angle between diagonal AG and the face ABFE.</summary><div>The projection of G onto face ABFE is F (since GF ⊥ that face, GF = 4). AF $=\sqrt{36+9}=\sqrt{45}$. $\tan\theta=\dfrac{4}{\sqrt{45}}$, so $\theta=30.8^\circ$.</div></details>`}
  ],
  worked: [
    { q: M`In triangle $ABC$, $AB=7$ cm, $AC=10$ cm and angle $A=62^\circ$. Find $BC$ and the area.`,
      steps: [M`SAS → cosine rule: $a^2=7^2+10^2-2(7)(10)\cos62^\circ$.`, M`$a^2=149-140(0.46947)=149-65.73=83.27$, so $BC=\sqrt{83.27}=9.13$ cm.`, M`Area $=\tfrac12(7)(10)\sin62^\circ=35(0.88295)=30.9\text{ cm}^2$.`]},
    { q: M`Solve $\sin x=-0.4$ for $0^\circ\le x\le360^\circ$.`,
      steps: [M`Calculator: $\sin^{-1}(-0.4)=-23.6^\circ$. Not in range, but it's our reference.`, M`$\sin$ is negative between 180° and 360°, so there are two answers there.`, M`$x=180^\circ+23.6^\circ=203.6^\circ$ and $x=360^\circ-23.6^\circ=336.4^\circ$.`]},
    { q: M`A ship sails 12 km on a bearing of 040°, then 9 km on a bearing of 130°. How far is it from the start?`,
      steps: [M`Turning from 040° to 130° is a turn of $90^\circ$, so the two legs are perpendicular.`, M`Pythagoras: $d=\sqrt{12^2+9^2}=\sqrt{225}=15$ km.`]},
    { q: M`In triangle $ABC$, $a=7$ cm, $b=9$ cm and $A=40^\circ$. Find the possible values of angle $B$.`,
      steps: [M`Sine rule for an angle: $\dfrac{\sin B}{9}=\dfrac{\sin40^\circ}{7}\Rightarrow\sin B=0.8264$.`, M`$B=55.7^\circ$ or $B=180^\circ-55.7^\circ=124.3^\circ$.`, M`Check: $124.3^\circ+40^\circ<180^\circ$, so <b>both</b> triangles exist. This is the ambiguous case.`]},
    { q: M`From a point $P$ the angle of elevation of the top of a tower is 30°. Walking 20 m closer, it is 45°. Find the height.`,
      steps: [M`Let the original distance be $d$. Then $h=d\tan30^\circ=\dfrac{d}{\sqrt3}$ and $h=(d-20)\tan45^\circ=d-20$.`, M`$\dfrac{d}{\sqrt3}=d-20\Rightarrow d\left(1-\tfrac1{\sqrt3}\right)=20\Rightarrow d=47.32$.`, M`$h=47.32-20=27.3$ m.`]}
  ],
  formulas: [
    ["Pythagoras", M`$a^2+b^2=c^2$`],
    ["SOH CAH TOA", M`$\sin=\frac OH,\;\cos=\frac AH,\;\tan=\frac OA$`],
    ["Sine rule", M`$\dfrac{a}{\sin A}=\dfrac{b}{\sin B}=\dfrac{c}{\sin C}$`],
    ["Cosine rule", M`$a^2=b^2+c^2-2bc\cos A$`],
    ["Cosine rule (angle)", M`$\cos A=\dfrac{b^2+c^2-a^2}{2bc}$`],
    ["Area of triangle", M`$\tfrac12ab\sin C$`],
    ["Space diagonal", M`$d=\sqrt{a^2+b^2+c^2}$`]
  ],
  cards: [
    ["Write out SOH CAH TOA", M`$\sin=O/H$, $\cos=A/H$, $\tan=O/A$`],
    ["When do you use the cosine rule?", "SAS (two sides and the included angle) or SSS (all three sides)."],
    ["When do you use the sine rule?", "When you know a matching side and angle pair, plus one more piece of information."],
    ["Exact value of $\\sin 30^\\circ$", M`$\tfrac12$`],
    ["Exact value of $\\cos 30^\\circ$", M`$\tfrac{\sqrt3}{2}$`],
    ["Exact value of $\\tan 60^\\circ$", M`$\sqrt3$`],
    ["Exact value of $\\sin 45^\\circ$", M`$\tfrac{\sqrt2}{2}=\tfrac1{\sqrt2}$`],
    ["Exact value of $\\tan 30^\\circ$", M`$\tfrac{1}{\sqrt3}=\tfrac{\sqrt3}{3}$`],
    ["How are bearings measured?", "Clockwise from North, always with 3 figures."],
    ["Back bearing rule", "Add or subtract 180°."],
    ["Angle of elevation vs depression", "Both are measured from the horizontal. Elevation looks up, depression looks down, and they are equal (alternate angles)."],
    ["Second solution of $\\sin x=k$ (0–360°)", M`$180^\circ-x$`],
    ["Second solution of $\\cos x=k$ (0–360°)", M`$360^\circ-x$`],
    ["Second solution of $\\tan x=k$ (0–360°)", M`$x+180^\circ$`],
    ["Period of $y=\\tan x$", "180°"],
    ["Where does $y=\\tan x$ have asymptotes (0–360°)?", "At x = 90° and x = 270°."],
    ["Maximum and minimum of $y=\\sin x$", "Max 1 at 90°, min −1 at 270°."],
    ["What is the ambiguous case?", M`Using the sine rule to find an angle: both $\theta$ and $180^\circ-\theta$ may give valid triangles.`],
    ["Area of a triangle with no height given", M`$\tfrac12ab\sin C$, with $C$ between sides $a$ and $b$.`],
    ["Angle between a line and a plane", "The angle between the line and its projection (shadow) on the plane."],
    ["Space diagonal of an $a\\times b\\times c$ cuboid", M`$\sqrt{a^2+b^2+c^2}$`],
    ["Converse of Pythagoras", M`If $a^2+b^2=c^2$, the triangle has a right angle opposite $c$.`],
    ["A negative cosine means the angle is…", "Obtuse (between 90° and 180°)."],
    ["Shortest distance from a point to a line", "The perpendicular distance."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`A right-angled triangle has hypotenuse 10 and an angle of 30°. The side opposite the 30° angle is`, opts: ["5", "8.66", "17.3", "3"], ans: 0,
      why: M`$\text{opp}=10\sin30^\circ=5$.` },
    { type: "mcq", marks: 1, q: M`Which rule finds the third side when you know two sides and the angle between them?`, opts: ["Sine rule", "Cosine rule", "Pythagoras", "Area rule"], ans: 1,
      why: M`SAS needs the cosine rule. The sine rule needs a matching side–angle pair, which you do not have.` },
    { type: "mcq", marks: 2, q: M`The area of a triangle with sides 6 cm and 8 cm and included angle 30° is`, opts: ["24 cm²", "12 cm²", "48 cm²", "20.8 cm²"], ans: 1,
      why: M`$\tfrac12(6)(8)\sin30^\circ=24\times\tfrac12=12$.` },
    { type: "mcq", marks: 1, q: M`The bearing of B from A is 070°. The bearing of A from B is`, opts: ["110°", "250°", "290°", "160°"], ans: 1,
      why: M`Back bearing: $70^\circ+180^\circ=250^\circ$.` },
    { type: "mcq", marks: 1, q: M`The solutions of $\cos x=0.5$ for $0^\circ\le x\le360^\circ$ are`, opts: ["60° and 120°", "60° and 300°", "30° and 150°", "60° and 240°"], ans: 1,
      why: M`$\cos^{-1}0.5=60^\circ$. Cos is symmetric about 180°, so the other is $360-60=300^\circ$.` },
    { type: "mcq", marks: 2, q: M`From the top of a 50 m cliff, the angle of depression of a boat is 20°. How far is the boat from the foot of the cliff?`, opts: ["18.2 m", "47.0 m", "137 m", "146 m"], ans: 2,
      why: M`The angle of elevation from the boat is also 20°. $\tan20^\circ=\dfrac{50}{d}\Rightarrow d=\dfrac{50}{\tan20^\circ}=137$ m. 146 m is the line-of-sight distance $50/\sin20^\circ$.` },
    { type: "mcq", marks: 1, q: M`The graph of $y=\tan x$ repeats every`, opts: ["90°", "180°", "360°", "720°"], ans: 1,
      why: M`$\tan(x+180^\circ)=\tan x$, so the period is 180°.` },
    { type: "mcq", marks: 1, q: M`Which set of sides makes a right-angled triangle?`, opts: ["5, 12, 14", "8, 15, 17", "6, 8, 11", "7, 24, 26"], ans: 1,
      why: M`$8^2+15^2=64+225=289=17^2$.` },
    { type: "struct", marks: 4, q: M`A triangle has sides 5 cm, 7 cm and 9 cm. Calculate the size of the largest angle.`,
      ms: M`The largest angle is opposite the longest side (9 cm).<br><b>M2</b> $\cos\theta=\dfrac{5^2+7^2-9^2}{2(5)(7)}$ (M1 for a correct cosine rule with one error)<br><b>A1</b> $=\dfrac{-7}{70}=-0.1$<br><b>A1</b> $\theta=95.7^\circ$ (a negative cosine means obtuse).` },
    { type: "struct", marks: 4, q: M`A 6 m ladder leans against a vertical wall and reaches 5.2 m up the wall. Find (a) the angle the ladder makes with the ground, (b) the distance of its foot from the wall.`,
      ms: M`(a) <b>M1</b> $\sin\theta=\dfrac{5.2}{6}$ <b>A1</b> $60.1^\circ$<br>(b) <b>M1</b> $\sqrt{6^2-5.2^2}$ or $6\cos60.07^\circ$ <b>A1</b> $2.99$ m` },
    { type: "struct", marks: 2, q: M`Without a calculator, find the exact value of $\sin60^\circ\times\tan30^\circ$.`,
      ms: M`<b>M1</b> $\dfrac{\sqrt3}{2}\times\dfrac{1}{\sqrt3}$ <b>A1</b> $\dfrac12$` },
    { type: "struct", marks: 3, q: M`Solve $2\sin x+1=0$ for $0^\circ\le x\le360^\circ$.`,
      ms: M`<b>M1</b> $\sin x=-\tfrac12$<br><b>A1</b> $210^\circ$ <b>A1</b> $330^\circ$<br><i>Subtract 1 mark for each extra answer in range.</i>` },
    { type: "struct", marks: 2, q: M`Solve $\tan x=2$ for $0^\circ\le x\le360^\circ$.`,
      ms: M`<b>B1</b> $63.4^\circ$ <b>B1</b> $243.4^\circ$ (i.e. $63.4+180$)` },
    { type: "struct", marks: 3, q: M`In triangle $ABC$, $A=48^\circ$, $B=71^\circ$ and $a=12$ cm. Find $b$.`,
      ms: M`<b>M1</b> $\dfrac{b}{\sin71^\circ}=\dfrac{12}{\sin48^\circ}$ <b>M1</b> $b=\dfrac{12\sin71^\circ}{\sin48^\circ}$ <b>A1</b> $15.3$ cm` },
    { type: "struct", marks: 4, q: M`In triangle $PQR$, $p=8$ cm, $q=11$ cm and $P=35^\circ$. Find the two possible values of angle $Q$.`,
      ms: M`<b>M1</b> $\sin Q=\dfrac{11\sin35^\circ}{8}$ <b>A1</b> $=0.7887$<br><b>A1</b> $Q=52.1^\circ$ <b>A1</b> $Q=127.9^\circ$ (valid since $127.9+35<180$)` },
    { type: "struct", marks: 3, q: M`A triangle has area 30 cm² and two sides of 8 cm and 10 cm. Find the acute angle between them.`,
      ms: M`<b>M1</b> $\tfrac12(8)(10)\sin C=30$ <b>M1</b> $\sin C=0.75$ <b>A1</b> $48.6^\circ$` },
    { type: "struct", marks: 5, q: M`A boat sails 8 km from A to B on a bearing of 060°, then 5 km from B to C on a bearing of 150°. Find (a) the distance AC, (b) the bearing of C from A.`,
      ms: M`(a) <b>B1</b> angle $ABC=90^\circ$ (the bearing changes by 90°) <b>M1</b> $\sqrt{8^2+5^2}$ <b>A1</b> $9.43$ km<br>(b) <b>M1</b> angle $BAC=\tan^{-1}\!\tfrac58=32.0^\circ$ <b>A1</b> bearing $060+32=092^\circ$` },
    { type: "struct", marks: 4, q: M`A square-based pyramid has base 8 cm × 8 cm and its apex is 10 cm vertically above the centre of the base. Find the angle between a sloping edge and the base.`,
      ms: M`<b>M1</b> half the base diagonal $=\tfrac12\sqrt{8^2+8^2}=5.657$<br><b>M1</b> recognise the triangle: height 10, horizontal 5.657<br><b>M1</b> $\tan\theta=\dfrac{10}{5.657}$ <b>A1</b> $60.5^\circ$` },
    { type: "struct", marks: 5, q: M`From a point P, the angle of elevation of the top of a tower is 30°. From a point 20 m closer, it is 45°. Find the height of the tower.`,
      ms: M`<b>M1</b> $h=d\tan30^\circ$ <b>M1</b> $h=(d-20)\tan45^\circ$<br><b>M1</b> eliminate: $\dfrac{d}{\sqrt3}=d-20$ <b>A1</b> $d=47.3$ <b>A1</b> $h=27.3$ m` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: M`In a right-angled triangle, the hypotenuse is 13 cm and one side is 5 cm. Find the third side.`, ms: M`<b>M1</b> $\sqrt{13^2-5^2}$<br><b>A1</b> 12 cm` },
    { d: 1, type: "struct", marks: 2, q: M`In a right-angled triangle, the side opposite angle $x$ is 7 cm and the hypotenuse is 10 cm. Find $x$.`, ms: M`<b>M1</b> $\sin x=\tfrac{7}{10}$<br><b>A1</b> 44.4°` },
    { d: 1, type: "mcq", marks: 1, q: M`Which ratio is $\tan\theta$?`, opts: ["opposite ÷ hypotenuse", "adjacent ÷ hypotenuse", "opposite ÷ adjacent", "adjacent ÷ opposite"], ans: 2, why: M`TOA.` },
    { d: 1, type: "struct", marks: 2, q: M`A ladder 6 m long leans against a wall at 70° to the ground. How high up the wall does it reach?`, ms: M`<b>M1</b> $6\sin70°$<br><b>A1</b> 5.64 m` },
    { d: 1, type: "struct", marks: 2, q: M`Find the bearing of A from B if the bearing of B from A is 065°.`, ms: M`<b>M1</b> $65+180$<br><b>A1</b> 245°` },
    { d: 2, type: "struct", marks: 3, q: M`In triangle ABC, $a=8$ cm, $b=11$ cm and angle $C=40°$. Calculate $c$.`, ms: M`<b>M1</b> $c^2=8^2+11^2-2(8)(11)\cos40°$<br><b>A1</b> $c^2=50.2$<br><b>A1</b> 7.08 cm` },
    { d: 2, type: "struct", marks: 3, q: M`In triangle PQR, $PQ=9$ cm, angle $R=50°$ and angle $Q=70°$. Find $PR$.`, ms: M`<b>M1</b> $\dfrac{PR}{\sin70°}=\dfrac{9}{\sin50°}$<br><b>M1</b> $PR=\dfrac{9\sin70°}{\sin50°}$<br><b>A1</b> 11.0 cm` },
    { d: 2, type: "struct", marks: 2, q: M`Find the area of a triangle with sides 7 cm and 9 cm and included angle 120°.`, ms: M`<b>M1</b> $\tfrac12(7)(9)\sin120°$<br><b>A1</b> 27.3 cm²` },
    { d: 2, type: "mcq", marks: 1, q: M`Solve $\sin x=0.5$ for $0°\le x\le 360°$.`, opts: ["30° only", "30° and 150°", "30° and 330°", "60° and 120°"], ans: 1, why: M`$\sin x=\sin(180°-x)$.` },
    { d: 2, type: "struct", marks: 3, q: M`From the top of a cliff 80 m high, the angle of depression of a boat is 25°. How far is the boat from the foot of the cliff?`, ms: M`<b>M1</b> angle of elevation from boat = 25°<br><b>M1</b> $\tan25°=\tfrac{80}{d}$<br><b>A1</b> 172 m` },
    { d: 2, type: "struct", marks: 3, q: M`A triangle has sides 5 cm, 7 cm and 9 cm. Find the largest angle.`, ms: M`<b>M1</b> opposite 9 cm: $\cos\theta=\dfrac{5^2+7^2-9^2}{2(5)(7)}$<br><b>A1</b> $\cos\theta=-0.1$<br><b>A1</b> 95.7°` },
    { d: 3, type: "struct", marks: 5, q: M`A ship sails 12 km on a bearing of 060° from port P to Q, then 8 km on a bearing of 150° to R. (a) Explain why angle PQR = 90°. (b) Find PR. (c) Find the bearing of R from P.`, ms: M`<b>(a) B1</b> back-bearing of P from Q is 240°; 240 − 150 = 90°<br><b>(b) M1</b> $\sqrt{12^2+8^2}$<br><b>A1</b> 14.4 km<br><b>(c) M1</b> angle QPR $=\tan^{-1}(8/12)=33.7°$<br><b>A1</b> 060 + 33.7 = 093.7°` },
    { d: 3, type: "struct", marks: 4, q: M`A cuboid is 8 cm × 6 cm × 5 cm. Find (a) the length of the space diagonal, (b) the angle between the diagonal and the base.`, ms: M`<b>(a) M1</b> base diagonal $=\sqrt{64+36}=10$<br><b>A1</b> $\sqrt{100+25}=11.2$ cm<br><b>(b) M1</b> $\tan\theta=\tfrac{5}{10}$<br><b>A1</b> 26.6°` },
    { d: 3, type: "struct", marks: 4, q: M`In triangle ABC, $AB=10$ cm, $BC=7$ cm and angle $A=35°$. Find the two possible values of angle $C$.`, ms: M`<b>M1</b> $\dfrac{\sin C}{10}=\dfrac{\sin35°}{7}$<br><b>A1</b> $\sin C=0.819$<br><b>A1</b> $C=55.0°$<br><b>A1</b> or $C=125.0°$ (ambiguous case)` },
    { d: 3, type: "struct", marks: 3, q: M`Sketch $y=\cos x$ for $0°\le x\le360°$ and use it to solve $\cos x=-0.4$.`, ms: M`<b>B1</b> correct sketch: 1 at 0°, −1 at 180°, 1 at 360°<br><b>B1</b> $x=113.6°$<br><b>B1</b> $x=246.4°$` }
  ]
});
}
