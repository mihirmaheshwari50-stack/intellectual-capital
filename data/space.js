window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
const sun = (x, y, r = 30) => F.circ(x, y, r, "o oS o") + F.text(x, y + 5, "Sun", "to small bold");
//@@HELPERS-END

/* ============================================================
   SPACE PHYSICS  (0625: 6.1, 6.2)
   ============================================================ */
TOPICS.push({
  id: "space", subject: "physics", unit: 6, title: "Space physics",
  blurb: "Day and night, seasons and the Moon, the Solar System and how it formed, orbits and gravity, stars and their life cycles, galaxies, redshift and the Big Bang.",
  level: "Core → Supplement", demo: "hubble",
  syllabus: [
    ["6.1.1", "The Earth rotates on its tilted axis about once every 24 hours: day and night, the Sun's apparent daily motion", 0],
    ["6.1.1", "The Earth orbits the Sun in about 365 days: the seasons", 1],
    ["6.1.1 S", "Explain the Sun's apparent daily motion and the seasons in terms of the tilt of the Earth's axis", 1],
    ["6.1.1", "The Moon orbits the Earth in about one month: the cycle of phases", 2],
    ["6.1.1", "Define and use average orbital speed v = 2πr / T", 3],
    ["6.1.2", "The Solar System: the Sun, eight planets in order, minor planets (dwarf planets, asteroids), moons, comets", 4],
    ["6.1.2", "Inner planets small and rocky, outer planets large and gaseous; explained by the accretion model of formation", 5],
    ["6.1.2", "Gravitational field strength at a planet's surface depends on its mass; it decreases with distance from the planet", 6],
    ["6.1.2", "The Sun contains most of the Solar System's mass; its gravitational attraction keeps the planets in orbit", 6],
    ["6.1.2", "Calculate the time for light to travel across the Solar System", 3],
    ["6.1.2 S", "Planets, minor planets and comets have elliptical orbits with the Sun at a focus; faster when closer (conservation of energy)", 7],
    ["6.1.2 S", "The Sun's field and the planets' orbital speeds decrease with distance; analyse planetary data", 7],
    ["6.2.1", "The Sun is a medium-sized star, mostly hydrogen and helium, radiating mainly infrared, visible and ultraviolet", 8],
    ["6.2.1 S", "Stars are powered by nuclear fusion of hydrogen into helium", 8],
    ["6.2.2", "Galaxies contain billions of stars; the Sun is in the Milky Way; distances in light-years", 9],
    ["6.2.2 S", "One light-year = 9.5 × 10¹⁵ m; the life cycle of stars", 10],
    ["6.2.3", "The Milky Way is one of billions of galaxies, about 100 000 light-years across", 11],
    ["6.2.3", "Redshift of light from distant galaxies is evidence that the Universe is expanding and supports the Big Bang theory", 11],
    ["6.2.3 S", "Cosmic microwave background radiation (CMBR) and what it shows", 12],
    ["6.2.3 S", "Hubble constant H₀ = v/d ≈ 2.2 × 10⁻¹⁸ /s; d/v = 1/H₀ estimates the age of the Universe", 12]
  ],
  sections: [
    { h: "Day and night (6.1.1)", body: P`
<p class="lead">The Earth <b>spins on its axis</b> once roughly every <b>24 hours</b>. The half facing the Sun has day; the half facing away has night.</p>
${(() => { let s = F.rect(10, 20, 60, 200, "o oS nostroke") + F.text(40, 124, "Sun", "to bold"); for (let i = 0; i < 6; i++) s += F.arrow(76, 40 + i * 32, 170, 40 + i * 32, "o thin", 7);
  s += F.circ(280, 120, 80, "b bS b") + F.path("M280,40 A80,80 0 0 1 280,200 Z", "k kS nostroke") + F.text(240, 124, "day", "tb bold") + F.text(320, 124, "night", "tk bold");
  s += F.line(290, 20, 270, 220, "k mid d") + F.text(298, 30, "axis (tilted 23.5°)", "tk small", "start") + F.path("M220,60 A80,30 0 0 0 340,60", "c mid") + F.arrow(332, 64, 340, 60, "c", 8) + F.text(350, 70, "spins west → east", "tc small bold", "start");
  return F.fig(520, 235, s, "The Earth spins from west to east, so the Sun appears to rise in the east and set in the west.", { size: "wide" }); })()}
<ul><li>The Sun's <b>apparent daily motion</b> across the sky (rising in the east, highest at noon, setting in the west) is caused by the Earth's rotation, not by the Sun moving.</li>
<li>The stars also appear to wheel across the night sky for the same reason.</li></ul>
<details class="check"><summary>Why does the Sun appear to rise in the east?</summary><div>The Earth rotates from west to east, so places on Earth turn towards the Sun from the east side first.</div></details>`},

    { h: "Years and seasons (6.1.1)", body: P`
<p class="lead">The Earth <b>orbits the Sun</b> once every <b>365¼ days</b> (one year). Its axis is tilted by about <b>23.5°</b>, and it always points in the same direction in space.</p>
<div class="viz" data-viz="seasons"></div>
<h3>Why the tilt causes seasons (S)</h3>
<ul><li>When the northern hemisphere is <b>tilted towards</b> the Sun (around June): the Sun climbs <b>higher</b> in the sky, so sunlight hits the ground <b>more directly</b> (concentrated on a smaller area), and days are <b>longer</b>. More energy per square metre per day: <b>summer</b>.</li>
<li>Six months later the northern hemisphere is tilted <b>away</b>: the Sun is low, light is spread over a larger area, and days are short: <b>winter</b>. The southern hemisphere has the opposite season.</li></ul>
${(() => { let s = F.line(20, 170, 520, 170, "k") + F.text(130, 195, "Sun high: energy on small area", "tr small bold") + F.text(390, 195, "Sun low: same energy spread out", "tb small bold");
  s += F.line(100, 30, 100, 170, "o thick") + F.line(160, 30, 160, 170, "o thick") + F.dim(100, 160, 160, 160, "", "r") ;
  s += F.line(300, 60, 360, 170, "o thick") + F.line(350, 30, 470, 170, "o thick") + F.dim(360, 160, 470, 160, "", "b");
  return F.fig(540, 210, s, "The same beam of sunlight covers a larger area when the Sun is low in the sky, so each square metre gets less energy.", { size: "wide" }); })()}
<div class="callout warn"><b class="t">Not distance</b>The Earth is actually slightly <b>closer</b> to the Sun in January (northern winter). Seasons are caused by the tilt, not by changing distance.</div>`},

    { h: "The Moon and its phases (6.1.1)", body: P`
<p class="lead">The Moon orbits the Earth about once a <b>month</b> (27.3 days; the full cycle of phases takes 29.5 days). The Moon doesn't make light: we see sunlight reflected from it.</p>
<div class="viz" data-viz="moonPhases"></div>
<p>Half of the Moon is always lit by the Sun. As it orbits, we see different fractions of the lit half: <b>new moon</b> (lit side facing away from us) → waxing crescent → <b>first quarter</b> → waxing gibbous → <b>full moon</b> (lit side facing us) → waning gibbous → <b>last quarter</b> → waning crescent → new moon.</p>`},

    { h: "Orbital speed and light travel time (6.1.1, 6.1.2)", body: P`
<p class="lead">For a roughly circular orbit, the object travels the circumference $2\pi r$ in one orbital period $T$:</p>
$$v=\frac{2\pi r}{T}$$
<p>$r$ = average orbital radius (m), $T$ = orbital period (s), $v$ = average orbital speed (m/s).</p>
<h3>Example: the Earth</h3>
<p>$r=1.5\times10^{11}$ m, $T=365\times24\times3600=3.15\times10^7$ s.</p>
$$v=\frac{2\pi\times1.5\times10^{11}}{3.15\times10^7}=3.0\times10^4\ \text{m/s}\ (30\ \text{km/s})$$
<h3>How long does light take?</h3>
<p>Light travels at $3.0\times10^8$ m/s. Using $t=d/v$: from the Sun to the Earth, $t=\dfrac{1.5\times10^{11}}{3.0\times10^8}=500$ s, about <b>8 minutes</b>. We see the Sun as it was 8 minutes ago. Light from the Moon takes about 1.3 s; from Neptune about 4 hours.</p>
<details class="check"><summary>The Moon orbits at 3.8 × 10⁸ m in 27.3 days. Find its orbital speed.</summary><div>$T=27.3\times86\,400=2.36\times10^6$ s. $v=2\pi\times3.8\times10^8/2.36\times10^6=1.0\times10^3$ m/s (1 km/s).</div></details>`},

    { h: "The Solar System (6.1.2)", body: P`
${(() => { let s = F.circ(-20, 120, 70, "o oS o"); const pl = [["Mercury", 80, 4, "m"], ["Venus", 115, 7, "o"], ["Earth", 150, 7, "b"], ["Mars", 182, 5, "r"], ["Jupiter", 255, 22, "o"], ["Saturn", 345, 18, "o"], ["Uranus", 430, 13, "b"], ["Neptune", 500, 13, "b"]];
  pl.forEach(([n, x, r, c], i) => { s += F.circ(x, 120, r, c + "S " + c) + F.text(x, i % 2 ? 175 : 80, n, "tk small bold"); });
  s += F.rect(205, 100, 20, 40, "m d thin") + F.text(215, 200, "asteroid belt", "tm small"); s += `<ellipse cx="345" cy="120" rx="30" ry="6" class="o thin"/>`;
  s += F.text(130, 222, "inner: small, rocky", "tr small bold") + F.text(400, 222, "outer: large, gas giants", "tb small bold");
  return F.fig(560, 235, s, "Order from the Sun: My Very Easy Method Just Speeds Up Naming (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune). Not to scale.", { size: "wide" }); })()}
<ul><li><b>One star</b>: the Sun, which contains about 99.8% of the Solar System's mass.</li>
<li><b>Eight planets</b> orbiting the Sun, all in the same direction and roughly in the same plane.</li>
<li><b>Minor planets</b>: <b>dwarf planets</b> such as Pluto, and <b>asteroids</b> (rocky bodies, mostly in the asteroid belt between Mars and Jupiter).</li>
<li><b>Moons</b>: natural satellites orbiting planets (the Earth has one; Jupiter and Saturn have dozens).</li>
<li><b>Comets</b>: lumps of ice and dust in very elongated orbits. Near the Sun the ice vaporises, forming a glowing tail that always points away from the Sun.</li></ul>`},

    { h: "How the Solar System formed: the accretion model (6.1.2)", body: P`
<ol class="steps-inline"><li>About 4.6 billion years ago, a huge <b>interstellar cloud of gas and dust</b> began to collapse under its own gravity.</li>
<li>As it collapsed it <b>rotated</b> faster and flattened into a spinning <b>disc</b>, with most of the mass pulled into the centre, which became hot enough to start fusion: the Sun.</li>
<li>In the disc, particles stuck together (<b>accretion</b>), growing into larger and larger bodies, then planets.</li>
<li>Close to the hot young Sun, only rocky and metallic materials (high melting points) could condense: the <b>inner planets</b> are small and <b>rocky</b>. Further out it was cold enough for ices, and the large cores attracted huge amounts of gas: the <b>outer planets</b> are large <b>gas giants</b>.</li></ol>
<p>The model explains why the planets <b>orbit in the same direction</b> and in roughly <b>the same plane</b>: they all formed from the same rotating disc.</p>`},

    { h: "Gravity and orbits (6.1.2)", body: P`
<ul><li>The <b>gravitational field strength</b> at a planet's surface depends on its <b>mass</b> (and size): Jupiter's is about 25 N/kg, the Earth's 9.8 N/kg, the Moon's 1.6 N/kg.</li>
<li>The field gets <b>weaker with distance</b> from the planet.</li>
<li>The force that keeps a planet in orbit is the <b>gravitational attraction of the Sun</b>. Because the Sun contains almost all the mass, everything orbits it.</li>
<li>Gravity acts towards the centre of the orbit, constantly changing the planet's direction (not its speed) — the same idea as circular motion in <i>Forces</i>.</li></ul>
${(() => { let s = sun(150, 160) + F.circ(150, 160, 140, "m thin d") + F.circ(290, 160, 9, "b bS b") + F.arrow(290, 160, 290, 80, "g mid", 9) + F.text(298, 90, "velocity", "tg small bold", "start") + F.arrow(282, 160, 186, 160, "r mid", 9) + F.text(234, 150, "gravity", "tr small bold");
  return F.fig(380, 320, s, "Gravity pulls towards the Sun, at 90° to the velocity: the planet keeps 'falling' around the Sun.", { size: "small" }); })()}`},

    { h: "Elliptical orbits and planetary data (6.1.2 S)", body: P`
<p class="lead">Orbits are really <b>ellipses</b>. For most planets they are nearly circles; for comets they are very elongated. The Sun is at one <b>focus</b>, not the centre (unless the orbit is circular).</p>
<div class="viz" data-viz="ellipse"></div>
<p>A comet moves <b>fastest when closest</b> to the Sun. Explanation by <b>conservation of energy</b>: as it falls towards the Sun, it loses gravitational potential energy and gains the same amount of kinetic energy; moving away, kinetic energy converts back to gravitational potential energy and it slows.</p>
<h3>Interpreting planetary data</h3>
<table class="t"><tr><th>Planet</th><th>Distance from Sun / million km</th><th>Orbital period / Earth years</th><th>Orbital speed / km/s</th><th>Surface g / N/kg</th><th>Mean surface temp / °C</th><th>Density / g/cm³</th></tr>
<tr><td>Mercury</td><td>58</td><td>0.24</td><td>48</td><td>3.7</td><td>167</td><td>5.4</td></tr>
<tr><td>Venus</td><td>108</td><td>0.62</td><td>35</td><td>8.9</td><td>464</td><td>5.2</td></tr>
<tr><td>Earth</td><td>150</td><td>1.0</td><td>30</td><td>9.8</td><td>15</td><td>5.5</td></tr>
<tr><td>Mars</td><td>228</td><td>1.9</td><td>24</td><td>3.7</td><td>−65</td><td>3.9</td></tr>
<tr><td>Jupiter</td><td>778</td><td>11.9</td><td>13</td><td>24.8</td><td>−110</td><td>1.3</td></tr>
<tr><td>Saturn</td><td>1430</td><td>29.5</td><td>9.7</td><td>10.4</td><td>−140</td><td>0.7</td></tr>
<tr><td>Uranus</td><td>2870</td><td>84</td><td>6.8</td><td>8.9</td><td>−195</td><td>1.3</td></tr>
<tr><td>Neptune</td><td>4500</td><td>165</td><td>5.4</td><td>11.2</td><td>−200</td><td>1.6</td></tr></table>
<ul><li>Further from the Sun → the Sun's field is weaker → <b>orbital speed decreases</b> and the <b>period increases</b> (a longer path, travelled more slowly).</li>
<li>Inner planets are dense (rocky); outer planets have low density (gas giants; Saturn would float on water).</li>
<li>Temperature generally falls with distance; Venus is hotter than Mercury because its thick CO₂ atmosphere traps heat (greenhouse effect).</li></ul>
<details class="check"><summary>Use the table: describe the trend in orbital speed with distance and explain it.</summary><div>Orbital speed decreases as distance increases (48 km/s for Mercury down to 5.4 km/s for Neptune), because the Sun's gravitational field is weaker further away.</div></details>`},

    { h: "The Sun as a star (6.2.1)", body: P`
<ul><li>The Sun is a <b>medium-sized star</b> made mostly of <b>hydrogen</b> (about 73%) and <b>helium</b> (about 25%).</li>
<li>It radiates most of its energy as <b>infrared</b>, <b>visible light</b> and <b>ultraviolet</b>.</li>
<li>(S) Stars are powered by <b>nuclear fusion</b>. In a stable star like the Sun, hydrogen nuclei fuse to form <b>helium</b> in the core, releasing huge amounts of energy.</li></ul>`},

    { h: "Stars, galaxies and light-years (6.2.2)", body: P`
<ul><li>A <b>galaxy</b> is a huge collection of many <b>billions of stars</b>, held together by gravity.</li>
<li>The Sun is one star in our galaxy, the <b>Milky Way</b>. All the other stars in the Milky Way are <b>much further</b> from us than the Sun.</li>
<li>Astronomical distances are measured in <b>light-years</b>: the distance light travels in (the vacuum of) space in one year.</li></ul>
$$1\ \text{light-year}=3.0\times10^8\times(365\times24\times3600)\approx9.5\times10^{15}\ \text{m}$$
<p>The nearest star after the Sun, Proxima Centauri, is about 4.2 light-years away: its light left it over four years ago.</p>
<div class="callout warn"><b class="t">A light-year is a distance</b>Not a time. "The star is 100 light-years away" means its light took 100 years to reach us.</div>`},

    { h: "The life cycle of a star (6.2.2 S)", body: P`
${(() => { let s = ""; const box = (x, y, t, c, w = 120) => F.rect(x, y, w, 44, c + "S " + c, 10) + t.split("|").map((l, i, a) => F.text(x + w / 2, y + 26 - (a.length - 1) * 8 + i * 16, l, "t" + c + " small bold")).join("");
  s += box(10, 110, "nebula|(gas + dust)", "m") + F.arrow(132, 132, 160, 132, "m", 8) + box(162, 110, "protostar", "o") + F.arrow(284, 132, 312, 132, "m", 8) + box(314, 110, "stable star|(main sequence)", "o", 130);
  s += F.arrow(444, 120, 480, 60, "m", 8) + F.arrow(444, 144, 480, 204, "m", 8) + F.text(470, 98, "like the Sun", "tm small", "start") + F.text(470, 176, "much more massive", "tm small", "start");
  s += box(482, 30, "red giant", "r", 110) + F.arrow(592, 52, 620, 52, "m", 8) + box(622, 30, "planetary nebula|+ white dwarf", "b", 140);
  s += box(482, 182, "red supergiant", "r", 110) + F.arrow(592, 204, 620, 204, "m", 8) + box(622, 182, "SUPERNOVA", "r", 110) + F.arrow(732, 194, 760, 170, "m", 8) + F.arrow(732, 214, 760, 236, "m", 8);
  s += box(762, 140, "neutron star", "k", 110) + box(762, 220, "black hole", "k", 110) + F.path("M677,226 Q600,290 80,160", "g d") + F.text(380, 262, "supernova debris forms new nebulae → new stars and planets", "tg small bold");
  return F.fig(880, 280, s, "", { size: "wide" }); })()}
<ol class="steps-inline"><li>A star forms from an <b>interstellar cloud of gas and dust</b> (a nebula) containing hydrogen.</li>
<li>Gravity pulls the cloud together; it collapses and heats up: a <b>protostar</b>.</li>
<li>When the core is hot enough, hydrogen fuses into helium. The star becomes <b>stable</b> when the <b>inward force of gravity</b> is balanced by the <b>outward force</b> due to the high temperature (pressure) in the core. It stays like this for billions of years.</li>
<li>Eventually the star runs out of hydrogen in its core. Most stars swell into a <b>red giant</b>; much more massive stars become <b>red supergiants</b>.</li>
<li>A red giant from a less massive star (like the Sun) throws off its outer layers as a <b>planetary nebula</b>, leaving a hot, dense <b>white dwarf</b> that slowly cools.</li>
<li>A red supergiant explodes as a <b>supernova</b>, forming a nebula containing hydrogen and <b>new heavier elements</b>, and leaving a <b>neutron star</b> or, for the most massive, a <b>black hole</b>.</li>
<li>The nebula from a supernova may form new stars with orbiting planets. The iron in your blood and the calcium in your bones were made in stars.</li></ol>`},

    { h: "The Universe, redshift and the Big Bang (6.2.3)", body: P`
<ul><li>The Milky Way is one of <b>many billions of galaxies</b> in the Universe. It is about <b>100 000 light-years</b> across.</li>
<li><b>Redshift</b> is an <b>increase in the observed wavelength</b> of electromagnetic radiation from stars and galaxies that are moving away from us.</li></ul>
<div class="viz" data-viz="redshift"></div>
<ul><li>Light from <b>distant galaxies is redshifted</b> compared with the same light emitted on Earth: the dark absorption lines in their spectra are shifted towards the red end.</li>
<li><b>More distant galaxies are more redshifted</b>, so they are moving away faster.</li>
<li>This is evidence that the <b>Universe is expanding</b>. Run the expansion backwards and everything was once at a single, extremely hot, dense point: the <b>Big Bang</b>, about 14 billion years ago.</li></ul>`},

    { h: "CMBR and the Hubble constant (6.2.3 S)", body: P`
<h3>Cosmic microwave background radiation (CMBR)</h3>
<p>Microwave radiation of a specific frequency is detected coming from <b>every direction</b> in space. It was produced shortly after the Universe formed, when it was extremely hot. As the Universe expanded, this radiation was stretched (its wavelength increased) into the <b>microwave</b> region. Only the Big Bang theory predicts it, so it is strong evidence for the theory.</p>
<h3>The Hubble constant</h3>
<ul><li>A galaxy's <b>speed</b> away from us, $v$, is found from the <b>change in wavelength</b> (redshift) of its light.</li>
<li>Its <b>distance</b> $d$ can be found from the brightness of a <b>supernova</b> in it (all supernovae of one type have the same true brightness, so a dimmer one is further away).</li></ul>
$$H_0=\frac{v}{d}\approx2.2\times10^{-18}\ \text{s}^{-1}$$
<p>Because $v$ is proportional to $d$, every galaxy took the same time to get where it is: $t=\dfrac{d}{v}=\dfrac{1}{H_0}$.</p>
$$\frac{1}{H_0}=\frac{1}{2.2\times10^{-18}}=4.5\times10^{17}\ \text{s}\approx14\ \text{billion years}$$
<p>This is an estimate of the <b>age of the Universe</b>, and evidence that all the matter in the Universe was once at a single point.</p>
<details class="check"><summary>A galaxy is 2.0 × 10²⁴ m away. Using H₀ = 2.2 × 10⁻¹⁸ /s, find its recession speed.</summary><div>$v=H_0d=2.2\times10^{-18}\times2.0\times10^{24}=4.4\times10^6$ m/s.</div></details>`}
  ],
  worked: [
    { q: P`Mars orbits the Sun at an average radius of 2.28 × 10¹¹ m with a period of 687 days. Calculate its average orbital speed.`,
      steps: [P`$T=687\times24\times3600=5.94\times10^7$ s.`, P`$v=\dfrac{2\pi r}{T}=\dfrac{2\pi\times2.28\times10^{11}}{5.94\times10^7}$`, P`$=2.4\times10^4$ m/s (24 km/s).`]},
    { q: P`S: Explain why the Sun is a stable star, and describe what happens to it when it runs out of hydrogen in its core.`,
      steps: [P`Stable: the inward force of gravity is balanced by the outward force due to the high temperature (pressure) from fusion in the core.`, P`When core hydrogen runs out, it expands into a red giant.`, P`Then it sheds its outer layers as a planetary nebula, leaving a white dwarf.`]},
    { q: P`S: A galaxy recedes at 6.6 × 10⁶ m/s. Using H₀ = 2.2 × 10⁻¹⁸ /s, find its distance in metres and in light-years.`,
      steps: [P`$d=v/H_0=6.6\times10^6/2.2\times10^{-18}=3.0\times10^{24}$ m.`, P`In light-years: $3.0\times10^{24}/9.5\times10^{15}=3.2\times10^8$ light-years.`]}
  ],
  formulas: [["Orbital speed", P`$v=\dfrac{2\pi r}{T}$`], ["Light travel time", P`$t=\dfrac{d}{c},\ c=3.0\times10^8$ m/s`], ["Light-year (S)", P`$9.5\times10^{15}$ m`], ["Hubble constant (S)", P`$H_0=\dfrac{v}{d}\approx2.2\times10^{-18}$ /s`], ["Age of Universe (S)", P`$\dfrac{1}{H_0}\approx14$ billion years`]],
  cards: [
    ["What causes day and night?", "The Earth rotating on its axis about once every 24 hours."],
    ["What causes the seasons? (S)", "The tilt of the Earth's axis: the hemisphere tilted towards the Sun gets more direct sunlight and longer days."],
    ["How long is the Moon's orbit?", "About a month (27.3 days)."],
    ["Why does the Moon have phases?", "We see different fractions of its sunlit half as it orbits the Earth."],
    ["Orbital speed equation", "v = 2πr / T"],
    ["Order of the planets", "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune."],
    ["Inner vs outer planets", "Inner: small, rocky. Outer: large, gaseous."],
    ["Why are inner planets rocky? (accretion model)", "Near the hot young Sun only rocky materials could condense; ices and gases further out."],
    ["Why do planets orbit in the same plane and direction?", "They formed from the same rotating, flattened disc of gas and dust."],
    ["What keeps planets in orbit?", "The Sun's gravitational attraction."],
    ["How does orbital speed vary with distance from the Sun? (S)", "It decreases (the Sun's field is weaker further away)."],
    ["Why does a comet speed up near the Sun? (S)", "It loses gravitational PE and gains the same amount of kinetic energy."],
    ["What is the Sun made of?", "Mostly hydrogen and helium."],
    ["How does a star produce energy? (S)", "Nuclear fusion of hydrogen into helium."],
    ["What is a light-year?", "The distance light travels in a year (9.5 × 10¹⁵ m)."],
    ["Diameter of the Milky Way", "About 100 000 light-years."],
    ["Why is a main-sequence star stable? (S)", "Inward gravity balanced by outward force from high core temperature."],
    ["Fate of a Sun-like star (S)", "Red giant → planetary nebula + white dwarf."],
    ["Fate of a massive star (S)", "Red supergiant → supernova → neutron star or black hole."],
    ["What is redshift?", "Increase in observed wavelength of light from galaxies moving away."],
    ["What does redshift show?", "Galaxies are moving away; the Universe is expanding (supports the Big Bang)."],
    ["What is the CMBR? (S)", "Microwave radiation from all directions, left over from the early Universe and stretched by expansion."],
    ["Hubble constant (S)", "H₀ = v/d ≈ 2.2 × 10⁻¹⁸ per second."],
    ["How is the age of the Universe estimated? (S)", "1/H₀ ≈ 14 billion years."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Day and night are caused by`, opts: ["the Earth orbiting the Sun", "the Earth rotating on its axis", "the Moon blocking the Sun", "the tilt of the axis"], ans: 1, why: P`Rotation once every 24 hours.` },
    { type: "mcq", marks: 1, q: P`Which planet is closest to the Sun?`, opts: ["Venus", "Mercury", "Mars", "Earth"], ans: 1, why: P`Mercury.` },
    { type: "mcq", marks: 1, q: P`A light-year is a unit of`, opts: ["time", "speed", "distance", "brightness"], ans: 2, why: P`Distance light travels in a year.` },
    { type: "mcq", marks: 1, q: P`The outer planets are`, opts: ["small and rocky", "large and gaseous", "made of iron", "not in orbit"], ans: 1, why: P`Gas giants.` },
    { type: "mcq", marks: 1, q: P`Light from distant galaxies is`, opts: ["blueshifted", "redshifted", "unchanged", "polarised"], ans: 1, why: P`They are moving away.` },
    { type: "mcq", marks: 1, q: P`S: A Sun-like star ends its life as`, opts: ["a black hole", "a neutron star", "a white dwarf", "a supernova"], ans: 2, why: P`After a red giant and planetary nebula.` },
    { type: "mcq", marks: 1, q: P`S: In an elliptical orbit a comet moves fastest`, opts: ["furthest from the Sun", "closest to the Sun", "at constant speed", "halfway"], ans: 1, why: P`GPE converted to KE as it falls in.` },
    { type: "mcq", marks: 1, q: P`S: The Hubble constant is about`, opts: [P`$2.2\times10^{18}$ /s`, P`$2.2\times10^{-18}$ /s`, P`$9.5\times10^{15}$ m`, P`$3.0\times10^8$ m/s`], ans: 1, why: P`$H_0\approx2.2\times10^{-18}$ s⁻¹.` },
    { type: "struct", marks: 3, q: P`S: Explain why it is summer in the northern hemisphere in June.`,
      ms: P`<b>B1</b> the Earth's axis is tilted (23.5°), northern hemisphere tilted towards the Sun<br><b>B1</b> Sun higher in the sky so sunlight more concentrated / more energy per m²<br><b>B1</b> longer days (more hours of sunlight)` },
    { type: "struct", marks: 3, q: P`The Earth orbits at 1.5 × 10¹¹ m from the Sun once every 365 days. Calculate its orbital speed.`,
      ms: P`<b>C1</b> $T=3.15\times10^7$ s<br><b>C1</b> $v=2\pi r/T$<br><b>A1</b> $3.0\times10^4$ m/s` },
    { type: "struct", marks: 4, q: P`Describe the accretion model for the formation of the Solar System and use it to explain why the inner planets are rocky.`,
      ms: P`<b>B1</b> cloud of gas and dust collapses under gravity<br><b>B1</b> rotates and flattens into a disc; centre becomes the Sun<br><b>B1</b> particles stick together (accrete) to form planets<br><b>B1</b> close to the hot Sun only rocky materials could condense` },
    { type: "struct", marks: 3, q: P`Calculate the time for light to travel from the Sun to Jupiter (7.8 × 10¹¹ m). Give your answer in minutes.`,
      ms: P`<b>C1</b> $t=7.8\times10^{11}/3.0\times10^8$<br><b>C1</b> 2600 s<br><b>A1</b> 43 minutes` },
    { type: "struct", marks: 5, q: P`S: Describe the life cycle of a star much more massive than the Sun, from its formation.`,
      ms: P`<b>B1</b> forms from a cloud of gas and dust (nebula) collapsing under gravity → protostar<br><b>B1</b> fusion starts; stable when gravity balances outward pressure<br><b>B1</b> hydrogen runs out: expands into a red supergiant<br><b>B1</b> explodes as a supernova (forming heavier elements)<br><b>B1</b> leaves a neutron star or black hole` },
    { type: "struct", marks: 3, q: P`Explain what redshift is and what it tells us about the Universe.`,
      ms: P`<b>B1</b> increase in observed wavelength of light from a source moving away<br><b>B1</b> light from distant galaxies is redshifted, more so for more distant galaxies<br><b>B1</b> the Universe is expanding (evidence for the Big Bang)` },
    { type: "struct", marks: 3, q: P`S: State what the cosmic microwave background radiation is and how it supports the Big Bang theory.`,
      ms: P`<b>B1</b> microwave radiation detected from all directions in space<br><b>B1</b> produced shortly after the Big Bang when the Universe was very hot<br><b>B1</b> stretched into microwaves as the Universe expanded; predicted by the Big Bang theory` },
    { type: "struct", marks: 3, q: P`S: A galaxy recedes at 2.2 × 10⁶ m/s. Calculate its distance, and use H₀ to estimate the age of the Universe in seconds.`,
      ms: P`<b>C1</b> $d=v/H_0$<br><b>A1</b> $1.0\times10^{24}$ m<br><b>A1</b> $1/H_0=4.5\times10^{17}$ s` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: P`How long does it take the Earth to orbit the Sun?`, ms: P`<b>B1</b> about 365 days (one year)` },
    { d: 1, type: "mcq", marks: 1, q: P`The Sun is`, opts: ["a planet", "a medium-sized star", "a galaxy", "a red giant"], ans: 1, why: P`A medium-sized star.` },
    { d: 1, type: "struct", marks: 2, q: P`Name the galaxy that contains the Sun, and state roughly how many stars a galaxy contains.`, ms: P`<b>B1</b> the Milky Way<br><b>B1</b> billions (of stars)` },
    { d: 1, type: "struct", marks: 2, q: P`State two types of body, other than planets, found in the Solar System.`, ms: P`<b>B2</b> any two: moons, asteroids, dwarf planets, comets` },
    { d: 2, type: "struct", marks: 3, q: P`Use the table of planetary data (Mercury 48 km/s at 58 million km … Neptune 5.4 km/s at 4500 million km) to describe and explain the relationship between orbital speed and distance from the Sun.`, ms: P`<b>B1</b> orbital speed decreases as distance increases<br><b>B1</b> the Sun's gravitational field strength decreases with distance<br><b>B1</b> so a smaller speed is needed/achieved for orbit` },
    { d: 2, type: "struct", marks: 3, q: P`Explain why the phases of the Moon repeat about every month.`, ms: P`<b>B1</b> half the Moon is always lit by the Sun<br><b>B1</b> as it orbits the Earth we see different amounts of the lit half<br><b>B1</b> it takes about a month to orbit, so the cycle repeats monthly` },
    { d: 2, type: "mcq", marks: 1, q: P`S: In a stable star, the inward force of gravity is balanced by`, opts: ["magnetic forces", "the outward force due to high core temperature", "the star's rotation", "radiation from other stars"], ans: 1, why: P`Thermal pressure from fusion.` },
    { d: 3, type: "struct", marks: 5, q: P`S: A comet has a highly elliptical orbit. (a) Sketch the orbit showing the position of the Sun. (b) Mark where the comet is fastest and explain why using energy. (c) Explain why the comet only has a tail near the Sun.`, ms: P`<b>(a) B1</b> elongated ellipse with Sun at one focus (near one end)<br><b>(b) B1</b> fastest closest to the Sun<br><b>B1</b> gravitational PE converted to KE as it approaches<br><b>(c) B1</b> near the Sun ice is heated and vaporises<br><b>B1</b> gas and dust are pushed away from the Sun forming the tail` },
    { d: 3, type: "struct", marks: 6, q: P`S: Explain how measurements of redshift and supernova brightness are used to estimate the age of the Universe, and state why this supports the Big Bang theory.`, ms: P`<b>B1</b> redshift (change in wavelength) gives recession speed v<br><b>B1</b> brightness of supernova (standard brightness) gives distance d<br><b>B1</b> v proportional to d; gradient H₀ = v/d<br><b>B1</b> age ≈ d/v = 1/H₀<br><b>B1</b> ≈ 4.5 × 10¹⁷ s ≈ 14 billion years<br><b>B1</b> all galaxies traced back to a single point at the same time: consistent with the Big Bang` }
  ]
});
}
