---
name: video-curto
description: >
  Cria roteiros de vídeo curto (Reels, TikTok, Shorts) a partir de um tema: gancho pros
  primeiros 3 segundos, texto em tela, cenas, narração e CTA. 3 formatos (dica, bastidores,
  história). Não gera o vídeo — entrega o roteiro pronto pra gravar. Use quando o usuário
  disser "reels", "tiktok", "vídeo curto", "roteiro de vídeo", "conteúdo em vídeo",
  "short", ou /video-curto.
version: "1.0.0"
model: "*"
requires: ["_memoria/preferencias.md", "identidade/design-guide.md"]
---

# /video-curto — Roteiros de Reels/TikTok

Skill de conteúdo em vídeo: tema → roteiro com gancho, texto em tela, cenas e CTA,
no ritmo que o formato exige (atenção nos primeiros 3 segundos).

## Dependências

- **Contexto:** `_memoria/empresa.md`, `_memoria/preferencias.md`
- **Identidade:** `identidade/design-guide.md` (cores/fonte do texto em tela)
- **Output:** `marketing/conteudo/video-<tema>-<YYYY-MM-DD>/roteiro.md`

## Workflow

### Passo 1 — Tema e formato

Perguntar o tema (ou tirar da estratégia). Oferecer os 3 formatos:

| Formato | Duração | Quando usar |
|---|---|---|
| **Dica rápida** | 15-30s | ensinar 1 coisa, gerar salvar/compartilhar |
| **Bastidores** | 30-45s | mostrar o processo, humanizar a marca |
| **História/depoimento** | 45-60s | prova social, conexão emocional |

Se o usuário não escolher, escolher o que melhor casa com o tema e explicar.

### Passo 2 — Roteiro

Para cada vídeo, entregar:

**GANCHO (0-3s)** — 3 opções:
- Pergunta que cutuca a dor
- Afirmação contraintuitiva ("todo mundo faz errado")
- Cena visual forte / resultado final

**TEXTO EM TELA (on-screen)** — frase por cena, curta (máx 6-8 palavras),
fonte/cores conforme design-guide. É o que passa com som mudo.

**CENAS (storyboard em texto):**
| # | Cena | O que aparece | Texto na tela | Narração (se houver) |
|---|---|---|---|---|
| 1 | ... | ... | ... | ... |

**CTA final (últimos 3s):** um só — seguir, comentar, WhatsApp, salvar.

### Passo 3 — Capa e legenda

- **Capa:** frase-título (máx 5 palavras) + cor de fundo conforme sequência do feed
- **Legenda:** hook + contexto + CTA + 5-10 hashtags (usar padrão de `legenda.md` do /carrossel)

### Passo 4 — Salvar

Salvar em `marketing/conteudo/video-<tema>-<YYYY-MM-DD>/roteiro.md`
(com ganchos, storyboard, capa e legenda).

## Regras

- Gancho obrigatório nos primeiros 3 segundos — sem introdução
- Texto em tela legível mesmo sem som (maioria vê mudo)
- Uma ideia por vídeo. Um CTA por vídeo
- Sem emoji decorativo no texto em tela (design-guide)
- Vídeos com rosto: pedir autorização/participação real — nunca gerar rosto por IA

## Quality gate — antes de declarar concluído

- [ ] Gancho nos 0-3s com 3 opções
- [ ] Storyboard completo: cena, texto na tela, narração
- [ ] Texto em tela ≤ 8 palavras por cena
- [ ] CTA único nos últimos 3s
- [ ] Capa + legenda + hashtags incluídas; salvo na pasta padrão
