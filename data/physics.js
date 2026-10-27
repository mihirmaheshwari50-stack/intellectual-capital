window.TOPICS = window.TOPICS || [];
const P = String.raw;

TOPICS.push({
  id: "forces", subject: "physics", title: "Forces & Newton's laws",
  blurb: "Resultant force, F = ma, friction, terminal velocity, momentum.",
  level: "Core → Supplement", demo: "forces",
  sections: [
    { h: "What a force does", body: P`
<p>A force is a push or pull, measured in newtons (N). It is a <b>vector</b>: it has size and direction. A force can change an object's <b>speed, direction or shape</b>.</p>
<p>What matters is the <b>resultant force</b>: the single force that has the same effect as all the forces combined. Forces in the same direction add. Opposite forces subtract.</p>
<div class="callout key"><b class="t">Newton's first law</b>If the resultant force is <b>zero</b>, the object either stays at rest or keeps moving at <b>constant velocity</b>. A moving object does not need a force to keep moving. It needs a force to <i>change</i> its motion. This is the idea students get wrong most often.</div>`},
    { h: "F = ma: Newton's second law", body: P`
$$F=ma$$
<p>$F$ is the <b>resultant</b> force (N), $m$ the mass (kg), $a$ the acceleration (m/s²). Doubling the resultant force doubles acceleration. Doubling the mass halves it.</p>
<p>Always draw a free-body diagram first, find the resultant, then use $F=ma$. For example a 1200 kg car with 3000 N driving force and 600 N drag has $F=2400$ N, so $a=2$ m/s².</p>
<div class="callout warn"><b class="t">Common mistake</b>Plugging the driving force (3000 N) into $F=ma$ instead of the resultant (2400 N).</div>
<h3>Weight vs mass</h3>
<p>Mass (kg) is the amount of matter and is the same everywhere. Weight is a force: $W=mg$, where $g=9.8$ N/kg on Earth (Cambridge accepts 9.8). On the Moon your mass is unchanged but your weight is about a sixth.</p>`},
    { h: "Friction, drag and terminal velocity", body: P`
<p>Friction and air resistance act <b>opposite to the motion</b> and convert kinetic energy to thermal energy. Drag increases with speed.</p>
<ol>
<li>A skydiver jumps. Speed is 0, so drag is 0. Resultant = weight, giving maximum acceleration ($g$).</li>
<li>Speed increases, drag increases, resultant decreases, acceleration decreases.</li>
<li>Drag = weight. Resultant = 0, so acceleration = 0. This is <b>terminal velocity</b>.</li>
<li>Parachute opens. Drag suddenly exceeds weight, so the resultant points upward and the diver <b>decelerates</b> (still moving down!) to a new, lower terminal velocity.</li>
</ol>
<p>On a speed–time graph this appears as a curve flattening to a horizontal line.</p>
<div class="viz" data-viz="skydiver"></div>`},
    { h: "Momentum and impulse (Supplement)", body: P`
<p>Momentum $p=mv$ (kg m/s) is a vector. In any collision or explosion with no external forces, <b>total momentum is conserved</b>.</p>
<p>Impulse $=F\Delta t=\Delta(mv)$. A larger stopping time means a smaller force for the same change in momentum. That is why crumple zones, airbags and bending your knees when landing all work.</p>
<div class="callout tip"><b class="t">Exam tip</b>Choose a positive direction and stick to it. A ball bouncing back at 4 m/s after hitting a wall at 5 m/s has $\Delta v=9$ m/s, not 1 m/s.</div>`}
  ],
  worked: [
    { q: P`A 0.5 kg ball hits a wall at 6 m/s and rebounds at 4 m/s. Contact lasts 0.02 s. Find the average force.`,
      steps: [
        P`Take towards the wall as positive: $p_1=0.5\times6=3$, $p_2=0.5\times(-4)=-2$ kg m/s.`,
        P`$\Delta p=-2-3=-5$ kg m/s (magnitude 5).`,
        P`$F=\dfrac{\Delta p}{\Delta t}=\dfrac{5}{0.02}=250$ N.`
      ]},
    { q: P`A 2000 kg truck moving at 3 m/s hits a stationary 1000 kg car and they stick together. Find their common velocity.`,
      steps: [
        P`Momentum before $=2000\times3+0=6000$ kg m/s.`,
        P`After: $(2000+1000)v=6000\Rightarrow v=2$ m/s.`
      ]}
  ],
  formulas: [
    ["Newton's 2nd law", P`$F=ma$`], ["Weight", P`$W=mg$`], ["Momentum", P`$p=mv$`],
    ["Impulse", P`$F\Delta t=\Delta(mv)$`], ["Acceleration", P`$a=\dfrac{v-u}{t}$`], ["Hooke's law", P`$F=kx$`]
  ],
  cards: [
    ["State Newton's first law.", "With zero resultant force, an object stays at rest or moves at constant velocity."],
    ["What is terminal velocity?", "Constant speed reached when drag equals weight, so resultant force and acceleration are zero."],
    ["Difference between mass and weight?", P`Mass is matter (kg, constant). Weight is a gravitational force, $W=mg$ (N).`],
    ["Why do crumple zones save lives?", P`They increase collision time, so for the same $\Delta p$ the force $F=\Delta p/\Delta t$ is smaller.`],
    ["Units of momentum?", "kg m/s (or N s)."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`A car moves at constant velocity. The resultant force on it is`, opts: ["Forwards", "Backwards", "Zero", "Equal to its weight"], ans: 2, why: P`Constant velocity means no acceleration, so resultant force is zero (Newton 1).` },
    { type: "mcq", marks: 2, q: P`A 5 kg box is pushed with 30 N against 10 N friction. Its acceleration is`, opts: ["6 m/s²", "4 m/s²", "8 m/s²", "2 m/s²"], ans: 1, why: P`Resultant $=30-10=20$ N; $a=20/5=4$ m/s².` },
    { type: "mcq", marks: 2, q: P`When a skydiver opens their parachute they`, opts: ["Start moving upward", "Decelerate while still falling", "Stop instantly", "Accelerate faster"], ans: 1, why: P`Drag exceeds weight, so the resultant is upward, which means deceleration. The direction of travel stays downward.` },
    { type: "struct", marks: 4, q: P`Explain, in terms of forces, why a falling object reaches terminal velocity.`,
      ms: P`<b>B1</b> initially only weight acts / drag is zero so it accelerates.<br><b>B1</b> as speed increases, air resistance increases.<br><b>B1</b> resultant force (and acceleration) decreases.<br><b>B1</b> when drag = weight, resultant is zero so speed is constant.` }
  ]
});

