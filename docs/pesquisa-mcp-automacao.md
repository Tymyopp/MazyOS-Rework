# 🔌 Pesquisa profunda: MCPs para automação total de redes sociais

> **Pesquisa (13/08/2026)** — mapeamento completo do ecossistema MCP (Model Context
> Protocol) para automação de redes sociais + plano de implementação no MazyOS-Rework.
> Objetivo: **deixar tudo o mais automático possível** — publicar, responder, agendar,
> medir e faturar com o mínimo de ação manual.

---

## 1. O que a pesquisa revelou (resumo executivo)

**1. O MCP virou o padrão de fato em 2026.** Praticamente toda plataforma social tem
servidor MCP oficial ou de comunidade — e serviços unificados multi-plataforma lançaram
MCP servers próprios (Buffer oficial em 05/2026, Ayrshare 75+ tools, Postiz MCP-native,
Zernio 480+ tools, Blotato, Upload-Post, PostPlanify, SocialAPI).

**2. Existem 3 níveis de automação:**
| Nível | O que é | Exemplo |
|---|---|---|
| **1 — Dentro da conversa** | A IA chama ferramentas MCP enquanto você conversa | "Publica esse carrossel no IG e TikTok" |
| **2 — Agendado** | Posts entram na fila e saem no horário, sem você | Buffer/Postiz/Ayrshare via MCP |
| **3 — Autônomo (eventos)** | A IA age sozinha em gatilhos (post novo, DM, comentário) | n8n/Zapier/Carly + MCP |

**3. A regra de ouro para automação real:** MCP dentro da conversa (nível 1) é fácil;
para **nível 3** (agir sem você), precisa de um orquestrador sempre-ligado (n8n, cron,
serviço cloud) — nenhum MCP sozinho faz isso, porque MCP vive dentro da sessão do agente.

**4. WhatsApp é o canal mais subestimado:** 63-tool WA MCP (Baileys/Meta Cloud API),
17 tools da Composio — para negócio BR (que vive no WhatsApp), é o maior ganho de
automação possível: responder lead, confirmar pedido, follow-up.

**5. YouTube tem MCP grátis e completo** (anwerj/youtube-uploader-mcp): OAuth2 local,
upload com título/descrição/tags, agendamento — sem custo.

**6. LinkedIn agora tem caminho oficial via MCP** (Composio, quinnjr/linkedin-mcp com
OAuth+OIDC): postar em perfil/página via `share_linkedin_post` — resolve a lacuna
"LinkedIn manual" do MazyOS.

---

## 2. Mapa completo: MCPs por plataforma

### 2.1 Meta (Instagram + Facebook + Threads + Ads)

| Servidor | Tools | Tipo | Destaque |
|---|---|---|---|
| **meta-mcp-server** (oliverames) | 200+ | Open source (npm) | Meta INTEIRO: FB Pages (52), Instagram (37), Ads (62), Threads (22), Commerce, Insights. Publica com agendamento, gerencia comentários/DMs, alt text |
| **meta-mcp** (mikusnuz) | 57 | Open source (MIT) | IG (33) + Threads (18): publica foto/vídeo/reel/story/carrossel com alt text, comentários, hashtags, DMs, collabs; busca tokens/refresh |
| **instagram-mcp** (AleemHaider) | 24 | Open source (MIT) | Publicação, comentários, DMs, insights |
| **ig-mcp** (jlbadano) | — | Open source | Contas Business, Graph API |
| **Meta oficial** (mcp.facebook.com/ads) | 29 | First-party (hosted) | Ads Manager; OAuth por usuário; suporte nativo ChatGPT/Claude/Perplexity |
| **meta-ads-mcp** (byadsco) | 125 | Open source | Agências multi-conta, tokens criptografados |

### 2.2 TikTok

| Servidor | Tools | Tipo | Destaque |
|---|---|---|---|
| **Composio TikTok** | 10 | Hosted (free tier) | Upload/publish vídeo e foto (1-35), status, stats, batch; managed auth + refresh; SOC2 |
| **Seym0n/tiktok-mcp** | — | Open source | Análise |
| **Outstand** (mcp.outstand.so) | 28 (11 plataformas) | Hosted $19/mês | OAuth gerenciado, sem developer app; Content Posting API oficial |
| **Upload-Post** (mcp.upload-post.com) | 40 (9 plataformas) | Hosted free tier | upload_video, upload_photos, agendamento, analytics, ffmpeg (trim/convert) |
| **Post for Me** | 27 (9 plataformas) | API/MCP | Quickstart pré-aprovado (sem auditoria) |

