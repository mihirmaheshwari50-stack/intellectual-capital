window.TOPICS = window.TOPICS || [];
const C = String.raw;

TOPICS.push({
  id: "moles", subject: "chemistry", title: "The mole & stoichiometry",
  blurb: "Moles, Mr, reacting masses, gas volumes, concentration, limiting reagents, yield.",
  level: "Core → Supplement", demo: "mole",
  sections: [
    { h: "Why chemists count in moles", body: C`
<p>Atoms are far too small to count individually, so chemists count them in packs. One <b>mole</b> is $6.02\times10^{23}$ particles (the <b>Avogadro constant</b>).</p>
<p>The clever part: the mass of one mole of a substance in grams equals its <b>relative formula mass $M_r$</b>. So 12 g of carbon and 18 g of water each contain exactly one mole of particles.</p>
$$n=\frac{m}{M_r}\qquad\text{(moles = mass} \div M_r)$$
<p>$M_r$ is the sum of the relative atomic masses $A_r$ in the formula: $M_r(\text{H}_2\text{SO}_4)=2(1)+32+4(16)=98$.</p>`},
    { h: "Reacting masses: the 3-step method", body: C`
<p>A balanced equation tells you the <b>mole ratio</b>, not the mass ratio. Every reacting-mass question follows the same path:</p>
<ol><li><b>Mass → moles</b> of what you know ($n=m/M_r$).</li>
<li><b>Use the ratio</b> from the balanced equation.</li>
<li><b>Moles → mass</b> (or volume, or concentration) of what you want.</li></ol>
<div class="callout warn"><b class="t">Common mistake</b>Using the mass ratio straight from the equation, or forgetting to balance the equation first. Big numbers in front (coefficients) are part of the ratio. Small subscripts are part of $M_r$.</div>`},
    { h: "Gases and solutions", body: C`
<p><b>Gases</b>: one mole of <i>any</i> gas occupies <b>24 dm³</b> at room temperature and pressure (r.t.p.). So $V=n\times24$ dm³. This works because gas particles are so far apart that their own size does not matter.</p>
<p><b>Solutions</b>: concentration $c=\dfrac{n}{V}$ in mol/dm³ with $V$ in <b>dm³</b>. Convert cm³ by dividing by 1000. Concentration can also be given in g/dm³ (multiply mol/dm³ by $M_r$).</p>
<p><b>Titration</b> uses the same steps: moles of the known solution, then the ratio, then the concentration of the unknown.</p>`},
    { h: "Limiting reagent, yield and purity", body: C`
<p>The <b>limiting reagent</b> runs out first and decides how much product forms. Work out moles of each reactant, divide by its coefficient, and the smaller value is the limiting one. The other is <b>in excess</b>.</p>
<p>$\text{percentage yield}=\dfrac{\text{actual}}{\text{theoretical}}\times100$. Yield is below 100% because of incomplete reactions, side reactions, and product lost during filtering and transferring.</p>
<p><b>Empirical formula</b>: simplest whole-number ratio of atoms. Divide each mass (or %) by $A_r$, then divide by the smallest. <b>Molecular formula</b> is a whole-number multiple of it, found using $M_r$.</p>`}
  ],
  worked: [
    { q: C`What mass of CO₂ forms when 25 g of CaCO₃ decomposes? $\text{CaCO}_3\rightarrow\text{CaO}+\text{CO}_2$`,
      steps: [C`$M_r(\text{CaCO}_3)=40+12+48=100$, so $n=25/100=0.25$ mol.`, C`Ratio 1 : 1, so 0.25 mol CO₂.`, C`$M_r(\text{CO}_2)=44$, mass $=0.25\times44=11$ g. Volume at r.t.p. $=0.25\times24=6$ dm³.`]},
    { q: C`25.0 cm³ of NaOH is neutralised by 20.0 cm³ of 0.100 mol/dm³ HCl. Find the NaOH concentration.`,
      steps: [C`$n(\text{HCl})=0.100\times\dfrac{20.0}{1000}=0.00200$ mol.`, C`$\text{NaOH}+\text{HCl}$ react 1 : 1, so $n(\text{NaOH})=0.00200$ mol.`, C`$c=\dfrac{0.00200}{0.0250}=0.0800$ mol/dm³.`]},
    { q: C`A compound contains 40.0% C, 6.7% H, 53.3% O. $M_r=60$. Find the molecular formula.`,
      steps: [C`Divide by $A_r$: C $40/12=3.33$, H $6.7/1=6.7$, O $53.3/16=3.33$.`, C`Divide by smallest: 1 : 2 : 1, so empirical CH₂O ($M_r=30$).`, C`$60/30=2$, giving molecular formula C₂H₄O₂.`]}
  ],
  formulas: [
    ["Moles from mass", C`$n=\dfrac{m}{M_r}$`], ["Gas volume (r.t.p.)", C`$V=n\times24\text{ dm}^3$`], ["Concentration", C`$c=\dfrac nV$`],
    ["Particles", C`$N=n\times6.02\times10^{23}$`], ["% yield", C`$\dfrac{\text{actual}}{\text{theoretical}}\times100$`], ["% by mass", C`$\dfrac{A_r\times\text{no. atoms}}{M_r}\times100$`]
  ],
  cards: [
    ["Avogadro constant?", C`$6.02\times10^{23}$ particles per mole`],
    ["Molar gas volume at r.t.p.?", "24 dm³"],
    ["Convert cm³ to dm³", "Divide by 1000."],
    ["What is the limiting reagent?", "The reactant that is used up first. It determines the amount of product."],
    ["Empirical formula definition", "The simplest whole-number ratio of atoms of each element in a compound."],
    ["Why is percentage yield below 100%?", "Incomplete or reversible reaction, side reactions, losses during separation."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`How many moles are in 8 g of oxygen gas, O₂ ($A_r$ O = 16)?`, opts: ["0.5", "0.25", "2", "4"], ans: 1, why: C`$M_r(\text{O}_2)=32$; $8/32=0.25$ mol. The trap is using 16.` },
    { type: "mcq", marks: 1, q: C`Volume of 0.5 mol of CO₂ at r.t.p.?`, opts: ["6 dm³", "12 dm³", "24 dm³", "48 dm³"], ans: 1, why: C`$0.5\times24=12$ dm³.` },
    { type: "mcq", marks: 2, q: C`Moles of NaOH in 50 cm³ of 2.0 mol/dm³ solution?`, opts: ["100", "0.1", "0.04", "25"], ans: 1, why: C`$2.0\times\dfrac{50}{1000}=0.1$ mol.` },
    { type: "struct", marks: 4, q: C`Calculate the mass of iron formed when 32 g of Fe₂O₃ is reduced: $\text{Fe}_2\text{O}_3+3\text{CO}\rightarrow2\text{Fe}+3\text{CO}_2$ ($A_r$: Fe 56, O 16).`,
      ms: C`<b>M1</b> $M_r(\text{Fe}_2\text{O}_3)=160$<br><b>M1</b> $n=32/160=0.2$ mol<br><b>M1</b> ratio 1:2, so 0.4 mol Fe<br><b>A1</b> $0.4\times56=22.4$ g` }
  ]
});

