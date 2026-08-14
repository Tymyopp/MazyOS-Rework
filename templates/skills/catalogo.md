# Catalogo de Skills

Skills externas prontas pra instalar. Use como referencia ao criar skills novas com `/mapear-rotinas` ou instale diretamente as que fizerem sentido pro seu negocio.

> Skills globais ficam em `~/.claude/skills/` e funcionam em qualquer projeto.
> Skills locais ficam em `.claude/commands/` e so funcionam nesse projeto.

---

## Escrever copy e textos de venda

### Schwartz Copy (resposta direta)
**O que faz:** Escreve copy de vendas usando a metodologia de Eugene Schwartz (Breakthrough Advertising). Diagnostica o nivel de consciencia e sofisticacao do mercado antes de gerar qualquer texto.
**Bom pra:** Landing pages, emails de venda, VSLs, cartas de venda, paginas de captura
**Como instalar:** Ja vem como skill global. Chamar com `/schwartz-copy`
**Fonte:** Skill validada pelo MazyOS

### Ogilvy Copy (marca e posicionamento)
**O que faz:** Gera copy institucional usando a metodologia de David Ogilvy. Pesquisa profunda, big idea, headlines informativas.
**Bom pra:** Manifestos de marca, campanhas institucionais, taglines, brand voice, posicionamento
**Como instalar:** Ja vem como skill global. Chamar com `/ogilvy-copy`
**Fonte:** Skill validada pelo MazyOS

---

## Criar interfaces e paginas web

### Frontend Design
**O que faz:** Cria interfaces web completas com design de alta qualidade. Gera codigo HTML/CSS/React pronto pra usar, com visual profissional que foge da estetica generica de IA.
**Bom pra:** Landing pages, dashboards, componentes web, paginas de produto
**Como instalar:** Ja vem nativo no Claude Code. Chamar com `/frontend-design`
**Fonte:** Skill nativa do Claude Code

---

## Criar visuais e arte

### Canvas Design
**O que faz:** Cria arte visual em PNG e PDF usando principios de design. Posters, capas, pecas graficas.
**Bom pra:** Capas de ebook, banners, pecas visuais, thumbnails
**Como instalar:** Ja vem nativo no Claude Code. Chamar com `/canvas-design`
**Fonte:** Skill nativa do Claude Code

---

## Trabalhar com documentos

### PDF
**O que faz:** Manipula PDFs: extrai texto e tabelas, cria novos, junta/separa documentos, preenche formularios.
**Bom pra:** Extrair dados de contratos, criar relatorios em PDF, preencher formularios
**Como instalar:** Ja vem nativo no Claude Code. Chamar com `/pdf`
**Fonte:** Skill nativa do Claude Code

### DOCX
**O que faz:** Cria e edita documentos Word com formatacao, tracked changes e comentarios.
**Bom pra:** Propostas formais, contratos, documentos pra clientes que pedem Word
**Como instalar:** Ja vem nativo no Claude Code. Chamar com `/docx`
**Fonte:** Skill nativa do Claude Code

### PPTX
**O que faz:** Cria e edita apresentacoes PowerPoint com layouts, speaker notes e formatacao.
**Bom pra:** Apresentacoes pra clientes, decks de vendas, materiais de treinamento
**Como instalar:** Ja vem nativo no Claude Code. Chamar com `/pptx`
**Fonte:** Skill nativa do Claude Code

### XLSX
**O que faz:** Cria e edita planilhas com formulas, formatacao e graficos.
**Bom pra:** Relatorios financeiros, dashboards em planilha, analise de dados
**Como instalar:** Ja vem nativo no Claude Code. Chamar com `/xlsx`
**Fonte:** Skill nativa do Claude Code

---

## Escrever documentos e specs

### Doc Co-Authoring
**O que faz:** Fluxo guiado pra coescrever documentos. Te entrevista, itera rascunhos, e valida que o documento funciona pro leitor.
**Bom pra:** Propostas tecnicas, specs, documentos de decisao, SOPs
**Como instalar:** Ja vem nativo no Claude Code. Chamar com `/doc-coauthoring`
**Fonte:** Skill nativa do Claude Code

---

## Extrair transcricao de video

### YT Transcript
**O que faz:** Extrai transcricoes de videos do YouTube usando yt-dlp. Suporta multiplos idiomas.
**Bom pra:** Criar conteudo a partir de videos (carrosseis, newsletters, posts)
**Precisa de:** yt-dlp instalado (`brew install yt-dlp`)
**Como instalar:** Ja vem como skill global. Chamar com `/yt-transcript`
**Fonte:** Skill validada pelo MazyOS

---

## Testar sites e apps

