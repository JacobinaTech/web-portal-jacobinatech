import Link from "next/link";
import { Button, Container } from "@/components/ui";
import { contactHref, tiposEvento } from "@/config/site";
import type { Entry } from "@/lib/content";
import type { Evento } from "@/lib/schemas";
import { formatDate, formatDay } from "@/lib/format";

/** Bento logo abaixo do hero: próximo encontro + oportunidades + desafios (+ resto da agenda). */
export function Encontros({ proximos }: { proximos: Entry<Evento>[] }) {
  const [proximo, ...demais] = proximos;

  return (
    <section id="encontros" className="relative z-10 -mt-24 pb-24 sm:-mt-32 sm:pb-32">
      <Container>
        <div className="grid gap-4 md:grid-cols-6">
          {/* Próximo encontro */}
          <article className="relative flex flex-col overflow-hidden rounded-3xl bg-ink-2 p-8 text-paper ring-1 ring-white/10 md:col-span-4 md:row-span-2 sm:p-10">
            <div className="night-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <p className="relative text-sm text-paper/55">Próximo encontro</p>
            {proximo ? (
              <div className="relative flex flex-1 flex-col">
                <div className="mt-6 flex items-start gap-6">
                  <div className="hidden shrink-0 rounded-2xl bg-gold px-4 py-3 text-center text-ink sm:block">
                    <span className="block font-display text-4xl font-bold leading-none">{formatDay(proximo.data).day}</span>
                    <span className="mt-1 block text-xs font-semibold uppercase">{formatDay(proximo.data).month}</span>
                  </div>
                  <div>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">{proximo.titulo}</h2>
                    <p className="mt-3 max-w-lg text-paper/65">{proximo.resumo}</p>
                    <p className="mt-4 text-sm text-paper/50">
                      {tiposEvento[proximo.tipo]} · {formatDate(proximo.data)} · {proximo.local}
                    </p>
                  </div>
                </div>

                {demais.length > 0 && (
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-sm text-paper/55">Também na agenda</p>
                    <ul className="mt-3 space-y-2">
                      {demais.slice(0, 3).map((e) => (
                        <li key={e.slug}>
                          <Link href={`/eventos/${e.slug}/`} className="group flex flex-wrap items-baseline gap-x-3 text-paper/85 hover:text-paper">
                            <span className="font-mono text-xs text-sky-300">{formatDate(e.data)}</span>
                            <span className="font-medium group-hover:underline group-hover:decoration-sky-300 group-hover:underline-offset-4">
                              {e.titulo}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto pt-8">
                  <Button href={`/eventos/${proximo.slug}/`}>Ver programação</Button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <h2 className="mt-6 font-display text-3xl font-bold tracking-tight">A próxima agenda está sendo montada.</h2>
                <p className="mt-3 max-w-lg text-paper/65">Quer propor uma palestra, oficina ou visita técnica?</p>
                <div className="mt-8">
                  <Button href={contactHref}>Propor um encontro</Button>
                </div>
              </div>
            )}
          </article>

          {/* Oportunidades */}
          <article className="flex flex-col rounded-3xl bg-white p-8 ring-1 ring-line md:col-span-2">
            <p className="text-sm text-mute">Oportunidades</p>
            <h2 className="mt-5 font-display text-2xl font-bold tracking-tight">Vaga, estágio ou freela na região?</h2>
            <p className="mt-3 flex-1 text-mute">Divulgue para quem está se formando aqui.</p>
            <Link href={contactHref} className="mt-6 inline-flex items-center gap-1.5 font-semibold text-ink hover:text-indigo-600">
              Divulgar oportunidade <span aria-hidden>→</span>
            </Link>
          </article>

          {/* Desafios */}
          <article className="flex flex-col rounded-3xl bg-gold p-8 text-ink md:col-span-2">
            <p className="text-sm text-ink/60">Desafios</p>
            <h2 className="mt-5 font-display text-2xl font-bold tracking-tight">
              Um problema da cidade que a tecnologia pode resolver?
            </h2>
            <p className="mt-3 flex-1 text-ink/70">Ele pode virar tema do próximo hackathon.</p>
            <Link href={contactHref} className="mt-6 inline-flex items-center gap-1.5 font-semibold underline decoration-2 underline-offset-4">
              Enviar desafio <span aria-hidden>→</span>
            </Link>
          </article>
        </div>
      </Container>
    </section>
  );
}
