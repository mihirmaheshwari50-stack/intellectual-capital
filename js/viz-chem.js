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
  V._chem = { rnd, bounce };
})();
