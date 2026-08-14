# 🧰 Catálogo MCP — Automação de redes sociais (Fase H)

> Referência completa dos servidores MCP para conectar o MazyOS a todas as plataformas.
> Complementa `pesquisa-mcp-automacao.md` (análise profunda) — aqui está o "como instalar".
> Ativação guiada: skill `/conectar-mcp`. Perfis prontos: `.mcp.example.{starter,avancado,agencia}.json`.

## Legenda

- **Nível 1** — age dentro da conversa (você pede, a IA executa)
- **Nível 2** — agenda/fila (sai no horário sem você)
- **Nível 3** — autônomo (age sozinho em gatilhos: n8n/cron/serviços cloud)

---

## Perfis de instalação

| Perfil | Para quem | Servidores | Nível |
|---|---|---|---|
| **starter** | 1 negócio, grátis | meta-mcp-server (IG/Threads/FB) + WA MCP (WhatsApp) | 1+2 |
| **avancado** | Criador solo | starter + youtube-uploader + linkedin-mcp (OAuth) | 1+2 |
| **agencia** | Multi-cliente | avancado + Ayrshare/Zernio (multi-plataforma) + n8n | 1+2+3 |

```bash
# Ativar um perfil (ex.: starter)
cp .mcp.example.starter.json .mcp.json
# Depois rode /conectar-mcp para testar cada servidor
```

---

## Meta — Instagram, Facebook, Threads, Ads

| Servidor | Tools | Instalação | Nível |
|---|---|---|---|
| **meta-mcp-server** (oliverames) | 200+ | `npx -y meta-mcp-server` | 1+2 |
| **meta-mcp** (mikusnuz) | 57 | clone + build (ou npm) | 1+2 |
| **Meta oficial** (ads) | 29 | `mcp.facebook.com/ads` (URL remota, OAuth) | 1 |

**Env:** `META_ACCESS_TOKEN` (ou `INSTAGRAM_ACCESS_TOKEN` + `INSTAGRAM_USER_ID`, `THREADS_*`), `META_APP_ID`, `META_APP_SECRET`.

**O que desbloqueia (meta-mcp-server):** publicar foto/vídeo/Reel/Story/carrossel com
alt text e agendamento; comentários (ler/responder/ocultar); DMs; insights; Threads;
Ads Manager (62 tools); cross-post IG→Threads.

## WhatsApp

| Servidor | Tools | Instalação | Nível |
|---|---|---|---|
| **WA MCP** (delltrak) | 63 | Docker (`docker run ... wa-mcp`) | 1+3 (eventos SSE) |
| **Composio WhatsApp** | 17 | URL remota + API key | 1 |

**Canais:** Baileys (WhatsApp Web — grátis, risco de ban) **ou** Meta Cloud API
(oficial, recomendado para negócio). Env: `WHATSAPP_TOKEN` / credenciais Cloud API.

**O que desbloqueia:** enviar mensagem/template/mídia, grupos, contatos, perfil
business, eventos em tempo real (gatilhos p/ n8n).

## LinkedIn

| Servidor | Tools | Instalação | Nível |
|---|---|---|---|
| **quinnjr/linkedin-mcp** | completo | `npx -y @pegasusheavy/linkedin-mcp` | 1 |
| **Composio LinkedIn** | — | URL remota + OAuth | 1 |

**Env:** `LINKEDIN_ACCESS_TOKEN` (OAuth 2.0 + OIDC — produtos "Sign In with LinkedIn"
+ "Share on LinkedIn"). Publica texto/imagem/vídeo em perfil e página. **Sempre por
OAuth autorizado — nunca browser automation** (viola termos).

## YouTube

| Servidor | Tools | Instalação | Nível |
|---|---|---|---|
| **anwerj/youtube-uploader-mcp** | 6 | `curl -fsSL .../install.sh \| bash` | 1+2 |

**Env:** `client_secret.json` (Google Cloud OAuth — local, LLM nunca vê o segredo).
Upload com título/descrição/tags, Shorts, agendamento, multi-canal, grátis.

## X/Twitter

| Servidor | Tools | Instalação |
|---|---|---|
| **EnesCinr/twitter-mcp** | 2 | `npx -y twitter-mcp` |
| **crazyrabbitLTC/mcp-twitter-server** | 53 | clone + build |

## Multi-plataforma (unificados)

| Serviço | Tools | Plataformas | Instalação | Custo | Nível |
|---|---|---|---|---|---|
| **Ayrshare** | 75+ | 13+ | MCP + API key | US$149/mês | 1+2 |
| **Zernio** | 480+ | 15 | MCP (free 2 contas, $6/conta) | free start | 1+2 |
| **Postiz** | MCP-native | 30+ | self-host Docker / cloud | **free self-host** | 1+2 |
| **Buffer** | 18 | 11 | `mcp.buffer.com/mcp` (OAuth, sem key) | free tier | 1+2 |
| **Upload-Post** | 40 | 9 | `mcp.upload-post.com/mcp` + ApiKey | free tier | 1+2 |
| **SocialAPI.ai** | MCP-native | 8+ | URL + API key | free (2 perfis) | 1+2 |
| **PostWire** | — | 9 | MCP + key | free tier | 1+2 |

**Env unificados:** `AYRSHARE_API_KEY`, `ZERNIO_API_KEY`, `POSTIZ_URL`+`POSTIZ_API_KEY`,
`BUFFER_*` (via OAuth), `UPLOADPOST_API_KEY`, `SOCIALAPI_KEY`, `POSTFORME_API_KEY`.

## Automação nível 3 (orquestradores)

| Ferramenta | O que faz | Custo |
|---|---|---|
| **n8n** (self-host) | Fluxos visuais: post novo → publica nas redes; DM → responde; agendamento | Free (self-host) |
| **cron** (sistema) | Roda `scripts/cron-posts.js` no horário do calendário | Free |
| **Carly / serviços cloud** | Age sem você (triggers) | US$35+/mês |

Ver `docs/automacao-n8n.md` para fluxos prontos.

---

## Teste rápido

Depois de ativar um perfil, rode `/conectar-mcp` — ele chama um tool de "listagem"
de cada servidor e reporta o status (✓ conectado / ✗ falha + como corrigir).
