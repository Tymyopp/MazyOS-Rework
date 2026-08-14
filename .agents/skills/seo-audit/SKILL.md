---
name: seo-audit
description: >
  Auditoria técnica e on-page de um site: titles, descriptions, H1, schema JSON-LD,
  sitemap, robots, canonical, Open Graph, alt text, mobile e velocidade. Entrega tabela
  de problemas por severidade com recomendações priorizadas. Use quando o usuário disser
  "auditar seo", "auditoria do site", "problemas de seo", "checklist técnico seo",
  "por que não apareço no google", ou /seo-audit.
version: "1.0.0"
model: "*"
requires: ["web_fetch", "web_search"]
---

# /seo-audit — Auditoria técnica e on-page

Skill de diagnóstico técnico: varre as páginas principais e devolve os problemas
ordenados por severidade, com o conserto explicado em linguagem de dono.

## Dependências

- **Contexto:** `_memoria/empresa.md` (site, região, nicho)
- **Ferramentas:** WebFetch (ler páginas), WebSearch (verificar indexação)
- **Output:** `marketing/seo/auditoria-<dominio>-<YYYY-MM-DD>.md`

## Workflow

### Passo 1 — Mapear o site

- Identificar as 5-10 páginas principais (home, serviços/produtos, contato, blog)
- Se `site/` existir no workspace, ler direto os arquivos; senão, WebFetch

### Passo 2 — Checklist técnico (por página)

**On-page:**
- Title: 50-60 caracteres, keyword no início, único por página
- Meta description: 150-160 caracteres, com CTA
- H1 único e relevante; hierarquia H2/H3 correta
- Alt text nas imagens (descritivo, com keyword quando natural)

**Estrutura e dados:**
- Schema JSON-LD: LocalBusiness na home, Product/Service nos serviços, FAQ se houver
- Canonical correto (sem páginas duplicadas indexáveis)
- URLs amigáveis (kebab-case, sem parâmetros sujos)
- Sitemap.xml existe e lista as páginas; robots.txt não bloqueia nada importante
- Open Graph + Twitter Card (compartilhamento)

**Técnico:**
- Mobile: viewport configurado, botões com área de toque
- Velocidade: estimar com WebFetch (peso, recursos); citar PageSpeed como referência
- HTTPS ativo
- Broken links nas páginas principais (checar status com WebFetch)

### Passo 3 — Severidade

| Severidade | Critério | Exemplo |
|---|---|---|
| 🔴 Crítico | Bloqueia indexação ou quebra o usuário | robots bloqueando, página sem H1, sem sitemap |
| 🟠 Alto | Perde ranking/cliques | title duplicado, sem schema, canonical errado |
| 🟡 Médio | Perde qualidade | alt vazio, description fraca |
| 🔵 Baixo | Polimento | OG faltando em página secundária |

### Passo 4 — Recomendações priorizadas

Lista de ações com: o que mudar, onde, e o ganho esperado.
Pra schema, entregar o JSON-LD pronto (LocalBusiness/Product/FAQ).

### Passo 5 — Salvar

Salvar em `marketing/seo/auditoria-<dominio>-<YYYY-MM-DD>.md` com tabela de
problemas, JSON-LD pronto e checklist de correção.

## Regras

- Nunca inventar dados de velocidade/posição — estimar e sinalizar a lógica
- Toda correção explicada em linguagem simples (o dono entende sem abrir o código)
- Não recomendar "comprar links" ou práticas contra o Google
- Se o site for WordPress, indicar plugin (Yoast/RankMath) quando fizer sentido

## Quality gate — antes de declarar concluído

- [ ] 5-10 páginas principais auditadas
- [ ] Checklist completo coberto (on-page, schema, sitemap/robots, canonical, OG, alt, mobile, velocidade)
- [ ] Problemas classificados por severidade (crítico → baixo)
- [ ] JSON-LD pronto pra copiar (pelo menos LocalBusiness)
- [ ] Salvo em marketing/seo/ com data
