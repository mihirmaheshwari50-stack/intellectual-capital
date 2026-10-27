window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
//@@HELPERS-START
// ---- diagram helpers for this topic ----
const areaModel = (a, b, rowA, rowB, cells, cap) => {
  // a, b: [label, size] pairs for columns; rowA/rowB for rows; cells: 2x2 labels
  const W = 400, x0 = 70, y0 = 40, H = y0 + rowA[1] + rowB[1] + 16, cw = [a[1], b[1]], rh = [rowA[1], rowB[1]];
  let s = "", x = x0;
  [a, b].forEach((col, i) => { s += F.text(x + cw[i] / 2, y0 - 12, col[0], "tc bold serif big"); x += cw[i]; });
  let y = y0;
  [rowA, rowB].forEach((row, j) => {
    s += F.text(x0 - 14, y + rh[j] / 2 + 6, row[0], "tc bold serif big", "end");
    let xx = x0;
    [0, 1].forEach(i => { s += F.rect(xx, y, cw[i], rh[j], (i + j) % 2 ? "k cS" : "k bgF"); s += F.text(xx + cw[i] / 2, y + rh[j] / 2 + 6, cells[j][i], "tk bold serif big"); xx += cw[i]; });
    y += rh[j];
  });
  return F.fig(W, H, s, cap, { size: "small" });
};
const rootsRow = () => F.row(
  F.plot({ w: 260, h: 200, x: [-3, 5], y: [-5, 6], grid: false, curves: [{ f: x => x * x - 2 * x - 3, c: "c thick" }], marks: [{ x: -1, y: 0, c: "r" }, { x: 3, y: 0, c: "r" }], cap: "$b^2-4ac>0$: two roots" }),
  F.plot({ w: 260, h: 200, x: [-3, 5], y: [-5, 6], grid: false, curves: [{ f: x => x * x - 2 * x + 1, c: "c thick" }], marks: [{ x: 1, y: 0, c: "r" }], cap: "$b^2-4ac=0$: one (repeated) root" }),
  F.plot({ w: 260, h: 200, x: [-3, 5], y: [-5, 6], grid: false, curves: [{ f: x => x * x - 2 * x + 3, c: "c thick" }], cap: "$b^2-4ac<0$: no real roots" })
);
//@@HELPERS-END

/* ============================================================
   QUADRATICS  (0580 2025–2027: E2.2, E2.3, E2.5, E2.10, E2.11)
   ============================================================ */
