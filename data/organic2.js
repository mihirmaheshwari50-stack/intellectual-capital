window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
const disp = (x0, y0, rows, o = {}) => { const cw = o.cw || 13, rh = o.rh || 20; let s = "";
  rows.forEach((r, ri) => { const y = y0 + ri * rh; for (let i = 0; i < r.length; i++) { const ch = r[i], x = x0 + i * cw + cw / 2;
    if (r.substr(i, 3) === "CH₃") { s += F.text(x + cw, y + 5, "CH₃", "tk"); i += 2; }
    else if (/[A-Z]/.test(ch)) { let tok = ch; if (/[a-z]/.test(r[i + 1] || "")) tok += r[i + 1]; const cls = tok === "C" ? "tc bold" : tok === "O" ? "tr bold" : tok === "N" ? "tb bold" : /Cl|Br|F/.test(tok) ? "to bold" : "tk"; s += F.text(x, y + 5, tok, cls); if (tok.length > 1) i++; }
    else if (ch === "-") s += F.line(x - cw / 2 + 1, y, x + cw / 2 - 1, y, "k mid");
    else if (ch === "=") s += F.line(x - cw / 2 + 1, y - 2.5, x + cw / 2 - 1, y - 2.5, "k mid") + F.line(x - cw / 2 + 1, y + 2.5, x + cw / 2 - 1, y + 2.5, "k mid");
    else if (ch === "|") s += F.line(x, y - rh / 2 + 4, x, y + rh / 2 - 4, "k mid");
    else if (ch === "‖") s += F.line(x - 2.5, y - rh / 2 + 4, x - 2.5, y + rh / 2 - 4, "k mid") + F.line(x + 2.5, y - rh / 2 + 4, x + 2.5, y + rh / 2 - 4, "k mid");
    else if (ch === "[" || ch === "]") s += F.path(ch === "[" ? `M${x + 4},${y - 2 * rh + 6} H${x} V${y + 2 * rh - 6} H${x + 4}` : `M${x - 4},${y - 2 * rh + 6} H${x} V${y + 2 * rh - 6} H${x - 4}`, "r mid") + (ch === "]" ? F.text(x + 8, y + 2 * rh - 2, "n", "tr small bold", "start") : ""); } });
  return s; };
const mol = (rows, cap, lab) => { const w = Math.max(...rows.map(r => r.length)) * 13 + 30, h = rows.length * 20 + (lab ? 34 : 14); return F.fig(w, h, disp(15, 12, rows) + (lab ? F.text(w / 2, h - 8, lab, "tk small bold") : ""), cap, { size: "tiny" }); };

/* ============================================================
   ORGANIC CHEMISTRY 2: ALCOHOLS, ACIDS, ESTERS, POLYMERS  (0620: 11.5 – 11.7)
   ============================================================ */
