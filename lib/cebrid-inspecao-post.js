'use strict';

/**
 * Inspeção: CEBRID — centro e cursos de medicina canabinoide (formacao-academica).
 * Instituição fundada por Carlini; oferta formativa complementar ao SIEX/MovReCam.
 */

function formacaoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/background-hero.svg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'formacao-academica',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Extensão académica',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  return post;
}

function buildCebridBodies(inspected) {
  const cover = '/imagens/inspecoes/cebrid-cover.jpg';
  const portrait = '/imagens/inspecoes/cebrid-portrait.jpg';
  const coverNote =
    'Retrato institucional do Prof. Emérito Elisaldo Carlini, fundador do CEBRID. Imagem: [CEBRID — equipe](https://www.cebrid.com.br/equipe/).';

  const body = `## Escopo

Inspeção editorial e documental do **CEBRID** — **Centro Brasileiro de Informações sobre Drogas Psicotrópicas** (UNIFESP / Instituto Professor Elisaldo Carlini). O recorte não é inventário de todos os levantamentos nacionais: é registar, com fontes públicas e com o **mérito institucional devido**, a missão do centro, a continuidade após [Carlini](/posts/post-inspecao-elisaldo-carlini.html), a liderança de [Solange Nappo](/posts/post-inspecao-solange-nappo.html) e a oferta formativa própria (ex. **Medicina Canabinoide**), complementar ao [curso de extensão SIEX/MovReCam](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base no [site oficial](https://www.cebrid.com.br/), página do [curso Medicina Canabinoide](https://www.cebrid.com.br/curso-medicina-canabinoide/) e cruzamento com inspeções BudGanja. **Sem afiliação** com a UNIFESP, o CEBRID ou a FapUnifesp. Todo o mérito da pesquisa, dos levantamentos e dos cursos pertence ao CEBRID, às suas coordenadoras e às equipas científicas.

![CEBRID — Prof. Elisaldo Carlini](${portrait})

*${coverNote}*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **CEBRID** — Centro Brasileiro de Informações sobre Drogas Psicotrópicas |
| Instituição | **UNIFESP** · Instituto Professor Elisaldo Carlini |
| Fundação / legado | Criado e dirigido ~35 anos pelo Prof. **Elisaldo Carlini** |
| Coordenação actual (pública) | Profa. Dra. **Solange Nappo** |
| Missão pública | Informação, pesquisa e formação sobre drogas psicotrópicas (álcool e outras) |
| Formação destacada | Curso **Medicina Canabinoide** (chancela CEBRID · gestão FapUnifesp / plataforma UNV) |
| Site | [cebrid.com.br](https://www.cebrid.com.br/) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

Na fila editorial, o CEBRID constava como hub institucional: **casa científica** que antecede e sustenta o ciclo MovReCam/SIEX. Sem ficha própria, o laboratório só nomeava o centro via Carlini e Nappo. Esta inspeção fecha o nó: **instituição + cursos**, sem duplicar biografias.

## Hipóteses e método

- **H1:** o CEBRID é infraestrutura de conhecimento (informação gratuita, levantamentos, simpósios) — não apenas «marca» de um curso pago.
- **H2:** Medicina Canabinoide (EaD, profissionais de saúde) **complementa** o SIEX gratuito/MovReCam; públicos e modelos diferem (investimento vs. extensão aberta).
- **H3:** a cadeia Carlini → Nappo → Eliana (coord. técnico-científica do curso CEBRID) liga CEBRID ao ecossistema já inspecionado ([CANABinALL](/posts/post-inspecao-canal-canabinall.html)).
- **Método:** (1) missão e legado; (2) eixos formativos públicos; (3) contraste com SIEX; (4) cruzamentos BudGanja; (5) status.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| Anos Carlini | Fundação e ~35 anos de direção científica; levantamentos nacionais e informação pública sobre drogas. |
| 2010 | Simpósio internacional «Por uma Agência Brasileira da Cannabis Medicinal» (arquivo CEBRID). |
| 2020 | Falecimento de Carlini — ruptura geracional. |
| Pós-2020 | Continuidade sob **Solange Nappo**; site activo com publicações e cursos. |
| 2023–2024 | Edição documentada do curso **Medicina Canabinoide** (EaD, ~5 meses, chancela CEBRID). |
| Actual | CEBRID como referência UNIFESP para informação e formação em psicotrópicos / cannabis medicinal. |

## Achados (mérito devido)

1. **Instituição, não só biografia** — CEBRID é o contentor que Carlini construiu e Nappo mantém: pesquisas, boletins, cursos.
2. **Dois modelos formativos no mesmo ecossistema** — SIEX/MovReCam (gratuito, periferia, YouTube) vs. Medicina Canabinoide CEBRID (pago, graduados da saúde, plataforma UNV). Ambos legítimos; **não são o mesmo produto**.
3. **Elo científico com Eliana Rodrigues** — no curso CEBRID, Eliana figura como coordenadora técnico-científica (etnobotânica); Nappo como vice-coordenação — ponte com CEE/CANABinALL.
4. **Transparência de investimento** — fontes públicas do curso citam investimento (ex. R$ 1.700 na edição documentada) e critérios de certificado (ex. 75% do conteúdo). Confirmar sempre na página oficial — valores e prazos mudam.
5. **Limites** — esta ficha não avalia qualidade clínica módulo a módulo nem garante edição aberta; recomenda o site CEBRID como fonte primária.

## Formação CEBRID vs. extensão SIEX

| Critério | CEBRID · Medicina Canabinoide | UNIFESP SIEX · MovReCam |
|----------|-------------------------------|-------------------------|
| Chancela | CEBRID / FapUnifesp | UNIFESP PROEC · SIEX 30063 |
| Público (tipicamente) | Graduados da área da saúde | Aberto (18+) · periferia + escala nacional |
| Custo | Pago (edição documentada) | Gratuito |
| Transmissão | Plataforma UNV (EaD) | YouTube MovReCam |
| Inspeção BudGanja | Esta ficha | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |

## Complementaridade com o Inspetor BudGanja

| Tema CEBRID | Recurso BudGanja |
|-------------|------------------|
| Fundador | [Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| Coordenação actual | [Solange Nappo](/posts/post-inspecao-solange-nappo.html) |
| Extensão gratuita / periferia | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) |
| Divulgação CEE / etnobotânica | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) |
| Hub formativo | [Biblioteca UNIFESP](/biblioteca/unifesp/) |

## Créditos e referências

**Todo o mérito do CEBRID, dos levantamentos e dos cursos citados pertence ao centro, à UNIFESP e às equipas científicas.** Esta inspeção apenas documenta e recomenda — sem apropriação.

Fontes consultadas (não exaustivo):

- [CEBRID — site oficial](https://www.cebrid.com.br/)
- [CEBRID — Medicina Canabinoide](https://www.cebrid.com.br/curso-medicina-canabinoide/)
- [CEBRID — equipe](https://www.cebrid.com.br/equipe/)
- Cruzamentos: [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [Nappo](/posts/post-inspecao-solange-nappo.html) · [Curso SIEX](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html)

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado como referência institucional de formação / informação** — o CEBRID é a casa científica que ancora Carlini, Nappo e a linha de medicina canabinoide na UNIFESP. Recomendado estudar em paralelo com o [curso SIEX](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html), sem confundir os dois formatos.

[CEBRID](https://www.cebrid.com.br/) · [Medicina Canabinoide](https://www.cebrid.com.br/curso-medicina-canabinoide/) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial and documentary inspection of **CEBRID** — the **Brazilian Center for Information on Psychotropic Drugs** (UNIFESP / Professor Elisaldo Carlini Institute). This sheet is not an inventory of every national survey: it records, from public sources and with due **institutional credit**, the center’s mission, continuity after [Carlini](/posts/post-inspecao-elisaldo-carlini.html), leadership by [Solange Nappo](/posts/post-inspecao-solange-nappo.html), and its own training offer (e.g. **Cannabinoid Medicine**), complementary to the [SIEX/MovReCam extension course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).

> **Methodological note:** independent audit by Inspector BudGanja based on the [official site](https://www.cebrid.com.br/), the [Cannabinoid Medicine course page](https://www.cebrid.com.br/curso-medicina-canabinoide/), and cross-checks with BudGanja inspections. **No affiliation** with UNIFESP, CEBRID, or FapUnifesp. All credit for research, surveys, and courses belongs to CEBRID, its coordinators, and scientific teams.

![CEBRID — Prof. Elisaldo Carlini](${portrait})

*Institutional portrait of Professor Emeritus Elisaldo Carlini, CEBRID founder. Image: [CEBRID — team](https://www.cebrid.com.br/equipe/).*

## Inspected subject

| Field | Value |
|-------|-------|
| Name | **CEBRID** — Brazilian Center for Information on Psychotropic Drugs |
| Institution | **UNIFESP** · Professor Elisaldo Carlini Institute |
| Foundation / legacy | Created and led ~35 years by Prof. **Elisaldo Carlini** |
| Current public coordination | Prof. Dr. **Solange Nappo** |
| Public mission | Information, research, and training on psychotropic drugs |
| Highlighted training | **Cannabinoid Medicine** course (CEBRID endorsement · FapUnifesp / UNV) |
| Site | [cebrid.com.br](https://www.cebrid.com.br/) |
| Inspection date | ${inspected} |

## Why this inspection exists

In the editorial queue, CEBRID was listed as an institutional hub: the **scientific house** that precedes and sustains the MovReCam/SIEX cycle. Without its own sheet, the lab only named the center via Carlini and Nappo. This inspection closes the node: **institution + courses**, without duplicating biographies.

## Hypotheses and method

- **H1:** CEBRID is knowledge infrastructure (free information, surveys, symposia) — not only a brand for a paid course.
- **H2:** Cannabinoid Medicine (distance learning, health graduates) **complements** free SIEX/MovReCam; audiences and models differ.
- **H3:** Carlini → Nappo → Eliana (scientific-technical coordination of the CEBRID course) links CEBRID to the inspected ecosystem ([CANABinALL](/posts/post-inspecao-canal-canabinall.html)).
- **Method:** (1) mission and legacy; (2) public training axes; (3) contrast with SIEX; (4) BudGanja cross-links; (5) status.

## Timeline (verifiable summary)

| Period | Milestone |
|--------|-----------|
| Carlini years | Foundation and ~35 years of scientific leadership; national surveys and public drug information. |
| 2010 | International symposium “Toward a Brazilian Medicinal Cannabis Agency” (CEBRID archive). |
| 2020 | Carlini’s death — generational break. |
| Post-2020 | Continuity under **Solange Nappo**; active site with publications and courses. |
| 2023–2024 | Documented **Cannabinoid Medicine** edition (distance, ~5 months, CEBRID endorsement). |
| Current | CEBRID as UNIFESP reference for psychotropic / medicinal-cannabis information and training. |

## Findings (credit due)

1. **Institution, not only biography** — CEBRID is the container Carlini built and Nappo maintains.
2. **Two training models** — free SIEX/MovReCam vs. paid CEBRID Cannabinoid Medicine; both legitimate, **not the same product**.
3. **Scientific link to Eliana Rodrigues** — scientific-technical coordination (ethnobotany) on the CEBRID course; bridge to CEE/CANABinALL.
4. **Fee transparency** — public pages cited investment (e.g. R$1,700 in the documented edition) and certificate rules (e.g. 75% of content). Always confirm on the official page.
5. **Limits** — this sheet does not grade modules clinically nor guarantee an open edition.

## CEBRID training vs. SIEX extension

| Criterion | CEBRID · Cannabinoid Medicine | UNIFESP SIEX · MovReCam |
|-----------|-------------------------------|-------------------------|
| Endorsement | CEBRID / FapUnifesp | UNIFESP PROEC · SIEX 30063 |
| Typical audience | Health-area graduates | Open (18+) · periphery + national scale |
| Cost | Paid (documented edition) | Free |
| Delivery | UNV platform | YouTube MovReCam |
| BudGanja inspection | This sheet | [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |

## Complementarity with Inspector BudGanja

| CEBRID theme | BudGanja resource |
|--------------|-------------------|
| Founder | [Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| Current coordination | [Solange Nappo](/posts/post-inspecao-solange-nappo.html) |
| Free extension / periphery | [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) |
| CEE / ethnobotany outreach | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) |
| Academic hub | [UNIFESP library](/biblioteca/unifesp/) |

## Credits and references

**All credit for CEBRID, surveys, and cited courses belongs to the center, UNIFESP, and scientific teams.** This inspection only documents and recommends — without appropriation.

Sources (non-exhaustive):

- [CEBRID — official site](https://www.cebrid.com.br/)
- [CEBRID — Cannabinoid Medicine](https://www.cebrid.com.br/curso-medicina-canabinoide/)
- [CEBRID — team](https://www.cebrid.com.br/equipe/)
- Cross-links: [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [Nappo](/posts/post-inspecao-solange-nappo.html) · [SIEX course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html)

**Inspection written by:** Inspector BudGanja (independent digital laboratory)

## Status

**Approved as an institutional training / information reference** — CEBRID anchors Carlini, Nappo, and cannabinoid-medicine training at UNIFESP. Study in parallel with the [SIEX course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) without confusing the two formats.

[CEBRID](https://www.cebrid.com.br/) · [Cannabinoid Medicine](https://www.cebrid.com.br/curso-medicina-canabinoide/) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [All inspections](/biblioteca/inspecoes/)`;

  const contentEs = `## Alcance

Inspección editorial y documental del **CEBRID** — **Centro Brasileño de Informaciones sobre Drogas Psicotrópicas** (UNIFESP / Instituto Profesor Elisaldo Carlini). El recorte no es un inventario de todas las encuestas nacionales: es registrar, con fuentes públicas y con el **mérito institucional debido**, la misión del centro, la continuidad tras [Carlini](/posts/post-inspecao-elisaldo-carlini.html), el liderazgo de [Solange Nappo](/posts/post-inspecao-solange-nappo.html) y la oferta formativa propia (p. ej. **Medicina cannabinóide**), complementaria al [curso de extensión SIEX/MovReCam](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).

> **Nota metodológica:** auditoría independiente del Inspector BudGanja basada en el [sitio oficial](https://www.cebrid.com.br/), la página del [curso Medicina cannabinóide](https://www.cebrid.com.br/curso-medicina-canabinoide/) y cruces con inspecciones BudGanja. **Sin afiliación** con la UNIFESP, el CEBRID o FapUnifesp. Todo el mérito de la investigación, las encuestas y los cursos pertenece al CEBRID, a sus coordinadoras y a los equipos científicos.

![CEBRID — Prof. Elisaldo Carlini](${portrait})

*Retrato institucional del Prof. Emérito Elisaldo Carlini, fundador del CEBRID. Imagen: [CEBRID — equipo](https://www.cebrid.com.br/equipe/).*

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **CEBRID** — Centro Brasileño de Informaciones sobre Drogas Psicotrópicas |
| Institución | **UNIFESP** · Instituto Profesor Elisaldo Carlini |
| Fundación / legado | Creado y dirigido ~35 años por el Prof. **Elisaldo Carlini** |
| Coordinación actual (pública) | Profa. Dra. **Solange Nappo** |
| Misión pública | Información, investigación y formación sobre drogas psicotrópicas |
| Formación destacada | Curso **Medicina cannabinóide** (chancela CEBRID · gestión FapUnifesp / UNV) |
| Sitio | [cebrid.com.br](https://www.cebrid.com.br/) |
| Fecha de la inspección | ${inspected} |

## Por qué existe esta inspección

En la cola editorial, el CEBRID figuraba como hub institucional: la **casa científica** que antecede y sostiene el ciclo MovReCam/SIEX. Sin ficha propia, el laboratorio solo nombraba el centro vía Carlini y Nappo. Esta inspección cierra el nodo: **institución + cursos**, sin duplicar biografías.

## Hipótesis y método

- **H1:** el CEBRID es infraestructura de conocimiento — no solo «marca» de un curso de pago.
- **H2:** Medicina cannabinóide (EaD, profesionales de salud) **complementa** el SIEX gratuito/MovReCam; públicos y modelos difieren.
- **H3:** Carlini → Nappo → Eliana (coord. técnico-científica del curso CEBRID) une CEBRID al ecosistema ya inspeccionado ([CANABinALL](/posts/post-inspecao-canal-canabinall.html)).
- **Método:** (1) misión y legado; (2) ejes formativos; (3) contraste con SIEX; (4) cruces BudGanja; (5) estatus.

## Cronología (síntesis verificable)

| Período | Hito |
|---------|------|
| Años Carlini | Fundación y ~35 años de dirección científica; encuestas nacionales e información pública. |
| 2010 | Simposio internacional «Por una Agencia Brasileña de la Cannabis Medicinal» (archivo CEBRID). |
| 2020 | Fallecimiento de Carlini — ruptura generacional. |
| Post-2020 | Continuidad bajo **Solange Nappo**; sitio activo con publicaciones y cursos. |
| 2023–2024 | Edición documentada del curso **Medicina cannabinóide** (EaD, ~5 meses, chancela CEBRID). |
| Actual | CEBRID como referencia UNIFESP para información y formación en psicotrópicos / cannabis medicinal. |

## Hallazgos (mérito debido)

1. **Institución, no solo biografía** — CEBRID es el contenedor que Carlini construyó y Nappo mantiene.
2. **Dos modelos formativos** — SIEX/MovReCam gratuito vs. Medicina cannabinóide CEBRID de pago; ambos legítimos, **no son el mismo producto**.
3. **Eslabón científico con Eliana Rodrigues** — coordinación técnico-científica (etnobotánica) en el curso CEBRID; puente con CEE/CANABinALL.
4. **Transparencia de inversión** — páginas públicas citaron inversión (p. ej. R$ 1.700 en la edición documentada) y criterios de certificado. Confirmar siempre en la página oficial.
5. **Límites** — esta ficha no evalúa módulos clínicos uno a uno ni garantiza edición abierta.

## Formación CEBRID vs. extensión SIEX

| Criterio | CEBRID · Medicina cannabinóide | UNIFESP SIEX · MovReCam |
|----------|--------------------------------|-------------------------|
| Chancela | CEBRID / FapUnifesp | UNIFESP PROEC · SIEX 30063 |
| Público (típicamente) | Graduados del área de la salud | Abierto (18+) · periferia + escala nacional |
| Costo | De pago (edición documentada) | Gratuito |
| Transmisión | Plataforma UNV | YouTube MovReCam |
| Inspección BudGanja | Esta ficha | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |

## Complementariedad con el Inspector BudGanja

| Tema CEBRID | Recurso BudGanja |
|-------------|------------------|
| Fundador | [Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| Coordinación actual | [Solange Nappo](/posts/post-inspecao-solange-nappo.html) |
| Extensión gratuita / periferia | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) |
| Divulgación CEE / etnobotánica | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) |
| Hub formativo | [Biblioteca UNIFESP](/biblioteca/unifesp/) |

## Créditos y referencias

**Todo el mérito del CEBRID, de las encuestas y de los cursos citados pertenece al centro, a la UNIFESP y a los equipos científicos.** Esta inspección solo documenta y recomienda — sin apropiación.

Fuentes (no exhaustivo):

- [CEBRID — sitio oficial](https://www.cebrid.com.br/)
- [CEBRID — Medicina cannabinóide](https://www.cebrid.com.br/curso-medicina-canabinoide/)
- [CEBRID — equipo](https://www.cebrid.com.br/equipe/)
- Cruces: [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [Nappo](/posts/post-inspecao-solange-nappo.html) · [Curso SIEX](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html)

**Inspección redactada por:** Inspector BudGanja (laboratorio digital independiente)

## Estado

**Aprobado como referencia institucional de formación / información** — el CEBRID ancla a Carlini, Nappo y la línea de medicina cannabinóide en la UNIFESP. Estudiar en paralelo con el [curso SIEX](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) sin confundir los dos formatos.

[CEBRID](https://www.cebrid.com.br/) · [Medicina cannabinóide](https://www.cebrid.com.br/curso-medicina-canabinoide/) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [Todas las inspecciones](/biblioteca/inspecoes/)`;

  return { body, contentEn, contentEs };
}

