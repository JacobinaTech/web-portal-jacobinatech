import { useId } from "react";

/**
 * Marca Jacobina.Tech
 * - Ícone: terminal (prompt ">") com o cursor dourado — a cena "digitando" o futuro da cidade;
 *   o dourado é o ouro de Jacobina, a "cidade do ouro".
 * - Wordmark: "jacobina■tech" em minúsculas; o ponto vira um quadradinho de ouro (rima com o cursor)
 *   e "tech" leva o gradiente azul → violeta do site.
 * O ícone também está em src/app/icon.svg (favicon); mantenha os dois em sincronia.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  // Ids únicos: o ícone aparece mais de uma vez por página (header, hero, rodapé).
  const id = useId();
  const g = `term-${id}`;
  const au = `ouro-${id}`;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id={g} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset=".55" stopColor="#818cf8" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id={au} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd54a" />
          <stop offset="1" stopColor="#d99600" />
        </linearGradient>
      </defs>
      <rect x="3" y="7" width="42" height="34" rx="9" fill="none" stroke={`url(#${g})`} strokeWidth="3" />
      <path
        d="M13 18 L20 24 L13 30"
        fill="none"
        stroke={`url(#${g})`}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="24" y="27.5" width="12" height="4" rx="2" fill={`url(#${au})`} />
    </svg>
  );
}

export function Wordmark({ dark = true, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <span className={`font-display font-bold lowercase tracking-[-0.04em] ${dark ? "text-paper" : "text-ink"} ${className}`}>
      jacobina
      <span className="mx-[0.04em] inline-block h-[0.26em] w-[0.26em] rounded-[2px] bg-gold" aria-hidden />
      <span className="sr-only">.</span>
      <span className="text-gradient">tech</span>
    </span>
  );
}

export function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <Wordmark dark={dark} className="text-[1.35rem]" />
    </span>
  );
}
