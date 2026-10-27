window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
// Displayed formula from a character grid. Letters = atoms (Cl, Br are two letters), - single, = double (horizontal), | single, ‖ double (vertical).
const disp = (x0, y0, rows, o = {}) => { const cw = o.cw || 13, rh = o.rh || 20; let s = "";
  rows.forEach((r, ri) => { const y = y0 + ri * rh; for (let i = 0; i < r.length; i++) { const ch = r[i], x = x0 + i * cw + cw / 2;
    if (/[A-Z]/.test(ch)) { let tok = ch; if (/[a-z]/.test(r[i + 1] || "")) tok += r[i + 1]; const cls = tok === "C" ? "tc bold" : tok === "O" ? "tr bold" : /Cl|Br/.test(tok) ? "to bold" : "tk"; s += F.text(x, y + 5, tok, cls + (o.small ? " small" : "")); if (tok.length > 1) i++; }
    else if (ch === "-") s += F.line(x - cw / 2 + 1, y, x + cw / 2 - 1, y, "k mid");
    else if (ch === "=") s += F.line(x - cw / 2 + 1, y - 2.5, x + cw / 2 - 1, y - 2.5, "k mid") + F.line(x - cw / 2 + 1, y + 2.5, x + cw / 2 - 1, y + 2.5, "k mid");
    else if (ch === "|") s += F.line(x, y - rh / 2 + 4, x, y + rh / 2 - 4, "k mid");
    else if (ch === "‖") s += F.line(x - 2.5, y - rh / 2 + 4, x - 2.5, y + rh / 2 - 4, "k mid") + F.line(x + 2.5, y - rh / 2 + 4, x + 2.5, y + rh / 2 - 4, "k mid"); } });
  return s; };
const mol = (rows, cap, lab, o = {}) => { const w = Math.max(...rows.map(r => r.length)) * 13 + 30, h = rows.length * 20 + (lab ? 34 : 14); return F.fig(w, h, disp(15, 12, rows) + (lab ? F.text(w / 2, h - 8, lab, "tk small bold") : ""), cap, { size: "tiny" }); };

/* ============================================================
   ORGANIC CHEMISTRY 1: FORMULAE, FUELS, ALKANES, ALKENES  (0620: 11.1 – 11.4)
   ============================================================ */
