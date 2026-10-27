window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
//@@HELPERS-START
// simple electrolysis cell diagram. o: {liq, an, cat, aLab, cLab, gasA, gasC, elec}
const ecell = (o) => { const W = 460, H = 270; let s = F.path("M90,70 L90,240 L370,240 L370,70", "k thick") + F.rect(92, 100, 276, 138, (o.liq || "b") + "S nostroke");
  s += F.rect(140, 50, 18, 160, o.elec || "k mF") + F.rect(302, 50, 18, 160, o.elec || "k mF") + F.poly([[149, 50], [149, 20], [311, 20], [311, 50]], "k") + F.rect(205, 8, 50, 24, "k bgF", 4) + F.text(230, 25, "d.c.", "tk small bold");
  s += F.text(149, 44, "+", "tr bold") + F.text(311, 44, "−", "tb bold") + F.text(60, 120, "anode", "tr small bold", "end") + F.text(60, 136, "(+)", "tr small bold", "end") + F.text(400, 120, "cathode", "tb small bold", "start") + F.text(400, 136, "(−)", "tb small bold", "start");
  if (o.gasA) for (let i = 0; i < 4; i++) s += F.circ(166 + (i % 2) * 6, 190 - i * 24, 4, "m thin");
  if (o.gasC) for (let i = 0; i < 4; i++) s += F.circ(294 - (i % 2) * 6, 190 - i * 24, 4, "m thin");
  s += F.text(149, 262, o.aLab, "tr small bold") + F.text(311, 262, o.cLab, "tb small bold") + F.text(230, 230, o.name || "", "tk small");
  return F.fig(W, H + 10, s, o.cap || "", { size: "small" }); };
//@@HELPERS-END

/* ============================================================
   ELECTROCHEMISTRY  (0620: 4.1, 4.2)
   ============================================================ */
