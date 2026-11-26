import Link from "next/link";
import { contactHref, nav, site } from "@/config/site";
import { Container } from "./ui";
import { Logo } from "./logo";

export function Footer() {
  const social = Object.entries(site.social);
  return (
    <footer className="border-t border-white/10 bg-night text-paper/70">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            {site.tagline} Projetos, talentos e formação tecnológica do curso de {site.course} em{" "}
            {site.city}.
          </p>
          <p className="mt-6 text-xs text-paper/45">
            Feito por estudantes e professores de ADS.{" "}
            <a href={site.repo} className="underline decoration-gold underline-offset-4 hover:text-paper">
              Contribua no GitHub
            </a>
            .
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper">Navegue</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-1">
            {[...nav, { href: contactHref, label: "Contato" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper">Conecte-se</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-paper">
                {site.contact.email}
              </a>
            </li>
            {social.map(([name, href]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-paper">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-paper/40 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>{site.city}</p>
        </Container>
      </div>
    </footer>
  );
}
