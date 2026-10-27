window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;

/* ============================================================
   DIFFERENTIATION  (0580: E2.13)
   ============================================================ */
TOPICS.push({
  id: "differentiation", subject: "maths", unit: 2, title: "Differentiation",
  blurb: "The gradient function, differentiating powers of x, finding turning points and distinguishing maxima and minima, tangents and normals, and applying differentiation to kinematics.",
  level: "Extended only", demo: "derivative",
  syllabus: [
    ["E2.13", "Estimate the gradient of a curve by drawing a tangent (see Graphs)", 0],
    ["E2.13", "Use the derivative of functions of the form axⁿ, and simple sums of these", 1],
    ["E2.13", "Apply differentiation to gradients and turning points (maxima and minima)", 2],
    ["E2.13", "Discriminate between maxima and minima using the second derivative or another method", 3],
    ["E2.13", "Apply calculus to kinematics problems involving displacement, velocity and acceleration", 5]
  ],
  sections: [
    { h: "From chords to the gradient function", body: M`
<p class="lead">The gradient of a curve changes from point to point. <b>Differentiation</b> is a method that gives a new function, $f'(x)$ (or $\dfrac{dy}{dx}$), which tells you the gradient of $y=f(x)$ at <b>any</b> value of $x$, instantly — no drawing required.</p>
<div class="viz" data-viz="chordLimit"></div>
<p>The idea: take two close points on the curve, $A=(a, f(a))$ and $B=(a+h, f(a+h))$. The gradient of the chord $AB$ is $\dfrac{f(a+h)-f(a)}{h}$. As $h\to0$, $B$ slides onto $A$ and the chord becomes the <b>tangent</b>. This limit is the derivative.</p>
<p>You never need to do this limit process by hand in IGCSE — there is a simple <b>rule</b>.</p>`},

    { h: "The rule for differentiating $x^n$ (E2.13)", body: M`
<div class="callout key"><b class="t">The rule</b>If $y=ax^n$, then $\dfrac{dy}{dx}=anx^{n-1}$: <b>multiply by the old power, reduce the power by 1.</b></div>
<p>Differentiate term by term; a constant on its own differentiates to <b>0</b> (it has zero gradient — a horizontal line).</p>
<table class="t"><tr><th>$y$</th><th>$\dfrac{dy}{dx}$</th></tr>
<tr><td>$x^3$</td><td>$3x^2$</td></tr><tr><td>$5x^4$</td><td>$20x^3$</td></tr><tr><td>$7x$</td><td>$7$</td></tr><tr><td>$9$ (constant)</td><td>$0$</td></tr>
<tr><td>$x^2+3x-5$</td><td>$2x+3$</td></tr><tr><td>$4x^3-2x^2+6$</td><td>$12x^2-4x$</td></tr>
<tr><td>$\dfrac{1}{x}=x^{-1}$</td><td>$-x^{-2}=-\dfrac{1}{x^2}$</td></tr><tr><td>$\dfrac{3}{x^2}=3x^{-2}$</td><td>$-6x^{-3}=-\dfrac{6}{x^3}$</td></tr></table>
<div class="callout warn"><b class="t">Prepare first</b>Expand brackets or split fractions before differentiating: $y=x(x+3)=x^2+3x\Rightarrow\dfrac{dy}{dx}=2x+3$. You cannot differentiate a product term-by-term without expanding.</div>
<p><b>Evaluating the gradient at a point:</b> for $y=x^3-4x$, $\dfrac{dy}{dx}=3x^2-4$. At $x=2$: gradient $=3(4)-4=8$.</p>
<details class="check"><summary>Differentiate $y=5x^2-\dfrac{2}{x}+7$.</summary><div>$y=5x^2-2x^{-1}+7$; $\dfrac{dy}{dx}=10x+2x^{-2}=10x+\dfrac{2}{x^2}$.</div></details>
<p>Explore the gradient function for any cubic in the <b>lab</b> at the bottom of the page.</p>`},

    { h: "Tangents and normals (E2.13)", body: M`
<p>To find the equation of the <b>tangent</b> at a point on a curve:</p>
<ol class="steps"><li>Differentiate to get $\dfrac{dy}{dx}$.</li><li>Substitute the $x$-value to find the gradient $m$ there.</li><li>Find the $y$-value by substituting into the original equation.</li><li>Use $y-y_1=m(x-x_1)$.</li></ol>
<div class="callout ex"><b class="t">Example</b>Find the tangent to $y=x^2-3x+1$ at $x=4$.<br>$\dfrac{dy}{dx}=2x-3$; at $x=4$: $m=5$. $y=16-12+1=5$, so the point is $(4,5)$.<br>$y-5=5(x-4)\Rightarrow y=5x-15$.</div>
<p>The <b>normal</b> is perpendicular to the tangent at that point: gradient $=-\dfrac{1}{m}$ (see <i>Straight-line graphs</i>). At $(4,5)$: normal gradient $-\tfrac15$, so $y-5=-\tfrac15(x-4)\Rightarrow y=-\tfrac15x+\tfrac{29}{5}$.</p>`},

    { h: "Turning points: maxima and minima (E2.13)", body: M`
<p class="lead">At a <b>turning point</b> (maximum or minimum), the gradient is <b>zero</b>: the tangent is horizontal.</p>
<ol class="steps"><li>Differentiate: find $\dfrac{dy}{dx}$.</li><li>Set $\dfrac{dy}{dx}=0$ and solve for $x$.</li><li>Substitute back into $y=f(x)$ to find the $y$-coordinate.</li></ol>
<div class="callout ex"><b class="t">Example</b>Find the turning point of $y=x^2-6x+5$.<br>$\dfrac{dy}{dx}=2x-6=0\Rightarrow x=3$. $y=9-18+5=-4$. Turning point $(3,-4)$ — a minimum (matches completing the square: $y=(x-3)^2-4$).</div>
<p>A cubic can have <b>two</b> turning points (or none): solve the resulting quadratic $\dfrac{dy}{dx}=0$.</p>
$$y=x^3-3x^2-9x+2:\quad \frac{dy}{dx}=3x^2-6x-9=3(x-3)(x+1)=0\Rightarrow x=3\text{ or }x=-1$$
<p>$x=3$: $y=27-27-27+2=-25$. $\;x=-1$: $y=-1-3+9+2=7$. Turning points $(3,-25)$ and $(-1,7)$.</p>`},

    { h: "Distinguishing maximum from minimum (E2.13)", body: M`
<p><b>Method 1 — the second derivative:</b> differentiate again to get $\dfrac{d^2y}{dx^2}$.</p>
<div class="callout key"><b class="t">Rule</b>$\dfrac{d^2y}{dx^2}\gt0$ → minimum (curve is ∪-shaped, "concave up").<br>$\dfrac{d^2y}{dx^2}\lt0$ → maximum (curve is ∩-shaped, "concave down").</div>
<p>For $y=x^3-3x^2-9x+2$: $\dfrac{d^2y}{dx^2}=6x-6$.</p>
<ul><li>At $x=3$: $6(3)-6=12\gt0$ → <b>minimum</b> $(3,-25)$.</li><li>At $x=-1$: $6(-1)-6=-12\lt0$ → <b>maximum</b> $(-1,7)$.</li></ul>
<p><b>Method 2 — sign of the gradient either side:</b> test $\dfrac{dy}{dx}$ just before and just after the turning point.</p>
${(() => { let s = ""; const mk = (x0, lab, up) => { s += F.arrow(x0 - 30, 110, x0 - 8, up ? 90 : 130, "r", 6) + F.arrow(x0 + 8, up ? 90 : 130, x0 + 30, 110, "r", 6) + F.text(x0, 150, lab, "tk small bold", "middle"); };
  s += F.path("M20,140 Q90,20 160,140", "k mid"); mk(90, "maximum", false);
  s += F.path("M220,20 Q290,140 360,20", "k mid"); mk(290, "minimum", true);
  return F.fig(400, 170, s, "Gradient goes + → 0 → − at a maximum; − → 0 → + at a minimum.", { size: "small" }); })()}
<p>For a maximum: gradient is <b>positive</b> before, <b>negative</b> after. For a minimum: <b>negative</b> before, <b>positive</b> after.</p>
<p><b>Context:</b> in optimisation problems ("find the value of $x$ that maximises the area/volume"), always state which type you found and whether it makes sense (e.g. a negative length is impossible).</p>
<details class="check"><summary>Find and classify the turning points of $y=12x-x^3$.</summary><div>$\dfrac{dy}{dx}=12-3x^2=0\Rightarrow x=\pm2$. $\dfrac{d^2y}{dx^2}=-6x$: at $x=2$, $-12\lt0$ → maximum $(2,16)$; at $x=-2$, $12\gt0$ → minimum $(-2,-16)$.</div></details>`},

    { h: "Optimisation problems (E2.13)", body: M`
<p>A common exam structure: a shape with a fixed total (perimeter, surface area, volume of material) — express one quantity in terms of a single variable, differentiate, and find the maximum or minimum.</p>
<div class="callout ex"><b class="t">Worked example</b>An open box is made from a square sheet of card of side 12 cm by cutting squares of side $x$ from each corner and folding up the sides. Find $x$ that maximises the volume.<br>Base side $=12-2x$; $V=x(12-2x)^2=4x^3-48x^2+144x$.<br>$\dfrac{dV}{dx}=12x^2-96x+144=0\Rightarrow x^2-8x+12=0\Rightarrow(x-2)(x-6)=0$.<br>$x=6$ gives zero volume (rejected), so $x=2$ cm. Check: $\dfrac{d^2V}{dx^2}=24x-96$; at $x=2$: $-48\lt0$, a maximum. $V=2(8)^2=128$ cm³.</div>
${(() => { const sz = 180, cut = 30; let s = F.rect(20, 20, sz, sz, "c cS");
  [[20, 20], [20 + sz - cut, 20], [20, 20 + sz - cut], [20 + sz - cut, 20 + sz - cut]].forEach(([x, y]) => { s += F.rect(x, y, cut, cut, "nostroke").replace('class="nostroke"', 'style="fill:var(--bg)"'); });
  s += F.dim(20, 20, 20, 20 + cut, "x", "r", -10) + F.dim(20 + sz - cut, 20 + sz - cut, 20 + sz, 20 + sz - cut, "x", "r", 8);
  s += F.dim(20, sz + 32, 20 + sz, sz + 32, "12", "k", 6);
  return F.fig(sz + 40, sz + 65, s, "Cut x × x squares from each corner, fold up the four sides.", { size: "small" }); })()}`},

    { h: "Calculus in kinematics (E2.13)", body: M`
<p>If $s$ is displacement and $t$ is time:</p>
<p class="eq">$$v=\frac{ds}{dt}\qquad a=\frac{dv}{dt}=\frac{d^2s}{dt^2}$$</p>
<p>Differentiating <b>displacement</b> gives <b>velocity</b>; differentiating <b>velocity</b> gives <b>acceleration</b>.</p>
<div class="callout ex"><b class="t">Example</b>$s=2t^3-9t^2+12t$ (metres, $t$ in seconds). Find the velocity and acceleration at $t=2$, and when the particle is at rest.<br>$v=\dfrac{ds}{dt}=6t^2-18t+12$. At $t=2$: $v=24-36+12=0$.<br>$a=\dfrac{dv}{dt}=12t-18$. At $t=2$: $a=6$ m/s².<br>At rest: $v=0\Rightarrow 6t^2-18t+12=0\Rightarrow t^2-3t+2=0\Rightarrow t=1$ or $t=2$.</div>
<p>When $a=0$, the velocity is momentarily <b>not changing</b> (a maximum or minimum speed, or a point of inflection).</p>
<details class="check"><summary>$v=3t^2-12t+9$. Find the acceleration when $t=1$.</summary><div>$a=6t-12$; at $t=1$: $a=-6$ m/s² (decelerating).</div></details>`}
  ],
  worked: [
    { q: M`Find the coordinates of the turning point of $y=2x^2-8x+3$ and state whether it is a maximum or minimum.`,
      steps: [M`$\dfrac{dy}{dx}=4x-8=0\Rightarrow x=2$.`, M`$y=8-16+3=-5$.`, M`$\dfrac{d^2y}{dx^2}=4\gt0$: minimum at $(2,-5)$.`]},
    { q: M`Find the equation of the normal to $y=x^3-2x$ at the point where $x=1$.`,
      steps: [M`$y=1-2=-1$: point $(1,-1)$.`, M`$\dfrac{dy}{dx}=3x^2-2$; at $x=1$: gradient $1$.`, M`Normal gradient $=-1$: $y-(-1)=-1(x-1)\Rightarrow y=-x$.`]},
    { q: M`A particle's displacement is $s=t^3-6t^2+9t$. Find its velocity when $t=0$ and when it is first at rest.`,
      steps: [M`$v=3t^2-12t+9$.`, M`At $t=0$: $v=9$ m/s.`, M`$v=0\Rightarrow t^2-4t+3=0\Rightarrow(t-1)(t-3)=0$: first at rest at $t=1$ s.`]}
  ],
  formulas: [["Power rule", M`$\dfrac{d}{dx}(ax^n)=anx^{n-1}$`], ["Turning point", M`$\dfrac{dy}{dx}=0$`], ["Minimum test", M`$\dfrac{d^2y}{dx^2}\gt0$`], ["Maximum test", M`$\dfrac{d^2y}{dx^2}\lt0$`], ["Kinematics", M`$v=\dfrac{ds}{dt},\ a=\dfrac{dv}{dt}$`]],
  cards: [
    ["Differentiate x⁵", "5x⁴"],
    ["Differentiate 7", "0"],
    ["Differentiate 3x² − 5x + 2", "6x − 5"],
    ["Differentiate 1/x²", "−2/x³"],
    ["At a turning point, dy/dx =", "0"],
    ["Second derivative > 0 means", "Minimum"],
    ["Second derivative < 0 means", "Maximum"],
    ["Tangent equation method", "Find gradient, find point, use y − y₁ = m(x − x₁)."],
    ["Normal gradient", "−1/(tangent gradient)"],
    ["v in terms of s", "v = ds/dt"],
    ["a in terms of v", "a = dv/dt"],
    ["At the highest point of a velocity–time curve", "a = 0"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`If $y=4x^3$, $\dfrac{dy}{dx}=$`, opts: ["$4x^2$", "$12x^2$", "$12x^3$", "$x^2$"], ans: 1, why: M`$4\times3\times x^2$.` },
    { type: "mcq", marks: 1, q: M`$y=x^2-6x+1$ has a turning point when $x=$`, opts: ["2", "3", "−3", "6"], ans: 1, why: M`$2x-6=0$.` },
    { type: "mcq", marks: 1, q: M`A positive second derivative at a turning point indicates a`, opts: ["maximum", "minimum", "point of inflection", "cannot tell"], ans: 1, why: M`Concave up.` },
    { type: "struct", marks: 2, q: M`Differentiate $y=5x^2-3x+7$.`, ms: M`<b>B2</b> $10x-3$` },
    { type: "struct", marks: 3, q: M`Find the gradient of $y=x^3-5x+2$ at the point where $x=-1$.`, ms: M`<b>M1</b> $\dfrac{dy}{dx}=3x^2-5$<br><b>M1</b> substitute $x=-1$<br><b>A1</b> $-2$` },
    { type: "struct", marks: 4, q: M`Find the coordinates of the turning points of $y=x^3-12x$ and determine their nature.`, ms: M`<b>M1</b> $3x^2-12=0\Rightarrow x=\pm2$<br><b>A1</b> $(2,-16)$ and $(-2,16)$<br><b>M1</b> $6x$ at each point<br><b>A1</b> minimum at $(2,-16)$, maximum at $(-2,16)$` },
    { type: "struct", marks: 3, q: M`Find the equation of the tangent to $y=x^2+2x-1$ at $x=1$.`, ms: M`<b>M1</b> gradient $=2x+2=4$<br><b>M1</b> point $(1,2)$<br><b>A1</b> $y=4x-2$` },
    { type: "struct", marks: 3, q: M`A particle has displacement $s=4t^2-t^3$ (m). Find its acceleration when $t=3$.`, ms: M`<b>M1</b> $v=8t-3t^2$<br><b>M1</b> $a=8-6t$<br><b>A1</b> $-10$ m/s²` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`Differentiate $y=x^4$.`, ms: M`<b>B1</b> $4x^3$` },
    { d: 1, type: "struct", marks: 2, q: M`Find $\dfrac{dy}{dx}$ for $y=3x^2+4x-7$.`, ms: M`<b>B2</b> $6x+4$` },
    { d: 1, type: "mcq", marks: 1, q: M`$\dfrac{d}{dx}(5)=$`, opts: ["5", "0", "1", "5x"], ans: 1, why: M`Constants differentiate to 0.` },
    { d: 1, type: "struct", marks: 2, q: M`Find the gradient of $y=x^2-4x$ when $x=3$.`, ms: M`<b>M1</b> $2x-4$<br><b>A1</b> 2` },
    { d: 2, type: "struct", marks: 3, q: M`Find the turning point of $y=x^2+6x-1$ and state whether it is a maximum or minimum.`, ms: M`<b>M1</b> $2x+6=0\Rightarrow x=-3$<br><b>A1</b> $(-3,-10)$<br><b>B1</b> minimum (positive $x^2$ coefficient / 2nd derivative = 2 > 0)` },
    { d: 2, type: "struct", marks: 3, q: M`Find the equation of the tangent to the curve $y=x^3-4x+1$ at the point $(2,1)$.`, ms: M`<b>M1</b> $\dfrac{dy}{dx}=3x^2-4$<br><b>M1</b> at $x=2$: gradient 8<br><b>A1</b> $y=8x-15$` },
    { d: 2, type: "struct", marks: 3, q: M`A particle's velocity is $v=6t-t^2$. Find when the particle's velocity is a maximum and the value of that maximum velocity.`, ms: M`<b>M1</b> $\dfrac{dv}{dt}=6-2t=0\Rightarrow t=3$<br><b>A1</b> $v=18-9=9$ m/s<br><b>B1</b> confirmed maximum since acceleration changes from + to −` },
    { d: 2, type: "struct", marks: 2, q: M`Differentiate $y=\dfrac{4}{x}+3x$.`, ms: M`<b>M1</b> $y=4x^{-1}+3x$<br><b>A1</b> $-\dfrac{4}{x^2}+3$` },
    { d: 3, type: "struct", marks: 5, q: M`A rectangular field has a perimeter of 200 m. (a) Show that the area $A=100x-x^2$ where $x$ is one side. (b) Find the value of $x$ that maximises the area, and the maximum area.`, ms: M`<b>B1</b> other side $=100-x$, $A=x(100-x)=100x-x^2$<br><b>M1</b> $\dfrac{dA}{dx}=100-2x=0$<br><b>A1</b> $x=50$<br><b>M1</b> $\dfrac{d^2A}{dx^2}=-2\lt0$, maximum<br><b>A1</b> $A=2500$ m²` },
    { d: 3, type: "struct", marks: 4, q: M`$y=2x^3-9x^2+12x-3$. (a) Find the two turning points. (b) Determine which is the maximum.`, ms: M`<b>M1</b> $6x^2-18x+12=0\Rightarrow x^2-3x+2=0$<br><b>A1</b> $x=1$ and $x=2$: points $(1,2)$ and $(2,1)$<br><b>M1</b> $\dfrac{d^2y}{dx^2}=12x-18$<br><b>A1</b> at $x=1$: $-6\lt0$ maximum $(1,2)$; at $x=2$: $6\gt0$ minimum` },
    { d: 3, type: "struct", marks: 4, q: M`A closed cylindrical can has volume $500\pi$ cm³. Its surface area is $S=2\pi r^2+\dfrac{1000\pi}{r}$. Find the value of $r$ that minimises the surface area.`, ms: M`<b>M1</b> $\dfrac{dS}{dr}=4\pi r-\dfrac{1000\pi}{r^2}=0$<br><b>M1</b> $r^3=250$<br><b>A1</b> $r=6.30$ cm (3 s.f.)<br><b>B1</b> confirmed minimum since $\dfrac{d^2S}{dr^2}=4\pi+\dfrac{2000\pi}{r^3}\gt0$ always` }
  ]
});
}
