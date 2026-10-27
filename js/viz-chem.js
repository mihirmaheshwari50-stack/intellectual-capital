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

  V._chem = { rnd, bounce };
})();
