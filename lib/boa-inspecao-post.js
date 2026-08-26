'use strict';

/**
 * Inspeção Palavras · Boa!!!
 * Variação viva de Valeu !!! — aprovação / fecho quente BR.
 * Étimo: bom ← lat. bonus. ≠ jiboia. ≠ só «boa noite».
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/boa-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/bom';
const WIKI_BONUS = 'https://en.wiktionary.org/wiki/bonus#Latin';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildBoaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-boa.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const gratidao = '/posts/post-inspecao-palavra-gratidao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const prosseguir = '/posts/post-inspecao-palavra-prosseguir.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = valeu;

  const body = `## Escopo

Inspeção editorial da interjeição **[Boa!!!](${self})** — pedido de campo: **variação de [Valeu !!!](${valeu})**. No BR oral, **boa** (de *bom* ← lat. *bonus*) vira **aprovação quente** e **fecho**: «Boa!», «Boa, fechou», **Boa!!!**. Não substitui Valeu !!! — **anda ao lado**. Três exclamações = o mesmo calor de ofício.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · bom](${WIKI}), [bonus (lat.)](${WIKI_BONUS}), ficha [Valeu](${valeu}). **Ficha ≠ elogio vazio, ≠ marca, ≠ a cobra *boa*.** Tom: Inspetor BudGanja — *Boa!!!* como sopro de **sim** depois do gesto.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **boa** |
| Grito de ofício | **Boa!!!** — mesma pontuação viva de [Valeu !!!](${valeu}) |
| Classe | Interjeição / adjectivo lexicalizado (*bom*, fem. *boa*) |
| Étimo (trabalho) | Lat. *bonus* «bom» → PT *bom* / *boa* → interjeição BR de aprovação — confiança **alta** |
| Família | *bom* · *boa* · *bonito* · *bondade* · *boa!!!* · *boa, fechou* |
| Falsos irmãos | *boa* (jiboia) · *boa noite* (saudação) · *boa* só como adjectivo de qualidade |
| Tipo BudGanja | Palavra — aprovação × fecho × variação de Valeu !!! |
| Elo mantra | [Valeu !!!](${valeu}) — irmã: reconhecimento (*valeu*) × aprovação (*boa*) |
| Elo gratidão | [Gratidão](${gratidao}) · [gesto](${gesto}) · [respeito](${respeito}) |
| Elo tom | [aff](${aff}) · [já](${ja}) · [verdade](${verdade}) · [prosseguir](${prosseguir}) |
| Fonte | [bom](${WIKI}) · [bonus](${WIKI_BONUS}) |
| Data | ${inspected} |

**Objecto:** o **sim** curto depois do ofício. Valeu !!! diz «teve valor». **Boa!!!** diz «saiu bem». Os dois fecham; não se fundem.

## 2. Hipóteses

**H1:** *Boa!!!* é **variação funcional** de [Valeu !!!](${valeu}) — mesmo ofício de fecho, outro eixo (aprovação ≠ gratidão).  
**H2:** o étimo é *bonus* / *bom*, não *valer*. Irmãs de uso, não de raiz.  
**H3:** três exclamações são **o mesmo calor gráfico** do lab — não gritaria vazia.  
**H4:** sem [verdade](${verdade}), *Boa!!!* vira palmadinha. Com presença, é [gesto](${gesto}).

## 3. Valeu !!! × Boa!!!

| Grito | O que nomeia | Quando |
|--------|--------------|--------|
| **[Valeu !!!](${valeu})** | Reconhecimento / obrigado leve | Houve [gesto](${gesto}) a agradecer |
| **Boa!!!** | Aprovação / «saiu» | Houve ofício que **deu certo** |
| Os dois | Fecho quente BR | Podem seguir-se: *Boa!!!* · *Valeu !!!* |

**Não é:** *boa* a cobra. **Não é:** só cumprimento (*boa tarde*). **Não é:** substituição que apaga Valeu !!!.

## 4. Usos no português do Brasil

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Aprovar** | «Boa!!!» | Bom: o ofício saiu · Mau: palmadinha sem olhar |
| **Fechar** | «Boa, fechou» | Bom: [prosseguir](${prosseguir}) · Mau: cortar a [verdade](${verdade}) |
| **Par de Valeu** | «Boa!!! Valeu !!!» | Bom: aprovação + gratidão · Mau: spam de exclamações |
| **Saudação** | «Boa noite» | **Outro** ofício — cumprimento, não este grito |
| **Animal** | jiboia / *boa* | Falso irmão — não esta ficha |

## 5. Rede

| Recurso | Relação |
|---------|---------|
| **[Valeu !!!](${valeu})** | Mantra-mãe; Boa!!! é variação |
| [Gratidão](${gratidao}) · [gesto](${gesto}) · [respeito](${respeito}) | O que se reconhece |
| [Já](${ja}) · [prosseguir](${prosseguir}) | Fechar e seguir |
| [Aff](${aff}) | Quase oposto — peso vs alívio |
| [língua portuguesa](${lingua}) · [Guia](${guia}) · [Vida](${vida}) | Mapa |

## Limites

- Não apaga [Valeu !!!](${valeu}).  
- Informal ≠ desrespeito.  
- Ficha de oralidade, não de elogio corporativo.

## Status

**Aprovado** — **Boa!!!** fichada como **variação de [Valeu !!!](${valeu})**: aprovação quente, étimo *bonus*, ≠ cobra ≠ saudação. Fecho: **Boa!!!** · [Valeu !!!](${valeu}).

[▶ Palavras](${hub}) · [▶ Valeu !!!](${valeu}) · [▶ Gratidão](${gratidao}) · [▶ Gesto](${gesto}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Brazilian **Boa!!!** — field request: a **variation of [Valeu !!!](${valeu})**. From *bom* ← Lat. *bonus*: warm **approval** and close. Does **not** replace Valeu !!! — walks beside it.

> Not empty praise, not the snake *boa*, not only “good evening”. Links: [Valeu !!!](${valeu}) · [Gratidão](${gratidao}).

## Object

| Field | Value |
|-------|-------|
| Cry | **Boa!!!** |
| Etymon | Lat. *bonus* → PT *bom* / *boa* — **high** confidence |
| vs Valeu !!! | Approval («it landed») × thanks («it had value») |
| Date | ${inspected} |

**Verdict:** sister close; [Valeu !!!](${valeu}) remains the mother mantra.

[▶ Valeu !!!](${valeu}) · [▶ Words](${hub})
`;

  const contentEs = `## Alcance

Inspección de **Boa!!!** — pedido: **variación de [¡Valeu !!!](${valeu})**. De *bom* ← lat. *bonus*: **aprobación** cálida y cierre. **No** sustituye Valeu !!! — camina al lado.

> No es elogio vacío, ni la serpiente *boa*, ni solo «buenas noches».

## Objeto

| Campo | Valor |
|-------|-------|
| Grito | **Boa!!!** |
| Étimo | Lat. *bonus* → PT *bom* / *boa* |
| vs Valeu !!! | Aprobación × gratitud |
| Fecha | ${inspected} |

**Veredicto:** cierre hermano; [¡Valeu !!!](${valeu}) sigue siendo el mantra madre.

[▶ ¡Valeu !!!](${valeu}) · [▶ Palabras](${hub})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildBoaPost() {
  const { body, contentEn, contentEs, wiki } = buildBoaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-boa', 221);
  return makePalavra({
    title: 'Inspeção: Boa!!! — variação quente de Valeu !!!',
    titleEn: 'Inspection: Boa!!! — warm variation of Valeu !!!',
    titleEs: 'Inspección: Boa!!! — variación cálida de Valeu !!!',
    excerpt:
      'Palavras: Boa!!! — variação de Valeu !!!; aprovação BR (bom ← bonus); ≠ cobra ≠ saudação; Valeu !!!',
    excerptEn:
      'Words: Boa!!! — variation of Valeu !!!; BR approval (bom ← bonus); ≠ snake ≠ greeting; Valeu !!!',
    excerptEs:
      'Palabras: Boa!!! — variación de Valeu !!!; aprobación BR (bom ← bonus); ≠ serpiente ≠ saludo; ¡Valeu !!!',
    slug: 'inspecao-palavra-boa',
    date: '2026-08-23T03:12:00.000Z',
    seriesOrder,
    seriesLabel: 'Boa!!! · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildBoaPost,
  buildBoaBodies
};
