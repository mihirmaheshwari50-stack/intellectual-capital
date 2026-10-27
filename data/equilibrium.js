window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
//@@HELPERS-START
const tube = (x, y, fill, lab, cap) => F.path(`M${x},${y} L${x},${y + 100} Q${x},${y + 116} ${x + 16},${y + 116} Q${x + 32},${y + 116} ${x + 32},${y + 100} L${x + 32},${y}`, "k") + F.rect(x + 1, y + 60, 30, 46, fill + " nostroke") + F.text(x + 16, y + 140, lab, "tk small bold") + (cap ? F.text(x + 16, y + 156, cap, "tm small") : "");
const flowBox = (x, y, w, t, c) => { const L = t.split("|"), h = 16 + L.length * 16; return F.rect(x, y + 22 - h / 2, w, h, c + "S " + c, 10) + L.map((l, i) => F.text(x + w / 2, y + 26 - (L.length - 1) * 8 + i * 16, l, "t" + c + " small bold")).join(""); };
//@@HELPERS-END

/* ============================================================
   REVERSIBLE REACTIONS & EQUILIBRIUM  (0620: 6.1, 6.3)
   ============================================================ */
TOPICS.push({
  id: "equilibrium", subject: "chemistry", unit: 6, title: "Reversible reactions & equilibrium",
  blurb: "Physical and chemical changes, reversible reactions with hydrated salts, dynamic equilibrium, Le Chatelier's principle, and the Haber and Contact processes.",
  level: "Core → Supplement", demo: "haber",
  syllabus: [
    ["6.1", "Identify physical and chemical changes and describe the differences between them", 0],
    ["6.3", "Some reactions are reversible (⇌); heating hydrated compounds and adding water to anhydrous compounds (copper(II) sulfate, cobalt(II) chloride)", 1],
    ["6.3", "Equilibrium in a closed system: forward and reverse rates equal; concentrations no longer change", 2],
    ["6.3 S", "Predict the effect on the position of equilibrium of changing concentration", 3],
    ["6.3 S", "Predict the effect of changing temperature", 4],
    ["6.3 S", "Predict the effect of changing pressure, and of adding a catalyst", 5],
    ["6.3 S", "Haber process: equation, sources of N₂ and H₂, typical conditions (450 °C, 200 atm, iron catalyst)", 6],
    ["6.3 S", "Contact process: equation for SO₂ → SO₃, sources of SO₂ and O₂, conditions (450 °C, 2 atm, V₂O₅ catalyst)", 7],
    ["6.3 S", "Explain the chosen conditions in terms of rate, equilibrium, safety and economics", 8]
  ],
  sections: [
    { h: "Physical and chemical changes (6.1)", body: C`
<table class="t"><tr><th></th><th>Physical change</th><th>Chemical change</th></tr>
<tr><td>New substance formed?</td><td><b>No</b>: same substance, different form or state</td><td><b>Yes</b>: one or more new substances</td></tr>
<tr><td>Easily reversed?</td><td>Usually (e.g. freeze the water again)</td><td>Usually not</td></tr>
<tr><td>Energy change</td><td>Usually small</td><td>Often large (gets hot or cold)</td></tr>
<tr><td>Examples</td><td>Melting, boiling, dissolving sugar, filtering, cutting</td><td>Burning, rusting, cooking an egg, neutralisation, decomposition</td></tr></table>
<p><b>Signs of a chemical change</b>: a gas is given off (fizzing), a colour change, a precipitate forms, a temperature change, light or sound given out.</p>
<details class="check"><summary>Is dissolving salt in water a physical or chemical change? Explain.</summary><div>Physical: no new substance is formed; evaporating the water gets the salt back.</div></details>`},

    { h: "Reversible reactions (6.3)", body: C`
<p class="lead">Some reactions can go in <b>both directions</b>: the products can react to re-form the reactants. We use the symbol $\rightleftharpoons$.</p>
<h3>Hydrated and anhydrous salts</h3>
$$\underset{\text{blue}}{\text{CuSO}_4\cdot5\text{H}_2\text{O}}\ \rightleftharpoons\ \underset{\text{white}}{\text{CuSO}_4}+5\text{H}_2\text{O}$$
${F.row(
  (() => { let s = tube(20, 20, "bS", "hydrated", "blue crystals") + F.arrow(64, 70, 116, 70, "r mid", 8) + F.text(90, 60, "heat", "tr small bold") + tube(120, 20, "mS", "anhydrous", "white powder") + F.arrow(116, 110, 64, 110, "b mid", 8) + F.text(90, 100, "water", "tb small bold");
    return F.fig(180, 190, s, "Copper(II) sulfate.", { size: "tiny" }); })(),
  (() => { let s = tube(20, 20, "rS", "hydrated", "pink") + F.arrow(64, 70, 116, 70, "r mid", 8) + F.text(90, 60, "heat", "tr small bold") + tube(120, 20, "bS", "anhydrous", "blue") + F.arrow(116, 110, 64, 110, "b mid", 8) + F.text(90, 100, "water", "tb small bold");
    return F.fig(180, 190, s, "Cobalt(II) chloride.", { size: "tiny" }); })()
)}
$$\underset{\text{pink}}{\text{CoCl}_2\cdot6\text{H}_2\text{O}}\ \rightleftharpoons\ \underset{\text{blue}}{\text{CoCl}_2}+6\text{H}_2\text{O}$$
<ul><li>Heating the <b>hydrated</b> salt drives off the water of crystallisation (endothermic), leaving the <b>anhydrous</b> salt.</li>
<li>Adding water to the anhydrous salt reverses it (exothermic: it gets warm).</li>
<li>These colour changes are used as <b>tests for water</b>: anhydrous copper(II) sulfate turns white → blue; anhydrous cobalt(II) chloride (cobalt chloride paper) turns blue → pink.</li></ul>
<p>Changing the conditions (heating or adding water) changes the <b>direction</b> of the reaction.</p>`},

    { h: "Dynamic equilibrium (6.3)", body: C`
<p class="lead">If a reversible reaction takes place in a <b>closed system</b> (nothing can enter or leave), it eventually reaches <b>equilibrium</b>.</p>
<div class="viz" data-viz="equilibrium"></div>
<p>At equilibrium:</p>
<ul><li>the <b>rate of the forward reaction equals the rate of the reverse reaction</b>;</li>
<li>the <b>concentrations of reactants and products no longer change</b> (but are not necessarily equal).</li></ul>
<p>It is called <b>dynamic</b> because both reactions are still happening; they just cancel out.</p>
${F.plot({ w: 480, h: 280, x: [0, 10], y: [0, 1.1], grid: false, ticks: { x: [], y: [] }, xlabel: "time", ylabel: "rate",
  curves: [{ f: x => .25 + .75 * Math.exp(-x / 1.6), c: "b thick", label: "forward rate", lpos: [1.4, .7] }, { f: x => .25 - .25 * Math.exp(-x / 1.6), c: "o thick", label: "reverse rate", lpos: [1.6, .12] }],
  extra: (X, Y) => F.line(X(5), Y(0), X(5), Y(1.05), "m d thin") + F.text(X(7.5), Y(.36), "equal: equilibrium", "tg small bold"),
  cap: "The forward rate falls as reactants are used up; the reverse rate rises as products build up; they become equal." })}
<div class="callout warn"><b class="t">Equilibrium ≠ equal amounts</b>"Concentrations are equal at equilibrium" is a common wrong answer. They are <b>constant</b>, not equal.</div>`},

    { h: "Changing concentration (6.3 S)", body: C`
<p class="lead"><b>Le Chatelier's principle</b>: if the conditions of a system at equilibrium are changed, the position of equilibrium shifts to <b>oppose the change</b>.</p>
<ul><li><b>Add more reactant</b> (or remove product) → equilibrium shifts <b>right</b>: more product forms, using up some of the added reactant.</li>
<li><b>Add more product</b> (or remove reactant) → shifts <b>left</b>.</li></ul>
<h3>Example: the chromate–dichromate equilibrium</h3>
$$\underset{\text{yellow}}{2\text{CrO}_4^{2-}}+2\text{H}^+\ \rightleftharpoons\ \underset{\text{orange}}{\text{Cr}_2\text{O}_7^{2-}}+\text{H}_2\text{O}$$
<p>Add acid (more H⁺): shifts right, solution turns <b>orange</b>. Add alkali (removes H⁺): shifts left, turns <b>yellow</b>.</p>
<p>In industry, removing the product as it forms (e.g. condensing ammonia out) keeps shifting the equilibrium to the right.</p>`},

    { h: "Changing temperature (6.3 S)", body: C`
<p class="lead">If the <b>forward</b> reaction is exothermic, the reverse is endothermic by the same amount.</p>
<ul><li><b>Increase temperature</b> → equilibrium shifts in the <b>endothermic</b> direction (to absorb the extra heat).</li>
<li><b>Decrease temperature</b> → shifts in the <b>exothermic</b> direction.</li></ul>
<h3>Example</h3>
$$\underset{\text{brown}}{2\text{NO}_2(\text{g})}\ \rightleftharpoons\ \underset{\text{colourless}}{\text{N}_2\text{O}_4(\text{g})}\qquad\Delta H=-58\ \text{kJ/mol}$$
<p>The forward reaction is exothermic. Heating shifts it <b>left</b> (endothermic way): the gas turns darker brown. Cooling in ice shifts it right: paler.</p>
<div class="callout exam"><b class="t">Rate vs yield</b>A higher temperature always makes the reaction <b>faster</b> (both directions). Whether it increases the <b>yield</b> depends on whether the forward reaction is endothermic. Keep these separate in your answers.</div>`},

    { h: "Changing pressure; catalysts (6.3 S)", body: C`
<h3>Pressure (only for reactions involving gases)</h3>
<ul><li><b>Increase pressure</b> → shifts towards the side with <b>fewer molecules of gas</b> (to reduce the pressure).</li>
<li><b>Decrease pressure</b> → shifts towards the side with <b>more gas molecules</b>.</li>
<li>If both sides have the same number of gas molecules, pressure has <b>no effect</b> on the position.</li></ul>
<p>Count the moles of gas from the balanced equation: $\text{N}_2+3\text{H}_2\rightleftharpoons2\text{NH}_3$ has 4 on the left and 2 on the right, so high pressure favours ammonia.</p>
<h3>Catalysts</h3>
<p>A catalyst speeds up the forward and reverse reactions <b>equally</b>. It has <b>no effect on the position of equilibrium</b> (no effect on yield), but equilibrium is reached <b>faster</b>.</p>
<table class="t"><tr><th>Change</th><th>Shift</th><th>Effect on rate</th></tr>
<tr><td>↑ concentration of reactant</td><td>Right</td><td>Faster</td></tr><tr><td>↑ temperature</td><td>Endothermic direction</td><td>Faster</td></tr><tr><td>↑ pressure (gases)</td><td>Side with fewer gas molecules</td><td>Faster</td></tr><tr><td>Catalyst</td><td>None</td><td>Faster</td></tr></table>`},

    { h: "The Haber process: making ammonia (6.3 S)", body: C`
$$\text{N}_2(\text{g})+3\text{H}_2(\text{g})\ \rightleftharpoons\ 2\text{NH}_3(\text{g})\qquad\Delta H=-92\ \text{kJ/mol}$$
${(() => { let s = flowBox(10, 30, 120, "N₂|from the air", "b") + flowBox(10, 110, 120, "H₂|from methane", "o") + F.arrow(132, 52, 172, 80, "m", 8) + F.arrow(132, 132, 172, 104, "m", 8);
  s += flowBox(174, 70, 130, "reactor|450 °C, 200 atm|iron catalyst", "r") + F.arrow(306, 92, 346, 92, "m", 8) + flowBox(348, 70, 100, "cooled:|NH₃ liquefies", "g") + F.arrow(450, 92, 490, 92, "m", 8) + flowBox(492, 70, 80, "ammonia", "g");
  s += F.path("M398,118 L398,170 L240,170 L240,118", "m mid d") + F.arrow(240, 130, 240, 116, "m", 8) + F.text(320, 188, "unreacted N₂ and H₂ recycled", "tm small bold");
  return F.fig(580, 200, s, "", { size: "wide" }); })()}
<ul><li><b>Nitrogen</b>: from the <b>air</b> (78% nitrogen).</li><li><b>Hydrogen</b>: from <b>methane</b> (natural gas) reacting with steam.</li>
<li><b>Conditions</b>: <b>450 °C</b>, <b>200 atm (20 000 kPa)</b>, <b>iron catalyst</b>.</li>
<li>Only about 15–30% converts in one pass; the ammonia is removed by cooling (it liquefies), and unreacted gases are <b>recycled</b>, so overall about 98% is eventually converted.</li>
<li>Ammonia is used to make fertilisers (ammonium nitrate, ammonium sulfate) and nitric acid.</li></ul>
<p>Use the interactive lab below to see how temperature and pressure change the yield.</p>`},

    { h: "The Contact process: sulfur trioxide (6.3 S)", body: C`
$$2\text{SO}_2(\text{g})+\text{O}_2(\text{g})\ \rightleftharpoons\ 2\text{SO}_3(\text{g})\qquad\Delta H=-196\ \text{kJ/mol}$$
<ul><li><b>Sulfur dioxide</b>: from <b>burning sulfur</b> ($\text{S}+\text{O}_2\rightarrow\text{SO}_2$) or <b>roasting sulfide ores</b>.</li><li><b>Oxygen</b>: from the <b>air</b>.</li>
<li><b>Conditions</b>: <b>450 °C</b>, <b>2 atm (200 kPa)</b>, <b>vanadium(V) oxide (V₂O₅) catalyst</b>.</li>
<li>The SO₃ is then used to make <b>sulfuric acid</b> (for fertilisers, detergents, paints, car batteries).</li></ul>
<div class="callout why"><b class="t">Why only 2 atm?</b>The equilibrium already lies well to the right (about 99% conversion) at low pressure, so the extra cost and danger of high pressure aren't worth it.</div>`},

    { h: "Why these conditions? Compromise (6.3 S)", body: C`
<table class="t"><tr><th>Condition</th><th>Effect on yield</th><th>Effect on rate</th><th>Chosen value and why</th></tr>
<tr><td>Temperature</td><td>Forward reaction exothermic, so <b>lower</b> T gives higher yield</td><td>Lower T is <b>slower</b></td><td><b>450 °C</b>: a compromise: a reasonable yield at a reasonable rate</td></tr>
<tr><td>Pressure (Haber)</td><td>4 → 2 gas molecules, so <b>higher</b> pressure gives higher yield</td><td>Higher P is faster</td><td><b>200 atm</b>: higher would cost more (thick pipes, energy for compressors) and be more dangerous</td></tr>
<tr><td>Pressure (Contact)</td><td>3 → 2 gas molecules, higher P favours SO₃</td><td>Faster</td><td><b>2 atm</b>: yield already very high; extra pressure not economical</td></tr>
<tr><td>Catalyst</td><td>No effect</td><td>Much faster</td><td>Iron / V₂O₅: equilibrium reached quickly, allowing a lower temperature</td></tr></table>
<div class="callout exam"><b class="t">Writing a "conditions" answer</b>For each condition, say what it does to the <b>yield</b> (equilibrium), what it does to the <b>rate</b>, and the <b>cost/safety</b> trade-off. Use the word "compromise".</div>`}
  ],
  worked: [
    { q: C`S: For the reaction N₂ + 3H₂ ⇌ 2NH₃ (ΔH negative), predict and explain the effect on the yield of ammonia of (a) raising the temperature, (b) raising the pressure, (c) adding a catalyst.`,
      steps: [C`(a) Decreases: the equilibrium shifts in the endothermic direction, which is the reverse reaction.`, C`(b) Increases: shifts to the side with fewer gas molecules (2 instead of 4).`, C`(c) No change: a catalyst speeds up both reactions equally (equilibrium reached faster).`]},
    { q: C`State two features of a system in dynamic equilibrium.`,
      steps: [C`The rates of the forward and reverse reactions are equal.`, C`The concentrations of reactants and products stay constant (in a closed system).`]}
  ],
  formulas: [["Haber (S)", C`$\text{N}_2+3\text{H}_2\rightleftharpoons2\text{NH}_3$; 450 °C, 200 atm, Fe`], ["Contact (S)", C`$2\text{SO}_2+\text{O}_2\rightleftharpoons2\text{SO}_3$; 450 °C, 2 atm, V₂O₅`], ["Test for water", "anhydrous CuSO₄ white → blue; CoCl₂ blue → pink"], ["Le Chatelier (S)", "equilibrium shifts to oppose the change"]],
  cards: [
    ["Physical vs chemical change", "Physical: no new substance, easily reversed. Chemical: new substance formed."],
    ["Symbol for a reversible reaction", "⇌"],
    ["Hydrated copper(II) sulfate heated", "Blue → white (anhydrous); water given off."],
    ["Anhydrous cobalt(II) chloride + water", "Blue → pink."],
    ["Two features of equilibrium", "Forward rate = reverse rate; concentrations constant (closed system)."],
    ["Why is equilibrium called dynamic?", "Both reactions are still happening, at equal rates."],
    ["Le Chatelier's principle (S)", "If conditions change, the equilibrium shifts to oppose the change."],
    ["Increase temperature: shift? (S)", "In the endothermic direction."],
    ["Increase pressure: shift? (S)", "Towards fewer gas molecules."],
    ["Effect of a catalyst on equilibrium (S)", "None on position; equilibrium reached faster."],
    ["Haber process equation (S)", "N₂ + 3H₂ ⇌ 2NH₃"],
    ["Haber conditions (S)", "450 °C, 200 atm, iron catalyst."],
    ["Sources of N₂ and H₂ (S)", "N₂ from air; H₂ from methane."],
    ["Contact process conditions (S)", "450 °C, 2 atm, vanadium(V) oxide catalyst."],
    ["Source of SO₂ (S)", "Burning sulfur or roasting sulfide ores."],
    ["Why 450 °C? (S)", "Compromise: lower T gives more yield but too slow."],
    ["Why not higher than 200 atm? (S)", "Expensive and dangerous."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`Which is a chemical change?`, opts: ["Ice melting", "Sugar dissolving", "Iron rusting", "Water boiling"], ans: 2, why: C`A new substance, iron oxide, forms.` },
    { type: "mcq", marks: 1, q: C`Anhydrous copper(II) sulfate turns blue when`, opts: ["heated", "water is added", "acid is added", "cooled"], ans: 1, why: C`It becomes hydrated.` },
    { type: "mcq", marks: 1, q: C`At equilibrium in a closed system`, opts: ["the reaction stops", "concentrations are equal", "forward and reverse rates are equal", "only products are present"], ans: 2, why: C`Dynamic equilibrium.` },
    { type: "mcq", marks: 1, q: C`S: For 2SO₂ + O₂ ⇌ 2SO₃, increasing pressure`, opts: ["shifts left", "shifts right", "has no effect", "stops the reaction"], ans: 1, why: C`3 gas molecules → 2.` },
    { type: "mcq", marks: 1, q: C`S: The catalyst in the Haber process is`, opts: ["platinum", "iron", "vanadium(V) oxide", "nickel"], ans: 1, why: C`Iron.` },
    { type: "mcq", marks: 1, q: C`S: For a reaction with ΔH positive, increasing temperature`, opts: ["shifts equilibrium right", "shifts left", "has no effect", "decreases rate"], ans: 0, why: C`Forward is endothermic.` },
    { type: "struct", marks: 3, q: C`Describe what you would see when hydrated copper(II) sulfate is heated and then water is added to the product. Write an equation.`,
      ms: C`<b>B1</b> blue crystals turn white on heating (and steam given off)<br><b>B1</b> white powder turns blue when water added (gets warm)<br><b>B1</b> $\text{CuSO}_4\cdot5\text{H}_2\text{O}\rightleftharpoons\text{CuSO}_4+5\text{H}_2\text{O}$` },
    { type: "struct", marks: 4, q: C`S: State the conditions used in the Haber process and explain why a temperature of 450 °C is chosen.`,
      ms: C`<b>B1</b> 450 °C, 200 atm, iron catalyst<br><b>B1</b> forward reaction is exothermic, so lower temperature gives higher yield<br><b>B1</b> but lower temperature makes the rate too slow<br><b>B1</b> 450 °C is a compromise between yield and rate` },
    { type: "struct", marks: 3, q: C`S: Explain why the Contact process is carried out at only 2 atm although high pressure would increase the yield.`,
      ms: C`<b>B1</b> the equilibrium already gives a very high conversion at low pressure<br><b>B1</b> high pressure is expensive (equipment, energy)<br><b>B1</b> and more dangerous; not worth the small gain` },
    { type: "struct", marks: 3, q: C`S: Explain why a catalyst does not change the yield of an equilibrium reaction but is still used in industry.`,
      ms: C`<b>B1</b> it increases the rates of forward and reverse reactions equally<br><b>B1</b> so the position of equilibrium is unchanged<br><b>B1</b> but equilibrium is reached faster, saving time/money (allows lower temperature)` },
    { type: "struct", marks: 2, q: C`Give two differences between a physical change and a chemical change.`,
      ms: C`<b>B1</b> chemical change forms a new substance; physical does not<br><b>B1</b> physical changes are usually easily reversed; chemical usually not / energy change larger in chemical` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: C`What does the symbol ⇌ mean?`, ms: C`<b>B1</b> the reaction is reversible` },
    { d: 1, type: "mcq", marks: 1, q: C`Cobalt(II) chloride paper is used to test for`, opts: ["carbon dioxide", "water", "oxygen", "chlorine"], ans: 1, why: C`Blue → pink.` },
    { d: 1, type: "struct", marks: 2, q: C`State two signs that a chemical change has taken place.`, ms: C`<b>B2</b> any two: gas produced, colour change, precipitate, temperature change, light` },
    { d: 2, type: "struct", marks: 3, q: C`S: The reaction 2NO₂ ⇌ N₂O₄ is exothermic in the forward direction. NO₂ is brown, N₂O₄ colourless. Predict and explain what happens to the colour when a sealed tube of the mixture is put in hot water.`, ms: C`<b>B1</b> gets darker brown<br><b>B1</b> increased temperature shifts equilibrium in the endothermic direction<br><b>B1</b> which is the reverse reaction, making more NO₂` },
    { d: 2, type: "struct", marks: 3, q: C`S: State the sources of the raw materials for the Contact process and write the equation for the reaction in the converter.`, ms: C`<b>B1</b> SO₂ from burning sulfur / roasting sulfide ores<br><b>B1</b> O₂ from air<br><b>B1</b> $2\text{SO}_2+\text{O}_2\rightleftharpoons2\text{SO}_3$` },
    { d: 2, type: "mcq", marks: 1, q: C`S: H₂(g) + I₂(g) ⇌ 2HI(g). Increasing the pressure`, opts: ["shifts right", "shifts left", "doesn't change the position", "stops the reaction"], ans: 2, why: C`2 gas molecules each side.` },
    { d: 3, type: "struct", marks: 6, q: C`S: Explain, in terms of rate, yield, cost and safety, the choice of conditions for the Haber process.`, ms: C`<b>B1</b> high pressure increases yield (fewer gas molecules on the right) and rate<br><b>B1</b> but very high pressure expensive/dangerous → 200 atm<br><b>B1</b> low temperature increases yield (exothermic)<br><b>B1</b> but rate too slow → 450 °C compromise<br><b>B1</b> iron catalyst increases rate, no effect on yield<br><b>B1</b> unreacted gases recycled / ammonia removed by cooling` },
    { d: 3, type: "struct", marks: 4, q: C`S: Ethanol is made by C₂H₄(g) + H₂O(g) ⇌ C₂H₅OH(g), ΔH = −45 kJ/mol, at 300 °C and 60 atm with a phosphoric acid catalyst. Explain how (a) the pressure, (b) the temperature affect the equilibrium yield.`, ms: C`<b>(a) B1</b> 2 gas molecules → 1<br><b>B1</b> higher pressure shifts right, increasing yield<br><b>(b) B1</b> forward exothermic<br><b>B1</b> higher temperature shifts left, reducing yield (but increases rate)` }
  ]
});
}
