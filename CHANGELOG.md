# Changelog

Todas as mudanças notáveis do MazyOS.

# Changelog

Todas as mudanças notáveis do MazyOS.

## [1.6.1] — 2026-08-13

### Corrigido — consistência de URLs (auditoria de READMEs)
- Todas as referências de instalação/clone/plugin apontam agora para `Tymyopp/MazyOS-Rework`
  (README.md, README.en.md, README.es.md, docs/guia-de-inicio.md, CHANGELOG)
- Título dos READMEs padronizado como MazyOS-Rework
- Contagem de skills corrigida em textos desatualizados (15 → 28)
- `skills.json`: homepage aponta para o repositório do rework
- `marketplace.json`: owner/author atualizados para Tymyopp
- `SECURITY.md`: mantenedor do rework
- `docs/premium.md`: distinção clara entre rework (MIT, comunitário) e oferta comercial do autor original
- Skill `/instalar`: reconhece `MazyOS-Rework`/`mazyos-rework` como nome genérico de pasta
- `docs/guia-de-inicio.md`: suporte aponta para issues do repositório

## [1.9.0] — 2026-08-13

### Adicionado — agendamento, TikTok e insights (Fases 6-8 do plano de integração)
- **`/agendar-posts`** — agenda publicações REAIS em data futura (Postiz self-host
  com API pública ou Post for Me com scheduling); liga o calendário (/agendar) à
  publicação automática
- **`docs/agendamento.md`** — guia das duas opções (Postiz Docker vs Post for Me),
  comandos curl de exemplo e tabela de comparação
- **`/postar-tiktok`** + **`scripts/postar-tiktok.js`** — publicação de vídeo no
  TikTok via Content Posting API (Direct Post): upload, título/legenda/privacidade,
  acompanhamento de status; sandbox = privado, público exige auditoria
- **`docs/tiktok-setup.md`** — passo a passo (app, scopes, OAuth, .env, sandbox vs público)
- **`/insta-insights`** + **`scripts/insta-insights.js`** — métricas do Instagram
  (alcance, impressões, perfil visto, contas engajadas, tendência de seguidores,
  posts recentes) com auto-renovação de token
- **`_memoria/kpi.md`** — novas linhas "Alcance IG (7d)" e "Seguidores IG"
- **`/weekly`** — passa a incorporar o relatório do /insta-insights
- **`.env.example`** — POSTIZ_URL/API_KEY, POSTFORME_API_KEY, TIKTOK_*

## [1.8.0] — 2026-08-13

### Adicionado — Instagram completo (Fases 3-5 do plano de integração)
- **`scripts/postar-instagram.js`** — suporte a 4 tipos de publicação: carrossel
  (padrão), imagem única, **Reel** (`--tipo reel --video URL [--capa URL]`) e
  **Story** (`--tipo story`), além de `--legenda` alternativo
- **`/aprovar-post`** — documenta os 4 tipos de publicação com exemplos
- **MCP opcional (Fase 4):**
  - `.mcp.example.json` — modelo pronto (meta-mcp-server via npx)
  - `docs/mcp-instagram.md` — guia de ativação + comparação dos 5 servidores MCP
    pesquisados (meta-mcp-server 200+ tools, meta-mcp 57, instagram-mcp 24,
    supercorp auth_url, Meta oficial)
  - `templates/ferramentas/catalogo.md` — seção "MCPs de redes sociais"
- **`/bio-instagram`** — bio otimizada (≤150 caracteres, 3 opções no tom da marca),
  nome de exibição, link na bio com estratégia de rotatividade, 4-6 destaques com
  capa na paleta do design-guide e análise da grade do feed. Saída em
  `marketing/perfil/instagram-bio-<data>.md` (com aviso de colagem manual — a API
  não edita perfil)

### Corrigido
- `marketing/README.md` — pasta `perfil/` documentada

## [1.7.0] — 2026-08-13

