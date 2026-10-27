window.TOPICS = window.TOPICS || [];
const M = String.raw;

TOPICS.push({
  id: "quadratics", subject: "maths", title: "Quadratics",
  blurb: "Expanding, factorising, the formula, completing the square and the graph.",
  level: "Core → Extended", demo: "quadratic",
  sections: [
    { h: "What a quadratic really is", body: M`
<p>A quadratic is any expression where the highest power of $x$ is $x^2$: $ax^2+bx+c$ with $a\neq 0$. If $a=0$ the $x^2$ vanishes and it becomes a straight line.</p>
<p>Solving $ax^2+bx+c=0$ means finding the $x$-values where the graph crosses the $x$-axis. These are the <b>roots</b> (or solutions, or zeros). A quadratic has <b>0, 1 or 2</b> real roots, because its graph is a parabola and a parabola can miss, touch or cross a line.</p>
<div class="callout key"><b class="t">Big idea</b>Factorising works because of the <b>zero-product rule</b>: if $A\times B=0$ then $A=0$ or $B=0$. This only works when one side is exactly $0$. Never solve $x^2+3x=10$ by factorising the left side first.</div>`},
    { h: "Method 1: factorising", body: M`
<p>Expanding $(x+p)(x+q)=x^2+(p+q)x+pq$. So to factorise $x^2+bx+c$ you need two numbers that <b>multiply to $c$</b> and <b>add to $b$</b>.</p>
<p>When $a\neq1$ (e.g. $6x^2+7x-3$) use the <b>ac method</b>: multiply $a\times c=-18$, find two numbers that multiply to $-18$ and add to $7$ (those are $9$ and $-2$), split the middle term, then factorise by grouping:</p>
$$6x^2+9x-2x-3=3x(2x+3)-1(2x+3)=(3x-1)(2x+3)$$
<p>Always check by expanding. Always look for a <b>common factor</b> first and for a <b>difference of two squares</b>: $a^2-b^2=(a-b)(a+b)$.</p>`},
    { h: "Method 2: the quadratic formula", body: M`
<p>When it will not factorise nicely (or the question says "give your answer to 2 decimal places") use</p>
$$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$
<p>This is not magic. It comes from completing the square on the general quadratic. The part under the root, $\Delta=b^2-4ac$, is the <b>discriminant</b> and it tells you the number of roots before you solve anything:</p>
<table class="t"><tr><th>Discriminant</th><th>Roots</th><th>Graph</th></tr>
<tr><td>$b^2-4ac>0$</td><td>2 distinct real</td><td>Crosses the $x$-axis twice</td></tr>
<tr><td>$b^2-4ac=0$</td><td>1 repeated</td><td>Touches the axis (vertex on it)</td></tr>
<tr><td>$b^2-4ac<0$</td><td>None real</td><td>Never reaches the axis</td></tr></table>
<div class="callout warn"><b class="t">Common mistakes</b>Forgetting that $-b$ is positive when $b$ is negative. Squaring $b$ incorrectly when $b$ is negative: $(-5)^2=25$, not $-25$. Dividing only part of the numerator by $2a$. Put the whole numerator in brackets on your calculator.</div>`},
    { h: "Method 3: completing the square", body: M`
<p>Rewrite $x^2+bx+c$ as $(x+\tfrac b2)^2+\left(c-\tfrac{b^2}{4}\right)$. Why? Because $(x+\tfrac b2)^2=x^2+bx+\tfrac{b^2}{4}$, so you add and subtract the missing $\tfrac{b^2}{4}$.</p>
<div class="viz" data-viz="completeSquare"></div>
<p>The payoff: in the form $a(x-h)^2+k$ the <b>vertex (turning point) is $(h,k)$</b> and the line of symmetry is $x=h$. A square is never negative, so the minimum value of $(x-h)^2$ is $0$, and the minimum of the whole expression is $k$ (when $a>0$).</p>
<div class="callout tip"><b class="t">Exam tip</b>The sign flips inside the bracket: $(x-3)^2+1$ has its vertex at $(3,1)$, not $(-3,1)$. Think "what $x$ makes the bracket zero?"</div>`},
    { h: "Graph: shape, intercepts, symmetry", body: M`
<ul>
<li><b>Shape:</b> $a>0$ gives a U (minimum). $a<0$ gives an n (maximum). A bigger $|a|$ makes it narrower.</li>
<li><b>$y$-intercept:</b> put $x=0$, giving $y=c$.</li>
<li><b>Roots:</b> where $y=0$.</li>
<li><b>Axis of symmetry:</b> $x=-\dfrac{b}{2a}$, exactly halfway between the roots. Substitute back for the vertex $y$-value.</li>
</ul>
<p>Use the interactive grapher below. Drag $a$, $b$ and $c$ and watch the roots, vertex and discriminant react together.</p>`}
  ],
  worked: [
    { q: M`Solve $2x^2-5x-3=0$ and then solve $x^2-4x-1=0$ to 2 d.p.`,
      steps: [
        M`First equation: $ac=-6$, need two numbers multiplying to $-6$ and adding to $-5$: $-6$ and $+1$.`,
        M`$2x^2-6x+x-3=2x(x-3)+1(x-3)=(2x+1)(x-3)=0$, so $x=-\tfrac12$ or $x=3$.`,
        M`Second equation: $a=1,b=-4,c=-1$. $b^2-4ac=16+4=20$.`,
        M`$x=\dfrac{4\pm\sqrt{20}}{2}$, giving $x=4.24$ or $x=-0.24$ (2 d.p.).`
      ]},
    { q: M`Write $x^2+6x+2$ in the form $(x+p)^2+q$ and state the minimum value.`,
      steps: [
        M`Half of $6$ is $3$, so $(x+3)^2=x^2+6x+9$.`,
        M`We only want $+2$, so subtract $7$: $x^2+6x+2=(x+3)^2-7$.`,
        M`Minimum value is $-7$, occurring at $x=-3$.`
      ]}
  ],
  formulas: [
    ["Quadratic formula", M`$x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$`],
    ["Discriminant", M`$\Delta=b^2-4ac$`],
    ["Completed square", M`$a(x-h)^2+k$, vertex $(h,k)$`],
    ["Axis of symmetry", M`$x=-\dfrac{b}{2a}$`],
    ["Difference of squares", M`$a^2-b^2=(a-b)(a+b)$`],
    ["Sum / product of roots", M`$x_1+x_2=-\dfrac ba,\;x_1x_2=\dfrac ca$`]
  ],
  cards: [
    ["What does the discriminant tell you?", M`The number of real roots: $>0$ two, $=0$ one, $<0$ none.`],
    ["Zero-product rule?", M`If $A\times B=0$ then $A=0$ or $B=0$. Equation must equal 0 first.`],
    ["Vertex of $a(x-h)^2+k$?", M`$(h,k)$`],
    ["Factorise $a^2-b^2$", M`$(a-b)(a+b)$`],
    ["Axis of symmetry of $ax^2+bx+c$?", M`$x=-\dfrac{b}{2a}$`],
    ["What is the $y$-intercept of $ax^2+bx+c$?", M`$y=c$ (set $x=0$)`]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`How many real solutions does $x^2-6x+9=0$ have?`, opts: ["0", "1", "2", "3"], ans: 1,
      why: M`$b^2-4ac=36-36=0$, so one repeated root. Indeed $(x-3)^2=0$.` },
    { type: "mcq", marks: 1, q: M`The vertex of $y=(x-2)^2+5$ is`, opts: ["(2, 5)", "(−2, 5)", "(2, −5)", "(5, 2)"], ans: 0,
      why: M`Bracket is zero at $x=2$, and $k=+5$.` },
    { type: "mcq", marks: 2, q: M`Factorise $3x^2-12$ completely.`, opts: ["$3(x-2)(x+2)$", "$3(x-4)(x+1)$", "$(3x-6)(x+2)$", "$3(x^2-4)$"], ans: 0,
      why: M`Take out the common factor $3$ first, then $x^2-4$ is a difference of squares. Option D is not fully factorised.` },
    { type: "mcq", marks: 2, q: M`For which value of $k$ does $x^2+kx+16=0$ have exactly one root (k > 0)?`, opts: ["4", "8", "16", "32"], ans: 1,
      why: M`Need $k^2-4(1)(16)=0$, so $k^2=64$, $k=8$.` },
    { type: "struct", marks: 4, q: M`Solve $3x^2-2x-7=0$. Give your answers to 2 decimal places.`,
      ms: M`<b>M1</b> correct substitution $a=3,b=-2,c=-7$ into the formula.<br><b>M1</b> $\dfrac{2\pm\sqrt{4+84}}{6}=\dfrac{2\pm\sqrt{88}}{6}$.<br><b>A1</b> $x=1.90$ <b>A1</b> $x=-1.23$` }
  ]
});

