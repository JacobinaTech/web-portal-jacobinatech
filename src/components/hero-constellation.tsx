import type { ReactNode } from "react";
import { LogoMark } from "./logo";

/**
 * Composição do hero: cartões de UI translúcidos conectados a um nó central por linhas
 * tracejadas — a "arquitetura" da comunidade. Coordenadas no espaço 600×520 (SVG e cartões
 * em % do mesmo espaço, então tudo escala junto).
 *
 * Quando houver uma foto real dos estudantes, passe `photo` (ex.: "/home/estudantes.jpg"):
 * ela ocupa o centro no lugar do nó.
 */

type Props = {
  projeto?: { titulo: string };
  photo?: string;
};

function Glass({ className = "", children, delay = "0s" }: { className?: string; children: ReactNode; delay?: string }) {
  return (
    <div
      style={{ animationDelay: delay }}
      className={`absolute animate-[float_7s_ease-in-out_infinite] rounded-2xl bg-white/[0.06] p-4 text-[11px] leading-relaxed text-paper/85 shadow-[0_0_40px_-12px_rgb(129_140_248/0.6)] ring-1 ring-white/15 backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

const Dot = () => <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />;

const check = (
  <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-indigo-400 text-[8px] text-ink" aria-hidden>
    ✓
  </span>
);

// Pontos de ancoragem de cada cartão (onde a linha chega) e as rotas a partir do nó central (300,260).
const links = [
  { d: "M300,260 H235 V75 H172", end: [172, 75] },
  { d: "M300,260 H215 V205 H180", end: [180, 205] },
  { d: "M300,260 V90 H372", end: [372, 90] },
  { d: "M300,260 V350 H200", end: [200, 350] },
  { d: "M300,260 H345 V370 H378", end: [378, 370] },
];

export function HeroConstellation({ projeto, photo }: Props) {
  return (
    <div className="relative mx-auto aspect-[600/520] w-full max-w-[600px] select-none" aria-hidden>
      <svg viewBox="0 0 600 520" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" stroke="#7dd3fc" strokeWidth="1.4" strokeDasharray="4 6" filter="url(#glow)" opacity="0.8">
          {links.map((l) => (
            <path key={l.d} d={l.d} />
          ))}
        </g>
        <g fill="#7dd3fc" filter="url(#glow)">
          {links.map(({ end: [x, y] }) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />
          ))}
        </g>
      </svg>

      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt=""
          className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-3xl object-cover ring-1 ring-white/20"
        />
      ) : (
        <div className="absolute left-1/2 top-1/2 grid h-[21%] w-[18%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-gradient-to-br from-sky-400/25 to-violet-500/25 shadow-[0_0_80px_10px_rgb(129_140_248/0.45)] ring-1 ring-sky-300/50 backdrop-blur-md">
          <LogoMark className="h-3/5 w-3/5" />
        </div>
      )}

      {/* API */}
      <Glass className="left-0 top-[6%] w-[28%]">
        <p className="font-semibold text-paper">API</p>
        <p className="mt-2 inline-block rounded-md bg-sky-500 px-1.5 py-0.5 font-mono text-[9px] font-bold text-ink">GET</p>
        <p className="mt-1.5 font-mono">/api/projetos</p>
        <p className="mt-1.5 flex items-center gap-1.5 font-mono text-emerald-300">
          <Dot />
          200 OK
        </p>
      </Glass>

      {/* Banco de dados */}
      <Glass className="left-[2%] top-[35%] w-[27%]" delay="1.2s">
        <p className="flex items-center gap-2 font-semibold text-paper">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <ellipse cx="12" cy="5" rx="8" ry="3" />
            <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
          </svg>
          Banco de dados
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-emerald-300">
          <Dot />
          Conexão segura
        </p>
      </Glass>

      {/* Código */}
      <Glass className="right-0 top-0 w-[38%] font-mono text-[10px]" delay="0.6s">
        <pre className="whitespace-pre">
          <span className="text-violet-300">const</span> comunidade = {"{"}
          {"\n"}  regiao: <span className="text-amber-300">&quot;Piemonte&quot;</span>,
          {"\n"}  modo: <span className="text-amber-300">&quot;construir&quot;</span>,
          {"\n"}{"}"};
          {"\n\n"}app.<span className="text-sky-300">get</span>(<span className="text-amber-300">&quot;/agenda&quot;</span>, listar);
        </pre>
      </Glass>

      {/* Checklist do projeto */}
      <Glass className="left-0 top-[56%] w-[34%]" delay="2s">
        <p className="font-semibold text-paper">Projeto: {projeto?.titulo ?? "Primeiro app"}</p>
        <ul className="mt-2 space-y-1.5">
          {["Problema real", "Planejamento", "Backend (API)", "Banco de dados"].map((i) => (
            <li key={i} className="flex items-center gap-2">
              {check}
              {i}
            </li>
          ))}
          <li className="flex items-center gap-2 text-paper/50">
            <span className="h-3.5 w-3.5 rounded-full ring-1 ring-paper/40" />
            Deploy
          </li>
        </ul>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-sky-400 to-violet-400" />
        </div>
      </Glass>

      {/* Aplicação (deploy) */}
      <Glass className="right-0 top-[60%] w-[37%]" delay="3s">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-paper">Aplicação</p>
          <p className="flex items-center gap-1.5 text-emerald-300">
            <Dot />
            online
          </p>
        </div>
        <div className="mt-2.5 space-y-1.5 rounded-lg bg-white/5 p-2.5 ring-1 ring-white/10">
          <div className="h-10 rounded-md bg-gradient-to-br from-sky-400/30 to-violet-400/30" />
          <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
        </div>
        <p className="mt-2 font-mono text-[10px] text-paper/50">deploy · main ✓</p>
      </Glass>
    </div>
  );
}
