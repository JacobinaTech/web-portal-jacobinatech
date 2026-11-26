import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { z } from "zod";
import {
  eventoSchema,
  postSchema,
  professorSchema,
  projetoSchema,
  type Evento,
  type Post,
  type Professor,
  type Projeto,
} from "./schemas";

/**
 * Camada de acesso ao conteúdo (Markdown + frontmatter em /content).
 * Roda apenas no build (Server Components). Se no futuro o conteúdo migrar para
 * um CMS/API, só este arquivo muda — as páginas consomem a mesma interface.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Entry<T> = T & { slug: string; html: string };

function loadCollection<S extends z.ZodType>(dir: string, schema: S): Entry<z.infer<S>>[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];

  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        throw new Error(
          `\n[conteúdo inválido] content/${dir}/${file}\n${z.prettifyError(parsed.error)}\n`,
        );
      }
      return {
        ...(parsed.data as z.infer<S> & object),
        slug: file.replace(/\.md$/, ""),
        html: marked.parse(content, { async: false }),
      };
    });
}

// Cache em memória por processo de build — evita reler o disco a cada página.
const cache = new Map<string, unknown>();
function memo<T>(key: string, fn: () => T): T {
  if (!cache.has(key)) cache.set(key, fn());
  return cache.get(key) as T;
}

const byDateDesc = (a: { data: Date }, b: { data: Date }) => b.data.getTime() - a.data.getTime();

export const getProjetos = () =>
  memo("projetos", () =>
    loadCollection("projetos", projetoSchema).sort(
      (a, b) => Number(b.destaque) - Number(a.destaque) || b.periodo.localeCompare(a.periodo),
    ),
  ) as Entry<Projeto>[];

export const getProjeto = (slug: string) => getProjetos().find((p) => p.slug === slug);

export const getProfessores = () =>
  memo("professores", () =>
    loadCollection("professores", professorSchema).sort(
      (a, b) => a.ordem - b.ordem || a.nome.localeCompare(b.nome),
    ),
  ) as Entry<Professor>[];

export const getEventos = () =>
  memo("eventos", () => loadCollection("eventos", eventoSchema).sort(byDateDesc)) as Entry<Evento>[];

export const getEvento = (slug: string) => getEventos().find((e) => e.slug === slug);

/** Separa próximos (ordem cronológica) e realizados (mais recentes primeiro). */
export function splitEventos(now = new Date()) {
  const today = new Date(now.toDateString());
  const all = getEventos();
  return {
    proximos: all.filter((e) => e.data >= today).reverse(),
    realizados: all.filter((e) => e.data < today),
  };
}

export const getPosts = () =>
  memo("posts", () =>
    loadCollection("blog", postSchema)
      .filter((p) => !p.rascunho || process.env.NODE_ENV === "development")
      .sort(byDateDesc),
  ) as Entry<Post>[];

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export function getTecnologias() {
  const count = new Map<string, number>();
  for (const p of getProjetos())
    for (const t of p.tecnologias) count.set(t, (count.get(t) ?? 0) + 1);
  return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
}
