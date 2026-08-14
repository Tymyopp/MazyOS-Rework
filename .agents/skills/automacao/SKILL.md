---
name: automacao
description: >
  Configura automação nível 3 (roda sozinho): identifica rotinas recorrentes, monta o
  cron ou fluxos n8n correspondentes, testa com dados falsos e registra. Cobre: publicar
  do calendário, follow-up de clientes, relatório semanal, avisos de avaliação.
  Use quando o usuário disser "automatizar", "rodar sozinho", "automação", "deixar automático",
  "o que pode rodar sem mim", "agendar tarefas", ou /automacao.
version: "1.0.0"
model: "*"
requires: ["scripts/cron-posts.js", "docs/automacao-n8n.md", "n8n ou cron"]
---

# /automacao — Automação nível 3

Skill de autonomia: descobre o que pode rodar sem o usuário, monta e testa.

## Dependências

- **Script:** `scripts/cron-posts.js` (publica o calendário)
- **Guia:** `docs/automacao-n8n.md` (fluxos prontos)
- **Infra:** n8n (Docker) ou cron do sistema

## Workflow

### Passo 1 — Levantar rotinas

Varrer o contexto e propor o que dá pra automatizar:

| Rotina | Frequência | Ferramenta | Publica? |
|---|---|---|---|
| Publicar itens `agendado` do calendário | diária 9h | cron-posts.js | Sim (conteúdo aprovado antes) |
| Follow-up de clientes com "seguir em" vencido | diária 10h | WhatsApp (template aprovado) | Não (mensagem) |
| Aviso de avaliação nova | tempo real | n8n webhook | Não (aviso) |
| Relatório semanal | segunda 8h | /weekly + email | Não (relatório) |
| Resposta a DM/comentário | tempo real | n8n + MCP | Condicional (template) |

Marcar quais exigem **aprovação humana** (publicar) e quais podem ser **automáticos** (avisar).

### Passo 2 — Configurar

- **Cron:** montar o `crontab` (ou instruir no Windows) usando `scripts/cron-posts.js`
  e os comandos das rotinas aprovadas
- **n8n:** guiar a criação dos fluxos pelos exemplos de `docs/automacao-n8n.md`
  (post novo → redes; DM → resposta; avaliação → aviso; weekly → email)

### Passo 3 — Testar

- Rodar cada rotina **com dados falsos/`--lista`** antes de soltar
- `node --env-file=.env scripts/cron-posts.js --lista` (mostra o que publicaria)
- Confirmar logs em `.local/`

### Passo 4 — Registrar

- `_memoria/empresa.md` → "Automações ativas: [lista]"
- `_memoria/tarefas.md` → revisão mensal das automações (1 tarefa)
- Avisar: publicações automáticas só rodam com conteúdo marcado `agendado` (aprovado antes)

## Regras

- **Publicar = conteúdo pré-aprovado (agendado) — nunca gerar e publicar sozinho**
- Avisos/relatórios podem ser 100% automáticos
- Testar sempre com `--lista` ou dados falsos antes
- Logs em `.local/` (fora do git)
- Revisão mensal das automações (o que parou de funcionar, o que mudar)

## Quality gate — antes de declarar concluído

- [ ] Rotinas levantadas e classificadas (com/sem aprovação)
- [ ] Cron ou n8n configurados conforme o guia
- [ ] Teste com --lista / dados falsos feito
- [ ] Automações registradas em _memoria/empresa.md
- [ ] Tarefa de revisão mensal criada
