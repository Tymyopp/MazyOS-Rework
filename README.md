# MazyOS-Rework

> O sistema operacional do seu negócio dentro de agentes de IA — evolução do MazyOS (mazzeoia).

[![Licença MIT](https://img.shields.io/badge/licenca-MIT-green)](LICENSE)
[![Versão](https://img.shields.io/badge/versao-v1.9.0-blue)](CHANGELOG.md)
[![Skills](https://img.shields.io/badge/skills-33-brightgreen)](SKILLS.md)
[![Agent Skills](https://img.shields.io/badge/Agent_Skills-standard-purple)](https://agentskills.io)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

PT-BR ([EN](README.en.md)) · [ES](README.es.md) · [Roadmap](ROADMAP.md) · [Contribua](CONTRIBUTING.md)

Você acaba de instalar o MazyOS. Em alguns minutos, sua empresa vai
ter uma memória própria, uma identidade visual aplicada em tudo que
o sistema gerar, e 46 skills prontas pra fazer marketing, SEO, ads
e operação rodarem com você dirigindo.

Bora voar.

---

## Ligando o sistema

Dois caminhos. Escolhe o que combina contigo.

### Pelo Claude (mais rápido)

Abre o Claude Code em qualquer pasta e cola:

```
Clona o https://github.com/Tymyopp/MazyOS-Rework.git na pasta atual,
entra nela e roda o /instalar.
```

Ele clona, entra na pasta nova e dispara a entrevista de setup. Você
só responde.

### Pelo terminal (mais previsível)

```
git clone https://github.com/Tymyopp/MazyOS-Rework.git
cd MazyOS-Rework
code .
```

Na janela do VS Code que abrir: terminal integrado → `claude` → `/instalar`.

### Pelo plugin (Claude Code)

```
/plugin marketplace add Tymyopp/MazyOS-Rework
/plugin install mazyos-rework@mazyos-rework
```

Instala as 46 skills sem clonar manualmente.

### Em outros agentes

O MazyOS segue o padrão aberto **Agent Skills** ([agentskills.io](https://agentskills.io)):
as mesmas skills vivem em `.agents/skills/` e funcionam em **Codex, Cursor, GitHub
Copilot CLI, Google Antigravity e Gemini CLI**. O contexto do negócio é carregado
automaticamente por esses agentes via `AGENTS.md` (o Claude Code lê o `CLAUDE.md`).

Manter as duas pastas de skills sincronizadas: `./scripts/sync-skills.sh`

---

Quando o `/instalar` terminar, renomeia a pasta `MazyOS-Rework/` pro nome do teu
negócio (fecha o VS Code, renomeia no Explorer/Finder, abre de novo). A
pasta não fica como "MazyOS" — ela é o teu negócio agora.

O `/instalar` roda uma vez só. Te entrevista sobre o negócio, monta a
memória e configura o sistema. Depois disso, é só usar.

---

## O sistema

**Núcleo** — o jeito de operar o dia a dia
`/instalar` faz o setup guiado em 5-7 min · `/abrir` carrega o contexto antes de cada sessão de trabalho · `/salvar`
faz commit + push no GitHub · `/atualizar` varre o projeto e atualiza
a memória · `/novo-projeto` cria pasta isolada pra cada cliente ou
iniciativa · `/mapear-rotinas` descobre o que você repete e transforma
em skill personalizada.

**Conteúdo e SEO** — vitrine pública da empresa
`/carrossel` cria carrosséis 1080×1350 com identidade da marca (com ou
sem foto IA) · `/publicar-tema` pega um tema e entrega artigo de blog +
carrossel + 3 legendas amarradas · `/seo` roda fluxo completo de 8 passos
(demanda, concorrência, GMB, on-page, conteúdo, ads, monitoramento, GEO)
· `/responder-avaliacoes` escreve respostas humanas pras reviews do
Google · `/aprovar-post` publica blog + Instagram + Facebook num comando.

**Anúncios pagos** — onde o dinheiro entra
`/anuncio-google` monta a campanha inteira em CSV pronto pra importar
no Google Ads Editor · `/relatorio-ads` lê os exports de Google + Meta
e devolve relatório semanal com alertas e recomendações.

**Produção** — ferramentas do dia a dia
`/analisar-dados` lê CSV/XLSX/PDF e gera resumo executivo ·
`/email-profissional` rascunha email a partir de contexto livre.

**Conversão e funil (v1.4)**
`/cro` audita landing e prioriza bloqueios de conversão · `/landing-page` cria
página de captura completa com identidade da marca · `/email-sequencia` monta
sequências de 3-6 emails (boas-vindas, nutrição, carrinho) · `/cold-email` escreve
prospecção fria personalizada com variantes A/B.

**SEO e dados (v1.4)**
`/seo-audit` faz auditoria técnica on-page com severidade e JSON-LD pronto ·
`/programatic-seo` gera páginas em escala (cidades/variações) com guardrail
anti-página-fina · `/analytics` lê GA4/Search Console e devolve recomendações
de tráfego orgânico.

**Conteúdo e operação (v1.4)**
`/video-curto` entrega roteiro de Reels/TikTok (gancho de 3s, texto em tela) ·
`/cliente` mantém o CRM mínimo em `_memoria/clientes.md`.

**Integrações sociais (v1.7-v1.9)**
`/conectar-instagram` conecta sua conta por **link de autorização** (Meta em modo
desenvolvimento, sem app review) · token de 60 dias com renovação automática ·
`/aprovar-post` publica **carrossel, imagem, Reel ou Story** · `/bio-instagram`
gera bio, destaques e link na bio · `/agendar-posts` agenda em data futura
(Postiz/Post for Me) · `/postar-tiktok` publica vídeos no TikTok ·
`/insta-insights` puxa métricas pro KPI · MCP opcional (`docs/mcp-instagram.md`) ·
setups guiados em `docs/automacao-meta-setup.md`, `docs/tiktok-setup.md`,
`docs/agendamento.md`.

**Automação total (v2.0)** — MCPs + nível 3
`/conectar-mcp` conecta e testa servidores MCP (3 perfis prontos) · `/postar-whatsapp`
manda mensagem e follow-up do CRM · `/postar-linkedin` publica via OAuth (fim do manual) ·
`/postar-youtube` sobe vídeos/Shorts · `/responder-comentarios` e `/caixa-social`
gerenciam engajamento unificado · `/cross-post` publica 1 peça em N redes ·
`/automacao` + `scripts/cron-posts.js` fazem rodar sozinho (cron/n8n) ·
`/conectar-whatsapp` conecta o WhatsApp pelo gateway **OpenWA** (QR estável, MCP nativo 51 tools, `docs/openwa-integracao.md`) ·
`/insights-tudo` junta métricas de tudo no KPI · catálogo: `docs/mcp-catalogo.md`.

**Operação e segurança (v2.3)** — padrões do The-ALL
`/status` mostra o painel do negócio num comando · `/notificar-telegram` avisa você
no Telegram (post publicado, weekly pronto, erros) · `/auditar-seguranca` roda a
auditoria com guard de leak pré-commit · `/weekly` também gera JSON para automação ·
`scripts/bootstrap.sh` reinstala tudo em máquina nova com `.env` em base64.

**Cadência operacional (v1.5)** — o closed-loop rodando sozinho
`/daily` abre o dia com pendências, posts agendados e alertas de ads · `/weekly`
fecha a semana: métricas vs anterior, vereditos de experimentos e ações da próxima
semana, atualizando o painel `_memoria/kpi.md` · `/experimento` registra testes com
hipótese, métrica única e veredito com evidência · `/agendar` mantém o calendário
de conteúdo em `marketing/calendario/calendario.md`.

---

---

## Sobre este repositório

**MazyOS-Rework** — versão evoluída e mantida pela comunidade do
[MazyOS original](https://github.com/mazzeoia/MazyOS), de [mazzeoia](https://mazzeoia.com.br).

Melhorias em relação ao original: 46 skills (era 15), multi-agente (AGENTS.md +
padrão Agent Skills), licença MIT, segurança (`.gitignore` + SECURITY + CI),
quality gates, scripts de integração versionados, cadência operacional
(/daily, /weekly, /experimento, /agendar) e CRM mínimo.

Projeto original: © 2026 mazzeoia · Rework: © 2026 Tymyopp · Licença: [MIT](LICENSE).

## A tese

IA não é uma ferramenta que sua empresa usa. É o sistema operacional em
que ela roda.

A diferença não é velocidade. É capacidade nova — uma pessoa com IA
constrói o que antes exigia time inteiro. Cada processo crítico que hoje
roda em open loop (decide → executa → não mede → repete cego) vira
closed loop dentro do MazyOS (decide → executa → captura → realimenta →
ajusta sozinho).

O sistema não substitui você. Vira parte da sua empresa.

---

## Como o MazyOS pensa

`_memoria/` é o cérebro. Tudo que importa do seu negócio mora aqui —
quem é a empresa, como ela fala, o que tá em foco essa semana. O Claude
lê isso antes de cada resposta. Quanto melhor a memória, melhor o sistema.

`identidade/` é o rosto. Cores, fontes, logo, padrão visual. Todo
carrossel, slide, peça que o sistema gera respeita isso.

`marketing/`, `saidas/` e `scripts/` são o resultado. O sistema produz,
versiona no GitHub, fica tudo seu.

---

## Quando precisar

Issues e suporte: [github.com/Tymyopp/MazyOS-Rework/issues](https://github.com/Tymyopp/MazyOS-Rework/issues)
Autor original: [mazzeoia.com.br](https://mazzeoia.com.br)
