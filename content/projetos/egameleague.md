---
titulo: eGameLeague
resumo: Sistema desktop para organizar campeonatos de eSports — times, torneios, chaveamento, resultados, rankings e estatísticas — desenvolvido por cinco squads.
problema: Campeonatos de eSports amadores e universitários costumam ser organizados em planilhas e grupos de mensagem, o que torna inscrições, chaveamento, resultados e rankings trabalhosos e sujeitos a erros.
tecnologias: [Java, JavaFX, PostgreSQL, JDBC]
integrantes: [Carla Matos, Carlos Brunno, Lucca Nascimento, "@DalmyAlves", "@predo505", "@BrunoSantos-S", "@matheushenrique657"]
orientadores: [Prof. MSc. Welber]
periodo: "2025.1"
disciplina: Programação de Sistemas Computacionais · Sistemas Computacionais e Segurança
capa: /projetos/egameleague/capa.webp
repositorio: https://github.com/JacobinaTech/web-egame-league
destaque: true
status: concluido
---

## A solução

O **eGameLeague** é um sistema de gestão de campeonatos de eSports — FIFA, CS:GO, LoL, Valorant e outros — com interface gráfica em **JavaFX** e dados em **PostgreSQL**. Ele permite:

- Cadastro de times e jogadores, com login e permissões (administrador e jogador).
- Criação e gerenciamento de torneios: solo, duo ou squad; eliminação simples, fase de grupos ou pontos corridos.
- Geração automática de tabelas e confrontos, com registro de resultados e atualização da classificação.
- Rankings e estatísticas de desempenho (vitórias, derrotas, KD ratio), com exportação de relatórios.

## Como foi construído

O projeto foi dividido em **cinco squads**, cada um responsável por um módulo integrado aos demais:

| Squad | Módulo |
| --- | --- |
| 1 | Autenticação e gestão de usuários |
| 2 | Cadastro e gerenciamento de torneios |
| 3 | Tabelas e partidas |
| 4 | Ranking e estatísticas |
| 5 | Interface e experiência do usuário |

O time trabalhou com **GitFlow** automatizado no GitHub: branches `feature/*` abrindo Pull Requests para a `develop`, integração semanal entre os squads, branch de `release` com versionamento semântico automático e fluxo de `hotfix`.

## Aprendizados

Desenvolvimento colaborativo em escala de turma: dividir um sistema em módulos com contratos claros, integrar o trabalho de vários squads toda semana e aplicar orientação a objetos, banco de dados relacional e interfaces gráficas num produto completo.
