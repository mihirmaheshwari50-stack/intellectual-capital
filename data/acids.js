window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
//@@HELPERS-START
const pHcol = (p) => `hsl(${Math.min(280, Math.max(0, (p - 1) / 13 * 280))},72%,52%)`;
const step = (x, y, w, t, c = "k") => { const L = t.split("|"), h = 14 + L.length * 15; return F.rect(x, y, w, h, c + "S " + c, 10) + L.map((l, i) => F.text(x + w / 2, y + 20 + i * 15, l, "t" + c + " small" + (i ? "" : " bold"))).join(""); };
const beaker = (x, y, w, h, fill) => F.path(`M${x},${y} L${x},${y + h} Q${x},${y + h + 8} ${x + 8},${y + h + 8} L${x + w - 8},${y + h + 8} Q${x + w},${y + h + 8} ${x + w},${y + h} L${x + w},${y}`, "k") + F.rect(x + 1, y + h * .4, w - 2, h * .6 + 7, fill + " nostroke");
//@@HELPERS-END

/* ============================================================
   ACIDS, BASES AND SALTS  (0620: 7.1, 7.2, 7.3)
   ============================================================ */
TOPICS.push({
  id: "acids", subject: "chemistry", unit: 7, title: "Acids, bases & salts",
  blurb: "Acids and alkalis, indicators and pH, reactions of acids, proton donors, strong and weak acids, types of oxide, solubility rules and preparing pure salts.",
  level: "Core → Supplement", demo: "titration",
  syllabus: [
    ["7.1", "Aqueous solutions of acids contain H⁺ ions; aqueous solutions of alkalis contain OH⁻ ions", 0],
    ["7.1", "Effect of acids and bases on litmus and methyl orange; pH and universal indicator; neutrality, acidity and alkalinity", 1],
    ["7.1", "Reactions of acids with metals, bases and carbonates", 2],
    ["7.1", "Bases react with acids and with ammonium salts; alkalis are soluble bases", 3],
    ["7.1 S", "Acids are proton (H⁺) donors and bases are proton acceptors", 4],
    ["7.1 S", "Strong acids are completely dissociated, weak acids partially (HCl vs CH₃COOH)", 4],
    ["7.1", "Neutralisation: H⁺ + OH⁻ → H₂O; the importance of controlling soil acidity", 5],
    ["7.2", "Classify oxides as acidic (e.g. SO₂, CO₂) or basic (e.g. CuO, CaO), related to metallic and non-metallic character", 6],
    ["7.2 S", "Amphoteric oxides (Al₂O₃, ZnO) react with both acids and bases", 6],
    ["7.3", "General solubility rules for salts", 7],
    ["7.3", "Prepare a pure, dry soluble salt from an acid and excess metal, insoluble base or insoluble carbonate", 8],
    ["7.3", "Prepare a soluble salt from an acid and an alkali by titration", 9],
    ["7.3", "Prepare insoluble salts by precipitation", 10],
    ["7.3", "Define hydrated, anhydrous and water of crystallisation", 11]
  ],
  sections: [
    { h: "Acids and alkalis (7.1)", body: C`
<p class="lead">An <b>acid</b> is a substance that produces <b>hydrogen ions, H⁺</b>, when dissolved in water. An <b>alkali</b> produces <b>hydroxide ions, OH⁻</b>.</p>
<table class="t"><tr><th>Common acids</th><th>Formula</th><th>Ions in water</th></tr>
<tr><td>Hydrochloric acid</td><td>HCl</td><td>H⁺ + Cl⁻</td></tr><tr><td>Sulfuric acid</td><td>H₂SO₄</td><td>2H⁺ + SO₄²⁻</td></tr><tr><td>Nitric acid</td><td>HNO₃</td><td>H⁺ + NO₃⁻</td></tr><tr><td>Ethanoic acid</td><td>CH₃COOH</td><td>H⁺ + CH₃COO⁻ (partly)</td></tr></table>
<table class="t"><tr><th>Common alkalis</th><th>Formula</th></tr><tr><td>Sodium hydroxide</td><td>NaOH</td></tr><tr><td>Potassium hydroxide</td><td>KOH</td></tr><tr><td>Calcium hydroxide (limewater)</td><td>Ca(OH)₂</td></tr><tr><td>Aqueous ammonia</td><td>NH₃(aq)</td></tr></table>
<div class="callout key"><b class="t">Bases vs alkalis</b>A <b>base</b> is any substance that neutralises an acid (metal oxides and hydroxides). An <b>alkali</b> is a base that <b>dissolves in water</b>. All alkalis are bases, but not all bases are alkalis (copper(II) oxide is a base but insoluble).</div>`},

    { h: "Indicators and pH (7.1)", body: C`
${(() => { let s = ""; for (let p = 0; p <= 14; p++) { s += F.rect(20 + p * 36, 40, 36, 44, "nostroke").replace('class="nostroke"', `style="fill:${pHcol(p)}" class="nostroke"`) + F.text(38 + p * 36, 68, p, "tk bold"); }
  s += F.text(20, 110, "strongly acidic", "tr small bold", "start") + F.text(290, 110, "neutral (7)", "tg small bold") + F.text(560, 110, "strongly alkaline", "tb small bold", "end");
  s += F.text(110, 26, "battery acid 0 · lemon 2 · vinegar 3", "tm small") + F.text(470, 26, "soap 10 · bleach 12 · oven cleaner 14", "tm small");
  return F.fig(580, 125, s, "The pH scale, coloured as universal indicator shows it.", { size: "wide" }); })()}
<ul><li><b>pH &lt; 7</b>: acidic (the lower, the more acidic: more H⁺ ions). <b>pH 7</b>: neutral (pure water). <b>pH &gt; 7</b>: alkaline (the higher, the more OH⁻).</li>
<li><b>Universal indicator</b> (paper or solution) shows the approximate pH by colour.</li></ul>
<table class="t"><tr><th>Indicator</th><th>In acid</th><th>In alkali</th></tr>
<tr><td>Litmus</td><td>Red</td><td>Blue</td></tr><tr><td>Methyl orange</td><td>Red</td><td>Yellow</td></tr><tr><td>Phenolphthalein</td><td>Colourless</td><td>Pink</td></tr><tr><td>Universal indicator</td><td>Red / orange / yellow</td><td>Blue / purple</td></tr></table>`},

    { h: "Reactions of acids (7.1)", body: C`
<h3>1. Acid + metal → salt + hydrogen</h3>
$$\text{Mg}+2\text{HCl}\rightarrow\text{MgCl}_2+\text{H}_2$$
<p>Fizzing; the hydrogen gives a squeaky "pop" with a lighted splint. Only metals above hydrogen in the reactivity series react (not copper, silver, gold).</p>
<h3>2. Acid + base → salt + water</h3>
$$\text{CuO}+\text{H}_2\text{SO}_4\rightarrow\text{CuSO}_4+\text{H}_2\text{O}\qquad\text{NaOH}+\text{HCl}\rightarrow\text{NaCl}+\text{H}_2\text{O}$$
<h3>3. Acid + carbonate → salt + water + carbon dioxide</h3>
$$\text{CaCO}_3+2\text{HCl}\rightarrow\text{CaCl}_2+\text{H}_2\text{O}+\text{CO}_2$$
<p>Fizzing; the CO₂ turns limewater milky.</p>
<h3>Naming the salt</h3>
<table class="t"><tr><th>Acid</th><th>Salt name ends</th><th>Example</th></tr><tr><td>Hydrochloric</td><td>chloride</td><td>zinc chloride</td></tr><tr><td>Sulfuric</td><td>sulfate</td><td>copper(II) sulfate</td></tr><tr><td>Nitric</td><td>nitrate</td><td>potassium nitrate</td></tr><tr><td>Ethanoic</td><td>ethanoate</td><td>sodium ethanoate</td></tr></table>
<p>The first part of the name comes from the metal (or ammonium).</p>`},

    { h: "Bases and alkalis (7.1)", body: C`
<ul><li>Bases <b>neutralise acids</b> to form a salt and water.</li>
<li>Alkalis turn litmus <b>blue</b> and methyl orange <b>yellow</b>.</li>
<li>Bases react with <b>ammonium salts</b> (when warmed) to release <b>ammonia gas</b>, which turns damp red litmus paper blue:</li></ul>
$$\text{NH}_4\text{Cl}+\text{NaOH}\rightarrow\text{NaCl}+\text{H}_2\text{O}+\text{NH}_3$$
<p>This is the test for ammonium ions. It also explains why farmers shouldn't add lime (a base) at the same time as ammonium fertilisers: ammonia gas would be lost.</p>`},

    { h: "Proton donors; strong and weak acids (7.1 S)", body: C`
<p class="lead">A hydrogen ion H⁺ is just a <b>proton</b>. So:</p>
<ul><li>An <b>acid is a proton donor</b> (it gives away H⁺).</li><li>A <b>base is a proton acceptor</b> (it takes H⁺).</li></ul>
<p>In $\text{HCl}+\text{NH}_3\rightarrow\text{NH}_4^{+}+\text{Cl}^-$, HCl donates a proton (acid) and NH₃ accepts it (base).</p>
<h3>Strong and weak acids</h3>
${F.row(
  (() => { let s = F.rect(20, 20, 160, 120, "m"); for (let i = 0; i < 6; i++) { const x = 45 + (i % 3) * 50, y = 50 + Math.floor(i / 3) * 55; s += F.circ(x, y, 10, "r rS r") + F.text(x, y + 4, "H⁺", "tr small bold") + F.circ(x + 18, y + 18, 9, "b bS b") + F.text(x + 18, y + 22, "Cl⁻", "tb small"); }
    return F.fig(200, 170, s + F.text(100, 160, "all molecules ionised", "tk small bold"), "<b>Strong acid</b> (HCl): completely dissociated.", { size: "tiny" }); })(),
  (() => { let s = F.rect(20, 20, 160, 120, "m"); [[60, 45], [140, 45], [60, 80], [140, 80], [60, 115]].forEach(([x, y]) => { s += F.rect(x - 32, y - 10, 64, 20, "m mS", 9) + F.text(x, y + 4, "CH₃COOH", "tk small"); }); s += F.circ(122, 115, 9, "r rS r") + F.text(122, 119, "H⁺", "tr small bold") + F.circ(152, 118, 9, "b bS b") + F.text(152, 122, "A⁻", "tb small");
    return F.fig(200, 170, s + F.text(100, 160, "only a few ionised", "tk small bold"), "<b>Weak acid</b> (ethanoic): partially dissociated.", { size: "tiny" }); })()
)}
$$\text{HCl}(\text{aq})\rightarrow\text{H}^+(\text{aq})+\text{Cl}^-(\text{aq})\qquad\text{CH}_3\text{COOH}(\text{aq})\rightleftharpoons\text{H}^+(\text{aq})+\text{CH}_3\text{COO}^-(\text{aq})$$
<ul><li>A <b>strong acid</b> is <b>completely dissociated</b> (ionised) in aqueous solution: one-way arrow.</li>
<li>A <b>weak acid</b> is only <b>partially dissociated</b>: reversible arrow ⇌.</li>
<li>At the same concentration, a strong acid has a <b>lower pH</b> (more H⁺), reacts faster with magnesium or carbonates, and conducts electricity better.</li></ul>
<div class="callout warn"><b class="t">Strong ≠ concentrated</b>Strength is about how completely it dissociates. Concentration is how much acid is dissolved per dm³. You can have a dilute strong acid or a concentrated weak acid.</div>`},

    { h: "Neutralisation and soil acidity (7.1)", body: C`
<div class="viz" data-viz="neutralise"></div>
<p>In every neutralisation between an acid and an alkali, the real reaction is</p>
$$\text{H}^+(\text{aq})+\text{OH}^-(\text{aq})\rightarrow\text{H}_2\text{O}(\text{l})$$
<p>The other ions (e.g. Na⁺ and Cl⁻) are <b>spectator ions</b>: they don't change and end up as the salt.</p>
<h3>Controlling soil acidity</h3>
<p>Most crops grow best in soil close to pH 7 (around 6–7). Acid rain and some fertilisers make soil too acidic. Farmers add <b>lime</b> (calcium oxide, CaO) or <b>limestone</b> (calcium carbonate, CaCO₃), which are bases, to neutralise the acid. Too acidic or too alkaline soil reduces crop yields because nutrients become unavailable.</p>
<p>Other uses of neutralisation: indigestion tablets (bases neutralise excess stomach acid), toothpaste (neutralises acids from bacteria), treating stings.</p>`},

    { h: "Types of oxide (7.2)", body: C`
<table class="t"><tr><th>Type</th><th>Typical of</th><th>Reacts with</th><th>Examples</th></tr>
<tr><td><b>Acidic</b></td><td>Non-metals</td><td>Bases/alkalis (forms a salt + water); dissolves in water to form an acid</td><td>CO₂, SO₂, NO₂, P₄O₁₀</td></tr>
<tr><td><b>Basic</b></td><td>Metals</td><td>Acids (forms a salt + water)</td><td>CuO, CaO, MgO, Na₂O</td></tr>
<tr><td><b>Amphoteric</b> (S)</td><td>Some metals</td><td><b>Both</b> acids and bases</td><td>Al₂O₃, ZnO</td></tr></table>
<p>So whether an element's oxide is acidic or basic tells you whether it is a non-metal or a metal: <b>metallic character</b> goes with basic oxides.</p>
$$\text{CO}_2+2\text{NaOH}\rightarrow\text{Na}_2\text{CO}_3+\text{H}_2\text{O}\quad(\text{acidic oxide})$$
$$\text{ZnO}+2\text{HCl}\rightarrow\text{ZnCl}_2+\text{H}_2\text{O}\qquad\text{ZnO}+2\text{NaOH}\rightarrow\text{Na}_2\text{ZnO}_2+\text{H}_2\text{O}\quad(\text{amphoteric, S})$$
<p>Neutral oxides (e.g. CO, NO, H₂O) react with neither.</p>`},

    { h: "Solubility rules (7.3)", body: C`
<p class="lead">Before choosing a method to make a salt, you need to know whether it dissolves in water.</p>
<table class="t"><tr><th>Salts</th><th>Soluble?</th><th>Exceptions</th></tr>
<tr><td>All sodium, potassium and ammonium salts</td><td>Soluble</td><td>None</td></tr>
<tr><td>All nitrates</td><td>Soluble</td><td>None</td></tr>
<tr><td>Chlorides (and bromides, iodides)</td><td>Soluble</td><td><b>Silver</b> and <b>lead</b> chloride (and bromide, iodide) are insoluble</td></tr>
<tr><td>Sulfates</td><td>Soluble</td><td><b>Barium</b>, <b>calcium</b> and <b>lead</b> sulfate are insoluble</td></tr>
<tr><td>Carbonates</td><td><b>Insoluble</b></td><td>Except sodium, potassium and ammonium carbonates</td></tr>
<tr><td>Hydroxides</td><td><b>Insoluble</b></td><td>Except sodium, potassium, ammonium (calcium hydroxide is slightly soluble)</td></tr></table>`},

    { h: "Making a soluble salt from an insoluble solid (7.3)", body: C`
<p class="lead">To make a soluble salt such as copper(II) sulfate, react the acid with an <b>excess</b> of an insoluble solid: a metal, a base (oxide/hydroxide) or a carbonate.</p>
${(() => { let s = step(10, 20, 125, "1. Add excess solid|to warm acid, stir|until no more reacts", "o") + F.arrow(137, 45, 155, 45, "m", 7) + step(157, 20, 125, "2. Filter|to remove the|excess solid", "b") + F.arrow(284, 45, 302, 45, "m", 7) + step(304, 20, 125, "3. Heat filtrate|evaporate water|(until saturated)", "r") + F.arrow(431, 45, 449, 45, "m", 7) + step(451, 20, 125, "4. Cool, crystallise|filter, wash, dry|on filter paper", "g");
  s += beaker(30, 120, 80, 70, "bS") + F.rect(45, 175, 50, 8, "k kF") + F.text(70, 215, "excess CuO stays", "tk small") + F.path("M190,110 L250,110 L230,150 L210,150 Z", "k") + F.line(220, 150, 220, 170, "k") + beaker(185, 175, 70, 30, "bS") + F.text(220, 225, "filtrate: CuSO₄(aq)", "tk small");
  s += beaker(330, 140, 80, 50, "bS") + F.text(370, 225, "evaporate", "tk small") + F.path("M370,215 Q362,205 370,195", "r") ;
  for (let i = 0; i < 5; i++) s += F.poly([[470 + i * 18, 190], [478 + i * 18, 178], [486 + i * 18, 190], [478 + i * 18, 202]], "b bS b", true); s += F.text(515, 225, "blue crystals", "tb small");
  return F.fig(580, 235, s, "Making copper(II) sulfate crystals from copper(II) oxide and dilute sulfuric acid.", { size: "wide" }); })()}
<ul><li><b>Why excess solid?</b> To make sure <b>all the acid</b> is used up, so the salt isn't contaminated with acid. You know it's in excess when solid remains (and, for carbonates, fizzing stops).</li>
<li><b>Why not evaporate to dryness?</b> You would lose the water of crystallisation and may decompose the salt; slow crystallisation gives purer, larger crystals.</li></ul>
$$\text{CuO}(\text{s})+\text{H}_2\text{SO}_4(\text{aq})\rightarrow\text{CuSO}_4(\text{aq})+\text{H}_2\text{O}(\text{l})$$`},

    { h: "Making a soluble salt by titration (7.3)", body: C`
<p class="lead">Sodium, potassium and ammonium salts are made from an <b>acid and an alkali</b>. Both are solutions, so you can't add an "excess" and filter it off. Instead, use a <b>titration</b> to find the exact volumes.</p>
<ol class="steps-inline"><li>Pipette 25.0 cm³ of alkali into a conical flask; add a few drops of indicator.</li>
<li>Add acid from a burette, swirling, until the indicator <b>just</b> changes colour (the <b>end-point</b>). Record the volume.</li>
<li>Repeat <b>without the indicator</b>, adding exactly the same volumes (otherwise the indicator would contaminate the salt). Or: add powdered charcoal to remove the indicator, then filter.</li>
<li>Evaporate some water, leave to crystallise, filter and dry the crystals.</li></ol>
<p>Try it in the interactive titration lab at the end of the lesson.</p>`},

    { h: "Making an insoluble salt: precipitation (7.3)", body: C`
<p class="lead">An insoluble salt is made by mixing <b>two solutions</b> that each contain one of its ions. The salt forms as a <b>precipitate</b>.</p>
$$\text{Ba(NO}_3)_2(\text{aq})+\text{Na}_2\text{SO}_4(\text{aq})\rightarrow\text{BaSO}_4(\text{s})+2\text{NaNO}_3(\text{aq})$$
$$\text{Ba}^{2+}(\text{aq})+\text{SO}_4^{2-}(\text{aq})\rightarrow\text{BaSO}_4(\text{s})$$
${(() => { let s = beaker(20, 40, 80, 90, "bS") + F.text(60, 160, "Ba(NO₃)₂(aq)", "tk small") + F.text(120, 95, "+", "tk big") + beaker(140, 40, 80, 90, "mS") + F.text(180, 160, "Na₂SO₄(aq)", "tk small") + F.arrow(232, 90, 262, 90, "m", 8);
  s += beaker(270, 40, 80, 90, "bS"); s += F.path("M276,128 Q290,112 310,116 Q330,110 344,128 Z", "m bgF"); for (let i = 0; i < 12; i++) s += F.circ(284 + (i * 37) % 56, 70 + (i * 23) % 40, 2.2, "m bgF"); s += F.text(310, 160, "white precipitate", "tk small");
  s += F.path("M380,60 L440,60 L420,100 L400,100 Z", "k") + F.line(410, 100, 410, 120, "k") + F.text(410, 50, "filter", "tk small bold") + F.text(470, 90, "wash with", "tk small", "start") + F.text(470, 106, "distilled water,", "tk small", "start") + F.text(470, 122, "then dry", "tk small", "start");
  return F.fig(580, 175, s, "", { size: "wide" }); })()}
<ol class="steps-inline"><li>Mix the two solutions; a precipitate forms.</li><li>Filter to collect the solid (the residue).</li><li>Wash it with distilled water to remove the soluble salts left around it.</li><li>Dry it in a warm oven or between filter papers.</li></ol>`},

    { h: "Hydrated salts and water of crystallisation (7.3)", body: C`
<ul><li>A <b>hydrated</b> substance is chemically combined with water.</li>
<li>An <b>anhydrous</b> substance contains no water.</li>
<li><b>Water of crystallisation</b> is the water molecules present in the crystals of a hydrated substance, shown after a dot in the formula: CuSO₄·5H₂O, CoCl₂·6H₂O, MgSO₄·7H₂O.</li></ul>
<p>Heating a hydrated salt drives off the water of crystallisation; this is reversible (see <i>Reversible reactions</i>).</p>
<details class="check"><summary>What mass of water is in 250 g of CuSO₄·5H₂O? (Mr = 250)</summary><div>Mr of 5H₂O = 90. Water = 90/250 × 250 g = 90 g.</div></details>`}
  ],
  worked: [
    { q: C`Describe how to make pure, dry crystals of zinc chloride from zinc carbonate.`,
      steps: [C`Add zinc carbonate a little at a time to warm dilute hydrochloric acid, stirring, until no more fizzing occurs and some solid remains (excess).`, C`Filter to remove the excess zinc carbonate.`, C`Heat the filtrate to evaporate some water until crystals start to form (saturated), then leave to cool and crystallise.`, C`Filter off the crystals, wash with a little cold distilled water and dry between filter papers. Equation: $\text{ZnCO}_3+2\text{HCl}\rightarrow\text{ZnCl}_2+\text{H}_2\text{O}+\text{CO}_2$.`]},
    { q: C`Suggest a method, with reagents, to make (a) potassium nitrate, (b) lead(II) iodide.`,
      steps: [C`(a) Potassium salts are soluble and potassium hydroxide is an alkali: titration of potassium hydroxide with nitric acid.`, C`(b) Lead(II) iodide is insoluble: precipitation by mixing lead(II) nitrate and potassium iodide solutions, then filter, wash and dry.`]},
    { q: C`S: Explain why 0.1 mol/dm³ ethanoic acid has a higher pH than 0.1 mol/dm³ hydrochloric acid.`,
      steps: [C`Hydrochloric acid is a strong acid: completely dissociated.`, C`Ethanoic acid is weak: only partially dissociated.`, C`So ethanoic acid has a lower concentration of H⁺ ions, hence a higher pH.`]}
  ],
  formulas: [["Acid + metal", "salt + hydrogen"], ["Acid + base", "salt + water"], ["Acid + carbonate", "salt + water + carbon dioxide"], ["Neutralisation (ionic)", C`$\text{H}^++\text{OH}^-\rightarrow\text{H}_2\text{O}$`], ["Base + ammonium salt", "salt + water + ammonia"]],
  cards: [
    ["Ion present in all acids (aq)", "H⁺"],
    ["Ion present in all alkalis (aq)", "OH⁻"],
    ["Alkali vs base", "An alkali is a base that dissolves in water."],
    ["Litmus in acid / alkali", "Red / blue."],
    ["Methyl orange in acid / alkali", "Red / yellow."],
    ["pH of a neutral solution", "7"],
    ["Acid + metal →", "Salt + hydrogen."],
    ["Acid + carbonate →", "Salt + water + carbon dioxide."],
    ["Acid as proton donor (S)", "An acid gives away H⁺ (a proton); a base accepts it."],
    ["Strong acid (S)", "Completely dissociated in water (e.g. HCl)."],
    ["Weak acid (S)", "Partially dissociated (e.g. ethanoic acid)."],
    ["Ionic equation for neutralisation", "H⁺(aq) + OH⁻(aq) → H₂O(l)"],
    ["Why add lime to soil?", "To neutralise excess acidity so crops grow better."],
    ["Acidic oxides", "Non-metal oxides, e.g. CO₂, SO₂."],
    ["Basic oxides", "Metal oxides, e.g. CuO, CaO."],
    ["Amphoteric oxides (S)", "React with acids and bases: Al₂O₃, ZnO."],
    ["Always-soluble salts", "Sodium, potassium, ammonium salts; all nitrates."],
    ["Insoluble chlorides", "Silver chloride, lead chloride."],
    ["Insoluble sulfates", "Barium, calcium, lead sulfate."],
    ["Method for a soluble salt from an insoluble base", "Excess base + acid, filter, evaporate partly, crystallise."],
    ["Method for a sodium/potassium salt", "Titration of acid with alkali."],
    ["Method for an insoluble salt", "Precipitation: mix two solutions, filter, wash, dry."],
    ["Water of crystallisation", "Water chemically combined in the crystals of a hydrated salt."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`A solution turns universal indicator purple. Its pH is about`, opts: ["1", "5", "7", "13"], ans: 3, why: C`Purple: strongly alkaline.` },
    { type: "mcq", marks: 1, q: C`Magnesium + hydrochloric acid produces`, opts: ["magnesium chloride + water", "magnesium chloride + hydrogen", "magnesium oxide + hydrogen", "magnesium chloride + CO₂"], ans: 1, why: C`Acid + metal → salt + hydrogen.` },
    { type: "mcq", marks: 1, q: C`Which salt is insoluble?`, opts: ["Sodium chloride", "Copper(II) sulfate", "Silver chloride", "Potassium nitrate"], ans: 2, why: C`Silver chloride.` },
    { type: "mcq", marks: 1, q: C`Which oxide is acidic?`, opts: ["CaO", "CuO", "SO₂", "Na₂O"], ans: 2, why: C`Non-metal oxide.` },
    { type: "mcq", marks: 1, q: C`The best method to make sodium sulfate is`, opts: ["excess metal + acid", "precipitation", "titration", "excess carbonate + acid then filter"], ans: 2, why: C`Sodium hydroxide is an alkali (a solution): titration.` },
    { type: "mcq", marks: 1, q: C`S: A weak acid is one that`, opts: ["is dilute", "partially dissociates in water", "has pH 7", "does not react"], ans: 1, why: C`Partial ionisation.` },
    { type: "mcq", marks: 1, q: C`S: Zinc oxide reacts with both hydrochloric acid and sodium hydroxide. It is`, opts: ["acidic", "basic", "neutral", "amphoteric"], ans: 3, why: C`Amphoteric.` },
    { type: "struct", marks: 3, q: C`Write word and balanced symbol equations for the reaction of calcium carbonate with nitric acid.`,
      ms: C`<b>B1</b> calcium carbonate + nitric acid → calcium nitrate + water + carbon dioxide<br><b>B1</b> correct formulae: CaCO₃ + HNO₃ → Ca(NO₃)₂ + H₂O + CO₂<br><b>B1</b> balanced (2HNO₃)` },
    { type: "struct", marks: 4, q: C`Describe how you would prepare pure, dry crystals of copper(II) sulfate from copper(II) oxide.`,
      ms: C`<b>B1</b> add excess copper(II) oxide to warm dilute sulfuric acid, stir<br><b>B1</b> filter to remove excess CuO<br><b>B1</b> evaporate some water, leave to crystallise<br><b>B1</b> filter / pat dry crystals with filter paper` },
    { type: "struct", marks: 4, q: C`Describe how to prepare a pure, dry sample of barium sulfate.`,
      ms: C`<b>B1</b> mix solutions of a soluble barium salt (e.g. barium nitrate/chloride) and a soluble sulfate (e.g. sodium sulfate / sulfuric acid)<br><b>B1</b> filter to collect the precipitate<br><b>B1</b> wash with distilled water<br><b>B1</b> dry in a warm oven / between filter papers` },
    { type: "struct", marks: 3, q: C`S: Define acids and bases in terms of protons, and identify the acid and base in NH₃ + H₂O ⇌ NH₄⁺ + OH⁻.`,
      ms: C`<b>B1</b> acid: proton donor; base: proton acceptor<br><b>B1</b> water is the acid (donates H⁺)<br><b>B1</b> ammonia is the base (accepts H⁺)` },
    { type: "struct", marks: 3, q: C`Explain why farmers add calcium carbonate to fields and why it should not be added at the same time as ammonium sulfate fertiliser.`,
      ms: C`<b>B1</b> it neutralises soil acidity / raises pH for better crop growth<br><b>B1</b> bases react with ammonium salts<br><b>B1</b> ammonia gas is released, so nitrogen is lost from the fertiliser` },
    { type: "struct", marks: 2, q: C`State what is meant by (a) hydrated, (b) anhydrous.`,
      ms: C`<b>B1</b> (a) chemically combined with water (water of crystallisation)<br><b>B1</b> (b) containing no water` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: C`State the colour of methyl orange in (a) an acid, (b) an alkali.`, ms: C`<b>B1</b> red<br><b>B1</b> yellow` },
    { d: 1, type: "mcq", marks: 1, q: C`The gas produced when an acid reacts with a carbonate is`, opts: ["hydrogen", "oxygen", "carbon dioxide", "ammonia"], ans: 2, why: C`CO₂.` },
    { d: 1, type: "struct", marks: 2, q: C`Name the salt formed when (a) zinc reacts with sulfuric acid, (b) potassium hydroxide reacts with nitric acid.`, ms: C`<b>B1</b> zinc sulfate<br><b>B1</b> potassium nitrate` },
    { d: 1, type: "struct", marks: 1, q: C`Give the ionic equation for neutralisation.`, ms: C`<b>B1</b> H⁺ + OH⁻ → H₂O` },
    { d: 2, type: "struct", marks: 3, q: C`Explain why excess copper(II) oxide is used when making copper(II) sulfate, and how you know it is in excess.`, ms: C`<b>B1</b> ensures all the acid reacts / is used up<br><b>B1</b> so the salt is not contaminated with acid<br><b>B1</b> solid remains undissolved even after stirring/warming` },
    { d: 2, type: "struct", marks: 3, q: C`S: Describe two experiments that show hydrochloric acid is a stronger acid than ethanoic acid of the same concentration.`, ms: C`<b>B1</b> measure pH: HCl lower<br><b>B1</b> add magnesium ribbon / carbonate: HCl fizzes faster<br><b>B1</b> conductivity: HCl conducts better (any two with result)` },
    { d: 2, type: "mcq", marks: 1, q: C`Which pair of solutions produces a precipitate when mixed?`, opts: ["NaCl and KNO₃", "AgNO₃ and NaCl", "NaOH and HCl", "K₂SO₄ and NaNO₃"], ans: 1, why: C`AgCl is insoluble.` },
    { d: 2, type: "struct", marks: 3, q: C`S: Classify Al₂O₃, MgO and SO₂ as acidic, basic or amphoteric, giving one reaction for the amphoteric oxide.`, ms: C`<b>B1</b> MgO basic, SO₂ acidic<br><b>B1</b> Al₂O₃ amphoteric<br><b>B1</b> reacts with both acids (e.g. HCl) and alkalis (e.g. NaOH)` },
    { d: 3, type: "struct", marks: 6, q: C`Plan the preparation of pure dry crystals of sodium chloride from sodium hydroxide solution and dilute hydrochloric acid. Explain why the method is different from making copper(II) chloride from copper(II) oxide.`, ms: C`<b>B1</b> pipette known volume of NaOH, add indicator<br><b>B1</b> add HCl from burette until end-point; record volume<br><b>B1</b> repeat without indicator using same volumes<br><b>B1</b> evaporate, crystallise, dry<br><b>B1</b> both reactants are solutions/soluble, so excess cannot be removed by filtration<br><b>B1</b> titration gives exact amounts to avoid excess of either` },
    { d: 3, type: "struct", marks: 4, q: C`S: 25.0 cm³ of 0.200 mol/dm³ sodium hydroxide is neutralised by 20.0 cm³ of hydrochloric acid. Calculate the concentration of the acid.`, ms: C`<b>C1</b> moles NaOH = 0.0250 × 0.200 = 0.00500<br><b>C1</b> 1:1 ratio so moles HCl = 0.00500<br><b>C1</b> concentration = 0.00500 ÷ 0.0200<br><b>A1</b> 0.250 mol/dm³` }
  ]
});
}
