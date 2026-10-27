// Static SVG diagram toolkit used inside lesson text.
// Colours come from CSS classes (see .fig rules in style.css) so every figure follows light/dark theme.
//   stroke classes: k (ink)  m (muted)  c (topic accent)  b (blue)  o (orange)  g (green)  r (red)
//   add "F" for a filled version (kF, cF, …), "S" for a soft tinted fill (cS, bS, oS, gS), "d" for dashed.
window.FIG = (() => {
  const r2 = (n) => Math.round(n * 10) / 10;
  const strip = (s) => String(s || "").replace(/<[^>]+>/g, "").replace(/"/g, "'");

  const fig = (w, h, body, cap = "", { size = "" } = {}) =>
    `<figure class="fig ${size}"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${strip(cap)}">${body}</svg>${cap ? `<figcaption>${cap}</figcaption>` : ""}</figure>`;
  const row = (...figs) => `<div class="fig-row">${figs.join("")}</div>`;

  const line = (x1, y1, x2, y2, c = "k") => `<line x1="${r2(x1)}" y1="${r2(y1)}" x2="${r2(x2)}" y2="${r2(y2)}" class="${c}"/>`;
  const path = (d, c = "k") => `<path d="${d}" class="${c}"/>`;
  const poly = (pts, c = "k", closed = false) => `<${closed ? "polygon" : "polyline"} points="${pts.map(p => p.map(r2).join(",")).join(" ")}" class="${c}"/>`;
  const circ = (cx, cy, r, c = "k") => `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r)}" class="${c}"/>`;
  const rect = (x, y, w, h, c = "k", rx = 0) => `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" rx="${rx}" class="${c}"/>`;
  const text = (x, y, s, c = "", a = "middle") => `<text x="${r2(x)}" y="${r2(y)}" text-anchor="${a}" class="${c}">${s}</text>`;
  const dot = (x, y, c = "k", r = 4) => circ(x, y, r, c.split(" ")[0] + "F");

  // arrow with a solid head; c is a stroke class (k, c, o, …)
  function arrow(x1, y1, x2, y2, c = "k", head = 9) {
    const a = Math.atan2(y2 - y1, x2 - x1), base = c.split(" ")[0];
    const bx = x2 - Math.cos(a) * head * .8, by = y2 - Math.sin(a) * head * .8;
    const h1 = [x2 - head * Math.cos(a - .42), y2 - head * Math.sin(a - .42)], h2 = [x2 - head * Math.cos(a + .42), y2 - head * Math.sin(a + .42)];
    return line(x1, y1, bx, by, c) + poly([[x2, y2], h1, h2], base + "F", true);
  }
  // double-headed dimension arrow with a label
  function dim(x1, y1, x2, y2, label, c = "m", off = 14) {
    const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a) * off, ny = Math.cos(a) * off;
    return arrow((x1 + x2) / 2, (y1 + y2) / 2, x1, y1, c, 7) + arrow((x1 + x2) / 2, (y1 + y2) / 2, x2, y2, c, 7) + text((x1 + x2) / 2 + nx, (y1 + y2) / 2 + ny + 4, label, "t" + c.split(" ")[0]);
  }
  // angle arc at (x,y) from angle a1 to a2 (degrees, maths convention: anticlockwise from +x, y up)
  function arc(x, y, r, a1, a2, c = "k", label = "", lr = 1.6) {
    const p = (d) => [x + r * Math.cos(d * Math.PI / 180), y - r * Math.sin(d * Math.PI / 180)];
    const [sx, sy] = p(a1), [ex, ey] = p(a2), large = Math.abs(a2 - a1) > 180 ? 1 : 0, sweep = a2 > a1 ? 0 : 1;
    const mid = (a1 + a2) / 2, lx = x + r * lr * Math.cos(mid * Math.PI / 180), ly = y - r * lr * Math.sin(mid * Math.PI / 180);
    return path(`M${r2(sx)},${r2(sy)} A${r},${r} 0 ${large} ${sweep} ${r2(ex)},${r2(ey)}`, c) + (label ? text(lx, ly + 5, label, "t" + c.split(" ")[0]) : "");
  }
  const rightAngle = (x, y, ux, uy, vx, vy, s = 12, c = "k") => poly([[x + ux * s, y + uy * s], [x + ux * s + vx * s, y + uy * s + vy * s], [x + vx * s, y + vy * s]], c);

  // ---------- graph plotting ----------
  // plot({w,h,x:[min,max],y:[min,max],grid,xlabel,ylabel,ticks:{x:[..],y:[..]},curves:[{f|pts,c,label,lx}],marks:[{x,y,label,c,pos}],extra:(X,Y)=>svg})
  function plot(o) {
    const w = o.w || 460, h = o.h || 300, m = Object.assign({ l: 40, r: 20, t: 18, b: 34 }, o.m || {});
    const [x0, x1] = o.x, [y0, y1] = o.y;
    const X = (v) => m.l + (v - x0) / (x1 - x0) * (w - m.l - m.r), Y = (v) => h - m.b - (v - y0) / (y1 - y0) * (h - m.t - m.b);
    let s = "";
    if (o.grid !== false) {
      const gs = o.gridStep || [1, 1];
      for (let v = Math.ceil(x0 / gs[0]) * gs[0]; v <= x1 + 1e-9; v += gs[0]) s += line(X(v), Y(y0), X(v), Y(y1), "grid");
      for (let v = Math.ceil(y0 / gs[1]) * gs[1]; v <= y1 + 1e-9; v += gs[1]) s += line(X(x0), Y(v), X(x1), Y(v), "grid");
    }
    const ax = Math.min(Math.max(0, y0), y1), ay = Math.min(Math.max(0, x0), x1);
    s += arrow(X(x0), Y(ax), X(x1) + 8, Y(ax), "k thin", 8) + arrow(X(ay), Y(y0), X(ay), Y(y1) - 8, "k thin", 8);
    if (o.xlabel) s += text(X(x1) + 4, Y(ax) - 8, o.xlabel, "tk small", "end");
    if (o.ylabel) s += text(X(ay) + 8, Y(y1) - 2, o.ylabel, "tk small", "start");
    (o.ticks?.x || []).forEach(v => { s += line(X(v), Y(ax) - 3, X(v), Y(ax) + 3, "k thin") + text(X(v), Y(ax) + 16, o.tickFmt?.x ? o.tickFmt.x(v) : v, "tm small"); });
    (o.ticks?.y || []).forEach(v => { s += line(X(ay) - 3, Y(v), X(ay) + 3, Y(v), "k thin") + text(X(ay) - 7, Y(v) + 4, o.tickFmt?.y ? o.tickFmt.y(v) : v, "tm small", "end"); });
    (o.curves || []).forEach(cv => {
      let pts = cv.pts;
      if (cv.f) { pts = []; const [a, b] = cv.dom || [x0, x1]; const n = cv.n || 160; for (let i = 0; i <= n; i++) { const v = a + (b - a) * i / n, yv = cv.f(v); if (isFinite(yv) && yv >= y0 - (y1 - y0) * .6 && yv <= y1 + (y1 - y0) * .6) pts.push([v, yv]); else if (pts.length) { s += clipPoly(pts, cv.c); pts = []; } } }
      s += clipPoly(pts, cv.c);
      if (cv.label) { const [lx, ly] = cv.lpos || pts[pts.length - 1]; s += text(X(lx) + (cv.ldx || 6), Y(ly) + (cv.ldy || 0), cv.label, "t" + (cv.c || "c").split(" ")[0] + " small", cv.la || "start"); }
    });
    function clipPoly(pts, c = "c thick") {
      if (pts.length < 2) return "";
      const id = "c" + Math.random().toString(36).slice(2, 8);
      return `<clipPath id="${id}"><rect x="${X(x0)}" y="${Y(y1)}" width="${X(x1) - X(x0)}" height="${Y(y0) - Y(y1)}"/></clipPath><g clip-path="url(#${id})">${poly(pts.map(([a, b]) => [X(a), Y(b)]), c)}</g>`;
    }
    (o.marks || []).forEach(p => {
      s += dot(X(p.x), Y(p.y), p.c || "k", p.r || 4);
      if (p.label) { const pos = p.pos || "ne", dx = pos.includes("e") ? 8 : pos.includes("w") ? -8 : 0, dy = pos.includes("n") ? -8 : pos.includes("s") ? 16 : 4; s += text(X(p.x) + dx, Y(p.y) + dy, p.label, "t" + (p.c || "k") + " small", dx > 0 ? "start" : dx < 0 ? "end" : "middle"); }
    });
    if (o.extra) s += o.extra(X, Y);
    return fig(w, h, s, o.cap || "", { size: o.size || "" });
  }

  // ---------- circuit symbols ----------
  // Draw the wires first (wire([...points])), then drop components on top: each masks the wire under it.
  const wire = (pts) => poly(pts, "k wire");
  const junction = (x, y) => circ(x, y, 3.5, "kF");
  function comp(type, x, y, o = {}) {
    const v = o.v, rot = v ? ` transform="rotate(90 ${x} ${y})"` : "";
    let g = "";
    switch (type) {
      case "cell": g = rect(x - 6, y - 16, 12, 32, "bgF nostroke") + line(x - 4, y - 15, x - 4, y + 15, "k") + line(x + 4, y - 8, x + 4, y + 8, "k thick"); break;
      case "battery": g = rect(x - 16, y - 16, 32, 32, "bgF nostroke") + line(x - 12, y - 15, x - 12, y + 15, "k") + line(x - 4, y - 8, x - 4, y + 8, "k thick") + line(x + 4, y - 15, x + 4, y + 15, "k") + line(x + 12, y - 8, x + 12, y + 8, "k thick"); break;
      case "resistor": g = rect(x - 20, y - 8, 40, 16, "bgF k"); break;
      case "variable": g = rect(x - 20, y - 8, 40, 16, "bgF k") + arrow(x - 18, y + 14, x + 18, y - 14, "k thin", 7); break;
      case "thermistor": g = rect(x - 20, y - 8, 40, 16, "bgF k") + poly([[x - 26, y + 14], [x - 18, y + 14], [x + 18, y - 14]], "k thin"); break;
      case "ldr": g = circ(x, y, 22, "bgF k") + rect(x - 14, y - 6, 28, 12, "bgF k") + arrow(x - 26, y - 30, x - 12, y - 14, "k thin", 6) + arrow(x - 14, y - 34, x, y - 18, "k thin", 6); break;
      case "lamp": g = circ(x, y, 12, "bgF k") + line(x - 8.5, y - 8.5, x + 8.5, y + 8.5, "k") + line(x - 8.5, y + 8.5, x + 8.5, y - 8.5, "k"); break;
      case "ammeter": case "voltmeter": case "motor": g = circ(x, y, 13, "bgF k") + text(x, y + 5, type === "ammeter" ? "A" : type === "voltmeter" ? "V" : "M", "tk bold"); break;
      case "switch": g = rect(x - 16, y - 4, 32, 8, "bgF nostroke") + circ(x - 14, y, 2.5, "kF") + circ(x + 14, y, 2.5, "kF") + line(x - 14, y, x + 12, y - (o.closed ? 1 : 12), "k"); break;
      case "fuse": g = rect(x - 16, y - 6, 32, 12, "bgF k") + line(x - 22, y, x + 22, y, "k"); break;
      case "diode": case "led": g = rect(x - 12, y - 12, 24, 24, "bgF nostroke") + poly([[x - 9, y - 10], [x - 9, y + 10], [x + 8, y]], "bgF k", true) + line(x + 8, y - 10, x + 8, y + 10, "k") + line(x - 12, y, x + 12, y, "k") + (type === "led" ? arrow(x + 2, y - 12, x + 12, y - 24, "k thin", 6) + arrow(x + 9, y - 10, x + 19, y - 22, "k thin", 6) : ""); break;
      case "heater": g = rect(x - 20, y - 8, 40, 16, "bgF k") + [-12, -4, 4, 12].map(d => line(x + d, y - 8, x + d, y + 8, "k thin")).join(""); break;
    }
    const lab = o.label ? text(v ? x + (o.lx ?? 30) : x + (o.lx ?? 0), v ? y + 4 + (o.ly ?? 0) : y + (o.ly ?? -18), o.label, "tk small", v ? "start" : "middle") : "";
    return `<g${rot}>${g}</g>` + lab;
  }

  // ---------- chemistry: atoms with shells, dot-and-cross ----------
  // shells: array of electron counts; marks: 'dot' or 'cross'
  function atom(cx, cy, sym, shells, o = {}) {
    const r0 = o.r0 || 22, dr = o.dr || 18, cls = o.c || "c";
    let s = circ(cx, cy, o.nucleus || 12, cls + "S k") + text(cx, cy + 5, sym, "tk bold");
    shells.forEach((n, i) => {
      const r = r0 + i * dr; s += circ(cx, cy, r, "m thin");
      for (let k = 0; k < n; k++) {
        const pairOff = n > 2 ? (k % 2 ? 9 : -9) : 0, base = n > 2 ? Math.floor(k / 2) * (360 / Math.ceil(n / 2)) : k * 180;
        const a = (base + pairOff + (o.rot || 0) + 90) * Math.PI / 180, x = cx + r * Math.cos(a), y = cy - r * Math.sin(a);
        const mark = (o.marks && o.marks[i] && o.marks[i][k]) || o.mark || "dot";
        s += mark === "cross" ? cross(x, y, o.xc || "o") : dot(x, y, o.dc || "k", 3.4);
      }
    });
    return s;
  }
  const cross = (x, y, c = "o", r = 4) => line(x - r, y - r, x + r, y + r, c + " mid") + line(x - r, y + r, x + r, y - r, c + " mid");
  // electrons around a point at given angle with given radius
  const pairAt = (cx, cy, r, deg, kind = "dot", c = "k") => {
    const a = deg * Math.PI / 180, x = cx + r * Math.cos(a), y = cy - r * Math.sin(a), tx = -Math.sin(a) * 5, ty = -Math.cos(a) * 5;
    return kind === "cross" ? cross(x + tx, y + ty, c) + cross(x - tx, y - ty, c) : dot(x + tx, y + ty, c, 3.3) + dot(x - tx, y - ty, c, 3.3);
  };
  const one = (cx, cy, r, deg, kind = "dot", c = "k") => { const a = deg * Math.PI / 180, x = cx + r * Math.cos(a), y = cy - r * Math.sin(a); return kind === "cross" ? cross(x, y, c) : dot(x, y, c, 3.3); };
  // bracket with charge, for ions
  const bracket = (cx, cy, rad, charge) => path(`M${cx - rad + 8},${cy - rad} H${cx - rad} V${cy + rad} H${cx - rad + 8}`, "k") + path(`M${cx + rad - 8},${cy - rad} H${cx + rad} V${cy + rad} H${cx + rad - 8}`, "k") + text(cx + rad + 6, cy - rad + 8, charge, "tk bold", "start");

  // small key/legend row
  const key = (x, y, items) => items.map(([c, label], i) => line(x, y + i * 18, x + 22, y + i * 18, c + " thick") + text(x + 28, y + i * 18 + 4, label, "tk small", "start")).join("");

  return { fig, row, line, path, poly, circ, rect, text, dot, arrow, dim, arc, rightAngle, plot, wire, junction, comp, atom, cross, pairAt, one, bracket, key };
})();
