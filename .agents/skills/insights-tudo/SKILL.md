---
name: insights-tudo
description: >
  Junta métricas de TODAS as plataformas num único painel: Instagram (insta-insights),
  YouTube (analytics), TikTok (stats), LinkedIn (impressions), Facebook/Threads — via MCPs
  conectados — e alimenta _memoria/kpi.md e o /weekly. Use quando o usuário disser
  "insights de tudo", "métricas de todas as redes", "painel unificado", "como está tudo",
  "resumo de todas as plataformas", ou /insights-tudo.
version: "1.0.0"
model: "*"
requires: ["mcps conectados (meta, youtube, tiktok, linkedin)", "_memoria/kpi.md"]
---

# /insights-tudo — Painel unificado de métricas

Skill de medição: uma leitura, todas as plataformas, direto pro KPI.

## Dependências

- **MCPs:** meta (IG/FB/Threads), youtube-uploader, tiktok (Composio/Seym0n), linkedin —
  via `/conectar-mcp`
- **Script:** `scripts/insta-insights.js` (para IG sem MCP)
- **KPI:** `_memoria/kpi.md`

## Workflow

### Passo 1 — Coletar por plataforma

| Plataforma | Fonte | Métricas |
|---|---|---|
| Instagram | insta-insights ou meta-mcp | alcance, impressões, engajamento, seguidores |
| Facebook | meta-mcp (pages insights) | alcance da página, engajamento |
| Threads | meta-mcp (threads insights) | impressões, seguidores |
| TikTok | Composio/Seym0n | views, likes, seguidores (7d) |
| YouTube | youtube-uploader (analytics) | views, watch time, inscritos |
| LinkedIn | linkedin-mcp | impressions dos posts |

Se alguma não estiver conectada: registrar "sem dado" (nunca inventar).

### Passo 2 — Montar o painel

```
## Painel unificado — DD/MM
| Plataforma | Alcance/Views | Engajamento | Seguidores | Δ vs anterior |
| Instagram  | 12.4k | 1.2k | 3.450 | ▲ 3% |
| TikTok     | 8.1k  | 640 | 1.120 | ▼ 2% |
| YouTube    | 3.2k  | 210 | 890  | ▲ 5% |
| LinkedIn   | 1.1k  | 45  | 210  | — |
| Facebook   | 2.4k  | 180 | 1.050 | ▲ 1% |
```

+ **Leitura executiva** (2-3 frases): o que cresce, o que cai, onde dobrar.

### Passo 3 — Alimentar KPI e weekly

- Atualizar `_memoria/kpi.md` (linhas por plataforma + totais)
- Salvar em `marketing/relatorios/insights-tudo-<data>.md` (frontmatter com período)
- Oferecer incorporar no `/weekly`

## Regras

- Nunca inventar métrica — "sem dado" é resposta válida
- Comparação com período anterior quando houver histórico
- Uma leitura executiva, não só números
- Plataforma nova conectada → adicionar linha no KPI

## Quality gate — antes de declarar concluído

- [ ] Todas as plataformas conectadas coletadas (ou "sem dado" explícito)
- [ ] Painel montado com leitura executiva
- [ ] KPI.md atualizado
- [ ] Relatório salvo em marketing/relatorios/ com frontmatter
- [ ] /weekly informado (se aplicável)
