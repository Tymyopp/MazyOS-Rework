#!/usr/bin/env bash
# sync-skills.sh — mantém .claude/skills (Claude Code) e .agents/skills
# (Codex, Cursor, Copilot CLI, Antigravity, Gemini CLI) sincronizados.
#
# O padrão Agent Skills (agentskills.io) usa .agents/skills/ como local
# universal; o Claude Code usa .claude/skills/. Este script copia as
# skills de uma fonte canônica (.claude/skills) para a universal.
#
# Uso: ./scripts/sync-skills.sh
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=".claude/skills"
DST=".agents/skills"

[ -d "$SRC" ] || { echo "ERRO: $SRC não existe."; exit 1; }
mkdir -p "$DST"

changes=0

# Copia/atualiza skills que mudaram
for f in "$SRC"/*/SKILL.md; do
  [ -e "$f" ] || continue
  dir=$(basename "$(dirname "$f")")
  mkdir -p "$DST/$dir"
  if ! cmp -s "$f" "$DST/$dir/SKILL.md"; then
    cp "$f" "$DST/$dir/SKILL.md"
    echo "↻ sincronizado: $dir"
    changes=$((changes + 1))
  fi
done

# Remove skills que sumiram da fonte canônica
for d in "$DST"/*/; do
  [ -d "$d" ] || continue
  dir=$(basename "$d")
  if [ ! -d "$SRC/$dir" ]; then
    rm -rf "$d"
    echo "✗ removido: $dir"
    changes=$((changes + 1))
  fi
done

count=$(ls -d "$DST"/*/ 2>/dev/null | wc -l | tr -d ' ')
if [ "$changes" -eq 0 ]; then
  echo "Já sincronizado ($count skills em .agents/skills)."
else
  echo "Pronto: $count skills em .agents/skills ($changes alterações)."
fi
