// Interactive canvas demos. Each demo: (root, color) => cleanup function.
window.DEMOS = (() => {
  const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setup(root, h = 320) {
    const canvas = document.createElement("canvas");
    root.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || 600;
      canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    return { canvas, ctx, size, W: () => canvas.clientWidth, H: () => h };
  }
  function controls(root, defs, onChange) {
    const box = document.createElement("div"); box.className = "controls"; root.appendChild(box);
    const vals = {};
    defs.forEach(d => {
      const l = document.createElement("label");
      l.innerHTML = `<span>${d.label}<b></b></span><input type="range" min="${d.min}" max="${d.max}" step="${d.step}" value="${d.value}">`;
      const inp = l.querySelector("input"), out = l.querySelector("b");
      const upd = () => { vals[d.key] = +inp.value; out.textContent = (d.fmt || (x => x))(+inp.value); onChange && onChange(vals); };
      inp.addEventListener("input", upd); box.appendChild(l); vals[d.key] = d.value; out.textContent = (d.fmt || (x => x))(d.value);
    });
    return vals;
  }
  function readout(root) { const r = document.createElement("div"); r.className = "readout"; root.appendChild(r); return r; }
  function loop(fn) {
    let id, t0 = performance.now(), alive = true;
    const step = (t) => { if (!alive) return; fn((t - t0) / 1000); id = requestAnimationFrame(step); };
    id = requestAnimationFrame(step);
    return () => { alive = false; cancelAnimationFrame(id); };
  }
  const typeset = (el) => window.renderMathInElement && renderMathInElement(el, { delimiters: [{ left: "$", right: "$", display: false }], ignoredClasses: ["nomath"] });
  const fix = (n, d = 2) => (Math.abs(n) < 1e-9 ? 0 : n).toFixed(d);

  // shared axis grid
  function grid(ctx, W, H, ox, oy, s) {
    ctx.strokeStyle = css("--line"); ctx.lineWidth = 1;
    for (let x = ox % s; x < W; x += s) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = oy % s; y < H; y += s) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke();
  }
  function dot(ctx, x, y, r, c, glow) {
    ctx.save(); if (glow) { ctx.shadowColor = c; ctx.shadowBlur = glow; }
    ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
  }

  const D = {};

  D.quadratic = (root, col) => {
    const { ctx, size, W, H } = setup(root, 340);
    const target = { a: 1, b: -2, c: -3 }, cur = { ...target };
    controls(root, [
      { key: "a", label: "a", min: -3, max: 3, step: 0.1, value: 1 },
      { key: "b", label: "b", min: -8, max: 8, step: 0.5, value: -2 },
      { key: "c", label: "c", min: -8, max: 8, step: 0.5, value: -3 }
    ], v => Object.assign(target, v));
    const out = readout(root);
    let last = "";
    const stop = loop((t) => {
      size();
      for (const k in cur) cur[k] += (target[k] - cur[k]) * (reduced ? 1 : 0.15); // eased morph
      const { a, b, c } = cur, w = W(), h = H(), s = 26, ox = w / 2, oy = h / 2 + 40;
      ctx.clearRect(0, 0, w, h); grid(ctx, w, h, ox, oy, s);
      ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.shadowColor = col; ctx.shadowBlur = 12; ctx.beginPath();
      for (let px = 0; px <= w; px += 2) { const x = (px - ox) / s, y = a * x * x + b * x + c, py = oy - y * s; px ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.stroke(); ctx.shadowBlur = 0;
      const A = target.a, B = target.b, Cc = target.c, disc = B * B - 4 * A * Cc;
      if (Math.abs(a) > 0.05) {
        const vx = -b / (2 * a), vy = a * vx * vx + b * vx + c;
        dot(ctx, ox + vx * s, oy - vy * s, 6, css("--ink"));
        ctx.setLineDash([5, 5]); ctx.strokeStyle = css("--muted"); ctx.beginPath(); ctx.moveTo(ox + vx * s, 0); ctx.lineTo(ox + vx * s, h); ctx.stroke(); ctx.setLineDash([]);
        const d = b * b - 4 * a * c;
        if (d >= 0) [(-b + Math.sqrt(d)) / (2 * a), (-b - Math.sqrt(d)) / (2 * a)].forEach(r => dot(ctx, ox + r * s, oy, 6 + Math.sin(t * 4) * 1.5, col, 18));
      }
      dot(ctx, ox, oy - c * s, 5, css("--muted"));
      let txt;
      if (Math.abs(A) < 0.05) txt = `With $a=0$ this is a straight line, not a quadratic.`;
      else {
        const vx = -B / (2 * A), vy = A * vx * vx + B * vx + Cc;
        const roots = disc > 0 ? `two roots: $x=${fix((-B - Math.sqrt(disc)) / (2 * A))}$ and $x=${fix((-B + Math.sqrt(disc)) / (2 * A))}$` : disc === 0 ? `one repeated root: $x=${fix(-B / (2 * A))}$` : `no real roots`;
        const co = (n, v, first) => n === 0 ? "" : (n < 0 ? "-" : first ? "" : "+") + (Math.abs(n) === 1 && v ? "" : Math.abs(n)) + v;
        txt = `$y=${co(A, "x^2", true)}${co(B, "x")}${co(Cc, "")}$ &nbsp;·&nbsp; $b^2-4ac=${fix(disc, 2)}$ → ${roots} &nbsp;·&nbsp; vertex $(${fix(vx)}, ${fix(vy)})$ (${A > 0 ? "minimum" : "maximum"})`;
      }
      if (txt !== last) { out.innerHTML = txt; typeset(out); last = txt; }
    });
    return stop;
  };

  D.line = (root, col) => {
    const { ctx, size, W, H } = setup(root, 320);
    const tg = { m: 2, c: 1 }, cur = { ...tg };
    controls(root, [
      { key: "m", label: "gradient m", min: -5, max: 5, step: 0.25, value: 2 },
      { key: "c", label: "intercept c", min: -6, max: 6, step: 0.5, value: 1 }
    ], v => Object.assign(tg, v));
    const out = readout(root); let last = "";
    return loop((t) => {
      size(); for (const k in cur) cur[k] += (tg[k] - cur[k]) * (reduced ? 1 : 0.15);
      const w = W(), h = H(), s = 26, ox = w / 2, oy = h / 2, { m, c } = cur;
      ctx.clearRect(0, 0, w, h); grid(ctx, w, h, ox, oy, s);
      const Y = x => oy - (m * x + c) * s;
      ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.shadowColor = col; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.moveTo(0, Y(-ox / s)); ctx.lineTo(w, Y((w - ox) / s)); ctx.stroke(); ctx.shadowBlur = 0;
      // perpendicular through intercept
      if (Math.abs(m) > 0.05) {
        ctx.setLineDash([6, 6]); ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1.5; const pm = -1 / m;
        ctx.beginPath(); ctx.moveTo(0, oy - (pm * (-ox / s) + c) * s); ctx.lineTo(w, oy - (pm * ((w - ox) / s) + c) * s); ctx.stroke(); ctx.setLineDash([]);
      }
      // animated rise/run triangle
      const x0 = ((t * 0.6) % 4) - 2;
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ox + x0 * s, Y(x0)); ctx.lineTo(ox + (x0 + 1) * s, Y(x0)); ctx.lineTo(ox + (x0 + 1) * s, Y(x0 + 1)); ctx.stroke();
      ctx.fillStyle = css("--ink"); ctx.font = "12px Inter, sans-serif"; ctx.fillText("run 1", ox + x0 * s + 2, Y(x0) + 14); ctx.fillText("rise " + fix(m, 2), ox + (x0 + 1) * s + 6, (Y(x0) + Y(x0 + 1)) / 2);
      dot(ctx, ox, oy - c * s, 6, col, 16);
      const txt = `$y=${tg.m}x${tg.c < 0 ? "" : "+"}${tg.c}$ · for every 1 step right, $y$ changes by ${tg.m}. Dashed line is perpendicular: gradient $${tg.m ? fix(-1 / tg.m, 2) : "\\text{undefined}"}$, and ${tg.m} × ${tg.m ? fix(-1 / tg.m, 2) : "–"} = −1.`;
      if (txt !== last) { out.innerHTML = txt; typeset(out); last = txt; }
    });
  };

  D.trig = (root, col) => {
    const { ctx, size, W, H } = setup(root, 320);
    const tg = { th: 35, hyp: 8 }, cur = { ...tg };
    controls(root, [
      { key: "th", label: "angle θ (°)", min: 5, max: 85, step: 1, value: 35, fmt: v => v + "°" },
      { key: "hyp", label: "hypotenuse", min: 3, max: 10, step: 0.5, value: 8 }
    ], v => Object.assign(tg, v));
    const out = readout(root); let last = "";
    return loop(() => {
      size(); for (const k in cur) cur[k] += (tg[k] - cur[k]) * (reduced ? 1 : 0.15);
      const w = W(), h = H(), r = cur.th * Math.PI / 180, sc = Math.min((w - 120) / 10, 26);
      const adj = cur.hyp * Math.cos(r), opp = cur.hyp * Math.sin(r);
      const x0 = 50, y0 = h - 40, x1 = x0 + adj * sc, y1 = y0 - opp * sc;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 4; ctx.lineCap = "round";
      const side = (ax, ay, bx, by, c) => { ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); };
      side(x0, y0, x1, y0, css("--chem")); side(x1, y0, x1, y1, css("--physics")); side(x0, y0, x1, y1, col);
      ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1.5; ctx.strokeRect(x1 - 12, y0 - 12, 12, 12);
      ctx.beginPath(); ctx.arc(x0, y0, 34, -r, 0); ctx.stroke();
      ctx.font = "600 13px Inter, sans-serif";
      ctx.fillStyle = css("--chem"); ctx.fillText("adj " + fix(adj), (x0 + x1) / 2 - 20, y0 + 22);
      ctx.fillStyle = css("--physics"); ctx.fillText("opp " + fix(opp), x1 + 8, (y0 + y1) / 2);
      ctx.fillStyle = col; ctx.fillText("hyp " + fix(cur.hyp), (x0 + x1) / 2 - 50, (y0 + y1) / 2 - 10);
      ctx.fillStyle = css("--ink"); ctx.fillText("θ", x0 + 40, y0 - 8);
      // unit-circle inset
      const cx = w - 80, cy = 80, R = 55;
      ctx.strokeStyle = css("--line"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
      const px = cx + R * Math.cos(r), py = cy - R * Math.sin(r);
      side(cx, cy, px, py, col); ctx.lineWidth = 3; side(px, cy, px, py, css("--physics")); side(cx, cy, px, cy, css("--chem"));
      dot(ctx, px, py, 5, col, 14);
      const T = tg.th * Math.PI / 180;
      const txt = `$\\sin ${tg.th}^\\circ=\\frac{\\text{opp}}{\\text{hyp}}=${fix(Math.sin(T), 3)}$ · $\\cos ${tg.th}^\\circ=${fix(Math.cos(T), 3)}$ · $\\tan ${tg.th}^\\circ=${fix(Math.tan(T), 3)}$. The ratios depend only on the angle: change the hypotenuse and they stay the same.`;
      if (txt !== last) { out.innerHTML = txt; typeset(out); last = txt; }
    });
  };

  D.forces = (root, col) => {
    const { ctx, size, W, H } = setup(root, 260);
    const v = controls(root, [
      { key: "F", label: "driving force (N)", min: 0, max: 100, step: 1, value: 60 },
      { key: "f", label: "friction (N)", min: 0, max: 60, step: 1, value: 20 },
      { key: "m", label: "mass (kg)", min: 1, max: 20, step: 1, value: 5 }
    ]);
    const out = readout(root); let x = 0, vel = 0, lastT = 0, last = "";
    return loop((t) => {
      size(); const dt = Math.min(t - lastT, 0.05); lastT = t;
      const w = W(), h = H(), moving = vel > 0.001;
      const fr = (moving || v.F > v.f) ? v.f : v.F; // static friction balances small pushes
      const R = v.F - fr, a = R / v.m;
      vel = Math.max(0, vel + a * dt); x += vel * dt * 20;
      if (x > w + 40) x = -80;
      ctx.clearRect(0, 0, w, h);
      // ground with scrolling hatch
      const gy = h - 50; ctx.strokeStyle = css("--muted"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      ctx.lineWidth = 1; for (let i = -20; i < w; i += 16) { ctx.beginPath(); ctx.moveTo(i, gy + 2); ctx.lineTo(i + 10, gy + 12); ctx.stroke(); }
      const bw = 40 + v.m * 3, bh = 30 + v.m * 2, bx = x, by = gy - bh;
      ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 16; ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 8); ctx.fill(); ctx.shadowBlur = 0;
      ctx.fillStyle = "#fff"; ctx.font = "600 13px Inter, sans-serif"; ctx.fillText(v.m + " kg", bx + 8, by + bh / 2 + 4);
      const arrow = (x1, x2, y, c, label) => {
        if (Math.abs(x2 - x1) < 2) return; ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); const d = Math.sign(x2 - x1);
        ctx.beginPath(); ctx.moveTo(x2 + d * 8, y); ctx.lineTo(x2 - d * 4, y - 7); ctx.lineTo(x2 - d * 4, y + 7); ctx.fill();
        ctx.font = "600 12px Inter, sans-serif"; ctx.fillText(label, Math.min(x1, x2), y - 10);
      };
      const cy = by + bh / 2;
      arrow(bx + bw, bx + bw + v.F * 1.2, cy - 8, css("--chem"), v.F + " N");
      arrow(bx, bx - fr * 1.2, cy + 8, css("--bad"), fr + " N");
      const txt = `Resultant $=${v.F}-${fr}=${R}$ N → $a=\\dfrac{F}{m}=\\dfrac{${R}}{${v.m}}=${fix(a, 2)}$ m/s². ${R === 0 ? (vel > 0 ? "Zero resultant: constant velocity (Newton's 1st law)." : "Balanced: stays at rest.") : "Unbalanced: the block accelerates."}`;
      if (txt !== last) { out.innerHTML = txt + ` <button class="btn ghost" style="padding:4px 12px;margin-left:8px" data-reset>Reset</button>`; typeset(out); last = txt; out.querySelector("[data-reset]").onclick = () => { x = 0; vel = 0; }; }
    });
  };

  D.circuit = (root, col) => {
    const { ctx, size, W, H } = setup(root, 300);
    let mode = "series";
    const seg = document.createElement("div"); seg.className = "seg"; seg.style.marginTop = "12px";
    seg.innerHTML = `<button aria-pressed="true" data-m="series">Series</button><button aria-pressed="false" data-m="parallel">Parallel</button>`;
    seg.onclick = e => { const b = e.target.closest("button"); if (!b) return; mode = b.dataset.m; seg.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(seg);
    const v = controls(root, [
      { key: "V", label: "supply (V)", min: 1, max: 24, step: 1, value: 12 },
      { key: "R1", label: "R₁ (Ω)", min: 1, max: 30, step: 1, value: 4 },
      { key: "R2", label: "R₂ (Ω)", min: 1, max: 30, step: 1, value: 8 }
    ]);
    const out = readout(root); let ph1 = 0, ph2 = 0, lt = 0, last = "";
    const path = (pts, phase, n, c) => { // electrons along polyline
      const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
      for (let k = 0; k < n; k++) {
        let s = ((k / n) * tot + phase) % tot, i = 0; while (s > L[i]) { s -= L[i]; i++; }
        const f = s / L[i]; dot(ctx, pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f, 3.5, c, 10);
      }
    };
    const res = (x, y, label, vert) => {
      ctx.fillStyle = css("--surface"); ctx.strokeStyle = css("--ink"); ctx.lineWidth = 2;
      vert ? (ctx.fillRect(x - 10, y - 26, 20, 52), ctx.strokeRect(x - 10, y - 26, 20, 52)) : (ctx.fillRect(x - 26, y - 10, 52, 20), ctx.strokeRect(x - 26, y - 10, 52, 20));
      ctx.fillStyle = css("--ink"); ctx.font = "600 12px Inter, sans-serif"; ctx.fillText(label, vert ? x + 16 : x - 18, vert ? y + 4 : y - 16);
    };
    return loop((t) => {
      size(); const dt = Math.min(t - lt, 0.05); lt = t;
      const w = W(), h = H(), L = 40, R = w - 40, T = 40, B = h - 40;
      const Rt = mode === "series" ? v.R1 + v.R2 : 1 / (1 / v.R1 + 1 / v.R2), I = v.V / Rt;
      const I1 = mode === "series" ? I : v.V / v.R1, I2 = mode === "series" ? I : v.V / v.R2;
      ctx.clearRect(0, 0, w, h); ctx.strokeStyle = css("--muted"); ctx.lineWidth = 3; ctx.lineJoin = "round";
      const k = 14;
      if (mode === "series") {
        const loopPts = [[L, B], [L, T], [R, T], [R, B], [L, B]];
        ctx.beginPath(); loopPts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke();
        ph1 += I * k * dt; path(loopPts, ph1, 26, col);
        res(L + (R - L) * 0.33, T, "R₁ " + v.R1 + "Ω"); res(L + (R - L) * 0.66, T, "R₂ " + v.R2 + "Ω");
      } else {
        const mid = (T + B) / 2 + 10, xa = L + (R - L) * 0.3, xb = L + (R - L) * 0.7;
        const p1 = [[L, B], [L, T], [xa, T], [xa, mid], [xa, B], [L, B]];
        const p2 = [[L, B], [L, T], [xb, T], [xb, mid], [xb, B], [L, B]];
        ctx.beginPath(); [[L, B], [L, T], [xb, T], [xb, B], [L, B]].forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.moveTo(xa, T); ctx.lineTo(xa, B); ctx.stroke();
        ph1 += I1 * k * dt; ph2 += I2 * k * dt; path(p1, ph1, 18, col); path(p2, ph2, 22, css("--chem"));
        res(xa, mid, "R₁ " + v.R1 + "Ω", true); res(xb, mid, "R₂ " + v.R2 + "Ω", true);
      }
      // battery
      ctx.fillStyle = css("--surface"); ctx.fillRect(L - 14, (T + B) / 2 - 16, 28, 32);
      ctx.strokeStyle = css("--ink"); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(L - 14, (T + B) / 2 - 5); ctx.lineTo(L + 14, (T + B) / 2 - 5); ctx.stroke();
      ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(L - 7, (T + B) / 2 + 5); ctx.lineTo(L + 7, (T + B) / 2 + 5); ctx.stroke();
      ctx.fillStyle = css("--ink"); ctx.font = "600 12px Inter, sans-serif"; ctx.fillText(v.V + " V", L + 18, (T + B) / 2 + 4);
      const txt = mode === "series"
        ? `Series: $R=${v.R1}+${v.R2}=${Rt}\\,\\Omega$, $I=\\frac{${v.V}}{${Rt}}=${fix(I)}$ A everywhere. P.d. shares: $V_1=${fix(I * v.R1)}$ V, $V_2=${fix(I * v.R2)}$ V.`
        : `Parallel: each branch gets the full ${v.V} V. $I_1=${fix(I1)}$ A, $I_2=${fix(I2)}$ A, total $${fix(I)}$ A. $R_{total}=${fix(Rt)}\\,\\Omega$, which is less than the smallest branch.`;
      if (txt !== last) { out.innerHTML = txt + " Dot speed ∝ current."; typeset(out); last = txt; }
    });
  };

  D.wave = (root, col) => {
    const { ctx, size, W, H } = setup(root, 280);
    let kind = "transverse";
    const seg = document.createElement("div"); seg.className = "seg"; seg.style.marginTop = "12px";
    seg.innerHTML = `<button aria-pressed="true" data-k="transverse">Transverse</button><button aria-pressed="false" data-k="longitudinal">Longitudinal</button>`;
    seg.onclick = e => { const b = e.target.closest("button"); if (!b) return; kind = b.dataset.k; seg.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    root.appendChild(seg);
    const v = controls(root, [
      { key: "f", label: "frequency (Hz)", min: 0.2, max: 2, step: 0.1, value: 0.8 },
      { key: "l", label: "wavelength (m)", min: 1, max: 6, step: 0.5, value: 3 },
      { key: "A", label: "amplitude", min: 0.2, max: 1.5, step: 0.1, value: 1 }
    ]);
    const out = readout(root); let last = "";
    return loop((t) => {
      size(); const w = W(), h = H(), s = 50, mid = h / 2, k = 2 * Math.PI / v.l, om = 2 * Math.PI * v.f;
      ctx.clearRect(0, 0, w, h);
      if (kind === "transverse") {
        ctx.strokeStyle = css("--line"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(w, mid); ctx.stroke();
        ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.shadowColor = col; ctx.shadowBlur = 14; ctx.beginPath();
        for (let px = 0; px <= w; px += 3) { const y = mid - v.A * 50 * Math.sin(k * px / s - om * t); px ? ctx.lineTo(px, y) : ctx.moveTo(px, y); }
        ctx.stroke(); ctx.shadowBlur = 0;
        for (let px = 20; px < w; px += 30) dot(ctx, px, mid - v.A * 50 * Math.sin(k * px / s - om * t), 3, css("--ink"));
        // tracked particle
        const tp = 2 * s; dot(ctx, tp, mid - v.A * 50 * Math.sin(k * 2 - om * t), 7, css("--physics"), 16);
        // wavelength marker
        ctx.strokeStyle = css("--muted"); ctx.lineWidth = 1.5; const lx = v.l * s; ctx.beginPath(); ctx.moveTo(20, h - 24); ctx.lineTo(20 + lx, h - 24); ctx.stroke();
        ctx.fillStyle = css("--muted"); ctx.font = "12px Inter, sans-serif"; ctx.fillText("λ = " + v.l + " m", 24, h - 30);
      } else {
        for (let i = 0; i < 70; i++) {
          const x0 = (i + 0.5) * w / 70, dx = v.A * 12 * Math.sin(k * x0 / s - om * t);
          for (let j = 0; j < 6; j++) dot(ctx, x0 + dx, 40 + j * ((h - 80) / 5), 2.6, i === 20 ? css("--physics") : col, i === 20 ? 12 : 0);
        }
        ctx.fillStyle = css("--muted"); ctx.font = "12px Inter, sans-serif"; ctx.fillText("compressions = crowded, rarefactions = spread out. The orange column oscillates in place.", 12, h - 10);
      }
      const txt = `$v=f\\lambda=${v.f}\\times${v.l}=${fix(v.f * v.l, 2)}$ m/s. The orange particle only oscillates. Energy travels, matter does not.`;
      if (txt !== last) { out.innerHTML = txt; typeset(out); last = txt; }
    });
  };

  D.mole = (root, col) => {
    const subs = [["Water H₂O", 18], ["Carbon dioxide CO₂", 44], ["Sodium chloride NaCl", 58.5], ["Calcium carbonate CaCO₃", 100], ["Oxygen O₂", 32], ["Magnesium Mg", 24], ["Sulfuric acid H₂SO₄", 98]];
    const { ctx, size, W, H } = setup(root, 220);
    const sel = document.createElement("select"); sel.innerHTML = subs.map((s, i) => `<option value="${i}">${s[0]} · Mr ${s[1]}</option>`).join(""); sel.style.marginTop = "12px";
    root.appendChild(sel);
    const v = controls(root, [{ key: "m", label: "mass (g)", min: 1, max: 200, step: 1, value: 36 }]);
    const out = readout(root); let last = "", shown = 0;
    return loop((t) => {
      size(); const Mr = subs[sel.value][1], n = v.m / Mr, w = W(), h = H();
      shown += (n - shown) * (reduced ? 1 : 0.1);
      ctx.clearRect(0, 0, w, h);
      // each bag = 1 mol; partial bag filled
      const bags = Math.ceil(shown - 1e-6) || 1, bw = Math.min(70, (w - 20) / Math.max(bags, 1) - 10);
      for (let i = 0; i < Math.min(bags, 12); i++) {
        const x = 15 + i * (bw + 10), fill = Math.min(1, Math.max(0, shown - i)), bob = Math.sin(t * 2 + i) * 3;
        ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(x, 40 + bob, bw, 120, 12); ctx.stroke();
        ctx.save(); ctx.beginPath(); ctx.roundRect(x, 40 + bob, bw, 120, 12); ctx.clip();
        ctx.fillStyle = col; ctx.globalAlpha = .25; ctx.fillRect(x, 40 + bob + 120 * (1 - fill), bw, 120 * fill);
        ctx.globalAlpha = 1; for (let p = 0; p < 18 * fill; p++) dot(ctx, x + 8 + ((p * 37) % (bw - 16)), 150 + bob - ((p * 23) % Math.max(1, 110 * fill)), 3, col);
        ctx.restore();
        ctx.fillStyle = css("--muted"); ctx.font = "11px Inter, sans-serif"; ctx.fillText("1 mol", x + bw / 2 - 14, 180 + bob);
      }
      if (bags > 12) { ctx.fillStyle = css("--ink"); ctx.fillText("+" + (bags - 12) + " more", w - 70, 30); }
      const txt = `$n=\\dfrac{m}{M_r}=\\dfrac{${v.m}}{${Mr}}=${fix(n, 3)}$ mol · particles $=${fix(n * 6.02, 2)}\\times10^{23}$ · if gaseous at r.t.p.: $V=${fix(n * 24, 1)}$ dm³. Each jar is one mole.`;
      if (txt !== last) { out.innerHTML = txt; typeset(out); last = txt; }
    });
  };

  D.atom = (root, col) => {
    const els = [["H", 1, 0], ["He", 2, 2], ["Li", 3, 4], ["C", 6, 6], ["N", 7, 7], ["O", 8, 8], ["F", 9, 10], ["Ne", 10, 10], ["Na", 11, 12], ["Mg", 12, 12], ["Al", 13, 14], ["Si", 14, 14], ["P", 15, 16], ["S", 16, 16], ["Cl", 17, 18], ["Ar", 18, 22], ["K", 19, 20], ["Ca", 20, 20]];
    const { ctx, size, W, H } = setup(root, 340);
    const v = controls(root, [{ key: "i", label: "element", min: 0, max: els.length - 1, step: 1, value: 8, fmt: i => els[i][0] }, { key: "q", label: "electrons lost (+) / gained (−)", min: -3, max: 3, step: 1, value: 0 }]);
    const out = readout(root); let last = "";
    return loop((t) => {
      size(); const [sym, Z, N] = els[v.i], e = Math.max(0, Z - v.q), w = W(), h = H(), cx = w / 2, cy = h / 2;
      const shells = []; let r = e; [2, 8, 8, 8].forEach(c => { if (r > 0) { shells.push(Math.min(c, r)); r -= c; } });
      ctx.clearRect(0, 0, w, h);
      // nucleus
      const nuc = Z + N; for (let i = 0; i < nuc; i++) { const a = i * 2.4, rr = 3.2 * Math.sqrt(i); dot(ctx, cx + rr * Math.cos(a), cy + rr * Math.sin(a), 4.5, i < Z ? css("--physics") : css("--muted")); }
      shells.forEach((n, si) => {
        const R = 40 + si * 34; ctx.strokeStyle = css("--line"); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
        for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2 + t * (reduced ? 0 : 0.8 / (si + 1)); dot(ctx, cx + R * Math.cos(a), cy + R * Math.sin(a), 5, col, 12); }
      });
      const charge = Z - e, full = [2, 10, 18].includes(e);
      const outer = Z <= 2 ? Z : Z <= 10 ? Z - 2 : Z <= 18 ? Z - 10 : Z - 18;
      const group = (Z === 2 || outer === 8) ? "0" : outer, period = Z <= 2 ? 1 : Z <= 10 ? 2 : Z <= 18 ? 3 : 4;
      const txt = `${sym} (group ${group}, period ${period}): ${Z} protons, ${N} neutrons, ${e} electrons → configuration <b>${shells.join(", ")}</b>. ${charge ? `Ion ${sym}<sup>${Math.abs(charge) > 1 ? Math.abs(charge) : ""}${charge > 0 ? "+" : "−"}</sup>. ` : "Neutral atom. "}${full ? "Full outer shell: stable, like a noble gas." : "Outer shell not full: try losing or gaining electrons to reach a full shell."}`;
      if (txt !== last) { out.innerHTML = txt; last = txt; }
    });
  };

  D.rates = (root, col) => {
    const { ctx, size, W, H } = setup(root, 300);
    let cat = false;
    const seg = document.createElement("div"); seg.className = "seg"; seg.style.marginTop = "12px";
    seg.innerHTML = `<button aria-pressed="false">Add catalyst</button>`;
    seg.onclick = () => { cat = !cat; seg.firstChild.setAttribute("aria-pressed", cat); };
    root.appendChild(seg);
    const v = controls(root, [
      { key: "T", label: "temperature", min: 1, max: 10, step: 1, value: 4 },
      { key: "n", label: "concentration (particles)", min: 10, max: 60, step: 2, value: 30 }
    ]);
    const out = readout(root); let ps = [], flashes = [], lt = 0, hits = [], tries = [], last = "";
    const spawn = () => ({ x: Math.random() * (W() - 20) + 10, y: Math.random() * (H() - 20) + 10, a: Math.random() * 7, kind: Math.random() < .5 ? 0 : 1, prod: false });
    return loop((t) => {
      size(); const dt = Math.min(t - lt, 0.05); lt = t; const w = W(), h = H();
      while (ps.filter(p => !p.prod).length < v.n) ps.push(spawn());
      while (ps.length > v.n + 40) ps.shift();
      const sp = 30 + v.T * 18, Ea = cat ? 0.6 : 1.2; // collision energy needed to react
      ps.forEach(p => {
        p.e ??= Math.min(2.5, -Math.log(1 - Math.random()) * 0.5); // exponential spread of kinetic energies
        const k = 0.6 + Math.sqrt(p.e); p.x += Math.cos(p.a) * sp * dt * k; p.y += Math.sin(p.a) * sp * dt * k;
        if (p.x < 6 || p.x > w - 6) p.a = Math.PI - p.a; if (p.y < 6 || p.y > h - 6) p.a = -p.a;
        p.x = Math.min(w - 6, Math.max(6, p.x)); p.y = Math.min(h - 6, Math.max(6, p.y));
      });
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const A = ps[i], B = ps[j]; if (A.prod || B.prod || A.kind === B.kind) continue;
        if (Math.hypot(A.x - B.x, A.y - B.y) < 14) {
          const expo = () => -Math.log(1 - Math.random()) * 0.5, energy = (expo() + expo()) * v.T / 5; // fresh Boltzmann-like collision energy
          tries.push(t);
          if (energy > Ea) { A.prod = B.prod = true; flashes.push({ x: (A.x + B.x) / 2, y: (A.y + B.y) / 2, t }); hits.push(t); ps = ps.filter(p => p !== B); }
          else { const tmp = A.a; A.a = B.a; B.a = tmp; A.x += Math.cos(A.a) * 8; A.y += Math.sin(A.a) * 8; B.x += Math.cos(B.a) * 8; B.y += Math.sin(B.a) * 8; } // bounce apart
        }
      }
      ctx.clearRect(0, 0, w, h);
      ps.forEach(p => dot(ctx, p.x, p.y, p.prod ? 7 : 5, p.prod ? css("--ink") : p.kind ? col : css("--physics"), p.prod ? 0 : 8));
      flashes = flashes.filter(f => t - f.t < 0.5);
      flashes.forEach(f => { const k = (t - f.t) / 0.5; ctx.strokeStyle = col; ctx.globalAlpha = 1 - k; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(f.x, f.y, 6 + k * 26, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; });
      hits = hits.filter(x => t - x < 3); tries = tries.filter(x => t - x < 3);
      // fade products so the system keeps running
      if (Math.random() < dt * 2) { const i = ps.findIndex(p => p.prod); if (i >= 0) ps.splice(i, 1); }
      const rate = (hits.length / 3).toFixed(1);
      const pct = tries.length ? Math.round(hits.length / tries.length * 100) : 0;
      const txt = `Successful collisions ≈ <b>${rate}/s</b> (${pct}% of collisions succeed). Orange and green particles react only if they collide with energy ≥ $E_a$${cat ? " (lowered by the catalyst)" : ""}. Rings show successful collisions; other pairs just bounce.`;
      if (Math.floor(t * 2) !== Math.floor((t - dt) * 2) || !last) { out.innerHTML = txt; typeset(out); last = txt; }
    });
  };

  D._lib = { setup, controls, readout, loop, typeset, fix, css, dot, reduced };
  return D;
})();
