window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
//@@HELPERS-START
// reaction pathway diagram. start/end levels and peak on a 0–10 scale
const pathway = (o) => { const st = o.start, en = o.end, pk = o.peak, path = (x) => { const t = Math.min(1, Math.max(0, (x - 2.5) / 5)), base = st + (en - st) * t * t * (3 - 2 * t); return base + (pk - Math.max(st, en)) * Math.exp(-((x - 5) ** 2) / 1.3); };
  return F.plot({ w: o.w || 480, h: o.h || 300, x: [0, 10], y: [0, 10.5], grid: false, xlabel: "progress of reaction", ylabel: "energy", m: { l: 26, r: 30, t: 16, b: 26 },
    curves: [{ f: path, dom: [.4, 9.6], c: "c thick" }, ...(o.cat ? [{ f: (x) => { const t = Math.min(1, Math.max(0, (x - 2.5) / 5)), base = st + (en - st) * t * t * (3 - 2 * t); return base + (o.cat - Math.max(st, en)) * Math.exp(-((x - 5) ** 2) / 1.3); }, dom: [.4, 9.6], c: "g thick d" }] : [])],
    extra: (X, Y) => F.text(X(1.4), Y(st) - 8, o.r || "reactants", "tk small bold") + F.text(X(8.7), Y(en) - 8, o.p || "products", "tk small bold") + F.line(X(.4), Y(st), X(9.9), Y(st), "m d thin")
      + (o.dH !== false ? F.dim(X(9.9), Y(st), X(9.9), Y(en), "ΔH", "b", 18) : "") + (o.ea !== false ? F.dim(X(3), Y(st), X(3), Y(Math.max(...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => path(x)))), "Ea", "r", -18) : "") + (o.extra ? o.extra(X, Y) : ""),
    cap: o.cap, size: o.size || "" }); };
//@@HELPERS-END

/* ============================================================
   CHEMICAL ENERGETICS  (0620: 5.1)
   ============================================================ */
