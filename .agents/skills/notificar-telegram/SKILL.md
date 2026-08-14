---
name: notificar-telegram
description: >
  Envia notificações do negócio para o seu Telegram (bot do BotFather): alertas de
  campanha, posts publicados, relatório semanal pronto, erros de automação, leads novos.
  Integra com /aprovar-post, /weekly, /automacao e cron-posts. Inspirado no The-Notifier
  do The-ALL. Use quando o usuário disser "notificar no telegram", "avisar no telegram",
  "mandar alerta pro telegram", "bot do telegram", "configurar notificações",
  "me avisa no telegram", ou /notificar-telegram.
version: "1.0.0"
model: "*"
requires: ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID no .env"]
---

# /notificar-telegram — Notificações via Telegram

Skill de alertas: o negócio avisa você no Telegram quando algo importante acontece —
sem precisar abrir o MazyOS.

## Dependências

- **Bot:** criar com o BotFather no Telegram (`/newbot` → token) — 2 min
- **Env:** `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` no `.env`
- **Script:** `scripts/telegram-notificar.js` (fetch nativo)

## Workflow

### Passo 1 — Setup (primeira vez)

1. Orientar: Telegram → @BotFather → `/newbot` → copiar o token
2. Descobrir o CHAT_ID: usuário manda `/start` pro bot e roda o teste:
   ```bash
   node --env-file=.env scripts/telegram-notificar.js --teste
   ```
   (se não mostrar o chat_id, usar @userinfobot)
3. Preencher `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID` no `.env`

### Passo 2 — Notificar

```bash
node --env-file=.env scripts/telegram-notificar.js "Mensagem" [--nivel info|alerta|sucesso|erro]
```

### Passo 3 — Automatizar (nível 3)

Sugerir amarrar a notificação a eventos:
- **Fim do /aprovar-post** → `--nivel sucesso "Post publicado: <título>"`
- **Fim do /weekly** → `--nivel info "Relatório semanal pronto em marketing/relatorios/"`
- **/automacao + cron** → adicionar a notificação ao fluxo n8n/cron
- **Falha de integração** → `--nivel erro` (rodar junto com check-integracao)

## Regras

- Mensagens curtas (1-3 linhas) — Telegram é para alerta, não relatório
- Nunca enviar dados sensíveis (tokens, senhas) na mensagem
- Nível padrão: info; usar `erro` só para falhas reais
- Confirmar sempre que a notificação foi entregue (message_id)

## Quality gate — antes de declarar concluído

- [ ] Bot criado e token no .env (ou usuário guiado no BotFather)
- [ ] Teste enviado e confirmado (message_id)
- [ ] Mensagem entregue com nível adequado
- [ ] Automação de notificação sugerida (se fizer sentido)
