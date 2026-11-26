import { z } from "zod";
import { quadroIds, tipoEventoIds } from "@/config/site";

/**
 * Contratos do conteúdo. Todo arquivo em /content é validado no build:
 * frontmatter inválido quebra o `npm run build` (e o CI) com a mensagem do campo exato.
 */

const url = z.url();
const date = z.coerce.date();
const nonEmpty = z.string().trim().min(1);

export const projetoSchema = z.object({
  titulo: nonEmpty,
  resumo: nonEmpty.max(200, "Resumo deve ter no máximo 200 caracteres"),
  problema: nonEmpty,
  tecnologias: z.array(nonEmpty).min(1),
  integrantes: z.array(nonEmpty).min(1),
  orientadores: z.array(nonEmpty).default([]),
  periodo: z.string().regex(/^\d{4}\.[12]$/, "Use o formato AAAA.S, ex.: 2026.1"),
  disciplina: z.string().optional(),
  capa: z.string().optional(), // caminho em /public, ex.: /projetos/agenda-saude.png
  imagens: z.array(z.string()).default([]),
  repositorio: url.optional(),
  demo: url.optional(),
  destaque: z.boolean().default(false),
  status: z.enum(["em-andamento", "concluido", "em-producao"]).default("concluido"),
});

export const professorSchema = z.object({
  nome: nonEmpty,
  titulacao: nonEmpty,
  areas: z.array(nonEmpty).min(1),
  disciplinas: z.array(nonEmpty).default([]),
  foto: z.string().optional(),
  lattes: url.optional(),
  linkedin: url.optional(),
  github: url.optional(),
  ordem: z.number().default(100),
});

export const eventoSchema = z.object({
  titulo: nonEmpty,
  tipo: z.enum(tipoEventoIds),
  data: date,
  local: nonEmpty,
  resumo: nonEmpty,
  inscricao: url.optional(),
});

export const postSchema = z.object({
  titulo: nonEmpty,
  data: date,
  autor: nonEmpty,
  quadro: z.enum(quadroIds),
  resumo: nonEmpty,
  rascunho: z.boolean().default(false),
});

export type Projeto = z.infer<typeof projetoSchema>;
export type Professor = z.infer<typeof professorSchema>;
export type Evento = z.infer<typeof eventoSchema>;
export type Post = z.infer<typeof postSchema>;
