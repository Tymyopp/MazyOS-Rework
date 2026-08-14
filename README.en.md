# MazyOS-Rework — The Operating System for Your Business (inside AI agents)

> Turn your business folder into an AI-operated hub for marketing, SEO, paid
> ads, content and operations — in Brazilian Portuguese, for local businesses.

MazyOS is a set of 33 agent skills (plain Markdown, Agent Skills standard) plus
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

## Skills (33)
- Core: /instalar /abrir /salvar /atualizar /novo-projeto /mapear-rotinas
- Content: /carrossel (1080x1350 brand carousels) /publicar-tema /aprovar-post /video-curto
- SEO & GEO: /seo (8-step flow incl. AI answers) /seo-audit /programatic-seo /analytics /responder-avaliacoes
- Paid media: /anuncio-google (Google Ads CSV) /relatorio-ads (weekly report)
- Conversion: /cro /landing-page /email-sequencia /cold-email
- Cadence: /daily /weekly /experimento /agendar
- Operations: /cliente (light CRM) /analisar-dados /email-profissional
- Social integrations: /conectar-instagram (link OAuth, 60-day token) /bio-instagram /agendar-posts (Postiz/Post for Me) /postar-tiktok /insta-insights

## How it thinks
`_memoria/` is the brain (business facts, voice, strategy — read before every
answer). `identidade/` is the face (applied to every visual output). The system
learns from corrections, reconciles itself (/atualizar) and grows new skills
from your routines (/mapear-rotinas).

## License
MIT — see LICENSE.
