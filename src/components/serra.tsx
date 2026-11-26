/**
 * Silhueta estilizada da Serra de Jacobina em linhas de contorno.
 * Gerada de forma determinística no build (sem imagem externa, ~2 KB de SVG).
 */
function ridge(offset: number, amp: number, seed: number, w = 1200, h = 400) {
  const pts: string[] = [];
  for (let x = 0; x <= w; x += 20) {
    const t = x / w;
    const y =
      h -
      offset -
      amp *
        (0.55 * Math.sin(t * Math.PI * 1.15 + seed) +
          0.3 * Math.sin(t * Math.PI * 3.3 + seed * 1.7) +
          0.15 * Math.sin(t * Math.PI * 7.1 + seed * 2.3) +
          0.6);
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}

export function Serra({ className = "" }: { className?: string }) {
  const lines = Array.from({ length: 9 }, (_, i) => ({
    d: ridge(i * 22, 120 - i * 9, 0.4 + i * 0.12),
    o: 0.55 - i * 0.05,
  }));
  return (
    <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className={className} aria-hidden>
      {lines.map((l, i) => (
        <path key={i} d={l.d} fill="none" stroke="currentColor" strokeWidth={1.2} strokeOpacity={l.o} />
      ))}
    </svg>
  );
}
