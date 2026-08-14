---
name: agendar
description: >
  Monta e mantém o calendário de conteúdo (marketing/calendario/calendario.md): define
  frequência por canal, distribui temas da estratégia, marca datas importantes e status
  (planejado → pronto → publicado). Integra com /publicar-tema e /aprovar-post.
  Use quando o usuário disser "calendário de conteúdo", "agendar posts", "planejar conteúdo",
  "grade de posts", "o que publico essa semana", "calendário editorial", ou /agendar.
version: "1.0.0"
model: "*"
requires: ["marketing/seo/05-estrategia-conteudo.md", "marketing/calendario/calendario.md", "_memoria/estrategia.md"]
---

# /agendar — Calendário de conteúdo

Skill de planejamento: transforma frequência + temas + datas importantes num calendário
realista de 2-4 semanas, com status rastreável.

## Dependências

- **Temas:** `marketing/seo/05-estrategia-conteudo.md` (lista mestra do /seo) ou temas do usuário
- **Datas:** `_memoria/estrategia.md` (prazos, sazonalidade) + datas do negócio
- **Histórico:** `marketing/conteudo/` (não repetir temas recentes)
- **Arquivo:** `marketing/calendario/calendario.md` (criar com template se não existir)

## Workflow

### Passo 1 — Frequência realista

Perguntar (ou propor padrão e ajustar):
- Instagram: quantos posts/semana? (padrão: 2-3)
- Blog/SEO: quantos artigos/semana? (padrão: 1)
- LinkedIn: quantos/semana? (se fizer sentido)
- Vídeo (Reels/TikTok): quantos/semana?

**Regra de ouro:** melhor frequência menor mantida do que maior abandonada.

### Passo 2 — Coletar temas e datas

- Puxar da estratégia de conteúdo os temas prioritários não publicados
- Datas fixas do negócio: alta temporada, promoções, eventos locais, feriados
- Checar `marketing/conteudo/` pra não repetir o que já saiu

### Passo 3 — Montar o calendário

Preencher `marketing/calendario/calendario.md`:

```markdown
# Calendário de conteúdo

> Status: planejado → pronto → publicado. Atualizado por /agendar, /publicar-tema e /aprovar-post.

## Semana de DD/MM

| Data | Canal | Formato | Tema | Status |
|---|---|---|---|---|
| seg 18/08 | Instagram | carrossel | [tema] | planejado |
| qua 20/08 | Blog | artigo | [tema] | planejado |
| sex 22/08 | Reels | vídeo curto | [tema] | planejado |
```

Distribuição:
- Variar formatos (carrossel, post único, vídeo, artigo) — nunca 2 iguais seguidos
- Blog primeiro, depois o carrossel derivado (peça-mãe, como no /publicar-tema)
- Deixar 1-2 "slots livres" por semana pra conteúdo de oportunidade
- Alinhar posts com datas importantes do negócio

### Passo 4 — Status

- **planejado** → quando o conteúdo for criado (via /publicar-tema, /carrossel...), virar **pronto**
- **pronto** → quando publicado (via /aprovar-post ou manual), virar **publicado**
- Rodar semanalmente pra virar a página das semanas passadas

## Regras

- Frequência realista combinada com o usuário — não lotar o calendário
- Nunca 2 posts do mesmo formato em sequência
- Datas do negócio (sazonalidade, promoções) têm prioridade sobre temas avulsos
- Não repetir tema já publicado nas últimas 3 semanas (checar marketing/conteudo/)
- Manter 1-2 slots livres por semana

## Quality gate — antes de declarar concluído

- [ ] Calendário cobre 2-4 semanas com data, canal, formato, tema e status
- [ ] Frequência combinada com o usuário (realista)
- [ ] Formatos variados, sem repetição em sequência
- [ ] Datas importantes do negócio incluídas
- [ ] Temas não repetem os das últimas 3 semanas
