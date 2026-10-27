window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;

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
}
