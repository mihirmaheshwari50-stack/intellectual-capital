window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
const mini = (f, cap, yl = "distance", o = {}) => F.plot(Object.assign({ w: 230, h: 170, x: [0, 10], y: [0, 10], grid: false, m: { l: 24, r: 14, t: 14, b: 24 }, xlabel: "time", ylabel: yl, curves: [{ f, c: "c thick" }], cap, size: "tiny" }, o));
const ruler = (x, y, len, cm) => { let s = F.rect(x, y, len, 34, "k bgF", 3); for (let i = 0; i <= cm * 10; i++) { const X = x + 8 + i * (len - 16) / (cm * 10); s += F.line(X, y, X, y + (i % 10 ? (i % 5 ? 7 : 11) : 15), "k thin"); if (i % 10 === 0) s += F.text(X, y + 28, i / 10, "tk small"); } return s; };
const eye = (x, y, c = "k") => F.path(`M${x - 14},${y} Q${x},${y - 10} ${x + 14},${y} Q${x},${y + 10} ${x - 14},${y} Z`, c) + F.circ(x, y, 4, c + "F");
//@@HELPERS-END

/* ============================================================
   MEASUREMENT & MOTION  (0625: 1.1, 1.2)
   ============================================================ */
TOPICS.push({
  id: "motion", subject: "physics", unit: 1, title: "Measurement & motion",
  blurb: "Measuring length, volume and time, scalars and vectors, speed, velocity, acceleration, distance–time and speed–time graphs, and free fall.",
  level: "Core → Supplement", demo: "motion",
  syllabus: [
    ["1.1", "Use rules and measuring cylinders to find a length or a volume", 0],
    ["1.1", "Use clocks and digital timers to measure time intervals", 1],
    ["1.1", "Find an average value for a small distance or a short time by measuring multiples (e.g. the period of a pendulum)", 1],
    ["1.1 S", "Scalars have magnitude only; vectors have magnitude and direction. Know examples of each", 2],
    ["1.1 S", "Find the resultant of two vectors at right angles, by calculation or by scale drawing", 2],
    ["1.2", "Define speed as distance travelled per unit time; recall and use v = s/t", 3],
    ["1.2", "Define velocity as speed in a given direction", 3],
    ["1.2", "Recall and use average speed = total distance travelled ÷ total time taken", 4],
    ["1.2", "Sketch, plot and interpret distance–time graphs; find speed from the gradient of a straight line", 5],
    ["1.2 S", "Find the speed from the gradient of the tangent to a curved distance–time graph", 5],
    ["1.2 S", "Define acceleration as change in velocity per unit time; recall and use a = Δv/Δt; deceleration is a negative acceleration", 6],
    ["1.2", "Sketch, plot and interpret speed–time graphs: at rest, constant speed, constant acceleration or deceleration", 7],
    ["1.2", "Find the distance travelled from the area under a speed–time graph", 7],
    ["1.2 S", "Find acceleration from the gradient of a speed–time graph; recognise changing acceleration from a curved graph", 7],
    ["1.2", "The acceleration of free fall g near the Earth is constant and approximately 9.8 m/s²", 8],
    ["1.2 S", "Describe the motion of objects falling with and without air resistance", 8],
    ["1.1–1.2", "Measure speed and acceleration in the laboratory (light gates, timing over a measured distance)", 9]
  ],
  sections: [
    { h: "Measuring length and volume (1.1)", body: P`
<p class="lead">Every number in physics comes from a measurement, and every measurement has an instrument, a unit and a <b>precision</b> (the smallest division you can read). Examiners test whether you can measure properly, not just calculate.</p>
<h3>Length with a rule</h3>
<p>A metre rule or 30 cm ruler reads to the nearest <b>millimetre</b> (0.1 cm). Three habits get full marks:</p>
<ol class="steps-inline"><li><b>Avoid the zero-end.</b> The end of a wooden rule wears away. Start at the 1.0 cm mark and subtract, or check the zero lines up exactly.</li>
<li><b>Look straight on.</b> Put your eye directly above the mark. Looking from an angle gives a <b>parallax error</b>: the reading shifts because the object and the scale are not in the same plane.</li>
<li><b>Measure length = end reading − start reading.</b></li></ol>
${(() => { let s = ruler(30, 120, 420, 6) + F.rect(98.7, 92, 237.3, 26, "o oS", 3) + F.text(217, 110, "object", "to small bold");
  s += eye(217, 30, "g") + F.line(217, 40, 217, 92, "g d") + F.text(232, 34, "eye directly above: correct", "tg small bold", "start");
  s += eye(150, 52, "r") + F.line(160, 58, 330, 118, "r d") + F.text(20, 46, "eye at an angle:", "tr small bold", "start") + F.text(20, 62, "parallax error", "tr small bold", "start");
  s += F.line(98.7, 92, 98.7, 160, "c d") + F.line(336, 92, 336, 160, "c d") + F.text(98.7, 174, "1.0 cm", "tc small bold") + F.text(336, 174, "4.6 cm", "tc small bold");
  return F.fig(480, 185, s, "Start at a mark (1.0 cm), not the worn end. Length = 4.6 − 1.0 = <b>3.6 cm</b>. Read with your eye level with the mark."); })()}
<p>For lengths below about 1 mm (wire diameter, paper thickness) a rule is not precise enough on its own, so we measure many together (Part 2). Micrometer screw gauges and vernier calipers read to 0.01 mm and 0.1 mm, but the core syllabus expects the rule.</p>
<h3>Volume of a liquid: the measuring cylinder</h3>
<p>Water forms a curved surface called a <b>meniscus</b>. Read the <b>bottom</b> of the meniscus with your eye <b>level</b> with it, and the cylinder on a flat surface. (Mercury curves the other way, so you would read the top.)</p>
${F.row(
  (() => { let s = F.path("M60,20 L60,190 Q60,200 70,200 L130,200 Q140,200 140,190 L140,20", "k") + F.path("M61,104 Q100,120 139,104 L139,190 Q139,199 130,199 L70,199 Q61,199 61,190 Z", "bS nostroke") + F.path("M61,104 Q100,120 139,104", "b mid");
    for (let i = 0; i <= 8; i++) { const y = 40 + i * 20; s += F.line(140, y, i % 2 ? 128 : 122, y, "k thin"); if (i % 2 === 0) s += F.text(146, y + 4, 80 - i * 5, "tk small", "start"); }
    s += eye(210, 112, "g") + F.line(196, 112, 100, 112, "g d") + F.text(210, 136, "eye level with", "tg small bold") + F.text(210, 150, "bottom of meniscus", "tg small bold");
    return F.fig(270, 215, s, "Each division is 5 cm³. The bottom of the meniscus is a little below 65, so the reading is about <b>62 cm³</b>."); })(),
  (() => { let s = F.path("M40,40 L40,190 Q40,200 50,200 L120,200 Q130,200 130,190 L130,40", "k") + F.rect(41, 110, 88, 89, "bS nostroke") + F.line(41, 110, 129, 110, "b");
    s += F.path("M170,40 L170,190 Q170,200 180,200 L250,200 Q260,200 260,190 L260,40", "k") + F.rect(171, 82, 88, 117, "bS nostroke") + F.line(171, 82, 259, 82, "b") + F.path("M200,150 L222,138 L238,156 L230,180 L204,176 Z", "k oS");
    s += F.text(85, 30, "before: 50 cm³", "tk small bold") + F.text(215, 30, "after: 78 cm³", "tk small bold") + F.arrow(138, 120, 162, 120, "m", 7);
    return F.fig(290, 215, s, "<b>Displacement method</b>: volume of the stone = 78 − 50 = <b>28 cm³</b>."); })()
)}
<h3>Volume of a solid</h3>
<ul><li><b>Regular shape</b>: measure with a rule and calculate (cuboid: $l\times w\times h$; cylinder: $\pi r^2 h$).</li>
<li><b>Irregular shape</b>: lower it gently into a measuring cylinder of water. The rise in level equals the volume of the object. For objects too big for a cylinder, use a <b>displacement (eureka) can</b>: fill to the spout, lower the object in, and collect the overflow in a measuring cylinder.</li>
<li>The object must sink (push a floating object under with a thin pin) and must not absorb or dissolve in water.</li></ul>
<div class="callout exam"><b class="t">Units</b>1 m = 100 cm = 1000 mm. 1 cm³ = 1 ml. 1 dm³ = 1 litre = 1000 cm³. 1 m³ = 1 000 000 cm³ ($10^6$, because each of the three lengths is ×100).</div>
<details class="check"><summary>Why should you read the bottom of a water meniscus with your eye level with it?</summary><div>The volume is defined by the bottom of the curve. Looking from above or below adds a parallax error, giving a reading that is too high or too low.</div></details>`},

    { h: "Measuring time, and the trick of multiples (1.1)", body: P`
<p class="lead">Stopwatches display to 0.01 s, but a human hand is the real limit: your <b>reaction time</b> is about 0.2–0.3 s at the start <i>and</i> at the stop. So a single short time is very uncertain.</p>
<h3>Measure many, then divide</h3>
<p>If you time <b>20 swings</b> of a pendulum instead of one, the same ±0.3 s reaction-time error is shared between 20 swings. The uncertainty in one swing is now only about 0.015 s.</p>
${(() => { let s = F.line(60, 20, 380, 20, "k thick") + F.line(220, 20, 220, 170, "m d thin");
  const L = 150, ang = 22 * Math.PI / 180;
  [-1, 1].forEach(sg => { const x = 220 + sg * L * Math.sin(ang), y = 20 + L * Math.cos(ang); s += F.line(220, 20, x, y, "m thin d") + F.circ(x, y, 11, "m"); });
  s += F.line(220, 20, 220 + L * Math.sin(ang * .3), 20 + L * Math.cos(ang * .3), "k") + F.circ(220 + L * Math.sin(ang * .3), 20 + L * Math.cos(ang * .3), 12, "o oS");
  s += F.path(`M${220 - L * Math.sin(ang)},${20 + L * Math.cos(ang) + 22} Q220,${20 + L + 34} ${220 + L * Math.sin(ang)},${20 + L * Math.cos(ang) + 22}`, "c mid") + F.arrow(260, 20 + L + 22, 277, 20 + L + 16, "c mid", 8);
  s += F.text(220, 215, "one oscillation = there and back to the start", "tc small bold");
  s += F.line(234, 172, 300, 150, "k thin") + F.text(304, 150, "fiducial marker:", "tk small", "start") + F.text(304, 165, "start/stop as the bob", "tk small", "start") + F.text(304, 180, "passes the centre", "tk small", "start");
  return F.fig(460, 230, s, "Time 20 oscillations, then divide by 20. Start and stop as the bob passes the centre, where it moves fastest and the moment is clearest."); })()}
<table class="t"><tr><th></th><th>Time for 20 oscillations / s</th></tr><tr><td>Trial 1</td><td>28.4</td></tr><tr><td>Trial 2</td><td>28.0</td></tr><tr><td>Trial 3</td><td>28.2</td></tr><tr><td>Mean</td><td>$\dfrac{28.4+28.0+28.2}{3}=28.2$ s</td></tr><tr><td>Period $T$</td><td>$\dfrac{28.2}{20}=1.41$ s</td></tr></table>
<h3>The same trick for tiny lengths</h3>
${F.row(
  (() => { let s = F.rect(40, 30, 150, 110, "m mS", 2); for (let i = 0; i < 16; i++) s += F.line(40, 32 + i * 6.8, 190, 32 + i * 6.8, "m thin"); s += F.dim(210, 30, 210, 140, "1.2 cm", "c", -30) + F.text(115, 165, "100 sheets", "tk small bold");
    return F.fig(270, 180, s, "Thickness of one sheet = 1.2 cm ÷ 100 = <b>0.012 cm</b> (0.12 mm)."); })(),
  (() => { let s = F.rect(40, 60, 170, 30, "m mS", 15); for (let i = 0; i < 20; i++) s += F.circ(70 + i * 6, 75, 3, "o oF"); s += F.dim(67, 112, 187, 112, "2.4 cm for 20 turns", "c", 16);
    return F.fig(270, 150, s, "Wrap 20 turns of wire tightly round a pencil. Diameter = 2.4 cm ÷ 20 = <b>0.12 cm</b>."); })()
)}
<div class="callout why"><b class="t">Why it works</b>The <i>absolute</i> uncertainty of the reading (±0.1 cm on a rule, ±0.3 s from reaction time) stays the same however much you measure. Measuring something 20 times bigger makes that fixed error 20 times smaller <i>as a fraction</i>, so the result is more <b>accurate</b>. Repeating and averaging reduces random errors further.</div>
<h3>Choosing a timer</h3>
<ul><li><b>Stopwatch</b>: fine for times longer than about 5 s (reaction time is then a small fraction).</li>
<li><b>Light gates and a digital timer / data logger</b>: for very short times (a falling object, a trolley passing). No reaction time.</li>
<li><b>Clocks</b>: for long processes (cooling over 20 minutes).</li></ul>
<details class="check"><summary>A student times one oscillation as 1.3 s. Give two improvements.</summary><div>Time 10 or 20 oscillations and divide (reduces the effect of reaction time); repeat and take a mean; use a fiducial marker at the centre of the swing.</div></details>`},

    { h: "Scalars and vectors (1.1 S)", body: P`
<p class="lead">A <b>scalar</b> has <b>magnitude</b> (size) only. A <b>vector</b> has magnitude <b>and direction</b>. "30 m/s" is a speed (scalar); "30 m/s due north" is a velocity (vector).</p>
<div class="sym-grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
<div><h3>Scalars</h3><p>distance · speed · time · mass · energy · temperature · (also volume, density, power, charge)</p></div>
<div><h3>Vectors</h3><p>displacement · velocity · acceleration · force · weight · momentum · electric field strength · gravitational field strength</p></div></div>
<div class="callout warn"><b class="t">Classic trap</b>Mass is a scalar, but <b>weight is a force, so it is a vector</b> (it points down, towards the centre of the Earth). Distance is scalar; <b>displacement</b> (distance in a stated direction) is a vector.</div>
<p>A vector is drawn as an <b>arrow</b>: its length shows the magnitude (to a scale) and it points in the direction. Vectors in the <b>same line</b> just add or subtract: 5 N right and 3 N left give 2 N right.</p>
<h3>Two vectors at right angles</h3>
<p>Draw them <b>tip-to-tail</b>: start the second arrow where the first ends. The <b>resultant</b> goes from the start of the first to the end of the second. Because the two arrows are at 90°, the resultant is the hypotenuse of a right-angled triangle.</p>
<div class="viz" data-viz="vectorAdd"></div>
$$\text{resultant}=\sqrt{a^2+b^2}\qquad \tan\theta=\frac{\text{opposite}}{\text{adjacent}}$$
${(() => { let s = F.arrow(60, 200, 300, 200, "o thick", 12) + F.arrow(300, 200, 300, 60, "b thick", 12) + F.arrow(60, 200, 300, 60, "g thick", 12) + F.rightAngle(300, 200, -1, 0, 0, -1, 14);
  s += F.arc(60, 200, 52, 0, 30.3, "k", "θ", 1.45) + F.text(180, 222, "boat velocity 4.0 m/s across", "to small bold") + F.text(310, 134, "current 2.3 m/s", "tb small bold", "start") + F.text(150, 115, "resultant", "tg small bold", "end");
  return F.fig(470, 235, s, "A boat steers straight across at 4.0 m/s while the river carries it downstream at 2.3 m/s. Resultant = √(4.0² + 2.3²) = <b>4.6 m/s</b>, at θ = tan⁻¹(2.3/4.0) = <b>30°</b> to its heading."); })()}
<h3>Scale drawing method</h3>
<ol class="steps-inline"><li>Choose a scale, e.g. 1 cm = 1 N, and write it down.</li>
<li>Draw the first vector to scale with a ruler and protractor.</li>
<li>Draw the second from its tip, at the correct angle.</li>
<li>Draw the resultant from start to finish, measure its length, convert using the scale, and measure its angle with a protractor.</li></ol>
<p>The answer must include a <b>direction</b>: "5.0 N at 37° above the horizontal", or a bearing.</p>
<details class="check"><summary>A plane flies north at 120 m/s in a 50 m/s wind blowing east. Find its resultant velocity.</summary><div>$\sqrt{120^2+50^2}=130$ m/s; $\tan\theta=50/120$, $\theta=23°$ east of north (bearing 023°).</div></details>`},

    { h: "Speed and velocity (1.2)", body: P`
<p class="lead"><b>Speed</b> is the distance travelled per unit time. <b>Velocity</b> is speed in a given direction.</p>
$$v=\frac{s}{t}\qquad \text{speed}=\frac{\text{distance}}{\text{time}}$$
${F.row(
  (() => { let s = F.poly([[100, 20], [180, 150], [20, 150]], "c cS", true) + F.line(46, 105, 154, 105, "c") + F.line(100, 105, 100, 150, "c") + F.text(100, 88, "s", "tk big bold serif") + F.text(68, 136, "v", "tk big bold serif") + F.text(132, 136, "t", "tk big bold serif");
    return F.fig(200, 170, s, "Cover the one you want: $v = s/t$, $s = vt$, $t = s/v$.", { size: "tiny" }); })(),
  (() => { let s = F.rect(10, 40, 110, 50, "k bgF", 10) + F.text(65, 70, "km/h", "tk bold") + F.rect(190, 40, 110, 50, "c cS", 10) + F.text(245, 70, "m/s", "tk bold");
    s += F.arrow(124, 56, 186, 56, "c mid", 8) + F.text(155, 46, "÷ 3.6", "tc small bold") + F.arrow(186, 78, 124, 78, "o mid", 8) + F.text(155, 100, "× 3.6", "to small bold");
    s += F.text(155, 132, "because 1 km/h = 1000 m ÷ 3600 s", "tm small");
    return F.fig(310, 145, s, "72 km/h = 72 ÷ 3.6 = <b>20 m/s</b>.", { size: "small" }); })()
)}
<p>SI unit: <b>metres per second (m/s)</b>. Distance in m, time in s. Always convert first: 2 minutes = 120 s, 3.5 km = 3500 m.</p>
<h3>Why velocity is different</h3>
<p>A car driving round a roundabout at a steady 30 km/h has a <b>constant speed</b> but a <b>changing velocity</b>, because its direction keeps changing. That is why circular motion needs a force (see Forces).</p>
${(() => { let s = F.circ(160, 110, 80, "m d"); [[0, 1], [90, 1], [180, 1], [270, 1]].forEach(([d]) => { const r = d * Math.PI / 180, x = 160 + 80 * Math.cos(r), y = 110 - 80 * Math.sin(r), tx = -Math.sin(r), ty = -Math.cos(r); s += F.dot(x, y, "c", 5) + F.arrow(x, y, x + tx * 50, y + ty * 50, "o mid", 9); });
  s += F.text(160, 115, "same speed,", "tk small bold") + F.text(160, 131, "new direction", "tk small bold");
  return F.fig(330, 220, s, "Speed is constant all the way round; the velocity arrow keeps turning.", { size: "small" }); })()}
<div class="callout exam"><b class="t">Definitions, word for word</b><b>Speed</b>: distance travelled per unit time. <b>Velocity</b>: speed in a given direction (or: change in displacement per unit time). "Per unit time" is the phrase markers look for.</div>
<details class="check"><summary>A sprinter runs 100 m in 9.8 s. Find her speed in m/s and in km/h.</summary><div>$v=100/9.8=10.2$ m/s; $\times3.6=36.7$ km/h.</div></details>`},

    { h: "Average speed (1.2)", body: P`
<p class="lead">Real journeys speed up and slow down. <b>Average speed</b> treats the whole trip as if it were travelled at one steady speed.</p>
$$\text{average speed}=\frac{\text{total distance travelled}}{\text{total time taken}}$$
${(() => { let s = ""; const st = [[0, 120, "o", "12 km in 0.2 h", "60 km/h"], [120, 300, "b", "36 km in 0.4 h", "90 km/h"], [300, 360, "m", "stop 0.1 h", "0 km/h"], [360, 450, "g", "12 km in 0.3 h", "40 km/h"]];
  st.forEach(([a, b, c, l1, l2]) => { s += F.rect(30 + a, 50, b - a, 30, c + "S " + c, 4) + F.text(30 + (a + b) / 2, 100, l1, "tk small") + F.text(30 + (a + b) / 2, 116, l2, "t" + c + " small bold"); });
  s += F.text(30, 34, "time →", "tm small", "start") + F.text(255, 150, "total: 60 km in 1.0 h → average speed 60 km/h", "tc bold");
  return F.fig(520, 165, s, "Each block's width is proportional to time. The stop still counts in the total time.", { size: "wide" }); })()}
<div class="callout warn"><b class="t">Do not average the speeds</b>$(60+90+0+40)/4=47.5$ km/h is <b>wrong</b>. The car spends different times at each speed. Always use total distance ÷ total time.</div>
<h3>The classic two-part trick</h3>
<p>A cyclist rides 10 km at 20 km/h, then 10 km back at 10 km/h. Average speed?</p>
<ul><li>Time out: $10/20=0.5$ h. Time back: $10/10=1.0$ h.</li><li>Average: $\dfrac{20}{1.5}=13.3$ km/h, not 15 km/h. The slow leg takes longer, so it "counts more".</li></ul>
<p><b>Average velocity</b> uses <i>displacement</i>. For a round trip back to the start, the displacement is zero, so the average velocity is zero even though the average speed is not.</p>
<details class="check"><summary>A train travels 150 km in 1 h 15 min. Find its average speed in km/h and m/s.</summary><div>1 h 15 min = 1.25 h. $150/1.25=120$ km/h $=33.3$ m/s.</div></details>`},

    { h: "Distance–time graphs (1.2)", body: P`
<p class="lead">On a distance–time graph, the <b>gradient is the speed</b>. Steeper means faster; flat means stopped; a curve means the speed is changing.</p>
${F.row(
  mini(x => 4, "<b>At rest</b>: horizontal line. Distance not changing."),
  mini(x => .9 * x, "<b>Constant speed</b>: straight sloping line."),
  mini(x => .09 * x * x, "<b>Accelerating</b>: curve getting steeper."),
  mini(x => 9 - .09 * (10 - x) ** 2, "<b>Decelerating</b>: curve getting flatter.")
)}
<h3>Speed from the gradient</h3>
$$\text{speed}=\text{gradient}=\frac{\text{change in distance}}{\text{change in time}}=\frac{\Delta s}{\Delta t}$$
${F.plot({ w: 500, h: 310, x: [0, 60], y: [0, 400], gridStep: [10, 50], ticks: { x: [10, 20, 30, 40, 50, 60], y: [100, 200, 300, 400] }, xlabel: "time / s", ylabel: "distance / m",
  curves: [{ pts: [[0, 0], [20, 200], [35, 200], [60, 350]], c: "c thick" }],
  extra: (X, Y) => F.line(X(0), Y(0), X(20), Y(0), "o d") + F.line(X(20), Y(0), X(20), Y(200), "o d") + F.text(X(10), Y(0) - 8, "Δt = 20 s", "to small bold") + F.text(X(20) + 6, Y(100), "Δs = 200 m", "to small bold", "start")
    + F.text(X(8), Y(220), "A: 10 m/s", "tc small bold") + F.text(X(27.5), Y(200) - 10, "B: stopped", "tc small bold") + F.text(X(48), Y(325) - 18, "C: 150/25 = 6 m/s", "tc small bold", "end"),
  cap: "Stage A: gradient = 200/20 = 10 m/s. Stage B: flat, speed 0. Stage C: (350 − 200)/(60 − 35) = 6 m/s. Average for the whole trip = 350/60 = 5.8 m/s." })}
<h3>Curved graphs: the tangent (S)</h3>
<p>When the graph curves, the speed changes from moment to moment. The <b>instantaneous speed</b> at a point is the gradient of the <b>tangent</b> there: a straight line that just touches the curve at that point without crossing it.</p>
${F.plot({ w: 480, h: 300, x: [0, 10], y: [0, 100], gridStep: [1, 10], ticks: { x: [2, 4, 6, 8, 10], y: [20, 40, 60, 80, 100] }, xlabel: "time / s", ylabel: "distance / m",
  curves: [{ f: x => x * x, dom: [0, 10], c: "c thick" }, { f: x => 12 * x - 36, dom: [3, 9.5], c: "k mid", label: "tangent", lpos: [9.5, 78], ldx: 4 }],
  marks: [{ x: 6, y: 36, c: "k", label: "t = 6 s", pos: "nw" }],
  extra: (X, Y) => F.line(X(4), Y(12), X(9), Y(12), "b d") + F.line(X(9), Y(12), X(9), Y(72), "b d") + F.text(X(6.5), Y(12) + 16, "Δt = 5 s", "tb small bold") + F.text(X(9) + 6, Y(42), "Δs = 60 m", "tb small bold", "start"),
  cap: "Tangent at t = 6 s: gradient = 60 ÷ 5 = <b>12 m/s</b>. Draw a big triangle on the tangent: it is more accurate than a small one." })}
<div class="callout exam"><b class="t">How to draw a good tangent</b>Use a ruler. Make the angles between the tangent and the curve look equal on both sides of the point. Then use a large triangle (at least half the grid) to calculate the gradient, and read the values carefully off the axes, including units.</div>
<div class="callout warn"><b class="t">Distance–time vs displacement–time</b>Distance can never decrease, so a distance–time graph never slopes down. If a graph shows "displacement" and slopes down, the object is coming back towards the start.</div>
<details class="check"><summary>What does a steeper straight line on a distance–time graph mean?</summary><div>A greater (constant) speed: more distance is covered per second.</div></details>`},

    { h: "Acceleration (1.2 S)", body: P`
<p class="lead"><b>Acceleration</b> is the change in velocity per unit time. It tells you how quickly the velocity changes, not how fast something is going.</p>
$$a=\frac{\Delta v}{\Delta t}=\frac{v-u}{t}$$
<p>$u$ = initial velocity, $v$ = final velocity, $t$ = time taken. Unit: <b>m/s²</b> (metres per second, per second). An acceleration of 3 m/s² means the velocity increases by 3 m/s <i>every second</i>.</p>
${(() => { let s = F.line(20, 90, 520, 90, "m"); const xs = [0, 1, 4, 9, 16, 25].map(k => 40 + k * 19);
  xs.forEach((x, i) => { s += F.circ(x, 80, 7, "o oS o") + F.text(x, i % 2 ? 40 : 58, i + " s", "tk small") + F.line(x, 88, x, 94, "k thin"); });
  for (let i = 1; i < 6; i++) s += F.text((xs[i] + xs[i - 1]) / 2, i === 1 ? 132 : 116, (i * 4 - 2) + " m", "tc small bold");
  s += F.text(270, 146, "gaps grow 2, 6, 10, 14, 18 m: velocity rises steadily", "tm small");
  return F.fig(560, 160, s, "A ball accelerating at 4 m/s² from rest, photographed every second. Equal time intervals, growing gaps.", { size: "wide" }); })()}
<h3>Deceleration</h3>
<p><b>Deceleration</b> is a <b>negative acceleration</b>: the velocity decreases. A car slowing from 25 m/s to 5 m/s in 4 s has</p>
$$a=\frac{5-25}{4}=-5\ \text{m/s}^2\quad\text{(a deceleration of 5 m/s}^2\text{)}$$
<p>If a question asks for the deceleration, give the positive number (5 m/s²); if it asks for the acceleration, the answer is −5 m/s².</p>
<div class="callout why"><b class="t">Acceleration without speeding up</b>Because velocity is a vector, changing <i>direction</i> is also an acceleration. A satellite in a circular orbit at constant speed is accelerating towards the centre all the time.</div>
<table class="t"><tr><th>Situation</th><th>Typical acceleration</th></tr>
<tr><td>Free fall near Earth</td><td>9.8 m/s²</td></tr><tr><td>Family car, 0–100 km/h in 10 s</td><td>2.8 m/s²</td></tr><tr><td>Sprinter's start</td><td>about 5 m/s²</td></tr><tr><td>Car braking hard</td><td>−7 to −9 m/s²</td></tr></table>
<details class="check"><summary>A car reaches 30 m/s from rest in 12 s. Find its acceleration. How long would it take to reach 20 m/s at the same rate?</summary><div>$a=30/12=2.5$ m/s². $t=\Delta v/a=20/2.5=8$ s.</div></details>`},

    { h: "Speed–time graphs: gradient and area (1.2)", body: P`
<p class="lead">On a speed–time graph, the <b>gradient is the acceleration</b> and the <b>area underneath is the distance travelled</b>. These two facts answer almost every question.</p>
${F.row(
  mini(x => 0, "<b>At rest</b>: on the time axis.", "speed", { y: [-1, 10] }),
  mini(x => 6, "<b>Constant speed</b>: horizontal line.", "speed"),
  mini(x => .9 * x, "<b>Constant acceleration</b>: straight line upwards.", "speed"),
  mini(x => 9 - .75 * x, "<b>Constant deceleration</b>: straight line downwards.", "speed")
)}
<div class="callout warn"><b class="t">The most common mistake</b>A horizontal line means "stopped" on a <b>distance</b>–time graph, but "constant speed" on a <b>speed</b>–time graph. Always read the y-axis label first.</div>
<div class="viz" data-viz="motionGraphs"></div>
<h3>A full worked journey</h3>
${F.plot({ w: 520, h: 320, x: [0, 50], y: [0, 25], gridStep: [5, 5], ticks: { x: [10, 20, 30, 40, 50], y: [5, 10, 15, 20, 25] }, xlabel: "time / s", ylabel: "speed / m/s",
  curves: [{ pts: [[0, 0], [10, 20], [30, 20], [45, 0]], c: "c thick" }],
  extra: (X, Y) => F.poly([[X(0), Y(0)], [X(10), Y(20)], [X(10), Y(0)]], "oS nostroke", true) + F.rect(X(10), Y(20), X(30) - X(10), Y(0) - Y(20), "bS nostroke") + F.poly([[X(30), Y(0)], [X(30), Y(20)], [X(45), Y(0)]], "gS nostroke", true)
    + F.text(X(7), Y(5), "100 m", "to bold") + F.text(X(20), Y(9), "400 m", "tb bold") + F.text(X(34), Y(5), "150 m", "tg bold"),
  cap: "Areas: ½ × 10 × 20 = 100 m, then 20 × 20 = 400 m, then ½ × 15 × 20 = 150 m. Total distance = <b>650 m</b>." })}
<ul><li>0–10 s: acceleration = gradient = $20/10=2$ m/s².</li>
<li>10–30 s: constant speed 20 m/s, acceleration 0.</li>
<li>30–45 s: acceleration $=\dfrac{0-20}{15}=-1.33$ m/s² (deceleration 1.33 m/s²).</li>
<li>Average speed $=650/45=14.4$ m/s.</li></ul>
<p>The whole area is also a trapezium: $\tfrac12(a+b)h=\tfrac12(20+45)\times20=650$ m. Same answer, faster.</p>
<h3>Curved speed–time graphs (S)</h3>
${F.plot({ w: 460, h: 290, x: [0, 10], y: [0, 30], grid: false, ticks: { x: [2, 4, 6, 8, 10], y: [10, 20, 30] }, xlabel: "time / s", ylabel: "speed / m/s",
  curves: [{ f: x => 28 * (1 - Math.exp(-x / 2.5)), c: "c thick" }, { f: x => 11.2 * (x - 1) + 9.18, dom: [0.2, 2.4], c: "k mid" }],
  marks: [{ x: 1, y: 28 * (1 - Math.exp(-1 / 2.5)), c: "k" }],
  extra: (X, Y) => F.text(X(2.7), Y(12), "steep tangent:", "tk small bold", "start") + F.text(X(2.7), Y(12) + 15, "large acceleration", "tk small bold", "start") + F.text(X(9.8), Y(21), "flattening: acceleration decreasing", "tc small bold", "end"),
  cap: "A curve means the acceleration is changing. Here the gradient falls: the object still speeds up, but less each second, until it reaches a steady speed." })}
<p>Instantaneous acceleration = gradient of the tangent. Distance under a curve: count the squares (each square's area = its width in s × its height in m/s), counting more than half a square as one.</p>
<details class="check"><summary>On a speed–time graph a line goes from (0 s, 4 m/s) to (6 s, 16 m/s). Find the acceleration and the distance.</summary><div>$a=(16-4)/6=2$ m/s². Distance = trapezium $\tfrac12(4+16)\times6=60$ m.</div></details>`},

    { h: "Free fall (1.2)", body: P`
<p class="lead">Near the Earth's surface, every object falling freely (with no air resistance) has the same acceleration: the <b>acceleration of free fall</b>, $g\approx9.8$ m/s². A hammer and a feather dropped together on the Moon land together.</p>
<div class="viz" data-viz="freeFall"></div>
<h3>Why everything falls at the same rate</h3>
<p>A heavier object has a bigger weight (more force pulling down), but it also has more mass (more inertia to overcome). Since $W=mg$ and $a=F/m$, we get $a=mg/m=g$. The mass cancels.</p>
<h3>With air resistance (S)</h3>
<ol class="steps-inline"><li><b>Just released</b>: speed 0, so no air resistance. Acceleration = $g$.</li>
<li><b>Speeding up</b>: air resistance grows with speed. Resultant force = weight − drag gets smaller, so the acceleration decreases. The speed–time graph curves and becomes less steep.</li>
<li><b>Terminal velocity</b>: drag = weight. Resultant force is zero, acceleration is zero, speed is constant.</li></ol>
${F.plot({ w: 470, h: 290, x: [0, 12], y: [0, 60], grid: false, ticks: { x: [2, 4, 6, 8, 10, 12], y: [20, 40, 60] }, xlabel: "time / s", ylabel: "speed / m/s",
  curves: [{ f: x => 9.8 * x, dom: [0, 6], c: "k thick", label: "no air resistance: gradient 9.8 m/s²", lpos: [6, 57], ldx: 8 }, { f: x => 45 * Math.tanh(9.8 * x / 45), c: "c thick", label: "with air resistance", lpos: [7, 36] }],
  extra: (X, Y) => F.line(X(0), Y(45), X(12), Y(45), "m d thin") + F.text(X(12), Y(45) - 8, "terminal velocity", "tm small", "end"),
  cap: "Both start with gradient g. Air resistance makes the curve level off at terminal velocity. See Forces for the parachute stage." })}
<div class="callout exam"><b class="t">Using g</b>Use 9.8 m/s² unless the question gives another value (some papers say "take g = 10 m/s²"). A ball dropped from rest has speed $9.8\times3=29.4$ m/s after 3 s (ignoring air resistance).</div>
<details class="check"><summary>A stone is dropped from rest down a well and hits the water after 2.0 s. Ignoring air resistance, find its speed at impact and the depth of the well.</summary><div>$v=gt=9.8\times2.0=19.6$ m/s. Depth = area under the speed–time graph (a triangle) $=\tfrac12\times2.0\times19.6=19.6$ m.</div></details>`},

    { h: "Measuring speed and acceleration in the lab", body: P`
<p class="lead">Practical questions (Paper 5 and 6) often ask how you would measure a speed. The principle is always $v=s/t$: a measured distance and a measured time.</p>
${(() => { let s = F.line(20, 150, 520, 140, "k mid") + F.rect(150, 116, 70, 24, "o oS", 4) + F.circ(165, 144, 6, "k") + F.circ(205, 142, 6, "k") + F.rect(178, 86, 16, 30, "k kF") + F.text(186, 78, "card", "tk small bold");
  [300, 430].forEach((x, i) => { s += F.rect(x - 6, 60, 12, 72, "m mS", 3) + F.line(x, 70, x, 120, "r d") + F.text(x, 52, "light gate " + (i + 1), "tk small bold"); });
  s += F.line(300, 132, 300, 172, "m thin") + F.line(430, 132, 430, 168, "m thin") + F.dim(300, 176, 430, 172, "distance between gates", "c", 16);
  s += F.rect(455, 192, 80, 34, "k bgF", 6) + F.text(495, 214, "timer", "tk small bold") + F.poly([[300, 60], [300, 36], [495, 36], [495, 192]], "m thin d") + F.poly([[430, 60], [430, 36]], "m thin d");
  return F.fig(540, 245, s, "A trolley runs down a ramp. Each gate times how long the card blocks its beam: speed at that gate = card length ÷ time blocked.", { size: "wide" }); })()}
<h3>Method 1: one light gate</h3>
<p>Speed = <b>length of card ÷ time the card blocks the beam</b>. With a 5.0 cm card blocking the beam for 0.025 s, $v=0.050/0.025=2.0$ m/s.</p>
<h3>Method 2: two light gates (acceleration, S)</h3>
<p>Find the speed at gate 1 ($u$) and gate 2 ($v$), and the time to travel between them ($t$). Then $a=(v-u)/t$.</p>
<h3>Method 3: stopwatch and tape measure</h3>
<p>Time a walker or a cyclist over 50 m or 100 m. Use long distances so reaction time is a small fraction of the time measured.</p>
<div class="callout exam"><b class="t">Sources of error and improvements</b><ul><li>Reaction time: use light gates, or longer distances.</li><li>Card not perpendicular to the beam: effective length changes.</li><li>Friction varies along the runway: compensate by tilting it slightly.</li><li>Always repeat and take a mean.</li></ul></div>
<details class="check"><summary>A 10.0 cm card blocks a light gate for 0.040 s. Find the speed.</summary><div>$0.100/0.040=2.5$ m/s (convert cm to m first).</div></details>`}
  ],
  worked: [
    { q: P`A cyclist accelerates uniformly from 4 m/s to 10 m/s in 3 s, rides at 10 m/s for 12 s, then brakes uniformly to rest in 5 s. (a) Sketch the speed–time graph. (b) Find the acceleration in each stage. (c) Find the total distance and the average speed.`,
      steps: [P`(a) Straight line up from (0, 4) to (3, 10); horizontal to (15, 10); straight line down to (20, 0).`, P`(b) Stage 1: $a=(10-4)/3=2$ m/s². Stage 2: 0. Stage 3: $a=(0-10)/5=-2$ m/s² (deceleration 2 m/s²).`, P`(c) Areas: trapezium $\tfrac12(4+10)\times3=21$ m; rectangle $10\times12=120$ m; triangle $\tfrac12\times5\times10=25$ m. Total = <b>166 m</b>.`, P`Average speed $=166/20=8.3$ m/s.`]},
    { q: P`A ship sails at 6.0 m/s due east. A current flows at 2.5 m/s due south. Find the ship's resultant velocity.`,
      steps: [P`Vectors at right angles: resultant $=\sqrt{6.0^2+2.5^2}=\sqrt{42.25}=6.5$ m/s.`, P`Angle south of east: $\tan\theta=2.5/6.0$, $\theta=22.6°$.`, P`Answer: 6.5 m/s at 23° south of east (bearing 113°). A vector answer must include the direction.`]},
    { q: P`A ball is dropped from rest. Ignoring air resistance, how far does it fall in the 3rd second (between t = 2 s and t = 3 s)? Take g = 9.8 m/s².`,
      steps: [P`Speeds: at 2 s, $v=19.6$ m/s; at 3 s, $v=29.4$ m/s.`, P`Distance = area under the speed–time graph between 2 s and 3 s (a trapezium): $\tfrac12(19.6+29.4)\times1=24.5$ m.`, P`Compare with the 1st second (4.9 m) and the 2nd (14.7 m): the ball covers more distance each second because it is accelerating.`]},
    { q: P`A student measures the time for 20 oscillations of a pendulum three times: 31.2 s, 30.8 s, 31.0 s. Find the period and explain why 20 oscillations were timed.`,
      steps: [P`Mean $=(31.2+30.8+31.0)/3=31.0$ s.`, P`Period $=31.0/20=1.55$ s.`, P`Timing many oscillations makes the reaction-time error (about 0.2–0.3 s at start and stop) a much smaller fraction of the measured time, so the period is more accurate.`]}
  ],
  formulas: [
    ["Speed", P`$v=\dfrac{s}{t}$`], ["Average speed", P`$\dfrac{\text{total distance}}{\text{total time}}$`], ["Acceleration (S)", P`$a=\dfrac{\Delta v}{\Delta t}=\dfrac{v-u}{t}$`],
    ["Resultant at 90° (S)", P`$R=\sqrt{a^2+b^2},\ \tan\theta=\dfrac{b}{a}$`], ["Distance", "area under the speed–time graph"], ["Speed", "gradient of the distance–time graph"],
    ["Acceleration", "gradient of the speed–time graph"], ["Free fall", P`$g\approx9.8\ \text{m/s}^2$`], ["Unit conversion", P`$\text{km/h}\div3.6=\text{m/s}$`]
  ],
  cards: [
    ["Define speed", "Distance travelled per unit time."],
    ["Define velocity", "Speed in a given direction."],
    ["Define acceleration (S)", "Change in velocity per unit time."],
    ["Unit of acceleration", "m/s² (metres per second squared)."],
    ["What is deceleration? (S)", "A negative acceleration: the velocity is decreasing."],
    ["Scalar vs vector (S)", "Scalar: magnitude only. Vector: magnitude and direction."],
    ["Five vectors (S)", "Force, weight, velocity, acceleration, momentum (also displacement, electric and gravitational field strength)."],
    ["Five scalars (S)", "Distance, speed, time, mass, energy (also temperature)."],
    ["Is weight a scalar or a vector?", "A vector: it is a force, acting downwards."],
    ["Resultant of 6 N and 8 N at right angles (S)", "√(36 + 64) = 10 N."],
    ["Gradient of a distance–time graph", "Speed."],
    ["Gradient of a speed–time graph", "Acceleration."],
    ["Area under a speed–time graph", "Distance travelled."],
    ["Horizontal line on a distance–time graph", "Object at rest."],
    ["Horizontal line on a speed–time graph", "Constant speed (zero acceleration)."],
    ["Curved distance–time graph getting steeper", "Accelerating."],
    ["Speed at an instant on a curved d–t graph (S)", "Gradient of the tangent at that point."],
    ["Average speed formula", "Total distance ÷ total time (never the average of the speeds)."],
    ["Value of g near Earth", "About 9.8 m/s², the same for all objects without air resistance."],
    ["Why measure 20 oscillations?", "Reduces the effect of reaction time: the fixed error is a smaller fraction of the total."],
    ["How to read a measuring cylinder", "Eye level with the bottom of the meniscus, cylinder on a flat surface."],
    ["What is parallax error?", "A reading error from viewing a scale at an angle instead of straight on."],
    ["Volume of an irregular solid", "Displacement: rise in water level in a measuring cylinder (or overflow from a displacement can)."],
    ["Convert 90 km/h to m/s", "90 ÷ 3.6 = 25 m/s."],
    ["Light gate speed", "Speed = card length ÷ time the card blocks the beam."],
    ["Falling with air resistance: 3 stages (S)", "Acceleration g at first; acceleration falls as drag grows; zero at terminal velocity when drag = weight."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Which quantity is a vector?`, opts: ["Speed", "Mass", "Weight", "Energy"], ans: 2, why: P`Weight is a force, so it has direction (downwards).` },
    { type: "mcq", marks: 1, q: P`On a speed–time graph, a horizontal line above the time axis shows`, opts: ["The object is at rest", "Constant speed", "Constant acceleration", "Deceleration"], ans: 1, why: P`Speed is not changing. (On a distance–time graph it would mean at rest.)` },
    { type: "mcq", marks: 1, q: P`A car travels 900 m in 1 minute. Its average speed is`, opts: ["900 m/s", "15 m/s", "54 m/s", "0.067 m/s"], ans: 1, why: P`$900/60=15$ m/s.` },
    { type: "mcq", marks: 1, q: P`The area under a speed–time graph represents`, opts: ["Acceleration", "Speed", "Distance travelled", "Time"], ans: 2, why: P`(m/s) × s = m.` },
    { type: "mcq", marks: 1, q: P`A car's velocity changes from 20 m/s to 8 m/s in 4 s. Its acceleration is`, opts: ["3 m/s²", "−3 m/s²", "7 m/s²", "−48 m/s²"], ans: 1, why: P`$(8-20)/4=-3$ m/s² (a deceleration of 3 m/s²).` },
    { type: "mcq", marks: 1, q: P`Forces of 5 N and 12 N act at right angles. The resultant is`, opts: ["7 N", "13 N", "17 N", "60 N"], ans: 1, why: P`$\sqrt{25+144}=13$ N.` },
    { type: "mcq", marks: 1, q: P`A student times 10 swings as 15.0 s. The period is`, opts: ["0.67 s", "1.5 s", "15 s", "150 s"], ans: 1, why: P`$15.0/10=1.5$ s.` },
    { type: "mcq", marks: 1, q: P`A stone is dropped (no air resistance). After 2 s its speed is about`, opts: ["4.9 m/s", "9.8 m/s", "19.6 m/s", "39.2 m/s"], ans: 2, why: P`$v=gt=9.8\times2$.` },
    { type: "struct", marks: 2, q: P`State the difference between speed and velocity, and give an example where speed is constant but velocity changes.`,
      ms: P`<b>B1</b> velocity is speed in a given direction / velocity is a vector, speed a scalar<br><b>B1</b> e.g. an object moving in a circle at constant speed (direction changes)` },
    { type: "struct", marks: 3, q: P`A runner covers 400 m in 50 s, then walks 200 m in 150 s. Calculate her average speed for the whole journey and explain why it is not 5 m/s.`,
      ms: P`<b>C1</b> total distance 600 m, total time 200 s<br><b>A1</b> 3.0 m/s<br><b>B1</b> 5 m/s is the mean of 8 and 2 m/s; she spends much longer walking, so average speed must use total distance ÷ total time` },
    { type: "struct", marks: 4, q: P`A train accelerates uniformly from rest to 30 m/s in 60 s, then travels at 30 m/s for 120 s. (a) Calculate its acceleration. (b) Calculate the total distance travelled.`,
      ms: P`<b>(a) C1</b> $a=\Delta v/\Delta t=30/60$<br><b>A1</b> 0.50 m/s²<br><b>(b) C1</b> $\tfrac12\times60\times30=900$ m and $30\times120=3600$ m<br><b>A1</b> 4500 m` },
    { type: "struct", marks: 3, q: P`Describe how to find the volume of a small irregular stone using a measuring cylinder.`,
      ms: P`<b>B1</b> partly fill cylinder with water and read the volume (bottom of meniscus, eye level)<br><b>B1</b> lower the stone in gently (tied on thread) so it is fully submerged, read new volume<br><b>B1</b> volume of stone = final reading − initial reading` },
    { type: "struct", marks: 3, q: P`Explain why a student should time 20 oscillations of a pendulum rather than one, and describe how the period is then found.`,
      ms: P`<b>B1</b> reaction time error (about 0.2–0.3 s) is large compared with one oscillation<br><b>B1</b> with 20 oscillations the error is a much smaller fraction of the time measured<br><b>B1</b> period = total time ÷ 20 (repeat and take a mean)` },
    { type: "struct", marks: 4, q: P`A distance–time graph for a car is a curve that becomes steeper. (a) What does this show about the car's motion? (b) S: Describe how you would find the speed at t = 5 s from the graph.`,
      ms: P`<b>(a) B1</b> the speed is increasing / the car is accelerating<br><b>(b) B1</b> draw a tangent to the curve at t = 5 s<br><b>B1</b> draw a large right-angled triangle on the tangent; find Δs and Δt<br><b>B1</b> speed = gradient = Δs/Δt` },
    { type: "struct", marks: 3, q: P`S: A boat heads north at 3.0 m/s across a river flowing east at 1.6 m/s. Calculate the magnitude and direction of the resultant velocity.`,
      ms: P`<b>C1</b> $\sqrt{3.0^2+1.6^2}$<br><b>A1</b> 3.4 m/s<br><b>A1</b> $\tan^{-1}(1.6/3.0)=28°$ east of north (bearing 028°)` },
    { type: "struct", marks: 4, q: P`S: A skydiver jumps from a plane. Describe and explain the change in her acceleration from the moment she jumps until she reaches terminal velocity.`,
      ms: P`<b>B1</b> at first acceleration = g (9.8 m/s²) since no air resistance at zero speed<br><b>B1</b> as speed increases, air resistance increases<br><b>B1</b> resultant force (weight − air resistance) decreases, so acceleration decreases<br><b>B1</b> at terminal velocity air resistance = weight, resultant force zero, acceleration zero` },
    { type: "struct", marks: 3, q: P`A car travelling at 72 km/h brakes and stops in 4.0 s with uniform deceleration. Calculate (a) its initial speed in m/s, (b) its braking distance.`,
      ms: P`<b>(a) B1</b> 72 ÷ 3.6 = 20 m/s<br><b>(b) C1</b> area of triangle $\tfrac12\times4.0\times20$<br><b>A1</b> 40 m` },
    { type: "struct", marks: 2, q: P`A light gate records that a 4.0 cm card on a trolley blocks the beam for 0.020 s. Calculate the speed of the trolley.`,
      ms: P`<b>C1</b> 0.040 m ÷ 0.020 s<br><b>A1</b> 2.0 m/s` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: P`State the unit of acceleration.`, ms: P`<b>B1</b> m/s²` },
    { d: 1, type: "mcq", marks: 1, q: P`Which pair contains one scalar and one vector?`, opts: ["mass and energy", "speed and velocity", "force and weight", "time and temperature"], ans: 1, why: P`Speed is a scalar; velocity is a vector.` },
    { d: 1, type: "struct", marks: 2, q: P`A bus travels 24 km in 30 minutes. Calculate its average speed in km/h.`, ms: P`<b>C1</b> 30 min = 0.5 h<br><b>A1</b> 48 km/h` },
    { d: 1, type: "struct", marks: 2, q: P`Sketch the shape of a distance–time graph for an object (a) at rest, (b) moving at constant speed.`, ms: P`<b>B1</b> (a) horizontal straight line<br><b>B1</b> (b) straight line sloping upwards (through origin if starting at 0)` },
    { d: 1, type: "struct", marks: 2, q: P`The reading on a measuring cylinder rises from 35 cm³ to 52 cm³ when a key is lowered in. Find the volume of the key and state the precaution needed when reading the scale.`, ms: P`<b>B1</b> 17 cm³<br><b>B1</b> eye level with the bottom of the meniscus (avoid parallax)` },
    { d: 2, type: "struct", marks: 3, q: P`A sprinter accelerates uniformly from rest to 9.0 m/s in 3.0 s. Calculate the acceleration and the distance covered in this time.`, ms: P`<b>A1</b> $a=9.0/3.0=3.0$ m/s²<br><b>C1</b> distance = $\tfrac12\times3.0\times9.0$<br><b>A1</b> 13.5 m` },
    { d: 2, type: "struct", marks: 3, q: P`A 30 cm ruler is used to measure 50 sheets of paper as 0.45 cm thick. (a) Calculate the thickness of one sheet in mm. (b) Why is it better to measure 50 sheets than one?`, ms: P`<b>(a) C1</b> 0.45 ÷ 50 = 0.009 cm<br><b>A1</b> 0.09 mm<br><b>(b) B1</b> one sheet is too thin to measure with a ruler (precision 1 mm); the fractional error is much smaller for 50 sheets` },
    { d: 2, type: "struct", marks: 4, q: P`A lift starts from rest, accelerates uniformly to 2.0 m/s in 2.0 s, moves at 2.0 m/s for 10 s, then decelerates uniformly to rest in 4.0 s. (a) Draw/describe the speed–time graph. (b) How far does the lift travel?`, ms: P`<b>(a) B1</b> line from (0,0) to (2,2), horizontal to (12,2), line to (16,0)<br><b>(b) C1</b> 2 + 20 + 4<br><b>C1</b> (use of area, at least two parts correct)<br><b>A1</b> 26 m` },
    { d: 2, type: "mcq", marks: 1, q: P`A car accelerates at 2.5 m/s² from 10 m/s. Its speed after 6 s is`, opts: ["15 m/s", "25 m/s", "35 m/s", "160 m/s"], ans: 1, why: P`Increase $=2.5\times6=15$ m/s, so $10+15=25$ m/s.` },
    { d: 2, type: "struct", marks: 3, q: P`S: Two forces of 30 N east and 40 N north act on a sledge. By scale drawing or calculation, find the resultant force (magnitude and direction).`, ms: P`<b>C1</b> $\sqrt{30^2+40^2}$<br><b>A1</b> 50 N<br><b>A1</b> 53° north of east (bearing 037°)` },
    { d: 3, type: "struct", marks: 5, q: P`A cyclist rides 3.0 km at 12 km/h, rests for 10 minutes, then rides 6.0 km at 24 km/h. (a) Calculate the total time in minutes. (b) Calculate the average speed in km/h and in m/s. (c) Explain why your answer is not 18 km/h.`, ms: P`<b>(a) C1</b> 15 min + 10 min + 15 min<br><b>A1</b> 40 min<br><b>(b) A1</b> 9.0 km ÷ (2/3 h) = 13.5 km/h<br><b>A1</b> 3.75 m/s<br><b>(c) B1</b> average of the speeds ignores different times spent (and the rest stop); must use total distance ÷ total time` },
    { d: 3, type: "struct", marks: 5, q: P`S: A distance–time graph for a falling parachutist is a curve that becomes straight. Describe what the graph shows about the speed, explain the shape using forces, and state how the terminal velocity could be found from the graph.`, ms: P`<b>B1</b> curve getting steeper: speed increasing<br><b>B1</b> straight section: constant speed (terminal velocity)<br><b>B1</b> air resistance increases with speed until it equals weight<br><b>B1</b> resultant force then zero, so no acceleration<br><b>B1</b> terminal velocity = gradient of the straight section` },
    { d: 3, type: "struct", marks: 6, q: P`Plan an experiment to find the acceleration of a trolley rolling down a ramp, using two light gates and a timer. Include the measurements, the calculation and two ways to improve accuracy.`, ms: P`<b>B1</b> card of measured length fixed to trolley, perpendicular to beams<br><b>B1</b> record time card blocks gate 1 and gate 2<br><b>B1</b> record time to travel from gate 1 to gate 2<br><b>B1</b> $u$ = card length/time at gate 1; $v$ = card length/time at gate 2<br><b>B1</b> $a=(v-u)/t$<br><b>B1</b> any two: repeat and average; release from the same point each time; keep card vertical; compensate for friction` },
    { d: 3, type: "struct", marks: 4, q: P`S: A ball is thrown vertically upwards at 14.7 m/s. Ignoring air resistance (g = 9.8 m/s²): (a) how long does it take to reach its highest point? (b) how high does it rise? (c) sketch the velocity–time graph for the whole flight back to the hand, taking upwards as positive.`, ms: P`<b>(a) A1</b> $t=14.7/9.8=1.5$ s<br><b>(b) C1</b> area $\tfrac12\times1.5\times14.7$<br><b>A1</b> 11 m (11.0)<br><b>(c) B1</b> straight line from +14.7 m/s down through zero at 1.5 s to −14.7 m/s at 3.0 s (constant gradient −9.8)` }
  ]
});
}
