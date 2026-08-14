#!/usr/bin/env bash
# validate-skills.sh — validação completa do MazyOS (local + CI)
# Cobre: frontmatter obrigatório/estendido, paridade .claude/.agents,
# marketplace.json, caminhos citados e segredos versionados.
# Uso: ./scripts/validate-skills.sh
set -uo pipefail
cd "$(dirname "$0")/.."
ERROS=0

echo "== 1. Frontmatter (name, description, version, model, requires) =="
for PASTA in .claude/skills .agents/skills; do
  for f in "$PASTA"/*/SKILL.md; do
    [ -e "$f" ] || continue
    base=$(basename "$f"); dir=$(basename "$(dirname "$f")")
    for campo in name description version model requires; do
      grep -q "^$campo:" "$f" || { echo "  ✗ $PASTA/$dir: falta '$campo'"; ERROS=1; }
    done
    name=$(grep -m1 '^name:' "$f" | cut -d: -f2 | tr -d ' ')
    [ "$name" = "$dir" ] || { echo "  ⚠ $PASTA/$dir: name='$name' difere da pasta"; }
  done
done
[ $ERROS -eq 0 ] && echo "  ✓ frontmatter OK nas duas pastas"

echo "== 2. Paridade .claude/skills ↔ .agents/skills =="
for f in .claude/skills/*/SKILL.md; do
  [ -e "$f" ] || continue
  dir=$(basename "$(dirname "$f")")
  cmp -s "$f" ".agents/skills/$dir/SKILL.md" || { echo "  ✗ $dir divergente"; ERROS=1; }
done
[ $ERROS -eq 0 ] && echo "  ✓ 100% idênticas"

echo "== 3. marketplace.json válido =="
if python3 -m json.tool .claude-plugin/marketplace.json >/dev/null 2>&1; then
  echo "  ✓ JSON válido"
else
  echo "  ✗ marketplace.json inválido"; ERROS=1
fi

echo "== 4. Caminhos citados existem =="
for f in .claude/skills/*/SKILL.md; do
  [ -e "$f" ] || continue
  for p in $(grep -oE '(_memoria|identidade|marketing|saidas|dados|scripts|templates)/[a-zA-Z0-9/_.-]+' "$f" | sort -u); do
    base="${p%%/*}"
    [ -d "$base" ] || { echo "  ⚠ $f cita $p (pasta '$base' não existe)"; }
  done
done
echo "  ✓ varredura concluída (avisos acima, se houver)"

echo "== 5. Segredos versionados =="
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  if git ls-files | grep -qE '(^\.env$|\.pem$|\.key$|secrets\.json|credentials\.json)'; then
    echo "  ✗ SEGREDO VERSIONADO — remova imediatamente"; ERROS=1
  else
    echo "  ✓ nenhum segredo"
  fi
fi

echo "== 6. Guard de leak (tokens REAIS no working tree) =="
# Padrão herdado do auto-sync.sh do The-ALL: bloqueia ANTES do commit
# se um token REAL (não placeholder) estiver em qualquer arquivo.
LEAK=$(grep -rEn "(ghp|gho|ghs|ghr)_[A-Za-z0-9]{30,}|hf_[A-Za-z0-9]{30,}|sk-[A-Za-z0-9]{30,}|xox[baprs]-[A-Za-z0-9-]{20,}|AIza[0-9A-Za-z_-]{30,}|EAAG[A-Za-z0-9]{40,}|AKIA[0-9A-Z]{16}" \
  --include="*.py" --include="*.js" --include="*.md" --include="*.json" --include="*.sh" --include="*.yml" --include="*.yaml" \
  . 2>/dev/null | grep -v "^Binary" | grep -v "node_modules" | grep -v "\.agents/skills" | head -5)
if [ -n "$LEAK" ]; then
  echo "  ✗ TOKEN REAL detectado no working tree — ABORTANDO:"
  echo "$LEAK" | sed 's/=.*/=***/' | head -5
  ERROS=1
else
  echo "  ✓ nenhum token real"
fi

if [ $ERROS -eq 0 ]; then
  echo ""; echo "✓ VALIDAÇÃO COMPLETA: tudo OK"
else
  echo ""; echo "✗ VALIDAÇÃO FALHOU — corrija antes de continuar"; exit 1
fi
