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

  // ---------- Pressure: jets from a tank get longer with depth ----------
  V.pressureDepth = (host) => mount(host, (ctx, W, H, t) => {
    const b = cs("--maths"), c = cs("--physics"), tx = Math.max(150, W * .2), tw = 110, top = 24, lvl = 40, bot = H * .58, floor = H - 12, G = 600;
    ctx.fillStyle = b + "30"; ctx.fillRect(tx, lvl, tw, bot - lvl); ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx, top); ctx.lineTo(tx, bot); ctx.lineTo(tx + tw, bot); ctx.lineTo(tx + tw, top); ctx.stroke();
    ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tx + 10, bot); ctx.lineTo(tx + 10, floor); ctx.moveTo(tx + tw - 10, bot); ctx.lineTo(tx + tw - 10, floor); ctx.moveTo(20, floor); ctx.lineTo(W - 20, floor); ctx.stroke();
    ctx.strokeStyle = b; ctx.beginPath(); ctx.moveTo(tx, lvl); ctx.lineTo(tx + tw, lvl); ctx.stroke();
    [.25, .5, .85].forEach((f, i) => { const y = lvl + f * (bot - lvl), d = y - lvl, vx = 30 * Math.sqrt(d), tf = Math.sqrt(2 * (floor - y) / G);
      ctx.strokeStyle = b; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const tt = tf * k / 40, X = tx + tw + vx * tt, Y = y + .5 * G * tt * tt; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
      for (let j = 0; j < 3; j++) { const tt = ((t * .9 + j / 3 + i * .1) % 1) * tf; dot(ctx, tx + tw + vx * tt, y + .5 * G * tt * tt, 4, b, 8); }
      text(ctx, ["shallow: weak jet", "deeper: stronger jet", "deepest: strongest jet"][i], tx - 30, y + 4, { size: 11, align: "right", color: cs("--muted") });
      arrow(ctx, tx + 18, y, tx + 18 - (6 + d * .12), y, c, 2); });
    text(ctx, "pressure increases with depth", W - 16, 22, { size: 13, align: "right", weight: 600 });
    text(ctx, "Δp = ρgΔh", W - 16, 42, { size: 13, align: "right", color: c, weight: 600 });
  }, { h: 320, period: 6, caption: "Water squirts further from deeper holes: more water above, so more pressure pushing it out" });

  // ---------- Interactive: float or sink ----------
  DEMOS.density = (root, col) => {
    const { ctx, size, W, H } = setup(root, 300);
    const liquids = [["water", 1.0], ["salt water", 1.2], ["oil", 0.9], ["mercury", 13.6]];
    let li = 0;
    const segEl = document.createElement("div"); segEl.className = "seg"; segEl.style.marginTop = "12px";
    segEl.innerHTML = liquids.map(([n], i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const bt = e.target.closest("button"); if (!bt) return; li = +bt.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === bt)); };
    root.appendChild(segEl);
    const v = controls(root, [
      { key: "m", label: "mass of block (g)", min: 20, max: 1200, step: 10, value: 300 },
      { key: "V", label: "volume of block (cm³)", min: 100, max: 1000, step: 10, value: 400 }
    ]);
    const out = readout(root); let last = "", y = 0;
    return loop(() => {
      size(); const w = W(), h = H(), [ln, rl] = liquids[li], rho = v.m / v.V, surf = 110, bot = h - 20; ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = (li === 3 ? css("--muted") : css("--maths")) + "30"; ctx.fillRect(40, surf, w - 80, bot - surf);
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(40, 30); ctx.lineTo(40, bot); ctx.lineTo(w - 40, bot); ctx.lineTo(w - 40, 30); ctx.stroke();
      const side = 40 + Math.cbrt(v.V) * 5, frac = Math.min(1, rho / rl), target = rho < rl ? surf - side + side * frac : bot - side;
      y += (target - y) * .08; if (!y) y = 40;
      ctx.fillStyle = col + "aa"; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(w / 2 - side / 2, y, side, side, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = css("--ink"); ctx.font = "600 13px Inter, sans-serif"; ctx.textAlign = "center"; ctx.fillText(rho.toFixed(2) + " g/cm³", w / 2, y + side / 2 + 5); ctx.textAlign = "left";
      ctx.font = "12px Inter, sans-serif"; ctx.fillStyle = css("--muted"); ctx.fillText(ln + ": " + rl + " g/cm³", 50, surf + 18);
      const txt = `Density of block $\\rho=\\dfrac{m}{V}=\\dfrac{${v.m}}{${v.V}}=${fix(rho, 2)}$ g/cm³. ${rho < rl ? `Less dense than ${ln} (${rl} g/cm³), so it <b>floats</b>, with about ${Math.round(frac * 100)}% of it below the surface.` : rho > rl ? `Denser than ${ln} (${rl} g/cm³), so it <b>sinks</b>.` : `Same density as ${ln}: it hangs anywhere in the liquid.`}`;
      if (txt !== last) { out.innerHTML = txt; typeset(out); last = txt; }
    });
  };

  // ---------- States of matter: three boxes of particles ----------
  const rnd = (i, k) => Math.abs(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1;
  V.particleStates = (host) => mount(host, (ctx, W, H, t) => {
    const cols = [cs("--maths"), cs("--chem"), cs("--physics")], bw = (W - 80) / 3, bh = H - 70, y0 = 30, r = Math.min(9, bw / 22);
    ["solid", "liquid", "gas"].forEach((name, k) => {
      const x0 = 20 + k * (bw + 20); ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 2; ctx.strokeRect(x0, y0, bw, bh);
      text(ctx, name, x0 + bw / 2, H - 14, { size: 14, weight: 700, align: "center", color: cols[k] });
      if (k === 0) { const n = 7, d = 2 * r + 2, ox = x0 + bw / 2 - n * d / 2 + r, oy = y0 + bh - n * d + r - 4;
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const q = i * n + j; dot(ctx, ox + i * d + 1.6 * Math.sin(t * 19 + q), oy + j * d + 1.6 * Math.cos(t * 23 + q * 1.7), r, cols[0]); } }
      if (k === 1) { const n = 40; for (let i = 0; i < n; i++) { const row = Math.floor(i / 8), col = i % 8, d = 2 * r + 3, drift = (t * (12 + 8 * rnd(i, 2)) + rnd(i, 1) * bw) % (bw - 2 * r);
          dot(ctx, x0 + r + ((col * d + drift) % (bw - 2 * r)), y0 + bh - r - 2 - row * (d - 1) + 2 * Math.sin(t * 6 + i), r, cols[1]); } }
      if (k === 2) { for (let i = 0; i < 12; i++) { const vx = 70 + 60 * rnd(i, 3), vy = 60 + 60 * rnd(i, 4), L = bw - 2 * r, M = bh - 2 * r;
          const px = (rnd(i, 5) * L + vx * t) % (2 * L), py = (rnd(i, 6) * M + vy * t) % (2 * M);
          dot(ctx, x0 + r + (px > L ? 2 * L - px : px), y0 + r + (py > M ? 2 * M - py : py), r, cols[2]); } }
    });
  }, { h: 280, period: 12, caption: "Solid: vibrate in fixed places. Liquid: close together but slide past each other. Gas: far apart, fast, random." });

  // ---------- Brownian motion ----------
  V.brownian = (host) => mount(host, (ctx, W, H, t) => {
    const c = cs("--physics"), cx = W / 2, cy = H / 2;
    // random walk path from seeded steps
    const steps = Math.floor(t * 6), pts = [[0, 0]]; for (let i = 1; i <= steps; i++) { const a = rnd(i, 9) * Math.PI * 2, L = 6 + 14 * rnd(i, 8); pts.push([pts[i - 1][0] + L * Math.cos(a), pts[i - 1][1] + L * Math.sin(a)]); }
    for (let i = 0; i < 160; i++) { const sp = 80 + 120 * rnd(i, 1), a = rnd(i, 2) * 6.283, x = ((rnd(i, 3) * W + Math.cos(a) * sp * t) % W + W) % W, y = ((rnd(i, 4) * H + Math.sin(a) * sp * t) % H + H) % H; dot(ctx, x, y, 1.8, cs("--muted")); }
    ctx.strokeStyle = c + "88"; ctx.lineWidth = 1.5; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(cx + x, cy + y) : ctx.moveTo(cx + x, cy + y)); ctx.stroke();
    const [lx, ly] = pts[pts.length - 1]; dot(ctx, cx + lx, cy + ly, 11, c, 16);
    text(ctx, "smoke particle (big, visible)", cx + lx + 16, cy + ly - 10, { size: 12, color: c, weight: 600 });
    text(ctx, "air molecules (tiny, fast, invisible)", 14, 20, { size: 12, color: cs("--muted") });
  }, { h: 300, period: 14, caption: "The smoke particle jiggles randomly because it is hit unevenly by fast-moving air molecules" });

  // ---------- Interactive: gas in a cylinder ----------
  DEMOS.gas = (root, col) => {
    const { ctx, size, W, H } = setup(root, 300);
    const v = controls(root, [
      { key: "T", label: "temperature (°C)", min: -100, max: 300, step: 10, value: 20 },
      { key: "V", label: "volume (cm³)", min: 40, max: 200, step: 10, value: 100 }
    ]);
    const out = readout(root); let last = "", parts = Array.from({ length: 36 }, (_, i) => ({ x: rnd(i, 1), y: rnd(i, 2), a: rnd(i, 3) * 6.283 })), hits = [], tPrev = 0;
    return loop((tt) => {
      size(); const w = W(), h = H(), dt = Math.min(.05, tt - tPrev); tPrev = tt; ctx.clearRect(0, 0, w, h);
      const TK = v.T + 273, x0 = 40, y0 = 30, bh = h - 70, bwMax = Math.min(w - 260, 460), bw = bwMax * v.V / 200, sp = 40 * Math.sqrt(TK / 293) * 3;
      ctx.fillStyle = css("--line"); ctx.fillRect(x0 + bw, y0 - 6, 14, bh + 12); ctx.fillRect(x0 + bw + 14, y0 + bh / 2 - 5, 60, 10);
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 + bwMax + 40, y0); ctx.lineTo(x0, y0); ctx.lineTo(x0, y0 + bh); ctx.lineTo(x0 + bwMax + 40, y0 + bh); ctx.stroke();
      let n = 0; parts.forEach(p => { let X = x0 + 6 + p.x * (bw - 12), Y = y0 + 6 + p.y * (bh - 12);
        X += Math.cos(p.a) * sp * dt; Y += Math.sin(p.a) * sp * dt;
        if (X < x0 + 6 || X > x0 + bw - 6) { p.a = Math.PI - p.a; X = Math.max(x0 + 6, Math.min(x0 + bw - 6, X)); n++; hits.push(tt); }
        if (Y < y0 + 6 || Y > y0 + bh - 6) { p.a = -p.a; Y = Math.max(y0 + 6, Math.min(y0 + bh - 6, Y)); n++; hits.push(tt); }
        p.x = (X - x0 - 6) / (bw - 12); p.y = (Y - y0 - 6) / (bh - 12); dot(ctx, X, Y, 5, col); });
      hits = hits.filter(q => tt - q < 1);
      const pr = 100 * (TK / 293) * (100 / v.V), gx = w - 120, gy = h / 2 - 10;
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(gx, gy, 52, Math.PI * .75, Math.PI * 2.25); ctx.stroke();
      const ang = Math.PI * .75 + Math.min(1, pr / 400) * Math.PI * 1.5; ctx.strokeStyle = css("--bad"); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + 44 * Math.cos(ang), gy + 44 * Math.sin(ang)); ctx.stroke();
      ctx.fillStyle = css("--ink"); ctx.font = "600 14px Inter, sans-serif"; ctx.textAlign = "center"; ctx.fillText(pr.toFixed(0) + " kPa", gx, gy + 32); ctx.font = "12px Inter, sans-serif"; ctx.fillStyle = css("--muted"); ctx.fillText("wall hits/s: " + hits.length, gx, gy + 72); ctx.textAlign = "left";
      const txt = `$T=${v.T}+273=${TK}$ K. Pressure $\\approx ${fix(pr, 0)}$ kPa. Hotter → particles faster → more frequent, harder collisions → higher pressure. Smaller volume → particles hit the walls more often → higher pressure. At constant temperature $pV$ stays constant: here $pV=${fix(pr * v.V / 1000, 1)}\\times10^3$ kPa cm³.`;
      if (txt !== last) { out.innerHTML = txt; typeset(out); last = txt; }
    });
  };

  // ---------- Heating curve of ice → steam ----------
  // piecewise temperature over time (s): ice warms, melts (flat), water warms, boils (flat), steam warms
  const heatT = (t) => t < 1.5 ? -20 + 20 * t / 1.5 : t < 4 ? 0 : t < 7.5 ? 100 * (t - 4) / 3.5 : t < 11.5 ? 100 : 100 + 20 * (t - 11.5) / 1.5;
  V.heatingCurve = (host) => mount(host, (ctx, W, H, t) => {
    const c = cs("--physics"), b = cs("--maths"), g = cs("--chem"), gx = 50, gy = 24, gw = W * .62 - 60, gh = H - 64, T = 13;
    axes(ctx, gx, gy, gw, gh, "time (energy supplied) →", "temperature / °C");
    const X = (s) => gx + s / T * gw, Y = (q) => gy + gh - (q + 30) / 160 * gh;
    [[0, "0"], [100, "100"]].forEach(([q, l]) => { ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(gx, Y(q)); ctx.lineTo(gx + gw, Y(q)); ctx.stroke(); ctx.setLineDash([]); text(ctx, l, gx - 6, Y(q) + 4, { size: 11, align: "right", color: cs("--muted") }); });
    const pts = []; for (let s = 0; s <= Math.min(t, T); s += .04) pts.push([s, heatT(s)]); trace(ctx, pts, X, Y, c);
    dot(ctx, X(Math.min(t, T)), Y(heatT(Math.min(t, T))), 6, c, 12);
    const lab = [[.7, -20, "solid warms"], [2.75, 0, "melting: temp constant"], [5.6, 50, "liquid warms"], [9.5, 100, "boiling: temp constant"], [12.2, 110, "gas"]];
    lab.forEach(([s, q, l]) => { if (t > s - .6) text(ctx, l, X(s), Y(q) - 10, { size: 11, color: cs("--ink"), align: "center", weight: 600 }); });
    // particle panel
    const px = W * .66, pw = W - px - 16, py = 30, ph = H - 80, state = t < 1.5 ? 0 : t < 4 ? (t - 1.5) / 2.5 : t < 7.5 ? 1 : t < 11.5 ? 1 + (t - 7.5) / 4 : 2;
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 2; ctx.strokeRect(px, py, pw, ph);
    const r = Math.min(8, pw / 18), n = 25, temp = heatT(t);
    for (let i = 0; i < n; i++) { const gxp = px + 20 + (i % 5) * (2 * r + 2), gyp = py + ph - 20 - Math.floor(i / 5) * (2 * r + 2);
      const lx = px + r + ((rnd(i, 1) * pw + t * 30 * (rnd(i, 2) - .5)) % (pw - 2 * r) + pw) % (pw - 2 * r), ly = py + ph - r - 2 - Math.floor(i / 7) * (2 * r) ;
      const L = pw - 2 * r, M = ph - 2 * r, ax = (rnd(i, 5) * L + (80 + 60 * rnd(i, 3)) * t) % (2 * L), ay = (rnd(i, 6) * M + (70 + 50 * rnd(i, 4)) * t) % (2 * M), gxg = px + r + (ax > L ? 2 * L - ax : ax), gyg = py + r + (ay > M ? 2 * M - ay : ay);
      const k1 = Math.min(1, state), k2 = Math.max(0, state - 1), jit = 1 + (temp + 30) / 40;
      let x = gxp + (lx - gxp) * k1, y = gyp + (ly - gyp) * k1; x += (gxg - x) * k2; y += (gyg - y) * k2;
      dot(ctx, x + jit * Math.sin(t * 20 + i), y + jit * Math.cos(t * 17 + i), r, state < .5 ? b : state < 1.5 ? g : c); }
    text(ctx, state < .99 ? (state > 0 ? "melting" : "ice") : state < 1.01 ? "water" : state < 1.99 ? "boiling" : "steam", px + pw / 2, py + ph + 22, { size: 13, weight: 700, align: "center" });
  }, { h: 320, period: 14, caption: "During melting and boiling, energy goes into breaking bonds between particles, so the temperature does not rise" });

  // ---------- Evaporation: fastest particles escape, liquid cools ----------
  V.evaporation = (host) => mount(host, (ctx, W, H, t, P) => {
    const c = cs("--physics"), b = cs("--maths"), surf = H * .45, bx = 40, bw = W * .6;
    ctx.fillStyle = b + "22"; ctx.fillRect(bx, surf, bw, H - surf - 20); ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, surf - 40); ctx.lineTo(bx, H - 20); ctx.lineTo(bx + bw, H - 20); ctx.lineTo(bx + bw, surf - 40); ctx.stroke();
    ctx.strokeStyle = b; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, surf); ctx.lineTo(bx + bw, surf); ctx.stroke();
    const escaped = Math.floor(t / P * 8);
    for (let i = 0; i < 30; i++) { const fast = i < 8, sp = fast ? 3 : 1; const L = bw - 16, M = H - surf - 36;
      if (fast && i < escaped) { const age = (t - i * P / 8) , y = surf - 10 - age * 40, x = bx + 20 + rnd(i, 1) * (bw - 40) + age * 10; if (y > 10) dot(ctx, x, y, 6, c, 10); continue; }
      const ax = (rnd(i, 2) * L + 40 * sp * t * (rnd(i, 3) + .5)) % (2 * L), ay = (rnd(i, 4) * M + 30 * sp * t * (rnd(i, 5) + .5)) % (2 * M);
      dot(ctx, bx + 8 + (ax > L ? 2 * L - ax : ax), surf + 8 + (ay > M ? 2 * M - ay : ay), 6, fast ? c : b, fast ? 10 : 0); }
    const temp = 30 - 6 * (escaped / 8);
    const tx = bx + bw + 50, ty = 40, th = H - 80;
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.strokeRect(tx, ty, 14, th); ctx.fillStyle = cs("--bad"); const hh = (temp - 15) / 20 * th; ctx.fillRect(tx + 3, ty + th - hh, 8, hh);
    text(ctx, temp.toFixed(1) + " °C", tx + 24, ty + th - hh + 4, { size: 13, weight: 700 });
    text(ctx, "fast (high-energy) particles escape", 16, 20, { size: 12, color: c, weight: 600 });
    text(ctx, "slower ones left behind → average KE falls → liquid cools", 16, 38, { size: 12, color: cs("--muted") });
  }, { h: 300, period: 10, caption: "Evaporation removes the most energetic particles, so the average kinetic energy (temperature) of the liquid falls" });

  // ---------- Interactive: specific heat capacity ----------
  DEMOS.shc = (root, col) => {
    const { ctx, size, W, H } = setup(root, 280);
    const mats = [["water", 4200], ["aluminium", 900], ["copper", 390], ["oil", 2000]]; let mi = 0;
    const segEl = document.createElement("div"); segEl.className = "seg"; segEl.style.marginTop = "12px";
    segEl.innerHTML = mats.map(([n], i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const bt = e.target.closest("button"); if (!bt) return; mi = +bt.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === bt)); };
    root.appendChild(segEl);
    const v = controls(root, [
      { key: "m", label: "mass (kg)", min: 0.2, max: 2, step: 0.1, value: 1 },
      { key: "P", label: "heater power (W)", min: 20, max: 100, step: 5, value: 50 },
      { key: "t", label: "heating time (min)", min: 1, max: 20, step: 1, value: 10 }
    ]);
    const out = readout(root); let last = "";
    return loop((tt) => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h); const [mn, c] = mats[mi], E = v.P * v.t * 60, dT = E / (v.m * c), gx = 50, gy = 20, gw = w - 90, gh = h - 60, Tmax = 80;
      axes(ctx, gx, gy, gw, gh, "time / min", "temperature rise / °C");
      const X = (m) => gx + m / 20 * gw, Y = (q) => gy + gh - Math.min(q, Tmax) / Tmax * gh, k = Math.min(1, (tt % 4) / 3);
      mats.forEach(([n, cc], j) => { const pts = []; for (let m = 0; m <= v.t; m += .2) pts.push([m, v.P * m * 60 / (v.m * cc)]); alpha(ctx, j === mi ? 1 : .25, () => trace(ctx, pts, X, Y, j === mi ? col : css("--muted"), j === mi ? 3 : 2));
        const lastp = pts[pts.length - 1]; alpha(ctx, j === mi ? 1 : .5, () => { ctx.fillStyle = css("--ink"); ctx.font = "12px Inter, sans-serif"; ctx.fillText(n, Math.min(X(lastp[0]) + 6, w - 70), Math.max(Y(lastp[1]) + 4, gy + 10)); }); });
      const txt = `Energy supplied $E=Pt=${v.P}\\times${v.t * 60}=${E}$ J. Temperature rise $\\Delta\\theta=\\dfrac{E}{mc}=\\dfrac{${E}}{${v.m}\\times${c}}=${fix(dT, 1)}$ °C for ${mn}. A high specific heat capacity means a small temperature rise for the same energy.`;
      if (txt !== last) { out.innerHTML = txt; typeset(out); last = txt; }
    });
  };

  // ---------- Conduction: vibrations pass along a lattice; free electrons in metals ----------
  V.conduction = (host) => mount(host, (ctx, W, H, t, P) => {
    const c = cs("--physics"), b = cs("--maths"), rows = [[60, "non-metal (e.g. glass): vibrations passed slowly from particle to particle", false], [H / 2 + 50, "metal: free electrons carry energy quickly along the whole bar", true]];
    rows.forEach(([y0, label, metal]) => {
      const n = 14, dx = (W - 120) / (n - 1), x0 = 90; text(ctx, label, 20, y0 - 34, { size: 12, weight: 600, color: metal ? c : cs("--ink") });
      // flame on left
      ctx.fillStyle = cs("--bad"); ctx.beginPath(); ctx.moveTo(40, y0 + 20); ctx.quadraticCurveTo(26, y0, 40, y0 - 22); ctx.quadraticCurveTo(54, y0, 40, y0 + 20); ctx.fill();
      for (let i = 0; i < n; i++) { const front = metal ? t * 6 : t * 1.6, heat = Math.max(0, Math.min(1, front - i * .9)) * (1 - i / (n * 1.6)), amp = 1 + 7 * heat, x = x0 + i * dx;
        for (let j = -1; j <= 1; j++) { const yy = y0 + j * 18; const col = heat > .05 ? `rgba(217,83,31,${.35 + .65 * heat})` : b; dot(ctx, x + amp * Math.sin(t * 22 + i * 1.3 + j), yy + amp * Math.cos(t * 19 + i + j * 2), 6, col); } }
      if (metal) for (let k = 0; k < 10; k++) { const ex = x0 + (((t * 160 + k * 97) % (W - 120)) + (W - 120)) % (W - 120), ey = y0 - 27 + ((k * 13) % 54); dot(ctx, ex, ey, 2.5, cs("--ink")); }
    });
  }, { h: 300, period: 8, caption: "Heated end vibrates more; in metals, fast free electrons spread the energy much faster" });

  // ---------- Convection current in a beaker ----------
  V.convection = (host) => mount(host, (ctx, W, H, t) => {
    const b = cs("--maths"), c = cs("--physics"), x0 = W / 2 - 150, w = 300, y0 = 40, h = H - 100;
    ctx.fillStyle = b + "22"; ctx.fillRect(x0, y0, w, h); ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y0 - 14); ctx.lineTo(x0, y0 + h); ctx.lineTo(x0 + w, y0 + h); ctx.lineTo(x0 + w, y0 - 14); ctx.stroke();
    // flame under right side
    const fx = x0 + w * .72; ctx.fillStyle = cs("--bad"); ctx.beginPath(); ctx.moveTo(fx, y0 + h + 44); ctx.quadraticCurveTo(fx - 16, y0 + h + 22, fx, y0 + h + 6); ctx.quadraticCurveTo(fx + 16, y0 + h + 22, fx, y0 + h + 44); ctx.fill();
    // loop path: up on the right, across the top to the left, down on the left, back along the bottom
    const cx = x0 + w / 2, cy = y0 + h / 2, rx = w * .32, ry = h * .34;
    for (let i = 0; i < 26; i++) { const a = (-t * .9 + i / 26 * Math.PI * 2) % (Math.PI * 2), x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a), hot = Math.cos(a) > 0 ? (1 - (Math.sin(a) + 1) / 2) * .4 + .6 * (Math.cos(a)) : 0;
      dot(ctx, x, y, 6, hot > .3 ? c : b, hot > .3 ? 10 : 0); }
    arrow(ctx, cx + rx + 26, cy + 30, cx + rx + 26, cy - 30, c, 3); arrow(ctx, cx - rx - 26, cy - 30, cx - rx - 26, cy + 30, b, 3);
    text(ctx, "hot water rises", x0 + w + 10, cy - 10, { size: 12, color: c, weight: 600 }); text(ctx, "(expands, less dense)", x0 + w + 10, cy + 6, { size: 11, color: c });
    text(ctx, "cooler, denser", x0 - 10, cy - 4, { size: 12, color: b, weight: 600, align: "right" }); text(ctx, "water sinks", x0 - 10, cy + 12, { size: 12, color: b, weight: 600, align: "right" });
  }, { h: 340, period: 7, caption: "A convection current: heated fluid rises, cooler fluid sinks to replace it, and the loop carries energy round" });

  // ---------- Interactive: energy balance (radiation) ----------
  DEMOS.balance = (root, col) => {
    const { ctx, size, W, H } = setup(root, 280);
    let surf = 0; const surfs = [["matt black", 0.95, 0.95], ["white", 0.35, 0.9], ["shiny silver", 0.1, 0.1]];
    const segEl = document.createElement("div"); segEl.className = "seg"; segEl.style.marginTop = "12px";
    segEl.innerHTML = surfs.map(([n], i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join("");
    segEl.onclick = e => { const bt = e.target.closest("button"); if (!bt) return; surf = +bt.dataset.i; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === bt)); hist = []; T = 293; };
    root.appendChild(segEl);
    const v = controls(root, [{ key: "Pin", label: "radiation falling on it (W)", min: 0, max: 60, step: 2, value: 30 }, { key: "A", label: "surface area (×)", min: 0.5, max: 2, step: 0.1, value: 1 }]);
    const out = readout(root); let last = "", T = 293, hist = [], tp = 0;
    return loop((tt) => {
      size(); const w = W(), h = H(), dt = Math.min(.05, tt - tp); tp = tt; ctx.clearRect(0, 0, w, h);
      const [, a, e] = surfs[surf], Ts = 293, loss = (q) => e * v.A * 2.5e-9 * (q ** 4 - Ts ** 4) + 0.12 * v.A * (q - Ts), absorbed = a * v.Pin, emitted = loss(T);
      T += (absorbed - emitted) * dt * 0.12; hist.push(T); if (hist.length > 400) hist.shift();
      let lo = Ts, hi = 600; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (loss(m) > absorbed) hi = m; else lo = m; } const Teq = lo;
      const gx = 50, gy = 20, gw = w * .62 - 60, gh = h - 50; axes(ctx, gx, gy, gw, gh, "time", "temperature / °C");
      const Y = (q) => gy + gh - (q - 280) / 120 * gh; trace(ctx, hist.map((q, i) => [i, q]), (i) => gx + i / 400 * gw, Y, col);
      ctx.setLineDash([4, 4]); ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, Y(Teq)); ctx.lineTo(gx + gw, Y(Teq)); ctx.stroke(); ctx.setLineDash([]);
      const bx = w * .7, by = h / 2; ctx.fillStyle = surf === 0 ? "#222" : surf === 1 ? "#eee" : "#bbb"; ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(bx, by - 30 * v.A, 60, 60 * v.A, 6); ctx.fill(); ctx.stroke();
      arrow(ctx, bx - 70, by, bx - 6, by, css("--physics"), 2 + absorbed / 10); arrow(ctx, bx + 66, by, bx + 66 + 20 + Math.max(0, emitted) * 1.2, by, css("--bad"), 2 + Math.max(0, emitted) / 10);
      ctx.fillStyle = css("--ink"); ctx.font = "12px Inter, sans-serif"; ctx.fillText("absorbs " + absorbed.toFixed(1) + " W", bx - 80, by + 26); ctx.fillText("loses " + Math.max(0, emitted).toFixed(1) + " W", bx + 70, by + 26);
      const state = Math.abs(absorbed - emitted) < .4 ? "gaining and losing energy at the same rate, so its temperature is <b>constant</b>" : absorbed > emitted ? "gaining energy faster than it loses it, so it is <b>warming up</b>" : "losing energy faster than it gains it, so it is <b>cooling down</b>";
      const txt = `Now ${(T - 273).toFixed(0)} °C: ${state}. It settles at about ${(Teq - 273).toFixed(0)} °C (dashed line). A hotter object emits more radiation (and loses more by convection), so it always reaches a balance. Matt black absorbs most, so it settles hottest; shiny silver absorbs least.`;
      if (txt !== last) { out.innerHTML = txt; last = txt; }
    });
  };

  // ---------- Lenses: shared canvas ray-diagram drawer ----------
  function lensScene(ctx, W, H, u, f, col, opts = {}) {
    const ax = H * .55, Lx = W * .45, h = Math.min(60, H * .22), ink = cs("--ink"), mut = cs("--muted"), b = cs("--maths"), r = cs("--bad");
    ctx.strokeStyle = mut; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(10, ax); ctx.lineTo(W - 10, ax); ctx.stroke();
    // lens
    ctx.strokeStyle = b; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(Lx, ax, 9, H * .42, 0, 0, 7); ctx.stroke(); ctx.fillStyle = b + "22"; ctx.fill();
    [-1, 1].forEach(sg => { dot(ctx, Lx + sg * f, ax, 4, ink); text(ctx, "F", Lx + sg * f, ax + 18, { size: 12, align: "center", weight: 700 }); dot(ctx, Lx + sg * 2 * f, ax, 3, mut); text(ctx, "2F", Lx + sg * 2 * f, ax + 18, { size: 11, align: "center", color: mut }); });
    const ox = Lx - u, oy = ax - h; arrow(ctx, ox, ax, ox, oy, col, 3); text(ctx, "object", ox, ax + 32, { size: 11, align: "center", color: col, weight: 600 });
    const line = (x1, y1, x2, y2, c, dash) => { ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.setLineDash(dash ? [5, 5] : []); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]); };
    const ext = (x1, y1, x2, y2, toX) => [toX, y1 + (y2 - y1) * (toX - x1) / (x2 - x1)];
    const real = u > f + .5, v = u * f / (u - f), hi = -h * v / u;
    // ray 1: parallel then through far F
    line(ox, oy, Lx, oy, r); let e = ext(Lx, oy, Lx + f, ax, W - 10); line(Lx, oy, e[0], e[1], r);
    // ray 2: through centre
    e = ext(ox, oy, Lx, ax, W - 10); line(ox, oy, e[0], e[1], cs("--chem"));
    // ray 3: through near F then parallel (only if object beyond F)
    if (real) { const yl = ax + (oy - ax) * (Lx - (Lx - f)) / (ox - (Lx - f)); line(ox, oy, Lx, yl, ink); line(Lx, yl, W - 10, yl, ink); }
    if (real && Lx + v < W - 10) { arrow(ctx, Lx + v, ax, Lx + v, ax - hi, ink, 3); text(ctx, "real image", Lx + v + 6, ax - hi + 16, { size: 11, weight: 700 }); }
    if (!real && u < f - .5) { const vx = Lx + v; line(Lx, oy, vx, ax - hi, mut, true); line(Lx, ax, vx, ax - hi, mut, true); arrow(ctx, vx, ax, vx, ax - hi, mut, 3); text(ctx, "virtual image", vx, ax - hi - 10, { size: 11, align: "center", color: mut, weight: 700 }); }
    return { real, v, m: Math.abs(v / u), up: !real };
  }
  V.lensMove = (host) => mount(host, (ctx, W, H, t, P) => {
    const f = Math.min(80, W * .1), k = (Math.cos(t / P * Math.PI * 2) + 1) / 2, u = f * .55 + k * (W * .45 - 30 - f * .55);
    const res = lensScene(ctx, W, H, u, f, cs("--physics"));
    const d = u > 2 * f + 2 ? "beyond 2F: real, inverted, diminished (camera, eye)" : Math.abs(u - 2 * f) <= 2 ? "at 2F: real, inverted, same size" : u > f + 2 ? "between F and 2F: real, inverted, enlarged (projector)" : Math.abs(u - f) <= 2 ? "at F: no image (rays parallel)" : "inside F: virtual, upright, enlarged (magnifying glass)";
    text(ctx, "Object " + d, 16, 22, { size: 13, weight: 600 });
  }, { h: 330, period: 16, caption: "Move the object closer to the lens and watch the image change" });

  DEMOS.lens = (root, col) => {
    const { ctx, size, W, H } = setup(root, 320);
    const v = controls(root, [{ key: "u", label: "object distance (cm)", min: 4, max: 40, step: 0.5, value: 24 }, { key: "f", label: "focal length (cm)", min: 6, max: 14, step: 1, value: 10 }]);
    const out = readout(root); let last = "";
    return loop(() => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h); const sc = Math.min(8, (w * .45 - 20) / 40), res = lensScene(ctx, w, h, v.u * sc, v.f * sc, col);
      const vv = v.u * v.f / (v.u - v.f), m = Math.abs(vv / v.u);
      const desc = Math.abs(v.u - v.f) < .01 ? "The object is at the focal point: the rays leave parallel and no image forms." : res.real ? `Real, inverted image ${fix(vv, 1)} cm behind the lens, magnification ${fix(m, 2)} (${m > 1.02 ? "enlarged" : m < .98 ? "diminished" : "same size"}). You could catch it on a screen.` : `Virtual, upright, enlarged image (×${fix(m, 2)}) on the same side as the object. The rays never actually meet: your eye traces them back. This is a magnifying glass.`;
      if (desc !== last) { out.innerHTML = desc; last = desc; }
    });
  };

  // ---------- Magnetism helpers: dipole field from two poles ----------
  const field = (x, y, poles) => { let bx = 0, by = 0; poles.forEach(([px, py, q]) => { const dx = x - px, dy = y - py, r3 = Math.pow(dx * dx + dy * dy, 1.5) + 1e-6; bx += q * dx / r3; by += q * dy / r3; }); return [bx, by]; };
  function streamline(x, y, poles, W, H, dir = 1, steps = 600) { const pts = [[x, y]]; for (let i = 0; i < steps; i++) { const [bx, by] = field(x, y, poles), m = Math.hypot(bx, by) || 1; x += dir * 3 * bx / m; y += dir * 3 * by / m; pts.push([x, y]); if (x < 0 || x > W || y < 0 || y > H || poles.some(([px, py, q]) => q * dir < 0 && Math.hypot(x - px, y - py) < 8)) break; } return pts; }
  function barMagnet(ctx, cx, cy, L, T) { ctx.fillStyle = cs("--bad"); ctx.fillRect(cx, cy - T / 2, L / 2, T); ctx.fillStyle = cs("--maths"); ctx.fillRect(cx - L / 2, cy - T / 2, L / 2, T); text(ctx, "N", cx + L / 4, cy + 5, { size: 15, weight: 700, align: "center", color: "#fff" }); text(ctx, "S", cx - L / 4, cy + 5, { size: 15, weight: 700, align: "center", color: "#fff" }); }
  function compass(ctx, x, y, ang, r = 11) { ctx.fillStyle = cs("--surface") || "#fff"; ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.stroke();
    const c = Math.cos(ang), s2 = Math.sin(ang); ctx.fillStyle = cs("--bad"); ctx.beginPath(); ctx.moveTo(x + c * (r - 2), y + s2 * (r - 2)); ctx.lineTo(x - s2 * 3, y + c * 3); ctx.lineTo(x + s2 * 3, y - c * 3); ctx.fill(); ctx.fillStyle = cs("--maths"); ctx.beginPath(); ctx.moveTo(x - c * (r - 2), y - s2 * (r - 2)); ctx.lineTo(x - s2 * 3, y + c * 3); ctx.lineTo(x + s2 * 3, y - c * 3); ctx.fill(); }

  V.fieldPlot = (host) => mount(host, (ctx, W, H, t, P) => {
    const cx = W / 2, cy = H / 2, L = Math.min(180, W * .3), poles = [[cx + L / 2 - 6, cy, 1], [cx - L / 2 + 6, cy, -1]];
    // full field lines, faint
    const starts = []; for (let k = 0; k < 14; k++) { const a = (k + .5) / 14 * Math.PI * 2; starts.push([poles[0][0] + 10 * Math.cos(a), poles[0][1] + 10 * Math.sin(a)]); }
    const lines = starts.map(([x, y]) => streamline(x, y, poles, W, H));
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1.5; lines.forEach(pts => { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); });
    // the line being traced by a moving compass
    const tr = lines[3], k = Math.min(tr.length - 1, Math.floor((t / P) * tr.length * 1.05));
    ctx.strokeStyle = cs("--physics"); ctx.lineWidth = 2.5; ctx.beginPath(); tr.slice(0, k + 1).forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
    for (let j = 0; j <= k; j += 18) { const [x, y] = tr[j]; const [bx, by] = field(x, y, poles); if (j < k - 6) dot(ctx, x, y, 2.5, cs("--physics")); }
    barMagnet(ctx, cx, cy, L, 30);
    const [x, y] = tr[k], [bx, by] = field(x, y, poles); compass(ctx, x, y, Math.atan2(by, bx), 13);
    // static compasses around
    [[cx, cy - 70], [cx, cy + 70], [cx + L * .9, cy], [cx - L * .9, cy], [cx + L * .7, cy - 80], [cx - L * .7, cy + 80]].forEach(([qx, qy]) => { const [fx, fy] = field(qx, qy, poles); compass(ctx, qx, qy, Math.atan2(fy, fx), 10); });
    text(ctx, "Mark where the compass needle points, move the compass to that dot, repeat. Join the dots.", 14, 20, { size: 12, color: cs("--muted") });
  }, { h: 340, period: 9, caption: "Plotting compass method: the N end of the needle shows the field direction, from N to S" });

  // ---------- Field around a straight wire, reversing current ----------
  V.wireField = (host) => mount(host, (ctx, W, H, t, P) => {
    const cx = W / 2, cy = H / 2 + 6, up = (t % P) < P / 2, c = cs("--physics");
    [40, 70, 105, 145].forEach((r, i) => { ctx.strokeStyle = cs("--maths") + ["", "cc", "99", "66"][i]; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
      for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4 + (up ? 1 : -1) * t * .6, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a), d = up ? -1 : 1; arrow(ctx, x, y, x - d * 10 * Math.sin(a), y + d * 10 * Math.cos(a), cs("--maths"), 2); } });
    ctx.fillStyle = cs("--surface"); ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, 7); ctx.fill(); ctx.stroke();
    if (up) dot(ctx, cx, cy, 5, c); else { ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(cx - 9, cy - 9); ctx.lineTo(cx + 9, cy + 9); ctx.moveTo(cx + 9, cy - 9); ctx.lineTo(cx - 9, cy + 9); ctx.stroke(); }
    text(ctx, up ? "current out of the page (•): field anticlockwise" : "current into the page (×): field clockwise", 16, 22, { size: 13, weight: 600 });
    text(ctx, "circles closer together near the wire = stronger field", 16, H - 12, { size: 12, color: cs("--muted") });
  }, { h: 340, period: 8, caption: "Right-hand grip rule: thumb along the current, fingers curl the way the field goes. Reverse the current, reverse the field." });

  // ---------- Relay ----------
  V.relay = (host) => mount(host, (ctx, W, H, t, P) => {
    const on = (t % P) > P * .25 && (t % P) < P * .75, ink = cs("--ink"), c = cs("--physics"), g = cs("--chem");
    const x0 = 30, cx = W * .34, cy = H / 2 + 40;
    ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.strokeRect(x0, cy - 30, cx - x0 - 40, 100);
    ctx.fillStyle = cs("--muted"); ctx.fillRect(cx - 40, cy - 30, 40, 60); for (let i = 0; i < 6; i++) { ctx.strokeStyle = c; ctx.beginPath(); ctx.ellipse(cx - 20, cy - 25 + i * 10, 24, 5, 0, 0, 7); ctx.stroke(); }
    text(ctx, "coil + soft iron core", cx - 20, cy + 50, { size: 11, align: "center", color: cs("--muted") }); text(ctx, "control switch " + (on ? "closed" : "open"), x0 + 6, cy + 90, { size: 12, weight: 600 });
    if (on) for (let k = 0; k < 4; k++) dot(ctx, x0 + ((t * 80 + k * 60) % (cx - x0 - 40)), cy + 70, 3, c, 8);
    const px = cx + 100, py = cy - 46, ang = on ? -.13 : .06;
    ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.fillStyle = ink; ctx.fillRect(-110, -4, 146, 8); ctx.restore(); dot(ctx, px, py, 5, ink);
    text(ctx, "pivot", px - 8, py + 22, { size: 11, color: cs("--muted"), align: "center" }); text(ctx, "iron armature", px - 70, py - 14, { size: 11, color: cs("--muted"), align: "center" });
    const fx = px + 36, fy = py - 7; dot(ctx, fx, fy, 4, ink);
    const R = W - 30, top = py - 100;
    ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, top); ctx.lineTo(R, top); ctx.lineTo(R, py + 36); ctx.lineTo(px, py + 36); ctx.lineTo(px, py); ctx.stroke();
    ctx.beginPath(); ctx.arc(R, (top + py + 36) / 2, 18, 0, 7); ctx.fillStyle = on ? "#f6c643" : cs("--surface"); ctx.fill(); ctx.stroke(); text(ctx, "high-current motor / lamp", R - 26, (top + py + 36) / 2 + 4, { size: 11, align: "right" });
    if (on) for (let k = 0; k < 6; k++) { const f = ((t * .6 + k / 6) % 1), L = (R - fx) * 2 + 140, d = f * L; let x, y; if (d < R - fx) { x = fx + d; y = top; } else if (d < R - fx + 140) { x = R; y = top + (d - (R - fx)); } else { x = R - (d - (R - fx) - 140); y = py + 36; } dot(ctx, x, y, 3, g, 8); }
    text(ctx, on ? "small current magnetises core → armature pulled down → contacts close → large current flows" : "no current in coil → spring holds contacts apart → second circuit OFF", 16, 22, { size: 13, weight: 600, color: on ? g : cs("--muted") });
  }, { h: 330, period: 6, caption: "A relay lets a small, safe current in one circuit switch on a large current in another" });

  // ---------- Interactive: electromagnet strength ----------
  DEMOS.electromagnet = (root, col) => {
    const { ctx, size, W, H } = setup(root, 280); let core = true;
    const segEl = document.createElement("div"); segEl.className = "seg"; segEl.style.marginTop = "12px";
    segEl.innerHTML = `<button aria-pressed="true" data-c="1">soft iron core</button><button aria-pressed="false" data-c="0">no core (air)</button>`;
    segEl.onclick = e => { const bt = e.target.closest("button"); if (!bt) return; core = bt.dataset.c === "1"; segEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === bt)); };
    root.appendChild(segEl);
    const v = controls(root, [{ key: "I", label: "current (A)", min: 0, max: 3, step: .1, value: 1.5 }, { key: "N", label: "turns on coil", min: 10, max: 100, step: 10, value: 50 }]);
    const out = readout(root); let last = "";
    return loop((tt) => {
      size(); const w = W(), h = H(); ctx.clearRect(0, 0, w, h); const B = v.I * v.N * (core ? 1 : .05), clips = Math.min(14, Math.floor(B / 9)), cx = w / 2;
      ctx.fillStyle = core ? css("--muted") : "transparent"; ctx.strokeStyle = css("--muted"); ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(cx - 20, 20, 40, 110, 4); ctx.fill(); ctx.stroke();
      const turns = Math.round(v.N / 10); for (let i = 0; i < turns; i++) { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cx, 30 + i * 90 / Math.max(1, turns - 1 || 1), 32, 6, 0, 0, 7); ctx.stroke(); }
      for (let i = 0; i < clips; i++) { const y = 140 + i * 9, sway = Math.sin(tt * 2 + i) * i * .6; ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(cx - 8 + sway, y, 16, 8, 4); ctx.stroke(); }
      for (let i = clips; i < 14; i++) { ctx.strokeStyle = css("--line"); ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(cx + 100 + (i % 5) * 22, h - 20 - Math.floor(i / 5) * 12, 16, 8, 4); ctx.stroke(); }
      const txt = `Picks up ${clips} paperclip${clips === 1 ? "" : "s"}. Strength grows with the current (${v.I} A) and the number of turns (${v.N}). ${core ? "The soft iron core concentrates the field, making it hundreds of times stronger." : "Without an iron core the field is very weak."} Switch the current off and soft iron loses its magnetism at once.`;
      if (txt !== last) { out.innerHTML = txt; last = txt; }
    });
  };

  // ---------- d.c. motor: coil seen end-on + split ring ----------
  V.motor = (host) => mount(host, (ctx, W, H, t) => {
    const cx = W * .38, cy = H / 2, R = Math.min(90, H * .3), a = t * 1.6, c = cs("--physics"), b = cs("--maths"), r = cs("--bad");
    ctx.fillStyle = r; ctx.fillRect(cx - R - 70, cy - 60, 40, 120); ctx.fillStyle = b; ctx.fillRect(cx + R + 30, cy - 60, 40, 120);
    text(ctx, "N", cx - R - 50, cy + 6, { size: 18, weight: 700, align: "center", color: "#fff" }); text(ctx, "S", cx + R + 50, cy + 6, { size: 18, weight: 700, align: "center", color: "#fff" });
    for (let k = -2; k <= 2; k++) { ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - R - 30, cy + k * 26); ctx.lineTo(cx + R + 30, cy + k * 26); ctx.stroke(); }
    // coil sides at angle a (end view): side A at angle a, side B at a+π
    const sA = [cx + R * Math.cos(a), cy + R * Math.sin(a)], sB = [cx - R * Math.cos(a), cy - R * Math.sin(a)];
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sA[0], sA[1]); ctx.lineTo(sB[0], sB[1]); ctx.stroke();
    // the commutator reverses the current each half turn (as the coil passes vertical), so the side on the LEFT always carries current out of the page
    const leftIsA = Math.cos(a) < 0;
    [[sA, leftIsA], [sB, !leftIsA]].forEach(([p, isTop]) => { ctx.fillStyle = cs("--surface"); ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(p[0], p[1], 13, 0, 7); ctx.fill(); ctx.stroke();
      if (isTop) dot(ctx, p[0], p[1], 4, c); else { ctx.beginPath(); ctx.moveTo(p[0] - 7, p[1] - 7); ctx.lineTo(p[0] + 7, p[1] + 7); ctx.moveTo(p[0] + 7, p[1] - 7); ctx.lineTo(p[0] - 7, p[1] + 7); ctx.stroke(); }
      const F = 40; arrow(ctx, p[0], p[1] + (isTop ? -16 : 16), p[0], p[1] + (isTop ? -16 - F : 16 + F), cs("--chem"), 3); });
    text(ctx, "force", sA[0] + 18, sA[1] - 30, { size: 11, color: cs("--chem"), weight: 600 });
    // split-ring commutator on the right
    const kx = W * .82, ky = cy, kr = 30; [0, 1].forEach(i => { ctx.strokeStyle = i ? c : cs("--ink"); ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(kx, ky, kr, a + i * Math.PI + .25, a + i * Math.PI + Math.PI - .25); ctx.stroke(); });
    ctx.fillStyle = cs("--muted"); ctx.fillRect(kx - kr - 22, ky - 8, 16, 16); ctx.fillRect(kx + kr + 6, ky - 8, 16, 16);
    text(ctx, "split-ring commutator", kx, ky + kr + 26, { size: 12, align: "center", weight: 600 }); text(ctx, "carbon brushes", kx, ky - kr - 16, { size: 11, align: "center", color: cs("--muted") });
    text(ctx, "end view: • current out of page, × into page", 16, 20, { size: 12, color: cs("--muted") });
    text(ctx, "every half turn the commutator reverses the current, so the coil keeps turning the same way", 16, H - 10, { size: 12, color: cs("--ink"), weight: 600 });
  }, { h: 330, period: 3.93, caption: "Forces on the two sides of the coil are opposite, producing a turning effect" });

  // ---------- Induction: magnet pushed into and pulled out of a coil ----------
  V.induction = (host) => mount(host, (ctx, W, H, t, P) => {
    const ph = (t % P) / P, x0 = W * .52, cy = H / 2 - 10, cw = 160, mag = 120;
    // magnet position: in (0–.25), stop (.25–.4), out (.4–.65), stop
    const pos = ph < .25 ? ph / .25 : ph < .4 ? 1 : ph < .65 ? 1 - (ph - .4) / .25 : 0, vel = ph < .25 ? 1 : ph < .4 ? 0 : ph < .65 ? -1 : 0;
    for (let i = 0; i < 12; i++) { ctx.strokeStyle = cs("--physics"); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x0 + i * cw / 11, cy, 8, 34, 0, 0, 7); ctx.stroke(); }
    const mx = x0 - mag - 40 + pos * (mag + 20); ctx.fillStyle = cs("--maths"); ctx.fillRect(mx, cy - 14, mag / 2, 28); ctx.fillStyle = cs("--bad"); ctx.fillRect(mx + mag / 2, cy - 14, mag / 2, 28);
    text(ctx, "S", mx + mag / 4, cy + 5, { size: 14, weight: 700, align: "center", color: "#fff" }); text(ctx, "N", mx + 3 * mag / 4, cy + 5, { size: 14, weight: 700, align: "center", color: "#fff" });
    // wires to meter
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, cy + 34); ctx.lineTo(x0, H - 40); ctx.lineTo(x0 + cw, H - 40); ctx.lineTo(x0 + cw, cy + 34); ctx.stroke();
    const gx = x0 + cw / 2, gy = H - 40; ctx.fillStyle = cs("--surface"); ctx.beginPath(); ctx.arc(gx, gy, 26, 0, 7); ctx.fill(); ctx.stroke();
    const needle = vel * .9; ctx.strokeStyle = cs("--bad"); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy + 14); ctx.lineTo(gx + 26 * Math.sin(needle), gy + 14 - 26 * Math.cos(needle)); ctx.stroke(); text(ctx, "G", gx - 4, gy + 20, { size: 10, color: cs("--muted") });
    text(ctx, vel > 0 ? "magnet moving IN: needle deflects one way" : vel < 0 ? "magnet moving OUT: needle deflects the other way" : "magnet still: no induced current", 16, 22, { size: 13, weight: 600 });
    text(ctx, "Only a CHANGING field through the coil induces an e.m.f.", 16, 42, { size: 12, color: cs("--muted") });
  }, { h: 300, period: 6, caption: "Electromagnetic induction: moving the magnet changes the field linking the coil" });

  // ---------- Interactive: a.c. generator ----------
  DEMOS.generator = (root, col) => {
    const { ctx, size, W, H } = setup(root, 300);
    const v = controls(root, [{ key: "f", label: "speed of rotation (turns/s)", min: .2, max: 1.5, step: .1, value: .5 }, { key: "N", label: "turns on coil", min: 10, max: 100, step: 10, value: 50 }, { key: "B", label: "magnet strength", min: .2, max: 1, step: .1, value: .6 }]);
    const out = readout(root); let last = "", hist = [], ang = 0, tp = 0;
    return loop((tt) => {
      size(); const w = W(), h = H(), dt = Math.min(.05, tt - tp); tp = tt; ctx.clearRect(0, 0, w, h); ang += 2 * Math.PI * v.f * dt;
      const peak = v.N * v.B * v.f * 2 * Math.PI * .05, emf = peak * Math.sin(ang); hist.push(emf); if (hist.length > 320) hist.shift();
      const cx = 110, cy = h / 2, R = 60; ctx.fillStyle = css("--bad"); ctx.fillRect(cx - R - 40, cy - 50, 26, 100); ctx.fillStyle = css("--maths"); ctx.fillRect(cx + R + 14, cy - 50, 26, 100);
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 4; ctx.beginPath(); const ex = R * Math.cos(ang), ey = R * Math.sin(ang) * .35; ctx.moveTo(cx - ex, cy - 50); ctx.lineTo(cx - ex, cy + 50); ctx.lineTo(cx + ex, cy + 50); ctx.lineTo(cx + ex, cy - 50); ctx.closePath(); ctx.stroke();
      ctx.fillStyle = css("--muted"); ctx.font = "12px Inter, sans-serif"; ctx.fillText("coil (side view)", cx - 44, h - 14);
      const gx = 220, gw = w - gx - 20, gy = 20, gh = h - 40, maxE = 30; ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.moveTo(gx, gy + gh / 2); ctx.lineTo(gx + gw, gy + gh / 2); ctx.stroke();
      ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); hist.forEach((e, i) => { const X = gx + i / 320 * gw, Y = gy + gh / 2 - Math.max(-maxE, Math.min(maxE, e)) / maxE * gh / 2; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
      ctx.fillStyle = css("--ink"); ctx.fillText("e.m.f.", gx + 6, gy + 12); ctx.fillText("time →", gx + gw - 44, gy + gh / 2 + 16);
      const txt = `Peak e.m.f. ≈ ${fix(peak, 1)} V, frequency ${fix(v.f, 1)} Hz. Faster rotation gives a bigger peak <i>and</i> more cycles per second. More turns or a stronger magnet gives a bigger peak only. The e.m.f. is zero when the coil's plane is at 90° to the field (sides moving along the field lines) and largest when the plane is parallel to the field (sides cutting the lines fastest).`;
      if (txt !== last) { out.innerHTML = txt; last = txt; }
    });
  };

  // ---------- Rutherford alpha scattering ----------
  V.alphaScatter = (host) => mount(host, (ctx, W, H, t, P) => {
    const nx = W * .55, ny = H / 2, c = cs("--physics"), n = 15;
    for (let k = 0; k < 9; k++) { ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(nx, ny, 26 + k * 0, 0, 7); }
    // gold atoms as faint circles with tiny nucleus
    for (let j = -2; j <= 2; j++) { ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(nx, ny + j * 60, 28, 0, 7); ctx.stroke(); dot(ctx, nx, ny + j * 60, j === 0 ? 5 : 3, cs("--bad"), 6); }
    for (let i = 0; i < n; i++) {
      const b = (i - (n - 1) / 2) * 9 + (i === 7 ? 0.6 : 0), y0 = ny + b, ph = ((t / P) * 1.6 + i * .13) % 1.6;
      if (ph > 1) continue;
      // simple Coulomb deflection by the central nucleus: angle ~ 2*atan(k/b)
      const k = 70, defl = 2 * Math.atan(k / (Math.abs(b) * 22 + 1e-3)) * Math.sign(b || 1), x = 20 + ph * (W - 40);
      let px = x, py = y0;
      if (x > nx) { const d = x - nx; px = nx + d * Math.cos(defl); py = y0 + d * Math.sin(defl); }
      ctx.globalAlpha = .25; ctx.strokeStyle = c; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(20, y0); ctx.lineTo(Math.min(x, nx), y0); if (x > nx) ctx.lineTo(px, py); ctx.stroke(); ctx.globalAlpha = 1;
      dot(ctx, px, py, 4, c, 8);
    }
    text(ctx, "α particles", 20, 22, { size: 12, color: c, weight: 600 });
    text(ctx, "most pass straight through; a few deflect; ~1 in 8000 bounces back", W - 14, H - 12, { size: 12, align: "right", weight: 600 });
    text(ctx, "tiny, dense, positive nucleus", nx + 14, ny - 10, { size: 11, color: cs("--bad"), weight: 600 });
  }, { h: 320, period: 7, caption: "Geiger and Marsden fired alpha particles at thin gold foil" });

  // ---------- Penetration of α, β, γ ----------
  V.penetration = (host) => mount(host, (ctx, W, H, t, P) => {
    const rows = [["α", cs("--bad"), 0], ["β", cs("--maths"), 1], ["γ", cs("--chem"), 2]], walls = [W * .32, W * .55, W * .78];
    [["paper", cs("--line")], ["3 mm aluminium", cs("--muted")], ["several cm lead", cs("--ink")]].forEach(([n, col], i) => { ctx.fillStyle = col; ctx.globalAlpha = .7; ctx.fillRect(walls[i] - (i === 2 ? 12 : 4), 34, i === 2 ? 24 : 8, H - 60); ctx.globalAlpha = 1; text(ctx, n, walls[i], H - 8, { size: 11, align: "center", weight: 600 }); });
    rows.forEach(([n, col, stop], r) => { const y = 60 + r * (H - 100) / 2, f = (t / P) % 1, end = walls[stop] - 6;
      text(ctx, n, 16, y + 5, { size: 16, weight: 700, color: col });
      for (let k = 0; k < 4; k++) { const x = 40 + ((f + k / 4) % 1) * (W - 60); if (x < end) { if (n === "γ") { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); for (let q = 0; q < 24; q++) ctx.lineTo(x - 24 + q, y + 5 * Math.sin(q / 2)); ctx.stroke(); } else dot(ctx, x, y, n === "α" ? 6 : 3, col, 8); } }
      ctx.strokeStyle = col; ctx.globalAlpha = .3; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(end, y); ctx.stroke(); ctx.globalAlpha = 1; });
  }, { h: 280, period: 3, caption: "Alpha is stopped by paper, beta by a few mm of aluminium; gamma is only reduced by thick lead or concrete" });

  // ---------- Interactive: half-life ----------
  DEMOS.halflife = (root, col) => {
    const { ctx, size, W, H } = setup(root, 300);
    const v = controls(root, [{ key: "T", label: "half-life (s)", min: 1, max: 8, step: .5, value: 3 }, { key: "bg", label: "background count (counts per tick)", min: 0, max: 20, step: 1, value: 0 }]);
    const btn = document.createElement("button"); btn.className = "btn small"; btn.textContent = "Restart sample"; btn.style.marginTop = "10px"; root.appendChild(btn);
    const out = readout(root); let N0 = 400, alive, hist, t0, tp, last = "";
    const reset = () => { alive = Array(N0).fill(true); hist = [[0, N0]]; t0 = null; }; reset(); btn.onclick = reset;
    return loop((tt) => {
      size(); const w = W(), h = H(); if (t0 === null) { t0 = tt; tp = tt; } const t = tt - t0, dt = tt - tp; tp = tt; ctx.clearRect(0, 0, w, h);
      const p = 1 - Math.pow(.5, dt / v.T); let n = 0; for (let i = 0; i < N0; i++) { if (alive[i] && Math.random() < p) alive[i] = false; if (alive[i]) n++; }
      if (t - hist[hist.length - 1][0] > .1 && t < 40) hist.push([t, n]);
      const cols = 20, cs2 = Math.min(10, (w * .38) / cols); for (let i = 0; i < N0; i++) { const x = 20 + (i % cols) * cs2, y = 20 + Math.floor(i / cols) * cs2; ctx.fillStyle = alive[i] ? col : css("--line"); ctx.fillRect(x, y, cs2 - 2, cs2 - 2); }
      const gx = w * .45, gw = w - gx - 20, gy = 20, gh = h - 50, Tm = Math.max(20, v.T * 5); ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
      for (let k = 1; k <= 4; k++) { const x = gx + k * v.T / Tm * gw, y = gy + gh - gh / Math.pow(2, k); ctx.strokeStyle = css("--line"); ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(x, gy + gh); ctx.lineTo(x, y); ctx.lineTo(gx, y); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = css("--muted"); ctx.font = "11px Inter, sans-serif"; ctx.fillText(k + "T", x - 6, gy + gh + 14); }
      ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); hist.forEach(([a, b2], i) => { const X = gx + Math.min(a, Tm) / Tm * gw, Y = gy + gh - (b2 + v.bg) / (N0 + 20) * gh; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
      ctx.fillStyle = css("--ink"); ctx.font = "12px Inter, sans-serif"; ctx.fillText("undecayed nuclei" + (v.bg ? " + background" : ""), gx + 6, gy + 12);
      const txt = `${n} of ${N0} nuclei left after ${t.toFixed(1)} s. Each nucleus decays at random, but the number left halves every ${v.T} s: 400 → 200 → 100 → 50… ${v.bg ? `With a background of ${v.bg}, the curve levels off at ${v.bg} instead of zero: subtract the background before reading the half-life.` : ""}`;
      if (Math.floor(t * 4) !== Math.floor((t - dt) * 4)) { out.innerHTML = txt; last = txt; }
    });
  };
})();
