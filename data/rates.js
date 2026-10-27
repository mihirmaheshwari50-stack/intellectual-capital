window.TOPICS = window.TOPICS || [];
{
const C = String.raw, F = FIG;

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
}
