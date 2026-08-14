---
name: cro
description: >
  Auditoria de conversão de landing pages e páginas de vendas. Analisa copy, hierarquia,
  prova social, CTA, formulário e velocidade, e entrega relatório priorizado por impacto
  com recomendações de antes/depois. Use quando o usuário disser "cro", "conversão",
  "a landing não converte", "aumentar taxa de conversão", "otimizar conversão",
  "por que ninguém compra no site", ou /cro.
version: "1.0.0"
model: "*"
requires: ["web_fetch", "_memoria/preferencias.md"]
---

# /cro — Auditoria de conversão

Skill de diagnóstico: pega uma página (landing, página de vendas, captura) e devolve
os bloqueios de conversão priorizados por impacto, com copy alternativa pronta.

## Dependências

- **Contexto do negócio:** `_memoria/empresa.md` (oferta, público, diferenciais)
- **Tom de voz:** `_memoria/preferencias.md`
- **Identidade:** `identidade/design-guide.md` (se a recomendação envolver layout)
- **Output vão em:** `marketing/cro/auditoria-<slug>-<YYYY-MM-DD>.md`

## Workflow

### Passo 1 — Briefing

Perguntar (ou extrair do contexto):
1. URL da página e objetivo dela (lead, venda, agendamento, WhatsApp)
2. De onde vem o tráfego (ads, orgânico, Instagram)
3. Taxa de conversão atual, se souber (senão, estimar por referência do nicho e sinalizar)
4. O que já foi tentado

### Passo 2 — Coletar a página

- WebFetch na URL (se local, ler o HTML direto)
- Anotar: título, headline, subheadline, CTAs, prova social, formulário, seções, footer

### Passo 3 — Auditoria em blocos (checklist)

**Promessa e clareza (peso maior):**
- A proposta cabe numa frase? O visitante entende em 5 segundos?
- Headline promete o benefício ou descreve o produto?

**Hierarquia e atenção:**
- Um CTA primário só? CTA acima da dobra + repetido no fim?
- Caminho visual: headline → benefício → prova → ação?

**Prova social e confiança:**
- Depoimentos com nome/rosto? Números verificáveis? Selos/garantia?
- Medo: o que impede o clique (risco, preço, dúvida)?

**Formulário e fricção:**
- Quantos campos? Cada campo extra derruba conversão (~10-20%)
- Pedir o mínimo: nome + WhatsApp/email

**Velocidade e mobile:**
- Página carrega em <3s? (estimar; citar PageSpeed como referência)
- CTA acessível no mobile sem scroll infinito?

### Passo 4 — Priorizar por impacto × esforço

Montar tabela:

| # | Problema | Impacto (alto/médio/baixo) | Esforço (baixo/médio/alto) | Ação |
|---|---|---|---|---|
| 1 | ... | alto | baixo | ... |

### Passo 5 — Copy antes/depois

Para os 3 maiores bloqueios, entregar alternativa pronta de headline,
subheadline e CTA, no tom de `_memoria/preferencias.md`.

### Passo 6 — Salvar e resumir

Salvar em `marketing/cro/auditoria-<slug>-<YYYY-MM-DD>.md` e mostrar no chat:
- Top 3 bloqueios com copy nova pronta
- Estimativa honesta de ganho potencial (sinalizar como estimativa)

## Regras

- Nunca inventar taxa de conversão atual — se não souber, dizer que é estimativa e explicar a lógica
- Não recomendar mudança que quebre a identidade visual (`design-guide.md`)
- Priorizar esforço baixo + impacto alto (quick wins primeiro)
- Linguagem do público real, sem jargão de marketing

## Quality gate — antes de declarar concluído

- [ ] Auditoria cobriu os 5 blocos (promessa, hierarquia, prova, formulário, velocidade/mobile)
- [ ] Problemas priorizados por impacto × esforço
- [ ] Copy antes/depois para os 3 maiores bloqueios, no tom da marca
- [ ] Relatório salvo em marketing/cro/ com data
- [ ] Nenhum dado inventado — estimativas sinalizadas