TOPICS.push({
  id: "trig", subject: "maths", title: "Trigonometry",
  blurb: "SOH CAH TOA, exact values, sine and cosine rules, area, bearings.",
  level: "Core → Extended", demo: "trig",
  sections: [
    { h: "Why trig works at all", body: M`
<p>Any two right-angled triangles with the same angle $\theta$ are <b>similar</b>, so their side ratios are identical whatever their size. Trigonometry just gives names to those fixed ratios:</p>
$$\sin\theta=\frac{\text{opp}}{\text{hyp}}\qquad\cos\theta=\frac{\text{adj}}{\text{hyp}}\qquad\tan\theta=\frac{\text{opp}}{\text{adj}}$$
<p>"Opposite" and "adjacent" are always relative to the angle you are using, and the <b>hypotenuse is always opposite the right angle</b>. Label the sides before you do anything else.</p>
<div class="viz" data-viz="similar"></div>
<div class="callout key"><b class="t">Which ratio?</b>Circle the two sides involved (one known, one wanted). Whichever pair of O, A, H you circled picks sin, cos or tan.</div>`},
    { h: "Finding sides and angles", body: M`
<p>To find a <b>side</b>, write the equation and rearrange. If the unknown is on top, multiply. If the unknown is in the denominator, it ends up as a division: from $\cos 35^\circ=\dfrac{8}{x}$ you get $x=\dfrac{8}{\cos35^\circ}$.</p>
<p>To find an <b>angle</b>, use the inverse: $\theta=\sin^{-1}\!\left(\dfrac{\text{opp}}{\text{hyp}}\right)$.</p>
<div class="callout warn"><b class="t">Check your calculator</b>It must be in <b>degrees</b> (D or DEG), not radians. This silently loses marks on every trig question.</div>
<h3>Exact values</h3>
<table class="t"><tr><th>$\theta$</th><th>0°</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th></tr>
<tr><td>$\sin$</td><td>0</td><td>$\tfrac12$</td><td>$\tfrac{\sqrt2}{2}$</td><td>$\tfrac{\sqrt3}{2}$</td><td>1</td></tr>
<tr><td>$\cos$</td><td>1</td><td>$\tfrac{\sqrt3}{2}$</td><td>$\tfrac{\sqrt2}{2}$</td><td>$\tfrac12$</td><td>0</td></tr>
<tr><td>$\tan$</td><td>0</td><td>$\tfrac{1}{\sqrt3}$</td><td>1</td><td>$\sqrt3$</td><td>undefined</td></tr></table>
<p>You can rebuild this table: half an equilateral triangle of side 2 gives the 30°/60° values, and an isosceles right triangle with legs 1 gives the 45° values.</p>`},
    { h: "Non-right-angled triangles", body: M`
<p>Label the angles $A,B,C$ and the side opposite each as $a,b,c$.</p>
<ul>
<li><b>Sine rule</b> $\dfrac{a}{\sin A}=\dfrac{b}{\sin B}=\dfrac{c}{\sin C}$. Use when you know a <b>matching side–angle pair</b>.</li>
<li><b>Cosine rule</b> $a^2=b^2+c^2-2bc\cos A$. Use for <b>two sides and the angle between them (SAS)</b>, or <b>all three sides (SSS)</b>.</li>
<li><b>Area</b> $=\tfrac12ab\sin C$. $C$ must be the angle <b>between</b> sides $a$ and $b$.</li>
</ul>
<p>The cosine rule is Pythagoras with a correction term: when $A=90^\circ$, $\cos A=0$ and you get $a^2=b^2+c^2$.</p>
<div class="callout warn"><b class="t">The ambiguous case</b>With the sine rule for an angle, $\sin\theta=k$ has two solutions between 0° and 180°: $\theta$ and $180^\circ-\theta$. If the triangle diagram shows an obtuse angle, take the second.</div>`},
    { h: "Bearings and 3D", body: M`
<p>Bearings are measured <b>clockwise from North</b> and always written with three digits (e.g. 045°). The bearing of B <i>from</i> A means: stand at A, face North, turn clockwise to face B. Draw a North line at each point. Co-interior (allied) angles between parallel North lines add to 180°, and this is how you get "back bearings": add or subtract 180°.</p>
<p>In 3D problems, sketch the right-angled triangle that contains the angle you want. The angle between a line and a plane uses the line, its projection onto the plane, and the perpendicular height.</p>`}
  ],
  worked: [
    { q: M`In triangle $ABC$, $AB=7$ cm, $AC=10$ cm and angle $A=62^\circ$. Find $BC$ and the area.`,
      steps: [
        M`SAS → cosine rule: $a^2=7^2+10^2-2(7)(10)\cos62^\circ$.`,
        M`$a^2=149-140(0.4695)=149-65.73=83.27$, so $BC=9.12$ cm.`,
        M`Area $=\tfrac12(7)(10)\sin62^\circ=35(0.8829)=30.9\text{ cm}^2$.`
      ]},
    { q: M`A ship sails 12 km on a bearing of 040°, then 9 km on a bearing of 130°. How far is it from the start?`,
      steps: [
        M`Turning from 040° to 130° is a turn of $90^\circ$, so the two legs are perpendicular.`,
        M`Pythagoras: $d=\sqrt{12^2+9^2}=\sqrt{225}=15$ km.`
      ]}
  ],
  formulas: [
    ["SOH CAH TOA", M`$\sin=\frac OH,\;\cos=\frac AH,\;\tan=\frac OA$`],
    ["Sine rule", M`$\dfrac{a}{\sin A}=\dfrac{b}{\sin B}$`],
    ["Cosine rule", M`$a^2=b^2+c^2-2bc\cos A$`],
    ["Cosine rule (angle)", M`$\cos A=\dfrac{b^2+c^2-a^2}{2bc}$`],
    ["Area of triangle", M`$\tfrac12ab\sin C$`],
    ["Identity", M`$\tan\theta=\dfrac{\sin\theta}{\cos\theta}$`]
  ],
  cards: [
    ["Write out SOH CAH TOA", M`$\sin=O/H$, $\cos=A/H$, $\tan=O/A$`],
    ["When do you use the cosine rule?", "SAS (two sides and included angle) or SSS (all three sides)."],
    ["When do you use the sine rule?", "When you have a matching side and angle pair, plus one more piece of information."],
    ["Exact value of $\\sin 30^\\circ$", M`$\tfrac12$`],
    ["Exact value of $\\tan 60^\\circ$", M`$\sqrt3$`],
    ["How are bearings measured?", "Clockwise from North, always 3 figures."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`A right-angled triangle has hypotenuse 10 and an angle of 30°. The side opposite the 30° angle is`, opts: ["5", "8.66", "17.3", "3"], ans: 0,
      why: M`$\text{opp}=10\sin30^\circ=5$.` },
    { type: "mcq", marks: 2, q: M`Which rule finds the third side when you know two sides and the angle between them?`, opts: ["Sine rule", "Cosine rule", "Pythagoras", "Area rule"], ans: 1,
      why: M`SAS needs the cosine rule. Sine rule needs a matching side–angle pair, which you do not have.` },
    { type: "mcq", marks: 2, q: M`Area of a triangle with sides 6 and 8 and included angle 30° is`, opts: ["24", "12", "48", "20.8"], ans: 1,
      why: M`$\tfrac12(6)(8)\sin30^\circ=24\times\tfrac12=12$.` },
    { type: "mcq", marks: 2, q: M`The bearing of B from A is 070°. The bearing of A from B is`, opts: ["110°", "250°", "290°", "160°"], ans: 1,
      why: M`Back bearing: $70+180=250^\circ$.` },
    { type: "struct", marks: 4, q: M`A triangle has sides 5 cm, 7 cm and 9 cm. Calculate the largest angle.`,
      ms: M`Largest angle is opposite the longest side (9 cm).<br><b>M1</b> $\cos\theta=\dfrac{5^2+7^2-9^2}{2(5)(7)}$<br><b>A1</b> $=\dfrac{-7}{70}=-0.1$<br><b>M1</b> $\theta=\cos^{-1}(-0.1)$ <b>A1</b> $=95.7^\circ$ (negative cosine means obtuse).` }
  ]
});

