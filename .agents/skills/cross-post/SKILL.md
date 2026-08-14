---
name: cross-post
description: >
  Publica UMA peça (carrossel, vídeo, texto, artigo) em várias redes ao mesmo tempo:
  adapta formato/tamanho/limites/tom por plataforma e envia via unificador configurado
  (Ayrshare/Zernio/Buffer/Postiz/Upload-Post) ou MCPs individuais. Aprovação única.
  Use quando o usuário disser "publicar em todas as redes", "cross post", "postar em tudo",
  "divulgar em todas", "crosspost", ou /cross-post.
version: "1.0.0"
model: "*"
requires: ["unificador mcp (ayrshare/zernio/buffer/postiz) ou mcps individuais"]
---

# /cross-post — Publicação multi-plataforma

Skill de distribuição: 1 conteúdo → N redes, com adaptação por plataforma e uma única
aprovação.

## Dependências

- **Unificador:** Ayrshare/Zernio/Buffer/Postiz/Upload-Post (via `/conectar-mcp`) OU MCPs individuais
- **Conteúdo:** pasta em `marketing/conteudo/` (carrossel/vídeo) ou texto
- **Tom:** `_memoria/preferencias.md`

## Workflow

### Passo 1 — Identificar a peça

- Pasta de conteúdo (ex.: `marketing/conteudo/carrossel-X-<data>/`) ou texto/link
- Tipo: carrossel (IG/FB), vídeo (TikTok/YT/Reels), texto (LinkedIn/X), artigo (blog→redes)

### Passo 2 — Escolher as redes

Listar as redes disponíveis no unificador (tool de listagem) e perguntar quais usar
(sugerir por tipo: carrossel → IG+FB+Threads; vídeo → TikTok+Reels+Shorts; texto → LinkedIn+X).

### Passo 3 — Adaptar por plataforma

| Plataforma | Limite | Ajuste |
|---|---|---|
| Instagram | 2.200 chars · carrossel 2-10 | legenda padrão |
| Facebook | 63.206 chars | mesma legenda |
| Threads | 500 chars | versão curta |
| X/Twitter | 280 chars | versão ultra-curta + link |
| LinkedIn | 3.000 chars | versão formal (legenda-linkedin.md) |
| TikTok | legenda curta | 1-2 frases + hashtags |

Gerar as variações e mostrar **numa única tela de aprovação** (o usuário aprova tudo
de uma vez ou edita por plataforma).

### Passo 4 — Publicar

- Via unificador: 1 chamada com as variações + redes
- Via MCPs individuais: chamar cada um (registrando sucesso/falha por rede)
- Relatar: ✓ IG · ✓ FB · ✗ X (falha: token expirado)

### Passo 5 — Registrar

- `marketing/calendario/calendario.md` (status publicado, canais)
- Guardar links por rede quando disponíveis

## Regras

- Adaptar SEMPRE por plataforma (nunca o mesmo texto em tudo — X corta em 280)
- Uma aprovação única, mas com opção de editar por plataforma
- Falha parcial não aborta o resto (registrar e seguir)
- Hashtags: contar no limite de caracteres da plataforma

## Quality gate — antes de declarar concluído

- [ ] Peça identificada (tipo + caminho)
- [ ] Redes escolhidas e disponíveis no unificador
- [ ] Variações por plataforma geradas (limites respeitados)
- [ ] Aprovação única obtida
- [ ] Publicação confirmada por rede (sucesso/falha) + calendário atualizado
