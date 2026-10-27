// AI features: marking written answers and explaining uploaded questions.
// Uses the claude.ai artifact `sample` capability, so it only lights up when the page
// is opened through its claude.ai link. Everywhere else the AI controls stay hidden.
window.AI = (() => {
  const F = window.FIG;
  let samplePromise;
  const get = () => samplePromise ??= (window.claude && typeof window.claude.use === "function"
    ? window.claude.use("sample").catch(() => null) : Promise.resolve(null));

  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  // AI text → safe HTML: escape everything, then allow **bold** and line breaks. $…$ maths is left for KaTeX.
  const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");

  const errCopy = (code) => ({
    not_granted: "AI is turned off for this page. You can allow it from the page's Permissions menu.",
    sampling_disabled: "Claude isn't available on this account.",
    rate_limited: "You've reached a usage limit. Wait a little, then try again.",
    session_expired: "Your Claude session has expired. Sign in again, then retry.",
    image_rejected: "That image couldn't be read. Try a JPG or PNG photo under 20 MB.",
    images_unavailable: "Photo upload isn't available here. Type the question instead.",
    refused: "Claude couldn't help with that. Try rewording the question.",
    invalid_json: "The answer came back in an unexpected shape. Try again.",
    empty_completion: "No answer came back. Try again, maybe with a clearer photo.",
    prompt_too_large: "That's too much text at once. Try a shorter question.",
    cancelled: ""
  })[code] ?? "Something went wrong reaching Claude. Try again.";

  // ---------- safe maths expression compiler (no eval) ----------
  const FUNCS = { sqrt: Math.sqrt, abs: Math.abs, exp: Math.exp, ln: Math.log, log: Math.log10, sin: Math.sin, cos: Math.cos, tan: Math.tan };
  const NAMES = ["sqrt", "abs", "exp", "sin", "cos", "tan", "log", "ln", "pi", "x", "e"];
  function compile(src, deg = false) {
    const s = String(src).toLowerCase().replace(/\s+/g, "").replace(/π/g, "pi").replace(/[×·]/g, "*").replace(/÷/g, "/").replace(/[−–]/g, "-").replace(/\*\*/g, "^").replace(/²/g, "^2").replace(/³/g, "^3").replace(/^y=/, "");
    const toks = []; let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/[0-9.]/.test(c)) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; toks.push({ t: "num", v: parseFloat(s.slice(i, j)) }); i = j; continue; }
      if ("+-*/^()".includes(c)) { toks.push({ t: c }); i++; continue; }
      const name = NAMES.find(n => s.startsWith(n, i)); if (!name) throw new Error("bad token");
      toks.push(FUNCS[name] ? { t: "fn", v: name } : { t: "id", v: name }); i += name.length;
    }
    // implicit multiplication: 2x, 3(x+1), (x+1)(x-2), x sin x
    const out = [];
    toks.forEach((tk, k) => { const p = out[out.length - 1]; if (p && (p.t === "num" || p.t === "id" || p.t === ")") && (tk.t === "num" || tk.t === "id" || tk.t === "fn" || tk.t === "(")) out.push({ t: "*" }); out.push(tk); });
    let pos = 0; const peek = () => out[pos], take = () => out[pos++];
    const expr = () => { let n = term(); while (peek() && (peek().t === "+" || peek().t === "-")) { const op = take().t, a = n, b = term(); n = op === "+" ? (x) => a(x) + b(x) : (x) => a(x) - b(x); } return n; };
    const term = () => { let n = unary(); while (peek() && (peek().t === "*" || peek().t === "/")) { const op = take().t, a = n, b = unary(); n = op === "*" ? (x) => a(x) * b(x) : (x) => a(x) / b(x); } return n; };
    const unary = () => { if (peek() && peek().t === "-") { take(); const a = unary(); return (x) => -a(x); } if (peek() && peek().t === "+") { take(); return unary(); } return power(); };
    const power = () => { const a = primary(); if (peek() && peek().t === "^") { take(); const b = unary(); return (x) => Math.pow(a(x), b(x)); } return a; };
    const primary = () => {
      const tk = take(); if (!tk) throw new Error("end");
      if (tk.t === "num") return () => tk.v;
      if (tk.t === "id") return tk.v === "x" ? (x) => x : tk.v === "pi" ? () => Math.PI : () => Math.E;
      if (tk.t === "(") { const n = expr(); if (!take() || out[pos - 1].t !== ")") throw new Error("paren"); return n; }
      if (tk.t === "fn") { const f = FUNCS[tk.v], arg = peek() && peek().t === "(" ? primary() : power(); const trig = ["sin", "cos", "tan"].includes(tk.v) && deg; return trig ? (x) => f(arg(x) * Math.PI / 180) : (x) => f(arg(x)); }
      throw new Error("unexpected");
    };
    const fn = expr(); if (pos !== out.length) throw new Error("trailing");
    return fn;
  }

  // ---------- diagram renderer (a small, safe spec language the AI writes) ----------
  const COLS = ["o", "b", "g", "r", "c"];
  const num = (v, d) => (typeof v === "number" && isFinite(v) ? v : d);
  const niceStep = (span) => { const raw = span / 8, p = Math.pow(10, Math.floor(Math.log10(raw))); return [1, 2, 5, 10].map(m => m * p).find(s => s >= raw) || p * 10; };
  const ticks = (a, b) => { const st = niceStep(b - a), out = []; for (let v = Math.ceil(a / st) * st; v <= b + 1e-9; v += st) if (Math.abs(v) > st / 1000) out.push(+v.toFixed(6)); return { st, out }; };

  function graph(sp) {
    const x = Array.isArray(sp.x) ? sp.x.map(Number) : [-5, 5], y = Array.isArray(sp.y) ? sp.y.map(Number) : [-5, 5];
    if (!(x[1] > x[0]) || !(y[1] > y[0])) throw new Error("range");
    const deg = sp.angle === "deg" || sp.angle === "degrees", tx = ticks(x[0], x[1]), ty = ticks(y[0], y[1]);
    const curves = (sp.curves || []).slice(0, 5).map((cv, i) => { const f = compile(cv.expr, deg); return { f: (v) => { const r = f(v); return isFinite(r) ? r : NaN; }, dom: Array.isArray(cv.domain) ? cv.domain.map(Number) : undefined, c: COLS[i % COLS.length] + " thick", label: cv.label ? esc(cv.label) : "", n: 300 }; });
    curves.forEach(cv => { if (cv.label) { const xs = cv.dom || x; for (let k = 0; k <= 40; k++) { const v = xs[1] - (xs[1] - xs[0]) * (0.08 + k / 40 * 0.5), r = cv.f(v), pad = (y[1] - y[0]) * 0.12; if (r >= y[0] + pad && r <= y[1] - pad) { cv.lpos = [v, r]; cv.ldx = -8; cv.la = "end"; cv.ldy = -8; break; } } } });
    const marks = (sp.points || []).slice(0, 12).map(p => ({ x: Number(p.x), y: Number(p.y), c: "r", label: p.label ? esc(p.label) : "", pos: "ne" })).filter(p => isFinite(p.x) && isFinite(p.y));
    return F.plot({ w: 480, h: 330, x, y, gridStep: [tx.st, ty.st], ticks: { x: tx.out, y: ty.out }, xlabel: esc(sp.xlabel || "x"), ylabel: esc(sp.ylabel || "y"), curves, marks,
      extra: (X, Y) => (sp.vlines || []).slice(0, 6).map(v => F.line(X(+v.x), Y(y[0]), X(+v.x), Y(y[1]), "m d") + (v.label ? F.text(X(+v.x) + 4, Y(y[1]) + 14, esc(v.label), "tm small", "start") : "")).join("")
        + (sp.hlines || []).slice(0, 6).map(h => F.line(X(x[0]), Y(+h.y), X(x[1]), Y(+h.y), "m d") + (h.label ? F.text(X(x[1]) - 4, Y(+h.y) - 6, esc(h.label), "tm small", "end") : "")).join(""),
      cap: rich(sp.caption || "") });
  }

  function triangle(sp) {
    const V = (sp.vertices || []).slice(0, 3); if (V.length !== 3) throw new Error("need 3 vertices");
    const xs = V.map(v => +v.x), ys = V.map(v => +v.y); if (xs.concat(ys).some(v => !isFinite(v))) throw new Error("coords");
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const W = 440, H = 300, sc = Math.min((W - 120) / Math.max(maxX - minX, 1e-6), (H - 90) / Math.max(maxY - minY, 1e-6));
    const P = V.map((v, i) => [60 + (xs[i] - minX) * sc + ((W - 120) - (maxX - minX) * sc) / 2, H - 45 - (ys[i] - minY) * sc]);
    const idx = Object.fromEntries(V.map((v, i) => [String(v.label || "ABC"[i]), i])), cx = (P[0][0] + P[1][0] + P[2][0]) / 3, cy = (P[0][1] + P[1][1] + P[2][1]) / 3;
    let s = F.poly(P, "k cS", true);
    (sp.highlight || []).slice(0, 3).forEach(([a, b]) => { const i = idx[a], j = idx[b]; if (i != null && j != null) s += F.line(P[i][0], P[i][1], P[j][0], P[j][1], "r thick"); });
    if (sp.rightAngleAt != null && idx[sp.rightAngleAt] != null) { const i = idx[sp.rightAngleAt], [a, b] = [0, 1, 2].filter(k => k !== i); const u = (k) => { const dx = P[k][0] - P[i][0], dy = P[k][1] - P[i][1], d = Math.hypot(dx, dy); return [dx / d, dy / d]; }; const [ux, uy] = u(a), [vx, vy] = u(b); s += F.rightAngle(P[i][0], P[i][1], ux, uy, vx, vy, 14); }
    (sp.angles || []).slice(0, 3).forEach(an => { const i = idx[an.at]; if (i == null) return; const [a, b] = [0, 1, 2].filter(k => k !== i); const ang = (k) => Math.atan2(-(P[k][1] - P[i][1]), P[k][0] - P[i][0]) * 180 / Math.PI; let a1 = ang(a), a2 = ang(b); if (a2 < a1) [a1, a2] = [a2, a1]; if (a2 - a1 > 180) [a1, a2] = [a2, a1 + 360]; s += F.arc(P[i][0], P[i][1], 30, a1, a2, "o", esc(an.text || ""), 1.7); });
    (sp.sides || []).slice(0, 3).forEach(sd => { const i = idx[sd.from], j = idx[sd.to]; if (i == null || j == null) return; const mx = (P[i][0] + P[j][0]) / 2, my = (P[i][1] + P[j][1]) / 2, dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 1; s += F.text(mx + dx / d * 18, my + dy / d * 18 + 5, esc(sd.text || ""), "tb bold"); });
    V.forEach((v, i) => { const dx = P[i][0] - cx, dy = P[i][1] - cy, d = Math.hypot(dx, dy) || 1; s += F.text(P[i][0] + dx / d * 18, P[i][1] + dy / d * 18 + 5, esc(v.label || "ABC"[i]), "tk bold"); });
    return F.fig(W, H, s, rich(sp.caption || ""));
  }

  function forces(sp) {
    const W = 600, H = 300, cx = W / 2, cy = H / 2, bw = 90, bh = 56, list = (sp.forces || []).slice(0, 6), mx = Math.max(1, ...list.map(f => Math.abs(+f.size || 1)));
    let s = F.rect(cx - bw / 2, cy - bh / 2, bw, bh, "k cS", 8) + F.text(cx, cy + 5, esc(sp.object || ""), "tk bold small");
    if (sp.ground) s += F.line(30, cy + bh / 2, W - 30, cy + bh / 2, "k");
    list.forEach((f, i) => { const L = 30 + 80 * Math.abs(+f.size || 1) / mx, c = COLS[(i + 1) % COLS.length], lab = esc(f.label || "");
      if (f.dir === "up") s += F.arrow(cx, cy - bh / 2, cx, cy - bh / 2 - L, c + " thick", 11) + F.text(cx + 10, cy - bh / 2 - L + 12, lab, "t" + c + " bold small", "start");
      else if (f.dir === "down") s += F.arrow(cx, cy + bh / 2, cx, cy + bh / 2 + L, c + " thick", 11) + F.text(cx + 10, cy + bh / 2 + L - 2, lab, "t" + c + " bold small", "start");
      else if (f.dir === "left") s += F.arrow(cx - bw / 2, cy, cx - bw / 2 - L, cy, c + " thick", 11) + F.text(cx - bw / 2 - L - 6, cy + 5, lab, "t" + c + " bold small", "end");
      else s += F.arrow(cx + bw / 2, cy, cx + bw / 2 + L, cy, c + " thick", 11) + F.text(cx + bw / 2 + L + 6, cy + 5, lab, "t" + c + " bold small", "start"); });
    return F.fig(W, H, s, rich(sp.caption || ""));
  }

  const PARTS = ["cell", "battery", "resistor", "variable", "thermistor", "ldr", "lamp", "ammeter", "voltmeter", "motor", "switch", "fuse", "diode", "led", "heater"];
  function circuit(sp) {
    const comps = (sp.components || []).slice(0, 6).filter(c => PARTS.includes(c.type)), meters = comps.filter(c => c.type === "voltmeter"), main = comps.filter(c => c.type !== "voltmeter");
    const supply = sp.supply ? esc(sp.supply) : "";
    let s = "", W = 480, H = 260;
    if (sp.arrangement === "parallel") {
      const branches = main.filter(c => c.type !== "ammeter"), amm = main.find(c => c.type === "ammeter"), n = Math.max(branches.length, 1), x0 = 60, x1 = x0 + 110 * n + 40;
      W = x1 + 60; s += F.wire([[x0, 40], [x1, 40], [x1, 220], [x0, 220], [x0, 40]]) + F.comp("battery", x0, 130, { v: true, label: supply, lx: -56 });
      branches.forEach((c, i) => { const x = x0 + 150 + i * 110; if (x < x1) { s += F.wire([[x, 40], [x, 220]]) + F.junction(x, 40) + F.junction(x, 220); } s += F.comp(c.type, Math.min(x, x1), 130, { v: true, label: esc(c.label || ""), lx: 26 }); });
      if (amm) s += F.comp("ammeter", x0 + 70, 40, { label: esc(amm.label || "") });
    } else {
      const n = Math.max(main.length, 1), x0 = 50, x1 = Math.max(380, x0 + 100 * n + 40); W = x1 + 60;
      H = 210; s += F.wire([[x0, 50], [x1, 50], [x1, 180], [x0, 180], [x0, 50]]) + F.comp("battery", x0, 115, { v: true, label: supply, lx: -52 });
      main.forEach((c, i) => { const x = x0 + (x1 - x0) * (i + 1) / (n + 1); s += F.comp(c.type, x, 50, { label: esc(c.label || "") });
        meters.filter(m => +m.across === i).forEach(m => { s += F.wire([[x - 30, 50], [x - 30, 100], [x + 30, 100], [x + 30, 50]]) + F.junction(x - 30, 50) + F.junction(x + 30, 50) + F.comp("voltmeter", x, 100, { label: esc(m.label || ""), ly: 30 }); }); });
    }
    return F.fig(W, H, s, rich(sp.caption || ""));
  }

  function energy(sp) {
    const endo = sp.reaction === "endothermic", start = endo ? 3 : 6, end = endo ? 6 : 3;
    const path = (Hh) => (x) => { const t = Math.min(1, Math.max(0, (x - 2.5) / 5)), base = start + (end - start) * t * t * (3 - 2 * t); return base + Hh * Math.exp(-((x - 5) ** 2) / 1.2); };
    const curves = [{ f: path(4.7 - (endo ? 1.5 : 0)), dom: [0.5, 9.5], c: "k thick", label: sp.catalyst ? "without catalyst" : "", lpos: [5.4, 9], ldx: 8 }];
    if (sp.catalyst) curves.push({ f: path(2.6 - (endo ? 1.5 : 0)), dom: [0.5, 9.5], c: "g thick", label: "with catalyst", lpos: [5.9, endo ? 6.6 : 6.2], ldx: 10 });
    return F.plot({ w: 460, h: 300, x: [0, 10], y: [0, 11], grid: false, xlabel: "progress of reaction", ylabel: "energy", m: { l: 26, r: 20, t: 16, b: 26 }, curves,
      extra: (X, Y) => F.text(X(1.5), Y(start) - 8, esc(sp.reactants || "reactants"), "tk small bold") + F.text(X(8.7), Y(end) - 8, esc(sp.products || "products"), "tk small bold") + F.line(X(.5), Y(start), X(9.8), Y(start), "m d thin") + F.dim(X(9.8), Y(start), X(9.8), Y(end), "ΔH", "b", 18),
      cap: rich(sp.caption || (endo ? "Endothermic: products have more energy than reactants." : "Exothermic: products have less energy than reactants.")) });
  }

  function flow(sp) {
    const boxes = (sp.boxes || []).slice(0, 5), n = boxes.length; if (!n) throw new Error("no boxes");
    const W = 540, bw = Math.min(130, (W - 30) / n - 26), gap = n > 1 ? (W - 20 - bw * n) / (n - 1) : 0; let s = "";
    boxes.forEach((b, i) => { const x = 10 + i * (bw + gap); s += F.rect(x, 40, bw, 70, (i === n - 1 ? "c cS" : "k bgF"), 12) + F.text(x + bw / 2, 72, esc(b.text || ""), "tk bold") + F.text(x + bw / 2, 92, esc(b.sub || ""), "tm small");
      if (i < n - 1) { const x1 = x + bw + 4, x2 = x + bw + gap - 4; s += F.arrow(x1, 75, x2, 75, "c mid", 8) + F.text((x1 + x2) / 2, 132, esc((sp.arrows || [])[i] || ""), "tc small bold"); } });
    return F.fig(W, 150, s, rich(sp.caption || ""), { size: "wide" });
  }

  function bars(sp) {
    const list = (sp.bars || []).slice(0, 10).map(b => ({ l: esc(b.label), v: +b.value })).filter(b => isFinite(b.v)); if (!list.length) throw new Error("no bars");
    const mx = Math.max(...list.map(b => b.v), 1e-9), W = 480, H = 260, bw = (W - 80) / list.length; let s = F.line(50, 220, W - 20, 220, "k") + F.line(50, 220, 50, 20, "k");
    list.forEach((b, i) => { const h = 180 * Math.max(0, b.v) / mx, x = 56 + i * bw; s += F.rect(x, 220 - h, bw * 0.7, h, COLS[i % COLS.length] + "S " + COLS[i % COLS.length]) + F.text(x + bw * .35, 238, b.l, "tk small") + F.text(x + bw * .35, 214 - h, String(b.v), "tk small bold"); });
    if (sp.ylabel) s += F.text(56, 16, esc(sp.ylabel), "tk small", "start");
    return F.fig(W, H, s, rich(sp.caption || ""));
  }

  function molecule(sp) {
    const atoms = (sp.atoms || []).slice(0, 8); if (!atoms.length) throw new Error("no atoms");
    const bonds = (sp.bonds || []).slice(0, 10), xs = atoms.map(a => +a.x || 0), ys = atoms.map(a => +a.y || 0);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys), step = 74;
    const A = atoms.map((a, i) => ({ x: 70 + (xs[i] - minX) * step, y: 70 + (maxY - ys[i]) * step, r: String(a.symbol).toUpperCase() === "H" ? 28 : 42, s: esc(a.symbol || "?"), m: i === 0 ? "dot" : "cross" }));
    const W = 140 + (maxX - minX) * step, H = 140 + (maxY - minY) * step;
    const mk = (x, y, m) => m === "cross" ? F.cross(x, y, "o", 4) : F.dot(x, y, "k", 3.4);
    let s = A.map(a => F.circ(a.x, a.y, a.r, "m mid")).join("") + A.map(a => F.text(a.x, a.y + 6, a.s, "tk bold big")).join("");
    const dirs = A.map(() => []);
    bonds.forEach(b => { const i = +b.a, j = +b.b, n = Math.min(3, Math.max(1, +b.order || 1)); if (!A[i] || !A[j]) return; const P = A[i], Q = A[j], dx = Q.x - P.x, dy = Q.y - P.y, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d, px = -uy, py = ux, t = ((d - Q.r) + P.r) / 2;
      dirs[i].push(Math.atan2(-dy, dx) * 180 / Math.PI); dirs[j].push(Math.atan2(dy, -dx) * 180 / Math.PI);
      for (let k = 0; k < n; k++) { const off = (k - (n - 1) / 2) * 12, cx = P.x + ux * t + px * off, cy = P.y + uy * t + py * off; s += mk(cx - ux * 5, cy - uy * 5, P.m) + mk(cx + ux * 5, cy + uy * 5, Q.m); } });
    atoms.forEach((a, i) => { const n = Math.min(4, Math.max(0, +a.lonePairs || 0)), chosen = [];
      const vx = dirs[i].reduce((t, d) => t + Math.cos(d * Math.PI / 180), 0), vy = dirs[i].reduce((t, d) => t + Math.sin(d * Math.PI / 180), 0);
      if (n && (!dirs[i].length || Math.hypot(vx, vy) > 0.3)) { const base = dirs[i].length ? Math.atan2(-vy, -vx) * 180 / Math.PI : 90, sp = 360 / (dirs[i].length + n); for (let k = 0; k < n; k++) chosen.push(base + (k - (n - 1) / 2) * sp); }
      else for (let k = 0; k < n; k++) { let best = 90, bestScore = -1; for (let deg = 0; deg < 360; deg += 15) { const sc = Math.min(...dirs[i].concat(chosen).map(d => { const df = Math.abs(((deg - d) % 360 + 540) % 360 - 180); return df; }), 999); if (sc > bestScore) { bestScore = sc; best = deg; } } chosen.push(best); }
      chosen.forEach(deg => { const P = A[i], r = deg * Math.PI / 180, x = P.x + P.r * Math.cos(r), y = P.y - P.r * Math.sin(r), tx = -Math.sin(r) * 5, ty = -Math.cos(r) * 5; s += mk(x + tx, y + ty, P.m) + mk(x - tx, y - ty, P.m); }); });
    return F.fig(W, H, s, rich(sp.caption || "Dots: first atom's electrons. Crosses: the other atoms' electrons."), { size: "small" });
  }

  function wave(sp) {
    let s = F.line(20, 120, 520, 120, "m d"); const pts = []; for (let x = 20; x <= 500; x += 2) pts.push([x, 120 - 60 * Math.sin((x - 20) / 240 * 2 * Math.PI)]); s += F.poly(pts, "c thick");
    s += F.dim(80, 36, 320, 36, esc(sp.wavelength || "wavelength λ"), "b") + F.line(320, 60, 556, 60, "m d thin") + F.dim(550, 120, 550, 60, esc(sp.amplitude || "amplitude"), "o", 34);
    return F.fig(620, 210, s, rich(sp.caption || ""), { size: "wide" });
  }

  function refraction(sp) {
    const i = Math.min(85, Math.max(0, num(+sp.incidence, 40))) * Math.PI / 180, n1 = num(+sp.n1, 1), n2 = num(+sp.n2, 1.5), sr = n1 * Math.sin(i) / n2;
    const W = 460, H = 300, cx = 230, cy = 150; let s = F.rect(20, cy, W - 40, H - cy - 20, "b bS") + F.line(20, cy, W - 20, cy, "b") + F.line(cx, 30, cx, H - 30, "m d");
    s += F.text(30, 50, esc(sp.top || "air"), "tm bold", "start") + F.text(30, H - 34, esc(sp.bottom || "glass"), "tb bold", "start");
    s += F.arrow(cx - 120 * Math.sin(i), cy - 120 * Math.cos(i), cx, cy, "o thick", 10);
    if (sr <= 1) { const r = Math.asin(sr); s += F.arrow(cx, cy, cx + 120 * Math.sin(r), cy + 120 * Math.cos(r), "o thick", 10) + F.text(cx + 34, cy + 64, (r * 180 / Math.PI).toFixed(1) + "°", "to small bold", "start"); }
    else s += F.arrow(cx, cy, cx + 120 * Math.sin(i), cy - 120 * Math.cos(i), "o thick", 10) + F.text(cx + 40, cy - 60, "total internal reflection", "tr small bold", "start");
    s += F.text(cx - 54, cy - 50, (i * 180 / Math.PI).toFixed(0) + "°", "to small bold", "end");
    return F.fig(W, H, s, rich(sp.caption || ""), { size: "small" });
  }

  function table(sp) {
    const head = (sp.headers || []).slice(0, 8), rows = (sp.rows || []).slice(0, 14);
    return `<table class="t">${head.length ? `<tr>${head.map(h => `<th>${rich(h)}</th>`).join("")}</tr>` : ""}${rows.map(r => `<tr>${(Array.isArray(r) ? r : [r]).slice(0, 8).map(c => `<td>${rich(c)}</td>`).join("")}</tr>`).join("")}</table>` + (sp.caption ? `<p class="muted">${rich(sp.caption)}</p>` : "");
  }

  const RENDER = { graph, triangle, forces, circuit, energy_profile: energy, flow, bar_chart: bars, molecule, wave, refraction, table };
  function diagram(sp) {
    if (!sp || typeof sp !== "object" || !RENDER[sp.type]) return "";
    try { return RENDER[sp.type](sp); } catch (e) { return ""; }
  }

  // ---------- prompts ----------
  const DIAGRAM_SPEC = `Optional "diagram" objects (use ONE of these types exactly; all text is plain, no HTML):
- {"type":"graph","x":[min,max],"y":[min,max],"angle":"deg" (only for trig in degrees),"curves":[{"expr":"x^2-2x-3","label":"y = x² − 2x − 3","domain":[a,b] (optional)}],"points":[{"x":-1,"y":0,"label":"(−1, 0)"}],"vlines":[{"x":1,"label":"x = 1"}],"hlines":[{"y":2,"label":"y = 2"}],"xlabel":"x","ylabel":"y","caption":"..."}  expr uses x, numbers, + - * / ^ ( ), sqrt, abs, sin, cos, tan, exp, ln, log, pi.
- {"type":"triangle","vertices":[{"label":"A","x":0,"y":0},{"label":"B","x":7,"y":0},{"label":"C","x":2,"y":5}],"sides":[{"from":"A","to":"B","text":"7 cm"}],"angles":[{"at":"A","text":"62°"}],"rightAngleAt":"B" (optional),"highlight":[["B","C"]] (side to find),"caption":"..."}  coordinates roughly to scale.
- {"type":"forces","object":"car","ground":true,"forces":[{"dir":"right|left|up|down","size":3000,"label":"driving force 3000 N"}],"caption":"..."}
- {"type":"circuit","arrangement":"series|parallel","supply":"12 V","components":[{"type":"resistor|lamp|ammeter|voltmeter|switch|fuse|diode|led|thermistor|ldr|variable|heater|motor|cell","label":"4 Ω","across":0 (voltmeters only: index of the component it is across)}],"caption":"..."}
- {"type":"energy_profile","reaction":"exothermic|endothermic","catalyst":true|false,"reactants":"...","products":"...","caption":"..."}
- {"type":"flow","boxes":[{"text":"25 g","sub":"CaCO₃"},{"text":"0.25 mol","sub":"CaCO₃"}],"arrows":["÷ Mr 100"],"caption":"..."}  (2–5 boxes; good for calculation chains)
- {"type":"molecule","atoms":[{"symbol":"O","x":0,"y":0,"lonePairs":2},{"symbol":"H","x":-1,"y":-0.7},{"symbol":"H","x":1,"y":-0.7}],"bonds":[{"a":0,"b":1,"order":1},{"a":0,"b":2,"order":1}],"caption":"..."}  dot-and-cross; atom 0 is the central atom; x,y in bond lengths.
- {"type":"wave","wavelength":"λ = 0.5 m","amplitude":"2 cm","caption":"..."}
- {"type":"refraction","incidence":40,"n1":1,"n2":1.5,"top":"air","bottom":"glass","caption":"..."}
- {"type":"bar_chart","bars":[{"label":"A","value":3}],"ylabel":"...","caption":"..."}
- {"type":"table","headers":["..."],"rows":[["...","..."]],"caption":"..."}`;

  const explainPrompt = (question, hasImage) => `You are an outstanding Cambridge IGCSE tutor (Maths 0580, Physics 0625, Chemistry 0620) who explains so clearly that a struggling student reaches A* understanding.
${hasImage ? "The student uploaded a photo or screenshot of a question (attached). Read it carefully, including any diagram, table or numbers in it." : ""}
${question ? `The student's question / notes:\n"""${question.slice(0, 4000)}"""` : ""}

