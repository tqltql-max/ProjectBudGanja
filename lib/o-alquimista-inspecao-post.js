'use strict';

/**
 * Artes · romance «O Alquimista» (Paulo Coelho, 1988).
 * Livro primeiro; autor em Pessoas. Elos BudGanja: caminho / passar /
 * sinal / esperança / vida — inspecionar a Lenda Pessoal sem protocolar
 * a alquimia nem tratar o tesouro como manual de prosperidade.
 */

function artePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'artes-cultura',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Artes',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function buildOAlquimistaBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const book = 'https://pt.wikipedia.org/wiki/O_Alquimista';
  const bookEn = 'https://en.wikipedia.org/wiki/The_Alchemist_(novel)';
  const coelho = '/posts/post-inspecao-figura-paulo-coelho.html';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const curinga = '/posts/post-inspecao-arte-o-dia-do-curinga.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const navegar = '/posts/post-inspecao-palavra-navegar.html';
  const faca = '/posts/post-inspecao-palavra-valeu.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial de **«O Alquimista»** (*The Alchemist*) — romance de **Paulo Coelho** (**1988**, português). O **início de tudo** é o livro: o pastor Santiago, o sonho do tesouro, o deserto e a Lenda Pessoal. A biografia do autor fica em [Paulo Coelho](${coelho}) (série Pessoas).

> **Nota metodológica:** auditoria independente. Fonte âncora: [Wikipédia · O Alquimista](${book}); complementar [Wikipedia (EN)](${bookEn}). Crédito: Paulo Coelho / editores (circulação BR e traduções). Sem afiliação. **Não confundir** com Canais nem com [Legado](${legado}). A **alquimia** no texto é **metáfora literária** de transformação — o laboratório **não** a trata como protocolo de substâncias, receita de ouro nem alegoria canábica. A obra é **protegida por direito de autor** — sem citações longas. Distinto do léxico [coelho](/posts/post-inspecao-palavra-coelho.html) (animal).

