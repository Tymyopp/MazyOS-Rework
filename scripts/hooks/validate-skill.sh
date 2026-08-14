#!/usr/bin/env bash
# validate-skill.sh — hook PostToolUse: roda a validação completa após edições.
# Falha com mensagem clara se uma skill ficou inválida; silencioso se tudo OK.
set -uo pipefail
cd "$(dirname "$0")/../.."

OUTPUT=$(bash scripts/validate-skills.sh 2>&1)
STATUS=$?
if [ $STATUS -ne 0 ]; then
  echo "⚠️ VALIDAÇÃO PÓS-EDIÇÃO FALHOU:"
  echo "$OUTPUT" | tail -20
  echo "Corrija o frontmatter/estrutura da skill antes de continuar."
  exit 1
fi
exit 0