### 2.3 LinkedIn

| Servidor | Tools | Tipo | Destaque |
|---|---|---|---|
| **stickerdaniel/linkedin-mcp-server** | — | Open source (3.077⭐) | Perfis, empresas, vagas, mensagens (browser-based) |
| **quinnjr/linkedin-mcp** | — | Open source (MIT) | **OAuth 2.0 + OIDC oficial**: `share_linkedin_post`, perfil, conexões; 67 testes |
| **Composio LinkedIn** | — | Hosted | OAuth; postar/apagar posts, dados de perfil/org — **dentro da API autorizada** |
| **SocialAPI.ai** | MCP-native | Hosted free tier | Publica em perfil/página + comments/DMs/mentions em 8 redes; unificado |

### 2.4 YouTube

| Servidor | Tools | Tipo | Destaque |
|---|---|---|---|
| **anwerj/youtube-uploader-mcp** | 6 | **Open source, GRÁTIS** | OAuth2 local (segredos nunca vão pro LLM), upload/agendamento, multi-canal, metadados via IA |
| **eat-pray-ai/yutu** | — | Open source (608⭐) | Upload/management |
| **Blotato YouTube** | — | Hosted $29/mês | Sem Google Cloud project; Shorts; agendamento |
| **Upload-Post** | 40-tool | Hosted free tier | upload_video + Shorts + analytics + ffmpeg |

### 2.5 X/Twitter

| Servidor | Tools | Tipo |
|---|---|---|
| **EnesCinr/twitter-mcp** | 2 | Open source (403⭐) — postar e buscar |
| **crazyrabbitLTC/mcp-twitter-server** | 53 | Open source — automação completa |
| **6551Team/opentwitter-mcp** | — | Open source (1.440⭐) — dados/pesquisa |

### 2.6 WhatsApp (o canal BR)

| Servidor | Tools | Tipo | Destaque |
|---|---|---|---|
| **WA MCP** (delltrak) | **63** | Open source | Baileys (WhatsApp Web) OU Meta Cloud API; mensagens, grupos, contatos, eventos em tempo real (SSE), rate limiting anti-ban |
| **Composio WhatsApp** | 17 | Hosted free tier | Templates, perfil business, mídia, botões interativos, contact cards; SOC2 |
| **Rohit678/whatsapp-mcp** | 4 | Open source (MIT) | Simples: send/read/list/search via whatsapp-web.js |

### 2.7 Outras

| Plataforma | Servidor | Nota |
|---|---|---|
| Bluesky | cameronrye/atproto-mcp (51 tools) | Open source |
| Reddit | karanb192/reddit-mcp-buddy (788⭐) | Sem API key |
| Telegram | vários | 20+ tools |

---

## 3. Serviços UNIFICADOS multi-plataforma (o atalho para automação total)

| Serviço | Tools | Plataformas | Preço | Destaque |
|---|---|---|---|---|
| **Ayrshare** | 75+ | 13+ | US$149/mês | O mais completo: posta em tudo simultaneamente, agendamento, hashtags auto, evergreen, approval workflows. Developer-first |
| **Zernio** | 480+ | 15 | Free (2 contas), $6/conta | Maior superfície de tools; agendamento, analytics, comentários |
| **Postiz** | MCP-native | 30+ | **Free (self-host)** / $29 cloud | Open source (34,5K⭐); Docker; já documentado no MazyOS |
| **Buffer** | 18 | 11 | Free tier / $5 canal | **MCP OFICIAL** (mcp.buffer.com/mcp), OAuth sem API key, fila de posts |
| **Blotato** | 14 | 10+ | $29/mês | IA-native; IG+TikTok+YT+LinkedIn+X |
| **Upload-Post** | 40 | 9 | Free tier | Open source MIT; ffmpeg embutido |
| **PostPlanify** | 22 | 10 | $29/mês | Agendamento + analytics + comentários (4 plataformas) |
| **SocialAPI.ai** | MCP-native | 8+ | Free (2 perfis, 10 posts/mês) | **Unified inbox**: comentários/DMs/mentions + reviews do Google em UMA API — "caixa social" |
| **Composio** | 250+ apps | Todos | Free tier | Hosted MCP para TikTok, WhatsApp, LinkedIn, Gmail, etc; managed auth |
| **PostWire** | — | 9 | Free tier | post_to_social único |