Par cultural em Artes: [O Dia do Curinga](${curinga}) — outro **livro primeiro** (autor em Pessoas); lá a pergunta do Curinga, aqui o [caminho](${caminho}) da Lenda.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra principal | **O Alquimista** |
| Autor | [Paulo Coelho](${coelho}) — biografia em Pessoas |
| Publicação original | **1988** (Brasil, português) |
| Título EN | *The Alchemist* |
| Género | Romance / parábola de viagem (Lenda Pessoal, omens, deserto) |
| Tipo BudGanja | Arte — **livro primeiro**; autor em Pessoas |
| Elo Pessoas | [Paulo Coelho](${coelho}) |
| Elo Palavras | [caminho](${caminho}) · [passar](${passar}) · [sinal](${sinal}) · [esperança](${esperanca}) · [vida](${vidaPalavra}) · [coração](${coracao}) · [navegar](${navegar}) · [Valeu !!!](${faca}) |
| Fonte de partida | [Wikipédia · O Alquimista](${book}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **texto** — a Lenda Pessoal é figura de [caminho](${caminho}), disciplina próxima da inspeção, **não** GPS de sucesso.  
**H2:** a travessia Andaluzia → Tânger → deserto → pirâmides é figura de [passar](${passar}); os omens conversam com [sinal](${sinal}).  
**H3:** o tesouro «já estava em casa» inspeciona o par partir/ficar — sem virar sermão de «não saias» nem de «larga tudo».

Passos:

1. Fixar origem literária (ano, título, autor).  
2. Declarar tese a partir do **livro**.  
3. Ligar Pessoas só por referência ([Coelho](${coelho})).  
4. Status + limites (copyright, autoajuda, alquimia).

## O início de tudo — génese do livro

Fonte: [Wikipédia · O Alquimista](${book}) / [EN](${bookEn}).

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **1988** | Publicação brasileira em português — origem do objecto. |
| Forma | Parábola curta: pastor, sonho recorrente, rei de Salém, caravana, oásis, alquimista, pirâmides. |
| Motivo central | **Lenda Pessoal**; linguagem do mundo; omens; o tesouro no ponto de partida. |
| Eco mundial | Tradução *The Alchemist*; circulação massiva (registo wiki) — **contexto**, não tese. |
| Antecedente de ofício | *O Diário de um Mago* (1987) — viagem real do autor; fica na ficha [Pessoas](${coelho}). |

> **Hierarquia BudGanja:** sem o romance de 1988 não há «Alquimista» cultural inspecionado. O autor tem ficha própria em Pessoas.

## A obra (síntese, sem spoiler de citação)

- Santiago, pastor andaluz, sonha um tesouro junto das pirâmides do Egipto.  
- Parte: encontra figuras de iniciação (rei / cristal / inglês / Fatima / alquimista).  
- O deserto ensina a ler omens — [sinal](${sinal}) como motivo, não prova empírica.  
- Fecho conhecido da crítica: o tesouro estava no lugar de onde partiu — ironia do [caminho](${caminho}) que obriga a [passar](${passar}) para ver o que já estava em casa.

O laboratório **não** adopta a cosmologia do romance: usa o livro como **parábola de procura e retorno**.

## Tese cultural BudGanja (a partir do livro)

| Tema no texto | Tradução editorial |
|---------------|-------------------|
| Lenda Pessoal | [caminho](${caminho}) próprio — inspecionar o motivo, não protocolar o destino |
| Omens | [sinal](${sinal}) — ler o mundo sem confundir coincidência com prova |
| Deserto / caravana | [passar](${passar}) · [navegar](${navegar}) — travessia com método |
| Linguagem do coração | [coração](${coracao}) — ofício de escuta, não slogan |
| Tesouro em casa | Partir e ficar — [vida](${vidaPalavra}) / [esperança](${esperanca}) sem sermão |
| Alquimia | Metáfora de transformação — **não** química de cultivo nem ouro de laboratório |
| [Valeu !!!](${faca}) | O melhor recorte *desta* obra *neste* ofício — sem hype de best-seller |

## Elo com Pessoas e outras fichas

| Recurso | Papel |
|---------|-------|
| [Paulo Coelho](${coelho}) | Autor — ofício de parábola (Pessoas) |
| [O Dia do Curinga](${curinga}) | Artes — outro livro primeiro (pergunta × caminho) |
| [caminho](${caminho}) · [passar](${passar}) · [sinal](${sinal}) | Palavras — via, travessia, omen |
| Hub [Artes](${hub}) · [Pessoas](${pessoas}) · [Palavras](${palavras}) | Separar obra, autor e léxico |
| [Vida](${vida}) | Quando a viagem pedir chão |

## Complementaridade com o Inspetor BudGanja

- Ler a ficha do **livro** antes da biografia do autor.  
- Cruzar Lenda Pessoal com inspeções de [caminho](${caminho}) — sem transformar o romance em protocolo.  
- Hub [Artes](${hub}).

## Como repetir o método

1. Priorizar a **origem literária** quando houver livro.  
2. Autor em Pessoas com elo de volta à obra.  
3. Metáforas de transformação = literatura, não protocolo.  
4. Obra contemporânea: **sem** citação longa.  
5. Slug \`inspecao-arte-…\`.

## Status

**Aprovado na série Artes** — *O Alquimista* (1988) documentado como livro; autor em [Paulo Coelho](${coelho}).
`;

  const contentEn = `## Scope

Editorial inspection of **The Alchemist** (*O Alquimista*) — novel by **Paulo Coelho** (1988, Portuguese). The **beginning of everything** is the book. Author biography: [Paulo Coelho](${coelho}) (People).

> **Method note:** independent audit from [Wikipedia](${bookEn}) / [PT](${book}). Alchemy in the text is a **literary metaphor** for transformation — not a substance protocol or cannabis allegory. The work is under copyright — no long quotes. Companion Arts sheet: [The Solitaire Mystery / O Dia do Curinga](${curinga}).

## Inspected object

| Field | Value |
|-------|-------|
| Work | **O Alquimista** (*The Alchemist*, 1988) |
| Author | [Paulo Coelho](${coelho}) |
| BudGanja type | Art — **book first** |
| Words | [caminho](${caminho}) · [passar](${passar}) · [sinal](${sinal}) |
| Date | ${inspected} |

## Origin of the book (core)

Published Brazil **1988**. Parable: Andalusian shepherd, recurring dream of treasure at the pyramids, Personal Legend, omens, desert, return. Massive later circulation is **context**, not the thesis.

## Lab thesis

| Theme | Gloss |
|-------|-------|
| Personal Legend | [caminho](${caminho}) — inspect the motif, don’t protocol destiny |
| Omens | [sinal](${sinal}) — not lab proof |
| Treasure at home | Leaving and staying — [vida](${vidaPalavra}), not a sermon |
| Alchemy | Metaphor — **not** grow chemistry |

## Status

**Approved in the Arts series** — 1988 book first; author in [Paulo Coelho](${coelho}).
`;

  const contentEs = `## Alcance

Inspección editorial de **El alquimista** (*O Alquimista* / *The Alchemist*) — novela de **Paulo Coelho** (1988, portugués). El **inicio de todo** es el libro. Biografía del autor: [Paulo Coelho](${coelho}) (Personas).

> **Nota metodológica:** auditoría independiente ([Wikipedia](${bookEn}) / [PT](${book})). La alquimia del texto es **metáfora literaria** — no protocolo de sustancias. Obra con copyright: sin citas largas.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Obra | **O Alquimista** (1988) |
| Autor | [Paulo Coelho](${coelho}) |
| Tipo BudGanja | Arte — **libro primero** |
| Palabras | [caminho](${caminho}) · [passar](${passar}) · [sinal](${sinal}) |
| Fecha | ${inspected} |

## Origen del libro (núcleo)

Publicación Brasil **1988**. Parábola: pastor andaluz, sueño del tesoro, Leyenda Personal, omens, desierto, retorno.

## Tesis del laboratorio

| Tema | Glosa |
|------|-------|
| Leyenda Personal | [caminho](${caminho}) — inspeccionar el motivo, no protocolar el destino |
| Omens | [sinal](${sinal}) — no prueba de laboratorio |
| Tesoro en casa | Partir y quedarse — [vida](${vidaPalavra}) |
| Alquimia | Metáfora — **no** química de cultivo |

## Estado

**Aprobada en la serie Artes** — libro de 1988 primero; autor en [Paulo Coelho](${coelho}).
`;

  return { body, contentEn, contentEs, wiki: book };
}

