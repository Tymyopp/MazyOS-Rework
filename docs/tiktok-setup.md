# Setup do TikTok (Content Posting API) — Fase 7

> Publicação de vídeos (Reels→TikTok) via API oficial. Setup único (~20-30 min) +
> possível **auditoria da TikTok** para posts públicos.

## Requisitos

- Conta TikTok **Business ou Creator**
- **TikTok Developer App** (developers.tiktok.com)

## Passo 1 — Criar o app

1. developers.tiktok.com → My Apps → Create app
2. App Name, Description, **Privacy Policy URL** e **Terms of Service URL** (domínio verificado — pode ser o seu site; a TikTok pede verificação por arquivo/DNS)
3. Produtos: **Login Kit** + **Content Posting API** (habilite **Direct Post**)
4. Scopes: `user.info.basic`, `user.info.profile`, `video.list`, `video.upload`, `video.publish` (e `user.info.stats` p/ insights)

## Passo 2 — Obter o token (OAuth)

1. Monte a URL de autorização (client_key = CLIENT_KEY do app):
   `https://www.tiktok.com/v2/auth/authorize/?client_key=...&scope=user.info.basic,video.upload,video.publish&response_type=code&redirect_uri=<SEU_REDIRECT>`
2. O usuário autoriza → redireciona com `?code=...`
3. Troque o code por token:
   `POST https://open.tiktokapis.com/v2/oauth/token/` com `client_key`, `client_secret`, `code`, `grant_type=authorization_code`, `redirect_uri`
4. Resposta: `access_token` (expira ~24h) + `refresh_token` + `open_id`
5. Renove com `grant_type=refresh_token`

## Passo 3 — .env

```bash
TIKTOK_CLIENT_KEY=...
TIKTOK_CLIENT_SECRET=...
TIKTOK_ACCESS_TOKEN=...
TIKTOK_OPEN_ID=...
# TIKTOK_REFRESH_TOKEN=...  (para renovar)
```

## Passo 4 — Publicar

```bash
node --env-file=.env scripts/postar-tiktok.js <video.mp4> --legenda "texto" [--titulo "título"] [--privado]
```

## ⚠️ Sandbox vs público (importante)

- **Sandbox**: só publica vídeos **privados** — serve pra testar.
- **Público**: o app precisa passar pela **auditoria da TikTok** (audit) — revisão
  manual, pode levar dias/semanas, exige demonstração de uso. Enquanto não aprovado,
  use `--privado` (ou publique manualmente no app).

## Alternativa sem auditoria

O **Post for Me** (postforme.dev) oferece quickstart com credenciais pré-aprovadas
(publicação real sem esperar a auditoria) — ver `docs/mcp-instagram.md` (mesmo
conceito, plataforma TikTok). Se o TikTok for prioridade, considere essa rota.
