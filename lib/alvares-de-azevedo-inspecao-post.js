'use strict';

/**
 * Inspeção Pessoas · homenagem a Álvares de Azevedo.
 * Elo principal: poema «Lágrimas da Vida» (série Artes).
 */

const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

function buildAlvaresDeAzevedoBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/%C3%81lvares_de_Azevedo';
  const wikiLira = 'https://pt.wikipedia.org/wiki/Lira_dos_vinte_anos';
  const lagrimas = '/posts/post-inspecao-arte-lagrimas-da-vida.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const vida = '/vida/';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const tristeza = '/posts/post-inspecao-palavra-tristeza.html';

  const body = `## Escopo

Homenagem editorial e inspeção documental de **Manuel Antônio Álvares de Azevedo** (1831–1852) — poeta, contista e ensaísta da **segunda geração romântica** no Brasil, voz central do **ultrarromantismo**. O recorte BudGanja **não** é culto da morte precoce nem inventário escolar fechado: é a **pessoa e o ofício** — verso, máscara e *mal du siècle* — com elo principal no poema [Lágrimas da Vida](${lagrimas}) (série Artes).

> **Nota metodológica:** auditoria independente com base na [Wikipédia · Álvares de Azevedo](${wiki}) e na tradição crítica da [Lira dos Vinte Anos](${wikiLira}). Sem afiliação académica. Distinto do [Legado](${legado}) canábico. A ficha de *Lágrimas da Vida* inspeciona o **poema**; aqui inspeciona-se o **autor**. Obra no domínio público. **Não romantiza autodestruição** — a homenagem lê a literatura; quando a dor pedir companhia, o laboratório aponta [Vida](${vida}).

Esta ficha é o elo **Pessoas × Artes (poesia)** — par da inspeção [Lágrimas da Vida](${lagrimas}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Manuel Antônio Álvares de Azevedo** |
| Nascimento / morte | 12 set. 1831, São Paulo — 25 abr. 1852, Rio de Janeiro (21 anos) |
| Ofícios | Poeta · contista · ensaísta · estudante de Direito (Faculdade do Largo de São Francisco) |
| Obra-âncora BudGanja | [Lágrimas da Vida](${lagrimas}) — poema da *Lira dos Vinte Anos* |
| Magnum opus cultural | *[Lira dos Vinte Anos](${wikiLira})* (poesia reunida; publicação póstuma da colectânea) |
| Outras marcas | *Noite na Taverna* (contos) · ensaio e prosa de juventude · influência Byron / Musset |
| Tipo BudGanja | Pessoa — ofício poético ultrarromântico × Artes |
| Elo principal | [Lágrimas da Vida](${lagrimas}) — poema (série Artes) |
| Elo Vida / Palavras | [Vida](${vida}) · [emoção](${emocao}) · [tristeza](${tristeza}) |
| Fonte de partida | [Wikipédia · Álvares de Azevedo](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Álvares é um **ofício de máscara e lágrima** — dramatizar a ferida afectiva sem que o laboratório adopte o culto da morte jovem.  
**H2:** [Lágrimas da Vida](${lagrimas}) é o **elo de obra**; a tese do verso fica na ficha Artes.  
**H3:** Pessoas ≠ Legado canábico — aqui o ofício é literário; a homenagem devolve o leitor à *Lira* e a [Vida](${vida}).

Passos (variante «autor × poema»):

1. Pessoa, datas e fonte wiki.  
2. Extrair o **método** (Ariel / Calibã, ultrarromantismo *byroniano*).  
3. Uma obra Artes como elo ([Lágrimas da Vida](${lagrimas})).  
4. Status — homenagem literária, sem glamourizar sofrimento.

## Quem foi (síntese verificável)

- Nasce em São Paulo (1831); formação marcada pelo Largo de São Francisco e pelo círculo romântico da juventude.  
- Principal voz da 2.ª geração romântica no Brasil — *mal du siècle*, influência europeia (Byron, Musset) e prosa/verso de intensidade.  
- *Lira dos Vinte Anos*: colectânea central; partes **Ariel** (sublime) e **Calibã** (grotesco / taverna) — dualidade que o laboratório lê como **método**, não só biografia.  
- *Noite na Taverna* e outros textos consolidam a prosa de macabro e confissão.  
- Morre em 1852, aos 21 anos — facto biográfico; a homenagem BudGanja **não** transforma a morte precoce em ideal.

## O ofício que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Ultrarromantismo | Dramatizar peito, lágrima e desdém — inspecionar a máscara social |
| Ariel / Calibã | Dois tons na mesma *Lira* — sublime e grotesco como laboratório de voz |
| Lágrima sob o sorriso | Elo directo com [Lágrimas da Vida](${lagrimas}) |
| Domínio público | Texto do séc. XIX — legível e citável sem afiliação comercial |
| Separar pessoa / obra | Álvares ≠ culto da morte — ofício em Pessoas, poema em Artes |

## Elo com Artes

| Recurso | Papel |
|---------|-------|
| [Lágrimas da Vida](${lagrimas}) | Poema-âncora — máscara, lágrima e «anjo da vida» |
| Hub [Artes](${artes}) | Obras; não confundir com biografia |
| [Vida](${vida}) · [emoção](${emocao}) · [tristeza](${tristeza}) | Rede de cuidado e léxico do sentimento |

> Abrir primeiro [Lágrimas da Vida](${lagrimas}) se o interesse for o **verso**; esta ficha se o interesse for o **autor** — a homenagem.

## Complementaridade com o Inspetor BudGanja

- Hub [Pessoas](${hub}) — distinto de [Legado](${legado}).  
- Tratar ultrarromantismo no corpus como **literatura**, não protocolo de sofrimento.  
- Uma obra-âncora basta para o elo; a *Lira* completa fica como horizonte, não inventário.

## Como repetir o método

1. Pessoa + wiki.  
2. Método (como escreve / dualidade de voz), não só CV.  
3. Um elo Artes com ficha própria.  
4. Slug \`inspecao-figura-…\`.  
5. Declarar limites éticos quando a obra dramatiza morte ou esquecimento.

## Status

**Aprovado na série Pessoas** — homenagem a Álvares de Azevedo com elo principal em [Lágrimas da Vida](${lagrimas}) (Artes).

[▶ Pessoas](${hub}) · [▶ Lágrimas da Vida](${lagrimas}) · [▶ Vida](${vida}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Homage and editorial inspection of **Álvares de Azevedo** (1831–1852) — Brazilian ultra-romantic poet. Focus is the **person and craft**, with primary link to [Lágrimas da Vida](${lagrimas}) (Arts).

> **Method note:** independent audit from [Wikipedia](${wiki}). Does **not** romanticize self-harm or early death. Distinct from cannabis Legacy. For companionship, see [Vida](${vida}).

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Manuel Antônio Álvares de Azevedo** |
| Lived | 12 Sep 1831 – 25 Apr 1852 |
| Anchor work | [Lágrimas da Vida](${lagrimas}) (*Lira dos Vinte Anos*) |
| BudGanja type | Person — poetic craft × Arts |
| Date | ${inspected} |

## Status

**Approved in the People series** — primary Arts link [Lágrimas da Vida](${lagrimas}).
`;

  const contentEs = `## Alcance

Homenaje e inspección editorial de **Álvares de Azevedo** (1831–1852) — poeta ultrarromántico brasileño. El recorte es la **persona y el oficio**, con vínculo principal en [Lágrimas da Vida](${lagrimas}) (Artes).

> **Nota metodológica:** auditoría independiente ([Wikipedia](${wiki})). **No romantiza** autodestrucción ni la muerte temprana. Compañía: [Vida](${vida}).

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Manuel Antônio Álvares de Azevedo** |
| Obra ancla | [Lágrimas da Vida](${lagrimas}) (*Lira dos Vinte Anos*) |
| Tipo BudGanja | Persona — oficio poético × Artes |
| Fecha | ${inspected} |

## Estado

**Aprobado en la serie Personas** — vínculo principal [Lágrimas da Vida](${lagrimas}).
`;

  return { body, contentEn, contentEs, wiki };
}

