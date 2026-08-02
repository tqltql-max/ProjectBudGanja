'use strict';

/**
 * Inspeção: Gabrielle Dainezi — coordenação do curso UNIFESP (legado-pessoas).
 * Citada pela UNIFESP na coordenação do curso premiado; continua o fio Ticão–Carlini.
 */

function pessoaPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/background-hero.svg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'legado-pessoas',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Legado',
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

function buildGabrielleDaineziBodies(inspected) {
  const cover = '/imagens/inspecoes/gabrielle-dainezi-cover.jpg';
  const portrait = '/imagens/inspecoes/gabrielle-dainezi-portrait.jpg';
  const coverNote =
    'Gabrielle Dainezi recebendo o CannaPortugal Global Cannabis Awards 2025 (Lisboa). Imagem: [portal UNIFESP](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional) — foto Fernando Eliziário.';

  const body = `## Escopo

Inspeção editorial e documental do papel público de **Gabrielle Dainezi** — citada pela **UNIFESP** como uma das **coordenadoras** do curso de extensão «O Uso Terapêutico da Cannabis sativa L.» (parceria **MovReCam**), juntamente com [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) e [Solange Nappo](/posts/post-inspecao-solange-nappo.html). O objectivo é registar, com fontes institucionais e com o **mérito que lhe é devido**, a continuidade operativa do projecto nascido com [Ticão](/posts/post-inspecao-padre-ticao.html) e [Carlini](/posts/post-inspecao-elisaldo-carlini.html) — incluindo a representação pública na entrega do **CannaPortugal Global Cannabis Awards 2025**.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base no [portal UNIFESP](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional), ficha SIEX 30063 (vice-coordenação externa) e cruzamento com inspeções BudGanja. **Sem afiliação** com a UNIFESP, o MovReCam ou a organização do prémio. Todo o mérito da coordenação e da representação pública pertence a Gabrielle Dainezi e às instituições do curso.

![Gabrielle Dainezi](${portrait})

*${coverNote}*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Gabrielle Dainezi** |
| Papel público | Coordenação / vice-coordenação (externa) do curso UNIFESP · uso terapêutico da *Cannabis sativa* L. |
| Parceria | **MovReCam** · extensão UNIFESP (SIEX) |
| Coordenação conjunta (portal) | Com **Eliana Rodrigues** e **Solange Nappo** |
| Marco público | Representante na entrega do **CannaPortugal Global Cannabis Awards 2025** (Lisboa) |
| Ecossistema BudGanja | Continuidade do fio Ticão–Carlini na extensão premiada |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

Na fila editorial: **«citada pela UNIFESP na coordenação do curso premiado»**. Sem esta ficha, o trio de coordenação ficava incompleto — Eliana (RTC/CEE), Nappo (CEBRID) e Gabrielle (coordenação / representação do projecto de extensão). Omitir quem recebe o prémio em nome do curso seria falhar o método: **crédito a quem merece**.

## Hipóteses e método

- **H1:** Gabrielle opera como elo de **coordenação e representação** do curso junto ao MovReCam e à universidade — Continuação viva do projecto de periferia.
- **H2:** a declaração no portal UNIFESP («democratizar o acesso a informação de qualidade e derrubar as barreiras do preconceito») sintetiza a ética do curso pós-Ticão.
- **H3:** a ficha é deliberadamente **curta e documental** — fontes públicas sobre biografia académica completa são limitadas; o foco é o papel verificável no curso premiado.
- **Método:** (1) fontes UNIFESP/SIEX; (2) papel na coordenação e no prémio; (3) cruzamentos com legado; (4) limites honestos; (5) status.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| 2018 → | Curso de extensão UNIFESP/MovReCam em actividade; crescimento de escala nacional. |
| Edições seguintes | Gabrielle citada na coordenação / vice-coordenação externa (SIEX e comunicados). |
| Mai 2025 | Entrega do **CannaPortugal Global Cannabis Awards** em Lisboa — Gabrielle recebe o prémio em representação do curso (foto e citação no portal UNIFESP). |
| 2025–2026 | Continuação das edições (ex. XIV) com a mesma lógica de democratização do conhecimento. |

## Achados (mérito devido)

1. **Coordenação reconhecida pela universidade** — o portal UNIFESP nomeia Gabrielle ao lado de Eliana e Solange; não é nota de rodapé informal.
2. **Rosto público do prémio** — a entrega em Lisboa documenta representação institucional do projecto nascido na periferia.
3. **Ética da democratização** — a citação atribuída a Gabrielle no portal alinha-se ao discurso de Ticão (acesso, preconceito, movimento social + universidade).
4. **Tríade de coordenação** — Eliana (ciência/CEE/RTC), Nappo (CEBRID/prevenção), Gabrielle (coordenação/extensão premiada): três nós, um curso.
5. **Limites honestos** — sem inventar currículo Lattes completo; recomenda o portal e o [curso SIEX](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) como fontes primárias.

## Complementaridade com o Inspetor BudGanja

| Tema Gabrielle | Recurso BudGanja |
|----------------|------------------|
| Curso que coordena | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Arquivo de aulas | [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Vídeos · Gabrielle](/videos/?channel=movrecam&series=gabrielle) |
| Coordenação científica / CEE | [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| CEBRID / prevenção | [Solange Nappo](/posts/post-inspecao-solange-nappo.html) · [CEBRID](/posts/post-inspecao-cebrid.html) |
| Origens | [Padre Ticão](/posts/post-inspecao-padre-ticao.html) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| Hub | [Biblioteca UNIFESP](/biblioteca/unifesp/) |

## Créditos e referências

**Todo o mérito da coordenação e da representação pública do curso premiado pertence a Gabrielle Dainezi, às co-coordenadoras e às instituições UNIFESP/MovReCam.** Esta inspeção apenas documenta e recomenda — sem apropriação.

Fontes consultadas (não exaustivo):

- [Portal UNIFESP — curso ganha prémio internacional](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [SIEX 30063](https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info)
- Cruzamentos: [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Eliana](/posts/post-inspecao-eliana-rodrigues.html) · [Nappo](/posts/post-inspecao-solange-nappo.html) · [Ticão](/posts/post-inspecao-padre-ticao.html)

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado com mérito como referência de legado vivo / coordenação de extensão** — Gabrielle Dainezi completa a tríade pública da coordenação do curso premiado. Quem celebra o CannaPortugal 2025 sem nomeá-la falha o crédito devido.

[Portal UNIFESP (prémio)](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial and documentary inspection of the public role of **Gabrielle Dainezi** — cited by **UNIFESP** as one of the **coordinators** of the extension course “Therapeutic Use of Cannabis sativa L.” (with **MovReCam**), together with [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) and [Solange Nappo](/posts/post-inspecao-solange-nappo.html). The aim is to record, from institutional sources and with due credit, the operational continuity of the project born with [Ticão](/posts/post-inspecao-padre-ticao.html) and [Carlini](/posts/post-inspecao-elisaldo-carlini.html) — including public representation at the **CannaPortugal Global Cannabis Awards 2025**.

> **Methodological note:** independent audit by Inspector BudGanja based on the [UNIFESP portal](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional), SIEX 30063 (external vice-coordination), and BudGanja cross-checks. **No affiliation** with UNIFESP, MovReCam, or the award organizers. All credit for coordination and public representation belongs to Gabrielle Dainezi and the course institutions.

![Gabrielle Dainezi](${portrait})

*Gabrielle Dainezi receiving the CannaPortugal Global Cannabis Awards 2025 (Lisbon). Image: [UNIFESP portal](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional) — photo Fernando Eliziário.*

## Inspected subject

| Field | Value |
|-------|-------|
| Name | **Gabrielle Dainezi** |
| Public role | Coordination / external vice-coordination of the UNIFESP therapeutic *Cannabis sativa* L. course |
| Partnership | **MovReCam** · UNIFESP extension (SIEX) |
| Joint coordination (portal) | With **Eliana Rodrigues** and **Solange Nappo** |
| Public milestone | Representative receiving the **CannaPortugal Global Cannabis Awards 2025** (Lisbon) |
| BudGanja ecosystem | Continuity of the Ticão–Carlini thread in the award-winning extension |
| Inspection date | ${inspected} |

## Why this inspection exists

Editorial queue: **“cited by UNIFESP in the award-winning course coordination.”** Without this sheet the coordination trio was incomplete. Omitting who receives the award on behalf of the course would fail the method: **credit where credit is due**.

## Hypotheses and method

- **H1:** Gabrielle acts as a **coordination and representation** link for the course with MovReCam and the university.
- **H2:** her portal quote on democratizing quality information and breaking prejudice synthesizes the post-Ticão ethics of the course.
- **H3:** the sheet is deliberately **short and documentary** — public sources on a full academic CV are limited; focus is the verifiable course role.
- **Method:** (1) UNIFESP/SIEX sources; (2) coordination and award role; (3) legacy cross-links; (4) honest limits; (5) status.

## Timeline (verifiable summary)

| Period | Milestone |
|--------|-----------|
| 2018 → | UNIFESP/MovReCam extension course active; national-scale growth. |
| Later editions | Gabrielle cited in coordination / external vice-coordination (SIEX and statements). |
| May 2025 | **CannaPortugal** award delivery in Lisbon — Gabrielle receives the award for the course (photo and quote on UNIFESP portal). |
| 2025–2026 | Further editions (e.g. XIV) under the same democratization logic. |

## Findings (credit due)

1. **University-recognized coordination** — UNIFESP names Gabrielle alongside Eliana and Solange.
2. **Public face of the award** — Lisbon delivery documents institutional representation of a periphery-born project.
3. **Democratization ethics** — portal quote aligns with Ticão’s access discourse.
4. **Coordination triad** — Eliana (science/CEE/RTC), Nappo (CEBRID), Gabrielle (award-winning extension coordination).
5. **Honest limits** — no invented full Lattes; primary sources are the portal and [SIEX course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).

## Complementarity with Inspector BudGanja

| Gabrielle theme | BudGanja resource |
|-----------------|-------------------|
| Course she coordinates | [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Lecture archive | [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Videos](/videos/?channel=movrecam) |
| Scientific / CEE coordination | [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| CEBRID / prevention | [Solange Nappo](/posts/post-inspecao-solange-nappo.html) · [CEBRID](/posts/post-inspecao-cebrid.html) |
| Origins | [Father Ticão](/posts/post-inspecao-padre-ticao.html) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| Hub | [UNIFESP library](/biblioteca/unifesp/) |

## Credits and references

**All credit for coordination and public representation of the award-winning course belongs to Gabrielle Dainezi, co-coordinators, and UNIFESP/MovReCam.** This inspection only documents and recommends — without appropriation.

Sources (non-exhaustive):

- [UNIFESP portal — course wins international award](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [SIEX 30063](https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info)
- Cross-links: [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Eliana](/posts/post-inspecao-eliana-rodrigues.html) · [Nappo](/posts/post-inspecao-solange-nappo.html) · [Ticão](/posts/post-inspecao-padre-ticao.html)

**Inspection written by:** Inspector BudGanja (independent digital laboratory)

## Status

**Approved with merit as a living-legacy / extension-coordination reference** — Gabrielle Dainezi completes the public coordination triad of the award-winning course.

[UNIFESP portal (award)](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional) · [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) · [All inspections](/biblioteca/inspecoes/)`;

  const contentEs = `## Alcance

Inspección editorial y documental del papel público de **Gabrielle Dainezi** — citada por la **UNIFESP** como una de las **coordinadoras** del curso de extensión «El uso terapéutico de Cannabis sativa L.» (con **MovReCam**), junto con [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) y [Solange Nappo](/posts/post-inspecao-solange-nappo.html). El objetivo es registrar, con fuentes institucionales y con el **mérito debido**, la continuidad operativa del proyecto nacido con [Ticão](/posts/post-inspecao-padre-ticao.html) y [Carlini](/posts/post-inspecao-elisaldo-carlini.html) — incluida la representación pública en los **CannaPortugal Global Cannabis Awards 2025**.

> **Nota metodológica:** auditoría independiente del Inspector BudGanja basada en el [portal UNIFESP](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional), ficha SIEX 30063 y cruces BudGanja. **Sin afiliación** con la UNIFESP, el MovReCam o la organización del premio. Todo el mérito de la coordinación y la representación pública pertenece a Gabrielle Dainezi y a las instituciones del curso.

![Gabrielle Dainezi](${portrait})

*Gabrielle Dainezi recibiendo los CannaPortugal Global Cannabis Awards 2025 (Lisboa). Imagen: [portal UNIFESP](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional) — foto Fernando Eliziário.*

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Gabrielle Dainezi** |
| Papel público | Coordinación / vice-coordinación (externa) del curso UNIFESP |
| Asociación | **MovReCam** · extensión UNIFESP (SIEX) |
| Coordinación conjunta (portal) | Con **Eliana Rodrigues** y **Solange Nappo** |
| Hito público | Representante en la entrega de los **CannaPortugal Global Cannabis Awards 2025** (Lisboa) |
| Ecosistema BudGanja | Continuidad del hilo Ticão–Carlini en la extensión premiada |
| Fecha de la inspección | ${inspected} |

## Por qué existe esta inspección

Cola editorial: **«citada por la UNIFESP en la coordinación del curso premiado»**. Sin esta ficha, el trío de coordinación quedaba incompleto. Omitir a quien recibe el premio en nombre del curso fallaría el método: **crédito a quien lo merece**.

## Hipótesis y método

- **H1:** Gabrielle opera como eslabón de **coordinación y representación** del curso.
- **H2:** la cita del portal sobre democratizar información y derribar prejuicios sintetiza la ética del curso post-Ticão.
- **H3:** la ficha es deliberadamente **breve y documental** — fuentes públicas de CV completo son limitadas.
- **Método:** (1) fuentes UNIFESP/SIEX; (2) papel en coordinación y premio; (3) cruces de legado; (4) límites; (5) estatus.

## Cronología (síntesis verificable)

| Período | Hito |
|---------|------|
| 2018 → | Curso UNIFESP/MovReCam activo; crecimiento nacional. |
| Ediciones siguientes | Gabrielle citada en coordinación / vice-coordinación externa. |
| May 2025 | Entrega CannaPortugal en Lisboa — Gabrielle recibe el premio por el curso. |
| 2025–2026 | Continuación de ediciones (p. ej. XIV) con la misma lógica de democratización. |

## Hallazgos (mérito debido)

1. **Coordinación reconocida por la universidad** — el portal nombra a Gabrielle junto a Eliana y Solange.
2. **Rostro público del premio** — Lisboa documenta la representación institucional del proyecto nacido en la periferia.
3. **Ética de la democratización** — la cita del portal se alinea con el discurso de acceso de Ticão.
4. **Tríada de coordinación** — Eliana, Nappo y Gabrielle: tres nodos, un curso.
5. **Límites honestos** — sin inventar Lattes completo; fuentes primarias: portal y [curso SIEX](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).

## Complementariedad con el Inspector BudGanja

| Tema Gabrielle | Recurso BudGanja |
|----------------|------------------|
| Curso que coordina | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Archivo de clases | [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Videos](/videos/?channel=movrecam) |
| Coordinación científica / CEE | [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| CEBRID / prevención | [Solange Nappo](/posts/post-inspecao-solange-nappo.html) · [CEBRID](/posts/post-inspecao-cebrid.html) |
| Orígenes | [Padre Ticão](/posts/post-inspecao-padre-ticao.html) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| Hub | [Biblioteca UNIFESP](/biblioteca/unifesp/) |

## Créditos y referencias

**Todo el mérito de la coordinación y la representación pública del curso premiado pertenece a Gabrielle Dainezi, a las co-coordinadoras y a UNIFESP/MovReCam.** Esta inspección solo documenta y recomienda — sin apropiación.

Fuentes (no exhaustivo):

- [Portal UNIFESP — el curso gana premio internacional](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [SIEX 30063](https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info)
- Cruces: [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Eliana](/posts/post-inspecao-eliana-rodrigues.html) · [Nappo](/posts/post-inspecao-solange-nappo.html) · [Ticão](/posts/post-inspecao-padre-ticao.html)

**Inspección redactada por:** Inspector BudGanja (laboratorio digital independiente)

## Estado

**Aprobado con mérito como referencia de legado vivo / coordinación de extensión** — Gabrielle Dainezi completa la tríada pública de coordinación del curso premiado.

[Portal UNIFESP (premio)](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Eliana Rodrigues](/posts/post-inspecao-eliana-rodrigues.html) · [Todas las inspecciones](/biblioteca/inspecoes/)`;

  return { body, contentEn, contentEs };
}

