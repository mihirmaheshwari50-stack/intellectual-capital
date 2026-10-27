window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
// ---- diagram helpers for this topic ----
const loop = (x0, y0, x1, y1) => F.wire([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]);
const sym = (type, name, o = {}) => { const s = F.wire([[16, 50], [124, 50]]) + F.comp(type, 70, 50, o) + F.text(70, 104, name, "tk small bold"); return F.fig(140, 116, s, "", { size: "tiny" }); };
const iv = (f, title, note, c) => F.plot({ w: 260, h: 230, x: [-6, 6], y: [-1.6, 1.6], grid: false, xlabel: "V", ylabel: "I", m: { l: 16, r: 18, t: 16, b: 18 }, curves: [{ f, c: c + " thick" }], cap: `<b>${title}</b>: ${note}` });
//@@HELPERS-END

/* ============================================================
   ELECTRICITY  (0625: 4.2.1–4.2.5, 4.3.1–4.3.3, 4.4)
   ============================================================ */
TOPICS.push({
  id: "electricity", subject: "physics", unit: 4, title: "Electricity & circuits",
  blurb: "Charge, fields, current, e.m.f., p.d., resistance, I–V graphs, series and parallel, potential dividers, power and safety.",
  level: "Core → Supplement", demo: "circuit",
  syllabus: [
    ["4.2.1", "Positive and negative charges; like charges repel and unlike attract; charging by friction", 0],
    ["4.2.1 S", "Explain charging by friction in terms of electron transfer; simple tests for charge", 0],
    ["4.2.1", "Conductors and insulators (S: explained by free electrons); charge measured in coulombs", 0],
    ["4.2.1 S", "Electric fields: direction and field patterns (point charge, charged sphere, parallel plates)", 1],
    ["4.2.2", "Current as a rate of flow of charge, $I=Q/t$; using ammeters; conventional current vs electron flow", 2],
    ["4.2.2 S", "Direct current (d.c.) and alternating current (a.c.)", 2],
    ["4.2.3", "E.m.f. and p.d. as work done per unit charge; using voltmeters (S: $E=W/Q$, $V=W/Q$)", 3],
    ["4.2.4", "Resistance $R=V/I$ and the experiment to determine it; I–V graphs (S: $R\\propto L$, $R\\propto1/A$)", 4],
    ["4.2.5", "Electrical power $P=IV$ and energy $E=IVt$; the kilowatt-hour; cost of electricity", 5],
    ["4.3.1", "Draw and interpret circuit diagrams using standard symbols", 6],
    ["4.3.2", "Series and parallel circuits: current, p.d. and resistance (S: calculations, conservation of charge)", 7],
    ["4.3.3", "Action of thermistors, LDRs, diodes and LEDs; potential dividers (S: $V_1/V_2=R_1/R_2$)", 8],
    ["4.4", "Electrical safety: hazards; live, neutral, earth; fuses and trip switches; earthing; double insulation", 9]
  ],
  sections: [
    { h: "Electric charge (4.2.1)", body: P`
<p class="lead">Everything is made of atoms, and atoms contain charged particles: <b>protons</b> (+) locked in the nucleus and <b>electrons</b> (−) on the outside. Normally they balance, so objects are <b>neutral</b>. An object becomes <b>charged</b> when it gains or loses electrons.</p>
<ul><li>There are two kinds of charge: <b>positive</b> and <b>negative</b>.</li>
<li><b>Like charges repel</b>, and <b>unlike charges attract</b>.</li>
<li>Charge is measured in <b>coulombs (C)</b>. One electron carries $-1.6\times10^{-19}$ C, so it takes about $6\times10^{18}$ electrons to make one coulomb.</li></ul>
<h3>Charging by friction (S: electron transfer)</h3>
${(() => { let s = F.rect(40, 70, 220, 26, "k mS", 13) + F.text(150, 88, "polythene rod", "tk small bold") + F.path("M150,60 C190,40 250,50 270,80 C280,100 240,120 200,112", "o thick") + F.text(276, 62, "cloth", "to bold small", "start");
  for (let i = 0; i < 6; i++) s += F.text(60 + i * 34, 64, "−", "tb bold big");
  s += F.arrow(240, 104, 200, 100, "b mid", 8) + F.text(246, 132, "electrons move cloth → rod", "tb small bold", "start");
  s += F.rect(40, 170, 220, 26, "k bS", 13) + F.text(150, 188, "rod: gained electrons → NEGATIVE", "tb small bold") + F.rect(290, 165, 120, 36, "k oS", 8) + F.text(350, 188, "cloth: POSITIVE", "to small bold");
  return F.fig(440, 220, s, "Rubbing transfers electrons. The rod ends up with extra electrons (negative) and the cloth with a shortage (positive), equal and opposite.", { size: "small" }); })()}
<p>When two insulators are rubbed together, friction transfers <b>electrons</b> from one surface to the other. Which way they go depends on the materials:</p>
<ul><li><b>Polythene</b> rubbed with a cloth <b>gains</b> electrons and becomes <b>negative</b>; the cloth is left <b>positive</b>.</li>
<li><b>Acetate</b> (perspex) rubbed with a cloth <b>loses</b> electrons and becomes <b>positive</b>; the cloth becomes negative.</li></ul>
<div class="callout key"><b class="t">Only electrons move</b>Protons are held in nuclei and never move during charging. A positive object has <b>lost electrons</b>; it has not "gained positive charge". This is the point most often penalised.</div>
<h3>Testing for charge</h3>
<p>Hang a charged rod in a stirrup on a thread so it can rotate freely. Bring another charged rod near it. If it swings <b>away</b>, they have the <b>same</b> type of charge. Attraction alone doesn't prove the charges are opposite, because a charged rod also attracts <i>uncharged</i> objects. <b>Repulsion is the only sure test.</b></p>
<p>A charged rod picks up small pieces of paper. Its charge pushes or pulls the electrons in the paper, so the near side of the paper becomes oppositely charged and is attracted.</p>
<h3>Conductors and insulators</h3>
<table class="t"><tr><th></th><th>Conductors</th><th>Insulators</th></tr>
<tr><td>Examples</td><td>Metals (copper, aluminium), graphite</td><td>Plastics, rubber, glass, dry wood, air</td></tr>
<tr><td>Why (S)</td><td>Contain <b>free (delocalised) electrons</b> that can move through the material</td><td>Electrons are held tightly in their atoms and can't move freely</td></tr>
<tr><td>Charging</td><td>Charge flows away (e.g. through your hand), unless the conductor is insulated</td><td>Charge stays where it's put, so they can be charged by rubbing</td></tr></table>
<details class="check"><summary>A balloon rubbed on hair sticks to the wall. Explain using electrons.</summary><div>Electrons transfer from hair to balloon, making it negative. Near the balloon, electrons in the wall are repelled away, leaving the wall's surface slightly positive. Unlike charges attract, so the balloon sticks.</div></details>`},

    { h: "Electric fields (4.2.1 S)", body: P`
<p class="lead">An <b>electric field</b> is a region in which an electric charge experiences a force. Every charged object is surrounded by one.</p>
<p>The <b>direction</b> of an electric field at a point is the direction of the force on a <b>positive</b> charge placed there. So field lines point <b>away from positive</b> charges and <b>towards negative</b> charges. Lines that are closer together mean a stronger field.</p>
<div class="viz" data-viz="efield"></div>
${F.row(
  (() => { let s = ""; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; s += F.arrow(110 + 24 * Math.cos(a), 110 + 24 * Math.sin(a), 110 + 92 * Math.cos(a), 110 + 92 * Math.sin(a), "k mid", 8); } s += F.circ(110, 110, 18, "o oS") + F.text(110, 116, "+", "to bold big"); return F.fig(220, 220, s, "Positive point charge (or charged sphere): radial, outwards."); })(),
  (() => { let s = ""; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; s += F.arrow(110 + 92 * Math.cos(a), 110 + 92 * Math.sin(a), 110 + 24 * Math.cos(a), 110 + 24 * Math.sin(a), "k mid", 8); } s += F.circ(110, 110, 18, "b bS") + F.text(110, 116, "−", "tb bold big"); return F.fig(220, 220, s, "Negative point charge: radial, inwards."); })(),
  (() => { let s = F.rect(20, 30, 200, 10, "oF") + F.rect(20, 180, 200, 10, "bF") + F.text(120, 22, "+ + + + + + +", "to bold") + F.text(120, 210, "− − − − − − −", "tb bold"); for (let k = 0; k <= 7; k++) s += F.arrow(32 + k * 25, 42, 32 + k * 25, 178, "k mid", 8); return F.fig(240, 220, s, "Oppositely charged parallel plates: <b>uniform</b> field (equally spaced parallel lines)."); })()
)}
<ul><li><b>Point charge</b> or <b>charged conducting sphere</b>: <b>radial</b> straight lines spreading from the centre, outward for +, inward for −. The field gets weaker with distance as the lines spread apart.</li>
<li><b>Between two oppositely charged parallel plates</b>: <b>straight, parallel, equally spaced</b> lines from the + plate to the − plate, at right angles to the plates. The field is <b>uniform</b> (the same strength everywhere between them, except near the edges).</li></ul>
<div class="callout exam"><b class="t">Drawing field diagrams</b>Lines must touch the charged surface at 90°, never cross, and carry arrows. For plates: at least 4 or 5 evenly spaced lines, all arrowed from + to −.</div>
<details class="check"><summary>Which way would an electron move between the plates above?</summary><div>Upwards, towards the positive plate: opposite to the field direction, because the electron is negative.</div></details>`},

    { h: "Electric current (4.2.2)", body: P`
<p class="lead"><b>Current</b> is the rate of flow of charge, measured in amperes (A). One amp is one coulomb passing a point every second.</p>
$$I=\frac{Q}{t}\qquad Q=It$$
<p>In a metal wire, the moving charges are the free <b>electrons</b>. They drift from the <b>negative</b> terminal, round the circuit, to the <b>positive</b> terminal. Before electrons were discovered, scientists had chosen to say current flows from + to −. This <b>conventional current</b> is still the direction shown by arrows on circuit diagrams.</p>
${(() => { let s = loop(60, 50, 380, 190) + F.comp("cell", 60, 120, { v: true }) + F.comp("lamp", 220, 50) + F.text(36, 104, "+", "tk bold") + F.text(36, 146, "−", "tk bold");
  s += F.arrow(110, 34, 170, 34, "r thick", 10) + F.text(140, 24, "conventional current: + → −", "tr small bold", "start");
  s += F.arrow(330, 206, 270, 206, "b thick", 10) + F.text(300, 226, "electron flow: − → +", "tb small bold");
  return F.fig(440, 240, s, "Conventional current is drawn leaving the positive terminal (the long plate of the cell). Electrons actually move the other way.", { size: "small" }); })()}
<h3>Measuring current</h3>
<p>Use an <b>ammeter</b> connected in <b>series</b>, in the path of the current, so all the charge flows through it. An ideal ammeter has (nearly) zero resistance, so it doesn't reduce the current it measures. Analogue meters: read the scale at eye level and check the zero. Digital meters: choose a range just above the expected value.</p>
<h3>d.c. and a.c. (S)</h3>
${F.row(
  F.plot({ w: 260, h: 180, x: [0, 10], y: [-1.5, 1.5], grid: false, xlabel: "t", ylabel: "I", m: { l: 18, r: 16, t: 14, b: 16 }, curves: [{ f: x => 1, c: "b thick" }], cap: "<b>d.c.</b>: flows in one direction only (cells, batteries)." }),
  F.plot({ w: 260, h: 180, x: [0, 10], y: [-1.5, 1.5], grid: false, xlabel: "t", ylabel: "I", m: { l: 18, r: 16, t: 14, b: 16 }, curves: [{ f: x => Math.sin(x * 1.6), c: "o thick" }], cap: "<b>a.c.</b>: repeatedly reverses direction (mains: 50 Hz)." })
)}
<p><b>Direct current</b> flows in one direction only. <b>Alternating current</b> changes direction back and forth many times a second. Mains electricity in many countries is a.c. at about 230 V and 50 Hz (it completes 50 cycles a second).</p>
<div class="callout ex"><b class="t">Worked example</b>A charge of 360 C flows through a lamp in 2 minutes. Find the current.<br>$I=\dfrac{Q}{t}=\dfrac{360}{120}=3.0$ A. Time must be in <b>seconds</b>.</div>
<details class="check"><summary>A phone charger supplies 2.0 A for 1.5 hours. How much charge flows?</summary><div>$Q=It=2.0\times5400=10\,800$ C.</div></details>`},

    { h: "E.m.f. and potential difference (4.2.3)", body: P`
<p class="lead">Both are measured in <b>volts</b> and both describe <b>energy per unit charge</b>, but in opposite directions: one is energy <i>given to</i> charge, the other is energy <i>given up</i> by charge.</p>
<ul><li><b>Electromotive force (e.m.f.)</b>: the electrical work done by a source (cell, battery, generator) in moving a unit charge around a complete circuit. It's the energy <b>supplied</b> to each coulomb.</li>
<li><b>Potential difference (p.d.)</b>: the work done by a unit charge passing through a component. It's the energy <b>transferred</b> from each coulomb to the component (as light, heat, etc.).</li></ul>
$$E=\frac{W}{Q}\qquad V=\frac{W}{Q}\qquad1\text{ V}=1\text{ J/C}$$
<p>A 12 V battery gives 12 J of energy to every coulomb that passes through it. As that coulomb travels round the circuit, it gives all 12 J to the components. In a series circuit, the p.d.s across the components therefore <b>add up to the e.m.f.</b>: energy is conserved.</p>
${(() => { let s = loop(60, 50, 400, 190) + F.comp("cell", 60, 120, { v: true }) + F.comp("lamp", 170, 50) + F.comp("resistor", 300, 50);
  s += F.wire([[140, 50], [140, 100], [200, 100], [200, 50]]) + F.comp("voltmeter", 170, 100) + F.junction(140, 50) + F.junction(200, 50);
  s += F.text(76, 124, "e.m.f. 6 V", "tk small bold", "start") + F.text(300, 30, "p.d. 2 V", "tk small bold") + F.text(170, 30, "p.d. 4 V", "tk small bold");
  return F.fig(440, 240, s, "A voltmeter is connected in <b>parallel</b> across the component it measures. Here the 6 V supply is shared: 4 V + 2 V = 6 V.", { size: "small" }); })()}
<p>Measure p.d. with a <b>voltmeter</b> connected in <b>parallel</b> (across) the component. It compares the energy of the charge on either side. An ideal voltmeter has a very high resistance, so almost no current flows through it.</p>
<div class="callout key"><b class="t">An analogy that works</b>Charges are delivery vans circulating forever round a loop. The battery loads each van with energy parcels (e.m.f. = parcels per van). Each component unloads some parcels (p.d.). Current is how many vans pass per second. Vans are never used up; only energy is transferred.</div>
<div class="callout ex"><b class="t">Worked example</b>A lamp transfers 4320 J when 360 C flow through it. Find the p.d.<br>$V=\dfrac WQ=\dfrac{4320}{360}=12$ V.</div>
<details class="check"><summary>A 9 V battery drives 0.2 A for 10 minutes. How much energy does it supply?</summary><div>$Q=0.2\times600=120$ C, so $W=EQ=9\times120=1080$ J.</div></details>`},

    { h: "Resistance and I–V characteristics (4.2.4)", body: P`
$$R=\frac{V}{I}\qquad(\text{ohms},\ \Omega)$$
<p class="lead">Resistance tells you how much p.d. is needed to push each amp of current through a component. More resistance means less current for the same p.d. 1 Ω means 1 volt per amp.</p>
<h3>The experiment</h3>
${(() => { let s = loop(50, 50, 430, 200) + F.comp("battery", 50, 125, { v: true }) + F.comp("ammeter", 130, 50) + F.comp("variable", 230, 50, { label: "variable resistor" }) + F.comp("resistor", 360, 200, { label: "component under test", ly: 26 });
  s += F.wire([[320, 200], [320, 150], [400, 150], [400, 200]]) + F.comp("voltmeter", 360, 150) + F.junction(320, 200) + F.junction(400, 200);
  return F.fig(480, 250, s, "Ammeter in series, voltmeter in parallel across the component. The variable resistor changes the current so you can take several readings.", { size: "small" }); })()}
<ol class="steps-inline"><li>Set up the circuit above. Adjust the variable resistor to vary the current.</li>
<li>For each setting, record $V$ (voltmeter) and $I$ (ammeter). Take at least 6 readings over a wide range.</li>
<li>Reverse the battery connections to take negative values (this matters for a diode).</li>
<li>Calculate $R=V/I$ for each pair, or plot $I$ against $V$. Switch off between readings so the component doesn't heat up (unless that's what you're studying).</li></ol>
<h3>I–V graphs</h3>
<div class="viz" data-viz="ivGraphs"></div>
${F.row(iv(v => v / 4.5, "Fixed resistor", "straight line through the origin, so $I\\propto V$ and $R$ is constant (ohmic).", "b"), iv(v => Math.sign(v) * 1.4 * Math.tanh(Math.abs(v) / 3), "Filament lamp", "the gradient decreases as $V$ increases, so $R$ increases.", "o"), iv(v => v < .7 ? 0 : Math.min(1.5, (v - .7) * 1.2), "Diode", "current flows only in the forward direction, above about 0.7 V.", "g"))}
<ul><li><b>Fixed resistor (at constant temperature)</b>: a straight line through the origin. Current is directly proportional to p.d., so the resistance is constant. Reversing the p.d. just reverses the current.</li>
<li><b>Filament lamp</b>: a curve that gets <b>less steep</b> as the p.d. increases, so equal increases in $V$ give smaller and smaller increases in $I$, which means the resistance is <b>increasing</b>.</li>
<li><b>Diode</b>: almost no current in the reverse direction (very high resistance). In the forward direction, current starts flowing above about 0.6–0.7 V.</li></ul>
<h3>Why the lamp's resistance rises (S)</h3>
<p>Current is a flow of electrons through a lattice of metal ions. A larger current heats the filament. Hotter ions <b>vibrate more</b>, so the electrons <b>collide with them more often</b>, which makes it harder for them to pass. Resistance increases.</p>
<h3>What affects a wire's resistance (S)</h3>
${F.row(
  (() => { let s = F.rect(20, 30, 120, 16, "k oS", 8) + F.rect(20, 80, 240, 16, "k oS", 8) + F.text(150, 44, "length L: R", "tk small", "start") + F.text(270, 94, "2L: 2R", "tk small bold", "start"); return F.fig(330, 120, s, "$R\\propto L$: twice the length, twice the collisions, twice the resistance."); })(),
  (() => { let s = F.rect(20, 34, 200, 12, "k oS", 6) + F.rect(20, 74, 200, 26, "k oS", 13) + F.text(230, 44, "area A: R", "tk small", "start") + F.text(230, 92, "2A: ½R", "tk small bold", "start"); return F.fig(320, 120, s, "$R\\propto\\dfrac1A$: double the cross-sectional area gives twice as many paths, so half the resistance."); })()
)}
<p>Doubling the <b>diameter</b> multiplies the area by 4, so the resistance falls to ¼. Material and temperature matter too.</p>
<h3>Thermistors and LDRs</h3>
${F.row(
  F.plot({ w: 260, h: 190, x: [0, 10], y: [0, 10], grid: false, xlabel: "temperature", ylabel: "R", m: { l: 20, r: 16, t: 14, b: 18 }, curves: [{ f: x => 9 * Math.exp(-x / 3) + .4, c: "r thick" }], cap: "<b>Thermistor</b>: resistance <b>decreases</b> as temperature increases." }),
  F.plot({ w: 260, h: 190, x: [0, 10], y: [0, 10], grid: false, xlabel: "light intensity", ylabel: "R", m: { l: 20, r: 16, t: 14, b: 18 }, curves: [{ f: x => 9 / (1 + x) + .3, c: "b thick" }], cap: "<b>LDR</b>: resistance <b>decreases</b> as light intensity increases." })
)}
<details class="check"><summary>A resistor has 6.0 V across it and 0.25 A through it. Find its resistance. What current flows at 9.0 V?</summary><div>$R=6.0/0.25=24\,\Omega$. At 9.0 V: $I=9.0/24=0.375$ A (constant $R$).</div></details>`},

    { h: "Electrical power and energy (4.2.5)", body: P`
$$P=IV\qquad E=IVt=Pt$$
<p class="lead">Power is the <b>rate of energy transfer</b>, in watts (1 W = 1 J/s). $P=IV$ follows directly from the definitions: $V$ is joules per coulomb and $I$ is coulombs per second, so $IV$ is joules per second.</p>
<p>Combining with $V=IR$ gives two more useful forms: $P=I^2R$ (when you know the current and resistance) and $P=\dfrac{V^2}{R}$ (when you know the p.d. and resistance). Heating in a wire grows with the <b>square</b> of the current, which is why power lines use high voltages and small currents.</p>
<div class="callout ex"><b class="t">Worked example</b>A 2.3 kW kettle runs on 230 V for 3 minutes. Find the current and the energy transferred.<br>$I=\dfrac PV=\dfrac{2300}{230}=10$ A. $\;E=Pt=2300\times180=414\,000$ J $=414$ kJ.</div>
<h3>The kilowatt-hour</h3>
<p>Joules are tiny for household use, so electricity companies charge per <b>kilowatt-hour (kWh)</b>: the energy transferred by a 1 kW appliance in 1 hour.</p>
$$1\text{ kWh}=1000\text{ W}\times3600\text{ s}=3.6\times10^6\text{ J}$$
<div class="callout ex"><b class="t">Worked example: cost</b>A 2.5 kW heater is used for 4 hours a day for 30 days at 15 cents per kWh. Find the cost.<br>Energy $=2.5\times4\times30=300$ kWh. Cost $=300\times15=4500$ cents $=45$ dollars.</div>
<div class="callout warn"><b class="t">Units</b>For kWh use <b>kW and hours</b>. For joules use <b>W and seconds</b>. Mixing them (kW × seconds) is the commonest error.</div>
<details class="check"><summary>A 60 W bulb is left on for 8 hours. How many kWh is that, and how many joules?</summary><div>$0.060\times8=0.48$ kWh $=0.48\times3.6\times10^6=1.73\times10^6$ J.</div></details>`},

    { h: "Circuit diagrams and symbols (4.3.1)", body: P`
<p class="lead">Circuit diagrams use standard symbols so anyone can read them. You must recognise and draw all of these.</p>
<div class="sym-grid">${sym("cell", "cell")}${sym("battery", "battery")}${sym("switch", "switch (open)")}${sym("switch", "switch (closed)", { closed: true })}${sym("lamp", "lamp")}${sym("resistor", "fixed resistor")}${sym("variable", "variable resistor")}${sym("thermistor", "thermistor")}${sym("ldr", "LDR")}${sym("heater", "heater")}${sym("fuse", "fuse")}${sym("ammeter", "ammeter")}${sym("voltmeter", "voltmeter")}${sym("diode", "diode")}${sym("led", "LED")}${sym("motor", "motor")}</div>
<ul><li>In a <b>cell</b>, the <b>long thin line is positive</b> and the short thick line is negative. A <b>battery</b> is two or more cells joined in series.</li>
<li>Draw wires as straight lines with square corners, and mark junctions (where wires join) with a dot.</li>
<li>A diode's triangle points in the direction conventional current is allowed to flow.</li>
<li>Cells in series facing the same way <b>add</b> their e.m.f.s: three 1.5 V cells make 4.5 V. One reversed cell subtracts.</li></ul>
<details class="check"><summary>What's the difference between the thermistor and variable resistor symbols?</summary><div>The variable resistor has a straight diagonal arrow through it. The thermistor has a diagonal line with a short flat "hook" at the end (no arrowhead).</div></details>`},

    { h: "Series and parallel circuits (4.3.2)", body: P`
${F.row(
  (() => { let s = loop(40, 40, 320, 180) + F.comp("battery", 40, 110, { v: true, label: "6 V", lx: -50 }) + F.comp("lamp", 140, 40) + F.comp("lamp", 240, 40) + F.comp("ammeter", 180, 180) + F.comp("ammeter", 320, 110, { v: true });
    s += F.text(180, 214, "0.3 A", "tk small bold") + F.text(338, 114, "0.3 A", "tk small bold", "start"); return F.fig(380, 230, s, "<b>Series</b>: one path. The current is the same everywhere."); })(),
  (() => { let s = F.wire([[40, 40], [340, 40], [340, 190], [40, 190], [40, 40]]) + F.wire([[220, 40], [220, 190]]) + F.junction(220, 40) + F.junction(220, 190) + F.comp("battery", 40, 115, { v: true, label: "6 V", lx: -50 }) + F.comp("lamp", 220, 115, { v: true }) + F.comp("lamp", 340, 115, { v: true }) + F.comp("ammeter", 130, 40);
    s += F.text(130, 22, "0.6 A", "tk small bold") + F.text(236, 150, "0.3 A", "tk small bold", "start") + F.text(356, 150, "0.3 A", "tk small bold", "start"); return F.fig(400, 230, s, "<b>Parallel</b>: the current splits at the junction and recombines."); })()
)}
<table class="t"><tr><th></th><th>Series</th><th>Parallel</th></tr>
<tr><td>Current</td><td>The <b>same</b> at every point</td><td>Splits between branches: $I=I_1+I_2$; total is larger than in any branch</td></tr>
<tr><td>P.d.</td><td>Shared between components: $V=V_1+V_2$</td><td>The <b>same</b> across each branch (equal to the supply p.d.)</td></tr>
<tr><td>Total resistance</td><td>$R=R_1+R_2$ (adds up)</td><td>$\dfrac1R=\dfrac1{R_1}+\dfrac1{R_2}$ (less than the smallest)</td></tr>
<tr><td>One lamp fails</td><td>All go out</td><td>Others stay on</td></tr></table>
<h3>Why these rules are true</h3>
<ul><li><b>Current rules come from conservation of charge.</b> Charge can't be created, destroyed or pile up at a point, so the current into a junction equals the current out (S). In a series loop there's only one path, so the same current passes everywhere.</li>
<li><b>P.d. rules come from conservation of energy.</b> Each coulomb gets energy $E$ from the supply and gives it all away. In series it gives part to each component, so the p.d.s add. In parallel each coulomb goes through only one branch and gives all its energy there, so each branch has the full p.d.</li></ul>
<h3>Combined resistance</h3>
<p><b>Series</b>: the charge must pass through both resistances one after the other, so they add: $R=R_1+R_2$.</p>
<p><b>Parallel</b>: adding a branch gives the current an <b>extra path</b>, so more current flows for the same p.d. and the total resistance <b>decreases</b>. The combined resistance is <b>always less than the smallest individual resistor</b>. That's a useful check. For two equal resistors, $R_{total}=\tfrac12R$. For two resistors there's a shortcut: $R=\dfrac{R_1R_2}{R_1+R_2}$ (product over sum).</p>
<div class="callout ex"><b class="t">Worked example (S)</b>A 12 V battery is connected to a 6 Ω resistor in series with a parallel pair of 4 Ω and 12 Ω.<br>Parallel pair: $\dfrac1R=\dfrac14+\dfrac1{12}=\dfrac4{12}$, so $R=3\,\Omega$. Total $=6+3=9\,\Omega$.<br>Current from battery: $I=\dfrac{12}{9}=1.33$ A. P.d. across the 6 Ω: $1.33\times6=8$ V. Across the parallel pair: $12-8=4$ V.<br>Branch currents: $\dfrac44=1.0$ A and $\dfrac4{12}=0.33$ A. Check: $1.0+0.33=1.33$ A ✓</div>
<h3>Why houses use parallel circuits</h3>
<p>Each appliance gets the full mains p.d., each can be switched on and off independently, and if one fails the rest keep working. Christmas lights in series all go out when one bulb fails.</p>
<p>Try the simulator below. Switch between series and parallel and compare the electron speeds.</p>
<details class="check"><summary>Three 6 Ω resistors are connected in parallel. What's the total resistance?</summary><div>$\dfrac1R=\dfrac16\times3=\dfrac12$, so $R=2\,\Omega$.</div></details>`},

    { h: "Sensors, potential dividers and diodes (4.3.3)", body: P`
<p class="lead">Two resistors in series share the supply p.d. in the <b>ratio of their resistances</b>. This arrangement, a <b>potential divider</b>, is how electronic sensors turn a change in temperature or light into a change in voltage.</p>
$$\frac{V_1}{V_2}=\frac{R_1}{R_2}\qquad\text{(S)}\qquad\text{equivalently}\qquad V_{out}=V_{in}\times\frac{R_2}{R_1+R_2}$$
<p>Why? The same current $I$ flows through both, so $V_1=IR_1$ and $V_2=IR_2$. Dividing gives the ratio. <b>The bigger resistor takes the bigger share of the p.d.</b></p>
${F.row(
  (() => { let s = F.wire([[60, 30], [60, 230]]) + F.wire([[60, 30], [200, 30], [200, 230], [60, 230]]) + F.comp("battery", 60, 130, { v: true, label: "9 V", lx: -46 }) + F.comp("thermistor", 200, 85, { v: true, label: "thermistor", lx: 26 }) + F.comp("resistor", 200, 175, { v: true, label: "fixed R", lx: 26 });
    s += F.wire([[200, 140], [300, 140]]) + F.wire([[200, 230], [300, 230]]) + F.junction(200, 140) + F.junction(200, 230) + F.circ(300, 140, 4, "k bgF") + F.circ(300, 230, 4, "k bgF") + F.text(310, 190, "V out", "tk bold", "start");
    return F.fig(380, 260, s, "Temperature sensor: as it warms, the thermistor's resistance falls, so it takes less of the p.d. and $V_{out}$ (across the fixed resistor) <b>rises</b>."); })(),
  (() => { let s = F.wire([[60, 30], [60, 230]]) + F.wire([[60, 30], [200, 30], [200, 230], [60, 230]]) + F.comp("battery", 60, 130, { v: true, label: "6 V", lx: -46 }) + F.comp("resistor", 200, 85, { v: true, label: "fixed R", lx: 26 }) + F.comp("ldr", 200, 175, { v: true, label: "LDR", lx: 30 });
    s += F.wire([[200, 140], [300, 140]]) + F.wire([[200, 230], [300, 230]]) + F.junction(200, 140) + F.junction(200, 230) + F.circ(300, 140, 4, "k bgF") + F.circ(300, 230, 4, "k bgF") + F.text(310, 190, "V out", "tk bold", "start");
    return F.fig(380, 260, s, "Darkness sensor: in the dark the LDR's resistance rises, so it takes a bigger share and $V_{out}$ (across the LDR) <b>rises</b>, which can switch on a street light."); })()
)}
<div class="callout ex"><b class="t">Worked example</b>A 9.0 V supply is across a 2.0 kΩ resistor in series with a thermistor of 1.0 kΩ. Find the p.d. across the thermistor.<br>Ratio $1:2$, so the thermistor gets $\tfrac13$ of 9.0 V $=3.0$ V. If the thermistor is heated, its resistance falls, so its share (and its p.d.) <b>decreases</b>.</div>
<div class="callout exam"><b class="t">How to answer "explain what happens to the reading"</b>Chain it: (1) the condition changes (it gets darker); (2) the LDR's resistance <b>increases</b>; (3) so the LDR's <b>share</b> of the supply p.d. increases (the current through both decreases); (4) so the voltmeter across [component] reads more or less. Each link is usually worth a mark.</div>
<h3>Variable potential divider</h3>
<p>A <b>potentiometer</b> is a resistor with a sliding contact. Moving the slider changes the ratio of the two parts, giving any output p.d. from 0 up to the full supply. Volume controls and dimmer switches work this way.</p>
<h3>Diodes and LEDs</h3>
<p>A <b>diode</b> lets current flow in <b>one direction only</b>. Uses: protecting circuits from batteries inserted the wrong way round, and <b>rectification</b> (turning a.c. into d.c.). An <b>LED</b> (light-emitting diode) is a diode that emits light when current flows forwards. It's very efficient, used as an indicator light and for lighting.</p>
<details class="check"><summary>In the temperature sensor above, what happens to $V_{out}$ if the room cools?</summary><div>The thermistor's resistance increases, so it takes a larger share of the 9 V, and $V_{out}$ across the fixed resistor decreases.</div></details>`},

    { h: "Electrical safety (4.4)", body: P`
<h3>Hazards</h3>
<ul><li><b>Damaged insulation</b>: exposed live wires can give a fatal electric shock, or short-circuit and start a fire.</li>
<li><b>Overheating of cables</b>: too large a current (too many appliances on one socket, or cables too thin for the current) heats the wires, which can melt insulation and start a fire.</li>
<li><b>Damp conditions</b>: water conducts electricity, so it can create a path from a live wire through a person to earth. That's why bathroom sockets are banned or specially protected.</li></ul>
<h3>The three wires</h3>
${(() => { let s = F.rect(60, 30, 300, 200, "k mS", 24);
  s += F.rect(190, 50, 22, 50, "k bgF", 3) + F.text(201, 116, "E", "tk bold");
  s += F.rect(90, 160, 50, 22, "k bgF", 3) + F.text(115, 202, "N", "tk bold") + F.rect(280, 160, 50, 22, "k bgF", 3) + F.text(305, 202, "L", "tk bold");
  s += F.rect(250, 120, 60, 18, "k oS", 4) + F.text(280, 134, "fuse", "tk small bold") + F.line(300, 138, 305, 160, "o thick");
  s += F.path("M210,250 C210,200 210,140 201,100", "g thick") + F.path("M200,250 C190,220 140,200 115,182", "b thick") + F.path("M220,250 C230,200 260,150 280,138", "o thick");
  s += F.rect(180, 230, 60, 22, "k bgF", 4) + F.text(210, 246, "cord grip", "tk small");
  s += F.text(380, 70, "earth: green/yellow", "tg small bold", "start") + F.text(380, 100, "neutral: blue", "tb small bold", "start") + F.text(380, 130, "live: brown (via fuse)", "to small bold", "start");
  return F.fig(540, 270, s, "Inside a UK-style three-pin plug. The fuse is connected to the live pin. The cord grip clamps the cable's outer insulation.", { size: "wide" }); })()}
<ul><li><b>Live</b> (brown): carries the alternating high p.d. from the supply. It's the dangerous wire.</li>
<li><b>Neutral</b> (blue): completes the circuit and stays close to 0 V.</li>
<li><b>Earth</b> (green and yellow stripes): a safety wire connecting the appliance's metal case to the ground. It normally carries no current.</li></ul>
<h3>Fuses and circuit breakers</h3>
<p>A <b>fuse</b> is a short, thin wire in a cartridge, connected in the <b>live</b> wire. If the current goes above the fuse's rating, the wire heats up and <b>melts</b>, breaking the circuit and cutting off the supply. It must then be replaced.</p>
<p>A <b>circuit breaker</b> (trip switch) does the same job with an electromagnet (or a bimetallic strip) that <b>opens a switch</b> when the current is too large. It acts faster than a fuse and can simply be <b>reset</b>.</p>
<p><b>Choosing a fuse:</b> work out the normal current with $I=\dfrac PV$, then choose the <b>next standard rating above</b> it (common ratings: 3 A, 5 A, 13 A). If it's too high it won't blow when it should; too low and it blows in normal use. A 2.3 kW kettle on 230 V draws 10 A, so it needs a 13 A fuse.</p>
<h3>Earthing: how it protects you</h3>
${(() => { let s = F.rect(200, 50, 200, 140, "k mS", 10) + F.text(210, 180, "metal case", "tk small bold", "start");
  s += F.wire([[40, 90], [300, 90], [300, 140]]) + F.comp("fuse", 120, 90) + F.text(30, 94, "L", "to bold", "end") + F.path("M300,140 L320,150 L310,160 L330,172", "r thick") + F.text(410, 160, "fault: live wire", "tr small bold", "start") + F.text(410, 176, "touches case", "tr small bold", "start");
  s += F.wire([[40, 130], [180, 130]]) + F.text(30, 134, "N", "tb bold", "end");
  s += F.wire([[330, 190], [330, 240]]) + F.line(310, 240, 350, 240, "k") + F.line(316, 247, 344, 247, "k") + F.line(322, 254, 338, 254, "k") + F.text(360, 230, "earth wire to ground", "tg small bold", "start");
  s += F.arrow(60, 74, 110, 74, "r mid", 8) + F.arrow(342, 200, 342, 230, "r mid", 8) + F.text(40, 60, "large current → fuse melts", "tr small bold", "start");
  return F.fig(560, 270, s, "If the live wire touches the case, a large current flows through the low-resistance earth wire. That blows the fuse and disconnects the live supply, so the case can't stay live.", { size: "wide" }); })()}
<ol class="steps-inline"><li>A fault makes the live wire touch the metal case.</li><li>The earth wire provides a <b>low-resistance path</b> from the case to the ground.</li><li>A very <b>large current</b> flows through the live and earth wires.</li><li>This current exceeds the fuse rating, so the fuse <b>melts</b> (or the breaker trips).</li><li>The live supply is <b>disconnected</b>, so the case is no longer live and is safe to touch.</li></ol>
<h3>Double insulation</h3>
<p>Appliances with a <b>non-conducting (plastic) case</b>, and no metal parts a user can touch, can't give a shock even if a live wire comes loose inside. They need <b>no earth wire</b> (two-core cable). They're marked with the symbol of a square inside a square.</p>
<div class="callout warn"><b class="t">Why the fuse must be in the live wire</b>If it were in the neutral, a blown fuse would stop the current but leave the appliance connected to the live wire at a high p.d. It would look off but still be able to electrocute you.</div>
<details class="check"><summary>A hairdryer is rated 1.2 kW, 230 V. Which fuse: 3 A, 5 A or 13 A?</summary><div>$I=1200/230=5.2$ A, which is just above 5 A, so a 13 A fuse.</div></details>`}
  ],
  worked: [
    { q: P`A 6.0 V battery is connected to 4 Ω and 12 Ω resistors in parallel. Find the total current.`,
      steps: [P`$\dfrac1R=\dfrac14+\dfrac1{12}=\dfrac{3}{12}+\dfrac1{12}=\dfrac{4}{12}$, so $R=3\,\Omega$.`, P`$I=\dfrac VR=\dfrac{6}{3}=2.0$ A. Check: the branches carry $6/4=1.5$ A and $6/12=0.5$ A, which total 2.0 A ✓`]},
    { q: P`A kettle is rated 2.3 kW, 230 V. Which fuse should it use: 3 A, 5 A or 13 A?`,
      steps: [P`$I=\dfrac PV=\dfrac{2300}{230}=10$ A.`, P`Choose the next rating above: <b>13 A</b>.`]},
    { q: P`A 9.0 V supply is connected to a 2.0 kΩ resistor in series with a thermistor of resistance 1.0 kΩ. Find the p.d. across the thermistor. What happens to it if the thermistor is warmed?`,
      steps: [P`Ratio $R_{th}:R=1:2$, so the thermistor gets $\tfrac13$ of 9.0 V $=3.0$ V.`, P`Warming lowers the thermistor's resistance, so it takes a smaller share and its p.d. <b>decreases</b> (and the p.d. across the fixed resistor increases).`]},
    { q: P`A charge of 360 C flows through a lamp in 2 minutes, transferring 4320 J. Find the current and the p.d.`,
      steps: [P`$I=\dfrac Qt=\dfrac{360}{120}=3.0$ A.`, P`$V=\dfrac WQ=\dfrac{4320}{360}=12$ V.`]}
  ],
  formulas: [
    ["Ohm's law / resistance", P`$V=IR$`], ["Current", P`$I=\dfrac Qt$`], ["P.d. / e.m.f.", P`$V=\dfrac WQ$`], ["Power", P`$P=IV=I^2R$`], ["Energy", P`$E=IVt$`],
    ["Series", P`$R=R_1+R_2$`], ["Parallel", P`$\frac1R=\frac1{R_1}+\frac1{R_2}$`], ["Potential divider", P`$\frac{V_1}{V_2}=\frac{R_1}{R_2}$`]
  ],
  cards: [
    ["Define current.", P`Rate of flow of charge, $I=Q/t$.`],
    ["Define potential difference.", P`Work done (energy transferred) per unit charge passing through a component, $V=W/Q$.`],
    ["Define e.m.f.", "Electrical work done by a source in moving a unit charge around a complete circuit."],
    ["What moves when a rod is charged by friction?", "Electrons only."],
    ["Polythene rubbed with a cloth becomes…", "Negative: it gains electrons from the cloth."],
    ["Define an electric field", "A region in which an electric charge experiences a force."],
    ["Direction of an electric field", "The direction of the force on a positive charge."],
    ["Field between parallel plates", "Uniform: evenly spaced parallel lines from + to −."],
    ["Why do metals conduct?", "They contain free (delocalised) electrons that can move."],
    ["Conventional current direction", "From + to − (electrons actually flow − to +)."],
    ["How is an ammeter connected?", "In series."],
    ["How is a voltmeter connected?", "In parallel across the component."],
    ["Why does a filament lamp's resistance increase?", "It heats up, so ions vibrate more and electrons collide more often."],
    ["Resistance vs length and area", P`$R\propto L$ and $R\propto 1/A$.`],
    ["Thermistor: temperature up → resistance?", "Decreases."],
    ["LDR: light up → resistance?", "Decreases."],
    ["What does a diode do?", "It lets current flow in one direction only."],
    ["Current rule at a junction (and why)", "Current in = current out, because charge is conserved."],
    ["Total resistance in parallel compared to the smallest branch?", "Always less."],
    ["Advantages of parallel lighting", "Each lamp gets full p.d., they can be switched independently, and one failing doesn't affect the others."],
    ["What is 1 kWh in joules?", P`$3.6\times10^6$ J`],
    ["Which wire does the fuse go in?", "The live wire."],
    ["How does a fuse work?", "If the current exceeds its rating, the wire heats and melts, breaking the circuit."],
    ["How does earthing protect you?", "A fault makes a large current flow to earth, which blows the fuse and disconnects the live wire."],
    ["What is double insulation?", "A non-conducting case, so the appliance needs no earth wire."],
    ["Three electrical hazards", "Damaged insulation, overheating cables, and damp conditions."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Two 10 Ω resistors in parallel have a combined resistance of`, opts: ["20 Ω", "10 Ω", "5 Ω", "0.2 Ω"], ans: 2, why: P`$\frac1R=\frac1{10}+\frac1{10}=\frac15$, so $R=5\,\Omega$.` },
    { type: "mcq", marks: 2, q: P`In a series circuit with a 12 V supply and resistors of 2 Ω and 4 Ω, the p.d. across the 4 Ω resistor is`, opts: ["4 V", "6 V", "8 V", "12 V"], ans: 2, why: P`$I=12/6=2$ A, so $V=2\times4=8$ V. Or split 12 V in the ratio 2 : 4.` },
    { type: "mcq", marks: 1, q: P`An LDR is moved into darkness. Its resistance`, opts: ["Increases", "Decreases", "Stays the same", "Becomes zero"], ans: 0, why: P`Less light means higher resistance.` },
    { type: "mcq", marks: 1, q: P`A cloth is rubbed on an acetate rod and the rod becomes positive. This is because`, opts: ["Protons moved to the rod", "Electrons moved from the rod to the cloth", "Electrons moved from the cloth to the rod", "Positive ions were created"], ans: 1, why: P`Only electrons move. Losing negative charge leaves the rod positive.` },
    { type: "mcq", marks: 1, q: P`A current of 0.5 A flows for 1 minute. The charge that flows is`, opts: ["0.5 C", "30 C", "120 C", "0.008 C"], ans: 1, why: P`$Q=It=0.5\times60=30$ C. Time must be in seconds.` },
    { type: "mcq", marks: 2, q: P`A 2 kW heater is used for 3 hours at 25 cents per kWh. The cost is`, opts: ["50 cents", "75 cents", "150 cents", "600 cents"], ans: 2, why: P`$2\times3=6$ kWh, and $6\times25=150$ cents.` },
    { type: "mcq", marks: 1, q: P`The direction of an electric field is`, opts: ["The direction electrons move", "The direction of the force on a positive charge", "Always towards a positive charge", "From − to +"], ans: 1, why: P`By definition. So it points away from + and towards −.` },
    { type: "mcq", marks: 1, q: P`A wire is replaced by one of the same material that is twice as long and has twice the cross-sectional area. Its resistance`, opts: ["Doubles", "Halves", "Stays the same", "Quadruples"], ans: 2, why: P`×2 for length and ÷2 for area cancel out.` },
    { type: "struct", marks: 3, q: P`A 60 W lamp runs on 240 V for 5 hours. Calculate the current and the energy transferred in joules.`,
      ms: P`<b>C1</b> $I=P/V=0.25$ A<br><b>M1</b> $E=Pt=60\times5\times3600$<br><b>A1</b> $1.08\times10^6$ J` },
    { type: "struct", marks: 4, q: P`Explain, in terms of electrons, how a polythene rod becomes negatively charged when rubbed with a dry cloth, and why the cloth becomes positively charged.`,
      ms: P`<b>B1</b> friction causes electrons to transfer<br><b>B1</b> from the cloth to the rod<br><b>B1</b> the rod has more electrons than protons, so it is negative<br><b>B1</b> the cloth has lost electrons (more protons than electrons), so it is positive by an equal amount` },
    { type: "struct", marks: 4, q: P`Sketch and explain the shape of the current–voltage graph for a filament lamp.`,
      ms: P`<b>B1</b> a curve through the origin with a decreasing gradient (S-shaped for ± values)<br><b>B1</b> as the current increases, the filament's temperature increases<br><b>B1</b> ions vibrate more, so electrons collide more often<br><b>B1</b> so resistance increases, and current increases less for each extra volt` },
    { type: "struct", marks: 5, q: P`A 12 V battery is connected to a 6 Ω resistor in series with a parallel pair of 4 Ω and 12 Ω resistors. Calculate (a) the total resistance, (b) the current from the battery, (c) the p.d. across the parallel pair.`,
      ms: P`(a) <b>M1</b> parallel pair $=3\,\Omega$ <b>A1</b> total $=9\,\Omega$<br>(b) <b>B1</b> $I=12/9=1.33$ A<br>(c) <b>M1</b> $V=1.33\times3$ <b>A1</b> $4.0$ V (equivalently 12 V − 8 V)` },
    { type: "struct", marks: 4, q: P`An LDR is connected in series with a fixed resistor to a 6 V supply. A voltmeter is across the fixed resistor. Explain what happens to the voltmeter reading as the room gets darker.`,
      ms: P`<b>B1</b> the LDR's resistance increases in the dark<br><b>B1</b> total resistance increases so the current decreases (or: the LDR's share of the p.d. increases)<br><b>B1</b> p.d. across the fixed resistor $=IR$ decreases<br><b>B1</b> so the voltmeter reading decreases` },
    { type: "struct", marks: 4, q: P`Explain how the earth wire and fuse together protect a person if the live wire touches the metal case of a washing machine.`,
      ms: P`<b>B1</b> the earth wire connects the case to the ground with low resistance<br><b>B1</b> a large current flows through the earth wire (not through the person)<br><b>B1</b> this current exceeds the fuse rating, so the fuse melts<br><b>B1</b> the live supply is disconnected, so the case is no longer live` },
    { type: "struct", marks: 3, q: P`A hairdryer is rated 1.2 kW, 230 V. Calculate the normal current and choose a fuse from 3 A, 5 A and 13 A. Explain your choice.`,
      ms: P`<b>M1</b> $I=1200/230$ <b>A1</b> $5.2$ A<br><b>B1</b> 13 A: the next rating above the normal current (5 A would blow in normal use)` },
    { type: "struct", marks: 4, q: P`Describe an experiment to determine the resistance of a wire. Include a circuit diagram description.`,
      ms: P`<b>B1</b> wire in series with an ammeter, a power supply and a variable resistor<br><b>B1</b> voltmeter in parallel across the wire<br><b>B1</b> record $V$ and $I$ for several settings of the variable resistor<br><b>B1</b> $R=V/I$ (average), or the gradient of a $V$ against $I$ graph. Keep the current small or switch off between readings so the wire doesn't heat up.` },
    { type: "struct", marks: 3, q: P`Define e.m.f. and potential difference, and explain why the p.d.s around a series circuit add up to the e.m.f.`,
      ms: P`<b>B1</b> e.m.f.: electrical work done by the source per unit charge moved around the complete circuit<br><b>B1</b> p.d.: work done per unit charge passing through a component<br><b>B1</b> energy is conserved: the energy given to each coulomb by the source is all transferred in the components` },
    { type: "struct", marks: 3, q: P`Draw and describe the electric field pattern between two parallel metal plates, the top one positive and the bottom one negative.`,
      ms: P`<b>B1</b> straight, parallel, equally spaced lines between the plates<br><b>B1</b> perpendicular to the plates<br><b>B1</b> arrows pointing from + (top) to − (bottom)` }
  ]
});
}
