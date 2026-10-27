window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
const flame = (x, y, s = 1) => F.path(`M${x},${y} Q${x - 12 * s},${y - 18 * s} ${x},${y - 38 * s} Q${x + 12 * s},${y - 18 * s} ${x},${y} Z`, "o oS o") + F.path(`M${x},${y} Q${x - 5 * s},${y - 10 * s} ${x},${y - 20 * s} Q${x + 5 * s},${y - 10 * s} ${x},${y} Z`, "r rS r");
const wavy = (x1, y1, x2, y2, c = "r") => { const L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1), n = Math.floor(L / 12); let d = `M${x1},${y1}`; for (let i = 1; i <= n; i++) { const t = i / n, px = x1 + (x2 - x1) * t, py = y1 + (y2 - y1) * t, o = (i % 2 ? 5 : -5); d += ` Q${px - Math.cos(a) * 6 - Math.sin(a) * o},${py - Math.sin(a) * 6 + Math.cos(a) * o} ${px},${py}`; } return F.path(d, c) + F.arrow(x2 - Math.cos(a) * 6, y2 - Math.sin(a) * 6, x2 + Math.cos(a) * 4, y2 + Math.sin(a) * 4, c, 8); };
//@@HELPERS-END

/* ============================================================
   TRANSFER OF THERMAL ENERGY  (0625: 2.3)
   ============================================================ */
