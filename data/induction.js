window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
const pole = (x, y, w, h, n) => F.rect(x, y, w, h, n === "N" ? "r rF" : "b bF", 4) + `<text x="${x + w / 2}" y="${y + h / 2 + 6}" text-anchor="middle" style="fill:#fff;font-weight:700">${n}</text>`;
// pseudo-3D axes for Fleming's rules
const axes3 = (x, y, labs, cols) => F.arrow(x, y, x + 110, y, cols[0] + " thick", 11) + F.arrow(x, y, x, y - 110, cols[1] + " thick", 11) + F.arrow(x, y, x - 62, y + 62, cols[2] + " thick", 11) + F.text(x + 116, y + 5, labs[0], "t" + cols[0] + " small bold", "start") + F.text(x + 6, y - 116, labs[1], "t" + cols[1] + " small bold", "start") + F.text(x - 70, y + 82, labs[2], "t" + cols[2] + " small bold");
const coilV = (x, y, n, h = 60, w = 8, c = "o") => { let s = ""; for (let i = 0; i < n; i++) s += F.line(x, y + i * h / n, x + w * 2, y + i * h / n + h / n / 2, c + " mid"); return s; };
//@@HELPERS-END

/* ============================================================
   ELECTROMAGNETIC EFFECTS: MOTORS, GENERATORS, TRANSFORMERS  (0625: 4.5)
   ============================================================ */
