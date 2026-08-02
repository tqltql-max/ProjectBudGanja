'use strict';

/**
 * Inspeção-guia: modular o endocanabinoidoma atrás da meditação.
 * Elo: aulas XIV (Eliana Rodrigues · Paulo Morais) · SEC · práticas integrativas.
 * Não é protocolo clínico nem receita de retiro.
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

const L = {
  guiaTec: '/guia/palavras.html?group=tecnico',
  hub: '/biblioteca/inspecoes/#inspecoes-palavras',
  xiv: '/biblioteca/unifesp/livro-xiv.html',
  eliana: '/posts/post-inspecao-eliana-rodrigues.html',
  curso: '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html',
  sidarta: '/posts/post-inspecao-sidarta-ribeiro.html',
  canabinall: '/posts/post-inspecao-canal-canabinall.html',
  movrecam: '/posts/post-inspecao-canal-movrecam.html',
  emocao: '/posts/post-inspecao-palavra-emocao.html',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html',
  sec: '/guia/palavras.html?q=Sistema+endocanabinoide',
  eCBome: '/guia/palavras.html?q=Endocanabinoidoma',
  aea: '/guia/palavras.html?q=Anandamida',
  endo: '/guia/palavras.html?q=Endocanabinoide',
  vida: '/vida/diario/',
  meditacao: '/guia/palavras.html?q=Medita%C3%A7%C3%A3o',
  mindfulness: '/guia/palavras.html?q=Mindfulness',
  yoga: '/guia/palavras.html?q=Yoga',
  pic: '/guia/palavras.html?q=PIC',
  bdnf: '/guia/palavras.html?q=BDNF',
  doisAg: '/guia/palavras.html?q=2-AG',
  canabimetico: '/guia/palavras.html?q=Canabim%C3%A9tico',
  modEndo: '/guia/palavras.html?q=Modula%C3%A7%C3%A3o+end%C3%B3gena',
  autonomia: '/guia/palavras.html?q=Autonomia+end%C3%B3gena'
};

function buildGuiaMeditacaoEndocanabinoidomaBodies() {
  const inspected = '2026-08-02';

  const body = `## Escopo

Inspeção-guia do laboratório BudGanja sobre **como modular o endocanabinoidoma «por dentro»** — com foco na **meditação / mindfulness / yoga** como práticas que a literatura e a grade UNIFESP (XIV) ligam a alterações mensuráveis de endocanabinoides.

> **Nota metodológica (ler primeiro):** auditoria editorial a partir dos [rascunhos das aulas XIV](${L.xiv}) (Prof.ª Eliana Rodrigues · Prof. Dr. Paulo Morais) e da rede BudGanja. **Não é protocolo clínico, não é bula, não substitui médico nem prática supervisionada.** Estudos citados são sobretudo observacionais / revisões — indexar ≠ endossar dose ou escola de meditação. Objecto = **literacia do SEC × autonomia endógena**.

## Público e uso

| Campo | Valor |
|-------|-------|
| Público | Estudantes do curso UNIFESP, profissionais de saúde, praticantes de PIC, leitores do Guia técnico |
| Tipo BudGanja | Inspeção-guia — SEC × estilo de vida × práticas integrativas |
| Âncora de aula | [Livro XIV](${L.xiv}) — Endocanabinoidoma + modulação / estilo de vida (Eliana) |
| Grupo Guia | [Técnico](${L.guiaTec}) |
| Pergunta-guia | Como a meditação entra no mapa de **modulação endógena** do endocanabinoidoma, ao lado de dieta, exercício e outras PIC? |
| Data | ${inspected} |

## Tese central (uma frase)

O endocanabinoidoma não se modulariza só com fitocanabinoides: a grade XIV descreve um eixo de **autonomia endógena** — estilo de vida + práticas integrativas — em que **meditação, yoga e mindfulness** aparecem como vias que podem **elevar anandamida / 2-AG** (e BDNF) em contextos de hipoatividade do sistema.

## Hipóteses

**H1:** [sistema endocanabinoide](${L.sec}) clássico (CB1/CB2 + AEA/2-AG + enzimas) é o núcleo; o [endocanabinoidoma](${L.eCBome}) amplia a rede (outros receptores, mediadores, vias) — a meditação age sobre o organismo inteiro, não só «num receptor».  
**H2:** na aula de estilo de vida, a Profa. Eliana separa modulação **exógena** (cannabis, canabiméticos, moléculas de laboratório) de modulação **endógena** (o que o próprio corpo faz com hábitos e PIC).  
**H3:** meditação / mindfulness / yoga entram no mesmo bloco que massagem e eletroacupuntura — práticas que a revisão citada associa a **efeitos canabiméticos** (subida de endocanabinoides no sangue).  
**H4:** o estudo-piloto do retiro de 4 dias (Isha Yoga / Inner Engineering, 2020, n≈323) é **observacional**: mostra associação (AEA, 2-AG, BDNF ↑; humor/foco ↑) — não prova causalidade clínica universal.  
**H5:** modular ≠ medicar: esta ficha **não** recomenda abandonar tratamento prescrito nem substitui avaliação médica.

## Mapa: camadas de modulação (visão da grade XIV)

| Camada | Exemplos na aula | Quem «puxa» |
|--------|------------------|-------------|
| **Fitocanabinoides** | Cannabis / produtos | Via clínica / sanitária |
| **Canabiméticos** | Outras plantas (ex. lavanda e rede citada) | Fitoterapia / pesquisa |
| **Sintéticos / isolados** | Moléculas alvo (ex. linha Mechoulam / HU) | Medicina do futuro / ensaio |
| **Estilo de vida** | Dieta · controlo de peso · exercício (ex. ↑ AEA após ~30 min corrida/bike) | Autonomia quotidiana |
| **PIC endógenas** | **Meditação · yoga · mindfulness** · massagem · eletroacupuntura | Prática regular / retiro |

A meditação ocupa a última linha: **não depende de ingestão de canabinoide**, mas pode alterar a disponibilidade dos [endocanabinoides](${L.endo}) que o corpo já sintetiza ([anandamida](${L.aea}), 2-AG).

## Objecto inspecionado: meditação no eixo SEC

### O que a aula afirma (síntese fiel)

1. Em estados de **hipoatividade** do SEC (baixa produção ou baixa expressão de receptores), práticas de meditação / yoga / mindfulness aparecem na revisão como estratégias que **aumentam AEA e 2-AG** no sangue e ajudam a restabelecer equilíbrio.  
2. Um estudo observacional prospectivo (2020) com meditadores num retiro avançado de **4 dias** (programa tipo Isha Yoga / Inner Engineering) associou a prática a:  
   - aumento de **anandamida**, **2-AG** e **BDNF**;  
   - melhoria de foco, felicidade e bem-estar;  
   - redução de depressão e ansiedade (escalas / inquéritos até ~1 mês).  
3. O mesmo bloco cita Vicenzo Di Marzo no contexto de regulação do endocanabinoidoma — ponte com a aula do Prof. Paulo Morais sobre o conceito ampliado.  
4. Resumo da Profa. Eliana: modular o eCBome = fitocanabinoides **+** canabiméticos **+** endógenos próprios **+** sintéticos **+** estilo de vida **+** PIC (meditação incluída).

### O que isto **não** diz

- Não define «quantos minutos por dia» como dose terapêutica.  
- Não hierarquiza escolas (vipassana, zen, Isha, MBSR…).  
- Não afirma que meditar = tomar THC.  
- Não valida retiro comercial algum — só indexa o estudo mencionado na aula.

## Tabela-prática (educacional)

| Prática | Sinal citado na grade | Leitura BudGanja |
|---------|----------------------|------------------|
| Meditação / mindfulness | ↑ AEA · 2-AG · BDNF (estudos/revisão) | Via endógena — exige constância, não milagre de um dia |
| Yoga (incl. retiro intensivo) | Mesmo eixo; estudo 4 dias | Contexto intensivo ≠ rotina de 10 min |
| Exercício (~30 min) | ↑ AEA (corrida/bike) | Irmão metabólico da PIC |
| Massagem / eletroacupuntura | Bloco PIC paralelo | Outra porta do mesmo mapa |
| Dieta / peso | Equilíbrio hiper × hipo SEC | Sem «suplemento milagroso» nesta ficha |

## Rede BudGanja (obrigatória)

| Camada | Fichas |
|--------|--------|
| Formação | [Eliana Rodrigues](${L.eliana}) · [Curso UNIFESP](${L.curso}) · [Rascunhos XIV](${L.xiv}) · [MovReCam](${L.movrecam}) |
| Neuro / divulgação | [Sidarta Ribeiro](${L.sidarta}) · [CANABinALL](${L.canabinall}) |
| Glossário técnico | [Sistema endocanabinoide](${L.sec}) · [Endocanabinoidoma](${L.eCBome}) · [Endocanabinoide](${L.endo}) · [Anandamida](${L.aea}) · [2-AG](${L.doisAg}) · [BDNF](${L.bdnf}) · [Canabimético](${L.canabimetico}) |
| Práticas | [Meditação](${L.meditacao}) · [Mindfulness](${L.mindfulness}) · [Yoga](${L.yoga}) · [PIC](${L.pic}) · [Modulação endógena](${L.modEndo}) · [Autonomia endógena](${L.autonomia}) |
| Experiência / emoção | [Palavra emoção](${L.emocao}) · [Diário / vida](${L.vida}) |
| Cobertura | [Guia palavras — cobertura](${L.cobertura}) |

## Contrastes que o leitor deve manter vivos

| Não confundir | Com |
|---------------|-----|
| Meditação como modulador endógeno | Prescrição de cannabis / óleo |
| Subida transitória de AEA no sangue | Diagnóstico ou cura de doença |
| Estudo observacional de retiro | Ensaio clínico randomizado universal |
| Endocanabinoidoma (rede ampla) | Só receptores CB1/CB2 |
| Autonomia de estilo de vida | Abandono de tratamento médico |

## Limites desta ficha

- Não ensina técnica de meditação nem recomenda escola.  
- Não interpreta exames laboratoriais de endocanabinoides.  
- Não substitui avaliação de ansiedade/depressão por profissional.  
- Transcrições XIV podem ter erros de OCR — cruzar com a aula em vídeo no hub MovReCam quando possível.  
- Evidência em humanos sobre meditação × eCB ainda é **emergente e heterogénea**.

## Como o laboratório sugere ler o tema

1. Começar pelo conceito: [SEC](${L.sec}) → [endocanabinoidoma](${L.eCBome}).  
2. Ouvir / ler a sequência XIV: Paulo (sistema) → Eliana (modulação exógena) → Eliana (estilo de vida + PIC).  
3. Colocar a meditação na prateleira **endógena**, ao lado de sono, stress, movimento e vínculo — não no lugar do fitocanabinoide.  
4. Se houver sofrimento clínico, **médico primeiro**; a PIC é complemento de literacia, não atalho.  
5. Registar a própria prática no [diário](${L.vida}) se quiser observação pessoal — sem transformar anedota em paper.

## Status

**Aprovado — primeira inspeção-guia sobre meditação × modulação do endocanabinoidoma.** Indexa o eixo de autonomia endógena das aulas XIV (Eliana Rodrigues) e abre ficha profunda onde o Guia técnico ainda apontava só para o livro-rascunho.

[▶ Eliana Rodrigues](${L.eliana}) · [▶ Rascunhos XIV](${L.xiv}) · [▶ Curso UNIFESP](${L.curso}) · [▶ Sidarta](${L.sidarta}) · [▶ Endocanabinoidoma](${L.eCBome}) · [▶ Anandamida](${L.aea}) · [▶ Hub Palavras](${L.hub})
`;

  const contentEn = `## Scope

BudGanja **guide inspection** on modulating the **endocannabinoidome from within** — with focus on **meditation / mindfulness / yoga** as practices that UNIFESP XIV lectures link to measurable endocannabinoid changes.

> **Not a clinical protocol.** Not a substitute for medical care. Indexed studies are mostly observational. Indexing ≠ endorsing a school or “dose” of meditation.

## Core thesis

The endocannabinoidome is not modulated only by phytocannabinoids. XIV describes an **endogenous autonomy** axis — lifestyle + integrative practices — where meditation, yoga and mindfulness can **raise anandamide / 2-AG** (and BDNF) in contexts of system hypoactivity.

## Modulation layers (XIV map)

| Layer | Examples |
|-------|----------|
| Phytocannabinoids | Cannabis / products |
| Cannabimimetics | Other plants |
| Lifestyle | Diet · weight · exercise (~30 min → ↑ AEA) |
| Integrative practices | **Meditation · yoga · mindfulness** · massage · electroacupuncture |

## Evidence note (as taught)

A 2020 prospective observational pilot (~323 adults, 4-day advanced yoga/meditation retreat) associated practice with higher AEA, 2-AG and BDNF and improved mental-health scores for about a month — **association, not universal clinical proof**.

## Status

**Approved — first guide sheet on meditation × endocannabinoidome modulation**, anchored in Eliana Rodrigues’ XIV lifestyle/PIC lecture.
`;

  const contentEs = `## Alcance

Inspección-guía BudGanja sobre modular el **endocannabinoidoma «desde dentro»** — con foco en **meditación / mindfulness / yoga** como prácticas que las clases XIV (UNIFESP) vinculan a cambios mensurables de endocannabinoides.

> **No es protocolo clínico.** No sustituye atención médica. Los estudios indexados son sobre todo observacionales. Indexar ≠ respaldar una escuela ni una «dosis» de meditación.

## Tesis central

El endocannabinoidoma no se modulariza solo con fitocannabinoides. El XIV describe un eje de **autonomía endógena** — estilo de vida + prácticas integrativas — donde meditación, yoga y mindfulness pueden **elevar anandamida / 2-AG** (y BDNF) en contextos de hipoactividad del sistema.

## Capas de modulación (mapa XIV)

| Capa | Ejemplos |
|------|----------|
| Fitocannabinoides | Cannabis / productos |
| Cannabimiméticos | Otras plantas |
| Estilo de vida | Dieta · peso · ejercicio (~30 min → ↑ AEA) |
| PIC | **Meditación · yoga · mindfulness** · masaje · electroacupuntura |

## Nota de evidencia (como se enseña)

Un piloto observacional prospectivo de 2020 (~323 adultos, retiro de 4 días) asoció la práctica con mayor AEA, 2-AG y BDNF y mejoría en escalas de salud mental durante ~1 mes — **asociación, no prueba clínica universal**.

## Estado

**Aprobado — primera ficha-guía sobre meditación × modulación del endocannabinoidoma**, anclada en la clase XIV de Eliana Rodrigues (estilo de vida / PIC).
`;

  return { body, contentEn, contentEs };
}

function buildGuiaMeditacaoEndocanabinoidomaPost() {
  const { body, contentEn, contentEs } = buildGuiaMeditacaoEndocanabinoidomaBodies();
  return palavraPost({
    title: 'Inspeção: Guia meditação — modular o endocanabinoidoma (via endógena)',
    titleEn: 'Inspection: Meditation guide — modulating the endocannabinoidome (endogenous path)',
    titleEs: 'Inspección: Guía meditación — modular el endocannabinoidoma (vía endógena)',
    excerpt:
      'Como a meditação, o yoga e o mindfulness entram no mapa XIV de modulação endógena do endocanabinoidoma (AEA/2-AG/BDNF). Elo Eliana Rodrigues · SEC. Não é protocolo clínico.',
    excerptEn:
      'How meditation, yoga and mindfulness enter the XIV map of endogenous endocannabinoidome modulation (AEA/2-AG/BDNF). Link: Eliana Rodrigues · ECS. Not a clinical protocol.',
    excerptEs:
      'Cómo la meditación, el yoga y el mindfulness entran en el mapa XIV de modulación endógena del endocannabinoidoma (AEA/2-AG/BDNF). Vínculo: Eliana Rodrigues · SEC. No es protocolo clínico.',
    slug: 'inspecao-guia-meditacao-endocanabinoidoma',
    date: '2026-08-02T12:00:00.000Z',
    seriesOrder: 42,
    seriesLabel: 'Guia · meditação · endocanabinoidoma',
    sourceUrl: '/guia/palavras.html?group=tecnico',
    body,
    contentEn,
    contentEs
  });
}

const POST_HREF = '/posts/post-inspecao-guia-meditacao-endocanabinoidoma.html';

const GUIA_MEDITACAO_ENDOCANABINOIDOMA_ITEMS = [
  {
    id: 'meditacao',
    word: 'Meditação',
    simple:
      'Prática de atenção / recolhimento citada na grade XIV como via endógena para modular o endocanabinoidoma (ex. subida de anandamida/2-AG em estudos observacionais).',
    simpleEn:
      'Attention / stillness practice cited in XIV as an endogenous way to modulate the endocannabinoidome (e.g. rises in anandamide/2-AG in observational studies).',
    simpleEs:
      'Práctica de atención / recogimiento citada en el XIV como vía endógena para modular el endocannabinoidoma (p. ej. subida de anandamida/2-AG en estudios observacionales).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'mindfulness',
    word: 'Mindfulness',
    simple:
      'Atenção plena — no bloco XIV de PIC junto com meditação e yoga, associada a efeitos canabiméticos / regulação do SEC.',
    simpleEn:
      'Present-moment attention — in the XIV integrative-practices block with meditation and yoga, linked to cannabimimetic effects / ECS regulation.',
    simpleEs:
      'Atención plena — en el bloque XIV de PIC junto con meditación y yoga, asociada a efectos cannabimiméticos / regulación del SEC.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'yoga',
    word: 'Yoga',
    simple:
      'Prática corpo-mente no bloco XIV de PIC endógenas; retiros intensivos (ex. 4 dias) aparecem em estudos observacionais com ↑ AEA, 2-AG e BDNF.',
    simpleEn:
      'Body-mind practice in the XIV endogenous PIC block; intensive retreats (e.g. 4 days) appear in observational studies with ↑ AEA, 2-AG and BDNF.',
    simpleEs:
      'Práctica cuerpo-mente en el bloque XIV de PIC endógenas; retiros intensivos (p. ej. 4 días) aparecen en estudios observacionales con ↑ AEA, 2-AG y BDNF.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'pic',
    word: 'PIC',
    simple:
      'Práticas Integrativas e Complementares — na grade XIV: meditação, yoga, mindfulness, massagem, eletroacupuntura como vias de modulação endógena do endocanabinoidoma.',
    simpleEn:
      'Integrative and complementary practices — in XIV: meditation, yoga, mindfulness, massage, electroacupuncture as endogenous modulation paths of the endocannabinoidome.',
    simpleEs:
      'Prácticas integrativas y complementarias — en el XIV: meditación, yoga, mindfulness, masaje, electroacupuntura como vías de modulación endógena del endocannabinoidoma.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'eletroacupuntura',
    word: 'Eletroacupuntura',
    simple:
      'PIC citada na aula XIV no mesmo bloco da meditação — associada a efeitos canabiméticos / regulação do SEC em revisões indexadas (não é protocolo clínico).',
    simpleEn:
      'Integrative practice cited in XIV beside meditation — linked to cannabimimetic / ECS-regulation effects in indexed reviews (not a clinical protocol).',
    simpleEs:
      'PIC citada en la clase XIV junto a la meditación — asociada a efectos cannabimiméticos / regulación del SEC en revisiones indexadas (no es protocolo clínico).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'sistema-endocanabinoide',
    word: 'Sistema endocanabinoide',
    simple:
      'Conjunto clássico de receptores (CB1/CB2), endocanabinoides e enzimas que ajuda a manter o equilíbrio do organismo — núcleo do mapa de modulação (meditação, estilo de vida, cannabis).',
    simpleEn:
      'Classic set of receptors (CB1/CB2), endocannabinoids and enzymes that helps keep the body in balance — core of the modulation map (meditation, lifestyle, cannabis).',
    simpleEs:
      'Conjunto clásico de receptores (CB1/CB2), endocannabinoides y enzimas que ayuda a mantener el equilibrio — núcleo del mapa de modulación (meditación, estilo de vida, cannabis).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'endocanabinoidoma',
    word: 'Endocanabinoidoma',
    simple:
      'Ampliação do sistema endocanabinoide: rede integrada de mediadores, receptores, enzimas e vias — objecto da modulação endógena (meditação/PIC) e exógena (cannabis/canabiméticos).',
    simpleEn:
      'Wider view of the endocannabinoid system: integrated network of mediators, receptors, enzymes and pathways — target of endogenous (meditation/PIC) and exogenous (cannabis/cannabimimetics) modulation.',
    simpleEs:
      'Ampliación del sistema endocannabinoide: red integrada de mediadores, receptores, enzimas y vías — objeto de la modulación endógena (meditación/PIC) y exógena (cannabis/cannabimiméticos).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'endocanabinoide',
    word: 'Endocanabinoide',
    simple:
      'Mensageiro que o próprio corpo produz (ex. anandamida, 2-AG) e que age nos receptores canabinoides — pode subir com exercício e, em estudos, com meditação.',
    simpleEn:
      'Messenger the body itself makes (e.g. anandamide, 2-AG) that acts on cannabinoid receptors — may rise with exercise and, in studies, with meditation.',
    simpleEs:
      'Mensajero que el propio cuerpo produce (p. ej. anandamida, 2-AG) y actúa en receptores cannabinoides — puede subir con ejercicio y, en estudios, con meditación.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'anandamida',
    word: 'Anandamida',
    simple:
      'Endocanabinoide (AEA) associado a efeitos «tipo THC» nos receptores — biomarcador citado na aula XIV quando se fala de meditação, exercício e equilíbrio do SEC.',
    simpleEn:
      'Endocannabinoid (AEA) linked to THC-like effects at receptors — biomarker cited in XIV when discussing meditation, exercise and ECS balance.',
    simpleEs:
      'Endocannabinoide (AEA) ligado a efectos «tipo THC» en receptores — biomarcador citado en el XIV al hablar de meditación, ejercicio y equilibrio del SEC.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'aea',
    word: 'AEA',
    simple:
      'Sigla de anandamida (N-araquidonoiletanolamida) — endocanabinoide cujo aumento aparece em estudos de exercício e, observacionalmente, de meditação/yoga.',
    simpleEn:
      'Abbreviation for anandamide (N-arachidonoylethanolamide) — endocannabinoid whose rise appears in exercise studies and, observationally, meditation/yoga.',
    simpleEs:
      'Sigla de anandamida (N-araquidonoiletanolamida) — endocannabinoide cuyo aumento aparece en estudios de ejercicio y, observacionalmente, de meditación/yoga.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'dois-ag',
    word: '2-AG',
    simple:
      '2-Araquidonoilglicerol — endocanabinoide central; na grade XIV sobe junto com anandamida/BDNF em contextos de meditação, yoga e exercício (estudos observacionais).',
    simpleEn:
      '2-Arachidonoylglycerol — central endocannabinoid; in XIV it rises with anandamide/BDNF in meditation, yoga and exercise contexts (observational studies).',
    simpleEs:
      '2-Araquidonilglicerol — endocannabinoide central; en el XIV sube junto con anandamida/BDNF en contextos de meditación, yoga y ejercicio (estudios observacionales).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'bdnf',
    word: 'BDNF',
    simple:
      'Factor neurotrófico derivado do cérebro — biomarcador citado no estudo-piloto de retiro (meditação/yoga) junto com ↑ AEA e 2-AG; literacia XIV, não diagnóstico.',
    simpleEn:
      'Brain-derived neurotrophic factor — biomarker cited in the retreat pilot (meditation/yoga) with ↑ AEA and 2-AG; XIV literacy, not a diagnosis.',
    simpleEs:
      'Factor neurotrófico derivado del cerebro — biomarcador citado en el piloto de retiro (meditación/yoga) junto con ↑ AEA y 2-AG; literacia XIV, no diagnóstico.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'canabimetico',
    word: 'Canabimético',
    simple:
      'Efeito ou molécula que imita / potencia a sinalização canabinoide sem ser necessariamente um fitocanabinoide clássico — na aula XIV, também associado a certas PIC (meditação, massagem…).',
    simpleEn:
      'Effect or molecule that mimics / boosts cannabinoid signalling without necessarily being a classic phytocannabinoid — in XIV also linked to some PIC (meditation, massage…).',
    simpleEs:
      'Efecto o molécula que imita / potencia la señalización cannabinoide sin ser necesariamente un fitocannabinoide clásico — en el XIV también asociado a ciertas PIC (meditación, masaje…).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'fitocanabinoide',
    word: 'Fitocanabinoide',
    simple:
      'Canabinoide de planta (sobretudo cannabis) — na grade XIV é a camada de modulação exógena, distinta da via endógena (meditação, estilo de vida, PIC).',
    simpleEn:
      'Plant cannabinoid (especially cannabis) — in XIV the exogenous modulation layer, distinct from the endogenous path (meditation, lifestyle, PIC).',
    simpleEs:
      'Cannabinoide de planta (sobre todo cannabis) — en el XIV es la capa de modulación exógena, distinta de la vía endógena (meditación, estilo de vida, PIC).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'modulacao-endogena',
    word: 'Modulação endógena',
    simple:
      'Caminho XIV em que o próprio organismo regula o endocanabinoidoma — estilo de vida + PIC (meditação, yoga, mindfulness…), sem ingestão de canabinoide.',
    simpleEn:
      'XIV path where the body itself regulates the endocannabinoidome — lifestyle + PIC (meditation, yoga, mindfulness…), without ingesting a cannabinoid.',
    simpleEs:
      'Camino XIV en el que el propio organismo regula el endocannabinoidoma — estilo de vida + PIC (meditación, yoga, mindfulness…), sin ingestión de cannabinoide.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'modulacao-exogena',
    word: 'Modulação exógena',
    simple:
      'Caminho XIV de intervenção externa — cannabis, canabiméticos, isolados/sintéticos — distinto da autonomia endógena (hábitos e PIC).',
    simpleEn:
      'XIV path of external intervention — cannabis, cannabimimetics, isolates/synthetics — distinct from endogenous autonomy (habits and PIC).',
    simpleEs:
      'Camino XIV de intervención externa — cannabis, cannabimiméticos, aislados/sintéticos — distinto de la autonomía endógena (hábitos y PIC).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'autonomia-endogena',
    word: 'Autonomia endógena',
    simple:
      'Ideia-chave da aula de estilo de vida (Eliana): o corpo pode modular o eCBome com hábitos e PIC — meditação entra nesta prateleira, não no lugar do óleo.',
    simpleEn:
      'Key idea from the lifestyle lecture (Eliana): the body can modulate the eCBome with habits and PIC — meditation belongs on this shelf, not in place of oil.',
    simpleEs:
      'Idea clave de la clase de estilo de vida (Eliana): el cuerpo puede modular el eCBome con hábitos y PIC — la meditación entra en este estante, no en lugar del aceite.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'hipoatividade-sec',
    word: 'Hipoatividade do SEC',
    simple:
      'Estado de baixa produção ou baixa expressão de receptores do sistema endocanabinoide — contexto em que a grade XIV cita meditação/yoga/mindfulness como estratégias de restabelecimento.',
    simpleEn:
      'State of low production or low receptor expression in the endocannabinoid system — context where XIV cites meditation/yoga/mindfulness as restoration strategies.',
    simpleEs:
      'Estado de baja producción o baja expresión de receptores del sistema endocannabinoide — contexto en el que el XIV cita meditación/yoga/mindfulness como estrategias de restablecimiento.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'estilo-de-vida',
    word: 'Estilo de vida',
    simple:
      'Camada XIV de modulação endógena quotidiana — dieta, peso, exercício (~30 min → ↑ AEA) — irmã metabólica da PIC (meditação/yoga).',
    simpleEn:
      'XIV layer of everyday endogenous modulation — diet, weight, exercise (~30 min → ↑ AEA) — metabolic sibling of PIC (meditation/yoga).',
    simpleEs:
      'Capa XIV de modulación endógena cotidiana — dieta, peso, ejercicio (~30 min → ↑ AEA) — hermana metabólica de la PIC (meditación/yoga).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'massagem',
    word: 'Massagem',
    simple:
      'PIC no mesmo bloco XIV da meditação e da eletroacupuntura — citada em revisões com efeitos canabiméticos / regulação do SEC (literacia, não protocolo).',
    simpleEn:
      'PIC in the same XIV block as meditation and electroacupuncture — cited in reviews with cannabimimetic / ECS-regulation effects (literacy, not a protocol).',
    simpleEs:
      'PIC en el mismo bloque XIV que meditación y electroacupuntura — citada en revisiones con efectos cannabimiméticos / regulación del SEC (literacia, no protocolo).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'exercicio',
    word: 'Exercício',
    simple:
      'Camada de estilo de vida na grade XIV — ~30 min de corrida/bike associados a ↑ AEA; irmão metabólico da PIC (meditação/yoga).',
    simpleEn:
      'Lifestyle layer in XIV — ~30 min running/cycling linked to ↑ AEA; metabolic sibling of PIC (meditation/yoga).',
    simpleEs:
      'Capa de estilo de vida en el XIV — ~30 min de carrera/bici asociados a ↑ AEA; hermano metabólico de la PIC (meditación/yoga).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'dieta',
    word: 'Dieta',
    simple:
      'Eixo de estilo de vida na aula XIV de modulação endógena — equilíbrio hiper × hipo do SEC, junto com peso e exercício; sem «suplemento milagroso» nesta ficha.',
    simpleEn:
      'Lifestyle axis in the XIV endogenous-modulation lecture — hyper × hypo ECS balance, with weight and exercise; no “miracle supplement” on this sheet.',
    simpleEs:
      'Eje de estilo de vida en la clase XIV de modulación endógena — equilibrio hiper × hipo del SEC, con peso y ejercicio; sin «suplemento milagroso» en esta ficha.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'hiperatividade-sec',
    word: 'Hiperatividade do SEC',
    simple:
      'Polo oposto à hipoatividade — excesso de sinalização do sistema endocanabinoide; a grade XIV fala em equilibrar hiper × hipo via estilo de vida e PIC.',
    simpleEn:
      'Opposite pole to hypoactivity — excess endocannabinoid signalling; XIV speaks of balancing hyper × hypo via lifestyle and PIC.',
    simpleEs:
      'Polo opuesto a la hipoactividad — exceso de señalización del sistema endocannabinoide; el XIV habla de equilibrar hiper × hipo vía estilo de vida y PIC.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'ecbome',
    word: 'eCBome',
    simple:
      'Abreviatura de endocanabinoidoma — rede ampliada do sistema endocanabinoide; objecto da modulação endógena (meditação/PIC) e exógena na grade XIV.',
    simpleEn:
      'Abbreviation for endocannabinoidome — expanded ECS network; target of endogenous (meditation/PIC) and exogenous modulation in XIV.',
    simpleEs:
      'Abreviatura de endocannabinoidoma — red ampliada del sistema endocannabinoide; objeto de la modulación endógena (meditación/PIC) y exógena en el XIV.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'sec',
    word: 'SEC',
    simple:
      'Sigla de sistema endocanabinoide (CB1/CB2 + endocanabinoides + enzimas) — núcleo clássico antes da ampliação para endocanabinoidoma / eCBome.',
    simpleEn:
      'Abbreviation for endocannabinoid system (CB1/CB2 + endocannabinoids + enzymes) — classic core before the wider endocannabinoidome / eCBome.',
    simpleEs:
      'Sigla de sistema endocannabinoide (CB1/CB2 + endocannabinoides + enzimas) — núcleo clásico antes de la ampliación a endocannabinoidoma / eCBome.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'canabinoide',
    word: 'Canabinoide',
    simple:
      'Família de mensageiros que ligam receptores canabinoides — inclui endógenos (AEA, 2-AG), fito (cannabis) e sintéticos/isolados; a meditação actua na via endógena.',
    simpleEn:
      'Family of messengers that bind cannabinoid receptors — includes endogenous (AEA, 2-AG), phyto (cannabis) and synthetic/isolates; meditation acts on the endogenous path.',
    simpleEs:
      'Familia de mensajeros que unen receptores cannabinoides — incluye endógenos (AEA, 2-AG), fito (cannabis) y sintéticos/aislados; la meditación actúa en la vía endógena.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'sintetico',
    word: 'Sintético',
    simple:
      'Camada XIV de moléculas de laboratório (ex. linha Mechoulam / HU) — modulação exógena distinta da autonomia endógena (meditação, estilo de vida, PIC).',
    simpleEn:
      'XIV layer of laboratory molecules (e.g. Mechoulam / HU line) — exogenous modulation distinct from endogenous autonomy (meditation, lifestyle, PIC).',
    simpleEs:
      'Capa XIV de moléculas de laboratorio (p. ej. línea Mechoulam / HU) — modulación exógena distinta de la autonomía endógena (meditación, estilo de vida, PIC).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'isolado',
    word: 'Isolado',
    simple:
      'Princípio activo purificado (ex. CBD ~98%) — na grade XIV entra na modulação exógena (sintéticos/isolados), contraste com a via endógena da meditação/PIC.',
    simpleEn:
      'Purified active principle (e.g. CBD ~98%) — in XIV it belongs to exogenous modulation (synthetics/isolates), contrast with the endogenous meditation/PIC path.',
    simpleEs:
      'Principio activo purificado (p. ej. CBD ~98%) — en el XIV entra en la modulación exógena (sintéticos/aislados), contraste con la vía endógena de meditación/PIC.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'biomarcador',
    word: 'Biomarcador',
    simple:
      'Sinal mensurável citado na aula (AEA, 2-AG, BDNF) — no estudo-piloto de retiro indica associação com a prática; literacia XIV, não diagnóstico clínico.',
    simpleEn:
      'Measurable signal cited in the lecture (AEA, 2-AG, BDNF) — in the retreat pilot it marks association with practice; XIV literacy, not clinical diagnosis.',
    simpleEs:
      'Señal mensurable citada en la clase (AEA, 2-AG, BDNF) — en el piloto de retiro indica asociación con la práctica; literacia XIV, no diagnóstico clínico.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'estudo-observacional',
    word: 'Estudo observacional',
    simple:
      'Desenho do piloto 2020 (retiro 4 dias, n≈323): mostra associação (AEA/2-AG/BDNF ↑) — não prova causalidade clínica universal nem «dose» de meditação.',
    simpleEn:
      'Design of the 2020 pilot (4-day retreat, n≈323): shows association (AEA/2-AG/BDNF ↑) — not universal clinical causation nor a meditation “dose”.',
    simpleEs:
      'Diseño del piloto 2020 (retiro 4 días, n≈323): muestra asociación (AEA/2-AG/BDNF ↑) — no prueba causalidad clínica universal ni «dosis» de meditación.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'retiro',
    word: 'Retiro',
    simple:
      'Contexto intensivo de prática (ex. 4 dias Isha Yoga / Inner Engineering no estudo citado) — distinto da rotina diária de 10 min; indexar ≠ endossar escola comercial.',
    simpleEn:
      'Intensive practice context (e.g. 4-day Isha Yoga / Inner Engineering in the cited study) — distinct from a daily 10-min routine; indexing ≠ endorsing a commercial school.',
    simpleEs:
      'Contexto intensivo de práctica (p. ej. 4 días Isha Yoga / Inner Engineering en el estudio citado) — distinto de la rutina diaria de 10 min; indexar ≠ respaldar escuela comercial.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'mbsr',
    word: 'MBSR',
    simple:
      'Mindfulness-Based Stress Reduction — uma das escolas citadas na ficha só para dizer que o guia XIV **não** hierarquiza vipassana, zen, Isha ou MBSR.',
    simpleEn:
      'Mindfulness-Based Stress Reduction — one of the schools named only to say XIV does **not** rank vipassana, zen, Isha or MBSR.',
    simpleEs:
      'Mindfulness-Based Stress Reduction — una de las escuelas citadas solo para decir que el XIV **no** jerarquiza vipassana, zen, Isha o MBSR.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'via-endogena',
    word: 'Via endógena',
    simple:
      'Caminho sem ingestão de canabinoide — o corpo altera disponibilidade de AEA/2-AG com hábitos e PIC (meditação, yoga, exercício…).',
    simpleEn:
      'Path without ingesting a cannabinoid — the body changes AEA/2-AG availability with habits and PIC (meditation, yoga, exercise…).',
    simpleEs:
      'Camino sin ingestión de cannabinoide — el cuerpo altera la disponibilidad de AEA/2-AG con hábitos y PIC (meditación, yoga, ejercicio…).',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'via-exogena',
    word: 'Via exógena',
    simple:
      'Caminho com intervenção externa — cannabis, canabiméticos, isolados/sintéticos — distinto da via endógena da meditação no mapa XIV.',
    simpleEn:
      'Path with external intervention — cannabis, cannabimimetics, isolates/synthetics — distinct from meditation’s endogenous path on the XIV map.',
    simpleEs:
      'Camino con intervención externa — cannabis, cannabimiméticos, aislados/sintéticos — distinto de la vía endógena de la meditación en el mapa XIV.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'praticas-integrativas',
    word: 'Práticas integrativas',
    simple:
      'Forma por extenso de PIC — meditação, yoga, mindfulness, massagem, eletroacupuntura como camadas de modulação endógena do endocanabinoidoma na grade XIV.',
    simpleEn:
      'Full form of PIC — meditation, yoga, mindfulness, massage, electroacupuncture as endogenous modulation layers of the endocannabinoidome in XIV.',
    simpleEs:
      'Forma extendida de PIC — meditación, yoga, mindfulness, masaje, electroacupuntura como capas de modulación endógena del endocannabinoidoma en el XIV.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  }
];

module.exports = {
  buildGuiaMeditacaoEndocanabinoidomaPost,
  buildGuiaMeditacaoEndocanabinoidomaBodies,
  GUIA_MEDITACAO_ENDOCANABINOIDOMA_ITEMS
};
