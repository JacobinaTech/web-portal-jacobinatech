import Link from "next/link";
import { Button, Container, SectionHeader } from "@/components/ui";
import { tiposEvento } from "@/config/site";
import type { Entry } from "@/lib/content";
import type { Evento } from "@/lib/schemas";
import { formatEventoData, formatEventoSelo, formatMesAno } from "@/lib/format";

/*
 * Agenda: eventos são raros (1–2 por ano). A seção só existe quando há evento agendado,
 * com destaque médio — no fluxo da página, depois dos projetos.
 */
export function Agenda({ proximos }: { proximos: Entry<Evento>[] }) {
  const [proximo, ...demais] = proximos;
  if (!proximo) return null;
  const selo = formatEventoSelo(proximo);

  return (
    <section id="agenda" className="pb-24 sm:pb-32">
      <Container>
        <SectionHeader eyebrow="Agenda" title="Próximo encontro" />
        <article className="relative overflow-hidden rounded-3xl bg-ink-2 text-paper ring-1 ring-white/10">
          <div className="night-glow pointer-events-none absolute inset-0 opacity-70" aria-hidden />
          <div className="relative grid gap-8 p-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-10">
            <div className="grid h-28 w-28 place-content-center rounded-3xl bg-gold text-center text-ink shadow-[0_10px_40px_-10px_rgb(245_179_1/0.6)]">
              <span className={`font-display font-bold uppercase leading-none ${proximo.dataPrevista ? "text-4xl" : "text-5xl"}`}>
                {selo.topo}
              </span>
              <span className="mt-1 text-sm font-semibold uppercase">{selo.base}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-paper/55">
                {tiposEvento[proximo.tipo]} · {formatEventoData(proximo)} · {proximo.local}
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {proximo.titulo}
              </h3>
              <p className="mt-3 max-w-2xl text-paper/70">{proximo.resumo}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button href={`/eventos/${proximo.slug}/`}>Saiba mais</Button>
                {proximo.inscricao && (
                  <Button href={proximo.inscricao} variant="ghost" external>
                    Fazer inscrição
                  </Button>
                )}
              </div>
            </div>
          </div>

          {demais.length > 0 && (
            <div className="relative border-t border-white/10 px-8 py-5 sm:px-10">
              <ul className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-8">
                {demais.slice(0, 2).map((e) => (
                  <li key={e.slug}>
                    <Link href={`/eventos/${e.slug}/`} className="text-paper/75 hover:text-paper">
                      <span className="font-mono text-xs text-sky-300">{e.dataPrevista ? formatMesAno(e.data) : formatEventoData(e)}</span>{" "}
                      <span className="font-medium">{e.titulo}</span> →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </Container>
    </section>
  );
}
