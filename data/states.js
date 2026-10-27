window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;
//@@HELPERS-START
const rnd = (i, k) => Math.abs(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1;
const grid = (x, y, n, r, c) => { let s = ""; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += F.circ(x + i * (2 * r + 1), y + j * (2 * r + 1), r, c + "S " + c); return s; };
const gasbox = (x, y, w, h, n, r, c, seed = 0) => { let s = ""; const cells = Array.from({ length: 16 }, (_, i) => i).sort((a, b) => rnd(a + seed, 7) - rnd(b + seed, 7)); for (let i = 0; i < n; i++) { const k = cells[i]; s += F.circ(x + ((k % 4) + .5 + (rnd(i + seed, 4) - .5) * .5) * w / 4, y + (Math.floor(k / 4) + .5 + (rnd(i + seed, 5) - .5) * .5) * h / 4, r, c + "S " + c); } return s; };
//@@HELPERS-END

/* ============================================================
   STATES OF MATTER & DIFFUSION  (0620: 1.1, 1.2)
   ============================================================ */
TOPICS.push({
  id: "states", subject: "chemistry", unit: 1, title: "States of matter & diffusion",
  blurb: "Solids, liquids and gases, the kinetic particle theory, changes of state, heating and cooling curves, gas volume, and diffusion.",
  level: "Core → Supplement", demo: "gas",
  syllabus: [
    ["1.1", "State the distinguishing properties of solids, liquids and gases", 0],
    ["1.1", "Describe the structure of solids, liquids and gases in terms of particle separation, arrangement and motion", 1],
    ["1.1", "Describe changes of state: melting, boiling, evaporating, freezing and condensing", 2],
    ["1.1", "Explain changes of state using kinetic particle theory, including heating and cooling curves", 3],
    ["1.1 S", "Explain, using kinetic particle theory, the effects of temperature and pressure on the volume of a gas", 4],
    ["1.2", "Describe and explain diffusion in terms of kinetic particle theory", 5],
    ["1.2 S", "Describe and explain the effect of relative molecular mass on the rate of diffusion of gases", 6]
  ],
  sections: [
    { h: "Solids, liquids and gases (1.1)", body: C`
<p class="lead">All matter exists as a <b>solid</b>, <b>liquid</b> or <b>gas</b>. You can tell them apart by four properties.</p>
<table class="t"><tr><th></th><th>Solid</th><th>Liquid</th><th>Gas</th></tr>
<tr><td>Shape</td><td>Fixed</td><td>Takes the shape of its container</td><td>Takes the shape of its container</td></tr>
<tr><td>Volume</td><td>Fixed</td><td>Fixed</td><td>Not fixed: fills the container</td></tr>
<tr><td>Flow</td><td>Does not flow</td><td>Flows</td><td>Flows</td></tr>
<tr><td>Compressibility</td><td>Very hard to compress</td><td>Very hard to compress</td><td>Easily compressed</td></tr></table>
<p>Which state a substance is in depends on the <b>temperature</b> and on how strong the <b>forces of attraction</b> between its particles are. At room temperature (25 °C) and pressure, iron is solid, water is liquid and oxygen is gas.</p>
<h3>Using melting and boiling points</h3>
<p>A substance is:</p>
<ul><li><b>solid</b> if the temperature is below its melting point;</li><li><b>liquid</b> if between its melting and boiling points;</li><li><b>gas</b> if above its boiling point.</li></ul>
<table class="t"><tr><th>Substance</th><th>m.p. / °C</th><th>b.p. / °C</th><th>State at 25 °C</th></tr>
<tr><td>Ethanol</td><td>−114</td><td>78</td><td>Liquid</td></tr><tr><td>Bromine</td><td>−7</td><td>59</td><td>Liquid</td></tr><tr><td>Sulfur</td><td>115</td><td>445</td><td>Solid</td></tr><tr><td>Chlorine</td><td>−101</td><td>−34</td><td>Gas</td></tr></table>
<details class="check"><summary>Substance X melts at −20 °C and boils at 15 °C. What state is it in at 0 °C and at 25 °C?</summary><div>At 0 °C it is a liquid (between m.p. and b.p.). At 25 °C it is a gas (above b.p.).</div></details>`},

    { h: "The kinetic particle theory (1.1)", body: C`
<p class="lead">The <b>kinetic particle theory</b> says that all matter is made of tiny particles in constant motion. The differences between states come from how the particles are <b>arranged</b>, how far apart they are (<b>separation</b>) and how they <b>move</b>.</p>
<div class="viz" data-viz="particleStates"></div>
${F.row(
  F.fig(180, 160, F.rect(20, 20, 140, 120, "m") + grid(36, 36, 5, 10.5, "b"), "<b>Solid</b>: regular, close together, vibrate about fixed positions.", { size: "tiny" }),
  F.fig(180, 160, F.rect(20, 20, 140, 120, "m") + (() => { let s = ""; for (let row = 0; row < 4; row++) for (let i = 0; i < 6 - row % 2; i++) { if (row && rnd(row * 7 + i, 1) < .15) continue; s += F.circ(30 + i * 22.5 + (row % 2) * 11, 128 - row * 20, 10.5, "gS g"); } return s; })(), "<b>Liquid</b>: random, close together, slide past each other.", { size: "tiny" }),
  F.fig(180, 160, F.rect(20, 20, 140, 120, "m") + gasbox(20, 20, 140, 120, 6, 10, "o"), "<b>Gas</b>: random, far apart, move fast in all directions.", { size: "tiny" })
)}
<table class="t"><tr><th></th><th>Separation</th><th>Arrangement</th><th>Motion</th><th>Forces between particles</th></tr>
<tr><td>Solid</td><td>Very close</td><td>Regular</td><td>Vibrate about fixed positions</td><td>Strong</td></tr>
<tr><td>Liquid</td><td>Close</td><td>Random</td><td>Move around, slide past each other</td><td>Weaker, but still significant</td></tr>
<tr><td>Gas</td><td>Far apart</td><td>Random</td><td>Fast, in straight lines, in all directions</td><td>Very weak (negligible)</td></tr></table>
<div class="callout why"><b class="t">Linking to properties</b>Solids keep their shape because strong forces hold particles in fixed positions. Liquids flow because particles can slide past one another. Gases can be compressed because there is lots of space between the particles.</div>`},

    { h: "Changes of state (1.1)", body: C`
${(() => { let s = ""; [[30, "SOLID", "b"], [230, "LIQUID", "g"], [430, "GAS", "o"]].forEach(([x, n, c]) => { s += F.rect(x, 70, 120, 56, c + "S " + c, 12) + F.text(x + 60, 104, n, "t" + c + " bold"); });
  s += F.arrow(152, 86, 228, 86, "r mid", 9) + F.text(190, 76, "melting", "tr small bold") + F.arrow(228, 112, 152, 112, "b mid", 9) + F.text(190, 132, "freezing", "tb small bold");
  s += F.arrow(352, 86, 428, 86, "r mid", 9) + F.text(390, 50, "boiling or", "tr small bold") + F.text(390, 66, "evaporating", "tr small bold") + F.arrow(428, 112, 352, 112, "b mid", 9) + F.text(390, 132, "condensing", "tb small bold");
  s += F.text(290, 30, "particles gain energy →", "tr small") + F.text(290, 170, "← particles lose energy", "tb small");
  return F.fig(580, 185, s, "", { size: "wide" }); })()}
<ul><li><b>Melting</b>: solid → liquid at the melting point. Particles gain enough energy to overcome some of the forces holding them in fixed positions.</li>
<li><b>Freezing</b>: liquid → solid at the same temperature (the freezing point equals the melting point).</li>
<li><b>Boiling</b>: liquid → gas at the boiling point; happens throughout the liquid and bubbles form.</li>
<li><b>Evaporating</b>: liquid → gas at the <b>surface</b>, at any temperature below the boiling point.</li>
<li><b>Condensing</b>: gas → liquid when cooled.</li></ul>
<div class="callout exam"><b class="t">Particle explanation of melting</b>"As the solid is heated, the particles gain kinetic energy and vibrate more. At the melting point they have enough energy to overcome the forces of attraction holding them in fixed positions, so they can move past each other."</div>`},

    { h: "Heating and cooling curves (1.1)", body: C`
<p class="lead">A <b>heating curve</b> plots temperature against time as a substance is heated steadily.</p>
<div class="viz" data-viz="heatingCurve"></div>
${F.plot({ w: 520, h: 300, x: [0, 12], y: [-30, 130], grid: false, ticks: { x: [], y: [-20, 0, 50, 100] }, xlabel: "time", ylabel: "temperature / °C",
  curves: [{ pts: [[0, -20], [1.5, 0], [4, 0], [7, 100], [11, 100], [12, 120]], c: "c thick" }],
  extra: (X, Y) => F.text(X(.6), Y(-10) - 12, "A", "tk bold") + F.text(X(2.75), Y(0) - 10, "B: melting", "tk small bold") + F.text(X(5.5), Y(50) - 10, "C", "tk bold", "end") + F.text(X(9), Y(100) - 10, "D: boiling", "tk small bold") + F.text(X(11.7), Y(110) - 10, "E", "tk bold"),
  cap: "Heating ice: A solid warms; B melts at 0 °C (temperature constant); C liquid warms; D boils at 100 °C (temperature constant); E steam warms." })}
<h3>Why the temperature stops rising</h3>
<p>During melting and boiling, the energy supplied is used to <b>overcome the forces of attraction</b> between particles, not to increase their kinetic energy. So the temperature stays constant until the change of state is complete. The boiling section is longer because separating particles completely into a gas needs much more energy.</p>
<h3>Cooling curves and purity</h3>
<p>A cooling curve has flat sections at the same temperatures, where the substance condenses or freezes; energy released by forces forming balances the energy lost to the surroundings.</p>
<div class="callout key"><b class="t">Pure vs impure</b>A <b>pure</b> substance melts and boils at <b>sharp, fixed</b> temperatures (flat sections). An <b>impure</b> substance melts over a <b>range</b> of temperatures, usually <b>lower</b> than the pure substance, and boils at a higher temperature. Salt lowers the melting point of ice; that's why roads are salted in winter.</div>`},

    { h: "Gas volume, temperature and pressure (1.1 S)", body: C`
<p class="lead">Gases are unusual: their volume changes a lot with temperature and pressure.</p>
<h3>Effect of temperature (constant pressure)</h3>
<p>Heating a gas gives its particles more kinetic energy. They move faster and hit the container walls harder and more often. If the pressure is kept constant (e.g. a balloon or a syringe with a free plunger), the gas <b>expands</b>: <b>volume increases</b> as temperature increases.</p>
<h3>Effect of pressure (constant temperature)</h3>
<p>Increasing the pressure pushes the particles <b>closer together</b>, so the <b>volume decreases</b>. This is possible because there are large spaces between gas particles.</p>
${F.row(
  (() => { let s = F.rect(20, 50, 130, 90, "k mid") + gasbox(20, 50, 130, 90, 7, 7, "b", 2) + F.rect(150, 40, 10, 110, "m mF") + F.line(160, 95, 220, 95, "k thick") + F.text(85, 165, "cold: small volume", "tb small bold");
    return F.fig(240, 180, s, "", { size: "tiny" }); })(),
  (() => { let s = F.rect(20, 50, 190, 90, "k mid") + gasbox(20, 50, 190, 90, 7, 7, "o", 2) + F.rect(210, 40, 10, 110, "m mF") + F.line(220, 95, 250, 95, "k thick") + F.text(115, 165, "hot: gas expands", "to small bold");
    return F.fig(260, 180, s, "", { size: "tiny" }); })()
)}
<p>Try changing temperature and volume in the interactive lab at the end of this lesson.</p>
<details class="check"><summary>Explain, using particles, why a syringe of gas can be compressed but a syringe of water cannot.</summary><div>Gas particles are far apart with large spaces between them, so they can be pushed closer together. In water the particles are already touching, so they can't be pushed significantly closer.</div></details>`},

    { h: "Diffusion (1.2)", body: C`
<p class="lead"><b>Diffusion</b> is the net movement of particles from a region of <b>higher concentration</b> to a region of <b>lower concentration</b>, as a result of their <b>random motion</b>. No stirring is needed.</p>
<div class="viz" data-viz="diffusion"></div>
<h3>Everyday examples</h3>
<ul><li>A smell (perfume, cooking) spreads across a room.</li>
<li>A crystal of purple potassium manganate(VII) in water: the colour slowly spreads through all the water.</li>
<li>Brown bromine gas spreads to fill a gas jar placed on top of it, even though bromine is denser than air.</li></ul>
${F.row(
  (() => { let s = F.path("M40,20 L40,170 Q40,180 50,180 L150,180 Q160,180 160,170 L160,20", "k") + F.rect(41, 60, 118, 119, "bS nostroke") + F.rect(92, 166, 16, 12, "r rF") + F.text(100, 200, "start", "tk small bold");
    return F.fig(200, 210, s, "Crystal just added.", { size: "tiny" }); })(),
  (() => { let s = F.path("M40,20 L40,170 Q40,180 50,180 L150,180 Q160,180 160,170 L160,20", "k") + F.rect(41, 60, 118, 119, "bS nostroke") + F.rect(41, 110, 118, 69, "rS nostroke") + F.circ(100, 170, 40, "rS nostroke") + F.text(100, 200, "after 1 hour", "tk small bold");
    return F.fig(200, 210, s, "Colour spreading.", { size: "tiny" }); })(),
  (() => { let s = F.path("M40,20 L40,170 Q40,180 50,180 L150,180 Q160,180 160,170 L160,20", "k") + F.rect(41, 60, 118, 119, "rS nostroke") + F.text(100, 200, "after 1 day", "tk small bold");
    return F.fig(200, 210, s, "Evenly purple.", { size: "tiny" }); })()
)}
<h3>Why diffusion is faster in gases</h3>
<p>Gas particles move much faster and have more space to move into than liquid particles, so gases diffuse quickly (seconds to minutes) while liquids diffuse slowly (hours). Diffusion is faster at <b>higher temperature</b>, because the particles move faster.</p>`},

    { h: "Diffusion and molecular mass (1.2 S)", body: C`
<p class="lead">At the same temperature, gases with a <b>lower relative molecular mass</b> diffuse <b>faster</b>, because their particles move faster on average.</p>
<div class="viz" data-viz="ammoniaTube"></div>
<ol class="steps-inline"><li>Cotton wool soaked in ammonia solution is placed in one end of a long glass tube, and cotton wool soaked in concentrated hydrochloric acid in the other end, at the same time.</li>
<li>Ammonia (NH₃) and hydrogen chloride (HCl) gases diffuse along the tube.</li>
<li>Where they meet, they react to form a <b>white ring</b> of ammonium chloride: $\text{NH}_3(\text{g})+\text{HCl}(\text{g})\rightarrow\text{NH}_4\text{Cl}(\text{s})$.</li>
<li>The ring forms <b>closer to the HCl end</b>, so the ammonia has travelled further in the same time.</li></ol>
<table class="t"><tr><th>Gas</th><th>$M_r$</th><th>Diffusion</th></tr><tr><td>NH₃</td><td>14 + 3 = 17</td><td>Faster</td></tr><tr><td>HCl</td><td>1 + 35.5 = 36.5</td><td>Slower</td></tr></table>
<div class="callout exam"><b class="t">Explaining it</b>"Ammonia has a lower relative molecular mass than hydrogen chloride, so its molecules move faster at the same temperature and it diffuses more quickly. It travels further along the tube before the gases meet."</div>
<details class="check"><summary>Which diffuses faster: hydrogen (H₂) or carbon dioxide (CO₂)? Why?</summary><div>Hydrogen: $M_r$ = 2 vs 44. Lighter molecules move faster at the same temperature.</div></details>`}
  ],
  worked: [
    { q: C`A substance melts at 80 °C. A student heats a sample and finds it melts gradually between 72 °C and 77 °C. What does this tell you?`,
      steps: [C`A pure substance melts at a sharp, fixed temperature.`, C`This sample melts over a range and below 80 °C.`, C`So it is impure: the impurities lower the melting point and make it melt over a range.`]},
    { q: C`S: Explain why a balloon left in a hot car gets bigger.`,
      steps: [C`The air inside is heated, so its particles gain kinetic energy and move faster.`, C`They collide with the inner surface of the balloon more often and with more force.`, C`The balloon stretches until the pressure balances: the volume of gas increases.`]}
  ],
  formulas: [["State at a temperature", "below m.p. solid; between m.p. and b.p. liquid; above b.p. gas"], ["Diffusion", "high → low concentration by random motion"], ["Rate of diffusion (S)", "lower Mr → faster"], ["Gas volume (S)", "↑ temperature → ↑ volume; ↑ pressure → ↓ volume"]],
  cards: [
    ["Properties of a solid", "Fixed shape, fixed volume, doesn't flow, very hard to compress."],
    ["Properties of a liquid", "Takes the container's shape, fixed volume, flows, very hard to compress."],
    ["Properties of a gas", "Fills container, no fixed volume, flows, easily compressed."],
    ["Particles in a solid", "Very close, regular arrangement, vibrate about fixed positions."],
    ["Particles in a liquid", "Close, random arrangement, slide past each other."],
    ["Particles in a gas", "Far apart, random, move quickly in all directions."],
    ["Name the change: gas → liquid", "Condensing."],
    ["Evaporation vs boiling", "Evaporation: surface, any temperature. Boiling: throughout, at the boiling point."],
    ["Why is temperature constant during melting?", "Energy is used to overcome forces of attraction between particles."],
    ["How does an impurity affect melting point?", "Lowers it and makes it melt over a range."],
    ["How can you tell a substance is pure?", "It has a sharp (fixed) melting and boiling point."],
    ["Define diffusion", "Net movement of particles from high to low concentration due to random motion."],
    ["Why do gases diffuse faster than liquids?", "Particles move faster and have more space."],
    ["Effect of temperature on diffusion", "Faster at higher temperature (particles move faster)."],
    ["NH₃/HCl tube: where does the ring form? (S)", "Nearer the HCl end, because NH₃ (lower Mr) diffuses faster."],
    ["Effect of Mr on diffusion rate (S)", "Lower relative molecular mass → faster diffusion."],
    ["Heating a gas at constant pressure (S)", "Volume increases: particles move faster and push outwards more."],
    ["Increasing pressure on a gas (S)", "Volume decreases: particles pushed closer together."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: C`Which state has a fixed volume but no fixed shape?`, opts: ["Solid", "Liquid", "Gas", "None"], ans: 1, why: C`Liquids.` },
    { type: "mcq", marks: 1, q: C`A substance has m.p. −39 °C and b.p. 357 °C. At 25 °C it is a`, opts: ["solid", "liquid", "gas", "plasma"], ans: 1, why: C`Between m.p. and b.p. (this is mercury).` },
    { type: "mcq", marks: 1, q: C`The change from gas to liquid is`, opts: ["boiling", "melting", "condensing", "freezing"], ans: 2, why: C`Condensing.` },
    { type: "mcq", marks: 1, q: C`Diffusion happens because particles`, opts: ["are attracted to each other", "move randomly", "are pushed by gravity", "react together"], ans: 1, why: C`Random motion causes net spreading.` },
    { type: "mcq", marks: 1, q: C`An impure solid compared with the pure substance`, opts: ["melts at a higher sharp temperature", "melts over a range, lower", "doesn't melt", "melts at the same temperature"], ans: 1, why: C`Impurities lower and broaden the melting point.` },
    { type: "mcq", marks: 1, q: C`S: Which gas diffuses fastest?`, opts: ["Cl₂ (Mr 71)", "CO₂ (Mr 44)", "CH₄ (Mr 16)", "O₂ (Mr 32)"], ans: 2, why: C`Lowest Mr.` },
    { type: "struct", marks: 3, q: C`Describe the arrangement, separation and motion of the particles in a gas.`,
      ms: C`<b>B1</b> random arrangement<br><b>B1</b> far apart<br><b>B1</b> moving quickly in all directions (in straight lines)` },
    { type: "struct", marks: 3, q: C`Use the kinetic particle theory to explain what happens when a liquid boils.`,
      ms: C`<b>B1</b> particles gain energy as the liquid is heated<br><b>B1</b> at the boiling point they have enough energy to overcome the forces of attraction<br><b>B1</b> they escape and move far apart as a gas (throughout the liquid, forming bubbles)` },
    { type: "struct", marks: 4, q: C`Sketch a heating curve for ice at −10 °C heated until it is steam at 110 °C. Label the melting and boiling stages and explain why the temperature is constant during them.`,
      ms: C`<b>B1</b> rising, flat at 0 °C, rising, flat at 100 °C, rising<br><b>B1</b> correct labels<br><b>B1</b> energy used to overcome forces between particles<br><b>B1</b> not to increase kinetic energy, so temperature constant` },
    { type: "struct", marks: 3, q: C`A crystal of potassium manganate(VII) is placed in a beaker of water. Describe and explain what is seen over several hours.`,
      ms: C`<b>B1</b> purple colour spreads through the water until evenly coloured<br><b>B1</b> particles move randomly<br><b>B1</b> net movement from high to low concentration (diffusion)` },
    { type: "struct", marks: 4, q: C`S: In the ammonia / hydrogen chloride tube experiment, the white ring forms 30 cm from the ammonia end of a 50 cm tube. Explain this result and name the white solid.`,
      ms: C`<b>B1</b> ammonium chloride<br><b>B1</b> ammonia travels further / ring nearer the HCl end<br><b>B1</b> ammonia has lower Mr (17 vs 36.5)<br><b>B1</b> so its molecules move faster and it diffuses faster` },
    { type: "struct", marks: 3, q: C`S: Explain, in terms of particles, why the volume of a gas decreases when the pressure on it is increased at constant temperature.`,
      ms: C`<b>B1</b> gas particles are far apart with large spaces<br><b>B1</b> increased pressure pushes them closer together<br><b>B1</b> so the gas occupies a smaller volume` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: C`Give two differences between the properties of a liquid and a gas.`, ms: C`<b>B1</b> liquid has fixed volume, gas does not<br><b>B1</b> gas easily compressed, liquid not` },
    { d: 1, type: "mcq", marks: 1, q: C`Which change happens only at the surface of a liquid?`, opts: ["Boiling", "Evaporation", "Melting", "Condensation"], ans: 1, why: C`Evaporation is a surface process.` },
    { d: 1, type: "struct", marks: 2, q: C`Name the processes: (a) liquid wax becoming solid, (b) water vapour forming droplets on a cold mirror.`, ms: C`<b>B1</b> (a) freezing / solidifying<br><b>B1</b> (b) condensing` },
    { d: 2, type: "struct", marks: 3, q: C`Explain why a smell of cooking spreads through a house faster on a hot day than on a cold day.`, ms: C`<b>B1</b> diffusion of gas particles<br><b>B1</b> particles move faster at higher temperature<br><b>B1</b> so they diffuse (spread) faster` },
    { d: 2, type: "struct", marks: 3, q: C`Paraffin wax is heated and its temperature recorded every minute. The temperature rises to 54 °C, stays at 54 °C for 4 minutes, then rises again. (a) What is happening at 54 °C? (b) Is the wax pure? Explain.`, ms: C`<b>(a) B1</b> melting<br><b>(b) B1</b> yes / likely pure<br><b>B1</b> it melts at a single fixed temperature (sharp melting point)` },
    { d: 2, type: "mcq", marks: 1, q: C`S: Bromine vapour (Mr 160) and chlorine (Mr 71) are released at the same time. Which statement is correct?`, opts: ["Bromine diffuses faster", "Chlorine diffuses faster", "They diffuse at the same rate", "Neither diffuses"], ans: 1, why: C`Lower Mr diffuses faster.` },
    { d: 3, type: "struct", marks: 5, q: C`Use the kinetic particle theory to explain the shape of a cooling curve for a pure liquid that is cooled until it is solid, including why the temperature stays constant during freezing.`, ms: C`<b>B1</b> temperature falls as the liquid loses energy (particles slow down)<br><b>B1</b> flat section at the freezing point<br><b>B1</b> particles form forces of attraction / arrange into fixed positions<br><b>B1</b> this releases energy, balancing the energy lost to the surroundings<br><b>B1</b> after all has solidified temperature falls again` },
    { d: 3, type: "struct", marks: 4, q: C`S: Predict where the ring would form if the ammonia/hydrogen chloride experiment were repeated with hydrogen bromide (HBr, Mr 81) instead of HCl. Explain, and state one way to make the ring form more quickly.`, ms: C`<b>B1</b> even nearer the HBr end<br><b>B1</b> HBr has larger Mr than HCl so diffuses more slowly; difference in speeds greater<br><b>B1</b> NH₃ travels a larger fraction of the tube<br><b>B1</b> warm the tube / use a shorter tube` }
  ]
});
}
