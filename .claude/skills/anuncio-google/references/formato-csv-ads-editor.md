# Formato CSV do Google Ads Editor (importação)

Referência da skill `/anuncio-google`. Colunas esperadas por tipo de arquivo
(ordem livre; o Editor casa pelo cabeçalho).

## campanhas.csv
`Campaign, Campaign type, Status, Budget, Budget type, Start date, Ad rotation`

## grupos.csv
`Campaign, Ad group, Status, Default max CPC, Ad group type`

## keywords.csv
`Campaign, Ad group, Keyword, Match type, Status, Max CPC, Final URL`
Match type: `Exact`, `Phrase`, `Broad` (o Editor aceita também `+palavra`).

## keywords-negativas.csv
`Campaign, Ad group, Keyword, Match type, Status` — status `Removed` no grupo
ou linha sem `Ad group` = negativa de campanha.

## anuncios.csv (RSA)
`Campaign, Ad group, Ad type (Responsive search ad), Headline 1..15, Description 1..4, Final URL`
- Headline: máx 30 caracteres. Description: máx 90 caracteres.

## extensoes-*.csv
- sitelinks: `Campaign, Sitelink text, Sitelink final URL, Sitelink description line 1, Sitelink description line 2`
- chamadas: `Campaign, Phone number, Phone country code, Call only`
- snippets: `Campaign, Structured snippet header, Structured snippet values`
- preco: `Campaign, Price item type, Price item header, Price item price, Price item currency, Price item unit`

## Importação
1. Google Ads Editor (desktop) → Conta → Importar → CSV
2. Subir na ordem: campanhas → grupos → keywords → negativas → anúncios → extensões
3. Revisar status (tudo deve vir `Paused`) e ativar manualmente após aprovação
