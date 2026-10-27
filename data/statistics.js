window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;

/* ============================================================
   STATISTICS  (0580: E9.1 – E9.7)
   ============================================================ */
TOPICS.push({
  id: "statistics", subject: "maths", unit: 9, title: "Statistics",
  blurb: "Collecting and displaying data, mean, median, mode and range from lists and frequency tables, estimating the mean from grouped data, quartiles, interquartile range and box plots, histograms with frequency density, cumulative frequency, and scatter diagrams with correlation.",
  level: "Core → Extended", demo: "averages",
  syllabus: [
    ["E9.1", "Collect, classify and tabulate data; read, interpret and draw inferences from tables and diagrams", 0],
    ["E9.2", "Construct and interpret bar charts, pie charts, pictograms, stem-and-leaf diagrams, simple frequency distributions", 0],
    ["E9.3", "Calculate the mean, median, mode and range for individual and discrete data, and estimate the mean for grouped data", 1],
    ["E9.3", "Identify the modal class from a grouped frequency distribution", 2],
    ["E9.4", "Construct and interpret cumulative frequency tables and diagrams; estimate the median, quartiles and interquartile range", 3],
    ["E9.5", "Construct and interpret box-and-whisker plots", 4],
    ["E9.6", "Construct and interpret histograms with equal and unequal intervals (frequency density)", 5],
    ["E9.7", "Understand and interpret scatter diagrams; draw a line of best fit by eye; understand correlation", 6]
  ],
  sections: [
    { h: "Displaying data (E9.1, E9.2)", body: M`
<table class="t"><tr><th>Diagram</th><th>Best for</th></tr>
<tr><td>Bar chart</td><td>Comparing categories; gaps between bars</td></tr>
<tr><td>Pie chart</td><td>Showing parts of a whole (angle $=\dfrac{\text{frequency}}{\text{total}}\times360°$)</td></tr>
<tr><td>Pictogram</td><td>Simple visual comparison with a key (part-symbols for part-amounts)</td></tr>
<tr><td>Stem-and-leaf diagram</td><td>Shows every value, ordered, keeping the actual data visible</td></tr>
<tr><td>Histogram</td><td>Continuous/grouped data; bars touch; height = frequency density</td></tr>
<tr><td>Scatter diagram</td><td>Relationship between two variables</td></tr></table>
${(() => { let s = ""; const rows = [["1", "4 5 7 9"], ["2", "0 2 2 6 8"], ["3", "1 3 5"]];
  rows.forEach(([stem, leaves], i) => s += F.text(20, 24 + i * 24, stem, "tk bold", "start") + F.text(45, 24 + i * 24, leaves, "tk", "start"));
  s += F.line(38, 5, 38, 80, "k") + F.text(20, 94, "key: 1 | 4 = 14", "tm small", "start");
  return F.fig(220, 110, s, "Stem-and-leaf diagram: the stem is the tens digit, the leaves are units, in order.", { size: "small" }); })()}
<div class="callout warn"><b class="t">Bar chart vs histogram</b>Bar charts (categories) have <b>gaps</b> between bars. Histograms (continuous data) have <b>no gaps</b> — the bars touch, because the data is continuous across the boundaries.</div>`},

    { h: "Averages and range from a list (E9.3)", body: M`
<table class="t"><tr><th>Measure</th><th>Definition</th></tr>
<tr><td><b>Mean</b></td><td>Sum of all values ÷ number of values</td></tr>
<tr><td><b>Median</b></td><td>The middle value when data is <b>ordered</b> (average of the middle two if $n$ is even)</td></tr>
<tr><td><b>Mode</b></td><td>The most frequently occurring value</td></tr>
<tr><td><b>Range</b></td><td>Largest value − smallest value (a measure of spread)</td></tr></table>
<div class="callout ex"><b class="t">Example</b>Data: 3, 7, 7, 9, 12, 15. Mean $=\dfrac{53}{6}=8.83$. Median $=\dfrac{7+9}{2}=8$. Mode $=7$. Range $=15-3=12$.</div>
<p><b>Choosing the best average:</b> the <b>median</b> is not affected by extreme values (outliers); the <b>mean</b> uses every value but is pulled by outliers; the <b>mode</b> is useful for non-numerical (categorical) data.</p>`},

    { h: "Averages from a frequency table (E9.3)", body: M`
<p>For discrete data in a frequency table, the mean is $\dfrac{\sum fx}{\sum f}$ (a weighted average). The median and mode are found by locating the right <b>position</b> using cumulative frequencies.</p>
<table class="t"><tr><th>Score ($x$)</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr><tr><th>Frequency ($f$)</th><td>2</td><td>5</td><td>8</td><td>4</td><td>1</td></tr></table>
<p>$n=20$; $\sum fx=(1)(2)+(2)(5)+(3)(8)+(4)(4)+(5)(1)=2+10+24+16+5=57$. Mean $=\dfrac{57}{20}=2.85$.</p>
<p>Median: the $\tfrac{20+1}{2}=10.5$th value, i.e. average of the 10th and 11th — both are 3 (cumulative frequencies 2, 7, 15, 19, 20): median $=3$. Mode $=3$ (highest frequency).</p>`},

    { h: "Estimating the mean from grouped data (E9.3)", body: M`
<p>When data is grouped into class intervals, you cannot find the exact mean — only an <b>estimate</b>, using the <b>midpoint</b> of each class.</p>
<table class="t"><tr><th>Height (cm)</th><td>140–150</td><td>150–160</td><td>160–170</td><td>170–180</td></tr><tr><th>Midpoint</th><td>145</td><td>155</td><td>165</td><td>175</td></tr><tr><th>Frequency</th><td>5</td><td>12</td><td>18</td><td>5</td></tr></table>
<p>$\sum fx=(145)(5)+(155)(12)+(165)(18)+(175)(5)=725+1860+2970+875=6430$. $n=40$. Estimated mean $=\dfrac{6430}{40}=160.75$ cm.</p>
<p>The <b>modal class</b> is simply the class with the highest frequency (here, 160–170): you cannot find an exact mode for grouped data.</p>
<details class="check"><summary>Why is it called an "estimate" of the mean?</summary><div>Because we don't know the exact values within each class, only how many fall in each interval — the midpoint is used as a stand-in for every value in that class.</div></details>`},

    { h: "Cumulative frequency, quartiles and box plots (E9.4, E9.5)", body: M`
<p><b>Cumulative frequency</b> is the running total of frequencies. Plot cumulative frequency (y-axis) against the <b>upper class boundary</b> (x-axis), then join the points with a smooth curve.</p>
${F.plot({ w: 460, h: 260, x: [0, 60], y: [0, 100], gridStep: [10, 20], ticks: { x: [10, 20, 30, 40, 50, 60], y: [25, 50, 75, 100] }, xlabel: "mark", ylabel: "cumulative frequency", curves: [{ pts: [[0, 0], [10, 4], [20, 15], [30, 38], [40, 68], [50, 90], [60, 100]], c: "c thick" }], extra: (X, Y) => F.line(X(0), Y(50), X(33), Y(50), "r d") + F.line(X(33), Y(0), X(33), Y(50), "r d") + F.text(X(33) + 4, Y(10), "median ≈ 33", "tr small bold", "start") + F.line(X(0), Y(25), X(24), Y(25), "o d") + F.line(X(24), Y(0), X(24), Y(25), "o d") + F.line(X(0), Y(75), X(42), Y(75), "o d") + F.line(X(42), Y(0), X(42), Y(75), "o d"), cap: "Read the median at cumulative frequency n/2, lower quartile at n/4, upper quartile at 3n/4.", size: "small" })}
<ul><li><b>Median</b>: read across from $\tfrac n2$ (here $n=100$, so 50).</li><li><b>Lower quartile ($Q_1$)</b>: from $\tfrac n4$ (25).</li><li><b>Upper quartile ($Q_3$)</b>: from $\tfrac{3n}4$ (75).</li><li><b>Interquartile range (IQR)</b> $=Q_3-Q_1$: the spread of the <b>middle 50%</b>, less affected by outliers than the range.</li></ul>
<p>A <b>box-and-whisker plot</b> summarises this as five values: minimum, $Q_1$, median, $Q_3$, maximum.</p>
${(() => { let s = F.line(20, 80, 480, 80, "k") ; const vals = [10, 60, 90, 130, 180], labs = ["min 10", "Q1 60", "median 90", "Q3 130", "max 180"];
  s = F.line(60, 50, 60, 110, "k") + F.line(60, 50, 230, 50, "k") + F.line(60, 110, 230, 110, "k") + F.line(230, 50, 230, 110, "k") + F.rect(60, 50, 170, 60, "c cS", 0) + F.line(140, 50, 140, 110, "r thick") + F.line(20, 80, 60, 80, "k") + F.line(230, 80, 440, 80, "k") + F.line(20, 65, 20, 95, "k") + F.line(440, 65, 440, 95, "k");
  vals.forEach((v, i) => s += F.text([20, 60, 140, 230, 440][i], 130, labs[i], "tk small", "middle"));
  return F.fig(460, 145, s, "Box plot: whiskers to min/max, box from Q1 to Q3, line at the median.", { size: "small" }); })()}
<p><b>Comparing distributions</b> with two box plots: compare the <b>medians</b> (typical value) and the <b>IQRs or ranges</b> (consistency/spread) — always write both a <i>comparison of location</i> and a <i>comparison of spread</i> in context.</p>`},

    { h: "Histograms with frequency density (E9.6)", body: M`
<div class="viz" data-viz="histDensity"></div>
<div class="callout key"><b class="t">Rule</b>When class widths are <b>unequal</b>, the bar <b>height</b> must be <b>frequency density</b>, not frequency, so that the <b>area</b> of each bar represents the frequency.</div>
<p class="eq">$$\text{frequency density}=\frac{\text{frequency}}{\text{class width}}$$</p>
<table class="t"><tr><th>Class</th><th>Frequency</th><th>Width</th><th>Frequency density</th></tr>
<tr><td>0–10</td><td>20</td><td>10</td><td>2.0</td></tr><tr><td>10–20</td><td>50</td><td>10</td><td>5.0</td></tr><tr><td>20–50</td><td>60</td><td>30</td><td>2.0</td></tr></table>
<div class="callout warn"><b class="t">Reading frequency from a histogram</b>To find the frequency of a bar: frequency $=$ frequency density $\times$ class width (i.e. the <b>area</b>). If asked for the frequency in part of a bar, use a proportional area.</div>
<details class="check"><summary>A histogram bar has height (frequency density) 3.5 and spans the class 20–26. Find its frequency.</summary><div>3.5 × 6 = 21.</div></details>`},

    { h: "Scatter diagrams and correlation (E9.7)", body: M`
<div class="viz" data-viz="correlation"></div>
<table class="t"><tr><th>Type</th><th>Meaning</th></tr>
<tr><td>Positive correlation</td><td>As one variable increases, the other tends to increase too</td></tr>
<tr><td>Negative correlation</td><td>As one increases, the other tends to decrease</td></tr>
<tr><td>No correlation</td><td>No clear relationship between the variables</td></tr></table>
<p>A <b>line of best fit</b> is drawn by eye, through the middle of the points, roughly the same number of points on each side. It can be used to <b>estimate</b> a value (interpolation, inside the data range — reliable; extrapolation, outside the range — less reliable).</p>
<div class="callout warn"><b class="t">Correlation ≠ causation</b>A correlation shows a <b>relationship</b>, not that one variable <b>causes</b> the other to change. There could be a third factor involved, or it could be coincidence.</div>`}
  ],
  worked: [
    { q: M`A test is marked out of 10. Scores: 2,3,3,3,4,5,5,6,7,8,8,9,9,9,10 (15 students). Find the mean, median and mode.`,
      steps: [M`Sum $=91$; mean $=91\div15=6.07$ (3 s.f.).`, M`15 values, median is the 8th: counting in order, the 8th value is 6.`, M`Mode: 9 appears three times, most frequent: mode $=9$.`]},
    { q: M`Estimate the mean from this table: 0–20 (f=8, midpoint 10); 20–40 (f=15, midpoint 30); 40–60 (f=7, midpoint 50).`,
      steps: [M`$\sum fx=80+450+350=880$.`, M`$n=30$.`, M`Mean $\approx880\div30=29.3$.`]},
    { q: M`A histogram bar for the class 15–18 has frequency density 4. Find the frequency.`,
      steps: [M`Width $=3$.`, M`Frequency $=4\times3=12$.`]}
  ],
  formulas: [["Mean", M`$\dfrac{\sum x}{n}$ or $\dfrac{\sum fx}{\sum f}$`], ["Range", "max − min"], ["IQR", M`$Q_3-Q_1$`], ["Frequency density", M`$\dfrac{\text{frequency}}{\text{class width}}$`], ["Pie chart angle", M`$\dfrac{f}{\sum f}\times360°$`]],
  cards: [
    ["Mean formula", "sum of values ÷ number of values"],
    ["Median", "The middle value when data is ordered."],
    ["Mode", "The most frequent value."],
    ["Range", "Largest minus smallest."],
    ["Which average ignores outliers?", "Median"],
    ["Modal class", "The class interval with the highest frequency."],
    ["Mean from a frequency table", "Σfx ÷ Σf"],
    ["Estimating the mean of grouped data", "Use the midpoint of each class."],
    ["Median from cumulative frequency", "Read across from n/2."],
    ["Lower quartile position", "n/4"],
    ["Upper quartile position", "3n/4"],
    ["IQR meaning", "Spread of the middle 50% of the data."],
    ["Box plot five values", "Minimum, Q1, median, Q3, maximum."],
    ["Histogram bar height", "Frequency density = frequency ÷ class width"],
    ["Why frequency density, not frequency?", "So area (not height) represents frequency when class widths differ."],
    ["Bar chart vs histogram", "Bar chart has gaps (categories); histogram has none (continuous data)."],
    ["Positive correlation", "Both variables increase together."],
    ["Line of best fit", "Drawn by eye through the middle of the points."]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`The data 2,4,4,6,9 has mean`, opts: ["4", "4.5", "5", "5.5"], ans: 2, why: M`$25\div5$.` },
    { type: "mcq", marks: 1, q: M`A histogram class 10–25 has frequency 30. Its frequency density is`, opts: ["2", "1.5", "0.5", "15"], ans: 0, why: M`$30\div15$.` },
    { type: "mcq", marks: 1, q: M`On a cumulative frequency graph with n = 80, the upper quartile is read at`, opts: ["20", "40", "60", "80"], ans: 2, why: M`$3n/4$.` },
    { type: "mcq", marks: 1, q: M`A scatter diagram with points scattered randomly shows`, opts: ["strong positive correlation", "strong negative correlation", "no correlation", "perfect correlation"], ans: 2, why: M`No pattern.` },
    { type: "struct", marks: 3, q: M`Find the mean, median and mode of: 3, 5, 5, 6, 8, 8, 8, 10, 12.`, ms: M`<b>B1</b> mean $=65\div9=7.22$<br><b>B1</b> median $=8$ (5th value)<br><b>B1</b> mode $=8$` },
    { type: "struct", marks: 3, q: M`Estimate the mean from: 0–10 (f=4), 10–20 (f=9), 20–30 (f=7).`, ms: M`<b>M1</b> midpoints 5, 15, 25<br><b>M1</b> $\sum fx=20+135+175=330$<br><b>A1</b> $330\div20=16.5$` },
    { type: "struct", marks: 2, q: M`A histogram bar has class width 8 and frequency density 3.5. Find its frequency.`, ms: M`<b>M1</b> $3.5\times8$<br><b>A1</b> 28` },
    { type: "struct", marks: 3, q: M`From a cumulative frequency graph with 60 students, the median is read as 42 and the quartiles as 35 and 50. Find the interquartile range and comment on the spread.`, ms: M`<b>M1</b> $50-35$<br><b>A1</b> IQR = 15<br><b>B1</b> the middle 50% of students scored within a range of 15 marks` },
    { type: "struct", marks: 3, q: M`Two classes' test scores are compared: Class A median 65, IQR 10; Class B median 58, IQR 22. Compare the two classes.`, ms: M`<b>B1</b> Class A's median is higher, so A generally scored better<br><b>B1</b> Class A's IQR is smaller, so A's scores were more consistent<br><b>B1</b> Class B's scores were more spread out / varied` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 2, q: M`Find the range of 7, 12, 3, 9, 15.`, ms: M`<b>M1</b> $15-3$<br><b>A1</b> 12` },
    { d: 1, type: "struct", marks: 2, q: M`Find the median of 8, 3, 5, 9, 11, 2, 7.`, ms: M`<b>M1</b> order: 2,3,5,7,8,9,11<br><b>A1</b> 7` },
    { d: 1, type: "mcq", marks: 1, q: M`Which average can be used for non-numerical data?`, opts: ["mean", "median", "mode", "range"], ans: 2, why: M`Mode only.` },
    { d: 1, type: "struct", marks: 2, q: M`A pie chart shows 90 people split into categories. One category has 18 people. Find its angle.`, ms: M`<b>M1</b> $\tfrac{18}{90}\times360$<br><b>A1</b> 72°` },
    { d: 2, type: "struct", marks: 3, q: M`Estimate the mean from this grouped data: 0–4 (f=6), 4–8 (f=10), 8–12 (f=4).`, ms: M`<b>M1</b> midpoints 2, 6, 10<br><b>M1</b> $\sum fx=12+60+40=112$<br><b>A1</b> $112\div20=5.6$` },
    { d: 2, type: "struct", marks: 3, q: M`A histogram has a bar of width 5 and height (frequency density) 6, and another bar of width 10 with the same frequency. Find the height of the second bar.`, ms: M`<b>M1</b> frequency of first $=30$<br><b>M1</b> height $=30\div10$<br><b>A1</b> 3` },
    { d: 2, type: "struct", marks: 3, q: M`From a cumulative frequency graph with 200 students, the median is 55, Q1 is 40 and Q3 is 68. Find the interquartile range and the percentage of students scoring above 68.`, ms: M`<b>M1</b> IQR $=68-40=28$<br><b>A1</b> IQR = 28<br><b>B1</b> 25% score above Q3` },
    { d: 2, type: "struct", marks: 2, q: M`State one advantage of using the median rather than the mean when a data set contains an extreme outlier.`, ms: M`<b>B2</b> the median is not affected by the outlier / gives a more typical value` },
    { d: 3, type: "struct", marks: 5, q: M`The table shows the ages of 50 people: 0–20 (f=8), 20–40 (f=20), 40–60 (f=15), 60–100 (f=7). Draw (describe) the histogram, stating the frequency density for each bar, and identify the modal class.`, ms: M`<b>M1</b> widths 20, 20, 20, 40<br><b>A1</b> densities 0.4, 1.0, 0.75, 0.175<br><b>B1</b> bars drawn with no gaps, heights as above<br><b>B1</b> modal class 20–40 (highest frequency, 20)<br><b>B1</b> (if asked by density, the tallest bar is also 20–40)` },
    { d: 3, type: "struct", marks: 4, q: M`A set of 9 numbers has mean 12. When a 10th number is added, the new mean is 13. Find the 10th number.`, ms: M`<b>M1</b> original sum $=9\times12=108$<br><b>M1</b> new sum $=10\times13=130$<br><b>A1</b> 10th number $=130-108$<br><b>A1</b> 22` },
    { d: 3, type: "struct", marks: 4, q: M`Scatter diagram data shows a strong positive correlation between hours studied (x) and test score (y), with a line of best fit $y=5x+40$. (a) Estimate the score for 6 hours of study. (b) Explain why using this line to estimate the score for 20 hours of study would be unreliable.`, ms: M`<b>M1</b> $5(6)+40$<br><b>A1</b> 70<br><b>B1</b> 20 hours is far outside the range of the original data (extrapolation)<br><b>B1</b> the relationship may not continue to hold / scores cannot exceed 100 anyway` }
  ]
});
}
