'use strict';

/**
 * Inspeção-guia: composição química e quimiotipos da Cannabis (Aula 10 XIV — Diogo).
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

const POST_HREF = '/posts/post-inspecao-guia-quimiotipos-cannabis.html';
const L = {
  guiaTec: '/guia/palavras.html?group=tecnico',
  hub: '/biblioteca/inspecoes/#inspecoes-palavras',
  xiv: '/biblioteca/unifesp/livro-xiv.html#aula-10',
  curso: '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html',
  eliana: '/posts/post-inspecao-eliana-rodrigues.html',
  planta: '/plantas/cannabis-sativa/',
  meditacao: '/posts/post-inspecao-guia-meditacao-endocanabinoidoma.html',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html'
};

function buildBodies() {
  const body = `## Escopo

Inspeção-guia a partir do **resumo da Aula 10** do XIV Curso UNIFESP — **Composição química e quimiotipos da Cannabis sativa L.** (Prof. Diogo de Oliveira Silva, IQ-UNIFESP). Objecto: literacia de **metabólitos**, **biossíntese**, **cinco quimiotipos** e o contraste fitoterápico × isolado.

> **Nota metodológica:** auditoria editorial dos [rascunhos XIV](${L.xiv}). **Não é bula, laudo laboratorial nem protocolo de cultivo.** Indexar ≠ endossar associação, óleo ou cultivar.

## Público e uso

| Campo | Valor |
|-------|-------|
| Âncora | [Livro XIV · Aula 10](${L.xiv}) |
| Docente | Prof. Diogo de Oliveira Silva |
| Grupo Guia | [Técnico](${L.guiaTec}) |
| Pergunta-guia | Por que a composição química e os quimiotipos importam para ler um óleo ou uma planta? |
| Data | 2026-08-02 |

## Tese central

Os **quimiotipos** classificam variantes de cannabis pelo **fitocanabinoide majoritário** (THC, CBD, CBG…), não por taxonomia popular «sativa/índica». A grade XIV liga isso a metabólitos secundários, terpenos e ao risco de reduzir a planta a um único isolado.

## Hipóteses

- **H1:** Estudar composição ≠ memorizar nomes — é entender **actividades distintas** (CBC, CBG, CBD, THC…) no mapa da aula.
- **H2:** Quimiotipo 1–5 descrevem teores relativos de **Δ9-THC / CBD / CBG** (e o tipo 5 quase sem canabinoides significativos — fibras).
- **H3:** Terpenoides partilham vias biossintéticas com fitocanabinoides e modulam o perfil sensorial/farmacológico («efeito comitiva» na rede BudGanja).
- **H4:** Full spectrum ≠ CBD isolado — a Aula 3/Eliana e a Aula 10 convergem: isolado eleva dose e curva em U invertida; fitoterápico mantém efeito.
- **H5:** Estudo de caso de óleos de associações (IDH) é **literacia analítica**, não ranking comercial.

## Mapa dos cinco quimiotipos (síntese da aula)

| Quimiotipo | Predominância citada |
|------------|----------------------|
| **1** | Δ9-THC majoritário |
| **2** | Equilíbrio THC ≈ CBD |
| **3** | CBD majoritário, THC baixo |
| **4** | CBG majoritário |
| **5** | Sem teores significativos de fitocanabinoides (eixo fibras) |

Até há pouco a literatura trabalhava sobretudo três tipos; a aula regista a expansão para cinco.

## Camadas químicas (resumo)

1. **Metabólitos primários vs secundários** — quimiotipos diferem sobretudo nos secundários.  
2. **Terpenos / via do mevalonato e MEP** — ligação à biossíntese de fitocanabinoides.  
3. **Fitocanabinoides não são exclusivos da cannabis** — outros organismos também produzem (nota da aula).  
4. **Tricomas** — armazenamento de resina (canabinoides + terpenos) nas flores femininas (elo Aula 2).

## Rede BudGanja

| Camada | Fichas |
|--------|--------|
| Formação | [Curso UNIFESP](${L.curso}) · [Eliana](${L.eliana}) · [Rascunhos XIV](${L.xiv}) |
| Planta | [Cannabis sativa](${L.planta}) |
| Via endógena (irmão) | [Guia meditação × eCBome](${L.meditacao}) |
| Cobertura | [Guia palavras](${L.cobertura}) |

## Limites

- Não ensina HPLC nem interpreta laudo de associação.  
- Não recomenda cultivar ilegal.  
- Teores e nomenclatura de quimiotipos evoluem na literatura — confirmar fontes primárias.

## Status

**Aprovado — inspeção-guia da Aula 10 (quimiotipos).** Abre fichas profundas onde o Guia técnico ainda apontava só ao livro-rascunho.

[▶ Aula 10](${L.xiv}) · [▶ Curso](${L.curso}) · [▶ Hub Palavras](${L.hub})`;

  const contentEn = `## Scope

Guide inspection from **UNIFESP XIV Lesson 10** — chemical composition and chemotypes of *Cannabis sativa* L. (Prof. Diogo de Oliveira Silva).

> **Not a lab report or grow protocol.** Indexing ≠ endorsement.

## Core thesis

**Chemotypes** classify cannabis by the **major phytocannabinoid** (THC, CBD, CBG…), not by street “sativa/indica” labels. XIV links this to secondary metabolites, terpenes and the risk of reducing the plant to a single isolate.

## Five chemotypes (lecture synthesis)

| Type | Predominance |
|------|----------------|
| 1 | Δ9-THC |
| 2 | THC ≈ CBD |
| 3 | CBD-dominant, low THC |
| 4 | CBG-dominant |
| 5 | Negligible phytocannabinoids (fiber axis) |

## Status

**Approved — Lesson 10 chemotype guide.**`;

  const contentEs = `## Alcance

Inspección-guía a partir de la **Aula 10 del XIV UNIFESP** — composición química y quimiotipos de *Cannabis sativa* L. (Prof. Diogo de Oliveira Silva).

> **No es laudo de laboratorio ni protocolo de cultivo.** Indexar ≠ respaldar.

## Tesis central

Los **quimiotipos** clasifican variantes por el **fitocannabinoide mayoritario** (THC, CBD, CBG…), no por etiquetas populares «sativa/índica».

## Cinco quimiotipos (síntesis)

| Tipo | Predominancia |
|------|----------------|
| 1 | Δ9-THC |
| 2 | THC ≈ CBD |
| 3 | CBD dominante, THC bajo |
| 4 | CBG dominante |
| 5 | Sin fitocannabinoides significativos (fibras) |

## Estado

**Aprobado — guía de la Aula 10 (quimiotipos).**`;

  return { body, contentEn, contentEs };
}

function buildGuiaQuimiotiposCannabisPost() {
  const { body, contentEn, contentEs } = buildBodies();
  return palavraPost({
    title: 'Inspeção: Guia quimiotipos — THC, CBD, CBG e a composição da cannabis',
    titleEn: 'Inspection: Chemotypes guide — THC, CBD, CBG and cannabis composition',
    titleEs: 'Inspección: Guía quimiotipos — THC, CBD, CBG y la composición del cannabis',
    excerpt:
      'Resumo da Aula 10 XIV (Diogo): metabólitos, biossíntese, cinco quimiotipos e literacia fitoterápico × isolado. Não é laudo nem protocolo.',
    excerptEn:
      'XIV Lesson 10 summary (Diogo): metabolites, biosynthesis, five chemotypes, and whole-plant vs isolate literacy. Not a lab report.',
    excerptEs:
      'Resumen Aula 10 XIV (Diogo): metabolitos, biosíntesis, cinco quimiotipos y literacia fitoterápico × aislado. No es laudo.',
    slug: 'inspecao-guia-quimiotipos-cannabis',
    date: '2026-08-02T13:00:00.000Z',
    seriesOrder: 43,
    seriesLabel: 'Guia · quimiotipos · Aula 10',
    sourceUrl: L.xiv,
    body,
    contentEn,
    contentEs
  });
}

const GUIA_QUIMIOTIPOS_ITEMS = [
  {
    id: 'quimiotipo',
    word: 'Quimiotipo',
    simple:
      'Classificação de variantes de cannabis pelo fitocanabinoide majoritário (THC, CBD, CBG…) — cinco tipos na Aula 10 XIV (Diogo).',
    simpleEn: 'Classification of cannabis variants by major phytocannabinoid (THC, CBD, CBG…) — five types in XIV Lesson 10 (Diogo).',
    simpleEs: 'Clasificación de variantes de cannabis por fitocannabinoide mayoritario (THC, CBD, CBG…) — cinco tipos en la Aula 10 XIV (Diogo).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'thc',
    word: 'THC',
    simple:
      'Δ9-tetrahidrocanabinol — fitocanabinoide majoritário do quimiotipo 1; na grade XIV também contraste com anandamida endógena e com CBD isolado.',
    simpleEn: 'Δ9-tetrahydrocannabinol — major phytocannabinoid of chemotype 1; in XIV also contrasted with endogenous anandamide and isolated CBD.',
    simpleEs: 'Δ9-tetrahidrocannabinol — fitocannabinoide mayoritario del quimiotipo 1; en el XIV también contraste con anandamida endógena y CBD aislado.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'cbd',
    word: 'CBD',
    simple:
      'Canabidiol — majoritário no quimiotipo 3; a aula insiste: CBD isolado ≠ fitoterápico full spectrum (efeito comitiva / curva em U).',
    simpleEn: 'Cannabidiol — major in chemotype 3; the lecture insists: isolated CBD ≠ full-spectrum herbal (entourage / inverted-U curve).',
    simpleEs: 'Cannabidiol — mayoritario en el quimiotipo 3; la clase insiste: CBD aislado ≠ fitoterápico full spectrum (efecto séquito / curva en U).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'cbg',
    word: 'CBG',
    simple: 'Canabigerol — fitocanabinoide majoritário do quimiotipo 4 na classificação da Aula 10 XIV.',
    simpleEn: 'Cannabigerol — major phytocannabinoid of chemotype 4 in XIV Lesson 10.',
    simpleEs: 'Cannabigerol — fitocannabinoide mayoritario del quimiotipo 4 en la Aula 10 XIV.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'cbn',
    word: 'CBN',
    simple: 'Canabinol — fitocanabinoide citado no mapa de moléculas/actividades da Aula 10 (composição química).',
    simpleEn: 'Cannabinol — phytocannabinoid cited on the Lesson 10 molecule/activity map.',
    simpleEs: 'Cannabinol — fitocannabinoide citado en el mapa de moléculas/actividades de la Aula 10.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'cbc',
    word: 'CBC',
    simple: 'Canabicromeno — fitocanabinoide do mapa XIV (ex. anti-inflamatório/analgésico na figura da aula).',
    simpleEn: 'Cannabichromene — phytocannabinoid on the XIV map (e.g. anti-inflammatory/analgesic on the lecture slide).',
    simpleEs: 'Cannabicromeno — fitocannabinoide del mapa XIV (p. ej. antiinflamatorio/analgésico en la figura de la clase).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'terpeno',
    word: 'Terpeno',
    simple:
      'Metabólito secundário (via mevalonato/MEP) — cheiro/cor e modulação; partilha vias com a biossíntese de fitocanabinoides (Aula 10).',
    simpleEn: 'Secondary metabolite (mevalonate/MEP path) — scent/color and modulation; shares paths with phytocannabinoid biosynthesis (Lesson 10).',
    simpleEs: 'Metabolito secundario (vía mevalonato/MEP) — olor/color y modulación; comparte vías con la biosíntesis de fitocannabinoides (Aula 10).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'efeito-comitiva',
    word: 'Efeito comitiva',
    simple:
      'Ideia de que a planta inteira (full spectrum) mantém efeito melhor que o isolado em dose alta — elo Aula 3/Eliana + composição Aula 10.',
    simpleEn: 'Idea that the whole plant (full spectrum) holds effect better than a high-dose isolate — Lesson 3/Eliana + Lesson 10 composition.',
    simpleEs: 'Idea de que la planta entera (full spectrum) mantiene el efecto mejor que el aislado en dosis alta — Aula 3/Eliana + Aula 10.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'full-spectrum',
    word: 'Full spectrum',
    simple: 'Extrato com o perfil amplo da planta — contraste com CBD isolado e com broad spectrum (sem THC) na grade XIV.',
    simpleEn: 'Extract with the plant’s broad profile — contrast with isolated CBD and broad spectrum (no THC) in XIV.',
    simpleEs: 'Extracto con el perfil amplio de la planta — contraste con CBD aislado y broad spectrum (sin THC) en el XIV.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'broad-spectrum',
    word: 'Broad spectrum',
    simple: 'Perfil amplo sem THC — opção citada na grade XIV para quem não tolera THC; ainda distinto do isolado puro.',
    simpleEn: 'Broad profile without THC — XIV option for THC-sensitive users; still distinct from a pure isolate.',
    simpleEs: 'Perfil amplio sin THC — opción XIV para quien no tolera THC; aún distinto del aislado puro.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'tricoma',
    word: 'Tricoma',
    simple: 'Estrutura glandular que armazena resina (canabinoides + terpenos) — ponto de colheita e qualidade na rede XIV.',
    simpleEn: 'Glandular structure storing resin (cannabinoids + terpenes) — harvest/quality point in the XIV network.',
    simpleEs: 'Estructura glandular que almacena resina (cannabinoides + terpenos) — punto de cosecha y calidad en la red XIV.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'cultivar',
    word: 'Cultivar',
    simple: 'Variante cultivada de cannabis — na Aula 10, base para falar de quimiotipos por teor, não só por nome comercial.',
    simpleEn: 'Cultivated cannabis variant — in Lesson 10, basis for chemotypes by content, not only trade name.',
    simpleEs: 'Variante cultivada de cannabis — en la Aula 10, base para quimiotipos por teor, no solo por nombre comercial.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'metabolito-secundario',
    word: 'Metabólito secundário',
    simple: 'Pigmentos, terpenos, alcaloides… — o que mais diferencia quimiotipos na Aula 10, face aos metabólitos primários.',
    simpleEn: 'Pigments, terpenes, alkaloids… — what most differentiates chemotypes in Lesson 10 versus primary metabolites.',
    simpleEs: 'Pigmentos, terpenos, alcaloides… — lo que más diferencia quimiotipos en la Aula 10 frente a metabolitos primarios.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  }
];

module.exports = {
  buildGuiaQuimiotiposCannabisPost,
  GUIA_QUIMIOTIPOS_ITEMS
};
