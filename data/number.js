window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
// Venn diagram of two sets; shade: function(region) -> true for regions to shade. Regions: "a" (A only), "ab", "b" (B only), "o" (outside)
const venn = (shade, cap, labels = ["A", "B"], items = null) => {
  const W = 260, H = 170, ax = 100, bx = 160, cy = 88, r = 58; let s = "";
  const hh = Math.sqrt(r * r - ((bx - ax) / 2) ** 2), mx = (ax + bx) / 2, P1 = `${mx},${cy - hh}`, P2 = `${mx},${cy + hh}`, A = `A${r},${r} 0`;
  const reg = { ab: `M${P1} ${A} 0 1 ${P2} ${A} 0 1 ${P1}Z`, a: `M${P1} ${A} 1 0 ${P2} ${A} 0 1 ${P1}Z`, b: `M${P1} ${A} 1 1 ${P2} ${A} 0 0 ${P1}Z`, o: `M12,12 H${W - 12} V${H - 12} H12 Z M${P1} ${A} 1 0 ${P2} ${A} 1 0 ${P1}Z` };
  ["a", "ab", "b", "o"].forEach(k => { if (shade(k)) s += `<path d="${reg[k]}" style="fill:var(--maths);opacity:.35;stroke:none;fill-rule:evenodd"/>`; });
  s += F.rect(12, 12, W - 24, H - 24, "k") + F.circ(ax, cy, r, "k") + F.circ(bx, cy, r, "k") + F.text(ax - 40, 32, labels[0], "tk bold") + F.text(bx + 40, 32, labels[1], "tk bold") + F.text(W - 22, 30, "ℰ", "tk", "end");
  if (items) { const put = (arr, x) => arr.forEach((v, i) => s += F.text(x, cy - (arr.length - 1) * 9 + i * 18 + 4, v, "tk small")); put(items[0], ax - 28); put(items[1], (ax + bx) / 2); put(items[2], bx + 28); if (items[3]) s += F.text(30, H - 20, items[3].join("  "), "tk small", "start"); }
  return F.fig(W, H, s, cap, { size: items ? "small" : "tiny" });
};

/* ============================================================
   NUMBER  (0580: E1.1 – E1.6)
   ============================================================ */
