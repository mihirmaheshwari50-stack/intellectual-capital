window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
// field lines traced numerically from point poles [x, y, q]; q > 0 = N pole
const fld = (x, y, poles) => { let bx = 0, by = 0; poles.forEach(([px, py, q]) => { const dx = x - px, dy = y - py, r3 = Math.pow(dx * dx + dy * dy, 1.5) + 1e-6; bx += q * dx / r3; by += q * dy / r3; }); return [bx, by]; };
const trace = (x, y, poles, W, H, dir = 1) => { const pts = [[x, y]]; for (let i = 0; i < 1600; i++) { const [bx, by] = fld(x, y, poles), m = Math.hypot(bx, by) || 1, st = Math.min(8, 2.5 + Math.max(0, Math.hypot(x - W / 2, y - H / 2) - W / 2) / 30); x += dir * st * bx / m; y += dir * st * by / m; pts.push([x, y]); if (x < -W || x > 2 * W || y < -H || y > 2 * H || poles.some(([px, py, q]) => q * dir < 0 && Math.hypot(x - px, y - py) < 7)) break; } return pts; };
let clipN = 0;
const linesFrom = (poles, W, H, n = 12, cls = "b mid", which = null) => { const id = "mg" + (clipN++); let s = `<clipPath id="${id}"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath><g clip-path="url(#${id})">`; poles.filter(p => p[2] > 0 && (which === null || which.includes(p))).forEach(([px, py]) => { for (let k = 0; k < n; k++) { const a = (k + .5) / n * Math.PI * 2, pts = trace(px + 9 * Math.cos(a), py + 9 * Math.sin(a), poles, W, H); s += F.poly(pts, cls); const vis = pts.map((p, i) => [p, i]).filter(([p]) => p[0] > 10 && p[0] < W - 10 && p[1] > 10 && p[1] < H - 10), j = vis.length ? vis[Math.floor(vis.length * .5)][1] : -1; if (j >= 0 && pts[j + 3]) s += F.arrow(pts[j][0], pts[j][1], pts[j + 3][0], pts[j + 3][1], cls.split(" ")[0] + " thin", 9); } }); return s + "</g>"; };
const linesTo = (poles, W, H, n = 10, cls = "b mid") => { let s = ""; poles.filter(p => p[2] < 0).forEach(([px, py]) => { for (let k = 0; k < n; k++) { const a = (k + .5) / n * Math.PI * 2, pts = trace(px + 9 * Math.cos(a), py + 9 * Math.sin(a), poles, W, H, -1).reverse(); s += F.poly(pts, cls); const i = Math.floor(pts.length * .55), m = pts[i], m2 = pts[i + 3]; if (m2) s += F.arrow(m[0], m[1], m2[0], m2[1], cls.split(" ")[0] + " thin", 9); } }); return s; };
const bar = (cx, cy, L = 140, T = 32, flip = false) => F.rect(cx - L / 2, cy - T / 2, L / 2, T, (flip ? "r rF" : "b bF")) + F.rect(cx, cy - T / 2, L / 2, T, (flip ? "b bF" : "r rF")) + `<text x="${cx + (flip ? -1 : 1) * L / 4}" y="${cy + 6}" text-anchor="middle" style="fill:#fff;font-weight:700">N</text><text x="${cx - (flip ? -1 : 1) * L / 4}" y="${cy + 6}" text-anchor="middle" style="fill:#fff;font-weight:700">S</text>`;
const cmp = (x, y, ang, r = 11) => { const c = Math.cos(ang), s2 = Math.sin(ang); return F.circ(x, y, r, "m bgF") + F.poly([[x + c * (r - 2), y + s2 * (r - 2)], [x - s2 * 3, y + c * 3], [x + s2 * 3, y - c * 3]], "rF", true) + F.poly([[x - c * (r - 2), y - s2 * (r - 2)], [x - s2 * 3, y + c * 3], [x + s2 * 3, y - c * 3]], "bF", true); };
const coil = (x, y, w, n, h = 40, c = "o") => { let s = ""; for (let i = 0; i < n; i++) s += `<ellipse cx="${x + i * w / (n - 1)}" cy="${y}" rx="7" ry="${h / 2}" class="${c} mid"/>`; return s; };
//@@HELPERS-END

