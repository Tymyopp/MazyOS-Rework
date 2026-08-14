# MazyOS-Rework — The Operating System for Your Business (inside AI agents)

> Turn your business folder into an AI-operated hub for marketing, SEO, paid
> ads, content and operations — in Brazilian Portuguese, for local businesses.

MazyOS is a set of 29 agent skills (plain Markdown, Agent Skills standard) plus
a memory system (`_memoria/`), brand identity (`identidade/`) and templates.
It runs inside Claude Code and any agent that supports the open skills format.

## Install
```bash
git clone https://github.com/Tymyopp/MazyOS-Rework.git
cd MazyOS-Rework
claude        # then run /instalar (guided 5-minute interview)
```

Or via marketplace (once published):
```
/plugin marketplace add Tymyopp/MazyOS-Rework
/plugin install mazyos-rework@mazyos-rework
```

## Skills (15)
- Core: /abrir /salvar /atualizar /novo-projeto /mapear-rotinas /instalar
- Content: /carrossel (1080x1350 brand carousels) /publicar-tema /aprovar-post /video-curto
- SEO & GEO: /seo (8-step flow incl. AI answers) /seo-audit /programatic-seo /analytics /responder-avaliacoes
- Paid media: /anuncio-google (Google Ads CSV) /relatorio-ads (weekly report)
- Conversion: /cro /landing-page /email-sequencia /cold-email
- Operations: /cliente (light CRM) /daily /weekly /experimento /agendar
- Production: /analisar-dados /email-profissional

## How it thinks
`_memoria/` is the brain (business facts, voice, strategy — read before every
answer). `identidade/` is the face (applied to every visual output). The system
learns from corrections, reconciles itself (/atualizar) and grows new skills
from your routines (/mapear-rotinas).

## License
MIT — see LICENSE.
