# Roteiro de Inspeções

Use este roteiro para criar novas inspeções de canais, séries, equipamentos, cursos, **artigos científicos** ou **lojas do nicho cultivo** no Inspetor BudGanja.

## Objetivo

Transformar um canal, tema técnico ou vitrine comercial em um relatório editorial reutilizável, com catálogo, método e links para ferramentas do site.

## Tipos no hub (`/biblioteca/inspecoes/`)

| Tipo | `series` (convenção) | Exemplo de slug |
|------|----------------------|-----------------|
| Canais | `canal-<nome>` | `inspecao-canal-movrecam` |
| Equipamentos | `verificacao-equipamento` | `inspecao-marshydro-brasil` |
| Cursos | `formacao-academica` | `inspecao-curso-unifesp-…` |
| **Artigos** | `artigos-cientificos` | `inspecao-artigo-<sobrenome-tema>` |
| **Lojas** | `loja-cultivo` | `inspecao-loja-<nome>` |
| **Insumos** | `insumos-cultivo` | `inspecao-insumo-<marca>` |
| **Legado** | `legado-pessoas` | `inspecao-<pessoa>` |
| **Divulgação** | `divulgacao-saude` | `inspecao-divulgacao-<nome>` |
| **Derivados de risco** | `plantas-derivados-risco` | `inspecao-derivado-<especie>` |
| **Palavras** | `palavras-origem` | `inspecao-palavra-<vocábulo>` |
| **Pessoas** | `pessoas-historia` | `inspecao-figura-<nome>` *(distinto do Legado canábico)* |

## Fila de sugestões

A secção **Sugestões** do hub lê `content/inspecoes-sugestoes.json` (público).

Campos úteis por item: `id`, `title` (+ `titleEn`/`titleEs`), `tipo`, `priority` (1–5), `status` (`ideia` | `a-fazer` | `feita`), `why`, `sources`, `suggestedSlug`, `doneHref`, `seriesHint`, `notes`.

Quando o post com `suggestedSlug` (ou `doneHref`) estiver publicado, o hub marca a sugestão como **feita** automaticamente — não misturar backlog com cards publicados.

## Fontes

- Canal público do YouTube ou feed exportado localmente
- Títulos, resumos e datas dos vídeos
- **Artigos:** DOI, PMID, texto completo (preferir open access), Key Points / Abstract / Methods / Results / Discussion
- **Lojas:** home, catálogo, FAQ/institucional, políticas de envio e pagamento
- Páginas do site que complementam o tema: calculadoras, manuais, pesquisas e inspeções relacionadas

## Passo a passo

1. Defina o recorte: canal inteiro, série de vídeos, equipamento, curso, **artigo** ou **loja**.
2. Liste as fontes (vídeos, fichas técnicas, DOI/PMID ou páginas da vitrine) e confirme datas.
3. Agrupe o acervo por temas com palavras-chave simples (ou, em artigos, extraira pergunta / amostra / desfecho).
4. Escreva o bloco `## Hipóteses e método` com 2–3 hipóteses e passos objetivos.
5. Produza o catálogo / mapa temático e, se couber, um embed com `@youtube`. Em artigos: tabela bibliográfica + achados com estatísticas-chave + forças/limites.
6. Relacione o material com calculadoras, manuais e inspeções já publicadas.
7. Feche com um `Status` claro: aprovado, em revisão ou referência externa.
8. Em lojas: declare **independência** (sem afiliação), registe a data da visita e o enquadramento legal/editorial das sementes de coleção.
9. Em artigos: declare independência dos autores/revista, separe associação de causalidade e ligue sempre ao DOI canónico.

## Estrutura recomendada do post

- `## Escopo`
- `## Objeto inspecionado`
- `## Hipóteses e método`
- `## Perfil editorial (achados)` *(canais)* / `## Achados principais` + `## Avaliação metodológica` *(artigos)*
- `## Origens (etimologia)` → `## Viagem e transformação` → `## Rede semântica` → `## Elo com plantas` *(palavras)*
- `## Quem foi` → `## O método` → `## Elo com planta` *(pessoas — declarar se o elo é histórico ou metodológico)*
- `## Mapa temático do acervo` *(canais)* / `## Mapa do catálogo` *(lojas)* / medições *(equipamentos)*
- `## Catálogo completo` *(quando aplicável)*
- `## Vídeo de referência (embed)` *(opcional)*
- `## Complementaridade com o Inspetor BudGanja`
- `## Como repetir o método`
- `## Status`

## Convenções

- Use `slug` curto e previsível, por exemplo `inspecao-canal-nome`, `inspecao-artigo-sobrenome-tema` ou `inspecao-loja-nome`
- Guarde a série em `series` e o nome legível em `seriesLabel`
- Escolha `seriesOrder` para manter a ordem da biblioteca
- Prefira `coverImage` do vídeo principal (YouTube `hqdefault`) ou PNG/JPG em `/imagens/inspecoes/`
- Lojas sem vídeo: gravar capa em `imagens/inspecoes/loja-<slug>-cover.png` (1200×630) e apontar `coverImage`
- Mantenha os créditos do canal / loja / artigo de origem sempre explícitos
- Builder de lojas: `lib/loja-inspecoes-posts.js`
- Builder de artigos: `lib/artigos-inspecoes-posts.js` · série `artigos-cientificos`
- Builder de derivados de risco: `lib/derivados-inspecoes-posts.js` · série `plantas-derivados-risco` (não misturar com o catálogo `/plantas/` medicinal)
- Builder de palavras: `lib/palavras-inspecoes-posts.js` · série `palavras-origem` — método: origem etimológica → viagem → transformação de sentido → rede semântica → elo obrigatório com `/plantas/<slug>/` quando houver referente botânico
- Builder de pessoas (históricas): `lib/pessoas-historia-inspecoes-posts.js` · série `pessoas-historia` — método: biografia verificável → método de pesquisa → elo com `/plantas/<slug>/` (histórico directo ou metodológico). Não confundir com `legado-pessoas`

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