### Webapp Testing
**O que faz:** Testa aplicacoes web locais usando Playwright. Captura screenshots, verifica funcionalidade, le logs do browser.
**Bom pra:** Testar landing pages antes de publicar, verificar se tudo funciona em diferentes tamanhos
**Como instalar:** Ja vem nativo no Claude Code. Chamar com `/webapp-testing`
**Fonte:** Skill nativa do Claude Code

---

## Criar skills novas

### Skill Creator
**O que faz:** Guia pra criar skills novas do zero. Ajuda a estruturar, definir triggers, e testar.
**Bom pra:** Quando o `/mapear-rotinas` nao cobre o que voce precisa e quer criar algo mais complexo
**Como instalar:** Ja vem nativo no Claude Code. Chamar com `/skill-creator`
**Fonte:** Skill nativa do Claude Code

---

---

## Skills do MazyOS (v1.4+)

Skills nativas adicionadas após a primeira versão — já instaladas no sistema:

### Conversão e funil
- **/cro** — auditoria de landing/página de vendas: bloqueios priorizados por impacto + copy antes/depois
- **/landing-page** — landing completa em HTML único com identidade visual + copy aprovada
- **/email-sequencia** — sequências de 3-6 emails (boas-vindas, nutrição, carrinho, reactivação)
- **/cold-email** — prospecção fria B2B com pesquisa e personalização + variantes A/B + follow-up

### SEO e dados
- **/seo-audit** — auditoria técnica/on-page com severidade e JSON-LD pronto
- **/programatic-seo** — páginas em escala (cidades/variações) com regra dos 70% anti-página-fina
- **/analytics** — leitura de GA4/Search Console → recomendações de tráfego orgânico

### Conteúdo e operação
- **/video-curto** — roteiros de Reels/TikTok (gancho 3s, texto em tela, storyboard)
- **/cliente** — CRM mínimo em `_memoria/clientes.md` (registro + follow-up)


---

---

## Integrações sociais (v1.9)

Skills de conexão com plataformas — ver `docs/` correspondentes:

- **/conectar-instagram** — conexão por link (OAuth) + token 60 dias com renovação
- **/aprovar-post** — publica carrossel, imagem, Reel ou Story no Instagram
- **/bio-instagram** — bio, destaques, link na bio e grade (colagem manual)
- **/agendar-posts** — agendamento real (Postiz self-host ou Post for Me)
- **/postar-tiktok** — publicação de vídeo no TikTok (Content Posting API)
- **/insta-insights** — métricas do Instagram que alimentam o KPI e o /weekly

Docs: `docs/automacao-meta-setup.md` (Meta), `docs/tiktok-setup.md` (TikTok),
`docs/agendamento.md` (agendadores), `docs/mcp-instagram.md` (MCPs).


---

## Automação total (v2.0)

Skills da Fase H — conexão e autonomia:

- **/conectar-mcp** — detecta, ativa e testa servidores MCP (perfis starter/avancado/agencia)
- **/postar-whatsapp** — mensagens e follow-up do CRM pelo WhatsApp (Cloud API/WA MCP)
- **/postar-linkedin** — publicação via OAuth oficial (perfil/página)
- **/postar-youtube** — upload de vídeos/Shorts com metadados IA
- **/responder-comentarios** — responde comentários IG/FB com curadoria
- **/caixa-social** — inbox unificado (SocialAPI) de todas as redes
- **/cross-post** — 1 peça → N redes (aprovação única)
- **/automacao** — nível 3: cron/n8n para rodar sozinho
- **/insights-tudo** — painel unificado de métricas → KPI

Docs: `docs/mcp-catalogo.md` (instalação), `docs/automacao-n8n.md` (nível 3),
`docs/pesquisa-mcp-automacao.md` (análise do ecossistema).


## Cadência operacional (v1.5)

Skills de ritmo semanal — o closed-loop rodando sozinho:

- **/daily** — briefing do dia: pendências, posts agendados, alertas de ads, experimentos vencendo, prioridade sugerida
- **/weekly** — revisão semanal: o que foi feito, métricas vs anterior, vereditos de experimentos, ações da próxima semana
- **/experimento** — registro de testes com hipótese, métrica única, prazo e veredito com evidência
- **/agendar** — calendário de conteúdo (frequência por canal, temas da estratégia, status planejado → pronto → publicado)

Arquivos de apoio: `_memoria/kpi.md` (painel), `_memoria/experimentos.md`, `marketing/calendario/calendario.md`.


## Como adicionar skills novas a este catalogo

Se voce testou uma skill e quer adicionar aqui pra referencia futura:

```markdown
### Nome da Skill
**O que faz:** [descricao em uma frase]
**Bom pra:** [casos de uso praticos]
**Como instalar:** [comando ou instrucao]
**Fonte:** [de onde veio — skill nativa, criada por voce, ou de terceiros]
```
