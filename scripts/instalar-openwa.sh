#!/usr/bin/env bash
# instalar-openwa.sh — bootstrap do gateway OpenWA (WhatsApp) para o MazyOS.
#
# Funciona em: máquina local (Linux/macOS), VPS ou sandbox.
# - Se tiver Docker: usa docker compose (recomendado em produção).
# - Sem Docker: instala Node 22 local (tools/node22) e roda direto.
#
# Uso:
#   ./scripts/instalar-openwa.sh            # instala + inicia
#   ./scripts/instalar-openwa.sh --sessao <nome>   # cria sessão e salva o QR
#   ./scripts/instalar-openwa.sh --qr <nome>       # re-gera o QR (expira ~20s)
#
# Depois: preencha OPENWA_URL e OPENWA_API_KEY no .env do MazyOS
# (a chave é impressa no final e salva em .local/openwa-master-key.txt).
set -euo pipefail
cd "$(dirname "$0")/.."

NOME_SESSAO="${2:-mazyos-negocio}"
OPENWA_DIR="${OPENWA_DIR:-$PWD/../OpenWA}"
KEY_FILE="$PWD/.local/openwa-master-key.txt"

echo "== OpenWA bootstrap =="

# ---------- 1. Node 22 (se não houver docker) ----------
if command -v docker >/dev/null 2>&1; then
  echo "[1/6] Docker detectado — usaremos docker compose (recomendado)."
  MODO=docker
else
  MODO=bare
  echo "[1/6] Sem Docker — preparando Node 22 local..."
  if [ ! -x "$PWD/tools/node22/bin/node" ]; then
    mkdir -p tools
    VER=$(curl -s https://nodejs.org/dist/latest-v22.x/ | grep -oE 'node-v22\.[0-9]+\.[0-9]+-linux-x64\.tar\.xz' | head -1)
    [ -n "$VER" ] || { echo "Falha ao descobrir versão do Node."; exit 1; }
    curl -sL -o /tmp/node22.tar.xz "https://nodejs.org/dist/latest-v22.x/$VER"
    tar -xJf /tmp/node22.tar.xz -C tools/
    mv tools/node-v22* tools/node22
  fi
  export PATH="$PWD/tools/node22/bin:$PATH"
  node -v
fi

# ---------- 2. Clonar OpenWA ----------
echo "[2/6] Clonando OpenWA (se necessário)..."
if [ ! -d "$OPENWA_DIR/package.json" ]; then
  git clone --depth 1 https://github.com/rmyndharis/OpenWA.git "$OPENWA_DIR"
fi
cd "$OPENWA_DIR"

# ---------- 3. .env ----------
echo "[3/6] Configurando .env..."
if [ ! -f .env ]; then
  MASTER_KEY="mzy_$(openssl rand -hex 16)"
  mkdir -p "$PWD/../.local"
  echo "$MASTER_KEY" > "$KEY_FILE"
  chmod 600 "$KEY_FILE"
  cat > .env << ENVEOF
NODE_ENV=development
PORT=2785
DATABASE_TYPE=sqlite
DATABASE_NAME=./data/openwa.sqlite
DATABASE_SYNCHRONIZE=true
DATABASE_LOGGING=false
ENGINE_TYPE=whatsapp-web.js
SESSION_DATA_PATH=./data/sessions
PUPPETEER_HEADLESS=true
PUPPETEER_ARGS=--no-sandbox,--disable-setuid-sandbox,--disable-dev-shm-usage
WEBHOOK_TIMEOUT=10000
WEBHOOK_RETRY_DELAY=5000
AUTO_START_SESSIONS=true
API_MASTER_KEY=$MASTER_KEY
MCP_ENABLED=true
LOG_LEVEL=info
ENVEOF
  echo "   .env criado (chave em $KEY_FILE)"
fi

# ---------- 4. Instalar + build ----------
echo "[4/6] Instalando dependências + build (pode levar alguns minutos)..."
if [ "$MODO" = docker ]; then
  docker compose up -d
  echo "   OpenWA no ar: http://localhost:2785 (dashboard) /api/docs (swagger)"
else
  npm install --no-audit --no-fund >/dev/null 2>&1 || npm install --no-audit --no-fund
  npx puppeteer browsers install chrome >/dev/null 2>&1 || true
  npm run build >/dev/null 2>&1 || { echo "Build falhou — veja os logs."; exit 1; }
  echo "   Build OK."
fi

# ---------- 5. Iniciar ----------
echo "[5/6] Iniciando serviço..."
if [ "$MODO" = bare ]; then
  mkdir -p "$PWD/../.local"
  nohup node dist/main.js > "$PWD/../.local/openwa.log" 2>&1 &
  echo "   PID $! — log em .local/openwa.log"
  sleep 6
fi
KEY=$(grep -oE 'mzy_[a-f0-9]+' .env | head -1)
curl -s -o /dev/null -w "   API: HTTP %{http_code}\n" -H "X-API-Key: $KEY" http://localhost:2785/api/sessions || true

# ---------- 6. Sessão + QR ----------
echo "[6/6] Sessão '$NOME_SESSAO' + QR..."
SID=$(curl -s -X POST http://localhost:2785/api/sessions \
  -H "X-API-Key: $KEY" -H "Content-Type: application/json" \
  -d "{\"name\":\"$NOME_SESSAO\"}" | python3 -c "import json,sys;print(json.load(sys.stdin).get('id',''))" 2>/dev/null || true)
if [ -z "$SID" ]; then
  SID=$(curl -s -H "X-API-Key: $KEY" http://localhost:2785/api/sessions | python3 -c "import json,sys;d=json.load(sys.stdin);print([s['id'] for s in d if s['name']=='$NOME_SESSAO'][0])" 2>/dev/null || true)
fi
[ -n "$SID" ] && curl -s -X POST -H "X-API-Key: $KEY" "http://localhost:2785/api/sessions/$SID/start" >/dev/null 2>&1 || true
sleep 4
curl -s -H "X-API-Key: $KEY" "http://localhost:2785/api/sessions/$SID/qr" | python3 -c "
import json,sys,base64
d=json.load(sys.stdin)
qr=d.get('qrCode','')
if qr:
    b64=qr.split(',')[1] if ',' in qr else qr
    open('$PWD/tools/wa-sessao/wa-qr.png','wb').write(base64.b64decode(b64))
    print('   ✓ QR salvo em tools/wa-sessao/wa-qr.png — escaneie! (expira ~20s)')
else:
    print('   QR ainda não disponível — rode: ./scripts/instalar-openwa.sh --qr $NOME_SESSAO')
" || true

echo ""
echo "== Pronto =="
echo "API:      http://localhost:2785"
echo "Swagger:  http://localhost:2785/api/docs"
echo "API Key:  $(cat "$KEY_FILE" 2>/dev/null || echo 'ver .env do OpenWA')"
echo ""
echo "No .env do MazyOS:"
echo "  OPENWA_URL=http://localhost:2785"
echo "  OPENWA_API_KEY=$(cat "$KEY_FILE" 2>/dev/null || echo '<chave acima>')"
