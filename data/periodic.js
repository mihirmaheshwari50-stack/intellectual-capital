window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
const tube = (x, y, fill, lab, sub) => F.path(`M${x},${y} L${x},${y + 100} Q${x},${y + 116} ${x + 16},${y + 116} Q${x + 32},${y + 116} ${x + 32},${y + 100} L${x + 32},${y}`, "k") + F.path(`M${x + 1},${y + 30} L${x + 1},${y + 100} Q${x + 1},${y + 115} ${x + 16},${y + 115} Q${x + 31},${y + 115} ${x + 31},${y + 100} L${x + 31},${y + 30} Z`, "nostroke").replace('class="nostroke"', `class="nostroke" style="fill:${fill}"`) + F.text(x + 16, y + 140, lab, "tk small bold") + (sub ? F.text(x + 16, y + 156, sub, "tm small") : "");

/* ============================================================
   THE PERIODIC TABLE  (0620: 8.1 – 8.5)
   ============================================================ */
TOPICS.push({
  id: "periodic", subject: "chemistry", unit: 8, title: "The Periodic Table",
  blurb: "Groups and periods, metallic character, Group I and Group VII trends, halogen displacement, transition elements and the noble gases, all explained from electronic configuration.",
  level: "Core → Supplement", demo: "ptable",
  syllabus: [
    ["8.1", "The Periodic Table is an arrangement of elements in order of increasing proton number", 0],
    ["8.1", "Describe the change from metallic to non-metallic character across a period", 1],
    ["8.1", "Describe the relationship between group number and the number of outer-shell electrons, and period number and number of occupied shells", 2],
    ["8.1 S", "Explain similarities in the properties of elements in the same group in terms of electronic configuration; identify trends in groups given data", 2],
    ["8.2", "Group I: lithium, sodium and potassium are relatively soft metals with trends in melting point, density and reaction with water", 3],
    ["8.2", "Predict the properties of other elements in Group I, given information", 4],
    ["8.3", "Group VII: chlorine, bromine and iodine are diatomic non-metals with trends in colour, state and density", 5],
    ["8.3", "State the reactivity trend and describe displacement reactions of halogens with aqueous halide ions", 6],
    ["8.3", "Predict the properties of other elements in Group VII, given information", 6],
    ["8.4", "Transition elements are metals with high densities, high melting points, coloured compounds, and act as catalysts", 7],
    ["8.4 S", "Transition elements have ions with variable oxidation numbers, e.g. iron(II) and iron(III)", 7],
    ["8.5", "Noble gases are unreactive, monatomic gases; explain this in terms of electronic configuration", 8]
  ],
  sections: [
    { h: "How the table is arranged (8.1)", body: C`
<p class="lead">The Periodic Table lists the elements in order of <b>increasing proton number</b> (atomic number, Z). It is arranged so that elements with <b>similar chemical properties fall in the same vertical column</b>.</p>
<ul><li>A <b>group</b> is a vertical column. Groups are numbered I to VIII (Group VIII is also called Group 0, the noble gases).</li>
<li>A <b>period</b> is a horizontal row. Period 1 contains only H and He; periods 2 and 3 contain eight elements each.</li>
<li>The block of metals between Groups II and III is the <b>transition elements</b>.</li></ul>
${(() => { const cw = 28, x0 = 20, y0 = 40; let s = "";
  const P = [[1, 18], [1, 2, 13, 14, 15, 16, 17, 18], [1, 2, 13, 14, 15, 16, 17, 18], Array.from({ length: 18 }, (_, i) => i + 1), Array.from({ length: 18 }, (_, i) => i + 1)];
  const nonmetal = (p, c) => (p === 0 && c === 1) || c === 18 || (c >= 13 && c - 13 >= p - 1) || (p === 1 && c >= 14);
  P.forEach((cols, p) => cols.forEach(c => { const x = x0 + (c - 1) * cw, y = y0 + p * cw; const cls = c === 18 ? "mS m" : c >= 3 && c <= 12 ? "oS o" : nonmetal(p, c) ? "rS r" : "bS b"; s += F.rect(x, y, cw - 2, cw - 2, cls + " thin", 3); }));
  s += F.path(`M${x0 + 12 * cw - 1},${y0 + cw} L${x0 + 12 * cw - 1},${y0 + 2 * cw} L${x0 + 13 * cw - 1},${y0 + 2 * cw} L${x0 + 13 * cw - 1},${y0 + 3 * cw} L${x0 + 14 * cw - 1},${y0 + 3 * cw} L${x0 + 14 * cw - 1},${y0 + 4 * cw} L${x0 + 15 * cw - 1},${y0 + 4 * cw} L${x0 + 15 * cw - 1},${y0 + 5 * cw}`, "k thick");
  ["I", "II"].forEach((g, i) => s += F.text(x0 + i * cw + 13, y0 - 8, g, "tk small bold")); ["III", "IV", "V", "VI", "VII", "VIII"].forEach((g, i) => s += F.text(x0 + (12 + i) * cw + 13, y0 - 8, g, "tk small bold"));
  for (let p = 0; p < 5; p++) s += F.text(x0 - 8, y0 + p * cw + 18, p + 1, "tm small", "end");
  s += F.text(x0 + 7 * cw, y0 + 3 * cw - 7, "transition elements", "to small bold");
  s += F.arrow(x0, y0 + 5 * cw + 16, x0 + 17 * cw, y0 + 5 * cw + 16, "m", 7) + F.text(x0 + 9 * cw, y0 + 5 * cw + 34, "across a period: metals → non-metals", "tm small");
  s += F.key(x0 + 3 * cw, y0 + 8, [["b", "metals"], ["r", "non-metals"], ["m", "noble gases"]]);
  return F.fig(540, 230, s, "Outline of the first five periods. The thick stepped line separates metals (left) from non-metals (right).", { size: "wide" }); })()}
<details class="check"><summary>Element X is in Period 3, Group VI. Name it.</summary><div>Sulfur (2,8,6).</div></details>`},

    { h: "Metallic to non-metallic across a period (8.1)", body: C`
<p>Going <b>left to right</b> across a period, the elements change from <b>metals</b> to <b>non-metals</b>. Period 3 shows this clearly:</p>
<table class="t"><tr><th></th><th>Na</th><th>Mg</th><th>Al</th><th>Si</th><th>P</th><th>S</th><th>Cl</th><th>Ar</th></tr>
<tr><td>Type</td><td colspan="3">metal</td><td>metalloid</td><td colspan="4">non-metal</td></tr>
<tr><td>Structure</td><td colspan="3">giant metallic</td><td>giant covalent</td><td colspan="3">simple molecules (P₄, S₈, Cl₂)</td><td>atoms</td></tr>
<tr><td>Oxide</td><td colspan="2">basic</td><td>amphoteric</td><td colspan="4">acidic</td><td>none</td></tr>
<tr><td>Conducts?</td><td colspan="3">yes</td><td>semi</td><td colspan="4">no</td></tr></table>
<p>Metals lose electrons to form positive ions; non-metals gain electrons (or share them). The more electrons an atom must lose, the less "metallic" it is, so metallic character falls across the period.</p>
<div class="callout"><b>Exam tip:</b> "Describe the change across a period" wants the words <i>metallic</i> and <i>non-metallic</i> in your answer, with direction (left to right).</div>`},

    { h: "Group number, period number and electrons (8.1)", body: C`
<ul><li>For Groups I to VII, <b>group number = number of outer-shell electrons</b>. Noble gases have full outer shells (2 for He, 8 for the others).</li>
<li><b>Period number = number of occupied electron shells.</b></li></ul>
${F.row(
  F.fig(160, 180, F.atom(80, 80, "Li", [2, 1], { c: "b" }) + F.text(80, 160, "Li 2,1", "tk small bold"), "Period 2 → 2 shells", { size: "tiny" }),
  F.fig(180, 180, F.atom(90, 80, "Na", [2, 8, 1], { c: "b", r0: 20, dr: 16 }) + F.text(90, 168, "Na 2,8,1", "tk small bold"), "Period 3 → 3 shells", { size: "tiny" }),
  F.fig(200, 200, F.atom(100, 90, "K", [2, 8, 8, 1], { c: "b", r0: 18, dr: 15 }) + F.text(100, 188, "K 2,8,8,1", "tk small bold"), "Period 4 → 4 shells", { size: "tiny" })
)}
<p><b>Why elements in a group behave alike (S):</b> chemical reactions involve the <b>outer-shell electrons</b>. Atoms in the same group have the <b>same number of outer-shell electrons</b>, so they react in the same way and form ions of the same charge (Group I → 1+, Group II → 2+, Group VI → 2−, Group VII → 1−).</p>
<details class="check"><summary>An element has configuration 2,8,7. State its group and period.</summary><div>Group VII (7 outer electrons), Period 3 (3 shells): chlorine.</div></details>`},

    { h: "Group I: the alkali metals (8.2)", body: C`
<p class="lead">Lithium, sodium and potassium are <b>soft</b> metals (they can be cut with a knife) that are stored under <b>oil</b> to stop them reacting with air and water. The fresh cut surface is shiny but tarnishes quickly.</p>
<table class="t"><tr><th>Element</th><th>Melting point / °C</th><th>Density / g/cm³</th><th>Reaction with cold water</th></tr>
<tr><td>Lithium</td><td>181</td><td>0.53</td><td>Floats, fizzes steadily, disappears slowly</td></tr>
<tr><td>Sodium</td><td>98</td><td>0.97</td><td>Floats, melts into a silvery ball, darts around, fizzes rapidly</td></tr>
<tr><td>Potassium</td><td>63</td><td>0.86</td><td>As sodium, but bursts into a <b>lilac flame</b>; may spit</td></tr>
<tr><td>Rubidium</td><td>39</td><td>1.53</td><td>Explosive</td></tr>
<tr><td>Caesium</td><td>28</td><td>1.93</td><td>Very explosive</td></tr></table>
<p>Trends <b>down</b> Group I:</p>
<ul><li><b>Melting point decreases.</b></li><li><b>Density generally increases</b> (potassium is an exception: less dense than sodium).</li><li><b>Reactivity increases.</b></li></ul>
${(() => { const D = [["Li", 181, .53], ["Na", 98, .97], ["K", 63, .86], ["Rb", 39, 1.53], ["Cs", 28, 1.93]]; let s = F.line(40, 170, 250, 170, "k") + F.line(40, 20, 40, 170, "k") + F.line(300, 170, 510, 170, "k") + F.line(300, 20, 300, 170, "k");
  D.forEach(([e, m, d], i) => { const h1 = m / 200 * 140, h2 = d / 2 * 140; s += F.rect(52 + i * 40, 170 - h1, 28, h1, "rS r") + F.text(66 + i * 40, 186, e, "tk small bold") + F.text(66 + i * 40, 164 - h1, m, "tr small"); s += F.rect(312 + i * 40, 170 - h2, 28, h2, "bS b") + F.text(326 + i * 40, 186, e, "tk small bold") + F.text(326 + i * 40, 164 - h2, d, "tb small"); });
  s += F.text(145, 14, "melting point / °C", "tr small bold") + F.text(405, 14, "density / g/cm³", "tb small bold");
  return F.fig(540, 200, s, "Down Group I: melting point falls steadily; density rises (with potassium as the exception).", { size: "wide" }); })()}
<p>The general reaction with water:</p>
<p class="eq">$$\text{2M(s)} + 2\text{H}_2\text{O(l)} \rightarrow 2\text{MOH(aq)} + \text{H}_2\text{(g)}$$</p>
<p>e.g. $2\text{Na} + 2\text{H}_2\text{O} \rightarrow 2\text{NaOH} + \text{H}_2$. The solution turns universal indicator <b>purple/blue</b> because the hydroxide is an <b>alkali</b>: hence "alkali metals". The gas gives a <b>squeaky pop</b> with a lighted splint.</p>
<div class="viz" data-viz="alkaliWater"></div>`},

    { h: "Why Group I reactivity increases down the group (8.2)", body: C`
<p>Every Group I atom reacts by <b>losing its single outer electron</b> to form a 1+ ion: $\text{Na} \rightarrow \text{Na}^+ + e^-$.</p>
<ol class="steps"><li>Going down the group, atoms have <b>more shells</b>, so the outer electron is <b>further from the nucleus</b>.</li>
<li>There is more <b>shielding</b> by inner shells.</li>
<li>So the attraction between the nucleus and the outer electron is <b>weaker</b>.</li>
<li>The outer electron is <b>lost more easily</b>, so the metal is <b>more reactive</b>.</li></ol>
${F.fig(520, 170, F.atom(90, 85, "Li", [2, 1], { c: "b" }) + F.atom(260, 85, "Na", [2, 8, 1], { c: "b", r0: 20, dr: 16 }) + F.atom(430, 85, "K", [2, 8, 8, 1], { c: "b", r0: 18, dr: 15 }) + F.arrow(90, 85, 90, 45, "r", 6) + F.arrow(260, 85, 260, 33, "r", 6) + F.arrow(430, 85, 430, 25, "r", 6) + F.text(260, 165, "outer electron further from nucleus → weaker attraction → lost more easily", "tr small bold"), "Distance from nucleus to the single outer electron increases down Group I.", { size: "wide" })}
<p><b>Predicting (8.2):</b> you can be asked about rubidium or caesium. Use the trends: lower melting point than K, more dense, <b>reacts more violently</b> with water (explosively), forms RbOH (an alkali) and hydrogen; the ion is Rb⁺; compounds are white ionic solids, soluble in water.</p>
<details class="check"><summary>Predict the formula of caesium oxide and of caesium chloride.</summary><div>Cs⁺ with O²⁻: Cs₂O. Cs⁺ with Cl⁻: CsCl.</div></details>`},

    { h: "Group VII: the halogens (8.3)", body: C`
<p class="lead">The halogens are <b>non-metals</b> that exist as <b>diatomic molecules</b> (Cl₂, Br₂, I₂). They are toxic and coloured.</p>
${F.fig(520, 200, tube(60, 20, "rgba(190,215,80,.55)", "chlorine", "pale yellow-green gas") + tube(240, 20, "rgba(170,60,30,.85)", "bromine", "red-brown liquid") + tube(420, 20, "rgba(40,40,50,.9)", "iodine", "grey-black solid"), "Down Group VII the colour gets darker and the state changes gas → liquid → solid at room temperature.", { size: "wide" })}
<table class="t"><tr><th>Halogen</th><th>State at r.t.</th><th>Colour</th><th>Melting point / °C</th><th>Density</th></tr>
<tr><td>Fluorine F₂</td><td>gas</td><td>pale yellow</td><td>−220</td><td>lowest</td></tr>
<tr><td>Chlorine Cl₂</td><td>gas</td><td>pale yellow-green</td><td>−101</td><td>↓</td></tr>
<tr><td>Bromine Br₂</td><td>liquid</td><td>red-brown (orange vapour)</td><td>−7</td><td>↓</td></tr>
<tr><td>Iodine I₂</td><td>solid</td><td>grey-black (purple vapour)</td><td>114</td><td>highest</td></tr></table>
<p>Trends <b>down</b> Group VII: <b>density increases</b>, <b>colour darkens</b>, <b>melting and boiling points increase</b> (gas → liquid → solid), and <b>reactivity decreases</b>.</p>
<div class="callout"><b>Why do the melting points rise?</b> Halogens are simple molecules. Larger molecules have <b>stronger intermolecular forces</b>, so more energy is needed to separate them.</div>
<p><b>Colours in solution:</b> chlorine water is very pale green (almost colourless), bromine water is <b>orange</b> (yellow when dilute), iodine solution is <b>brown</b>. Chlorine also <b>bleaches damp litmus paper</b> (it turns red first, then white): this is the test for chlorine.</p>`},

    { h: "Halogen displacement reactions (8.3)", body: C`
<p>A <b>more reactive halogen displaces a less reactive halogen</b> from a solution of its halide (salt). Reactivity: <b>Cl₂ > Br₂ > I₂</b>.</p>
<table class="t"><tr><th>Added ↓ / to →</th><th>KCl(aq)</th><th>KBr(aq)</th><th>KI(aq)</th></tr>
<tr><td>Cl₂(aq)</td><td>—</td><td><b>orange</b>: Br₂ formed</td><td><b>brown</b>: I₂ formed</td></tr>
<tr><td>Br₂(aq)</td><td>no reaction</td><td>—</td><td><b>brown</b>: I₂ formed</td></tr>
<tr><td>I₂(aq)</td><td>no reaction</td><td>no reaction</td><td>—</td></tr></table>
<p>For example:</p>
<p class="eq">$$\text{Cl}_2\text{(aq)} + 2\text{KBr(aq)} \rightarrow 2\text{KCl(aq)} + \text{Br}_2\text{(aq)}$$</p>
<p class="eq">$$\text{Cl}_2 + 2\text{Br}^- \rightarrow 2\text{Cl}^- + \text{Br}_2 \quad\text{(ionic)}$$</p>
<div class="viz" data-viz="halogenDisplace"></div>
<p><b>This is a redox reaction (S).</b> Chlorine <b>gains</b> electrons (is reduced; it is the oxidising agent). Bromide ions <b>lose</b> electrons (are oxidised). Potassium ions are <b>spectator ions</b>.</p>
<p><b>Why reactivity decreases down the group:</b> halogens react by <b>gaining</b> one electron to fill the outer shell. Down the group the outer shell is <b>further from the nucleus</b> and more shielded, so the attraction for an incoming electron is <b>weaker</b>, and the electron is gained less easily.</p>
<div class="callout"><b>Spot the trap:</b> Group I reactivity <i>increases</i> down the group (losing electrons gets easier); Group VII reactivity <i>decreases</i> down the group (gaining electrons gets harder). The cause is the same (distance and shielding).</div>
<details class="check"><summary>Predict what happens when fluorine is bubbled into potassium chloride solution, ignoring its reaction with water.</summary><div>Fluorine is more reactive, so it displaces chlorine: F₂ + 2KCl → 2KF + Cl₂ (pale green solution).</div></details>
<details class="check"><summary>Predict the properties of astatine (below iodine).</summary><div>Black solid, higher melting point and density than iodine, least reactive halogen: it would not displace any other halogen; it forms At⁻ ions and diatomic At₂ molecules.</div></details>`},

    { h: "Transition elements (8.4)", body: C`
<p class="lead">The transition elements (the central block, e.g. Fe, Cu, Ni, Cr, Mn, Co) are all <b>metals</b>. Compared with Group I metals they have:</p>
<table class="t"><tr><th>Property</th><th>Transition metal (e.g. iron)</th><th>Group I metal (e.g. sodium)</th></tr>
<tr><td>Density</td><td><b>high</b> (7.9 g/cm³)</td><td>low (0.97 g/cm³)</td></tr>
<tr><td>Melting point</td><td><b>high</b> (1538 °C)</td><td>low (98 °C)</td></tr>
<tr><td>Hardness / strength</td><td>hard, strong</td><td>soft</td></tr>
<tr><td>Compounds</td><td><b>coloured</b></td><td>white</td></tr>
<tr><td>Catalyst?</td><td><b>yes</b> (element and compounds)</td><td>no</td></tr>
<tr><td>Reaction with water</td><td>slow or none</td><td>vigorous</td></tr>
<tr><td>Ion charges (S)</td><td><b>variable</b>: Fe²⁺, Fe³⁺</td><td>always 1+</td></tr></table>
${(() => { const S = [["#9cc68a", "Fe²⁺", "pale green"], ["#c78a3a", "Fe³⁺", "brown"], ["#3b7fd0", "Cu²⁺", "blue"], ["#d9748a", "Co²⁺", "pink"], ["#4fae6a", "Ni²⁺", "green"], ["#8f3fb0", "MnO₄⁻", "purple"], ["#e09a2a", "Cr₂O₇²⁻", "orange"]]; let s = "";
  S.forEach(([c, ion, n], i) => { const x = 16 + i * 74; s += F.rect(x, 20, 56, 56, "nostroke", 10).replace('class="nostroke"', `class="nostroke" style="fill:${c}"`) + F.text(x + 28, 98, ion, "tk small bold") + F.text(x + 28, 114, n, "tm small"); });
  return F.fig(520, 130, s, "Typical colours of transition-metal ions in solution.", { size: "wide" }); })()}
<p><b>Catalysts:</b> iron in the Haber process (making ammonia); vanadium(V) oxide in the Contact process (making sulfuric acid); nickel in the hydrogenation of alkenes (making margarine); manganese(IV) oxide in the decomposition of hydrogen peroxide.</p>
<p><b>Variable oxidation numbers (S):</b> a transition metal can form ions with different charges. The Roman numeral in the name gives the oxidation number: iron(II) oxide FeO, iron(III) oxide Fe₂O₃, copper(I) oxide Cu₂O, copper(II) oxide CuO.</p>
<details class="check"><summary>A metal M has a melting point of 1495 °C and forms a pink chloride. Is it a Group I or a transition metal?</summary><div>Transition metal: high melting point and coloured compound (this is cobalt).</div></details>`},

    { h: "The noble gases (8.5)", body: C`
<p class="lead">Group VIII (Group 0): helium, neon, argon, krypton, xenon, radon. They are <b>unreactive</b> (inert), <b>monatomic</b> gases.</p>
<p><b>Explanation:</b> their atoms have a <b>full outer shell</b> of electrons (He: 2; others: 8). This is a stable arrangement, so they have no tendency to lose, gain or share electrons, and do not form bonds even with each other: they exist as <b>single atoms</b>.</p>
${F.row(F.fig(150, 160, F.atom(75, 75, "He", [2], { c: "m" }) + F.text(75, 150, "He: 2", "tk small bold"), "Full first shell", { size: "tiny" }), F.fig(170, 170, F.atom(85, 80, "Ne", [2, 8], { c: "m" }) + F.text(85, 160, "Ne: 2,8", "tk small bold"), "Full outer shell of 8", { size: "tiny" }), F.fig(190, 190, F.atom(95, 90, "Ar", [2, 8, 8], { c: "m", r0: 20, dr: 16 }) + F.text(95, 180, "Ar: 2,8,8", "tk small bold"), "Full outer shell of 8", { size: "tiny" }))}
<table class="t"><tr><th>Gas</th><th>Use</th><th>Property used</th></tr>
<tr><td>Helium</td><td>Balloons, airships</td><td>Very low density and unreactive (not flammable, unlike hydrogen)</td></tr>
<tr><td>Neon</td><td>Advertising signs</td><td>Glows red when electricity is passed through it</td></tr>
<tr><td>Argon</td><td>Filament lamps, welding shield</td><td>Unreactive: stops the hot metal reacting with oxygen</td></tr></table>
<p>Trends down the group: boiling point and density increase (atoms get bigger with more electrons).</p>`},

    { h: "Putting it together: predicting properties (8.1 S)", body: C`
<p>Exam questions often give a table of data for some elements in a group and ask you to <b>predict</b> a missing value or describe an unfamiliar element. Strategy:</p>
<ol class="steps"><li>Find the <b>trend</b> (increasing or decreasing down the group) and whether it is steady.</li>
<li>For a numerical gap, estimate a value <b>between</b> its neighbours (or continue the pattern at the end).</li>
<li>For chemical behaviour, use the <b>group</b>: same number of outer electrons → same type of reaction, same ion charge, same formula pattern.</li>
<li>For how vigorous: Group I more reactive downwards; Group VII less reactive downwards.</li></ol>
<div class="callout"><b>Worked idea:</b> boiling points of Cl₂ (−34 °C), Br₂ (59 °C), At₂ (≈ 337 °C). Predict iodine's: about 180 °C (actual 184 °C). It is a solid at room temperature because its melting point (114 °C) is above 20 °C.</div>
<p>Similarly, for an unfamiliar element in the same group as a known one, write its compounds by analogy: if sodium sulfate is Na₂SO₄, rubidium sulfate is Rb₂SO₄; if calcium chloride is CaCl₂, strontium chloride is SrCl₂.</p>`}
  ],
  worked: [
    { q: C`Describe what you would see when a small piece of potassium is added to water containing universal indicator. Write the equation.`,
      steps: [C`Potassium floats (less dense than water), melts into a ball (reaction is exothermic and K has a low melting point), moves around on the surface and fizzes (hydrogen).`, C`It burns with a lilac flame, gets smaller and disappears.`, C`The indicator turns purple: potassium hydroxide is an alkali.`, C`$2\text{K} + 2\text{H}_2\text{O} \rightarrow 2\text{KOH} + \text{H}_2$`]},
    { q: C`S: Explain, in terms of electrons, why chlorine is more reactive than iodine.`,
      steps: [C`Halogens react by gaining one electron into their outer shell.`, C`A chlorine atom is smaller: its outer shell is closer to the nucleus with less shielding.`, C`So the nucleus attracts an incoming electron more strongly.`, C`Chlorine gains an electron more easily, so it is more reactive.`]},
    { q: C`Aqueous bromine is added to aqueous potassium iodide. State the colour change, and write the ionic equation. Identify the oxidising agent.`,
      steps: [C`Colour change: orange (bromine) → brown (iodine).`, C`$\text{Br}_2 + 2\text{I}^- \rightarrow 2\text{Br}^- + \text{I}_2$`, C`Bromine gains electrons (reduced): bromine is the oxidising agent.`]}
  ],
  formulas: [["Group I + water", C`$2\text{M} + 2\text{H}_2\text{O} \rightarrow 2\text{MOH} + \text{H}_2$`], ["Halogen displacement", C`$\text{X}_2 + 2\text{Y}^- \rightarrow 2\text{X}^- + \text{Y}_2$ (X above Y)`], ["Group number", "= number of outer-shell electrons"], ["Period number", "= number of occupied shells"]],
  cards: [
    ["How is the Periodic Table ordered?", "By increasing proton (atomic) number."],
    ["What is a group?", "A vertical column; elements with the same number of outer electrons."],
    ["What is a period?", "A horizontal row; same number of occupied shells."],
    ["Across a period, character changes from…", "Metallic to non-metallic."],
    ["Why are Group I metals stored under oil?", "To stop them reacting with oxygen and water vapour in the air."],
    ["Trend in melting point down Group I", "Decreases."],
    ["Trend in reactivity down Group I", "Increases."],
    ["Products of sodium + water", "Sodium hydroxide (alkaline solution) and hydrogen."],
    ["Flame colour when potassium reacts with water", "Lilac."],
    ["Why does Group I reactivity increase down the group? (S)", "Outer electron further from the nucleus and more shielded, so less strongly attracted and lost more easily."],
    ["Colour and state of chlorine at r.t.", "Pale yellow-green gas."],
    ["Colour and state of bromine at r.t.", "Red-brown liquid."],
    ["Colour and state of iodine at r.t.", "Grey-black solid."],
    ["Trend in reactivity down Group VII", "Decreases."],
    ["Why does Group VII reactivity decrease down the group? (S)", "Outer shell further from the nucleus and more shielded, so an electron is gained less easily."],
    ["Cl₂ + 2KI →", "2KCl + I₂ (brown solution)."],
    ["Can iodine displace bromide?", "No: iodine is less reactive than bromine."],
    ["Halogens exist as…", "Diatomic molecules (X₂)."],
    ["Four properties of transition elements", "High density, high melting point, coloured compounds, catalysts."],
    ["Transition elements: oxidation numbers (S)", "Variable, e.g. Fe²⁺ and Fe³⁺."],
    ["Catalyst in the Haber process", "Iron."],
    ["Why are noble gases unreactive?", "Full outer shell of electrons: stable, no tendency to gain, lose or share."],
    ["Why are noble gases monatomic?", "They do not form bonds, even with each other."],
    ["Use of argon and why", "Filament lamps / welding: it is unreactive."],
    ["Use of helium and why", "Balloons: low density and non-flammable."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`Elements in the Periodic Table are arranged in order of increasing`, opts: ["mass number", "proton number", "number of neutrons", "relative atomic mass"], ans: 1, why: C`Proton (atomic) number.` },
    { type: "mcq", marks: 1, q: C`An element has electronic configuration 2,8,3. It is in`, opts: ["Group II, Period 3", "Group III, Period 2", "Group III, Period 3", "Group VIII, Period 3"], ans: 2, why: C`3 outer electrons → Group III; 3 shells → Period 3.` },
    { type: "mcq", marks: 1, q: C`Which property increases down Group I?`, opts: ["melting point", "hardness", "reactivity", "number of outer electrons"], ans: 2, why: C`Reactivity increases; melting point decreases; all have 1 outer electron.` },
    { type: "mcq", marks: 1, q: C`Which mixture produces a brown solution?`, opts: ["iodine + potassium chloride", "bromine + potassium chloride", "chlorine + potassium iodide", "iodine + potassium bromide"], ans: 2, why: C`Chlorine displaces iodine (brown).` },
    { type: "mcq", marks: 1, q: C`Which is a property of transition elements?`, opts: ["low density", "form white compounds", "act as catalysts", "react vigorously with cold water"], ans: 2, why: C`Catalysts; also high density and coloured compounds.` },
    { type: "mcq", marks: 1, q: C`Argon is used in light bulbs because it is`, opts: ["very dense", "unreactive", "coloured", "a good conductor"], ans: 1, why: C`It does not react with the hot filament.` },
    { type: "mcq", marks: 1, q: C`Astatine is below iodine in Group VII. Astatine is most likely to be a`, opts: ["pale green gas", "colourless liquid", "black solid", "silver metal"], ans: 2, why: C`Colours darken and states go gas → liquid → solid down the group.` },
    { type: "struct", marks: 3, q: C`Describe what is seen when sodium is added to water, and name the products.`,
      ms: C`<b>B1</b> floats / moves around / melts into a ball (any two observations for B1)<br><b>B1</b> fizzes / bubbles / gets smaller and disappears<br><b>B1</b> sodium hydroxide and hydrogen` },
    { type: "struct", marks: 3, q: C`S: Explain why potassium is more reactive than sodium.`,
      ms: C`<b>B1</b> potassium has more shells / outer electron further from the nucleus<br><b>B1</b> more shielding / weaker attraction between nucleus and outer electron<br><b>B1</b> outer electron lost more easily` },
    { type: "struct", marks: 3, q: C`Aqueous chlorine is added to aqueous sodium bromide. (a) State the colour change. (b) Write the ionic equation. (c) Explain why aqueous iodine does not react with sodium bromide.`,
      ms: C`<b>B1</b> colourless (pale green) to orange<br><b>B1</b> Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂<br><b>B1</b> iodine is less reactive than bromine so cannot displace it` },
    { type: "struct", marks: 2, q: C`Explain why helium is unreactive.`,
      ms: C`<b>B1</b> full outer shell (2 electrons)<br><b>B1</b> stable arrangement: does not lose, gain or share electrons` },
    { type: "struct", marks: 3, q: C`Give three ways in which the properties of iron differ from those of sodium.`,
      ms: C`<b>B1</b> iron has a higher density / melting point<br><b>B1</b> iron forms coloured compounds<br><b>B1</b> iron (or its compounds) act as catalysts / iron has variable oxidation numbers / reacts slowly with water (any three)` },
    { type: "struct", marks: 2, q: C`Describe how the properties change across Period 3 from sodium to argon in terms of metallic character and the type of oxide.`,
      ms: C`<b>B1</b> metal → non-metal across the period<br><b>B1</b> oxides change from basic (Na, Mg) through amphoteric (Al) to acidic (P, S)` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: C`State the number of outer-shell electrons in an atom of (a) magnesium, (b) bromine.`, ms: C`<b>B1</b> 2<br><b>B1</b> 7` },
    { d: 1, type: "mcq", marks: 1, q: C`Which element is a halogen?`, opts: ["sodium", "neon", "iodine", "sulfur"], ans: 2, why: C`Group VII.` },
    { d: 1, type: "struct", marks: 2, q: C`Name the gas produced when lithium reacts with water and give the test for it.`, ms: C`<b>B1</b> hydrogen<br><b>B1</b> lighted splint gives a squeaky pop` },
    { d: 1, type: "mcq", marks: 1, q: C`Which noble gas is used in advertising signs?`, opts: ["helium", "neon", "argon", "krypton"], ans: 1, why: C`Neon glows red.` },
    { d: 1, type: "struct", marks: 1, q: C`State why sodium is stored under oil.`, ms: C`<b>B1</b> to prevent reaction with oxygen / water (vapour) in the air` },
    { d: 2, type: "struct", marks: 3, q: C`Rubidium is below potassium in Group I. Predict (a) its reaction with water compared with potassium, (b) the formula of rubidium hydroxide, (c) the pH of the solution formed.`, ms: C`<b>B1</b> more vigorous / explosive<br><b>B1</b> RbOH<br><b>B1</b> pH greater than 7 (e.g. 13–14)` },
    { d: 2, type: "struct", marks: 3, q: C`Chlorine is bubbled through aqueous potassium iodide. Describe and explain what is seen, and write a balanced equation.`, ms: C`<b>B1</b> solution turns brown<br><b>B1</b> chlorine is more reactive than iodine, so displaces it<br><b>B1</b> Cl₂ + 2KI → 2KCl + I₂` },
    { d: 2, type: "mcq", marks: 1, q: C`An element is a soft metal that reacts vigorously with cold water and has one outer electron. It is in`, opts: ["Group I", "Group II", "the transition elements", "Group VIII"], ans: 0, why: C`Alkali metal.` },
    { d: 2, type: "struct", marks: 2, q: C`S: Explain why elements in the same group have similar chemical properties.`, ms: C`<b>B1</b> same number of outer-shell electrons<br><b>B1</b> chemical reactions involve the outer electrons (so they react in the same way)` },
    { d: 2, type: "struct", marks: 2, q: C`S: Name the two oxides of iron, using Roman numerals, and give their formulae.`, ms: C`<b>B1</b> iron(II) oxide FeO<br><b>B1</b> iron(III) oxide Fe₂O₃` },
    { d: 3, type: "struct", marks: 4, q: C`S: Bromine water is added to aqueous sodium iodide. Write the ionic equation and use it to explain, in terms of electron transfer, which species is oxidised and which is the oxidising agent.`, ms: C`<b>B1</b> Br₂ + 2I⁻ → 2Br⁻ + I₂<br><b>B1</b> iodide ions lose electrons<br><b>B1</b> so iodide ions are oxidised<br><b>B1</b> bromine gains electrons, so bromine is the oxidising agent` },
    { d: 3, type: "struct", marks: 4, q: C`The melting points of Group I metals are: Li 181 °C, Na 98 °C, K 63 °C, Cs 28 °C. (a) Predict the melting point of rubidium. (b) Suggest the state of caesium on a hot day (35 °C). (c) Describe the trend in reactivity and explain it.`, ms: C`<b>B1</b> any value 30–55 °C (actual 39 °C)<br><b>B1</b> liquid<br><b>B1</b> reactivity increases down the group<br><b>B1</b> outer electron further from nucleus / more shielding, so lost more easily` },
    { d: 3, type: "struct", marks: 5, q: C`A student has three unlabelled solutions: potassium chloride, potassium bromide and potassium iodide, and a bottle of aqueous chlorine and a bottle of aqueous bromine. Plan how to identify each solution using only these reagents. Give expected observations.`, ms: C`<b>B1</b> add chlorine water to a sample of each<br><b>B1</b> no change → KCl<br><b>B1</b> orange → KBr; brown → KI<br><b>B1</b> confirm with bromine water: brown only with KI<br><b>B1</b> bromine water has no reaction with KCl or KBr` }
  ]
});
}