Explain how to solve it, step by step, teaching the WHY, not just the how. Use $...$ for inline maths and $$...$$ for display maths (LaTeX). Use **bold** for key words. Keep each step focused: one idea per step, usually 4–8 steps. Include a diagram wherever a picture helps understanding (aim for 2–4 diagrams across the steps: graphs, triangles, force diagrams, circuits, energy profiles, calculation flows, molecules…). Make diagram numbers match the question.

Reply with ONLY a JSON object of this shape:
{"subject":"maths|physics|chemistry|other","topic":"short topic name","question":"the question restated clearly (include given data)","asking":"what the question is really asking, in 1–2 sentences","key_idea":"the core concept needed, explained simply in 2–4 sentences","steps":[{"title":"short step title","explanation":"what we do and WHY","working":["LaTeX line 1","LaTeX line 2"],"diagram":{...optional, see below...}}],"final_answer":"the final answer with units / correct form","mistakes":["common mistake 1","common mistake 2"],"exam_tip":"how to get full marks (method marks, wording, units, accuracy)","similar":{"question":"a similar practice question","answer":"its worked answer, brief"}}
"working" items are LaTeX WITHOUT surrounding dollar signs. In JSON strings, escape every backslash (write \\\\frac, \\\\sqrt).
${DIAGRAM_SPEC}
If the image or text isn't a school question, still reply in this JSON shape, explaining what you can and asking for a clearer question in "asking".`;

  const markPrompt = (topic, q, marks, ms, answer) => `You are a strict but encouraging Cambridge IGCSE examiner. Mark the student's answer exactly as an examiner would, using the mark scheme. Award a mark only when the answer clearly contains the required point or working (accept equivalent wording, correct alternative methods, and follow-through (ft) where the scheme allows). Do not award marks for things the student did not write.

Topic: ${topic}
Question (${marks} mark${marks > 1 ? "s" : ""}): ${q}
Mark scheme: ${ms}
Student's answer:
"""${answer.slice(0, 3000)}"""

Reply with ONLY JSON:
{"awarded":<integer 0-${marks}>,"available":${marks},"points":[{"mark":"M1/A1/B1…","awarded":true|false,"reason":"short reason referring to what the student wrote"}],"feedback":"2–3 sentences: what was good and the single most important fix","missing":["specific thing missing or wrong"],"model_answer":"a concise full-mark answer"}
Use $...$ for maths (LaTeX) inside strings and escape backslashes in JSON.`;

  // ---------- "Mark with AI" for written questions ----------
  async function attachMarker(card, q, topicTitle, textarea, onAccept, math) {
    const sample = await get(); if (!sample) return;
    const bar = document.createElement("div"); bar.className = "ai-bar";
    bar.innerHTML = `<button class="btn small ai-btn">✦ Mark with AI</button><span class="ai-note muted">Claude marks it against the mark scheme</span>`;
    textarea.insertAdjacentElement("afterend", bar);
    const btn = bar.querySelector("button"), out = document.createElement("div"); out.className = "ai-out"; bar.insertAdjacentElement("afterend", out);
    let ctl;
    btn.onclick = async () => {
      const answer = textarea.value.trim();
      if (answer.length < 3) { out.innerHTML = `<p class="ai-err">Write your answer in the box first, then ask for marking.</p>`; return; }
      if (btn.dataset.busy) { ctl?.abort(); return; }
      ctl = new AbortController(); btn.dataset.busy = "1"; btn.textContent = "■ Stop";
      out.innerHTML = `<div class="ai-thinking"><span></span><span></span><span></span> Marking your answer like an examiner…</div>`;
      try {
        const r = await sample.json(markPrompt(topicTitle, q.q.replace(/<[^>]+>/g, ""), q.marks, q.ms.replace(/<br>/g, "\n").replace(/<[^>]+>/g, ""), answer), { signal: ctl.signal });
        const aw = Math.max(0, Math.min(q.marks, Math.round(+r.awarded || 0)));
        out.innerHTML = `<div class="ai-mark"><div class="ai-score"><b>${aw}</b><span>/ ${q.marks}</span><small>AI mark</small></div>
          <ul class="ai-points">${(r.points || []).slice(0, 12).map(p => `<li class="${p.awarded ? "yes" : "no"}"><i class="ai-tick">${p.awarded ? "✓" : "✗"}</i><b>${esc(p.mark || "")}</b><span>${rich(p.reason || "")}</span></li>`).join("")}</ul>
          ${r.feedback ? `<p>${rich(r.feedback)}</p>` : ""}
          ${(r.missing || []).length ? `<div class="callout warn"><b class="t">What was missing</b><ul>${r.missing.slice(0, 6).map(m => `<li>${rich(m)}</li>`).join("")}</ul></div>` : ""}
          ${r.model_answer ? `<details class="ai-model"><summary>See a full-mark answer</summary><div>${rich(r.model_answer)}</div></details>` : ""}
          <div class="ai-actions"><button class="btn small" data-accept>Use AI mark (${aw}/${q.marks})</button><a class="btn ghost small" data-explain href="#/ask">Explain this question to me</a></div>
          <p class="ai-disclaimer">AI marking is a strong guide, not an official mark.</p></div>`;
        math(out);
        out.querySelector("[data-accept]").onclick = (e) => { onAccept(aw); e.target.disabled = true; e.target.textContent = "Mark added ✓"; };
        out.querySelector("[data-explain]").onclick = () => { try { sessionStorage.setItem("astar:ask", q.q.replace(/<[^>]+>/g, "")); } catch {} };
      } catch (e) {
        out.innerHTML = e.code === "cancelled" ? "" : `<p class="ai-err">${esc(errCopy(e.code))}</p>`;
        if (["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"].includes(e.code)) bar.remove();
      } finally { delete btn.dataset.busy; if (btn.isConnected) btn.textContent = "✦ Mark again"; }
    };
  }

  // ---------- "Ask AI" page ----------
  async function page(app, { el, math, swap }) {
    const v = el(`<div class="ask">
      <div class="page-head"><span class="code">AI tutor</span><h1>Ask about any question</h1>
        <p>Upload a photo or screenshot of a question, or type it. You'll get a step-by-step explanation with diagrams, the common mistakes and a similar question to try.</p></div>
      <div class="ask-box">
        <label class="drop" tabindex="0"><input type="file" accept="image/*" hidden>
          <div class="drop-empty"><b>＋ Upload a photo of the question</b><span>Tap to choose, or drag an image here</span></div>
          <img class="drop-img" alt="Uploaded question" hidden><button class="drop-x" type="button" aria-label="Remove image" hidden>✕</button></label>
        <textarea class="ask-text" placeholder="…or type the question here (add which part you're stuck on, if you like)"></textarea>
        <div class="ask-row"><button class="btn big ask-go">✦ Explain it step by step</button><span class="muted ask-hint"></span></div>
      </div>
      <div class="ask-out"></div>
    </div>`);
    swap(v);
    const sample = await get();
    const go = v.querySelector(".ask-go"), out = v.querySelector(".ask-out"), hint = v.querySelector(".ask-hint"), txt = v.querySelector(".ask-text");
    const drop = v.querySelector(".drop"), file = drop.querySelector("input"), img = drop.querySelector(".drop-img"), x = drop.querySelector(".drop-x"), empty = drop.querySelector(".drop-empty");
    try { const pre = sessionStorage.getItem("astar:ask"); if (pre) { txt.value = pre; sessionStorage.removeItem("astar:ask"); } } catch {}
    if (!sample) { go.disabled = true; drop.hidden = true; out.innerHTML = `<div class="callout key"><b class="t">AI isn't connected here</b>The AI tutor works when you open A* Lab through its claude.ai link while signed in. Everything else on the site works anywhere.</div>`; return; }
    const caps = await sample.limits().catch(() => null), canImg = !!caps?.images;
    if (!canImg) { drop.hidden = true; hint.textContent = "Photo upload isn't available in this view, so type the question."; }
    else file.accept = caps.images.mediaTypes.join(",");
    let blob = null, ctl, url;
    const setImg = (f) => { if (!f || !f.type.startsWith("image/")) return; blob = f; if (url) URL.revokeObjectURL(url); url = URL.createObjectURL(f); img.src = url; img.hidden = false; x.hidden = false; empty.hidden = true; };
    file.onchange = () => setImg(file.files[0]);
    x.onclick = (e) => { e.preventDefault(); blob = null; img.hidden = true; x.hidden = true; empty.hidden = false; file.value = ""; };
    drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("over"); });
    drop.addEventListener("dragleave", () => drop.classList.remove("over"));
    drop.addEventListener("drop", (e) => { e.preventDefault(); drop.classList.remove("over"); setImg(e.dataTransfer.files[0]); });
    drop.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); file.click(); } });
    v.addEventListener("paste", (e) => { const f = [...(e.clipboardData?.files || [])].find(f => f.type.startsWith("image/")); if (f && canImg) setImg(f); });
    go.onclick = async () => {
      if (go.dataset.busy) { ctl?.abort(); return; }
      const q = txt.value.trim(); if (!q && !blob) { hint.textContent = "Add a photo or type a question first."; return; }
      ctl = new AbortController(); go.dataset.busy = "1"; go.textContent = "■ Stop"; hint.textContent = "";
      out.innerHTML = `<div class="ai-thinking big"><span></span><span></span><span></span> <b class="stage">Reading the question…</b></div>`;
      const stage = out.querySelector(".stage");
      try {
        const r = await sample.json(explainPrompt(q, !!blob), { signal: ctl.signal, ...(blob ? { images: [blob] } : {}),
          onText: ({ text }) => { const n = (text.match(/"title"\s*:/g) || []).length; stage.textContent = n ? `Writing step ${n}…` : "Working it out…"; } });
        renderExplanation(out, r, math);
        out.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (e) {
        out.innerHTML = e.code === "cancelled" ? "" : `<div class="callout warn"><b class="t">Couldn't explain that</b>${esc(errCopy(e.code))}</div>`;
      } finally { delete go.dataset.busy; go.textContent = "✦ Explain it step by step"; }
    };
  }

  function renderExplanation(out, r, math) {
    const steps = Array.isArray(r.steps) ? r.steps.slice(0, 12) : [];
    out.innerHTML = `<article class="explain" data-s="${esc(r.subject || "")}">
      <div class="ex-head">${r.topic ? `<span class="tag">${esc(r.subject || "")} · ${esc(r.topic)}</span>` : ""}
        ${r.question ? `<h2>The question</h2><p class="ex-q">${rich(r.question)}</p>` : ""}
        ${r.asking ? `<div class="callout key"><b class="t">What it's really asking</b>${rich(r.asking)}</div>` : ""}
        ${r.key_idea ? `<div class="callout why"><b class="t">The key idea</b>${rich(r.key_idea)}</div>` : ""}</div>
      <div class="ex-progress"><div class="progress"><div></div></div><span class="ex-count"></span></div>
      <ol class="ex-steps">${steps.map((s, i) => `<li class="ex-step" ${i ? "hidden" : ""}>
        <div class="ex-num">${i + 1}</div><div class="ex-body"><h3>${rich(s.title || "Step " + (i + 1))}</h3>
        ${s.explanation ? `<p>${rich(s.explanation)}</p>` : ""}
        ${Array.isArray(s.working) && s.working.length ? `<div class="ex-work">${s.working.slice(0, 10).map(w => `<div>$$${esc(w)}$$</div>`).join("")}</div>` : ""}
        ${diagram(s.diagram)}</div></li>`).join("")}</ol>
      <div class="ex-nav"><button class="btn ex-next">Next step →</button><button class="btn ghost ex-all">Show all steps</button></div>
      <div class="ex-end" hidden>
        ${r.final_answer ? `<div class="ex-final"><small>Final answer</small><div>${rich(r.final_answer)}</div></div>` : ""}
        ${(r.mistakes || []).length ? `<div class="callout warn"><b class="t">Common mistakes</b><ul>${r.mistakes.slice(0, 6).map(m => `<li>${rich(m)}</li>`).join("")}</ul></div>` : ""}
        ${r.exam_tip ? `<div class="callout exam"><b class="t">Exam tip</b>${rich(r.exam_tip)}</div>` : ""}
        ${r.similar?.question ? `<details class="check"><summary>${rich(r.similar.question)}</summary><div>${rich(r.similar.answer || "")}</div></details>` : ""}
        <p class="ai-disclaimer">Written by AI. It's usually right, but check anything that looks off against your notes.</p>
      </div></article>`;
    math(out);
    const items = [...out.querySelectorAll(".ex-step")], next = out.querySelector(".ex-next"), all = out.querySelector(".ex-all"), end = out.querySelector(".ex-end"), bar = out.querySelector(".ex-progress .progress div"), cnt = out.querySelector(".ex-count");
    let shown = Math.min(1, items.length);
    const upd = () => { bar.style.width = (items.length ? shown / items.length * 100 : 100) + "%"; cnt.textContent = `Step ${shown} of ${items.length}`; if (shown >= items.length) { next.hidden = true; all.hidden = true; end.hidden = false; } };
    next.onclick = () => { const it = items[shown]; if (it) { it.hidden = false; it.classList.add("pop"); it.scrollIntoView({ behavior: "smooth", block: "nearest" }); shown++; } upd(); };
    all.onclick = () => { items.forEach(i => i.hidden = false); shown = items.length; upd(); };
    upd();
  }

  return { get, compile, diagram, attachMarker, page, renderExplanation, esc, rich };
})();
