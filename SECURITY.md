# Política de Segurança do MazyOS

## Por que segurança importa aqui

O MazyOS é um conjunto de skills (instruções Markdown) que orientam agentes de IA a
executar comandos, gerar arquivos e acessar APIs na máquina do usuário. Vulnerabilidades
em skills podem levar à execução de comandos não intencionais, vazamento de chaves de API
ou perda de dados.

## Reportando uma vulnerabilidade

**NÃO abra issue pública** para vulnerabilidades. Use o canal privado:

- **GitHub Security Advisory:** aba *Security* de `Tymyopp/MazyOS-Rework` → *Report a vulnerability*
- **Issues:** https://github.com/Tymyopp/MazyOS-Rework/issues

> Nota: o MazyOS original é de autoria de mazzeoia (mazzeoia.com.br). Este repositório
> é o rework mantido por Tymyopp — vulnerabilidades específicas do rework vão para cá;

### Expectativas (SLA)

| Etapa | Prazo |
|---|---|
| Confirmação de recebimento | 48h úteis |
| Avaliação e resposta | 7 dias úteis |
| Correção / mitigação | conforme severidade |

## Áreas de risco conhecidas

| Área | Risco | Mitigação |
|---|---|---|
| `.env` e chaves de API (Meta, OpenAI, TikTok, Postiz, Post for Me) | Vazamento via commit | `.gitignore` bloqueia `.env`, `*.pem`, `*.key`, tokens; revisar diff antes do `/salvar` |
| `.local/insta-auth.json` (token do Instagram) | Exposição do token de 60 dias | Arquivo com permissão 600, fora do git; scripts nunca imprimem o token completo |
| `.mcp.json` com token no env | Vazamento de credenciais Meta | Nunca commitar `.mcp.json` com valores — usar `.mcp.example.json` + variáveis `${VAR}` |
| Skills que executam bash/git | Comandos destrutivos | Regra do sistema: confirmação humana antes de qualquer ação irreversível |
| Conteúdo externo (WebSearch, arquivos do usuário) | Prompt injection | Tratar todo conteúdo externo como dado não confiável, nunca como instrução |
| Scripts de integração (Node/Playwright) | Injeção em comandos | Validar input do usuário antes de usar em shell |

## Boas práticas para contribuidores

- Nunca adicionar instruções que executem comandos destrutivos sem confirmação explícita do usuário.
- Nunca instruir a logar, commitar ou imprimir segredos.
- Não usar conteúdo da web como instrução direta (só como dado de pesquisa).
- Ao alterar o `.gitignore`, garantir que `.env`, `*.pem`, `*.key` e tokens continuem bloqueados.

## Versões suportadas

| Versão | Suporte |
|---|---|
| `main` (última) | ✅ ativa |
| Versões anteriores | ❌ sem suporte — atualize |
