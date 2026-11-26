import { Button, Container, NightBackdrop, SectionHeader } from "@/components/ui";
import { contactHref } from "@/config/site";

/*
 * TODO (coordenação): os eixos abaixo são uma visão geral. Duração, modalidade, turno,
 * matriz curricular e forma de ingresso só devem ser publicados com dados oficiais do PPC.
 */
const eixos = [
  { title: "Desenvolvimento", items: ["Lógica e algoritmos", "Orientação a objetos", "Web e mobile"] },
  { title: "Dados", items: ["Modelagem", "Bancos relacionais e NoSQL", "SQL e análise"] },
  { title: "Engenharia de software", items: ["Requisitos e arquitetura", "Qualidade e testes", "Métodos ágeis"] },
  { title: "Infra e operação", items: ["Redes e sistemas", "Cloud e DevOps", "Segurança"] },
];

const diferenciais = [
  ["Projeto desde o início", "Problemas reais da região viram projetos — não só exercícios."],
  ["Fluxo de mercado", "Git, Pull Requests, code review e CI fazem parte da rotina."],
  ["Portfólio público", "Cada projeto ganha página própria para currículo e LinkedIn."],
];

export function Curso() {
  return (
    <section id="curso" className="relative overflow-hidden bg-night py-24 text-paper sm:py-32">
      <NightBackdrop />
      <Container className="relative">
        <SectionHeader
          dark
          eyebrow="O curso"
          title={
            <>
              Análise e <span className="text-gradient">Desenvolvimento de Sistemas</span>
            </>
          }
          description="Formação prática para projetar, construir e manter software — com projetos reais e conexão com empresas da região."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <ul className="space-y-6">
            {diferenciais.map(([t, d]) => (
              <li key={t} className="flex gap-4">
                <span className="mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-xs text-night" aria-hidden>
                  ✓
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{t}</h3>
                  <p className="mt-1 text-paper/60">{d}</p>
                </div>
              </li>
            ))}
            <li className="pt-4">
              <Button href={contactHref}>Como ingressar</Button>
            </li>
          </ul>

          <div className="grid gap-4 sm:grid-cols-2">
            {eixos.map((e) => (
              <div
                key={e.title}
                className="rounded-2xl bg-white/[0.05] p-6 shadow-[0_0_40px_-16px_rgb(129_140_248/0.6)] ring-1 ring-white/12 backdrop-blur"
              >
                <h3 className="font-display font-semibold">{e.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-paper/65">
                  {e.items.map((i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
