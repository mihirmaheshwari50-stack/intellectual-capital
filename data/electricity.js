window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;

/* ============================================================
   ELECTRICITY  (0625: 4.2.1–4.2.5, 4.3.1–4.3.3, 4.4)
   ============================================================ */
TOPICS.push({
  id: "electricity", subject: "physics", title: "Electricity & circuits",
  blurb: "Charge, fields, current, e.m.f., p.d., resistance, I–V graphs, series and parallel, potential dividers, power and safety.",
  level: "Core → Supplement", demo: "circuit",
  syllabus: [
    ["4.2.1", "Positive and negative charges; like charges repel, unlike attract; charging by friction", 0],
    ["4.2.1 S", "Charging explained by electron transfer; electric fields and their field patterns", 0],
    ["4.2.1", "Conductors and insulators (S: explained by free electrons); charge measured in coulombs", 0],
    ["4.2.2", "Current as a rate of flow of charge, $I=Q/t$; using ammeters; conventional current vs electron flow", 1],
    ["4.2.2 S", "Direct current (d.c.) and alternating current (a.c.)", 1],
    ["4.2.3", "Electromotive force and potential difference as work done per unit charge; using voltmeters", 2],
    ["4.2.4", "Resistance $R=V/I$; the experiment; I–V graphs; $R\\propto L$ and $R\\propto 1/A$", 3],
    ["4.2.5", "Electrical power $P=IV$ and energy $E=IVt$; the kilowatt-hour and cost", 4],
    ["4.3.1", "Draw and interpret circuit diagrams with standard symbols", 5],
    ["4.3.2", "Current, p.d. and resistance in series and parallel circuits (S: calculations, conservation of charge)", 6],
    ["4.3.3", "Action of thermistors, LDRs, diodes and LEDs; potential dividers (S: $V_1/V_2=R_1/R_2$)", 7],
    ["4.4", "Electrical safety: hazards, live/neutral/earth, fuses, circuit breakers, earthing, double insulation", 8]
  ],
  sections: [
    { h: "Electric charge and electric fields", body: P`
<p>There are two kinds of charge: <b>positive</b> and <b>negative</b>. <b>Like charges repel</b> and <b>unlike charges attract</b>. Charge is measured in <b>coulombs (C)</b>. One electron carries $-1.6\times10^{-19}$ C.</p>
<h3>Charging by friction</h3>
<p>Rubbing a polythene rod with a cloth transfers <b>electrons</b> from the cloth to the rod. The rod gains electrons and becomes <b>negative</b>, and the cloth loses electrons and is left <b>positive</b> by an equal amount. With an acetate rod, electrons move the other way.</p>
<div class="callout key"><b class="t">Only electrons move</b>Positive charges (protons) are locked in nuclei and never move in charging. "The rod gains positive charge" earns no marks. Write "the rod <b>loses electrons</b>".</div>
<p><b>Simple test:</b> hang a charged rod so it can rotate and bring another charged rod near it. Repulsion means like charges. Charged objects also attract small uncharged pieces of paper.</p>
<h3>Conductors and insulators</h3>
<p><b>Conductors</b> (metals, graphite) contain <b>free (delocalised) electrons</b> that can move through the material, so charge flows. <b>Insulators</b> (plastic, rubber, glass, dry wood) have electrons held tightly in atoms, so charge stays where it is put. That's why only insulators can be charged by rubbing while held in your hand.</p>
<h3>Electric fields (S)</h3>
<p>An <b>electric field</b> is a region in which an electric charge experiences a force. The <b>direction</b> of the field at a point is the direction of the force on a <b>positive</b> charge placed there: away from positive charges and towards negative charges.</p>
<ul><li><b>Point charge or charged sphere:</b> radial straight lines, outward for +, inward for −. The lines are closer near the charge, where the field is stronger.</li>
<li><b>Between two oppositely charged parallel plates:</b> evenly spaced parallel lines from + to −, a <b>uniform</b> field.</li></ul>
<div class="viz" data-viz="efield"></div>`},
    { h: "Current", body: P`
<p><b>Electric current</b> is the rate of flow of charge:</p>
$$I=\frac{Q}{t}\qquad1\text{ A}=1\text{ C/s}$$
<p>In metals the charge carriers are <b>electrons</b>, which drift from the <b>negative</b> terminal round to the <b>positive</b>. Before electrons were discovered, current was defined as flowing from + to −. This <b>conventional current</b> is still what arrows on circuit diagrams show.</p>
<p>Current is measured with an <b>ammeter</b> connected in <b>series</b> (it must be in the path the charge flows through). An ideal ammeter has almost zero resistance, so it doesn't change the current it measures.</p>
<h3>d.c. and a.c. (S)</h3>
<p><b>Direct current</b> flows in one direction only (cells, batteries). <b>Alternating current</b> repeatedly reverses direction. UK mains is 50 Hz, 230 V, so it reverses 100 times a second. On an oscilloscope, d.c. is a horizontal line and a.c. is a wave.</p>`},
    { h: "E.m.f. and potential difference", body: P`
<p>Both are measured in <b>volts</b>, and both are about <b>energy per unit charge</b>, but in opposite directions:</p>
<ul><li><b>Electromotive force (e.m.f.)</b>: the electrical work done by a source in moving a unit charge around a complete circuit. It is energy <b>given to</b> each coulomb by the cell.</li>
<li><b>Potential difference (p.d.)</b>: the work done by a unit charge passing through a component. It is energy <b>transferred from</b> each coulomb to the component.</li></ul>
$$E=\frac{W}{Q}\qquad V=\frac{W}{Q}\qquad1\text{ V}=1\text{ J/C}$$
<p>A 12 V battery gives 12 J to every coulomb that passes through it. Around the circuit, the coulombs transfer all of that energy to the components. So in a series circuit the p.d.s add up to the e.m.f. (energy is conserved).</p>
<p>P.d. is measured with a <b>voltmeter</b> connected in <b>parallel</b> across the component, because it compares the energy of charge on either side. An ideal voltmeter has very high resistance, so almost no current flows through it.</p>
<div class="callout key"><b class="t">Analogy that works</b>Charges are delivery vans that circulate forever. Voltage is the number of energy parcels each van carries. Current is how many vans pass per second. Components unload the parcels. The vans are never used up; only the energy is transferred.</div>`},
    { h: "Resistance and I–V graphs", body: P`
$$R=\frac{V}{I}\qquad(\text{ohms, }\Omega)$$
<p>Resistance tells you how much p.d. is needed to drive each amp of current through a component. A higher resistance means less current for the same p.d.</p>
<h3>The experiment</h3>
<p>Connect the component in series with an ammeter and a variable resistor (or variable power supply), with a voltmeter in parallel across the component. Vary the p.d., record $V$ and $I$ for several values (and reversed polarity for a diode), and calculate $R=V/I$ for each, or plot $I$ against $V$.</p>
<div class="viz" data-viz="ivGraphs"></div>
<ul>
<li><b>Fixed resistor at constant temperature</b>: a straight line through the origin, so $I\propto V$ and $R$ is constant. This is an <b>ohmic</b> conductor.</li>
<li><b>Filament lamp</b>: the curve gets <b>less steep</b> as $V$ increases, so $R$ <b>increases</b>. Why (S)? A larger current heats the filament. The metal ions vibrate more, the electrons collide with them more often, and the resistance rises.</li>
<li><b>Diode</b>: conducts in one direction only (above about 0.6 V forward). In reverse, the current is almost zero: very high resistance.</li>
</ul>
<h3>What affects a wire's resistance (S)</h3>
<p>$R\propto L$: a wire twice as long has twice the resistance, because electrons make twice as many collisions. $R\propto\dfrac1A$: a wire with twice the cross-sectional area has half the resistance, because it's like two wires side by side, giving more paths. (Doubling the <i>diameter</i> quadruples the area, so it quarters $R$.)</p>
<p>Two special resistors: a <b>thermistor</b>'s resistance <b>decreases as temperature increases</b>, and an <b>LDR</b>'s resistance <b>decreases as light intensity increases</b>.</p>`},
    { h: "Electrical power and energy", body: P`
$$P=IV\qquad E=IVt=Pt$$
<p>Why $P=IV$? $V$ is joules per coulomb and $I$ is coulombs per second. Multiplying gives joules per second, which is watts.</p>
<p>Combining with $V=IR$ gives $P=I^2R$ and $P=\dfrac{V^2}{R}$. These are useful when you don't know one of the quantities.</p>
<h3>Paying for electricity</h3>
<p>Energy companies charge per <b>kilowatt-hour (kWh)</b>: the energy used by a 1 kW appliance in 1 hour, which is $1000\times3600=3.6\times10^6$ J.</p>
<p>A 2.5 kW heater for 4 hours uses $2.5\times4=10$ kWh. At 30 cents per kWh it costs 300 cents. Use <b>kW</b> and <b>hours</b> for kWh calculations and <b>W</b> and <b>seconds</b> for joules.</p>`},
    { h: "Circuit diagrams and components", body: P`
<p>You need to recognise and draw the standard symbols: cell, battery, power supply, a.c. supply, switch, lamp, fixed resistor, variable resistor, thermistor, LDR, heater, fuse, ammeter (A in a circle), voltmeter (V in a circle), diode, LED, motor, generator, transformer, relay and earth.</p>
<ul><li>A <b>cell</b> is one long line and one short line. The long line is <b>positive</b>. A <b>battery</b> is two or more cells in series.</li>
<li>Draw wires as straight lines with right-angle corners, and put a dot at junctions.</li>
<li>Ammeters go in the line, in series. Voltmeters bridge across a component.</li></ul>
<p>Cells in series add their e.m.f.s if they face the same way (and subtract if one is reversed).</p>`},
    { h: "Series and parallel circuits", body: P`
<table class="t"><tr><th></th><th>Series</th><th>Parallel</th></tr>
<tr><td>Current</td><td>The <b>same</b> everywhere</td><td>Splits at junctions: $I=I_1+I_2$</td></tr>
<tr><td>P.d.</td><td>Shared: $V=V_1+V_2$</td><td>The <b>same</b> across each branch</td></tr>
<tr><td>Resistance</td><td>$R=R_1+R_2$</td><td>$\dfrac1R=\dfrac1{R_1}+\dfrac1{R_2}$</td></tr></table>
<p><b>Why?</b> The current rules come from <b>conservation of charge</b>: charge can't pile up or vanish, so whatever flows into a junction must flow out. The p.d. rules come from <b>conservation of energy</b>: each coulomb gives up all the energy it gained, whichever route it takes.</p>
<p>Adding a resistor in parallel <b>decreases</b> the total resistance, because it gives the current an extra path. So the combined resistance of a parallel pair is <b>always less than the smallest branch</b>. That's a great way to check your answer. For two equal resistors in parallel, $R_{total}=\tfrac12R$.</p>
<h3>Why houses use parallel circuits</h3>
<p>Each lamp gets the full mains p.d., each can be switched on and off independently, and if one bulb fails the others stay on. In series, one broken lamp breaks the whole circuit, and adding lamps makes them all dimmer.</p>
<p>Try the circuit simulator below. Switch between series and parallel and watch the electron flow change.</p>`},
    { h: "Sensors and potential dividers", body: P`
<p>Two resistors in series share the supply p.d. in the <b>ratio of their resistances</b> (S):</p>
$$\frac{V_1}{V_2}=\frac{R_1}{R_2}$$
<p>This is a <b>potential divider</b>. The bigger resistor gets the bigger share. A variable resistor (or a potentiometer with a sliding contact) gives a <b>variable</b> output p.d.</p>
<h3>Sensor circuits</h3>
<p>Replace one resistor with a <b>thermistor</b> or <b>LDR</b>. Take a thermistor in series with a fixed resistor, with the output measured across the fixed resistor. As the temperature rises, the thermistor's resistance <b>falls</b>, so it takes a <b>smaller share</b> of the p.d., and the p.d. across the fixed resistor <b>rises</b>. That output can switch on a fan or alarm (often via a relay).</p>
<div class="callout tip"><b class="t">How to answer "explain what happens to the reading"</b>Go step by step: (1) the condition changes, e.g. it gets darker; (2) the LDR's resistance increases; (3) the LDR's share of the p.d. increases (or the current decreases); (4) so the voltmeter reading across X changes in this direction. Each link is usually a mark.</div>
<p><b>Diode:</b> allows current in one direction only. It is used to protect circuits from a reversed battery and to convert a.c. into d.c. (rectification). An <b>LED</b> is a diode that emits light when current flows forwards.</p>`},
    { h: "Electrical safety", body: P`
<h3>Hazards</h3>
<ul><li><b>Damaged insulation</b>: exposed live wires can give a fatal shock.</li>
<li><b>Overheating of cables</b>: too much current (too many appliances on one socket, or cables too thin) heats the wires and can start a fire.</li>
<li><b>Damp conditions</b>: water conducts, so it can create a path from a live wire through a person.</li></ul>
<h3>The three wires</h3>
<p><b>Live</b> (brown) carries the alternating p.d. from the supply. <b>Neutral</b> (blue) completes the circuit, near 0 V. <b>Earth</b> (green and yellow) is a safety wire connected to the metal case, carrying current only when there's a fault.</p>
<h3>Fuses and circuit breakers</h3>
<p>A <b>fuse</b> is a thin wire in the <b>live</b> wire. If the current exceeds the fuse rating, it heats up and <b>melts</b>, breaking the circuit. A <b>circuit breaker</b> (trip switch) does the same job with an electromagnet that opens a switch. It acts faster and can be reset.</p>
<p><b>Choosing a fuse:</b> calculate the normal current $I=P/V$, then choose the <b>next rating above</b> it (e.g. 3 A, 5 A, 13 A). Too high and it won't protect the wiring. Too low and it blows during normal use.</p>
<h3>Earthing (with a fuse)</h3>
<p>If a live wire touches a metal case, a large current flows through the low-resistance <b>earth wire</b> instead of through a person. That large current <b>blows the fuse</b>, disconnecting the live supply. The case is now safe to touch.</p>
<p><b>Double insulation:</b> appliances with plastic (non-conducting) cases don't need an earth wire, because the case can't become live.</p>
<div class="callout warn"><b class="t">Why the fuse must be in the live wire</b>If it were in the neutral, a blown fuse would still leave the appliance connected to the live wire at 230 V. It would look off but still be dangerous.</div>`}
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
