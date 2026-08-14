# SKILLS.md — Inventário e versionamento

> Manifesto central das 33 skills. Cada skill tem `version` no frontmatter;
> este arquivo é o índice consolidado (atualize ao criar/editar skills).

| Skill | Versão | Categoria | O que faz |
|---|---|---|---|
| `/instalar` | 1.1.0 | núcleo |  |
| `/abrir` | 1.2.0 | núcleo |  |
| `/salvar` | 1.2.0 | núcleo |  |
| `/atualizar` | 1.1.0 | núcleo |  |
| `/novo-projeto` | 1.1.0 | núcleo |  |
| `/mapear-rotinas` | 1.1.0 | núcleo |  |
| `/carrossel` | 1.2.0 | conteúdo |  |
| `/publicar-tema` | 1.2.0 | conteúdo |  |
| `/aprovar-post` | 1.2.0 | conteúdo |  |
| `/video-curto` | 1.0.0 | conteúdo |  |
| `/seo` | 1.2.0 | seo/geo |  |
| `/seo-audit` | 1.0.0 | seo/geo |  |
| `/programatic-seo` | 1.0.0 | seo/geo |  |
| `/analytics` | 1.0.0 | seo/geo |  |
| `/responder-avaliacoes` | 1.1.0 | seo/geo |  |
| `/anuncio-google` | 1.2.0 | ads |  |
| `/relatorio-ads` | 1.2.0 | ads |  |
| `/cro` | 1.0.0 | conversão |  |
| `/landing-page` | 1.0.0 | conversão |  |
| `/email-sequencia` | 1.0.0 | conversão |  |
| `/cold-email` | 1.0.0 | conversão |  |
| `/analisar-dados` | 1.1.0 | produção |  |
| `/email-profissional` | 1.1.0 | produção |  |
| `/daily` | 1.0.0 | cadência |  |
| `/weekly` | 1.0.0 | cadência |  |
| `/experimento` | 1.0.0 | cadência |  |
| `/agendar` | 1.0.0 | cadência |  |
| `/insta-insights` | 1.0.0 | integração | métricas do Instagram (alcance, impressões, engajamento, seguidores) — alimenta o KPI |
| `/postar-tiktok` | 1.0.0 | integração | publica vídeo no TikTok (Content Posting API) com status |
| `/agendar-posts` | 1.0.0 | integração | agenda publicações reais (Postiz ou Post for Me) a partir do calendário |
| `/bio-instagram` | 1.0.0 | integração | bio otimizada (≤150 chars, 3 opções), destaques, link na bio e grade do feed — colagem manual |
| `/conectar-instagram` | 1.0.0 | integração | conecta a conta do Instagram por link de autorização (token 60 dias, auto-renovação) |
| `/cliente` | 1.0.0 | operação |  |

## Versionamento

- Cada `SKILL.md` carrega `version` (semver) no frontmatter.
- Mudança **maior** (1.x → 2.0): quebra de fluxo ou comportamento.
- Mudança **menor** (1.1 → 1.2): skill nova ou funcionalidade adicionada.
- Mudança **patch** (1.1.0 → 1.1.1): correção sem mudar o fluxo.
- Mudanças notáveis por release: ver `CHANGELOG.md`.
- A fonte canônica é `.claude/skills/`; `.agents/skills/` é espelho (via `scripts/sync-skills.sh`).
