'use strict';

/**
 * Palavras · Marajó (ilha / arquipélago, PA).
 * Pedido: cidade Maraj — lapso; não é um município único.
 * Elo: mapa de Vamos Fugir (Gil / Skank).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/marajo-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Ilha_do_Maraj%C3%B3';
const WIKI_ARQ = 'https://pt.wikipedia.org/wiki/Arquip%C3%A9lago_do_Maraj%C3%B3';
const FUNDAJ = 'https://pesquisaescolar.fundaj.gov.br/pt-br/artigo/ilha-de-marajo/';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Marajó não é uma cidade.
É ilha no encontro do rio com o mar.

Maraj é o atalho da boca.
Marajoara é o gentílico.
Na canção, é um nome no mapa —
não o endereço do convite.

Valeu !!!
com a água nos dois lados,
sem fingir que Breves é o arquipélago inteiro.`;
}

function buildMarajoBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-marajo.html';
  const fugir = '/posts/post-inspecao-arte-vamos-fugir.html';
  const guapore = '/posts/post-inspecao-palavra-guapore.html';
  const ceuAzul = '/posts/post-inspecao-arte-ceu-azul.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[Marajó](${self})** — **ilha** fluviomarítima e **arquipélago** no estuário do Amazonas (**Pará**). Pedido de campo: *inspeção da cidade Maraj*. O lab declara: **Marajó não é uma cidade**. *Maraj* é rasto oral (acento / ó comidos). Na canção [Vamos Fugir](${fugir}) o nome entra como **topónimo no mapa**, ao lado de Irajá e [Guaporé](${guapore}) — destino-exemplo, não sede de prefeitura.

> **Nota metodológica:** auditoria independente. Fontes: [Ilha do Marajó](${WIKI}), [Arquipélago](${WIKI_ARQ}), [Fundaj](${FUNDAJ}). **Ficha ≠ guia turístico, ≠ roteiro de búfalo, ≠ inventário de 16 municípios.** Sem afiliação. População e área **mudam** nas fontes — confirmar IBGE / wiki.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Marajó** |
| Rasto de campo | *Maraj* · *Marajo* · *cidade Maraj* |
| O que **é** | Ilha costeira fluviomarítima + arquipélago (milhares de ilhas / ilhotas) |
| O que **não** é | Um único município chamado Marajó · [Céu Azul](${ceuAzul}) · Irajá |
| Estado | **Pará** (arquipélago também toca o Amapá nas fontes do conjunto maior) |
| Gentílico | **marajoara** |
| Étimo (trabalho) | Hipótese frequente: tupi *Mibaraió* / «anteparo do mar» / tapamar — confiança: **média** (Fundaj; várias grafias) |
| Tipo BudGanja | Palavra — lugar × mapa da canção × corte «cidade» |
| Elo | [Vamos Fugir](${fugir}) · [Guaporé](${guapore}) · [água](${agua}) · [mar](${mar}) · [caminho](${caminho}) |
| Fonte | [Ilha](${WIKI}) |
| Data | ${inspected} |

**Objecto:** o **nome do chão** que a boca reduziu a *Maraj*. Inspecionar Marajó = não deixar a canção virar folheto, nem o folheto apagar que **Breves**, Soure, Salvaterra… são **cidades na ilha**, não sinónimos da ilha.

## 2. Cidade × ilha × arquipélago

| Forma | Ofício |
|-------|--------|
| **ilha do Marajó** | A grande ilha (~40 mil km² nas fontes correntes) — Amazonas + Atlântico + baía |
| **arquipélago do Marajó** | Conjunto maior (APA / dezenas de municípios nas fontes de integração) |
| **«cidade Marajó»** | Lapso — **não há** esse município |
| **Breves** | Sede mais populosa da ilha (Censo 2022 nas fontes) — **uma** cidade |
| **Soure / Salvaterra** | Outras sedes (turismo citado) — **não** são «o Marajó» |

**H1:** *Maraj* = **Marajó**.  
**H2:** pedir «a cidade» pede **qual município**; o lab não escolhe uma sede como âncora turística.  
**H3:** na [canção](${fugir}), Marajó é **um nome entre outros** — qualquer outro lugar ao [sol](${sol}).

## 3. No mapa de Vamos Fugir

Irajá (Rio) · **Marajó** (Pará) · [Guaporé](${guapore}) (rio / RS). Três salas do Brasil no mesmo convite. O ofício da ficha-lugar é **geografia**; o ofício da ficha-canção é **não colar a letra**.

## 4. Cultura (rasto, não vitrine)

Cerâmica **marajoara**, campos alagados, búfalos: factos de mapa. Esta ficha **não** vende passeio nem receita.

\`\`\`poem
${poemPt()}
\`\`\`

## Status

**Aprovado** — **Marajó** = ilha / arquipélago; *cidade Maraj* = lapso; elo [Vamos Fugir](${fugir}). [Valeu !!!](${mantra})

[▶ Palavras](${hub}) · [▶ Vamos Fugir](${fugir}) · [▶ Guaporé](${guapore}) · [▶ Caminho](${caminho}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**Marajó** is an island / archipelago in Pará, **not** a single city. Field slip *Maraj* / *cidade Maraj*. In [Vamos Fugir](${fugir}) it is a **place-name** on the map, beside Irajá and [Guaporé](${guapore}).

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Marajó** es isla / archipiélago en Pará, **no** una sola ciudad. Lapsus *Maraj*. En [Vamos Fugir](${fugir}) es **topónimo**, junto a Irajá y [Guaporé](${guapore}).

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildMarajoPost() {
  const { body, contentEn, contentEs, wiki } = buildMarajoBodies();
  return makePalavra({
    title: 'Inspeção: Marajó — ilha, não «cidade Maraj»',
    titleEn: 'Inspection: Marajó — an island, not “the city of Maraj”',
    titleEs: 'Inspección: Marajó — isla, no «ciudad Maraj»',
    excerpt:
      'Palavras: Marajó (PA) ≠ uma cidade; Maraj = lapso; elo Vamos Fugir × Guaporé; Valeu !!!',
    excerptEn:
      'Words: Marajó (PA) ≠ one city; Maraj = slip; link Vamos Fugir × Guaporé; Valeu !!!',
    excerptEs:
      'Palabras: Marajó (PA) ≠ una ciudad; Maraj = lapsus; elo Vamos Fugir × Guaporé; ¡Valeu !!!',
    slug: 'inspecao-palavra-marajo',
    date: '2026-08-23T18:12:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-marajo', 276),
    seriesLabel: 'Marajó · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildMarajoPost, buildMarajoBodies };
