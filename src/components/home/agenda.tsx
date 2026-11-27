import Link from "next/link";
import { Button, Container, SectionHeader } from "@/components/ui";
import { tiposEvento } from "@/config/site";
import type { Entry } from "@/lib/content";
import type { Evento } from "@/lib/schemas";
import { formatEventoData, formatEventoSelo } from "@/lib/format";

/*
 * Agenda (eventos são raros, 1–2 por ano). Só aparece quando há evento agendado.
 * - 1 evento: cartão grande, sozinho.
 * - 2+ eventos: os 3 próximos — o mais próximo em destaque, os outros dois em cartões menores.
 */

function Selo({ evento, size }: { evento: Entry<Evento>; size: "lg" | "md" | "sm" }) {
  const { topo, base } = formatEventoSelo(evento);
  const box = { lg: "h-36 w-36 rounded-[2rem]", md: "h-28 w-28 rounded-3xl", sm: "h-16 w-16 rounded-2xl" }[size];
  const top = {
    lg: evento.dataPrevista ? "text-5xl" : "text-6xl",
    md: evento.dataPrevista ? "text-4xl" : "text-5xl",
    sm: evento.dataPrevista ? "text-xl" : "text-2xl",
  }[size];
  return (
    <div
      className={`grid shrink-0 place-content-center bg-gold text-center text-ink shadow-[0_10px_40px_-10px_rgb(245_179_1/0.6)] ${box}`}
    >
      <span className={`font-display font-bold uppercase leading-none ${top}`}>{topo}</span>
      <span className={`mt-1 font-semibold uppercase ${size === "sm" ? "text-[0.65rem]" : "text-sm"}`}>{base}</span>
    </div>
  );
}

function Destaque({ evento, grande }: { evento: Entry<Evento>; grande: boolean }) {
  return (
    <article className="relative h-full overflow-hidden rounded-3xl bg-ink-2 text-paper ring-1 ring-white/10">
      <div className="night-glow pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className={`relative grid h-full gap-8 sm:grid-cols-[auto_1fr] sm:items-center ${
          grande ? "p-8 sm:gap-14 sm:p-14 lg:p-16" : "p-8 sm:gap-10 sm:p-10"
        }`}
      >
        <Selo evento={evento} size={grande ? "lg" : "md"} />
        <div className="min-w-0">
          <p className="text-sm text-paper/55">
            {tiposEvento[evento.tipo]} · {formatEventoData(evento)} · {evento.local}
          </p>
          <h3
            className={`mt-2 font-display font-bold tracking-tight text-balance ${
              grande ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl"
            }`}
          >
            {evento.titulo}
          </h3>
          <p className={`mt-4 max-w-2xl text-paper/70 ${grande ? "text-lg sm:text-xl" : ""}`}>{evento.resumo}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={`/eventos/${evento.slug}/`}>Saiba mais</Button>
            {evento.inscricao && (
              <Button href={evento.inscricao} variant="ghost" external>
                Fazer inscrição
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Compacto({ evento }: { evento: Entry<Evento> }) {
  return (
    <Link
      href={`/eventos/${evento.slug}/`}
      className="group flex h-full gap-5 rounded-3xl bg-white p-6 ring-1 ring-line transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/5"
    >
      <Selo evento={evento} size="sm" />
      <div className="min-w-0">
        <p className="text-sm text-mute">{tiposEvento[evento.tipo]}</p>
        <h3 className="mt-1 font-display text-xl font-semibold leading-snug group-hover:text-indigo-600">{evento.titulo}</h3>
        <p className="mt-1 text-sm text-mute">{formatEventoData(evento)}</p>
      </div>
    </Link>
  );
}

export function Agenda({ proximos }: { proximos: Entry<Evento>[] }) {
  if (!proximos.length) return null;
  const [primeiro, ...seguintes] = proximos.slice(0, 3);
  const unico = seguintes.length === 0;

  return (
    <section id="agenda" className="pb-24 sm:pb-32">
      <Container>
        <SectionHeader eyebrow="Agenda" title={unico ? "Próximo encontro" : "Próximos encontros"} />
        {unico ? (
          <Destaque evento={primeiro} grande />
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Destaque evento={primeiro} grande={false} />
            </div>
            <div className="grid gap-4">
              {seguintes.map((e) => (
                <Compacto key={e.slug} evento={e} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