TOPICS.push({
  id: "bonding", subject: "chemistry", title: "Atoms, bonding & structure",
  blurb: "Atomic structure, ionic, covalent and metallic bonding, and why properties follow.",
  level: "Core → Supplement", demo: "atom",
  sections: [
    { h: "Inside the atom", body: C`
<table class="t"><tr><th>Particle</th><th>Relative mass</th><th>Charge</th><th>Where</th></tr>
<tr><td>Proton</td><td>1</td><td>+1</td><td>Nucleus</td></tr><tr><td>Neutron</td><td>1</td><td>0</td><td>Nucleus</td></tr><tr><td>Electron</td><td>1/1840</td><td>−1</td><td>Shells</td></tr></table>
<p><b>Proton (atomic) number</b> = number of protons, which defines the element. <b>Nucleon (mass) number</b> = protons + neutrons. <b>Isotopes</b> have the same proton number but different neutron numbers, so they have the same chemistry (same electrons) but different masses.</p>
<p>Electrons fill shells 2, 8, 8 for the first 20 elements. <b>Group number = outer electrons, period = number of shells.</b> Atoms react to gain a full outer shell. That single idea drives all of bonding.</p>`},
    { h: "Ionic bonding", body: C`
<p>Forms between a <b>metal and non-metal</b>. The metal <b>transfers</b> electrons to the non-metal, making oppositely charged ions held by strong <b>electrostatic attraction</b> in a giant ionic lattice.</p>
<p>Na (2,8,1) loses 1 electron to become Na⁺ (2,8). Cl (2,8,7) gains 1 to become Cl⁻ (2,8,8). Draw dot-and-cross diagrams with square brackets and charges.</p>
<div class="viz" data-viz="ionic"></div>
<p><b>Properties explained:</b> high melting points (many strong attractions to overcome). They conduct when <b>molten or dissolved</b> because ions are free to move, but not when solid because the ions are fixed in the lattice.</p>`},
    { h: "Covalent bonding", body: C`
<p>Forms between <b>non-metals</b> that <b>share</b> pairs of electrons. A covalent bond is the attraction between the shared pair and both nuclei.</p>
<div class="callout key"><b class="t">The distinction that gets A*</b><b>Simple molecules</b> (H₂O, CO₂, CH₄) have strong covalent bonds <i>within</i> molecules but weak <b>intermolecular forces</b> <i>between</i> them. Melting or boiling only overcomes the weak forces, so melting points are low. Covalent bonds do <b>not</b> break when water boils.</div>
<p><b>Giant covalent</b> structures (diamond, graphite, SiO₂) have strong bonds throughout, so you must break covalent bonds to melt them, giving very high melting points.</p>
<ul><li><b>Diamond</b>: each C bonded to 4 others. Very hard, used in cutting tools, does not conduct.</li>
<li><b>Graphite</b>: each C bonded to 3 in layers, with one <b>delocalised electron</b> per atom, so it <b>conducts</b>. Weak forces between layers let them slide, making it a lubricant.</li></ul>`},
    { h: "Metallic bonding", body: C`
<p>A lattice of <b>positive metal ions</b> in a "sea" of <b>delocalised electrons</b>, held by electrostatic attraction between them.</p>
<p>It conducts because the delocalised electrons move and carry charge. It is malleable because layers of ions slide over each other without breaking the bonding, since the electron sea moves with them.</p>
<table class="t"><tr><th>Structure</th><th>m.p.</th><th>Conducts?</th></tr>
<tr><td>Giant ionic</td><td>High</td><td>Molten/aqueous only</td></tr>
<tr><td>Simple molecular</td><td>Low</td><td>No</td></tr>
<tr><td>Giant covalent</td><td>Very high</td><td>No (graphite yes)</td></tr>
<tr><td>Metallic</td><td>High</td><td>Yes, solid and molten</td></tr></table>`}
  ],
  worked: [
    { q: C`Explain why magnesium oxide has a much higher melting point than sodium chloride.`,
      steps: [C`Both are giant ionic lattices.`, C`MgO contains Mg²⁺ and O²⁻ (charges of 2), but NaCl has Na⁺ and Cl⁻ (charges of 1).`, C`Higher charges give stronger electrostatic attraction, so more energy is needed to overcome it.`]}
  ],
  formulas: [["Mass number", C`$A=\text{protons}+\text{neutrons}$`], ["Neutrons", C`$A-Z$`], ["Ion charge", C`protons − electrons`]],
  cards: [
    ["What is an isotope?", "Atoms of the same element with the same number of protons but different numbers of neutrons."],
    ["Why does NaCl conduct only when molten/dissolved?", "Ions must be free to move. In the solid they are fixed in the lattice."],
    ["Why does water have a low boiling point?", "Only weak intermolecular forces are overcome. The covalent bonds do not break."],
    ["Why does graphite conduct?", "Each carbon has one delocalised electron that can move through the layers."],
    ["Describe metallic bonding.", "Positive ions in a sea of delocalised electrons, held by electrostatic attraction."],
    ["Electron configuration of Ca?", "2, 8, 8, 2"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`An atom has 17 protons and 18 neutrons. Its mass number is`, opts: ["17", "18", "35", "1"], ans: 2, why: C`$17+18=35$ (this is chlorine-35).` },
    { type: "mcq", marks: 2, q: C`When ice melts, what is overcome?`, opts: ["Covalent bonds", "Ionic bonds", "Intermolecular forces", "Metallic bonds"], ans: 2, why: C`Water is a simple molecule. Only the weak forces between molecules are overcome.` },
    { type: "mcq", marks: 1, q: C`Which conducts electricity as a solid?`, opts: ["Sodium chloride", "Diamond", "Graphite", "Sulfur"], ans: 2, why: C`Graphite has delocalised electrons.` },
    { type: "struct", marks: 3, q: C`Explain why metals are malleable.`,
      ms: C`<b>B1</b> regular layers/lattice of positive ions.<br><b>B1</b> layers can slide over each other.<br><b>B1</b> delocalised electrons still hold them together, so the bonding is not broken.` }
  ]
});

