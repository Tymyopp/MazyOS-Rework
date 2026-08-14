# Política de Segurança do MazyOS

## Por que segurança importa aqui

O MazyOS é um conjunto de skills (instruções Markdown) que orientam agentes de IA a
executar comandos, gerar arquivos e acessar APIs na máquina do usuário. Vulnerabilidades
em skills podem levar à execução de comandos não intencionais, vazamento de chaves de API
ou perda de dados.

## Reportando uma vulnerabilidade

**NÃO abra issue pública** para vulnerabilidades. Use o canal privado:

- **GitHub Security Advisory:** aba *Security* do repositório → *Report a vulnerability*
- **E-mail:** informe-se com o mantenedor (mazzeoia.com.br)

### Expectativas (SLA)

| Etapa | Prazo |
|---|---|
| Confirmação de recebimento | 48h úteis |
| Avaliação e resposta | 7 dias úteis |
| Correção / mitigação | conforme severidade |

## Áreas de risco conhecidas

| Área | Risco | Mitigação |
|---|---|---|
| `.env` e chaves de API (Meta, OpenAI) | Vazamento via commit | `.gitignore` bloqueia `.env`, `*.pem`, `*.key`, tokens; revisar diff antes do `/salvar` |
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
