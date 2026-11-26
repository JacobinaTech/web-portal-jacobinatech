import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Container, PageHero, Section } from "@/components/ui";
import { tiposEvento } from "@/config/site";
import { getEvento, getEventos } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

// Com output: "export", a rota precisa gerar ao menos uma página. Eventos são raros e a lista pode
// ficar vazia: nesse caso geramos uma sentinela que responde 404 (getEvento não a encontra).
export function generateStaticParams() {
  const params = getEventos().map((e) => ({ slug: e.slug }));
  return params.length ? params : [{ slug: "_sem-eventos" }];
}

export async function generateMetadata(props: PageProps<"/eventos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const e = getEvento(slug);
  return e ? { title: e.titulo, description: e.resumo } : {};
}

export default async function EventoPage(props: PageProps<"/eventos/[slug]">) {
  const { slug } = await props.params;
  const e = getEvento(slug);
  if (!e) notFound();

  return (
    <>
      <PageHero eyebrow={tiposEvento[e.tipo]} title={e.titulo} description={e.resumo}>
        <Link href="/" className="mt-6 inline-block text-sm text-paper/60 hover:text-paper">
          ← Início
        </Link>
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
          <div>
            <dt className="text-sm text-paper/50">Data</dt>
            <dd className="mt-1 font-medium">
              <time dateTime={e.data.toISOString()}>{formatDate(e.data)}</time>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-paper/50">Local</dt>
            <dd className="mt-1 font-medium">{e.local}</dd>
          </div>
        </dl>
        {e.inscricao && (
          <div className="mt-10">
            <Button href={e.inscricao} external>
              Fazer inscrição
            </Button>
          </div>
        )}
      </PageHero>
      <Section>
        <Container>
          <div className="prose max-w-3xl" dangerouslySetInnerHTML={{ __html: e.html }} />
        </Container>
      </Section>
    </>
  );
}
