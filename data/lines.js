window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;

/* ============================================================
   STRAIGHT-LINE GRAPHS  (0580: E3.1–E3.7, E2.6 regions, E2.9)
   ============================================================ */
TOPICS.push({
  id: "lines", subject: "maths", title: "Straight-line graphs",
  blurb: "Gradient, y = mx + c, parallel and perpendicular lines, midpoint, length, regions and real-life graphs.",
  level: "Core → Extended", demo: "line",
  syllabus: [
    ["E3.1", "Use and interpret Cartesian coordinates in two dimensions", 0],
    ["E3.2", "Draw straight-line graphs from a table of values or an equation, including $ax+by=c$", 0],
    ["E3.3", "Calculate the gradient of a straight line from a graph or from two points", 1],
    ["E3.4", "Calculate the length and the midpoint of a line segment", 4],
    ["E3.5", "Interpret and obtain the equation of a straight line in the form $y=mx+c$", 2],
    ["E3.6", "Find the gradient and equation of a line parallel to a given line", 3],
    ["E3.7", "Find the gradient and equation of a perpendicular line, including the perpendicular bisector", 3],
    ["E2.5", "Solve simultaneous linear equations graphically (intersection of two lines)", 5],
    ["E2.6", "Represent linear inequalities graphically and identify regions", 6],
    ["E2.9", "Interpret distance–time and speed–time graphs and other real-life linear graphs", 7]
  ],
  sections: [
    { h: "Coordinates and drawing lines", body: M`
<p>A point $(x,y)$ is $x$ across and $y$ up. Every point on a line satisfies the line's equation, so to test whether $(2,4)$ lies on $y=3x-2$, substitute: $3(2)-2=4$. Yes, it does.</p>
<h3>Three ways to draw a line</h3>
<ul><li><b>Table of values:</b> choose three $x$-values (three, so one can catch a mistake), work out $y$, plot, join with a ruler across the whole grid.</li>
<li><b>Gradient–intercept:</b> for $y=mx+c$, plot $(0,c)$, then step "1 across, $m$ up" repeatedly.</li>
<li><b>Cover-up (intercepts):</b> best for $ax+by=c$. Put $x=0$ to find the $y$-intercept and $y=0$ to find the $x$-intercept. For $3x+2y=12$: $(0,6)$ and $(4,0)$.</li></ul>
<p>Lines $x=k$ are <b>vertical</b> and lines $y=k$ are <b>horizontal</b>. Students often swap them: $x=3$ is every point whose $x$ is 3, which forms a vertical line.</p>`},
    { h: "Gradient: rate of change", body: M`
<p>Gradient measures steepness: how much $y$ changes for each 1 unit increase in $x$.</p>
$$m=\frac{y_2-y_1}{x_2-x_1}=\frac{\text{change in }y}{\text{change in }x}$$
<p>Positive gradient: the line rises left to right. Negative: it falls. Zero: horizontal. A vertical line has an undefined gradient.</p>
<p><b>From a graph:</b> pick two points where the line crosses grid intersections exactly, as far apart as possible, and draw the triangle. Read the scales on each axis: they are often different, and counting squares gives the wrong answer.</p>
<div class="callout warn"><b class="t">Common mistakes</b>Putting $x$ on top. Subtracting in different orders on top and bottom: if you do $y_2-y_1$ you must do $x_2-x_1$. Losing a minus sign when coordinates are negative. Use brackets: $\dfrac{-7-5}{4-(-2)}=\dfrac{-12}{6}=-2$.</div>`},
    { h: "The equation of a line", body: M`
<p>In $y=mx+c$, $m$ is the gradient and $c$ is the $y$-intercept. Read them directly only when $y$ is the subject on its own.</p>
<p>Lines in other forms must be rearranged: $3x+2y=12\Rightarrow2y=-3x+12\Rightarrow y=-\tfrac32x+6$. The gradient is $-\tfrac32$. A common trap is reading the gradient as 3.</p>
<h3>Finding the equation</h3>
<p><b>Given the gradient and a point</b> $(x_1,y_1)$: use $y-y_1=m(x-x_1)$, or substitute into $y=mx+c$ to find $c$.</p>
<p><b>Given two points</b>: find $m$ first, then use either point. For $(-2,5)$ and $(4,-7)$: $m=\dfrac{-12}{6}=-2$, then $5=-2(-2)+c\Rightarrow c=1$, giving $y=-2x+1$. Check with the other point: $-2(4)+1=-7$ ✓.</p>
<p>If asked for the form $ax+by=c$ (or $ax+by+c=0$) with integers, multiply out the fractions at the end.</p>`},
    { h: "Parallel and perpendicular lines", body: M`
<div class="callout key"><b class="t">The two rules</b><b>Parallel</b> lines have <b>equal gradients</b>. <b>Perpendicular</b> lines have gradients whose <b>product is $-1$</b>: $m_1m_2=-1$, so $m_2=-\dfrac{1}{m_1}$. To get the perpendicular gradient, flip the fraction and change the sign: $\tfrac23\to-\tfrac32$, and $-4\to\tfrac14$.</div>
<p>Why does the perpendicular rule work? Rotating a line by 90° turns "run 1, rise $m$" into "run $-m$, rise 1", so the new gradient is $\dfrac{1}{-m}$. Watch:</p>
<div class="viz" data-viz="perp"></div>
<p><b>Proving a right angle:</b> show the gradients of two sides multiply to $-1$. <b>Proving a parallelogram:</b> show opposite sides have equal gradients.</p>`},
    { h: "Length, midpoint and perpendicular bisector", body: M`
<p><b>Midpoint</b> of $(x_1,y_1)$ and $(x_2,y_2)$: average each coordinate, $\left(\dfrac{x_1+x_2}{2},\dfrac{y_1+y_2}{2}\right)$.</p>
<p><b>Length</b> is Pythagoras on the change in $x$ and the change in $y$: $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$. Squaring removes the negatives, so the order doesn't matter here.</p>
<p>The <b>perpendicular bisector</b> of $AB$ is the line that cuts $AB$ in half at right angles. It passes through the <b>midpoint</b> with gradient $-1/m_{AB}$. Every point on it is the same distance from $A$ and $B$. This combines everything on this page and is a classic 4–5 mark question.</p>`},
    { h: "Intersections = simultaneous equations", body: M`
<p>The point where two lines cross satisfies both equations, so it <b>is</b> the solution of the simultaneous equations. Graphically, draw both lines and read the crossing point. Algebraically, substitute or eliminate.</p>
<p>$y=2x-1$ and $x+y=8$: substitute to get $x+2x-1=8\Rightarrow x=3$, $y=5$. The lines cross at $(3,5)$.</p>
<p>Parallel lines never meet, so their simultaneous equations have <b>no solution</b>.</p>`},
    { h: "Regions and inequalities", body: M`
<p>A line divides the plane into two regions. An inequality like $y\ge2x$ describes one side.</p>
<ol><li>Draw the boundary line: <b>solid</b> for $\le$ or $\ge$ (included), <b>dashed</b> for $<$ or $>$ (not included).</li>
<li>Test a point not on the line (the origin is easiest unless the line passes through it): if it satisfies the inequality, that side is the region.</li>
<li>Follow the question's instruction: either shade the wanted region or shade the <b>unwanted</b> regions. Cambridge questions say which. Read carefully.</li></ol>
<p>"$y>\ldots$" is above the line and "$y<\ldots$" is below, but only when $y$ is the subject with a positive coefficient. With $x+y\le6$, test $(0,0)$: $0\le6$ is true, so the origin's side is the region.</p>
<p>In optimisation questions, the maximum or minimum of an expression like $x+2y$ over a region occurs at a <b>vertex</b> (corner) of the region. Find the corners by solving pairs of boundary equations.</p>`},
    { h: "Real-life straight-line graphs", body: M`
<p>In applied graphs the gradient is a <b>rate</b> and has units of $\dfrac{y\text{ units}}{x\text{ units}}$:</p>
<ul><li><b>Distance–time:</b> gradient = speed. A horizontal section means stationary. A steeper section means faster. A line going back down means returning to the start.</li>
<li><b>Speed–time:</b> gradient = acceleration (negative gradient = deceleration), and the <b>area under the graph = distance travelled</b>.</li>
<li><b>Conversion graphs</b> (e.g. currency): gradient = exchange rate. The $y$-intercept is a fixed charge (e.g. a call-out fee).</li></ul>
<p>Average speed = <b>total</b> distance ÷ <b>total</b> time, including any stops. It is not the average of the speeds.</p>`}
  ],
  worked: [
    { q: M`Find the equation of the perpendicular bisector of $A(1,2)$ and $B(7,6)$.`,
      steps: [
        M`Midpoint: $\left(\tfrac{1+7}{2},\tfrac{2+6}{2}\right)=(4,4)$.`,
        M`Gradient of $AB=\dfrac{6-2}{7-1}=\dfrac23$. Perpendicular gradient $=-\dfrac32$.`,
        M`$y-4=-\tfrac32(x-4)\Rightarrow y=-\tfrac32x+10$, or $3x+2y=20$.`
      ]},
    { q: M`Find the equation of the line through $(-2,5)$ and $(4,-7)$.`,
      steps: [
        M`$m=\dfrac{-7-5}{4-(-2)}=\dfrac{-12}{6}=-2$.`,
        M`Substitute $(-2,5)$: $5=-2(-2)+c\Rightarrow c=1$.`,
        M`$y=-2x+1$. Check with $(4,-7)$: $-8+1=-7$ ✓`
      ]},
    { q: M`Show that $A(0,0)$, $B(4,2)$, $C(1,8)$ form a right-angled triangle and find its area.`,
      steps: [
        M`$m_{AB}=\dfrac{2}{4}=\dfrac12$ and $m_{BC}=\dfrac{8-2}{1-4}=-2$.`,
        M`$\tfrac12\times(-2)=-1$, so $AB\perp BC$. The right angle is at $B$.`,
        M`$AB=\sqrt{20}$ and $BC=\sqrt{9+36}=\sqrt{45}$. Area $=\tfrac12\sqrt{20}\sqrt{45}=\tfrac12\sqrt{900}=15$.`
      ]},
    { q: M`Find the length and midpoint of the segment from $(-3,2)$ to $(5,-4)$.`,
      steps: [
        M`Change in $x$: $8$. Change in $y$: $-6$. Length $=\sqrt{64+36}=10$.`,
        M`Midpoint $=\left(\tfrac{-3+5}{2},\tfrac{2+(-4)}{2}\right)=(1,-1)$.`
      ]}
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
