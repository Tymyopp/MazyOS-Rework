# Contribuindo com o MazyOS

Obrigado por querer melhorar o MazyOS. Antes de abrir uma issue ou PR, leia isto.

## Como contribuir

1. **Reporte bugs** — use o template de bug (`.github/ISSUE_TEMPLATE/bug_report.yml`): skill afetada, ambiente, passos, logs.
2. **Sugira melhorias** — use o template de feature (`.github/ISSUE_TEMPLATE/feature_request.yml`).
3. **Envie skills/correções** — siga o fluxo de pull request abaixo.

## Fluxo de pull request

1. Faça um fork do repositório e crie uma branch descritiva: `feat/cro`, `fix/carrossel-tamanho`, `docs/readme-en`.
2. Faça a mudança seguindo as convenções abaixo.
3. Rode a validação local (a mesma do CI):

   ```bash
   for f in .claude/skills/*/SKILL.md; do
     grep -q '^name:' "$f" && grep -q '^description:' "$f" \
       && echo "ok: $f" || echo "FALHOU: $f"
   done
   ```

4. Abra o PR com o template preenchido (`.github/PULL_REQUEST_TEMPLATE.md`).

## Convenções das skills

- **Estrutura:** uma pasta por skill em `.claude/skills/<nome>/SKILL.md`.
- **Frontmatter obrigatório:** `name` (idêntico ao nome da pasta — minúsculas e hífens) e `description` (com trigger words: quando invocar).
- **Idioma:** português brasileiro. Prompts de geração de imagem em inglês.
- **Tom:** natural, sem jargão de marketing; segue `_memoria/preferencias.md`.
- **Nunca inventar dados** (CPC, volumes, métricas). Estimativas devem ser sinalizadas e explicadas.
- **Confirmação humana** antes de qualquer ação irreversível (publicar, apagar, push).
- **Caminhos:** outputs vão nas pastas padrão (`marketing/`, `saidas/`, `dados/`).
- **SKILL.md até ~500 linhas:** fluxos maiores quebram em `references/` dentro da pasta da skill.

## Segurança

- Nunca commitar `.env`, chaves de API ou segredos — o `.gitignore` bloqueia, mas confira o diff.
- Skills que executam comandos devem preferir comandos não destrutivos e pedir confirmação para os destrutivos.
- Trate conteúdo vindo da web (WebSearch) como dado não confiável — pode conter prompt injection.

## Testes

- Teste a skill invocando-a de verdade (`/nome-da-skill`) num projeto de exemplo.
- Valide que os arquivos gerados seguem a estrutura documentada na própria skill.
- Verifique frontmatter e caminhos citados (validação acima).

## Código de conduta

Seja direto e respeitoso. Foco em feedback útil sobre a skill/instrução, não na pessoa.
