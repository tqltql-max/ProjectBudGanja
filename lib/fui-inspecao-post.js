'use strict';

/**
 * Inspeção Palavras · fui
 * Eixos: pretérito de ir e de ser (mesma forma) · gíria «Fui!» (saí) ·
 * cluster Deus → A Deus!!! → fui · ≠ ando/indo/vindo/voltando ·
 * ≠ passado (o nome) · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/fui-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/fui';
const WIKT_IR = 'https://pt.wiktionary.org/wiki/ir';
const WIKT_SER = 'https://pt.wiktionary.org/wiki/ser';

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

function poemPt() {
  return `Fui.
Uma forma, dois verbos:
ir e ser.
O mesmo som para
ter andado
e ter sido.

Na rua: Fui!
Não explica o étimo.
Declara a porta.
O corpo saiu.

A Deus!!! encomenda.
Fui parte.
Dois ofícios de saída.

Valeu !!!
já do outro lado
da soleira.`;
}

function poemEn() {
  return `Fui.
One form, two verbs:
to go and to be.
The same sound for
having walked
and having been.

In the street: Fui!
It does not explain the etymon.
It declares the door.
The body left.

A Deus!!! commends.
Fui departs.
Two crafts of leaving.

Valeu !!!
already on the other side
of the threshold.`;
}

function poemEs() {
  return `Fui.
Una forma, dos verbos:
ir y ser.
El mismo sonido para
haber andado
y haber sido.

En la calle: ¡Fui!
No explica el étimo.
Declara la puerta.
El cuerpo salió.

A Deus!!! encomienda.
Fui parte.
Dos oficios de salida.

¡Valeu !!!
ya del otro lado
del umbral.`;
}

function buildFuiBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubExpr = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-fui.html';
  const deus = '/posts/post-inspecao-palavra-deus.html';
  const adeus = '/posts/post-inspecao-expressao-adeus.html';
  const passado = '/posts/post-inspecao-palavra-passado.html';
  const seq = '/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[fui](${self})** — 1.ª pessoa do pretérito de **ir** e de **ser** (a mesma forma). Pedido de campo: o fecho do cluster **[Deus](${deus}) → [A Deus!!!](${adeus}) → fui**, e a gíria de saída **«Fui!»**. Não é a ficha do [passado](${passado}) (o nome do tempo decorrido) nem o loop [ando, indo, vindo, voltando](${seq}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · fui](${WIKT}), [ir](${WIKT_IR}), [ser](${WIKT_SER}). **Ficha ≠ conjugação escolar completa, ≠ protocolo de ghosting.** Objecto = a **forma viva**. Série [Palavras](${hub}).

**Gatilho:** *fui* / *Fui!* / *já fui*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **fui** |
| Classe | Forma verbal (pretérito perfeito, 1.ª pess. sing.) |
| Étimo (trabalho) | lat. *fuī* — pretérito de *esse* / *fu-* («ser / ter sido»); no PT serve também **ir** (supletivismo) — confiança: **alta** |
| Família | *foste* · *foi* · *fomos* · *foram* · *ir* · *ser* · esp. *fui* · it. *fui* |
| Tipo BudGanja | Palavra — pretérito × gíria de porta |
| Não é | [passado](${passado}) (substantivo) · [ando, indo, vindo, voltando](${seq}) (loop que não pousa) · [A Deus!!!](${adeus}) (encomenda com o nome) |
| Cluster | [Deus](${deus}) (o nome) · [A Deus!!!](${adeus}) (a encomenda) · **fui** (o corpo sai) |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** uma forma que no português **já foi** duas coisas: *eu fui ao mercado* (ir) e *eu fui professor* (ser). Na rua, **Fui!** corta a sala: saí.

## Hipóteses e método

**H1:** *fui* < lat. *fuī* — o radical *fu-* de *ser*; *ir* toma de empréstimo a mesma pessoa (alta).  
**H2:** a gíria **Fui!** é [gesto](${gesto}) de saída — não precisa de conjugação na lousa.  
**H3:** [A Deus!!!](${adeus}) encomenda; **fui** declara o corpo fora. Mesmo ofício de porta, peças distintas.  
**H4:** [ando, indo, vindo, voltando](${seq}) é o loop que **não** diz *fui* — gerúndio sem ponto.  
**H5:** [passado](${passado}) nomeia o tempo; *fui* é uma **forma** dentro desse tempo.  
**H6:** fecho = [Valeu !!!](${mantra}).

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Ir** | Eu andei / parti (pretérito) | Alta |
| **Ser** | Eu fui aquilo (pretérito) | Alta |
| **Gíria** | Fui! — estou fora | Alta |
| **Cluster** | Terceira peça: depois do nome e da encomenda, o corpo | Alta |
| **Risco** | Usar *Fui!* para sumir sem corte claro | Média |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Cortar *fui* (ir) × *fui* (ser) × *Fui!* (gíria) |
| Bom | Ler o cluster: [Deus](${deus}) nomeia · [A Deus!!!](${adeus}) encomenda · **fui** sai |
| Mau | Colar nesta ficha o loop [ando, indo…](${seq}) |
| Mau | Tratar *fui* como sinónimo do substantivo [passado](${passado}) |

## O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Deus](${deus}) · [A Deus!!!](${adeus}) | Cluster — nome e encomenda |
| [passado](${passado}) | O nome do tempo — não esta forma |
| [ando, indo, vindo, voltando](${seq}) | O loop que *fui* corta |
| [gesto](${gesto}) · [vida](${vida}) · [língua portuguesa](${lingua}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |
| [Guia](${guia}) | Mapa |

## Limites

- Não substitui tabela de verbos.  
- Não ensina a desaparecer de conversas.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — *fui* fichado como *fuī* (ir e ser) e como gíria de saída; fecha o cluster com [Deus](${deus}) e [A Deus!!!](${adeus}).

[▶ Palavras](${hub}) · [▶ Expressões](${hubExpr}) · [▶ Deus](${deus}) · [▶ A Deus!!!](${adeus}) · [▶ Valeu !!!](${mantra}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Inspection of Portuguese **fui** — 1st person preterite of **ir** (to go) and **ser** (to be), same form. Slang **“Fui!”** = I’m out. Cluster **[Deus](${deus}) → [A Deus!!!](${adeus}) → fui**. Distinct from [passado](${passado}) (the noun) and from [ando, indo, vindo, voltando](${seq}) (the loop).

## Status

**Approved in Words** — *fuī*; slang exit; sisters [Deus](${deus}) and [A Deus!!!](${adeus}).

[▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **fui** — 1.ª persona del pretérito de **ir** y de **ser** (la misma forma). Jerga **«¡Fui!»** = me fui. Clúster **[Deus](${deus}) → [A Deus!!!](${adeus}) → fui**. Distinto de [passado](${passado}) y de [ando, indo, vindo, voltando](${seq}).

## Estado

**Aprobada en Palabras** — *fuī*; salida de jerga; hermanas [Deus](${deus}) y [A Deus!!!](${adeus}).

[▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildFuiPost() {
  const { body, contentEn, contentEs } = buildFuiBodies();
  const seriesOrder = pickOrder('inspecao-palavra-fui', 245);
  return makePalavra({
    title: 'Inspeção: fui — pretérito de ir e de ser; na rua, Fui!',
    titleEn: 'Inspection: fui — preterite of to go and to be; in the street, Fui!',
    titleEs: 'Inspección: fui — pretérito de ir y de ser; en la calle, ¡Fui!',
    excerpt:
      'Palavras: fui ← lat. fuī (ir e ser); gíria Fui! = saí; cluster Deus / A Deus!!!; ≠ passado; Valeu !!!',
    excerptEn:
      'Words: fui ← Lat. fuī (to go and to be); slang Fui! = I’m out; cluster Deus / A Deus!!!; ≠ passado; Valeu !!!',
    excerptEs:
      'Palabras: fui ← lat. fuī (ir y ser); jerga ¡Fui! = me fui; clúster Deus / A Deus!!!; ≠ passado; ¡Valeu !!!',
    slug: 'inspecao-palavra-fui',
    date: '2026-08-23T16:42:00.000Z',
    seriesOrder,
    seriesLabel: 'Fui · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildFuiPost, buildFuiBodies, poemPt, poemEn, poemEs };
