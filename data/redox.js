window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
//@@HELPERS-START
const tube = (x, y, fill, top, lab) => F.path(`M${x},${y} L${x},${y + 100} Q${x},${y + 116} ${x + 16},${y + 116} Q${x + 32},${y + 116} ${x + 32},${y + 100} L${x + 32},${y}`, "k") + F.rect(x + 1, y + 40, 30, 66, fill + " nostroke") + F.text(x + 16, y - 8, top, "tk small bold") + F.text(x + 16, y + 140, lab, "tk small");
//@@HELPERS-END

/* ============================================================
   REDOX  (0620: 6.4)
   ============================================================ */
TOPICS.push({
  id: "redox", subject: "chemistry", unit: 6, title: "Redox",
  blurb: "Oxidation and reduction by oxygen, electrons and oxidation number, Roman numerals, oxidising and reducing agents, and colour-change tests with KMnO₄ and KI.",
  level: "Core → Supplement",
  syllabus: [
    ["6.4", "Use a Roman numeral to indicate the oxidation number of an element in a compound", 0],
    ["6.4", "Redox reactions involve simultaneous oxidation and reduction", 1],
    ["6.4", "Oxidation is gain of oxygen and reduction is loss of oxygen; identify redox reactions this way", 1],
    ["6.4 S", "Oxidation is loss of electrons / increase in oxidation number; reduction is gain of electrons / decrease in oxidation number", 2],
    ["6.4 S", "Rules for oxidation numbers; identify redox reactions from changes in oxidation number", 3],
    ["6.4 S", "Identify redox by colour changes with acidified potassium manganate(VII) or potassium iodide", 5],
    ["6.4 S", "Define and identify oxidising agents and reducing agents", 4]
  ],
  sections: [
    { h: "Roman numerals in names (6.4)", body: C`
<p class="lead">Some elements, especially transition metals, can form ions with different charges. A <b>Roman numeral</b> in the name shows which: it gives the element's <b>oxidation number</b>.</p>
<table class="t"><tr><th>Name</th><th>Ion</th><th>Formula</th><th>Colour</th></tr>
<tr><td>Iron(II) sulfate</td><td>Fe²⁺</td><td>FeSO₄</td><td>Pale green</td></tr>
<tr><td>Iron(III) chloride</td><td>Fe³⁺</td><td>FeCl₃</td><td>Yellow-brown</td></tr>
<tr><td>Copper(I) oxide</td><td>Cu⁺</td><td>Cu₂O</td><td>Red</td></tr>
<tr><td>Copper(II) oxide</td><td>Cu²⁺</td><td>CuO</td><td>Black</td></tr>
<tr><td>Manganese(IV) oxide</td><td>Mn: +4</td><td>MnO₂</td><td>Black</td></tr>
<tr><td>Potassium manganate(VII)</td><td>Mn: +7</td><td>KMnO₄</td><td>Purple</td></tr></table>
<details class="check"><summary>Write the formula of chromium(III) oxide.</summary><div>Cr³⁺ and O²⁻: Cr₂O₃.</div></details>`},

    { h: "Oxidation and reduction: oxygen (6.4)", body: C`
<ul><li><b>Oxidation</b> is the <b>gain of oxygen</b>.</li><li><b>Reduction</b> is the <b>loss of oxygen</b>.</li></ul>
<p>They always happen <b>together</b>: if one substance gains oxygen, another must lose it. A reaction in which both happen is a <b>redox</b> reaction.</p>
${(() => { let s = F.text(30, 80, "CuO", "tk big bold", "start") + F.text(95, 80, "+", "tk big") + F.text(120, 80, "H₂", "tk big bold", "start") + F.arrow(170, 74, 220, 74, "k", 8) + F.text(235, 80, "Cu", "tk big bold", "start") + F.text(280, 80, "+", "tk big") + F.text(305, 80, "H₂O", "tk big bold", "start");
  s += F.path("M55,92 Q150,150 250,92", "b mid") + F.arrow(244, 98, 252, 90, "b", 8) + F.text(150, 150, "CuO loses O: reduced", "tb small bold");
  s += F.path("M135,52 Q220,0 320,52", "r mid") + F.arrow(314, 46, 322, 54, "r", 8) + F.text(230, 18, "H₂ gains O: oxidised", "tr small bold");
  return F.fig(400, 165, s, "Hydrogen reduces copper(II) oxide.", { size: "small" }); })()}
<p>Other examples: combustion (fuel gains oxygen: oxidised); rusting (iron is oxidised); extracting iron in a blast furnace ($\text{Fe}_2\text{O}_3+3\text{CO}\rightarrow2\text{Fe}+3\text{CO}_2$: iron oxide is reduced, carbon monoxide oxidised).</p>`},

    { h: "Oxidation and reduction: electrons (6.4 S)", body: C`
<p class="lead">Many redox reactions don't involve oxygen at all. The more general definition uses <b>electrons</b>.</p>
<div class="callout key"><b class="t">OIL RIG</b><b>O</b>xidation <b>I</b>s <b>L</b>oss of electrons. <b>R</b>eduction <b>I</b>s <b>G</b>ain of electrons.</div>
<div class="viz" data-viz="redox"></div>
<p>Split a redox reaction into two <b>half-equations</b>:</p>
$$\text{Zn}\rightarrow\text{Zn}^{2+}+2e^-\quad(\text{oxidation})\qquad\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}\quad(\text{reduction})$$
<p>Metal displacement reactions, halogen displacement, and electrolysis are all redox reactions in this sense.</p>
<details class="check"><summary>In $\text{Cl}_2+2\text{Br}^-\rightarrow2\text{Cl}^-+\text{Br}_2$, which species is oxidised?</summary><div>Bromide ions: they lose electrons ($2\text{Br}^-\rightarrow\text{Br}_2+2e^-$).</div></details>`},

    { h: "Oxidation numbers (6.4 S)", body: C`
<p class="lead">An <b>oxidation number</b> is a number given to each atom to keep track of electrons. Oxidation = <b>increase</b> in oxidation number; reduction = <b>decrease</b>.</p>
<h3>Rules</h3>
<ol class="steps-inline"><li>An uncombined element has oxidation number <b>0</b> (Fe, O₂, Cl₂).</li>
<li>A monatomic ion has the oxidation number equal to its <b>charge</b> (Na⁺ = +1, Cl⁻ = −1, Fe³⁺ = +3).</li>
<li>In a compound, the oxidation numbers add up to <b>zero</b>.</li>
<li>In a polyatomic ion, they add up to the <b>charge on the ion</b>.</li>
<li>Useful values: O is usually −2; H is usually +1; Group I metals +1; Group II +2.</li></ol>
<h3>Working one out</h3>
<p>Mn in KMnO₄: K = +1, O = 4 × (−2) = −8. Total = 0, so Mn = +7 (hence "manganate(VII)").</p>
<p>S in SO₄²⁻: O = −8; total = −2; so S = +6.</p>
<h3>Spotting redox from oxidation numbers</h3>
$$\overset{0}{2\text{Mg}}+\overset{0}{\text{O}_2}\rightarrow\overset{+2\ -2}{2\text{MgO}}$$
<p>Mg: 0 → +2 (increase: oxidised). O: 0 → −2 (decrease: reduced). It's redox.</p>
<p>In $\text{NaOH}+\text{HCl}\rightarrow\text{NaCl}+\text{H}_2\text{O}$, no oxidation number changes, so neutralisation is <b>not</b> redox.</p>`},

    { h: "Oxidising and reducing agents (6.4 S)", body: C`
<ul><li>An <b>oxidising agent</b> oxidises another substance and is <b>itself reduced</b> (it accepts electrons).</li>
<li>A <b>reducing agent</b> reduces another substance and is <b>itself oxidised</b> (it gives electrons).</li></ul>
<table class="t"><tr><th>Reaction</th><th>Oxidising agent</th><th>Reducing agent</th></tr>
<tr><td>$\text{Zn}+\text{Cu}^{2+}\rightarrow\text{Zn}^{2+}+\text{Cu}$</td><td>Cu²⁺</td><td>Zn</td></tr>
<tr><td>$\text{CuO}+\text{H}_2\rightarrow\text{Cu}+\text{H}_2\text{O}$</td><td>CuO</td><td>H₂</td></tr>
<tr><td>$\text{Fe}_2\text{O}_3+3\text{CO}\rightarrow2\text{Fe}+3\text{CO}_2$</td><td>Fe₂O₃</td><td>CO</td></tr>
<tr><td>$\text{Cl}_2+2\text{I}^-\rightarrow2\text{Cl}^-+\text{I}_2$</td><td>Cl₂</td><td>I⁻</td></tr></table>
<div class="callout warn"><b class="t">Common trap</b>The oxidising agent is the one that gets <b>reduced</b>. Common oxidising agents: oxygen, chlorine, acidified potassium manganate(VII). Common reducing agents: carbon, carbon monoxide, hydrogen, reactive metals, iodide ions.</div>`},

    { h: "Testing for oxidising and reducing agents (6.4 S)", body: C`
${F.row(
  (() => { let s = tube(30, 30, "rS", "KMnO₄(aq), H⁺", "purple") + F.arrow(74, 110, 176, 110, "k mid", 8) + F.text(125, 84, "add reducing", "tk small") + F.text(125, 99, "agent", "tk small") + tube(190, 30, "mS", "", "colourless");
    return F.fig(260, 190, s, "Acidified potassium manganate(VII) (an oxidising agent) turns from <b>purple to colourless</b> when it reacts with a <b>reducing agent</b>.", { size: "tiny" }); })(),
  (() => { let s = tube(30, 30, "mS", "KI(aq)", "colourless") + F.arrow(74, 110, 176, 110, "k mid", 8) + F.text(125, 84, "add oxidising", "tk small") + F.text(125, 99, "agent", "tk small") + tube(190, 30, "oS", "", "yellow-brown");
    return F.fig(260, 190, s, "Potassium iodide (a reducing agent) turns from <b>colourless to yellow-brown</b> (iodine forms) when it reacts with an <b>oxidising agent</b>.", { size: "tiny" }); })()
)}
<table class="t"><tr><th>Test substance</th><th>It is a…</th><th>Detects a…</th><th>Positive result</th></tr>
<tr><td>Acidified KMnO₄(aq)</td><td>Oxidising agent</td><td>Reducing agent</td><td>Purple → colourless</td></tr>
<tr><td>KI(aq)</td><td>Reducing agent</td><td>Oxidising agent</td><td>Colourless → yellow-brown</td></tr></table>
<p>In the KI test: $2\text{I}^-\rightarrow\text{I}_2+2e^-$ (iodide oxidised). In the KMnO₄ test, manganese(VII) is reduced to colourless Mn²⁺.</p>`}
  ],
  worked: [
    { q: C`S: In the reaction 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂, identify the species oxidised and reduced, and the oxidising agent.`,
      steps: [C`Fe: +3 → +2: reduced.`, C`I: −1 → 0: oxidised.`, C`The oxidising agent is Fe³⁺ (it is reduced); the reducing agent is I⁻.`]},
    { q: C`S: Find the oxidation number of chromium in K₂Cr₂O₇.`,
      steps: [C`K: 2 × (+1) = +2; O: 7 × (−2) = −14.`, C`Total must be 0: 2 + 2x − 14 = 0, so 2x = 12.`, C`Cr = +6 (dichromate(VI)).`]}
  ],
  formulas: [["Oxidation", "gain of O; loss of e⁻ (S); ON increases (S)"], ["Reduction", "loss of O; gain of e⁻ (S); ON decreases (S)"], ["Oxidising agent (S)", "is itself reduced"], ["Reducing agent (S)", "is itself oxidised"], ["Tests (S)", "KMnO₄ purple → colourless; KI colourless → yellow-brown"]],
  cards: [
    ["Define oxidation (oxygen)", "Gain of oxygen."],
    ["Define reduction (oxygen)", "Loss of oxygen."],
    ["What is a redox reaction?", "One in which oxidation and reduction happen at the same time."],
    ["OIL RIG (S)", "Oxidation Is Loss, Reduction Is Gain (of electrons)."],
    ["Oxidation in terms of oxidation number (S)", "An increase in oxidation number."],
    ["Oxidation number of an uncombined element (S)", "Zero."],
    ["Sum of oxidation numbers in a compound (S)", "Zero (in an ion: equals the charge)."],
    ["What does iron(III) mean?", "Iron with oxidation number +3 (Fe³⁺)."],
    ["Define oxidising agent (S)", "A substance that oxidises another and is itself reduced."],
    ["Define reducing agent (S)", "A substance that reduces another and is itself oxidised."],
    ["Acidified KMnO₄ with a reducing agent (S)", "Purple → colourless."],
    ["KI with an oxidising agent (S)", "Colourless → yellow-brown (iodine forms)."],
    ["Is neutralisation a redox reaction?", "No: no oxidation numbers change."],
    ["In CuO + H₂ → Cu + H₂O, what is reduced?", "Copper(II) oxide (loses oxygen)."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`In 2Mg + O₂ → 2MgO, magnesium is`, opts: ["reduced", "oxidised", "neither", "both"], ans: 1, why: C`It gains oxygen.` },
    { type: "mcq", marks: 1, q: C`The formula of iron(III) oxide is`, opts: ["FeO", "Fe₂O₃", "Fe₃O₂", "FeO₃"], ans: 1, why: C`Fe³⁺ and O²⁻.` },
    { type: "mcq", marks: 1, q: C`S: Reduction is`, opts: ["loss of electrons", "gain of electrons", "gain of oxygen", "increase in oxidation number"], ans: 1, why: C`RIG.` },
    { type: "mcq", marks: 1, q: C`S: The oxidation number of S in H₂SO₄ is`, opts: ["+2", "+4", "+6", "−2"], ans: 2, why: C`2(+1) + S + 4(−2) = 0.` },
    { type: "mcq", marks: 1, q: C`S: Acidified potassium manganate(VII) is used to test for`, opts: ["oxidising agents", "reducing agents", "acids", "water"], ans: 1, why: C`It is decolourised by reducing agents.` },
    { type: "mcq", marks: 1, q: C`S: In Cl₂ + 2KBr → 2KCl + Br₂, the oxidising agent is`, opts: ["Cl₂", "KBr", "KCl", "Br₂"], ans: 0, why: C`Chlorine gains electrons (is reduced).` },
    { type: "struct", marks: 3, q: C`In Fe₂O₃ + 3CO → 2Fe + 3CO₂, identify the substance oxidised and the substance reduced, explaining in terms of oxygen.`,
      ms: C`<b>B1</b> Fe₂O₃ reduced<br><b>B1</b> it loses oxygen<br><b>B1</b> CO oxidised: gains oxygen` },
    { type: "struct", marks: 4, q: C`S: Zinc is added to copper(II) sulfate solution. Write the two half-equations and identify the oxidising and reducing agents.`,
      ms: C`<b>B1</b> $\text{Zn}\rightarrow\text{Zn}^{2+}+2e^-$<br><b>B1</b> $\text{Cu}^{2+}+2e^-\rightarrow\text{Cu}$<br><b>B1</b> oxidising agent: Cu²⁺<br><b>B1</b> reducing agent: Zn` },
    { type: "struct", marks: 3, q: C`S: Use oxidation numbers to show that 2H₂S + SO₂ → 3S + 2H₂O is a redox reaction.`,
      ms: C`<b>B1</b> S in H₂S: −2 → 0 (oxidised)<br><b>B1</b> S in SO₂: +4 → 0 (reduced)<br><b>B1</b> oxidation and reduction happen simultaneously: redox` },
    { type: "struct", marks: 2, q: C`S: Describe a test to show that a solution contains a reducing agent.`,
      ms: C`<b>B1</b> add acidified potassium manganate(VII)<br><b>B1</b> purple to colourless` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: C`State what is meant by reduction in terms of oxygen.`, ms: C`<b>B1</b> loss of oxygen` },
    { d: 1, type: "mcq", marks: 1, q: C`Copper(II) chloride contains the ion`, opts: ["Cu⁺", "Cu²⁺", "Cu³⁺", "Cl²⁻"], ans: 1, why: C`(II) = +2.` },
    { d: 2, type: "struct", marks: 3, q: C`S: Explain why the reaction between magnesium and copper(II) sulfate solution is a redox reaction.`, ms: C`<b>B1</b> magnesium loses electrons (oxidised): Mg → Mg²⁺ + 2e⁻<br><b>B1</b> Cu²⁺ gains electrons (reduced)<br><b>B1</b> both happen at the same time` },
    { d: 2, type: "struct", marks: 2, q: C`S: Determine the oxidation number of nitrogen in NO₃⁻ and in NH₄⁺.`, ms: C`<b>B1</b> +5<br><b>B1</b> −3` },
    { d: 2, type: "mcq", marks: 1, q: C`S: Potassium iodide solution turns yellow-brown when added to solution X. X is`, opts: ["a reducing agent", "an oxidising agent", "an alkali", "a catalyst"], ans: 1, why: C`I⁻ oxidised to I₂.` },
    { d: 3, type: "struct", marks: 5, q: C`S: Chlorine water is added to aqueous potassium iodide. (a) Describe the colour change. (b) Write the ionic equation. (c) Use oxidation numbers to identify the oxidising and reducing agents.`, ms: C`<b>(a) B1</b> colourless to yellow-brown/brown<br><b>(b) B1</b> $\text{Cl}_2+2\text{I}^-\rightarrow2\text{Cl}^-+\text{I}_2$<br><b>(c) B1</b> Cl: 0 → −1 reduced, so Cl₂ is the oxidising agent<br><b>B1</b> I: −1 → 0 oxidised<br><b>B1</b> so I⁻ is the reducing agent` },
    { d: 3, type: "struct", marks: 4, q: C`S: In the thermite reaction, 2Al + Fe₂O₃ → Al₂O₃ + 2Fe. Explain fully, using oxygen, electrons and oxidation numbers, which substance is oxidised.`, ms: C`<b>B1</b> aluminium is oxidised<br><b>B1</b> it gains oxygen<br><b>B1</b> loses electrons (Al → Al³⁺ + 3e⁻)<br><b>B1</b> oxidation number increases 0 → +3` }
  ]
});
}
