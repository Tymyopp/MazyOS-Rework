---
name: daily
description: >
  Briefing do dia: carrega contexto completo (memória, tarefas, calendário, último relatório
  de ads, experimentos ativos) e devolve o resumo operacional do dia com prioridade sugerida.
  Estende o /abrir. Use quando o usuário disser "abrir o dia", "começar o dia", "resumo do dia",
  "o que tenho pra fazer hoje", "briefing", "por onde começo hoje", ou /daily.
version: "1.0.0"
model: "*"
requires: ["_memoria/", "marketing/campanhas/relatorios/", "marketing/calendario/"]
---

# /daily — Briefing operacional do dia

Skill de cadência: transforma o estado do negócio num resumo de ~10 linhas que diz
o que importa hoje e por onde começar.

## Dependências

- **Memória:** `_memoria/empresa.md`, `_memoria/preferencias.md`, `_memoria/estrategia.md`
- **Pendências:** `_memoria/tarefas.md`
- **Métricas:** `_memoria/kpi.md` (se existir)
- **Agenda:** `marketing/calendario/calendario.md` (se existir)
- **Ads:** último arquivo em `marketing/campanhas/relatorios/`
- **Testes:** `_memoria/experimentos.md` (se existir)

## Workflow

### Passo 1 — Coletar

Ler, em ordem:
1. `_memoria/estrategia.md` → foco da semana
2. `_memoria/tarefas.md` → pendências em aberto
3. `marketing/calendario/calendario.md` → posts agendados pra hoje
4. Último relatório de ads → alertas não resolvidos (queima de orçamento, CTR caindo)
5. `_memoria/experimentos.md` → experimentos ativos perto do prazo

### Passo 2 — Montar o briefing

Formato fixo, máx ~12 linhas no terminal:

```
[Segunda, 17/08] — [Negócio]
Foco: [prioridade da estratégia em 1 frase]

Hoje:
• [até 3 pendências mais importantes, da tarefas.md]
• [posts agendados pra hoje, se houver]
• [alerta de ads, se houver — ex: campanha X queimou R$ Y sem conversão]
• [experimento vencendo: <nome> — prazo hoje/amanhã]

Sugestão: [1 ação que ataca o foco da semana]

Bora. O que atacamos primeiro?
```

### Passo 3 — Registrar pendências novas

Se o usuário trouxer algo novo durante o briefing, oferecer registrar em
`_memoria/tarefas.md` (uma linha, com prazo).

## Regras

- Nunca inventar: dado que não existe simplesmente não aparece no briefing
- Priorizar o que ataca o foco da semana, não o que é mais barulhento
- Se o usuário rodou /abrir antes, não repetir o contexto — só o que é do dia
- Segunda-feira (ou primeiro dia útil): oferecer rodar /weekly no fim do dia
- Se o calendário não existir, sugerir criar com /agendar

## Quality gate — antes de declarar concluído

- [ ] Briefing ≤ 12 linhas, no formato fixo
- [ ] Pendências, agenda e alertas vieram de arquivos reais (nada inventado)
- [ ] 1 sugestão de prioridade ligada ao foco da estratégia
- [ ] Oferta de registrar pendências novas em tarefas.md
