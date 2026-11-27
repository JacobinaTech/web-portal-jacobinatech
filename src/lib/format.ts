// Datas do conteúdo são "só data" (ex.: 2026-12-12) e o parser as lê como meia-noite UTC.
// Formatar em UTC evita exibir o dia anterior em fusos negativos (Bahia = UTC−3).
const tz = "UTC";

export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: tz }).format(d);

export const formatMesAno = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: tz }).format(d);

/** Data do evento por extenso: dia exato ou "previsto para <mês> de <ano>". */
export const formatEventoData = (e: { data: Date; dataPrevista?: boolean }) =>
  e.dataPrevista ? `Previsto para ${formatMesAno(e.data)}` : formatDate(e.data);

/** Selo de data: dia + mês, ou mês + ano quando a data é prevista. */
export const formatEventoSelo = (e: { data: Date; dataPrevista?: boolean }) => {
  const mes = new Intl.DateTimeFormat("pt-BR", { month: "short", timeZone: tz }).format(e.data).replace(".", "");
  return e.dataPrevista
    ? { topo: mes, base: String(e.data.getUTCFullYear()) }
    : { topo: new Intl.DateTimeFormat("pt-BR", { day: "2-digit", timeZone: tz }).format(e.data), base: mes };
};

export const formatDay = (d: Date) => ({
  day: new Intl.DateTimeFormat("pt-BR", { day: "2-digit", timeZone: tz }).format(d),
  month: new Intl.DateTimeFormat("pt-BR", { month: "short", timeZone: tz }).format(d).replace(".", ""),
});

export const initials = (name: string) =>
  name
    // Remove títulos em sequência (ex.: "Prof. MSc. Welber" → "Welber")
    .replace(/^((Prof|Profa|Dr|Dra|Me|Ma|MSc|Msc|PhD|Esp)\.?\s+)+/gi, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
