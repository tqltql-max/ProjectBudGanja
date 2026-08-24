'use strict';

/**
 * Inspeção Expressões · meter a mão
 * Locução BR: pôr a mão no ofício / na massa.
 * Irmã de meter marcha (mesmo verbo). Inverso de pedir a mão.
 * Cortes: furto · toque sem consentimento · mão na bola.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/meter-a-mao-cover.jpg';
const WIKT_METER = 'https://pt.wiktionary.org/wiki/meter';
const WIKT_MAO = 'https://pt.wiktionary.org/wiki/m%C3%A3o';
const WIKT_MASSA = 'https://pt.wiktionary.org/wiki/m%C3%A3o_na_massa';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'expressoes-ditados')
        .map((p) => Number(p.seriesOrder))
        .filter((n) => Number.isFinite(n) && n > 0)
    );
    if (!taken.size) return start;
    seriesOrder = Math.max(...taken) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `A caixa já estava engatada.
Faltava a mão na massa.
Meter a mão
é o primeiro contacto com o ofício.

Não é furto.
Não é toque sem pedido.
Não é a bola no relvado.
É a terra, o vaso, o teclado —
o gesto que entra, não o que agride.

Pedir a mão é abrir a palma.
Meter a mão é pôr a palma a trabalhar.
Duas salas. O mesmo osso.

Valeu !!!
com a mão no ofício,
sem meter a mão onde não foi chamada.`;
}

function poemEn() {
  return `The gearbox was already in gear.
The hand still missed the dough.
Meter a mão
is first contact with the craft.

It is not theft.
It is not a touch nobody asked for.
It is not the ball on the pitch.
It is soil, pot, keyboard —
the gesture that enters, not the one that harms.

To ask for a hand is to open the palm.
To put the hand in is to put the palm to work.
Two rooms. The same bone.

Valeu !!!
with the hand in the craft,
without putting it where it was not called.`;
}

function poemEs() {
  return `La caja ya estaba en marcha.
Faltaba la mano en la masa.
Meter a mão
es el primer contacto con el oficio.

No es hurto.
No es toque sin pedido.
No es el balón en el césped.
Es la tierra, la maceta, el teclado —
el gesto que entra, no el que agrede.

Pedir la mano es abrir la palma.
Meter la mano es poner la palma a trabajar.
Dos salas. El mismo hueso.

Valeu !!!
con la mano en el oficio,
sin meterla donde no fue llamada.`;
}

function buildMeterAMaoBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-expressao-meter-a-mao.html';
  const marcha = '/posts/post-inspecao-expressao-meter-marcha.html';
  const pedi = '/posts/post-inspecao-palavra-pedi-mao.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mindinho = '/posts/post-inspecao-expressao-mindinho.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da expressão **«[meter a mão](${self})»** — locução viva do português do Brasil: **pôr a mão dentro** do que se faz. Pedido de campo: *inspeção da expressão meter a mão*. Canónica de ofício: **mão na massa** — o primeiro contacto com a matéria (terra, vaso, teclado). Irmã de **[meter marcha](${marcha})** (o mesmo *meter*). Inverso de **[pedir a mão](${pedi})** (abrir a palma × meter a palma). Três cortes: **furto**, **toque sem consentimento**, **mão na bola** — nomeiam-se; **não** são manual.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · meter](${WIKT_METER}), [mão](${WIKT_MAO}), [mão na massa](${WIKT_MASSA}). **Ficha ≠ guia de furto, ≠ toque no corpo alheio, ≠ regra de futebol.** Sem afiliação comercial. Tom: [gesto](${gesto}) que entra no [caminho](${caminho}) com [respeito](${respeito}).

**Gatilho:** *meter a mão* / *mete a mão* / *mão na massa* → **meter a mão** (âncora) · **mão na massa** (família de ofício).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **meter a mão** |
| Variantes | *mete a mão* · *meter a mão na massa* · *mão na massa* · *meter a mão no bolso* · *meter a mão na consciência* |
| Classe | Locução verbal |
| Peças | **meter** (lat. *mittere* «pôr, enviar») + artigo **a** + **mão** (lat. *manus*) |
| Núcleo | Contacto — a palma **entra** no ofício |
| Tipo BudGanja | Expressão — [gesto](${gesto}) × [mão](${maos}) × [ação](${acao}) |
| O que **não** é | Furto (âncora) · toque sem consentimento · mão na bola · [pedir a mão](${pedi}) · [meter marcha](${marcha}) (mesma peça *meter*, outro objecto) |
| Elo | [mãos](${maos}) · [gesto](${gesto}) · [meter marcha](${marcha}) · [pedi a mão](${pedi}) · [mindinho](${mindinho}) · [respeito](${respeito}) · [Faça o seu melhor](${faca}) |
| Fonte | [meter](${WIKT_METER}) · [mão](${WIKT_MAO}) |
| Data | ${inspected} |

**Objecto:** o acto de **pôr a palma a trabalhar**. No laboratório: a mão que mistura o seco, que abre o vaso, que tecla a ficha — não a mão que tira o que não é seu.

## 2. Hipóteses e método

**H1:** *meter* (lat. *mittere*) é o [gesto](${gesto}) de **pôr dentro**; *mão* (lat. *manus*) é o instrumento — confiança **alta**.  
**H2:** a canónica de ofício é **mão na massa**: o primeiro contacto com a matéria. Irmã de [ação](${acao}) e de [Faça o seu melhor](${faca}).  
**H3:** [A orelha cola](${orelhaCola}) *meter a mão* em *[meter marcha](${marcha})*. O verbo é o mesmo; o objecto muda — **caixa** × **palma**. Relacionar ≠ fundir.  
**H4:** **[pedir a mão](${pedi})** abre a palma (ajuda / compromisso). **Meter a mão** mete a palma. Inversos de direcção.  
**H5:** *pôr a mão* **assenta** (pôr a mão no ombro, pôr a mão no fogo). *Meter a mão* **entra**. Mais interior, mais força — daí os cortes.  
**H6:** sem [respeito](${respeito}), meter a mão em pessoa ou em haver alheio é [risco](${risco}), não método.

## 3. Salas (não misturar)

| Sala | Leitura | No lab |
|------|---------|--------|
| **Ofício** | Mão na massa — contacto com a matéria | Canónica desta ficha |
| **Literal** | Pôr a mão dentro (vaso, terra, água) | Base física do ofício |
| **Bolso** | *meter a mão no bolso* = pagar | Outra sala — custo honesto |
| **Consciência** | *meter a mão na consciência* = examinar-se | Sala moral — [verdade](${verdade}) |
| **Furto** | Meter a mão no que não é seu | **Corte** — não é tutorial |
| **Toque** | Meter a mão em alguém sem pedido | **Corte** — [respeito](${respeito}) manda; nunca manual |
| **Bola** | Mão na bola (futebol) | Outra sala — não é cultivo |

## 4. Peças da frase

| Peça | Comum | BudGanja |
|------|-------|----------|
| **Meter** | Pôr dentro / aplicar | [Gesto](${gesto}) — a palma que entra; o mesmo verbo de [meter marcha](${marcha}) |
| **a** | Artigo definido | A mão **conhecida** desta pessoa — não «uma mão qualquer» |
| **Mão** | Palavra do corpo (lat. *manus*) | Instrumento do ofício — ficha [mãos](${maos}); o [mindinho](${mindinho}) também conta |

**≠** *pôr a mão no fogo por alguém*: outra locução (*pôr*, não *meter*).  
**≠** *lançar mão de* / *deitar a mão*: irmãs próximas — recorrer / acudir — **não** esta âncora.

## 5. Meter a mão × pedir a mão × meter marcha

| Locução | Direcção | Ofício |
|---------|----------|--------|
| **[meter a mão](${self})** | A palma **entra** | Contacto com a massa |
| **[pedir a mão](${pedi})** | A palma **abre-se** | Ajuda ou compromisso |
| **[meter marcha](${marcha})** | O dente **engata** | Sair do ponto morto |

Três gestos. O verbo *meter* une **meter a mão** e **[meter marcha](${marcha})**. **[Pedir a mão](${pedi})** pede, não mete.

## 6. O que parece × o que é

| Parece | É |
|--------|---|
| Licença para mexer em tudo | Só o ofício **chamado** — [respeito](${respeito}) corta o resto |
| Já estar a trabalhar | Olhar para a massa ainda **não** é meter a mão |
| Sinónimo de [meter marcha](${marcha}) | Irmã: marcha engata a caixa; mão entra na matéria |
| Sinónimo de [pedir a mão](${pedi}) | Inverso: um pede, o outro põe |
| Gesto de futebol | Outra sala — a mão na bola não cultiva |

## 7. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Meter a mão na terra, no vaso, na ficha |
| Bom | *Mão na massa* — fazer em vez de só mandar |
| Bom | *Meter a mão no bolso* quando a conta é justa |
| Bom | *Meter a mão na consciência* antes de apontar a alheia |
| Mau | Meter a mão no que não é seu |
| Mau | Meter a mão em quem não pediu |
| Mau | Confundir contacto de ofício com pressa que empurra |

## 8. Limites

- Não ensinamos a furtar nem a tocar sem consentimento.  
- Não é regra de futebol nem de etiqueta nupcial (essa sala é [pedir a mão](${pedi})).  
- [Relação](${relacao}) sem [respeito](${respeito}) não vira método.

\`\`\`poem
${poemPt()}
\`\`\`

## Veredicto

**Aprovado** na série Expressões — **meter a mão** = o [gesto](${gesto}) que entra no [caminho](${caminho}). Canónica: **mão na massa**. Irmã: [meter marcha](${marcha}). Inverso: [pedir a mão](${pedi}). Fecho: [Valeu !!!](${valeu}) · [eu amo a vida](${amo}) **com a mão no ofício**, não no bolso alheio.

[▶ Expressões](${hub}) · [▶ Meter marcha](${marcha}) · [▶ Pedi a mão](${pedi}) · [▶ Mãos](${maos}) · [▶ Gesto](${gesto}) · [▶ Respeito](${respeito}) · [▶ Valeu !!!](${valeu}) · [▶ Palavras](${hubPalavras}) · [▶ Guia](${guia}) · [▶ Vida](${vida}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

Brazilian saying **«[meter a mão](${self})»** — put the **hand into** the work. Field: *inspeção da expressão meter a mão*. Craft reading: **mão na massa** (hands-on). Sister of **[meter marcha](${marcha})** (same verb). Inverse of **[pedir a mão](${pedi})**. Cuts: theft, unwanted touch, handball — named, **not** taught.

> Independent audit. [meter](${WIKT_METER}), [mão](${WIKT_MAO}). **Not** a theft guide, assault guide, or football rulebook.

## Object

| Field | Value |
|-------|-------|
| Saying | **meter a mão** |
| Pieces | *meter* (Lat. *mittere*) + *a* + *mão* (Lat. *manus*) |
| Lab | First contact with the matter — soil, pot, keyboard |
| Not | Theft as âncora · unwanted touch · handball · [pedir a mão](${pedi}) |
| Date | ${inspected} |

**H1:** *meter* = put inside; *mão* = the instrument.  
**H2:** craft canon = hands-on.  
**H3:** sister of [meter marcha](${marcha}) — same verb, other object.  
**H4:** without [respeito](${respeito}), a hand on someone is [risco](${risco}).

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** approved. Hand in the craft. [Valeu !!!](${valeu}) · [eu amo a vida](${amo})

[▶ Sayings](${hub}) · [▶ Meter marcha](${marcha}) · [▶ Hands](${maos}) · [▶ Gesture](${gesto}) · [▶ Valeu !!!](${valeu})
`;

  const contentEs = `## Alcance

Dicho BR **«[meter a mão](${self})»** — meter la **mano** en el oficio. Pedido: *inspeção da expressão meter a mão*. Lectura de oficio: **mão na massa** (manos a la obra). Hermana de **[meter marcha](${marcha})** (el mismo verbo). Inverso de **[pedir a mão](${pedi})**. Cortes: hurto, toque sin consentimiento, mano en el balón — se nombran; **no** se enseñan.

> Auditoría independiente. [meter](${WIKT_METER}), [mão](${WIKT_MAO}). **No** es guía de hurto ni de toque ni reglamento de fútbol.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **meter a mão** |
| Piezas | *meter* (lat. *mittere*) + *a* + *mão* (lat. *manus*) |
| Lab | Primer contacto con la materia |
| No es | Hurto como âncora · toque sin pedido · mano en el balón · [pedir a mão](${pedi}) |
| Fecha | ${inspected} |

**H1:** *meter* = poner dentro; *mão* = el instrumento.  
**H2:** canónica = manos a la obra.  
**H3:** hermana de [meter marcha](${marcha}) — mismo verbo, otro objeto.  
**H4:** sin [respeito](${respeito}), la mano sobre alguien es [risco](${risco}).

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** aprobado. Mano en el oficio. [¡Valeu !!!](${valeu}) · [eu amo a vida](${amo})

[▶ Expresiones](${hub}) · [▶ Meter marcha](${marcha}) · [▶ Manos](${maos}) · [▶ Gesto](${gesto}) · [▶ ¡Valeu !!!](${valeu})
`;

  return { body, contentEn, contentEs, wiki: WIKT_METER };
}

function buildMeterAMaoPost() {
  const { body, contentEn, contentEs, wiki } = buildMeterAMaoBodies();
  return expressaoPost({
    title: 'Inspeção: Meter a mão — o gesto que entra no ofício',
    titleEn: 'Inspection: Meter a mão — the gesture that enters the craft',
    titleEs: 'Inspección: Meter a mão — el gesto que entra en el oficio',
    excerpt:
      'Expressões: meter a mão — contacto com a massa / o ofício; ≠ furto ≠ toque sem consentimento ≠ futebol; Valeu !!!',
    excerptEn:
      'Sayings: meter a mão — hands-on contact with the craft; ≠ theft ≠ unwanted touch ≠ football; Valeu !!!',
    excerptEs:
      'Dichos: meter a mão — contacto con la masa / el oficio; ≠ hurto ≠ toque sin consentimiento ≠ fútbol; ¡Valeu !!!',
    slug: 'inspecao-expressao-meter-a-mao',
    date: '2026-08-24T13:10:00.000Z',
    seriesOrder: pickOrder('inspecao-expressao-meter-a-mao', 44),
    seriesLabel: 'Meter a mão · ofício',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildMeterAMaoPost, buildMeterAMaoBodies, poemPt, poemEn, poemEs };
