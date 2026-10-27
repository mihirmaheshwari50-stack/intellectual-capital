window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
const flame = (x, y) => F.path(`M${x},${y} Q${x - 12},${y - 18} ${x},${y - 38} Q${x + 12},${y - 18} ${x},${y} Z`, "o oS o") + F.path(`M${x},${y} Q${x - 5},${y - 10} ${x},${y - 20} Q${x + 5},${y - 10} ${x},${y} Z`, "r rS r");
const thermo = (x, y, h, fill, c = "r") => F.rect(x - 5, y, 10, h, "k bgF", 5) + F.circ(x, y + h + 6, 9, c + "F") + F.rect(x - 2.5, y + h - fill, 5, fill + 4, c + "F nostroke");
//@@HELPERS-END

/* ============================================================
   THERMAL PROPERTIES & TEMPERATURE  (0625: 2.2)
   ============================================================ */
TOPICS.push({
  id: "thermal", subject: "physics", unit: 2, title: "Thermal properties & temperature",
  blurb: "Thermal expansion and its uses, internal energy, specific heat capacity and how to measure it, melting, boiling and evaporation.",
  level: "Core → Supplement", demo: "shc",
  syllabus: [
    ["2.2.1", "Describe qualitatively the thermal expansion of solids, liquids and gases at constant pressure", 0],
    ["2.2.1 S", "Explain, using particles, why gases expand most, then liquids, then solids", 1],
    ["2.2.1", "Describe everyday applications and consequences of thermal expansion", 2],
    ["2.2.2", "A rise in the temperature of an object increases its internal energy", 3],
    ["2.2.2 S", "A temperature rise means an increase in the average kinetic energy of the particles", 3],
    ["2.2.2 S", "Define specific heat capacity; recall and use c = ΔE / (mΔθ)", 4],
    ["2.2.2 S", "Describe experiments to measure the specific heat capacity of a solid and a liquid", 6],
    ["2.2.3", "Describe melting and boiling as energy input without a change in temperature; know the melting and boiling points of water", 7],
    ["2.2.3", "Describe condensation and solidification in terms of particles", 7],
    ["2.2.3", "Describe evaporation as the escape of more-energetic particles from the surface; evaporation causes cooling", 8],
    ["2.2.3 S", "Describe the differences between boiling and evaporation", 8],
    ["2.2.3 S", "Describe how temperature, surface area and air movement affect evaporation; explain cooling of an object in contact with an evaporating liquid", 8]
  ],
  sections: [
    { h: "Thermal expansion (2.2.1)", body: P`
<p class="lead">Almost everything <b>expands</b> when heated and <b>contracts</b> when cooled. The <b>mass</b> stays the same; the <b>volume</b> increases, so the <b>density decreases</b>.</p>
${F.row(
  (() => { let s = F.circ(80, 75, 22, "k thick") + F.circ(80, 75, 14, "b bS b") + F.line(102, 75, 140, 75, "k thick") + F.text(80, 125, "cold: ball fits", "tb small bold") + F.text(80, 141, "through the ring", "tb small bold");
    s += F.circ(240, 75, 22, "k thick") + F.circ(240, 75, 27, "r rS r") + F.line(267, 75, 300, 75, "k thick") + F.text(240, 125, "heated: ball", "tr small bold") + F.text(240, 141, "too big to pass", "tr small bold") + flame(240, 190);
    return F.fig(330, 195, s, "<b>Solid</b>: ball and ring. Heated, the ball no longer fits through the ring."); })(),
  (() => { let s = F.path("M40,190 L40,110 Q40,90 60,85 L60,30 L80,30 L80,85 Q100,90 100,110 L100,190 Z", "k") + F.rect(41, 100, 58, 89, "bS nostroke") + F.rect(66, 70, 8, 30, "bS nostroke") + F.line(66, 70, 74, 70, "b mid");
    s += F.path("M180,190 L180,110 Q180,90 200,85 L200,30 L220,30 L220,85 Q240,90 240,110 L240,190 Z", "k") + F.rect(181, 100, 58, 89, "bS nostroke") + F.rect(206, 44, 8, 56, "bS nostroke") + F.line(206, 44, 214, 44, "b mid") + F.arrow(230, 70, 230, 50, "r mid", 7);
    s += F.text(70, 210, "cold", "tb small bold") + F.text(210, 210, "warm: liquid rises", "tr small bold");
    return F.fig(290, 220, s, "<b>Liquid</b>: coloured water rises up a narrow tube when the flask is warmed."); })()
)}
${(() => { let s = F.path("M60,120 Q60,60 110,60 Q160,60 160,120 Z", "k") + F.path("M90,60 L90,30 Q110,8 130,30 L130,60", "b") + F.text(110, 145, "cold flask: balloon limp", "tb small bold");
    s += F.path("M240,120 Q240,60 290,60 Q340,60 340,120 Z", "k") + F.circ(290, 25, 30, "r rS r") + F.text(290, 145, "warm hands: balloon inflates", "tr small bold");
    return F.fig(400, 160, s, "<b>Gas</b>: air in a flask expands so much that warm hands alone inflate a balloon on top.", { size: "small" }); })()}
<p>For the same temperature rise, <b>gases expand far more than liquids, and liquids more than solids</b>. A 1 m steel rail heated by 50 °C grows by only about 0.6 mm; the same volume of air would expand by about 18%.</p>
<details class="check"><summary>When a metal block is heated, what happens to its mass, volume and density?</summary><div>Mass unchanged; volume increases; density decreases (same mass, bigger volume).</div></details>`},

    { h: "Why expansion happens, and why gases expand most (2.2.1 S)", body: P`
<p class="lead">Heating gives particles more kinetic energy. They move (or vibrate) more vigorously and push each other slightly <b>further apart</b>. The particles themselves do <b>not</b> get bigger.</p>
${(() => { let s = ""; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) s += F.circ(30 + i * 22, 40 + j * 22, 10, "b bS b"); s += F.text(63, 120, "cold: small vibrations", "tb small bold");
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const x = 170 + i * 28, y = 34 + j * 28; s += F.circ(x, y, 10, "r rS r") + F.path(`M${x - 15},${y} L${x + 15},${y}`, "r thin d"); } s += F.text(212, 120, "hot: larger vibrations,", "tr small bold") + F.text(212, 134, "particles further apart", "tr small bold");
    return F.fig(300, 145, s, "Same particles, same size, larger average spacing.", { size: "small" }); })()}
<table class="t"><tr><th>State</th><th>Forces between particles</th><th>Expansion for the same temperature rise</th></tr>
<tr><td>Solid</td><td>Very strong: hold particles tightly in place</td><td>Smallest</td></tr>
<tr><td>Liquid</td><td>Strong, but particles can move around</td><td>Larger (roughly 10× a solid)</td></tr>
<tr><td>Gas</td><td>Negligible: nothing holds the particles together</td><td>Largest (roughly 100× a liquid at constant pressure)</td></tr></table>
<div class="callout exam"><b class="t">The S explanation</b>"In a solid the strong forces between particles restrict how far apart they can move when they gain energy. In a liquid the forces are weaker so the particles can separate more. In a gas the forces are negligible, so the extra kinetic energy makes the particles spread out much more."</div>
<details class="check"><summary>A student says "the particles expand when heated". Correct this statement.</summary><div>The particles stay the same size; they move faster (vibrate more) and so take up more space, increasing the average separation between them.</div></details>`},

    { h: "Expansion in everyday life (2.2.1)", body: P`
<p class="lead">Engineers design around expansion (it can buckle rails and crack glass) and also put it to work.</p>
<h3>Problems to avoid</h3>
${F.row(
  (() => { let s = F.rect(20, 60, 140, 16, "m mS") + F.rect(170, 60, 140, 16, "m mS") + F.dim(160, 40, 170, 40, "", "r") + F.text(165, 30, "gap", "tr small bold") + F.text(165, 105, "gaps let rails expand in summer", "tk small");
    return F.fig(330, 120, s, "Railway lines have expansion gaps (or are pre-stretched) so they don't buckle on hot days."); })(),
  (() => { let s = F.line(20, 40, 310, 40, "m") + F.path("M20,40 Q165,70 310,40", "b mid") + F.path("M20,40 Q165,110 310,40", "r mid") + F.text(165, 28, "winter: nearly straight", "tb small bold") + F.text(165, 98, "summer: sags", "tr small bold") + F.rect(14, 30, 10, 100, "k mS") + F.rect(306, 30, 10, 100, "k mS");
    return F.fig(330, 140, s, "Overhead power cables are hung slack so they don't snap when they contract in winter."); })()
)}
${F.row(
  (() => { let s = F.rect(20, 60, 140, 30, "k mS") + F.rect(170, 60, 140, 30, "k mS") + F.path("M150,90 L160,90 L165,100 L170,90 L180,90", "k") + F.text(165, 130, "bridge expansion joint", "tk small bold") + F.circ(60, 98, 8, "k") + F.circ(260, 98, 8, "k") + F.text(260, 124, "rollers", "tk small");
    return F.fig(330, 145, s, "Bridges have expansion joints and sit on rollers so they can lengthen freely."); })(),
  (() => { let s = F.path("M60,30 L60,130 Q60,140 70,140 L130,140 Q140,140 140,130 L140,30", "r") + F.text(100, 115, "thick glass", "tk small") + F.text(100, 130, "+ boiling water", "tk small") + F.path("M90,40 L100,70 L92,90", "r mid") + F.text(240, 70, "inside expands before", "tk small") + F.text(240, 86, "outside → strain → cracks", "tk small");
    return F.fig(330, 155, s, "Thick glass can crack when hot water is poured in. Pyrex expands very little, so it doesn't."); })()
)}
<h3>Using expansion</h3>
${F.row(
  (() => { let s = F.rect(40, 50, 220, 14, "o oS o") + F.rect(40, 64, 220, 14, "b bS b") + F.text(270, 61, "brass (expands more)", "to small", "start") + F.text(270, 78, "invar/iron (expands less)", "tb small", "start");
    s += F.path("M40,130 Q160,150 250,190", "o thick") + F.path("M40,142 Q156,160 242,198", "b thick") + F.text(150, 120, "heated: bends towards the side that expands less", "tk small bold");
    return F.fig(450, 210, s, "<b>Bimetallic strip</b>: two metals bonded together. Heated, it bends, which can open a switch: used in thermostats, fire alarms, and kettles.", { size: "small" }); })()
)}
<ul><li><b>Liquid-in-glass thermometer</b>: mercury or coloured alcohol expands up a narrow tube, so a small volume change gives a large movement.</li>
<li><b>Shrink-fitting</b>: a metal tyre is heated so it expands, slipped onto a wheel, then cooled so it contracts and grips tightly.</li>
<li><b>Hot-air balloons</b>: heated air expands, becomes less dense, and rises.</li>
<li><b>Opening a stuck jar lid</b>: run hot water over the metal lid; it expands more than the glass and loosens.</li></ul>
<div class="callout why"><b class="t">Water is odd</b>Between 0 °C and 4 °C water contracts as it warms, and ice is less dense than water. So ponds freeze from the top down and fish survive underneath. Pipes burst in winter because water expands on freezing.</div>
<details class="check"><summary>Explain why telephone wires are hung slack in summer.</summary><div>In winter they cool and contract. If they were tight in summer, the contraction could snap them or pull the poles over.</div></details>`},

    { h: "Internal energy and temperature (2.2.2)", body: P`
<p class="lead">The <b>internal energy</b> of an object is the total energy of all its particles: their kinetic energy (movement) plus their potential energy (from the forces between them).</p>
<ul><li>Heating an object <b>increases its internal energy</b>. Usually its temperature rises.</li>
<li>(S) A rise in temperature means an increase in the <b>average kinetic energy of the particles</b>: they move or vibrate faster.</li></ul>
<div class="callout warn"><b class="t">Temperature is not the same as internal energy</b>A bath of warm water at 40 °C has far more internal energy than a cup of boiling water at 100 °C: it has many more particles, even though each has less kinetic energy on average. Temperature is about the <i>average</i> energy per particle; internal energy is the <i>total</i>.</div>
${(() => { let s = F.rect(20, 50, 200, 100, "o oS o", 10) + F.text(120, 95, "bath, 40 °C", "to bold") + F.text(120, 115, "huge internal energy", "tk small") + F.rect(300, 80, 60, 60, "r rS r", 6) + F.text(330, 70, "cup, 100 °C", "tr bold") + F.text(330, 160, "higher temperature,", "tk small") + F.text(330, 175, "less internal energy", "tk small");
  return F.fig(420, 190, s, "", { size: "small" }); })()}
<details class="check"><summary>Two blocks of the same metal, one 1 kg and one 2 kg, are both at 50 °C. Which has more internal energy? Which has higher average particle kinetic energy?</summary><div>The 2 kg block has more internal energy (twice as many particles). The average kinetic energy is the same (same temperature).</div></details>`},

    { h: "Specific heat capacity (2.2.2 S)", body: P`
<p class="lead">Some materials heat up quickly; others need much more energy for the same temperature rise. <b>Specific heat capacity</b> measures this.</p>
<div class="callout key"><b class="t">Definition</b>The <b>specific heat capacity</b> $c$ of a substance is the energy required per unit mass per unit temperature increase: the energy needed to raise the temperature of 1 kg by 1 °C.</div>
$$c=\frac{\Delta E}{m\Delta\theta}\qquad\Delta E=mc\Delta\theta$$
<p>$\Delta E$ in J, $m$ in kg, $\Delta\theta$ = temperature change in °C (or K), $c$ in <b>J/(kg °C)</b>.</p>
<table class="t"><tr><th>Material</th><th>c / J/(kg °C)</th><th>What it means</th></tr>
<tr><td>Water</td><td>4200</td><td>Very high: heats and cools slowly</td></tr><tr><td>Ice</td><td>2100</td><td></td></tr><tr><td>Olive oil</td><td>2000</td><td>Heats twice as fast as water</td></tr><tr><td>Aluminium</td><td>900</td><td></td></tr><tr><td>Concrete</td><td>880</td><td></td></tr><tr><td>Iron</td><td>450</td><td></td></tr><tr><td>Copper</td><td>390</td><td>Heats up quickly</td></tr><tr><td>Lead</td><td>130</td><td>Very low</td></tr></table>
<h3>Why water's high value matters</h3>
<ul><li>Water is used in central-heating systems and car radiators: it carries a lot of energy per kg per degree.</li>
<li>Coastal places have milder climates: the sea warms and cools slowly.</li>
<li>A hot-water bottle stays warm for hours.</li></ul>
<details class="check"><summary>Why does a sandy beach feel much hotter than the sea on a sunny afternoon?</summary><div>Sand has a much lower specific heat capacity than water, so the same energy from the Sun raises its temperature much more.</div></details>`},

    { h: "Specific heat capacity calculations (2.2.2 S)", body: P`
<p class="lead">Most questions are one rearrangement of $\Delta E=mc\Delta\theta$, often combined with $E=Pt$ for an electric heater.</p>
<h3>Example 1: energy needed</h3>
<p>How much energy heats 2.5 kg of water from 20 °C to 100 °C?</p>
$$\Delta E=mc\Delta\theta=2.5\times4200\times80=840\,000\ \text{J}=840\ \text{kJ}$$
<h3>Example 2: temperature rise from a heater</h3>
<p>A 50 W heater runs for 5 minutes in a 1.2 kg aluminium block (c = 900 J/(kg °C)). Find the temperature rise.</p>
$$\Delta E=Pt=50\times300=15\,000\ \text{J}\qquad\Delta\theta=\frac{\Delta E}{mc}=\frac{15\,000}{1.2\times900}=13.9\ ^\circ\text{C}$$
<h3>Example 3: finding c</h3>
<p>8400 J raises 0.50 kg of a liquid by 8.0 °C.</p>
$$c=\frac{8400}{0.50\times8.0}=2100\ \text{J/(kg °C)}$$
<div class="callout exam"><b class="t">Traps</b><ul><li>Use the temperature <b>change</b>, not the final temperature.</li><li>Mass in kg: 250 g = 0.25 kg.</li><li>Time in seconds for $E=Pt$.</li><li>The answer is usually an underestimate of the real energy needed, since some energy heats the container and surroundings.</li></ul></div>
<details class="check"><summary>A 2.0 kW kettle heats 1.5 kg of water from 15 °C to 100 °C. How long does it take (ignore losses)?</summary><div>$\Delta E=1.5\times4200\times85=535\,500$ J; $t=\Delta E/P=535\,500/2000=268$ s ≈ 4.5 minutes.</div></details>`},

    { h: "Measuring specific heat capacity (2.2.2 S)", body: P`
<p class="lead">The method is the same for a solid and a liquid: supply a measured amount of electrical energy and measure the temperature rise of a known mass.</p>
${(() => { let s = F.rect(70, 60, 140, 120, "m mS", 6) + F.text(140, 212, "1.0 kg aluminium block", "tk small bold");
  s += F.rect(110, 30, 16, 110, "r rS r", 4) + F.text(104, 42, "heater", "tr small bold", "end") + thermo(170, 20, 100, 60) + F.text(182, 38, "thermometer", "tk small", "start");
  s += F.rect(60, 50, 160, 140, "k d", 10) + F.text(230, 186, "insulation", "tk small", "start");
  s += F.rect(330, 50, 160, 110, "k bgF", 8) + F.text(410, 76, "joulemeter", "tk small bold") + F.text(410, 100, "or ammeter +", "tk small") + F.text(410, 116, "voltmeter + stopwatch", "tk small") + F.text(410, 140, "E = VIt", "tc bold");
  s += F.poly([[118, 30], [118, 4], [330, 4], [330, 80]], "k thin") + F.poly([[126, 30], [126, 10], [320, 10], [320, 130], [330, 130]], "k thin");
  return F.fig(520, 225, s, "Measuring c for a solid. For a liquid, put a known mass of it in an insulated beaker with the heater and thermometer, and stir.", { size: "wide" }); })()}
<ol class="steps-inline"><li>Measure the <b>mass</b> of the block (or liquid) on a balance.</li>
<li>Insert the heater and thermometer (a drop of oil in the thermometer hole improves thermal contact). Wrap the block in <b>insulation</b>.</li>
<li>Record the starting temperature. Switch on and start the stopwatch.</li>
<li>Record the voltage $V$ and current $I$ (or the joulemeter readings). For a liquid, stir continuously.</li>
<li>After about 10 minutes switch off. Record the <b>highest</b> temperature reached (it keeps rising briefly as energy spreads through the block).</li>
<li>Calculate: $E=VIt$, $\Delta\theta=\theta_\text{final}-\theta_\text{start}$, $c=\dfrac{E}{m\Delta\theta}$.</li></ol>
<div class="callout exam"><b class="t">Why is the answer usually too high?</b>Energy is lost to the surroundings and used to heat the heater and thermometer, so not all $E$ goes into the block. The measured $\Delta\theta$ is smaller than it should be, so $c=E/(m\Delta\theta)$ comes out <b>larger</b> than the true value. Improve it with better insulation, a lid (for liquids), and by starting a few degrees below room temperature and finishing the same amount above.</div>
<details class="check"><summary>A 12 V heater draws 4.0 A for 300 s and warms a 1.0 kg block by 16 °C. Find c.</summary><div>$E=12\times4.0\times300=14\,400$ J; $c=14\,400/(1.0\times16)=900$ J/(kg °C): aluminium.</div></details>`},

    { h: "Melting and boiling (2.2.3)", body: P`
<p class="lead">When a pure substance melts or boils, energy is still being supplied but the <b>temperature stays constant</b> until the change of state is complete.</p>
<div class="viz" data-viz="heatingCurve"></div>
<p>Where does the energy go? It is used to <b>overcome the forces of attraction</b> between particles (increasing their potential energy), not to make them move faster. So the average kinetic energy, and therefore the temperature, does not change.</p>
<table class="t"><tr><th>At standard atmospheric pressure</th><th>Water</th></tr><tr><td>Melting point (ice ↔ water)</td><td><b>0 °C</b></td></tr><tr><td>Boiling point (water ↔ steam)</td><td><b>100 °C</b></td></tr></table>
<h3>Condensation and solidification</h3>
<p>Run the process backwards. When a gas <b>condenses</b>, its particles slow down and come close enough for attractive forces to pull them together into a liquid; this <b>releases</b> energy to the surroundings. When a liquid <b>solidifies</b> (freezes), the particles lose energy and settle into fixed positions in a regular arrangement, again releasing energy. A cooling curve shows flat sections at the same temperatures as the heating curve.</p>
${F.plot({ w: 470, h: 270, x: [0, 12], y: [0, 100], grid: false, ticks: { x: [], y: [20, 40, 60, 80] }, xlabel: "time", ylabel: "temperature / °C",
  curves: [{ pts: [[0, 90], [1, 81], [2, 74], [3, 69], [3.5, 66], [4, 64], [5, 63], [6, 63], [7, 63], [8, 63], [8.5, 61], [9.5, 52], [10.5, 45], [12, 37]], c: "c thick" }],
  extra: (X, Y) => F.text(X(6), Y(63) - 12, "freezing: temperature constant", "tc small bold") + F.line(X(0), Y(63), X(4), Y(63), "m d thin") + F.text(X(.2), Y(63) - 6, "63 °C", "tm small", "start"),
  cap: "Cooling curve for a liquid wax: the flat section shows the freezing (melting) point, 63 °C. Energy released by bonds forming balances the energy lost to the surroundings." })}
<details class="check"><summary>Ice at −10 °C is heated steadily until it becomes steam at 110 °C. Describe the shape of the temperature–time graph.</summary><div>Rises to 0 °C; flat while melting; rises from 0 to 100 °C; flat (longer) while boiling; rises again as steam.</div></details>`},

    { h: "Evaporation and cooling (2.2.3)", body: P`
<p class="lead">In a liquid, particles have a range of speeds. Near the surface, the <b>most energetic</b> particles can overcome the attraction of their neighbours and <b>escape</b>. That is evaporation.</p>
<div class="viz" data-viz="evaporation"></div>
<h3>Why evaporation cools</h3>
<p>The particles that escape are the fastest ones. Those left behind have a <b>lower average kinetic energy</b>, so the liquid's <b>temperature falls</b>. That is why sweating cools you and why a wet swimsuit feels cold in the wind.</p>
<h3>Cooling an object in contact with an evaporating liquid (S)</h3>
<p>As the liquid cools below the temperature of the object it touches (your skin, a beaker), energy flows from the object to the liquid by heating. That energy is then carried away by more evaporating particles. So the <b>object</b> cools too. Spirit (ethanol) on the back of your hand feels very cold because it evaporates quickly.</p>
<h3>What speeds up evaporation? (S)</h3>
<table class="t"><tr><th>Factor</th><th>Effect</th><th>Why</th></tr>
<tr><td>Higher temperature</td><td>Faster</td><td>More particles have enough energy to escape</td></tr>
<tr><td>Larger surface area</td><td>Faster</td><td>More particles are at the surface, able to escape</td></tr>
<tr><td>Air movement (wind, draught)</td><td>Faster</td><td>Escaped particles are blown away before they can fall back into the liquid</td></tr></table>
<h3>Boiling vs evaporation (S)</h3>
<table class="t"><tr><th></th><th>Evaporation</th><th>Boiling</th></tr>
<tr><td>Temperature</td><td>Any temperature</td><td>Only at the boiling point</td></tr><tr><td>Where</td><td>Only at the surface</td><td>Throughout the liquid (bubbles form inside)</td></tr><tr><td>Effect on liquid's temperature</td><td>Cools it</td><td>Stays at the boiling point while energy is supplied</td></tr><tr><td>Energy source</td><td>From the liquid itself or surroundings</td><td>From an external heater</td></tr></table>
<details class="check"><summary>Why do wet clothes dry faster on a warm, windy day spread out on a line than folded in a basket?</summary><div>Warm: more particles have enough energy to escape. Windy: escaped water molecules are carried away. Spread out: larger surface area.</div></details>`}
  ],
  worked: [
    { q: P`S: A 3.0 kW electric shower heats water flowing at 0.040 kg/s. Find the temperature rise of the water. (c = 4200 J/(kg °C))`,
      steps: [P`Each second: $\Delta E=3000$ J and $m=0.040$ kg.`, P`$\Delta\theta=\dfrac{\Delta E}{mc}=\dfrac{3000}{0.040\times4200}$`, P`$=17.9$ °C (about 18 °C).`]},
    { q: P`S: In an experiment, a 0.80 kg block of metal is heated by a 40 W heater for 6.0 minutes. Its temperature rises from 21 °C to 61 °C. Calculate c and suggest why the true value is lower.`,
      steps: [P`$E=Pt=40\times360=14\,400$ J. $\Delta\theta=40$ °C.`, P`$c=14\,400/(0.80\times40)=450$ J/(kg °C).`, P`Some energy was lost to the surroundings, so the block received less than 14 400 J. Using the full 14 400 J overestimates c.`]},
    { q: P`Explain, in terms of particles, why a puddle disappears on a sunny day even though the water never reaches 100 °C.`,
      steps: [P`Water molecules have a range of kinetic energies.`, P`At the surface, the most energetic ones can overcome the attractive forces of the others and escape into the air: evaporation.`, P`This happens at any temperature, and the Sun's energy keeps replacing the lost energy, so evaporation continues until the puddle is gone.`]}
  ],
  formulas: [["Specific heat capacity (S)", P`$c=\dfrac{\Delta E}{m\Delta\theta}$`], ["Energy for a temperature change (S)", P`$\Delta E=mc\Delta\theta$`], ["Electrical energy", P`$E=Pt=VIt$`], ["Water", "melts at 0 °C, boils at 100 °C; c = 4200 J/(kg °C)"]],
  cards: [
    ["What happens to particles when a solid expands?", "They vibrate more and move further apart; they do not get bigger."],
    ["Order of expansion (largest first)", "Gas > liquid > solid."],
    ["Why do gases expand most? (S)", "Negligible forces between particles, so nothing restricts them from moving apart."],
    ["Why do railways have gaps?", "So rails can expand on hot days without buckling."],
    ["What is a bimetallic strip?", "Two metals bonded together that expand by different amounts, so it bends when heated (thermostats)."],
    ["Define internal energy", "The total kinetic and potential energy of all the particles in an object."],
    ["What does a temperature rise mean in terms of particles? (S)", "An increase in the average kinetic energy of the particles."],
    ["Define specific heat capacity (S)", "Energy required per unit mass per unit temperature increase."],
    ["Specific heat capacity equation (S)", "c = ΔE / (mΔθ)"],
    ["Unit of specific heat capacity", "J/(kg °C)"],
    ["c of water", "4200 J/(kg °C)"],
    ["Why measured c is usually too high (S)", "Energy is lost to the surroundings, so Δθ is smaller than it should be."],
    ["How to reduce errors in a c experiment (S)", "Insulate, use a lid, stir liquids, oil in the thermometer hole, record the highest temperature."],
    ["Why is temperature constant while melting?", "Energy is used to overcome attractive forces between particles, not to increase their kinetic energy."],
    ["Melting and boiling points of water", "0 °C and 100 °C (at standard atmospheric pressure)."],
    ["Define evaporation", "Escape of the more energetic particles from the surface of a liquid."],
    ["Why does evaporation cause cooling?", "The fastest particles leave, so the average kinetic energy (temperature) of the rest falls."],
    ["3 factors that increase evaporation (S)", "Higher temperature, larger surface area, more air movement."],
    ["Boiling vs evaporation (S)", "Boiling: at b.p., throughout. Evaporation: any temperature, surface only."],
    ["Bath at 40 °C vs cup at 100 °C: which has more internal energy?", "The bath: far more particles, although each has less average KE."],
    ["Why do coastal areas have milder climates?", "Water's high specific heat capacity: the sea warms and cools slowly."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`When a metal rod is heated, its`, opts: ["mass increases", "particles get bigger", "volume increases", "density increases"], ans: 2, why: P`Particles move further apart: volume up, density down, mass constant.` },
    { type: "mcq", marks: 1, q: P`For the same temperature rise, which expands most?`, opts: ["Steel", "Water", "Air", "Glass"], ans: 2, why: P`Gases expand most.` },
    { type: "mcq", marks: 1, q: P`During melting, the temperature of ice`, opts: ["rises steadily", "stays at 0 °C", "falls", "rises then falls"], ans: 1, why: P`Energy is used to break bonds, not raise the temperature.` },
    { type: "mcq", marks: 1, q: P`Evaporation causes cooling because`, opts: ["the slowest particles escape", "the fastest particles escape", "particles get smaller", "bonds form"], ans: 1, why: P`Losing the fastest particles lowers the average kinetic energy.` },
    { type: "mcq", marks: 1, q: P`S: The energy to raise 2 kg of water (c = 4200) by 5 °C is`, opts: ["840 J", "4200 J", "21 000 J", "42 000 J"], ans: 3, why: P`$2\times4200\times5=42\,000$ J.` },
    { type: "mcq", marks: 1, q: P`S: Which does NOT increase the rate of evaporation?`, opts: ["Higher temperature", "Larger surface area", "Wind", "Covering the liquid"], ans: 3, why: P`A cover traps escaped molecules so more return.` },
    { type: "mcq", marks: 1, q: P`A bimetallic strip bends when heated because`, opts: ["one metal melts", "the two metals expand by different amounts", "it becomes magnetic", "it loses mass"], ans: 1, why: P`Different expansion forces it to curve.` },
    { type: "mcq", marks: 1, q: P`S: Substance A has a higher specific heat capacity than B. With the same mass and same energy supplied,`, opts: ["A gets hotter", "B gets hotter", "Both rise equally", "Neither changes"], ans: 1, why: P`$\Delta\theta=E/(mc)$: smaller c, bigger rise.` },
    { type: "struct", marks: 3, q: P`Describe one experiment to show that a liquid expands when heated, and state what is observed.`,
      ms: P`<b>B1</b> flask full of coloured water with a narrow glass tube through the bung<br><b>B1</b> warm the flask (hands or hot water)<br><b>B1</b> the liquid level rises up the tube` },
    { type: "struct", marks: 3, q: P`S: Explain, in terms of particles, why a gas expands much more than a solid for the same temperature rise.`,
      ms: P`<b>B1</b> particles gain kinetic energy and move further apart in both<br><b>B1</b> in a solid strong forces between particles restrict separation<br><b>B1</b> in a gas forces are negligible so particles spread out much more` },
    { type: "struct", marks: 4, q: P`S: Describe an experiment to measure the specific heat capacity of water.`,
      ms: P`<b>B1</b> measure mass of water in an insulated beaker<br><b>B1</b> heat with an immersion heater; measure energy with joulemeter or V, I and t<br><b>B1</b> stir, measure initial and highest temperature<br><b>B1</b> $c=E/(m\Delta\theta)$` },
    { type: "struct", marks: 3, q: P`S: A 0.50 kg copper block (c = 390 J/(kg °C)) is heated from 20 °C to 220 °C. Calculate the energy supplied.`,
      ms: P`<b>C1</b> $\Delta\theta=200$ °C<br><b>C1</b> $0.50\times390\times200$<br><b>A1</b> 39 000 J` },
    { type: "struct", marks: 3, q: P`Explain why the temperature of water stays at 100 °C while it boils, even though the heater is still on.`,
      ms: P`<b>B1</b> energy supplied is used to overcome attractive forces between particles<br><b>B1</b> it increases potential energy, not kinetic energy<br><b>B1</b> average kinetic energy constant, so temperature constant` },
    { type: "struct", marks: 3, q: P`S: Explain why a person feels cold when they get out of a swimming pool on a windy day.`,
      ms: P`<b>B1</b> water on the skin evaporates; the most energetic molecules escape<br><b>B1</b> remaining water cools, so energy flows from skin to water<br><b>B1</b> wind removes the escaped molecules, increasing the rate of evaporation` },
    { type: "struct", marks: 2, q: P`Give one useful application and one problem caused by thermal expansion.`,
      ms: P`<b>B1</b> e.g. thermostat (bimetallic strip), thermometer, shrink-fitting<br><b>B1</b> e.g. buckling rails, bridges, cracking glass, sagging cables` },
    { type: "struct", marks: 2, q: P`State two differences between boiling and evaporation.`,
      ms: P`<b>B1</b> boiling at a fixed temperature; evaporation at any temperature<br><b>B1</b> boiling throughout the liquid; evaporation only at the surface` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: P`State the melting point and boiling point of pure water at standard atmospheric pressure.`, ms: P`<b>B1</b> 0 °C<br><b>B1</b> 100 °C` },
    { d: 1, type: "mcq", marks: 1, q: P`Which happens when a gas is heated at constant pressure?`, opts: ["It contracts", "It expands", "Its mass increases", "Its particles shrink"], ans: 1, why: P`Gases expand on heating.` },
    { d: 1, type: "struct", marks: 1, q: P`Explain why overhead power lines are hung loosely.`, ms: P`<b>B1</b> they contract in cold weather; slack prevents them snapping` },
    { d: 1, type: "struct", marks: 2, q: P`Name the change of state that releases energy when steam meets a cold window, and describe what happens to the particles.`, ms: P`<b>B1</b> condensation<br><b>B1</b> particles slow down and come close together, attracted into a liquid` },
    { d: 2, type: "struct", marks: 3, q: P`S: 63 000 J of energy raises the temperature of 1.5 kg of a liquid from 20 °C to 40 °C. Calculate the specific heat capacity.`, ms: P`<b>C1</b> $\Delta\theta=20$<br><b>C1</b> $63\,000/(1.5\times20)$<br><b>A1</b> 2100 J/(kg °C)` },
    { d: 2, type: "struct", marks: 3, q: P`A bimetallic strip of brass and iron is used in a fire alarm. Brass expands more than iron. Explain how it switches on the alarm when heated.`, ms: P`<b>B1</b> on heating, brass expands more than iron<br><b>B1</b> the strip bends (curves towards the iron side)<br><b>B1</b> it touches a contact, completing the circuit and sounding the alarm` },
    { d: 2, type: "mcq", marks: 1, q: P`S: A 100 W heater warms 2.0 kg of oil (c = 2000 J/(kg °C)). The time to raise the temperature by 10 °C is`, opts: ["40 s", "100 s", "400 s", "4000 s"], ans: 2, why: P`$E=2.0\times2000\times10=40\,000$ J; $t=40\,000/100=400$ s.` },
    { d: 2, type: "struct", marks: 3, q: P`A beaker of ether sits on a wet wooden block. As air is blown through the ether, the beaker freezes to the block. Explain.`, ms: P`<b>B1</b> blowing air increases rate of evaporation of ether<br><b>B1</b> ether cools as the most energetic molecules escape<br><b>B1</b> energy is drawn from the beaker and water beneath, which cools below 0 °C and freezes` },
    { d: 3, type: "struct", marks: 5, q: P`S: A student measures c for aluminium. Data: mass 1.00 kg; heater 12.0 V, 3.50 A, 600 s; temperature 18.5 °C → 44.0 °C. (a) Calculate the energy supplied. (b) Calculate c. (c) The accepted value is 900 J/(kg °C). Explain the difference and suggest two improvements.`, ms: P`<b>(a) A1</b> $12.0\times3.50\times600=25\,200$ J<br><b>(b) A1</b> $25\,200/(1.00\times25.5)=988$ J/(kg °C)<br><b>(c) B1</b> energy lost to surroundings / heating apparatus, so Δθ too small and c too high<br><b>B1</b> insulate the block<br><b>B1</b> oil in thermometer hole / record highest temperature after switching off` },
    { d: 3, type: "struct", marks: 5, q: P`A pupil heats crushed ice from −10 °C until it has all boiled away. (a) Sketch the temperature–time graph. (b) Explain why there are two flat sections. (c) Why is the second flat section longer than the first?`, ms: P`<b>(a) B1</b> rise to 0, flat, rise to 100, flat (longer), (rise)<br><b>(b) B1</b> energy goes into overcoming forces between particles during change of state<br><b>B1</b> kinetic energy (temperature) doesn't change<br><b>(c) B1</b> boiling needs much more energy than melting<br><b>B1</b> particles must be separated completely (all forces overcome) to form a gas` },
    { d: 3, type: "struct", marks: 4, q: P`S: Water has c = 4200 J/(kg °C) and sand 800 J/(kg °C). Explain why on a sunny day a breeze blows from the sea towards the land, using these values.`, ms: P`<b>B1</b> same energy from the Sun; sand has lower c so its temperature rises more<br><b>B1</b> air above the land warms, expands, becomes less dense and rises<br><b>B1</b> cooler, denser air from above the sea moves in to replace it<br><b>B1</b> giving a sea breeze (convection current)` }
  ]
});
}
