---
name: postar-tiktok
description: >
  Publica um vídeo no TikTok via Content Posting API (Direct Post): faz upload, define
  título/legenda/privacidade e acompanha o status. Requer app da TikTok configurado
  (docs/tiktok-setup.md). Sandbox publica apenas vídeos privados — posts públicos exigem
  auditoria da TikTok (ou usar Post for Me). Use quando o usuário disser "postar no tiktok",
  "publicar vídeo no tiktok", "subir reels pro tiktok", "tiktok", ou /postar-tiktok.
version: "1.0.0"
model: "*"
requires: ["node 20+", ".env (TIKTOK_CLIENT_KEY/SECRET/ACCESS_TOKEN/OPEN_ID)", "docs/tiktok-setup.md"]
---

# /postar-tiktok — Publicação no TikTok

Skill de integração: vídeo pronto (mp4) → publicação no TikTok com título, legenda
e privacidade, seguindo o fluxo oficial Direct Post.

## Dependências

- **Setup:** `docs/tiktok-setup.md` (app + token OAuth — uma única vez)
- **Script:** `scripts/postar-tiktok.js` (fetch nativo)
- **Vídeo:** arquivo `.mp4` local ou URL pública (produzido pelo usuário ou ferramenta externa)

## Workflow

### Passo 1 — Pré-checagem

- Conferir `.env`: `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_ACCESS_TOKEN`, `TIKTOK_OPEN_ID`
- Faltando → guiar pelo `docs/tiktok-setup.md` (criar app, obter token) e parar
- Confirmar que o usuário tem o **vídeo pronto** (`.mp4` local ou URL) — o sistema
  não gera vídeo, só publica

### Passo 2 — Briefing

1. Caminho do vídeo (ou URL)
2. Legenda/título (usar o tom de `_memoria/preferencias.md`; se vier do `/video-curto`, usar o roteiro)
3. Privado ou público? (aviso: sandbox = privado; público exige auditoria — ver doc)

### Passo 3 — Publicar

```bash
node --env-file=.env scripts/postar-tiktok.js <video.mp4> --legenda "..." [--titulo "..."] [--privado]
```

- Acompanhar o status até `PUBLISH_COMPLETE` (ou avisar o status final)

### Passo 4 — Registrar

- Marcar no `marketing/calendario/calendario.md` (status: publicado)
- Se o usuário quiser, registrar em `_memoria/empresa.md` (ferramentas: TikTok)

## Regras

- Nunca prometer publicação pública em sandbox — avisar a limitação da auditoria
- Não inventar dados do vídeo; legenda segue o tom da marca
- Se falhar, mostrar o erro da API + apontar a seção de solução do doc
- Alternativa sem auditoria: sugerir Post for Me (quickstart pré-aprovado)

## Quality gate — antes de declarar concluído

- [ ] `.env` do TikTok configurado (ou usuário guiado no setup)
- [ ] Vídeo local/URL confirmado com o usuário
- [ ] Legenda/título no tom da marca
- [ ] Script rodou e status registrado (PUBLISH_COMPLETE ou aviso)
- [ ] Calendário atualizado (status publicado)
