window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
// exact ray diagram for a thin converging lens. u, f in px; object height h px.
const rays = (u, f, cap, o = {}) => {
  const W = o.W || 600, H = o.H || 260, Lx = o.Lx || 300, ax = H / 2 + 10, h = o.h || 50, ox = Lx - u, oy = ax - h, v = u * f / (u - f), hi = -h * v / u;
  const cl = (x1, y1, x2, y2, X) => { let Y = y1 + (y2 - y1) * (X - x1) / (x2 - x1); const lim = Y < 6 ? 6 : Y > H - 6 ? H - 6 : null; if (lim !== null) { X = x1 + (x2 - x1) * (lim - y1) / (y2 - y1); Y = lim; } return [X, Y]; };
  let s = F.line(10, ax, W - 10, ax, "m thin") + `<ellipse cx="${Lx}" cy="${ax}" rx="9" ry="${H / 2 - 16}" class="b bS mid"/>`;
  [-1, 1].forEach(g => { s += F.dot(Lx + g * f, ax, "k", 3.5) + F.text(Lx + g * f, ax + 18, "F", "tk small bold"); if (Lx + g * 2 * f > 15 && Lx + g * 2 * f < W - 15) s += F.dot(Lx + g * 2 * f, ax, "m", 3) + F.text(Lx + g * 2 * f, ax + 18, "2F", "tm small"); });
  s += F.arrow(ox, ax, ox, oy, "o thick", 10) + F.text(ox, ax + 36, "object", "to small bold");
  const real = u > f;
  // ray 1: parallel, then through far F
  let e = cl(Lx, oy, Lx + f, ax, W - 10); s += F.line(ox, oy, Lx, oy, "r mid") + F.line(Lx, oy, e[0], e[1], "r mid");
  // ray 2: through the centre
  e = cl(ox, oy, Lx, ax, W - 10); s += F.line(ox, oy, e[0], e[1], "g mid");
  if (real) { // ray 3: through near F, then parallel
    const yl = ax + (oy - ax) * f / (f - u); if (Math.abs(yl - ax) < H / 2 - 16) s += F.line(ox, oy, Lx, yl, "k mid") + F.line(Lx, yl, W - 10, yl, "k mid");
    if (Lx + v < W - 10) s += F.arrow(Lx + v, ax, Lx + v, ax - hi, "k thick", 10) + F.text(Lx + v + 6, ax - hi + 18, "image", "tk small bold", "start");
  } else if (u < f) {
    const vx = Lx + v; s += F.line(Lx, oy, vx, ax - hi, "m d") + F.line(Lx, ax, vx, ax - hi, "m d") + F.arrow(vx, ax, vx, ax - hi, "m thick d", 10) + F.text(vx, ax - hi - 12, "virtual image", "tm small bold");
  }
  return F.fig(W, H, s, cap, { size: o.size || "wide" }); };
const eyeball = (x, y, r = 50) => F.circ(x, y, r, "k") + `<ellipse cx="${x - r + 10}" cy="${y}" rx="8" ry="${r * .55}" class="b bS"/>` + F.text(x + r + 8, y - r + 6, "retina", "tm small", "start");
//@@HELPERS-END

/* ============================================================
   THIN LENSES  (0625: 3.2.3)
   ============================================================ */
