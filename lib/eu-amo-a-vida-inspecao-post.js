'use strict';

/**
 * Inspeção Expressões · eu amo a vida
 * Alteração automática de Valeu !!! — o fecho nomeia o amor da vida.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');
const {
  VALEU_HREF,
  ALTERACAO_HREF,
  ALTERACAO_PT,
  ALTERACAO_EN,
  ALTERACAO_ES
} = require('./fecho-oficio.js');

const COVER = '/imagens/inspecoes/eu-amo-a-vida-cover.jpg';
const WIKI_AMAR = 'https://pt.wiktionary.org/wiki/amar';
const WIKI_VIDA = 'https://pt.wiktionary.org/wiki/vida';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(
      posts
        .filter((p) => p.series === 'expressoes-ditados')
        .map((p) => p.seriesOrder)
        .filter((n) => typeof n === 'number')
    );
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildEuAmoAVidaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const trilha = '/vida/';
  const self = ALTERACAO_HREF;
  const valeu = VALEU_HREF;
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const gratidao = '/posts/post-inspecao-palavra-gratidao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';

  const body = `## Escopo

Inspeção editorial da expressão **«[${ALTERACAO_PT}](${self})»** — pedido de campo: **alteração de [Valeu !!!](${valeu})**. Completamente **automática**: o render do lab, ao fechar com Valeu !!!, **já cola** este sopro. Não apaga Valeu !!!. Não substitui a ficha da palavra [vida](${vida}) nem a trilha [Vida](${trilha}). É o fecho a **mudar de eixo**: do obrigado leve para o **amor da vida**.

> **Nota metodológica:** auditoria independente. Fontes: [amar](${WIKI_AMAR}), [vida](${WIKI_VIDA}), [Valeu](${valeu}). **Ficha ≠ slogan, ≠ autoajuda, ≠ cartaz.** Sem afiliação. Tom: Inspetor BudGanja — *eu amo a vida* com [verdade](${verdade}), não pose.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **eu amo a vida** |
| Tipo | Frase de fecho — alteração automática de [Valeu !!!](${valeu}) |
| Peças | *eu* (presença) · *amo* ← lat. *amāre* · [vida](${vida}) ← lat. *vīta* |
| Forma viva | minúscula, sem acento a mais — o acento dificulta |
| Automático | Sim — cada ligação *Valeu !!!* ganha *eu amo a vida* no HTML |
| ≠ | Só a palavra [vida](${vida}) · trilha [Vida](${trilha}) · «amo a vida» vazio de cartaz |
| Elo mantra | [Valeu !!!](${valeu}) — reconhecimento; esta frase — amor da vida |
| Elo afecto | [coração](${coracao}) · [alegria](${alegria}) · [esperança](${esperanca}) · [Gratidão](${gratidao}) |
| Fonte | [amar](${WIKI_AMAR}) · [vida](${WIKI_VIDA}) |
| Data | ${inspected} |

**Objecto:** a frase que o lab **cola sozinha** depois de Valeu !!!. Valeu !!! diz «teve valor». **eu amo a vida** diz «fico com a vida». Os dois fecham o mesmo ofício.

## 2. Hipóteses

**H1:** esta frase é **alteração de fecho**, não troca da ficha-mãe [Valeu !!!](${valeu}).  
**H2:** o étimo do verbo é *amāre*; o da vida já está na [palavra vida](${vida}). A novidade é o **eu**.  
**H3:** automático = um sítio (\`lib/fecho-oficio.js\`) — não ir ficha a ficha.  
**H4:** sem [gesto](${gesto}) e [verdade](${verdade}), vira cartaz. Com presença, é ofício.

## 3. Valeu !!! × eu amo a vida

| Grito | O que nomeia | Automático |
|--------|--------------|------------|
| **[Valeu !!!](${valeu})** | Reconhecimento / obrigado leve | Ficha-mãe |
| **eu amo a vida** | Amor da vida em primeira pessoa | Cola depois do Valeu !!! no render |
| Os dois | Fecho vivo | Não se apagam |

**Não é:** apagar Valeu !!! (como *Faça o melhor* ficou voz antiga). **É:** alteração que **anda colada**.

## 4. Usos

| Uso | Bom × mau |
|-----|-----------|
| **Fechar ofício** | Bom: depois do gesto · Mau: no lugar da [verdade](${verdade}) |
| **Nomear a vida** | Bom: [vida](${vida}) com [coração](${coracao}) · Mau: slogan sem olhar |
| **Aprender** | Bom: glossário encontra a frase · Mau: fundir com a trilha [Vida](${trilha}) |

### Poema de ofício

\`\`\`poem
eu amo a vida.
Não apaga o Valeu !!!
Cola.
O obrigado leve fica.
O eu fica.
A vida — a palavra, não o cartaz —
fica no mesmo fecho.

Automático:
não ir de ficha em ficha.
Um sítio.
Duas frases.
O mesmo ofício.
\`\`\`

## Limites

- Não substitui [Valeu !!!](${valeu}) como ficha-mãe.  
- Não é a trilha [Vida](${trilha}) nem a [palavra vida](${vida}).  
- Automático no render; o lema Valeu !!! permanece no texto-fonte.

## Status

**Aprovada na série Expressões** — **eu amo a vida** é a **alteração automática** de [Valeu !!!](${valeu}).

[▶ Expressões](${hub}) · [▶ Valeu !!!](${valeu}) · [▶ Vida (palavra)](${vida}) · [▶ Palavras](${hubPalavras}) · [▶ Guia](${guia}) · [▶ Trilha Vida](${trilha})
`;

  const contentEn = `## Scope

Inspection of **“eu amo a vida”** — field request: an **automatic alteration of [Valeu !!!](${valeu})**. The renderer glues this breath onto every Valeu !!! link. It does **not** erase Valeu !!!. It does **not** replace the word [vida](${vida}).

> Not a slogan. Links: [Valeu !!!](${valeu}) · [vida](${vida}).

## Object

| Field | Value |
|-------|-------|
| Phrase | **eu amo a vida** (${ALTERACAO_EN}) |
| Automatic | Yes — \`lib/fecho-oficio.js\` |
| Date | ${inspected} |

**Verdict:** mother mantra stays; the close gains love of life by itself.

[▶ Valeu !!!](${valeu}) · [▶ Sayings](${hub})
`;

  const contentEs = `## Alcance

Inspección de **«eu amo a vida»** — pedido: **alteración automática de [¡Valeu !!!](${valeu})**. El render pega este soplo a cada enlace Valeu !!!. **No** borra Valeu !!!. **No** sustituye la palabra [vida](${vida}).

> No es eslogan. Vínculos: [¡Valeu !!!](${valeu}) · [vida](${vida}).

## Objeto

| Campo | Valor |
|-------|-------|
| Frase | **eu amo a vida** (${ALTERACAO_ES}) |
| Automático | Sí — \`lib/fecho-oficio.js\` |
| Fecha | ${inspected} |

**Veredicto:** el mantra madre queda; el cierre gana el amor de la vida solo.

[▶ ¡Valeu !!!](${valeu}) · [▶ Expresiones](${hub})
`;

  return { body, contentEn, contentEs, wiki: WIKI_AMAR };
}

function buildEuAmoAVidaPost() {
  const { body, contentEn, contentEs, wiki } = buildEuAmoAVidaBodies();
  const seriesOrder = pickOrder('inspecao-expressao-eu-amo-a-vida', 28);
  return expressaoPost({
    title: 'Inspeção: eu amo a vida — alteração automática de Valeu !!!',
    titleEn: 'Inspection: eu amo a vida — automatic alteration of Valeu !!!',
    titleEs: 'Inspección: eu amo a vida — alteración automática de Valeu !!!',
    excerpt:
      'Expressões: «eu amo a vida» — alteração automática de Valeu !!!; amar + vida; ≠ cartaz ≠ trilha /vida/; o render cola sozinho.',
    excerptEn:
      'Sayings: “eu amo a vida” — automatic alteration of Valeu !!!; love + life; ≠ slogan ≠ Vida trail; the renderer glues it.',
    excerptEs:
      'Dichos: «eu amo a vida» — alteración automática de Valeu !!!; amar + vida; ≠ cartel ≠ trama /vida/; el render la pega.',
    slug: 'inspecao-expressao-eu-amo-a-vida',
    date: '2026-08-23T03:20:00.000Z',
    seriesOrder,
    seriesLabel: 'eu amo a vida · expressão',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEuAmoAVidaPost,
  buildEuAmoAVidaBodies
};
