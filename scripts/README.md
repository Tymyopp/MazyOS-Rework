# scripts/ — utilitários do MazyOS

Scripts Node.js e Python que as skills chamam para fazer coisas fora do alcance
da IA pura (gerar imagem, postar em rede social, renderizar HTML em PNG).

## Scripts versionados

| Script | Uso | Dependências |
|---|---|---|
| `gerar-imagem.js` | Gera foto IA (DALL-E 3) e salva PNG — `/carrossel` | `OPENAI_API_KEY` · Node 20+ (fetch nativo) |
| `postar-instagram.js` | Publica carrossel no Instagram via Meta Graph API — `/aprovar-post` | `META_PAGE_ACCESS_TOKEN`, `META_IG_USER_ID`, `SITE_URL` · Node 20+ |
| `postar-facebook.js` | Publica carrossel no Facebook via Meta Graph API — `/aprovar-post` | `META_PAGE_ACCESS_TOKEN`, `META_PAGE_ID`, `SITE_URL` · Node 20+ |
| `render-carrossel.js` | Template padrão de render HTML → PNG 1080×1350 (as skills copiam como `render.js` para a pasta do conteúdo) | Playwright |
| `sync-skills.sh` | Sincroniza `.claude/skills/` ↔ `.agents/skills/` | bash |
| `validate-skills.sh` | Validação completa do sistema (frontmatter, paridade, JSON, segredos) — usada pelo CI e hooks | bash + python3 |
| `hooks/validate-skill.sh` | Hook PostToolUse: valida após cada edição de arquivo | bash |
| `telemetria.js` | Registro LOCAL e opt-in de uso das skills (`.local/uso.jsonl` — nunca sai da máquina) | Node 20+ |

## Pré-requisitos comuns

- **Node.js 20+** (fetch nativo — scripts sem `npm install`)
- **`.env`** na raiz — modelo em `.env.example` (copie e preencha; `.env` nunca vai pro git)
- **Playwright** para render (HTML → PNG):

```bash
npm install playwright
npx playwright install chromium
```

## Como o MazyOS lida com isso

Quando uma skill precisa de script ausente, o Claude detecta, pergunta se quer
configurar agora, guia o setup das chaves e roda a skill.

## Qualidade

- `./scripts/validate-skills.sh` — roda a validação completa (também no CI e
  automaticamente após edições via hook em `.claude/settings.json`)
- Scripts JS usam apenas fetch nativo — sem dependências, sem `npm install`
