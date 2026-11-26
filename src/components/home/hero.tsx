import { HeroConstellation } from "@/components/hero-constellation";
import { Serra } from "@/components/serra";
import { AccentBar, Button, Container, Eyebrow, InstitutionName, NightBackdrop } from "@/components/ui";
import { site } from "@/config/site";

export function Hero({ projeto }: { projeto?: { titulo: string } }) {
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
            <Button href="/#encontros">Próximos encontros</Button>
            <Button href="/#participar" variant="ghost">
              Fazer parte
            </Button>
          </div>
          <p className="mt-10 text-sm text-paper/65">
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
