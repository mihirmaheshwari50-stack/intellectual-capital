window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
const fillPath = (d, color) => F.path(d, "nostroke").replace('class="nostroke"', `class="nostroke" style="fill:${color}"`);
const tube = (x, y, h) => F.path(`M${x},${y} L${x},${y + h} Q${x},${y + h + 16} ${x + 16},${y + h + 16} Q${x + 32},${y + h + 16} ${x + 32},${y + h} L${x + 32},${y}`, "k");
const nail = (x, y, h, rusty) => F.line(x, y, x, y + h, (rusty ? "o" : "m") + " thick") + F.line(x - 6, y, x + 6, y, (rusty ? "o" : "m") + " thick") + (rusty ? [0, 1, 2, 3].map(i => F.circ(x + (i % 2 ? 3 : -3), y + 14 + i * 14, 3, "oF nostroke")).join("") : "");

/* ============================================================
   METALS  (0620: 9.1 – 9.6)
   ============================================================ */
TOPICS.push({
  id: "metals", subject: "chemistry", unit: 9, title: "Metals",
  blurb: "Properties and uses of metals, alloys and why they are harder, the reactivity series and displacement, rusting and its prevention, and extraction: blast furnace, zinc and aluminium.",
  level: "Core → Supplement", demo: "reactivity",
  syllabus: [
    ["9.1", "Compare the general physical properties of metals and non-metals", 0],
    ["9.1", "Describe the general chemical properties of metals: reaction with dilute acids, cold water and steam, and oxygen", 1],
    ["9.2", "Describe the uses of metals in terms of their physical properties (aluminium, copper)", 2],
    ["9.3", "Describe an alloy as a mixture of a metal with other elements; brass and stainless steel", 3],
    ["9.3", "Alloys can be harder and stronger than the pure metals and are more useful", 3],
    ["9.3 S", "Explain why alloys are harder and stronger than pure metals using a diagram of the structure", 3],
    ["9.4", "State the order of the reactivity series: K, Na, Ca, Mg, Al, (C), Zn, Fe, (H), Cu, Ag, Au", 4],
    ["9.4", "Describe the reactions, if any, of metals with cold water, steam and dilute hydrochloric acid", 4],
    ["9.4", "Deduce an order of reactivity from experimental results, including displacement reactions", 5],
    ["9.4 S", "Explain the reactivity series in terms of the tendency of a metal to form positive ions", 5],
    ["9.4 S", "Explain the apparent unreactivity of aluminium in terms of its oxide layer", 5],
    ["9.5", "State the conditions required for the rusting of iron and steel (water and oxygen)", 6],
    ["9.5", "Barrier methods and galvanising to prevent rusting", 7],
    ["9.5 S", "Explain sacrificial protection in terms of the reactivity series and electron loss", 7],
    ["9.6", "The ease of obtaining metals from their ores is related to the position in the reactivity series", 8],
    ["9.6", "Describe the extraction of iron from hematite in the blast furnace", 9],
    ["9.6", "State that the main ore of aluminium is bauxite and it is extracted by electrolysis", 11],
    ["9.6 S", "Describe the extraction of zinc from zinc blende", 10],
    ["9.6 S", "Describe the extraction of aluminium from purified bauxite / cryolite, including the electrode equations", 11]
  ],
  sections: [
    { h: "Physical properties: metals vs non-metals (9.1)", body: C`
<table class="t"><tr><th>Property</th><th>Metals (typical)</th><th>Non-metals (typical)</th></tr>
<tr><td>Electrical conductivity</td><td><b>Good</b> conductors</td><td>Poor (insulators), except graphite</td></tr>
<tr><td>Thermal conductivity</td><td><b>Good</b></td><td>Poor</td></tr>
<tr><td>Melting / boiling point</td><td>Usually <b>high</b></td><td>Usually low (many are gases)</td></tr>
<tr><td>Malleable / ductile</td><td>Yes: can be hammered into shape and drawn into wires</td><td>No: <b>brittle</b> when solid</td></tr>
<tr><td>Appearance</td><td>Shiny (lustrous) when freshly cut</td><td>Dull</td></tr>
<tr><td>Density</td><td>Usually high</td><td>Usually low</td></tr>
<tr><td>Sound</td><td>Sonorous (ring when struck)</td><td>Not sonorous</td></tr></table>
<p>These come from <b>metallic bonding</b>: a lattice of positive ions in a "sea" of <b>delocalised electrons</b>. The mobile electrons carry charge and energy (conduction); the layers of ions can slide without breaking the bonding (malleability); the strong attraction between ions and electrons needs a lot of energy to overcome (high melting point).</p>
<div class="callout"><b>Exceptions to remember:</b> mercury is a liquid metal; sodium and potassium are soft with low melting points; graphite (a non-metal) conducts electricity.</div>`},

    { h: "Chemical properties of metals (9.1)", body: C`
<p>Most metals react with:</p>
<ul><li><b>Dilute acids:</b> metal + acid → salt + hydrogen.<br>$\text{Mg} + 2\text{HCl} \rightarrow \text{MgCl}_2 + \text{H}_2$</li>
<li><b>Cold water</b> (only very reactive metals): metal + water → metal hydroxide + hydrogen.<br>$\text{Ca} + 2\text{H}_2\text{O} \rightarrow \text{Ca(OH)}_2 + \text{H}_2$</li>
<li><b>Steam</b> (moderately reactive metals, heated): metal + steam → metal oxide + hydrogen.<br>$\text{Mg} + \text{H}_2\text{O} \rightarrow \text{MgO} + \text{H}_2$</li>
<li><b>Oxygen:</b> metal + oxygen → metal oxide (a basic oxide).<br>$2\text{Mg} + \text{O}_2 \rightarrow 2\text{MgO}$ (bright white flame); $2\text{Cu} + \text{O}_2 \rightarrow 2\text{CuO}$ (copper turns black on heating).</li></ul>
${(() => { let s = F.path("M60,70 L250,70 L250,110 L60,110 Z", "k") + F.rect(62, 92, 30, 16, "bS nostroke") + F.text(77, 60, "wet mineral wool", "tk small") + F.rect(140, 96, 26, 10, "mF nostroke") + F.text(170, 60, "Mg ribbon", "tk small");
  for (let i = 0; i < 3; i++) { s += F.path(`M${70 + i * 10},${165} Q${64 + i * 10},${140} ${74 + i * 10},${114}`, "r"); s += F.path(`M${140 + i * 10},${165} Q${134 + i * 10},${140} ${144 + i * 10},${114}`, "r"); }
  s += F.text(115, 180, "heat both", "tr small bold");
  s += F.line(250, 90, 300, 90, "k") + F.line(300, 90, 300, 150, "k") + F.path("M270,140 L390,140 L390,185 L270,185 Z", "k") + F.rect(271, 152, 118, 32, "bS nostroke") + F.path("M310,152 L310,100 L340,100 L340,152", "k") + F.text(345, 95, "H₂ collected", "tk small", "start");
  return F.fig(460, 195, s, "Heating magnesium in steam: the wet mineral wool makes steam, which passes over the hot magnesium. Hydrogen is collected over water.", { size: "small" }); })()}
<p>Unreactive metals (copper, silver, gold) do not react with water, steam or dilute acids.</p>`},

    { h: "Uses of metals (9.2)", body: C`
<p>Choose a metal for a job by matching its <b>properties</b> to the <b>need</b>. Exams ask you to link the use to a specific property.</p>
<table class="t"><tr><th>Metal</th><th>Use</th><th>Property</th></tr>
<tr><td rowspan="3">Aluminium</td><td>Aircraft bodies</td><td><b>Low density</b> (light) and strong (as an alloy)</td></tr>
<tr><td>Food containers / cans / foil</td><td><b>Resists corrosion</b> (protective oxide layer), non-toxic</td></tr>
<tr><td>Overhead power cables (with steel core)</td><td>Good conductor and <b>low density</b></td></tr>
<tr><td rowspan="2">Copper</td><td>Electrical wiring</td><td><b>Good electrical conductor</b> and <b>ductile</b></td></tr>
<tr><td>Water pipes, saucepan bases</td><td>Unreactive, malleable, good thermal conductor</td></tr>
<tr><td>Mild steel</td><td>Car bodies, machinery, bridges</td><td>Strong, cheap, malleable</td></tr>
<tr><td>Stainless steel</td><td>Cutlery, surgical instruments, sinks</td><td><b>Resists corrosion</b>, hard</td></tr>
<tr><td>Gold</td><td>Jewellery, electrical contacts</td><td>Unreactive (never tarnishes), good conductor</td></tr></table>
<div class="callout"><b>Why not copper for overhead cables?</b> Copper is a better conductor but much denser (8.9 vs 2.7 g/cm³), so the cables would sag and need more pylons. Aluminium is used with a steel core for strength.</div>`},

    { h: "Alloys (9.3)", body: C`
<p class="lead">An <b>alloy</b> is a <b>mixture</b> of a metal with other elements (usually other metals, sometimes carbon).</p>
<table class="t"><tr><th>Alloy</th><th>Composition</th><th>Properties and uses</th></tr>
<tr><td>Brass</td><td>Copper + zinc</td><td>Harder than copper, resists corrosion, gold colour: musical instruments, door handles, electrical plugs</td></tr>
<tr><td>Stainless steel</td><td>Iron + chromium + nickel (+ carbon)</td><td>Resists rusting: cutlery, chemical plant, surgical instruments</td></tr>
<tr><td>Mild steel</td><td>Iron + a little carbon (≈ 0.25%)</td><td>Strong, malleable: car bodies</td></tr>
<tr><td>Aluminium alloys</td><td>Aluminium + copper, magnesium…</td><td>Strong and light: aircraft</td></tr></table>
<p>Alloys are often <b>harder and stronger</b> than the pure metals, and can be more resistant to corrosion. That makes them more useful.</p>
<div class="viz" data-viz="alloyLayers"></div>
<p><b>Explanation (S):</b> in a pure metal all the atoms are the same size, arranged in regular <b>layers</b> that can <b>slide</b> over each other when a force is applied (the metal is soft and malleable). In an alloy, atoms of a <b>different size</b> disrupt the regular arrangement. The layers can no longer slide easily, so the alloy is <b>harder and stronger</b>.</p>
${F.row(
  F.fig(220, 150, (() => { let s = ""; for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) s += F.circ(30 + i * 30, 25 + r * 30, 14, "m mS"); return s + F.arrow(30, 140, 120, 140, "r", 7); })(), "Pure metal: regular layers slide.", { size: "tiny" }),
  F.fig(220, 150, (() => { let s = ""; for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) { const big = (r === 1 && i === 2) || (r === 2 && i === 4); s += F.circ(30 + i * 30, 25 + r * 30, big ? 19 : 14, big ? "o oS" : "m mS"); } return s + F.text(110, 145, "layers locked", "tr small bold"); })(), "Alloy: larger atoms block sliding.", { size: "tiny" })
)}
<details class="check"><summary>Is an alloy a compound? Explain.</summary><div>No: it is a mixture. The elements are not chemically bonded in fixed proportions; the composition can vary.</div></details>`},

    { h: "The reactivity series (9.4)", body: C`
<p class="lead">Metals are placed in order of reactivity. Carbon and hydrogen are included for comparison.</p>
${(() => { const S = [["K", "potassium"], ["Na", "sodium"], ["Ca", "calcium"], ["Mg", "magnesium"], ["Al", "aluminium"], ["C", "carbon"], ["Zn", "zinc"], ["Fe", "iron"], ["H", "hydrogen"], ["Cu", "copper"], ["Ag", "silver"], ["Au", "gold"]]; let s = "";
  S.forEach(([e, n], i) => { const ref = e === "C" || e === "H", y = 20 + i * 26; s += F.rect(40, y, 160, 22, ref ? "mS m thin" : "cS c thin", 5) + F.text(60, y + 16, e, (ref ? "tm" : "tc") + " bold", "start") + F.text(95, y + 16, n, ref ? "tm small" : "tk small", "start"); });
  s += F.arrow(230, 330, 230, 25, "r", 8) + F.text(245, 30, "most reactive", "tr small bold", "start") + F.text(245, 330, "least reactive", "tb small bold", "start");
  s += F.text(245, 120, "reacts with cold water: K, Na, Ca", "tk small", "start") + F.text(245, 140, "(Mg very slowly)", "tm small", "start") + F.text(245, 180, "reacts with steam: Mg, Al, Zn, Fe", "tk small", "start") + F.text(245, 230, "reacts with dilute acid: K → Fe", "tk small", "start") + F.text(245, 250, "(above hydrogen)", "tm small", "start") + F.text(245, 290, "no reaction with water / acid: Cu, Ag, Au", "tk small", "start");
  return F.fig(520, 345, s, "The reactivity series (Core order).", { size: "small" }); })()}
<p>A common memory aid: <i>"<b>P</b>lease <b>S</b>end <b>C</b>harlie <b>M</b>onkeys <b>A</b>nd <b>C</b>ute <b>Z</b>ebras <b>I</b>n <b>H</b>appy <b>C</b>ages <b>S</b>ecurely <b>G</b>uarded"</i>.</p>
<table class="t"><tr><th>Metal</th><th>Cold water</th><th>Steam (heated)</th><th>Dilute HCl</th></tr>
<tr><td>K, Na</td><td>Vigorous: hydroxide + H₂</td><td>Explosive</td><td>Explosive</td></tr>
<tr><td>Ca</td><td>Steady fizzing: Ca(OH)₂ + H₂</td><td>Violent</td><td>Very vigorous</td></tr>
<tr><td>Mg</td><td>Very slow</td><td>Burns brightly: MgO + H₂</td><td>Vigorous fizzing</td></tr>
<tr><td>Zn, Fe</td><td>No reaction</td><td>Reacts when hot: oxide + H₂</td><td>Moderate / slow fizzing</td></tr>
<tr><td>Cu, Ag, Au</td><td>No reaction</td><td>No reaction</td><td>No reaction</td></tr></table>
<p>Try every combination in the interactive lab at the bottom of this page.</p>`},

    { h: "Displacement and explaining reactivity (9.4)", body: C`
<p>A <b>more reactive metal displaces a less reactive metal</b> from a solution of its compound:</p>
<p class="eq">$$\text{Mg(s)} + \text{CuSO}_4\text{(aq)} \rightarrow \text{MgSO}_4\text{(aq)} + \text{Cu(s)}$$</p>
<p>Observations: pink-brown copper coats the magnesium, the blue colour fades, and the mixture warms up (exothermic). Iron in copper(II) sulfate does the same, giving a pale green solution of iron(II) sulfate.</p>
<p>A more reactive metal also removes oxygen from the oxide of a less reactive metal (e.g. the <b>thermite</b> reaction):</p>
<p class="eq">$$2\text{Al} + \text{Fe}_2\text{O}_3 \rightarrow \text{Al}_2\text{O}_3 + 2\text{Fe}$$</p>
<p><b>Deducing an order:</b> place each metal in solutions of the others' salts; tick where a reaction occurs. The metal that displaces the most others is the most reactive.</p>
<table class="t"><tr><th>Metal ↓ / solution →</th><th>MgSO₄</th><th>ZnSO₄</th><th>CuSO₄</th><th>Score</th></tr>
<tr><td>Mg</td><td>—</td><td>✓</td><td>✓</td><td>2</td></tr>
<tr><td>Zn</td><td>✗</td><td>—</td><td>✓</td><td>1</td></tr>
<tr><td>Cu</td><td>✗</td><td>✗</td><td>—</td><td>0</td></tr></table>
<p><b>Explanation (S):</b> metals react by <b>losing electrons</b> to form positive ions. The <b>more easily a metal forms positive ions</b>, the more reactive it is. In displacement, the more reactive metal gives its electrons to the ions of the less reactive metal:</p>
<p class="eq">$$\text{Mg} + \text{Cu}^{2+} \rightarrow \text{Mg}^{2+} + \text{Cu}$$</p>
<p>Magnesium is oxidised (loses electrons); copper ions are reduced (gain electrons). Sulfate ions are spectators.</p>
<div class="callout"><b>Aluminium's disguise (S):</b> aluminium is high in the series but seems unreactive: it does not react with water and only slowly with acid at first. It is covered by a thin, tough layer of <b>aluminium oxide</b> that stops water and acid reaching the metal underneath. This is why it is useful for cans and window frames.</div>`},

    { h: "Rusting (9.5)", body: C`
<p class="lead"><b>Rusting</b> is the corrosion of iron and steel. Rust is <b>hydrated iron(III) oxide</b>. Rusting needs <b>both water and oxygen</b>.</p>
<p class="eq">$$\text{iron} + \text{water} + \text{oxygen} \rightarrow \text{hydrated iron(III) oxide}$$</p>
${(() => { let s = "";
  s += tube(40, 30, 120) + fillPath("M41,90 L41,150 Q41,165 56,165 Q71,165 71,150 L71,90 Z", "rgba(80,140,230,.25)") + nail(56, 40, 110, true) + F.text(56, 200, "A: air + water", "tk small bold") + F.text(56, 216, "RUST", "to small bold");
  s += tube(200, 30, 120) + fillPath("M201,75 L201,150 Q201,165 216,165 Q231,165 231,150 L231,75 Z", "rgba(80,140,230,.25)") + F.rect(201, 62, 30, 13, "oS nostroke") + nail(216, 40, 110, false) + F.rect(198, 22, 36, 10, "k kF") + F.text(216, 200, "B: boiled water", "tk small bold") + F.text(216, 216, "+ oil layer (no O₂)", "tm small") + F.text(216, 232, "no rust", "tg small bold") + F.text(250, 70, "oil", "to small", "start");
  s += tube(360, 30, 120) + F.rect(361, 130, 30, 30, "mS nostroke") + nail(376, 40, 80, false) + F.rect(358, 22, 36, 10, "k kF") + F.text(376, 200, "C: dry air", "tk small bold") + F.text(376, 216, "(calcium chloride)", "tm small") + F.text(376, 232, "no rust", "tg small bold") + F.text(400, 150, "drying agent", "tm small", "start");
  return F.fig(500, 245, s, "Iron nails after a week. Only A, with both air and water, rusts. Boiling removes dissolved oxygen; the oil stops it redissolving. Anhydrous calcium chloride removes water vapour.", { size: "wide" }); })()}
<p>Salt water and acidic conditions speed up rusting (cars rust faster where salt is spread on roads).</p>
<details class="check"><summary>Why is the water in tube B boiled?</summary><div>To remove dissolved oxygen (air).</div></details>`},

    { h: "Preventing rusting (9.5)", body: C`
<p><b>Barrier methods</b> keep water and oxygen away from the iron surface:</p>
<ul><li><b>Painting</b>: cars, bridges, railings.</li><li><b>Oiling / greasing</b>: moving parts (chains, hinges) where paint would rub off.</li><li><b>Plastic coating</b>: wire fences, dish racks.</li><li><b>Electroplating</b> with another metal (e.g. chromium, tin).</li></ul>
<p>If a barrier is scratched, the iron underneath starts to rust.</p>
<p><b>Galvanising</b>: coating iron with a layer of <b>zinc</b> (dipping in molten zinc). It works as a barrier <b>and</b> as sacrificial protection: even if scratched, the iron does not rust.</p>
<p><b>Sacrificial protection (S):</b> a <b>more reactive metal</b> (zinc or magnesium) is attached to the iron. The more reactive metal <b>loses electrons more readily</b>, so it corrodes (is oxidised) <b>instead of</b> the iron:</p>
<p class="eq">$$\text{Zn} \rightarrow \text{Zn}^{2+} + 2e^-$$</p>
<p>The electrons flow into the iron, so the iron does not form Fe²⁺/Fe³⁺ ions. The zinc blocks must be replaced from time to time. Used on <b>ship hulls</b>, oil rigs, underground pipes.</p>
${(() => { let s = fillPath("M30,40 L470,40 L430,130 L70,130 Z", "rgba(140,150,160,.35)") + F.path("M30,40 L470,40 L430,130 L70,130 Z", "k mid");
  s += fillPath("M0,70 L500,70 L500,180 L0,180 Z", "rgba(80,140,230,.18)") + F.line(0, 70, 500, 70, "b") + F.text(490, 170, "sea water", "tb small", "end");
  [150, 330].forEach(x => { s += F.rect(x - 22, 130, 44, 18, "oS o", 3) + F.text(x, 143, "Zn", "to small bold"); s += F.arrow(x, 128, x, 95, "r", 7) + F.text(x + 8, 110, "e⁻", "tr small bold", "start"); });
  s += F.text(250, 60, "steel hull (cathode: protected)", "tk small bold") + F.text(250, 170, "zinc blocks corrode instead: Zn → Zn²⁺ + 2e⁻", "to small bold");
  return F.fig(500, 185, s, "Sacrificial protection of a ship's hull with zinc blocks.", { size: "wide" }); })()}
<details class="check"><summary>S: Why can't copper be used for sacrificial protection of iron?</summary><div>Copper is less reactive than iron, so iron would lose electrons (corrode) in preference; copper would actually speed up the rusting.</div></details>`},

    { h: "Extracting metals: the reactivity series decides (9.6)", body: C`
<p>Most metals are found in <b>ores</b> (rocks containing metal compounds, usually oxides or sulfides). Extraction means <b>reducing</b> the metal compound to the metal.</p>
${(() => { const S = ["K", "Na", "Ca", "Mg", "Al", "C", "Zn", "Fe", "Pb", "Cu", "Ag", "Au"]; let s = "";
  S.forEach((e, i) => { const x = 20 + i * 40; s += F.rect(x, 50, 36, 30, e === "C" ? "mS m" : i < 5 ? "rS r" : i < 9 ? "oS o" : "gS g", 4) + F.text(x + 18, 70, e, "tk bold"); });
  s += F.line(20, 95, 216, 95, "r thick") + F.text(118, 115, "electrolysis of molten compound", "tr small bold") + F.text(118, 131, "(too reactive for carbon)", "tm small");
  s += F.line(260, 95, 376, 95, "o thick") + F.text(318, 115, "heat with carbon", "to small bold") + F.text(318, 131, "(below carbon)", "tm small");
  s += F.line(380, 95, 496, 95, "g thick") + F.text(438, 115, "found native / easy", "tg small bold") + F.text(438, 131, "(Au, Ag native)", "tm small");
  s += F.text(258, 30, "more reactive metal → harder to extract → more expensive (needs electricity)", "tk small");
  return F.fig(520, 145, s, "The method of extraction depends on where the metal is relative to carbon.", { size: "wide" }); })()}
<ul><li>Metals <b>below carbon</b> (zinc, iron, lead, copper) can be extracted by heating the oxide with <b>carbon</b> (coke), which removes the oxygen: <b>reduction</b>.</li>
<li>Metals <b>above carbon</b> (aluminium, magnesium, sodium…) hold on to oxygen too strongly; they are extracted by <b>electrolysis</b> of the molten compound, which needs a lot of energy.</li>
<li>The <b>least reactive</b> metals (gold) occur <b>uncombined</b> (native) and were the first to be discovered; aluminium was isolated only in the 1800s.</li></ul>`},

    { h: "Iron: the blast furnace (9.6)", body: C`
<p>Raw materials (the "charge") added at the top:</p>
<ul><li><b>Hematite</b>: iron ore, mainly iron(III) oxide, Fe₂O₃.</li><li><b>Coke</b>: almost pure carbon (fuel and reducing agent).</li><li><b>Limestone</b>: calcium carbonate, to remove acidic impurities (mainly sand, SiO₂).</li><li><b>Hot air</b> is blasted in near the bottom.</li></ul>
<div class="viz" data-viz="blastFurnace"></div>
<ol class="steps">
<li><b>Coke burns</b> in the hot air, releasing heat (the furnace reaches ≈ 1500 °C at the bottom): $\text{C} + \text{O}_2 \rightarrow \text{CO}_2$</li>
<li>Higher up, carbon dioxide reacts with more coke to make <b>carbon monoxide</b>: $\text{CO}_2 + \text{C} \rightarrow 2\text{CO}$</li>
<li>Carbon monoxide <b>reduces</b> the iron(III) oxide to iron: $\text{Fe}_2\text{O}_3 + 3\text{CO} \rightarrow 2\text{Fe} + 3\text{CO}_2$. The molten iron runs to the bottom.</li>
<li>Limestone <b>decomposes</b> in the heat (thermal decomposition): $\text{CaCO}_3 \rightarrow \text{CaO} + \text{CO}_2$</li>
<li>Calcium oxide (basic) reacts with silicon dioxide (acidic) to form <b>slag</b>, calcium silicate: $\text{CaO} + \text{SiO}_2 \rightarrow \text{CaSiO}_3$. This is a neutralisation.</li></ol>
<p>Molten slag is less dense than molten iron, so it floats on top; both are <b>tapped off</b> separately. Slag is used for road building. Waste gases (CO₂, N₂) leave at the top.</p>
<div class="callout"><b>Which substance is reduced, which oxidised?</b> In step 3, Fe₂O₃ loses oxygen (reduced); CO gains oxygen (oxidised), so CO is the <b>reducing agent</b>.</div>
<p>Iron from the blast furnace ("pig iron") contains about 4% carbon, making it brittle. It is converted into <b>steel</b> by blowing oxygen through the molten iron to remove most of the carbon (as CO₂) and other impurities, then adding controlled amounts of carbon and other metals.</p>`},

    { h: "Zinc from zinc blende (9.6 S)", body: C`
<p>The main ore of zinc is <b>zinc blende</b>, zinc sulfide ZnS.</p>
<ol class="steps"><li><b>Roasting</b>: zinc sulfide is heated strongly in air to convert it to zinc oxide: $2\text{ZnS} + 3\text{O}_2 \rightarrow 2\text{ZnO} + 2\text{SO}_2$. (The sulfur dioxide is collected and used to make sulfuric acid, rather than released as a pollutant.)</li>
<li><b>Reduction</b> with carbon (coke) in a furnace: $\text{ZnO} + \text{C} \rightarrow \text{Zn} + \text{CO}$ (some CO also reduces ZnO: $\text{ZnO} + \text{CO} \rightarrow \text{Zn} + \text{CO}_2$).</li>
<li>Zinc has a low boiling point (907 °C), so it leaves the furnace as a <b>vapour</b> and is <b>condensed</b> to liquid zinc, separating it from the other materials.</li></ol>
<p>Most zinc is used for galvanising and for making brass.</p>`},

    { h: "Aluminium from bauxite (9.6)", body: C`
<p>The main ore of aluminium is <b>bauxite</b>, impure aluminium oxide, Al₂O₃. Aluminium is above carbon, so it is extracted by <b>electrolysis</b>.</p>
${(() => { let s = F.path("M40,60 L40,200 L360,200 L360,60", "k thick") + fillPath("M42,90 L42,186 L358,186 L358,90 Z", "rgba(240,166,90,.35)") + F.rect(42, 186, 316, 12, "m mS") + F.text(200, 222, "graphite lining = cathode (−)", "tb small bold");
  [110, 200, 290].forEach(x => s += F.rect(x - 18, 30, 36, 90, "k kS") + F.line(x, 10, x, 30, "k"));
  s += F.line(110, 10, 290, 10, "k") + F.text(200, 6, "graphite anodes (+)", "tr small bold") + F.rect(42, 165, 316, 21, "mS nostroke") + F.text(200, 180, "molten aluminium", "tk small bold") + F.text(200, 145, "Al₂O₃ dissolved in molten cryolite (≈ 950 °C)", "to small");
  for (let i = 0; i < 6; i++) s += F.circ(96 + (i % 3) * 90 + (i > 2 ? 22 : 0), 124 - (i > 2 ? 14 : 0), 4, "k thin");
  s += F.arrow(380, 175, 420, 175, "k", 7) + F.text(424, 180, "tapped off", "tk small", "start") + F.text(380, 80, "O₂ bubbles", "tm small", "start");
  return F.fig(500, 230, s, "Electrolysis of aluminium oxide.", { size: "wide" }); })()}
<ol class="steps"><li>Bauxite is purified to give aluminium oxide (alumina).</li>
<li>Aluminium oxide has a very high melting point (2072 °C). It is dissolved in molten <b>cryolite</b> (Na₃AlF₆), which <b>lowers the operating temperature</b> to ≈ 950 °C and <b>improves conductivity</b>, saving energy.</li>
<li>At the <b>cathode (−)</b>: aluminium ions gain electrons (reduction): $\text{Al}^{3+} + 3e^- \rightarrow \text{Al}$. Molten aluminium collects at the bottom and is tapped off.</li>
<li>At the <b>anode (+)</b>: oxide ions lose electrons (oxidation): $2\text{O}^{2-} \rightarrow \text{O}_2 + 4e^-$.</li>
<li>The hot oxygen reacts with the <b>carbon anodes</b>, burning them away: $\text{C} + \text{O}_2 \rightarrow \text{CO}_2$. The anodes must be <b>replaced regularly</b>.</li></ol>
<div class="callout"><b>Why is aluminium expensive to extract?</b> The process needs huge amounts of electricity (for electrolysis and to keep the electrolyte molten) and the anodes are used up. Recycling aluminium uses about 5% of the energy.</div>`}
  ],
  worked: [
    { q: C`Explain, with equations, how iron(III) oxide is converted to iron in the blast furnace.`,
      steps: [C`Coke burns in hot air: $\text{C} + \text{O}_2 \rightarrow \text{CO}_2$ (exothermic, heats the furnace).`, C`Carbon dioxide reacts with more coke: $\text{CO}_2 + \text{C} \rightarrow 2\text{CO}$.`, C`Carbon monoxide reduces the ore: $\text{Fe}_2\text{O}_3 + 3\text{CO} \rightarrow 2\text{Fe} + 3\text{CO}_2$.`, C`Molten iron sinks to the bottom and is tapped off.`]},
    { q: C`Metals X, Y and Z are placed in solutions of each other's sulfates. X displaces Y and Z; Z displaces Y. Put them in order of reactivity.`,
      steps: [C`X displaces both others: X is most reactive.`, C`Z displaces Y only: Z is next.`, C`Y displaces nothing: least reactive. Order X > Z > Y.`]},
    { q: C`S: A steel pipe buried underground is connected to a block of magnesium. Explain how this prevents the pipe rusting.`,
      steps: [C`Magnesium is more reactive than iron.`, C`Magnesium loses electrons more easily, so it is oxidised (corrodes) instead of the iron: $\text{Mg} \rightarrow \text{Mg}^{2+} + 2e^-$.`, C`Electrons flow to the iron, so iron does not form ions: it does not rust. This is sacrificial protection; the magnesium must be replaced.`]}
  ],
  formulas: [["Metal + acid", "salt + hydrogen"], ["Metal + cold water", "hydroxide + hydrogen"], ["Metal + steam", "oxide + hydrogen"], ["Blast furnace reduction", C`$\text{Fe}_2\text{O}_3 + 3\text{CO} \rightarrow 2\text{Fe} + 3\text{CO}_2$`], ["Slag", C`$\text{CaO} + \text{SiO}_2 \rightarrow \text{CaSiO}_3$`], ["Al extraction (cathode)", C`$\text{Al}^{3+} + 3e^- \rightarrow \text{Al}$`], ["Al extraction (anode)", C`$2\text{O}^{2-} \rightarrow \text{O}_2 + 4e^-$`]],
  cards: [
    ["Four physical properties of metals", "Good conductors of heat and electricity, malleable, ductile, high melting point (also shiny, sonorous)."],
    ["Metal + steam →", "Metal oxide + hydrogen."],
    ["Why aluminium for aircraft?", "Low density (and strong as an alloy)."],
    ["Why aluminium for food cans?", "Resists corrosion (oxide layer)."],
    ["Why copper for wiring?", "Good electrical conductor and ductile."],
    ["What is an alloy?", "A mixture of a metal with other elements."],
    ["Brass is made of…", "Copper and zinc."],
    ["Stainless steel contains…", "Iron, chromium, nickel (and carbon)."],
    ["Why are alloys harder? (S)", "Different-sized atoms disrupt the layers so they cannot slide."],
    ["Reactivity series (Core)", "K, Na, Ca, Mg, Al, (C), Zn, Fe, (H), Cu, Ag, Au."],
    ["Which metals react with cold water?", "K, Na, Ca (Mg very slowly)."],
    ["Which metals do not react with dilute acid?", "Those below hydrogen: Cu, Ag, Au."],
    ["Reactivity in terms of ions (S)", "More reactive metals form positive ions more easily (lose electrons)."],
    ["Why does aluminium seem unreactive? (S)", "A protective layer of aluminium oxide."],
    ["Conditions for rusting", "Water and oxygen (both)."],
    ["Chemical name of rust", "Hydrated iron(III) oxide."],
    ["Three barrier methods", "Painting, greasing/oiling, plastic coating."],
    ["Galvanising", "Coating iron with zinc."],
    ["Sacrificial protection (S)", "A more reactive metal (Zn/Mg) corrodes instead of iron, losing electrons."],
    ["Metals extracted by electrolysis", "Those above carbon (e.g. aluminium)."],
    ["Metals extracted with carbon", "Those below carbon (e.g. iron, zinc)."],
    ["Ore of iron", "Hematite (Fe₂O₃)."],
    ["Role of coke in the blast furnace", "Fuel (heat) and makes CO, the reducing agent."],
    ["Role of limestone in the blast furnace", "Decomposes to CaO which removes SiO₂ as slag (CaSiO₃)."],
    ["Ore of zinc (S)", "Zinc blende (ZnS)."],
    ["Ore of aluminium", "Bauxite (Al₂O₃)."],
    ["Why use cryolite? (S)", "Lowers the operating temperature (saves energy) and improves conductivity."],
    ["Why are carbon anodes replaced? (S)", "Oxygen reacts with them to form CO₂."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`Which property makes copper suitable for electrical wiring?`, opts: ["high density", "ductile and good conductor", "shiny", "resists corrosion only"], ans: 1, why: C`Wires need conductivity and ductility.` },
    { type: "mcq", marks: 1, q: C`Brass is an alloy of`, opts: ["iron and carbon", "copper and tin", "copper and zinc", "iron and chromium"], ans: 2, why: C`Cu + Zn.` },
    { type: "mcq", marks: 1, q: C`Which metal reacts with steam but not with cold water?`, opts: ["sodium", "calcium", "zinc", "copper"], ans: 2, why: C`Zinc reacts with steam when heated.` },
    { type: "mcq", marks: 1, q: C`In which test tube does the iron nail rust?`, opts: ["dry air", "boiled water under oil", "water open to air", "a vacuum"], ans: 2, why: C`Needs water and oxygen.` },
    { type: "mcq", marks: 1, q: C`In the blast furnace, the main reducing agent is`, opts: ["coke", "carbon monoxide", "limestone", "slag"], ans: 1, why: C`CO reduces Fe₂O₃.` },
    { type: "mcq", marks: 1, q: C`Aluminium is extracted by electrolysis because`, opts: ["it is a good conductor", "it is more reactive than carbon", "it has a low melting point", "bauxite is a liquid"], ans: 1, why: C`Carbon cannot reduce its oxide.` },
    { type: "mcq", marks: 1, q: C`Which reaction occurs?`, opts: ["Cu + ZnSO₄", "Fe + MgSO₄", "Zn + CuSO₄", "Ag + FeSO₄"], ans: 2, why: C`Zinc is more reactive than copper.` },
    { type: "struct", marks: 3, q: C`Describe what you would see when an iron nail is placed in copper(II) sulfate solution, and write the equation.`,
      ms: C`<b>B1</b> pink/brown coating on the nail<br><b>B1</b> solution changes from blue to (pale) green<br><b>B1</b> Fe + CuSO₄ → FeSO₄ + Cu` },
    { type: "struct", marks: 3, q: C`S: Explain, using a diagram or words, why steel is harder than pure iron.`,
      ms: C`<b>B1</b> pure iron: regular layers of identical atoms<br><b>B1</b> layers can slide over each other<br><b>B1</b> in steel, carbon/different-sized atoms disrupt the layers so they cannot slide easily` },
    { type: "struct", marks: 4, q: C`Explain the role of limestone in the blast furnace. Include two equations.`,
      ms: C`<b>B1</b> limestone decomposes: CaCO₃ → CaO + CO₂<br><b>B1</b> calcium oxide reacts with silicon dioxide impurity<br><b>B1</b> CaO + SiO₂ → CaSiO₃<br><b>B1</b> forms slag which is removed / floats on molten iron` },
    { type: "struct", marks: 3, q: C`S: Describe how zinc is extracted from zinc blende. Include equations.`,
      ms: C`<b>B1</b> roast in air: 2ZnS + 3O₂ → 2ZnO + 2SO₂<br><b>B1</b> reduce with carbon/coke: ZnO + C → Zn + CO<br><b>B1</b> zinc vapour distilled off and condensed` },
    { type: "struct", marks: 4, q: C`S: In the extraction of aluminium, give the electrode equations and explain why the anodes must be replaced.`,
      ms: C`<b>B1</b> cathode: Al³⁺ + 3e⁻ → Al<br><b>B1</b> anode: 2O²⁻ → O₂ + 4e⁻<br><b>B1</b> anodes are carbon/graphite<br><b>B1</b> oxygen reacts with carbon to form CO₂, so anodes burn away` },
    { type: "struct", marks: 2, q: C`State two ways of preventing a bicycle chain from rusting and explain why painting is unsuitable.`,
      ms: C`<b>B1</b> oil / grease (or plastic-coated / galvanised)<br><b>B1</b> paint would crack/rub off as the chain moves` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: C`State two physical properties of all metals.`, ms: C`<b>B1</b> good conductor of electricity / heat<br><b>B1</b> malleable / ductile / shiny / high melting point (any second)` },
    { d: 1, type: "mcq", marks: 1, q: C`Which metal is the most reactive?`, opts: ["iron", "magnesium", "zinc", "copper"], ans: 1, why: C`Mg is highest of these.` },
    { d: 1, type: "struct", marks: 2, q: C`Name the two substances that must be present for iron to rust.`, ms: C`<b>B1</b> water<br><b>B1</b> oxygen/air` },
    { d: 1, type: "struct", marks: 1, q: C`Name the main ore of iron.`, ms: C`<b>B1</b> hematite` },
    { d: 1, type: "mcq", marks: 1, q: C`Galvanised iron is coated with`, opts: ["tin", "zinc", "paint", "chromium"], ans: 1, why: C`Zinc.` },
    { d: 1, type: "struct", marks: 2, q: C`Give one use of aluminium and the property that makes it suitable.`, ms: C`<b>B1</b> aircraft / food containers / cables<br><b>B1</b> matching property: low density / corrosion resistant / conducts and light` },
    { d: 2, type: "struct", marks: 3, q: C`Magnesium is heated in steam. Name the products, write the equation and describe what is seen.`, ms: C`<b>B1</b> magnesium oxide and hydrogen<br><b>B1</b> Mg + H₂O → MgO + H₂<br><b>B1</b> bright white light / white solid formed` },
    { d: 2, type: "struct", marks: 3, q: C`Explain why gold is found uncombined in the Earth but aluminium is not, and why aluminium was discovered much later than copper.`, ms: C`<b>B1</b> gold is very unreactive so does not form compounds<br><b>B1</b> aluminium is reactive so is found as compounds (ores)<br><b>B1</b> aluminium is above carbon so needed electrolysis / electricity to extract, copper can be reduced by carbon / heating` },
    { d: 2, type: "mcq", marks: 1, q: C`In the reaction Fe₂O₃ + 3CO → 2Fe + 3CO₂, the substance oxidised is`, opts: ["Fe₂O₃", "CO", "Fe", "CO₂"], ans: 1, why: C`CO gains oxygen.` },
    { d: 2, type: "struct", marks: 2, q: C`S: Explain why aluminium appears less reactive than its position in the reactivity series suggests.`, ms: C`<b>B1</b> covered in a layer of aluminium oxide<br><b>B1</b> which prevents water/acid reaching the metal` },
    { d: 2, type: "struct", marks: 3, q: C`S: Write the ionic equation for the reaction between zinc and copper(II) sulfate, and identify the species oxidised.`, ms: C`<b>B1</b> Zn + Cu²⁺ → Zn²⁺ + Cu<br><b>B1</b> zinc is oxidised<br><b>B1</b> because it loses electrons` },
    { d: 2, type: "struct", marks: 2, q: C`State the composition of stainless steel and one use that depends on its resistance to corrosion.`, ms: C`<b>B1</b> iron with chromium and nickel (and carbon)<br><b>B1</b> cutlery / sinks / surgical instruments / chemical plant` },
    { d: 3, type: "struct", marks: 5, q: C`A student is given pieces of metals P, Q and R and solutions of their nitrates. Describe an experiment to place them in order of reactivity and explain how the results are used. Then suggest a second method using dilute acid.`, ms: C`<b>B1</b> place each metal in solutions of the other two metals' nitrates<br><b>B1</b> look for coating / colour change / temperature rise indicating displacement<br><b>B1</b> metal that displaces most others is most reactive; rank by number of reactions<br><b>B1</b> add equal-sized pieces to the same volume and concentration of dilute HCl<br><b>B1</b> faster rate of bubbling (or greater temperature rise) = more reactive` },
    { d: 3, type: "struct", marks: 6, q: C`S: Describe the extraction of aluminium from bauxite. Include the role of cryolite, the electrode equations and why the process is expensive.`, ms: C`<b>B1</b> bauxite purified to aluminium oxide<br><b>B1</b> dissolved in molten cryolite to lower the melting point / operating temperature<br><b>B1</b> cathode: Al³⁺ + 3e⁻ → Al<br><b>B1</b> anode: 2O²⁻ → O₂ + 4e⁻<br><b>B1</b> carbon anodes react with oxygen and must be replaced<br><b>B1</b> large amount of electricity needed` },
    { d: 3, type: "struct", marks: 4, q: C`S: Explain why a scratched galvanised bucket does not rust but a scratched tin-plated can does. (Tin is less reactive than iron.)`, ms: C`<b>B1</b> zinc is more reactive than iron, so zinc corrodes in preference / sacrificial protection<br><b>B1</b> zinc loses electrons instead of iron<br><b>B1</b> tin is less reactive than iron, so once scratched the iron is exposed and corrodes<br><b>B1</b> (in fact faster, as iron loses electrons to tin)` },
    { d: 3, type: "struct", marks: 3, q: C`Calculate the maximum mass of iron that can be obtained from 320 tonnes of iron(III) oxide. (Ar: Fe = 56, O = 16)`, ms: C`<b>C1</b> Mr Fe₂O₃ = 160<br><b>C1</b> 160 t gives 112 t of iron<br><b>A1</b> 320 t gives 224 tonnes` }
  ]
});
}
