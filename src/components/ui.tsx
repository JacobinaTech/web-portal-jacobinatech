import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`} {...props} />;
}

/** Selo curto acima de títulos (chip com ponto dourado). */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm ${
        dark ? "bg-white/5 text-paper/80 ring-1 ring-white/15 backdrop-blur" : "bg-ink/[0.04] text-ink/70 ring-1 ring-ink/10"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.03em] text-balance sm:text-5xl">{title}</h2>
        {description && (
          <p className={`mt-5 text-lg leading-relaxed text-pretty ${dark ? "text-paper/65" : "text-mute"}`}>{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/** Fundo escuro padrão (navy + iluminação azul/violeta). */
export function NightBackdrop() {
  return <div className="night-glow pointer-events-none absolute inset-0" aria-hidden />;
}

export function AccentBar() {
  return <div className="h-1 w-20 rounded-full bg-gradient-to-r from-sky-400 to-violet-400" aria-hidden />;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
  external?: boolean;
};

const variants = {
  primary: "bg-gold text-ink hover:bg-[#ffc52e] shadow-[0_8px_30px_-10px_rgb(245_179_1/0.6)]",
  ghost: "border border-current/25 hover:border-current/60",
  dark: "bg-ink text-paper hover:bg-ink-2",
};

export function Button({ href, children, variant = "primary", external }: ButtonProps) {
  const cls = `group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${variants[variant]}`;
  const arrow = (
    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  );
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {arrow}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-gold decoration-2 underline-offset-[6px] hover:decoration-ink"
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

export function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[0.7rem] font-medium ${
        dark ? "bg-white/10 text-paper/85" : "bg-ink/[0.06] text-ink/75"
      }`}
    >
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-night text-paper">
      <NightBackdrop />
      <Container className="relative pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="mt-7">
          <AccentBar />
        </div>
        {description && (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/70 text-pretty">{description}</p>
        )}
        {children}
      </Container>
    </section>
  );
}

export function Section({ className = "", ...props }: ComponentProps<"section">) {
  return <section className={`py-20 sm:py-28 ${className}`} {...props} />;
}

export function Avatar({ src, name, initials, size = "md" }: { src?: string; name: string; initials: string; size?: "md" | "lg" }) {
  const dim = size === "lg" ? "h-24 w-24 text-2xl" : "h-16 w-16 text-lg";
  if (src)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className={`${dim} rounded-2xl object-cover`} loading="lazy" />;
  return (
    <div
      aria-hidden
      className={`${dim} grid shrink-0 place-items-center rounded-2xl bg-ink font-display font-semibold text-gold`}
    >
      {initials}
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line p-10 text-center text-mute">{children}</div>
  );
}
