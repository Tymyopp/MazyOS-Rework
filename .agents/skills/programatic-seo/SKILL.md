---
name: programatic-seo
description: >
  Cria páginas em escala (por cidade, bairro, serviço ou variação) a partir de um template,
  com conteúdo único por página e guardrails anti-spam. Use quando o usuário disser
  "páginas em escala", "programatic seo", "páginas por cidade", "landing pages em massa",
  "página pra cada bairro", ou /programatic-seo.
version: "1.0.0"
model: "*"
requires: ["_memoria/empresa.md", "web_search"]
---

# /programatic-seo — Páginas em escala

Skill de expansão: transforma 1 template em N páginas locais/de variação, cada uma
com conteúdo real e único — sem cair na armadilha de conteúdo fino.

## Dependências

- **Contexto:** `_memoria/empresa.md` (serviço, região, diferenciais)
- **Dados reais:** coletar por variação (bairro/cidade: o que é diferente lá)
- **Output:** `marketing/seo/programatico/<cluster>-<YYYY-MM-DD>/`

## Workflow

### Passo 1 — Definir a variação

Perguntar: a escala é por **cidade/bairro**, por **serviço**, por **público** ou outra?
Coletar a lista real de variações (nunca inventar bairros/cidades que não atende).

### Passo 2 — Definir o template

Pra CADA página, definir antes:
- **Frontmatter:** title (com variação), description, keywords, h1
- **Seções fixas:** hero, o que fazemos, como funciona, CTA
- **Seções que variam:** prova local (cliente/depoimento da região), diferencial local,
  número/WhatsApp local se houver, referência local (praça, bairro vizinho)

### Passo 3 — Coletar dados únicos por variação

- WebSearch por variação (ex: "padeiro em Russas") pra achar: concorrentes locais,
  vocabulário local, referências geográficas
- Anotar 1-2 fatos reais por variação (nunca inventar endereço, telefone ou cliente)

### Passo 4 — Gerar as páginas

- Uma pasta por página (slug-da-variacao/ com index.html ou .md conforme o stack)
- Cada página com conteúdo único: parágrafo local + prova + referência
- Bloco de dados estruturados LocalBusiness por variação

### Passo 5 — Guardrails anti-spam (obrigatório)

- **Limite de escala:** no máximo 10-20 páginas por rodada — qualidade acima de volume
- **Regra dos 70%:** se <70% do conteúdo de uma página difere da anterior, não gerar
  (sinal de página fina) — reescrever ou descartar
- **Checklist por amostra:** revisar 100% na primeira rodada, 10% nas seguintes
- **Sem keyword stuffing:** 1 keyword por página, natural
- Avisar: conteúdo gerado em escala precisa de curadoria humana antes de publicar

### Passo 6 — Salvar e resumir

Salvar em `marketing/seo/programatico/<cluster>-<YYYY-MM-DD>/` com:
- `template.md` (o modelo usado)
- Uma pasta por página gerada
- `relatorio.md`: quantas páginas, quais foram descartadas pela regra dos 70% e por quê

## Regras

- Nunca inventar dados locais (bairros atendidos, telefones, clientes)
- Qualidade > quantidade: páginas finas punem o site inteiro
- Não gerar página pra variação sem conteúdo único
- Cada página precisa ter pelo menos 1 elemento verificável (endereço real, telefone, depoimento)

## Quality gate — antes de declarar concluído

- [ ] Lista de variações é real (confirmada com o usuário)
- [ ] Regra dos 70% aplicada e descartes registrados no relatorio.md
- [ ] Cada página tem ≥1 elemento verificável local
- [ ] Template + páginas + relatorio salvos na pasta padrão
- [ ] Usuário avisado da curadoria humana antes de publicar
