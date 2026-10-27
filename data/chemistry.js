window.TOPICS = window.TOPICS || [];
const C = String.raw;

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

/* ============================================================
   ATOMS, BONDING & STRUCTURE  (0620: 2.1–2.7)
   ============================================================ */
TOPICS.push({
  id: "bonding", subject: "chemistry", title: "Atoms, bonding & structure",
  blurb: "Atomic structure, isotopes, ionic, covalent and metallic bonding, giant structures, and why properties follow from structure.",
  level: "Core → Supplement", demo: "atom",
  syllabus: [
    ["2.1", "Elements, compounds and mixtures", 0],
    ["2.2", "Structure of the atom: relative charges and masses of protons, neutrons and electrons", 1],
    ["2.2", "Proton number, mass number, electronic configuration of the first 20 elements; group and period", 1],
    ["2.3", "Isotopes and isotope notation", 2],
    ["2.3 S", "Why isotopes have the same chemical properties; calculating $A_r$ from isotopic abundances", 2],
    ["2.4", "Formation of ions; ionic bonds; dot-and-cross diagrams for Group I and Group VII compounds", 3],
    ["2.4 S", "Giant ionic lattices; dot-and-cross for other metal/non-metal compounds", 3],
    ["2.4", "Properties of ionic compounds (S: explained in terms of structure and bonding)", 3],
    ["2.5", "Covalent bonds; dot-and-cross for H₂, Cl₂, H₂O, CH₄, NH₃, HCl", 4],
    ["2.5 S", "Dot-and-cross for CH₃OH, C₂H₄, O₂, CO₂, N₂", 4],
    ["2.5", "Properties of simple molecular compounds (S: intermolecular forces)", 5],
    ["2.6", "Giant covalent structures: diamond and graphite, their properties and uses", 6],
    ["2.6 S", "Silicon(IV) oxide and its similarity to diamond", 6],
    ["2.7 S", "Metallic bonding and the properties of metals", 7]
  ],
  sections: [
    { h: "Elements, compounds and mixtures", body: C`
<ul><li><b>Element</b>: a substance made of only one type of atom (all with the same proton number). It cannot be broken down chemically.</li>
<li><b>Compound</b>: two or more elements <b>chemically combined</b> in a fixed ratio. It has <b>different properties</b> from its elements (sodium is a reactive metal and chlorine a toxic gas, but sodium chloride is table salt) and can only be separated by chemical reactions.</li>
<li><b>Mixture</b>: two or more substances <b>not</b> chemically combined. The proportions can vary, each part keeps its own properties, and it can be separated by physical methods (filtration, distillation, chromatography).</li></ul>`},
    { h: "Inside the atom", body: C`
<table class="t"><tr><th>Particle</th><th>Relative mass</th><th>Relative charge</th><th>Where</th></tr>
<tr><td>Proton</td><td>1</td><td>+1</td><td>Nucleus</td></tr><tr><td>Neutron</td><td>1</td><td>0</td><td>Nucleus</td></tr><tr><td>Electron</td><td>1/1840 (negligible)</td><td>−1</td><td>Shells around the nucleus</td></tr></table>
<p><b>Proton number (atomic number)</b> $Z$ = number of protons, which defines the element. <b>Mass number (nucleon number)</b> $A$ = protons + neutrons. So neutrons $=A-Z$. A neutral atom has equal numbers of protons and electrons.</p>
<p>Notation: $^{23}_{11}\text{Na}$ has 11 protons, 11 electrons and $23-11=12$ neutrons.</p>
<h3>Electronic configuration</h3>
<p>Electrons fill shells from the inside out: up to <b>2</b>, then <b>8</b>, then <b>8</b> (for the first 20 elements). Calcium (20) is 2,8,8,2.</p>
<div class="callout key"><b class="t">Why the Periodic Table works</b><b>Group number = number of outer-shell electrons</b> (Group VIII/0 has a full shell). <b>Period number = number of occupied shells.</b> Elements in the same group have the same number of outer electrons, so they react the same way. Chemistry is mostly about outer electrons.</div>
<p>The noble gases (Group VIII) have <b>full outer shells</b>, which is why they are unreactive. Other atoms bond in order to get a full outer shell, and that single idea drives all of bonding. Build some atoms in the interactive lab below.</p>`},
    { h: "Isotopes", body: C`
<p><b>Isotopes</b> are atoms of the same element with the <b>same number of protons</b> but <b>different numbers of neutrons</b>. For example $^{12}_6\text{C}$, $^{13}_6\text{C}$ and $^{14}_6\text{C}$.</p>
<p>(S) Isotopes of an element have the <b>same chemical properties</b> because they have the <b>same number of electrons</b> and therefore the same electronic configuration, and reactions depend on electrons. They differ in mass, and some are radioactive.</p>
<h3>Relative atomic mass from abundances (S)</h3>
$$A_r=\frac{\sum(\text{isotope mass}\times\%\text{ abundance})}{100}$$
<p>Chlorine: 75% $^{35}\text{Cl}$ and 25% $^{37}\text{Cl}$, so $A_r=\dfrac{35\times75+37\times25}{100}=35.5$. The answer must lie between the isotope masses, nearer the more abundant one. That makes a good check.</p>`},
    { h: "Ionic bonding", body: C`
<p>An <b>ion</b> is a charged particle formed when an atom <b>loses or gains electrons</b>. Metals (Groups I–III) <b>lose</b> outer electrons and form <b>positive</b> ions. Non-metals (Groups V–VII) <b>gain</b> electrons and form <b>negative</b> ions. Either way they end with a full outer shell (a noble-gas configuration).</p>
<div class="viz" data-viz="ionic"></div>
<p>An <b>ionic bond</b> is the <b>strong electrostatic attraction between oppositely charged ions</b>. It forms between a metal and a non-metal.</p>
<h3>Dot-and-cross diagrams</h3>
<p>Show the outer shell of each ion only (or all shells if asked), electrons from one atom as dots and from the other as crosses, the ion in <b>square brackets</b>, and the <b>charge</b> top right. For MgO: $[\text{Mg}]^{2+}$ with an empty (or full 2,8) outer shell, and $[\text{O}]^{2-}$ with 8 outer electrons (6 dots + 2 crosses). For CaCl₂ you need two Cl⁻ ions, each gaining one electron from Ca.</p>
<h3>Giant ionic lattice (S)</h3>
<div class="viz" data-viz="lattice"></div>
<p>The ions are arranged in a <b>regular, repeating 3D arrangement of alternating positive and negative ions</b>. Every ion is attracted to all the oppositely charged ions around it, in every direction.</p>
<h3>Properties, and why</h3>
<ul><li><b>High melting and boiling points:</b> a lot of energy is needed to overcome the many strong electrostatic attractions between oppositely charged ions throughout the lattice. Higher charges ($\text{Mg}^{2+}\text{O}^{2-}$ vs $\text{Na}^+\text{Cl}^-$) attract more strongly, giving even higher melting points.</li>
<li><b>Conduct electricity when molten or in aqueous solution</b>, because the ions are free to move and carry charge. <b>Not when solid</b>: the ions are held in fixed positions in the lattice.</li>
<li>Often soluble in water.</li></ul>
<div class="callout warn"><b class="t">Common error</b>Saying ionic compounds conduct when molten "because electrons move". It's the <b>ions</b> that move. Ionic compounds have no free electrons.</div>`},
    { h: "Covalent bonding", body: C`
<p>A <b>covalent bond</b> is a <b>pair of electrons shared between two atoms</b>, which gives both a noble-gas configuration. It forms between <b>non-metal</b> atoms. The bond is the attraction of both nuclei to the shared pair.</p>
<div class="viz" data-viz="covalent"></div>
<p>Count the bonds each atom needs: <b>8 − group number</b> (H needs 1). So H forms 1 bond, O forms 2, N forms 3 and C forms 4.</p>
<table class="t"><tr><th>Molecule</th><th>Bonds</th><th>Notes</th></tr>
<tr><td>H₂, Cl₂, HCl</td><td>1 single bond</td><td>Each Cl also has 3 lone pairs</td></tr>
<tr><td>H₂O</td><td>2 single O–H</td><td>O has 2 lone pairs</td></tr>
<tr><td>NH₃</td><td>3 single N–H</td><td>N has 1 lone pair</td></tr>
<tr><td>CH₄</td><td>4 single C–H</td><td>No lone pairs</td></tr>
<tr><td>CH₃OH (S)</td><td>3 C–H, 1 C–O, 1 O–H</td><td>O has 2 lone pairs</td></tr>
<tr><td>O₂ (S)</td><td>1 <b>double</b> bond (2 shared pairs)</td><td>Each O has 2 lone pairs</td></tr>
<tr><td>CO₂ (S)</td><td>2 C=O double bonds</td><td>Each O has 2 lone pairs</td></tr>
<tr><td>C₂H₄ (S)</td><td>1 C=C double, 4 C–H</td><td>—</td></tr>
<tr><td>N₂ (S)</td><td>1 <b>triple</b> bond (3 shared pairs)</td><td>Each N has 1 lone pair</td></tr></table>
<div class="callout tip"><b class="t">Check every dot-and-cross diagram</b>Count around each atom: H must have 2 electrons, and every other atom 8. Shared pairs count for both atoms.</div>`},
    { h: "Simple molecular substances", body: C`
<p>Substances like H₂O, CO₂, CH₄ and Cl₂ are made of small, separate molecules. There are two very different forces here:</p>
<ul><li><b>Covalent bonds</b> <i>within</i> each molecule: <b>strong</b>.</li>
<li><b>Intermolecular forces</b> <i>between</i> molecules: <b>weak</b>.</li></ul>
<div class="callout key"><b class="t">The distinction that gets A*</b>When a simple molecular substance melts or boils, only the <b>weak intermolecular forces</b> are overcome. The covalent bonds do <b>not</b> break: steam is still H₂O molecules. So little energy is needed, and melting and boiling points are <b>low</b> (many are gases or liquids at room temperature).</div>
<p><b>Poor electrical conductivity:</b> there are no ions and no free (delocalised) electrons to carry charge.</p>
<p>(S) Larger molecules have stronger intermolecular forces, so higher boiling points. This is why boiling points rise along the alkanes.</p>`},
    { h: "Giant covalent structures", body: C`
<p>Here, <b>every</b> atom is joined to its neighbours by strong covalent bonds in a huge network. There are no separate molecules. To melt one you must break <b>many strong covalent bonds</b>, so melting points are <b>very high</b>.</p>
<table class="t"><tr><th></th><th>Diamond</th><th>Graphite</th></tr>
<tr><td>Bonding</td><td>Each C bonded to <b>4</b> others in a rigid 3D tetrahedral network</td><td>Each C bonded to <b>3</b> others in flat hexagonal <b>layers</b></td></tr>
<tr><td>Free electrons?</td><td>None: all 4 outer electrons are in bonds</td><td>One <b>delocalised</b> electron per C, free to move along the layers</td></tr>
<tr><td>Conducts?</td><td>No</td><td><b>Yes</b></td></tr>
<tr><td>Hardness</td><td>Very hard</td><td>Soft and slippery: <b>weak forces between layers</b> let them slide</td></tr>
<tr><td>Uses</td><td>Cutting tools, drill bits</td><td>Lubricant, electrodes</td></tr></table>
<p><b>Silicon(IV) oxide, SiO₂ (S)</b>, the main compound in sand, has a structure like diamond. Each Si is bonded to 4 O, and each O to 2 Si, in a giant 3D network. So it has similar properties: <b>hard, very high melting point, does not conduct</b>.</p>
<div class="callout warn"><b class="t">Lost marks</b>Saying graphite is slippery because "the covalent bonds between layers are weak". There are <b>no</b> covalent bonds between layers. Only weak forces act there.</div>`},
    { h: "Metallic bonding (S)", body: C`
<p>A metal is a <b>giant lattice of positive metal ions</b> surrounded by a <b>"sea" of delocalised electrons</b> (the atoms' outer electrons, free to move through the whole structure). <b>Metallic bonding</b> is the electrostatic attraction between the positive ions and the delocalised electrons.</p>
<ul><li><b>Good electrical conductors</b>: the delocalised electrons move through the structure and carry charge (and heat).</li>
<li><b>Malleable and ductile</b>: the layers of positive ions can <b>slide over each other</b> while the electron sea keeps holding them together, so the bonding is not broken.</li>
<li><b>High melting and boiling points</b>: strong attraction between the ions and the electron sea throughout the lattice.</li></ul>
<table class="t"><tr><th>Structure</th><th>Melting point</th><th>Conducts?</th><th>Why</th></tr>
<tr><td>Giant ionic</td><td>High</td><td>Molten or aqueous only</td><td>Ions mobile only when not in the lattice</td></tr>
<tr><td>Simple molecular</td><td>Low</td><td>No</td><td>Weak intermolecular forces; no ions or free electrons</td></tr>
<tr><td>Giant covalent</td><td>Very high</td><td>No (graphite yes)</td><td>Many strong covalent bonds</td></tr>
<tr><td>Metallic</td><td>High</td><td>Yes, solid and molten</td><td>Delocalised electrons</td></tr></table>`}
  ],
  worked: [
    { q: C`Explain why magnesium oxide has a much higher melting point than sodium chloride.`,
      steps: [C`Both are giant ionic lattices.`, C`MgO contains Mg²⁺ and O²⁻ (charges of 2), but NaCl has Na⁺ and Cl⁻ (charges of 1).`, C`Higher charges give stronger electrostatic attraction between the ions, so more energy is needed to overcome it.`]},
    { q: C`Boron has two isotopes: 20% boron-10 and 80% boron-11. Calculate its relative atomic mass.`,
      steps: [C`$A_r=\dfrac{10\times20+11\times80}{100}=\dfrac{200+880}{100}$.`, C`$A_r=10.8$. Check: it lies between 10 and 11, nearer 11 (the more abundant isotope) ✓`]},
    { q: C`State the numbers of protons, neutrons and electrons in $^{27}_{13}\text{Al}^{3+}$.`,
      steps: [C`Protons = proton number = 13.`, C`Neutrons = 27 − 13 = 14.`, C`The 3+ charge means 3 electrons were lost: 13 − 3 = 10 electrons (configuration 2,8).`]}
  ],
  formulas: [["Mass number", C`$A=\text{protons}+\text{neutrons}$`], ["Neutrons", C`$A-Z$`], ["Ion charge", C`protons − electrons`], ["$A_r$ from isotopes", C`$\dfrac{\sum(\text{mass}\times\%)}{100}$`], ["Bonds an atom forms", "8 − group number (H: 1)"]],
  cards: [
    ["Define an element", "A substance containing only one type of atom (one proton number)."],
    ["Compound vs mixture", "A compound is chemically combined in a fixed ratio; a mixture is not combined and can be separated physically."],
    ["Relative mass and charge of an electron", "1/1840 and −1."],
    ["Define proton number", "The number of protons in the nucleus of an atom."],
    ["Define mass (nucleon) number", "The total number of protons and neutrons in the nucleus."],
    ["Electron configuration of Ca", "2, 8, 8, 2"],
    ["Group number tells you…", "The number of outer-shell electrons."],
    ["Period number tells you…", "The number of occupied electron shells."],
    ["What is an isotope?", "Atoms of the same element with the same number of protons but different numbers of neutrons."],
    ["Why do isotopes have the same chemical properties?", "Same number of electrons, so the same electronic configuration."],
    ["Define an ionic bond", "The strong electrostatic attraction between oppositely charged ions."],
    ["Describe a giant ionic lattice", "A regular 3D arrangement of alternating positive and negative ions."],
    ["Why does NaCl conduct only when molten or dissolved?", "The ions must be free to move. In the solid they are fixed in the lattice."],
    ["Define a covalent bond", "A pair of electrons shared between two atoms."],
    ["Number of covalent bonds formed by N, O and C", "N: 3, O: 2, C: 4."],
    ["Bonding in N₂", "A triple bond (3 shared pairs) plus one lone pair on each N."],
    ["Bonding in CO₂", "Two C=O double bonds."],
    ["Why does water have a low boiling point?", "Only weak intermolecular forces are overcome. The covalent bonds do not break."],
    ["Why don't simple molecular substances conduct?", "No ions and no free electrons."],
    ["Why does graphite conduct?", "Each carbon has one delocalised electron that can move along the layers."],
    ["Why is graphite soft and slippery?", "Weak forces between the layers let them slide over each other."],
    ["Why is diamond very hard with a high melting point?", "Each C is bonded to 4 others by strong covalent bonds in a rigid 3D network."],
    ["Structure of SiO₂", "Giant covalent, like diamond: each Si bonded to 4 O, each O to 2 Si."],
    ["Describe metallic bonding", "Positive ions in a sea of delocalised electrons, held by electrostatic attraction."],
    ["Why are metals malleable?", "Layers of ions slide over each other while the delocalised electrons keep holding them together."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`An atom has 17 protons and 18 neutrons. Its mass number is`, opts: ["17", "18", "35", "1"], ans: 2, why: C`$17+18=35$ (this is chlorine-35).` },
    { type: "mcq", marks: 1, q: C`When ice melts, what is overcome?`, opts: ["Covalent bonds", "Ionic bonds", "Intermolecular forces", "Metallic bonds"], ans: 2, why: C`Water is a simple molecular substance. Only the weak forces between molecules are overcome.` },
    { type: "mcq", marks: 1, q: C`Which conducts electricity as a solid?`, opts: ["Sodium chloride", "Diamond", "Graphite", "Sulfur"], ans: 2, why: C`Graphite has delocalised electrons.` },
    { type: "mcq", marks: 1, q: C`Isotopes of the same element differ in their number of`, opts: ["Protons", "Electrons", "Neutrons", "Outer-shell electrons"], ans: 2, why: C`Same protons and electrons, different neutrons.` },
    { type: "mcq", marks: 1, q: C`The formula of magnesium nitride (Mg²⁺ and N³⁻) is`, opts: ["MgN", "Mg₂N₃", "Mg₃N₂", "MgN₂"], ans: 2, why: C`3 × (+2) = +6 balances 2 × (−3) = −6.` },
    { type: "mcq", marks: 1, q: C`How many pairs of electrons are shared in a nitrogen molecule, N₂?`, opts: ["1", "2", "3", "4"], ans: 2, why: C`N is in Group V, so it needs 3 more electrons: a triple bond.` },
    { type: "mcq", marks: 1, q: C`The electronic configuration of sulfur (proton number 16) is`, opts: ["2,8,6", "2,6,8", "2,8,8", "8,8"], ans: 0, why: C`Fill 2, then 8, then the remaining 6.` },
    { type: "mcq", marks: 1, q: C`Which substance has the highest melting point?`, opts: ["CO₂", "H₂O", "SiO₂", "CH₄"], ans: 2, why: C`SiO₂ is giant covalent. The others are simple molecular.` },
    { type: "struct", marks: 3, q: C`Explain why metals are malleable.`,
      ms: C`<b>B1</b> regular layers (lattice) of positive ions<br><b>B1</b> the layers can slide over each other<br><b>B1</b> the delocalised electrons still hold them together, so the bonding is not broken` },
    { type: "struct", marks: 3, q: C`Describe, with the help of a dot-and-cross diagram description, how magnesium and oxygen form magnesium oxide.`,
      ms: C`<b>B1</b> Mg loses 2 electrons to become Mg²⁺ (2,8)<br><b>B1</b> O gains 2 electrons to become O²⁻ (2,8)<br><b>B1</b> diagram with square brackets, correct charges and the transferred electrons shown as crosses/dots` },
    { type: "struct", marks: 3, q: C`Explain why solid sodium chloride does not conduct electricity, but molten sodium chloride does.`,
      ms: C`<b>B1</b> NaCl is made of ions<br><b>B1</b> in the solid, the ions are held in fixed positions in a lattice and cannot move<br><b>B1</b> when molten, the ions are free to move and carry charge` },
    { type: "struct", marks: 2, q: C`Boron consists of 20% boron-10 and 80% boron-11. Calculate its relative atomic mass.`,
      ms: C`<b>M1</b> $\dfrac{10\times20+11\times80}{100}$ <b>A1</b> $10.8$` },
    { type: "struct", marks: 2, q: C`Explain why ¹²C and ¹⁴C have the same chemical properties.`,
      ms: C`<b>B1</b> they have the same number of electrons / the same electronic configuration<br><b>B1</b> chemical reactions depend on electrons (outer-shell electrons)` },
    { type: "struct", marks: 5, q: C`Diamond and graphite are both forms of carbon. Explain why diamond is very hard but graphite is soft, and why graphite conducts electricity but diamond does not.`,
      ms: C`<b>B1</b> diamond: each C bonded to 4 others by strong covalent bonds in a rigid 3D structure, so very hard<br><b>B1</b> graphite: each C bonded to 3 others in layers<br><b>B1</b> weak forces between the layers, so they slide (soft)<br><b>B1</b> graphite has one delocalised electron per carbon, free to move, so it conducts<br><b>B1</b> diamond has no free electrons: all are used in bonding` },
    { type: "struct", marks: 4, q: C`Carbon dioxide is a gas at room temperature, but silicon(IV) oxide melts at over 1600 °C. Explain this difference in terms of structure and bonding.`,
      ms: C`<b>B1</b> CO₂ is simple molecular<br><b>B1</b> only weak intermolecular forces must be overcome, needing little energy<br><b>B1</b> SiO₂ is giant covalent<br><b>B1</b> many strong covalent bonds must be broken, needing a lot of energy` },
    { type: "struct", marks: 2, q: C`Describe the arrangement of outer-shell electrons in an ammonia molecule, NH₃.`,
      ms: C`<b>B1</b> three shared pairs (N–H single bonds)<br><b>B1</b> one lone pair on nitrogen (8 electrons around N, 2 around each H)` },
    { type: "struct", marks: 3, q: C`State the numbers of protons, neutrons and electrons in $^{27}_{13}\text{Al}^{3+}$.`,
      ms: C`<b>B1</b> 13 protons <b>B1</b> 14 neutrons <b>B1</b> 10 electrons` },
    { type: "struct", marks: 3, q: C`Explain why magnesium oxide has a higher melting point than sodium chloride.`,
      ms: C`<b>B1</b> both are giant ionic lattices<br><b>B1</b> Mg²⁺/O²⁻ have higher charges than Na⁺/Cl⁻<br><b>B1</b> so stronger electrostatic attraction, needing more energy to overcome` },
    { type: "struct", marks: 3, q: C`Describe metallic bonding and use it to explain why copper conducts electricity.`,
      ms: C`<b>B1</b> lattice of positive ions<br><b>B1</b> in a sea of delocalised electrons, held by electrostatic attraction<br><b>B1</b> delocalised electrons are free to move through the structure and carry charge` }
  ]
});

