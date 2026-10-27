// Maths animations (extends VIZ) and interactive labs (extends DEMOS).
(() => {
  const { mount, text, arrow, dot, alpha, seg, cs, clamp, ease } = VIZ._lib;
  const { setup, readout, loop, css } = DEMOS._lib;
  const V = VIZ;
  const factor = (n) => { const f = []; let d = 2; while (n > 1 && d * d <= n) { while (n % d === 0) { f.push(d); n /= d; } d++; } if (n > 1) f.push(n); return f; };
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const sup = (k) => String(k).split("").map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d] || d).join("");

  // ---------- Factor tree growing ----------
  V.factorTree = (host) => mount(host, (ctx, W, H, t, P) => {
    const N = 360, k = clamp(t / (P * .7)); let n = N, x = W * .3, y = 40, steps = [];
    while (n > 1) { const f = factor(n)[0]; if (f === n) { steps.push([x, y, n, null]); break; } steps.push([x, y, n, f]); n /= f; x += 46; y += 46; }
    const shown = Math.floor(k * steps.length * 1.05);
    steps.forEach(([x, y, n, f], i) => { if (i > shown) return;
      dot(ctx, x, y, 17, f ? cs("--surface") || "#fff" : cs("--maths")); ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, 17, 0, 7); ctx.stroke(); text(ctx, String(n), x, y + 5, { size: 13, align: "center", weight: 700, color: f ? cs("--ink") : "#fff" });
      if (f && i < shown) { ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 8, y + 14); ctx.lineTo(x - 36, y + 34); ctx.moveTo(x + 8, y + 14); ctx.lineTo(x + 36, y + 34); ctx.stroke(); dot(ctx, x - 46, y + 46, 15, cs("--maths")); text(ctx, String(f), x - 46, y + 51, { size: 13, align: "center", weight: 700, color: "#fff" }); } });
    if (k > .99) { const f = factor(N), g = {}; f.forEach(p => g[p] = (g[p] || 0) + 1); text(ctx, "360 = " + f.join(" × "), W * .62, 80, { size: 15, weight: 600 }); text(ctx, "= " + Object.entries(g).map(([p, e]) => p + (e > 1 ? sup(e) : "")).join(" × "), W * .62, 108, { size: 18, weight: 700, color: cs("--maths") }); text(ctx, "circled = prime factors", W * .62, 140, { size: 12, color: cs("--muted") }); }
  }, { h: 330, period: 8, caption: "A factor tree: keep splitting until every branch ends in a prime" });

  // ---------- Interactive: HCF and LCM via Venn diagram ----------
  DEMOS.hcflcm = (root, col) => {
    const { ctx, size, W, H } = setup(root, 260);
    const v = DEMOS._lib.controls(root, [{ key: "a", label: "first number", min: 2, max: 200, step: 1, value: 84 }, { key: "b", label: "second number", min: 2, max: 200, step: 1, value: 120 }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(), a = Math.round(v.a), b = Math.round(v.b); ctx.clearRect(0, 0, w, h);
      const fa = factor(a), fb = factor(b), common = [], ra = [...fa], rb = [...fb];
      for (const p of fa) { const j = rb.indexOf(p); if (j >= 0) { common.push(p); rb.splice(j, 1); ra.splice(ra.indexOf(p), 1); } }
      const cx = w / 2, cy = h / 2 + 6, r = Math.min(110, h * .42), off = r * .62;
      ctx.lineWidth = 2.5; ctx.strokeStyle = css("--maths"); ctx.fillStyle = css("--maths") + "18"; ctx.beginPath(); ctx.arc(cx - off, cy, r, 0, 7); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = css("--physics"); ctx.fillStyle = css("--physics") + "18"; ctx.beginPath(); ctx.arc(cx + off, cy, r, 0, 7); ctx.fill(); ctx.stroke();
      text(ctx, String(a), cx - off - r * .6, cy - r - 6, { size: 15, weight: 700, color: css("--maths") }); text(ctx, String(b), cx + off + r * .6, cy - r - 6, { size: 15, weight: 700, color: css("--physics"), align: "right" });
      const place = (arr, x0, wd) => arr.forEach((p, i) => { const per = Math.max(1, Math.ceil(Math.sqrt(arr.length))), row = Math.floor(i / per), c = i % per; text(ctx, String(p), x0 - wd / 2 + (c + .5) * wd / per, cy - 20 + row * 24 - (Math.ceil(arr.length / per) - 1) * 10, { size: 16, align: "center", weight: 700 }); });
      place(ra, cx - off - r * .45, r * .7); place(common, cx, r * .6); place(rb, cx + off + r * .45, r * .7);
      const hcf = common.reduce((x, y) => x * y, 1), lcm = a * b / gcd(a, b);
      const msg = `${a} = ${fa.join(" × ")}; ${b} = ${fb.join(" × ")}. <b>HCF</b> = product of the overlap = ${common.length ? common.join(" × ") + " = " : ""}<b>${hcf}</b>. <b>LCM</b> = product of everything in the diagram = <b>${lcm}</b>. Check: HCF × LCM = ${hcf * lcm} = ${a} × ${b}.`;
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Ratio sharing with a bar model ----------
  V.ratioBar = (host) => mount(host, (ctx, W, H, t, P) => {
    const parts = [3, 5], total = 640, n = 8, k = seg(t, .5, 3), k2 = seg(t, 3.5, 5.5), k3 = seg(t, 6, 7.5), bw = Math.min(64, (W - 80) / n), x0 = (W - n * bw) / 2, y = 90;
    text(ctx, "Share $640 in the ratio 3 : 5", W / 2, 30, { size: 15, align: "center", weight: 700 });
    for (let i = 0; i < n; i++) { const A = i < 3, x = x0 + i * bw; ctx.globalAlpha = k; ctx.fillStyle = A ? cs("--maths") + "55" : cs("--physics") + "55"; ctx.fillRect(x + 2, y, bw - 4, 46); ctx.strokeStyle = A ? cs("--maths") : cs("--physics"); ctx.lineWidth = 2; ctx.strokeRect(x + 2, y, bw - 4, 46); ctx.globalAlpha = 1;
      if (k2 > .1) alpha(ctx, k2, () => text(ctx, "$80", x + bw / 2, y + 29, { size: 13, align: "center", weight: 700 })); }
    alpha(ctx, k, () => { text(ctx, "3 parts", x0 + 1.5 * bw, y - 10, { size: 12, align: "center", color: cs("--maths"), weight: 600 }); text(ctx, "5 parts", x0 + 5.5 * bw, y - 10, { size: 12, align: "center", color: cs("--physics"), weight: 600 }); });
    alpha(ctx, k2, () => text(ctx, "8 parts in total → one part = 640 ÷ 8 = $80", W / 2, y + 80, { size: 13, align: "center" }));
    alpha(ctx, k3, () => { text(ctx, "3 × 80 = $240", x0 + 1.5 * bw, y + 120, { size: 15, align: "center", weight: 700, color: cs("--maths") }); text(ctx, "5 × 80 = $400", x0 + 5.5 * bw, y + 120, { size: 15, align: "center", weight: 700, color: cs("--physics") }); });
  }, { h: 250, period: 9, caption: "Ratio problems become easy with a bar model: find the value of one part first" });

  // ---------- Interactive: simple vs compound interest / depreciation ----------
  DEMOS.interest = (root, col) => {
    const { ctx, size, W, H } = setup(root, 280);
    const v = DEMOS._lib.controls(root, [{ key: "P", label: "starting amount ($)", min: 100, max: 5000, step: 100, value: 1000 }, { key: "r", label: "rate per year (%) — negative = depreciation", min: -30, max: 20, step: 0.5, value: 5 }, { key: "n", label: "years", min: 1, max: 30, step: 1, value: 10 }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(), P0 = v.P, r = v.r, n = Math.round(v.n); ctx.clearRect(0, 0, w, h);
      const comp = (y) => P0 * Math.pow(1 + r / 100, y), simp = (y) => P0 * (1 + r * y / 100);
      const ys = []; for (let y = 0; y <= n; y++) ys.push(comp(y), simp(y)); const top = Math.max(...ys) * 1.1, bot = Math.min(0, ...ys);
      const gx = 50, gw = w - 70, gy = 20, gh = h - 50, X = (y) => gx + y / n * gw, Y = (m) => gy + gh - (m - bot) / (top - bot) * gh;
      ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
      text(ctx, "years", gx + gw, gy + gh + 18, { size: 12, align: "right", color: css("--muted") }); text(ctx, "$" + Math.round(top), gx - 6, gy + 10, { size: 11, align: "right", color: css("--muted") }); text(ctx, "$" + Math.round(bot), gx - 6, gy + gh, { size: 11, align: "right", color: css("--muted") });
      const bw = gw / (n + 1) * .7;
      for (let y = 0; y <= n; y++) { ctx.fillStyle = col + "55"; const yy = Y(comp(y)); ctx.fillRect(X(y) - bw / 2 + (y === 0 ? bw / 2 : 0) - (y === n ? bw / 2 : 0), yy, bw, gy + gh - yy); }
      ctx.strokeStyle = css("--bad"); ctx.lineWidth = 2.5; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(X(0), Y(simp(0))); ctx.lineTo(X(n), Y(simp(n))); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, "■ compound", gx + 10, gy + 14, { size: 12, color: col, weight: 700 }); text(ctx, "--- simple", gx + 110, gy + 14, { size: 12, color: css("--bad"), weight: 700 });
      const C = comp(n), S = simp(n), m = 1 + r / 100;
      const msg = `<b>Compound:</b> $${P0} × ${m.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}${sup(n)} = <b>$${C.toFixed(2)}</b>. <b>Simple:</b> $${P0} + ${n} × $${(P0 * r / 100).toFixed(2)} = <b>$${S.toFixed(2)}</b>. ${r > 0 ? "Compound grows faster because each year's interest also earns interest." : r < 0 ? "Depreciation: the multiplier is less than 1, so the value falls by a smaller amount each year and never reaches zero." : ""}`;
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Standard form: the decimal point slides ----------
  V.standardForm = (host) => mount(host, (ctx, W, H, t, P) => {
    const ex = [["3 450 000", "3.45", 6], ["0.000 072", "7.2", -5]], which = t < P / 2 ? 0 : 1, lt = which ? t - P / 2 : t, [num, a, n] = ex[which];
    const digits = which ? "0000072" : "3450000", k = seg(lt, .8, 3), steps = Math.abs(n), cw = 34, x0 = W / 2 - digits.length * cw / 2, y = 100;
    for (let i = 0; i < digits.length; i++) { ctx.fillStyle = cs("--maths") + "18"; ctx.fillRect(x0 + i * cw + 2, y - 30, cw - 4, 42); text(ctx, digits[i], x0 + i * cw + cw / 2, y, { size: 24, align: "center", weight: 700 }); }
    const startPos = which ? 1 : 7, endPos = which ? 6 : 1, pos = startPos + (endPos - startPos) * k, px = x0 + pos * cw;
    dot(ctx, px, y + 4, 5, cs("--bad"));
    const jumps = Math.round(Math.abs(pos - startPos)); for (let j = 0; j < jumps; j++) { const a1 = x0 + (startPos + Math.sign(endPos - startPos) * j) * cw, a2 = a1 + Math.sign(endPos - startPos) * cw; ctx.strokeStyle = cs("--bad"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(a1, y + 18); ctx.quadraticCurveTo((a1 + a2) / 2, y + 40, a2, y + 18); ctx.stroke(); }
    text(ctx, num, W / 2, 40, { size: 16, align: "center", weight: 600 });
    text(ctx, `decimal point moves ${jumps} place${jumps === 1 ? "" : "s"} ${which ? "right" : "left"}`, W / 2, y + 66, { size: 13, align: "center", color: cs("--bad") });
    if (k > .99) text(ctx, `= ${a} × 10${sup(n).replace("-", "⁻")}`, W / 2, y + 110, { size: 24, align: "center", weight: 700, color: cs("--maths") });
    if (k > .99) text(ctx, which ? "small number → negative power" : "large number → positive power", W / 2, y + 138, { size: 12, align: "center", color: cs("--muted") });
  }, { h: 270, period: 9, caption: "Standard form: write the number as A × 10ⁿ with 1 ≤ A < 10" });

  // ---------- Index laws as repeated multiplication ----------
  V.indexLaws = (host) => mount(host, (ctx, W, H, t, P) => {
    const k = seg(t, .5, 2.5), k2 = seg(t, 3.5, 5.5), bw = Math.min(40, (W - 60) / 9), y = 60;
    const row = (n, x, c, lab) => { for (let i = 0; i < n; i++) { ctx.fillStyle = c + "44"; ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.fillRect(x + i * bw, y, bw - 4, bw - 4); ctx.strokeRect(x + i * bw, y, bw - 4, bw - 4); text(ctx, "a", x + i * bw + bw / 2 - 2, y + bw / 2 + 3, { size: 14, align: "center", weight: 700 }); } };
    const x0 = (W - 9 * bw) / 2, gap = 24 * (1 - k);
    row(3, x0 - gap, cs("--maths")); row(4, x0 + 3 * bw + bw + gap - bw * k, cs("--physics"));
    text(ctx, k < .5 ? "a³ × a⁴" : "a³ × a⁴ = a⁷", W / 2, 34, { size: 18, align: "center", weight: 700 });
    text(ctx, "multiply → ADD the powers: 3 + 4 = 7", W / 2, y + bw + 26, { size: 13, align: "center", color: cs("--muted") });
    // division
    const y2 = y + bw + 70; for (let i = 0; i < 6; i++) { const cancel = i < 2 && k2 > .5; ctx.globalAlpha = cancel ? .25 : 1; ctx.fillStyle = cs("--chem") + "44"; ctx.strokeStyle = cs("--chem"); ctx.fillRect(x0 + i * bw, y2, bw - 4, bw - 4); ctx.strokeRect(x0 + i * bw, y2, bw - 4, bw - 4); text(ctx, "a", x0 + i * bw + bw / 2 - 2, y2 + bw / 2 + 3, { size: 14, align: "center", weight: 700 }); ctx.globalAlpha = 1; }
    for (let i = 0; i < 2; i++) { ctx.globalAlpha = k2 > .5 ? .25 : 1; ctx.strokeStyle = cs("--bad"); ctx.strokeRect(x0 + i * bw, y2 + bw + 8, bw - 4, bw - 4); text(ctx, "a", x0 + i * bw + bw / 2 - 2, y2 + bw + 8 + bw / 2 + 3, { size: 14, align: "center", weight: 700 }); ctx.globalAlpha = 1; if (k2 > .5) { ctx.strokeStyle = cs("--bad"); ctx.beginPath(); ctx.moveTo(x0 + i * bw, y2 + 2 * bw + 4); ctx.lineTo(x0 + i * bw + bw - 4, y2); ctx.stroke(); } }
    ctx.strokeStyle = cs("--ink"); ctx.beginPath(); ctx.moveTo(x0 - 6, y2 + bw + 2); ctx.lineTo(x0 + 6 * bw + 2, y2 + bw + 2); ctx.stroke();
    text(ctx, "a⁶ ÷ a²" + (k2 > .5 ? " = a⁴" : ""), x0 + 6 * bw + 20, y2 + bw + 6, { size: 15, weight: 700 }); if (k2 > .5) text(ctx, "divide → SUBTRACT the powers: 6 − 2 = 4", W / 2, y2 + 2 * bw + 34, { size: 13, align: "center", color: cs("--muted") });
  }, { h: 330, period: 7, caption: "Index laws come straight from counting the a's" });

  // ---------- Bounds on a number line ----------
  V.bounds = (host) => mount(host, (ctx, W, H, t, P) => {
    const k = seg(t, .5, 2.5), x0 = 40, x1 = W - 40, y = 120, lo = 6.5, hi = 9.5, X = (v) => x0 + (v - lo) / (hi - lo) * (x1 - x0);
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    for (let i = 0; i <= 30; i++) { const v = lo + i * .1, big = i % 5 === 0; ctx.beginPath(); ctx.moveTo(X(v), y - (big ? 10 : 5)); ctx.lineTo(X(v), y + (big ? 10 : 5)); ctx.stroke(); if (big) text(ctx, v.toFixed(1), X(v), y + 28, { size: 12, align: "center" }); }
    const a = 8 - .5 * k, b = 8 + .5 * k;
    ctx.fillStyle = cs("--maths") + "33"; ctx.fillRect(X(a), y - 30, X(b) - X(a), 22); dot(ctx, X(8), y, 6, cs("--maths"));
    if (k > .95) { ctx.fillStyle = cs("--maths"); ctx.beginPath(); ctx.arc(X(7.5), y - 19, 6, 0, 7); ctx.fill(); ctx.strokeStyle = cs("--maths"); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X(8.5), y - 19, 6, 0, 7); ctx.stroke(); text(ctx, "7.5 ≤ x < 8.5", W / 2, y - 48, { size: 18, align: "center", weight: 700, color: cs("--maths") }); text(ctx, "lower bound 7.5 (included)", X(7.5), y + 56, { size: 12, align: "center" }); text(ctx, "upper bound 8.5 (not included)", X(8.5), y + 74, { size: 12, align: "center" }); }
    text(ctx, "A length is 8 cm, correct to the nearest cm. Every value that rounds to 8 lies in:", W / 2, 26, { size: 13, align: "center", weight: 600 });
  }, { h: 230, period: 6, caption: "Bounds: half the degree of accuracy either side of the rounded value" });

  // ---------- Interactive: bounds calculator ----------
  DEMOS.bounds = (root, col) => {
    const { ctx, size, W, H } = setup(root, 220);
    const v = DEMOS._lib.controls(root, [{ key: "a", label: "length a (rounded)", min: 1, max: 20, step: 0.1, value: 8.4 }, { key: "b", label: "width b (rounded)", min: 1, max: 20, step: 0.1, value: 3.2 }, { key: "acc", label: "accuracy (1 = nearest unit, 0.1 = 1 d.p.)", min: 0, max: 2, step: 1, value: 1, fmt: x => ["1", "0.1", "0.01"][x] }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(), acc = [1, .1, .01][Math.round(v.acc)], dp = Math.round(v.acc); ctx.clearRect(0, 0, w, h);
      const r = (x) => Math.round(x / acc) * acc, a = r(v.a), b = r(v.b), aL = a - acc / 2, aU = a + acc / 2, bL = b - acc / 2, bU = b + acc / 2;
      const sc = Math.min((w - 120) / aU, (h - 50) / bU), x0 = 40, y0 = 20;
      ctx.fillStyle = col + "18"; ctx.fillRect(x0, y0, aU * sc, bU * sc); ctx.strokeStyle = col; ctx.setLineDash([4, 4]); ctx.strokeRect(x0, y0, aU * sc, bU * sc); ctx.setLineDash([]);
      ctx.fillStyle = col + "44"; ctx.fillRect(x0, y0, aL * sc, bL * sc); ctx.lineWidth = 2; ctx.strokeRect(x0, y0, aL * sc, bL * sc);
      text(ctx, "inner = lower bounds", x0 + 6, y0 + 16, { size: 11, color: col, weight: 600 }); text(ctx, "outer = upper bounds", x0 + aU * sc + 6, y0 + bU * sc, { size: 11, color: col, weight: 600 });
      const f = (x) => +x.toFixed(dp + 2);
      const msg = `a = ${a.toFixed(dp)}: <b>${f(aL)} ≤ a < ${f(aU)}</b>. b = ${b.toFixed(dp)}: <b>${f(bL)} ≤ b < ${f(bU)}</b>.<br>Area: lower bound = ${f(aL)} × ${f(bL)} = <b>${(aL * bL).toFixed(4).replace(/0+$/, "")}</b>; upper bound = ${f(aU)} × ${f(bU)} = <b>${(aU * bU).toFixed(4).replace(/0+$/, "")}</b>.<br>a − b: lower = aL − bU = <b>${f(aL - bU)}</b>; upper = aU − bL = <b>${f(aU - bL)}</b>. a ÷ b: lower = aL ÷ bU = <b>${(aL / bU).toFixed(4)}</b>; upper = aU ÷ bL = <b>${(aU / bL).toFixed(4)}</b>.`;
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Expanding brackets with an area model ----------
  V.expandGrid = (host) => mount(host, (ctx, W, H, t, P) => {
    const k1 = seg(t, .4, 1.6), k2 = seg(t, 2, 3.2), k3 = seg(t, 3.6, 4.8), k4 = seg(t, 5.4, 6.6);
    const u = Math.min(28, (W - 260) / 8), X0 = 70, Y0 = 50, xw = 4 * u, aw = 3 * u, xh = 4 * u, bh = 2 * u;
    const cell = (x, y, w, h, c, lab, a) => alpha(ctx, a, () => { ctx.fillStyle = c + "33"; ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.fillRect(x, y, w, h); ctx.strokeRect(x, y, w, h); text(ctx, lab, x + w / 2, y + h / 2 + 6, { size: 17, align: "center", weight: 700 }); });
    text(ctx, "x", X0 + xw / 2, Y0 - 12, { size: 16, align: "center", weight: 700, color: cs("--maths") }); text(ctx, "+3", X0 + xw + aw / 2, Y0 - 12, { size: 16, align: "center", weight: 700, color: cs("--maths") });
    text(ctx, "x", X0 - 14, Y0 + xh / 2 + 6, { size: 16, align: "center", weight: 700, color: cs("--physics") }); text(ctx, "+2", X0 - 18, Y0 + xh + bh / 2 + 6, { size: 16, align: "center", weight: 700, color: cs("--physics") });
    cell(X0, Y0, xw, xh, cs("--maths"), "x²", k1); cell(X0 + xw, Y0, aw, xh, cs("--chem"), "3x", k2); cell(X0, Y0 + xh, xw, bh, cs("--chem"), "2x", k3); cell(X0 + xw, Y0 + xh, aw, bh, cs("--physics"), "6", k4);
    const tx = X0 + xw + aw + 40; text(ctx, "(x + 3)(x + 2)", tx, Y0 + 20, { size: 18, weight: 700 });
    alpha(ctx, k4, () => { text(ctx, "= x² + 3x + 2x + 6", tx, Y0 + 56, { size: 17 }); text(ctx, "= x² + 5x + 6", tx, Y0 + 92, { size: 20, weight: 700, color: cs("--maths") }); text(ctx, "area of the whole rectangle", tx, Y0 + 120, { size: 12, color: cs("--muted") }); text(ctx, "= sum of the four parts", tx, Y0 + 138, { size: 12, color: cs("--muted") }); });
  }, { h: 260, period: 9, caption: "Each term in the first bracket multiplies each term in the second: four rectangles, one area" });

  // ---------- Solving an equation on a balance ----------
  V.balance = (host) => mount(host, (ctx, W, H, t, P) => {
    const steps = [["3x + 5 = 20", "start", 3, 5, 20], ["3x = 15", "subtract 5 from both sides", 3, 0, 15], ["x = 5", "divide both sides by 3", 1, 0, 5]];
    const i = Math.min(2, Math.floor(t / (P / 3))), [eq, why, nx, c, r] = steps[i], cx = W / 2, by = 170, tilt = 0;
    ctx.fillStyle = cs("--muted"); ctx.beginPath(); ctx.moveTo(cx - 20, by + 60); ctx.lineTo(cx + 20, by + 60); ctx.lineTo(cx, by); ctx.fill();
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - W * .38, by); ctx.lineTo(cx + W * .38, by); ctx.stroke();
    const L = cx - W * .2, R = cx + W * .2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(L - 80, by - 4); ctx.lineTo(L + 80, by - 4); ctx.moveTo(R - 80, by - 4); ctx.lineTo(R + 80, by - 4); ctx.stroke();
    // left: nx bags labelled x, c unit cubes
    for (let j = 0; j < nx; j++) { const x = L - 70 + j * 44; ctx.fillStyle = cs("--maths") + "44"; ctx.strokeStyle = cs("--maths"); ctx.beginPath(); ctx.roundRect(x, by - 46, 38, 40, 8); ctx.fill(); ctx.stroke(); text(ctx, "x", x + 19, by - 20, { size: 16, align: "center", weight: 700, color: cs("--maths") }); }
    for (let j = 0; j < c; j++) { ctx.fillStyle = cs("--chem") + "66"; ctx.fillRect(L + 4 + (j % 3) * 18, by - 22 - Math.floor(j / 3) * 18, 15, 15); }
    for (let j = 0; j < r; j++) { ctx.fillStyle = cs("--chem") + "66"; ctx.fillRect(R - 70 + (j % 8) * 18, by - 22 - Math.floor(j / 8) * 18, 15, 15); }
    text(ctx, eq, cx, 34, { size: 22, align: "center", weight: 700 }); text(ctx, why, cx, 60, { size: 13, align: "center", color: cs("--bad"), weight: 600 });
    text(ctx, "Whatever you do to one side, do to the other: the scales stay balanced", cx, H - 12, { size: 12, align: "center", color: cs("--muted") });
  }, { h: 270, period: 9, caption: "Solving an equation keeps both sides balanced" });

  // ---------- Interactive: simultaneous equations graphically ----------
  DEMOS.simul = (root, col) => {
    const { ctx, size, W, H } = setup(root, 320);
    const v = DEMOS._lib.controls(root, [{ key: "m1", label: "line 1 gradient", min: -4, max: 4, step: .5, value: 2 }, { key: "c1", label: "line 1 intercept", min: -6, max: 6, step: 1, value: -1 }, { key: "m2", label: "line 2 gradient", min: -4, max: 4, step: .5, value: -1 }, { key: "c2", label: "line 2 intercept", min: -6, max: 6, step: 1, value: 5 }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h);
      const s = Math.min(w, h) / 18, ox = w / 2, oy = h / 2, X = x => ox + x * s, Y = y => oy - y * s;
      ctx.strokeStyle = css("--line"); ctx.lineWidth = 1; for (let i = -12; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(X(i), 0); ctx.lineTo(X(i), h); ctx.moveTo(0, Y(i)); ctx.lineTo(w, Y(i)); ctx.stroke(); }
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, h); ctx.stroke();
      const line = (m, c, colr) => { ctx.strokeStyle = colr; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(-20), Y(m * -20 + c)); ctx.lineTo(X(20), Y(m * 20 + c)); ctx.stroke(); };
      line(v.m1, v.c1, css("--maths")); line(v.m2, v.c2, css("--physics"));
      const f = n => (Math.round(n * 100) / 100).toString().replace("-", "−"), g = m => m === 1 ? "" : m === -1 ? "−" : f(m), eq1 = `y = ${g(v.m1)}x ${v.c1 < 0 ? "− " + f(-v.c1) : "+ " + f(v.c1)}`, eq2 = `y = ${g(v.m2)}x ${v.c2 < 0 ? "− " + f(-v.c2) : "+ " + f(v.c2)}`;
      let msg;
      if (v.m1 === v.m2) msg = `${eq1} and ${eq2} have the same gradient: the lines are <b>parallel</b>${v.c1 === v.c2 ? " (in fact identical: infinitely many solutions)" : ", so there is <b>no solution</b>"}.`;
      else { const x = (v.c2 - v.c1) / (v.m1 - v.m2), y = v.m1 * x + v.c1; dot(ctx, X(x), Y(y), 7, css("--bad")); text(ctx, `(${f(x)}, ${f(y)})`, X(x) + 10, Y(y) - 10, { size: 13, weight: 700, color: css("--bad") });
        msg = `<span style="color:var(--maths)">${eq1}</span> and <span style="color:var(--physics)">${eq2}</span> cross at <b>(${f(x)}, ${f(y)})</b>, so the solution is x = ${f(x)}, y = ${f(y)}. Algebraically: ${f(v.m1)}x ${v.c1 < 0 ? "−" : "+"} ${f(Math.abs(v.c1))} = ${f(v.m2)}x ${v.c2 < 0 ? "−" : "+"} ${f(Math.abs(v.c2))}, so ${f(v.m1 - v.m2)}x = ${f(v.c2 - v.c1)}.`; }
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Matchstick pattern grows: 4, 7, 10, ... ----------
  V.patternGrow = (host) => mount(host, (ctx, W, H, t, P) => {
    const n = Math.min(5, 1 + Math.floor(t / (P / 5.5))), s = Math.min(46, (W - 200) / 15), y0 = 60;
    let x = 30;
    for (let k = 1; k <= n; k++) { const isNew = k === n;
      for (let i = 0; i < k; i++) { const xx = x + i * s; ctx.strokeStyle = isNew && i === k - 1 && k > 1 ? cs("--bad") : cs("--maths"); ctx.lineWidth = 4; ctx.lineCap = "round"; ctx.beginPath(); if (i === 0) { ctx.moveTo(xx, y0); ctx.lineTo(xx, y0 + s); } ctx.moveTo(xx, y0); ctx.lineTo(xx + s, y0); ctx.moveTo(xx + s, y0); ctx.lineTo(xx + s, y0 + s); ctx.moveTo(xx, y0 + s); ctx.lineTo(xx + s, y0 + s); ctx.stroke(); }
      text(ctx, String(3 * k + 1), x + k * s / 2, y0 + s + 26, { size: 15, align: "center", weight: 700 }); text(ctx, "n = " + k, x + k * s / 2, y0 - 12, { size: 12, align: "center", color: cs("--muted") });
      x += k * s + 30; if (x > W - 60) break; }
    text(ctx, "4, 7, 10, 13, 16 …   each new square adds 3 sticks (red)", 30, H - 52, { size: 14, weight: 600 });
    text(ctx, "nth term = 3n + 1   (3 × n, plus the 1 starting stick)", 30, H - 26, { size: 15, weight: 700, color: cs("--maths") });
  }, { h: 230, period: 8, caption: "A linear sequence: the common difference becomes the coefficient of n" });

  // ---------- Interactive: sequence explorer ----------
  DEMOS.sequence = (root, col) => {
    const { ctx, size, W, H } = setup(root, 240);
    const types = ["linear an + b", "quadratic an² + bn + c", "geometric a × rⁿ⁻¹", "cubic an³ + b"]; let ty = 0;
    const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px"; segEl.innerHTML = types.map((n, i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const b = e.target.closest("button"); if (!b) return; ty = +b.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(segEl);
    const v = DEMOS._lib.controls(root, [{ key: "a", label: "a", min: -5, max: 5, step: 1, value: 3 }, { key: "b", label: "b", min: -10, max: 10, step: 1, value: 2 }, { key: "c", label: "c (quadratic) / r (geometric)", min: -3, max: 6, step: 1, value: 2 }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h);
      const a = v.a, b = v.b, c = v.c, T = n => ty === 0 ? a * n + b : ty === 1 ? a * n * n + b * n + c : ty === 2 ? a * Math.pow(c, n - 1) : a * n ** 3 + b;
      const terms = [1, 2, 3, 4, 5, 6].map(T), cw = (w - 40) / 6;
      terms.forEach((x, i) => { ctx.fillStyle = col + "22"; ctx.fillRect(20 + i * cw + 4, 20, cw - 8, 44); text(ctx, String(+x.toFixed(3)), 20 + i * cw + cw / 2, 49, { size: 17, align: "center", weight: 700 }); text(ctx, "n = " + (i + 1), 20 + i * cw + cw / 2, 82, { size: 11, align: "center", color: css("--muted") }); });
      const d1 = terms.slice(1).map((x, i) => x - terms[i]), d2 = d1.slice(1).map((x, i) => x - d1[i]), d3 = d2.slice(1).map((x, i) => x - d2[i]);
      const row = (arr, y, lab, off) => { text(ctx, lab, 14, y, { size: 11, color: css("--muted") }); arr.forEach((x, i) => text(ctx, String(+x.toFixed(3)), 20 + (i + off) * cw + cw / 2, y, { size: 13, align: "center", color: css("--bad"), weight: 600 })); };
      if (ty !== 2) { row(d1, 112, "1st diff", .5); if (ty !== 0) row(d2, 140, "2nd diff", 1); if (ty === 3) row(d3, 168, "3rd diff", 1.5); }
      else { const ratios = terms.slice(1).map((x, i) => terms[i] ? x / terms[i] : NaN); row(ratios, 112, "ratio", .5); }
      const sgn = (k, s) => k === 0 ? "" : (k < 0 ? " − " : " + ") + (Math.abs(k) === 1 && s ? "" : Math.abs(k)) + s;
      const nth = ty === 0 ? `${a === 0 ? "" : a === 1 ? "n" : a === -1 ? "−n" : a + "n"}${sgn(b, "")}` : ty === 1 ? `${a}n²${sgn(b, "n")}${sgn(c, "")}` : ty === 2 ? `${a} × ${c}ⁿ⁻¹` : `${a}n³${sgn(b, "")}`;
      const msg = ty === 0 ? `Linear: constant first difference <b>${a}</b>, so the nth term is <b>${nth}</b>. The difference is the coefficient of n; the zero term (n = 0) is ${b}.` : ty === 1 ? `Quadratic: constant <b>second</b> difference ${2 * a}, so the n² coefficient is ${2 * a} ÷ 2 = <b>${a}</b>. nth term <b>${nth}</b>. Subtract ${a}n² from each term to leave a linear sequence.` : ty === 2 ? `Geometric: constant <b>ratio</b> r = ${c}; nth term <b>${nth}</b>. ${Math.abs(c) > 1 ? "Grows exponentially." : ""}` : `Cubic: constant <b>third</b> difference ${6 * a} = 6a, so a = ${a}. nth term <b>${nth}</b>.`;
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Interactive: direct and inverse variation ----------
  DEMOS.variation = (root, col) => {
    const { ctx, size, W, H } = setup(root, 280);
    const T = [["y ∝ x", x => x, "y = kx"], ["y ∝ x²", x => x * x, "y = kx²"], ["y ∝ x³", x => x ** 3, "y = kx³"], ["y ∝ √x", x => Math.sqrt(x), "y = k√x"], ["y ∝ 1/x", x => 1 / x, "y = k/x"], ["y ∝ 1/x²", x => 1 / (x * x), "y = k/x²"]]; let ty = 0;
    const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px"; segEl.innerHTML = T.map(([n], i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const b = e.target.closest("button"); if (!b) return; ty = +b.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(segEl);
    const v = DEMOS._lib.controls(root, [{ key: "k", label: "constant k", min: 0.5, max: 8, step: 0.5, value: 2 }, { key: "x", label: "x", min: 0.5, max: 5, step: 0.5, value: 2 }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h);
      const [nm, f, form] = T[ty], k = v.k, xv = v.x, ymax = Math.max(k * f(5), k * f(0.5), 1) * 1.05, gx = 40, gw = w - 60, gy = 14, gh = h - 40, X = x => gx + x / 5 * gw, Y = y => gy + gh - Math.min(y, ymax) / ymax * gh;
      ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
      ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); const x0 = ty >= 4 ? .2 : 0; for (let x = x0; x <= 5.001; x += .02) { const y = k * f(x); x === x0 ? ctx.moveTo(X(x), Y(y)) : ctx.lineTo(X(x), Y(y)); } ctx.stroke();
      const y1 = k * f(xv), y2 = k * f(xv * 2); dot(ctx, X(xv), Y(y1), 6, css("--bad")); if (xv * 2 <= 5) dot(ctx, X(xv * 2), Y(y2), 6, css("--physics"));
      text(ctx, "x", gx + gw, gy + gh + 16, { size: 12, align: "right", color: css("--muted") }); text(ctx, "y", gx - 8, gy + 10, { size: 12, align: "right", color: css("--muted") });
      const fac = y2 / y1, fs = Math.abs(fac - Math.round(fac)) < 1e-9 ? String(Math.round(fac)) : fac < 1 ? "1/" + (+(1 / fac).toFixed(3)) : (+fac.toFixed(3)).toString();
      const msg = `<b>${nm}</b> means <b>${form}</b>. With k = ${k}: at x = ${xv}, y = <b>${+y1.toFixed(3)}</b>. Doubling x to ${xv * 2} multiplies y by <b>${fs}</b>${ty === 1 ? " (2²)" : ty === 2 ? " (2³)" : ty === 3 ? " (√2)" : ty === 4 ? " (halves)" : ty === 5 ? " (1/2²)" : ""}.`;
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Tangent sliding along a curve; gradient readout ----------
  V.tangentGradient = (host) => mount(host, (ctx, W, H, t, P) => {
    const f = x => .25 * x * x * x - 1.5 * x + 1, df = x => .75 * x * x - 1.5, x0 = -3, x1 = 3, gx = 40, gw = W - 80, gy = 20, gh = H - 60;
    const X = x => gx + (x - x0) / (x1 - x0) * gw, Y = y => gy + gh / 2 - y * gh / 9;
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, Y(0)); ctx.lineTo(gx + gw, Y(0)); ctx.moveTo(X(0), gy); ctx.lineTo(X(0), gy + gh); ctx.stroke();
    ctx.strokeStyle = cs("--maths"); ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= x1; x += .02) x === x0 ? ctx.moveTo(X(x), Y(f(x))) : ctx.lineTo(X(x), Y(f(x))); ctx.stroke();
    const a = -2.6 + 5.2 * (.5 - .5 * Math.cos(t / P * 2 * Math.PI)), m = df(a), L = 1.1;
    ctx.save(); ctx.beginPath(); ctx.rect(gx, gy, gw, gh); ctx.clip(); ctx.strokeStyle = cs("--bad"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(a - L), Y(f(a) - m * L)); ctx.lineTo(X(a + L), Y(f(a) + m * L)); ctx.stroke(); ctx.restore();
    // rise/run triangle
    ctx.setLineDash([4, 4]); ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X(a), Y(f(a))); ctx.lineTo(X(a + 1), Y(f(a))); ctx.lineTo(X(a + 1), Y(f(a) + m)); ctx.stroke(); ctx.setLineDash([]);
    dot(ctx, X(a), Y(f(a)), 6, cs("--bad"));
    text(ctx, `gradient of tangent at x = ${a.toFixed(1)}: ${m.toFixed(2)}`, 16, H - 14, { size: 14, weight: 700, color: Math.abs(m) < .12 ? cs("--good") : cs("--bad") });
    if (Math.abs(m) < .12) text(ctx, "turning point: gradient 0", W - 16, H - 14, { size: 13, align: "right", weight: 700, color: cs("--good") });
  }, { h: 300, period: 12, caption: "The gradient of a curve at a point is the gradient of the tangent there" });

  // ---------- Area under a speed–time graph ----------
  V.speedArea = (host) => mount(host, (ctx, W, H, t, P) => {
    const pts = [[0, 0], [10, 20], [30, 20], [40, 0]], gx = 50, gw = W - 90, gy = 24, gh = H - 70, X = s => gx + s / 40 * gw, Y = v => gy + gh - v / 25 * gh;
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
    text(ctx, "time / s", gx + gw, gy + gh + 30, { size: 12, align: "right", color: cs("--muted") }); text(ctx, "speed / m/s", gx + 6, gy + 4, { size: 12, color: cs("--muted") });
    [10, 20, 30, 40].forEach(s => text(ctx, String(s), X(s), gy + gh + 16, { size: 11, align: "center", color: cs("--muted") })); text(ctx, "20", gx - 8, Y(20) + 4, { size: 11, align: "right", color: cs("--muted") });
    const k = seg(t, .5, 4), fill = [[0, 10, cs("--maths"), "½ × 10 × 20 = 100"], [10, 30, cs("--chem"), "20 × 20 = 400"], [30, 40, cs("--physics"), "½ × 10 × 20 = 100"]];
    fill.forEach(([a, b, c, lab], i) => { const kk = clamp(k * 3 - i); if (kk <= 0) return; alpha(ctx, kk, () => { ctx.fillStyle = c + "44"; ctx.beginPath(); ctx.moveTo(X(a), Y(0)); const va = a === 0 ? 0 : 20, vb = b === 40 ? 0 : 20; ctx.lineTo(X(a), Y(va)); ctx.lineTo(X(b), Y(vb)); ctx.lineTo(X(b), Y(0)); ctx.fill(); text(ctx, lab, X((a + b) / 2), Y(8), { size: 12, align: "center", weight: 700 }); }); });
    ctx.strokeStyle = cs("--maths"); ctx.lineWidth = 3; ctx.beginPath(); pts.forEach(([s, v], i) => i ? ctx.lineTo(X(s), Y(v)) : ctx.moveTo(X(s), Y(v))); ctx.stroke();
    if (k > .99) text(ctx, "total distance = area = 600 m", W / 2, gy + 6, { size: 15, align: "center", weight: 700, color: cs("--maths") });
    text(ctx, "acceleration = gradient = 20 ÷ 10 = 2 m/s²", X(5) - 20, Y(22) - 4, { size: 11, color: cs("--bad") });
  }, { h: 280, period: 8, caption: "On a speed–time graph, gradient = acceleration and area = distance travelled" });

  // ---------- Interactive: function grapher with a line to solve equations ----------
  DEMOS.funcGraph = (root, col) => {
    const { ctx, size, W, H } = setup(root, 330);
    const fam = [["cubic ax³ + bx² + cx + d", (x, p) => p.a * x ** 3 + p.b * x * x + p.c * x + p.d], ["quadratic ax² + bx + c", (x, p) => p.a * x * x + p.b * x + p.c], ["reciprocal a/x + b", (x, p) => p.a / x + p.b], ["exponential a × bˣ", (x, p) => p.a * Math.pow(Math.max(.1, p.b), x)]]; let fi = 0;
    const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px"; segEl.innerHTML = fam.map(([n], i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const b = e.target.closest("button"); if (!b) return; fi = +b.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(segEl);
    const p = DEMOS._lib.controls(root, [{ key: "a", label: "a", min: -3, max: 3, step: .5, value: 1 }, { key: "b", label: "b", min: -4, max: 4, step: .5, value: 0 }, { key: "c", label: "c", min: -6, max: 6, step: 1, value: -4 }, { key: "d", label: "d", min: -6, max: 6, step: 1, value: 0 }, { key: "m", label: "line: gradient m", min: -4, max: 4, step: .5, value: 0 }, { key: "k", label: "line: intercept", min: -8, max: 8, step: 1, value: 1 }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h);
      const f = x => fam[fi][1](x, p), sx = w / 10, sy = h / 20, ox = w / 2, oy = h / 2, X = x => ox + x * sx, Y = y => oy - y * sy;
      ctx.strokeStyle = css("--line"); ctx.lineWidth = 1; for (let i = -5; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(X(i), 0); ctx.lineTo(X(i), h); ctx.stroke(); } for (let j = -10; j <= 10; j += 2) { ctx.beginPath(); ctx.moveTo(0, Y(j)); ctx.lineTo(w, Y(j)); ctx.stroke(); }
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, h); ctx.stroke();
      for (let i = -4; i <= 4; i++) if (i) text(ctx, String(i), X(i), oy + 14, { size: 10, align: "center", color: css("--muted") });
      ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); let pen = false;
      for (let x = -5; x <= 5; x += .01) { const y = f(x); if (!isFinite(y) || Math.abs(y) > 40 || (fi === 2 && Math.abs(x) < .02)) { pen = false; continue; } pen ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); pen = true; } ctx.stroke();
      const g = x => p.m * x + p.k; ctx.strokeStyle = css("--bad"); ctx.lineWidth = 2; ctx.setLineDash([7, 5]); ctx.beginPath(); ctx.moveTo(X(-5), Y(g(-5))); ctx.lineTo(X(5), Y(g(5))); ctx.stroke(); ctx.setLineDash([]);
      const roots = []; let prev = f(-5) - g(-5);
      for (let x = -5 + .005; x <= 5; x += .005) { const cur = f(x) - g(x); if (isFinite(cur) && isFinite(prev) && Math.sign(cur) !== Math.sign(prev) && Math.abs(cur - prev) < 5) { let lo = x - .005, hi = x; for (let it = 0; it < 30; it++) { const mid = (lo + hi) / 2; Math.sign(f(mid) - g(mid)) === Math.sign(f(lo) - g(lo)) ? lo = mid : hi = mid; } roots.push((lo + hi) / 2); } prev = cur; }
      roots.forEach(r => { dot(ctx, X(r), Y(g(r)), 6, css("--bad")); ctx.setLineDash([3, 3]); ctx.strokeStyle = css("--bad"); ctx.beginPath(); ctx.moveTo(X(r), Y(g(r))); ctx.lineTo(X(r), oy); ctx.stroke(); ctx.setLineDash([]); });
      const fmt = n => (Math.round(n * 100) / 100).toString();
      const msg = `The curve meets the line y = ${fmt(p.m)}x ${p.k < 0 ? "− " + fmt(-p.k) : "+ " + fmt(p.k)} at <b>x = ${roots.length ? roots.map(fmt).join(", ") : "nowhere in view"}</b>. These x-values solve the equation <i>curve = line</i>. ${fi === 0 ? "A cubic can cross a line up to 3 times." : fi === 2 ? "Reciprocal graphs have asymptotes: x = 0 and y = b." : fi === 3 ? "Exponential graphs have the x-axis as an asymptote (when there is no constant added)." : ""}`;
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Chord sliding towards tangent as h -> 0 ----------
  V.chordLimit = (host) => mount(host, (ctx, W, H, t, P) => {
    const f = x => .3 * x * x, a = 1.2, gx = 50, gw = W - 80, gy = 20, gh = H - 56;
    const X = x => gx + (x + 2) / 6 * gw, Y = y => gy + gh - y / 4 * gh;
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, Y(0)); ctx.lineTo(gx + gw, Y(0)); ctx.moveTo(X(0), gy); ctx.lineTo(X(0), gy + gh); ctx.stroke();
    ctx.strokeStyle = cs("--maths"); ctx.lineWidth = 3; ctx.beginPath(); for (let x = -2; x <= 4; x += .02) x === -2 ? ctx.moveTo(X(x), Y(f(x))) : ctx.lineTo(X(x), Y(f(x))); ctx.stroke();
    const k = (Math.sin(t / P * 2 * Math.PI - Math.PI / 2) + 1) / 2, h = 2.2 * (1 - k) + 0.05 * k;
    const b = a + h, m = (f(b) - f(a)) / h;
    ctx.strokeStyle = cs("--bad"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(a - .6), Y(f(a) - m * .6)); ctx.lineTo(X(b + .6), Y(f(b) + m * .6)); ctx.stroke();
    dot(ctx, X(a), Y(f(a)), 6, cs("--maths")); dot(ctx, X(b), Y(f(b)), 6, cs("--bad"));
    text(ctx, "A", X(a) - 4, Y(f(a)) - 12, { size: 13, weight: 700 }); text(ctx, "B", X(b) + 6, Y(f(b)) - 10, { size: 13, weight: 700, color: cs("--bad") });
    text(ctx, `h = ${h.toFixed(2)}`, 16, 28, { size: 13, weight: 700 }); text(ctx, `gradient of AB = ${m.toFixed(3)}`, 16, 48, { size: 13, weight: 700, color: cs("--bad") });
    if (h < .15) text(ctx, "as h → 0, gradient → 2×1.2 = 2.4: the derivative at x = 1.2", 16, H - 10, { size: 12, color: cs("--good"), weight: 600 });
  }, { h: 280, period: 10, caption: "As B slides towards A (h → 0), the chord's gradient approaches the tangent's gradient: the derivative" });

  // ---------- Interactive: gradient function explorer ----------
  DEMOS.derivative = (root, col) => {
    const { ctx, size, W, H } = setup(root, 320);
    const v = DEMOS._lib.controls(root, [{ key: "a", label: "a (coefficient of x³)", min: -2, max: 2, step: .5, value: 1 }, { key: "b", label: "b (coefficient of x²)", min: -4, max: 4, step: .5, value: -3 }, { key: "c", label: "c (coefficient of x)", min: -8, max: 8, step: 1, value: 0 }, { key: "x0", label: "point x", min: -3, max: 4, step: .1, value: 2 }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h);
      const a = v.a, b = v.b, c = v.c, x0 = v.x0;
      const f = x => a * x ** 3 + b * x * x + c * x, df = x => 3 * a * x * x + 2 * b * x + c;
      const gy0 = 20, gh = (h - 50) / 2 - 6, gx = 50, gw = w - 70;
      const draw = (fn, y0, ymax, color, label) => {
        const X = x => gx + (x + 4) / 8 * gw, Y = y => y0 + gh - (y + ymax) / (2 * ymax) * gh;
        ctx.strokeStyle = css("--line"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, Y(0)); ctx.lineTo(gx + gw, Y(0)); ctx.moveTo(X(0), y0); ctx.lineTo(X(0), y0 + gh); ctx.stroke();
        ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.beginPath(); let started = false;
        for (let x = -4; x <= 4; x += .02) { const y = fn(x); if (Math.abs(y) > ymax * 1.3) { started = false; continue; } started ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); started = true; } ctx.stroke();
        text(ctx, label, gx + 6, y0 + 14, { size: 12, weight: 700, color }); return X;
      };
      const ymax1 = Math.max(10, Math.abs(f(4)), Math.abs(f(-4))) * 1.1, ymax2 = Math.max(10, Math.abs(df(4)), Math.abs(df(-4))) * 1.1;
      const X1 = draw(f, gy0, ymax1, col, "y = f(x)");
      dot(ctx, X1(x0), gy0 + gh - (f(x0) + ymax1) / (2 * ymax1) * gh, 6, css("--bad"));
      const X2 = draw(df, gy0 + gh + 14, ymax2, css("--bad"), "y = f′(x)  (gradient function)");
      dot(ctx, X2(x0), gy0 + gh + 14 + gh - (df(x0) + ymax2) / (2 * ymax2) * gh, 6, css("--bad"));
      const sgn = (k, suf) => k === 0 ? "" : (k < 0 ? " − " : (suf ? " + " : "")) + (Math.abs(k) === 1 && suf ? "" : Math.abs(k)) + suf;
      const fexpr = `f(x) = ${a === 0 ? "" : (a === 1 ? "" : a === -1 ? "−" : a) + "x³"}${sgn(b, "x²")}${sgn(c, "x")}`.trim() || "0";
      const dexpr = `f′(x) = ${3 * a === 0 ? "" : (3 * a === 1 ? "" : 3 * a === -1 ? "−" : 3 * a) + "x²"}${sgn(2 * b, "x")}${c ? (c < 0 ? " − " + Math.abs(c) : " + " + c) : ""}`.trim();
      const msg = `<b>${fexpr}</b>. Rule: multiply by the power, reduce the power by 1 (aⁿ → naⁿ⁻¹). <b>${dexpr}</b>. At x = ${x0}, f′(${x0}) = <b>${df(x0).toFixed(2)}</b>: this is the gradient of the tangent to the top curve at that point. ${Math.abs(df(x0)) < 0.3 ? "Close to zero: near a turning point." : ""}`;
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Angle facts animated: angles on a line, around a point, vertically opposite ----------
  V.angleFacts = (host) => mount(host, (ctx, W, H, t, P) => {
    const k = (t / P) % 1, phase = Math.floor(k * 3), lk = seg(t, 0, .9);
    const cx = W / 2, cy = H / 2 + 10, r = 70;
    if (phase === 0) { const a1 = 35 + 110 * lk; ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.cos(-a1 * Math.PI / 180), cy + r * Math.sin(-a1 * Math.PI / 180)); ctx.stroke();
      ctx.strokeStyle = cs("--maths"); ctx.beginPath(); ctx.arc(cx, cy, 30, -a1 * Math.PI / 180, 0); ctx.stroke(); ctx.strokeStyle = cs("--chem"); ctx.beginPath(); ctx.arc(cx, cy, 30, Math.PI, -a1 * Math.PI / 180, true); ctx.stroke();
      text(ctx, Math.round(a1) + "°", cx + 40, cy - 18, { size: 14, weight: 700, color: cs("--maths") }); text(ctx, Math.round(180 - a1) + "°", cx - 50, cy - 18, { size: 14, weight: 700, color: cs("--chem") });
      text(ctx, "angles on a straight line sum to 180°", cx, cy + 90, { size: 14, align: "center", weight: 700 }); }
    else if (phase === 1) { const n = 3, angs = [60, 140, 160]; let a0 = -90;
      angs.forEach((a, i) => { const a1 = a0 + a * lk, col = [cs("--maths"), cs("--chem"), cs("--physics")][i];
        ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.cos(a0 * Math.PI / 180), cy + r * Math.sin(a0 * Math.PI / 180)); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, 26 + i * 10, a0 * Math.PI / 180, a1 * Math.PI / 180); ctx.stroke(); text(ctx, Math.round(a) + "°", cx + (40 + i * 14) * Math.cos((a0 + a / 2) * Math.PI / 180), cy + (40 + i * 14) * Math.sin((a0 + a / 2) * Math.PI / 180), { size: 13, align: "center", weight: 700, color: col }); a0 += a; });
      ctx.strokeStyle = cs("--ink"); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.cos(a0 * Math.PI / 180), cy + r * Math.sin(a0 * Math.PI / 180)); ctx.stroke();
      text(ctx, "angles around a point sum to 360°", cx, cy + 90, { size: 14, align: "center", weight: 700 }); }
    else { const a = 40, ext = 65 * lk; ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; [0, 90, 180, 270].forEach(() => {});
      [a, a + 180].forEach((ang, i) => { ctx.strokeStyle = cs("--maths"); ctx.beginPath(); ctx.moveTo(cx - r * Math.cos(ang * Math.PI / 180), cy - r * Math.sin(ang * Math.PI / 180)); ctx.lineTo(cx + r * Math.cos(ang * Math.PI / 180), cy + r * Math.sin(ang * Math.PI / 180)); ctx.stroke(); });
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-ext * Math.PI / 180 * .3);
      [a, a + 180].forEach((ang) => { ctx.strokeStyle = cs("--chem"); ctx.beginPath(); ctx.moveTo(-r * Math.cos(ang * Math.PI / 180), -r * Math.sin(ang * Math.PI / 180)); ctx.lineTo(r * Math.cos(ang * Math.PI / 180), r * Math.sin(ang * Math.PI / 180)); ctx.stroke(); });
      ctx.restore();
      ctx.strokeStyle = cs("--maths"); ctx.beginPath(); ctx.arc(cx, cy, 26, -a * Math.PI / 180, 0); ctx.stroke();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.PI); ctx.strokeStyle = cs("--maths"); ctx.beginPath(); ctx.arc(0, 0, 26, -a * Math.PI / 180, 0); ctx.stroke(); ctx.restore();
      text(ctx, "vertically opposite angles are equal", cx, cy + 90, { size: 14, align: "center", weight: 700 }); }
  }, { h: 220, period: 7.5, caption: "Three basic angle facts, each proved by angles on a line or around a point" });

  // ---------- Interior angle sum: triangulating a polygon ----------
  V.polygonSum = (host) => mount(host, (ctx, W, H, t, P) => {
    const n = 2 + Math.min(6, 1 + Math.floor(t / (P / 6.3))), cx = W / 2, cy = H / 2 + 6, r = Math.min(100, H / 2 - 40);
    const pts = Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2.5; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.stroke();
    for (let i = 2; i < n - 1; i++) { ctx.strokeStyle = cs("--maths") + "88"; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(...pts[0]); ctx.lineTo(...pts[i]); ctx.stroke(); ctx.setLineDash([]); }
    text(ctx, `${n}-sided polygon → ${n - 2} triangles`, cx, H - 20, { size: 14, align: "center", weight: 700 });
    text(ctx, `sum of interior angles = ${n - 2} × 180° = ${(n - 2) * 180}°`, cx, H - 2, { size: 13, align: "center", weight: 700, color: cs("--maths") });
  }, { h: 260, period: 7, caption: "Splitting a polygon into triangles from one vertex gives (n − 2) triangles" });

  // ---------- Interactive: construction steps (perpendicular bisector / angle bisector) ----------
  DEMOS.construct = (root, col) => {
    const { ctx, size, W, H } = setup(root, 300);
    const T = ["Perpendicular bisector of a line", "Angle bisector", "Perpendicular from a point to a line", "Triangle from 3 sides (SSS)"]; let ty = 0, step = 0, t0 = 0;
    const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px"; segEl.innerHTML = T.map((n, i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const b = e.target.closest("button"); if (!b) return; ty = +b.dataset.i; step = 0; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(segEl);
    const bar = document.createElement("div"); bar.style.cssText = "display:flex;gap:8px;margin-top:10px"; bar.innerHTML = `<button class="btn small" data-a="next">Next step</button><button class="btn ghost small" data-a="reset">Restart</button>`;
    bar.onclick = e => { const a = e.target.closest("[data-a]")?.dataset.a; if (a === "next") step = Math.min(4, step + 1); if (a === "reset") step = 0; };
    root.appendChild(bar); const out = readout(root); let last = "";
    const arcAt = (x, y, r, a0, a1) => { ctx.strokeStyle = css("--maths"); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.stroke(); };
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h); ctx.lineWidth = 2;
      const DESC = [
        ["Start with line segment AB.", "Open compasses to more than half of AB.", "Draw arcs from A and from B, above and below the line, so they cross at two points.", "Join the two crossing points with a straight line.", "This line is the perpendicular bisector: every point on it is equidistant from A and B."],
        ["Start with angle ABC (vertex B).", "Draw an arc centred at B crossing both arms, at P and Q.", "Open compasses to a fixed radius; draw arcs from P and from Q so they cross at X.", "Join B to X with a straight line.", "BX bisects angle ABC exactly in half."],
        ["Start with point P and line AB (P not on the line).", "Draw an arc centred at P crossing the line at two points, X and Y.", "From X and Y, with the same radius, draw arcs that cross at Q (on the other side).", "Join P to Q with a straight line.", "PQ is perpendicular to AB and passes through P."],
        ["Given three side lengths to construct a triangle.", "Draw the base to its correct length using a ruler.", "Open compasses to the second side's length; draw an arc from one end of the base.", "Open compasses to the third side's length; draw an arc from the other end — they cross at the apex.", "Join both ends of the base to the crossing point: the triangle is complete."]
      ][ty];
      const Ax = w * .25, Ay = h * .55, Bx = w * .72, By = h * .55;
      if (ty === 0) { ctx.strokeStyle = css("--ink"); ctx.beginPath(); ctx.moveTo(Ax, Ay); ctx.lineTo(Bx, By); ctx.stroke(); dot(ctx, Ax, Ay, 3, css("--ink")); dot(ctx, Bx, By, 3, css("--ink")); text(ctx, "A", Ax - 14, Ay + 4, { size: 13 }); text(ctx, "B", Bx + 10, By + 4, { size: 13 });
        const rad = Math.hypot(Bx - Ax, By - Ay) * .62;
        if (step >= 2) { arcAt(Ax, Ay, rad, -1.3, 1.3); arcAt(Bx, By, rad, Math.PI - 1.3, Math.PI + 1.3); }
        const mx = (Ax + Bx) / 2, dy2 = Math.sqrt(Math.max(0, rad * rad - ((Bx - Ax) / 2) ** 2));
        if (step >= 2) { dot(ctx, mx, Ay - dy2, 4, css("--maths")); dot(ctx, mx, Ay + dy2, 4, css("--maths")); }
        if (step >= 3) { ctx.strokeStyle = css("--bad"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(mx, Ay - dy2 - 10); ctx.lineTo(mx, Ay + dy2 + 10); ctx.stroke(); } }
      else if (ty === 1) { const Vx = w * .25, Vy = h * .75; ctx.strokeStyle = css("--ink"); ctx.beginPath(); ctx.moveTo(Vx, Vy); ctx.lineTo(Vx + 220, Vy); ctx.lineTo(Vx + 160, Vy - 160); ctx.stroke(); text(ctx, "B", Vx - 14, Vy + 4, { size: 13 }); text(ctx, "C", Vx + 230, Vy + 4, { size: 13 }); text(ctx, "A", Vx + 168, Vy - 170, { size: 13 });
        if (step >= 1) { arcAt(Vx, Vy, 60, 0, -Math.atan2(160, 160)); dot(ctx, Vx + 60, Vy, 3, css("--maths")); dot(ctx, Vx + 60 * Math.cos(Math.atan2(160, 160)), Vy - 60 * Math.sin(Math.atan2(160, 160)), 3, css("--maths")); }
        const p1 = [Vx + 60, Vy], ang = Math.atan2(160, 160), p2 = [Vx + 60 * Math.cos(ang), Vy - 60 * Math.sin(ang)];
        if (step >= 2) { arcAt(...p1, 70, 0, 2 * Math.PI); arcAt(...p2, 70, 0, 2 * Math.PI); }
        if (step >= 3) { ctx.strokeStyle = css("--bad"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(Vx, Vy); ctx.lineTo(Vx + 150 * Math.cos(ang / 2), Vy - 150 * Math.sin(ang / 2)); ctx.stroke(); } }
      else if (ty === 2) { const Ly = h * .3; ctx.strokeStyle = css("--ink"); ctx.beginPath(); ctx.moveTo(w * .15, Ly); ctx.lineTo(w * .85, Ly); ctx.stroke(); const Px = w * .55, Py = h * .78; dot(ctx, Px, Py, 4, css("--ink")); text(ctx, "P", Px + 10, Py, { size: 13 });
        if (step >= 1) arcAt(Px, Py, Py - Ly + 20, Math.PI * 1.15, Math.PI * 1.85);
        const half = Math.sqrt(Math.max(0, (Py - Ly + 20) ** 2 - (Py - Ly) ** 2));
        if (step >= 2) { dot(ctx, Px - half, Ly, 3, css("--maths")); dot(ctx, Px + half, Ly, 3, css("--maths")); arcAt(Px - half, Ly, Py - Ly + 40, -.6, .6); arcAt(Px + half, Ly, Py - Ly + 40, Math.PI - .6, Math.PI + .6); }
        if (step >= 3) { ctx.strokeStyle = css("--bad"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(Px, Py); ctx.lineTo(Px, Ly - (Py - Ly + 10)); ctx.stroke(); } }
      else { const bx1 = w * .25, bx2 = w * .72, by = h * .75; ctx.strokeStyle = css("--ink"); ctx.beginPath(); ctx.moveTo(bx1, by); ctx.lineTo(bx2, by); ctx.stroke(); text(ctx, "6 cm", (bx1 + bx2) / 2, by + 18, { size: 12, align: "center" });
        if (step >= 2) arcAt(bx1, by, 110, -1.5, -0.1);
        if (step >= 3) arcAt(bx2, by, 90, Math.PI + 0.1, Math.PI + 1.5);
        const d = bx2 - bx1, apx = (d * d + 110 * 110 - 90 * 90) / (2 * d), apy2 = 110 * 110 - apx * apx;
        if (step >= 4 && apy2 > 0) { const apY = Math.sqrt(apy2); const X = bx1 + apx, Y = by - apY; ctx.strokeStyle = css("--bad"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(bx1, by); ctx.lineTo(X, Y); ctx.lineTo(bx2, by); ctx.stroke(); } }
      const msg = `<b>Step ${step}/4 — ${T[ty]}:</b> ${DESC[Math.min(step, 4)]}`; if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Angle at centre = 2x angle at circumference, animated ----------
  V.circleCentre = (host) => mount(host, (ctx, W, H, t, P) => {
    const cx = W / 2, cy = H / 2 + 6, r = Math.min(100, H / 2 - 40);
    const k = seg(t, .4, P - .4), aA = -2.6, aB = -0.5, aC = 2.0 + 1.5 * Math.sin(k * 3.14159);
    const pt = a => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const [Ax, Ay] = pt(aA), [Bx, By] = pt(aB), [Cx, Cy] = pt(aC);
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
    ctx.strokeStyle = cs("--maths"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(Ax, Ay); ctx.moveTo(cx, cy); ctx.lineTo(Bx, By); ctx.stroke();
    ctx.strokeStyle = cs("--chem"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(Cx, Cy); ctx.lineTo(Ax, Ay); ctx.moveTo(Cx, Cy); ctx.lineTo(Bx, By); ctx.stroke();
    const angAt = (px, py, a1, a2, rad, col) => { let d = a2 - a1; while (d < 0) d += 2 * Math.PI; while (d > 2 * Math.PI) d -= 2 * Math.PI; ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(px, py, rad, a1, a1 + d); ctx.stroke(); return d; };
    const angCentre = Math.atan2(By - cy, Bx - cx) - Math.atan2(Ay - cy, Ax - cx);
    const a0 = Math.atan2(Ay - cy, Ax - cx), a1 = Math.atan2(By - cy, Bx - cx);
    angAt(cx, cy, a0, a1, 24, cs("--maths"));
    const cA0 = Math.atan2(Ay - Cy, Ax - Cx), cA1 = Math.atan2(By - Cy, Bx - Cx);
    angAt(Cx, Cy, cA0, cA1, 20, cs("--chem"));
    dot(ctx, cx, cy, 3, cs("--ink")); dot(ctx, Ax, Ay, 4, cs("--ink")); dot(ctx, Bx, By, 4, cs("--ink")); dot(ctx, Cx, Cy, 4, cs("--chem"));
    text(ctx, "A", Ax + 10 * Math.cos(aA), Ay + 10 * Math.sin(aA), { size: 12 }); text(ctx, "B", Bx + 10 * Math.cos(aB), By + 10 * Math.sin(aB), { size: 12 }); text(ctx, "C", Cx + 12 * Math.cos(aC), Cy + 12 * Math.sin(aC), { size: 12, color: cs("--chem") });
    text(ctx, "angle at centre = 2 × angle at circumference", cx, H - 10, { size: 13, align: "center", weight: 700 });
  }, { h: 280, period: 8, caption: "As C moves around the major arc, the angle at the circumference stays half the angle at the centre" });

  // ---------- Cyclic quadrilateral: opposite angles sum to 180 ----------
  V.cyclicQuad = (host) => mount(host, (ctx, W, H, t, P) => {
    const cx = W / 2, cy = H / 2 + 6, r = Math.min(95, H / 2 - 40);
    const k = seg(t, .4, P - .4), base = [-2.2, -0.9, 0.6, 2.3], wob = k * 0.9 - 0.45;
    const angs = [base[0], base[1] + wob * .3, base[2], base[3] - wob * .2];
    const pts = angs.map(a => [cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
    ctx.strokeStyle = cs("--maths"); ctx.lineWidth = 2.5; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.stroke();
    const lab = ["A", "B", "C", "D"], col = [cs("--chem"), cs("--physics"), cs("--chem"), cs("--physics")];
    pts.forEach(([x, y], i) => { dot(ctx, x, y, 4, cs("--ink")); text(ctx, lab[i], x + 12 * Math.cos(angs[i]), y + 12 * Math.sin(angs[i]), { size: 13, weight: 700 }); });
    const interior = (i) => { const prev = pts[(i + 3) % 4], cur = pts[i], next = pts[(i + 1) % 4]; let a1 = Math.atan2(prev[1] - cur[1], prev[0] - cur[0]), a2 = Math.atan2(next[1] - cur[1], next[0] - cur[0]); let d = a2 - a1; while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI; return { a1, d: -d }; };
    [0, 2].forEach(i => { const { a1, d } = interior(i); ctx.strokeStyle = col[i]; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(pts[i][0], pts[i][1], 20, a1, a1 + d, d < 0); ctx.stroke(); });
    text(ctx, "opposite angles A + C = 180°  (and B + D = 180°)", cx, H - 10, { size: 13, align: "center", weight: 700 });
  }, { h: 280, period: 7, caption: "A cyclic quadrilateral has all four vertices on the circle: opposite angles are supplementary" });

  // ---------- Interactive: circle theorem explorer ----------
  DEMOS.circleTheorem = (root, col) => {
    const { ctx, size, W, H } = setup(root, 340);
    const T = ["Angle in semicircle", "Tangent ⟂ radius", "Two tangents equal", "Angles same segment", "Alternate segment"]; let ty = 0;
    const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px"; segEl.innerHTML = T.map((n, i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const b = e.target.closest("button"); if (!b) return; ty = +b.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(segEl);
    const v = DEMOS._lib.controls(root, [{ key: "p", label: "point position", min: 0, max: 100, step: 1, value: 50 }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 50, k = v.p / 100;
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); dot(ctx, cx, cy, 2.5, css("--muted"));
      const P = a => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      let msg = "";
      if (ty === 0) { const [Ax, Ay] = P(Math.PI), [Bx, By] = P(0), a = Math.PI * .15 + k * Math.PI * .7, [Cx, Cy] = P(-a);
        ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(Ax, Ay); ctx.lineTo(Bx, By); ctx.stroke();
        ctx.strokeStyle = css("--chem"); ctx.beginPath(); ctx.moveTo(Cx, Cy); ctx.lineTo(Ax, Ay); ctx.moveTo(Cx, Cy); ctx.lineTo(Bx, By); ctx.stroke();
        const ang = 90; ctx.strokeStyle = css("--chem"); ctx.beginPath(); ctx.rect(Cx - 10 * Math.sign(Math.cos(-a)), Cy - 10, 10 * Math.sign(Math.cos(-a)), 10); ctx.stroke();
        text(ctx, "A", Ax - 14, Ay, { size: 13 }); text(ctx, "B", Bx + 10, By, { size: 13 }); text(ctx, "C", Cx, Cy - 14, { size: 13, color: css("--chem") }); text(ctx, "AB is a diameter", cx, cy + r + 30, { size: 12, align: "center", color: css("--muted") });
        msg = `<b>Angle in a semicircle = 90°.</b> AB is a diameter, so angle ACB is always a right angle, wherever C is on the circle.`; }
      else if (ty === 1) { const a = k * 2 * Math.PI, [Tx, Ty] = P(a), tx = -Math.sin(a), ty2 = Math.cos(a);
        ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(Tx, Ty); ctx.stroke();
        ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(Tx - tx * 90, Ty - ty2 * 90); ctx.lineTo(Tx + tx * 90, Ty + ty2 * 90); ctx.stroke();
        const sx = Math.sign(Math.cos(a)) || 1, sy = Math.sign(Math.sin(a)) || 1; ctx.strokeStyle = css("--chem"); ctx.strokeRect(Tx - 10 * Math.cos(a) * sx * 0 - (tx * 10 + Math.cos(a) * 10 * 0), Ty - 10, 1, 1);
        dot(ctx, Tx, Ty, 4, css("--ink")); text(ctx, "T", Tx + 12 * Math.cos(a), Ty + 12 * Math.sin(a), { size: 13 }); text(ctx, "radius ⟂ tangent at T", cx, cy + r + 30, { size: 12, align: "center", color: css("--muted") });
        msg = `<b>A tangent is perpendicular to the radius</b> at the point of contact T, wherever T is.`; }
      else if (ty === 2) { const a1 = Math.PI * .75, a2 = -Math.PI * .1, [Ax, Ay] = P(a1), [Bx, By] = P(a2);
        const mid = [(Ax + Bx) / 2 + (cx - (Ax + Bx) / 2) * -0.6, (Ay + By) / 2 + (cy - (Ay + By) / 2) * -0.6];
        const ext = 1.3 + k * 1.2; const Px = cx + (mid[0] - cx) * ext, Py = cy + (mid[1] - cy) * ext;
        ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(Px, Py); ctx.lineTo(Ax, Ay); ctx.moveTo(Px, Py); ctx.lineTo(Bx, By); ctx.stroke();
        ctx.strokeStyle = css("--ink"); ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(Px, Py); ctx.stroke(); ctx.setLineDash([]);
        dot(ctx, Ax, Ay, 4, css("--ink")); dot(ctx, Bx, By, 4, css("--ink")); dot(ctx, Px, Py, 4, col);
        text(ctx, "A", Ax - 12, Ay, { size: 13 }); text(ctx, "B", Bx + 10, By, { size: 13 }); text(ctx, "P", Px, Py + (Py > cy ? 18 : -10), { size: 13 });
        const dA = Math.hypot(Px - Ax, Py - Ay).toFixed(0), dB = Math.hypot(Px - Bx, Py - By).toFixed(0);
        msg = `<b>Two tangents from an external point P are equal in length</b>: PA = PB (${dA} ≈ ${dB} px). PO also bisects angle APB.`; }
      else if (ty === 3) { const [Ax, Ay] = P(Math.PI * .8), [Bx, By] = P(Math.PI * .15), a = Math.PI * 1.15 + k * Math.PI * .5, [Cx, Cy] = P(a), [Dx, Dy] = P(a - Math.PI * .35 - k * 0.3);
        ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(Ax, Ay); ctx.lineTo(Bx, By); ctx.stroke();
        ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(Cx, Cy); ctx.lineTo(Ax, Ay); ctx.moveTo(Cx, Cy); ctx.lineTo(Bx, By); ctx.stroke();
        ctx.strokeStyle = css("--chem"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(Dx, Dy); ctx.lineTo(Ax, Ay); ctx.moveTo(Dx, Dy); ctx.lineTo(Bx, By); ctx.stroke();
        [["A", Ax, Ay], ["B", Bx, By], ["C", Cx, Cy, col], ["D", Dx, Dy, css("--chem")]].forEach(([l, x, y, c]) => { dot(ctx, x, y, 4, c || css("--ink")); text(ctx, l, x + 12 * (x > cx ? 1 : -1), y, { size: 13, color: c }); });
        text(ctx, "C, D on the same (major) arc", cx, cy + r + 30, { size: 12, align: "center", color: css("--muted") });
        msg = `<b>Angles in the same segment are equal.</b> Angles ACB and ADB are both subtended by chord AB from the same (major) arc, so angle ACB = angle ADB.`; }
      else { const aT = Math.PI * .5, [Tx, Ty] = P(aT), tx = Math.cos(aT + Math.PI / 2), ty2 = Math.sin(aT + Math.PI / 2);
        const [Ax, Ay] = P(Math.PI * .5 + Math.PI * .55), [Bx, By] = P(Math.PI * .5 - (0.3 + k * 1.3));
        ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(Tx - tx * 110, Ty - ty2 * 110); ctx.lineTo(Tx + tx * 110, Ty + ty2 * 110); ctx.stroke();
        ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(Tx, Ty); ctx.lineTo(Ax, Ay); ctx.lineTo(Bx, By); ctx.lineTo(Tx, Ty); ctx.stroke();
        dot(ctx, Tx, Ty, 4, col); dot(ctx, Ax, Ay, 4); dot(ctx, Bx, By, 4);
        text(ctx, "T", Tx, Ty + 16, { size: 13 }); text(ctx, "A", Ax - 12, Ay, { size: 13 }); text(ctx, "B", Bx + 10, By, { size: 13 });
        msg = `<b>Alternate segment theorem:</b> the angle between the tangent at T and chord TA equals the angle TBA in the alternate segment (on the other side of the chord).`; }
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Similar triangles scaling, area and volume scale factors ----------
  V.similarScale = (host) => mount(host, (ctx, W, H, t, P) => {
    const k = .5 + .9 * Math.sin(t / P * 2 * Math.PI) * .5 + .5, sf = .6 + k * 1.1;
    const bx = W * .22, by = H * .7;
    const tri = (x0, y0, s, c) => { ctx.strokeStyle = c; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + s * .9, y0); ctx.lineTo(x0 + s * .3, y0 - s * .8); ctx.closePath(); ctx.stroke(); };
    tri(bx, by, 60, cs("--maths")); tri(bx + 20, by, 60 * sf, cs("--chem"));
    text(ctx, "× " + sf.toFixed(2), bx + 110, by - 70, { size: 14, weight: 700, color: cs("--chem") });
    const gx = W * .58, gy0 = 30, gw = W - gx - 30, gh = H - 70;
    const X = v => gx + v / 2.2 * gw, barw = gw / 3.6;
    [["length", sf, cs("--maths")], ["area", sf * sf, cs("--chem")], ["volume", sf ** 3, cs("--physics")]].forEach(([lab, val, c], i) => {
      const bh = Math.min(gh, val / 2 * gh * .4), x = gx + i * barw * 1.1; ctx.fillStyle = c + "55"; ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.fillRect(x, gy0 + gh - bh, barw * .8, bh); ctx.strokeRect(x, gy0 + gh - bh, barw * .8, bh);
      text(ctx, lab, x + barw * .4, gy0 + gh + 16, { size: 12, align: "center" }); text(ctx, "×" + val.toFixed(2), x + barw * .4, gy0 + gh - bh - 8, { size: 12, align: "center", weight: 700, color: c }); });
    text(ctx, "scale factor k → lengths ×k, area ×k², volume ×k³", W / 2, 16, { size: 13, align: "center", weight: 700 });
  }, { h: 260, period: 8, caption: "If lengths scale by k, area scales by k² and volume by k³" });

  // ---------- Interactive: congruence test checker ----------
  DEMOS.congruence = (root, col) => {
    const { ctx, size, W, H } = setup(root, 260);
    const TESTS = ["SSS", "SAS", "ASA", "RHS"]; let ty = 0;
    const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px"; segEl.innerHTML = TESTS.map((n, i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const b = e.target.closest("button"); if (!b) return; ty = +b.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(segEl); const out = readout(root);
    const DESC = ["All three sides of one triangle equal all three sides of the other.", "Two sides and the angle between them (included angle) match.", "Two angles and the side between them (included side) match.", "Right angle, hypotenuse and one other side match (right-angled triangles only)."];
    let last = "";
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h);
      const drawTri = (x0, y0, s, marks) => { const pts = [[x0, y0], [x0 + s, y0], [x0 + s * .35, y0 - s * .85]];
        ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2.5; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.stroke();
        marks.forEach(([side, n, c]) => { const [a, b] = [pts[side], pts[(side + 1) % 3]], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = -(b[1] - a[1]), dy = b[0] - a[0], L = Math.hypot(dx, dy); ctx.strokeStyle = c || css("--bad"); ctx.lineWidth = 2;
          for (let i = 0; i < n; i++) { const off = (i - (n - 1) / 2) * 6; ctx.beginPath(); ctx.moveTo(mx + dx / L * (off - 3) + (dx / L) * 0, my + dy / L * (off - 3)); } });
        return pts; };
      const tick = (p1, p2, n, c) => { const mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2, dx = p2[0] - p1[0], dy = p2[1] - p1[1], L = Math.hypot(dx, dy), px = -dy / L, py = dx / L;
        ctx.strokeStyle = c; ctx.lineWidth = 2; for (let i = 0; i < n; i++) { const off = (i - (n - 1) / 2) * 5; ctx.beginPath(); ctx.moveTo(mx + px * (off - 3) + dx / L * -4, my + py * (off - 3) + dy / L * -4); ctx.lineTo(mx + px * (off - 3) + dx / L * 4, my + py * (off - 3) + dy / L * 4); ctx.stroke(); } };
      const arcMark = (v, p1, p2, n, c) => { const a1 = Math.atan2(p1[1] - v[1], p1[0] - v[0]), a2 = Math.atan2(p2[1] - v[1], p2[0] - v[0]); ctx.strokeStyle = c; ctx.lineWidth = 2; for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.arc(v[0], v[1], 14 + i * 5, Math.min(a1, a2), Math.max(a1, a2)); ctx.stroke(); } };
      const T1 = [[w * .18, h * .82], [w * .18 + 110, h * .82], [w * .18 + 38, h * .82 - 95]];
      const T2 = [[w * .62, h * .82], [w * .62 + 110, h * .82], [w * .62 + 38, h * .82 - 95]];
      [T1, T2].forEach(pts => { ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2.5; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.stroke(); });
      if (ty === 0) { [T1, T2].forEach(p => { tick(p[0], p[1], 1, css("--maths")); tick(p[1], p[2], 2, css("--chem")); tick(p[2], p[0], 3, css("--physics")); }); }
      else if (ty === 1) { [T1, T2].forEach(p => { tick(p[0], p[1], 1, css("--maths")); tick(p[1], p[2], 2, css("--chem")); arcMark(p[1], p[0], p[2], 1, css("--bad")); }); }
      else if (ty === 2) { [T1, T2].forEach(p => { arcMark(p[0], p[1], p[2], 1, css("--bad")); arcMark(p[1], p[0], p[2], 1, css("--maths")); tick(p[0], p[1], 2, css("--chem")); }); }
      else { [T1, T2].forEach(p => { ctx.strokeStyle = css("--bad"); ctx.lineWidth = 2; ctx.strokeRect(p[0][0] - 3, p[0][1] - 16, 13, 13); tick(p[0], p[2], 1, css("--maths")); tick(p[1], p[2], 2, css("--chem")); }); }
      text(ctx, "△1", T1[0][0] + 40, h * .95, { size: 13, align: "center" }); text(ctx, "△2", T2[0][0] + 40, h * .95, { size: 13, align: "center" });
      const msg = `<b>${TESTS[ty]}:</b> ${DESC[ty]} Matching marks (same colour/number of ticks) show which parts are equal.`;
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Prism as a stack of the cross-section ----------
  V.prismVolume = (host) => mount(host, (ctx, W, H, t, P) => {
    const k = clamp(t / (P * .8)), cx = W * .3, cy = H * .5, s = 70, depth = 160 * k;
    const tri = [[cx, cy - s * .7], [cx - s * .6, cy + s * .5], [cx + s * .6, cy + s * .5]];
    const n = Math.max(1, Math.floor(k * 12));
    for (let i = n; i >= 0; i--) { const dx = i / 12 * depth * .6, dy = -i / 12 * depth * .35; ctx.fillStyle = `hsla(${200},50%,${60 - i}%,${i === 0 ? .9 : .5})`; ctx.strokeStyle = cs("--ink"); ctx.lineWidth = i === 0 ? 2 : .6; ctx.beginPath(); tri.forEach(([x, y], j) => j ? ctx.lineTo(x + dx, y + dy) : ctx.moveTo(x + dx, y + dy)); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    text(ctx, "cross-section (area A)", cx, cy + s * .5 + 24, { size: 12, align: "center" });
    text(ctx, "length L", cx + depth * .6 * .55, cy - s * .7 - depth * .35 * .55 - 10, { size: 12, align: "center", color: cs("--bad") });
    text(ctx, "Volume = A × L", W * .72, H / 2, { size: 18, align: "center", weight: 700, color: cs("--maths") });
    text(ctx, "Surface area = 2A + (perimeter of A) × L", W * .72, H / 2 + 30, { size: 13, align: "center", color: cs("--muted") });
  }, { h: 230, period: 7, caption: "A prism is a constant cross-section repeated along its length: volume = area × length" });

  // ---------- Arc length and sector area as a fraction of the full circle ----------
  V.sectorFraction = (host) => mount(host, (ctx, W, H, t, P) => {
    const cx = W * .3, cy = H / 2, r = Math.min(100, H / 2 - 30), theta = 40 + 240 * (.5 - .5 * Math.cos(t / P * 2 * Math.PI));
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
    ctx.fillStyle = cs("--maths") + "44"; ctx.strokeStyle = cs("--maths"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + theta * Math.PI / 180); ctx.closePath(); ctx.fill(); ctx.stroke();
    text(ctx, Math.round(theta) + "°", cx + 18, cy - r * .4, { size: 14, weight: 700, color: cs("--maths") });
    const frac = theta / 360;
    text(ctx, `fraction of full turn = ${theta.toFixed(0)}/360 = ${frac.toFixed(3)}`, W * .64, H / 2 - 40, { size: 13, align: "center" });
    text(ctx, `arc length = ${frac.toFixed(3)} × 2πr`, W * .64, H / 2 - 4, { size: 15, align: "center", weight: 700, color: cs("--maths") });
    text(ctx, `sector area = ${frac.toFixed(3)} × πr²`, W * .64, H / 2 + 30, { size: 15, align: "center", weight: 700, color: cs("--chem") });
  }, { h: 220, period: 8, caption: "A sector is a fraction θ/360 of the full circle, for both arc length and area" });

  // ---------- Interactive: 3D shape volume/SA calculator ----------
  DEMOS.solids = (root, col) => {
    const { ctx, size, W, H } = setup(root, 280);
    const SH = ["cuboid", "cylinder", "cone", "sphere", "pyramid (square base)"]; let si = 0;
    const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px"; segEl.innerHTML = SH.map((n, i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const b = e.target.closest("button"); if (!b) return; si = +b.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(segEl);
    const v = DEMOS._lib.controls(root, [{ key: "a", label: "a (length / radius)", min: 1, max: 10, step: .5, value: 4 }, { key: "b", label: "b (width)", min: 1, max: 10, step: .5, value: 5 }, { key: "h", label: "h (height)", min: 1, max: 12, step: .5, value: 6 }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h);
      const a = v.a, b = v.b, hh = v.h, pi = Math.PI;
      const calc = [
        () => ({ V: a * b * hh, S: 2 * (a * b + a * hh + b * hh), lab: ["a (length)", "b (width)", "h (height)"], vf: "V = a × b × h", sf: "S = 2(ab + ah + bh)" }),
        () => ({ V: pi * a * a * hh, S: 2 * pi * a * a + 2 * pi * a * hh, lab: ["r (radius)", "—", "h (height)"], vf: "V = πr²h", sf: "S = 2πr² + 2πrh" }),
        () => { const l = Math.hypot(a, hh); return { V: (1 / 3) * pi * a * a * hh, S: pi * a * a + pi * a * l, lab: ["r (radius)", "—", "h (height)"], vf: "V = ⅓πr²h", sf: "S = πr² + πrl  (l = slant height = " + l.toFixed(2) + ")" }; },
        () => ({ V: (4 / 3) * pi * a ** 3, S: 4 * pi * a * a, lab: ["r (radius)", "—", "—"], vf: "V = 4/3 πr³", sf: "S = 4πr²" }),
        () => { const l = Math.sqrt((a / 2) ** 2 + hh * hh); return { V: (1 / 3) * a * a * hh, S: a * a + 2 * a * l, lab: ["a (base side)", "—", "h (height)"], vf: "V = ⅓ × base area × h", sf: "S = base + 4 triangles (slant height = " + l.toFixed(2) + ")" }; }
      ][si]();
      const { V, S, lab, vf, sf } = calc;
      // simple 2D representative icon
      const cx = w * .22, cy = h * .55;
      ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.fillStyle = col + "22";
      if (si === 0) { ctx.beginPath(); ctx.rect(cx - 50, cy - 40, 100, 80); ctx.fill(); ctx.stroke(); }
      else if (si === 1) { ctx.beginPath(); ctx.ellipse(cx, cy - 40, 45, 14, 0, 0, 7); ctx.moveTo(cx - 45, cy - 40); ctx.lineTo(cx - 45, cy + 40); ctx.ellipse(cx, cy + 40, 45, 14, 0, Math.PI, 0, true); ctx.lineTo(cx + 45, cy - 40); ctx.fill(); ctx.stroke(); }
      else if (si === 2) { ctx.beginPath(); ctx.ellipse(cx, cy + 40, 45, 14, 0, 0, 7); ctx.moveTo(cx - 45, cy + 40); ctx.lineTo(cx, cy - 50); ctx.lineTo(cx + 45, cy + 40); ctx.fill(); ctx.stroke(); }
      else if (si === 3) { ctx.beginPath(); ctx.arc(cx, cy, 48, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx, cy, 48, 14, 0, 0, Math.PI); ctx.stroke(); }
      else { ctx.beginPath(); ctx.moveTo(cx - 50, cy + 30); ctx.lineTo(cx + 10, cy + 45); ctx.lineTo(cx + 50, cy + 15); ctx.lineTo(cx - 10, cy + 2); ctx.closePath(); ctx.moveTo(cx - 10, cy + 2); ctx.lineTo(cx - 5, cy - 55); ctx.lineTo(cx + 10, cy + 45); ctx.moveTo(cx - 5, cy - 55); ctx.lineTo(cx - 50, cy + 30); ctx.moveTo(cx - 5, cy - 55); ctx.lineTo(cx + 50, cy + 15); ctx.fill(); ctx.stroke(); }
      const msg = `<b>${SH[si]}</b>: ${vf} → <b>V = ${V.toFixed(2)}</b>. ${sf} → <b>S = ${S.toFixed(2)}</b>. (Using a=${a}, ${lab[1] !== "—" ? "b=" + b + ", " : ""}h=${hh}${si >= 3 && si !== 4 ? " not used" : ""})`;
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Interactive: transformation explorer ----------
  DEMOS.transform = (root, col) => {
    const { ctx, size, W, H } = setup(root, 340);
    const T = ["Translation", "Reflection", "Rotation", "Enlargement"]; let ty = 0;
    const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px"; segEl.innerHTML = T.map((n, i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const b = e.target.closest("button"); if (!b) return; ty = +b.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(segEl);
    const v = DEMOS._lib.controls(root, [
      { key: "tx", label: "translation: x", min: -6, max: 6, step: 1, value: 3 }, { key: "ty", label: "translation: y", min: -6, max: 6, step: 1, value: 2 },
      { key: "mline", label: "reflection: line (0=x-axis,1=y-axis,2=y=x,3=y=-x)", min: 0, max: 3, step: 1, value: 1 },
      { key: "rang", label: "rotation angle (°, +ve = anticlockwise)", min: -270, max: 270, step: 90, value: 90 },
      { key: "rcx", label: "rotation centre x", min: -4, max: 4, step: 1, value: 0 }, { key: "rcy", label: "rotation centre y", min: -4, max: 4, step: 1, value: 0 },
      { key: "k", label: "enlargement: scale factor k", min: -3, max: 3, step: .5, value: 2 }, { key: "ecx", label: "enlargement centre x", min: -4, max: 4, step: 1, value: 0 }, { key: "ecy", label: "enlargement centre y", min: -4, max: 4, step: 1, value: 0 }
    ]);
    const out = readout(root); let last = "";
    const shape = [[1, 1], [3, 1], [3, 2], [1.5, 3]];
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h);
      const s = Math.min(w, h) / 16, ox = w / 2, oy = h / 2, X = x => ox + x * s, Y = y => oy - y * s;
      ctx.strokeStyle = css("--line"); ctx.lineWidth = 1; for (let i = -8; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(X(i), 0); ctx.lineTo(X(i), h); ctx.moveTo(0, Y(i)); ctx.lineTo(w, Y(i)); ctx.stroke(); }
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, h); ctx.stroke();
      const drawShape = (pts, c, fill) => { ctx.strokeStyle = c; ctx.lineWidth = 2.5; ctx.fillStyle = c + (fill ? "33" : "00"); ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y))); ctx.closePath(); if (fill) ctx.fill(); ctx.stroke(); };
      drawShape(shape, css("--maths"), true);
      let img, desc, vec = null;
      if (ty === 0) { const dx = v.tx, dy = v.ty; img = shape.map(([x, y]) => [x + dx, y + dy]); desc = `Translation by vector $\\begin{pmatrix}${dx}\\\\${dy}\\end{pmatrix}$: every point moves ${dx} right (or left if negative) and ${dy} up (or down if negative). Shape, size and orientation are unchanged.`; }
      else if (ty === 1) { const m = Math.round(v.mline), refl = p => m === 0 ? [p[0], -p[1]] : m === 1 ? [-p[0], p[1]] : m === 2 ? [p[1], p[0]] : [-p[1], -p[0]];
        img = shape.map(refl); const lines = ["the x-axis (y = 0)", "the y-axis (x = 0)", "the line y = x", "the line y = −x"];
        if (m === 0) { ctx.strokeStyle = css("--bad"); ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.stroke(); }
        else if (m === 1) { ctx.strokeStyle = css("--bad"); ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, h); ctx.stroke(); }
        else if (m === 2) { ctx.strokeStyle = css("--bad"); ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(X(-8), Y(-8)); ctx.lineTo(X(8), Y(8)); ctx.stroke(); }
        else { ctx.strokeStyle = css("--bad"); ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(X(-8), Y(8)); ctx.lineTo(X(8), Y(-8)); ctx.stroke(); }
        ctx.setLineDash([]);
        desc = `Reflection in ${lines[m]}. The image is the mirror image: same size, reversed orientation. Each point and its image are equidistant from the mirror line, on a perpendicular to it.`; }
      else if (ty === 2) { const ang = v.rang * Math.PI / 180, cx0 = v.rcx, cy0 = v.rcy, cos = Math.cos(ang), sin = Math.sin(ang);
        img = shape.map(([x, y]) => { const dx = x - cx0, dy = y - cy0; return [cx0 + dx * cos - dy * sin, cy0 + dx * sin + dy * cos]; });
        dot(ctx, X(cx0), Y(cy0), 5, css("--bad")); text(ctx, "centre", X(cx0) + 8, Y(cy0) - 8, { size: 11, color: css("--bad") });
        desc = `Rotation of ${Math.abs(v.rang)}° ${v.rang >= 0 ? "anticlockwise" : "clockwise"} about (${cx0}, ${cy0}). Size and shape are unchanged; every point turns through the same angle about the centre.`; }
      else { const k = v.k, cx0 = v.ecx, cy0 = v.ecy; img = shape.map(([x, y]) => [cx0 + k * (x - cx0), cy0 + k * (y - cy0)]);
        dot(ctx, X(cx0), Y(cy0), 5, css("--bad")); text(ctx, "centre", X(cx0) + 8, Y(cy0) - 8, { size: 11, color: css("--bad") });
        shape.forEach(([x, y]) => { ctx.strokeStyle = css("--muted"); ctx.setLineDash([3, 4]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(cx0), Y(cy0)); ctx.lineTo(X(cx0 + k * (x - cx0)), Y(cy0 + k * (y - cy0))); ctx.stroke(); ctx.setLineDash([]); });
        desc = `Enlargement, scale factor ${k}, centre (${cx0}, ${cy0}). ${k < 0 ? "A negative scale factor puts the image on the opposite side of the centre, inverted." : Math.abs(k) < 1 ? "A fractional scale factor makes the image smaller." : "The image is larger than the object."} Distances from the centre are multiplied by ${k}; area is multiplied by ${(k * k).toFixed(2)}.`; }
      drawShape(img, css("--bad"), false);
      text(ctx, "object", X(shape[0][0]) - 10, Y(shape[0][1]) + 18, { size: 11, color: css("--maths"), align: "right" });
      const msg = desc; if (msg !== last) { out.innerHTML = msg; last = msg; DEMOS._lib.typeset(out); }
    });
  };

  // ---------- Interactive: vector arithmetic and the triangle law ----------
  DEMOS.vectors = (root, col) => {
    const { ctx, size, W, H } = setup(root, 320);
    const v = DEMOS._lib.controls(root, [{ key: "ax", label: "a: x", min: -5, max: 5, step: 1, value: 4 }, { key: "ay", label: "a: y", min: -5, max: 5, step: 1, value: 1 }, { key: "bx", label: "b: x", min: -5, max: 5, step: 1, value: -1 }, { key: "by", label: "b: y", min: -5, max: 5, step: 1, value: 3 }, { key: "m", label: "m (for ma + nb)", min: -3, max: 3, step: .5, value: 1 }, { key: "n", label: "n (for ma + nb)", min: -3, max: 3, step: .5, value: 1 }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h);
      const s = Math.min(w, h) / 14, ox = w * .32, oy = h / 2, X = x => ox + x * s, Y = y => oy - y * s;
      ctx.strokeStyle = css("--line"); ctx.lineWidth = 1; for (let i = -7; i <= 7; i++) { ctx.beginPath(); ctx.moveTo(X(i), 0); ctx.lineTo(X(i), h); ctx.moveTo(0, Y(i)); ctx.lineTo(w * .62, Y(i)); ctx.stroke(); }
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w * .62, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, h); ctx.stroke();
      const a = [v.ax, v.ay], b = [v.bx, v.by], m = v.m, n = v.n, r = [m * a[0] + n * b[0], m * a[1] + n * b[1]];
      arrow(ctx, X(0), Y(0), X(a[0]), Y(a[1]), css("--maths"), 3); text(ctx, "a", X(a[0] / 2) + 8, Y(a[1] / 2) - 6, { size: 13, weight: 700, color: css("--maths") });
      arrow(ctx, X(a[0]), Y(a[1]), X(a[0] + b[0]), Y(a[1] + b[1]), css("--physics"), 3); text(ctx, "b", X(a[0] + b[0] / 2) + 8, Y(a[1] + b[1] / 2) - 6, { size: 13, weight: 700, color: css("--physics") });
      arrow(ctx, X(0), Y(0), X(a[0] + b[0]), Y(a[1] + b[1]), css("--bad"), 2.5); text(ctx, "a + b", X((a[0] + b[0]) / 2) - 10, Y((a[1] + b[1]) / 2) + 18, { size: 12, weight: 700, color: css("--bad") });
      // ma + nb shown as faint separate arrow from origin
      ctx.setLineDash([5, 4]); arrow(ctx, X(0), Y(0), X(r[0]), Y(r[1]), col, 3); ctx.setLineDash([]);
      text(ctx, "ma + nb", X(r[0]) + 8, Y(r[1]) + 14, { size: 12, weight: 700, color: col });
      const mag = (p) => Math.hypot(p[0], p[1]).toFixed(2);
      const msg = `$\\mathbf{a}=\\begin{pmatrix}${a[0]}\\\\${a[1]}\\end{pmatrix}$, $\\mathbf{b}=\\begin{pmatrix}${b[0]}\\\\${b[1]}\\end{pmatrix}$. Triangle law: $\\mathbf{a}+\\mathbf{b}=\\begin{pmatrix}${a[0] + b[0]}\\\\${a[1] + b[1]}\\end{pmatrix}$ (travel along a, then along b). $|\\mathbf{a}|=${mag(a)}$. ${m}\\mathbf{a}+${n}\\mathbf{b}=\\begin{pmatrix}${r[0].toFixed(1)}\\\\${r[1].toFixed(1)}\\end{pmatrix}$ (dashed), magnitude ${mag(r)}.`;
      if (msg !== last) { out.innerHTML = msg; last = msg; DEMOS._lib.typeset(out); }
    });
  };

  // ---------- Spinner animating relative frequency converging to probability ----------
  V.relFreq = (host) => mount(host, (ctx, W, H, t, P) => {
    const n = Math.min(200, Math.floor((t / P) * 220)), seed = 7;
    let heads = 0; for (let i = 0; i < n; i++) heads += (rnd2(i, seed) < 0.5) ? 1 : 0;
    const gx = 50, gw = W - 80, gy = 20, gh = H - 60, X = i => gx + i / 200 * gw, Y = p => gy + gh - p * gh;
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
    ctx.setLineDash([5, 4]); ctx.strokeStyle = cs("--maths"); ctx.beginPath(); ctx.moveTo(gx, Y(.5)); ctx.lineTo(gx + gw, Y(.5)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, "theoretical probability 0.5", gx + gw, Y(.5) - 8, { size: 11, align: "right", color: cs("--maths") });
    ctx.strokeStyle = cs("--bad"); ctx.lineWidth = 2;
    ctx.beginPath(); let h2 = 0; for (let i = 1; i <= n; i++) { h2 += (rnd2(i - 1, seed) < 0.5) ? 1 : 0; const p = h2 / i; i === 1 ? ctx.moveTo(X(i), Y(p)) : ctx.lineTo(X(i), Y(p)); } ctx.stroke();
    text(ctx, `${n} tosses: relative frequency = ${(n ? heads / n : 0).toFixed(3)}`, gx, gy - 4, { size: 13, weight: 700 });
    text(ctx, "number of tosses", gx + gw, gy + gh + 20, { size: 11, align: "right", color: cs("--muted") });
  }, { h: 230, period: 9, caption: "As the number of trials increases, relative frequency settles towards the true probability" });

  // ---------- Interactive: tree diagram builder (with/without replacement) ----------
  DEMOS.treeDiagram = (root, col) => {
    const { ctx, size, W, H } = setup(root, 340);
    let repl = true;
    const v = DEMOS._lib.controls(root, [{ key: "r", label: "red balls", min: 0, max: 8, step: 1, value: 4 }, { key: "b", label: "blue balls", min: 0, max: 8, step: 1, value: 3 }]);
    const bar = document.createElement("div"); bar.className = "seg wrap"; bar.style.marginTop = "10px"; bar.innerHTML = `<button aria-pressed="true" data-m="1">with replacement</button><button data-m="0">without replacement</button>`;
    bar.onclick = e => { const b = e.target.closest("button"); if (!b) return; repl = b.dataset.m === "1"; bar.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(bar); const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h);
      const R = Math.round(v.r), B = Math.round(v.b), tot = R + B || 1;
      const x0 = 40, x1 = w * .45, x2 = w * .85, y0 = h / 2;
      const p1R = R / tot, p1B = B / tot;
      const yR = y0 - h * .28, yB = y0 + h * .28;
      const line = (xa, ya, xb, yb, lab, p) => { ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xb, yb); ctx.stroke(); text(ctx, lab, (xa + xb) / 2, (ya + yb) / 2 - 8, { size: 12, weight: 700, align: "center", color: col }); };
      dot(ctx, x0, y0, 4, css("--ink"));
      line(x0, y0, x1, yR, p1R.toFixed(2), p1R); line(x0, y0, x1, yB, p1B.toFixed(2), p1B);
      dot(ctx, x1, yR, 4); dot(ctx, x1, yB, 4);
      text(ctx, "R", x1 - 14, yR + 4, { size: 12 }); text(ctx, "B", x1 - 14, yB + 4, { size: 12 });
      const after = (firstRed) => { let r2 = R, b2 = B; if (!repl) { if (firstRed) r2--; else b2--; } const t2 = r2 + b2 || 1; return [r2 / t2, b2 / t2]; };
      [[yR, true], [yB, false]].forEach(([y1, isRed]) => { const [pr, pb] = after(isRed); const yRR = y1 - h * .14, yBB = y1 + h * .14;
        line(x1, y1, x2, yRR, pr.toFixed(2), pr); line(x1, y1, x2, yBB, pb.toFixed(2), pb);
        text(ctx, "R", x2 + 14, yRR + 4, { size: 12 }); text(ctx, "B", x2 + 14, yBB + 4, { size: 12 });
        text(ctx, (p1R && isRed ? p1R : p1B).toFixed(2) + " × " + pr.toFixed(2) + " = " + ((isRed ? p1R : p1B) * pr).toFixed(3), x2 + 40, yRR, { size: 11, color: css("--muted") });
        text(ctx, (isRed ? p1R : p1B).toFixed(2) + " × " + pb.toFixed(2) + " = " + ((isRed ? p1R : p1B) * pb).toFixed(3), x2 + 40, yBB, { size: 11, color: css("--muted") });
      });
      const pRR = p1R * after(true)[0], pBB = p1B * after(false)[1];
      const pSame = pRR + pBB, pDiff = 1 - pSame;
      const msg = `${repl ? "<b>With</b> replacement: probabilities stay the same each time." : "<b>Without</b> replacement: probabilities change after the first pick (one fewer ball)."} P(both red) = ${pRR.toFixed(3)}, P(both blue) = ${pBB.toFixed(3)}. <b>P(same colour)</b> = ${pSame.toFixed(3)} (add the branches). <b>P(different colours)</b> = 1 − ${pSame.toFixed(3)} = ${pDiff.toFixed(3)}.`;
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };
  function rnd2(i, k) { return Math.abs(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1; }

  V._maths = { factor, gcd, sup };
})();
