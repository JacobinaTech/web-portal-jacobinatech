/**
 * Configuração central do site. Ajuste aqui links, contatos e redes sociais
 * — nenhum componente deve ter esses valores "chumbados".
 *
 * ATENÇÃO: antes de publicar como canal institucional, validar com a coordenação
 * e a comunicação da instituição o uso de marca, imagens de estudantes e dados oficiais do curso.
 */
export const site = {
  name: "Jacobina.Tech",
  tagline: "Tecnologia que transforma.",
  description:
    "Identidade digital do curso de Análise e Desenvolvimento de Sistemas em Jacobina: projetos, talentos e formação tecnológica na região.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jacobina.tech",
  course: "Análise e Desenvolvimento de Sistemas",
  city: "Jacobina – BA",
  contact: {
    email: "contato@jacobina.tech", // TODO: confirmar e-mail oficial
    address: "Jacobina – BA", // TODO: endereço oficial do campus
  },
  social: {
    instagram: "https://instagram.com/", // TODO
    linkedin: "https://linkedin.com/", // TODO
    github: "https://github.com/", // TODO: organização do curso no GitHub
    youtube: "https://youtube.com/", // TODO
  },
  repo: "https://github.com/wellmsan/jacobinatech", // usado em "Contribuir" e "Sugerir correção"
} as const;

/**
 * Formato híbrido: a home é uma landing com seções (âncoras) e só projetos/eventos têm páginas
 * próprias. Quando uma seção crescer, ela pode voltar a ser página sem mudar o modelo de conteúdo.
 */
export const nav = [
  { href: "/#encontros", label: "Encontros" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#curso", label: "O curso" },
  { href: "/#professores", label: "Professores" },
  { href: "/#participar", label: "Participar" },
] as const;

export const contactHref = "/#contato";

/** Quadros editoriais fixos — usados como categoria dos posts do blog. */
export const quadros = {
  "dev-da-semana": { label: "Dev da Semana", desc: "Apresentação de um estudante e seus projetos" },
  "projeto-em-destaque": { label: "Projeto em Destaque", desc: "Soluções desenvolvidas pelos alunos" },
  "minuto-tech": { label: "Minuto Tech", desc: "Curiosidades e tendências tecnológicas" },
  "professor-responde": { label: "Professor Responde", desc: "Dicas e explicações dos professores" },
  "ads-na-pratica": { label: "ADS na Prática", desc: "Bastidores das atividades e laboratórios" },
  "carreira-em-ti": { label: "Carreira em TI", desc: "Profissões, salários, certificações e mercado" },
  "jacobina-tech": { label: "Jacobina Tech", desc: "Tecnologia e inovação na região" },
} as const;

export type QuadroId = keyof typeof quadros;
export const quadroIds = Object.keys(quadros) as [QuadroId, ...QuadroId[]];

export const tiposEvento = {
  palestra: "Palestra",
  workshop: "Workshop",
  hackathon: "Hackathon",
  "visita-tecnica": "Visita técnica",
  "ads-experience": "ADS Experience",
} as const;

export type TipoEvento = keyof typeof tiposEvento;
export const tipoEventoIds = Object.keys(tiposEvento) as [TipoEvento, ...TipoEvento[]];
