import Link from "next/link";
import type { Entry } from "@/lib/content";
import type { Projeto } from "@/lib/schemas";
import { Tag } from "./ui";

const statusLabel: Record<Projeto["status"], string> = {
  "em-andamento": "Em andamento",
  concluido: "Concluído",
  "em-producao": "Em produção",
};

export function ProjetoCard({ projeto }: { projeto: Entry<Projeto> }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10">
      <div className="relative aspect-[16/9] overflow-hidden bg-night">
        {projeto.capa ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={projeto.capa}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="night-glow absolute inset-0 grid place-items-center">
            <span className="text-gradient font-display text-6xl font-bold opacity-60 transition-opacity duration-500 group-hover:opacity-100">
              {projeto.titulo.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        {projeto.destaque && (
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
            ★ Destaque
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs text-mute">
          {projeto.periodo} · {statusLabel[projeto.status]}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
          <Link href={`/projetos/${projeto.slug}/`} className="after:absolute after:inset-0">
            {projeto.titulo}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{projeto.resumo}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {projeto.tecnologias.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          {projeto.tecnologias.length > 4 && <Tag>+{projeto.tecnologias.length - 4}</Tag>}
        </div>
      </div>
    </article>
  );
}
