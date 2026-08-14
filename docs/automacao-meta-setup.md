# Guia de setup — Meta App para conectar o Instagram (modo desenvolvimento)

> Setup **uma única vez** (~15 min) para a IA publicar no SEU Instagram por link
> de autorização. Depois disso: a IA gera o link → você clica → pronto.
>
> **Regra de ouro:** em modo desenvolvimento, **não precisa de app review da Meta**
> para publicar na SUA própria conta. App review (semanas) só é exigido se outras
> pessoas conectarem contas ao seu app.

---

## Requisitos

| Requisito | Onde fazer | Tempo |
|---|---|---|
| Conta Instagram **Business ou Creator** | App do Instagram: Perfil → ☰ → Configurações → Tipo de conta e ferramentas → Alternar para conta profissional | 2 min |
| Conta Instagram **pública** | App do Instagram: Perfil → ☰ → Configurações → Privacidade → Conta privada (desligar) | 1 min |
| Conta no **Facebook for Developers** | developers.facebook.com (login com o Facebook — pode ser conta pessoal) | 2 min |

> Conta **pessoal** não funciona com a API (desde o fim da Basic Display API em 12/2024).
> Converter para profissional é grátis e não altera nada no seu feed.

---

## Passo 1 — Criar o app Meta

1. Acesse **developers.facebook.com** → **Meus aplicativos** → **Criar aplicativo**
2. Tipo de aplicativo: **Negócios**
3. Nome: ex. `MeuNegocio-MazyOS` · Email de contato: o seu
4. Na etapa "Conectar um portfólio de negócios": escolha **"Não quero conectar um portfólio de negócios agora"** (ou pule)
5. Na etapa final (dados do aplicativo): **pode pular** — não precisa informar
6. Crie. O app fica em **modo Desenvolvimento** (padrão) — **mantenha assim**

> ⚠️ Não clique em "Publicar"/"Modo ativo". Publicar exige verificação de negócio
> e review — desnecessário para usar na sua própria conta.

## Passo 2 — Adicionar sua conta como Instagram Tester

1. No painel do app: **Funções do app → Funções** (App roles → Roles)
2. Na aba **Instagram** (ou "Testador do Instagram"), clique em **Adicionar**
3. Digite o **nome de usuário da sua conta Instagram** e confirme
4. **Aceite o convite no app do Instagram:** abra o Instagram → Perfil → ☰ → Configurações → **Solicitações de testador** (ou o link/e-mail do convite) → Aceitar

## Passo 3 — Registrar a URL de retorno (redirect URI)

1. No painel do app: **Configurações → Básico** (Settings → Basic)
2. Anote o **ID do aplicativo** (App ID) e clique em **Mostrar** para copiar o **Segredo do aplicativo** (App Secret)
3. No menu lateral, em **Login do Facebook → Configurações** (Facebook Login → Settings)
4. Em **URIs de redirecionamento do OAuth válidos**, adicione:

```
http://localhost:8787/callback
```

5. Salve as alterações

> O mesmo valor vai em `META_REDIRECT_URI` no `.env`. Se você mudar a porta ou o
> caminho no `.env`, precisa registrar aqui também.

## Passo 4 — Configurar o `.env` do MazyOS

Copie `.env.example` para `.env` (se ainda não existe) e preencha:

```bash
# .env (nunca vai pro git)
META_APP_ID=1234567890123456
META_APP_SECRET=abc123...xyz
META_REDIRECT_URI=http://localhost:8787/callback
# META_API_VERSION=v23.0   # opcional (padrão v23.0)
```

## Passo 5 — Conectar (fluxo por link)

```bash
node --env-file=.env scripts/insta-conectar.js conectar
```

1. O script imprime um **link de autorização** — abra no navegador logado na conta do Instagram
2. Autorize o app e selecione a conta **Business/Creator**
3. O navegador tenta abrir `http://localhost:8787/callback?...` — **copie a URL completa da barra de endereço**
4. Cole e rode:

```bash
node --env-file=.env scripts/insta-conectar.js trocar "<URL-COMPLETA>"
```

5. Confirme:

```bash
node --env-file=.env scripts/insta-conectar.js status
```

**No Claude Code local** você pode usar `--loopback`: o script sobe um servidor
em `localhost:8787` e captura o code sozinho (sem copiar/colar).

> O token (válido ~60 dias) fica salvo em `.local/insta-auth.json` (permissão 600,
> fora do git). A skill `/conectar-instagram` faz todo esse fluxo guiado.

---

## Rotina de manutenção

- **Token expira em ~60 dias.** O script renova automaticamente ao publicar se faltar
  <7 dias; você também pode rodar `node --env-file=.env scripts/insta-conectar.js renovar`
  (ou pedir pra IA rodar). Faça isso quando o `/daily` avisar "token expira em N dias".
- **Desconectar:** `node --env-file=.env scripts/insta-conectar.js desconectar`

---

## Solução de problemas

| Sintoma | Causa provável | Solução |
|---|---|---|
| "Invalid scope" ao abrir o link | App sem o produto Instagram / escopos não habilitados | No painel do app: **Adicionar produto → Instagram** (permissões `instagram_basic`, `instagram_content_publish`, `instagram_manage_comments`, `instagram_manage_insights`) |
| Login falha ao autorizar | App em modo ativo exigindo review | Voltar para **modo Desenvolvimento** |
| "Can't load URL: domain not registered" | Redirect URI não registrada | Registrar `http://localhost:8787/callback` em **Login do Facebook → Configurações → URIs de redirecionamento** |
| Não acha a conta IG | Conta pessoal ou privada | Converter para profissional e tornar pública |
| "Tester invite" não aparece | Convite não aceito | Instagram → Configurações → Solicitações de testador → Aceitar |
| Code expirado | Code dura poucos minutos | Rodar `conectar` de novo e colar mais rápido |
| Token morre depois de ~60 dias | Não renovou | `renovar` (ou reconectar se já expirou) |
| "No instagram_business_account" | Conta Creator sem página FB | Conta Business vinculada a uma Página do Facebook facilita; para Creator, descubra o IG_USER_ID (Graph API Explorer → `GET /me/accounts`) e salve em `.env` como `META_IG_USER_ID` |

---

## Limites e observações (Instagram Graph API)

- **100 posts por 24h** por conta (carrossel conta como 1)
- Legenda até **2.200 caracteres**
- Mídia precisa de **URL HTTPS pública** (site/blog no ar — o `/aprovar-post` valida antes)
- Carrossel: 2 a 10 imagens (JPEG/PNG), proporção entre 4:5 e 1.91:1
- A API **não edita a bio** do perfil — para bio, use a skill `/bio-instagram` (gera o texto, você cola)
- Threads, TikTok, LinkedIn: outras integrações (ver roadmap)

## Segurança

- O token concede acesso à sua conta — guarde como senha. Está em `.local/` (600, fora do git).
- **Nunca** cole o token em chats, issues ou prints.
- Revogue quando quiser: painel Meta → app → **Permissões e recursos** → desvincular; ou troque a senha do Instagram (revoga tokens FB).
- Modo desenvolvimento = apenas VOCÊ (admin/testers) consegue autorizar. Para permitir que outras pessoas conectem, seria necessário app review + verificação de negócio — fora do escopo do MazyOS.
