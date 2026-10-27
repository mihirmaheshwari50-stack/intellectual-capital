window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;

/* ============================================================
   STOICHIOMETRY  (0620 2026–2028: 3.1, 3.2, 3.3)
   ============================================================ */
TOPICS.push({
  id: "moles", subject: "chemistry", title: "Stoichiometry & the mole",
  blurb: "Formulae, equations, relative masses, the mole, reacting masses, gas volumes, concentration, titrations, limiting reagents, yield and purity.",
  level: "Core → Supplement", demo: "mole",
  syllabus: [
    ["3.1", "State formulae of elements and compounds; deduce formulae from models and diagrams", 0],
    ["3.1", "Deduce the formula of an ionic compound from the charges on its ions", 0],
    ["3.1", "Write word and balanced symbol equations, with state symbols", 1],
    ["3.1 S", "Write ionic equations and ionic half-equations", 1],
    ["3.1 S", "Define empirical formula and molecular formula", 7],
    ["3.2", "Relative atomic mass $A_r$ and relative formula mass $M_r$; reacting masses in simple proportions", 2],
    ["3.3 S", "The mole and the Avogadro constant ($6.02\\times10^{23}$); $n=m/M_r$", 3],
    ["3.3 S", "Calculate reacting masses using the mole", 4],
    ["3.3 S", "Molar gas volume: 24 dm³ at r.t.p.", 5],
    ["3.3 S", "Concentration in mol/dm³ and g/dm³; titration calculations", 5],
    ["3.3 S", "Limiting reactants", 6],
    ["3.3 S", "Empirical and molecular formulae from data", 7],
    ["3.3 S", "Percentage yield, percentage composition by mass and percentage purity", 8]
  ],
  sections: [
    { h: "Chemical formulae", body: C`
<p>A formula tells you which elements are present and the <b>ratio</b> of atoms. In $\text{H}_2\text{SO}_4$ there are 2 H, 1 S and 4 O. Brackets multiply everything inside: $\text{Ca(OH)}_2$ has 1 Ca, 2 O and 2 H.</p>
<p>From a diagram of a molecule, count each kind of atom. A ball-and-stick model with one carbon and four hydrogens is $\text{CH}_4$.</p>
<h3>Ionic formulae: balance the charges</h3>
<p>An ionic compound has <b>no overall charge</b>, so the positive and negative charges must cancel. Learn the common ions:</p>
<table class="t"><tr><th>Positive</th><th>Negative</th></tr>
<tr><td>$\text{Na}^+,\ \text{K}^+,\ \text{H}^+,\ \text{Ag}^+,\ \text{NH}_4^{\ +}$</td><td>$\text{Cl}^-,\ \text{Br}^-,\ \text{OH}^-,\ \text{NO}_3^{\ -}$</td></tr>
<tr><td>$\text{Mg}^{2+},\ \text{Ca}^{2+},\ \text{Cu}^{2+},\ \text{Zn}^{2+},\ \text{Fe}^{2+}$</td><td>$\text{O}^{2-},\ \text{S}^{2-},\ \text{SO}_4^{\ 2-},\ \text{CO}_3^{\ 2-}$</td></tr>
<tr><td>$\text{Al}^{3+},\ \text{Fe}^{3+}$</td><td>$\text{N}^{3-},\ \text{PO}_4^{\ 3-}$</td></tr></table>
<p>Aluminium oxide: $\text{Al}^{3+}$ and $\text{O}^{2-}$. The lowest common multiple of 3 and 2 is 6, so you need 2 Al (+6) and 3 O (−6): $\text{Al}_2\text{O}_3$. A quick trick is to swap the charge numbers: Al<sub>2</sub>O<sub>3</sub>. Then simplify if possible ($\text{Mg}_2\text{O}_2\to\text{MgO}$).</p>
<p>Use brackets round a polyatomic ion when you need more than one: calcium hydroxide is $\text{Ca(OH)}_2$, not $\text{CaOH}_2$.</p>
<div class="callout tip"><b class="t">Roman numerals</b>Iron(III) oxide means $\text{Fe}^{3+}$, so the formula is $\text{Fe}_2\text{O}_3$. Copper(II) sulfate means $\text{Cu}^{2+}$, so it is $\text{CuSO}_4$.</div>`},
    { h: "Equations: balancing, state symbols and ionic equations", body: C`
<p>Atoms are not created or destroyed, so a symbol equation must have the same number of each atom on both sides. You balance by changing the <b>big numbers in front</b> (coefficients), <b>never the small subscripts</b>: changing $\text{H}_2\text{O}$ to $\text{H}_2\text{O}_2$ makes a different substance.</p>
<p>Balancing $\text{Fe}_2\text{O}_3+\text{CO}\rightarrow\text{Fe}+\text{CO}_2$: Fe first, giving $2\text{Fe}$. Then O: there are 3 O in $\text{Fe}_2\text{O}_3$ to transfer, so use $3\text{CO}\rightarrow3\text{CO}_2$:</p>
$$\text{Fe}_2\text{O}_3+3\text{CO}\rightarrow2\text{Fe}+3\text{CO}_2$$
<p><b>State symbols:</b> (s) solid, (l) liquid, (g) gas, (aq) aqueous, meaning dissolved in water. Water itself is (l), not (aq).</p>
<h3>Ionic equations (S)</h3>
<p>In solution, ionic compounds are split into separate ions. Ions that are unchanged on both sides are <b>spectator ions</b>. Remove them to show what <b>actually reacts</b>:</p>
<ul><li>Any acid + alkali neutralisation: $\text{H}^+(\text{aq})+\text{OH}^-(\text{aq})\rightarrow\text{H}_2\text{O}(\text{l})$</li>
<li>Precipitation of silver chloride: $\text{Ag}^+(\text{aq})+\text{Cl}^-(\text{aq})\rightarrow\text{AgCl}(\text{s})$</li>
<li>Displacement: $\text{Zn}(\text{s})+\text{Cu}^{2+}(\text{aq})\rightarrow\text{Zn}^{2+}(\text{aq})+\text{Cu}(\text{s})$</li></ul>
<p><b>Half-equations</b> show electrons gained or lost by one species: $\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}$ (gain of electrons, reduction) and $2\text{Cl}^-\rightarrow\text{Cl}_2+2e^-$ (loss of electrons, oxidation). Charges and atoms must both balance.</p>`},
    { h: "Relative masses", body: C`
<p><b>Relative atomic mass $A_r$</b>: the average mass of the isotopes of an element compared with $\tfrac1{12}$ of the mass of an atom of carbon-12. It has no units because it is a ratio. Chlorine's $A_r$ is 35.5 because it is a mixture of $^{35}\text{Cl}$ and $^{37}\text{Cl}$.</p>
<p><b>Relative formula mass $M_r$</b>: the sum of the $A_r$ values of all the atoms in the formula.</p>
$$M_r(\text{Ca(OH)}_2)=40+2(16+1)=74$$
<p><b>Simple proportions (Core):</b> if 100 g of $\text{CaCO}_3$ gives 56 g of $\text{CaO}$, then 25 g gives $56\times\tfrac{25}{100}=14$ g. The masses scale together.</p>`},
    { h: "The mole", body: C`
<p>Atoms are far too small to count, so chemists count them in packs. One <b>mole</b> is $6.02\times10^{23}$ particles, the <b>Avogadro constant</b>. It's like a "dozen", but huge.</p>
<p>The number is chosen so that <b>one mole of any substance has a mass in grams equal to its $A_r$ or $M_r$</b>. So 12 g of carbon, 18 g of water and 58.5 g of sodium chloride each contain one mole of particles. This is the bridge between grams (what you weigh) and particles (what reacts).</p>
$$n=\frac{m}{M_r}\qquad\text{moles}=\frac{\text{mass (g)}}{M_r}$$
<p>Number of particles $=n\times6.02\times10^{23}$. Read carefully: one mole of $\text{H}_2\text{O}$ contains $6.02\times10^{23}$ <i>molecules</i> but $3\times6.02\times10^{23}$ <i>atoms</i>.</p>
<p>Use the interactive jars below. Each jar is one mole: change the substance and mass and watch the number of moles.</p>`},
    { h: "Reacting masses: the 3-step method", body: C`
<p>A balanced equation tells you the <b>mole ratio</b>, not the mass ratio. $2\text{Mg}+\text{O}_2\rightarrow2\text{MgO}$ means 2 moles of Mg react with 1 mole of $\text{O}_2$, not 2 g with 1 g. So every calculation follows the same path:</p>
<ol><li><b>Known → moles</b> ($n=m/M_r$, or from a gas volume or concentration).</li>
<li><b>Use the ratio</b> from the balanced equation: moles wanted $=$ moles known $\times\dfrac{\text{coefficient wanted}}{\text{coefficient known}}$.</li>
<li><b>Moles → what's asked</b> (mass $=n\times M_r$, volume $=n\times24$, concentration $=n/V$).</li></ol>
<div class="viz" data-viz="threeStep"></div>
<div class="callout warn"><b class="t">Common mistakes</b>Using the equation's mass ratio directly. Forgetting to balance the equation first. Using $A_r$ of O (16) for oxygen gas instead of $M_r(\text{O}_2)=32$. Rounding moles too early: keep 3–4 significant figures until the end.</div>`},
    { h: "Gas volumes, concentration and titrations", body: C`
<h3>Gases</h3>
<p>One mole of <b>any</b> gas occupies <b>24 dm³</b> (24 000 cm³) at room temperature and pressure (r.t.p.). This works for every gas because gas particles are so far apart that their own size doesn't matter. Only the number of particles does.</p>
$$V(\text{dm}^3)=n\times24$$
<p>So for gases, the <b>volume ratio equals the mole ratio</b>. In $\text{N}_2+3\text{H}_2\rightarrow2\text{NH}_3$, 10 cm³ of $\text{N}_2$ reacts with 30 cm³ of $\text{H}_2$.</p>
<h3>Solutions</h3>
$$c=\frac{n}{V}\qquad\text{mol/dm}^3,\text{ with }V\text{ in dm}^3$$
<p>Convert cm³ to dm³ by dividing by <b>1000</b>. Concentration in g/dm³ = concentration in mol/dm³ × $M_r$.</p>
<h3>Titration calculations</h3>
<p>A titration finds the exact volume of one solution needed to react with a known volume of another. The calculation uses the same three steps:</p>
<ol><li>Moles of the solution you know <b>both</b> the concentration and volume of: $n=c\times V$.</li>
<li>Mole ratio from the equation.</li>
<li>Concentration of the unknown $=n\div V$.</li></ol>
<p>Use the mean of <b>concordant</b> titres (within 0.10 cm³ of each other), not the rough titre.</p>`},
    { h: "Limiting reactants", body: C`
<p>Reactants are rarely in the exact ratio of the equation. The <b>limiting reactant</b> is the one that is <b>completely used up</b> first, so it decides how much product forms. The other is <b>in excess</b>: some is left over.</p>
<p><b>Method:</b> work out the moles of each reactant and divide each by its coefficient in the equation. The <b>smaller</b> result is the limiting one. Then do all further calculations from the limiting reactant.</p>
<p>Example: 2.4 g Mg with 0.10 mol HCl, $\text{Mg}+2\text{HCl}\rightarrow\text{MgCl}_2+\text{H}_2$. Mg: $0.10\div1=0.10$. HCl: $0.10\div2=0.05$. HCl is limiting. $\text{H}_2$ formed $=0.05$ mol $=1.2$ dm³.</p>
<div class="callout key"><b class="t">Why it matters</b>In rates experiments, the limiting reactant controls the <b>final amount</b> of product (where the graph levels off). In industry, the cheaper reactant is often added in excess so all of the expensive one reacts.</div>`},
    { h: "Empirical and molecular formulae", body: C`
<p><b>Empirical formula</b>: the simplest whole-number ratio of atoms of each element in a compound. <b>Molecular formula</b>: the actual number of atoms of each element in one molecule. Glucose $\text{C}_6\text{H}_{12}\text{O}_6$ has empirical formula $\text{CH}_2\text{O}$.</p>
<p><b>Finding the empirical formula</b> from masses or percentages, using a table:</p>
<ol><li>Write the mass (or %) of each element.</li><li>Divide each by its $A_r$, giving moles.</li><li>Divide all by the <b>smallest</b>.</li><li>If you get .5, .33 or .25, multiply everything to reach whole numbers (×2, ×3 or ×4).</li></ol>
<p><b>Molecular formula:</b> divide $M_r$ by the empirical formula mass, and multiply the empirical formula by the answer.</p>
<p><b>Water of crystallisation:</b> to find $x$ in $\text{MgSO}_4\cdot x\text{H}_2\text{O}$, heat to constant mass. The mass lost is water. Find the moles of anhydrous salt and moles of water; the ratio gives $x$.</p>`},
    { h: "Yield, purity and composition", body: C`
$$\%\text{ yield}=\frac{\text{actual mass of product}}{\text{theoretical (calculated) mass}}\times100$$
<p>The yield is below 100% because the reaction may be incomplete or reversible, side reactions may make other products, and product is lost during transfer, filtration and purification.</p>
$$\%\text{ purity}=\frac{\text{mass of pure substance}}{\text{mass of impure sample}}\times100$$
<p>In purity questions, calculate the mass of the pure substance from the product made, then compare it with the sample mass.</p>
$$\%\text{ by mass of an element}=\frac{A_r\times\text{number of atoms}}{M_r}\times100$$
<p>Example: nitrogen in $\text{NH}_4\text{NO}_3$ ($M_r=80$) $=\dfrac{2\times14}{80}\times100=35\%$.</p>`}
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
