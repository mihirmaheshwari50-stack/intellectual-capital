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

  // Unit circle tracing sin and cos graphs
  V.trigGraph = (host) => mount(host, (ctx, W, H, t, P) => {
    const deg = (t / P) * 360, a = deg * Math.PI / 180, cS = cs("--maths"), cC = cs("--physics");
    const R = Math.min(70, H * .3), cx = R + 24, cy = H / 2;
    const gx = cx + R + 40, gw = W - gx - 16, X = (d) => gx + d / 360 * gw, Y = (v) => cy - v * R;
    // circle
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - R - 8, cy); ctx.lineTo(cx + R + 8, cy); ctx.moveTo(cx, cy - R - 8); ctx.lineTo(cx, cy + R + 8); ctx.stroke();
    const px = cx + R * Math.cos(a), py = cy - R * Math.sin(a);
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
    ctx.lineWidth = 4; ctx.strokeStyle = cS; ctx.beginPath(); ctx.moveTo(px, cy); ctx.lineTo(px, py); ctx.stroke();
    ctx.strokeStyle = cC; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, cy); ctx.stroke();
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, 16, -a, 0, false); ctx.stroke();
    dot(ctx, px, py, 6, cs("--ink"), 10);
    // graph axes + gridlines at 90° steps
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1;
    for (let d = 0; d <= 360; d += 90) { ctx.beginPath(); ctx.moveTo(X(d), Y(1) - 6); ctx.lineTo(X(d), Y(-1) + 6); ctx.stroke(); text(ctx, d + "°", X(d), Y(-1) + 22, { size: 11, color: cs("--muted"), align: "center" }); }
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, cy); ctx.lineTo(gx + gw, cy); ctx.stroke();
    text(ctx, "1", gx - 12, Y(1) + 4, { size: 11, color: cs("--muted") }); text(ctx, "−1", gx - 18, Y(-1) + 4, { size: 11, color: cs("--muted") });
    const curve = (f, col, upto, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); for (let d = 0; d <= upto; d += 2) { const yy = Y(f(d * Math.PI / 180)); d ? ctx.lineTo(X(d), yy) : ctx.moveTo(X(d), yy); } ctx.stroke(); };
    alpha(ctx, .18, () => { curve(Math.sin, cS, 360, 2); curve(Math.cos, cC, 360, 2); });
    curve(Math.sin, cS, deg, 3.5); curve(Math.cos, cC, deg, 3.5);
    // connector from circle height to graph
    ctx.setLineDash([4, 4]); ctx.strokeStyle = cS; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(X(deg), py); ctx.stroke(); ctx.setLineDash([]);
    dot(ctx, X(deg), Y(Math.sin(a)), 5, cS, 12); dot(ctx, X(deg), Y(Math.cos(a)), 5, cC, 12);
    text(ctx, `θ = ${Math.round(deg)}°`, 12, 22, { size: 14, weight: 700 });
    text(ctx, `sin θ = ${Math.sin(a).toFixed(2)}`, gx, 20, { size: 13, color: cS, weight: 700 });
    text(ctx, `cos θ = ${Math.cos(a).toFixed(2)}`, gx + 130, 20, { size: 13, color: cC, weight: 700 });
  }, { h: 260, period: 12, caption: "sin θ is the height of the point; cos θ is how far across it is" });

  // Spring: adding loads, plotting load–extension, limit of proportionality
  V.spring = (host) => mount(host, (ctx, W, H, t, P) => {
    const c = cs("--physics"), steps = 7, n = Math.min(steps, Math.floor(t / (P / (steps + 1.2))));
    const ext = (F) => F <= 4 ? F * 1.0 : 4 + (F - 4) * 1.0 + (F - 4) * (F - 4) * .45; // cm-ish
    const prog = (t % (P / (steps + 1.2))) / (P / (steps + 1.2));
    const shownExt = ext(Math.max(0, n - 1)) + (ext(n) - ext(Math.max(0, n - 1))) * Math.min(1, prog * 2.5) * (n > 0 ? 1 : 0);
    // spring drawing
    const sx = Math.min(110, W * .2), top = 24, L0 = 60, sc = 11, len = L0 + shownExt * sc;
    ctx.fillStyle = cs("--muted"); ctx.fillRect(sx - 40, top - 8, 80, 8);
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx, top);
    const coils = 14; for (let i = 0; i <= coils; i++) { const y = top + 8 + (len - 16) * i / coils; ctx.lineTo(sx + (i % 2 ? 12 : -12) * (i && i < coils ? 1 : 0), y); }
    ctx.lineTo(sx, top + len); ctx.stroke();
    if (n) { ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(sx - 20, top + len, 40, 24, 5); ctx.fill(); text(ctx, n + " N", sx, top + len + 16, { size: 12, color: "#fff", align: "center", weight: 700 }); }
    // ruler
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1; for (let i = 0; i <= 16; i++) { const y = top + L0 + i * sc; ctx.beginPath(); ctx.moveTo(sx + 44, y); ctx.lineTo(sx + (i % 5 ? 52 : 58), y); ctx.stroke(); }
    ctx.strokeStyle = cs("--maths"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx + 20, top + L0); ctx.lineTo(sx + 62, top + L0); ctx.stroke();
    text(ctx, "original length", sx + 64, top + L0 - 4, { size: 11, color: cs("--maths") });
    if (len - L0 > 6) { ctx.strokeStyle = cs("--maths"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx + 20, top + len); ctx.lineTo(sx + 62, top + len); ctx.stroke(); arrow(ctx, sx + 34, top + L0, sx + 34, top + len, cs("--maths"), 2); if (len - L0 > 22) text(ctx, "extension", sx + 64, top + (L0 + len) / 2 + 4, { size: 11, color: cs("--maths"), weight: 700 }); }
    text(ctx, `load ${n} N`, sx - 30, H - 10, { size: 13, weight: 700 });
    // graph
    const gx = Math.max(sx + 140, W * .42), gw = W - gx - 24, gy = 20, gh = H - 56, emax = ext(steps) + .5;
    const X = (e) => gx + e / emax * gw, Y = (f) => gy + gh - f / (steps + .5) * gh;
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
    text(ctx, "load / N", gx + 6, gy + 6, { size: 11, color: cs("--muted") }); text(ctx, "extension", gx + gw - 60, gy + gh + 18, { size: 11, color: cs("--muted") });
    ctx.strokeStyle = c; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= n; i++) { const x = X(ext(i)), y = Y(i); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    for (let i = 1; i <= n; i++) dot(ctx, X(ext(i)), Y(i), 4.5, c);
    if (n >= 5) { dot(ctx, X(ext(4)), Y(4), 7, cs("--bad"), 12); text(ctx, "limit of proportionality", X(ext(4)) + 10, Y(4) + 16, { size: 12, color: cs("--bad"), weight: 700 }); }
    alpha(ctx, n >= 3 ? 1 : 0, () => text(ctx, "straight line through origin: F = kx", gx + 10, gy + 22, { size: 12, weight: 600 }));
  }, { h: 280, period: 14, caption: "Equal loads give equal extensions, until the limit of proportionality" });

  // See-saw: principle of moments
  V.moments = (host) => mount(host, (ctx, W, H, t, P) => {
    const d = 2 + Math.sin(t / P * Math.PI * 2) * 1.0, F1 = 600, d1 = 1.5, F2 = 450;
    const cw = F2 * d, acw = F1 * d1, net = cw - acw, ang = Math.max(-.22, Math.min(.22, net / 900 * .22));
    const cx = W / 2, cy = H * .55, sc = Math.min(70, (W - 60) / 7);
    // pivot
    ctx.fillStyle = cs("--muted"); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - 22, cy + 46); ctx.lineTo(cx + 22, cy + 46); ctx.fill();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
    ctx.fillStyle = cs("--ink"); ctx.beginPath(); ctx.roundRect(-3.3 * sc, -6, 6.6 * sc, 10, 4); ctx.fill();
    // distance ticks
    for (let i = -3; i <= 3; i++) { ctx.fillStyle = cs("--bg"); ctx.fillRect(i * sc - 1, -4, 2, 6); }
    const blk = (x, F, col) => { const s = 26 + F / 40; ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(x - s / 2, -6 - s, s, s, 6); ctx.fill(); text(ctx, F + " N", x, -6 - s / 2 + 4, { size: 11, color: "#fff", align: "center", weight: 700 }); };
    blk(-d1 * sc, F1, cs("--maths")); blk(d * sc, F2, cs("--physics"));
    ctx.restore();
    const col = Math.abs(net) < 25 ? cs("--good") : cs("--ink");
    text(ctx, `anticlockwise: ${F1} × ${d1.toFixed(1)} = ${Math.round(acw)} N m`, 14, 24, { size: 13, color: cs("--maths"), weight: 700 });
    text(ctx, `clockwise: ${F2} × ${d.toFixed(2)} = ${Math.round(cw)} N m`, 14, 46, { size: 13, color: cs("--physics"), weight: 700 });
    text(ctx, Math.abs(net) < 25 ? "Balanced: clockwise = anticlockwise" : net > 0 ? "Clockwise moment bigger → tips right" : "Anticlockwise moment bigger → tips left", 14, H - 12, { size: 14, weight: 700, color: col });
  }, { h: 260, period: 10, caption: "The 450 N block slides out; it balances when 450 × d = 600 × 1.5, at d = 2.0 m" });

  // I–V characteristics: resistor, filament lamp, diode
  V.ivGraphs = (host) => mount(host, (ctx, W, H, t, P) => {
    const k = Math.min(1, t / (P * .7)), Vmax = 6, pw = W / 3;
    const items = [["Fixed resistor", (v) => v / 4, "straight line: R constant"], ["Filament lamp", (v) => Math.sign(v) * 1.45 * Math.tanh(Math.abs(v) / 3.2), "curve flattens: R increases"], ["Diode", (v) => v < .6 ? 0 : Math.min(1.5, (v - .6) * 1.1), "conducts one way only"]];
    items.forEach(([name, f, note], i) => {
      const ox = pw * i + pw / 2, oy = H / 2 + 6, sx = (pw / 2 - 16) / Vmax, sy = (H / 2 - 40) / 1.5;
      ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(ox - pw / 2 + 12, oy); ctx.lineTo(ox + pw / 2 - 12, oy); ctx.moveTo(ox, 34); ctx.lineTo(ox, H - 26); ctx.stroke();
      text(ctx, "I", ox + 5, 42, { size: 11, color: cs("--muted") }); text(ctx, "V", ox + pw / 2 - 22, oy - 6, { size: 11, color: cs("--muted") });
      const col = [cs("--maths"), cs("--physics"), cs("--chem")][i];
      ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath();
      const vEnd = -Vmax + 2 * Vmax * k; for (let v = -Vmax; v <= vEnd; v += .05) { const x = ox + v * sx, y = oy - f(v) * sy; v === -Vmax ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
      dot(ctx, ox + vEnd * sx, oy - f(vEnd) * sy, 5, col, 12);
      text(ctx, name, ox, 20, { size: 13, weight: 700, align: "center" });
      alpha(ctx, seg(t, P * .7, P * .8), () => text(ctx, note, ox, H - 8, { size: 11.5, align: "center", color: col, weight: 600 }));
    });
  }, { h: 260, period: 8, caption: "Current–voltage graphs: the shape tells you how resistance behaves" });

  // Total internal reflection in a semicircular block
  V.tir = (host) => mount(host, (ctx, W, H, t, P) => {
    const n = 1.5, c = Math.asin(1 / n) * 180 / Math.PI, iDeg = 15 + (60 * (0.5 - 0.5 * Math.cos(t / P * Math.PI * 2))), i = iDeg * Math.PI / 180;
    const cx = W / 2, yc = H * .42, R = Math.min(W * .32, H * .5);
    ctx.fillStyle = cs("--maths") + "22"; ctx.strokeStyle = cs("--maths"); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - R, yc); ctx.arc(cx, yc, R, 0, Math.PI, false); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.setLineDash([5, 5]); ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(cx, yc - R * .7); ctx.lineTo(cx, yc + R); ctx.stroke(); ctx.setLineDash([]);
    const col = cs("--physics");
    // incident (radial, enters the curved face undeviated)
    arrow(ctx, cx - R * Math.sin(i), yc + R * Math.cos(i), cx, yc, col, 3);
    const tirOn = iDeg > c;
    // reflected
    alpha(ctx, tirOn ? 1 : .25, () => arrow(ctx, cx, yc, cx + R * .95 * Math.sin(i), yc + R * .95 * Math.cos(i), col, tirOn ? 3 : 2));
    // refracted
    if (!tirOn) { const r = Math.asin(Math.min(1, n * Math.sin(i))); arrow(ctx, cx, yc, cx + R * .9 * Math.sin(r), yc - R * .9 * Math.cos(r), col, 3);
      text(ctx, `refracted at ${(r * 180 / Math.PI).toFixed(0)}°`, cx + 14, yc - R * .55, { size: 12, color: col, weight: 600 }); }
    // angle arc
    ctx.strokeStyle = cs("--ink"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, yc, 34, Math.PI / 2, Math.PI / 2 + i, false); ctx.stroke();
    text(ctx, `i = ${iDeg.toFixed(0)}°`, cx - 80, yc + 52, { size: 13, weight: 700 });
    text(ctx, "glass", cx - R + 12, yc + 22, { size: 12, color: cs("--maths"), weight: 600 }); text(ctx, "air", cx - R + 12, yc - 12, { size: 12, color: cs("--muted"), weight: 600 });
    const msg = Math.abs(iDeg - c) < 1.5 ? `i = critical angle (${c.toFixed(1)}°): refracted ray runs along the surface` : tirOn ? `i > critical angle (${c.toFixed(1)}°): TOTAL internal reflection` : `i < critical angle (${c.toFixed(1)}°): mostly refracts, weak reflection`;
    text(ctx, msg, 14, H - 12, { size: 14, weight: 700, color: tirOn ? cs("--bad") : cs("--ink") });
  }, { h: 300, period: 10, caption: "Glass to air: as the angle grows past the critical angle, all the light reflects back" });

  // Rotating NaCl lattice
  V.lattice = (host) => mount(host, (ctx, W, H, t) => {
    const a = t * .5, b = .5 + Math.sin(t * .3) * .15, s = Math.min(W * .2, H * .22), cx = W / 2, cy = H / 2 - 8;
    const pts = []; for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) pts.push([x, y, z, (x + y + z + 3) % 2]);
    const proj = ([x, y, z]) => { const X1 = x * Math.cos(a) - z * Math.sin(a), Z1 = x * Math.sin(a) + z * Math.cos(a); const Y2 = y * Math.cos(b) - Z1 * Math.sin(b), Z2 = y * Math.sin(b) + Z1 * Math.cos(b); const p = 3.5 / (3.5 + Z2); return [cx + X1 * s * p, cy + Y2 * s * p, Z2, p]; };
    const P2 = pts.map(p => [...proj(p), p[3], p]);
    ctx.strokeStyle = cs("--line"); ctx.lineWidth = 1.5;
    pts.forEach((p, i) => pts.forEach((q, j) => { if (j > i && Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2]) === 1) { ctx.beginPath(); ctx.moveTo(P2[i][0], P2[i][1]); ctx.lineTo(P2[j][0], P2[j][1]); ctx.stroke(); } }));
    P2.sort((m, n) => n[2] - m[2]).forEach(([x, y, z, p, kind]) => {
      const r = (kind ? 15 : 10) * p, col = kind ? cs("--chem") : cs("--physics");
      ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = 8; const g = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r); g.addColorStop(0, "#ffffffcc"); g.addColorStop(.35, col); g.addColorStop(1, col);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
      text(ctx, kind ? "−" : "+", x, y + 4, { size: 12 * p, color: "#fff", align: "center", weight: 700 });
    });
    text(ctx, "● Na⁺", 14, 24, { size: 13, color: cs("--physics"), weight: 700 }); text(ctx, "● Cl⁻", 14, 44, { size: 13, color: cs("--chem"), weight: 700 });
    text(ctx, "each ion surrounded by 6 oppositely charged ions", 14, H - 12, { size: 13, weight: 600 });
  }, { h: 300, period: 20, caption: "A giant ionic lattice: a regular 3D arrangement of alternating positive and negative ions" });

  // Covalent dot-and-cross, cycling molecules
  const MOLS = [
    { f: "H₂O", c: "O", R: 46, lone: [65, 115], L: [{ s: "H", a: 215, b: 1, r: 28, lone: [] }, { s: "H", a: 325, b: 1, r: 28, lone: [] }], note: "O: 2 bonds + 2 lone pairs = 8 · each H = 2" },
    { f: "NH₃", c: "N", R: 46, lone: [90], L: [{ s: "H", a: 210, b: 1, r: 28, lone: [] }, { s: "H", a: 270, b: 1, r: 28, lone: [] }, { s: "H", a: 330, b: 1, r: 28, lone: [] }], note: "N: 3 bonds + 1 lone pair = 8" },
    { f: "CH₄", c: "C", R: 46, lone: [], L: [45, 135, 225, 315].map(a => ({ s: "H", a, b: 1, r: 28, lone: [] })), note: "C: 4 bonds = 8 · no lone pairs" },
    { f: "CO₂", c: "C", R: 44, lone: [], L: [{ s: "O", a: 0, b: 2, r: 44, lone: [55, -55] }, { s: "O", a: 180, b: 2, r: 44, lone: [55, -55] }], note: "two C=O double bonds: 2 shared pairs each" },
    { f: "N₂", c: "N", R: 44, lone: [180], L: [{ s: "N", a: 0, b: 3, r: 44, lone: [0] }], note: "N≡N triple bond: 3 shared pairs + 1 lone pair each" }
  ];
  V.covalent = (host) => mount(host, (ctx, W, H, t) => {
    const per = 5, m = MOLS[Math.floor(t / per) % MOLS.length], lt = t % per, come = seg(lt, 0, 1.2), show = seg(lt, 1, 1.8), out = 1 - seg(lt, per - .4, per);
    const Z = Math.min(1.45, H / 190, W / 320), cx = W / 2 - (m.L.length === 1 ? 46 * Z : 0), cy = H / 2 + 6, dotC = cs("--chem"), crossC = cs("--physics");
    const rad = (d) => d * Math.PI / 180;
    const cross = (x, y, col) => { ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x - 4, y - 4); ctx.lineTo(x + 4, y + 4); ctx.moveTo(x + 4, y - 4); ctx.lineTo(x - 4, y + 4); ctx.stroke(); };
    ctx.save(); ctx.globalAlpha = out;
    const atom = (x, y, r, s, col) => { ctx.fillStyle = col + "1a"; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.stroke(); text(ctx, s, x, y + 7, { size: 20, align: "center", weight: 700, serif: true }); };
    const mR = m.R * Z; atom(cx, cy, mR, m.c, dotC);
    m.L.forEach(l => {
      const lr = l.r * Z, D = mR + lr - 24 * Z, Dd = D + (1 - come) * 70, ux = Math.cos(rad(l.a)), uy = -Math.sin(rad(l.a)), lx = cx + ux * Dd, ly = cy + uy * Dd;
      atom(lx, ly, lr, l.s, crossC);
      alpha(ctx, show, () => {
        const mid = (Dd - lr + mR) / 2, px = -uy, py = ux;
        for (let k = 0; k < l.b; k++) { const off = (k - (l.b - 1) / 2) * 13, bx = cx + ux * mid + px * off, by = cy + uy * mid + py * off;
          dot(ctx, bx - ux * 5, by - uy * 5, 4, dotC); cross(bx + ux * 5, by + uy * 5, crossC); }
        l.lone.forEach(da => { const aa = rad(l.a + da), ex = lx + Math.cos(aa) * (lr - 2), ey = ly - Math.sin(aa) * (lr - 2), tx = -Math.sin(aa), ty = -Math.cos(aa); cross(ex + tx * 6, ey + ty * 6, crossC); cross(ex - tx * 6, ey - ty * 6, crossC); });
      });
    });
    alpha(ctx, show, () => m.lone.forEach(da => { const aa = rad(da), ex = cx + Math.cos(aa) * (mR - 2), ey = cy - Math.sin(aa) * (mR - 2), tx = -Math.sin(aa), ty = -Math.cos(aa); dot(ctx, ex + tx * 6, ey + ty * 6, 4, dotC); dot(ctx, ex - tx * 6, ey - ty * 6, 4, dotC); }));
    ctx.restore();
    text(ctx, m.f, 16, 30, { size: 26, serif: true, weight: 600 });
    alpha(ctx, show * out, () => text(ctx, m.note, 16, H - 12, { size: 13, weight: 600 }));
    text(ctx, "● central atom's electrons   × other atom's electrons", W - 16, 24, { size: 11, align: "right", color: cs("--muted") });
  }, { h: 280, period: 25, caption: "Atoms move together and share pairs of electrons until every atom has a full outer shell" });

  // Rate curves: original, faster, half the limiting reactant, plus a sliding tangent
  V.rateCurves = (host) => mount(host, (ctx, W, H, t, P) => {
    const gx = 48, gy = 20, gw = W - gx - 24, gh = H - 70, tmax = 60, vmax = 70;
    const X = (s) => gx + s / tmax * gw, Y = (v) => gy + gh - v / vmax * gh;
    const curves = [[60, .06, cs("--ink"), "original"], [60, .16, cs("--chem"), "hotter / powder / catalyst"], [30, .06, cs("--muted"), "half the limiting reactant"]];
    ctx.strokeStyle = cs("--muted"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
    text(ctx, "volume of gas / cm³", gx + 6, gy + 6, { size: 11, color: cs("--muted") }); text(ctx, "time / s", gx + gw - 46, gy + gh + 18, { size: 11, color: cs("--muted") });
    const k = Math.min(1, t / (P * .55)), tEnd = k * tmax;
    curves.forEach(([vm, kk, col, label], i) => {
      ctx.strokeStyle = col; ctx.lineWidth = 3; if (i === 2) ctx.setLineDash([7, 5]);
      ctx.beginPath(); for (let s = 0; s <= tEnd; s += .5) { const v = vm * (1 - Math.exp(-kk * s)); s ? ctx.lineTo(X(s), Y(v)) : ctx.moveTo(X(s), Y(v)); } ctx.stroke(); ctx.setLineDash([]);
      const v = vm * (1 - Math.exp(-kk * tEnd)); dot(ctx, X(tEnd), Y(v), 4.5, col);
      text(ctx, "— " + label, gx + 12 + i * Math.min(190, gw / 3), H - 10, { size: 11.5, color: col, weight: 700 });
    });
    // tangent sweep on original curve
    const ts = seg(t, P * .58, P * .95) * 45 + 2;
    if (t > P * .58) {
      const v = 60 * (1 - Math.exp(-.06 * ts)), g = 60 * .06 * Math.exp(-.06 * ts), L = 14;
      ctx.strokeStyle = cs("--bad"); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(ts - L), Y(v - g * L)); ctx.lineTo(X(ts + L), Y(v + g * L)); ctx.stroke();
      dot(ctx, X(ts), Y(v), 6, cs("--bad"), 12);
      text(ctx, `rate = gradient of tangent = ${g.toFixed(2)} cm³/s`, X(ts) + 12, Y(v) + 22, { size: 12.5, weight: 700, color: cs("--bad") });
    }
  }, { h: 300, period: 12, caption: "Faster reactions are steeper but finish at the same height; less limiting reactant means a lower plateau" });

  // Reacting masses: grams → moles → ratio → moles → grams
  V.threeStep = (host) => mount(host, (ctx, W, H, t, P) => {
    const c = cs("--chem"), boxes = [["25 g", "CaCO₃"], ["0.25 mol", "CaCO₃"], ["0.25 mol", "CO₂"], ["11 g", "CO₂"]], ops = ["÷ Mr (100)", "× ratio 1 : 1", "× Mr (44)"];
    const n = boxes.length, bw = Math.min(130, (W - 40) / n - 22), gap = (W - 32 - bw * n) / (n - 1), y = H / 2 - 30;
    const stage = Math.min(n - 1, Math.floor(t / (P * .8 / n)));
    text(ctx, "CaCO₃ → CaO + CO₂", W / 2, 26, { size: 17, serif: true, weight: 600, align: "center" });
    boxes.forEach(([v, s], i) => {
      const x = 16 + i * (bw + gap), on = i <= stage, a = on ? 1 : .25;
      alpha(ctx, a, () => {
        ctx.fillStyle = i % 3 === 0 ? cs("--surface") : c + "22"; ctx.strokeStyle = i % 3 === 0 ? cs("--ink") : c; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(x, y, bw, 64, 12); ctx.fill(); ctx.stroke();
        text(ctx, v, x + bw / 2, y + 30, { size: 18, align: "center", weight: 700, serif: true }); text(ctx, s, x + bw / 2, y + 50, { size: 12, align: "center", color: cs("--muted") });
      });
      if (i < n - 1) {
        const x1 = x + bw + 4, x2 = x + bw + gap - 4, k = seg(t, (i + .6) * P * .8 / n, (i + 1) * P * .8 / n);
        alpha(ctx, i < stage ? 1 : k, () => { arrow(ctx, x1, y + 32, x1 + (x2 - x1) * Math.max(k, i < stage ? 1 : 0), y + 32, c, 3); text(ctx, ops[i], (x1 + x2) / 2, y + 88, { size: 12, align: "center", weight: 700, color: c }); });
      }
    });
    const lab = ["Step 1: mass → moles", "Step 2: use the mole ratio from the balanced equation", "Step 3: moles → mass (or volume, or concentration)"];
    text(ctx, stage === 0 ? "Start with what you know" : lab[stage - 1], W / 2, H - 14, { size: 14, align: "center", weight: 700 });
  }, { h: 230, period: 9, caption: "Every reacting-mass question is the same three steps" });

  // Electric field patterns with a drifting positive test charge
  V.efield = (host) => mount(host, (ctx, W, H, t, P) => {
    const mode = t % P < P / 2 ? 0 : 1, lt = (t % (P / 2)) / (P / 2), cp = cs("--physics"), cn = cs("--maths");
    ctx.strokeStyle = cs("--muted"); ctx.fillStyle = cs("--muted"); ctx.lineWidth = 1.5;
    if (mode === 0) {
      const cx = W / 2, cy = H / 2, r0 = 22, r1 = Math.min(W, H) * .45;
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; arrow(ctx, cx + r0 * Math.cos(a), cy + r0 * Math.sin(a), cx + r1 * Math.cos(a), cy + r1 * Math.sin(a), cs("--muted"), 1.5); }
      dot(ctx, cx, cy, 18, cp, 16); text(ctx, "+", cx, cy + 6, { size: 20, color: "#fff", align: "center", weight: 700 });
      const a = .5, rr = r0 + (r1 - r0) * lt; dot(ctx, cx + rr * Math.cos(a), cy + rr * Math.sin(a), 7, cs("--good"), 12);
      text(ctx, "Point charge: radial field, strongest where lines are closest", 14, H - 12, { size: 13, weight: 700 });
    } else {
      const top = 46, bot = H - 46, x0 = W * .18, x1 = W * .82;
      ctx.fillStyle = cp; ctx.fillRect(x0, top - 10, x1 - x0, 8); ctx.fillStyle = cn; ctx.fillRect(x0, bot + 2, x1 - x0, 8);
      text(ctx, "+ + + + + + +", W / 2, top - 16, { size: 13, align: "center", color: cp, weight: 700 }); text(ctx, "− − − − − − −", W / 2, bot + 28, { size: 13, align: "center", color: cn, weight: 700 });
      for (let k = 0; k <= 8; k++) { const x = x0 + (x1 - x0) * k / 8; arrow(ctx, x, top + 2, x, bot - 2, cs("--muted"), 1.5); }
      dot(ctx, W / 2 + (x1 - x0) / 16, top + 8 + (bot - top - 16) * lt, 7, cs("--good"), 12);
      text(ctx, "Parallel plates: uniform field from + to −", 14, H - 4, { size: 13, weight: 700 });
    }
    text(ctx, "● positive test charge follows the field", W - 14, 22, { size: 12, align: "right", color: cs("--good"), weight: 600 });
  }, { h: 280, period: 10, caption: "Field direction = the way a positive charge would be pushed" });

  V._lib = { mount, text, arrow, dot, alpha, seg, cs, clamp, ease, reduced };
  return V;
})();