/* ============================================================
   RATES OF REACTION  (0620: 6.2, with Ea from 5.1)
   ============================================================ */
TOPICS.push({
  id: "rates", subject: "chemistry", title: "Rates of reaction",
  blurb: "Measuring rate, reading rate graphs, collision theory, concentration, pressure, surface area, temperature, catalysts and enzymes.",
  level: "Core → Supplement", demo: "rates",
  syllabus: [
    ["6.2", "Describe practical methods for investigating rate: change in mass and formation of a gas", 1],
    ["6.2 S", "Evaluate practical methods for investigating the rate of a reaction", 1],
    ["6.2", "Interpret data, including graphs, from rate experiments", 2],
    ["6.2 S", "Collision theory: particles per unit volume, collision frequency, kinetic energy, activation energy", 3],
    ["6.2", "Effect of concentration and pressure on rate (S: explained using collision theory)", 4],
    ["6.2", "Effect of surface area on rate (S: explained using collision theory)", 5],
    ["6.2", "Effect of temperature on rate (S: explained using collision theory)", 6],
    ["6.2", "A catalyst increases rate and is unchanged at the end; enzymes as biological catalysts", 7],
    ["6.2 S", "A catalyst decreases the activation energy; reaction pathway diagrams", 7]
  ],
  sections: [
    { h: "What 'rate' means", body: C`
<p>The <b>rate of a reaction</b> is how fast reactants are used up or products are made:</p>
$$\text{rate}=\frac{\text{change in amount of reactant or product}}{\text{time taken}}$$
<p>Units follow from what you measure: cm³/s for gas volume, g/s for mass, mol/dm³/s for concentration. Rate is <b>not</b> the same as how much product you get. A fast reaction and a slow one can make exactly the same amount.</p>`},
    { h: "Measuring rate in the lab", body: C`
<ul>
<li><b>Volume of gas</b> produced over time: collect it in a <b>gas syringe</b> and read the volume every 10 s or so. An upturned measuring cylinder or burette of water also works, but only for gases that aren't very soluble.</li>
<li><b>Loss of mass</b>: run the reaction in a flask on a balance. As gas escapes, the mass falls. Put a cotton-wool plug in the neck so gas can escape but acid spray can't.</li>
<li><b>Precipitate forming</b> (the disappearing-cross method): sodium thiosulfate + acid makes a cloudy sulfur precipitate. Time how long until a cross under the flask can't be seen. Here $\text{rate}\propto\dfrac{1}{\text{time}}$.</li>
<li><b>Colour change</b>, observed or measured with a colorimeter.</li>
</ul>
<h3>Making it a fair test</h3>
<p>Change only <b>one</b> variable (the independent variable). Keep everything else the same: volume and concentration of acid, mass and size of solid, temperature, and the same apparatus. Start the timer at the moment the reactants mix.</p>
<h3>Evaluating methods (S)</h3>
<ul><li>A <b>gas syringe</b> is more accurate than collecting over water for CO₂, because CO₂ is slightly soluble in water, so some would dissolve and not be measured.</li>
<li><b>Mass loss</b> is poor for hydrogen: H₂ is so light that the mass change is tiny and hard to measure.</li>
<li>Some gas escapes before the bung is fitted. Fitting it quickly, or using a divided flask to mix after sealing, reduces this error.</li>
<li>The disappearing-cross end point is <b>subjective</b>: different people judge it differently. Use the same person, or a light sensor.</li>
<li>Repeat and calculate a mean to reduce random error. Identify and discard anomalous results.</li></ul>`},
    { h: "Reading rate graphs", body: C`
<p>On a graph of product (e.g. gas volume) against time:</p>
<div class="viz" data-viz="rateCurves"></div>
<ul>
<li>The <b>gradient is the rate</b>. It is steepest at the <b>start</b>, when the concentration of reactants is highest.</li>
<li>The gradient <b>decreases</b> over time as reactants are used up: lower concentration means less frequent collisions.</li>
<li>The line goes <b>horizontal</b> when the limiting reactant has run out. The reaction has stopped.</li>
<li>A <b>faster</b> reaction has a <b>steeper</b> initial gradient and levels off <b>sooner</b>.</li>
<li>The <b>final amount of product depends only on the amount of limiting reactant</b>, not on temperature, surface area or catalyst. Halve the limiting reactant and you halve the final plateau.</li>
</ul>
<p><b>Mean rate</b> over a period = change in amount ÷ time. <b>Rate at an instant</b> = gradient of the <b>tangent</b> to the curve at that time. Use a large triangle for accuracy.</p>
<div class="callout tip"><b class="t">Sketching a new curve</b>Ask two separate questions. (1) Does the change affect the <b>rate</b>? Then make it steeper or shallower at the start. (2) Does it change the amount of the <b>limiting</b> reactant? Then change the final height. If not, keep the same final height.</div>`},
    { h: "Collision theory (S)", body: C`
<p>For particles to react they must:</p>
<ol><li><b>collide</b>, and</li><li>collide with energy at least equal to the <b>activation energy</b>, $E_a$: the <b>minimum energy that colliding particles must have to react</b>.</li></ol>
<p>Most collisions don't have enough energy, and the particles just bounce apart. So the rate depends on the <b>frequency of successful collisions</b>, which depends on:</p>
<ul><li>the <b>number of particles per unit volume</b> (concentration or pressure)</li>
<li>how often they collide (<b>collision frequency</b>)</li>
<li>their <b>kinetic energy</b>: what fraction of collisions have $E\ge E_a$.</li></ul>
<div class="callout key"><b class="t">A* phrasing</b>Always say "<b>more frequent</b> collisions" or "more collisions <b>per second</b>" (or "per unit time"), never just "more collisions". Examiners specifically refuse the second, because a reaction that runs longer also has more collisions in total.</div>`},
    { h: "Concentration and pressure", body: C`
<p><b>Higher concentration</b> of a solution means more reactant particles in the <b>same volume</b>. They collide <b>more frequently</b>, so there are more successful collisions per second and the rate is higher.</p>
<p><b>Higher pressure</b> of a gas has the same effect: the same number of gas particles squeezed into a smaller volume, so more particles per unit volume and more frequent collisions.</p>
<p>The particles' energies are <b>unchanged</b>, so the fraction of collisions that succeed is the same. There are just more collisions per second.</p>`},
    { h: "Surface area", body: C`
<p>Only particles on the <b>surface</b> of a solid can collide with the other reactant. Breaking a lump into a powder exposes far more particles, giving a <b>larger surface area to volume ratio</b>, so collisions are more frequent and the rate is higher.</p>
<p>Cutting a 1 cm cube into 1 mm cubes increases the surface area 10 times with the same mass.</p>
<p>This is why <b>fine powders can be explosive</b>: flour dust in mills, coal dust in mines, and custard powder. The huge surface area lets combustion happen almost instantly.</p>
<p>In a graph comparison, powder gives a steeper initial curve. With the <b>same mass</b> of solid (if it's limiting), it reaches the <b>same final volume</b>.</p>`},
    { h: "Temperature", body: C`
<p>Raising the temperature increases rate for <b>two</b> reasons, and full marks need both:</p>
<ol><li>Particles have more kinetic energy and <b>move faster</b>, so they collide <b>more frequently</b>.</li>
<li>More importantly, a <b>greater proportion of collisions have energy ≥ $E_a$</b>, so a larger fraction of collisions are successful.</li></ol>
<div class="viz" data-viz="energyDist"></div>
<p>The second effect is much larger, which is why a rise of just 10 °C can roughly <b>double</b> the rate even though the particles are only a few percent faster.</p>
<p>Use the particle simulator below: raise the temperature and watch the successful collisions (flashes) increase.</p>`},
    { h: "Catalysts and enzymes", body: C`
<p>A <b>catalyst</b> is a substance that <b>increases the rate</b> of a reaction and is <b>chemically unchanged</b> (not used up) at the end. Only small amounts are needed, and it doesn't appear in the overall equation. It doesn't change the amount of product.</p>
<p>(S) <b>How:</b> it provides an <b>alternative reaction pathway with a lower activation energy</b>. At the same temperature, a <b>greater proportion of collisions</b> now have energy ≥ the new, lower $E_a$, so more collisions are successful.</p>
<p><b>Reaction pathway diagram:</b> energy on the y-axis and progress of reaction on the x-axis. The reactant and product levels are unchanged by a catalyst, but the "hump" ($E_a$, measured from the reactants up to the peak) is <b>lower</b> with a catalyst. Draw it as a second, lower curve between the same start and end levels.</p>
<p>Industrial examples: iron in the Haber process; vanadium(V) oxide in the Contact process.</p>
<h3>Enzymes</h3>
<p><b>Enzymes</b> are proteins that act as <b>biological catalysts</b>. They work best at an <b>optimum temperature</b> (often around 37 °C) and optimum pH. Above the optimum, the enzyme is <b>denatured</b>: its shape (active site) is permanently changed, so it stops working and the rate falls. That's why the rate curve rises and then drops sharply.</p>
<div class="callout warn"><b class="t">Wrong ideas</b>"A catalyst gives particles more energy." It doesn't; it lowers the energy needed. "A catalyst makes more product." It doesn't; it gives the same amount, faster.</div>`}
  ],
  worked: [
    { q: C`Marble chips react with excess HCl. Sketch how the gas-volume curve changes if the same mass of powdered marble is used.`,
      steps: [C`Powder has a larger surface area, so collisions are more frequent and the rate is higher.`, C`The curve is steeper initially and levels off sooner.`, C`Same mass of marble (the limiting reactant), so it reaches the <b>same final volume</b>.`]},
    { q: C`In an experiment, 24 cm³ of gas is collected in the first 10 s and 40 cm³ after 20 s. Calculate the mean rate for (a) the first 10 s, (b) 10–20 s, and explain the difference.`,
      steps: [C`(a) $\dfrac{24}{10}=2.4$ cm³/s.`, C`(b) $\dfrac{40-24}{10}=1.6$ cm³/s.`, C`The rate falls because reactants are used up: lower concentration means less frequent collisions.`]}
  ],
  formulas: [["Mean rate", C`$\dfrac{\text{change in amount}}{\text{time}}$`], ["Rate at an instant", "gradient of the tangent"], ["Disappearing cross", C`$\text{rate}\propto\dfrac1{\text{time}}$`]],
  cards: [
    ["Define activation energy", "The minimum energy that colliding particles must have to react."],
    ["Two conditions for particles to react", "They must collide, with energy ≥ activation energy."],
    ["How does a catalyst work?", "It provides an alternative pathway with a lower activation energy and is unchanged at the end."],
    ["Does a catalyst change the amount of product?", "No: the same amount, made faster."],
    ["Why does temperature increase rate? (2 reasons)", "Particles move faster, so collisions are more frequent, and a greater proportion of collisions have energy ≥ Ea."],
    ["Why does concentration increase rate?", "More particles per unit volume, so more frequent collisions."],
    ["Why does pressure increase the rate of gas reactions?", "More gas particles per unit volume, so more frequent collisions."],
    ["Why does powder react faster than lumps?", "Larger surface area exposes more particles, so collisions are more frequent."],
    ["Why can flour dust explode?", "Its enormous surface area makes combustion extremely fast."],
    ["What decides the final volume of gas?", "The amount of the limiting reactant."],
    ["How do you find the rate from a graph?", "The gradient (tangent at a point, or change ÷ time for the mean)."],
    ["Why does a rate curve get less steep?", "Reactants are used up, so concentration falls and collisions become less frequent."],
    ["Two ways to measure the rate of CaCO₃ + HCl", "Volume of CO₂ in a gas syringe, or mass loss on a balance."],
    ["Why use a cotton-wool plug in mass-loss experiments?", "It lets gas escape but stops acid spray escaping."],
    ["Why is collecting CO₂ over water less accurate?", "CO₂ is slightly soluble in water, so some dissolves."],
    ["Disappearing-cross method measures…", "Time for a precipitate (sulfur) to hide the cross; rate ∝ 1/time."],
    ["What is an enzyme?", "A protein that acts as a biological catalyst."],
    ["What happens to an enzyme above its optimum temperature?", "It is denatured: its shape changes and it stops working."],
    ["Examiner phrase to avoid", "\"More collisions\": say \"more frequent collisions\" or \"more collisions per second\"."],
    ["Catalyst on a pathway diagram", "Same reactant and product levels, lower peak (smaller Ea)."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`A catalyst increases the rate because it`, opts: ["Gives particles more energy", "Lowers the activation energy", "Increases concentration", "Raises the temperature"], ans: 1, why: C`An alternative route with lower $E_a$.` },
    { type: "mcq", marks: 2, q: C`Halving the mass of magnesium (the limiting reactant) in excess acid makes the final hydrogen volume`, opts: ["Double", "The same", "Half", "Zero"], ans: 2, why: C`The final amount of product depends on the limiting reactant.` },
    { type: "mcq", marks: 1, q: C`Which change does <b>not</b> increase the rate of CaCO₃ + HCl?`, opts: ["Using powder", "Heating the acid", "Using more concentrated acid", "Using larger marble chips"], ans: 3, why: C`Larger chips have a smaller surface area, so the rate decreases.` },
    { type: "mcq", marks: 1, q: C`Suitable units for a rate measured by collecting gas are`, opts: ["cm³", "s", "cm³/s", "g"], ans: 2, why: C`Volume ÷ time.` },
    { type: "mcq", marks: 1, q: C`60 cm³ of gas is collected in the first 30 s. The mean rate is`, opts: ["0.5 cm³/s", "2 cm³/s", "30 cm³/s", "1800 cm³/s"], ans: 1, why: C`$60/30=2$ cm³/s.` },
    { type: "mcq", marks: 1, q: C`Increasing the pressure of a gaseous reaction increases the rate because`, opts: ["Particles have more energy", "The activation energy falls", "There are more particles per unit volume", "The particles get bigger"], ans: 2, why: C`More particles per unit volume means more frequent collisions.` },
    { type: "mcq", marks: 1, q: C`Which statement about a catalyst is correct?`, opts: ["It is used up in the reaction", "It increases the yield", "It is chemically unchanged at the end", "It raises the activation energy"], ans: 2, why: C`By definition it is not used up.` },
    { type: "mcq", marks: 1, q: C`An enzyme-catalysed reaction slows sharply above 45 °C because the enzyme`, opts: ["Runs out", "Is denatured", "Becomes a reactant", "Has too little energy"], ans: 1, why: C`High temperature changes the enzyme's shape (active site).` },
    { type: "struct", marks: 3, q: C`Explain, using collision theory, why increasing the temperature increases the rate.`,
      ms: C`<b>B1</b> particles have more kinetic energy / move faster<br><b>B1</b> more frequent collisions (more collisions per second)<br><b>B1</b> a greater proportion of collisions have energy ≥ activation energy` },
    { type: "struct", marks: 3, q: C`Explain, using collision theory, why magnesium reacts faster with 2.0 mol/dm³ HCl than with 0.5 mol/dm³ HCl.`,
      ms: C`<b>B1</b> more acid particles per unit volume<br><b>B1</b> more frequent collisions<br><b>B1</b> so more successful collisions per second` },
    { type: "struct", marks: 5, q: C`Describe how you would investigate the rate of reaction between marble chips and hydrochloric acid using a balance.`,
      ms: C`<b>B1</b> put the acid in a conical flask on a balance; add the marble chips and start the timer<br><b>B1</b> cotton-wool plug in the neck (lets CO₂ out, keeps acid spray in)<br><b>B1</b> record the mass at regular intervals (e.g. every 30 s) until constant<br><b>B1</b> plot mass lost against time<br><b>B1</b> control: same volume and concentration of acid, same mass and size of chips, same temperature` },
    { type: "struct", marks: 4, q: C`Gas volumes (cm³) at 0, 10, 20, 30, 40, 50, 60, 70 s: 0, 24, 40, 50, 56, 59, 60, 60. (a) Calculate the mean rate in the first 20 s. (b) When did the reaction stop? (c) Explain why the rate decreases.`,
      ms: C`(a) <b>M1</b> $40/20$ <b>A1</b> 2.0 cm³/s<br>(b) <b>B1</b> at about 60 s (volume stops changing)<br>(c) <b>B1</b> reactants are used up, so concentration falls and collisions become less frequent` },
    { type: "struct", marks: 4, q: C`Zinc reacts with excess sulfuric acid. On the same axes as the original curve, describe the curves for (a) the same experiment at a higher temperature, (b) half the mass of zinc.`,
      ms: C`(a) <b>B1</b> steeper initial gradient <b>B1</b> levels off sooner at the same final volume<br>(b) <b>B1</b> less steep (or similar) start <b>B1</b> levels off at half the final volume` },
    { type: "struct", marks: 4, q: C`Describe how a catalyst increases the rate of a reaction. Describe how a reaction pathway diagram shows this.`,
      ms: C`<b>B1</b> provides an alternative pathway (route)<br><b>B1</b> with a lower activation energy<br><b>B1</b> so a greater proportion of collisions are successful<br><b>B1</b> diagram: the catalysed curve has a lower peak between the same reactant and product energy levels` },
    { type: "struct", marks: 3, q: C`Explain why powdered calcium carbonate reacts faster with acid than the same mass in lumps.`,
      ms: C`<b>B1</b> powder has a larger surface area<br><b>B1</b> more particles exposed to the acid<br><b>B1</b> more frequent collisions` },
    { type: "struct", marks: 2, q: C`Suggest why a gas syringe is a better way to collect carbon dioxide than an upturned measuring cylinder of water.`,
      ms: C`<b>B1</b> CO₂ is (slightly) soluble in water<br><b>B1</b> so some would dissolve and not be measured, making the volume too low` },
    { type: "struct", marks: 3, q: C`In the reaction between sodium thiosulfate and acid, the time for a cross to disappear is measured. Explain how this measures the rate, and give one weakness of the method.`,
      ms: C`<b>B1</b> a precipitate of sulfur forms, making the solution cloudy<br><b>B1</b> the time for the cross to be hidden is longer for a slower reaction; rate ∝ 1/time<br><b>B1</b> the end point is subjective (judged by eye); different people may judge differently` },
    { type: "struct", marks: 3, q: C`Explain why fine flour dust in a mill can explode, while a bag of flour burns only slowly.`,
      ms: C`<b>B1</b> fine dust particles have a very large surface area<br><b>B1</b> many particles exposed to oxygen, so extremely frequent collisions<br><b>B1</b> combustion is so fast that heat and gas are released almost instantly (explosion)` }
  ]
});
