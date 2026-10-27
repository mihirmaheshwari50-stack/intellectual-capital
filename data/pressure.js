window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
const particles = (x, y, w, h, n, r, c, seed = 1) => { let s = "", cols = Math.round(Math.sqrt(n * w / h)), rows = Math.ceil(n / cols); for (let i = 0; i < n; i++) { const cx = x + (i % cols + .5) * w / cols, cy = y + (Math.floor(i / cols) + .5) * h / rows; s += F.circ(cx, cy, r, c + "S " + c); } return s; };
const beaker = (x, y, w, h, lvl, c = "b") => F.path(`M${x},${y} L${x},${y + h} Q${x},${y + h + 8} ${x + 8},${y + h + 8} L${x + w - 8},${y + h + 8} Q${x + w},${y + h + 8} ${x + w},${y + h} L${x + w},${y}`, "k") + F.rect(x + 1, y + lvl, w - 2, h - lvl + 7, c + "S nostroke");
//@@HELPERS-END

/* ============================================================
   DENSITY & PRESSURE  (0625: 1.4, 1.8)
   ============================================================ */
TOPICS.push({
  id: "pressure", subject: "physics", unit: 1, title: "Density & pressure",
  blurb: "Density, measuring it for solids and liquids, floating and sinking, pressure as force per area, and pressure in liquids.",
  level: "Core → Supplement", demo: "density",
  syllabus: [
    ["1.4", "Define density as mass per unit volume; recall and use ρ = m/V", 0],
    ["1.4", "Determine the density of a regularly shaped solid", 1],
    ["1.4", "Determine the density of a liquid, and of an irregular solid that sinks (volume by displacement)", 2],
    ["1.4", "Determine whether an object floats, using density data", 3],
    ["1.4 S", "Determine whether one liquid will float on another, using density data (liquids that do not mix)", 3],
    ["1.8", "Define pressure as force per unit area; recall and use p = F/A", 4],
    ["1.8", "Describe how pressure varies with force and area in everyday examples", 5],
    ["1.8", "Describe qualitatively how pressure beneath the surface of a liquid changes with depth and with the density of the liquid", 6],
    ["1.8 S", "Recall and use Δp = ρgΔh for the change in pressure beneath the surface of a liquid", 7]
  ],
  sections: [
    { h: "What density means (1.4)", body: P`
<p class="lead"><b>Density</b> is mass per unit volume. It tells you how much matter is packed into each cubic centimetre or cubic metre.</p>
$$\rho=\frac{m}{V}$$
<p>$\rho$ (the Greek letter "rho") = density, $m$ = mass, $V$ = volume. Units: <b>kg/m³</b> (SI) or <b>g/cm³</b>.</p>
${F.row(
  (() => { let s = F.rect(20, 20, 120, 120, "k") + particles(20, 20, 120, 120, 36, 8, "o") + F.rect(170, 20, 120, 120, "k") + particles(170, 20, 120, 120, 9, 8, "b");
    s += F.text(80, 160, "dense: particles", "tk small bold") + F.text(80, 175, "heavy and close", "tk small bold") + F.text(230, 160, "less dense: fewer", "tk small bold") + F.text(230, 175, "or lighter particles", "tk small bold");
    return F.fig(310, 185, s, "Same volume, different mass: density depends on how heavy the particles are and how closely they are packed."); })(),
  (() => { let s = F.poly([[100, 20], [180, 150], [20, 150]], "c cS", true) + F.line(46, 105, 154, 105, "c") + F.line(100, 105, 100, 150, "c") + F.text(100, 88, "m", "tk big bold serif") + F.text(68, 136, "ρ", "tk big bold serif") + F.text(132, 136, "V", "tk big bold serif");
    return F.fig(200, 170, s, "$\\rho=m/V$, $m=\\rho V$, $V=m/\\rho$.", { size: "tiny" }); })()
)}
<h3>Converting units</h3>
<p>$1\ \text{g/cm}^3=1000\ \text{kg/m}^3$. Water has a density of 1.0 g/cm³ = 1000 kg/m³.</p>
<div class="callout why"><b class="t">Why ×1000?</b>1 kg = 1000 g, but 1 m³ = 1 000 000 cm³. So 1 g/cm³ = $\dfrac{0.001\text{ kg}}{0.000001\text{ m}^3}$ = 1000 kg/m³.</div>
<table class="t"><tr><th>Material</th><th>Density / g/cm³</th><th>Density / kg/m³</th></tr>
<tr><td>Air (room conditions)</td><td>0.0012</td><td>1.2</td></tr><tr><td>Cork</td><td>0.24</td><td>240</td></tr><tr><td>Wood (pine)</td><td>0.5</td><td>500</td></tr><tr><td>Oil</td><td>0.9</td><td>900</td></tr><tr><td>Ice</td><td>0.92</td><td>920</td></tr><tr><td>Water</td><td>1.0</td><td>1000</td></tr><tr><td>Sea water</td><td>1.03</td><td>1030</td></tr><tr><td>Aluminium</td><td>2.7</td><td>2700</td></tr><tr><td>Iron</td><td>7.9</td><td>7900</td></tr><tr><td>Lead</td><td>11.3</td><td>11 300</td></tr><tr><td>Mercury</td><td>13.6</td><td>13 600</td></tr><tr><td>Gold</td><td>19.3</td><td>19 300</td></tr></table>
<div class="callout warn"><b class="t">Density is a property of the material</b>Cutting a block of iron in half halves its mass and its volume, so its density stays 7.9 g/cm³. A heavy object is not necessarily dense: a large log is heavy but less dense than water.</div>
<details class="check"><summary>A 54 g block has a volume of 20 cm³. Find its density in g/cm³ and in kg/m³. Which metal could it be?</summary><div>$54/20=2.7$ g/cm³ $=2700$ kg/m³: aluminium.</div></details>`},

    { h: "Density of a regular solid (1.4)", body: P`
<p class="lead">For a regular shape, find the mass on a balance and calculate the volume from measured lengths.</p>
${(() => { let s = `<g transform="translate(70,0)">` + F.path("M60,60 L220,60 L260,30 L100,30 Z", "o oS o") + F.rect(60, 60, 160, 90, "o oS o") + F.path("M220,60 L260,30 L260,120 L220,150", "o oS o");
  s += F.dim(60, 168, 220, 168, "l = 8.0 cm", "c", 14) + F.dim(44, 60, 44, 150, "", "c") + F.text(36, 109, "h = 4.5 cm", "tc small bold", "end") + F.text(268, 145, "w = 3.0 cm", "tc small bold", "start") + `</g>`;
  s += F.rect(430, 110, 170, 40, "k mS", 4) + F.rect(465, 118, 100, 22, "k bgF", 2) + F.text(515, 134, "286.2 g", "tk small bold") + F.text(515, 98, "electronic balance", "tk small");
  return F.fig(620, 195, s, "Volume = 8.0 × 3.0 × 4.5 = 108 cm³. Density = 286.2 ÷ 108 = <b>2.65 g/cm³</b>.", { size: "wide" }); })()}
<ol class="steps-inline"><li>Zero the balance, then measure the <b>mass</b>.</li>
<li>Measure each <b>dimension</b> with a ruler (or vernier calipers for small objects), in several places, and average.</li>
<li>Calculate the <b>volume</b>: cuboid $l\times w\times h$; cylinder $\pi r^2h$; sphere $\tfrac43\pi r^3$.</li>
<li>Calculate density $=m/V$, with units.</li></ol>
<details class="check"><summary>A metal cylinder has diameter 2.0 cm, length 5.0 cm and mass 124 g. Find its density.</summary><div>$V=\pi\times1.0^2\times5.0=15.7$ cm³; $\rho=124/15.7=7.9$ g/cm³ (iron).</div></details>`},

    { h: "Density of a liquid and of an irregular solid (1.4)", body: P`
<p class="lead">If you can't calculate the volume, <b>measure</b> it.</p>
<h3>A liquid</h3>
${(() => { let s = beaker(30, 40, 80, 120, 120, "m") + F.rect(10, 168, 120, 22, "k mS", 3) + F.text(70, 184, "52.0 g", "tk small bold") + F.text(70, 28, "1. empty", "tk small bold");
  s += F.arrow(140, 110, 170, 110, "m", 7) + beaker(190, 40, 80, 120, 40, "b") + F.rect(170, 168, 120, 22, "k mS", 3) + F.text(230, 184, "130.0 g", "tk small bold") + F.text(230, 28, "2. with 100 cm³ liquid", "tk small bold");
  s += F.text(410, 80, "mass of liquid", "tk small", "middle") + F.text(410, 96, "= 130.0 − 52.0 = 78.0 g", "tc small bold") + F.text(410, 130, "density = 78.0 ÷ 100", "tk small") + F.text(410, 146, "= 0.78 g/cm³", "tc small bold");
  return F.fig(520, 200, s, "Weigh the empty container, add a measured volume, weigh again. The difference is the mass of the liquid.", { size: "wide" }); })()}
<ol class="steps-inline"><li>Measure the mass of an empty measuring cylinder (or beaker).</li><li>Pour in liquid and read the volume (bottom of the meniscus, eye level).</li><li>Measure the new mass. Mass of liquid = difference.</li><li>Density = mass of liquid ÷ volume.</li></ol>
<h3>An irregular solid that sinks: displacement</h3>
${F.row(
  (() => { let s = beaker(30, 20, 70, 170, 90, "b") + beaker(150, 20, 70, 170, 62, "b") + F.path("M170,140 L192,128 L208,148 L200,172 L174,168 Z", "k oS") + F.line(185, 0, 185, 132, "m thin");
    s += F.text(65, 104, "60 cm³", "tb small bold") + F.text(185, 76, "88 cm³", "tb small bold") + F.arrow(110, 110, 140, 110, "m", 7);
    return F.fig(260, 205, s, "Volume of stone = 88 − 60 = 28 cm³."); })(),
  (() => { let s = F.path("M40,40 L40,180 L150,180 L150,40", "k") + F.rect(41, 70, 108, 109, "bS nostroke") + F.path("M150,70 L190,90", "k mid") + F.path("M200,110 L200,180 Q200,188 208,188 L252,188 Q260,188 260,180 L260,110", "k") + F.rect(201, 160, 58, 27, "bS nostroke");
    s += F.arrow(192, 94, 210, 140, "b", 7) + F.text(95, 30, "displacement can", "tk small bold") + F.text(230, 100, "overflow", "tk small bold") + F.path("M75,130 L100,118 L118,136 L108,160 L80,156 Z", "k oS");
    return F.fig(280, 205, s, "For big objects: fill the can to the spout, lower the object in, collect and measure the overflow."); })()
)}
<p>Then density = mass (from a balance) ÷ displaced volume.</p>
<div class="callout exam"><b class="t">Precautions</b>Lower the object gently on a thread (no splashing); make sure it is fully submerged and no air bubbles cling to it; read the meniscus at eye level. For an object that floats, push it under with a thin pin or tie a sinker to it (and subtract the sinker's volume).</div>
<details class="check"><summary>A stone of mass 75 g raises the water in a cylinder from 40 cm³ to 70 cm³. Find its density.</summary><div>$V=30$ cm³; $\rho=75/30=2.5$ g/cm³.</div></details>`},

    { h: "Floating and sinking (1.4)", body: P`
<p class="lead">An object <b>floats</b> in a liquid if its density is <b>less</b> than the liquid's density. It <b>sinks</b> if its density is <b>greater</b>.</p>
${(() => { let s = F.rect(40, 30, 200, 210, "k") + F.rect(41, 30, 198, 50, "oS nostroke") + F.rect(41, 80, 198, 80, "bS nostroke") + F.rect(41, 160, 198, 79, "mS nostroke") + F.line(41, 80, 239, 80, "o thin") + F.line(41, 160, 239, 160, "b thin");
  s += F.text(250, 60, "oil 0.9 g/cm³", "to small bold", "start") + F.text(250, 125, "water 1.0 g/cm³", "tb small bold", "start") + F.text(250, 205, "syrup 1.4 g/cm³", "tm small bold", "start");
  s += F.rect(60, 34, 30, 20, "k bgF", 3) + F.text(75, 22, "cork 0.24", "tk small") + F.circ(140, 82, 14, "g gS g") + F.text(140, 108, "ice 0.92", "tk small") + F.rect(180, 152, 30, 16, "r rS r", 3) + F.text(196, 144, "plastic 1.2", "tk small") + F.rect(100, 222, 34, 16, "k kF", 3) + F.text(117, 214, "iron 7.9", "tk small");
  return F.fig(400, 255, s, "Each object settles where the liquid around it is denser than itself. Iron is denser than everything here, so it sinks to the bottom.", { size: "small" }); })()}
<ul><li>Ice (0.92 g/cm³) floats on water (1.0 g/cm³), with about 92% below the surface. This is why most of an iceberg is hidden.</li>
<li>A steel ship floats even though steel is 7.9 g/cm³: the hull encloses a huge volume of air, so the <b>average density</b> of the ship (steel + air) is less than that of water.</li>
<li>A helium balloon rises because helium is less dense than air.</li></ul>
<h3>Liquids on liquids (S)</h3>
<p>Two liquids that <b>do not mix</b> form layers: the <b>less dense liquid floats on top</b>. Oil (0.9) floats on water (1.0). Mercury (13.6) would sink below water.</p>
<div class="callout exam"><b class="t">Answering "will it float?"</b>Calculate the density ($m/V$), then compare it with the liquid's density in a full sentence: "The density of the block is 0.8 g/cm³, which is less than the density of water (1.0 g/cm³), so it floats."</div>
<details class="check"><summary>A 600 g block of volume 500 cm³ is placed in water. Does it float? What about in a liquid of density 1.3 g/cm³?</summary><div>$\rho=600/500=1.2$ g/cm³. Greater than water's 1.0, so it sinks in water. Less than 1.3, so it floats in the second liquid.</div></details>`},

    { h: "Pressure (1.8)", body: P`
<p class="lead"><b>Pressure</b> is the force acting per unit area. The same force can have very different effects depending on the area it is spread over.</p>
$$p=\frac{F}{A}$$
<p>$p$ in <b>pascals (Pa)</b>, $F$ in newtons (N), $A$ in m². 1 Pa = 1 N/m². Pressure acts at 90° (perpendicular) to a surface.</p>
${(() => { let s = F.line(20, 170, 520, 170, "k") + F.rect(40, 70, 180, 100, "o oS o", 4) + F.text(130, 125, "lying flat", "tk small bold");
  s += F.rect(340, 30, 60, 140, "o oS o", 4) + F.text(370, 105, "on end", "tk small bold");
  s += F.text(130, 192, "area 0.18 m²", "tb small bold") + F.text(130, 208, "p = 360 ÷ 0.18 = 2000 Pa", "tb small bold") + F.text(370, 192, "area 0.06 m²", "tr small bold") + F.text(370, 208, "p = 360 ÷ 0.06 = 6000 Pa", "tr small bold");
  return F.fig(540, 222, s, "The same 360 N brick. Smaller area, larger pressure.", { size: "wide" }); })()}
<div class="callout warn"><b class="t">Area units</b>1 m² = 10 000 cm² (100 × 100). If the area is in cm², either convert to m² (÷ 10 000) or give the answer in N/cm². 5 cm² = 0.0005 m².</div>
<details class="check"><summary>A 600 N person stands on one foot of area 150 cm². Find the pressure on the floor in Pa.</summary><div>$A=150/10\,000=0.015$ m²; $p=600/0.015=40\,000$ Pa (40 kPa).</div></details>`},

    { h: "Pressure in everyday life (1.8)", body: P`
<p class="lead">To <b>increase</b> pressure, concentrate the force on a <b>small</b> area. To <b>decrease</b> pressure, spread the force over a <b>large</b> area.</p>
${F.row(
  (() => { let s = F.path("M20,60 L160,40 L170,60 L30,80 Z", "m mS") + F.line(30, 80, 170, 60, "r thick") + F.text(100, 110, "sharp edge: tiny area", "tr small bold") + F.text(100, 126, "→ huge pressure, cuts", "tk small");
    return F.fig(190, 140, s, "Knives, needles, nails, drawing pins.", { size: "tiny" }); })(),
  (() => { let s = F.path("M40,40 Q90,20 140,40 L150,60 L30,60 Z", "k mS") + F.line(20, 64, 160, 64, "b thick") + F.text(90, 96, "wide area", "tb small bold") + F.text(90, 112, "→ low pressure", "tk small");
    return F.fig(190, 125, s, "Snowshoes, wide tractor tyres, camel feet.", { size: "tiny" }); })(),
  (() => { let s = F.rect(30, 30, 60, 30, "k mS", 4) + F.line(60, 60, 60, 110, "k thick") + F.path("M54,104 L60,120 L66,104 Z", "r rF") + F.text(120, 50, "large head:", "tk small", "start") + F.text(120, 64, "low p on thumb", "tk small", "start") + F.text(120, 112, "point:", "tr small", "start") + F.text(120, 126, "high p into wood", "tr small", "start");
    return F.fig(220, 140, s, "A drawing pin uses both ideas at once: same force, two very different areas.", { size: "tiny" }); })()
)}
<table class="t"><tr><th>Example</th><th>Area</th><th>Effect</th></tr>
<tr><td>Stiletto heel vs flat shoe</td><td>Tiny vs large</td><td>Heel can dent floors; flat shoe doesn't</td></tr>
<tr><td>Wide tyres on tractors and tanks</td><td>Large</td><td>Low pressure: don't sink into soft ground</td></tr>
<tr><td>Snowshoes, skis</td><td>Large</td><td>Don't sink into snow</td></tr>
<tr><td>Building foundations</td><td>Large</td><td>Spread the weight so the building doesn't sink</td></tr>
<tr><td>Knife blade, needle, nail point</td><td>Tiny</td><td>Very high pressure: pierces or cuts easily</td></tr>
<tr><td>Lying on a bed of nails</td><td>Many points share the weight</td><td>Pressure at each point is low enough not to pierce skin</td></tr></table>
<details class="check"><summary>Explain why a blunt knife is harder to cut with than a sharp one.</summary><div>The blunt edge has a larger area, so the same force produces a smaller pressure, which is not enough to cut.</div></details>`},

    { h: "Pressure in liquids (1.8)", body: P`
<p class="lead">A liquid presses on everything in it, because of the weight of the liquid above. The pressure in a liquid:</p>
<ul><li><b>increases with depth</b> (more liquid above pressing down);</li><li><b>increases with the density</b> of the liquid (heavier liquid above);</li><li>acts <b>equally in all directions</b> at a given depth;</li><li>does <b>not</b> depend on the shape or width of the container.</li></ul>
<div class="viz" data-viz="pressureDepth"></div>
${F.row(
  (() => { let s = F.line(10, 190, 230, 190, "k") + F.rect(20, 50, 80, 140, "bS nostroke") + F.poly([[100, 30], [130, 30], [210, 190], [100, 190]], "k mS", true) + F.text(45, 80, "water", "tb small bold") + F.text(150, 165, "dam", "tk small bold") + F.text(120, 215, "thicker at the base", "tk small bold");
    [[80, 10], [120, 22], [160, 34]].forEach(([y, L]) => { s += F.arrow(98 - L, y, 98, y, "r mid", 7); });
    return F.fig(240, 225, s, "Dams are thicker at the bottom, where the water pressure is greatest."); })(),
  (() => { let s = ""; [[20, 60], [105, 30], [160, 95]].forEach(([x, w], i) => { s += F.rect(x, 40, w, 140, "k") + F.rect(x + 1, 60, w - 2, 119, "bS nostroke"); });
    s += F.line(30, 160, 260, 160, "r d") + F.text(145, 205, "same depth → same pressure,", "tr small bold") + F.text(145, 220, "whatever the shape", "tr small bold");
    return F.fig(280, 230, s, "Pressure depends only on depth and density, not on the shape of the container."); })()
)}
<div class="callout why"><b class="t">Why divers' ears hurt</b>Every 10 m of sea water adds about 100 000 Pa, roughly the whole of atmospheric pressure. At 10 m down, the total pressure on a diver is about twice that at the surface.</div>
<details class="check"><summary>Two tanks contain water to the same depth. One is twice as wide. Compare the pressures at the bottom.</summary><div>They are the same: pressure depends on depth and density only. (The wider tank has a larger total force on its base, because the area is larger.)</div></details>`},

    { h: "Calculating liquid pressure: Δp = ρgΔh (1.8 S)", body: P`
<p class="lead">The extra pressure at a depth $\Delta h$ below the surface of a liquid is</p>
$$\Delta p=\rho g\Delta h$$
<p>$\Delta p$ in Pa, $\rho$ in <b>kg/m³</b> (not g/cm³!), $g=9.8$ N/kg, $\Delta h$ in m.</p>
${(() => { let s = F.rect(60, 40, 240, 180, "bS nostroke") + F.line(60, 40, 300, 40, "b mid") + F.rect(150, 40, 60, 120, "b thin d") + F.rect(150, 160, 60, 6, "r rF");
  s += F.dim(330, 40, 330, 160, "", "c") + F.text(322, 104, "h", "tc bold", "end") + F.text(180, 100, "column of", "tb small") + F.text(180, 116, "liquid", "tb small") + F.text(180, 186, "area A", "tr small bold");
  s += F.text(360, 70, "weight of column = mg = (ρAh)g", "tk small", "start") + F.text(360, 100, "pressure = weight ÷ area", "tk small", "start") + F.text(360, 130, "= ρAhg ÷ A", "tk small", "start") + F.text(360, 160, "= ρgh", "tc bold", "start");
  return F.fig(560, 235, s, "Derivation: the pressure on area A is the weight of the column of liquid above it, divided by A. The area cancels.", { size: "wide" }); })()}
<h3>Worked example</h3>
<p>Find the extra pressure on a diver 25 m below the surface of sea water (density 1030 kg/m³).</p>
$$\Delta p=1030\times9.8\times25=252\,000\ \text{Pa}\ (2.5\times10^5\ \text{Pa})$$
<p>If the question asks for the <b>total</b> pressure, add atmospheric pressure (about $1.0\times10^5$ Pa): total ≈ $3.5\times10^5$ Pa.</p>
${F.plot({ w: 470, h: 280, x: [0, 30], y: [0, 4], gridStep: [5, 1], ticks: { x: [10, 20, 30], y: [1, 2, 3, 4] }, xlabel: "depth / m", ylabel: "pressure / ×10⁵ Pa",
  curves: [{ f: d => 1 + 1030 * 9.8 * d / 1e5, c: "c thick", label: "total pressure", lpos: [20, 3.02], la: "end", ldx: -6, ldy: -6 }, { f: d => 1030 * 9.8 * d / 1e5, c: "b thick", label: "Δp from the water", lpos: [27, 2.73], ldy: 16, la: "end" }],
  extra: (X, Y) => F.line(X(0), Y(1), X(30), Y(1), "m d thin") + F.text(X(30), Y(1) + 16, "atmospheric pressure", "tm small", "end"),
  cap: "Pressure rises in a straight line with depth: the gradient is ρg." })}
<div class="callout exam"><b class="t">Rearranging</b>$\Delta h=\dfrac{\Delta p}{\rho g}$ and $\rho=\dfrac{\Delta p}{g\Delta h}$. Convert density to kg/m³ first: 1.2 g/cm³ = 1200 kg/m³.</div>
<details class="check"><summary>A tank holds oil (density 900 kg/m³) 2.0 m deep. Find the pressure the oil exerts on the base. The base has area 3.0 m². Find the force on it.</summary><div>$\Delta p=900\times9.8\times2.0=17\,640$ Pa. $F=pA=17\,640\times3.0=52\,920$ N (≈ 53 kN).</div></details>`},

    { h: "Extension: measuring pressure", body: P`
<p class="lead">These ideas appear in exam contexts even though you only need $p=F/A$ and $\Delta p=\rho g\Delta h$ to answer them.</p>
${F.row(
  (() => { let s = F.path("M80,30 L80,180 Q80,200 100,200 L140,200 Q160,200 160,180 L160,30", "k") + F.path("M96,30 L96,176 Q96,184 104,184 L136,184 Q144,184 144,176 L144,30", "k");
    s += F.rect(81, 120, 14, 60, "rS nostroke") + F.rect(145, 80, 14, 100, "rS nostroke") + F.rect(97, 176, 46, 8, "rS nostroke") + F.arrow(88, 14, 88, 34, "k", 7) + F.text(100, 18, "gas supply", "tk small", "start");
    s += F.dim(180, 80, 180, 120, "h", "c", -14) + F.text(120, 222, "U-tube manometer", "tk small bold");
    return F.fig(260, 235, s, "Gas pushes the liquid down on one side. The height difference h shows the excess pressure: Δp = ρgh."); })(),
  (() => { let s = F.rect(100, 30, 30, 170, "k") + F.rect(101, 70, 28, 129, "mS nostroke") + F.rect(60, 180, 110, 30, "mS m") + F.dim(150, 70, 150, 190, "760 mm", "c", -42) + F.line(130, 48, 150, 40, "m thin") + F.text(154, 42, "vacuum", "tk small", "start") + F.text(115, 225, "mercury barometer", "tk small bold");
    return F.fig(240, 235, s, "The air's pressure holds up a column of mercury about 760 mm tall: atmospheric pressure ≈ 1.0 × 10⁵ Pa."); })()
)}
<h3>Hydraulics (a famous application)</h3>
<p>Liquids are almost incompressible, so pressure applied at one point is transmitted through the whole liquid. In a car's brakes, a small force on a small piston creates a pressure; the same pressure on a large piston gives a large force: $F_2=p\times A_2$.</p>
<details class="check"><summary>A manometer containing water shows a 12 cm difference in levels. What is the excess pressure of the gas?</summary><div>$\Delta p=1000\times9.8\times0.12=1176$ Pa ≈ 1200 Pa above atmospheric.</div></details>`}
  ],
  worked: [
    { q: P`A student finds the density of an irregular stone. Mass = 156 g. Water level rises from 25.0 cm³ to 85.0 cm³. Calculate the density in g/cm³ and kg/m³. Will the stone float in mercury (13.6 g/cm³)?`,
      steps: [P`$V=85.0-25.0=60.0$ cm³.`, P`$\rho=156/60.0=2.6$ g/cm³ $=2600$ kg/m³.`, P`2.6 g/cm³ is less than 13.6 g/cm³, so the stone <b>floats</b> in mercury.`]},
    { q: P`An elephant of mass 5000 kg stands on four feet, each of area 0.10 m². A woman of mass 60 kg stands on one stiletto heel of area 1.0 cm². Compare the pressures on the ground. (g = 9.8 N/kg)`,
      steps: [P`Elephant: $F=5000\times9.8=49\,000$ N over $0.40$ m²: $p=122\,500$ Pa.`, P`Heel: $F=60\times9.8=588$ N over $1.0\times10^{-4}$ m²: $p=5\,880\,000$ Pa.`, P`The heel exerts about <b>48 times</b> the pressure of the elephant, which is why heels can dent floors.`]},
    { q: P`S: A submarine window of area 0.20 m² is 150 m below the surface of sea water (ρ = 1030 kg/m³). Find (a) the pressure due to the water, (b) the force on the window.`,
      steps: [P`(a) $\Delta p=\rho g\Delta h=1030\times9.8\times150=1.51\times10^6$ Pa.`, P`(b) $F=pA=1.51\times10^6\times0.20=3.0\times10^5$ N.`, P`That is like the weight of a 30-tonne lorry on one window, so it must be very thick.`]}
  ],
  formulas: [["Density", P`$\rho=\dfrac{m}{V}$`], ["Pressure", P`$p=\dfrac{F}{A}$`], ["Liquid pressure (S)", P`$\Delta p=\rho g\Delta h$`], ["Unit conversions", P`$1\ \text{g/cm}^3=1000\ \text{kg/m}^3;\ 1\ \text{m}^2=10^4\ \text{cm}^2$`], ["Pascal", "1 Pa = 1 N/m²"]],
  cards: [
    ["Define density", "Mass per unit volume."],
    ["Density equation", "ρ = m / V"],
    ["Units of density", "kg/m³ or g/cm³ (1 g/cm³ = 1000 kg/m³)."],
    ["Density of water", "1.0 g/cm³ = 1000 kg/m³."],
    ["How to find the volume of an irregular solid", "Displacement: rise in water level in a measuring cylinder, or overflow from a displacement can."],
    ["How to find the density of a liquid", "Mass of empty cylinder, add known volume, mass again; density = mass of liquid ÷ volume."],
    ["When does an object float?", "When its density is less than the density of the liquid."],
    ["Why does a steel ship float?", "Its average density (steel + air inside the hull) is less than water's."],
    ["Oil and water: which floats? (S)", "Oil: it is less dense (0.9 vs 1.0 g/cm³)."],
    ["Define pressure", "Force per unit area (acting perpendicular to the surface)."],
    ["Pressure equation", "p = F / A"],
    ["Unit of pressure", "Pascal (Pa) = 1 N/m²."],
    ["How to reduce pressure", "Spread the force over a larger area (snowshoes, wide tyres)."],
    ["How to increase pressure", "Concentrate the force on a smaller area (knife edge, needle)."],
    ["Two factors that increase pressure in a liquid", "Greater depth and greater density."],
    ["Does liquid pressure depend on container shape?", "No: only on depth and density (and g)."],
    ["Liquid pressure equation (S)", "Δp = ρgΔh (ρ in kg/m³, h in m)."],
    ["Why are dams thicker at the base?", "Water pressure is greatest at the bottom (greatest depth)."],
    ["Convert 250 cm² to m²", "250 ÷ 10 000 = 0.025 m²."],
    ["Pressure 10 m under the sea (approx.)", "About 1 × 10⁵ Pa extra, roughly doubling the total pressure."],
    ["Cutting a block in half: density?", "Unchanged: density is a property of the material."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`A block has mass 200 g and volume 80 cm³. Its density is`, opts: ["0.4 g/cm³", "2.5 g/cm³", "120 g/cm³", "16 000 g/cm³"], ans: 1, why: P`$200/80=2.5$.` },
    { type: "mcq", marks: 1, q: P`2.5 g/cm³ in kg/m³ is`, opts: ["0.0025", "25", "250", "2500"], ans: 3, why: P`Multiply by 1000.` },
    { type: "mcq", marks: 1, q: P`A force of 300 N acts on 0.5 m². The pressure is`, opts: ["150 Pa", "300.5 Pa", "600 Pa", "1500 Pa"], ans: 2, why: P`$300/0.5=600$ Pa.` },
    { type: "mcq", marks: 1, q: P`Which object floats in water (1.0 g/cm³)?`, opts: ["Aluminium, 2.7 g/cm³", "Ice, 0.92 g/cm³", "Glass, 2.5 g/cm³", "Plastic, 1.3 g/cm³"], ans: 1, why: P`Only ice is less dense than water.` },
    { type: "mcq", marks: 1, q: P`Pressure in a liquid does NOT depend on`, opts: ["depth", "density of the liquid", "shape of the container", "gravitational field strength"], ans: 2, why: P`$p=\rho gh$: no shape term.` },
    { type: "mcq", marks: 1, q: P`Why do tractors have wide tyres?`, opts: ["To increase friction only", "To reduce pressure on soft ground", "To increase pressure", "To reduce weight"], ans: 1, why: P`Larger area, smaller pressure: they don't sink.` },
    { type: "mcq", marks: 1, q: P`S: The pressure due to water (1000 kg/m³) at a depth of 5 m is (g = 9.8 N/kg)`, opts: ["49 Pa", "4900 Pa", "49 000 Pa", "490 000 Pa"], ans: 2, why: P`$1000\times9.8\times5=49\,000$ Pa.` },
    { type: "mcq", marks: 1, q: P`S: Liquid X (0.8 g/cm³) and liquid Y (1.2 g/cm³) don't mix. When poured together`, opts: ["X floats on Y", "Y floats on X", "They form one layer", "Both sink"], ans: 0, why: P`The less dense liquid floats on top.` },
    { type: "struct", marks: 4, q: P`Describe how to find the density of a small irregularly shaped stone. Include the measurements you would take and how you would calculate the result.`,
      ms: P`<b>B1</b> measure mass with a balance<br><b>B1</b> partly fill measuring cylinder, read volume<br><b>B1</b> lower stone in (fully submerged), read new volume; volume = difference<br><b>B1</b> density = mass ÷ volume` },
    { type: "struct", marks: 3, q: P`A box of weight 900 N has a base 1.5 m by 0.40 m. Calculate the pressure it exerts on the floor.`,
      ms: P`<b>C1</b> area $=1.5\times0.40=0.60$ m²<br><b>C1</b> $p=900/0.60$<br><b>A1</b> 1500 Pa` },
    { type: "struct", marks: 3, q: P`Explain, using the idea of pressure, why a drawing pin has a broad head and a sharp point.`,
      ms: P`<b>B1</b> same force acts on both ends<br><b>B1</b> broad head: large area, low pressure on thumb (doesn't hurt)<br><b>B1</b> sharp point: tiny area, very high pressure, pierces the board` },
    { type: "struct", marks: 3, q: P`Describe how the pressure at the bottom of a swimming pool would change if (a) the pool were filled deeper, (b) it were filled with sea water instead of fresh water, (c) the pool were made wider but kept at the same depth.`,
      ms: P`<b>B1</b> (a) increases<br><b>B1</b> (b) increases (sea water is denser)<br><b>B1</b> (c) no change` },
    { type: "struct", marks: 3, q: P`S: A diver is at a depth of 18 m in water of density 1000 kg/m³. Atmospheric pressure is 1.0 × 10⁵ Pa. Calculate the total pressure on the diver.`,
      ms: P`<b>C1</b> $\Delta p=1000\times9.8\times18=176\,400$ Pa<br><b>C1</b> add atmospheric pressure<br><b>A1</b> $2.8\times10^5$ Pa` },
    { type: "struct", marks: 3, q: P`A 5.0 cm cube of a material has a mass of 1000 g. Calculate its density and decide whether it floats on water. Explain.`,
      ms: P`<b>C1</b> $V=125$ cm³<br><b>A1</b> $\rho=8.0$ g/cm³<br><b>B1</b> sinks: denser than water (1.0 g/cm³)` },
    { type: "struct", marks: 2, q: P`Explain why a steel ship floats although steel is about eight times denser than water.`,
      ms: P`<b>B1</b> the hull contains a large volume of air<br><b>B1</b> so the average density of the ship is less than that of water` },
    { type: "struct", marks: 3, q: P`S: Water tank: the pressure at the base due to water is 24 500 Pa. Calculate the depth of water. (ρ = 1000 kg/m³, g = 9.8 N/kg)`,
      ms: P`<b>C1</b> $\Delta h=\Delta p/(\rho g)$<br><b>C1</b> $24\,500/(1000\times9.8)$<br><b>A1</b> 2.5 m` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: P`State the unit of pressure.`, ms: P`<b>B1</b> pascal (Pa) or N/m²` },
    { d: 1, type: "struct", marks: 2, q: P`Define density and give its SI unit.`, ms: P`<b>B1</b> mass per unit volume<br><b>B1</b> kg/m³` },
    { d: 1, type: "mcq", marks: 1, q: P`A cube of side 2 cm has a volume of`, opts: ["4 cm³", "6 cm³", "8 cm³", "12 cm³"], ans: 2, why: P`$2\times2\times2=8$.` },
    { d: 1, type: "struct", marks: 2, q: P`Give one example where a large area is used to reduce pressure, and one where a small area is used to increase pressure.`, ms: P`<b>B1</b> e.g. snowshoes / wide tyres / foundations<br><b>B1</b> e.g. knife blade / needle / nail point` },
    { d: 1, type: "struct", marks: 2, q: P`State two ways the pressure at a point in a liquid can be increased.`, ms: P`<b>B1</b> go deeper<br><b>B1</b> use a denser liquid` },
    { d: 2, type: "struct", marks: 3, q: P`A measuring cylinder has mass 120 g empty. With 50 cm³ of a liquid it has mass 160 g. Calculate the density of the liquid in kg/m³.`, ms: P`<b>C1</b> mass of liquid 40 g<br><b>C1</b> $40/50=0.80$ g/cm³<br><b>A1</b> 800 kg/m³` },
    { d: 2, type: "struct", marks: 3, q: P`A girl of weight 480 N wears skis with a total area of 0.30 m². Calculate the pressure on the snow, and explain why she does not sink in the way she would in ordinary shoes.`, ms: P`<b>C1</b> $480/0.30$<br><b>A1</b> 1600 Pa<br><b>B1</b> shoes have much smaller area, so much higher pressure; skis spread the weight` },
    { d: 2, type: "mcq", marks: 1, q: P`A gold bar (19.3 g/cm³) has a volume of 50 cm³. Its mass is`, opts: ["0.39 g", "2.6 g", "965 g", "1930 g"], ans: 2, why: P`$m=\rho V=19.3\times50=965$ g.` },
    { d: 2, type: "struct", marks: 3, q: P`S: Calculate the pressure due to the water at the bottom of a 3.5 m deep pool. (ρ = 1000 kg/m³, g = 9.8 N/kg). Explain why the pressure at the bottom is not affected by the area of the pool.`, ms: P`<b>C1</b> $1000\times9.8\times3.5$<br><b>A1</b> 34 300 Pa<br><b>B1</b> pressure depends only on depth and density; bigger area holds more water but force per unit area is the same` },
    { d: 3, type: "struct", marks: 5, q: P`A cork of mass 12 g and volume 50 cm³ is tied to a lead sinker of mass 113 g and volume 10 cm³. (a) Calculate the density of the cork and of the lead. (b) Calculate the average density of the combination and decide whether it floats in water. (c) Explain how the sinker could be used to measure the volume of the cork by displacement.`, ms: P`<b>(a) A1</b> cork 0.24 g/cm³<br><b>A1</b> lead 11.3 g/cm³<br><b>(b) A1</b> 125 g / 60 cm³ = 2.08 g/cm³: sinks<br><b>(c) B1</b> measure displacement of sinker alone, then sinker + cork together<br><b>B1</b> volume of cork = difference` },
    { d: 3, type: "struct", marks: 5, q: P`S: A water storage tank on a tower is 12 m above a tap. (a) Calculate the extra water pressure at the tap due to the height. (b) The tap opening has area 2.0 cm². Calculate the force of the water on a thumb held over the opening. (c) Explain why water companies build tanks on high ground.`, ms: P`<b>(a) C1</b> $1000\times9.8\times12$<br><b>A1</b> 117 600 Pa<br><b>(b) C1</b> $A=2.0\times10^{-4}$ m²<br><b>A1</b> $F=pA=23.5$ N (≈ 24 N)<br><b>(c) B1</b> greater height of water gives greater pressure at taps, so water flows strongly without pumps` },
    { d: 3, type: "struct", marks: 4, q: P`S: In a U-tube manometer containing water, a gas supply pushes the water so that the levels differ by 25 cm. (a) Calculate the gas pressure above atmospheric. (b) What would the height difference be with mercury (13 600 kg/m³)? (c) Why is mercury used for high pressures?`, ms: P`<b>(a) A1</b> $1000\times9.8\times0.25=2450$ Pa<br><b>(b) C1</b> $h=2450/(13\,600\times9.8)$<br><b>A1</b> 0.018 m (1.8 cm)<br><b>(c) B1</b> much denser, so a shorter column is needed for the same pressure` }
  ]
});
}
