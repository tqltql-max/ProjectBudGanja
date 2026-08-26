'use strict';

/**
 * Inspeção Palavras · sorrir
 * Eixos: lat. subridēre ← sub- + ridēre · sorriso ·
 * elo na letra de Girassol (Cidade Negra) · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/sorrir-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/sorrir';
const WIKT_SORRISO = 'https://pt.wiktionary.org/wiki/sorriso';
const WIKT_LA = 'https://en.wiktionary.org/wiki/subrideo#Latin';
const WIKT_RIDERE = 'https://en.wiktionary.org/wiki/rideo#Latin';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildSorrirBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-sorrir.html';
  const girassol = '/posts/post-inspecao-arte-girassol.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[sorrir](${self})** — o verbo de **abrir o rosto** sem ser necessariamente o riso solto. Pedido de campo: *Inspeção na palavra Sorrir*, no mesmo ofício da letra de [Girassol](${girassol}) (Cidade Negra).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · sorrir](${WIKT}), [sorriso](${WIKT_SORRISO}), lat. [*subrīdeō*](${WIKT_LA}) / [*rīdeō*](${WIKT_RIDERE}). **Ficha ≠ protocolo de humor, ≠ letra colada.** Série [Palavras](${hub}). A canção cita o acto; esta página é o **vocábulo**.

**Gatilho:** *sorrir* / *sorriu* / *sorriso*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **sorrir** |
| Classe | Verbo |
| Étimo (trabalho) | lat. *subrīdēre* ← *sub-* + *rīdēre* («rir por baixo / um pouco») — confiança: **alta** |
| Família | *sorriso* · *sorridente* · *riso* · *rir* · esp. *sonreír* · fr. *sourire* · ing. *smile* |
| Tipo BudGanja | Palavra — [gesto](${gesto}) do rosto × [alegria](${alegria}) × letra de [Girassol](${girassol}) |
| Não é | *rir* (o riso cheio) · cartaz de [alegria](${alegria}) sem [gesto](${gesto}) |
| Elo canção | [Girassol](${girassol}) — na letra, o povo sorri em conjunto |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o verbo que marca a boca a **ceder para a luz** — menos do que gargalhada, mais do que pose. *Sorriso* é o **nome** do rasto; *sorrir* é o **acto**.

## Hipóteses e método

**H1:** *sorrir* < *subrīdēre* — rir *por baixo*, o meio-riso (alta).  
**H2:** *rir* é o irmão maior (*rīdēre*); [a orelha cola](${orelhaCola}) os dois; o étimo corta pela partícula *sub-*.  
**H3:** na [letra de Girassol](${girassol}), sorrir é **colectivo** (avenida) — não selfie.  
**H4:** [alegria](${alegria}) é o afecto; sorrir é o [gesto](${gesto}) visível.  
**H5:** fecho = [Valeu !!!](${mantra}).

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Rosto** | Ceder a boca, os olhos — [gesto](${gesto}) | Alta |
| **Afecto** | Marca da [alegria](${alegria}) ou do alívio leve | Alta |
| **Social** | Cumprimento, porta aberta | Alta |
| **Canção** | Povo que sorri — [Girassol](${girassol}) | Alta (mapa da letra, sem citação) |
| **Risco** | Sorriso vazio / pose | Média |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Cortar *sorrir* (verbo) × *sorriso* (nome) × *rir* (riso cheio) |
| Bom | Ler o sorrir da [canção](${girassol}) como rua, não como cartaz |
| Mau | Colar a letra da Cidade Negra nesta ficha |
| Mau | Prometer cura onde só há um [gesto](${gesto}) |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *deste* sorrir *hoje*.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Girassol](${girassol}) | Página da música — a letra pede este verbo |
| [Alegria](${alegria}) · [gesto](${gesto}) · [coração](${coracao}) · [vida](${vida}) | Afecto e ofício |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Mapa |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina performance nem terapia.  
- Não reproduz letra de canção.

## Status

**Aprovado na série Palavras** — *sorrir* fichado como *subrīdēre*; elo na [página de Girassol](${girassol}).

[▶ Palavras](${hub}) · [▶ Girassol](${girassol}) · [▶ Alegria](${alegria}) · [▶ Guia](${guia}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Inspection of Portuguese **sorrir** — to smile (Lat. *subrīdēre*). Field request with the lyric of [Girassol](${girassol}) (Cidade Negra). Verb first; *sorriso* is the noun. Not a humour protocol. Not a pasted lyric.

## Status

**Approved in Words** — *subrīdēre*; sister page [Girassol](${girassol}).

[▶ Girassol](${girassol}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **sorrir** — sonreír (lat. *subrīdēre*). Pedido junto a la letra de [Girassol](${girassol}). Verbo primero. No se pega la letra.

## Estado

**Aprobada en Palabras** — *subrīdēre*; ficha hermana [Girassol](${girassol}).

[▶ Girassol](${girassol}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildSorrirPost() {
  const { body, contentEn, contentEs } = buildSorrirBodies();
  const seriesOrder = pickOrder('inspecao-palavra-sorrir', 243);
  return makePalavra({
    title: 'Inspeção: Sorrir — o gesto do rosto; na letra de Girassol é colectivo',
    titleEn: 'Inspection: Sorrir — the face’s gesture; in Girassol it is collective',
    titleEs: 'Inspección: Sorrir — el gesto del rostro; en Girassol es colectivo',
    excerpt:
      'Palavras: sorrir ← lat. subrīdēre (sub- + rīdēre); sorriso é o nome; elo na canção Girassol (Cidade Negra); Valeu !!!',
    excerptEn:
      'Words: sorrir ← Lat. subrīdēre; sorriso is the noun; link to Cidade Negra’s Girassol; Valeu !!!',
    excerptEs:
      'Palabras: sorrir ← lat. subrīdēre; sorriso es el nombre; vínculo con Girassol; ¡Valeu !!!',
    slug: 'inspecao-palavra-sorrir',
    date: '2026-08-23T04:05:00.000Z',
    seriesOrder,
    seriesLabel: 'Sorrir · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildSorrirPost, buildSorrirBodies };
