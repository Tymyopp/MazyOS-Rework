# Agendamento real de posts — Postiz ou Post for Me (Fase 6)

> O `/agendar` planeja o calendário (markdown). Esta camada **executa** a publicação
> no dia/hora marcados, sem depender de você estar online. Duas opções:

## Opção A — Postiz (open source, self-host)

**Prós:** sem mensalidade, seus dados, agendamento de fotos/carrosséis/Reels; MCP + API.
**Contras:** precisa rodar Docker (ou usar o cloud pago).

```bash
# subir (Docker Compose — app + Postgres + Redis)
git clone https://github.com/gitroomhq/postiz-app.git
cd postiz-app && docker compose up -d
```

1. Acesse a UI → crie conta → **Integrations → Instagram** → conectar (OAuth por link,
   conta Business/Creator)
2. Em **Settings → API Keys**: crie uma chave → `POSTIZ_URL` (ex. `http://localhost:5000`)
   e `POSTIZ_API_KEY` no `.env`
3. Teste: `curl "$POSTIZ_URL/api/public/v1/integrations" -H "x-api-key: $POSTIZ_API_KEY"`

**Pendências conhecidas:** o endpoint público tem um conjunto limitado de rotas
(criar post, upload de mídia, listar, deletar, status) — o suficiente pro fluxo do
`/agendar-posts`. Reagendar via API pública não é suportado; use a UI.

## Opção B — Post for Me (SaaS, pay-per-post, quickstart pré-aprovado)

**Prós:** sem infra; credenciais pré-aprovadas (sem esperar auditorias) p/ várias redes.
**Contras:** pago por uso; tokens ficam no serviço.

```bash
# .env
POSTFORME_API_KEY=pfm_...
```

1. postforme.dev → criar conta → **Project → Social Media Accounts → Connect an Account**
   → Instagram (link OAuth, conta Business/Creator)
2. Schedule via API:

```bash
curl -X POST https://api.postforme.dev/api/schedule \
  -H "x-api-key: $POSTFORME_API_KEY" -H "Content-Type: application/json" \
  -d '{
    "social_accounts": ["<id da conta IG>"],
    "caption": "legenda",
    "media": [{"url": "https://site.com.br/img/.../slide-01.png"}],
    "scheduled_at": "2026-08-20T10:00:00-03:00"
  }'
```

(Endpoint pode variar — conferir docs.postforme.dev; a skill usa `scripts/agendar-postforme.js`
que encapsula a chamada e pode ser ajustado.)

## Qual escolher?

| Critério | Postiz | Post for Me |
|---|---|---|
| Custo | Grátis (self-host) | Pay-per-post |
| Infra | Docker | Nenhuma |
| Review/auditoria | Meta (conta própria OK) | Pré-aprovado |
| Público | Todos os dados seus | Tokens no serviço |
| Suporte a Reels/TikTok | IG Reels; TikTok parcial | 9 redes |

**Recomendação default:** Postiz se você consegue rodar Docker; Post for Me se quer
zero infra e agilidade.
