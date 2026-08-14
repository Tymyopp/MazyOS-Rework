---
name: bio-instagram
description: >
  Gera a bio do Instagram otimizada: nome de exibição, bio de até 150 caracteres (3 opções),
  link na bio com estratégia, destaques sugeridos com capas e análise da grade do feed.
  Integra identidade visual e tom de voz da marca. IMPORTANTE: a API do Instagram não edita
  o perfil — a IA entrega o texto pronto e o usuário cola manualmente (2 min).
  Use quando o usuário disser "bio do instagram", "otimizar perfil do insta", "bio da empresa",
  "melhorar minha bio", "destaques do instagram", "link na bio", "grade do feed", "perfil do insta",
  ou /bio-instagram.
version: "1.0.0"
model: "*"
requires: ["_memoria/empresa.md", "_memoria/preferencias.md", "identidade/design-guide.md"]
---

# /bio-instagram — Perfil otimizado

Skill de perfil: transforma o contexto do negócio numa bio que converte (nome, bio,
link, destaques, grade) — tudo no tom da marca.

## Dependências

- **Contexto:** `_memoria/empresa.md` (o que faz, público, diferenciais, contato)
- **Tom:** `_memoria/preferencias.md`
- **Identidade:** `identidade/design-guide.md` (cores/fontes pras capas de destaque)
- **Grade:** últimas capas em `marketing/conteudo/` (pra sugerir sequência)
- **Output:** `marketing/perfil/instagram-bio-<YYYY-MM-DD>.md`

## Workflow

### Passo 1 — Coletar contexto

Perguntar (ou extrair da memória) o que faltar:
1. Nome oficial e como o público chama o negócio
2. O que faz em UMA frase (como falaria pro vizinho)
3. Diferenciais concretos (anos, garantia, produção própria, entrega)
4. CTA desejado: WhatsApp / site / link de agendamento
5. Localização (bairro/cidade) — usar se fizer sentido

### Passo 2 — Bio (3 opções, ≤150 caracteres cada)

Regras de construção (padrão Instagram):
- **Palavra-chave no início** (o que é: "Padaria artesanal", "Confeitaria de festa")
- **Diferencial concreto** em 1 linha
- **CTA + localização** (botão de contato já existe; a bio reforça)
- Máximo 1-2 emojis (repertório do `/responder-avaliacoes`, sem 🚀✨💯)
- Linha de quebra (↵) pra organizar visualmente

Entregar 3 opções no tom de `_memoria/preferencias.md`:
- **A — Direta:** fato + CTA (boa pra ads)
- **B — Calorosa:** acolhe e humaniza (boa pra marca pessoal/local)
- **C — Curiosa:** provoca e gera clique (boa pra engajamento)

Pra cada opção: o texto pronto + contagem de caracteres.

### Passo 3 — Nome de exibição

Sugerir nome (≤30 caracteres) com palavra-chave quando fizer sentido:
ex. `Doce Grão | Bolos e Pães` (se o nome sozinho não diz o que é).

### Passo 4 — Link na bio

- Recomendar UM destino principal (WhatsApp com link direto `wa.me`, site, ou
  linktree/myp.bio se tiver vários)
- Estratégia: trocar o link conforme a campanha da semana (ex: fim de ano → página
  de encomenda de bolo) — registrar sugestão de rotatividade
- Formatar o link curto (bit.ly etc. se preciso)

### Passo 5 — Destaques (4-6) com capas

Sugerir destaques que organizam a oferta, ex.:
`Bolos · Pães · Como pedir · Avaliações · Onde estamos`

Pra cada um: **capa sugerida** (fundo da paleta do design-guide + 1-2 palavras +
ícone opcional) — a capa é a "vitrine"; padronizar as 4-6 na mesma cor/fonte.

### Passo 6 — Grade do feed

- Olhar as últimas 3-5 capas em `marketing/conteudo/`
- Sugerir a sequência das próximas (alternância claro → escuro → cor, regra do `/carrossel`)
- Indicar se a grade atual está equilibrada ou repetitiva

### Passo 7 — Salvar e entregar

Salvar em `marketing/perfil/instagram-bio-<YYYY-MM-DD>.md` com tudo (nome, 3 bios,
link, destaques, grade). Mostrar o essencial no chat com o aviso:

> "⚠️ A API do Instagram **não edita o perfil** — copie e cole no app (Perfil →
> Editar perfil). São 2 minutos."

## Regras

- Bio ≤150 caracteres SEMPRE (o Instagram corta) — validar a contagem
- Nunca prometer editar a bio via IA/API — é colagem manual, sempre
- Tom segue `_memoria/preferencias.md` estritamente; sem jargão de guru
- Sem emoji em excesso (máx 1-2) e fora do repertório da marca
- Se não souber o CTA preferido, perguntar antes de gerar
- Destaques e capas seguem o design-guide (cores/fonte do sistema)

## Quality gate — antes de declarar concluído

- [ ] 3 opções de bio, cada uma ≤150 caracteres (contagem conferida)
- [ ] Palavra-chave no início + diferencial concreto + CTA/local
- [ ] Nome de exibição sugerido (≤30 caracteres)
- [ ] Link na bio: 1 destino principal + estratégia de rotatividade
- [ ] 4-6 destaques com capa sugerida na paleta do design-guide
- [ ] Análise da grade com as últimas capas
- [ ] Arquivo salvo em marketing/perfil/ + aviso de colagem manual claro
