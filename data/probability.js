window.TOPICS = window.TOPICS || [];
{
const M = String.raw, F = FIG;

/* ============================================================
   PROBABILITY  (0580: E8.1 – E8.6)
   ============================================================ */
TOPICS.push({
  id: "probability", subject: "maths", unit: 8, title: "Probability",
  blurb: "Basic probability, relative frequency, expected outcomes, the probability scale, combined events, the addition and multiplication rules, tree diagrams with and without replacement, and Venn diagram probability.",
  level: "Core → Extended", demo: "treeDiagram",
  syllabus: [
    ["E8.1", "Calculate the probability of a single event as a fraction, decimal or percentage", 0],
    ["E8.2", "Understand and use the probability scale from 0 to 1", 1],
    ["E8.3", "Understand relative frequency as an estimate of probability; expected frequency", 2],
    ["E8.4", "Calculate the probability of combined events using sample space diagrams, Venn diagrams and tree diagrams", 3],
    ["E8.5", "Calculate the probability of combined events using the addition rule for mutually exclusive events and the multiplication rule for independent events", 4],
    ["E8.6", "Calculate conditional probability using a tree diagram, Venn diagram or table", 6]
  ],
  sections: [
    { h: "Basic probability (E8.1, E8.2)", body: M`
<p class="eq">$$P(\text{event})=\frac{\text{number of favourable outcomes}}{\text{total number of possible outcomes}}$$</p>
<p>Probabilities are always between 0 (impossible) and 1 (certain), and can be given as a fraction, decimal or percentage.</p>
${(() => { let s = F.line(20, 40, 480, 40, "k") + [0, .25, .5, .75, 1].forEach ? "" : ""; [0, .25, .5, .75, 1].forEach(p => { s += F.line(20 + p * 460, 34, 20 + p * 460, 46, "k") + F.text(20 + p * 460, 64, p === .5 ? "½" : p, "tk small", "middle"); });
  s += F.text(20, 20, "impossible", "tr small", "start") + F.text(250, 20, "even chance", "tk small", "middle") + F.text(480, 20, "certain", "tb small", "end");
  return F.fig(500, 75, s, "The probability scale.", { size: "small" }); })()}
<ul><li>P(rolling a 3 on a fair die) $=\tfrac16$.</li><li>P(an event not happening) $=1-P(\text{event happening})$.</li></ul>
<details class="check"><summary>A bag has 5 red, 3 blue and 2 green counters. Find P(not red).</summary><div>P(red) = 5/10 = ½, so P(not red) = ½.</div></details>`},

    { h: "Relative frequency and expected outcomes (E8.3)", body: M`
<div class="viz" data-viz="relFreq"></div>
<p><b>Relative frequency</b> (experimental probability) $=\dfrac{\text{number of times it happened}}{\text{total number of trials}}$. It <b>estimates</b> the true probability, and the estimate improves with <b>more trials</b>.</p>
<p><b>Expected frequency</b> $=P(\text{event})\times\text{number of trials}$.</p>
<div class="callout ex"><b class="t">Example</b>A spinner lands on red with probability 0.3. It is spun 150 times. Expected number of reds $=0.3\times150=45$.</div>
<details class="check"><summary>A coin is tossed 80 times and lands heads 46 times. What is the relative frequency of heads? Is the coin likely to be fair?</summary><div>46/80 = 0.575. A fair coin should give close to 0.5; 0.575 is a little high but with only 80 trials this could well be due to chance — more trials would be needed to be confident it is biased.</div></details>`},

    { h: "Combined events: listing outcomes (E8.4)", body: M`
<p>For two events together, list all outcomes systematically: a <b>sample space diagram</b> (grid) for two dice, or a <b>list/table</b> for simpler combinations.</p>
${(() => { let s = ""; for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) { const sum = i + j, hi = sum === 7; s += F.rect(20 + (i - 1) * 32, 20 + (j - 1) * 32, 30, 30, hi ? "r rS" : "m mS thin") + F.text(35 + (i - 1) * 32, 40 + (j - 1) * 32, sum, "tk small"); }
  for (let i = 1; i <= 6; i++) s += F.text(35 + (i - 1) * 32, 10, i, "tm small", "middle") + F.text(8, 40 + (i - 1) * 32, i, "tm small", "end");
  return F.fig(220, 220, s, "Sample space for the sum of two dice. 7 is the most likely total (6 ways out of 36).", { size: "small" }); })()}
<p>P(sum = 7) $=\tfrac{6}{36}=\tfrac16$. P(sum $\ge$ 10) $=\tfrac{6}{36}=\tfrac16$ (count the cells: 10,10,10,11,11,12).</p>`},

    { h: "The addition rule: mutually exclusive events (E8.5)", body: M`
<p class="lead">Two events are <b>mutually exclusive</b> if they <b>cannot both happen</b> at the same time (e.g. rolling a 2 and rolling a 5 on one die).</p>
<div class="callout key"><b class="t">OR rule</b>$P(A\text{ or }B)=P(A)+P(B)$ when $A$ and $B$ are mutually exclusive.</div>
<div class="callout ex"><b class="t">Example</b>A bag has 4 red, 5 blue, 3 green counters. P(red or green) $=\tfrac{4}{12}+\tfrac{3}{12}=\tfrac{7}{12}$.</div>
<p>All the probabilities of mutually exclusive outcomes that cover every possibility <b>sum to 1</b>: $P(\text{red})+P(\text{blue})+P(\text{green})=1$.</p>
<details class="check"><summary>P(it rains tomorrow) = 0.3, P(it snows) = 0.1 (these cannot both happen). Find P(rain or snow).</summary><div>0.3 + 0.1 = 0.4.</div></details>`},

    { h: "The multiplication rule: independent events (E8.5)", body: M`
<p class="lead">Two events are <b>independent</b> if one happening does <b>not affect</b> the probability of the other (e.g. two separate dice rolls, or picking <b>with replacement</b>).</p>
<div class="callout key"><b class="t">AND rule</b>$P(A\text{ and }B)=P(A)\times P(B)$ when $A$ and $B$ are independent.</div>
<div class="callout ex"><b class="t">Example</b>P(coin shows heads) $=\tfrac12$; P(die shows 6) $=\tfrac16$. P(heads <b>and</b> a 6) $=\tfrac12\times\tfrac16=\tfrac{1}{12}$.</div>
<div class="callout warn"><b class="t">AND vs OR</b>"AND" (both happen) → <b>multiply</b>. "OR" (mutually exclusive, either happens) → <b>add</b>. Mixing these up is the single most common probability error.</div>`},

    { h: "Tree diagrams (E8.4, E8.6)", body: M`
<p class="lead">A <b>tree diagram</b> shows combined events as branches. <b>Multiply along</b> a path of branches; <b>add</b> the results for different paths that give the outcome you want.</p>
<div class="viz" data-viz="treeDiagram"></div>
<div class="callout key"><b class="t">Rules</b>Probabilities on branches from the same point sum to 1. Multiply along each branch (AND). Add complete paths that satisfy the event (OR).</div>
<div class="callout ex"><b class="t">With replacement</b>A bag has 4 red and 6 blue balls. A ball is drawn, replaced, then another drawn. P(both red) $=\tfrac4{10}\times\tfrac4{10}=\tfrac{16}{100}=0.16$. Probabilities are the <b>same</b> on both picks.</div>
<div class="callout ex"><b class="t">Without replacement</b>Same bag, but the first ball is <b>not</b> replaced. P(both red) $=\tfrac{4}{10}\times\tfrac{3}{9}=\tfrac{12}{90}=\tfrac{2}{15}$. After the first red is removed, only 3 red and 9 total remain.</div>
<p><b>"At least one"</b> problems are often easier using the complement: $P(\text{at least one})=1-P(\text{none})$.</p>
<details class="check"><summary>A bag has 3 red and 7 blue counters. Two are picked without replacement. Find P(at least one red).</summary><div>P(no red) = P(both blue) = 7/10 × 6/9 = 42/90. P(at least one red) = 1 − 42/90 = 48/90 = 8/15.</div></details>`},

    { h: "Venn diagrams and conditional probability (E8.4, E8.6)", body: M`
<p>Probabilities can be read directly from a Venn diagram: $P(A)=\dfrac{n(A)}{n(\mathscr{E})}$.</p>
<div class="callout ex"><b class="t">Example</b>$n(\mathscr{E})=30$. $n(A)=12$, $n(B)=15$, $n(A\cap B)=5$. Find $P(A\cup B)$ and $P(A\text{ only})$.<br>$n(A\cup B)=12+15-5=22$: $P(A\cup B)=\tfrac{22}{30}=\tfrac{11}{15}$.<br>$A$ only $=12-5=7$: $P(A\text{ only})=\tfrac{7}{30}$.</div>
<p><b>Conditional probability</b> ("given that…") restricts the sample space.</p>
<div class="callout ex"><b class="t">Example</b>Using the diagram above, find $P(B\mid A)$ — the probability of $B$ <b>given</b> $A$ has happened.<br>Restrict to the 12 in $A$; of these, 5 are also in $B$. $P(B\mid A)=\dfrac{5}{12}$.</div>
<p>On a tree diagram, conditional probability is simply the probability on the <b>second</b> branch, which already assumes the first branch happened (this is exactly how "without replacement" trees work).</p>`}
  ],
  worked: [
    { q: M`A box has 5 red pens and 7 blue pens. Two pens are taken at random without replacement. Find the probability that they are different colours.`,
      steps: [M`P(red then blue) $=\tfrac{5}{12}\times\tfrac{7}{11}=\tfrac{35}{132}$.`, M`P(blue then red) $=\tfrac{7}{12}\times\tfrac{5}{11}=\tfrac{35}{132}$.`, M`P(different) $=\tfrac{35}{132}+\tfrac{35}{132}=\tfrac{70}{132}=\tfrac{35}{66}$.`]},
    { q: M`P(Amir passes his driving test) = 0.8. P(Beth passes) = 0.7, independently. Find P(exactly one of them passes).`,
      steps: [M`P(Amir yes, Beth no) $=0.8\times0.3=0.24$.`, M`P(Amir no, Beth yes) $=0.2\times0.7=0.14$.`, M`Total $=0.24+0.14=0.38$.`]},
    { q: M`In a class of 28, 18 study history, 15 study geography, and 3 study neither. Find the probability that a randomly chosen student studies both.`,
      steps: [M`$n(H\cup G)=28-3=25$.`, M`$18+15-x=25\Rightarrow x=8$.`, M`$P(\text{both})=\tfrac{8}{28}=\tfrac27$.`]}
  ],
  formulas: [["Basic probability", M`$\dfrac{\text{favourable}}{\text{total}}$`], ["Complement", M`$P(\text{not }A)=1-P(A)$`], ["Addition (mutually exclusive)", M`$P(A\text{ or }B)=P(A)+P(B)$`], ["Multiplication (independent)", M`$P(A\text{ and }B)=P(A)\times P(B)$`], ["Expected frequency", M`$P\times n$`], ["Conditional", M`$P(B\mid A)=\dfrac{n(A\cap B)}{n(A)}$`]],
  cards: [
    ["Probability range", "0 (impossible) to 1 (certain)"],
    ["Relative frequency", "number of successes ÷ number of trials"],
    ["Expected frequency", "probability × number of trials"],
    ["Mutually exclusive events", "Cannot both happen."],
    ["Independent events", "One does not affect the other's probability."],
    ["OR rule", "Add (mutually exclusive events)"],
    ["AND rule", "Multiply (independent events)"],
    ["Tree diagram rule along a branch", "Multiply"],
    ["Tree diagram rule across branches", "Add"],
    ["With replacement", "Probabilities stay the same each pick."],
    ["Without replacement", "Probabilities change (one fewer item)."],
    ["At least one — easier method", "1 − P(none)"],
    ["P(B given A)", "n(A ∩ B) ÷ n(A)"]
  ],
  quiz: [
    { type: "mcq", marks: 1, q: M`A die is rolled. P(even number) =`, opts: ["1/6", "1/3", "1/2", "2/3"], ans: 2, why: M`3 out of 6.` },
    { type: "mcq", marks: 1, q: M`Two independent events have P(A) = 0.4, P(B) = 0.5. P(A and B) =`, opts: ["0.9", "0.2", "0.1", "0.45"], ans: 1, why: M`Multiply.` },
    { type: "mcq", marks: 1, q: M`Mutually exclusive events A, B have P(A) = 0.3, P(B) = 0.2. P(A or B) =`, opts: ["0.06", "0.5", "0.1", "0.44"], ans: 1, why: M`Add.` },
    { type: "mcq", marks: 1, q: M`A coin is tossed 3 times. The number of possible outcomes is`, opts: ["3", "6", "8", "9"], ans: 2, why: M`$2^3$.` },
    { type: "struct", marks: 2, q: M`A bag has 6 red and 4 yellow balls. One is taken at random. Find P(yellow).`, ms: M`<b>M1</b> 4/10<br><b>A1</b> 2/5` },
    { type: "struct", marks: 3, q: M`A spinner has probability 0.25 of landing on blue. It is spun 240 times. Find the expected number of blues.`, ms: M`<b>M1</b> $0.25\times240$<br><b>A1</b> 60` },
    { type: "struct", marks: 4, q: M`A bag has 3 red and 5 blue counters. Two are drawn without replacement. Find P(both the same colour).`, ms: M`<b>M1</b> P(RR) $=\tfrac38\times\tfrac27$<br><b>M1</b> P(BB) $=\tfrac58\times\tfrac47$<br><b>A1</b> $\tfrac{6}{56}+\tfrac{20}{56}$<br><b>A1</b> $\tfrac{26}{56}=\tfrac{13}{28}$` },
    { type: "struct", marks: 3, q: M`P(Maria wins a game) = 0.6, independently each time. She plays twice. Find P(she wins at least once).`, ms: M`<b>M1</b> P(no wins) $=0.4\times0.4=0.16$<br><b>A1</b> $1-0.16$<br><b>A1</b> 0.84` },
    { type: "struct", marks: 3, q: M`In a group of 40, 25 like tea, 20 like coffee, 10 like both. Find P(a randomly chosen person likes tea only).`, ms: M`<b>M1</b> tea only $=25-10=15$<br><b>A1</b> $\tfrac{15}{40}$<br><b>A1</b> $=\tfrac38$` }
  ],
  exam: [
    { d: 1, type: "struct", marks: 1, q: M`A letter is picked at random from the word MATHS. Find P(it is a vowel).`, ms: M`<b>B1</b> 1/5` },
    { d: 1, type: "struct", marks: 2, q: M`P(a train is late) = 0.15. Find P(it is on time).`, ms: M`<b>M1</b> $1-0.15$<br><b>A1</b> 0.85` },
    { d: 1, type: "mcq", marks: 1, q: M`Rolling a die and tossing a coin are`, opts: ["mutually exclusive", "independent", "the same event", "impossible"], ans: 1, why: M`Independent.` },
    { d: 1, type: "struct", marks: 2, q: M`A spinner lands on red with probability 0.2. It is spun 50 times. Find the expected number of reds.`, ms: M`<b>M1</b> $0.2\times50$<br><b>A1</b> 10` },
    { d: 2, type: "struct", marks: 3, q: M`A bag has 7 green and 3 orange balls. Two are drawn with replacement. Find P(both green).`, ms: M`<b>M1</b> $\tfrac{7}{10}\times\tfrac{7}{10}$<br><b>A1</b> $\tfrac{49}{100}$` },
    { d: 2, type: "struct", marks: 3, q: M`A bag has 7 green and 3 orange balls. Two are drawn without replacement. Find P(both green).`, ms: M`<b>M1</b> $\tfrac{7}{10}\times\tfrac{6}{9}$<br><b>A1</b> $\tfrac{42}{90}=\tfrac{7}{15}$` },
    { d: 2, type: "struct", marks: 3, q: M`Events A and B are mutually exclusive, with P(A) = 0.35 and P(A or B) = 0.6. Find P(B).`, ms: M`<b>M1</b> $0.6-0.35$<br><b>A1</b> 0.25` },
    { d: 2, type: "struct", marks: 3, q: M`A die is rolled twice. Find P(the sum of the two scores is 8).`, ms: M`<b>M1</b> lists the pairs: (2,6)(3,5)(4,4)(5,3)(6,2)<br><b>A1</b> 5 outcomes out of 36<br><b>A1</b> $\tfrac{5}{36}$` },
    { d: 3, type: "struct", marks: 4, q: M`A box has 5 black and 4 white pens. Two pens are taken without replacement. Find P(at least one black pen).`, ms: M`<b>M1</b> P(no black) = P(both white) $=\tfrac49\times\tfrac38$<br><b>M1</b> $=\tfrac{12}{72}=\tfrac16$<br><b>A1</b> $1-\tfrac16$<br><b>A1</b> $\tfrac56$` },
    { d: 3, type: "struct", marks: 4, q: M`In a survey, P(likes football) = 0.6, P(likes tennis) = 0.5, and P(likes both) = 0.3. Find P(likes football given that they like tennis).`, ms: M`<b>M1</b> $P(F\cap T)=0.3$<br><b>M1</b> $P(F\mid T)=\dfrac{P(F\cap T)}{P(T)}$<br><b>A1</b> $=\dfrac{0.3}{0.5}$<br><b>A1</b> $=0.6$` },
    { d: 3, type: "struct", marks: 5, q: M`A bag contains 6 red and $n$ blue counters. Two counters are drawn at random without replacement. Given that $P(\text{both red})=\dfrac13$, form an equation in $n$ and solve it to find $n$.`, ms: M`<b>M1</b> total counters $=6+n$<br><b>M1</b> $\dfrac{6}{6+n}\times\dfrac{5}{5+n}=\dfrac13$<br><b>M1</b> $90=(6+n)(5+n)$<br><b>M1</b> $n^2+11n-60=0\Rightarrow(n-4)(n+15)=0$<br><b>A1</b> $n=4$ (rejecting the negative solution)` }
  ]
});
}
