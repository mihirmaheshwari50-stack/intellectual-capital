// Chemistry animations (extends VIZ) and interactive labs (extends DEMOS).
(() => {
  const { mount, text, arrow, dot, alpha, seg, cs, clamp, ease } = VIZ._lib;
  const V = VIZ;
  const rnd = (i, k) => Math.abs(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1;
  const bounce = (p, L) => { p = ((p % (2 * L)) + 2 * L) % (2 * L); return p > L ? 2 * L - p : p; };

  // ---------- Diffusion: two gases mixing after a partition is removed ----------
  V.diffusion = (host) => mount(host, (ctx, W, H, t, P) => {
    const x0 = 30, w = W - 60, y0 = 40, h = H - 80, open = t > 1.2, mix = clamp((t - 1.2) / (P - 2));
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2.5; ctx.strokeRect(x0, y0, w, h);
    if (!open) { ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0 + w / 2, y0); ctx.lineTo(x0 + w / 2, y0 + h); ctx.stroke(); }
    for (let i = 0; i < 60; i++) {
      const left = i < 30, L = (left ? w / 2 : w / 2) - 12, spread = open ? mix : 0, vx = 60 + 60 * rnd(i, 3), vy = 50 + 50 * rnd(i, 4);
      const range = L + spread * (w / 2), base = left ? x0 + 6 : x0 + w - 6 - range;
      const x = base + bounce(rnd(i, 1) * range + vx * t, range), y = y0 + 6 + bounce(rnd(i, 2) * (h - 12) + vy * t, h - 12);
      dot(ctx, x, y, 5, left ? cs("--physics") : cs("--maths"));
    }
    text(ctx, open ? "partition removed: random motion mixes the gases" : "two gases separated by a partition", 16, 24, { size: 13, weight: 600 });
    text(ctx, "net movement from high to low concentration until evenly mixed", 16, H - 12, { size: 12, color: cs("--muted") });
  }, { h: 280, period: 9, caption: "Diffusion: particles spread out because of their random motion" });

  // ---------- NH3 + HCl tube: lighter molecules diffuse faster ----------
  V.ammoniaTube = (host) => mount(host, (ctx, W, H, t, P) => {
    const x0 = 50, x1 = W - 50, y = H / 2, L = x1 - x0, k = clamp(t / (P * .7)), meet = x0 + L * .595;
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(x0, y - 20, L, 40, 18); ctx.stroke();
    ctx.fillStyle = cs("--muted"); ctx.fillRect(x0 - 16, y - 22, 16, 44); ctx.fillRect(x1, y - 22, 16, 44);
    text(ctx, "NH₃ (Mr 17)", x0 - 8, y - 32, { size: 12, weight: 700, color: cs("--maths") }); text(ctx, "HCl (Mr 36.5)", x1 + 8, y - 32, { size: 12, weight: 700, color: cs("--bad"), align: "right" });
    const fa = x0 + (meet - x0) * k, fb = x1 - (x1 - meet) * k;
    for (let i = 0; i < 26; i++) { const a = x0 + 4 + rnd(i, 1) * (fa - x0 - 4), b = fb + rnd(i, 2) * (x1 - fb - 4); dot(ctx, a, y - 12 + rnd(i, 3) * 24 + 2 * Math.sin(t * 9 + i), 3, cs("--maths")); dot(ctx, b, y - 12 + rnd(i, 4) * 24 + 2 * Math.cos(t * 9 + i), 3.5, cs("--bad")); }
    if (k >= 1) { ctx.fillStyle = "#fff"; ctx.strokeStyle = cs("--muted"); ctx.beginPath(); ctx.ellipse(meet, y, 10, 18, 0, 0, 7); ctx.fill(); ctx.stroke(); text(ctx, "white ring of NH₄Cl forms nearer the HCl end", meet, y + 46, { size: 12, align: "center", weight: 700 }); }
    text(ctx, "cotton wool soaked in ammonia", x0, H - 12, { size: 11, color: cs("--muted") }); text(ctx, "cotton wool soaked in hydrochloric acid", x1, H - 12, { size: 11, color: cs("--muted"), align: "right" });
  }, { h: 220, period: 8, caption: "Ammonia molecules are lighter, so they diffuse faster and travel further before meeting" });


  // ---------- Electrolysis cell: ions move, electrons flow in the wire ----------
  function cell(ctx, W, H, t, o) {
    const bx = W / 2 - 150, bw = 300, by = 80, bh = H - 120, ax = bx + 70, cx = bx + bw - 70, ink = cs("--ink");
    ctx.fillStyle = o.liq; ctx.fillRect(bx, by + 30, bw, bh - 30); ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by); ctx.stroke();
    [[ax, "+", "anode"], [cx, "−", "cathode"]].forEach(([x, sg, n]) => { ctx.fillStyle = o.elec || "#555"; ctx.fillRect(x - 9, by - 10, 18, bh - 10); text(ctx, n + " (" + sg + ")", x, by - 18, { size: 12, align: "center", weight: 700 }); });
    ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax, by - 10); ctx.lineTo(ax, 26); ctx.lineTo(cx, 26); ctx.lineTo(cx, by - 10); ctx.stroke();
    ctx.fillStyle = cs("--surface"); ctx.fillRect(W / 2 - 22, 14, 44, 24); ctx.strokeRect(W / 2 - 22, 14, 44, 24); text(ctx, "d.c.", W / 2, 31, { size: 11, align: "center", weight: 600 });
    for (let k = 0; k < 6; k++) { const f = ((t * .5 + k / 6) % 1), L = (cx - ax) + 2 * (by - 36), d = f * L; let x, y; if (d < by - 36) { x = ax; y = by - 10 - d; } else if (d < by - 36 + (cx - ax)) { x = ax + d - (by - 36); y = 26; } else { x = cx; y = 26 + (d - (by - 36) - (cx - ax)); } dot(ctx, x, y, 3, cs("--physics"), 8); }
    text(ctx, "electrons →", W / 2 + 70, 22, { size: 11, color: cs("--physics") });
    for (let i = 0; i < 14; i++) { const pos = i < 7, f = ((t * .35 + rnd(i, 1)) % 1), y = by + 50 + rnd(i, 2) * (bh - 80);
      const x = pos ? cx - 14 - (1 - f) * (cx - ax - 28) * .9 : ax + 14 + (1 - f) * (cx - ax - 28) * .9;
      dot(ctx, x, y, pos ? 7 : 6, pos ? o.cat : o.an); text(ctx, pos ? o.catL : o.anL, x, y + 3.5, { size: 8, align: "center", color: "#fff", weight: 700 }); }
    if (o.gasA) for (let i = 0; i < 6; i++) { const f = ((t * .8 + i / 6) % 1); alpha(ctx, 1 - f, () => { ctx.strokeStyle = o.gasA; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(ax + 14 + rnd(i, 3) * 6, by + bh - 30 - f * (bh - 60), 3 + f * 2, 0, 7); ctx.stroke(); }); }
    if (o.gasC) for (let i = 0; i < 6; i++) { const f = ((t * .8 + i / 6 + .5) % 1); alpha(ctx, 1 - f, () => { ctx.strokeStyle = o.gasC; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx - 14 - rnd(i, 4) * 6, by + bh - 30 - f * (bh - 60), 3 + f * 2, 0, 7); ctx.stroke(); }); }
    if (o.metalC) { ctx.fillStyle = o.metalC; ctx.fillRect(cx - 12, by + 40, 4, bh - 70); }
    if (o.dissolveA) { ctx.fillStyle = cs("--surface"); ctx.fillRect(ax + 6, by + 60, 3, bh - 100); }
    text(ctx, "anode: " + o.anP, 12, by + bh + 20, { size: 12, weight: 600, color: cs("--physics") }); text(ctx, "cathode: " + o.catP, W - 12, by + bh + 37, { size: 12, weight: 600, align: "right", color: cs("--maths") });
  }
  V.electrolysis = (host) => mount(host, (ctx, W, H, t) => cell(ctx, W, H, t, { liq: "#f0a65a55", cat: "#7a7a7a", catL: "Pb²⁺", an: "#b5532a", anL: "Br⁻", gasA: "#b5532a", metalC: "#888", anP: "brown bromine vapour", catP: "silver lead" }),
    { h: 320, period: 8, caption: "Molten lead(II) bromide: positive ions move to the cathode, negative ions to the anode" });

  // ---------- Interactive: predict the products ----------
  const { setup, readout, loop, typeset, css } = DEMOS._lib;
  const SYS = [
    { n: "molten lead(II) bromide", o: { liq: "#f0a65a55", cat: "#7a7a7a", catL: "Pb²⁺", an: "#b5532a", anL: "Br⁻", gasA: "#b5532a", metalC: "#888", anP: "bromine (red-brown vapour)", catP: "lead (silver beads)" }, txt: "Molten: the only ions are Pb²⁺ and Br⁻. Cathode: $\\text{Pb}^{2+}+2e^-\\rightarrow\\text{Pb}$. Anode: $2\\text{Br}^-\\rightarrow\\text{Br}_2+2e^-$." },
    { n: "concentrated NaCl(aq)", o: { liq: "#8fb7ff33", cat: "#4a7bd1", catL: "H⁺", an: "#2a9a6a", anL: "Cl⁻", gasA: "#6fae3a", gasC: "#999", anP: "chlorine (bleaches damp litmus)", catP: "hydrogen (pops)" }, txt: "Ions: Na⁺, H⁺, Cl⁻, OH⁻. Cathode: hydrogen, because Na is more reactive than H: $2\\text{H}^++2e^-\\rightarrow\\text{H}_2$. Anode: concentrated chloride gives chlorine: $2\\text{Cl}^-\\rightarrow\\text{Cl}_2+2e^-$. Left behind: sodium hydroxide solution." },
    { n: "dilute H₂SO₄", o: { liq: "#8fb7ff33", cat: "#4a7bd1", catL: "H⁺", an: "#c06030", anL: "OH⁻", gasA: "#999", gasC: "#999", anP: "oxygen (relights glowing splint)", catP: "hydrogen (pops)" }, txt: "Ions: H⁺, OH⁻, SO₄²⁻. Cathode: $2\\text{H}^++2e^-\\rightarrow\\text{H}_2$. Anode: no halide, so oxygen from hydroxide ions: $4\\text{OH}^-\\rightarrow\\text{O}_2+2\\text{H}_2\\text{O}+4e^-$. Twice as much hydrogen as oxygen: water is decomposed." },
    { n: "CuSO₄(aq), graphite electrodes", o: { liq: "#3b8bd955", cat: "#b87333", catL: "Cu²⁺", an: "#c06030", anL: "OH⁻", gasA: "#999", metalC: "#b87333", anP: "oxygen bubbles", catP: "pink copper coating" }, txt: "Cathode: copper (less reactive than hydrogen): $\\text{Cu}^{2+}+2e^-\\rightarrow\\text{Cu}$. Anode: oxygen. The blue colour fades as Cu²⁺ ions are used up; the solution becomes acidic." },
    { n: "CuSO₄(aq), copper electrodes", o: { liq: "#3b8bd955", cat: "#b87333", catL: "Cu²⁺", an: "#b87333", anL: "Cu²⁺", metalC: "#b87333", elec: "#b87333", dissolveA: true, anP: "copper dissolves (anode gets thinner)", catP: "copper deposited (cathode gets thicker)" }, txt: "Anode: $\\text{Cu}\\rightarrow\\text{Cu}^{2+}+2e^-$ (the anode itself is oxidised). Cathode: $\\text{Cu}^{2+}+2e^-\\rightarrow\\text{Cu}$. The blue colour stays the same. This is how copper is purified." },
    { n: "dilute NaCl(aq)", o: { liq: "#8fb7ff22", cat: "#4a7bd1", catL: "H⁺", an: "#c06030", anL: "OH⁻", gasA: "#999", gasC: "#999", anP: "mainly oxygen", catP: "hydrogen" }, txt: "Dilute: too few Cl⁻ ions, so oxygen is formed at the anode instead of chlorine. Cathode: hydrogen." }
  ];
  DEMOS.electrolysis = (root, col) => {
    const { ctx, size, W, H } = setup(root, 320); let k = 0;
    const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px";
    segEl.innerHTML = SYS.map((x, i) => `<button aria-pressed="${i === 0}" data-i="${i}">${x.n}</button>`).join("");
    segEl.onclick = e => { const bt = e.target.closest("button"); if (!bt) return; k = +bt.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === bt)); };
    root.appendChild(segEl); const out = readout(root); let last = -1;
    return loop((tt) => { size(); ctx.clearRect(0, 0, W(), H()); cell(ctx, W(), H(), tt, SYS[k].o); if (k !== last) { out.innerHTML = SYS[k].txt; typeset(out); last = k; } });
  };

  // ---------- Bond breaking then making: H2 + Cl2 -> 2HCl ----------
  V.bondEnergy = (host) => mount(host, (ctx, W, H, t, P) => {
    const ph = t / P, gx = 40, gw = W - 80, base = H - 50, sc = (H - 110) / 700;
    const lv = { R: base - 300 * sc, A: base - (300 + 679) * sc + 0, P: base - (300 - 184) * sc };
    // levels relative: reactants 0, atoms +679 (436+243), products -184
    const Y = (e) => base - 120 * sc - 0 - (e + 184) * sc * .55 - 40;
    const yR = Y(0), yA = Y(679), yP = Y(-185), x1 = gx + gw * .08, x2 = gx + gw * .42, x3 = gx + gw * .76;
    const lvl = (x, y, lab, c) => { ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + gw * .18, y); ctx.stroke(); text(ctx, lab, x + gw * .09, y - 8, { size: 12, align: "center", weight: 700, color: c }); };
    lvl(x1, yR, "H₂ + Cl₂", cs("--ink")); if (ph > .15) lvl(x2, yA, "2H + 2Cl (atoms)", cs("--muted")); if (ph > .55) lvl(x3, yP, "2HCl", cs("--chem"));
    if (ph > .15) { const k = clamp((ph - .15) / .25); arrow(ctx, x1 + gw * .18, yR, x1 + gw * .18 + (x2 - x1 - gw * .18) * k, yR + (yA - yR) * k, cs("--bad"), 3); if (k > .9) text(ctx, "break bonds: +679 kJ", (x1 + gw * .18 + x2) / 2 - 10, (yR + yA) / 2, { size: 12, color: cs("--bad"), weight: 600, align: "right" }); text(ctx, "(endothermic)", (x1 + gw * .18 + x2) / 2 - 10, (yR + yA) / 2 + 15, { size: 11, color: cs("--bad"), align: "right" }); }
    if (ph > .55) { const k = clamp((ph - .55) / .25); arrow(ctx, x2 + gw * .18, yA, x2 + gw * .18 + (x3 - x2 - gw * .18) * k, yA + (yP - yA) * k, cs("--chem"), 3); if (k > .9) text(ctx, "make bonds: −864 kJ (exothermic)", (x2 + x3) / 2 + 60, (yA + yP) / 2 - 20, { size: 12, color: cs("--chem"), weight: 600 }); }
    if (ph > .85) { ctx.strokeStyle = cs("--maths"); ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x1 + gw * .18, yR); ctx.lineTo(x3 + gw * .2, yR); ctx.stroke(); ctx.setLineDash([]); arrow(ctx, x3 + gw * .2, yR, x3 + gw * .2, yP, cs("--maths"), 2); text(ctx, "ΔH = 679 − 864 = −185 kJ/mol", x3 + gw * .2 - 4, yP + 22, { size: 13, weight: 700, color: cs("--maths"), align: "right" }); }
    text(ctx, "energy", 12, 20, { size: 12, color: cs("--muted") });
  }, { h: 320, period: 9, caption: "More energy is released making the new bonds than is taken in breaking the old ones: exothermic" });

  // ---------- Interactive: bond energy calculator ----------
  const BE = { "H–H": 436, "Cl–Cl": 243, "H–Cl": 432, "O=O": 498, "O–H": 464, "C–H": 413, "C=O": 805, "N≡N": 945, "N–H": 391, "C=C": 612, "C–C": 347, "Br–Br": 193, "C–Br": 290 };
  const RX = [
    { n: "H₂ + Cl₂ → 2HCl", br: [["H–H", 1], ["Cl–Cl", 1]], mk: [["H–Cl", 2]] },
    { n: "2H₂ + O₂ → 2H₂O", br: [["H–H", 2], ["O=O", 1]], mk: [["O–H", 4]] },
    { n: "CH₄ + 2O₂ → CO₂ + 2H₂O", br: [["C–H", 4], ["O=O", 2]], mk: [["C=O", 2], ["O–H", 4]] },
    { n: "N₂ + 3H₂ → 2NH₃", br: [["N≡N", 1], ["H–H", 3]], mk: [["N–H", 6]] },
    { n: "C₂H₄ + Br₂ → C₂H₄Br₂", br: [["C=C", 1], ["Br–Br", 1]], mk: [["C–C", 1], ["C–Br", 2]] },
    { n: "2NH₃ → N₂ + 3H₂", br: [["N–H", 6]], mk: [["N≡N", 1], ["H–H", 3]] }
  ];
  DEMOS.bondenergy = (root, col) => {
    const { ctx, size, W, H } = setup(root, 260); let k = 0;
    const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px";
    segEl.innerHTML = RX.map((x, i) => `<button aria-pressed="${i === 0}" data-i="${i}">${x.n}</button>`).join("");
    segEl.onclick = e => { const bt = e.target.closest("button"); if (!bt) return; k = +bt.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === bt)); };
    root.appendChild(segEl); const out = readout(root); let last = -1;
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h); const r = RX[k], inE = r.br.reduce((a, [b, n]) => a + BE[b] * n, 0), outE = r.mk.reduce((a, [b, n]) => a + BE[b] * n, 0), dH = inE - outE;
      const mx = Math.max(inE, outE), bw = (w - 120) / 2, sc = (h - 60) / mx;
      ctx.fillStyle = css("--bad"); ctx.fillRect(60, h - 30 - inE * sc, bw * .6, inE * sc); ctx.fillStyle = css("--chem"); ctx.fillRect(60 + bw, h - 30 - outE * sc, bw * .6, outE * sc);
      ctx.fillStyle = css("--ink"); ctx.font = "600 13px Inter, sans-serif"; ctx.fillText("bonds broken: +" + inE + " kJ", 60, h - 36 - inE * sc); ctx.fillText("bonds made: −" + outE + " kJ", 60 + bw, h - 36 - outE * sc);
      if (k !== last) { const list = (a) => a.map(([b, n]) => `${n} × ${b} (${BE[b]})`).join(" + ");
        out.innerHTML = `Broken: ${list(r.br)} = <b>${inE}</b> kJ. Made: ${list(r.mk)} = <b>${outE}</b> kJ. $\\Delta H = ${inE} - ${outE} = ${dH > 0 ? "+" : ""}${dH}$ kJ/mol: <b>${dH < 0 ? "exothermic" : "endothermic"}</b>.`; typeset(out); last = k; }
    });
  };

  // ---------- Dynamic equilibrium: A ⇌ B, concentrations level off ----------
  V.equilibrium = (host) => mount(host, (ctx, W, H, t, P) => {
    const kf = .5, kr = .25, A = (s) => (kr + kf * Math.exp(-(kf + kr) * s)) / (kf + kr), tt = Math.min(t, P - .5);
    const bx = 20, bw = W * .42, by = 30, bh = H - 70, n = 40, a = A(tt);
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh); text(ctx, "closed flask", bx + bw / 2, by + bh + 18, { size: 11, align: "center", color: cs("--muted") });
    for (let i = 0; i < n; i++) { const isA = (i / n) < a, x = bx + 8 + bounce(rnd(i, 1) * (bw - 16) + (60 + 40 * rnd(i, 3)) * t, bw - 16), y = by + 8 + bounce(rnd(i, 2) * (bh - 16) + (50 + 40 * rnd(i, 4)) * t, bh - 16);
      dot(ctx, x, y, 6, isA ? cs("--maths") : cs("--physics")); }
    const gx = bx + bw + 50, gw = W - gx - 20, gy = by, gh = bh;
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
    text(ctx, "concentration", gx + 6, gy + 6, { size: 11, color: cs("--muted") }); text(ctx, "time", gx + gw, gy + gh + 16, { size: 11, color: cs("--muted"), align: "right" });
    const X = (s) => gx + s / P * gw, Y = (c) => gy + gh - c * gh * .9;
    [[A, cs("--maths"), "reactant A"], [(s) => 1 - A(s), cs("--physics"), "product B"]].forEach(([f, c, l]) => { ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.beginPath(); for (let s2 = 0; s2 <= tt; s2 += .05) { s2 ? ctx.lineTo(X(s2), Y(f(s2))) : ctx.moveTo(X(s2), Y(f(s2))); } ctx.stroke(); text(ctx, l, X(tt) + 6, Y(f(tt)) + 4, { size: 11, color: c, weight: 600 }); });
    if (tt > 6) text(ctx, "equilibrium: rates equal, concentrations constant", gx, gy - 10, { size: 12, weight: 700, color: cs("--chem") });
  }, { h: 300, period: 12, caption: "Reactions never stop at equilibrium: A turns into B and B into A at the same rate" });

  // ---------- Interactive: Haber process conditions ----------
  DEMOS.haber = (root, col) => {
    const { ctx, size, W, H } = setup(root, 280);
    const v = DEMOS._lib.controls(root, [{ key: "T", label: "temperature (°C)", min: 300, max: 600, step: 10, value: 450 }, { key: "P", label: "pressure (atm)", min: 25, max: 400, step: 5, value: 200 }]);
    const out = readout(root); let last = "";
    const yieldOf = (T, P) => 100 * P / (P + 200 * Math.exp(.0086 * (T - 350))), rateOf = (T) => Math.exp((T - 450) / 45);
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h); const gx = 50, gy = 20, gw = w - 90, gh = h - 60;
      ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
      ctx.fillStyle = css("--ink"); ctx.font = "12px Inter, sans-serif"; ctx.fillText("% ammonia at equilibrium", gx + 6, gy + 10); ctx.fillText("pressure (atm) →", gx + gw - 100, gy + gh + 18);
      [[350, css("--maths")], [450, col], [550, css("--bad")]].forEach(([T, c]) => { ctx.strokeStyle = c; ctx.lineWidth = T === 450 ? 3 : 2; ctx.beginPath(); for (let P = 0; P <= 400; P += 5) { const X = gx + P / 400 * gw, Y = gy + gh - yieldOf(T, P) / 80 * gh; P ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); ctx.fillStyle = c; ctx.fillText(T + " °C", gx + gw - 44, gy + gh - yieldOf(T, 400) / 80 * gh - 6); });
      const y = yieldOf(v.T, v.P); dot(ctx, gx + v.P / 400 * gw, gy + gh - y / 80 * gh, 7, css("--ink"), 10);
      const r = rateOf(v.T), txt = `At ${v.T} °C and ${v.P} atm: about <b>${y.toFixed(0)}%</b> ammonia at equilibrium, reached ${r > 1.5 ? "quickly" : r < .6 ? "very slowly" : "at a reasonable rate"} (relative rate ×${r.toFixed(1)} with the iron catalyst). Lower temperature gives a higher yield (forward reaction is exothermic) but a slower rate. Higher pressure gives a higher yield (4 molecules of gas → 2) and a faster rate, but costs more and is more dangerous. 450 °C and 200 atm is the compromise. (Yields approximate.)`;
      if (txt !== last) { out.innerHTML = txt; last = txt; }
    });
  };

  // ---------- Redox: zinc in copper(II) sulfate — electron transfer ----------
  V.redox = (host) => mount(host, (ctx, W, H, t, P) => {
    const ph = t / P, zx = W * .3, cx = W * .66, y = H / 2, k = clamp((ph - .15) / .45);
    // zinc atom -> Zn2+
    const zr = 26 - 6 * k; ctx.fillStyle = cs("--muted"); ctx.beginPath(); ctx.arc(zx, y, zr, 0, 7); ctx.fill();
    text(ctx, k < .5 ? "Zn" : "Zn²⁺", zx, y + 5, { size: 15, align: "center", weight: 700, color: "#fff" });
    // copper ion -> Cu atom
    ctx.fillStyle = k < .5 ? cs("--maths") : "#b87333"; ctx.beginPath(); ctx.arc(cx, y, 20 + 6 * k, 0, 7); ctx.fill();
    text(ctx, k < .5 ? "Cu²⁺" : "Cu", cx, y + 5, { size: 15, align: "center", weight: 700, color: "#fff" });
    for (let e = 0; e < 2; e++) { const f = clamp(k * 1.1 - e * .1), x = zx + 34 + (cx - zx - 68) * f, yy = y - 40 - 30 * Math.sin(f * Math.PI) + e * 14; dot(ctx, x, yy, 5, cs("--physics"), 10); text(ctx, "e⁻", x + 8, yy - 6, { size: 11, color: cs("--physics") }); }
    if (k > .9) { text(ctx, "Zn → Zn²⁺ + 2e⁻", zx, y + 60, { size: 13, align: "center", weight: 700 }); text(ctx, "loses electrons: OXIDISED", zx, y + 78, { size: 12, align: "center", color: cs("--bad"), weight: 600 }); text(ctx, "(zinc is the reducing agent)", zx, y + 94, { size: 11, align: "center", color: cs("--muted") });
      text(ctx, "Cu²⁺ + 2e⁻ → Cu", cx, y + 60, { size: 13, align: "center", weight: 700 }); text(ctx, "gains electrons: REDUCED", cx, y + 78, { size: 12, align: "center", color: cs("--maths"), weight: 600 }); text(ctx, "(Cu²⁺ is the oxidising agent)", cx, y + 94, { size: 11, align: "center", color: cs("--muted") }); }
    text(ctx, "Zn + CuSO₄ → ZnSO₄ + Cu: blue solution fades, pink copper forms on the zinc", 16, 22, { size: 12, weight: 600 });
  }, { h: 280, period: 6, caption: "Oxidation and reduction always happen together: the electrons lost by one are gained by the other" });

  // ---------- Neutralisation at particle level ----------
  V.neutralise = (host) => mount(host, (ctx, W, H, t, P) => {
    const n = 10, x0 = 30, w = W - 60, y0 = 40, h = H - 80, k = clamp(t / (P * .7));
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.strokeRect(x0, y0, w, h);
    for (let i = 0; i < n; i++) { const done = (i + .5) / n < k, cx = x0 + 40 + (i % 5) * (w - 80) / 4, cy = y0 + 50 + Math.floor(i / 5) * (h - 100);
      if (!done) { const off = 34 * (1 - Math.max(0, (k * n - i) * 2)); dot(ctx, cx - Math.max(10, off), cy + 3 * Math.sin(t * 5 + i), 10, cs("--bad")); text(ctx, "H⁺", cx - Math.max(10, off), cy + 4 + 3 * Math.sin(t * 5 + i), { size: 10, align: "center", color: "#fff", weight: 700 }); dot(ctx, cx + Math.max(10, off), cy + 3 * Math.cos(t * 5 + i), 12, cs("--maths")); text(ctx, "OH⁻", cx + Math.max(10, off), cy + 4 + 3 * Math.cos(t * 5 + i), { size: 9, align: "center", color: "#fff", weight: 700 }); }
      else { dot(ctx, cx, cy, 14, cs("--chem")); text(ctx, "H₂O", cx, cy + 4, { size: 10, align: "center", color: "#fff", weight: 700 }); } }
    for (let i = 0; i < 6; i++) { const x = x0 + 30 + i * (w - 60) / 5, y = y0 + h / 2 + 8 * Math.sin(t * 3 + i); dot(ctx, x, y, 7, cs("--muted")); text(ctx, i % 2 ? "Na⁺" : "Cl⁻", x, y + 3, { size: 8, align: "center", color: "#fff", weight: 700 }); }
    text(ctx, "H⁺(aq) + OH⁻(aq) → H₂O(l)", 16, 24, { size: 14, weight: 700 }); text(ctx, "Na⁺ and Cl⁻ are spectator ions: they stay in solution as the salt", W - 16, H - 12, { size: 12, align: "right", color: cs("--muted") });
  }, { h: 260, period: 7, caption: "Neutralisation: hydrogen ions from the acid combine with hydroxide ions from the alkali" });

  // ---------- Interactive: titration ----------
  DEMOS.titration = (root, col) => {
    const { ctx, size, W, H } = setup(root, 340); let ind = 0, added = 0, running = false, tp = 0;
    const inds = [["phenolphthalein", (pH) => pH < 8.2 ? "#ffffff00" : pH < 10 ? `rgba(220,60,160,${(pH - 8.2) / 1.8 * .6})` : "rgba(220,60,160,.6)"], ["methyl orange", (pH) => pH < 3.1 ? "rgba(220,50,40,.55)" : pH < 4.4 ? "rgba(235,120,40,.55)" : "rgba(240,200,40,.55)"], ["universal indicator", (pH) => `hsla(${Math.min(280, Math.max(0, (pH - 1) / 13 * 280))},75%,50%,.5)`]];
    const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px";
    segEl.innerHTML = inds.map(([n], i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const bt = e.target.closest("button"); if (!bt) return; ind = +bt.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === bt)); };
    const bar = document.createElement("div"); bar.style.cssText = "display:flex;gap:8px;margin-top:10px;flex-wrap:wrap";
    bar.innerHTML = `<button class="btn small" data-a="run">Open tap</button><button class="btn ghost small" data-a="drop">Add 1 drop</button><button class="btn ghost small" data-a="reset">Refill</button>`;
    bar.onclick = e => { const a = e.target.closest("[data-a]")?.dataset.a; if (a === "run") { running = !running; e.target.textContent = running ? "Close tap" : "Open tap"; } if (a === "drop") added = Math.min(50, added + .05); if (a === "reset") { added = 0; running = false; bar.querySelector('[data-a="run"]').textContent = "Open tap"; } };
    root.appendChild(segEl); root.appendChild(bar); const out = readout(root); let last = "";
    // 25.0 cm³ of 0.100 mol/dm³ HCl with 0.100 mol/dm³ NaOH: end-point at 25.0 cm³
    const pHof = (v) => { const nA = .0025 - .0001 * v, V = (25 + v) / 1000; if (Math.abs(nA) < 1e-7) return 7; return nA > 0 ? -Math.log10(nA / V) : 14 + Math.log10(-nA / V); };
    return loop((tt) => {
      size(); const w = W(), h = H(), dt = Math.min(.05, tt - tp); tp = tt; ctx.clearRect(0, 0, w, h); if (running) added = Math.min(50, added + dt * (Math.abs(added - 25) < 2 ? .4 : 2.5));
      const pH = pHof(added), bx = 90;
      // burette
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2; ctx.strokeRect(bx - 8, 10, 16, 200); ctx.fillStyle = css("--maths") + "33"; ctx.fillRect(bx - 7, 11 + added / 50 * 198, 14, 198 - added / 50 * 198);
      for (let i = 0; i <= 10; i++) { ctx.beginPath(); ctx.moveTo(bx + 8, 10 + i * 20); ctx.lineTo(bx + 14, 10 + i * 20); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(bx, 210); ctx.lineTo(bx, 236); ctx.stroke(); ctx.fillStyle = css("--ink"); ctx.fillRect(bx - 10, 214, 20, 6);
      if (running && Math.floor(tt * 6) % 2) dot(ctx, bx, 246, 3, css("--maths"));
      // conical flask
      ctx.beginPath(); ctx.moveTo(bx - 14, 252); ctx.lineTo(bx - 14, 268); ctx.lineTo(bx - 52, h - 14); ctx.lineTo(bx + 52, h - 14); ctx.lineTo(bx + 14, 268); ctx.lineTo(bx + 14, 252); ctx.stroke();
      const liq = () => { ctx.beginPath(); ctx.moveTo(bx - 34, h - 50); ctx.lineTo(bx - 52, h - 14); ctx.lineTo(bx + 52, h - 14); ctx.lineTo(bx + 34, h - 50); ctx.fill(); };
      ctx.fillStyle = css("--maths") + "18"; liq(); ctx.fillStyle = inds[ind][1](pH); liq();
      ctx.fillStyle = css("--ink"); ctx.font = "12px Inter, sans-serif"; ctx.fillText(added.toFixed(2) + " cm³ added", bx + 22, 30); ctx.fillText("NaOH(aq)", bx + 22, 48);
      // pH curve
      const gx = 260, gw = w - gx - 20, gy = 16, gh = h - 50; ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
      ctx.fillText("pH", gx + 8, gy + 10); ctx.textAlign = "right"; for (const p of [0, 7, 14]) ctx.fillText(p, gx - 6, gy + gh - p / 14 * gh + 4); ctx.textAlign = "center"; ctx.fillText("25.0", gx + gw / 2, gy + gh + 18); ctx.textAlign = "left"; ctx.fillText("volume of NaOH / cm³", gx + gw - 130, gy + gh + 18);
      ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(gx + 25 / 50 * gw, gy); ctx.lineTo(gx + 25 / 50 * gw, gy + gh); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); for (let v = 0; v <= added + 1e-9; v += .1) { const X = gx + v / 50 * gw, Y = gy + gh - pHof(v) / 14 * gh; v ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); dot(ctx, gx + added / 50 * gw, gy + gh - pH / 14 * gh, 5, col, 10);
      const txt = `pH ${pH.toFixed(1)}. Flask: 25.0 cm³ of 0.100 mol/dm³ HCl. Burette: 0.100 mol/dm³ NaOH. ${added < 24.5 ? "Still acidic." : added <= 25.5 ? "<b>End-point!</b> The indicator changes colour at the steep part of the curve (25.0 cm³). Close the tap and read the burette." : "Overshot: now alkaline. Refill and add dropwise near the end-point."}`;
      if (txt !== last) { out.innerHTML = txt; last = txt; }
    });
  };
  // ---------- Group I metals with water: vigour increases down the group ----------
  V.alkaliWater = (host) => mount(host, (ctx, W, H, t, P) => {
    const ms = [["Li", "lithium", .35, null, "fizzes steadily, floats"], ["Na", "sodium", .7, null, "melts into a ball, darts about"], ["K", "potassium", 1, "#b07ae0", "lilac flame, may spit"]];
    const cw = (W - 40) / 3, wy = H * .55;
    ms.forEach(([s, n, v, fl, d], i) => {
      const x0 = 20 + i * cw, cx = x0 + cw / 2;
      ctx.fillStyle = cs("--maths") + "22"; ctx.fillRect(x0 + 10, wy, cw - 20, H - wy - 50); ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 + 10, wy - 30); ctx.lineTo(x0 + 10, H - 50); ctx.lineTo(x0 + cw - 10, H - 50); ctx.lineTo(x0 + cw - 10, wy - 30); ctx.stroke();
      const sz = (14 - 6 * clamp(t / P * v * 1.3)) * (i ? .9 : 1), dx = i ? Math.sin(t * (2 + 3 * v)) * (cw / 2 - 30) * v : Math.sin(t) * 6, px = cx + dx;
      if (sz > 4) { ctx.fillStyle = "#c9c9cf"; ctx.beginPath(); i ? ctx.arc(px, wy - sz * .3, sz, 0, 7) : ctx.rect(px - sz, wy - sz * .8, sz * 2, sz * 1.2); ctx.fill(); ctx.strokeStyle = cs("--muted"); ctx.stroke(); }
      for (let b = 0; b < 4 + 10 * v; b++) { const ph = (t * (1 + 2 * v) + rnd(b, i)) % 1, bx = px + (rnd(b, i + 5) - .5) * 26, by = wy - 6 - ph * 50 * v - 10; ctx.globalAlpha = 1 - ph; ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(bx, by, 2 + 2 * rnd(b, 9), 0, 7); ctx.stroke(); ctx.globalAlpha = 1; }
      if (fl && sz > 4) for (let f = 0; f < 5; f++) { const h = 22 + 10 * Math.sin(t * 13 + f * 2); ctx.fillStyle = fl + "88"; ctx.beginPath(); ctx.ellipse(px + (f - 2) * 4, wy - sz - h / 2, 5, h / 2, 0, 0, 7); ctx.fill(); }
      text(ctx, s + ": " + n, cx, H - 28, { size: 14, align: "center", weight: 700 }); text(ctx, d, cx, H - 10, { size: 11, align: "center", color: cs("--muted") });
    });
    text(ctx, "2M(s) + 2H₂O(l) → 2MOH(aq) + H₂(g)", 16, 22, { size: 13, weight: 700 }); text(ctx, "more reactive down the group →", W - 16, 22, { size: 12, align: "right", color: cs("--bad"), weight: 600 });
  }, { h: 300, period: 8, caption: "Lithium, sodium and potassium in water: all fizz (hydrogen) and form an alkaline hydroxide, faster down the group" });

  // ---------- Halogen displacement: chlorine + bromide ----------
  V.halogenDisplace = (host) => mount(host, (ctx, W, H, t, P) => {
    const k = clamp((t / P - .15) / .55), tx = W * .2, y0 = 50, th = H - 100;
    // test tube colour colourless -> orange
    ctx.fillStyle = `rgba(${Math.round(255 - 30 * k)},${Math.round(255 - 120 * k)},${Math.round(255 - 230 * k)},.8)`; ctx.fillRect(tx - 18, y0 + th * .35, 36, th * .65 - 18); ctx.beginPath(); ctx.arc(tx, y0 + th - 18, 18, 0, Math.PI); ctx.fill();
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(tx - 18, y0); ctx.lineTo(tx - 18, y0 + th - 18); ctx.arc(tx, y0 + th - 18, 18, Math.PI, 0, true); ctx.lineTo(tx + 18, y0); ctx.stroke();
    text(ctx, k < .5 ? "colourless KBr(aq)" : "orange: Br₂ formed", tx, H - 26, { size: 12, align: "center", weight: 600 });
    if (t / P < .3) { const dy = (t / P / .3) * th * .3; ctx.fillStyle = "#c8d84a"; ctx.beginPath(); ctx.arc(tx, y0 + dy, 4, 0, 7); ctx.fill(); text(ctx, "add Cl₂(aq)", tx + 26, y0 + 10, { size: 12, color: cs("--muted") }); }
    // particle view
    const px = W * .4, R = W - 30 - px, y = H / 2;
    const at = (x, yy, r, c, l) => { dot(ctx, x, yy, r, c); text(ctx, l, x, yy + 4, { size: 11, align: "center", color: "#fff", weight: 700 }); };
    const green = "#7a9a1e", orange = "#c0562a";
    // Cl2 splits into 2 Cl-, 2 Br- become Br2
    const cl1 = [px + R * .12, y - 50], cl2 = [px + R * .12 + 30 + R * .3 * k, y - 50], br1 = [px + R * (.5 + .1 * k), y + 50], br2 = [px + R * (.95 - .35 * k) + 36 * k, y + 50];
    if (k < .99) ctx.strokeStyle = green, ctx.lineWidth = 3 * (1 - k), ctx.beginPath(), ctx.moveTo(...cl1), ctx.lineTo(...cl2), ctx.stroke();
    if (k > .01) ctx.strokeStyle = orange, ctx.lineWidth = 3 * k, ctx.beginPath(), ctx.moveTo(...br1), ctx.lineTo(...br2), ctx.stroke();
    at(...cl1, 15, green, k > .5 ? "Cl⁻" : "Cl"); at(...cl2, 15, green, k > .5 ? "Cl⁻" : "Cl"); at(...br1, 18, orange, k > .5 ? "Br" : "Br⁻"); at(...br2, 18, orange, k > .5 ? "Br" : "Br⁻");
    for (let e = 0; e < 2; e++) { const f = clamp(k * 1.2 - e * .2), sx = (e ? br2 : br1)[0], sy = y + 30, ex = (e ? cl2 : cl1)[0], ey = y - 28; if (f > 0 && f < 1) { const x = sx + (ex - sx) * f, yy = sy + (ey - sy) * f; dot(ctx, x, yy, 5, cs("--physics"), 10); text(ctx, "e⁻", x + 8, yy, { size: 11, color: cs("--physics") }); } }
    if (k > .95) { text(ctx, "Cl₂ + 2e⁻ → 2Cl⁻  (reduced)", px + 10, y - 86, { size: 12, weight: 700, color: green }); text(ctx, "2Br⁻ → Br₂ + 2e⁻  (oxidised)", px + 10, y + 96, { size: 12, weight: 700, color: orange }); }
    text(ctx, "Cl₂ + 2KBr → 2KCl + Br₂: a more reactive halogen displaces a less reactive one", 16, 22, { size: 12, weight: 600 });
  }, { h: 320, period: 7, caption: "Chlorine is more reactive than bromine, so it takes electrons from bromide ions" });

  // ---------- Interactive: periodic table explorer (Z = 1–36) ----------
  DEMOS.ptable = (root, col) => {
    // [Z, sym, name, group(0 = transition), period, mp °C, type m/n/s(metalloid), state at 20 °C]
    const E = [[1,"H","hydrogen",1,1,-259,"n","g"],[2,"He","helium",8,1,-272,"n","g"],[3,"Li","lithium",1,2,181,"m","s"],[4,"Be","beryllium",2,2,1287,"m","s"],[5,"B","boron",3,2,2076,"s","s"],[6,"C","carbon",4,2,3550,"n","s"],[7,"N","nitrogen",5,2,-210,"n","g"],[8,"O","oxygen",6,2,-218,"n","g"],[9,"F","fluorine",7,2,-220,"n","g"],[10,"Ne","neon",8,2,-249,"n","g"],
      [11,"Na","sodium",1,3,98,"m","s"],[12,"Mg","magnesium",2,3,650,"m","s"],[13,"Al","aluminium",3,3,660,"m","s"],[14,"Si","silicon",4,3,1414,"s","s"],[15,"P","phosphorus",5,3,44,"n","s"],[16,"S","sulfur",6,3,115,"n","s"],[17,"Cl","chlorine",7,3,-102,"n","g"],[18,"Ar","argon",8,3,-189,"n","g"],
      [19,"K","potassium",1,4,63,"m","s"],[20,"Ca","calcium",2,4,842,"m","s"],[21,"Sc","scandium",0,4,1541,"m","s"],[22,"Ti","titanium",0,4,1668,"m","s"],[23,"V","vanadium",0,4,1910,"m","s"],[24,"Cr","chromium",0,4,1907,"m","s"],[25,"Mn","manganese",0,4,1246,"m","s"],[26,"Fe","iron",0,4,1538,"m","s"],[27,"Co","cobalt",0,4,1495,"m","s"],[28,"Ni","nickel",0,4,1455,"m","s"],[29,"Cu","copper",0,4,1085,"m","s"],[30,"Zn","zinc",0,4,420,"m","s"],
      [31,"Ga","gallium",3,4,30,"m","s"],[32,"Ge","germanium",4,4,938,"s","s"],[33,"As","arsenic",5,4,817,"s","s"],[34,"Se","selenium",6,4,221,"n","s"],[35,"Br","bromine",7,4,-7,"n","l"],[36,"Kr","krypton",8,4,-157,"n","g"]];
    const col18 = (e) => e[3] === 0 ? e[0] - 18 : e[3] === 8 ? 18 : e[3] <= 2 ? e[3] : e[3] + 10;
    const conf = (z) => { if (z > 20) return "[Ar] + d-electrons (transition / beyond Sc)"; const s = [2, 8, 8, 2], out = []; let r = z; for (const c of s) { if (r <= 0) break; out.push(Math.min(c, r)); r -= c; } return out.join(","); };
    const box = document.createElement("div"); box.style.cssText = "position:relative;overflow-x:auto"; const grid = document.createElement("div");
    grid.style.cssText = "display:grid;grid-template-columns:repeat(18,minmax(30px,1fr));gap:3px;min-width:600px";
    const modes = [["metal / non-metal", e => ({ m: "#5b8def", n: "#e8913a", s: "#9b7fd4" })[e[6]]], ["state at room temp", e => ({ s: "#8a8f98", l: "#d9534f", g: "#4fb0c6" })[e[7]]], ["melting point", e => `hsl(${220 - Math.max(0, Math.min(1, (e[5] + 273) / 3800)) * 220},70%,55%)`], ["group", e => e[3] === 0 ? "#b0a090" : `hsl(${(e[3] - 1) * 45},60%,55%)`]];
    let mode = 0, sel = 11;
    const seg = document.createElement("div"); seg.className = "seg wrap"; seg.style.marginTop = "12px"; seg.innerHTML = modes.map(([n], i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    const out = document.createElement("div"); out.className = "readout";
    const draw = () => {
      grid.innerHTML = ""; const cells = {}; E.forEach(e => cells[e[4] + ":" + col18(e)] = e);
      for (let p = 0; p <= 4; p++) for (let c = 1; c <= 18; c++) {
        const d = document.createElement("div"); d.style.cssText = "aspect-ratio:1;border-radius:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;font:600 13px Inter,sans-serif;line-height:1.05";
        if (p === 0) { const g = c <= 2 ? ["I", "II"][c - 1] : c >= 13 ? ["III", "IV", "V", "VI", "VII", "VIII"][c - 13] : ""; d.textContent = g; d.style.cssText += ";aspect-ratio:auto;color:var(--muted);font-size:11px"; grid.appendChild(d); continue; }
        const e = cells[p + ":" + c]; if (!e) { grid.appendChild(d); continue; }
        d.style.background = modes[mode][1](e); d.style.color = "#fff"; d.style.cursor = "pointer"; if (e[0] === sel) d.style.outline = "3px solid var(--ink)";
        d.innerHTML = `<span style="font-size:9px;opacity:.85">${e[0]}</span>${e[1]}`; d.onclick = () => { sel = e[0]; draw(); }; grid.appendChild(d);
      }
      const e = E[sel - 1], g = e[3] === 0 ? "transition element" : e[3] === 8 ? "Group VIII (noble gas)" : "Group " + ["I", "II", "III", "IV", "V", "VI", "VII"][e[3] - 1];
      const ty = { m: "metal", n: "non-metal", s: "metalloid (in-between)" }[e[6]], st = { s: "solid", l: "liquid", g: "gas" }[e[7]];
      const fam = e[3] === 1 && e[0] > 1 ? " Alkali metal: soft, low density, reacts with water to give hydrogen and an alkaline hydroxide." : e[3] === 7 ? " Halogen: diatomic, coloured, more reactive higher up the group." : e[3] === 8 ? " Noble gas: full outer shell, so unreactive and monatomic." : e[3] === 0 ? " Transition element: high density and melting point, coloured compounds, variable oxidation numbers, catalysts." : "";
      out.innerHTML = `<b>${e[2][0].toUpperCase() + e[2].slice(1)} (${e[1]})</b>, Z = ${e[0]}. Period ${e[4]}, ${g}. ${ty[0].toUpperCase() + ty.slice(1)}, ${st} at room temperature, melting point ${e[5]} °C. ${e[0] <= 20 ? "Electronic configuration " + conf(e[0]) + " (" + (e[3] === 8 ? (e[0] === 2 ? 2 : 8) : e[3]) + " outer electron" + (e[3] === 1 ? "" : "s") + ", " + e[4] + " shell" + (e[4] > 1 ? "s" : "") + ")." : ""}${fam}`;
    };
    seg.onclick = ev => { const b = ev.target.closest("button"); if (!b) return; mode = +b.dataset.i; seg.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); draw(); };
    box.appendChild(grid); root.appendChild(box); root.appendChild(seg); root.appendChild(out); draw();
    return () => {};
  };

  // ---------- Blast furnace ----------
  V.blastFurnace = (host) => mount(host, (ctx, W, H, t, P) => {
    const cx = W * .36, top = 40, bot = H - 40, tw = 46, mw = 96, bw = 74, yb = bot - 70;
    const lx = (y) => { const f = (y - top) / (yb - top); return y < yb ? cx - (tw + (mw - tw) * Math.min(1, f * 1.4)) + (f > .72 ? (f - .72) / .28 * (mw - bw) : 0) : cx - bw; };
    ctx.beginPath(); for (let y = top; y <= bot; y += 4) ctx.lineTo(lx(y), y); for (let y = bot; y >= top; y -= 4) ctx.lineTo(2 * cx - lx(y), y); ctx.closePath();
    const g = ctx.createLinearGradient(0, top, 0, bot); g.addColorStop(0, "#f3c56a55"); g.addColorStop(.6, "#f0803a77"); g.addColorStop(1, "#d8402aaa"); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 3; ctx.stroke();
    // charge falling
    const cols = ["#7a3b2a", "#222", "#ddd"];
    for (let i = 0; i < 46; i++) { const ph = (t * .08 + rnd(i, 1)) % 1, y = top + 6 + ph * (yb - top - 10), half = cx - lx(y) - 8, x = cx + (rnd(i, 2) * 2 - 1) * half; ctx.fillStyle = cols[i % 3]; ctx.fillRect(x - 3, y - 3, 6, 6); }
    // rising CO / CO2
    for (let i = 0; i < 18; i++) { const ph = (t * .25 + rnd(i, 5)) % 1, y = yb - ph * (yb - top), half = cx - lx(y) - 10, x = cx + Math.sin(t * 2 + i) * half * .7; ctx.globalAlpha = .5 * (1 - ph * .5); dot(ctx, x, y, 3, "#777"); } ctx.globalAlpha = 1;
    // slag and iron
    ctx.fillStyle = "#c9b48a"; ctx.fillRect(cx - bw + 2, bot - 38, 2 * bw - 4, 14); ctx.fillStyle = "#ff7a2a"; ctx.fillRect(cx - bw + 2, bot - 24, 2 * bw - 4, 22);
    // hot air blasts
    for (const s of [-1, 1]) { const x0 = cx + s * (bw + 46), y = yb + 4; ctx.strokeStyle = cs("--bad"); ctx.lineWidth = 2; const ph = (t * 1.5) % 1; arrow(ctx, x0, y, cx + s * (bw + 2), y, cs("--bad")); dot(ctx, x0 + (cx + s * bw - x0) * ph, y, 3, cs("--bad")); }
    // tap holes
    arrow(ctx, cx - bw, bot - 31, cx - bw - 40, bot - 31, "#a08a5a"); arrow(ctx, cx + bw, bot - 13, cx + bw + 40, bot - 13, "#ff7a2a");
    const L = (y, s, c) => text(ctx, s, W * .63, y, { size: 12, color: c || cs("--ink") });
    text(ctx, "iron ore (hematite), coke, limestone", cx, 24, { size: 12, align: "center", weight: 700 });
    text(ctx, "slag", cx - bw - 44, bot - 36, { size: 11, align: "right", color: cs("--muted") }); text(ctx, "molten iron", cx + bw + 44, bot - 18, { size: 11, color: "#d0601a", weight: 700 });
    text(ctx, "hot air", cx - bw - 50, yb - 6, { size: 11, color: cs("--bad") });
    const k = Math.floor((t / P) * 4) % 4;
    const R = [["1. Coke burns in hot air (exothermic):", "C + O₂ → CO₂"], ["2. CO₂ reduced by more coke:", "CO₂ + C → 2CO"], ["3. CO reduces the ore:", "Fe₂O₃ + 3CO → 2Fe + 3CO₂"], ["4. Limestone makes slag:", "CaCO₃ → CaO + CO₂", "CaO + SiO₂ → CaSiO₃"]];
    R.forEach(([a, b, c2], i) => { const y = 56 + i * 52, on = i === k, o = { size: on ? 14 : 13, weight: on ? 700 : 500, color: on ? cs("--ink") : cs("--muted") }; L(y, a, on ? cs("--chem") : cs("--muted")); text(ctx, b, W * .63, y + 18, o); if (c2) text(ctx, c2, W * .63, y + 36, o); });
  }, { h: 340, period: 12, caption: "The blast furnace: coke, carbon monoxide and limestone turn hematite into molten iron and slag" });

  // ---------- Alloys: layers slide in pure metal but not in an alloy ----------
  V.alloyLayers = (host) => mount(host, (ctx, W, H, t, P) => {
    const ph = (t / P) % 1, push = Math.min(1, Math.max(0, (ph - .15) / .4)), r = 13, n = 7;
    [0, 1].forEach(side => {
      const x0 = side ? W / 2 + 20 : 30, y0 = 70;
      for (let row = 0; row < 4; row++) for (let i = 0; i < n; i++) {
        const big = side && ((row === 1 && i === 3) || (row === 2 && i === 1) || (row === 0 && i === 5));
        const shift = row < 2 ? (side ? Math.min(push, .12) : push) * 2 * r : 0;
        const x = x0 + i * 2 * r + r + shift, y = y0 + row * 2 * r + r;
        dot(ctx, x, y, big ? r * 1.3 : r - 1, big ? cs("--physics") : "#9aa3ad");
      }
      if (!side || push < .2) arrow(ctx, x0 - 8 + push * 20, y0 - 18, x0 + 60 + push * 20, y0 - 18, cs("--bad"));
      text(ctx, side ? "ALLOY: different-sized atoms" : "PURE METAL: regular layers", x0, 34, { size: 13, weight: 700 });
      text(ctx, side ? "distort the layers: they cannot slide → harder, stronger" : "layers slide over each other easily → malleable, soft", x0, H - 16, { size: 12, color: side ? cs("--physics") : cs("--muted") });
    });
  }, { h: 230, period: 5, caption: "Why alloys are harder: atoms of a different size stop the layers sliding" });

  // ---------- Interactive: reactivity series tests ----------
  DEMOS.reactivity = (root, col) => {
    const { ctx, size, W, H } = setup(root, 300);
    const M = [["K", "potassium", 10, "KOH"], ["Na", "sodium", 9, "NaOH"], ["Ca", "calcium", 8, "Ca(OH)₂"], ["Mg", "magnesium", 7, "Mg"], ["Al", "aluminium", 6, "Al"], ["Zn", "zinc", 5, "Zn"], ["Fe", "iron", 4, "Fe"], ["Pb", "lead", 3, "Pb"], ["Cu", "copper", 2, "Cu"], ["Ag", "silver", 1, "Ag"], ["Au", "gold", 0, "Au"]];
    const salts = [["Mg", "magnesium sulfate", 7, "#ffffff00"], ["Zn", "zinc sulfate", 5, "#ffffff00"], ["Fe", "iron(II) sulfate", 4, "#9cc68a77"], ["Cu", "copper(II) sulfate", 2, "#3b7fd077"], ["Ag", "silver nitrate", 1, "#ffffff00"]];
    let m = 3, test = 2, sl = 3, t0 = 0;
    const mk = (opts, cur, cb) => { const d = document.createElement("div"); d.className = "seg wrap"; d.style.marginTop = "10px"; d.innerHTML = opts.map((o, i) => `<button aria-pressed="${i === cur}" data-i="${i}">${o}</button>`).join(""); d.onclick = e => { const b = e.target.closest("button"); if (!b) return; d.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); cb(+b.dataset.i); t0 = performance.now() / 1000; }; root.appendChild(d); return d; };
    mk(M.map(x => x[0]), m, i => m = i); mk(["cold water", "steam", "dilute HCl", "salt solution"], test, i => { test = i; saltSeg.style.display = i === 3 ? "" : "none"; });
    const saltSeg = mk(salts.map(s => s[1]), sl, i => sl = i); saltSeg.style.display = "none";
    const out = readout(root); let last = "";
    return loop((tt) => {
      size(); const w = W(), h = H(), el = tt - t0; ctx.clearRect(0, 0, w, h);
      const [sym, name, R] = M[m]; let rate = 0, msg = "", liquid = "#9ec5ff33", coat = 0, flame = false, after = null;
      if (test === 0) { rate = R >= 8 ? (R - 7) / 3 : R === 7 ? .04 : 0; flame = R === 10;
        msg = R >= 8 ? `${name[0].toUpperCase() + name.slice(1)} reacts ${R === 10 ? "violently (lilac flame)" : R === 9 ? "vigorously" : "steadily, sinking and fizzing"} with cold water: metal + water → metal hydroxide + hydrogen.` : R === 7 ? "Magnesium reacts only very slowly with cold water (a few bubbles after days)." : `${name[0].toUpperCase() + name.slice(1)} does not react with cold water.`; }
      if (test === 1) { rate = R >= 8 ? 1 : R >= 4 ? (R - 3) / 4 : 0; msg = R >= 8 ? `Too dangerous: ${name} reacts explosively with steam.` : R >= 4 ? `Heated ${name} reacts with steam: metal + steam → metal oxide + hydrogen. ${R === 7 ? "Magnesium burns with a bright white light, leaving white MgO." : R === 6 ? "Aluminium reacts only slowly at first because of its protective oxide layer." : ""}` : `${name[0].toUpperCase() + name.slice(1)} does not react with steam.`; }
      if (test === 2) { rate = R >= 8 ? 1 : R >= 3 ? (R - 2) / 6 : 0; msg = R >= 8 ? `Too dangerous: ${name} reacts explosively with acid.` : R >= 3 ? `${name[0].toUpperCase() + name.slice(1)} + hydrochloric acid → ${name === "iron" ? "iron(II)" : name} chloride + hydrogen. ${R === 3 ? "Lead reacts only very slowly." : "Faster fizzing means more reactive."}` : `${name[0].toUpperCase() + name.slice(1)} is below hydrogen: no reaction with dilute acid.`; }
      if (test === 3) { const [ss, sn, SR, sc] = salts[sl]; liquid = sc;
        if (R >= 8) { msg = `${name[0].toUpperCase() + name.slice(1)} would react with the water instead, so it is not used for displacement.`; rate = .6; }
        else if (R > SR) { coat = Math.min(1, el / 4); const prod = { Mg: "grey magnesium", Zn: "grey zinc", Fe: "grey iron", Cu: "pink-brown copper", Ag: "silver crystals" }[ss]; after = sc; if (ss === "Cu") liquid = `rgba(59,127,208,${.47 * (1 - coat * .8)})`; if (ss === "Fe") liquid = `rgba(156,198,138,${.47 * (1 - coat * .8)})`; msg = `${sym} is more reactive than ${ss}: it displaces it. ${prod[0].toUpperCase() + prod.slice(1)} coats the ${name}${ss === "Cu" ? " and the blue colour fades" : ""}. The reaction is exothermic.`; }
        else msg = `${sym} is ${R === SR ? "the same metal" : "less reactive than " + ss}: no displacement reaction.`; }
      // draw tube
      const tx = w * .26, ty = 30, th = h - 70;
      ctx.fillStyle = liquid; ctx.fillRect(tx - 30, ty + th * .3, 60, th * .7 - 30); ctx.beginPath(); ctx.arc(tx, ty + th - 30, 30, 0, Math.PI); ctx.fill();
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(tx - 30, ty); ctx.lineTo(tx - 30, ty + th - 30); ctx.arc(tx, ty + th - 30, 30, Math.PI, 0, true); ctx.lineTo(tx + 30, ty); ctx.stroke();
      if (test === 1) { ctx.fillStyle = css("--muted"); for (let i = 0; i < 6; i++) { ctx.globalAlpha = .3; ctx.beginPath(); ctx.arc(tx - 12 + 6 * Math.sin(tt * 3 + i), ty + th * .3 - 10 - ((tt * 30 + i * 20) % 60), 6, 0, 7); ctx.fill(); } ctx.globalAlpha = 1; text(ctx, "steam", tx + 40, ty + 30, { size: 12, color: css("--muted") }); }
      const my = ty + th - 40; ctx.fillStyle = "#b8bec6"; ctx.fillRect(tx - 14, my - 30, 28, 34); if (coat) { ctx.fillStyle = salts[sl][0] === "Cu" ? `rgba(184,115,51,${coat})` : `rgba(90,90,90,${coat * .8})`; ctx.fillRect(tx - 15, my - 31, 30, 36); }
      text(ctx, sym, tx, my - 8, { size: 13, align: "center", weight: 700, color: "#333" });
      for (let i = 0; i < 40 * rate; i++) { const ph = (tt * (0.6 + rate) + rnd(i, m)) % 1; ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(tx - 20 + rnd(i * 7 + 1, 13) * 40, my - 30 - ph * (th * .55), 2 + 2 * rnd(i, 4), 0, 7); ctx.stroke(); }
      if (flame) for (let f = 0; f < 4; f++) { ctx.fillStyle = "#b07ae099"; ctx.beginPath(); ctx.ellipse(tx + (f - 1.5) * 6, ty + th * .3 - 18, 5, 14 + 5 * Math.sin(tt * 13 + f), 0, 0, 7); ctx.fill(); }
      // series ladder
      const lx = w * .58; text(ctx, "reactivity series", lx, 22, { size: 12, weight: 700, color: css("--muted") });
      const ser = ["K", "Na", "Ca", "Mg", "Al", "(C)", "Zn", "Fe", "Pb", "(H)", "Cu", "Ag", "Au"], sh = (h - 46) / ser.length;
      ser.forEach((s, i) => { const on = s === sym, y = 40 + i * sh; if (on) { ctx.fillStyle = col + "33"; ctx.fillRect(lx - 6, y - sh * .7, 120, sh); } text(ctx, s, lx, y, { size: 12, weight: on ? 700 : 500, color: s[0] === "(" ? css("--muted") : on ? col : css("--ink") }); });
      arrow(ctx, lx + 70, 40, lx + 70, h - 20, css("--muted")); text(ctx, "less reactive", lx + 80, h - 24, { size: 11, color: css("--muted") }); text(ctx, "more reactive", lx + 80, 40, { size: 11, color: css("--muted") });
      if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  // ---------- Greenhouse effect ----------
  V.greenhouse = (host) => mount(host, (ctx, W, H, t, P) => {
    const gy = H - 50, atm = 90;
    ctx.fillStyle = "#6aa84f55"; ctx.fillRect(0, gy, W, 50); text(ctx, "Earth's surface (warmed, then emits infrared)", 16, H - 16, { size: 12, color: cs("--ink"), weight: 600 });
    ctx.fillStyle = cs("--maths") + "14"; ctx.fillRect(0, atm, W, gy - atm); ctx.setLineDash([4, 5]); ctx.strokeStyle = cs("--muted"); ctx.beginPath(); ctx.moveTo(0, atm); ctx.lineTo(W, atm); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, "atmosphere with greenhouse gases (CO₂, CH₄, H₂O)", W - 16, atm + 18, { size: 12, align: "right", color: cs("--muted") });
    ctx.fillStyle = "#f5b82e"; ctx.beginPath(); ctx.arc(40, 34, 20, 0, 7); ctx.fill(); text(ctx, "Sun", 40, 70, { size: 12, weight: 700, align: "center" });
    for (let i = 0; i < 6; i++) { 
      const ph = ((t / 3) + i / 6) % 1, x0 = 70 + i * (W - 160) / 5;
      // incoming short-wave (yellow), straight down at slight angle
      const yIn = 70 + ph * (gy - 70); if (ph < 1) { ctx.strokeStyle = "#f2b01e"; ctx.lineWidth = 2.5; ctx.beginPath(); for (let y = Math.max(70, yIn - 50); y < yIn; y += 2) ctx.lineTo(x0 + (y - 20) * .15 + 3 * Math.sin(y * .5), y); ctx.stroke(); }
      // outgoing infrared (red, longer wavelength): goes up, some absorbed and re-emitted downward
      const ph2 = ((t / 3) + i / 6 + .5) % 1, xs = x0 + (gy - 20) * .15, absorbed = i % 3 !== 0;
      const up = absorbed ? Math.min(ph2 * 2, 1) : ph2, yo = gy - up * (gy - (absorbed ? atm + 40 + 30 * rnd(i, 1) : 0));
      ctx.strokeStyle = cs("--bad"); ctx.lineWidth = 2; ctx.beginPath(); for (let y = gy; y > yo; y -= 2) ctx.lineTo(xs + (gy - y) * .1 + 5 * Math.sin(y * .18), y); ctx.stroke();
      if (absorbed && ph2 > .5) { const yy = yo, back = (ph2 - .5) * 2, y2 = yy + back * (gy - yy); dot(ctx, xs + (gy - yy) * .1, yy, 6, cs("--chem")); ctx.strokeStyle = cs("--bad") + "aa"; ctx.beginPath(); for (let y = yy; y < y2; y += 2) ctx.lineTo(xs + (gy - yy) * .1 + 18 + 5 * Math.sin(y * .18), y); ctx.stroke(); }
    }
    text(ctx, "short-wave radiation passes through", W * .35, 40, { size: 12, color: "#c48a0a", weight: 600 }); text(ctx, "infrared absorbed and re-emitted by greenhouse gases", W * .35, 58, { size: 12, color: cs("--bad"), weight: 600 });
  }, { h: 330, period: 6, caption: "The greenhouse effect: greenhouse gases absorb infrared from the Earth and re-emit it in all directions, keeping heat in" });

  // ---------- Catalytic converter ----------
  V.catalytic = (host) => mount(host, (ctx, W, H, t, P) => {
    const x0 = W * .3, x1 = W * .7, y0 = 60, y1 = H - 60, yc = (y0 + y1) / 2;
    ctx.fillStyle = "#c0c4ca44"; ctx.beginPath(); ctx.roundRect(x0, y0, x1 - x0, y1 - y0, 20); ctx.fill(); ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2.5; ctx.stroke();
    for (let i = 1; i < 8; i++) { ctx.strokeStyle = "#b8a14a88"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0 + 10, y0 + i * (y1 - y0) / 8); ctx.lineTo(x1 - 10, y0 + i * (y1 - y0) / 8); ctx.stroke(); }
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, yc - 18); ctx.lineTo(x0, yc - 18); ctx.moveTo(0, yc + 18); ctx.lineTo(x0, yc + 18); ctx.moveTo(x1, yc - 18); ctx.lineTo(W, yc - 18); ctx.moveTo(x1, yc + 18); ctx.lineTo(W, yc + 18); ctx.stroke();
    const IN = [["CO", "#666"], ["NO", "#c0562a"], ["CₓHᵧ", "#8a6d3b"]], OUT = [["CO₂", "#3b7fd0"], ["N₂", "#4fae6a"], ["H₂O", "#4fb0c6"]];
    for (let i = 0; i < 9; i++) { const ph = (t / 4 + i / 9) % 1, x = ph * W, y = yc + (rnd(i, 1) - .5) * 24 + (x > x0 && x < x1 ? Math.sin(x * .05 + i) * (y1 - y0) * .32 : 0), k = i % 3;
      const [l, c] = x < (x0 + x1) / 2 ? IN[k] : OUT[k]; dot(ctx, x, y, 11, c); text(ctx, l, x, y + 4, { size: 9, align: "center", color: "#fff", weight: 700 }); }
    text(ctx, "from engine:", 10, yc - 50, { size: 12, weight: 600 }); text(ctx, "CO, NOₓ, CₓHᵧ", 10, yc - 32, { size: 12 }); text(ctx, "to exhaust:", W - 10, yc - 50, { size: 12, weight: 600, align: "right" }); text(ctx, "CO₂, N₂, H₂O", W - 10, yc - 32, { size: 12, align: "right" });
    text(ctx, "honeycomb coated with platinum / rhodium catalyst (large surface area)", W / 2, y1 + 22, { size: 12, align: "center", color: cs("--muted") });
    text(ctx, "2CO + 2NO → 2CO₂ + N₂", W / 2, 30, { size: 14, align: "center", weight: 700 });
  }, { h: 280, period: 8, caption: "A catalytic converter turns toxic exhaust gases into less harmful ones" });

  // ---------- Interactive: water treatment ----------
  DEMOS.watertreat = (root, col) => {
    const { ctx, size, W, H } = setup(root, 300);
    const st = [["River water", "Raw water from a river or reservoir: cloudy with soil particles, leaves, dissolved substances and microbes."], ["Screening", "A mesh removes large floating objects such as twigs, leaves and plastic."], ["Sedimentation", "Water is left in tanks so heavy insoluble particles settle to the bottom. (A flocculant such as aluminium sulfate can be added to clump small particles together so they settle.)"], ["Filtration", "Water passes through beds of sand and gravel, which trap the remaining small insoluble particles."], ["Carbon", "Activated carbon (charcoal) adsorbs substances that cause unpleasant tastes and odours."], ["Chlorination", "Chlorine is added to kill harmful microbes (bacteria), making the water safe to drink."]];
    let s = 0, t0 = 0; const segEl = document.createElement("div"); segEl.className = "seg wrap"; segEl.style.marginTop = "12px";
    segEl.innerHTML = st.map(([n], i) => `<button aria-pressed="${i === 0}" data-i="${i}">${i}. ${n}</button>`).join("");
    segEl.onclick = e => { const b = e.target.closest("button"); if (!b) return; s = +b.dataset.i; t0 = performance.now() / 1000; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(segEl); const out = readout(root); let last = "";
    return loop((tt) => {
      size(); const w = W(), h = H(), el = Math.min(1, (tt - t0) / 2.5); ctx.clearRect(0, 0, w, h);
      const tx = w * .12, tw = w * .42, ty = 40, th = h - 80;
      const big = s >= 1 ? 0 : 1, susp = s >= 3 ? 0 : s === 2 ? 1 - el : 1, smell = s >= 4 ? (s === 4 ? 1 - el : 0) : 1, mic = s >= 5 ? 1 - el : 1;
      ctx.fillStyle = `rgba(${Math.round(120 + 40 * (1 - susp))},${Math.round(150 + 40 * (1 - susp))},${Math.round(160 + 60 * (1 - susp))},${.35 + .25 * susp})`; ctx.fillRect(tx, ty + 20, tw, th - 20);
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx, ty + th); ctx.lineTo(tx + tw, ty + th); ctx.lineTo(tx + tw, ty); ctx.stroke();
      for (let i = 0; i < 40; i++) { const settled = s >= 2, x = tx + 8 + rnd(i, 1) * (tw - 16), yFree = ty + 30 + bounce(rnd(i, 2) * (th - 50) + tt * 8 * (rnd(i, 3) - .5), th - 50), yS = ty + th - 6 - rnd(i, 4) * 10, y = settled ? (s === 2 ? yFree + (yS - yFree) * el : yS) : yFree; if (s >= 3) continue; ctx.fillStyle = "#8a6d3b"; ctx.fillRect(x - 2, y - 2, 4, 4); }
      if (big) for (let i = 0; i < 4; i++) { ctx.fillStyle = "#4b7a2a"; ctx.beginPath(); ctx.ellipse(tx + 30 + i * tw / 4, ty + 26 + 3 * Math.sin(tt * 2 + i), 14, 5, i, 0, 7); ctx.fill(); }
      if (s === 3) { ctx.fillStyle = "#d9c79a"; ctx.fillRect(tx + 2, ty + th - 40, tw - 4, 38); ctx.fillStyle = "#999"; for (let i = 0; i < 30; i++) ctx.fillRect(tx + 4 + rnd(i, 7) * (tw - 10), ty + th - 14 + rnd(i, 8) * 10, 4, 3); text(ctx, "sand and gravel", tx + tw / 2, ty + th - 18, { size: 11, align: "center", color: "#6b5a2a" }); }
      if (s === 4) { ctx.fillStyle = "#333"; ctx.fillRect(tx + 2, ty + th - 30, tw - 4, 28); text(ctx, "activated carbon", tx + tw / 2, ty + th - 12, { size: 11, align: "center", color: "#fff" }); }
      for (let i = 0; i < 10; i++) { if (rnd(i, 9) > mic) continue; const x = tx + 20 + rnd(i, 10) * (tw - 40) + 6 * Math.sin(tt * 2 + i), y = ty + 40 + rnd(i, 11) * (th - 90) + 6 * Math.cos(tt * 2 + i); ctx.strokeStyle = "#6a1b9a"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x, y, 6, 3, i, 0, 7); ctx.stroke(); }
      if (s >= 5 && el < 1) for (let i = 0; i < 8; i++) dot(ctx, tx + 20 + rnd(i, 12) * (tw - 40), ty + 20 + el * (th - 40) * rnd(i, 13), 3, "#a8c23a");
      const gx = w * .62, bars = [["insoluble particles", susp * (s >= 1 ? .8 : 1)], ["tastes / odours", smell], ["harmful microbes", mic]];
      text(ctx, "contamination remaining", gx, 40, { size: 12, weight: 700, color: css("--muted") });
      bars.forEach(([n, v], i) => { const y = 64 + i * 56; text(ctx, n, gx, y, { size: 12 }); ctx.fillStyle = css("--muted") + "33"; ctx.fillRect(gx, y + 8, w * .32, 14); ctx.fillStyle = v > .5 ? css("--bad") : v > .05 ? "#e0a030" : col; ctx.fillRect(gx, y + 8, w * .32 * Math.max(.02, v), 14); });
      text(ctx, s === 5 && el > .99 ? "✓ safe to drink" : "", gx, h - 30, { size: 15, weight: 700, color: col });
      const msg = `<b>Stage ${s}: ${st[s][0]}.</b> ${st[s][1]}`; if (msg !== last) { out.innerHTML = msg; last = msg; }
    });
  };

  V._chem = { rnd, bounce };
})();
