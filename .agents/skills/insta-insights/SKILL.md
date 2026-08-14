---
name: insta-insights
description: >
  Puxa métricas de engajamento do Instagram (alcance, impressões, perfil, contas engajadas,
  seguidores, posts recentes) via Graph API e devolve leitura executiva em PT-BR, alimentando
  o /weekly e o painel KPI. Use quando o usuário disser "insights do instagram", "como foi o
  alcance", "métricas do insta", "quantos seguidores ganhei", "dados do instagram",
  "performance do insta", "engajamento da semana", ou /insta-insights.
version: "1.0.0"
model: "*"
requires: ["insta-conectar (token em .local/insta-auth.json)", "node 20+"]
---

# /insta-insights — Métricas do Instagram

Skill de medição: transforma os dados da Graph API numa leitura que o dono entende
e que alimenta a revisão semanal (`/weekly`) e o painel `_memoria/kpi.md`.

## Dependências

- **Conexão:** conta conectada via `/conectar-instagram` (token em `.local/insta-auth.json`)
  ou `.env` (`META_PAGE_ACCESS_TOKEN` + `META_IG_USER_ID`)
- **Script:** `scripts/insta-insights.js` (fetch nativo, auto-renovação do token)
- **Output:** `marketing/relatorios/insta-insights-<YYYY-MM-DD>.md` + resumo no chat

## Workflow

### Passo 1 — Pré-checagem

- Verificar conexão: `node --env-file=.env scripts/insta-insights.js` (sem token, ele avisa)
- Se não conectado → orientar `/conectar-instagram` e parar

### Passo 2 — Puxar os dados

```bash
node --env-file=.env scripts/insta-insights.js resumo 7      # alcance/impressões/perfil/engajamento (7 dias)
node --env-file=.env scripts/insta-insights.js posts 10      # últimos 10 posts com curtidas/comentários
node --env-file=.env scripts/insta-insights.js seguir        # tendência de seguidores (30 dias)
```

Rodar `resumo` (padrão 7 dias; perguntar se quer outro período) + `posts 5`.

### Passo 3 — Análise executiva

Entregar no chat:

```
## Instagram — insights (últimos 7 dias)

**Alcance:** X (média Y/dia)  ▲/▼
**Impressões:** X  ▲/▼
**Perfil visto:** X vezes
**Contas engajadas:** X

**Posts da semana:**
• [data] carrossel "…" — ❤ N · 💬 N  ← melhor
• ...

**Leitura:** [2-3 frases — o que funciona, o que caiu]
**Recomendações:** [1-3 ações concretas — repetir formato X, mudar horário, chamada pra ação...]
```

- Comparar com o período anterior quando houver histórico (`marketing/relatorios/insta-insights-*.md`)
- Não inventar números — usar só o que a API retornou

### Passo 4 — Alimentar KPI e weekly

- Atualizar `_memoria/kpi.md` (linhas "Alcance IG" / "Seguidores IG" se existirem — ou
  sugerir adicionar se o Instagram for canal central)
- Salvar relatório em `marketing/relatorios/insta-insights-<YYYY-MM-DD>.md` com frontmatter:

```yaml
---
periodo_inicio:
periodo_fim:
alcance:
impressoes:
perfil_views:
engajadas:
seguidores:
---
```

- Se o usuário rodou `/weekly`, oferecer incorporar este relatório

## Regras

- Nunca inventar métrica — o que a API não retornar aparece como "sem dados"
- Comparação sempre que houver histórico; sem histórico = baseline
- Linguagem do dono (traduzir: alcance = pessoas que viram, impressões = vezes que apareceu)
- Insights de engajamento (curtidas, comentários) são da conta própria — não prometer dados de terceiros

## Quality gate — antes de declarar concluído

- [ ] Conexão verificada (token válido ou orientação para reconectar)
- [ ] `resumo` + `posts` rodados; dados reais da API
- [ ] Análise com leitura e recomendações (não só números)
- [ ] KPI.md atualizado (ou sugestão de linha nova)
- [ ] Relatório salvo em marketing/relatorios/ com frontmatter
