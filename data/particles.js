window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
const rnd = (i, k) => Math.abs(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1;
const solid = (x, y, n = 5, r = 9, c = "b") => { let s = ""; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += F.circ(x + i * (2 * r + 1), y + j * (2 * r + 1), r, c + "S " + c); return s; };
const liquid = (x, y, w, h, r = 9, c = "g") => { let s = "", k = 0; for (let row = 0; row < 4; row++) { const n = 6 - (row % 2); for (let i = 0; i < n; i++) { k++; if (row > 0 && rnd(k, 1) < .13) continue; s += F.circ(x + 4 + r + i * (2 * r + 1.5) + (row % 2) * r + (rnd(k, 2) - .5) * 3, y + h - r - 2 - row * (2 * r - 1) + (rnd(k, 3) - .5) * 2, r, c + "S " + c); } } return s; };
const gas = (x, y, w, h, n = 7, r = 9, c = "o", arrows = true) => { let s = ""; const cells = Array.from({ length: 12 }, (_, i) => i).sort((a, b) => rnd(a, 7) - rnd(b, 7));
  for (let i = 0; i < n; i++) { const cell = cells[i], cx = x + ((cell % 4) + .5 + (rnd(i, 4) - .5) * .5) * w / 4, cy = y + (Math.floor(cell / 4) + .5 + (rnd(i, 5) - .5) * .5) * h / 3, a = rnd(i, 6) * 6.283;
    s += F.circ(cx, cy, r, c + "S " + c) + (arrows ? F.arrow(cx + r * Math.cos(a), cy + r * Math.sin(a), cx + (r + 16) * Math.cos(a), cy + (r + 16) * Math.sin(a), "m thin", 6) : ""); } return s; };
const box = (x, y, w, h) => F.rect(x, y, w, h, "m");
//@@HELPERS-END

/* ============================================================
   KINETIC PARTICLE MODEL  (0625: 2.1)
   ============================================================ */
TOPICS.push({
  id: "particles", subject: "physics", unit: 2, title: "Kinetic particle model of matter",
  blurb: "States of matter, the particle model, temperature and absolute zero, Brownian motion, gas pressure and the gas laws.",
  level: "Core → Supplement", demo: "gas",
  syllabus: [
    ["2.1.1", "Know the distinguishing properties of solids, liquids and gases", 0],
    ["2.1.1", "Know the terms for changes of state: melting, boiling, evaporating, freezing, condensing", 2],
    ["2.1.2", "Describe the particle structure of solids, liquids and gases: arrangement, separation and motion; draw particle diagrams", 1],
    ["2.1.2 S", "Know that the forces and distances between particles and their motion affect the properties of solids, liquids and gases", 3],
    ["2.1.2", "Relate particle motion to temperature, including absolute zero (−273 °C) where particles have the least kinetic energy", 4],
    ["2.1.2", "Describe gas pressure in terms of forces from particles colliding with surfaces (force per unit area)", 6],
    ["2.1.2", "Describe Brownian motion as the random movement of microscopic particles caused by collisions with fast-moving molecules", 5],
    ["2.1.2 S", "Know that microscopic particles are moved by collisions with light, fast-moving molecules; distinguish atoms/molecules from microscopic particles", 5],
    ["2.1.3", "Describe qualitatively how the pressure of a fixed mass of gas changes with temperature at constant volume", 7],
    ["2.1.3", "Describe qualitatively how the pressure of a fixed mass of gas changes with volume at constant temperature", 8],
    ["2.1.3", "Convert between kelvin and degrees Celsius: T (K) = θ (°C) + 273", 4],
    ["2.1.3 S", "Recall and use pV = constant for a fixed mass of gas at constant temperature, including the graph", 8]
  ],
  sections: [
    { h: "Solids, liquids and gases (2.1.1)", body: P`
<p class="lead">Everything around you is a solid, a liquid or a gas. Each state has properties you can observe without seeing a single particle.</p>
<table class="t"><tr><th>Property</th><th>Solid</th><th>Liquid</th><th>Gas</th></tr>
<tr><td>Shape</td><td>Fixed</td><td>Takes the shape of the container</td><td>Fills the whole container</td></tr>
<tr><td>Volume</td><td>Fixed</td><td>Fixed</td><td>Fills the container (not fixed)</td></tr>
<tr><td>Can it flow?</td><td>No</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Can it be compressed?</td><td>Almost not at all</td><td>Almost not at all</td><td>Easily</td></tr>
<tr><td>Density</td><td>High</td><td>High (usually a little lower than the solid)</td><td>Very low (about 1000× less)</td></tr></table>
${F.row(
  F.fig(170, 150, box(20, 20, 130, 110) + F.rect(50, 60, 70, 70, "b bS b", 4), "Solid: keeps its own shape.", { size: "tiny" }),
  F.fig(170, 150, F.path("M30,20 L30,120 Q30,130 40,130 L130,130 Q140,130 140,120 L140,20", "k") + F.rect(31, 80, 108, 49, "gS nostroke") + F.line(31, 80, 139, 80, "g"), "Liquid: takes the container's shape, keeps its volume.", { size: "tiny" }),
  F.fig(170, 150, box(20, 20, 130, 110) + F.rect(21, 21, 128, 108, "oS nostroke"), "Gas: spreads to fill all the space.", { size: "tiny" })
)}
<div class="callout why"><b class="t">The big idea</b>All of these properties come from just three things about the particles: how they are <b>arranged</b>, how far <b>apart</b> they are, and how they <b>move</b>. That is the kinetic particle model.</div>
<details class="check"><summary>Why can you squash a syringe full of air but not one full of water?</summary><div>Gas particles are far apart with lots of empty space between them, so they can be pushed closer. Liquid particles are already touching.</div></details>`},

    { h: "The particle model (2.1.2)", body: P`
<p class="lead">Matter is made of tiny particles (atoms, molecules or ions) that are always moving. The <b>kinetic</b> particle model says their motion and spacing explain everything in the table above.</p>
<div class="viz" data-viz="particleStates"></div>
${F.row(
  F.fig(180, 170, box(20, 20, 140, 120) + solid(40, 40, 5, 10.5, "b"), "<b>Solid</b>: regular pattern (lattice), touching, vibrate about fixed positions.", { size: "tiny" }),
  F.fig(180, 170, box(20, 20, 140, 120) + liquid(24, 20, 140, 120, 10.5, "g"), "<b>Liquid</b>: close together but irregular, slide past each other.", { size: "tiny" }),
  F.fig(180, 170, box(20, 20, 140, 120) + gas(20, 20, 140, 120, 6, 10, "o"), "<b>Gas</b>: far apart, random, move quickly in straight lines.", { size: "tiny" })
)}
<table class="t"><tr><th></th><th>Arrangement</th><th>Separation</th><th>Motion</th></tr>
<tr><td>Solid</td><td>Regular (fixed pattern)</td><td>Very close, touching</td><td>Vibrate about fixed positions</td></tr>
<tr><td>Liquid</td><td>Irregular (random)</td><td>Close, mostly touching</td><td>Move around, sliding past each other</td></tr>
<tr><td>Gas</td><td>Irregular (random)</td><td>Far apart (about 10× the particle size)</td><td>Fast, random, in straight lines between collisions</td></tr></table>
<div class="callout exam"><b class="t">Drawing particle diagrams</b>Draw <b>equal-sized</b> circles. Solid: neat rows, all touching. Liquid: mostly touching but irregular, with a few gaps, filling the bottom of the container. Gas: a few circles, widely and randomly spaced. Markers check that liquid particles are not drawn far apart.</div>
<details class="check"><summary>Use the particle model to explain why a liquid flows but a solid does not.</summary><div>In a liquid the particles are not held in fixed positions; they can slide past each other. In a solid each particle can only vibrate about a fixed position.</div></details>`},

    { h: "Changes of state (2.1.1)", body: P`
<p class="lead">Heating or cooling a substance can change its state. Learn the five names exactly.</p>
${(() => { let s = ""; const bx = [[30, "SOLID", "b"], [230, "LIQUID", "g"], [430, "GAS", "o"]];
  bx.forEach(([x, n, c]) => { s += F.rect(x, 70, 120, 56, c + "S " + c, 12) + F.text(x + 60, 104, n, "t" + c + " bold"); });
  s += F.arrow(152, 86, 228, 86, "r mid", 9) + F.text(190, 76, "melting", "tr small bold") + F.arrow(228, 112, 152, 112, "b mid", 9) + F.text(190, 132, "freezing", "tb small bold");
  s += F.arrow(352, 86, 428, 86, "r mid", 9) + F.text(390, 50, "boiling or", "tr small bold") + F.text(390, 66, "evaporating", "tr small bold") + F.arrow(428, 112, 352, 112, "b mid", 9) + F.text(390, 132, "condensing", "tb small bold");
  s += F.text(290, 30, "energy in (heating) →", "tr small") + F.text(290, 170, "← energy out (cooling)", "tb small");
  return F.fig(580, 185, s, "Red arrows need energy to be supplied; blue arrows release energy to the surroundings.", { size: "wide" }); })()}
<ul><li><b>Melting</b>: solid → liquid at the melting point. Particles gain enough energy to break free of their fixed positions.</li>
<li><b>Boiling</b>: liquid → gas throughout the liquid, at the boiling point (bubbles form inside).</li>
<li><b>Evaporating</b>: liquid → gas from the <b>surface only</b>, at any temperature below the boiling point.</li>
<li><b>Condensing</b>: gas → liquid when cooled. <b>Freezing</b> (solidifying): liquid → solid.</li></ul>
<p>While a substance is changing state its <b>temperature stays constant</b>, even though energy is still going in (or out). The energy is used to break (or is released by forming) the forces between particles, not to speed them up. You will meet the details, and evaporation's cooling effect, in <i>Thermal properties</i>.</p>
<div class="callout warn"><b class="t">Mass is conserved</b>When ice melts, the number of particles doesn't change, so the mass stays the same. Only the arrangement and motion of the particles change.</div>
<details class="check"><summary>What is the difference between boiling and evaporation?</summary><div>Boiling happens at a fixed temperature (the boiling point) throughout the liquid; evaporation happens at any temperature, only from the surface.</div></details>`},

    { h: "Forces and distances between particles (2.1.2 S)", body: P`
<p class="lead">Particles attract each other when close, and repel strongly if pushed even closer. How strong those forces are, compared with how fast the particles move, decides the state.</p>
${F.plot({ w: 470, h: 280, x: [0.8, 4], y: [-0.7, 2], grid: false, ticks: { x: [] , y: [] }, xlabel: "separation", ylabel: "force",
  curves: [{ f: x => 3 / Math.pow(x, 9) - 2.2 / Math.pow(x, 5), dom: [0.92, 4], c: "c thick" }],
  extra: (X, Y) => F.text(X(1.15), Y(1.5), "repel: too close", "tr small bold", "start") + F.text(X(1.45), Y(-.38), "attract", "tb small bold", "start") + F.line(X(1.08), Y(-.7), X(1.08), Y(2), "m d thin") + F.text(X(1.12), Y(-.62), "normal spacing in solids/liquids", "tm small", "start") + F.text(X(3.2), Y(.3), "far apart (gas): force ≈ 0", "tm small"),
  cap: "Forces between two particles. At their normal spacing in a solid or liquid they are held by attraction; in a gas they are so far apart the forces are negligible." })}
<table class="t"><tr><th>State</th><th>Forces between particles</th><th>Kinetic energy of particles</th><th>Result</th></tr>
<tr><td>Solid</td><td>Strong: hold particles in fixed positions</td><td>Low: can only vibrate</td><td>Fixed shape, hard to compress</td></tr>
<tr><td>Liquid</td><td>Still strong enough to keep particles touching</td><td>Enough to slide past each other</td><td>Flows, fixed volume</td></tr>
<tr><td>Gas</td><td>Negligible (particles far apart)</td><td>High: overcome attraction completely</td><td>Fills container, compressible</td></tr></table>
<p>Strong repulsion at very short range is why solids and liquids are almost <b>incompressible</b>: pushing touching particles closer meets huge repulsive forces. In metals, the particles include free electrons as well as ions; in ionic solids, the particles are ions. The same ideas apply.</p>
<details class="check"><summary>Explain, in terms of forces and energy, why heating a solid eventually melts it.</summary><div>Heating increases the kinetic energy of the particles (larger vibrations). Eventually they have enough energy to overcome some of the attractive forces holding them in fixed positions, so they can slide past each other: the solid becomes a liquid.</div></details>`},

    { h: "Temperature, absolute zero and the kelvin scale (2.1.2, 2.1.3)", body: P`
<p class="lead">Temperature measures how fast the particles move: the higher the temperature, the greater their <b>average kinetic energy</b>.</p>
<p>Cool something down and its particles slow down. There is a limit: at <b>absolute zero</b>, <b>−273 °C</b>, the particles have the <b>least possible kinetic energy</b>. Nothing can be colder.</p>
${(() => { let s = F.line(60, 30, 60, 220, "k mid") + F.line(260, 30, 260, 220, "k mid");
  [[373, "100 °C", "water boils"], [273, "0 °C", "water freezes"], [0, "−273 °C", "absolute zero"]].forEach(([K, C, n]) => { const y = 220 - K / 373 * 180; s += F.line(54, y, 266, y, "m d thin") + F.text(48, y + 4, C, "tk small bold", "end") + F.text(272, y + 4, K + " K", "tc small bold", "start") + F.text(160, y - 5, n, "tm small"); });
  s += F.text(60, 18, "Celsius", "tk small bold") + F.text(260, 18, "kelvin", "tc small bold") + F.text(420, 120, "T (K) = θ (°C) + 273", "tc bold");
  return F.fig(540, 235, s, "Same size of degree, different zero. A change of 1 °C equals a change of 1 K.", { size: "wide" }); })()}
$$T\ (\text{K})=\theta\ (^\circ\text{C})+273\qquad \theta\ (^\circ\text{C})=T\ (\text{K})-273$$
<ul><li>25 °C = 298 K. 100 K = −173 °C. 0 K = −273 °C.</li><li>Kelvin temperatures are written without a degree sign: "300 K", not "300 °K".</li><li>A kelvin temperature can never be negative.</li></ul>
<div class="callout why"><b class="t">Why kelvin matters</b>Gas pressure is proportional to the kelvin temperature (at constant volume). Double the kelvin temperature and the particles' average kinetic energy doubles. That is not true of Celsius: going from 10 °C to 20 °C does not double anything.</div>
<details class="check"><summary>Convert (a) 57 °C to K, (b) 77 K to °C.</summary><div>(a) 330 K; (b) −196 °C (the boiling point of liquid nitrogen).</div></details>`},

    { h: "Brownian motion (2.1.2)", body: P`
<p class="lead">In 1827 Robert Brown saw pollen grains in water jiggling about randomly under a microscope. In a smoke cell you can see the same thing: specks of smoke dancing in air. This is <b>Brownian motion</b>, and it is evidence that molecules exist and are moving.</p>
<div class="viz" data-viz="brownian"></div>
${(() => { let s = F.rect(150, 40, 120, 60, "m mS", 6) + F.circ(210, 70, 14, "k bgF") + F.text(210, 120, "smoke cell", "tk small bold");
  s += F.path("M60,70 L130,70", "o thick") + F.arrow(60, 70, 140, 70, "o mid", 8) + F.text(60, 60, "light", "to small bold") + F.rect(195, 0, 30, 26, "k bgF", 4) + F.text(240, 16, "microscope", "tk small", "start");
  s += F.text(400, 60, "you see bright specks of smoke", "tk small", "middle") + F.text(400, 78, "moving in random, jerky paths", "tk small");
  return F.fig(520, 140, s, "Smoke-cell experiment: light is shone in from the side and the smoke particles are viewed from above.", { size: "small" }); })()}
<h3>The explanation</h3>
<ol class="steps-inline"><li>Air is full of <b>molecules</b>: far too small to see, moving very fast in random directions.</li>
<li>They constantly hit each smoke particle from all sides.</li>
<li>At any instant more hit one side than the other, so there is an <b>unbalanced</b> force, and the smoke particle moves a little. Next instant the imbalance is in a different direction.</li>
<li>The result is a random, zigzag path.</li></ol>
<div class="callout exam"><b class="t">Precise wording (S)</b>The smoke particles are <b>microscopic particles</b>, much bigger and heavier than air <b>molecules</b>. They are moved by collisions with <b>light, fast-moving molecules</b>. Never say "the smoke particles are molecules" or "the atoms are seen moving": the molecules themselves are invisible.</div>
<p>Hotter air → faster molecules → harder, more frequent hits → more vigorous Brownian motion. Smaller smoke particles also jiggle more, as each collision has a bigger effect on them.</p>
<details class="check"><summary>Why do the smoke particles move randomly rather than in one direction?</summary><div>The air molecules move randomly and hit the smoke particle unevenly from different directions at different moments, so the resultant force keeps changing direction.</div></details>`},

    { h: "Gas pressure from particle collisions (2.1.2)", body: P`
<p class="lead">Gas particles are always hitting the walls of their container. Each collision exerts a tiny <b>force</b> on the wall. Billions of collisions every second, spread over the wall's <b>area</b>, produce a steady <b>pressure</b> ($p=F/A$).</p>
${(() => { let s = F.rect(40, 30, 260, 170, "k mid") + gas(40, 30, 260, 170, 10, 9, "o", false);
  s += F.circ(270, 110, 9, "o oS o") + F.arrow(230, 90, 262, 106, "o mid", 8) + F.arrow(278, 112, 240, 132, "o mid", 8) + F.arrow(300, 111, 330, 111, "r thick", 10) + F.text(336, 105, "force on the wall", "tr small bold", "start") + F.text(336, 121, "from each collision", "tr small", "start");
  s += F.text(170, 222, "particle bounces off: its momentum changes, so a force acts", "tm small");
  return F.fig(500, 235, s, "Pressure = total force of all the collisions ÷ area of the wall.", { size: "small" }); })()}
<p>Gas pressure goes up if the particles hit the walls <b>more often</b> or <b>harder</b> (faster). That explains both gas laws in the next two parts.</p>
<div class="callout why"><b class="t">Why the pressure acts in all directions</b>The particles move randomly in all directions, so they hit every wall equally often: the pressure is the same on all walls (ignoring tiny effects of gravity).</div>
<details class="check"><summary>A balloon is blown up. Use particle ideas to explain why it stays inflated.</summary><div>Air particles inside collide with the inner surface of the rubber, exerting an outward force over its area (pressure). This balances the pressure of the air outside plus the elastic force of the rubber.</div></details>`},

    { h: "Pressure and temperature at constant volume (2.1.3)", body: P`
<p class="lead">Heat a gas in a sealed, rigid container (fixed volume) and its pressure <b>rises</b>.</p>
<ol class="steps-inline"><li>Higher temperature → particles have more kinetic energy → they move <b>faster</b>.</li>
<li>So they hit the walls <b>more often</b> (more collisions per second)…</li>
<li>…and <b>harder</b> (bigger force per collision).</li>
<li>Greater total force on the same area → <b>greater pressure</b>.</li></ol>
${F.plot({ w: 480, h: 280, x: [-300, 200], y: [0, 160], grid: false, ticks: { x: [-273, -200, -100, 0, 100, 200], y: [50, 100, 150] }, xlabel: "temperature / °C", ylabel: "pressure / kPa",
  curves: [{ f: T => 100 * (T + 273) / 273, dom: [-273, 200], c: "c d" }, { f: T => 100 * (T + 273) / 273, dom: [-50, 200], c: "c thick" }],
  marks: [{ x: -273, y: 0, c: "r", label: "absolute zero: p = 0", pos: "ne" }],
  tickFmt: { x: v => v === -273 ? "−273" : v },
  cap: "Measured points (solid) extended back (dashed) reach zero pressure at −273 °C: the particles would have the least possible kinetic energy. On the kelvin scale, p ∝ T." })}
<div class="callout warn"><b class="t">Danger</b>This is why aerosol cans say "do not heat" and why car tyre pressures rise after a long drive: the gas gets hotter in a container of (roughly) fixed volume.</div>
<details class="check"><summary>A sealed bottle of air is put into a fridge. What happens to the pressure inside, and why?</summary><div>It decreases. The particles slow down, so they hit the walls less often and with less force: less total force on the same area.</div></details>`},

    { h: "Pressure and volume at constant temperature: pV = constant (2.1.3)", body: P`
<p class="lead">Squash a gas into a <b>smaller volume</b> at constant temperature and its pressure <b>rises</b>.</p>
<p><b>Particle explanation</b>: the particles still move at the same average speed (same temperature), but now there is less space, so each particle reaches a wall sooner. Collisions with the walls happen <b>more often</b>, and the total force on each unit of area increases.</p>
${F.row(
  (() => { let s = F.rect(20, 40, 220, 110, "k mid") + gas(20, 40, 220, 110, 8, 8, "o", false) + F.rect(240, 30, 12, 130, "m mF") + F.line(252, 95, 300, 95, "k thick"); return F.fig(310, 175, s + F.text(130, 172, "large V: low p", "tk small bold"), "", { size: "tiny" }); })(),
  (() => { let s = F.rect(20, 40, 110, 110, "k mid") + gas(20, 40, 110, 110, 8, 8, "o", false) + F.rect(130, 30, 12, 130, "m mF") + F.line(142, 95, 300, 95, "k thick") + F.arrow(240, 75, 160, 75, "b mid", 8); return F.fig(310, 175, s + F.text(75, 172, "half V: double p", "tk small bold"), "", { size: "tiny" }); })()
)}
<h3>Boyle's law (S)</h3>
<p>For a fixed mass of gas at constant temperature, pressure × volume is constant:</p>
$$pV=\text{constant}\qquad p_1V_1=p_2V_2$$
<p>Halve the volume → double the pressure. Treble the volume → one third of the pressure. Pressure and volume are <b>inversely proportional</b>.</p>
${F.row(
  F.plot({ w: 300, h: 230, x: [0, 10], y: [0, 10], grid: false, ticks: { x: [], y: [] }, xlabel: "V", ylabel: "p", m: { l: 26, r: 14, t: 14, b: 24 }, curves: [{ f: v => 12 / v, dom: [1.25, 10], c: "c thick" }], cap: "p against V: a curve (hyperbola). Never touches the axes.", size: "small" }),
  F.plot({ w: 300, h: 230, x: [0, 10], y: [0, 10], grid: false, ticks: { x: [], y: [] }, xlabel: "1/V", ylabel: "p", m: { l: 26, r: 14, t: 14, b: 24 }, curves: [{ f: x => .95 * x, dom: [0, 10], c: "c thick" }], cap: "p against 1/V: a straight line through the origin. This proves p ∝ 1/V.", size: "small" })
)}
<h3>Worked example</h3>
<p>A syringe contains 60 cm³ of air at 100 kPa. The plunger is pushed in slowly (so the temperature stays constant) until the volume is 20 cm³. Find the new pressure.</p>
$$p_2=\frac{p_1V_1}{V_2}=\frac{100\times60}{20}=300\ \text{kPa}$$
<div class="callout exam"><b class="t">Conditions</b>Always state "fixed mass" and "constant temperature". Pushing a plunger <i>quickly</i> warms the gas, so the law doesn't hold exactly. Units only need to match on both sides (kPa and cm³ are fine).</div>
<details class="check"><summary>A bubble of volume 2.0 cm³ is released 20 m under water, where the pressure is 300 kPa. What is its volume at the surface (100 kPa), at constant temperature?</summary><div>$V_2=300\times2.0/100=6.0$ cm³. Bubbles grow as they rise.</div></details>`}
  ],
  worked: [
    { q: P`A gas at 27 °C is heated at constant volume. (a) Convert 27 °C to kelvin. (b) State what happens to the pressure, explaining in terms of particles.`,
      steps: [P`(a) $T=27+273=300$ K.`, P`(b) The pressure increases.`, P`Particles gain kinetic energy and move faster, so they collide with the walls more frequently and with greater force; greater force on the same area means greater pressure.`]},
    { q: P`S: A cylinder holds 0.040 m³ of gas at 150 kPa. The gas is compressed at constant temperature to 0.015 m³. Calculate the new pressure.`,
      steps: [P`$p_1V_1=p_2V_2$`, P`$150\times0.040=p_2\times0.015$`, P`$p_2=6.0/0.015=400$ kPa.`]},
    { q: P`S: Explain why the Brownian motion of smoke particles provides evidence for the kinetic particle model of gases.`,
      steps: [P`The smoke particles move randomly although nothing visible is pushing them.`, P`This can only be explained if they are being hit by invisible particles (air molecules) that are moving fast and randomly.`, P`So air must consist of tiny, fast-moving molecules, as the kinetic model states.`]}
  ],
  formulas: [["Kelvin", P`$T\ (\text{K})=\theta\ (^\circ\text{C})+273$`], ["Boyle's law (S)", P`$pV=\text{constant},\ p_1V_1=p_2V_2$`], ["Absolute zero", P`$0\ \text{K}=-273\ ^\circ\text{C}$`], ["Pressure", P`$p=\dfrac{F}{A}$`]],
  cards: [
    ["Solid: arrangement, separation, motion", "Regular lattice; touching; vibrate about fixed positions."],
    ["Liquid: arrangement, separation, motion", "Irregular; close/touching; slide past each other."],
    ["Gas: arrangement, separation, motion", "Random; far apart; fast, random, straight lines between collisions."],
    ["Which states have a fixed volume?", "Solids and liquids."],
    ["Which state is easily compressed, and why?", "Gas: large spaces between particles."],
    ["Melting / freezing / boiling / condensing / evaporating", "s→l / l→s / l→g throughout at b.p. / g→l / l→g at the surface, any temperature."],
    ["Why does temperature stay constant while melting?", "Energy is used to overcome forces between particles, not to increase their kinetic energy."],
    ["What does temperature measure?", "The average kinetic energy of the particles."],
    ["Absolute zero", "−273 °C (0 K): particles have the least possible kinetic energy."],
    ["Convert °C to K", "Add 273."],
    ["What is Brownian motion?", "Random movement of microscopic particles (e.g. smoke) caused by collisions with fast-moving molecules."],
    ["What does Brownian motion show?", "That fluids consist of tiny, invisible, fast and randomly moving molecules."],
    ["How does a gas exert pressure?", "Particles collide with the walls, each exerting a force; total force per unit area = pressure."],
    ["Heat a gas at constant volume: pressure?", "Increases: faster particles hit walls more often and harder."],
    ["Compress a gas at constant temperature: pressure?", "Increases: particles hit walls more often (less space)."],
    ["Boyle's law (S)", "pV = constant for a fixed mass of gas at constant temperature."],
    ["Graph of p against 1/V (S)", "Straight line through the origin."],
    ["Forces between particles in a gas (S)", "Negligible: particles are far apart."],
    ["Why are liquids almost incompressible? (S)", "Particles already touching; strong repulsive forces if pushed closer."],
    ["Smoke particles vs air molecules", "Smoke particles: microscopic, visible, heavy. Molecules: invisible, light, fast."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Which state has a fixed volume but no fixed shape?`, opts: ["Solid", "Liquid", "Gas", "Solid and gas"], ans: 1, why: P`Liquids keep their volume but flow to take the container's shape.` },
    { type: "mcq", marks: 1, q: P`−73 °C in kelvin is`, opts: ["73 K", "200 K", "346 K", "−200 K"], ans: 1, why: P`$-73+273=200$ K.` },
    { type: "mcq", marks: 1, q: P`In Brownian motion, the smoke particles move because`, opts: ["they are attracted to each other", "they are hit unevenly by air molecules", "convection currents carry them", "they are charged"], ans: 1, why: P`Random, uneven collisions with fast air molecules.` },
    { type: "mcq", marks: 1, q: P`Gas in a sealed can is heated. The pressure rises because the particles`, opts: ["get bigger", "hit the walls more often and harder", "attract each other more", "increase in number"], ans: 1, why: P`Faster particles: more frequent, more forceful collisions.` },
    { type: "mcq", marks: 1, q: P`Evaporation differs from boiling because evaporation`, opts: ["happens only at 100 °C", "happens only at the surface", "needs no energy", "forms bubbles"], ans: 1, why: P`Evaporation is a surface process at any temperature.` },
    { type: "mcq", marks: 1, q: P`S: A gas at 120 kPa has its volume halved at constant temperature. The new pressure is`, opts: ["60 kPa", "120 kPa", "240 kPa", "480 kPa"], ans: 2, why: P`$p\propto1/V$: double.` },
    { type: "mcq", marks: 1, q: P`At absolute zero the particles of a substance`, opts: ["stop existing", "have the least possible kinetic energy", "move fastest", "become a gas"], ans: 1, why: P`Absolute zero is the lowest possible temperature: least kinetic energy.` },
    { type: "mcq", marks: 1, q: P`Which change of state releases energy?`, opts: ["Melting", "Boiling", "Evaporating", "Condensing"], ans: 3, why: P`Gas → liquid: forces between particles form, releasing energy.` },
    { type: "struct", marks: 3, q: P`Describe the arrangement, separation and motion of particles in a liquid.`,
      ms: P`<b>B1</b> irregular / random arrangement<br><b>B1</b> close together / mostly touching<br><b>B1</b> move around, sliding past each other` },
    { type: "struct", marks: 3, q: P`Describe how Brownian motion can be observed using a smoke cell, and state what is seen.`,
      ms: P`<b>B1</b> smoke trapped in a small glass cell, lit from the side<br><b>B1</b> viewed through a microscope<br><b>B1</b> bright specks moving in a random, jerky (zigzag) way` },
    { type: "struct", marks: 4, q: P`Explain, using the kinetic particle model, why the pressure of a gas in a sealed container increases when it is heated.`,
      ms: P`<b>B1</b> particles gain kinetic energy / move faster<br><b>B1</b> collide with the walls more frequently<br><b>B1</b> each collision exerts a greater force<br><b>B1</b> greater force on the same area so greater pressure` },
    { type: "struct", marks: 3, q: P`S: A sealed syringe contains 80 cm³ of air at 100 kPa. The plunger is pushed slowly until the pressure is 250 kPa. Calculate the new volume and state one assumption.`,
      ms: P`<b>C1</b> $100\times80=250\times V_2$<br><b>A1</b> 32 cm³<br><b>B1</b> temperature (and mass) constant` },
    { type: "struct", marks: 3, q: P`Explain why solids have a fixed shape but gases do not, in terms of forces between particles.`,
      ms: P`<b>B1</b> in solids, strong forces hold particles in fixed positions<br><b>B1</b> particles can only vibrate, so the shape is fixed<br><b>B1</b> in gases, forces are negligible: particles move freely and spread out` },
    { type: "struct", marks: 2, q: P`State what is meant by absolute zero and give its value in °C.`,
      ms: P`<b>B1</b> the lowest possible temperature, where particles have the least kinetic energy<br><b>B1</b> −273 °C` },
    { type: "struct", marks: 3, q: P`S: Sketch the graph of pressure against volume for a fixed mass of gas at constant temperature, and describe how plotting a different graph would show that p is inversely proportional to V.`,
      ms: P`<b>B1</b> curve decreasing, getting less steep, not touching axes<br><b>B1</b> plot p against 1/V<br><b>B1</b> straight line through the origin shows p ∝ 1/V` },
    { type: "struct", marks: 2, q: P`State the two differences between boiling and evaporation.`,
      ms: P`<b>B1</b> boiling occurs at a fixed temperature (b.p.); evaporation at any temperature<br><b>B1</b> boiling occurs throughout the liquid; evaporation only at the surface` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: P`Convert 100 °C to kelvin.`, ms: P`<b>B1</b> 373 K` },
    { d: 1, type: "struct", marks: 2, q: P`Name the change of state when (a) water vapour forms droplets on a cold window, (b) ice turns to water.`, ms: P`<b>B1</b> (a) condensing / condensation<br><b>B1</b> (b) melting` },
    { d: 1, type: "mcq", marks: 1, q: P`The particles in a solid`, opts: ["move freely", "are far apart", "vibrate about fixed positions", "move in straight lines"], ans: 2, why: P`Solid particles vibrate about fixed positions.` },
    { d: 1, type: "struct", marks: 2, q: P`Draw particle diagrams for a solid and a gas.`, ms: P`<b>B1</b> solid: regular rows of touching circles<br><b>B1</b> gas: few circles widely and randomly spaced` },
    { d: 2, type: "struct", marks: 3, q: P`A gas is compressed slowly into a smaller volume. Explain, in terms of particles, why its pressure increases.`, ms: P`<b>B1</b> particles have less space / more particles per unit volume<br><b>B1</b> collide with walls more often (same speed, temperature constant)<br><b>B1</b> greater force per unit area = greater pressure` },
    { d: 2, type: "struct", marks: 3, q: P`Explain why a smoke particle in air moves randomly, and why you never see the air molecules themselves.`, ms: P`<b>B1</b> air molecules collide with smoke particle from all sides<br><b>B1</b> collisions are uneven at any instant so resultant force changes direction randomly<br><b>B1</b> air molecules are far too small to be seen (even with a microscope)` },
    { d: 2, type: "mcq", marks: 1, q: P`S: p = 200 kPa, V = 3.0 dm³. At constant temperature V becomes 5.0 dm³. The new pressure is`, opts: ["120 kPa", "333 kPa", "600 kPa", "1000 kPa"], ans: 0, why: P`$200\times3.0/5.0=120$ kPa.` },
    { d: 2, type: "struct", marks: 3, q: P`A car's tyre pressure is measured as 220 kPa in the morning. After a long fast drive it is 240 kPa. Explain this change.`, ms: P`<b>B1</b> air in tyre gets hotter (friction / flexing)<br><b>B1</b> particles move faster, hitting walls more often and harder<br><b>B1</b> volume roughly constant so pressure rises` },
    { d: 3, type: "struct", marks: 5, q: P`S: A diver releases an air bubble of volume 3.0 cm³ at a depth where the total pressure is 400 kPa. Atmospheric pressure is 100 kPa. (a) Calculate the volume of the bubble at the surface, assuming constant temperature. (b) Explain using particles why the bubble gets bigger as it rises. (c) In reality the water near the surface is warmer. How would this affect your answer?`, ms: P`<b>(a) C1</b> $400\times3.0=100\times V$<br><b>A1</b> 12 cm³<br><b>(b) B1</b> outside pressure decreases as it rises<br><b>B1</b> gas expands until the pressure of particles hitting the bubble walls matches outside<br><b>(c) B1</b> volume slightly larger: particles faster, more pressure, bubble expands more` },
    { d: 3, type: "struct", marks: 5, q: P`S: Using the ideas of forces between particles and kinetic energy, explain the differences between solids, liquids and gases in (a) compressibility, (b) ability to flow, (c) density.`, ms: P`<b>(a) B1</b> solids/liquids: particles touching, strong repulsion if pushed closer; gases: large spaces, easily compressed<br><b>(b) B1</b> solids: strong forces fix positions; liquids: enough energy to slide past each other<br><b>B1</b> gases: forces negligible, particles move freely<br><b>(c) B1</b> solids and liquids: particles close together, high density<br><b>B1</b> gases: particles far apart, very low density` },
    { d: 3, type: "struct", marks: 4, q: P`Pressure readings for a sealed flask of air are taken at different temperatures. The graph of pressure against temperature (°C) is a straight line. Describe how the graph could be used to find absolute zero, and explain what happens to the particles at that temperature.`, ms: P`<b>B1</b> extend (extrapolate) the line back to zero pressure<br><b>B1</b> read the temperature where it meets the axis: about −273 °C<br><b>B1</b> at absolute zero particles have the least possible kinetic energy<br><b>B1</b> so they exert (almost) no force on the walls / no pressure` }
  ]
});
}
