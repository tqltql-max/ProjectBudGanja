'use strict';

/**
 * Inspeção Palavras · Oito / 8
 * Cardinal octō · oito em pé da lemniscata · tecla 8 × símbolo *
 * ≠ asterisco ≠ aula 8 ≠ eternidade
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/oito-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/oito';

function buildOitoBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-oito.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const emPe = '/posts/post-inspecao-expressao-em-pe.html';
  const par = '/posts/post-inspecao-expressao-em-pe-e-deitado.html';
  const elo = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const lemniscata = '/posts/post-inspecao-palavra-lemniscata.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const tudo = '/posts/post-inspecao-palavra-tudo.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const letraX = '/posts/post-inspecao-palavra-letra-x.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const aula8 = '/biblioteca/unifesp/livro-xiv.html#aula-8';
  const asterisco = '/posts/post-inspecao-palavra-asterisco.html';
  const asterix = '/posts/post-inspecao-desenho-asterix-e-obelix.html';
  const wikiOcto = 'https://en.wiktionary.org/wiki/octo#Latin';
  const wikiAst = 'https://en.wiktionary.org/wiki/asterisk';
  const wikiInf = 'https://en.wikipedia.org/wiki/Infinity_symbol';

  const body = `## Escopo

Inspeção editorial da palavra **[oito](${self})** — o cardinal **8**. Pedido de campo: **elo infinito de ligação**, **símbolo** (*simbuklo* → símbolo) e o algarismo **8**. O **8** é o mesmo traço da [lemniscata](${lemniscata}) **[em pé](${emPe})**. O **∞** é o oito **deitado**. O **cruzamento** é o [elo de ligação](${elo}). O **\\*** (asterisco) mora na **mesma tecla** (Shift+8) — **outra sala**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · oito](${WIKI}), lat. [*octō*](${wikiOcto}), [asterisk](${wikiAst}), [infinity symbol](${wikiInf}). **Ficha ≠ numerologia, ≠ misticismo do ∞, ≠ manual de teclado, ≠ aula 8 como se o número fosse a professora.** Sem afiliação. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *8* / *oito* / *símbolo \\** / *simbuklo* / *elo infinito* → **oito** (cardinal) · postura em [em pé](${emPe}) · cruzamento em [elo de ligação](${elo}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **oito** |
| Algarismo | **8** |
| Classe | Numeral cardinal |
| Étimo | Lat. *octō* «oito» — confiança: **alta** |
| Tipo BudGanja | Palavra-número — cardinal × oito em pé da fita |
| Postura da fita | **8** = [em pé](${emPe}) · **∞** = [em pé e deitado](${par}) · cruzamento = [elo](${elo}) |
| Tecla irmã | **\\*** (asterisco) — Shift+8 · **não** é o elo |
| Elo irmão | [três](${tres}) (outro cardinal, outro ofício) |
| Data | ${inspected} |

**O que é o objecto:** o **dois×quatro** da fala — e, neste circuito, o **oito erguido**: a mesma curva que, deitada, se chama infinito.

## 2. Salas (cortar, não fundir)

| Sala | O que é | O que **não** é esta ficha |
|------|---------|----------------------------|
| **Cardinal 8** | *octō* → oito | O núcleo numeral |
| **8 em pé** | [Em pé](${emPe}) — comunicação cima↔baixo | A **postura**; o nome fica lá |
| **∞ deitado** | [Em pé e deitado](${par}) | O par; não o algarismo sozinho |
| **Cruzamento** | [Elo de ligação](${elo}) | O anel que junta; **não** o 8 |
| **Nome da curva** | [Lemniscata](${lemniscata}) | A fita; não o dígito |
| **\\* asterisco** | [Asterisco](${asterisco}) — gr. *asterískos*; Shift+8 | **Mesma tecla, outro símbolo** · ≠ [Asterix](${asterix}) |
| **Aula 8** | [8.ª aula XIV](${aula8}) (Kassia) | O **número da aula** rima com o 8 em pé; **não** é o étimo |
| **Outubro / octógono / polvo** | Família *octō* | Cognatos; **não** o objecto desta ficha |
| **Sorte chinesa do 8** | Folclore | Outra sala |

**H1:** *oito* = *octō*. **8** é o mesmo objecto em algarismo.  
**H2:** o **8** gráfico é a [lemniscata](${lemniscata}) [em pé](${emPe}); o ∞ é a mesma fita deitada.  
**H3:** o [elo de ligação](${elo}) é o **cruzamento**, não o cardinal.  
**H4:** **\\*** não é infinito. É [asterisco](${asterisco}). *Simbuklo* endereça **símbolo**, não o glifo. Asterix é [desenho](${asterix}).  
**H5:** a [aula 8](${aula8}) **usa** o oito em pé; **não** baptiza o numeral.

## 3. O 8 × o \\* × o ∞

| Marca | Tecla / traço | Ofício no lab |
|-------|---------------|---------------|
| **8** | Tecla 8 | Cardinal · oito **em pé** |
| **∞** | 8 deitado | Nome do sem-fim — [par](${par}) |
| **cruzamento** | Ponto das duas voltas | [Elo de ligação](${elo}) |
| **\\*** | Shift+8 | Asterisco — coringas e notas · **sala cortada** |

O ouvido pediu **símbolo \\***. O teclado BR põe o **\\*** em cima do **8**. A orelha cola. O ofício **corta**: o símbolo do infinito é a [lemniscata](${lemniscata}); o asterisco é outra estrela.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Oito** | Sorte, octógono, aula | Cardinal *octō* |
| **8** | Religião do número | Algarismo + postura da fita |
| **Elo infinito** | Esta ficha sozinha | [Elo de ligação](${elo}) + [em pé](${emPe}) + esta palavra |
| **Símbolo \\*** | O ∞ | Asterisco · mesma tecla |
| **Aula 8** | Prova de que 8 = SEC | Número de ordem da aula |

## 5. Rede BudGanja (só fichas existentes)

| Ficha | Relação |
|-------|---------|
| [Em pé](${emPe}) | O **oito erguido** — postura, não cardinal |
| [Em pé e deitado](${par}) | O **∞** — a fita deitada |
| [Elo de ligação](${elo}) | O **cruzamento** · gatilho *simbuklo* |
| [Lemniscata](${lemniscata}) | O **nome** da curva |
| [Três](${tres}) | Irmão cardinal — outro ofício |
| [Sinal](${sinal}) · [gesto](${gesto}) · [caminho](${caminho}) | Marca · rodar a fita · vai-e-vem |
| [Ligar × desligar](${ligar}) · [letra X](${letraX}) | Circuito · x de nexo — **não** o \\* |
| [Tudo](${tudo}) | O infinito **não** cabe nesta ficha |
| [Língua portuguesa](${lingua}) · [verdade](${verdade}) | Solo · corte |
| [Valeu !!!](${mantra}) | Fechar no 8 em pé, sem estrela de teclado |

## 6. Poema

\`\`\`poem
Oito.
Não é a estrela da tecla.
Não é a aula a fingir-se número.
Não é o anel sozinho.

É o cardinal que, em pé,
vira caminho:
cima fala com baixo.

Deitado chama-se infinito.
No cruzamento chama-se elo.
No Shift chama-se asterisco —
e essa sala não entra.

Valeu !!!
oito em pé,
sem colar o * no ∞.
\`\`\`

## Limites

- Não ensina numerologia nem sorte.  
- Não afirma que Kassia pronunciou *oito* como lema.  
- Não funde asterisco, aula 8 e elo numa só peça.

## Status

**Aprovado** — **oito** / **8** fichado como cardinal (*octō*) e **oito em pé** da [lemniscata](${lemniscata}); **\\*** cortado (Shift+8); cruzamento em [elo de ligação](${elo}); postura em [em pé](${emPe}). Fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Em pé](${emPe}) · [▶ Elo de ligação](${elo}) · [▶ Lemniscata](${lemniscata}) · [▶ Três](${tres}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **oito** (digit **8**). Field: infinite connecting link, **symbol** (*simbuklo* → símbolo), and **8**. Standing **8** is the [lemniscate](${lemniscata}) [upright](${emPe}). **∞** is the eight lying down. The **crossing** is the [connecting link](${elo}). **\\*** (asterisk) sits on the **same key** (Shift+8) — **another room**.

> Independent audit. **Not** numerology, **not** a keyboard manual. Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Word | **oito** · **8** |
| Path | Lat. *octō* |
| Upright | [em pé](${emPe}) |
| Crossing | [elo de ligação](${elo}) |
| Cut | asterisk **\\*** |
| Date | ${inspected} |

## Verdict

**Approved** — cardinal + standing eight; asterisk cut; crossing stays on the link sheet.

[▶ Words](${hub}) · [▶ Standing](${emPe}) · [▶ Connecting link](${elo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **oito** (dígito **8**). Pedido: eslabón infinito, **símbolo** (*simbuklo* → símbolo) y **8**. El **8** de pie es la [lemniscata](${lemniscata}) [erguida](${emPe}). **∞** es el ocho acostado. El **cruce** es el [eslabón de ligación](${elo}). **\\*** (asterisco) vive en la **misma tecla** (Shift+8) — **otra sala**.

> Auditoría independiente. **No** numerología. Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **oito** · **8** |
| Étimo | lat. *octō* |
| De pie | [em pé](${emPe}) |
| Cruce | [elo de ligação](${elo}) |
| Corte | asterisco **\\*** |
| Fecha | ${inspected} |

## Veredicto

**Aprobado** — cardinal + ocho de pie; asterisco cortado; el cruce queda en la ficha del eslabón.

[▶ Palabras](${hub}) · [▶ De pie](${emPe}) · [▶ Eslabón](${elo}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildOitoPost() {
  const { body, contentEn, contentEs, wiki } = buildOitoBodies();
  let seriesOrder = 290;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-oito');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts
          .filter((p) => p.series === 'palavras-origem')
          .map((p) => p.seriesOrder)
          .filter((n) => typeof n === 'number')
      );
      const max = taken.size ? Math.max(...taken) : 289;
      seriesOrder = max + 1;
    }
  } catch (_) {
    /* keep 290 */
  }

  return makePalavra({
    title: 'Inspeção: Oito — o 8 em pé, o ∞ deitado e o * que não é elo',
    titleEn: 'Inspection: Oito — standing 8, lying ∞, and the * that is not the link',
    titleEs: 'Inspección: Oito — el 8 de pie, el ∞ acostado y el * que no es eslabón',
    excerpt:
      'Palavras: «oito» / 8 — lat. octō; oito em pé da lemniscata; ∞ deitado; cruzamento = elo de ligação; * (Shift+8) é asterisco, outra sala; Valeu !!!',
    excerptEn:
      'Words: “oito” / 8 — Lat. octō; standing lemniscate; lying ∞; crossing = connecting link; * (Shift+8) is asterisk, another room; Valeu !!!',
    excerptEs:
      'Palabras: «oito» / 8 — lat. octō; ocho de pie; ∞ acostado; cruce = eslabón; * (Shift+8) es asterisco, otra sala; ¡Valeu !!!',
    slug: 'inspecao-palavra-oito',
    date: '2026-08-24T01:35:00.000Z',
    seriesOrder,
    seriesLabel: 'Oito · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildOitoPost,
  buildOitoBodies
};
