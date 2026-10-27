window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
//@@HELPERS-START
// ---- diagram helpers for this topic ----
const ATOM = { H: ["m", 10], O: ["r", 16], C: ["k", 16], N: ["b", 15], Cl: ["g", 17], Na: ["o", 15] };
const ball = (x, y, el) => { const [c, r] = ATOM[el] || ["k", 14]; return F.circ(x, y, r, "bgF nostroke") + F.circ(x, y, r, c + "S " + c) + F.text(x, y + 4, el, "tk bold small"); };
const mol = (atoms, bonds, cap) => { let s = bonds.map(([a, b]) => F.line(atoms[a][0], atoms[a][1], atoms[b][0], atoms[b][1], "k thick")).join(""); atoms.forEach(([x, y, el]) => s += ball(x, y, el)); return F.fig(160, 130, s, cap, { size: "tiny" }); };
const h2 = (x, y) => ball(x - 9, y, "H") + ball(x + 9, y, "H");
const o2 = (x, y) => ball(x - 12, y, "O") + ball(x + 12, y, "O");
const h2o = (x, y) => ball(x, y, "O") + ball(x - 16, y + 12, "H") + ball(x + 16, y + 12, "H");
//@@HELPERS-END

/* ============================================================
   STOICHIOMETRY  (0620 2026–2028: 3.1, 3.2, 3.3)
   ============================================================ */