TOPICS.push({
  id: "lenses", subject: "physics", unit: 3, title: "Thin lenses",
  blurb: "Converging and diverging lenses, focal length, ray diagrams for real and virtual images, magnifying glasses, and correcting eyesight.",
  level: "Core → Supplement", demo: "lens",
  syllabus: [
    ["3.2.3", "Describe the action of thin converging and thin diverging lenses on a parallel beam of light", 0],
    ["3.2.3", "Define and use the terms focal length, principal axis and principal focus (focal point)", 1],
    ["3.2.3", "Draw and use ray diagrams for the formation of a real image by a converging lens", 2],
    ["3.2.3", "Describe the characteristics of an image: enlarged/same size/diminished, upright/inverted, real/virtual", 3],
    ["3.2.3", "A virtual image is formed when diverging rays are extrapolated backwards; it cannot be projected on a screen", 4],
    ["3.2.3 S", "Draw and use ray diagrams for the formation of a virtual image by a converging lens", 4],
    ["3.2.3 S", "Describe the use of a single lens as a magnifying glass", 5],
    ["3.2.3 S", "Show understanding of the terms real image and virtual image", 4],
    ["3.2.3 S", "Describe the use of converging and diverging lenses to correct long-sightedness and short-sightedness", 6]
  ],
  sections: [
    { h: "Converging and diverging lenses (3.2.3)", body: P`
<p class="lead">A lens is a shaped piece of glass or plastic that <b>refracts</b> light at both surfaces. Its shape decides whether it brings light rays together or spreads them out.</p>
${F.row(
  (() => { let s = F.line(10, 110, 310, 110, "m thin") + `<ellipse cx="160" cy="110" rx="12" ry="90" class="b bS mid"/>`;
    [-60, -30, 0, 30, 60].forEach(d => { s += F.arrow(10, 110 + d, 150, 110 + d, "r mid", 0.1) + F.line(160, 110 + d, 250, 110, "r mid") + F.line(250, 110, 300, 110 - d * 50 / 90, "r thin d"); });
    s += F.dot(250, 110, "k", 4) + F.text(250, 160, "principal focus F", "tk small bold") + F.dim(160, 196, 250, 196, "f", "c", 14);
    return F.fig(320, 225, s, "<b>Converging (convex) lens</b>: thicker in the middle. Rays parallel to the axis are brought together at the principal focus."); })(),
  (() => { let s = F.line(10, 110, 310, 110, "m thin") + F.path("M150,20 Q168,110 150,200 L176,200 Q158,110 176,20 Z", "b bS mid");
    [-60, -30, 0, 30, 60].forEach(d => { const xe = d ? Math.min(310, 163 + (105 - Math.abs(d)) * 90 / Math.abs(d)) : 310; s += F.line(10, 110 + d, 160, 110 + d, "r mid") + F.line(163, 110 + d, xe, 110 + d + (xe - 163) * d / 90, "r mid") + F.line(163, 110 + d, 73, 110, "m thin d"); });
    s += F.dot(73, 110, "k", 4) + F.text(73, 132, "F (virtual)", "tk small bold");
    return F.fig(320, 225, s, "<b>Diverging (concave) lens</b>: thinner in the middle. Parallel rays spread out as if they came from a principal focus on the same side."); })()
)}
<div class="callout why"><b class="t">Why they bend light this way</b>Each part of a lens acts like a small prism. In a converging lens, the prisms near the edges point their thick ends towards the centre, so rays near the edge are bent most, towards the axis. A diverging lens is the opposite.</div>
<p>In ray diagrams we draw a thin lens as a straight line with arrowheads, and treat all the bending as happening at the centre line of the lens.</p>
<details class="check"><summary>How can you tell a converging lens from a diverging lens by touch?</summary><div>A converging lens is thicker in the middle than at the edges; a diverging lens is thinner in the middle.</div></details>`},

    { h: "Key terms: principal axis, principal focus, focal length (3.2.3)", body: P`
<ul><li><b>Principal axis</b>: the line through the centre of the lens, at 90° to its surfaces.</li>
<li><b>Principal focus (focal point), F</b>: the point on the principal axis where rays parallel to the axis are brought to a focus (converging lens) or appear to come from (diverging lens). A lens has a focal point on each side, the same distance away.</li>
<li><b>Focal length, f</b>: the distance from the centre of the lens to the principal focus.</li></ul>
<p>A <b>fatter</b> (more curved) lens bends light more, so it has a <b>shorter</b> focal length: it is a more powerful lens.</p>
<h3>Measuring the focal length of a converging lens</h3>
${(() => { let s = F.rect(20, 60, 60, 40, "o oS o", 4) + F.text(50, 50, "distant window", "to small bold") + F.line(80, 80, 330, 80, "m thin d") + `<ellipse cx="330" cy="80" rx="8" ry="44" class="b bS mid"/>` + F.rect(470, 30, 10, 100, "k mS");
  s += F.line(338, 70, 470, 82, "r thin") + F.line(338, 90, 470, 78, "r thin") + F.text(475, 22, "screen", "tk small bold") + F.dim(330, 150, 470, 150, "focal length (when the image is sharp)", "c", 14);
  return F.fig(540, 180, s, "Focus an image of a distant object (a window or tree) onto a screen. Rays from far away are almost parallel, so the lens-to-screen distance is the focal length.", { size: "wide" }); })()}`},

    { h: "Ray diagrams for real images (3.2.3)", body: P`
<p class="lead">To find an image you need just <b>two</b> of three standard rays from the top of the object. Where they meet (after the lens) is the top of the image.</p>
<ol class="steps-inline"><li><b style="color:var(--bad)">Ray 1</b>: parallel to the principal axis → refracted through the principal focus F on the far side.</li>
<li><b style="color:var(--chem)">Ray 2</b>: through the centre of the lens → passes straight through, undeviated.</li>
<li><b>Ray 3</b>: through F on the near side → refracted to leave parallel to the axis.</li></ol>
<div class="viz" data-viz="lensMove"></div>
<h3>Object beyond 2F</h3>
${rays(200, 70, "Image: <b>real, inverted, diminished</b>, between F and 2F on the other side. Used in a <b>camera</b> and the <b>eye</b>.")}
<h3>Object at 2F</h3>
${rays(140, 70, "Image: <b>real, inverted, same size</b>, at 2F on the other side.")}
<h3>Object between F and 2F</h3>
${rays(105, 70, "Image: <b>real, inverted, enlarged</b>, beyond 2F. Used in a <b>projector</b>.", { Lx: 230, W: 600 })}
<div class="callout exam"><b class="t">Drawing them well</b><ul><li>Use a ruler and a sharp pencil; put arrowheads on rays to show direction.</li><li>Rays from the top of the object, refracted at the lens's centre line.</li><li>The object is normally drawn on the axis, so the image is too: you only need to find the top.</li><li>Measure image distance and height to scale if asked.</li></ul></div>`},

    { h: "Describing an image (3.2.3)", body: P`
<p class="lead">Every image is described with three pairs of words.</p>
<table class="t"><tr><th>Question</th><th>Choices</th></tr>
<tr><td>Size compared with the object?</td><td><b>enlarged</b> / <b>same size</b> / <b>diminished</b></td></tr>
<tr><td>Which way up?</td><td><b>upright</b> / <b>inverted</b></td></tr>
<tr><td>Can it be caught on a screen?</td><td><b>real</b> / <b>virtual</b></td></tr></table>
<h3>The full pattern for a converging lens</h3>
<table class="t"><tr><th>Object position</th><th>Image position</th><th>Image</th><th>Use</th></tr>
<tr><td>Very far away</td><td>At F</td><td>Real, inverted, diminished (a point)</td><td>Measuring f; telescope objective</td></tr>
<tr><td>Beyond 2F</td><td>Between F and 2F</td><td>Real, inverted, diminished</td><td>Camera, eye</td></tr>
<tr><td>At 2F</td><td>At 2F</td><td>Real, inverted, same size</td><td>Photocopier (1:1)</td></tr>
<tr><td>Between F and 2F</td><td>Beyond 2F</td><td>Real, inverted, enlarged</td><td>Projector</td></tr>
<tr><td>At F</td><td>No image (at infinity)</td><td>Rays emerge parallel</td><td>Spotlight, torch</td></tr>
<tr><td>Inside F</td><td>Same side as object</td><td>Virtual, upright, enlarged</td><td>Magnifying glass</td></tr></table>
<p><b>Magnification</b> = image height ÷ object height (= image distance ÷ object distance). It has no unit.</p>
<details class="check"><summary>An object is 30 cm from a lens with f = 10 cm. Describe the image.</summary><div>30 cm is beyond 2F (20 cm): real, inverted, diminished, between F and 2F on the far side (15 cm from the lens).</div></details>`},

    { h: "Virtual images (3.2.3 S)", body: P`
<p class="lead">A <b>real image</b> is formed where rays of light <b>actually meet</b>. It can be projected on a screen. A <b>virtual image</b> is where rays only <b>appear</b> to come from: the rays diverge, and the image is found by <b>extrapolating them backwards</b> (dashed lines). It cannot be projected onto a screen.</p>
<h3>Object inside F: the magnifying glass</h3>
${rays(45, 85, "Rays leaving the lens spread apart. Your eye traces them back (dashed) to a <b>virtual, upright, enlarged</b> image on the same side as the object.", { Lx: 340, W: 620, H: 280, h: 40 })}
<p>The image in a plane mirror is also virtual: you can't catch it on a screen behind the mirror.</p>
<div class="callout warn"><b class="t">Drawing virtual images</b>Draw the real rays as solid lines with arrows <b>after</b> the lens. Continue them backwards as <b>dashed</b> lines until they meet. Draw the image arrow dashed too.</div>`},

    { h: "The magnifying glass (3.2.3 S)", body: P`
<p class="lead">A single converging lens works as a <b>magnifying glass</b> when the object is placed <b>closer to the lens than the focal point</b>.</p>
<ul><li>Hold the lens close to the object (less than one focal length away) and look through it from the other side.</li>
<li>The image is <b>virtual, upright and enlarged</b>, and further from the lens than the object.</li>
<li>A lens with a <b>shorter focal length</b> (fatter) gives a bigger magnification.</li></ul>
<details class="check"><summary>Why can't a magnifying glass produce an image on a screen?</summary><div>The image is virtual: the rays leaving the lens diverge and never actually meet, so there is no point where light can be focused onto a screen.</div></details>`},

    { h: "Correcting eyesight (3.2.3 S)", body: P`
<p class="lead">The eye's lens focuses light onto the <b>retina</b>. If it focuses in the wrong place, the image is blurred, and a spectacle lens corrects it.</p>
${F.row(
  (() => { let s = eyeball(150, 100) + F.line(10, 70, 110, 70, "r mid") + F.line(10, 130, 110, 130, "r mid") + F.line(110, 70, 170, 100, "r mid") + F.line(110, 130, 170, 100, "r mid") + F.line(170, 100, 200, 85, "r thin d") + F.line(170, 100, 200, 115, "r thin d") + F.text(150, 180, "focuses in front of retina", "tr small bold");
    s += F.text(150, 20, "short sight (myopia)", "tk small bold");
    return F.fig(280, 195, s, "Short sight: distant objects blurred. The eyeball is too long (or the lens too strong)."); })(),
  (() => { let s = eyeball(170, 100) + F.path("M50,30 Q66,100 50,170 L76,170 Q60,100 76,30 Z", "b bS mid") + F.line(10, 70, 60, 70, "r mid") + F.line(10, 130, 60, 130, "r mid") + F.line(63, 70, 130, 60, "r mid") + F.line(63, 130, 130, 140, "r mid") + F.line(130, 60, 220, 100, "r mid") + F.line(130, 140, 220, 100, "r mid") + F.text(170, 180, "corrected: diverging lens", "tg small bold");
    return F.fig(290, 195, s, "A <b>diverging</b> lens spreads the rays a little first, so the eye focuses them further back, on the retina."); })()
)}
${F.row(
  (() => { let s = eyeball(150, 100) + F.line(10, 70, 110, 70, "r mid") + F.line(10, 130, 110, 130, "r mid") + F.line(110, 70, 240, 100, "r mid") + F.line(110, 130, 240, 100, "r mid") + F.text(150, 180, "would focus behind retina", "tr small bold") + F.text(150, 20, "long sight (hypermetropia)", "tk small bold");
    return F.fig(280, 195, s, "Long sight: near objects blurred. The eyeball is too short (or the lens too weak)."); })(),
  (() => { let s = eyeball(170, 100) + `<ellipse cx="63" cy="100" rx="10" ry="70" class="b bS mid"/>` + F.line(10, 70, 60, 70, "r mid") + F.line(10, 130, 60, 130, "r mid") + F.line(63, 70, 130, 82, "r mid") + F.line(63, 130, 130, 118, "r mid") + F.line(130, 82, 220, 100, "r mid") + F.line(130, 118, 220, 100, "r mid") + F.text(170, 180, "corrected: converging lens", "tg small bold");
    return F.fig(290, 195, s, "A <b>converging</b> lens starts bending the rays inwards, so the eye focuses them sooner, on the retina."); })()
)}
<table class="t"><tr><th>Defect</th><th>Can see clearly</th><th>Problem</th><th>Correcting lens</th></tr>
<tr><td>Short sight</td><td>Near objects</td><td>Image forms in front of the retina</td><td><b>Diverging</b> (concave)</td></tr>
<tr><td>Long sight</td><td>Distant objects</td><td>Image would form behind the retina</td><td><b>Converging</b> (convex)</td></tr></table>
<div class="callout exam"><b class="t">Memory hook</b>"Short-sighted → diverging. Long-sighted → converging." The lens does the opposite of what is wrong: too much converging needs some diverging, and vice versa.</div>
<details class="check"><summary>A person can read a book but road signs look blurred. Name the defect and the type of lens needed.</summary><div>Short sight; a diverging (concave) lens.</div></details>`}
  ],
  worked: [
    { q: P`An object 4 cm tall is placed 15 cm from a converging lens of focal length 10 cm. By drawing a ray diagram to scale (or by using the pattern), describe the image and estimate its position and height.`,
      steps: [P`15 cm is between F (10 cm) and 2F (20 cm): the image is real, inverted and enlarged, beyond 2F on the other side.`, P`A scale drawing gives the image 30 cm from the lens.`, P`Magnification = 30/15 = 2, so the image is 8 cm tall (inverted).`]},
    { q: P`S: Explain why the image formed by a magnifying glass is described as virtual.`,
      steps: [P`The object is inside the focal length, so rays from it leave the lens diverging.`, P`They never actually meet, so no image can be formed on a screen.`, P`The eye traces the rays backwards to a point where they appear to come from: a virtual image.`]}
  ],
  formulas: [["Magnification", "image height ÷ object height"], ["Short sight", "diverging (concave) lens"], ["Long sight", "converging (convex) lens"], ["Magnifying glass (S)", "object inside F → virtual, upright, enlarged"]],
  cards: [
    ["Converging lens: shape and effect", "Thicker in the middle; brings parallel rays together at the principal focus."],
    ["Diverging lens: shape and effect", "Thinner in the middle; spreads parallel rays as if from a focus on the same side."],
    ["Define principal focus", "Point where rays parallel to the principal axis converge (or appear to diverge from)."],
    ["Define focal length", "Distance from the centre of the lens to the principal focus."],
    ["Principal axis", "Line through the centre of the lens perpendicular to it."],
    ["Three standard rays", "Parallel → through F; through centre → straight; through near F → parallel."],
    ["Object beyond 2F", "Image real, inverted, diminished, between F and 2F (camera)."],
    ["Object at 2F", "Image real, inverted, same size, at 2F."],
    ["Object between F and 2F", "Image real, inverted, enlarged, beyond 2F (projector)."],
    ["Object inside F", "Virtual, upright, enlarged (magnifying glass)."],
    ["Real image", "Rays actually meet; can be projected on a screen."],
    ["Virtual image", "Rays only appear to come from it (traced back); cannot be projected."],
    ["Short sight: cause and correction (S)", "Image forms in front of retina; diverging lens."],
    ["Long sight: cause and correction (S)", "Image would form behind retina; converging lens."],
    ["How to measure f quickly", "Focus a distant object onto a screen; measure lens–screen distance."],
    ["Fatter lens → focal length?", "Shorter (more powerful)."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Rays parallel to the principal axis passing through a converging lens`, opts: ["spread out", "pass through the principal focus", "pass through 2F", "are not refracted"], ans: 1, why: P`That defines the principal focus.` },
    { type: "mcq", marks: 1, q: P`A ray through the centre of a thin lens`, opts: ["passes through F", "is reflected", "passes straight through", "becomes parallel"], ans: 2, why: P`Undeviated through the optical centre.` },
    { type: "mcq", marks: 1, q: P`An object beyond 2F of a converging lens forms an image that is`, opts: ["virtual, upright, enlarged", "real, inverted, diminished", "real, upright, same size", "real, inverted, enlarged"], ans: 1, why: P`Camera case.` },
    { type: "mcq", marks: 1, q: P`Which image can be projected onto a screen?`, opts: ["Virtual", "Real", "Both", "Neither"], ans: 1, why: P`Only where rays actually meet.` },
    { type: "mcq", marks: 1, q: P`S: A short-sighted person needs`, opts: ["a converging lens", "a diverging lens", "a prism", "no lens"], ans: 1, why: P`The eye converges too much, so a diverging lens is needed.` },
    { type: "mcq", marks: 1, q: P`S: For a magnifying glass, the object must be`, opts: ["beyond 2F", "at 2F", "between F and 2F", "closer than F"], ans: 3, why: P`Inside F gives a virtual, upright, enlarged image.` },
    { type: "struct", marks: 3, q: P`Define the terms principal focus and focal length for a converging lens.`,
      ms: P`<b>B1</b> principal focus: point on the axis where rays parallel to the principal axis converge after refraction<br><b>B1</b> focal length: distance from the centre of the lens<br><b>B1</b> to the principal focus` },
    { type: "struct", marks: 4, q: P`Draw a ray diagram for an object placed at 1.5f from a converging lens and describe the image.`,
      ms: P`<b>B1</b> ray parallel to axis refracted through F<br><b>B1</b> ray through centre undeviated<br><b>B1</b> image located where rays cross, beyond 2F<br><b>B1</b> real, inverted, enlarged` },
    { type: "struct", marks: 3, q: P`S: State the differences between a real image and a virtual image.`,
      ms: P`<b>B1</b> real: rays actually meet / converge at the image<br><b>B1</b> real image can be formed on a screen; virtual cannot<br><b>B1</b> virtual: rays only appear to come from it (traced back)` },
    { type: "struct", marks: 4, q: P`S: Explain, with the aid of a diagram, how long sight is corrected.`,
      ms: P`<b>B1</b> long sight: near objects focused behind the retina<br><b>B1</b> eye lens too weak / eyeball too short<br><b>B1</b> converging lens placed in front of the eye<br><b>B1</b> rays converge more so focus moves onto the retina` },
    { type: "struct", marks: 3, q: P`Describe how to measure the focal length of a converging lens in the laboratory.`,
      ms: P`<b>B1</b> focus an image of a distant object (window) on a screen<br><b>B1</b> move lens/screen until image is sharp<br><b>B1</b> measure distance from lens centre to screen = focal length` },
    { type: "struct", marks: 3, q: P`S: A lens of focal length 5 cm is used as a magnifying glass. State where the object must be placed and describe the image.`,
      ms: P`<b>B1</b> less than 5 cm from the lens (inside F)<br><b>B1</b> virtual and upright<br><b>B1</b> enlarged, on the same side as the object` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: P`State the shape of a converging lens.`, ms: P`<b>B1</b> thicker in the middle than at the edges (convex)` },
    { d: 1, type: "mcq", marks: 1, q: P`A projector forms an image that is`, opts: ["virtual and upright", "real, inverted and enlarged", "real, upright and diminished", "virtual and enlarged"], ans: 1, why: P`Object between F and 2F.` },
    { d: 1, type: "struct", marks: 2, q: P`Name the two standard rays that are easiest to draw on a lens ray diagram and state what happens to each.`, ms: P`<b>B1</b> parallel to principal axis → passes through F<br><b>B1</b> through centre → passes straight through` },
    { d: 2, type: "struct", marks: 3, q: P`An object 2 cm tall is 12 cm from a converging lens of focal length 4 cm. (a) Where is the object compared with F and 2F? (b) Describe the image.`, ms: P`<b>(a) B1</b> beyond 2F (2F = 8 cm)<br><b>(b) B1</b> real, inverted<br><b>B1</b> diminished, between F and 2F on the other side` },
    { d: 2, type: "struct", marks: 3, q: P`S: Explain why a diverging lens can never form a real image of a real object.`, ms: P`<b>B1</b> it always makes rays spread out (diverge)<br><b>B1</b> rays never meet after the lens<br><b>B1</b> so images are always virtual (found by tracing rays back)` },
    { d: 2, type: "mcq", marks: 1, q: P`S: The eye of a long-sighted person`, opts: ["focuses light in front of the retina", "would focus near objects behind the retina", "needs a diverging lens", "can't see distant objects"], ans: 1, why: P`Long sight: near objects focus behind the retina; converging lens needed.` },
    { d: 3, type: "struct", marks: 5, q: P`An object 3.0 cm tall is placed 8.0 cm from a converging lens of focal length 6.0 cm. Draw a full-scale ray diagram and use it to find (a) the image distance, (b) the image height, (c) the magnification. Describe the image.`, ms: P`<b>B1</b> correct construction rays<br><b>A1</b> image distance ≈ 24 cm<br><b>A1</b> image height ≈ 9.0 cm<br><b>A1</b> magnification ≈ 3<br><b>B1</b> real, inverted, enlarged` },
    { d: 3, type: "struct", marks: 5, q: P`S: A student holds a magnifying glass (f = 8 cm) 5 cm above a stamp. (a) Draw a ray diagram to show how the image is formed. (b) Describe the image. (c) Explain what happens to the image as the student slowly raises the lens to 12 cm above the stamp.`, ms: P`<b>(a) B1</b> two rays correctly refracted, diverging after lens<br><b>B1</b> extrapolated back (dashed) to a virtual image on the object side<br><b>(b) B1</b> virtual, upright, enlarged<br><b>(c) B1</b> image becomes larger and further away until at 8 cm no clear image<br><b>B1</b> beyond 8 cm the image becomes real and inverted (seen inverted, may be projected)` }
  ]
});
}
