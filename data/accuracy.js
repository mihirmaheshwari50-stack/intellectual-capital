window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
const D = '<span class="nomath">$</span>';
const nl = (lo, hi, step, marks, cap, extra = () => "") => { const W = 480, x0 = 30, x1 = 450, X = v => x0 + (v - lo) / (hi - lo) * (x1 - x0); let s = F.line(x0, 60, x1, 60, "k");
  for (let v = lo; v <= hi + 1e-9; v += step) s += F.line(X(v), 54, X(v), 66, "k") + F.text(X(v), 84, +v.toFixed(4) + "", "tm small");
  marks.forEach(([v, c, l, dy = 0]) => s += F.circ(X(v), 60, 5, c + " " + c + "F") + F.text(X(v), 42 + dy, l, "t" + c + " small bold"));
  return F.fig(W, 100, s + extra(X), cap, { size: "small" }); };

/* ============================================================
   ACCURACY, ESTIMATION & BOUNDS  (0580: E1.9, E1.10, E1.14)
   ============================================================ */
TOPICS.push({
  id: "accuracy", subject: "maths", unit: 1, title: "Accuracy, estimation & bounds",
  blurb: "Rounding to decimal places and significant figures, estimating calculations, upper and lower bounds and calculations with bounds, and using a calculator efficiently.",
  level: "Core → Extended", demo: "bounds",
  syllabus: [
    ["E1.9", "Round values to a specified degree of accuracy (decimal places, significant figures)", 0],
    ["E1.9", "Make estimates for calculations involving numbers, quantities and measurements", 2],
    ["E1.9", "Round answers to a reasonable degree of accuracy in the context of a given problem", 1],
    ["E1.10", "Give upper and lower bounds for data rounded to a specified accuracy", 3],
    ["E1.10", "Find upper and lower bounds of the results of calculations which have used data rounded to a specified accuracy", 4],
    ["E1.14", "Use a calculator efficiently; apply appropriate checks of accuracy; enter values of time in a calculator", 6]
  ],
  sections: [
    { h: "Rounding: decimal places and significant figures (E1.9)", body: M`
<p class="lead">Look at the digit <b>after</b> the last one you keep: 5 or more → round up; 4 or less → leave it.</p>
<ul><li><b>Decimal places</b> count digits after the decimal point. $3.14159$ to 2 d.p. $=3.14$; to 3 d.p. $=3.142$.</li>
<li><b>Significant figures</b> start at the <b>first non-zero digit</b>.</li></ul>
<table class="t"><tr><th>Number</th><th>1 s.f.</th><th>2 s.f.</th><th>3 s.f.</th></tr>
<tr><td>48 762</td><td>50 000</td><td>49 000</td><td>48 800</td></tr>
<tr><td>0.003 087</td><td>0.003</td><td>0.003 1</td><td>0.003 09</td></tr>
<tr><td>6.996</td><td>7</td><td>7.0</td><td>7.00</td></tr>
<tr><td>204.5</td><td>200</td><td>200</td><td>205</td></tr></table>
<div class="callout warn"><b class="t">Keep the place value</b>48 762 to 2 s.f. is <b>49 000</b>, not 49. Zeros after the last significant digit hold the place value. And 6.996 to 3 s.f. is <b>7.00</b>: the trailing zeros show the accuracy.</div>
${nl(3.1, 3.2, 0.01, [[3.14159, "c", "3.14159", -18], [3.14, "o", "3.14"]], "3.14159 lies between 3.14 and 3.15, nearer 3.14.")}
<p><b>The IGCSE default:</b> unless told otherwise, give non-exact answers to <b>3 significant figures</b> (angles in degrees to 1 d.p.). Keep full accuracy in your calculator during working and only round at the end; rounding early causes "premature approximation" errors.</p>
<details class="check"><summary>Round 0.049 96 to (a) 2 d.p., (b) 2 s.f., (c) 3 s.f.</summary><div>(a) 0.05 (b) 0.050 (c) 0.0500.</div></details>`},

    { h: "Sensible accuracy in context (E1.9)", body: M`
<p>The answer should match the situation:</p>
<ul><li>Money: 2 d.p. (${D}12.50), or nearest dollar for large sums.</li><li>Numbers of people, buses, boxes: whole numbers, rounded in the <b>sensible direction</b>.</li></ul>
<div class="callout ex"><b class="t">Direction matters</b>230 students need buses holding 52 each: $230\div52=4.42$, so <b>5</b> buses (round up). How many ${D}7 tickets can you buy with ${D}45? $45\div7=6.43$, so <b>6</b> tickets (round down).</div>`},

    { h: "Estimation (E1.9)", body: M`
<p>To estimate, round every number to <b>1 significant figure</b>, then calculate. Show the rounded values: the method mark depends on them.</p>
$$\frac{48.7\times 0.213}{9.82}\approx\frac{50\times0.2}{10}=\frac{10}{10}=1$$
<p>Exact value: 1.056… — the estimate checks that the calculator answer is the right size.</p>
<ul><li>Square roots: round to a <b>nearby square</b>: $\sqrt{63.8}\approx\sqrt{64}=8$.</li>
<li>Dividing by a small decimal: $\dfrac{6.3}{0.18}\approx\dfrac{6}{0.2}=30$.</li>
<li>Is the estimate an over- or under-estimate? If you rounded the numerator up and the denominator down, the estimate is too big.</li></ul>
<details class="check"><summary>Estimate $\dfrac{396\times 5.08}{0.0193}$.</summary><div>$\dfrac{400\times5}{0.02}=\dfrac{2000}{0.02}=100\,000$.</div></details>`},

    { h: "Upper and lower bounds (E1.10)", body: M`
<p class="lead">A measurement rounded to a given accuracy could be anywhere in an interval. Its <b>bounds</b> are <b>half the degree of accuracy</b> either side.</p>
<div class="viz" data-viz="bounds"></div>
<table class="t"><tr><th>Value</th><th>Accuracy</th><th>Half</th><th>Lower bound</th><th>Upper bound</th></tr>
<tr><td>8 cm</td><td>nearest cm</td><td>0.5</td><td>7.5</td><td>8.5</td></tr>
<tr><td>3.6 kg</td><td>1 d.p. (nearest 0.1)</td><td>0.05</td><td>3.55</td><td>3.65</td></tr>
<tr><td>2400 m</td><td>nearest 100 m</td><td>50</td><td>2350</td><td>2450</td></tr>
<tr><td>0.45 s</td><td>2 s.f. (nearest 0.01)</td><td>0.005</td><td>0.445</td><td>0.455</td></tr>
<tr><td>70 people</td><td>nearest 10</td><td>5</td><td>65</td><td>74 (discrete)</td></tr></table>
<p>As an <b>error interval</b>: $7.5\le x\lt8.5$. The lower bound is included (≤); the upper bound is not (<), because 8.5 would round up to 9. In exams you write the upper bound as 8.5.</p>
<p><b>Truncation:</b> if a value is truncated (chopped, not rounded) to 1 d.p. as 3.6, then $3.6\le x\lt3.7$.</p>`},

    { h: "Calculating with bounds (E1.10)", body: M`
<p>To get the biggest or smallest possible result, choose the bounds that push the answer the right way.</p>
<table class="t"><tr><th>Operation</th><th>Maximum (upper bound)</th><th>Minimum (lower bound)</th></tr>
<tr><td>$a+b$</td><td>$a_U+b_U$</td><td>$a_L+b_L$</td></tr>
<tr><td>$a-b$</td><td>$a_U-b_L$</td><td>$a_L-b_U$</td></tr>
<tr><td>$a\times b$</td><td>$a_U\times b_U$</td><td>$a_L\times b_L$</td></tr>
<tr><td>$a\div b$</td><td>$a_U\div b_L$</td><td>$a_L\div b_U$</td></tr></table>
<div class="callout key"><b class="t">Rule of thumb</b>For subtraction and division, use <b>opposite</b> bounds: to make $a-b$ or $a\div b$ as big as possible, make $a$ big and $b$ <b>small</b>.</div>
<div class="callout ex"><b class="t">Example</b>A car travels 125 km (nearest km) in 1.6 h (nearest 0.1 h). Upper bound of the average speed: $\dfrac{125.5}{1.55}=80.97$ km/h. Lower bound: $\dfrac{124.5}{1.65}=75.45$ km/h.</div>
${nl(74, 82, 1, [[75.45, "o", "lower 75.45"], [80.97, "c", "upper 80.97"]], "All possible speeds lie in this interval.", X => F.line(X(75.45), 60, X(80.97), 60, "c thick"))}
<p><b>Appropriate accuracy:</b> if both bounds round to the same value, that is the answer to a suitable degree of accuracy. Here 75.45 and 80.97 both round to 80 to 1 s.f. but to 75 and 81 to 2 s.f., so the speed can only be given as 80 km/h (1 s.f.).</p>
<p>Use the <b>bounds lab</b> at the bottom of the page to compute bounds for areas, differences and quotients.</p>
<details class="check"><summary>A rectangle is 12 cm by 7 cm, each to the nearest cm. Find the lower bound of its area and the upper bound of its perimeter.</summary><div>Area lower $=11.5\times6.5=74.75$ cm². Perimeter upper $=2(12.5+7.5)=40$ cm.</div></details>`},

    { h: "Bounds in harder problems (E1.10)", body: M`
<p>Bounds appear inside geometry and formula questions. Decide for each quantity whether it should be big or small.</p>
<div class="callout ex"><b class="t">Trigonometry</b>A ladder of length 5.0 m (1 d.p.) leans against a wall with its foot 1.4 m (1 d.p.) from the wall. Find the upper bound of the angle the ladder makes with the ground.<br>$\cos\theta=\dfrac{1.4}{5.0}$. The angle is largest when $\cos\theta$ is <b>smallest</b>: use the smallest adjacent and largest ladder: $\cos\theta=\dfrac{1.35}{5.05}=0.2673$, so $\theta_{\max}=74.5^\circ$.</div>
<div class="callout ex"><b class="t">Density</b>Mass 250 g (nearest 10 g), volume 32 cm³ (nearest cm³). Lower bound of density $=\dfrac{245}{32.5}=7.54$ g/cm³.</div>`},

    { h: "Using a calculator efficiently (E1.14)", body: M`
<ul><li>Use <b>brackets</b> around whole numerators and denominators: $\dfrac{4.2+3.7}{2.1\times0.8}$ → <code>(4.2+3.7)÷(2.1×0.8)</code> $=4.70$ (3 s.f.). Without brackets you get the wrong answer.</li>
<li>Write down <b>more figures than you need</b> before rounding: "$=4.702\,38\ldots=4.70$".</li>
<li>Use the fraction key for exact fractions, the $\times10^x$ key for standard form, and the ANS key to chain calculations without retyping rounded values.</li>
<li><b>Time:</b> entering 2 h 45 min as 2.45 is wrong. Use the degrees-minutes-seconds key or convert: 2.75 h. Converting back: 1.8 h = 1 h 48 min.</li>
<li><b>Check</b> with an estimate, by reversing the operation, or by considering whether the answer is sensible.</li></ul>`}
  ],
  worked: [
    { q: M`$p=6.3$ and $q=2.8$, each correct to 1 decimal place. Find the upper bound of $\dfrac{p}{q}$ and the lower bound of $p-q$.`,
      steps: [M`$6.25\le p\lt6.35$; $2.75\le q\lt2.85$.`, M`Upper of $p/q=6.35\div2.75=2.309$ (to 4 s.f.).`, M`Lower of $p-q=6.25-2.85=3.40$.`]},
    { q: M`Estimate $\dfrac{\sqrt{99.2}\times 3.89}{0.517}$, showing your rounding.`,
      steps: [M`$\sqrt{100}=10$; $3.89\approx4$; $0.517\approx0.5$.`, M`$\dfrac{10\times4}{0.5}=80$.`]},
    { q: M`The area of a square is 50 cm² to the nearest cm². Find the lower bound of the side length.`,
      steps: [M`Area lower bound $=49.5$ cm².`, M`Side $=\sqrt{49.5}=7.036$ cm (4 s.f.).`]}
  ],
  formulas: [["Bounds", "value ± half the accuracy"], ["Max of a − b", "a_U − b_L"], ["Max of a ÷ b", "a_U ÷ b_L"], ["Min of a ÷ b", "a_L ÷ b_U"], ["Estimate", "round each number to 1 s.f."]],
  cards: [
    ["0.07049 to 2 s.f.", "0.070"],
    ["37 850 to 2 s.f.", "38 000"],
    ["Default accuracy in IGCSE", "3 s.f. (angles 1 d.p.)"],
    ["Estimate rule", "Round to 1 s.f., show the rounded numbers."],
    ["Bounds of 8.3 (1 d.p.)", "8.25 ≤ x < 8.35"],
    ["Bounds of 400 (nearest 100)", "350 ≤ x < 450"],
    ["Bounds of 2.40 (3 s.f.)", "2.395 ≤ x < 2.405"],
    ["Upper bound of a − b", "a_U − b_L"],
    ["Upper bound of a ÷ b", "a_U ÷ b_L"],
    ["Lower bound of a × b", "a_L × b_L"],
    ["Truncated to 1 d.p.: 4.7", "4.7 ≤ x < 4.8"],
    ["1.35 hours in h and min", "1 h 21 min"],
    ["Number of buses: 4.2 needed", "5 (round up)"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`0.008 362 to 2 significant figures is`, opts: ["0.0083", "0.0084", "0.01", "0.008"], ans: 1, why: M`Digits 8, 3; next 6 rounds up.` },
    { type: "mcq", marks: 1, q: M`A length is 14 cm to the nearest cm. The lower bound is`, opts: ["13 cm", "13.5 cm", "13.9 cm", "14.5 cm"], ans: 1, why: M`$14-0.5$.` },
    { type: "mcq", marks: 1, q: M`$a=20$, $b=4$, both to the nearest whole number. The upper bound of $a\div b$ is`, opts: ["$20.5\div4.5$", "$20.5\div3.5$", "$19.5\div4.5$", "$19.5\div3.5$"], ans: 1, why: M`Big top, small bottom.` },
    { type: "struct", marks: 2, q: M`Estimate $\dfrac{612\times 0.48}{19.7}$. Show your working.`, ms: M`<b>M1</b> $\dfrac{600\times0.5}{20}$<br><b>A1</b> 15` },
    { type: "struct", marks: 2, q: M`A mass is 3.7 kg correct to 1 decimal place. Write down the error interval for the mass $m$.`, ms: M`<b>B1</b> $3.65\le m$<br><b>B1</b> $m\lt3.75$` },
    { type: "struct", marks: 3, q: M`A rectangle measures 9.4 cm by 5.2 cm, each to 1 d.p. Calculate the upper bound of its area.`, ms: M`<b>B1</b> 9.45 and 5.25<br><b>M1</b> $9.45\times5.25$<br><b>A1</b> 49.6125 cm²` },
    { type: "struct", marks: 3, q: M`$x=12.6$ and $y=4.1$ are rounded to 1 d.p. Find the lower bound of $x-y$ and the upper bound of $\dfrac{x}{y}$.`, ms: M`<b>A1</b> $12.55-4.15=8.4$<br><b>M1</b> $12.65\div4.05$<br><b>A1</b> 3.12 (3 s.f.)` },
    { type: "struct", marks: 2, q: M`Use your calculator to find $\dfrac{5.7^2-\sqrt{18}}{3.2\times1.9}$. Write down all the figures, then give your answer to 3 s.f.`, ms: M`<b>B1</b> 4.646 9…<br><b>B1</b> 4.65` },
    { type: "struct", marks: 2, q: M`A coach holds 48 passengers. How many coaches are needed for 395 people? Explain your rounding.`, ms: M`<b>M1</b> $395\div48=8.23$<br><b>A1</b> 9 coaches: round up so everyone has a seat` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`Round 7.0586 to 2 decimal places.`, ms: M`<b>B1</b> 7.06` },
    { d: 1, type: "struct", marks: 1, q: M`Round 63 507 to 3 significant figures.`, ms: M`<b>B1</b> 63 500` },
    { d: 1, type: "struct", marks: 2, q: M`Estimate $\dfrac{9.87\times 41.3}{0.198}$.`, ms: M`<b>M1</b> $\dfrac{10\times40}{0.2}$<br><b>A1</b> 2000` },
    { d: 1, type: "mcq", marks: 1, q: M`The number of people at a match is 23 000 to the nearest thousand. The least possible number is`, opts: ["22 000", "22 500", "22 999", "22 501"], ans: 1, why: M`$23\,000-500$.` },
    { d: 2, type: "struct", marks: 2, q: M`The length of a bridge is 340 m, correct to 2 s.f. Write down the upper and lower bounds.`, ms: M`<b>B1</b> 335 m<br><b>B1</b> 345 m` },
    { d: 2, type: "struct", marks: 3, q: M`A runner covers 100 m (nearest metre) in 12.4 s (nearest 0.1 s). Calculate the upper bound of the average speed.`, ms: M`<b>B1</b> 100.5 and 12.35<br><b>M1</b> $100.5\div12.35$<br><b>A1</b> 8.14 m/s` },
    { d: 2, type: "struct", marks: 2, q: M`The side of a cube is 6 cm to the nearest cm. Find the lower bound of the volume.`, ms: M`<b>M1</b> $5.5^3$<br><b>A1</b> 166.375 cm³` },
    { d: 2, type: "struct", marks: 2, q: M`$t$ is truncated to 1 d.p. and the result is 9.3. Write down the error interval for $t$.`, ms: M`<b>B1</b> $9.3\le t$<br><b>B1</b> $t\lt9.4$` },
    { d: 3, type: "struct", marks: 4, q: M`The area of a rectangle is 60 cm² to the nearest cm², and its length is 8.2 cm to 1 d.p. Find the upper and lower bounds of its width, and hence give the width to a suitable degree of accuracy.`, ms: M`<b>M1</b> upper $60.5\div8.15=7.423$<br><b>M1</b> lower $59.5\div8.25=7.212$<br><b>A1</b> both bounds correct<br><b>B1</b> both round to 7 (1 s.f.) but not to the same 2 s.f. value, so width = 7 cm` },
    { d: 3, type: "struct", marks: 4, q: M`In a right-angled triangle, the hypotenuse is 9.0 cm and the side opposite angle $x$ is 6.0 cm, both to 1 d.p. Find the lower bound of angle $x$.`, ms: M`<b>B1</b> smallest opposite 5.95, largest hypotenuse 9.05<br><b>M1</b> $\sin x=\dfrac{5.95}{9.05}$<br><b>A1</b> 0.6575<br><b>A1</b> 41.1°` },
    { d: 3, type: "struct", marks: 3, q: M`$P=\dfrac{a+b}{c}$ where $a=4.5$, $b=2.3$, $c=1.8$, all to 1 d.p. Find the lower bound of $P$.`, ms: M`<b>M1</b> numerator lower $4.45+2.25=6.7$<br><b>M1</b> divide by upper $c=1.85$<br><b>A1</b> 3.62 (3 s.f.)` }
  ]
});
}
