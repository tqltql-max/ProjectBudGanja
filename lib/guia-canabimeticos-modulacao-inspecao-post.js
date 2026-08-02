'use strict';

/**
 * Inspeção-guia: modulação exógena + canabiméticos (Aula 7 XIV — Eliana).
 * Irmão do guia meditação (via endógena).
 */

function palavraPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'palavras-origem',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Palavras',
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

const POST_HREF = '/posts/post-inspecao-guia-canabimeticos-modulacao.html';
const L = {
  guiaTec: '/guia/palavras.html?group=tecnico',
  hub: '/biblioteca/inspecoes/#inspecoes-palavras',
  xiv: '/biblioteca/unifesp/livro-xiv.html#aula-7',
  curso: '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html',
  eliana: '/posts/post-inspecao-eliana-rodrigues.html',
  meditacao: '/posts/post-inspecao-guia-meditacao-endocanabinoidoma.html',
  quimio: '/posts/post-inspecao-guia-quimiotipos-cannabis.html',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html'
};

function buildBodies() {
  const body = `## Escopo

Inspeção-guia a partir do **resumo da Aula 7** do XIV Curso — **Modulação do sistema endocanabinoide e canabiméticos** (Prof.ª Eliana Rodrigues). Complementa o [guia de meditação](${L.meditacao}) (via **endógena**): aqui o foco é a via **exógena**.

> **Nota metodológica:** rascunhos XIV + rede BudGanja. **Não é protocolo clínico nem receita de planta.** Moléculas de laboratório (Mechoulam / HU / JD…) são citadas como **pesquisa**, não como indicação.

## Público e uso

| Campo | Valor |
|-------|-------|
| Âncora | [Livro XIV · Aula 7](${L.xiv}) |
| Docente | Prof.ª Eliana Rodrigues |
| Elo irmão | [Meditação × eCBome](${L.meditacao}) |
| Pergunta-guia | Como modular o endocanabinoidoma «de fora» — cannabis, canabiméticos e moléculas alvo? |

## Tese central

A Aula 7 separa **modulação endógena** (hábitos/PIC — deixada para a aula de estilo de vida) de **modulação exógena**: fitocanabinoides, **canabiméticos** (outras plantas) e isolados/sintéticos em estudo. Hiper × hipo expressão de **CB1/CB2** enquadra doenças citadas no curso de actualização (Universidade Hebraica / Mechoulam).

## Hipóteses

- **H1:** Canabimético ≠ «é cannabis» — é substância/planta que **interage** com o SEC.
- **H2:** Excesso de CB1 (hiper) e défice de CB2 (ex. osso) são mapas de **literacia**, não diagnósticos.
- **H3:** Rimonabant histórico mostra o risco de bloquear CB1 central — a aula cita pesquisa de antagonistas periféricos (ex. JD 5037) como horizonte, não como fármaco aprovado BR.
- **H4:** Lavanda e outras plantas entram no bloco canabimético da aula como exemplos de rede, não como substituto clínico da cannabis.
- **H5:** Fitoterápico vs isolado continua válido — ver também [quimiotipos](${L.quimio}).

## Mapa exógeno (síntese)

| Camada | Exemplos na aula |
|--------|------------------|
| Fitocanabinoides | Cannabis / produtos |
| Canabiméticos | Outras plantas (ex. lavanda e rede citada) |
| Isolados / sintéticos | Linha Mechoulam / HU; candidatos tipo JD 5037, HU-308 (pesquisa) |
| Endógeno (irmão) | Meditação, yoga, exercício — [guia dedicado](${L.meditacao}) |

## Rede BudGanja

| Camada | Fichas |
|--------|--------|
| Formação | [Eliana](${L.eliana}) · [Curso](${L.curso}) · [Aula 7](${L.xiv}) |
| Via endógena | [Meditação](${L.meditacao}) |
| Química | [Quimiotipos](${L.quimio}) |
| Hub | [Palavras](${L.hub}) |

## Limites

- Não recomenda automedicação com plantas «canabiméticas».  
- Não interpreta exames de receptores.  
- Pesquisa pré-clínica ≠ medicamento disponível.

## Status

**Aprovado — inspeção-guia da Aula 7 (canabiméticos / modulação exógena).**

[▶ Aula 7](${L.xiv}) · [▶ Meditação](${L.meditacao}) · [▶ Hub](${L.hub})`;

  const contentEn = `## Scope

Guide from **XIV Lesson 7** — ECS modulation and cannabimimetics (Prof. Eliana Rodrigues). Sibling of the [meditation guide](${L.meditacao}) (endogenous path); focus here is **exogenous**.

> **Not a clinical protocol.** Lab molecules are research horizon, not Brazilian indications.

## Core thesis

Lesson 7 separates **endogenous** modulation (habits/PIC) from **exogenous**: phytocannabinoids, **cannabimimetics** (other plants) and isolates/synthetics under study. CB1/CB2 hyper/hypo framing is literacy, not diagnosis.

## Status

**Approved — Lesson 7 cannabimimetics / exogenous modulation guide.**`;

  const contentEs = `## Alcance

Guía a partir de la **Aula 7 del XIV** — modulación del SEC y cannabimiméticos (Profa. Eliana Rodrigues). Hermana de la [guía de meditación](${L.meditacao}) (vía endógena); aquí el foco es **exógena**.

> **No es protocolo clínico.** Moléculas de laboratorio = horizonte de investigación.

## Tesis central

La Aula 7 separa modulación **endógena** de **exógena**: fitocannabinoides, **cannabimiméticos** y aislados/sintéticos en estudio.

## Estado

**Aprobado — guía Aula 7 (cannabimiméticos / modulación exógena).**`;

  return { body, contentEn, contentEs };
}