TOPICS.push({
  id: "transfer", subject: "physics", unit: 2, title: "Transfer of thermal energy",
  blurb: "Conduction, convection and thermal (infrared) radiation, the experiments that show them, energy balance and the Earth's temperature, and everyday consequences.",
  level: "Core → Supplement", demo: "balance",
  syllabus: [
    ["2.3.1", "Describe experiments to demonstrate the properties of good and bad thermal conductors", 1],
    ["2.3.1 S", "Describe conduction in solids by lattice vibrations, and by free (delocalised) electrons in metals", 2],
    ["2.3.1 S", "Explain why conduction is poor in gases and most liquids; know that many solids are intermediate conductors", 2],
    ["2.3.2", "Convection is an important method of thermal energy transfer in liquids and gases", 3],
    ["2.3.2 S", "Explain convection in terms of density changes; describe experiments to illustrate convection", 3],
    ["2.3.3", "Thermal radiation is infrared radiation; all objects emit it; it does not need a medium", 5],
    ["2.3.3", "Describe the effect of surface colour (black/white) and texture (dull/shiny) on emission, absorption and reflection of infrared", 5],
    ["2.3.3 S", "Describe experiments to distinguish good and bad emitters and absorbers of infrared", 6],
    ["2.3.3 S", "An object at constant temperature transfers energy away at the same rate as it receives it; what happens if the rates differ", 7],
    ["2.3.3 S", "How the Earth's temperature depends on the balance between incoming and emitted radiation", 7],
    ["2.3.3 S", "The rate of emission depends on surface temperature and surface area", 8],
    ["2.3.4", "Explain everyday applications and consequences of conduction, convection and radiation (pans, room heating)", 9],
    ["2.3.4 S", "Explain more complex applications: a fire burning wood or coal, a car radiator", 9]
  ],
  sections: [
    { h: "Three ways to transfer thermal energy", body: P`
<p class="lead">Energy always flows from <b>hotter to colder</b> places. It does so in three ways.</p>
${(() => { let s = F.line(20, 230, 560, 230, "k") + F.rect(70, 190, 160, 40, "k mS", 6) + flame(150, 236, 1.2);
  s += F.path("M90,190 L90,120 Q90,110 100,110 L200,110 Q210,110 210,120 L210,190", "k") + F.rect(91, 130, 118, 60, "bS nostroke") + F.path("M150,180 Q170,150 150,135 Q130,150 150,180", "b") ;
  s += F.line(210, 150, 330, 150, "k thick") + F.text(270, 142, "metal spoon", "tk small") + F.text(270, 170, "conduction", "to bold");
  s += F.text(150, 100, "convection in the water", "tb bold");
  s += wavy(240, 210, 360, 210, "r") + wavy(240, 196, 360, 170, "r") + F.text(420, 200, "radiation (infrared)", "tr bold") + F.text(420, 218, "felt by a hand nearby", "tr small");
  return F.fig(580, 250, s, "", { size: "wide" }); })()}
<table class="t"><tr><th></th><th>Conduction</th><th>Convection</th><th>Radiation</th></tr>
<tr><td>How</td><td>Particles pass on vibrations; free electrons carry energy (metals)</td><td>Bulk movement of heated fluid (it expands, becomes less dense, rises)</td><td>Infrared electromagnetic waves</td></tr>
<tr><td>Needs a medium?</td><td>Yes (mainly solids)</td><td>Yes (liquids and gases only)</td><td>No: works through a vacuum</td></tr>
<tr><td>Example</td><td>Pan handle gets hot</td><td>Room heated by a radiator</td><td>Sun warms the Earth</td></tr></table>
<details class="check"><summary>Which method(s) can transfer energy through a vacuum? Why can the others not?</summary><div>Only radiation. Conduction and convection both need particles to pass on or carry the energy.</div></details>`},

    { h: "Good and bad conductors: experiments (2.3.1)", body: P`
<p class="lead">A <b>good thermal conductor</b> lets energy pass through it quickly (metals). A <b>bad conductor</b>, or <b>insulator</b>, does not (wood, plastic, air, wool, glass).</p>
${(() => { let s = F.rect(40, 60, 50, 130, "r rS r", 6) + F.text(65, 50, "heat", "tr small bold");
  const rods = [["copper", "o", 4], ["aluminium", "c", 3], ["steel", "m", 2], ["glass", "b", 1]];
  rods.forEach(([n, c, k], i) => { const y = 80 + i * 32; s += F.line(90, y, 460, y, c + " thick") + F.text(470, y + 4, n, "t" + c + " small bold", "start");
    for (let j = 0; j < 4; j++) { const x = 170 + j * 80; s += j < k ? F.circ(x, y, 5, "m thin d") : F.circ(x, y, 6, "kF"); } });
  s += F.text(275, 30, "wax blobs at equal distances along each rod", "tk small") + F.text(275, 212, "dashed = blob melted off; the more melted, the better the conductor", "tk small");
  return F.fig(560, 225, s, "Rods of the same length and thickness, heated equally at one end. Copper is the best conductor here; glass the worst.", { size: "wide" }); })()}
<h3>Other demonstrations</h3>
${F.row(
  (() => { let s = F.rect(20, 60, 120, 40, "o oS o", 2) + F.rect(140, 60, 120, 40, "m mS", 2) + F.text(80, 50, "wood", "to small bold") + F.text(200, 50, "brass", "tm small bold") + F.rect(20, 56, 240, 6, "k thin d") + F.text(80, 125, "paper scorches", "tr small bold") + F.text(200, 125, "paper unburnt", "tg small bold") + flame(140, 160, 1);
    return F.fig(290, 170, s, "Paper wrapped tightly round a rod half wood, half brass. The brass conducts energy away, so the paper over it does not scorch."); })(),
  (() => { let s = F.path("M60,30 L60,190 Q60,200 80,200 L120,200 Q140,200 140,190 L140,30", "k") + F.rect(61, 40, 78, 159, "bS nostroke") + F.rect(80, 170, 40, 22, "b bS b", 2) + F.text(100, 214, "ice (held down by gauze)", "tb small bold") + flame(110, 30, .8) + F.text(170, 50, "water boils at the top", "tr small bold", "start");
    return F.fig(300, 225, s, "Water is a poor conductor: water at the top boils while ice at the bottom (weighted down) doesn't melt."); })()
)}
<div class="callout exam"><b class="t">Fair test</b>Rods must be the same length and thickness, with blobs at the same distances, heated at the same rate. Only the material changes.</div>`},

    { h: "How conduction works (2.3.1 S)", body: P`
<div class="viz" data-viz="conduction"></div>
<h3>Lattice vibrations (all solids)</h3>
<p>Particles at the hot end gain kinetic energy and vibrate more. Because they are bonded to their neighbours, they make the next particles vibrate more too, and so on along the solid. This is slow, because energy is passed on one particle at a time.</p>
<h3>Free electrons (metals)</h3>
<p>Metals also contain <b>free (delocalised) electrons</b> that move randomly through the whole lattice. At the hot end they gain kinetic energy, travel quickly to colder parts, and collide with ions there, passing on energy. This is much faster, which is why <b>metals are the best conductors</b>. (The same free electrons make metals good electrical conductors.)</p>
<h3>Why gases and most liquids conduct badly</h3>
<ul><li>In a <b>gas</b>, particles are far apart. They collide only occasionally, so energy is passed on very slowly. Air is an excellent insulator, especially when <b>trapped</b> so it can't move (foam, wool, fur, double glazing).</li>
<li>In a <b>liquid</b>, particles are close but not held in a lattice, and there are no free electrons (except in liquid metals like mercury).</li></ul>
<table class="t"><tr><th>Good conductors</th><th>Intermediate</th><th>Insulators</th></tr>
<tr><td>Copper, aluminium, silver, steel</td><td>Glass, stone, brick, concrete, water</td><td>Air, plastic foam, wool, wood, plastics</td></tr></table>
<p>Many solids (glass, brick) conduct better than insulators but far worse than metals. "Good" and "bad" are relative.</p>
<details class="check"><summary>Why does a metal handle on a pan feel colder than a wooden one at the same room temperature?</summary><div>Metal is a good conductor: it conducts energy away from your hand quickly, so your skin cools and it feels cold. Wood conducts slowly, so your skin stays warm.</div></details>`},

    { h: "Convection (2.3.2)", body: P`
<p class="lead"><b>Convection</b> is the main way energy moves through liquids and gases. The fluid itself moves, carrying the energy with it.</p>
<div class="viz" data-viz="convection"></div>
<h3>The explanation, step by step (S)</h3>
<ol class="steps-inline"><li>The fluid near the heat source is heated. Its particles move faster and spread further apart: it <b>expands</b>.</li>
<li>Same mass, larger volume → its <b>density decreases</b>.</li>
<li>Less dense fluid <b>rises</b> (cooler, denser fluid is pushed down below it by gravity).</li>
<li>Cooler, <b>denser</b> fluid <b>sinks</b> to take its place and is heated in turn.</li>
<li>This sets up a continuous circulation: a <b>convection current</b>.</li></ol>
<div class="callout warn"><b class="t">Say it precisely</b>"Heat rises" is wrong. It is the <b>hot fluid</b> that rises, because it is <b>less dense</b>. Convection cannot happen in solids, because their particles cannot flow.</div>
<h3>Experiments to show convection (S)</h3>
${F.row(
  (() => { let s = F.path("M40,30 L40,180 Q40,190 50,190 L230,190 Q240,190 240,180 L240,30", "k") + F.rect(41, 50, 198, 139, "bS nostroke") + F.rect(150, 176, 12, 10, "r rF") + flame(156, 220, .9);
    s += F.path("M156,176 C160,120 170,70 140,62 C100,55 70,80 72,130 C74,165 120,182 150,180", "r mid d") + F.arrow(145, 63, 130, 62, "r", 7) + F.text(140, 212, "", "") + F.text(190, 120, "purple trail", "tr small bold", "start");
    return F.fig(300, 230, s, "A potassium manganate(VII) crystal at the bottom of a beaker of water, heated gently on one side: the purple colour traces the convection current."); })(),
  (() => { let s = F.rect(30, 80, 220, 110, "k") + F.rect(60, 30, 30, 50, "k") + F.rect(190, 30, 30, 50, "k") + F.line(60, 80, 90, 80, "bgF") + flame(75, 170, .7) + F.path("M205,10 Q215,20 205,30", "m") + F.text(205, 6, "smoke", "tm small");
    s += F.arrow(205, 40, 205, 140, "m mid", 8) + F.arrow(205, 150, 100, 150, "m mid", 8) + F.arrow(80, 140, 75, 40, "r mid", 8) + F.text(75, 22, "hot air out", "tr small bold") + F.text(205, 210, "cool air in", "tb small bold") + F.text(75, 210, "candle", "tk small");
    return F.fig(280, 225, s, "Smoke from a smouldering paper above one chimney is drawn down and out of the other, above the candle."); })()
)}
<details class="check"><summary>Why is the heating element in a kettle at the bottom, but the freezer compartment in a fridge at the top?</summary><div>Kettle: water heated at the bottom expands, becomes less dense and rises, so convection heats all the water. Fridge: air cooled at the top becomes denser and sinks, so convection cools the whole fridge.</div></details>`},

    { h: "Convection at work", body: P`
${F.row(
  (() => { let s = F.rect(20, 20, 300, 180, "k") + F.rect(270, 130, 20, 60, "r rS r", 3) + F.text(262, 150, "radiator", "tr small bold", "end");
    s += F.path("M280,125 C280,60 260,40 200,40 C110,40 60,40 50,90 C40,150 120,180 260,175", "r mid") + F.arrow(110, 42, 90, 44, "r mid", 8) + F.arrow(200, 177, 240, 176, "b mid", 8) + F.text(170, 70, "warm air rises and spreads", "tr small", "middle") + F.text(150, 194, "cool air sinks, flows back", "tb small");
    return F.fig(340, 215, s, "A 'radiator' heats a room mainly by convection: the warm air rises, spreads across the ceiling, cools and sinks."); })(),
  (() => { let s = F.rect(10, 140, 150, 60, "o oS nostroke") + F.rect(160, 140, 150, 60, "b bS nostroke") + F.text(85, 175, "land: heats quickly", "to small bold") + F.text(235, 175, "sea: heats slowly", "tb small bold");
    s += F.arrow(85, 130, 85, 50, "r mid", 8) + F.arrow(95, 40, 230, 40, "m mid", 8) + F.arrow(235, 50, 235, 120, "b mid", 8) + F.arrow(225, 128, 100, 128, "b thick", 10) + F.text(160, 118, "sea breeze", "tb bold");
    return F.fig(320, 215, s, "Daytime sea breeze: air above the warm land rises, cooler air from over the sea moves in to replace it."); })()
)}
<ul><li><b>Hot-water tank</b>: the heater is at the bottom; hot water rises to the top, where it is drawn off.</li>
<li><b>Gliders and birds</b> use rising warm-air "thermals".</li>
<li><b>Fridges</b> and <b>air-conditioners</b> are mounted high so cold, dense air sinks through the room.</li></ul>`},

    { h: "Thermal radiation: infrared (2.3.3)", body: P`
<p class="lead"><b>Thermal radiation</b> is <b>infrared</b> electromagnetic radiation. <b>All objects emit it</b>, and the hotter they are, the more they emit. It needs <b>no medium</b>: it travels through a vacuum at the speed of light, which is how energy from the Sun reaches the Earth.</p>
<h3>Surfaces matter</h3>
<table class="t"><tr><th>Surface</th><th>Emitting infrared</th><th>Absorbing infrared</th><th>Reflecting infrared</th></tr>
<tr><td><b>Matt (dull) black</b></td><td>Best emitter</td><td>Best absorber</td><td>Worst reflector</td></tr>
<tr><td>White</td><td>Poor–moderate</td><td>Poor</td><td>Good</td></tr>
<tr><td><b>Shiny silver</b></td><td>Worst emitter</td><td>Worst absorber</td><td>Best reflector</td></tr></table>
${F.row(
  (() => { let s = F.rect(40, 50, 90, 90, "k kF", 6) + wavy(60, 40, 60, -8 + 40, "r") + wavy(140, 95, 200, 95, "r") + wavy(85, 150, 85, 200, "r") + wavy(30, 95, -10 + 30, 95, "r"); s = F.rect(60, 60, 90, 90, "k kF", 6) + wavy(155, 105, 230, 105, "r") + wavy(150, 70, 220, 30, "r") + wavy(150, 140, 220, 180, "r") + F.text(105, 180, "matt black", "tk small bold") + F.text(200, 205, "emits strongly", "tr small bold");
    return F.fig(260, 215, s, "Good emitter (and absorber)."); })(),
  (() => { let s = F.rect(60, 60, 90, 90, "m mS", 6) + F.line(66, 70, 90, 66, "bgF") + F.path("M70,75 L95,68", "k thin") + wavy(155, 105, 190, 105, "r") + F.text(105, 180, "shiny silver", "tm small bold") + F.text(200, 205, "emits weakly", "tm small bold");
    s += wavy(240, 40, 160, 80, "o") + wavy(160, 84, 240, 124, "o") + F.text(250, 36, "reflects", "to small", "end");
    return F.fig(260, 215, s, "Poor emitter, good reflector."); })()
)}
<div class="callout why"><b class="t">Why "matt" matters as well as colour</b>A rough, dull surface has many tiny bumps; radiation bouncing between them gets absorbed. A smooth shiny surface reflects most of it straight off. Texture affects infrared as much as colour does.</div>
<h3>Uses</h3>
<ul><li>Solar panels and cooling fins on the back of a fridge are <b>matt black</b> (absorb / emit well).</li>
<li>Emergency blankets, the inside of vacuum flasks and fire-fighters' suits are <b>shiny</b> (reflect infrared).</li>
<li>Houses in hot countries are painted <b>white</b> to reflect sunlight.</li></ul>
<details class="check"><summary>Why do marathon runners wrap themselves in shiny foil blankets after a race?</summary><div>The shiny surface is a poor emitter and reflects infrared back towards the body, reducing energy loss by radiation so they don't get too cold.</div></details>`},

    { h: "Emitters and absorbers: experiments (2.3.3 S)", body: P`
<h3>Comparing emitters: Leslie's cube</h3>
${(() => { let s = F.rect(150, 40, 120, 120, "k bgF", 4) + F.rect(150, 40, 60, 120, "k kF") + F.rect(210, 40, 60, 120, "m mS") + F.text(180, 30, "matt black", "tk small bold") + F.text(240, 30, "shiny", "tm small bold") + F.text(210, 180, "filled with hot water", "tk small bold");
  s += F.rect(40, 85, 50, 30, "r rS r", 4) + F.text(65, 130, "IR detector", "tr small bold") + F.line(90, 100, 150, 100, "r d") + F.text(65, 78, "big reading", "tr small", "middle");
  s += F.rect(330, 85, 50, 30, "r rS r", 4) + F.text(355, 130, "IR detector", "tr small bold") + F.line(270, 100, 330, 100, "m d") + F.text(355, 78, "small reading", "tm small");
  return F.fig(420, 200, s, "Leslie's cube: four faces with different surfaces, all at the same temperature. An infrared detector held the same distance from each face gives the biggest reading for the matt black face.", { size: "small" }); })()}
<p>Alternatively: fill identical cans (one matt black, one shiny) with the same volume of hot water from a kettle; time how fast each cools. The matt black can cools faster: it is the better <b>emitter</b>.</p>
<h3>Comparing absorbers</h3>
${(() => { let s = F.rect(40, 40, 16, 120, "k kF") + F.rect(304, 40, 16, 120, "m mS") + F.rect(160, 80, 40, 60, "r rS r", 4) + F.text(180, 70, "heater", "tr small bold");
  s += wavy(158, 110, 60, 110, "r") + wavy(202, 110, 300, 110, "r") + F.circ(36, 100, 6, "o oF") + F.line(36, 106, 36, 160, "k thin") + F.circ(324, 100, 6, "o oF") + F.text(70, 186, "matt black: wax melts,", "tk small bold") + F.text(70, 202, "coin drops first", "tk small bold") + F.text(300, 186, "shiny: wax melts", "tk small bold") + F.text(300, 202, "much later", "tk small bold");
  return F.fig(370, 215, s, "Two plates at equal distances from a heater, each with a coin (or pin) stuck on the back with wax. The matt black plate absorbs infrared faster, so its wax melts first.", { size: "small" }); })()}
<p>Or: two cans of cold water, one matt black and one shiny, at the same distance from a heater. The temperature of the water in the black can rises faster.</p>
<div class="callout exam"><b class="t">Fair test</b>Same starting temperature, same volume of water, same size cans, same distance from the source, same time. Only the surface changes.</div>`},

    { h: "Energy balance and the Earth's temperature (2.3.3 S)", body: P`
<p class="lead">Every object both <b>absorbs</b> and <b>emits</b> radiation. What happens to its temperature depends on the balance:</p>
<ul><li>Receives energy <b>faster</b> than it transfers it away → <b>temperature rises</b>.</li>
<li>Receives energy <b>slower</b> than it transfers it away → <b>temperature falls</b>.</li>
<li>For a <b>constant temperature</b>, it must transfer energy away at <b>the same rate</b> as it receives it.</li></ul>
<p>As an object warms, it emits more, so it naturally settles at a temperature where the rates balance. Try it in the interactive lab.</p>
<h3>The Earth</h3>
${(() => { let s = F.rect(0, 180, 560, 50, "g gS nostroke") + F.text(280, 215, "Earth's surface", "tg bold") + F.rect(0, 20, 560, 50, "b bS nostroke") + F.text(500, 50, "atmosphere", "tb small bold");
  s += F.circ(60, 30, 26, "o oS o") + F.text(60, 35, "Sun", "to small bold") + wavy(90, 50, 200, 176, "o") + F.text(120, 120, "short-wavelength", "to small bold", "end") + F.text(120, 134, "radiation in", "to small bold", "end");
  s += wavy(260, 176, 320, 30, "r") + F.text(324, 24, "some IR escapes to space", "tr small bold", "start") + wavy(380, 176, 400, 72, "r") + wavy(410, 72, 430, 172, "r") + F.text(440, 116, "absorbed by greenhouse", "tr small bold", "start") + F.text(440, 132, "gases, some re-emitted", "tr small bold", "start") + F.text(440, 148, "back down", "tr small bold", "start");
  return F.fig(600, 235, s, "", { size: "wide" }); })()}
<ul><li>The Earth absorbs radiation from the Sun and emits infrared back into space. Its average temperature stays roughly constant when these rates balance.</li>
<li><b>Greenhouse gases</b> (carbon dioxide, methane, water vapour) absorb some of the outgoing infrared and re-emit it, some back towards the surface. More greenhouse gas → less energy escapes → the Earth must warm up until it emits enough to restore the balance: <b>global warming</b>.</li>
<li>Factors that change the balance: amount of greenhouse gases; cloud cover; ice and snow cover (white ice reflects sunlight; less ice → more absorbed → more warming); volcanic dust; the Sun's output.</li></ul>
<details class="check"><summary>Explain why the Earth's temperature would rise if the amount of carbon dioxide in the atmosphere increased.</summary><div>More infrared emitted by the surface would be absorbed and re-emitted back, so less energy escapes into space. The Earth receives energy faster than it loses it, so its temperature rises until it emits enough to balance again.</div></details>`},

    { h: "What affects how fast an object radiates? (2.3.3 S)", body: P`
<p class="lead">The rate at which an object emits infrared depends on:</p>
<ol class="steps-inline"><li><b>Surface temperature</b>: a hotter surface emits much more (the rate increases very steeply with temperature).</li>
<li><b>Surface area</b>: a larger area emits more energy per second.</li>
<li><b>Type of surface</b>: matt black emits most; shiny silver least.</li></ol>
${F.row(
  (() => { let s = F.rect(40, 60, 60, 60, "o oS o", 6) + F.text(70, 140, "small area", "tk small bold");
    for (let i = 0; i < 2; i++) s += wavy(100, 75 + i * 30, 140, 75 + i * 30, "r");
    s += F.path("M180,40 L195,40 L195,140 L180,140 M200,40 L215,40 L215,140 L200,140 M220,40 L235,40 L235,140 L220,140 M240,40 L255,40 L255,140 L240,140", "o") + F.text(220, 160, "cooling fins: large area", "tk small bold");
    for (let i = 0; i < 4; i++) s += wavy(258, 55 + i * 25, 296, 55 + i * 25, "r");
    return F.fig(320, 175, s, "Fins on engines and computer heat sinks increase the surface area, so more energy is radiated (and convected) away."); })(),
  (() => { let s = F.circ(80, 90, 40, "o oS o") + F.text(80, 150, "elephant: big ears", "tk small bold") + F.text(80, 166, "help it lose heat", "tk small bold") + F.circ(220, 90, 20, "b bS b") + F.text(220, 150, "a small animal in the", "tk small bold") + F.text(220, 166, "cold: small ears", "tk small bold");
    return F.fig(300, 180, s, "Animals in hot climates often have large thin ears or body parts to increase surface area for losing energy."); })()
)}
<details class="check"><summary>Two identical cans of water, one at 80 °C and one at 40 °C, are left in a room at 20 °C. Which loses energy faster, and why?</summary><div>The 80 °C can: a higher surface temperature emits much more infrared (and also conducts and convects more to the air, since the temperature difference is larger).</div></details>`},

    { h: "Everyday consequences (2.3.4)", body: P`
<h3>Cooking pans</h3>
<p>The pan's base is a metal (good conductor: energy passes quickly from the hob to the food); copper bases are best. The handle is plastic or wood (insulator), so it stays cool enough to hold. Inside the pan, convection currents in the water or oil spread the energy through the food.</p>
<h3>The vacuum flask</h3>
${(() => { let s = F.path("M80,40 L80,230 Q80,250 100,250 L220,250 Q240,250 240,230 L240,40", "k thick") + F.path("M95,50 L95,220 Q95,236 111,236 L209,236 Q225,236 225,220 L225,50", "m mid") + F.rect(96, 70, 128, 165, "o oS nostroke") + F.rect(108, 26, 104, 36, "k mS", 6);
  const lab = [[270, 40, "insulating stopper: stops convection out of the top"], [270, 110, "vacuum between the walls: no conduction or convection"], [270, 170, "silvered walls: reflect infrared back, poor emitters"], [270, 230, "plastic case and supports: poor conductors"]];
  lab.forEach(([x, y, t]) => { s += F.text(x, y, t, "tk small", "start"); });
  s += F.line(212, 44, 266, 40, "m thin") + F.line(230, 110, 266, 108, "m thin") + F.line(222, 160, 266, 168, "m thin") + F.line(240, 225, 266, 228, "m thin");
  return F.fig(620, 265, s, "A vacuum flask keeps hot drinks hot (and cold drinks cold) by reducing all three methods of transfer.", { size: "wide" }); })()}
<h3>Keeping a house warm</h3>
<table class="t"><tr><th>Measure</th><th>Reduces</th><th>How</th></tr>
<tr><td>Loft insulation (fibreglass)</td><td>Conduction and convection</td><td>Traps air (poor conductor) so it can't circulate</td></tr>
<tr><td>Cavity wall insulation</td><td>Convection</td><td>Foam fills the gap so air can't circulate</td></tr>
<tr><td>Double glazing</td><td>Conduction</td><td>Thin layer of trapped air (or vacuum) between panes</td></tr>
<tr><td>Draught excluders, carpets</td><td>Convection, conduction</td><td>Stop cold air flowing in; trapped air under carpet</td></tr>
<tr><td>Foil behind radiators</td><td>Radiation</td><td>Reflects infrared back into the room</td></tr></table>
<h3>More complex examples (S)</h3>
<ul><li><b>A coal or wood fire</b>: radiation heats the room in front of it directly; convection carries hot air and smoke up the chimney, drawing fresh air (oxygen) in at the bottom to keep it burning; little is conducted through the hearth.</li>
<li><b>A car radiator</b>: water pumped round the hot engine is heated by conduction; it flows to the radiator, a set of thin metal tubes and fins with a large surface area; energy is conducted through the metal and then carried away by air (forced convection, using a fan) and some radiation.</li>
<li><b>Clothes</b>: trap layers of still air, a poor conductor; several thin layers trap more air than one thick layer.</li>
<li><b>Igloos</b>: compacted snow contains lots of trapped air, so it is a good insulator.</li></ul>
<details class="check"><summary>Explain how each feature of a vacuum flask reduces energy transfer.</summary><div>Vacuum: no particles, so no conduction or convection across it. Silvered surfaces: reflect infrared back and emit little. Stopper: insulating plastic with trapped air reduces conduction and stops convection currents leaving the top.</div></details>`}
  ],
  worked: [
    { q: P`Explain why the bottom of a saucepan is made of copper but the handle is made of plastic.`,
      steps: [P`Copper is a good conductor (free electrons), so energy passes quickly from the hob to the food.`, P`Plastic is a poor conductor (no free electrons; energy passed only slowly by vibrations), so little energy reaches your hand.`]},
    { q: P`S: Two identical cans, one matt black and one shiny, are filled with water at 80 °C and left to cool. Describe the results and explain them. State two things that must be kept the same.`,
      steps: [P`The matt black can cools faster.`, P`Matt black surfaces are better emitters of infrared, so it transfers energy away at a greater rate.`, P`Keep the same: volume and starting temperature of water; same size/material cans; same position/room (lids on both).`]},
    { q: P`S: Explain why an increase in greenhouse gases leads to a rise in the Earth's average temperature.`,
      steps: [P`Earth's temperature is constant when it emits infrared at the same rate it absorbs radiation from the Sun.`, P`Greenhouse gases absorb some outgoing infrared and re-emit some back to the surface, so less escapes to space.`, P`Now the Earth absorbs more than it emits, so its temperature rises until it emits enough (hotter surfaces emit more) to restore the balance.`]}
  ],
  formulas: [["Hot fluid", "expands → less dense → rises (convection)"], ["Best emitter & absorber", "matt black"], ["Best reflector, worst emitter", "shiny silver"], ["Constant temperature (S)", "rate of energy in = rate of energy out"]],
  cards: [
    ["Three methods of thermal energy transfer", "Conduction, convection, radiation."],
    ["Which method works in a vacuum?", "Radiation (infrared)."],
    ["Why are metals the best conductors? (S)", "Free (delocalised) electrons carry energy quickly through the lattice."],
    ["How do non-metals conduct? (S)", "Lattice vibrations passed from particle to particle (slow)."],
    ["Why are gases poor conductors? (S)", "Particles far apart, so collisions are infrequent."],
    ["Examples of insulators", "Air (trapped), plastic foam, wool, wood."],
    ["Define convection", "Transfer by the bulk movement of a heated fluid (liquid or gas)."],
    ["Why does hot fluid rise? (S)", "It expands, becomes less dense, and is displaced upward by denser cool fluid."],
    ["Experiment to show convection in water", "Potassium manganate(VII) crystal heated at one side: purple trail follows the current."],
    ["Why is a freezer box at the top of a fridge?", "Cooled air is denser, sinks, and sets up a convection current cooling the whole fridge."],
    ["What is thermal radiation?", "Infrared electromagnetic radiation, emitted by all objects."],
    ["Best emitter / absorber of infrared", "Matt (dull) black surfaces."],
    ["Worst emitter / best reflector", "Shiny silver surfaces."],
    ["Leslie's cube shows…", "Matt black emits more infrared than shiny surfaces at the same temperature."],
    ["Constant temperature condition (S)", "Energy transferred away at the same rate as it is received."],
    ["Two factors affecting rate of emission (S)", "Surface temperature and surface area (plus surface type)."],
    ["Greenhouse effect (S)", "Greenhouse gases absorb outgoing IR and re-emit some back, so Earth must warm to restore balance."],
    ["Vacuum flask: vacuum", "Prevents conduction and convection."],
    ["Vacuum flask: silvered walls", "Reflect infrared, poor emitters."],
    ["Why are cooling fins used?", "Large surface area increases the rate of energy loss."],
    ["Why are there several thin layers of clothes better than one thick layer?", "They trap more still air, a poor conductor."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Energy from the Sun reaches the Earth by`, opts: ["conduction", "convection", "radiation", "all three"], ans: 2, why: P`Space is a vacuum: only radiation works.` },
    { type: "mcq", marks: 1, q: P`Which surface is the best absorber of infrared?`, opts: ["Shiny white", "Shiny silver", "Matt black", "Matt white"], ans: 2, why: P`Matt black absorbs (and emits) best.` },
    { type: "mcq", marks: 1, q: P`Convection cannot occur in`, opts: ["water", "air", "oil", "copper"], ans: 3, why: P`Solids can't flow.` },
    { type: "mcq", marks: 1, q: P`In convection, hot water rises because it`, opts: ["is lighter in mass", "is less dense", "contains heat", "has smaller particles"], ans: 1, why: P`It expands, so its density decreases.` },
    { type: "mcq", marks: 1, q: P`Which is the best thermal insulator?`, opts: ["Copper", "Glass", "Trapped air", "Water"], ans: 2, why: P`Gases are poor conductors and trapped air can't convect.` },
    { type: "mcq", marks: 1, q: P`S: Metals conduct well mainly because of`, opts: ["their high density", "free electrons", "their shiny surface", "convection inside them"], ans: 1, why: P`Delocalised electrons move quickly, carrying energy.` },
    { type: "mcq", marks: 1, q: P`S: An object receives energy faster than it transfers energy away. Its temperature`, opts: ["falls", "stays constant", "rises", "drops to zero"], ans: 2, why: P`Net energy gain raises the temperature.` },
    { type: "mcq", marks: 1, q: P`The silvered walls of a vacuum flask reduce energy transfer by`, opts: ["conduction", "convection", "radiation", "evaporation"], ans: 2, why: P`Shiny surfaces reflect infrared and emit poorly.` },
    { type: "struct", marks: 3, q: P`Describe an experiment to compare how well rods of different metals conduct thermal energy.`,
      ms: P`<b>B1</b> rods of the same length and diameter with wax blobs (or pins in wax) at equal distances<br><b>B1</b> heat one end of each rod equally (same flame / hot water)<br><b>B1</b> the rod whose wax melts furthest / fastest is the best conductor` },
    { type: "struct", marks: 4, q: P`S: Explain how a convection current forms when water in a beaker is heated at one side.`,
      ms: P`<b>B1</b> water near the heat is heated and expands<br><b>B1</b> its density decreases so it rises<br><b>B1</b> cooler, denser water sinks to replace it<br><b>B1</b> circulation forms: a convection current` },
    { type: "struct", marks: 3, q: P`S: Explain why metals are better thermal conductors than non-metals.`,
      ms: P`<b>B1</b> both conduct by lattice vibrations passed between particles<br><b>B1</b> metals also have free (delocalised) electrons<br><b>B1</b> which move quickly through the metal, carrying energy to cooler parts and colliding with ions` },
    { type: "struct", marks: 3, q: P`S: Describe an experiment to show that a matt black surface is a better absorber of infrared than a shiny surface.`,
      ms: P`<b>B1</b> two plates (one matt black, one shiny) equal distances from a radiant heater<br><b>B1</b> coin/pin fixed with wax on the back of each<br><b>B1</b> wax on matt black plate melts first / coin drops first` },
    { type: "struct", marks: 3, q: P`Explain why a vacuum flask keeps a drink hot. Refer to conduction, convection and radiation.`,
      ms: P`<b>B1</b> vacuum: no particles so no conduction or convection across it<br><b>B1</b> silvered walls reflect infrared back / emit poorly<br><b>B1</b> stopper is an insulator and prevents convection from the top` },
    { type: "struct", marks: 4, q: P`S: State and explain two factors that affect the rate at which an object emits infrared radiation.`,
      ms: P`<b>B1</b> surface temperature<br><b>B1</b> hotter surfaces emit more (much more) radiation per second<br><b>B1</b> surface area<br><b>B1</b> larger area emits more energy per second (e.g. cooling fins)` },
    { type: "struct", marks: 3, q: P`Explain why double glazing reduces energy loss from a house.`,
      ms: P`<b>B1</b> two panes with a gap of trapped air (or vacuum)<br><b>B1</b> air is a poor conductor<br><b>B1</b> gap is narrow so convection currents can't form easily` },
    { type: "struct", marks: 3, q: P`S: Describe how a car radiator keeps an engine cool.`,
      ms: P`<b>B1</b> water pumped round the engine absorbs energy (by conduction)<br><b>B1</b> hot water flows through thin metal tubes and fins with a large surface area<br><b>B1</b> energy conducted through metal and removed by air flowing past (convection, fan) / radiation` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: P`Name the method of thermal energy transfer that does not need a medium.`, ms: P`<b>B1</b> radiation` },
    { d: 1, type: "mcq", marks: 1, q: P`Fluffy materials are good insulators because they`, opts: ["are light", "trap air", "are white", "reflect heat"], ans: 1, why: P`Trapped air is a poor conductor and can't convect.` },
    { d: 1, type: "struct", marks: 2, q: P`Give one use of a matt black surface and one use of a shiny surface in controlling thermal energy transfer.`, ms: P`<b>B1</b> matt black: solar panel / cooling fins on fridge<br><b>B1</b> shiny: vacuum flask walls / emergency blanket / foil behind radiator` },
    { d: 1, type: "struct", marks: 2, q: P`Explain why the handle of a metal spoon in hot soup gets hot.`, ms: P`<b>B1</b> energy is conducted along the spoon<br><b>B1</b> metal is a good conductor` },
    { d: 2, type: "struct", marks: 3, q: P`A heater is placed at floor level in a cold room. Explain how the whole room is heated.`, ms: P`<b>B1</b> air near heater warms, expands, becomes less dense, rises<br><b>B1</b> cooler, denser air sinks to replace it<br><b>B1</b> a convection current circulates warm air through the room` },
    { d: 2, type: "struct", marks: 3, q: P`S: Explain why air is a poor conductor of thermal energy but a good transferrer of energy by convection.`, ms: P`<b>B1</b> particles far apart, collide infrequently, so poor conduction<br><b>B1</b> air is a fluid and can flow<br><b>B1</b> heated air expands and becomes less dense, setting up convection currents` },
    { d: 2, type: "mcq", marks: 1, q: P`S: A planet's temperature is constant. This means it`, opts: ["absorbs no radiation", "emits no radiation", "emits radiation at the same rate as it absorbs it", "is at absolute zero"], ans: 2, why: P`Balance of energy in and out.` },
    { d: 2, type: "struct", marks: 3, q: P`Describe how Leslie's cube is used to compare emitters of infrared radiation.`, ms: P`<b>B1</b> cube filled with hot water so all faces at the same temperature<br><b>B1</b> infrared detector held at the same distance from each face<br><b>B1</b> matt black face gives highest reading: best emitter; shiny lowest` },
    { d: 3, type: "struct", marks: 5, q: P`S: Explain the energy transfers in a coal fire in a room with a chimney, referring to conduction, convection and radiation, and explain why the fire keeps burning.`, ms: P`<b>B1</b> radiation from the glowing coals heats people/objects in front of it<br><b>B1</b> hot gases expand, become less dense, rise up the chimney (convection)<br><b>B1</b> fresh air (containing oxygen) drawn in at the base to replace it<br><b>B1</b> oxygen keeps the fuel burning<br><b>B1</b> little energy conducted into the hearth (brick/stone poor conductor)` },
    { d: 3, type: "struct", marks: 5, q: P`S: Melting polar ice is a concern. Explain, in terms of the balance of radiation, why melting ice could cause the Earth to warm further.`, ms: P`<b>B1</b> ice/snow is white and shiny, reflecting much of the incoming solar radiation<br><b>B1</b> when it melts, darker land or sea is exposed<br><b>B1</b> darker surfaces absorb more radiation<br><b>B1</b> Earth absorbs energy faster than it emits it, so temperature rises<br><b>B1</b> this causes more ice to melt: a positive feedback` },
    { d: 3, type: "struct", marks: 4, q: P`Design an investigation to compare the insulating properties of three materials (e.g. wool, foam, newspaper) using beakers of hot water. State the measurements, control variables and how to decide the best insulator.`, ms: P`<b>B1</b> wrap identical beakers in equal thicknesses of each material (plus one unwrapped control)<br><b>B1</b> fill with the same volume of water at the same starting temperature<br><b>B1</b> measure temperature at regular intervals (e.g. every 2 min for 20 min)<br><b>B1</b> smallest temperature drop = best insulator` }
  ]
});
}
