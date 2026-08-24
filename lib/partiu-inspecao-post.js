'use strict';

/**
 * Inspeção Expressões · Partiu!!!
 * Derivação de Valeu !!! — pretérito de partir virado grito de saída.
 * Eixos: valer→valeu × partir→partiu · convite / porta · ≠ Tamara partir ≠ pariu ≠ fui.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/partiu-cover.jpg';
const WIKT_PARTIR = 'https://pt.wiktionary.org/wiki/partir';
const WIKT_PARTIU = 'https://pt.wiktionary.org/wiki/partiu';

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
  return `Partiu!!!
O mesmo molde do Valeu !!!:
pretérito que virou porta.

Valer deu valeu.
Partir deu partiu.
Três exclamações —
o calor de ofício.

Não é o gelo da Tamara.
Não é pariu.
Não é Fui! sozinho na soleira.
É o convite e a saída
no mesmo sopro.

Valeu !!!
já do outro lado,
sem apagar o obrigado.`;
}

function poemEn() {
  return `Partiu!!!
The same mould as Valeu !!!:
a past tense that became a door.

Valer gave valeu.
Partir gave partiu.
Three exclamation marks —
the heat of craft.

It is not Tamara’s ice.
It is not pariu.
It is not Fui! alone on the threshold.
It is the invitation and the exit
in the same breath.

Valeu !!!
already on the other side,
without erasing the thanks.`;
}

function poemEs() {
  return `¡Partiu!!!
El mismo molde de Valeu !!!:
pretérito que se volvió puerta.

Valer dio valeu.
Partir dio partiu.
Tres exclamaciones —
el calor de oficio.

No es el hielo de Tamara.
No es pariu.
No es ¡Fui! solo en el umbral.
Es la invitación y la salida
en el mismo soplo.

¡Valeu !!!
ya del otro lado,
sin borrar el gracias.`;
}

function buildPartiuBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-expressao-partiu.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const boa = '/posts/post-inspecao-palavra-boa.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const partir = '/posts/post-inspecao-palavra-partir.html';
  const fui = '/posts/post-inspecao-palavra-fui.html';
  const adeus = '/posts/post-inspecao-expressao-adeus.html';
  const marcha = '/posts/post-inspecao-expressao-meter-marcha.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const pqp = '/posts/post-inspecao-expressao-puta-que-pariu.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const mantra = valeu;

  const body = `## Escopo

Inspeção editorial da expressão **«[Partiu!!!](${self})»** — pedido de campo: **derivação de [Valeu !!!](${valeu})**. No BR oral, o pretérito *partiu* (de [partir](${partir}) ← lat. *partīre* / *partīrī*) vira **grito de saída e convite**: «Partiu!», «Partiu praia», **Partiu!!!**. O molde é o mesmo do mantra-mãe: **3.ª pessoa do pretérito + três exclamações**. O eixo muda: Valeu !!! diz «teve valor»; **Partiu!!!** diz «vamos / saí». Não substitui Valeu !!! — **anda ao lado**, como [Boa!!!](${boa}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · partir](${WIKT_PARTIR}), [partiu](${WIKT_PARTIU}), fichas [Valeu](${valeu}) e [partir](${partir}). **Ficha ≠ biografia Tamara, ≠ eufemismo de *pariu*, ≠ ordem de abandono.** Tom: Inspetor BudGanja — *Partiu!!!* como sopro de **porta**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **partiu** |
| Grito de ofício | **Partiu!!!** — mesma pontuação viva de [Valeu !!!](${valeu}) |
| Classe | Interjeição / forma verbal lexicalizada (pret. 3.ª de *partir*) |
| Étimo (trabalho) | *partir* ← lat. *partīre* / *partīrī* («dividir, separar») → pretérito *partiu* usado como **vamos / saí** — confiança **alta** |
| Família | *partir* · *partiu* · *partiu praia* · *bora partiu* · **Partiu!!!** |
| Falsos irmãos | [partir](${partir}) (tríade Tamara) · *pariu* / [puta que pariu](${pqp}) · só gramática «ele partiu» |
| Tipo BudGanja | Expressão — derivação de Valeu !!! · saída × convite |
| Elo mantra | [Valeu !!!](${valeu}) — mãe; [Boa!!!](${boa}) — aprovação; [eu amo a vida](${amo}) — alteração automática |
| Elo saída | [fui](${fui}) · [A Deus!!!](${adeus}) · [caminho](${caminho}) · [meter marcha](${marcha}) |
| Fonte | [partir](${WIKT_PARTIR}) · [partiu](${WIKT_PARTIU}) |
| Data | ${inspected} |

**Objecto:** o **grito de ir**. Valeu !!! reconhece o [gesto](${gesto}) que ficou. **Partiu!!!** declara a porta. Os dois fecham; não se fundem.

## 2. Hipóteses

**H1:** *Partiu!!!* é **derivação morfológica e de ofício** de [Valeu !!!](${valeu}) — o mesmo molde (pretérito 3.ª + !!!), outro eixo (saída ≠ gratidão).  
**H2:** o étimo é *partīre* / *partir*, não *valēre*. Irmãs de uso, não de raiz — como [Boa!!!](${boa}) (*bonus*).  
**H3:** três exclamações são **o mesmo calor gráfico** do lab — não gritaria vazia.  
**H4:** *partiu praia* / *bora partiu* são **o mesmo grito com destino**; o núcleo continua a ser a porta.  
**H5:** a ficha [partir](${partir}) (Tamara: partir, ficar, escrever) é **outra sala** — decisão no gelo, não o convite da rua.  
**H6:** a orelha cola *partiu* em *pariu* — **não**. Um é saída; o outro é parto / praga. Ver [puta que pariu](${pqp}) (*fruta que partiu* = eufemismo).

## 3. Família Valeu !!!

| Grito | O que nomeia | Molde |
|--------|--------------|-------|
| **[Valeu !!!](${valeu})** | Reconhecimento / obrigado leve | *valer* → *valeu* + !!! |
| **[Boa!!!](${boa})** | Aprovação / «saiu bem» | *bonus* → *boa* + !!! |
| **[eu amo a vida](${amo})** | Amor da vida em 1.ª pessoa | Alteração automática no render |
| **Partiu!!!** | Saída / convite / «vamos» | *partir* → *partiu* + !!! |

**Não apaga** Valeu !!!. **Não é** automático no render (isso fica com [eu amo a vida](${amo})). **É** derivação viva: quem fecha com calor pode **partir** sem frio.

## 4. Partiu!!! × Fui! × A Deus!!! × meter marcha

| Grito | Pessoa / eixo | No lab |
|--------|---------------|--------|
| **Partiu!!!** | 3.ª — convite colectivo ou declaração de porta | Derivação de Valeu !!! |
| **[Fui!](${fui})** | 1.ª de *ir* / *ser* — o corpo já saiu | Irmã de porta; cluster [A Deus!!!](${adeus}) |
| **[A Deus!!!](${adeus})** | Encomendar quem parte | Bênção de saída, não convite |
| **[meter marcha](${marcha})** | Engatar / sair do idle | Arranque — o contrário de «já fui» |

**Veredicto contraste:** *Fui!* olha para trás («saí»). *Partiu!!!* olha para a frente («vamos»). [Já](${ja}) pode abrir; Partiu!!! fecha o sítio e abre a rua.

## 5. Usos no português do Brasil

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Convite** | «Partiu!!!» · «Partiu praia» | Bom: [gesto](${gesto}) partilhado · Mau: empurrar quem não pediu a viagem |
| **Saída** | «Partiu, valeu» | Bom: porta + reconhecimento · Mau: sumir sem [Valeu !!!](${valeu}) quando havia gesto |
| **Fecho lab** | Depois da ficha / do turno | Bom: derivação ao lado da mãe · Mau: substituir Valeu !!! em todo o fecho |
| **Gramática** | «Ele partiu ontem» | Outro ofício — pretérito narrativo, não este grito |
| **Tamara** | partir, ficar, escrever | [Palavra partir](${partir}) — gelo, não gíria de rua |
| **Eufemismo** | *fruta que partiu* | Sala de [puta que pariu](${pqp}) — **não** esta ficha |

## 6. O que parece × o que é

| Parece | É |
|--------|---|
| Só gramática (ele partiu) | Interjeição BR de **porta e convite** |
| O mesmo que [partir](${partir}) Tamara | Mesma raiz; **outra sala** (gelo × rua) |
| Adeus / Fui | Família de saída; eixos **distintos** |
| Substituição de Valeu !!! | Derivação — **não** apaga a mãe |
| *Pariu* | Homofonia frouxa; étimo e ofício **outros** |

\`\`\`poem
${poemPt()}
\`\`\`

## Limites

- Não substitui [Valeu !!!](${valeu}) nem [Boa!!!](${boa}).  
- Não fundir com a [palavra partir](${partir}) (tríade Tamara / Inverno).  
- Informal ≠ despedida fria — depende do tom e de quem foi convidado.  
- Ficha de oralidade, não de itinerário nem de abandono.

## Status

**Aprovado** na série Expressões — **Partiu!!!** fichada como **derivação de [Valeu !!!](${valeu})**: pretérito de *partir* virado grito de porta; ≠ Tamara ≠ pariu ≠ Fui. Fecho: **Partiu!!!** · [Valeu !!!](${mantra}).

[▶ Expressões](${hub}) · [▶ Valeu !!!](${valeu}) · [▶ Boa!!!](${boa}) · [▶ eu amo a vida](${amo}) · [▶ Partir](${partir}) · [▶ Fui](${fui}) · [▶ A Deus!!!](${adeus}) · [▶ Palavras](${hubPalavras}) · [▶ Guia](${guia}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Brazilian **«[Partiu!!!](${self})»** — field request: a **derivation of [Valeu !!!](${valeu})**. Same mould (3rd-person past + three exclamation marks); other axis: **let’s go / I’m out**, not thanks. Does **not** replace Valeu !!! — walks beside [Boa!!!](${boa}).

> Independent audit. [Wiktionary · partir](${WIKT_PARTIR}). **Not** Tamara’s ice lexicon, **not** the *pariu* curse, **not** an order to abandon.

## Object

| Field | Value |
|-------|-------|
| Cry | **Partiu!!!** |
| Etymon | Lat. *partīre* / *partīrī* → *partir* → pret. *partiu* lexicalized — **high** confidence |
| vs Valeu !!! | Exit / invite («let’s go») × thanks («it had value») |
| vs [partir](${partir}) | Same root; Tamara’s triad is another room |
| vs [Fui!](${fui}) | 3rd-person invite × 1st-person “I’m out” |
| Date | ${inspected} |

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** sister close of leaving; [Valeu !!!](${valeu}) remains the mother mantra.

[▶ Valeu !!!](${valeu}) · [▶ Sayings](${hub}) · [▶ Partir](${partir}) · [▶ Fui](${fui})
`;

  const contentEs = `## Alcance

Inspección de **«[Partiu!!!](${self})»** — pedido: **derivación de [¡Valeu !!!](${valeu})**. Mismo molde (pretérito 3.ª + tres exclamaciones); otro eje: **vamos / me fui**, no el gracias. **No** sustituye Valeu !!! — camina al lado de [Boa!!!](${boa}).

> Auditoría independiente. [Wikcionario · partir](${WIKT_PARTIR}). **No** es el léxico Tamara, **no** es *pariu*, **no** es orden de abandono.

## Objeto

| Campo | Valor |
|-------|-------|
| Grito | **Partiu!!!** |
| Étimo | Lat. *partīre* / *partīrī* → *partir* → pret. *partiu* — confianza **alta** |
| vs Valeu !!! | Salida / convite × gratitud |
| vs [partir](${partir}) | Misma raíz; la tríada Tamara es otra sala |
| vs [¡Fui!](${fui}) | Convite en 3.ª × «me fui» en 1.ª |
| Fecha | ${inspected} |

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** cierre hermano de la puerta; [¡Valeu !!!](${valeu}) sigue siendo el mantra madre.

[▶ ¡Valeu !!!](${valeu}) · [▶ Expresiones](${hub}) · [▶ Partir](${partir}) · [▶ Fui](${fui})
`;

  return { body, contentEn, contentEs, wiki: WIKT_PARTIR };
}

function buildPartiuPost() {
  const { body, contentEn, contentEs, wiki } = buildPartiuBodies();
  return expressaoPost({
    title: 'Inspeção: Partiu!!! — derivação de Valeu !!!',
    titleEn: 'Inspection: Partiu!!! — derivation of Valeu !!!',
    titleEs: 'Inspección: Partiu!!! — derivación de Valeu !!!',
    excerpt:
      'Expressões: Partiu!!! — derivação de Valeu !!!; pretérito de partir virado grito de porta; ≠ Tamara ≠ pariu ≠ Fui; Valeu !!!',
    excerptEn:
      'Sayings: Partiu!!! — derivation of Valeu !!!; past of partir as door-cry; ≠ Tamara ≠ pariu ≠ Fui; Valeu !!!',
    excerptEs:
      'Dichos: Partiu!!! — derivación de Valeu !!!; pretérito de partir como grito de puerta; ≠ Tamara ≠ pariu ≠ Fui; ¡Valeu !!!',
    slug: 'inspecao-expressao-partiu',
    date: '2026-08-24T12:00:00.000Z',
    seriesOrder: pickOrder('inspecao-expressao-partiu', 42),
    seriesLabel: 'Partiu!!! · Valeu !!!',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPartiuPost,
  buildPartiuBodies,
  poemPt,
  poemEn,
  poemEs
};