function buildCebridInspecaoPost() {
  const inspected = '2026-07-31';
  const { body, contentEn, contentEs } = buildCebridBodies(inspected);

  return formacaoPost({
    title: 'Inspeção: CEBRID — centro e medicina canabinoide',
    titleEn: 'Inspection: CEBRID — center and cannabinoid medicine',
    titleEs: 'Inspección: CEBRID — centro y medicina cannabinoide',
    excerpt:
      'Ficha institucional do CEBRID (UNIFESP): legado Carlini, continuidade Nappo e curso Medicina Canabinoide — complementar ao SIEX/MovReCam, sem confundir os dois formatos.',
    excerptEn:
      'Institutional sheet on CEBRID (UNIFESP): Carlini legacy, Nappo continuity, and Cannabinoid Medicine course — complementary to SIEX/MovReCam, without confusing the two formats.',
    excerptEs:
      'Ficha institucional del CEBRID (UNIFESP): legado Carlini, continuidad Nappo y curso Medicina cannabinoide — complementario al SIEX/MovReCam, sin confundir los dos formatos.',
    slug: 'inspecao-cebrid',
    date: inspected + 'T21:00:00.000Z',
    seriesOrder: 2,
    seriesLabel: 'CEBRID · formação',
    coverImage: '/imagens/inspecoes/cebrid-cover.jpg',
    sourceUrl: 'https://www.cebrid.com.br/',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCebridInspecaoPost,
  buildCebridBodies
};
