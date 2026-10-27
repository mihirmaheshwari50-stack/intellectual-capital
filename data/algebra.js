window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;

/* ============================================================
   ALGEBRAIC MANIPULATION  (0580: E2.1 – E2.3, E2.5 rearranging)
   ============================================================ */
TOPICS.push({
  id: "algebra", subject: "maths", unit: 2, title: "Algebraic manipulation",
  blurb: "Substitution and formulae, collecting like terms, expanding single, double and triple brackets, every type of factorising, algebraic fractions, and changing the subject, including when it appears twice.",
  level: "Core → Extended",
  syllabus: [
    ["E2.1", "Know that letters can be used to represent generalised numbers; substitute numbers into expressions and formulae", 0],
    ["E2.2", "Simplify expressions by collecting like terms", 1],
    ["E2.2", "Expand products of algebraic expressions, including two or three brackets", 2],
    ["E2.2", "Factorise by extracting common factors, grouping, the difference of two squares and quadratic expressions", 4],
    ["E2.3", "Manipulate algebraic fractions: add, subtract, multiply, divide and simplify", 6],
    ["E2.3", "Factorise and simplify rational expressions", 7],
    ["E2.5", "Change the subject of formulae, including where the subject appears twice or as a power or root", 8]
  ],
  sections: [
    { h: "Expressions, formulae and substitution (E2.1)", body: M`
<p class="lead">Algebra uses letters for numbers so we can state rules that work for <b>every</b> value. Vocabulary matters:</p>
<table class="t"><tr><th>Word</th><th>Meaning</th><th>Example</th></tr>
<tr><td>Term</td><td>A single number, letter or product</td><td>$5x^2$, $-3ab$, $7$</td></tr>
<tr><td>Expression</td><td>Terms combined, with no equals sign</td><td>$3x+2y-1$</td></tr>
<tr><td>Equation</td><td>Two expressions equal for particular values</td><td>$3x+2=11$</td></tr>
<tr><td>Formula</td><td>A rule linking quantities</td><td>$v=u+at$</td></tr>
<tr><td>Identity</td><td>True for <b>all</b> values ($\equiv$)</td><td>$(x+1)^2\equiv x^2+2x+1$</td></tr></table>
<p><b>Substitution:</b> replace each letter by its value, in brackets, then use BIDMAS.</p>
<div class="callout ex"><b class="t">Example</b>$a=-3$, $b=4$. Find $2a^2-ab+b^3$.<br>$2(-3)^2-(-3)(4)+(4)^3=2(9)+12+64=94$.</div>
<div class="callout warn"><b class="t">Negatives</b>$a^2$ with $a=-3$ is $(-3)^2=9$, not $-9$. Always bracket negative values when substituting.</div>`},

    { h: "Collecting like terms and simplifying (E2.2)", body: M`
<p><b>Like terms</b> have exactly the same letters raised to the same powers: $3x^2y$ and $-5x^2y$ are like terms; $3x^2y$ and $3xy^2$ are not.</p>
<ul><li>$4a+3b-a+5b=3a+8b$</li><li>$2x^2+3x-5x^2+x=-3x^2+4x$</li><li>$3p\times4q=12pq$; $\;10x^2y\div2xy=5x$; $\;(3a^2)^2=9a^4$</li></ul>`},

    { h: "Expanding brackets (E2.2)", body: M`
<p><b>Single bracket:</b> multiply every term inside by the term outside. $-3x(2x-5)=-6x^2+15x$. Watch the sign: a minus outside changes every sign inside.</p>
<p><b>Two brackets:</b> every term in the first multiplies every term in the second.</p>
<div class="viz" data-viz="expandGrid"></div>
<ul><li>$(x-4)(x+7)=x^2+7x-4x-28=x^2+3x-28$</li>
<li>$(2x-3)(3x-1)=6x^2-2x-9x+3=6x^2-11x+3$</li>
<li>$(3x+2)^2=(3x+2)(3x+2)=9x^2+12x+4$ — <b>not</b> $9x^2+4$!</li>
<li>$(a+b)(a-b)=a^2-b^2$ (the middle terms cancel)</li></ul>
<p><b>Three brackets:</b> expand two first, then multiply the result by the third.</p>
$$\begin{aligned}(x+1)(x-2)(x+3)&=(x^2-x-2)(x+3)\\&=x^3+3x^2-x^2-3x-2x-6\\&=x^3+2x^2-5x-6\end{aligned}$$
<details class="check"><summary>Expand and simplify $(x-3)^3$.</summary><div>$(x-3)^2=x^2-6x+9$; times $(x-3)$: $x^3-9x^2+27x-27$.</div></details>`},

    { h: "Factorising: common factors and grouping (E2.2)", body: M`
<p><b>Factorising</b> is the reverse of expanding. Always take out the <b>highest common factor</b> first.</p>
<ul><li>$6x^2+9x=3x(2x+3)$</li><li>$8a^3b-12a^2b^2=4a^2b(2a-3b)$</li><li>$5(x+2)-y(x+2)=(x+2)(5-y)$ (the common factor is a bracket)</li></ul>
<p><b>Grouping</b> four terms in pairs:</p>
$$ax+ay+bx+by=a(x+y)+b(x+y)=(a+b)(x+y)$$
$$x^3-2x^2+3x-6=x^2(x-2)+3(x-2)=(x^2+3)(x-2)$$
<div class="callout key"><b class="t">"Factorise completely"</b>means keep going until nothing more comes out: $2x^2-18=2(x^2-9)=2(x-3)(x+3)$.</div>`},

    { h: "Factorising quadratics and the difference of two squares (E2.2)", body: M`
<p><b>$x^2+bx+c$:</b> find two numbers that <b>multiply</b> to $c$ and <b>add</b> to $b$.</p>
<ul><li>$x^2+8x+15=(x+3)(x+5)$ (3 × 5 = 15, 3 + 5 = 8)</li><li>$x^2-2x-24=(x-6)(x+4)$ (−6 × 4 = −24, −6 + 4 = −2)</li></ul>
<p><b>$ax^2+bx+c$ ($a\ne1$):</b> find two numbers that multiply to $ac$ and add to $b$, split the middle term, then group.</p>
$$6x^2+x-2:\quad ac=-12\Rightarrow 4,\,-3\quad 6x^2+4x-3x-2=2x(3x+2)-1(3x+2)=(2x-1)(3x+2)$$
<p><b>Difference of two squares:</b> $a^2-b^2=(a-b)(a+b)$.</p>
<ul><li>$x^2-49=(x-7)(x+7)$</li><li>$9y^2-25=(3y-5)(3y+5)$</li><li>$x^4-16=(x^2-4)(x^2+4)=(x-2)(x+2)(x^2+4)$</li><li>Numerically: $101^2-99^2=(2)(200)=400$</li></ul>
${(() => { let s = F.rect(20, 20, 140, 140, "c cS") + F.rect(110, 110, 50, 50, "k bgF") + F.text(70, 70, "a² − b²", "tc bold") + F.dim(20, 172, 160, 172, "a", "k", 6) + F.dim(110, 104, 160, 104, "b", "o", 0);
  s += F.arrow(180, 90, 222, 90, "k", 8);
  s += F.rect(290, 65, 190, 45, "c cS") + F.dim(290, 124, 480, 124, "a + b", "k", 6) + F.text(282, 92, "a − b", "tk small", "end");
  return F.fig(500, 195, s, "Cut the L-shape and rearrange it into an (a − b) by (a + b) rectangle.", { size: "small" }); })()}
<p>More quadratic factorising and solving is in <i>Quadratics</i>.</p>`},

    { h: "Algebraic fractions: simplifying (E2.3)", body: M`
<p>Factorise the numerator and denominator fully, then cancel <b>common factors</b> (whole brackets), never individual terms.</p>
$$\frac{x^2-9}{x^2+x-6}=\frac{(x-3)(x+3)}{(x+3)(x-2)}=\frac{x-3}{x-2}$$
$$\frac{4x^2-6x}{2x^2+x-6}=\frac{2x(2x-3)}{(2x-3)(x+2)}=\frac{2x}{x+2}$$
<div class="callout warn"><b class="t">Illegal cancelling</b>$\dfrac{x+5}{x+2}$ does <b>not</b> simplify to $\dfrac52$. You may only cancel factors that multiply the whole top and the whole bottom.</div>`},

    { h: "Algebraic fractions: the four operations (E2.3)", body: M`
<p>Treat them exactly like number fractions.</p>
<p><b>Add/subtract:</b> common denominator.</p>
$$\frac{3}{x+2}-\frac{2}{x-1}=\frac{3(x-1)-2(x+2)}{(x+2)(x-1)}=\frac{x-7}{(x+2)(x-1)}$$
$$\frac{x}{4}+\frac{2x-1}{6}=\frac{3x+2(2x-1)}{12}=\frac{7x-2}{12}$$
<p><b>Multiply:</b> factorise everything, cancel, then multiply.</p>
$$\frac{x^2-4}{3x}\times\frac{6x^2}{x+2}=\frac{(x-2)(x+2)}{3x}\times\frac{6x^2}{x+2}=2x(x-2)$$
<p><b>Divide:</b> multiply by the reciprocal.</p>
$$\frac{x+1}{x^2}\div\frac{x^2-1}{x}=\frac{x+1}{x^2}\times\frac{x}{(x-1)(x+1)}=\frac{1}{x(x-1)}$$
<p><b>Equations with fractions:</b> multiply every term by the common denominator to clear them (see <i>Equations & inequalities</i>).</p>
<details class="check"><summary>Simplify $\dfrac{2}{x}+\dfrac{3}{x^2}$.</summary><div>$\dfrac{2x+3}{x^2}$.</div></details>`},

    { h: "Changing the subject (E2.5)", body: M`
<p>Make a letter the subject by undoing operations in reverse order, doing the same to both sides.</p>
<ul><li>$v=u+at\Rightarrow a=\dfrac{v-u}{t}$</li>
<li>$A=\pi r^2\Rightarrow r=\sqrt{\dfrac{A}{\pi}}$</li>
<li>$T=2\pi\sqrt{\dfrac{l}{g}}\Rightarrow \dfrac{T}{2\pi}=\sqrt{\dfrac lg}\Rightarrow \dfrac{T^2}{4\pi^2}=\dfrac lg\Rightarrow l=\dfrac{gT^2}{4\pi^2}$</li></ul>
<h3>When the subject appears twice</h3>
<ol class="steps"><li>Clear fractions and expand brackets.</li><li>Collect all terms containing the subject on <b>one side</b>, everything else on the other.</li><li><b>Factorise</b> out the subject.</li><li>Divide by the bracket.</li></ol>
$$y=\frac{x+2}{x-3}\Rightarrow y(x-3)=x+2\Rightarrow xy-3y=x+2\Rightarrow xy-x=3y+2\Rightarrow x(y-1)=3y+2\Rightarrow x=\frac{3y+2}{y-1}$$
$$ax+b=cx+d\Rightarrow ax-cx=d-b\Rightarrow x=\frac{d-b}{a-c}$$
<details class="check"><summary>Make $p$ the subject of $\;3p+q=r(p-2)$.</summary><div>$3p+q=rp-2r\Rightarrow 3p-rp=-2r-q\Rightarrow p(3-r)=-2r-q\Rightarrow p=\dfrac{2r+q}{r-3}$.</div></details>`}
  ],
  worked: [
    { q: M`Factorise completely $12x^3-27x$.`,
      steps: [M`Common factor $3x$: $3x(4x^2-9)$.`, M`Difference of two squares: $3x(2x-3)(2x+3)$.`]},
    { q: M`Simplify $\dfrac{2x^2-5x-3}{x^2-9}$.`,
      steps: [M`Numerator: $ac=-6$, numbers $-6, 1$: $2x^2-6x+x-3=(2x+1)(x-3)$.`, M`Denominator: $(x-3)(x+3)$.`, M`Answer $\dfrac{2x+1}{x+3}$.`]},
    { q: M`Make $x$ the subject of $\;\sqrt{\dfrac{x+a}{x}}=b$.`,
      steps: [M`Square: $\dfrac{x+a}{x}=b^2$.`, M`$x+a=b^2x\Rightarrow a=b^2x-x=x(b^2-1)$.`, M`$x=\dfrac{a}{b^2-1}$.`]}
  ],
  formulas: [["Difference of two squares", M`$a^2-b^2=(a-b)(a+b)$`], ["Perfect square", M`$(a+b)^2=a^2+2ab+b^2$`], ["Grouping", M`$ax+ay+bx+by=(a+b)(x+y)$`], ["Subject twice", "collect, factorise, divide"]],
  cards: [
    ["Expand (x + 5)²", "x² + 10x + 25"],
    ["Expand (2x − 1)(x + 4)", "2x² + 7x − 4"],
    ["Factorise x² − 10x + 21", "(x − 3)(x − 7)"],
    ["Factorise 4x² − 81", "(2x − 9)(2x + 9)"],
    ["Factorise 3x² + 10x − 8", "(3x − 2)(x + 4)"],
    ["Factorise xy + 3x + 2y + 6", "(x + 2)(y + 3)"],
    ["Simplify (x² − 1)/(x + 1)", "x − 1"],
    ["Can (x + 4)/(x + 2) simplify?", "No: only common factors cancel."],
    ["1/x + 1/y", "(x + y)/(xy)"],
    ["Subject appears twice", "Collect terms with it on one side, factorise, divide."],
    ["Make r the subject: V = (4/3)πr³", "r = ∛(3V/4π)"],
    ["Identity symbol", "≡ (true for all values)"],
    ["(−2)² vs −2²", "4 vs −4"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`Expand $-2x(3-x)$.`, opts: ["$-6x-2x^2$", "$-6x+2x^2$", "$6x-2x^2$", "$-6x+x^2$"], ans: 1, why: M`$-2x\times-x=+2x^2$.` },
    { type: "mcq", marks: 1, q: M`Factorise $x^2-x-20$.`, opts: ["$(x-5)(x+4)$", "$(x+5)(x-4)$", "$(x-10)(x+2)$", "$(x-20)(x+1)$"], ans: 0, why: M`$-5\times4=-20$, $-5+4=-1$.` },
    { type: "mcq", marks: 1, q: M`If $p=-2$ and $q=5$, then $3p^2-q=$`, opts: ["$-17$", "7", "31", "$-7$"], ans: 1, why: M`$3(4)-5$.` },
    { type: "mcq", marks: 1, q: M`$\dfrac{x^2-16}{x-4}$ simplifies to`, opts: ["$x-4$", "$x+4$", "$x+2$", "$x^2-4$"], ans: 1, why: M`$(x-4)(x+4)$ over $(x-4)$.` },
    { type: "struct", marks: 2, q: M`Expand and simplify $(3x-2)(2x+5)$.`, ms: M`<b>M1</b> four correct terms $6x^2+15x-4x-10$<br><b>A1</b> $6x^2+11x-10$` },
    { type: "struct", marks: 3, q: M`Expand and simplify $(x+2)(x-1)(2x+3)$.`, ms: M`<b>M1</b> $(x^2+x-2)$<br><b>M1</b> multiply by $(2x+3)$<br><b>A1</b> $2x^3+5x^2-x-6$` },
    { type: "struct", marks: 2, q: M`Factorise completely $18a^2b-12ab^2$.`, ms: M`<b>B2</b> $6ab(3a-2b)$ (B1 for partial)` },
    { type: "struct", marks: 2, q: M`Factorise $5x^2-13x-6$.`, ms: M`<b>M1</b> $5x^2-15x+2x-6$<br><b>A1</b> $(5x+2)(x-3)$` },
    { type: "struct", marks: 3, q: M`Write as a single fraction in its simplest form: $\dfrac{2}{x-3}+\dfrac{5}{x+1}$.`, ms: M`<b>M1</b> common denominator $(x-3)(x+1)$<br><b>M1</b> $2(x+1)+5(x-3)$<br><b>A1</b> $\dfrac{7x-13}{(x-3)(x+1)}$` },
    { type: "struct", marks: 3, q: M`Simplify $\dfrac{x^2+3x}{x^2-9}$.`, ms: M`<b>B1</b> $x(x+3)$<br><b>B1</b> $(x-3)(x+3)$<br><b>B1</b> $\dfrac{x}{x-3}$` },
    { type: "struct", marks: 3, q: M`Make $t$ the subject of $\;s=\dfrac{at+b}{t-c}$.`, ms: M`<b>M1</b> $st-sc=at+b$<br><b>M1</b> $st-at=b+sc$, $t(s-a)=b+sc$<br><b>A1</b> $t=\dfrac{b+sc}{s-a}$` },
    { type: "struct", marks: 2, q: M`Make $r$ the subject of $\;A=4\pi r^2$.`, ms: M`<b>M1</b> $r^2=\dfrac{A}{4\pi}$<br><b>A1</b> $r=\sqrt{\dfrac{A}{4\pi}}$` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`Simplify $5a-3b+2a+7b$.`, ms: M`<b>B1</b> $7a+4b$` },
    { d: 1, type: "struct", marks: 2, q: M`Find the value of $4x-3y$ when $x=2.5$ and $y=-4$.`, ms: M`<b>M1</b> $10+12$<br><b>A1</b> 22` },
    { d: 1, type: "struct", marks: 1, q: M`Factorise $7x+21$.`, ms: M`<b>B1</b> $7(x+3)$` },
    { d: 1, type: "struct", marks: 2, q: M`Expand and simplify $3(2x-1)-2(x-4)$.`, ms: M`<b>M1</b> $6x-3-2x+8$<br><b>A1</b> $4x+5$` },
    { d: 1, type: "mcq", marks: 1, q: M`Which is an identity?`, opts: ["$2x+1=7$", "$x^2-1\equiv(x-1)(x+1)$", "$y=3x+2$", "$x^2=9$"], ans: 1, why: M`True for all $x$.` },
    { d: 2, type: "struct", marks: 2, q: M`Factorise $x^2+4x-21$.`, ms: M`<b>B2</b> $(x+7)(x-3)$` },
    { d: 2, type: "struct", marks: 2, q: M`Factorise $ax-bx+ay-by$.`, ms: M`<b>M1</b> $x(a-b)+y(a-b)$<br><b>A1</b> $(a-b)(x+y)$` },
    { d: 2, type: "struct", marks: 2, q: M`Make $x$ the subject of $\;y=\dfrac{2x-5}{3}$.`, ms: M`<b>M1</b> $3y=2x-5$<br><b>A1</b> $x=\dfrac{3y+5}{2}$` },
    { d: 2, type: "struct", marks: 3, q: M`Simplify $\dfrac{3x}{x^2-4}\times\dfrac{x-2}{6x^2}$.`, ms: M`<b>M1</b> $(x-2)(x+2)$<br><b>M1</b> cancelling<br><b>A1</b> $\dfrac{1}{2x(x+2)}$` },
    { d: 2, type: "struct", marks: 2, q: M`Use factorisation to work out $87^2-13^2$ without a calculator.`, ms: M`<b>M1</b> $(87-13)(87+13)$<br><b>A1</b> 7400` },
    { d: 3, type: "struct", marks: 4, q: M`Simplify $\dfrac{2x^2+7x+3}{4x^2-1}\div\dfrac{x+3}{2x-1}$.`, ms: M`<b>B1</b> $(2x+1)(x+3)$<br><b>B1</b> $(2x-1)(2x+1)$<br><b>M1</b> multiply by reciprocal $\dfrac{2x-1}{x+3}$ and cancel<br><b>A1</b> 1` },
    { d: 3, type: "struct", marks: 4, q: M`Make $x$ the subject of $\;\dfrac{1}{x}+\dfrac{1}{y}=\dfrac{1}{f}$.`, ms: M`<b>M1</b> multiply by $xyf$: $yf+xf=xy$<br><b>M1</b> $yf=xy-xf$<br><b>M1</b> $yf=x(y-f)$<br><b>A1</b> $x=\dfrac{yf}{y-f}$` },
    { d: 3, type: "struct", marks: 3, q: M`Show that $(n+3)^2-(n-3)^2$ is always a multiple of 12 for integer $n$.`, ms: M`<b>M1</b> $(n^2+6n+9)-(n^2-6n+9)$<br><b>A1</b> $12n$<br><b>B1</b> $12n$ is a multiple of 12 for any integer $n$` },
    { d: 3, type: "struct", marks: 4, q: M`Write $\dfrac{x+1}{x^2-x-2}-\dfrac{1}{x+2}$ as a single fraction in its simplest form.`, ms: M`<b>M1</b> $x^2-x-2=(x-2)(x+1)$ so first fraction $=\dfrac{1}{x-2}$<br><b>M1</b> $\dfrac{(x+2)-(x-2)}{(x-2)(x+2)}$<br><b>A1</b> $\dfrac{4}{(x-2)(x+2)}$<br><b>A1</b> or $\dfrac{4}{x^2-4}$` }
  ]
});
}