function buildGuiaCanabimeticosModulacaoPost() {
  const { body, contentEn, contentEs } = buildBodies();
  return palavraPost({
    title: 'Inspeção: Guia canabiméticos — modular o SEC por via exógena',
    titleEn: 'Inspection: Cannabimimetics guide — modulating the ECS exogenously',
    titleEs: 'Inspección: Guía cannabimiméticos — modular el SEC por vía exógena',
    excerpt:
      'Resumo da Aula 7 XIV (Eliana): modulação exógena, CB1/CB2, canabiméticos e moléculas em pesquisa — irmão do guia de meditação (via endógena).',
    excerptEn:
      'XIV Lesson 7 summary (Eliana): exogenous modulation, CB1/CB2, cannabimimetics and research molecules — sibling of the meditation guide.',
    excerptEs:
      'Resumen Aula 7 XIV (Eliana): modulación exógena, CB1/CB2, cannabimiméticos y moléculas en investigación — hermana de la guía de meditación.',
    slug: 'inspecao-guia-canabimeticos-modulacao',
    date: '2026-08-02T13:30:00.000Z',
    seriesOrder: 44,
    seriesLabel: 'Guia · canabiméticos · Aula 7',
    sourceUrl: L.xiv,
    body,
    contentEn,
    contentEs
  });
}

const GUIA_CANABIMETICOS_ITEMS = [
  {
    id: 'canabimetico',
    word: 'Canabimético',
    simple:
      'Planta ou substância que interage com o SEC sem ser necessariamente cannabis — bloco central da Aula 7 XIV (Eliana), via exógena.',
    simpleEn: 'Plant or substance that interacts with the ECS without necessarily being cannabis — core of XIV Lesson 7 (Eliana), exogenous path.',
    simpleEs: 'Planta o sustancia que interactúa con el SEC sin ser necesariamente cannabis — bloque central de la Aula 7 XIV (Eliana).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'cb1',
    word: 'CB1',
    simple:
      'Receptor canabinoide (sobretudo central/periférico) — na Aula 7, hiper expressão enquadra exemplos de pesquisa (ex. antagonistas periféricos).',
    simpleEn: 'Cannabinoid receptor (mostly central/peripheral) — in Lesson 7, overexpression frames research examples (e.g. peripheral antagonists).',
    simpleEs: 'Receptor cannabinoide — en la Aula 7, hiper expresión encuadra ejemplos de investigación (p. ej. antagonistas periféricos).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'cb2',
    word: 'CB2',
    simple:
      'Receptor canabinoide (perfil mais periférico/imune) — a aula cita baixa expressão óssea no mapa de osteoporose como literacia, não protocolo.',
    simpleEn: 'Cannabinoid receptor (more peripheral/immune profile) — the lecture cites low bone expression in an osteoporosis map as literacy, not a protocol.',
    simpleEs: 'Receptor cannabinoide (perfil más periférico/inmune) — la clase cita baja expresión ósea en el mapa de osteoporosis como literacia.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'lavanda',
    word: 'Lavanda',
    simple: 'Planta citada na Aula 7 no bloco de canabiméticos — exemplo de rede vegetal além da cannabis.',
    simpleEn: 'Plant cited in Lesson 7 in the cannabimimetics block — example of a plant network beyond cannabis.',
    simpleEs: 'Planta citada en la Aula 7 en el bloque de cannabimiméticos — ejemplo de red vegetal más allá del cannabis.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'mechoulam',
    word: 'Mechoulam',
    simple:
      'Linha de pesquisa (Universidade Hebraica) citada por Eliana na Aula 7 — moléculas alvo / actualização; não é endosso de fármaco BR.',
    simpleEn: 'Research line (Hebrew University) cited by Eliana in Lesson 7 — target molecules / update; not a Brazilian drug endorsement.',
    simpleEs: 'Línea de investigación (Universidad Hebrea) citada por Eliana en la Aula 7 — moléculas diana; no es respaldo de fármaco BR.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'rimonabant',
    word: 'Rimonabant',
    simple:
      'Antagonista CB1 histórico retirado do mercado — a Aula 7 usa-o como alerta de risco central ao falar de novos candidatos periféricos.',
    simpleEn: 'Historic CB1 antagonist withdrawn from market — Lesson 7 uses it as a central-risk warning when discussing newer peripheral candidates.',
    simpleEs: 'Antagonista CB1 histórico retirado del mercado — la Aula 7 lo usa como alerta de riesgo central.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'modulacao-exogena',
    word: 'Modulação exógena',
    simple:
      'Via «de fora» na Aula 7 — cannabis, canabiméticos, isolados/sintéticos — distinta da autonomia endógena (meditação/PIC).',
    simpleEn: '“From outside” path in Lesson 7 — cannabis, cannabimimetics, isolates/synthetics — distinct from endogenous autonomy (meditation/PIC).',
    simpleEs: 'Vía «desde fuera» en la Aula 7 — cannabis, cannabimiméticos, aislados/sintéticos — distinta de la autonomía endógena.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'via-exogena',
    word: 'Via exógena',
    simple: 'Sinónimo prático de modulação exógena na rede BudGanja — elo Aula 7 × guia de meditação (via endógena).',
    simpleEn: 'Practical synonym of exogenous modulation in BudGanja — Lesson 7 × meditation guide (endogenous path).',
    simpleEs: 'Sinónimo práctico de modulación exógena en BudGanja — Aula 7 × guía de meditación (vía endógena).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  }
];

module.exports = {
  buildGuiaCanabimeticosModulacaoPost,
  GUIA_CANABIMETICOS_ITEMS
};
