window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
const diffs = (terms, rows, cap) => { const cw = 64, W = Math.max(...rows.map(r => r[1].length)) * cw + 140; let s = "";
  terms.forEach((v, i) => s += F.rect(110 + i * cw, 10, cw - 10, 32, "c cS", 6) + F.text(110 + i * cw + (cw - 10) / 2, 32, String(v), "tc bold"));
  s += F.text(100, 32, "terms", "tm small", "end");
  rows.forEach(([lab, arr, c], r) => { const off = (r + 1) * cw / 2; arr.forEach((v, i) => s += F.text(110 + off + i * cw + (cw - 10) / 2, 70 + r * 30, String(v), "t" + c + " bold")); s += F.text(100, 70 + r * 30, lab, "tm small", "end"); });
  return F.fig(Math.max(W, terms.length * cw + 130), 50 + rows.length * 30 + 10, s, cap, { size: "small" }); };

/* ============================================================
   SEQUENCES  (0580: E2.7)
   ============================================================ */
TOPICS.push({
  id: "sequences", subject: "maths", unit: 2, title: "Sequences",
  blurb: "Term-to-term and position-to-term rules, the nth term of linear, quadratic, cubic and geometric sequences, sequences from patterns, and combinations of sequences.",
  level: "Core → Extended", demo: "sequence",
  syllabus: [
    ["E2.7", "Continue a given number sequence or pattern", 0],
    ["E2.7", "Recognise patterns in sequences, including the term-to-term rule, and relationships between different sequences", 0],
    ["E2.7", "Find and use the nth term of linear sequences", 1],
    ["E2.7", "Find and use the nth term of quadratic and cubic sequences", 3],
    ["E2.7", "Find and use the nth term of exponential sequences (geometric)", 5],
    ["E2.7", "Find and use the nth term of simple combinations of the above", 6]
  ],
  sections: [
    { h: "Describing sequences (E2.7)", body: M`
<p class="lead">A <b>sequence</b> is an ordered list of numbers (terms). Two ways to describe it:</p>
<ul><li><b>Term-to-term rule:</b> how to get the next term from the one before. "Start at 5, add 4": 5, 9, 13, 17, …</li>
<li><b>Position-to-term rule (nth term):</b> a formula in $n$ giving any term directly. $u_n=4n+1$ gives $u_1=5$, $u_{10}=41$, $u_{100}=401$ without listing them all.</li></ul>
<p>The nth term is far more powerful: it answers "what is the 50th term?" and "is 250 in the sequence?" instantly.</p>
<table class="t"><tr><th>Special sequences</th><th>Terms</th><th>nth term</th></tr>
<tr><td>Even numbers</td><td>2, 4, 6, 8, …</td><td>$2n$</td></tr><tr><td>Odd numbers</td><td>1, 3, 5, 7, …</td><td>$2n-1$</td></tr>
<tr><td>Square numbers</td><td>1, 4, 9, 16, …</td><td>$n^2$</td></tr><tr><td>Cube numbers</td><td>1, 8, 27, 64, …</td><td>$n^3$</td></tr>
<tr><td>Triangle numbers</td><td>1, 3, 6, 10, …</td><td>$\tfrac12n(n+1)$</td></tr><tr><td>Powers of 2</td><td>2, 4, 8, 16, …</td><td>$2^n$</td></tr>
<tr><td>Fibonacci</td><td>1, 1, 2, 3, 5, 8, …</td><td>(add the previous two)</td></tr></table>`},

    { h: "Linear sequences: the nth term (E2.7)", body: M`
<p>A <b>linear</b> (arithmetic) sequence goes up or down by the same amount each time: the <b>common difference</b> $d$.</p>
<div class="viz" data-viz="patternGrow"></div>
<div class="callout key"><b class="t">Method</b>nth term $=dn+(\text{zero term})$, where the zero term is the term <i>before</i> the first one: $u_1-d$.</div>
${diffs([7, 11, 15, 19, 23], [["+4", [4, 4, 4, 4], "r"]], "Difference 4, so the nth term starts 4n. The zero term is 7 − 4 = 3: nth term = 4n + 3.")}
<ul><li>$20, 17, 14, 11, \ldots$: $d=-3$, zero term 23: $u_n=23-3n$.</li>
<li>$\tfrac12, 1, \tfrac32, 2,\ldots$: $d=\tfrac12$, zero term 0: $u_n=\tfrac12n$.</li></ul>
<p><b>Using the nth term:</b></p>
<ul><li>Find the 40th term of $4n+3$: $4(40)+3=163$.</li>
<li>Is 101 a term? $4n+3=101\Rightarrow n=24.5$: <b>not</b> a whole number, so no.</li>
<li>First term greater than 200: $4n+3\gt200\Rightarrow n\gt49.25$, so $n=50$: $u_{50}=203$.</li></ul>
<details class="check"><summary>Find the nth term of 2, 9, 16, 23, …</summary><div>$d=7$; zero term $2-7=-5$; $u_n=7n-5$.</div></details>`},

    { h: "Sequences from patterns (E2.7)", body: M`
<p>For diagrams, count the items in the first few patterns, then find the nth term as usual. Explain it from the picture too: in the matchstick squares, each square needs 3 new sticks plus 1 stick to start: $3n+1$.</p>
${(() => { let s = ""; [1, 2, 3, 4].forEach((n, k) => { const x0 = 20 + k * 120; for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) s += F.circ(x0 + 40 - i * 9 + j * 18, 20 + i * 16, 5, "o oS"); s += F.text(x0 + 40, 100, String(n * (n + 1) / 2), "to bold"); });
  return F.fig(500, 115, s, "Dot triangles: 1, 3, 6, 10 — the triangle numbers ½n(n + 1).", { size: "small" }); })()}`},

    { h: "Quadratic sequences (E2.7)", body: M`
<p>If the <b>second differences</b> are constant, the sequence is quadratic: $u_n=an^2+bn+c$.</p>
${diffs([4, 11, 22, 37, 56], [["1st", [7, 11, 15, 19], "o"], ["2nd", [4, 4, 4], "r"]], "Second difference 4, so a = 4 ÷ 2 = 2.")}
<ol class="steps"><li>Second difference $=2a$, so $a=4\div2=2$: the sequence contains $2n^2$.</li>
<li>Subtract $2n^2$ from each term: $4-2=2,\ 11-8=3,\ 22-18=4,\ 37-32=5$ → a linear sequence $2,3,4,5$ with nth term $n+1$.</li>
<li>So $u_n=2n^2+n+1$. Check $n=3$: $18+3+1=22$ ✓.</li></ol>
<div class="callout ex"><b class="t">Alternative: simultaneous equations</b>Using $u_n=an^2+bn+c$: $a+b+c=4$, $4a+2b+c=11$, $9a+3b+c=22$. Subtracting gives $3a+b=7$, $5a+b=11$, so $a=2$, $b=1$, $c=1$.</div>
<details class="check"><summary>Find the nth term of 3, 9, 19, 33, 51, …</summary><div>1st diffs 6, 10, 14, 18; 2nd diff 4 → $2n^2$. Subtract: 1, 1, 1, 1 → $u_n=2n^2+1$.</div></details>`},

    { h: "Cubic sequences (E2.7)", body: M`
<p>Constant <b>third</b> differences mean a cubic: $u_n=an^3+\ldots$, with third difference $=6a$. In IGCSE the cubic part is usually simple, e.g. $n^3+k$ or $n^3+n$.</p>
${diffs([3, 10, 29, 66, 127], [["1st", [7, 19, 37, 61], "o"], ["2nd", [12, 18, 24], "b"], ["3rd", [6, 6], "r"]], "Third difference 6 = 6a, so a = 1. Compare with n³: 1, 8, 27, 64, 125 — each term is n³ + 2.")}
<p>So $u_n=n^3+2$. <b>Tip:</b> compare any unknown sequence with $n^2$ and $n^3$ by writing them underneath.</p>`},

    { h: "Geometric (exponential) sequences (E2.7)", body: M`
<p>In a <b>geometric</b> sequence each term is <b>multiplied</b> by the same <b>common ratio</b> $r$.</p>
$$u_n=a\,r^{\,n-1}\qquad(a=\text{first term})$$
<ul><li>$3, 6, 12, 24,\ldots$: $r=2$, $u_n=3\times2^{n-1}$.</li><li>$80, 40, 20, 10,\ldots$: $r=\tfrac12$, $u_n=80\times\left(\tfrac12\right)^{n-1}$.</li><li>$2, -6, 18, -54,\ldots$: $r=-3$, $u_n=2\times(-3)^{n-1}$ (alternating signs).</li></ul>
<p>Find $r$ by dividing a term by the one before. These model exponential growth and decay (see <i>Ratio, rates & percentages</i>).</p>
<details class="check"><summary>The 2nd term of a geometric sequence is 12 and the 4th is 108. Find the possible values of r and the first term.</summary><div>$ar=12$, $ar^3=108$ → $r^2=9$, $r=\pm3$; $a=4$ or $a=-4$.</div></details>`},

    { h: "Combinations and harder problems (E2.7)", body: M`
<p>Some sequences combine the standard types. Spot the pieces:</p>
<ul><li>$2, 6, 12, 20, 30,\ldots=n^2+n=n(n+1)$</li>
<li>$\tfrac{1}{2}, \tfrac{2}{3}, \tfrac{3}{4}, \tfrac45,\ldots=\dfrac{n}{n+1}$ (numerators and denominators separately)</li>
<li>$3, 5, 9, 17, 33,\ldots=2^n+1$ (compare with $2^n$: 2, 4, 8, 16, 32)</li>
<li>$0, 3, 8, 15, 24,\ldots=n^2-1$</li></ul>
<p><b>Relationships between sequences:</b> if $u_n=n^2$ and $v_n=2n+1$, then $v_n=u_{n+1}-u_n$: the odd numbers are the differences of the squares.</p>
<p>Experiment with every type in the <b>sequence lab</b> at the bottom of the page.</p>`}
  ],
  worked: [
    { q: M`The nth term of a sequence is $5n-8$. Which term is the first to exceed 150?`,
      steps: [M`$5n-8\gt150\Rightarrow 5n\gt158\Rightarrow n\gt31.6$.`, M`So $n=32$: $u_{32}=152$.`]},
    { q: M`Find the nth term of 5, 12, 23, 38, 57.`,
      steps: [M`1st differences 7, 11, 15, 19; 2nd difference 4 → $a=2$.`, M`Subtract $2n^2$: 3, 4, 5, 6, 7 → $n+2$.`, M`$u_n=2n^2+n+2$.`]},
    { q: M`Find the nth term of $\tfrac{3}{4}, \tfrac{5}{9}, \tfrac{7}{16}, \tfrac{9}{25}$.`,
      steps: [M`Numerators 3, 5, 7, 9: $2n+1$.`, M`Denominators 4, 9, 16, 25: $(n+1)^2$.`, M`$u_n=\dfrac{2n+1}{(n+1)^2}$.`]}
  ],
  formulas: [["Linear", M`$u_n=dn+(u_1-d)$`], ["Quadratic", M`$u_n=an^2+bn+c$, 2nd diff $=2a$`], ["Cubic", M`3rd diff $=6a$`], ["Geometric", M`$u_n=ar^{\,n-1}$`], ["Triangle numbers", M`$\tfrac12n(n+1)$`]],
  cards: [
    ["Term-to-term rule", "How to get each term from the previous one."],
    ["Position-to-term rule", "The nth term formula."],
    ["nth term of 5, 8, 11, 14", "3n + 2"],
    ["nth term of 30, 26, 22, 18", "34 − 4n"],
    ["Is 60 in 3n + 2?", "3n + 2 = 60 → n = 19.3…, so no."],
    ["Constant 2nd difference means", "Quadratic: a = 2nd diff ÷ 2."],
    ["Constant 3rd difference means", "Cubic: a = 3rd diff ÷ 6."],
    ["nth term of 2, 8, 18, 32", "2n²"],
    ["nth term of 1, 8, 27, 64", "n³"],
    ["Geometric nth term", "a × rⁿ⁻¹"],
    ["Common ratio of 48, 12, 3", "1/4"],
    ["nth term of 2, 6, 12, 20", "n(n + 1)"],
    ["Fibonacci rule", "Each term = sum of the previous two."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`The nth term of 6, 11, 16, 21, … is`, opts: ["$n+5$", "$5n+1$", "$5n+6$", "$6n-1$"], ans: 1, why: M`$d=5$, zero term 1.` },
    { type: "mcq", marks: 1, q: M`The 20th term of $50-3n$ is`, opts: ["−10", "10", "−17", "47"], ans: 0, why: M`$50-60$.` },
    { type: "mcq", marks: 1, q: M`Which sequence is quadratic?`, opts: ["3, 7, 11, 15", "2, 6, 18, 54", "2, 5, 10, 17", "1, 8, 27, 64"], ans: 2, why: M`2nd differences constant (2): $n^2+1$.` },
    { type: "mcq", marks: 1, q: M`The next term of 1, 1, 2, 3, 5, 8 is`, opts: ["11", "12", "13", "16"], ans: 2, why: M`Fibonacci: 5 + 8.` },
    { type: "struct", marks: 2, q: M`Find the nth term of 9, 15, 21, 27, …`, ms: M`<b>B1</b> $6n$<br><b>B1</b> $6n+3$` },
    { type: "struct", marks: 2, q: M`Show that 100 is not a term of the sequence with nth term $3n+5$.`, ms: M`<b>M1</b> $3n+5=100\Rightarrow n=31.66\ldots$<br><b>A1</b> $n$ is not a whole number, so 100 is not a term` },
    { type: "struct", marks: 3, q: M`Find the nth term of 2, 9, 20, 35, 54.`, ms: M`<b>M1</b> 2nd difference 4 → $2n^2$<br><b>M1</b> remainder 0, 1, 2, 3, 4 → $n-1$<br><b>A1</b> $2n^2+n-1$` },
    { type: "struct", marks: 2, q: M`Find the nth term of 5, 15, 45, 135.`, ms: M`<b>B1</b> ratio 3<br><b>B1</b> $5\times3^{n-1}$` },
    { type: "struct", marks: 2, q: M`Find the nth term of 2, 9, 28, 65, 126.`, ms: M`<b>M1</b> compare with $n^3$: 1, 8, 27, 64, 125<br><b>A1</b> $n^3+1$` },
    { type: "struct", marks: 3, q: M`Pattern 1 has 5 tiles, pattern 2 has 9, pattern 3 has 13. (a) Find the nth term. (b) Which pattern uses exactly 81 tiles?`, ms: M`<b>B1</b> $4n+1$<br><b>M1</b> $4n+1=81$<br><b>A1</b> pattern 20` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`Write down the next two terms of 3, 8, 13, 18, …`, ms: M`<b>B1</b> 23, 28` },
    { d: 1, type: "struct", marks: 1, q: M`Write down the term-to-term rule for 64, 32, 16, 8, …`, ms: M`<b>B1</b> divide by 2 (halve)` },
    { d: 1, type: "struct", marks: 2, q: M`The nth term of a sequence is $n^2-3$. Write down the first three terms.`, ms: M`<b>B2</b> −2, 1, 6 (B1 for two correct)` },
    { d: 1, type: "mcq", marks: 1, q: M`The nth term of 1, 4, 9, 16 is`, opts: ["$3n-2$", "$n^2$", "$2n-1$", "$4n$"], ans: 1, why: M`Squares.` },
    { d: 2, type: "struct", marks: 2, q: M`Find the nth term of 13, 10, 7, 4, …`, ms: M`<b>B1</b> $-3n$<br><b>B1</b> $16-3n$` },
    { d: 2, type: "struct", marks: 3, q: M`Sequence A has nth term $4n+3$; sequence B has nth term $52-3n$. Find the value of $n$ for which the terms are equal, and that term.`, ms: M`<b>M1</b> $4n+3=52-3n$<br><b>A1</b> $n=7$<br><b>A1</b> 31` },
    { d: 2, type: "struct", marks: 3, q: M`Find the nth term of 0, 6, 16, 30, 48.`, ms: M`<b>M1</b> 2nd diff 4 → $2n^2$<br><b>M1</b> remainder −2, −2, −2, … <br><b>A1</b> $2n^2-2$` },
    { d: 2, type: "struct", marks: 2, q: M`Find the nth term of $\tfrac{1}{3}, \tfrac{2}{5}, \tfrac{3}{7}, \tfrac{4}{9}$.`, ms: M`<b>B1</b> numerator $n$<br><b>B1</b> denominator $2n+1$` },
    { d: 2, type: "mcq", marks: 1, q: M`The 6th term of the geometric sequence 1, 3, 9, … is`, opts: ["18", "81", "243", "729"], ans: 2, why: M`$3^5$.` },
    { d: 3, type: "struct", marks: 4, q: M`Find the nth term of 6, 17, 34, 57, 86 and hence find the 20th term.`, ms: M`<b>M1</b> 1st diffs 11, 17, 23, 29; 2nd 6 → $3n^2$<br><b>M1</b> remainder 3, 5, 7, 9, 11 → $2n+1$<br><b>A1</b> $3n^2+2n+1$<br><b>A1</b> 1241` },
    { d: 3, type: "struct", marks: 4, q: M`The nth term of a sequence is $an^2+bn$. The 2nd term is 14 and the 5th term is 65. Find $a$ and $b$.`, ms: M`<b>M1</b> $4a+2b=14$<br><b>M1</b> $25a+5b=65$<br><b>M1</b> solve: from first $b=7-2a$; $25a+35-10a=65$<br><b>A1</b> $a=2$, $b=3$` },
    { d: 3, type: "struct", marks: 3, q: M`Find the nth term of 3, 7, 15, 31, 63.`, ms: M`<b>M1</b> compare with $2^n$: 2, 4, 8, 16, 32 / differences double<br><b>M1</b> $2^{n+1}$: 4, 8, 16, 32, 64<br><b>A1</b> $2^{n+1}-1$` }
  ]
});
}
