window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;
// currency sign that KaTeX auto-render leaves alone
const D = '<span class="nomath">$</span>', DS = '<tspan class="nomath">$</tspan>';
const mult = (x, y, from, to, k, c = "c") => F.rect(x, y, 110, 40, "m mS", 8) + F.text(x + 55, y + 26, from, "tk bold") + F.arrow(x + 115, y + 20, x + 205, y + 20, c, 8) + F.text(x + 160, y + 10, "× " + k, "t" + c + " bold") + F.rect(x + 210, y, 110, 40, c + "S " + c, 8) + F.text(x + 265, y + 26, to, "t" + c + " bold");

/* ============================================================
   RATIO, PROPORTION, RATES & PERCENTAGES  (0580: E1.11 – E1.17)
   ============================================================ */
TOPICS.push({
  id: "ratio", subject: "maths", unit: 1, title: "Ratio, rates & percentages",
  blurb: "Simplifying and sharing ratios, direct and inverse proportion, rates and speed, percentage change with multipliers, reverse percentages, interest, depreciation, exponential growth, time and currency.",
  level: "Core → Extended", demo: "interest",
  syllabus: [
    ["E1.11", "Understand and use ratio and proportion: simplify ratios, divide a quantity in a given ratio, use the unitary method", 0],
    ["E1.11", "Use direct and inverse proportion (e.g. recipes, best buys, workers)", 2],
    ["E1.12", "Use common measures of rate; calculate average speed; apply other measures of rate (e.g. pressure, density, flow)", 4],
    ["E1.13", "Calculate a percentage of a quantity; express one quantity as a percentage of another", 5],
    ["E1.13", "Calculate percentage increase and decrease; percentage change", 6],
    ["E1.13", "Calculate with reverse percentages", 7],
    ["E1.13", "Calculate simple and compound interest", 8],
    ["E1.17", "Use exponential growth and decay in relation to population and finance, e.g. depreciation and bacteria growth", 9],
    ["E1.15", "Calculate with time: seconds, minutes, hours, days, weeks, months, years; 12- and 24-hour clock", 10],
    ["E1.16", "Calculate with money; convert from one currency to another", 11]
  ],
  sections: [
    { h: "Ratio: simplifying and equivalent forms (E1.11)", body: M`
<p class="lead">A <b>ratio</b> compares the sizes of two or more quantities. $3:5$ means "for every 3 of the first there are 5 of the second". The total number of <b>parts</b> is $3+5=8$.</p>
<ul><li><b>Simplify</b> by dividing every part by the HCF: $24:36:60=2:3:5$ (÷12).</li>
<li>Make the <b>units the same first</b>: $40\text{ cm} : 2\text{ m} = 40:200=1:5$.</li>
<li>Clear decimals or fractions by multiplying: $1.5:2.5=15:25=3:5$; $\tfrac{2}{3}:\tfrac{1}{4}=8:3$ (× 12).</li>
<li><b>The form $1:n$</b> (or $n:1$): divide both parts by the first part. $5:8=1:1.6$. Map scales are written this way: $1:25\,000$ means 1 cm on the map is $25\,000$ cm $=250$ m in real life.</li></ul>
<div class="callout key"><b class="t">Ratio vs fraction</b>If boys : girls $=3:5$, then boys are $\tfrac{3}{8}$ of the class, not $\tfrac35$. The denominator is the <b>total</b> number of parts.</div>
<details class="check"><summary>Write $750\text{ g} : 1.2\text{ kg}$ in its simplest form.</summary><div>$750:1200=5:8$.</div></details>`},

    { h: "Sharing in a ratio (E1.11)", body: M`
<div class="viz" data-viz="ratioBar"></div>
<ol class="steps"><li>Add the parts to get the <b>total number of parts</b>.</li><li>Divide the amount by the total to find <b>one part</b>.</li><li>Multiply one part by each number in the ratio.</li><li>Check that your answers add up to the original amount.</li></ol>
<p><b>Other types:</b></p>
<ul><li><b>Given one share, not the total:</b> "Ann and Ben share sweets $4:7$. Ben gets 42. How many does Ann get?" One part $=42\div7=6$; Ann $=4\times6=24$.</li>
<li><b>Given the difference:</b> "Ratio $2:9$; the larger share is ${D}35 more than the smaller." Difference $=7$ parts $=35$, so one part $=5$; shares $10$ and $45$.</li>
<li><b>Changing ratios:</b> "Red : blue $=3:2$. After 10 more blue are added it is $1:1$." Let red $=3x$, blue $=2x$: $3x=2x+10$, so $x=10$: 30 red, 20 blue originally.</li></ul>
<details class="check"><summary>Share 360 in the ratio $2:3:7$.</summary><div>12 parts; one part 30; shares 60, 90, 210.</div></details>`},

    { h: "Direct proportion (E1.11)", body: M`
<p>Two quantities are in <b>direct proportion</b> if they increase at the same rate: double one, double the other. Their ratio is constant and their graph is a straight line through the origin.</p>
<p><b>Unitary method:</b> find the value of <b>one</b> unit, then multiply.</p>
<div class="callout ex"><b class="t">Recipe</b>A recipe for 6 people uses 450 g of flour. How much for 10 people?<br>One person: $450\div6=75$ g. Ten people: $75\times10=750$ g.</div>
<p><b>Best buy:</b> compare the cost of one unit (or the amount per dollar).</p>
<table class="t"><tr><th>Pack</th><th>Price</th><th>Cost per 100 g</th></tr><tr><td>400 g</td><td>${D}2.60</td><td>${D}0.65</td></tr><tr><td>750 g</td><td>${D}4.50</td><td><b>${D}0.60 (best buy)</b></td></tr><tr><td>1 kg</td><td>${D}6.20</td><td>${D}0.62</td></tr></table>
${F.plot({ w: 420, h: 220, x: [0, 10], y: [0, 800], gridStep: [1, 100], ticks: { x: [2, 4, 6, 8, 10], y: [200, 400, 600, 800] }, xlabel: "people", ylabel: "flour / g", curves: [{ f: x => 75 * x, c: "c thick" }], marks: [{ x: 6, y: 450, c: "c", label: "(6, 450)", pos: "nw" }, { x: 10, y: 750, c: "o", label: "(10, 750)", pos: "nw" }], cap: "Direct proportion: a straight line through the origin, gradient = amount per person.", size: "small" })}`},

    { h: "Inverse proportion (E1.11)", body: M`
<p>Two quantities are in <b>inverse proportion</b> if one increases as the other decreases at the same rate: double one, halve the other. Their <b>product</b> is constant.</p>
<div class="callout ex"><b class="t">Workers</b>6 workers take 10 days to build a wall. How long would 4 workers take (same rate)?<br>Total work $=6\times10=60$ worker-days. With 4 workers: $60\div4=15$ days.</div>
<div class="callout warn"><b class="t">Sense check</b>Fewer workers → <b>longer</b> time. If your answer went the "wrong way" you used direct proportion by mistake.</div>
${F.plot({ w: 420, h: 220, x: [0, 12], y: [0, 70], gridStep: [2, 10], ticks: { x: [2, 4, 6, 8, 10, 12], y: [20, 40, 60] }, xlabel: "workers", ylabel: "days", curves: [{ f: x => 60 / x, dom: [0.9, 12], c: "c thick" }], marks: [{ x: 6, y: 10, c: "c", label: "(6, 10)", pos: "ne" }, { x: 4, y: 15, c: "o", label: "(4, 15)", pos: "ne" }], cap: "Inverse proportion: workers × days = 60 for every point on the curve.", size: "small" })}
<p>Algebraic proportion ($y\propto x$, $y\propto\frac1{x^2}$, …) is covered in <i>Variation</i>.</p>
<details class="check"><summary>A tank is filled by 3 taps in 40 minutes. How long with 5 taps?</summary><div>$3\times40=120$ tap-minutes; $120\div5=24$ minutes.</div></details>`},

    { h: "Rates and speed (E1.12)", body: M`
<p>A <b>rate</b> compares two quantities with different units: speed (km/h), price (${D}/kg), flow (litres/min), density (g/cm³), pressure (N/m²).</p>
$$\text{speed}=\frac{\text{distance}}{\text{time}}\qquad \text{average speed}=\frac{\text{total distance}}{\text{total time}}$$
${(() => { let s = F.path("M60,20 L120,120 L0,120 Z", "c cS") + F.line(20, 75, 100, 75, "k mid") + F.line(60, 75, 60, 120, "k mid") + F.text(60, 64, "D", "tk big bold") + F.text(30, 108, "S", "tk big bold") + F.text(90, 108, "T", "tk big bold");
  s += F.text(160, 50, "Cover the one you want:", "tk", "start") + F.text(160, 76, "D = S × T", "tc bold", "start") + F.text(160, 100, "S = D ÷ T", "tc bold", "start") + F.text(160, 124, "T = D ÷ S", "tc bold", "start");
  return F.fig(360, 135, s, "The speed–distance–time triangle.", { size: "small" }); })()}
<ul><li>Convert units first: 45 minutes $=0.75$ hours (not 0.45!); 2 h 20 min $=2\tfrac13$ h.</li>
<li>km/h → m/s: multiply by 1000, divide by 3600: $72$ km/h $=20$ m/s.</li></ul>
<div class="callout ex"><b class="t">Average speed trap</b>A car travels 60 km at 30 km/h, then 60 km at 60 km/h. Average speed is <b>not</b> 45 km/h. Times: 2 h and 1 h. Average $=\dfrac{120}{3}=40$ km/h.</div>
<details class="check"><summary>A train leaves at 09:47 and arrives at 12:23, travelling 312 km. Find its average speed.</summary><div>Time = 2 h 36 min = 2.6 h. Speed = 312 ÷ 2.6 = 120 km/h.</div></details>`},

    { h: "Percentages of amounts (E1.13)", body: M`
<ul><li><b>Percentage of an amount:</b> 35% of 240 $=0.35\times240=84$.</li>
<li><b>One quantity as a percentage of another:</b> $\dfrac{\text{part}}{\text{whole}}\times100$. 18 out of 24 $=\tfrac{18}{24}\times100=75\%$. Units must match: 45 cm as a percentage of 2 m $=\tfrac{45}{200}\times100=22.5\%$.</li>
<li><b>Without a calculator:</b> build from 10%, 5%, 1%. 17.5% of 80 $=8+4+2=14$.</li></ul>`},

    { h: "Percentage increase, decrease and change (E1.13)", body: M`
<p class="lead">Use a <b>multiplier</b>: one multiplication does the whole job.</p>
${F.fig(440, 160, mult(10, 10, DS + "80", DS + "92", "1.15") + F.text(340, 24, "increase 15%", "tc small", "start") + mult(10, 90, DS + "80", DS + "70.40", "0.88", "o") + F.text(340, 104, "decrease 12%", "to small", "start"), "Increase by r%: × (1 + r/100). Decrease by r%: × (1 − r/100).", { size: "wide" })}
<table class="t"><tr><th>Change</th><th>Multiplier</th></tr><tr><td>Increase by 15%</td><td>1.15</td></tr><tr><td>Increase by 3.5%</td><td>1.035</td></tr><tr><td>Decrease by 12%</td><td>0.88</td></tr><tr><td>Decrease by 0.5%</td><td>0.995</td></tr><tr><td>Increase by 100%</td><td>2</td></tr></table>
<p><b>Percentage change:</b></p>
$$\text{percentage change}=\frac{\text{new}-\text{original}}{\text{original}}\times100$$
<p>A price rises from ${D}40 to ${D}46: change $=\tfrac{6}{40}\times100=15\%$ increase. Percentage <b>profit</b> or <b>loss</b> uses the same formula with cost price as the original.</p>
<div class="callout warn"><b class="t">Successive changes</b>A 20% increase followed by a 20% decrease is <b>not</b> back to the start: $1.2\times0.8=0.96$, a 4% decrease overall. Multiply multipliers, never add percentages.</div>`},

    { h: "Reverse percentages (E1.13)", body: M`
<p>If you know the amount <b>after</b> a percentage change, <b>divide</b> by the multiplier to get the original.</p>
<div class="callout ex"><b class="t">Example</b>After a 15% discount, a jacket costs ${D}68. Find the original price.<br>Multiplier $=0.85$. Original $=68\div0.85=\$80$.</div>
${F.fig(440, 70, mult(10, 10, "?", DS + "68", "0.85", "o") + F.text(340, 24, "÷ 0.85 to go back", "to small", "start"), "Work backwards by dividing by the multiplier.", { size: "wide" })}
<div class="callout warn"><b class="t">The classic wrong answer</b>Finding 15% of ${D}68 and adding it on gives ${D}78.20, which is wrong: the 15% was of the <i>original</i> price, not of ${D}68.</div>
<details class="check"><summary>A population increased by 8% to 5940. What was it before?</summary><div>$5940\div1.08=5500$.</div></details>`},

    { h: "Simple and compound interest (E1.13)", body: M`
<p><b>Simple interest</b> is paid only on the original amount (principal) each year:</p>
$$I=\frac{PRT}{100}$$
<p>(P = principal, R = rate per year %, T = time in years.)</p>
<p><b>Compound interest</b> is paid on the principal <b>plus</b> interest already earned, so it grows faster:</p>
$$\text{Value}=P\left(1+\frac{r}{100}\right)^n$$
<div class="callout ex"><b class="t">Compare</b>${D}2000 for 3 years at 5% per year.<br>Simple: $I=\dfrac{2000\times5\times3}{100}=\$300$, total ${D}2300.<br>Compound: $2000\times1.05^3=\$2315.25$; interest ${D}315.25.</div>
<p>Experiment with the <b>interest lab</b> at the bottom of the page: set a negative rate to see depreciation.</p>
<details class="check"><summary>How many complete years for ${D}500 to exceed ${D}700 at 4% compound interest?</summary><div>Trial: $500\times1.04^8=684.28$; $500\times1.04^9=711.65$. Answer: 9 years.</div></details>`},

    { h: "Exponential growth and decay (E1.17)", body: M`
<p>When a quantity changes by the <b>same percentage</b> each time period, it grows or decays <b>exponentially</b>:</p>
$$y=a\times k^{\,t}\qquad k\gt1:\text{ growth},\quad 0\lt k\lt1:\text{ decay}$$
${F.plot({ w: 480, h: 230, x: [0, 10], y: [0, 2600], gridStep: [1, 500], ticks: { x: [2, 4, 6, 8, 10], y: [500, 1000, 1500, 2000, 2500] }, xlabel: "years", ylabel: "value", curves: [{ f: x => 1000 * Math.pow(1.1, x), c: "c thick", label: "growth ×1.1", lpos: [9.5, 1000 * Math.pow(1.1, 9.5)], ldx: -6, la: "end" }, { f: x => 1000 * Math.pow(0.8, x), c: "o thick", label: "decay ×0.8", lpos: [6, 1000 * Math.pow(0.8, 6)], ldy: -10 }], cap: "Exponential growth curves upwards ever more steeply; decay curves towards zero but never reaches it.", size: "small" })}
<ul><li><b>Depreciation:</b> a car worth ${D}18 000 loses 15% of its value each year. After 4 years: $18\,000\times0.85^4=\$9396$ (to the nearest dollar).</li>
<li><b>Bacteria:</b> a colony doubles every hour: $N=500\times2^t$. After 6 hours: $500\times64=32\,000$.</li>
<li><b>Half-life</b> (radioactivity): the amount halves every fixed time period: $k=0.5$ per half-life.</li></ul>
<details class="check"><summary>A population of 1200 falls by 6% each year. After how many years is it first below 800?</summary><div>$1200\times0.94^6=827.8$; $1200\times0.94^7=778.1$. After 7 years.</div></details>`},

    { h: "Time (E1.15)", body: M`
<ul><li>Units: 60 s = 1 min, 60 min = 1 h, 24 h = 1 day, 7 days = 1 week, 365 days = 1 year (366 in a leap year).</li>
<li><b>24-hour clock:</b> 3:45 pm = 15:45; 12:30 am = 00:30.</li>
<li><b>Time intervals:</b> count up in stages. From 08:45 to 14:20: 08:45 → 09:00 (15 min) → 14:00 (5 h) → 14:20 (20 min): 5 h 35 min.</li>
<li><b>Hours as decimals:</b> 3.4 h = 3 h 24 min (0.4 × 60). Never write 3.4 h as "3 h 40 min".</li>
<li><b>Time zones:</b> if Dubai is 4 hours ahead of London, a 7-hour flight leaving London at 22:00 arrives at 22:00 + 7 h + 4 h = 09:00 next day (local time).</li></ul>`},

    { h: "Money and currency conversion (E1.16)", body: M`
<p>Currency conversions are <b>direct proportion</b>: multiply by the exchange rate one way, divide the other way.</p>
<div class="callout ex"><b class="t">Example</b>${D}1 = 0.92 euros. (a) Convert ${D}250 to euros: $250\times0.92=230$ euros. (b) Convert 115 euros to dollars: $115\div0.92=\$125$.</div>
${F.plot({ w: 420, h: 220, x: [0, 100], y: [0, 100], gridStep: [10, 10], ticks: { x: [20, 40, 60, 80, 100], y: [20, 40, 60, 80, 100] }, xlabel: "dollars", ylabel: "euros", curves: [{ f: x => .92 * x, c: "c thick" }], extra: (X, Y) => F.line(X(50), Y(0), X(50), Y(46), "o d") + F.line(X(0), Y(46), X(50), Y(46), "o d") + F.text(X(52), Y(40), DS + "50 → 46 euros", "to small", "start"), cap: "A conversion graph is a straight line through the origin.", size: "small" })}
<p>Give money answers to <b>2 decimal places</b> (cents), e.g. ${D}12.50 not ${D}12.5, unless asked otherwise.</p>`}
  ],
  worked: [
    { q: M`The ratio of boys to girls in a club is $5:3$. There are 12 more boys than girls. How many members are there?`,
      steps: [M`Difference = $5-3=2$ parts = 12, so 1 part = 6.`, M`Boys $=30$, girls $=18$.`, M`Total $=48$ members.`]},
    { q: M`In a sale, prices are reduced by 30%. A TV costs ${D}378 in the sale. Find its original price.`,
      steps: [M`Multiplier for a 30% decrease = 0.70.`, M`Original $=378\div0.70=\$540$.`]},
    { q: M`A boat is worth ${D}45 000. It depreciates by 12% in the first year and 8% per year after that. Find its value after 3 years.`,
      steps: [M`After year 1: $45\,000\times0.88=39\,600$.`, M`After 2 more years: $39\,600\times0.92^2=33\,517.44$.`, M`Value ≈ ${D}33 517.44.`]}
  ],
  formulas: [["Speed", M`$\text{speed}=\dfrac{\text{distance}}{\text{time}}$`], ["Percentage change", M`$\dfrac{\text{new}-\text{original}}{\text{original}}\times100$`], ["Simple interest", M`$I=\dfrac{PRT}{100}$`], ["Compound interest", M`$P\left(1+\dfrac{r}{100}\right)^n$`], ["Exponential growth/decay", M`$y=a\,k^t$`], ["Reverse percentage", "original = new ÷ multiplier"]],
  cards: [
    ["Simplify 18 : 30 : 42", "3 : 5 : 7"],
    ["Write 4 : 10 in the form 1 : n", "1 : 2.5"],
    ["Boys : girls = 2 : 5. Fraction of boys?", "2/7"],
    ["Sharing method", "Add parts, divide to get one part, multiply."],
    ["Direct proportion graph", "Straight line through the origin."],
    ["Inverse proportion: what stays constant?", "The product of the two quantities."],
    ["Multiplier for +7%", "1.07"],
    ["Multiplier for −35%", "0.65"],
    ["Percentage change formula", "(new − original) ÷ original × 100"],
    ["Reverse percentage", "Divide by the multiplier."],
    ["Simple interest formula", "I = PRT / 100"],
    ["Compound interest formula", "P(1 + r/100)ⁿ"],
    ["20% up then 20% down", "× 0.96: a 4% decrease overall."],
    ["Average speed", "Total distance ÷ total time."],
    ["45 minutes in hours", "0.75 h"],
    ["72 km/h in m/s", "20 m/s"],
    ["3.6 hours in h and min", "3 h 36 min"],
    ["Exponential decay multiplier", "Between 0 and 1."],
    ["Map scale 1 : 50 000. 4 cm on map =", "2 km"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`Share 72 in the ratio $5:3$. The larger share is`, opts: ["27", "40", "45", "48"], ans: 2, why: M`One part $=9$; $5\times9$.` },
    { type: "mcq", marks: 1, q: M`The multiplier for a 4% decrease is`, opts: ["0.4", "0.96", "1.04", "0.04"], ans: 1, why: M`$1-0.04$.` },
    { type: "mcq", marks: 1, q: M`A price rises from ${D}25 to ${D}29. The percentage increase is`, opts: ["4%", "13.8%", "16%", "86%"], ans: 2, why: M`$\tfrac{4}{25}\times100$.` },
    { type: "mcq", marks: 1, q: M`5 machines take 12 hours. How long would 3 machines take?`, opts: ["7.2 h", "20 h", "15 h", "36 h"], ans: 1, why: M`$60\div3$.` },
    { type: "mcq", marks: 1, q: M`A car travels 150 km in 2 h 30 min. Its average speed is`, opts: ["60 km/h", "65 km/h", "75 km/h", "50 km/h"], ans: 0, why: M`$150\div2.5$.` },
    { type: "mcq", marks: 1, q: M`${D}400 is invested at 3% compound interest for 2 years. The final amount is`, opts: [D + "424.00", D + "424.36", D + "412.00", D + "436.00"], ans: 1, why: M`$400\times1.03^2$.` },
    { type: "struct", marks: 2, q: M`Increase ${D}65 by 18%.`, ms: M`<b>M1</b> $65\times1.18$<br><b>A1</b> ${D}76.70` },
    { type: "struct", marks: 3, q: M`After a 12% pay rise, Sam earns ${D}2128 per month. What did Sam earn before?`, ms: M`<b>M1</b> multiplier 1.12<br><b>M1</b> $2128\div1.12$<br><b>A1</b> ${D}1900` },
    { type: "struct", marks: 3, q: M`A recipe for 8 biscuits uses 120 g butter and 200 g flour. How much of each is needed for 20 biscuits?`, ms: M`<b>M1</b> scale factor $20\div8=2.5$<br><b>A1</b> 300 g butter<br><b>A1</b> 500 g flour` },
    { type: "struct", marks: 3, q: M`Calculate the simple interest on ${D}3500 invested for 4 years at 2.5% per year, and compare with compound interest.`, ms: M`<b>A1</b> simple $=\$350$<br><b>M1</b> compound $3500\times1.025^4=3863.35$<br><b>A1</b> compound interest ${D}363.35, ${D}13.35 more` },
    { type: "struct", marks: 2, q: M`Write 2 h 45 min as a decimal number of hours, and 2.45 h in hours and minutes.`, ms: M`<b>B1</b> 2.75 h<br><b>B1</b> 2 h 27 min` },
    { type: "struct", marks: 3, q: M`A car bought for ${D}22 000 depreciates by 18% per year. Find its value after 5 years, to the nearest dollar.`, ms: M`<b>M1</b> multiplier 0.82<br><b>M1</b> $22\,000\times0.82^5$<br><b>A1</b> ${D}8154` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: M`Simplify the ratio $45:60:75$.`, ms: M`<b>M1</b> divide by 15<br><b>A1</b> $3:4:5$` },
    { d: 1, type: "struct", marks: 2, q: M`Find 15% of ${D}84.`, ms: M`<b>M1</b> $0.15\times84$<br><b>A1</b> ${D}12.60` },
    { d: 1, type: "struct", marks: 2, q: M`Write 36 as a percentage of 80.`, ms: M`<b>M1</b> $\tfrac{36}{80}\times100$<br><b>A1</b> 45%` },
    { d: 1, type: "mcq", marks: 1, q: M`A map has scale $1:50\,000$. A road is 6 cm on the map. Its real length is`, opts: ["300 m", "3 km", "30 km", "0.3 km"], ans: 1, why: M`$300\,000$ cm $=3$ km.` },
    { d: 1, type: "struct", marks: 2, q: M`A bus leaves at 10:47 and arrives at 13:15. How long is the journey?`, ms: M`<b>M1</b> counts up in stages<br><b>A1</b> 2 h 28 min` },
    { d: 1, type: "struct", marks: 2, q: M`${D}1 = 83.2 rupees. Change ${D}45 into rupees.`, ms: M`<b>M1</b> $45\times83.2$<br><b>A1</b> 3744 rupees` },
    { d: 2, type: "struct", marks: 3, q: M`Paint is mixed red : white = $2:7$. Tom has 1.2 litres of red. How much white does he need, and how much paint does he make?`, ms: M`<b>M1</b> 1 part $=0.6$ L<br><b>A1</b> white 4.2 L<br><b>A1</b> total 5.4 L` },
    { d: 2, type: "struct", marks: 3, q: M`Which is better value: 350 ml for ${D}1.47 or 500 ml for ${D}2.05? Show your working.`, ms: M`<b>M1</b> unit cost for one: 0.42 c/ml<br><b>M1</b> other: 0.41 c/ml<br><b>A1</b> 500 ml is better value` },
    { d: 2, type: "struct", marks: 2, q: M`The price of a phone is reduced by 15% and then by a further 10%. Find the overall percentage reduction.`, ms: M`<b>M1</b> $0.85\times0.9=0.765$<br><b>A1</b> 23.5%` },
    { d: 2, type: "struct", marks: 3, q: M`A cyclist rides 24 km at 16 km/h and then 18 km at 12 km/h. Calculate the average speed for the whole journey.`, ms: M`<b>M1</b> times 1.5 h and 1.5 h<br><b>M1</b> $42\div3$<br><b>A1</b> 14 km/h` },
    { d: 2, type: "struct", marks: 2, q: M`Change 54 km/h into metres per second.`, ms: M`<b>M1</b> $54\times1000\div3600$<br><b>A1</b> 15 m/s` },
    { d: 2, type: "struct", marks: 3, q: M`A shopkeeper buys a coat for ${D}60 and sells it for ${D}84. Calculate the percentage profit. Another coat is sold for ${D}63 at a 40% profit; find its cost price.`, ms: M`<b>A1</b> 40%<br><b>M1</b> $63\div1.4$<br><b>A1</b> ${D}45` },
    { d: 3, type: "struct", marks: 4, q: M`The ratio of red to blue counters in a bag is $4:5$. When 6 red counters are added the ratio becomes $6:5$. How many counters were in the bag originally?`, ms: M`<b>M1</b> red $=4x$, blue $=5x$<br><b>M1</b> $\dfrac{4x+6}{5x}=\dfrac65$<br><b>M1</b> $20x+30=30x \Rightarrow x=3$<br><b>A1</b> 27 counters` },
    { d: 3, type: "struct", marks: 4, q: M`A bacteria population doubles every 20 minutes. At noon there are 300 bacteria. (a) How many at 14:00? (b) At what time does the population first exceed 1 million?`, ms: M`<b>M1</b> 6 doublings<br><b>A1</b> $300\times2^6=19\,200$<br><b>M1</b> $300\times2^n\gt10^6 \Rightarrow 2^n\gt3333$, $n=12$<br><b>A1</b> 16:00` },
    { d: 3, type: "struct", marks: 4, q: M`Ama invests ${D}5000 at $r\%$ per year compound interest. After 3 years it is worth ${D}5788.13. Find $r$.`, ms: M`<b>M1</b> $5000k^3=5788.13$<br><b>M1</b> $k^3=1.157626$<br><b>M1</b> $k=\sqrt[3]{1.157626}=1.05$<br><b>A1</b> $r=5$` },
    { d: 3, type: "struct", marks: 3, q: M`Car A depreciates by 20% in its first year, then by 10% every year after. Show that after 6 years it is worth less than half its original value.`, ms: M`<b>M1</b> $0.8\times0.9^5$<br><b>A1</b> $0.4724$<br><b>B1</b> $0.4724\lt0.5$ so less than half` }
  ]
});
}
