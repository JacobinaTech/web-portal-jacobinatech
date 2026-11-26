import Link from "next/link";
import { HeroConstellation } from "@/components/hero-constellation";
import { Serra } from "@/components/serra";
import { AccentBar, Button, Container, Eyebrow, InstitutionName, NightBackdrop } from "@/components/ui";
import { site } from "@/config/site";
import { formatDay } from "@/lib/format";

type ProximoEvento = { slug: string; titulo: string; data: Date };

export function Hero({ projeto, evento }: { projeto?: { titulo: string }; evento?: ProximoEvento }) {
  return (
    <section className="relative overflow-hidden bg-night text-paper">
      <NightBackdrop />
      <Serra className="absolute inset-x-0 bottom-0 h-[30%] w-full text-indigo-300/30" />
      <Container className="relative grid items-center gap-12 pb-40 pt-32 sm:pb-52 sm:pt-40 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
        <div>
          <Eyebrow dark>Jacobina e Piemonte da Diamantina</Eyebrow>
          <h1 className="mt-7 font-display text-[clamp(2.75rem,6vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            A cena tech de <span className="text-gradient">Jacobina</span> começa aqui.
          </h1>
          <div className="mt-8">
            <AccentBar />
          </div>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-paper/70 sm:text-xl">
            Encontros, projetos e oportunidades para quem estuda, trabalha ou empreende com tecnologia
            na região.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/#projetos">Ver projetos</Button>
            <Button href="/#participar" variant="ghost">
              Fazer parte
            </Button>
          </div>
          {evento && (
            <Link
              href={`/eventos/${evento.slug}/`}
              className="group mt-8 flex w-fit items-center gap-2.5 rounded-2xl bg-white/5 sm:rounded-full py-1.5 pl-1.5 pr-4 text-sm text-paper/80 ring-1 ring-white/15 transition-colors hover:text-paper hover:ring-white/30"
            >
              <span className="shrink-0 whitespace-nowrap rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold uppercase text-ink">
                {formatDay(evento.data).day} {formatDay(evento.data).month}
              </span>
              <span>
                Próximo encontro: <span className="font-semibold text-paper">{evento.titulo}</span>
              </span>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          )}
          <p className={`${evento ? "mt-6" : "mt-10"} text-sm text-paper/65`}>
            Uma iniciativa do curso de <abbr title={site.course} className="no-underline">ADS</abbr> da{" "}
            <InstitutionName className="font-semibold text-paper" />.
          </p>
        </div>
        <div className="hidden sm:block">
          <HeroConstellation projeto={projeto} />
        </div>
      </Container>
    </section>
  );
}
