window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
const nucleus = (cx, cy, p, n, r = 7) => { let s = "", k = 0; const tot = p + n; for (let i = 0; i < tot; i++) { const a = i * 2.39996, rr = r * 1.9 * Math.sqrt(i); const isP = (i % 2 === 0 && k < p) || (tot - i <= p - k); if (isP) k++; s += F.circ(cx + rr * Math.cos(a), cy + rr * Math.sin(a), r, isP ? "r rS r" : "m mS m"); } return s; };
const src = (x, y) => F.rect(x - 14, y - 14, 28, 28, "k mS", 4) + F.text(x, y + 30, "source", "tk small");
//@@HELPERS-END

/* ============================================================
   NUCLEAR PHYSICS  (0625: 5.1, 5.2)
   ============================================================ */
TOPICS.push({
  id: "nuclear", subject: "physics", unit: 5, title: "Atoms & radioactivity",
  blurb: "The nuclear atom and Rutherford scattering, isotopes, fission and fusion, background radiation, alpha, beta and gamma, decay equations, half-life, uses and safety.",
  level: "Core → Supplement", demo: "halflife",
  syllabus: [
    ["5.1.1", "Describe the atom: a positively charged nucleus surrounded by negatively charged electrons; atoms form ions by losing or gaining electrons", 0],
    ["5.1.1 S", "Describe how alpha-particle scattering by thin metal foil supports the nuclear model: tiny nucleus, mostly empty space, nucleus contains most of the mass and is positive", 1],
    ["5.1.2", "Describe the nucleus: protons and neutrons; relative charges of protons, neutrons and electrons", 2],
    ["5.1.2", "Define proton number Z and nucleon number A; use nuclide notation", 2],
    ["5.1.2 S", "Relate proton number to the relative charge, and nucleon number to the relative mass, of a nucleus", 2],
    ["5.1.2", "Explain what an isotope is; an element may have more than one isotope", 3],
    ["5.1.2", "Describe nuclear fission and nuclear fusion, including nuclide equations and qualitative mass and energy changes", 4],
    ["5.2.1", "Background radiation and its main sources: radon gas, rocks and buildings, food and drink, cosmic rays", 5],
    ["5.2.1", "Ionising radiation is measured with a detector connected to a counter; count rate in counts/s or counts/min", 5],
    ["5.2.1 S", "Use background measurements to find a corrected count rate", 5],
    ["5.2.2", "Emission is spontaneous and random in direction; identify α, β, γ by nature, ionising effect and penetrating ability", 6],
    ["5.2.2 S", "Describe deflection of α, β and γ in electric and magnetic fields; explain relative ionising effects using kinetic energy and charge", 7],
    ["5.2.3", "Radioactive decay is a spontaneous, random change in an unstable nucleus; α or β decay changes the element", 8],
    ["5.2.3 S", "Isotopes may be unstable because of excess neutrons or being too heavy; effect of α, β and γ on the nucleus; decay equations in nuclide notation", 8],
    ["5.2.4", "Define half-life; use it in calculations with tables or decay curves", 9],
    ["5.2.4 S", "Find half-life from data where background has not been subtracted", 9],
    ["5.2.4 S", "Explain how radiation type and half-life determine uses: smoke alarms, food irradiation, sterilisation, thickness gauges, cancer diagnosis and treatment", 10],
    ["5.2.5", "Effects of ionising radiation on living things; safe handling and storage; reducing exposure: time, distance, shielding", 11]
  ],
  sections: [
    { h: "The atom (5.1.1)", body: P`
<p class="lead">An atom is a tiny, <b>positively charged nucleus</b> surrounded by <b>negatively charged electrons</b>. The nucleus is about 100 000 times smaller than the atom, so an atom is almost entirely empty space.</p>
${(() => { let s = F.circ(200, 130, 110, "m thin d") + F.circ(200, 130, 70, "m thin d") + nucleus(200, 130, 3, 4, 6);
  [[310, 130], [90, 130], [200, 60]].forEach(([x, y]) => { s += F.circ(x, y, 7, "b bF") + F.text(x, y + 4, "−", "small bold") ; });
  s += F.text(330, 70, "electrons (−) orbit the nucleus", "tb small bold", "start") + F.text(330, 150, "nucleus: protons (+)", "tr small bold", "start") + F.text(330, 168, "and neutrons (0)", "tm small bold", "start");
  return F.fig(560, 260, s, "A lithium atom (not to scale: if the nucleus were this size, the atom would be about a kilometre across).", { size: "wide" }); })()}
<h3>Ions</h3>
<p>An atom has equal numbers of protons and electrons, so it is neutral overall. If it <b>loses</b> electrons it becomes a <b>positive ion</b>; if it <b>gains</b> electrons it becomes a <b>negative ion</b>. The nucleus does not change.</p>
<details class="check"><summary>A sodium atom loses one electron. What is the charge on the ion it forms, and has the nucleus changed?</summary><div>+1 (Na⁺). No: only the number of electrons changed.</div></details>`},

    { h: "Evidence for the nucleus: alpha scattering (5.1.1 S)", body: P`
<p class="lead">In 1909 Geiger and Marsden, working for Rutherford, fired <b>alpha particles</b> (small, positive, fast) at a very thin sheet of <b>gold foil</b> and recorded where they went.</p>
<div class="viz" data-viz="alphaScatter"></div>
<table class="t"><tr><th>Observation</th><th>Conclusion</th></tr>
<tr><td>Almost all alpha particles went <b>straight through</b>, undeflected</td><td>The atom is mostly <b>empty space</b></td></tr>
<tr><td>A few were <b>deflected</b> through small angles</td><td>The nucleus is <b>positively charged</b> (it repels the positive alphas)</td></tr>
<tr><td>A very few (about 1 in 8000) <b>bounced back</b></td><td>The nucleus is <b>very small</b> and contains <b>most of the mass</b> (it is dense enough to turn a fast alpha right round)</td></tr></table>
<div class="callout why"><b class="t">Why this overturned the "plum pudding" model</b>The earlier model pictured positive charge spread evenly through the atom, with electrons dotted in it. Spread-out charge could only deflect alphas slightly; it could never send one straight back. Only a tiny, concentrated, positive nucleus can.</div>`},

    { h: "Protons, neutrons and nuclide notation (5.1.2)", body: P`
<table class="t"><tr><th>Particle</th><th>Where</th><th>Relative charge</th><th>Relative mass</th></tr>
<tr><td>Proton</td><td>Nucleus</td><td>+1</td><td>1</td></tr><tr><td>Neutron</td><td>Nucleus</td><td>0</td><td>1</td></tr><tr><td>Electron</td><td>Orbiting the nucleus</td><td>−1</td><td>about 1/2000 (negligible)</td></tr></table>
<p>Protons and neutrons together are called <b>nucleons</b>.</p>
<ul><li><b>Proton number $Z$</b> (atomic number): the number of protons in the nucleus. It identifies the element.</li>
<li><b>Nucleon number $A$</b> (mass number): the total number of protons + neutrons.</li>
<li>Number of neutrons $=A-Z$.</li></ul>
${(() => { let s = F.text(200, 130, "C", "tk serif") ; s = `<text x="230" y="140" text-anchor="middle" class="tk serif" style="font-size:80px">C</text><text x="186" y="88" text-anchor="end" class="tc bold" style="font-size:30px">14</text><text x="186" y="150" text-anchor="end" class="tb bold" style="font-size:30px">6</text>`;
  s += F.text(300, 76, "A = nucleon number (protons + neutrons)", "tc small bold", "start") + F.text(300, 146, "Z = proton number", "tb small bold", "start") + F.text(300, 110, "X = chemical symbol", "tk small bold", "start");
  return F.fig(600, 170, s, "Carbon-14 has 6 protons and 14 − 6 = 8 neutrons.", { size: "wide" }); })()}
<h3>Charge and mass of a nucleus (S)</h3>
<p>The <b>relative charge</b> of a nucleus equals its <b>proton number</b> $Z$ (each proton +1). Its <b>relative mass</b> equals its <b>nucleon number</b> $A$ (each nucleon ≈ 1). So the nucleus of $^{14}_{6}\text{C}$ has charge +6 and relative mass 14.</p>
<details class="check"><summary>How many protons, neutrons and electrons are in a neutral atom of $^{235}_{92}\text{U}$?</summary><div>92 protons, 235 − 92 = 143 neutrons, 92 electrons.</div></details>`},

    { h: "Isotopes (5.1.2)", body: P`
<p class="lead"><b>Isotopes</b> are atoms of the <b>same element</b> (same number of protons) with <b>different numbers of neutrons</b> (so different nucleon numbers).</p>
${F.row(...[[1, 0, "hydrogen-1"], [1, 1, "deuterium (H-2)"], [1, 2, "tritium (H-3)"]].map(([p, n, name]) => F.fig(170, 140, nucleus(85, 60, p, n, 9) + F.text(85, 120, name, "tk small bold"), `${p} proton, ${n} neutron${n === 1 ? "" : "s"}`, { size: "tiny" })))}
<ul><li>Isotopes have the same chemical properties (same electrons) but different masses.</li><li>Some isotopes are <b>stable</b>; others are <b>unstable</b> (radioactive) and decay. Carbon-12 is stable; carbon-14 is radioactive.</li><li>An element may have several isotopes: tin has ten stable ones.</li></ul>`},

    { h: "Fission and fusion (5.1.2)", body: P`
<h3>Nuclear fission</h3>
<p>A large, heavy nucleus (such as uranium-235) absorbs a <b>neutron</b>, becomes unstable, and <b>splits</b> into two smaller nuclei, releasing two or three neutrons and a large amount of energy.</p>
$$^{235}_{92}\text{U}+^{1}_{0}\text{n}\rightarrow^{141}_{56}\text{Ba}+^{92}_{36}\text{Kr}+3\,{}^{1}_{0}\text{n}+\text{energy}$$
${(() => { let s = F.circ(40, 110, 7, "m mF") + F.arrow(50, 110, 110, 110, "m", 8) + nucleus(160, 110, 10, 12, 6) + F.text(160, 195, "U-235", "tk small bold") + F.arrow(205, 110, 255, 110, "k mid", 9);
  s += nucleus(310, 70, 5, 6, 6) + nucleus(310, 160, 4, 5, 6) + F.text(370, 70, "barium", "tk small", "start") + F.text(370, 165, "krypton", "tk small", "start");
  [[440, 90], [460, 120], [440, 145]].forEach(([x, y]) => { s += F.arrow(330, 115, x, y, "m thin", 7) + F.circ(x + 8, y, 7, "m mF"); });
  s += F.text(480, 100, "neutrons can", "tm small", "start") + F.text(480, 116, "split more U-235:", "tm small", "start") + F.text(480, 132, "chain reaction", "tm small bold", "start");
  return F.fig(600, 210, s, "Fission releases neutrons that can trigger more fissions: a chain reaction. In a reactor, control rods absorb some neutrons to keep it steady.", { size: "wide" }); })()}
<h3>Nuclear fusion</h3>
<p>Two light nuclei (such as isotopes of hydrogen) <b>join</b> to form a heavier nucleus, releasing energy. Fusion powers the Sun and stars. It needs enormous temperatures and pressures so the positive nuclei can overcome their repulsion.</p>
$$^{2}_{1}\text{H}+^{3}_{1}\text{H}\rightarrow^{4}_{2}\text{He}+^{1}_{0}\text{n}+\text{energy}$$
<div class="callout key"><b class="t">Mass and energy</b>In both fission and fusion, the total mass of the products is slightly <b>less</b> than the mass of what went in. The "missing" mass has been converted into energy (kinetic energy of the products and gamma radiation). Nucleon numbers and proton numbers still balance on both sides of the equation.</div>`},

    { h: "Background radiation and detecting radiation (5.2.1)", body: P`
<p class="lead"><b>Background radiation</b> is the low level of ionising radiation that is around us all the time, from natural and artificial sources.</p>
${(() => { const parts = [["radon gas (from rocks)", 42, "r"], ["rocks and buildings", 16, "o"], ["food and drink", 11, "g"], ["cosmic rays", 13, "b"], ["medical", 15, "m"], ["other (nuclear industry, fallout)", 3, "k"]]; let s = "", a0 = -90;
  parts.forEach(([n, pct, c], i) => { const a1 = a0 + pct * 3.6, r = 90, cx = 140, cy = 120, p = (d) => [cx + r * Math.cos(d * Math.PI / 180), cy + r * Math.sin(d * Math.PI / 180)], [x0, y0] = p(a0), [x1, y1] = p(a1);
    s += F.path(`M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${pct > 50 ? 1 : 0} 1 ${x1},${y1} Z`, c + "S " + c) + F.rect(270, 30 + i * 30, 14, 14, c + "S " + c, 3) + F.text(292, 42 + i * 30, `${n}: ${pct}%`, "tk small", "start"); a0 = a1; });
  return F.fig(560, 240, s, "Typical sources of background radiation (UK averages; they vary a lot with location).", { size: "wide" }); })()}
<h3>Detecting radiation</h3>
<p>Ionising radiation is measured with a <b>detector</b> (such as a Geiger–Müller tube) connected to a <b>counter</b> or ratemeter. The <b>count rate</b> is measured in <b>counts per second</b> or <b>counts per minute</b>.</p>
<h3>Corrected count rate (S)</h3>
<p>The detector picks up background radiation as well as the source. To find the count rate due to the source alone:</p>
$$\text{corrected count rate}=\text{measured count rate}-\text{background count rate}$$
<p>Measure the background first, with the source well away, for a long time (it is random), and subtract it from every reading.</p>
<details class="check"><summary>Background is 30 counts/min. With a source, the counter reads 270 counts/min. What is the corrected count rate?</summary><div>270 − 30 = 240 counts/min.</div></details>`},

    { h: "Alpha, beta and gamma (5.2.2)", body: P`
<p class="lead">Unstable nuclei emit radiation <b>spontaneously</b> (nothing triggers it) and <b>randomly</b> in direction. There are three types.</p>
<table class="t"><tr><th></th><th>Alpha (α)</th><th>Beta (β⁻)</th><th>Gamma (γ)</th></tr>
<tr><td>Nature</td><td>Helium nucleus: 2 protons + 2 neutrons</td><td>Fast electron from the nucleus</td><td>Electromagnetic wave (very short wavelength)</td></tr>
<tr><td>Charge</td><td>+2</td><td>−1</td><td>0</td></tr><tr><td>Relative mass</td><td>4</td><td>about 1/2000</td><td>0</td></tr>
<tr><td>Ionising effect</td><td><b>Strong</b></td><td>Medium</td><td>Weak</td></tr>
<tr><td>Penetration</td><td><b>Least</b>: stopped by paper, skin, a few cm of air</td><td>Stopped by a few mm of aluminium</td><td><b>Most</b>: reduced by several cm of lead or metres of concrete</td></tr></table>
<div class="viz" data-viz="penetration"></div>
<div class="callout why"><b class="t">Ionising vs penetrating</b>They are opposites. Alpha ionises so strongly that it loses all its energy within a few centimetres of air, so it can't penetrate far. Gamma rarely interacts, so it travels a long way.</div>
<details class="check"><summary>A source is placed in front of a detector. Paper doesn't change the count; 5 mm of aluminium reduces it to background. What does the source emit?</summary><div>Beta only (no alpha, since paper had no effect; no gamma, since aluminium stopped everything).</div></details>`},

    { h: "Deflection and ionisation (5.2.2 S)", body: P`
${(() => { let s = F.rect(150, 20, 300, 200, "m mS", 6); for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) { const x = 180 + i * 50, y = 45 + j * 50; s += F.line(x - 5, y - 5, x + 5, y + 5, "m thin") + F.line(x + 5, y - 5, x - 5, y + 5, "m thin"); }
  s += src(60, 120) + F.line(74, 120, 150, 120, "k mid") + F.line(150, 120, 460, 120, "g thick") + F.text(470, 124, "γ: undeflected", "tg small bold", "start");
  s += F.path("M150,120 Q330,120 450,80", "r thick") + F.text(460, 78, "α: deflected a little", "tr small bold", "start") + F.path("M150,120 Q220,125 280,215", "b thick") + F.text(290, 236, "β: deflected strongly, opposite way", "tb small bold", "start");
  s += F.text(300, 14, "magnetic field into the page", "tm small bold");
  return F.fig(620, 250, s, "In a magnetic (or electric) field, α and β bend in opposite directions (opposite charges). β bends more because it is far lighter. γ is uncharged, so it isn't deflected.", { size: "wide" }); })()}
<ul><li>In an <b>electric field</b>: α is attracted towards the negative plate, β towards the positive plate, γ goes straight through.</li>
<li>Use Fleming's left-hand rule for the magnetic field (α is a positive current; β a negative one).</li></ul>
<h3>Why alpha ionises most</h3>
<p>Ionising means knocking electrons out of atoms. Alpha particles have a <b>large charge (+2)</b> and are <b>massive and slow</b>, with a lot of kinetic energy; they interact strongly with every atom they pass, creating many ions per cm and quickly losing their energy. Beta has a smaller charge (−1) and moves faster, so it ionises less. Gamma has <b>no charge</b>, so it ionises least.</p>`},

    { h: "Radioactive decay and decay equations (5.2.3)", body: P`
<p class="lead"><b>Radioactive decay</b> is a change in an <b>unstable nucleus</b>, emitting α or β particles and/or γ radiation. It is <b>spontaneous</b> and <b>random</b>: you cannot predict when a particular nucleus will decay, and nothing (temperature, pressure, chemical reaction) changes the rate. In α or β decay the nucleus becomes a <b>different element</b>.</p>
<h3>Why some nuclei are unstable (S)</h3>
<ul><li>Too many <b>neutrons</b> compared with protons → tends to β-decay (a neutron turns into a proton + an electron, which is emitted).</li>
<li>Too <b>heavy</b> (too many nucleons) → tends to α-decay, losing 4 nucleons at once.</li>
<li>After α or β decay the nucleus is often left with excess energy, released as a γ ray. Each decay makes the nucleus <b>more stable</b>.</li></ul>
<h3>Decay equations (S)</h3>
<table class="t"><tr><th>Decay</th><th>Change to the nucleus</th><th>Example</th></tr>
<tr><td>α</td><td>$A$ decreases by 4, $Z$ by 2</td><td>$^{238}_{92}\text{U}\rightarrow^{234}_{90}\text{Th}+^{4}_{2}\alpha$</td></tr>
<tr><td>β⁻</td><td>$A$ unchanged, $Z$ increases by 1 (n → p + e⁻)</td><td>$^{14}_{6}\text{C}\rightarrow^{14}_{7}\text{N}+^{\ 0}_{-1}\beta$</td></tr>
<tr><td>γ</td><td>No change to $A$ or $Z$ (just loses energy)</td><td>$^{60}_{27}\text{Co}^{*}\rightarrow^{60}_{27}\text{Co}+\gamma$</td></tr></table>
<div class="callout exam"><b class="t">Checking an equation</b>The top numbers must add up to the same total on both sides, and so must the bottom numbers. In β decay the electron is written $^{\ 0}_{-1}\beta$ (or e), so $Z$ goes <b>up</b> by one: 6 = 7 + (−1).</div>
<details class="check"><summary>Radium-226 ($Z$ = 88) emits an alpha particle. Write the equation and name the product (radon, Rn).</summary><div>$^{226}_{88}\text{Ra}\rightarrow^{222}_{86}\text{Rn}+^{4}_{2}\alpha$</div></details>`},

    { h: "Half-life (5.2.4)", body: P`
<p class="lead">The <b>half-life</b> of an isotope is the <b>time taken for half the nuclei of that isotope in any sample to decay</b>. (Equivalently, the time for the count rate to fall to half.)</p>
${F.plot({ w: 520, h: 300, x: [0, 40], y: [0, 800], gridStep: [5, 100], ticks: { x: [10, 20, 30, 40], y: [200, 400, 600, 800] }, xlabel: "time / days", ylabel: "count rate / counts per min",
  curves: [{ f: t => 800 * Math.pow(.5, t / 8), c: "c thick" }],
  extra: (X, Y) => [1, 2, 3].map(k => F.line(X(0), Y(800 / 2 ** k), X(8 * k), Y(800 / 2 ** k), "m d thin") + F.line(X(8 * k), Y(800 / 2 ** k), X(8 * k), Y(0), "m d thin") + F.text(X(8 * k), Y(800 / 2 ** k) - 8, 800 / 2 ** k, "tc small bold")).join("") + F.text(X(4), Y(30), "8 days", "tm small") + F.text(X(12), Y(30), "8 days", "tm small") + F.text(X(20), Y(30), "8 days", "tm small"),
  cap: "Iodine-131: 800 → 400 → 200 → 100 counts/min, halving every 8 days. Half-life = 8 days." })}
<h3>Calculations</h3>
<p>A sample has 6400 undecayed nuclei and a half-life of 5 hours. How many remain after 20 hours?</p>
<p>20 h = 4 half-lives: $6400\rightarrow3200\rightarrow1600\rightarrow800\rightarrow400$. <b>400 nuclei</b> remain.</p>
<p>What fraction is left after $n$ half-lives? $\left(\tfrac12\right)^n$. After 3 half-lives, $\tfrac18$ remains; $\tfrac78$ has decayed.</p>
<h3>With background radiation (S)</h3>
<p>If the readings include background, <b>subtract the background first</b>, then halve. For example: background 20 counts/min, initial reading 420 counts/min. The source gives 400; half is 200; so look for when the <b>reading</b> is 200 + 20 = <b>220</b> counts/min.</p>
<div class="callout warn"><b class="t">Common error</b>Halving 420 to 210 and reading that time gives the wrong half-life. The background doesn't decay.</div>`},

    { h: "Uses of radioactive isotopes (5.2.4 S)", body: P`
<p class="lead">The choice of isotope depends on two things: the <b>type of radiation</b> (how far it must penetrate, how much it ionises) and the <b>half-life</b> (how long it must last, and how long it stays dangerous).</p>
<table class="t"><tr><th>Use</th><th>Radiation</th><th>Half-life</th><th>Why</th></tr>
<tr><td><b>Smoke alarm</b></td><td>α (americium-241)</td><td>Long (432 years)</td><td>α ionises the air strongly so a small current flows; smoke absorbs the α and the current drops, triggering the alarm. α can't escape the alarm's case. Long half-life: works for years.</td></tr>
<tr><td><b>Thickness gauge</b> (paper, foil)</td><td>β (for paper/thin metal); γ for thick steel</td><td>Long</td><td>β is partly absorbed by paper: if the sheet gets thicker, the count drops and the rollers adjust. α would be stopped completely; γ would pass straight through with no change. Long half-life so the count only changes because of thickness.</td></tr>
<tr><td><b>Sterilising medical equipment</b></td><td>γ (cobalt-60)</td><td>Long-ish (5 years)</td><td>γ penetrates the sealed packaging and kills bacteria; equipment doesn't become radioactive and isn't heated.</td></tr>
<tr><td><b>Irradiating food</b></td><td>γ</td><td>Long</td><td>Kills bacteria so food keeps longer; penetrates packaging.</td></tr>
<tr><td><b>Diagnosis</b> (tracers)</td><td>γ (technetium-99m)</td><td><b>Short</b> (6 hours)</td><td>γ passes out of the body to the detector; weak ionisation; short half-life so the patient isn't exposed for long.</td></tr>
<tr><td><b>Cancer treatment</b> (radiotherapy)</td><td>γ (beams from cobalt-60)</td><td>Long (source)</td><td>Focused γ beams from several directions kill cancer cells while limiting the dose to healthy tissue.</td></tr></table>
${(() => { let s = F.rect(40, 100, 480, 10, "m mS") + F.circ(60, 60, 26, "k") + F.circ(60, 150, 26, "k") + F.circ(500, 60, 26, "k") + F.circ(500, 150, 26, "k") + F.arrow(80, 105, 480, 105, "m thin", 7);
  s += F.rect(260, 40, 30, 30, "b bS b", 4) + F.text(275, 32, "β source", "tb small bold") + F.line(275, 70, 275, 98, "b d") + F.rect(258, 120, 34, 36, "k mS", 4) + F.text(275, 172, "detector", "tk small bold") + F.line(292, 138, 380, 138, "k") + F.rect(380, 124, 90, 28, "k bgF", 4) + F.text(425, 142, "controls rollers", "tk small");
  return F.fig(560, 190, s, "Paper thickness monitoring with beta radiation.", { size: "wide" }); })()}`},

    { h: "Dangers and safety (5.2.5)", body: P`
<p class="lead">Ionising radiation damages living cells by ionising the molecules in them, including DNA.</p>
<ul><li>High doses: <b>cell death</b> (radiation burns, radiation sickness).</li>
<li>Lower doses: <b>mutations</b> in DNA, which can lead to <b>cancer</b>.</li>
<li>Outside the body, α is least dangerous (stopped by skin). <b>Inside</b> the body (swallowed or breathed in, like radon), α is the <b>most</b> dangerous, because all its ionising energy is deposited in a small volume of tissue.</li></ul>
<h3>Reducing exposure: time, distance, shielding</h3>
<table class="t"><tr><th>Precaution</th><th>Why it works</th></tr>
<tr><td><b>Minimise time</b> near the source</td><td>Less radiation received in total</td></tr>
<tr><td><b>Maximise distance</b>: handle with tongs, never by hand; point sources away from people</td><td>Radiation spreads out (and α/β are absorbed by air), so the dose falls rapidly with distance</td></tr>
<tr><td><b>Shielding</b>: store in lead-lined boxes; lead aprons; walls of concrete</td><td>Absorbs the radiation before it reaches people</td></tr></table>
<p>Other rules: label and lock sources away when not in use; return them immediately; workers wear <b>dosimeter badges</b> to monitor their exposure; radioactive waste is sealed and stored securely, sometimes deep underground, for as long as it remains dangerous.</p>
<details class="check"><summary>Why are radioactive sources handled with long tongs and stored in lead-lined boxes?</summary><div>Tongs increase the distance from the hands; lead absorbs (shields) the radiation. Both reduce the dose received.</div></details>`}
  ],
  worked: [
    { q: P`S: A count rate is measured: 0 min 480, 10 min 260, 20 min 150, 30 min 95, 40 min 72 counts/min. Background is 40 counts/min. Find the half-life.`,
      steps: [P`Corrected counts: 440, 220, 110, 55, 32.`, P`440 → 220 in 10 min; 220 → 110 in 10 min.`, P`Half-life = <b>10 minutes</b>.`]},
    { q: P`S: Polonium-210 ($Z$ = 84) decays by alpha emission to lead (Pb). Write the decay equation.`,
      steps: [P`Alpha: $A$ falls by 4, $Z$ by 2: $A=206$, $Z=82$.`, P`$^{210}_{84}\text{Po}\rightarrow^{206}_{82}\text{Pb}+^{4}_{2}\alpha$`, P`Check: $210=206+4$, $84=82+2$.`]},
    { q: P`A sample contains 1.6 mg of a radioisotope with half-life 3 days. What mass of it remains after 12 days?`,
      steps: [P`12 days = 4 half-lives.`, P`$1.6\rightarrow0.8\rightarrow0.4\rightarrow0.2\rightarrow0.1$ mg.`, P`0.1 mg remains (the rest has become a different element, so the total mass of the sample hardly changes).`]}
  ],
  formulas: [["Neutrons", "A − Z"], ["Corrected count rate (S)", "measured − background"], ["α decay (S)", P`$^{A}_{Z}\text{X}\rightarrow^{A-4}_{Z-2}\text{Y}+^{4}_{2}\alpha$`], ["β decay (S)", P`$^{A}_{Z}\text{X}\rightarrow^{\ A}_{Z+1}\text{Y}+^{\ 0}_{-1}\beta$`], ["Fraction left after n half-lives", P`$\left(\tfrac12\right)^n$`]],
  cards: [
    ["Relative charges: proton, neutron, electron", "+1, 0, −1."],
    ["Define proton number Z", "Number of protons in the nucleus."],
    ["Define nucleon number A", "Number of protons + neutrons."],
    ["What is an isotope?", "Same element (same protons), different number of neutrons."],
    ["Alpha scattering: most pass straight through shows…", "The atom is mostly empty space."],
    ["Alpha scattering: a few bounce back shows…", "Tiny, dense nucleus containing most of the mass."],
    ["Alpha scattering: deflection shows…", "The nucleus is positively charged."],
    ["What is fission?", "A large nucleus splits (after absorbing a neutron) into two smaller nuclei, releasing neutrons and energy."],
    ["What is fusion?", "Light nuclei join to form a heavier nucleus, releasing energy (powers stars)."],
    ["Main sources of background radiation", "Radon gas, rocks and buildings, food and drink, cosmic rays (plus medical)."],
    ["Corrected count rate (S)", "Measured count rate minus background."],
    ["Alpha particle", "Helium nucleus (2p + 2n), +2, strongly ionising, stopped by paper."],
    ["Beta particle", "Fast electron from the nucleus, −1, stopped by a few mm aluminium."],
    ["Gamma ray", "EM wave, no charge, weakly ionising, reduced by thick lead/concrete."],
    ["Why is alpha the most ionising? (S)", "Large charge, large mass, slow, lots of KE: interacts strongly with atoms."],
    ["Which is not deflected in a field?", "Gamma (uncharged)."],
    ["Alpha decay effect on A and Z (S)", "A − 4, Z − 2."],
    ["Beta decay effect on A and Z (S)", "A unchanged, Z + 1 (a neutron becomes a proton)."],
    ["Define half-life", "Time for half the nuclei of an isotope in a sample to decay."],
    ["Fraction left after 3 half-lives", "1/8."],
    ["Smoke alarm isotope (S)", "Alpha emitter with long half-life (americium-241)."],
    ["Medical tracer (S)", "Gamma emitter with short half-life (technetium-99m)."],
    ["Paper thickness gauge (S)", "Beta emitter, long half-life."],
    ["Three ways to reduce exposure", "Less time, more distance, shielding."],
    ["Effects of ionising radiation on cells", "Cell death, mutations, cancer."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`An atom of $^{23}_{11}\text{Na}$ has how many neutrons?`, opts: ["11", "12", "23", "34"], ans: 1, why: P`$23-11=12$.` },
    { type: "mcq", marks: 1, q: P`Isotopes of an element have different numbers of`, opts: ["protons", "electrons", "neutrons", "charges"], ans: 2, why: P`Same protons, different neutrons.` },
    { type: "mcq", marks: 1, q: P`Which radiation is the most penetrating?`, opts: ["Alpha", "Beta", "Gamma", "All equal"], ans: 2, why: P`Gamma.` },
    { type: "mcq", marks: 1, q: P`A beta particle is`, opts: ["a helium nucleus", "a fast electron", "an EM wave", "a neutron"], ans: 1, why: P`Emitted from the nucleus.` },
    { type: "mcq", marks: 1, q: P`The largest source of background radiation is usually`, opts: ["nuclear power", "radon gas", "X-rays", "mobile phones"], ans: 1, why: P`Radon from rocks.` },
    { type: "mcq", marks: 1, q: P`The half-life is 2 h. What fraction of the original nuclei remain after 6 h?`, opts: ["1/2", "1/3", "1/6", "1/8"], ans: 3, why: P`3 half-lives: $1/8$.` },
    { type: "mcq", marks: 1, q: P`S: In β⁻ decay the proton number`, opts: ["falls by 2", "falls by 1", "stays the same", "rises by 1"], ans: 3, why: P`A neutron changes into a proton.` },
    { type: "mcq", marks: 1, q: P`S: Which isotope is best for a medical tracer?`, opts: ["α, long half-life", "β, long half-life", "γ, short half-life", "γ, very long half-life"], ans: 2, why: P`γ leaves the body; short half-life limits dose.` },
    { type: "struct", marks: 3, q: P`S: Describe the results of the alpha scattering experiment and state what each tells us about the atom.`,
      ms: P`<b>B1</b> most went straight through: atom mostly empty space<br><b>B1</b> some deflected: nucleus positively charged<br><b>B1</b> very few bounced back: nucleus tiny and contains most of the mass` },
    { type: "struct", marks: 3, q: P`Describe the structure of an atom of $^{7}_{3}\text{Li}$.`,
      ms: P`<b>B1</b> nucleus with 3 protons<br><b>B1</b> and 4 neutrons<br><b>B1</b> 3 electrons orbiting the nucleus` },
    { type: "struct", marks: 4, q: P`Compare alpha, beta and gamma radiation in terms of their nature, ionising ability and penetration.`,
      ms: P`<b>B1</b> α helium nucleus, β electron, γ EM wave<br><b>B1</b> α most ionising, γ least<br><b>B1</b> α stopped by paper, β by aluminium (few mm)<br><b>B1</b> γ reduced by thick lead/concrete` },
    { type: "struct", marks: 3, q: P`Describe the process of nuclear fission and explain how a chain reaction occurs.`,
      ms: P`<b>B1</b> U-235 nucleus absorbs a neutron and splits into two smaller nuclei<br><b>B1</b> releasing 2–3 neutrons and energy<br><b>B1</b> the released neutrons cause further fissions: chain reaction` },
    { type: "struct", marks: 3, q: P`S: A detector measures 380 counts/min near a source. With the source removed it measures 20 counts/min. The half-life is 4 hours. What will the detector read after 8 hours?`,
      ms: P`<b>C1</b> corrected 360<br><b>C1</b> after 2 half-lives: 90<br><b>A1</b> reading 90 + 20 = 110 counts/min` },
    { type: "struct", marks: 3, q: P`S: Uranium-238 ($Z$ = 92) emits an alpha particle to form thorium (Th). Write the equation.`,
      ms: P`<b>B1</b> $^{238}_{92}\text{U}$ on the left<br><b>B1</b> $^{234}_{90}\text{Th}$<br><b>B1</b> $+{}^{4}_{2}\alpha$ (or He)` },
    { type: "struct", marks: 4, q: P`S: Explain why a beta source with a long half-life is used to monitor the thickness of paper.`,
      ms: P`<b>B1</b> β is partly absorbed by paper, so the count depends on thickness<br><b>B1</b> α would be completely stopped; γ would pass through almost unaffected<br><b>B1</b> long half-life: count rate doesn't drop noticeably due to decay<br><b>B1</b> so changes in count are due only to changes in thickness` },
    { type: "struct", marks: 3, q: P`State three safety precautions when using radioactive sources in a school laboratory and explain one.`,
      ms: P`<b>B1</b> handle with tongs / keep at a distance<br><b>B1</b> store in lead-lined box / shielding; minimise time; point away from body<br><b>B1</b> explanation, e.g. distance reduces the radiation reaching the body` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: P`Define (a) proton number, (b) nucleon number.`, ms: P`<b>B1</b> (a) number of protons in the nucleus<br><b>B1</b> (b) number of protons and neutrons in the nucleus` },
    { d: 1, type: "mcq", marks: 1, q: P`Which is stopped by a sheet of paper?`, opts: ["Alpha", "Beta", "Gamma", "None"], ans: 0, why: P`Alpha.` },
    { d: 1, type: "struct", marks: 2, q: P`Name two sources of background radiation.`, ms: P`<b>B2</b> any two: radon, rocks/buildings, food and drink, cosmic rays, medical` },
    { d: 1, type: "struct", marks: 2, q: P`Explain what is meant by an isotope, giving an example.`, ms: P`<b>B1</b> atoms of the same element with different numbers of neutrons<br><b>B1</b> e.g. carbon-12 and carbon-14` },
    { d: 2, type: "struct", marks: 3, q: P`A source has a half-life of 15 minutes. Its initial count rate (background already removed) is 1200 counts/min. Calculate the count rate after 1 hour.`, ms: P`<b>C1</b> 1 h = 4 half-lives<br><b>C1</b> 1200 → 600 → 300 → 150 → 75<br><b>A1</b> 75 counts/min` },
    { d: 2, type: "struct", marks: 3, q: P`S: Explain why α particles are more strongly ionising than β particles.`, ms: P`<b>B1</b> α has a larger charge (+2 vs −1)<br><b>B1</b> α is much more massive and moves more slowly, interacting with more atoms<br><b>B1</b> so it causes more ionisations per unit length (and loses energy faster)` },
    { d: 2, type: "mcq", marks: 1, q: P`S: $^{90}_{38}\text{Sr}$ emits a β⁻ particle. The product nucleus is`, opts: [P`$^{90}_{37}$Rb`, P`$^{90}_{39}$Y`, P`$^{86}_{36}$Kr`, P`$^{89}_{38}$Sr`], ans: 1, why: P`$Z$ up 1, $A$ unchanged.` },
    { d: 2, type: "struct", marks: 3, q: P`Explain why α radiation is the most dangerous if a radioactive source is swallowed, but the least dangerous if it is outside the body.`, ms: P`<b>B1</b> outside: α stopped by dead outer layer of skin / clothing / air<br><b>B1</b> inside: α can reach living cells directly<br><b>B1</b> it is strongly ionising, depositing all its energy in a small volume, damaging cells` },
    { d: 3, type: "struct", marks: 5, q: P`S: Readings: time 0, 2, 4, 6, 8 h; count rate 650, 380, 230, 140, 95 counts/min. Background is 30 counts/min. (a) Correct the readings. (b) Plot or use them to find the half-life. (c) Explain why the corrected count after a long time never reaches exactly zero in practice.`, ms: P`<b>(a) B1</b> 620, 350, 200, 110, 65<br><b>(b) C1</b> 620 → 310 occurs at about 2.4 h<br><b>A1</b> half-life ≈ 2.4 h (accept 2.2–2.6)<br><b>(c) B1</b> decay is random so readings fluctuate<br><b>B1</b> background varies; and some nuclei always remain (halving never gives zero)` },
    { d: 3, type: "struct", marks: 6, q: P`S: A hospital must choose an isotope (a) to sterilise sealed syringes, (b) as a tracer to check a patient's kidney function. For each, state the type of radiation and half-life you would choose, and explain why.`, ms: P`<b>(a) B1</b> gamma<br><b>B1</b> penetrates the sealed packaging to kill bacteria<br><b>B1</b> long half-life so the source lasts a long time / steady dose<br><b>(b) B1</b> gamma<br><b>B1</b> passes out of the body to be detected; weakly ionising<br><b>B1</b> short half-life (hours) so the patient isn't exposed for long` },
    { d: 3, type: "struct", marks: 4, q: P`S: A beam containing α, β and γ radiation passes between two charged plates. Describe and explain the paths of each type.`, ms: P`<b>B1</b> α deflected towards the negative plate (positive charge)<br><b>B1</b> β deflected towards the positive plate (negative charge)<br><b>B1</b> β deflected more than α since much less mass<br><b>B1</b> γ undeflected: no charge` }
  ]
});
}
