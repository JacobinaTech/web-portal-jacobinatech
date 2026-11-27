// Peças compartilhadas pelos templates de marca (mesmos desenhos do site).

// Ícone: terminal com cursor dourado (igual a src/components/logo.tsx).
export const icon = (size, id = "i") => `
<svg viewBox="0 0 48 48" width="${size}" height="${size}" aria-hidden="true">
  <defs>
    <linearGradient id="${id}g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#38bdf8"/><stop offset=".55" stop-color="#818cf8"/><stop offset="1" stop-color="#a78bfa"/>
    </linearGradient>
    <linearGradient id="${id}au" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffd54a"/><stop offset="1" stop-color="#d99600"/>
    </linearGradient>
  </defs>
  <rect x="3" y="7" width="42" height="34" rx="9" fill="none" stroke="url(#${id}g)" stroke-width="3"/>
  <path d="M13 18 L20 24 L13 30" fill="none" stroke="url(#${id}g)" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="24" y="27.5" width="12" height="4" rx="2" fill="url(#${id}au)"/>
</svg>`;

// Wordmark "jacobina■tech".
export const wordmark = (px) => `
<span style="font:700 ${px}px 'Space Grotesk';letter-spacing:-.04em;color:#f7f5ef;white-space:nowrap">jacobina<span style="display:inline-block;width:.26em;height:.26em;background:#f5b301;border-radius:3px;margin:0 .04em"></span><span class="grad">tech</span></span>`;

// Silhueta da Serra de Jacobina em linhas de contorno (igual a src/components/serra.tsx).
export function serra(w, h, lines = 9) {
  const ridge = (offset, amp, seed) => {
    const pts = [];
    for (let x = 0; x <= w; x += 20) {
      const t = x / w;
      const y =
        h - offset -
        amp * (0.55 * Math.sin(t * Math.PI * 1.15 + seed) +
               0.3 * Math.sin(t * Math.PI * 3.3 + seed * 1.7) +
               0.15 * Math.sin(t * Math.PI * 7.1 + seed * 2.3) + 0.6);
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return `M${pts.join(" L")}`;
  };
  const paths = Array.from({ length: lines }, (_, i) =>
    `<path d="${ridge(i * (h / 18), h * 0.3 - i * (h / 44), 0.4 + i * 0.12)}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-opacity="${(0.55 - i * 0.05).toFixed(2)}"/>`,
  ).join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="none" aria-hidden="true">${paths}</svg>`;
}

export const baseCss = `
  @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@500&display=block");
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{background:#070b1f;overflow:hidden}
  .grad{background:linear-gradient(90deg,#38bdf8,#818cf8,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent}
  .glow{position:absolute;inset:0;background:
    radial-gradient(ellipse 60% 55% at 78% 35%, rgb(99 102 241/.34), transparent),
    radial-gradient(ellipse 45% 45% at 8% 85%, rgb(14 165 233/.14), transparent)}
`;
