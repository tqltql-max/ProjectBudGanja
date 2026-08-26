'use strict';

/**
 * Fila restante (não-arte): Tabaco (derivado), Teofrasto (pessoa),
 * Observatório PharMacon (canal). Palavras entorpecente/narcótico já existem
 * na ficha conjunta — só marcar sugestões.
 */

const { derivadoPost } = require('./derivados-inspecoes-posts.js');

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
  ['titleEn', 'titleEs', 'excerptEn', 'excerptEs', 'sourceUrl', 'contentEn', 'contentEs'].forEach((k) => {
    if (opts[k]) post[k] = opts[k];
  });
  return post;
}

function canalPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage,
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: opts.series || 'canal-pharmacon',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Canal',
    content_raw: opts.body
  };
  ['titleEn', 'titleEs', 'excerptEn', 'excerptEs', 'sourceUrl', 'contentEn', 'contentEs'].forEach((k) => {
    if (opts[k]) post[k] = opts[k];
  });
  return post;
}

const INSPECTED = '2026-08-24';
const VALEU = '/posts/post-inspecao-palavra-valeu.html';

function buildTabacoPost() {
  const wiki = 'https://pt.wikipedia.org/wiki/Tabaco';
  const who =
    'https://www.who.int/news-room/fact-sheets/detail/tobacco';
  const plantaNota =
    'Não há (ainda) ficha de planta *Nicotiana* no catálogo de frutos; esta inspeção é o **derivado industrial**.';
  const body = `## Escopo

Inspeção editorial dos **produtos industriais do tabaco** (*Nicotiana tabacum* L.) — cigarro, cigarrilha, narguilé, tabaco aquecido e líquidos com nicotina. ${plantaNota} O foco **não** é o açúcar dos frutos: é **nicotina + combustão/aerossol + aditivos de formulação**.

> **Nota metodológica:** auditoria independente. Âncoras: [Wikipédia · Tabaco](${wiki}), [OMS · Tobacco](${who}). **Não é aconselhamento clínico de cessação** (isso é SUS/OMS/profissional). Planta ≠ vilã abstracta: o dano documentado concentra-se no **produto industrial de uso diário**. Sem afiliação com indústria tabaqueira nem com vape-trade.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Planta de origem | *Nicotiana tabacum* (e outras *Nicotiana*) |
| Tipo BudGanja | Derivado de risco — planta → produto industrial |
| Produtos em foco | Cigarro industrial, tabaco de enrolar, narguilé, aquecido, e-líquidos com nicotina |
| Riscos em foco | Nicotina (dependência) · combustão (alcatrão, CO, particulados) · aditivos · aerossol |
| Data | ${INSPECTED} |

## Hipóteses

**H1:** usos etnobotânicos e folha curada artesanal **não** apagam o cigarro de linha de montagem.  
**H2:** o eixo de dano é **dose + via (fumaça/aerossol) + frequência**, documentado em saúde pública (OMS).  
**H3:** «sabor» e aditivos no industrial são química de formulação — literacia de produto, não romantismo da folha.

## Mapa planta → produto

| Etapa | Nota editorial |
|-------|----------------|
| Folha / cura | Agricultura e ofício — contexto, não isenção |
| Cigarro industrial | Combustão + filtro + papel + aditivos — produto de risco clássico |
| Enrolar / narguilé | Continua combustão; dose enganosa («é só cachimbo») |
| Aquecido / e-cig | Sem combustão completa ≠ inócuo; nicotina + aerossol + marketing jovem |

## Veredicto

A folha existe na história; o **cigarro industrial** (e primos nicotínicos de prateleira) merecem alerta de derivado de risco — com OMS, sem moralismo vazio e sem tutorial de uso.

[▶ Derivados](/biblioteca/inspecoes/#inspecoes-derivados) · [▶ OMS tabaco](${who}) · [▶ Valeu !!!](${VALEU})
`;
  return derivadoPost({
    title: 'Inspeção: Tabaco — origem da planta e produtos industriais',
    titleEn: 'Inspection: Tobacco — plant origin and industrial products',
    titleEs: 'Inspección: Tabaco — origen de la planta y productos industriales',
    excerpt:
      'Derivados de risco: *Nicotiana* → cigarro e primos nicotínicos. Planta ≠ vilã; foco nicotina × combustão/aerossol × aditivos. Sem tutorial.',
    excerptEn:
      'Risk derivatives: *Nicotiana* → cigarettes and nicotine cousins. Plant ≠ villain; nicotine × smoke/aerosol × additives.',
    excerptEs:
      'Derivados de riesgo: *Nicotiana* → cigarrillo. Planta ≠ villana; nicotina × combustión/aerosol × aditivos.',
    slug: 'inspecao-derivado-tabaco',
    date: '2026-08-24T18:00:00.000Z',
    seriesOrder: 21,
    seriesLabel: 'Tabaco · derivado',
    coverImage: 'imagens/inspecoes/tabaco-derivado-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn: `## Scope\n\nIndustrial tobacco products (*Nicotiana tabacum*) — cigarette, heated tobacco, nicotine e-liquids. Axis = **nicotine + combustion/aerosol + additives**, not fruit sugar.\n\nWHO fact sheet. Not cessation counselling. Plant ≠ villain; the industrial daily product is the risk object.\n\n**Approved in Risk derivatives.**\n`,
    contentEs: `## Alcance\n\nProductos industriales del tabaco. Eje = **nicotina + combustión/aerosol + aditivos**.\n\nOMS. No es consejo de cesación. **Aprobada en Derivados de riesgo.**\n`
  });
}