TOPICS.push({
  id: "moles", subject: "chemistry", unit: 3, title: "Stoichiometry & the mole",
  blurb: "Formulae, equations, relative masses, the mole, reacting masses, gas volumes, concentration, titrations, limiting reagents, yield and purity.",
  level: "Core → Supplement", demo: "mole",
  syllabus: [
    ["3.1", "State the formulae of elements and compounds; deduce formulae from models and diagrams", 0],
    ["3.1", "Deduce the formula of an ionic compound from the charges on its ions", 0],
    ["3.1", "Construct word equations and balanced symbol equations, including state symbols", 1],
    ["3.1 S", "Construct ionic equations and ionic half-equations", 2],
    ["3.2", "Relative atomic mass $A_r$ and relative formula mass $M_r$; reacting masses in simple proportions", 3],
    ["3.3 S", "The mole and the Avogadro constant ($6.02\\times10^{23}$); $n=m/M_r$", 4],
    ["3.3 S", "Calculate stoichiometric reacting masses", 5],
    ["3.3 S", "Molar gas volume: 24 dm³ at r.t.p.; volumes of gases", 6],
    ["3.3 S", "Concentration in mol/dm³ and g/dm³; volumes of solutions; titration calculations", 7],
    ["3.3 S", "Limiting reactants and reactants in excess", 8],
    ["3.1 S / 3.3 S", "Define and calculate empirical and molecular formulae; water of crystallisation", 9],
    ["3.3 S", "Percentage yield, percentage composition by mass and percentage purity", 10]
  ],
  sections: [
    { h: "Chemical formulae (3.1)", body: C`
<p class="lead">A chemical formula tells you <b>which elements</b> are in a substance and <b>in what ratio</b> their atoms are combined.</p>
<p>In $\text{H}_2\text{SO}_4$: 2 hydrogen, 1 sulfur and 4 oxygen atoms. A subscript applies only to the symbol just before it. Brackets multiply everything inside: $\text{Ca(OH)}_2$ contains 1 Ca, 2 O and 2 H. A big number in front multiplies the whole formula: $3\text{H}_2\text{O}$ is 3 molecules, so 6 H and 3 O.</p>
<h3>Elements</h3>
<p>Most elements are written as their symbol: Fe, Cu, C, Na. But seven elements exist as <b>diatomic molecules</b> (two atoms bonded together): $\text{H}_2$, $\text{N}_2$, $\text{O}_2$, $\text{F}_2$, $\text{Cl}_2$, $\text{Br}_2$, $\text{I}_2$. Writing "O" for oxygen gas in an equation is a common error.</p>
<h3>Formulae from models and diagrams</h3>
<div class="sym-grid">${mol([[80, 60, "O"], [50, 84, "H"], [110, 84, "H"]], [[0, 1], [0, 2]], "water, H₂O")}${mol([[80, 64, "C"], [38, 64, "O"], [122, 64, "O"]], [[0, 1], [0, 2]], "carbon dioxide, CO₂")}${mol([[80, 64, "C"], [80, 28, "H"], [80, 100, "H"], [44, 64, "H"], [116, 64, "H"]], [[0, 1], [0, 2], [0, 3], [0, 4]], "methane, CH₄")}${mol([[80, 56, "N"], [48, 84, "H"], [80, 98, "H"], [112, 84, "H"]], [[0, 1], [0, 2], [0, 3]], "ammonia, NH₃")}${mol([[60, 64, "H"], [96, 64, "Cl"]], [[0, 1]], "hydrogen chloride, HCl")}</div>
<p>Count each kind of atom in the model and write the symbols with subscripts. For organic compounds, carbon is written first, then hydrogen, then other elements.</p>
<h3>Ionic formulae: make the charges cancel</h3>
<p>Ionic compounds are made of positive and negative ions, and the compound has <b>no overall charge</b>. So the total positive charge must equal the total negative charge.</p>
<table class="t"><tr><th>Charge</th><th>Positive ions</th><th>Negative ions</th></tr>
<tr><td>1</td><td>$\text{H}^+$, $\text{Li}^+$, $\text{Na}^+$, $\text{K}^+$, $\text{Ag}^+$, $\text{NH}_4^{\ +}$ (ammonium)</td><td>$\text{F}^-$, $\text{Cl}^-$, $\text{Br}^-$, $\text{I}^-$, $\text{OH}^-$ (hydroxide), $\text{NO}_3^{\ -}$ (nitrate)</td></tr>
<tr><td>2</td><td>$\text{Mg}^{2+}$, $\text{Ca}^{2+}$, $\text{Ba}^{2+}$, $\text{Zn}^{2+}$, $\text{Cu}^{2+}$, $\text{Fe}^{2+}$</td><td>$\text{O}^{2-}$, $\text{S}^{2-}$, $\text{SO}_4^{\ 2-}$ (sulfate), $\text{CO}_3^{\ 2-}$ (carbonate)</td></tr>
<tr><td>3</td><td>$\text{Al}^{3+}$, $\text{Fe}^{3+}$</td><td>$\text{N}^{3-}$, $\text{PO}_4^{\ 3-}$ (phosphate)</td></tr></table>
<p>Main-group ions follow from the group number: Groups I, II and III form +1, +2 and +3; Groups V, VI and VII form −3, −2 and −1.</p>
${(() => { let s = ""; [[40, "Al³⁺", "o"], [110, "Al³⁺", "o"]].forEach(([x, t, c]) => s += F.rect(x, 30, 60, 40, c + "S " + c, 8) + F.text(x + 30, 56, t, "tk bold"));
  [[30, "O²⁻"], [100, "O²⁻"], [170, "O²⁻"]].forEach(([x, t]) => s += F.rect(x, 100, 60, 40, "bS b", 8) + F.text(x + 30, 126, t, "tk bold"));
  s += F.text(260, 56, "2 × (+3) = +6", "to bold", "start") + F.text(260, 126, "3 × (−2) = −6", "tb bold", "start") + F.text(260, 166, "total 0 → Al₂O₃", "tk bold big", "start");
  return F.fig(440, 180, s, "Aluminium oxide: two Al³⁺ (+6) balance three O²⁻ (−6), so the formula is Al₂O₃.", { size: "small" }); })()}
<p><b>Shortcut (swap and drop):</b> write each ion's charge number as the <i>other</i> ion's subscript, then simplify. $\text{Al}^{3+}\text{O}^{2-}\to\text{Al}_2\text{O}_3$. $\;\text{Mg}^{2+}\text{O}^{2-}\to\text{Mg}_2\text{O}_2\to\text{MgO}$ (simplify).</p>
<p><b>Use brackets</b> round a polyatomic ion when you need more than one: calcium hydroxide is $\text{Ca(OH)}_2$ (not $\text{CaOH}_2$, which would mean 2 hydrogens but one oxygen). Ammonium sulfate is $(\text{NH}_4)_2\text{SO}_4$.</p>
<div class="callout tip"><b class="t">Names give clues</b>"-ide" usually means just two elements (sodium chlor<b>ide</b>, NaCl), except hydroxide. "-ate" means the ion contains oxygen (sulf<b>ate</b> SO₄²⁻, nitr<b>ate</b> NO₃⁻, carbon<b>ate</b> CO₃²⁻). Roman numerals give the metal's charge: iron(III) oxide is Fe³⁺, so Fe₂O₃; copper(II) sulfate is Cu²⁺, so CuSO₄.</div>
<details class="check"><summary>Write the formulae of: calcium chloride, sodium sulfate, iron(III) hydroxide, ammonium nitrate.</summary><div>CaCl₂, Na₂SO₄, Fe(OH)₃, NH₄NO₃.</div></details>`},

    { h: "Word and symbol equations (3.1)", body: C`
<p class="lead">An equation shows the <b>reactants</b> (on the left) turning into <b>products</b> (on the right). Atoms are never created or destroyed in a reaction; they're just rearranged. So a symbol equation must have the <b>same number of each type of atom on both sides</b>.</p>
<p>Word equation: magnesium + oxygen → magnesium oxide. Symbol equation: $2\text{Mg}+\text{O}_2\rightarrow2\text{MgO}$.</p>
${(() => { let s = h2(50, 60) + h2(50, 110) + F.text(100, 92, "+", "tk bold big") + o2(150, 85) + F.arrow(190, 85, 250, 85, "k thick", 10) + h2o(300, 55) + h2o(300, 110);
  s += F.text(50, 150, "2H₂", "tk bold") + F.text(150, 150, "O₂", "tk bold") + F.text(300, 150, "2H₂O", "tk bold") + F.text(110, 182, "4 H + 2 O", "tk small") + F.text(300, 182, "4 H + 2 O ✓", "tg small bold");
  return F.fig(360, 200, s, "$2\\text{H}_2+\\text{O}_2\\rightarrow2\\text{H}_2\\text{O}$: the same 4 hydrogen and 2 oxygen atoms appear on each side, just rearranged.", { size: "small" }); })()}
<h3>How to balance</h3>
<ol class="steps-inline"><li>Write the <b>correct formulae</b> for every substance. These never change from now on.</li>
<li>Count the atoms of each element on each side (a little table helps).</li>
<li>Balance by putting <b>numbers in front</b> of formulae. Start with an element that appears in only one substance on each side; leave H and O (and any element appearing on its own as an element) until last.</li>
<li>Re-count after every change, until everything balances.</li>
<li>Check the coefficients are the lowest whole numbers.</li></ol>
<div class="callout ex"><b class="t">Worked example</b>Balance $\text{Fe}_2\text{O}_3+\text{CO}\rightarrow\text{Fe}+\text{CO}_2$.<br>Fe: 2 on the left, so put 2 in front of Fe on the right.<br>O: the left has 3 (in Fe₂O₃) + 1 (in CO) = 4, and the right has 2 per CO₂. Each CO takes one O to become CO₂, so 3 O from Fe₂O₃ need $3\text{CO}\rightarrow3\text{CO}_2$.<br>$\text{Fe}_2\text{O}_3+3\text{CO}\rightarrow2\text{Fe}+3\text{CO}_2$. Check: Fe 2=2, C 3=3, O 6=6 ✓</div>
<div class="callout warn"><b class="t">Never change subscripts</b>Changing $\text{H}_2\text{O}$ to $\text{H}_2\text{O}_2$ to balance the oxygens changes water into hydrogen peroxide, a different substance. Only the big numbers in front may change.</div>
<h3>State symbols</h3>
<table class="t"><tr><th>Symbol</th><th>Meaning</th><th>Examples</th></tr>
<tr><td>(s)</td><td>solid</td><td>metals, precipitates, CaCO₃</td></tr><tr><td>(l)</td><td>liquid</td><td>water, molten substances, ethanol</td></tr>
<tr><td>(g)</td><td>gas</td><td>H₂, O₂, CO₂, Cl₂</td></tr><tr><td>(aq)</td><td>aqueous: dissolved in water</td><td>acids, alkalis, salt solutions</td></tr></table>
<p>Water itself is (l), not (aq). An insoluble product that forms in solution (a precipitate) is (s).</p>
<details class="check"><summary>Balance: $\text{C}_3\text{H}_8+\text{O}_2\rightarrow\text{CO}_2+\text{H}_2\text{O}$.</summary><div>C: $3\text{CO}_2$. H: $4\text{H}_2\text{O}$. O on the right $=6+4=10$, so $5\text{O}_2$. Answer: $\text{C}_3\text{H}_8+5\text{O}_2\rightarrow3\text{CO}_2+4\text{H}_2\text{O}$.</div></details>
<details class="check"><summary>Write a balanced equation with state symbols for calcium carbonate reacting with hydrochloric acid.</summary><div>$\text{CaCO}_3(\text{s})+2\text{HCl}(\text{aq})\rightarrow\text{CaCl}_2(\text{aq})+\text{H}_2\text{O}(\text{l})+\text{CO}_2(\text{g})$</div></details>`},

    { h: "Ionic equations and half-equations (3.1 S)", body: C`
<p class="lead">Many reactions happen between ions in solution. An <b>ionic equation</b> shows only the ions and molecules that actually change, leaving out the <b>spectator ions</b>, which are present but unchanged.</p>
${(() => { let s = F.path("M40,40 L40,180 Q40,200 60,200 L240,200 Q260,200 260,180 L260,40", "k") + F.rect(42, 80, 216, 118, "bS nostroke");
  const ions = [[70, 110, "Na⁺", "m"], [120, 150, "Cl⁻", "m"], [170, 120, "Na⁺", "m"], [220, 165, "Cl⁻", "m"], [95, 175, "Ag⁺", "r"], [200, 95, "NO₃⁻", "m"], [150, 100, "NO₃⁻", "m"]];
  ions.forEach(([x, y, t, c]) => s += F.text(x, y, t, (c === "m" ? "tm" : "tr") + " bold"));
  s += F.rect(130, 168, 50, 22, "k mS", 4) + F.text(155, 184, "AgCl", "tk bold small");
  s += F.text(300, 90, "Na⁺ and NO₃⁻ stay dissolved,", "tm small", "start") + F.text(300, 108, "unchanged: spectators", "tm small bold", "start") + F.text(300, 150, "Ag⁺ + Cl⁻ → AgCl(s)", "tr bold", "start") + F.text(300, 168, "is the real reaction", "tr small", "start");
  return F.fig(500, 220, s, "Silver nitrate + sodium chloride: only the silver and chloride ions actually react to form the white precipitate.", { size: "small" }); })()}
<h3>How to write one</h3>
<ol class="steps-inline"><li>Write the balanced full equation with state symbols: $\text{AgNO}_3(\text{aq})+\text{NaCl}(\text{aq})\rightarrow\text{AgCl}(\text{s})+\text{NaNO}_3(\text{aq})$.</li>
<li>Split every <b>aqueous ionic</b> compound into its ions. Leave solids, liquids, gases and covalent molecules as they are.</li>
<li>Cross out the ions that appear unchanged on both sides (the spectators): here $\text{Na}^+$ and $\text{NO}_3^-$.</li>
<li>Write what's left: $\text{Ag}^+(\text{aq})+\text{Cl}^-(\text{aq})\rightarrow\text{AgCl}(\text{s})$. Check that the atoms <b>and the charges</b> balance.</li></ol>
<table class="t"><tr><th>Reaction type</th><th>Ionic equation</th></tr>
<tr><td>Any acid + any alkali (neutralisation)</td><td>$\text{H}^+(\text{aq})+\text{OH}^-(\text{aq})\rightarrow\text{H}_2\text{O}(\text{l})$</td></tr>
<tr><td>Precipitation of a halide with silver nitrate</td><td>$\text{Ag}^+(\text{aq})+\text{Cl}^-(\text{aq})\rightarrow\text{AgCl}(\text{s})$</td></tr>
<tr><td>Metal displacement</td><td>$\text{Zn}(\text{s})+\text{Cu}^{2+}(\text{aq})\rightarrow\text{Zn}^{2+}(\text{aq})+\text{Cu}(\text{s})$</td></tr>
<tr><td>Acid + carbonate</td><td>$2\text{H}^+(\text{aq})+\text{CO}_3^{\ 2-}\rightarrow\text{H}_2\text{O}(\text{l})+\text{CO}_2(\text{g})$</td></tr></table>
<h3>Half-equations</h3>
<p>A <b>half-equation</b> shows one species gaining or losing <b>electrons</b> ($e^-$). Atoms and charges must both balance.</p>
<ul><li>$\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}$: copper ions <b>gain</b> electrons. Gain of electrons is <b>reduction</b> (at the cathode in electrolysis).</li>
<li>$2\text{Cl}^-\rightarrow\text{Cl}_2+2e^-$: chloride ions <b>lose</b> electrons. Loss of electrons is <b>oxidation</b> (at the anode).</li>
<li>$\text{Zn}\rightarrow\text{Zn}^{2+}+2e^-$ and $\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}$ add to give the displacement equation above. The electrons cancel.</li></ul>
<p>Memory aid: <b>OIL RIG</b>, Oxidation Is Loss, Reduction Is Gain (of electrons).</p>
<details class="check"><summary>Write the ionic equation for magnesium reacting with dilute hydrochloric acid.</summary><div>$\text{Mg}(\text{s})+2\text{H}^+(\text{aq})\rightarrow\text{Mg}^{2+}(\text{aq})+\text{H}_2(\text{g})$. The chloride ions are spectators.</div></details>`},

    { h: "Relative masses (3.2)", body: C`
<p class="lead">Atoms are far too light to weigh in grams usefully (a carbon atom is about $2\times10^{-23}$ g), so chemists compare their masses to a standard instead.</p>
<p><b>Relative atomic mass ($A_r$)</b>: the <b>average mass of the isotopes</b> of an element compared with $\tfrac1{12}$ of the mass of an atom of carbon-12. It's a ratio, so it has <b>no units</b>. It's an average because most elements are a mixture of isotopes. Chlorine is 35.5 because it's roughly 75% $^{35}\text{Cl}$ and 25% $^{37}\text{Cl}$.</p>
<p><b>Relative formula mass ($M_r$)</b>: the <b>sum of the relative atomic masses</b> of all the atoms in the formula. (For molecules it's also called relative molecular mass.)</p>
<div class="callout ex"><b class="t">Worked examples</b>$M_r(\text{H}_2\text{SO}_4)=2(1)+32+4(16)=98$<br>$M_r(\text{Ca(OH)}_2)=40+2(16+1)=74$: the bracket doubles both O and H.<br>$M_r((\text{NH}_4)_2\text{SO}_4)=2(14+4)+32+64=132$<br>$M_r(\text{CuSO}_4\cdot5\text{H}_2\text{O})=64+32+64+5(18)=250$</div>
<h3>Reacting masses in simple proportions (Core)</h3>
<p>Because the ratio is fixed, masses scale in proportion. If 100 g of calcium carbonate decomposes to give 56 g of calcium oxide, then:</p>
<ul><li>50 g gives 28 g (halve both),</li><li>25 g gives $56\times\tfrac{25}{100}=14$ g,</li><li>1 tonne gives 0.56 tonnes.</li></ul>
<p>You can use $M_r$ values directly for 1 : 1 reactions: $\text{CaCO}_3\rightarrow\text{CaO}+\text{CO}_2$ means 100 g → 56 g + 44 g (and 100 = 56 + 44, so mass is conserved).</p>
<details class="check"><summary>Calculate $M_r$ of aluminium sulfate, Al₂(SO₄)₃ ($A_r$: Al 27, S 32, O 16).</summary><div>$2(27)+3(32+64)=54+288=342$.</div></details>`},

    { h: "The mole (3.3 S)", body: C`
<p class="lead">Chemists count atoms in packs, just as eggs come in dozens. One <b>mole</b> is $6.02\times10^{23}$ particles: the <b>Avogadro constant</b>.</p>
<p>The number is chosen so that one mole of any substance has a mass <b>in grams</b> equal to its $A_r$ or $M_r$. One mole of carbon atoms is 12 g; one mole of water molecules is 18 g; one mole of sodium chloride is 58.5 g. The mole is the bridge between what you can <b>weigh</b> (grams) and what actually <b>reacts</b> (particles).</p>
$$n=\frac{m}{M_r}\qquad\text{moles}=\frac{\text{mass in g}}{M_r}\qquad m=n\times M_r$$
${(() => { const box = (x, y, t1, t2, c) => F.rect(x - 70, y - 26, 140, 52, c + "S " + c, 10) + F.text(x, y - 3, t1, "tk bold") + F.text(x, y + 15, t2, "tm small");
  let s = box(270, 140, "MOLES", "n", "c") + box(80, 50, "mass", "g", "o") + box(460, 50, "particles", "atoms / molecules", "b") + box(80, 230, "gas volume", "dm³ at r.t.p.", "g") + box(460, 230, "solution", "conc. × volume", "r");
  s += F.arrow(150, 66, 200, 118, "k mid", 8) + F.text(150, 108, "÷ Mr", "tk small bold", "end") + F.arrow(205, 128, 155, 76, "m thin", 7) + F.text(196, 82, "× Mr", "tm small", "start");
  s += F.arrow(390, 66, 340, 118, "k mid", 8) + F.text(392, 108, "÷ 6.02×10²³", "tk small bold", "start") + F.arrow(338, 126, 388, 76, "m thin", 7);
  s += F.arrow(150, 214, 200, 162, "k mid", 8) + F.text(150, 178, "÷ 24", "tk small bold", "end") + F.arrow(205, 156, 155, 206, "m thin", 7) + F.text(198, 206, "× 24", "tm small", "start");
  s += F.arrow(390, 214, 340, 162, "k mid", 8) + F.text(392, 178, "c × V(dm³)", "tk small bold", "start") + F.arrow(338, 156, 388, 206, "m thin", 7);
  return F.fig(540, 270, s, "The mole map: every quantity converts to and from moles. Calculations almost always go through moles.", { size: "wide" }); })()}
<ul><li>Mass → moles: $\;n=\dfrac{m}{M_r}$. Example: $36$ g of water is $\dfrac{36}{18}=2.0$ mol.</li>
<li>Moles → particles: $\;N=n\times6.02\times10^{23}$. Example: 2.0 mol of water is $1.20\times10^{24}$ molecules.</li>
<li>Careful with what's being counted: 1 mol of $\text{H}_2\text{O}$ is $6.02\times10^{23}$ <b>molecules</b> but contains $3\times6.02\times10^{23}$ <b>atoms</b> and $2\times6.02\times10^{23}$ H atoms.</li></ul>
<p>Use the interactive jars at the end of this lesson: each jar is one mole.</p>
<details class="check"><summary>How many moles are in 8.0 g of oxygen gas? How many molecules?</summary><div>$M_r(\text{O}_2)=32$, so $n=0.25$ mol, which is $1.51\times10^{23}$ molecules.</div></details>`},

    { h: "Reacting masses (3.3 S)", body: C`
<p class="lead">A balanced equation gives the <b>mole ratio</b> of the substances, not the mass ratio. $2\text{Mg}+\text{O}_2\rightarrow2\text{MgO}$ means 2 <i>moles</i> of Mg react with 1 <i>mole</i> of O₂. That's 48 g with 32 g, not 2 g with 1 g.</p>
<div class="viz" data-viz="threeStep"></div>
<ol class="steps-inline"><li><b>Known substance → moles</b> ($n=m/M_r$, or from a gas volume or a solution).</li>
<li><b>Mole ratio</b> from the balanced equation: $n_{\text{wanted}}=n_{\text{known}}\times\dfrac{\text{coefficient of wanted}}{\text{coefficient of known}}$.</li>
<li><b>Moles → answer</b> (mass $=n\times M_r$, volume $=n\times24$, concentration $=n\div V$).</li></ol>
<div class="callout ex"><b class="t">Worked example</b>What mass of iron is produced from 32 g of iron(III) oxide? $\text{Fe}_2\text{O}_3+3\text{CO}\rightarrow2\text{Fe}+3\text{CO}_2$<br>1. $M_r(\text{Fe}_2\text{O}_3)=2(56)+3(16)=160$, so $n=\dfrac{32}{160}=0.20$ mol.<br>2. Ratio Fe₂O₃ : Fe $=1:2$, so $n(\text{Fe})=0.40$ mol.<br>3. Mass $=0.40\times56=22.4$ g.</div>
<p>A tidy layout earns method marks even if the final answer slips:</p>
<table class="t"><tr><th></th><th>Fe₂O₃</th><th>Fe</th></tr><tr><td>mass (g)</td><td>32</td><td><b>22.4</b></td></tr><tr><td>$M_r$</td><td>160</td><td>56</td></tr><tr><td>moles</td><td>0.20</td><td>0.40</td></tr><tr><td>ratio</td><td>1</td><td>2</td></tr></table>
<div class="callout warn"><b class="t">Common mistakes</b>Using an unbalanced equation. Using the mass ratio (32 g → 32 g × 2). Using $A_r$ instead of $M_r$ for diatomic gases ($\text{O}_2$ is 32, not 16). Rounding moles too early: keep at least 3 significant figures until the end.</div>
<details class="check"><summary>What mass of oxygen is needed to burn 6.0 g of magnesium? $2\text{Mg}+\text{O}_2\rightarrow2\text{MgO}$</summary><div>$n(\text{Mg})=6.0/24=0.25$ mol; $n(\text{O}_2)=0.125$ mol; mass $=0.125\times32=4.0$ g.</div></details>`},

    { h: "Gas volumes (3.3 S)", body: C`
<p class="lead">One mole of <b>any</b> gas occupies <b>24 dm³</b> (24 000 cm³) at room temperature and pressure (r.t.p., about 20 °C and 1 atmosphere).</p>
$$V(\text{dm}^3)=n\times24\qquad n=\frac{V}{24}$$
<p><b>Why is it the same for every gas?</b> In a gas the particles are very far apart compared with their own size. The volume is almost entirely empty space, so it depends on the <b>number</b> of particles, not on what they are. A mole of tiny hydrogen molecules and a mole of big carbon dioxide molecules fill the same space.</p>
<p>So for gases at the same temperature and pressure, the <b>volume ratio equals the mole ratio</b>. In $\text{N}_2(\text{g})+3\text{H}_2(\text{g})\rightarrow2\text{NH}_3(\text{g})$, 20 cm³ of N₂ reacts with 60 cm³ of H₂ to make 40 cm³ of NH₃. No $M_r$ is needed.</p>
<div class="callout ex"><b class="t">Worked example</b>What volume of CO₂ (at r.t.p.) is produced when 10.0 g of calcium carbonate reacts with excess hydrochloric acid? $\text{CaCO}_3+2\text{HCl}\rightarrow\text{CaCl}_2+\text{H}_2\text{O}+\text{CO}_2$<br>$n(\text{CaCO}_3)=\dfrac{10.0}{100}=0.100$ mol. Ratio 1 : 1, so $n(\text{CO}_2)=0.100$ mol.<br>$V=0.100\times24=2.40$ dm³ $=2400$ cm³.</div>
<div class="callout warn"><b class="t">Units</b>24 dm³ or 24 000 cm³, and 1 dm³ = 1000 cm³. Check whether the question wants dm³ or cm³.</div>
<details class="check"><summary>What mass of hydrogen gas occupies 6.0 dm³ at r.t.p.?</summary><div>$n=6.0/24=0.25$ mol; mass $=0.25\times2=0.50$ g.</div></details>`},

    { h: "Concentration and titrations (3.3 S)", body: C`
$$c=\frac{n}{V}\qquad n=c\times V\qquad(\text{mol/dm}^3,\ V\text{ in dm}^3)$$
<p class="lead">The <b>concentration</b> of a solution tells you how much solute is dissolved in each dm³ of solution. A 2.0 mol/dm³ solution has 2.0 moles in every litre.</p>
<ul><li>Convert cm³ to dm³ by <b>dividing by 1000</b>: 25.0 cm³ = 0.0250 dm³.</li>
<li>Concentration in <b>g/dm³</b> = concentration in mol/dm³ × $M_r$. Example: 0.20 mol/dm³ NaOH is $0.20\times40=8.0$ g/dm³.</li></ul>
<h3>Titration</h3>
${(() => { let s = F.rect(220, 20, 24, 170, "k bgF") + F.rect(222, 60, 20, 130, "bS nostroke") + F.path("M220,190 L228,214 L236,214 L244,190", "k") + F.line(232, 214, 232, 226, "k mid");
  for (let i = 0; i < 12; i++) s += F.line(220, 30 + i * 14, 228, 30 + i * 14, "k thin"); s += F.rect(244, 196, 18, 8, "k mS") + F.text(268, 204, "tap", "tk small", "start");
  s += F.path("M200,240 L180,300 Q178,310 190,310 L274,310 Q286,310 284,300 L264,240 Z", "k gS") + F.rect(212, 228, 40, 14, "k bgF") + F.text(232, 330, "conical flask: alkali + indicator", "tk small");
  s += F.text(258, 50, "burette: acid", "tk small bold", "start") + F.rect(150, 312, 164, 8, "mS m");
  s += F.text(40, 80, "Read the burette at the", "tm small", "start") + F.text(40, 96, "bottom of the meniscus,", "tm small", "start") + F.text(40, 112, "at eye level", "tm small", "start");
  return F.fig(400, 340, s, "Titration: acid from the burette is added to a measured volume of alkali (from a pipette) until the indicator just changes colour (the end-point).", { size: "small" }); })()}
<ol class="steps-inline"><li>Use a <b>pipette</b> to measure exactly 25.0 cm³ of the alkali into a conical flask. Add a few drops of indicator (e.g. methyl orange or phenolphthalein).</li>
<li>Fill a <b>burette</b> with the acid and record the initial reading.</li>
<li>Add acid, swirling, until the indicator <b>just</b> changes colour. Near the end, add it drop by drop. Record the final reading. The <b>titre</b> is the volume added.</li>
<li>The first (rough) run finds the approximate end-point. Repeat until you have <b>concordant</b> titres (within 0.10 cm³ of each other) and average those, ignoring the rough one.</li></ol>
<table class="t"><tr><th></th><th>Rough</th><th>1</th><th>2</th><th>3</th></tr><tr><td>Final (cm³)</td><td>23.40</td><td>45.85</td><td>22.65</td><td>45.20</td></tr><tr><td>Initial (cm³)</td><td>0.00</td><td>23.40</td><td>0.10</td><td>22.65</td></tr><tr><td>Titre (cm³)</td><td>23.40</td><td><b>22.45</b></td><td><b>22.55</b></td><td><b>22.55</b></td></tr></table>
<p>Mean of concordant titres $=\dfrac{22.45+22.55+22.55}{3}=22.52$ cm³.</p>
<div class="callout ex"><b class="t">Worked example</b>25.0 cm³ of NaOH is neutralised by 22.5 cm³ of 0.100 mol/dm³ H₂SO₄. $2\text{NaOH}+\text{H}_2\text{SO}_4\rightarrow\text{Na}_2\text{SO}_4+2\text{H}_2\text{O}$. Find the NaOH concentration.<br>1. $n(\text{H}_2\text{SO}_4)=0.100\times\dfrac{22.5}{1000}=0.00225$ mol.<br>2. Ratio NaOH : H₂SO₄ $=2:1$, so $n(\text{NaOH})=0.00450$ mol.<br>3. $c=\dfrac{0.00450}{0.0250}=0.180$ mol/dm³ $\;(=0.180\times40=7.20$ g/dm³).</div>
<details class="check"><summary>How many grams of NaCl are needed to make 250 cm³ of a 0.40 mol/dm³ solution?</summary><div>$n=0.40\times0.250=0.10$ mol; mass $=0.10\times58.5=5.85$ g.</div></details>`},

    { h: "Limiting reactants (3.3 S)", body: C`
<p class="lead">Reactants are rarely mixed in exactly the ratio of the equation. One runs out first: the <b>limiting reactant</b>. It decides how much product forms. The other is <b>in excess</b>, and some is left over at the end.</p>
${(() => { let s = ""; [[40, 40], [40, 90], [40, 140], [90, 65], [90, 115]].forEach(([x, y]) => s += h2(x, y)); [[160, 50], [160, 100], [160, 150]].forEach(([x, y]) => s += o2(x, y));
  s += F.text(65, 186, "5 H₂", "tk bold") + F.text(160, 186, "3 O₂", "tk bold") + F.arrow(205, 100, 255, 100, "k thick", 10);
  [[300, 40], [350, 40], [300, 95], [350, 95], [325, 150]].forEach(([x, y]) => s += h2o(x, y)); s += o2(430, 95) + F.text(325, 196, "5 H₂O", "tk bold") + F.text(430, 130, "½ O₂", "tr bold") + F.text(430, 148, "left over", "tr small");
  return F.fig(480, 210, s, "5 H₂ + 3 O₂: the 5 H₂ need only 2½ O₂ ($2\\text{H}_2+\\text{O}_2\\rightarrow2\\text{H}_2\\text{O}$). Hydrogen runs out first, so it's limiting; ½ O₂ is left over.", { size: "small" }); })()}
<ol class="steps-inline"><li>Calculate the moles of <b>each</b> reactant.</li><li>Divide each by its <b>coefficient</b> in the balanced equation.</li><li>The <b>smaller</b> result is the limiting reactant.</li><li>Do all product calculations from the limiting reactant.</li></ol>
<div class="callout ex"><b class="t">Worked example</b>2.4 g of Mg is added to 100 cm³ of 1.0 mol/dm³ HCl. $\text{Mg}+2\text{HCl}\rightarrow\text{MgCl}_2+\text{H}_2$. Find the limiting reactant and the volume of H₂.<br>$n(\text{Mg})=\dfrac{2.4}{24}=0.10$ mol. $n(\text{HCl})=1.0\times0.100=0.10$ mol.<br>Divide by coefficients: Mg $0.10\div1=0.10$; HCl $0.10\div2=0.050$. HCl is smaller, so <b>HCl is limiting</b>. (0.10 mol Mg would need 0.20 mol HCl.)<br>$n(\text{H}_2)=0.10\div2=0.050$ mol, so $V=0.050\times24=1.2$ dm³. Mass of Mg left over: $0.050\times24=1.2$ g.</div>
<div class="callout key"><b class="t">Where you'll see this again</b>In rates experiments, the limiting reactant fixes the <b>final volume</b> of gas (where the graph flattens). In industry, the cheaper reactant is used in excess so that all of the expensive one reacts.</div>
<details class="check"><summary>10 g of CaCO₃ is added to 0.10 mol of HCl. Which is limiting? $\text{CaCO}_3+2\text{HCl}\rightarrow\ldots$</summary><div>$n(\text{CaCO}_3)=0.10$ mol needs 0.20 mol HCl, but only 0.10 mol is present, so HCl is limiting.</div></details>`},

    { h: "Empirical and molecular formulae (3.1 S, 3.3 S)", body: C`
<p class="lead"><b>Empirical formula</b>: the simplest whole-number ratio of atoms of each element in a compound. <b>Molecular formula</b>: the actual number of atoms of each element in one molecule.</p>
<table class="t"><tr><th>Compound</th><th>Molecular</th><th>Empirical</th></tr><tr><td>Glucose</td><td>C₆H₁₂O₆</td><td>CH₂O</td></tr><tr><td>Ethene</td><td>C₂H₄</td><td>CH₂</td></tr><tr><td>Hydrogen peroxide</td><td>H₂O₂</td><td>HO</td></tr><tr><td>Water</td><td>H₂O</td><td>H₂O</td></tr></table>
<h3>Finding an empirical formula</h3>
<table class="t"><tr><th></th><th>C</th><th>H</th><th>O</th></tr><tr><td>% (or mass)</td><td>40.0</td><td>6.7</td><td>53.3</td></tr><tr><td>÷ $A_r$</td><td>40.0/12 = 3.33</td><td>6.7/1 = 6.7</td><td>53.3/16 = 3.33</td></tr><tr><td>÷ smallest</td><td>1</td><td>2</td><td>1</td></tr></table>
<p>Empirical formula: <b>CH₂O</b>. If a ratio comes out as 1.5, 1.33 or 1.25, multiply all of them by 2, 3 or 4 to reach whole numbers. Never round 1.5 to 2.</p>
<h3>From empirical to molecular formula</h3>
<p>Divide the $M_r$ by the empirical formula mass, and multiply the empirical formula by the answer. Above, if $M_r=60$: $\dfrac{60}{30}=2$, so the molecular formula is <b>C₂H₄O₂</b> (ethanoic acid).</p>
<h3>From experimental masses</h3>
<p>If 2.40 g of magnesium burns to give 4.00 g of oxide, the oxygen gained is $4.00-2.40=1.60$ g. Then Mg: $\dfrac{2.40}{24}=0.100$ and O: $\dfrac{1.60}{16}=0.100$, a 1 : 1 ratio, so <b>MgO</b>.</p>
<h3>Water of crystallisation</h3>
<p>Hydrated salts contain water molecules within their crystals, e.g. $\text{CuSO}_4\cdot5\text{H}_2\text{O}$. Heating to <b>constant mass</b> drives off all the water, leaving the anhydrous salt. Then find the moles of anhydrous salt and of water lost; their ratio gives $x$.</p>
<div class="callout ex"><b class="t">Worked example</b>2.46 g of $\text{MgSO}_4\cdot x\text{H}_2\text{O}$ is heated to constant mass, leaving 1.20 g. Find $x$.<br>Water lost $=1.26$ g. $n(\text{MgSO}_4)=\dfrac{1.20}{120}=0.0100$; $n(\text{H}_2\text{O})=\dfrac{1.26}{18}=0.0700$. Ratio 1 : 7, so $x=7$.</div>
<details class="check"><summary>A hydrocarbon is 85.7% carbon by mass and has $M_r=56$. Find its molecular formula.</summary><div>C: 85.7/12 = 7.14; H: 14.3/1 = 14.3. Ratio 1 : 2, so CH₂ (mass 14). 56/14 = 4, giving C₄H₈.</div></details>`},

    { h: "Yield, purity and percentage composition (3.3 S)", body: C`
<h3>Percentage yield</h3>
$$\%\text{ yield}=\frac{\text{actual mass of product obtained}}{\text{theoretical (maximum calculated) mass}}\times100$$
<p>The <b>theoretical yield</b> is calculated from the limiting reactant using the equation. The actual yield is almost always less, because:</p>
<ul><li>the reaction may be <b>incomplete</b> or <b>reversible</b> (it never goes to completion);</li><li><b>side reactions</b> produce other, unwanted products;</li><li>product is <b>lost</b> during separation and purification: left on filter paper, in the apparatus, or in solution, or lost during transfer.</li></ul>
<div class="callout ex"><b class="t">Worked example</b>4.0 g of Mg burns to give 5.6 g of MgO. $2\text{Mg}+\text{O}_2\rightarrow2\text{MgO}$. Find the % yield.<br>$n(\text{Mg})=\dfrac{4.0}{24}=0.167$ mol, so theoretical MgO $=0.167\times40=6.67$ g.<br>Yield $=\dfrac{5.6}{6.67}\times100=84\%$.</div>
<h3>Percentage purity</h3>
$$\%\text{ purity}=\frac{\text{mass of pure substance}}{\text{mass of impure sample}}\times100$$
<p>Work backwards from the product to find how much pure reactant there must have been.</p>
<div class="callout ex"><b class="t">Worked example</b>A 5.0 g sample of impure limestone reacts with excess acid to give 1.1 g of CO₂. Find the purity.<br>$n(\text{CO}_2)=\dfrac{1.1}{44}=0.025$ mol, so $n(\text{CaCO}_3)=0.025$ mol and mass $=2.5$ g. Purity $=\dfrac{2.5}{5.0}\times100=50\%$.</div>
<h3>Percentage composition by mass</h3>
$$\%\text{ of element}=\frac{A_r\times\text{number of atoms of that element}}{M_r}\times100$$
<p>Nitrogen in ammonium nitrate, $\text{NH}_4\text{NO}_3$ ($M_r=80$): $\dfrac{2\times14}{80}\times100=35\%$. Fertiliser questions often compare compounds this way to find the best source of nitrogen.</p>
<details class="check"><summary>Calculate the percentage of water in CuSO₄·5H₂O.</summary><div>$\dfrac{5\times18}{250}\times100=36\%$.</div></details>`}
  ],
  worked: [
    { q: C`What mass of CO₂ forms when 25 g of CaCO₃ decomposes? $\text{CaCO}_3\rightarrow\text{CaO}+\text{CO}_2$`,
      steps: [C`$M_r(\text{CaCO}_3)=40+12+48=100$, so $n=25/100=0.25$ mol.`, C`Ratio 1 : 1, so 0.25 mol CO₂.`, C`$M_r(\text{CO}_2)=44$, mass $=0.25\times44=11$ g. Volume at r.t.p. $=0.25\times24=6$ dm³.`]},
    { q: C`25.0 cm³ of NaOH is neutralised by 20.0 cm³ of 0.100 mol/dm³ HCl. Find the NaOH concentration.`,
      steps: [C`$n(\text{HCl})=0.100\times\dfrac{20.0}{1000}=0.00200$ mol.`, C`$\text{NaOH}+\text{HCl}$ react 1 : 1, so $n(\text{NaOH})=0.00200$ mol.`, C`$c=\dfrac{0.00200}{0.0250}=0.0800$ mol/dm³.`]},
    { q: C`A compound contains 40.0% C, 6.7% H and 53.3% O. $M_r=60$. Find the molecular formula.`,
      steps: [C`Divide by $A_r$: C $40/12=3.33$, H $6.7/1=6.7$, O $53.3/16=3.33$.`, C`Divide by smallest: 1 : 2 : 1, so the empirical formula is CH₂O ($M_r=30$).`, C`$60/30=2$, giving the molecular formula C₂H₄O₂.`]},
    { q: C`2.46 g of hydrated magnesium sulfate, MgSO₄·$x$H₂O, is heated to constant mass, leaving 1.20 g. Find $x$.`,
      steps: [C`Mass of water lost $=2.46-1.20=1.26$ g.`, C`$n(\text{MgSO}_4)=\dfrac{1.20}{120}=0.0100$ mol; $n(\text{H}_2\text{O})=\dfrac{1.26}{18}=0.0700$ mol.`, C`Ratio 0.0100 : 0.0700 = 1 : 7, so $x=7$.`]}
  ],
  formulas: [
    ["Moles from mass", C`$n=\dfrac{m}{M_r}$`], ["Gas volume (r.t.p.)", C`$V=n\times24\text{ dm}^3$`], ["Concentration", C`$c=\dfrac nV$`],
    ["Particles", C`$N=n\times6.02\times10^{23}$`], ["% yield", C`$\dfrac{\text{actual}}{\text{theoretical}}\times100$`], ["% purity", C`$\dfrac{\text{pure mass}}{\text{sample mass}}\times100$`], ["% by mass", C`$\dfrac{A_r\times\text{no. atoms}}{M_r}\times100$`]
  ],
  cards: [
    ["Avogadro constant", C`$6.02\times10^{23}$ particles per mole`],
    ["Define relative atomic mass", "The average mass of the isotopes of an element compared with 1/12 of the mass of a carbon-12 atom."],
    ["Define relative formula mass", "The sum of the relative atomic masses of all the atoms in the formula."],
    ["Molar gas volume at r.t.p.", "24 dm³ (24 000 cm³)."],
    ["Convert cm³ to dm³", "Divide by 1000."],
    ["Moles from mass", C`$n=m/M_r$`],
    ["Moles from solution", C`$n=c\times V$ (V in dm³)`],
    ["What does a balanced equation tell you?", "The mole ratio of reactants and products (not the mass ratio)."],
    ["How do you balance an equation?", "Change the coefficients (big numbers in front), never the subscripts."],
    ["Formula of aluminium oxide", C`$\text{Al}_2\text{O}_3$`],
    ["Formula of calcium hydroxide", C`$\text{Ca(OH)}_2$`],
    ["Charge on a sulfate ion", C`$\text{SO}_4^{\ 2-}$`],
    ["Charge on an ammonium ion", C`$\text{NH}_4^{\ +}$`],
    ["State symbol (aq) means…", "Dissolved in water (aqueous)."],
    ["Ionic equation for neutralisation", C`$\text{H}^+(\text{aq})+\text{OH}^-(\text{aq})\rightarrow\text{H}_2\text{O}(\text{l})$`],
    ["What are spectator ions?", "Ions present in the solution that don't change during the reaction."],
    ["What is the limiting reactant?", "The reactant that is completely used up first. It determines the amount of product."],
    ["Define empirical formula", "The simplest whole-number ratio of atoms of each element in a compound."],
    ["Define molecular formula", "The actual number of atoms of each element in one molecule."],
    ["Why is percentage yield below 100%?", "Incomplete or reversible reaction, side reactions, and losses during separation and purification."],
    ["% purity formula", "Mass of pure substance ÷ mass of impure sample × 100."],
    ["Concentration in g/dm³ from mol/dm³", C`Multiply by $M_r$.`],
    ["Which titres do you average?", "Concordant titres (within 0.10 cm³), not the rough one."],
    ["For gases, volume ratio equals…", "Mole ratio (at the same temperature and pressure)."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`How many moles are in 8 g of oxygen gas, O₂ ($A_r$ O = 16)?`, opts: ["0.5", "0.25", "2", "4"], ans: 1, why: C`$M_r(\text{O}_2)=32$; $8/32=0.25$ mol. The trap is using 16.` },
    { type: "mcq", marks: 1, q: C`The volume of 0.5 mol of CO₂ at r.t.p. is`, opts: ["6 dm³", "12 dm³", "24 dm³", "48 dm³"], ans: 1, why: C`$0.5\times24=12$ dm³.` },
    { type: "mcq", marks: 2, q: C`How many moles of NaOH are in 50 cm³ of 2.0 mol/dm³ solution?`, opts: ["100", "0.1", "0.04", "25"], ans: 1, why: C`$2.0\times\dfrac{50}{1000}=0.1$ mol.` },
    { type: "mcq", marks: 1, q: C`The $M_r$ of Ca(OH)₂ is ($A_r$: Ca 40, O 16, H 1)`, opts: ["57", "58", "74", "114"], ans: 2, why: C`$40+2(16+1)=74$. 57 forgets the bracket.` },
    { type: "mcq", marks: 1, q: C`The formula of aluminium sulfate is`, opts: ["AlSO₄", "Al₂SO₄", "Al₂(SO₄)₃", "Al₃(SO₄)₂"], ans: 2, why: C`$\text{Al}^{3+}$ and $\text{SO}_4^{2-}$: 2 × (+3) = +6 balances 3 × (−2) = −6.` },
    { type: "mcq", marks: 1, q: C`What is the concentration in g/dm³ of 0.20 mol/dm³ NaOH ($M_r=40$)?`, opts: ["0.005", "8.0", "200", "40"], ans: 1, why: C`$0.20\times40=8.0$ g/dm³.` },
    { type: "mcq", marks: 2, q: C`4 mol of H₂ is mixed with 3 mol of O₂: $2\text{H}_2+\text{O}_2\rightarrow2\text{H}_2\text{O}$. Which is true?`, opts: ["O₂ is limiting", "H₂ is limiting; 1 mol O₂ is left over", "Neither is in excess", "H₂ is limiting; 2 mol O₂ is left over"], ans: 1, why: C`4 mol H₂ needs only 2 mol O₂, so 1 mol O₂ is left over and H₂ runs out first.` },
    { type: "mcq", marks: 1, q: C`Which is the ionic equation for the reaction between any acid and any alkali?`, opts: ["Na⁺ + Cl⁻ → NaCl", "H⁺ + OH⁻ → H₂O", "H₂ + O₂ → H₂O", "HCl + NaOH → NaCl + H₂O"], ans: 1, why: C`The metal ion and the acid's anion are spectators.` },
    { type: "struct", marks: 4, q: C`Calculate the mass of iron formed when 32 g of Fe₂O₃ is reduced: $\text{Fe}_2\text{O}_3+3\text{CO}\rightarrow2\text{Fe}+3\text{CO}_2$ ($A_r$: Fe 56, O 16).`,
      ms: C`<b>M1</b> $M_r(\text{Fe}_2\text{O}_3)=160$<br><b>M1</b> $n=32/160=0.20$ mol<br><b>M1</b> ratio 1 : 2, so 0.40 mol Fe<br><b>A1</b> $0.40\times56=22.4$ g` },
    { type: "struct", marks: 3, q: C`Write a balanced equation, with state symbols, for magnesium reacting with dilute hydrochloric acid to form magnesium chloride solution and hydrogen.`,
      ms: C`<b>B1</b> correct formulae: Mg, HCl, MgCl₂, H₂<br><b>B1</b> balanced: $\text{Mg}+2\text{HCl}\rightarrow\text{MgCl}_2+\text{H}_2$<br><b>B1</b> state symbols: (s), (aq), (aq), (g)` },
    { type: "struct", marks: 3, q: C`Calculate the volume of CO₂ (in cm³ at r.t.p.) produced when 10.0 g of CaCO₃ reacts with excess hydrochloric acid. $\text{CaCO}_3+2\text{HCl}\rightarrow\text{CaCl}_2+\text{H}_2\text{O}+\text{CO}_2$`,
      ms: C`<b>M1</b> $n(\text{CaCO}_3)=10.0/100=0.100$ mol<br><b>M1</b> $n(\text{CO}_2)=0.100$ mol<br><b>A1</b> $0.100\times24\,000=2400$ cm³` },
    { type: "struct", marks: 5, q: C`25.0 cm³ of sodium hydroxide is neutralised by 22.5 cm³ of 0.100 mol/dm³ sulfuric acid. $2\text{NaOH}+\text{H}_2\text{SO}_4\rightarrow\text{Na}_2\text{SO}_4+2\text{H}_2\text{O}$. Calculate the concentration of the NaOH in (a) mol/dm³ (b) g/dm³.`,
      ms: C`(a) <b>M1</b> $n(\text{H}_2\text{SO}_4)=0.100\times0.0225=0.00225$ mol<br><b>M1</b> $n(\text{NaOH})=2\times0.00225=0.00450$ mol<br><b>M1</b> $c=0.00450/0.0250$ <b>A1</b> $0.180$ mol/dm³<br>(b) <b>B1</b> $0.180\times40=7.20$ g/dm³` },
    { type: "struct", marks: 5, q: C`2.4 g of magnesium is added to 100 cm³ of 1.0 mol/dm³ hydrochloric acid. $\text{Mg}+2\text{HCl}\rightarrow\text{MgCl}_2+\text{H}_2$. (a) Show which reactant is limiting. (b) Calculate the volume of hydrogen produced at r.t.p.`,
      ms: C`(a) <b>M1</b> $n(\text{Mg})=0.10$ mol <b>M1</b> $n(\text{HCl})=0.10$ mol <b>A1</b> 0.10 mol Mg needs 0.20 mol HCl, so HCl is limiting<br>(b) <b>M1</b> $n(\text{H}_2)=0.10/2=0.050$ mol <b>A1</b> $1.2$ dm³` },
    { type: "struct", marks: 4, q: C`A compound contains 40.0% C, 6.7% H and 53.3% O by mass. Its $M_r$ is 60. Find its empirical and molecular formulae.`,
      ms: C`<b>M1</b> divide by $A_r$: 3.33 : 6.7 : 3.33<br><b>M1</b> divide by the smallest: 1 : 2 : 1<br><b>A1</b> empirical CH₂O<br><b>A1</b> $60/30=2$, so molecular C₂H₄O₂` },
    { type: "struct", marks: 4, q: C`4.0 g of magnesium is burned in excess oxygen. 5.6 g of magnesium oxide is collected. $2\text{Mg}+\text{O}_2\rightarrow2\text{MgO}$. Calculate the percentage yield.`,
      ms: C`<b>M1</b> $n(\text{Mg})=4.0/24=0.167$ mol<br><b>M1</b> theoretical MgO $=0.167\times40=6.67$ g<br><b>M1</b> $\dfrac{5.6}{6.67}\times100$ <b>A1</b> $84\%$` },
    { type: "struct", marks: 4, q: C`A 5.0 g sample of impure calcium carbonate reacts with excess acid, producing 1.1 g of CO₂. Calculate the percentage purity of the sample.`,
      ms: C`<b>M1</b> $n(\text{CO}_2)=1.1/44=0.025$ mol<br><b>M1</b> $n(\text{CaCO}_3)=0.025$ mol, mass $=2.5$ g<br><b>M1</b> $\dfrac{2.5}{5.0}\times100$ <b>A1</b> $50\%$` },
    { type: "struct", marks: 4, q: C`2.46 g of hydrated magnesium sulfate MgSO₄·$x$H₂O is heated to constant mass, leaving 1.20 g of anhydrous MgSO₄. Find the value of $x$.`,
      ms: C`<b>B1</b> mass of water $=1.26$ g<br><b>M1</b> $n(\text{MgSO}_4)=1.20/120=0.0100$<br><b>M1</b> $n(\text{H}_2\text{O})=1.26/18=0.0700$<br><b>A1</b> $x=7$` },
    { type: "struct", marks: 2, q: C`Calculate the percentage by mass of nitrogen in ammonium nitrate, NH₄NO₃.`,
      ms: C`<b>M1</b> $M_r=80$; $\dfrac{28}{80}\times100$ <b>A1</b> $35\%$` },
    { type: "struct", marks: 3, q: C`Write ionic equations for (a) the precipitation of silver chloride when silver nitrate solution is added to sodium chloride solution, (b) zinc displacing copper from copper(II) sulfate solution.`,
      ms: C`(a) <b>B1</b> $\text{Ag}^+(\text{aq})+\text{Cl}^-(\text{aq})\rightarrow\text{AgCl}(\text{s})$<br>(b) <b>B1</b> $\text{Zn}(\text{s})+\text{Cu}^{2+}(\text{aq})\rightarrow\text{Zn}^{2+}(\text{aq})+\text{Cu}(\text{s})$ <b>B1</b> state symbols correct` }
  ]
});
}
