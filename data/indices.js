window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;

/* ============================================================
   INDICES, STANDARD FORM & SURDS  (0580: E1.7, E1.8, E1.18, E2.4)
   ============================================================ */
TOPICS.push({
  id: "indices", subject: "maths", unit: 1, title: "Indices, standard form & surds",
  blurb: "The laws of indices including zero, negative and fractional powers, standard form with and without a calculator, and simplifying, expanding and rationalising surds.",
  level: "Core → Extended",
  syllabus: [
    ["E1.7", "Understand and use indices (positive, zero, negative and fractional)", 0],
    ["E1.7", "Understand and use the rules of indices", 1],
    ["E1.8", "Use the standard form A × 10ⁿ where n is an integer and 1 ≤ A < 10", 4],
    ["E1.8", "Convert numbers into and out of standard form; calculate with values in standard form", 5],
    ["E1.18", "Understand and use surds, including simplifying expressions", 7],
    ["E1.18", "Rationalise the denominator", 8],
    ["E2.4", "Use and interpret positive, negative, zero and fractional indices in algebra", 3]
  ],
  sections: [
    { h: "What an index means (E1.7)", body: M`
<p class="lead">An <b>index</b> (power, exponent) tells you how many times to multiply a number by itself: $a^n=\underbrace{a\times a\times\cdots\times a}_{n\text{ times}}$. In $5^3$, 5 is the <b>base</b> and 3 is the <b>index</b>.</p>
<ul><li>$2^5=32$, $3^4=81$, $10^6=1\,000\,000$, $(-2)^3=-8$, $(-2)^4=16$.</li>
<li>A negative base to an <b>even</b> power is positive; to an <b>odd</b> power is negative.</li>
<li>$(\tfrac{2}{3})^2=\tfrac{4}{9}$: the power applies to top and bottom.</li></ul>
<p>Learn the powers of 2 up to $2^{10}=1024$, and of 3 up to $3^5=243$: they come up constantly in non-calculator questions.</p>`},

    { h: "The laws of indices (E1.7)", body: M`
<div class="viz" data-viz="indexLaws"></div>
<table class="t"><tr><th>Law</th><th>Rule</th><th>Example</th></tr>
<tr><td>Multiplying</td><td>$a^m\times a^n=a^{m+n}$</td><td>$x^3\times x^5=x^8$</td></tr>
<tr><td>Dividing</td><td>$a^m\div a^n=a^{m-n}$</td><td>$y^9\div y^4=y^5$</td></tr>
<tr><td>Power of a power</td><td>$(a^m)^n=a^{mn}$</td><td>$(p^3)^4=p^{12}$</td></tr>
<tr><td>Power of a product</td><td>$(ab)^n=a^nb^n$</td><td>$(2x)^3=8x^3$</td></tr>
<tr><td>Zero index</td><td>$a^0=1$ ($a\ne0$)</td><td>$7^0=1$, $(3x)^0=1$</td></tr>
<tr><td>Negative index</td><td>$a^{-n}=\dfrac{1}{a^n}$</td><td>$2^{-3}=\tfrac18$</td></tr>
<tr><td>Fractional index</td><td>$a^{\frac1n}=\sqrt[n]{a}$</td><td>$27^{\frac13}=3$</td></tr>
<tr><td></td><td>$a^{\frac mn}=\left(\sqrt[n]{a}\right)^m$</td><td>$8^{\frac23}=2^2=4$</td></tr></table>
<p><b>Why $a^0=1$:</b> $\dfrac{a^3}{a^3}=1$, but by the division law it also equals $a^{3-3}=a^0$.</p>
<p><b>Why $a^{-n}=1/a^n$:</b> $\dfrac{a^2}{a^5}=\dfrac{1}{a^3}$, and by the law it equals $a^{-3}$.</p>
<p><b>Why $a^{1/2}=\sqrt a$:</b> $a^{1/2}\times a^{1/2}=a^1=a$, so $a^{1/2}$ is the number that squares to $a$.</p>
<div class="callout warn"><b class="t">Common errors</b>$3^2\times3^4=3^6$, <b>not</b> $9^6$ (the base doesn't change). $(2x^3)^2=4x^6$, not $2x^6$. $x^2+x^3$ cannot be simplified: the laws only work for multiplying and dividing.</div>`},

    { h: "Negative and fractional indices (E1.7, E2.4)", body: M`
<p>For $a^{\frac{m}{n}}$, do the <b>root first</b> (the denominator), then the power: the numbers stay small.</p>
$$16^{\frac34}=\left(\sqrt[4]{16}\right)^3=2^3=8\qquad 125^{-\frac23}=\frac{1}{125^{\frac23}}=\frac{1}{5^2}=\frac{1}{25}$$
$$\left(\frac{9}{4}\right)^{-\frac12}=\left(\frac{4}{9}\right)^{\frac12}=\frac23\qquad \left(\frac{8}{27}\right)^{-\frac43}=\left(\frac{27}{8}\right)^{\frac43}=\left(\frac32\right)^4=\frac{81}{16}$$
<p>A negative index on a fraction: <b>flip</b> the fraction and make the index positive.</p>
<h3>In algebra</h3>
<ul><li>$\dfrac{6x^5y^2}{2x^2y^{-1}}=3x^3y^3$</li><li>$(16x^8)^{\frac14}=2x^2$</li><li>$\left(\dfrac{x^{-2}}{4}\right)^{-\frac12}=\left(\dfrac{4}{x^{-2}}\right)^{\frac12}=(4x^2)^{\frac12}=2x$</li></ul>
<h3>Solving index equations</h3>
<p>Write both sides with the <b>same base</b>, then equate the powers.</p>
<ul><li>$2^x=32=2^5\Rightarrow x=5$.</li><li>$9^x=27\Rightarrow 3^{2x}=3^3\Rightarrow x=\tfrac32$.</li><li>$5^{x-1}=\tfrac{1}{125}=5^{-3}\Rightarrow x=-2$.</li><li>$4^{x}\times 2^{3}=2^{11}\Rightarrow 2^{2x+3}=2^{11}\Rightarrow x=4$.</li></ul>
<details class="check"><summary>Find $x$ if $8^x=\tfrac{1}{4}$.</summary><div>$2^{3x}=2^{-2}$, so $x=-\tfrac23$.</div></details>`},

    { h: "Standard form (E1.8)", body: M`
<p class="lead">Standard form writes very large or very small numbers as $A\times10^n$, where $1\le A\lt10$ and $n$ is an integer.</p>
<div class="viz" data-viz="standardForm"></div>
<ul><li>$3\,450\,000=3.45\times10^6$; $0.000\,072=7.2\times10^{-5}$.</li>
<li>Large numbers: positive powers. Numbers less than 1: negative powers.</li>
<li>$45\times10^3$ is <b>not</b> standard form (45 is not between 1 and 10): it equals $4.5\times10^4$. And $0.6\times10^{-2}=6\times10^{-3}$.</li></ul>
<h3>Calculating without a calculator</h3>
<ul><li><b>Multiply:</b> multiply the numbers, add the powers. $(3\times10^4)\times(5\times10^7)=15\times10^{11}=1.5\times10^{12}$.</li>
<li><b>Divide:</b> divide the numbers, subtract the powers. $(8\times10^3)\div(4\times10^{-2})=2\times10^5$.</li>
<li><b>Add/subtract:</b> make the powers the same first, or convert to ordinary numbers. $(4.2\times10^5)+(3\times10^4)=420\,000+30\,000=450\,000=4.5\times10^5$.</li></ul>
<h3>On a calculator</h3>
<p>Use the $\times10^x$ (or EXP) key. Give the answer in standard form if asked, usually to 3 significant figures: $(6.02\times10^{23})\times0.25=1.505\times10^{23}\approx1.51\times10^{23}$.</p>
<details class="check"><summary>The mass of an electron is $9.11\times10^{-31}$ kg. Find the mass of $2\times10^{6}$ electrons.</summary><div>$18.22\times10^{-25}=1.822\times10^{-24}$ kg.</div></details>`},

    { h: "Surds: simplifying (E1.18)", body: M`
<p>A <b>surd</b> is an irrational root left in root form, such as $\sqrt2$ or $3\sqrt5$. Keeping surds gives <b>exact</b> answers.</p>
<div class="callout key"><b class="t">Rules</b>$\sqrt{ab}=\sqrt a\times\sqrt b\qquad \sqrt{\dfrac ab}=\dfrac{\sqrt a}{\sqrt b}\qquad \sqrt a\times\sqrt a=a$<br>But $\sqrt{a+b}\neq\sqrt a+\sqrt b$.</div>
<p><b>Simplify</b> by taking out the largest square factor:</p>
$$\sqrt{50}=\sqrt{25\times2}=5\sqrt2\qquad \sqrt{72}=\sqrt{36\times2}=6\sqrt2\qquad \sqrt{48}=4\sqrt3$$
<p><b>Collect like surds</b> just like algebra: $\sqrt{12}+\sqrt{75}=2\sqrt3+5\sqrt3=7\sqrt3$. Unlike surds cannot be combined: $\sqrt2+\sqrt3$ stays as it is.</p>
<p><b>Expanding brackets:</b></p>
<ul><li>$\sqrt3(4-\sqrt3)=4\sqrt3-3$</li><li>$(2+\sqrt5)(3-\sqrt5)=6-2\sqrt5+3\sqrt5-5=1+\sqrt5$</li><li>$(\sqrt7+2)^2=7+4\sqrt7+4=11+4\sqrt7$</li><li>$(\sqrt6-\sqrt2)(\sqrt6+\sqrt2)=6-2=4$ (difference of two squares: the surds vanish)</li></ul>
${(() => { let s = F.rect(20, 20, 150, 150, "c cS"); for (let i = 1; i < 5; i++) s += F.line(20 + i * 30, 20, 20 + i * 30, 170, "c thin") + F.line(20, 20 + i * 30, 170, 20 + i * 30, "c thin");
  s += F.rect(20, 20, 30, 30, "o oS") + F.dim(20, 182, 170, 182, "5 × √2 = 5√2", "k", 8) + F.text(190, 40, "each small square:", "to small", "start") + F.text(190, 58, "area 2, side √2", "to small bold", "start") + F.text(190, 100, "whole square:", "tc small", "start") + F.text(190, 118, "area 25 × 2 = 50", "tc small bold", "start") + F.text(190, 136, "side √50", "tc small bold", "start");
  return F.fig(340, 200, s, "√50 = √(25 × 2) = 5√2: a square of area 50 is 5 by 5 small squares of area 2.", { size: "small" }); })()}`},

    { h: "Rationalising the denominator (E1.18)", body: M`
<p>An answer should not have a surd in the denominator. <b>Rationalise</b> by multiplying top and bottom by a suitable surd.</p>
<p><b>Single surd:</b> multiply top and bottom by that surd.</p>
$$\frac{6}{\sqrt3}=\frac{6\sqrt3}{3}=2\sqrt3\qquad \frac{5}{2\sqrt{10}}=\frac{5\sqrt{10}}{20}=\frac{\sqrt{10}}{4}$$
<p><b>Denominator $a+\sqrt b$:</b> multiply top and bottom by the <b>conjugate</b> $a-\sqrt b$, using $(a+\sqrt b)(a-\sqrt b)=a^2-b$.</p>
$$\frac{4}{3+\sqrt5}=\frac{4(3-\sqrt5)}{(3+\sqrt5)(3-\sqrt5)}=\frac{4(3-\sqrt5)}{9-5}=3-\sqrt5$$
$$\frac{1+\sqrt2}{\sqrt2-1}=\frac{(1+\sqrt2)(\sqrt2+1)}{2-1}=1+2\sqrt2+2=3+2\sqrt2$$
<details class="check"><summary>Rationalise $\dfrac{10}{\sqrt5}$ and $\dfrac{2}{\sqrt7-\sqrt3}$.</summary><div>$2\sqrt5$; $\dfrac{2(\sqrt7+\sqrt3)}{7-3}=\dfrac{\sqrt7+\sqrt3}{2}$.</div></details>`},

    { h: "Surds in geometry (E1.18)", body: M`
<p>Exact answers in Pythagoras and trigonometry often involve surds.</p>
${(() => { let s = F.poly([[40, 150], [200, 150], [200, 30]], "k cS", true) + F.rightAngle(200, 150, -1, 0, 0, -1, 14) + F.text(120, 170, "√12", "tk bold") + F.text(215, 95, "√6", "tk bold", "start") + F.text(105, 82, "x", "tc bold");
  return F.fig(300, 180, s, "x² = 12 + 6 = 18, so x = √18 = 3√2.", { size: "tiny" }); })()}
<p>Exact trig values (see <i>Trigonometry</i>): $\sin60^\circ=\dfrac{\sqrt3}{2}$, $\cos45^\circ=\dfrac{1}{\sqrt2}=\dfrac{\sqrt2}{2}$, $\tan30^\circ=\dfrac{1}{\sqrt3}=\dfrac{\sqrt3}{3}$.</p>
<div class="callout ex"><b class="t">Exam-style</b>A rectangle has sides $(3+\sqrt2)$ cm and $(3-\sqrt2)$ cm. Area $=9-2=7$ cm²: a whole number, because of the difference of two squares.</div>`}
  ],
  worked: [
    { q: M`Simplify $\dfrac{(2x^3y)^4}{8x^5y^{-2}}$.`,
      steps: [M`Numerator: $2^4x^{12}y^4=16x^{12}y^4$.`, M`Divide: $\tfrac{16}{8}=2$, $x^{12-5}=x^7$, $y^{4-(-2)}=y^6$.`, M`Answer $2x^7y^6$.`]},
    { q: M`Without a calculator, work out $(4\times10^{-3})\times(6\times10^{8})$, giving the answer in standard form.`,
      steps: [M`$4\times6=24$ and $10^{-3+8}=10^5$.`, M`$24\times10^5=2.4\times10^6$.`]},
    { q: M`Simplify $\dfrac{\sqrt{48}+\sqrt{27}}{\sqrt3}$.`,
      steps: [M`$\sqrt{48}=4\sqrt3$, $\sqrt{27}=3\sqrt3$; sum $7\sqrt3$.`, M`$7\sqrt3\div\sqrt3=7$.`]}
  ],
  formulas: [["Multiply", M`$a^m\times a^n=a^{m+n}$`], ["Divide", M`$a^m\div a^n=a^{m-n}$`], ["Power of power", M`$(a^m)^n=a^{mn}$`], ["Zero / negative", M`$a^0=1,\quad a^{-n}=\dfrac1{a^n}$`], ["Fractional", M`$a^{\frac mn}=(\sqrt[n]a)^m$`], ["Standard form", M`$A\times10^n,\ 1\le A\lt10$`], ["Surds", M`$\sqrt{ab}=\sqrt a\sqrt b$`], ["Conjugate", M`$(a+\sqrt b)(a-\sqrt b)=a^2-b$`]],
  cards: [
    ["a⁰ =", "1 (a ≠ 0)"],
    ["a⁻ⁿ =", "1/aⁿ"],
    ["a^(1/n) =", "the n-th root of a"],
    ["8^(2/3)", "4"],
    ["16^(−1/2)", "1/4"],
    ["(2/3)⁻²", "9/4"],
    ["x³ × x⁵", "x⁸"],
    ["(x³)⁴", "x¹²"],
    ["(3x²)³", "27x⁶"],
    ["Standard form rule", "A × 10ⁿ with 1 ≤ A < 10"],
    ["0.00056 in standard form", "5.6 × 10⁻⁴"],
    ["Multiply in standard form", "Multiply numbers, add powers, re-adjust."],
    ["√75 simplified", "5√3"],
    ["√2 × √8", "4"],
    ["(√5)²", "5"],
    ["Rationalise 1/√2", "√2/2"],
    ["Rationalise 1/(2+√3)", "Multiply by (2−√3): 2 − √3"],
    ["Can √2 + √3 be simplified?", "No."],
    ["Solve 9ˣ = 27", "x = 3/2"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`$5^{-2}=$`, opts: ["$-25$", "$-10$", "$\tfrac{1}{25}$", "$\tfrac{1}{10}$"], ans: 2, why: M`$\tfrac{1}{5^2}$.` },
    { type: "mcq", marks: 1, q: M`$64^{\frac23}=$`, opts: ["16", "32", "42.7", "8"], ans: 0, why: M`$\sqrt[3]{64}=4$, $4^2=16$.` },
    { type: "mcq", marks: 1, q: M`$0.000\,302$ in standard form is`, opts: ["$3.02\times10^{-4}$", "$3.02\times10^{4}$", "$302\times10^{-6}$", "$3.02\times10^{-3}$"], ans: 0, why: M`Point moves 4 places.` },
    { type: "mcq", marks: 1, q: M`$\sqrt{98}=$`, opts: ["$2\sqrt{7}$", "$7\sqrt2$", "$49\sqrt2$", "$9.8$"], ans: 1, why: M`$\sqrt{49\times2}$.` },
    { type: "mcq", marks: 1, q: M`$(2\sqrt3)^2=$`, opts: ["$6$", "$12$", "$4\sqrt3$", "$36$"], ans: 1, why: M`$4\times3$.` },
    { type: "struct", marks: 2, q: M`Simplify $\dfrac{12a^7b^3}{4a^2b^5}$.`, ms: M`<b>B1</b> $3a^5$<br><b>B1</b> $b^{-2}$ or $\dfrac{3a^5}{b^2}$` },
    { type: "struct", marks: 2, q: M`Find the value of $\left(\dfrac{16}{81}\right)^{-\frac34}$.`, ms: M`<b>M1</b> $\left(\tfrac{81}{16}\right)^{\frac34}=\left(\tfrac32\right)^3$<br><b>A1</b> $\tfrac{27}{8}$` },
    { type: "struct", marks: 2, q: M`Solve $3^{2x+1}=243$.`, ms: M`<b>M1</b> $243=3^5$, so $2x+1=5$<br><b>A1</b> $x=2$` },
    { type: "struct", marks: 2, q: M`Work out $(6\times10^5)\div(1.5\times10^{-3})$, giving your answer in standard form.`, ms: M`<b>M1</b> $4\times10^{8}$ (6 ÷ 1.5 = 4, 5 − (−3) = 8)<br><b>A1</b> $4\times10^8$` },
    { type: "struct", marks: 2, q: M`Expand and simplify $(5-\sqrt3)(2+\sqrt3)$.`, ms: M`<b>M1</b> $10+5\sqrt3-2\sqrt3-3$<br><b>A1</b> $7+3\sqrt3$` },
    { type: "struct", marks: 3, q: M`Rationalise the denominator of $\dfrac{8}{\sqrt5-1}$, simplifying fully.`, ms: M`<b>M1</b> multiply by $\sqrt5+1$<br><b>M1</b> denominator $5-1=4$<br><b>A1</b> $2\sqrt5+2$` },
    { type: "struct", marks: 2, q: M`Light travels at $3\times10^8$ m/s. How long does it take to travel $1.5\times10^{11}$ m (Sun to Earth)?`, ms: M`<b>M1</b> $1.5\times10^{11}\div3\times10^8$<br><b>A1</b> 500 s` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`Write down the value of $7^0$.`, ms: M`<b>B1</b> 1` },
    { d: 1, type: "struct", marks: 1, q: M`Write $4.07\times10^{5}$ as an ordinary number.`, ms: M`<b>B1</b> 407 000` },
    { d: 1, type: "struct", marks: 1, q: M`Simplify $p^6\times p^3$.`, ms: M`<b>B1</b> $p^9$` },
    { d: 1, type: "mcq", marks: 1, q: M`$\sqrt{25}\times\sqrt{4}=$`, opts: ["$\sqrt{29}$", "10", "100", "7"], ans: 1, why: M`$5\times2$.` },
    { d: 1, type: "struct", marks: 1, q: M`Write $0.0049$ in standard form.`, ms: M`<b>B1</b> $4.9\times10^{-3}$` },
    { d: 2, type: "struct", marks: 2, q: M`Find the value of $27^{-\frac23}$.`, ms: M`<b>M1</b> $\dfrac{1}{(\sqrt[3]{27})^2}$<br><b>A1</b> $\tfrac19$` },
    { d: 2, type: "struct", marks: 2, q: M`Simplify $\left(\dfrac{x^{12}}{64}\right)^{\frac13}$.`, ms: M`<b>B1</b> $x^4$<br><b>B1</b> $\div4$: $\dfrac{x^4}{4}$` },
    { d: 2, type: "struct", marks: 2, q: M`Simplify $\sqrt{18}+\sqrt{50}-\sqrt{8}$.`, ms: M`<b>M1</b> $3\sqrt2+5\sqrt2-2\sqrt2$<br><b>A1</b> $6\sqrt2$` },
    { d: 2, type: "struct", marks: 3, q: M`The population of a country is $6.8\times10^7$ and its area is $2.5\times10^5$ km². Calculate the population density, giving your answer in standard form.`, ms: M`<b>M1</b> $6.8\times10^7\div2.5\times10^5$<br><b>A1</b> 272<br><b>A1</b> $2.72\times10^2$ people per km²` },
    { d: 2, type: "struct", marks: 2, q: M`Find $n$ if $2^n=\dfrac{1}{32}$.`, ms: M`<b>M1</b> $\tfrac1{32}=2^{-5}$<br><b>A1</b> $n=-5$` },
    { d: 2, type: "mcq", marks: 1, q: M`$(3\times10^4)+(5\times10^3)=$`, opts: ["$8\times10^7$", "$3.5\times10^4$", "$8\times10^4$", "$1.5\times10^8$"], ans: 1, why: M`$30\,000+5000=35\,000$.` },
    { d: 3, type: "struct", marks: 3, q: M`Solve $\dfrac{4^{x}}{2^{x-1}}=16$.`, ms: M`<b>M1</b> $\dfrac{2^{2x}}{2^{x-1}}=2^{x+1}$<br><b>M1</b> $2^{x+1}=2^4$<br><b>A1</b> $x=3$` },
    { d: 3, type: "struct", marks: 3, q: M`Show that $\dfrac{2+\sqrt3}{2-\sqrt3}=7+4\sqrt3$.`, ms: M`<b>M1</b> multiply top and bottom by $2+\sqrt3$<br><b>M1</b> numerator $4+4\sqrt3+3$; denominator $4-3=1$<br><b>A1</b> $7+4\sqrt3$ shown` },
    { d: 3, type: "struct", marks: 3, q: M`A right-angled triangle has shorter sides $(2+\sqrt2)$ cm and $(2-\sqrt2)$ cm. Find the exact length of the hypotenuse.`, ms: M`<b>M1</b> $(2+\sqrt2)^2+(2-\sqrt2)^2$<br><b>M1</b> $(6+4\sqrt2)+(6-4\sqrt2)=12$<br><b>A1</b> $\sqrt{12}=2\sqrt3$ cm` },
    { d: 3, type: "struct", marks: 3, q: M`$p=4\times10^{-3}$ and $q=5\times10^{-4}$. Find, in standard form, (a) $pq$, (b) $p+q$, (c) $\dfrac{p}{q^2}$.`, ms: M`<b>B1</b> $2\times10^{-6}$<br><b>B1</b> $4.5\times10^{-3}$<br><b>B1</b> $1.6\times10^{4}$` }
  ]
});
}
