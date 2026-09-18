'use strict';

/**
 * Filmografias · inauguração: Leonardo DiCaprio.
 * Catálogo de longas (actor) — não é trinta fichas Artes.
 */

const { filmografiaPost } = require('./filmografias-inspecoes-posts.js');

const FILME_1996 = '/posts/post-inspecao-filme-romeu-mais-julieta.html';
const LEO = '/posts/post-inspecao-figura-leonardo-dicaprio.html';
const LUHRMANN = '/posts/post-inspecao-figura-baz-luhrmann.html';

function buildDicaprioFilmografiaBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-filmografias';
  const wiki = 'https://en.wikipedia.org/wiki/Leonardo_DiCaprio_filmography';
  const wikiPt = 'https://pt.wikipedia.org/wiki/Leonardo_DiCaprio';
  const peca = '/posts/post-inspecao-arte-romeu-e-julieta.html';
  const shake = '/posts/post-inspecao-figura-william-shakespeare.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';

  const body = `## Escopo

Inspeção editorial da **filmografia de Leonardo DiCaprio** — o **catálogo de ofício** (longas como actor, com TV e documentário em nota). Esta ficha **inaugura** a série [Filmografias](${hub}): um tipo novo, distinto de [Pessoas](${pessoas}) (a biografia está em [DiCaprio](${LEO})) e de [Artes](${artes}) (uma obra por ficha).

Pedido de campo: *todos os filmes dele* · *filmografia, novo tipo, inauguração de DiCaprio*. O laboratório **lista** os títulos com ano, papel e realização. **Não** abre trinta inspeções de filme. A única ficha Artes deste cluster, por agora, é [Romeu + Julieta (1996)](${FILME_1996}).

> **Nota metodológica:** auditoria independente. Fonte âncora: [Leonardo DiCaprio filmography](${wiki}); pessoa: [Wikipédia PT](${wikiPt}). Sem afiliação. Distinto do [Legado](${legado}) canábico. **Catálogo ≠ walkthrough, ≠ crítica de prémios, ≠ protocolo.** Papéis de violência, naufrágio ou crime são **literatura de ecrã** — sem glamourizar dano. Quando a lista apertar, a pessoa está em [DiCaprio](${LEO}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Tipo | **Filmografia** — catálogo de ecrã |
| Pessoa | [Leonardo DiCaprio](${LEO}) (série Pessoas) |
| Recorte | Longas-metragens como **actor** (TV / doc em nota) |
| Ficha Artes âncora | [Romeu + Julieta (1996)](${FILME_1996}) — [Luhrmann](${LUHRMANN}) |
| Série | **Filmografias** — ficha **n.º 1** (inauguração) |
| Fonte | [Filmography (EN)](${wiki}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** filmografia é **lista com rasto**, não enciclopédia de cada título.  
**H2:** a coluna **Ficha** só liga quando o lab já inspeccionou a **obra**.  
**H3:** [DiCaprio](${LEO}) = pessoa; esta página = **ofício em tabela**; [1996](${FILME_1996}) = um filme.  
**H4:** títulos futuros ou cameos disputados: a wiki é o relógio; o lab actualiza o catálogo, não inventa estreia.

## Longas — actor

| Ano | Título BR (uso vivo) | Original | Papel | Realização | Ficha |
|-----|----------------------|----------|-------|------------|-------|
| 1991 | Critters 3 | *Critters 3* | Josh | Kristine Peterson | catálogo |
| 1992 | Ivy venenosa | *Poison Ivy* | Guy | Katt Shea | catálogo |
| 1993 | Tempo de despertar | *This Boy's Life* | Tobias Wolff | Michael Caton-Jones | catálogo |
| 1993 | Gilbert Grape | *What's Eating Gilbert Grape* | Arnie Grape | Lasse Hallström | catálogo |
| 1995 | Diário de um adolescente | *The Basketball Diaries* | Jim Carroll | Scott Kalvert | catálogo |
| 1995 | Rápida e mortal | *The Quick and the Dead* | The Kid | Sam Raimi | catálogo |
| 1995 | Total Eclipse | *Total Eclipse* | Arthur Rimbaud | Agnieszka Holland | catálogo |
| **1996** | **Romeu + Julieta** | *Romeo + Juliet* | Romeu | [Baz Luhrmann](${LUHRMANN}) | **[filme](${FILME_1996})** |
| 1996 | A sala de Marvin | *Marvin's Room* | Hank | Jerry Zaks | catálogo |
| 1997 | Titanic | *Titanic* | Jack Dawson | James Cameron | catálogo |
| 1998 | O homem da máscara de ferro | *The Man in the Iron Mask* | Luís XIV / Philippe | Randall Wallace | catálogo |
| 1998 | Celebrity | *Celebrity* | Brandon Darrow | Woody Allen | catálogo |
| 2000 | A praia | *The Beach* | Richard | Danny Boyle | catálogo |
| 2002 | Gangues de Nova York | *Gangs of New York* | Amsterdam Vallon | Martin Scorsese | catálogo |
| 2002 | Prenda-me se for capaz | *Catch Me If You Can* | Frank Abagnale Jr. | Steven Spielberg | catálogo |
| 2004 | O aviador | *The Aviator* | Howard Hughes | Martin Scorsese | catálogo |
| 2006 | Os infiltrados | *The Departed* | Billy Costigan | Martin Scorsese | catálogo |
| 2006 | Diamante de sangue | *Blood Diamond* | Danny Archer | Edward Zwick | catálogo |
| 2008 | Corpo de mentiras | *Body of Lies* | Roger Ferris | Ridley Scott | catálogo |
| 2008 | Revolutionary Road | *Revolutionary Road* | Frank Wheeler | Sam Mendes | catálogo |
| 2010 | Ilha do medo | *Shutter Island* | Teddy Daniels | Martin Scorsese | catálogo |
| 2010 | A origem | *Inception* | Cobb | Christopher Nolan | catálogo |
| 2011 | J. Edgar | *J. Edgar* | J. Edgar Hoover | Clint Eastwood | catálogo |
| 2012 | Django Livre | *Django Unchained* | Calvin Candie | Quentin Tarantino | catálogo |
| 2013 | O grande Gatsby | *The Great Gatsby* | Jay Gatsby | [Baz Luhrmann](${LUHRMANN}) | catálogo (mesmo realizador do [1996](${FILME_1996}); **sem** ficha Artes nesta entrega) |
| 2013 | O lobo de Wall Street | *The Wolf of Wall Street* | Jordan Belfort | Martin Scorsese | catálogo |
| 2015 | O regresso | *The Revenant* | Hugh Glass | Alejandro G. Iñárritu | catálogo |
| 2019 | Era uma vez em… Hollywood | *Once Upon a Time in Hollywood* | Rick Dalton | Quentin Tarantino | catálogo |
| 2021 | Não olhe para cima | *Don't Look Up* | Randall Mindy | Adam McKay | catálogo |
| 2023 | Assassinos da lua das flores | *Killers of the Flower Moon* | Ernest Burkhart | Martin Scorsese | catálogo |
| 2025 | One Battle After Another | *One Battle After Another* | Bob Ferguson | Paul Thomas Anderson | catálogo (estreia; conferir wiki) |

## Notas de recorte

- **TV** (contexto, não tabela principal): *Parenthood*, *Growing Pains* e outros créditos de juventude — ver [filmography EN](${wiki}).  
- **Documentário:** *The 11th Hour* (2007) — narração / produção; causa ambiental = facto, não ficha ONG.  
- **Produtor** (Appian Way): créditos atrás da câmara **não** duplicam esta lista de actor.  
- Títulos BR seguem uso vivo nas fontes; o original ancora.

## Como repetir o tipo Filmografias

1. Uma **pessoa** já fichada (ou ficha irmã no mesmo passo).  
2. Tabela ano / título / papel / realização / **ficha ou catálogo**.  
3. Slug \`inspecao-filmografia-…\`. Série \`filmografias\`.  
4. **Não** abrir ficha Artes por linha — só quando o campo pedir a **obra**.  
5. Fechar com [Faça o melhor!](${mantra}).

## Elos

| Recurso | Papel |
|---------|-------|
| [DiCaprio](${LEO}) | Pessoa — ofício |
| [Romeu + Julieta (1996)](${FILME_1996}) | Obra inspeccionada |
| [Luhrmann](${LUHRMANN}) | Realizador do âncora · também *Gatsby* |
| [Peça](${peca}) · [Shakespeare](${shake}) | Génese do verso do âncora |
| [gesto](${gesto}) · [skill](${skill}) | Léxico do ofício |

## Limites

- **Ficha ≠ trinta filmes inspeccionados.**  
- Sem glamourizar naufrágio, crime ou violência de enredo.  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovada como ficha fundadora da série Filmografias** — catálogo de [Leonardo DiCaprio](${LEO}); âncora Artes [Romeu + Julieta (1996)](${FILME_1996}).

[▶ Filmografias](${hub}) · [▶ DiCaprio](${LEO}) · [▶ Filme 1996](${FILME_1996}) · [▶ Luhrmann](${LUHRMANN}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **Leonardo DiCaprio’s filmography** — a **craft catalog** (feature films as actor). This sheet **founds** the [Filmographies](${hub}) series: not [People](${pessoas}) (see [DiCaprio](${LEO})) and not [Arts](${artes}) (one work per sheet). The only Arts sheet in this cluster for now is [Romeo + Juliet (1996)](${FILME_1996}).

> Independent audit. [Filmography](${wiki}). Catalog ≠ thirty film inspections.

## Status

**Approved as Filmographies no. 1** — DiCaprio catalog; Arts anchor [1996](${FILME_1996}).

[▶ DiCaprio](${LEO}) · [▶ 1996 film](${FILME_1996}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la **filmografía de Leonardo DiCaprio** — **catálogo de oficio** (largometrajes como actor). Esta ficha **inaugura** [Filmografías](${hub}). Distinta de [Personas](${pessoas}) ([DiCaprio](${LEO})) y de [Artes](${artes}). La única ficha de obra en este clúster, por ahora: [Romeu + Julieta (1996)](${FILME_1996}).

> Auditoría independiente. [Filmography](${wiki}). Catálogo ≠ treinta inspecciones de filme.

## Estado

**Aprobada como ficha fundadora de Filmografías** — catálogo DiCaprio; ancla [1996](${FILME_1996}).

[▶ DiCaprio](${LEO}) · [▶ Filme 1996](${FILME_1996}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildDicaprioFilmografiaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildDicaprioFilmografiaBodies();
  return filmografiaPost({
    title: 'Inspeção: Filmografia de Leonardo DiCaprio — catálogo que inaugura o tipo',
    titleEn: 'Inspection: Leonardo DiCaprio filmography — the catalog that founds the type',
    titleEs: 'Inspección: Filmografía de Leonardo DiCaprio — el catálogo que inaugura el tipo',
    excerpt:
      'Filmografias (ficha 1): catálogo de longas de Leonardo DiCaprio como actor. Pessoa e Romeu + Julieta (1996) em fichas irmãs. Lista ≠ trinta inspeções de filme.',
    excerptEn:
      'Filmographies (sheet 1): Leonardo DiCaprio feature catalog as actor. Person and Romeo + Juliet (1996) on sister sheets. A list ≠ thirty film inspections.',
    excerptEs:
      'Filmografías (ficha 1): catálogo de largos de Leonardo DiCaprio como actor. Persona y Romeu + Julieta (1996) en fichas hermanas. Lista ≠ treinta inspecciones.',
    slug: 'inspecao-filmografia-leonardo-dicaprio',
    date: '2026-08-22T03:41:00.000Z',
    seriesOrder: seriesOrder,
    seriesLabel: 'DiCaprio · filmografia',
    coverImage: '/imagens/inspecoes/dicaprio-filmografia-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDicaprioFilmografiaPost,
  buildDicaprioFilmografiaBodies
};
