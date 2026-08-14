---
name: landing-page
description: >
  Cria landing page completa (HTML + copy) integrada à identidade visual: hero com
  promessa e CTA, problema, solução, prova social, garantia, FAQ e CTA final. Entrega
  arquivo único pronto pra hospedar. Use quando o usuário disser "landing page",
  "página de captura", "página de vendas", "página pro anúncio", "criar página pra campanha",
  ou /landing-page.
version: "1.0.0"
model: "*"
requires: ["identidade/design-guide.md", "node 20+ (opcional, deploy)"]
---

# /landing-page — Página de captura/vendas

Skill de produção: oferta → landing em HTML único, com copy no tom da marca e
identidade visual aplicada, pronta pra hospedar (Netlify, Vercel, Cloudflare Pages).

## Dependências

- **Contexto:** `_memoria/empresa.md` (oferta, público, diferenciais)
- **Tom:** `_memoria/preferencias.md`
- **Identidade:** `identidade/design-guide.md` (cores, fontes — LER antes)
- **Output:** `marketing/landing/<slug>-<YYYY-MM-DD>/` (index.html + README de deploy)

## Workflow

### Passo 1 — Briefing

1. Qual é a oferta? (produto, serviço, isca digital)
2. Objetivo: lead (WhatsApp/formulário), venda direta, agendamento?
3. Público e dor principal
4. Tem URL/domínio? Vai anunciar essa página (Google/Meta)?

### Passo 2 — Copy (aprovar antes do visual)

Estrutura em blocos:
- **Hero:** promessa em 1 frase + subheadline + CTA primário
- **Problema:** a dor do público reconhecida
- **Solução:** o que é a oferta, como funciona (3 passos)
- **Prova social:** 2-3 depoimentos reais (pedir ao usuário; nunca inventar) + números
- **Garantia/risco:** o que tira o medo (garantia, sem fidelidade, entrega)
- **FAQ:** 4-6 perguntas reais
- **CTA final:** repetição + urgência honesta

**CHECKPOINT:** mostrar a copy completa. Só seguir com o HTML após aprovação.

### Passo 3 — HTML

- Arquivo único `index.html` com CSS inline (carrega em qualquer hospedagem)
- Google Fonts como única dependência externa (ou fontes do design-guide)
- Cores/tipografia EXATAS do design-guide
- Formulário de captura: nome + WhatsApp/email (mínimo de campos)
- CTA primário repetido: hero, meio, fim
- Mobile-first (a maioria dos cliques de ads é mobile)
- Schema LocalBusiness/Product no head

### Passo 4 — Deploy

Oferecer: publicar no Cloudflare Pages (se `CLOUDFLARE_API_TOKEN` no .env),
ou instruir arrastar a pasta pro Netlify Drop (gratuito, sem conta de código).

### Passo 5 — Salvar e resumir

Salvar em `marketing/landing/<slug>-<YYYY-MM-DD>/` com:
- `index.html`
- `copy.md` (texto aprovado, pra reuso em ads/email)
- `README-deploy.md` (como publicar + checklist pós-deploy: pixel/GA4, link de CTA testado)

## Regras

- Depoimentos e números SEMPRE reais — pedir ao usuário, nunca inventar
- Uma oferta por página. Um CTA primário
- Identidade visual é lei (`design-guide.md`) — nada de template genérico
- Formulário com o mínimo de campos possível
- Linguagem do público, sem jargão

## Quality gate — antes de declarar concluído

- [ ] Copy aprovada pelo usuário antes do HTML
- [ ] Cores/tipografia batem com o design-guide
- [ ] Formulário mínimo (nome + 1 contato) com CTA no hero, meio e fim
- [ ] Depoimentos/números reais (nada inventado)
- [ ] index.html + copy.md + README-deploy.md na pasta padrão