TOPICS.push({
  id: "electrochem", subject: "chemistry", unit: 4, title: "Electrolysis & fuel cells",
  blurb: "What electrolysis is, predicting products for molten and aqueous electrolytes, half-equations, copper(II) sulfate, electroplating, purifying copper, and hydrogen fuel cells.",
  level: "Core → Supplement", demo: "electrolysis",
  syllabus: [
    ["4.1", "Define electrolysis as the decomposition of an ionic compound, molten or in aqueous solution, by an electric current", 0],
    ["4.1", "Identify the anode, cathode and electrolyte in simple electrolytic cells", 0],
    ["4.1 S", "Describe the transfer of charge: electrons in the external circuit, ions in the electrolyte, loss/gain of electrons at the electrodes", 1],
    ["4.1", "Products and observations for molten lead(II) bromide; predict products of a molten binary compound", 2],
    ["4.1", "Metals or hydrogen form at the cathode; non-metals (other than hydrogen) form at the anode", 3],
    ["4.1", "Products and observations for concentrated aqueous sodium chloride and dilute sulfuric acid (inert electrodes)", 4],
    ["4.1 S", "Predict products of a halide in dilute or concentrated aqueous solution", 4],
    ["4.1 S", "Construct ionic half-equations: oxidation at the anode, reduction at the cathode", 5],
    ["4.1 S", "Products and observations for aqueous copper(II) sulfate with graphite and with copper electrodes", 6],
    ["4.1", "Metal objects are electroplated to improve appearance and resistance to corrosion; describe how", 7],
    ["4.2", "A hydrogen–oxygen fuel cell uses hydrogen and oxygen to produce electricity, with water as the only chemical product", 8],
    ["4.2 S", "Advantages and disadvantages of hydrogen fuel cells compared with petrol engines in vehicles", 8]
  ],
  sections: [
    { h: "What electrolysis is (4.1)", body: C`
<p class="lead"><b>Electrolysis</b> is the <b>decomposition</b> (breaking down) of an <b>ionic compound</b>, when <b>molten or in aqueous solution</b>, by the passage of an <b>electric current</b>.</p>
${ecell({ liq: "o", aLab: "non-metal formed", cLab: "metal or H₂ formed", gasA: true, name: "electrolyte (molten or aqueous)", cap: "An electrolytic cell. The electrolyte conducts because its ions are free to move." })}
<ul><li><b>Electrolyte</b>: the molten or dissolved ionic compound that conducts electricity and is decomposed.</li>
<li><b>Anode</b>: the <b>positive</b> electrode (connected to the + terminal). Negative ions (anions) are attracted to it.</li>
<li><b>Cathode</b>: the <b>negative</b> electrode. Positive ions (cations) are attracted to it.</li>
<li><b>Inert electrodes</b> (graphite/carbon or platinum) carry the current but don't react themselves.</li></ul>
<div class="callout why"><b class="t">Why must it be molten or dissolved?</b>In a solid ionic compound the ions are held in fixed positions in the lattice and cannot move to the electrodes, so it doesn't conduct. Melting or dissolving frees the ions to move.</div>
<div class="callout key"><b class="t">Memory aid</b><b>PANIC</b>: Positive is Anode, Negative Is Cathode. And "cations go to the cathode".</div>`},

    { h: "How charge moves (4.1 S)", body: C`
<div class="viz" data-viz="electrolysis"></div>
<ol class="steps-inline"><li><b>In the wires</b> (external circuit), <b>electrons</b> flow from the anode, through the power supply, to the cathode.</li>
<li><b>In the electrolyte</b>, the current is carried by <b>ions</b> moving: cations towards the cathode, anions towards the anode. (Electrons do not travel through the electrolyte.)</li>
<li><b>At the cathode</b>, cations <b>gain electrons</b> (reduction).</li>
<li><b>At the anode</b>, anions <b>lose electrons</b> (oxidation). These electrons enter the external circuit.</li></ol>
<div class="callout exam"><b class="t">OIL RIG</b>Oxidation Is Loss (of electrons); Reduction Is Gain. Reduction happens at the cathode ("red cat"); oxidation at the anode ("an ox").</div>`},

    { h: "Electrolysis of molten compounds (4.1)", body: C`
<h3>Molten lead(II) bromide</h3>
${ecell({ liq: "o", aLab: "bromine: red-brown vapour", cLab: "lead: silver beads", gasA: true, name: "molten PbBr₂ (heated)", cap: "The lead(II) bromide must be heated until molten. A fume cupboard is needed: bromine vapour is toxic." })}
<table class="t"><tr><th>Electrode</th><th>Product</th><th>Observation</th><th>Half-equation (S)</th></tr>
<tr><td>Cathode (−)</td><td>Lead</td><td>Silvery molten beads collect at the bottom</td><td>$\text{Pb}^{2+}+2e^-\rightarrow\text{Pb}$</td></tr>
<tr><td>Anode (+)</td><td>Bromine</td><td>Red-brown vapour</td><td>$2\text{Br}^-\rightarrow\text{Br}_2+2e^-$</td></tr></table>
<h3>Predicting products for any molten binary compound</h3>
<p>A <b>binary</b> compound contains just two elements, one metal and one non-metal. When molten, the only ions present are the metal ion and the non-metal ion, so:</p>
<ul><li>the <b>metal</b> forms at the <b>cathode</b>;</li><li>the <b>non-metal</b> forms at the <b>anode</b>.</li></ul>
<table class="t"><tr><th>Molten compound</th><th>Cathode</th><th>Anode</th></tr><tr><td>Sodium chloride, NaCl</td><td>Sodium</td><td>Chlorine</td></tr><tr><td>Zinc iodide, ZnI₂</td><td>Zinc</td><td>Iodine</td></tr><tr><td>Aluminium oxide, Al₂O₃</td><td>Aluminium</td><td>Oxygen</td></tr></table>`},

    { h: "Which product at which electrode? (4.1)", body: C`
<p class="lead">The general rule: <b>metals or hydrogen</b> are formed at the <b>cathode</b>; <b>non-metals (other than hydrogen)</b> are formed at the <b>anode</b>.</p>
<p>In an <b>aqueous solution</b> there are extra ions from the water, $\text{H}^+$ and $\text{OH}^-$, so there is a choice at each electrode.</p>
${(() => { let s = F.rect(10, 20, 260, 190, "b bS b", 12) + F.rect(290, 20, 260, 190, "r rS r", 12) + F.text(140, 44, "CATHODE (−)", "tb bold") + F.text(420, 44, "ANODE (+)", "tr bold");
  s += F.text(140, 72, "metal ion or H⁺?", "tk small bold") + F.text(140, 100, "metal MORE reactive than H", "tk small") + F.text(140, 116, "(K, Na, Ca, Mg, Al…)", "tm small") + F.text(140, 134, "→ hydrogen", "tb small bold") + F.text(140, 162, "metal LESS reactive than H", "tk small") + F.text(140, 178, "(Cu, Ag, Au)", "tm small") + F.text(140, 196, "→ the metal", "tb small bold");
  s += F.text(420, 72, "halide or OH⁻?", "tk small bold") + F.text(420, 100, "concentrated halide", "tk small") + F.text(420, 116, "(Cl⁻, Br⁻, I⁻)", "tm small") + F.text(420, 134, "→ halogen", "tr small bold") + F.text(420, 162, "no halide / dilute halide", "tk small") + F.text(420, 178, "(SO₄²⁻, NO₃⁻ present)", "tm small") + F.text(420, 196, "→ oxygen", "tr small bold");
  return F.fig(560, 220, s, "Rules for aqueous solutions with inert electrodes.", { size: "wide" }); })()}
<details class="check"><summary>Predict the products when concentrated aqueous potassium bromide is electrolysed.</summary><div>Cathode: hydrogen (potassium is more reactive than hydrogen). Anode: bromine (concentrated halide).</div></details>`},

    { h: "Aqueous solutions: NaCl and H₂SO₄ (4.1)", body: C`
${F.row(
  ecell({ liq: "b", aLab: "chlorine", cLab: "hydrogen", gasA: true, gasC: true, name: "concentrated NaCl(aq) (brine)", cap: "" }),
  ecell({ liq: "b", aLab: "oxygen", cLab: "hydrogen", gasA: true, gasC: true, name: "dilute H₂SO₄", cap: "" })
)}
<h3>Concentrated aqueous sodium chloride (brine)</h3>
<table class="t"><tr><th>Electrode</th><th>Product</th><th>Observation / test</th></tr>
<tr><td>Cathode</td><td>Hydrogen</td><td>Bubbles; gas "pops" with a lighted splint</td></tr>
<tr><td>Anode</td><td>Chlorine</td><td>Pale yellow-green gas; bleaches damp litmus paper</td></tr></table>
<p>The Na⁺ and OH⁻ ions are left in solution, which becomes <b>sodium hydroxide</b>. This is an important industrial process (it makes chlorine, hydrogen and sodium hydroxide).</p>
<h3>Dilute sulfuric acid</h3>
<table class="t"><tr><th>Electrode</th><th>Product</th><th>Observation / test</th></tr>
<tr><td>Cathode</td><td>Hydrogen</td><td>Bubbles; pops</td></tr>
<tr><td>Anode</td><td>Oxygen</td><td>Bubbles; relights a glowing splint</td></tr></table>
<p>The volume of hydrogen is <b>twice</b> the volume of oxygen: effectively water is being decomposed ($2\text{H}_2\text{O}\rightarrow2\text{H}_2+\text{O}_2$), so the acid gradually becomes more concentrated.</p>
<h3>Dilute vs concentrated halides (S)</h3>
<p>With a <b>dilute</b> halide solution (e.g. dilute NaCl), there are relatively few halide ions, so <b>oxygen</b> (from OH⁻) is formed at the anode instead of the halogen. With a <b>concentrated</b> solution, the <b>halogen</b> is formed.</p>`},

    { h: "Ionic half-equations (4.1 S)", body: C`
<p class="lead">A half-equation shows what happens at one electrode, with electrons written as $e^-$. The charges must balance on both sides.</p>
<table class="t"><tr><th>At the cathode (reduction: gain of electrons)</th><th>At the anode (oxidation: loss of electrons)</th></tr>
<tr><td>$\text{Pb}^{2+}+2e^-\rightarrow\text{Pb}$</td><td>$2\text{Br}^-\rightarrow\text{Br}_2+2e^-$</td></tr>
<tr><td>$\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}$</td><td>$2\text{Cl}^-\rightarrow\text{Cl}_2+2e^-$</td></tr>
<tr><td>$2\text{H}^++2e^-\rightarrow\text{H}_2$</td><td>$4\text{OH}^-\rightarrow\text{O}_2+2\text{H}_2\text{O}+4e^-$</td></tr>
<tr><td>$\text{Al}^{3+}+3e^-\rightarrow\text{Al}$</td><td>$2\text{O}^{2-}\rightarrow\text{O}_2+4e^-$</td></tr>
<tr><td>$\text{Na}^++e^-\rightarrow\text{Na}$</td><td>$\text{Cu}\rightarrow\text{Cu}^{2+}+2e^-$ (copper anode)</td></tr></table>
<h3>How to write one</h3>
<ol class="steps-inline"><li>Write the ion and the product: $\text{Cl}^-\rightarrow\text{Cl}_2$.</li><li>Balance the atoms: $2\text{Cl}^-\rightarrow\text{Cl}_2$.</li><li>Balance the charge with electrons: left side −2, so put $2e^-$ on the right: $2\text{Cl}^-\rightarrow\text{Cl}_2+2e^-$.</li></ol>
<div class="callout warn"><b class="t">Electrons on the correct side</b>Cathode equations have electrons on the <b>left</b> (gained). Anode equations have electrons on the <b>right</b> (lost).</div>`},

    { h: "Aqueous copper(II) sulfate (4.1 S)", body: C`
${F.row(
  ecell({ liq: "b", aLab: "oxygen", cLab: "copper (pink)", gasA: true, name: "CuSO₄(aq), graphite", cap: "Inert electrodes" }),
  ecell({ liq: "b", aLab: "anode dissolves", cLab: "copper deposited", elec: "o oS o", name: "CuSO₄(aq), copper", cap: "Copper electrodes" })
)}
<h3>With inert (graphite) electrodes</h3>
<ul><li>Cathode: <b>copper</b> is deposited as a pink-brown coating: $\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}$ (copper is less reactive than hydrogen).</li>
<li>Anode: <b>oxygen</b> bubbles: $4\text{OH}^-\rightarrow\text{O}_2+2\text{H}_2\text{O}+4e^-$.</li>
<li>The <b>blue colour fades</b> as Cu²⁺ ions are removed, and the solution becomes acidic (H⁺ and SO₄²⁻ left: sulfuric acid).</li></ul>
<h3>With copper electrodes</h3>
<ul><li>Anode: the copper anode <b>dissolves</b> (gets thinner): $\text{Cu}\rightarrow\text{Cu}^{2+}+2e^-$.</li>
<li>Cathode: copper is deposited (gets thicker): $\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}$.</li>
<li>The <b>blue colour stays the same</b>: Cu²⁺ ions are added at the anode as fast as they're removed at the cathode.</li>
<li>The mass lost by the anode equals the mass gained by the cathode.</li></ul>
<h3>Purifying copper</h3>
<p>This is how copper is purified for electrical wiring: an <b>impure copper anode</b> and a <b>pure copper cathode</b> in copper(II) sulfate solution. Copper moves from anode to cathode; impurities fall to the bottom as "anode sludge" (which can contain valuable silver and gold).</p>`},

    { h: "Electroplating (4.1)", body: C`
<p class="lead"><b>Electroplating</b> coats a metal object with a thin layer of another metal, by electrolysis. It is used to <b>improve appearance</b> (silver- or gold-plated jewellery) and <b>resistance to corrosion</b> (chromium on car parts, tin on steel cans).</p>
${(() => { let s = F.path("M90,60 L90,230 L370,230 L370,60", "k thick") + F.rect(92, 90, 276, 138, "mS nostroke") + F.rect(140, 50, 18, 150, "m mF") + F.text(149, 250, "silver anode (+)", "tm small bold");
  s += F.path("M290,110 Q320,80 330,130 Q340,180 300,190 Q270,170 290,110 Z", "m mS") + F.path("M290,110 Q320,80 330,130 Q340,180 300,190 Q270,170 290,110 Z", "m thick") + F.line(310, 50, 310, 95, "k") + F.text(320, 250, "spoon to be plated (−)", "tk small bold");
  s += F.poly([[149, 50], [149, 20], [310, 20], [310, 50]], "k") + F.rect(205, 8, 50, 24, "k bgF", 4) + F.text(230, 25, "d.c.", "tk small bold") + F.text(230, 215, "electrolyte: silver nitrate solution (Ag⁺ ions)", "tk small");
  return F.fig(460, 265, s, "Silver plating a spoon.", { size: "small" }); })()}
<ol class="steps-inline"><li>The object to be plated is the <b>cathode</b> (−).</li>
<li>The <b>anode</b> is made of the plating metal (e.g. silver).</li>
<li>The <b>electrolyte</b> contains ions of the plating metal (e.g. silver nitrate solution).</li>
<li>At the cathode, $\text{Ag}^++e^-\rightarrow\text{Ag}$ deposits silver on the object; at the anode, silver dissolves, $\text{Ag}\rightarrow\text{Ag}^++e^-$, keeping the solution's concentration constant.</li></ol>
<details class="check"><summary>A student wants to nickel-plate a steel key. What should the anode, cathode and electrolyte be?</summary><div>Anode: nickel. Cathode: the steel key. Electrolyte: a solution of a nickel salt (e.g. nickel sulfate).</div></details>`},

    { h: "Hydrogen–oxygen fuel cells (4.2)", body: C`
<p class="lead">A <b>fuel cell</b> uses a chemical reaction to produce electricity directly. A hydrogen–oxygen fuel cell combines <b>hydrogen</b> and <b>oxygen</b>, and the <b>only chemical product is water</b>.</p>
$$2\text{H}_2+\text{O}_2\rightarrow2\text{H}_2\text{O}$$
${(() => { let s = F.rect(150, 40, 260, 160, "k bgF", 10) + F.rect(170, 50, 30, 140, "m mS") + F.rect(360, 50, 30, 140, "m mS") + F.rect(200, 50, 160, 140, "b bS nostroke") + F.text(280, 124, "electrolyte", "tb small bold");
  s += F.arrow(60, 90, 168, 90, "k mid", 8) + F.text(60, 80, "hydrogen in", "tk small bold", "start") + F.arrow(500, 90, 392, 90, "k mid", 8) + F.text(500, 80, "oxygen (air) in", "tk small bold", "end") + F.arrow(390, 170, 500, 170, "b mid", 8) + F.text(500, 190, "water out", "tb small bold", "end");
  s += F.poly([[185, 40], [185, 14], [375, 14], [375, 40]], "o mid") + F.circ(280, 14, 12, "o bgF o") + F.text(280, 19, "M", "to small bold") + F.text(280, 240, "electricity drives a motor", "to small bold");
  return F.fig(560, 250, s, "", { size: "wide" }); })()}
<h3>Compared with petrol engines (S)</h3>
<table class="t"><tr><th>Advantages of fuel cells</th><th>Disadvantages</th></tr>
<tr><td>Only product is water: no CO₂, CO, nitrogen oxides or particulates from the vehicle</td><td>Hydrogen is a gas: hard to store (needs high-pressure tanks); explosive</td></tr>
<tr><td>More efficient than burning fuel in an engine</td><td>Few hydrogen filling stations</td></tr>
<tr><td>Quiet; fewer moving parts</td><td>Hydrogen is often made from methane (fossil fuel) or by electrolysis that uses electricity, which may come from fossil fuels</td></tr>
<tr><td>Hydrogen can be made from water</td><td>Fuel cells are expensive and use costly catalysts (platinum)</td></tr></table>`}
  ],
  worked: [
    { q: C`S: Molten aluminium oxide is electrolysed. Write the half-equations at each electrode and state which is oxidation.`,
      steps: [C`Cathode: $\text{Al}^{3+}+3e^-\rightarrow\text{Al}$ (reduction, gain of electrons).`, C`Anode: $2\text{O}^{2-}\rightarrow\text{O}_2+4e^-$ (oxidation, loss of electrons).`]},
    { q: C`S: Predict and explain the products of electrolysis of concentrated aqueous copper(II) chloride with graphite electrodes.`,
      steps: [C`Ions: Cu²⁺, H⁺, Cl⁻, OH⁻.`, C`Cathode: copper is less reactive than hydrogen, so copper is deposited.`, C`Anode: concentrated chloride, so chlorine is formed.`]},
    { q: C`Explain why solid sodium chloride does not conduct electricity but molten sodium chloride does.`,
      steps: [C`Both contain ions.`, C`In the solid, the ions are held in fixed positions in a lattice and can't move.`, C`When molten, the ions are free to move and carry charge to the electrodes.`]}
  ],
  formulas: [["Cathode (−)", "reduction: metal or hydrogen formed"], ["Anode (+)", "oxidation: non-metal formed"], ["Cathode half-equation (S)", C`$\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}$`], ["Anode half-equation (S)", C`$2\text{Cl}^-\rightarrow\text{Cl}_2+2e^-$`], ["Oxygen at anode (S)", C`$4\text{OH}^-\rightarrow\text{O}_2+2\text{H}_2\text{O}+4e^-$`], ["Fuel cell", C`$2\text{H}_2+\text{O}_2\rightarrow2\text{H}_2\text{O}$`]],
  cards: [
    ["Define electrolysis", "Decomposition of an ionic compound, molten or in aqueous solution, by an electric current."],
    ["Anode", "Positive electrode; anions go there; oxidation."],
    ["Cathode", "Negative electrode; cations go there; reduction."],
    ["Why must the electrolyte be molten or dissolved?", "So the ions are free to move."],
    ["Molten PbBr₂ products", "Lead at the cathode; bromine (red-brown vapour) at the anode."],
    ["Concentrated NaCl(aq) products", "Hydrogen at cathode, chlorine at anode, NaOH left in solution."],
    ["Dilute H₂SO₄ products", "Hydrogen at cathode, oxygen at anode (2:1 by volume)."],
    ["When is hydrogen formed at the cathode?", "When the metal is more reactive than hydrogen."],
    ["When is oxygen formed at the anode?", "When there is no halide, or the halide is dilute."],
    ["What carries current in the wires / electrolyte? (S)", "Electrons in the wires; ions in the electrolyte."],
    ["OIL RIG", "Oxidation Is Loss, Reduction Is Gain (of electrons)."],
    ["CuSO₄ with graphite electrodes (S)", "Copper at cathode, oxygen at anode, blue colour fades."],
    ["CuSO₄ with copper electrodes (S)", "Anode dissolves, cathode gains copper, colour stays blue."],
    ["Electroplating setup", "Object = cathode; plating metal = anode; electrolyte contains the plating metal's ions."],
    ["Why electroplate?", "Improve appearance; resist corrosion."],
    ["Fuel cell product", "Water only."],
    ["Advantage of fuel cells over petrol (S)", "No CO₂/pollutants from the vehicle; more efficient."],
    ["Disadvantage of fuel cells (S)", "Hydrogen hard to store, few filling stations, often made using fossil fuels."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`During electrolysis, positive ions move to the`, opts: ["anode", "cathode", "electrolyte surface", "power supply"], ans: 1, why: C`Opposite charges attract.` },
    { type: "mcq", marks: 1, q: C`Electrolysis of molten zinc chloride produces`, opts: ["zinc at anode", "chlorine at cathode", "zinc at cathode, chlorine at anode", "hydrogen and oxygen"], ans: 2, why: C`Metal at cathode, non-metal at anode.` },
    { type: "mcq", marks: 1, q: C`The gas formed at the anode in electrolysis of dilute sulfuric acid is`, opts: ["hydrogen", "oxygen", "sulfur dioxide", "chlorine"], ans: 1, why: C`No halide present.` },
    { type: "mcq", marks: 1, q: C`Electrolysis of concentrated NaCl(aq) produces at the cathode`, opts: ["sodium", "hydrogen", "chlorine", "oxygen"], ans: 1, why: C`Na is more reactive than H.` },
    { type: "mcq", marks: 1, q: C`To silver-plate a ring, the ring should be the`, opts: ["anode", "cathode", "electrolyte", "salt bridge"], ans: 1, why: C`Metal ions are reduced onto the cathode.` },
    { type: "mcq", marks: 1, q: C`S: Which is the correct half-equation at the anode?`, opts: [C`$\text{Cl}_2+2e^-\rightarrow2\text{Cl}^-$`, C`$2\text{Cl}^-\rightarrow\text{Cl}_2+2e^-$`, C`$\text{Cl}^-\rightarrow\text{Cl}+e^+$`, C`$2\text{Cl}^-+2e^-\rightarrow\text{Cl}_2$`], ans: 1, why: C`Loss of electrons; electrons on the right.` },
    { type: "struct", marks: 4, q: C`Describe what is observed at each electrode when molten lead(II) bromide is electrolysed using inert electrodes, and name the products.`,
      ms: C`<b>B1</b> cathode: lead<br><b>B1</b> silvery beads / metal collects<br><b>B1</b> anode: bromine<br><b>B1</b> red-brown vapour / fumes` },
    { type: "struct", marks: 3, q: C`Concentrated aqueous sodium chloride is electrolysed. Name the products at each electrode and the substance left in solution. Give a test for the gas at the anode.`,
      ms: C`<b>B1</b> hydrogen at cathode, chlorine at anode<br><b>B1</b> sodium hydroxide left<br><b>B1</b> chlorine bleaches damp (blue) litmus paper` },
    { type: "struct", marks: 4, q: C`S: Copper(II) sulfate solution is electrolysed with copper electrodes. Describe and explain what happens to each electrode and to the colour of the solution. Include half-equations.`,
      ms: C`<b>B1</b> anode loses mass: $\text{Cu}\rightarrow\text{Cu}^{2+}+2e^-$<br><b>B1</b> cathode gains mass: $\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}$<br><b>B1</b> colour stays blue<br><b>B1</b> Cu²⁺ ions added at the anode at the same rate as removed at the cathode` },
    { type: "struct", marks: 3, q: C`Describe how you would electroplate an iron nail with copper.`,
      ms: C`<b>B1</b> iron nail as the cathode (negative)<br><b>B1</b> copper anode<br><b>B1</b> electrolyte of copper(II) sulfate solution; pass d.c. current` },
    { type: "struct", marks: 3, q: C`S: Describe how electric charge is carried (a) through the wires, (b) through the electrolyte, and (c) what happens at the electrodes.`,
      ms: C`<b>B1</b> (a) electrons<br><b>B1</b> (b) moving ions (cations to cathode, anions to anode)<br><b>B1</b> (c) cations gain electrons at cathode; anions lose electrons at anode` },
    { type: "struct", marks: 4, q: C`S: Give two advantages and two disadvantages of using hydrogen fuel cells instead of petrol engines in cars.`,
      ms: C`<b>B1</b> only water produced / no CO₂ or pollutants<br><b>B1</b> more efficient / quiet<br><b>B1</b> hydrogen difficult to store / flammable<br><b>B1</b> few filling stations / hydrogen produced using fossil fuels or electricity` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: C`Name the positive and negative electrodes in electrolysis.`, ms: C`<b>B1</b> positive: anode<br><b>B1</b> negative: cathode` },
    { d: 1, type: "mcq", marks: 1, q: C`Which can be electrolysed?`, opts: ["solid NaCl", "molten NaCl", "sugar solution", "copper metal"], ans: 1, why: C`Ions must be free to move.` },
    { d: 1, type: "struct", marks: 2, q: C`State two reasons why metal objects are electroplated.`, ms: C`<b>B1</b> improve appearance<br><b>B1</b> resist corrosion` },
    { d: 1, type: "struct", marks: 1, q: C`State the only chemical product of a hydrogen–oxygen fuel cell.`, ms: C`<b>B1</b> water` },
    { d: 2, type: "struct", marks: 3, q: C`Predict the products at each electrode when the following are electrolysed with inert electrodes: (a) molten potassium iodide, (b) concentrated aqueous potassium iodide.`, ms: C`<b>B1</b> (a) potassium at cathode, iodine at anode<br><b>B1</b> (b) hydrogen at cathode<br><b>B1</b> iodine at anode` },
    { d: 2, type: "struct", marks: 3, q: C`S: Write half-equations for the reactions at each electrode during the electrolysis of dilute sulfuric acid, and explain why twice as much hydrogen as oxygen is produced.`, ms: C`<b>B1</b> $2\text{H}^++2e^-\rightarrow\text{H}_2$<br><b>B1</b> $4\text{OH}^-\rightarrow\text{O}_2+2\text{H}_2\text{O}+4e^-$<br><b>B1</b> 4 electrons give 2 H₂ at cathode but only 1 O₂ at anode` },
    { d: 2, type: "mcq", marks: 1, q: C`S: Dilute aqueous sodium chloride is electrolysed. The main product at the anode is`, opts: ["chlorine", "oxygen", "sodium", "hydrogen"], ans: 1, why: C`Dilute halide: oxygen.` },
    { d: 3, type: "struct", marks: 6, q: C`S: Impure copper is purified by electrolysis. (a) Draw and label the cell. (b) Write the half-equations at each electrode. (c) Explain why the electrolyte stays the same colour. (d) What happens to the impurities?`, ms: C`<b>(a) B1</b> impure copper anode, pure copper cathode, copper(II) sulfate electrolyte<br><b>(b) B1</b> anode $\text{Cu}\rightarrow\text{Cu}^{2+}+2e^-$<br><b>B1</b> cathode $\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}$<br><b>(c) B1</b> concentration of Cu²⁺ stays constant<br><b>B1</b> as ions are formed at the anode at the same rate as removed at the cathode<br><b>(d) B1</b> fall to the bottom as anode sludge (may contain silver/gold)` },
    { d: 3, type: "struct", marks: 5, q: C`S: Aqueous copper(II) sulfate is electrolysed using graphite electrodes. (a) State what is observed at each electrode. (b) Write the half-equations. (c) Explain why the solution becomes paler and more acidic.`, ms: C`<b>(a) B1</b> pink/brown solid on cathode; bubbles at anode<br><b>(b) B1</b> $\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}$<br><b>B1</b> $4\text{OH}^-\rightarrow\text{O}_2+2\text{H}_2\text{O}+4e^-$<br><b>(c) B1</b> Cu²⁺ ions (blue) removed<br><b>B1</b> OH⁻ removed leaving H⁺ (and SO₄²⁻): sulfuric acid` }
  ]
});
}
