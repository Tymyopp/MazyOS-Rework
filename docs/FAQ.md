# FAQ — MazyOS

Perguntas que a comunidade mais faz, com respostas diretas.

## Instalação

**Preciso saber programar?**
Não. O /instalar guia tudo; o Claude instala o que faltar (Git, Node) — autorize quando perguntar.

**Preciso de plano pago do Claude?**
Sim — o MazyOS roda dentro do Claude Code (plano Pro é suficiente; Max é conforto). Em outros
agentes (Codex, Cursor, Antigravity) os planos variam; o Antigravity tem opção gratuita pra começar.

**"Clica no segundo Yes" — o que é isso?**
O instalador faz perguntas de confirmação. Aceitar os padrões ("yes") acelera a instalação.
É comportamento normal, não erro. Pode dar vários *yes* até concluir.

**O que é essa pasta .vscode que apareceu?**
Customizações de cores — opcional. Pode ignorar ou apagar.

**Git não está instalado / não reconhecido.**
Pergunte pro próprio Claude: "Como instalar o Git e adicionar ao PATH no Windows/Mac?" — ele dá o passo a passo.

## Organização

**Um MazyOS por cliente?**
Sim, o recomendado. Uma pasta (e um MazyOS) por cliente; agência multi-cliente pode usar
`/novo-projeto` pra isolar cada um dentro da mesma pasta, mas o ideal é pasta separada.
Dica da comunidade: pinte a janela do VS Code com cor diferente por cliente.

**Posso atender vários clientes na mesma instalação?**
Sim, com `/novo-projeto` (pastas isoladas com CLAUDE.md próprio). Mas fica mais limpo separar.

## Conteúdo e produção

**O limite de design do carrossel estoura rápido.**
Estratégia da comunidade: primeira versão no modo Design (esqueleto bonito) e depois joga no
Claude Code pra refinar.

**Consigo pausar e retomar?**
Sim — peça "pausar o tema atual" e retome depois do ponto exato. Pra empresas diferentes,
use janelas/pastas separadas.

**Publicar no Instagram dá trabalho?**
Uma vez configurado (tokens Meta + site no ar), o `/aprovar-post` faz tudo: blog + Insta + Facebook.
LinkedIn ainda é manual (texto sai pronto em `legenda-linkedin.md`).

## Redes sociais e integrações

**Como faço a IA publicar no meu Instagram?**
Rode `/conectar-instagram`: você cria um Meta App em modo desenvolvimento (guia em
`docs/automacao-meta-setup.md`, ~15 min), a IA te manda o link de autorização, você
clica e autoriza — token de 60 dias com renovação automática. Depois `/aprovar-post`
publica carrossel, imagem, Reel ou Story.

**Preciso de conta Business/Creator?**
Sim — a Meta exige conta profissional e pública para publicação via API (conta
pessoal não funciona desde 12/2024). A conversão é grátis e leva 2 minutos.

**A IA consegue editar minha bio?**
Não — a API do Instagram não edita perfil. A skill `/bio-instagram` gera a bio
otimizada (≤150 caracteres, 3 opções), destaques e link na bio — você cola no app.

**Dá pra agendar posts para o futuro?**
Sim — `/agendar-posts` agenda em data futura via Postiz (self-host, grátis) ou
Post for Me (SaaS). O `/agendar` planeja o calendário; o `/agendar-posts` executa.

**E o TikTok?**
`/postar-tiktok` publica vídeos via API oficial. Atenção: em modo sandbox só
publica vídeos privados — posts públicos exigem auditoria da TikTok (ou usar
Post for Me, que tem credenciais pré-aprovadas).

**Como vejo os resultados?**
`/insta-insights` puxa alcance, impressões, engajamento e seguidores — alimenta o
painel KPI e o `/weekly`.

## Custos e uso

**O MazyOS é gratuito?**
O repositório é open source (MIT). O site oficial vende acesso com aulas e suporte — a
separação está em `docs/premium.md`.

**Gasta muitos tokens?**
Uma sessão normal de produção consome pouco. O `/daily` é leve; evite rodar `/seo` completo
todo dia — rode os passos avulsos (`/seo passo 3`) quando precisar.

**Posso usar pra revender serviço?**
Pode usar o sistema pra operar clientes seus (isso é o objetivo). Revender o repositório como
produto exige atenção à licença MIT (atribuição) e às regras do site oficial — ver `docs/premium.md`.
