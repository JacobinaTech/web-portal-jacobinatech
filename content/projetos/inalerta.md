---
titulo: InAlerta
resumo: API que monitora focos de queimada detectados por satélite e usa IA generativa para produzir análises de risco de incêndio em português.
problema: O INPE publica focos de queimada a cada 10 minutos, mas em arquivos CSV brutos e sem interpretação — o que dificulta transformar a detecção por satélite em alerta e ação rápida.
tecnologias: [Java 21, Spring Boot, Firebase Firestore, Gemini (IA), API do INPE]
integrantes: [Lucca Nascimento, Juliana Bastos Ghisi Santana, Ian Gabriel Guimarães de Almeida]
orientadores: [Prof. Me. Welber Macedo]
periodo: "2025.2"
capa: /projetos/inalerta/capa.webp
repositorio: https://github.com/JacobinaTech/api-in-alerta
destaque: true
status: pausado
---

## A solução

O InAlerta é uma API em **Spring Boot** que acompanha, de forma contínua, os focos de queimada detectados por satélite e transforma esses dados em informação útil:

- **Coleta automática** — a cada 10 minutos, um job agendado baixa os arquivos de focos publicados pelo INPE.
- **Sem lacunas** — um mecanismo de *catch-up* processa em sequência os arquivos que ainda não foram lidos, evitando perder focos ou gravá-los em duplicidade.
- **Análise com IA** — os focos recentes são enviados ao **Gemini 2.5 Flash**, que gera uma análise de risco de incêndio curta e direta, em português.
- **Consulta** — os focos mais recentes ficam disponíveis em `GET /queimadas/recentes`.

## Como funciona

```text
INPE (CSV a cada 10 min) → AlertaService (catch-up) → Firestore
                                                 ↓
                         AnaliseIncendioService → Gemini → análise de risco
                                                 ↓
                                  API REST: /queimadas/recentes
```

- **Dados:** focos de queimada do INPE (Programa Queimadas), armazenados no **Firebase Firestore**.
- **Agendamento:** `@Scheduled` do Spring para coleta e análise periódicas.
- **IA:** integração com a API do Gemini via `RestTemplate`, com prompt especializado em análise de risco de incêndio florestal.

## Aprendizados

Consumir dados públicos de forma resiliente — lidar com arquivos ausentes, falhas temporárias e reprocessamento sem duplicar registros — e integrar um modelo de IA generativa a um fluxo de dados real.
