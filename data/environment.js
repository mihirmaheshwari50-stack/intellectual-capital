window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
const styled = (svg, style) => svg.replace(/class="([^"]*)"/, `class="$1" style="${style}"`);
const box = (x, y, w, t, c = "k") => { const L = t.split("|"), h = 12 + L.length * 15; return F.rect(x, y, w, h, c + "S " + c, 9) + L.map((l, i) => F.text(x + w / 2, y + 19 + i * 15, l, "t" + c + " small" + (i ? "" : " bold"))).join(""); };

/* ============================================================
   CHEMISTRY OF THE ENVIRONMENT  (0620: 10.1 – 10.3)
   ============================================================ */
TOPICS.push({
  id: "environment", subject: "chemistry", unit: 10, title: "Chemistry of the environment",
  blurb: "Testing water, what is in it and how it is treated; NPK fertilisers; the composition of air, pollutants and their effects, the greenhouse effect, acid rain, catalytic converters and photosynthesis.",
  level: "Core → Supplement", demo: "watertreat",
  syllabus: [
    ["10.1", "Chemical tests for the presence of water using anhydrous cobalt(II) chloride and anhydrous copper(II) sulfate", 0],
    ["10.1", "Test for the purity of water using melting and boiling points", 0],
    ["10.1", "Explain why distilled water is used in practical chemistry rather than tap water", 0],
    ["10.1", "State that water from natural sources may contain substances including dissolved oxygen, metal compounds, plastics, sewage, harmful microbes, nitrates and phosphates", 1],
    ["10.1 S", "State that some of these substances are beneficial and some are harmful; explain eutrophication", 1],
    ["10.1", "Describe the treatment of the domestic water supply: sedimentation, filtration, carbon, chlorination", 2],
    ["10.2", "State that ammonium salts and nitrates are used as fertilisers; NPK fertilisers provide the elements needed for plant growth", 3],
    ["10.3", "State the composition of clean, dry air", 4],
    ["10.3", "State the sources of carbon dioxide, carbon monoxide, particulates, methane, oxides of nitrogen and sulfur dioxide", 5],
    ["10.3", "State the adverse effects of these air pollutants", 5],
    ["10.3", "State and explain strategies to reduce the effects of climate change and acid rain", 7],
    ["10.3 S", "Describe how the greenhouse gases CO₂ and CH₄ cause global warming (absorption, reflection and emission of thermal energy)", 6],
    ["10.3 S", "Explain how oxides of nitrogen form in car engines and describe their removal by catalytic converters", 8],
    ["10.3", "Describe photosynthesis as the reaction between carbon dioxide and water to produce glucose and oxygen in the presence of chlorophyll and light", 9],
    ["10.3 S", "State the symbol equation for photosynthesis", 9]
  ],
  sections: [
    { h: "Testing for water and its purity (10.1)", body: C`
<p class="lead">There are two <b>chemical tests</b> for the presence of water. Both use an anhydrous salt that becomes <b>hydrated</b> and changes colour.</p>
${(() => { let s = "";
  s += styled(F.rect(40, 30, 90, 50, "nostroke", 6), "fill:#4f7fd8") + F.arrow(140, 55, 180, 55, "k", 8) + F.text(160, 45, "+ water", "tk small") + styled(F.rect(190, 30, 90, 50, "nostroke", 6), "fill:#e88ab4");
  s += F.text(85, 100, "blue", "tb small bold") + F.text(235, 100, "pink", "tr small bold") + F.text(160, 125, "anhydrous cobalt(II) chloride paper", "tk small");
  s += styled(F.rect(330, 30, 90, 50, "m", 6), "fill:#f6f6f2") + F.arrow(430, 55, 470, 55, "k", 8) + F.text(450, 45, "+ water", "tk small") + styled(F.rect(480, 30, 90, 50, "nostroke", 6), "fill:#3b7fd0");
  s += F.text(375, 100, "white", "tm small bold") + F.text(525, 100, "blue", "tb small bold") + F.text(450, 125, "anhydrous copper(II) sulfate", "tk small");
  return F.fig(600, 140, s, "Both tests show water is <i>present</i>; they do not show it is pure.", { size: "wide" }); })()}
<p class="eq">$$\text{CuSO}_4\text{(s)} + 5\text{H}_2\text{O(l)} \rightarrow \text{CuSO}_4{\cdot}5\text{H}_2\text{O(s)}$$</p>
<p><b>Testing purity:</b> pure water <b>melts at exactly 0 °C</b> and <b>boils at exactly 100 °C</b> (at standard pressure). Dissolved impurities lower the melting point and raise the boiling point, and make them happen over a range.</p>
<p><b>Distilled water</b> is used in practical chemistry rather than tap water because it contains <b>fewer chemical impurities</b> (dissolved ions such as Ca²⁺ or Cl⁻) that could react with the substances being tested or give false test results.</p>
<details class="check"><summary>A colourless liquid turns anhydrous copper(II) sulfate blue. Is it pure water?</summary><div>Not necessarily: it contains water. Check its boiling point is exactly 100 °C (and melting point 0 °C) to show it is pure.</div></details>`},

    { h: "What is in natural water? (10.1)", body: C`
<p>Water from rivers, lakes and underground is never pure. It may contain:</p>
<table class="t"><tr><th>Substance</th><th>Source</th><th>Beneficial or harmful? (S)</th></tr>
<tr><td>Dissolved oxygen</td><td>From the air</td><td><b>Beneficial:</b> needed by fish and other aquatic life for respiration</td></tr>
<tr><td>Metal compounds</td><td>Dissolved from rocks; industrial waste</td><td>Some <b>beneficial</b> (essential minerals such as calcium); some <b>toxic</b> (lead, mercury)</td></tr>
<tr><td>Plastics</td><td>Litter, waste</td><td><b>Harmful:</b> harm aquatic life (swallowed, entangle animals)</td></tr>
<tr><td>Sewage</td><td>Human and animal waste</td><td><b>Harmful:</b> contains harmful microbes (disease, e.g. cholera); decomposition uses up oxygen</td></tr>
<tr><td>Harmful microbes</td><td>Sewage, animal waste</td><td><b>Harmful:</b> cause disease</td></tr>
<tr><td>Nitrates</td><td>Fertiliser run-off from fields</td><td><b>Harmful:</b> lead to deoxygenation of water (eutrophication)</td></tr>
<tr><td>Phosphates</td><td>Fertilisers and detergents</td><td><b>Harmful:</b> lead to deoxygenation of water</td></tr></table>
<p><b>Eutrophication (S):</b> nitrates and phosphates are plant nutrients.</p>
${(() => { const B = [["Fertiliser|run-off into|river", "o"], ["Algae grow|fast (algal|bloom)", "g"], ["Bloom blocks|light; plants|below die", "g"], ["Bacteria rot|dead plants,|using up O₂", "r"], ["Oxygen|falls; fish|die", "r"]]; let s = "";
  B.forEach(([t, c], i) => { const x = 8 + i * 118; s += box(x, 20, 108, t, c); if (i) s += F.arrow(x - 9, 38, x - 1, 38, "m", 6); });
  return F.fig(600, 90, s, "Eutrophication: nutrients lead to deoxygenated water.", { size: "wide" }); })()}`},

    { h: "Treating the water supply (10.1)", body: C`
<p class="lead">Drinking water is made safe in a series of stages. Try each stage in the interactive lab at the bottom of the page.</p>
${(() => { const B = [["Screening", "removes large|floating debris", "m"], ["Sedimentation", "heavy particles|settle out", "o"], ["Filtration", "sand and gravel|trap small bits", "o"], ["Carbon", "removes tastes|and odours", "k"], ["Chlorination", "kills harmful|microbes", "g"]]; let s = "";
  B.forEach(([a, b, c], i) => { const x = 8 + i * 118; s += box(x, 20, 108, a + "|" + b, c); if (i) s += F.arrow(x - 9, 42, x - 1, 42, "m", 6); });
  return F.fig(600, 90, s, "Stages of water treatment.", { size: "wide" }); })()}
<ol class="steps"><li><b>Sedimentation</b>: water is held in large tanks so that heavy insoluble particles (soil, sand) <b>settle</b> to the bottom.</li>
<li><b>Filtration</b>: the water passes through layers of <b>sand and gravel</b>, which remove the smaller insoluble particles.</li>
<li><b>Carbon</b> (activated charcoal) is used to remove substances causing unpleasant <b>tastes and odours</b>.</li>
<li><b>Chlorination</b>: chlorine is added to <b>kill microbes</b> (bacteria). This is the stage that makes water safe from disease.</li></ol>
<div class="callout"><b>Common error:</b> filtration does <i>not</i> remove dissolved substances or microbes reliably, and chlorination does <i>not</i> remove solids. Match each stage to what it removes.</div>`},

    { h: "Fertilisers (10.2)", body: C`
<p class="lead">Plants need three main elements for healthy growth: <b>N</b>itrogen, <b>P</b>hosphorus and <b>K</b> (potassium). <b>NPK fertilisers</b> provide all three.</p>
<table class="t"><tr><th>Element</th><th>Needed for</th><th>Supplied by</th></tr>
<tr><td>Nitrogen (N)</td><td>Leaf growth; making proteins</td><td>Ammonium salts, nitrates: ammonium nitrate NH₄NO₃, ammonium sulfate (NH₄)₂SO₄, potassium nitrate KNO₃</td></tr>
<tr><td>Phosphorus (P)</td><td>Root growth</td><td>Phosphates: ammonium phosphate (NH₄)₃PO₄, calcium phosphate</td></tr>
<tr><td>Potassium (K)</td><td>Flowers, fruit, resistance to disease</td><td>Potassium salts: potassium chloride KCl, potassium sulfate K₂SO₄</td></tr></table>
<p>Fertilisers are made by <b>neutralisation</b>: for example ammonia + nitric acid → ammonium nitrate: $\text{NH}_3 + \text{HNO}_3 \rightarrow \text{NH}_4\text{NO}_3$.</p>
<p><b>Percentage of nitrogen:</b> a common calculation. In ammonium nitrate, NH₄NO₃ (Mr = 80) there are 2 N atoms: % N = (2 × 14)/80 × 100 = <b>35%</b>.</p>
<div class="callout"><b>Link to acids:</b> do not add lime (a base) to soil at the same time as an ammonium fertiliser: they react and release ammonia gas, so nitrogen is lost.</div>
<details class="check"><summary>Calculate the percentage of nitrogen in ammonium sulfate, (NH₄)₂SO₄. (Mr = 132)</summary><div>2 × 14 = 28; 28/132 × 100 = 21.2%.</div></details>`},

    { h: "Clean air (10.3)", body: C`
<p class="lead">Clean, dry air is approximately <b>78% nitrogen</b>, <b>21% oxygen</b>, and the remaining 1% is mainly <b>argon</b>, with about <b>0.04% carbon dioxide</b> and traces of other noble gases.</p>
${(() => { const cx = 120, cy = 110, r = 90, parts = [[78, "b", "nitrogen 78%"], [21, "g", "oxygen 21%"], [1, "o", "argon + CO₂ + others 1%"]]; let s = "", a0 = -90;
  parts.forEach(([p, c, l], i) => { const a1 = a0 + p * 3.6, la = a0 * Math.PI / 180, lb = a1 * Math.PI / 180, big = p > 50 ? 1 : 0;
    s += F.path(`M${cx},${cy} L${cx + r * Math.cos(la)},${cy + r * Math.sin(la)} A${r},${r} 0 ${big} 1 ${cx + r * Math.cos(lb)},${cy + r * Math.sin(lb)} Z`, c + "S " + c);
    s += F.rect(250, 60 + i * 30, 16, 16, c + "S " + c, 3) + F.text(275, 73 + i * 30, l, "tk small", "start"); a0 = a1; });
  return F.fig(460, 220, s, "Composition of clean, dry air by volume.", { size: "small" }); })()}
<p>The percentage of oxygen can be measured by passing a known volume of air repeatedly over heated copper, which reacts with the oxygen ($2\text{Cu} + \text{O}_2 \rightarrow 2\text{CuO}$). The volume falls by about 21%.</p>`},

    { h: "Air pollutants: sources and effects (10.3)", body: C`
<table class="t"><tr><th>Pollutant</th><th>Source</th><th>Adverse effect</th></tr>
<tr><td>Carbon dioxide CO₂</td><td><b>Complete combustion</b> of carbon-containing fuels</td><td>Higher levels → <b>increased global warming</b> → climate change</td></tr>
<tr><td>Carbon monoxide CO</td><td><b>Incomplete combustion</b> of carbon-containing fuels</td><td><b>Toxic</b>: combines with haemoglobin, stopping blood carrying oxygen</td></tr>
<tr><td>Particulates (soot, C)</td><td>Incomplete combustion of carbon-containing fuels</td><td>Increased risk of <b>respiratory problems and cancer</b></td></tr>
<tr><td>Methane CH₄</td><td>Decomposition of vegetation; waste gases from <b>digestion in animals</b> (cattle)</td><td>Increased <b>global warming</b> → climate change</td></tr>
<tr><td>Oxides of nitrogen NOₓ</td><td><b>Car engines</b> (high temperature)</td><td><b>Acid rain</b>, <b>photochemical smog</b>, respiratory problems</td></tr>
<tr><td>Sulfur dioxide SO₂</td><td>Combustion of <b>fossil fuels containing sulfur</b></td><td><b>Acid rain</b> (and respiratory problems)</td></tr></table>
<p><b>Acid rain</b> forms when SO₂ and NOₓ dissolve in rainwater (and react with oxygen) to form sulfuric and nitric acids. It damages buildings made of limestone and marble, corrodes metal structures, kills trees, and makes lakes acidic so fish die.</p>
${(() => { let s = styled(F.rect(0, 150, 600, 40, "nostroke"), "fill:#6aa84f44") + F.rect(30, 90, 40, 60, "m mS") + F.rect(42, 60, 14, 30, "m mS") + F.text(50, 175, "power station", "tk small");
  s += F.rect(140, 125, 60, 22, "b bS", 8) + F.circ(155, 150, 7, "k") + F.circ(185, 150, 7, "k") + F.text(170, 175, "car engine", "tk small");
  for (let i = 0; i < 3; i++) s += F.circ(49 + i * 12, 50 - i * 12, 8 + i * 2, "m mS thin") + F.circ(130 - i * 14, 128 - i * 14, 6 + i * 2, "m mS thin");
  s += F.text(100, 20, "SO₂, NOₓ", "tr small bold") + F.path("M150,25 Q250,0 330,30", "m d") + F.arrow(320, 26, 334, 32, "m", 6);
  s += F.path("M330,30 Q360,5 400,20 Q440,0 470,25 Q500,30 490,50 L330,50 Q310,45 330,30 Z", "m mS") + F.text(410, 40, "dissolve in rain", "tk small");
  for (let i = 0; i < 9; i++) s += F.line(340 + i * 17, 60 + (i % 2) * 10, 335 + i * 17, 80 + (i % 2) * 10, "b");
  s += F.text(508, 72, "H₂SO₄(aq)", "tb small bold", "start") + F.text(508, 88, "HNO₃(aq)", "tb small bold", "start");
  s += F.path("M360,150 L360,120 L380,105 L400,120 L400,150", "k") + F.text(380, 175, "limestone eroded", "tk small") + F.path("M470,150 L470,128", "k") + F.path("M455,130 Q470,95 485,130 Z", "g gS") + F.text(475, 175, "trees die", "tk small") + F.text(560, 175, "lakes acidic", "tk small");
  return F.fig(600, 190, s, "Acid rain: sulfur dioxide and nitrogen oxides dissolve in rainwater.", { size: "wide" }); })()}
<details class="check"><summary>Why is carbon monoxide particularly dangerous?</summary><div>It is toxic and colourless and odourless, so it cannot be detected by smell; it reduces the blood's ability to carry oxygen.</div></details>`},

    { h: "The greenhouse effect and climate change (10.3 S)", body: C`
<div class="viz" data-viz="greenhouse"></div>
<ol class="steps"><li>Short-wave radiation (visible and UV) from the Sun passes through the atmosphere and is <b>absorbed</b> by the Earth's surface, warming it. Some is <b>reflected</b>.</li>
<li>The warm Earth <b>emits</b> thermal energy as longer-wavelength <b>infrared</b> radiation.</li>
<li><b>Greenhouse gases</b> (carbon dioxide, methane, water vapour) <b>absorb</b> some of this infrared radiation.</li>
<li>They then <b>re-emit</b> it in all directions, including back towards the Earth, so less thermal energy escapes into space.</li>
<li>Increasing the concentration of greenhouse gases traps more thermal energy, so the average temperature rises: <b>enhanced global warming</b>, causing <b>climate change</b>.</li></ol>
<p>Consequences of climate change include melting ice caps and rising sea levels (flooding), more extreme weather, changes to rainfall and crop growth, and loss of habitats and species.</p>
<div class="callout"><b>Key words for full marks:</b> absorb, re-emit (or reflect), infrared, thermal energy, back to Earth. "Greenhouse gases trap heat" alone is not enough at Supplement level.</div>`},

    { h: "Reducing climate change and acid rain (10.3)", body: C`
<table class="t"><tr><th>Problem</th><th>Strategy</th><th>How it helps</th></tr>
<tr><td rowspan="4">Climate change</td><td><b>Planting trees</b></td><td>Trees remove CO₂ from the air by photosynthesis</td></tr>
<tr><td><b>Reducing livestock farming</b></td><td>Fewer cattle → less methane produced</td></tr>
<tr><td><b>Decreasing use of fossil fuels</b></td><td>Less CO₂ released</td></tr>
<tr><td><b>Increasing use of hydrogen and renewable energy</b> (wind, solar)</td><td>No CO₂ produced in use (hydrogen burns to give only water)</td></tr>
<tr><td rowspan="3">Acid rain</td><td><b>Catalytic converters</b> in cars</td><td>Remove oxides of nitrogen</td></tr>
<tr><td><b>Low-sulfur fuels</b></td><td>Less SO₂ formed on burning</td></tr>
<tr><td><b>Flue-gas desulfurisation</b> using calcium oxide</td><td>CaO (a base) reacts with acidic SO₂ in power-station chimneys</td></tr></table>
<p class="eq">$$\text{CaO} + \text{SO}_2 \rightarrow \text{CaSO}_3$$</p>`},

    { h: "Oxides of nitrogen and catalytic converters (10.3 S)", body: C`
<p><b>How NOₓ forms:</b> air contains nitrogen and oxygen. Normally nitrogen is very unreactive, but inside a car engine the <b>high temperature</b> (from the burning fuel and the spark) makes nitrogen react with oxygen:</p>
<p class="eq">$$\text{N}_2 + \text{O}_2 \rightarrow 2\text{NO} \qquad 2\text{NO} + \text{O}_2 \rightarrow 2\text{NO}_2$$</p>
<p>A <b>catalytic converter</b> in the exhaust contains a ceramic <b>honeycomb</b> (large surface area) coated with transition metal catalysts (platinum, rhodium). It converts:</p>
<div class="viz" data-viz="catalytic"></div>
<ul><li>Carbon monoxide → carbon dioxide: $2\text{CO} + \text{O}_2 \rightarrow 2\text{CO}_2$</li>
<li>Oxides of nitrogen → nitrogen (they are <b>reduced</b>): $2\text{NO} + 2\text{CO} \rightarrow \text{N}_2 + 2\text{CO}_2$ and $2\text{NO}_2 + 4\text{CO} \rightarrow \text{N}_2 + 4\text{CO}_2$</li>
<li>Unburnt hydrocarbons → carbon dioxide and water, e.g. $\text{C}_8\text{H}_{18} + 12\tfrac{1}{2}\text{O}_2 \rightarrow 8\text{CO}_2 + 9\text{H}_2\text{O}$</li></ul>
<p>Catalytic converters only work when hot, and they do <b>not</b> reduce CO₂ emissions (they actually produce CO₂).</p>
<details class="check"><summary>In 2NO + 2CO → N₂ + 2CO₂, which substance is reduced?</summary><div>NO: it loses oxygen (forming N₂). CO is oxidised.</div></details>`},

    { h: "Photosynthesis (10.3)", body: C`
<p class="lead">Green plants make glucose from carbon dioxide and water using light energy absorbed by <b>chlorophyll</b>. Oxygen is released.</p>
<p class="eq">$$\text{carbon dioxide} + \text{water} \xrightarrow{\text{light, chlorophyll}} \text{glucose} + \text{oxygen}$$</p>
<p class="eq">$$6\text{CO}_2 + 6\text{H}_2\text{O} \rightarrow \text{C}_6\text{H}_{12}\text{O}_6 + 6\text{O}_2 \quad \text{(S)}$$</p>
${(() => { let s = F.path("M200,170 L200,90", "g thick") + F.path("M200,120 Q150,90 130,110 Q160,130 200,120 Z", "g gS") + F.path("M200,100 Q250,70 270,90 Q240,110 200,100 Z", "g gS") + styled(F.rect(140, 170, 120, 20, "nostroke"), "fill:#8a6d3b66");
  s += F.circ(50, 30, 18, "oF nostroke") + F.arrow(70, 45, 130, 95, "o", 8) + F.text(80, 90, "light", "to small bold");
  s += F.arrow(330, 60, 265, 88, "m", 7) + F.text(335, 55, "CO₂ in", "tk small bold", "start") + F.arrow(260, 115, 330, 135, "b", 7) + F.text(335, 140, "O₂ out", "tb small bold", "start") + F.arrow(200, 210, 200, 175, "b", 7) + F.text(210, 210, "H₂O from roots", "tb small", "start") + F.text(110, 140, "glucose made", "tg small bold", "end");
  return F.fig(440, 220, s, "Photosynthesis removes CO₂ from the atmosphere and releases O₂.", { size: "small" }); })()}
<p>Photosynthesis is <b>endothermic</b> (it takes in light energy). It is the reverse of respiration. It removes CO₂ from the atmosphere, which is why <b>planting trees</b> and stopping deforestation help reduce climate change.</p>`}
  ],
  worked: [
    { q: C`Describe how river water is treated to make it safe to drink, stating the purpose of each stage.`,
      steps: [C`Sedimentation: large insoluble particles settle out.`, C`Filtration through sand and gravel: removes smaller insoluble particles.`, C`Carbon: removes tastes and odours.`, C`Chlorination: kills harmful microbes.`]},
    { q: C`S: Explain how oxides of nitrogen are formed in a car engine and how a catalytic converter removes them. Include an equation.`,
      steps: [C`The high temperature in the engine allows nitrogen and oxygen from the air to react: $\text{N}_2 + \text{O}_2 \rightarrow 2\text{NO}$.`, C`In the catalytic converter, NO reacts with CO on a platinum/rhodium catalyst surface.`, C`$2\text{NO} + 2\text{CO} \rightarrow \text{N}_2 + 2\text{CO}_2$: NO is reduced to harmless nitrogen.`]},
    { q: C`Calculate the percentage by mass of nitrogen in urea, CO(NH₂)₂. (Ar: C 12, O 16, N 14, H 1)`,
      steps: [C`Mr = 12 + 16 + 2 × (14 + 2) = 60.`, C`Mass of N = 2 × 14 = 28.`, C`% N = 28 ÷ 60 × 100 = 46.7%.`]}
  ],
  formulas: [["Test for water", "Cobalt(II) chloride blue → pink; copper(II) sulfate white → blue"], ["Pure water", "mp 0 °C, bp 100 °C"], ["Clean air", "78% N₂, 21% O₂, ~1% Ar, 0.04% CO₂"], ["Catalytic converter", C`$2\text{NO} + 2\text{CO} \rightarrow \text{N}_2 + 2\text{CO}_2$`], ["Photosynthesis", C`$6\text{CO}_2 + 6\text{H}_2\text{O} \rightarrow \text{C}_6\text{H}_{12}\text{O}_6 + 6\text{O}_2$`], ["Flue-gas desulfurisation", C`$\text{CaO} + \text{SO}_2 \rightarrow \text{CaSO}_3$`]],
  cards: [
    ["Two chemical tests for water", "Anhydrous cobalt(II) chloride (blue → pink); anhydrous copper(II) sulfate (white → blue)."],
    ["Physical test for pure water", "Boils at 100 °C, melts at 0 °C."],
    ["Why use distilled water in experiments?", "Fewer chemical impurities that could interfere."],
    ["Beneficial substance in river water (S)", "Dissolved oxygen (aquatic life) / some metal compounds (minerals)."],
    ["Harmful effect of nitrates/phosphates (S)", "Deoxygenation of water (eutrophication)."],
    ["Sedimentation removes…", "Large insoluble particles (they settle)."],
    ["Filtration removes…", "Small insoluble particles."],
    ["Carbon in water treatment", "Removes tastes and odours."],
    ["Chlorination", "Kills microbes."],
    ["NPK stands for…", "Nitrogen, phosphorus, potassium."],
    ["Two nitrogen fertilisers", "Ammonium nitrate, ammonium sulfate (or potassium nitrate)."],
    ["Composition of clean dry air", "78% nitrogen, 21% oxygen, ~1% argon, 0.04% CO₂."],
    ["Source of CO", "Incomplete combustion of carbon-containing fuels."],
    ["Effect of CO", "Toxic: reduces oxygen carried by blood."],
    ["Source of methane", "Decomposing vegetation; digestion in animals (cattle)."],
    ["Source of NOₓ", "Car engines (high temperature)."],
    ["Source of SO₂", "Burning fossil fuels containing sulfur."],
    ["Effects of NOₓ", "Acid rain, photochemical smog, respiratory problems."],
    ["Effect of particulates", "Respiratory problems and cancer."],
    ["How greenhouse gases warm Earth (S)", "Absorb infrared emitted by Earth and re-emit it, some back to Earth."],
    ["Two greenhouse gases", "Carbon dioxide, methane."],
    ["Four ways to reduce climate change", "Plant trees, less livestock, fewer fossil fuels, more hydrogen/renewables."],
    ["Three ways to reduce acid rain", "Catalytic converters, low-sulfur fuel, flue-gas desulfurisation (CaO)."],
    ["Catalysts in a catalytic converter", "Platinum and rhodium (transition metals)."],
    ["Photosynthesis word equation", "Carbon dioxide + water → glucose + oxygen (light, chlorophyll)."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`Anhydrous copper(II) sulfate turns from`, opts: ["blue to white", "white to blue", "blue to pink", "pink to blue"], ans: 1, why: C`White anhydrous → blue hydrated.` },
    { type: "mcq", marks: 1, q: C`Which stage in water treatment kills bacteria?`, opts: ["filtration", "sedimentation", "chlorination", "carbon"], ans: 2, why: C`Chlorine kills microbes.` },
    { type: "mcq", marks: 1, q: C`Which gas makes up about 78% of clean air?`, opts: ["oxygen", "argon", "nitrogen", "carbon dioxide"], ans: 2, why: C`Nitrogen.` },
    { type: "mcq", marks: 1, q: C`Carbon monoxide is formed by`, opts: ["complete combustion", "incomplete combustion", "photosynthesis", "respiration"], ans: 1, why: C`Limited oxygen.` },
    { type: "mcq", marks: 1, q: C`Which pollutant is mainly produced by cattle?`, opts: ["SO₂", "NO₂", "CH₄", "CO"], ans: 2, why: C`Methane from digestion.` },
    { type: "mcq", marks: 1, q: C`Which element is NOT supplied by NPK fertilisers?`, opts: ["nitrogen", "phosphorus", "potassium", "sodium"], ans: 3, why: C`N, P, K.` },
    { type: "mcq", marks: 1, q: C`Flue-gas desulfurisation uses`, opts: ["calcium oxide", "platinum", "chlorine", "carbon"], ans: 0, why: C`A base to remove acidic SO₂.` },
    { type: "struct", marks: 2, q: C`Describe a chemical test for water and a test to show it is pure.`,
      ms: C`<b>B1</b> anhydrous copper(II) sulfate turns white to blue / cobalt(II) chloride blue to pink<br><b>B1</b> boils at 100 °C (or melts at 0 °C)` },
    { type: "struct", marks: 3, q: C`Name the source and one harmful effect of (a) sulfur dioxide, (b) particulates.`,
      ms: C`<b>B1</b> SO₂: burning fossil fuels containing sulfur<br><b>B1</b> acid rain<br><b>B1</b> particulates: incomplete combustion; respiratory problems / cancer` },
    { type: "struct", marks: 4, q: C`S: Explain how increasing levels of carbon dioxide cause global warming.`,
      ms: C`<b>B1</b> Earth's surface absorbs radiation from the Sun and emits infrared<br><b>B1</b> CO₂ absorbs infrared radiation<br><b>B1</b> re-emits it in all directions / back to Earth<br><b>B1</b> less thermal energy escapes to space, so temperature rises` },
    { type: "struct", marks: 3, q: C`S: Write equations for two reactions in a catalytic converter.`,
      ms: C`<b>B1</b> 2CO + O₂ → 2CO₂<br><b>B1</b> 2NO + 2CO → N₂ + 2CO₂<br><b>B1</b> correctly balanced` },
    { type: "struct", marks: 4, q: C`S: Explain how fertiliser run-off can cause fish in a lake to die.`,
      ms: C`<b>B1</b> nitrates/phosphates cause rapid growth of algae<br><b>B1</b> blocks light; plants underneath die<br><b>B1</b> bacteria decompose dead plants, using up dissolved oxygen<br><b>B1</b> fish cannot respire / suffocate` },
    { type: "struct", marks: 2, q: C`Give the word equation for photosynthesis and state the two conditions needed.`,
      ms: C`<b>B1</b> carbon dioxide + water → glucose + oxygen<br><b>B1</b> light and chlorophyll` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: C`State the percentages of nitrogen and oxygen in clean, dry air.`, ms: C`<b>B1</b> nitrogen 78%<br><b>B1</b> oxygen 21%` },
    { d: 1, type: "mcq", marks: 1, q: C`Which substance is used in water treatment to remove tastes and odours?`, opts: ["chlorine", "carbon", "sand", "aluminium sulfate"], ans: 1, why: C`Activated carbon.` },
    { d: 1, type: "struct", marks: 1, q: C`State the colour change when water is added to anhydrous cobalt(II) chloride.`, ms: C`<b>B1</b> blue to pink` },
    { d: 1, type: "struct", marks: 2, q: C`Name two greenhouse gases.`, ms: C`<b>B1</b> carbon dioxide<br><b>B1</b> methane (or water vapour)` },
    { d: 1, type: "mcq", marks: 1, q: C`Which pollutant causes acid rain?`, opts: ["carbon monoxide", "methane", "sulfur dioxide", "particulates"], ans: 2, why: C`SO₂.` },
    { d: 2, type: "struct", marks: 3, q: C`Explain why filtration alone does not make river water safe to drink.`, ms: C`<b>B1</b> filtration only removes insoluble particles<br><b>B1</b> microbes/bacteria may pass through / remain<br><b>B1</b> chlorination is needed to kill microbes` },
    { d: 2, type: "struct", marks: 3, q: C`Describe three ways in which the effects of climate change can be reduced.`, ms: C`<b>B1</b> planting trees (absorb CO₂)<br><b>B1</b> reduce livestock farming (less methane)<br><b>B1</b> fewer fossil fuels / more renewable or hydrogen energy` },
    { d: 2, type: "struct", marks: 3, q: C`Calculate the percentage by mass of nitrogen in ammonium nitrate, NH₄NO₃. (Ar: N 14, H 1, O 16)`, ms: C`<b>C1</b> Mr = 80<br><b>C1</b> mass of N = 28<br><b>A1</b> 35%` },
    { d: 2, type: "struct", marks: 2, q: C`S: Explain why nitrogen and oxygen do not react in the air but do react in a car engine.`, ms: C`<b>B1</b> nitrogen is very unreactive / needs a lot of energy<br><b>B1</b> high temperature in the engine provides the energy` },
    { d: 2, type: "mcq", marks: 1, q: C`Which statement about catalytic converters is correct?`, opts: ["they remove CO₂", "they reduce NO to N₂", "they work best when cold", "they remove SO₂"], ans: 1, why: C`NO is reduced to N₂.` },
    { d: 3, type: "struct", marks: 4, q: C`S: Explain, in terms of absorption and emission of thermal energy, how methane released from cattle contributes to climate change, and suggest two consequences of climate change.`, ms: C`<b>B1</b> methane absorbs infrared emitted from the Earth's surface<br><b>B1</b> re-emits it, some back to Earth: less heat escapes<br><b>B1</b> average global temperature increases<br><b>B1</b> two consequences: rising sea levels / melting ice / extreme weather / crop failure` },
    { d: 3, type: "struct", marks: 5, q: C`A power station burns coal containing sulfur. Describe the environmental problem this causes, how it can be reduced, and write an equation for the removal process.`, ms: C`<b>B1</b> sulfur burns to form sulfur dioxide<br><b>B1</b> SO₂ dissolves in rain to form acid rain<br><b>B1</b> damages buildings / trees / aquatic life (any)<br><b>B1</b> flue-gas desulfurisation with calcium oxide (or low-sulfur coal)<br><b>B1</b> CaO + SO₂ → CaSO₃` },
    { d: 3, type: "struct", marks: 4, q: C`S: Octane, C₈H₁₈, burns in a limited supply of air in an engine. (a) Write an equation for incomplete combustion forming carbon monoxide. (b) Explain why carbon monoxide is dangerous. (c) Write an equation for its removal in a catalytic converter.`, ms: C`<b>B1</b> 2C₈H₁₈ + 17O₂ → 16CO + 18H₂O<br><b>B1</b> toxic / reduces oxygen-carrying capacity of blood<br><b>B1</b> colourless and odourless so not detected<br><b>B1</b> 2CO + O₂ → 2CO₂ (or 2CO + 2NO → 2CO₂ + N₂)` }
  ]
});
}
