import { AccentBar, Container, Eyebrow, InstitutionName, NightBackdrop } from "@/components/ui";
import { site } from "@/config/site";

const canais = [
  { label: "Instagram", desc: "Agenda e bastidores", href: site.social.instagram },
  { label: "LinkedIn", desc: "Comunidade e vagas", href: site.social.linkedin },
  { label: "GitHub", desc: "Código dos projetos", href: site.social.github },
  { label: "YouTube", desc: "Palestras gravadas", href: site.social.youtube },
];

export function Contato() {
  return (
    <section id="contato" className="relative overflow-hidden bg-night py-24 text-paper sm:py-32">
      <NightBackdrop />
      <Container className="relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow dark>Contato</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-[-0.03em] text-balance sm:text-6xl">
            Vamos construir a cena <span className="text-gradient">juntos</span>.
          </h2>
          <div className="mt-8">
            <AccentBar />
          </div>
          <p className="mt-8 max-w-md text-lg text-paper/65">
            Dúvidas sobre o curso, parcerias, palestras ou desafios para os estudantes.
          </p>
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink shadow-[0_8px_30px_-10px_rgb(245_179_1/0.6)] transition-colors hover:bg-[#ffc52e]"
          >
            {site.contact.email} <span aria-hidden>→</span>
          </a>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {canais.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center justify-between gap-4 rounded-2xl bg-white/[0.05] p-6 ring-1 ring-white/12 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/[0.08] hover:ring-sky-300/40"
              >
                <span>
                  <span className="block font-display text-lg font-semibold">{c.label}</span>
                  <span className="block text-sm text-paper/55">{c.desc}</span>
                </span>
                <span aria-hidden className="text-sky-300 transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </li>
          ))}
          <li className="sm:col-span-2">
            <p className="rounded-2xl p-6 text-sm text-paper/50 ring-1 ring-white/10">
              {site.contact.address} · Matrícula, calendário e documentação: consulte os canais
              oficiais da <InstitutionName className="font-semibold text-paper/80" />.
            </p>
          </li>
        </ul>
      </Container>
    </section>
  );
}
