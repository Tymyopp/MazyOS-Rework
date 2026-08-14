#!/usr/bin/env bash
# bootstrap.sh — setup definitivo do MazyOS em máquina nova (one-shot, idempotente).
# Inspirado no bootstrap.sh do The-ALL (ENI & L0) — mesmo padrão de env em base64.
#
# USO EM MÁQUINA NOVA (ex.: colar num terminal):
#   curl -fsSL https://raw.githubusercontent.com/Tymyopp/MazyOS-Rework/main/scripts/bootstrap.sh -o /tmp/mb.sh && bash /tmp/mb.sh
#
# OU local:
#   cd /caminho/do/mazyos && bash scripts/bootstrap.sh
#
# ACEITA:
#   MAZYOS_ENV_B64     - .env inteiro em base64 (seguro de colar no terminal)
#   MAZYOS_AUTO_YES=1  - não pede confirmação
#   MAZYOS_SKIP_DEPS=1 - pula instalação de dependências
set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log() { echo -e "${BLUE}[bootstrap]${NC} $1"; }
ok()  { echo -e "${GREEN}✓${NC} $1"; }
warn(){ echo -e "${YELLOW}⚠${NC} $1"; }

# ---------- 1. Descobrir a raiz ----------
if [ -f "$PWD/CLAUDE.md" ] && [ -d "$PWD/.claude/skills" ]; then
  ROOT="$PWD"
elif [ -d "$PWD/mazyos" ]; then
  ROOT="$PWD/mazyos"
else
  log "Clonando MazyOS-Rework..."
  git clone --depth 1 https://github.com/Tymyopp/MazyOS-Rework.git mazyos 2>/dev/null
  ROOT="$PWD/mazyos"
fi
cd "$ROOT"
log "Raiz: $ROOT"

# ---------- 2. Dependências ----------
if [ "${MAZYOS_SKIP_DEPS:-0}" != "1" ]; then
  log "Verificando Node..."
  if command -v node >/dev/null 2>&1 && [ "$(node -v | cut -d. -f1 | tr -d v)" -ge 20 ]; then
    ok "Node $(node -v)"
  else
    warn "Node 20+ não encontrado — instale em https://nodejs.org (LTS) e rode de novo."
    [ "${MAZYOS_AUTO_YES:-0}" != "1" ] && read -p "Continuar mesmo assim? (s/N) " -r && [[ $REPLY =~ ^[Ss]$ ]] || exit 1
  fi
  log "Verificando Git..."
  command -v git >/dev/null 2>&1 && ok "Git $(git --version | cut -d' ' -f3)" || warn "Git ausente — instale e rode de novo."
fi

# ---------- 3. .env ----------
if [ ! -f .env ]; then
  cp .env.example .env
  log ".env criado a partir do exemplo."
fi
if [ -n "${MAZYOS_ENV_B64:-}" ]; then
  echo "$MAZYOS_ENV_B64" | base64 -d > .env
  ok ".env restaurado via base64 (${#MAZYOS_ENV_B64} chars)."
fi
chmod 600 .env 2>/dev/null || true

# ---------- 4. Permissões dos scripts ----------
chmod +x scripts/*.sh scripts/hooks/*.sh 2>/dev/null || true
ok "Scripts executáveis."

# ---------- 5. Validação ----------
log "Rodando validação..."
if command -v bash >/dev/null 2>&1; then
  bash scripts/validate-skills.sh && ok "Validação OK" || warn "Validação falhou (veja acima)"
fi

# ---------- 6. Resumo ----------
log "Verificando git remote..."
if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin https://github.com/Tymyopp/MazyOS-Rework.git 2>/dev/null || true
fi
git remote -v | head -1 || true

echo ""
echo -e "${GREEN}==============================================${NC}"
echo -e "${GREEN}  MazyOS pronto! Próximos passos:${NC}"
echo -e "${GREEN}==============================================${NC}"
echo "  1. Preencha o .env (credenciais das plataformas)"
echo "  2. Rode: node scripts/status.js        → painel do negócio"
echo "  3. Rode: node scripts/check-integracao.js → o que falta em cada plataforma"
echo "  4. No Claude Code: /instalar (ou /abrir se já configurou)"
echo ""
echo "  Base64 do .env para máquina nova:"
echo "  MAZYOS_ENV_B64=\"\$(base64 -w0 .env)\"  (reuse este bootstrap)"
