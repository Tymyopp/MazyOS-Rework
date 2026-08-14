---
name: conectar-mcp
description: >
  Conecta e testa servidores MCP de redes sociais no MazyOS: detecta o que está instalado
  (claude mcp list), guia a ativação dos perfis (starter/avancado/agencia), testa cada
  servidor com um tool de listagem e reporta status. Use quando o usuário disser
  "conectar mcp", "ativar mcp", "mcp", "conectar whatsapp", "conectar linkedin",
  "conectar youtube", "configurar integrações", "quais mcp tenho", ou /conectar-mcp.
version: "1.0.0"
model: "*"
requires: ["claude-code (mcp)", ".mcp.example.*.json", "docs/mcp-catalogo.md"]
---

# /conectar-mcp — Conector universal de MCPs

Skill de integração: transforma o catálogo de MCPs (`docs/mcp-catalogo.md`) em ação —
ativa o perfil certo, testa cada servidor e confirma o que está funcionando.

## Dependências

- **Catálogo:** `docs/mcp-catalogo.md` (o que instalar e por quê)
- **Perfis:** `.mcp.example.{starter,avancado,agencia}.json`
- **Credenciais:** `.env` (variáveis documentadas no catálogo)
- **Cliente:** Claude Code (`claude mcp list` / `.mcp.json`)

## Workflow

### Passo 1 — Detectar o que já existe

Rodar `claude mcp list` (ou ler `.mcp.json`). Reportar:

```
Servidores MCP detectados:
✓ meta (npx) — [conectado/erro]
✗ whatsapp — não instalado
...
```

### Passo 2 — Escolher o perfil

Perguntar o perfil (ou sugerir pelo contexto):
1. **starter** — 1 negócio, grátis: Meta (IG/Threads/FB) + WhatsApp
2. **avancado** — criador solo: + YouTube + LinkedIn
3. **agencia** — multi-cliente: + Ayrshare/Zernio + n8n

Copiar o exemplo correspondente:

```bash
cp .mcp.example.<perfil>.json .mcp.json
```

Preencher no `.env` as credenciais que faltarem (apontar o catálogo).

### Passo 3 — Testar cada servidor

Para cada servidor, chamar UM tool de listagem (ex.: `meta_list_pages` do meta-mcp-server;
`list_chats` do WhatsApp; `get_linkedin_profile` do LinkedIn; `channels` do YouTube) e
reportar:

```
✓ meta — conectado (páginas: N)
✗ whatsapp — falha: token ausente → preencher WHATSAPP_TOKEN no .env
```

### Passo 4 — Registrar e orientar

- Registrar os MCPs ativos em `_memoria/empresa.md` (Ferramentas)
- Explicar o **nível de automação** desbloqueado (1 conversa / 2 agenda / 3 autônomo)
- Apontar as skills que usam cada MCP: `/postar-whatsapp`, `/postar-linkedin`,
  `/postar-youtube`, `/responder-comentarios`, `/caixa-social`, `/cross-post`
- Para nível 3: orientar `docs/automacao-n8n.md` + `scripts/cron-posts.js`

## Regras

- Nunca inventar servidor conectado — testar de verdade ou dizer "não testado"
- Não commitar `.mcp.json` com tokens (usar variáveis `${VAR}`)
- Preferir canais oficiais (Meta Cloud API no WhatsApp; OAuth no LinkedIn)
- Se um MCP de comunidade falhar, sugerir alternativa do catálogo

## Quality gate — antes de declarar concluído

- [ ] `claude mcp list` (ou `.mcp.json`) verificado
- [ ] Perfil escolhido e copiado (starter/avancado/agencia)
- [ ] Cada servidor testado com tool real (ou falha diagnosticada)
- [ ] `.env` com credenciais (sem expor valores no chat)
- [ ] Registro em `_memoria/empresa.md` + nível de automação explicado
