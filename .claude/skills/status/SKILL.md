---
name: status
description: >
  Mostra o painel de status do negócio num único comando: memória preenchida, tarefas em
  aberto, itens agendados, clientes registrados e integrações configuradas. Inspirado no
  `theall status` do The-ALL. Use quando o usuário disser "status", "como está o sistema",
  "painel do negócio", "o que está configurado", "resumo do projeto", "situação geral",
  "como estão as integrações", ou /status.
version: "1.0.0"
model: "*"
requires: ["scripts/status.js", "_memoria/"]
---

# /status — Painel do negócio

Skill de visão geral: um comando, o estado completo do sistema — herdada do padrão
`theall status` do The-ALL (registro de saúde do projeto em 1 linha).

## Dependências

- **Script:** `scripts/status.js` (fetch nativo, sem deps)
- **Fonte:** `_memoria/`, `marketing/calendario/`, `.env`, `.local/insta-auth.json`

## Workflow

### Passo 1 — Rodar o painel

```bash
node scripts/status.js            # painel legível
node scripts/status.js --json     # para máquina/n8n/automação
```

### Passo 2 — Interpretar e agir

- **Memória em branco** → sugerir `/instalar` ou preencher `_memoria/`
- **Tarefas acumuladas** (5+) → sugerir revisar com `/daily` e priorizar
- **Agendados** → lembrar que o `/automacao` + `cron-posts.js` publicam sozinhos
- **Integração com "—"** → apontar para `scripts/check-integracao.js` e o doc correspondente
- **Clientes 0** → sugerir `/cliente` quando fechar a primeira venda

### Passo 3 — Relatório

Entregar no chat:

```
📊 [Nome do negócio]
Memória: empresa ✓ · preferências ✓ · estratégia ⚠ (em branco)
Tarefas: 3 abertas · 2 agendados · 5 clientes
Integrações: Instagram conectada · WhatsApp configurada · TikTok — · LinkedIn — · YouTube —
Sistema: 43 skills · 12 scripts

Recomendações: [1-3 ações]
```

## Regras

- Nunca inventar estado — o script lê os arquivos reais
- Se `.env` não existir, todas as integrações aparecem como "—" (correto)
- Sempre oferecer o próximo passo (check-integracao, /daily, /instalar)

## Quality gate — antes de declarar concluído

- [ ] `status.js` rodou (ou --json se pedido)
- [ ] Painel interpretado com recomendações
- [ ] Nada inventado (estado veio dos arquivos)
