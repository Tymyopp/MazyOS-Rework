# 🤖 Automação nível 3 — rodar sozinho (n8n + cron)

> Enquanto MCPs agem **dentro da conversa** (nível 1) e agendadores postam no horário
> (nível 2), o **nível 3** faz o sistema agir **sem você**: gatilhos, filas e rotinas
> que rodam sozinhos. Duas vias complementares:

---

## Via A — n8n (fluxos visuais, recomendado)

**O que é:** orquestrador open source (self-host grátis via Docker, ou cloud pago).
Conecta webhooks, agendamento (cron), APIs e **chama MCPs**.

### Setup (5 min)

```bash
# Docker (mesma máquina do Postiz, se tiver)
docker run -d --name n8n -p 5678:5678 \
  -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
# Abrir http://localhost:5678 e criar conta
```

### Fluxos prontos para copiar

| Fluxo | Gatilho | Ação |
|---|---|---|
| **Post novo → redes** | Webhook do blog/site | Chama `/cross-post` via MCP ou API do unificador |
| **DM novo → resposta** | Webhook do SocialAPI/WA MCP (eventos) | Gera rascunho (LLM) → envia (com aprovação ou automático p/ templates) |
| **Avaliação nova → aviso** | Webhook do Google | Avisa no WhatsApp/Telegram + sugere `/responder-avaliacoes` |
| **Calendário → publicação** | Cron (a cada 15 min) | Lê `marketing/calendario/calendario.md` → publica itens `agendado` (via `scripts/cron-posts.js`) |
| **Relatório semanal** | Cron (segunda 8h) | Chama `/weekly` via agente → envia resumo por email (Gmail MCP) |

> **Segurança:** fluxos que PUBLICAM devem ter um passo de aprovação (n8n "Wait for
> approval") ou usar apenas templates aprovados. Fluxos que só avisam podem ser 100% automáticos.

---

## Via B — cron (simples, sem infra extra)

### `scripts/cron-posts.js` — publica o calendário sozinho

```bash
# todo dia 9h (UTC-3): publica o que estiver "agendado" para hoje
0 12 * * * cd /caminho/do/mazyos && node --env-file=.env scripts/cron-posts.js --hoje >> .local/cron.log 2>&1
```

O script lê `marketing/calendario/calendario.md`, filtra `status=agendado` com a data
de hoje e chama a publicação (postar-instagram.js / postar-tiktok.js / unificador),
marcando `publicado` em seguida.

**Para agendar:** `crontab -e` (Linux/macOS) ou "Agendador de Tarefas" (Windows).

---

## Gatilhos que viram automação (mapa)

| Evento | Fonte | Fluxo sugerido |
|---|---|---|
| Post publicado no blog | Webhook do site | Cross-post automático nas redes |
| DM/comentário novo | SocialAPI / meta-mcp (eventos) | Responder template ou avisar |
| Avaliação nova no Google | Google Business API | Aviso + rascunho de resposta |
| Cliente com "seguir em" vencido | `_memoria/clientes.md` (cron diário) | Follow-up WhatsApp |
| Semana fechando | Cron (segunda) | Gerar /weekly + enviar resumo |

---

## Checklist de ativação

- [ ] n8n rodando (ou cron configurado)
- [ ] `/conectar-mcp` ativou os servidores com eventos (WA MCP/SocialAPI)
- [ ] Fluxos copiados dos exemplos acima
- [ ] Regra de ouro: **publicar = com aprovação; avisar = automático**
- [ ] Testar cada fluxo com dados falsos antes de soltar
- [ ] Logs em `.local/` (nunca no git)
