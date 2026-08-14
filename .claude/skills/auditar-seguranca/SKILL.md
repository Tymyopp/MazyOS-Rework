---
name: auditar-seguranca
description: >
  Auditoria de segurança do projeto MazyOS: roda validate-skills.sh (frontmatter, paridade,
  segredos, guard de leak), verifica .env/.gitignore, revisa dependências e entrega um
  relatório de risco com prioridades. Inspirado na skill security-audit do The-ALL.
  Use quando o usuário disser "auditar segurança", "auditoria", "verificar segurança",
  "check de segurança", "está seguro", "riscos", "guard de leak", ou /auditar-seguranca.
version: "1.0.0"
model: "*"
requires: ["scripts/validate-skills.sh", "SECURITY.md"]
---

# /auditar-seguranca — Auditoria de segurança

Skill de verificação: o "ci-check.sh" do MazyOS, com leitura de riscos e prioridades.

## Dependências

- **Script:** `scripts/validate-skills.sh` (6 verificações, incl. guard de leak)
- **Referência:** `SECURITY.md` (áreas de risco documentadas)

## Workflow

### Passo 1 — Rodar a validação completa

```bash
bash scripts/validate-skills.sh
```

### Passo 2 — Verificações extras

- [ ] `.gitignore` cobre `.env`, `.env.*`, `*.pem`, `*.key`, `*.session`, `.local/`, `.mcp.json`
- [ ] Nenhum `.mcp.json` com token no env está versionado (`git ls-files | grep mcp`)
- [ ] `.local/` não tem arquivos rastreados
- [ ] Remote do git aponta para o repo certo (`git remote -v`)
- [ ] GitHub: secret-scan ativo? (recomendar workflow se não houver)
- [ ] Chaves de API rotacionadas nos últimos 90 dias? (perguntar)

### Passo 3 — Relatório

```
🛡️ AUDITORIA DE SEGURANÇA — <data>

Validação: ✓/✗ (detalhe das 6 verificações)

Riscos encontrados:
🔴 [nenhum | descrição]
🟠 ...
🟡 ...

Recomendações (prioridade):
1. ...
```

Salvar em `saidas/auditoria-seguranca-<data>.md`.

## Regras

- Nunca exibir valores de credenciais — só presença/ausência
- Não rodar comandos destrutivos (git filter-repo etc.) sem aprovação explícita
- Se o guard de leak apontar token real: parar e orientar rotação + limpeza
- Reportar o que existe, não o que "deveria" existir sem evidência

## Quality gate — antes de declarar concluído

- [ ] validate-skills.sh rodou (6/6 verificações)
- [ ] Extras verificados (.gitignore, .mcp.json, remote, .local)
- [ ] Relatório com riscos priorizados salvo em saidas/
- [ ] Nenhuma credencial exibida