TOPICS.push({
  id: "induction", subject: "physics", unit: 4, title: "Motors, generators & transformers",
  blurb: "The motor effect and Fleming's left-hand rule, the d.c. motor, electromagnetic induction, the a.c. generator, transformers and high-voltage transmission.",
  level: "Core → Supplement", demo: "generator",
  syllabus: [
    ["4.5.4", "Describe an experiment to show a force on a current-carrying conductor in a magnetic field, including the effect of reversing the current or the field", 0],
    ["4.5.4 S", "Recall and use the relative directions of force, field and current (Fleming's left-hand rule)", 1],
    ["4.5.4 S", "Determine the direction of the force on beams of charged particles in a magnetic field", 1],
    ["4.5.5", "A current-carrying coil in a magnetic field experiences a turning effect, increased by more turns, more current and a stronger field", 2],
    ["4.5.5", "Describe the operation of an electric motor, including the split-ring commutator and brushes", 3],
    ["4.5.1", "An e.m.f. is induced in a conductor moving across a field, or by a changing field linking a conductor", 4],
    ["4.5.1", "Describe an experiment to demonstrate electromagnetic induction", 4],
    ["4.5.1", "State the factors affecting the size of an induced e.m.f.", 5],
    ["4.5.1 S", "The direction of an induced e.m.f. opposes the change causing it", 5],
    ["4.5.1 S", "State and use the relative directions of force, field and induced current", 5],
    ["4.5.2", "Describe a simple a.c. generator (rotating coil or magnet) and the use of slip rings and brushes", 6],
    ["4.5.2 S", "Sketch and interpret graphs of e.m.f. against time; relate coil position to peaks, troughs and zeros", 6],
    ["4.5.6", "Describe the construction of a simple transformer with a soft iron core; use primary, secondary, step-up, step-down", 7],
    ["4.5.6", "Recall and use Vp/Vs = Np/Ns", 7],
    ["4.5.6 S", "Explain how a transformer works; recall and use IpVp = IsVs for 100% efficiency", 8],
    ["4.5.6", "Describe the use of transformers in high-voltage transmission; state its advantages", 9],
    ["4.5.6 S", "Use P = I²R to explain why power losses in cables are smaller at higher voltage", 9]
  ],
  sections: [
    { h: "The motor effect (4.5.4)", body: P`
<p class="lead">A wire carrying a current in a magnetic field feels a <b>force</b>. This is the <b>motor effect</b>, and it is how every electric motor and loudspeaker works.</p>
${(() => { let s = F.line(40, 190, 520, 140, "k thick") + F.line(40, 230, 520, 180, "k thick") + pole(200, 40, 140, 50, "N") + pole(200, 240, 140, 50, "S");
  s += F.rect(258, 150, 16, 56, "o oS o", 6) + F.text(280, 140, "loose copper rod", "to small bold", "start") + F.arrow(266, 178, 330, 172, "g thick", 11) + F.text(360, 222, "rod rolls along the rails", "tg small bold", "start");
  s += F.text(40, 180, "rails", "tk small", "start") + F.line(40, 190, 40, 270, "k") + F.line(40, 230, 20, 230, "k") + F.text(10, 290, "d.c. supply", "tk small", "start") + F.rect(10, 250, 40, 20, "k bgF", 3);
  return F.fig(560, 300, s, "The 'catapult' or rail experiment: a current through the copper rod, in the vertical field of the magnet, makes the rod roll.", { size: "wide" }); })()}
<ul><li><b>Reverse the current</b> → the force reverses (the rod rolls the other way).</li>
<li><b>Reverse the magnetic field</b> (swap the poles) → the force reverses.</li>
<li>Reverse <b>both</b> → the force is in the original direction.</li>
<li>The force is <b>biggest</b> when the wire is at 90° to the field, and <b>zero</b> if the wire is parallel to the field.</li>
<li>A bigger current or a stronger magnet gives a bigger force.</li></ul>
<div class="callout why"><b class="t">Why it happens</b>The current creates its own circular magnetic field. This combines with the magnet's field: on one side of the wire the fields add (strong), on the other they cancel (weak). The wire is pushed from the strong-field side towards the weak-field side.</div>
<details class="check"><summary>A wire between magnet poles is pushed upwards. State two ways to make it be pushed downwards.</summary><div>Reverse the current; or reverse the magnetic field (turn the magnet round).</div></details>`},

    { h: "Fleming's left-hand rule and charged beams (4.5.4 S)", body: P`
<p class="lead">The force, field and current are all at <b>right angles</b> to each other. Fleming's left-hand rule tells you which way the force acts.</p>
${(() => { let s = axes3(200, 160, ["First finger: Field (N → S)", "thuMb: Motion (force)", "seCond finger: Current"], ["b", "g", "o"]);
  s += F.text(380, 70, "LEFT hand:", "tk bold", "start") + F.text(380, 92, "hold thumb, first and", "tk small", "start") + F.text(380, 108, "second fingers at", "tk small", "start") + F.text(380, 124, "right angles", "tk small", "start");
  return F.fig(560, 260, s, "Fleming's LEFT-hand rule (motors): Field, Current, Motion. Current means conventional current (+ to −).", { size: "wide" }); })()}
<h3>Beams of charged particles</h3>
<p>A beam of charged particles is a current, so it is pushed sideways in a magnetic field too. Because the force is always at right angles to the motion, the beam follows a <b>circular arc</b>.</p>
${(() => { let s = F.rect(60, 30, 300, 220, "m mS", 6); for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) { const x = 100 + i * 60, y = 60 + j * 55; s += F.line(x - 6, y - 6, x + 6, y + 6, "m thin") + F.line(x + 6, y - 6, x - 6, y + 6, "m thin"); }
  s += F.text(210, 296, "magnetic field into the page (×)", "tm small bold") + F.arrow(10, 140, 60, 140, "o thick", 10) + F.text(10, 128, "beam", "to small bold", "start");
  s += F.path("M60,140 Q190,140 250,240", "r thick") + F.text(240, 268, "electrons curve down", "tr small bold") + F.path("M60,140 Q190,140 250,40", "b thick") + F.text(250, 22, "positive particles curve up", "tb small bold");
  return F.fig(420, 305, s, "Positive and negative charges curve in opposite directions. For electrons, the conventional current is opposite to their motion: point your second finger backwards along the beam.", { size: "small" }); })()}
<div class="callout exam"><b class="t">Electron beams</b>Electrons flow from − to +, but Fleming's rule uses conventional current (+ to −). So for an electron beam, point your second finger <b>opposite</b> to the way the electrons travel.</div>
<details class="check"><summary>A horizontal wire runs east–west with current flowing east. The field points north. Which way is the force?</summary><div>First finger north, second finger east, thumb points vertically up. Force upwards.</div></details>`},

    { h: "The turning effect on a coil (4.5.5)", body: P`
<p class="lead">Bend the wire into a rectangular coil and put it in a field. The current flows <b>one way</b> along one side and <b>the opposite way</b> along the other side, so the two forces are in <b>opposite directions</b>: a turning effect.</p>
${(() => { let s = pole(20, 50, 60, 150, "N") + pole(480, 50, 60, 150, "S"); for (let k = 0; k < 5; k++) s += F.line(84, 70 + k * 28, 476, 70 + k * 28, "m thin d");
  s += F.line(190, 125, 370, 125, "k thick") + F.circ(190, 125, 16, "o bgF o") + F.dot(190, 125, "o", 5) + F.circ(370, 125, 16, "o bgF o") + F.line(360, 115, 380, 135, "o mid") + F.line(380, 115, 360, 135, "o mid");
  s += F.arrow(190, 105, 190, 40, "g thick", 11) + F.text(180, 46, "force up", "tg small bold", "end") + F.arrow(370, 145, 370, 210, "g thick", 11) + F.text(380, 208, "force down", "tg small bold", "start");
  s += F.text(190, 165, "current out (•)", "to small bold") + F.text(370, 100, "current in (×)", "to small bold") + F.text(280, 30, "coil turns clockwise ↻", "tc small bold");
  return F.fig(560, 240, s, "The coil seen end-on. Current flows in opposite directions along its two sides, so the forces on them are opposite: a turning effect.", { size: "wide" }); })()}
<p>The turning effect is <b>increased</b> by:</p>
<ul><li>increasing the <b>number of turns</b> on the coil;</li><li>increasing the <b>current</b>;</li><li>using a <b>stronger magnetic field</b>.</li></ul>
<p>(A larger coil area and winding the coil on a soft iron core also help in practice.)</p>`},

    { h: "The d.c. electric motor (4.5.5)", body: P`
<div class="viz" data-viz="motor"></div>
<p class="lead">On its own, a coil would only turn until it was vertical, then rock back. Two parts keep it spinning.</p>
<ul><li><b>Split-ring commutator</b>: a ring cut into two halves, attached to the coil's ends and rotating with it. Every <b>half turn</b>, as the coil passes the vertical position, the commutator <b>reverses the current</b> in the coil. So the side of the coil on the left always has current in the same direction, and the forces keep turning the coil the same way.</li>
<li><b>Brushes</b>: carbon (graphite) blocks that press against the commutator and carry current into the rotating coil without wires twisting.</li></ul>
${(() => { let s = pole(20, 50, 50, 130, "N") + pole(450, 50, 50, 130, "S") + F.poly([[150, 70], [330, 70], [330, 160], [150, 160]], "k thick") + F.line(150, 160, 230, 205, "k thick") + F.line(330, 160, 250, 205, "k thick");
  s += F.path("M224,205 A16,16 0 0 0 224,237", "o thick") + F.path("M256,205 A16,16 0 0 1 256,237", "b thick") + F.rect(195, 214, 14, 16, "m mF") + F.rect(271, 214, 14, 16, "m mF") + F.line(195, 222, 130, 222, "k") + F.line(285, 222, 350, 222, "k");
  s += F.text(240, 262, "split-ring commutator", "tk small bold") + F.text(110, 216, "brush", "tm small", "end") + F.text(370, 216, "brush", "tm small", "start") + F.rect(120, 230, 240, 0, "k");
  return F.fig(520, 275, s, "A simple d.c. motor: coil, magnets, split-ring commutator and carbon brushes.", { size: "small" }); })()}
<div class="callout exam"><b class="t">Why does it keep going past vertical?</b>At the vertical position the forces are in line with each other, so there is no turning effect. The coil's momentum carries it past; at that moment the commutator gaps pass the brushes and the current reverses, so the forces now turn it onward. Real motors use several coils at different angles for a smooth, strong turning effect.</div>`},

    { h: "Electromagnetic induction (4.5.1)", body: P`
<p class="lead">Faraday reversed the motor effect: <b>moving</b> a conductor in a magnetic field, or <b>changing</b> the field through a coil, <b>induces an e.m.f.</b> across it. If the circuit is complete, an induced current flows.</p>
<div class="viz" data-viz="induction"></div>
<h3>Demonstrations</h3>
${F.row(
  (() => { let s = pole(60, 30, 60, 50, "N") + pole(60, 140, 60, 50, "S") + F.line(170, 110, 20, 110, "o thick") + F.arrow(150, 110, 150, 70, "g mid", 9) + F.text(158, 74, "move wire", "tg small bold", "start") + F.text(158, 90, "up or down", "tg small bold", "start");
    s += F.line(20, 110, 20, 210, "k") + F.line(140, 110, 200, 110, "k") + F.line(200, 110, 200, 210, "k") + F.line(20, 210, 200, 210, "k") + F.circ(110, 210, 18, "k bgF") + F.text(110, 215, "G", "tk bold");
    return F.fig(240, 240, s, "Move a wire across the field (cutting the field lines): the sensitive meter (galvanometer) flicks."); })(),
  (() => { let s = coilV(150, 70, 10, 90, 10, "o") + F.rect(30, 98, 70, 26, "b bF") + F.rect(100, 98, 30, 26, "r rF") + F.arrow(70, 140, 120, 140, "g mid", 9) + F.text(70, 160, "push in", "tg small bold");
    s += F.line(150, 70, 150, 40, "k") + F.line(170, 160, 240, 160, "k") + F.line(150, 40, 240, 40, "k") + F.line(240, 40, 240, 160, "k") + F.circ(240, 100, 18, "k bgF") + F.text(240, 105, "G", "tk bold");
    return F.fig(270, 200, s, "Push a magnet into a coil: the meter deflects. Pull it out: it deflects the other way. Hold it still: no reading."); })()
)}
<div class="callout key"><b class="t">The key idea</b>An e.m.f. is induced only while the magnetic field linking the conductor is <b>changing</b> (or the conductor is <b>cutting</b> field lines). No relative movement → no e.m.f.</div>`},

    { h: "Size and direction of the induced e.m.f. (4.5.1)", body: P`
<h3>Factors that increase the induced e.m.f.</h3>
<ul><li>Moving the magnet or wire <b>faster</b> (field changes more quickly).</li><li>Using a <b>stronger magnet</b>.</li><li>Using <b>more turns</b> on the coil.</li><li>(Larger coil area; moving at right angles to the field.)</li></ul>
<h3>Direction: the induced current opposes the change (S)</h3>
<p>Push a N pole into a coil and the induced current makes the near end of the coil a <b>N pole</b>, which <b>repels</b> the magnet. Pull it out and the near end becomes a <b>S pole</b>, which <b>attracts</b> it back. Either way, you have to do work against the force. That work is the source of the electrical energy: energy is conserved.</p>
${F.row(
  (() => { let s = coilV(120, 40, 10, 90, 10, "o") + F.rect(10, 70, 50, 26, "b bF") + F.rect(60, 70, 30, 26, "r rF") + F.text(75, 88, "N", "tk small bold") + F.arrow(40, 120, 90, 120, "g mid", 8) + F.text(110, 150, "N", "tr bold", "end") + F.text(125, 165, "induced N repels the magnet", "tr small bold");
    return F.fig(250, 180, s, "N pole pushed in → induced N pole: repulsion."); })(),
  (() => { let s = coilV(120, 40, 10, 90, 10, "o") + F.rect(10, 70, 50, 26, "b bF") + F.rect(60, 70, 30, 26, "r rF") + F.arrow(90, 120, 40, 120, "g mid", 8) + F.text(110, 150, "S", "tb bold", "end") + F.text(125, 165, "induced S attracts the magnet", "tb small bold");
    return F.fig(250, 180, s, "N pole pulled out → induced S pole: attraction."); })()
)}
<h3>Fleming's right-hand rule (S)</h3>
${(() => { let s = axes3(200, 160, ["First finger: Field", "thuMb: Motion of wire", "seCond finger: induced Current"], ["b", "g", "o"]);
  s += F.text(380, 80, "RIGHT hand", "tk bold", "start") + F.text(380, 102, "for generators", "tk small", "start");
  return F.fig(560, 260, s, "Fleming's RIGHT-hand rule (generators): motion of the conductor, field and induced current are at right angles.", { size: "wide" }); })()}
<div class="callout exam"><b class="t">Left vs right</b>Left hand for motors (current in → motion out). Right hand for generators (motion in → current out). "Driving on the left" — motors use the left.</div>`},

    { h: "The a.c. generator (4.5.2)", body: P`
<p class="lead">An <b>a.c. generator</b> (alternator) spins a coil in a magnetic field (or spins a magnet inside a coil). The sides of the coil cut the field lines, inducing an <b>alternating</b> e.m.f.</p>
${(() => { let s = pole(20, 50, 50, 130, "N") + pole(450, 50, 50, 130, "S") + F.poly([[150, 70], [330, 70], [330, 160], [150, 160]], "k thick") + F.line(150, 160, 225, 200, "k thick") + F.line(330, 160, 255, 215, "k thick");
  s += `<ellipse cx="240" cy="200" rx="26" ry="8" class="o thick"/><ellipse cx="240" cy="218" rx="26" ry="8" class="b thick"/>` + F.rect(200, 192, 12, 14, "m mF") + F.rect(268, 210, 12, 14, "m mF") + F.line(200, 199, 120, 199, "k") + F.line(280, 217, 360, 217, "k") + F.text(240, 248, "slip rings (each end of the coil to its own ring)", "tk small bold") + F.text(110, 194, "brush", "tm small", "end") + F.text(370, 212, "brush", "tm small", "start");
  return F.fig(520, 265, s, "Slip rings and brushes connect the rotating coil to the outside circuit without the wires twisting. Unlike a commutator, they do not reverse the connections, so the output is a.c.", { size: "small" }); })()}
<div class="callout warn"><b class="t">Commutator vs slip rings</b>A motor (and a d.c. dynamo) uses a <b>split-ring commutator</b>, which reverses the connections every half turn. An a.c. generator uses <b>slip rings</b>, which keep each end of the coil connected to the same terminal.</div>
<h3>The e.m.f.–time graph (S)</h3>
${F.plot({ w: 560, h: 270, x: [0, 2], y: [-1.3, 1.3], grid: false, ticks: { x: [1, 2], y: [] }, tickFmt: { x: v => v + (v === 1 ? " turn" : " turns") }, xlabel: "", ylabel: "e.m.f.",
  curves: [{ f: x => Math.sin(2 * Math.PI * x), c: "c thick" }],
  marks: [{ x: 0, y: 0, c: "k", label: "A", pos: "nw" }, { x: .25, y: 1, c: "k", label: "B", pos: "n" }, { x: .5, y: 0, c: "k", label: "C", pos: "ne" }, { x: .75, y: -1, c: "k", label: "D", pos: "s" }],
  cap: "A, C: coil plane at 90° to the field: sides move along the field lines, cutting none → e.m.f. zero. B, D: coil plane parallel to the field: sides cut lines fastest → peak e.m.f. (opposite signs, since each side now moves the other way).", size: "wide" })}
<ul><li><b>Faster rotation</b>: higher peak e.m.f. <b>and</b> higher frequency (more cycles per second).</li>
<li><b>More turns, stronger magnet</b>: higher peak only.</li></ul>
<p>Try it in the interactive lab at the end of the lesson.</p>`},

    { h: "Transformers (4.5.6)", body: P`
<p class="lead">A <b>transformer</b> changes the size of an <b>alternating</b> voltage. It has two coils, the <b>primary</b> (input) and the <b>secondary</b> (output), wound on a <b>soft iron core</b>.</p>
${(() => { let s = F.path("M140,40 L380,40 L380,220 L140,220 Z M180,80 L340,80 L340,180 L180,180 Z", "m mS") ;
  for (let i = 0; i < 5; i++) s += F.line(124, 60 + i * 30, 196, 72 + i * 30, "o thick");
  for (let i = 0; i < 10; i++) s += F.line(324, 52 + i * 16, 396, 60 + i * 16, "b thick");
  s += F.line(124, 60, 60, 60, "k") + F.line(124, 180, 60, 180, "k") + F.circ(60, 120, 22, "k bgF") + F.text(60, 126, "~", "tk big bold") + F.line(60, 60, 60, 98, "k") + F.line(60, 142, 60, 180, "k");
  s += F.line(396, 52, 470, 52, "k") + F.line(396, 196, 470, 196, "k") + F.rect(460, 100, 20, 50, "k bgF") + F.line(470, 52, 470, 100, "k") + F.line(470, 150, 470, 196, "k");
  s += F.text(160, 250, "primary coil (Np turns)", "to small bold") + F.text(360, 250, "secondary coil (Ns turns)", "tb small bold") + F.text(260, 30, "soft iron core", "tm small bold") + F.text(40, 210, "a.c. in", "tk small bold") + F.text(480, 230, "a.c. out", "tk small bold");
  return F.fig(540, 265, s, "More turns on the secondary than the primary: a step-up transformer.", { size: "wide" }); })()}
$$\frac{V_p}{V_s}=\frac{N_p}{N_s}$$
<ul><li><b>Step-up</b> transformer: more turns on the secondary ($N_s>N_p$) → output voltage higher.</li>
<li><b>Step-down</b> transformer: fewer turns on the secondary → output voltage lower (phone chargers, doorbells).</li></ul>
<h3>Example</h3>
<p>A transformer has 4000 turns on the primary and 200 on the secondary. The input is 230 V. Output?</p>
$$V_s=V_p\times\frac{N_s}{N_p}=230\times\frac{200}{4000}=11.5\ \text{V}$$
<details class="check"><summary>A step-up transformer changes 25 kV to 400 kV. Its primary has 500 turns. How many turns on the secondary?</summary><div>$N_s=500\times400/25=8000$ turns.</div></details>`},

    { h: "How a transformer works; power in = power out (4.5.6 S)", body: P`
<ol class="steps-inline"><li>An <b>alternating current</b> in the primary coil produces a magnetic field that is constantly <b>changing</b> in size and direction.</li>
<li>The <b>soft iron core</b> is magnetised and demagnetised easily, and carries this changing field through the secondary coil.</li>
<li>The <b>changing field</b> linking the secondary <b>induces an alternating e.m.f.</b> in it (electromagnetic induction).</li>
<li>Each turn of the secondary has the same e.m.f. induced, so the total is proportional to the number of turns.</li></ol>
<div class="callout warn"><b class="t">Transformers don't work on d.c.</b>A steady direct current makes a steady field. A steady field induces nothing, so the secondary output is zero (except for a brief pulse at switch-on and switch-off).</div>
<h3>Efficiency</h3>
<p>For an ideal (100% efficient) transformer, the power in equals the power out:</p>
$$I_pV_p=I_sV_s$$
<p>So when a transformer <b>steps up the voltage</b> it <b>steps down the current</b> by the same factor, and vice versa. Real transformers are about 95–99% efficient: some energy heats the coils (resistance) and the core.</p>
<details class="check"><summary>An ideal transformer steps 230 V down to 12 V. The secondary current is 2.0 A. Find the primary current.</summary><div>$I_p=I_sV_s/V_p=2.0\times12/230=0.104$ A.</div></details>`},

    { h: "High-voltage transmission (4.5.6)", body: P`
${(() => { let s = ""; const st = [[10, "power station", "25 kV", "k"], [130, "step-up", "→ 400 kV", "o"], [250, "pylons, cables", "400 kV", "r"], [380, "step-down", "→ 230 V", "b"], [500, "homes", "230 V", "g"]];
  st.forEach(([x, n, v, c], i) => { s += F.rect(x, 50, 104, 50, c + "S " + c, 8) + F.text(x + 52, 72, n, "t" + c + " small bold") + F.text(x + 52, 90, v, "tk small"); if (i < 4) s += F.arrow(x + 106, 75, st[i + 1][0] - 4, 75, "m mid", 8); });
  s += F.text(305, 140, "high voltage, LOW current in the long cables", "tr small bold");
  return F.fig(620, 160, s, "The National Grid: step up for transmission, step down for safe use.", { size: "wide" }); })()}
<p class="lead">Electricity is sent across the country at very <b>high voltages</b> (hundreds of kV), then stepped down for homes.</p>
<h3>Why? (S)</h3>
<p>The power delivered is $P=IV$. For the same power, a <b>higher voltage</b> means a <b>smaller current</b>. The power wasted as heat in the cables is</p>
$$P_\text{lost}=I^2R$$
<p>Because the loss depends on $I^2$, cutting the current by a factor of 10 cuts the losses by a factor of <b>100</b>.</p>
<h3>Example (S)</h3>
<p>A power station sends 10 MW through cables of total resistance 5 Ω.</p>
<table class="t"><tr><th></th><th>At 25 kV</th><th>At 400 kV</th></tr>
<tr><td>Current $I=P/V$</td><td>400 A</td><td>25 A</td></tr>
<tr><td>Power lost $I^2R$</td><td>$400^2\times5=800$ kW (8%)</td><td>$25^2\times5=3.1$ kW (0.03%)</td></tr></table>
<h3>Advantages of high-voltage transmission</h3>
<ul><li>Much smaller energy losses in the cables (less heating).</li><li>Smaller current → <b>thinner, cheaper, lighter</b> cables, and fewer, lighter pylons.</li></ul>
<p>The high voltage is dangerous, so cables are carried high on pylons or buried, and step-down transformers reduce it to 230 V before it reaches homes.</p>`}
  ],
  worked: [
    { q: P`S: A transformer has 1200 turns on its primary and 60 turns on its secondary. The primary is connected to 240 V a.c. (a) Find the output voltage. (b) A 12 W lamp works normally on the output. Assuming 100% efficiency, find the primary current.`,
      steps: [P`(a) $V_s=240\times60/1200=12$ V.`, P`(b) Power in = power out = 12 W.`, P`$I_p=P/V_p=12/240=0.050$ A.`]},
    { q: P`S: 50 kW is transmitted through cables of resistance 2.0 Ω. Compare the power lost when sent at 500 V and at 50 kV.`,
      steps: [P`At 500 V: $I=50\,000/500=100$ A; loss $=100^2\times2.0=20\,000$ W (40% of the power!).`, P`At 50 kV: $I=1.0$ A; loss $=1.0^2\times2.0=2.0$ W.`, P`100× the voltage → 1/100 of the current → 1/10 000 of the loss.`]},
    { q: P`Explain why an a.c. generator produces an alternating e.m.f.`,
      steps: [P`As the coil rotates, its sides cut the magnetic field lines, inducing an e.m.f.`, P`After half a turn, each side is moving in the opposite direction through the field (up instead of down).`, P`So the induced e.m.f. reverses every half turn; slip rings keep the connections fixed, so the output alternates.`]}
  ],
  formulas: [["Transformer turns ratio", P`$\dfrac{V_p}{V_s}=\dfrac{N_p}{N_s}$`], ["Ideal transformer (S)", P`$I_pV_p=I_sV_s$`], ["Power", P`$P=IV$`], ["Cable loss (S)", P`$P=I^2R$`], ["Fleming's left hand (S)", "Field, Current, Motion (motors)"], ["Fleming's right hand (S)", "Field, Motion, induced Current (generators)"]],
  cards: [
    ["What is the motor effect?", "A current-carrying wire in a magnetic field experiences a force."],
    ["How do you reverse the force on a wire?", "Reverse the current or reverse the field."],
    ["Fleming's left-hand rule (S)", "First finger = Field, seCond = Current, thuMb = Motion (force)."],
    ["Force on an electron beam: which way is current? (S)", "Opposite to the electrons' motion."],
    ["3 ways to increase a motor's turning effect", "More turns, more current, stronger magnetic field."],
    ["Job of the split-ring commutator", "Reverses the current in the coil every half turn so it keeps turning the same way."],
    ["Job of the brushes", "Carry current to/from the rotating commutator or slip rings."],
    ["What is electromagnetic induction?", "An e.m.f. induced when a conductor cuts field lines or the field linking it changes."],
    ["Magnet held still inside a coil", "No induced e.m.f. (field not changing)."],
    ["Factors increasing induced e.m.f.", "Faster movement, stronger magnet, more turns."],
    ["Direction of induced e.m.f. (S)", "Opposes the change producing it (Lenz's law)."],
    ["Fleming's right-hand rule (S)", "First = Field, thuMb = Motion, seCond = induced Current."],
    ["Slip rings vs commutator", "Slip rings: a.c. generator (no reversal). Commutator: motor / d.c. (reverses every half turn)."],
    ["a.c. generator: when is e.m.f. zero? (S)", "When the coil plane is at 90° to the field (sides move along the field lines)."],
    ["a.c. generator: when is e.m.f. maximum? (S)", "When the coil plane is parallel to the field (sides cut lines fastest)."],
    ["Faster rotation of a generator gives…", "Higher peak e.m.f. and higher frequency."],
    ["Transformer equation", "Vp/Vs = Np/Ns"],
    ["Step-up transformer", "More secondary turns than primary: increases voltage."],
    ["Why must a transformer use a.c.? (S)", "Only a changing field induces an e.m.f. in the secondary."],
    ["Why a soft iron core?", "Easily magnetised and demagnetised; carries the changing field to the secondary."],
    ["Ideal transformer power (S)", "IpVp = IsVs"],
    ["Why transmit at high voltage?", "Smaller current, so much less energy lost as heat in cables; thinner cables."],
    ["Power lost in cables (S)", "P = I²R: halving the current quarters the loss."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`The force on a current-carrying wire in a magnetic field is zero when the wire is`, opts: ["at 90° to the field", "parallel to the field", "carrying a large current", "made of copper"], ans: 1, why: P`No force when current is parallel to the field.` },
    { type: "mcq", marks: 1, q: P`In a d.c. motor, the split-ring commutator`, opts: ["increases the current", "reverses the current every half turn", "produces a.c.", "strengthens the magnet"], ans: 1, why: P`Keeps the turning effect in one direction.` },
    { type: "mcq", marks: 1, q: P`A magnet is held still inside a coil connected to a meter. The meter reads`, opts: ["a large current", "a small current", "zero", "a.c."], ans: 2, why: P`No change of field, no induced e.m.f.` },
    { type: "mcq", marks: 1, q: P`Which does NOT increase the e.m.f. induced by moving a magnet into a coil?`, opts: ["Moving faster", "More turns", "Stronger magnet", "Using thicker wire"], ans: 3, why: P`Wire thickness affects resistance, not e.m.f.` },
    { type: "mcq", marks: 1, q: P`A transformer has 100 primary turns and 2000 secondary turns. With 12 V input, the output is`, opts: ["0.6 V", "12 V", "240 V", "24 000 V"], ans: 2, why: P`$12\times2000/100=240$ V.` },
    { type: "mcq", marks: 1, q: P`An a.c. generator uses`, opts: ["a split-ring commutator", "slip rings", "a diode", "a relay"], ans: 1, why: P`Slip rings keep the output alternating.` },
    { type: "mcq", marks: 1, q: P`S: Doubling the current in a transmission cable makes the power loss`, opts: ["half", "the same", "double", "four times"], ans: 3, why: P`$P=I^2R$.` },
    { type: "mcq", marks: 1, q: P`S: In Fleming's left-hand rule the second finger represents`, opts: ["field", "force", "current", "voltage"], ans: 2, why: P`seCond = Current.` },
    { type: "struct", marks: 4, q: P`Describe an experiment to show that a force acts on a current-carrying conductor in a magnetic field, and what happens when the current is reversed.`,
      ms: P`<b>B1</b> copper rod resting on two rails, between the poles of a magnet (field vertical)<br><b>B1</b> connect rails to a d.c. supply so current flows through the rod<br><b>B1</b> rod rolls along the rails (force at 90° to current and field)<br><b>B1</b> reversing the current makes it roll the other way` },
    { type: "struct", marks: 4, q: P`Explain how a simple d.c. motor works, including the role of the split-ring commutator and brushes.`,
      ms: P`<b>B1</b> current in coil in magnetic field; forces on opposite sides act in opposite directions → turning effect<br><b>B1</b> brushes make contact with the rotating commutator<br><b>B1</b> commutator reverses the current every half turn<br><b>B1</b> so the forces keep turning the coil the same way` },
    { type: "struct", marks: 3, q: P`Describe an experiment to demonstrate electromagnetic induction.`,
      ms: P`<b>B1</b> coil connected to a sensitive ammeter / galvanometer<br><b>B1</b> move a magnet into / out of the coil<br><b>B1</b> meter deflects while moving; opposite deflection when withdrawn; none when stationary` },
    { type: "struct", marks: 3, q: P`S: A N pole is pushed into a coil. State the polarity induced at the end of the coil nearest the magnet and explain how this agrees with conservation of energy.`,
      ms: P`<b>B1</b> N pole<br><b>B1</b> it repels the magnet, opposing the change causing it<br><b>B1</b> work must be done to push the magnet in; this work becomes electrical energy` },
    { type: "struct", marks: 4, q: P`S: Sketch the e.m.f.–time graph for an a.c. generator over two rotations and mark where the coil plane is parallel to the field.`,
      ms: P`<b>B1</b> sine-shaped curve<br><b>B1</b> two complete cycles shown<br><b>B1</b> peaks (positive and negative) marked as plane parallel to field<br><b>B1</b> zeros where plane perpendicular to field` },
    { type: "struct", marks: 4, q: P`S: Explain how a transformer produces an output voltage in its secondary coil.`,
      ms: P`<b>B1</b> alternating current in the primary produces a changing magnetic field<br><b>B1</b> the soft iron core links/concentrates the field through the secondary<br><b>B1</b> changing field induces an e.m.f. in the secondary<br><b>B1</b> size depends on turns ratio; output is a.c.` },
    { type: "struct", marks: 4, q: P`State two advantages of transmitting electricity at high voltage. S: Use P = I²R to explain the main one.`,
      ms: P`<b>B1</b> less energy/power lost in cables<br><b>B1</b> thinner, cheaper cables / fewer pylons<br><b>B1</b> for same power, higher voltage means smaller current (P = IV)<br><b>B1</b> loss = I²R, so smaller current means much smaller loss` },
    { type: "struct", marks: 3, q: P`S: An ideal transformer has 230 V across a primary of 920 turns. The secondary supplies 6.0 V to a 3.0 A load. Calculate the secondary turns and the primary current.`,
      ms: P`<b>C1</b> $N_s=920\times6.0/230$<br><b>A1</b> 24 turns<br><b>A1</b> $I_p=6.0\times3.0/230=0.078$ A` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: P`State the names of the two coils of a transformer and the material of its core.`, ms: P`<b>B1</b> primary and secondary<br><b>B1</b> soft iron` },
    { d: 1, type: "mcq", marks: 1, q: P`A step-down transformer`, opts: ["has more secondary turns", "increases voltage", "has fewer secondary turns", "works on d.c."], ans: 2, why: P`Fewer secondary turns → lower voltage.` },
    { d: 1, type: "struct", marks: 3, q: P`State three ways of increasing the turning effect on the coil of an electric motor.`, ms: P`<b>B1</b> more turns<br><b>B1</b> larger current<br><b>B1</b> stronger magnet` },
    { d: 1, type: "struct", marks: 2, q: P`A magnet is pushed into a coil and the meter deflects to the right. State what happens when (a) it is held still, (b) it is pulled out.`, ms: P`<b>B1</b> (a) no deflection / zero<br><b>B1</b> (b) deflects to the left` },
    { d: 2, type: "struct", marks: 3, q: P`A transformer steps 230 V down to 11.5 V. The primary has 2000 turns. (a) How many turns are on the secondary? (b) Why can't this transformer be used with a 230 V d.c. supply?`, ms: P`<b>(a) C1</b> $2000\times11.5/230$<br><b>A1</b> 100 turns<br><b>(b) B1</b> d.c. produces a steady field, which does not induce an e.m.f. in the secondary` },
    { d: 2, type: "struct", marks: 3, q: P`S: An electron beam travels horizontally from left to right through a magnetic field directed into the page. Use Fleming's left-hand rule to find the direction of the force on the beam.`, ms: P`<b>B1</b> conventional current is right to left (opposite to electrons)<br><b>B1</b> field into page, current to the left<br><b>A1</b> force downwards (towards the bottom of the page)` },
    { d: 2, type: "mcq", marks: 1, q: P`S: The speed of an a.c. generator is doubled. The peak e.m.f. and the frequency`, opts: ["both stay the same", "both double", "peak doubles, frequency the same", "frequency doubles, peak the same"], ans: 1, why: P`Faster cutting → bigger peak; more turns per second → higher frequency.` },
    { d: 2, type: "struct", marks: 3, q: P`Explain the difference between slip rings and a split-ring commutator, and state where each is used.`, ms: P`<b>B1</b> slip rings: each end of coil always connected to the same brush/terminal<br><b>B1</b> commutator: reverses the connections every half turn<br><b>B1</b> slip rings in a.c. generators; commutator in d.c. motors (and d.c. dynamos)` },
    { d: 3, type: "struct", marks: 6, q: P`S: A power station generates 200 MW at 25 kV. It is stepped up to 400 kV and sent through cables of total resistance 10 Ω. (a) Calculate the current in the cables. (b) Calculate the power lost. (c) Calculate the power that would be lost if transmitted at 25 kV. (d) Explain why the transformers are used.`, ms: P`<b>(a) A1</b> $I=200\times10^6/400\times10^3=500$ A<br><b>(b) A1</b> $500^2\times10=2.5\times10^6$ W (2.5 MW)<br><b>(c) C1</b> $I=8000$ A<br><b>A1</b> $6.4\times10^8$ W (more than generated: impossible to transmit)<br><b>(d) B1</b> high voltage → low current → loss ∝ I² greatly reduced<br><b>B1</b> step-down needed for safe use in homes` },
    { d: 3, type: "struct", marks: 5, q: P`S: A coil rotates steadily in a uniform magnetic field. (a) Sketch the e.m.f.–time graph for one rotation starting with the coil plane perpendicular to the field. (b) Explain why the e.m.f. is zero at this starting position. (c) Draw the new graph on the same axes if the coil rotates twice as fast.`, ms: P`<b>(a) B1</b> sine curve starting at zero, one full cycle<br><b>(b) B1</b> sides moving parallel to field lines<br><b>B1</b> not cutting field lines, so no e.m.f.<br><b>(c) B1</b> double the peak<br><b>B1</b> two cycles in the same time` },
    { d: 3, type: "struct", marks: 4, q: P`S: Explain, in terms of energy and the direction of induced current, why it is harder to turn a generator when a lamp is connected to it than when nothing is connected.`, ms: P`<b>B1</b> with a lamp the circuit is complete so an induced current flows<br><b>B1</b> the induced current produces a field that opposes the motion (Lenz)<br><b>B1</b> so a force opposes the turning; more work must be done<br><b>B1</b> this work supplies the energy transferred to the lamp; with no current, no opposing force` }
  ]
});
}