**Timeline do ecossistema (quando cada um lançou MCP):** nov/2024 spec da Anthropic →
2025 Ayrshare + Postiz → late 2025 Buffer (18 ops) → 2026 Oktopost, PostPlanify, Publora,
Blotato, Simplified, OpenTweet, Zernio, Fast.io, Upload-Post, SocialAPI → 04/2026 Meta
oficial (ads).

---

## 4. O que isso significa para o MazyOS-Rework (diagnóstico)

### O que já temos ✅
- Instagram completo: conexão por link, carrossel/reel/story/imagem, bio, insights
- TikTok: script Content Posting API (com limitação de auditoria)
- Agendamento: Postiz/Post for Me (docs + skill)
- MCP opcional documentado (docs/mcp-instagram.md)

### Lacunas que a pesquisa revelou ❌
| Lacuna | Oportunidade encontrada |
|---|---|
| **LinkedIn ainda manual** | quinnjr/linkedin-mcp (OAuth oficial) ou Composio/SocialAPI → publicar via MCP |
| **WhatsApp não integrado** (canal nº1 no BR!) | WA MCP (63 tools) ou Composio → responder lead, follow-up, confirmação |
| **YouTube sem integração** | anwerj/youtube-uploader-mcp (GRÁTIS) → vídeo longo/Shorts |
| **Comentários/DMs não automatizados** | meta-mcp (comentários) + SocialAPI (unified inbox) |
| **Multi-plataforma num comando** | Ayrshare/Zernio/Buffer → 1 post em 5 redes |
| **Automação nível 3 (sem você)** | n8n + MCP / cron / serviços cloud |
| **X/Twitter e Bluesky** | MCPs de comunidade (rápidos de adicionar) |
| **Caixa social unificada** (tudo num lugar) | SocialAPI.ai |

---

## 5. Plano de implementação — "Fase H: Automação Total"

### H1 — Catálogo MCP completo (docs, 1 dia)
- [ ] `docs/mcp-catalogo.md` — o mapa acima (por plataforma + unificados + preços + instalação)
- [ ] `.mcp.example.json` com **3 perfis**:
  - `starter` — meta-mcp-server (IG+Threads+FB)
  - `avançado` — + whatsapp (WA MCP) + youtube-uploader + linkedin (quinnjr)
  - `agência` — + Ayrshare ou Zernio (multi-conta)
- [ ] Atualizar `templates/ferramentas/catalogo.md` com a tabela completa

### H2 — Skill `/conectar-mcp` (guia universal, 1 dia)
- [ ] Detecta quais MCPs o usuário tem (`claude mcp list`) e guia a ativação dos perfis
- [ ] Testa cada MCP (chama um tool de listagem) e reporta status
- [ ] Explica o nível de automação que cada um desbloqueia (1/2/3)

### H3 — Skills de plataforma novas (2-3 dias)
- [ ] **`/postar-linkedin`** — via quinnjr/linkedin-mcp (OAuth) ou SocialAPI: texto/imagem/vídeo
  em perfil e página; substitui o "LinkedIn manual" do /aprovar-post
- [ ] **`/postar-youtube`** — via anwerj/youtube-uploader-mcp: upload + título/descrição/tags
  + agendamento + Shorts (grátis)
- [ ] **`/postar-whatsapp`** — via WA MCP/Composio: mensagem única, template, follow-up
  de clientes do `_memoria/clientes.md` (CRM → WhatsApp!)
- [ ] **`/responder-comentarios`** — via meta-mcp: lista comentários dos últimos posts,
  gera respostas no tom da marca (reusa lógica do /responder-avaliacoes), aprova e envia
