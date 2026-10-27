window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
//@@HELPERS-START
// ---- diagram helpers for this topic ----
const flask = (x, y, c = "g") => F.path(`M${x - 14},${y} L${x - 14},${y + 30} L${x - 46},${y + 96} Q${x - 50},${y + 106} ${x - 38},${y + 106} L${x + 38},${y + 106} Q${x + 50},${y + 106} ${x + 46},${y + 96} L${x + 14},${y + 30} L${x + 14},${y}`, "k") + F.path(`M${x - 34},${y + 70} L${x - 46},${y + 96} Q${x - 50},${y + 106} ${x - 38},${y + 106} L${x + 38},${y + 106} Q${x + 50},${y + 106} ${x + 46},${y + 96} L${x + 34},${y + 70} Z`, c + "S nostroke");
const scatterIn = (n, seed, x0, y0, w, h) => { let s = ""; for (let i = 0; i < n; i++) { const r = (k) => Math.abs((Math.sin((i + seed) * 12.9898 + k * 78.233) * 43758.5453) % 1); s += F.circ(x0 + 8 + r(1) * (w - 16), y0 + 8 + r(2) * (h - 16), 6, (i % 2 ? "o" : "b") + "S " + (i % 2 ? "o" : "b")); } return s; };
const box = (dots, cap, w = 190) => { let s = F.rect(10, 10, w - 20, 140, "k bgF", 8) + dots; return F.fig(w, 160, s, cap, { size: "tiny" }); };
const scatter = (n, seed, c1 = "o", c2 = "b", W = 170, H = 140) => { let s = ""; for (let i = 0; i < n; i++) { const r = (k) => Math.abs((Math.sin((i + seed) * 12.9898 + k * 78.233) * 43758.5453) % 1); s += F.circ(20 + r(1) * (W - 20), 20 + r(2) * (H - 20), 6, (i % 2 ? c1 : c2) + "S " + (i % 2 ? c1 : c2)); } return s; };
const path = (H) => (x) => { const t = Math.min(1, Math.max(0, (x - 2.5) / 5)), base = 6 - 3 * t * t * (3 - 2 * t); return base + H * Math.exp(-((x - 5) ** 2) / 1.2); };
const profile = (o) => F.plot(Object.assign({ w: 460, h: 300, x: [0, 10], y: [0, 10], grid: false, xlabel: "progress of reaction", ylabel: "energy", m: { l: 26, r: 20, t: 16, b: 26 } }, o));
//@@HELPERS-END

/* ============================================================
   RATES OF REACTION  (0620: 6.2, with Ea from 5.1)
   ============================================================ */
