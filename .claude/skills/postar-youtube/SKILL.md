---
name: postar-youtube
description: >
  Publica vídeos no YouTube (canal ou Shorts) via youtube-uploader-mcp: upload com título,
  descrição, tags, categoria, privacidade e agendamento. OAuth local (segredos nunca vão
  pro LLM). Use quando o usuário disser "publicar no youtube", "subir vídeo no youtube",
  "upload youtube", "youtube short", "agendar vídeo no youtube", ou /postar-youtube.
version: "1.0.0"
model: "*"
requires: ["youtube-uploader-mcp", "GOOGLE_CLIENT_SECRET_FILE"]
---

# /postar-youtube — Upload de vídeos

Skill de integração: vídeo pronto → YouTube com metadados gerados/ajustados pela IA.

## Dependências

- **MCP:** anwerj/youtube-uploader-mcp (grátis, OAuth local) via `/conectar-mcp`
- **Credencial:** `GOOGLE_CLIENT_SECRET_FILE` no `.env` (aponta pro client_secret.json)
- **Vídeo:** arquivo local (.mp4) ou URL — o sistema não gera vídeo, só publica

## Workflow

### Passo 1 — Pré-checagem

- MCP conectado? Token/credencial ok? (`channels` para listar canais)
- Faltando → guiar: instalar MCP + criar OAuth client no Google Cloud (docs/mcp-catalogo.md)

### Passo 2 — Briefing

1. Caminho do vídeo (ou URL)
2. Título (sugerir 3 opções com keyword — otimização de busca)
3. Descrição (gerar: resumo + links + CTA)
4. Tags (5-10)
5. Privacidade: público / não listado / privado · Agendar data? (Shorts se for vertical ≤60s)

### Passo 3 — Publicar

Chamar `upload_video` do MCP com metadados. **CHECKPOINT:** mostrar título/descrição
e pedir aprovação antes do upload.

### Passo 4 — Registrar

- `marketing/calendario/calendario.md` (status publicado/agendado, canal YouTube)
- Guardar ID do vídeo

## Regras

- Metadados com keyword no título (busca no YouTube)
- Aprovação antes do upload (irreversível no público)
- Shorts: vídeo vertical ≤60s (avisar se o arquivo não parece adequado)
- Segredos OAuth ficam no servidor local — nunca colar no chat

## Quality gate — antes de declarar concluído

- [ ] MCP YouTube conectado e canais listados
- [ ] Título/descrição/tags prontos e aprovados
- [ ] Vídeo existe e formato ok
- [ ] Upload confirmado (ID/URL)
- [ ] Calendário atualizado
