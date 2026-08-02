'use strict';

/**
 * Artes · livro «Bom dia, Inverno» (Tamara Klink) — divulgação editorial
 * cruzada com o léxico do laboratório e a legenda do Q&A.
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

const POST_HREF = '/posts/post-inspecao-arte-bom-dia-inverno.html';
const TAMARA = '/posts/post-inspecao-tamara-klink.html';
const AMYR = '/posts/post-inspecao-amyr-klink.html';
const CAMINHO = '/posts/post-inspecao-palavra-caminho.html';
const PASSAR = '/posts/post-inspecao-palavra-passar.html';
const BALDE = '/posts/post-inspecao-palavra-balde.html';
const GESTO = '/posts/post-inspecao-palavra-gesto.html';
const VERDADE = '/posts/post-inspecao-palavra-verdade.html';
const VIDA = '/vida/';
const DIARIO = '/vida/diario/';
const ANIMAIS = '/animais/';
const ARTES = '/biblioteca/inspecoes/#inspecoes-artes';
const LEGADO = '/biblioteca/inspecoes/#inspecoes-pessoas';
const GUIA = '/guia/palavras.html';
const VIDEO_QA = 'https://www.youtube.com/watch?v=V3GSlr5sp7c';
const UOL =
  'https://cultura.uol.com.br/noticias/69371_navegadora-tamara-klink-conta-que-falta-de-apoio-do-pai-a-motivou-buscar-seus-proprios-caminhos.html';
const SITE = 'https://www.tamaraklink.com';
const EDITORA = 'https://www.companhiadasletras.com.br/';

/** Lote temático — Guia de Palavras (universo Bom dia, Inverno / Tamara). */
const GUIA_TAMARA_INVERNO_ITEMS = [
  {
    id: 'barco',
    word: 'Barco',
    simple:
      'Embarcação — no universo Tamara é casa, oficina e corpo da invernagem; elo do livro *Bom dia, Inverno*.',
    simpleEn:
      'Boat — in Tamara’s world: home, workshop and body of the overwintering; link to *Bom dia, Inverno*.',
    simpleEs:
      'Barco — en el universo Tamara: casa, taller y cuerpo de la invernada; enlace con *Bom dia, Inverno*.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'mar',
    word: 'Mar',
    simple:
      'Oceano e horizonte — no laboratório cruza com caminho, Vida e a travessia solitária de Tamara.',
    simpleEn:
      'Ocean and horizon — in the lab it crosses caminho, Vida and Tamara’s solo crossing.',
    simpleEs:
      'Océano y horizonte — en el laboratorio cruza camino, Vida y la travesía solitaria de Tamara.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'gelo',
    word: 'Gelo',
    simple:
      'Água sólida que prende o barco — matéria da invernagem ártica narrada em *Bom dia, Inverno*.',
    simpleEn:
      'Solid water that holds the boat — matter of the Arctic overwintering in *Bom dia, Inverno*.',
    simpleEs:
      'Agua sólida que atrapa el barco — materia de la invernada ártica en *Bom dia, Inverno*.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'inverno',
    word: 'Inverno',
    simple:
      'Estação e título — *Bom dia, Inverno*: cumprimentar o frio sem romantizar o isolamento.',
    simpleEn:
      'Season and title — *Bom dia, Inverno*: greeting the cold without romanticizing isolation.',
    simpleEs:
      'Estación y título — *Bom dia, Inverno*: saludar el frío sin romantizar el aislamiento.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'invernagem',
    word: 'Invernagem',
    simple:
      'Permanecer o inverno inteiro no gelo — feito âncora de Tamara no Ártico; eixo do livro.',
    simpleEn:
      'Staying the whole winter in the ice — Tamara’s Arctic anchor feat; axis of the book.',
    simpleEs:
      'Permanecer todo el invierno en el hielo — hazaña ancla de Tamara en el Ártico; eje del libro.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'navegar',
    word: 'Navegar',
    simple:
      'Conduzir o barco e a própria rota — ofício Klink; no BudGanja liga a caminho e gesto.',
    simpleEn:
      'Steering the boat and one’s route — Klink craft; in BudGanja links to caminho and gesto.',
    simpleEs:
      'Conducir el barco y la propia ruta — oficio Klink; en BudGanja une camino y gesto.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'agua',
    word: 'Água',
    simple:
      'Elemento que o balde carrega e o gelo retém — volume, sede e limite na invernagem.',
    simpleEn:
      'Element the bucket carries and ice retains — volume, thirst and limit in overwintering.',
    simpleEs:
      'Elemento que el balde lleva y el hielo retiene — volumen, sed y límite en la invernada.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'neve',
    word: 'Neve',
    simple:
      'Cobertura branca do Ártico — paisagem e ruído branco da narrativa de Tamara.',
    simpleEn:
      'White Arctic cover — landscape and white noise of Tamara’s narrative.',
    simpleEs:
      'Cubierta blanca del Ártico — paisaje y ruido blanco de la narrativa de Tamara.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'congelado',
    word: 'Congelado',
    simple:
      'Estado do mar preso — o barco deixa de «passar» e passa a *ficar*; elo com Vida.',
    simpleEn:
      'State of the locked sea — the boat stops “passing” and starts *staying*; link to Vida.',
    simpleEs:
      'Estado del mar atrapado — el barco deja de «pasar» y empieza a *quedarse*; enlace con Vida.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'risco',
    word: 'Risco',
    simple:
      'Perigo calculado da travessia e da invernagem — Amyr planeia; Tamara assume o próprio.',
    simpleEn:
      'Calculated danger of crossing and overwintering — Amyr plans; Tamara owns her own.',
    simpleEs:
      'Peligro calculado de la travesía y la invernada — Amyr planifica; Tamara asume el suyo.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'solitario',
    word: 'Solitário',
    simple:
      'Navegar e invernar sozinha — não isolamento romântico: método, medo e escrita.',
    simpleEn:
      'Sailing and overwintering alone — not romantic isolation: method, fear and writing.',
    simpleEs:
      'Navegar e invernar sola — no aislamiento romántico: método, miedo y escritura.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'groenlandia',
    word: 'Groenlândia',
    simple:
      'Palco da invernagem ártica de Tamara — gelo, animais e o livro *Bom dia, Inverno*.',
    simpleEn:
      'Stage of Tamara’s Arctic overwintering — ice, animals and *Bom dia, Inverno*.',
    simpleEs:
      'Escenario de la invernada ártica de Tamara — hielo, animales y *Bom dia, Inverno*.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'anzol',
    word: 'Anzol',
    simple:
      'Ferramenta de pesca na narrativa — gesto concreto de sobrevivência no gelo.',
    simpleEn:
      'Fishing hook in the narrative — concrete survival gesture on the ice.',
    simpleEs:
      'Anzuelo en la narrativa — gesto concreto de supervivencia en el hielo.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'livro',
    word: 'Livro',
    simple:
      'Objecto e ofício — *Bom dia, Inverno* (Companhia das Letras): a invernagem vira página.',
    simpleEn:
      'Object and craft — *Bom dia, Inverno* (Companhia das Letras): overwintering becomes page.',
    simpleEs:
      'Objeto y oficio — *Bom dia, Inverno* (Companhia das Letras): la invernada se hace página.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  }
];

function q(word) {
  return GUIA + '?q=' + encodeURIComponent(word);
}

function buildBomDiaInvernoBodies() {
  const inspected = '2026-08-02';

  const body = `## Escopo

Divulgação editorial e inspeção-cultura do livro **«Bom dia, Inverno»** de [Tamara Klink](${TAMARA}) (Companhia das Letras) — a invernagem ártica em solitário virada narrativa. O laboratório **não vende o livro**: cruza a obra com o [Guia de Palavras](${GUIA}), com a ficha de Legado da autora, com [caminho](${CAMINHO}) / [passar](${PASSAR}) / [balde](${BALDE}) / [gesto](${GESTO}) e com a [Vida](${VIDA}).

> **Nota metodológica:** auditoria independente BudGanja. Fontes: [site Tamara](${SITE}), [Companhia das Letras](${EDITORA}), [UOL Cultura / Roda Viva](${UOL}), [Q&A no YouTube](${VIDEO_QA}) (legendas catalogadas). Capa desta ficha adaptada da imagem de divulgação TV Cultura / UOL (crédito de origem na reportagem). **Sem afiliação** com Tamara, Amyr, editora ou emissora. Divulgar ≠ endossar biografia completa.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Bom dia, Inverno** |
| Autora | [Tamara Klink](${TAMARA}) |
| Tipo | Livro · narrativa de invernagem / memoir de navegação |
| Editora | Companhia das Letras |
| Feito âncora | Invernagem sozinha no gelo ártico (Groenlândia) |
| Elo Legado | Cap. 8 Tamara · Cap. 7 [Amyr](${AMYR}) |
| Elo Palavras | [barco](${q('Barco')}) · [mar](${q('Mar')}) · [gelo](${q('Gelo')}) · [invernagem](${q('Invernagem')}) · [balde](${BALDE}) · [caminho](${CAMINHO}) |
| Elo rede | [Vida](${VIDA}) · [Animais](${ANIMAIS}) · [Artes](${ARTES}) · [Legado](${LEGADO}) |
| Data | ${inspected} |

## Por que divulgar aqui

Porque o laboratório documenta **coragem com método**. Tamara parte, invernar, escreve — e no [Q&A](${VIDEO_QA}) fala do **[balde](${BALDE})** que a acompanha no enjoo, dos **animais**, do **gelo**, do **barco** como casa. No [Roda Viva / UOL](${UOL}) diz que o «zero ajuda» do pai ([Amyr](${AMYR})) a empurrou a achar **caminhos próprios**. Isso é exactamente o vocabulário BudGanja: [caminho](${CAMINHO}), [passar](${PASSAR}), [gesto](${GESTO}), [verdade](${VERDADE}), [ficar](${VIDA}).

## Hipóteses e método

**H1:** o livro é o mapa literário da **invernagem** — não só «aventura», mas tempo preso no gelo.  
**H2:** o léxico do Q&A (barco, mar, gelo, balde, animais, risco…) é o mesmo mapa do [Guia](${GUIA}).  
**H3:** divulgar o livro no hub Artes **completa** a ficha de Legado sem fundir pessoa e obra.  
**H4:** o «não» do pai não apaga o mérito de Amyr — distingue **herança** de **rota própria**.

## Rede de palavras (lote temático)

| Palavra | Leitura BudGanja | Elo |
|---------|------------------|-----|
| [Barco](${q('Barco')}) | Casa e corpo da invernagem | Livro · Q&A |
| [Mar](${q('Mar')}) | Horizonte e sal | [caminho](${CAMINHO}) · [Vida](${VIDA}) |
| [Gelo](${q('Gelo')}) / [Congelado](${q('Congelado')}) | Mar que prende | Invernagem |
| [Inverno](${q('Inverno')}) / [Invernagem](${q('Invernagem')}) | Estação + feito | Título da obra |
| [Navegar](${q('Navegar')}) | Ofício e [gesto](${GESTO}) | Família Klink |
| [Água](${q('Água')}) · [Balde](${BALDE}) | Volume, enjoo, transporte | Q&A («abraçada no balde») |
| [Neve](${q('Neve')}) · [Groenlândia](${q('Groenlândia')}) | Palco ártico | Cronologia Tamara |
| [Risco](${q('Risco')}) · [Solitário](${q('Solitário')}) | Perigo com método | Legado · [verdade](${VERDADE}) |
| [Anzol](${q('Anzol')}) | Sobrevivência concreta | Narrativa |
| [Livro](${q('Livro')}) | A invernagem vira página | Companhia das Letras |
| [Caminho](${CAMINHO}) · [Passar](${PASSAR}) | Rota própria após o «zero ajuda» | [UOL](${UOL}) · Amyr |
| [Vida](${VIDA}) · [Animais](${ANIMAIS}) | Ficar, habitat, raposas/corvos/focas | Diário · Q&A |

## Complementaridade no projecto

| Recurso | Papel |
|---------|-------|
| [Tamara · Legado](${TAMARA}) | Pessoa e feitos |
| [Amyr · Legado](${AMYR}) | Pai / ofício / tensão do «zero ajuda» |
| [Bom dia, Inverno](${POST_HREF}) | Obra (esta ficha) |
| [Guia de Palavras](${GUIA}) | Lote temático barco→livro |
| [Balde](${BALDE}) · [Gesto](${GESTO}) · [Caminho](${CAMINHO}) | Palavras profundas |
| [Vida](${VIDA}) / [Diário](${DIARIO}) | Ficar quando o gelo prende |
| [Animais](${ANIMAIS}) | Habitat e companhia não humana |
| [Q&A YouTube](${VIDEO_QA}) | Legenda catalogada (779 palavras únicas) |
| [UOL Cultura](${UOL}) | Entrevista Roda Viva — caminhos próprios |

## Avaliação BudGanja

### Forças
- Une **livro + legado + léxico** sem confundir eixos.  
- Devolve ao site as palavras que a própria Tamara usa (barco, balde, gelo…).  
- Honra o mérito dela **e** o contexto do pai, com nuance.

### Limites
- Não é resenha literária completa nem biografia oficial.  
- Não substitui a leitura do livro nem a entrevista na íntegra.

## Como repetir o método

1. Fixar obra + autora + editora.  
2. Cruzar entrevista / Q&A → lote de palavras.  
3. Elos a Legado, Palavras, Vida, Animais.  
4. Divulgar com crédito de imagem e sem afiliação.  
5. Status.

## Status

**Aprovado — divulgação editorial** — *Bom dia, Inverno* indexado em Artes; lote temático no [Guia](${GUIA}); capa a partir da imagem UOL/TV Cultura; elos vivos a Tamara, Amyr, balde, caminho e Vida.

[▶ Ler a ficha · Tamara](${TAMARA}) · [▶ Guia de Palavras](${GUIA}) · [▶ Q&A](${VIDEO_QA}) · [▶ UOL](${UOL}) · [▶ Site da autora](${SITE}) · [▶ Artes](${ARTES})
`;

  const contentEn = `## Scope

Editorial promotion and culture inspection of **Bom dia, Inverno** by [Tamara Klink](${TAMARA}) — Arctic overwintering turned into a book. BudGanja does **not** sell the book: it maps the work onto the [Words Guide](${GUIA}), Tamara’s Legacy sheet, [caminho](${CAMINHO}), [balde](${BALDE}), [gesto](${GESTO}) and [Vida](${VIDA}).

> Sources: [tamaraklink.com](${SITE}), Companhia das Letras, [UOL / Roda Viva](${UOL}), [YouTube Q&A](${VIDEO_QA}). Cover adapted from TV Cultura / UOL image. No affiliation.

## Object

| Field | Value |
|-------|-------|
| Work | **Bom dia, Inverno** |
| Author | [Tamara Klink](${TAMARA}) |
| Anchor | Solo Arctic overwintering (Greenland) |
| Word map | boat · sea · ice · bucket · path · risk |
| Date | ${inspected} |

## Status

**Approved — editorial promotion** — book in Arts; thematic lexicon in the Guide; links to Tamara, Amyr, balde, caminho and Vida.

[▶ Tamara](${TAMARA}) · [▶ Words Guide](${GUIA}) · [▶ Q&A](${VIDEO_QA}) · [▶ UOL](${UOL})
`;

  const contentEs = `## Alcance

Divulgación editorial e inspección cultural de **Bom dia, Inverno** de [Tamara Klink](${TAMARA}) — la invernada ártica hecha libro. BudGanja **no vende** el libro: lo cruza con la [Guía de Palabras](${GUIA}), la ficha de Legado, [caminho](${CAMINHO}), [balde](${BALDE}), [gesto](${GESTO}) y [Vida](${VIDA}).

> Fuentes: [tamaraklink.com](${SITE}), Companhia das Letras, [UOL / Roda Viva](${UOL}), [Q&A YouTube](${VIDEO_QA}). Portada adaptada de imagen TV Cultura / UOL. Sin afiliación.

## Objeto

| Campo | Valor |
|-------|-------|
| Obra | **Bom dia, Inverno** |
| Autora | [Tamara Klink](${TAMARA}) |
| Ancla | Invernada ártica en solitario (Groenlandia) |
| Mapa | barco · mar · hielo · balde · camino · riesgo |
| Fecha | ${inspected} |

## Estado

**Aprobado — divulgación editorial** — libro en Artes; léxico temático en la Guía; enlaces a Tamara, Amyr, balde, camino y Vida.

[▶ Tamara](${TAMARA}) · [▶ Guía](${GUIA}) · [▶ Q&A](${VIDEO_QA}) · [▶ UOL](${UOL})
`;

  return { body, contentEn, contentEs };
}

function buildBomDiaInvernoPost() {
  const { body, contentEn, contentEs } = buildBomDiaInvernoBodies();
  return artePost({
    title: 'Divulgação: Bom dia, Inverno — Tamara Klink e o léxico do gelo',
    titleEn: 'Promotion: Bom dia, Inverno — Tamara Klink and the lexicon of ice',
    titleEs: 'Divulgación: Bom dia, Inverno — Tamara Klink y el léxico del hielo',
    excerpt:
      'Livro de Tamara Klink (Companhia das Letras): invernagem ártica cruzada com barco, mar, gelo, balde, caminho e todo o mapa BudGanja.',
    excerptEn:
      'Tamara Klink’s book (Companhia das Letras): Arctic overwintering crossed with boat, sea, ice, bucket, path and the whole BudGanja map.',
    excerptEs:
      'Libro de Tamara Klink (Companhia das Letras): invernada ártica cruzada con barco, mar, hielo, balde, camino y todo el mapa BudGanja.',
    slug: 'inspecao-arte-bom-dia-inverno',
    date: '2026-08-02T19:40:00.000Z',
    seriesOrder: 14,
    seriesLabel: 'Bom dia, Inverno · livro',
    coverImage: '/imagens/inspecoes/bom-dia-inverno-cover.jpg',
    sourceUrl: UOL,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  POST_HREF,
  GUIA_TAMARA_INVERNO_ITEMS,
  buildBomDiaInvernoPost,
  buildBomDiaInvernoBodies
};