### Adicionado — integração do Instagram por link (Fases 0-2 do plano de integração)
- **`/conectar-instagram`** — skill que conecta a conta por link de autorização (OAuth):
  gera o link, guia a autorização, troca o code por token long-lived (~60 dias) e confirma
- **`scripts/insta-conectar.js`** — script de conexão (fetch nativo): `conectar` (com
  fluxo copy-paste e `--loopback`), `trocar <code>`, `renovar`, `status`, `desconectar`.
  Valida state (CSRF), salva em `.local/insta-auth.json` (permissão 600, fora do git)
  e nunca imprime o token completo
- **`docs/automacao-meta-setup.md`** — guia completo de setup (Meta App em modo
  desenvolvimento, Instagram Tester, redirect URI, .env, solução de problemas, limites)
- **`scripts/postar-instagram.js`** — passa a ler o token de `.local/insta-auth.json`
  (fallback: .env) com **renovação automática** se faltar <7 dias
- **`.env.example`** — META_APP_ID, META_APP_SECRET, META_REDIRECT_URI, META_API_VERSION
- **`/aprovar-post`** — pré-requisitos atualizados com o fluxo por link

## [1.6.0] — 2026-08-13

### Adicionado — comunidade e go-to-market
- **`SKILLS.md`** — manifesto central das 28 skills com versões e categorias (versionamento semver)
- **`skills.json`** — metadata para publicação no skills.sh (Vercel): `npx skills add Tymyopp/MazyOS-Rework`
- **`docs/guia-de-inicio.md`** — onboarding: instalação, primeira semana, rotina, armadilhas comuns
- **`docs/FAQ.md`** — perguntas da comunidade (instalação, organização, custos)
- **`docs/premium.md`** — modelo open source (MIT) × oferta comercial (aulas/suporte)
- **`README.es.md`** — versão em espanhol (expansão LatAm)
- **`scripts/telemetria.js`** — registro LOCAL e opt-in de uso (nunca sai da máquina; `.local/` ignorado pelo git)

### Corrigido (auditoria geral)
- **`/analisar-dados`** — saída padronizada para `saidas/analises/` (era `estudos/`)
- **`/aprovar-post`** — scripts aceitam slug OU caminho completo (interface alinhada)
- **`/carrossel`** — render referencia o template versionado `scripts/render-carrossel.js`
- **`/email-profissional`** — saída documentada em `saidas/emails/`
- **templates/perfis (4)** — task store atualizado para `_memoria/tarefas.md` (era `tarefas.md` na raiz)
- **`marketing/README.md`** — estrutura completa v1.5 (emails, cro, landing, calendario, relatorios)

## [1.5.0] — 2026-08-13

### Adicionado — cadência operacional (total: 28 skills)
- **/daily** — briefing do dia: pendências, posts agendados, alertas de ads, experimentos vencendo, prioridade sugerida
- **/weekly** — revisão semanal (operating review): feito × métricas × ajustes, atualiza KPI, vereditos de experimentos
- **/experimento** — registro de testes com hipótese (se-então-porque), métrica única, prazo e veredito com evidência
- **/agendar** — calendário de conteúdo (frequência por canal, status planejado → pronto → publicado)

### Adicionado — arquivos de apoio
- **`_memoria/kpi.md`** — painel de 5-8 métricas atualizado pelo /weekly (valor real ou "sem dado")
- **`_memoria/experimentos.md`** — registro de experimentos ativos/concluídos
- **`marketing/calendario/calendario.md`** — calendário editorial por semana

### Melhorado
- **/abrir** — sugere /daily para briefing completo do dia
- **CLAUDE.md** — regras de memória para kpi, experimentos e calendário
- **catálogo, marketplace.json (28 skills), README, README.en** — atualizados

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
- `.claude-plugin/marketplace.json` — instalação via `/plugin marketplace add Tymyopp/MazyOS-Rework`
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
