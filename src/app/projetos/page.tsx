import type { Metadata } from "next";
import { ProjetoCard } from "@/components/cards";
import { Container, EmptyState, PageHero, Section, Tag } from "@/components/ui";
import { site } from "@/config/site";
import { getProjetos, getTecnologias } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Portfólio de projetos desenvolvidos pelos estudantes de ADS em Jacobina.",
};

export default function ProjetosPage() {
  const projetos = getProjetos();
  const tecnologias = getTecnologias();

  return (
    <>
      <PageHero
        eyebrow="Portfólio"
        title="Projetos dos estudantes"
        description="Soluções reais, construídas em sala, em laboratório e em hackathons. Cada projeto mostra o problema, a solução, a stack e quem fez acontecer."
      >
        {tecnologias.length > 0 && (
          <div className="mt-10 flex max-w-3xl flex-wrap gap-2">
            {tecnologias.slice(0, 14).map((t) => (
              <Tag key={t} dark>
                {t}
              </Tag>
            ))}
          </div>
        )}
      </PageHero>

      <Section>
        <Container>
          {projetos.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projetos.map((p) => (
                <ProjetoCard key={p.slug} projeto={p} />
              ))}
            </div>
          ) : (
            <EmptyState>Os primeiros projetos da vitrine estão chegando. Seja um deles.</EmptyState>
          )}

          <div className="mt-16 rounded-3xl border border-line bg-white p-8 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="font-display text-xl font-semibold">Seu projeto também pode estar aqui.</h2>
              <p className="mt-2 text-mute">
                Crie um arquivo Markdown em <code className="font-mono text-sm">content/projetos/</code> e
                abra um Pull Request. O guia está no CONTRIBUTING do repositório.
              </p>
            </div>
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-ink-2 sm:mt-0"
            >
              Publicar meu projeto →
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