TOPICS.push({
  id: "rates", subject: "chemistry", title: "Rates of reaction",
  blurb: "Collision theory, temperature, concentration, surface area, catalysts, graphs.",
  level: "Core → Supplement", demo: "rates",
  sections: [
    { h: "Collision theory", body: C`
<p>For particles to react they must <b>collide</b> with energy at least equal to the <b>activation energy $E_a$</b>. Most collisions do not have enough energy and simply bounce off.</p>
<p>So the rate depends on the <b>frequency of successful collisions</b>: how often particles collide, and what fraction of those collisions have $E\ge E_a$.</p>
<div class="callout key"><b class="t">A* phrasing</b>Always say "<b>more frequent</b> collisions" or "more collisions <b>per second</b>", never just "more collisions". Examiners specifically penalise this.</div>`},
    { h: "The four factors", body: C`
<ul>
<li><b>Concentration / pressure ↑</b>: more particles per unit volume, so more frequent collisions.</li>
<li><b>Surface area ↑</b> (powder vs lumps): more particles exposed, so more frequent collisions.</li>
<li><b>Temperature ↑</b>: particles move faster, giving more frequent collisions, <b>and</b> a greater proportion of collisions have energy ≥ $E_a$. The second effect matters most, which is why a 10 °C rise can roughly double the rate.</li>
<li><b>Catalyst</b>: provides an alternative pathway with a <b>lower activation energy</b>, so a greater proportion of collisions are successful. It is not used up.</li>
</ul>
<div class="viz" data-viz="energyDist"></div>
<p>Use the particle simulator below: raise the temperature and watch the successful collisions (flashes) increase.</p>`},
    { h: "Reading rate graphs", body: C`
<p>On a graph of product (e.g. gas volume) against time, the <b>gradient is the rate</b>. It is steepest at the start (highest concentration), gets shallower as reactants are used up, and flattens when the limiting reactant runs out.</p>
<ul><li>A faster reaction gives a steeper start and finishes sooner.</li>
<li>The <b>final amount of product depends only on the amount of limiting reactant</b>, not on temperature or catalyst. Halving the amount of reactant halves the final plateau.</li></ul>
<p>To find the rate at a point, draw a tangent and calculate its gradient. Average rate = total change ÷ time.</p>`}
  ],
  worked: [
    { q: C`Marble chips react with excess HCl. Sketch how the gas-volume curve changes if powdered marble of the same mass is used.`,
      steps: [C`Powder has larger surface area, so collisions are more frequent and the rate is higher.`, C`The curve is steeper initially and levels off sooner.`, C`Same mass of marble (limiting), so it reaches the <b>same final volume</b>.`]}
  ],
  formulas: [["Mean rate", C`$\dfrac{\text{change in amount}}{\text{time}}$`], ["Rate at a point", "gradient of tangent"]],
  cards: [
    ["What is activation energy?", "Minimum energy colliding particles need in order to react."],
    ["How does a catalyst work?", "It provides an alternative pathway with lower activation energy. It is not used up."],
    ["Why does temperature increase rate? (2 reasons)", "Particles move faster, so collisions are more frequent, and more collisions have energy ≥ Ea."],
    ["What decides the final volume of gas?", "The amount of limiting reactant."],
    ["Rate from a graph?", "The gradient (tangent at a point)."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`A catalyst increases rate because it`, opts: ["Gives particles more energy", "Lowers the activation energy", "Increases concentration", "Raises the temperature"], ans: 1, why: C`An alternative route with lower $E_a$.` },
    { type: "mcq", marks: 2, q: C`Halving the mass of magnesium (limiting) in excess acid makes the final hydrogen volume`, opts: ["Double", "The same", "Half", "Zero"], ans: 2, why: C`Final product depends on the limiting reactant.` },
    { type: "struct", marks: 3, q: C`Explain, using collision theory, why increasing temperature increases the rate.`,
      ms: C`<b>B1</b> particles have more kinetic energy / move faster.<br><b>B1</b> more frequent collisions.<br><b>B1</b> a greater proportion of collisions have energy ≥ activation energy.` }
  ]
});
