---
name: caixa-social
description: >
  Centraliza mensagens, comentários e menções de todas as redes (Instagram, Facebook,
  TikTok, LinkedIn, YouTube, Google reviews) numa única leitura via SocialAPI (unified
  inbox) e gera respostas no tom da marca com aprovação. Use quando o usuário disser
  "caixa social", "inbox unificado", "mensagens de todas as redes", "responder tudo",
  "caixa de entrada social", ou /caixa-social.
version: "1.0.0"
model: "*"
requires: ["socialapi (unified inbox)", "SOCIALAPI_KEY no .env"]
---

# /caixa-social — Inbox unificado

Skill de operação: uma única fila com tudo que chegou (mensagens, comentários, menções,
reviews) — e a IA ajuda a responder tudo no tom da marca.

## Dependências

- **Serviço:** SocialAPI.ai (MCP-native; free tier: 2 perfis, 10 posts/mês) via `/conectar-mcp`
- **Tom:** `_memoria/preferencias.md`
- **CRM:** `_memoria/clientes.md` (para conversas que viram lead)

## Workflow

### Passo 1 — Coletar

Chamar o tool de inbox do SocialAPI (unified inbox) para o período (padrão: últimas 24h):

```
IG: 3 comentários · 1 DM
FB: 2 comentários
Google: 1 review nova
TikTok: 1 menção
```

### Passo 2 — Triagem (prioridade)

| Prioridade | Tipo | Ação |
|---|---|---|
| 🔴 Alta | Pergunta de compra, reclamação, DM com intenção | Responder primeiro |
| 🟡 Média | Elogio, review, dúvida simples | Responder em lote |
| 🔵 Baixa | Menção sem intenção, spam | Ignorar/arquivar |

### Passo 3 — Rascunhar + aprovar

- Rascunho por item (tom da marca; críticas → canal privado)
- **CHECKPOINT:** lista completa p/ aprovação (todas / algumas / editar)

### Passo 4 — Enviar e registrar

- Enviar via MCP/API; relatar sucesso/falha
- Conversas com intenção de compra → `_memoria/clientes.md` + sugerir follow-up
  via `/postar-whatsapp`

## Regras

- Priorizar: compra/reclamação > elogio > menção
- Nunca responder spam; arquivar
- Crítica: reconhecer publicamente + resolver em privado
- Não prometer prazo/desconto sem autorização
- Registro de lead sempre que houver intenção

## Quality gate — antes de declarar concluído

- [ ] Inbox coletado (todas as fontes do período)
- [ ] Triagem feita (alta/média/baixa)
- [ ] Rascunhos aprovados pelo usuário
- [ ] Envios confirmados
- [ ] Leads → CRM + follow-up sugerido
