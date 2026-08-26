'use strict';

/**
 * Inspeção Pessoas · Paulo Coelho.
 * Elo principal: romance «O Alquimista» (série Artes).
 * Distinto do léxico «coelho» (animal) e do Legado canábico.
 */

function figuraPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'pessoas-historia',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Pessoas',
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

function buildPauloCoelhoBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Paulo_Coelho';
  const wikiEn = 'https://en.wikipedia.org/wiki/Paulo_Coelho';
  const alquimista = '/posts/post-inspecao-arte-o-alquimista.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const gaarder = '/posts/post-inspecao-figura-jostein-gaarder.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const navegar = '/posts/post-inspecao-palavra-navegar.html';
  const faca = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial e documental de **Paulo Coelho de Souza** (n. 1947, Rio de Janeiro) — romancista e letrista brasileiro. O recorte BudGanja **não** é inventário de toda a obra nem manual de autoajuda: é a **pessoa e o ofício** de escrever a parábola de viagem — com elo principal no livro [O Alquimista](${alquimista}) (série Artes).

> **Nota metodológica:** auditoria independente com base na [Wikipédia (PT)](${wiki}) e [Wikipedia (EN)](${wikiEn}). Sem afiliação com o autor, editoras ou a Academia Brasileira de Letras. Distinto do [Legado](${legado}) canábico. A ficha de *O Alquimista* inspeciona o **livro**; aqui inspeciona-se o **ofício** de quem o escreveu. *O Diário de um Mago* (1987) e outras marcas são **contexto de carreira**, não fichas Artes nesta entrega. O léxico [coelho](/posts/post-inspecao-palavra-coelho.html) no laboratório é o **animal** — não esta pessoa.