/* ============================================================
   MAGNETISM & ELECTROMAGNETS  (0625: 4.1, 4.5.3)
   ============================================================ */
TOPICS.push({
  id: "magnetism", subject: "physics", unit: 4, title: "Magnetism & electromagnets",
  blurb: "Magnetic poles and materials, induced magnetism, field lines, the field of a wire and a solenoid, electromagnets, relays and loudspeakers.",
  level: "Core → Supplement", demo: "electromagnet",
  syllabus: [
    ["4.1", "Describe forces between magnetic poles and between magnets and magnetic materials: N pole, S pole, attraction, repulsion, magnetised, unmagnetised", 0],
    ["4.1", "Describe induced magnetism", 1],
    ["4.1", "State the difference between magnetic and non-magnetic materials", 0],
    ["4.1", "Differences between temporary magnets (soft iron) and permanent magnets (steel)", 2],
    ["4.1", "A magnetic field is a region in which a magnetic pole experiences a force; field direction is the direction of the force on a N pole", 3],
    ["4.1", "Draw the pattern and direction of field lines around a bar magnet", 3],
    ["4.1 S", "The relative strength of a magnetic field is shown by the spacing of the field lines", 3],
    ["4.1", "Describe plotting field lines with a compass or iron filings, and using a compass to find field direction", 4],
    ["4.1 S", "Magnetic forces are due to interactions between magnetic fields", 5],
    ["4.5.3", "Describe the pattern and direction of the magnetic field due to currents in straight wires and in solenoids", 6],
    ["4.5.3", "Describe an experiment to identify the pattern and direction of the field of a straight wire and a solenoid", 6],
    ["4.5.3 S", "How field strength varies around wires and solenoids; effect of changing the size and direction of the current", 6],
    ["4.1", "Describe uses of permanent magnets and electromagnets", 7],
    ["4.5.3", "Describe how the magnetic effect of a current is used in relays and loudspeakers, with applications", 8]
  ],
  sections: [
    { h: "Magnets, poles and magnetic materials (4.1)", body: P`
<p class="lead">Every magnet has two <b>poles</b>, a <b>north-seeking (N)</b> pole and a <b>south-seeking (S)</b> pole, where its magnetic effect is strongest. A freely hanging magnet turns so its N pole points north.</p>
${F.row(
  (() => { let s = bar(80, 40, 120, 28) + bar(240, 40, 120, 28) + F.arrow(150, 40, 165, 40, "k", 7) + F.arrow(170, 40, 155, 40, "k", 7) + F.text(160, 80, "N facing S: attract", "tg small bold");
    s += bar(80, 120, 120, 28) + bar(240, 120, 120, 28, true) + F.arrow(143, 120, 128, 120, "k", 7) + F.arrow(177, 120, 192, 120, "k", 7) + F.text(160, 160, "N facing N: repel", "tr small bold");
    return F.fig(320, 175, s, "<b>Like poles repel; unlike poles attract.</b>"); })(),
  (() => { let s = bar(90, 60, 120, 28) + F.rect(180, 46, 90, 28, "m mS", 4) + F.text(225, 64, "iron", "tk small bold") + F.arrow(160, 60, 175, 60, "k", 7) + F.text(160, 110, "either pole attracts", "tk small bold") + F.text(160, 126, "unmagnetised iron", "tk small bold");
    return F.fig(320, 140, s, "A magnet attracts magnetic materials. Only <b>repulsion</b> proves that something is a magnet."); })()
)}
<table class="t"><tr><th>Magnetic materials (attracted to magnets)</th><th>Non-magnetic materials</th></tr>
<tr><td><b>Iron</b>, <b>steel</b>, <b>nickel</b>, <b>cobalt</b> (and alloys containing them)</td><td>Copper, aluminium, brass, gold, plastic, wood, glass, paper</td></tr></table>
<div class="callout warn"><b class="t">"All metals are magnetic" is false</b>Aluminium cans and copper coins are not attracted. That is how recycling plants separate steel cans from aluminium cans.</div>
<p><b>Magnetised</b> means the material is a magnet itself (has its own N and S poles). <b>Unmagnetised</b> magnetic material has no poles of its own but is attracted by either pole of a magnet.</p>
<details class="check"><summary>You have two identical-looking bars: one is a magnet, one is unmagnetised iron. How can you tell which is which using only the two bars?</summary><div>Touch the end of bar A to the middle of bar B. If they attract strongly, A is the magnet (the middle of a magnet is weak, so B's middle wouldn't attract iron). Alternatively, repulsion between them is impossible unless both are magnets.</div></details>`},

    { h: "Induced magnetism (4.1)", body: P`
<p class="lead">When a piece of magnetic material is placed near (or touching) a magnet, it <b>becomes a magnet itself</b>. This is <b>induced magnetism</b>.</p>
${(() => { let s = bar(120, 40, 160, 34); const clips = [[200, 58], [200, 92], [200, 126], [200, 160]];
  clips.forEach(([x, y], i) => { s += F.rect(x - 8, y, 16, 30, "k thin", 7) + F.text(x + 16, y + 12, "S", "tb small bold", "start") + F.text(x + 16, y + 26, "N", "tr small bold", "start"); });
  s += F.text(330, 100, "each clip becomes a magnet,", "tk small", "start") + F.text(330, 116, "so it attracts the next one", "tk small", "start");
  return F.fig(520, 200, s, "A chain of iron paperclips hangs from the N pole. The end nearest the magnet's N pole becomes an induced S pole, so they attract.", { size: "small" }); })()}
<p>The induced pole <b>nearest</b> the magnet is always the <b>opposite</b> pole, which is why magnets always attract unmagnetised materials, whichever pole is used.</p>
<h3>Making and destroying magnets</h3>
<ul><li><b>Magnetising</b>: stroke a steel bar repeatedly in one direction with one pole of a magnet; or (best) place it in a <b>solenoid</b> carrying a <b>direct current</b>.</li>
<li><b>Demagnetising</b>: heat it strongly, hammer it, or pull it slowly out of a solenoid carrying <b>alternating</b> current.</li></ul>`},

    { h: "Soft iron vs steel: temporary and permanent magnets (4.1)", body: P`
<table class="t"><tr><th></th><th>Soft iron</th><th>Steel</th></tr>
<tr><td>Ease of magnetising</td><td>Very easy</td><td>Harder</td></tr>
<tr><td>Keeps magnetism?</td><td>No: loses it as soon as the magnetising field is removed</td><td>Yes: keeps it</td></tr>
<tr><td>Type of magnet</td><td><b>Temporary</b> (induced)</td><td><b>Permanent</b></td></tr>
<tr><td>Used for</td><td>Electromagnet cores, relays, transformer cores</td><td>Compass needles, fridge magnets, loudspeakers, motors</td></tr></table>
${(() => { let s = bar(90, 50, 140, 30) + F.rect(180, 36, 30, 120, "m mS", 4) + F.rect(270, 36, 30, 120, "k kS", 4) + F.text(195, 24, "soft iron", "tk small bold") + F.text(285, 24, "steel", "tk small bold");
  s += F.rect(278, 158, 14, 8, "k thin", 4) + F.rect(278, 168, 14, 8, "k thin", 4) + F.rect(170, 182, 14, 8, "k thin", 4) + F.rect(200, 184, 14, 8, "k thin", 4);
  s += F.text(400, 60, "magnet removed:", "tk small bold", "start") + F.text(400, 80, "soft iron drops its clips", "tk small", "start") + F.text(400, 100, "steel keeps holding them", "tk small", "start");
  return F.fig(560, 190, s, "Both are attracted and pick up clips while near the magnet. Take the magnet away: only the steel stays magnetised.", { size: "wide" }); })()}
<details class="check"><summary>Why is the core of an electromagnet made of soft iron, not steel?</summary><div>Soft iron magnetises strongly when the current is on but loses its magnetism immediately when the current is switched off, so the electromagnet can be turned off. Steel would stay magnetised.</div></details>`},

    { h: "Magnetic fields and field lines (4.1)", body: P`
<p class="lead">A <b>magnetic field</b> is a region in which a magnetic pole experiences a force. We draw it with <b>field lines</b>.</p>
${(() => { const W = 560, H = 320, poles = [[340, 160, 1], [220, 160, -1]]; let s = linesFrom(poles, W, H, 16, "b mid") + bar(280, 160, 140, 32);
  return F.fig(W, H, s, "Field around a bar magnet. Lines leave the N pole and enter the S pole; they never cross.", { size: "wide" }); })()}
<ul><li>The <b>direction</b> of the field at a point is the direction of the force on a <b>N pole</b> placed there. So field lines go from <b>N to S</b> outside the magnet.</li>
<li>Field lines <b>never cross</b> (a compass can only point one way at each point).</li>
<li>(S) The field is <b>strongest where the lines are closest together</b>: at the poles.</li></ul>
<h3>Two magnets</h3>
${F.row(
  (() => { const W = 360, H = 240, poles = [[124, 120, 1], [36, 120, -1], [236, 120, -1], [324, 120, 1]]; let s = linesFrom(poles, W, H, 10, "b thin") + bar(80, 120, 100, 26) + bar(280, 120, 100, 26);
    return F.fig(W, H, s, "N facing S: lines go straight across: <b>attraction</b>. Strong uniform field in the gap."); })(),
  (() => { const W = 360, H = 240, poles = [[124, 120, 1], [36, 120, -1], [236, 120, 1], [324, 120, -1]]; let s = linesFrom(poles, W, H, 10, "b thin") + bar(80, 120, 100, 26) + bar(280, 120, 100, 26, true) + F.text(180, 125, "×", "tr big bold") + F.text(180, 104, "neutral point", "tr small bold");
    return F.fig(W, H, s, "N facing N: lines push apart: <b>repulsion</b>. At the neutral point the fields cancel."); })()
)}`},

    { h: "Plotting magnetic fields (4.1)", body: P`
<h3>Method 1: plotting compass</h3>
<div class="viz" data-viz="fieldPlot"></div>
<ol class="steps-inline"><li>Place the magnet on paper and draw round it.</li>
<li>Put a small plotting compass near the N pole. Mark a dot at the end its <b>N needle</b> points to.</li>
<li>Move the compass so its tail is over that dot, and mark the new dot. Repeat until you reach the S pole.</li>
<li>Join the dots with a smooth line, and add an <b>arrow</b> showing the direction (the way the compass's N points).</li>
<li>Repeat from different starting points.</li></ol>
<h3>Method 2: iron filings</h3>
<p>Put a sheet of paper over the magnet and sprinkle iron filings on it, then tap gently. Each filing becomes a tiny induced magnet and lines up with the field, showing the <b>pattern</b> quickly. But iron filings don't show the <b>direction</b> — you need a compass for that.</p>
<div class="callout exam"><b class="t">Compass needle</b>The N end of a compass needle points along the field direction (towards a magnet's S pole). Far from magnets, it points to the Earth's geographic north (which is actually a magnetic S pole).</div>`},

    { h: "Why magnets push and pull (4.1 S)", body: P`
<p class="lead">Magnetic forces are due to <b>interactions between magnetic fields</b>. Where two fields combine, the resultant pattern shows the force.</p>
<ul><li>When field lines from two magnets join up (N facing S), the lines behave like stretched elastic bands trying to shorten: <b>attraction</b>.</li>
<li>When they push against each other (N facing N), the lines are squashed together sideways and push apart: <b>repulsion</b>.</li></ul>
<p>The same idea explains the <b>motor effect</b> in the next topic: the field of a current-carrying wire interacts with the field of a magnet, and a force results.</p>`},

    { h: "The magnetic field of a current (4.5.3)", body: P`
<p class="lead">In 1820 Ørsted noticed that a compass needle moved when a current flowed in a nearby wire. <b>Every electric current produces a magnetic field.</b></p>
<h3>A straight wire</h3>
<div class="viz" data-viz="wireField"></div>
<ul><li>Field lines are <b>concentric circles</b> around the wire.</li>
<li>Direction: the <b>right-hand grip rule</b>. Grip the wire with your right hand, thumb pointing along the current; your fingers curl the way the field goes.</li>
<li>(S) The field is <b>strongest close to the wire</b> and gets weaker further away (circles further apart).</li>
<li>(S) <b>Larger current → stronger field</b>. <b>Reverse the current → field reverses</b>.</li></ul>
${(() => { let s = F.rect(80, 160, 300, 8, "m mS") + F.line(230, 20, 230, 250, "o thick") + F.arrow(230, 230, 230, 40, "o thick", 10) + F.text(240, 34, "current", "to small bold", "start");
  s += `<ellipse cx="230" cy="164" rx="110" ry="30" class="b mid"/><ellipse cx="230" cy="164" rx="60" ry="16" class="b mid"/>`;
  [[340, 164, -Math.PI / 2], [120, 164, Math.PI / 2], [230, 194, 0], [230, 134, Math.PI]].forEach(([x, y, a]) => { s += cmp(x, y, a, 11); });
  s += F.text(400, 120, "card with compasses", "tk small", "start") + F.text(400, 136, "or iron filings", "tk small", "start");
  return F.fig(560, 260, s, "Experiment: pass a vertical wire through a horizontal card. Iron filings show circles; plotting compasses show the direction (anticlockwise seen from above when the current flows upwards).", { size: "wide" }); })()}
<h3>A solenoid (a long coil)</h3>
${(() => { const W = 560, H = 280, poles = [[400, 140, 1], [160, 140, -1]]; let s = linesFrom(poles, W, H, 14, "b thin") + F.rect(160, 110, 240, 60, "bgF nostroke") + coil(170, 140, 220, 12, 64, "o");
  for (let i = 0; i < 5; i++) s += F.arrow(190 + i * 40, 140, 214 + i * 40, 140, "b mid", 8);
  s += F.text(430, 146, "N", "tr big bold", "start") + F.text(130, 146, "S", "tb big bold", "end") + F.text(280, 98, "current", "to small bold");
  return F.fig(W, H, s, "A solenoid's field looks like a bar magnet's outside it, and is strong and almost uniform inside (lines parallel and close together).", { size: "wide" }); })()}
<ul><li>Outside: like a <b>bar magnet</b>. Inside: <b>strong and uniform</b>.</li>
<li>Which end is N? Grip the coil with your right hand, fingers curling with the current; your <b>thumb points to the N pole</b>. Or look at the end: current flowing <b>anticlockwise</b> → N; <b>clockwise</b> → S.</li>
<li>(S) The field is <b>stronger</b> with more current, more turns per metre, or an iron core. Reversing the current swaps the poles.</li></ul>
<details class="check"><summary>A vertical wire carries current downwards. Seen from above, which way does the field go?</summary><div>Clockwise (thumb pointing down, fingers curl clockwise when seen from above).</div></details>`},

    { h: "Electromagnets and their uses (4.1)", body: P`
<p class="lead">An <b>electromagnet</b> is a coil of wire wound round a <b>soft iron core</b>. It is a magnet only while current flows.</p>
<p>It becomes <b>stronger</b> if you increase the <b>current</b>, increase the <b>number of turns</b>, or add a <b>soft iron core</b>. Try it in the interactive lab.</p>
<table class="t"><tr><th>Permanent magnets used in</th><th>Electromagnets used in</th></tr>
<tr><td>Compasses, fridge door seals, loudspeakers, microphones, electric motors and generators, magnetic catches, MRI (some)</td><td>Scrapyard cranes (lift and drop steel), relays, electric bells, circuit breakers, MRI scanners, maglev trains, magnetic door locks</td></tr></table>
<div class="callout why"><b class="t">Why electromagnets are so useful</b>They can be <b>switched on and off</b>, their strength can be <b>controlled</b> by the current, and they can be made far <b>stronger</b> than permanent magnets.</div>`},

    { h: "The relay (4.5.3)", body: P`
<p class="lead">A <b>relay</b> is an electromagnetic switch. A <b>small current</b> in one circuit switches on a <b>large current</b> in a separate circuit.</p>
<div class="viz" data-viz="relay"></div>
<ol class="steps-inline"><li>A small current flows through the relay's coil when its switch is closed.</li>
<li>The soft iron core becomes an electromagnet and attracts an iron <b>armature</b>.</li>
<li>The armature pivots and pushes the <b>contacts</b> together, closing the second circuit.</li>
<li>When the coil current stops, the core loses its magnetism and a spring pulls the contacts apart.</li></ol>
<p><b>Applications</b>: a car's starter motor needs over 100 A, so the ignition key switches a relay with a tiny current (safe thin wires to the dashboard). Also: switching high-voltage mains from a low-voltage control circuit, alarms, and automatic street lights (with an LDR).</p>`},

    { h: "The loudspeaker (4.5.3)", body: P`
${(() => { let s = F.rect(40, 70, 70, 120, "r rS r", 4) + F.rect(110, 70, 40, 30, "b bS b") + F.rect(110, 160, 40, 30, "b bS b") + F.text(75, 136, "N", "tr big bold") + F.text(130, 90, "S", "tb bold") + F.text(130, 180, "S", "tb bold");
  s += F.rect(150, 100, 60, 60, "o oS o") + coil(155, 130, 50, 6, 58, "o") + F.path("M210,100 L330,30 L330,230 L210,160", "k mid") + F.text(300, 250, "paper cone", "tk small bold") + F.text(180, 210, "coil", "to small bold") + F.text(75, 210, "permanent magnet", "tr small bold");
  s += F.path("M360,90 Q380,130 360,170", "m") + F.path("M385,75 Q412,130 385,185", "m") + F.text(420, 130, "sound", "tm small", "start");
  return F.fig(500, 265, s, "A coil attached to a paper cone sits in the field of a permanent magnet.", { size: "small" }); })()}
<ol class="steps-inline"><li>An <b>alternating current</b> (the electrical signal from an amplifier) flows in the coil.</li>
<li>The coil's magnetic field interacts with the permanent magnet's field, so there is a force on the coil (the motor effect).</li>
<li>The current keeps reversing, so the force keeps reversing: the coil and cone <b>vibrate</b> back and forth at the frequency of the a.c.</li>
<li>The cone pushes the air, producing sound waves with the same frequency. A bigger current gives bigger vibrations: louder sound.</li></ol>
<details class="check"><summary>Why must the current in a loudspeaker be alternating?</summary><div>A direct current would give a steady force, pushing the cone out once and holding it. Alternating current makes the force reverse repeatedly, so the cone vibrates and produces sound.</div></details>`}
  ],
  worked: [
    { q: P`Explain, using induced magnetism, why an unmagnetised iron nail is attracted to either pole of a magnet.`,
      steps: [P`The magnet's field magnetises the nail: induced magnetism.`, P`The end of the nail nearest the magnet always becomes the opposite pole (e.g. near a N pole it becomes S).`, P`Unlike poles attract, so the nail is attracted whichever pole is used.`]},
    { q: P`A solenoid lies horizontally. Seen from the left end, the current flows clockwise. State the polarity of each end and describe how to make its field stronger.`,
      steps: [P`Clockwise when viewed from an end means that end is a S pole. So the left end is S and the right end is N.`, P`Stronger field: increase the current, add more turns (per unit length), insert a soft iron core.`]}
  ],
  formulas: [["Like poles", "repel"], ["Unlike poles", "attract"], ["Field direction", "N → S (force on a N pole)"], ["Straight wire", "right-hand grip: thumb = current, fingers = field"], ["Solenoid", "anticlockwise end = N, clockwise end = S"]],
  cards: [
    ["Name 4 magnetic materials", "Iron, steel, nickel, cobalt."],
    ["Like poles…", "Repel."],
    ["Only test that proves something is a magnet", "Repulsion."],
    ["What is induced magnetism?", "A magnetic material becomes a magnet when placed in a magnetic field."],
    ["Soft iron vs steel", "Soft iron: temporary, easily magnetised and demagnetised. Steel: permanent."],
    ["Define magnetic field", "A region in which a magnetic pole experiences a force."],
    ["Direction of magnetic field", "The direction of the force on a N pole (N → S outside a magnet)."],
    ["How is field strength shown on a diagram? (S)", "Closer field lines = stronger field."],
    ["Plotting compass method", "Mark where the N needle points, move compass to the dot, repeat, join dots, add arrows."],
    ["Iron filings show…", "The pattern of the field (but not its direction)."],
    ["Field around a straight wire", "Concentric circles; direction by the right-hand grip rule."],
    ["How does field strength vary near a wire? (S)", "Strongest close to the wire, weaker further away."],
    ["Solenoid field", "Like a bar magnet outside; strong, uniform inside."],
    ["Three ways to strengthen an electromagnet", "More current, more turns, soft iron core."],
    ["What does a relay do?", "Uses a small current to switch a large current in another circuit."],
    ["How does a loudspeaker produce sound?", "a.c. in a coil in a magnet's field → alternating force → cone vibrates → sound."],
    ["Uses of electromagnets", "Scrapyard cranes, relays, bells, circuit breakers, MRI."],
    ["Magnetic forces are due to…? (S)", "Interactions between magnetic fields."],
    ["How to demagnetise a magnet", "Heat it, hammer it, or remove it slowly from a solenoid carrying a.c."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Which is NOT a magnetic material?`, opts: ["Nickel", "Steel", "Aluminium", "Cobalt"], ans: 2, why: P`Aluminium is not attracted to magnets.` },
    { type: "mcq", marks: 1, q: P`Field lines outside a bar magnet go`, opts: ["S to N", "N to S", "in circles round the middle", "nowhere"], ans: 1, why: P`Direction = force on a N pole: away from N, towards S.` },
    { type: "mcq", marks: 1, q: P`A temporary magnet is best made from`, opts: ["steel", "soft iron", "copper", "plastic"], ans: 1, why: P`Soft iron loses its magnetism easily.` },
    { type: "mcq", marks: 1, q: P`Iron filings sprinkled round a magnet show`, opts: ["field direction", "field pattern", "field strength in tesla", "the current"], ans: 1, why: P`They show the pattern; a compass shows direction.` },
    { type: "mcq", marks: 1, q: P`The field around a long straight current-carrying wire is`, opts: ["parallel lines", "concentric circles", "radial lines", "zero"], ans: 1, why: P`Circles centred on the wire.` },
    { type: "mcq", marks: 1, q: P`Which change does NOT make an electromagnet stronger?`, opts: ["More turns", "Larger current", "Soft iron core", "Reversing the current"], ans: 3, why: P`Reversing swaps the poles but not the strength.` },
    { type: "mcq", marks: 1, q: P`S: On a field diagram the field is strongest where the lines are`, opts: ["furthest apart", "closest together", "curved", "straight"], ans: 1, why: P`Line density shows strength.` },
    { type: "struct", marks: 4, q: P`Describe how to plot the magnetic field lines around a bar magnet using a plotting compass.`,
      ms: P`<b>B1</b> place magnet on paper; compass near one pole<br><b>B1</b> mark dot at the N end of the needle<br><b>B1</b> move compass so its S end is at the dot; repeat to the other pole<br><b>B1</b> join dots with smooth line and add arrow (direction of N needle); repeat from other starting points` },
    { type: "struct", marks: 3, q: P`State three differences between the magnetic properties of soft iron and steel.`,
      ms: P`<b>B1</b> soft iron is easier to magnetise<br><b>B1</b> soft iron loses magnetism quickly / steel keeps it<br><b>B1</b> soft iron for temporary magnets (electromagnet cores); steel for permanent magnets` },
    { type: "struct", marks: 4, q: P`Describe an experiment to show the pattern and direction of the magnetic field around a straight wire carrying a current.`,
      ms: P`<b>B1</b> vertical wire through a horizontal card, connected to a d.c. supply<br><b>B1</b> sprinkle iron filings, tap: concentric circles<br><b>B1</b> place plotting compasses around the wire to show direction<br><b>B1</b> reverse current: compasses reverse` },
    { type: "struct", marks: 4, q: P`Explain how a relay allows a small current to switch on a large current.`,
      ms: P`<b>B1</b> small current flows through the coil, magnetising soft iron core<br><b>B1</b> core attracts the iron armature<br><b>B1</b> armature pivots and closes the contacts of the second circuit<br><b>B1</b> the large current flows in the second circuit; separate circuits keep the user safe` },
    { type: "struct", marks: 4, q: P`Describe how a loudspeaker converts an electrical signal into sound.`,
      ms: P`<b>B1</b> alternating current in the coil<br><b>B1</b> coil is in the field of a permanent magnet: force on coil<br><b>B1</b> force reverses as current reverses so coil and cone vibrate<br><b>B1</b> cone makes air vibrate: sound waves of the same frequency` },
    { type: "struct", marks: 3, q: P`S: State and explain how the field around a straight wire changes when (a) the current is doubled, (b) the current is reversed, (c) you move further from the wire.`,
      ms: P`<b>B1</b> (a) field is stronger<br><b>B1</b> (b) field direction reverses<br><b>B1</b> (c) field is weaker` },
    { type: "struct", marks: 2, q: P`Give one use of a permanent magnet and one use of an electromagnet, explaining why each type is chosen.`,
      ms: P`<b>B1</b> permanent: e.g. fridge door / compass / loudspeaker: needs no power and stays magnetised<br><b>B1</b> electromagnet: e.g. scrapyard crane / relay: can be switched off / strength controlled` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: P`State what happens when (a) two N poles are brought together, (b) a N pole and a S pole are brought together.`, ms: P`<b>B1</b> (a) repel<br><b>B1</b> (b) attract` },
    { d: 1, type: "mcq", marks: 1, q: P`The direction of a magnetic field at a point is the direction of the force on`, opts: ["a S pole", "a N pole", "an electron", "a piece of iron"], ans: 1, why: P`By definition.` },
    { d: 1, type: "struct", marks: 2, q: P`Draw the magnetic field pattern around a bar magnet, including arrows.`, ms: P`<b>B1</b> closed loops from one pole to the other, not crossing, closer near poles<br><b>B1</b> arrows from N to S` },
    { d: 1, type: "struct", marks: 1, q: P`Why can't iron filings show the direction of a magnetic field?`, ms: P`<b>B1</b> each filing has no fixed N/S end marked / they line up along the field but don't indicate which way` },
    { d: 2, type: "struct", marks: 3, q: P`A scrapyard crane uses an electromagnet to lift cars. Explain why the core is soft iron and why an electromagnet is used rather than a permanent magnet.`, ms: P`<b>B1</b> soft iron concentrates field / is strongly magnetised when current flows<br><b>B1</b> soft iron loses magnetism when current switched off<br><b>B1</b> so the car can be released / dropped where needed` },
    { d: 2, type: "struct", marks: 3, q: P`S: Sketch the magnetic field of a solenoid carrying a current and state how you would identify its N pole.`, ms: P`<b>B1</b> uniform parallel lines inside; bar-magnet-like pattern outside<br><b>B1</b> arrows consistent with N and S<br><b>B1</b> right-hand grip (thumb = N) / anticlockwise current seen from end = N / use a plotting compass` },
    { d: 2, type: "mcq", marks: 1, q: P`A chain of paperclips hangs from the S pole of a magnet. The top end of the first clip is`, opts: ["a N pole", "a S pole", "unmagnetised", "both"], ans: 0, why: P`The nearest induced pole is opposite: N.` },
    { d: 3, type: "struct", marks: 5, q: P`A car's starter motor is switched using a relay. (a) Draw a labelled diagram of a relay. (b) Explain how turning the key starts the motor. (c) Give two reasons why a relay is used instead of passing the motor current through the ignition switch.`, ms: P`<b>(a) B1</b> coil on soft iron core, pivoted iron armature, contacts in second circuit<br><b>(b) B1</b> key completes coil circuit; core magnetised; armature attracted<br><b>B1</b> contacts close; large current flows to the starter motor<br><b>(c) B1</b> thin, cheap wires can be used to the dashboard<br><b>B1</b> safety: driver's switch isolated from large current / sparking at the key avoided` },
    { d: 3, type: "struct", marks: 4, q: P`S: Explain, in terms of interacting magnetic fields, why two bar magnets with N poles facing repel, and describe the field pattern between them.`, ms: P`<b>B1</b> field lines from both N poles point away from the poles<br><b>B1</b> lines between the poles are pushed sideways / don't join, compressed<br><b>B1</b> a neutral point where the fields cancel midway<br><b>B1</b> the compressed fields push the magnets apart: repulsion` }
  ]
});
}
