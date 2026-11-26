import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Container, NightBackdrop, Section, Tag } from "@/components/ui";
import { site } from "@/config/site";
import { getProfessores, getProjeto, getProjetos } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjetos().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProjeto(slug);
  if (!p) return {};
  return {
    title: p.titulo,
    description: p.resumo,
    // Um openGraph próprio substitui o herdado do layout: sem capa, reaponta para a imagem padrão do site.
    openGraph: { title: p.titulo, description: p.resumo, images: [p.capa ?? "/opengraph-image.png"] },
  };
}

export default async function ProjetoPage(props: PageProps<"/projetos/[slug]">) {
  const { slug } = await props.params;
  const p = getProjeto(slug);
  if (!p) notFound();

  const ficha: [string, React.ReactNode][] = [
    ["Período", p.periodo],
    ...(p.disciplina ? ([["Disciplina", p.disciplina]] as [string, string][]) : []),
    ["Integrantes", <ul key="i">{p.integrantes.map((n) => <li key={n}>{n}</li>)}</ul>],
    ...(p.orientadores.length
      ? ([["Orientação", <ul key="o">{p.orientadores.map((n) => {
          const prof = getProfessores().find((x) => x.nome === n);
          return (
            <li key={n}>
              {prof ? (
                <Link href={`/professores/${prof.slug}/`} className="underline decoration-indigo-300 decoration-2 underline-offset-4 hover:text-indigo-600">
                  {n}
                </Link>
              ) : (
                n
              )}
            </li>
          );
        })}</ul>]] as [string, React.ReactNode][])
      : []),
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-night text-paper">
        {p.capa ? (
          <>
            {/* Capa como fundo do header: visível à direita, escurecida à esquerda para o texto. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.capa}
              alt={`Capa do projeto ${p.titulo}`}
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
            {/* Mobile: escurece a capa inteira (não há "lado livre"); desktop: degradê da esquerda para a direita. */}
            <div
              className="absolute inset-0 bg-night/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-night lg:from-25% lg:via-night/85 lg:via-55% lg:to-night/25"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" aria-hidden />
          </>
        ) : (
          <NightBackdrop />
        )}
        <Container className="relative pb-20 pt-32 sm:pb-28 sm:pt-40">
          <Link href="/projetos/" className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-sm text-paper/80 ring-1 ring-white/15 hover:text-paper">
            ← Projetos
          </Link>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-[-0.035em] text-balance sm:text-6xl">
            {p.titulo}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/70">{p.resumo}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {p.tecnologias.map((t) => (
              <Tag key={t} dark>
                {t}
              </Tag>
            ))}
          </div>
          {(p.repositorio || p.demo) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {p.demo && (
                <Button href={p.demo} external>
                  Ver demonstração
                </Button>
              )}
              {p.repositorio && (
                <Button href={p.repositorio} variant="ghost" external>
                  Repositório no GitHub
                </Button>
              )}
            </div>
          )}
        </Container>
      </section>

      <Section className="pt-14 sm:pt-20">
        <Container className="grid gap-14 lg:grid-cols-[1fr_300px]">
          {/* min-w-0: sem isso, blocos de código/tabelas largos esticam a coluna e geram rolagem horizontal no mobile */}
          <div className="min-w-0">
            <div className="rounded-3xl border-l-4 border-indigo-400 bg-white p-7 sm:p-8">
              <p className="text-sm font-semibold text-indigo-600">O problema</p>
              <p className="mt-3 font-display text-xl leading-relaxed text-ink sm:text-2xl">{p.problema}</p>
            </div>
            <div className="prose mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: p.html }} />

            {p.imagens.length > 0 && (
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {p.imagens.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="" loading="lazy" className="rounded-2xl border border-line" />
                ))}
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <dl className="divide-y divide-line rounded-3xl border border-line bg-white">
              {ficha.map(([k, v]) => (
                <div key={k} className="px-6 py-5">
                  <dt className="text-sm text-mute">{k}</dt>
                  <dd className="mt-1.5 text-sm font-medium leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href={`${site.repo}/edit/main/content/projetos/${p.slug}.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center text-xs text-mute underline underline-offset-4 hover:text-ink"
            >
              Sugerir correção nesta página
            </a>
          </aside>
        </Container>
      </Section>
    </>
  );
}
