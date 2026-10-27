window.TOPICS = window.TOPICS || [];
const M = String.raw;

/* ============================================================
   QUADRATICS  (0580 2025–2027: E2.2, E2.3, E2.5, E2.10, E2.11)
   ============================================================ */
TOPICS.push({
  id: "quadratics", subject: "maths", title: "Quadratics",
  blurb: "Expanding, factorising, the formula, completing the square, graphs and simultaneous equations.",
  level: "Core → Extended", demo: "quadratic",
  syllabus: [
    ["E2.2", "Expand products of algebraic expressions, including three binomials", 1],
    ["E2.2", "Factorise: common factor, grouping, difference of two squares, trinomials $ax^2+bx+c$", 2],
    ["E2.2", "Complete the square for expressions of the form $ax^2+bx+c$", 5],
    ["E2.3", "Simplify algebraic fractions by factorising", 2],
    ["E2.5", "Solve quadratic equations by factorisation, completing the square and the quadratic formula", 3],
    ["E2.5", "Form and solve quadratic equations from a context, rejecting impossible solutions", 3],
    ["E2.5", "Solve simultaneous equations where one is linear and one is quadratic", 7],
    ["E2.10", "Draw quadratic graphs from a table and use them to solve equations, including by drawing a suitable line", 6],
    ["E2.11", "Sketch quadratic graphs showing roots, $y$-intercept, turning point and line of symmetry", 6]
  ],
  sections: [
    { h: "What a quadratic really is", body: M`
<p>A quadratic is any expression where the highest power of $x$ is $x^2$: $ax^2+bx+c$ with $a\neq 0$. If $a=0$ the $x^2$ vanishes and it becomes a straight line.</p>
<p>Solving $ax^2+bx+c=0$ means finding the $x$-values where the graph $y=ax^2+bx+c$ crosses the $x$-axis. These are the <b>roots</b> (or solutions, or zeros). A quadratic has <b>0, 1 or 2</b> real roots, because its graph is a parabola and a parabola can miss, touch or cross a line.</p>
<div class="callout key"><b class="t">Big idea</b>Factorising works because of the <b>zero-product rule</b>: if $A\times B=0$ then $A=0$ or $B=0$. This only works when one side is exactly $0$. To solve $x^2+3x=10$ you must first rearrange to $x^2+3x-10=0$.</div>
<p>There are three ways to solve a quadratic. Each has a job:</p>
<table class="t"><tr><th>Method</th><th>Use it when</th></tr>
<tr><td>Factorising</td><td>The numbers are small and it "looks nice". Fastest.</td></tr>
<tr><td>Quadratic formula</td><td>The question says "give your answer to 2 d.p." or "3 s.f.". That phrase means it won't factorise.</td></tr>
<tr><td>Completing the square</td><td>The question says "write in the form $(x+p)^2+q$", "hence solve", or asks for the turning point.</td></tr></table>`},
    { h: "Expanding brackets", body: M`
<p>Every term in the first bracket multiplies every term in the second. A grid makes this impossible to get wrong:</p>
$$(2x-3)(x+5)=2x^2+10x-3x-15=2x^2+7x-15$$
<p>Learn the special products so you recognise them instantly in reverse:</p>
<ul>
<li>$(a+b)^2=a^2+2ab+b^2$. It is <b>not</b> $a^2+b^2$. This is the single most common algebra error.</li>
<li>$(a-b)^2=a^2-2ab+b^2$</li>
<li>$(a+b)(a-b)=a^2-b^2$. The middle terms cancel.</li>
</ul>
<h3>Three brackets</h3>
<p>Expand two brackets first, simplify, then multiply by the third. Keep columns of like terms to avoid losing a term.</p>
$$(x+1)(x-2)(x+3)=(x^2-x-2)(x+3)=x^3+3x^2-x^2-3x-2x-6=x^3+2x^2-5x-6$$
<div class="callout tip"><b class="t">Check trick</b>Substitute $x=1$ into both the brackets and your answer. $(2)(-1)(4)=-8$ and $1+2-5-6=-8$. If they match you are almost certainly right.</div>`},
    { h: "Factorising: every type", body: M`
<p>Factorising is expanding in reverse. Always work through this checklist <b>in order</b>:</p>
<ol>
<li><b>Common factor first.</b> $6x^2-9x=3x(2x-3)$. Forgetting this is the main reason answers are "not fully factorised".</li>
<li><b>Two terms with a minus and both squares?</b> Difference of two squares: $a^2-b^2=(a-b)(a+b)$. E.g. $4x^2-25=(2x-5)(2x+5)$ and $x^4-16=(x^2+4)(x-2)(x+2)$.</li>
<li><b>Three terms, $a=1$?</b> Find two numbers that <b>multiply to $c$</b> and <b>add to $b$</b>: $x^2-x-12=(x-4)(x+3)$.</li>
<li><b>Three terms, $a\neq1$?</b> Use the <b>ac method</b> below.</li>
<li><b>Four terms?</b> Group in pairs: $xy+3x+2y+6=x(y+3)+2(y+3)=(x+2)(y+3)$.</li>
</ol>
<h3>The ac method</h3>
<p>For $6x^2+7x-3$: multiply $a\times c=-18$. Find two numbers that multiply to $-18$ and add to $7$: they are $9$ and $-2$. Split the middle term, then group:</p>
$$6x^2+9x-2x-3=3x(2x+3)-1(2x+3)=(3x-1)(2x+3)$$
<div class="callout key"><b class="t">Why the signs work</b>If $c$ is positive, both numbers have the same sign as $b$. If $c$ is negative, the numbers have opposite signs and the bigger one takes the sign of $b$.</div>
<h3>Algebraic fractions (E2.3)</h3>
<p>You can only cancel <b>factors</b>, never individual terms. So factorise top and bottom completely first:</p>
$$\frac{x^2-9}{x^2+x-6}=\frac{(x-3)(x+3)}{(x+3)(x-2)}=\frac{x-3}{x-2}$$
<div class="callout warn"><b class="t">Classic error</b>$\dfrac{x+3}{x+5}$ does <b>not</b> simplify to $\dfrac35$. The $x$ is added, not multiplied, so it is not a factor.</div>`},
    { h: "Solving by factorising, and forming equations", body: M`
<ol><li>Rearrange so one side is $0$.</li><li>Factorise.</li><li>Set each bracket to $0$.</li></ol>
$$2x^2=5x+3\;\Rightarrow\;2x^2-5x-3=0\;\Rightarrow\;(2x+1)(x-3)=0\;\Rightarrow\;x=-\tfrac12\text{ or }x=3$$
<div class="callout warn"><b class="t">Never divide by $x$</b>Solving $x^2=4x$ by dividing by $x$ gives only $x=4$ and loses $x=0$. Instead: $x^2-4x=0\Rightarrow x(x-4)=0\Rightarrow x=0$ or $4$.</div>
<h3>Forming equations from a context</h3>
<p>Exam questions often hide a quadratic in a story about area, Pythagoras or speed. Write an expression for each quantity, set up the equation, solve, then <b>interpret</b>: a length or time can't be negative, so reject that root and say why.</p>
<p>A rectangle is $3$ cm longer than it is wide and has area $40$ cm². With width $x$: $x(x+3)=40\Rightarrow x^2+3x-40=0\Rightarrow(x+8)(x-5)=0$. So $x=5$, because the width cannot be $-8$.</p>`},
    { h: "The quadratic formula", body: M`
<p>When it will not factorise nicely, use</p>
$$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$
<p>This is not magic. It comes from completing the square on $ax^2+bx+c=0$, the next section. The part under the root, $b^2-4ac$, is called the <b>discriminant</b>. It tells you how many roots there are before you solve anything (this is a useful extension idea beyond the syllabus):</p>
<table class="t"><tr><th>$b^2-4ac$</th><th>Roots</th><th>Graph</th></tr>
<tr><td>$>0$</td><td>2 distinct real</td><td>Crosses the $x$-axis twice</td></tr>
<tr><td>$=0$</td><td>1 repeated</td><td>Touches the axis at its vertex</td></tr>
<tr><td>$<0$</td><td>None real</td><td>Never reaches the axis</td></tr></table>
<p><b>Exact answers:</b> if the question asks for exact form or surd form, leave the root: $x=\dfrac{4\pm\sqrt{20}}{2}=\dfrac{4\pm2\sqrt5}{2}=2\pm\sqrt5$.</p>
<div class="callout warn"><b class="t">Common mistakes</b>Writing $-b$ as negative when $b$ is already negative: if $b=-5$ then $-b=+5$. Squaring a negative: $(-5)^2=25$, not $-25$. On a calculator, type $(-5)^2$ <i>with brackets</i>. Dividing only part of the numerator by $2a$: the fraction line goes under everything. Write down the substituted formula before calculating, because that line earns the method mark even if you slip later.</div>`},
    { h: "Completing the square", body: M`
<p>Rewrite $x^2+bx+c$ as $\left(x+\tfrac b2\right)^2+c-\left(\tfrac b2\right)^2$. Why? Because $\left(x+\tfrac b2\right)^2=x^2+bx+\tfrac{b^2}{4}$, which contains an extra $\tfrac{b^2}{4}$ that you then subtract. You can see it below: the "missing corner" is exactly that extra piece.</p>
<div class="viz" data-viz="completeSquare"></div>
<h3>When $a\neq1$</h3>
<p>Take $a$ out of the $x$ terms only, complete the square inside, then multiply back out:</p>
$$2x^2-12x+7=2(x^2-6x)+7=2\left[(x-3)^2-9\right]+7=2(x-3)^2-11$$
<h3>What it tells you</h3>
<p>In the form $a(x-h)^2+k$ the <b>turning point is $(h,k)$</b> and the line of symmetry is $x=h$. A square is never negative, so if $a>0$ the minimum value is $k$, reached when the bracket is $0$.</p>
<p><b>Solving by completing the square:</b> $(x-3)^2-7=0\Rightarrow(x-3)^2=7\Rightarrow x-3=\pm\sqrt7\Rightarrow x=3\pm\sqrt7$. Don't forget the $\pm$.</p>
<div class="callout tip"><b class="t">Exam tip</b>The sign flips inside the bracket: $(x-3)^2+1$ has its turning point at $(3,1)$, not $(-3,1)$. Ask yourself "what $x$ makes the bracket zero?"</div>`},
    { h: "Graphs: drawing, reading and sketching", body: M`
<ul>
<li><b>Shape:</b> $a>0$ gives a U shape (minimum). $a<0$ gives an ∩ shape (maximum). A bigger $|a|$ makes it narrower.</li>
<li><b>$y$-intercept:</b> put $x=0$, giving $y=c$.</li>
<li><b>Roots:</b> where $y=0$ (factorise or use the formula).</li>
<li><b>Line of symmetry:</b> $x=-\dfrac{b}{2a}$, exactly halfway between the roots.</li>
<li><b>Turning point:</b> substitute the line of symmetry back in, or complete the square.</li>
</ul>
<h3>Drawing from a table (E2.10)</h3>
<p>Calculate $y$ for each $x$ (use brackets on your calculator for negatives: $(-2)^2$). Plot carefully and join with a <b>smooth curve</b>, not straight segments. The bottom of the curve should be rounded and pass between plotted points if the vertex lies between them. Never draw a flat bottom.</p>
<h3>Solving equations with a graph</h3>
<p>If you have drawn $y=x^2-2x-3$:</p>
<ul>
<li>$x^2-2x-3=0$: read where the curve meets $y=0$.</li>
<li>$x^2-2x-3=2$: draw the horizontal line $y=2$ and read the $x$-values at the intersections.</li>
<li>$x^2-3x-1=0$: rearrange so the left side matches your curve: $x^2-2x-3=x-2$. Draw the straight line $y=x-2$ and read the intersections.</li>
</ul>
<div class="callout key"><b class="t">The rule for "draw a suitable line"</b>Write the new equation, then add or subtract terms until one side is exactly the curve you drew. Whatever is left on the other side is the line to draw.</div>
<p><b>Gradient of a curve:</b> draw a tangent at the point (a ruler line that just touches), then use rise ÷ run on a large triangle.</p>
<p>Use the interactive grapher below. Drag $a$, $b$ and $c$ and watch the roots, turning point and discriminant react together.</p>`},
    { h: "Linear–quadratic simultaneous equations", body: M`
<p>A line and a parabola can meet at 0, 1 or 2 points, and the solutions are the coordinates of those intersections.</p>
<ol><li>Rearrange the linear equation to make $x$ or $y$ the subject.</li><li><b>Substitute</b> into the quadratic one.</li><li>Rearrange to $\dots=0$ and solve the quadratic.</li><li>Substitute <b>each</b> $x$ back into the <b>linear</b> equation to get the matching $y$.</li></ol>
<p>Example: $y=x+1$ and $x^2+y^2=13$. Substituting: $x^2+(x+1)^2=13\Rightarrow2x^2+2x-12=0\Rightarrow x^2+x-6=0\Rightarrow(x+3)(x-2)=0$. So $(2,3)$ and $(-3,-2)$.</p>
<div class="callout warn"><b class="t">Lost marks</b>Giving the $x$-values only. Each solution is a <b>pair</b>, so state them as pairs. Expanding $(x+1)^2$ wrongly as $x^2+1$.</div>`}
  ],
  worked: [
    { q: M`Solve $2x^2-5x-3=0$ and then solve $x^2-4x-1=0$ to 2 d.p.`,
      steps: [
        M`First equation: $ac=-6$, need two numbers multiplying to $-6$ and adding to $-5$: $-6$ and $+1$.`,
        M`$2x^2-6x+x-3=2x(x-3)+1(x-3)=(2x+1)(x-3)=0$, so $x=-\tfrac12$ or $x=3$.`,
        M`Second equation: $a=1,b=-4,c=-1$. $b^2-4ac=16+4=20$.`,
        M`$x=\dfrac{4\pm\sqrt{20}}{2}$, giving $x=4.24$ or $x=-0.24$ (2 d.p.).`
      ]},
    { q: M`Write $2x^2-12x+7$ in the form $a(x+b)^2+c$ and state the turning point.`,
      steps: [
        M`Factor 2 out of the $x$ terms: $2(x^2-6x)+7$.`,
        M`Complete the square inside: $x^2-6x=(x-3)^2-9$.`,
        M`$2[(x-3)^2-9]+7=2(x-3)^2-18+7=2(x-3)^2-11$.`,
        M`Turning point (a minimum, since $a=2>0$) is $(3,-11)$.`
      ]},
    { q: M`Solve simultaneously $y=x+1$ and $x^2+y^2=13$.`,
      steps: [
        M`Substitute: $x^2+(x+1)^2=13\Rightarrow x^2+x^2+2x+1=13$.`,
        M`$2x^2+2x-12=0\Rightarrow x^2+x-6=0\Rightarrow(x+3)(x-2)=0$.`,
        M`$x=2\Rightarrow y=3$, and $x=-3\Rightarrow y=-2$. Solutions: $(2,3)$ and $(-3,-2)$.`
      ]},
    { q: M`Simplify $\dfrac{x^2-9}{x^2+x-6}$.`,
      steps: [
        M`Top is a difference of two squares: $(x-3)(x+3)$.`,
        M`Bottom: numbers multiplying to $-6$, adding to $1$: $(x+3)(x-2)$.`,
        M`Cancel the common factor $(x+3)$: $\dfrac{x-3}{x-2}$.`
      ]},
    { q: M`A right-angled triangle has sides $x$, $x+7$ and hypotenuse $x+8$. Find $x$.`,
      steps: [
        M`Pythagoras: $x^2+(x+7)^2=(x+8)^2$.`,
        M`$x^2+x^2+14x+49=x^2+16x+64\Rightarrow x^2-2x-15=0$.`,
        M`$(x-5)(x+3)=0$, so $x=5$ (a length can't be $-3$). The triangle is 5, 12, 13.`
      ]}
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

/* ============================================================
   TRIGONOMETRY  (0580: E6.1–E6.6, E4.3 bearings)
   ============================================================ */
TOPICS.push({
  id: "trig", subject: "maths", title: "Trigonometry",
  blurb: "Pythagoras, SOH CAH TOA, exact values, trig graphs, sine and cosine rules, bearings and 3D.",
  level: "Core → Extended", demo: "trig",
  syllabus: [
    ["E6.1", "Know and use Pythagoras' theorem", 1],
    ["E6.2", "Use sine, cosine and tangent ratios in right-angled triangles to find lengths and angles", 2],
    ["E6.2", "Solve problems involving angles of elevation and depression", 2],
    ["E6.3", "Know the exact values of sin, cos and tan of 0°, 30°, 45°, 60° and 90°", 3],
    ["E6.4", "Recognise, sketch and interpret the graphs of $y=\\sin x$, $y=\\cos x$ and $y=\\tan x$ for $0^\\circ\\le x\\le360^\\circ$", 4],
    ["E6.4", "Solve trigonometric equations such as $\\sin x=k$ for $0^\\circ\\le x\\le360^\\circ$", 4],
    ["E6.5", "Use the sine rule, including the ambiguous case", 5],
    ["E6.5", "Use the cosine rule to find sides and angles", 5],
    ["E6.5", "Use the formula area $=\\tfrac12ab\\sin C$", 5],
    ["E4.3", "Use three-figure bearings and scale drawings", 6],
    ["E6.6", "Use Pythagoras and trigonometry in 3D, including the angle between a line and a plane", 7]
  ],
  sections: [
    { h: "Why trig works at all", body: M`
<p>Any two right-angled triangles with the same angle $\theta$ are <b>similar</b>, so their side ratios are identical whatever their size. Trigonometry just gives names to those fixed ratios:</p>
$$\sin\theta=\frac{\text{opp}}{\text{hyp}}\qquad\cos\theta=\frac{\text{adj}}{\text{hyp}}\qquad\tan\theta=\frac{\text{opp}}{\text{adj}}$$
<div class="viz" data-viz="similar"></div>
<p>"Opposite" and "adjacent" are always relative to the angle you are using, and the <b>hypotenuse is always opposite the right angle</b> (it is the longest side). Label the sides before you do anything else.</p>
<div class="callout key"><b class="t">Which ratio?</b>Circle the two sides involved (one known, one wanted). Whichever pair of O, A, H you circled picks sin, cos or tan. Pythagoras needs no angle at all: use it when you have two sides and want the third.</div>`},
    { h: "Pythagoras' theorem", body: M`
$$a^2+b^2=c^2\quad(c\text{ is the hypotenuse})$$
<p>To find the hypotenuse, <b>add</b> the squares. To find a shorter side, <b>subtract</b>: $a=\sqrt{c^2-b^2}$. A quick sense check: the hypotenuse must be the longest side.</p>
<p><b>Why it's true:</b> four copies of the triangle arranged inside a square of side $a+b$ leave a tilted square of area $c^2$ in the middle. So $(a+b)^2=4\cdot\tfrac12ab+c^2$, which simplifies to $a^2+b^2=c^2$.</p>
<p><b>Converse:</b> if $a^2+b^2=c^2$ for a triangle's sides, then it has a right angle. You'll use this to prove a triangle is right-angled.</p>
<p>Common Pythagorean triples to recognise: $3,4,5$; $5,12,13$; $8,15,17$; $7,24,25$, and their multiples, e.g. $6,8,10$.</p>`},
    { h: "Right-angled triangles, elevation and depression", body: M`
<p>To find a <b>side</b>, write the equation and rearrange. If the unknown is on top, multiply. If the unknown is in the denominator, it ends up as a division: from $\cos35^\circ=\dfrac{8}{x}$ you get $x=\dfrac{8}{\cos35^\circ}$.</p>
<p>To find an <b>angle</b>, use the inverse: $\theta=\sin^{-1}\!\left(\dfrac{\text{opp}}{\text{hyp}}\right)$.</p>
<div class="callout warn"><b class="t">Check your calculator</b>It must be in <b>degrees</b> (D or DEG), not radians. Quick check: $\sin30$ should give $0.5$. Also keep full calculator values until the final answer. Rounding an intermediate value to 3 s.f. can make your final answer wrong.</div>
<h3>Angles of elevation and depression</h3>
<p>Both are measured <b>from the horizontal</b>. Elevation means looking <i>up</i> from the horizontal and depression means looking <i>down</i>. Because the horizontals at the top and bottom are parallel, the angle of depression from A to B <b>equals</b> the angle of elevation from B to A (alternate angles).</p>
<p>A tower seen from 40 m away at an elevation of 32° has height $40\tan32^\circ=25.0$ m.</p>
<p>The <b>shortest distance</b> from a point to a line is the perpendicular distance. This is often how you get the right angle you need.</p>`},
    { h: "Exact values", body: M`
<table class="t"><tr><th>$\theta$</th><th>0°</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th></tr>
<tr><td>$\sin$</td><td>0</td><td>$\tfrac12$</td><td>$\tfrac{\sqrt2}{2}$</td><td>$\tfrac{\sqrt3}{2}$</td><td>1</td></tr>
<tr><td>$\cos$</td><td>1</td><td>$\tfrac{\sqrt3}{2}$</td><td>$\tfrac{\sqrt2}{2}$</td><td>$\tfrac12$</td><td>0</td></tr>
<tr><td>$\tan$</td><td>0</td><td>$\tfrac{1}{\sqrt3}=\tfrac{\sqrt3}{3}$</td><td>1</td><td>$\sqrt3$</td><td>undefined</td></tr></table>
<p>Don't memorise blindly. Rebuild the table from two triangles:</p>
<ul><li><b>Half an equilateral triangle</b> of side 2: angles 30°, 60°, 90°, sides $1,\sqrt3,2$. That gives every 30° and 60° value.</li>
<li><b>Isosceles right triangle</b> with legs 1: angles 45°, 45°, hypotenuse $\sqrt2$. That gives $\sin45=\cos45=\tfrac1{\sqrt2}$ and $\tan45=1$.</li></ul>
<div class="callout tip"><b class="t">Pattern</b>The sin row reads $\tfrac{\sqrt0}{2},\tfrac{\sqrt1}{2},\tfrac{\sqrt2}{2},\tfrac{\sqrt3}{2},\tfrac{\sqrt4}{2}$. The cos row is the same list backwards.</div>`},
    { h: "Trig graphs and equations", body: M`
<p>Imagine a point moving round a circle of radius 1. Its <b>height</b> is $\sin\theta$ and its <b>horizontal position</b> is $\cos\theta$. Plot those against the angle and you get the graphs. Watch it happen:</p>
<div class="viz" data-viz="trigGraph"></div>
<table class="t"><tr><th></th><th>$y=\sin x$</th><th>$y=\cos x$</th><th>$y=\tan x$</th></tr>
<tr><td>Starts at</td><td>(0, 0)</td><td>(0, 1)</td><td>(0, 0)</td></tr>
<tr><td>Range</td><td>$-1\le y\le1$</td><td>$-1\le y\le1$</td><td>all values</td></tr>
<tr><td>Repeats every</td><td>360°</td><td>360°</td><td>180°</td></tr>
<tr><td>Key points</td><td>max at 90°, min at 270°</td><td>min at 180°</td><td>asymptotes at 90°, 270°</td></tr></table>
<h3>Solving $\sin x=k$ for $0^\circ\le x\le360^\circ$</h3>
<p>Your calculator gives only <b>one</b> answer (the principal value). The graph's symmetry gives the rest:</p>
<ul><li>$\sin x=k$: $x$ and $180^\circ-x$</li><li>$\cos x=k$: $x$ and $360^\circ-x$</li><li>$\tan x=k$: $x$ and $x+180^\circ$</li></ul>
<p>Then add or subtract 360° to bring any answers into the range. Example: $\sin x=-0.4$ gives $\sin^{-1}(-0.4)=-23.6^\circ$, which is out of range. The solutions in range are $180+23.6=203.6^\circ$ and $360-23.6=336.4^\circ$.</p>
<div class="callout key"><b class="t">Sketch first</b>Draw the graph and the horizontal line $y=k$. Count the intersections in range. That tells you how many answers you need before you start.</div>`},
    { h: "Non-right-angled triangles", body: M`
<p>Label the angles $A,B,C$ and the side opposite each as $a,b,c$ (lowercase opposite uppercase).</p>
<ul>
<li><b>Sine rule</b> $\dfrac{a}{\sin A}=\dfrac{b}{\sin B}=\dfrac{c}{\sin C}$. Use when you know a <b>matching side–angle pair</b> plus one more fact. Put the unknown on top: to find a side use $\dfrac{a}{\sin A}=\dots$, and to find an angle flip it to $\dfrac{\sin A}{a}=\dots$</li>
<li><b>Cosine rule</b> $a^2=b^2+c^2-2bc\cos A$. Use for <b>two sides and the angle between them (SAS)</b>, or <b>all three sides (SSS)</b>, rearranged as $\cos A=\dfrac{b^2+c^2-a^2}{2bc}$.</li>
<li><b>Area</b> $=\tfrac12ab\sin C$, where $C$ must be the angle <b>between</b> sides $a$ and $b$.</li>
</ul>
<p>The cosine rule is Pythagoras with a correction term: when $A=90^\circ$, $\cos A=0$ and you get $a^2=b^2+c^2$. A negative cosine means the angle is obtuse, and the calculator handles that automatically.</p>
<div class="callout warn"><b class="t">The ambiguous case</b>When you use the sine rule to find an <b>angle</b>, $\sin\theta=k$ has two solutions between 0° and 180°: $\theta$ and $180^\circ-\theta$. Both are valid triangles if the second one plus the known angle is still less than 180°. Read the diagram: if the angle looks obtuse, give the obtuse one.</div>
<div class="callout warn"><b class="t">Calculator trap</b>For $a^2=49+100-140\cos62^\circ$, do not type 49 + 100 − 140 and then multiply by cos. Type it exactly as written, because BIDMAS does the $\cos$ multiplication first.</div>`},
    { h: "Bearings", body: M`
<p>Bearings are measured <b>clockwise from North</b> and always written with <b>three figures</b> (045°, not 45°). "The bearing of B <i>from</i> A" means: stand at A, face North, turn clockwise until you face B.</p>
<ol><li>Draw a North arrow at <b>every</b> point you use.</li>
<li>North lines are parallel, so <b>co-interior angles add to 180°</b> and <b>alternate angles are equal</b>.</li>
<li>Back bearing: the bearing of A from B is the bearing of B from A <b>± 180°</b>.</li></ol>
<p>Bearing questions are really triangle questions. Find the angle <i>inside</i> the triangle, use Pythagoras, SOHCAHTOA, the sine rule or the cosine rule, then convert back to a bearing.</p>
<p>In scale drawings, use a ruler and protractor, and convert using the scale (e.g. 1 cm : 2 km).</p>`},
    { h: "3D problems", body: M`
<p>Every 3D question is a 2D question in disguise: find the right-angled triangle that contains the length or angle you want, and sketch it flat.</p>
<ul><li><b>Space diagonal of a cuboid</b> $a\times b\times c$: $d=\sqrt{a^2+b^2+c^2}$ (Pythagoras twice).</li>
<li><b>Angle between a line and a plane</b>: drop a perpendicular from the top end of the line to the plane. The angle is between the line and its <b>projection</b> (shadow) on the plane. The triangle is <i>line, projection, perpendicular height</i>.</li></ul>
<p>For a cuboid $6\times4\times3$ with diagonal $AG$: the base diagonal is $\sqrt{6^2+4^2}=\sqrt{52}$, and the angle with the base is $\tan^{-1}\!\left(\dfrac{3}{\sqrt{52}}\right)=22.6^\circ$.</p>`}
  ],
  worked: [
    { q: M`In triangle $ABC$, $AB=7$ cm, $AC=10$ cm and angle $A=62^\circ$. Find $BC$ and the area.`,
      steps: [
        M`SAS → cosine rule: $a^2=7^2+10^2-2(7)(10)\cos62^\circ$.`,
        M`$a^2=149-140(0.46947)=149-65.73=83.27$, so $BC=\sqrt{83.27}=9.13$ cm.`,
        M`Area $=\tfrac12(7)(10)\sin62^\circ=35(0.88295)=30.9\text{ cm}^2$.`
      ]},
    { q: M`Solve $\sin x=-0.4$ for $0^\circ\le x\le360^\circ$.`,
      steps: [
        M`Calculator: $\sin^{-1}(-0.4)=-23.6^\circ$. Not in range, but it's our reference.`,
        M`$\sin$ is negative in the 3rd and 4th quarters (180°–360°), so there are two answers.`,
        M`$x=180^\circ+23.6^\circ=203.6^\circ$ and $x=360^\circ-23.6^\circ=336.4^\circ$.`
      ]},
    { q: M`A ship sails 12 km on a bearing of 040°, then 9 km on a bearing of 130°. How far is it from the start?`,
      steps: [
        M`Turning from 040° to 130° is a turn of $90^\circ$, so the two legs are perpendicular.`,
        M`Pythagoras: $d=\sqrt{12^2+9^2}=\sqrt{225}=15$ km.`
      ]},
    { q: M`In triangle $ABC$, $a=7$ cm, $b=9$ cm and $A=40^\circ$. Find the possible values of angle $B$.`,
      steps: [
        M`Sine rule for an angle: $\dfrac{\sin B}{9}=\dfrac{\sin40^\circ}{7}\Rightarrow\sin B=0.8264$.`,
        M`$B=55.7^\circ$ or $B=180^\circ-55.7^\circ=124.3^\circ$.`,
        M`Check: $124.3^\circ+40^\circ<180^\circ$, so <b>both</b> triangles exist. This is the ambiguous case.`
      ]},
    { q: M`From a point $P$ the angle of elevation of the top of a tower is 30°. Walking 20 m closer, it is 45°. Find the height.`,
      steps: [
        M`Let the original distance be $d$. Then $h=d\tan30^\circ=\dfrac{d}{\sqrt3}$ and $h=(d-20)\tan45^\circ=d-20$.`,
        M`$\dfrac{d}{\sqrt3}=d-20\Rightarrow d\left(1-\tfrac1{\sqrt3}\right)=20\Rightarrow d=47.32$.`,
        M`$h=47.32-20=27.3$ m.`
      ]}
  ],
  formulas: [
    ["Pythagoras", M`$a^2+b^2=c^2$`],
    ["SOH CAH TOA", M`$\sin=\frac OH,\;\cos=\frac AH,\;\tan=\frac OA$`],
    ["Sine rule", M`$\dfrac{a}{\sin A}=\dfrac{b}{\sin B}=\dfrac{c}{\sin C}$`],
    ["Cosine rule", M`$a^2=b^2+c^2-2bc\cos A$`],
    ["Cosine rule (angle)", M`$\cos A=\dfrac{b^2+c^2-a^2}{2bc}$`],
    ["Area of triangle", M`$\tfrac12ab\sin C$`],
    ["Space diagonal", M`$d=\sqrt{a^2+b^2+c^2}$`]
  ],
  cards: [
    ["Write out SOH CAH TOA", M`$\sin=O/H$, $\cos=A/H$, $\tan=O/A$`],
    ["When do you use the cosine rule?", "SAS (two sides and the included angle) or SSS (all three sides)."],
    ["When do you use the sine rule?", "When you know a matching side and angle pair, plus one more piece of information."],
    ["Exact value of $\\sin 30^\\circ$", M`$\tfrac12$`],
    ["Exact value of $\\cos 30^\\circ$", M`$\tfrac{\sqrt3}{2}$`],
    ["Exact value of $\\tan 60^\\circ$", M`$\sqrt3$`],
    ["Exact value of $\\sin 45^\\circ$", M`$\tfrac{\sqrt2}{2}=\tfrac1{\sqrt2}$`],
    ["Exact value of $\\tan 30^\\circ$", M`$\tfrac{1}{\sqrt3}=\tfrac{\sqrt3}{3}$`],
    ["How are bearings measured?", "Clockwise from North, always with 3 figures."],
    ["Back bearing rule", "Add or subtract 180°."],
    ["Angle of elevation vs depression", "Both are measured from the horizontal. Elevation looks up, depression looks down, and they are equal (alternate angles)."],
    ["Second solution of $\\sin x=k$ (0–360°)", M`$180^\circ-x$`],
    ["Second solution of $\\cos x=k$ (0–360°)", M`$360^\circ-x$`],
    ["Second solution of $\\tan x=k$ (0–360°)", M`$x+180^\circ$`],
    ["Period of $y=\\tan x$", "180°"],
    ["Where does $y=\\tan x$ have asymptotes (0–360°)?", "At x = 90° and x = 270°."],
    ["Maximum and minimum of $y=\\sin x$", "Max 1 at 90°, min −1 at 270°."],
    ["What is the ambiguous case?", M`Using the sine rule to find an angle: both $\theta$ and $180^\circ-\theta$ may give valid triangles.`],
    ["Area of a triangle with no height given", M`$\tfrac12ab\sin C$, with $C$ between sides $a$ and $b$.`],
    ["Angle between a line and a plane", "The angle between the line and its projection (shadow) on the plane."],
    ["Space diagonal of an $a\\times b\\times c$ cuboid", M`$\sqrt{a^2+b^2+c^2}$`],
    ["Converse of Pythagoras", M`If $a^2+b^2=c^2$, the triangle has a right angle opposite $c$.`],
    ["A negative cosine means the angle is…", "Obtuse (between 90° and 180°)."],
    ["Shortest distance from a point to a line", "The perpendicular distance."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`A right-angled triangle has hypotenuse 10 and an angle of 30°. The side opposite the 30° angle is`, opts: ["5", "8.66", "17.3", "3"], ans: 0,
      why: M`$\text{opp}=10\sin30^\circ=5$.` },
    { type: "mcq", marks: 1, q: M`Which rule finds the third side when you know two sides and the angle between them?`, opts: ["Sine rule", "Cosine rule", "Pythagoras", "Area rule"], ans: 1,
      why: M`SAS needs the cosine rule. The sine rule needs a matching side–angle pair, which you do not have.` },
    { type: "mcq", marks: 2, q: M`The area of a triangle with sides 6 cm and 8 cm and included angle 30° is`, opts: ["24 cm²", "12 cm²", "48 cm²", "20.8 cm²"], ans: 1,
      why: M`$\tfrac12(6)(8)\sin30^\circ=24\times\tfrac12=12$.` },
    { type: "mcq", marks: 1, q: M`The bearing of B from A is 070°. The bearing of A from B is`, opts: ["110°", "250°", "290°", "160°"], ans: 1,
      why: M`Back bearing: $70^\circ+180^\circ=250^\circ$.` },
    { type: "mcq", marks: 1, q: M`The solutions of $\cos x=0.5$ for $0^\circ\le x\le360^\circ$ are`, opts: ["60° and 120°", "60° and 300°", "30° and 150°", "60° and 240°"], ans: 1,
      why: M`$\cos^{-1}0.5=60^\circ$. Cos is symmetric about 180°, so the other is $360-60=300^\circ$.` },
    { type: "mcq", marks: 2, q: M`From the top of a 50 m cliff, the angle of depression of a boat is 20°. How far is the boat from the foot of the cliff?`, opts: ["18.2 m", "47.0 m", "137 m", "146 m"], ans: 2,
      why: M`The angle of elevation from the boat is also 20°. $\tan20^\circ=\dfrac{50}{d}\Rightarrow d=\dfrac{50}{\tan20^\circ}=137$ m. 146 m is the line-of-sight distance $50/\sin20^\circ$.` },
    { type: "mcq", marks: 1, q: M`The graph of $y=\tan x$ repeats every`, opts: ["90°", "180°", "360°", "720°"], ans: 1,
      why: M`$\tan(x+180^\circ)=\tan x$, so the period is 180°.` },
    { type: "mcq", marks: 1, q: M`Which set of sides makes a right-angled triangle?`, opts: ["5, 12, 14", "8, 15, 17", "6, 8, 11", "7, 24, 26"], ans: 1,
      why: M`$8^2+15^2=64+225=289=17^2$.` },
    { type: "struct", marks: 4, q: M`A triangle has sides 5 cm, 7 cm and 9 cm. Calculate the size of the largest angle.`,
      ms: M`The largest angle is opposite the longest side (9 cm).<br><b>M2</b> $\cos\theta=\dfrac{5^2+7^2-9^2}{2(5)(7)}$ (M1 for a correct cosine rule with one error)<br><b>A1</b> $=\dfrac{-7}{70}=-0.1$<br><b>A1</b> $\theta=95.7^\circ$ (a negative cosine means obtuse).` },
    { type: "struct", marks: 4, q: M`A 6 m ladder leans against a vertical wall and reaches 5.2 m up the wall. Find (a) the angle the ladder makes with the ground, (b) the distance of its foot from the wall.`,
      ms: M`(a) <b>M1</b> $\sin\theta=\dfrac{5.2}{6}$ <b>A1</b> $60.1^\circ$<br>(b) <b>M1</b> $\sqrt{6^2-5.2^2}$ or $6\cos60.07^\circ$ <b>A1</b> $2.99$ m` },
    { type: "struct", marks: 2, q: M`Without a calculator, find the exact value of $\sin60^\circ\times\tan30^\circ$.`,
      ms: M`<b>M1</b> $\dfrac{\sqrt3}{2}\times\dfrac{1}{\sqrt3}$ <b>A1</b> $\dfrac12$` },
    { type: "struct", marks: 3, q: M`Solve $2\sin x+1=0$ for $0^\circ\le x\le360^\circ$.`,
      ms: M`<b>M1</b> $\sin x=-\tfrac12$<br><b>A1</b> $210^\circ$ <b>A1</b> $330^\circ$<br><i>Subtract 1 mark for each extra answer in range.</i>` },
    { type: "struct", marks: 2, q: M`Solve $\tan x=2$ for $0^\circ\le x\le360^\circ$.`,
      ms: M`<b>B1</b> $63.4^\circ$ <b>B1</b> $243.4^\circ$ (i.e. $63.4+180$)` },
    { type: "struct", marks: 3, q: M`In triangle $ABC$, $A=48^\circ$, $B=71^\circ$ and $a=12$ cm. Find $b$.`,
      ms: M`<b>M1</b> $\dfrac{b}{\sin71^\circ}=\dfrac{12}{\sin48^\circ}$ <b>M1</b> $b=\dfrac{12\sin71^\circ}{\sin48^\circ}$ <b>A1</b> $15.3$ cm` },
    { type: "struct", marks: 4, q: M`In triangle $PQR$, $p=8$ cm, $q=11$ cm and $P=35^\circ$. Find the two possible values of angle $Q$.`,
      ms: M`<b>M1</b> $\sin Q=\dfrac{11\sin35^\circ}{8}$ <b>A1</b> $=0.7887$<br><b>A1</b> $Q=52.1^\circ$ <b>A1</b> $Q=127.9^\circ$ (valid since $127.9+35<180$)` },
    { type: "struct", marks: 3, q: M`A triangle has area 30 cm² and two sides of 8 cm and 10 cm. Find the acute angle between them.`,
      ms: M`<b>M1</b> $\tfrac12(8)(10)\sin C=30$ <b>M1</b> $\sin C=0.75$ <b>A1</b> $48.6^\circ$` },
    { type: "struct", marks: 5, q: M`A boat sails 8 km from A to B on a bearing of 060°, then 5 km from B to C on a bearing of 150°. Find (a) the distance AC, (b) the bearing of C from A.`,
      ms: M`(a) <b>B1</b> angle $ABC=90^\circ$ (the bearing changes by 90°) <b>M1</b> $\sqrt{8^2+5^2}$ <b>A1</b> $9.43$ km<br>(b) <b>M1</b> angle $BAC=\tan^{-1}\!\tfrac58=32.0^\circ$ <b>A1</b> bearing $060+32=092^\circ$` },
    { type: "struct", marks: 4, q: M`A square-based pyramid has base 8 cm × 8 cm and its apex is 10 cm vertically above the centre of the base. Find the angle between a sloping edge and the base.`,
      ms: M`<b>M1</b> half the base diagonal $=\tfrac12\sqrt{8^2+8^2}=5.657$<br><b>M1</b> recognise the triangle: height 10, horizontal 5.657<br><b>M1</b> $\tan\theta=\dfrac{10}{5.657}$ <b>A1</b> $60.5^\circ$` },
    { type: "struct", marks: 5, q: M`From a point P, the angle of elevation of the top of a tower is 30°. From a point 20 m closer, it is 45°. Find the height of the tower.`,
      ms: M`<b>M1</b> $h=d\tan30^\circ$ <b>M1</b> $h=(d-20)\tan45^\circ$<br><b>M1</b> eliminate: $\dfrac{d}{\sqrt3}=d-20$ <b>A1</b> $d=47.3$ <b>A1</b> $h=27.3$ m` }
  ]
});

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
