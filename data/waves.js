window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;
//@@HELPERS-START
// ---- diagram helpers for this topic ----
const wavePts = (x0, x1, y0, A, lam, ph = 0) => { const p = []; for (let x = x0; x <= x1; x += 2) p.push([x, y0 - A * Math.sin((x - x0) / lam * 2 * Math.PI + ph)]); return p; };
const scope = (amp, cycles, cap) => { let s = F.rect(10, 10, 220, 140, "k mS", 8); for (let i = 1; i < 6; i++) s += F.line(10 + i * 220 / 6, 10, 10 + i * 220 / 6, 150, "grid"); for (let j = 1; j < 4; j++) s += F.line(10, 10 + j * 35, 230, 10 + j * 35, "grid");
  s += F.poly(wavePts(14, 226, 80, amp, 212 / cycles), "g thick"); return F.fig(240, 160, s, cap); };
// ray diagram helpers
const ray = (x1, y1, x2, y2, c = "o thick") => F.arrow(x1, y1, (x1 + x2) / 2, (y1 + y2) / 2, c, 9) + F.line((x1 + x2) / 2, (y1 + y2) / 2, x2, y2, c);
//@@HELPERS-END

/* ============================================================
   WAVES, LIGHT & SOUND  (0625: 3.1, 3.2.1, 3.2.2, 3.2.4, 3.3, 3.4)
   ============================================================ */
