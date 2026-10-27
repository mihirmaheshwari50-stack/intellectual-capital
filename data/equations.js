window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
const nline = (lo, hi, a, aInc, b, bInc, cap) => { const X = v => 30 + (v - lo) / (hi - lo) * 420; let s = F.line(20, 60, 460, 60, "k");
  for (let v = lo; v <= hi; v++) s += F.line(X(v), 54, X(v), 66, "k") + F.text(X(v), 84, String(v), "tm small");
  const L = a === null ? 20 : X(a), R = b === null ? 460 : X(b); s += F.line(L, 40, R, 40, "c thick");
  if (a !== null) s += F.circ(X(a), 40, 6, aInc ? "c cF" : "c bgF"); else s += F.arrow(40, 40, 20, 40, "c", 8);
  if (b !== null) s += F.circ(X(b), 40, 6, bInc ? "c cF" : "c bgF"); else s += F.arrow(440, 40, 460, 40, "c", 8);
  return F.fig(480, 95, s, cap, { size: "small" }); };

/* ============================================================
   EQUATIONS & INEQUALITIES  (0580: E2.5, E2.6)
   ============================================================ */
TOPICS.push({
  id: "equations", subject: "maths", unit: 2, title: "Equations & inequalities",
  blurb: "Linear equations of every kind, forming equations from words and diagrams, simultaneous equations by elimination, substitution and graphs, linear and quadratic inequalities, and inequalities in two variables.",
  level: "Core → Extended", demo: "simul",
  syllabus: [
    ["E2.5", "Construct expressions, equations and formulae", 3],
    ["E2.5", "Solve linear equations in one unknown, including with brackets, fractions and the unknown on both sides", 1],
    ["E2.5", "Solve simultaneous linear equations in two unknowns", 4],
    ["E2.5", "Solve simultaneous equations involving one linear and one non-linear equation (see Quadratics)", 6],
    ["E2.6", "Represent and interpret inequalities, including on a number line", 7],
    ["E2.6", "Construct, solve and interpret linear inequalities", 8],
    ["E2.6", "Solve quadratic inequalities", 9],
    ["E2.6", "Represent and interpret linear inequalities in two variables graphically; list inequalities that define a region", 10]
  ],
  sections: [
    { h: "The idea of solving (E2.5)", body: M`
<p class="lead">An equation is a balance: both sides are equal. To find the unknown, do the <b>same</b> operation to both sides until the letter is alone.</p>
<div class="viz" data-viz="balance"></div>
<p>Undo operations in <b>reverse order</b>. For $3x+5=20$, $x$ was multiplied by 3 then had 5 added; so subtract 5, then divide by 3.</p>`},

    { h: "Linear equations: all the types (E2.5)", body: M`
<p><b>Unknown on both sides:</b> collect $x$ terms on the side with the larger coefficient.</p>
$$7x-4=3x+12\Rightarrow 4x=16\Rightarrow x=4$$
<p><b>Brackets:</b> expand first.</p>
$$5(2x-3)-2(x+1)=11\Rightarrow 10x-15-2x-2=11\Rightarrow 8x=28\Rightarrow x=3.5$$
<p><b>Fractions:</b> multiply <b>every term</b> by the lowest common denominator.</p>
$$\frac{x+1}{3}-\frac{x-2}{4}=2\;\xrightarrow{\times12}\;4(x+1)-3(x-2)=24\Rightarrow x+10=24\Rightarrow x=14$$
<p><b>Unknown in the denominator:</b></p>
$$\frac{12}{x-1}=4\Rightarrow 12=4(x-1)\Rightarrow x=4\qquad \frac{3}{x}+\frac{1}{2x}=7\;\xrightarrow{\times2x}\;6+1=14x\Rightarrow x=\tfrac12$$
<div class="callout warn"><b class="t">Sign errors</b>Subtracting a bracket changes every sign inside: $-3(x-2)=-3x+6$. Most lost marks in linear equations come from this line.</div>
<details class="check"><summary>Solve $\dfrac{2x-1}{5}=\dfrac{x+4}{3}$.</summary><div>Cross-multiply: $3(2x-1)=5(x+4)\Rightarrow 6x-3=5x+20\Rightarrow x=23$.</div></details>`},

    { h: "Checking and interpreting solutions (E2.5)", body: M`
<p>Always substitute your answer back into the <b>original</b> equation. For $\dfrac{x+1}{3}-\dfrac{x-2}{4}=2$ with $x=14$: $5-3=2$ ✓.</p>
<p>In context, ask whether the answer makes sense: a length cannot be negative; a number of people must be a whole number.</p>`},

    { h: "Forming equations (E2.5)", body: M`
<p>Many exam questions give words or a diagram. Introduce a letter, write expressions for the quantities, then use a fact to make an equation.</p>
${(() => { let s = F.poly([[40, 170], [300, 170], [130, 30]], "k cS", true) + F.text(75, 162, "2x + 10°", "tk small", "start") + F.text(255, 160, "x + 20°", "tk small", "end") + F.text(140, 80, "3x − 30°", "tk small");
  return F.fig(340, 190, s, "Angles in a triangle: (2x + 10) + (x + 20) + (3x − 30) = 180, so 6x = 180 and x = 30.", { size: "small" }); })()}
<ul><li><b>Ages:</b> "Ann is 3 times as old as Ben. In 5 years she will be twice as old." $3b+5=2(b+5)\Rightarrow b=5$.</li>
<li><b>Perimeter:</b> a rectangle has length $(2x+3)$ and width $(x-1)$; its perimeter is 34: $2(2x+3)+2(x-1)=34\Rightarrow 6x+4=34\Rightarrow x=5$.</li>
<li><b>Consecutive numbers:</b> three consecutive integers add to 81: $n+(n+1)+(n+2)=81\Rightarrow n=26$.</li>
<li><b>Money:</b> pens cost $p$ cents and pencils $(p-15)$ cents; 4 pens and 6 pencils cost 410 cents: $4p+6(p-15)=410\Rightarrow p=50$.</li></ul>
<div class="callout key"><b class="t">Show the equation</b>"Form an equation and solve it" means the equation itself earns a mark. Write it in full before simplifying.</div>`},

    { h: "Simultaneous equations by elimination (E2.5)", body: M`
<p>Two equations, two unknowns. Make the coefficients of one letter the <b>same size</b>, then add or subtract to eliminate it.</p>
<div class="callout key"><b class="t">Same Signs Subtract</b>If the matching coefficients have the same sign, subtract the equations; if different signs, add them.</div>
$$\begin{aligned}3x+2y&=16 \quad&(1)\\ 5x-3y&=14 \quad&(2)\\ (1)\times3:\ 9x+6y&=48\\ (2)\times2:\ 10x-6y&=28\\ \text{add:}\ 19x&=76\ \Rightarrow\ x=4\\ \text{in }(1):\ 12+2y&=16\ \Rightarrow\ y=2\end{aligned}$$
<p>Check in (2): $20-6=14$ ✓. Always substitute into the <b>other</b> equation to check.</p>`},

    { h: "Substitution and graphical solutions (E2.5)", body: M`
<p><b>Substitution</b> works well when one equation already gives a letter on its own: $y=2x-1$ and $3x+2y=19$: $3x+2(2x-1)=19\Rightarrow 7x=21\Rightarrow x=3$, $y=5$.</p>
<p><b>Graphically</b>, each linear equation is a straight line; the solution is the <b>point of intersection</b>. Parallel lines (same gradient) never meet: no solution. Explore with the <b>simultaneous equations lab</b> at the bottom of the page.</p>
${F.plot({ w: 420, h: 260, x: [-1, 6], y: [-2, 8], gridStep: [1, 1], ticks: { x: [1, 2, 3, 4, 5], y: [2, 4, 6] }, curves: [{ f: x => 2 * x - 1, c: "c thick", label: "y = 2x − 1", lpos: [3.6, 6.2], ldx: 10 }, { f: x => (19 - 3 * x) / 2, c: "o thick", label: "3x + 2y = 19", lpos: [4.4, 2.9], ldx: 0, la: "end", ldy: 22 }], marks: [{ x: 3, y: 5, c: "r", label: "(3, 5)", pos: "ne" }], cap: "The solution is where the lines cross.", size: "small" })}
<h3>Word problems</h3>
<div class="callout ex"><b class="t">Example</b>2 adult tickets and 3 child tickets cost \$43; 1 adult and 4 child tickets cost \$34. Let $a$, $c$ be the prices: $2a+3c=43$, $a+4c=34$. Double the second: $2a+8c=68$; subtract: $5c=25$, $c=5$, $a=14$.</div>
<p>Simultaneous equations where one is quadratic (e.g. a line and a circle or parabola) are in <i>Quadratics</i>.</p>`},

    { h: "Linear inequalities (E2.6)", body: M`
<p>Solve like equations, with one extra rule:</p>
<div class="callout warn"><b class="t">The one rule</b>When you <b>multiply or divide by a negative number</b>, reverse the inequality sign. $-2x\gt6\Rightarrow x\lt-3$.</div>
<ul><li>$4x-7\le9\Rightarrow 4x\le16\Rightarrow x\le4$</li>
<li>$5-3x\gt17\Rightarrow -3x\gt12\Rightarrow x\lt-4$ (or add $3x$ to both sides to avoid dividing by a negative)</li>
<li><b>Double inequality:</b> $-3\lt2x+1\le9\Rightarrow -4\lt2x\le8\Rightarrow -2\lt x\le4$</li></ul>
${nline(-4, 6, -2, false, 4, true, "−2 < x ≤ 4: open circle at −2 (not included), filled circle at 4 (included).")}
<p><b>Integer solutions:</b> list the integers that satisfy it: $-1, 0, 1, 2, 3, 4$.</p>
${nline(-6, 4, null, false, -4, false, "x < −4: an arrow shows the set continues.")}
<details class="check"><summary>Find the largest integer $n$ such that $3(n-2)\lt2n+5$.</summary><div>$3n-6\lt2n+5\Rightarrow n\lt11$. Largest integer: 10.</div></details>`},

    { h: "Quadratic inequalities (E2.6)", body: M`
<p>Solve the related <b>equation</b> to find the critical values, then use a <b>sketch</b> of the parabola to decide which region you need.</p>
${F.plot({ w: 420, h: 230, x: [-4, 5], y: [-8, 8], gridStep: [1, 2], ticks: { x: [-3, -2, -1, 1, 2, 3, 4], y: [-6, -4, 4, 6] }, curves: [{ f: x => x * x - x - 6, c: "c thick", label: "y = x² − x − 6", lpos: [-2.9, 6], ldx: 12 }], extra: (X, Y) => F.line(X(-2), Y(0), X(3), Y(0), "r thick") + F.text(X(0.5), Y(0) - 8, "below axis: < 0", "tr small bold"), marks: [{ x: -2, y: 0, c: "r" }, { x: 3, y: 0, c: "r" }], cap: "x² − x − 6 < 0 between the roots −2 and 3.", size: "small" })}
<ul><li>$x^2-x-6\lt0$: $(x-3)(x+2)\lt0$, roots $-2$ and $3$; the curve is <b>below</b> the axis between them: $-2\lt x\lt3$.</li>
<li>$x^2-x-6\ge0$: <b>outside</b> the roots: $x\le-2$ or $x\ge3$ (two separate inequalities).</li>
<li>$x^2\gt16$: $x\lt-4$ or $x\gt4$ — <b>not</b> just $x\gt\pm4$.</li></ul>`},

    { h: "Inequalities in two variables: regions (E2.6)", body: M`
<p>An inequality like $y\lt2x+1$ describes a <b>region</b> of the graph on one side of the line $y=2x+1$.</p>
<ul><li>Draw the boundary: <b>solid</b> for ≤ or ≥ (included), <b>broken</b> for < or > (not included).</li>
<li>Test a point not on the line (often $(0,0)$) to decide which side.</li>
<li>The convention in IGCSE is usually to <b>shade the unwanted region</b>, leaving the required region clear — read the question.</li></ul>
${F.plot({ w: 420, h: 280, x: [-1, 7], y: [-1, 7], gridStep: [1, 1], ticks: { x: [1, 2, 3, 4, 5, 6], y: [1, 2, 3, 4, 5, 6] }, curves: [{ f: x => 6 - x, c: "c thick", label: "x + y = 6", lpos: [5, 1], ldx: 18, ldy: 22 }, { f: x => x / 2, c: "o thick", label: "y = ½x", lpos: [6.2, 3.1], ldx: 0, ldy: 20, la: "end" }], extra: (X, Y) => F.line(X(1), Y(-1), X(1), Y(7), "b thick d") + F.text(X(1) + 4, Y(6.6), "x = 1", "tb small bold", "start") + `<polygon points="${X(1)},${Y(0.5)} ${X(4)},${Y(2)} ${X(1)},${Y(5)}" class="cS nostroke" style="opacity:.6"/>`, cap: "The triangle satisfies x > 1, y ≥ ½x and x + y ≤ 6.", size: "small" })}
<p><b>Finding the inequalities for a region:</b> find the equation of each boundary line, then pick a point inside the region to decide the direction of each sign.</p>
<p><b>Optimisation (linear programming):</b> to maximise something like $P=3x+2y$ over the region, check the <b>vertices</b> (corners) of the region or slide the line $3x+2y=k$ across it. Here the corners are $(1, 0.5)$, $(4, 2)$, $(1, 5)$: $P=4, 16, 13$, so the maximum is 16 at $(4,2)$. For integer solutions, check the integer points near the best corner.</p>
<p>See also <i>Straight-line graphs</i> for more on drawing lines.</p>`}
  ],
  worked: [
    { q: M`Solve $\dfrac{3x-2}{4}-\dfrac{x+1}{6}=1$.`,
      steps: [M`Multiply by 12: $3(3x-2)-2(x+1)=12$.`, M`$9x-6-2x-2=12\Rightarrow 7x=20$.`, M`$x=\tfrac{20}{7}=2\tfrac67$.`]},
    { q: M`Solve simultaneously $4x+3y=-1$ and $3x-2y=12$.`,
      steps: [M`Make the $y$ coefficients match: $(1)\times2$: $8x+6y=-2$; $(2)\times3$: $9x-6y=36$.`, M`Opposite signs, so add: $17x=34$, $x=2$.`, M`Substitute: $8+3y=-1\Rightarrow y=-3$. Check: $6+6=12$ ✓.`]},
    { q: M`Solve $2x^2+3x-5\ge0$.`,
      steps: [M`$(2x+5)(x-1)=0$: roots $x=-2.5$, $x=1$.`, M`Positive $x^2$ coefficient: U-shape, above the axis outside the roots.`, M`$x\le-2.5$ or $x\ge1$.`]}
  ],
  formulas: [["Elimination", "same signs subtract, different signs add"], ["Inequality rule", "× or ÷ by a negative: flip the sign"], ["Quadratic < 0", "between the roots (U-shaped curve)"], ["Quadratic > 0", "outside the roots"], ["Boundary line", "solid for ≤ / ≥, broken for < / >"]],
  cards: [
    ["Solve 5x + 3 = 2x − 9", "x = −4"],
    ["Clear fractions in an equation", "Multiply every term by the LCD."],
    ["Elimination: when to add?", "When the matching coefficients have opposite signs."],
    ["Graphical meaning of simultaneous solution", "Intersection point of the two lines."],
    ["Parallel lines: how many solutions?", "None (or infinitely many if identical)."],
    ["Solve −3x ≤ 12", "x ≥ −4 (sign flips)"],
    ["Open vs filled circle", "Open: < or > (not included). Filled: ≤ or ≥."],
    ["Integers satisfying −2 < n ≤ 3", "−1, 0, 1, 2, 3"],
    ["Solve x² < 25", "−5 < x < 5"],
    ["Solve x² ≥ 9", "x ≤ −3 or x ≥ 3"],
    ["Boundary for y < 2x + 1", "Broken line"],
    ["Testing a region", "Substitute a point such as (0, 0)."],
    ["Maximise P over a region", "Test the vertices of the region."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`Solve $6-2x=14$.`, opts: ["$x=4$", "$x=-4$", "$x=10$", "$x=-10$"], ans: 1, why: M`$-2x=8$.` },
    { type: "mcq", marks: 1, q: M`Solve $\dfrac{x}{3}+2=7$.`, opts: ["3", "15", "27", "$\tfrac53$"], ans: 1, why: M`$\tfrac x3=5$.` },
    { type: "mcq", marks: 1, q: M`Which inequality is shown by an open circle at 2 and an arrow to the left?`, opts: ["$x\le2$", "$x\lt2$", "$x\gt2$", "$x\ge2$"], ans: 1, why: M`Open → strict; left → less than.` },
    { type: "mcq", marks: 1, q: M`$-5x\gt20$ gives`, opts: ["$x\gt-4$", "$x\lt-4$", "$x\gt4$", "$x\lt4$"], ans: 1, why: M`Divide by −5 and flip.` },
    { type: "struct", marks: 3, q: M`Solve $4(2x-1)=3(x+7)$.`, ms: M`<b>M1</b> $8x-4=3x+21$<br><b>M1</b> $5x=25$<br><b>A1</b> $x=5$` },
    { type: "struct", marks: 3, q: M`Solve $\dfrac{x+3}{2}+\dfrac{x-1}{5}=4$.`, ms: M`<b>M1</b> $5(x+3)+2(x-1)=40$<br><b>M1</b> $7x+13=40$<br><b>A1</b> $x=\tfrac{27}{7}$` },
    { type: "struct", marks: 3, q: M`Solve the simultaneous equations $3x+y=11$ and $2x-3y=-11$.`, ms: M`<b>M1</b> $9x+3y=33$<br><b>M1</b> add: $11x=22$<br><b>A1</b> $x=2$, $y=5$` },
    { type: "struct", marks: 2, q: M`Solve $3\lt 2x-5\le 11$.`, ms: M`<b>M1</b> $8\lt2x\le16$<br><b>A1</b> $4\lt x\le8$` },
    { type: "struct", marks: 3, q: M`The angles of a quadrilateral are $x$, $2x$, $(x+30)$ and $(2x-30)$ degrees. Form and solve an equation to find $x$.`, ms: M`<b>M1</b> sum $=360$<br><b>M1</b> $6x=360$<br><b>A1</b> $x=60$` },
    { type: "struct", marks: 3, q: M`Solve $x^2-5x-14\gt0$.`, ms: M`<b>M1</b> $(x-7)(x+2)$<br><b>A1</b> critical values $-2$, 7<br><b>A1</b> $x\lt-2$ or $x\gt7$` },
    { type: "struct", marks: 3, q: M`3 coffees and 2 cakes cost \$14.50. 2 coffees and 3 cakes cost \$15.50. Find the cost of one coffee.`, ms: M`<b>M1</b> $3c+2k=14.5$, $2c+3k=15.5$<br><b>M1</b> $9c+6k=43.5$ and $4c+6k=31$, subtract: $5c=12.5$<br><b>A1</b> \$2.50` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: M`Solve $5x+8=33$.`, ms: M`<b>M1</b> $5x=25$<br><b>A1</b> $x=5$` },
    { d: 1, type: "struct", marks: 2, q: M`Solve $\dfrac{x-4}{3}=5$.`, ms: M`<b>M1</b> $x-4=15$<br><b>A1</b> 19` },
    { d: 1, type: "struct", marks: 2, q: M`Solve $7x-3\lt25$.`, ms: M`<b>M1</b> $7x\lt28$<br><b>A1</b> $x\lt4$` },
    { d: 1, type: "struct", marks: 2, q: M`List the integers $n$ such that $-3\le n\lt2$.`, ms: M`<b>B2</b> $-3,-2,-1,0,1$ (B1 for one error)` },
    { d: 1, type: "mcq", marks: 1, q: M`The solution of $x+y=10$ and $x-y=4$ is`, opts: ["(6, 4)", "(7, 3)", "(3, 7)", "(5, 5)"], ans: 1, why: M`Add: $2x=14$.` },
    { d: 2, type: "struct", marks: 3, q: M`Solve $\dfrac{5}{x+2}=\dfrac{3}{x-1}$.`, ms: M`<b>M1</b> $5(x-1)=3(x+2)$<br><b>M1</b> $2x=11$<br><b>A1</b> $x=5.5$` },
    { d: 2, type: "struct", marks: 4, q: M`Solve simultaneously $5x-4y=23$ and $3x+2y=5$.`, ms: M`<b>M1</b> $6x+4y=10$<br><b>M1</b> add: $11x=33$<br><b>A1</b> $x=3$<br><b>A1</b> $y=-2$` },
    { d: 2, type: "struct", marks: 3, q: M`A rectangle has length $(3x-2)$ cm and width $(x+4)$ cm. Its perimeter is 52 cm. Find its area.`, ms: M`<b>M1</b> $2(3x-2)+2(x+4)=52\Rightarrow 8x+4=52$<br><b>A1</b> $x=6$<br><b>A1</b> $16\times10=160$ cm²` },
    { d: 2, type: "struct", marks: 3, q: M`Write down the three inequalities that define the region bounded by $y=1$, $x=4$ and $y=x$, containing the point (3, 2).`, ms: M`<b>B1</b> $y\ge1$<br><b>B1</b> $x\le4$<br><b>B1</b> $y\le x$` },
    { d: 2, type: "struct", marks: 2, q: M`Solve $9-4x\ge 2x-15$.`, ms: M`<b>M1</b> $24\ge6x$<br><b>A1</b> $x\le4$` },
    { d: 3, type: "struct", marks: 4, q: M`The sum of the ages of a mother and daughter is 48. Six years ago the mother was five times as old as the daughter. Find their ages now.`, ms: M`<b>M1</b> $m+d=48$<br><b>M1</b> $m-6=5(d-6)$<br><b>M1</b> $48-d-6=5d-30\Rightarrow 6d=72$<br><b>A1</b> daughter 12, mother 36` },
    { d: 3, type: "struct", marks: 4, q: M`Solve $2x^2\le 7x+4$ and list the integer values of $x$ that satisfy it.`, ms: M`<b>M1</b> $2x^2-7x-4\le0$<br><b>M1</b> $(2x+1)(x-4)$<br><b>A1</b> $-\tfrac12\le x\le4$<br><b>A1</b> 0, 1, 2, 3, 4` },
    { d: 3, type: "struct", marks: 5, q: M`A farmer plants $x$ hectares of wheat and $y$ hectares of maize. Conditions: $x+y\le10$, $y\ge2$, $x\ge y$. Profit is $P=400x+300y$. (a) Find the vertices of the region. (b) Find the maximum profit.`, ms: M`<b>B1</b> $(2,2)$<br><b>B1</b> $(8,2)$<br><b>B1</b> $(5,5)$<br><b>M1</b> evaluate $P$: 1400, 3800, 3500<br><b>A1</b> maximum \$3800 at $x=8$, $y=2$` },
    { d: 3, type: "struct", marks: 3, q: M`Find the range of values of $k$ for which the lines $y=kx+3$ and $y=2x-1$ meet at a point with positive $x$-coordinate.`, ms: M`<b>M1</b> $kx+3=2x-1\Rightarrow x(2-k)=4$<br><b>M1</b> $x=\dfrac{4}{2-k}\gt0$<br><b>A1</b> $k\lt2$` }
  ]
});
}