function buildAlvaresDeAzevedoPost() {
  const { body, contentEn, contentEs, wiki } = buildAlvaresDeAzevedoBodies();
  return figuraPost({
    title:
      'Inspeção: Álvares de Azevedo — homenagem ao poeta da Lira e elo com Lágrimas da Vida',
    titleEn:
      'Inspection: Álvares de Azevedo — homage to the Lira poet and link to Lágrimas da Vida',
    titleEs:
      'Inspección: Álvares de Azevedo — homenaje al poeta de la Lira y vínculo con Lágrimas da Vida',
    excerpt:
      'Pessoas × Artes: homenagem a Álvares de Azevedo (1831–1852) — ofício ultrarromântico, com elo principal no poema Lágrimas da Vida; distinto do Legado canábico.',
    excerptEn:
      'People × Arts: homage to Álvares de Azevedo (1831–1852) — ultra-romantic craft, with primary link to the poem Lágrimas da Vida; distinct from cannabis Legacy.',
    excerptEs:
      'Personas × Artes: homenaje a Álvares de Azevedo (1831–1852) — oficio ultrarromántico, con vínculo principal en el poema Lágrimas da Vida; distinto del Legado cannábico.',
    slug: 'inspecao-figura-alvares-de-azevedo',
    date: '2026-08-02T14:00:00.000Z',
    seriesOrder: 10,
    seriesLabel: 'Álvares de Azevedo · pessoa',
    coverImage: '/imagens/inspecoes/alvares-de-azevedo-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAlvaresDeAzevedoPost,
  buildAlvaresDeAzevedoBodies
};
