'use strict';

/**
 * Inspeção Palavras · néctar
 * Eixos: gr. néktar · suco da flor · ≠ néctar de gôndola ·
 * gatilho Nectar / Inectar · elo abelha · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/nectar-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/n%C3%A9ctar';
const WIKT_EN = 'https://en.wiktionary.org/wiki/nectar';

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

function buildNectarBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-nectar.html';
  const expr = '/posts/post-inspecao-expressao-nectar-dos-deuses.html';
  const abelha = '/posts/post-inspecao-animal-abelha.html';
  const fruto = '/posts/post-inspecao-palavra-fruto.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const derivados = '/biblioteca/inspecoes/#inspecoes-derivados';

  const body = `## Escopo

Inspeção editorial da palavra **[néctar](${self})**. Pedido de campo: *Nectar* · *Inectar*. O objecto botânico é o **suco açucarado da flor** — o que a [abelha](${abelha}) colhe. A expressão **[néctar dos deuses](${expr})** é **outra ficha** (mito / hipérbole). *Inectar* é lapso de **injetar**, não desta palavra.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · néctar](${WIKT}), [nectar](${WIKT_EN}). **Ficha ≠ receita de xarope, ≠ extração, ≠ rótulo de suco.** O «néctar» da gôndola (manga, uva, maracujá) é [derivado](${derivados}) industrial — outra sala. Sem afiliação comercial.

**Gatilho:** *Nectar* / *NECTAR* / *Inectar* → **néctar** (palavra) ou **injetar** (se a boca era *injectar*).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **néctar** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Gr. νέκταρ *néktar* (bebida dos deuses) → lat. *nectar* → PT **néctar** — confiança: **alta** |
| Família | *nectário* · *nectarina* · *nectarífero* |
| Tipo BudGanja | Palavra — suco da flor × ≠ caixa de suco × ≠ injetar |
| Elo vivo | [planta](${planta}) · [abelha](${abelha}) · [fruto](${fruto}) |
| Elo fala | [néctar dos deuses](${expr}) |
| Fonte | [néctar](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** a **secreção floral** que alimenta polinizadores. [A orelha cola](${orelhaCola}) mito, gôndola e *Inectar*. O étimo corta: primeiro a flor.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **néctar** | Suco de caixa | Suco da **flor** (e, depois, o mito) |
| **néctar (gôndola)** | O mesmo líquido | Bebida industrial adoçada — [derivado](${derivados}) |
| **[néctar dos deuses](${expr})** | Esta ficha | Expressão — hipérbole / mito; ficha irmã |
| **Inectar** | Variante de néctar | Lapso de **injetar** / *injectar* — **outra sala** (sem protocolo) |
| **nectarina** | Mini-néctar | Fruto (pêssego liso) — família de nome, não o suco da flor |

**H1:** néctar botânico = alimento da [abelha](${abelha}).  
**H2:** o grego já era bebida dos deuses — a expressão herda o mito; a palavra herda a **flor**.  
**H3:** caixa «néctar de uva» ≠ nectário.  
**H4:** *Inectar* não baptiza esta ficha.

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear o suco da flor e o nectário |
| Bom | Mandar o mito para [néctar dos deuses](${expr}) |
| Mau | Receita de extração ou de suco caseiro como se fosse a ficha |
| Mau | Fundir injetar com néctar porque a boca juntou |

Fecho: [Valeu !!!](${mantra}) — o suco da flor; o Olimpo na expressão.

## Status

**Aprovado na série Palavras** — *néctar* = flor; mito na [expressão](${expr}); *Inectar* lido como injetar.

[▶ Palavras](${hub}) · [▶ Néctar dos deuses](${expr}) · [▶ Abelha](${abelha}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **néctar**. Field: *Nectar* · *Inectar*. Botanical object = floral nectar (what the [bee](${abelha}) takes). The saying **[néctar dos deuses](${expr})** is a **sister sheet**. *Inectar* is a slip for **injetar**, not this word.

> **Method note:** [néctar](${WIKT}). Not a juice recipe.

## Object

| Field | Value |
|-------|-------|
| Word | **néctar** |
| Etymon | Gk. *néktar* → Lat. *nectar* |
| Not | carton “nectar” · inject · nectarine-as-the-same |
| Date | ${inspected} |

[Valeu !!!](${mantra})

## Status

**Approved in Words** — flower first; myth on the saying sheet.
`;

  const contentEs = `## Alcance

Inspección de **néctar**. Pedido: *Nectar* · *Inectar*. Objeto botánico = jugo de la flor. El dicho **[néctar dos deuses](${expr})** es ficha hermana. *Inectar* es lapsus de **injetar**.

> **Nota:** [néctar](${WIKT}). No es receta.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **néctar** |
| Étimo | gr. *néktar* |
| Fecha | ${inspected} |

[¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — flor primero; mito en la expresión.
`;

  return { body, contentEn, contentEs };
}

function buildNectarPost() {
  const { body, contentEn, contentEs } = buildNectarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-nectar', 227);
  return makePalavra({
    title: 'Inspeção: Néctar — o suco da flor, e o gatilho Nectar / Inectar',
    titleEn: 'Inspection: Néctar — flower juice, and the trigger Nectar / Inectar',
    titleEs: 'Inspección: Néctar — el jugo de la flor, y el gatillo Nectar / Inectar',
    excerpt:
      'Palavras: néctar (gr. néktar) — suco da flor; ≠ caixa de suco ≠ injetar; mito em néctar dos deuses; Valeu !!!',
    excerptEn:
      'Words: néctar (Gk. néktar) — floral nectar; ≠ juice carton ≠ inject; myth on nectar of the gods; Valeu !!!',
    excerptEs:
      'Palabras: néctar (gr. néktar) — jugo de la flor; ≠ néctar de caja ≠ inyectar; mito en néctar de los dioses; ¡Valeu !!!',
    slug: 'inspecao-palavra-nectar',
    date: '2026-08-22T18:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Néctar · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildNectarPost, buildNectarBodies };
