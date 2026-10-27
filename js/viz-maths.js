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
    text(ctx, k2 > .5 ? "a⁶ ÷ a² = a⁴   (divide → SUBTRACT: 6 − 2)" : "a⁶ ÷ a²", x0 + 6 * bw + 20, y2 + bw + 6, { size: 15, weight: 700 });
  }, { h: 300, period: 7, caption: "Index laws come straight from counting the a's" });

  // ---------- Bounds on a number line ----------
  V.bounds = (host) => mount(host, (ctx, W, H, t, P) => {
    const k = seg(t, .5, 2.5), x0 = 40, x1 = W - 40, y = 120, lo = 6.5, hi = 8.5, X = (v) => x0 + (v - lo) / (hi - lo) * (x1 - x0);
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    for (let v = 6.5; v <= 8.501; v += .1) { const big = Math.abs(v * 2 - Math.round(v * 2)) < 1e-6; ctx.beginPath(); ctx.moveTo(X(v), y - (big ? 10 : 5)); ctx.lineTo(X(v), y + (big ? 10 : 5)); ctx.stroke(); if (big) text(ctx, v.toFixed(1), X(v), y + 28, { size: 12, align: "center" }); }
    const a = 7.5 - .5 * k, b = 7.5 + .5 * k;
    ctx.fillStyle = cs("--maths") + "33"; ctx.fillRect(X(a), y - 30, X(b) - X(a), 22); dot(ctx, X(7.5), y, 6, cs("--maths"));
    if (k > .95) { ctx.fillStyle = cs("--maths"); ctx.beginPath(); ctx.arc(X(7), y - 19, 6, 0, 7); ctx.fill(); ctx.strokeStyle = cs("--maths"); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X(8), y - 19, 6, 0, 7); ctx.stroke(); text(ctx, "7.5 ≤ x < 8.5", W / 2, y - 48, { size: 18, align: "center", weight: 700, color: cs("--maths") }); text(ctx, "lower bound 7.5 (included)", X(7), y + 56, { size: 12, align: "center" }); text(ctx, "upper bound 8.5 (not included)", X(8), y + 74, { size: 12, align: "center" }); }
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

  V._maths = { factor, gcd, sup };
})();