TOPICS.push({
  id: "organic2", subject: "chemistry", unit: 11, title: "Organic 2: alcohols, acids & polymers",
  blurb: "Making ethanol by fermentation and from ethene, uses and combustion of alcohols, carboxylic acids and their reactions, esters, addition and condensation polymers, plastics and proteins.",
  level: "Core → Supplement", demo: "polymer",
  syllabus: [
    ["11.5", "Describe the manufacture of ethanol by fermentation and by the catalytic addition of steam to ethene", 0],
    ["11.5 S", "Describe the advantages and disadvantages of each method", 1],
    ["11.5", "Describe the combustion of ethanol; state the uses of ethanol as a solvent and as a fuel", 2],
    ["11.6", "Describe the reactions of ethanoic acid with metals, bases and carbonates", 3],
    ["11.6 S", "Describe the formation of ethanoic acid by oxidation of ethanol (acidified KMnO₄, bacterial oxidation)", 4],
    ["11.6 S", "Describe the reaction of a carboxylic acid with an alcohol using an acid catalyst to form an ester; name and draw esters", 5],
    ["11.7", "Define polymers as large molecules built up from many smaller molecules called monomers", 6],
    ["11.7", "Describe how different polymers have different units and/or linkages; plastics are made from polymers", 6],
    ["11.7", "Describe the pollution problems caused by the disposal of non-biodegradable plastics", 9],
    ["11.7 S", "Explain addition polymerisation; deduce the structure of a polymer from its monomer and vice versa", 7],
    ["11.7 S", "Explain condensation polymerisation; describe nylon (polyamide) and PET (polyester)", 8],
    ["11.7 S", "State that PET can be converted back into monomers and re-polymerised", 8],
    ["11.7 S", "Describe proteins as natural polyamides formed from amino acid monomers", 10]
  ],
  sections: [
    { h: "Making ethanol 1: fermentation (11.5)", body: C`
<p class="lead"><b>Fermentation</b> uses <b>yeast</b> to convert sugar (glucose) into ethanol and carbon dioxide.</p>
<div class="viz" data-viz="fermentation"></div>
<p class="eq">$$\text{C}_6\text{H}_{12}\text{O}_6\text{(aq)} \rightarrow 2\text{C}_2\text{H}_5\text{OH(aq)} + 2\text{CO}_2\text{(g)}$$</p>
<ul><li><b>Temperature 25–35 °C</b>: enzymes in yeast work best. Too cold: slow. Too hot (above ≈ 40 °C): enzymes are denatured.</li>
<li><b>Absence of oxygen</b> (anaerobic): with air, the ethanol is oxidised to ethanoic acid (vinegar) and yeast respires aerobically instead.</li>
<li>Fermentation stops at about <b>15% ethanol</b>, when the yeast is killed by the ethanol. The ethanol is then separated by <b>fractional distillation</b>.</li>
<li>The CO₂ given off turns <b>limewater milky</b>.</li></ul>`},

    { h: "Making ethanol 2: from ethene, and comparing methods (11.5)", body: C`
<p><b>Catalytic addition of steam to ethene</b> (hydration):</p>
<p class="eq">$$\text{C}_2\text{H}_4\text{(g)} + \text{H}_2\text{O(g)} \rightleftharpoons \text{C}_2\text{H}_5\text{OH(g)}$$</p>
<p>Conditions: <b>300 °C</b>, <b>6000 kPa</b>, <b>phosphoric acid catalyst</b>. Ethene comes from <b>cracking</b> crude oil fractions.</p>
<table class="t"><tr><th></th><th>Fermentation</th><th>Hydration of ethene</th></tr>
<tr><td>Raw material</td><td>Sugar from crops: <b>renewable</b></td><td>Ethene from crude oil: <b>non-renewable</b></td></tr>
<tr><td>Rate</td><td><b>Slow</b> (days)</td><td><b>Fast</b>, continuous process</td></tr>
<tr><td>Purity</td><td>Impure (≈15%): needs distilling</td><td><b>Pure</b> ethanol</td></tr>
<tr><td>Process type</td><td>Batch</td><td>Continuous</td></tr>
<tr><td>Energy / conditions</td><td><b>Low</b> temperature, normal pressure</td><td>High temperature and pressure: <b>energy-intensive</b>, expensive equipment</td></tr>
<tr><td>Other</td><td>Needs farmland; CO₂ released (but crops absorbed it)</td><td>Atom economy 100% (only one product)</td></tr></table>
<div class="callout"><b>Exam technique:</b> "Give one advantage of fermentation" — <i>it uses a renewable resource</i> or <i>low energy</i>. "One advantage of hydration" — <i>fast</i> or <i>pure product</i> or <i>continuous</i>.</div>`},

    { h: "Uses and combustion of ethanol (11.5)", body: C`
<p>Ethanol is used:</p>
<ul><li>as a <b>solvent</b> (in perfumes, varnishes, medicines, inks): it dissolves many substances that water cannot, and evaporates quickly;</li>
<li>as a <b>fuel</b> (mixed with petrol, e.g. in Brazil; in spirit burners): it burns cleanly and can be made from renewable sugar cane.</li></ul>
<p><b>Complete combustion</b> of ethanol:</p>
<p class="eq">$$\text{C}_2\text{H}_5\text{OH} + 3\text{O}_2 \rightarrow 2\text{CO}_2 + 3\text{H}_2\text{O}$$</p>
${F.row(mol(["  H H", "  | |", "H-C-C-O-H", "  | |", "  H H"], "Ethanol, C₂H₅OH.", "ethanol"), mol(["  H H H", "  | | |", "H-C-C-C-O-H", "  | | |", "  H H H"], "Propan-1-ol, C₃H₇OH.", "propan-1-ol"))}
<details class="check"><summary>Balance the combustion of propanol: C₃H₇OH + ? O₂ → ? CO₂ + ? H₂O</summary><div>C₃H₇OH + 4½O₂ → 3CO₂ + 4H₂O, or ×2: 2C₃H₇OH + 9O₂ → 6CO₂ + 8H₂O.</div></details>`},

    { h: "Carboxylic acids: reactions of ethanoic acid (11.6)", body: C`
<p>Carboxylic acids contain the <b>–COOH</b> functional group. Ethanoic acid, CH₃COOH, is the acid in vinegar. It is a <b>weak acid</b> (partially ionised): it shows the typical acid reactions, but more slowly than hydrochloric acid of the same concentration. Its salts are <b>ethanoates</b>.</p>
${F.row(mol(["  H   O", "  |   ‖", "H-C---C-O-H", "  |", "  H"], "Ethanoic acid, CH₃COOH.", "ethanoic acid"), mol(["    O", "    ‖", "H---C-O-H"], "Methanoic acid, HCOOH.", "methanoic acid"))}
<table class="t"><tr><th>Reacts with</th><th>Products</th><th>Example</th></tr>
<tr><td>Reactive metal</td><td>Salt + hydrogen</td><td>$2\text{CH}_3\text{COOH} + \text{Mg} \rightarrow (\text{CH}_3\text{COO})_2\text{Mg} + \text{H}_2$<br>magnesium ethanoate (slow fizzing)</td></tr>
<tr><td>Base / alkali</td><td>Salt + water</td><td>$\text{CH}_3\text{COOH} + \text{NaOH} \rightarrow \text{CH}_3\text{COONa} + \text{H}_2\text{O}$<br>sodium ethanoate</td></tr>
<tr><td>Carbonate</td><td>Salt + water + carbon dioxide</td><td>$2\text{CH}_3\text{COOH} + \text{Na}_2\text{CO}_3 \rightarrow 2\text{CH}_3\text{COONa} + \text{H}_2\text{O} + \text{CO}_2$<br>(fizzing; limewater milky)</td></tr></table>
<div class="callout"><b>Formula trap:</b> sodium ethanoate is CH₃COONa (the Na replaces the H of –COOH). Calcium ethanoate is (CH₃COO)₂Ca because Ca²⁺ needs two ethanoate ions.</div>`},

    { h: "Making ethanoic acid by oxidation (11.6 S)", body: C`
<p>Ethanol can be <b>oxidised</b> to ethanoic acid in two ways:</p>
<ol class="steps"><li><b>Acidified potassium manganate(VII)</b>: heat ethanol with KMnO₄ and dilute sulfuric acid. The purple colour fades (manganate(VII) is reduced) as ethanol is oxidised.</li>
<li><b>Bacterial oxidation</b>: when wine is left open to air, bacteria (<i>Acetobacter</i>) use oxygen to oxidise ethanol to ethanoic acid: this is how <b>vinegar</b> is made (and why wine goes sour).</li></ol>
<p class="eq">$$\text{C}_2\text{H}_5\text{OH} + 2[\text{O}] \rightarrow \text{CH}_3\text{COOH} + \text{H}_2\text{O}$$</p>
<p>([O] represents oxygen from the oxidising agent.) The carbon chain stays the same length: propanol is oxidised to propanoic acid.</p>`},

    { h: "Esters (11.6 S)", body: C`
<p class="lead">A carboxylic acid reacts with an alcohol, when warmed with a few drops of <b>concentrated sulfuric acid</b> as a <b>catalyst</b>, to form an <b>ester</b> and water. This is a reversible reaction (esterification, a condensation reaction).</p>
<p class="eq">$$\text{CH}_3\text{COOH} + \text{C}_2\text{H}_5\text{OH} \rightleftharpoons \text{CH}_3\text{COOC}_2\text{H}_5 + \text{H}_2\text{O}$$</p>
${F.fig(620, 135, disp(0, 20, ["  H   O", "  |   ‖", "H-C---C-O-H", "  |", "  H"]) + F.text(165, 64, "+", "tk big") + disp(178, 20, ["    H H", "    | |", "H-O-C-C-H", "    | |", "    H H"]) + F.arrow(305, 58, 345, 58, "k", 8) + disp(352, 20, ["  H   O   H H", "  |   ‖   | |", "H-C---C-O-C-C-H", "  |       | |", "  H       H H"]) + F.text(575, 64, "+ H₂O", "tk bold") + F.text(70, 128, "ethanoic acid", "tm small") + F.text(240, 128, "ethanol", "tm small") + F.text(450, 128, "ethyl ethanoate", "tc small bold"), "The –OH of the acid and the H of the alcohol leave as water; the ester link –COO– forms.", { size: "wide" })}
<p><b>Naming esters:</b> the <b>alcohol</b> part comes <b>first</b> (as -yl), the <b>acid</b> part <b>second</b> (as -anoate).</p>
<table class="t"><tr><th>Acid</th><th>Alcohol</th><th>Ester</th><th>Formula</th></tr>
<tr><td>Ethanoic</td><td>Methanol</td><td><b>Methyl ethanoate</b></td><td>CH₃COOCH₃</td></tr>
<tr><td>Ethanoic</td><td>Ethanol</td><td><b>Ethyl ethanoate</b></td><td>CH₃COOC₂H₅</td></tr>
<tr><td>Methanoic</td><td>Propanol</td><td><b>Propyl methanoate</b></td><td>HCOOC₃H₇</td></tr>
<tr><td>Propanoic</td><td>Ethanol</td><td><b>Ethyl propanoate</b></td><td>C₂H₅COOC₂H₅</td></tr></table>
<p>Esters have <b>sweet, fruity smells</b>: used in flavourings, perfumes and as solvents.</p>
<details class="check"><summary>Name the ester formed from butanoic acid and methanol, and give its formula.</summary><div>Methyl butanoate, C₃H₇COOCH₃.</div></details>`},

    { h: "Polymers and plastics (11.7)", body: C`
<p class="lead"><b>Polymers</b> are <b>large molecules</b> built up from many <b>small units</b> called <b>monomers</b>. Different polymers have different units and/or different <b>linkages</b>. <b>Plastics</b> are made from polymers.</p>
<table class="t"><tr><th>Polymer</th><th>Monomer</th><th>Uses</th></tr>
<tr><td>Poly(ethene)</td><td>Ethene CH₂=CH₂</td><td>Plastic bags, bottles, cling film</td></tr>
<tr><td>Poly(propene)</td><td>Propene CH₂=CHCH₃</td><td>Ropes, crates, carpets</td></tr>
<tr><td>Poly(chloroethene), PVC</td><td>Chloroethene CH₂=CHCl</td><td>Window frames, pipes, insulation</td></tr>
<tr><td>PTFE</td><td>Tetrafluoroethene CF₂=CF₂</td><td>Non-stick coatings</td></tr>
<tr><td>Nylon</td><td>Dicarboxylic acid + diamine</td><td>Clothing, ropes</td></tr>
<tr><td>PET (Terylene)</td><td>Dicarboxylic acid + diol</td><td>Drinks bottles, polyester fibres</td></tr></table>
<p>Try each one in the <b>polymer lab</b> at the bottom of the page: watch the monomers join and find the repeat unit.</p>`},

    { h: "Addition polymerisation (11.7 S)", body: C`
<p>In <b>addition polymerisation</b>, many <b>alkene</b> monomers join together. The <b>C=C double bond opens</b> and each monomer bonds to its neighbours. The polymer is the <b>only product</b>.</p>
${F.fig(560, 140, disp(0, 20, ["   H   H", "   |   |", " n C===C", "   |   |", "   H   H"]) + F.arrow(130, 58, 190, 58, "k", 8) + disp(200, 20, ["    H  H", "    |  |", "-[--C--C--]-", "    |  |", "    H  H"]) + F.text(45, 130, "ethene", "tm small") + F.text(285, 130, "poly(ethene)", "tc small bold"), "The repeat unit is drawn in brackets with an n; the bonds through the brackets show it continues.", { size: "wide" })}
<p><b>From monomer to repeat unit:</b> draw the two carbons of the C=C with a single bond, keep all the groups on them, add continuation bonds through brackets.</p>
<p><b>From polymer to monomer:</b> identify the two-carbon repeat unit; put a double bond between the two carbons and remove the continuation bonds.</p>
${F.row(
  mol(["   H  CH₃", "   |   |", "-[-C---C-]-", "   |   |", "   H   H"], "Poly(propene): the CH₃ hangs off every other carbon.", "poly(propene)"),
  mol(["   H   Cl", "   |   |", "-[-C---C-]-", "   |   |", "   H   H"], "Poly(chloroethene), PVC.", "PVC")
)}
<details class="check"><summary>Draw the monomer of the polymer with repeat unit –[CH₂–CH(CN)]–.</summary><div>CH₂=CH(CN): put a C=C between the two carbons (this is acrylonitrile, used for acrylic fibres).</div></details>`},

    { h: "Condensation polymerisation: nylon and PET (11.7 S)", body: C`
<p>In <b>condensation polymerisation</b>, monomers with <b>two functional groups each</b> join, and a <b>small molecule (water)</b> is eliminated at every link. Usually two <b>different</b> monomers alternate.</p>
${(() => { const blk = (x, y, w, c, lab, l, r) => F.rect(x, y, w, 26, c + "S " + c, 7) + F.text(x + w / 2, y + 17, lab, "tk small") + F.text(x - 2, y + 17, l, "t" + c + " small bold", "end") + F.text(x + w + 2, y + 17, r, "t" + c + " small bold", "start"); let s = "";
  s += F.text(10, 18, "Nylon (polyamide)", "tk bold", "start") + blk(60, 30, 70, "r", "acid", "HOOC–", "–COOH") + F.text(210, 47, "+", "tk") + blk(270, 30, 70, "b", "amine", "H₂N–", "–NH₂") + F.arrow(390, 43, 420, 43, "k", 7);
  const chain = (y, cs, links) => F.text(14, y + 17, "…", "tk") + cs.map((c, i) => blk(28 + i * 120, y, 50, c, "", "", "") + (i < 3 ? F.text(28 + i * 120 + 85, y + 17, links[i % 2], "tg small bold") : "")).join("") + F.text(28 + 3 * 120 + 56, y + 17, "…  + water", "tk small", "start");
  s += chain(82, ["r", "b", "r", "b"], ["–CO–NH–", "–NH–CO–"]);
  s += F.text(10, 150, "PET (polyester)", "tk bold", "start") + blk(60, 162, 70, "r", "acid", "HOOC–", "–COOH") + F.text(210, 179, "+", "tk") + blk(270, 162, 70, "o", "diol", "HO–", "–OH") + F.arrow(390, 175, 420, 175, "k", 7);
  s += chain(214, ["r", "o", "r", "o"], ["–CO–O–", "–O–CO–"]);
  return F.fig(540, 250, s, "Blocks represent the carbon chains. Amide link (nylon): –CONH–. Ester link (PET): –COO–.", { size: "wide" }); })()}
<table class="t"><tr><th></th><th>Addition polymerisation</th><th>Condensation polymerisation</th></tr>
<tr><td>Monomers</td><td>Alkenes (C=C)</td><td>Two functional groups each (e.g. –COOH, –NH₂, –OH)</td></tr>
<tr><td>Products</td><td>Polymer only</td><td>Polymer <b>and</b> a small molecule (water)</td></tr>
<tr><td>Number of monomer types</td><td>Usually one</td><td>Usually two, alternating</td></tr>
<tr><td>Linkage</td><td>C–C</td><td>Amide –CONH– or ester –COO–</td></tr></table>
<p><b>Recycling PET:</b> PET can be converted back into its monomers (by hydrolysis) and <b>re-polymerised</b>, making new PET.</p>`},

    { h: "Problems with plastics (11.7)", body: C`
<p>Most plastics are <b>non-biodegradable</b>: microorganisms cannot break them down. Disposal causes pollution:</p>
<ul><li><b>Landfill</b>: plastics take up space and remain for hundreds of years; land is wasted.</li>
<li><b>Accumulation in oceans</b>: plastic waste harms aquatic life (animals swallow it or become entangled); it breaks into microplastics that enter food chains.</li>
<li><b>Burning</b>: produces <b>toxic gases</b> (e.g. HCl from PVC, carbon monoxide) and CO₂ (climate change).</li></ul>
<p>Solutions: reduce use, re-use, <b>recycle</b> (e.g. PET), and develop biodegradable plastics.</p>`},

    { h: "Proteins: natural polyamides (11.7 S)", body: C`
<p><b>Proteins</b> are natural <b>condensation polymers</b>. Their monomers are <b>amino acids</b>, which each have an <b>amine group</b> (–NH₂) and a <b>carboxylic acid group</b> (–COOH).</p>
${F.row(mol(["    H   O", "    |   ‖", "H-N-C---C-O-H", "  | |", "  H R"], "General amino acid; R varies (there are about 20).", "amino acid"),
  F.fig(330, 130, disp(0, 20, ["    H   O       H   O", "    |   ‖       |   ‖", "-N--C---C---N---C---C-", "  | |       |   |", "  H R       H   R"]) + F.text(150, 120, "amide (peptide) link –CONH–", "tg small bold"), "Part of a protein chain.", { size: "tiny" }))}
<ul><li>Amino acids join by condensation: the –COOH of one reacts with the –NH₂ of the next, eliminating water and forming an <b>amide link</b> –CONH– (the same link as in nylon).</li>
<li>Proteins are therefore <b>polyamides</b>. Unlike nylon, a protein is made from many <b>different</b> amino acids in a particular order.</li></ul>`}
  ],
  worked: [
    { q: C`S: Compare the manufacture of ethanol by fermentation and by the hydration of ethene. Give two advantages of each.`,
      steps: [C`Fermentation: uses a renewable raw material (sugar from crops); low temperature/pressure, so low energy cost.`, C`Hydration: fast and continuous; produces pure ethanol (no distillation from 15% solution).`, C`Disadvantages: fermentation is slow and impure; hydration uses non-renewable crude oil and high energy conditions.`]},
    { q: C`S: Draw the repeat unit of the polymer made from propene, CH₂=CHCH₃.`,
      steps: [C`Write the two carbons from the C=C side by side, joined by a single bond.`, C`Keep the substituents: one carbon has H, H; the other has H, CH₃.`, C`Add continuation bonds out through square brackets and write n: –[CH₂–CH(CH₃)]ₙ–.`]},
    { q: C`S: Ethanoic acid is warmed with propan-1-ol and a few drops of concentrated sulfuric acid. Name the ester and write the equation.`,
      steps: [C`Alcohol first (propyl), acid second (ethanoate): <b>propyl ethanoate</b>.`, C`$\text{CH}_3\text{COOH} + \text{C}_3\text{H}_7\text{OH} \rightleftharpoons \text{CH}_3\text{COOC}_3\text{H}_7 + \text{H}_2\text{O}$`, C`Sulfuric acid is a catalyst.`]}
  ],
  formulas: [["Fermentation", C`$\text{C}_6\text{H}_{12}\text{O}_6 \rightarrow 2\text{C}_2\text{H}_5\text{OH} + 2\text{CO}_2$`], ["Hydration", "C₂H₄ + H₂O ⇌ C₂H₅OH (300 °C, 6000 kPa, H₃PO₄)"], ["Ethanol combustion", C`$\text{C}_2\text{H}_5\text{OH} + 3\text{O}_2 \rightarrow 2\text{CO}_2 + 3\text{H}_2\text{O}$`], ["Esterification (S)", "acid + alcohol ⇌ ester + water (conc. H₂SO₄)"], ["Amide link", "–CONH–"], ["Ester link", "–COO–"]],
  cards: [
    ["Conditions for fermentation", "Yeast, 25–35 °C, no oxygen (anaerobic)."],
    ["Why no air in fermentation?", "Ethanol would be oxidised to ethanoic acid."],
    ["Why does fermentation stop at ~15%?", "The ethanol kills the yeast."],
    ["One advantage of fermentation (S)", "Renewable raw material / low energy."],
    ["One advantage of hydration (S)", "Fast, continuous, pure product."],
    ["Two uses of ethanol", "Solvent and fuel."],
    ["Ethanoic acid + sodium carbonate →", "Sodium ethanoate + water + carbon dioxide."],
    ["Formula of sodium ethanoate", "CH₃COONa."],
    ["Two ways to oxidise ethanol to ethanoic acid (S)", "Acidified KMnO₄; bacterial oxidation (vinegar)."],
    ["Catalyst for esterification (S)", "Concentrated sulfuric acid."],
    ["Name: ethanoic acid + methanol ester (S)", "Methyl ethanoate."],
    ["Smell of esters", "Sweet, fruity."],
    ["Polymer", "A large molecule built from many small units (monomers)."],
    ["Addition polymerisation (S)", "Alkene monomers join as the C=C opens; only one product."],
    ["Condensation polymerisation (S)", "Monomers with two functional groups join, eliminating water."],
    ["Nylon is a…", "Polyamide (dicarboxylic acid + diamine)."],
    ["PET is a…", "Polyester (dicarboxylic acid + diol)."],
    ["Amide link", "–CONH–"],
    ["Ester link", "–COO–"],
    ["Recycling PET (S)", "Converted back to monomers and re-polymerised."],
    ["Three problems of plastic disposal", "Landfill space, ocean pollution harming wildlife, toxic gases when burnt."],
    ["Proteins (S)", "Natural polyamides made from amino acid monomers."],
    ["Groups in an amino acid", "Amine –NH₂ and carboxylic acid –COOH."],
    ["Monomer of PVC", "Chloroethene, CH₂=CHCl."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`Which condition is NOT used in fermentation?`, opts: ["yeast", "30 °C", "absence of air", "phosphoric acid catalyst"], ans: 3, why: C`H₃PO₄ is for hydration of ethene.` },
    { type: "mcq", marks: 1, q: C`The products of fermentation are`, opts: ["ethanol and water", "ethanol and carbon dioxide", "ethene and water", "ethanoic acid and CO₂"], ans: 1, why: C`C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.` },
    { type: "mcq", marks: 1, q: C`Ethanoic acid reacts with magnesium to give`, opts: ["magnesium ethanoate and water", "magnesium ethanoate and hydrogen", "magnesium oxide and hydrogen", "no reaction"], ans: 1, why: C`Acid + metal → salt + H₂.` },
    { type: "mcq", marks: 1, q: C`The ester formed from methanoic acid and ethanol is`, opts: ["methyl ethanoate", "ethyl methanoate", "ethyl ethanoate", "methyl methanoate"], ans: 1, why: C`Alcohol part first: ethyl methanoate.` },
    { type: "mcq", marks: 1, q: C`Which monomer forms PTFE?`, opts: ["CH₂=CH₂", "CH₂=CHCl", "CF₂=CF₂", "CH₂=CHCH₃"], ans: 2, why: C`Tetrafluoroethene.` },
    { type: "mcq", marks: 1, q: C`What is eliminated in condensation polymerisation to make nylon?`, opts: ["hydrogen", "water", "carbon dioxide", "nothing"], ans: 1, why: C`Water.` },
    { type: "struct", marks: 3, q: C`State the conditions for fermentation and explain why each is needed.`,
      ms: C`<b>B1</b> yeast: provides enzymes<br><b>B1</b> 25–35 °C: optimum for enzymes (too hot denatures)<br><b>B1</b> absence of air: prevents oxidation to ethanoic acid` },
    { type: "struct", marks: 2, q: C`Write the balanced equation for the complete combustion of ethanol.`,
      ms: C`<b>B1</b> C₂H₅OH + O₂ → CO₂ + H₂O<br><b>B1</b> balanced: 3O₂, 2CO₂, 3H₂O` },
    { type: "struct", marks: 3, q: C`S: Describe how to make the ester ethyl ethanoate. Name the reactants and catalyst and write the equation.`,
      ms: C`<b>B1</b> warm ethanoic acid with ethanol<br><b>B1</b> concentrated sulfuric acid catalyst<br><b>B1</b> CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O` },
    { type: "struct", marks: 2, q: C`S: Draw the repeat unit of poly(chloroethene).`,
      ms: C`<b>B1</b> two carbons single bonded with H, H and H, Cl<br><b>B1</b> continuation bonds through brackets and n` },
    { type: "struct", marks: 3, q: C`S: Give three differences between addition and condensation polymerisation.`,
      ms: C`<b>B1</b> addition: only polymer formed; condensation: small molecule (water) also formed<br><b>B1</b> addition monomers are alkenes / have C=C; condensation monomers have two functional groups<br><b>B1</b> addition: usually one monomer; condensation: usually two different monomers` },
    { type: "struct", marks: 3, q: C`Describe three problems caused by the disposal of plastics.`,
      ms: C`<b>B1</b> non-biodegradable, so landfill sites fill up<br><b>B1</b> accumulate in oceans, harming aquatic animals<br><b>B1</b> burning produces toxic gases` },
    { type: "struct", marks: 2, q: C`S: Name the type of link in proteins and the monomers proteins are made from.`,
      ms: C`<b>B1</b> amide (peptide) link –CONH–<br><b>B1</b> amino acids` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: C`State two uses of ethanol.`, ms: C`<b>B1</b> solvent<br><b>B1</b> fuel` },
    { d: 1, type: "mcq", marks: 1, q: C`Which gas is produced in fermentation?`, opts: ["oxygen", "hydrogen", "carbon dioxide", "methane"], ans: 2, why: C`CO₂.` },
    { d: 1, type: "struct", marks: 1, q: C`Define the term polymer.`, ms: C`<b>B1</b> large molecule made from many small units / monomers joined together` },
    { d: 1, type: "struct", marks: 2, q: C`Name the monomer and give one use of poly(ethene).`, ms: C`<b>B1</b> ethene<br><b>B1</b> plastic bags / bottles / cling film` },
    { d: 1, type: "mcq", marks: 1, q: C`Which substance is a carboxylic acid?`, opts: ["C₂H₅OH", "CH₃COOH", "C₂H₄", "CH₃COOCH₃"], ans: 1, why: C`–COOH.` },
    { d: 2, type: "struct", marks: 3, q: C`Ethanoic acid is added to calcium carbonate. Describe what is seen, name the salt and write the equation.`, ms: C`<b>B1</b> fizzing / bubbles; solid dissolves<br><b>B1</b> calcium ethanoate<br><b>B1</b> 2CH₃COOH + CaCO₃ → (CH₃COO)₂Ca + H₂O + CO₂` },
    { d: 2, type: "struct", marks: 2, q: C`S: Describe two ways to convert ethanol into ethanoic acid.`, ms: C`<b>B1</b> heat with acidified potassium manganate(VII)<br><b>B1</b> leave exposed to air: bacterial oxidation` },
    { d: 2, type: "struct", marks: 2, q: C`S: Name the ester with formula CH₃COOC₃H₇ and the acid and alcohol used to make it.`, ms: C`<b>B1</b> propyl ethanoate<br><b>B1</b> ethanoic acid and propanol` },
    { d: 2, type: "struct", marks: 2, q: C`S: The repeat unit of a polymer is –[CH₂–CH(C₆H₅)]–. Draw or write the monomer and name the type of polymerisation.`, ms: C`<b>B1</b> CH₂=CHC₆H₅ (C=C between the two carbons)<br><b>B1</b> addition` },
    { d: 2, type: "mcq", marks: 1, q: C`PET is made from`, opts: ["a diamine and a dicarboxylic acid", "a diol and a dicarboxylic acid", "ethene", "amino acids"], ans: 1, why: C`Polyester.` },
    { d: 3, type: "struct", marks: 5, q: C`S: A country with large areas of farmland but no oil reserves wants to produce ethanol for fuel. Recommend a method, giving the equation, conditions and reasons, and one disadvantage of your method.`, ms: C`<b>B1</b> fermentation<br><b>B1</b> C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂<br><b>B1</b> yeast, 25–35 °C, no air<br><b>B1</b> renewable sugar crops available / no crude oil needed / low energy<br><b>B1</b> slow / batch / impure, needs fractional distillation / uses farmland` },
    { d: 3, type: "struct", marks: 4, q: C`S: Nylon is made from HOOC–(CH₂)₄–COOH and H₂N–(CH₂)₆–NH₂. Draw the structure of nylon showing one repeat unit, and state the other product. Explain why nylon and proteins are both described as polyamides.`, ms: C`<b>B1</b> –[CO–(CH₂)₄–CO–NH–(CH₂)₆–NH]– correctly shown<br><b>B1</b> amide link –CONH– shown<br><b>B1</b> water<br><b>B1</b> both contain amide links formed by condensation` },
    { d: 3, type: "struct", marks: 3, q: C`S: Calculate the maximum mass of ethanol produced by fermenting 90 g of glucose. (Mr: glucose 180, ethanol 46)`, ms: C`<b>C1</b> moles glucose = 90/180 = 0.5<br><b>C1</b> moles ethanol = 1.0 (1:2)<br><b>A1</b> 46 g` }
  ]
});
}
