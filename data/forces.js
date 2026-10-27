window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
// ---- diagram helpers for this topic ----
// free-body diagram: forces = [{dir:'up'|'down'|'left'|'right', len, label, c}]
const fbd = (forces, cap, o = {}) => {
  const W = o.w || 360, H = o.h || 260, cx = W / 2, cy = H / 2, bw = o.bw || 80, bh = o.bh || 54;
  let s = F.rect(cx - bw / 2, cy - bh / 2, bw, bh, "k cS", 6) + (o.label ? F.text(cx, cy + 5, o.label, "tk bold") : "");
  if (o.ground) s += F.line(20, cy + bh / 2, W - 20, cy + bh / 2, "k") + Array.from({ length: 14 }, (_, i) => F.line(28 + i * 23, cy + bh / 2 + 2, 18 + i * 23, cy + bh / 2 + 12, "m thin")).join("");
  forces.forEach(f => {
    const L = f.len, c = f.c || "k";
    if (f.dir === "up") s += F.arrow(cx, cy - bh / 2, cx, cy - bh / 2 - L, c + " thick", 11) + F.text(cx + 10, cy - bh / 2 - L + 14, f.label, "t" + c + " bold small", "start");
    if (f.dir === "down") s += F.arrow(cx, cy + bh / 2 - (o.ground ? bh / 2 : 0), cx, cy + bh / 2 + L - (o.ground ? bh / 2 : 0), c + " thick", 11) + F.text(cx + 10, cy + bh / 2 + L - 4 - (o.ground ? bh / 2 : 0), f.label, "t" + c + " bold small", "start");
    if (f.dir === "right") s += F.arrow(cx + bw / 2, cy, cx + bw / 2 + L, cy, c + " thick", 11) + F.text(cx + bw / 2 + L + 6, cy + 5, f.label, "t" + c + " bold small", "start");
    if (f.dir === "left") s += F.arrow(cx - bw / 2, cy, cx - bw / 2 - L, cy, c + " thick", 11) + F.text(cx - bw / 2 - L - 6, cy + 5, f.label, "t" + c + " bold small", "end");
  });
  return F.fig(W, H, s, cap, { size: o.size || "" });
};
const zigzag = (x, y1, y2, n = 12, amp = 10) => { const pts = [[x, y1]]; for (let i = 1; i < n; i++) pts.push([x + (i % 2 ? amp : -amp), y1 + (y2 - y1) * i / n]); pts.push([x, y2]); return F.poly(pts, "k mid"); };
const tilted = (deg, cogInside, cap) => {
  // box w x h tilted about bottom-right corner P
  const P = [250, 210], w = 70, h = 150, a = deg * Math.PI / 180;
  const rot = ([x, y]) => [P[0] + x * Math.cos(a) + y * Math.sin(a), P[1] - (-x * Math.sin(a) + y * Math.cos(a))];
  const pts = [[0, 0], [-w, 0], [-w, h], [0, h]].map(rot), G = rot([-w / 2, h * (cogInside ? 0.32 : 0.62)]);
  let s = F.line(40, 210, 340, 210, "k") + F.poly(pts, "k cS", true) + F.dot(G[0], G[1], "r", 6) + F.arrow(G[0], G[1], G[0], 205, "r mid", 9) + F.dot(P[0], P[1], "k", 4);
  const inside = G[0] < P[0];
  s += F.text(G[0] - 14, G[1] + 4, "CoG", "tr small bold", "end");
  s += F.text(P[0] + 8, 232, "pivot (edge of base)", "tk small", "start");
  return F.fig(380, 250, s, cap);
};
//@@HELPERS-END

/* ============================================================
   FORCES  (0625 2026–2028: 1.2 free fall, 1.3, 1.5.1–1.5.3, 1.6)
   ============================================================ */
