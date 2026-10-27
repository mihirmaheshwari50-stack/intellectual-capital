window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
//@@HELPERS-START
// ---- diagram helpers for this topic ----
const grid = (o) => F.plot(Object.assign({ w: 420, h: 340, x: [-5, 5], y: [-4, 6], ticks: { x: [-4, -3, -2, -1, 1, 2, 3, 4], y: [-3, -2, -1, 1, 2, 3, 4, 5] }, xlabel: "x", ylabel: "y" }, o));
//@@HELPERS-END

/* ============================================================
   STRAIGHT-LINE GRAPHS  (0580: E3.1–E3.7, E2.6 regions, E2.9)
   ============================================================ */
TOPICS.push({
  id: "lines", subject: "maths", title: "Straight-line graphs",
  blurb: "Gradient, y = mx + c, parallel and perpendicular lines, midpoint, length, regions and real-life graphs.",
  level: "Core → Extended", demo: "line",
  syllabus: [
    ["E3.1", "Use and interpret Cartesian coordinates in two dimensions", 0],
    ["E3.2", "Draw straight-line graphs from a table of values or an equation, including $ax+by=c$", 1],
    ["E3.3", "Calculate the gradient of a straight line from a graph or from two points", 2],
    ["E3.5", "Interpret and obtain the equation of a straight line in the form $y=mx+c$", 3],
    ["E3.6", "Find the gradient and equation of a line parallel to a given line", 4],
    ["E3.7", "Find the gradient and equation of a perpendicular line, including the perpendicular bisector", 4],
    ["E3.4", "Calculate the length and the midpoint of a line segment", 5],
    ["E2.5", "Solve simultaneous linear equations graphically (intersection of two lines)", 6],
    ["E2.6", "Represent linear inequalities graphically and identify regions", 7],
    ["E2.9", "Interpret distance–time and speed–time graphs and other real-life linear graphs", 8]
  ],
  sections: [
    { h: "Coordinates (E3.1)", body: M`
<p class="lead">A coordinate pair $(x,y)$ pinpoints a position on a grid: $x$ tells you how far <b>across</b> from the origin and $y$ how far <b>up</b>. Order matters: $(2,5)$ and $(5,2)$ are different points.</p>
${grid({ marks: [{ x: 3, y: 2, c: "b", label: "A(3, 2)", pos: "ne" }, { x: -2, y: 4, c: "o", label: "B(−2, 4)", pos: "nw" }, { x: -4, y: -2, c: "g", label: "C(−4, −2)", pos: "sw" }, { x: 2, y: -3, c: "r", label: "D(2, −3)", pos: "se" }, { x: 0, y: 0, c: "k", label: "O", pos: "sw" }],
  extra: (X, Y) => F.text(X(3.2), Y(5.2), "1st quadrant", "tm small") + F.text(X(-3), Y(5.2), "2nd", "tm small") + F.text(X(-3), Y(-3.4), "3rd", "tm small") + F.text(X(3.5), Y(-3.4), "4th", "tm small") + F.line(X(3), Y(0), X(3), Y(2), "b d thin") + F.line(X(0), Y(2), X(3), Y(2), "b d thin"),
  cap: "The axes cross at the origin O(0, 0) and split the plane into four quadrants. To reach A(3, 2): 3 across, then 2 up." })}
<ul><li>Positive $x$ is to the right and negative $x$ to the left. Positive $y$ is up and negative $y$ down.</li>
<li>Every point on the $x$-axis has $y=0$, e.g. $(4,0)$. Every point on the $y$-axis has $x=0$, e.g. $(0,-3)$.</li>
<li>A memory aid: "along the corridor, then up (or down) the stairs".</li></ul>
<div class="callout warn"><b class="t">Common mistakes</b>Plotting $(y,x)$ instead of $(x,y)$. Counting grid squares when the scale isn't 1 per square: always read the axis numbers. Writing coordinates without brackets or commas.</div>
<p>A point <b>lies on a line</b> if its coordinates satisfy the line's equation. Is $(2,4)$ on $y=3x-2$? Substitute $x=2$: $3(2)-2=4$ ✓. Is $(1,2)$? $3(1)-2=1\neq2$, so no.</p>
<details class="check"><summary>Three corners of a square are $(1,1)$, $(4,1)$ and $(4,4)$. What is the fourth?</summary><div>$(1,4)$.</div></details>`},

    { h: "Drawing straight-line graphs (E3.2)", body: M`
<p class="lead">An equation like $y=2x-1$ is a rule linking $x$ and $y$. Its graph is the set of <b>every</b> point that obeys the rule, and for a linear equation (no powers, no $xy$ terms) those points always form a straight line.</p>
<h3>Method 1: table of values</h3>
<table class="t"><tr><th>$x$</th><td>−1</td><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>$y=2x-1$</th><td>−3</td><td>−1</td><td>1</td><td>3</td><td>5</td></tr></table>
<p>Plot the points and join them with a <b>ruler</b>, extending across the whole range asked for. Use at least three points: two define a line, and the third catches a mistake (if it isn't in line, something's wrong).</p>
<h3>Method 2: gradient and intercept</h3>
<p>For $y=mx+c$: start at $(0,c)$ on the $y$-axis, then step <b>1 across and $m$ up</b> (or down if $m$ is negative) repeatedly. For $y=\tfrac23x+1$, it's easier to step 3 across and 2 up.</p>
<h3>Method 3: cover-up (intercepts), best for $ax+by=c$</h3>
<p>For $3x+2y=12$: put $x=0$, giving $2y=12$, $y=6$, so the point is $(0,6)$. Put $y=0$, giving $3x=12$, $x=4$, so the point is $(4,0)$. Join the two intercepts.</p>
${grid({ x: [-2, 6], y: [-4, 8], ticks: { x: [-1, 1, 2, 3, 4, 5], y: [-3, -2, -1, 1, 2, 3, 4, 5, 6, 7] }, curves: [{ f: x => 2 * x - 1, c: "b thick", label: "y = 2x − 1", lpos: [4.3, 7.6], ldx: -76, ldy: 4 }, { f: x => 6 - 1.5 * x, c: "o thick", label: "3x + 2y = 12", lpos: [5.2, -1.8], ldx: -100, ldy: 18 }],
  marks: [[-1, -3], [0, -1], [1, 1], [2, 3], [3, 5]].map(([x, y]) => ({ x, y, c: "b", r: 3.5 })).concat([{ x: 0, y: 6, c: "o", label: "(0, 6)", pos: "e" }, { x: 4, y: 0, c: "o", label: "(4, 0)", pos: "ne" }]),
  cap: "Blue: plotted from the table. Orange: drawn from its two intercepts." })}
<h3>Horizontal and vertical lines</h3>
${grid({ curves: [{ f: x => -2, c: "g thick", label: "y = −2", lpos: [-4.8, -2], ldx: 2, ldy: -8 }], extra: (X, Y) => F.line(X(3), Y(-4), X(3), Y(6), "r thick") + F.text(X(3) + 6, Y(5.4), "x = 3", "tr bold small", "start"),
  cap: "$x=3$ is every point whose $x$-coordinate is 3: a <b>vertical</b> line. $y=-2$ is <b>horizontal</b>." })}
<div class="callout warn"><b class="t">The classic swap</b>Students often draw $x=3$ horizontally. Think: "which points have $x=3$?" $(3,0)$, $(3,1)$, $(3,-2)$… they stack up vertically. The $x$-axis itself is the line $y=0$, and the $y$-axis is $x=0$.</div>
<details class="check"><summary>Find where $5x-2y=10$ crosses each axis.</summary><div>$x=0$: $y=-5$, so $(0,-5)$. $y=0$: $x=2$, so $(2,0)$.</div></details>`},

    { h: "Gradient (E3.3)", body: M`
<p class="lead">The gradient $m$ measures steepness: <b>how much $y$ changes for every 1 unit increase in $x$</b>.</p>
$$m=\frac{\text{change in }y}{\text{change in }x}=\frac{y_2-y_1}{x_2-x_1}$$
${grid({ x: [-4, 4], y: [-4, 6], ticks: { x: [-3, -2, -1, 1, 2, 3], y: [-3, -2, -1, 1, 2, 3, 4, 5] }, curves: [{ f: x => 3 * x, c: "r mid", label: "m = 3", lpos: [1.9, 5.7], ldx: 6 }, { f: x => x, c: "b mid", label: "m = 1", lpos: [3.6, 3.6], ldx: 4, ldy: 14 }, { f: x => 0.25 * x + 1, c: "g mid", label: "m = ¼", lpos: [3.4, 1.85], ldx: -10, ldy: 18 }, { f: x => 2, c: "m mid", label: "m = 0", lpos: [-3.8, 2], ldx: 2, ldy: -8 }, { f: x => -2 * x + 1, c: "o mid", label: "m = −2", lpos: [-2.4, 5.8], ldx: 8 }],
  cap: "Positive gradients rise left to right and negative ones fall. A bigger size means steeper. Zero is horizontal, and a vertical line's gradient is undefined." })}
<h3>From two points</h3>
${grid({ x: [-3, 6], y: [-8, 7], ticks: { x: [-2, -1, 1, 2, 3, 4, 5], y: [-6, -4, -2, 2, 4, 6] }, gridStep: [1, 2], curves: [{ f: x => -2 * x + 1, c: "c thick" }], marks: [{ x: -2, y: 5, c: "k", label: "(−2, 5)", pos: "e" }, { x: 4, y: -7, c: "k", label: "(4, −7)", pos: "w" }],
  extra: (X, Y) => F.line(X(-2), Y(5), X(-2), Y(-7), "o mid d") + F.line(X(-2), Y(-7), X(4), Y(-7), "o mid d") + F.text(X(-2) - 6, Y(-1), "−12", "to bold", "end") + F.text(X(1), Y(-7) + 18, "+6", "to bold"),
  cap: "From $(-2,5)$ to $(4,-7)$: $y$ falls by 12 while $x$ rises by 6, so $m=\\dfrac{-12}{6}=-2$." })}
<p>Use brackets for negative coordinates: $m=\dfrac{-7-5}{4-(-2)}=\dfrac{-12}{6}=-2$. You can subtract in either order, as long as you use the <b>same order</b> on top and bottom.</p>
<h3>From a drawn graph</h3>
<ol class="steps-inline"><li>Choose two points on the line where it crosses grid intersections exactly, as far apart as possible.</li>
<li>Draw the right-angled triangle between them.</li><li>Read the rise and run from the <b>axis scales</b>, not by counting squares.</li><li>Divide rise by run, and decide the sign by eye: does the line go up or down?</li></ol>
<div class="callout warn"><b class="t">Lost marks</b>$\dfrac{x_2-x_1}{y_2-y_1}$ (upside down). Counting squares when the $x$ and $y$ scales differ (e.g. 1 square = 2 units on $y$ but 1 unit on $x$). Losing the minus sign on a line that falls.</div>
<p>In real-life graphs the gradient has <b>units</b>: on a distance (m) against time (s) graph, the gradient is in m/s, a speed.</p>
<details class="check"><summary>Find the gradient through $(3,-1)$ and $(-1,7)$.</summary><div>$\dfrac{7-(-1)}{-1-3}=\dfrac{8}{-4}=-2$.</div></details>`},

    { h: "The equation y = mx + c (E3.5)", body: M`
<p class="lead">Every non-vertical straight line can be written $y=mx+c$, where $m$ is the <b>gradient</b> and $c$ is the <b>$y$-intercept</b> (where it crosses the $y$-axis, at $(0,c)$).</p>
<p>Why? At $x=0$, $y=c$, which is the intercept. Each time $x$ increases by 1, $y$ increases by $m$, which is the gradient.</p>
${F.row(
  grid({ w: 300, h: 280, x: [-4, 4], y: [-4, 6], ticks: { x: [-2, 2], y: [-2, 2, 4] }, curves: [{ f: x => 2 * x + 3, c: "b mid", label: "c = 3", lpos: [0.3, 3.6], ldx: 6, ldy: 6 }, { f: x => 2 * x, c: "c mid", label: "c = 0", lpos: [2.7, 5.4], ldx: -48 }, { f: x => 2 * x - 2, c: "o mid", label: "c = −2", lpos: [3.2, 4.4], ldx: 6, ldy: 14 }], cap: "Same $m=2$, different $c$: parallel lines." }),
  grid({ w: 300, h: 280, x: [-4, 4], y: [-4, 6], ticks: { x: [-2, 2], y: [-2, 2, 4] }, curves: [{ f: x => 3 * x + 1, c: "r mid", label: "m = 3", lpos: [1.5, 5.5], ldx: 6 }, { f: x => .5 * x + 1, c: "g mid", label: "m = ½", lpos: [3.4, 2.7], ldx: -14, ldy: 18 }, { f: x => -x + 1, c: "o mid", label: "m = −1", lpos: [-3.4, 4.4], ldx: 6 }], marks: [{ x: 0, y: 1, c: "k" }], cap: "Same $c=1$, different $m$: all pass through $(0,1)$." })
)}
<h3>Lines in other forms</h3>
<p>You can read $m$ and $c$ directly only when $y$ is the subject on its own, with coefficient 1. Otherwise, rearrange first:</p>
$$3x+2y=12\;\Rightarrow\;2y=-3x+12\;\Rightarrow\;y=-\tfrac32x+6\qquad m=-\tfrac32,\;c=6$$
<p>A common trap is reading the gradient of $3x+2y=12$ as 3. Similarly, $y=5-2x$ has $m=-2$ (the term with $x$), not 5.</p>
<h3>Finding the equation of a line</h3>
<p><b>From a graph:</b> read $c$ from the $y$-intercept, then measure $m$ with a triangle.</p>
<p><b>From a gradient and a point</b>, e.g. $m=3$ through $(2,1)$: substitute into $y=mx+c$, giving $1=3(2)+c$, so $c=-5$ and $y=3x-5$. Or use $y-y_1=m(x-x_1)$: $y-1=3(x-2)$.</p>
<div class="callout ex"><b class="t">Worked example: two points</b>Find the equation through $(-2,5)$ and $(4,-7)$.<br>Gradient: $m=\dfrac{-12}{6}=-2$.<br>Substitute $(-2,5)$: $5=-2(-2)+c\Rightarrow c=1$. So $y=-2x+1$.<br><b>Check</b> with the other point: $-2(4)+1=-7$ ✓.</div>
<p>If the answer must be in the form $ax+by=c$ (or $ax+by+c=0$) with integers, rearrange and multiply out fractions at the end: $y=-\tfrac32x+6\Rightarrow2y=-3x+12\Rightarrow3x+2y=12$.</p>
<details class="check"><summary>Find the gradient and $y$-intercept of $4x-5y=20$.</summary><div>$5y=4x-20\Rightarrow y=\tfrac45x-4$. So $m=\tfrac45$ and $c=-4$.</div></details>
<details class="check"><summary>Find the equation of the line through $(1,4)$ and $(3,10)$.</summary><div>$m=3$; $4=3+c\Rightarrow c=1$; $y=3x+1$.</div></details>`},

    { h: "Parallel and perpendicular lines (E3.6, E3.7)", body: M`
<div class="callout key"><b class="t">The two rules</b><b>Parallel</b> lines have <b>equal gradients</b>: $m_1=m_2$.<br><b>Perpendicular</b> lines have gradients that multiply to $-1$: $m_1\times m_2=-1$, so $m_2=-\dfrac{1}{m_1}$. In words: <b>flip the fraction and change the sign</b>. $\tfrac23\to-\tfrac32$, $\;-4\to\tfrac14$, $\;1\to-1$.</div>
<p>Parallel lines never meet because they rise at the same rate. Only their intercepts differ.</p>
<h3>Why the perpendicular rule works</h3>
<div class="viz" data-viz="perp"></div>
${grid({ x: [-3, 4], y: [-1, 4], ticks: { x: [-2, -1, 1, 2, 3], y: [1, 2, 3] }, curves: [{ f: x => 2 * x, c: "b thick", label: "gradient 2", lpos: [1.6, 3.2], ldx: 8 }, { f: x => -.5 * x, c: "o thick", label: "gradient −½", lpos: [-2.6, 1.3], ldx: 0, ldy: -10 }],
  extra: (X, Y) => F.poly([[X(0), Y(0)], [X(1), Y(0)], [X(1), Y(2)]], "b mid", true) + F.poly([[X(0), Y(0)], [X(0), Y(1)], [X(-2), Y(1)]], "o mid", true) + F.text(X(.5), Y(0) + 16, "1", "tb bold") + F.text(X(1) + 8, Y(1), "2", "tb bold", "start") + F.text(X(-1), Y(1) - 8, "2", "to bold") + F.text(X(0) + 8, Y(.5), "1", "to bold", "start"),
  cap: "Rotate the blue triangle (run 1, rise 2) by 90° and it becomes run −2, rise 1, giving gradient $-\\tfrac12$. And $2\\times(-\\tfrac12)=-1$." })}
<p>A gradient $m$ is "run 1, rise $m$". Rotating the whole picture 90° turns this into "run $-m$, rise 1", so the new gradient is $\dfrac{1}{-m}=-\dfrac1m$. Multiply them: $m\times\left(-\dfrac1m\right)=-1$.</p>
<div class="callout ex"><b class="t">Worked example: parallel</b>Find the line through $(2,5)$ parallel to $3x+y=4$.<br>Rearrange: $y=-3x+4$, so $m=-3$. Then $5=-3(2)+c\Rightarrow c=11$. Answer: $y=-3x+11$.</div>
<div class="callout ex"><b class="t">Worked example: perpendicular</b>Find the line through $(3,-1)$ perpendicular to $4x-2y=7$. Give it in the form $ax+by=c$.<br>$y=2x-3.5$, so $m=2$ and the perpendicular gradient is $-\tfrac12$.<br>$y+1=-\tfrac12(x-3)\Rightarrow2y+2=-x+3\Rightarrow x+2y=1$.</div>
<p><b>Proving shapes:</b> a right angle is shown by gradients with product $-1$. A parallelogram has opposite sides with equal gradients. A rectangle has both.</p>
<details class="check"><summary>Are $y=\tfrac34x+2$ and $4x+3y=1$ perpendicular?</summary><div>The second is $y=-\tfrac43x+\tfrac13$. $\tfrac34\times-\tfrac43=-1$, so yes.</div></details>`},

    { h: "Length, midpoint and perpendicular bisector (E3.4)", body: M`
${grid({ x: [-4, 6], y: [-5, 4], ticks: { x: [-3, -2, -1, 1, 2, 3, 4, 5], y: [-4, -3, -2, -1, 1, 2, 3] }, curves: [{ pts: [[-3, 2], [5, -4]], c: "c thick" }],
  marks: [{ x: -3, y: 2, c: "k", label: "P(−3, 2)", pos: "n" }, { x: 5, y: -4, c: "k", label: "Q(5, −4)", pos: "e" }, { x: 1, y: -1, c: "r", label: "M(1, −1)", pos: "ne" }],
  extra: (X, Y) => F.line(X(-3), Y(2), X(-3), Y(-4), "o d") + F.line(X(-3), Y(-4), X(5), Y(-4), "o d") + F.text(X(-3) - 6, Y(-1), "6", "to bold", "end") + F.text(X(1), Y(-4) + 18, "8", "to bold"),
  cap: "Length: a right-angled triangle with sides 8 and 6, so $PQ=\\sqrt{64+36}=10$. Midpoint: the average of the coordinates, $(1,-1)$." })}
<h3>Length</h3>
$$d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$$
<p>It's Pythagoras: the horizontal and vertical changes are the two shorter sides. Squaring removes negative signs, so the order of subtraction doesn't matter. Leave the answer as a surd if asked for an exact value ($\sqrt{80}=4\sqrt5$).</p>
<h3>Midpoint</h3>
$$M=\left(\frac{x_1+x_2}{2},\;\frac{y_1+y_2}{2}\right)$$
<p>Just the <b>average</b> of the $x$-coordinates and of the $y$-coordinates. Reverse problems are common: if $M(1,-1)$ is the midpoint of $P(-3,2)$ and $Q$, then $Q=(2\times1-(-3),\;2\times(-1)-2)=(5,-4)$.</p>
<h3>Perpendicular bisector</h3>
${grid({ x: [-1, 9], y: [-1, 9], ticks: { x: [1, 2, 3, 4, 5, 6, 7, 8], y: [1, 2, 3, 4, 5, 6, 7, 8] }, curves: [{ pts: [[1, 2], [7, 6]], c: "b thick" }, { f: x => -1.5 * x + 10, c: "r thick", label: "y = −1.5x + 10", lpos: [2.1, 6.85], ldx: 10 }],
  marks: [{ x: 1, y: 2, c: "b", label: "A(1, 2)", pos: "s" }, { x: 7, y: 6, c: "b", label: "B(7, 6)", pos: "e" }, { x: 4, y: 4, c: "r", label: "M(4, 4)", pos: "se" }],
  extra: (X, Y) => F.rightAngle(X(4), Y(4), 0.832, -0.555, -0.555, -0.832, 12, "r"),
  cap: "The perpendicular bisector of AB passes through the midpoint M at right angles to AB. Every point on it is equidistant from A and B." })}
<ol class="steps-inline"><li>Midpoint of AB: $\left(\tfrac{1+7}2,\tfrac{2+6}2\right)=(4,4)$.</li><li>Gradient of AB: $\tfrac{4}{6}=\tfrac23$.</li><li>Perpendicular gradient: $-\tfrac32$.</li><li>Line through $(4,4)$: $y-4=-\tfrac32(x-4)\Rightarrow y=-\tfrac32x+10$.</li></ol>
<details class="check"><summary>Find the exact length between $(2,-1)$ and $(6,7)$.</summary><div>$\sqrt{16+64}=\sqrt{80}=4\sqrt5$.</div></details>`},

    { h: "Intersections = simultaneous equations (E2.5)", body: M`
<p class="lead">The point where two lines cross lies on <b>both</b> lines, so its coordinates satisfy <b>both</b> equations at once. That makes it the solution of the simultaneous equations.</p>
${grid({ x: [-2, 8], y: [-3, 9], ticks: { x: [-1, 1, 2, 3, 4, 5, 6, 7], y: [-2, -1, 1, 2, 3, 4, 5, 6, 7, 8] }, curves: [{ f: x => 2 * x - 1, c: "b thick", label: "y = 2x − 1", lpos: [4.4, 7.8], ldx: 6 }, { f: x => 8 - x, c: "o thick", label: "x + y = 8", lpos: [6, 2], ldx: 10, ldy: 4 }],
  marks: [{ x: 3, y: 5, c: "r", label: "(3, 5)", pos: "e" }], extra: (X, Y) => F.line(X(3), Y(5), X(3), Y(0), "r d thin") + F.line(X(3), Y(5), X(0), Y(5), "r d thin"),
  cap: "The lines cross at (3, 5), so $x=3$, $y=5$ solves both equations." })}
<p><b>Graphically:</b> draw both lines accurately and read off the crossing point. Graphical answers are only as accurate as your drawing, so if it lands between grid lines, estimate to the nearest half square or better.</p>
<p><b>Algebraically</b> (for an exact answer): substitute $y=2x-1$ into $x+y=8$, giving $3x-1=8$, so $x=3$ and $y=5$.</p>
<p><b>Special cases</b>: parallel lines (same gradient, different intercept) never meet, so there's <b>no solution</b>. Identical lines meet everywhere, giving infinitely many solutions.</p>
<details class="check"><summary>Do $y=3x+2$ and $6x-2y=5$ meet?</summary><div>The second is $y=3x-2.5$: same gradient, different intercept. They're parallel, so there's no solution.</div></details>`},

    { h: "Regions and inequalities (E2.6)", body: M`
<p class="lead">A line splits the plane into two halves. An inequality such as $y\ge2x$ describes one of those halves, called a <b>region</b>.</p>
<ol class="steps-inline"><li>Draw the boundary by replacing the inequality sign with $=$. Use a <b>solid</b> line for $\le$ or $\ge$ (points on the line are included) and a <b>dashed</b> line for $<$ or $>$ (not included).</li>
<li>Pick a <b>test point</b> not on the line; $(0,0)$ is easiest if the line misses it. Substitute it in: if the inequality is true, that point's side is the region.</li>
<li>Shade as instructed. Cambridge questions often say "shade the <b>unwanted</b> region", which leaves the answer region clear. Read the instruction.</li></ol>
${F.plot({ w: 440, h: 360, x: [-1, 7], y: [-1, 7], ticks: { x: [1, 2, 3, 4, 5, 6], y: [1, 2, 3, 4, 5, 6] }, xlabel: "x", ylabel: "y",
  curves: [{ f: x => 1, c: "b thick", label: "y = 1", lpos: [6.2, 1], ldx: 4, ldy: -8 }, { f: x => 6 - x, c: "o thick", label: "x + y = 6", lpos: [0.2, 5.8], ldx: 10, ldy: -6 }, { f: x => 2 * x, c: "g thick", label: "y = 2x", lpos: [3.2, 6.4], ldx: 6 }],
  extra: (X, Y) => F.poly([[X(.5), Y(1)], [X(5), Y(1)], [X(2), Y(4)]], "c cS", true) + F.text(X(2.5), Y(2), "R", "tk bold big serif"),
  marks: [{ x: .5, y: 1, c: "r", label: "(0.5, 1)", pos: "nw" }, { x: 5, y: 1, c: "r", label: "(5, 1)", pos: "se" }, { x: 2, y: 4, c: "r", label: "(2, 4)", pos: "ne" }],
  cap: "Region R satisfies $y\\ge1$, $x+y\\le6$ and $y\\le2x$. The vertices are where pairs of boundary lines cross." })}
<p>For $x+y\le6$: test $(0,0)$, giving $0\le6$, which is true, so the region is the side containing the origin (below the line). For $y\le2x$ the origin is <b>on</b> the line, so test $(1,0)$: $0\le2$ is true, so it's the side containing $(1,0)$.</p>
<div class="callout tip"><b class="t">Quick rule</b>When $y$ is the subject with a positive coefficient, $y>\ldots$ is <b>above</b> the line and $y<\ldots$ is <b>below</b>. When it's not, use a test point. It's never wrong.</div>
<h3>Optimisation (linear programming)</h3>
<p>To find the maximum or minimum of an expression like $x+2y$ over a region, evaluate it at each <b>vertex</b>. The extreme values always occur at corners.</p>
<p>At $(0.5,1)$: $2.5$. At $(5,1)$: $7$. At $(2,4)$: $10$. So the maximum is 10, at $(2,4)$. If the question wants <b>integer</b> points, check the whole-number points inside the region near the best vertex.</p>
<details class="check"><summary>Write the three inequalities that define the triangle with vertices $(0,0)$, $(4,0)$ and $(0,4)$.</summary><div>$x\ge0$, $y\ge0$, $x+y\le4$.</div></details>`},

    { h: "Real-life straight-line graphs (E2.9)", body: M`
<p class="lead">In applied graphs, the gradient is a <b>rate</b> and the area under the line can mean something too. Always check the units on each axis.</p>
${F.plot({ w: 460, h: 280, x: [0, 5.5], y: [0, 140], gridStep: [1, 20], ticks: { x: [1, 2, 3, 4, 5], y: [20, 40, 60, 80, 100, 120] }, xlabel: "time (h)", ylabel: "distance (km)",
  curves: [{ pts: [[0, 0], [2, 120], [3, 120], [5, 0]], c: "c thick" }], marks: [{ x: 2, y: 120, c: "k" }, { x: 3, y: 120, c: "k" }],
  extra: (X, Y) => F.text(X(1) - 8, Y(70), "60 km/h", "tc bold small", "end") + F.text(X(2.5), Y(120) - 8, "stopped", "tm bold small") + F.text(X(4.2) + 8, Y(70), "returning, 60 km/h", "tc bold small", "start"),
  cap: "Distance–time: the gradient is the speed. A flat section means stationary, and a line going down means returning towards the start." })}
<ul><li><b>Distance–time</b>: gradient = <b>speed</b>. Steeper means faster, and a horizontal line means stopped. A curve means changing speed (draw a tangent).</li>
<li><b>Average speed</b> = total distance ÷ total time, including stops. Above: 240 km in 5 h gives 48 km/h, not the average of 60 and 60.</li></ul>
${F.plot({ w: 460, h: 260, x: [0, 70], y: [0, 25], gridStep: [10, 5], ticks: { x: [10, 20, 30, 40, 50, 60], y: [5, 10, 15, 20] }, xlabel: "time (s)", ylabel: "speed (m/s)",
  curves: [{ pts: [[0, 0], [20, 20], [50, 20], [60, 0]], c: "o thick" }],
  extra: (X, Y) => F.poly([[X(0), Y(0)], [X(20), Y(20)], [X(50), Y(20)], [X(60), Y(0)]], "o oS", true) + F.text(X(32), Y(9), "area = distance", "to bold") + F.text(X(12), Y(14), "gradient = 1 m/s²", "tk small", "start"),
  cap: "Speed–time: the gradient is the acceleration and the <b>area under the graph is the distance travelled</b>. Here: $\\tfrac12(20)(20)+30(20)+\\tfrac12(10)(20)=900$ m." })}
<ul><li><b>Speed–time</b>: gradient = <b>acceleration</b> (negative means deceleration). Area under the graph = <b>distance</b>. Split it into triangles, rectangles and trapeziums.</li>
<li><b>Conversion graphs</b> (e.g. dollars against euros): the gradient is the exchange rate. A graph that doesn't start at the origin (e.g. a taxi fare) has a <b>fixed charge</b> equal to the $y$-intercept and a cost per unit equal to the gradient.</li></ul>
<details class="check"><summary>A taxi charges a fixed 4 dollars plus 1.50 dollars per km. Write the cost as an equation and state what the gradient and intercept mean.</summary><div>$C=1.5d+4$. Gradient 1.5 = cost per km; intercept 4 = fixed charge.</div></details>`}
  ],
  worked: [
    { q: M`Find the equation of the perpendicular bisector of $A(1,2)$ and $B(7,6)$.`,
      steps: [M`Midpoint: $\left(\tfrac{1+7}{2},\tfrac{2+6}{2}\right)=(4,4)$.`, M`Gradient of $AB=\dfrac{6-2}{7-1}=\dfrac23$. Perpendicular gradient $=-\dfrac32$.`, M`$y-4=-\tfrac32(x-4)\Rightarrow y=-\tfrac32x+10$, or $3x+2y=20$.`]},
    { q: M`Find the equation of the line through $(-2,5)$ and $(4,-7)$.`,
      steps: [M`$m=\dfrac{-7-5}{4-(-2)}=\dfrac{-12}{6}=-2$.`, M`Substitute $(-2,5)$: $5=-2(-2)+c\Rightarrow c=1$.`, M`$y=-2x+1$. Check with $(4,-7)$: $-8+1=-7$ ✓`]},
    { q: M`Show that $A(0,0)$, $B(4,2)$, $C(1,8)$ form a right-angled triangle and find its area.`,
      steps: [M`$m_{AB}=\dfrac{2}{4}=\dfrac12$ and $m_{BC}=\dfrac{8-2}{1-4}=-2$.`, M`$\tfrac12\times(-2)=-1$, so $AB\perp BC$. The right angle is at $B$.`, M`$AB=\sqrt{20}$ and $BC=\sqrt{9+36}=\sqrt{45}$. Area $=\tfrac12\sqrt{20}\sqrt{45}=\tfrac12\sqrt{900}=15$.`]},
    { q: M`Find the length and midpoint of the segment from $(-3,2)$ to $(5,-4)$.`,
      steps: [M`Change in $x$: $8$. Change in $y$: $-6$. Length $=\sqrt{64+36}=10$.`, M`Midpoint $=\left(\tfrac{-3+5}{2},\tfrac{2+(-4)}{2}\right)=(1,-1)$.`]}
  ],
  formulas: [
    ["Gradient", M`$m=\dfrac{y_2-y_1}{x_2-x_1}$`],
    ["Line", M`$y=mx+c$`],
    ["Point–gradient", M`$y-y_1=m(x-x_1)$`],
    ["Perpendicular", M`$m_1m_2=-1$`],
    ["Midpoint", M`$\left(\frac{x_1+x_2}2,\frac{y_1+y_2}2\right)$`],
    ["Length", M`$\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$`]
  ],
  cards: [
    ["Gradient through two points?", M`$\dfrac{y_2-y_1}{x_2-x_1}$`],
    ["Gradient perpendicular to $m$?", M`$-\dfrac1m$`],
    ["Gradient of a line parallel to $y=5x-2$?", "5"],
    ["What does $c$ mean in $y=mx+c$?", "The y-intercept: where the line crosses the y-axis."],
    ["Gradient on a distance–time graph?", "Speed."],
    ["Gradient on a speed–time graph?", "Acceleration."],
    ["Area under a speed–time graph?", "Distance travelled."],
    ["Line $x=3$: horizontal or vertical?", "Vertical. Its gradient is undefined."],
    ["Line $y=-2$: horizontal or vertical?", "Horizontal. Its gradient is 0."],
    ["Quickest way to draw $ax+by=c$", "Cover-up: set x = 0 for the y-intercept and y = 0 for the x-intercept."],
    ["Gradient of $3x+2y=12$", M`$-\tfrac32$ (rearrange to $y=-\tfrac32x+6$)`],
    ["Midpoint formula", "Average the x-coordinates and average the y-coordinates."],
    ["Length of a segment", "Pythagoras on the change in x and the change in y."],
    ["Perpendicular bisector passes through…", "The midpoint, with the negative reciprocal gradient."],
    ["How do you prove a right angle using coordinates?", "Show the two gradients multiply to −1."],
    ["What do the coordinates of an intersection represent?", "The solution of the simultaneous equations."],
    ["Solid or dashed boundary for $y<2x+1$?", "Dashed (the line is not included)."],
    ["How do you check which side of a line to shade?", "Test a point not on the line, usually (0,0)."],
    ["Where is the max or min of $ax+by$ over a region?", "At a vertex (corner) of the region."],
    ["Average speed formula", "Total distance ÷ total time (including stops)."],
    ["Equation of a line with gradient $m$ through $(x_1,y_1)$", M`$y-y_1=m(x-x_1)$`],
    ["Do parallel lines' simultaneous equations have a solution?", "No. Parallel lines never meet."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`The gradient of the line through $(1,3)$ and $(5,11)$ is`, opts: ["2", "0.5", "3", "−2"], ans: 0, why: M`$\dfrac{11-3}{5-1}=\dfrac84=2$.` },
    { type: "mcq", marks: 2, q: M`Which line is parallel to $2y=6x+1$?`, opts: ["$y=6x$", "$y=3x-4$", "$y=-3x$", "$y=\\tfrac13x$"], ans: 1, why: M`Divide by 2: $y=3x+0.5$, gradient 3.` },
    { type: "mcq", marks: 2, q: M`The gradient of a line perpendicular to $y=-4x+1$ is`, opts: ["4", "−4", "¼", "−¼"], ans: 2, why: M`$-\dfrac{1}{-4}=\dfrac14$. Check: $-4\times\tfrac14=-1$.` },
    { type: "mcq", marks: 1, q: M`Where does $2x+5y=10$ cross the $y$-axis?`, opts: ["(0, 2)", "(0, 5)", "(0, 10)", "(5, 0)"], ans: 0, why: M`Set $x=0$: $5y=10$, so $y=2$. (5, 0) is the $x$-intercept.` },
    { type: "mcq", marks: 2, q: M`The length of the line from $(1,1)$ to $(4,5)$ is`, opts: ["5", "7", "25", "$\\sqrt7$"], ans: 0, why: M`$\sqrt{3^2+4^2}=\sqrt{25}=5$.` },
    { type: "mcq", marks: 1, q: M`Which point lies on $y=3x-2$?`, opts: ["(1, 2)", "(2, 4)", "(0, 2)", "(−1, 1)"], ans: 1, why: M`$3(2)-2=4$ ✓` },
    { type: "mcq", marks: 1, q: M`On a speed–time graph, the area under the line represents`, opts: ["Acceleration", "Speed", "Distance travelled", "Time"], ans: 2, why: M`Area = speed × time = distance.` },
    { type: "mcq", marks: 1, q: M`The region above the line $y=x+1$, <b>including</b> the line, is`, opts: ["$y>x+1$", "$y\\ge x+1$", "$y\\le x+1$", "$y\\lt x+1$"], ans: 1, why: M`Above means $y$ is bigger, and "including" means $\ge$ with a solid line.` },
    { type: "struct", marks: 3, q: M`Find the equation of the line through $(2,5)$ that is parallel to $3x+y=4$.`,
      ms: M`<b>M1</b> rearrange: $y=-3x+4$, gradient $-3$<br><b>M1</b> $y-5=-3(x-2)$ or $5=-3(2)+c$<br><b>A1</b> $y=-3x+11$` },
    { type: "struct", marks: 6, q: M`$A$ is $(-1,4)$ and $B$ is $(3,-4)$. Find (a) the gradient of $AB$, (b) the midpoint of $AB$, (c) the length of $AB$, (d) the equation of line $AB$.`,
      ms: M`(a) <b>B1</b> $-2$<br>(b) <b>B1</b> $(1,0)$<br>(c) <b>M1</b> $\sqrt{4^2+8^2}$ <b>A1</b> $\sqrt{80}=8.94$<br>(d) <b>M1</b> $4=-2(-1)+c$ <b>A1</b> $y=-2x+2$` },
    { type: "struct", marks: 5, q: M`Find the equation of the perpendicular bisector of $P(-2,1)$ and $Q(4,5)$. Give your answer in the form $ax+by=c$.`,
      ms: M`<b>B1</b> midpoint $(1,3)$<br><b>B1</b> $m_{PQ}=\dfrac46=\dfrac23$<br><b>M1</b> perpendicular gradient $-\dfrac32$<br><b>M1</b> $y-3=-\tfrac32(x-1)$<br><b>A1</b> $3x+2y=9$` },
    { type: "struct", marks: 5, q: M`The line $L$ has equation $2x-3y=6$. (a) Find its gradient. (b) Find where $L$ crosses each axis. (c) Find the equation of the line perpendicular to $L$ through its $y$-intercept.`,
      ms: M`(a) <b>B1</b> $\tfrac23$<br>(b) <b>B1</b> $(3,0)$ <b>B1</b> $(0,-2)$<br>(c) <b>M1</b> gradient $-\tfrac32$ <b>A1</b> $y=-\tfrac32x-2$` },
    { type: "struct", marks: 4, q: M`$A(0,0)$, $B(4,2)$ and $C(1,8)$. Show that angle $ABC=90^\circ$ and find the area of triangle $ABC$.`,
      ms: M`<b>M1</b> $m_{AB}=\tfrac12$, $m_{BC}=-2$ <b>A1</b> product $=-1$, so perpendicular<br><b>M1</b> $\tfrac12\times\sqrt{20}\times\sqrt{45}$ <b>A1</b> $15$` },
    { type: "struct", marks: 2, q: M`The line through $(1,k)$ and $(4,10)$ has gradient 3. Find $k$.`,
      ms: M`<b>M1</b> $\dfrac{10-k}{4-1}=3$ <b>A1</b> $k=1$` },
    { type: "struct", marks: 3, q: M`Find the coordinates of the point where $y=3x-5$ meets $2x+y=10$.`,
      ms: M`<b>M1</b> $2x+3x-5=10$ <b>A1</b> $x=3$ <b>A1</b> $y=4$, so $(3,4)$` },
    { type: "struct", marks: 5, q: M`A region $R$ is defined by $y\ge1$, $x+y\le6$ and $y\le2x$. (a) Find the coordinates of the three vertices of $R$. (b) Find the maximum value of $x+2y$ in $R$.`,
      ms: M`(a) <b>B1</b> $(0.5,1)$ <b>B1</b> $(5,1)$ <b>B1</b> $(2,4)$<br>(b) <b>M1</b> evaluate at each vertex: $2.5,\;7,\;10$ <b>A1</b> maximum $=10$ at $(2,4)$` },
    { type: "struct", marks: 4, q: M`A car drives at constant speed from home, travelling 120 km in 2 hours. It stops for 1 hour, then returns home at constant speed, arriving 2 hours later. (a) Find its speed on each part. (b) Find its average speed for the whole journey.`,
      ms: M`(a) <b>B1</b> 60 km/h out <b>B1</b> 0 km/h stopped, 60 km/h back<br>(b) <b>M1</b> $\dfrac{240}{5}$ <b>A1</b> 48 km/h` },
    { type: "struct", marks: 4, q: M`Find the equation of the line through $(3,-1)$ perpendicular to $4x-2y=7$. Give your answer in the form $ax+by=c$.`,
      ms: M`<b>M1</b> $y=2x-3.5$, gradient 2<br><b>M1</b> perpendicular gradient $-\tfrac12$<br><b>M1</b> $y+1=-\tfrac12(x-3)$<br><b>A1</b> $x+2y=1$` }
  ]
});
}
