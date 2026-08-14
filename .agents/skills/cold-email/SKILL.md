---
name: cold-email
description: >
  Cria emails de prospecção fria (outreach B2B) com pesquisa do prospect e personalização:
  abertura específica, dor reconhecida, proposta em 1 frase, CTA único. Gera variantes A/B.
  Use quando o usuário disser "cold email", "outreach", "prospecção por email",
  "email pra prospectar", "primeiro contato com empresa", ou /cold-email.
version: "1.0.0"
model: "*"
requires: ["web_search", "_memoria/empresa.md"]
---

# /cold-email — Prospecção fria

Skill de aquisição: email de primeiro contato que parece escrito pra aquela pessoa
(porque foi). Curto, específico, sem enrolação.

## Dependências

- **Contexto:** `_memoria/empresa.md` (o que você vende, diferenciais reais)
- **Tom:** `_memoria/preferencias.md`
- **Pesquisa:** WebSearch/WebFetch (sobre o prospect)
- **Output:** `marketing/emails/cold-<alvo>-<YYYY-MM-DD>.md`

## Workflow

### Passo 1 — Briefing

1. Quem é o prospect? (empresa, cargo, nome se tiver)
2. O que você quer: reunião, demo, resposta, indicação?
3. O que você entrega que resolve uma dor real desse perfil?

### Passo 2 — Pesquisar o prospect

- WebSearch: "empresa" + setor/notícias recentes
- Procurar 1-2 fatos concretos pra usar na abertura (lançamento, vaga aberta,
  mudança, post recente). **Nunca inventar fato.**

### Passo 3 — Escrever o email (estrutura)

```
Assunto: [específico, sem clickbait, sem "parceria"]

Olá [Nome],

[Linha 1 — referência específica: o que você viu sobre ele/ela]
[Linha 2 — dor reconhecida: entendi que vocês [situação que dói]]
[Linha 3 — proposta em 1 frase: a gente [o que faz] pra [resultado] em [prazo/forma]]
[CTA único: topa 15 min essa semana? / quer que eu mande um exemplo?]

[Assinatura]
```

**Regras de forma:**
- Máx 120 palavras. 4-6 linhas. Sem anexo no primeiro contato
- Uma pergunta só no final
- Sem "espero que esteja bem", sem "gostaria de apresentar"

### Passo 4 — Variantes A/B

Entregar 2 versões:
- **Versão A — direta:** CTA de reunião curta
- **Versão B — valor primeiro:** manda uma amostra/insight útil antes de pedir

### Passo 5 — Follow-up (1 email)

Escrever também o follow-up de 4-7 dias (curto, educado, com gancho novo).
Nunca "só reforçando meu email anterior".

### Passo 6 — Salvar

Salvar em `marketing/emails/cold-<alvo>-<YYYY-MM-DD>.md` com: pesquisa usada,
versões A/B, follow-up e notas de envio (horário, limite diário).

## Regras

- Nunca inventar fato sobre o prospect — se achar nada, usar abertura genérica honesta
- Não mentir sobre quem você é ou o que faz
- Limite de envio: sugerir máx 20-30/dia por domínio (proteção de reputação)
- Assunto específico: "Ideia de [algo] pro [nome da empresa]" > "Parceria"
- Se o prospect pedir pra não contatar, registrar e não reenviar

## Quality gate — antes de declarar concluído

- [ ] Abertura referencia fato específico (ou é honestamente genérica, sem inventar)
- [ ] Email ≤ 120 palavras, um CTA único
- [ ] Versões A/B + follow-up entregues
- [ ] Sem anexo, sem clicbait, sem mentira
- [ ] Salvo em marketing/emails/ com data
