# Changelog

Todas as mudanças notáveis do MazyOS.

# Changelog

Todas as mudanças notáveis do MazyOS.

## [1.4.0] — 2026-08-13

### Adicionado — 9 skills novas (total: 24)
- **/cro** — auditoria de conversão com priorização impacto × esforço e copy antes/depois
- **/landing-page** — landing em HTML único com identidade visual e copy aprovada
- **/email-sequencia** — sequências de 3-6 emails com disparo, assunto e CTA por email
- **/cold-email** — prospecção B2B com pesquisa real do prospect, variantes A/B e follow-up
- **/seo-audit** — auditoria técnica/on-page com severidade e schema JSON-LD pronto
- **/programatic-seo** — páginas em escala com regra dos 70% (anti-conteúdo fino)
- **/analytics** — leitura de GA4/Search Console com oportunidades de CTR
- **/video-curto** — roteiros de Reels/TikTok (gancho 3s, texto em tela, storyboard)
- **/cliente** — CRM mínimo em `_memoria/clientes.md` (registro, histórico, follow-up)

### Melhorado
- **/seo passo 8 (GEO)** — benchmarks reais de citabilidade (fontes +40%, stats +37%,
  citações de especialistas +30%), ferramentas de monitoramento (Otterly, Peec, ZipTie,
  LLMrefs) e seção "o que NÃO fazer em GEO" (anti-spam policy do Google)
- **`_memoria/clientes.md`** — novo arquivo de CRM com template
- **CLAUDE.md** — regra de registro de clientes
- **templates/skills/catalogo.md** e **marketplace.json** — atualizados com as 9 skills

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
