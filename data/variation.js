window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
const g = (f, lab, cap, ymax = 10) => F.plot({ w: 200, h: 170, x: [0, 5], y: [0, ymax], grid: false, m: { l: 20, r: 14, t: 16, b: 22 }, xlabel: "x", ylabel: "y", curves: [{ f, dom: [0.05, 5], c: "c thick" }], extra: () => F.text(110, 30, lab, "tc bold"), cap, size: "tiny" });

/* ============================================================
   VARIATION (PROPORTION)  (0580: E2.8)
   ============================================================ */
TOPICS.push({
  id: "variation", subject: "maths", unit: 2, title: "Variation (proportion)",
  blurb: "Direct and inverse variation with powers and roots: writing the equation, finding the constant k, using the formula, and how y changes when x is scaled.",
  level: "Core → Extended", demo: "variation",
  syllabus: [
    ["E2.8", "Express direct and inverse proportion in algebraic terms and use this form of expression to find unknown quantities", 1],
    ["E2.8", "Proportion involving powers and roots: y ∝ x², y ∝ √x, y ∝ 1/x², etc.", 3],
    ["E2.8", "Understand the effect on one variable of changing another (e.g. doubling x)", 4]
  ],
  sections: [
    { h: "The language of variation (E2.8)", body: M`
<p class="lead">"$y$ is <b>directly proportional</b> to $x$" (written $y\propto x$) means $y=kx$ for some constant $k$. "$y$ is <b>inversely proportional</b> to $x$" ($y\propto\frac1x$) means $y=\dfrac kx$.</p>
<table class="t"><tr><th>Statement</th><th>Equation</th></tr>
<tr><td>$y$ varies directly as $x$</td><td>$y=kx$</td></tr>
<tr><td>$y$ is proportional to the square of $x$</td><td>$y=kx^2$</td></tr>
<tr><td>$y$ is proportional to the cube of $x$</td><td>$y=kx^3$</td></tr>
<tr><td>$y$ is proportional to the square root of $x$</td><td>$y=k\sqrt x$</td></tr>
<tr><td>$y$ is inversely proportional to $x$</td><td>$y=\dfrac kx$</td></tr>
<tr><td>$y$ is inversely proportional to the square of $x$</td><td>$y=\dfrac{k}{x^2}$</td></tr>
<tr><td>$y$ is inversely proportional to $\sqrt{x}$</td><td>$y=\dfrac{k}{\sqrt x}$</td></tr></table>
${F.row(g(x => 2 * x, "y = kx", "Direct: straight line through O."), g(x => .4 * x * x, "y = kx²", "Curves upwards."), g(x => 2 / x, "y = k/x", "Inverse: never meets the axes."), g(x => 2 / (x * x), "y = k/x²", "Falls off faster."))}`},

    { h: "Finding k and using the formula (E2.8)", body: M`
<ol class="steps"><li>Write the proportionality as an equation with $k$.</li><li>Substitute the given pair of values to find $k$.</li><li>Write the full formula.</li><li>Use it to answer the question.</li></ol>
<div class="callout ex"><b class="t">Example 1</b>$y$ is directly proportional to the square of $x$. When $x=3$, $y=36$. Find $y$ when $x=5$, and $x$ when $y=64$.<br>$y=kx^2$; $36=9k\Rightarrow k=4$; $y=4x^2$.<br>$x=5$: $y=100$. $\;y=64$: $x^2=16$, $x=\pm4$ (only $+4$ if $x$ is a length).</div>
<div class="callout ex"><b class="t">Example 2</b>$p$ is inversely proportional to $\sqrt q$. $p=6$ when $q=16$. Find $p$ when $q=9$.<br>$p=\dfrac{k}{\sqrt q}$; $6=\dfrac k4\Rightarrow k=24$; $p=\dfrac{24}{\sqrt9}=8$.</div>
<p>Explore every type in the <b>variation lab</b> at the bottom of the page.</p>`},

    { h: "Scaling: what happens when x changes? (E2.8)", body: M`
<p>Often you can answer without finding $k$: replace $x$ by $2x$ and see what happens.</p>
<table class="t"><tr><th>Relationship</th><th>$x$ doubles → $y$ is multiplied by</th><th>$x$ trebles → $y$ multiplied by</th></tr>
<tr><td>$y\propto x$</td><td>2</td><td>3</td></tr><tr><td>$y\propto x^2$</td><td>4</td><td>9</td></tr><tr><td>$y\propto x^3$</td><td>8</td><td>27</td></tr>
<tr><td>$y\propto\sqrt x$</td><td>$\sqrt2\approx1.41$</td><td>$\sqrt3$</td></tr><tr><td>$y\propto\frac1x$</td><td>$\tfrac12$</td><td>$\tfrac13$</td></tr><tr><td>$y\propto\frac{1}{x^2}$</td><td>$\tfrac14$</td><td>$\tfrac19$</td></tr></table>
<div class="callout ex"><b class="t">Percentage changes</b>$y\propto x^2$ and $x$ increases by 20%. New $y=k(1.2x)^2=1.44kx^2$: $y$ increases by <b>44%</b>.<br>$y\propto\frac{1}{x^2}$ and $x$ is halved: $y=\dfrac{k}{(x/2)^2}=\dfrac{4k}{x^2}$: $y$ is multiplied by 4.</div>
<details class="check"><summary>The time $t$ for a journey is inversely proportional to the speed $v$. By what percentage does $t$ change if $v$ increases by 25%?</summary><div>$t$ is multiplied by $\tfrac{1}{1.25}=0.8$: a 20% decrease.</div></details>`},

    { h: "Real contexts (E2.8)", body: M`
<ul><li><b>Area of similar shapes:</b> area $\propto$ (length)$^2$; volume $\propto$ (length)$^3$.</li>
<li><b>Physics:</b> distance fallen $d\propto t^2$; the period of a pendulum $T\propto\sqrt l$; light intensity $I\propto\dfrac{1}{d^2}$; pressure $P\propto\dfrac1V$ (Boyle's law).</li>
<li><b>Work:</b> time to finish a job is inversely proportional to the number of workers.</li></ul>
<div class="callout ex"><b class="t">Example</b>The light intensity at 2 m from a lamp is 45 units. Find the intensity at 3 m.<br>$I=\dfrac{k}{d^2}$; $k=45\times4=180$; $I=\dfrac{180}{9}=20$ units.</div>
<p><b>Identifying the relationship from a table:</b> test whether $y\div x$, $y\div x^2$, $y\times x$, … is constant.</p>
<table class="t"><tr><th>$x$</th><td>1</td><td>2</td><td>4</td><td>5</td></tr><tr><th>$y$</th><td>100</td><td>25</td><td>6.25</td><td>4</td></tr></table>
<p>$yx^2=100$ every time, so $y=\dfrac{100}{x^2}$: inverse square.</p>`}
  ],
  worked: [
    { q: M`$y$ is inversely proportional to $(x+1)^2$. When $x=2$, $y=5$. Find $y$ when $x=4$.`,
      steps: [M`$y=\dfrac{k}{(x+1)^2}$; $5=\dfrac k9\Rightarrow k=45$.`, M`$x=4$: $y=\dfrac{45}{25}=1.8$.`]},
    { q: M`The mass $m$ of a sphere is proportional to the cube of its radius $r$. A sphere of radius 3 cm has mass 81 g. Find the radius of a sphere of mass 24 g.`,
      steps: [M`$m=kr^3$; $81=27k\Rightarrow k=3$.`, M`$24=3r^3\Rightarrow r^3=8\Rightarrow r=2$ cm.`]},
    { q: M`$y\propto x^3$. By what factor does $y$ change when $x$ is multiplied by 1.5?`,
      steps: [M`$y$ is multiplied by $1.5^3=3.375$.`]}
  ],
  formulas: [["Direct", M`$y=kx^n$`], ["Inverse", M`$y=\dfrac{k}{x^n}$`], ["Root", M`$y=k\sqrt x$`], ["Scaling", M`$x\to cx\Rightarrow y\to c^n y$`]],
  cards: [
    ["y ∝ x means", "y = kx"],
    ["y ∝ 1/x² means", "y = k/x²"],
    ["Direct proportion graph", "Straight line through the origin."],
    ["Method for proportion questions", "Write with k, find k, write formula, use it."],
    ["y ∝ x², x doubles", "y × 4"],
    ["y ∝ x³, x halves", "y × 1/8"],
    ["y ∝ 1/x, x trebles", "y × 1/3"],
    ["y ∝ √x, x × 4", "y × 2"],
    ["Inverse square law example", "Light intensity I = k/d²"],
    ["y ∝ x², x up 10%", "y up 21%"],
    ["Test for y ∝ 1/x from a table", "xy is constant."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`$y$ is inversely proportional to $x$. When $x=4$, $y=3$. $k=$`, opts: ["0.75", "12", "1.33", "7"], ans: 1, why: M`$k=xy$.` },
    { type: "mcq", marks: 1, q: M`$y\propto x^2$. If $x$ is trebled, $y$ is multiplied by`, opts: ["3", "6", "9", "27"], ans: 2, why: M`$3^2$.` },
    { type: "mcq", marks: 1, q: M`Which graph shows $y\propto x$?`, opts: ["a curve through O", "a straight line through O", "a horizontal line", "a line not through O"], ans: 1, why: M`$y=kx$.` },
    { type: "struct", marks: 3, q: M`$y$ is directly proportional to $x$. $y=14$ when $x=4$. Find $y$ when $x=10$.`, ms: M`<b>M1</b> $y=kx$, $k=3.5$<br><b>M1</b> $y=3.5\times10$<br><b>A1</b> 35` },
    { type: "struct", marks: 3, q: M`$p$ is proportional to the square of $q$. $p=20$ when $q=2$. Find $q$ when $p=125$ ($q\gt0$).`, ms: M`<b>M1</b> $p=kq^2$, $k=5$<br><b>M1</b> $q^2=25$<br><b>A1</b> 5` },
    { type: "struct", marks: 3, q: M`$F$ is inversely proportional to the square of $d$. $F=36$ when $d=5$. Find $F$ when $d=3$.`, ms: M`<b>M1</b> $k=900$<br><b>M1</b> $\dfrac{900}{9}$<br><b>A1</b> 100` },
    { type: "struct", marks: 2, q: M`$V\propto r^3$. Find the percentage increase in $V$ when $r$ increases by 10%.`, ms: M`<b>M1</b> $1.1^3=1.331$<br><b>A1</b> 33.1%` },
    { type: "struct", marks: 3, q: M`$y$ is proportional to $\sqrt{x}$. $y=12$ when $x=9$. Find $x$ when $y=20$.`, ms: M`<b>M1</b> $k=4$<br><b>M1</b> $\sqrt x=5$<br><b>A1</b> 25` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: M`$y$ is directly proportional to $x$. When $x=6$, $y=30$. Write a formula for $y$ in terms of $x$.`, ms: M`<b>M1</b> $30=6k$<br><b>A1</b> $y=5x$` },
    { d: 1, type: "mcq", marks: 1, q: M`$y$ is inversely proportional to $x$. If $x$ is doubled, $y$ is`, opts: ["doubled", "halved", "quartered", "unchanged"], ans: 1, why: M`$y=k/x$.` },
    { d: 2, type: "struct", marks: 3, q: M`The time $t$ taken to fill a tank is inversely proportional to the number of pipes $n$. 4 pipes take 45 minutes. How long do 6 pipes take?`, ms: M`<b>M1</b> $t=k/n$<br><b>M1</b> $k=180$<br><b>A1</b> 30 minutes` },
    { d: 2, type: "struct", marks: 3, q: M`The distance $d$ m an object falls is proportional to the square of the time $t$ s. It falls 20 m in 2 s. How far in 5 s?`, ms: M`<b>M1</b> $d=kt^2$<br><b>M1</b> $k=5$<br><b>A1</b> 125 m` },
    { d: 2, type: "struct", marks: 3, q: M`$y$ is inversely proportional to the cube of $x$. When $x=2$, $y=5$. Find $y$ when $x=4$.`, ms: M`<b>M1</b> $y=k/x^3$<br><b>M1</b> $k=40$<br><b>A1</b> 0.625` },
    { d: 3, type: "struct", marks: 3, q: M`$y\propto\dfrac{1}{x^2}$. Find the percentage change in $y$ when $x$ is increased by 25%.`, ms: M`<b>M1</b> $\dfrac{1}{1.25^2}$<br><b>A1</b> 0.64<br><b>A1</b> 36% decrease` },
    { d: 3, type: "struct", marks: 4, q: M`$y$ is proportional to $(x-1)^2$. When $x=4$, $y=27$. (a) Find $y$ when $x=6$. (b) Find the values of $x$ when $y=48$.`, ms: M`<b>M1</b> $k=3$<br><b>A1</b> 75<br><b>M1</b> $(x-1)^2=16$<br><b>A1</b> $x=5$ or $x=-3$` },
    { d: 3, type: "struct", marks: 3, q: M`Show that the data fit a relationship of the form $y=\dfrac{k}{\sqrt x}$ and find $k$: $x=4, y=15$; $x=9, y=10$; $x=25, y=6$.`, ms: M`<b>M1</b> compute $y\sqrt x$: 30, 30, 30<br><b>A1</b> constant, so $y\propto\frac{1}{\sqrt x}$<br><b>A1</b> $k=30$` }
  ]
});
}
