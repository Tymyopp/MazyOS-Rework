# 📱 OpenWA — Gateway oficial de WhatsApp do MazyOS (análise + integração)

> **Análise completa do [OpenWA](https://github.com/rmyndharis/OpenWA) (v0.18.0, MIT)** —
> comparado com a forma anterior (script Baileys caseiro) — e como o MazyOS passou a usá-lo.
> **Decisão: OpenWA é o caminho recomendado para WhatsApp.** O script caseiro vira fallback.

---

## 1. O que é o OpenWA

**Gateway de API do WhatsApp, 100% open source (MIT), construído em NestJS + TypeScript,**
com **1.491 arquivos**, 30 documentos técnicos, CI/CD, Helm chart e Docker nativo.

| Camada | O que entrega |
|---|---|
| **REST API** | Sessões (multi), mensagens (texto/mídia/reações/edição/bulk), grupos, contatos, labels, status, webhooks com HMAC |
| **Dashboard** | UI React para gerenciar sessões, webhooks e API keys |
| **2 engines** | `whatsapp-web.js` (padrão — headless Chromium, menor risco de ban) e `baileys` (socket, menos RAM) |
| **MCP nativo** | `POST /mcp` com **51 tools** (opt-in) — o agente conversa com o WhatsApp direto |
| **Auth** | API keys com papéis (ADMIN/OPERATOR/VIEWER), escopo por sessão/IP, rate limiting |
| **Extras** | Plugins (Chatwoot, Typebot), n8n, multitenancy, S3/SQLite/Postgres/Redis plugáveis |

---

## 2. Comparação: OpenWA vs forma anterior (Baileys caseiro)

| Critério | ❌ Script caseiro (anterior) | ✅ OpenWA |
|---|---|---|
| **QR code** | PNG local, expira a cada 20-30s, processo frágil (morreu no ambiente) | API `GET /sessions/:id/qr` + dashboard; sessão persiste e auto-inicia |
| **Risco de ban** | Baileys (mais fácil de detectar) | **Escolha por sessão**: `wwjs` (menor risco, Chromium real) ou `baileys` |
| **Envio** | 1 endpoint caseiro, sem validação | API completa: texto, mídia, template, bulk, reações, citações, preview |
| **Recebimento** | só logava no console | Webhooks com assinatura HMAC + filtros — eventos reais p/ n8n |
| **Multi-sessão** | 1 conta | Várias sessões por instância |
| **Segurança** | token fixo no código | API keys com papéis + escopo por sessão/IP + rate limit |
| **MCP** | não tinha | **51 tools nativos** (`POST /mcp`, read-only por padrão) |
| **Dashboard** | não tinha | UI completa |
| **Manutenção** | ~130 linhas minhas | Projeto maduro, CI, 30 docs, updates |
| **Onde roda** | sandbox frágil | **Docker (recomendado)** ou Node 22 — na máquina/VPS do usuário |

**Veredito:** o OpenWA resolve exatamente o que falhou antes (QR frágil, processo morto)
e adiciona MCP nativo, webhooks, multi-sessão e segurança — sem custo.

> ⚠️ **Limitação honesta:** o OpenWA **não compila neste sandbox** (requer Node 22 +
> build nativo `better-sqlite3`; o sandbox tem Node 20 e 1,9 GB de RAM). Ele roda na
> **máquina do usuário** (Docker = 2 comandos) ou num VPS. Os scripts/skills do MazyOS
> falam com ele por HTTP — funcionam de qualquer lugar.

---

## 2.5 Bootstrap em 1 comando (recomendado)

O MazyOS inclui um instalador automatizado que cuida de tudo (Node 22 local OU Docker,
clone, .env, build, sessão e QR):

```bash
./scripts/instalar-openwa.sh                 # instala + inicia + cria sessão + QR
./scripts/instalar-openwa.sh --qr meunegocio # re-gera o QR (expira ~20s)
```

- **Na sua máquina/VPS:** roda direto (usa Docker se tiver, senão Node 22 local).
- **Em sandbox/ambiente limitado:** funciona, mas lembre que processos e `node_modules`
  **não persistem** entre sessões — para uso contínuo, rode na sua máquina.

## 3. Como rodar o OpenWA (2 caminhos)

### Opção A — Docker (recomendado, 2 comandos)

```bash
git clone https://github.com/rmyndharis/OpenWA.git
cd OpenWA
cp .env.example .env   # ajustar se preciso
docker compose up -d   # API na porta 2785 + dashboard
```

### Opção B — Node 22 (bare metal)

```bash
# requer Node 22 LTS (nvm use 22)
npm install
npm run build
npm run start:prod     # porta 2785
```

**Dashboard:** `http://localhost:2785/dashboard` · **Swagger:** `http://localhost:2785/docs`

---

## 4. Conectar o WhatsApp (fluxo com o MazyOS)

```bash
# 1. No .env do MazyOS:
#    OPENWA_URL=http://localhost:2785
#    OPENWA_API_KEY=<chave criada no dashboard/setup do OpenWA>

# 2. Criar a sessão + pegar o QR (via script do MazyOS)
node --env-file=.env scripts/whatsapp-openwa.js criar-sessao meunegocio
node --env-file=.env scripts/whatsapp-openwa.js qr meunegocio --salvar wa-qr.png
#    → escanear com o celular (WhatsApp → Aparelhos conectados → Conectar)

# 3. Confirmar
node --env-file=.env scripts/whatsapp-openwa.js status meunegocio

# 4. Testar envio
node --env-file=.env scripts/whatsapp-openwa.js enviar meunegocio 5588999999999 "Oi! Teste do MazyOS"
```

**Ou pela skill:** `/conectar-whatsapp` (faz tudo isso guiado, com QR salvo e apresentado).

**Engines:** por padrão `wwjs` (menor risco de ban). Para trocar: `--engine baileys`
(menos RAM) ou config no dashboard.

---

## 5. Integração MCP nativa (51 tools)

O OpenWA expõe **`POST /mcp`** (Streamable HTTP) no mesmo servidor:

```json
// .mcp.json (no MazyOS)
{
  "mcpServers": {
    "openwa": {
      "url": "http://localhost:2785/mcp",
      "headers": { "X-API-Key": "${OPENWA_API_KEY}" }
    }
  }
}
```

**Por padrão é READ-ONLY** (seguro). Para permitir escrita: `MCP_READONLY=false`
no `.env` do OpenWA. Tools incluem: `ContactCheckNumber`, `MessageSendText`,
`ChatFindAll`, `GroupCreate`, `LabelFindAll`, `AutomationRuleFindAll` etc.

> Com o MCP ativo, a skill `/postar-whatsapp` pode chamar `MessageSendText` direto;
> sem MCP, usa o script REST `whatsapp-openwa.js`. Mesma lógica, dois transportes.

---

## 6. Guardrails de segurança (do próprio OpenWA — respeitar)

1. **Nunca conectar o número pessoal/principal** — use um número dedicado
2. **Aquecer o número** (primeiros dias: conversas normais, sem disparo em massa)
3. **Não mandar mensagem fria em lote** para desconhecidos — maior causa de restrição
4. **Rate limit:** poucas mensagens/minuto por sessão (configurável)
5. **Workloads seguros:** respostas, OTP, atualização de pedido, suporte (opt-in)
6. **Fallback oficial** para algo crítico: Meta Cloud API (o MCP catálogo tem o caminho)
7. **Compliance (saúde/finanças/EU):** não usar — ir de Meta Cloud API

---

## 7. Estado no MazyOS

| Item | Status |
|---|---|
| `scripts/whatsapp-openwa.js` | ✅ cliente REST (criar-sessao, qr, status, enviar, listar) |
| `/conectar-whatsapp` | ✅ skill guiada (OpenWA) — QR, confirmação, teste |
| `/postar-whatsapp` | ✅ atualizada — canal A: OpenWA · canal B: fallback caseiro |
| `docs/openwa-integracao.md` | ✅ este documento |
| `scripts/instalar-openwa.sh` | ✅ bootstrap em 1 comando (Docker ou Node 22 local) |
| `.env.example` | ✅ `OPENWA_URL`, `OPENWA_API_KEY`, `OPENWA_ENGINE` |
| Script caseiro (`whatsapp-servico.js`) | mantido como fallback (não recomendado) |
