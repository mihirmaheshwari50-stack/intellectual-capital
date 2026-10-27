window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
// small store icon card
const store = (title, art, note) => F.fig(170, 150, art + F.text(85, 136, title, "tk small bold"), note, { size: "tiny" });
// flow diagram: [store, pathway, store, …]
const flow = (items, cap, w = 560) => { const n = items.length, bw = Math.min(150, (w - 20 - (n - 1) * 40) / n); let s = "";
  items.forEach((it, i) => { const x = 10 + i * (bw + 40), [t1, t2, c] = it; s += F.rect(x, 20, bw, 64, (c || "k") + "S " + (c || "k"), 12) + F.text(x + bw / 2, 48, t1, "tk small bold") + (t2 ? F.text(x + bw / 2, 66, t2, "tm small") : "");
    if (i < n - 1) s += F.arrow(x + bw + 4, 52, x + bw + 36, 52, "m mid", 8); });
  return F.fig(w, 100, s, cap, { size: "wide" }); };
// Sankey diagrams drawn to scale. Bands bend downwards for wasted energy.
const band = (x, a, w, r, yEnd, c) => F.path(`M${x},${a} L${x},${a} Q${x + w + r},${a} ${x + w + r},${a + w + r} L${x + w + r},${yEnd} L${x + r},${yEnd} L${x + r},${a + w + r} Q${x + r},${a + w} ${x},${a + w} Z`, c + "S nostroke") + F.poly([[x + r - 6, yEnd], [x + w + r + 6, yEnd], [x + r + w / 2, yEnd + 14]], c + "S nostroke", true);
const sankey = (inp, outs, cap, unit = "J") => { const sc = 110 / inp, x0 = 20, y0 = 30, xs = 150, [u, ...waste] = outs, uh = u[1] * sc, H = inp * sc, yEnd = y0 + H + 70;
  let s = F.rect(x0, y0, xs - x0, H, "oS nostroke") + F.text(x0 + 8, y0 + H / 2 + 5, inp + " " + unit, "tk bold", "start") + F.text(x0 + 8, y0 + H / 2 + 21, "input", "tm small", "start");
  s += F.rect(xs, y0, 170, uh, u[2] + "S nostroke") + F.poly([[xs + 170, y0 - 6], [xs + 190, y0 + uh / 2], [xs + 170, y0 + uh + 6]], u[2] + "S nostroke", true) + F.text(xs + 196, y0 + uh / 2 + 5, u[1] + " " + unit + " " + u[0], "t" + u[2] + " bold", "start");
  let y = y0 + H, off = 0; [...waste].reverse().forEach(([lab, val, c]) => { const w = val * sc; y -= w; s += F.rect(xs, y, off, w, c + "S nostroke") + band(xs + off, y, w, 18, yEnd, c) + F.text(xs + off + 18 + w / 2, yEnd + 32, val + " " + unit + " " + lab, "t" + c + " small bold"); off += w + 24; });
  return F.fig(400, yEnd + 44, s, cap, { size: "small" }); };
//@@HELPERS-END

/* ============================================================
   ENERGY, WORK & POWER  (0625: 1.7)
   ============================================================ */
