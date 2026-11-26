"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contactHref, nav } from "@/config/site";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  // Guarda em qual rota o menu foi aberto: ao trocar de página ele fecha sozinho.
  // Âncoras na mesma página não mudam a rota, então os links também fecham o menu no clique.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const close = () => setOpenAt(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Só "Projetos" tem página própria além das âncoras.
  const isActive = (href: string) => href === "/#projetos" && pathname.startsWith("/projetos");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-night/85 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link href="/" aria-label="Jacobina.Tech — início" onClick={close}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href) ? "text-gold" : "text-paper/75 hover:text-paper"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            className="ml-3 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-[#ffc52e]"
          >
            Contato
          </Link>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-paper lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpenAt(open ? null : pathname)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Principal (mobile)" className="border-t border-white/10 lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {[...nav, { href: contactHref, label: "Contato" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-lg px-2 py-3 text-base font-medium ${
                    isActive(item.href) ? "text-gold" : "text-paper/85"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
