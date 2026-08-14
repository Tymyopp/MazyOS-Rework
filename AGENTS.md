# MazyOS — Business Operating System (multi-agent)

This file is auto-loaded by Codex, Cursor, GitHub Copilot CLI, Google Antigravity
and Gemini CLI. Claude Code reads CLAUDE.md instead — keep both in sync.

## Context
At the start of every conversation, read (when they exist and are filled):
1. `_memoria/empresa.md` — who the user is, what the business does
2. `_memoria/preferencias.md` — voice, style, what to avoid
3. `_memoria/estrategia.md` — current focus, priorities, deadlines
4. `_memoria/tarefas.md` — open tasks (report pending count in briefings)
5. `_memoria/kpi.md`, `_memoria/clientes.md`, `_memoria/experimentos.md` — when relevant
Use this as the basis for any answer or decision.

## Skills
Before executing any task, check `.claude/skills/` (or `.agents/skills/`) for a
relevant skill (SKILL.md). If found, follow its workflow. Skills are plain
Markdown following the open Agent Skills standard (agentskills.io) — they work
in any agent that supports the standard.

## Rules
- Never invent data (CPC, volumes, metrics). If unknown, say it's an estimate and explain the logic.
- Human approval before anything irreversible (publishing, pushing, deleting).
- Keep files in the folders the skills specify (marketing/, saidas/, dados/).
- Write in Brazilian Portuguese unless the user asks otherwise.
- Never commit `.env` or secrets. Check `.gitignore` before `git add .`.
- Run `bash scripts/sync-skills.sh` after creating/editing a skill so `.agents/skills/`
  stays in sync with `.claude/skills/` (canonical source).
- Skills have quality gates: never declare a task finished until the checklist passes.

## Memory
When the user corrects something durable ("prefiro assim", "sempre que...",
"na verdade é assim"), ask: "Quer que eu salve isso pra não precisar repetir?"
and store it in the right file: empresa / preferencias / estrategia / CLAUDE.md.
