import Link from "next/link";
import { Container, SectionHeader } from "@/components/ui";
import { contactHref, site } from "@/config/site";

const portas = [
  {
    quem: "Estuda tecnologia",
    oque: "Publique seus projetos, participe de hackathons e encontre seu primeiro estágio.",
    href: site.repo,
    cta: "Publicar meu projeto",
    external: true,
  },
  {
    quem: "Tem uma empresa",
    oque: "Encontre talentos da região, proponha desafios reais e apoie os encontros.",
    href: contactHref,
    cta: "Falar com a comunidade",
  },
  {
    quem: "Já trabalha com TI",
    oque: "Palestre, seja mentor e ajude a cena local a crescer junto com você.",
    href: contactHref,
    cta: "Quero contribuir",
  },
];

export function Participar() {
  return (
    <section id="participar" className="border-t border-line bg-white py-24 sm:py-32">
      <Container>
        <SectionHeader eyebrow="Participar" title="Tem lugar para você na cena." />
        <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {portas.map((p) => (
            <div key={p.quem} className="flex flex-col md:px-10 md:first:pl-0 md:last:pr-0">
              <h3 className="font-display text-xl font-semibold">{p.quem}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-mute">{p.oque}</p>
              <Link
                href={p.href}
                {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink-2"
              >
                {p.cta} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