TOPICS.push({
  id: "energy", subject: "physics", unit: 1, title: "Energy, work & power",
  blurb: "Energy stores and transfers, conservation of energy, Sankey diagrams, work, kinetic and potential energy, power, efficiency and energy resources.",
  level: "Core → Supplement", demo: "coaster",
  syllabus: [
    ["1.7.1", "Energy may be stored as kinetic, gravitational potential, chemical, elastic (strain), nuclear, electrostatic and internal (thermal) energy", 0],
    ["1.7.1", "Describe how energy is transferred between stores: by forces (mechanical work), electrical currents (electrical work), heating, and by electromagnetic, sound and other waves", 1],
    ["1.7.1", "Know the principle of conservation of energy and apply it to simple examples, including flow diagrams", 2],
    ["1.7.1 S", "Apply conservation of energy to multi-stage examples, including Sankey diagrams", 2],
    ["1.7.2", "Mechanical or electrical work done is equal to the energy transferred; recall and use W = Fd = ΔE", 3],
    ["1.7.1 S", "Recall and use kinetic energy Ek = ½mv²", 4],
    ["1.7.1 S", "Recall and use change in gravitational potential energy ΔEp = mgΔh", 5],
    ["1.7.4", "Define power as work done per unit time and energy transferred per unit time; recall and use P = W/t and P = ΔE/t", 6],
    ["1.7.3", "Understand the concept of efficiency of energy transfer", 7],
    ["1.7.3 S", "Define and use efficiency = useful energy (or power) output ÷ total energy (or power) input × 100%", 7],
    ["1.7.3", "Describe how electrical power is generated from fossil fuels, biofuels, nuclear fuel, geothermal, water (hydroelectric, tides, waves), wind, solar cells and solar panels", 8],
    ["1.7.3", "Compare energy resources: renewability, availability, reliability, scale and environmental impact", 9],
    ["1.7.3 S", "The Sun is the main source of energy for all resources except geothermal, nuclear and tidal; the Sun releases energy by nuclear fusion; research into fusion power", 9]
  ],
  sections: [
    { h: "Energy stores (1.7.1)", body: P`
<p class="lead">Energy is never "used up". It is <b>stored</b> in different ways and <b>transferred</b> between stores. The unit is the <b>joule (J)</b>. Learning the names of the stores lets you describe any event precisely.</p>
${F.row(
  store("kinetic", F.rect(40, 50, 70, 26, "c cS c", 6) + F.rect(56, 36, 36, 16, "c cS c", 5) + F.circ(56, 80, 8, "k") + F.circ(96, 80, 8, "k") + F.arrow(118, 62, 150, 62, "c mid", 8) + F.line(14, 56, 32, 56, "m thin") + F.line(8, 66, 30, 66, "m thin"), "Any <b>moving</b> object."),
  store("gravitational potential", F.line(20, 112, 150, 112, "k") + F.rect(60, 24, 50, 30, "o oS o", 4) + F.dim(130, 54, 130, 112, "h", "m", 12), "Any object <b>raised</b> in a gravitational field."),
  store("chemical", F.rect(40, 40, 80, 50, "g gS g", 6) + F.rect(120, 56, 8, 18, "g gF") + F.text(80, 70, "+  −", "tg bold") + F.circ(150, 40, 12, "o oS o"), "Fuels, food, batteries: released by <b>reactions</b>."),
  store("elastic (strain)", F.path("M20,70 " + Array.from({ length: 8 }, (_, i) => `L${32 + i * 14},${i % 2 ? 54 : 86}`).join(" ") + " L150,70", "b mid") + F.line(14, 50, 14, 90, "k thick") + F.arrow(150, 70, 164, 70, "b mid", 7), "Stretched, squashed or bent objects."),
  store("nuclear", F.circ(85, 65, 18, "r rS r") + [0, 60, 120].map(a => `<ellipse cx="85" cy="65" rx="58" ry="20" transform="rotate(${a} 85 65)" class="m thin"/>`).join(""), "Inside atomic <b>nuclei</b>: released by fission or fusion."),
  store("electrostatic", F.circ(55, 65, 22, "r rS r") + F.text(55, 71, "+", "tr big bold") + F.circ(115, 65, 22, "b bS b") + F.text(115, 71, "−", "tb big bold") + F.arrow(80, 65, 92, 65, "m", 6) + F.arrow(90, 65, 78, 65, "m", 6), "Charges that attract or repel."),
  store("internal (thermal)", F.path("M50,50 L50,100 Q50,110 60,110 L110,110 Q120,110 120,100 L120,50 Z", "o oS o") + F.path("M70,40 Q62,30 70,20 Q78,10 70,4", "r") + F.path("M95,40 Q87,30 95,20 Q103,10 95,4", "r"), "The total kinetic and potential energy of the <b>particles</b>: hotter = more.")
)}
<div class="callout why"><b class="t">Store vs transfer</b>A store is where the energy <i>is</i>. A transfer (Part 2) is <i>how</i> it moves. "Heat" and "light" are ways of transferring energy, not stores. Examiners accept "thermal energy store" or "internal energy" for the store.</div>
<details class="check"><summary>Name the main energy store in (a) a stretched catapult, (b) petrol, (c) a book on a high shelf, (d) a cup of hot tea.</summary><div>(a) elastic; (b) chemical; (c) gravitational potential; (d) internal (thermal).</div></details>`},

    { h: "How energy is transferred (1.7.1)", body: P`
<p class="lead">Energy moves from one store to another in four ways. Every event you describe uses at least one of them.</p>
<table class="t"><tr><th>Transfer pathway</th><th>What happens</th><th>Example</th></tr>
<tr><td><b>Mechanical work</b> (by a force)</td><td>A force moves something through a distance</td><td>Lifting a box; brakes slowing a car; a spring launching a ball</td></tr>
<tr><td><b>Electrical work</b> (by a current)</td><td>Charge flows through a component</td><td>A battery lighting a lamp; a mains motor</td></tr>
<tr><td><b>Heating</b></td><td>Energy flows from hotter to colder, by conduction, convection or radiation</td><td>A kettle element warming water; a hot drink cooling</td></tr>
<tr><td><b>Waves</b> (electromagnetic, sound, others)</td><td>A wave carries energy from place to place</td><td>Light and infrared from the Sun; sound from a speaker</td></tr></table>
<h3>Describing events as flow diagrams</h3>
${flow([["chemical", "battery", "g"], ["electrical work", "current", "b"], ["light + thermal", "lamp, surroundings", "o"]], "A torch: chemical store → (electrical work) → light and the thermal store of the surroundings.")}
${flow([["kinetic", "moving car", "c"], ["work by friction", "brake pads", "m"], ["thermal", "brakes, air", "r"]], "Braking: the kinetic store empties into the thermal store of the brakes and surroundings.")}
${flow([["gravitational", "potential (top)", "o"], ["kinetic", "falling", "b"], ["elastic", "ball squashed", "g"], ["kinetic + thermal", "and sound", "r"]], "A dropped ball: each bounce moves some energy to the thermal store and to sound, so it bounces lower each time.")}
<h3>Dissipation: where "lost" energy goes</h3>
<p>In almost every real process some energy ends up in the <b>thermal store of the surroundings</b>, spread thinly over a huge number of particles. It still exists (energy is conserved) but it is <b>dissipated</b>: so spread out that we cannot easily use it again. Friction, air resistance, electrical resistance and sound are the usual routes.</p>
<table class="t"><tr><th>Event</th><th>Store at start → store(s) at end</th><th>Pathway</th></tr>
<tr><td>Burning fuel in a car engine</td><td>chemical → kinetic (car) + thermal (engine, exhaust, air)</td><td>heating, then mechanical work</td></tr>
<tr><td>Phone charging</td><td>(mains) → chemical (battery) + thermal</td><td>electrical work</td></tr>
<tr><td>Kettle boiling water</td><td>(mains) → thermal (water, kettle, air)</td><td>electrical work, then heating</td></tr>
<tr><td>Catapult firing a stone upwards</td><td>elastic → kinetic → gravitational potential</td><td>mechanical work</td></tr>
<tr><td>Sunlight on a solar cell</td><td>nuclear (Sun) → light (wave) → electrical</td><td>waves, then electrical work</td></tr>
<tr><td>Hot pie left on a table</td><td>thermal (pie) → thermal (surroundings)</td><td>heating (conduction, convection, radiation)</td></tr></table>
<div class="callout exam"><b class="t">Getting full marks</b>Name the store it starts in, the store it ends in, and how it gets there. "The chemical energy store of the fuel decreases; energy is transferred by heating to the thermal store of the water" beats "chemical becomes heat".</div>
<details class="check"><summary>Describe the energy transfers when a person uses a bow to fire an arrow upwards.</summary><div>Chemical (muscles) → work done stretching the bow → elastic store → work done on arrow → kinetic store of arrow → as it rises, kinetic → gravitational potential (plus some to the thermal store of the air through air resistance).</div></details>`},

    { h: "Conservation of energy and Sankey diagrams (1.7.1)", body: P`
<p class="lead"><b>Principle of conservation of energy</b>: energy cannot be created or destroyed. It can only be transferred from one store to another. The total energy is always the same.</p>
<p>So in any device: <b>total energy input = useful energy output + wasted energy output</b>. "Wasted" energy is usually spread out as thermal energy in the surroundings (dissipated), where it is hard to use again.</p>
<div class="viz" data-viz="energyBars"></div>
<h3>Sankey diagrams</h3>
<p>A Sankey diagram shows energy flow to scale: the <b>width</b> of each arrow is proportional to the energy. Useful energy goes straight on; wasted energy bends away.</p>
${F.row(
  sankey(100, [["light", 10, "b"], ["thermal (wasted)", 90, "r"]], "Filament lamp: only 10% of the electrical energy becomes light."),
  sankey(100, [["light", 40, "b"], ["thermal (wasted)", 60, "r"]], "LED: 40% becomes light. Same light output needs far less input.")
)}
<h3>Multi-stage Sankey (S)</h3>
${(() => { const st = [["fuel", 1000, "o", "boiler losses"], ["steam", 850, "r", "turbine losses"], ["turbine", 450, "b", "generator losses"], ["electrical", 400, "g"]], sc = .11, y0 = 40, step = 130, yEnd = y0 + 1000 * sc + 60; let s = "";
  st.forEach(([n, e, c, loss], i) => { const x = 20 + i * step, h = e * sc; s += F.text(x + 4, y0 - 12, n + ": " + e + " MJ", "t" + c + " small bold", "start");
    if (i < st.length - 1) { const nx = st[i + 1][1] * sc, w = h - nx; s += F.rect(x, y0, step - 30, h, c + "S nostroke") + F.rect(x + step - 30, y0, 30, nx, c + "S nostroke") + band(x + step - 30, y0 + nx, w, 10, yEnd, "r") + F.text(x + step - 20 + w / 2, yEnd + 30, "−" + (e - st[i + 1][1]), "tr small bold"); }
    else s += F.rect(x, y0, 70, h, c + "S nostroke") + F.poly([[x + 70, y0 - 6], [x + 90, y0 + h / 2], [x + 70, y0 + h + 6]], c + "S nostroke", true); });
  return F.fig(560, yEnd + 44, s, "A power station from 1000 MJ of fuel: energy is lost at every stage (red, all ending as heat in the surroundings). Overall efficiency = 400 ÷ 1000 = 40%.", { size: "wide" }); })()}
<div class="callout warn"><b class="t">Check your Sankey</b>The outputs must add up to the input. If the numbers don't balance, one of them is wrong (or energy is missing from the diagram).</div>
<details class="check"><summary>A motor receives 500 J of electrical energy. It does 350 J of useful work and wastes 120 J as heat. How much energy is unaccounted for, and where has it gone?</summary><div>500 − 350 − 120 = 30 J. It must have been transferred somewhere: e.g. as sound. Energy is conserved, so it cannot vanish.</div></details>`},

    { h: "Work done (1.7.2)", body: P`
<p class="lead"><b>Work is done</b> when a force moves an object in the direction of the force. The work done equals the energy transferred.</p>
$$W=Fd=\Delta E$$
<p>$W$ = work done (J), $F$ = force (N), $d$ = distance moved in the direction of the force (m). <b>1 joule</b> is the work done when a force of 1 N moves an object 1 m.</p>
${F.row(
  (() => { let s = F.line(10, 120, 330, 120, "k") + F.rect(50, 70, 60, 50, "o oS o", 4) + F.rect(200, 70, 60, 50, "o oS o", 4) + F.rect(50, 70, 60, 50, "m d nostroke"); s = F.line(10, 120, 330, 120, "k") + F.rect(50, 70, 60, 50, "m thin d", 4) + F.rect(200, 70, 60, 50, "o oS o", 4) + F.arrow(262, 95, 316, 95, "b thick", 10) + F.text(290, 84, "F = 40 N", "tb small bold");
    s += F.dim(80, 140, 230, 140, "d = 5 m", "c", 14);
    return F.fig(340, 170, s, "W = 40 × 5 = <b>200 J</b> of work done on the box (transferred to its kinetic store and, through friction, to the thermal store)."); })(),
  (() => { let s = F.line(20, 170, 200, 170, "k") + F.rect(80, 30, 50, 34, "o oS o", 4) + F.rect(80, 136, 50, 34, "m thin d", 4) + F.arrow(105, 130, 105, 70, "b thick", 10) + F.dim(160, 64, 160, 170, "1.5 m", "c", -20) + F.text(96, 104, "F = weight", "tb small bold", "end") + F.text(96, 118, "= 20 N", "tb small bold", "end");
    return F.fig(240, 190, s, "Lifting 20 N through 1.5 m: W = 30 J, stored as gravitational potential energy."); })()
)}
<div class="callout warn"><b class="t">No movement, no work</b>Holding a heavy bag still: your muscles get tired (chemical energy is used internally), but <b>no work is done on the bag</b> because it does not move. Carrying it horizontally at steady speed: the upward force is perpendicular to the motion, so it does no work on the bag either.</div>
<h3>Electrical work</h3>
<p>When a current flows, the electrical work done = energy transferred = $VIt$ (see Electricity). A kettle element doing 120 000 J of electrical work transfers 120 000 J to the thermal store of the water and kettle.</p>
<details class="check"><summary>A crane does 45 kJ of work lifting a crate 15 m. What is the crate's weight?</summary><div>$F=W/d=45\,000/15=3000$ N.</div></details>`},

    { h: "Kinetic energy (1.7.1 S)", body: P`
<p class="lead">Kinetic energy depends on mass and, much more strongly, on speed.</p>
$$E_k=\tfrac12 mv^2$$
<p>$E_k$ in J, $m$ in kg, $v$ in m/s. Because speed is <b>squared</b>, doubling the speed makes the kinetic energy <b>four</b> times bigger.</p>
${F.plot({ w: 470, h: 290, x: [0, 30], y: [0, 500], gridStep: [5, 100], ticks: { x: [10, 20, 30], y: [100, 200, 300, 400, 500] }, xlabel: "speed / m/s", ylabel: "kinetic energy / kJ",
  curves: [{ f: v => .5 * 1000 * v * v / 1000, c: "c thick", label: "1000 kg car", lpos: [22, 400], la: "end" }],
  marks: [{ x: 10, y: 50, c: "b", label: "10 m/s: 50 kJ", pos: "nw" }, { x: 20, y: 200, c: "b", label: "20 m/s: 200 kJ (×4)", pos: "nw" }],
  cap: "Twice the speed, four times the kinetic energy. This is why braking distances grow so quickly with speed: the brakes must remove four times as much energy." })}
<h3>Rearranging</h3>
$$v=\sqrt{\frac{2E_k}{m}}\qquad m=\frac{2E_k}{v^2}$$
<div class="callout exam"><b class="t">Common slip</b>Square <b>only</b> the speed: $\tfrac12\times2\times3^2=9$ J, not $\tfrac12\times(2\times3)^2$. Convert km/h to m/s and g to kg first.</div>
<details class="check"><summary>A 60 kg runner has 1920 J of kinetic energy. Find her speed.</summary><div>$v=\sqrt{2\times1920/60}=\sqrt{64}=8$ m/s.</div></details>`},

    { h: "Gravitational potential energy (1.7.1 S)", body: P`
<p class="lead">Lifting an object does work against its weight. That energy goes into the gravitational potential store.</p>
$$\Delta E_p=mg\Delta h$$
<p>$m$ in kg, $g=9.8$ N/kg (the gravitational field strength), $\Delta h$ = change in height in m. It is a <b>change</b>: what matters is how far it rises or falls, not the absolute height.</p>
<h3>Falling: GPE becomes KE</h3>
<p>If air resistance is negligible, all the gravitational potential energy lost becomes kinetic energy:</p>
$$mg\Delta h=\tfrac12mv^2\quad\Rightarrow\quad v=\sqrt{2g\Delta h}$$
<p>The mass cancels: a marble and a bowling ball dropped from the same height land at the same speed (without air resistance).</p>
${(() => { let s = F.line(20, 230, 500, 230, "m"); const pts = []; for (let x = 0; x <= 460; x += 4) { const u = x / 460; pts.push([30 + x, 230 - (170 * (0.5 + 0.5 * Math.cos(u * Math.PI * 2.2)) * (1 - u * .35) + 10)]); }
  s += F.poly(pts, "k thick"); const at = (k) => pts[Math.round(k * (pts.length - 1))];
  [[0, "A", "all GPE"], [.455, "B", "mostly KE (fastest)"], [.9, "C", "GPE + KE"]].forEach(([k, l, d]) => { const [x, y] = at(k); s += F.circ(x, y - 10, 9, "o oS o") + F.text(x, y - 26, l, "tk bold") + F.text(x, y + 22 + (l === "B" ? 0 : 0), d, "tm small"); });
  s += F.line(30, 50, 500, 50, "m d thin") + F.text(500, 44, "start height: car can never go above this", "tm small", "end");
  return F.fig(520, 260, s, "A roller coaster with no friction: total energy = GPE + KE is constant. Lowest point = fastest. It can't rise above the starting height.", { size: "wide" }); })()}
<p>Try it with friction in the interactive lab at the end of this lesson.</p>
<details class="check"><summary>A 2.0 kg ball is dropped from 5.0 m. Find (a) the GPE lost, (b) its speed just before landing (ignore air resistance).</summary><div>(a) $2.0\times9.8\times5.0=98$ J. (b) $\tfrac12\times2.0\times v^2=98$, $v=\sqrt{98}=9.9$ m/s.</div></details>`},

    { h: "Power (1.7.4)", body: P`
<p class="lead"><b>Power</b> is the rate of doing work: the work done (or energy transferred) <b>per unit time</b>.</p>
$$P=\frac{W}{t}=\frac{\Delta E}{t}$$
<p>Unit: the <b>watt (W)</b>. 1 W = 1 J/s. A 2 kW kettle transfers 2000 J every second.</p>
${(() => { let s = ""; for (let i = 0; i < 6; i++) s += F.path(`M${40 + i * 40},${200 - i * 30} L${80 + i * 40},${200 - i * 30} L${80 + i * 40},${170 - i * 30}`, "k");
  s += F.circ(70, 175, 9, "b bS b") + F.text(70, 150, "walks: 20 s", "tb small bold") + F.circ(230, 55, 9, "o oS o") + F.text(230, 30, "runs: 5 s", "to small bold");
  s += F.text(350, 90, "Same person (600 N),", "tk small", "start") + F.text(350, 108, "same 3 m height:", "tk small", "start") + F.text(350, 126, "W = 600 × 3 = 1800 J", "tc small bold", "start") + F.text(350, 152, "walking: 1800 ÷ 20 = 90 W", "tb small bold", "start") + F.text(350, 172, "running: 1800 ÷ 5 = 360 W", "to small bold", "start");
  return F.fig(540, 215, s, "Same work, less time, more power.", { size: "wide" }); })()}
<table class="t"><tr><th>Device</th><th>Power</th></tr><tr><td>Phone charger</td><td>5–20 W</td></tr><tr><td>LED bulb</td><td>8 W</td></tr><tr><td>Person climbing stairs</td><td>200–400 W</td></tr><tr><td>Kettle</td><td>2–3 kW</td></tr><tr><td>Car engine</td><td>50–150 kW</td></tr><tr><td>Power station</td><td>about 1 GW ($10^9$ W)</td></tr></table>
<div class="callout exam"><b class="t">Units</b>kW = $10^3$ W, MW = $10^6$ W, GW = $10^9$ W. Time must be in <b>seconds</b>: 5 minutes = 300 s.</div>
<details class="check"><summary>A 1.5 kW motor runs for 2 minutes. How much energy does it transfer?</summary><div>$E=Pt=1500\times120=180\,000$ J $=180$ kJ.</div></details>`},

    { h: "Efficiency (1.7.3)", body: P`
<p class="lead">No real device transfers all its input energy usefully. <b>Efficiency</b> tells you what fraction ends up where you want it.</p>
$$\text{efficiency}=\frac{\text{useful energy output}}{\text{total energy input}}\times100\%=\frac{\text{useful power output}}{\text{total power input}}\times100\%$$
${(() => { let s = F.rect(20, 40, 480, 34, "m mS", 6) + F.rect(20, 40, 480 * .35, 34, "c cS c", 6) + F.text(20 + 480 * .175, 62, "35% useful", "tc small bold") + F.text(20 + 480 * .675, 62, "65% wasted (mostly heat)", "tm small bold");
  s += F.text(20, 26, "petrol car engine", "tk small bold", "start");
  s += F.rect(20, 120, 480, 34, "m mS", 6) + F.rect(20, 120, 480 * .9, 34, "g gS g", 6) + F.text(20 + 480 * .45, 142, "90% useful", "tg small bold") + F.text(20, 106, "electric motor", "tk small bold", "start");
  return F.fig(520, 170, s, "", { size: "wide" }); })()}
<ul><li>Efficiency has <b>no unit</b>. It can be a percentage or a decimal (0.35).</li>
<li>It can <b>never exceed 100%</b>: you can't get out more energy than you put in.</li>
<li>Wasted energy usually becomes thermal energy dissipated to the surroundings, often because of friction or electrical resistance.</li></ul>
<h3>Improving efficiency</h3>
<p>Lubricate moving parts (less friction), insulate (less heat loss), use low-resistance wires, streamline vehicles (less air resistance), and use LEDs instead of filament lamps.</p>
<details class="check"><summary>A motor is 75% efficient. It must deliver 600 W of useful power. What input power does it need?</summary><div>$\text{input}=600/0.75=800$ W.</div></details>`},

    { h: "Generating electricity: energy resources (1.7.3)", body: P`
<p class="lead">Most power stations work the same way: something spins a <b>turbine</b>, which turns a <b>generator</b>. They differ in what spins the turbine.</p>
<div class="viz" data-viz="powerStation"></div>
<h3>Thermal power stations: fossil fuels, biofuels, nuclear, geothermal</h3>
<p>These heat water to make high-pressure steam, which spins the turbine.</p>
<ul><li><b>Fossil fuels</b> (coal, oil, natural gas): chemical energy released by burning. Produce CO₂ (climate change) and, for coal, SO₂ (acid rain).</li>
<li><b>Biofuels</b> (wood, biogas, ethanol from crops): chemical energy from plants. Renewable, and roughly carbon-neutral because the plants absorbed CO₂ as they grew; but need large areas of land.</li>
<li><b>Nuclear fuel</b> (uranium): nuclear energy released by <b>fission</b> heats the water. No CO₂ while running; produces radioactive waste that must be stored for thousands of years.</li>
<li><b>Geothermal</b>: cold water is pumped down to hot rocks deep underground and returns as steam. Only practical in volcanic regions.</li></ul>
${(() => { let s = F.line(10, 60, 530, 60, "g mid") + F.rect(10, 60, 520, 140, "o oS nostroke") + F.text(520, 190, "hot rocks deep underground", "to small bold", "end");
  s += F.line(150, 30, 150, 180, "b thick") + F.arrow(150, 40, 150, 170, "b mid", 8) + F.line(330, 180, 330, 30, "r thick") + F.arrow(330, 170, 330, 36, "r mid", 8) + F.path("M150,180 Q240,200 330,180", "m d");
  s += F.rect(380, 4, 120, 46, "k bgF", 6) + F.text(440, 24, "turbine +", "tk small bold") + F.text(440, 40, "generator", "tk small bold") + F.line(330, 30, 380, 30, "r");
  s += F.text(140, 110, "cold water down", "tb small bold", "end") + F.text(340, 110, "steam up", "tr small bold", "start");
  return F.fig(540, 210, s, "Geothermal: energy comes from radioactive decay deep inside the Earth, not from the Sun.", { size: "wide" }); })()}
<h3>Using moving water</h3>
${F.row(
  (() => { let s = F.path("M10,40 L120,40 L150,200 L10,200 Z", "b bS b") + F.path("M150,200 L120,40 L170,40 L200,200 Z", "k mS") + F.line(130, 160, 210, 180, "b thick") + F.circ(230, 185, 16, "k bgF") + F.text(230, 190, "T", "tk bold") + F.line(200, 200, 320, 200, "b") + F.text(60, 30, "high reservoir", "tb small bold") + F.text(230, 160, "turbine", "tk small");
    return F.fig(330, 220, s, "<b>Hydroelectric</b>: water stored high behind a dam (GPE) falls through turbines. Reliable and can start in seconds; floods valleys."); })(),
  (() => { let s = F.rect(10, 60, 130, 120, "b bS nostroke") + F.rect(190, 100, 130, 80, "b bS nostroke") + F.rect(140, 40, 50, 140, "k mS") + F.circ(165, 150, 14, "k bgF") + F.arrow(110, 150, 148, 150, "b mid", 8) + F.arrow(182, 150, 220, 150, "b mid", 8);
    s += F.text(75, 50, "high tide trapped", "tb small bold") + F.text(255, 90, "low tide", "tb small bold") + F.text(165, 30, "barrage", "tk small bold");
    return F.fig(330, 200, s, "<b>Tidal barrage</b>: water trapped at high tide flows out through turbines. Predictable twice a day; energy comes from the Moon's gravity."); })()
)}
<p><b>Wave power</b>: bobbing floats or oscillating water columns drive generators. Unreliable (depends on the weather) and small-scale.</p>
<h3>Wind and the Sun</h3>
<ul><li><b>Wind turbines</b>: moving air turns the blades directly. Renewable, no fuel, but unreliable (no wind, no power), noisy, and visual impact.</li>
<li><b>Solar cells</b> (photovoltaic): <b>light</b> from the Sun is transferred directly to <b>electrical</b> energy. No moving parts; useful in remote places; no power at night; low efficiency (about 20%).</li>
<li><b>Solar panels</b> (solar heating): <b>infrared</b> from the Sun heats water flowing through black pipes. Used for hot water, not electricity.</li></ul>
<div class="callout warn"><b class="t">Solar cell vs solar panel</b>Cells make electricity from light. Panels heat water using infrared. The syllabus tests the difference.</div>`},

    { h: "Comparing energy resources; the Sun (1.7.3)", body: P`
<p class="lead">When asked to compare resources, judge each on five criteria: <b>renewability</b>, <b>availability</b>, <b>reliability</b>, <b>scale</b> and <b>environmental impact</b>.</p>
<table class="t"><tr><th>Resource</th><th>Renewable?</th><th>Reliable?</th><th>Scale</th><th>Main environmental impact</th></tr>
<tr><td>Fossil fuels</td><td>No</td><td>Yes, on demand</td><td>Large</td><td>CO₂ (climate change), SO₂ (acid rain), mining, oil spills</td></tr>
<tr><td>Biofuels</td><td>Yes</td><td>Yes</td><td>Medium</td><td>Land use, deforestation; roughly carbon-neutral</td></tr>
<tr><td>Nuclear</td><td>No (finite uranium)</td><td>Yes, constant output</td><td>Very large</td><td>Radioactive waste; risk of accidents; no CO₂ when running</td></tr>
<tr><td>Geothermal</td><td>Yes</td><td>Yes</td><td>Small–medium</td><td>Very low; only in volcanic areas</td></tr>
<tr><td>Hydroelectric</td><td>Yes</td><td>Yes (stored water)</td><td>Large</td><td>Floods valleys, destroys habitats, displaces people</td></tr>
<tr><td>Tidal</td><td>Yes</td><td>Predictable, not constant</td><td>Medium</td><td>Changes estuary habitats, blocks shipping</td></tr>
<tr><td>Waves</td><td>Yes</td><td>No</td><td>Small</td><td>Hazard to boats; little else</td></tr>
<tr><td>Wind</td><td>Yes</td><td>No</td><td>Small per turbine</td><td>Noise, visual impact, birds</td></tr>
<tr><td>Solar cells</td><td>Yes</td><td>No (none at night)</td><td>Small–medium</td><td>Large areas; manufacturing</td></tr></table>
<div class="callout key"><b class="t">Renewable vs non-renewable</b>A <b>renewable</b> resource is replaced naturally as fast as we use it (it won't run out). Fossil fuels took millions of years to form, so they are non-renewable.</div>
<h3>The Sun behind (almost) everything (S)</h3>
${(() => { let s = F.circ(70, 110, 46, "o oS o") + F.text(70, 115, "Sun", "to bold"); const items = [["fossil fuels (ancient plants)", 30], ["biofuels (plants)", 62], ["wind (uneven heating of air)", 94], ["waves (made by wind)", 126], ["hydro (rain from evaporation)", 158], ["solar cells and panels", 190]];
  items.forEach(([t, y]) => { s += F.arrow(118, 110, 220, y - 4, "o thin", 7) + F.text(226, y, t, "tk small", "start"); });
  s += F.text(420, 70, "NOT from the Sun:", "tr small bold", "start") + F.text(420, 92, "geothermal", "tr small", "start") + F.text(420, 110, "nuclear", "tr small", "start") + F.text(420, 128, "tidal (the Moon)", "tr small", "start");
  return F.fig(540, 210, s, "", { size: "wide" }); })()}
<ul><li>The Sun releases energy by <b>nuclear fusion</b>: hydrogen nuclei join to form helium, releasing huge amounts of energy.</li>
<li>Scientists are researching how to use fusion to generate electricity on a large scale. The fuel (isotopes of hydrogen from water) is plentiful and the waste is far less radioactive, but it needs temperatures of over 100 million °C, so no commercial fusion power station exists yet.</li></ul>
<details class="check"><summary>Give two advantages and two disadvantages of wind power compared with a coal power station.</summary><div>Advantages: renewable; no fuel cost; no CO₂ or SO₂ emissions while running. Disadvantages: unreliable (depends on wind); low output per turbine, so many needed; noise and visual impact.</div></details>`}
  ],
  worked: [
    { q: P`A 1200 kg car travelling at 15 m/s brakes to rest over 30 m. Calculate (a) its kinetic energy, (b) the average braking force.`,
      steps: [P`(a) $E_k=\tfrac12\times1200\times15^2=135\,000$ J.`, P`(b) All the kinetic energy is removed by the work done by the brakes: $W=Fd$.`, P`$F=W/d=135\,000/30=4500$ N.`]},
    { q: P`A pump lifts 500 kg of water through 12 m in 60 s. Its input power is 1.5 kW. Calculate the useful power and the efficiency. (g = 9.8 N/kg)`,
      steps: [P`Useful energy = GPE gained $=mgh=500\times9.8\times12=58\,800$ J.`, P`Useful power $=58\,800/60=980$ W.`, P`Efficiency $=980/1500\times100\%=65\%$.`]},
    { q: P`A pendulum bob of mass 0.20 kg is pulled aside so it is 0.30 m above its lowest point, then released. Find its maximum speed. Why will the real speed be a little less?`,
      steps: [P`GPE lost $=mgh=0.20\times9.8\times0.30=0.588$ J.`, P`At the lowest point all of this is kinetic: $\tfrac12\times0.20\times v^2=0.588$, so $v^2=5.88$, $v=2.4$ m/s.`, P`Air resistance does work on the bob, transferring some energy to the thermal store of the air, so the real kinetic energy (and speed) is slightly lower.`]},
    { q: P`A 100 W filament lamp is 10% efficient. An LED giving the same light output is 40% efficient. Find the power of the LED and the energy saved in 5 hours.`,
      steps: [P`Useful (light) power of the filament lamp $=0.10\times100=10$ W.`, P`LED input power $=10/0.40=25$ W.`, P`Power saved $=75$ W; time $=5\times3600=18\,000$ s; energy saved $=75\times18\,000=1.35\times10^6$ J (1.35 MJ).`]}
  ],
  formulas: [
    ["Work done", P`$W=Fd=\Delta E$`], ["Kinetic energy (S)", P`$E_k=\tfrac12mv^2$`], ["GPE change (S)", P`$\Delta E_p=mg\Delta h$`],
    ["Power", P`$P=\dfrac{W}{t}=\dfrac{\Delta E}{t}$`], ["Efficiency (S)", P`$\dfrac{\text{useful output}}{\text{total input}}\times100\%$`], ["Falling (no air resistance)", P`$v=\sqrt{2gh}$`],
    ["Units", "1 J = 1 N m; 1 W = 1 J/s; 1 kW = 1000 W"]
  ],
  cards: [
    ["Name the 7 energy stores in the syllabus", "Kinetic, gravitational potential, chemical, elastic (strain), nuclear, electrostatic, internal (thermal)."],
    ["Four ways energy is transferred", "Mechanical work (forces), electrical work (currents), heating, waves (EM, sound…)."],
    ["Principle of conservation of energy", "Energy cannot be created or destroyed, only transferred between stores. Total energy stays constant."],
    ["What does the width of a Sankey arrow show?", "The amount of energy (to scale)."],
    ["Define work done", "Force × distance moved in the direction of the force; equal to the energy transferred."],
    ["Unit of work / energy", "Joule (J): 1 J = 1 N × 1 m."],
    ["Kinetic energy equation (S)", "Ek = ½mv²"],
    ["Double the speed: what happens to KE?", "It quadruples (×4), because v is squared."],
    ["GPE equation (S)", "ΔEp = mgΔh"],
    ["Speed after falling h (no air resistance)", "v = √(2gh): independent of mass."],
    ["Define power", "Work done (or energy transferred) per unit time."],
    ["Unit of power", "Watt (W) = 1 J/s."],
    ["Efficiency equation (S)", "Useful output ÷ total input × 100% (energy or power)."],
    ["Why can efficiency never exceed 100%?", "Energy is conserved: you cannot get out more than you put in."],
    ["Where does wasted energy usually go?", "Dissipated as thermal energy to the surroundings (often by friction or resistance)."],
    ["How does a thermal power station work?", "Fuel heats water → steam → spins turbine → turns generator → electricity."],
    ["Solar cell vs solar panel", "Cell: light → electricity. Panel: infrared heats water."],
    ["Renewable resource", "Replaced naturally as fast as it is used: won't run out."],
    ["Resources NOT from the Sun (S)", "Geothermal, nuclear, tidal."],
    ["How does the Sun release energy? (S)", "Nuclear fusion of hydrogen into helium."],
    ["Why isn't there fusion power yet? (S)", "Needs over 100 million °C and huge pressures; still being researched."],
    ["Advantage of hydroelectric", "Renewable, reliable, can respond to demand within seconds."],
    ["Disadvantage of nuclear", "Long-lived radioactive waste; risk of accidents; non-renewable fuel."],
    ["Disadvantage of wind/solar", "Unreliable: depend on weather / daylight."],
    ["Holding a heavy box still: is work done on the box?", "No: the box does not move, so W = Fd = 0."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Which is an energy store, not a transfer?`, opts: ["Light", "Sound", "Elastic", "Heating"], ans: 2, why: P`Elastic is a store; light, sound and heating are ways energy is transferred.` },
    { type: "mcq", marks: 1, q: P`A 50 N force pushes a box 4 m. The work done is`, opts: ["12.5 J", "46 J", "54 J", "200 J"], ans: 3, why: P`$W=Fd=50\times4$.` },
    { type: "mcq", marks: 1, q: P`A 2 kg ball moves at 3 m/s. Its kinetic energy is`, opts: ["3 J", "6 J", "9 J", "18 J"], ans: 2, why: P`$\tfrac12\times2\times9=9$ J.` },
    { type: "mcq", marks: 1, q: P`A motor does 3000 J of work in 60 s. Its power is`, opts: ["0.02 W", "50 W", "180 kW", "3060 W"], ans: 1, why: P`$3000/60=50$ W.` },
    { type: "mcq", marks: 1, q: P`Which resource does NOT get its energy from the Sun?`, opts: ["Wind", "Hydroelectric", "Geothermal", "Biofuel"], ans: 2, why: P`Geothermal energy comes from radioactive decay inside the Earth.` },
    { type: "mcq", marks: 1, q: P`A device has an input of 200 J and wastes 150 J. Its efficiency is`, opts: ["25%", "75%", "133%", "150%"], ans: 0, why: P`Useful = 50 J; $50/200=25\%$.` },
    { type: "mcq", marks: 1, q: P`If a car's speed triples, its kinetic energy is multiplied by`, opts: ["3", "6", "9", "27"], ans: 2, why: P`$E_k\propto v^2$, so $3^2=9$.` },
    { type: "mcq", marks: 1, q: P`In a solar cell, energy is transferred from`, opts: ["Infrared to thermal", "Light to electrical", "Chemical to electrical", "Kinetic to electrical"], ans: 1, why: P`Photovoltaic cells transfer light directly to electrical energy.` },
    { type: "struct", marks: 3, q: P`Describe the energy transfers that take place when a person on a trampoline jumps up from the bed and falls back onto it.`,
      ms: P`<b>B1</b> elastic (bed) → kinetic as the bed pushes the person up<br><b>B1</b> kinetic → gravitational potential as they rise; GP → kinetic as they fall<br><b>B1</b> kinetic → elastic as the bed stretches; some energy to thermal (and sound)` },
    { type: "struct", marks: 3, q: P`S: A 0.50 kg ball is thrown upwards at 12 m/s. Ignoring air resistance, calculate the maximum height it reaches.`,
      ms: P`<b>C1</b> $E_k=\tfrac12\times0.50\times12^2=36$ J<br><b>C1</b> $36=0.50\times9.8\times h$<br><b>A1</b> $h=7.3$ m` },
    { type: "struct", marks: 4, q: P`A crane lifts a 800 kg load through 25 m in 40 s. (a) Calculate the GPE gained. (b) Calculate the useful power output. (c) The crane's motor takes 8.0 kW. Calculate the efficiency.`,
      ms: P`<b>(a) A1</b> $800\times9.8\times25=196\,000$ J<br><b>(b) A1</b> $196\,000/40=4900$ W<br><b>(c) C1</b> $4900/8000\times100$<br><b>A1</b> 61%` },
    { type: "struct", marks: 3, q: P`State the principle of conservation of energy and use it to explain why a bouncing ball does not return to its starting height.`,
      ms: P`<b>B1</b> energy cannot be created or destroyed, only transferred<br><b>B1</b> on each bounce some energy is transferred to the thermal store (and as sound)<br><b>B1</b> so less gravitational potential energy is available: lower height` },
    { type: "struct", marks: 4, q: P`Explain how electricity is generated in a coal-fired power station, naming the energy stores involved.`,
      ms: P`<b>B1</b> coal burns: chemical store → thermal store of water<br><b>B1</b> water boils to high-pressure steam<br><b>B1</b> steam turns turbine (kinetic store)<br><b>B1</b> turbine turns generator, producing electrical energy` },
    { type: "struct", marks: 4, q: P`Compare tidal power and wind power as ways of generating electricity. Give two similarities and two differences.`,
      ms: P`<b>B1</b> similarity: both renewable<br><b>B1</b> similarity: no fuel / no CO₂ when running<br><b>B1</b> difference: tides are predictable (reliable timing), wind is not<br><b>B1</b> difference: tidal only at suitable estuaries / large scale; wind turbines anywhere windy, small output each` },
    { type: "struct", marks: 3, q: P`S: A 70 kg cyclist reaches the bottom of a 20 m high hill (starting from rest) at 15 m/s. Calculate the energy transferred to the thermal store by friction and air resistance.`,
      ms: P`<b>C1</b> GPE lost $=70\times9.8\times20=13\,720$ J<br><b>C1</b> KE gained $=\tfrac12\times70\times15^2=7875$ J<br><b>A1</b> wasted $=5845$ J (≈ 5800 J)` },
    { type: "struct", marks: 2, q: P`A student says "holding a heavy suitcase still for a minute is hard work, so lots of work is done on the suitcase". Explain why this is incorrect.`,
      ms: P`<b>B1</b> work done = force × distance moved in direction of force<br><b>B1</b> suitcase does not move, so no work is done on it (chemical energy is used in the muscles)` },
    { type: "struct", marks: 3, q: P`S: State what is meant by nuclear fusion, where it happens naturally, and one reason fusion power stations are not yet used.`,
      ms: P`<b>B1</b> small (hydrogen) nuclei join to form a larger nucleus, releasing energy<br><b>B1</b> in the Sun / stars<br><b>B1</b> needs extremely high temperatures and pressures; very hard to contain / still being researched` },
    { type: "struct", marks: 3, q: P`A 2.4 kW kettle takes 3.0 minutes to boil some water. Calculate the energy transferred. If the kettle is 85% efficient, how much energy goes into the water?`,
      ms: P`<b>C1</b> $2400\times180$<br><b>A1</b> 432 000 J<br><b>A1</b> $0.85\times432\,000=367\,000$ J (3.7 × 10⁵ J)` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: P`State the unit of power.`, ms: P`<b>B1</b> watt (W) / J/s` },
    { d: 1, type: "mcq", marks: 1, q: P`Energy stored in a stretched rubber band is`, opts: ["chemical", "elastic", "kinetic", "nuclear"], ans: 1, why: P`Stretched objects store elastic (strain) energy.` },
    { d: 1, type: "struct", marks: 2, q: P`Name the main energy store at the start and at the end when a battery-powered fan is switched on.`, ms: P`<b>B1</b> chemical (battery)<br><b>B1</b> kinetic (fan blades) and thermal (surroundings)` },
    { d: 1, type: "struct", marks: 2, q: P`Give one renewable and one non-renewable energy resource, and state what "renewable" means.`, ms: P`<b>B1</b> e.g. wind / solar / hydro; e.g. coal / oil / gas / nuclear<br><b>B1</b> renewable: replaced naturally as fast as it is used / will not run out` },
    { d: 1, type: "struct", marks: 2, q: P`A lamp has an input of 60 J each second and gives out 6 J of light. Calculate the wasted energy each second and state where it goes.`, ms: P`<b>B1</b> 54 J<br><b>B1</b> thermal store of the surroundings (heating)` },
    { d: 2, type: "struct", marks: 3, q: P`A girl of weight 450 N climbs stairs 4.0 m high in 6.0 s. Calculate the work she does against gravity and her useful power.`, ms: P`<b>A1</b> $W=450\times4.0=1800$ J<br><b>C1</b> $P=1800/6.0$<br><b>A1</b> 300 W` },
    { d: 2, type: "struct", marks: 3, q: P`S: A 900 kg car has 180 kJ of kinetic energy. Calculate its speed.`, ms: P`<b>C1</b> $180\,000=\tfrac12\times900\times v^2$<br><b>C1</b> $v^2=400$<br><b>A1</b> 20 m/s` },
    { d: 2, type: "mcq", marks: 1, q: P`A motor with efficiency 0.80 has a useful output of 400 W. The input power is`, opts: ["320 W", "480 W", "500 W", "2000 W"], ans: 2, why: P`$400/0.80=500$ W.` },
    { d: 2, type: "struct", marks: 4, q: P`Draw and label a Sankey diagram for an electric motor that receives 1000 J, does 700 J of useful work and wastes 250 J as heat and the rest as sound. State its efficiency.`, ms: P`<b>B1</b> input arrow 1000 J<br><b>B1</b> useful arrow 700 J straight on; heat 250 J and sound 50 J bending away<br><b>B1</b> arrow widths roughly to scale<br><b>A1</b> efficiency 70%` },
    { d: 2, type: "struct", marks: 4, q: P`Explain the difference between solar cells and solar panels, giving one use of each.`, ms: P`<b>B1</b> solar cells transfer light energy to electrical energy<br><b>B1</b> e.g. calculators, satellites, rooftop electricity<br><b>B1</b> solar panels absorb infrared to heat water<br><b>B1</b> e.g. domestic hot water / swimming pool heating` },
    { d: 3, type: "struct", marks: 5, q: P`S: A 60 kg skier starts from rest at the top of a slope 80 m high and reaches the bottom at 30 m/s. (a) Calculate the GPE lost and the KE gained. (b) Calculate the work done against friction. (c) The slope is 400 m long. Calculate the average resistive force.`, ms: P`<b>(a) A1</b> GPE $=60\times9.8\times80=47\,040$ J<br><b>A1</b> KE $=\tfrac12\times60\times900=27\,000$ J<br><b>(b) A1</b> $20\,040$ J (≈ 20 kJ)<br><b>(c) C1</b> $F=W/d=20\,040/400$<br><b>A1</b> 50 N` },
    { d: 3, type: "struct", marks: 6, q: P`A country must choose between building a nuclear power station and a large wind farm. Discuss the advantages and disadvantages of each, referring to reliability, scale and environmental impact.`, ms: P`<b>B1</b> nuclear: very large, constant output / reliable<br><b>B1</b> nuclear: no CO₂ emissions when running<br><b>B1</b> nuclear: radioactive waste stored for very long times; risk of accident; non-renewable<br><b>B1</b> wind: renewable, no fuel, no emissions when running<br><b>B1</b> wind: unreliable (depends on wind), needs many turbines / large area for same output<br><b>B1</b> wind: noise, visual impact, danger to birds; reasoned conclusion` },
    { d: 3, type: "struct", marks: 5, q: P`S: Water falls 50 m through the turbines of a hydroelectric station at 2000 kg/s. The station's overall efficiency is 80%. Calculate (a) the GPE lost by the water each second, (b) the electrical power output, (c) the energy output in one day in MJ.`, ms: P`<b>(a) C1</b> $2000\times9.8\times50$<br><b>A1</b> $9.8\times10^5$ J (each second)<br><b>(b) A1</b> $0.80\times9.8\times10^5=7.8\times10^5$ W (784 kW)<br><b>(c) C1</b> $7.84\times10^5\times86\,400$<br><b>A1</b> $6.8\times10^4$ MJ` },
    { d: 3, type: "struct", marks: 4, q: P`S: Explain why the Sun is described as the source of energy for most energy resources. Name the exceptions and their sources.`, ms: P`<b>B1</b> fossil fuels/biofuels come from plants that used sunlight (photosynthesis)<br><b>B1</b> wind (uneven heating), waves (from wind), hydro (evaporation and rain) all driven by the Sun<br><b>B1</b> exceptions: geothermal (radioactive decay inside Earth), nuclear (uranium)<br><b>B1</b> tidal (gravitational pull of the Moon)` }
  ]
});
}
