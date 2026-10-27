window.TOPICS = window.TOPICS || [];
const P = String.raw;

/* ============================================================
   FORCES  (0625 2026–2028: 1.2 free fall, 1.3, 1.5.1–1.5.3, 1.6)
   ============================================================ */
TOPICS.push({
  id: "forces", subject: "physics", title: "Forces, moments & momentum",
  blurb: "Resultant force, Hooke's law, mass and weight, F = ma, terminal velocity, circular motion, moments, centre of gravity, momentum.",
  level: "Core → Supplement", demo: "forces",
  syllabus: [
    ["1.5.1", "Know that forces may change the size, shape and motion of an object", 0],
    ["1.5.1", "Find the resultant of two or more forces acting along the same straight line", 0],
    ["1.5.1", "Plot and interpret load–extension graphs and describe the experiment", 1],
    ["1.5.1 S", "Define and use the spring constant $k=F/x$ and the limit of proportionality", 1],
    ["1.3", "Mass, weight and gravitational field strength: $W=mg$; compare weights using a balance", 2],
    ["1.3 S", "Weight as the effect of a gravitational field on a mass; $g$ equals the acceleration of free fall", 2],
    ["1.5.1", "An object stays at rest or at constant velocity unless acted on by a resultant force", 3],
    ["1.5.1 S", "Recall and use $F=ma$; force and acceleration are in the same direction", 3],
    ["1.5.1", "Solid friction and drag (in liquids and gases) oppose motion and produce heating", 4],
    ["1.2 S", "Motion of falling objects with and without air resistance, including terminal velocity", 4],
    ["1.5.1 S", "Describe circular motion due to a force perpendicular to the motion", 5],
    ["1.5.2", "Moment = force × perpendicular distance; the principle of moments", 6],
    ["1.5.2 S", "Equilibrium: no resultant force and no resultant moment; the balancing experiment", 6],
    ["1.5.3", "Centre of gravity: the plumb-line experiment and the effect on stability", 7],
    ["1.6 S", "Momentum $p=mv$, impulse $F\\Delta t=\\Delta(mv)$, conservation of momentum, $F=\\Delta p/\\Delta t$", 8]
  ],
  sections: [
    { h: "What forces do and resultant force", body: P`
<p>A force is a push or pull, measured in newtons (N). Forces can change an object's <b>speed</b>, its <b>direction of motion</b>, or its <b>shape and size</b> (stretching, squashing, bending).</p>
<p>Force is a <b>vector</b>: it has a size and a direction. So two 5 N forces can add to anything from 0 N (opposite directions) to 10 N (same direction). What determines what happens to an object is the <b>resultant force</b>: the single force that would have the same effect as all the forces acting together.</p>
<ul><li>Forces in the same direction: <b>add</b>.</li><li>Forces in opposite directions: <b>subtract</b>, and the resultant points the way of the bigger one.</li></ul>
<p>Always draw a <b>free-body diagram</b> first: a dot or box for the object, with an arrow for every force acting <i>on it</i> (weight, normal contact, thrust, friction, drag, tension). Label each with its size.</p>
<div class="callout key"><b class="t">The idea that unlocks this topic</b>Forces don't cause motion. A resultant force causes a <b>change</b> in motion (acceleration). Everything below follows from this.</div>`},
    { h: "Springs, stretching and Hooke's law", body: P`
<p>When you hang loads on a spring, it stretches. The <b>extension</b> is the <i>increase</i> in length from its original length: $x=\text{stretched length}-\text{original length}$. Plotting the extension against the load gives the <b>load–extension graph</b>:</p>
<div class="viz" data-viz="spring"></div>
<p>At first the graph is a <b>straight line through the origin</b>. Extension is directly proportional to load, which is Hooke's law. The <b>spring constant</b> is the force needed per unit extension:</p>
$$k=\frac{F}{x}\qquad(\text{N/m or N/cm})$$
<p>A stiffer spring has a bigger $k$, so it needs more force for the same stretch. On a load (y) against extension (x) graph, $k$ is the <b>gradient</b>. If the axes are the other way round, $k=1/\text{gradient}$.</p>
<p>Beyond the <b>limit of proportionality</b> the graph curves. The extension is no longer proportional to the load. Mark it as the point where the straight line ends.</p>
<h3>The experiment</h3>
<ol><li>Clamp the spring next to a vertical metre rule. Record the original length, reading at eye level to avoid parallax error. A fixed pointer on the bottom of the spring helps.</li>
<li>Add masses in equal steps (e.g. 100 g, which is a load of 0.98 N, about 1 N). After each one, wait for it to stop bouncing, then read the new length.</li>
<li>Calculate each extension, then plot load against extension. To check for permanent stretching, remove the loads and see if the spring returns to its original length.</li></ol>
<div class="callout warn"><b class="t">Lost marks</b>Plotting the <i>length</i> instead of the <i>extension</i>: the graph then won't go through the origin. Forgetting that the load is a <b>weight in newtons</b>, not a mass in grams.</div>`},
    { h: "Mass, weight and gravitational field strength", body: P`
<table class="t"><tr><th></th><th>Mass</th><th>Weight</th></tr>
<tr><td>What it is</td><td>A measure of the quantity of matter in an object</td><td>The gravitational force on an object that has mass</td></tr>
<tr><td>Unit</td><td>kg</td><td>N (it's a force)</td></tr>
<tr><td>On the Moon?</td><td>Unchanged</td><td>About ⅙ as much</td></tr>
<tr><td>Measured with</td><td>A balance (comparing with known masses)</td><td>A newton meter (spring balance)</td></tr></table>
$$W=mg\qquad g=\frac{W}{m}$$
<p>$g$ is the <b>gravitational field strength</b>: the force per unit mass, about <b>9.8 N/kg</b> on Earth. It is also the <b>acceleration of free fall</b>, 9.8 m/s². These are the same number because $F=ma$: if the only force is weight, $mg=ma$, so $a=g$.</p>
<p>That is why, without air resistance, a hammer and a feather fall with the same acceleration (famously shown on the Moon). The heavier object has more weight but also more mass to accelerate, and the two cancel exactly.</p>
<p>A beam balance compares <b>weights</b>. Because both pans are in the same gravitational field, equal weights mean equal masses. That's why a balance gives the same reading on the Moon.</p>`},
    { h: "Newton's first and second laws", body: P`
<div class="callout key"><b class="t">First law</b>If the resultant force on an object is <b>zero</b>, it either stays <b>at rest</b> or continues moving at <b>constant velocity</b> (the same speed in a straight line).</div>
<p>This feels wrong because on Earth things slow down by themselves. They don't really: friction is a resultant force that slows them. A puck on ice, or a spacecraft in deep space, keeps going. So a car cruising at a steady 70 km/h has <b>zero resultant force</b>: the driving force exactly balances friction plus drag.</p>
<h3>The second law (S)</h3>
$$F=ma$$
<p>$F$ is the <b>resultant</b> force (N), $m$ is the mass (kg) and $a$ is the acceleration (m/s²). The acceleration is always in the <b>same direction as the resultant force</b>. If that direction is opposite to the motion, the object decelerates.</p>
<p>Doubling the resultant force doubles the acceleration. Doubling the mass halves it. Mass is the object's resistance to changes in motion (its inertia).</p>
<p>A 1200 kg car with 3000 N driving force and 600 N drag: resultant $=2400$ N, so $a=\dfrac{2400}{1200}=2$ m/s².</p>
<div class="callout warn"><b class="t">Most common error</b>Using the driving force (3000 N) in $F=ma$ instead of the resultant (2400 N). Always find the resultant first.</div>`},
    { h: "Friction, drag and terminal velocity", body: P`
<p><b>Solid friction</b> is the force between two surfaces that impedes (opposes) motion. Work done against friction transfers energy to the <b>thermal</b> store, which is why rubbing your hands warms them and why brakes get hot.</p>
<p><b>Drag</b> is friction from a fluid. It acts on objects moving through a liquid (water resistance) or a gas (air resistance). Drag acts <b>opposite to the velocity</b> and <b>increases with speed</b>.</p>
<h3>Falling with air resistance (S)</h3>
<div class="viz" data-viz="skydiver"></div>
<ol>
<li><b>Just after jumping:</b> speed ≈ 0, so drag ≈ 0. Resultant = weight, so the acceleration is $g$ (9.8 m/s²).</li>
<li><b>Speeding up:</b> drag increases with speed, so the resultant force (weight − drag) <b>decreases</b>, and the acceleration decreases. The speed still increases, just more slowly.</li>
<li><b>Terminal velocity:</b> drag = weight. Resultant = 0, acceleration = 0, constant speed.</li>
<li><b>Parachute opens:</b> the larger area means much more drag at the same speed. Drag > weight, so the resultant is <b>upwards</b> and the diver <b>decelerates</b>, while still moving downwards.</li>
<li>As speed falls, drag falls until drag = weight again: a new, <b>lower</b> terminal velocity.</li>
</ol>
<p><b>Without air resistance</b> (e.g. in a vacuum, or for a dense object falling a short distance), the acceleration stays at $g$ the whole time and the speed–time graph is a straight line with gradient 9.8 m/s².</p>
<div class="callout tip"><b class="t">Examiner wording</b>Say "air resistance <b>increases</b> as speed increases", "the <b>resultant force decreases</b>", "<b>acceleration decreases</b>", and "when air resistance <b>equals</b> weight, resultant force is zero, so it moves at constant (terminal) velocity". Avoid "the forces cancel and it stops". It doesn't stop.</div>`},
    { h: "Circular motion (S)", body: P`
<p>An object moving in a circle at <b>constant speed</b> is still <b>accelerating</b>, because its <b>direction</b> keeps changing, so its velocity changes. By $F=ma$ there must be a resultant force. That force acts <b>perpendicular to the motion</b>, towards the <b>centre</b> of the circle.</p>
<p>Examples: tension in the string of a conker being whirled round, friction between tyres and road on a bend, and gravity keeping a satellite or the Moon in orbit.</p>
<p>For the same circle you need a <b>larger</b> force if:</p>
<ul><li>the <b>speed increases</b> (mass and radius constant)</li><li>the <b>radius decreases</b> (mass and speed constant), i.e. a tighter turn</li><li>the <b>mass increases</b> (speed and radius constant)</li></ul>
<p>If the force suddenly disappears (the string snaps), the object flies off in a <b>straight line along the tangent</b>, as Newton's first law predicts, not outwards along the radius.</p>
<div class="callout warn"><b class="t">Misconception</b>There is no outward "centrifugal force" pushing you out on a roundabout. Your body tries to carry on in a straight line, and the seat pushes you inwards to make you turn.</div>`},
    { h: "Moments and equilibrium", body: P`
<p>The <b>moment</b> of a force is its turning effect about a pivot:</p>
$$\text{moment}=\text{force}\times\text{perpendicular distance from pivot}\qquad(\text{N m})$$
<p>"Perpendicular distance" is measured at right angles to the <b>line of action</b> of the force. That is why you push a door at the handle, far from the hinge, and at 90° to the door. Spanners, crowbars and wheelbarrows all use long distances to get big moments from small forces.</p>
<div class="viz" data-viz="moments"></div>
<h3>The principle of moments</h3>
<p>For an object in equilibrium, <b>total clockwise moments = total anticlockwise moments</b> about any pivot. With several forces on each side, add up each side separately.</p>
<p>A 600 N person sits 1.5 m from a see-saw pivot. Where must a 450 N person sit to balance? $600\times1.5=450\times d\Rightarrow d=2.0$ m.</p>
<h3>Equilibrium (S)</h3>
<p>An object is in equilibrium only if there is <b>no resultant force</b> (so no acceleration) <b>and no resultant moment</b> (so no turning). Both conditions are needed. For a beam on two supports, the upward support forces add up to the total weight.</p>
<p><b>Experiment:</b> balance a metre rule on a pivot at its centre (50 cm), so its own weight has no moment. Hang known weights at measured distances on both sides and adjust until it balances. Then calculate $\sum F d$ on each side: they are equal, showing there is no resultant moment.</p>`},
    { h: "Centre of gravity and stability", body: P`
<p>The <b>centre of gravity</b> is the point through which the whole weight of an object appears to act. For a uniform regular shape it is at the geometric centre.</p>
<h3>Finding it for an irregular flat shape (lamina)</h3>
<ol><li>Make a small hole near the edge and hang the lamina from a pin so it swings freely.</li>
<li>Hang a <b>plumb line</b> (string with a weight) from the same pin. When everything stops moving, draw along the string.</li>
<li>Repeat from a second (and, as a check, a third) hole. The centre of gravity is where the lines <b>cross</b>.</li></ol>
<p>It works because a freely hanging object comes to rest with its centre of gravity <b>directly below</b> the pivot, where its weight has no moment.</p>
<h3>Stability</h3>
<p>An object topples when its centre of gravity moves so that the <b>line of action of its weight falls outside its base</b>. The weight then produces a moment that turns it further over. So objects are more stable with a <b>low centre of gravity</b> and a <b>wide base</b>: racing cars, Bunsen burners and the heavy bases of lamps.</p>`},
    { h: "Momentum and impulse (S)", body: P`
$$p=mv\qquad(\text{kg m/s})$$
<p>Momentum is a <b>vector</b>, so direction matters. Choose a positive direction, and anything moving the other way has negative momentum.</p>
<h3>Conservation of momentum</h3>
<p>In any collision or explosion, provided no external force acts, the <b>total momentum before = total momentum after</b>. In an explosion from rest, the total momentum stays zero: the pieces fly apart with equal and opposite momenta, which is why a gun recoils.</p>
<h3>Impulse and force</h3>
$$\text{impulse}=F\Delta t=\Delta(mv)\qquad F=\frac{\Delta p}{\Delta t}$$
<p>The second form is the deeper version of Newton's second law: <b>resultant force = rate of change of momentum</b>.</p>
<p>For a fixed change in momentum (e.g. a car stopping from 20 m/s), making the stopping <b>time longer</b> makes the <b>force smaller</b>. That is the physics of crumple zones, airbags, seat belts that stretch, cycle helmets, and bending your knees when you land.</p>
<div class="callout tip"><b class="t">Rebounds</b>A ball hitting a wall at 5 m/s and bouncing back at 4 m/s has $\Delta v=9$ m/s, not 1 m/s, because the velocity goes from $+5$ to $-4$.</div>
<div class="callout tip"><b class="t">Examiner wording for safety features</b>"increases the <b>time</b> taken for the change in momentum", "so the <b>rate of change of momentum</b> is smaller", "so the <b>force</b> on the passenger is smaller". You need all three links.</div>`}
  ],
  worked: [
    { q: P`A spring has original length 12.0 cm. With a 4.0 N load it is 15.2 cm long. Find the spring constant, and the length with a 6.0 N load (within the limit of proportionality).`,
      steps: [P`Extension $=15.2-12.0=3.2$ cm.`, P`$k=\dfrac{F}{x}=\dfrac{4.0}{3.2}=1.25$ N/cm.`, P`For 6.0 N: $x=\dfrac{6.0}{1.25}=4.8$ cm, so the length is $12.0+4.8=16.8$ cm.`]},
    { q: P`A 0.5 kg ball hits a wall at 6 m/s and rebounds at 4 m/s. Contact lasts 0.02 s. Find the average force.`,
      steps: [P`Take towards the wall as positive: $p_1=0.5\times6=3$, $p_2=0.5\times(-4)=-2$ kg m/s.`, P`$\Delta p=-2-3=-5$ kg m/s (magnitude 5).`, P`$F=\dfrac{\Delta p}{\Delta t}=\dfrac{5}{0.02}=250$ N.`]},
    { q: P`A 2000 kg truck moving at 3 m/s hits a stationary 1000 kg car and they stick together. Find their common velocity.`,
      steps: [P`Momentum before $=2000\times3+0=6000$ kg m/s.`, P`After: $(2000+1000)v=6000\Rightarrow v=2$ m/s.`]},
    { q: P`A uniform 4.0 m plank of weight 200 N rests on a pivot at its centre. A 300 N weight is 1.2 m left of the pivot. Where must a 450 N weight go to balance it?`,
      steps: [P`The plank is uniform and pivoted at its centre, so its weight has no moment.`, P`Anticlockwise moment $=300\times1.2=360$ N m.`, P`Clockwise: $450\times d=360\Rightarrow d=0.80$ m to the right of the pivot.`, P`The upward force from the pivot $=200+300+450=950$ N (no resultant force).`]}
  ],
  formulas: [
    ["Newton's 2nd law", P`$F=ma$`], ["Weight", P`$W=mg$`], ["Spring constant", P`$k=\dfrac Fx$`],
    ["Moment", P`$M=F\times d_\perp$`], ["Momentum", P`$p=mv$`],
    ["Impulse", P`$F\Delta t=\Delta(mv)$`], ["Force (momentum)", P`$F=\dfrac{\Delta p}{\Delta t}$`], ["Acceleration", P`$a=\dfrac{\Delta v}{\Delta t}$`]
  ],
  cards: [
    ["Three things a force can change", "An object's speed, direction of motion, and shape/size."],
    ["State Newton's first law.", "With zero resultant force, an object stays at rest or moves at constant velocity."],
    ["What is terminal velocity?", "Constant speed reached when drag equals weight, so resultant force and acceleration are zero."],
    ["Mass vs weight", P`Mass is the quantity of matter (kg). Weight is the gravitational force on a mass, $W=mg$ (N).`],
    ["Define gravitational field strength", P`Force per unit mass, $g=W/m$ (≈ 9.8 N/kg on Earth).`],
    ["Why do heavy and light objects fall at the same rate (no air)?", P`More weight but proportionally more mass, so $a=W/m=g$ for both.`],
    ["Define spring constant", P`Force per unit extension, $k=F/x$.`],
    ["What is the limit of proportionality?", "The point beyond which extension is no longer proportional to load (the graph stops being straight)."],
    ["Why plot extension, not length?", "Extension is proportional to load, so the graph is straight through the origin."],
    ["Define the moment of a force", "Force × perpendicular distance from the pivot to the line of action of the force."],
    ["Principle of moments", "In equilibrium, total clockwise moment = total anticlockwise moment about any point."],
    ["Two conditions for equilibrium", "No resultant force and no resultant moment."],
    ["Define centre of gravity", "The point through which the whole weight of an object appears to act."],
    ["How to find the CoG of a lamina", "Hang it from two holes with a plumb line, mark the vertical lines, and the CoG is where they cross."],
    ["When does an object topple?", "When the line of action of its weight falls outside its base."],
    ["How to make an object more stable", "Lower its centre of gravity and widen its base."],
    ["Direction of the force for circular motion", "Perpendicular to the velocity, towards the centre of the circle."],
    ["Why is an object in uniform circular motion accelerating?", "Its direction (and so its velocity) is constantly changing."],
    ["What happens if the string breaks in circular motion?", "The object moves off in a straight line along the tangent."],
    ["Solid friction does what to energy?", "Transfers it to the thermal store (heating)."],
    ["Why do crumple zones save lives?", P`They increase the collision time, so for the same $\Delta p$ the force $F=\Delta p/\Delta t$ is smaller.`],
    ["Units of momentum", "kg m/s (or N s)."],
    ["State the conservation of momentum", "With no external forces, total momentum before = total momentum after."],
    ["Resultant force in terms of momentum", "The rate of change of momentum, F = Δp/Δt."],
    ["Acceleration of free fall near Earth", "About 9.8 m/s², constant if there is no air resistance."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`A car moves at constant velocity. The resultant force on it is`, opts: ["Forwards", "Backwards", "Zero", "Equal to its weight"], ans: 2, why: P`Constant velocity means no acceleration, so the resultant force is zero (Newton's 1st law).` },
    { type: "mcq", marks: 2, q: P`A 5 kg box is pushed with 30 N against 10 N of friction. Its acceleration is`, opts: ["6 m/s²", "4 m/s²", "8 m/s²", "2 m/s²"], ans: 1, why: P`Resultant $=30-10=20$ N; $a=20/5=4$ m/s².` },
    { type: "mcq", marks: 1, q: P`When a skydiver opens their parachute they`, opts: ["Start moving upward", "Decelerate while still falling", "Stop instantly", "Accelerate faster"], ans: 1, why: P`Drag exceeds weight, so the resultant is upward, which means deceleration. The direction of travel stays downward.` },
    { type: "mcq", marks: 1, q: P`An astronaut's mass is 70 kg on Earth. On the Moon ($g=1.6$ N/kg) their mass is`, opts: ["11.7 kg", "70 kg", "112 kg", "686 kg"], ans: 1, why: P`Mass doesn't depend on location. Their <i>weight</i> changes to $70\times1.6=112$ N.` },
    { type: "mcq", marks: 2, q: P`A spring extends by 4 cm with a 2 N load. Within its limit of proportionality, what load gives an extension of 10 cm?`, opts: ["4 N", "5 N", "8 N", "20 N"], ans: 1, why: P`$k=2/4=0.5$ N/cm, so $F=0.5\times10=5$ N.` },
    { type: "mcq", marks: 1, q: P`A force of 20 N acts at 0.3 m from a pivot, at right angles. Its moment is`, opts: ["6 N m", "66.7 N m", "0.015 N m", "20.3 N m"], ans: 0, why: P`$20\times0.3=6$ N m.` },
    { type: "mcq", marks: 1, q: P`A car goes round a bend at constant speed. Which statement is correct?`, opts: ["Its velocity is constant", "The resultant force on it is zero", "There is a resultant force towards the centre of the bend", "There is an outward force on it"], ans: 2, why: P`Its direction changes, so it accelerates towards the centre. Friction on the tyres provides that force.` },
    { type: "mcq", marks: 2, q: P`A 2 kg trolley at 3 m/s collides with a stationary 1 kg trolley and they stick together. Their speed afterwards is`, opts: ["1 m/s", "1.5 m/s", "2 m/s", "3 m/s"], ans: 2, why: P`$2\times3=(2+1)v\Rightarrow v=2$ m/s.` },
    { type: "struct", marks: 4, q: P`Explain, in terms of forces, why a falling object reaches terminal velocity.`,
      ms: P`<b>B1</b> initially only weight acts (air resistance is zero) so it accelerates.<br><b>B1</b> as speed increases, air resistance increases.<br><b>B1</b> the resultant force (and so the acceleration) decreases.<br><b>B1</b> when air resistance = weight, the resultant force is zero, so the velocity is constant.` },
    { type: "struct", marks: 5, q: P`Describe how you would plot a load–extension graph for a spring, and how you would use it to find the spring constant.`,
      ms: P`<b>B1</b> clamp the spring beside a vertical metre rule; measure the original length (eye level, to avoid parallax)<br><b>B1</b> add known masses in equal steps; convert to load using $W=mg$<br><b>B1</b> measure the new length each time; extension = new length − original length<br><b>B1</b> plot load against extension<br><b>B1</b> $k$ = gradient of the straight-line section (load ÷ extension)` },
    { type: "struct", marks: 3, q: P`A 2.0 kg trolley experiences a resultant force of 5.0 N for 4.0 s, starting from rest. Calculate (a) its acceleration, (b) its final speed.`,
      ms: P`(a) <b>M1</b> $a=F/m$ <b>A1</b> $2.5$ m/s²<br>(b) <b>B1</b> $v=at=10$ m/s` },
    { type: "struct", marks: 4, q: P`A uniform metre rule of weight 1.2 N is pivoted at the 30 cm mark. Where must a 2.0 N weight be hung to make the rule balance horizontally?`,
      ms: P`<b>B1</b> the rule's weight acts at its centre (50 cm), 20 cm right of the pivot<br><b>M1</b> clockwise moment $=1.2\times20=24$ N cm<br><b>M1</b> $2.0\times d=24\Rightarrow d=12$ cm<br><b>A1</b> hang it at the 18 cm mark (12 cm left of the pivot)` },
    { type: "struct", marks: 4, q: P`Describe an experiment to find the centre of gravity of an irregularly shaped piece of card.`,
      ms: P`<b>B1</b> make a hole near the edge and hang the card from a pin so it swings freely<br><b>B1</b> hang a plumb line from the pin and mark the vertical line on the card<br><b>B1</b> repeat from a different hole<br><b>B1</b> the centre of gravity is where the lines intersect (repeat with a third hole to check)` },
    { type: "struct", marks: 3, q: P`Explain why a bus with passengers on the top deck is more likely to topple when it tilts than an empty bus.`,
      ms: P`<b>B1</b> passengers on top raise the centre of gravity<br><b>B1</b> so the line of action of the weight falls outside the base at a smaller angle of tilt<br><b>B1</b> the weight then produces a moment that turns the bus over` },
    { type: "struct", marks: 4, q: P`Explain how an airbag reduces the force on a driver in a collision.`,
      ms: P`<b>B1</b> the driver's change in momentum is the same either way<br><b>B1</b> the airbag increases the time taken for the driver to stop<br><b>B1</b> so the rate of change of momentum is smaller<br><b>B1</b> force = rate of change of momentum, so the force is smaller` },
    { type: "struct", marks: 4, q: P`A 0.15 kg ball travelling at 20 m/s is hit back along its path at 30 m/s. The bat is in contact for 0.010 s. Calculate (a) the impulse, (b) the average force on the ball.`,
      ms: P`(a) <b>M1</b> $\Delta p=0.15\times30-0.15\times(-20)$ <b>A1</b> $7.5$ N s<br>(b) <b>M1</b> $F=\dfrac{7.5}{0.010}$ <b>A1</b> $750$ N` },
    { type: "struct", marks: 3, q: P`A satellite orbits the Earth at constant speed. State the direction of the resultant force on it, and explain why its velocity is changing even though its speed is constant.`,
      ms: P`<b>B1</b> towards the centre of the Earth (perpendicular to its motion)<br><b>B1</b> velocity is a vector: it has a direction as well as a size<br><b>B1</b> the direction of motion is constantly changing, so the velocity changes` },
    { type: "struct", marks: 3, q: P`A 60 kg skater at rest pushes a 40 kg skater, who moves off at 1.5 m/s. Find the velocity of the 60 kg skater.`,
      ms: P`<b>B1</b> total momentum before = 0<br><b>M1</b> $60v+40(1.5)=0$<br><b>A1</b> $v=-1.0$ m/s, i.e. 1.0 m/s in the opposite direction` }
  ]
});

