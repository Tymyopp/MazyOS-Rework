---
name: weekly
description: >
  Revisão semanal (operating review): junta tarefas concluídas, posts publicados, resultados
  de ads, analytics e clientes novos; compara com a semana anterior; atualiza o painel KPI;
  registra vereditos de experimentos e define as ações da próxima semana. Use quando o usuário
  disser "revisão semanal", "relatório da semana", "como foi a semana", "operating review",
  "fechar a semana", "balanço da semana", ou /weekly.
version: "1.0.0"
model: "*"
requires: ["_memoria/tarefas.md", "_memoria/kpi.md", "_memoria/experimentos.md", "marketing/campanhas/relatorios/"]
---

# /weekly — Revisão semanal

Skill de cadência: o fechamento da semana. O que foi feito, o que os números dizem,
o que ajustar — e o painel KPI atualizado pra semana seguinte.

## Dependências

- **Tarefas:** `_memoria/tarefas.md` (concluídas e abertas)
- **Métricas:** `_memoria/kpi.md` (painel — atualizado aqui)
- **Ads:** último relatório em `marketing/campanhas/relatorios/` (gerado por /relatorio-ads)
- **Tráfego:** `marketing/seo/analytics-*.md` se existir (gerado por /analytics)
- **Instagram:** `marketing/relatorios/insta-insights-*.md` se existir (gerado por /insta-insights)
- **Clientes:** `_memoria/clientes.md` (novos clientes da semana)
- **Conteúdo:** pastas em `marketing/conteudo/` com data da semana
- **Testes:** `_memoria/experimentos.md`
- **Output:** `marketing/relatorios/weekly-<YYYY-MM-DD>.md`

## Workflow

### Passo 1 — Coletar a semana

- Tarefas concluídas desde a última revisão (checar `tarefas.md` e datas)
- Posts/carrosséis publicados (pastas em `marketing/conteudo/` da semana)
- Último relatório de ads: investimento, conversões, CPA, alertas
- Analytics: sessões, top queries (se houver export)
- Clientes novos registrados em `clientes.md`
- Experimentos com prazo vencido

### Passo 2 — Montar a revisão

Salvar em `marketing/relatorios/weekly-<YYYY-MM-DD>.md`:

```markdown
# Revisão semanal — DD/MM a DD/MM

## O que foi feito
- [tarefas concluídas, conteúdos publicados, ajustes de campanha]

## Métricas (vs semana anterior)
| Métrica | Esta semana | Anterior | Δ |
|---|---|---|---|
| Investimento ads | R$ X | R$ Y | ▲/▼ |
| Conversões | N | M | ▲/▼ |
| CPA | R$ X | R$ Y | ▲/▼ |
| Clientes novos | N | M | ▲/▼ |

## O que funcionou
## O que não funcionou
## Experimentos
- [nome] → [veredito + evidência]

## Ações da próxima semana
1. ...
2. ...
3. ...
```

### Passo 3 — Atualizar o painel KPI

Editar `_memoria/kpi.md`: valores da semana, anterior, tendência (▲▼—).
**Regra de ouro: valor real ou "sem dado" — nunca chute.**

### Passo 4 — Vereditos de experimentos

Pra cada experimento com prazo vencido, perguntar e registrar: manter / ajustar / descartar
(com o número que embasa). Aprendizados que são preferência → sugerir salvar em
`_memoria/preferencias.md`.

### Passo 5 — Ações da próxima semana

3-5 ações concretas. Registrar em `_memoria/tarefas.md` com prazo.
Se houver 2+ semanas de queda na mesma métrica, marcar como prioridade.

## Regras

- Nunca inventar métrica — "sem dado" é resposta válida e honesta
- Comparação sempre que houver histórico; sem histórico = sinalizar baseline
- Linguagem do dono, sem jargão (traduzir CPA/CTR se preciso)
- Não amenizar: "campanha queimou R$ 200 sem venda" > "performance abaixo do esperado"
- Ações com nome e motivo, não genéricas ("otimizar campanhas" ❌)

## Quality gate — antes de declarar concluído

- [ ] Relatório salvo em marketing/relatorios/weekly-<data>.md
- [ ] KPI.md atualizado com valores reais (ou "sem dado" explícito)
- [ ] Comparação com semana anterior feita (ou baseline sinalizada)
- [ ] Experimentos vencidos tiveram veredito registrado
- [ ] 3-5 ações da próxima semana em tarefas.md
