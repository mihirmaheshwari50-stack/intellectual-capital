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
})();
