# MCP do Instagram — ativação opcional (Fase 4)

> O MazyOS já publica com scripts próprios (`/conectar-instagram` + `postar-instagram.js`).
> O MCP é um **upgrade opcional**: dá à IA dezenas de ferramentas de leitura/escrita
> (posts, Reels, Stories, comentários, DMs, insights, Threads) num único comando.

## O que é MCP

MCP (Model Context Protocol) é o padrão aberto que conecta agentes de IA (Claude,
Cursor, Codex...) a ferramentas externas. Um "MCP server do Instagram" expõe as APIs
da Meta como ferramentas que a IA chama naturalmente ("posta esse Reel", "quais foram
os insights da semana?").

## Opções pesquisadas (13/08/2026)

| Projeto | Tools | Destaque | Como instalar |
|---|---|---|---|
| **meta-mcp-server** (oliverames) | 200+ | Meta completo: FB Pages, IG, Threads, Ads, Commerce, Insights | `npx -y meta-mcp-server` |
| **meta-mcp** (mikusnuz) | 57 | IG + Threads: foto, vídeo, carrossel, Reel, Story, comentários, insights (Graph v25) | repo: git clone + build |
| **instagram-mcp** (AleemHaider) | 24 | Publicação, comentários, DMs, insights | `pip install instagram-mcp` |
| **supercorp-ai/instagram-mcp** | 4 | **`auth_url` gera o link de login + `exchange_auth_code`** (mesmo fluxo do /conectar-instagram) | repo: git clone + build |
| **Meta oficial** (mcp.facebook.com/ads) | 29 | MCP first-party da Meta (foco em anúncios) | configurar no cliente MCP |

**Recomendação:** `meta-mcp-server` (via npx) — o mais completo e sem build manual.
Para quem só quer o fluxo por link: `supercorp-ai/instagram-mcp`.

## Como ativar

1. Copie o exemplo:

```bash
cp .mcp.example.json .mcp.json
```

2. Ajuste conforme o servidor escolhido (ver README do projeto). Para o
   `meta-mcp-server`, o token vem do `.env` (`META_PAGE_ACCESS_TOKEN`) — o mesmo da
   conexão feita por `/conectar-instagram` (ou copie o token de `.local/insta-auth.json`).

3. O Claude Code detecta `.mcp.json` ao abrir o projeto e a IA passa a ter as
   ferramentas disponíveis. Teste com: "liste as ferramentas do Instagram".

> ⚠️ `.mcp.json` com token no `env` é sensível: **não commitar**. O `.gitignore`
> do repo não o ignora por padrão — adicione `.mcp.json` ao seu `.gitignore` local
> se for preencher o token nele, ou use variáveis `${VAR}` que o Claude Code resolve.

## O que você ganha (exemplos)

- "Publica esse carrossel" (fotos, carrossel 2-10, Reel, Story — com alt text)
- "Responde os comentários do post X"
- "Manda DM de agradecimento pra quem comentou"
- "Me dá os insights dos últimos 7 dias" (alcance, engajamento, seguidores)
- "Publica isso também no Threads"

## Quando NÃO precisa

- Se o seu uso é só publicar carrosséis/posts com legenda → `/aprovar-post` + scripts
  já resolvem, sem MCP.
- Se prefere zero configuração extra → mantenha só os scripts.

## Segurança

- Os MCPs rodam localmente e usam o SEU token (mesma permissão do `/conectar-instagram`)
- Conta continua sendo Business/Creator pública; escopos iguais
- Revogar: desconectar no `/conectar-instagram` ou no painel da Meta
