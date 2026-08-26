'use strict';

/**
 * Inspeção objecto · Band-Aid
 * Pedido: inspeçao do objeto bandad.
 * Eixos: EN band + aid · penso adesivo · marca × genérico BR ·
 * lapso bandad (cai o i) · ≠ esparadrapo ≠ gesso ≠ bandada · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/band-aid-objeto-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Band-Aid';
const WIKT_EN = 'https://en.wiktionary.org/wiki/Band-Aid';
const WIKT_CURATIVO = 'https://pt.wiktionary.org/wiki/curativo';
const WIKT_ESPARA = 'https://pt.wiktionary.org/wiki/esparadrapo';
const WIKT_PENSO = 'https://pt.wiktionary.org/wiki/penso';

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
    while (taken.has(seriesOrder) && seriesOrder < 800) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Band-Aid.
Não é bandad.

A boca come o i
de aid.
O étimo devolve:
faixa + ajuda.

Não é a marca que sara.
Não é o esparadrapo.
Não é o gesso.
Não é a bandada.
É o penso no corte.

Valeu !!!
a gaze é meio;
o gesto é cobrir.`;
}

function poemEn() {
  return `Band-Aid.
Not bandad.

The mouth drops the i
of aid.
The etymon gives it back:
strip + help.

Not the brand that heals.
Not the tape.
Not the cast.
Not the flock.
It is the dressing on the cut.

Valeu !!!
the pad is a medium;
the gesture is to cover.`;
}

function poemEs() {
  return `Band-Aid.
No es bandad.

La boca se come la i
de aid.
El étimo la devuelve:
tira + ayuda.

No es la marca que sana.
No es el esparadrapo.
No es el yeso.
No es la bandada.
Es el apósito en el corte.

¡Valeu !!!
la gasa es medio;
el gesto es cubrir.`;
}

function buildBandAidBodies() {
  const inspected = '2026-08-26';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-band-aid.html';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const objetos = '/objetos/';
  const curar = '/posts/post-inspecao-palavra-curar.html';
  const gesso = '/posts/post-inspecao-palavra-gesso.html';
  const sangue = '/posts/post-inspecao-palavra-sangue.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const revoada = '/posts/post-inspecao-expressao-revoada.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const palavra = '/posts/post-inspecao-palavra-palavra.html';
  const internet = '/posts/post-inspecao-palavra-internet.html';
  const isqueiro = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const oculos = '/posts/post-inspecao-palavra-oculos.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial do **objecto [Band-Aid](${self})** — no português do Brasil, o **penso adesivo** de bolso: uma faixa que cola na pele e uma almofada que cobre o corte. Pedido de campo: *inspeçao do objeto bandad*. **Bandad** não é outro lema — é o mesmo deslize de [Intenet](${internet}): cai uma letra no meio (*i* de *aid*). Esta ficha entra no catálogo [Objetos](${objetos}) como **coisa**. O verbo [curar](${curar}) é outro ofício; o [gesso](${gesso}) é outro molde; a [revoada](${revoada}) é outra sala (a orelha cola *bandada*). Não é protocolo de primeiros socorros, não é bula, não é anúncio da marca.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Band-Aid](${WIKI}), [Wikcionário EN · Band-Aid](${WIKT_EN}), [curativo](${WIKT_CURATIVO}), [esparadrapo](${WIKT_ESPARA}), [penso](${WIKT_PENSO}). **Ficha ≠ receita clínica, ≠ vitrine Johnson & Johnson, ≠ manual de ferida.** Sem afiliação comercial. Tom: Inspetor BudGanja — o penso **cobre**; não **sara** sozinho. Fecho: [Valeu !!!](${mantra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **Band-Aid** (penso adesivo); fala BR *band-aid* / *bandeíde* |
| Pedido de campo | **bandad** — lapso (cai o *i* de *aid*) |
| Classe | Substantivo — objecto de bolso; também nome comercial |
| Étimo (trabalho) | EN *band* («faixa») + *aid* («ajuda») — confiança: **alta** |
| Marca | Johnson & Johnson, **1920** (Earle Dickson) — confiança: **alta** (história pública) |
| Família BR | *curativo* (substantivo) · *penso rápido* (PT) · *bandeíde* (oral) |
| Cognatos / mapa | ing. *adhesive bandage* · esp. *tirita* / *curita* · fr. *pansement* · it. *cerotto* · al. *Pflaster* |
| Tipo BudGanja | Objecto — cobertura do corte × marca genericizada × lapso |
| Catálogo | [Objetos](${objetos}) · lema [objetos](${objetosLema}) |
| Não é | [Esparadrapo](${WIKT_ESPARA}) (só fita) · [gesso](${gesso}) · gaze sozinha · *bandada* / [revoada](${revoada}) · banda musical · o verbo [curar](${curar}) |
| Elo corpo | [sangue](${sangue}) · [gesto](${gesto}) · [lavar](${lavar}) · [risco](${risco}) |
| Elo ofício | [curar](${curar}) · [verdade](${verdade}) · [isqueiro BIC](${isqueiro}) (marca × tipo) |
| Fonte | [Band-Aid (WP)](${WIKI}) · [Band-Aid (EN)](${WIKT_EN}) |
| Data | ${inspected} |

**O que é o objecto:** uma **faixa adesiva** com uma **almofada** no meio. Cola na pele; a gaze (ou similar) assenta sobre o corte. Cabe no bolso, na carteira, na caixa da cozinha. O [gesto](${gesto}) é cobrir — não substituir o [curar](${curar}).

## 2. O lapso bandad

[A orelha cola](${orelhaCola}) o que a boca juntou. *Band-Aid* / *bandaid* tem o *i* de *aid*. **Bandad** perde essa vogal — o mesmo ofício de *Intenet* (cai o *r* de *inter-*). Não há objecto *bandad*. Há o penso, escrito depressa.

| Forma | Onde | Ofício nesta ficha |
|-------|------|-------------------|
| **Band-Aid** | Marca + lema EN | O nome comercial; no BR, muitas vezes o **tipo** |
| **band-aid** / **bandaid** | Fala e teclado BR | O objecto genérico — penso adesivo |
| **bandad** | Lapso de campo | Cai o *i* — **não** é outro lema |
| **bandeíde** / **bandeid** | Oral BR | O mesmo objecto na boca |
| **curativo** (substantivo) | BR | «Põe um curativo» = este objecto-família; o **adjectivo** *curativo* fica em [curar](${curar}) |
| **penso rápido** | PT europeu | O mesmo ofício com outro cartaz |
| **bandagem** | Família | Ligadura / envoltório — **outra escala** (não o rectângulo de bolso) |

**H-lapso:** *bandad* = *Band-Aid* sem o *i* — alta.  
**H-oral:** *bandeíde* é o mesmo lema na boca BR.  
**H-não:** *bandada* (bando de aves) é [revoada](${revoada}) — a orelha cola o *band-*; o étimo corta.

## 3. Marca × genérico × família (não misturar)

| Peça | Leitura | Confiança |
|------|---------|-----------|
| **Band-Aid** (marca) | Nome comercial J&J (1920). No lab: **história**, não endosso | Alta |
| **band-aid** (tipo BR) | Genericização viva — o rectângulo adesivo de qualquer casa | Alta no uso BR |
| **curativo** (coisa) | Substantivo BR do penso; o adjectivo fica em [curar](${curar}) | Alta |
| **esparadrapo** | Fita adesiva médica — **sem** a almofada do meio | Alta |
| **gaze** | Tecido do meio (ou irmão de farmácia) — peça, não o conjunto | Alta |
| **penso / penso rápido** | PT — o mesmo ofício com outro nome | Alta |
| **bandagem** | Enrolar / ligar — outra geometria | Alta |
| **[gesso](${gesso})** | Molde que **imobiliza** o membro — outra escala, outro mineral | Alta |
| **solução band-aid** (EN) | Metáfora: remendo curto que não trata a causa | Alta noutro mapa — **citar**, não âncora |

Como o [isqueiro BIC](${isqueiro}): a **marca** baptizou o **tipo**; inspecionar o utensílio **não** é anúncio. Como os [óculos](${oculos}): o nome da loja não vê por ti; o nome Band-Aid **não sara** por ti.

**H1:** *Band-Aid* < EN *band* + *aid* — faixa que ajuda (alta).  
**H2:** no BR, o cartaz da marca virou **nome do objecto** — sem o lab endossar a casa.  
**H3:** *esparadrapo* ≠ este penso (falta a almofada).  
**H4:** [gesso](${gesso}) segura o que está quebrado; o Band-Aid cobre o que está **rasgado à superfície**.

## 4. Peças do objecto (mapa curto)

| Peça | Leitura lab |
|------|-------------|
| **Suporte adesivo** | A faixa que cola — o *band* |
| **Almofada / gaze** | Onde o corte encontra cobertura — o *aid* material |
| **Papel / película protectora** | O que se tira antes do [gesto](${gesto}) |
| **Tamanho de bolso** | Rectângulo (ou redondo, borboleta) — não é ligadura de volta ao membro |
| **Cor da pele / estampa** | Camuflagem ou desenho — adorno, não essência |
| **Caixa da cozinha** | O sítio clássico do objecto-tipo (história Dickson: cortes miúdos em casa) |

**Veredicto peças:** o Band-Aid é o **conjunto**. Gaze sozinha não cola. Esparadrapo sozinho não amortece. Sem o par faixa + almofada, o tipo desfaz-se.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **A marca** | O nome comercial sara | Objecto-tipo; sem afiliação — inspecionar a **função** |
| **O lapso** | *Bandad* é outra palavra | A mesma faixa, letra a menos |
| **O verbo** | Pôr o penso = [curar](${curar}) | Cobrir ≠ tratar a causa; o verbo tem ficha própria |
| **A fita** | Esparadrapo = Band-Aid | Fita ≠ penso com almofada |
| **O molde** | Tudo o que pega no corpo é penso | [Gesso](${gesso}) imobiliza; esta faixa **não** é gesso |
| **O bando** | *Bandad* ≈ *bandada* | [Revoada](${revoada}) é voo junto; aqui é pele |
| **A metáfora EN** | «Solução band-aid» = este objecto | Figura de remendo curto — **outra sala** |
| **O [sangue](${sangue})** | O penso pára a vida | Cobre o rasgo; o fluido tem ficha própria |

**H-parece:** o Band-Aid cura.  
**H-é:** a pele e o ofício [curam](${curar}) no tempo; o objecto **cobre** o corte para o [gesto](${gesto}) de cuidado caber no bolso.

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Objecto** | «pega um band-aid» / «pôr um curativo» | Bom: a coisa; *bandad* = o mesmo, escrito torto |
| **Oral** | «bandeíde» | Bom: a boca; o papel prefere *Band-Aid* / *band-aid* |
| **Farmácia** | «penso rápido», «adesivo» | Bom: o ofício com outro cartaz |
| **Metáfora** | «isso é um band-aid» (remendo) | Citar; mau se apaga o **objecto** inspecionado |
| **Marca** | pedir a caixa da casa J&J | Mau como essência desta ficha — sem vitrine |
| **Ferida grave** | tratar o objecto como hospital | Mau: [risco](${risco}) pede cuidado de saúde, não esta página |

**Finalidade-mãe:** nomear o **Band-Aid** para inspecionar a **coisa que cobre o corte** — faixa + almofada — sem virar bula, anúncio ou cola com *bandada*.

## 7. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Objecto | Faixa adesiva + almofada — catálogo [Objetos](${objetos}) |
| Lapso | **bandad** — cai o *i*; ofício de [Intenet](${internet}) |
| Verbo | [Curar](${curar}) — tratar; o penso só cobre |
| Escala | [Gesso](${gesso}) imobiliza; esparadrapo é só fita |
| Orelha | *bandada* → [revoada](${revoada}); aqui é pele |
| Mantra | [Valeu !!!](${mantra}) — o melhor **neste** penso, hoje |
| Ofício | [Faça o seu melhor](${faca}) |

**Veredicto:** Valeu !!! — **Band-Aid** é objecto (EN *band* + *aid*); **bandad** é lapso; a marca baptizou o tipo; o [curar](${curar}) não cabe nesta caixa.

## O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=band-aid)

## Hipóteses (síntese)

**H1:** *Band-Aid* < EN *band* + *aid* — alta.  
**H2:** *bandad* = lapso (cai o *i*) — alta.  
**H3:** no BR, marca → nome do objecto; o lab **não** endossa a casa.  
**H4:** *curativo* substantivo = este tipo; *curativo* adjectivo = [curar](${curar}).  
**H5:** esparadrapo / gaze / bandagem / [gesso](${gesso}) = família de cobertura, **outras peças**.  
**H6:** *bandada* = [revoada](${revoada}), não este penso.  
**H7:** fecho = [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Objetos](${objetos}) · [objetos](${objetosLema}) | Catálogo da coisa |
| [Curar](${curar}) | O verbo — tratar / secar; não é o rectângulo |
| [Gesso](${gesso}) | Molde que imobiliza — outra escala |
| [Sangue](${sangue}) | O fluido que o penso encontra |
| [Lavar](${lavar}) | O gesto antes de cobrir — sem protocolo aqui |
| [Gesto](${gesto}) · [risco](${risco}) · [verdade](${verdade}) | Colar, medir, não fingir milagre |
| [Revoada](${revoada}) | *Bandada* — o bando; corte de orelha |
| [Internet](${internet}) | Irmão de lapso: *Intenet* cai o *r* |
| [Isqueiro BIC](${isqueiro}) · [óculos](${oculos}) | Marca × tipo × objecto |
| [Étimo](${etimo}) · [etimologia](${etimologia}) · [relação](${relacao}) · [palavra](${palavra}) | Peça × ofício × cruzamento |
| [A orelha cola](${orelhaCola}) · [língua portuguesa](${lingua}) | *Bandeíde* na boca; *Band-Aid* no papel |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [Vida](${vida}) | Fecho |

## Limites

- Não é protocolo de primeiros socorros, sutura, antisséptico nem aconselhamento médico.  
- Não é catálogo de marcas nem anúncio Johnson & Johnson.  
- Não trata esparadrapo, gaze sozinha, bandagem de volta ao membro ou [gesso](${gesso}) como este rectângulo.  
- *Bandada* / bando: ver [revoada](${revoada}).  
- Ferida grave, infecção, [sangue](${sangue}) que não pára: procurar **cuidado de saúde** — esta página não trata.

## Status

**Aprovado** — **Band-Aid** fichado como **objecto** (EN *band* + *aid*); **bandad** = lapso (cai o *i*); catálogo [Objetos](${objetos}); faixa + almofada no corte; ≠ marca-essência ≠ esparadrapo ≠ [gesso](${gesso}) ≠ [revoada](${revoada}). Sem afiliação.

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Curar](${curar}) · [▶ Gesso](${gesso}) · [▶ Sangue](${sangue}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

The **object [Band-Aid](${self})** — pocket **adhesive dressing**: a strip that sticks and a pad that covers the cut. Field request: inspect the object **bandad**. **Bandad** is not another lemma — it is the same slip as [Intenet](${internet}): a letter drops (*i* of *aid*). Catalog: [Objetos](${objetos}). The verb [curar](${curar}) is another craft; [gesso](${gesso}) is another mould; [revoada](${revoada}) is another room (the ear glues *bandada*). Not a first-aid protocol. Not a Johnson & Johnson advert. Close: [Valeu !!!](${mantra}).

> Independent audit. [Wikipedia](${WIKI}), [Wiktionary](${WIKT_EN}). The dressing **covers**; it does not **heal** by itself.

\`\`\`poem
${poemEn()}
\`\`\`

## Object

| Field | Value |
|-------|-------|
| Thing | Adhesive strip + pad |
| Etymon | EN *band* + *aid* — high confidence |
| Slip | **bandad** — drops the *i* |
| Spoken BR | *bandeíde* / *band-aid* as generic type |
| Not | Medical tape alone · [gesso](${gesso}) · gauze alone · flock (*bandada*) · the verb [curar](${curar}) · a brand as essence |
| Links | [curar](${curar}) · [sangue](${sangue}) · [gesto](${gesto}) · [risco](${risco}) |
| Date | ${inspected} |

**Seems:** the Band-Aid heals.  
**Is:** skin and [curar](${curar}) work in time; the object **covers** the cut so care fits in a pocket.

## Status

**Approved** — Band-Aid as object; *bandad* = slip; brand named the type; no affiliation.

[▶ Words](${hub}) · [▶ Objects](${objetos}) · [▶ Curar](${curar}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

El **objeto [Band-Aid](${self})** — **apósito adhesivo** de bolsillo: una tira que pega y una almohadilla que cubre el corte. Pedido: inspeccionar el objeto **bandad**. **Bandad** no es otro lema — es el mismo lapsus que [Intenet](${internet}): cae una letra (*i* de *aid*). Catálogo: [Objetos](${objetos}). El verbo [curar](${curar}) es otro oficio; el [gesso](${gesso}) es otro molde; la [revoada](${revoada}) es otra sala (el oído pega *bandada*). No es protocolo. No es anuncio. Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [Wikipedia](${WIKI}), [Wikcionario](${WIKT_EN}). El apósito **cubre**; no **sana** solo.

\`\`\`poem
${poemEs()}
\`\`\`

## Objeto

| Campo | Valor |
|-------|-------|
| Cosa | Tira adhesiva + almohadilla |
| Étimo | EN *band* + *aid* |
| Lapsus | **bandad** — cae la *i* |
| Habla BR | *bandeíde* / *band-aid* como tipo genérico |
| No es | Esparadrapo solo · [gesso](${gesso}) · gasa sola · bandada · el verbo [curar](${curar}) · la marca como esencia |
| Vínculos | [curar](${curar}) · [sangue](${sangue}) · [gesto](${gesto}) |
| Fecha | ${inspected} |

**Parece:** el Band-Aid cura.  
**Es:** la piel y [curar](${curar}) trabajan en el tiempo; el objeto **cubre** el corte.

## Estado

**Aprobada** — Band-Aid como objeto; *bandad* = lapsus; la marca bautizó el tipo; sin afiliación.

[▶ Palabras](${hub}) · [▶ Objetos](${objetos}) · [▶ Curar](${curar}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildBandAidPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildBandAidBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-band-aid', 367);
  return makePalavra({
    title: 'Inspeção: Band-Aid — o objecto no corte; o lapso bandad',
    titleEn: 'Inspection: Band-Aid — the object on the cut; the slip bandad',
    titleEs: 'Inspección: Band-Aid — el objeto en el corte; el lapsus bandad',
    excerpt:
      'Objecto: Band-Aid (EN band + aid) — penso adesivo; bandad = lapso (cai o i); ≠ esparadrapo ≠ gesso ≠ bandada; Valeu !!!',
    excerptEn:
      'Object: Band-Aid (EN band + aid) — adhesive dressing; bandad = slip (drops the i); ≠ tape ≠ cast ≠ flock; Valeu !!!',
    excerptEs:
      'Objeto: Band-Aid (EN band + aid) — apósito adhesivo; bandad = lapsus (cae la i); ≠ esparadrapo ≠ yeso ≠ bandada; ¡Valeu !!!',
    slug: 'inspecao-palavra-band-aid',
    date: '2026-08-26T14:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Band-Aid · objecto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildBandAidPost,
  buildBandAidBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKI,
  WIKT_EN
};