- [ ] **`/caixa-social`** — via SocialAPI (unified inbox): mensagens/comentários/mentions
  de todas as redes numa leitura única + rascunho de resposta

### H4 — Multi-plataforma num comando (1-2 dias)
- [ ] **`/aprovar-post` v2** — opção `--redes instagram,facebook,tiktok,linkedin,x`:
  publica em todas via o unificador configurado (Ayrshare/Zernio/Buffer/Upload-Post)
- [ ] Skill `/cross-post` — pega 1 peça (carrossel/vídeo/texto) e entrega as variações
  por plataforma (tamanhos, limites, tom) + publica em todas com aprovação única

### H5 — Automação nível 3 (sem você, 2-3 dias)
- [ ] **`docs/automacao-n8n.md`** — como montar fluxos n8n (grátis, self-host ou cloud)
  que disparam: post novo no blog → publica nas redes; DM novo → responde; avaliação
  nova → avisa
- [ ] **`scripts/cron-posts.js`** — leitor do calendário (`marketing/calendario/`) que
  publica o que está marcado como `agendado` no horário (roda via cron/systemd)
- [ ] Skill **`/automacao`** — lista o que pode rodar sozinho (rotinas recorrentes),
  monta o cron/n8n correspondente e registra em `_memoria/`
- [ ] **`/weekly` automático** — opcional: gera o relatório sozinho e envia por email
  (Gmail MCP) quando configurado

### H6 — Medição unificada (1 dia)
- [ ] **`/insights-tudo`** — junta `/insta-insights` + YouTube analytics + TikTok stats +
  LinkedIn impressions (via MCPs) num único painel → alimenta `_memoria/kpi.md` e /weekly

---

## 6. Priorização recomendada

| Prioridade | Fase | Por quê |
|---|---|---|
| 🔴 1 | **H1 + H2** | Catálogo + conector universal: desbloqueia TUDO com 1 skill |
| 🔴 2 | **H3 (whatsapp + linkedin)** | WhatsApp = canal nº1 do público BR; LinkedIn fecha a lacuna mais antiga |
| 🟠 3 | **H4** | Publicar em 5 redes com 1 comando = automação visível imediata |
| 🟠 4 | **H5** | O "sem você" — n8n + cron (o que o usuário realmente quer) |
| 🟡 5 | **H3 restante + H6** | YouTube, comentários, caixa social, painel unificado |

---

## 7. Riscos e honestidade

| Risco | Mitigação |
|---|---|
| MCPs de comunidade podem quebrar (APIs mudam) | Preferir oficiais/first-party (Meta, Buffer) e serviços mantidos (Composio, Upload-Post) |
| Custo de serviços unificados (Ayrshare $149) | Caminho free primeiro: Postiz self-host + MCPs open source; unificadores só quando escalar |
| Automação nível 3 exige infra sempre-ligada | n8n self-host no mesmo lugar do Postiz; documentar cron |
| Termos de uso (LinkedIn proíbe bots não-oficiais) | Só usar caminhos OAuth autorizados (quinnjr/Composio/SocialAPI), nunca browser automation |
| WhatsApp via Baileys = risco de ban | Preferir Meta Cloud API; rate limiting; avisar no doc |
| MCP age só dentro da conversa | Combinar com agendadores (Buffer/Postiz) e orquestradores (n8n/cron) para nível 3 |

---

## 8. Fontes principais

- mallary.ai (10 melhores MCPs sociais 2026) · chatforest.com (35+ tools por plataforma)
- postplanify.com (11 melhores + timeline) · thatmarketingbuddy.com (Buffer MCP oficial)
- github: oliverames/meta-mcp-server · mikusnuz/meta-mcp · byadsco/meta-ads-mcp ·
  quinnjr/linkedin-mcp · anwerj/youtube-uploader-mcp · vanman2024/ayrshare-mcp ·
  gitroomhq/postiz-app · delltrak/WA-MCP · Rohit678/whatsapp-mcp
- composio.dev (TikTok/WhatsApp/LinkedIn toolkits) · upload-post.com · outstand.so ·
  social-api.ai · mcpmarket.com (PostWire) · usecarly.com (Claude+Buffer, nível 3)
- mcpplaygroundonline.com (catálogo 70+ remoto) · skyvia.com · ayautomate.com
