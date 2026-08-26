'use strict';

/**
 * Inspeção-guia: Farmácia Viva e cannabis no SUS (Aula 5 XIV — Jaqueline Guimarães).
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

const POST_HREF = '/posts/post-inspecao-guia-farmacia-viva.html';
const L = {
  guiaTec: '/guia/palavras.html?group=tecnico',
  hub: '/biblioteca/inspecoes/#inspecoes-palavras',
  xiv: '/biblioteca/unifesp/livro-xiv.html#aula-5',
  curso: '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html',
  farmaceuticos: '/posts/post-inspecao-guia-cannabis-farmaceuticos.html',
  associacoes: '/posts/post-inspecao-guia-associacoes-pacientes.html',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html'
};

function buildBodies() {
  const body = `## Escopo

Inspeção-guia a partir do **resumo da Aula 5** do XIV Curso — **A Farmácia Viva e a Cannabis sativa L.** (Jaqueline Guimarães). Objecto: **política pública do SUS**, cadeia produtiva (cultivo → processamento → dispensação) e enquadramento da cannabis nesse serviço.

> **Nota metodológica:** rascunhos XIV. **Não é manual de implantação municipal nem parecer jurídico.** Portarias e decretos mudam — confirmar no Ministério da Saúde / secretarias.

## Público e uso

| Campo | Valor |
|-------|-------|
| Âncora | [Livro XIV · Aula 5](${L.xiv}) |
| Docente | Jaqueline Guimarães (farmacêutica · Farmácias Vivas) |
| Elo acesso | [Farmacêuticos](${L.farmaceuticos}) · [Associações](${L.associacoes}) |
| Pergunta-guia | O que é Farmácia Viva no SUS e onde a cannabis entra nessa cadeia? |

## Tese central

**Farmácia Viva** é serviço **exclusivo do SUS** (Portaria 886/2010): cultivo, orientação, beneficiamento e, conforme modalidade, manipulação/dispensação de plantas medicinais — com princípios de biodiversidade, saberes tradicionais e evidência. A aula liga isso à possibilidade de incluir **Cannabis sativa** na lógica de acesso público a plantas, sem confundir com associação de pacientes ou farmácia privada.

## Hipóteses

- **H1:** Farmácia Viva ≠ horto caseiro — é **política pública** com gestão municipal/estadual.
- **H2:** Modalidades (tipo 1–3 no decreto cearense citado) diferem por cultivo / beneficiamento / manipulação.
- **H3:** **RENISUS** lista plantas de interesse para pesquisa/validação — elo ciência × tradição.
- **H4:** Mentor histórico: Prof. Francisco José de Abreu Matos (UFC, 1983 → reconhecimento federal 2010).
- **H5:** Cannabis no SUS via Farmácia Viva é **horizonte formativo** da aula — não declaração de implementação universal.

## Cadeia (síntese da aula)

| Etapa | Nota BudGanja |
|-------|----------------|
| Cultivo / orto | Tipo 1 enfatiza planta + educação comunitária |
| Processamento | Droga vegetal / qualidade |
| Manipulação / dispensação | Modalidades mais completas (ex. tipo 3) |
| Princípios | Biodiversidade · sustentabilidade · saberes · ciência · acesso seguro |

## Rede BudGanja

| Camada | Fichas |
|--------|--------|
| Formação | [Curso UNIFESP](${L.curso}) · [Aula 5](${L.xiv}) |
| Acesso | [Farmacêuticos](${L.farmaceuticos}) · [Associações](${L.associacoes}) |
| Hub | [Palavras](${L.hub}) · [Cobertura](${L.cobertura}) |

## Limites

- Não inventa Farmácia Viva de cannabis activa no teu município.  
- Não substitui RDC/ANVISA nem HC.  
- Confirmar portarias actualizadas.

## Status

**Aprovado — inspeção-guia da Aula 5 (Farmácia Viva × cannabis no SUS).**

[▶ Aula 5](${L.xiv}) · [▶ Farmacêuticos](${L.farmaceuticos}) · [▶ Hub](${L.hub})`;

  const contentEn = `## Scope

Guide from **XIV Lesson 5** — Living Pharmacy (*Farmácia Viva*) and *Cannabis sativa* L. (Jaqueline Guimarães). Focus: **SUS public policy** and the productive chain.

> **Not a municipal implementation manual.** Regulations change — confirm official sources.

## Core thesis

**Farmácia Viva** is a **SUS-only** service (Ordinance 886/2010): cultivation, guidance, processing and, by modality, compounding/dispensing of medicinal plants — with biodiversity and traditional knowledge principles. The lecture places cannabis in that public-access logic without confusing it with patient associations or private pharmacies.

## Status

**Approved — Lesson 5 Living Pharmacy guide.**`;

  const contentEs = `## Alcance

Guía a partir de la **Aula 5 del XIV** — Farmacia Viva y *Cannabis sativa* L. (Jaqueline Guimarães). Foco: **política pública del SUS** y la cadena productiva.

> **No es manual de implantación municipal.** Las normas cambian — confirmar fuentes oficiales.

## Tesis central

**Farmacia Viva** es un servicio **exclusivo del SUS** (Portaria 886/2010): cultivo, orientación, procesamiento y, según modalidad, manipulación/dispensación de plantas medicinales.

## Estado

**Aprobado — guía Aula 5 (Farmacia Viva).**`;

  return { body, contentEn, contentEs };
}

function buildGuiaFarmaciaVivaPost() {
  const { body, contentEn, contentEs } = buildBodies();
  return palavraPost({
    title: 'Inspeção: Guia Farmácia Viva — plantas medicinais e cannabis no SUS',
    titleEn: 'Inspection: Living Pharmacy guide — medicinal plants and cannabis in SUS',
    titleEs: 'Inspección: Guía Farmacia Viva — plantas medicinales y cannabis en el SUS',
    excerpt:
      'Resumo da Aula 5 XIV (Jaqueline): Farmácia Viva como política do SUS, Portaria 886/2010, modalidades e o lugar da cannabis na cadeia pública.',
    excerptEn:
      'XIV Lesson 5 summary (Jaqueline): Living Pharmacy as SUS policy, Ordinance 886/2010, modalities, and cannabis in the public chain.',
    excerptEs:
      'Resumen Aula 5 XIV (Jaqueline): Farmacia Viva como política del SUS, Portaria 886/2010, modalidades y el lugar del cannabis en la cadena pública.',
    slug: 'inspecao-guia-farmacia-viva',
    date: '2026-08-02T14:00:00.000Z',
    seriesOrder: 45,
    seriesLabel: 'Guia · Farmácia Viva · Aula 5',
    sourceUrl: L.xiv,
    body,
    contentEn,
    contentEs
  });
}

const GUIA_FARMACIA_VIVA_ITEMS = [
  {
    id: 'farmacia-viva',
    word: 'Farmácia Viva',
    simple:
      'Serviço exclusivo do SUS (Portaria 886/2010) de cultivo/orientação/processamento de plantas medicinais — Aula 5 XIV (Jaqueline Guimarães).',
    simpleEn: 'SUS-only service (Ordinance 886/2010) for cultivating/guiding/processing medicinal plants — XIV Lesson 5 (Jaqueline).',
    simpleEs: 'Servicio exclusivo del SUS (Portaria 886/2010) de cultivo/orientacion/procesamiento de plantas medicinales — Aula 5 XIV.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'portaria-886',
    word: 'Portaria 886',
    simple: 'Portaria MS/2010 que institui as Farmácias Vivas no âmbito federal — âncora normativa citada na Aula 5.',
    simpleEn: '2010 Ministry of Health ordinance creating Living Pharmacies federally — normative anchor cited in Lesson 5.',
    simpleEs: 'Portaria MS/2010 que instituye las Farmacias Vivas a nivel federal — ancla normativa citada en la Aula 5.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'renisus',
    word: 'RENISUS',
    simple:
      'Relação de plantas de interesse ao SUS para pesquisa/validação do saber tradicional — citada na Aula 5 (~71 espécies no discurso da aula).',
    simpleEn: 'List of plants of interest to SUS for research/validation of traditional knowledge — cited in Lesson 5.',
    simpleEs: 'Relación de plantas de interés al SUS para investigación/validación del saber tradicional — citada en la Aula 5.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'droga-vegetal',
    word: 'Droga vegetal',
    simple: 'Planta medicinal processada/preparada para uso — etapa da cadeia Farmácia Viva distinta do fitofármaco isolado.',
    simpleEn: 'Processed/prepared medicinal plant material — Living Pharmacy chain stage distinct from an isolated phytodrug.',
    simpleEs: 'Planta medicinal procesada/preparada — etapa de la cadena Farmacia Viva distinta del fitofármaco aislado.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'fitofarmaco',
    word: 'Fitofármaco',
    simple: 'Princípio activo vegetal isolado/padronizado — contraste com fitoterápico de planta inteira (rede XIV / Farmácia Viva).',
    simpleEn: 'Isolated/standardized plant active — contrast with whole-plant herbal medicine (XIV / Living Pharmacy network).',
    simpleEs: 'Principio activo vegetal aislado/estandarizado — contraste con fitoterápico de planta entera.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'orto-terapeutico',
    word: 'Orto terapêutico',
    simple: 'Horto de plantas medicinais ligado à Farmácia Viva / educação comunitária — modalidade tipo 1 no discurso da Aula 5.',
    simpleEn: 'Medicinal plant garden tied to Living Pharmacy / community education — type-1 modality in Lesson 5.',
    simpleEs: 'Huerto de plantas medicinales ligado a Farmacia Viva / educación comunitaria — modalidad tipo 1 en la Aula 5.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'francisco-matos',
    word: 'Francisco José de Abreu Matos',
    simple: 'Farmacologista da UFC, mentor do projecto Farmácias Vivas (1983) — citado na Aula 5 como origem da política.',
    simpleEn: 'UFC pharmacologist, mentor of the Living Pharmacies project (1983) — cited in Lesson 5 as policy origin.',
    simpleEs: 'Farmacólogo de la UFC, mentor del proyecto Farmacias Vivas (1983) — citado en la Aula 5.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  }
];

module.exports = {
  buildGuiaFarmaciaVivaPost,
  GUIA_FARMACIA_VIVA_ITEMS
};