TOPICS.push({
  id: "lines", subject: "maths", title: "Straight-line graphs",
  blurb: "Gradient, y = mx + c, parallel and perpendicular lines, midpoints and distance.",
  level: "Core → Extended", demo: "line",
  sections: [
    { h: "Gradient: rate of change", body: M`
<p>Gradient measures steepness: how much $y$ changes for each 1 unit increase in $x$.</p>
$$m=\frac{y_2-y_1}{x_2-x_1}=\frac{\text{rise}}{\text{run}}$$
<p>Positive gradient: line rises left to right. Negative: falls. Zero: horizontal. A vertical line has an undefined gradient and equation $x=k$.</p>
<p>In applied graphs the gradient has <b>units</b>: on a distance–time graph, gradient is speed (m/s). On a speed–time graph, gradient is acceleration and <i>area</i> is distance.</p>`},
    { h: "The equation $y=mx+c$", body: M`
<p>$m$ is the gradient, $c$ is where the line crosses the $y$-axis. To find an equation from a gradient and a point $(x_1,y_1)$ use $y-y_1=m(x-x_1)$ and tidy up.</p>
<p>Lines not already in this form (e.g. $3x+2y=12$) must be rearranged: $y=-\tfrac32x+6$, so the gradient is $-\tfrac32$ (a common trap is reading the gradient as $3$).</p>
<div class="callout key"><b class="t">Parallel and perpendicular</b>Parallel lines have <b>equal gradients</b>. Perpendicular lines have gradients whose <b>product is $-1$</b>: $m_1m_2=-1$. So the perpendicular to gradient $\tfrac23$ has gradient $-\tfrac32$ (flip it and change the sign).</div>
<div class="viz" data-viz="perp"></div>`},
    { h: "Midpoint and length", body: M`
<p>Midpoint of $(x_1,y_1)$ and $(x_2,y_2)$ is the average of each coordinate: $\left(\dfrac{x_1+x_2}{2},\dfrac{y_1+y_2}{2}\right)$.</p>
<p>Length is Pythagoras on the rise and run: $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.</p>
<p>The <b>perpendicular bisector</b> of a segment passes through the midpoint with gradient $-1/m$. This combines everything on this page and is a classic 4–5 mark question.</p>`}
  ],
  worked: [
    { q: M`Find the equation of the perpendicular bisector of $A(1,2)$ and $B(7,6)$.`,
      steps: [
        M`Midpoint: $\left(\tfrac{1+7}{2},\tfrac{2+6}{2}\right)=(4,4)$.`,
        M`Gradient of $AB=\dfrac{6-2}{7-1}=\dfrac23$. Perpendicular gradient $=-\dfrac32$.`,
        M`$y-4=-\tfrac32(x-4)\Rightarrow y=-\tfrac32x+10$.`
      ]}
  ],
  formulas: [
    ["Gradient", M`$m=\dfrac{y_2-y_1}{x_2-x_1}$`],
    ["Line", M`$y=mx+c$`],
    ["Point–gradient", M`$y-y_1=m(x-x_1)$`],
    ["Perpendicular", M`$m_1m_2=-1$`],
    ["Midpoint", M`$\left(\frac{x_1+x_2}2,\frac{y_1+y_2}2\right)$`],
    ["Distance", M`$\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$`]
  ],
  cards: [
    ["Gradient of a line through two points?", M`$\dfrac{y_2-y_1}{x_2-x_1}$`],
    ["Gradient of a line perpendicular to gradient $m$?", M`$-\dfrac1m$`],
    ["What does $c$ mean in $y=mx+c$?", "The $y$-intercept: where the line crosses the $y$-axis."],
    ["Gradient on a speed–time graph?", "Acceleration."],
    ["Equation of a vertical line through $x=3$?", "$x=3$. Its gradient is undefined."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`Gradient of the line through $(1,3)$ and $(5,11)$?`, opts: ["2", "0.5", "3", "−2"], ans: 0, why: M`$\dfrac{11-3}{5-1}=2$.` },
    { type: "mcq", marks: 2, q: M`Which line is parallel to $2y=6x+1$?`, opts: ["$y=6x$", "$y=3x-4$", "$y=-3x$", "$y=\\tfrac13x$"], ans: 1, why: M`Divide by 2: $y=3x+0.5$, gradient 3.` },
    { type: "mcq", marks: 2, q: M`Gradient of a line perpendicular to $y=-4x+1$?`, opts: ["4", "−4", "¼", "−¼"], ans: 2, why: M`Flip and change sign: $-(-4)^{-1}\to\tfrac14$. Check: $-4\times\tfrac14=-1$.` },
    { type: "struct", marks: 3, q: M`Find the equation of the line through $(2,5)$ parallel to $3x+y=4$.`,
      ms: M`<b>M1</b> rearrange: $y=-3x+4$, gradient $-3$.<br><b>M1</b> $y-5=-3(x-2)$<br><b>A1</b> $y=-3x+11$` }
  ]
});