/* ============================================================
   ELECTRICITY  (0625: 4.2.1–4.2.5, 4.3.1–4.3.3, 4.4)
   ============================================================ */
TOPICS.push({
  id: "electricity", subject: "physics", title: "Electricity & circuits",
  blurb: "Charge, fields, current, e.m.f., p.d., resistance, I–V graphs, series and parallel, potential dividers, power and safety.",
  level: "Core → Supplement", demo: "circuit",
  syllabus: [
    ["4.2.1", "Positive and negative charges; like charges repel, unlike attract; charging by friction", 0],
    ["4.2.1 S", "Charging explained by electron transfer; electric fields and their field patterns", 0],
    ["4.2.1", "Conductors and insulators (S: explained by free electrons); charge measured in coulombs", 0],
    ["4.2.2", "Current as a rate of flow of charge, $I=Q/t$; using ammeters; conventional current vs electron flow", 1],
    ["4.2.2 S", "Direct current (d.c.) and alternating current (a.c.)", 1],
    ["4.2.3", "Electromotive force and potential difference as work done per unit charge; using voltmeters", 2],
    ["4.2.4", "Resistance $R=V/I$; the experiment; I–V graphs; $R\\propto L$ and $R\\propto 1/A$", 3],
    ["4.2.5", "Electrical power $P=IV$ and energy $E=IVt$; the kilowatt-hour and cost", 4],
    ["4.3.1", "Draw and interpret circuit diagrams with standard symbols", 5],
    ["4.3.2", "Current, p.d. and resistance in series and parallel circuits (S: calculations, conservation of charge)", 6],
    ["4.3.3", "Action of thermistors, LDRs, diodes and LEDs; potential dividers (S: $V_1/V_2=R_1/R_2$)", 7],
    ["4.4", "Electrical safety: hazards, live/neutral/earth, fuses, circuit breakers, earthing, double insulation", 8]
  ],
  sections: [
    { h: "Electric charge and electric fields", body: P`
<p>There are two kinds of charge: <b>positive</b> and <b>negative</b>. <b>Like charges repel</b> and <b>unlike charges attract</b>. Charge is measured in <b>coulombs (C)</b>. One electron carries $-1.6\times10^{-19}$ C.</p>
<h3>Charging by friction</h3>
<p>Rubbing a polythene rod with a cloth transfers <b>electrons</b> from the cloth to the rod. The rod gains electrons and becomes <b>negative</b>, and the cloth loses electrons and is left <b>positive</b> by an equal amount. With an acetate rod, electrons move the other way.</p>
<div class="callout key"><b class="t">Only electrons move</b>Positive charges (protons) are locked in nuclei and never move in charging. "The rod gains positive charge" earns no marks. Write "the rod <b>loses electrons</b>".</div>
<p><b>Simple test:</b> hang a charged rod so it can rotate and bring another charged rod near it. Repulsion means like charges. Charged objects also attract small uncharged pieces of paper.</p>
<h3>Conductors and insulators</h3>
<p><b>Conductors</b> (metals, graphite) contain <b>free (delocalised) electrons</b> that can move through the material, so charge flows. <b>Insulators</b> (plastic, rubber, glass, dry wood) have electrons held tightly in atoms, so charge stays where it is put. That's why only insulators can be charged by rubbing while held in your hand.</p>
<h3>Electric fields (S)</h3>
<p>An <b>electric field</b> is a region in which an electric charge experiences a force. The <b>direction</b> of the field at a point is the direction of the force on a <b>positive</b> charge placed there: away from positive charges and towards negative charges.</p>
<ul><li><b>Point charge or charged sphere:</b> radial straight lines, outward for +, inward for −. The lines are closer near the charge, where the field is stronger.</li>
<li><b>Between two oppositely charged parallel plates:</b> evenly spaced parallel lines from + to −, a <b>uniform</b> field.</li></ul>
<div class="viz" data-viz="efield"></div>`},
    { h: "Current", body: P`
<p><b>Electric current</b> is the rate of flow of charge:</p>
$$I=\frac{Q}{t}\qquad1\text{ A}=1\text{ C/s}$$
<p>In metals the charge carriers are <b>electrons</b>, which drift from the <b>negative</b> terminal round to the <b>positive</b>. Before electrons were discovered, current was defined as flowing from + to −. This <b>conventional current</b> is still what arrows on circuit diagrams show.</p>
<p>Current is measured with an <b>ammeter</b> connected in <b>series</b> (it must be in the path the charge flows through). An ideal ammeter has almost zero resistance, so it doesn't change the current it measures.</p>
<h3>d.c. and a.c. (S)</h3>
<p><b>Direct current</b> flows in one direction only (cells, batteries). <b>Alternating current</b> repeatedly reverses direction. UK mains is 50 Hz, 230 V, so it reverses 100 times a second. On an oscilloscope, d.c. is a horizontal line and a.c. is a wave.</p>`},
    { h: "E.m.f. and potential difference", body: P`
<p>Both are measured in <b>volts</b>, and both are about <b>energy per unit charge</b>, but in opposite directions:</p>
<ul><li><b>Electromotive force (e.m.f.)</b>: the electrical work done by a source in moving a unit charge around a complete circuit. It is energy <b>given to</b> each coulomb by the cell.</li>
<li><b>Potential difference (p.d.)</b>: the work done by a unit charge passing through a component. It is energy <b>transferred from</b> each coulomb to the component.</li></ul>
$$E=\frac{W}{Q}\qquad V=\frac{W}{Q}\qquad1\text{ V}=1\text{ J/C}$$
<p>A 12 V battery gives 12 J to every coulomb that passes through it. Around the circuit, the coulombs transfer all of that energy to the components. So in a series circuit the p.d.s add up to the e.m.f. (energy is conserved).</p>
<p>P.d. is measured with a <b>voltmeter</b> connected in <b>parallel</b> across the component, because it compares the energy of charge on either side. An ideal voltmeter has very high resistance, so almost no current flows through it.</p>
<div class="callout key"><b class="t">Analogy that works</b>Charges are delivery vans that circulate forever. Voltage is the number of energy parcels each van carries. Current is how many vans pass per second. Components unload the parcels. The vans are never used up; only the energy is transferred.</div>`},
    { h: "Resistance and I–V graphs", body: P`
$$R=\frac{V}{I}\qquad(\text{ohms, }\Omega)$$
<p>Resistance tells you how much p.d. is needed to drive each amp of current through a component. A higher resistance means less current for the same p.d.</p>
<h3>The experiment</h3>
<p>Connect the component in series with an ammeter and a variable resistor (or variable power supply), with a voltmeter in parallel across the component. Vary the p.d., record $V$ and $I$ for several values (and reversed polarity for a diode), and calculate $R=V/I$ for each, or plot $I$ against $V$.</p>
<div class="viz" data-viz="ivGraphs"></div>
<ul>
<li><b>Fixed resistor at constant temperature</b>: a straight line through the origin, so $I\propto V$ and $R$ is constant. This is an <b>ohmic</b> conductor.</li>
<li><b>Filament lamp</b>: the curve gets <b>less steep</b> as $V$ increases, so $R$ <b>increases</b>. Why (S)? A larger current heats the filament. The metal ions vibrate more, the electrons collide with them more often, and the resistance rises.</li>
<li><b>Diode</b>: conducts in one direction only (above about 0.6 V forward). In reverse, the current is almost zero: very high resistance.</li>
</ul>
<h3>What affects a wire's resistance (S)</h3>
<p>$R\propto L$: a wire twice as long has twice the resistance, because electrons make twice as many collisions. $R\propto\dfrac1A$: a wire with twice the cross-sectional area has half the resistance, because it's like two wires side by side, giving more paths. (Doubling the <i>diameter</i> quadruples the area, so it quarters $R$.)</p>
<p>Two special resistors: a <b>thermistor</b>'s resistance <b>decreases as temperature increases</b>, and an <b>LDR</b>'s resistance <b>decreases as light intensity increases</b>.</p>`},
    { h: "Electrical power and energy", body: P`
$$P=IV\qquad E=IVt=Pt$$
<p>Why $P=IV$? $V$ is joules per coulomb and $I$ is coulombs per second. Multiplying gives joules per second, which is watts.</p>
<p>Combining with $V=IR$ gives $P=I^2R$ and $P=\dfrac{V^2}{R}$. These are useful when you don't know one of the quantities.</p>
<h3>Paying for electricity</h3>
<p>Energy companies charge per <b>kilowatt-hour (kWh)</b>: the energy used by a 1 kW appliance in 1 hour, which is $1000\times3600=3.6\times10^6$ J.</p>
<p>A 2.5 kW heater for 4 hours uses $2.5\times4=10$ kWh. At 30 cents per kWh it costs 300 cents. Use <b>kW</b> and <b>hours</b> for kWh calculations and <b>W</b> and <b>seconds</b> for joules.</p>`},
    { h: "Circuit diagrams and components", body: P`
<p>You need to recognise and draw the standard symbols: cell, battery, power supply, a.c. supply, switch, lamp, fixed resistor, variable resistor, thermistor, LDR, heater, fuse, ammeter (A in a circle), voltmeter (V in a circle), diode, LED, motor, generator, transformer, relay and earth.</p>
<ul><li>A <b>cell</b> is one long line and one short line. The long line is <b>positive</b>. A <b>battery</b> is two or more cells in series.</li>
<li>Draw wires as straight lines with right-angle corners, and put a dot at junctions.</li>
<li>Ammeters go in the line, in series. Voltmeters bridge across a component.</li></ul>
<p>Cells in series add their e.m.f.s if they face the same way (and subtract if one is reversed).</p>`},
    { h: "Series and parallel circuits", body: P`
<table class="t"><tr><th></th><th>Series</th><th>Parallel</th></tr>
<tr><td>Current</td><td>The <b>same</b> everywhere</td><td>Splits at junctions: $I=I_1+I_2$</td></tr>
<tr><td>P.d.</td><td>Shared: $V=V_1+V_2$</td><td>The <b>same</b> across each branch</td></tr>
<tr><td>Resistance</td><td>$R=R_1+R_2$</td><td>$\dfrac1R=\dfrac1{R_1}+\dfrac1{R_2}$</td></tr></table>
<p><b>Why?</b> The current rules come from <b>conservation of charge</b>: charge can't pile up or vanish, so whatever flows into a junction must flow out. The p.d. rules come from <b>conservation of energy</b>: each coulomb gives up all the energy it gained, whichever route it takes.</p>
<p>Adding a resistor in parallel <b>decreases</b> the total resistance, because it gives the current an extra path. So the combined resistance of a parallel pair is <b>always less than the smallest branch</b>. That's a great way to check your answer. For two equal resistors in parallel, $R_{total}=\tfrac12R$.</p>
<h3>Why houses use parallel circuits</h3>
<p>Each lamp gets the full mains p.d., each can be switched on and off independently, and if one bulb fails the others stay on. In series, one broken lamp breaks the whole circuit, and adding lamps makes them all dimmer.</p>
<p>Try the circuit simulator below. Switch between series and parallel and watch the electron flow change.</p>`},
    { h: "Sensors and potential dividers", body: P`
<p>Two resistors in series share the supply p.d. in the <b>ratio of their resistances</b> (S):</p>
$$\frac{V_1}{V_2}=\frac{R_1}{R_2}$$
<p>This is a <b>potential divider</b>. The bigger resistor gets the bigger share. A variable resistor (or a potentiometer with a sliding contact) gives a <b>variable</b> output p.d.</p>
<h3>Sensor circuits</h3>
<p>Replace one resistor with a <b>thermistor</b> or <b>LDR</b>. Take a thermistor in series with a fixed resistor, with the output measured across the fixed resistor. As the temperature rises, the thermistor's resistance <b>falls</b>, so it takes a <b>smaller share</b> of the p.d., and the p.d. across the fixed resistor <b>rises</b>. That output can switch on a fan or alarm (often via a relay).</p>
<div class="callout tip"><b class="t">How to answer "explain what happens to the reading"</b>Go step by step: (1) the condition changes, e.g. it gets darker; (2) the LDR's resistance increases; (3) the LDR's share of the p.d. increases (or the current decreases); (4) so the voltmeter reading across X changes in this direction. Each link is usually a mark.</div>
<p><b>Diode:</b> allows current in one direction only. It is used to protect circuits from a reversed battery and to convert a.c. into d.c. (rectification). An <b>LED</b> is a diode that emits light when current flows forwards.</p>`},
    { h: "Electrical safety", body: P`
<h3>Hazards</h3>
<ul><li><b>Damaged insulation</b>: exposed live wires can give a fatal shock.</li>
<li><b>Overheating of cables</b>: too much current (too many appliances on one socket, or cables too thin) heats the wires and can start a fire.</li>
<li><b>Damp conditions</b>: water conducts, so it can create a path from a live wire through a person.</li></ul>
<h3>The three wires</h3>
<p><b>Live</b> (brown) carries the alternating p.d. from the supply. <b>Neutral</b> (blue) completes the circuit, near 0 V. <b>Earth</b> (green and yellow) is a safety wire connected to the metal case, carrying current only when there's a fault.</p>
<h3>Fuses and circuit breakers</h3>
<p>A <b>fuse</b> is a thin wire in the <b>live</b> wire. If the current exceeds the fuse rating, it heats up and <b>melts</b>, breaking the circuit. A <b>circuit breaker</b> (trip switch) does the same job with an electromagnet that opens a switch. It acts faster and can be reset.</p>
<p><b>Choosing a fuse:</b> calculate the normal current $I=P/V$, then choose the <b>next rating above</b> it (e.g. 3 A, 5 A, 13 A). Too high and it won't protect the wiring. Too low and it blows during normal use.</p>
<h3>Earthing (with a fuse)</h3>
<p>If a live wire touches a metal case, a large current flows through the low-resistance <b>earth wire</b> instead of through a person. That large current <b>blows the fuse</b>, disconnecting the live supply. The case is now safe to touch.</p>
<p><b>Double insulation:</b> appliances with plastic (non-conducting) cases don't need an earth wire, because the case can't become live.</p>
<div class="callout warn"><b class="t">Why the fuse must be in the live wire</b>If it were in the neutral, a blown fuse would still leave the appliance connected to the live wire at 230 V. It would look off but still be dangerous.</div>`}
  ],
  worked: [
    { q: P`A 6.0 V battery is connected to 4 Ω and 12 Ω resistors in parallel. Find the total current.`,
      steps: [P`$\dfrac1R=\dfrac14+\dfrac1{12}=\dfrac{3}{12}+\dfrac1{12}=\dfrac{4}{12}$, so $R=3\,\Omega$.`, P`$I=\dfrac VR=\dfrac{6}{3}=2.0$ A. Check: the branches carry $6/4=1.5$ A and $6/12=0.5$ A, which total 2.0 A ✓`]},
    { q: P`A kettle is rated 2.3 kW, 230 V. Which fuse should it use: 3 A, 5 A or 13 A?`,
      steps: [P`$I=\dfrac PV=\dfrac{2300}{230}=10$ A.`, P`Choose the next rating above: <b>13 A</b>.`]},
    { q: P`A 9.0 V supply is connected to a 2.0 kΩ resistor in series with a thermistor of resistance 1.0 kΩ. Find the p.d. across the thermistor. What happens to it if the thermistor is warmed?`,
      steps: [P`Ratio $R_{th}:R=1:2$, so the thermistor gets $\tfrac13$ of 9.0 V $=3.0$ V.`, P`Warming lowers the thermistor's resistance, so it takes a smaller share and its p.d. <b>decreases</b> (and the p.d. across the fixed resistor increases).`]},
    { q: P`A charge of 360 C flows through a lamp in 2 minutes, transferring 4320 J. Find the current and the p.d.`,
      steps: [P`$I=\dfrac Qt=\dfrac{360}{120}=3.0$ A.`, P`$V=\dfrac WQ=\dfrac{4320}{360}=12$ V.`]}
  ],
  formulas: [
    ["Ohm's law / resistance", P`$V=IR$`], ["Current", P`$I=\dfrac Qt$`], ["P.d. / e.m.f.", P`$V=\dfrac WQ$`], ["Power", P`$P=IV=I^2R$`], ["Energy", P`$E=IVt$`],
    ["Series", P`$R=R_1+R_2$`], ["Parallel", P`$\frac1R=\frac1{R_1}+\frac1{R_2}$`], ["Potential divider", P`$\frac{V_1}{V_2}=\frac{R_1}{R_2}$`]
  ],
  cards: [
    ["Define current.", P`Rate of flow of charge, $I=Q/t$.`],
    ["Define potential difference.", P`Work done (energy transferred) per unit charge passing through a component, $V=W/Q$.`],
    ["Define e.m.f.", "Electrical work done by a source in moving a unit charge around a complete circuit."],
    ["What moves when a rod is charged by friction?", "Electrons only."],
    ["Polythene rubbed with a cloth becomes…", "Negative: it gains electrons from the cloth."],
    ["Define an electric field", "A region in which an electric charge experiences a force."],
    ["Direction of an electric field", "The direction of the force on a positive charge."],
    ["Field between parallel plates", "Uniform: evenly spaced parallel lines from + to −."],
    ["Why do metals conduct?", "They contain free (delocalised) electrons that can move."],
    ["Conventional current direction", "From + to − (electrons actually flow − to +)."],
    ["How is an ammeter connected?", "In series."],
    ["How is a voltmeter connected?", "In parallel across the component."],
    ["Why does a filament lamp's resistance increase?", "It heats up, so ions vibrate more and electrons collide more often."],
    ["Resistance vs length and area", P`$R\propto L$ and $R\propto 1/A$.`],
    ["Thermistor: temperature up → resistance?", "Decreases."],
    ["LDR: light up → resistance?", "Decreases."],
    ["What does a diode do?", "It lets current flow in one direction only."],
    ["Current rule at a junction (and why)", "Current in = current out, because charge is conserved."],
    ["Total resistance in parallel compared to the smallest branch?", "Always less."],
    ["Advantages of parallel lighting", "Each lamp gets full p.d., they can be switched independently, and one failing doesn't affect the others."],
    ["What is 1 kWh in joules?", P`$3.6\times10^6$ J`],
    ["Which wire does the fuse go in?", "The live wire."],
    ["How does a fuse work?", "If the current exceeds its rating, the wire heats and melts, breaking the circuit."],
    ["How does earthing protect you?", "A fault makes a large current flow to earth, which blows the fuse and disconnects the live wire."],
    ["What is double insulation?", "A non-conducting case, so the appliance needs no earth wire."],
    ["Three electrical hazards", "Damaged insulation, overheating cables, and damp conditions."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: P`Two 10 Ω resistors in parallel have a combined resistance of`, opts: ["20 Ω", "10 Ω", "5 Ω", "0.2 Ω"], ans: 2, why: P`$\frac1R=\frac1{10}+\frac1{10}=\frac15$, so $R=5\,\Omega$.` },
    { type: "mcq", marks: 2, q: P`In a series circuit with a 12 V supply and resistors of 2 Ω and 4 Ω, the p.d. across the 4 Ω resistor is`, opts: ["4 V", "6 V", "8 V", "12 V"], ans: 2, why: P`$I=12/6=2$ A, so $V=2\times4=8$ V. Or split 12 V in the ratio 2 : 4.` },
    { type: "mcq", marks: 1, q: P`An LDR is moved into darkness. Its resistance`, opts: ["Increases", "Decreases", "Stays the same", "Becomes zero"], ans: 0, why: P`Less light means higher resistance.` },
    { type: "mcq", marks: 1, q: P`A cloth is rubbed on an acetate rod and the rod becomes positive. This is because`, opts: ["Protons moved to the rod", "Electrons moved from the rod to the cloth", "Electrons moved from the cloth to the rod", "Positive ions were created"], ans: 1, why: P`Only electrons move. Losing negative charge leaves the rod positive.` },
    { type: "mcq", marks: 1, q: P`A current of 0.5 A flows for 1 minute. The charge that flows is`, opts: ["0.5 C", "30 C", "120 C", "0.008 C"], ans: 1, why: P`$Q=It=0.5\times60=30$ C. Time must be in seconds.` },
    { type: "mcq", marks: 2, q: P`A 2 kW heater is used for 3 hours at 25 cents per kWh. The cost is`, opts: ["50 cents", "75 cents", "150 cents", "600 cents"], ans: 2, why: P`$2\times3=6$ kWh, and $6\times25=150$ cents.` },
    { type: "mcq", marks: 1, q: P`The direction of an electric field is`, opts: ["The direction electrons move", "The direction of the force on a positive charge", "Always towards a positive charge", "From − to +"], ans: 1, why: P`By definition. So it points away from + and towards −.` },
    { type: "mcq", marks: 1, q: P`A wire is replaced by one of the same material that is twice as long and has twice the cross-sectional area. Its resistance`, opts: ["Doubles", "Halves", "Stays the same", "Quadruples"], ans: 2, why: P`×2 for length and ÷2 for area cancel out.` },
    { type: "struct", marks: 3, q: P`A 60 W lamp runs on 240 V for 5 hours. Calculate the current and the energy transferred in joules.`,
      ms: P`<b>C1</b> $I=P/V=0.25$ A<br><b>M1</b> $E=Pt=60\times5\times3600$<br><b>A1</b> $1.08\times10^6$ J` },
    { type: "struct", marks: 4, q: P`Explain, in terms of electrons, how a polythene rod becomes negatively charged when rubbed with a dry cloth, and why the cloth becomes positively charged.`,
      ms: P`<b>B1</b> friction causes electrons to transfer<br><b>B1</b> from the cloth to the rod<br><b>B1</b> the rod has more electrons than protons, so it is negative<br><b>B1</b> the cloth has lost electrons (more protons than electrons), so it is positive by an equal amount` },
    { type: "struct", marks: 4, q: P`Sketch and explain the shape of the current–voltage graph for a filament lamp.`,
      ms: P`<b>B1</b> a curve through the origin with a decreasing gradient (S-shaped for ± values)<br><b>B1</b> as the current increases, the filament's temperature increases<br><b>B1</b> ions vibrate more, so electrons collide more often<br><b>B1</b> so resistance increases, and current increases less for each extra volt` },
    { type: "struct", marks: 5, q: P`A 12 V battery is connected to a 6 Ω resistor in series with a parallel pair of 4 Ω and 12 Ω resistors. Calculate (a) the total resistance, (b) the current from the battery, (c) the p.d. across the parallel pair.`,
      ms: P`(a) <b>M1</b> parallel pair $=3\,\Omega$ <b>A1</b> total $=9\,\Omega$<br>(b) <b>B1</b> $I=12/9=1.33$ A<br>(c) <b>M1</b> $V=1.33\times3$ <b>A1</b> $4.0$ V (equivalently 12 V − 8 V)` },
    { type: "struct", marks: 4, q: P`An LDR is connected in series with a fixed resistor to a 6 V supply. A voltmeter is across the fixed resistor. Explain what happens to the voltmeter reading as the room gets darker.`,
      ms: P`<b>B1</b> the LDR's resistance increases in the dark<br><b>B1</b> total resistance increases so the current decreases (or: the LDR's share of the p.d. increases)<br><b>B1</b> p.d. across the fixed resistor $=IR$ decreases<br><b>B1</b> so the voltmeter reading decreases` },
    { type: "struct", marks: 4, q: P`Explain how the earth wire and fuse together protect a person if the live wire touches the metal case of a washing machine.`,
      ms: P`<b>B1</b> the earth wire connects the case to the ground with low resistance<br><b>B1</b> a large current flows through the earth wire (not through the person)<br><b>B1</b> this current exceeds the fuse rating, so the fuse melts<br><b>B1</b> the live supply is disconnected, so the case is no longer live` },
    { type: "struct", marks: 3, q: P`A hairdryer is rated 1.2 kW, 230 V. Calculate the normal current and choose a fuse from 3 A, 5 A and 13 A. Explain your choice.`,
      ms: P`<b>M1</b> $I=1200/230$ <b>A1</b> $5.2$ A<br><b>B1</b> 13 A: the next rating above the normal current (5 A would blow in normal use)` },
    { type: "struct", marks: 4, q: P`Describe an experiment to determine the resistance of a wire. Include a circuit diagram description.`,
      ms: P`<b>B1</b> wire in series with an ammeter, a power supply and a variable resistor<br><b>B1</b> voltmeter in parallel across the wire<br><b>B1</b> record $V$ and $I$ for several settings of the variable resistor<br><b>B1</b> $R=V/I$ (average), or the gradient of a $V$ against $I$ graph. Keep the current small or switch off between readings so the wire doesn't heat up.` },
    { type: "struct", marks: 3, q: P`Define e.m.f. and potential difference, and explain why the p.d.s around a series circuit add up to the e.m.f.`,
      ms: P`<b>B1</b> e.m.f.: electrical work done by the source per unit charge moved around the complete circuit<br><b>B1</b> p.d.: work done per unit charge passing through a component<br><b>B1</b> energy is conserved: the energy given to each coulomb by the source is all transferred in the components` },
    { type: "struct", marks: 3, q: P`Draw and describe the electric field pattern between two parallel metal plates, the top one positive and the bottom one negative.`,
      ms: P`<b>B1</b> straight, parallel, equally spaced lines between the plates<br><b>B1</b> perpendicular to the plates<br><b>B1</b> arrows pointing from + (top) to − (bottom)` }
  ]
});

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