function buildGabrielleDaineziInspecaoPost() {
  const inspected = '2026-07-31';
  const { body, contentEn, contentEs } = buildGabrielleDaineziBodies(inspected);

  return pessoaPost({
    title: 'Inspeção: Gabrielle Dainezi — coordenação do curso UNIFESP',
    titleEn: 'Inspection: Gabrielle Dainezi — UNIFESP course coordination',
    titleEs: 'Inspección: Gabrielle Dainezi — coordinación del curso UNIFESP',
    excerpt:
      'Ficha de legado vivo: Gabrielle Dainezi — coordenação do curso UNIFESP/MovReCam premiado (CannaPortugal 2025); continuidade do fio Ticão–Carlini na extensão.',
    excerptEn:
      'Living-legacy sheet: Gabrielle Dainezi — coordination of the award-winning UNIFESP/MovReCam course (CannaPortugal 2025); continuity of the Ticão–Carlini extension thread.',
    excerptEs:
      'Ficha de legado vivo: Gabrielle Dainezi — coordinación del curso UNIFESP/MovReCam premiado (CannaPortugal 2025); continuidad del hilo Ticão–Carlini en la extensión.',
    slug: 'inspecao-gabrielle-dainezi',
    date: inspected + 'T23:00:00.000Z',
    seriesOrder: 6,
    seriesLabel: 'Gabrielle Dainezi · legado',
    coverImage: '/imagens/inspecoes/gabrielle-dainezi-cover.jpg',
    sourceUrl:
      'https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildGabrielleDaineziInspecaoPost,
  buildGabrielleDaineziBodies
};
