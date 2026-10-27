window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
const styled = (svg, style) => svg.replace(/class="([^"]*)"/, `class="$1" style="${style}"`);
const flask = (x, y, w, h) => F.path(`M${x + w * .4},${y} L${x + w * .4},${y + h * .35} L${x},${y + h} L${x + w},${y + h} L${x + w * .6},${y + h * .35} L${x + w * .6},${y}`, "k");
const rbf = (cx, cy, r) => F.path(`M${cx - 7},${cy - r - 28} L${cx - 7},${cy - r + 2} A${r},${r} 0 1 0 ${cx + 7},${cy - r + 2} L${cx + 7},${cy - r - 28}`, "k");
const flameAt = (x, y) => F.path(`M${x},${y} Q${x - 9},${y - 14} ${x},${y - 30} Q${x + 9},${y - 14} ${x},${y} Z`, "o oS") + F.rect(x - 8, y, 16, 22, "m mS");

/* ============================================================
   EXPERIMENTAL TECHNIQUES AND CHEMICAL ANALYSIS  (0620: 12.1 – 12.5)
   ============================================================ */
TOPICS.push({
  id: "analysis", subject: "chemistry", unit: 12, title: "Experimental techniques & analysis",
  blurb: "Apparatus and key terms, titration, paper chromatography and Rf values, separation and purification methods, purity, and every test for cations, anions, gases and flame colours.",
  level: "Core → Supplement", demo: "iontest",
  syllabus: [
    ["12.1", "Name appropriate apparatus for the measurement of time, temperature, mass and volume", 0],
    ["12.1", "Suggest advantages and disadvantages of experimental methods and apparatus", 0],
    ["12.1", "Describe the terms solvent, solute, solution, saturated solution, residue and filtrate", 1],
    ["12.2", "Describe an acid–base titration including the use of a burette, volumetric pipette and suitable indicator", 2],
    ["12.2", "Identify the end-point of a titration using an indicator", 2],
    ["12.3", "Describe paper chromatography and interpret simple chromatograms, including identifying pure and impure substances", 3],
    ["12.3 S", "Describe the use of locating agents; state and use the equation for Rf", 4],
    ["12.4", "Describe and explain methods of separation and purification: filtration, crystallisation, simple distillation, fractional distillation, using a suitable solvent", 5],
    ["12.4", "Suggest suitable separation and purification techniques given information about the substances involved", 6],
    ["12.4", "Identify substances and assess their purity using melting point and boiling point information", 7],
    ["12.5", "Describe tests for anions: carbonate, chloride, bromide, iodide, nitrate, sulfate, sulfite", 8],
    ["12.5", "Describe tests for cations using aqueous NaOH and aqueous NH₃: Al³⁺, NH₄⁺, Ca²⁺, Cr³⁺, Cu²⁺, Fe²⁺, Fe³⁺, Zn²⁺", 9],
    ["12.5", "Describe tests for gases: ammonia, carbon dioxide, chlorine, hydrogen, oxygen, sulfur dioxide", 10],
    ["12.5", "Describe the use of a flame test to identify Li⁺, Na⁺, K⁺, Ca²⁺, Ba²⁺, Cu²⁺", 11]
  ],
  sections: [
    { h: "Apparatus for measurement (12.1)", body: C`
<table class="t"><tr><th>Quantity</th><th>Apparatus</th><th>Typical precision</th></tr>
<tr><td>Time</td><td>Stopwatch / stop-clock</td><td>0.01 s (but reaction time ≈ 0.2 s)</td></tr>
<tr><td>Temperature</td><td>Thermometer</td><td>0.5 °C or 1 °C</td></tr>
<tr><td>Mass</td><td>(Electronic) balance</td><td>0.01 g</td></tr>
<tr><td rowspan="5">Volume</td><td><b>Burette</b>: variable volumes of liquid</td><td>0.05 cm³</td></tr>
<tr><td><b>Volumetric pipette</b>: one fixed volume of liquid accurately</td><td>e.g. 25.0 cm³</td></tr>
<tr><td><b>Measuring cylinder</b>: approximate volumes</td><td>0.5–1 cm³</td></tr>
<tr><td><b>Gas syringe</b>: volume of gas</td><td>1 cm³</td></tr>
<tr><td>Beaker / conical flask</td><td>rough only</td></tr></table>
${(() => { let s = "";
  s += F.rect(40, 20, 16, 150, "k") + styled(F.rect(41, 60, 14, 109, "nostroke"), "fill:rgba(80,140,230,.25)"); for (let i = 0; i < 12; i++) s += F.line(56, 30 + i * 12, 62, 30 + i * 12, "k thin"); s += F.path("M44,170 L52,170 L50,190 L46,190 Z", "k") + F.rect(38, 176, 20, 5, "k kF") + F.text(48, 215, "burette", "tk small bold");
  s += F.line(150, 15, 150, 70, "k") + F.path("M150,70 Q130,95 150,125 Q170,95 150,70", "k") + F.line(150, 125, 150, 190, "k") + F.line(142, 45, 158, 45, "r") + F.text(165, 49, "mark", "tr small", "start") + F.text(150, 215, "volumetric pipette", "tk small bold");
  s += F.path("M250,40 L250,190 L290,190 L290,40", "k") + F.line(240, 190, 300, 190, "k") + styled(F.rect(251, 110, 38, 79, "nostroke"), "fill:rgba(80,140,230,.25)"); for (let i = 0; i < 8; i++) s += F.line(250, 60 + i * 16, 258, 60 + i * 16, "k thin"); s += F.text(270, 215, "measuring cylinder", "tk small bold");
  s += F.rect(350, 90, 110, 30, "k") + F.rect(460, 100, 40, 10, "k") + F.line(410, 90, 410, 120, "k") + F.line(338, 105, 350, 105, "k"); for (let i = 0; i < 6; i++) s += F.line(360 + i * 18, 90, 360 + i * 18, 84, "k thin"); s += F.text(420, 150, "gas syringe", "tk small bold");
  return F.fig(520, 225, s, "Volume-measuring apparatus. Read the bottom of the meniscus at eye level.", { size: "wide" }); })()}
<p><b>Choosing apparatus:</b> a burette or pipette is more <b>precise</b> than a measuring cylinder; a gas syringe is more precise than collecting gas over water (and works for gases soluble in water), but has a limited volume (≈ 100 cm³).</p>`},

    { h: "Key terms (12.1)", body: C`
<table class="t"><tr><th>Term</th><th>Meaning</th></tr>
<tr><td><b>Solvent</b></td><td>The substance that dissolves a solute (e.g. water)</td></tr>
<tr><td><b>Solute</b></td><td>The substance that is dissolved in a solvent</td></tr>
<tr><td><b>Solution</b></td><td>A mixture of one or more solutes dissolved in a solvent</td></tr>
<tr><td><b>Saturated solution</b></td><td>A solution containing the maximum concentration of solute dissolved in the solvent at a specified temperature</td></tr>
<tr><td><b>Residue</b></td><td>The substance that remains after evaporation, distillation, filtration or any similar process (e.g. the solid left in the filter paper)</td></tr>
<tr><td><b>Filtrate</b></td><td>The liquid or solution that has passed through a filter</td></tr></table>
<details class="check"><summary>Sand and salt are mixed with water and filtered. Name the residue and the filtrate.</summary><div>Residue: sand. Filtrate: salt solution.</div></details>`},

    { h: "Acid–base titration (12.2)", body: C`
<p class="lead">A <b>titration</b> finds the exact volume of one solution needed to react with a known volume of another. Practise with the titration lab on the <i>Acids, bases & salts</i> page.</p>
<ol class="steps"><li>Rinse the <b>volumetric pipette</b> with the alkali, then use it (with a pipette filler) to transfer exactly 25.0 cm³ of alkali into a <b>conical flask</b>.</li>
<li>Add a few drops of a suitable <b>indicator</b>: <b>methyl orange</b> or <b>thymolphthalein</b>. (Universal indicator and litmus are not used: their colour change is gradual / unclear.)</li>
<li>Rinse the <b>burette</b> with the acid, fill it, and record the initial reading (to 0.05 cm³).</li>
<li>Add acid from the burette, swirling the flask, until the indicator <b>just</b> changes colour: the <b>end-point</b>. Add the acid dropwise near the end-point. Record the final reading.</li>
<li>Repeat until you have <b>concordant</b> titres (within 0.10 cm³) and take their mean.</li></ol>
<table class="t"><tr><th>Indicator</th><th>In acid</th><th>In alkali</th></tr><tr><td>Methyl orange</td><td>red</td><td>yellow</td></tr><tr><td>Thymolphthalein</td><td>colourless</td><td>blue</td></tr></table>
<table class="t"><tr><th>Burette reading / cm³</th><th>Rough</th><th>1</th><th>2</th><th>3</th></tr>
<tr><td>Final</td><td>25.50</td><td>24.85</td><td>49.60</td><td>24.90</td></tr>
<tr><td>Initial</td><td>0.00</td><td>0.10</td><td>24.85</td><td>0.20</td></tr>
<tr><td>Titre</td><td>25.50</td><td><b>24.75</b></td><td><b>24.75</b></td><td><b>24.70</b></td></tr></table>
<p>Mean titre (concordant results 1–3) = (24.75 + 24.75 + 24.70) ÷ 3 = <b>24.73 cm³</b>. The rough titre is ignored.</p>`},

    { h: "Paper chromatography (12.3)", body: C`
<p class="lead">Chromatography separates and identifies the components of a mixture of <b>soluble</b> substances, such as dyes in inks.</p>
<div class="viz" data-viz="chromatography"></div>
<ol class="steps"><li>Draw a <b>baseline</b> in <b>pencil</b> (it does not dissolve or run) about 2 cm from the bottom of the paper.</li>
<li>Put small, concentrated spots of the samples (and known reference substances) on the baseline.</li>
<li>Stand the paper in a beaker of <b>solvent</b> with the solvent level <b>below the baseline</b> (so the spots do not dissolve into the solvent). Cover with a lid to stop evaporation.</li>
<li>The solvent rises up the paper, carrying the substances different distances. Remove the paper before the solvent reaches the top; mark the <b>solvent front</b>; dry.</li></ol>
<p><b>Interpreting:</b></p>
<ul><li>A <b>pure</b> substance gives <b>one spot</b>; an <b>impure</b> substance (mixture) gives <b>two or more</b>.</li>
<li>Two spots at the <b>same height</b> (same Rf, same solvent) are the same substance.</li>
<li>A spot left on the baseline is <b>insoluble</b> in that solvent.</li></ul>`},

    { h: "Rf values and locating agents (12.3 S)", body: C`
<p class="eq">$$R_f = \frac{\text{distance moved by the substance}}{\text{distance moved by the solvent front}}$$</p>
${(() => { let s = F.rect(40, 10, 120, 210, "m") + F.line(40, 190, 160, 190, "k d") + F.line(40, 30, 160, 30, "b") + F.text(165, 34, "solvent front", "tb small", "start") + F.text(165, 194, "baseline", "tk small", "start");
  s += F.circ(100, 100, 8, "r rS r") + F.circ(100, 190, 3, "k kF");
  s += F.dim(185, 190, 185, 100, "", "r", 0) + F.text(195, 150, "5.4 cm", "tr small bold", "start") + F.dim(260, 190, 260, 30, "", "b", 0) + F.text(252, 110, "9.0 cm", "tb small bold", "end");
  s += F.text(285, 60, "Rf = 5.4 ÷ 9.0", "tk", "start") + F.text(285, 86, "= 0.60", "tc bold", "start") + F.text(285, 120, "always between 0 and 1;", "tm small", "start") + F.text(285, 138, "no units", "tm small", "start");
  return F.fig(470, 230, s, "Measure both distances from the baseline (to the centre of the spot).", { size: "small" }); })()}
<ul><li>Rf values are <b>constant</b> for a given substance, solvent and paper, so they can be compared with values in a data book to <b>identify</b> substances.</li>
<li><b>Locating agents</b> are sprayed onto a dried chromatogram to make <b>colourless</b> substances visible (e.g. ninhydrin shows amino acids as purple spots). Alternatively, use UV light.</li></ul>
<details class="check"><summary>A spot moves 3.2 cm when the solvent front moves 8.0 cm. Calculate Rf.</summary><div>Rf = 3.2 ÷ 8.0 = 0.40.</div></details>`},

    { h: "Separation and purification methods (12.4)", body: C`
<table class="t"><tr><th>Method</th><th>Separates</th><th>Example</th></tr>
<tr><td><b>Filtration</b></td><td>An insoluble solid from a liquid</td><td>Sand from water; excess CuO from CuSO₄ solution</td></tr>
<tr><td><b>Evaporation</b></td><td>A dissolved solid from its solvent (all solvent removed)</td><td>Salt from sea water</td></tr>
<tr><td><b>Crystallisation</b></td><td>A soluble solid, as pure crystals, from a solution</td><td>Copper(II) sulfate crystals; heat to saturation, cool, filter</td></tr>
<tr><td><b>Simple distillation</b></td><td>A solvent from a solution (liquid collected)</td><td>Pure water from sea water</td></tr>
<tr><td><b>Fractional distillation</b></td><td>Miscible liquids with different boiling points</td><td>Ethanol from water; crude oil; liquid air</td></tr>
<tr><td><b>Using a suitable solvent</b></td><td>Two solids, one soluble in the solvent</td><td>Salt from sand (water); sulfur dissolved in methylbenzene</td></tr>
<tr><td><b>Chromatography</b></td><td>Soluble substances with different solubilities</td><td>Dyes in ink; amino acids</td></tr></table>
${(() => { let s = rbf(70, 150, 38) + F.text(70, 156, "salt water", "tb small") + flameAt(70, 210) + F.rect(63, 60, 14, 22, "k kS") + F.line(70, 52, 70, 64, "k");
  s += F.line(77, 80, 110, 80, "k") + F.path("M110,72 L290,140 L284,156 L104,88 Z", "k") + F.path("M118,78 L284,141", "b") + F.text(210, 92, "Liebig condenser", "tk small bold") + F.arrow(260, 170, 260, 146, "b", 6) + F.text(254, 184, "cold water in", "tb small", "end") + F.arrow(140, 70, 140, 50, "b", 6) + F.text(146, 46, "water out", "tb small", "start");
  s += F.line(287, 150, 300, 172, "k") + F.path("M290,175 L290,225 L340,225 L340,175", "k") + styled(F.rect(291, 205, 48, 19, "nostroke"), "fill:rgba(80,140,230,.25)") + F.text(315, 245, "pure water (distillate)", "tk small");
  s += F.text(8, 30, "thermometer at side-arm", "tr small", "start") + F.line(60, 34, 68, 56, "r thin");
  return F.fig(460, 255, s, "Simple distillation: water boils, its vapour condenses in the condenser; the salt stays in the flask.", { size: "small" }); })()}
<p><b>Fractional distillation</b> adds a <b>fractionating column</b> (packed with glass beads) between the flask and the condenser. The liquid with the <b>lower boiling point</b> distils first; the thermometer reading stays constant while each pure fraction distils, then rises.</p>
<div class="callout"><b>Evaporation vs crystallisation:</b> evaporating to dryness can decompose some salts or drive off water of crystallisation. To get good crystals, heat only until the solution is <b>saturated</b> (crystals form on a cold glass rod), then leave it to cool.</div>`},

    { h: "Choosing a method (12.4)", body: C`
<p>Ask three questions:</p>
<ol class="steps"><li><b>What state is each substance in, and does it dissolve?</b> Insoluble solid + liquid → filtration. Two solids → add a solvent that dissolves only one, then filter.</li>
<li><b>Which part do I want?</b> The dissolved solid → crystallisation (or evaporation). The liquid → distillation.</li>
<li><b>Two liquids?</b> If they mix (miscible) and boiling points differ → fractional distillation.</li></ol>
<details class="check"><summary>How would you obtain pure, dry sand and pure salt crystals from a mixture of the two?</summary><div>Add water and stir (salt dissolves). Filter: sand is the residue; wash with distilled water and dry. Heat the filtrate until saturated, leave to crystallise, filter and dry the salt crystals.</div></details>
<details class="check"><summary>Suggest how to separate a mixture of ethanol (bp 78 °C) and water.</summary><div>Fractional distillation: ethanol has the lower boiling point and distils first at about 78 °C.</div></details>`},

    { h: "Assessing purity (12.4)", body: C`
<p>A <b>pure</b> substance has a <b>sharp</b> (fixed) melting point and boiling point. Impurities:</p>
<ul><li><b>lower</b> the melting point and make it melt over a <b>range</b> of temperatures;</li><li><b>raise</b> the boiling point (and it boils over a range).</li></ul>
${F.plot({ w: 470, h: 230, x: [0, 10], y: [0, 100], grid: false, ticks: { x: [], y: [60, 80] }, xlabel: "time", ylabel: "temperature / °C", curves: [{ pts: [[0, 30], [3, 80], [6, 80], [9, 95]], c: "c thick", label: "pure: sharp mp 80 °C", lpos: [0.3, 92], ldx: 0, la: "start" }, { pts: [[0, 30], [3, 72], [6, 79], [9, 92]], c: "r thick", label: "impure: lower, over a range", lpos: [5.5, 74], ldy: 22, la: "middle" }], cap: "Melting a pure and an impure sample of the same solid.", size: "small" })}
<p>Purity matters especially for <b>food, drinks and medicines</b>, where impurities could be harmful. Compare a measured melting point with the data-book value: if it matches exactly and is sharp, the substance is pure.</p>`},

    { h: "Tests for anions (12.5)", body: C`
<table class="t"><tr><th>Anion</th><th>Test</th><th>Positive result</th></tr>
<tr><td>Carbonate CO₃²⁻</td><td>Add dilute acid; bubble gas through limewater</td><td>Effervescence; CO₂ turns <b>limewater milky</b></td></tr>
<tr><td>Chloride Cl⁻</td><td rowspan="3">Acidify with <b>dilute nitric acid</b>, then add <b>aqueous silver nitrate</b></td><td><b>White</b> precipitate (AgCl)</td></tr>
<tr><td>Bromide Br⁻</td><td><b>Cream</b> precipitate (AgBr)</td></tr>
<tr><td>Iodide I⁻</td><td><b>Yellow</b> precipitate (AgI)</td></tr>
<tr><td>Nitrate NO₃⁻</td><td>Add aqueous sodium hydroxide, then <b>aluminium foil</b>; warm carefully</td><td><b>Ammonia</b> produced: turns damp red litmus <b>blue</b></td></tr>
<tr><td>Sulfate SO₄²⁻</td><td>Acidify with dilute nitric acid, then add <b>aqueous barium nitrate</b></td><td><b>White</b> precipitate (BaSO₄)</td></tr>
<tr><td>Sulfite SO₃²⁻</td><td>Add <b>acidified aqueous potassium manganate(VII)</b></td><td>Turns from <b>purple to colourless</b></td></tr></table>
${(() => { let s = ""; [["#f4f4f4", "AgCl", "white"], ["#efe4b8", "AgBr", "cream"], ["#f2dc4a", "AgI", "yellow"], ["#f4f4f4", "BaSO₄", "white"]].forEach(([c, f, n], i) => { const x = 30 + i * 120; s += F.path(`M${x},20 L${x},110 Q${x},126 ${x + 16},126 Q${x + 32},126 ${x + 32},110 L${x + 32},20`, "k") + styled(F.path(`M${x + 1},60 L${x + 1},110 Q${x + 1},125 ${x + 16},125 Q${x + 31},125 ${x + 31},110 L${x + 31},60 Z`, "nostroke"), "fill:rgba(160,190,230,.25)"); for (let j = 0; j < 14; j++) s += styled(F.circ(x + 6 + (j * 7) % 21, 112 - Math.floor(j / 4) * 6, 3.4, "m thin"), `fill:${c}`); s += F.text(x + 16, 148, f, "tk small bold") + F.text(x + 16, 164, n, "tm small"); });
  return F.fig(500, 175, s, "Silver halide and barium sulfate precipitates.", { size: "wide" }); })()}
<div class="callout"><b>Why acidify first?</b> Nitric acid removes carbonate ions, which would otherwise also give a precipitate with silver or barium ions (a false positive). Use <b>nitric</b> acid, not hydrochloric (adds Cl⁻) or sulfuric (adds SO₄²⁻).</div>`},

    { h: "Tests for cations (12.5)", body: C`
<p>Add aqueous sodium hydroxide, then aqueous ammonia, first a few drops and then in excess. Most metal hydroxides are insoluble, so a coloured <b>precipitate</b> forms.</p>
<table class="t"><tr><th>Cation</th><th>Aqueous sodium hydroxide</th><th>Aqueous ammonia</th></tr>
<tr><td>Aluminium Al³⁺</td><td>White ppt, <b>soluble in excess</b> → colourless solution</td><td>White ppt, insoluble in excess</td></tr>
<tr><td>Ammonium NH₄⁺</td><td>Ammonia produced on warming (damp red litmus → blue)</td><td>—</td></tr>
<tr><td>Calcium Ca²⁺</td><td>White ppt, insoluble in excess</td><td>No ppt or very slight white ppt</td></tr>
<tr><td>Chromium(III) Cr³⁺</td><td>Green ppt, soluble in excess</td><td>Grey-green ppt, insoluble in excess</td></tr>
<tr><td>Copper(II) Cu²⁺</td><td><b>Light blue</b> ppt, insoluble in excess</td><td>Light blue ppt, <b>soluble in excess</b> → <b>dark blue</b> solution</td></tr>
<tr><td>Iron(II) Fe²⁺</td><td><b>Green</b> ppt, insoluble in excess</td><td>Green ppt, insoluble in excess</td></tr>
<tr><td>Iron(III) Fe³⁺</td><td><b>Red-brown</b> ppt, insoluble in excess</td><td>Red-brown ppt, insoluble in excess</td></tr>
<tr><td>Zinc Zn²⁺</td><td>White ppt, soluble in excess → colourless solution</td><td>White ppt, soluble in excess → colourless solution</td></tr></table>
${(() => { let s = ""; [["#79b4e8", "Cu(OH)₂", "light blue"], ["#4e7a3a", "Fe(OH)₂", "green"], ["#9a4a1e", "Fe(OH)₃", "red-brown"], ["#4f8a3a", "Cr(OH)₃", "green"], ["#f4f4f4", "Zn/Al/Ca", "white"]].forEach(([c, f, n], i) => { const x = 20 + i * 100; s += F.path(`M${x},20 L${x},110 Q${x},126 ${x + 16},126 Q${x + 32},126 ${x + 32},110 L${x + 32},20`, "k"); for (let j = 0; j < 16; j++) s += styled(F.circ(x + 6 + (j * 7) % 21, 114 - Math.floor(j / 4) * 7, 3.6, "m thin"), `fill:${c}`); s += F.text(x + 16, 148, f, "tk small bold") + F.text(x + 16, 164, n, "tm small"); });
  return F.fig(500, 175, s, "Hydroxide precipitates.", { size: "wide" }); })()}
<div class="callout"><b>Telling the white ones apart:</b> Ca²⁺ — NaOH ppt stays in excess, little or no ppt with NH₃. Al³⁺ — dissolves in excess NaOH but <i>not</i> in excess NH₃. Zn²⁺ — dissolves in excess of <i>both</i>.</div>
<p>Ionic equation example: $\text{Cu}^{2+}\text{(aq)} + 2\text{OH}^-\text{(aq)} \rightarrow \text{Cu(OH)}_2\text{(s)}$. Try every test on 12 unknown solutions in the <b>analysis lab</b> at the bottom of the page.</p>`},

    { h: "Tests for gases (12.5)", body: C`
<table class="t"><tr><th>Gas</th><th>Test</th><th>Positive result</th></tr>
<tr><td>Ammonia NH₃</td><td>Damp red litmus paper</td><td>Turns <b>blue</b></td></tr>
<tr><td>Carbon dioxide CO₂</td><td>Bubble through limewater</td><td>Limewater turns <b>milky</b> (cloudy)</td></tr>
<tr><td>Chlorine Cl₂</td><td>Damp litmus paper</td><td><b>Bleaches</b> it (turns white)</td></tr>
<tr><td>Hydrogen H₂</td><td>Lighted splint</td><td><b>Squeaky pop</b></td></tr>
<tr><td>Oxygen O₂</td><td>Glowing splint</td><td><b>Relights</b></td></tr>
<tr><td>Sulfur dioxide SO₂</td><td>Acidified aqueous potassium manganate(VII)</td><td>Purple to <b>colourless</b></td></tr></table>
<div class="callout"><b>Common slips:</b> "lit splint relights" (wrong: it's a <i>glowing</i> splint for oxygen); "limewater goes cloudy" is fine but "goes white" is not; for chlorine the litmus must be <i>damp</i>.</div>`},

    { h: "Flame tests (12.5)", body: C`
<p>Dip a clean <b>nichrome wire loop</b> (cleaned with concentrated hydrochloric acid) into the solid or solution, and hold it in a <b>blue (roaring) Bunsen flame</b>.</p>
${(() => { let s = ""; [["Li⁺", "red", "#e0303a"], ["Na⁺", "yellow", "#f4c020"], ["K⁺", "lilac", "#b07ae0"], ["Ca²⁺", "orange-red", "#f06a2a"], ["Ba²⁺", "light green", "#8fd06a"], ["Cu²⁺", "blue-green", "#2ab0a0"]].forEach(([ion, n, c], i) => { const x = 45 + i * 85; s += styled(F.path(`M${x},120 Q${x - 26},80 ${x - 4},30 Q${x + 2},60 ${x + 10},40 Q${x + 28},85 ${x},120 Z`, "nostroke"), `fill:${c};opacity:.8`) + F.rect(x - 9, 120, 18, 30, "m mS") + F.text(x, 172, ion, "tk bold") + F.text(x, 190, n, "tm small"); });
  return F.fig(520, 200, s, "Flame test colours.", { size: "wide" }); })()}
<p>Flame tests identify metal ions that give <b>no precipitate</b> with sodium hydroxide (Li⁺, Na⁺, K⁺), and confirm others. Sodium's yellow can mask other colours, so the wire must be clean.</p>`}
  ],
  worked: [
    { q: C`A solution gives a light blue precipitate with aqueous sodium hydroxide, and a white precipitate when acidified with dilute nitric acid and aqueous barium nitrate is added. Identify it.`,
      steps: [C`Light blue ppt with NaOH: Cu²⁺.`, C`White ppt with barium nitrate (acidified): SO₄²⁻.`, C`Copper(II) sulfate, CuSO₄. Confirm Cu²⁺ by a blue-green flame, or by adding excess aqueous ammonia (dark blue solution).`]},
    { q: C`S: On a chromatogram, the solvent front is 12.0 cm from the baseline. Spot P has Rf 0.45 and spot Q moved 8.4 cm. Find the distance P moved and the Rf of Q.`,
      steps: [C`P: distance = Rf × front = 0.45 × 12.0 = 5.4 cm.`, C`Q: Rf = 8.4 ÷ 12.0 = 0.70.`]},
    { q: C`Describe how to obtain pure water from ink.`,
      steps: [C`Simple distillation: heat the ink in a flask; water boils at 100 °C.`, C`The vapour passes into a Liebig condenser cooled by cold water, where it condenses.`, C`Collect pure water (distillate); the dyes remain in the flask.`]}
  ],
  formulas: [["Rf (S)", C`$R_f = \dfrac{\text{distance moved by substance}}{\text{distance moved by solvent front}}$`], ["Halide test", "HNO₃ then AgNO₃: Cl⁻ white, Br⁻ cream, I⁻ yellow"], ["Sulfate test", "HNO₃ then Ba(NO₃)₂: white ppt"], ["Nitrate test", "NaOH + Al foil, warm: NH₃"], ["Concordant titres", "within 0.10 cm³"]],
  cards: [
    ["Apparatus to measure an exact 25.0 cm³ of solution", "Volumetric pipette."],
    ["Apparatus to add variable volumes accurately", "Burette."],
    ["Apparatus to measure volume of gas", "Gas syringe."],
    ["Saturated solution", "Maximum concentration of solute dissolved at a given temperature."],
    ["Residue", "Substance remaining after filtration/evaporation/distillation."],
    ["Filtrate", "Liquid that has passed through a filter."],
    ["Suitable titration indicators", "Methyl orange, thymolphthalein."],
    ["Thymolphthalein in alkali", "Blue (colourless in acid)."],
    ["Why draw the chromatography baseline in pencil?", "Pencil does not dissolve in the solvent."],
    ["Why keep solvent below the baseline?", "So samples don't dissolve into the solvent."],
    ["Pure substance on a chromatogram", "Gives one spot."],
    ["Rf formula (S)", "Distance moved by substance ÷ distance moved by solvent front."],
    ["Locating agent (S)", "Sprayed to make colourless spots visible."],
    ["Separate two miscible liquids", "Fractional distillation."],
    ["Obtain solvent from a solution", "Simple distillation."],
    ["Effect of impurity on melting point", "Lowers it and melts over a range."],
    ["Test for carbonate", "Dilute acid: fizzes, CO₂ turns limewater milky."],
    ["Test for chloride", "HNO₃ then AgNO₃: white ppt."],
    ["Test for iodide", "HNO₃ then AgNO₃: yellow ppt."],
    ["Test for sulfate", "HNO₃ then Ba(NO₃)₂: white ppt."],
    ["Test for nitrate", "NaOH + aluminium, warm: ammonia (red litmus → blue)."],
    ["Test for sulfite", "Acidified KMnO₄: purple → colourless."],
    ["Cu²⁺ with NaOH", "Light blue ppt, insoluble in excess."],
    ["Fe²⁺ with NaOH", "Green ppt, insoluble in excess."],
    ["Fe³⁺ with NaOH", "Red-brown ppt, insoluble in excess."],
    ["Zn²⁺ vs Al³⁺", "Both dissolve in excess NaOH; only Zn(OH)₂ dissolves in excess NH₃."],
    ["Cu²⁺ with excess NH₃", "Dark blue solution."],
    ["Test for oxygen", "Relights a glowing splint."],
    ["Test for chlorine", "Bleaches damp litmus."],
    ["Test for SO₂", "Acidified KMnO₄ purple → colourless."],
    ["Flame colours: Li, Na, K", "Red, yellow, lilac."],
    ["Flame colours: Ca, Ba, Cu", "Orange-red, light green, blue-green."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`Which apparatus measures 25.0 cm³ of liquid most accurately?`, opts: ["beaker", "measuring cylinder", "volumetric pipette", "conical flask"], ans: 2, why: C`Pipette.` },
    { type: "mcq", marks: 1, q: C`A substance melts between 75 °C and 79 °C. The pure substance melts at 80 °C. The sample is`, opts: ["pure", "impure", "a solvent", "a gas"], ans: 1, why: C`Lower and over a range.` },
    { type: "mcq", marks: 1, q: C`Which method separates ethanol from water?`, opts: ["filtration", "crystallisation", "fractional distillation", "chromatography"], ans: 2, why: C`Miscible liquids, different bp.` },
    { type: "mcq", marks: 1, q: C`A solution gives a cream precipitate with acidified silver nitrate. It contains`, opts: ["chloride", "bromide", "iodide", "sulfate"], ans: 1, why: C`AgBr is cream.` },
    { type: "mcq", marks: 1, q: C`Which ion gives a white precipitate with NaOH that dissolves in excess, and a white precipitate with NH₃ that does NOT dissolve in excess?`, opts: ["Zn²⁺", "Al³⁺", "Ca²⁺", "Cu²⁺"], ans: 1, why: C`Aluminium.` },
    { type: "mcq", marks: 1, q: C`A lilac flame shows`, opts: ["sodium", "lithium", "potassium", "calcium"], ans: 2, why: C`K⁺.` },
    { type: "mcq", marks: 1, q: C`Which gas relights a glowing splint?`, opts: ["hydrogen", "oxygen", "carbon dioxide", "chlorine"], ans: 1, why: C`O₂.` },
    { type: "struct", marks: 3, q: C`Describe how to carry out paper chromatography on a sample of ink.`,
      ms: C`<b>B1</b> pencil baseline; spot of ink on it<br><b>B1</b> stand paper in solvent with solvent below the baseline<br><b>B1</b> allow solvent to rise; remove before reaching the top; mark solvent front` },
    { type: "struct", marks: 2, q: C`S: A spot moved 4.5 cm; the solvent front moved 7.5 cm. Calculate Rf.`,
      ms: C`<b>C1</b> 4.5 ÷ 7.5<br><b>A1</b> 0.60` },
    { type: "struct", marks: 3, q: C`Describe a test for sulfate ions and explain why the solution is acidified first.`,
      ms: C`<b>B1</b> add dilute nitric acid then aqueous barium nitrate<br><b>B1</b> white precipitate<br><b>B1</b> acid removes carbonate ions which would also give a white precipitate` },
    { type: "struct", marks: 4, q: C`Describe how you would distinguish between solutions of iron(II) sulfate and iron(III) chloride using two tests.`,
      ms: C`<b>B1</b> add aqueous sodium hydroxide<br><b>B1</b> iron(II): green ppt; iron(III): red-brown ppt<br><b>B1</b> add dilute nitric acid and silver nitrate (or barium nitrate)<br><b>B1</b> iron(III) chloride: white ppt with AgNO₃ (iron(II) sulfate: white ppt with Ba(NO₃)₂)` },
    { type: "struct", marks: 3, q: C`Describe how to obtain pure water from salt solution, naming the apparatus.`,
      ms: C`<b>B1</b> heat solution in a flask; water boils/evaporates<br><b>B1</b> vapour condensed in a (Liebig) condenser<br><b>B1</b> collect pure water in a beaker; salt remains` },
    { type: "struct", marks: 2, q: C`State the test and result for ammonia gas.`,
      ms: C`<b>B1</b> damp red litmus paper<br><b>B1</b> turns blue` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: C`Name the apparatus used to measure (a) the mass of a solid, (b) the volume of gas produced in a reaction.`, ms: C`<b>B1</b> balance<br><b>B1</b> gas syringe (or measuring cylinder over water)` },
    { d: 1, type: "struct", marks: 2, q: C`Give the test and positive result for carbon dioxide.`, ms: C`<b>B1</b> bubble through limewater<br><b>B1</b> turns milky / cloudy` },
    { d: 1, type: "mcq", marks: 1, q: C`Sand is separated from water by`, opts: ["distillation", "filtration", "crystallisation", "chromatography"], ans: 1, why: C`Insoluble solid.` },
    { d: 1, type: "struct", marks: 1, q: C`State the colour of the flame produced by sodium ions.`, ms: C`<b>B1</b> yellow` },
    { d: 1, type: "mcq", marks: 1, q: C`Which ion gives a red-brown precipitate with aqueous sodium hydroxide?`, opts: ["Fe²⁺", "Fe³⁺", "Cu²⁺", "Zn²⁺"], ans: 1, why: C`Fe(OH)₃.` },
    { d: 1, type: "struct", marks: 2, q: C`Define (a) solute, (b) filtrate.`, ms: C`<b>B1</b> substance dissolved in a solvent<br><b>B1</b> liquid that passes through a filter` },
    { d: 2, type: "struct", marks: 3, q: C`Describe a test for nitrate ions, including the result.`, ms: C`<b>B1</b> add aqueous sodium hydroxide and aluminium (foil/powder)<br><b>B1</b> warm<br><b>B1</b> ammonia produced turns damp red litmus blue` },
    { d: 2, type: "struct", marks: 3, q: C`A student wants pure crystals of potassium nitrate from a solution. Describe the method and explain why the solution is not evaporated to dryness.`, ms: C`<b>B1</b> heat to evaporate some water until saturated / crystals form on a glass rod<br><b>B1</b> leave to cool and crystallise; filter, wash with cold water, dry<br><b>B1</b> evaporating to dryness leaves impurities / may decompose the salt / gives powder not crystals` },
    { d: 2, type: "struct", marks: 3, q: C`Explain why the baseline in chromatography is drawn in pencil and must be above the solvent level, and why a lid is placed on the beaker.`, ms: C`<b>B1</b> ink would dissolve/run but pencil does not<br><b>B1</b> samples would dissolve into the solvent in the beaker<br><b>B1</b> lid stops the solvent evaporating / saturates the atmosphere` },
    { d: 2, type: "struct", marks: 2, q: C`Distinguish between Zn²⁺ and Al³⁺ ions using a single reagent.`, ms: C`<b>B1</b> add aqueous ammonia in excess<br><b>B1</b> zinc ppt dissolves; aluminium ppt does not` },
    { d: 2, type: "mcq", marks: 1, q: C`A solution decolourises acidified potassium manganate(VII). It contains`, opts: ["sulfate ions", "sulfite ions", "chloride ions", "nitrate ions"], ans: 1, why: C`Sulfite is oxidised.` },
    { d: 3, type: "struct", marks: 5, q: C`Solid X is a white salt. Its solution gives no precipitate with aqueous sodium hydroxide, a lilac flame, and a yellow precipitate with acidified silver nitrate. (a) Identify X. (b) Write the ionic equation for the precipitate. (c) Explain why nitric acid, not hydrochloric acid, is used.`, ms: C`<b>B1</b> potassium (lilac, no hydroxide ppt)<br><b>B1</b> iodide (yellow ppt): KI<br><b>B1</b> Ag⁺(aq) + I⁻(aq) → AgI(s)<br><b>B1</b> hydrochloric acid would add chloride ions<br><b>B1</b> which form a white AgCl precipitate (false result)` },
    { d: 3, type: "struct", marks: 4, q: C`S: A chromatogram of a food colouring shows spots with Rf 0.21 and 0.68. A permitted dye E has Rf 0.68 and a banned dye B has Rf 0.35, all in the same solvent. The solvent front moved 10.0 cm. (a) How far did each spot move? (b) Is the colouring safe? Explain.`, ms: C`<b>C1</b> 2.1 cm<br><b>C1</b> 6.8 cm<br><b>B1</b> contains E (same Rf) and does not contain B (no spot at 0.35)<br><b>B1</b> the other component (0.21) is unidentified, so more testing is needed before calling it safe` },
    { d: 3, type: "struct", marks: 4, q: C`A student's titres were 23.40, 22.85, 22.95 and 22.90 cm³ (first is rough). (a) Which titres are concordant? (b) Calculate the mean titre. (c) Explain why the indicator is added only in small amounts.`, ms: C`<b>B1</b> 22.85, 22.95, 22.90 (within 0.10 cm³)<br><b>C1</b> (22.85 + 22.95 + 22.90) ÷ 3<br><b>A1</b> 22.90 cm³<br><b>B1</b> indicators are weak acids/bases and would affect the volume needed` }
  ]
});
}
