---
name: responder-comentarios
description: >
  Lê os comentários dos últimos posts do Instagram/Facebook (via meta-mcp) e gera respostas
  no tom da marca, com aprovação antes de enviar. Reusa a lógica do /responder-avaliacoes.
  Use quando o usuário disser "responder comentários", "comentários do insta", "responder
  o povo nos posts", "comentários da página", "gerenciar comentários", ou /responder-comentarios.
version: "1.0.0"
model: "*"
requires: ["meta-mcp (comentários)", "/responder-avaliacoes (lógica)"]
---

# /responder-comentarios — Gestão de comentários

Skill de engajamento: transforma comentários acumulados em respostas humanas no tom
da marca — com curadoria humana antes de enviar.

## Dependências

- **MCP:** meta-mcp-server ou meta-mcp (tools de comentários) via `/conectar-mcp`
- **Tom:** `_memoria/preferencias.md`
- **Padrão de resposta:** reusar as regras do `/responder-avaliacoes` (curto, pessoal, concreto)

## Workflow

### Passo 1 — Coletar

Via MCP, listar comentários dos últimos N posts (perguntar N ou usar 3):
- Post + texto do comentário + autor + data
- Filtrar: responder só os que merecem (pergunta, elogio, crítica) — pular "marcação de amigo"

### Passo 2 — Rascunhar

Para cada comentário escolhido, 1 resposta:
- Curta (1-2 frases), com nome do autor quando fizer sentido
- Eco do que a pessoa disse (não genérica)
- Crítica → reconhecer, não se defender, oferecer canal privado (WhatsApp)
- Pergunta → responder ou direcionar pro WhatsApp

**CHECKPOINT:** mostrar a lista comentário → resposta e pedir aprovação (pode aprovar
todas, algumas ou editar).

### Passo 3 — Enviar

Via MCP, uma por uma, registrando sucesso/falha. Falha (ex.: comentário já respondido)
→ relatar e seguir.

### Passo 4 — Registrar

- Resumo: N respondidos, M ignorados (motivo)
- Se alguma resposta gerou interesse de compra → sugerir registrar em `_memoria/clientes.md`

## Regras

- Nunca responder no automático sem curadoria humana (erro público é caro)
- Não prometer o que não depende da empresa
- Sem "obrigado pelo feedback" genérico — ecoar algo específico
- Críticas: responder em privado (WhatsApp/DM) após reconhecer publicamente
- Marcações de amigos e spam: ignorar (não responder)

## Quality gate — antes de declarar concluído

- [ ] Comentários coletados via MCP (posts reais)
- [ ] Rascunhos no tom da marca (1 por comentário, sem genérico)
- [ ] Aprovação humana obtida
- [ ] Envios confirmados (sucesso/falha relatados)
- [ ] Leads identificados registrados no CRM
