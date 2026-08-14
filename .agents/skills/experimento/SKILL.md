---
name: experimento
description: >
  Registra e gerencia experimentos de marketing (hipótese → ação → métrica → veredito)
  no arquivo _memoria/experimentos.md. Máx 3 ativos por vez. Cobra veredito com evidência
  quando o prazo vence. Use quando o usuário disser "experimento", "vamos testar",
  "testar hipótese", "registrar teste", "A/B", "o que achou do teste", ou /experimento.
version: "1.0.0"
model: "*"
requires: ["_memoria/experimentos.md"]
---

# /experimento — Registro de testes

Skill de aprendizado: transforma "vamos testar isso" em experimento estruturado com
hipótese, métrica e prazo — e garante que termine com veredito, não com esquecimento.

## Dependências

- **Arquivo:** `_memoria/experimentos.md` (criar com template se não existir)
- **Contexto:** `_memoria/estrategia.md` (o experimento deve servir ao foco atual)

## Workflow

### Passo 1 — Registrar (novo experimento)

Perguntar, uma coisa por vez:
1. **Hipótese em 1 frase:** "se [ação], então [resultado] porque [razão]"
2. **Ação concreta:** o que vai ser feito e onde (ex: "trocar headline da landing por X")
3. **Métrica única mensurável:** qual número decide o veredito (CTR, CPA, conversões, respostas)
4. **Prazo:** quando decide (ex: "15 dias" — tempo suficiente pra ter dado)

Adicionar linha em `_memoria/experimentos.md`:

```markdown
| # | Hipótese | Ação | Métrica | Prazo | Status |
|---|---|---|---|---|---|
| 12 | Se X então Y | Trocar headline | CTR | 2026-08-28 | rodando |
```

**Limite:** máx 3 ativos. Se estourar, pedir pra encerrar um antes.

### Passo 2 — Acompanhar

Ao encontrar experimento com prazo vencido (no /daily, /weekly ou ao ser chamado):
pedir o resultado da métrica e registrar o veredito com evidência:

```markdown
| 12 | Se X então Y | Trocar headline | CTR 2,1% → 3,4% | manter |
```

**Veredito (com número, não impressão):**
- **manter** — métrica melhorou além do ruído
- **ajustar** — resultado inconclusivo ou parcial → nova rodada com ajuste
- **descartar** — métrica não melhorou ou piorou

### Passo 3 — Aprender

- Aprendizado que é preferência de estilo ("funcionou falar assim") → sugerir salvar em
  `_memoria/preferencias.md`
- Aprendizado sobre o mercado → `_memoria/empresa.md`
- Mover linha de "Ativos" pra "Concluídos" (mantendo o histórico)

## Regras

- Uma métrica por experimento — com duas, nenhuma decide
- Hipótese falsável: "melhorar o instagram" não é hipótese; "CTR da capa subir 20%" é
- Nunca registrar veredito sem evidência (número ou dado observável)
- Experimentos não servem pro foco atual → sugerir adiar em vez de registrar
- Máx 3 ativos, sempre

## Quality gate — antes de declarar concluído

- [ ] Linha registrada com hipótese (se-então-porque), ação, métrica única e prazo
- [ ] Limite de 3 ativos respeitado
- [ ] Veredito (se houver) com evidência numérica
- [ ] Aprendizado encaminhado ao arquivo certo (preferencias/empresa)
