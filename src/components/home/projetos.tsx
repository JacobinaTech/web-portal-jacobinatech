import { ProjetoCard, projetoGrid } from "@/components/cards";
import { Button, Container, SectionHeader } from "@/components/ui";
import type { Entry } from "@/lib/content";
import type { Projeto } from "@/lib/schemas";

export function Projetos({ projetos }: { projetos: Entry<Projeto>[] }) {
  return (
    <section id="projetos" className="pb-24 sm:pb-32">
      <Container>
        <SectionHeader
          eyebrow="Nasceu em Jacobina"
          title={
            <>
              Projetos que resolvem <span className="text-gradient">problemas reais</span>.
            </>
          }
          description="Soluções construídas por estudantes da região — cada uma com o problema que ataca, a stack e quem fez acontecer."
          action={
            <Button href="/projetos/" variant="dark">
              Ver todos os projetos
            </Button>
          }
        />
        <div className={projetoGrid(projetos.length)}>
          {projetos.map((p) => (
            <ProjetoCard key={p.slug} projeto={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
