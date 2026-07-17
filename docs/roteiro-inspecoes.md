# Roteiro de Inspeções

Use este roteiro para criar novas inspeções de canais, séries ou métodos no Inspetor BudGanja.

## Objetivo

Transformar um canal ou tema técnico em um relatório editorial reutilizável, com catálogo, método e links para ferramentas do site.

## Fontes

- Canal público do YouTube ou feed exportado localmente
- Títulos, resumos e datas dos vídeos
- Páginas do site que complementam o tema: calculadoras, manuais, pesquisas e inspeções relacionadas

## Passo a passo

1. Defina o recorte: canal inteiro, série de vídeos ou tópico específico.
2. Liste os vídeos e confirme títulos, datas e descrições.
3. Agrupe o acervo por temas com palavras-chave simples.
4. Escreva o bloco `## Hipóteses e método` com 2 hipóteses e 4 passos objetivos.
5. Produza o catálogo completo e, se couber, um embed de referência com `@youtube`.
6. Relacione o material com calculadoras, manuais e inspeções já publicadas.
7. Feche com um `Status` claro: aprovado, em revisão ou referência externa.

## Estrutura recomendada do post

- `## Escopo`
- `## Objeto inspecionado`
- `## Hipóteses e método`
- `## Perfil editorial (achados)`
- `## Mapa temático do acervo`
- `## Catálogo completo`
- `## Vídeo de referência (embed)`
- `## Complementaridade com o Inspetor BudGanja`
- `## Como repetir o método`
- `## Status`

## Convenções

- Use `slug` curto e previsível, por exemplo `inspecao-canal-nome`
- Guarde a série em `series` e o nome legível em `seriesLabel`
- Escolha `seriesOrder` para manter a ordem da biblioteca
- Prefira `coverImage` do vídeo principal do relatório
- Mantenha os créditos do canal de origem sempre explícitos

## Validação

Depois de criar ou alterar uma inspeção, rode:

```powershell
npm run build:posts
```

Depois confira:

- a página `posts/post-*.html`
- `posts-public.json`
- a biblioteca em `/biblioteca/inspecoes/`

## Modelo curto de nota metodológica

> Inspeção editorial produzida pelo Inspetor BudGanja de forma independente. O conteúdo audiovisual pertence ao criador original. A análise usa inventário do catálogo público, agrupamento temático e cruzamento com ferramentas do site.