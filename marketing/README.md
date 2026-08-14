# marketing/ — saídas do MazyOS

Tudo que as skills de marketing produzem cai aqui. As skills já sabem onde salvar — você raramente precisa criar pasta manualmente.

## Estrutura padrão

```
marketing/
├── conteudo/                    saídas do /carrossel, /publicar-tema, /video-curto
│   └── <tipo>-<tema>-<YYYY-MM-DD>/
│       ├── carrossel.html
│       ├── render.js
│       ├── instagram/slide-XX.png
│       ├── legenda.md
│       └── legenda-linkedin.md
│
├── seo/                         saídas do /seo (8 passos) + /seo-audit + /analytics
│   ├── 01-pesquisa-demanda.md
│   ├── 02-analise-concorrencia.md
│   ├── 03-google-meu-negocio.md
│   ├── 04-otimizacao-on-page.md
│   ├── 05-estrategia-conteudo.md
│   ├── 06-google-ads.md
│   ├── 07-checklist-monitoramento.md
│   ├── 08-geo-otimizacao-ia.md
│   ├── auditoria-<dominio>-<data>.md      ← /seo-audit
│   ├── analytics-<data>.md                ← /analytics
│   └── programatico/<cluster>-<data>/     ← /programatic-seo
│
├── campanhas/                   saídas do /anuncio-google e /relatorio-ads
│   ├── google-ads-<YYYY-MM-DD>/  CSVs prontos pra importar
│   └── relatorios/               relatórios semanais
│
├── emails/                      saídas do /email-sequencia e /cold-email
│   ├── sequencia-<tipo>-<data>.md
│   └── cold-<alvo>-<data>.md
│
├── cro/                         auditorias do /cro
├── landing/                     páginas do /landing-page (<slug>-<data>/)
├── calendario/                  calendário editorial (/agendar)
├── relatorios/                  revisões semanais do /weekly
└── avaliacoes-google/           histórico do /responder-avaliacoes (opcional)
```

## Como funciona

- **`/carrossel` ou `/publicar-tema`** → pasta em `conteudo/<tipo>-<tema>-<data>/`
- **`/video-curto`** → `conteudo/video-<tema>-<data>/roteiro.md`
- **`/seo`** → os 8 arquivos numerados em `seo/`
- **`/seo-audit`** → `seo/auditoria-<dominio>-<data>.md`
- **`/analytics`** → `seo/analytics-<data>.md`
- **`/programatic-seo`** → `seo/programatico/<cluster>-<data>/`
- **`/anuncio-google`** → `campanhas/google-ads-<data>/` com CSVs
- **`/relatorio-ads`** → `campanhas/relatorios/<data>-relatorio.md`
- **`/email-sequencia`** → `emails/sequencia-<tipo>-<data>.md`
- **`/cold-email`** → `emails/cold-<alvo>-<data>.md`
- **`/cro`** → `cro/auditoria-<slug>-<data>.md`
- **`/landing-page`** → `landing/<slug>-<data>/`
- **`/agendar`** → `calendario/calendario.md`
- **`/weekly`** → `relatorios/weekly-<data>.md`
- **`/responder-avaliacoes`** → opcionalmente `avaliacoes-google/`

## Versionamento

Tudo aqui versiona no git pelo `/salvar`. Útil pra comparar evolução de SEO entre meses, rever copies antigas, ou recuperar peça depois de mexer no Insta.
