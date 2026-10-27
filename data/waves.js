window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;

/* ============================================================
   WAVES, LIGHT & SOUND  (0625: 3.1, 3.2.1, 3.2.2, 3.2.4, 3.3, 3.4)
   ============================================================ */
TOPICS.push({
  id: "waves", subject: "physics", title: "Waves, light & sound",
  blurb: "Wave properties, v = fλ, reflection, refraction, total internal reflection, dispersion, the EM spectrum, communication and sound.",
  level: "Core → Supplement", demo: "wave",
  syllabus: [
    ["3.1", "Waves transfer energy without transferring matter; transverse and longitudinal waves with examples", 0],
    ["3.1", "Wave features: wavefront, wavelength, frequency, crest, trough, amplitude, wave speed; $v=f\\lambda$", 1],
    ["3.1", "Reflection, refraction and diffraction of water waves in a ripple tank", 2],
    ["3.1 S", "The effect of gap size and wavelength on diffraction", 2],
    ["3.2.1", "Reflection of light: law of reflection; the image in a plane mirror", 3],
    ["3.2.2", "Refraction of light; the glass-block experiment; critical angle and total internal reflection; optical fibres", 4],
    ["3.2.2 S", "Refractive index $n=\\sin i/\\sin r$ and $n=1/\\sin c$", 4],
    ["3.2.4", "Dispersion of white light by a prism; the seven colours (S: monochromatic light)", 5],
    ["3.3", "The EM spectrum: order, speed in a vacuum, uses and harmful effects of each region", 6],
    ["3.3 S", "Communication: microwaves, radio waves, optical fibres, satellites; analogue vs digital signals", 7],
    ["3.4", "Sound: produced by vibration, longitudinal, compressions and rarefactions, needs a medium; 20 Hz–20 kHz", 8],
    ["3.4", "Speed of sound in air and how to measure it; echoes; loudness, pitch, amplitude and frequency", 8],
    ["3.4 S", "Speed of sound in solids, liquids and gases; ultrasound and its uses", 8]
  ],
  sections: [
    { h: "What waves are", body: P`
<p>A wave is an oscillation that transfers <b>energy</b> (and information) from one place to another <b>without transferring matter</b>. A cork on a pond bobs up and down as ripples pass, but it does not travel with them.</p>
<ul>
<li><b>Transverse</b>: the oscillations are <b>perpendicular</b> to the direction of energy transfer. Examples: all electromagnetic waves (light, radio…), ripples on water, waves on a rope, seismic S-waves.</li>
<li><b>Longitudinal</b>: the oscillations are <b>parallel</b> to the direction of energy transfer, producing <b>compressions</b> (particles bunched up) and <b>rarefactions</b> (particles spread out). Examples: sound, seismic P-waves, a slinky pushed back and forth.</li>
</ul>
<p>Switch between the two in the interactive lab below and watch a single particle: it only oscillates about a fixed position.</p>`},
    { h: "Describing waves and the wave equation", body: P`
<ul>
<li><b>Amplitude</b>: the maximum displacement from the rest position. It is measured from the middle, <b>not</b> from crest to trough. A bigger amplitude means more energy (louder sound, brighter light).</li>
<li><b>Wavelength</b> $\lambda$: the distance between two consecutive identical points, e.g. crest to crest (or compression to compression).</li>
<li><b>Frequency</b> $f$: the number of waves passing a point per second (Hz).</li>
<li><b>Period</b> $T=\dfrac1f$: the time for one complete wave.</li>
<li><b>Crest / trough</b>: the highest and lowest points of a transverse wave. A <b>wavefront</b> is a line joining points on the same crest. In a ripple tank, each bright line is a wavefront, so the spacing between them is $\lambda$.</li>
</ul>
$$v=f\lambda$$
<p>Why? In one period $T$ the wave moves forward one wavelength, so $v=\dfrac{\lambda}{T}=f\lambda$.</p>
<div class="callout key"><b class="t">Key insight</b>Frequency is set by the <b>source</b> and <b>never changes</b> when a wave enters a new medium. If the speed changes, the <b>wavelength</b> must change in proportion. Slower means shorter wavelength.</div>`},
    { h: "Reflection, refraction and diffraction of waves", body: P`
<p>These are seen with water waves in a <b>ripple tank</b>:</p>
<ul>
<li><b>Reflection</b> at a straight barrier: the angle of incidence equals the angle of reflection. The wavelength, frequency and speed are unchanged.</li>
<li><b>Refraction</b> at a boundary between deep and <b>shallow</b> water: waves travel <b>slower</b> in shallow water, so the wavelength is shorter (wavefronts closer together). If they arrive at an angle, they change direction, bending <b>towards the normal</b> in the shallow region.</li>
<li><b>Diffraction</b>: waves spread out as they pass through a gap or round an edge.</li>
</ul>
<h3>Diffraction and gap size (S)</h3>
<p>Diffraction is <b>most noticeable when the gap is similar in size to the wavelength</b>. A gap much wider than $\lambda$ lets the waves through with only slight spreading at the edges. A narrow gap (≈ λ) produces almost semicircular wavefronts. The wavelength stays <b>unchanged</b> by diffraction.</p>
<p>That's why you can hear round a corner but not see round it. Sound wavelengths (around 1 m) are similar to doorways, while light wavelengths (around $5\times10^{-7}$ m) are far smaller.</p>`},
    { h: "Reflection of light and plane mirrors", body: P`
<p>All angles are measured from the <b>normal</b>: a line drawn at 90° to the surface where the ray hits.</p>
$$\text{angle of incidence }i=\text{angle of reflection }r$$
<p>The image in a <b>plane mirror</b> is:</p>
<ul><li><b>virtual</b>: rays only <i>appear</i> to come from it, so it can't be projected on a screen</li>
<li><b>upright</b> and the <b>same size</b> as the object</li>
<li>the <b>same distance behind</b> the mirror as the object is in front</li>
<li><b>laterally inverted</b> (left and right swapped)</li></ul>
<p><b>Constructing the image:</b> draw two rays from the object, reflect each so that $i=r$, then extend the reflected rays backwards with dashed lines. They meet at the image.</p>`},
    { h: "Refraction and total internal reflection", body: P`
<p>Light changes speed when it enters a different medium. In glass it travels at about $2\times10^8$ m/s, slower than $3\times10^8$ m/s in air. If it enters at an angle, one side of each wavefront slows first, so the ray <b>changes direction</b>:</p>
<div class="viz" data-viz="refraction"></div>
<ul><li>Into a denser medium (air → glass): slows down, bends <b>towards</b> the normal.</li>
<li>Out of a denser medium (glass → air): speeds up, bends <b>away from</b> the normal.</li>
<li>Along the normal ($i=0$): it changes speed but <b>not</b> direction.</li></ul>
<h3>Refractive index (S)</h3>
$$n=\frac{\sin i}{\sin r}$$
<p>Here $i$ is the angle in air and $r$ is the angle in the material. Glass has $n\approx1.5$. A larger $n$ means the light slows more and bends more. (It also equals $\dfrac{\text{speed in air}}{\text{speed in material}}$, which is a nice link to wave speed.)</p>
<p><b>Glass block experiment:</b> trace round the block, shine a ray at a measured angle of incidence, and mark the emerging ray with crosses. Join the points through the block, then measure $r$ with a protractor from the normal. Repeat for several angles. A graph of $\sin i$ against $\sin r$ has gradient $n$.</p>
<h3>Critical angle and total internal reflection</h3>
<div class="viz" data-viz="tir"></div>
<p>For light going from glass <b>into air</b>, increasing the angle of incidence makes the refracted ray bend closer to the surface. At the <b>critical angle</b> $c$ the refracted ray travels along the surface (refraction angle 90°). Beyond it, <b>all</b> the light reflects back inside: <b>total internal reflection (TIR)</b>.</p>
<p>TIR needs <b>both</b> conditions: (1) light travelling from a <b>denser to a less dense</b> medium, and (2) angle of incidence <b>greater than the critical angle</b>.</p>
$$n=\frac{1}{\sin c}\quad(\text{S})$$
<p><b>Optical fibres</b>: light enters one end and hits the wall at more than the critical angle, so it totally internally reflects all the way along, even round bends, with very little energy loss. Uses: <b>communications</b> (telephone, broadband, cable TV) and <b>endoscopes</b> for seeing inside the body.</p>`},
    { h: "Dispersion", body: P`
<p>When white light passes through a <b>prism</b>, it splits into a spectrum: <b>red, orange, yellow, green, blue, indigo, violet</b>. This is <b>dispersion</b>.</p>
<p>It happens because each colour has a slightly different refractive index in glass. <b>Violet is refracted (slowed) most</b> and red least, so they leave at different angles.</p>
<p>(S) <b>Monochromatic</b> light is light of a single frequency (a single colour), such as laser light. Red has the lowest frequency and longest wavelength of visible light; violet has the highest frequency and shortest wavelength.</p>`},
    { h: "The electromagnetic spectrum", body: P`
<p>In order of <b>increasing frequency</b> (decreasing wavelength): <b>radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays</b>. Mnemonic: <i>Rich Men In Vegas Use eXpensive Gadgets</i>.</p>
<p>All EM waves are transverse, travel at the <b>same speed in a vacuum</b>, $3.0\times10^8$ m/s (approximately the same in air), and can travel through a vacuum. Higher frequency means more energy and more danger.</p>
<table class="t"><tr><th>Region</th><th>Uses</th><th>Harmful effects</th></tr>
<tr><td>Radio</td><td>Radio and TV transmission, astronomy, RFID (e.g. contactless cards)</td><td>—</td></tr>
<tr><td>Microwaves</td><td>Satellite TV, mobile phones, microwave ovens</td><td>Internal heating of body cells</td></tr>
<tr><td>Infrared</td><td>Electric grills, remote controls, intruder alarms, thermal imaging, optical fibres</td><td>Skin burns</td></tr>
<tr><td>Visible</td><td>Vision, photography, illumination</td><td>—</td></tr>
<tr><td>Ultraviolet</td><td>Security marking, detecting fake bank notes, sterilising water</td><td>Damage to surface cells and eyes, leading to skin cancer and eye conditions</td></tr>
<tr><td>X-rays</td><td>Medical scanning, airport security scanners</td><td>Mutation or damage to cells in the body</td></tr>
<tr><td>Gamma</td><td>Sterilising food and medical equipment, detecting and treating cancer</td><td>Mutation or damage to cells in the body</td></tr></table>`},
    { h: "Communication with EM waves (S)", body: P`
<ul>
<li><b>Mobile phones and wireless internet</b> use <b>microwaves</b>: they can penetrate some walls and need only a short aerial.</li>
<li><b>Bluetooth</b> uses <b>radio waves</b>: they pass through walls, but the signal is weakened.</li>
<li><b>Optical fibres</b> carry <b>visible light or infrared</b> for cable TV and high-speed broadband: glass is transparent to them, and their high frequency lets them carry data at a high rate.</li>
<li><b>Satellites</b> communicate mainly with <b>microwaves</b>. Some satellite phones use low-orbit satellites. Others, and direct-broadcast satellite TV, use geostationary satellites.</li>
</ul>
<h3>Analogue vs digital</h3>
<p>An <b>analogue</b> signal varies continuously and can take any value. A <b>digital</b> signal has only two values (on/off, 1/0). Sound can be sent either way.</p>
<p>Benefits of digital: a <b>higher rate of data transmission</b>, and a <b>greater range</b> because the signal can be <b>accurately regenerated</b>. Noise picked up along the way is removed, since the receiver only has to decide "1 or 0".</p>`},
    { h: "Sound", body: P`
<p>Sound is produced by <b>vibrating</b> sources (a guitar string, a loudspeaker cone, vocal cords). It is a <b>longitudinal</b> wave of compressions and rarefactions, so it <b>needs a medium</b>. It cannot travel through a vacuum: in a bell-jar experiment, the bell goes silent as the air is pumped out, though you can still see it ringing.</p>
<ul><li>Human hearing range: <b>20 Hz to 20 000 Hz</b>. <b>Ultrasound</b> is above 20 kHz.</li>
<li><b>Loudness</b> depends on <b>amplitude</b>. <b>Pitch</b> depends on <b>frequency</b>.</li>
<li>Speed of sound in air is roughly <b>330–350 m/s</b>. It is faster in liquids and fastest in solids (S), because the particles are closer together and pass the vibration on more quickly.</li>
<li>An <b>echo</b> is a reflected sound wave.</li></ul>
<h3>Measuring the speed of sound in air</h3>
<p>Two people stand a measured distance apart (e.g. 400 m, using a trundle wheel). One bangs two blocks together, and the other starts a stopwatch on seeing the blocks hit and stops it on hearing the sound. Light arrives almost instantly, so $v=\dfrac{d}{t}$. Repeat and average to reduce reaction-time error. A longer distance makes the timing error less significant.</p>
<h3>Ultrasound (S)</h3>
<p>Uses: <b>non-destructive testing</b> (finding cracks in metal), <b>medical scanning of soft tissue</b> (pregnancy scans, which are safe because ultrasound isn't ionising), and <b>sonar</b> (finding the depth of the sea).</p>
<p>For echoes, the sound goes there <b>and back</b>: $\text{distance}=\dfrac{v\times t}{2}$.</p>`}
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
  ]
});
}