TOPICS.push({
  id: "rates", subject: "chemistry", unit: 6, title: "Rates of reaction",
  blurb: "Measuring rate, reading rate graphs, collision theory, concentration, pressure, surface area, temperature, catalysts and enzymes.",
  level: "Core → Supplement", demo: "rates",
  syllabus: [
    ["6.2", "Describe practical methods for investigating the rate of a reaction, including change in mass and formation of a gas", 1],
    ["6.2 S", "Evaluate practical methods for investigating the rate of a reaction", 2],
    ["6.2", "Interpret data, including graphs, from rate-of-reaction experiments", 3],
    ["6.2 S", "Describe collision theory: particles per unit volume, collision frequency, kinetic energy, activation energy", 4],
    ["6.2", "Effect of concentration and pressure on rate (S: explained using collision theory)", 5],
    ["6.2", "Effect of surface area of solids on rate (S: explained using collision theory)", 6],
    ["6.2", "Effect of temperature on rate (S: explained using collision theory)", 7],
    ["6.2", "A catalyst increases the rate and is unchanged at the end; enzymes are biological catalysts", 8],
    ["6.2 S", "A catalyst decreases the activation energy; reaction pathway diagrams with and without a catalyst", 8]
  ],
  sections: [
    { h: "What 'rate of reaction' means", body: C`
<p class="lead">The <b>rate of a reaction</b> is how quickly reactants are used up or products are formed.</p>
$$\text{rate}=\frac{\text{change in amount of reactant or product}}{\text{time taken}}$$
<p>Rates vary enormously: an explosion is over in milliseconds, a precipitate forms in seconds, magnesium fizzes away in a minute, iron rusts over months, and rocks weather over centuries.</p>
<p>Units depend on what you measure: <b>cm³/s</b> (gas volume), <b>g/s</b> (mass), or <b>mol/dm³/s</b> (concentration).</p>
<div class="callout warn"><b class="t">Rate is not yield</b>Rate is <i>how fast</i>; the amount of product is <i>how much</i>. A catalyst or a higher temperature makes the same amount of product, just faster. The amount of product depends only on the amount of the limiting reactant.</div>
<p>To make a reaction faster you can: increase the <b>concentration</b> (or <b>pressure</b> for gases), increase the <b>surface area</b> of a solid, raise the <b>temperature</b>, or add a <b>catalyst</b>. The rest of this lesson explains how to measure rate, how to read rate graphs, and <i>why</i> each of these works.</p>`},

    { h: "Measuring the rate: practical methods (6.2)", body: C`
<p class="lead">To measure a rate you track something that changes as the reaction proceeds, at regular time intervals. The main methods are below.</p>
${  (() => { let s = flask(90, 50) + F.rect(70, 34, 40, 16, "k mS", 3) + F.line(90, 34, 90, 20, "k") + F.line(90, 20, 200, 20, "k") + F.rect(200, 6, 180, 28, "k bgF", 4) + F.rect(200, 6, 60, 28, "bS nostroke") + F.line(260, 2, 260, 38, "k thick") + F.line(260, 20, 300, 20, "k thick");
    for (let i = 1; i < 9; i++) s += F.line(200 + i * 20, 6, 200 + i * 20, 14, "k thin");
    s += F.text(290, 54, "gas syringe: read the volume every 10 s", "tk small bold") + F.text(90, 140, "reaction mixture", "tk small") + F.arrow(270, 70, 320, 70, "b mid", 8) + F.text(330, 74, "plunger pushed out", "tb small", "start");
    return F.fig(480, 165, s, "<b>Volume of gas</b>: collect it in a gas syringe and record the volume at regular intervals.", { size: "small" }); })()}
${F.row(
  (() => { let s = F.rect(40, 130, 160, 30, "k mS", 4) + F.rect(80, 138, 80, 16, "k bgF", 2) + F.text(120, 151, "148.32 g", "tk small bold") + flask(120, 20) + F.rect(108, 10, 24, 14, "k bgF", 6) + F.text(140, 16, "cotton wool", "tk small", "start");
    s += F.arrow(120, 6, 120, -14, "m mid", 6);
    return F.fig(300, 175, s, "<b>Loss of mass</b>: the flask sits on a balance. As gas escapes, the mass falls. The cotton wool lets gas out but stops acid spray."); })()
)}
${F.row(
  (() => { let s = F.rect(30, 30, 50, 120, "k bgF") + F.rect(31, 31, 48, 70, "gS nostroke") + F.text(55, 22, "inverted measuring cylinder", "tk small", "start") + F.rect(10, 120, 180, 50, "bS b") + flask(150, 40) + F.path("M150,40 L150,26 L120,26 L120,140 L70,140 L70,130", "k mid");
    return F.fig(220, 180, s, "<b>Collecting over water</b>: the gas displaces water from an upturned cylinder or burette. Only for gases not very soluble in water."); })(),
  (() => { let s = F.path("M60,30 L60,110 Q60,120 70,120 L170,120 Q180,120 180,110 L180,30", "k") + F.rect(61, 50, 118, 69, "mS nostroke") + F.rect(40, 130, 160, 30, "k bgF") + F.line(100, 135, 140, 155, "k thick") + F.line(140, 135, 100, 155, "k thick");
    s += F.circ(120, 12, 10, "k bgF") + F.line(120, 22, 120, 34, "k d") + F.text(140, 16, "look down", "tk small", "start");
    return F.fig(240, 175, s, "<b>Disappearing cross</b>: sodium thiosulfate + acid forms a cloudy sulfur precipitate. Time how long until the cross can't be seen. Rate ∝ 1/time."); })()
)}
<h3>Which method for which reaction?</h3>
<table class="t"><tr><th>Method</th><th>Suits</th><th>Example</th></tr>
<tr><td>Gas syringe</td><td>Any reaction producing a gas</td><td>Mg + HCl → H₂; CaCO₃ + HCl → CO₂</td></tr>
<tr><td>Mass loss on a balance</td><td>Gas produced that is fairly dense</td><td>CaCO₃ + HCl → CO₂ (good); poor for H₂</td></tr>
<tr><td>Collecting over water</td><td>Gas not very soluble in water</td><td>H₂, O₂ (not CO₂, NH₃, HCl)</td></tr>
<tr><td>Disappearing cross / turbidity</td><td>A precipitate forms</td><td>Na₂S₂O₃ + HCl → S(s)</td></tr>
<tr><td>Colour change</td><td>A coloured reactant or product</td><td>Using a colorimeter, or timing a colour change</td></tr></table>
<h3>Planning a fair test</h3>
<ol class="steps-inline"><li>Change <b>only one</b> independent variable (e.g. temperature).</li>
<li>Keep the controlled variables the same: volume and concentration of acid, mass of solid, particle size, temperature (unless being tested), and the same apparatus.</li>
<li>Start the stopwatch at the instant the reactants are mixed, and record values at regular intervals until the reaction stops.</li>
<li>Repeat each experiment and calculate a mean. Discard anomalous results.</li>
<li>Safety: eye protection; care with acids; no flames near hydrogen.</li></ol>
<details class="check"><summary>Suggest two variables to control when investigating the effect of acid concentration on the rate of Mg + HCl.</summary><div>Any two of: volume of acid, mass (or length) of magnesium, surface area of magnesium (same ribbon), temperature.</div></details>`},

    { h: "Evaluating methods (6.2 S)", body: C`
<p class="lead">"Evaluate" questions want you to judge how <b>accurate</b> and <b>reliable</b> a method is, and say how to improve it.</p>
<table class="t"><tr><th>Problem</th><th>Why it matters</th><th>Improvement</th></tr>
<tr><td>Gas escapes before the bung is fitted</td><td>Volume measured is too low, especially at the start</td><td>Put the solid in a small tube inside the flask (or a divided flask); seal first, then tip to mix</td></tr>
<tr><td>CO₂ collected over water</td><td>CO₂ is slightly soluble, so some dissolves and isn't measured</td><td>Use a gas syringe</td></tr>
<tr><td>Measuring H₂ by mass loss</td><td>H₂ is so light that the mass change is tiny, so the balance can't resolve it</td><td>Use a gas syringe instead</td></tr>
<tr><td>Disappearing cross</td><td>The end point is <b>subjective</b>: people judge "can't see it" differently</td><td>Same person every time, same cross; or use a light sensor and data logger</td></tr>
<tr><td>Reaction time measured by hand</td><td>Reaction time of the person starting and stopping the timer</td><td>Longer reactions (so the error is smaller in proportion); data logging</td></tr>
<tr><td>Temperature not controlled</td><td>Exothermic reactions warm up and speed up</td><td>Use a water bath; measure the temperature at the start and end</td></tr>
<tr><td>Gas syringe sticks</td><td>Readings jump rather than rise smoothly</td><td>Check the plunger moves freely before starting</td></tr></table>
<div class="callout tip"><b class="t">Precision vs accuracy</b>Repeating and averaging reduces <b>random</b> errors (scatter). It doesn't fix <b>systematic</b> errors (gas escaping, a balance not zeroed), which push every reading the same way. Name the type of error you're fixing.</div>`},

    { h: "Interpreting rate graphs (6.2)", body: C`
<div class="viz" data-viz="rateCurves"></div>
${F.plot({ w: 480, h: 310, x: [0, 80], y: [0, 70], gridStep: [10, 10], ticks: { x: [10, 20, 30, 40, 50, 60, 70], y: [10, 20, 30, 40, 50, 60] }, xlabel: "time / s", ylabel: "volume of gas / cm³",
  curves: [{ f: t => 60 * (1 - Math.exp(-t / 14)), c: "c thick" }, { f: t => 60 * Math.exp(-10 / 14) / 14 * (t - 10) + 60 * (1 - Math.exp(-10 / 14)), dom: [0, 26], c: "r mid" }],
  marks: [{ x: 10, y: 60 * (1 - Math.exp(-10 / 14)), c: "r", label: "tangent at 10 s", pos: "nw" }, { x: 60, y: 59.6, c: "k", label: "reaction finished", pos: "s" }],
  extra: (X, Y) => F.line(X(0), Y(60), X(80), Y(60), "m d thin") + F.text(X(80), Y(60) - 6, "final volume set by limiting reactant", "tm small", "end"),
  cap: "Volume of gas against time. The gradient (steepness) is the rate: steepest at the start, decreasing, then zero when the reaction stops." })}
<ul><li>The <b>gradient</b> of the curve is the <b>rate</b>. It is <b>steepest at the start</b>, because the reactants are most concentrated, so collisions are most frequent.</li>
<li>The gradient <b>decreases</b> as reactants are used up: lower concentration means less frequent collisions.</li>
<li>When the line goes <b>horizontal</b> (gradient zero) the reaction has <b>stopped</b>: the limiting reactant is used up.</li>
<li>The <b>final height</b> depends only on the <b>amount of the limiting reactant</b>.</li></ul>
<h3>Calculating rates</h3>
<p><b>Mean rate</b> over a time interval $=\dfrac{\text{change in volume}}{\text{time}}$. From the graph: in the first 20 s, $\dfrac{45}{20}\approx2.3$ cm³/s; from 20 s to 40 s, $\dfrac{56-45}{20}\approx0.5$ cm³/s. The rate is falling.</p>
<p><b>Rate at an instant</b> = <b>gradient of the tangent</b> at that time. Draw a straight line that just touches the curve at that point, make a large triangle on it, and calculate rise ÷ run (with units).</p>
<h3>Comparing curves</h3>
${F.plot({ w: 480, h: 290, x: [0, 80], y: [0, 70], gridStep: [10, 10], ticks: { x: [20, 40, 60], y: [20, 40, 60] }, xlabel: "time", ylabel: "volume of gas",
  curves: [{ f: t => 60 * (1 - Math.exp(-t / 14)), c: "k thick", label: "original", lpos: [72, 60], ldx: -60, ldy: -8 }, { f: t => 60 * (1 - Math.exp(-t / 5)), c: "g thick", label: "faster (same amount)", lpos: [24, 59.5], ldx: 4, ldy: -8 }, { f: t => 30 * (1 - Math.exp(-t / 14)), c: "o thick d", label: "half the limiting reactant", lpos: [70, 29.9], ldx: -10, ldy: -8, la: "end" }, { f: t => 60 * (1 - Math.exp(-t / 30)), c: "b thick", label: "slower (same amount)", lpos: [70, 54], ldx: -10, ldy: 16, la: "end" }],
  cap: "Faster (hotter, more concentrated acid in excess, powder, catalyst): steeper start, levels off sooner at the <b>same</b> height. Less limiting reactant: <b>lower</b> final height." })}
<div class="callout tip"><b class="t">Two questions for every new curve</b>(1) Does the change affect the <b>rate</b>? Then make the start steeper or shallower. (2) Does it change the amount of the <b>limiting reactant</b>? Then change the final height. If not, keep the same final height.</div>
<p>On a <b>mass-loss</b> graph, the mass <b>decreases</b> and levels off, so the curve is upside-down, but the same rules apply.</p>
<details class="check"><summary>Magnesium (limiting) reacts with excess acid. The acid concentration is doubled. Describe the new curve.</summary><div>Steeper initial gradient (more frequent collisions), levels off sooner, at the same final volume (the same amount of magnesium).</div></details>`},

    { h: "Collision theory (6.2 S)", body: C`
<p class="lead">For a reaction to happen, particles must <b>collide</b>, and the collision must have <b>enough energy</b>. Most collisions don't: the particles just bounce apart unchanged.</p>
${F.row(
  (() => { let s = F.circ(70, 70, 18, "o oS") + F.circ(150, 70, 18, "b bS") + F.arrow(95, 70, 115, 70, "k mid", 7) + F.arrow(125, 70, 105, 70, "k mid", 7) + F.text(110, 120, "low energy: bounce apart", "tk small bold") + F.arrow(60, 100, 30, 110, "m mid", 7) + F.arrow(160, 100, 190, 110, "m mid", 7); return F.fig(230, 140, s, "Unsuccessful collision: energy below $E_a$."); })(),
  (() => { let s = F.circ(60, 70, 18, "o oS") + F.circ(160, 70, 18, "b bS") + F.arrow(84, 70, 124, 70, "r thick", 9) + F.arrow(136, 70, 96, 70, "r thick", 9); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; s += F.line(110 + 10 * Math.cos(a), 70 + 10 * Math.sin(a), 110 + 20 * Math.cos(a), 70 + 20 * Math.sin(a), "r mid"); } s += F.text(110, 120, "energy ≥ Ea: reaction!", "tr small bold"); return F.fig(230, 140, s, "Successful collision: energy at least $E_a$."); })()
)}
<p>The <b>activation energy</b>, $E_a$, is the <b>minimum energy that colliding particles must have in order to react</b>. It's the energy needed to start breaking the bonds in the reactants.</p>
${profile({ curves: [{ f: path(4.7), dom: [0.5, 9.5], c: "k thick" }],
  extra: (X, Y) => F.text(X(1.5), Y(6) - 8, "reactants", "tk small bold") + F.text(X(8.8), Y(3) - 8, "products", "tk small bold") + F.dim(X(2.2), Y(6), X(2.2), Y(9.2), "Eₐ", "r", -18) + F.line(X(2), Y(9.2), X(5), Y(9.2), "m d thin") + F.dim(X(9.8), Y(6), X(9.8), Y(3), "ΔH", "b", 18) + F.line(X(2), Y(6), X(9.9), Y(6), "m d thin"),
  cap: "Reaction pathway diagram for an exothermic reaction. $E_a$ is the energy 'hill' from the reactants up to the peak." })}
<p>So the <b>rate depends on the frequency of successful collisions</b> (successful collisions per second), which depends on:</p>
<ol><li>the <b>number of particles per unit volume</b> (concentration of a solution, or pressure of a gas);</li>
<li>the <b>collision frequency</b>: how often particles collide (more particles in the space, or faster-moving particles, means more collisions per second);</li>
<li>the <b>kinetic energy</b> of the particles: what proportion of collisions have energy ≥ $E_a$.</li></ol>
<div class="callout key"><b class="t">A* phrasing: always use "frequency"</b>Write "<b>more frequent</b> collisions" or "more collisions <b>per second</b>" (or per unit time). Never just "more collisions". A slow reaction that runs for longer also has more collisions in total, so examiners don't accept it.</div>
<details class="check"><summary>Define activation energy.</summary><div>The minimum energy that colliding particles must have in order to react.</div></details>`},

    { h: "Concentration and pressure (6.2)", body: C`
${F.row(box(scatter(10, 1), "Low concentration: few particles per unit volume."), box(scatter(28, 7), "High concentration: more particles in the same volume, so more frequent collisions."))}
<p><b>Increasing the concentration</b> of a solution (more moles of reactant per dm³) puts more reactant particles in the same volume. The particles are closer together, so they collide <b>more frequently</b>. More collisions per second means more <b>successful</b> collisions per second, so the rate increases.</p>
${F.row(
  (() => { let s = F.rect(20, 30, 180, 110, "k bgF") + F.rect(170, 26, 12, 118, "k mS") + F.arrow(240, 85, 190, 85, "k thick", 10) + scatterIn(10, 3, 22, 32, 146, 106); return F.fig(260, 160, s, "Gas at low pressure."); })(),
  (() => { let s = F.rect(20, 30, 100, 110, "k bgF") + F.rect(110, 26, 12, 118, "k mS") + F.arrow(190, 85, 130, 85, "r thick", 10) + scatterIn(10, 3, 22, 32, 86, 106); return F.fig(220, 160, s, "Compressed: the same particles in a smaller volume, so more frequent collisions."); })()
)}
<p><b>Increasing the pressure</b> of a gas squeezes the same number of particles into a smaller volume (or adds more particles to the same volume). It has exactly the same effect as increasing concentration: more particles per unit volume, more frequent collisions, faster rate.</p>
<p>Note what <b>doesn't</b> change: the particles' energies. The <b>proportion</b> of collisions that are successful is the same; there are simply more collisions per second.</p>
<div class="callout exam"><b class="t">Examiner wording (3 marks)</b>"Higher concentration means <b>more particles per unit volume</b>, so the particles collide <b>more frequently</b>, so there are more <b>successful collisions per second</b>."</div>`},

    { h: "Surface area (6.2)", body: C`
${(() => { let s = F.rect(30, 50, 100, 100, "k oS") + F.text(80, 172, "1 cube, 2 cm side", "tk small") + F.text(80, 190, "surface area = 24 cm²", "tk small bold");
  s += F.arrow(150, 100, 200, 100, "k mid", 9) + F.text(175, 90, "cut", "tk small");
  [[220, 50], [272, 50], [220, 102], [272, 102]].forEach(([x, y]) => s += F.rect(x, y, 46, 46, "k oS")); s += F.text(270, 172, "8 cubes, 1 cm side", "tk small") + F.text(270, 190, "surface area = 48 cm²", "tk small bold");
  s += F.arrow(340, 100, 390, 100, "k mid", 9); for (let i = 0; i < 40; i++) { const r = (k) => Math.abs((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1); s += F.rect(400 + r(1) * 100, 50 + r(2) * 100, 6, 6, "oF"); } s += F.text(450, 172, "powder", "tk small") + F.text(450, 190, "huge surface area", "tk small bold");
  return F.fig(530, 205, s, "Same mass, but cutting it up exposes far more surface. Halving the side length doubles the total surface area.", { size: "wide" }); })()}
<p class="lead">A solid can only react at its <b>surface</b>, where its particles are exposed to the other reactant. Particles inside a lump can't collide with anything until the outer layers have reacted away.</p>
<p>Breaking a solid into smaller pieces (chips → granules → powder) gives a larger <b>surface area to volume ratio</b>. More particles are exposed, so collisions are <b>more frequent</b> and the rate is higher. The total mass, and so the final amount of product, stays the same.</p>
<ul><li>Powdered calcium carbonate reacts with acid much faster than marble chips.</li>
<li>Kindling catches fire before logs; potatoes cut small cook faster.</li>
<li><b>Dust explosions</b>: fine combustible powders (flour in mills, coal dust in mines, custard powder, sawdust) have enormous surface areas. A spark can make them burn almost instantly, releasing heat and gas so fast that it explodes. Mills control dust and ban naked flames for this reason.</li></ul>
<details class="check"><summary>Explain why powdered magnesium reacts faster with acid than magnesium ribbon of the same mass.</summary><div>Powder has a larger surface area, so more Mg particles are exposed to the acid, giving more frequent collisions and more successful collisions per second.</div></details>`},

    { h: "Temperature (6.2)", body: C`
<p class="lead">Raising the temperature increases the rate for <b>two</b> reasons, and full marks need both.</p>
<ol><li>Particles gain <b>kinetic energy</b> and <b>move faster</b>, so they collide <b>more frequently</b>.</li>
<li>More importantly, a <b>greater proportion of the collisions have energy ≥ the activation energy</b>, so a larger fraction of collisions are successful.</li></ol>
<div class="viz" data-viz="energyDist"></div>
${F.plot({ w: 480, h: 300, x: [0, 10], y: [0, 1.1], grid: false, xlabel: "kinetic energy", ylabel: "number of particles", m: { l: 26, r: 20, t: 16, b: 26 },
  curves: [{ f: E => Math.E * E / 1.6 * Math.exp(-E / 1.6) / 1, c: "b thick", label: "lower T", lpos: [1.6, 1], ldx: 6, ldy: -4 }, { f: E => Math.E * E / 2.6 * Math.exp(-E / 2.6) * 1.6 / 2.6, c: "r thick", label: "higher T", lpos: [4.4, 0.55], ldx: 8, ldy: -8 }],
  extra: (X, Y) => { let s = F.line(X(6.5), Y(0), X(6.5), Y(1), "k mid") + F.text(X(6.5) + 6, Y(.95), "Eₐ", "tk bold", "start"); const pts = [[X(6.5), Y(0)]]; for (let E = 6.5; E <= 10; E += .1) pts.push([X(E), Y(Math.E * E / 2.6 * Math.exp(-E / 2.6) * 1.6 / 2.6)]); pts.push([X(10), Y(0)]); return s + F.poly(pts, "r rS nostroke", true); },
  cap: "Energy distribution of particles. At a higher temperature the curve flattens and shifts right; the shaded area (particles with energy ≥ $E_a$) gets much bigger." })}
<p>The second effect dominates. A 10 °C rise makes the particles only a few percent faster, but it can roughly <b>double</b> the number of particles with enough energy to react, so the rate can roughly double.</p>
<p>Conversely, <b>cooling slows reactions</b>: that's why fridges keep food fresh (slower decay and microbe growth).</p>
<div class="callout exam"><b class="t">Examiner wording (3 marks)</b>"Particles have more kinetic energy / move faster, so <b>collide more frequently</b>; and a <b>greater proportion of collisions</b> have energy <b>≥ the activation energy</b>, so there are more successful collisions per second."</div>
<p>Try the particle simulator at the end of this lesson: raise the temperature and watch the number of successful collisions (flashes) climb.</p>`},

    { h: "Catalysts and enzymes (6.2)", body: C`
<p class="lead">A <b>catalyst</b> is a substance that <b>increases the rate</b> of a reaction and is <b>chemically unchanged</b> (not used up) at the end of the reaction.</p>
<ul><li>Only small amounts are needed, because it's regenerated and used again and again.</li><li>It does <b>not</b> appear in the overall equation (you may write it over the arrow).</li>
<li>It does <b>not</b> change the amount of product. You get the same yield, sooner.</li><li>Catalysts are specific: each works for particular reactions.</li></ul>
<h3>How a catalyst works (S)</h3>
${profile({ curves: [{ f: path(4.7), dom: [0.5, 9.5], c: "k thick", label: "uncatalysed", lpos: [5.3, 9.1], ldx: 10, ldy: -4 }, { f: path(2.9), dom: [0.5, 9.5], c: "g thick", label: "catalysed", lpos: [5.8, 6.6], ldx: 14, ldy: 4 }],
  extra: (X, Y) => F.text(X(1.5), Y(6) - 8, "reactants", "tk small bold") + F.text(X(8.8), Y(3) - 8, "products", "tk small bold") + F.dim(X(3.4), Y(6), X(3.4), Y(9.2), "Eₐ", "k", -18) + F.dim(X(4.4), Y(6), X(4.4), Y(7.4), "Eₐ (cat)", "g", 30) + F.line(X(3.2), Y(9.2), X(5), Y(9.2), "m d thin") + F.line(X(4.2), Y(7.4), X(5), Y(7.4), "m d thin"),
  cap: "A catalyst provides an alternative pathway with a <b>lower activation energy</b>. The reactant and product energies, and so ΔH, are unchanged." })}
<p>A catalyst provides an <b>alternative reaction pathway with a lower activation energy</b>. At the same temperature, a <b>greater proportion of collisions</b> now have energy ≥ the new, lower $E_a$, so more collisions per second are successful. Notice what it does <b>not</b> do: it doesn't give particles more energy, and it doesn't change the energy of the reactants or products.</p>
<p><b>Drawing the diagram:</b> keep the same reactant and product levels, and draw a second, <b>lower hump</b> between them. Label both $E_a$ values from the reactant level up to each peak.</p>
<table class="t"><tr><th>Industrial process</th><th>Catalyst</th></tr><tr><td>Haber process (ammonia)</td><td>Iron</td></tr><tr><td>Contact process (sulfuric acid)</td><td>Vanadium(V) oxide, V₂O₅</td></tr><tr><td>Decomposition of hydrogen peroxide</td><td>Manganese(IV) oxide, MnO₂</td></tr><tr><td>Car exhausts (catalytic converter)</td><td>Platinum, rhodium, palladium</td></tr></table>
<p>Catalysts save energy and money: reactions can run at lower temperatures, which reduces fuel use and carbon dioxide emissions.</p>
<h3>Enzymes</h3>
${F.plot({ w: 460, h: 260, x: [0, 70], y: [0, 10], grid: false, ticks: { x: [10, 20, 30, 40, 50, 60] }, xlabel: "temperature / °C", ylabel: "rate", m: { l: 26, r: 20, t: 16, b: 30 },
  curves: [{ f: T => T < 40 ? 9 * Math.exp((T - 40) / 14) : Math.max(0, 9 - (T - 40) ** 2 / 14), dom: [0, 52], c: "g thick" }],
  marks: [{ x: 40, y: 9, c: "r", label: "optimum ≈ 37–40 °C", pos: "ne" }],
  extra: (X, Y) => F.text(X(2), Y(8), "rising: more frequent,", "tk small", "start") + F.text(X(2), Y(7.2), "more energetic collisions", "tk small", "start") + F.text(X(55), Y(4.6), "enzyme denatured", "tr small bold", "start"),
  cap: "Rate of an enzyme-catalysed reaction against temperature: it rises to an optimum, then falls sharply as the enzyme is denatured." })}
<p><b>Enzymes</b> are proteins that act as <b>biological catalysts</b>. They speed up the reactions in living things (digestion, respiration) and are used in industry (biological washing powders, brewing, food production).</p>
<ul><li>Each enzyme has an <b>optimum temperature</b> (about 37 °C for human enzymes) and an <b>optimum pH</b>.</li>
<li>Below the optimum, raising the temperature speeds the reaction up as normal.</li>
<li>Above the optimum, the enzyme is <b>denatured</b>: its shape, including the <b>active site</b> where the reactant fits, is permanently changed. It stops working and the rate falls rapidly. Extremes of pH also denature enzymes.</li></ul>
<div class="callout warn"><b class="t">Wrong ideas that lose marks</b>"A catalyst gives the particles more energy." "A catalyst increases the yield." "The catalyst is used up." "Enzymes are killed." (They're not alive, so they're <b>denatured</b>.)</div>
<details class="check"><summary>Explain, using activation energy, how a catalyst increases the rate.</summary><div>It provides an alternative pathway with a lower activation energy, so a greater proportion of collisions have energy ≥ Ea, giving more successful collisions per second.</div></details>`}
  ],
  worked: [
    { q: C`Marble chips react with excess HCl. Sketch how the gas-volume curve changes if the same mass of powdered marble is used.`,
      steps: [C`Powder has a larger surface area, so collisions are more frequent and the rate is higher.`, C`The curve is steeper initially and levels off sooner.`, C`Same mass of marble (the limiting reactant), so it reaches the <b>same final volume</b>.`]},
    { q: C`In an experiment, 24 cm³ of gas is collected in the first 10 s and 40 cm³ after 20 s. Calculate the mean rate for (a) the first 10 s, (b) 10–20 s, and explain the difference.`,
      steps: [C`(a) $\dfrac{24}{10}=2.4$ cm³/s.`, C`(b) $\dfrac{40-24}{10}=1.6$ cm³/s.`, C`The rate falls because reactants are used up: lower concentration means less frequent collisions.`]}
  ],
  formulas: [["Mean rate", C`$\dfrac{\text{change in amount}}{\text{time}}$`], ["Rate at an instant", "gradient of the tangent"], ["Disappearing cross", C`$\text{rate}\propto\dfrac1{\text{time}}$`]],
  cards: [
    ["Define activation energy", "The minimum energy that colliding particles must have to react."],
    ["Two conditions for particles to react", "They must collide, with energy ≥ activation energy."],
    ["How does a catalyst work?", "It provides an alternative pathway with a lower activation energy and is unchanged at the end."],
    ["Does a catalyst change the amount of product?", "No: the same amount, made faster."],
    ["Why does temperature increase rate? (2 reasons)", "Particles move faster, so collisions are more frequent, and a greater proportion of collisions have energy ≥ Ea."],
    ["Why does concentration increase rate?", "More particles per unit volume, so more frequent collisions."],
    ["Why does pressure increase the rate of gas reactions?", "More gas particles per unit volume, so more frequent collisions."],
    ["Why does powder react faster than lumps?", "Larger surface area exposes more particles, so collisions are more frequent."],
    ["Why can flour dust explode?", "Its enormous surface area makes combustion extremely fast."],
    ["What decides the final volume of gas?", "The amount of the limiting reactant."],
    ["How do you find the rate from a graph?", "The gradient (tangent at a point, or change ÷ time for the mean)."],
    ["Why does a rate curve get less steep?", "Reactants are used up, so concentration falls and collisions become less frequent."],
    ["Two ways to measure the rate of CaCO₃ + HCl", "Volume of CO₂ in a gas syringe, or mass loss on a balance."],
    ["Why use a cotton-wool plug in mass-loss experiments?", "It lets gas escape but stops acid spray escaping."],
    ["Why is collecting CO₂ over water less accurate?", "CO₂ is slightly soluble in water, so some dissolves."],
    ["Disappearing-cross method measures…", "Time for a precipitate (sulfur) to hide the cross; rate ∝ 1/time."],
    ["What is an enzyme?", "A protein that acts as a biological catalyst."],
    ["What happens to an enzyme above its optimum temperature?", "It is denatured: its shape changes and it stops working."],
    ["Examiner phrase to avoid", "\"More collisions\": say \"more frequent collisions\" or \"more collisions per second\"."],
    ["Catalyst on a pathway diagram", "Same reactant and product levels, lower peak (smaller Ea)."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`A catalyst increases the rate because it`, opts: ["Gives particles more energy", "Lowers the activation energy", "Increases concentration", "Raises the temperature"], ans: 1, why: C`An alternative route with lower $E_a$.` },
    { type: "mcq", marks: 2, q: C`Halving the mass of magnesium (the limiting reactant) in excess acid makes the final hydrogen volume`, opts: ["Double", "The same", "Half", "Zero"], ans: 2, why: C`The final amount of product depends on the limiting reactant.` },
    { type: "mcq", marks: 1, q: C`Which change does <b>not</b> increase the rate of CaCO₃ + HCl?`, opts: ["Using powder", "Heating the acid", "Using more concentrated acid", "Using larger marble chips"], ans: 3, why: C`Larger chips have a smaller surface area, so the rate decreases.` },
    { type: "mcq", marks: 1, q: C`Suitable units for a rate measured by collecting gas are`, opts: ["cm³", "s", "cm³/s", "g"], ans: 2, why: C`Volume ÷ time.` },
    { type: "mcq", marks: 1, q: C`60 cm³ of gas is collected in the first 30 s. The mean rate is`, opts: ["0.5 cm³/s", "2 cm³/s", "30 cm³/s", "1800 cm³/s"], ans: 1, why: C`$60/30=2$ cm³/s.` },
    { type: "mcq", marks: 1, q: C`Increasing the pressure of a gaseous reaction increases the rate because`, opts: ["Particles have more energy", "The activation energy falls", "There are more particles per unit volume", "The particles get bigger"], ans: 2, why: C`More particles per unit volume means more frequent collisions.` },
    { type: "mcq", marks: 1, q: C`Which statement about a catalyst is correct?`, opts: ["It is used up in the reaction", "It increases the yield", "It is chemically unchanged at the end", "It raises the activation energy"], ans: 2, why: C`By definition it is not used up.` },
    { type: "mcq", marks: 1, q: C`An enzyme-catalysed reaction slows sharply above 45 °C because the enzyme`, opts: ["Runs out", "Is denatured", "Becomes a reactant", "Has too little energy"], ans: 1, why: C`High temperature changes the enzyme's shape (active site).` },
    { type: "struct", marks: 3, q: C`Explain, using collision theory, why increasing the temperature increases the rate.`,
      ms: C`<b>B1</b> particles have more kinetic energy / move faster<br><b>B1</b> more frequent collisions (more collisions per second)<br><b>B1</b> a greater proportion of collisions have energy ≥ activation energy` },
    { type: "struct", marks: 3, q: C`Explain, using collision theory, why magnesium reacts faster with 2.0 mol/dm³ HCl than with 0.5 mol/dm³ HCl.`,
      ms: C`<b>B1</b> more acid particles per unit volume<br><b>B1</b> more frequent collisions<br><b>B1</b> so more successful collisions per second` },
    { type: "struct", marks: 5, q: C`Describe how you would investigate the rate of reaction between marble chips and hydrochloric acid using a balance.`,
      ms: C`<b>B1</b> put the acid in a conical flask on a balance; add the marble chips and start the timer<br><b>B1</b> cotton-wool plug in the neck (lets CO₂ out, keeps acid spray in)<br><b>B1</b> record the mass at regular intervals (e.g. every 30 s) until constant<br><b>B1</b> plot mass lost against time<br><b>B1</b> control: same volume and concentration of acid, same mass and size of chips, same temperature` },
    { type: "struct", marks: 4, q: C`Gas volumes (cm³) at 0, 10, 20, 30, 40, 50, 60, 70 s: 0, 24, 40, 50, 56, 59, 60, 60. (a) Calculate the mean rate in the first 20 s. (b) When did the reaction stop? (c) Explain why the rate decreases.`,
      ms: C`(a) <b>M1</b> $40/20$ <b>A1</b> 2.0 cm³/s<br>(b) <b>B1</b> at about 60 s (volume stops changing)<br>(c) <b>B1</b> reactants are used up, so concentration falls and collisions become less frequent` },
    { type: "struct", marks: 4, q: C`Zinc reacts with excess sulfuric acid. On the same axes as the original curve, describe the curves for (a) the same experiment at a higher temperature, (b) half the mass of zinc.`,
      ms: C`(a) <b>B1</b> steeper initial gradient <b>B1</b> levels off sooner at the same final volume<br>(b) <b>B1</b> less steep (or similar) start <b>B1</b> levels off at half the final volume` },
    { type: "struct", marks: 4, q: C`Describe how a catalyst increases the rate of a reaction. Describe how a reaction pathway diagram shows this.`,
      ms: C`<b>B1</b> provides an alternative pathway (route)<br><b>B1</b> with a lower activation energy<br><b>B1</b> so a greater proportion of collisions are successful<br><b>B1</b> diagram: the catalysed curve has a lower peak between the same reactant and product energy levels` },
    { type: "struct", marks: 3, q: C`Explain why powdered calcium carbonate reacts faster with acid than the same mass in lumps.`,
      ms: C`<b>B1</b> powder has a larger surface area<br><b>B1</b> more particles exposed to the acid<br><b>B1</b> more frequent collisions` },
    { type: "struct", marks: 2, q: C`Suggest why a gas syringe is a better way to collect carbon dioxide than an upturned measuring cylinder of water.`,
      ms: C`<b>B1</b> CO₂ is (slightly) soluble in water<br><b>B1</b> so some would dissolve and not be measured, making the volume too low` },
    { type: "struct", marks: 3, q: C`In the reaction between sodium thiosulfate and acid, the time for a cross to disappear is measured. Explain how this measures the rate, and give one weakness of the method.`,
      ms: C`<b>B1</b> a precipitate of sulfur forms, making the solution cloudy<br><b>B1</b> the time for the cross to be hidden is longer for a slower reaction; rate ∝ 1/time<br><b>B1</b> the end point is subjective (judged by eye); different people may judge differently` },
    { type: "struct", marks: 3, q: C`Explain why fine flour dust in a mill can explode, while a bag of flour burns only slowly.`,
      ms: C`<b>B1</b> fine dust particles have a very large surface area<br><b>B1</b> many particles exposed to oxygen, so extremely frequent collisions<br><b>B1</b> combustion is so fast that heat and gas are released almost instantly (explosion)` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: C`State two ways to increase the rate of reaction between marble chips and hydrochloric acid.`, ms: C`<b>B1</b> use smaller chips / powder (larger surface area), or increase the temperature<br><b>B1</b> increase the concentration of acid` },
    { d: 1, type: "mcq", marks: 1, q: C`A catalyst`, opts: ["is used up in the reaction", "increases the rate and is unchanged at the end", "increases the yield", "slows the reaction"], ans: 1, why: C`Definition.` },
    { d: 1, type: "struct", marks: 2, q: C`Name two pieces of apparatus to follow the rate of a reaction that gives off a gas.`, ms: C`<b>B1</b> gas syringe (and stopwatch)<br><b>B1</b> or balance to measure mass loss` },
    { d: 1, type: "struct", marks: 1, q: C`State why the reaction slows down as it proceeds.`, ms: C`<b>B1</b> the reactants are used up / concentration decreases` },
    { d: 1, type: "mcq", marks: 1, q: C`Which change increases the rate of reaction?`, opts: ["using larger lumps", "cooling the mixture", "using a catalyst", "diluting the acid"], ans: 2, why: C`Catalyst.` },
    { d: 2, type: "struct", marks: 3, q: C`Explain, in terms of particles, why increasing concentration increases the rate of reaction.`, ms: C`<b>B1</b> more particles per unit volume<br><b>B1</b> more frequent collisions<br><b>B1</b> more successful collisions per second` },
    { d: 2, type: "struct", marks: 3, q: C`On a graph of volume of gas against time, describe how the curve shows (a) the rate is fastest at the start, (b) the reaction has finished.`, ms: C`<b>B1</b> the curve is steepest at the start<br><b>B1</b> gradient decreases with time<br><b>B1</b> the curve becomes horizontal / levels off` },
    { d: 2, type: "struct", marks: 2, q: C`Explain why flour dust in a mill can explode.`, ms: C`<b>B1</b> very large surface area<br><b>B1</b> very fast reaction / combustion with oxygen` },
    { d: 2, type: "struct", marks: 3, q: C`Describe how to use the "disappearing cross" method to investigate the effect of temperature on the reaction between sodium thiosulfate and hydrochloric acid.`, ms: C`<b>B1</b> place flask on a paper cross; add acid to thiosulfate at a measured temperature<br><b>B1</b> time how long until the cross disappears (sulfur precipitate)<br><b>B1</b> repeat at different temperatures with same volumes and concentrations` },
    { d: 2, type: "mcq", marks: 1, q: C`Doubling the volume of acid (same concentration) with excess marble will`, opts: ["double the initial rate", "double the total volume of gas", "halve the time", "have no effect"], ans: 1, why: C`More acid particles in total; same concentration.` },
    { d: 3, type: "struct", marks: 4, q: C`S: Explain, in terms of collision theory and activation energy, why increasing temperature increases the rate of reaction.`, ms: C`<b>B1</b> particles have more kinetic energy / move faster<br><b>B1</b> more frequent collisions<br><b>B1</b> a greater proportion of collisions have energy ≥ activation energy<br><b>B1</b> so more successful collisions per second` },
    { d: 3, type: "struct", marks: 3, q: C`S: Explain how a catalyst increases the rate of reaction. Sketch an energy profile diagram to illustrate.`, ms: C`<b>B1</b> provides an alternative pathway<br><b>B1</b> with lower activation energy<br><b>B1</b> diagram: lower hump drawn for catalysed reaction, same reactant and product levels` },
    { d: 3, type: "struct", marks: 4, q: C`60 cm³ of gas is collected in the first 20 s and 90 cm³ in total after 60 s, after which no more gas forms. (a) Calculate the mean rate in the first 20 s. (b) Calculate the mean rate over the whole reaction. (c) Explain the difference.`, ms: C`<b>A1</b> 3.0 cm³/s<br><b>A1</b> 1.5 cm³/s<br><b>B1</b> concentration of reactants falls as they are used up<br><b>B1</b> fewer collisions per second later in the reaction` },
    { d: 3, type: "struct", marks: 4, q: C`A student repeats an experiment with the same mass of magnesium ribbon but half the concentration of excess acid. Sketch and explain how the new graph of hydrogen volume against time compares with the original.`, ms: C`<b>B1</b> less steep initial gradient<br><b>B1</b> same final volume<br><b>B1</b> because the same amount of magnesium (limiting) reacts<br><b>B1</b> lower concentration: fewer collisions per second` }
  ]
});
}