function buildTeofrastoPost() {
  const wiki = 'https://pt.wikipedia.org/wiki/Teofrasto';
  const herodoto = '/posts/post-inspecao-figura-herodoto.html';
  const plantas = '/plantas/';
  const body = `## Escopo

Inspeção editorial de **Teofrasto de Ereso** (c. 371–287 a.C.) — sucessor de Aristóteles no Liceu, autor de *Historia plantarum* e *De causis plantarum*. O recorte BudGanja é o **método de catálogo**: descrever a planta (partes, lugares, usos) antes de a moralizar. Elo com [Heródoto](${herodoto}) (investigar o que se passou) e com o catálogo [/plantas/](${plantas}).

> **Nota metodológica:** auditoria independente. Âncora: [Wikipédia · Teofrasto](${wiki}). Sem afiliação clássica. *Historia plantarum* é **obra grega antiga** — o laboratório não a trata como bulário moderno nem como desculpa para extrair semente de anonácea.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Teofrasto** (Θεόφραστος) |
| Obras-âncora | *Historia plantarum* · *De causis plantarum* |
| Tipo BudGanja | Pessoa — método de catálogo botânico |
| Elo | [Heródoto](${herodoto}) · [/plantas/](${plantas}) |
| Data | ${INSPECTED} |

## Hipóteses

**H1:** o valor é o **ofício de listar e distinguir espécies** — avô do hábito de ficha.  
**H2:** «pai da botânica» é título tradicional: útil como **orientação**, não como dogma.  
**H3:** cada ficha em /plantas/ herda o gesto (nome, partes, cautela) sem fingir que Teofrasto escreveu *Persea* ou *Euterpe*.

## Método (o que repetir)

1. Nomear a planta (popular + latino quando houver).  
2. Distinguir partes (folha, fruto, semente — riscos diferentes).  
3. Separar uso cultural de produto industrial (série Derivados).  
4. Status claro.

## Status

**Aprovado na série Pessoas** — Teofrasto como método de catálogo; o inventário vive em [/plantas/](${plantas}).

[▶ Pessoas](/biblioteca/inspecoes/#inspecoes-pessoas-historia) · [▶ Plantas](${plantas}) · [▶ Valeu !!!](${VALEU})
`;
  return figuraPost({
    title: 'Inspeção: Teofrasto — pai da botânica e o catálogo de plantas',
    titleEn: 'Inspection: Theophrastus — father of botany and the plant catalog',
    titleEs: 'Inspección: Teofrasto — padre de la botánica y el catálogo de plantas',
    excerpt:
      'Pessoas: Teofrasto — *Historia plantarum*; método de catálogo que o laboratório herda em /plantas/. Elo com Heródoto. Sem bulário moderno.',
    excerptEn:
      'People: Theophrastus — *Historia plantarum*; catalog method inherited in /plantas/. Link to Herodotus.',
    excerptEs:
      'Personas: Teofrasto — *Historia plantarum*; método de catálogo en /plantas/. Vínculo con Heródoto.',
    slug: 'inspecao-figura-teophrasto',
    date: '2026-08-24T18:10:00.000Z',
    seriesOrder: 36,
    seriesLabel: 'Teofrasto · Pessoas',
    coverImage: 'imagens/inspecoes/teofrasto-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn: `## Scope\n\nTheophrastus of Eresus — *Historia plantarum*. BudGanja cut = **catalog method**, not a modern herbal. Link: Herodotus; /plantas/.\n\n**Approved in People.**\n`,
    contentEs: `## Alcance\n\nTeofrasto de Ereso — *Historia plantarum*. Recorte = **método de catálogo**. Elo: Heródoto; /plantas/.\n\n**Aprobada en Personas.**\n`
  });
}

