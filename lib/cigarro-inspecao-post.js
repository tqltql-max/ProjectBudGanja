'use strict';

/**
 * Inspeção Palavras · cigarro
 * Pedido: palavra Cigarro · relação com inseto cigarra.
 * ≠ charuto · ≠ incentivo ao fumo.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/cigarro-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/cigarro';
const WIKI = 'https://pt.wikipedia.org/wiki/Cigarro';
const WIKT_ES = 'https://en.wiktionary.org/wiki/cigarro';

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
  return `Cigarro não é cigarra.
Um pede fogo.
A outra pede verão.

A orelha cola o o no a.
O lab corta:
rolo industrial ≠ inseto que canta.

Valeu !!!
com a palavra no sítio,
sem acender o que a ficha só nomeia.`;
}

function buildCigarroBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-cigarro.html';
  const cigarra = '/posts/post-inspecao-palavra-cigarra.html';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const papel = '/posts/post-inspecao-palavra-papel-enrolar-tabaco.html';
  const cinzeiro = '/posts/post-inspecao-palavra-cinzeiro.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const isqueiro = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const orelha = '/posts/post-inspecao-palavra-orelha.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';

  const body = `## Escopo

Inspeção editorial da palavra **[cigarro](${self})** — no português do Brasil, o **rolo industrial** de [tabaco](${papel}) + papel + filtro (quando há). Pedido de campo: *inspeção da palavra Cigarro* · **relação com [inseto](${inseto}) [cigarra](${cigarra})**. Objecto: o **vocábulo e o produto nomeado** — não o manual de fumar.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · cigarro](${WIKT}), [Wikipédia · Cigarro](${WIKI}), [EN cigarro](${WIKT_ES}). **Ficha ≠ incentivo ao fumo, ≠ receita, ≠ campanha de marca.** Nomear o objecto e o [risco](${risco}) ≠ ensinar a acender. Sem afiliação à indústria do tabaco.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **cigarro** |
| Classe | Substantivo masculino |
| No BR | Quase sempre o **cigarette** industrial — não o [charuto](https://pt.wiktionary.org/wiki/charuto) |
| Étimo (trabalho) | Esp. *cigarro* — origem **disputada** (ver §3) |
| Tipo BudGanja | Palavra — produto × [fogo](${fogo}) × orelha com [cigarra](${cigarra}) |
| O que **não** é | [Cigarra](${cigarra}) (insecto) · charuto · [maconha](${maconha}) |
| Elo planta / papel | [papel de enrolar × tabaco](${papel}) |
| Elo utensílio | [cinzeiro](${cinzeiro}) · [isqueiro](${isqueiro}) · [objetos](${objetos}) |
| Elo aviso | [fogo](${fogo}) · [risco](${risco}) · [gesto](${gesto}) |
| Fonte | [cigarro](${WIKT}) · [WP](${WIKI}) |
| Data | ${inspected} |

**Objecto:** o **nome do rolo**. A [cigarra](${cigarra}) é o [inseto](${inseto}) que canta; a [orelha](${orelha}) cola as duas grafias ([a orelha cola…](${orelhaCola})).

## 2. Cigarro × cigarra × charuto

| Forma | Ofício | Corte |
|-------|--------|-------|
| **cigarro** | Rolo industrial de tabaco (BR) | Esta ficha |
| **[cigarra](${cigarra})** | Insecto (Cicadidae) — canto de verão | Uma letra: **o** × **a** |
| **charuto** | Folha enrolada sem o papel fino do cigarro de fábrica | Outro produto |
| **[tabaco](${papel})** | Planta / folha (*Nicotiana*) | Matéria, não o rolo pronto |

**H1:** no BR, *cigarro* aponta o **cigarette**, não o charuto.  
**H2:** *cigarro* / *cigarra* é **armadilha de orelha** — quase o mesmo corpo gráfico.  
**H3:** uma hipótese lexicográfica liga o esp. *cigarro* à *cigarra* pela **forma** do charuto (corpo alongado do insecto) — **média–baixa**; não fecha o étimo.  
**H4:** outra hipótese aponta via maia / contacto caribenho (*sikar* e afins) — **também disputada**.  
**H5:** fichar ≠ fumar; o [risco](${risco}) da combustão de tabaco industrial é **facto de saúde pública**, não tutorial.

## 3. Étimo — o que se pode dizer

A palavra chega ao PT pelo **espanhol *cigarro***. O passo anterior **não está fechado**:

| Hipótese | Leitura lab | Confiança |
|----------|-------------|-----------|
| **Forma da cigarra** | O charuto «parece» o corpo do insecto → esp. *cigarra* | Baixa–média (atractiva; não unânime) |
| **Via americana / maia** | Verbo ou nome de fumo no contacto colonial | Baixa–média (citada; debate) |
| **O que é sólido** | PT *cigarro* ← esp. *cigarro*; no BR = cigarette | Alta |

**Veredicto etimológico:** a **relação com a cigarra** é **orelha + hipótese de forma**, não identidade de objecto. O insecto fica na [ficha cigarra](${cigarra}).

## 4. Rede

| Ficha | Papel |
|-------|-------|
| [Cigarra](${cigarra}) | Insecto — a cola da [orelha](${orelha}) |
| [Orelha](${orelha}) · [orelha cola](${orelhaCola}) | Onde o *o* e o *a* fundem |
| [Inseto](${inseto}) | Classe do bicho (*inseito* → esta grafia) |
| [Papel × tabaco](${papel}) | Planta americana × mortalha |
| [Cinzeiro](${cinzeiro}) · [isqueiro](${isqueiro}) | Depois e antes do [fogo](${fogo}) |
| [Maconha](${maconha}) | Outra planta; por vezes o mesmo **gesto** de fumo — espécies distintas |

## 5. Limites

- Sem modo de enrolar, misturar ou «melhorar» o produto.  
- Sem publicidade de marca.  
- Cinza de cigarro ≠ adubo — ver [cinzeiro](${cinzeiro}).

\`\`\`poem
${poemPt()}
\`\`\`

## Status

**Aprovado** — **cigarro** = o rolo nomeado; **cigarra** = o [inseto](${inseto}). Fecho: [Valeu !!!](${mantra}) **sem acender a ficha**.

[▶ Palavras](${hub}) · [▶ Cigarra](${cigarra}) · [▶ Orelha](${orelha}) · [▶ Inseto](${inseto}) · [▶ Tabaco / papel](${papel}) · [▶ Cinzeiro](${cinzeiro}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**Cigarro** in Brazilian Portuguese is the industrial **cigarette**, not the cigar (*charuto*) and not the insect **[cigarra](${cigarra})** (cicada). Ear-trap: *cigarro* / *cigarra*. Etymon via Spanish *cigarro* is **disputed** (cicada-shape vs American contact). **Not** a smoking how-to.

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Cigarro** en BR es el **cigarrillo** industrial, no el puro (*charuto*) ni el insecto **[cigarra](${cigarra})**. Trampa de oído: *cigarro* / *cigarra*. Étimo vía esp. *cigarro* **discutido**. **No** es manual de fumar.

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildCigarroPost() {
  const { body, contentEn, contentEs, wiki } = buildCigarroBodies();
  return makePalavra({
    title: 'Inspeção: Cigarro — o rolo, a orelha e a cigarra',
    titleEn: 'Inspection: Cigarro — the roll, the ear, and the cicada',
    titleEs: 'Inspección: Cigarro — el rollo, el oído y la cigarra',
    excerpt:
      'Palavras: cigarro (BR = cigarette) ≠ cigarra (inseto) ≠ charuto; étimo disputado; Valeu !!!',
    excerptEn:
      'Words: cigarro (BR cigarette) ≠ cigarra (cicada) ≠ cigar; disputed etymon; Valeu !!!',
    excerptEs:
      'Palabras: cigarro (BR cigarrillo) ≠ cigarra (insecto) ≠ puro; étimo discutido; ¡Valeu !!!',
    slug: 'inspecao-palavra-cigarro',
    date: '2026-08-23T16:40:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-cigarro', 270),
    seriesLabel: 'Cigarro · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildCigarroPost, buildCigarroBodies };
