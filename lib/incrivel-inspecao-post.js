'use strict';

/**
 * Inspeção Palavras · incrível
 * Lat. incredibilis ← in- + credibilis ← credere
 * Cruzamento pedido: acreditar (mesmo tronco) · fé (fides, outro étimo)
 * Escala de elogio BR · ≠ inacreditável · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/incrivel-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/incr%C3%ADvel';
const WIKI_LAT = 'https://en.wiktionary.org/wiki/incredibilis';
const WIKI_CREDERE = 'https://en.wiktionary.org/wiki/credo#Latin';
const WIKI_ACREDITAR = 'https://pt.wiktionary.org/wiki/acreditar';
const WIKI_CRER = 'https://pt.wiktionary.org/wiki/crer';
const WIKI_FE = 'https://pt.wiktionary.org/wiki/f%C3%A9';
const WIKI_FIDES = 'https://en.wiktionary.org/wiki/fides#Latin';

function poemIncrivelPt() {
  return `Incrível é o que não cabe no crer.
Acreditar é o verbo que tenta caber.
Fé é outro tronco — fides, não credere.

Dá para achar incrível sem fé —
assombro, uau, hipérbole BR.
Dá para ter fé no incrível —
peito que segura o que a prova ainda não fecha.

O in- do incrível não apaga o crédito.
Só marca o limite:
isto ainda não cabe,
ou já saiu do esperado.

Valeu !!!
incrível com rasto,
acreditar com objecto,
fé sem fundir o étimo.`;
}

function poemIncrivelEn() {
  return `Incrível is what will not fit in believing.
Acreditar is the verb that tries to fit.
Fé is another trunk — fides, not credere.

You can find it incredible without faith —
awe, wow, BR hyperbole.
You can have faith in the incredible —
a chest that holds what proof has not yet closed.

The in- of incrível does not erase credit.
It only marks the limit:
this still does not fit,
or it has already left the expected.

Valeu !!!
incredible with a trail,
believe with an object,
faith without fusing the etymon.`;
}

function poemIncrivelEs() {
  return `Incrível es lo que no cabe en el creer.
Acreditar es el verbo que intenta caber.
Fé es otro tronco — fides, no credere.

Se puede hallar incrível sin fe —
asombro, uau, hipérbole BR.
Se puede tener fe en lo incrível —
pecho que sujeta lo que la prueba aún no cierra.

El in- de incrível no apaga el crédito.
Solo marca el límite:
esto aún no cabe,
o ya salió de lo esperado.

¡Valeu !!!
incrível con rastro,
acreditar con objeto,
fe sin fusionar el étimo.`;
}

function buildIncrivelBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-incrivel.html';
  const inacreditavel = '/posts/post-inspecao-palavra-inacreditavel.html';
  const amorEFe = '/posts/post-inspecao-arte-amor-e-fe.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const fantastico = '/posts/post-inspecao-palavra-fantastico.html';
  const fabuloso = '/posts/post-inspecao-palavra-fabuloso.html';
  const maravilhoso = '/posts/post-inspecao-palavra-maravilhoso.html';
  const magnifico = '/posts/post-inspecao-palavra-magnifico.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const jesusudavi = '/posts/post-inspecao-expressao-jesusudavi.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const euAmo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';

  const body = `## Escopo

Inspeção editorial da palavra **[incrível](${self})** — lat. *incredibilis* («que não se pode crer»). Pedido de campo: *inspeção da palavra incrível* **cruzada com acreditar ou fé**. Esta ficha cobre o **objecto**, os **dois ofícios BR** (incredulidade × elogio «uau»), o **cruzamento** com **acreditar** (mesmo tronco *credere*) e **fé** (lat. *fides* — **outro étimo**), o irmão **[inacreditável](${inacreditavel})**, e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · incrível](${WIKI}), [*incredibilis*](${WIKI_LAT}), [*credere* / *credo*](${WIKI_CREDERE}), [acreditar](${WIKI_ACREDITAR}), [crer](${WIKI_CRER}), [fé](${WIKI_FE}), [*fides*](${WIKI_FIDES}), série [Palavras](${hub}). **Ficha ≠ catecismo, ≠ dicionário académico completo, ≠ prova científica.** Respeito a quem tem fé; **sem** púlpito. Sem afiliação comercial.

**Gatilho:** *incrivel* / *INCREVEL* / *increvel* / *incredible* → lema **incrível**. *acreditar* / *crer* / *fé* nesta ficha = **cruzamento** — não fichas próprias (ainda).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **incrível** |
| Classe | Adjectivo · interjeição de elogio / assombro (uso oral BR) |
| Étimo (trabalho) | Lat. *incredibilis* ← *in-* («não») + *credibilis* («acreditável») ← *credere* («crer, confiar, dar crédito») — confiança: **alta** |
| Família *credere* | *acreditar* · *crer* · *crédito* · *crédulo* · *inacreditável* · *incrivelmente* · fr. *incroyable* · esp. *increíble* · ing. *incredible* |
| Família *fides* (vizinha, **não** o lema) | *fé* · *fiel* · *fidelidade* · *confiança* (em parte) — **outro tronco** |
| Tipo BudGanja | Palavra — incredulidade × elogio BR × cruzamento acreditar / fé |
| Elo mínimo | **acreditar** / **crer** — o verbo do mesmo tronco |
| Elo fé | **[fé](${WIKI_FE})** (lat. [*fides*](${WIKI_FIDES})) · canção [Amor e Fé](${amorEFe}) — **cruzam; não fundem** |
| Elo irmão | [inacreditável](${inacreditavel}) — *in-* + *acreditável* (via *acreditar*, não via *incredibilis*) |
| Elo elogio | [legal](${legal}) · [especial](${especial}) · [genial](${genial}) · [fantástico](${fantastico}) · [fabuloso](${fabuloso}) · [maravilhoso](${maravilhoso}) · [magnífico](${magnifico}) |
| Elo assombro | [jesusudavi](${jesusudavi}) · [jesusamado](${jesusamado}) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [criatividade](${criatividade}) · [Valeu !!!](${mantra}) |
| Fonte | [Wikcionário · incrível](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo que diz «isto **não cabe** no crível» — e, no BR vivo, também «isto **merece** o peito alto» («incrível!» como elogio dilatado). No lab: *incrível* bom = eixo nomeado + objecto; *incrível* mau = uau que dispensa [verdade](${verdade}) ou púlpito colado no étimo.

## 2. Hipóteses e método

**H1:** *incrível* herda *incredibilis* — o chão é o **não-crível** (*in-* + *credere*).  
**H2:** **acreditar** é o verbo da mesma família; *incrível* é a **qualidade** do que resiste (ou dilata) esse verbo. Cruzam-se; **não** se fundem.  
**H3:** **fé** (*fides*) é **outro tronco**. Pode cruzar o ofício (peito que segura o não-provado); **não** é sinónimo de *incrível* nem de *acreditar*.  
**H4:** no BR, o sentido **elogio** («que incrível!») é expansão afectiva estável, não erro.  
**H5:** [Valeu !!!](${mantra}) fecha o uau — o melhor possível **hoje**, mesmo sem ser «incrível».

Passos: (1) étimo *credere*; (2) cruzamento acreditar × fé; (3) escala e cortes; (4) rede; (5) limites.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Lat. *credere* | Crer, confiar, dar crédito | Alta |
| Lat. *credibilis* | Digno de crédito / que se pode crer | Alta |
| Lat. *incredibilis* | Que **não** se pode crer | Alta |
| PT *incrível* | Adjectivo; no BR também interjeição de elogio | Alta |
| PT *acreditar* | *a-* + *creditar* ← *credere* — **mesmo tronco** | Alta |
| PT *crer* | Via mais curta do mesmo *credere* | Alta |
| PT *fé* ← lat. *fides* | Confiança / lealdade / fé religiosa — **outro étimo** | Alta (corte) |
| [inacreditável](${inacreditavel}) | *in-* + *acreditável* (via *acreditar*) — irmão, não clone | Alta |

**Veredicto etimológico:** origem **latina** fechada (*credere* → *incredibilis* → incrível). O que oscila é a **sala de uso** (incredulidade × elogio × fé colada). A fé **não** entra pelo étimo de *incrível*.

## 4. Incrível × acreditar × fé (o cruzamento pedido)

Pedido de campo: *cruze com acreditar ou fé*. O laboratório lê o **triângulo** — sem fundir as peças:

| Peça | Papel | Sem a outra |
|------|-------|-------------|
| **incrível** | A **qualidade** — o que não cabe no crível; no BR também o uau | Elogio vazio; incredulidade sem facto |
| **acreditar** / **crer** | O **verbo** *credere* — dar crédito a um objecto | Crédito sem objecto; fé disfarçada de prova |
| **fé** (*fides*) | Confiança / lealdade / peito que segura o não-fechado | Dogma; púlpito; «é incrível, logo é fé» |

**Regra:** [cruzar](${verdade}) A com B ≠ fundir A e B. *Incrível* não engole *acreditar*; *fé* não substitui o *in-* de *incredibilis*.

| Situação | Bom (ofício) | Mau (ruído) |
|----------|--------------|-------------|
| Mesmo tronco | *incrível* marca o limite do **acreditar** | Fingir que *incrível* = *acreditar* |
| Elogio BR | «Que incrível!» com objecto + [gesto](${gesto}) | Uau que apaga a [verdade](${verdade}) |
| Fé | Ter [fé](${WIKI_FE}) **no** incrível (peito aberto) · ver [Amor e Fé](${amorEFe}) | Colar *fides* no étimo *credere* |
| Prova | «É incrível **e** ainda assim inspeciono» | «É incrível, então é verdade» = falso |
| Irmão | [inacreditável](${inacreditavel}) = via *acreditar* | Fingir diferença sem matiz |

Dá para achar incrível **sem** fé (assombro, hipérbole, elogio). Dá para ter fé **no** incrível (o peito segura o que a prova ainda não fecha). Dá para **acreditar** no que deixou de ser incrível — o crédito chegou. Três ofícios; um cruzamento; zero fusão.

## 5. Dois eixos do lema — incredulidade × elogio BR

| Eixo | Exemplo | Bom × mau no lab |
|------|---------|------------------|
| **Inacreditável / não-crível** | «É incrível que ainda falte rasto» | Bom: nomear o espanto · Mau: negar o facto |
| **Elogio dilatado** | «Relato incrível!» | Bom: calor + o quê acertou · Mau: hype sem [gesto](${gesto}) |
| **Grau / intensificador** | «Incrivelmente claro» | Bom: marcar qualidade · Mau: adorno vazio |
| **Contraste com [genial](${genial})** | Genial = engenho; *incrível* = fora do crível | Bom: separar ferramentas · Mau: tudo «elogio» |
| **Contraste com [legal](${legal})** | Legal = aprovação leve; *incrível* = grau alto | Bom: escala · Mau: o mesmo tom para tudo |
| **Contraste com [inacreditável](${inacreditavel})** | Quase sinónimos afectivos; via *acreditar* vs via *incredibilis* | Bom: matiz · Mau: clone cego |

### Escala de elogio (fichas existentes)

| Degrau | Ficha | Tom |
|--------|-------|-----|
| Aprovação leve / bacana | [legal](${legal}) (eixo gíria) | Ok, massa, segue |
| Particular / distinto | [especial](${especial}) | Selecção, não hype universal |
| Engenho reconhecido | [genial](${genial}) | Feito com método |
| Louvor alto / fora do comum | [fantástico](${fantastico}) | Uau com cor |
| Louvor «de conto» | [fabuloso](${fabuloso}) | Admirável com perfume de fábula |
| Fora do crível / uau dilatado | **incrível** (esta ficha) | Incredulidade **ou** louvor alto |
| Além da crença (via *acreditar*) | [inacreditável](${inacreditavel}) | Beyond belief — peito no tecto |
| Assombro caloroso | [maravilhoso](${maravilhoso}) | Espanto + calor |
| Grandeza | [magnífico](${magnifico}) | Elogio de porte |

**Veredicto contraste:** *incrível* sobe o grau do «não-crível»; literacia = **nomear o degrau** e o **eixo** (incredulidade ≠ elogio ≠ fé).

## 6. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Incrível** | Sinónimo preguiçoso de *fé* | Qualidade do não-crível / uau BR ← *incredibilis* |
| **Acreditar** | O mesmo que ter fé | Verbo *credere* — dar crédito a um objecto |
| **Fé** | O mesmo que achar incrível | *fides* — confiança / lealdade; pode cruzar o peito |
| **«É incrível, é verdade»** | Prova | Falácia — o uau não inspeciona |
| **«Não acredito, então paro»** | Humildade | Anti-ofício — o lab corre no [gesto](${gesto}) |
| **[Inacreditável](${inacreditavel})** | Clone | Irmão: via *acreditar*, grafia mais cheia |
| **[Amor e Fé](${amorEFe})** | Esta ficha | Canção — ofício de **ficar**; não o lema *incrível* |

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **Acreditar** / **crer** (*credere*) | Verbo do mesmo tronco — par pedido desta ficha |
| **Fé** (*fides*) · [Amor e Fé](${amorEFe}) | Outro tronco; cruzamento de peito, não de étimo |
| [Inacreditável](${inacreditavel}) | Irmão semântico — via *acreditar* |
| [Legal](${legal}) · [especial](${especial}) · [genial](${genial}) · [fantástico](${fantastico}) · [fabuloso](${fabuloso}) · [maravilhoso](${maravilhoso}) · [magnífico](${magnifico}) | Escala de elogio já fichada |
| [jesusudavi](${jesusudavi}) · [jesusamado](${jesusamado}) | Assombro oral BR |
| [Verdade](${verdade}) · [gesto](${gesto}) · [criatividade](${criatividade}) · [caminho](${caminho}) | Ofício sem flattery |
| [Aff](${aff}) · [Já](${ja}) | Termómetro / fecho prematuro |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo da polissemia |
| [eu amo a vida](${euAmo}) · [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

### Como ler

1. Entrar pela **qualidade** (esta ficha) ou pelo **verbo** (acreditar / crer).  
2. Se vier pela **fé**, declarar o tronco: *fides* ≠ *credere*.  
3. Se vier pelo uau, pedir o objecto: incrível **o quê**?  
4. Se vier pelo [inacreditável](${inacreditavel}), são irmãos — não clones.  
5. Fechar com [Valeu !!!](${mantra}).

## Poema Vida

\`\`\`poem
${poemIncrivelPt()}
\`\`\`

## 8. Limites

- Não é tratado de teologia nem guia de conversão.  
- Não esgota a sinonímia de elogio.  
- Não moraliza o uso oral «incrível!» (= uau).  
- Não trata «incrível» como prova científica.  
- **Acreditar** e **fé** ainda não têm ficha-palavra própria: aqui o ofício é o **cruzamento**. A canção [Amor e Fé](${amorEFe}) cobre o par amor × fé no ecrã, não este lema.  
- [Inacreditável](${inacreditavel}) fica na ficha irmã.

## Status

**Aprovado** — **incrível** fichado: objecto (*credere* → *incredibilis*), eixos incredulidade × elogio BR, **cruzamento com acreditar** (mesmo tronco) **e fé** (*fides*, outro étimo; cruzam, não fundem), irmão [inacreditável](${inacreditavel}); [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Inacreditável](${inacreditavel}) · [▶ Amor e Fé](${amorEFe}) · [▶ Verdade](${verdade}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Inspection of Portuguese **[incrível](${self})** — Lat. *incredibilis* (“not believable”). Field request: *inspect incrível; cross it with acreditar or fé*. Covers the **object**, BR **unbelief × praise**, the **crossing** with **acreditar** (same *credere* trunk) and **fé** (Lat. *fides* — **another etymon**), sibling **[inacreditável](${inacreditavel})**. Close: [Valeu !!!](${mantra}).

> Note: [Wiktionary · incrível](${WIKI}), [*incredibilis*](${WIKI_LAT}), [acreditar](${WIKI_ACREDITAR}), [*fides*](${WIKI_FIDES}). Word sheet ≠ catechism, ≠ proof.

## Object

| Field | Value |
|-------|-------|
| Word | **incrível** |
| Etymon | Lat. *incredibilis* ← *in-* + *credibilis* ← *credere* (high confidence) |
| Lab type | Unbelief × BR praise × **acreditar / fé** crossing |
| Same trunk | **acreditar** / **crer** — the verb of *credere* |
| Other trunk | **fé** ← *fides* — trust / faith; crosses the chest, not the etymon |
| Sibling | [inacreditável](${inacreditavel}) — via *acreditar* |
| Date | ${inspected} |

**Crossing:** *incrível* names the **quality** (what will not fit in believing, or BR “wow”). *Acreditar* names the **verb**. *Fé* is **another root**. You can find it incredible without faith; you can have faith in the incredible. Craft: name the axis; do not fuse.

\`\`\`poem
${poemIncrivelEn()}
\`\`\`

## Status

**Approved** — *incredibilis* path documented; unbelief distinguished from praise, *acreditar*, and *fé*; sibling [inacreditável](${inacreditavel}) linked.

[▶ Words](${hub}) · [▶ Inacreditável](${inacreditavel}) · [▶ Amor e Fé](${amorEFe}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **[incrível](${self})** — lat. *incredibilis* («que no se puede creer»). Pedido de campo: inspeccionar *incrível* y **cruzarlo con acreditar o fé**. Cubre **objeto**, oficios BR (incredulidad × elogio), el **cruce** con **acreditar** (mismo tronco *credere*) y **fé** (lat. *fides* — **otro étimo**), hermano **[inacreditável](${inacreditavel})**. Cierre: [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · incrível](${WIKI}), [*incredibilis*](${WIKI_LAT}), [acreditar](${WIKI_ACREDITAR}), [*fides*](${WIKI_FIDES}). Ficha ≠ catecismo, ≠ prueba.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **incrível** |
| Étimo | Lat. *incredibilis* ← *in-* + *credibilis* ← *credere* (confianza alta) |
| Tipo lab | Incredulidad × elogio BR × cruce **acreditar / fé** |
| Mismo tronco | **acreditar** / **crer** — el verbo de *credere* |
| Otro tronco | **fé** ← *fides* — confianza / fe; cruza el pecho, no el étimo |
| Hermano | [inacreditável](${inacreditavel}) — vía *acreditar* |
| Fecha | ${inspected} |

**Cruce:** *incrível* nombra la **cualidad**; *acreditar* nombra el **verbo**; *fé* es **otra raíz**. Se puede hallar incrível sin fe; se puede tener fe en lo incrível. Oficio: nombrar el eje; no fusionar.

\`\`\`poem
${poemIncrivelEs()}
\`\`\`

## Estado

**Aprobada** — vía *incredibilis* documentada; incredulidad distinta de elogio, *acreditar* y *fé*; hermano [inacreditável](${inacreditavel}).

[▶ Palabras](${hub}) · [▶ Inacreditável](${inacreditavel}) · [▶ Amor e Fé](${amorEFe}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildIncrivelPost() {
  const { body, contentEn, contentEs, wiki } = buildIncrivelBodies();
  let seriesOrder = 48;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-incrivel');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    }
  } catch (_) {
    /* keep 48 */
  }

  return makePalavra({
    title: 'Inspeção: Incrível — incredibilis, cruzado com acreditar e fé',
    titleEn: 'Inspection: Incrível — incredibilis, crossed with acreditar and fé',
    titleEs: 'Inspección: Incrível — incredibilis, cruzado con acreditar y fé',
    excerpt:
      'Palavras: «incrível» (lat. *incredibilis* ← *credere*) — incredulidade e elogio BR; cruza com acreditar (mesmo tronco) e fé (*fides*, outro étimo); Valeu !!!',
    excerptEn:
      'Words: “incrível” (Lat. *incredibilis* ← *credere*) — unbelief and BR praise; crosses with acreditar (same trunk) and fé (*fides*, other etymon); Valeu !!!',
    excerptEs:
      'Palabras: «incrível» (lat. *incredibilis* ← *credere*) — incredulidad y elogio BR; cruza con acreditar (mismo tronco) y fé (*fides*, otro étimo); ¡Valeu !!!',
    slug: 'inspecao-palavra-incrivel',
    date: '2026-08-03T22:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Incrível · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildIncrivelPost,
  buildIncrivelBodies,
  poemIncrivelPt,
  poemIncrivelEn,
  poemIncrivelEs
};
