# Jacobina.Tech — Tecnologia que transforma.

Identidade digital do curso de Análise e Desenvolvimento de Sistemas em Jacobina: divulgar projetos, conectar talentos e fortalecer a formação tecnológica na região.

## Stack e decisões

| Decisão | Por quê |
| --- | --- |
| **Next.js 16 (App Router) + export estático** (`output: "export"`) | Zero servidor para manter: hospeda em GitHub Pages, Netlify, S3 ou Firebase Hosting de graça. Se surgir necessidade de backend, basta remover o `output: "export"`. |
| **Conteúdo em Markdown no próprio repositório** (`content/`) | Alunos publicam por Pull Request: Git, code review e CI viram parte da formação. Sem CMS, sem banco, sem custo. |
| **Validação com Zod no build** (`src/lib/schemas.ts`) | Frontmatter errado quebra o CI com mensagem clara. O schema é o contrato do conteúdo. |
| **Camada de acesso isolada** (`src/lib/content.ts`) | Migrar para um CMS headless ou API no futuro muda só esse arquivo. |
| **Tailwind v4 + design tokens** (`src/app/globals.css`) | Identidade centralizada em `@theme`: navy + luz azul/violeta, dourado como acento de ação ("cidade do ouro"). |

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # valida o conteúdo e gera o site em out/
npx serve out    # pré-visualiza o build estático
```

## Marca e imagens de divulgação

Templates em `brand/` (HTML com as mesmas fontes e cores do site), renderizados pelo Chrome headless:

```bash
npm run brand   # gera src/app/opengraph-image.png, twitter-image.png e brand/out/avatar.png
```

| Arquivo | Uso |
| --- | --- |
| `src/app/opengraph-image.png` (1200×630) | Prévia de links (WhatsApp, LinkedIn, X) — o Next adiciona as meta tags |
| `brand/out/avatar.png` (1080×1080) | Foto de perfil do Instagram/LinkedIn (seguro para recorte circular) |

## Formato: landing + páginas de portfólio (híbrido)

| Rota | Conteúdo |
| --- | --- |
| `/` | Landing com seções-âncora: `#encontros`, `#projetos`, `#curso`, `#professores`, `#participar`, `#contato` |
| `/projetos/` e `/projetos/[slug]/` | Índice e página de cada projeto (URL para currículo/LinkedIn) |
| `/eventos/[slug]/` | Página de cada encontro (link de divulgação) |

O **blog** está fora do ar até haver ritmo de publicação: os posts continuam em `content/blog/` e a
camada `getPosts()` segue pronta. Qualquer seção da landing pode voltar a ser página quando crescer.

## Estrutura

```
content/                 # TODO o conteúdo editável (Markdown + frontmatter)
  projetos/  professores/  eventos/  blog/   (+ _modelo.md em cada pasta)
src/
  config/site.ts         # nome, contatos, redes, menu (âncoras), quadros editoriais
  lib/schemas.ts         # contratos do conteúdo (Zod)
  lib/content.ts         # leitura + validação + Markdown → HTML
  components/home/       # seções da landing (hero, encontros, projetos, curso, professores, participar, contato)
  components/            # UI compartilhada (header, footer, cards, hero-constellation, primitives)
  app/                   # rotas: /  /projetos  /projetos/[slug]  /eventos/[slug]
```

## Deploy (Firebase Hosting + GitHub Actions)

Projeto Firebase: `jacobinatech` · site: https://jacobina.tech (também em https://jacobinatech.web.app)

| Workflow | Quando | O que faz |
| --- | --- | --- |
| `auto-pr.yml` | 1º push de branch `feat/…`, `fix/…`, `ci/…` ou `doc/…` | **abre o PR** para a `main` e publica/comenta o primeiro preview |
| `ci.yml` | push em `feat/…`, `fix/…`, `ci/…`, `doc/…` e todo PR | checks `branch-name` (padrão do nome) e `build` (lint + build + validação do conteúdo), exigidos pelo ruleset |
| `firebase-hosting-pull-request.yml` | pushes seguintes em PRs do próprio repo | atualiza o **canal de preview** e comenta a URL (expira em 7 dias) |
| `firebase-hosting-merge.yml` | push na `main`, diário às 03:00 e manual | deploy em produção (`live`), environment `production` |
| `pr-guard.yml` | todo PR (versão da `main`) | alerta quando o PR altera workflows ou config de deploy |

> PRs abertos pelo Actions (via `GITHUB_TOKEN`) não disparam outros workflows — por isso o CI roda no
> push e o primeiro preview é feito pelo próprio `auto-pr.yml`. Requer em *Settings → Actions → General*:
> **"Allow GitHub Actions to create and approve pull requests"** (também liberado no nível da organização).

Requer o secret `FIREBASE_SERVICE_ACCOUNT_JACOBINATECH` nos environments `preview` e `production`, criado por
`firebase init hosting:github` (responda **não** quando ele oferecer criar os workflows — eles já existem).

### Segurança (alunos com permissão de escrita)

| Controle | Onde | Efeito |
| --- | --- | --- |
| Secret do Firebase **só em Environments** | repo → *Settings → Environments* | `production` restrito à `main`; `preview` exige aprovação do time `professores`. Nada em *Repository secrets*. |
| Build e deploy de preview em **jobs separados** | workflows | o código da branch roda sem secret; o deploy só publica o artefato, com `firebase.json` da `main` |
| `CODEOWNERS` + *Require review from Code Owners* | `.github/CODEOWNERS` + ruleset | só o time `professores` libera merge (aprovação do bot do Actions não conta) |
| `pr-guard.yml` (`pull_request_target`) | workflow | avisa no PR quando ele altera `.github/`, `firebase.json` ou `.firebaserc` — revise antes de aprovar o preview |
| Checks `branch-name` e `build` obrigatórios | ruleset | branch fora do padrão `feat/ fix/ ci/ doc/` ou build quebrado não mescla |

Deploy manual, se necessário: `npm run build && firebase deploy --only hosting`.

## Antes de publicar

- [ ] Substituir o **conteúdo de exemplo** em `content/` (projetos, professores, eventos e posts marcados como exemplo)
- [ ] Preencher os `TODO` em `src/config/site.ts` (e-mail, redes, repositório, domínio)
- [ ] Validar o texto de `src/components/home/curso.tsx` com a coordenação (dados oficiais do PPC)
- [ ] Foto real (autorizada) de estudantes para o hero: prop `photo` em `src/components/hero-constellation.tsx`
- [ ] **Alinhar com a coordenação e a comunicação da instituição** o uso de marca, imagens de estudantes e informações oficiais do curso
- [ ] Coletar autorização de uso de imagem/nome de estudantes e professores
- [ ] Configurar `NEXT_PUBLIC_SITE_URL` no ambiente de build (sitemap e Open Graph)

## Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md).
