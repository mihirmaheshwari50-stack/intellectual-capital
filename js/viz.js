// Auto-playing animated figures embedded in lesson text: <div class="viz" data-viz="name"></div>
window.VIZ = (() => {
  const cs = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ease = (k) => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
  const clamp = (x) => Math.max(0, Math.min(1, x));
  // phase helper: progress 0..1 of segment [a,b] within a looping timeline
  const seg = (t, a, b) => ease(clamp((t - a) / (b - a)));

  function mount(host, draw, { h = 260, period = 10, caption = "" } = {}) {
    host.innerHTML = `<canvas></canvas><div class="viz-bar"><button class="viz-play" aria-label="Pause animation">❚❚</button><div class="viz-track"><i></i></div><span class="viz-cap">${caption}</span></div>`;
    const cv = host.querySelector("canvas"), ctx = cv.getContext("2d"), btn = host.querySelector(".viz-play"), bar = host.querySelector(".viz-track i");
    let playing = !reduced, visible = false, t = reduced ? period * .999 : 0, last = performance.now(), id;
    const fit = () => { const d = Math.min(devicePixelRatio || 1, 2), w = cv.clientWidth || 600; cv.width = w * d; cv.height = h * d; cv.style.height = h + "px"; ctx.setTransform(d, 0, 0, d, 0, 0); };
    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, .05); last = now;
      if (playing && visible) t = (t + dt) % period;
      if (visible || !id) { fit(); ctx.clearRect(0, 0, cv.clientWidth, h); draw(ctx, cv.clientWidth, h, t, period); bar.style.width = (t / period * 100) + "%"; }
      id = requestAnimationFrame(frame);
    };
    btn.onclick = () => { playing = !playing; btn.textContent = playing ? "❚❚" : "▶"; btn.setAttribute("aria-label", playing ? "Pause animation" : "Play animation"); };
    host.querySelector(".viz-track").onclick = (e) => { const r = e.currentTarget.getBoundingClientRect(); t = clamp((e.clientX - r.left) / r.width) * period * .999; };
    if (reduced) btn.textContent = "▶";
    const io = new IntersectionObserver(([e]) => visible = e.isIntersecting); io.observe(host);
    id = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }
  function text(ctx, s, x, y, { size = 14, color = cs("--ink"), align = "left", weight = 500, serif = false } = {}) {
    ctx.font = `${weight} ${size}px ${serif ? "Fraunces, Georgia, serif" : "Inter, system-ui, sans-serif"}`; ctx.fillStyle = color; ctx.textAlign = align; ctx.fillText(s, x, y); ctx.textAlign = "left";
  }
  function arrow(ctx, x1, y1, x2, y2, color, w = 4) {
    const L = Math.hypot(x2 - x1, y2 - y1); if (L < 3) return;
    const a = Math.atan2(y2 - y1, x2 - x1); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * 8, y2 - Math.sin(a) * 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 12 * Math.cos(a - .45), y2 - 12 * Math.sin(a - .45)); ctx.lineTo(x2 - 12 * Math.cos(a + .45), y2 - 12 * Math.sin(a + .45)); ctx.fill();
  }
  const dot = (ctx, x, y, r, c, glow = 0) => { ctx.save(); ctx.shadowColor = c; ctx.shadowBlur = glow; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore(); };
  const alpha = (ctx, a, fn) => { ctx.save(); ctx.globalAlpha = clamp(a); fn(); ctx.restore(); };

  const V = {};

  // x² + 6x  →  (x+3)² − 9
  V.completeSquare = (host) => mount(host, (ctx, W, H, t) => {
    const c = cs("--maths"), c2 = cs("--physics"), ink = cs("--ink"), u = Math.min(28, (W - 60) / 11), x = 4 * u, b = 3 * u;
    const ox = Math.max(20, W / 2 - (x + b) / 2 - 40), oy = 40;
    const split = seg(t, 1.2, 2.4), move = seg(t, 3, 4.6), gap = seg(t, 5.4, 6.4), label = seg(t, 7, 8);
    const sq = (X, Y, w, h, col, txt, a = 1) => alpha(ctx, a, () => {
      ctx.fillStyle = col + "33"; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(X, Y, w, h, 4); ctx.fill(); ctx.stroke();
      if (txt) text(ctx, txt, X + w / 2, Y + h / 2 + 5, { align: "center", size: 15, serif: true, weight: 600 });
    });
    sq(ox, oy, x, x, c, "x²");
    // 6x strip splits into two 3x strips; one rotates under the square
    const s1x = ox + x + 10 * (1 - move), s2x = ox + x + 10 + (b + 10) * split * (1 - move);
    const s2X = s2x + (ox - s2x) * move, s2Y = oy + (oy + x - oy) * move;
    sq(s1x, oy, b, x, c2, split > .5 ? "3x" : "");
    if (split < .02) sq(ox + x + 10, oy, 2 * b, x, c2, "6x");
    else if (move < 1) sq(s2X, s2Y + (10 * (1 - move)), b + (x - b) * move, x + (b - x) * move, c2, "3x");
    else sq(ox, oy + x, x, b, c2, "3x");
    // missing corner
    alpha(ctx, gap, () => {
      ctx.setLineDash([6, 5]); ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.strokeRect(ox + x, oy + x, b, b); ctx.setLineDash([]);
      text(ctx, "9", ox + x + b / 2, oy + x + b / 2 + 5, { align: "center", color: cs("--bad"), weight: 700, size: 16 });
    });
    alpha(ctx, label, () => {
      ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.strokeRect(ox - 4, oy - 4, x + b + 8, x + b + 8);
      text(ctx, "side = x + 3", ox + (x + b) / 2, oy + x + b + 26, { align: "center", size: 13, color: cs("--muted") });
    });
    const tx = Math.min(W - 230, ox + x + 2 * b + 50);
    text(ctx, "x² + 6x", tx, 70, { size: 22, serif: true, weight: 600 });
    alpha(ctx, split, () => text(ctx, "= x² + 3x + 3x", tx, 104, { size: 17, serif: true }));
    alpha(ctx, gap, () => text(ctx, "a 3 × 3 corner is missing", tx, 138, { size: 13, color: cs("--muted") }));
    alpha(ctx, label, () => { text(ctx, "= (x + 3)² − 9", tx, 176, { size: 22, serif: true, weight: 600, color: c }); text(ctx, "add the corner, then take it away", tx, 200, { size: 13, color: cs("--muted") }); });
  }, { h: 280, period: 10, caption: "Completing the square is literally completing a square" });

  // Similar triangles: ratios stay fixed as size changes
  V.similar = (host) => mount(host, (ctx, W, H, t) => {
    const c = cs("--maths"), th = 32 * Math.PI / 180, k = .45 + .55 * (0.5 - 0.5 * Math.cos(t / 8 * Math.PI * 2));
    const hyp = Math.min(W * .55, 300) * k, adj = hyp * Math.cos(th), opp = hyp * Math.sin(th), x0 = 30, y0 = H - 40;
    ctx.lineWidth = 3; ctx.lineJoin = "round";
    ctx.strokeStyle = c; ctx.fillStyle = c + "18"; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + adj, y0); ctx.lineTo(x0 + adj, y0 - opp); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.strokeRect(x0 + adj - 10, y0 - 10, 10, 10);
    ctx.beginPath(); ctx.arc(x0, y0, 30, -th, 0); ctx.stroke(); text(ctx, "32°", x0 + 36, y0 - 6, { size: 12, color: cs("--muted") });
    text(ctx, "opp " + (opp / 20).toFixed(1), x0 + adj + 8, y0 - opp / 2, { size: 13, color: cs("--physics"), weight: 600 });
    text(ctx, "hyp " + (hyp / 20).toFixed(1), x0 + adj / 2 - 30, y0 - opp / 2 - 12, { size: 13, color: c, weight: 600 });
    const rx = Math.max(x0 + adj + 90, W - 220);
    text(ctx, "size ×" + (k * 2).toFixed(2), rx, 50, { size: 13, color: cs("--muted") });
    text(ctx, "opp ÷ hyp =", rx, 90, { size: 18, serif: true });
    text(ctx, (opp / hyp).toFixed(3), rx, 124, { size: 32, serif: true, weight: 600, color: c });
    text(ctx, "= sin 32°, every time", rx, 150, { size: 13, color: cs("--muted") });
  }, { h: 240, period: 8, caption: "Same angle → same shape → same ratios, at any size" });

  // Perpendicular lines: rotate 90°
  V.perp = (host) => mount(host, (ctx, W, H, t) => {
    const c = cs("--maths"), cx = W / 2 - 60, cy = H / 2, R = Math.min(W / 3, 150), m = 2, a0 = Math.atan(m);
    const rot = seg(t, 1.5, 4) * Math.PI / 2;
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
    const line = (a, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(cx - R * Math.cos(a), cy + R * Math.sin(a)); ctx.lineTo(cx + R * Math.cos(a), cy - R * Math.sin(a)); ctx.stroke(); };
    line(a0, cs("--muted"), 2); line(a0 + rot, c, 4);
    // rise/run triangle rotating with it
    const tri = (a, col) => { const p = [[0, 0], [1, 0], [1, m]].map(([x, y]) => [x * 30, y * 30]).map(([x, y]) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]);
      ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); p.forEach(([x, y], i) => i ? ctx.lineTo(cx + x, cy - y) : ctx.moveTo(cx + x, cy - y)); ctx.closePath(); ctx.stroke(); };
    tri(0, cs("--muted")); tri(rot, cs("--physics"));
    const tx = Math.min(W - 200, cx + R + 30), done = seg(t, 4.2, 5);
    text(ctx, "gradient 2:  run 1, rise 2", tx, 70, { size: 14 });
    alpha(ctx, done, () => {
      text(ctx, "rotate 90°: run −2, rise 1", tx, 100, { size: 14, color: c, weight: 600 });
      text(ctx, "gradient = 1 / −2 = −½", tx, 130, { size: 16, serif: true, color: c, weight: 600 });
      text(ctx, "2 × (−½) = −1", tx, 168, { size: 22, serif: true, weight: 600 });
    });
  }, { h: 260, period: 8, caption: "Rotating a line 90° swaps rise and run and flips a sign" });

  // Skydiver + forces + live speed–time graph
  V.skydiver = (host) => mount(host, (ctx, W, H, t, P) => {
    // simulate v(t) up to now: weight 700 N, drag k v², parachute opens at 7 s
    const m = 70, g = 10; let v = 0; const dt = .02, pts = [];
    for (let s = 0; s <= t; s += dt) { const k = s < 7 ? .25 : 3.5; v += (g - k * v * v / m) * dt; pts.push([s, v]); }
    const k = t < 7 ? .25 : 3.5, W8 = m * g, D = k * v * v;
    // figure
    const fx = Math.min(130, W * .22), fy = H / 2 - 10, c = cs("--physics");
    if (t >= 7) { ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(fx - 12, fy - 8); ctx.lineTo(fx - 40, fy - 70); ctx.moveTo(fx + 12, fy - 8); ctx.lineTo(fx + 40, fy - 70); ctx.stroke();
      ctx.fillStyle = cs("--chem"); ctx.beginPath(); ctx.ellipse(fx, fy - 74, 52, 22, 0, Math.PI, 0); ctx.fill(); }
    dot(ctx, fx, fy - 14, 9, cs("--ink")); ctx.fillStyle = cs("--ink"); ctx.beginPath(); ctx.roundRect(fx - 8, fy - 4, 16, 30, 6); ctx.fill();
    // wind streaks
    for (let i = 0; i < 6; i++) { const y = (fy + 60 - ((t * v * 8 + i * 37) % 160)) ; alpha(ctx, .3, () => { ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(fx - 60 + i * 22, y); ctx.lineTo(fx - 60 + i * 22, y + 18); ctx.stroke(); }); }
    const sc = .09; arrow(ctx, fx, fy + 30, fx, fy + 30 + W8 * sc, c); text(ctx, "weight " + W8 + " N", fx + 12, fy + 30 + W8 * sc, { size: 12, color: c, weight: 600 });
    arrow(ctx, fx + 30, fy - 10, fx + 30, fy - 10 - Math.min(D, 1400) * sc, cs("--maths")); text(ctx, "drag " + Math.round(D) + " N", fx + 38, fy - 20 - Math.min(D, 1400) * sc / 2, { size: 12, color: cs("--maths"), weight: 600 });
    // graph
    const gx = Math.max(fx + 130, W * .42), gw = W - gx - 20, gy = 30, gh = H - 70, vmax = 60, tmax = P;
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
    text(ctx, "speed", gx + 6, gy + 6, { size: 12, color: cs("--muted") }); text(ctx, "time", gx + gw - 30, gy + gh + 18, { size: 12, color: cs("--muted") });
    ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.beginPath(); pts.forEach(([s, vv], i) => { const X = gx + s / tmax * gw, Y = gy + gh - vv / vmax * gh; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
    const last = pts[pts.length - 1] || [0, 0]; dot(ctx, gx + last[0] / tmax * gw, gy + gh - last[1] / vmax * gh, 6, c, 14);
    const R = W8 - D, phase = t < 7 ? (Math.abs(R) < 25 ? "Drag = weight → terminal velocity" : "Weight > drag → accelerating") : (R < -25 ? "Parachute: drag > weight → decelerating" : "New, lower terminal velocity");
    text(ctx, phase, gx + 10, H - 8, { size: 14, weight: 600 });
    text(ctx, "resultant " + Math.round(R) + " N", 16, H - 8, { size: 12, color: cs("--muted") });
  }, { h: 320, period: 14, caption: "Terminal velocity: watch the arrows balance as the graph flattens" });

  // Refraction of wavefronts
  V.refraction = (host) => mount(host, (ctx, W, H, t) => {
    const c = cs("--physics"), bx = W * .5, n = 1.5, inc = 40 * Math.PI / 180, ref = Math.asin(Math.sin(inc) / n), lam = 34, sp = 40;
    ctx.fillStyle = cs("--maths") + "18"; ctx.fillRect(bx, 0, W - bx, H);
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(bx, 0); ctx.lineTo(bx, H); ctx.stroke();
    // wavefronts: lines perpendicular to direction; phase = distance along ray
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, bx, H); ctx.clip();
    const d1 = [Math.cos(inc), Math.sin(inc)];
    for (let i = -20; i < 30; i++) { const s = i * lam + (t * sp) % lam; ctx.strokeStyle = c; ctx.lineWidth = 2.5;
      // line: points p with p·d1 = s (origin at boundary centre)
      const ox = bx + d1[0] * s, oy = H / 2 + d1[1] * s, px = -d1[1], py = d1[0];
      ctx.beginPath(); ctx.moveTo(ox - px * 400, oy - py * 400); ctx.lineTo(ox + px * 400, oy + py * 400); ctx.stroke(); }
    ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(bx, 0, W - bx, H); ctx.clip();
    const d2 = [Math.cos(ref), Math.sin(ref)];
    for (let i = -20; i < 30; i++) { const s = (i * lam + (t * sp) % lam) / n; ctx.strokeStyle = c; ctx.lineWidth = 2.5;
      const ox = bx + d2[0] * s, oy = H / 2 + d2[1] * s, px = -d2[1], py = d2[0];
      ctx.beginPath(); ctx.moveTo(ox - px * 400, oy - py * 400); ctx.lineTo(ox + px * 400, oy + py * 400); ctx.stroke(); }
    ctx.restore();
    // normal + ray
    ctx.setLineDash([5, 5]); ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(bx - 120, H / 2); ctx.lineTo(bx + 120, H / 2); ctx.stroke(); ctx.setLineDash([]);
    arrow(ctx, bx - 140 * Math.cos(inc), H / 2 - 140 * Math.sin(inc), bx, H / 2, cs("--ink"), 2.5);
    arrow(ctx, bx, H / 2, bx + 140 * Math.cos(ref), H / 2 + 140 * Math.sin(ref), cs("--ink"), 2.5);
    text(ctx, "normal", bx - 118, H / 2 - 6, { size: 11, color: cs("--muted") });
    const pill = (s, x, y, col) => { ctx.font = "600 13px Inter, system-ui, sans-serif"; const w = ctx.measureText(s).width; ctx.fillStyle = cs("--surface"); ctx.beginPath(); ctx.roundRect(x - 8, y - 16, w + 16, 24, 12); ctx.fill(); text(ctx, s, x, y, { size: 13, weight: 600, color: col }); };
    pill("air", 14, 26, cs("--muted")); pill("glass (slower)", bx + 14, 26, cs("--maths"));
    pill("wavefronts bunch up (λ smaller) → ray bends towards the normal", 14, H - 12, cs("--ink"));
  }, { h: 280, period: 6, caption: "Refraction: the part of each wavefront that reaches the glass first slows first" });

  // Ionic bond: Na gives electron to Cl
  V.ionic = (host) => mount(host, (ctx, W, H, t) => {
    const na = [W * .27, H / 2 - 6], cl = [W * .7, H / 2 - 6], cNa = cs("--physics"), cCl = cs("--chem"), e = cs("--ink");
    const jump = seg(t, 2, 4), ions = seg(t, 4.5, 5.5), pull = seg(t, 6, 7.5);
    const off = pull * (W * .1);
    const shell = (cx, cy, rs, counts, col, skipLast) => {
      rs.forEach((r, i) => { if (skipLast && i === rs.length - 1 && ions > .99) return; ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
        const n = counts[i]; for (let k = 0; k < n; k++) { if (skipLast && i === rs.length - 1) continue; const a = k / n * Math.PI * 2 + t * .4 / (i + 1); dot(ctx, cx + r * Math.cos(a), cy + r * Math.sin(a), 4, col); } });
      dot(ctx, cx, cy, 13, col, 10);
    };
    const R = Math.min(22, W / 30);
    const naX = na[0] + off, clX = cl[0] - off;
    shell(naX, na[1], [R, R * 2, R * 3], [2, 8, 1], cNa, jump > 0);
    shell(clX, cl[1], [R, R * 2, R * 3], [2, 8, 7], cCl, false);
    // travelling electron
    if (jump > 0) { const sx = naX + R * 3, sy = na[1], ex = clX - R * 3, ey = cl[1];
      const x = sx + (ex - sx) * jump, y = sy - Math.sin(jump * Math.PI) * 60 + (ey - sy) * jump; dot(ctx, x, y, 6, cs("--maths"), 16);
      if (jump < 1) text(ctx, "e⁻", x + 8, y - 8, { size: 13, color: cs("--maths"), weight: 700 }); }
    if (ions < .01) { text(ctx, "Na  2,8,1", naX, H - 18, { align: "center", size: 14, weight: 600 }); text(ctx, "Cl  2,8,7", clX, H - 18, { align: "center", size: 14, weight: 600 }); }
    alpha(ctx, ions, () => {
      text(ctx, "Na⁺  2,8", naX, H - 18, { align: "center", size: 15, weight: 700, color: cNa }); text(ctx, "Cl⁻  2,8,8", clX, H - 18, { align: "center", size: 15, weight: 700, color: cCl });
      ctx.strokeStyle = cNa; ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(naX, na[1], R * 2.5, 0, 7); ctx.stroke();
      ctx.strokeStyle = cCl; ctx.beginPath(); ctx.arc(clX, cl[1], R * 3.4, 0, 7); ctx.stroke(); ctx.setLineDash([]);
    });
    alpha(ctx, pull, () => { text(ctx, "+  ⟶ electrostatic attraction ⟵  −", W / 2, 26, { align: "center", size: 14, weight: 600 }); });
  }, { h: 300, period: 9, caption: "Ionic bonding: one electron moves, both atoms end up with full outer shells" });

  // Energy distribution vs activation energy
  V.energyDist = (host) => mount(host, (ctx, W, H, t) => {
    const T = 1 + .9 * (0.5 - 0.5 * Math.cos(t / 8 * Math.PI * 2)), gx = 40, gy = 24, gw = W - 70, gh = H - 70, Ea = .62, cat = t % 8 > 6.2;
    const f = (E, T) => Math.E * E * 6 * Math.exp(-E * 6 / T) / (T * T); // area-conserving, peak height 1/T
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
    text(ctx, "number of particles", gx + 6, gy + 4, { size: 12, color: cs("--muted") }); text(ctx, "energy →", gx + gw - 60, gy + gh + 18, { size: 12, color: cs("--muted") });
    const X = (E) => gx + E * gw, Y = (v) => gy + gh - v * gh * .9;
    const ea = cat ? .4 : Ea, c = cs("--chem");
    // shaded area above Ea
    ctx.fillStyle = c + "44"; ctx.beginPath(); ctx.moveTo(X(ea), Y(0)); for (let E = ea; E <= 1; E += .005) ctx.lineTo(X(E), Y(f(E, T))); ctx.lineTo(X(1), Y(0)); ctx.fill();
    // cold reference
    ctx.setLineDash([5, 5]); ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); for (let E = 0; E <= 1; E += .005) { const v = f(E, 1); E ? ctx.lineTo(X(E), Y(v)) : ctx.moveTo(X(E), Y(v)); } ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = cs("--physics"); ctx.lineWidth = 3; ctx.beginPath(); for (let E = 0; E <= 1; E += .005) { const v = f(E, T); E ? ctx.lineTo(X(E), Y(v)) : ctx.moveTo(X(E), Y(v)); } ctx.stroke();
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(ea), gy + 10); ctx.lineTo(X(ea), gy + gh); ctx.stroke();
    text(ctx, cat ? "Ea with catalyst" : "Ea", X(ea) + 6, gy + 22, { size: 13, weight: 700 });
    let area = 0, tot = 0; for (let E = 0; E <= 1; E += .002) { const v = f(E, T); tot += v; if (E >= ea) area += v; }
    text(ctx, `temperature ${T < 1.3 ? "low" : T < 1.65 ? "medium" : "high"} · particles with E ≥ Ea: ${Math.round(area / tot * 100)}%`, gx + 10, H - 8, { size: 14, weight: 600 });
  }, { h: 280, period: 8, caption: "Heating spreads the energies out, so far more particles clear Ea (shaded)" });

  return V;
})();
