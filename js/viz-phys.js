// Physics animations (extends VIZ) and interactive labs (extends DEMOS).
(() => {
  const { mount, text, arrow, dot, alpha, seg, cs, clamp, ease } = VIZ._lib;
  const V = VIZ;

  // shared: draw axes + a polyline graph that grows with time
  function axes(ctx, x, y, w, h, xl, yl) {
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
    text(ctx, yl, x + 6, y + 4, { size: 12, color: cs("--muted") }); text(ctx, xl, x + w, y + h + 16, { size: 12, color: cs("--muted"), align: "right" });
  }
  function trace(ctx, pts, X, Y, col, w = 3) {
    if (pts.length < 2) return; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = "round"; ctx.beginPath();
    pts.forEach(([a, b], i) => i ? ctx.lineTo(X(a), Y(b)) : ctx.moveTo(X(a), Y(b))); ctx.stroke();
  }
  function car(ctx, x, y, col) {
    ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(x - 26, y - 16, 52, 16, 5); ctx.fill();
    ctx.beginPath(); ctx.roundRect(x - 14, y - 27, 26, 13, 5); ctx.fill();
    dot(ctx, x - 15, y + 1, 6, cs("--ink")); dot(ctx, x + 15, y + 1, 6, cs("--ink"));
  }

  // ---------- Motion: one journey, both graphs drawn live ----------
  // 0–3 s accelerate 0→12 m/s, 3–7 s steady 12 m/s, 7–10 s decelerate to 0, 10–12 s at rest
  const vAt = (t) => t < 3 ? 4 * t : t < 7 ? 12 : t < 10 ? 12 - 4 * (t - 7) : 0;
  const sAt = (t) => t < 3 ? 2 * t * t : t < 7 ? 18 + 12 * (t - 3) : t < 10 ? 66 + 12 * (t - 7) - 2 * (t - 7) ** 2 : 84;
  V.motionGraphs = (host) => mount(host, (ctx, W, H, t) => {
    const c = cs("--physics"), b = cs("--maths"), road = 62, L = W - 70;
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(20, road + 8); ctx.lineTo(W - 20, road + 8); ctx.stroke();
    for (let m = 0; m <= 84; m += 12) { const x = 40 + m / 84 * L; ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, road + 8); ctx.lineTo(x, road + 14); ctx.stroke(); text(ctx, m + " m", x, road + 28, { size: 11, color: cs("--muted"), align: "center" }); }
    // ghost positions every second (strobe)
    for (let k = 0; k <= Math.floor(t); k++) alpha(ctx, .18, () => car(ctx, 40 + sAt(k) / 84 * L, road, c));
    car(ctx, 40 + sAt(t) / 84 * L, road, c);
    const stage = t < 3 ? "Accelerating: speed rising, d–t curve getting steeper" : t < 7 ? "Constant speed: d–t straight line, v–t flat" : t < 10 ? "Decelerating: d–t curve flattening, v–t sloping down" : "At rest: d–t flat, v–t on zero";
    text(ctx, stage, 20, 20, { size: 14, weight: 600 });
    const gy = 110, gh = H - gy - 40, gw = (W - 90) / 2, g1 = 40, g2 = g1 + gw + 40, T = 12;
    axes(ctx, g1, gy, gw, gh, "time / s", "distance / m"); axes(ctx, g2, gy, gw, gh, "time / s", "speed / m/s");
    const pts1 = [], pts2 = []; for (let s = 0; s <= t; s += .05) { pts1.push([s, sAt(s)]); pts2.push([s, vAt(s)]); }
    const X1 = (s) => g1 + s / T * gw, Y1 = (d) => gy + gh - d / 90 * gh, X2 = (s) => g2 + s / T * gw, Y2 = (v) => gy + gh - v / 14 * gh;
    // shaded area under v–t = distance so far
    if (pts2.length > 1) { ctx.fillStyle = b + "22"; ctx.beginPath(); ctx.moveTo(X2(0), Y2(0)); pts2.forEach(([s, v]) => ctx.lineTo(X2(s), Y2(v))); ctx.lineTo(X2(t), Y2(0)); ctx.fill(); }
    trace(ctx, pts1, X1, Y1, c); trace(ctx, pts2, X2, Y2, b);
    dot(ctx, X1(t), Y1(sAt(t)), 6, c, 12); dot(ctx, X2(t), Y2(vAt(t)), 6, b, 12);
    text(ctx, `${sAt(t).toFixed(0)} m`, X1(t) + 8, Y1(sAt(t)) - 8, { size: 12, color: c, weight: 600 });
    text(ctx, `${vAt(t).toFixed(1)} m/s`, X2(t) + 8, Y2(vAt(t)) - 8, { size: 12, color: b, weight: 600 });
    text(ctx, "shaded area = distance travelled", g2 + gw, gy + 10, { size: 11, color: b, align: "right" });
  }, { h: 360, period: 12, caption: "The same journey drawn as a distance–time and a speed–time graph at the same time" });

  // ---------- Free fall: strobe of a dropped ball, with and without air resistance ----------
  V.freeFall = (host) => mount(host, (ctx, W, H, t, P) => {
    const c = cs("--physics"), b = cs("--maths"), top = 30, sc = (H - 70) / 45, tt = Math.min(t, 3);
    const xs = [W * .18, W * .38];
    text(ctx, "no air resistance", xs[0], 18, { size: 12, align: "center", weight: 600, color: c });
    text(ctx, "with air resistance", xs[1], 18, { size: 12, align: "center", weight: 600, color: b });
    const vDrag = (s) => 12 * Math.tanh(9.8 * s / 12), yDrag = (s) => 12 * 12 / 9.8 * Math.log(Math.cosh(9.8 * s / 12));
    for (let k = 0; k <= tt + 1e-6; k += .25) {
      const a = k <= tt - .24 ? .25 : 1;
      alpha(ctx, a, () => { dot(ctx, xs[0], top + .5 * 9.8 * k * k * sc, 7, c); dot(ctx, xs[1], top + yDrag(k) * sc, 7, b); });
    }
    text(ctx, "flash every 0.25 s", (xs[0] + xs[1]) / 2, H - 10, { size: 11, color: cs("--muted"), align: "center" });
    // v–t graph
    const gx = W * .55, gw = W - gx - 20, gy = 30, gh = H - 70;
    axes(ctx, gx, gy, gw, gh, "time / s", "speed / m/s");
    const X = (s) => gx + s / 3 * gw, Y = (v) => gy + gh - v / 30 * gh, p1 = [], p2 = [];
    for (let s = 0; s <= tt; s += .03) { p1.push([s, 9.8 * s]); p2.push([s, vDrag(s)]); }
    trace(ctx, p1, X, Y, c); trace(ctx, p2, X, Y, b);
    text(ctx, "gradient = g = 9.8 m/s²", X(1.5) - 10, Y(17), { size: 12, color: c, weight: 600, align: "right" });
    if (tt > 1.5) text(ctx, "levels off: terminal velocity", X(3), Y(12) + 20, { size: 12, color: b, weight: 600, align: "right" });
  }, { h: 330, period: 5, caption: "Equal time intervals: the gaps grow because the ball speeds up by 9.8 m/s every second" });

  // ---------- Vector addition (right angles) ----------
  V.vectorAdd = (host) => mount(host, (ctx, W, H, t) => {
    const c = cs("--physics"), b = cs("--maths"), g = cs("--chem"), u = Math.min(36, (H - 70) / 5), ox = Math.max(40, W / 2 - 3.5 * u), oy = H - 40;
    const p1 = seg(t, .5, 1.6), p2 = seg(t, 2, 3.1), p3 = seg(t, 3.6, 4.8), p4 = seg(t, 5.2, 6);
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1; for (let i = 0; i <= 7; i++) { ctx.beginPath(); ctx.moveTo(ox + i * u, oy); ctx.lineTo(ox + i * u, oy - 5 * u); ctx.stroke(); } for (let j = 0; j <= 5; j++) { ctx.beginPath(); ctx.moveTo(ox, oy - j * u); ctx.lineTo(ox + 7 * u, oy - j * u); ctx.stroke(); }
    arrow(ctx, ox, oy, ox + 4 * u * p1, oy, c); if (p1 > .9) text(ctx, "4 N east", ox + 2 * u, oy + 20, { size: 13, color: c, weight: 600, align: "center" });
    if (p2 > 0) arrow(ctx, ox + 4 * u, oy, ox + 4 * u, oy - 3 * u * p2, b); if (p2 > .9) text(ctx, "3 N north", ox + 4 * u + 10, oy - 1.5 * u, { size: 13, color: b, weight: 600 });
    if (p3 > 0) arrow(ctx, ox, oy, ox + 4 * u * p3, oy - 3 * u * p3, g, 5);
    alpha(ctx, p4, () => { text(ctx, "resultant = √(4² + 3²) = 5 N", ox + 1.2 * u, oy - 2.6 * u, { size: 14, color: g, weight: 700, align: "right" }); text(ctx, "angle: tan θ = 3/4 → θ = 37° north of east", ox, oy - 4.4 * u, { size: 13, color: cs("--ink") }); });
    text(ctx, "tip-to-tail: draw one vector, start the next where it ends", 16, 20, { size: 12, color: cs("--muted") });
  }, { h: 280, period: 8, caption: "Two perpendicular forces combine into one resultant: the hypotenuse" });

  // ---------- Interactive: motion lab ----------
  const { setup, controls, readout, loop, typeset, fix, css } = DEMOS._lib;
  DEMOS.motion = (root, col) => {
    const { ctx, size, W, H } = setup(root, 340);
    const v = controls(root, [
      { key: "u", label: "starting speed (m/s)", min: 0, max: 20, step: 1, value: 4 },
      { key: "a", label: "acceleration (m/s²)", min: -3, max: 3, step: 0.5, value: 1.5 },
      { key: "T", label: "time shown (s)", min: 4, max: 12, step: 1, value: 8 }
    ]);
    const out = readout(root); let last = "";
    const vel = (s) => Math.max(0, v.u + v.a * s);
    const dist = (s) => { const stop = v.a < 0 ? v.u / -v.a : Infinity, k = Math.min(s, stop); return v.u * k + .5 * v.a * k * k; };
    return loop((tt) => {
      size(); const w = W(), h = H(), T = v.T, t = (tt % (T + 1.5)), tc = Math.min(t, T); ctx.clearRect(0, 0, w, h);
      const vmax = Math.max(4, v.u + Math.max(0, v.a) * T) * 1.15, smax = Math.max(10, dist(T)) * 1.1;
      // road
      const L = w - 60; ctx.strokeStyle = css("--line"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(20, 60); ctx.lineTo(w - 20, 60); ctx.stroke();
      car(ctx, 30 + dist(tc) / smax * L, 52, col);
      const gy = 90, gh = h - gy - 36, gw = (w - 90) / 2, g1 = 40, g2 = g1 + gw + 40;
      axes(ctx, g1, gy, gw, gh, "t / s", "distance"); axes(ctx, g2, gy, gw, gh, "t / s", "speed");
      const X1 = (s) => g1 + s / T * gw, Y1 = (d) => gy + gh - d / smax * gh, X2 = (s) => g2 + s / T * gw, Y2 = (q) => gy + gh - q / vmax * gh;
      const p1 = [], p2 = []; for (let s = 0; s <= T + 1e-9; s += T / 120) { p1.push([s, dist(s)]); p2.push([s, vel(s)]); }
      ctx.fillStyle = css("--maths") + "22"; ctx.beginPath(); ctx.moveTo(X2(0), Y2(0)); p2.filter(p => p[0] <= tc).forEach(([s, q]) => ctx.lineTo(X2(s), Y2(q))); ctx.lineTo(X2(tc), Y2(0)); ctx.fill();
      alpha(ctx, .25, () => { trace(ctx, p1, X1, Y1, col, 2); trace(ctx, p2, X2, Y2, css("--maths"), 2); });
      trace(ctx, p1.filter(p => p[0] <= tc), X1, Y1, col); trace(ctx, p2.filter(p => p[0] <= tc), X2, Y2, css("--maths"));
      dot(ctx, X1(tc), Y1(dist(tc)), 6, col, 12); dot(ctx, X2(tc), Y2(vel(tc)), 6, css("--maths"), 12);
      const txt = `After $${T}$ s: speed $= ${fix(vel(T), 1)}$ m/s, distance $=$ area under the speed–time graph $= ${fix(dist(T), 1)}$ m. Gradient of the speed–time graph $= ${fix(v.a, 1)}$ m/s². ${v.a < 0 && v.u / -v.a < T ? `The car stops after $${fix(v.u / -v.a, 1)}$ s, so the line meets the time axis there.` : ""}`;
      if (txt !== last) { out.innerHTML = txt; typeset(out); last = txt; }
    });
  };

  // ---------- Energy: pendulum with live store bars ----------
  V.energyBars = (host) => mount(host, (ctx, W, H, t, P) => {
    const c = cs("--physics"), b = cs("--maths"), g = cs("--chem"), r = cs("--bad");
    const px = Math.min(W * .3, 220), py = 30, L = H - 90, th0 = .75, damp = Math.exp(-t / 22), th = th0 * damp * Math.cos(2 * Math.PI * t / 2.6);
    const x = px + L * Math.sin(th), y = py + L * Math.cos(th), hmax = L * (1 - Math.cos(th0)), h = L * (1 - Math.cos(th)), lost = L * (1 - Math.cos(th0)) - L * (1 - Math.cos(th0 * damp));
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - 60, py); ctx.lineTo(px + 60, py); ctx.stroke();
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(px - L, py + L); ctx.lineTo(px + L, py + L); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke(); dot(ctx, x, y, 14, c, 14);
    text(ctx, "lowest point", px + L * .6, py + L + 16, { size: 11, color: cs("--muted") });
    // bars: total = hmax; GPE = h, thermal = lost, KE = rest
    const tot = hmax, gpe = h, th2 = Math.min(lost, tot), ke = Math.max(0, tot - gpe - th2), bx = Math.max(px + L * .75 + 30, W * .55), bw = Math.min(70, (W - bx - 20) / 3 - 14), bh = H - 90;
    [["kinetic", ke, b], ["gravitational potential", gpe, c], ["thermal (to air)", th2, r]].forEach(([n, v, col], i) => {
      const X = bx + i * (bw + 18), hh = v / tot * bh; ctx.fillStyle = col + "22"; ctx.fillRect(X, 40, bw, bh); ctx.fillStyle = col; ctx.fillRect(X, 40 + bh - hh, bw, hh);
      n.split(" ").forEach((w, k, a) => text(ctx, w, X + bw / 2, 40 + bh + 16 + k * 13 - (a.length > 2 ? 6 : 0), { size: 11, align: "center", color: col, weight: 600 })); });
    text(ctx, "Total energy is constant: it moves between stores", bx, 24, { size: 12, color: cs("--ink"), weight: 600 });
  }, { h: 330, period: 20, caption: "Highest point: all gravitational potential. Lowest point: all kinetic. Air resistance slowly moves energy to the thermal store." });

  // ---------- Power station: chain of transfers ----------
  V.powerStation = (host) => mount(host, (ctx, W, H, t) => {
    const c = cs("--physics"), b = cs("--maths"), g = cs("--chem"), ink = cs("--ink"), n = 5, gap = 10, bw = (W - 40 - gap * (n - 1)) / n, y = 70, bh = 120;
    const st = [["Fuel burns", "chemical → thermal", c], ["Boiler", "water → steam", r()], ["Turbine", "steam spins it: kinetic", b], ["Generator", "kinetic → electrical", g], ["Grid", "to homes", ink]];
    function r() { return cs("--bad"); }
    st.forEach(([h, s2, col], i) => { const x = 20 + i * (bw + gap); ctx.fillStyle = col + "18"; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(x, y, bw, bh, 10); ctx.fill(); ctx.stroke();
      text(ctx, h, x + bw / 2, y + 22, { size: 13, align: "center", weight: 700, color: col }); text(ctx, s2, x + bw / 2, y + bh + 20, { size: 11, align: "center", color: cs("--muted") });
      const cx = x + bw / 2, cy = y + 72;
      if (i === 0) for (let k = 0; k < 5; k++) { const f = (t * 2 + k * .37) % 1; alpha(ctx, 1 - f, () => dot(ctx, cx - 20 + k * 10, cy + 20 - f * 50, 6 - f * 4, k % 2 ? c : cs("--bad"))); }
      if (i === 1) for (let k = 0; k < 6; k++) { const f = (t * 1.2 + k / 6) % 1; alpha(ctx, .3 + .7 * (1 - f), () => dot(ctx, cx - 18 + (k % 3) * 18 + Math.sin(t * 5 + k) * 3, cy + 22 - f * 54, 5, cs("--muted"))); }
      if (i === 2 || i === 3) { const a = t * (i === 2 ? 6 : 6); ctx.strokeStyle = col; ctx.lineWidth = 3; for (let k = 0; k < (i === 2 ? 6 : 2); k++) { const q = a + k * Math.PI * 2 / (i === 2 ? 6 : 2); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + 26 * Math.cos(q), cy + 26 * Math.sin(q)); ctx.stroke(); } dot(ctx, cx, cy, 5, col); if (i === 3) { ctx.beginPath(); ctx.arc(cx, cy, 30, 0, 7); ctx.stroke(); } }
      if (i === 4) { ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - 14, cy + 28); ctx.lineTo(cx, cy - 28); ctx.lineTo(cx + 14, cy + 28); ctx.moveTo(cx - 20, cy - 14); ctx.lineTo(cx + 20, cy - 14); ctx.stroke(); const f = (t * 1.5) % 1; dot(ctx, cx - 20 + f * 40, cy - 14, 4, cs("--chem"), 10); }
      if (i < n - 1) { const f = (t * 1.5 + i * .2) % 1; alpha(ctx, .8, () => dot(ctx, x + bw + gap / 2, y + bh / 2, 3 + 2 * Math.sin(f * Math.PI), col)); }
    });
    // waste heat
    const f = (t * .8) % 1; alpha(ctx, 1 - f, () => text(ctx, "≈ 60% wasted as heat to the surroundings (cooling towers)", W / 2, y - 22 - f * 16, { size: 12, align: "center", color: cs("--bad"), weight: 600 }));
  }, { h: 240, period: 6, caption: "Thermal power station: every stage wastes some energy, so overall efficiency is only about 35–45%" });

  // ---------- Interactive: roller coaster ----------
  DEMOS.coaster = (root, col) => {
    const { ctx, size, W, H } = setup(root, 320);
    const v = controls(root, [
      { key: "h", label: "start height (m)", min: 10, max: 50, step: 1, value: 30 },
      { key: "m", label: "mass (kg)", min: 100, max: 1000, step: 50, value: 500 },
      { key: "f", label: "energy lost to friction (%)", min: 0, max: 40, step: 5, value: 10 }
    ]);
    const out = readout(root); let last = "";
    const track = (u) => .5 + .5 * Math.cos(u * Math.PI * 2.2) * (1 - u * .35); // height fraction along the track
    return loop((tt) => {
      size(); const w = W(), hh = H(); ctx.clearRect(0, 0, w, hh);
      const g = 9.8, H0 = v.h, top = 30, base = hh - 50, sc = (base - top) / 50, X = (u) => 30 + u * (w - 60), Y = (u) => base - track(u) * H0 * sc;
      ctx.fillStyle = css("--line"); ctx.beginPath(); ctx.moveTo(X(0), base); for (let u = 0; u <= 1.0001; u += .005) ctx.lineTo(X(u), Y(u)); ctx.lineTo(X(1), base); ctx.fill();
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 3; ctx.beginPath(); for (let u = 0; u <= 1.0001; u += .005) u ? ctx.lineTo(X(u), Y(u)) : ctx.moveTo(X(u), Y(u)); ctx.stroke();
      const u = (tt % 7) / 7, hNow = track(u) * H0, Etot = v.m * g * H0, lost = Etot * v.f / 100 * u, gpe = v.m * g * hNow, ke = Math.max(0, Etot - lost - gpe), spd = Math.sqrt(2 * ke / v.m);
      if (ke > 0 || u < .01) dot(ctx, X(u), Y(u) - 9, 9, col, 14);
      const bx = w / 2 - 75, bw = 40, bh = 90;
      [["KE", ke, css("--maths")], ["GPE", gpe, col], ["heat", lost, css("--bad")]].forEach(([n, e, c2], i) => { const x = bx + i * 55, f = e / Etot * bh; ctx.fillStyle = c2 + "22"; ctx.fillRect(x, 20, bw, bh); ctx.fillStyle = c2; ctx.fillRect(x, 20 + bh - f, bw, f); ctx.fillStyle = css("--ink"); ctx.font = "600 12px Inter, sans-serif"; ctx.textAlign = "center"; ctx.fillText(n, x + bw / 2, 20 + bh + 15); ctx.textAlign = "left"; });
      ctx.fillStyle = css("--muted"); ctx.font = "12px Inter, sans-serif"; ctx.fillText("speed now: " + spd.toFixed(1) + " m/s", 30, 22);
      const vb = Math.sqrt(2 * g * H0 * (1 - v.f / 100 * .25));
      const txt = `Start: $E_p=mgh=${v.m}\\times9.8\\times${v.h}=${fix(Etot / 1000, 1)}$ kJ. With no friction the speed at the lowest point would be $v=\\sqrt{2gh}=${fix(Math.sqrt(2 * g * H0), 1)}$ m/s, whatever the mass. Friction moves ${v.f}% of the energy to the thermal store by the end, so the car cannot climb back to its starting height.`;
      if (txt !== last) { out.innerHTML = txt; typeset(out); last = txt; }
    });
  };
})();