function buildOAlquimistaPost() {
  const { body, contentEn, contentEs, wiki } = buildOAlquimistaBodies();
  return artePost({
    title:
      'Inspeção: O Alquimista — o livro de Paulo Coelho e a Lenda Pessoal',
    titleEn:
      'Inspection: The Alchemist — Paulo Coelho’s book and the Personal Legend',
    titleEs:
      'Inspección: El alquimista — el libro de Paulo Coelho y la Leyenda Personal',
    excerpt:
      'Artes: O Alquimista (1988) — parábola de viagem de Paulo Coelho; Lenda Pessoal, omens e tesouro. Autor em Pessoas. Alquimia = metáfora, não protocolo.',
    excerptEn:
      'Arts: The Alchemist (1988) — Paulo Coelho’s journey parable; Personal Legend, omens and treasure. Author in People. Alchemy = metaphor, not a protocol.',
    excerptEs:
      'Artes: O Alquimista (1988) — parábola de viaje de Paulo Coelho; Leyenda Personal, omens y tesoro. Autor en Personas. Alquimia = metáfora, no protocolo.',
    slug: 'inspecao-arte-o-alquimista',
    date: '2026-08-19T16:30:00.000Z',
    seriesOrder: 53,
    seriesLabel: 'O Alquimista · Artes',
    coverImage: 'imagens/inspecoes/o-alquimista-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildOAlquimistaPost,
  buildOAlquimistaBodies
};
