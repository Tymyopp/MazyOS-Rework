---
name: analytics
description: >
  Analisa dados de tráfego do site (GA4, Search Console, ou exports CSV) e devolve
  leitura executiva: fontes, páginas top, queries, CTR/posição, tendências e recomendações.
  Complementa o /relatorio-ads (que é mídia paga; este é orgânico). Use quando o usuário
  disser "analytics", "dados do site", "google analytics", "search console",
  "tráfego orgânico", "quais palavras trazem visita", ou /analytics.
version: "1.0.0"
model: "*"
requires: ["arquivo csv/xlsx de ga4 ou search-console"]
---

# /analytics — Leitura de tráfego orgânico

Skill de medição: transforma exports do GA4/Search Console em leitura que o dono
entende e usa.

## Dependências

- **Contexto:** `_memoria/empresa.md`, `_memoria/estrategia.md`
- **Inputs:** CSVs do Google Analytics 4 e/ou Google Search Console (arrastados em `dados/`)
- **Histórico:** `marketing/seo/analytics-*.md` anteriores (pra comparar)
- **Output:** `marketing/seo/analytics-<YYYY-MM-DD>.md`

## Workflow

### Passo 1 — Coletar os dados

Pedir (ou usar os arquivos em `dados/`):
- **GA4:** sessões, usuários, fontes, páginas top, engajamento (export CSV)
- **Search Console:** queries, impressões, cliques, CTR, posição média (export CSV)
- Período: mês atual + anterior (pra comparar)

Se faltar alguma coluna crítica, avisar e seguir com o que tem.

### Passo 2 — Analisar

**Tráfego:**
- Evolução: sessões vs período anterior (▲/▼ %)
- Fontes: orgânico, direto, social, referral — o que cresce/cai

**Search Console (o que as pessoas buscam):**
- Top queries por cliques e por impressões
- Oportunidades: posição 5-15 com CTR baixo (potencial de ganho)
- Queries com muitas impressões e 0 cliques (por quê? title fraco?)
- Queries que convertem (cruzar com páginas de destino se possível)

**Páginas:**
- Top páginas por sessão/engajamento
- Páginas de entrada/saída com problema

### Passo 3 — Insights e recomendações

Formato:
```
## O que os dados mostram
[2-3 parágrafos]

## O que está funcionando
- ...

## O que merece atenção
- ...

## 3-5 recomendações
1. [ação concreta — ex: reescrever title da página X que tem 100 impressões e 0 cliques]
```

### Passo 4 — Salvar

Salvar em `marketing/seo/analytics-<YYYY-MM-DD>.md` com frontmatter:
```yaml
---
periodo_inicio:
periodo_fim:
sessoes:
fontes: [organico, direto, social]
---
```

## Regras

- Nunca inventar números — se o export estiver truncado, dizer "dados incompletos"
- Comparação sempre: número solto não significa nada sem o período anterior
- Traduzir métricas pro dono (CTR = % de quem viu e clicou)
- Não confundir com /relatorio-ads (pago): este é o orgânico

## Quality gate — antes de declarar concluído

- [ ] Números conferem com o export de origem (somar antes de reportar)
- [ ] Comparação com período anterior feita (ou sinalizada como baseline)
- [ ] Oportunidades de Search Console extraídas (posição 5-15, CTR baixo)
- [ ] 3-5 recomendações concretas com página/query nomeada
- [ ] Salvo em marketing/seo/ com frontmatter