TOPICS.push({
  id: "quadratics", subject: "maths", unit: 2, title: "Quadratics",
  blurb: "Expanding, factorising, the formula, completing the square, graphs and simultaneous equations.",
  level: "Core → Extended", demo: "quadratic",
  syllabus: [
    ["E2.2", "Expand products of algebraic expressions, including three binomials", 1],
    ["E2.2", "Factorise: common factor, difference of two squares, grouping, trinomials $ax^2+bx+c$", 2],
    ["E2.3", "Manipulate algebraic fractions: simplify, multiply, divide, add and subtract", 3],
    ["E2.5", "Solve quadratic equations by factorisation", 4],
    ["E2.5", "Solve quadratic equations using the quadratic formula", 5],
    ["E2.2", "Complete the square for expressions of the form $ax^2+bx+c$", 6],
    ["E2.5", "Solve quadratic equations by completing the square", 6],
    ["E2.5", "Form and solve quadratic equations from a context, rejecting impossible solutions", 7],
    ["E2.5", "Solve simultaneous equations where one is linear and one is quadratic", 8],
    ["E2.10", "Construct tables of values, draw quadratic graphs and estimate gradients with tangents", 9],
    ["E2.10", "Use graphs to solve equations, including by drawing a suitable straight line", 9],
    ["E2.11", "Sketch quadratic graphs: roots, $y$-intercept, turning point, line of symmetry", 10]
  ],
  sections: [
    { h: "What a quadratic really is", body: M`
<p class="lead">A <b>quadratic</b> is any expression in which the highest power of the unknown is 2. Its general form is $ax^2+bx+c$, where $a$, $b$ and $c$ are numbers and $a\neq0$.</p>
<p>The three numbers have names you'll see everywhere: $a$ is the <b>coefficient of $x^2$</b> (the leading coefficient), $b$ is the <b>coefficient of $x$</b>, and $c$ is the <b>constant term</b>. In $3x^2-5x+2$: $a=3$, $b=-5$, $c=2$. Notice that the <b>sign belongs to the number</b>, so $b$ is $-5$, not $5$. Getting this wrong is behind most mistakes with the quadratic formula.</p>
<p>Why must $a\neq0$? If $a=0$ the $x^2$ term vanishes and $bx+c$ is a straight line, a completely different shape.</p>
<h3>The shape: a parabola</h3>
<p>Every quadratic graph $y=ax^2+bx+c$ is a <b>parabola</b>: a symmetric U or ∩ curve. The value of $a$ controls the shape:</p>
${F.plot({ x: [-4, 4], y: [-5, 9], ticks: { x: [-3, -2, -1, 1, 2, 3], y: [-4, -2, 2, 4, 6, 8] }, curves: [
  { f: x => x * x, c: "c thick", label: "y = x²", lpos: [2.9, 8.41], ldx: 6 },
  { f: x => 2 * x * x, c: "b mid", label: "y = 2x²", lpos: [2.05, 8.4], ldx: -60, ldy: 10 },
  { f: x => .5 * x * x, c: "g mid", label: "y = ½x²", lpos: [3.6, 6.48], ldx: -64, ldy: 14 },
  { f: x => 4 - x * x, c: "o mid", label: "y = 4 − x²", lpos: [2.6, -2.76], ldx: 8 }],
  cap: "Positive $a$ gives a U (a minimum). Negative $a$ flips it into an ∩ (a maximum). A larger $|a|$ makes it narrower." })}
<ul><li>$a>0$: opens <b>upwards</b>, a U shape with a <b>minimum</b> turning point.</li>
<li>$a<0$: opens <b>downwards</b>, an ∩ shape with a <b>maximum</b> turning point.</li>
<li>Larger $|a|$ means a <b>narrower</b> (steeper) curve; smaller $|a|$ means a wider one.</li></ul>
<p>Every parabola is <b>symmetric</b> about a vertical line through its turning point (vertex). That symmetry is the secret behind several shortcuts later.</p>
<h3>What "solving" means</h3>
<p>Solving $ax^2+bx+c=0$ means finding every value of $x$ that makes the expression equal to zero. On the graph $y=ax^2+bx+c$, those are the points where $y=0$, which is where the curve <b>crosses or touches the $x$-axis</b>. These $x$-values are called the <b>roots</b>, <b>solutions</b> or <b>zeros</b>.</p>
${rootsRow()}
<p>A parabola can cross the axis twice, touch it once, or miss it completely, so a quadratic equation has <b>2, 1 or 0 real roots</b>. Never more than 2.</p>
<h3>The rule that makes factorising work</h3>
<div class="callout key"><b class="t">The zero-product rule</b>If $A\times B=0$, then $A=0$ or $B=0$ (or both). Zero is the only number with this property: if $A\times B=12$, there are infinitely many possibilities (3 × 4, 2 × 6, 24 × ½, …). So <b>a quadratic must be rearranged to "$\ldots=0$" before you factorise</b>.</div>
<p>There are three methods for solving, and choosing well saves a lot of time:</p>
<table class="t"><tr><th>Method</th><th>Use it when</th><th>Why</th></tr>
<tr><td>Factorising</td><td>The numbers are small integers and it "looks nice"</td><td>Fastest, and exact</td></tr>
<tr><td>Quadratic formula</td><td>The question asks for decimal places or significant figures</td><td>That wording tells you the roots are irrational, so it won't factorise</td></tr>
<tr><td>Completing the square</td><td>"Write in the form $(x+p)^2+q$", "hence solve", or "find the turning point"</td><td>Gives the vertex directly, and exact surd answers</td></tr></table>`},

    { h: "Expanding brackets (E2.2)", body: M`
<p class="lead">To expand means to multiply out brackets, so that the expression is written as a sum of separate terms. The rule underneath it all is the <b>distributive law</b>: $a(b+c)=ab+ac$. Every term outside multiplies every term inside.</p>
<h3>Two binomials: see it as an area</h3>
<p>A binomial is a two-term expression like $x+3$. Multiplying two of them is exactly finding the area of a rectangle whose sides are split into parts:</p>
${areaModel(["x", 150], ["+3", 70], ["x", 120], ["+2", 60], [["x²", "3x"], ["2x", "6"]], "$(x+3)(x+2)$: the four pieces of the rectangle are the four products, so the total area is $x^2+3x+2x+6=x^2+5x+6$.")}
<p>Each of the four regions is one multiplication: first × first, first × last, and so on. That is why there are always <b>four products</b> before you collect like terms. The common memory aid is FOIL (First, Outer, Inner, Last), but the grid is more reliable because it extends to longer brackets.</p>
<div class="callout ex"><b class="t">Worked example</b>Expand $(2x-3)(x+5)$.<br>Grid: $2x\cdot x=2x^2$, $\;2x\cdot5=10x$, $\;-3\cdot x=-3x$, $\;-3\cdot5=-15$.<br>Collect: $2x^2+10x-3x-15=2x^2+7x-15$.</div>
<p>The sign travels with the term. In $(2x-3)$, the second term is $-3$, so every product involving it carries a minus.</p>
<h3>The three special products</h3>
<p>Learn these so you can recognise them instantly, both forwards (expanding) and backwards (factorising):</p>
${F.row(
  areaModel(["a", 140], ["b", 70], ["a", 140], ["b", 70], [["a²", "ab"], ["ab", "b²"]], "$(a+b)^2=a^2+2ab+b^2$. The square has <b>two</b> $ab$ rectangles, which is why the middle term is $2ab$."),
  (() => { const a = 150, b = 60, d = a - b, x0 = 30, y0 = 30;
    let s = F.rect(x0, y0, a, d, "k bS") + F.rect(x0, y0 + d, d, b, "k oS") + F.rect(x0 + d, y0 + d, b, b, "m d") + F.text(x0 + d + b / 2, y0 + d + b / 2 + 5, "b²", "tm bold serif") + F.text(x0 + a / 2, y0 - 10, "a", "tc bold serif big") + F.text(x0 - 12, y0 + a / 2 + 6, "a", "tc bold serif big", "end") + F.text(x0 + a / 2, y0 + d / 2 + 6, "1", "tb bold") + F.text(x0 + d / 2, y0 + d + b / 2 + 6, "2", "to bold");
    const X = 250; s += F.arrow(196, 100, 236, 100, "m", 8);
    s += F.rect(X, y0 + 20, a, d, "k bS") + F.rect(X + a, y0 + 20, b, d, "k oS") + F.text(X + a / 2, y0 + 20 + d / 2 + 6, "1", "tb bold") + F.text(X + a + b / 2, y0 + 20 + d / 2 + 6, "2", "to bold") + F.dim(X, y0 + d + 40, X + a + b, y0 + d + 40, "a + b", "c") + F.text(X + a + b + 10, y0 + 20 + d / 2 + 6, "a − b", "tc bold serif", "start");
    return F.fig(520, 200, s, "$a^2-b^2$: cut the L-shape left after removing $b^2$ into pieces 1 and 2, turn piece 2 on its side, and they form a rectangle $(a+b)$ by $(a-b)$.", { size: "small" }); })()
)}
<ul>
<li>$(a+b)^2=a^2+2ab+b^2$. It is <b>not</b> $a^2+b^2$. This is the single most common algebra error at IGCSE. Test it with numbers: $(3+4)^2=49$, but $3^2+4^2=25$.</li>
<li>$(a-b)^2=a^2-2ab+b^2$. The last term is $+b^2$ because $(-b)\times(-b)=+b^2$.</li>
<li>$(a+b)(a-b)=a^2-b^2$. The middle terms $+ab$ and $-ab$ cancel. This is the <b>difference of two squares</b>.</li>
</ul>
<h3>Three binomials</h3>
<p>Multiply two of the brackets first, simplify, then multiply the result by the third bracket. A trinomial times a binomial gives up to $3\times2=6$ products before collecting. Line up like terms in columns so none go missing.</p>
<div class="callout ex"><b class="t">Worked example</b>Expand and simplify $(x+1)(x-2)(2x+3)$.<br>Step 1: $(x+1)(x-2)=x^2-2x+x-2=x^2-x-2$.<br>Step 2: $(x^2-x-2)(2x+3)$:<br>$x^2\cdot2x=2x^3$, $\;x^2\cdot3=3x^2$, $\;-x\cdot2x=-2x^2$, $\;-x\cdot3=-3x$, $\;-2\cdot2x=-4x$, $\;-2\cdot3=-6$.<br>Collect: $2x^3+(3-2)x^2+(-3-4)x-6=2x^3+x^2-7x-6$.</div>
<div class="callout tip"><b class="t">The substitution check</b>Pick an easy value like $x=1$ and evaluate both the original and your answer. Original: $(2)(-1)(5)=-10$. Answer: $2+1-7-6=-10$ ✓. If they disagree, there's a slip somewhere. Use $x=2$ as a second check if you're unsure. It takes ten seconds and catches almost every error.</div>
<div class="callout warn"><b class="t">Common mistakes</b>Writing $(x+5)^2=x^2+25$. Losing a negative: $-3(x-4)=-3x+12$, not $-3x-12$. Expanding a squared bracket with a coefficient wrongly: $3(x+2)^2$ means $3(x^2+4x+4)=3x^2+12x+12$. Square the bracket <i>first</i>, then multiply by 3.</div>
<details class="check"><summary>Expand $(3x-2)^2$.</summary><div>$(3x-2)(3x-2)=9x^2-6x-6x+4=9x^2-12x+4$. The middle term is $2\times(3x)\times(-2)=-12x$.</div></details>
<details class="check"><summary>Expand $(x+4)(x-4)(x+1)$.</summary><div>$(x+4)(x-4)=x^2-16$ (difference of squares). Then $(x^2-16)(x+1)=x^3+x^2-16x-16$.</div></details>`},

    { h: "Factorising: every type (E2.2)", body: M`
<p class="lead">Factorising is expanding in reverse. You rewrite an expression as a <b>product</b> of simpler factors. "Factorise completely" means keep going until no bracket can be factorised further.</p>
<h3>Follow this checklist, in order</h3>
<ol class="steps-inline">
<li><b>Common factor.</b> Always look first. Take out the <b>highest</b> common factor (HCF) of the numbers <i>and</i> of the letters. $6x^2-9x=3x(2x-3)$. Taking out only $3$ gives $3(2x^2-3x)$, which is not fully factorised.</li>
<li><b>Two terms?</b> Check for a <b>difference of two squares</b>.</li>
<li><b>Three terms?</b> It's a trinomial: use number pairs ($a=1$) or the ac method ($a\neq1$).</li>
<li><b>Four terms?</b> Try <b>grouping</b> in pairs.</li>
<li><b>Check</b> each bracket to see if it factorises again, and expand your answer to verify.</li>
</ol>
<h3>Difference of two squares</h3>
$$a^2-b^2=(a-b)(a+b)$$
<p>It needs exactly two terms, both perfect squares, with a <b>minus</b> between them. A sum of two squares, $a^2+b^2$, does <b>not</b> factorise.</p>
<ul><li>$x^2-49=(x-7)(x+7)$</li><li>$9x^2-25y^2=(3x-5y)(3x+5y)$</li>
<li>$2x^2-50=2(x^2-25)=2(x-5)(x+5)$: common factor first, then DOTS</li>
<li>$x^4-16=(x^2-4)(x^2+4)=(x-2)(x+2)(x^2+4)$: apply it twice</li>
<li>Mental arithmetic: $103^2-97^2=(103-97)(103+97)=6\times200=1200$</li></ul>
<h3>Trinomials with $a=1$: $x^2+bx+c$</h3>
<p>Expanding $(x+p)(x+q)$ gives $x^2+(p+q)x+pq$. So you need two numbers that <b>multiply to give $c$</b> and <b>add to give $b$</b>. Work through the factor pairs of $c$ systematically.</p>
${areaModel(["x", 150], ["+3", 70], ["x", 120], ["+2", 60], [["x²", "3x"], ["2x", "6"]], "Factorising $x^2+5x+6$ is fitting the pieces back into a rectangle. The 6 splits as $2\\times3$ and the $5x$ as $2x+3x$, so the sides are $(x+2)$ and $(x+3)$.")}
<p>Let the signs of $b$ and $c$ guide you:</p>
<table class="t"><tr><th>Sign of $c$</th><th>Sign of $b$</th><th>Numbers</th><th>Example</th></tr>
<tr><td>+</td><td>+</td><td>both positive</td><td>$x^2+7x+12=(x+3)(x+4)$</td></tr>
<tr><td>+</td><td>−</td><td>both negative</td><td>$x^2-7x+12=(x-3)(x-4)$</td></tr>
<tr><td>−</td><td>+</td><td>opposite signs, bigger one positive</td><td>$x^2+x-12=(x+4)(x-3)$</td></tr>
<tr><td>−</td><td>−</td><td>opposite signs, bigger one negative</td><td>$x^2-x-12=(x-4)(x+3)$</td></tr></table>
<h3>Trinomials with $a\neq1$: the ac method</h3>
<p>Factorise $6x^2+7x-3$:</p>
<ol class="steps-inline">
<li>Multiply $a\times c=6\times(-3)=-18$.</li>
<li>Find two numbers that multiply to $-18$ and add to $b=7$: they are $9$ and $-2$.</li>
<li>Split the middle term using them: $6x^2+9x-2x-3$.</li>
<li>Factorise each pair: $3x(2x+3)-1(2x+3)$. The brackets <b>must match</b>. If they don't, check your signs.</li>
<li>Take out the common bracket: $(2x+3)(3x-1)$.</li>
</ol>
<p>Why does it work? Splitting $7x$ into $9x-2x$ is chosen precisely so that the expression groups into two parts with a common factor. If no pair of numbers exists, the expression doesn't factorise over the integers, and you'd use the formula instead.</p>
<h3>Grouping (four terms)</h3>
<p>$xy+3x+2y+6$: group as $(xy+3x)+(2y+6)=x(y+3)+2(y+3)=(x+2)(y+3)$. If the brackets don't match, try grouping the terms differently: $ax-bx-ay+by=x(a-b)-y(a-b)=(x-y)(a-b)$. Watch the sign: $-ay+by=-y(a-b)$.</p>
<h3>Negative leading coefficient</h3>
<p>For $-x^2+x+12$, take out $-1$ first: $-(x^2-x-12)=-(x-4)(x+3)$, which can also be written $(4-x)(x+3)$.</p>
<div class="callout warn"><b class="t">"Not fully factorised" loses marks</b>$4x^2-36=(2x-6)(2x+6)$ is correct but not complete, because each bracket still has a factor of 2. The complete answer is $4(x-3)(x+3)$. Taking out the common factor first avoids this every time.</div>
<details class="check"><summary>Factorise completely $3x^2-12x-15$.</summary><div>Common factor 3: $3(x^2-4x-5)$. Numbers multiplying to $-5$ and adding to $-4$: $-5$ and $+1$. Answer: $3(x-5)(x+1)$.</div></details>
<details class="check"><summary>Factorise $10x^2-11x-6$.</summary><div>$ac=-60$. Numbers with product $-60$ and sum $-11$: $-15$ and $4$. $10x^2-15x+4x-6=5x(2x-3)+2(2x-3)=(2x-3)(5x+2)$.</div></details>
<details class="check"><summary>Factorise $50-2y^2$.</summary><div>$2(25-y^2)=2(5-y)(5+y)$.</div></details>`},

    { h: "Algebraic fractions (E2.3)", body: M`
<p class="lead">Algebraic fractions follow exactly the same rules as number fractions. The only new skill is <b>factorising first</b> so you can see the common factors.</p>
<h3>Simplifying</h3>
<p>You may only cancel a <b>factor</b> that multiplies the <i>whole</i> numerator and the <i>whole</i> denominator.</p>
$$\frac{x^2-9}{x^2+x-6}=\frac{(x-3)\cancel{(x+3)}}{\cancel{(x+3)}(x-2)}=\frac{x-3}{x-2}$$
<div class="callout warn"><b class="t">The classic wrong cancel</b>$\dfrac{x+3}{x+5}\neq\dfrac35$. The $x$ is <i>added</i>, not multiplied, so it isn't a factor. Check with $x=1$: $\dfrac{4}{6}\neq\dfrac35$. Similarly $\dfrac{2x+6}{2}=x+3$ (factor 2 out of the top first), not $x+6$.</div>
<p>Look out for factors that are negatives of each other: $\dfrac{x-3}{3-x}=-1$, because $3-x=-(x-3)$.</p>
<h3>Multiplying and dividing</h3>
<p>Factorise everything, multiply tops and bottoms, then cancel. To divide, <b>flip the second fraction</b> and multiply.</p>
$$\frac{x^2-4}{3x}\div\frac{x+2}{6x^2}=\frac{(x-2)(x+2)}{3x}\times\frac{6x^2}{x+2}=2x(x-2)$$
<h3>Adding and subtracting</h3>
<p>You need a <b>common denominator</b>, ideally the lowest one. Multiply each fraction top and bottom by whatever its denominator is missing.</p>
$$\frac{2}{x+1}+\frac{3}{x-2}=\frac{2(x-2)+3(x+1)}{(x+1)(x-2)}=\frac{5x-1}{(x+1)(x-2)}$$
<div class="callout warn"><b class="t">Subtraction trap</b>In $\dfrac{3}{x}-\dfrac{x-1}{x+2}$, the minus applies to the whole second numerator: $\dfrac{3(x+2)-x(x-1)}{x(x+2)}=\dfrac{3x+6-x^2+x}{x(x+2)}=\dfrac{-x^2+4x+6}{x(x+2)}$. Put brackets round the numerator before expanding.</div>
<h3>Equations with fractions become quadratics</h3>
<p>Multiply every term by the common denominator to clear the fractions, then rearrange to $\ldots=0$.</p>
<div class="callout ex"><b class="t">Worked example</b>Solve $\dfrac{1}{x}+\dfrac{2}{x+1}=1$.<br>Multiply by $x(x+1)$: $(x+1)+2x=x(x+1)$.<br>$3x+1=x^2+x\Rightarrow x^2-2x-1=0$.<br>Formula: $x=\dfrac{2\pm\sqrt{4+4}}{2}=1\pm\sqrt2$, so $x=2.41$ or $x=-0.41$.<br>Check neither value makes a denominator zero ($x\neq0,-1$) ✓</div>
<details class="check"><summary>Simplify $\dfrac{2x^2+5x-3}{4x^2-1}$.</summary><div>Top: $(2x-1)(x+3)$. Bottom: $(2x-1)(2x+1)$. Answer $\dfrac{x+3}{2x+1}$.</div></details>
<details class="check"><summary>Write $\dfrac{x}{x-3}-\dfrac{2}{x}$ as a single fraction.</summary><div>$\dfrac{x^2-2(x-3)}{x(x-3)}=\dfrac{x^2-2x+6}{x(x-3)}$.</div></details>`},

    { h: "Solving by factorising (E2.5)", body: M`
<ol class="steps-inline"><li>Rearrange so one side is exactly $0$: $\;ax^2+bx+c=0$.</li><li>Factorise the expression.</li><li>Set each factor equal to $0$ and solve each linear equation.</li></ol>
${F.plot({ x: [-5, 4], y: [-8, 8], ticks: { x: [-4, -3, -2, -1, 1, 2, 3], y: [-6, -4, -2, 2, 4, 6] }, curves: [{ f: x => (x - 2) * (x + 3), c: "c thick", label: "y = (x − 2)(x + 3)", lpos: [3.1, 6.8], ldx: -150 }], marks: [{ x: -3, y: 0, c: "r", label: "x = −3", pos: "nw" }, { x: 2, y: 0, c: "r", label: "x = 2", pos: "ne" }], cap: "Each factor gives one root: $(x-2)=0$ at $x=2$, and $(x+3)=0$ at $x=-3$. Notice the sign flips." })}
<div class="callout ex"><b class="t">Worked example</b>Solve $2x^2=5x+3$.<br>Rearrange: $2x^2-5x-3=0$.<br>Factorise ($ac=-6$; numbers $-6,+1$): $2x^2-6x+x-3=2x(x-3)+1(x-3)=(2x+1)(x-3)$.<br>So $2x+1=0\Rightarrow x=-\tfrac12$, or $x-3=0\Rightarrow x=3$.</div>
<h3>Special cases</h3>
<ul>
<li><b>No constant term</b>, e.g. $x^2=4x$. Rearrange to $x^2-4x=0$, factorise $x(x-4)=0$, so $x=0$ or $x=4$. <b>Never divide both sides by $x$</b>: you would lose the root $x=0$ (dividing by $x$ secretly assumes $x\neq0$).</li>
<li><b>No $x$ term</b>, e.g. $x^2-25=0$. Factorise $(x-5)(x+5)=0$, or rearrange $x^2=25\Rightarrow x=\pm5$. Don't forget the negative root.</li>
<li><b>Repeated root</b>, e.g. $x^2-6x+9=0\Rightarrow(x-3)^2=0$, so $x=3$ only. The graph <i>touches</i> the axis at its vertex.</li>
<li><b>Brackets already there</b>: $(x-1)(x+4)=6$ is <b>not</b> solved by $x-1=6$! Expand, rearrange to $x^2+3x-10=0$, then $(x+5)(x-2)=0$.</li>
</ul>
<details class="check"><summary>Solve $3x^2+x=10$.</summary><div>$3x^2+x-10=0$. $ac=-30$: numbers $6,-5$. $3x^2+6x-5x-10=3x(x+2)-5(x+2)=(3x-5)(x+2)$. So $x=\tfrac53$ or $x=-2$.</div></details>
<details class="check"><summary>Solve $(x+2)(x-3)=14$.</summary><div>$x^2-x-6=14\Rightarrow x^2-x-20=0\Rightarrow(x-5)(x+4)=0$, so $x=5$ or $x=-4$.</div></details>`},

    { h: "The quadratic formula (E2.5)", body: M`
$$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$
<p class="lead">The formula solves <b>every</b> quadratic, including ones with irrational roots that can never be found by factorising. It is on the Extended formula list, but you should know it by heart.</p>
<h3>Where it comes from</h3>
<p>Complete the square on $ax^2+bx+c=0$. Understanding this derivation means you'll never misremember the formula:</p>
<ol class="steps-inline">
<li>Divide by $a$: $\;x^2+\dfrac bax+\dfrac ca=0$.</li>
<li>Complete the square: $\;\left(x+\dfrac{b}{2a}\right)^2-\dfrac{b^2}{4a^2}+\dfrac ca=0$.</li>
<li>Rearrange: $\;\left(x+\dfrac{b}{2a}\right)^2=\dfrac{b^2-4ac}{4a^2}$.</li>
<li>Square root both sides (both signs): $\;x+\dfrac{b}{2a}=\pm\dfrac{\sqrt{b^2-4ac}}{2a}$.</li>
<li>Subtract $\dfrac{b}{2a}$: $\;x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$.</li></ol>
<h3>Using it without slips</h3>
<div class="callout ex"><b class="t">Worked example</b>Solve $3x^2-2x-7=0$ to 2 decimal places.<br><b>1. Identify</b> (with signs): $a=3$, $b=-2$, $c=-7$.<br><b>2. Discriminant first</b>: $b^2-4ac=(-2)^2-4(3)(-7)=4+84=88$.<br><b>3. Substitute</b> and <b>write this line down</b>, because it earns the method mark: $x=\dfrac{-(-2)\pm\sqrt{88}}{2(3)}=\dfrac{2\pm\sqrt{88}}{6}$.<br><b>4. Evaluate</b> each: $\dfrac{2+9.3808}{6}=1.8968$ and $\dfrac{2-9.3808}{6}=-1.2301$.<br><b>5. Round</b>: $x=1.90$ or $x=-1.23$.</div>
<div class="callout warn"><b class="t">The five classic errors</b>
1. $-b$ when $b$ is negative: if $b=-2$ then $-b=+2$.<br>
2. Squaring a negative on a calculator: type $(-2)^2$ <b>with brackets</b>. $-2^2$ gives $-4$.<br>
3. $-4ac$ with a negative $c$: $-4(3)(-7)=+84$. Two negatives make a positive.<br>
4. Dividing only the square root by $2a$: the fraction line is under the <b>whole</b> numerator $-b\pm\sqrt{\ldots}$.<br>
5. Rounding too early: keep the full calculator value of $\sqrt{88}$ until the very end.</div>
<h3>Exact answers in surd form</h3>
<p>"Give your answer in the form $p\pm\sqrt q$" or "exact form" means leave the square root. Simplify it by taking out square factors: $\sqrt{20}=\sqrt{4\times5}=2\sqrt5$. Then cancel common factors:</p>
$$x^2-4x-1=0:\quad x=\frac{4\pm\sqrt{20}}{2}=\frac{4\pm2\sqrt5}{2}=2\pm\sqrt5$$
<h3>The discriminant: how many roots?</h3>
<p>The expression under the square root, $b^2-4ac$, is called the <b>discriminant</b>. You can't take the square root of a negative number (in real numbers), so its sign tells you how many roots exist <i>before you solve</i>:</p>
${rootsRow()}
<ul><li>$b^2-4ac>0$: two different real roots (the $\pm$ gives two values).</li>
<li>$b^2-4ac=0$: one repeated root, $x=-\dfrac{b}{2a}$ (adding or subtracting 0 gives the same value).</li>
<li>$b^2-4ac<0$: no real roots. If your calculator says "Math ERROR", this is why.</li></ul>
<p>Also, if $b^2-4ac$ is a <b>perfect square</b> (0, 1, 4, 9, 16, …), the roots are rational and the quadratic factorises. A quick test before you spend time trying to factorise. (The discriminant itself is an extension idea beyond the 0580 syllabus, but it explains a lot.)</p>
<details class="check"><summary>Solve $2x^2+5x-4=0$, giving answers to 3 s.f.</summary><div>$b^2-4ac=25+32=57$. $x=\dfrac{-5\pm\sqrt{57}}{4}$, so $x=0.637$ or $x=-3.14$.</div></details>
<details class="check"><summary>Show that $x^2+3x+5=0$ has no real solutions.</summary><div>$b^2-4ac=9-20=-11<0$. The square root of a negative is not real, so there are no real solutions.</div></details>`},

    { h: "Completing the square (E2.2, E2.5)", body: M`
<p class="lead">Completing the square rewrites $x^2+bx+c$ in the form $(x+p)^2+q$. It's the most powerful of the three methods: it solves equations exactly, finds turning points instantly, and proves the quadratic formula.</p>
<h3>The idea</h3>
<p>Since $(x+p)^2=x^2+2px+p^2$, the number inside the bracket is <b>half the coefficient of $x$</b>. But that bracket also produces an extra $p^2$, which wasn't in the original, so you subtract it:</p>
$$x^2+bx+c=\left(x+\tfrac b2\right)^2-\left(\tfrac b2\right)^2+c$$
<div class="viz" data-viz="completeSquare"></div>
<p>The picture makes it literal: $x^2+6x$ is a square and two strips. It's <i>almost</i> a square of side $x+3$, but the $3\times3$ corner is missing. So $x^2+6x=(x+3)^2-9$.</p>
<h3>Method for $a=1$</h3>
<ol class="steps-inline"><li>Halve the coefficient of $x$: $\;x^2-10x+18$ gives half of $-10$, which is $-5$.</li>
<li>Write the bracket: $(x-5)^2$.</li><li>Subtract the square of that number: $(x-5)^2-25$.</li>
<li>Add the original constant: $(x-5)^2-25+18=(x-5)^2-7$.</li></ol>
<p>Check by expanding: $(x-5)^2-7=x^2-10x+25-7=x^2-10x+18$ ✓.</p>
<h3>Method for $a\neq1$</h3>
<p>Factor $a$ out of the $x^2$ and $x$ terms <b>only</b>, complete the square inside, then multiply back:</p>
$$2x^2-12x+7=2\left(x^2-6x\right)+7=2\left[(x-3)^2-9\right]+7=2(x-3)^2-18+7=2(x-3)^2-11$$
<p>The most common error is forgetting to multiply the $-9$ by 2. Use the square brackets to protect it.</p>
<p>With a negative $a$: $-x^2+4x+1=-\left(x^2-4x\right)+1=-\left[(x-2)^2-4\right]+1=-(x-2)^2+5$.</p>
<h3>Reading the turning point</h3>
${F.plot({ x: [-1, 7], y: [-5, 7], ticks: { x: [1, 2, 3, 4, 5, 6], y: [-4, -2, 2, 4, 6] }, curves: [{ f: x => (x - 3) ** 2 - 4, c: "c thick", label: "y = (x − 3)² − 4", lpos: [5.6, 2.76], ldx: 8 }],
  marks: [{ x: 3, y: -4, c: "r", label: "turning point (3, −4)", pos: "se" }, { x: 1, y: 0, c: "k" }, { x: 5, y: 0, c: "k" }, { x: 0, y: 5, c: "k", label: "(0, 5)", pos: "e" }],
  extra: (X, Y) => F.line(X(3), Y(-5), X(3), Y(7), "m d") + F.text(X(3) + 6, Y(6.4), "x = 3", "tm small", "start"),
  cap: "In the form $(x-h)^2+k$, the turning point is $(h,k)$ and the line of symmetry is $x=h$." })}
<p>For $y=a(x-h)^2+k$:</p>
<ul><li>A square is never negative, so $(x-3)^2\ge0$. The smallest it can be is $0$, when $x=3$. Then $y=-4$.</li>
<li>So the <b>minimum value</b> of $(x-3)^2-4$ is $-4$, reached at $x=3$. The turning point is $(3,-4)$.</li>
<li>If $a<0$, the squared term is subtracted, so $k$ is a <b>maximum</b> value.</li></ul>
<div class="callout tip"><b class="t">Sign trap</b>$(x-3)^2$ means the turning point has $x=+3$, and $(x+2)^2$ means $x=-2$. Ask: "what value of $x$ makes the bracket zero?"</div>
<h3>Solving by completing the square</h3>
<div class="callout ex"><b class="t">Worked example</b>Solve $x^2-10x+18=0$, leaving answers in surd form.<br>$(x-5)^2-7=0\Rightarrow(x-5)^2=7\Rightarrow x-5=\pm\sqrt7\Rightarrow x=5\pm\sqrt7$.<br>As decimals: $7.65$ and $2.35$.</div>
<p>Forgetting the $\pm$ when square rooting loses one of the two roots, and half the marks.</p>
<details class="check"><summary>Write $x^2+8x+3$ in the form $(x+p)^2+q$ and state the minimum value.</summary><div>$(x+4)^2-16+3=(x+4)^2-13$. Minimum value $-13$ at $x=-4$.</div></details>
<details class="check"><summary>Write $3x^2+12x-1$ in the form $a(x+b)^2+c$.</summary><div>$3(x^2+4x)-1=3[(x+2)^2-4]-1=3(x+2)^2-13$.</div></details>
<details class="check"><summary>Find the maximum value of $5+6x-x^2$ and where it occurs.</summary><div>$-(x^2-6x)+5=-[(x-3)^2-9]+5=-(x-3)^2+14$. Maximum $14$ at $x=3$.</div></details>`},

    { h: "Forming quadratics from a context (E2.5)", body: M`
<p class="lead">Many exam quadratics are hidden in a story about area, Pythagoras, number puzzles or speed. The algebra is easy once you have the equation. Setting it up is the skill.</p>
<ol class="steps-inline"><li><b>Define</b> the unknown clearly, with units ("let the width be $x$ cm").</li>
<li>Write expressions for the other quantities in terms of $x$, and draw a labelled diagram.</li>
<li>Use the fact you're given (area, Pythagoras, total time) to form an equation.</li>
<li>Rearrange to $\ldots=0$ and solve.</li>
<li><b>Interpret</b>: reject impossible solutions (negative lengths or times) <i>and say why</i>, then answer the actual question asked.</li></ol>
${F.row(
  (() => { let s = F.rect(40, 30, 240, 120, "k cS") + F.text(160, 98, "Area = 40 cm²", "tk bold") + F.dim(40, 170, 280, 170, "x + 3", "c") + F.dim(300, 30, 300, 150, "x", "c"); return F.fig(340, 200, s, "Width $x$, length $x+3$: $x(x+3)=40$, so $x=5$ (reject $x=-8$)."); })(),
  (() => { let s = F.poly([[40, 170], [280, 170], [40, 50]], "k cS", true) + F.rightAngle(40, 170, 1, 0, 0, -1, 14) + F.text(160, 192, "x + 7", "tc bold") + F.text(26, 115, "x", "tc bold", "end") + F.text(178, 98, "x + 8", "tc bold", "start"); return F.fig(320, 210, s, "Pythagoras: $x^2+(x+7)^2=(x+8)^2$, so $x^2-2x-15=0$, giving $x=5$. The triangle is 5, 12, 13."); })()
)}
<div class="callout ex"><b class="t">Worked example: speed and time</b>A cyclist rides 60 km. If she rode 5 km/h faster, the journey would take 1 hour less. Find her speed.<br>Let speed $=x$ km/h. Time $=\dfrac{60}{x}$. Faster time $=\dfrac{60}{x+5}$.<br>$\dfrac{60}{x}-\dfrac{60}{x+5}=1$. Multiply by $x(x+5)$: $60(x+5)-60x=x(x+5)$.<br>$300=x^2+5x\Rightarrow x^2+5x-300=0\Rightarrow(x+20)(x-15)=0$.<br>$x=15$ km/h (reject $-20$, since speed can't be negative).</div>
<div class="callout ex"><b class="t">Worked example: number problem</b>The product of two consecutive odd numbers is 143. Find them.<br>Let them be $n$ and $n+2$: $n(n+2)=143\Rightarrow n^2+2n-143=0\Rightarrow(n+13)(n-11)=0$.<br>$n=11$ gives 11 and 13. $n=-13$ gives $-13$ and $-11$. <b>Both</b> are valid here because the question didn't say positive. Read carefully before rejecting a root.</div>
<div class="callout exam"><b class="t">Examiner wording</b>"Show that $x^2-2x-15=0$": every algebraic step must be written out, and you must arrive at exactly that equation. Then use it, even if you couldn't show it.</div>
<details class="check"><summary>A square garden has a 2 m wide path all the way round it. The total area (garden + path) is 196 m². Find the side of the garden.</summary><div>Side $x$: $(x+4)^2=196\Rightarrow x+4=14$ (reject $-14$) $\Rightarrow x=10$ m.</div></details>`},

    { h: "Linear–quadratic simultaneous equations (E2.5)", body: M`
<p class="lead">When one equation is linear and the other quadratic, you can't eliminate by adding. You <b>substitute</b> instead. Graphically, you're finding where a straight line meets a curve.</p>
${F.row(
  F.plot({ w: 250, h: 210, x: [-3, 3], y: [-2, 8], grid: false, curves: [{ f: x => x * x, c: "c thick" }, { f: x => x + 2, c: "k mid" }], marks: [{ x: -1, y: 1, c: "r" }, { x: 2, y: 4, c: "r" }], cap: "Line crosses: 2 solutions" }),
  F.plot({ w: 250, h: 210, x: [-3, 3], y: [-2, 8], grid: false, curves: [{ f: x => x * x, c: "c thick" }, { f: x => 2 * x - 1, c: "k mid" }], marks: [{ x: 1, y: 1, c: "r" }], cap: "Line is a tangent: 1 solution" }),
  F.plot({ w: 250, h: 210, x: [-3, 3], y: [-2, 8], grid: false, curves: [{ f: x => x * x, c: "c thick" }, { f: x => x - 2, c: "k mid" }], cap: "Line misses: no solutions" })
)}
<ol class="steps-inline"><li>Make $x$ or $y$ the subject of the <b>linear</b> equation.</li>
<li><b>Substitute</b> it into the quadratic equation. Use brackets!</li>
<li>Expand, rearrange to $\ldots=0$, and solve the quadratic.</li>
<li>Substitute each $x$ back into the <b>linear</b> equation (it's easier and safer) to find the matching $y$.</li>
<li>Write the answers as <b>pairs</b>.</li></ol>
<div class="callout ex"><b class="t">Worked example</b>Solve $y=x+1$ and $x^2+y^2=13$.<br>Substitute: $x^2+(x+1)^2=13\Rightarrow x^2+x^2+2x+1=13\Rightarrow2x^2+2x-12=0\Rightarrow x^2+x-6=0$.<br>$(x+3)(x-2)=0$, so $x=2$ or $x=-3$.<br>$x=2\Rightarrow y=3$; $\;x=-3\Rightarrow y=-2$. Solutions $(2,3)$ and $(-3,-2)$.</div>
${F.plot({ w: 330, h: 330, x: [-4.5, 4.5], y: [-4.5, 4.5], ticks: { x: [-3, -2, -1, 1, 2, 3], y: [-3, -2, -1, 1, 2, 3] }, curves: [{ f: x => Math.sqrt(13 - x * x), dom: [-3.6055, 3.6055], n: 300, c: "c thick" }, { f: x => -Math.sqrt(13 - x * x), dom: [-3.6055, 3.6055], n: 300, c: "c thick" }, { f: x => x + 1, c: "k mid", label: "y = x + 1", lpos: [3.2, 4.2], ldx: -70 }],
  marks: [{ x: 2, y: 3, c: "r", label: "(2, 3)", pos: "e" }, { x: -3, y: -2, c: "r", label: "(−3, −2)", pos: "w" }], cap: "$x^2+y^2=13$ is a circle of radius $\\sqrt{13}$. The line cuts it at the two solutions.", size: "small" })}
<div class="callout warn"><b class="t">Lost marks</b>Writing $(x+1)^2=x^2+1$. Giving only $x$-values. Pairing the wrong $y$ with each $x$: always substitute into the linear equation and keep them together.</div>
<details class="check"><summary>Solve $y=2x-1$ and $y=x^2-4x+4$.</summary><div>$x^2-4x+4=2x-1\Rightarrow x^2-6x+5=0\Rightarrow(x-1)(x-5)=0$. Solutions $(1,1)$ and $(5,9)$.</div></details>
<details class="check"><summary>Solve $x+y=5$ and $xy=6$.</summary><div>$y=5-x$, so $x(5-x)=6\Rightarrow x^2-5x+6=0\Rightarrow x=2$ or $3$. Pairs $(2,3)$ and $(3,2)$.</div></details>`},

    { h: "Drawing and using quadratic graphs (E2.10)", body: M`
<h3>Step 1: the table of values</h3>
<p>For $y=x^2-2x-3$ with $-2\le x\le4$, work out each value carefully, using brackets for negatives: $(-2)^2-2(-2)-3=4+4-3=5$.</p>
<table class="t"><tr><th>$x$</th><td>−2</td><td>−1</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
<tr><th>$y$</th><td>5</td><td>0</td><td>−3</td><td>−4</td><td>−3</td><td>0</td><td>5</td></tr></table>
<p>Use symmetry as a check: the $y$-values should be symmetric about the turning point (here mirror-image around $x=1$). If one value breaks the pattern, recalculate it.</p>
<h3>Step 2: plot and draw</h3>
${F.row(
  F.plot({ w: 260, h: 230, x: [-2.5, 4.5], y: [-5, 6], grid: true, curves: [{ pts: [[-2, 5], [-1, 0], [0, -3], [1, -4], [2, -3], [3, 0], [4, 5]], c: "r mid" }], marks: [[-2, 5], [-1, 0], [0, -3], [1, -4], [2, -3], [3, 0], [4, 5]].map(([x, y]) => ({ x, y, c: "k", r: 3 })), cap: "✗ Joined with a ruler: pointed, with a flat bottom" }),
  F.plot({ w: 260, h: 230, x: [-2.5, 4.5], y: [-5, 6], grid: true, curves: [{ f: x => x * x - 2 * x - 3, dom: [-2, 4], c: "g thick" }], marks: [[-2, 5], [-1, 0], [0, -3], [1, -4], [2, -3], [3, 0], [4, 5]].map(([x, y]) => ({ x, y, c: "k", r: 3 })), cap: "✓ One smooth curve through every point" })
)}
<ul><li>Plot points as small neat crosses, exactly.</li><li>Join with a single <b>smooth freehand curve</b>, not ruled straight segments.</li>
<li>The bottom (or top) must be rounded. If the turning point falls between plotted points, the curve continues past the lowest plotted point.</li>
<li>Draw the curve only between the $x$-values in the table, and don't double-line it.</li></ul>
<h3>Step 3: solving equations with the graph</h3>
${F.plot({ w: 460, h: 330, x: [-2.5, 4.5], y: [-5, 6], ticks: { x: [-2, -1, 1, 2, 3, 4], y: [-4, -2, 2, 4] }, curves: [{ f: x => x * x - 2 * x - 3, dom: [-2, 4], c: "c thick", label: "y = x² − 2x − 3", lpos: [-2, 5], ldx: 10 }, { f: x => 2, c: "o mid", label: "y = 2", lpos: [4.3, 2], ldx: -40, ldy: -8 }, { f: x => x - 2, c: "g mid", label: "y = x − 2", lpos: [-2.4, -4.4], ldx: 4, ldy: -10 }],
  marks: [{ x: 1 - Math.sqrt(6), y: 2, c: "o" }, { x: 1 + Math.sqrt(6), y: 2, c: "o" }, { x: (3 - Math.sqrt(13)) / 2, y: (3 - Math.sqrt(13)) / 2 - 2, c: "g" }, { x: (3 + Math.sqrt(13)) / 2, y: (3 + Math.sqrt(13)) / 2 - 2, c: "g" }],
  extra: (X, Y) => [1 - Math.sqrt(6), 1 + Math.sqrt(6)].map(x => F.line(X(x), Y(2), X(x), Y(0), "o d thin")).join("") + [(3 - Math.sqrt(13)) / 2, (3 + Math.sqrt(13)) / 2].map(x => F.line(X(x), Y(x - 2), X(x), Y(0), "g d thin")).join(""),
  cap: "Orange: $x^2-2x-3=2$ gives $x\\approx-1.4,\\;3.4$. Green: the line $y=x-2$ solves $x^2-3x-1=0$, giving $x\\approx-0.3,\\;3.3$." })}
<ul><li>$x^2-2x-3=0$: read where the curve crosses the $x$-axis ($y=0$): $x=-1$ and $x=3$.</li>
<li>$x^2-2x-3=2$: draw the horizontal line $y=2$ and read the $x$-coordinates of the intersections: $x\approx-1.4$ and $x\approx3.4$.</li>
<li>$x^2-3x-1=0$: this doesn't match the curve directly. Make the left side match the curve: $x^2-2x-3=x-2$ (add $x-2$ to both sides). So draw the straight line $y=x-2$ and read the intersections: $x\approx-0.3$ and $x\approx3.3$.</li></ul>
<div class="callout key"><b class="t">The "suitable line" rule</b>Write the given equation. Add or subtract terms on <b>both</b> sides until one side is exactly the expression you drew. The other side is the line to draw. Check: setting the curve equal to the line must give back the original equation.</div>
<h3>Gradient of a curve: tangents</h3>
${F.plot({ w: 420, h: 300, x: [-1, 4], y: [-2, 10], ticks: { x: [1, 2, 3], y: [2, 4, 6, 8] }, curves: [{ f: x => x * x, c: "c thick", label: "y = x²", lpos: [3.1, 9.6], ldx: -54 }, { f: x => 4 * x - 4, dom: [0.6, 3.4], c: "r mid", label: "tangent at (2, 4)", lpos: [0.6, -1.6], ldx: 10 }],
  marks: [{ x: 2, y: 4, c: "r" }], extra: (X, Y) => F.line(X(1.5), Y(2), X(3), Y(2), "k thin") + F.line(X(3), Y(2), X(3), Y(8), "k thin") + F.text(X(2.25), Y(2) + 16, "run 1.5", "tk small") + F.text(X(3) + 6, Y(5), "rise 6", "tk small", "start"),
  cap: "Gradient of the tangent $=\\dfrac{6}{1.5}=4$. That's the gradient of the curve at $(2,4)$." })}
<p>A curve's steepness changes from point to point. To estimate it at a point: draw a <b>tangent</b> (a straight line that just touches the curve there, without crossing it nearby), then calculate the tangent's gradient using a <b>large</b> right-angled triangle: rise ÷ run, reading values from the axes.</p>
<details class="check"><summary>You've drawn $y=x^2+x-4$. What line would you draw to solve $x^2-x-6=0$?</summary><div>$x^2-x-6=0\Rightarrow x^2+x-4=2x+2$ (add $2x+2$ to both sides). Draw $y=2x+2$.</div></details>`},

    { h: "Sketching quadratics (E2.11)", body: M`
<p class="lead">A <b>sketch</b> is not a plot. It's a neat, correctly shaped curve that shows and labels the <b>key features</b>, without needing a table of values or graph paper.</p>
<h3>Key features to find and label</h3>
<ol class="steps-inline"><li><b>Shape</b>: $a>0$ gives a U and $a<0$ gives an ∩.</li><li><b>$y$-intercept</b>: put $x=0$, which gives $(0,c)$.</li>
<li><b>Roots</b> ($x$-intercepts): solve $y=0$.</li><li><b>Turning point</b>: complete the square, or use the line of symmetry $x=-\dfrac{b}{2a}$ (exactly halfway between the roots) and substitute back.</li></ol>
${F.plot({ x: [-3.5, 5.5], y: [-3, 11], ticks: { x: [-2, -1, 1, 2, 3, 4], y: [2, 4, 6, 8] }, grid: false, curves: [{ f: x => -x * x + 2 * x + 8, c: "c thick", label: "y = −x² + 2x + 8", lpos: [3.2, 4.16], ldx: 12, ldy: 0 }],
  marks: [{ x: -2, y: 0, c: "r", label: "(−2, 0)", pos: "nw" }, { x: 4, y: 0, c: "r", label: "(4, 0)", pos: "ne" }, { x: 0, y: 8, c: "k", label: "(0, 8)", pos: "w" }, { x: 1, y: 9, c: "b", label: "max (1, 9)", pos: "ne" }],
  extra: (X, Y) => F.line(X(1), Y(-3), X(1), Y(10.5), "m d"),
  cap: "$y=-x^2+2x+8=-(x-4)(x+2)=-(x-1)^2+9$: an ∩ shape with roots $-2$ and $4$, $y$-intercept $8$ and maximum $(1,9)$." })}
<div class="callout ex"><b class="t">Worked example</b>Sketch $y=-x^2+2x+8$.<br>Shape: $a=-1<0$, so ∩. $y$-intercept: $(0,8)$.<br>Roots: $-x^2+2x+8=0\Rightarrow x^2-2x-8=0\Rightarrow(x-4)(x+2)=0$, so $x=4,\,-2$.<br>Line of symmetry: halfway between $-2$ and $4$ is $x=1$. Then $y=-1+2+8=9$, so the maximum is $(1,9)$.</div>
<h3>Transformations: where the completed square comes from</h3>
${F.plot({ w: 420, h: 280, x: [-3, 6], y: [-1, 8], ticks: { x: [1, 2, 3, 4, 5], y: [2, 4, 6] }, curves: [{ f: x => x * x, c: "m mid", label: "y = x²", lpos: [-2.6, 6.76], ldx: 8 }, { f: x => (x - 3) ** 2 + 2, c: "c thick", label: "y = (x − 3)² + 2", lpos: [5.2, 6.84], ldx: -10, ldy: 0, la: "end" }],
  extra: (X, Y) => F.arrow(X(0), Y(0), X(2.9), Y(1.9), "r mid") + F.dot(X(3), Y(2), "r"),
  cap: "$y=(x-3)^2+2$ is $y=x^2$ moved 3 right and 2 up, so its vertex moves from $(0,0)$ to $(3,2)$." })}
<p>$y=(x-h)^2+k$ is the graph of $y=x^2$ <b>translated</b> by the vector $\begin{pmatrix}h\\k\end{pmatrix}$. That is why completing the square gives the turning point directly.</p>
<p><b>Differentiation link (E2.12):</b> the turning point is where the gradient is zero. For $y=ax^2+bx+c$, $\dfrac{dy}{dx}=2ax+b=0$ gives $x=-\dfrac{b}{2a}$, the same line of symmetry.</p>
<details class="check"><summary>Sketch $y=x^2-6x+5$: give the roots, $y$-intercept and turning point.</summary><div>U shape. $(x-1)(x-5)$ gives roots 1 and 5. $y$-intercept $(0,5)$. $x^2-6x+5=(x-3)^2-4$, so minimum $(3,-4)$.</div></details>
<details class="check"><summary>A quadratic has roots $x=-1$ and $x=7$. What is its line of symmetry?</summary><div>Halfway between them: $x=\dfrac{-1+7}{2}=3$.</div></details>`}
  ],
  worked: [
    { q: M`Solve $2x^2-5x-3=0$ and then solve $x^2-4x-1=0$ to 2 d.p.`,
      steps: [M`First equation: $ac=-6$, need two numbers multiplying to $-6$ and adding to $-5$: $-6$ and $+1$.`, M`$2x^2-6x+x-3=2x(x-3)+1(x-3)=(2x+1)(x-3)=0$, so $x=-\tfrac12$ or $x=3$.`, M`Second equation: $a=1,b=-4,c=-1$. $b^2-4ac=16+4=20$.`, M`$x=\dfrac{4\pm\sqrt{20}}{2}$, giving $x=4.24$ or $x=-0.24$ (2 d.p.).`]},
    { q: M`Write $2x^2-12x+7$ in the form $a(x+b)^2+c$ and state the turning point.`,
      steps: [M`Factor 2 out of the $x$ terms: $2(x^2-6x)+7$.`, M`Complete the square inside: $x^2-6x=(x-3)^2-9$.`, M`$2[(x-3)^2-9]+7=2(x-3)^2-18+7=2(x-3)^2-11$.`, M`Turning point (a minimum, since $a=2>0$) is $(3,-11)$.`]},
    { q: M`Solve simultaneously $y=x+1$ and $x^2+y^2=13$.`,
      steps: [M`Substitute: $x^2+(x+1)^2=13\Rightarrow x^2+x^2+2x+1=13$.`, M`$2x^2+2x-12=0\Rightarrow x^2+x-6=0\Rightarrow(x+3)(x-2)=0$.`, M`$x=2\Rightarrow y=3$, and $x=-3\Rightarrow y=-2$. Solutions: $(2,3)$ and $(-3,-2)$.`]},
    { q: M`Simplify $\dfrac{x^2-9}{x^2+x-6}$.`,
      steps: [M`Top is a difference of two squares: $(x-3)(x+3)$.`, M`Bottom: numbers multiplying to $-6$, adding to $1$: $(x+3)(x-2)$.`, M`Cancel the common factor $(x+3)$: $\dfrac{x-3}{x-2}$.`]},
    { q: M`A right-angled triangle has sides $x$, $x+7$ and hypotenuse $x+8$. Find $x$.`,
      steps: [M`Pythagoras: $x^2+(x+7)^2=(x+8)^2$.`, M`$x^2+x^2+14x+49=x^2+16x+64\Rightarrow x^2-2x-15=0$.`, M`$(x-5)(x+3)=0$, so $x=5$ (a length can't be $-3$). The triangle is 5, 12, 13.`]}
  ],
  formulas: [
    ["Quadratic formula", M`$x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$`],
    ["Discriminant", M`$b^2-4ac$`],
    ["Completed square", M`$a(x-h)^2+k$, turning point $(h,k)$`],
    ["Line of symmetry", M`$x=-\dfrac{b}{2a}$`],
    ["Difference of squares", M`$a^2-b^2=(a-b)(a+b)$`],
    ["Perfect square", M`$(a+b)^2=a^2+2ab+b^2$`]
  ],
  cards: [
    ["What does the discriminant tell you?", M`The number of real roots: $>0$ two, $=0$ one, $<0$ none.`],
    ["Zero-product rule?", M`If $A\times B=0$ then $A=0$ or $B=0$. The equation must equal 0 first.`],
    ["Turning point of $a(x-h)^2+k$?", M`$(h,k)$`],
    ["Factorise $a^2-b^2$", M`$(a-b)(a+b)$`],
    ["Line of symmetry of $y=ax^2+bx+c$?", M`$x=-\dfrac{b}{2a}$`],
    ["$y$-intercept of $y=ax^2+bx+c$?", M`$(0,c)$`],
    ["Expand $(a+b)^2$", M`$a^2+2ab+b^2$. Not $a^2+b^2$.`],
    ["First step in any factorising question?", "Take out the highest common factor."],
    ["The ac method in one sentence", M`Find two numbers that multiply to $ac$ and add to $b$, split the middle term, then factorise in pairs.`],
    ["When does a question want the quadratic formula?", "When it asks for answers to a number of decimal places or significant figures."],
    ["Write the quadratic formula", M`$x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$`],
    ["Complete the square: $x^2+bx$", M`$\left(x+\tfrac b2\right)^2-\left(\tfrac b2\right)^2$`],
    ["Shape of $y=ax^2+bx+c$ when $a<0$?", "∩ shape, with a maximum turning point."],
    ["Why can't you divide both sides of $x^2=5x$ by $x$?", M`You lose the solution $x=0$. Factorise $x(x-5)=0$ instead.`],
    ["Can you cancel $x$ in $\dfrac{x+2}{x+5}$?", "No. You can only cancel factors (things multiplied), not terms."],
    ["Solve $(x-2)^2=9$", M`$x-2=\pm3$, so $x=5$ or $x=-1$.`],
    ["How do you find the $y$ values in linear–quadratic simultaneous equations?", "Substitute each x into the linear equation."],
    ["How many times can a line meet a parabola?", "0, 1 (tangent) or 2 times."],
    ["Using the graph of $y=x^2-2x$, how do you solve $x^2-2x=3$?", M`Draw $y=3$ and read the $x$-coordinates of the intersections.`],
    ["How do you estimate the gradient of a curve at a point?", "Draw a tangent at that point and calculate rise ÷ run."],
    ["Factorise $x^2-x-12$", M`$(x-4)(x+3)$`],
    ["Exact form of $x=\dfrac{6\pm\sqrt{8}}{2}$", M`$3\pm\sqrt2$`],
    ["What do you do with a negative root in a length problem?", "Reject it and state that a length cannot be negative."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`How many real solutions does $x^2-6x+9=0$ have?`, opts: ["0", "1", "2", "3"], ans: 1,
      why: M`$b^2-4ac=36-36=0$, so one repeated root. Indeed $(x-3)^2=0$.` },
    { type: "mcq", marks: 1, q: M`The turning point of $y=(x-2)^2+5$ is`, opts: ["(2, 5)", "(−2, 5)", "(2, −5)", "(5, 2)"], ans: 0,
      why: M`The bracket is zero at $x=2$, and $k=+5$.` },
    { type: "mcq", marks: 2, q: M`Factorise $3x^2-12$ completely.`, opts: ["$3(x-2)(x+2)$", "$3(x-4)(x+1)$", "$(3x-6)(x+2)$", "$3(x^2-4)$"], ans: 0,
      why: M`Take out the common factor $3$ first, then $x^2-4$ is a difference of two squares. Option D is not fully factorised.` },
    { type: "mcq", marks: 1, q: M`Expand $(x-3)^2$.`, opts: ["$x^2-9$", "$x^2+9$", "$x^2-6x+9$", "$x^2-6x-9$"], ans: 2,
      why: M`$(x-3)(x-3)=x^2-3x-3x+9$. Option A is the classic error.` },
    { type: "mcq", marks: 2, q: M`Which equation has <b>no</b> real roots?`, opts: ["$x^2-5x+6=0$", "$x^2+4x+4=0$", "$x^2+2x+5=0$", "$2x^2-x-3=0$"], ans: 2,
      why: M`$b^2-4ac=4-20=-16<0$. Equivalently $(x+1)^2+4\ge4$, so it never reaches 0.` },
    { type: "mcq", marks: 1, q: M`The line of symmetry of $y=2x^2+8x-1$ is`, opts: ["$x=2$", "$x=-2$", "$x=-4$", "$x=4$"], ans: 1,
      why: M`$x=-\dfrac{b}{2a}=-\dfrac{8}{4}=-2$.` },
    { type: "mcq", marks: 2, q: M`Expand $(x+1)(x-2)(x+3)$.`, opts: ["$x^3+2x^2-5x-6$", "$x^3-2x^2-5x+6$", "$x^3+2x^2+5x-6$", "$x^3+4x^2+x-6$"], ans: 0,
      why: M`$(x+1)(x-2)=x^2-x-2$, then $\times(x+3)$: $x^3+3x^2-x^2-3x-2x-6$.` },
    { type: "mcq", marks: 2, q: M`For which positive value of $k$ does $x^2+kx+16=0$ have exactly one root?`, opts: ["4", "8", "16", "32"], ans: 1,
      why: M`Need $k^2-64=0$, so $k=8$. Check: $x^2+8x+16=(x+4)^2$.` },
    { type: "struct", marks: 4, q: M`Solve $3x^2-2x-7=0$. Give your answers correct to 2 decimal places.`,
      ms: M`<b>B1</b> $\sqrt{(-2)^2-4(3)(-7)}$ or better, i.e. $\sqrt{88}$<br><b>M1</b> $\dfrac{-(-2)\pm\sqrt{88}}{2(3)}$ (allow one sign slip in the formula, not both)<br><b>A1</b> $x=1.90$ <b>A1</b> $x=-1.23$<br><i>If both answers are to more than 2 d.p., award B1 M1 A0 A0 + check final rounding.</i>` },
    { type: "struct", marks: 3, q: M`Factorise completely. (a) $2x^2+7x+3$ (b) $18-2x^2$`,
      ms: M`(a) <b>B2</b> $(2x+1)(x+3)$. <i>B1 for brackets giving two correct terms when expanded.</i><br>(b) <b>B1</b> $2(3-x)(3+x)$ (accept $-2(x-3)(x+3)$).` },
    { type: "struct", marks: 4, q: M`(a) Write $x^2-10x+18$ in the form $(x-p)^2-q$. (b) Hence solve $x^2-10x+18=0$, giving your answers in exact form.`,
      ms: M`(a) <b>B1</b> $p=5$ <b>B1</b> $q=7$, so $(x-5)^2-7$.<br>(b) <b>M1</b> $(x-5)^2=7$ so $x-5=\pm\sqrt7$<br><b>A1</b> $x=5+\sqrt7$, $x=5-\sqrt7$.` },
    { type: "struct", marks: 4, q: M`(a) Write $2x^2+12x+5$ in the form $a(x+b)^2+c$. (b) Write down the coordinates of the turning point of $y=2x^2+12x+5$ and state whether it is a maximum or minimum.`,
      ms: M`(a) <b>M1</b> $2(x^2+6x)+5$ or $2[(x+3)^2-9]+5$<br><b>A1</b> $2(x+3)^2-13$<br>(b) <b>B1ft</b> $(-3,-13)$ <b>B1</b> minimum (since $a>0$).` },
    { type: "struct", marks: 5, q: M`Solve the simultaneous equations $y=2x-1$ and $y=x^2-4x+4$.`,
      ms: M`<b>M1</b> $x^2-4x+4=2x-1$<br><b>M1</b> $x^2-6x+5=0$<br><b>M1</b> $(x-1)(x-5)=0$<br><b>A1</b> $x=1,\;y=1$ <b>A1</b> $x=5,\;y=9$` },
    { type: "struct", marks: 5, q: M`A right-angled triangle has sides $x$ cm and $(x+7)$ cm, and hypotenuse $(x+8)$ cm. (a) Show that $x^2-2x-15=0$. (b) Find the perimeter of the triangle.`,
      ms: M`(a) <b>M1</b> $x^2+(x+7)^2=(x+8)^2$ <b>A1</b> correct expansion to $x^2-2x-15=0$ with no errors seen (this is a "show that", so every step is needed).<br>(b) <b>M1</b> $(x-5)(x+3)=0$ <b>A1</b> $x=5$ (reject $-3$) <b>A1</b> perimeter $5+12+13=30$ cm.` },
    { type: "struct", marks: 3, q: M`Simplify fully $\dfrac{x^2-4}{x^2+3x+2}$.`,
      ms: M`<b>B1</b> $(x-2)(x+2)$ <b>B1</b> $(x+1)(x+2)$ <b>B1</b> $\dfrac{x-2}{x+1}$` },
    { type: "struct", marks: 5, q: M`Solve $\dfrac{1}{x}+\dfrac{2}{x+1}=1$. Give your answers correct to 2 decimal places.`,
      ms: M`<b>M1</b> multiply through by $x(x+1)$: $(x+1)+2x=x(x+1)$<br><b>A1</b> $x^2-2x-1=0$<br><b>M1</b> correct use of formula or completing the square: $x=1\pm\sqrt2$<br><b>A1</b> $2.41$ <b>A1</b> $-0.41$` },
    { type: "struct", marks: 5, q: M`The curve $y=x^2-2x-3$ has been drawn for $-2\le x\le4$. (a) Use the graph to solve $x^2-2x-3=2$. (b) By drawing a suitable straight line, solve $x^2-3x-1=0$. (Give answers to 1 d.p.; check by calculation.)`,
      ms: M`(a) <b>M1</b> draw $y=2$ <b>A1</b> $x\approx-1.4$ and $x\approx3.4$ (exact $1\pm\sqrt6$).<br>(b) <b>M1</b> $x^2-2x-3=x-2$, so <b>B1</b> draw $y=x-2$<br><b>A1</b> $x\approx-0.3$ and $x\approx3.3$.` },
    { type: "struct", marks: 3, q: M`Find the range of values of $k$ for which $x^2+4x+k=0$ has two distinct real roots. <i>(Extension)</i>`,
      ms: M`<b>M1</b> $b^2-4ac>0$: $16-4k>0$<br><b>M1</b> $4k<16$<br><b>A1</b> $k<4$` }
  ]
});
}
