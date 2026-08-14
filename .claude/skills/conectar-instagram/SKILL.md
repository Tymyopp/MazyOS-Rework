---
name: conectar-instagram
description: >
  Conecta a conta do Instagram ao MazyOS por link de autorização (OAuth). Gera o link,
  guia o usuário a autorizar, troca o code por token long-lived (~60 dias), salva em
  .local/insta-auth.json (fora do git) e confirma a conta conectada. Use quando o usuário
  disser "conectar instagram", "conectar minha conta do insta", "dar acesso ao instagram",
  "conectar rede social", "link de autorização do instagram", "quero que você poste no meu
  insta", "configurar instagram", ou /conectar-instagram.
version: "1.0.0"
model: "*"
requires: ["node 20+", ".env (META_APP_ID, META_APP_SECRET)", "docs/automacao-meta-setup.md"]
---

# /conectar-instagram — Conexão por link

Skill de integração: em ~15 min (primeira vez), a IA ganha acesso de publicação à conta
do usuário — via fluxo OAuth por link, sem o usuário colar token à mão.

## Dependências

- **Script:** `scripts/insta-conectar.js` (Node 20+, fetch nativo)
- **Guia de setup:** `docs/automacao-meta-setup.md` (criar o Meta App — uma única vez)
- **Credenciais:** `META_APP_ID`, `META_APP_SECRET`, `META_REDIRECT_URI` no `.env`
- **Armazenamento:** `.local/insta-auth.json` (permissão 600, ignorado pelo git)
- **Consumido por:** `/aprovar-post` (publica carrossel usando o token salvo)

## Workflow

### Passo 1 — Pré-checagem

1. Conferir se `.env` tem `META_APP_ID` e `META_APP_SECRET` (ler sem expor valores).
   - Faltando → apontar para `docs/automacao-meta-setup.md` e guiar os passos 1-4
     (criar app, adicionar tester, registrar redirect URI, preencher .env).
2. Perguntar (se não souber): a conta é **profissional (Business/Creator) e pública**?
   - Não → orientar conversão no app do Instagram (2 min) antes de continuar.
3. Se já existe `.local/insta-auth.json` e o token está válido, avisar:
   "Já existe uma conexão (@user, expira em N dias)" e perguntar se quer reconectar.

### Passo 2 — Gerar o link

Rodar:

```bash
node --env-file=.env scripts/insta-conectar.js conectar
```

Entregar o **link de autorização** ao usuário com instruções claras (uma por vez):
1. Abrir o link logado na conta do Instagram
2. Autorizar o app e selecionar a conta Business/Creator
3. Copiar a **URL completa** da barra de endereço (contém `?code=...`)

> Se o usuário roda o Claude Code na própria máquina, oferecer o fluxo `--loopback`
> (o script captura o code sozinho). Em ambiente remoto (como agentes na nuvem),
> usar o fluxo copy-paste.

### Passo 3 — Trocar o code por token

Ao receber o code/URL, rodar:

```bash
node --env-file=.env scripts/insta-conectar.js trocar "<CODE-OU-URL-COMPLETA>"
```

- Se falhar (code expirado, redirect errado), consultar a tabela de erros do
  `docs/automacao-meta-setup.md` e orientar.

### Passo 4 — Confirmar

```bash
node --env-file=.env scripts/insta-conectar.js status
```

Mostrar o resumo: `✓ Instagram @usuario conectado · token expira em N dias`.

### Passo 5 — Registrar e agendar manutenção

- Perguntar se quer registrar em `_memoria/empresa.md` (linha em "Ferramentas":
  `Instagram conectado via API (@usuario) — token 60 dias, renovar <30 dias`).
- Avisar: **a renovação é automática ao publicar** (se faltar <7 dias), mas rodar
  `renovar` mensalmente (ou quando o `/daily` avisar) evita surpresa.
- Sugerir: primeiro teste com `/carrossel` + `/aprovar-post`.

## Regras

- **Nunca imprimir o token completo** — só mascarado (6 primeiros + 4 últimos)
- Nunca colar o token em arquivo do repo — o script salva em `.local/` (fora do git)
- Conta pessoal ou privada → parar e orientar conversão antes de gerar o link
- Não prometer edição de bio via API (não é possível) — apontar `/bio-instagram`
- Se o usuário não souber criar o Meta App, guiar pelo doc passo a passo (não pular)
- Em caso de erro da Meta, mostrar a mensagem da API + a linha correspondente da tabela de erros

## Quality gate — antes de declarar concluído

- [ ] `.env` com META_APP_ID/META_APP_SECRET (e redirect URI) ou usuário guiado no setup
- [ ] Conta confirmada como profissional e pública (ou orientação dada)
- [ ] Link de autorização gerado e entregue
- [ ] Code trocado por token long-lived e salvo em `.local/insta-auth.json` (fora do git)
- [ ] `status` confirma a conta conectada (@username)
- [ ] Token nunca exibido completo em lugar nenhum
- [ ] Registro em `_memoria/empresa.md` (se o usuário aceitar) + aviso de renovação