TOPICS.push({
  id: "number", subject: "maths", unit: 1, title: "Number, sets & fractions",
  blurb: "Types of number, primes, HCF and LCM by prime factors, rational and irrational numbers, set notation and Venn diagrams, fractions, recurring decimals and the order of operations.",
  level: "Core → Extended", demo: "hcflcm",
  syllabus: [
    ["E1.1", "Identify and use natural numbers, integers, prime numbers, square and cube numbers, triangle numbers, factors, multiples and reciprocals", 0],
    ["E1.1", "Express numbers as a product of prime factors; find the HCF and LCM of two or more numbers", 1],
    ["E1.1", "Identify rational and irrational numbers", 3],
    ["E1.2", "Understand and use set language, notation and Venn diagrams to describe sets", 4],
    ["E1.2", "Use Venn diagrams with up to three sets; n(A), A′, A ∩ B, A ∪ B, ∅, ℰ, ∈, ⊆", 5],
    ["E1.3", "Calculate with squares, square roots, cubes and cube roots and other powers and roots", 0],
    ["E1.4", "Use the language and notation of fractions, decimals and percentages in appropriate contexts; convert between them", 6],
    ["E1.4", "Convert recurring decimals to fractions", 7],
    ["E1.5", "Order quantities by magnitude and use the symbols =, ≠, >, <, ≥, ≤", 8],
    ["E1.6", "Use the four operations for calculations with integers, fractions and decimals, including correct ordering of operations and the use of brackets", 9]
  ],
  sections: [
    { h: "Types of number (E1.1)", body: M`
<p class="lead">Every number you meet in IGCSE belongs to a family. Knowing the names precisely matters: exam questions say things like "write down a <i>prime factor</i>" or "an <i>irrational</i> number between 3 and 4" and the mark depends on the exact meaning.</p>
<table class="t"><tr><th>Name</th><th>Meaning</th><th>Examples</th></tr>
<tr><td><b>Natural numbers</b></td><td>The counting numbers</td><td>1, 2, 3, 4, …</td></tr>
<tr><td><b>Integers</b></td><td>Whole numbers, positive, negative or zero</td><td>…, −2, −1, 0, 1, 2, …</td></tr>
<tr><td><b>Prime number</b></td><td>Exactly <b>two</b> factors: 1 and itself</td><td>2, 3, 5, 7, 11, 13, 17, 19, 23, 29, …</td></tr>
<tr><td><b>Square numbers</b></td><td>$n^2$</td><td>1, 4, 9, 16, 25, 36, 49, 64, 81, 100, …</td></tr>
<tr><td><b>Cube numbers</b></td><td>$n^3$</td><td>1, 8, 27, 64, 125, 216, …</td></tr>
<tr><td><b>Triangle numbers</b></td><td>$\tfrac12 n(n+1)$: dots that make a triangle</td><td>1, 3, 6, 10, 15, 21, 28, …</td></tr>
<tr><td><b>Factor</b> of $n$</td><td>Divides into $n$ exactly</td><td>Factors of 12: 1, 2, 3, 4, 6, 12</td></tr>
<tr><td><b>Multiple</b> of $n$</td><td>In the $n$ times table</td><td>Multiples of 7: 7, 14, 21, …</td></tr>
<tr><td><b>Reciprocal</b> of $x$</td><td>$\dfrac{1}{x}$; a number times its reciprocal is 1</td><td>Reciprocal of $\tfrac{2}{5}$ is $\tfrac{5}{2}$</td></tr></table>
${(() => { let s = ""; [1, 3, 6, 10].forEach((T, k) => { const n = k + 1, x0 = 30 + k * 115; for (let r = 0; r < n; r++) for (let c = 0; c <= r; c++) s += F.circ(x0 + 40 - r * 9 + c * 18, 30 + r * 18, 6, "c cS"); s += F.text(x0 + 40, 125, String(T), "tc bold"); });
  return F.fig(480, 140, s, "Triangle numbers: each new row adds one more dot than the last (+2, +3, +4, …).", { size: "small" }); })()}
<div class="callout warn"><b class="t">Traps</b><b>1 is not prime</b> (it has only one factor). <b>2 is the only even prime.</b> 0 is an integer but not a natural number.</div>
<details class="check"><summary>From the list 15, 16, 17, 21, 27, 28, write down (a) a prime, (b) a cube, (c) a triangle number, (d) a multiple of 7.</summary><div>(a) 17 (b) 27 (c) 15, 21 or 28 (d) 21 or 28.</div></details>`},

    { h: "Prime factors, HCF and LCM (E1.1)", body: M`
<p>Every integer greater than 1 can be written as a <b>product of prime factors</b> in exactly one way. Use a <b>factor tree</b> (or repeated division) and write the answer in index form.</p>
<div class="viz" data-viz="factorTree"></div>
<p>$$360 = 2\times2\times2\times3\times3\times5 = 2^3\times3^2\times5$$</p>
<ul><li>The <b>highest common factor (HCF)</b> is the largest number that divides into both. Take the primes that are <b>common</b> to both, to the <b>lower</b> power.</li>
<li>The <b>lowest common multiple (LCM)</b> is the smallest number that both divide into. Take <b>every</b> prime that appears, to the <b>higher</b> power.</li></ul>
<p>For $84=2^2\times3\times7$ and $120=2^3\times3\times5$:</p>
${venn(() => false, "Prime factors of 84 and 120 in a Venn diagram.", ["84", "120"], [["7"], ["2", "2", "3"], ["2", "5"]])}
<p>$\text{HCF}=2^2\times3=12$ (the overlap) and $\text{LCM}=2^3\times3\times5\times7=840$ (everything). A useful check: $\text{HCF}\times\text{LCM}=84\times120=10\,080$ ✓.</p>
<div class="callout key"><b class="t">Word problems</b>"Largest possible …", "split into equal groups", "biggest tile that fits" → <b>HCF</b>. "When will they next coincide?", "smallest number of …", "both buses arrive together again" → <b>LCM</b>.</div>
<details class="check"><summary>Two lighthouses flash every 18 s and every 24 s. They flash together at midnight. When do they next flash together?</summary><div>LCM of 18 ($2\times3^2$) and 24 ($2^3\times3$) is $2^3\times3^2=72$ s after midnight.</div></details>
<p>Use the <b>HCF and LCM lab</b> at the bottom of the page to try any pair of numbers.</p>`},

    { h: "Powers and roots (E1.3)", body: M`
<p>Know by heart: squares to $15^2=225$, cubes $1, 8, 27, 64, 125$ and $1000$, and that $\sqrt{\phantom{x}}$ means the <b>positive</b> square root.</p>
<ul><li>$\sqrt{144}=12$, $\sqrt[3]{-125}=-5$ (a negative number has a real cube root but no real square root).</li>
<li>Estimating roots: $\sqrt{50}$ lies between $\sqrt{49}=7$ and $\sqrt{64}=8$, closer to 7: about 7.1.</li>
<li>The equation $x^2=25$ has <b>two</b> solutions, $x=\pm5$, even though $\sqrt{25}=5$ only.</li></ul>
<details class="check"><summary>Without a calculator, find $\sqrt{0.09}$ and $\sqrt[3]{0.008}$.</summary><div>$0.3$ (since $0.3^2=0.09$) and $0.2$ (since $0.2^3=0.008$).</div></details>`},

    { h: "Rational and irrational numbers (E1.1)", body: M`
<p>A <b>rational</b> number can be written as a fraction $\dfrac{a}{b}$ where $a$ and $b$ are integers ($b\neq0$). All integers, terminating decimals and <b>recurring</b> decimals are rational.</p>
<p>An <b>irrational</b> number cannot be written as a fraction: its decimal goes on forever <b>without repeating</b>. Examples: $\pi$, $\sqrt{2}$, $\sqrt{3}$, $\sqrt{5}$ (the square root of any non-square integer), $\sqrt[3]{2}$.</p>
${(() => { let s = F.rect(10, 10, 500, 190, "m", 14) + F.text(26, 32, "Real numbers", "tk bold", "start");
  s += F.rect(25, 45, 300, 145, "cS c", 12) + F.text(40, 66, "Rational", "tc bold", "start") + F.rect(40, 80, 190, 100, "bS b", 10) + F.text(52, 100, "Integers", "tb bold", "start") + F.rect(55, 112, 110, 58, "gS g", 8) + F.text(66, 132, "Natural", "tg bold", "start") + F.text(66, 155, "1, 7, 100", "tk small", "start");
  s += F.text(175, 150, "0, −3", "tk small") + F.text(278, 100, "½, −0.4", "tk small") + F.text(278, 130, "0.3̇", "tk small") + F.text(278, 160, "22/7", "tk small");
  s += F.rect(340, 45, 160, 145, "oS o", 12) + F.text(355, 66, "Irrational", "to bold", "start") + F.text(420, 100, "π", "tk") + F.text(420, 125, "√2, √7", "tk small") + F.text(420, 150, "1.4142…", "tk small") + F.text(420, 172, "∛5", "tk small");
  return F.fig(520, 210, s, "Every real number is either rational or irrational.", { size: "wide" }); })()}
<div class="callout warn"><b class="t">Careful</b>$\sqrt{9}=3$ and $\sqrt{\tfrac{4}{25}}=\tfrac25$ are <b>rational</b>. $\tfrac{22}{7}$ is rational (it is only an approximation to $\pi$). $\pi^2$ and $2\pi$ are irrational. But $\sqrt2\times\sqrt8=\sqrt{16}=4$ is rational: irrationals can combine to give rationals.</div>
<details class="check"><summary>Which of these are irrational? $\sqrt{12}$, $0.\dot{7}$, $\sqrt{0.16}$, $\pi+1$, $\dfrac{\sqrt{18}}{\sqrt2}$</summary><div>$\sqrt{12}$ and $\pi+1$. ($0.\dot7=\tfrac79$, $\sqrt{0.16}=0.4$, $\tfrac{\sqrt{18}}{\sqrt2}=\sqrt9=3$.)</div></details>`},

    { h: "Sets and set notation (E1.2)", body: M`
<p class="lead">A <b>set</b> is a collection of objects (elements). Sets are written in curly brackets: $A=\{2, 4, 6, 8\}$.</p>
<table class="t"><tr><th>Notation</th><th>Meaning</th><th>Example (A = {1,2,3,4}, B = {3,4,5}, ℰ = {1,…,7})</th></tr>
<tr><td>$x\in A$</td><td>$x$ is an element of $A$</td><td>$2\in A$; $5\notin A$</td></tr>
<tr><td>$n(A)$</td><td>Number of elements in $A$</td><td>$n(A)=4$</td></tr>
<tr><td>$\mathscr{E}$</td><td>Universal set (everything being considered)</td><td>{1, 2, 3, 4, 5, 6, 7}</td></tr>
<tr><td>$A'$</td><td>Complement: elements <b>not</b> in $A$</td><td>{5, 6, 7}</td></tr>
<tr><td>$A\cap B$</td><td>Intersection: in $A$ <b>and</b> $B$</td><td>{3, 4}</td></tr>
<tr><td>$A\cup B$</td><td>Union: in $A$ <b>or</b> $B$ (or both)</td><td>{1, 2, 3, 4, 5}</td></tr>
<tr><td>$\varnothing$ or { }</td><td>The empty set</td><td>$A\cap\{7\}=\varnothing$</td></tr>
<tr><td>$C\subseteq A$</td><td>$C$ is a subset of $A$</td><td>$\{1, 2\}\subseteq A$</td></tr></table>
<p>Sets can also be described in words or with set-builder notation: $\{x : x \text{ is an integer},\ 2\lt x\le 6\}=\{3, 4, 5, 6\}$.</p>`},

    { h: "Venn diagrams and shading (E1.2)", body: M`
<p>Venn diagrams show sets as overlapping circles inside a rectangle ($\mathscr{E}$). Learn the shading for each region:</p>
${F.row(venn(r => r === "ab", "A ∩ B"), venn(r => r !== "o", "A ∪ B"), venn(r => r === "b" || r === "o", "A′"))}
${F.row(venn(r => r === "a", "A ∩ B′"), venn(r => r === "o", "(A ∪ B)′"), venn(r => r === "a" || r === "b", "(A ∩ B)′ ∩ (A ∪ B)"))}
<p><b>Counting with Venn diagrams:</b> fill the <b>overlap first</b>, then work outwards.</p>
<div class="callout ex"><b class="t">Worked example</b>In a class of 30, 18 study French, 15 study Spanish and 7 study both. How many study neither?<br>Overlap = 7; French only = 18 − 7 = 11; Spanish only = 15 − 7 = 8. Total in circles = 11 + 7 + 8 = 26. Neither = 30 − 26 = <b>4</b>.</div>
${venn(() => false, "Fill the overlap first: F only 11, both 7, S only 8, neither 4.", ["French", "Spanish"], [["11"], ["7"], ["8"], ["4"]])}
<p><b>Three sets:</b> the same idea with three circles: start with the centre (all three), then the pairwise overlaps, then each set only. Problems often use algebra: if $x$ students are in all three, write every region in terms of $x$ and set the total equal to $n(\mathscr{E})$.</p>
<details class="check"><summary>$n(\mathscr{E})=40$, $n(A)=22$, $n(B)=25$, $n(A\cup B)'=3$. Find $n(A\cap B)$.</summary><div>$n(A\cup B)=37$. $n(A)+n(B)-n(A\cap B)=37 \Rightarrow 47-n(A\cap B)=37$, so $n(A\cap B)=10$.</div></details>`},

    { h: "Fractions, decimals and percentages (E1.4)", body: M`
<p>All three are ways of writing the same quantity.</p>
<table class="t"><tr><th>Fraction</th><th>$\tfrac12$</th><th>$\tfrac14$</th><th>$\tfrac34$</th><th>$\tfrac15$</th><th>$\tfrac18$</th><th>$\tfrac13$</th><th>$\tfrac23$</th><th>$\tfrac1{10}$</th></tr>
<tr><td>Decimal</td><td>0.5</td><td>0.25</td><td>0.75</td><td>0.2</td><td>0.125</td><td>$0.\dot3$</td><td>$0.\dot6$</td><td>0.1</td></tr>
<tr><td>Percentage</td><td>50%</td><td>25%</td><td>75%</td><td>20%</td><td>12.5%</td><td>$33\tfrac13$%</td><td>$66\tfrac23$%</td><td>10%</td></tr></table>
<ul><li>Fraction → decimal: divide the numerator by the denominator.</li><li>Decimal → percentage: multiply by 100.</li><li>A fraction in its lowest terms gives a <b>terminating</b> decimal only if its denominator has no prime factors other than 2 and 5.</li></ul>
<h3>Calculating with fractions (no calculator)</h3>
<ul><li><b>Add/subtract:</b> use a common denominator. $\tfrac23+\tfrac34=\tfrac{8}{12}+\tfrac{9}{12}=\tfrac{17}{12}=1\tfrac{5}{12}$.</li>
<li><b>Multiply:</b> top × top, bottom × bottom (cancel first). $\tfrac{4}{9}\times\tfrac{3}{8}=\tfrac{1}{3}\times\tfrac{1}{2}=\tfrac16$.</li>
<li><b>Divide:</b> multiply by the reciprocal. $\tfrac{5}{6}\div\tfrac{10}{9}=\tfrac{5}{6}\times\tfrac{9}{10}=\tfrac{3}{4}$.</li>
<li><b>Mixed numbers:</b> convert to improper fractions first. $2\tfrac13\times1\tfrac{1}{2}=\tfrac73\times\tfrac32=\tfrac72=3\tfrac12$.</li></ul>
${(() => { let s = ""; for (let i = 0; i < 3; i++) s += F.rect(20 + i * 60, 20, 60, 34, i < 2 ? "cS c" : "m"); s += F.text(110, 72, "2/3", "tc bold");
  for (let i = 0; i < 4; i++) s += F.rect(260 + i * 45, 20, 45, 34, i < 3 ? "bS b" : "m"); s += F.text(350, 72, "3/4", "tb bold");
  for (let i = 0; i < 12; i++) s += F.rect(20 + i * 35, 100, 35, 34, i < 8 ? "cS c" : i < 12 ? "bS b" : "m"); s += F.text(160, 152, "8/12", "tc bold") + F.text(370, 152, "+ 9/12 (one bar overflows → 17/12)", "tb small bold");
  return F.fig(500, 165, s, "Rewriting thirds and quarters as twelfths lets you add them.", { size: "small" }); })()}
<details class="check"><summary>Work out $3\tfrac12-1\tfrac{5}{6}$.</summary><div>$\tfrac{21}{6}-\tfrac{11}{6}=\tfrac{10}{6}=1\tfrac23$.</div></details>`},

    { h: "Recurring decimals to fractions (E1.4)", body: M`
<p>A dot over a digit means it repeats; dots over the first and last digits of a block mean the whole block repeats: $0.\dot{4}=0.444\ldots$, $0.\dot{2}\dot{7}=0.2727\ldots$, $0.1\dot{3}=0.1333\ldots$</p>
<div class="callout key"><b class="t">Method</b>Let $x$ = the decimal. Multiply by $10^k$ where $k$ is the length of the repeating block, so the repeating parts line up. Subtract to kill the repeating tail. Solve for $x$.</div>
<p><b>Example 1:</b> $x=0.\dot2\dot7=0.272727\ldots$</p>
$$\begin{aligned}100x&=27.272727\ldots\\ x&=\phantom{0}0.272727\ldots\\ 99x&=27\\ x&=\tfrac{27}{99}=\tfrac{3}{11}\end{aligned}$$
<p><b>Example 2:</b> $x=0.1\dot3=0.1333\ldots$ (only the 3 repeats)</p>
$$\begin{aligned}10x&=1.333\ldots\\ x&=0.1333\ldots\\ 9x&=1.2\\ x&=\tfrac{1.2}{9}=\tfrac{12}{90}=\tfrac{2}{15}\end{aligned}$$
<p><b>Example 3:</b> $x=0.2\dot1\dot5=0.2151515\ldots$: $1000x=215.1515\ldots$ and $10x=2.1515\ldots$; subtract: $990x=213$, so $x=\tfrac{213}{990}=\tfrac{71}{330}$.</p>
<div class="callout warn"><b class="t">Show your working</b>"Show that $0.\dot4\dot5=\tfrac{5}{11}$" needs the full algebra: two lines with $x$ and $100x$, the subtraction, and the simplification. Just dividing 5 by 11 on a calculator scores nothing.</div>`},

    { h: "Ordering and inequality symbols (E1.5)", body: M`
<p>To order numbers in different forms, convert them all to <b>decimals</b> (to 3 or 4 decimal places).</p>
<div class="callout ex"><b class="t">Example</b>Order from smallest: $\tfrac{5}{8},\ 0.6\dot2,\ 62\%,\ \sqrt{0.39}$.<br>$\tfrac58=0.625$; $0.6\dot2=0.6222\ldots$; $62\%=0.62$; $\sqrt{0.39}=0.6245\ldots$<br>Order: $62\%,\ 0.6\dot2,\ \sqrt{0.39},\ \tfrac58$.</div>
<p>Symbols: $=$ equal, $\neq$ not equal, $\gt$ greater than, $\lt$ less than, $\ge$ greater than or equal to, $\le$ less than or equal to. On a number line, $\ge$ and $\le$ use a <b>filled</b> circle; $\gt$ and $\lt$ use an <b>open</b> circle.</p>
${(() => { let s = F.line(20, 50, 480, 50, "k") ; for (let i = -3; i <= 4; i++) { const x = 60 + (i + 3) * 55; s += F.line(x, 44, x, 56, "k") + F.text(x, 76, String(i), "tm small"); }
  s += F.line(60 + 1 * 55, 30, 60 + 6 * 55, 30, "c thick") + F.circ(60 + 1 * 55, 30, 6, "c") + F.circ(60 + 6 * 55, 30, 6, "c cF") + F.text(250, 18, "−2 < x ≤ 3", "tc bold");
  return F.fig(500, 90, s, "Open circle: not included. Filled circle: included.", { size: "small" }); })()}
<p>Negative numbers: $-7\lt-2$ because $-7$ is further left on the number line.</p>`},

    { h: "The four operations and order of operations (E1.6)", body: M`
<p>Calculations follow <b>BIDMAS</b>: <b>B</b>rackets, <b>I</b>ndices, <b>D</b>ivision and <b>M</b>ultiplication (left to right), <b>A</b>ddition and <b>S</b>ubtraction (left to right).</p>
<ul><li>$5+3\times4=5+12=17$ (not 32).</li><li>$(5+3)\times4=32$.</li><li>$20-6\div2+1=20-3+1=18$.</li><li>$-3^2=-9$ but $(-3)^2=9$: the index applies before the minus sign unless brackets are used.</li></ul>
<p><b>Negative numbers:</b> same signs give positive, different signs give negative when multiplying or dividing: $(-6)\times(-4)=24$, $(-20)\div5=-4$. Subtracting a negative is adding: $3-(-5)=8$.</p>
<div class="callout ex"><b class="t">Inserting brackets</b>Make $6+4\times5-2=48$ true. Try $(6+4)\times(5-2)=30$ ✗; $6+4\times(5-2)=18$ ✗; $(6+4\times5)-2=24$ ✗ … $(6+4)\times5-2=48$ ✓.</div>
<details class="check"><summary>Work out $\dfrac{3+5^2}{2\times(9-2)}$.</summary><div>Top: $3+25=28$. Bottom: $2\times7=14$. Answer 2.</div></details>`}
  ],
  worked: [
    { q: M`Write 252 and 600 as products of prime factors. Hence find their HCF and LCM.`,
      steps: [M`$252=2^2\times3^2\times7$; $600=2^3\times3\times5^2$.`, M`HCF: common primes, lower powers: $2^2\times3=12$.`, M`LCM: all primes, higher powers: $2^3\times3^2\times5^2\times7=12\,600$.`]},
    { q: M`Show that $0.3\dot1\dot8=\dfrac{7}{22}$.`,
      steps: [M`Let $x=0.31818\ldots$. Then $10x=3.1818\ldots$ and $1000x=318.1818\ldots$`, M`$1000x-10x=990x=315$.`, M`$x=\dfrac{315}{990}=\dfrac{7}{22}$ (dividing by 45).`]},
    { q: M`$\mathscr{E}=\{1,2,\ldots,12\}$, $A=\{\text{multiples of }3\}$, $B=\{\text{factors of }12\}$. List $A\cap B$, $A\cup B$ and $(A\cup B)'$.`,
      steps: [M`$A=\{3,6,9,12\}$, $B=\{1,2,3,4,6,12\}$.`, M`$A\cap B=\{3,6,12\}$; $A\cup B=\{1,2,3,4,6,9,12\}$.`, M`$(A\cup B)'=\{5,7,8,10,11\}$.`]}
  ],
  formulas: [["HCF", "common primes, lowest powers"], ["LCM", "all primes, highest powers"], ["HCF × LCM", "= product of the two numbers"], ["Triangle numbers", M`$\tfrac12n(n+1)$`], ["Recurring decimal", M`multiply by $10^k$ ($k$ = length of block) and subtract`], ["n(A ∪ B)", M`$n(A)+n(B)-n(A\cap B)$`]],
  cards: [
    ["Is 1 prime?", "No: a prime has exactly two factors."],
    ["The only even prime", "2"],
    ["First 10 triangle numbers", "1, 3, 6, 10, 15, 21, 28, 36, 45, 55"],
    ["Reciprocal of 0.25", "4"],
    ["HCF rule", "Common prime factors, lowest powers."],
    ["LCM rule", "All prime factors, highest powers."],
    ["Rational number", "Can be written as a/b with integers a, b (b ≠ 0)."],
    ["Irrational examples", "π, √2, √3, ∛2 (non-terminating, non-recurring)."],
    ["Is √(16/9) rational?", "Yes: 4/3."],
    ["A ∩ B", "Elements in both A and B."],
    ["A ∪ B", "Elements in A or B or both."],
    ["A′", "Elements not in A."],
    ["n(A)", "Number of elements in A."],
    ["∅", "The empty set."],
    ["B ⊆ A", "B is a subset of A."],
    ["Venn diagram method", "Fill the overlap first, then each set only, then outside."],
    ["0.125 as a fraction", "1/8"],
    ["0.3̇ as a fraction", "1/3"],
    ["Method for 0.ȧḃ", "x, 100x, subtract → 99x = ab."],
    ["Divide by a fraction", "Multiply by its reciprocal."],
    ["BIDMAS", "Brackets, Indices, Division/Multiplication, Addition/Subtraction."],
    ["−3² vs (−3)²", "−9 vs 9"],
    ["When does a fraction terminate as a decimal?", "When its simplified denominator has only 2s and 5s as prime factors."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`Which number is prime?`, opts: ["1", "21", "29", "51"], ans: 2, why: M`$21=3\times7$, $51=3\times17$.` },
    { type: "mcq", marks: 1, q: M`$2^3\times3^2\times5$ equals`, opts: ["180", "360", "90", "720"], ans: 1, why: M`$8\times9\times5$.` },
    { type: "mcq", marks: 1, q: M`Which is irrational?`, opts: ["$\sqrt{49}$", "$0.\dot{5}$", "$\sqrt{20}$", "$\tfrac{22}{7}$"], ans: 2, why: M`20 is not a perfect square.` },
    { type: "mcq", marks: 1, q: M`$A=\{1,3,5,7\}$, $B=\{3,4,5\}$. $n(A\cup B)=$`, opts: ["2", "5", "7", "3"], ans: 1, why: M`$\{1,3,4,5,7\}$.` },
    { type: "mcq", marks: 1, q: M`$0.\dot{3}\dot{6}$ as a fraction in its simplest form is`, opts: ["$\tfrac{36}{100}$", "$\tfrac{4}{11}$", "$\tfrac{9}{25}$", "$\tfrac{12}{33}$"], ans: 1, why: M`$\tfrac{36}{99}=\tfrac{4}{11}$.` },
    { type: "mcq", marks: 1, q: M`$12-8\div4\times2=$`, opts: ["2", "8", "11", "4"], ans: 1, why: M`$8\div4\times2=4$; $12-4=8$.` },
    { type: "struct", marks: 2, q: M`Write 1764 as a product of its prime factors in index form.`, ms: M`<b>M1</b> correct factor tree / division<br><b>A1</b> $2^2\times3^2\times7^2$` },
    { type: "struct", marks: 2, q: M`Find the HCF of 90 and 168.`, ms: M`<b>M1</b> $90=2\times3^2\times5$, $168=2^3\times3\times7$<br><b>A1</b> 6` },
    { type: "struct", marks: 2, q: M`Find the LCM of 14, 21 and 30.`, ms: M`<b>M1</b> $2\times7$, $3\times7$, $2\times3\times5$<br><b>A1</b> 210` },
    { type: "struct", marks: 3, q: M`Show that $0.\dot{5}\dot{4}=\dfrac{6}{11}$.`, ms: M`<b>M1</b> $x=0.5454\ldots$, $100x=54.5454\ldots$<br><b>M1</b> $99x=54$<br><b>A1</b> $\tfrac{54}{99}=\tfrac{6}{11}$ shown` },
    { type: "struct", marks: 2, q: M`Work out $1\tfrac{2}{3}\div\tfrac{5}{9}$. Show all your working.`, ms: M`<b>M1</b> $\tfrac53\times\tfrac95$<br><b>A1</b> 3` },
    { type: "struct", marks: 3, q: M`In a group of 50 people, 28 like tea, 30 like coffee and 6 like neither. Find how many like both.`, ms: M`<b>M1</b> $n(T\cup C)=44$<br><b>M1</b> $28+30-x=44$<br><b>A1</b> 14` },
    { type: "struct", marks: 2, q: M`Write down an irrational number between 6 and 7.`, ms: M`<b>B2</b> e.g. $\sqrt{40}$ or $2\pi$ (any valid; B1 for a rational value in range)` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`Write down the next triangle number after 21.`, ms: M`<b>B1</b> 28` },
    { d: 1, type: "struct", marks: 1, q: M`Write down the reciprocal of 8.`, ms: M`<b>B1</b> $\tfrac18$ or 0.125` },
    { d: 1, type: "mcq", marks: 1, q: M`Which is a cube number?`, opts: ["36", "64", "81", "100"], ans: 1, why: M`$4^3=64$.` },
    { d: 1, type: "struct", marks: 2, q: M`Write these in order, smallest first: $0.7$, $\tfrac{2}{3}$, $68\%$, $\tfrac{7}{10}$.`, ms: M`<b>M1</b> converts to decimals: 0.7, 0.667, 0.68, 0.7<br><b>A1</b> $\tfrac23$, 68%, 0.7 = $\tfrac{7}{10}$` },
    { d: 1, type: "struct", marks: 1, q: M`Insert brackets to make this true: $3+4\times6-1=35$.`, ms: M`<b>B1</b> $(3+4)\times(6-1)=35$` },
    { d: 1, type: "struct", marks: 2, q: M`$A=\{\text{even numbers less than } 10\}$ and $B=\{\text{multiples of 3 less than 10}\}$. List $A\cap B$.`, ms: M`<b>M1</b> $A=\{2,4,6,8\}$, $B=\{3,6,9\}$<br><b>A1</b> $\{6\}$` },
    { d: 2, type: "struct", marks: 3, q: M`Buses leave a station every 12 minutes on route A and every 20 minutes on route B. Both leave at 07:00. At what time do they next leave together?`, ms: M`<b>M1</b> LCM of 12 and 20<br><b>A1</b> 60 minutes<br><b>A1</b> 08:00` },
    { d: 2, type: "struct", marks: 2, q: M`Shade $A'\cap B$ on a Venn diagram, and describe the region in words.`, ms: M`<b>B1</b> the part of B outside A shaded<br><b>B1</b> elements in B but not in A` },
    { d: 2, type: "struct", marks: 3, q: M`Work out $2\tfrac{1}{4}-\tfrac{5}{6}$, giving your answer as a mixed number in its simplest form.`, ms: M`<b>M1</b> $\tfrac94-\tfrac56$<br><b>M1</b> $\tfrac{27}{12}-\tfrac{10}{12}$<br><b>A1</b> $1\tfrac{5}{12}$` },
    { d: 2, type: "mcq", marks: 1, q: M`$p=2^4\times3\times5^2$ and $q=2^2\times3^3\times5$. The HCF of $p$ and $q$ is`, opts: ["60", "120", "20", "180"], ans: 0, why: M`$2^2\times3\times5=60$.` },
    { d: 2, type: "struct", marks: 2, q: M`Which of these give terminating decimals? $\tfrac{3}{8}$, $\tfrac{2}{15}$, $\tfrac{7}{20}$, $\tfrac{5}{12}$. Explain.`, ms: M`<b>B1</b> $\tfrac38$ and $\tfrac{7}{20}$<br><b>B1</b> denominators have only 2 and 5 as prime factors` },
    { d: 3, type: "struct", marks: 3, q: M`Convert $0.4\dot{0}\dot{9}$ to a fraction in its simplest form.`, ms: M`<b>M1</b> $1000x=409.0909\ldots$, $10x=4.0909\ldots$<br><b>M1</b> $990x=405$<br><b>A1</b> $\tfrac{9}{22}$` },
    { d: 3, type: "struct", marks: 4, q: M`In a survey of 60 students: 32 play football (F), 25 play tennis (T), 18 swim (S). 10 play F and T, 8 play F and S, 6 play T and S, and 3 do all three. How many do none of these?`, ms: M`<b>M1</b> centre 3; F∩T only 7, F∩S only 5, T∩S only 3<br><b>M1</b> F only 17, T only 12, S only 7<br><b>M1</b> total in circles = 17 + 12 + 7 + 7 + 5 + 3 + 3 = 54<br><b>A1</b> 6` },
    { d: 3, type: "struct", marks: 3, q: M`$N=2^a\times3^b$. The HCF of $N$ and 72 is 24 and the LCM of $N$ and 72 is 144. Find $a$ and $b$, and hence $N$.`, ms: M`<b>B1</b> $72=2^3\times3^2$, $24=2^3\times3$, $144=2^4\times3^2$<br><b>M1</b> LCM needs $2^4$ so $a=4$; HCF has only $3^1$ so $b=1$<br><b>A1</b> $N=2^4\times3=48$` }
  ]
});
}
