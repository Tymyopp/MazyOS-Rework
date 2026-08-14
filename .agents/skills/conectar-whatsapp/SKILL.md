---
name: conectar-whatsapp
description: >
  Conecta o WhatsApp ao MazyOS usando o gateway OpenWA: cria a sessão, obtém o QR code,
  orienta o scan, confirma o status (ready) e testa um envio. Roda na máquina/VPS do
  usuário (Docker). Use quando o usuário disser "conectar whatsapp", "qr do whatsapp",
  "vincular whatsapp", "conectar meu zap", "whatsapp gateway", "openwa", ou /conectar-whatsapp.
version: "1.0.0"
model: "*"
requires: ["openwa (docker ou node 22)", ".env (OPENWA_URL, OPENWA_API_KEY)", "scripts/whatsapp-openwa.js"]
---

# /conectar-whatsapp — Conexão via OpenWA

Skill de integração: conecta o número do usuário ao MazyOS pelo gateway OpenWA
(recomendado — veja `docs/openwa-integracao.md`). Substitui o fluxo caseiro frágil.

## Dependências

- **Gateway:** OpenWA rodando (Docker recomendado — 2 comandos) na máquina/VPS do usuário
- **Env:** `OPENWA_URL` (padrão http://localhost:2785) e `OPENWA_API_KEY`
- **Script:** `scripts/whatsapp-openwa.js` (cliente REST, fetch nativo)
- **Aviso:** usar número dedicado (não o pessoal) — risco de ban é real

## Workflow

### Passo 1 — Pré-checagem

1. `OPENWA_URL`/`OPENWA_API_KEY` no `.env`? Faltando → orientar setup do OpenWA
   (`docs/openwa-integracao.md` — clone + docker compose up) e parar
2. Testar: `node --env-file=.env scripts/whatsapp-openwa.js listar` (conexão com o gateway)

### Passo 2 — Criar sessão

```bash
node --env-file=.env scripts/whatsapp-openwa.js criar-sessao <nome-do-negocio> [--engine wwjs]
```

- Sugerir engine `wwjs` (menor risco de ban; `baileys` = menos RAM)
- Avisar: **número dedicado**, nunca o pessoal

### Passo 3 — QR

```bash
node --env-file=.env scripts/whatsapp-openwa.js qr <nome> --salvar wa-qr.png
```

- Abrir o PNG para o usuário escanear (WhatsApp → Aparelhos conectados → Conectar)
- Se expirou (~20s), reexecutar; o QR é refeito via API

### Passo 4 — Confirmar

```bash
node --env-file=.env scripts/whatsapp-openwa.js status <nome>
```

- Aguardar até `ready` (polling a cada 5s, máx ~2 min)
- Falha → relatar o status (ex.: `action_required`, `failed`) e consultar o troubleshooting do OpenWA

### Passo 5 — Teste + registro

- Teste: `enviar <nome> <numero-do-usuario> "Teste do MazyOS ✓"` (perguntar o número)
- Registrar em `_memoria/empresa.md` (Ferramentas: `WhatsApp via OpenWA (sessão <nome>)`)
- Orientar: MCP nativo opcional (`.mcp.json` com `POST /mcp` — 51 tools, read-only por padrão)

## Regras

- Nunca conectar número pessoal sem avisar o risco (usar número dedicado)
- Não mandar mensagens sem aprovação do texto
- Respeitar guardrails do OpenWA (sem disparo em massa, aquecimento)
- Se o gateway não estiver no ar, não inventar sessão — orientar o setup

## Quality gate — antes de declarar concluído

- [ ] OpenWA acessível (listar respondeu)
- [ ] Sessão criada e QR escaneado
- [ ] Status `ready` confirmado
- [ ] Envio de teste aprovado e confirmado
- [ ] Registro em _memoria/empresa.md
