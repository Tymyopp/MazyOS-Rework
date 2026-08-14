---
name: email-sequencia
description: >
  Cria sequências de email automatizadas (boas-vindas, nutrição, recuperação de carrinho,
  reactivação) com 3-6 emails: assunto, preview, corpo e CTA. Use quando o usuário disser
  "sequência de emails", "email de boas-vindas", "nutrição por email", "carrinho abandonado",
  "sequência de 5 emails", "email automático", ou /email-sequencia.
version: "1.0.0"
model: "*"
requires: ["_memoria/preferencias.md", "gmail-mcp (opcional, para agendar)"]
---

# /email-sequencia — Sequências de email

Skill de retenção e conversão: transforma um objetivo em sequência pronta de emails,
do assunto ao CTA, no tom da marca.

## Dependências

- **Contexto:** `_memoria/empresa.md`, `_memoria/preferencias.md`
- **Ofertas:** `_memoria/estrategia.md` (o que está em foco)
- **Output:** `marketing/emails/sequencia-<tipo>-<YYYY-MM-DD>.md`

## Workflow

### Passo 1 — Identificar o tipo de sequência

Perguntar (ou inferir):

| Tipo | Objetivo | Emails |
|---|---|---|
| Boas-vindas | Apresentar e ativar novo contato | 3-4 |
| Nutrição | Educar até a compra | 4-6 |
| Carrinho abandonado | Recuperar venda em andamento | 3 |
| Reactivação | Trazer cliente inativo de volta | 3 |

Se não ficou claro, perguntar: "Qual o objetivo da sequência? (ativar novo contato,
educar até comprar, recuperar carrinho, reativar inativo)"

### Passo 2 — Coletar contexto

1. Qual é a oferta/CTA final? (produto, serviço, desconto)
2. Quem recebe? (novo lead, cliente, carrinho)
3. Tem gatilho conhecido? (cadastro, abandono, compra antiga)

### Passo 3 — Desenhar a sequência

Para CADA email, entregar:
- **Disparo:** quando envia (ex: "dia 0 — imediato", "dia 3")
- **Assunto:** direto, sem clicbait, com curiosidade ou benefício (3 opções)
- **Preview text:** 1 linha complementar
- **Corpo:** 80-150 palavras, um objetivo por email
- **CTA único** por email (link, botão, WhatsApp)

**Arco da sequência:**
1. Entrega valor (não pede nada) — 2. Aprofunda o problema — 3. Apresenta a solução —
4. Prova social/caso — 5. Oferta + urgência honesta — 6. Última chamada (se aplicável)

### Passo 4 — Salvar

Salvar em `marketing/emails/sequencia-<tipo>-<YYYY-MM-DD>.md` com:
- Tabela-resumo (email, disparo, assunto, objetivo)
- Corpos completos
- Configuração: se Gmail MCP estiver conectado, oferecer criar os rascunhos;
  senão, instruir o cadastro na plataforma de email (Mailchimp, RD, Brevo etc.)

## Regras

- Um CTA por email. Nunca dois pedidos brigando
- Assunto específico e descritivo — nunca "Seguimento" ou "Promoção"
- Urgência honesta: sem contagem regressiva falsa
- Tom segue `_memoria/preferencias.md` estritamente
- Se a empresa não tem plataforma de email, avisar e sugerir uma gratuita

## Quality gate — antes de declarar concluído

- [ ] Sequência tem arco completo (valor → problema → solução → prova → oferta)
- [ ] Cada email: assunto (3 opções), preview, corpo e CTA único
- [ ] Disparo definido por email (dia/hora ou gatilho)
- [ ] Salvo em marketing/emails/ com data
- [ ] Sem urgência falsa, sem clicbait