TOPICS.push({
  id: "organic1", subject: "chemistry", unit: 11, title: "Organic 1: fuels, alkanes & alkenes",
  blurb: "Formulae and naming, homologous series and isomers, fossil fuels and fractional distillation, alkanes and substitution, cracking, alkenes, the bromine-water test and addition reactions.",
  level: "Core → Supplement", demo: "series",
  syllabus: [
    ["11.1", "Draw and interpret displayed formulae; state the type of compound from its functional group", 0],
    ["11.1", "Write and interpret general formulae; understand molecular, structural and displayed formulae", 0],
    ["11.1", "Name and draw the structures of unbranched alkanes, alkenes, alcohols and carboxylic acids with up to four carbons", 1],
    ["11.1 S", "State the meaning of homologous series and its characteristics; structural isomers", 2],
    ["11.1 S", "Define saturated and unsaturated", 2],
    ["11.2", "Name the fuels coal, natural gas and petroleum; methane is the main constituent of natural gas", 3],
    ["11.2", "Petroleum is a mixture of hydrocarbons separated by fractional distillation; uses of the fractions", 4],
    ["11.2", "Describe how properties of fractions change: chain length, volatility, boiling point, viscosity", 4],
    ["11.3", "Alkanes are saturated hydrocarbons, generally unreactive except for combustion", 5],
    ["11.3", "Describe the substitution reaction of alkanes with chlorine in UV light (photochemical)", 6],
    ["11.4", "Describe the manufacture of alkenes and hydrogen by cracking; reasons for cracking", 7],
    ["11.4", "Distinguish saturated and unsaturated hydrocarbons using bromine water", 8],
    ["11.4", "Alkenes undergo addition reactions with bromine, hydrogen and steam", 9],
    ["11.4 S", "Conditions for addition of hydrogen (Ni catalyst) and steam (H₃PO₄ catalyst, 300 °C, 6000 kPa)", 9]
  ],
  sections: [
    { h: "Organic compounds and their formulae (11.1)", body: C`
<p class="lead">Organic chemistry is the chemistry of carbon compounds. Carbon atoms form <b>four covalent bonds</b> and can link into chains. A <b>hydrocarbon</b> is a compound containing <b>hydrogen and carbon only</b>.</p>
<p>There are several ways to write the formula of an organic compound. For ethanol:</p>
<table class="t"><tr><th>Type</th><th>Meaning</th><th>Ethanol</th></tr>
<tr><td>Molecular formula</td><td>Number and type of each atom in one molecule</td><td>C₂H₆O</td></tr>
<tr><td>Structural formula</td><td>The arrangement, written without drawing bonds</td><td>CH₃CH₂OH</td></tr>
<tr><td>Displayed formula</td><td>Every atom and every bond drawn</td><td>(see diagram)</td></tr>
<tr><td>General formula</td><td>For a whole homologous series</td><td>CₙH₂ₙ₊₁OH (alcohols)</td></tr></table>
${F.row(
  mol(["  H H", "  | |", "H-C-C-O-H", "  | |", "  H H"], "Displayed formula of ethanol.", "ethanol"),
  mol(["  H H H", "  | | |", "H-C-C-C-H", "  | | |", "  H H H"], "Propane, C₃H₈.", "propane"),
  mol(["H   H", "|   |", "C===C", "|   |", "H   H"], "Ethene, C₂H₄: a C=C double bond.", "ethene")
)}
<div class="callout"><b>Drawing rules:</b> every carbon has <b>4 bonds</b>, every hydrogen <b>1</b>, every oxygen <b>2</b>. Count bonds on every atom before you move on: it is the most common way to lose a mark.</div>`},

    { h: "Functional groups and naming (11.1)", body: C`
<p>A <b>functional group</b> is the atom or group of atoms that determines the chemical properties of a compound. The name has two parts:</p>
<ul><li>a <b>stem</b> for the number of carbon atoms: <b>meth</b>- (1), <b>eth</b>- (2), <b>prop</b>- (3), <b>but</b>- (4) <i>("Monkeys Eat Peanut Butter")</i>;</li>
<li>an <b>ending</b> for the homologous series.</li></ul>
<table class="t"><tr><th>Series</th><th>Functional group</th><th>Ending</th><th>General formula</th><th>Example</th></tr>
<tr><td>Alkanes</td><td>C–C single bonds only</td><td>-ane</td><td>CₙH₂ₙ₊₂</td><td>butane C₄H₁₀</td></tr>
<tr><td>Alkenes</td><td>C=C</td><td>-ene</td><td>CₙH₂ₙ</td><td>propene C₃H₆</td></tr>
<tr><td>Alcohols</td><td>–OH</td><td>-anol</td><td>CₙH₂ₙ₊₁OH</td><td>methanol CH₃OH</td></tr>
<tr><td>Carboxylic acids</td><td>–COOH</td><td>-anoic acid</td><td>CₙH₂ₙ₊₁COOH</td><td>ethanoic acid CH₃COOH</td></tr>
<tr><td>Esters</td><td>–COO–</td><td>-yl -anoate</td><td>—</td><td>ethyl ethanoate</td></tr></table>
${F.row(
  mol(["  H H H", "  | | |", "H-C-C=C", "  |   |", "  H   H"], "Propene, CH₃CH=CH₂.", "propene"),
  mol(["  H", "  |", "H-C-O-H", "  |", "  H"], "Methanol, CH₃OH.", "methanol"),
  mol(["  H   O", "  |   ‖", "H-C---C-O-H", "  |", "  H"], "Ethanoic acid, CH₃COOH.", "ethanoic acid")
)}
<p>For alkenes and alcohols with four or more carbons, a number shows the position of the functional group: but-1-ene (CH₂=CHCH₂CH₃) and but-2-ene (CH₃CH=CHCH₃); propan-1-ol and propan-2-ol.</p>
<p>Build any member of the first four series in the <b>interactive lab</b> at the bottom of the page.</p>`},

    { h: "Homologous series, saturation and isomers (11.1 S)", body: C`
<p>A <b>homologous series</b> is a family of similar compounds with similar chemical properties due to the presence of the <b>same functional group</b>. Its members:</p>
<ul><li>have the <b>same general formula</b>;</li><li>differ from one member to the next by a <b>–CH₂–</b> unit;</li><li>show a <b>trend in physical properties</b> (e.g. boiling point increases as the chain gets longer);</li><li>have <b>similar chemical properties</b>.</li></ul>
<p><b>Saturated</b> compounds have molecules in which all carbon–carbon bonds are <b>single</b> bonds (alkanes). <b>Unsaturated</b> compounds have molecules with one or more carbon–carbon <b>double</b> (or triple) bonds (alkenes).</p>
<p><b>Structural isomers</b> are compounds with the <b>same molecular formula</b> but <b>different structural formulae</b>. C₄H₁₀ has two:</p>
${F.row(
  mol(["  H H H H", "  | | | |", "H-C-C-C-C-H", "  | | | |", "  H H H H"], "Butane: a straight chain.", "butane, C₄H₁₀"),
  mol(["  H   H   H", "  |   |   |", "H-C---C---C-H", "  |   |   |", "  H   |   H", "    H-C-H", "      |", "      H"], "Methylpropane: a branched chain.", "methylpropane, C₄H₁₀")
)}
<p>Isomers may also differ in the <b>position</b> of a functional group (but-1-ene and but-2-ene) or even belong to <b>different series</b> (propene and cyclopropane are both C₃H₆).</p>
<details class="check"><summary>Are ethanol (C₂H₅OH) and methoxymethane (CH₃OCH₃) isomers?</summary><div>Yes: both C₂H₆O, but with different structures (and different functional groups).</div></details>`},

    { h: "Fuels (11.2)", body: C`
<p>The main fossil fuels are <b>coal</b>, <b>natural gas</b> and <b>petroleum</b> (crude oil). They formed over millions of years from the remains of dead organisms and are <b>non-renewable</b>.</p>
<ul><li>The main constituent of natural gas is <b>methane</b>, CH₄.</li><li><b>Petroleum</b> is a <b>mixture of hydrocarbons</b>: mostly alkanes with different chain lengths.</li></ul>
<p>Burning hydrocarbons releases energy (exothermic). <b>Complete combustion</b> (plenty of oxygen) gives carbon dioxide and water; <b>incomplete combustion</b> gives carbon monoxide and/or carbon (soot):</p>
<p class="eq">$$\text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O} \qquad 2\text{CH}_4 + 3\text{O}_2 \rightarrow 2\text{CO} + 4\text{H}_2\text{O}$$</p>`},

    { h: "Fractional distillation of petroleum (11.2)", body: C`
<p class="lead">Petroleum is separated into useful <b>fractions</b> (mixtures of hydrocarbons with similar boiling points) by <b>fractional distillation</b>.</p>
<div class="viz" data-viz="fractionalDist"></div>
<ol class="steps"><li>Crude oil is heated until it <b>vaporises</b> and enters near the bottom of the fractionating column.</li>
<li>The column has a <b>temperature gradient</b>: hot at the bottom, cool at the top.</li>
<li>Vapours rise. Each hydrocarbon <b>condenses</b> when it reaches a level where the temperature is <b>below its boiling point</b>.</li>
<li>Fractions are collected at different heights. Small molecules (low boiling points) rise to the top; large molecules condense near the bottom; bitumen does not vaporise and drains out of the bottom.</li></ol>
<table class="t"><tr><th>Fraction</th><th>Use</th></tr>
<tr><td>Refinery gas</td><td>Gas used in heating and cooking</td></tr>
<tr><td>Gasoline / petrol</td><td>Fuel used in cars</td></tr>
<tr><td>Naphtha</td><td>Chemical feedstock (to make other chemicals, e.g. plastics)</td></tr>
<tr><td>Kerosene / paraffin</td><td>Jet fuel</td></tr>
<tr><td>Diesel oil / gas oil</td><td>Fuel used in diesel engines</td></tr>
<tr><td>Fuel oil</td><td>Fuel used in ships and home heating systems</td></tr>
<tr><td>Lubricating oil</td><td>Lubricants, waxes and polishes</td></tr>
<tr><td>Bitumen</td><td>Making roads</td></tr></table>
<p>Going <b>down</b> the column (from refinery gas to bitumen):</p>
${(() => { let s = F.arrow(30, 20, 30, 150, "r", 8) + F.text(42, 30, "top of column", "tm small", "start") + F.text(42, 148, "bottom", "tm small", "start");
  [["chain length", "increases", "r"], ["boiling point", "increases", "r"], ["viscosity (thickness)", "increases", "r"], ["volatility (ease of evaporating)", "decreases", "b"], ["flammability", "decreases", "b"]].forEach(([p, d, c], i) => { s += F.text(150, 34 + i * 26, p, "tk small", "start") + F.text(400, 34 + i * 26, d === "increases" ? "↑ increases" : "↓ decreases", "t" + c + " small bold", "start"); });
  return F.fig(520, 165, s, "Trends in the properties of fractions down the column.", { size: "small" }); })()}
<div class="callout"><b>Explanation:</b> longer chains have <b>stronger intermolecular forces</b>, so more energy is needed to separate the molecules: higher boiling point, less volatile, more viscous.</div>`},

    { h: "Alkanes (11.3)", body: C`
<p class="lead">Alkanes are <b>saturated hydrocarbons</b>, general formula <b>CₙH₂ₙ₊₂</b>. They are generally <b>unreactive</b> (they contain only strong C–C and C–H single bonds), except in terms of <b>burning</b>.</p>
<table class="t"><tr><th>Name</th><th>Formula</th><th>Structural</th><th>Boiling point / °C</th><th>State at r.t.</th></tr>
<tr><td>Methane</td><td>CH₄</td><td>CH₄</td><td>−162</td><td>gas</td></tr>
<tr><td>Ethane</td><td>C₂H₆</td><td>CH₃CH₃</td><td>−89</td><td>gas</td></tr>
<tr><td>Propane</td><td>C₃H₈</td><td>CH₃CH₂CH₃</td><td>−42</td><td>gas</td></tr>
<tr><td>Butane</td><td>C₄H₁₀</td><td>CH₃CH₂CH₂CH₃</td><td>−1</td><td>gas</td></tr>
<tr><td>Pentane</td><td>C₅H₁₂</td><td>CH₃(CH₂)₃CH₃</td><td>36</td><td>liquid</td></tr></table>
${F.plot({ w: 520, h: 210, ticks: { x: [1, 2, 3, 4, 5, 6], y: [-150, -100, -50, 0, 50] }, x: [0, 7], y: [-200, 100], gridStep: [1, 50], m: { b: 44 }, ylabel: "boiling point / °C", curves: [{ pts: [[1, -162], [2, -89], [3, -42], [4, -1], [5, 36], [6, 69]], c: "c" }], marks: [[1, -162], [2, -89], [3, -42], [4, -1], [5, 36], [6, 69]].map(([x, y]) => ({ x, y, c: "c" })), extra: (X, Y) => F.line(X(0), Y(20), X(7), Y(20), "m d") + F.text(X(0.2), Y(20) - 6, "room temperature (20 °C)", "tm small", "start") + F.text(X(7), Y(-200) + 30, "number of carbon atoms", "tk small", "end"), cap: "Boiling points of alkanes rise steadily with chain length.", size: "wide" })}
<p>Alkanes burn in plenty of air to give carbon dioxide and water: $\text{C}_3\text{H}_8 + 5\text{O}_2 \rightarrow 3\text{CO}_2 + 4\text{H}_2\text{O}$.</p>`},

    { h: "Substitution with chlorine (11.3)", body: C`
<p>In <b>ultraviolet light</b>, alkanes react with chlorine in a <b>substitution reaction</b>: one hydrogen atom is <b>replaced</b> by a chlorine atom. The UV light provides the energy to start the reaction: this is a <b>photochemical</b> reaction.</p>
<p class="eq">$$\text{CH}_4 + \text{Cl}_2 \xrightarrow{\text{UV light}} \text{CH}_3\text{Cl} + \text{HCl}$$</p>
${F.fig(560, 140, disp(10, 20, ["  H", "  |", "H-C-H", "  |", "  H"]) + F.text(95, 64, "+", "tk big") + F.text(140, 64, "Cl–Cl", "to bold") + F.arrow(190, 58, 260, 58, "k", 8) + F.text(225, 46, "UV", "to small bold") + disp(270, 20, ["  H", "  |", "H-C-Cl", "  |", "  H"]) + F.text(375, 64, "+", "tk big") + F.text(420, 64, "H–Cl", "to bold") + F.text(140, 128, "chlorine", "tm small") + F.text(310, 128, "chloromethane", "tm small") + F.text(440, 128, "hydrogen chloride", "tm small"), "Substitution: an H atom is swapped for a Cl atom.", { size: "wide" })}
<p>With excess chlorine, further substitution happens, producing dichloromethane CH₂Cl₂, trichloromethane CHCl₃ and tetrachloromethane CCl₄ (each step also makes HCl).</p>
<div class="callout"><b>Two marks to remember:</b> the <b>condition</b> (UV light) and the word <b>substitution</b>. Do not confuse with the <i>addition</i> reactions of alkenes.</div>`},

    { h: "Cracking (11.4)", body: C`
<p class="lead"><b>Cracking</b> breaks <b>long-chain alkanes</b> into <b>shorter-chain alkanes and alkenes</b> (and sometimes hydrogen). It is a <b>thermal decomposition</b>.</p>
<div class="viz" data-viz="cracking"></div>
<p><b>Conditions:</b> the long-chain alkane is vaporised and passed over a hot <b>catalyst</b> (aluminium oxide or silica, ≈ 600 °C) — <i>catalytic cracking</i>. Examples:</p>
<p class="eq">$$\text{C}_{10}\text{H}_{22} \rightarrow \text{C}_8\text{H}_{18} + \text{C}_2\text{H}_4 \qquad \text{C}_{12}\text{H}_{26} \rightarrow \text{C}_6\text{H}_{14} + 2\text{C}_3\text{H}_6$$</p>
<p class="eq">$$\text{C}_2\text{H}_6 \rightarrow \text{C}_2\text{H}_4 + \text{H}_2 \quad\text{(making hydrogen)}$$</p>
<p><b>Why crack?</b></p>
<ol class="steps"><li>Fractional distillation produces <b>more long-chain</b> hydrocarbons than are needed, but <b>not enough short-chain</b> ones (e.g. petrol): <b>demand</b> for short chains exceeds <b>supply</b>.</li>
<li>Cracking converts the less useful long chains into <b>more useful</b> short-chain alkanes (fuels such as petrol).</li>
<li>It also produces <b>alkenes</b>, used to make <b>polymers</b> (plastics) and ethanol, and <b>hydrogen</b> (e.g. for the Haber process).</li></ol>
${(() => { const fr = [["gas", 4, 10], ["petrol", 9, 23], ["naphtha", 11, 13], ["kerosene", 12, 8], ["diesel", 21, 23], ["fuel oil + others", 43, 23]]; let s = F.line(130, 15, 130, 185, "k");
  fr.forEach(([n, sup, dem], i) => { const y = 20 + i * 28; s += F.text(124, y + 14, n, "tk small", "end") + F.rect(132, y, sup * 7, 10, "mS m thin") + F.rect(132, y + 11, dem * 7, 10, "cS c thin"); });
  s += F.key(370, 30, [["m", "supply from crude oil"], ["c", "demand"]]);
  return F.fig(540, 195, s, "Illustrative supply and demand for fractions (%). Cracking turns surplus long chains into the short chains in demand.", { size: "wide" }); })()}
<details class="check"><summary>Balance: C₁₄H₃₀ → C₈H₁₈ + ? C₂H₄</summary><div>Carbons: 14 − 8 = 6, so 3C₂H₄. Check H: 18 + 12 = 30 ✓.</div></details>`},

    { h: "Alkenes and the bromine-water test (11.4)", body: C`
<p class="lead">Alkenes are <b>unsaturated hydrocarbons</b> with a <b>C=C double bond</b>; general formula <b>CₙH₂ₙ</b>. The double bond makes them much more reactive than alkanes.</p>
<table class="t"><tr><th>Name</th><th>Formula</th><th>Structural formula</th></tr>
<tr><td>Ethene</td><td>C₂H₄</td><td>CH₂=CH₂</td></tr><tr><td>Propene</td><td>C₃H₆</td><td>CH₂=CHCH₃</td></tr><tr><td>But-1-ene</td><td>C₄H₈</td><td>CH₂=CHCH₂CH₃</td></tr><tr><td>But-2-ene</td><td>C₄H₈</td><td>CH₃CH=CHCH₃</td></tr></table>
<p><b>Test for unsaturation:</b> add <b>bromine water</b> (orange) and shake.</p>
<div class="viz" data-viz="bromineWater"></div>
<ul><li><b>Alkene</b> (unsaturated): bromine water turns from <b>orange to colourless</b>.</li><li><b>Alkane</b> (saturated): stays <b>orange</b>.</li></ul>
<div class="callout"><b>Wording:</b> say "decolourised" or "orange to colourless". "Goes clear" loses the mark: clear means transparent, and orange bromine water is already clear.</div>`},

    { h: "Addition reactions of alkenes (11.4)", body: C`
<p>In an <b>addition reaction</b>, the C=C double bond opens and atoms add on to each carbon. Only <b>one product</b> forms.</p>
<p><b>1. Bromine</b> (the test reaction), room temperature:</p>
${F.fig(520, 145, disp(10, 20, ["H   H", "|   |", "C===C", "|   |", "H   H"]) + F.text(95, 64, "+", "tk big") + F.text(140, 64, "Br–Br", "to bold") + F.arrow(190, 58, 250, 58, "k", 8) + disp(265, 20, ["  H  H", "  |  |", "H-C--C-H", "  |  |", "  Br Br"]) + F.text(140, 110, "orange", "to small") + F.text(330, 135, "1,2-dibromoethane (colourless)", "tm small"), "Ethene + bromine → 1,2-dibromoethane.", { size: "wide" })}
<p class="eq">$$\text{C}_2\text{H}_4 + \text{Br}_2 \rightarrow \text{C}_2\text{H}_4\text{Br}_2$$</p>
<p><b>2. Hydrogen</b> (hydrogenation) — gives an alkane. Conditions (S): <b>nickel catalyst</b>, ≈ 150 °C. Used to harden vegetable oils into margarine.</p>
<p class="eq">$$\text{CH}_2{=}\text{CH}_2 + \text{H}_2 \xrightarrow{\text{Ni}} \text{CH}_3\text{CH}_3$$</p>
<p><b>3. Steam</b> (hydration) — gives an alcohol. Conditions (S): <b>300 °C</b>, <b>6000 kPa</b> (60 atm), <b>phosphoric acid catalyst</b> H₃PO₄. This is how ethanol is made industrially.</p>
<p class="eq">$$\text{C}_2\text{H}_4\text{(g)} + \text{H}_2\text{O(g)} \rightleftharpoons \text{C}_2\text{H}_5\text{OH(g)}$$</p>
<p><b>4. Polymerisation:</b> many alkene molecules add to each other to make an addition polymer (see <i>Organic 2</i>).</p>
<details class="check"><summary>Name the product when propene reacts with hydrogen.</summary><div>Propane, C₃H₈.</div></details>`}
  ],
  worked: [
    { q: C`Draw the displayed formulae of the two isomers of C₄H₈ that are straight-chain alkenes, and name them.`,
      steps: [C`But-1-ene: CH₂=CH–CH₂–CH₃ (double bond between C1 and C2).`, C`But-2-ene: CH₃–CH=CH–CH₃ (double bond between C2 and C3).`, C`Check each C has 4 bonds and the molecular formula is C₄H₈ for both.`]},
    { q: C`Explain why petrol and diesel are collected at different heights in a fractionating column.`,
      steps: [C`The column is hotter at the bottom and cooler at the top.`, C`Diesel molecules have longer chains, so stronger intermolecular forces and a higher boiling point.`, C`Diesel condenses lower down (where it is hotter); petrol rises further before the temperature falls below its boiling point.`]},
    { q: C`C₁₆H₃₄ is cracked to give octane and ethene only. Write the equation.`,
      steps: [C`Octane is C₈H₁₈. Carbon left: 16 − 8 = 8, as ethene C₂H₄ → 4 molecules.`, C`$\text{C}_{16}\text{H}_{34} \rightarrow \text{C}_8\text{H}_{18} + 4\text{C}_2\text{H}_4$`, C`Check H: 18 + 16 = 34 ✓.`]}
  ],
  formulas: [["Alkanes", "CₙH₂ₙ₊₂"], ["Alkenes", "CₙH₂ₙ"], ["Alcohols", "CₙH₂ₙ₊₁OH"], ["Carboxylic acids", "CₙH₂ₙ₊₁COOH"], ["Substitution (UV)", C`$\text{CH}_4 + \text{Cl}_2 \rightarrow \text{CH}_3\text{Cl} + \text{HCl}$`], ["Hydration (S)", "C₂H₄ + H₂O → C₂H₅OH; 300 °C, 6000 kPa, H₃PO₄"], ["Hydrogenation (S)", "C₂H₄ + H₂ → C₂H₆; Ni catalyst"]],
  cards: [
    ["Hydrocarbon", "A compound of hydrogen and carbon only."],
    ["Homologous series (S)", "Same functional group and general formula; differ by CH₂; trend in physical properties; similar chemical properties."],
    ["Saturated (S)", "Only single C–C bonds."],
    ["Unsaturated (S)", "Contains C=C double (or triple) bonds."],
    ["Structural isomers (S)", "Same molecular formula, different structural formula."],
    ["Stems for 1–4 carbons", "Meth-, eth-, prop-, but-."],
    ["Functional group", "The atom/group that gives a compound its chemical properties."],
    ["Main constituent of natural gas", "Methane."],
    ["How does fractional distillation separate petroleum?", "By boiling point: vapours condense at different heights in a column with a temperature gradient."],
    ["Use of refinery gas", "Heating and cooking."],
    ["Use of naphtha", "Chemical feedstock."],
    ["Use of kerosene", "Jet fuel."],
    ["Use of bitumen", "Making roads."],
    ["Down the column, viscosity…", "Increases (and volatility decreases)."],
    ["Why are alkanes unreactive?", "Only strong single C–C and C–H bonds."],
    ["Alkane + chlorine conditions", "UV light (photochemical substitution)."],
    ["Products of CH₄ + Cl₂", "CH₃Cl + HCl."],
    ["Cracking conditions", "Heat (~600 °C) and catalyst (aluminium oxide / silica)."],
    ["Products of cracking", "Shorter alkanes, alkenes (and hydrogen)."],
    ["Why crack?", "Demand for short-chain fuels exceeds supply; makes alkenes for polymers."],
    ["Bromine water with an alkene", "Orange to colourless."],
    ["Type of reaction of alkenes", "Addition."],
    ["Conditions for making ethanol from ethene (S)", "Steam, 300 °C, 6000 kPa, phosphoric acid catalyst."],
    ["Catalyst for hydrogenation (S)", "Nickel."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`The general formula of the alkenes is`, opts: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙH₂ₙ₊₁OH"], ans: 1, why: C`CₙH₂ₙ.` },
    { type: "mcq", marks: 1, q: C`Which fraction is used as jet fuel?`, opts: ["naphtha", "kerosene", "bitumen", "fuel oil"], ans: 1, why: C`Kerosene/paraffin.` },
    { type: "mcq", marks: 1, q: C`Which fraction has the highest viscosity?`, opts: ["refinery gas", "petrol", "diesel", "bitumen"], ans: 3, why: C`Longest chains.` },
    { type: "mcq", marks: 1, q: C`Methane reacts with chlorine in`, opts: ["the dark", "UV light", "the presence of nickel", "water"], ans: 1, why: C`Photochemical substitution.` },
    { type: "mcq", marks: 1, q: C`Which is a structural isomer of butane?`, opts: ["butene", "methylpropane", "propane", "cyclobutane"], ans: 1, why: C`Both C₄H₁₀.` },
    { type: "mcq", marks: 1, q: C`Which compound decolourises bromine water?`, opts: ["C₂H₆", "C₃H₆", "C₄H₁₀", "CH₄"], ans: 1, why: C`C₃H₆ fits CₙH₂ₙ: propene.` },
    { type: "mcq", marks: 1, q: C`Ethene reacts with steam to form`, opts: ["ethane", "ethanol", "ethanoic acid", "poly(ethene)"], ans: 1, why: C`Hydration.` },
    { type: "struct", marks: 2, q: C`Draw the displayed formula of propane and state its molecular formula.`,
      ms: C`<b>B1</b> three C atoms in a chain, each with 4 bonds, 8 H atoms<br><b>B1</b> C₃H₈` },
    { type: "struct", marks: 3, q: C`S: State three characteristics of a homologous series.`,
      ms: C`<b>B1</b> same general formula<br><b>B1</b> successive members differ by CH₂<br><b>B1</b> similar chemical properties / same functional group / trend in physical properties` },
    { type: "struct", marks: 3, q: C`Describe how petroleum is separated into fractions.`,
      ms: C`<b>B1</b> crude oil heated / vaporised<br><b>B1</b> column hot at bottom, cooler at top (temperature gradient)<br><b>B1</b> fractions condense at different heights according to boiling point` },
    { type: "struct", marks: 3, q: C`Complete the equation for cracking and explain why cracking is carried out: C₁₂H₂₆ → C₈H₁₈ + ……`,
      ms: C`<b>B1</b> 2C₂H₄<br><b>B1</b> demand for shorter-chain alkanes (petrol) is greater than supply<br><b>B1</b> produces alkenes for making polymers / ethanol` },
    { type: "struct", marks: 3, q: C`Describe a test to distinguish between hexane and hexene, giving results for both.`,
      ms: C`<b>B1</b> add bromine water and shake<br><b>B1</b> hexene: orange to colourless<br><b>B1</b> hexane: stays orange` },
    { type: "struct", marks: 3, q: C`S: Write the equation for the manufacture of ethanol from ethene and state the conditions.`,
      ms: C`<b>B1</b> C₂H₄ + H₂O → C₂H₅OH<br><b>B1</b> 300 °C and 6000 kPa (60 atm)<br><b>B1</b> phosphoric acid catalyst` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: C`Name the main constituent of natural gas.`, ms: C`<b>B1</b> methane` },
    { d: 1, type: "mcq", marks: 1, q: C`The fraction used for making roads is`, opts: ["fuel oil", "bitumen", "lubricating oil", "naphtha"], ans: 1, why: C`Bitumen.` },
    { d: 1, type: "struct", marks: 2, q: C`Give the name and molecular formula of the alkane with three carbon atoms.`, ms: C`<b>B1</b> propane<br><b>B1</b> C₃H₈` },
    { d: 1, type: "struct", marks: 1, q: C`State what is meant by a hydrocarbon.`, ms: C`<b>B1</b> compound containing hydrogen and carbon only` },
    { d: 1, type: "mcq", marks: 1, q: C`Which type of reaction occurs between ethene and bromine?`, opts: ["substitution", "addition", "combustion", "cracking"], ans: 1, why: C`Addition.` },
    { d: 2, type: "struct", marks: 3, q: C`Describe and explain how the boiling point and viscosity change from the top to the bottom of the fractionating column.`, ms: C`<b>B1</b> boiling point increases<br><b>B1</b> viscosity increases<br><b>B1</b> chain length increases so stronger intermolecular forces` },
    { d: 2, type: "struct", marks: 3, q: C`Methane reacts with chlorine. (a) State the condition. (b) Name the type of reaction. (c) Write the equation.`, ms: C`<b>B1</b> UV light<br><b>B1</b> substitution (photochemical)<br><b>B1</b> CH₄ + Cl₂ → CH₃Cl + HCl` },
    { d: 2, type: "struct", marks: 2, q: C`S: Explain the difference between saturated and unsaturated hydrocarbons, giving an example of each.`, ms: C`<b>B1</b> saturated: only single C–C bonds, e.g. ethane<br><b>B1</b> unsaturated: contains C=C double bond, e.g. ethene` },
    { d: 2, type: "struct", marks: 2, q: C`S: Draw two structural isomers of C₄H₁₀ and name them.`, ms: C`<b>B1</b> butane (straight chain) correctly drawn<br><b>B1</b> methylpropane (branched) correctly drawn` },
    { d: 2, type: "mcq", marks: 1, q: C`Which equation shows cracking?`, opts: ["C₂H₄ + H₂ → C₂H₆", "C₈H₁₈ → C₆H₁₄ + C₂H₄", "CH₄ + 2O₂ → CO₂ + 2H₂O", "C₂H₄ + Br₂ → C₂H₄Br₂"], ans: 1, why: C`A longer alkane breaks into a shorter alkane and an alkene.` },
    { d: 3, type: "struct", marks: 4, q: C`S: An alkene P has a relative molecular mass of 56. (a) Deduce its molecular formula. (b) Draw two possible straight-chain isomers and name them. (c) Name the product of P with steam.`, ms: C`<b>C1</b> 14n = 56 so n = 4: C₄H₈<br><b>B1</b> but-1-ene drawn and named<br><b>B1</b> but-2-ene drawn and named<br><b>B1</b> butanol (butan-1-ol / butan-2-ol)` },
    { d: 3, type: "struct", marks: 5, q: C`Explain why an oil refinery cracks some of its fractions. Use the data: petrol supply 9%, demand 23%; fuel oil supply 43%, demand 23%. Include an example equation and two uses of the products.`, ms: C`<b>B1</b> demand for petrol exceeds supply; fuel oil supply exceeds demand<br><b>B1</b> cracking converts long chains into shorter, more useful ones<br><b>B1</b> correct balanced cracking equation (e.g. C₁₀H₂₂ → C₈H₁₈ + C₂H₄)<br><b>B1</b> short alkanes used as fuel (petrol)<br><b>B1</b> alkenes used to make polymers / ethanol` },
    { d: 3, type: "struct", marks: 4, q: C`S: 1.00 g of an alkene reacts exactly with 2.86 g of bromine (Br₂, Mr 160). Find the Mr of the alkene and identify it.`, ms: C`<b>C1</b> moles Br₂ = 2.86 / 160 = 0.0179<br><b>C1</b> 1:1 ratio so moles alkene = 0.0179<br><b>C1</b> Mr = 1.00 / 0.0179 = 56<br><b>A1</b> C₄H₈ (butene)` }
  ]
});
}