TOPICS.push({
  id: "energetics", subject: "chemistry", unit: 5, title: "Chemical energetics",
  blurb: "Exothermic and endothermic reactions, measuring temperature changes, reaction pathway diagrams, enthalpy change, activation energy and bond energy calculations.",
  level: "Core → Supplement", demo: "bondenergy",
  syllabus: [
    ["5.1", "An exothermic reaction transfers thermal energy to the surroundings, increasing their temperature", 0],
    ["5.1", "An endothermic reaction takes in thermal energy from the surroundings, decreasing their temperature", 0],
    ["5.1", "Measure and interpret temperature changes in reactions", 1],
    ["5.1", "Interpret reaction pathway diagrams showing exothermic and endothermic reactions", 2],
    ["5.1 S", "The transfer of thermal energy during a reaction is the enthalpy change, ΔH: negative for exothermic, positive for endothermic", 3],
    ["5.1 S", "Define activation energy, Ea, as the minimum energy that colliding particles must have to react", 4],
    ["5.1 S", "Draw, label and interpret reaction pathway diagrams showing reactants, products, ΔH and Ea", 4],
    ["5.1 S", "Bond breaking is endothermic and bond making is exothermic; explain ΔH in these terms", 5],
    ["5.1 S", "Calculate the enthalpy change of a reaction using bond energies", 6]
  ],
  sections: [
    { h: "Exothermic and endothermic reactions (5.1)", body: C`
<p class="lead">Chemical reactions involve energy changes. Usually this shows up as a change in temperature of the surroundings (the solution, the test tube, the air, your hand).</p>
${F.row(
  (() => { let s = F.rect(60, 50, 100, 90, "o oS o", 8) + F.text(110, 100, "reaction", "tk small bold"); [[0, -1], [1, 0], [-1, 0], [0, 1]].forEach(([dx, dy]) => { s += F.arrow(110 + dx * 55, 95 + dy * 50, 110 + dx * 95, 95 + dy * 80, "r thick", 10); });
    s += F.text(110, 200, "temperature RISES", "tr small bold");
    return F.fig(220, 210, s, "<b>Exothermic</b>: energy released TO the surroundings."); })(),
  (() => { let s = F.rect(60, 50, 100, 90, "b bS b", 8) + F.text(110, 100, "reaction", "tk small bold"); [[0, -1], [1, 0], [-1, 0], [0, 1]].forEach(([dx, dy]) => { s += F.arrow(110 + dx * 95, 95 + dy * 80, 110 + dx * 55, 95 + dy * 50, "b thick", 10); });
    s += F.text(110, 200, "temperature FALLS", "tb small bold");
    return F.fig(220, 210, s, "<b>Endothermic</b>: energy taken in FROM the surroundings."); })()
)}
<table class="t"><tr><th>Exothermic (gets hot)</th><th>Endothermic (gets cold)</th></tr>
<tr><td>Combustion (burning fuels)</td><td>Thermal decomposition (e.g. heating CaCO₃)</td></tr>
<tr><td>Neutralisation (acid + alkali)</td><td>Dissolving ammonium nitrate or ammonium chloride in water</td></tr>
<tr><td>Metals reacting with acids</td><td>Citric acid + sodium hydrogencarbonate</td></tr>
<tr><td>Respiration</td><td>Photosynthesis</td></tr>
<tr><td>Displacement reactions</td><td>Electrolysis</td></tr></table>
<p><b>Uses</b>: exothermic reactions in hand warmers and self-heating cans; endothermic reactions in instant cold packs for sports injuries.</p>
<div class="callout warn"><b class="t">Don't get confused</b>An endothermic reaction feels <b>cold</b> because it takes energy <i>from</i> your hand. "Endo" = in; "exo" = out.</div>`},

    { h: "Measuring energy changes (5.1)", body: C`
${(() => { let s = F.path("M140,70 L150,200 L250,200 L260,70 Z", "k mS") + F.path("M150,80 L160,190 L240,190 L250,80 Z", "k bgF") + F.rect(161, 120, 78, 69, "b bS nostroke") + F.rect(130, 60, 140, 14, "k mS", 3);
  s += F.rect(195, 10, 10, 150, "k bgF", 5) + F.circ(200, 165, 8, "r rF") + F.rect(197.5, 70, 5, 95, "r rF nostroke") + F.text(214, 30, "thermometer", "tk small", "start");
  s += F.text(300, 100, "polystyrene cup:", "tk small bold", "start") + F.text(300, 116, "insulator (less energy lost)", "tk small", "start") + F.text(300, 140, "lid: reduces heat loss", "tk small", "start") + F.text(300, 164, "stir, record the highest", "tk small", "start") + F.text(300, 180, "(or lowest) temperature", "tk small", "start");
  return F.fig(500, 215, s, "Simple calorimeter: mix the reactants in a polystyrene cup and measure the temperature change.", { size: "small" }); })()}
<ol class="steps-inline"><li>Measure a fixed volume of one reactant into a polystyrene cup; record its starting temperature.</li><li>Add the other reactant, stir, and record the highest (exothermic) or lowest (endothermic) temperature.</li><li>Temperature change = final − initial. Positive → exothermic; negative → endothermic.</li></ol>
<table class="t"><tr><th>Reaction</th><th>Start / °C</th><th>End / °C</th><th>Change</th><th>Type</th></tr>
<tr><td>HCl + NaOH</td><td>21.0</td><td>27.5</td><td>+6.5</td><td>Exothermic</td></tr>
<tr><td>NH₄NO₃ dissolving</td><td>21.0</td><td>14.0</td><td>−7.0</td><td>Endothermic</td></tr></table>
<div class="callout exam"><b class="t">Fair comparisons</b>Use the same volumes, concentrations and starting temperature; use an insulated cup with a lid; stir; repeat and average.</div>`},

    { h: "Reaction pathway diagrams (5.1)", body: C`
<p class="lead">A <b>reaction pathway diagram</b> (energy level diagram) shows the energy of the reactants and products, and how the energy changes during the reaction.</p>
${F.row(
  pathway({ start: 6, end: 3, peak: 9, ea: false, cap: "<b>Exothermic</b>: products have <b>less</b> energy than reactants. The difference is released to the surroundings." }),
  pathway({ start: 3, end: 6, peak: 9, ea: false, cap: "<b>Endothermic</b>: products have <b>more</b> energy than reactants. The difference was taken in from the surroundings." })
)}
<p>The "hump" in the middle shows that energy must be supplied to get the reaction started, even for exothermic reactions (a match to light a fire).</p>`},

    { h: "Enthalpy change, ΔH (5.1 S)", body: C`
<p class="lead">The transfer of thermal energy during a reaction is called the <b>enthalpy change</b>, $\Delta H$, usually measured in <b>kJ/mol</b>.</p>
<ul><li><b>Exothermic</b>: energy is lost from the chemicals to the surroundings, so $\Delta H$ is <b>negative</b>. Example: $\text{CH}_4+2\text{O}_2\rightarrow\text{CO}_2+2\text{H}_2\text{O}\quad\Delta H=-890$ kJ/mol.</li>
<li><b>Endothermic</b>: energy is gained by the chemicals, so $\Delta H$ is <b>positive</b>. Example: $\text{CaCO}_3\rightarrow\text{CaO}+\text{CO}_2\quad\Delta H=+178$ kJ/mol.</li></ul>
<div class="callout why"><b class="t">Why the signs</b>$\Delta H$ is measured from the point of view of the <b>chemicals</b>. In an exothermic reaction the chemicals end up with less energy (they gave it away), so the change is negative, even though the surroundings get hotter.</div>`},

    { h: "Activation energy and full pathway diagrams (5.1 S)", body: C`
<p class="lead"><b>Activation energy</b>, $E_a$, is the <b>minimum energy that colliding particles must have to react</b>. It is the height of the hump measured from the reactants.</p>
${F.row(
  pathway({ start: 6, end: 2.5, peak: 9.5, cap: "Exothermic: $\\Delta H$ negative (arrow points down).", r: "reactants", p: "products" }),
  pathway({ start: 2.5, end: 6, peak: 9.5, cap: "Endothermic: $\\Delta H$ positive (arrow points up).", r: "reactants", p: "products" })
)}
<h3>With a catalyst</h3>
${pathway({ start: 6, end: 2.5, peak: 9.5, cat: 7.5, cap: "A catalyst provides an alternative pathway with a <b>lower activation energy</b> (dashed). $\\Delta H$ is unchanged.", size: "small" })}
<div class="callout exam"><b class="t">Drawing marks</b><ul><li>Label axes: energy (y), progress of reaction (x).</li><li>Reactants and products at the correct relative heights, labelled (with formulas if given).</li><li>$E_a$ arrow from the <b>reactant</b> level up to the peak.</li><li>$\Delta H$ arrow from reactants to products (down for exothermic, up for endothermic).</li></ul></div>`},

    { h: "Bond breaking and bond making (5.1 S)", body: C`
<p class="lead">Every reaction involves <b>breaking</b> bonds in the reactants and <b>making</b> new bonds in the products.</p>
<ul><li><b>Breaking bonds is endothermic</b>: energy must be supplied to pull atoms apart.</li>
<li><b>Making bonds is exothermic</b>: energy is released when atoms bond.</li></ul>
<div class="viz" data-viz="bondEnergy"></div>
<ul><li>If <b>more energy is released</b> making bonds than is taken in breaking bonds → <b>exothermic</b> ($\Delta H$ negative).</li>
<li>If <b>more energy is taken in</b> breaking bonds than is released making bonds → <b>endothermic</b> ($\Delta H$ positive).</li></ul>
$$\Delta H=\text{energy to break bonds}-\text{energy released making bonds}$$`},

    { h: "Bond energy calculations (5.1 S)", body: C`
<p class="lead">A <b>bond energy</b> is the energy needed to break one mole of a particular bond (the same amount is released when it forms).</p>
<table class="t"><tr><th>Bond</th><th>kJ/mol</th><th>Bond</th><th>kJ/mol</th></tr>
<tr><td>H–H</td><td>436</td><td>C–H</td><td>413</td></tr><tr><td>Cl–Cl</td><td>243</td><td>C=O</td><td>805</td></tr><tr><td>H–Cl</td><td>432</td><td>O–H</td><td>464</td></tr><tr><td>O=O</td><td>498</td><td>N≡N</td><td>945</td></tr><tr><td>C–C</td><td>347</td><td>N–H</td><td>391</td></tr></table>
<h3>Method</h3>
<ol class="steps-inline"><li>Draw the <b>displayed formulae</b> so you can see every bond.</li><li>Count and add up the energy of all bonds <b>broken</b> (reactants).</li><li>Add up the energy of all bonds <b>made</b> (products).</li><li>$\Delta H$ = broken − made. Give the sign and units.</li></ol>
<h3>Example: burning methane</h3>
<p>$\text{CH}_4+2\text{O}_2\rightarrow\text{CO}_2+2\text{H}_2\text{O}$</p>
${(() => { let s = ""; const H = (x, y) => F.text(x, y + 5, "H", "tk bold"); s += F.text(40, 75, "C", "tk big bold") + H(40, 30) + H(40, 120) + H(0, 75) + H(80, 75) + F.line(40, 42, 40, 60, "k") + F.line(40, 90, 40, 108, "k") + F.line(10, 75, 30, 75, "k") + F.line(50, 75, 70, 75, "k");
  s += F.text(120, 80, "+ 2", "tk bold") + F.text(160, 80, "O", "tk bold") + F.line(170, 72, 190, 72, "k") + F.line(170, 78, 190, 78, "k") + F.text(200, 80, "O", "tk bold") + F.arrow(230, 75, 280, 75, "k", 8);
  s += F.text(300, 80, "O", "tk bold") + F.line(310, 72, 330, 72, "k") + F.line(310, 78, 330, 78, "k") + F.text(340, 80, "C", "tk bold") + F.line(350, 72, 370, 72, "k") + F.line(350, 78, 370, 78, "k") + F.text(380, 80, "O", "tk bold") + F.text(420, 80, "+ 2", "tk bold") + F.text(455, 80, "H", "tk bold") + F.line(465, 75, 480, 75, "k") + F.text(490, 80, "O", "tk bold") + F.line(500, 75, 515, 75, "k") + F.text(525, 80, "H", "tk bold");
  s += F.text(140, 150, "broken: 4 C–H + 2 O=O", "tr small bold") + F.text(420, 150, "made: 2 C=O + 4 O–H", "tg small bold");
  return F.fig(560, 165, s, "", { size: "wide" }); })()}
<ul><li>Broken: $4(413)+2(498)=1652+996=2648$ kJ</li><li>Made: $2(805)+4(464)=1610+1856=3466$ kJ</li><li>$\Delta H=2648-3466=-818$ kJ/mol: <b>exothermic</b>.</li></ul>
<p>(The measured value is −890 kJ/mol: bond energies are averages over many compounds, so calculated values are approximate.)</p>
<details class="check"><summary>Calculate ΔH for N₂ + 3H₂ → 2NH₃.</summary><div>Broken: 945 + 3(436) = 2253. Made: 6(391) = 2346. ΔH = 2253 − 2346 = −93 kJ/mol (exothermic).</div></details>`}
  ],
  worked: [
    { q: C`S: Calculate the enthalpy change for H₂ + Cl₂ → 2HCl using H–H 436, Cl–Cl 243, H–Cl 432 kJ/mol. Is it exothermic or endothermic?`,
      steps: [C`Broken: 436 + 243 = 679 kJ.`, C`Made: 2 × 432 = 864 kJ.`, C`ΔH = 679 − 864 = −185 kJ/mol. Negative, so exothermic.`]},
    { q: C`When 50 cm³ of HCl and 50 cm³ of NaOH are mixed, the temperature rises from 20.0 °C to 26.5 °C. State and explain whether the reaction is exothermic or endothermic.`,
      steps: [C`The temperature of the surroundings (the solution) increases by 6.5 °C.`, C`So energy is released to the surroundings: exothermic.`]},
    { q: C`S: Draw a reaction pathway diagram for an endothermic reaction with ΔH = +50 kJ/mol and Ea = +120 kJ/mol.`,
      steps: [C`Products drawn higher than reactants, by 50 units.`, C`Peak drawn 120 units above the reactants; Ea arrow from reactants to peak.`, C`ΔH arrow pointing upwards from reactants to products, labelled +50 kJ/mol.`]}
  ],
  formulas: [["Exothermic (S)", "ΔH negative; surroundings get hotter"], ["Endothermic (S)", "ΔH positive; surroundings get colder"], ["Bond energies (S)", C`$\Delta H=\sum\text{broken}-\sum\text{made}$`], ["Activation energy (S)", "minimum energy colliding particles need to react"]],
  cards: [
    ["Exothermic reaction", "Transfers thermal energy to the surroundings: temperature rises."],
    ["Endothermic reaction", "Takes in thermal energy from the surroundings: temperature falls."],
    ["3 exothermic examples", "Combustion, neutralisation, metal + acid (also respiration)."],
    ["2 endothermic examples", "Thermal decomposition; dissolving ammonium nitrate (also photosynthesis)."],
    ["Why use a polystyrene cup?", "It's an insulator, reducing energy transfer to/from the surroundings."],
    ["Exothermic pathway diagram", "Products lower than reactants."],
    ["Sign of ΔH for exothermic (S)", "Negative."],
    ["Define activation energy (S)", "The minimum energy colliding particles must have to react."],
    ["Effect of a catalyst on a pathway diagram", "Lower peak (lower Ea); ΔH unchanged."],
    ["Bond breaking: endo or exo? (S)", "Endothermic."],
    ["Bond making: endo or exo? (S)", "Exothermic."],
    ["When is a reaction exothermic, in bond terms? (S)", "More energy released making bonds than taken in breaking bonds."],
    ["Bond energy method (S)", "ΔH = total energy of bonds broken − total of bonds made."],
    ["Why are bond energy answers approximate?", "Bond energies are average values over many compounds."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`Which reaction is endothermic?`, opts: ["Burning methane", "Neutralisation", "Thermal decomposition of calcium carbonate", "Magnesium + acid"], ans: 2, why: C`Thermal decomposition needs energy.` },
    { type: "mcq", marks: 1, q: C`In an exothermic reaction the temperature of the surroundings`, opts: ["decreases", "increases", "stays the same", "drops to zero"], ans: 1, why: C`Energy is released to them.` },
    { type: "mcq", marks: 1, q: C`On a pathway diagram for an exothermic reaction, the products are`, opts: ["higher than the reactants", "lower than the reactants", "level with the reactants", "at the peak"], ans: 1, why: C`Energy has been released.` },
    { type: "mcq", marks: 1, q: C`S: ΔH for an endothermic reaction is`, opts: ["negative", "positive", "zero", "always 100 kJ"], ans: 1, why: C`Chemicals gain energy.` },
    { type: "mcq", marks: 1, q: C`S: Breaking bonds is`, opts: ["exothermic", "endothermic", "neither", "only happens in combustion"], ans: 1, why: C`Energy is needed to separate atoms.` },
    { type: "mcq", marks: 1, q: C`S: A catalyst`, opts: ["makes ΔH more negative", "lowers the activation energy", "raises the products' energy", "increases Ea"], ans: 1, why: C`Alternative pathway, lower Ea.` },
    { type: "struct", marks: 3, q: C`Describe an experiment to find out whether dissolving ammonium nitrate in water is exothermic or endothermic.`,
      ms: C`<b>B1</b> measure temperature of water in a polystyrene cup<br><b>B1</b> add ammonium nitrate, stir, record lowest/highest temperature<br><b>B1</b> temperature falls → endothermic` },
    { type: "struct", marks: 4, q: C`S: Draw and label a reaction pathway diagram for an exothermic reaction, showing ΔH and the activation energy.`,
      ms: C`<b>B1</b> axes labelled energy and progress of reaction<br><b>B1</b> products lower than reactants<br><b>B1</b> Ea from reactants to peak<br><b>B1</b> ΔH from reactants to products, downward` },
    { type: "struct", marks: 3, q: C`S: Explain, in terms of bond breaking and bond making, why the combustion of methane is exothermic.`,
      ms: C`<b>B1</b> energy is taken in to break bonds in CH₄ and O₂<br><b>B1</b> energy is released when bonds in CO₂ and H₂O form<br><b>B1</b> more energy released than taken in, so overall energy given out` },
    { type: "struct", marks: 4, q: C`S: Calculate ΔH for 2H₂ + O₂ → 2H₂O. (H–H 436, O=O 498, O–H 464 kJ/mol)`,
      ms: C`<b>C1</b> broken: 2(436) + 498 = 1370<br><b>C1</b> made: 4(464) = 1856<br><b>A1</b> −486 kJ/mol<br><b>B1</b> exothermic` },
    { type: "struct", marks: 2, q: C`S: Define activation energy.`,
      ms: C`<b>B1</b> the minimum energy<br><b>B1</b> that colliding particles must have to react` },
    { type: "struct", marks: 2, q: C`Give one use of an exothermic reaction and one use of an endothermic reaction.`,
      ms: C`<b>B1</b> exothermic: hand warmer / self-heating can / heating by burning fuel<br><b>B1</b> endothermic: cold pack for sports injuries` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: C`State the meaning of the term exothermic.`, ms: C`<b>B1</b> a reaction that transfers (thermal) energy to the surroundings` },
    { d: 1, type: "mcq", marks: 1, q: C`The temperature of a solution falls from 22 °C to 15 °C during a reaction. The reaction is`, opts: ["exothermic", "endothermic", "neutralisation", "combustion"], ans: 1, why: C`Temperature fell: energy taken in.` },
    { d: 1, type: "struct", marks: 2, q: C`Name two reactions that are exothermic.`, ms: C`<b>B2</b> any two: combustion, neutralisation, respiration, metal with acid, displacement` },
    { d: 2, type: "struct", marks: 3, q: C`Explain why a reaction pathway diagram for the combustion of fuel has a "hump", and why a flame is needed to start the reaction.`, ms: C`<b>B1</b> the hump is the activation energy<br><b>B1</b> particles need a minimum energy to react<br><b>B1</b> the flame supplies this energy; then energy released keeps it going` },
    { d: 2, type: "struct", marks: 3, q: C`S: Calculate ΔH for H₂ + Br₂ → 2HBr. (H–H 436, Br–Br 193, H–Br 366 kJ/mol)`, ms: C`<b>C1</b> broken 629<br><b>C1</b> made 732<br><b>A1</b> −103 kJ/mol` },
    { d: 2, type: "mcq", marks: 1, q: C`S: For a reaction, bonds broken = 1200 kJ, bonds made = 950 kJ. ΔH is`, opts: ["−250 kJ/mol", "+250 kJ/mol", "+2150 kJ/mol", "−2150 kJ/mol"], ans: 1, why: C`1200 − 950 = +250: endothermic.` },
    { d: 3, type: "struct", marks: 5, q: C`S: Ethene reacts with hydrogen: C₂H₄ + H₂ → C₂H₆. Bond energies: C=C 612, C–C 347, C–H 413, H–H 436 kJ/mol. (a) State which bonds are broken and made. (b) Calculate ΔH. (c) Draw a labelled pathway diagram.`, ms: C`<b>(a) B1</b> broken: C=C and H–H (C–H bonds unchanged)<br><b>B1</b> made: C–C and 2 C–H<br><b>(b) A1</b> (612 + 436) − (347 + 826) = −125 kJ/mol<br><b>(c) B1</b> products lower than reactants<br><b>B1</b> Ea and ΔH correctly shown` },
    { d: 3, type: "struct", marks: 4, q: C`S: Calculated ΔH from bond energies for the combustion of methane is −818 kJ/mol, but the measured value is −890 kJ/mol. Suggest two reasons for the difference.`, ms: C`<b>B1</b> bond energies are average values<br><b>B1</b> not exact for the bonds in these specific molecules<br><b>B1</b> water may be formed as liquid (extra energy released on condensing)<br><b>B1</b> any valid comment (e.g. measurement conditions)` }
  ]
});
}