TOPICS.push({
  id: "forces", subject: "physics", title: "Forces, moments & momentum",
  blurb: "Resultant force, Hooke's law, mass and weight, F = ma, terminal velocity, circular motion, moments, centre of gravity, momentum.",
  level: "Core → Supplement", demo: "forces",
  syllabus: [
    ["1.5.1", "Know that forces may change the size, shape and motion of an object", 0],
    ["1.5.1", "Find the resultant of two or more forces acting along the same straight line", 1],
    ["1.5.1", "Sketch, plot and interpret load–extension graphs; describe the experiment", 2],
    ["1.5.1 S", "Define the spring constant ($k=F/x$) and the limit of proportionality", 2],
    ["1.3", "Mass, weight and gravitational field strength; $W=mg$; comparing weights with a balance", 3],
    ["1.3 S", "Weight as the effect of a gravitational field on a mass; $g$ is the acceleration of free fall", 3],
    ["1.5.1", "An object remains at rest or at constant velocity unless acted on by a resultant force", 4],
    ["1.5.1 S", "Recall and use $F=ma$; force and acceleration act in the same direction", 5],
    ["1.5.1", "Solid friction and drag oppose motion and produce heating", 6],
    ["1.2 S", "Motion of objects falling with and without air resistance, including terminal velocity", 7],
    ["1.5.1 S", "Circular motion due to a force perpendicular to the motion", 8],
    ["1.5.2", "Moment of a force; the principle of moments", 9],
    ["1.5.2 S", "Conditions for equilibrium; the experiment to show no resultant moment", 9],
    ["1.5.3", "Centre of gravity: the plumb-line experiment and the effect on stability", 10],
    ["1.6 S", "Momentum $p=mv$, impulse $F\\Delta t=\\Delta(mv)$, conservation of momentum, $F=\\Delta p/\\Delta t$", 11]
  ],
  sections: [
    { h: "What forces are and what they do (1.5.1)", body: P`
<p class="lead">A <b>force</b> is a push or a pull that one object exerts on another. It is measured in <b>newtons (N)</b>. Roughly, 1 N is the weight of a small apple.</p>
<p>A force can change:</p>
<ul><li>the <b>speed</b> of an object (speeding it up or slowing it down),</li>
<li>the <b>direction</b> of motion (a bat deflecting a ball, gravity curving a projectile's path),</li>
<li>the <b>shape or size</b> of an object (stretching a spring, squashing a ball, bending a ruler).</li></ul>
<p>Forces always act <b>between two objects</b>: the Earth pulls you (weight) and the floor pushes you (contact force). If you can't say which object is exerting a force, it probably isn't a real force.</p>
<table class="t"><tr><th>Contact forces</th><th>Non-contact forces (act at a distance)</th></tr>
<tr><td>Normal contact (reaction) force, friction, air resistance / drag, tension, upthrust, thrust</td><td>Weight (gravitational), magnetic, electrostatic</td></tr></table>
<h3>Force is a vector</h3>
<p>A <b>vector</b> has both <b>size</b> (magnitude) and <b>direction</b>. Force, velocity, acceleration, displacement and momentum are vectors. Mass, speed, distance, energy and time are <b>scalars</b>, with size only. On diagrams, a force is drawn as an arrow: its length shows the size and it points in the direction of the force.</p>
<details class="check"><summary>Name the forces acting on a book resting on a table.</summary><div>Weight (the Earth pulling it down) and the normal contact force from the table (pushing it up). They are equal and opposite, so the resultant is zero.</div></details>`},

    { h: "Resultant force and free-body diagrams (1.5.1)", body: P`
<p class="lead">When several forces act on an object, what matters is the <b>resultant force</b>: the single force that would have exactly the same effect as all of them together.</p>
<p>For forces along the same straight line:</p>
<ul><li>Same direction: <b>add</b> them.</li><li>Opposite directions: <b>subtract</b>; the resultant acts in the direction of the larger force.</li></ul>
${F.row(
  fbd([{ dir: "right", len: 80, label: "800 N", c: "g" }, { dir: "left", len: 30, label: "300 N", c: "r" }], "Resultant $=800-300=500$ N to the right, so it speeds up.", { w: 330, h: 120, bh: 44, bw: 60, label: "car" }),
  fbd([{ dir: "right", len: 50, label: "500 N", c: "g" }, { dir: "left", len: 50, label: "500 N", c: "r" }], "Resultant $=0$, so constant velocity (or at rest).", { w: 330, h: 120, bh: 44, bw: 60, label: "car" })
)}
<h3>Free-body diagrams</h3>
<p>A <b>free-body diagram</b> shows one object (as a box or dot) with an arrow for <b>every force acting on it</b>, and nothing else. Forces the object exerts on other things are not drawn. Draw arrows from the object, with lengths roughly proportional to size, and label each with its name and value.</p>
${fbd([{ dir: "up", len: 70, label: "normal contact force 20 N", c: "b" }, { dir: "down", len: 70, label: "weight 20 N", c: "o" }, { dir: "right", len: 90, label: "pull 15 N", c: "g" }, { dir: "left", len: 48, label: "friction 8 N", c: "r" }], "A box pulled along the floor. Vertically the forces balance. Horizontally the resultant is $15-8=7$ N to the right.", { w: 520, h: 300, label: "box" })}
<p>Treat vertical and horizontal separately. Above, the vertical forces cancel (it doesn't fly up or sink into the floor), and the horizontal resultant of 7 N makes it accelerate to the right.</p>
<div class="callout warn"><b class="t">Common mistakes</b>Drawing a "force of motion" in the direction of travel. There's no such force: moving objects keep moving without one. Forgetting weight. Adding forces that act in opposite directions.</div>
<details class="check"><summary>A boat has 2000 N thrust forwards, 1500 N water resistance and 300 N air resistance. Find the resultant.</summary><div>$2000-1500-300=200$ N forwards.</div></details>`},

    { h: "Springs and Hooke's law (1.5.1)", body: P`
<p class="lead">When you hang loads on a spring it stretches. How it stretches follows a simple, precise law, and the experiment is a favourite in exams.</p>
${(() => { let s = F.rect(40, 250, 140, 12, "k mS") + F.line(70, 250, 70, 30, "k thick") + F.line(70, 40, 190, 40, "k thick") + F.rect(62, 32, 16, 16, "k bgF");
  s += F.line(170, 40, 170, 52, "k") + zigzag(170, 52, 150, 14, 9) + F.line(170, 150, 170, 162, "k") + F.line(170, 162, 214, 162, "r mid") + F.text(192, 156, "pointer", "tr small");
  s += F.rect(152, 166, 36, 16, "k oS", 3) + F.rect(152, 184, 36, 16, "k oS", 3) + F.rect(152, 202, 36, 16, "k oS", 3) + F.text(126, 236, "slotted masses", "to small");
  s += F.rect(214, 30, 26, 220, "k bgF"); for (let i = 0; i <= 22; i++) s += F.line(214, 34 + i * 9.6, 214 + (i % 5 ? 7 : 13), 34 + i * 9.6, "k thin");
  s += F.text(246, 60, "metre rule (clamped vertically)", "tk small", "start") + F.text(110, 278, "clamp stand", "tk small") + F.line(204, 162, 214, 162, "r thin");
  s += F.circ(300, 162, 12, "b") + F.line(300, 162, 216, 162, "b d thin") + F.text(318, 166, "eye level with pointer", "tb small", "start");
  return F.fig(460, 290, s, "Hooke's law apparatus. Read the pointer against the rule with your eye level with it, to avoid parallax error.", { size: "small" }); })()}
<h3>The experiment</h3>
<ol class="steps-inline"><li>Clamp the spring at the top, with a metre rule clamped vertically beside it. Fix a pointer to the bottom of the spring.</li>
<li>Record the <b>original (unstretched) length</b>, or the pointer's position, reading at eye level.</li>
<li>Add a 100 g mass hanger (load $=mg=0.1\times9.8=0.98$ N, about 1 N). Wait until the spring stops oscillating, then record the new pointer reading.</li>
<li>Repeat, adding masses in equal steps, up to about 8 loads.</li>
<li>Calculate <b>extension = new length − original length</b> for each load.</li>
<li>Plot <b>load (y-axis) against extension (x-axis)</b> and draw a line of best fit.</li>
<li>Remove the loads one at a time and check that the spring returns to its original length. If it doesn't, it has been permanently deformed.</li></ol>
<p><b>Safety and accuracy:</b> wear eye protection in case the spring snaps; put a tray or cushion below the masses; clamp the stand down or counterweight it so it can't topple. Use a set square to read the rule horizontally, and repeat each reading.</p>
<h3>The graph</h3>
<div class="viz" data-viz="spring"></div>
${F.plot({ w: 440, h: 300, x: [0, 12], y: [0, 8], gridStep: [1, 1], ticks: { x: [2, 4, 6, 8, 10], y: [2, 4, 6] }, xlabel: "extension (cm)", ylabel: "load (N)",
  curves: [{ pts: [[0, 0], [2, 1], [4, 2], [6, 3], [8, 4], [9.4, 4.6], [10.6, 5], [11.6, 5.3]], c: "c thick" }],
  marks: [{ x: 8, y: 4, c: "r", label: "limit of proportionality", pos: "nw" }],
  extra: (X, Y) => F.line(X(2), Y(1), X(6), Y(1), "k thin d") + F.line(X(6), Y(1), X(6), Y(3), "k thin d") + F.text(X(4), Y(1) + 16, "4 cm", "tk small") + F.text(X(6) + 6, Y(2), "2 N", "tk small", "start"),
  cap: "Straight through the origin up to the limit of proportionality: $k$ = gradient $=\\dfrac{2\\text{ N}}{4\\text{ cm}}=0.5$ N/cm. Beyond it, the graph curves." })}
<ul><li><b>Straight line through the origin</b>: extension is <b>directly proportional</b> to load. Double the load and you double the extension.</li>
<li><b>Limit of proportionality</b> (S): the point beyond which extension is no longer proportional to load. The graph stops being straight. Mark it as the end of the straight section.</li></ul>
<h3>The spring constant (S)</h3>
$$k=\frac{F}{x}\qquad\text{(force per unit extension; N/m or N/cm)}$$
<p>A <b>stiff</b> spring has a <b>large</b> $k$: it needs a large force for each centimetre of stretch. With load on the $y$-axis and extension on the $x$-axis, $k$ is the <b>gradient</b> of the straight section. If the axes are swapped (extension against load), $k=1/\text{gradient}$.</p>
<div class="callout warn"><b class="t">Lost marks</b>Plotting <b>length</b> instead of extension: the line then won't pass through the origin. Using mass (g) instead of load (N). Forgetting to convert cm to m when $k$ is asked for in N/m (0.5 N/cm = 50 N/m).</div>
<div class="callout ex"><b class="t">Worked example</b>A spring is 12.0 cm long. A 4.0 N load makes it 15.2 cm. Find $k$, and the length with a 6.0 N load (assuming it stays within the limit of proportionality).<br>$x=3.2$ cm, so $k=\dfrac{4.0}{3.2}=1.25$ N/cm. For 6.0 N: $x=\dfrac{6.0}{1.25}=4.8$ cm, so the length is $16.8$ cm.</div>
<details class="check"><summary>A spring has $k=40$ N/m. What load stretches it by 15 cm?</summary><div>$F=kx=40\times0.15=6.0$ N.</div></details>`},

    { h: "Mass, weight and gravitational field strength (1.3)", body: P`
<table class="t"><tr><th></th><th>Mass</th><th>Weight</th></tr>
<tr><td>Definition</td><td>A measure of the <b>quantity of matter</b> in an object (at rest relative to the observer)</td><td>The <b>gravitational force</b> on an object that has mass</td></tr>
<tr><td>Type</td><td>Scalar</td><td>Vector (a force), acting towards the centre of the Earth</td></tr>
<tr><td>Unit</td><td>kilogram (kg)</td><td>newton (N)</td></tr>
<tr><td>Changes with location?</td><td>No</td><td>Yes: less on the Moon, zero in deep space</td></tr>
<tr><td>Measured with</td><td>Balance (comparing with standard masses)</td><td>Newton meter (spring balance)</td></tr></table>
$$W=mg\qquad g=\frac{W}{m}$$
<p><b>Gravitational field strength</b> $g$ is the <b>force per unit mass</b>: the weight of each kilogram. On Earth it is about <b>9.8 N/kg</b>.</p>
<table class="t"><tr><th>Place</th><th>$g$ (N/kg)</th><th>Weight of a 60 kg person</th></tr>
<tr><td>Earth</td><td>9.8</td><td>588 N</td></tr><tr><td>Moon</td><td>1.6</td><td>96 N</td></tr><tr><td>Mars</td><td>3.7</td><td>222 N</td></tr><tr><td>Jupiter</td><td>25</td><td>1500 N</td></tr></table>
<p>The person's <b>mass</b> is 60 kg everywhere. Only their weight changes.</p>
<h3>Comparing weights with a balance</h3>
${(() => { let s = F.poly([[200, 200], [180, 240], [220, 240]], "k mS", true) + F.line(80, 120, 320, 120, "k thick") + F.line(200, 120, 200, 200, "k mid");
  s += F.line(90, 120, 90, 150, "k") + F.line(310, 120, 310, 150, "k") + F.path("M60,150 Q90,175 120,150 Z", "k bS") + F.path("M280,150 Q310,175 340,150 Z", "k oS");
  s += F.rect(78, 128, 24, 20, "k bgF") + F.text(90, 143, "?", "tk bold") + F.rect(296, 130, 28, 18, "k bgF") + F.text(310, 144, "1 kg", "tk small bold");
  return F.fig(400, 260, s, "A beam balance compares weights. Both pans are in the same gravitational field, so equal weights means equal masses. It reads the same on the Moon.", { size: "small" }); })()}
<h3>Why everything falls at the same rate (S)</h3>
<p>Weight is the effect of a gravitational field on a mass. If weight is the only force acting, $F=ma$ gives $mg=ma$, so $a=g$. The <b>acceleration of free fall</b> is $9.8$ m/s² for <b>every</b> object, whatever its mass. A heavier object has more weight pulling it, but proportionally more mass to accelerate, and the two cancel exactly. That's why $g$ can be quoted as either 9.8 N/kg or 9.8 m/s²: they are the same quantity.</p>
<p>Astronaut David Scott dropped a hammer and a feather on the Moon (no air) and they landed together.</p>
<details class="check"><summary>A rock weighs 37 N on Mars ($g=3.7$ N/kg). What is its mass, and its weight on Earth?</summary><div>$m=37/3.7=10$ kg. On Earth: $10\times9.8=98$ N.</div></details>`},

    { h: "Newton's first law: balanced forces (1.5.1)", body: P`
<div class="callout key"><b class="t">The rule</b>If the resultant force on an object is <b>zero</b>, the object either stays <b>at rest</b> or continues to move at <b>constant velocity</b> (constant speed in a straight line). A resultant force is needed to <b>change</b> velocity, not to keep it.</div>
<p>This contradicts everyday intuition, because on Earth moving things seem to slow down "by themselves". They don't: friction and air resistance are forces that slow them. Remove those (a puck on ice, a space probe) and objects keep going for ever. <i>Voyager 1</i> has been coasting out of the Solar System since 1977 with its engines off.</p>
${fbd([{ dir: "right", len: 60, label: "driving 3000 N", c: "g" }, { dir: "left", len: 60, label: "drag + friction 3000 N", c: "r" }, { dir: "up", len: 50, label: "contact 12 000 N", c: "b" }, { dir: "down", len: 50, label: "weight 12 000 N", c: "o" }], "A car cruising at a steady 70 km/h: every force is balanced, so the resultant is zero and the velocity stays constant.", { w: 560, h: 250, label: "car" })}
<h3>Inertia</h3>
<p>The tendency of an object to stay at rest or keep moving at constant velocity is called <b>inertia</b>, and <b>mass</b> is its measure. A loaded lorry is harder to start <i>and</i> harder to stop than a bicycle. When a bus brakes suddenly, your body keeps moving forward. No force pushes you forward: the bus slows down and you don't, until the seat belt provides the force.</p>
<div class="callout warn"><b class="t">Misconception check</b>"If it's moving, there must be a force in the direction of motion." False. "If the forces are balanced, it must be stationary." Also false: balanced forces can mean <b>constant velocity</b>.</div>
<details class="check"><summary>A lift moves upwards at a constant speed. Compare the tension in the cable with the lift's weight.</summary><div>Equal. Constant velocity means zero resultant force.</div></details>`},

    { h: "Newton's second law: F = ma (1.5.1 S)", body: P`
$$F=ma\qquad\text{resultant force (N)}=\text{mass (kg)}\times\text{acceleration (m/s}^2)$$
<p class="lead">A resultant force makes an object accelerate. The acceleration is <b>proportional to the resultant force</b> and <b>inversely proportional to the mass</b>, and it acts in the <b>same direction</b> as the resultant force.</p>
<ul><li>Double the resultant force → double the acceleration.</li><li>Double the mass → half the acceleration.</li>
<li>Resultant force <b>opposite</b> to the motion → negative acceleration (deceleration): the object slows down.</li></ul>
<p>1 newton is defined as the force that gives a 1 kg mass an acceleration of 1 m/s².</p>
<ol class="steps-inline"><li>Draw a free-body diagram.</li><li>Find the <b>resultant</b> force (and its direction).</li><li>Apply $F=ma$.</li><li>If needed, use $a=\dfrac{v-u}{t}$ to find speeds or times.</li></ol>
${fbd([{ dir: "right", len: 100, label: "3000 N", c: "g" }, { dir: "left", len: 20, label: "600 N", c: "r" }], "$m=1200$ kg. Resultant $=3000-600=2400$ N, so $a=\\dfrac{2400}{1200}=2.0$ m/s² forwards.", { w: 420, h: 120, bh: 44, label: "1200 kg" })}
<div class="callout warn"><b class="t">The most common error</b>Using the driving force (3000 N) in $F=ma$ instead of the <b>resultant</b> (2400 N). $F$ is always the resultant.</div>
<div class="callout ex"><b class="t">Worked example: braking</b>A 900 kg car travelling at 20 m/s brakes with a resultant force of 6000 N. How long does it take to stop?<br>$a=\dfrac{F}{m}=\dfrac{6000}{900}=6.67$ m/s² (deceleration). $t=\dfrac{\Delta v}{a}=\dfrac{20}{6.67}=3.0$ s.</div>
<div class="callout ex"><b class="t">Worked example: lifting</b>A crane lifts a 500 kg load with a tension of 5400 N. Find the acceleration ($g=9.8$ N/kg).<br>Weight $=4900$ N. Resultant $=5400-4900=500$ N upwards. $a=\dfrac{500}{500}=1.0$ m/s² upwards.</div>
<details class="check"><summary>A 0.15 kg ball accelerates at 40 m/s². What resultant force acts on it?</summary><div>$F=0.15\times40=6.0$ N.</div></details>`},

    { h: "Friction and drag (1.5.1)", body: P`
<p class="lead"><b>Friction</b> is a force that <b>opposes motion</b> (or attempted motion) between surfaces in contact. It always acts opposite to the direction of movement, or the direction something is trying to move.</p>
${(() => { let s = F.line(20, 170, 420, 170, "k") + F.rect(150, 110, 100, 60, "k cS", 4) + F.arrow(250, 140, 350, 140, "g thick", 11) + F.text(345, 130, "pull", "tg bold small", "end") + F.arrow(150, 165, 80, 165, "r thick", 11) + F.text(84, 158, "friction", "tr bold small", "start");
  s += F.circ(220, 220, 36, "m d") + F.line(200, 170, 205, 190, "m thin d");
  let zig = []; for (let i = 0; i <= 12; i++) zig.push([188 + i * 5.3, 214 + (i % 2 ? -5 : 4)]); s += F.poly(zig, "k mid");
  zig = []; for (let i = 0; i <= 12; i++) zig.push([188 + i * 5.3, 226 + (i % 2 ? 4 : -4)]); s += F.poly(zig, "o mid");
  s += F.text(266, 228, "rough surfaces catch on each other", "tm small", "start");
  return F.fig(460, 270, s, "Solid friction: even smooth-looking surfaces are rough on a tiny scale. The bumps catch and grind against each other.", { size: "small" }); })()}
<h3>Solid friction</h3>
<ul><li>It acts between two solid surfaces that slide (or try to slide) over each other.</li>
<li>It <b>impedes motion</b> and does work that transfers energy to the <b>thermal store</b> of the surfaces. That's why rubbing your hands warms them, brakes get hot and drill bits need cooling.</li>
<li>It isn't always bad: friction lets tyres grip the road, shoes grip the floor and brakes stop cars.</li>
<li>Static friction matches the push up to a maximum. A gentle push on a heavy box gives an equal friction force, so nothing moves. Push harder than the maximum and it slides.</li></ul>
<h3>Drag: friction in fluids</h3>
<p>Objects moving through a <b>liquid</b> (water resistance) or a <b>gas</b> (air resistance) experience <b>drag</b>, which opposes their motion.</p>
<ul><li>Drag <b>increases as speed increases</b>. This is the key fact behind terminal velocity.</li>
<li>Drag is larger for a bigger cross-sectional area and a less streamlined shape. Cars, aircraft, fish and cyclists are streamlined to reduce it, and parachutes are designed to maximise it.</li>
<li>Drag also transfers energy to thermal stores, which is why spacecraft heat shields glow on re-entry.</li></ul>
<details class="check"><summary>Why do a car's brakes get hot when it stops?</summary><div>Friction between the brake pads and discs does work, transferring the car's kinetic energy to thermal energy in the brakes.</div></details>`},

    { h: "Falling objects and terminal velocity (1.2 S)", body: P`
<h3>Without air resistance</h3>
<p>Near the Earth's surface, an object falling with no air resistance accelerates at a constant <b>9.8 m/s²</b>, whatever its mass. Its speed–time graph is a straight line with gradient 9.8 m/s². After 1 s it's falling at 9.8 m/s, after 2 s at 19.6 m/s, and so on.</p>
<h3>With air resistance</h3>
<div class="viz" data-viz="skydiver"></div>
${(() => { const pts = []; let v = 0; const m = 70, g = 10; for (let t = 0; t <= 20; t += 0.05) { const k = t < 9 ? .25 : 3.5; pts.push([t, v]); v += (g - k * v * v / m) * .05; }
  return F.plot({ w: 520, h: 300, x: [0, 20], y: [0, 60], gridStep: [2, 10], ticks: { x: [5, 10, 15], y: [10, 20, 30, 40, 50] }, xlabel: "time", ylabel: "speed (m/s)",
    curves: [{ pts, c: "o thick" }],
    marks: [[0.05, "A", "e"], [3, "B", "nw"], [7.5, "C", "n"], [9.15, "D", "e"], [15, "E", "n"]].map(([t, l, p]) => ({ x: t, y: pts[Math.round(t / 0.05)][1], c: "k", label: l, pos: p })),
    cap: "A skydiver's speed–time graph. A: accelerates at $g$. B: acceleration decreasing. C: first terminal velocity. D: parachute opens, decelerating. E: new, lower terminal velocity." }); })()}
<ol class="steps-inline">
<li><b>A, the instant of jumping:</b> speed is zero, so air resistance is zero. The only force is weight, so the acceleration is $g$ (9.8 m/s²). The graph's gradient is steepest here.</li>
<li><b>B, speeding up:</b> as speed increases, air resistance increases. The resultant force (weight − air resistance) <b>decreases</b>, so the <b>acceleration decreases</b>. The speed is still increasing, but more slowly, so the curve flattens.</li>
<li><b>C, terminal velocity:</b> air resistance has grown until it <b>equals</b> the weight. The resultant force is zero, the acceleration is zero, and the speed is constant (about 55 m/s for a spread-eagled skydiver).</li>
<li><b>D, parachute opens:</b> the much larger area means far more air resistance at the same speed. Air resistance > weight, so the resultant force is <b>upwards</b> and the skydiver <b>decelerates</b>. They are still moving <i>downwards</i>, just slowing down.</li>
<li><b>E, new terminal velocity:</b> as speed falls, air resistance falls until it equals the weight again. A new, much <b>lower</b> terminal velocity (about 5 m/s), slow enough to land safely.</li></ol>
${F.row(
  fbd([{ dir: "down", len: 80, label: "weight", c: "o" }], "A: weight only", { w: 200, h: 220, bw: 40, bh: 40 }),
  fbd([{ dir: "down", len: 80, label: "weight", c: "o" }, { dir: "up", len: 40, label: "drag", c: "b" }], "B: drag < weight", { w: 200, h: 220, bw: 40, bh: 40 }),
  fbd([{ dir: "down", len: 80, label: "weight", c: "o" }, { dir: "up", len: 80, label: "drag", c: "b" }], "C or E: drag = weight", { w: 200, h: 220, bw: 40, bh: 40 }),
  fbd([{ dir: "down", len: 60, label: "weight", c: "o" }, { dir: "up", len: 100, label: "drag", c: "b" }], "D: drag > weight", { w: 200, h: 240, bw: 40, bh: 40 })
)}
<div class="callout exam"><b class="t">Examiner wording (4 marks)</b>"Initially the only force is weight, so it accelerates (at 9.8 m/s²). As speed increases, air resistance <b>increases</b>. So the <b>resultant force decreases</b> and the <b>acceleration decreases</b>. When air resistance <b>equals</b> weight, the resultant force is zero, so it falls at <b>constant (terminal) velocity</b>."</div>
<div class="callout warn"><b class="t">Wrong ideas</b>"When the parachute opens the skydiver goes up." No: they decelerate while still moving down. "At terminal velocity there are no forces." No: there are two equal and opposite forces.</div>
<details class="check"><summary>A heavier skydiver in the same position has a higher terminal velocity. Why?</summary><div>Their weight is larger, so air resistance must grow larger before it balances the weight. Air resistance increases with speed, so they must reach a higher speed.</div></details>`},

    { h: "Circular motion (1.5.1 S)", body: P`
<p class="lead">An object moving in a circle at <b>constant speed</b> is still <b>accelerating</b>, because its <b>direction</b> is always changing. Velocity is a vector, so a change of direction is a change of velocity.</p>
${(() => { const cx = 200, cy = 160, R = 110; let s = F.circ(cx, cy, R, "m d") + F.dot(cx, cy, "k");
  [90, 210, 330].forEach(d => { const a = d * Math.PI / 180, x = cx + R * Math.cos(a), y = cy - R * Math.sin(a);
    s += F.circ(x, y, 10, "k cS") + F.arrow(x, y, x - 55 * Math.sin(a), y - 55 * Math.cos(a), "b thick", 10) + F.arrow(x, y, x - 50 * Math.cos(a), y + 50 * Math.sin(a), "r thick", 10); });
  const a0 = 30 * Math.PI / 180, x0 = cx + R * Math.cos(a0), y0 = cy - R * Math.sin(a0);
  s += F.circ(x0, y0, 10, "m d") + F.line(x0, y0, x0 - 130 * Math.sin(a0), y0 - 130 * Math.cos(a0), "g mid d") + F.text(x0 - 130 * Math.sin(a0) - 8, y0 - 130 * Math.cos(a0) + 4, "string snaps: flies off along the tangent", "tg small bold", "end");
  s += F.key(20, 300, [["b", "velocity (along the tangent)"], ["r", "resultant force (towards the centre)"]]);
  return F.fig(480, 350, s, "The velocity is always along the tangent. The force is always perpendicular to it, towards the centre. The speed stays the same but the direction keeps turning.", { size: "small" }); })()}
<ul><li>The resultant force acts <b>perpendicular to the motion</b>, towards the <b>centre</b> of the circle. Because it's perpendicular, it changes the direction but not the speed.</li>
<li>If the force disappears (the string snaps), the object moves off in a <b>straight line along the tangent</b>, as Newton's first law predicts. It does not fly outwards along the radius.</li></ul>
<table class="t"><tr><th>Example</th><th>What provides the force towards the centre</th></tr>
<tr><td>Ball whirled on a string</td><td>Tension in the string</td></tr><tr><td>Car going round a bend</td><td>Friction between tyres and road</td></tr>
<tr><td>Moon orbiting Earth, satellites, planets</td><td>Gravitational force</td></tr><tr><td>Electrons orbiting a nucleus (simple model)</td><td>Electrostatic attraction</td></tr></table>
<h3>How big must the force be?</h3>
<p>For an object to keep moving in its circle, a <b>larger</b> force is needed if:</p>
<ul><li>the <b>speed increases</b> (mass and radius constant). Take a roundabout too fast and the tyres can't provide enough friction, so you skid outwards along a tangent.</li>
<li>the <b>radius decreases</b> (mass and speed constant). A tighter turn needs more force.</li>
<li>the <b>mass increases</b> (speed and radius constant). A heavier lorry needs more friction on the same bend.</li></ul>
<div class="callout warn"><b class="t">Misconception</b>There is no outward "centrifugal force". On a roundabout you feel pushed outwards because your body tries to continue in a straight line, while the car turns inwards beneath you.</div>
<details class="check"><summary>Why can a car skid off a wet bend that it could take safely when dry?</summary><div>On a wet road the maximum friction is smaller, so it may be less than the force needed to keep the car on that circle at that speed. The car then continues more nearly in a straight line.</div></details>`},

    { h: "Moments and equilibrium (1.5.2)", body: P`
<p class="lead">A force can make an object <b>turn</b> about a pivot. The turning effect is called the <b>moment</b> of the force.</p>
$$\text{moment}=\text{force}\times\text{perpendicular distance from the pivot}\qquad(\text{N m})$$
${F.row(
  (() => { let s = F.circ(60, 150, 16, "k mS") + F.text(60, 154, "pivot", "tk small") + F.line(60, 150, 300, 150, "k thick") + F.arrow(300, 150, 300, 70, "r thick", 11) + F.text(308, 100, "F", "tr bold", "start") + F.dim(60, 180, 300, 180, "d", "b");
    return F.fig(340, 210, s, "Force at 90° to the spanner: moment $=F\\times d$, the maximum."); })(),
  (() => { let s = F.circ(60, 150, 16, "k mS") + F.line(60, 150, 60 + 240 * Math.cos(35 * Math.PI / 180), 150 - 240 * Math.sin(35 * Math.PI / 180), "k thick");
    const X = 60 + 240 * Math.cos(35 * Math.PI / 180), Y = 150 - 240 * Math.sin(35 * Math.PI / 180);
    s += F.arrow(X, Y, X, Y + 80, "r thick", 11) + F.text(X + 8, Y + 50, "F", "tr bold", "start") + F.line(X, Y + 80, X, 150, "r d thin") + F.line(60, 150, X, 150, "b mid") + F.text((60 + X) / 2, 170, "perpendicular distance", "tb small bold") + F.rightAngle(X, 150, -1, 0, 0, -1, 10, "b");
    return F.fig(340, 210, s, "Force not at 90°: use the perpendicular distance from the pivot to the force's <b>line of action</b>, which is shorter, so the moment is smaller."); })()
)}
<p>The <b>perpendicular distance</b> is measured from the pivot to the <b>line of action</b> of the force, at right angles to it. That's why:</p>
<ul><li>you push a door at the <b>handle</b> (far from the hinges) and <b>at right angles</b> to it,</li>
<li>a long spanner undoes a tight nut more easily than a short one,</li>
<li>pushing a door towards its hinges does nothing: the line of action passes through the pivot, so the distance is zero.</li></ul>
<p>Levers (crowbars, wheelbarrows, scissors, bottle openers) use a large distance so that a small force gives a large moment.</p>
<h3>The principle of moments</h3>
<div class="callout key"><b class="t">Principle of moments</b>For an object in equilibrium, the <b>sum of the clockwise moments</b> about any point equals the <b>sum of the anticlockwise moments</b> about that point.</div>
<div class="viz" data-viz="moments"></div>
${(() => { const y = 120; let s = F.poly([[240, y + 8], [222, y + 50], [258, y + 50]], "k mS", true) + F.rect(30, y - 4, 420, 12, "k bgF", 3);
  s += F.rect(70, y - 46, 40, 40, "k bS", 4) + F.text(90, y - 22, "600 N", "tb bold small") + F.arrow(90, y + 10, 90, y + 50, "b thick", 10);
  s += F.rect(370, y - 40, 40, 34, "k oS", 4) + F.text(390, y - 18, "450 N", "to bold small") + F.arrow(390, y + 10, 390, y + 50, "o thick", 10);
  s += F.dim(90, y + 70, 240, y + 70, "1.5 m", "b") + F.dim(240, y + 70, 390, y + 70, "2.0 m", "o");
  return F.fig(480, 220, s, "Anticlockwise: $600\\times1.5=900$ N m. Clockwise: $450\\times2.0=900$ N m. Equal, so the see-saw balances.", { size: "small" }); })()}
<p>With several forces on each side, <b>add</b> up the moments on each side separately. Always take moments about the <b>pivot</b> where possible: the pivot's own force has zero distance, so it has zero moment and drops out.</p>
<h3>Equilibrium (S)</h3>
<p>An object is in <b>equilibrium</b> when there is:</p>
<ol><li><b>no resultant force</b>, so it doesn't accelerate, and</li><li><b>no resultant moment</b>, so it doesn't start turning.</li></ol>
${(() => { let s = F.rect(40, 100, 400, 14, "k bgF", 3) + F.poly([[60, 114], [44, 150], [76, 150]], "k mS", true) + F.poly([[420, 114], [404, 150], [436, 150]], "k mS", true);
  s += F.arrow(60, 100, 60, 52, "g thick", 10) + F.text(68, 62, "R₁", "tg bold", "start") + F.arrow(420, 100, 420, 52, "g thick", 10) + F.text(428, 62, "R₂", "tg bold", "start");
  s += F.arrow(240, 114, 240, 170, "o thick", 10) + F.text(248, 166, "200 N (beam, at centre)", "to small bold", "start") + F.rect(130, 72, 36, 28, "k bS", 3) + F.arrow(148, 114, 148, 160, "b thick", 10) + F.text(140, 176, "600 N", "tb small bold", "end");
  s += F.dim(60, 210, 148, 210, "1.0 m", "m") + F.dim(60, 236, 420, 236, "4.0 m", "m");
  return F.fig(480, 260, s, "A 4.0 m beam on two supports. Take moments about the left support to find $R_2$, then use 'up = down' for $R_1$.", { size: "small" }); })()}
<div class="callout ex"><b class="t">Worked example: two supports</b>A uniform 4.0 m beam of weight 200 N rests on supports at its ends. A 600 N load sits 1.0 m from the left end. Find the support forces.<br>Moments about the left support: clockwise $=600(1.0)+200(2.0)=1000$ N m. Anticlockwise $=R_2(4.0)$. So $R_2=250$ N.<br>No resultant force: $R_1+R_2=600+200$, so $R_1=550$ N. (The support nearer the load takes more of the weight.)</div>
<h3>The experiment (S)</h3>
<ol class="steps-inline"><li>Balance a metre rule on a pivot (a knife edge or a nail through a hole) at its <b>centre of gravity</b>, usually the 50 cm mark, so its own weight has no moment.</li>
<li>Hang known weights at measured distances on both sides. Adjust their positions until the rule balances horizontally.</li>
<li>Calculate $\sum(\text{force}\times\text{distance})$ on each side. They are equal (within experimental error), showing there is no resultant moment.</li>
<li>Repeat with different combinations. Errors come from reading positions, string thickness and friction at the pivot.</li></ol>
<details class="check"><summary>A uniform metre rule (weight 1.2 N) is pivoted at the 30 cm mark. Where must a 2.0 N weight hang to balance it?</summary><div>The rule's weight acts at 50 cm, 20 cm right of the pivot: moment $=1.2\times20=24$ N cm clockwise. $2.0\times d=24\Rightarrow d=12$ cm to the left, at the 18 cm mark.</div></details>`},

    { h: "Centre of gravity and stability (1.5.3)", body: P`
<p class="lead">The <b>centre of gravity</b> (CoG) is the point through which the <b>whole weight</b> of an object appears to act. For a uniform, symmetric object it's at the geometric centre, on every line of symmetry.</p>
<h3>Finding it for an irregular flat shape (plumb-line method)</h3>
${(() => { const lam = [[60, 60], [210, 40], [290, 120], [240, 230], [120, 250], [40, 170]];
  let s = F.poly(lam, "k oS", true) + F.circ(70, 70, 5, "k bgF") + F.circ(282, 125, 5, "k bgF");
  s += F.line(70, 70, 200, 270, "b mid d") + F.line(282, 125, 60, 210, "g mid d") + F.text(70, 58, "hole 1", "tb small bold") + F.text(286, 112, "hole 2", "tg small bold", "start");
  const X = (() => { const [x1, y1, x2, y2, x3, y3, x4, y4] = [70, 70, 200, 270, 282, 125, 60, 210]; const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4); const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d; return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)]; })();
  s += F.dot(X[0], X[1], "r", 6) + F.text(X[0] + 10, X[1] - 8, "centre of gravity", "tr bold small", "start");
  s += F.line(360, 40, 360, 200, "k thin") + F.circ(360, 206, 7, "kF") + F.text(374, 120, "plumb line", "tk small", "start");
  return F.fig(460, 280, s, "Hang the shape from two holes. Each time the CoG settles directly below the pin, so it lies on each vertical line drawn. It's where the lines cross.", { size: "small" }); })()}
<ol class="steps-inline"><li>Make a small hole near the edge of the card (lamina). Hang it on a pin held in a clamp so it can <b>swing freely</b>.</li>
<li>Hang a <b>plumb line</b> (a string with a small weight) from the same pin.</li><li>When everything is still, mark the line of the string on the card with a pencil and ruler.</li>
<li>Repeat with a second hole, as far from the first as possible.</li>
<li>The centre of gravity is where the lines <b>cross</b>. Use a third hole as a check: its line should pass through the same point.</li></ol>
<p><b>Why it works:</b> a freely hanging object comes to rest with its CoG <b>directly below</b> the point of suspension, because only then does its weight have no moment about the pin.</p>
<h3>Stability</h3>
${F.row(tilted(18, true, "Small tilt: the weight's line of action still falls <b>inside</b> the base. Its moment turns the object back, so it settles."), tilted(32, false, "Tilt further, or raise the CoG: the line of action falls <b>outside</b> the base. The moment now turns it further over, and it topples."))}
<p>An object <b>topples</b> when the vertical line through its CoG falls <b>outside its base</b>. The weight then produces a moment about the edge that turns it over. So an object is <b>more stable</b> when it has:</p>
<ul><li>a <b>low centre of gravity</b> (heavy parts at the bottom), and</li><li>a <b>wide base</b>.</li></ul>
<p>Examples: racing cars are low and wide; Bunsen burners and desk lamps have heavy bases; double-decker buses are tilt-tested to 28° without passengers upstairs; you widen your stance on a moving train.</p>
<details class="check"><summary>Explain why a bus with passengers on the top deck is more likely to topple on a bend.</summary><div>The passengers raise the centre of gravity. The line of action of the weight then moves outside the wheelbase at a smaller angle of tilt, giving a moment that turns the bus over.</div></details>`},

    { h: "Momentum and impulse (1.6 S)", body: P`
$$p=mv\qquad(\text{kg m/s})$$
<p class="lead"><b>Momentum</b> is mass × velocity. It measures how hard it is to stop a moving object. It's a <b>vector</b>, so choose a positive direction: anything moving the opposite way has <b>negative</b> momentum.</p>
<h3>Conservation of momentum</h3>
<div class="callout key"><b class="t">Principle</b>In a collision or explosion, provided no external forces act, the <b>total momentum before = total momentum after</b>.</div>
${(() => { const cart = (x, y, w, lbl, c) => F.rect(x, y, w, 30, "k " + c + "S", 4) + F.circ(x + 12, y + 34, 6, "k bgF") + F.circ(x + w - 12, y + 34, 6, "k bgF") + F.text(x + w / 2, y + 20, lbl, "tk bold small");
  let s = F.text(20, 24, "Before", "tk bold", "start") + F.line(20, 80, 460, 80, "m") + cart(40, 40, 90, "2000 kg", "b") + F.arrow(135, 55, 195, 55, "b thick", 10) + F.text(165, 46, "3 m/s", "tb small bold") + cart(300, 40, 70, "1000 kg", "o") + F.text(335, 30, "at rest", "to small");
  s += F.text(20, 124, "After", "tk bold", "start") + F.line(20, 180, 460, 180, "m") + cart(140, 140, 90, "2000 kg", "b") + cart(230, 140, 70, "1000 kg", "o") + F.arrow(305, 155, 365, 155, "k thick", 10) + F.text(335, 146, "v = ?", "tk small bold");
  return F.fig(480, 200, s, "Before: $2000\\times3+0=6000$ kg m/s. After (stuck together): $3000v=6000$, so $v=2$ m/s.", { size: "small" }); })()}
<p><b>Explosions</b> (a gun firing, a rocket, two skaters pushing apart, a nucleus decaying) start from rest with total momentum zero. Afterwards the pieces have <b>equal and opposite</b> momenta, so the total is still zero. That's why a gun recoils: a light bullet with high velocity, and a heavy gun with low velocity backwards.</p>
<div class="callout ex"><b class="t">Worked example: explosion</b>A 60 kg skater at rest pushes a 40 kg skater, who moves off at 1.5 m/s. Find the first skater's velocity.<br>$0=60v+40(1.5)\Rightarrow v=-1.0$ m/s, i.e. 1.0 m/s in the opposite direction.</div>
<h3>Impulse and force</h3>
$$\text{impulse}=F\Delta t=\Delta(mv)\qquad\Longleftrightarrow\qquad F=\frac{\Delta p}{\Delta t}$$
<p>The second form is the deeper version of Newton's second law: the <b>resultant force equals the rate of change of momentum</b>. (With constant mass, $\dfrac{\Delta(mv)}{\Delta t}=m\dfrac{\Delta v}{\Delta t}=ma$.)</p>
<p>For a fixed change in momentum, a <b>longer time</b> means a <b>smaller force</b>. That's the physics of every impact-safety device:</p>
<ul><li><b>Crumple zones</b> crush over a longer time; <b>seat belts</b> stretch slightly; <b>airbags</b> inflate and cushion the head.</li>
<li><b>Cycle helmets</b> have foam that crushes; <b>gym mats</b> and soft playground surfaces deform; you <b>bend your knees</b> when landing from a jump.</li></ul>
<div class="callout exam"><b class="t">Examiner wording for safety features</b>"It <b>increases the time</b> taken for the passenger's momentum to change (to stop). The change in momentum is the same, so the <b>rate of change of momentum</b> is smaller, so the <b>force</b> on the passenger is smaller." All three links are needed.</div>
<h3>Rebounds: watch the signs</h3>
<p>A 0.5 kg ball hits a wall at 6 m/s and bounces back at 4 m/s. Taking towards the wall as positive: $p_1=+3$ kg m/s and $p_2=-2$ kg m/s, so $\Delta p=-5$ kg m/s (magnitude 5, <b>not 1</b>). If contact lasts 0.02 s, $F=\dfrac{5}{0.02}=250$ N.</p>
<details class="check"><summary>A 0.15 kg cricket ball at 20 m/s is hit straight back at 30 m/s. Contact lasts 0.010 s. Find the impulse and average force.</summary><div>$\Delta p=0.15\times30-0.15\times(-20)=7.5$ N s. $F=7.5/0.010=750$ N.</div></details>`}
  ],
  worked: [
    { q: P`A spring has original length 12.0 cm. With a 4.0 N load it is 15.2 cm long. Find the spring constant, and the length with a 6.0 N load (within the limit of proportionality).`,
      steps: [P`Extension $=15.2-12.0=3.2$ cm.`, P`$k=\dfrac{F}{x}=\dfrac{4.0}{3.2}=1.25$ N/cm.`, P`For 6.0 N: $x=\dfrac{6.0}{1.25}=4.8$ cm, so the length is $12.0+4.8=16.8$ cm.`]},
    { q: P`A 0.5 kg ball hits a wall at 6 m/s and rebounds at 4 m/s. Contact lasts 0.02 s. Find the average force.`,
      steps: [P`Take towards the wall as positive: $p_1=0.5\times6=3$, $p_2=0.5\times(-4)=-2$ kg m/s.`, P`$\Delta p=-2-3=-5$ kg m/s (magnitude 5).`, P`$F=\dfrac{\Delta p}{\Delta t}=\dfrac{5}{0.02}=250$ N.`]},
    { q: P`A 2000 kg truck moving at 3 m/s hits a stationary 1000 kg car and they stick together. Find their common velocity.`,
      steps: [P`Momentum before $=2000\times3+0=6000$ kg m/s.`, P`After: $(2000+1000)v=6000\Rightarrow v=2$ m/s.`]},
    { q: P`A uniform 4.0 m plank of weight 200 N rests on a pivot at its centre. A 300 N weight is 1.2 m left of the pivot. Where must a 450 N weight go to balance it?`,
      steps: [P`The plank is uniform and pivoted at its centre, so its weight has no moment.`, P`Anticlockwise moment $=300\times1.2=360$ N m.`, P`Clockwise: $450\times d=360\Rightarrow d=0.80$ m to the right of the pivot.`, P`The upward force from the pivot $=200+300+450=950$ N (no resultant force).`]}
  ],
  formulas: [
    ["Newton's 2nd law", P`$F=ma$`], ["Weight", P`$W=mg$`], ["Spring constant", P`$k=\dfrac Fx$`],
    ["Moment", P`$M=F\times d_\perp$`], ["Momentum", P`$p=mv$`],
    ["Impulse", P`$F\Delta t=\Delta(mv)$`], ["Force (momentum)", P`$F=\dfrac{\Delta p}{\Delta t}$`], ["Acceleration", P`$a=\dfrac{\Delta v}{\Delta t}$`]
  ],
  cards: [
    ["Three things a force can change", "An object's speed, direction of motion, and shape/size."],
    ["State Newton's first law.", "With zero resultant force, an object stays at rest or moves at constant velocity."],
    ["What is terminal velocity?", "Constant speed reached when drag equals weight, so resultant force and acceleration are zero."],
    ["Mass vs weight", P`Mass is the quantity of matter (kg). Weight is the gravitational force on a mass, $W=mg$ (N).`],
    ["Define gravitational field strength", P`Force per unit mass, $g=W/m$ (≈ 9.8 N/kg on Earth).`],
    ["Why do heavy and light objects fall at the same rate (no air)?", P`More weight but proportionally more mass, so $a=W/m=g$ for both.`],
    ["Define spring constant", P`Force per unit extension, $k=F/x$.`],
    ["What is the limit of proportionality?", "The point beyond which extension is no longer proportional to load (the graph stops being straight)."],
    ["Why plot extension, not length?", "Extension is proportional to load, so the graph is straight through the origin."],
    ["Define the moment of a force", "Force × perpendicular distance from the pivot to the line of action of the force."],
    ["Principle of moments", "In equilibrium, total clockwise moment = total anticlockwise moment about any point."],
    ["Two conditions for equilibrium", "No resultant force and no resultant moment."],
    ["Define centre of gravity", "The point through which the whole weight of an object appears to act."],
    ["How to find the CoG of a lamina", "Hang it from two holes with a plumb line, mark the vertical lines, and the CoG is where they cross."],
    ["When does an object topple?", "When the line of action of its weight falls outside its base."],
    ["How to make an object more stable", "Lower its centre of gravity and widen its base."],
    ["Direction of the force for circular motion", "Perpendicular to the velocity, towards the centre of the circle."],
    ["Why is an object in uniform circular motion accelerating?", "Its direction (and so its velocity) is constantly changing."],
    ["What happens if the string breaks in circular motion?", "The object moves off in a straight line along the tangent."],
    ["Solid friction does what to energy?", "Transfers it to the thermal store (heating)."],
    ["Why do crumple zones save lives?", P`They increase the collision time, so for the same $\Delta p$ the force $F=\Delta p/\Delta t$ is smaller.`],
    ["Units of momentum", "kg m/s (or N s)."],
    ["State the conservation of momentum", "With no external forces, total momentum before = total momentum after."],
    ["Resultant force in terms of momentum", "The rate of change of momentum, F = Δp/Δt."],
    ["Acceleration of free fall near Earth", "About 9.8 m/s², constant if there is no air resistance."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`A car moves at constant velocity. The resultant force on it is`, opts: ["Forwards", "Backwards", "Zero", "Equal to its weight"], ans: 2, why: P`Constant velocity means no acceleration, so the resultant force is zero (Newton's 1st law).` },
    { type: "mcq", marks: 2, q: P`A 5 kg box is pushed with 30 N against 10 N of friction. Its acceleration is`, opts: ["6 m/s²", "4 m/s²", "8 m/s²", "2 m/s²"], ans: 1, why: P`Resultant $=30-10=20$ N; $a=20/5=4$ m/s².` },
    { type: "mcq", marks: 1, q: P`When a skydiver opens their parachute they`, opts: ["Start moving upward", "Decelerate while still falling", "Stop instantly", "Accelerate faster"], ans: 1, why: P`Drag exceeds weight, so the resultant is upward, which means deceleration. The direction of travel stays downward.` },
    { type: "mcq", marks: 1, q: P`An astronaut's mass is 70 kg on Earth. On the Moon ($g=1.6$ N/kg) their mass is`, opts: ["11.7 kg", "70 kg", "112 kg", "686 kg"], ans: 1, why: P`Mass doesn't depend on location. Their <i>weight</i> changes to $70\times1.6=112$ N.` },
    { type: "mcq", marks: 2, q: P`A spring extends by 4 cm with a 2 N load. Within its limit of proportionality, what load gives an extension of 10 cm?`, opts: ["4 N", "5 N", "8 N", "20 N"], ans: 1, why: P`$k=2/4=0.5$ N/cm, so $F=0.5\times10=5$ N.` },
    { type: "mcq", marks: 1, q: P`A force of 20 N acts at 0.3 m from a pivot, at right angles. Its moment is`, opts: ["6 N m", "66.7 N m", "0.015 N m", "20.3 N m"], ans: 0, why: P`$20\times0.3=6$ N m.` },
    { type: "mcq", marks: 1, q: P`A car goes round a bend at constant speed. Which statement is correct?`, opts: ["Its velocity is constant", "The resultant force on it is zero", "There is a resultant force towards the centre of the bend", "There is an outward force on it"], ans: 2, why: P`Its direction changes, so it accelerates towards the centre. Friction on the tyres provides that force.` },
    { type: "mcq", marks: 2, q: P`A 2 kg trolley at 3 m/s collides with a stationary 1 kg trolley and they stick together. Their speed afterwards is`, opts: ["1 m/s", "1.5 m/s", "2 m/s", "3 m/s"], ans: 2, why: P`$2\times3=(2+1)v\Rightarrow v=2$ m/s.` },
    { type: "struct", marks: 4, q: P`Explain, in terms of forces, why a falling object reaches terminal velocity.`,
      ms: P`<b>B1</b> initially only weight acts (air resistance is zero) so it accelerates.<br><b>B1</b> as speed increases, air resistance increases.<br><b>B1</b> the resultant force (and so the acceleration) decreases.<br><b>B1</b> when air resistance = weight, the resultant force is zero, so the velocity is constant.` },
    { type: "struct", marks: 5, q: P`Describe how you would plot a load–extension graph for a spring, and how you would use it to find the spring constant.`,
      ms: P`<b>B1</b> clamp the spring beside a vertical metre rule; measure the original length (eye level, to avoid parallax)<br><b>B1</b> add known masses in equal steps; convert to load using $W=mg$<br><b>B1</b> measure the new length each time; extension = new length − original length<br><b>B1</b> plot load against extension<br><b>B1</b> $k$ = gradient of the straight-line section (load ÷ extension)` },
    { type: "struct", marks: 3, q: P`A 2.0 kg trolley experiences a resultant force of 5.0 N for 4.0 s, starting from rest. Calculate (a) its acceleration, (b) its final speed.`,
      ms: P`(a) <b>M1</b> $a=F/m$ <b>A1</b> $2.5$ m/s²<br>(b) <b>B1</b> $v=at=10$ m/s` },
    { type: "struct", marks: 4, q: P`A uniform metre rule of weight 1.2 N is pivoted at the 30 cm mark. Where must a 2.0 N weight be hung to make the rule balance horizontally?`,
      ms: P`<b>B1</b> the rule's weight acts at its centre (50 cm), 20 cm right of the pivot<br><b>M1</b> clockwise moment $=1.2\times20=24$ N cm<br><b>M1</b> $2.0\times d=24\Rightarrow d=12$ cm<br><b>A1</b> hang it at the 18 cm mark (12 cm left of the pivot)` },
    { type: "struct", marks: 4, q: P`Describe an experiment to find the centre of gravity of an irregularly shaped piece of card.`,
      ms: P`<b>B1</b> make a hole near the edge and hang the card from a pin so it swings freely<br><b>B1</b> hang a plumb line from the pin and mark the vertical line on the card<br><b>B1</b> repeat from a different hole<br><b>B1</b> the centre of gravity is where the lines intersect (repeat with a third hole to check)` },
    { type: "struct", marks: 3, q: P`Explain why a bus with passengers on the top deck is more likely to topple when it tilts than an empty bus.`,
      ms: P`<b>B1</b> passengers on top raise the centre of gravity<br><b>B1</b> so the line of action of the weight falls outside the base at a smaller angle of tilt<br><b>B1</b> the weight then produces a moment that turns the bus over` },
    { type: "struct", marks: 4, q: P`Explain how an airbag reduces the force on a driver in a collision.`,
      ms: P`<b>B1</b> the driver's change in momentum is the same either way<br><b>B1</b> the airbag increases the time taken for the driver to stop<br><b>B1</b> so the rate of change of momentum is smaller<br><b>B1</b> force = rate of change of momentum, so the force is smaller` },
    { type: "struct", marks: 4, q: P`A 0.15 kg ball travelling at 20 m/s is hit back along its path at 30 m/s. The bat is in contact for 0.010 s. Calculate (a) the impulse, (b) the average force on the ball.`,
      ms: P`(a) <b>M1</b> $\Delta p=0.15\times30-0.15\times(-20)$ <b>A1</b> $7.5$ N s<br>(b) <b>M1</b> $F=\dfrac{7.5}{0.010}$ <b>A1</b> $750$ N` },
    { type: "struct", marks: 3, q: P`A satellite orbits the Earth at constant speed. State the direction of the resultant force on it, and explain why its velocity is changing even though its speed is constant.`,
      ms: P`<b>B1</b> towards the centre of the Earth (perpendicular to its motion)<br><b>B1</b> velocity is a vector: it has a direction as well as a size<br><b>B1</b> the direction of motion is constantly changing, so the velocity changes` },
    { type: "struct", marks: 3, q: P`A 60 kg skater at rest pushes a 40 kg skater, who moves off at 1.5 m/s. Find the velocity of the 60 kg skater.`,
      ms: P`<b>B1</b> total momentum before = 0<br><b>M1</b> $60v+40(1.5)=0$<br><b>A1</b> $v=-1.0$ m/s, i.e. 1.0 m/s in the opposite direction` }
  ]
});
}
