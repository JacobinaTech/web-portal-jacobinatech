import Link from "next/link";
import { Container } from "@/components/ui";
import { contactHref } from "@/config/site";

/*
 * Logo abaixo do hero: chamadas permanentes (Oportunidades e Desafios).
 * O próximo encontro, quando existe, aparece como aviso discreto dentro do hero.
 */
export function Chamadas() {
  return (
    <section id="oportunidades" className="relative z-10 -mt-20 pb-24 sm:-mt-24 sm:pb-32">
      <Container>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="flex flex-col rounded-3xl bg-white p-8 ring-1 ring-line">
            <p className="text-sm text-mute">Oportunidades</p>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight">Vaga, estágio ou freela na região?</h2>
            <p className="mt-2 flex-1 text-mute">Divulgue para quem está se formando aqui.</p>
            <Link href={contactHref} className="mt-6 inline-flex items-center gap-1.5 font-semibold text-ink hover:text-indigo-600">
              Divulgar oportunidade <span aria-hidden>→</span>
            </Link>
          </article>

          <article className="flex flex-col rounded-3xl bg-gold p-8 text-ink">
            <p className="text-sm text-ink/60">Desafios</p>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight">
              Um problema da cidade que a tecnologia pode resolver?
            </h2>
            <p className="mt-2 flex-1 text-ink/70">Ele pode virar tema de projeto ou hackathon.</p>
            <Link href={contactHref} className="mt-6 inline-flex items-center gap-1.5 font-semibold underline decoration-2 underline-offset-4">
              Enviar desafio <span aria-hidden>→</span>
            </Link>
          </article>
        </div>
      </Container>
    </section>
  );
}
