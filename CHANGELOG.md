# Changelog

Todas as mudanças notáveis do MazyOS.

# Changelog

Todas as mudanças notáveis do MazyOS.

## [1.3.0] — 2026-08-13

### Adicionado
- **Frontmatter completo** nas 15 skills: `version`, `model`, `requires` (padrão Agent Skills)
- **Quality gates** nas 6 skills principais (carrossel, publicar-tema, seo, anuncio-google, relatorio-ads, aprovar-post) — checklist antes de declarar concluído
- **Scripts de integração versionados**: `gerar-imagem.js`, `postar-instagram.js`, `postar-facebook.js`, `render-carrossel.js` (fetch nativo, sem dependências)
- **`.env.example`** — modelo de credenciais documentado
- **`references/`** — documentação de apoio em skills (ex: formato CSV do Ads Editor)
- **Task store**: `_memoria/tarefas.md` + `/abrir` reporta pendências na abertura de sessão
- **Hooks de ciclo de vida**: `.claude/settings.json` valida skills após cada edição
- **`scripts/validate-skills.sh`** — validação local completa
- **CI**: `.github/workflows/validate-skills.yml` (frontmatter, paridade .claude↔.agents, sintaxe Node, segredos)

## [1.2.0] — 2026-08-13


### Adicionado
- `AGENTS.md` — contexto carregado automaticamente por Codex, Cursor, GitHub Copilot CLI, Google Antigravity e Gemini CLI
- `.agents/skills/` — as 15 skills no local universal do padrão Agent Skills (agentskills.io)
- `.claude-plugin/marketplace.json` — instalação via `/plugin marketplace add mazzeoia/MazyOS`
- `README.en.md` — versão em inglês
- `scripts/sync-skills.sh` — sincroniza `.claude/skills/` ↔ `.agents/skills/`
- `CLAUDE.md` — criação de skill agora exige rodar o sync

## [1.1.0] — 2026-08-13

### Adicionado
- `LICENSE` (MIT) — uso, modificação e distribuição permitidos
- `SECURITY.md` — política de reporte de vulnerabilidades e áreas de risco
- `CONTRIBUTING.md` — diretrizes de contribuição (skills, convenções, testes)
- Templates de issue (bug + feature) e de pull request em `.github/`
- `ROADMAP.md` — fases de evolução com status
- `CHANGELOG.md` — este arquivo
- `.editorconfig` — consistência de codificação (UTF-8, LF)

### Corrigido
- `.gitignore` agora protege `.env`, chaves e segredos (evita vazamento via `/salvar`)
- BOM (UTF-8) removido de todos os `SKILL.md` — compatibilidade com qualquer agente

## [1.0.0] — 2026-05-04

- Primeira versão pública: 15 skills, memória do negócio (`_memoria/`), identidade visual (`identidade/`), templates de perfil e catálogos de skills/ferramentas.
