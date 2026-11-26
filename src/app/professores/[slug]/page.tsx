import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjetoCard, projetoGrid } from "@/components/cards";
import { AccentBar, Avatar, Button, Container, NightBackdrop, Section, SectionHeader, Tag } from "@/components/ui";
import { getProfessor, getProfessores, getProjetosOrientados } from "@/lib/content";
import { initials } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProfessores().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/professores/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProfessor(slug);
  if (!p) return {};
  const description = `${p.titulacao}. ${p.areas.join(", ")}.`;
  return { title: p.nome, description, openGraph: { title: p.nome, description, type: "profile" } };
}

export default async function ProfessorPage(props: PageProps<"/professores/[slug]">) {
  const { slug } = await props.params;
  const p = getProfessor(slug);
  if (!p) notFound();

  const projetos = getProjetosOrientados(p.nome);
  const links = [
    ["LinkedIn", p.linkedin],
    ["GitHub", p.github],
    ["Lattes", p.lattes],
  ].filter((l): l is [string, string] => Boolean(l[1]));

  return (
    <>
      <section className="relative overflow-hidden bg-night text-paper">
        <NightBackdrop />
        <Container className="relative pb-20 pt-32 sm:pb-24 sm:pt-40">
          <Link
            href="/#professores"
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-sm text-paper/80 ring-1 ring-white/15 hover:text-paper"
          >
            ← Professores
          </Link>
          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center">
            <div className="rounded-3xl p-[3px] shadow-[0_0_60px_-10px_rgb(129_140_248/0.6)] [background:linear-gradient(135deg,#38bdf8,#a78bfa)]">
              <Avatar src={p.foto} name={p.nome} initials={initials(p.nome)} size="lg" />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold tracking-[-0.035em] sm:text-6xl">{p.nome}</h1>
              <p className="mt-3 text-lg text-paper/70">{p.titulacao}</p>
            </div>
          </div>
          <div className="mt-8">
            <AccentBar />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {p.areas.map((a) => (
              <Tag key={a} dark>
                {a}
              </Tag>
            ))}
          </div>
          {links.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {links.map(([label, href], i) => (
                <Button key={label} href={href} variant={i === 0 ? "primary" : "ghost"} external>
                  {label}
                </Button>
              ))}
            </div>
          )}
        </Container>
      </section>

      <Section className="pt-14 sm:pt-20">
        <Container className="grid gap-14 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            {p.html.trim() && <div className="prose max-w-none text-lg" dangerouslySetInnerHTML={{ __html: p.html }} />}
          </div>
          {p.disciplinas.length > 0 && (
            <aside className="lg:self-start">
              <div className="rounded-3xl border border-line bg-white px-6 py-5">
                <p className="text-sm text-mute">Disciplinas</p>
                <ul className="mt-2 space-y-1.5 text-sm font-medium leading-relaxed">
                  {p.disciplinas.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </Container>
      </Section>

      {projetos.length > 0 && (
        <Section className="border-t border-line bg-white/60">
          <Container>
            <SectionHeader
              eyebrow="Orientação"
              title="Projetos orientados"
              description="Projetos da comunidade Jacobina.Tech com orientação deste(a) professor(a)."
            />
            <div className={projetoGrid(projetos.length)}>
              {projetos.map((proj) => (
                <ProjetoCard key={proj.slug} projeto={proj} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
