---
name: postar-linkedin
description: >
  Publica posts no LinkedIn (perfil ou página da empresa) via MCP OAuth oficial
  (quinnjr/linkedin-mcp ou Composio): texto, imagem, vídeo e documento. Substitui a
  postagem manual do LinkedIn. Use quando o usuário disser "postar no linkedin",
  "publicar linkedin", "linkedin post", "postar artigo no linkedin", ou /postar-linkedin.
version: "1.0.0"
model: "*"
requires: ["linkedin-mcp (oauth)", "LINKEDIN_ACCESS_TOKEN no .env"]
---

# /postar-linkedin — Publicação no LinkedIn

Skill de integração: fecha a lacuna "LinkedIn manual" — publicação automática via
OAuth oficial (sem browser automation, sem violar termos).

## Dependências

- **MCP:** quinnjr/linkedin-mcp (via `/conectar-mcp`) ou Composio LinkedIn
- **Token:** `LINKEDIN_ACCESS_TOKEN` (OAuth 2.0 + OIDC — produtos "Sign In with LinkedIn" + "Share on LinkedIn")
- **Conteúdo:** texto/imagem/vídeo (do `/publicar-tema` sai `legenda-linkedin.md` pronto!)

## Workflow

### Passo 1 — Pré-checagem

- MCP conectado? (`/conectar-mcp`) · Token presente?
- Faltando → guiar pelo catálogo (docs/mcp-catalogo.md, seção LinkedIn)

### Passo 2 — Conteúdo

- Se veio de `/publicar-tema`: usar `legenda-linkedin.md` (já está no tom certo:
  mais formal, sem hashtags em excesso, CTA pro blog)
- Se novo: escrever no tom da marca (LinkedIn = mais analítico, 3-5 parágrafos)
- Perguntar: perfil pessoal ou página da empresa? (listar páginas via MCP se preciso)

### Passo 3 — Publicar

Chamar `share_linkedin_post` (ou tool equivalente) com texto + mídia (se houver).
**CHECKPOINT:** mostrar o post completo e pedir aprovação antes.

### Passo 4 — Registrar

- Atualizar `marketing/calendario/calendario.md` (status: publicado, canal LinkedIn)
- Guardar o link do post (se a API retornar)

## Regras

- Apenas via OAuth autorizado — NUNCA browser automation (viola termos do LinkedIn)
- Texto no tom LinkedIn (mais formal que Instagram), 1 CTA
- Aprovação humana antes de publicar
- Se falhar, mostrar erro da API + orientar (token expirado → reautenticar)

## Quality gate — antes de declarar concluído

- [ ] MCP LinkedIn conectado e testado
- [ ] Conteúdo no tom certo (legenda-linkedin.md se vier do /publicar-tema)
- [ ] Post aprovado pelo usuário
- [ ] Publicado via OAuth (link/ID registrado)
- [ ] Calendário atualizado
