window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;

/* ============================================================
   FUNCTIONS  (0580: E2.12)
   ============================================================ */
TOPICS.push({
  id: "functions", subject: "maths", unit: 2, title: "Functions",
  blurb: "Function notation, domain and range, evaluating functions, composite functions fg(x), inverse functions, and the graphical relationship between a function and its inverse.",
  level: "Extended only",
  syllabus: [
    ["E2.12", "Understand functions, domain and range; use function notation f(x)", 0],
    ["E2.12", "Understand and find composite functions fg(x) = f(g(x))", 1],
    ["E2.12", "Find the inverse function f⁻¹(x)", 2]
  ],
  sections: [
    { h: "Function notation (E2.12)", body: M`
<p class="lead">A <b>function</b> is a rule that takes an input and produces exactly <b>one</b> output. $f(x)=2x+3$ means "take $x$, double it, add 3".</p>
${(() => { let s = F.circ(60, 60, 50, "c cS") + F.text(60, 64, "x", "tc bold", "middle") + F.text(60, 2, "input", "tm small") + F.arrow(115, 60, 225, 60, "k", 9) + F.rect(135, 35, 70, 50, "m mS", 6) + F.text(170, 65, "f", "tk bold big") + F.text(170, 20, "f(x) = 2x + 3", "tk small", "middle") + F.circ(285, 60, 50, "o oS") + F.text(285, 64, "f(x)", "to bold", "middle") + F.text(285, 2, "output", "tm small");
  return F.fig(340, 132, s, "A function machine: feed in x, the rule acts on it, f(x) comes out.", { size: "small" }); })()}
<ul><li>$f(x)=2x+3$: $f(5)=13$, $f(-2)=-1$, $f(0)=3$.</li>
<li>$f(a)=2a+3$ (substitute the letter just like a number).</li>
<li>$f(x+1)=2(x+1)+3=2x+5$ (substitute the whole expression).</li>
<li>Solve $f(x)=11$: $2x+3=11\Rightarrow x=4$.</li></ul>
<p><b>Domain:</b> the set of values $x$ is allowed to take. <b>Range:</b> the set of possible outputs $f(x)$.</p>
<div class="callout ex"><b class="t">Example</b>$f(x)=x^2+1$ for all real $x$. Domain: all real numbers. Range: $f(x)\ge1$ (since $x^2\ge0$).</div>
<div class="callout warn"><b class="t">Excluded values</b>$g(x)=\dfrac{3}{x-2}$ is undefined at $x=2$ (division by zero), so the domain excludes $x=2$.</div>`},

    { h: "Composite functions (E2.12)", body: M`
<p class="lead"><b>$fg(x)$ means $f(g(x))$: do $g$ first, then $f$</b> to the result. Read it from the <b>inside out</b> / right to left.</p>
${(() => { let s = F.circ(50, 50, 40, "c cS") + F.text(50, 54, "x", "tc bold") + F.arrow(95, 50, 165, 50, "k", 8) + F.rect(100, 30, 65, 40, "o oS", 6) + F.text(132, 55, "g", "tk bold big") + F.arrow(170, 50, 240, 50, "k", 8) + F.rect(175, 30, 65, 40, "m mS", 6) + F.text(207, 55, "f", "tk bold big") + F.arrow(245, 50, 300, 50, "k", 8) + F.circ(335, 50, 40, "b bS") + F.text(335, 54, "f(g(x))", "tb bold");
  s += F.text(170, 12, "do g first", "tk small", "middle") + F.text(50, 90, "fg(x)", "tk small bold");
  return F.fig(380, 100, s, "fg(x) applies g first, then f to that answer.", { size: "small" }); })()}
<div class="callout ex"><b class="t">Worked example</b>$f(x)=2x-1$, $g(x)=x^2+3$. Find $fg(2)$ and $gf(2)$.<br>$fg(2)=f(g(2))=f(7)=13$.<br>$gf(2)=g(f(2))=g(3)=12$.<br><b>Note: $fg\neq gf$ in general.</b></div>
<p><b>As a single formula</b> — substitute the whole function in:</p>
$$fg(x)=f(g(x))=f(x^2+3)=2(x^2+3)-1=2x^2+5$$
$$gf(x)=g(f(x))=g(2x-1)=(2x-1)^2+3=4x^2-4x+4$$
<p><b>Check:</b> $fg(2)=2(4)+5=13$ ✓; $gf(2)=16-8+4=12$ ✓.</p>
<p><b>ff(x)</b> means apply $f$ twice: $ff(x)=f(f(x))$.</p>
<details class="check"><summary>$h(x)=\sqrt{x+1}$, $k(x)=3x$. Find $hk(x)$ and $hk(5)$.</summary><div>$hk(x)=\sqrt{3x+1}$; $hk(5)=\sqrt{16}=4$.</div></details>`},

    { h: "Inverse functions (E2.12)", body: M`
<p class="lead">$f^{-1}(x)$ (read "f inverse") <b>undoes</b> $f$: if $f(a)=b$ then $f^{-1}(b)=a$. So $f^{-1}(f(x))=x$.</p>
<div class="callout key"><b class="t">Method</b>1. Write $y=f(x)$. 2. Swap $x$ and $y$. 3. Rearrange to make $y$ the subject. 4. Replace $y$ with $f^{-1}(x)$.</div>
$$f(x)=3x-4\quad\Rightarrow\quad y=3x-4\;\Rightarrow\;x=3y-4\;\Rightarrow\;y=\frac{x+4}{3}\;\Rightarrow\;f^{-1}(x)=\frac{x+4}{3}$$
<p><b>Check:</b> $f(2)=2$, and $f^{-1}(2)=\dfrac{6}{3}=2$ ✓.</p>
<p>A second example with a fraction in $f$:</p>
$$f(x)=\frac{2x+1}{x-3}\;\Rightarrow\;y(x-3)=2x+1\;\Rightarrow\;xy-3y=2x+1\;\Rightarrow\;x(y-2)=3y+1\;\Rightarrow\;x=\frac{3y+1}{y-2}$$
$$f^{-1}(x)=\frac{3x+1}{x-2}$$
<p>This uses the same "subject appears twice" technique as in <i>Algebraic manipulation</i>.</p>
<details class="check"><summary>Find $f^{-1}(x)$ if $f(x)=\dfrac{x}{2}+5$.</summary><div>$y=\tfrac x2+5\Rightarrow x=\tfrac y2+5\Rightarrow y=2(x-5)=2x-10$.</div></details>`},

    { h: "Graphs of a function and its inverse (E2.12)", body: M`
<p>The graph of $y=f^{-1}(x)$ is the <b>reflection</b> of $y=f(x)$ in the line $y=x$. Points swap coordinates: if $(a,b)$ is on $y=f(x)$, then $(b,a)$ is on $y=f^{-1}(x)$.</p>
${F.plot({ w: 420, h: 280, x: [-4, 8], y: [-4, 8], gridStep: [1, 1], ticks: { x: [-2, 2, 4, 6], y: [-2, 2, 4, 6] }, curves: [{ f: x => 2 * x - 2, dom: [-1, 5], c: "c thick", label: "y = f(x) = 2x − 2", lpos: [4.6, 7.2], la: "end", ldy: -10 }, { f: x => x, c: "k thin", label: "y = x", lpos: [7, 7], la: "end", ldy: -8 }, { f: x => (x + 2) / 2, dom: [-4, 8], c: "o thick", label: "y = f⁻¹(x) = (x+2)/2", lpos: [-3.6, -1], ldx: 10, ldy: -8 }], marks: [{ x: 3, y: 4, c: "c" }, { x: 4, y: 3, c: "o" }], cap: "f and f⁻¹ are mirror images in y = x; e.g. (3, 4) reflects to (4, 3).", size: "small" })}
<p>A function only has an inverse that is also a function if it is <b>one-to-one</b> (passes the horizontal line test). $f(x)=x^2$ is not one-to-one over all real $x$ (both $2$ and $-2$ give 4), so its domain is often restricted (e.g. $x\ge0$) before finding an inverse.</p>
<details class="check"><summary>If f(3) = 11, what is f⁻¹(11)?</summary><div>3 (inverse undoes f).</div></details>`}
  ],
  worked: [
    { q: M`$f(x)=5-2x$ and $g(x)=x^2$. Find (a) $fg(3)$, (b) $gf(x)$, (c) $f^{-1}(x)$.`,
      steps: [M`(a) $g(3)=9$, $f(9)=5-18=-13$.`, M`(b) $gf(x)=(5-2x)^2=25-20x+4x^2$.`, M`(c) $y=5-2x\Rightarrow x=5-2y\Rightarrow y=\dfrac{5-x}{2}$: $f^{-1}(x)=\dfrac{5-x}{2}$.`]},
    { q: M`$f(x)=\dfrac{1}{x+2}$. Find $f^{-1}(x)$ and state the value $x$ cannot take for $f^{-1}$.`,
      steps: [M`$y=\dfrac{1}{x+2}\Rightarrow x=\dfrac1y-2=\dfrac{1-2y}{y}$, swap: $y=\dfrac{1-2x}{x}$.`, M`$f^{-1}(x)=\dfrac1x-2$.`, M`$x$ cannot be 0 (division by zero).`]},
    { q: M`$f(x)=2x+1$, $g(x)=\dfrac{x-1}{2}$. Show that $g(x)=f^{-1}(x)$.`,
      steps: [M`$fg(x)=2\left(\dfrac{x-1}{2}\right)+1=x-1+1=x$.`, M`Since $fg(x)=x$ for all $x$, $g$ undoes $f$: $g=f^{-1}$.`]}
  ],
  formulas: [["Composite", M`$fg(x)=f(g(x))$`], ["Inverse method", "swap x and y, rearrange, relabel"], ["Inverse check", M`$f(f^{-1}(x))=x$`], ["Inverse graph", "reflection in y = x"]],
  cards: [
    ["f(x) = 3x − 2. Find f(4).", "10"],
    ["fg(x) means", "f(g(x)): g first, then f"],
    ["Is fg(x) = gf(x) generally?", "No"],
    ["Domain", "The set of allowed input values."],
    ["Range", "The set of possible output values."],
    ["Steps to find f⁻¹(x)", "Write y = f(x), swap x and y, rearrange for y."],
    ["f(f⁻¹(x)) =", "x"],
    ["Graph of f⁻¹ relative to f", "Reflection in y = x."],
    ["When does f⁻¹ exist as a function?", "When f is one-to-one."],
    ["f(x) = 1/x is undefined at", "x = 0"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`$f(x)=4x-1$. $f(3)=$`, opts: ["11", "13", "12", "10"], ans: 1, why: M`$12-1$.` },
    { type: "mcq", marks: 1, q: M`$f(x)=x+2$, $g(x)=3x$. $fg(2)=$`, opts: ["8", "10", "12", "6"], ans: 0, why: M`$g(2)=6$, $f(6)=8$.` },
    { type: "mcq", marks: 1, q: M`The inverse of $f(x)=x-7$ is`, opts: ["$f^{-1}(x)=x+7$", "$f^{-1}(x)=7-x$", "$f^{-1}(x)=7x$", "$f^{-1}(x)=\tfrac{x}{7}$"], ans: 0, why: M`Undo subtracting 7.` },
    { type: "struct", marks: 2, q: M`$f(x)=3x+2$. Solve $f(x)=20$.`, ms: M`<b>M1</b> $3x=18$<br><b>A1</b> $x=6$` },
    { type: "struct", marks: 3, q: M`$f(x)=2x-3$, $g(x)=x^2+1$. Find $gf(x)$ in its simplest form.`, ms: M`<b>M1</b> $g(2x-3)=(2x-3)^2+1$<br><b>M1</b> expand<br><b>A1</b> $4x^2-12x+10$` },
    { type: "struct", marks: 3, q: M`Find the inverse of $f(x)=\dfrac{x-5}{4}$.`, ms: M`<b>M1</b> $x=\dfrac{y-5}{4}$<br><b>M1</b> $4x=y-5$<br><b>A1</b> $f^{-1}(x)=4x+5$` },
    { type: "struct", marks: 3, q: M`$f(x)=\dfrac{2}{x}+1$ for $x\neq0$. Find $f^{-1}(x)$.`, ms: M`<b>M1</b> $x-1=\dfrac2y$<br><b>M1</b> $y=\dfrac{2}{x-1}$<br><b>A1</b> $f^{-1}(x)=\dfrac{2}{x-1}$` },
    { type: "struct", marks: 2, q: M`State the range of $f(x)=x^2-4$ for all real $x$.`, ms: M`<b>B2</b> $f(x)\ge-4$` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`$f(x)=2x+5$. Find $f(-1)$.`, ms: M`<b>B1</b> 3` },
    { d: 1, type: "struct", marks: 2, q: M`$f(x)=x^2$, $g(x)=x-3$. Find $fg(5)$.`, ms: M`<b>M1</b> $g(5)=2$<br><b>A1</b> $f(2)=4$` },
    { d: 1, type: "mcq", marks: 1, q: M`$f(x)=10-x$. $f^{-1}(x)=$`, opts: ["$x-10$", "$10-x$", "$\tfrac{1}{10-x}$", "$x+10$"], ans: 1, why: M`$f$ is self-inverse here.` },
    { d: 2, type: "struct", marks: 3, q: M`$f(x)=3x-1$ and $g(x)=2x+4$. Solve $fg(x)=20$.`, ms: M`<b>M1</b> $fg(x)=3(2x+4)-1=6x+11$<br><b>M1</b> $6x+11=20$<br><b>A1</b> $x=1.5$` },
    { d: 2, type: "struct", marks: 3, q: M`$f(x)=\dfrac{3x+2}{5}$. Find $f^{-1}(x)$ and verify that $f^{-1}(f(4))=4$.`, ms: M`<b>M1</b> $5y=3x+2$ rearranged, swap<br><b>A1</b> $f^{-1}(x)=\dfrac{5x-2}{3}$<br><b>B1</b> $f(4)=2.8$, $f^{-1}(2.8)=4$ ✓` },
    { d: 2, type: "struct", marks: 2, q: M`State the value of $x$ that must be excluded from the domain of $f(x)=\dfrac{5}{2x-6}$.`, ms: M`<b>M1</b> $2x-6=0$<br><b>A1</b> $x=3$` },
    { d: 3, type: "struct", marks: 4, q: M`$f(x)=2x+1$, $g(x)=x^2-2$. (a) Find $gf(x)$. (b) Solve $gf(x)=0$.`, ms: M`<b>M1</b> $(2x+1)^2-2$<br><b>A1</b> $4x^2+4x-1$<br><b>M1</b> quadratic formula<br><b>A1</b> $x=\dfrac{-4\pm\sqrt{32}}{8}=\dfrac{-1\pm\sqrt2}{2}$` },
    { d: 3, type: "struct", marks: 4, q: M`$f(x)=\dfrac{4}{x-1}$ and $g(x)=f^{-1}(x)$. (a) Find $g(x)$. (b) Solve $f(x)=g(x)$.`, ms: M`<b>M1</b> rearrange and swap<br><b>A1</b> $g(x)=\dfrac4x+1$<br><b>M1</b> $\dfrac{4}{x-1}=\dfrac4x+1$, multiply through: $4x=4(x-1)+x(x-1)$<br><b>A1</b> $x^2-x-4=0\Rightarrow x=\dfrac{1\pm\sqrt{17}}{2}$` }
  ]
});
}
