---
name: cliente
description: >
  Registra ou atualiza clientes no CRM mínimo do MazyOS (_memoria/clientes.md):
  quem pediu, o que comprou, valor, e quando seguir. Use quando o usuário disser
  "registrar cliente", "cadastrar cliente", "anota o cliente", "quem comprou",
  "quando devo seguir com fulano", "lista de clientes", ou /cliente.
version: "1.0.0"
model: "*"
requires: ["_memoria/clientes.md"]
---

# /cliente — CRM mínimo

Skill de operação: mantém o registro de clientes simples, no arquivo, sem sistema.
É o elo que fecha o loop: marketing gera lead → lead vira cliente → cliente vira
histórico → histórico vira follow-up e recompra.

## Dependências

- **Arquivo:** `_memoria/clientes.md` (criar com o template se não existir)
- **Contexto:** `_memoria/empresa.md`
- **Relatórios:** consumido por /relatorio-ads e /analytics pra cruzar gasto × retorno

## Workflow

### Passo 1 — Coletar (mínimo)

1. Nome do cliente (e empresa, se for B2B)
2. O que comprou/contratou
3. Valor (se souber)
4. Data
5. Próximo contato (quando seguir: ex "seguir em 30 dias", "aniversário em outubro")

Se o usuário colar uma conversa/print, extrair daí. Nunca inventar dado.

### Passo 2 — Atualizar o arquivo

Adicionar/editar a linha no formato:

```markdown
| Nome | Contato | O que comprou | Valor | Data | Seguir em |
|---|---|---|---|---|---|
| Maria | (88) 9.... | Bolo 2kg | R$ 180 | 2026-08-13 | 30 dias |
```

Regras:
- Uma linha por compra (histórico cresce, não sobrescreve)
- Ordenar por data da última compra
- Sem dados sensíveis além do necessário (nome + contato de trabalho)

### Passo 3 — Confirmar e sugerir

Mostrar a linha adicionada e perguntar se quer já criar o follow-up
(usar /email-profissional ou /email-sequencia se fizer sentido).

## Regras

- Nunca inventar compra, valor ou data — só registrar o que o usuário informou
- Não sobrescrever histórico: adicionar linha nova
- Se o cliente já existe, atualizar só o "Seguir em" + adicionar a compra
- Arquivo é simples o suficiente pra editar à mão a qualquer momento

## Quality gate — antes de declarar concluído

- [ ] Linha adicionada com: nome, o que comprou, valor, data, próximo contato
- [ ] Histórico preservado (linha nova, não sobrescrita)
- [ ] Nada inventado — tudo veio do usuário ou de conversa real
- [ ] _memoria/clientes.md criado com template se não existia
