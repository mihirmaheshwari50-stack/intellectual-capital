window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
//@@HELPERS-START
// ---- diagram helpers for this topic ----
// electron marks: dot (filled), cross, ring (open circle)
const mk = (x, y, m) => m === "cross" ? F.cross(x, y, "o", 4) : m === "ring" ? F.circ(x, y, 3.6, "g mid bgF") : F.dot(x, y, "k", 3.4);
// covalent dot-and-cross: atoms [{x,y,r,s,m}], bonds [[a,b,pairs]], lone [[a,deg,pairs]]
const cov = (w, h, atoms, bonds, lone, cap) => {
  let s = atoms.map(a => F.circ(a.x, a.y, a.r, "m mid")).join("") + atoms.map(a => F.text(a.x, a.y + 6, a.s, "tk bold big")).join("");
  bonds.forEach(([i, j, n]) => { const A = atoms[i], B = atoms[j], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d, px = -uy, py = ux;
    const t = ((d - B.r) + A.r) / 2; for (let k = 0; k < n; k++) { const off = (k - (n - 1) / 2) * 12, cx = A.x + ux * t + px * off, cy = A.y + uy * t + py * off; s += mk(cx - ux * 5, cy - uy * 5, A.m) + mk(cx + ux * 5, cy + uy * 5, B.m); } });
  lone.forEach(([i, deg, n = 1]) => { const A = atoms[i]; for (let k = 0; k < n; k++) { const a = (deg + (k - (n - 1) / 2) * 0) * Math.PI / 180, x = A.x + A.r * Math.cos(a), y = A.y - A.r * Math.sin(a), tx = -Math.sin(a) * 5, ty = -Math.cos(a) * 5; s += mk(x + tx, y + ty, A.m) + mk(x - tx, y - ty, A.m); } });
  return F.fig(w, h, s, cap);
};
// outer-shell ion for dot-and-cross ionic diagrams
const ion = (x, y, sym, marks, charge, r = 46) => { let s = F.circ(x, y, r, "m mid") + F.text(x, y + 6, sym, "tk bold big");
  marks.forEach((m, k) => { const a = (Math.floor(k / 2) * 90 + (k % 2 ? 14 : -14) + 90) * Math.PI / 180; s += mk(x + r * Math.cos(a), y - r * Math.sin(a), m); });
  return s + (charge ? F.bracket(x, y, r + 12, charge) : ""); };
const nucleusAtom = (cx, cy, p, n, shells, cap, w = 280, h = 240) => {
  let s = ""; shells.forEach((_, i) => s += F.circ(cx, cy, 34 + i * 26, "m thin"));
  const pts = []; for (let i = 0; i < p + n; i++) { const a = i * 2.4, rr = 3.6 * Math.sqrt(i); pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a), i % 2 === 0 && pts.filter(q => q[2]).length < p]); }
  pts.forEach(([x, y, isP]) => s += F.circ(x, y, 4.2, isP ? "rF" : "mF"));
  shells.forEach((n2, i) => { for (let k = 0; k < n2; k++) { const a = (k / n2) * Math.PI * 2 + i * .4; s += F.dot(cx + (34 + i * 26) * Math.cos(a), cy + (34 + i * 26) * Math.sin(a), "b", 4); } });
  return F.fig(w, h, s, cap, { size: "tiny" });
};
const particles = (items, cap) => { let s = F.rect(10, 10, 200, 150, "k bgF", 10) + (Array.isArray(items) ? items.join("") : items); return F.fig(220, 170, s, cap, { size: "tiny" }); };
const pa = (x, y, c = "b", r = 9) => F.circ(x, y, r, c + "S " + c);
//@@HELPERS-END

/* ============================================================
   ATOMS, BONDING & STRUCTURE  (0620: 2.1–2.7)
   ============================================================ */
