# MazyOS — El sistema operativo de tu negocio (dentro de agentes de IA)

> 28 habilidades (skills) en portugués brasileño para marketing, SEO/GEO, anuncios,
> contenido, conversión y ritmo operativo de pequeñas empresas y negocios locales.

## Instalar (Claude Code)

```
/plugin marketplace add mazzeoia/MazyOS
/plugin install mazyos@mazyos
```

O por clon: `git clone https://github.com/mazzeoia/MazyOS.git` → `cd MazyOS` → `claude` → `/instalar`.

**Otros agentes** (Codex, Cursor, Copilot CLI, Antigravity, Gemini): el contexto entra
por `AGENTS.md` y las skills viven en `.agents/skills/` (estándar abierto Agent Skills).

## Skills (28)

- **Núcleo:** /instalar · /abrir · /salvar · /atualizar · /novo-projeto · /mapear-rotinas
- **Contenido:** /carrossel (carruseles 1080×1350 con identidad) · /publicar-tema · /aprovar-post · /video-curto
- **SEO y GEO:** /seo (8 pasos, incl. aparecer en respuestas de IA) · /seo-audit · /programatic-seo · /analytics · /responder-avaliacoes
- **Anuncios:** /anuncio-google (CSV para Google Ads Editor) · /relatorio-ads (informe semanal)
- **Conversión:** /cro · /landing-page · /email-sequencia · /cold-email
- **Cadencia:** /daily · /weekly · /experimento · /agendar
- **Operación:** /cliente (CRM mínimo) · /analisar-dados · /email-profissional

## Cómo piensa el sistema

`_memoria/` es el cerebro (empresa, voz, estrategia, tareas, clientes, KPI, experimentos —
leído antes de cada respuesta). `identidade/` es la cara (aplicada en cada pieza visual).
El sistema aprende de correcciones, se reconcilia solo (/atualizar) y crea skills nuevas
desde tus rutinas (/mapear-rotinas).

## Licencia

MIT — ver `LICENSE`. Documentación: `docs/` (guía de inicio, FAQ, modelo premium).
