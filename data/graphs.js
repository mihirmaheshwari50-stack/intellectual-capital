window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
const mini = (f, lab, cap, o = {}) => F.plot(Object.assign({ w: 190, h: 190, x: [-3, 3], y: [-5, 5], grid: false, m: { l: 14, r: 14, t: 34, b: 14 }, curves: [{ f, c: "c thick" }], extra: () => F.text(95, 14, lab, "tc small bold"), cap, size: "tiny" }, o));

/* ============================================================
   GRAPHS OF FUNCTIONS & REAL-LIFE GRAPHS  (0580: E2.9 – E2.11)
   ============================================================ */
TOPICS.push({
  id: "graphs", subject: "maths", unit: 2, title: "Graphs: real-life & functions",
  blurb: "Distance–time and speed–time graphs with gradients and areas, plotting and recognising linear, quadratic, cubic, reciprocal and exponential graphs, solving equations graphically, tangents, and sketching curves.",
  level: "Core → Extended", demo: "funcGraph",
  syllabus: [
    ["E2.9", "Use and interpret graphs in practical situations including travel graphs and conversion graphs", 0],
    ["E2.9", "Draw graphs from given data", 0],
    ["E2.9", "Apply the idea of rate of change to simple kinematics involving distance–time and speed–time graphs, acceleration and deceleration", 1],
    ["E2.9", "Calculate distance travelled as area under a speed–time graph", 1],
    ["E2.10", "Construct tables of values and draw, recognise and interpret graphs of the form y = axⁿ (n = −2, −1, 0, 1, 2, 3), simple sums of these, and y = aˣ", 3],
    ["E2.10", "Solve associated equations graphically, including finding and interpreting roots by graphical methods", 5],
    ["E2.10", "Draw and interpret graphs representing exponential growth and decay problems", 4],
    ["E2.10", "Estimate gradients of curves by drawing tangents", 6],
    ["E2.11", "Recognise, sketch and interpret graphs of functions (linear, quadratic, cubic, reciprocal, exponential), including asymptotes, intercepts and turning points", 7]
  ],
  sections: [
    { h: "Distance–time graphs (E2.9)", body: M`
<p class="lead">On a <b>distance–time</b> (travel) graph, the <b>gradient</b> is the <b>speed</b>.</p>
${F.plot({ w: 520, h: 250, x: [0, 5], y: [0, 120], gridStep: [0.5, 20], ticks: { x: [1, 2, 3, 4, 5], y: [20, 40, 60, 80, 100] }, tickFmt: { x: v => v + " h" }, xlabel: "time", ylabel: "distance from home / km", curves: [{ pts: [[0, 0], [1.5, 90], [2, 90], [3, 120], [5, 0]], c: "c thick" }], extra: (X, Y) => F.text(X(0.95), Y(38), "60 km/h", "tc small bold", "start") + F.text(X(1.75), Y(90) - 8, "stopped", "tm small") + F.text(X(2.5), Y(115), "30 km/h", "tc small bold", "end") + F.text(X(4.1), Y(70), "return: 60 km/h", "to small bold", "start"), cap: "A journey: 90 km in 1.5 h, a half-hour stop, 30 km more in 1 h, then home in 2 h.", size: "small" })}
<ul><li>Steeper line → faster. Horizontal line → <b>stationary</b>. Line going down → travelling <b>back</b> towards the start.</li>
<li>Speed $=\dfrac{\text{change in distance}}{\text{change in time}}$: first stage $\dfrac{90}{1.5}=60$ km/h.</li>
<li>Average speed for the whole trip: $\dfrac{240\text{ km}}{5\text{ h}}=48$ km/h.</li>
<li>A <b>curved</b> distance–time graph means changing speed; the speed at an instant is the gradient of the <b>tangent</b>.</li></ul>`},

    { h: "Speed–time graphs (E2.9)", body: M`
<p>On a <b>speed–time</b> graph: the <b>gradient</b> is the <b>acceleration</b>, and the <b>area under the graph</b> is the <b>distance travelled</b>.</p>
<div class="viz" data-viz="speedArea"></div>
<ul><li>Negative gradient = <b>deceleration</b> (slowing down).</li><li>Horizontal line = constant speed (zero acceleration).</li>
<li>Split the area into triangles, rectangles and trapezia: trapezium area $=\tfrac12(a+b)h$.</li></ul>
<div class="callout warn"><b class="t">Don't mix them up</b>A horizontal line means "stopped" on a distance–time graph but "constant speed" on a speed–time graph. Always read the axis labels first.</div>
<div class="callout ex"><b class="t">Unknown time</b>A car accelerates uniformly from rest to 24 m/s in $T$ seconds, then travels at 24 m/s for 20 s. Total distance 630 m. Find $T$.<br>$\tfrac12\times T\times24+20\times24=630\Rightarrow 12T=150\Rightarrow T=12.5$ s.</div>
<p>Units: if speed is in m/s and time in minutes, convert first.</p>`},

    { h: "Other practical graphs (E2.9)", body: M`
<p><b>Filling containers:</b> water poured at a constant rate. A narrow part fills quickly (steep graph); a wide part slowly (shallow graph).</p>
${(() => { let s = F.path("M30,30 L30,150 L90,150 L90,30", "k") + F.path("M150,30 L130,150 L230,150 L210,30", "k") + F.text(60, 172, "cylinder", "tm small") + F.text(180, 172, "narrows upward", "tm small");
  s += F.line(280, 160, 280, 30, "k") + F.line(280, 160, 500, 160, "k") + F.text(390, 178, "time", "tm small") + F.text(276, 26, "depth", "tm small", "end");
  s += F.line(280, 160, 450, 40, "c thick") + F.path("M280,160 Q400,120 470,40", "o thick") + F.text(395, 70, "cylinder: straight", "tc small", "end") + F.text(500, 150, "narrowing: gets steeper", "to small", "end");
  return F.fig(510, 185, s, "Depth–time graphs. Constant width → straight line; narrowing → curve getting steeper.", { size: "small" }); })()}
<p>Other examples: conversion graphs (see <i>Ratio, rates & percentages</i>), mobile phone tariffs (fixed charge + cost per minute = $y=mx+c$), and exponential growth graphs.</p>`},

    { h: "Plotting graphs from a table (E2.10)", body: M`
<p>To draw $y=x^2-2x-3$ for $-2\le x\le4$:</p>
<table class="t"><tr><th>$x$</th><td>−2</td><td>−1</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>$y$</th><td>5</td><td>0</td><td>−3</td><td>−4</td><td>−3</td><td>0</td><td>5</td></tr></table>
<ul><li>Plot points accurately with small crosses.</li><li>Join with a <b>smooth curve</b> (not straight segments) through every point. For a parabola, the bottom is rounded, not pointed.</li><li>Use a sharp pencil; label the curve.</li></ul>
<div class="callout warn"><b class="t">Calculator check</b>Negative $x$ squared is positive: for $x=-2$, $x^2-2x-3=4+4-3=5$. Use the table function on your calculator and then check suspicious values.</div>`},

    { h: "Recognising graphs (E2.10, E2.11)", body: M`
<p>Learn the shape of each family:</p>
${F.row(mini(x => x, "linear y = x", "Straight line"), mini(x => x * x - 2, "quadratic", "Parabola (∪ if a > 0)"), mini(x => x ** 3 - 3 * x, "cubic", "S-shape: up to 2 turning points"))}
${F.row(mini(x => 1 / x, "reciprocal y = 1/x", "Two branches; asymptotes x = 0, y = 0", { curves: [{ f: x => 1 / x, dom: [-3, -0.2], c: "c thick" }, { f: x => 1 / x, dom: [0.2, 3], c: "c thick" }] }), mini(x => 1 / (x * x), "y = 1/x²", "Both branches above the x-axis", { curves: [{ f: x => 1 / (x * x), dom: [-3, -0.4], c: "c thick" }, { f: x => 1 / (x * x), dom: [0.4, 3], c: "c thick" }] }), mini(x => Math.pow(2, x) - 0.001, "exponential y = 2ˣ", "Through (0, 1); asymptote y = 0"))}
<table class="t"><tr><th>Equation</th><th>Shape</th><th>Key features</th></tr>
<tr><td>$y=mx+c$</td><td>straight line</td><td>gradient $m$, intercept $c$</td></tr>
<tr><td>$y=ax^2+bx+c$</td><td>parabola</td><td>∪ if $a\gt0$, ∩ if $a\lt0$; one turning point; line of symmetry</td></tr>
<tr><td>$y=ax^3+\ldots$</td><td>cubic</td><td>rises to the right if $a\gt0$; 0 or 2 turning points</td></tr>
<tr><td>$y=\dfrac ax$</td><td>hyperbola</td><td>asymptotes $x=0$ and $y=0$; not defined at $x=0$</td></tr>
<tr><td>$y=\dfrac{a}{x^2}$</td><td>two branches, same side</td><td>asymptotes $x=0$, $y=0$</td></tr>
<tr><td>$y=a^x$</td><td>exponential</td><td>passes through $(0,1)$; $y\gt0$; asymptote $y=0$</td></tr></table>
<p>An <b>asymptote</b> is a line the graph gets closer and closer to but never reaches.</p>`},

    { h: "Solving equations graphically (E2.10)", body: M`
<p>The solutions of $f(x)=0$ are the $x$-coordinates where $y=f(x)$ crosses the <b>x-axis</b>. The solutions of $f(x)=g(x)$ are where the two graphs <b>intersect</b>.</p>
<div class="callout key"><b class="t">Which line to draw?</b>Rearrange the equation so one side is the curve you already have. Whatever is left is the line to draw.<br>Graph drawn: $y=x^2-2x-3$. To solve $x^2-3x-1=0$, rewrite it as $x^2-2x-3=x-2$ (subtracting $x-2$ from both sides gives back $x^2-3x-1=0$ ✓). So draw the line $y=x-2$ and read off the $x$-values where it meets the curve.</div>
${F.plot({ w: 460, h: 280, x: [-2, 5], y: [-5, 7], gridStep: [1, 1], ticks: { x: [-1, 1, 2, 3, 4], y: [-4, -2, 2, 4, 6] }, curves: [{ f: x => x * x - 2 * x - 3, dom: [-2, 4.5], c: "c thick", label: "y = x² − 2x − 3", lpos: [3.5, 5.2], ldx: -10, la: "end" }, { f: x => x - 2, c: "r thick", label: "y = x − 2", lpos: [4.6, 2.6], la: "end", ldy: 18 }], marks: [{ x: (3 - Math.sqrt(13)) / 2, y: (3 - Math.sqrt(13)) / 2 - 2, c: "r", label: "x ≈ −0.3", pos: "sw" }, { x: (3 + Math.sqrt(13)) / 2, y: (3 + Math.sqrt(13)) / 2 - 2, c: "r", label: "x ≈ 3.3", pos: "nw" }], cap: "x² − 3x − 1 = 0 has solutions x ≈ −0.3 and x ≈ 3.3.", size: "small" })}
<p>Use the <b>function grapher lab</b> at the bottom of the page: change the curve and the line and watch the solutions move.</p>
<details class="check"><summary>The graph of $y=x^3-4x$ is drawn. What line should be drawn to solve $x^3-6x+2=0$?</summary><div>$x^3-4x=2x-2$, so draw $y=2x-2$.</div></details>`},

    { h: "Gradients of curves: tangents (E2.10)", body: M`
<p>The gradient of a curve changes from point to point. At a given point it equals the gradient of the <b>tangent</b>: the straight line that just touches the curve there.</p>
<div class="viz" data-viz="tangentGradient"></div>
<ol class="steps"><li>Draw the tangent carefully with a ruler (it should not cut the curve near the point).</li><li>Make a large right-angled triangle on the tangent.</li><li>Gradient $=\dfrac{\text{rise}}{\text{run}}$ (negative if the tangent slopes down).</li></ol>
<p>On a distance–time graph, the tangent gradient gives the <b>speed</b> at that instant; on a speed–time graph, the <b>acceleration</b>. At a turning point, the gradient is 0. Exact gradients come from <i>Differentiation</i>.</p>`},

    { h: "Sketching curves (E2.11)", body: M`
<p>A <b>sketch</b> shows the shape and key features, not an accurate plot. Label:</p>
<ul><li>where it crosses the axes (intercepts);</li><li>turning points (if known);</li><li>asymptotes (dashed lines).</li></ul>
<div class="callout ex"><b class="t">Cubic in factorised form</b>$y=(x+2)(x-1)(x-3)$: crosses the $x$-axis at $-2, 1, 3$; $y$-intercept $(2)(-1)(-3)=6$; positive $x^3$ coefficient, so it comes up from bottom-left and leaves at top-right.</div>
${F.plot({ w: 420, h: 250, x: [-3, 4], y: [-8, 10], gridStep: [1, 2], ticks: { x: [], y: [-6, 6] }, curves: [{ f: x => (x + 2) * (x - 1) * (x - 3), dom: [-2.6, 3.7], c: "c thick" }], marks: [{ x: -2, y: 0, c: "r", label: "−2", pos: "nw" }, { x: 1, y: 0, c: "r", label: "1", pos: "ne" }, { x: 3, y: 0, c: "r", label: "3", pos: "nw" }, { x: 0, y: 6, c: "o", label: "(0, 6)", pos: "ne" }], cap: "y = (x + 2)(x − 1)(x − 3).", size: "small" })}
<p>A repeated factor such as $(x-1)^2$ means the curve <b>touches</b> the axis at $x=1$ (a turning point) instead of crossing it.</p>`}
  ],
  worked: [
    { q: M`A cyclist accelerates from 4 m/s to 10 m/s in 12 s. Find (a) the acceleration, (b) the distance travelled in that time.`,
      steps: [M`(a) $\dfrac{10-4}{12}=0.5$ m/s².`, M`(b) Area of trapezium $=\tfrac12(4+10)\times12=84$ m.`]},
    { q: M`Complete the table for $y=\dfrac{6}{x}$ at $x=1, 2, 3, 6$ and state the equations of the asymptotes.`,
      steps: [M`$y=6, 3, 2, 1$.`, M`Asymptotes: $x=0$ and $y=0$.`]},
    { q: M`The graph of $y=2^x$ is drawn. Use it to solve $2^x=5$.`,
      steps: [M`Draw the horizontal line $y=5$.`, M`It meets the curve at $x\approx2.3$ (exactly $\log_2 5=2.32$).`]}
  ],
  formulas: [["Distance–time gradient", "speed"], ["Speed–time gradient", "acceleration"], ["Area under speed–time", "distance"], ["Trapezium area", M`$\tfrac12(a+b)h$`], ["Solving f(x) = g(x)", "x-coordinates of intersections"]],
  cards: [
    ["Gradient of a distance–time graph", "Speed"],
    ["Gradient of a speed–time graph", "Acceleration"],
    ["Area under a speed–time graph", "Distance travelled"],
    ["Horizontal line on distance–time", "Stationary"],
    ["Horizontal line on speed–time", "Constant speed"],
    ["Shape of y = x³", "S-shaped cubic"],
    ["Asymptotes of y = 1/x", "x = 0 and y = 0"],
    ["y = 2ˣ passes through", "(0, 1)"],
    ["Solve f(x) = 0 graphically", "Read the x-intercepts."],
    ["Graph y = x² drawn; solve x² − x − 2 = 0", "Draw y = x + 2."],
    ["Gradient at a point on a curve", "Draw the tangent; rise ÷ run."],
    ["Repeated root (x − a)²", "Curve touches the x-axis at a."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`On a speed–time graph, a straight line from (0, 0) to (5, 20) shows an acceleration of`, opts: ["100 m/s²", "4 m/s²", "0.25 m/s²", "20 m/s²"], ans: 1, why: M`$20\div5$.` },
    { type: "mcq", marks: 1, q: M`Which graph has asymptotes $x=0$ and $y=0$?`, opts: ["$y=x^2$", "$y=2^x$", "$y=\tfrac3x$", "$y=x^3$"], ans: 2, why: M`Reciprocal.` },
    { type: "mcq", marks: 1, q: M`The graph of $y=x^2+x$ is drawn. To solve $x^2-x-3=0$ you should draw`, opts: ["$y=2x+3$", "$y=3$", "$y=x+3$", "$y=-2x-3$"], ans: 0, why: M`$x^2+x=2x+3$.` },
    { type: "struct", marks: 2, q: M`A train travels at 30 m/s for 40 s, then decelerates uniformly to rest in 20 s. Find the total distance.`, ms: M`<b>M1</b> $30\times40+\tfrac12\times20\times30$<br><b>A1</b> 1500 m` },
    { type: "struct", marks: 2, q: M`Complete the table for $y=x^3-3x$ when $x=-2, -1, 0, 1, 2$.`, ms: M`<b>B2</b> −2, 2, 0, −2, 2 (B1 for 3 correct)` },
    { type: "struct", marks: 3, q: M`Sketch $y=(x-2)(x+1)$, showing the intercepts and the minimum point.`, ms: M`<b>B1</b> ∪ shape crossing at −1 and 2<br><b>B1</b> $y$-intercept −2<br><b>B1</b> minimum at $(0.5, -2.25)$` },
    { type: "struct", marks: 2, q: M`A walker leaves at 09:00, walks 12 km in 3 hours, rests for 1 hour, and returns home at 6 km/h. At what time does he arrive home?`, ms: M`<b>M1</b> return takes 2 h<br><b>A1</b> 15:00` },
    { type: "struct", marks: 3, q: M`Describe the key features of the graph of $y=3^x$.`, ms: M`<b>B1</b> passes through (0, 1)<br><b>B1</b> always positive / increasing<br><b>B1</b> asymptote $y=0$ as $x\to-\infty$` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`On a distance–time graph, what does a horizontal line represent?`, ms: M`<b>B1</b> stationary / not moving` },
    { d: 1, type: "struct", marks: 2, q: M`A car travels 150 km in 2 hours 30 minutes. Find its average speed.`, ms: M`<b>M1</b> $150\div2.5$<br><b>A1</b> 60 km/h` },
    { d: 1, type: "mcq", marks: 1, q: M`The graph of $y=x^2-4$ crosses the $x$-axis at`, opts: ["$x=4$ only", "$x=\pm2$", "$x=-4$", "$x=\pm4$"], ans: 1, why: M`$x^2=4$.` },
    { d: 2, type: "struct", marks: 3, q: M`A particle starts from rest, accelerates at 2 m/s² for 6 s, then travels at constant speed for 10 s. Sketch the speed–time graph and find the total distance.`, ms: M`<b>B1</b> graph from (0, 0) to (6, 12) then horizontal to (16, 12)<br><b>M1</b> $\tfrac12\times6\times12+10\times12$<br><b>A1</b> 156 m` },
    { d: 2, type: "struct", marks: 2, q: M`The graph of $y=x^2-3x$ has been drawn. Which straight line should be drawn to solve $x^2-5x+2=0$?`, ms: M`<b>M1</b> $x^2-3x=2x-2$<br><b>A1</b> $y=2x-2$` },
    { d: 2, type: "struct", marks: 3, q: M`Write down the equations of the asymptotes of $y=\dfrac{2}{x}+3$ and sketch the graph.`, ms: M`<b>B1</b> $x=0$<br><b>B1</b> $y=3$<br><b>B1</b> two branches in correct positions` },
    { d: 2, type: "struct", marks: 2, q: M`Sketch $y=x(x-4)^2$ and state where it meets the $x$-axis.`, ms: M`<b>B1</b> crosses at 0, touches at 4<br><b>B1</b> correct cubic shape rising to the right` },
    { d: 3, type: "struct", marks: 4, q: M`A car travels at 20 m/s, then decelerates uniformly for $t$ seconds until it stops. The distance covered while decelerating is 80 m. Find $t$ and the deceleration.`, ms: M`<b>M1</b> $\tfrac12\times t\times20=80$<br><b>A1</b> $t=8$ s<br><b>M1</b> $20\div8$<br><b>A1</b> 2.5 m/s²` },
    { d: 3, type: "struct", marks: 4, q: M`The curve $y=x^3-4x^2+3$ is drawn. (a) Find the line to draw to solve $x^3-4x^2-2x+5=0$. (b) Explain how many solutions to expect if the line crosses the curve three times.`, ms: M`<b>M1</b> $x^3-4x^2+3=2x-2$<br><b>A1</b> $y=2x-2$<br><b>B1</b> three intersections<br><b>B1</b> so three real solutions (the $x$-coordinates)` },
    { d: 3, type: "struct", marks: 3, q: M`Estimate the gradient of $y=x^2$ at $x=3$ by drawing a tangent, and explain the meaning if $y$ is distance (m) and $x$ is time (s).`, ms: M`<b>B1</b> tangent drawn<br><b>B1</b> gradient ≈ 6<br><b>B1</b> speed at 3 s ≈ 6 m/s` }
  ]
});
}