TOPICS.push({
  id: "electricity", subject: "physics", title: "Electricity & circuits",
  blurb: "Current, p.d., resistance, series vs parallel, power and energy.",
  level: "Core → Supplement", demo: "circuit",
  sections: [
    { h: "Charge, current and p.d.", body: P`
<p><b>Current</b> is the rate of flow of charge: $I=\dfrac{Q}{t}$, measured in amperes (A = C/s). In metals the charge carriers are electrons, which flow from − to +. <b>Conventional current</b> is drawn from + to −.</p>
<p><b>Potential difference (p.d.)</b> is the energy transferred per unit charge: $V=\dfrac{W}{Q}$ (volts = J/C). <b>E.m.f.</b> is the energy a source gives each coulomb. P.d. is the energy each coulomb gives up in a component.</p>
<div class="callout key"><b class="t">The analogy that works</b>Charges are delivery vans, voltage is the parcels of energy each van carries, and current is how many vans pass per second. Components unload the parcels.</div>`},
    { h: "Resistance", body: P`
$$R=\frac{V}{I}$$
<p>Resistance (Ω) opposes current. For a metal wire, $R\propto\dfrac{L}{A}$: double the length gives double the resistance, and double the cross-sectional area gives half the resistance.</p>
<h3>I–V graphs</h3>
<ul>
<li><b>Ohmic resistor</b> (constant temperature): straight line through the origin, constant $R$.</li>
<li><b>Filament lamp</b>: curve flattening out. As it heats up, ions vibrate more, electrons collide more, so resistance <b>increases</b>.</li>
<li><b>Diode</b>: current flows in one direction only.</li>
</ul>
<p><b>Thermistor</b>: resistance falls as temperature rises. <b>LDR</b>: resistance falls as light intensity rises.</p>`},
    { h: "Series vs parallel", body: P`
<table class="t"><tr><th></th><th>Series</th><th>Parallel</th></tr>
<tr><td>Current</td><td>Same everywhere</td><td>Splits: $I=I_1+I_2$</td></tr>
<tr><td>P.d.</td><td>Shared: $V=V_1+V_2$</td><td>Same across each branch</td></tr>
<tr><td>Resistance</td><td>$R=R_1+R_2$</td><td>$\dfrac1R=\dfrac1{R_1}+\dfrac1{R_2}$</td></tr></table>
<p>Adding a resistor in parallel <b>decreases</b> total resistance, because it gives the current an extra path. The combined resistance is always less than the smallest branch.</p>
<p><b>Potential divider</b>: in series, p.d. splits in proportion to resistance, $\dfrac{V_1}{V_2}=\dfrac{R_1}{R_2}$. With a thermistor or LDR, this makes sensor circuits.</p>
<p>Try the circuit simulator below. Switch between series and parallel and watch the electron flow change.</p>`},
    { h: "Power and energy", body: P`
<p>$P=IV$, and combining with $V=IR$ gives $P=I^2R=\dfrac{V^2}{R}$. Energy $E=Pt=IVt$.</p>
<p>Electricity bills use kilowatt-hours: a 2 kW heater on for 3 hours uses 6 kWh. 1 kWh = 3.6 MJ.</p>
<div class="callout tip"><b class="t">Safety (Core)</b>The fuse goes in the <b>live</b> wire and melts if current exceeds its rating. The earth wire connects metal casings so a fault current flows to earth and blows the fuse. Choose the fuse rating just above the normal operating current.</div>`}
  ],
  worked: [
    { q: P`A 6.0 V battery is connected to 4 Ω and 12 Ω resistors in parallel. Find the total current.`,
      steps: [
        P`$\dfrac1R=\dfrac14+\dfrac1{12}=\dfrac{4}{12}$, so $R=3\,\Omega$.`,
        P`$I=\dfrac VR=\dfrac{6}{3}=2.0$ A. (Check: branches carry 1.5 A and 0.5 A.)`
      ]},
    { q: P`A kettle is rated 2.3 kW, 230 V. What fuse should it use: 3 A, 5 A or 13 A?`,
      steps: [P`$I=\dfrac PV=\dfrac{2300}{230}=10$ A.`, P`Choose the next rating above: <b>13 A</b>.`]}
  ],
  formulas: [
    ["Ohm's law", P`$V=IR$`], ["Charge", P`$Q=It$`], ["Power", P`$P=IV=I^2R$`], ["Energy", P`$E=IVt$`],
    ["Series", P`$R=R_1+R_2$`], ["Parallel", P`$\frac1R=\frac1{R_1}+\frac1{R_2}$`], ["Potential divider", P`$\frac{V_1}{V_2}=\frac{R_1}{R_2}$`]
  ],
  cards: [
    ["Define current.", P`Rate of flow of charge, $I=Q/t$.`],
    ["Define potential difference.", P`Energy transferred per unit charge, $V=W/Q$.`],
    ["Why does a filament lamp's resistance increase?", "It heats up, so ions vibrate more and electrons collide more often."],
    ["Thermistor: temperature up → resistance?", "Decreases."],
    ["Which wire does the fuse go in?", "The live wire."],
    ["Total resistance in parallel compared to smallest branch?", "Always less."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Two 10 Ω resistors in parallel have a combined resistance of`, opts: ["20 Ω", "10 Ω", "5 Ω", "0.2 Ω"], ans: 2, why: P`$\frac1R=\frac1{10}+\frac1{10}=\frac15$, $R=5\,\Omega$.` },
    { type: "mcq", marks: 2, q: P`In a series circuit with a 12 V supply, 2 Ω and 4 Ω resistors, the p.d. across the 4 Ω is`, opts: ["4 V", "6 V", "8 V", "12 V"], ans: 2, why: P`$I=12/6=2$ A, so $V=2\times4=8$ V. Or split in ratio 2:4.` },
    { type: "mcq", marks: 1, q: P`An LDR is moved into darkness. Its resistance`, opts: ["Increases", "Decreases", "Stays the same", "Becomes zero"], ans: 0, why: P`Less light → higher resistance.` },
    { type: "struct", marks: 3, q: P`A 60 W lamp runs on 240 V for 5 hours. Calculate the current and the energy transferred in joules.`,
      ms: P`<b>C1</b> $I=P/V=0.25$ A.<br><b>M1</b> $E=Pt=60\times5\times3600$.<br><b>A1</b> $1.08\times10^6$ J.` }
  ]
});

TOPICS.push({
  id: "waves", subject: "physics", title: "Waves",
  blurb: "Wave equation, transverse vs longitudinal, reflection, refraction, the EM spectrum.",
  level: "Core → Supplement", demo: "wave",
  sections: [
    { h: "What a wave transfers", body: P`
<p>Waves transfer <b>energy</b> (and information) <b>without transferring matter</b>. The particles oscillate about fixed positions.</p>
<ul>
<li><b>Transverse</b>: oscillations perpendicular to the direction of travel (light, all EM waves, water ripples, waves on a string).</li>
<li><b>Longitudinal</b>: oscillations parallel to the direction of travel, forming compressions and rarefactions (sound, seismic P-waves).</li>
</ul>
<h3>Vocabulary</h3>
<p><b>Amplitude</b>: maximum displacement from rest. <b>Wavelength $\lambda$</b>: distance between consecutive identical points (crest to crest). <b>Frequency $f$</b>: waves per second (Hz). <b>Period</b> $T=\dfrac1f$.</p>`},
    { h: "The wave equation", body: P`
$$v=f\lambda$$
<p>Why? In one period $T$ the wave moves one wavelength, so $v=\dfrac{\lambda}{T}=f\lambda$.</p>
<div class="callout key"><b class="t">Key insight</b>Frequency is set by the <b>source</b> and never changes when a wave enters a new medium. If the speed changes, the <b>wavelength</b> must change in proportion.</div>`},
    { h: "Reflection, refraction, diffraction", body: P`
<p><b>Reflection</b>: angle of incidence = angle of reflection (measured from the <b>normal</b>).</p>
<p><b>Refraction</b>: the change of direction when a wave changes speed. Light entering a denser medium (glass) slows and bends <b>towards</b> the normal. Refractive index $n=\dfrac{\sin i}{\sin r}=\dfrac{c}{v}$.</p>
<div class="viz" data-viz="refraction"></div>
<p><b>Total internal reflection</b> happens when light goes from dense to less dense <i>and</i> the angle of incidence exceeds the critical angle, where $\sin c=\dfrac1n$. It is used in optical fibres.</p>
<p><b>Diffraction</b>: spreading through a gap or around an edge. It is most noticeable when the gap is about the same size as the wavelength.</p>`},
    { h: "Electromagnetic spectrum", body: P`
<p>In order of <b>increasing frequency</b> (decreasing wavelength): <b>radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma</b>. All travel at $3.0\times10^8$ m/s in a vacuum.</p>
<table class="t"><tr><th>Wave</th><th>Use</th><th>Hazard</th></tr>
<tr><td>Microwaves</td><td>Cooking, satellite phones</td><td>Internal heating of tissue</td></tr>
<tr><td>Infrared</td><td>Remote controls, thermal imaging</td><td>Skin burns</td></tr>
<tr><td>Ultraviolet</td><td>Security marking, sterilising</td><td>Skin cancer, eye damage</td></tr>
<tr><td>X-rays / γ</td><td>Imaging, sterilising, cancer treatment</td><td>Ionising, damages DNA (mutation)</td></tr></table>`}
  ],
  worked: [
    { q: P`A sound wave of frequency 680 Hz travels at 340 m/s in air. Find its wavelength. What happens to $f$ and $\lambda$ when it enters water (1500 m/s)?`,
      steps: [P`$\lambda=\dfrac vf=\dfrac{340}{680}=0.50$ m.`, P`In water $f$ stays 680 Hz, and $\lambda=\dfrac{1500}{680}=2.2$ m. The wavelength increases.`]},
    { q: P`Glass has refractive index 1.5. Find the critical angle.`,
      steps: [P`$\sin c=\dfrac1{1.5}=0.667$, so $c=41.8^\circ$.`]}
  ],
  formulas: [
    ["Wave equation", P`$v=f\lambda$`], ["Period", P`$T=\dfrac1f$`], ["Refractive index", P`$n=\dfrac{\sin i}{\sin r}$`], ["Critical angle", P`$\sin c=\dfrac1n$`]
  ],
  cards: [
    ["Transverse vs longitudinal?", "Transverse: oscillation perpendicular to travel. Longitudinal: parallel, with compressions and rarefactions."],
    ["What stays constant when a wave enters a new medium?", "Frequency."],
    ["EM spectrum, low to high frequency", "Radio, micro, IR, visible, UV, X-ray, gamma."],
    ["Two conditions for total internal reflection", "Dense → less dense, and angle of incidence > critical angle."],
    ["Speed of light in a vacuum", P`$3.0\times10^8$ m/s`]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Which is a longitudinal wave?`, opts: ["Light", "Sound", "X-rays", "Ripples on water"], ans: 1, why: P`Sound travels as compressions and rarefactions.` },
    { type: "mcq", marks: 2, q: P`A wave has frequency 50 Hz and wavelength 4 m. Its speed is`, opts: ["12.5 m/s", "54 m/s", "200 m/s", "0.08 m/s"], ans: 2, why: P`$v=f\lambda=50\times4=200$ m/s.` },
    { type: "mcq", marks: 1, q: P`Light entering glass from air bends`, opts: ["Away from the normal", "Towards the normal", "Not at all", "Along the surface"], ans: 1, why: P`It slows down, so it bends towards the normal.` },
    { type: "struct", marks: 3, q: P`Explain why diffraction of sound around a doorway is easily noticed but diffraction of light is not.`,
      ms: P`<b>B1</b> diffraction is greatest when gap ≈ wavelength.<br><b>B1</b> sound wavelengths (~m) are similar to the door width.<br><b>B1</b> light wavelengths (~$5\times10^{-7}$ m) are far smaller than the gap.` }
  ]
});
