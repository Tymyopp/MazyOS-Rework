---
name: agendar-posts
description: >
  Agenda publicações reais no Instagram (e outras redes) para data futura, usando o
  agendador escolhido (Postiz self-hosted com API pública, ou Post for Me com scheduling).
  Liga o calendário de conteúdo (/agendar) à publicação automática. Use quando o usuário
  disser "agendar post", "agendar carrossel", "publicar depois", "agendar publicação",
  "deixar agendado", "agendar reels", ou /agendar-posts.
version: "1.0.0"
model: "*"
requires: ["postiz ou post-for-me (ver docs/agendamento.md)", "marketing/calendario/calendario.md"]
---

# /agendar-posts — Agendamento real

Skill de agendamento: leva o que está "planejado" no calendário do MazyOS para a
plataforma de agendamento escolhida, publicando no dia/hora definidos — sem precisar
estar na frente do computador.

## Dependências

- **Agendador:** Postiz (self-host, API pública) **ou** Post for Me (API com scheduling) —
  ver `docs/agendamento.md` para setup de cada um
- **Calendário:** `marketing/calendario/calendario.md` (status planejado → agendado)
- **Conteúdo:** mídia em `marketing/conteudo/` e/ou URLs públicas

## Workflow

### Passo 1 — Pré-checagem

- Verificar qual agendador está configurado (`.env`: `POSTIZ_URL`+`POSTIZ_API_KEY`
  **ou** `POSTFORME_API_KEY`) — ver `docs/agendamento.md`
- Nenhum configurado → guiar o setup (ou oferecer: agendar manualmente no app)

### Passo 2 — Escolher o que agendar

- Ler `marketing/calendario/calendario.md` e listar os itens `planejado` das próximas 2 semanas
- Perguntar quais agendar (ou agendar todos os que já têm conteúdo pronto)

### Passo 3 — Agendar

**Via Postiz (self-host):**
```bash
# upload da mídia
curl -X POST "$POSTIZ_URL/api/public/v1/media" \
  -H "x-api-key: $POSTIZ_API_KEY" -F "file=@caminho/instagram/slide-01.png"
# criar post agendado
curl -X POST "$POSTIZ_URL/api/public/v1/posts" \
  -H "x-api-key: $POSTIZ_API_KEY" -H "Content-Type: application/json" \
  -d '{
    "integration_id": "<id da conta IG no Postiz>",
    "title": "Tema X",
    "content": "<legenda>",
    "scheduled_at": "2026-08-20T10:00:00Z",
    "media": [{"url": "<url da mídia>"}]
  }'
```

**Via Post for Me:**
```bash
node --env-file=.env scripts/agendar-postforme.js <slug> --data "2026-08-20T10:00:00-03:00" [--rede instagram]
```
(criar o script conforme `docs/agendamento.md`; o endpoint é `POST /api/schedule`)

### Passo 4 — Atualizar o calendário

- Marcar no `marketing/calendario/calendario.md`: status `agendado` + plataforma
- Registrar o link/ID do agendamento (se houver) na coluna de observação

### Passo 5 — Resumo

```
✓ Agendado:
• [data/hora] — carrossel "Tema X" (Instagram) — via Postiz/Post for Me
```

## Regras

- Agendar no futuro SEMPRE com fuso horário explícito (o do negócio)
- Nunca agendar conteúdo sem mídia/conteúdo pronto (valida antes)
- Se o agendador falhar, mostrar o erro e manter o status `planejado` no calendário
- Respeitar o calendário: não agendar em cima de outros posts (frequência combinada)
- Lembrar: agendar ≠ publicado — revisar após o horário (ou confiar no agendador)

## Quality gate — antes de declarar concluído

- [ ] Agendador configurado (ou usuário guiado no setup / optou por manual)
- [ ] Itens escolhidos têm conteúdo pronto
- [ ] Posts agendados com data/hora + fuso corretos
- [ ] Calendário atualizado (status agendado + plataforma)
- [ ] Resumo entregue com os agendamentos
