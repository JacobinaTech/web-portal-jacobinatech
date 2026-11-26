# Como contribuir com o Jacobina.Tech

Este site é um **projeto acadêmico permanente**: é desenvolvido e mantido pelos estudantes de ADS, com orientação dos professores. Toda mudança entra por **Pull Request**.

## Fluxo

Há dois caminhos:

- **Alunos das turmas** (membros da organização, com permissão de escrita): crie a branch **no próprio repositório**. O PR abre sozinho e ganha preview (liberado por um professor).
- **Comunidade** (ex-alunos, visitantes): faça um **fork** e abra o PR pelo GitHub. O CI valida normalmente; não há preview para forks.

Em ambos, o merge na `main` exige os checks `branch-name` e `build` verdes e a aprovação do time `professores`.

1. Faça um fork (ou crie uma branch, se tiver acesso) com um nome no padrão:
   - `feat/<descricao>` — novidade (projeto, evento, funcionalidade). Ex.: `git checkout -b feat/projeto-agenda-saude`
   - `fix/<descricao>` — correção. Ex.: `fix/link-quebrado-contato`
   - `ci/<descricao>` — automação/workflows. Ex.: `ci/cache-build`
   - `doc/<descricao>` — documentação (README, CONTRIBUTING, guias). Ex.: `doc/guia-primeiro-pr`
   - `teste/<descricao>` — testes automatizados ou experimentos. Ex.: `teste/validacao-schemas`

   Use minúsculas, números e hífens. **Branches fora desse padrão não abrem PR automático e não podem ser mescladas** (o check `branch-name` falha).
2. Rode localmente: `npm install && npm run dev` → http://localhost:3000
3. Faça a alteração e confira que `npm run build` passa
4. Faça o push. Em branches do próprio repositório o PR é aberto automaticamente; em forks, abra o PR pelo GitHub. O CI valida e um(a) professor(a) revisa.

## Publicar um projeto (o caso mais comum)

1. Copie `content/projetos/_modelo.md` para `content/projetos/<nome-do-projeto>.md`
   - O nome do arquivo vira a URL: `agenda-saude.md` → `/projetos/agenda-saude/`
   - Use minúsculas e hífens, sem acentos
2. Preencha o frontmatter (o bloco entre `---`). Campos obrigatórios: `titulo`, `resumo`, `problema`, `tecnologias`, `integrantes`, `periodo`
3. Imagens vão em `public/projetos/<nome-do-projeto>/` e são referenciadas como `/projetos/<nome-do-projeto>/capa.png`
4. Escreva o corpo em Markdown: solução, como funciona, aprendizados

Se algum campo estiver errado, o build falha mostrando o arquivo e o campo exato:

```
[conteúdo inválido] content/projetos/meu-projeto.md
✖ Use o formato AAAA.S, ex.: 2026.1
  → at periodo
```

Os outros tipos de conteúdo seguem a mesma ideia — veja os `_modelo.md` em cada pasta:

| Conteúdo   | Pasta                   | Schema                     |
| ---------- | ----------------------- | -------------------------- |
| Projetos   | `content/projetos/`     | `projetoSchema`            |
| Professores| `content/professores/`  | `professorSchema`          |
| Eventos    | `content/eventos/`      | `eventoSchema`             |
| Blog       | `content/blog/`         | `postSchema` (campo `quadro`) — fora do ar por enquanto |

Arquivos que começam com `_` são ignorados.

## Quem faz o quê

| Trilha                 | Exemplos de contribuição                                         |
| ---------------------- | ---------------------------------------------------------------- |
| Programação            | Novas páginas, filtros de projetos, busca, acessibilidade        |
| Banco de dados         | Evolução dos schemas de conteúdo, migração futura para CMS/API   |
| Engenharia de Software | Documentação, testes, revisão de PRs, ADRs                        |
| UX/UI                  | Identidade visual, componentes, pesquisa com usuários             |

Issues marcadas com `good first issue` são um bom ponto de partida.

## Regras de conteúdo

- **Autorização:** só publique nome, foto ou trabalho de alguém com autorização da pessoa.
- **Marca e informações oficiais:** dados oficiais do curso (matriz, duração, ingresso) só com validação da coordenação.
- **Código:** link para repositório apenas se ele for público e não contiver segredos.
