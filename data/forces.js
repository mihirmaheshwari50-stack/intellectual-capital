window.TOPICS = window.TOPICS || [];
{
const P = String.raw, F = FIG;

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
}