function buildPharmaconPost() {
  const site = 'https://observamed-drogas.unifesp.br/';
  const sobre = 'https://observamed-drogas.unifesp.br/sobre';
  const canabinall = '/posts/post-inspecao-canal-canabinall.html';
  const unifesp = 'https://site.unifesp.br/cee/extensao/canabinall';
  const body = `## Escopo

Inspeção editorial do **PharMacon — Observatório do uso de medicamentos, maconha e outras drogas** (Unifesp, campi Diadema e Baixada Santista). O objecto é o **observatório universitário** (site, missão, articulação SUS/universidade) — **distinto** do canal de divulgação [CANABinALL](${canabinall}), que o próprio CEE/Unifesp apresenta como projecto de extensão **em colaboração** com o observatório e o MOVRECAM.

> **Nota metodológica:** auditoria independente. Fontes verificadas em ${INSPECTED}: [site PharMacon](${site}), [Sobre](${sobre}), [CEE · CANABinALL](${unifesp}). Indexar ≠ endossar linha de política pública. Sem afiliação com Unifesp, MOVRECAM ou indústria. Não inventariar YouTube alheio como se fosse o observatório.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **PharMacon** (Observatório Unifesp) |
| URL | [${site}](${site}) |
| Tipo BudGanja | Canal / instituição de pesquisa e debate público |
| Distinção | ≠ [CANABinALL](${canabinall}) (YouTube de extensão) |
| Data | ${INSPECTED} |

## Hipóteses

**H1:** o observatório produz **informação para debate e política**; o CANABinALL traduz ciência canabinoide em vídeo — dois palcos.  
**H2:** temas declarados (medicalização, benzodiazepínicos, acesso a cannabis, custo SUS) são **agenda pública**, não protocolo clínico do laboratório.  
**H3:** complementaridade com MOVRECAM/CANABinALL deve ser **citada e delimitada**, não fundida.

## O que a ficha não faz

- Não copia bases de dados nem avalia papers um a um (isso é série Artigos, com DOI).  
- Não trata o site como canal de cultivo.  
- Não atribui ao PharMacon o acervo de vídeo do [@canabinall](https://www.youtube.com/@canabinall).

## Status

**Aprovado como canal/instituição** — observatório Unifesp fichado com fonte oficial; CANABinALL permanece na sua ficha.

[▶ Canais](/biblioteca/inspecoes/#inspecoes-canais) · [▶ CANABinALL](${canabinall}) · [▶ site](${site}) · [▶ Valeu !!!](${VALEU})
`;
  return canalPost({
    title: 'Inspeção: Observatório PharMacon — Unifesp e o debate público',
    titleEn: 'Inspection: PharMacon Observatory — Unifesp and the public debate',
    titleEs: 'Inspección: Observatorio PharMacon — Unifesp y el debate público',
    excerpt:
      'Canal: PharMacon (Unifesp) — observatório de medicamentos, maconha e outras drogas. Distinto do YouTube CANABinALL. Fonte: observamed-drogas.unifesp.br.',
    excerptEn:
      'Channel: PharMacon (Unifesp) observatory. Distinct from CANABinALL YouTube. Source: observamed-drogas.unifesp.br.',
    excerptEs:
      'Canal: PharMacon (Unifesp). Distinto de CANABinALL. Fuente: observamed-drogas.unifesp.br.',
    slug: 'inspecao-canal-pharmacon',
    date: '2026-08-24T18:20:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'PharMacon · canal',
    coverImage: 'imagens/inspecoes/pharmacon-cover.jpg',
    sourceUrl: site,
    body,
    contentEn: `## Scope\n\nPharMacon observatory (Unifesp). Object = the official site/mission. Distinct from CANABinALL YouTube.\n\nSources: observamed-drogas.unifesp.br. Indexing ≠ endorsement.\n\n**Approved as channel/institution.**\n`,
    contentEs: `## Alcance\n\nObservatorio PharMacon (Unifesp). Distinto del YouTube CANABinALL.\n\n**Aprobado como canal/institución.**\n`
  });
}

function leftoverPosts() {
  return [buildTabacoPost(), buildTeofrastoPost(), buildPharmaconPost()];
}

const LEFTOVER_META = [
  { sugId: 'derivado-tabaco', slug: 'inspecao-derivado-tabaco', coverTitle: 'Tabaco', coverSub: 'nicotina · combustão' },
  { sugId: 'figura-teophrasto', slug: 'inspecao-figura-teophrasto', coverTitle: 'Teofrasto', coverSub: 'catálogo de plantas' },
  { sugId: 'observatorio-pharmacon', slug: 'inspecao-canal-pharmacon', coverTitle: 'PharMacon', coverSub: 'observatório Unifesp' }
];

const WORD_DONE = {
  'palavra-entorpecente': {
    slug: 'inspecao-palavra-entorpecente-narcotico',
    note: 'Ficha conjunta Entorpecente × Narcótico.'
  },
  'palavra-narcotico': {
    slug: 'inspecao-palavra-entorpecente-narcotico',
    note: 'Ficha conjunta Entorpecente × Narcótico.'
  }
};

module.exports = {
  leftoverPosts,
  LEFTOVER_META,
  WORD_DONE,
  buildTabacoPost,
  buildTeofrastoPost,
  buildPharmaconPost
};
