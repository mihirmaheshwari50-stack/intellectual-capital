window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;

/* ============================================================
   MENSURATION  (0580: E5.1 – E5.4)
   ============================================================ */
TOPICS.push({
  id: "mensuration", subject: "maths", unit: 5, title: "Mensuration",
  blurb: "Perimeter and area of 2D shapes, circles, arcs and sectors, surface area and volume of prisms, cylinders, pyramids, cones and spheres, and compound shapes.",
  level: "Core → Extended", demo: "solids",
  syllabus: [
    ["E5.1", "Use units of measure: mm, cm, m, km; mm², cm², m², km²; mm³, cm³, m³; litres, ml", 0],
    ["E5.2", "Carry out calculations involving perimeter and area of a rectangle, triangle, parallelogram and trapezium", 1],
    ["E5.2", "Carry out calculations involving the circumference and area of a circle", 2],
    ["E5.2", "Carry out calculations involving arc length and sector area as fractions of the circumference and area of a circle", 3],
    ["E5.2", "Carry out calculations involving the surface area and volume of a cuboid, prism and cylinder", 4],
    ["E5.2", "Carry out calculations involving the surface area and volume of a sphere, pyramid and cone", 5],
    ["E5.3", "Carry out calculations involving areas and volumes of compound shapes", 6],
    ["E5.4", "Carry out calculations involving the areas and volumes of compound shapes and more complex figures", 6]
  ],
  sections: [
    { h: "Units of measurement (E5.1)", body: M`
<table class="t"><tr><th>Length</th><th>Conversion</th><th>Area</th><th>Conversion</th><th>Volume</th><th>Conversion</th></tr>
<tr><td>1 cm</td><td>= 10 mm</td><td>1 cm²</td><td>= 100 mm²</td><td>1 cm³</td><td>= 1000 mm³</td></tr>
<tr><td>1 m</td><td>= 100 cm</td><td>1 m²</td><td>= 10 000 cm²</td><td>1 m³</td><td>= 1 000 000 cm³</td></tr>
<tr><td>1 km</td><td>= 1000 m</td><td>1 km²</td><td>= 1 000 000 m²</td><td>1 litre</td><td>= 1000 cm³ (= 1000 ml)</td></tr></table>
<div class="callout warn"><b class="t">Common slip</b>Converting area or volume units is <b>not</b> the same factor as length: 1 m² = 100² = 10 000 cm², not 100 cm². 1 m³ = 100³ = 1 000 000 cm³.</div>`},

    { h: "Perimeter and area of basic shapes (E5.2)", body: M`
<table class="t"><tr><th>Shape</th><th>Area</th><th>Notes</th></tr>
<tr><td>Rectangle</td><td>$l\times w$</td><td>Perimeter $=2(l+w)$</td></tr>
<tr><td>Triangle</td><td>$\tfrac12\times\text{base}\times\text{height}$</td><td>Height is the <b>perpendicular</b> height</td></tr>
<tr><td>Parallelogram</td><td>$\text{base}\times\text{height}$</td><td>Perpendicular height between the parallel sides</td></tr>
<tr><td>Trapezium</td><td>$\tfrac12(a+b)h$</td><td>$a$, $b$ are the parallel sides, $h$ the perpendicular distance between them</td></tr></table>
${(() => { let s = F.poly([[20, 100], [140, 100], [100, 20], [60, 20]], "k cS", true) + F.line(60, 100, 60, 20, "r d") + F.text(100, 120, "a", "tk small") + F.text(80, 10, "b", "tk small") + F.text(40, 60, "h", "tr small");
  return F.fig(160, 135, s, "Trapezium: area = ½(a + b)h.", { size: "tiny" }); })()}
<details class="check"><summary>A trapezium has parallel sides 8 cm and 14 cm and height 5 cm. Find its area.</summary><div>½(8 + 14)(5) = 55 cm².</div></details>`},

    { h: "Circles: circumference and area (E5.2)", body: M`
<p class="eq">$$\text{circumference}=\pi d=2\pi r\qquad \text{area}=\pi r^2$$</p>
${(() => { let s = F.circ(90, 90, 70, "c cS") + F.line(90, 90, 160, 90, "r thick") + F.text(125, 82, "r", "tr bold") + F.circ(260, 90, 70, "o oS") + F.line(190, 90, 330, 90, "b thick") + F.text(260, 108, "d", "tb bold");
  return F.fig(400, 180, s, "Use the radius for area, diameter or radius for circumference — read which one the question gives you.", { size: "small" }); })()}
<ul><li>Circumference of a circle with $d=12$ cm: $\pi\times12=37.7$ cm (3 s.f.).</li><li>Area with $r=5$ cm: $\pi\times25=78.5$ cm².</li></ul>
<div class="callout warn"><b class="t">Radius vs diameter</b>Check which one is given. If a question gives the diameter, halve it before using the area formula.</div>
<details class="check"><summary>A circle has area 154 cm². Find its radius (take π = 22/7).</summary><div>$r^2=154\div(22/7)=49$, so $r=7$ cm.</div></details>`},

    { h: "Arcs and sectors (E5.2)", body: M`
<div class="viz" data-viz="sectorFraction"></div>
<p class="eq">$$\text{arc length}=\frac{\theta}{360}\times2\pi r\qquad \text{sector area}=\frac{\theta}{360}\times\pi r^2$$</p>
<div class="callout ex"><b class="t">Worked example</b>A sector has radius 9 cm and angle $140°$. Find its arc length and area.<br>Arc $=\dfrac{140}{360}\times2\pi(9)=22.0$ cm. Area $=\dfrac{140}{360}\times\pi(9)^2=99.0$ cm².</div>
<p>The <b>perimeter</b> of a sector = arc length + <b>two radii</b> (easy to forget).</p>
<details class="check"><summary>A sector has arc length 15.7 cm and radius 6 cm. Find the angle at the centre.</summary><div>$\dfrac{\theta}{360}\times2\pi(6)=15.7\Rightarrow\theta=150°$ (to 3 s.f.).</div></details>`},

    { h: "Prisms, cylinders: volume and surface area (E5.2)", body: M`
<div class="viz" data-viz="prismVolume"></div>
<p class="eq">$$\text{volume of a prism}=\text{area of cross-section}\times\text{length}$$</p>
<table class="t"><tr><th>Shape</th><th>Volume</th><th>Surface area</th></tr>
<tr><td>Cuboid</td><td>$lwh$</td><td>$2(lw+lh+wh)$</td></tr>
<tr><td>Prism (any cross-section)</td><td>$A\times L$</td><td>$2A+(\text{perimeter of }A)\times L$</td></tr>
<tr><td>Cylinder</td><td>$\pi r^2h$</td><td>$2\pi r^2+2\pi rh$</td></tr></table>
<div class="callout ex"><b class="t">Example</b>A triangular prism has a cross-section of area 24 cm² (perimeter 20 cm) and length 15 cm. Find its volume and surface area.<br>Volume $=24\times15=360$ cm³.<br>Surface area $=2(24)+20(15)=48+300=348$ cm².</div>`},

    { h: "Pyramids, cones and spheres (E5.2)", body: M`
<table class="t"><tr><th>Shape</th><th>Volume</th><th>Curved/total surface area</th></tr>
<tr><td>Pyramid</td><td>$\tfrac13\times\text{base area}\times h$</td><td>base + triangular faces (use slant height for each)</td></tr>
<tr><td>Cone</td><td>$\tfrac13\pi r^2h$</td><td>curved: $\pi rl$; total: $\pi r^2+\pi rl$</td></tr>
<tr><td>Sphere</td><td>$\tfrac43\pi r^3$</td><td>$4\pi r^2$</td></tr></table>
<p>For a cone, the <b>slant height</b> $l$ relates to the radius and vertical height by Pythagoras: $l^2=r^2+h^2$.</p>
${(() => { let s = F.path("M60,150 L140,150 L100,30 Z", "k") + F.path("M60,150 Q100,165 140,150", "k") + F.line(100, 150, 100, 30, "r d") + F.line(140, 150, 100, 30, "b thick") + F.text(115, 90, "h", "tr small") + F.text(135, 90, "l", "tb small", "start");
  return F.fig(200, 170, s, "Cone: h is the vertical height, l is the slant height (the sloped distance).", { size: "small" }); })()}
<div class="callout ex"><b class="t">Worked example</b>A cone has radius 6 cm and vertical height 8 cm. Find its slant height, volume and total surface area.<br>$l=\sqrt{36+64}=10$ cm.<br>Volume $=\tfrac13\pi(36)(8)=301.6$ cm³.<br>Total SA $=\pi(36)+\pi(6)(10)=\pi(96)=301.6$ cm².</div>
<p>Use the <b>3D solids lab</b> at the bottom of the page to calculate any shape's volume and surface area instantly.</p>`},

    { h: "Compound shapes (E5.3, E5.4)", body: M`
<p class="lead">Split a compound shape into simple pieces: <b>add</b> areas/volumes you include, <b>subtract</b> holes or removed pieces.</p>
${(() => { let s = F.rect(20, 20, 160, 100, "c cS") + F.circ(180, 70, 40, "o oS") + F.text(100, 140, "rectangle + semicircle", "tk small bold", "middle");
  return F.fig(260, 155, s, "A compound shape: find each simple area and add them.", { size: "small" }); })()}
<div class="callout ex"><b class="t">Example: L-shape</b>A rectangle $10\times8$ has a $4\times3$ rectangle removed from one corner. Area $=10\times8-4\times3=80-12=68$ cm².</div>
<div class="callout ex"><b class="t">Example: hemisphere on a cylinder</b>A solid is a cylinder (radius 5, height 12) topped with a hemisphere (radius 5). Total volume $=\pi(5)^2(12)+\tfrac12\times\tfrac43\pi(5)^3=300\pi+\tfrac{250}{3}\pi=1204.3$ cm³ (3 s.f.). Total surface area (closed base, curved top) = base circle + cylinder's curved surface + hemisphere's curved surface $=\pi(25)+2\pi(5)(12)+2\pi(25)=25\pi+120\pi+50\pi=195\pi=612.6$ cm².</div>
<div class="callout warn"><b class="t">Surface area of composite solids</b>Where two solids join, the <b>joining faces are internal</b> and must be left out of the total surface area (e.g. the circle where the hemisphere meets the cylinder is not an outside surface).</div>
<details class="check"><summary>A running track is a 100 m by 60 m rectangle with a semicircle (radius 30 m) on each end. Find its perimeter (take π = 3.14).</summary><div>Two straights (100 m each) + two full circles' worth of semicircle arcs (= one full circle, circumference 2π(30) = 188.4 m): 100 + 100 + 188.4 = 388.4 m.</div></details>`}
  ],
  worked: [
    { q: M`A sector of a circle, radius 8 cm, has an area of 50.3 cm². Find the angle at the centre and the perimeter of the sector.`,
      steps: [M`$\dfrac{\theta}{360}\times\pi(64)=50.3\Rightarrow\theta=\dfrac{50.3\times360}{64\pi}=90.1°\approx90°$.`, M`Arc length $=\dfrac{90}{360}\times2\pi(8)=12.57$ cm.`, M`Perimeter $=12.57+8+8=28.6$ cm.`]},
    { q: M`A cylinder has radius 4 cm and height 10 cm. A cone with the same radius and height 6 cm is removed from the top (same base). Find the remaining volume.`,
      steps: [M`Cylinder volume $=\pi(16)(10)=502.7$ cm³.`, M`Cone volume $=\tfrac13\pi(16)(6)=100.5$ cm³.`, M`Remaining $=502.7-100.5=402.1$ cm³.`]},
    { q: M`A sphere has volume $972\pi$ cm³. Find its radius and surface area.`,
      steps: [M`$\tfrac43\pi r^3=972\pi\Rightarrow r^3=729\Rightarrow r=9$ cm.`, M`Surface area $=4\pi(81)=324\pi=1017.9$ cm².`]}
  ],
  formulas: [["Trapezium area", M`$\tfrac12(a+b)h$`], ["Circle", M`$C=2\pi r,\ A=\pi r^2$`], ["Arc / sector", M`$\dfrac{\theta}{360}\times2\pi r$ / $\dfrac{\theta}{360}\times\pi r^2$`], ["Prism volume", "area × length"], ["Cylinder", M`$V=\pi r^2h,\ S=2\pi r^2+2\pi rh$`], ["Cone", M`$V=\tfrac13\pi r^2h,\ S=\pi r^2+\pi rl$`], ["Sphere", M`$V=\tfrac43\pi r^3,\ S=4\pi r^2$`], ["Pyramid", M`$V=\tfrac13\times\text{base}\times h$`]],
  cards: [
    ["1 m² in cm²", "10 000 cm²"],
    ["1 m³ in cm³", "1 000 000 cm³"],
    ["1 litre in cm³", "1000 cm³"],
    ["Trapezium area formula", "½(a + b)h"],
    ["Circumference formula", "2πr (or πd)"],
    ["Circle area formula", "πr²"],
    ["Arc length formula", "(θ/360) × 2πr"],
    ["Sector area formula", "(θ/360) × πr²"],
    ["Sector perimeter", "arc length + 2 radii"],
    ["Prism volume", "cross-sectional area × length"],
    ["Cylinder volume", "πr²h"],
    ["Cone volume", "⅓πr²h"],
    ["Sphere volume", "4/3 πr³"],
    ["Sphere surface area", "4πr²"],
    ["Cone slant height", "l² = r² + h² (Pythagoras)"],
    ["Pyramid volume", "⅓ × base area × height"],
    ["Internal joining faces in composite SA", "Excluded from the total surface area"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`The area of a circle with radius 6 cm is`, opts: ["18.8 cm²", "37.7 cm²", "113 cm²", "226 cm²"], ans: 2, why: M`$\pi(36)$.` },
    { type: "mcq", marks: 1, q: M`A sector has angle 90° and radius 4 cm. Its area is`, opts: ["$4\pi$", "$8\pi$", "$12.6$ cm²", "both A and C"], ans: 3, why: M`$\tfrac14\pi(16)=4\pi=12.57$.` },
    { type: "mcq", marks: 1, q: M`The volume of a cylinder with radius 3 and height 10 is`, opts: ["30π", "90π", "60π", "900π"], ans: 1, why: M`$\pi(9)(10)$.` },
    { type: "mcq", marks: 1, q: M`A sphere has radius 3 cm. Its surface area is`, opts: ["$12\pi$", "$36\pi$", "$9\pi$", "$27\pi$"], ans: 1, why: M`$4\pi(9)$.` },
    { type: "struct", marks: 2, q: M`Find the area of a trapezium with parallel sides 6 cm and 10 cm and height 4 cm.`, ms: M`<b>M1</b> $\tfrac12(6+10)(4)$<br><b>A1</b> 32 cm²` },
    { type: "struct", marks: 3, q: M`A sector has radius 10 cm and angle 72°. Find its arc length and area (in terms of π or to 3 s.f.).`, ms: M`<b>M1</b> $\tfrac{72}{360}\times2\pi(10)$<br><b>A1</b> 12.6 cm<br><b>A1</b> area 62.8 cm²` },
    { type: "struct", marks: 3, q: M`A cone has radius 5 cm and slant height 13 cm. Find its vertical height and total surface area.`, ms: M`<b>M1</b> $h=\sqrt{13^2-5^2}=12$ cm<br><b>M1</b> $\pi(25)+\pi(5)(13)$<br><b>A1</b> 282.7 cm²` },
    { type: "struct", marks: 3, q: M`A solid metal cube of side 6 cm is melted and recast into a sphere. Find the radius of the sphere.`, ms: M`<b>M1</b> cube volume $=216$<br><b>M1</b> $\tfrac43\pi r^3=216$<br><b>A1</b> $r=3.72$ cm` },
    { type: "struct", marks: 4, q: M`A swimming pool is a prism: a cross-section that is a trapezium with parallel sides 1 m and 2 m and height (width) 25 m, and the pool is 10 m wide. Find its volume.`, ms: M`<b>M1</b> cross-section area $=\tfrac12(1+2)\times25=37.5$ m²<br><b>M1</b> volume $=37.5\times10$<br><b>A1</b> 375 m³` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: M`Find the area of a rectangle measuring 7.5 cm by 4 cm.`, ms: M`<b>M1</b> $7.5\times4$<br><b>A1</b> 30 cm²` },
    { d: 1, type: "struct", marks: 2, q: M`Find the circumference of a circle with diameter 20 cm, giving your answer to 3 s.f.`, ms: M`<b>M1</b> $\pi\times20$<br><b>A1</b> 62.8 cm` },
    { d: 1, type: "mcq", marks: 1, q: M`A prism's cross-sectional area is 15 cm² and its length is 8 cm. Its volume is`, opts: ["23 cm³", "60 cm³", "120 cm³", "1.875 cm³"], ans: 2, why: M`$15\times8$.` },
    { d: 1, type: "struct", marks: 2, q: M`Convert 3.4 m² into cm².`, ms: M`<b>M1</b> $\times10\,000$<br><b>A1</b> 34 000 cm²` },
    { d: 2, type: "struct", marks: 3, q: M`A sector has area 33.5 cm² and radius 8 cm. Find the angle at the centre.`, ms: M`<b>M1</b> $\dfrac{\theta}{360}\times\pi(64)=33.5$<br><b>M1</b> $\theta=\dfrac{33.5\times360}{64\pi}$<br><b>A1</b> 60.0°` },
    { d: 2, type: "struct", marks: 3, q: M`A cylinder has volume 942 cm³ and height 12 cm. Find its radius, to 3 s.f.`, ms: M`<b>M1</b> $\pi r^2(12)=942$<br><b>M1</b> $r^2=25$<br><b>A1</b> 5.00 cm` },
    { d: 2, type: "struct", marks: 3, q: M`Find the volume of a square-based pyramid with base side 6 cm and height 10 cm.`, ms: M`<b>M1</b> base area $=36$<br><b>M1</b> $\tfrac13\times36\times10$<br><b>A1</b> 120 cm³` },
    { d: 2, type: "struct", marks: 4, q: M`A shape is a semicircle of radius 7 cm attached to a rectangle 14 cm by 10 cm. Find the total area (take π = 22/7).`, ms: M`<b>M1</b> rectangle $=140$<br><b>M1</b> semicircle $=\tfrac12\times\tfrac{22}{7}\times49=77$<br><b>A1</b> total 217 cm²` },
    { d: 3, type: "struct", marks: 5, q: M`A solid consists of a hemisphere of radius 6 cm fixed on top of a cylinder of radius 6 cm and height 10 cm. Find the total volume and total surface area, leaving your answers in terms of π.`, ms: M`<b>M1</b> cylinder volume $=\pi(36)(10)=360\pi$<br><b>M1</b> hemisphere volume $=\tfrac12\times\tfrac43\pi(216)=144\pi$<br><b>A1</b> total volume $504\pi$ cm³<br><b>M1</b> SA: base $\pi(36)$ + curved cylinder $2\pi(6)(10)=120\pi$ + curved hemisphere $2\pi(36)=72\pi$<br><b>A1</b> total SA $=228\pi$ cm²` },
    { d: 3, type: "struct", marks: 4, q: M`Two similar cones have heights 4 cm and 10 cm. The smaller has volume 16π cm³. Find the volume of the larger, and the slant height of the larger if the smaller has slant height 5 cm.`, ms: M`<b>M1</b> scale factor $=2.5$<br><b>M1</b> volume factor $=15.625$<br><b>A1</b> $250\pi$ cm³<br><b>A1</b> slant height $=5\times2.5=12.5$ cm` },
    { d: 3, type: "struct", marks: 4, q: M`A cone of radius 9 cm and height 12 cm has the top third of its height (a smaller similar cone) cut off and removed. Find the volume of the remaining frustum.`, ms: M`<b>M1</b> full cone volume $=\tfrac13\pi(81)(12)=324\pi$<br><b>M1</b> small cone: height 4, radius 3 (scale $\tfrac13$), volume $=324\pi\times(\tfrac13)^3=12\pi$<br><b>A1</b> frustum $=324\pi-12\pi=312\pi$ cm³<br><b>A1</b> ≈ 980 cm³ (3 s.f.)` }
  ]
});
}