TOPICS.push({
  id: "waves", subject: "physics", unit: 3, title: "Waves, light & sound",
  blurb: "Wave properties, v = fλ, reflection, refraction, total internal reflection, dispersion, the EM spectrum, communication and sound.",
  level: "Core → Supplement", demo: "wave",
  syllabus: [
    ["3.1", "Waves transfer energy without transferring matter", 0],
    ["3.1", "Transverse and longitudinal waves, with examples (incl. seismic P and S waves)", 0],
    ["3.1", "Describe wave features: wavefront, wavelength, frequency, crest, trough, amplitude, wave speed; $v=f\\lambda$", 1],
    ["3.1", "Reflection, refraction and diffraction of water waves in a ripple tank", 2],
    ["3.1 S", "The effect of gap size and wavelength on diffraction", 2],
    ["3.2.1", "Reflection of light: law of reflection and the image in a plane mirror", 3],
    ["3.2.2", "Refraction of light, the glass-block experiment (S: $n=\\sin i/\\sin r$)", 4],
    ["3.2.2", "Critical angle and total internal reflection; optical fibres (S: $n=1/\\sin c$)", 5],
    ["3.2.4", "Dispersion of white light by a prism; the seven colours (S: monochromatic light)", 6],
    ["3.3", "The EM spectrum: order, speed in a vacuum, uses and harmful effects", 7],
    ["3.3 S", "Communication systems: microwaves, radio waves, optical fibres, satellites; analogue vs digital", 8],
    ["3.4", "Sound: vibrations, longitudinal, compressions and rarefactions, needs a medium, 20 Hz–20 kHz", 9],
    ["3.4", "Speed of sound in air and how to measure it; echoes; loudness/amplitude and pitch/frequency", 9],
    ["3.4 S", "Speed of sound in solids, liquids and gases; ultrasound and its uses", 9]
  ],
  sections: [
    { h: "What waves are (3.1)", body: P`
<p class="lead">A wave is a travelling disturbance that transfers <b>energy</b> (and information) from one place to another <b>without transferring matter</b>.</p>
<p>When a ripple crosses a pond, a floating leaf bobs up and down but stays where it is. The water doesn't travel across the pond; the energy does. Every particle of the medium simply <b>oscillates about a fixed position</b> and passes the disturbance on to its neighbour.</p>
<h3>Transverse waves</h3>
${(() => { let s = F.poly(wavePts(20, 460, 90, 40, 220), "c thick"); for (let x = 30; x <= 450; x += 30) { const y = 90 - 40 * Math.sin((x - 20) / 220 * 2 * Math.PI); s += F.dot(x, y, "k", 4); }
  s += F.arrow(475, 90, 520, 90, "r thick", 10) + F.text(498, 80, "energy", "tr small bold") + F.arrow(240, 104, 240, 140, "b mid", 8) + F.arrow(240, 104, 240, 68, "b mid", 8) + F.text(250, 152, "particles oscillate up and down", "tb small bold", "start");
  return F.fig(540, 170, s, "Transverse: the oscillations are <b>perpendicular</b> to the direction the energy travels.", { size: "wide" }); })()}
<p>Examples: <b>all electromagnetic waves</b> (light, radio, X-rays…), ripples on water, waves on a string or rope, and seismic <b>S-waves</b> (secondary waves).</p>
<h3>Longitudinal waves</h3>
${(() => { let s = ""; for (let i = 0; i <= 46; i++) { const x0 = 20 + i * 10, dx = 13 * Math.sin(i / 46 * 4 * Math.PI); for (let j = 0; j < 4; j++) s += F.line(x0 + dx, 30 + j * 26, x0 + dx, 46 + j * 26, "k mid"); }
  s += F.text(135, 150, "C", "tr bold") + F.text(250, 150, "R", "tb bold") + F.text(365, 150, "C", "tr bold") + F.text(24, 150, "R", "tb bold");
  s += F.arrow(475, 70, 520, 70, "r thick", 10) + F.text(498, 60, "energy", "tr small bold") + F.arrow(240, 165, 280, 165, "b mid", 8) + F.arrow(240, 165, 200, 165, "b mid", 8) + F.text(300, 170, "particles oscillate back and forth", "tb small bold", "start");
  return F.fig(540, 185, s, "Longitudinal: oscillations are <b>parallel</b> to the direction of travel, forming <b>compressions</b> (C, particles squeezed together) and <b>rarefactions</b> (R, spread apart).", { size: "wide" }); })()}
<p>Examples: <b>sound</b>, ultrasound, seismic <b>P-waves</b> (primary waves), and a slinky pushed and pulled along its length.</p>
<div class="callout tip"><b class="t">Seismic waves</b>P-waves (longitudinal) travel through solids <i>and</i> liquids. S-waves (transverse) travel only through solids. That's how geologists discovered the Earth's outer core is liquid: S-waves don't pass through it.</div>
<p>Try switching between the two types in the interactive lab at the end of this lesson. Watch the orange particle: it never travels with the wave.</p>
<details class="check"><summary>Describe the difference between a transverse and a longitudinal wave, with one example of each.</summary><div>Transverse: oscillations perpendicular to the direction of energy transfer (e.g. light). Longitudinal: oscillations parallel to the direction of energy transfer, with compressions and rarefactions (e.g. sound).</div></details>`},

    { h: "Describing waves and v = fλ (3.1)", body: P`
${(() => { let s = F.line(20, 120, 520, 120, "m d") + F.poly(wavePts(20, 500, 120, 60, 240), "c thick");
  s += F.text(80, 50, "crest", "tk bold small") + F.text(200, 200, "trough", "tk bold small");
  s += F.dim(80, 36, 320, 36, "wavelength λ", "b") + F.dim(400, 120, 400, 60, "amplitude", "o", -44);
  s += F.dot(80, 60, "k") + F.dot(320, 60, "k") + F.text(510, 116, "rest position", "tm small", "end");
  return F.fig(540, 220, s, "A transverse wave. The amplitude is measured from the rest position to a crest, <b>not</b> from crest to trough. The wavelength is from one point to the next identical point.", { size: "wide" }); })()}
<table class="t"><tr><th>Term</th><th>Meaning</th><th>Unit</th></tr>
<tr><td>Amplitude</td><td>Maximum displacement of a particle from its rest position</td><td>m</td></tr>
<tr><td>Wavelength, $\lambda$</td><td>Distance between two consecutive identical points (crest to crest, compression to compression)</td><td>m</td></tr>
<tr><td>Frequency, $f$</td><td>Number of complete waves passing a point (or produced) per second</td><td>hertz (Hz)</td></tr>
<tr><td>Period, $T$</td><td>Time for one complete wave to pass; $T=\dfrac1f$</td><td>s</td></tr>
<tr><td>Crest / trough</td><td>Highest / lowest points of a transverse wave</td><td>—</td></tr>
<tr><td>Wavefront</td><td>A line joining points on the same crest (all moving in step)</td><td>—</td></tr>
<tr><td>Wave speed, $v$</td><td>Distance the wave travels per second</td><td>m/s</td></tr></table>
<p>A bigger amplitude carries <b>more energy</b>: a louder sound, a brighter light, a more destructive ocean wave.</p>
<h3>Wavefronts and rays</h3>
${(() => { let s = ""; for (let i = 0; i < 7; i++) s += F.line(60 + i * 50, 30, 60 + i * 50, 170, "b thick"); s += F.arrow(40, 100, 420, 100, "r thick", 12) + F.text(430, 104, "ray", "tr bold", "start") + F.dim(160, 186, 210, 186, "λ", "k");
  return F.fig(470, 210, s, "Seen from above in a ripple tank, each crest is a wavefront. The spacing between wavefronts is the wavelength. A ray shows the direction of travel and is always perpendicular to the wavefronts.", { size: "small" }); })()}
<h3>The wave equation</h3>
$$v=f\lambda$$
<p>Why? In one period $T$, the source produces exactly one wave and the wave moves forward exactly one wavelength. So speed $=\dfrac{\text{distance}}{\text{time}}=\dfrac{\lambda}{T}=f\lambda$.</p>
<div class="callout key"><b class="t">Key insight</b>The <b>frequency is set by the source</b> and <b>does not change</b> when a wave passes into a different medium. If the speed changes, the wavelength must change in proportion: slower means shorter wavelength.</div>
<div class="callout ex"><b class="t">Worked example</b>A sound of frequency 680 Hz travels at 340 m/s in air. Find its wavelength and period. What happens in water (1500 m/s)?<br>$\lambda=\dfrac vf=\dfrac{340}{680}=0.50$ m. $T=\dfrac1{680}=1.47\times10^{-3}$ s.<br>In water: $f$ stays 680 Hz and $\lambda=\dfrac{1500}{680}=2.2$ m.</div>
<details class="check"><summary>Ripples in a tank: 12 waves pass a point in 4.0 s and the wavefronts are 1.5 cm apart. Find the wave speed.</summary><div>$f=12/4.0=3.0$ Hz, $\lambda=0.015$ m, so $v=3.0\times0.015=0.045$ m/s (4.5 cm/s).</div></details>`},

    { h: "Reflection, refraction and diffraction of water waves (3.1)", body: P`
<p class="lead">A <b>ripple tank</b> shows wave behaviour clearly: a vibrating bar makes straight (plane) wavefronts, and a lamp above casts their shadows onto a screen below, so you see bright and dark lines for crests and troughs.</p>
${(() => { let s = F.rect(40, 120, 400, 40, "b bS") + F.line(40, 120, 440, 120, "b") + F.rect(30, 160, 420, 10, "k mS") + F.line(60, 170, 60, 210, "k mid") + F.line(420, 170, 420, 210, "k mid");
  s += F.circ(240, 30, 16, "o oS") + F.text(266, 34, "lamp", "to small bold", "start"); for (let k = -1; k <= 1; k++) s += F.line(240 + k * 8, 46, 240 + k * 120, 116, "o thin d");
  s += F.rect(60, 106, 24, 14, "k kF") + F.text(52, 100, "vibrating bar (dipper)", "tk small", "start") + F.rect(30, 220, 420, 14, "m mS") + F.text(240, 252, "screen / paper showing the pattern", "tm small");
  return F.fig(480, 265, s, "Ripple tank: a motor vibrates a bar in the water, making waves. A lamp projects the wave pattern onto a screen below.", { size: "small" }); })()}
<h3>Reflection</h3>
${(() => { let s = F.line(320, 20, 320, 220, "k thick"); for (let i = 0; i < 9; i++) s += F.line(320 - 30 - i * 30 + 30, 30, 320 - 30 - i * 30 - 30 + 30, 210, "m");
  s = F.rect(330, 20, 10, 200, "kF"); const th = 40 * Math.PI / 180;
  for (let i = 1; i <= 6; i++) { const d = i * 32; s += F.line(330 - d / Math.cos(th) - 80 * Math.tan(th), 20, 330 - d / Math.cos(th) + 120 * Math.tan(th), 220, "b mid"); }
  for (let i = 1; i <= 4; i++) { const d = i * 32; s += F.line(330 - d / Math.cos(th) + 80 * Math.tan(th) - 120, 220 - 240, 330 - d / Math.cos(th) + 80 * Math.tan(th) - 120 + 240 * Math.tan(th), 220, "g mid d"); }
  s = F.rect(330, 20, 10, 200, "kF") + F.line(330, 120, 200, 120, "m d thin") + F.text(210, 112, "normal", "tm small", "start");
  s += ray(130, 40, 330, 120, "b thick") + ray(330, 120, 130, 200, "g thick") + F.arc(330, 120, 50, 158.2, 180, "b", "i", 1.5) + F.arc(330, 120, 50, 180, 201.8, "g", "r", 1.5);
  s += F.text(356, 124, "barrier", "tk small bold", "start");
  return F.fig(440, 230, s, "At a straight barrier, angle of incidence = angle of reflection. The speed, wavelength and frequency are unchanged.", { size: "small" }); })()}
<h3>Refraction</h3>
${(() => { const yB = 140, cx = 230, a1 = 40 * Math.PI / 180, a2 = Math.asin(Math.sin(a1) * 0.6), L1 = 36, L2 = 22;
  let s = F.rect(20, yB, 420, 110, "b bS") + F.text(30, yB + 100, "shallow water: slower, shorter λ", "tb small bold", "start") + F.text(30, 26, "deep water", "tk small bold", "start") + F.line(20, yB, 440, yB, "b");
  const segDeep = (s0) => { const px = cx - Math.sin(a1) * s0, py = yB - Math.cos(a1) * s0, ux = Math.cos(a1), uy = -Math.sin(a1); let t1 = -90, t2 = 90; const tb = (yB - py) / uy; if (uy < 0) t1 = Math.max(t1, tb); else t2 = Math.min(t2, tb); return F.line(px + ux * t1, py + uy * t1, px + ux * t2, py + uy * t2, "k mid"); };
  const segShallow = (s0) => { const px = cx + Math.sin(a2) * s0, py = yB + Math.cos(a2) * s0, ux = Math.cos(a2), uy = -Math.sin(a2); let t1 = -90, t2 = 90; const tb = (yB - py) / uy; if (uy < 0) t2 = Math.min(t2, tb); else t1 = Math.max(t1, tb); return F.line(px + ux * t1, py + uy * t1, px + ux * t2, py + uy * t2, "k mid"); };
  for (let k = 0; k < 4; k++) s += segDeep((k + 0.5) * L1);
  for (let k = 0; k < 4; k++) s += segShallow((k + 0.5) * L2);
  s += F.line(cx, yB - 120, cx, yB + 100, "m d thin") + F.arrow(cx - Math.sin(a1) * 170, yB - Math.cos(a1) * 170, cx, yB, "r thick", 10) + F.arrow(cx, yB, cx + Math.sin(a2) * 100, yB + Math.cos(a2) * 100, "r thick", 10) + F.text(cx + 6, yB - 104, "normal", "tm small", "start");
  return F.fig(460, 260, s, "Waves slow down entering shallow water. The wavefronts get closer together (shorter λ, same f), and the ray bends <b>towards the normal</b>.", { size: "small" }); })()}
<p><b>Refraction</b> is the change in direction of a wave caused by a change in its <b>speed</b> as it crosses a boundary between two media at an angle. The part of each wavefront that reaches the shallow water first slows down first, so the wavefront swings round. If the waves meet the boundary <b>head-on</b> (along the normal), they slow down and their wavelength shortens, but they <b>don't change direction</b>.</p>
<h3>Diffraction</h3>
${F.row(
  (() => { let s = F.rect(150, 20, 10, 70, "kF") + F.rect(150, 150, 10, 70, "kF"); for (let i = 0; i < 4; i++) s += F.line(40 + i * 28, 30, 40 + i * 28, 210, "b mid"); for (let i = 1; i <= 4; i++) { s += F.line(160 + i * 28, 90, 160 + i * 28, 150, "b mid") + F.path(`M${160 + i * 28},90 A${i * 28 + 20},${i * 28 + 20} 0 0 0 ${160 + i * 18},${90 - i * 10}`, "b mid") + F.path(`M${160 + i * 28},150 A${i * 28 + 20},${i * 28 + 20} 0 0 1 ${160 + i * 18},${150 + i * 10}`, "b mid"); } return F.fig(300, 240, s, "Wide gap (much bigger than λ): little spreading, only at the edges."); })(),
  (() => { let s = F.rect(150, 20, 10, 100, "kF") + F.rect(150, 132, 10, 88, "kF"); for (let i = 0; i < 4; i++) s += F.line(40 + i * 28, 30, 40 + i * 28, 210, "b mid"); for (let i = 1; i <= 4; i++) s += F.path(`M160,${126 - i * 26} A${i * 26},${i * 26} 0 0 1 160,${126 + i * 26}`, "b mid"); return F.fig(300, 240, s, "Narrow gap (about λ): strong spreading into near-semicircular wavefronts."); })()
)}
<p><b>Diffraction</b> is the spreading of waves as they pass through a gap or round the edge of an obstacle. The wavelength, frequency and speed are all <b>unchanged</b>.</p>
<p><b>Gap size and wavelength (S):</b> diffraction is <b>most noticeable when the gap is about the same size as the wavelength</b>. A gap much wider than $\lambda$ lets the waves through with only slight spreading at the edges. A longer wavelength (or narrower gap) gives more spreading.</p>
<ul><li>You can <b>hear</b> round a corner but not <b>see</b> round it: sound wavelengths (about 1 m) are similar to doorways, while light wavelengths ($\sim5\times10^{-7}$ m) are millions of times smaller.</li>
<li>Long-wave radio diffracts round hills, so it can be received in valleys where shorter-wavelength TV signals can't reach.</li></ul>
<details class="check"><summary>When drawing diffraction through a gap, what must stay the same about the wavefronts?</summary><div>The spacing between them (the wavelength), because the speed and frequency don't change.</div></details>`},

    { h: "Reflection of light and plane mirrors (3.2.1)", body: P`
<p class="lead">When light hits a surface, the <b>normal</b> is an imaginary line drawn at 90° to the surface at that point. All angles are measured from the normal, not from the surface.</p>
${(() => { let s = F.rect(40, 180, 400, 10, "kF") + F.line(240, 180, 240, 40, "m d") + F.text(246, 52, "normal", "tm small", "start") + ray(80, 60, 240, 180) + ray(240, 180, 400, 60) + F.arc(240, 180, 56, 90, 143.1, "o", "i", 1.4) + F.arc(240, 180, 56, 36.9, 90, "g", "r", 1.4);
  s += F.text(60, 50, "incident ray", "to small bold") + F.text(420, 50, "reflected ray", "to small bold") + F.text(240, 208, "plane mirror", "tk small bold");
  return F.fig(480, 220, s, "Law of reflection: angle of incidence $i$ = angle of reflection $r$, both measured from the normal. The incident ray, the reflected ray and the normal all lie in the same plane.", { size: "small" }); })()}
<h3>Image in a plane mirror</h3>
${(() => { const M = 260; let s = F.rect(M, 20, 8, 240, "kF") + F.text(M + 4, 276, "mirror", "tk small bold");
  s += F.line(120, 200, 120, 120, "b thick") + F.poly([[110, 132], [120, 112], [130, 132]], "bF", true) + F.text(120, 222, "object", "tb small bold");
  s += F.line(400, 200, 400, 120, "b thick d") + F.poly([[390, 132], [400, 112], [410, 132]], "bS b", true) + F.text(400, 222, "image (virtual)", "tb small bold");
  s += F.dim(120, 245, M, 245, "d", "m") + F.dim(M + 8, 245, 400, 245, "d", "m");
  const E = [70, 60]; s += F.circ(E[0], E[1], 10, "k bgF") + F.text(E[0], E[1] - 16, "eye", "tk small");
  [[M, 85], [M, 50]].forEach(([mx, my]) => { s += ray(120, 112, mx, my, "o mid") + ray(mx, my, E[0] + 8, E[1], "o mid") + F.line(mx, my, 400, 112, "o d thin"); });
  return F.fig(480, 290, s, "Rays from the top of the object reflect into the eye. The brain traces them back in straight lines (dashed), so they seem to come from behind the mirror, where the image is.", { size: "small" }); })()}
<p>The image in a plane mirror is:</p>
<ul><li><b>virtual</b>: the light rays don't actually pass through it; they only <i>appear</i> to come from it. It can't be projected onto a screen.</li>
<li><b>upright</b> (the same way up) and the <b>same size</b> as the object;</li>
<li>the <b>same distance behind</b> the mirror as the object is in front;</li>
<li><b>laterally inverted</b>: left and right are swapped, which is why "AMBULANCE" is written backwards on the front of ambulances.</li></ul>
<h3>Constructing the image</h3>
<ol class="steps-inline"><li>Draw the image point the same perpendicular distance behind the mirror as the object point is in front.</li>
<li>Draw straight lines from the <b>image</b> to the eye. Where each crosses the mirror is where real light reflects.</li>
<li>Draw solid rays from the <b>object</b> to those points, then on to the eye, with arrows. Draw the lines behind the mirror <b>dashed</b> (virtual).</li>
<li>Check $i=r$ at each reflection.</li></ol>
<details class="check"><summary>You stand 1.5 m in front of a mirror. How far are you from your image?</summary><div>The image is 1.5 m behind the mirror, so 3.0 m from you.</div></details>`},

    { h: "Refraction of light (3.2.2)", body: P`
<p class="lead">Light travels at $3.0\times10^8$ m/s in a vacuum (almost the same in air) but slower in glass ($\approx2.0\times10^8$ m/s) and water. When it crosses a boundary at an angle, the speed change makes it <b>change direction</b>: refraction.</p>
<div class="viz" data-viz="refraction"></div>
${(() => { const top = 60, bot = 190, L = 120, R = 380; let s = F.rect(L, top, R - L, bot - top, "b bS") + F.text(R - 8, bot - 10, "glass block", "tb small bold", "end");
  const i = 50 * Math.PI / 180, r = Math.asin(Math.sin(i) / 1.5), P1 = [180, top], P2 = [180 + (bot - top) * Math.tan(r), bot];
  s += F.line(P1[0], top - 50, P1[0], top + 60, "m d thin") + F.line(P2[0], bot - 60, P2[0], bot + 50, "m d thin");
  s += ray(P1[0] - 55 * Math.tan(i), top - 55, P1[0], top) + ray(P1[0], top, P2[0], P2[1]) + ray(P2[0], bot, P2[0] + 55 * Math.tan(i), bot + 55);
  s += F.arc(P1[0], top, 34, 90, 140, "k", "i", 1.5) + F.arc(P1[0], top, 34, 270, 270 + r * 180 / Math.PI, "k", "r", 1.6);
  s += F.line(P1[0] + 60 * Math.tan(i), top + 60, P1[0], top, "m d thin");
  s += F.text(40, 30, "air", "tm small bold", "start") + F.text(40, 230, "air", "tm small bold", "start") + F.text(P2[0] + 60, bot + 40, "emerges parallel to the incident ray", "to small", "start");
  return F.fig(500, 250, s, "Air → glass: slows, bends <b>towards</b> the normal ($r\lt i$). Glass → air: speeds up, bends <b>away</b> from the normal. For a parallel-sided block, the ray emerges parallel to its original direction, but shifted sideways.", { size: "small" }); })()}
<table class="t"><tr><th>Light going…</th><th>Speed</th><th>Bends</th></tr>
<tr><td>Into a denser medium (air → glass/water)</td><td>Decreases</td><td><b>Towards</b> the normal</td></tr>
<tr><td>Into a less dense medium (glass/water → air)</td><td>Increases</td><td><b>Away from</b> the normal</td></tr>
<tr><td>Along the normal ($i=0$)</td><td>Changes</td><td>No change of direction</td></tr></table>
<h3>Refractive index (S)</h3>
$$n=\frac{\sin i}{\sin r}$$
<p>Here $i$ is the angle in <b>air</b> and $r$ is the angle in the <b>material</b>. $n$ has no units and is always greater than 1. Glass is about 1.5, water 1.33, diamond 2.4. A larger $n$ means the light is slowed more and bent more. (It also equals $\dfrac{\text{speed in vacuum}}{\text{speed in material}}$, which links refraction to wave speed.)</p>
<h3>The glass-block experiment</h3>
<ol class="steps-inline"><li>Place a rectangular glass block on paper and trace round it.</li>
<li>Draw a normal at a point on one long side. Using a protractor, draw lines at angles of incidence of 20°, 30°, 40°, 50°, 60°…</li>
<li>Shine a narrow ray from a ray box along each line. Mark the emerging ray with two crosses, well apart.</li>
<li>Remove the block. Join the entry and exit points to show the ray inside the glass. Measure the angle of refraction $r$ from the normal.</li>
<li>Calculate $\dfrac{\sin i}{\sin r}$ for each, or plot $\sin i$ (y) against $\sin r$ (x). The gradient is $n$.</li></ol>
<p>Accuracy: use a thin ray, a sharp pencil and widely spaced crosses, and do it in a darkened room.</p>
<div class="callout ex"><b class="t">Worked example</b>Light enters glass at $i=50^\circ$ and refracts at $r=30.7^\circ$. Find $n$.<br>$n=\dfrac{\sin50^\circ}{\sin30.7^\circ}=\dfrac{0.766}{0.511}=1.50$.</div>
<details class="check"><summary>Light hits water ($n=1.33$) at 40°. Find the angle of refraction.</summary><div>$\sin r=\dfrac{\sin40^\circ}{1.33}=0.483$, so $r=28.9^\circ$.</div></details>`},

    { h: "Critical angle and total internal reflection (3.2.2)", body: P`
<p class="lead">When light travels from a denser medium (glass) <b>into a less dense one</b> (air), it bends away from the normal. Increase the angle of incidence and something dramatic happens.</p>
${F.row(...[[25, "i < c: most light refracts out; a weak partial reflection."], [41.8, "i = c: the refracted ray grazes along the surface (r = 90°)."], [58, "i > c: <b>total internal reflection</b>. All the light reflects."]].map(([deg, cap]) => {
  const cx = 130, yc = 70, R = 110, i = deg * Math.PI / 180; let s = F.path(`M${cx - R},${yc} A${R},${R} 0 0 0 ${cx + R},${yc} Z`, "b bS") + F.line(cx, yc - 50, cx, yc + R, "m d thin");
  s += ray(cx - R * Math.sin(i), yc + R * Math.cos(i), cx, yc);
  if (deg < 41) { const r = Math.asin(1.5 * Math.sin(i)); s += ray(cx, yc, cx + 60 * Math.sin(r), yc - 60 * Math.cos(r)) + ray(cx, yc, cx + R * .8 * Math.sin(i), yc + R * .8 * Math.cos(i), "o thin"); }
  else if (deg < 42) s += ray(cx, yc, cx + 110, yc - 1) + ray(cx, yc, cx + R * .8 * Math.sin(i), yc + R * .8 * Math.cos(i), "o thin");
  else s += ray(cx, yc, cx + R * .9 * Math.sin(i), yc + R * .9 * Math.cos(i));
  s += F.text(14, 20, "air", "tm small bold", "start") + F.text(14, 100, "glass", "tb small bold", "start") + F.text(cx - 34, yc + 52, Math.round(deg) + "°", "tk small bold");
  return F.fig(260, 200, s, cap); }))}
<div class="viz" data-viz="tir"></div>
<p>The <b>critical angle</b> $c$ is the angle of incidence (in the denser medium) for which the angle of refraction is exactly 90°. For glass it's about 42°.</p>
<div class="callout key"><b class="t">Two conditions for total internal reflection</b>1. The light is travelling from a <b>denser</b> medium into a <b>less dense</b> medium (e.g. glass → air).<br>2. The angle of incidence is <b>greater than the critical angle</b>.</div>
$$n=\frac{1}{\sin c}\qquad\text{(S)}$$
<p>This comes from $n=\dfrac{\sin i}{\sin r}$ applied in reverse. At the critical angle, the angle in air is 90° and $\sin90^\circ=1$. For glass: $\sin c=\dfrac1{1.5}=0.667$, so $c=41.8^\circ$. Diamond's high $n$ (2.4) gives $c\approx24.6^\circ$, so light gets trapped and bounces around inside, which is why diamonds sparkle.</p>
<h3>Optical fibres</h3>
${(() => { let s = F.path("M20,90 C140,90 160,40 280,40 C400,40 420,110 520,110", "b bS") + F.path("M20,90 C140,90 160,40 280,40 C400,40 420,110 520,110", "k") + F.path("M20,130 C140,130 160,80 280,80 C400,80 420,150 520,150", "k");
  s = F.path("M20,80 C140,80 160,40 280,40 C400,40 420,100 520,100 L520,140 C420,140 400,80 280,80 C160,80 140,120 20,120 Z", "k bS");
  s += F.poly([[20, 100], [90, 82], [150, 112], [205, 66], [260, 79], [320, 42], [380, 76], [430, 104], [480, 128], [520, 116]], "o thick");
  s += F.text(270, 150, "light totally internally reflects at each bounce: very little energy is lost", "to small bold");
  return F.fig(540, 170, s, "An optical fibre: a thin glass core. Light always meets the wall at more than the critical angle, so it is trapped and guided even round bends.", { size: "wide" }); })()}
<ul><li><b>Communications</b>: telephone, high-speed broadband and cable TV. Pulses of light or infrared carry data with very little loss and huge capacity.</li>
<li><b>Medicine</b>: an <b>endoscope</b> uses bundles of fibres to carry light into the body and an image back out, so doctors can see inside without major surgery.</li></ul>
<details class="check"><summary>A material has a critical angle of 37°. Find its refractive index.</summary><div>$n=\dfrac{1}{\sin37^\circ}=1.66$.</div></details>`},

    { h: "Dispersion (3.2.4)", body: P`
${(() => { const A = [200, 40], B = [100, 210], Cc = [300, 210]; let s = F.poly([A, B, Cc], "k bS", true);
  s += ray(20, 160, 150, 130, "k thick") + F.text(30, 150, "white light", "tk small bold", "start");
  const cols = ["#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#3949ab", "#8e24aa"], names = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  cols.forEach((col, k) => { const y2 = 120 + k * 9; s += `<line x1="150" y1="130" x2="248" y2="${118 + k * 4}" style="stroke:${col};stroke-width:2"/><line x1="248" y1="${118 + k * 4}" x2="460" y2="${150 + k * 16}" style="stroke:${col};stroke-width:3"/>` + F.text(468, 154 + k * 16, names[k], "tk small", "start"); });
  return F.fig(540, 270, s, "A prism splits white light into a spectrum. Violet is refracted (slowed) most and red least.", { size: "wide" }); })()}
<p class="lead"><b>Dispersion</b> is the splitting of white light into its component colours. White light is a mixture of all the visible colours.</p>
<p>The seven colours of the spectrum, in order, are <b>red, orange, yellow, green, blue, indigo, violet</b> (mnemonic: <i>Richard Of York Gave Battle In Vain</i>).</p>
<p><b>Why it happens:</b> glass has a slightly different refractive index for each colour. <b>Violet light slows the most</b> in glass, so it is refracted through the largest angle. <b>Red is refracted least</b>. The colours separate, and the prism's angled second face spreads them further. Rainbows are dispersion in raindrops.</p>
<p><b>Frequency and wavelength:</b> red light has the <b>lowest frequency and longest wavelength</b> of visible light (about $7\times10^{-7}$ m); violet has the <b>highest frequency and shortest wavelength</b> (about $4\times10^{-7}$ m).</p>
<p>(S) <b>Monochromatic</b> light is light of a <b>single frequency</b> (a single colour), for example from a laser. It isn't dispersed by a prism, because there's only one colour to bend.</p>
<details class="check"><summary>Which colour of light travels slowest in glass?</summary><div>Violet: it is refracted the most.</div></details>`},

    { h: "The electromagnetic spectrum (3.3)", body: P`
${(() => { const names = [["radio"], ["micro-", "waves"], ["infra-", "red"], ["visible"], ["ultra-", "violet"], ["X-rays"], ["gamma"]]; let s = "";
  names.forEach((n, k) => { s += F.rect(20 + k * 72, 50, 72, 44, (k === 3 ? "g gS" : "k mS")); n.forEach((t, j) => s += F.text(56 + k * 72, (n.length === 1 ? 77 : 69 + j * 16), t, "tk small bold")); });
  s += F.arrow(30, 120, 520, 120, "r thick", 10) + F.text(275, 140, "frequency and energy increase →", "tr small bold");
  s += F.arrow(520, 20, 30, 20, "b thick", 10) + F.text(275, 14, "← wavelength increases", "tb small bold");
  return F.fig(540, 160, s, "The EM spectrum, low to high frequency. All are transverse and travel at $3.0\\times10^8$ m/s in a vacuum.", { size: "wide" }); })()}
<p class="lead">Visible light is a tiny part of a whole family of <b>electromagnetic waves</b>. In order of <b>increasing frequency</b> (and decreasing wavelength): <b>radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays</b>.</p>
<p>Mnemonic: <i>Rich Men In Vegas Use eXpensive Gadgets</i>.</p>
<h3>What they all share</h3>
<ul><li>They are all <b>transverse</b> waves.</li><li>They all travel at the <b>same speed in a vacuum</b>: $3.0\times10^8$ m/s (and approximately the same in air).</li>
<li>They can travel through a vacuum (they don't need a medium), which is how sunlight reaches us.</li>
<li>They obey $v=f\lambda$. Since $v$ is fixed, a higher frequency always means a shorter wavelength.</li></ul>
<h3>Uses and dangers</h3>
<table class="t"><tr><th>Region</th><th>Uses</th><th>Harmful effects</th></tr>
<tr><td>Radio waves</td><td>Radio and television transmissions; astronomy; radio-frequency identification (RFID: contactless cards, tags)</td><td>—</td></tr>
<tr><td>Microwaves</td><td>Satellite television; mobile (cell) phones; microwave ovens</td><td><b>Internal heating</b> of body cells</td></tr>
<tr><td>Infrared</td><td>Electric grills; short-range communications (remote controllers); intruder alarms; thermal imaging; optical fibres</td><td><b>Skin burns</b></td></tr>
<tr><td>Visible light</td><td>Vision; photography; illumination</td><td>(Intense light can damage eyes)</td></tr>
<tr><td>Ultraviolet</td><td>Security marking; detecting fake bank notes; sterilising water</td><td>Damage to <b>surface cells and eyes</b>, leading to <b>skin cancer</b> and eye conditions</td></tr>
<tr><td>X-rays</td><td>Medical scanning; security scanners</td><td><b>Mutation or damage to cells</b> in the body</td></tr>
<tr><td>Gamma rays</td><td>Sterilising food and medical equipment; detection of cancer and its treatment</td><td><b>Mutation or damage to cells</b> in the body</td></tr></table>
<p>The pattern: higher-frequency waves carry more energy per photon. UV, X-rays and gamma are <b>ionising</b>: they can knock electrons out of atoms and damage DNA, which can cause mutations and cancer.</p>
<details class="check"><summary>A radio wave has a frequency of 100 MHz. Find its wavelength.</summary><div>$\lambda=\dfrac{3.0\times10^8}{1.0\times10^8}=3.0$ m.</div></details>`},

    { h: "Communication with EM waves (3.3 S)", body: P`
<h3>Choosing the right wave</h3>
<ul><li><b>Mobile phones and wireless internet (Wi-Fi)</b> use <b>microwaves</b>: they can penetrate some walls and need only a short aerial for transmitting and receiving.</li>
<li><b>Bluetooth</b> uses <b>radio waves</b>: they pass through walls, though the signal is weakened, which suits short-range links.</li>
<li><b>Optical fibres</b> carry <b>visible light or infrared</b> for cable television and high-speed broadband: glass is transparent to them, and their high frequency means they can carry data at a very high rate.</li>
<li><b>Satellites</b> communicate mainly using <b>microwaves</b>. Some satellite phones use <b>low-orbit</b> satellites. Other satellite phones and direct-broadcast satellite TV use <b>geostationary</b> satellites, which stay above one point on the equator.</li></ul>
<h3>Analogue and digital signals</h3>
${F.row(
  F.plot({ w: 260, h: 170, x: [0, 10], y: [-1.3, 1.3], grid: false, m: { l: 16, r: 14, t: 12, b: 14 }, curves: [{ f: x => Math.sin(x * 1.3) * 0.7 + Math.sin(x * 2.7) * 0.3, c: "b thick" }], cap: "<b>Analogue</b>: varies continuously and can take any value." }),
  F.plot({ w: 260, h: 170, x: [0, 10], y: [-0.3, 1.3], grid: false, m: { l: 16, r: 14, t: 12, b: 14 }, curves: [{ pts: [[0, 0], [1, 0], [1, 1], [3, 1], [3, 0], [4, 0], [4, 1], [5, 1], [5, 0], [7, 0], [7, 1], [9, 1], [9, 0], [10, 0]], c: "o thick" }], cap: "<b>Digital</b>: only two values, 1 (on) and 0 (off)." })
)}
<p>Sound can be transmitted as either. Both kinds pick up <b>noise</b> and weaken as they travel, so they're amplified at intervals. Amplifying an analogue signal amplifies the noise too. A digital signal can be <b>regenerated</b> exactly, because the receiver only has to decide "1 or 0", so the noise is removed.</p>
<div class="callout key"><b class="t">Benefits of digital</b>1. An <b>increased rate of transmission</b> of data.<br>2. An <b>increased range</b>, because the signal can be accurately regenerated (cleaned up) at intervals.</div>
<details class="check"><summary>Why is high-speed broadband sent along optical fibres using infrared rather than along copper wires using radio-frequency signals?</summary><div>Infrared has a much higher frequency, so it can carry data at a far higher rate, and glass is transparent to it, so losses are low.</div></details>`},

    { h: "Sound (3.4)", body: P`
<p class="lead">Sound is produced by <b>vibrating</b> objects: a guitar string, a loudspeaker cone, your vocal cords. The vibration pushes and pulls on the neighbouring air particles, sending a <b>longitudinal</b> wave of <b>compressions</b> and <b>rarefactions</b> outwards.</p>
${(() => { let s = F.rect(20, 50, 18, 90, "k mS") + F.text(29, 160, "loudspeaker", "tk small"); for (let i = 0; i <= 44; i++) { const x0 = 50 + i * 10, dx = 11 * Math.sin(i / 44 * 4 * Math.PI); for (let j = 0; j < 5; j++) s += F.dot(x0 + dx, 56 + j * 20, "b", 2.5); }
  const pp = []; for (let x = 50; x <= 490; x += 3) pp.push([x, 210 + 26 * Math.cos((x - 50) / 440 * 4 * Math.PI)]); s += F.poly(pp, "o thick") + F.text(160, 46, "C", "tr bold") + F.text(380, 46, "C", "tr bold") + F.text(270, 46, "R", "tb bold") + F.line(50, 210, 490, 210, "m d thin") + F.text(270, 254, "pressure: high at compressions, low at rarefactions", "to small bold");
  return F.fig(520, 265, s, "Sound in air: regions of compression (high pressure) and rarefaction (low pressure). Plotting pressure against distance gives a wave shape.", { size: "wide" }); })()}
<h3>Sound needs a medium</h3>
${(() => { let s = F.path("M120,200 L120,90 A80,80 0 0 1 280,90 L280,200", "k bS") + F.line(90, 200, 310, 200, "k thick") + F.circ(200, 110, 22, "o oS") + F.text(200, 115, "bell", "tk small bold");
  s += F.line(200, 200, 200, 240, "k mid") + F.line(200, 240, 330, 240, "k mid") + F.rect(330, 225, 96, 30, "k mS", 4) + F.text(378, 245, "vacuum pump", "tk small bold");
  s += F.text(200, 170, "air pumped out", "tb small");
  return F.fig(440, 270, s, "Bell-jar experiment: as the air is removed, the ringing gets quieter until it can't be heard, though you can still see the hammer striking. Light crosses a vacuum; sound can't.", { size: "small" }); })()}
<p>Sound <b>cannot travel through a vacuum</b>: there are no particles to pass the vibrations on. It travels through solids, liquids and gases.</p>
<ul><li>Speed of sound in air: about <b>330–350 m/s</b> (depending on temperature).</li>
<li>(S) Sound travels <b>faster in liquids than in gases</b>, and <b>fastest in solids</b> (air ≈ 340 m/s, water ≈ 1500 m/s, steel ≈ 5000 m/s), because the particles are closer together and more strongly linked.</li>
<li>Human hearing range: <b>20 Hz to 20 000 Hz</b> (20 kHz). The upper limit falls with age. Sound above 20 kHz is <b>ultrasound</b>.</li></ul>
<h3>Loudness and pitch</h3>
${F.row(scope(22, 3, "Quiet, low pitch"), scope(50, 3, "<b>Louder</b>: bigger amplitude, same frequency"), scope(22, 7, "<b>Higher pitch</b>: higher frequency (more waves on screen)"))}
<ul><li><b>Loudness</b> depends on <b>amplitude</b>: bigger vibrations carry more energy.</li>
<li><b>Pitch</b> depends on <b>frequency</b>: faster vibrations sound higher.</li></ul>
<p>On an oscilloscope trace, the amplitude is the height of the wave from the centre line, and the frequency shows as how many waves fit across the screen.</p>
<h3>Echoes and measuring the speed of sound</h3>
<p>An <b>echo</b> is a reflected sound wave. Hard, flat surfaces reflect sound well; soft materials absorb it.</p>
<ol class="steps-inline"><li><b>Direct method:</b> two people stand a measured distance apart (e.g. 400 m, measured with a trundle wheel). One bangs two wooden blocks together; the other starts a stopwatch on <b>seeing</b> the blocks hit and stops it on <b>hearing</b> the sound. Light arrives almost instantly, so $v=\dfrac dt$.</li>
<li><b>Echo method:</b> stand a measured distance $d$ from a large wall and clap. Time the echo (or clap in rhythm with the echoes and time 20 claps). The sound travels <b>there and back</b>: $v=\dfrac{2d}{t}$.</li>
<li>Repeat and average to reduce the effect of reaction time. Using a longer distance makes the timing error smaller relative to the time measured.</li></ol>
<h3>Ultrasound (S)</h3>
${(() => { let s = F.rect(0, 70, 540, 150, "b bS") + F.path("M180,70 L200,40 L330,40 L350,70 Z", "k mS") + F.text(265, 60, "ship", "tk small bold") + F.rect(0, 220, 540, 30, "o oS") + F.text(270, 240, "sea bed", "to small bold");
  s += F.arrow(240, 72, 240, 216, "r thick", 10) + F.arrow(290, 216, 290, 72, "g thick", 10) + F.text(234, 150, "pulse sent", "tr small bold", "end") + F.text(296, 150, "echo received", "tg small bold", "start");
  return F.fig(540, 260, s, "Sonar: depth $=\\dfrac{\\text{speed}\\times\\text{time}}{2}$, because the pulse travels down and back up.", { size: "wide" }); })()}
<ul><li><b>Non-destructive testing</b>: reflections from cracks or flaws inside metal parts (rails, aircraft wings) show up without cutting them open.</li>
<li><b>Medical scanning of soft tissue</b>: pregnancy scans and organ imaging. Reflections at boundaries between tissues build up an image. It's safe because ultrasound is not ionising.</li>
<li><b>Sonar</b>: ships send ultrasound pulses and time the echoes to find the depth of water or locate shoals of fish. Bats and dolphins use the same principle (echolocation).</li></ul>
<div class="callout ex"><b class="t">Worked example</b>A sonar pulse returns 0.80 s after it is sent. Sound travels at 1500 m/s in sea water. Find the depth.<br>Total distance $=1500\times0.80=1200$ m. Depth $=\dfrac{1200}{2}=600$ m.</div>
<details class="check"><summary>A girl claps 85 m from a wall and hears the echo 0.50 s later. Calculate the speed of sound.</summary><div>Distance there and back $=170$ m, so $v=170/0.50=340$ m/s.</div></details>`}
  ],
  worked: [
    { q: P`A sound wave of frequency 680 Hz travels at 340 m/s in air. Find its wavelength. What happens to $f$ and $\lambda$ when it enters water (1500 m/s)?`,
      steps: [P`$\lambda=\dfrac vf=\dfrac{340}{680}=0.50$ m.`, P`In water $f$ stays 680 Hz, and $\lambda=\dfrac{1500}{680}=2.2$ m. The wavelength increases.`]},
    { q: P`Light enters glass at an angle of incidence of 50° and refracts at 30.7°. Find the refractive index and the critical angle.`,
      steps: [P`$n=\dfrac{\sin50^\circ}{\sin30.7^\circ}=\dfrac{0.766}{0.511}=1.50$.`, P`$\sin c=\dfrac1n=0.667\Rightarrow c=41.8^\circ$.`]},
    { q: P`A ship sends an ultrasound pulse to the sea bed and receives the echo 0.80 s later. Sound travels at 1500 m/s in sea water. How deep is the sea?`,
      steps: [P`Total distance $=1500\times0.80=1200$ m (there and back).`, P`Depth $=\dfrac{1200}{2}=600$ m.`]}
  ],
  formulas: [
    ["Wave equation", P`$v=f\lambda$`], ["Period", P`$T=\dfrac1f$`], ["Refractive index", P`$n=\dfrac{\sin i}{\sin r}$`], ["Critical angle", P`$n=\dfrac1{\sin c}$`],
    ["Echo distance", P`$d=\dfrac{vt}{2}$`], ["Speed of light", P`$3.0\times10^8$ m/s`]
  ],
  cards: [
    ["What do waves transfer?", "Energy (and information), without transferring matter."],
    ["Transverse vs longitudinal", "Transverse: oscillation perpendicular to travel. Longitudinal: parallel, with compressions and rarefactions."],
    ["Examples of transverse waves", "EM waves, water ripples, waves on a rope, seismic S-waves."],
    ["Examples of longitudinal waves", "Sound and seismic P-waves."],
    ["Define amplitude", "Maximum displacement from the rest position."],
    ["Define wavelength", "Distance between two consecutive identical points, e.g. crest to crest."],
    ["What stays constant when a wave enters a new medium?", "Frequency."],
    ["Water waves entering shallow water", "Slow down, wavelength decreases, bend towards the normal."],
    ["When is diffraction greatest?", "When the gap is about the same size as the wavelength."],
    ["Law of reflection", "Angle of incidence = angle of reflection (both measured from the normal)."],
    ["Four properties of a plane-mirror image", "Virtual, upright, same size, same distance behind the mirror (and laterally inverted)."],
    ["Light entering glass bends…", "Towards the normal (it slows down)."],
    ["Two conditions for total internal reflection", "Dense → less dense medium, and angle of incidence > critical angle."],
    ["Refractive index formulas", P`$n=\sin i/\sin r$ and $n=1/\sin c$`],
    ["Two uses of optical fibres", "Communications (broadband, cable TV) and endoscopes."],
    ["Which colour is refracted most by a prism?", "Violet."],
    ["Define monochromatic light", "Light of a single frequency."],
    ["EM spectrum, low to high frequency", "Radio, microwave, infrared, visible, UV, X-ray, gamma."],
    ["Speed of EM waves in a vacuum", P`$3.0\times10^8$ m/s`],
    ["Harmful effect of UV", "Damage to surface cells and eyes: skin cancer and eye conditions."],
    ["Harmful effect of microwaves", "Internal heating of body cells."],
    ["Harmful effect of X-rays and gamma", "Mutation or damage to cells in the body."],
    ["Why do mobile phones use microwaves?", "They penetrate some walls and need only a short aerial."],
    ["Two benefits of digital signals", "Higher data transmission rate, and greater range due to accurate regeneration."],
    ["Range of human hearing", "20 Hz to 20 kHz."],
    ["Why can't sound travel through a vacuum?", "It needs particles (a medium) to pass on the vibrations."],
    ["Speed of sound in air", "About 330–350 m/s."],
    ["Loudness and pitch depend on…", "Loudness on amplitude, pitch on frequency."],
    ["Three uses of ultrasound", "Non-destructive testing, medical scanning of soft tissue, sonar."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Which is a longitudinal wave?`, opts: ["Light", "Sound", "X-rays", "Ripples on water"], ans: 1, why: P`Sound travels as compressions and rarefactions.` },
    { type: "mcq", marks: 1, q: P`A wave has frequency 50 Hz and wavelength 4 m. Its speed is`, opts: ["12.5 m/s", "54 m/s", "200 m/s", "0.08 m/s"], ans: 2, why: P`$v=f\lambda=50\times4=200$ m/s.` },
    { type: "mcq", marks: 1, q: P`Light entering glass from air bends`, opts: ["Away from the normal", "Towards the normal", "Not at all", "Along the surface"], ans: 1, why: P`It slows down, so it bends towards the normal.` },
    { type: "mcq", marks: 1, q: P`The image in a plane mirror is`, opts: ["Real and inverted", "Virtual and the same size", "Real and the same size", "Virtual and magnified"], ans: 1, why: P`Virtual, upright, same size, same distance behind.` },
    { type: "mcq", marks: 1, q: P`Which EM wave has the shortest wavelength?`, opts: ["Radio", "Infrared", "Ultraviolet", "Gamma"], ans: 3, why: P`Gamma has the highest frequency, so the shortest wavelength.` },
    { type: "mcq", marks: 2, q: P`A material has refractive index 1.25. Its critical angle is`, opts: ["36.9°", "53.1°", "51.3°", "38.7°"], ans: 1, why: P`$\sin c=1/1.25=0.8\Rightarrow c=53.1^\circ$.` },
    { type: "mcq", marks: 1, q: P`Increasing the amplitude of a sound wave makes it`, opts: ["Higher pitched", "Lower pitched", "Louder", "Faster"], ans: 2, why: P`Amplitude controls loudness; frequency controls pitch.` },
    { type: "mcq", marks: 1, q: P`Which is used for sterilising water?`, opts: ["Infrared", "Microwaves", "Ultraviolet", "Radio waves"], ans: 2, why: P`UV kills microorganisms.` },
    { type: "struct", marks: 3, q: P`Explain why diffraction of sound around a doorway is easily noticed but diffraction of light is not.`,
      ms: P`<b>B1</b> diffraction is greatest when gap ≈ wavelength<br><b>B1</b> sound wavelengths (~1 m) are similar to the door width<br><b>B1</b> light wavelengths (~$5\times10^{-7}$ m) are far smaller than the gap` },
    { type: "struct", marks: 4, q: P`Water waves pass from deep to shallow water at an angle. Describe and explain what happens to their speed, frequency, wavelength and direction.`,
      ms: P`<b>B1</b> speed decreases<br><b>B1</b> frequency unchanged (set by the source)<br><b>B1</b> wavelength decreases ($\lambda=v/f$)<br><b>B1</b> direction changes towards the normal (refraction)` },
    { type: "struct", marks: 4, q: P`State the two conditions needed for total internal reflection, and explain how an optical fibre carries light along a curved path.`,
      ms: P`<b>B1</b> light travelling from a denser to a less dense medium<br><b>B1</b> angle of incidence greater than the critical angle<br><b>B1</b> light hits the inner surface of the fibre at more than the critical angle<br><b>B1</b> so it is totally internally reflected repeatedly along the fibre` },
    { type: "struct", marks: 4, q: P`Light travels from air into a glass block with angle of incidence 40°. The refractive index of the glass is 1.52. Calculate (a) the angle of refraction, (b) the critical angle of the glass.`,
      ms: P`(a) <b>M1</b> $\sin r=\dfrac{\sin40^\circ}{1.52}=0.423$ <b>A1</b> $r=25.0^\circ$<br>(b) <b>M1</b> $\sin c=\dfrac1{1.52}$ <b>A1</b> $c=41.1^\circ$` },
    { type: "struct", marks: 4, q: P`Describe how you would measure the speed of sound in air outdoors.`,
      ms: P`<b>B1</b> measure a large distance (e.g. 400 m) with a trundle wheel / tape<br><b>B1</b> one person makes a sharp sound with a visible action (e.g. clapping boards); the other starts the stopwatch on seeing it and stops on hearing it<br><b>B1</b> speed = distance ÷ time<br><b>B1</b> repeat several times and average (reduces reaction-time error)` },
    { type: "struct", marks: 3, q: P`A ship's sonar pulse returns 1.2 s after it is sent. The speed of sound in sea water is 1500 m/s. Calculate the depth of the water.`,
      ms: P`<b>M1</b> $d=1500\times1.2=1800$ m (there and back)<br><b>M1</b> divide by 2<br><b>A1</b> $900$ m` },
    { type: "struct", marks: 4, q: P`State one use and one harmful effect each of (a) microwaves, (b) ultraviolet.`,
      ms: P`(a) <b>B1</b> mobile phones / satellite TV / microwave ovens <b>B1</b> internal heating of body cells<br>(b) <b>B1</b> security marking / detecting fake bank notes / sterilising water <b>B1</b> damage to surface cells and eyes, leading to skin cancer` },
    { type: "struct", marks: 3, q: P`Explain two advantages of transmitting signals digitally rather than as analogue.`,
      ms: P`<b>B1</b> noise can be removed / the signal can be accurately regenerated because it only has two values<br><b>B1</b> so it has a greater range (it can travel further without losing quality)<br><b>B1</b> a higher rate of data transmission` },
    { type: "struct", marks: 3, q: P`Describe the image formed by a plane mirror and explain why it is called virtual.`,
      ms: P`<b>B1</b> upright, same size, laterally inverted<br><b>B1</b> same distance behind the mirror as the object is in front<br><b>B1</b> virtual: the rays do not actually meet; they only appear to come from behind the mirror, so it can't be formed on a screen` },
    { type: "struct", marks: 3, q: P`Explain why an astronaut on a spacewalk cannot hear a nearby explosion, but would see it.`,
      ms: P`<b>B1</b> space is a vacuum: there are no particles<br><b>B1</b> sound is a longitudinal (mechanical) wave and needs a medium to pass on vibrations<br><b>B1</b> light is an EM wave and can travel through a vacuum` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: P`Define (a) wavelength, (b) frequency.`, ms: P`<b>B1</b> (a) distance between two adjacent crests (or equivalent points)<br><b>B1</b> (b) number of waves passing a point per second` },
    { d: 1, type: "mcq", marks: 1, q: P`Which is a longitudinal wave?`, opts: ["Light", "Sound", "Microwaves", "Water ripples"], ans: 1, why: P`Sound has compressions and rarefactions.` },
    { d: 1, type: "struct", marks: 2, q: P`State the law of reflection, and the angle of reflection when light hits a mirror at 35° to the normal.`, ms: P`<b>B1</b> angle of incidence = angle of reflection<br><b>B1</b> 35°` },
    { d: 1, type: "struct", marks: 2, q: P`List the regions of the electromagnetic spectrum in order of increasing frequency.`, ms: P`<b>B2</b> radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma (−1 per error)` },
    { d: 2, type: "struct", marks: 3, q: P`A wave has frequency 50 Hz and wavelength 0.40 m. (a) Calculate its speed. (b) What is the wavelength if the frequency doubles in the same medium?`, ms: P`<b>(a) C1</b> $v=f\lambda$<br><b>A1</b> 20 m/s<br><b>(b) A1</b> 0.20 m` },
    { d: 2, type: "struct", marks: 3, q: P`Light passes from air into glass (n = 1.5) at an angle of incidence of 40°. Calculate the angle of refraction.`, ms: P`<b>C1</b> $n=\sin i/\sin r$<br><b>C1</b> $\sin r=\sin40/1.5=0.43$<br><b>A1</b> 25°` },
    { d: 2, type: "mcq", marks: 1, q: P`The critical angle of a glass is 42°. Total internal reflection occurs when light inside the glass meets the surface at`, opts: ["30°", "40°", "42°", "50°"], ans: 3, why: P`Angle must exceed the critical angle.` },
    { d: 2, type: "struct", marks: 3, q: P`A person claps 85 m from a wall and hears the echo 0.50 s later. Calculate the speed of sound.`, ms: P`<b>C1</b> distance travelled = 170 m<br><b>C1</b> $v=170/0.50$<br><b>A1</b> 340 m/s` },
    { d: 2, type: "struct", marks: 3, q: P`State one use and one hazard of (a) ultraviolet, (b) X-rays, (c) microwaves.`, ms: P`<b>B1</b> UV: sterilising water / security marking; skin cancer / eye damage<br><b>B1</b> X-rays: medical images / security scanners; cell damage, cancer<br><b>B1</b> microwaves: cooking / satellite communication; internal heating of tissue` },
    { d: 3, type: "struct", marks: 5, q: P`S: Explain, with a diagram, how an optical fibre transmits light, and why the critical angle is important. Calculate the critical angle for glass of refractive index 1.52.`, ms: P`<b>B1</b> light enters one end and repeatedly reflects off the inner surface<br><b>B1</b> angle at the boundary always greater than the critical angle<br><b>B1</b> so total internal reflection occurs with no light escaping<br><b>C1</b> $\sin c=1/1.52$<br><b>A1</b> 41°` },
    { d: 3, type: "struct", marks: 5, q: P`Water waves pass from deep to shallow water. (a) State what happens to their speed, wavelength and frequency. (b) Draw the wavefronts if they meet the boundary at an angle. (c) Explain why the direction changes.`, ms: P`<b>(a) B1</b> speed decreases<br><b>B1</b> wavelength decreases, frequency unchanged<br><b>(b) B1</b> wavefronts closer together and bent towards the boundary line<br><b>(c) B1</b> one end of each wavefront slows first<br><b>B1</b> so the wavefront turns (refraction)` },
    { d: 3, type: "struct", marks: 4, q: P`S: Explain why digital signals are preferred to analogue signals for long-distance communication.`, ms: P`<b>B1</b> signals pick up noise and weaken over distance; both need amplifying<br><b>B1</b> amplifying an analogue signal amplifies the noise too<br><b>B1</b> digital signals can be regenerated: only two levels (0/1), noise removed<br><b>B1</b> digital: more data per second / easier processing` }
  ]
});
}
