import { Avatar, Container, SectionHeader, Tag } from "@/components/ui";
import type { Entry } from "@/lib/content";
import type { Professor } from "@/lib/schemas";
import { initials } from "@/lib/format";
import { site } from "@/config/site";

export function Professores({ professores }: { professores: Entry<Professor>[] }) {
  if (!professores.length) return null;
  return (
    <section id="professores" className="py-24 sm:py-32">
      {/* Título à esquerda + cards à direita: funciona bem com poucos perfis, sem "buracos" na grade. */}
      <Container className="grid gap-4 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <SectionHeader
          eyebrow="Professores"
          title="Quem orienta a jornada."
          description={`Professores do curso de ADS da ${site.institution.name}, com experiência acadêmica e de mercado, acompanhando de perto cada projeto.`}
        />
        <div className={`grid content-start gap-4 ${professores.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {professores.map((p) => {
            const link = p.linkedin ?? p.lattes ?? p.github;
            return (
              <article key={p.slug} className="flex gap-5 rounded-3xl bg-white p-6 ring-1 ring-line">
                <Avatar src={p.foto} name={p.nome} initials={initials(p.nome)} />
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold leading-snug">
                    {link ? (
                      <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                        {p.nome}
                      </a>
                    ) : (
                      p.nome
                    )}
                  </h3>
                  <p className="text-sm text-mute">{p.titulacao}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.areas.slice(0, 3).map((a) => (
                      <Tag key={a}>{a}</Tag>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
