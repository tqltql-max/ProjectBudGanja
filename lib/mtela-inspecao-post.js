'use strict';

/**
 * Inspeção Palavras · mtela × papelão
 * Pedido de campo: «inspelão da palavra mtela relaçacom com papelao~»
 *   → inspeção da palavra mtela, relação com papelão.
 *
 * Três salas, um ofício de superfície:
 *   mtela     — smash de campo de «em tela» (o e cai; fica o m + tela)
 *   tela      — lat. tēla «pano / teia / urdidura» → ecrã / tela de pintar
 *   papelão   — papel + -ão (aumentativo) = papel grosso; cartão
 * A relação pedida é de **uso** (superfície que segura imagem), não de sangue.
 * A orelha cola mtela em tela e tele. O étimo corta: tēla ≠ têle ≠ papȳrus.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/mtela-palavra-cover.jpg';
const WIKT_TELA = 'https://pt.wiktionary.org/wiki/tela';
const WIKT_TELA_LA = 'https://en.wiktionary.org/wiki/tela#Latin';
const WIKT_TELA_EN = 'https://en.wiktionary.org/wiki/tela#Portuguese';
const WIKT_TEIA = 'https://pt.wiktionary.org/wiki/teia';
const WIKT_TEXERE = 'https://en.wiktionary.org/wiki/texere#Latin';
const WIKT_PAPELAO = 'https://pt.wiktionary.org/wiki/papel%C3%A3o';
const WIKT_PAPEL = 'https://pt.wiktionary.org/wiki/papel';
const WIKT_PAPYRUS = 'https://en.wiktionary.org/wiki/papyrus';
const WIKT_EM = 'https://pt.wiktionary.org/wiki/em';
const WIKI_PAPELAO = 'https://pt.wikipedia.org/wiki/Papel%C3%A3o';
const WIKI_CARDBOARD = 'https://en.wikipedia.org/wiki/Cardboard';

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
  return `mtela.
é em tela
com o e caído.

tela é pano.
latim tēla.
teceu a imagem.

papelão é papel grosso.
o papiro do Nilo
não é a teia.

a orelha pede uma superfície.
o étimo corta duas árvores.
a caixa de papelão
pinta uma tela
sem ser tela.

Valeu !!!
o smash no sítio
e o cartão no ofício
sem fundir o tecido no papel.`;
}

function poemEn() {
  return `mtela.
it is em tela
with the e dropped.

tela is cloth.
Latin tēla.
it wove the image.

papelão is thick paper.
the papyrus of the Nile
is not the web.

the ear asks for a surface.
the etymon cuts two trees.
the cardboard box
paints a screen
without being tela.

Valeu !!!
the smash in place
and the board in office
without fusing cloth into paper.`;
}

function poemEs() {
  return `mtela.
es em tela
con la e caída.

tela es paño.
latín tēla.
tejió la imagen.

papelão es papel grueso.
el papiro del Nilo
no es la tela de araña.

el oído pide una superficie.
el étimo corta dos árboles.
la caja de cartón
pinta una pantalla
sin ser tela.

¡Valeu !!!
el smash en su sitio
y el cartón en el oficio
sin fundir el tejido en el papel.`;
}

function buildMtelaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-mtela.html';
  const tele = '/posts/post-inspecao-palavra-tele.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const olho = '/posts/post-inspecao-palavra-olho.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const tenda = '/posts/post-inspecao-palavra-tenda.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const objetosHub = '/objetos/';
  const papelEnrolar = '/posts/post-inspecao-palavra-papel-enrolar-tabaco.html';
  const fantasia = '/posts/post-inspecao-palavra-fantasia.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const vidaHub = '/vida/';
  const guia = '/guia/palavras.html';
  const euAmo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';

  const body = `## Escopo

Inspeção editorial da família **[mtela](${self}) · tela · papelão** — pedido de campo: *inspelão da palavra mtela relaçacom com papelao~* → **inspeção da palavra mtela, [relação](${relacao}) com papelão**.

Três salas, um ofício. **mtela** é smash de campo de **em tela**: o *e* cai, fica o *m* colado em *tela*. **Tela** é lat. *tēla* — pano, teia, urdidura — depois ecrã, cinema, tela de pintar. **Papelão** é *papel* + *-ão*: papel grosso, cartão. [A orelha cola](${orelhaCola}) *mtela* em *tela* e em [tele](${tele}). O [étimo](${etimo}) **corta**: *tēla* (tecer) ≠ *têle* (longe) ≠ *papȳrus* (papiro). A [relação](${relacao}) pedida é de **uso** — duas superfícies que seguram imagem — **não** de sangue.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · tela](${WIKT_TELA}), lat. [*tēla*](${WIKT_TELA_LA}), EN [*tela*](${WIKT_TELA_EN}), [teia](${WIKT_TEIA}), lat. [*texere*](${WIKT_TEXERE}), [papelão](${WIKT_PAPELAO}), [papel](${WIKT_PAPEL}), [*papyrus*](${WIKT_PAPYRUS}), [em](${WIKT_EM}), [Wikipédia · Papelão](${WIKI_PAPELAO}), EN [Cardboard](${WIKI_CARDBOARD}). Método: [etimologia](${etimologia}) — étimo × cola × sala. **Ficha ≠ história do cinema, ≠ tutorial de artesanato, ≠ norma de embalagem, ≠ ficha de [tele](${tele}).** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *mtela* / *m tela* / *em tela* / *tela* / *papelão* / *papelao* / *tela de papelão* / *TV de papelão*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Formas âncora | **mtela** · **tela** · **papelão** |
| Smash de campo | **mtela** → *em tela* (o *e* cai; o *m* cola no lema) |
| Lema canónico | **tela** (lat. *tēla*) |
| Cruzamento | **papelão** — *papel* + *-ão* |
| Classes | subst. fem. (*tela*); locução (*em tela*); subst. masc. (*papelão*); smash (*mtela*) |
| Étimo tela | Lat. *tēla* «urdidura, teia, pano» ← família de *texere* «tecer» — confiança: **alta** |
| Étimo em | Prep. *em* ← lat. *in* — confiança: **alta** |
| Étimo papelão | *papel* (lat. *papȳrus* ← gr. πάπυρος) + aumentativo *-ão* — confiança: **alta** |
| Tipo BudGanja | Palavras — smash de locução × pano-ecrã × cartão; [relação](${relacao}) de ofício |
| Não é | [tele](${tele}) (gr. *têle*) · [teia](${WIKT_TEIA}) (irmã de *tela*, outra ficha se vier) · [papel de enrolar](${papelEnrolar}) · norma ABNT de caixa |
| Data | ${inspected} |
| Fonte | [tela](${WIKT_TELA}) · [papelão](${WIKT_PAPELAO}) |

**O que é o objecto:** o vocábulo da **superfície que mostra** (pano / ecrã) no smash de campo *mtela*, e o **cartão** que o lab cruza por ofício — a caixa, o recorte, a tela improvisada — sem fundir as árvores.

## 2. Três salas — o cruzamento

Pedido de campo: *mtela* × *papelão*. O lab **cruza** e **não funde**.

| Sala | Peça | Origem | Ofício nesta ficha |
|------|------|--------|---------------------|
| **mtela** | smash de *em tela* | Campo: *em* + *tela*, *e* caído | A forma do pedido — locução colada |
| **em tela** | *em* + *tela* | Prep. *in* + *tēla* | «no ecrã / na tela de pintar / em cartaz» |
| **tela** | lat. *tēla* | Pano, teia, urdidura → ecrã | Lema canónico — superfície tecida que passou a mostrar |
| **papelão** | *papel* + *-ão* | Papiro + aumentativo | Papel grosso; cartão; caixa; cenário barato |
| **Cola cortada** | *mtela* ≈ *tela* ≈ [tele](${tele}) | Orelha: *te-la* / *te-le* | [tele](${tele}) é *longe*; **outra ficha** |
| **Cola de ofício** | tela de papelão | Uso, não sangue | Cartão a **fazer de** ecrã / tela |
| **Irmã cortada** | [teia](${WIKT_TEIA}) | Também *tēla* | Aranha / tecido aberto — **não** esta ficha |

**H-cruzamento:** a [relação](${relacao}) pedida é real **no ofício** (duas superfícies de imagem) e falsa **no sangue** (*tēla* não gera *papelão*).  
**H-smash:** *mtela* é a boca a escrever *em tela* sem o *e* — como *slayr* para *slave*, *Restoure* para *restore*. O lab mapeia o smash; não inventa marca.  
**H-orelha:** [a orelha](${orelhaCola}) cola *mtela* em *tela* e em [tele](${tele}). A cola **ensina o corte** já feito na ficha [tele](${tele}): *tēla* ≠ *têle*.

## 3. *mtela* / *em tela* — o smash e a locução

Pedido escrito: **mtela**. Duas leituras, uma sala.

| Forma | Leitura | Confiança |
|-------|---------|-----------|
| **em tela** | Locução: no ecrã, na tela de pintar, «filme em tela» (em cartaz) | Alta |
| **em tela cheia** | Ecrã inteiro (calque de *fullscreen*) | Alta o uso |
| **mtela** | Smash de campo: *em* + *tela*, *e* caído | Alta como gatilho; média como lema de dicionário (não entra no Aulete) |
| **m tela** | A mesma locução com espaço a mais | Alta a equivalência |
| **tela** sozinha | Lema — esta ficha cobre | Alta |

*Em* é a preposição (lat. *in*): dentro, sobre, em estado de. *Tela* é o pano. Juntos: **a imagem está no pano / no ecrã**. O smash *mtela* não cria terceira árvore — é a locução **escrita à pressa**.

**H-dicionário:** *mtela* não é verbete. É rasto de teclado. O objecto linguístico é *em tela* / *tela*. O lab **honra o gatilho** e **aterra no lema**.

## 4. *tela* — o pano que passou a mostrar

Lat. *tēla*: a **urdidura**, o conjunto de fios, a teia, o pano. Família de *texere* «tecer» — a mesma casa de *têxtil*, *texto*, *tecido*. No português a palavra alargou o ofício:

| Camada | Leitura | Sala |
|--------|---------|------|
| **Pano / tecido** | Superfície tecida (ainda viva; irmã [teia](${WIKT_TEIA})) | Matéria |
| **Tela de pintar** | Pano esticado para receber tinta | Arte |
| **Tela de cinema** | O pano enorme onde a [luz](${luz}) projecta | Sala escura |
| **Tela do telemóvel / PC** | Ecrã — o [olho](${olho}) cola no vidro | Aparelho |
| **«Em tela»** | Em cartaz / visível / em ecrã | Locução |
| **Tela da [tenda](${tenda})** | Pano que estica e fecha luz | Cultivo indoor |
| **Não é** | [tele](${tele}) — prefixo *longe* | Corte já fichado |

**H-pano:** o étimo aponta primeiro para **tecer**, não para píxeis. O ecrã é expansão: o pano que mostra.  
**H-tele:** a orelha cola *tela* em *tele* porque as sílabas se tocam. A ficha [tele](${tele}) corta; esta ficha **habita** a sala do pano. Não duplicar o prefixo grego aqui.  
**H-teia:** *teia* (aranha, tecido aberto) é irmã de *tela* no latim. Ofício vizinho; **não** fundir com papelão nem com ecrã.

## 5. *papelão* — papel grosso, cartão, cenário

*Papelão* = *papel* + aumentativo *-ão*: o papel que engrossou. *Papel* vem do lat. *papȳrus*, do gr. πάπυρος — a planta do Nilo cuja medula se prensava em folhas. O cartão moderno é pasta de papel, muitas vezes **ondulado** (duas capas + miolo em onda). Inglês *cardboard* / *corrugated fiberboard*; esp. *cartón*; fr. *carton*.

| Camada | Leitura | Sala |
|--------|---------|------|
| **Matéria** | Papel grosso / cartão / caixa | [Objectos](${objetos}) |
| **Embalagem** | A caixa onde chega o aparelho que *tem* tela | Ofício de transporte |
| **Tela improvisada** | TV, tablet, PlayStation de papelão — o cartão **faz de** ecrã | Artesanato / brinquedo |
| **Cenário** | Decoração de palco barata | Teatro |
| **«Fazer um papelão»** | Constranger-se; overacting; figura ridícula | Gíria BR — **outra sala** do mesmo vocábulo |
| **Cultivo** | Caixa, tampão de luz, piso — vizinho da [tenda](${tenda}) | Indoor |
| **Não é** | [Papel de enrolar](${papelEnrolar}) (folha fina) | Corte: fino × grosso |

**H-aumentativo:** *-ão* aqui é **espessura**, não elogio. Papelão ≠ papelão de fama.  
**H-papiro:** a árvore é vegetal-folha (Nilo → oficina de papel), não tear. *Tēla* tece; *papȳrus* prensa.  
**H-gíria:** *fazer um papelão* mora nesta ficha como **aviso de sala** — não é o cruzamento pedido. O pedido cruza a **matéria**, não o constrangimento.

## 6. A relação pedida — superfície, não sangue

Pedido: *relação com papelão*. Método: [relação](${relacao}) = o **entre**, sem fundir.

| Eixo | O que liga | O que **não** liga |
|------------------|---------------------|
| **Uso** | Ambas são superfícies que podem **segurar uma imagem** | Não partilham étimo |
| **Substituição** | O papelão **faz de** tela (caixa-TV, cartaz, ecrã de brincar) | Fazer de ≠ ser |
| **Embalagem** | A tela-aparelho **viaja** em papelão | A caixa não é o ecrã |
| **Teatro / cinema** | Tela = pano de luz; papelão = cenário barato | Gíria *papelão* ≠ *em tela* (em cartaz) |
| **Indoor** | Tela da [tenda](${tenda}) (pano); papelão (caixa / tampão) | Dois [objectos](${objetos}), um quarto |
| **Orelha** | *mtela* cola em *tela*; *papelão* não rima com *tela* | A relação **não** nasceu na cola sonora |

**H-ofício:** a criança que desenha um ecrã na caixa está a **cruzar** as duas salas no [gesto](${gesto}). O lab nomeia o cruzamento e **recusa o pai único**.  
**H-verdade:** [verdade](${verdade}) = dizer «isto é cartão a fazer de tela», não «papelão vem de tela».

## 7. O que a boca faz

| Camada BR | Leitura | Sala |
|-----------|---------|------|
| **mtela** | Smash de *em tela* | Esta ficha — gatilho |
| **em tela** | No ecrã / em cartaz / na tela de tinta | Locução |
| **em tela cheia** | Ecrã inteiro | Informática |
| **tela do telemóvel** | O vidro que o [olho](${olho}) cola | Aparelho |
| **tela de pintar** | Pano esticado | Arte |
| **TV de papelão** | Brinquedo / ofício Manual do Mundo | Cartão a fazer de tela |
| **fazer um papelão** | Constranger-se | Gíria — outra sala |
| **a tele** | Recorte de televisão | [tele](${tele}) — **não** esta ficha |

## 8. Hipóteses

**H1:** *mtela* = smash de campo de *em tela* — alta.  
**H2:** lema canónico = *tela* ← lat. *tēla* (pano / teia) — alta.  
**H3:** *em tela* = locução «no ecrã / na tela / em cartaz» — alta.  
**H4:** *papelão* = *papel* + *-ão* (papel grosso) ← *papȳrus* — alta.  
**H5:** a [relação](${relacao}) *tela* × *papelão* é de **uso / substituição**, não de étimo — alta.  
**H6:** [tele](${tele}) (*têle*) cola na orelha e **corta** no sangue — alta; ficha irmã.  
**H7:** *teia* é irmã latina de *tela*; não é papelão — alta o corte.  
**H8:** *fazer um papelão* é outra sala do vocábulo *papelão* — alta o corte; não esgota a gíria.  
**H9:** *mtela* não é verbete de dicionário — alta.  
**H10:** o lab alumia com [verdade](${verdade}): a caixa pode pintar uma tela; o cartão não tece.

## 9. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **mtela** | Marca / modelo / palavra nova | Smash de *em tela* |
| **mtela** | [tele](${tele}) | *tēla* (pano), não *têle* (longe) |
| **tela** | A tele | Lat. *tēla* — pano que passou a ecrã |
| **papelão** | A origem da tela | Outra árvore (*papȳrus*); ofício de cartão |
| **TV de papelão** | Uma tela de verdade | Cartão a **fazer de** ecrã |
| **fazer um papelão** | Estar em tela (em cartaz) | Gíria de constrangimento — outra sala |
| **teia** | A mesma tela | Irmã latina; ofício de aranha / tecido aberto |

## 10. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Ler *mtela* como smash de *em tela* |
| Bom | Aterrar no lema *tela* (lat. *tēla*) |
| Bom | Cruzar *papelão* por **uso** (superfície / caixa / recorte) e **cortar** o sangue |
| Bom | Mandar *tele* / *a tele* para [tele](${tele}) |
| Bom | Nomear *fazer um papelão* como outra sala, sem esgotar a gíria |
| Mau | Ensinar que tela «vem de» papelão ou o inverso |
| Mau | Fundir *tela* com [tele](${tele}) |
| Mau | Tutorial de artesanato ou de embalagem disfarçado de vocábulo |
| Mau | Transformar o smash *mtela* em marca |

## 11. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=mtela)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Tele](${tele}) | Prefixo *longe* — cola de orelha cortada |
| [Relação](${relacao}) | O entre — cruzar sem fundir |
| [Orelha cola](${orelhaCola}) · [étimo](${etimo}) · [etimologia](${etimologia}) | Cola × corte |
| [Olho](${olho}) · [luz](${luz}) | Quem vê a tela; o que a acende |
| [Tenda](${tenda}) | Pano que estica — tela de cultivo |
| [Objectos](${objetos}) · [hub Objectos](${objetosHub}) | O cartão como *coisa* |
| [Papel de enrolar](${papelEnrolar}) | Papel **fino** — outra espessura |
| [Fantasia](${fantasia}) | Imaginar / fato — a caixa-TV mora no brincar, não nesta árvore |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo e glossário |
| [Verdade](${verdade}) · [gesto](${gesto}) · [vida](${vida}) | Ofício |
| [Faça o seu melhor](${faca}) · [eu amo a vida](${euAmo}) | Fecho vivo |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é história do cinema, manual de ecrãs nem norma de caixa de cartão.  
- Não inventaria todas as gírias regionais de *papelão*.  
- *Teia* (aranha) fica apontada, não esgotada.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **mtela** fichado como smash de **em tela**; lema **tela** ← lat. *tēla* (pano → ecrã); cruzado com **papelão** (*papel* + *-ão*) por ofício de superfície, não por sangue; cola [tele](${tele}) cortada. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tele](${tele}) · [▶ Relação](${relacao}) · [▶ Tenda](${tenda}) · [▶ Objectos](${objetosHub}) · [▶ Poema Vida](/vida/#poema=mtela) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vidaHub})
`;

  const contentEn = `## Scope

Inspection of Portuguese **mtela** · **tela** · **papelão**. Field request: *inspection of the word mtela, relation with papelão* (cardboard).

Three rooms. **mtela** is a field smash of **em tela** (“on screen / on canvas”) — the *e* drops, the *m* sticks to *tela*. **Tela** is Lat. *tēla* “warp, web, cloth”, later screen and painting canvas. **Papelão** is *papel* + augmentative *-ão*: thick paper, cardboard. The [ear](${orelhaCola}) glues *mtela* to *tela* and to [tele](${tele}). The [etymon](${etimo}) **cuts**: *tēla* (weave) ≠ *têle* (far) ≠ *papȳrus* (papyrus). The [relation](${relacao}) asked for is **use** — two image-bearing surfaces — not blood.

> Sources: [tela](${WIKT_TELA}), Lat. [*tēla*](${WIKT_TELA_LA}), [papelão](${WIKT_PAPELAO}), [Cardboard](${WIKI_CARDBOARD}). Method: [etymology](${etimologia}). Close: [Valeu !!!](${mantra}).

## Three rooms

| Room | Piece | Origin | Office |
|------|-------|--------|--------|
| **mtela** | smash of *em tela* | Field typing | The trigger |
| **tela** | Lat. *tēla* | Cloth / web → screen | Canonical lemma |
| **papelão** | *papel* + *-ão* | Papyrus + augmentative | Cardboard; box; stand-in screen |
| **Cut** | [tele](${tele}) | Gr. *têle* “far” | Sister sheet — ear glue only |

A cardboard TV **plays at** being a tela. Playing at ≠ being.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *mtela* = smash of *em tela*. *tela* ≠ [tele](${tele}). *papelão* related by office, not by etymon. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **mtela** · **tela** · **papelão**. Pedido: *inspección de la palabra mtela, relación con papelão* (cartón).

Tres salas. **mtela** es smash de campo de **em tela** («en pantalla / en lienzo») — cae la *e*, el *m* se pega a *tela*. **Tela** es lat. *tēla* «urdumbre, tela, paño», después pantalla y lienzo. **Papelão** es *papel* + aumentativo *-ão*: papel grueso, cartón. El [oído](${orelhaCola}) pega *mtela* a *tela* y a [tele](${tele}). El [étimo](${etimo}) **corta**: *tēla* (tejer) ≠ *têle* (lejos) ≠ *papȳrus*. La [relación](${relacao}) pedida es de **uso** — dos superficies que sostienen imagen — no de sangre.

> Fuentes: [tela](${WIKT_TELA}), lat. [*tēla*](${WIKT_TELA_LA}), [papelão](${WIKT_PAPELAO}), [Cardboard](${WIKI_CARDBOARD}). Método: [etimología](${etimologia}). Cierre: [¡Valeu !!!](${mantra}).

## Tres salas

| Sala | Pieza | Origen | Oficio |
|------|-------|--------|--------|
| **mtela** | smash de *em tela* | Teclado de campo | El gatillo |
| **tela** | lat. *tēla* | Paño / tela → pantalla | Lema canónico |
| **papelão** | *papel* + *-ão* | Papiro + aumentativo | Cartón; caja; pantalla improvisada |
| **Corte** | [tele](${tele}) | gr. *têle* «lejos» | Ficha hermana — solo cola de oído |

Una TV de cartón **hace de** tela. Hacer de ≠ ser.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *mtela* = smash de *em tela*. *tela* ≠ [tele](${tele}). *papelão* relacionado por oficio, no por étimo. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildMtelaPost() {
  const { body, contentEn, contentEs } = buildMtelaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-mtela', 327);
  return makePalavra({
    title: 'Inspeção: mtela — em tela × papelão; ≠ tele',
    titleEn: 'Inspection: mtela — em tela × cardboard; ≠ tele',
    titleEs: 'Inspección: mtela — em tela × cartón; ≠ tele',
    excerpt:
      'Palavras: mtela = smash de em tela; tela ← lat. tēla (pano → ecrã) × papelão (papel + -ão); ≠ tele (têle); Valeu !!!',
    excerptEn:
      'Words: mtela = smash of em tela; tela ← Lat. tēla (cloth → screen) × papelão (paper + -ão, cardboard); ≠ tele (têle); Valeu !!!',
    excerptEs:
      'Palabras: mtela = smash de em tela; tela ← lat. tēla (paño → pantalla) × papelão (papel + -ão, cartón); ≠ tele (têle); ¡Valeu !!!',
    slug: 'inspecao-palavra-mtela',
    date: '2026-08-24T13:10:00.000Z',
    seriesOrder,
    seriesLabel: 'mtela · tela · papelão',
    coverImage: COVER,
    sourceUrl: WIKT_TELA,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMtelaPost,
  buildMtelaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_TELA,
  WIKT_TELA_LA,
  WIKT_PAPELAO,
  WIKT_PAPEL,
  WIKT_PAPYRUS,
  WIKT_TEIA,
  WIKI_PAPELAO,
  WIKI_CARDBOARD
};
