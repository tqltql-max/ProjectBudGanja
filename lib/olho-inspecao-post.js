'use strict';

/**
 * Inspeção Palavras · olho
 * Pedido 1: inspeção da palavra Olho.
 * Pedido 2: cruzada com Zaroio.
 *
 * Duas peças, um campo:
 *   olho   — lat. oculus «olho» (órgão, olhar, abertura)
 *   zaroio — voz de campo de zarolho (estrábico / cego de um olho)
 * Zaroio = lh → i (oio); o olho mora dentro. O prefixo é a peça incerta.
 * Verbo olho (eu olho) = mesma família, outra classe.
 * Gr. ophthalmós e EN eye = outras árvores.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/olho-palavra-cover.jpg';
const WIKT_OLHO = 'https://pt.wiktionary.org/wiki/olho';
const WIKT_OLHO_EN = 'https://en.wiktionary.org/wiki/olho';
const WIKT_OCULUS = 'https://en.wiktionary.org/wiki/oculus#Latin';
const WIKT_ZAROLHO = 'https://pt.wiktionary.org/wiki/zarolho';
const WIKT_ZAROLHO_EN = 'https://en.wiktionary.org/wiki/zarolho';
const WIKT_ZANOLHO = 'https://en.wiktionary.org/wiki/zanolho';
const WIKT_OLHAR = 'https://pt.wiktionary.org/wiki/olhar';
const WIKT_VESGO = 'https://pt.wiktionary.org/wiki/vesgo';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Olho.
Não é o verbo que eu olho.
É o órgão.
É o olhar nomeado em substância.

Latim oculus.
Não é o grego ophthalmós.
Não é o inglês eye.

Zaroio.
A boca cola o lh no i.
Zarolho no papel.
Zaroio no ouvido.

O olho que não vai com o outro.
Não é xingo.
É o eixo que desviou.

A orelha ouve oio dentro de zaroio.
O étimo corta o prefixo incerto
e guarda o olho.

Valeu !!!
ver direito
sem zombar do eixo.`;
}

function poemEn() {
  return `Olho.
Not the verb I look.
It is the organ.
It is the look named as a noun.

Latin oculus.
Not Greek ophthalmós.
Not English eye.

Zaroio.
The mouth glues lh into i.
Zarolho on paper.
Zaroio in the ear.

The eye that does not go with the other.
It is not a slur.
It is the axis that wandered.

The ear hears oio inside zaroio.
The etymon cuts the uncertain prefix
and keeps the eye.

Valeu !!!
see straight
without mocking the axis.`;
}

function poemEs() {
  return `Olho.
No es el verbo que yo miro.
Es el órgano.
Es la mirada nombrada en sustancia.

Latín oculus.
No es el griego ophthalmós.
No es el inglés eye.

Zaroio.
La boca pega el lh en la i.
Zarolho en el papel.
Zaroio en el oído.

El ojo que no va con el otro.
No es insulto.
Es el eje que se desvió.

El oído oye oio dentro de zaroio.
El étimo corta el prefijo incierto
y guarda el ojo.

¡Valeu !!!
ver derecho
sin burlarse del eje.`;
}

function buildOlhoBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-olho.html';
  const oculos = '/posts/post-inspecao-palavra-oculos.html';
  const orelha = '/posts/post-inspecao-palavra-orelha.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const sinais = '/posts/post-inspecao-palavra-sinais.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const lua = '/posts/post-inspecao-palavra-lua.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const miss = '/posts/post-inspecao-palavra-miss.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const mama = '/posts/post-inspecao-palavra-mama.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[olho](${self})** — lat. *oculus*: o órgão da visão, e por extensão o olhar, a abertura, o broto. Pedido de campo: *inspeção da palavra Olho*. Eco: *cruze com Zaroio*.

Duas peças, um campo. O **objecto** é o vocábulo português *olho*. O **cruzamento** é **zaroio** — voz de campo de **zarolho** (estrábico / cego de um olho / olhar torto). [A orelha cola](${orelhaCola}) *zaroio* em *olho* porque ouve o **-oio** (o *lh* que virou *i*). O [étimo](${etimo}) **corta**: o olho é *oculus*; o prefixo de *zarolho* é a peça **incerta** (via provável *zanolho* ← *zanaga* + *olho*). Objecto = o **vocábulo**. Não é oftalmologia. Não é xingo. Não é horóscopo do terceiro olho. O **objecto** que se põe à frente do olho é a ficha [óculos](${oculos}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · olho](${WIKT_OLHO}), EN [*olho*](${WIKT_OLHO_EN}), lat. [*oculus*](${WIKT_OCULUS}), [zarolho](${WIKT_ZAROLHO}), EN [*zarolho*](${WIKT_ZAROLHO_EN}), [*zanolho*](${WIKT_ZANOLHO}), [olhar](${WIKT_OLHAR}), [vesgo](${WIKT_VESGO}). Método: [etimologia](${etimologia}) — étimo × cola × sala. **Ficha ≠ laudo clínico, ≠ dicionário de insulto, ≠ manual de mau-olhado.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *olho* / *olhos* / *olhar* / *eu olho* / *zaroio* / *zarolho* / *zanolho* / *caolho* / *vesgo* / *olho gordo* / *olho por olho*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **olho** (plural **olhos**) |
| Classe | Substantivo masculino; homógrafo: 1.ª pess. de *olhar* |
| Étimo (trabalho) | Lat. *oculus* «olho» ← PIE *h₃ekʷ-* «ver» — confiança: **alta** |
| Cruzamento | **zaroio** = voz de campo de **zarolho** (estrábico / um olho) |
| Grafia de campo | **zaroio** (*lh* → *i*, como *olho* → *oio*) |
| Lema no papel | **zarolho** — confiança da equivalência: **alta** |
| Étimo do cruzamento | Provável alteração de *zanolho* ← *zanaga* + *olho* — confiança: **média** |
| Tipo BudGanja | Palavra — órgão × olhar × eixo desviado |
| Não é | Oftalmologia · xingo · terceiro olho · talião |
| Data | ${inspected} |
| Fonte | [olho](${WIKT_OLHO}) |

**O que é o objecto:** o nome português do **órgão que vê** — e, vivo, do **olhar**, do **furo** (agulha, fechadura, queijo), do **broto** da [planta](${planta}), da **nascente** (*olho-d'água*). No lab: [objecto](${self}) lexical. *Zaroio* não é outro órgão: é o **olho que não vai com o outro**.

## 2. Duas peças — o cruzamento

Pedido de campo: *Olho* × *Zaroio*. O lab **cruza** e **não funde**.

| Peça | Forma | Origem | Ofício nesta ficha |
|------|-------|--------|---------------------|
| **Órgão** | *olho* | lat. *oculus* | O que vê; o olhar nomeado |
| **Eixo desviado** | *zaroio* / *zarolho* | *olho* + prefixo incerto (*zanaga*?) | O olho que não alinha |
| **Voz de campo** | *zaroio* | *lh* palatal → *i* (caipira / fala BR) | O ouvido; o papel guarda *zarolho* |
| **Verbo cortado na classe** | *eu olho* | mesma família *oculāre* / *olhar* | Homógrafo — **outra classe** |
| **Árvore cortada** | *ophthalmós* / *eye* | grego / germânico | Medicina culta e EN — **não** o étimo PT |

**H-cruzamento:** *zaroio* é *olho* com o eixo a vagar. A [relação](${relacao}) é de ofício (ver) e, na via *zanolho*, de **sangue parcial** (*+ olho*). Não é prova de que *zar-* seja étimo fechado.  
**H-orelha:** [a orelha](${orelhaCola}) ouve *oio* dentro de *zaroio* — o mesmo *olho* caipira (*olho* /ˈo.ju/). A cola é útil; o lab **nomeia as duas grafias**.  
**H-ofício:** nomear *zaroio* ≠ zombar. O [gesto](${gesto}) do lab é ver direito o vocábulo, não o corpo alheio.

## 3. *olho* — *oculus* (o órgão)

O [Wikcionário](${WIKT_OLHO}) fecha o étimo: lat. *oculus*, datado no galego-português do século XIII. Família à vista: *olhar*, *óculo*, *ocular*, *inocular*, *binóculo*; esp. *ojo* · fr. *œil* · it. *occhio* · gl. *ollo*. O inglês *ocular* / *oculist* entra por via culta. O inglês **eye** é germânico — **paralelo**, não pai.

| Camada | Leitura | Sala |
|--------|---------|------|
| **Órgão** | Visão; par no rosto; mapa de [sinais](${sinais}) | Esta ficha |
| **Olhar** | Percepção, juízo («aos olhos de») | Mesma árvore, sentido |
| **Ofício** | *olho clínico* / *olho vivo* — perspicácia | Metáfora de ver bem |
| **Abertura** | Agulha, fechadura, queijo, olho de boi | Mesmo vocábulo, outro referente |
| **Broto** | Olho da [planta](${planta}) — gema, rebento | Botânica; não oftalmologia |
| **Nascente** | *olho-d'água* | Geografia; água que «abre o olho» |
| **Céu** | Olho do ciclone | Meteorologia |
| **Verbo** | *eu olho* | Homógrafo — classe verbal |

**H-luz:** o olho recebe [luz](${luz}). Sem *lūx* não há visão nomeada. [Sol](${sol}) e [lua](${lua}) são astros que o olho mede; não são o órgão.  
**H-olho-gordo:** *olho gordo* / mau-olhado é sala de **folclore e inveja** — não o étimo de *olho*.  
**H-talião:** *olho por olho* é a conta da retaliação — ver [vingança](${vinganca}). Outra sala.  
**H-terceiro:** *terceiro olho* é esoterismo. Cortar desta ficha.

## 4. *zaroio* — *zarolho* no ouvido

Pedido eco: **Zaroio**. Grafia de campo. Lema no papel: **zarolho**.

No Brasil, o *lh* palatal (/ʎ/) vira *i* / *j* em muita fala (caipira e além): *filho* → *fio*, *mulher* → *muie*, *olho* → *oio*. Daí **zarolho** → **zaroio**. O lab **honra o ouvido** e **guarda o lema**.

| Forma | Papel | Confiança |
|-------|-------|-----------|
| **zaroio** | Voz de campo (pedido) | Alta como fala |
| **zarolho** | Lema dicionarizado | Alta |
| **zanolho** | Forma irmã; via de étimo | Média–alta a forma; média o blend |
| **caolho** / **vesgo** / **zambaio** | Sinónimos de ofício | Alta o uso; étimos **outros** |
| **opinião zarolha** | Figurado: incompleto, torto | Alta o uso; sala moral, não clínica |

Sentidos dicionarizados de *zarolho* (Aulete / Dicio / Wikcionário):

1. estrábico — eixos visuais que não alinham (*vesgo*);  
2. cego de um olho / sem um olho (*caolho*);  
3. figurado: malfeito, incompleto, torto («concepção zarolha»);  
4. Brasil N/NE: milho a começar a amadurecer — **possível outra sala** (ver *sarolho* / fruto verde; não fundir sem fonte).

**H-zanolho:** o EN Wiktionary lê *zarolho* como alteração de [*zanolho*](${WIKT_ZANOLHO}), e *zanolho* como blend *zanaga* + *olho*. Hipótese de **trabalho**: o segundo membro **é** *olho*. O primeiro (*zanaga* / *zar-*) permanece **obscuro**.  
**H-Aulete:** «possivelmente de *olho*» — confirma a peça visível; não fecha o prefixo.  
**H-não-xingo:** na rua, *zarolho* / *zaroio* vira epíteto. O lab **nomeia o eixo** e **recusa o insulto**. Se houver questão clínica (estrabismo, visão), esta ficha **não trata** — procurar cuidado de saúde.

## 5. O que a boca faz com o olho

| Camada BR | Leitura | Sala |
|-----------|---------|------|
| **abrir o olho** | Acautelar-se | [Risco](${risco}) — ofício |
| **de olho em** | Atenção / desejo | Olhar dirigido |
| **olho gordo** | Inveja / mau-olhado | Folclore |
| **olho por olho** | Talião | [Vingança](${vinganca}) |
| **olho clínico** | Ver a causa | Ofício de inspecionar |
| **eu olho** | Verbo *olhar* | Homógrafo |
| **zaroio / zarolho** | Eixo desviado / um olho | Esta ficha — cruzamento |
| **vesgo** | Sinónimo vivo | Outra ficha possível |
| **um olho no peixe e outro no gato** | Dois alvos | Provérbio — atenção partida |
| **em terra de cego…** | Um olho é rei | Ditado — **não** étimo |

**H-miss:** falhar o alvo com o olho cruza [miss](${miss}) (germ. *missan*) por **ofício**, não por sangue. O olho que *miss* não é *zaroio*; *zaroio* é alinhamento, não tiro.  
**H-coração:** *os olhos são o espelho da alma* cola olho em [coração](${coracao}). Metáfora cultural; o étimo **não** mistura *oculus* e *cor*.

## 6. Hipóteses

**H1:** PT *olho* < lat. *oculus* — alta.  
**H2:** *olhar* / *eu olho* são a mesma família (*oculus* / *oculāre*) — alta; a classe verbal é outra sala.  
**H3:** EN *eye* e gr. *ophthalmós* são outras árvores — alta o corte.  
**H4:** *zaroio* = *zarolho* na fala (*lh* → *i*) — alta.  
**H5:** *zarolho* via *zanolho* ← *zanaga* + *olho* — média (forma irmã alta; blend médio).  
**H6:** o cruzamento é o **olho que não alinha**; não é outro órgão — alta.  
**H7:** usos figurados (*opinião zarolha*, milho *zarolho*) podem ser extensão ou sala vizinha — média; não fundir com oftalmologia.  
**H8:** *olho gordo*, *olho por olho* e *terceiro olho* são outras salas — alta.  
**H9:** nomear ≠ zombar; a ficha não é insulto nem laudo — alta (ofício).  
**H10:** o lab alumia com [verdade](${verdade}): ver o vocábulo direito.

## 7. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | olho = zaroio | Órgão × eixo desviado |
| **Zaroio** | Palavra outra | *Zarolho* no ouvido |
| **Zarolho** | Só xingo | Nome do eixo / de um olho |
| **Eu olho** | O mesmo lema | Verbo — mesma família, outra classe |
| **Eye / ophthalmology** | Étimo de *olho* | Germânico / grego — paralelos |
| **Olho da planta** | Outra palavra | Mesmo vocábulo — broto |
| **Olho gordo** | O órgão invejoso | Folclore — outra sala |
| **Terceiro olho** | Anatomia extra | Esoterismo — cortado |

## 8. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *olho* como lat. *oculus* — órgão e olhar |
| Bom | Cruzar com *zaroio* / *zarolho* sem fundir órgão e eixo |
| Bom | Honrar a fala *zaroio* e guardar o lema *zarolho* |
| Bom | Cortar *eye*, *ophthalmós*, talião, mau-olhado e terceiro olho |
| Bom | Recusar o xingo; nomear o vocábulo |
| Mau | Tratar a pessoa como chiste *zaroio* |
| Mau | Ficha de oftalmologia ou de mau-olhado |
| Mau | Fundir *eu olho* (verbo) com o órgão sem marcar a classe |
| Mau | Derivar *olho* de *eye* porque ambos vêem |

## 9. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=olho)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Óculos](${oculos}) | Objecto — lentes + armação **diante** do olho; mesmo *oculus*, outra classe |
| [Orelha](${orelha}) · [orelha cola](${orelhaCola}) | O ouvido que cola *oio* em *zaroio*; as hastes dos [óculos](${oculos}) assentam aqui |
| [Sinais](${sinais}) · [mama](${mama}) | Mapa do corpo — o olho no rosto |
| [Luz](${luz}) · [sol](${sol}) · [lua](${lua}) | O que o olho recebe e mede |
| [Miss](${miss}) | Falhar o alvo — ofício vizinho, não sangue |
| [Coração](${coracao}) | Espelho da alma — metáfora, não étimo |
| [Planta](${planta}) | Olho = broto / gema |
| [Risco](${risco}) | Abrir o olho |
| [Vingança](${vinganca}) | Olho por olho — talião |
| [Étimo](${etimo}) · [etimologia](${etimologia}) · [relação](${relacao}) | Peça × ofício × cruzamento |
| [Língua portuguesa](${lingua}) · [verdade](${verdade}) · [gesto](${gesto}) | Solo e ofício |
| [Vida](${vida}) | O peito que vê |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é laudo de estrabismo, oftalmologia nem aconselhamento médico.  
- Não é dicionário de insulto nem ficha de mau-olhado.  
- O prefixo de *zarolho* permanece **em aberto** (via *zanolho* / *zanaga* como hipótese de trabalho).  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **olho** fichado como lat. *oculus* (órgão e olhar); cruzado com **zaroio** (voz de campo de **zarolho**: o olho que não alinha). *Lh* → *i*. Via *zanolho* ← *zanaga* + *olho* (média). Verbo *eu olho* cortado na classe. *Eye* / *ophthalmós* cortados na árvore. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Óculos](${oculos}) · [▶ Orelha](${orelha}) · [▶ Sinais](${sinais}) · [▶ Luz](${luz}) · [▶ Miss](${miss}) · [▶ Poema Vida](/vida/#poema=olho) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vidaHub})
`;

  const contentEn = `## Scope

Inspection of Portuguese **olho** (eye) — Lat. *oculus*. Field request: the **word**. Echo: cross it with **zaroio**.

Two pieces, one field. The **object** is *olho*. The **crossing** is *zaroio* — field voice of **zarolho** (cross-eyed / one-eyed / a look that does not line up). The [ear](${orelhaCola}) hears *-oio* (the palatal *lh* turned *i*, as in caipira *olho* → *oio*). The [etymon](${etimo}) **cuts**: the eye is *oculus*; the prefix of *zarolho* is the **uncertain** piece (working path: *zanolho* ← *zanaga* + *olho*). Not ophthalmology. Not a slur. Not a third-eye sheet.

> Sources: [olho](${WIKT_OLHO}), [*oculus*](${WIKT_OCULUS}), [zarolho](${WIKT_ZAROLHO}), [*zanolho*](${WIKT_ZANOLHO}). Method: [etymology](${etimologia}). Close: [Valeu !!!](${mantra}).

## Two pieces

| Piece | Form | Origin | Office |
|-------|------|--------|--------|
| **Organ** | *olho* | Lat. *oculus* | What sees; the look as a noun |
| **Wandered axis** | *zaroio* / *zarolho* | *olho* + uncertain prefix | The eye that does not line up |
| **Field voice** | *zaroio* | *lh* → *i* | The ear; paper keeps *zarolho* |
| **Verb (cut class)** | *eu olho* | same family *olhar* | Homograph — another class |
| **Cut trees** | *ophthalmós* / *eye* | Greek / Germanic | Not the PT etymon |

English *eye* is a parallel, not a parent. Greek *ophthalmós* feeds the clinic’s Latinate vocabulary. Portuguese *olho* is *oculus*.

To name *zaroio* is not to mock. If there is a clinical question, this sheet does not treat it.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *olho* < *oculus*. Crossed with *zaroio* / *zarolho*. *Lh* → *i*. Prefix still open. Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **olho** (ojo) — lat. *oculus*. Pedido: la **palabra**. Eco: cruzarla con **zaroio**.

Dos piezas, un campo. El **objeto** es *olho*. El **cruce** es *zaroio* — voz de campo de **zarolho** (bizco / tuerto / mirada que no alinea). El [oído](${orelhaCola}) oye *-oio* (el *lh* palatal vuelto *i*). El [étimo](${etimo}) **corta**: el ojo es *oculus*; el prefijo de *zarolho* es la pieza **incierta** (vía de trabajo: *zanolho* ← *zanaga* + *olho*). No es oftalmología. No es insulto. No es ficha del tercer ojo.

> Fuentes: [olho](${WIKT_OLHO}), [*oculus*](${WIKT_OCULUS}), [zarolho](${WIKT_ZAROLHO}), [*zanolho*](${WIKT_ZANOLHO}). Método: [etimología](${etimologia}). Cierre: [¡Valeu !!!](${mantra}).

## Dos piezas

| Pieza | Forma | Origen | Oficio |
|-------|-------|--------|--------|
| **Órgano** | *olho* | lat. *oculus* | Lo que ve; la mirada como nombre |
| **Eje desviado** | *zaroio* / *zarolho* | *olho* + prefijo incierto | El ojo que no alinea |
| **Voz de campo** | *zaroio* | *lh* → *i* | El oído; el papel guarda *zarolho* |
| **Verbo (clase cortada)** | *eu olho* | misma familia *olhar* | Homógrafo — otra clase |
| **Árboles cortados** | *ophthalmós* / *eye* | griego / germánico | No el étimo PT |

El inglés *eye* es paralelo, no padre. El griego *ophthalmós* alimenta el léxico clínico. El portugués *olho* es *oculus*.

Nombrar *zaroio* no es burlarse. Si hay cuestión clínica, esta ficha no trata.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *olho* < *oculus*. Cruzada con *zaroio* / *zarolho*. *Lh* → *i*. Prefijo abierto. Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildOlhoPost() {
  const { body, contentEn, contentEs } = buildOlhoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-olho', 295);
  return makePalavra({
    title: 'Inspeção: Olho — oculus; cruzado com zaroio (zarolho)',
    titleEn: 'Inspection: Olho — oculus; crossed with zaroio (zarolho)',
    titleEs: 'Inspección: Olho — oculus; cruzado con zaroio (zarolho)',
    excerpt:
      'Palavras: olho (lat. oculus) × zaroio (voz de zarolho — o olho que não alinha); lh → i; ≠ eye ≠ ophthalmós; Valeu !!!',
    excerptEn:
      'Words: olho (Lat. oculus) × zaroio (field voice of zarolho — the eye that does not line up); lh → i; ≠ eye ≠ ophthalmós; Valeu !!!',
    excerptEs:
      'Palabras: olho (lat. oculus) × zaroio (voz de zarolho — el ojo que no alinea); lh → i; ≠ eye ≠ ophthalmós; ¡Valeu !!!',
    slug: 'inspecao-palavra-olho',
    date: '2026-08-24T11:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Olho · zaroio · oculus',
    coverImage: COVER,
    sourceUrl: WIKT_OLHO,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildOlhoPost,
  buildOlhoBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_OLHO,
  WIKT_ZAROLHO,
  WIKT_OCULUS,
  WIKT_ZANOLHO
};