Esta ficha é o elo **Pessoas × Artes (literatura)** — par da inspeção [O Alquimista](${alquimista}). Par metodológico em Pessoas: [Jostein Gaarder](${gaarder}) — outro autor × livro; lá o Curinga pergunta, aqui a Lenda Pessoal caminha.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Paulo Coelho de Souza** |
| Nascimento | 24 ago. 1947, Rio de Janeiro, Brasil |
| Ofícios | Romancista · letrista |
| Obra-âncora BudGanja | [O Alquimista](${alquimista}) (1988; EN *The Alchemist*) |
| Outras marcas (contexto) | *O Diário de um Mago* (1987, Caminho de Santiago) · letras com Raul Seixas (anos 1970) · ABL, cadeira 21 (2002) |
| Tipo BudGanja | Pessoa — ofício de parábola / viagem × Artes |
| Elo principal | [O Alquimista](${alquimista}) — literatura (série Artes) |
| Elo Palavras | [caminho](${caminho}) · [passar](${passar}) · [sinal](${sinal}) · [criatividade](${criatividade}) · [navegar](${navegar}) · [Valeu !!!](${faca}) |
| Fonte de partida | [Wikipédia · Paulo Coelho](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Coelho é um **ofício de parábola** — trama curta, omens e Lenda Pessoal — não protocolo espiritual nem prosperidade.  
**H2:** [O Alquimista](${alquimista}) é o **elo de obra**; a tese do tesouro e do deserto fica na ficha Artes.  
**H3:** Pessoas ≠ Legado canábico — aqui o ofício é literário; alquimia no romance **não** é química de cultivo.

Passos (variante «autor × livro»):

1. Identificar a pessoa, datas e fonte pública.  
2. Extrair o **método** (como escreve a viagem), não só a bibliografia.  
3. Escolher **uma** obra Artes como elo principal ([O Alquimista](${alquimista})).  
4. Contraste com [Legado](${legado}) e com o léxico animal «coelho».  
5. Status.

## Quem foi / é (síntese verificável)

- Nasce no Rio de Janeiro (1947). Formação e juventude no Brasil; actividade como letrista nos anos 1970 (parceria pública com **Raul Seixas** — contexto, sem ficha nesta entrega).  
- 1986–87: percursos associados ao Caminho de Santiago; *O Diário de um Mago* (1987) — viagem como matéria, **antes** do romance-âncora.  
- **1988:** publica *[O Alquimista](${alquimista})* em português; circulação inicial modesta; depois tradução e êxito global (registo wiki: dezenas de milhões de exemplares, dezenas de línguas).  
- 2002: eleito para a **Academia Brasileira de Letras** (cadeira 21) — facto institucional, não tese do laboratório.  
- Estilo recorrente: narrativa curta, símbolo, diálogo iniciático, [caminho](${caminho}) como motivo.

## O ofício que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Parábola de viagem | Ensinar pelo percurso — [passar](${passar}) e [navegar](${navegar}) como método, não GPS |
| Omens / sinais | Ler o mundo sem confundir [sinal](${sinal}) com prova de laboratório |
| Lenda Pessoal | [caminho](${caminho}) próprio — inspecionar o motivo, não adoptar o mantra |
| Separar pessoa / obra | Coelho ≠ Santiago ≠ tesouro — ofício em Pessoas, livro em Artes |
| [Valeu !!!](${faca}) | O melhor recorte *desta* pessoa *neste* ofício — sem hype de best-seller |

## Elo com Artes

| Recurso | Papel |
|---------|-------|
| [O Alquimista](${alquimista}) | Obra literária — Lenda Pessoal, deserto, omens, tesouro |
| Hub [Artes](${artes}) | Livros e outras obras; não confundir com biografia |
| [Jostein Gaarder](${gaarder}) | Par Pessoas — outro autor × livro (Curinga) |
| [caminho](${caminho}) · [passar](${passar}) · [sinal](${sinal}) | Palavras — via, travessia, omen |

> Abrir primeiro [O Alquimista](${alquimista}) se o interesse for a **tese do livro**; esta ficha se o interesse for o **autor**.

## Complementaridade com o Inspetor BudGanja

- Hub [Pessoas](${hub}) — distinto de [Legado](${legado}).  
- Não tratar a «alquimia» do romance como protocolo de substâncias nem alegoria canábica.  
- Não inventariar toda a bibliografia: uma obra-âncora basta para o elo.  
- Quando a viagem pedir chão, o laboratório aponta [Vida](${vida}).

## Como repetir o método

1. Pessoa + fonte wiki.  
2. Método (como cria a parábola), não só CV.  
3. Um elo Artes (livro) com ficha própria.  
4. Slug \`inspecao-figura-…\`.  
5. Declarar limites: autoajuda, occultismo e hype de vendas **fora** do centro.

## Status

**Aprovado na série Pessoas** — Paulo Coelho documentado com elo principal em [O Alquimista](${alquimista}) (Artes).

[▶ Pessoas](${hub}) · [▶ O Alquimista](${alquimista}) · [▶ caminho](${caminho}) · [▶ Valeu !!!](${faca}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Paulo Coelho de Souza** (b. 1947, Rio de Janeiro) — Brazilian novelist and lyricist. Focus is the **person and craft** of writing the journey parable, with primary link to [The Alchemist / O Alquimista](${alquimista}) (Arts) — **not** a full bibliography or a self-help manual.

> **Method note:** independent audit from [Wikipedia](${wikiEn}). No affiliation. Distinct from cannabis Legacy. The Alchemist sheet covers the **book**; this sheet covers the **craft** of the author. The lab word [coelho](/posts/post-inspecao-palavra-coelho.html) is the **rabbit** — not this person.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Paulo Coelho de Souza** |
| Born | 24 Aug 1947, Rio de Janeiro |
| BudGanja anchor work | [O Alquimista](${alquimista}) (1988) |
| Other public marks | *The Pilgrimage* (1987) · lyrics with Raul Seixas (1970s) · Brazilian Academy of Letters (2002) |
| BudGanja type | Person — parable / journey craft × Arts |
| Words | [caminho](${caminho}) · [passar](${passar}) · [sinal](${sinal}) |
| Date | ${inspected} |

## Hypotheses

**H1:** value is a **craft of parable** — short plot, omens, Personal Legend — not a spiritual protocol.  
**H2:** [O Alquimista](${alquimista}) is the Arts link; desert/treasure thesis stays there.  
**H3:** People ≠ Legacy cannabis. Alchemy in the novel is **not** grow chemistry.

## Method for BudGanja

| Trait | Gloss |
|-------|-------|
| Journey parable | Teach by path — [passar](${passar}), not GPS |
| Omens | [sinal](${sinal}) as motif, not lab proof |
| Person ≠ work | Coelho in People; Santiago in the book |

## Status

**Approved in the People series** — primary Arts link [O Alquimista](${alquimista}).
`;

  const contentEs = `## Alcance

Inspección editorial de **Paulo Coelho de Souza** (n. 1947, Río de Janeiro) — novelista y letrista brasileño. El recorte es la **persona y el oficio** de escribir la parábola de viaje, con vínculo principal en [O Alquimista](${alquimista}) (Artes).

> **Nota metodológica:** auditoría independiente ([Wikipedia](${wikiEn})). Sin afiliación. Distinto del Legado cannábico. La ficha de *O Alquimista* inspecciona el **libro**; aquí, el **oficio** del autor. El léxico [coelho](/posts/post-inspecao-palavra-coelho.html) en el laboratorio es el **animal**.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Paulo Coelho de Souza** |
| Nacimiento | 24 ago. 1947, Río de Janeiro |
| Obra ancla | [O Alquimista](${alquimista}) (1988) |
| Tipo BudGanja | Persona — oficio de parábola / viaje × Artes |
| Palabras | [caminho](${caminho}) · [passar](${passar}) · [sinal](${sinal}) |
| Fecha | ${inspected} |

## Hipótesis

**H1:** valor = **oficio de parábola** (omens, Leyenda Personal).  
**H2:** [O Alquimista](${alquimista}) es el vínculo Artes.  
**H3:** Personas ≠ Legado cannábico.

## Estado

**Aprobado en la serie Personas** — vínculo principal [O Alquimista](${alquimista}).
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPauloCoelhoPost() {
  const { body, contentEn, contentEs, wiki } = buildPauloCoelhoBodies();
  return figuraPost({
    title:
      'Inspeção: Paulo Coelho — ofício de parábola e elo com O Alquimista',
    titleEn:
      'Inspection: Paulo Coelho — parable craft and link to The Alchemist',
    titleEs:
      'Inspección: Paulo Coelho — oficio de parábola y vínculo con El alquimista',
    excerpt:
      'Pessoas × Artes: Paulo Coelho — método de escrever a parábola de viagem, com elo principal no livro O Alquimista (1988); distinto do Legado canábico e do léxico animal «coelho».',
    excerptEn:
      'People × Arts: Paulo Coelho — writing the journey parable, with primary link to The Alchemist (1988); distinct from cannabis Legacy and from the lab word «coelho» (rabbit).',
    excerptEs:
      'Personas × Artes: Paulo Coelho — método de escribir la parábola de viaje, con vínculo principal en O Alquimista (1988); distinto del Legado cannábico y del léxico animal «coelho».',
    slug: 'inspecao-figura-paulo-coelho',
    date: '2026-08-19T16:45:00.000Z',
    seriesOrder: 18,
    seriesLabel: 'Paulo Coelho · pessoa',
    coverImage: 'imagens/inspecoes/paulo-coelho-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPauloCoelhoPost,
  buildPauloCoelhoBodies
};
