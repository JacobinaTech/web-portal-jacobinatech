---
titulo: AlimentaMais
resumo: App mobile que conecta doadores de alimentos a ONGs e iniciativas sustentáveis, com cadastro de doações, histórico e acompanhamento do impacto.
problema: Muito alimento em boas condições é desperdiçado enquanto ONGs e famílias têm dificuldade de encontrar doações — falta um canal simples que conecte quem quer doar a quem precisa receber.
tecnologias: [React Native, Expo, TypeScript, Firebase Auth, Firestore]
integrantes: [Luan Menezes, Isaac Almeida]
orientadores: [Prof. MSc. Welber]
periodo: "2025.2"
capa: /projetos/alimentamais/capa.webp
repositorio: https://github.com/JacobinaTech/mobile-alimenta-mais
destaque: true
status: pausado
---

## A solução

O **AlimentaMais** é um aplicativo mobile em **React Native com Expo** que aproxima doadores de alimentos de ONGs e iniciativas sustentáveis:

- **Doações** — o doador registra o alimento, a descrição (quantidade, validade, condições de conservação) e fotos.
- **Histórico** — cada usuário acompanha as doações que fez e consulta os detalhes de cada uma.
- **Impacto** — a tela inicial mostra o impacto da comunidade, como doações realizadas e famílias ajudadas.
- **Conta e perfil** — cadastro com validação de CPF, endereço preenchido a partir do CEP, senha forte e login por e-mail ou pela conta Google.

## Como funciona

- **App:** React Native + Expo, com roteamento por arquivos (Expo Router) e navegação por abas.
- **Autenticação:** Firebase Authentication (e-mail/senha e Google).
- **Dados:** coleção de doações no Cloud Firestore, vinculada ao usuário que doou.
- **Validações:** hooks próprios para CPF e CEP no cadastro.

## Próximos passos

Conectar as doações às ONGs receptoras — com agendamento de coleta e confirmação de entrega — e ampliar os indicadores de impacto.
