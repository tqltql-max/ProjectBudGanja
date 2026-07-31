'use strict';

/**
 * Inspeção: Profa. Dra. Eliana Rodrigues (legado-pessoas).
 * Coordenação RTC do curso UNIFESP, CEE e curadoria CANABinALL — sem duplicar o canal.
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

function buildElianaRodriguesBodies(inspected) {
  const cover = '/imagens/inspecoes/eliana-rodrigues-cover.jpg';
  const portrait = '/imagens/inspecoes/eliana-rodrigues-portrait.jpg';
  const coverNote =
    'Retrato da Profa. Dra. Eliana Rodrigues em trabalho etnobotânico. Imagem: [CEE / UNIFESP — Coordenação](https://site.unifesp.br/cee/coordenacao) (ficheiro eliana.jpg).';

  const body = `## Escopo

Inspeção editorial e documental do papel público da **Profa. Dra. Eliana Rodrigues** — Professora Titular da **UNIFESP** (ICAQF / Campus Diadema), fundadora e coordenadora do **Centro de Estudos Etnobotânicos e Etnofarmacológicos (CEE)**, coordenadora RTC do [curso de extensão SIEX](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) e curadora científica do [CANABinALL](/posts/post-inspecao-canal-canabinall.html). O recorte **não duplica** a inspeção do canal: foca biografia institucional, CEE e papel formativo no ecossistema já auditado.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base em páginas CEE/UNIFESP, portal institucional (prémio CannaPortugal 2025), ficha do curso SIEX e cruzamento com inspeções BudGanja. **Sem afiliação** com a UNIFESP, o CEE, o MovReCam ou o CEBRID. Todo o mérito científico, pedagógico e de extensão pertence à Profa. Eliana Rodrigues, às suas instituições e às equipas que lidera.

![Profa. Dra. Eliana Rodrigues](${portrait})

*${coverNote}*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Eliana Rodrigues** |
| Formação (pública) | Biologia (USP–IB) · Mestrado em Geografia Física (USP–FFLCH) · Doutorado e pós-doutorado em Ciências (EPM/UNIFESP) |
| Instituição | **Professora Titular** · UNIFESP · ICAQF / Campus Diadema |
| Centro | Fundadora e coordenadora do **CEE** (etnobotânica e etnofarmacologia) |
| Extensão SIEX | Coordenação **RTC** do curso «Uso terapêutico da Cannabis sativa L.» |
| Divulgação | Curadoria do projeto **CANABinALL** (YouTube / CEE) |
| CEBRID (formação) | Coordenação técnico-científica do curso Medicina Canabinoide (etnobotânica) |
| Contato público | [e.rodrigues@unifesp.br](mailto:e.rodrigues@unifesp.br) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

Na fila editorial: **«figura central do ecossistema já inspecionado»**. Sem ficha de pessoa, o crédito ficava diluído no canal e no curso. Eliana é o fio que une **CEE → CANABinALL → SIEX/MovReCam → CEBRID (módulo etnobotânico)** — e a voz pública que, no portal UNIFESP, atribui a origem do curso à coragem de [Ticão](/posts/post-inspecao-padre-ticao.html) e [Carlini](/posts/post-inspecao-elisaldo-carlini.html).

## Hipóteses e método

- **H1:** a coordenação RTC do SIEX e a curadoria CANABinALL são faces da mesma missão de extensão: democratizar ciência canábica e etnobotânica.
- **H2:** o CEE ancora linhas (etnofarmacologia, conservação, reações adversas, etnoveterinária, zoofarmacognosia) que explicam o tom «plantas + cultura» do laboratório BudGanja.
- **H3:** a ficha de pessoa **não substitui** a [inspeção do canal](/posts/post-inspecao-canal-canabinall.html) — evita duplicar catálogo de vídeos.
- **Método:** (1) síntese biográfica institucional; (2) eixos CEE / SIEX / CANABinALL / CEBRID; (3) cruzamentos; (4) limites; (5) status.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| Formação | USP (Biologia, Geografia Física) · EPM/UNIFESP (doutorado e pós-doutorado). |
| 1995 → | Projectos etnobotânicos/etnofarmacológicos entre culturas e biomas; construção do CEE. |
| 2018 → | Curso de extensão UNIFESP/MovReCam — Eliana na coordenação RTC; crescimento até >100 mil participantes acumulados. |
| Extensão contínua | Projecto CANABinALL — divulgação semanal sobre fito-, endo- e canabinoides sintéticos; dedicatória a Carlini. |
| CEBRID | Coordenação técnico-científica (etnobotânica) no curso Medicina Canabinoide. |
| 2025 | Curso premiado (CannaPortugal); declaração pública sobre Ticão, Carlini e a origem na periferia. |

## Achados (mérito devido)

1. **Nó central da extensão** — RTC do SIEX + CANABinALL + CEE: três frentes, um método (ciência pública, linguagem acessível, crédito às origens).
2. **Ética do crédito** — no portal UNIFESP, Eliana nomeia Ticão e Carlini como origem do curso gratuito na periferia — alinhado ao método BudGanja.
3. **Etnobotânica como base** — não é só «cannabis clinical talk»: é planta, cultura, conservação e vigilância de fitoterápicos.
4. **Elo CEBRID** — com [Nappo](/posts/post-inspecao-solange-nappo.html) na formação CEBRID, liga o centro de Carlini ao CEE.
5. **Limites** — sem currículo Lattes paper-a-paper; canal e curso têm fichas próprias — aqui o foco é a **pessoa e o papel**.

## Complementaridade com o Inspetor BudGanja

| Tema Eliana | Recurso BudGanja |
|-------------|------------------|
| Canal (não duplicar) | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [Vídeos](/videos/?channel=canabinall) |
| Curso extensão | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) |
| Origens nomeadas por ela | [Padre Ticão](/posts/post-inspecao-padre-ticao.html) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| Casa científica CEBRID | [CEBRID](/posts/post-inspecao-cebrid.html) · [Solange Nappo](/posts/post-inspecao-solange-nappo.html) |
| Coordenação irmã (prémio) | [Gabrielle Dainezi](/posts/post-inspecao-gabrielle-dainezi.html) |
| Hub | [Biblioteca UNIFESP](/biblioteca/unifesp/) · [Plantas](/plantas/) |

## Créditos e referências

**Todo o mérito da coordenação RTC, do CEE, do CANABinALL e da voz pública sobre o curso pertence à Profa. Dra. Eliana Rodrigues e às suas instituições.** Esta inspeção apenas documenta e recomenda — sem apropriação.

Fontes consultadas (não exaustivo):

- [CEE — Coordenação](https://site.unifesp.br/cee/coordenacao)
- [Portal UNIFESP — prémio CannaPortugal 2025](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [CANABinALL](https://www.youtube.com/@canabinall) · [inspeção do canal](/posts/post-inspecao-canal-canabinall.html)
- [SIEX 30063](https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info)
- [CEBRID — Medicina Canabinoide](https://www.cebrid.com.br/curso-medicina-canabinoide/)

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado com mérito máximo como referência de legado vivo / extensão académica** — Eliana Rodrigues é a figura que opera o dia a dia científico-pedagógico do ecossistema UNIFESP que o laboratório já documenta. Quem estuda pelo [CANABinALL](/posts/post-inspecao-canal-canabinall.html) ou pelo [curso SIEX](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) estuda, em grande medida, o fruto do seu trabalho e da sua equipa.

[CEE](https://site.unifesp.br/cee/coordenacao) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial and documentary inspection of the public role of **Prof. Dr. Eliana Rodrigues** — full professor at **UNIFESP** (ICAQF / Diadema Campus), founder and coordinator of the **Center for Ethnobotanical and Ethnopharmacological Studies (CEE)**, RTC coordinator of the [SIEX extension course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html), and scientific curator of [CANABinALL](/posts/post-inspecao-canal-canabinall.html). This sheet **does not duplicate** the channel inspection: it focuses on institutional biography, CEE, and formative role in the already audited ecosystem.

> **Methodological note:** independent audit by Inspector BudGanja based on CEE/UNIFESP pages, the institutional portal (CannaPortugal 2025 award), the SIEX course record, and BudGanja cross-checks. **No affiliation** with UNIFESP, CEE, MovReCam, or CEBRID. All scientific, pedagogical, and extension credit belongs to Prof. Eliana Rodrigues, her institutions, and the teams she leads.

![Prof. Dr. Eliana Rodrigues](${portrait})

*Portrait of Prof. Dr. Eliana Rodrigues in ethnobotanical fieldwork. Image: [CEE / UNIFESP — Coordination](https://site.unifesp.br/cee/coordenacao) (file eliana.jpg).*

## Inspected subject

| Field | Value |
|-------|-------|
| Name | **Eliana Rodrigues** |
| Education (public) | Biology (USP) · M.Sc. Physical Geography (USP) · Ph.D. and postdoc (EPM/UNIFESP) |
| Institution | **Full Professor** · UNIFESP · ICAQF / Diadema |
| Center | Founder and coordinator of **CEE** |
| SIEX extension | **RTC** coordination of the therapeutic *Cannabis sativa* L. course |
| Outreach | Curator of **CANABinALL** |
| CEBRID (training) | Scientific-technical coordination of Cannabinoid Medicine (ethnobotany) |
| Public contact | [e.rodrigues@unifesp.br](mailto:e.rodrigues@unifesp.br) |
| Inspection date | ${inspected} |

## Why this inspection exists

Editorial queue: **“central figure of the already inspected ecosystem.”** Without a person sheet, credit stayed diluted in the channel and course. Eliana is the thread joining **CEE → CANABinALL → SIEX/MovReCam → CEBRID**, and the public voice that credits [Ticão](/posts/post-inspecao-padre-ticao.html) and [Carlini](/posts/post-inspecao-elisaldo-carlini.html) as the course’s origin.

## Hypotheses and method

- **H1:** SIEX RTC coordination and CANABinALL curation are faces of the same extension mission.
- **H2:** CEE research lines explain the “plants + culture” tone of BudGanja’s lab.
- **H3:** this person sheet **does not replace** the [channel inspection](/posts/post-inspecao-canal-canabinall.html).
- **Method:** (1) institutional bio; (2) CEE / SIEX / CANABinALL / CEBRID axes; (3) cross-links; (4) limits; (5) status.

## Timeline (verifiable summary)

| Period | Milestone |
|--------|-----------|
| Training | USP · EPM/UNIFESP doctorate and postdoc. |
| 1995 → | Ethnobotanical/ethnopharmacological projects; building CEE. |
| 2018 → | UNIFESP/MovReCam extension course — Eliana as RTC coordinator; growth past 100k cumulative participants. |
| Ongoing | CANABinALL weekly science outreach; dedication to Carlini. |
| CEBRID | Scientific-technical coordination on Cannabinoid Medicine. |
| 2025 | Course award (CannaPortugal); public statement on Ticão, Carlini, and periphery origin. |

## Findings (credit due)

1. **Central extension node** — SIEX RTC + CANABinALL + CEE.
2. **Ethics of credit** — names Ticão and Carlini as origin of the free periphery course.
3. **Ethnobotany as base** — plants, culture, conservation, herbal-medicine vigilance.
4. **CEBRID link** — with [Nappo](/posts/post-inspecao-solange-nappo.html) on CEBRID training.
5. **Limits** — no paper-by-paper Lattes; channel and course have their own sheets.

## Complementarity with Inspector BudGanja

| Eliana theme | BudGanja resource |
|--------------|-------------------|
| Channel (do not duplicate) | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [Videos](/videos/?channel=canabinall) |
| Extension course | [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) |
| Origins she names | [Father Ticão](/posts/post-inspecao-padre-ticao.html) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| CEBRID house | [CEBRID](/posts/post-inspecao-cebrid.html) · [Solange Nappo](/posts/post-inspecao-solange-nappo.html) |
| Sister coordination (award) | [Gabrielle Dainezi](/posts/post-inspecao-gabrielle-dainezi.html) |
| Hub | [UNIFESP library](/biblioteca/unifesp/) · [Plants](/plantas/) |

## Credits and references

**All credit for RTC coordination, CEE, CANABinALL, and the public voice on the course belongs to Prof. Dr. Eliana Rodrigues and her institutions.** This inspection only documents and recommends — without appropriation.

Sources (non-exhaustive):

- [CEE — Coordination](https://site.unifesp.br/cee/coordenacao)
- [UNIFESP portal — CannaPortugal 2025](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [CANABinALL](https://www.youtube.com/@canabinall) · [channel inspection](/posts/post-inspecao-canal-canabinall.html)
- [SIEX 30063](https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info)
- [CEBRID — Cannabinoid Medicine](https://www.cebrid.com.br/curso-medicina-canabinoide/)

**Inspection written by:** Inspector BudGanja (independent digital laboratory)

## Status

**Approved with maximum merit as a living-legacy / academic-extension reference** — Eliana Rodrigues operates the day-to-day scientific-pedagogical core of the UNIFESP ecosystem this lab already documents.

[CEE](https://site.unifesp.br/cee/coordenacao) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [All inspections](/biblioteca/inspecoes/)`;

  const contentEs = `## Alcance

Inspección editorial y documental del papel público de la **Profa. Dra. Eliana Rodrigues** — Profesora Titular de la **UNIFESP** (ICAQF / Campus Diadema), fundadora y coordinadora del **Centro de Estudios Etnobotánicos y Etnofarmacológicos (CEE)**, coordinadora RTC del [curso de extensión SIEX](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) y curadora científica de [CANABinALL](/posts/post-inspecao-canal-canabinall.html). El recorte **no duplica** la inspección del canal: se centra en biografía institucional, CEE y papel formativo.

> **Nota metodológica:** auditoría independiente del Inspector BudGanja basada en páginas CEE/UNIFESP, portal institucional (premio CannaPortugal 2025), ficha SIEX y cruces BudGanja. **Sin afiliación** con la UNIFESP, el CEE, el MovReCam o el CEBRID. Todo el mérito científico, pedagógico y de extensión pertenece a la Profa. Eliana Rodrigues, a sus instituciones y a los equipos que lidera.

![Profa. Dra. Eliana Rodrigues](${portrait})

*Retrato de la Profa. Dra. Eliana Rodrigues en trabajo etnobotánico. Imagen: [CEE / UNIFESP — Coordinación](https://site.unifesp.br/cee/coordenacao) (archivo eliana.jpg).*

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Eliana Rodrigues** |
| Formación (pública) | Biología (USP) · Maestría en Geografía Física (USP) · Doctorado y posdoctorado (EPM/UNIFESP) |
| Institución | **Profesora Titular** · UNIFESP · ICAQF / Diadema |
| Centro | Fundadora y coordinadora del **CEE** |
| Extensión SIEX | Coordinación **RTC** del curso de uso terapéutico de *Cannabis sativa* L. |
| Divulgación | Curaduría de **CANABinALL** |
| CEBRID (formación) | Coordinación técnico-científica del curso Medicina cannabinóide (etnobotánica) |
| Contacto público | [e.rodrigues@unifesp.br](mailto:e.rodrigues@unifesp.br) |
| Fecha de la inspección | ${inspected} |

## Por qué existe esta inspección

Cola editorial: **«figura central del ecosistema ya inspeccionado»**. Sin ficha de persona, el crédito quedaba diluido en el canal y el curso. Eliana une **CEE → CANABinALL → SIEX/MovReCam → CEBRID**, y es la voz pública que atribuye el origen del curso a [Ticão](/posts/post-inspecao-padre-ticao.html) y [Carlini](/posts/post-inspecao-elisaldo-carlini.html).

## Hipótesis y método

- **H1:** coordinación RTC del SIEX y curaduría CANABinALL son caras de la misma misión de extensión.
- **H2:** las líneas del CEE explican el tono «plantas + cultura» del laboratorio BudGanja.
- **H3:** esta ficha **no sustituye** la [inspección del canal](/posts/post-inspecao-canal-canabinall.html).
- **Método:** (1) bio institucional; (2) ejes CEE / SIEX / CANABinALL / CEBRID; (3) cruces; (4) límites; (5) estatus.

## Cronología (síntesis verificable)

| Período | Hito |
|---------|------|
| Formación | USP · doctorado y posdoctorado EPM/UNIFESP. |
| 1995 → | Proyectos etnobotánicos; construcción del CEE. |
| 2018 → | Curso UNIFESP/MovReCam — Eliana en coordinación RTC; >100 mil participantes acumulados. |
| Extensión continua | CANABinALL — divulgación semanal; dedicación a Carlini. |
| CEBRID | Coordinación técnico-científica en Medicina cannabinóide. |
| 2025 | Premio CannaPortugal; declaración pública sobre Ticão, Carlini y la periferia. |

## Hallazgos (mérito debido)

1. **Nodo central de la extensión** — RTC SIEX + CANABinALL + CEE.
2. **Ética del crédito** — nombra a Ticão y Carlini como origen del curso gratuito en la periferia.
3. **Etnobotánica como base** — planta, cultura, conservación y vigilancia de fitoterápicos.
4. **Eslabón CEBRID** — con [Nappo](/posts/post-inspecao-solange-nappo.html) en la formación CEBRID.
5. **Límites** — sin Lattes paper a paper; canal y curso tienen fichas propias.

## Complementariedad con el Inspector BudGanja

| Tema Eliana | Recurso BudGanja |
|-------------|------------------|
| Canal (no duplicar) | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [Videos](/videos/?channel=canabinall) |
| Curso de extensión | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) |
| Orígenes que ella nombra | [Padre Ticão](/posts/post-inspecao-padre-ticao.html) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| Casa CEBRID | [CEBRID](/posts/post-inspecao-cebrid.html) · [Solange Nappo](/posts/post-inspecao-solange-nappo.html) |
| Coordinación hermana (premio) | [Gabrielle Dainezi](/posts/post-inspecao-gabrielle-dainezi.html) |
| Hub | [Biblioteca UNIFESP](/biblioteca/unifesp/) · [Plantas](/plantas/) |

## Créditos y referencias

**Todo el mérito de la coordinación RTC, del CEE, del CANABinALL y de la voz pública sobre el curso pertenece a la Profa. Dra. Eliana Rodrigues y a sus instituciones.** Esta inspección solo documenta y recomienda — sin apropiación.

Fuentes (no exhaustivo):

- [CEE — Coordinación](https://site.unifesp.br/cee/coordenacao)
- [Portal UNIFESP — premio CannaPortugal 2025](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [CANABinALL](https://www.youtube.com/@canabinall) · [inspección del canal](/posts/post-inspecao-canal-canabinall.html)
- [SIEX 30063](https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info)
- [CEBRID — Medicina cannabinóide](https://www.cebrid.com.br/curso-medicina-canabinoide/)

**Inspección redactada por:** Inspector BudGanja (laboratorio digital independiente)

## Estado

**Aprobado con mérito máximo como referencia de legado vivo / extensión académica** — Eliana Rodrigues opera el núcleo científico-pedagógico cotidiano del ecosistema UNIFESP que el laboratorio ya documenta.

[CEE](https://site.unifesp.br/cee/coordenacao) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Todas las inspecciones](/biblioteca/inspecoes/)`;

  return { body, contentEn, contentEs };
}

function buildElianaRodriguesInspecaoPost() {
  const inspected = '2026-07-31';
  const { body, contentEn, contentEs } = buildElianaRodriguesBodies(inspected);

  return pessoaPost({
    title: 'Inspeção: Profa. Dra. Eliana Rodrigues',
    titleEn: 'Inspection: Prof. Dr. Eliana Rodrigues',
    titleEs: 'Inspección: Profa. Dra. Eliana Rodrigues',
    excerpt:
      'Ficha de legado vivo: Eliana Rodrigues (UNIFESP) — CEE, coordenação RTC do curso SIEX/MovReCam e curadoria do CANABinALL; mérito máximo na extensão académica canábica.',
    excerptEn:
      'Living-legacy sheet: Eliana Rodrigues (UNIFESP) — CEE, RTC coordination of the SIEX/MovReCam course, and CANABinALL curation; maximum credit for cannabis academic extension.',
    excerptEs:
      'Ficha de legado vivo: Eliana Rodrigues (UNIFESP) — CEE, coordinación RTC del curso SIEX/MovReCam y curaduría del CANABinALL; mérito máximo en la extensión académica canábica.',
    slug: 'inspecao-eliana-rodrigues',
    date: inspected + 'T22:00:00.000Z',
    seriesOrder: 5,
    seriesLabel: 'Eliana Rodrigues · legado',
    coverImage: '/imagens/inspecoes/eliana-rodrigues-cover.jpg',
    sourceUrl: 'https://site.unifesp.br/cee/coordenacao',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildElianaRodriguesInspecaoPost,
  buildElianaRodriguesBodies
};