TOPICS.push({
  id: "bonding", subject: "chemistry", unit: 2, title: "Atoms, bonding & structure",
  blurb: "Atomic structure, isotopes, ionic, covalent and metallic bonding, giant structures, and why properties follow from structure.",
  level: "Core → Supplement", demo: "atom",
  syllabus: [
    ["2.1", "Describe elements, compounds and mixtures", 0],
    ["2.2", "Structure of the atom: protons, neutrons, electrons; relative charges and masses", 1],
    ["2.2", "Proton number, mass number; electronic configuration of the first 20 elements; group and period", 2],
    ["2.3", "Isotopes and isotope notation", 3],
    ["2.3 S", "Isotopes have the same chemical properties; calculate $A_r$ from isotopic abundances", 3],
    ["2.4", "Formation of positive and negative ions; ionic bonds; dot-and-cross diagrams for Group I + Group VII compounds", 4],
    ["2.4 S", "Giant ionic lattices; dot-and-cross diagrams for other metal/non-metal ionic compounds", 4],
    ["2.4", "Properties of ionic compounds (S: explained by structure and bonding)", 5],
    ["2.5", "Covalent bonds; dot-and-cross diagrams for H₂, Cl₂, H₂O, CH₄, NH₃, HCl", 6],
    ["2.5 S", "Dot-and-cross diagrams for CH₃OH, C₂H₄, O₂, CO₂ and N₂", 6],
    ["2.5", "Properties of simple molecular compounds (S: intermolecular forces)", 7],
    ["2.6", "Giant covalent structures: diamond and graphite; their properties and uses", 8],
    ["2.6 S", "Silicon(IV) oxide and its similarity to diamond", 8],
    ["2.7 S", "Metallic bonding and the properties of metals", 9]
  ],
  sections: [
    { h: "Elements, compounds and mixtures (2.1)", body: C`
${F.row(
  particles([pa(50, 50), pa(90, 50), pa(130, 50), pa(170, 50), pa(50, 90), pa(90, 90), pa(130, 90), pa(170, 90), pa(70, 130), pa(110, 130), pa(150, 130)], "Element (atoms), e.g. iron"),
  particles([[45, 50], [125, 45], [70, 95], [150, 100], [55, 135], [140, 140]].map(([x, y]) => pa(x, y, "g") + pa(x + 17, y, "g")).join(""), "Element (molecules), e.g. O₂"),
  particles([[40, 50], [120, 45], [70, 100], [150, 100], [90, 140]].map(([x, y]) => pa(x, y, "o", 11) + pa(x + 19, y, "b", 8)).join(""), "Compound, e.g. CO (chemically bonded)"),
  particles([pa(45, 50), pa(150, 60), pa(100, 130), [80, 70], [140, 120], [40, 120]].map(v => typeof v === "string" ? v : pa(v[0], v[1], "g") + pa(v[0] + 17, v[1], "g")).join("") + pa(110, 40, "o", 11) + pa(129, 40, "b", 8), "Mixture: not chemically joined")
)}
<ul><li><b>Element</b>: a substance made of only <b>one type of atom</b> (all with the same proton number). It cannot be broken down into anything simpler by chemical means. About 118 are known.</li>
<li><b>Compound</b>: two or more elements <b>chemically bonded</b> together in a <b>fixed ratio</b>. A compound has <b>completely different properties</b> from its elements: sodium (a reactive metal) and chlorine (a toxic green gas) form sodium chloride (table salt). It can only be separated into its elements by a <b>chemical reaction</b>.</li>
<li><b>Mixture</b>: two or more substances <b>not</b> chemically joined. The proportions can vary, each part keeps its own properties, and it can be separated by <b>physical methods</b>: filtration, crystallisation, distillation, chromatography. Air, sea water and alloys are mixtures.</li></ul>
<details class="check"><summary>Is pure water an element, a compound or a mixture? What about sea water?</summary><div>Pure water is a compound (H₂O, fixed ratio, chemically bonded). Sea water is a mixture (water plus dissolved salts in varying amounts).</div></details>`},

    { h: "Inside the atom (2.2)", body: C`
${nucleusAtom(140, 120, 11, 12, [2, 8, 1], "A sodium atom: 11 protons (red) and 12 neutrons (grey) in the nucleus; 11 electrons (blue) in shells 2, 8, 1. (Not to scale: the nucleus is about 100 000 times smaller than the atom.)", 280, 240)}
<table class="t"><tr><th>Particle</th><th>Relative mass</th><th>Relative charge</th><th>Location</th></tr>
<tr><td>Proton</td><td>1</td><td>+1</td><td>Nucleus</td></tr>
<tr><td>Neutron</td><td>1</td><td>0</td><td>Nucleus</td></tr>
<tr><td>Electron</td><td>$\tfrac{1}{1840}$ (negligible)</td><td>−1</td><td>Shells (energy levels) around the nucleus</td></tr></table>
<ul><li>Almost all the <b>mass</b> is in the tiny <b>nucleus</b>. Almost all the <b>volume</b> is empty space where the electrons move.</li>
<li>Atoms are <b>neutral</b> because the number of protons equals the number of electrons, so the charges cancel.</li>
<li>The <b>electrons</b> determine how an atom reacts and bonds. The nucleus doesn't take part in chemical reactions.</li></ul>
<details class="check"><summary>Why does an atom have no overall charge?</summary><div>It has equal numbers of protons (+1 each) and electrons (−1 each), so the charges cancel.</div></details>`},

    { h: "Proton number, mass number and electron shells (2.2)", body: C`
$$^{A}_{Z}\text{X}\qquad A=\text{mass (nucleon) number},\;Z=\text{proton (atomic) number}$$
<ul><li><b>Proton number</b> (atomic number, $Z$): the number of protons in the nucleus. It <b>defines the element</b>: every atom with 6 protons is carbon. Elements are arranged in the Periodic Table in order of proton number.</li>
<li><b>Mass number</b> (nucleon number, $A$): the total number of <b>protons + neutrons</b> in the nucleus.</li>
<li>Neutrons $=A-Z$. Electrons in a neutral atom $=Z$.</li></ul>
<p>$^{23}_{11}\text{Na}$: 11 protons, $23-11=12$ neutrons, 11 electrons. $^{35}_{17}\text{Cl}$: 17 protons, 18 neutrons, 17 electrons.</p>
<h3>Electronic configuration</h3>
<p>Electrons occupy <b>shells</b> (energy levels). For the first 20 elements: the 1st shell holds up to <b>2</b>, the 2nd up to <b>8</b>, the 3rd up to <b>8</b> (then the 4th starts at potassium). Fill from the inside out.</p>
<table class="t"><tr><th></th><th>Group I</th><th>II</th><th>III</th><th>IV</th><th>V</th><th>VI</th><th>VII</th><th>VIII</th></tr>
<tr><th>Period 1</th><td>H 1</td><td></td><td></td><td></td><td></td><td></td><td></td><td>He 2</td></tr>
<tr><th>Period 2</th><td>Li 2,1</td><td>Be 2,2</td><td>B 2,3</td><td>C 2,4</td><td>N 2,5</td><td>O 2,6</td><td>F 2,7</td><td>Ne 2,8</td></tr>
<tr><th>Period 3</th><td>Na 2,8,1</td><td>Mg 2,8,2</td><td>Al 2,8,3</td><td>Si 2,8,4</td><td>P 2,8,5</td><td>S 2,8,6</td><td>Cl 2,8,7</td><td>Ar 2,8,8</td></tr>
<tr><th>Period 4</th><td>K 2,8,8,1</td><td>Ca 2,8,8,2</td><td colspan="6"></td></tr></table>
<div class="callout key"><b class="t">Why the Periodic Table works</b><b>Group number = number of electrons in the outer shell</b> (Group VIII, the noble gases, have full outer shells). <b>Period number = number of occupied shells.</b> Elements in the same group have the same number of outer electrons, so they have similar chemical properties.</div>
<p>The <b>noble gases</b> (He, Ne, Ar…) have full outer shells, which is a very stable arrangement, so they are unreactive. Other atoms react, losing, gaining or sharing electrons, to reach a full outer shell like a noble gas. That single idea explains ionic and covalent bonding. Build atoms and ions in the interactive lab at the end of this lesson.</p>
<details class="check"><summary>Element X has electronic configuration 2,8,6. Which group and period is it in? Name it.</summary><div>Group VI (6 outer electrons), Period 3 (3 shells). It's sulfur (16 electrons, so 16 protons).</div></details>`},

    { h: "Isotopes (2.3)", body: C`
<p class="lead"><b>Isotopes</b> are atoms of the <b>same element</b> with the <b>same number of protons</b> but <b>different numbers of neutrons</b>. So they have the same proton number but different mass numbers.</p>
${F.row(nucleusAtom(100, 100, 6, 6, [2, 4], "$^{12}_{6}\\text{C}$: 6p, 6n", 200, 200), nucleusAtom(100, 100, 6, 7, [2, 4], "$^{13}_{6}\\text{C}$: 6p, 7n", 200, 200), nucleusAtom(100, 100, 6, 8, [2, 4], "$^{14}_{6}\\text{C}$: 6p, 8n (radioactive)", 200, 200))}
<p>Other examples: hydrogen ($^1\text{H}$, deuterium $^2\text{H}$, tritium $^3\text{H}$) and chlorine ($^{35}\text{Cl}$, $^{37}\text{Cl}$).</p>
<h3>Same chemistry (S)</h3>
<p>Isotopes of the same element have the <b>same chemical properties</b> because they have the <b>same number of electrons</b>, and so the <b>same electronic configuration</b>. Chemical reactions depend on the outer electrons, not on the number of neutrons. They differ in <b>physical</b> properties such as mass and density, and some isotopes are radioactive.</p>
<h3>Relative atomic mass from isotopic abundances (S)</h3>
$$A_r=\frac{\sum(\text{mass number}\times\%\text{ abundance})}{100}$$
<div class="callout ex"><b class="t">Worked example</b>Chlorine is 75% $^{35}\text{Cl}$ and 25% $^{37}\text{Cl}$.<br>$A_r=\dfrac{(35\times75)+(37\times25)}{100}=\dfrac{2625+925}{100}=35.5$.</div>
<div class="callout tip"><b class="t">Sense check</b>The answer must lie <b>between</b> the isotope masses and closer to the more abundant one. If chlorine came out as 36.5, something's wrong.</div>
<details class="check"><summary>Copper is 69% ⁶³Cu and 31% ⁶⁵Cu. Calculate its $A_r$ to 1 d.p.</summary><div>$\dfrac{63\times69+65\times31}{100}=\dfrac{4347+2015}{100}=63.6$.</div></details>`},

    { h: "Ions and ionic bonding (2.4)", body: C`
<p class="lead">An <b>ion</b> is a charged particle formed when an atom <b>loses or gains electrons</b>. Atoms do this to get a full outer shell (a noble-gas configuration).</p>
<ul><li><b>Metals</b> (Groups I, II, III) <b>lose</b> their outer electrons and form <b>positive ions</b> (cations): $\text{Na}\rightarrow\text{Na}^++e^-$; $\text{Mg}\rightarrow\text{Mg}^{2+}+2e^-$.</li>
<li><b>Non-metals</b> (Groups V, VI, VII) <b>gain</b> electrons and form <b>negative ions</b> (anions): $\text{Cl}+e^-\rightarrow\text{Cl}^-$; $\text{O}+2e^-\rightarrow\text{O}^{2-}$.</li>
<li>The charge equals the number of electrons lost (+) or gained (−). Ion charge = protons − electrons.</li></ul>
<p>An <b>ionic bond</b> is the <b>strong electrostatic attraction between oppositely charged ions</b>. It forms when a metal reacts with a non-metal: electrons are <b>transferred</b> from the metal to the non-metal.</p>
<div class="viz" data-viz="ionic"></div>
<h3>Dot-and-cross diagrams</h3>
${(() => { let s = F.text(30, 26, "Before", "tk bold", "start");
  s += ion(90, 100, "Na", ["cross"], "", 46) + ion(270, 100, "Cl", ["dot", "dot", "dot", "dot", "dot", "dot", "dot"], "", 46) + F.arrow(140, 70, 215, 70, "r mid", 8) + F.text(178, 60, "1 e⁻", "tr small bold");
  s += F.text(30, 200, "After", "tk bold", "start") + ion(100, 270, "Na", ["cross", "cross", "cross", "cross", "cross", "cross", "cross", "cross"], "+", 46) + ion(290, 270, "Cl", ["dot", "dot", "dot", "dot", "dot", "dot", "dot", "cross"], "−", 46);
  s += F.text(100, 345, "Na⁺ (2,8)", "tk small bold") + F.text(290, 345, "Cl⁻ (2,8,8)", "tk small bold");
  return F.fig(420, 360, s, "Sodium chloride (outer shells only). Na loses its one outer electron (×) to Cl. Both end with a full outer shell. Na⁺ is drawn with its new full outer shell (the 2nd shell).", { size: "small" }); })()}
<p>Rules for drawing them:</p>
<ol class="steps-inline"><li>Use <b>dots</b> for one atom's electrons and <b>crosses</b> for the other's, so you can see which were transferred.</li>
<li>Show the outer shell of each <b>ion</b> (usually now full with 8). The metal ion's outer shell is its previous inner shell. You may draw it empty or full; full is clearer.</li>
<li>Put each ion in <b>square brackets</b> with its <b>charge</b> at the top right.</li>
<li>Show the right <b>number</b> of each ion: CaCl₂ needs one Ca²⁺ and two Cl⁻.</li></ol>
${F.row(
  (() => { let s = ion(80, 90, "Mg", Array(8).fill("cross"), "2+", 44) + ion(240, 90, "O", ["dot", "dot", "dot", "dot", "dot", "dot", "cross", "cross"], "2−", 44); return F.fig(330, 180, s, "Magnesium oxide (S): Mg gives 2 electrons to O, forming Mg²⁺ and O²⁻."); })(),
  (() => { let s = ion(60, 150, "Cl", ["dot", "dot", "dot", "dot", "dot", "dot", "dot", "cross"], "−", 40) + ion(190, 70, "Ca", Array(8).fill("cross"), "2+", 40) + ion(320, 150, "Cl", ["dot", "dot", "dot", "dot", "dot", "dot", "dot", "cross"], "−", 40); return F.fig(400, 220, s, "Calcium chloride (S): Ca gives one electron to each of two Cl atoms, so CaCl₂."); })()
)}
<h3>Giant ionic lattice (S)</h3>
<div class="viz" data-viz="lattice"></div>
${(() => { let s = ""; for (let i = 0; i < 7; i++) for (let j = 0; j < 4; j++) { const x = 40 + i * 56, y = 36 + j * 50, plus = (i + j) % 2 === 0; s += F.circ(x, y, plus ? 13 : 20, plus ? "o oS" : "g gS") + F.text(x, y + 5, plus ? "+" : "−", "tk bold"); } return F.fig(420, 210, s, "A slice through a sodium chloride lattice: a regular arrangement of alternating Na⁺ (small) and Cl⁻ (large) ions, extending in all three directions.", { size: "small" }); })()}
<p>Ionic compounds don't form small molecules. They form a <b>giant ionic lattice</b>: a <b>regular, repeating arrangement of alternating positive and negative ions</b> in three dimensions. Each ion is surrounded by oppositely charged ions (6 of them, in NaCl) and attracted to all of them in every direction.</p>
<details class="check"><summary>Draw (describe) a dot-and-cross diagram for lithium fluoride.</summary><div>[Li]⁺ with an outer shell of 2 (or drawn empty), and [F]⁻ with 8 outer electrons: 7 dots and 1 cross transferred from Li. Both in brackets with charges.</div></details>`},

    { h: "Properties of ionic compounds (2.4)", body: C`
<table class="t"><tr><th>Property</th><th>Explanation (S)</th></tr>
<tr><td><b>High melting and boiling points</b> (NaCl melts at 801 °C)</td><td>The giant lattice has <b>many strong electrostatic attractions</b> between oppositely charged ions in all directions. A lot of energy is needed to overcome them.</td></tr>
<tr><td><b>Conduct electricity when molten or in aqueous solution</b></td><td>The <b>ions are free to move</b> and carry charge through the liquid.</td></tr>
<tr><td><b>Do not conduct when solid</b></td><td>The ions are held in <b>fixed positions</b> in the lattice and cannot move. (They can only vibrate.)</td></tr>
<tr><td>Often soluble in water</td><td>Water molecules attract the ions and pull them out of the lattice.</td></tr>
<tr><td>Hard but brittle</td><td>A blow shifts a layer so like charges line up and repel, and the crystal shatters.</td></tr></table>
${F.row(
  (() => { let s = ""; for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) { const x = 40 + i * 46, y = 40 + j * 46, plus = (i + j) % 2 === 0; s += F.circ(x, y, 14, plus ? "o oS" : "g gS") + F.text(x, y + 5, plus ? "+" : "−", "tk bold"); } return F.fig(270, 170, s, "<b>Solid</b>: ions locked in place, so no conduction."); })(),
  (() => { let s = ""; const P = [[40, 40, 1], [110, 60, 0], [180, 35, 1], [60, 110, 0], [140, 120, 1], [210, 100, 0], [30, 160, 1], [190, 160, 0]]; P.forEach(([x, y, plus]) => { s += F.circ(x, y, 14, plus ? "o oS" : "g gS") + F.text(x, y + 5, plus ? "+" : "−", "tk bold") + F.arrow(x + (plus ? -14 : 14), y, x + (plus ? -34 : 34), y, (plus ? "o" : "g") + " mid", 7); }); return F.fig(270, 190, s, "<b>Molten or dissolved</b>: ions free to move (+ towards −, − towards +), so it conducts."); })()
)}
<p><b>Higher charges, stronger bonds:</b> MgO (Mg²⁺, O²⁻) melts at about 2850 °C, far higher than NaCl (Na⁺, Cl⁻), because doubly charged ions attract each other much more strongly.</p>
<div class="callout warn"><b class="t">The classic error</b>"Ionic compounds conduct when molten because the electrons can move." Wrong: it's the <b>ions</b> that move. Ionic compounds have no free electrons.</div>
<details class="check"><summary>Explain why solid potassium bromide doesn't conduct, but its solution does.</summary><div>In the solid the K⁺ and Br⁻ ions are fixed in the lattice. Dissolved, the ions are free to move and carry the current.</div></details>`},

    { h: "Covalent bonding and dot-and-cross diagrams (2.5)", body: C`
<p class="lead">When <b>non-metal</b> atoms bond, none of them wants to lose electrons, so they <b>share</b> them instead. A <b>covalent bond</b> is a <b>pair of electrons shared between two atoms</b>, leading to noble-gas electronic configurations.</p>
<p>The bond is strong because <b>both nuclei are attracted to the shared pair</b> of electrons between them.</p>
<div class="viz" data-viz="covalent"></div>
<p>How many bonds does each atom form? It shares enough electrons to fill its outer shell: <b>8 − group number</b> (and hydrogen, which needs 2, forms 1 bond).</p>
<table class="t"><tr><th>Atom</th><th>H</th><th>C (IV)</th><th>N (V)</th><th>O (VI)</th><th>Cl (VII)</th></tr><tr><td>Bonds formed</td><td>1</td><td>4</td><td>3</td><td>2</td><td>1</td></tr></table>
<h3>The six Core molecules</h3>
<div class="fig-row">${cov(230, 160, [{ x: 88, y: 80, r: 30, s: "H", m: "dot" }, { x: 142, y: 80, r: 30, s: "H", m: "cross" }], [[0, 1, 1]], [], "H₂: one shared pair")}
${cov(260, 170, [{ x: 86, y: 85, r: 44, s: "Cl", m: "dot" }, { x: 168, y: 85, r: 44, s: "Cl", m: "cross" }], [[0, 1, 1]], [[0, 90], [0, 180], [0, 270], [1, 90], [1, 0], [1, 270]], "Cl₂: one shared pair; 3 lone pairs each")}
${cov(240, 170, [{ x: 74, y: 85, r: 30, s: "H", m: "cross" }, { x: 146, y: 85, r: 44, s: "Cl", m: "dot" }], [[0, 1, 1]], [[1, 90], [1, 0], [1, 270]], "HCl: one shared pair")}
${cov(260, 190, [{ x: 130, y: 80, r: 44, s: "O", m: "dot" }, { x: 72, y: 124, r: 30, s: "H", m: "cross" }, { x: 188, y: 124, r: 30, s: "H", m: "cross" }], [[0, 1, 1], [0, 2, 1]], [[0, 55], [0, 125]], "H₂O: two bonds; 2 lone pairs on O")}
${cov(260, 210, [{ x: 130, y: 82, r: 44, s: "N", m: "dot" }, { x: 72, y: 120, r: 30, s: "H", m: "cross" }, { x: 188, y: 120, r: 30, s: "H", m: "cross" }, { x: 130, y: 152, r: 30, s: "H", m: "cross" }], [[0, 1, 1], [0, 2, 1], [0, 3, 1]], [[0, 90]], "NH₃: three bonds; 1 lone pair on N")}
${cov(260, 230, [{ x: 130, y: 115, r: 44, s: "C", m: "dot" }, { x: 130, y: 50, r: 30, s: "H", m: "cross" }, { x: 130, y: 180, r: 30, s: "H", m: "cross" }, { x: 65, y: 115, r: 30, s: "H", m: "cross" }, { x: 195, y: 115, r: 30, s: "H", m: "cross" }], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], [], "CH₄: four bonds; no lone pairs")}</div>
<h3>Supplement molecules: double and triple bonds</h3>
<div class="fig-row">${cov(260, 170, [{ x: 92, y: 85, r: 44, s: "O", m: "dot" }, { x: 168, y: 85, r: 44, s: "O", m: "cross" }], [[0, 1, 2]], [[0, 130], [0, 230], [1, 50], [1, 310]], "O₂: a double bond (2 shared pairs)")}
${cov(300, 170, [{ x: 70, y: 85, r: 44, s: "O", m: "cross" }, { x: 150, y: 85, r: 44, s: "C", m: "dot" }, { x: 230, y: 85, r: 44, s: "O", m: "cross" }], [[1, 0, 2], [1, 2, 2]], [[0, 130], [0, 230], [2, 50], [2, 310]], "CO₂: two C=O double bonds")}
${cov(260, 170, [{ x: 92, y: 85, r: 44, s: "N", m: "dot" }, { x: 168, y: 85, r: 44, s: "N", m: "cross" }], [[0, 1, 3]], [[0, 180], [1, 0]], "N₂: a triple bond (3 shared pairs)")}
${cov(320, 220, [{ x: 112, y: 110, r: 44, s: "C", m: "dot" }, { x: 196, y: 110, r: 44, s: "C", m: "cross" }, { x: 66, y: 66, r: 28, s: "H", m: "ring" }, { x: 66, y: 154, r: 28, s: "H", m: "ring" }, { x: 242, y: 66, r: 28, s: "H", m: "ring" }, { x: 242, y: 154, r: 28, s: "H", m: "ring" }], [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]], [], "C₂H₄ (ethene): one C=C double bond")}
${cov(330, 230, [{ x: 120, y: 115, r: 44, s: "C", m: "dot" }, { x: 204, y: 115, r: 44, s: "O", m: "cross" }, { x: 120, y: 50, r: 28, s: "H", m: "ring" }, { x: 120, y: 180, r: 28, s: "H", m: "ring" }, { x: 56, y: 115, r: 28, s: "H", m: "ring" }, { x: 262, y: 150, r: 28, s: "H", m: "ring" }], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 1]], [[1, 70], [1, 130]], "CH₃OH (methanol): O has 2 lone pairs")}</div>
<div class="callout tip"><b class="t">Check every diagram</b>Count the electrons in each atom's outer circle, including shared pairs in the overlap. Every H must have <b>2</b>; every other atom must have <b>8</b>. Bonding pairs go in the overlap; lone (non-bonding) pairs go elsewhere on the atom's circle. Show only outer shells unless asked.</div>
<details class="check"><summary>How many lone pairs does the nitrogen atom have in ammonia, and how many electrons are around it in total?</summary><div>One lone pair. Around N: 3 shared pairs (6) + 1 lone pair (2) = 8.</div></details>`},

    { h: "Simple molecular substances (2.5)", body: C`
<p class="lead">Water, carbon dioxide, methane, oxygen and chlorine are made of <b>small, separate molecules</b>. Two very different forces are involved, and confusing them is the most common bonding error.</p>
${(() => { let s = ""; const M = [[70, 70], [190, 60], [120, 150], [250, 140], [60, 200]];
  M.forEach(([x, y]) => s += F.line(x - 18, y, x + 18, y, "k thick") + F.circ(x - 18, y, 12, "bgF nostroke") + F.circ(x + 18, y, 12, "bgF nostroke") + F.circ(x - 18, y, 12, "g gS") + F.circ(x + 18, y, 12, "g gS"));
  [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [0, 4]].forEach(([a, b]) => s += F.line(M[a][0], M[a][1], M[b][0], M[b][1], "r d thin"));
  s += F.text(300, 60, "strong covalent bond", "tk small bold", "start") + F.text(300, 76, "inside each molecule", "tk small", "start") + F.line(298, 64, 210, 60, "k thin");
  s += F.text(300, 190, "weak intermolecular forces", "tr small bold", "start") + F.text(300, 206, "between molecules", "tr small", "start") + F.line(298, 194, 185, 175, "r thin");
  return F.fig(480, 240, s, "Melting or boiling a simple molecular substance only overcomes the weak forces <b>between</b> molecules. The strong covalent bonds stay intact.", { size: "small" }); })()}
<div class="callout key"><b class="t">The distinction that gets A*</b>When water boils, the steam is still H₂O molecules: the <b>O–H covalent bonds are not broken</b>. Only the <b>weak intermolecular forces</b> between molecules are overcome. That needs little energy, so melting and boiling points are <b>low</b>.</div>
<h3>Properties</h3>
<ul><li><b>Low melting and boiling points</b>: often gases or liquids at room temperature (O₂, CO₂, H₂O, CH₄), or low-melting solids (I₂, sulfur).</li>
<li><b>Poor electrical conductivity</b>: there are <b>no ions and no free (delocalised) electrons</b> to carry charge, whether solid, liquid or dissolved.</li>
<li>(S) <b>Larger molecules</b> have <b>stronger intermolecular forces</b> (more electrons, more contact), so they have <b>higher</b> melting and boiling points. That's why boiling points increase along the alkane series, and why I₂ is a solid but Cl₂ is a gas.</li></ul>
<details class="check"><summary>Explain why methane (CH₄) is a gas at room temperature.</summary><div>It is simple molecular. Only weak intermolecular forces hold the molecules together, and very little energy is needed to overcome them, so its boiling point (−162 °C) is far below room temperature.</div></details>`},

    { h: "Giant covalent structures (2.6)", body: C`
<p class="lead">In a giant covalent structure, <b>every atom</b> is joined to its neighbours by <b>strong covalent bonds</b> in a continuous network. There are no separate molecules. Melting one means breaking <b>many strong covalent bonds</b>, so melting points are <b>very high</b>.</p>
${F.row(
  (() => { const P = [[130, 40], [70, 90], [190, 90], [130, 140], [70, 190], [190, 190], [130, 240], [250, 140], [10, 140]]; let s = "";
    [[0, 1], [0, 2], [1, 3], [2, 3], [1, 8], [3, 4], [3, 5], [4, 6], [5, 6], [2, 7], [5, 7], [4, 8]].forEach(([a, b]) => s += F.line(P[a][0] + 20, P[a][1], P[b][0] + 20, P[b][1], "k thick")); P.forEach(([x, y]) => s += F.circ(x + 20, y, 11, "bgF nostroke") + F.circ(x + 20, y, 11, "k mS"));
    return F.fig(300, 270, s, "<b>Diamond</b>: each carbon is bonded to <b>4</b> others in a rigid 3D tetrahedral network (2D sketch)."); })(),
  (() => { let s = ""; const hex = (cx, cy, r) => { const p = []; for (let k = 0; k < 6; k++) p.push([cx + r * Math.cos(k * Math.PI / 3), cy + r * Math.sin(k * Math.PI / 3)]); return p; };
    [40, 120, 200].forEach((y, L) => { for (let i = 0; i < 4; i++) { const pts = hex(40 + i * 62 + (L % 2) * 31, y, 22); s += F.poly(pts, "k thick", true); pts.forEach(([x, yy]) => s += F.circ(x, yy, 4, "kF")); } if (L < 2) { for (let i = 0; i < 10; i++) s += F.dot(30 + i * 26, y + 40, "b", 3); s += F.text(290, y + 44, "", "tb small", "start"); } });
    s += F.text(150, 262, "blue dots: delocalised electrons", "tb small bold");
    return F.fig(300, 275, s, "<b>Graphite</b>: each carbon bonded to <b>3</b> others in flat hexagonal layers, with one delocalised electron per atom."); })()
)}
<table class="t"><tr><th></th><th>Diamond</th><th>Graphite</th></tr>
<tr><td>Bonding</td><td>Each C forms <b>4</b> covalent bonds: a rigid 3D tetrahedral network</td><td>Each C forms <b>3</b> covalent bonds, in flat layers of hexagons</td></tr>
<tr><td>Free electrons</td><td>None: all four outer electrons are used in bonds</td><td><b>One delocalised electron per carbon</b>, free to move along the layers</td></tr>
<tr><td>Electrical conductivity</td><td><b>Does not conduct</b></td><td><b>Conducts</b> (along the layers)</td></tr>
<tr><td>Hardness</td><td><b>Extremely hard</b>: every atom is locked in place in 3D</td><td><b>Soft and slippery</b>: only weak forces between layers, so the layers slide over each other</td></tr>
<tr><td>Melting point</td><td>Very high (~3550 °C)</td><td>Very high (~3650 °C): strong bonds within layers</td></tr>
<tr><td>Uses</td><td><b>Cutting tools</b>, drill bits, saw blades (and jewellery)</td><td><b>Lubricant</b>, <b>electrodes</b> (and pencil "lead")</td></tr></table>
<div class="callout warn"><b class="t">Lost marks</b>"Graphite is slippery because the covalent bonds between the layers are weak." There are <b>no</b> covalent bonds between the layers. Only weak forces act there. The covalent bonds <i>within</i> layers are very strong, which is why graphite's melting point is so high.</div>
<h3>Silicon(IV) oxide, SiO₂ (S)</h3>
${(() => { let s = ""; const Si = [[80, 80], [200, 80], [80, 190], [200, 190], [320, 80], [320, 190]];
  const O = [[140, 80], [80, 135], [200, 135], [140, 190], [260, 80], [260, 190], [320, 135], [80, 30], [200, 30], [320, 30], [30, 80], [30, 190], [80, 240], [200, 240], [320, 240]];
  Si.forEach(([x, y]) => O.forEach(([a, b]) => { if (Math.hypot(a - x, b - y) < 62) s += F.line(x, y, a, b, "k mid"); }));
  O.forEach(([x, y]) => s += F.circ(x, y, 10, "bgF nostroke") + F.circ(x, y, 10, "r rS")); Si.forEach(([x, y]) => s += F.circ(x, y, 15, "bgF nostroke") + F.circ(x, y, 15, "k mS") + F.text(x, y + 5, "Si", "tk small bold"));
  return F.fig(360, 270, s, "SiO₂ (2D sketch): each Si is bonded to 4 O atoms and each O to 2 Si atoms, in a giant 3D network.", { size: "small" }); })()}
<p>Silicon(IV) oxide (silica, the main compound in sand and quartz) has a giant covalent structure similar to diamond: each <b>Si is bonded to 4 O</b> atoms, and each <b>O to 2 Si</b> atoms, giving the formula ratio SiO₂. So it has similar properties to diamond: <b>hard, very high melting point (~1700 °C), does not conduct electricity</b> (no free electrons or ions), and insoluble in water.</p>
<details class="check"><summary>Why does graphite conduct electricity but diamond doesn't?</summary><div>In graphite each carbon uses only 3 outer electrons for bonding; the 4th is delocalised and can move along the layers, carrying charge. In diamond all 4 are used in bonds, so there are no free electrons.</div></details>`},

    { h: "Metallic bonding (2.7 S)", body: C`
${(() => { let s = ""; for (let i = 0; i < 7; i++) for (let j = 0; j < 4; j++) { const x = 40 + i * 58, y = 40 + j * 54; s += F.circ(x, y, 17, "o oS") + F.text(x, y + 5, "+", "tk bold"); }
  const rnd = (k) => (Math.sin(k * 12.9898) * 43758.5453) % 1; for (let k = 0; k < 60; k++) { const x = 20 + Math.abs(rnd(k)) * 390, y = 18 + Math.abs(rnd(k + 99)) * 190; s += F.dot(x, y, "b", 3.2); }
  return F.fig(430, 220, s, "Metallic bonding: a lattice of positive metal ions in a 'sea' of delocalised electrons (blue), free to move throughout.", { size: "small" }); })()}
<p class="lead">In a metal, each atom releases its outer electrons into a shared pool. The result is a <b>giant lattice of positive metal ions</b> surrounded by a <b>"sea" of delocalised electrons</b>. <b>Metallic bonding</b> is the <b>strong electrostatic attraction between the positive ions and the delocalised electrons</b>.</p>
<table class="t"><tr><th>Property</th><th>Explanation</th></tr>
<tr><td><b>Good electrical conductivity</b> (solid and molten)</td><td>The <b>delocalised electrons are free to move</b> through the structure and carry charge.</td></tr>
<tr><td>Good thermal conductivity</td><td>The mobile electrons transfer kinetic energy quickly through the metal.</td></tr>
<tr><td><b>Malleable</b> (hammered into shape) and <b>ductile</b> (drawn into wires)</td><td>The <b>layers of positive ions can slide over each other</b> without the bonding breaking, because the electron sea moves with them and keeps holding them together.</td></tr>
<tr><td><b>High melting and boiling points</b> (most metals)</td><td>Strong attraction between the positive ions and the delocalised electrons throughout the giant lattice needs a lot of energy to overcome.</td></tr></table>
${F.row(
  (() => { let s = ""; for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) s += F.circ(40 + i * 40, 40 + j * 40, 17, "o oS"); return F.fig(240, 150, s, "Regular layers of ions…"); })(),
  (() => { let s = ""; for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) s += F.circ(40 + i * 40 + (j === 0 ? 30 : 0), 40 + j * 40, 17, "o oS"); s += F.arrow(60, 14, 130, 14, "r mid", 8); return F.fig(250, 150, s, "…slide over each other when a force is applied. The metal bends instead of shattering."); })()
)}
<div class="callout tip"><b class="t">Comparing the four structures</b>
<table class="t"><tr><th>Structure</th><th>Example</th><th>Melting point</th><th>Conducts?</th></tr>
<tr><td>Giant ionic</td><td>NaCl, MgO</td><td>High</td><td>Only when molten or aqueous (mobile ions)</td></tr>
<tr><td>Simple molecular</td><td>H₂O, CO₂, CH₄</td><td>Low</td><td>No (no ions or free electrons)</td></tr>
<tr><td>Giant covalent</td><td>Diamond, SiO₂, graphite</td><td>Very high</td><td>No, except graphite</td></tr>
<tr><td>Metallic</td><td>Cu, Fe, Al</td><td>High (mostly)</td><td>Yes, solid and molten (delocalised electrons)</td></tr></table></div>
<details class="check"><summary>Explain why copper is used for electrical wires, using its structure.</summary><div>Copper has metallic bonding with delocalised electrons that move freely and carry charge (good conductor), and its layers of ions can slide so it can be drawn into wires (ductile).</div></details>`}
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
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: C`State the number of protons and neutrons in an atom of ²³Na (atomic number 11).`, ms: C`<b>B1</b> 11 protons<br><b>B1</b> 12 neutrons` },
    { d: 1, type: "struct", marks: 1, q: C`Write the electronic configuration of chlorine (atomic number 17).`, ms: C`<b>B1</b> 2,8,7` },
    { d: 1, type: "mcq", marks: 1, q: C`Which type of bonding is found in sodium chloride?`, opts: ["covalent", "ionic", "metallic", "hydrogen"], ans: 1, why: C`Metal + non-metal.` },
    { d: 1, type: "struct", marks: 2, q: C`Define isotopes.`, ms: C`<b>B1</b> atoms of the same element / same proton number<br><b>B1</b> different numbers of neutrons (different mass numbers)` },
    { d: 1, type: "mcq", marks: 1, q: C`How many covalent bonds are in a molecule of methane, CH₄?`, opts: ["1", "2", "4", "8"], ans: 2, why: C`Four C–H.` },
    { d: 1, type: "struct", marks: 2, q: C`State the charge on the ion formed by (a) magnesium, (b) oxygen.`, ms: C`<b>B1</b> 2+<br><b>B1</b> 2−` },
    { d: 2, type: "struct", marks: 3, q: C`Draw a dot-and-cross diagram for magnesium oxide, showing outer electrons only.`, ms: C`<b>B1</b> Mg²⁺ with empty / full outer shell shown in brackets<br><b>B1</b> O²⁻ with 8 outer electrons (6 dots + 2 crosses)<br><b>B1</b> correct charges` },
    { d: 2, type: "struct", marks: 3, q: C`Explain why sodium chloride has a high melting point.`, ms: C`<b>B1</b> giant ionic lattice<br><b>B1</b> strong electrostatic attraction between oppositely charged ions<br><b>B1</b> lots of energy needed to overcome these forces` },
    { d: 2, type: "struct", marks: 3, q: C`Explain why ionic compounds conduct electricity when molten but not when solid.`, ms: C`<b>B1</b> solid: ions held in fixed positions in the lattice<br><b>B1</b> molten: ions free to move<br><b>B1</b> moving ions carry charge` },
    { d: 2, type: "struct", marks: 2, q: C`Draw a dot-and-cross diagram for a molecule of water.`, ms: C`<b>B1</b> two shared pairs O–H<br><b>B1</b> two lone pairs on oxygen` },
    { d: 2, type: "struct", marks: 3, q: C`S: Calculate the relative atomic mass of chlorine, which is 75% ³⁵Cl and 25% ³⁷Cl.`, ms: C`<b>M1</b> (75 × 35 + 25 × 37)<br><b>M1</b> ÷ 100<br><b>A1</b> 35.5` },
    { d: 2, type: "mcq", marks: 1, q: C`Why does graphite conduct electricity?`, opts: ["it has free ions", "each carbon has one delocalised electron", "it is a metal", "it has weak intermolecular forces"], ans: 1, why: C`Delocalised electrons move between layers.` },
    { d: 3, type: "struct", marks: 4, q: C`S: Explain, in terms of structure and bonding, why diamond is hard but graphite is soft and slippery.`, ms: C`<b>B1</b> both giant covalent structures<br><b>B1</b> diamond: each C bonded to 4 others in a rigid tetrahedral lattice<br><b>B1</b> graphite: each C bonded to 3 in layers<br><b>B1</b> weak forces between layers allow them to slide` },
    { d: 3, type: "struct", marks: 4, q: C`S: Silicon(IV) oxide melts at 1710 °C; carbon dioxide is a gas at room temperature. Explain the difference.`, ms: C`<b>B1</b> SiO₂: giant covalent structure<br><b>B1</b> many strong covalent bonds must be broken to melt<br><b>B1</b> CO₂: simple molecules<br><b>B1</b> weak intermolecular forces need little energy to overcome` },
    { d: 3, type: "struct", marks: 4, q: C`S: Describe metallic bonding and use it to explain why metals are malleable and good conductors of electricity.`, ms: C`<b>B1</b> lattice of positive ions in a sea of delocalised electrons<br><b>B1</b> strong attraction between ions and electrons<br><b>B1</b> layers of ions can slide without breaking the bonding (malleable)<br><b>B1</b> delocalised electrons move and carry charge (conduct)` },
    { d: 3, type: "struct", marks: 3, q: C`S: Draw a dot-and-cross diagram for nitrogen, N₂, and explain why nitrogen is unreactive.`, ms: C`<b>B1</b> three shared pairs between the N atoms<br><b>B1</b> one lone pair on each N<br><b>B1</b> the triple bond is very strong and needs a lot of energy to break` }
  ]
});
}
