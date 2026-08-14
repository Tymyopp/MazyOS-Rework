---
name: postar-whatsapp
description: >
  Envia mensagens pelo WhatsApp Business (Meta Cloud API ou WA MCP): mensagem única,
  template aprovado, mídia, follow-up de clientes do CRM (_memoria/clientes.md), confirmação
  de pedido e broadcast. Use quando o usuário disser "mandar whatsapp", "enviar mensagem
  pro cliente", "whatsapp pro fulano", "follow-up no whatsapp", "confirmar pedido",
  "responder cliente no zap", ou /postar-whatsapp.
version: "1.0.0"
model: "*"
requires: ["wa-mcp ou whatsapp cloud-api", "_memoria/clientes.md"]
---

# /postar-whatsapp — Mensagens pelo WhatsApp

Skill de comunicação: conecta o CRM (clientes) ao canal mais usado do negócio BR.

## Dependências

- **Canal:** WA MCP (Baileys ou Meta Cloud API) via `/conectar-mcp` — ou `WHATSAPP_TOKEN` no `.env`
- **CRM:** `_memoria/clientes.md` (nomes, contatos, "seguir em")
- **Tom:** `_memoria/preferencias.md`

## Workflow

### Passo 1 — Tipo de mensagem

Perguntar (ou inferir):
1. **Mensagem única** — para 1 contato (nome/número)
2. **Follow-up do CRM** — clientes com "seguir em" vencido (listar e escolher)
3. **Confirmação de pedido** — template com dados do pedido
4. **Broadcast** — lista pequena (aviso de cardápio, horário, promoção)

### Passo 2 — Escrever no tom da marca

- Usar `_memoria/preferencias.md` (caloroso, direto, sem jargão)
- Mensagem curta (1-3 frases) com 1 ação clara
- Nunca enviar antes de mostrar o texto e pedir aprovação

### Passo 3 — Enviar

Via MCP (recomendado): chamar o tool do servidor (ex.: `send_message`) com o número
no formato internacional (+55...). Via script: `node scripts/whatsapp-enviar.js` (se
criado).

**CHECKPOINT:** aprovação humana do texto ANTES do envio — sempre.

### Passo 4 — Registrar

- Atualizar `_memoria/clientes.md` (campo "seguir em" → próxima data)
- Se o cliente respondeu algo importante, registrar

## Regras

- Nunca enviar sem aprovação do texto (mensagem é irreversível)
- Número no formato internacional (55 + DDD + número)
- Respeitar horário comercial (não enviar após 20h salvo urgência)
- Broadcast só para quem optou em receber (LGPD)
- Preferir Meta Cloud API (oficial) — Baileys tem risco de ban (avisar se usar)

## Quality gate — antes de declarar concluído

- [ ] Canal configurado (MCP testado ou WHATSAPP_TOKEN)
- [ ] Texto aprovado pelo usuário
- [ ] Número validado (formato internacional)
- [ ] Envio confirmado (status da API)
- [ ] CRM atualizado (follow-up/registro)
