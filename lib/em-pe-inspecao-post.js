'use strict';

/**
 * Inspeção Expressões · em pé
 * Locução — postura vertical · oito erguido da lemniscata ·
 * aula XIV Kassia (corpo) · Valeu !!!
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemEmPePt() {
  return `Em pé não é o pé sozinho.
É o corpo que não deita.
O oito deitado chama-se infinito.
O oito em pé chama-se caminho:
o que está em cima fala com o que está em baixo.

Kassia pensou o corpo
e ergueu a fita.
Não baptizou a locução.
O laboratório guarda o gesto:
rodar a lemniscata
até ela ficar em pé.

Não é eternidade de cartaz.
Não é o cruzamento — esse é o elo.
É a postura.
É o vai-e-vem.

Valeu !!!
em pé,
sem fingir que o infinito cabe numa ficha.`;
}

function poemEmPeEn() {
  return `Standing is not the foot alone.
It is the body that does not lie down.
The eight lying down is called infinity.
The eight standing up is called a path:
what is above speaks with what is below.

Kassia thought of the body
and stood the ribbon up.
She did not baptise the locution.
The lab keeps the gesture:
turn the lemniscate
until it stands.

It is not poster eternity.
It is not the crossing — that is the link.
It is the posture.
It is the to-and-fro.

Valeu !!!
standing,
without pretending infinity fits on a sheet.`;
}

function poemEmPeEs() {
  return `De pie no es el pie solo.
Es el cuerpo que no se acuesta.
El ocho acostado se llama infinito.
El ocho de pie se llama camino:
lo de arriba habla con lo de abajo.

Kassia pensó el cuerpo
y levantó la cinta.
No bautizó la locución.
El laboratorio guarda el gesto:
girar la lemniscata
hasta que quede de pie.

No es eternidad de cartel.
No es el cruce — ese es el eslabón.
Es la postura.
Es el vaivén.

Valeu !!!
de pie,
sin fingir que el infinito cabe en una ficha.`;
}

function buildEmPeBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-em-pe.html';
  const par = '/posts/post-inspecao-expressao-em-pe-e-deitado.html';
  const lemniscata = '/posts/post-inspecao-palavra-lemniscata.html';
  const eloLigacao = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const cinta = '/posts/post-inspecao-palavra-cinta.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const tudo = '/posts/post-inspecao-palavra-tudo.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const trilha = '/vida/';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const pedi = '/posts/post-inspecao-palavra-pedi-mao.html';
  const ecbome = '/posts/post-inspecao-neurociencia-endocanabinoidoma.html';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const movrecam = '/posts/post-inspecao-canal-movrecam.html';
  const aula8 = '/biblioteca/unifesp/livro-xiv.html#aula-8';
  const kassiaVideos = '/videos/?channel=movrecam&series=kassia-martins';
  const ytAula8 = 'https://www.youtube.com/watch?v=dNcVCa1_7Ig';
  const wikiPe = 'https://pt.wiktionary.org/wiki/p%C3%A9';
  const wikiEmPe = 'https://pt.wiktionary.org/wiki/em_p%C3%A9';
  const wikiInfSym = 'https://en.wikipedia.org/wiki/Infinity_symbol';
  const wikiLemniscate = 'https://en.wikipedia.org/wiki/Lemniscate';

  const body = `## Escopo

Inspeção editorial da expressão **«[em pé](${self})»** — a **postura vertical**. Pedido de campo depois do par [em pé e deitado](${par}): ficar só com **em pé**. No português, quem está em pé não está sentado nem deitado. No laboratório, *em pé* é o **oito erguido** da [lemniscata](${lemniscata}): a Dra. Kassia Martins, na [8.ª aula XIV](${aula8}), pede que se pense a figura **em pé** quando se pensa o **corpo**. O ofício desta ficha: a **postura**. O par fica na irmã; o cruzamento em [elo de ligação](${eloLigacao}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · em pé](${wikiEmPe}), [pé](${wikiPe}), [infinity symbol](${wikiInfSym}), [lemniscate](${wikiLemniscate}). Analogia de aula: Dra. **Kassia Martins** · [8.ª aula XIV](${aula8}) ([YouTube](${ytAula8})) · [UNIFESP](${unifesp}) / [MovReCam](${movrecam}). **Ficha ≠ misticismo, ≠ protocolo clínico, ≠ aula de anatomia.** Sem afiliação. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *de pé* / *oito em pé* / *lemniscata em pé* / *em pe* → **em pé**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **em pé** (também *de pé*) |
| Classe | Locução adverbial / adjetival |
| Peça | **pé** ← lat. *pēs, pedis* «pé» |
| Ofício no chão | Erguido; não sentado; não deitado |
| Ofício no lab | O **oito vertical** da [lemniscata](${lemniscata}) |
| Par | [em pé e deitado](${par}) (*bodiado* → deitado) |
| Cruzamento | [elo de ligação](${eloLigacao}) |
| Tipo BudGanja | Expressão — postura vertical × caminho no corpo |
| Não é | o pé sozinho · [pedi a mão](${pedi}) · eternidade · dose |
| Fonte aula | [Kassia · aula 8](${kassiaVideos}) |
| Data | ${inspected} |

**O que é o objecto:** o nome português de **ficar erguido**. Na figura, é rodar a fita até o oito deixar de ser ∞ e passar a ser **caminho**: [cima](${caminho}) fala com baixo. *Em pé* não é o cruzamento. É a **postura que deixa o cruzamento a comunicar**.

## 2. Peças da locução

| Peça | Étimo de trabalho | Confiança | Ofício |
|------|-------------------|-----------|--------|
| **pé** | lat. *pēs, pedis* «pé, apoio» | Alta | O apoio no chão |
| **em pé** | locução PT (var. *de pé*) | Alta | Postura **vertical** |
| **oito em pé** | leitura de ofício | Alta como metáfora | A [lemniscata](${lemniscata}) rodada |

**H1:** *em pé* insiste no **apoio** (*pēs*): quem está em pé tem chão.  
**H2:** *de pé* é a mesma locução, outra preposição — o lab não funde nem discute.  
**H3:** a Dra. Kassia **não** baptizou a ficha — o lab **relaciona** o oito erguido com a aula; **não** afirma que ela usou a locução isolada.

## 3. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Em pé** | Só o pé | Locução: o **corpo erguido** |
| **Oito em pé** | Religião do 8 | Analogia de **comunicação** (aula XIV) |
| **Oito deitado** | Esta ficha | Postura irmã — [em pé e deitado](${par}) |
| **Cruzamento** | Esta locução | [Elo de ligação](${eloLigacao}) |
| **[Pedi a mão](${pedi})** | Mesmo *pé* | Outro verbo (*pedir*); outro ofício |
| **Negócio / café em pé** | O oito | Outros usos da locução — não o objecto desta ficha |
| **SEC / eCBome** | O próprio 8 | Rede fisiológica — mapa em [endocanabinoidoma](${ecbome}) |

## 4. A aula e o corpo

Na [8.ª aula do XIV Curso](${aula8}), a professora liga a [lemniscata](${lemniscata}) às funções do SEC (*relaxar, comer, dormir, esquecer, proteger*): deitada, a figura nomeia o sem-fim; **em pé**, o movimento cima↔baixo. Quanto mais ritmado o vai-e-vem, mais equilíbrio. O lab lê *em pé* como o [gesto](${gesto}) de **erguer** a fita quando se pensa o corpo.

**Veredicto de analogia:** o [endocanabinoidoma](${ecbome}) é, nessa aula, o **maestro que comunica**. *Em pé* é o **nome da postura**. Distinto de [tudo](${tudo}) — o infinito **não** cabe numa ficha.

## 5. Rede BudGanja (só fichas existentes)

| Ficha | Relação |
|-------|---------|
| [Em pé e deitado](${par}) | O **par**; *bodiado* → deitado |
| [Lemniscata](${lemniscata}) | O **nome** da curva-fita |
| [Elo de ligação](${eloLigacao}) | O **cruzamento** das voltas |
| [Caminho](${caminho}) · [gesto](${gesto}) | Em pé = caminho no corpo; erguer é [gesto](${gesto}) |
| [Sinal](${sinal}) · [pattern](${pattern}) · [cinta](${cinta}) | A marca; o molde; a fita das mãos |
| [Nó](${no}) | O encontro da lemniscata **passa**; o nó **aperta** |
| [Pedi a mão](${pedi}) | Falso amigo de ouvido: *pedir* ≠ *pé* |
| [Endocanabinoidoma](${ecbome}) | Mapa do SEC; analogia da figura em pé |
| [Curso UNIFESP](${unifesp}) · [MovReCam](${movrecam}) · [aula 8](${aula8}) | Crédito da analogia; [vídeos Kassia](${kassiaVideos}) |
| [Etimologia](${etimologia}) · [língua](${lingua}) · [Guia](${guia}) | *pēs, pedis* → pé → em pé |
| [Verdade](${verdade}) · [tudo](${tudo}) · [vida](${vida}) · trilha [Vida](${trilha}) | Sem slogan; ofício no chão |
| [Valeu !!!](${mantra}) | Fechar em pé, não no cartaz |

## 6. Usos no português

| Uso | Bom × mau no lab |
|-----|------------------|
| **Corpo erguido** | Bom: a locução do chão |
| **Oito / lemniscata em pé** | Bom se se declara: analogia, não prova |
| **Negócio em pé / café em pé** | Outro ofício — não forçar a fita |
| **Fundir com o par ou com o cruzamento** | Mau: o par é [em pé e deitado](${par}); o cruzamento é [elo](${eloLigacao}) |
| **«O SEC é o oito em pé»** | Mau: cola analogia em dogma |
| **Escrever *em pe* como lema** | Mau: grafia = **em pé** |

**Finalidade-mãe:** guardar a **postura**. *Em pé* inspecciona o oito erguido; [em pé e deitado](${par}) guarda o par; [elo de ligação](${eloLigacao}) guarda o cruzamento. Nenhum dos três é receita.

## Poema Vida

\`\`\`poem
${poemEmPePt()}
\`\`\`

## Hipóteses (síntese)

**H1:** *em pé* = locução da **postura vertical** (*pēs* = apoio).  
**H2:** no lab, é o oito erguido da [lemniscata](${lemniscata}) — [caminho](${caminho}) no corpo (Kassia / XIV).  
**H3:** o par e o cruzamento **não** são esta ficha.  
**H4:** [endocanabinoidoma](${ecbome}) = mapa; analogia ≠ prova.  
**H5:** fecho = [Valeu !!!](${mantra}) — em pé, sem fingir eternidade.

## Limites

- Não é aula de anatomia nem de curvas.  
- Não afirma que Kassia pronunciou a locução isolada — a **relação** é do laboratório.  
- Não é protocolo clínico nem dose.  
- *Bodiado* e o deitado ficam em [em pé e deitado](${par}).  
- *Simbuklo* e o cruzamento ficam em [elo de ligação](${eloLigacao}).

## Status

**Aprovada** — **em pé** fichada como locução da postura vertical; no lab, o oito erguido da [lemniscata](${lemniscata}) (comunicação cima↔baixo, aula XIV Kassia). Par e cruzamento nas fichas irmãs. Sem afiliação.

[▶ Expressões](${hub}) · [▶ Em pé e deitado](${par}) · [▶ Lemniscata](${lemniscata}) · [▶ Elo de ligação](${eloLigacao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **“[em pé](${self})”** — **standing**. After the pair [em pé e deitado](${par}), the field asked for **em pé** alone. On the ground: not sitting, not lying. In the lab: the **standing eight** of the [lemniscate](${lemniscata}). In [UNIFESP XIV lesson 8](${aula8}), Dr. Kassia Martins asks that the figure be thought standing when one thinks of the **body**. The crossing stays on [elo de ligação](${eloLigacao}). Close: [Valeu !!!](${mantra}).

> Independent audit. Sources: [em pé](${wikiEmPe}), [pé](${wikiPe}). **Not mysticism, not a clinical protocol.** No affiliation.

## Object

| Field | Value |
|-------|-------|
| Saying | **em pé** (standing / upright) |
| Variant | *de pé* |
| Lab | standing 8 of the [lemniscate](${lemniscata}) |
| Pair | [em pé e deitado](${par}) |
| Crossing | [elo de ligação](${eloLigacao}) |
| Not | the foot alone · eternity · dose |
| Date | ${inspected} |

**H1:** *em pé* is posture — *pēs* is support.  
**H2:** standing 8 = body path (Kassia); the lab **relates**, it does **not** claim she isolated these words.

\`\`\`poem
${poemEmPeEn()}
\`\`\`

## Status

**Approved** — standing locution filed; standing-8 analogy credited without affiliation.

[▶ Sayings](${hub}) · [▶ Pair](${par}) · [▶ Lemniscate](${lemniscata}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[em pé](${self})»** — **de pie**. Después del par [em pé e deitado](${par}), el campo pidió **em pé** sola. En el suelo: no sentado, no acostado. En el lab: el **ocho de pie** de la [lemniscata](${lemniscata}). En la [aula 8 del XIV](${aula8}), la Dra. Kassia Martins pide pensar la figura de pie cuando se piensa el **cuerpo**. El cruce queda en [elo de ligação](${eloLigacao}). Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. Fuentes: [em pé](${wikiEmPe}), [pé](${wikiPe}). **No es misticismo ni protocolo clínico.** Sin afiliación.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **em pé** (de pie) |
| Variante | *de pé* |
| Lab | 8 de pie de la [lemniscata](${lemniscata}) |
| Par | [em pé e deitado](${par}) |
| Cruce | [elo de ligação](${eloLigacao}) |
| No es | el pie solo · eternidad · dosis |
| Fecha | ${inspected} |

**H1:** *em pé* es postura — *pēs* es apoyo.  
**H2:** el 8 de pie = camino en el cuerpo (Kassia); el lab **relaciona**, **no** afirma que ella aislara estas palabras.

\`\`\`poem
${poemEmPeEs()}
\`\`\`

## Estado

**Aprobada** — locución de pie fichada; analogía del 8 erguido acreditada sin afiliación.

[▶ Expresiones](${hub}) · [▶ Par](${par}) · [▶ Lemniscata](${lemniscata}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: wikiEmPe };
}

function buildEmPePost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildEmPeBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 23;
  return expressaoPost({
    title: 'Inspeção: em pé — o oito erguido, o corpo como caminho',
    titleEn: 'Inspection: em pé — the standing eight, the body as a path',
    titleEs: 'Inspección: em pé — el ocho erguido, el cuerpo como camino',
    excerpt:
      'Expressões: «em pé» — postura vertical; oito erguido da lemniscata; aula XIV Kassia (corpo); Valeu !!!',
    excerptEn:
      'Sayings: “em pé” — standing; the standing eight of the lemniscate; UNIFESP XIV Kassia (body); Valeu !!!',
    excerptEs:
      'Dichos: «em pé» — de pie; el ocho erguido de la lemniscata; aula XIV Kassia (cuerpo); ¡Valeu !!!',
    slug: 'inspecao-expressao-em-pe',
    date: '2026-08-22T06:40:00.000Z',
    seriesOrder: order,
    seriesLabel: 'em pé · expressão',
    coverImage: '/imagens/inspecoes/em-pe-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEmPePost,
  buildEmPeBodies,
  poemEmPePt,
  poemEmPeEn,
  poemEmPeEs
};
