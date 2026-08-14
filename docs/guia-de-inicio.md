# Guia de início rápido — MazyOS

> Do clone à operação em ~20 minutos. Para quem instalou e quer começar sem tropeço.

## 1. Instalação (5 min)

Escolha um caminho:

```bash
# A) Claude Code (recomendado)
/plugin marketplace add Tymyopp/MazyOS-Rework
/plugin install mazyos-rework@mazyos-rework

# B) Clone manual
git clone https://github.com/Tymyopp/MazyOS-Rework.git
cd MazyOS-Rework
claude   # → rode /instalar
```

Outros agentes (Codex, Cursor, Copilot, Antigravity, Gemini): o contexto entra via
`AGENTS.md` e as skills vivem em `.agents/skills/` — é só abrir o projeto.

## 2. Setup do /instalar (5-7 min)

O `/instalar` é uma conversa, não um formulário:
- Responda uma pergunta por vez, do jeito que você fala (sem "persona genérica")
- Cole UM exemplo real de escrita — é isso que calibra o tom de voz
- Dê o logotipo em `identidade/logo.png` se tiver (opcional)
- No fim, ele sugere renomear a pasta pro nome do seu negócio (faça!)

**Dica:** clique no segundo "Yes" quando ele perguntar — o Claude faz menos perguntas.

## 3. Primeira semana (checklist)

| Dia | Ação | Comando |
|---|---|---|
| 1 | Abrir a operação | `/abrir` → depois `/daily` |
| 1 | Pesquisa de demanda + concorrência | `/seo passo 1` e `/seo passo 2` |
| 2 | Google Meu Negócio completo | `/seo passo 3` |
| 3 | Primeiro conteúdo | `/carrossel` (tema do seu nicho) |
| 4 | Artigo + carrossel + legendas | `/publicar-tema` |
| 5 | Campanha Google Ads | `/anuncio-google` |
| 6 | Responder avaliações | `/responder-avaliacoes` |
| 7 | Fechar a semana | `/weekly` |

## 4. Rotina de manutenção

- **Todo dia:** `/daily` (5 min — briefing + pendências)
- **2-3x/semana:** produzir conteúdo (`/carrossel`, `/publicar-tema`, `/video-curto`)
- **1x/semana:** `/weekly` (fecha a semana e atualiza o KPI) + `/relatorio-ads` (se tiver ads)
- **Quando testar algo:** `/experimento` (hipótese → veredito com número)
- **Quando mudar de foco:** atualizar `_memoria/estrategia.md` (ou pedir `/atualizar`)

## 5. Armadilhas comuns (e como sair delas)

| Sintoma | Causa | Solução |
|---|---|---|
| "Não encontrei a skill" | Está fora da pasta do projeto | Rode dentro da pasta do MazyOS |
| Git não instalado | Windows sem PATH | Peça ao Claude: "como instalar Git e adicionar ao PATH" |
| Publicação Insta falha | Imagens sem URL pública | O site precisa estar no ar ANTES (deploy) — o /aprovar-post valida isso |
| Carrossel sem PNG | Playwright ausente | `npm install playwright && npx playwright install chromium` |
| Resposta parece robô | Memória de tom vazia | Preencha `_memoria/preferencias.md` com exemplo real de escrita |
| .env vazou pro git | Commit antes do setup | `git rm --cached .env` + rodar `/salvar` de novo |

## 6. Onde cada coisa mora

- **Memória do negócio:** `_memoria/` (empresa, preferências, estratégia, tarefas, clientes, kpi, experimentos)
- **Identidade:** `identidade/design-guide.md`
- **Conteúdo produzido:** `marketing/conteudo/`
- **SEO:** `marketing/seo/` (8 passos do /seo + auditorias)
- **Campanhas e relatórios:** `marketing/campanhas/`
- **Calendário:** `marketing/calendario/calendario.md`
- **Backup:** `/salvar` (git + GitHub)

## 7. Suporte

- FAQ da comunidade: `docs/FAQ.md`
- Modelo de uso e licença: `docs/premium.md`
- Issues do repositório: https://github.com/Tymyopp/MazyOS-Rework/issues
