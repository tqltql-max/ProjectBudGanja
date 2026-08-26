'use strict';

/**
 * Inspeção Palavras · ramela × ramelento × remo lento
 * Pedido de campo: «inspeção da palavra ramela, ramelento relação com remo lento»
 *
 * Três salas, uma cola de orelha:
 *   ramela / remela — secreção no canto do olho (origem obscura)
 *   ramelento       — ramela + -ento (quem tem ramela; figurado: melado / vagaroso)
 *   remo lento      — duas outras árvores: remo ← rēmus × lento ← lentus
 * A orelha cola ramelento em remo-lento. O étimo corta.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/ramela-palavra-cover.jpg';
const WIKT_RAMELA = 'https://pt.wiktionary.org/wiki/ramela';
const WIKT_REMELA = 'https://pt.wiktionary.org/wiki/remela';
const WIKT_REMELA_EN = 'https://en.wiktionary.org/wiki/remela';
const WIKT_RAMELENTO = 'https://www.dicio.com.br/ramelento/';
const WIKT_REMO = 'https://pt.wiktionary.org/wiki/remo';
const WIKT_LENTO = 'https://en.wiktionary.org/wiki/lento#Portuguese';
const WIKT_LENTUS = 'https://en.wiktionary.org/wiki/lentus#Latin';
const AULETE_REMELA = 'https://www.aulete.com.br/remela';

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
  return `Ramela.
Não é remo pequeno.
É o canto do olho
depois do sono.

Ramelento.
A orelha ouve remo lento.
O étimo corta:
ramela mais ento.

Remo é a pá.
Lento é lentus.
Quem acorda com ramela
rema devagar
sem ser remo.

Valeu !!!
limpar o canto
sem fundir as árvores.`;
}

function poemEn() {
  return `Ramela.
It is not a small oar.
It is the corner of the eye
after sleep.

Ramelento.
The ear hears slow oar.
The etymon cuts:
ramela plus -ento.

Remo is the blade.
Lento is lentus.
Whoever wakes with ramela
rows slowly
without being an oar.

Valeu !!!
clear the corner
without fusing the trees.`;
}

function poemEs() {
  return `Ramela.
No es un remo pequeño.
Es el rincón del ojo
después del sueño.

Ramelento.
El oído oye remo lento.
El étimo corta:
ramela más ento.

Remo es la pala.
Lento es lentus.
Quien despierta con ramela
rema despacio
sin ser remo.

¡Valeu !!!
limpiar el rincón
sin fundir los árboles.`;
}

function buildRamelaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-ramela.html';
  const remo = '/posts/post-inspecao-palavra-remo.html';
  const olho = '/posts/post-inspecao-palavra-olho.html';
  const oculos = '/posts/post-inspecao-palavra-oculos.html';
  const remSleep = '/posts/post-inspecao-palavra-sinais-rem.html';
  const nap = '/posts/post-inspecao-palavra-nap.html';
  const preguica = '/posts/post-inspecao-palavra-preguica.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const barco = '/posts/post-inspecao-palavra-barco.html';
  const navegar = '/posts/post-inspecao-palavra-navegar.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const sonhar = '/posts/post-inspecao-palavra-sonhar.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial da família **[ramela](${self}) · ramelento · remo lento** — pedido de campo: *inspeção da palavra ramela, ramelento relação com remo lento*.

Três salas, uma cola. **Ramela** (lema irmão **remela**) é a secreção amarelada no canto do [olho](${olho}) depois do sono. **Ramelento** é *ramela* + *-ento*: quem tem ramela; por extensão, quem está melado, sujo, vagaroso. **Remo lento** são **duas outras árvores**: [remo](${remo}) ← lat. *rēmus* (a pá) e *lento* ← lat. *lentus* (devagar / flexível). [A orelha cola](${orelhaCola}) *ramelento* em *remo-lento* porque a boca junta as mesmas sílabas. O [étimo](${etimo}) **corta**. A [relação](${relacao}) é de **ofício da orelha**, não de sangue.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · ramela](${WIKT_RAMELA}), [remela](${WIKT_REMELA}), EN [*remela*](${WIKT_REMELA_EN}), [Aulete · remela](${AULETE_REMELA}), [ramelento](${WIKT_RAMELENTO}), [remo](${WIKT_REMO}), PT [*lento*](${WIKT_LENTO}), lat. [*lentus*](${WIKT_LENTUS}). Método: [etimologia](${etimologia}) — étimo × cola × sala. **Ficha ≠ oftalmologia, ≠ aula de canoagem, ≠ xingo de quem acorda devagar.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *ramela* / *remela* / *ramelento* / *remelento* / *remeloso* / *remo lento* / *remelar*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Formas âncora | **ramela** · **ramelento** · **remo lento** (cola) |
| Lema irmão | **remela** / **remelento** — *e* ↔ *a* (ambas vivas) |
| Classes | Subst. fem. (*ramela*); adj. (*ramelento*); sintagma (*remo lento*) |
| Étimo ramela | Origem **obscura** (Aulete); cognato galego *remela* — confiança: **média** no corte; **baixa** em qualquer pai único |
| Étimo ramelento | *ramela* + *-ento* — confiança: **alta** (morfologia) |
| Étimo remo | Lat. *rēmus* — [remo](${remo}) — confiança: **alta** |
| Étimo lento | Lat. *lentus* «flexível, lento» — confiança: **alta** |
| Tipo BudGanja | Palavras — secreção do olho × cola náutica falsa |
| Não é | [Remo](${remo}) · [sinais REM](${remSleep}) · [preguiça](${preguica}) · laudo clínico |
| Data | ${inspected} |
| Fonte | [ramela](${WIKT_RAMELA}) · [remela](${WIKT_REMELA}) · [remo](${WIKT_REMO}) |

**O que é o objecto:** o vocábulo do **canto do olho** e o adjetivo que dele deriva — e o **corte** da frase *remo lento*, que a orelha cola mas o étimo não assina.

## 2. Três salas — o cruzamento

Pedido de campo: *ramela* × *ramelento* × *remo lento*. O lab **cruza** e **não funde**.

| Sala | Peça | Origem | Ofício nesta ficha |
|------|------|--------|---------------------|
| **Ramela** | *ramela* / *remela* | Obscura; irmã galega *remela* | Secreção no canto do [olho](${olho}) |
| **Ramelento** | *ramela* + *-ento* | Derivação portuguesa | Quem tem ramela; figurado: melado / vagaroso |
| **Remo** | lat. *rēmus* | Pá náutica | [Ficha irmã](${remo}) — **outra árvore** |
| **Lento** | lat. *lentus* | Devagar / flexível | Qualificativo da pá — **outra árvore** |
| **Cola cortada** | *remo lento* | Orelha: *ra-me-len-to* ≈ *remo lento* | Sintagma náutico — **não** étimo de *ramelento* |
| **Cola cortada** | *remela* ← *rēmus* | Folclore de forma (pá miúda) | Hipótese **fraca**; Aulete: origem obscura |
| **Cola cortada** | *remela* ← *mucilla* | Via jornalística (*mucus*) | Não explica o *re-*; **baixa** |
| **Ficha irmã** | [sinais REM](${remSleep}) | Sigla EN do sono | Os olhos mexem; a ramela **assenta** depois |

**H-cruzamento:** a [relação](${relacao}) pedida é real **no ouvido** e falsa **no sangue**. *Ramelento* não é composto de [remo](${remo}) + *lento*.  
**H-orelha:** [a orelha](${orelhaCola}) cola porque as quatro sílabas coincidem. A cola **ensina o corte**.  
**H-ofício:** quem acorda com ramela **rema devagar** no [gesto](${gesto}) — metáfora viva; não prova genealógica.

## 3. *ramela* / *remela* — o canto do olho

O [Aulete](${AULETE_REMELA}) fecha o que se pode fechar: secreção amarelada nas bordas das pálpebras, em geral de manhã; **origem obscura**; também **ramela**. O [Wikcionário EN](${WIKT_REMELA_EN}) confirma: étimo **desconhecido**; cognato galego *remela* (sinónimo *lagaña*). Coromines, para o galego, deixa duas pistas abertas (diminutivo de *rama* «ramo»; ou prefixo sobre *mela*) — **não** fecha.

| Forma | Papel | Confiança |
|-------|-------|-----------|
| **ramela** | Voz BR viva (pedido de campo) | Alta como uso |
| **remela** | Lema formal frequente | Alta como uso |
| *e* ↔ *a* | Variação de fala (como outras pares) | Alta a equivalência; não muda o referente |
| **remelar** | Verbo: tirar a remela; regional: demorar-se / mexericar | Alta o uso; étimos regionais **outros ofícios** |

Salas vizinhas do mesmo vocábulo (não fundir com o olho):

| Sala | Onde | Leitura |
|------|------|---------|
| **Canto do olho** | BR / PT | Esta ficha |
| **Polpa do coco verde** | AL, popular (Aulete) | Outra sala — tenra, «melada» |
| **Reima da sardinha** | Bairrada (Wikcionário) | Outra sala — salmoura |

**H-mucilla:** algumas páginas de divulgação ligam *remela* a lat. *mucilla* ← *mucus*. Faz sentido **semântico** (muco); falha **fonético** (o *mu-* não vira *re-* por via regular). Confiança: **baixa**.  
**H-remo-diminutivo:** algumas fichas soltas lêem *remela* como diminutivo de [remo](${remo}) (*rēmus*) «pela forma da secreção». É a **mesma cola** do pedido, vestida de étimo. Aulete diz origem **obscura**. Confiança: **fraca / folclórica**.  
**H-olho:** o referente mora no [olho](${olho}) (*oculus*). A ramela **não** é o órgão; é o **resto** que o órgão deposita depois do [sono](${nap}).

## 4. *ramelento* — *ramela* + *-ento*

Michaelis / Dicio: *ramelento* ← *ramela* + *-ento*; variante *remelento*; o mesmo que *remelado* / *remeloso*. O sufixo *-ento* marca **provido de** (*sedento*, *ciumento*, *nojento*): **quem carrega ramela**.

| Camada | Leitura | Sala |
|--------|---------|------|
| **Literal** | Olho com ramela | Esta ficha |
| **Figurado** | Melado, sujo, de pouco asseio | Extensão do muco |
| **Figurado** | Vagaroso, que acorda devagar | Ofício do corpo — cola com *lento* |
| **Verbo regional** | *remelar* = demorar-se (Sul) | Semântica de *lento* **sem** ser *lentus* na formação |
| **Não é** | Composto *remo* + *lento* | Corte |

**H-sufixo:** *-ento* em *ramelento* é o mesmo ofício de *nojento*: qualidade aderente. Não é o *lento* de *lentus*. A orelha **ouve** *lento* no fim; o papel **escreve** *-ento*.  
**H-preguiça:** o vagaroso ramelento cruza [preguiça](${preguica}) (*pigritia*) por **gesto**, não por sangue. Preguiça é relutância baptizada; ramelento é o olho ainda no sono.

## 5. *remo lento* — duas árvores, um sintagma

[Remo](${remo}) é lat. *rēmus*: a pá. *Lento* é lat. *lentus*: primeiro «flexível, húmido»; o sentido «devagar» no português pode ser **culto**. Juntos, *remo lento* é frase: remar sem pressa; a pá que não corta água.

| Peça | Étimo | Ficha |
|------|-------|-------|
| **remo** | *rēmus* | [Remo](${remo}) — ≠ REM do sono |
| **lento** | *lentus* | Esta ficha (qualificativo); não tem ficha própria |
| **remo lento** | Sintagma | Cola de orelha com *ramelento* |
| **REM** | Sigla EN | [Sinais REM](${remSleep}) — os olhos mexem no [nap](${nap}) |

**H-sono:** a ramela assenta **depois** do sono. O REM mexe o [olho](${olho}) **durante**. Três salas: pá (*rēmus*), sigla (REM), secreção (*ramela*). A boca junta as três; o lab **separa**.  
**H-barco:** remar lento é ofício de [barco](${barco}) / [navegar](${navegar}) / [mar](${mar}). Limpar ramela é ofício de acordar. Mesmo ritmo possível; **não** o mesmo objecto.

## 6. O que a boca faz

| Camada BR | Leitura | Sala |
|-----------|---------|------|
| **ramela / remela** | Canto do olho de manhã | Literal |
| **ramelento** | Quem não limpou o canto; quem está melado | Literal + figurado |
| **tá ramelento hoje** | Acordou vagaroso | Metáfora de *lento* — **cola útil** |
| **remo lento** | Pá que não apressa | [Remo](${remo}) — outra ficha |
| **remelar** | Tirar a remela; ou enrolar (Sul) | Verbo — dois ofícios |
| **olho ramelento** | O órgão + o resto | [Olho](${olho}) × esta ficha |

**H-miss:** limpar o canto é [gesto](${gesto}) de asseio, não de oftalmologia. Se o olho dói, arde ou não abre — [risco](${risco}): procurar cuidado; esta ficha **não trata**.

## 7. Hipóteses

**H1:** *ramela* = variante viva de *remela* — alta.  
**H2:** referente principal = secreção do canto do [olho](${olho}) — alta.  
**H3:** étimo de *remela* permanece **obscuro** (Aulete; Wiktionary *unknown*) — alta o corte; baixa qualquer pai único.  
**H4:** *ramelento* < *ramela* + *-ento* — alta.  
**H5:** *remo lento* **não** é o étimo de *ramelento* — alta.  
**H6:** [remo](${remo}) < *rēmus*; *lento* < *lentus* — alta; duas árvores.  
**H7:** via *mucilla* / diminutivo de *rēmus* — baixa / folclórica; honrar a cola, recusar o pai.  
**H8:** o vagaroso ramelento cruza *lento* e [preguiça](${preguica}) por ofício — média-alta a observação; não genealogia.  
**H9:** coco (AL) e sardinha (Bairrada) são outras salas do vocábulo — alta o corte.  
**H10:** o lab alumia com [verdade](${verdade}): a orelha cola; o étimo corta.

## 8. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Ramelento** | Remo lento | *Ramela* + *-ento* |
| **Ramela** | Remo pequeno | Secreção do olho; origem obscura |
| **Remela** | Forma «certa» contra ramela | Irmã viva; *e* ↔ *a* |
| **REM** | O mesmo *rem-* | Sigla do sono — [sinais REM](${remSleep}) |
| **Lento no fim** | *lentus* dentro de ramelento | Sufixo *-ento* (provido de) |
| **Acordar ramelento** | Ser [preguiça](${preguica}) | Olho ainda no [nap](${nap}); outra árvore |
| **Coco ramela** | O mesmo muco | Polpa tenra — sala de AL |

## 9. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *ramela* / *remela* como canto do olho |
| Bom | Derivar *ramelento* de *ramela* + *-ento* |
| Bom | Honrar a cola *remo lento* e **cortar** o sangue |
| Bom | Cruzar [remo](${remo}), [olho](${olho}) e [sinais REM](${remSleep}) sem fundir |
| Bom | Deixar o étimo de *remela* **aberto** (obscuro) |
| Mau | Ensinar que ramelento «vem de» remar devagar |
| Mau | Ficha de conjuntivite ou de canoagem |
| Mau | Xingar quem acorda com ramela |
| Mau | Fechar *mucilla* ou *rēmus* como pai |

## 10. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=ramela)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Remo](${remo}) | A pá (*rēmus*) — sala náutica da cola |
| [Olho](${olho}) · [óculos](${oculos}) | O órgão onde a ramela assenta; o objecto à frente |
| [Sinais REM](${remSleep}) · [nap](${nap}) · [sonhar](${sonhar}) | Sono × sigla × o resto da manhã |
| [Preguiça](${preguica}) | Vagaroso por *pigritia* — ofício vizinho, não sangue |
| [Barco](${barco}) · [navegar](${navegar}) · [mar](${mar}) | Onde o remo lento é literal |
| [Orelha cola](${orelhaCola}) · [relação](${relacao}) | Cola × corte |
| [Étimo](${etimo}) · [etimologia](${etimologia}) · [língua portuguesa](${lingua}) | Origem obscura honrada |
| [Verdade](${verdade}) · [gesto](${gesto}) · [risco](${risco}) | Ofício e limite clínico |
| [Vida](${vida}) | O peito que acorda |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é laudo de olho, receita de higiene ocular nem aula de remo.  
- O étimo de *remela* permanece **aberto**; não fechar *mucilla* nem *rēmus*.  
- Salas de coco (AL) e sardinha (Bairrada) não são inspeccionadas a fundo.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **ramela** / **remela** fichadas como secreção do canto do [olho](${olho}) (origem obscura); **ramelento** = *ramela* + *-ento*; cola **remo lento** cortada (*rēmus* × *lentus* — [remo](${remo})). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Remo](${remo}) · [▶ Olho](${olho}) · [▶ Sinais REM](${remSleep}) · [▶ Preguiça](${preguica}) · [▶ Poema Vida](/vida/#poema=ramela) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vidaHub})
`;

  const contentEn = `## Scope

Inspection of Portuguese **ramela** / **ramelento** and the ear-glue **remo lento** (“slow oar”). Field request: the **word** ramela, ramelento, and its relation to remo lento.

Three rooms. **Ramela** (lemma twin **remela**) is rheum in the corner of the [eye](${olho}) after sleep. Origin **obscure** (Aulete; EN Wiktionary *unknown*). **Ramelento** is *ramela* + *-ento*: having rheum; by extension sticky / sluggish. **Remo lento** is two other trees: [remo](${remo}) ← Lat. *rēmus* (oar) and *lento* ← Lat. *lentus* (slow). The [ear](${orelhaCola}) glues *ramelento* to *remo-lento*. The [etymon](${etimo}) **cuts**.

> Sources: [ramela](${WIKT_RAMELA}), [remela](${WIKT_REMELA_EN}), [Aulete](${AULETE_REMELA}), [remo](${WIKT_REMO}), [*lentus*](${WIKT_LENTUS}). Method: [etymology](${etimologia}). Close: [Valeu !!!](${mantra}).

## Three rooms

| Room | Piece | Origin | Office |
|------|-------|--------|--------|
| **Ramela** | *ramela* / *remela* | Obscure; Galician cognate | Rheum in the eye |
| **Ramelento** | *ramela* + *-ento* | Portuguese derivation | Having ramela; sluggish |
| **Remo lento** | *rēmus* + *lentus* | Two Latin trees | [Oar](${remo}) that does not hurry |
| **Cut folk** | remela ← *rēmus* / *mucilla* | Shape / mucus stories | Low confidence |

Waking with ramela may **feel** like rowing slowly. That is office, not blood.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *ramela* ≠ small oar. *ramelento* ≠ *remo lento*. Etymon of *remela* left open. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **ramela** / **ramelento** y la cola de oído **remo lento**. Pedido: la **palabra** ramela, ramelento y su relación con remo lento.

Tres salas. **Ramela** (lema hermano **remela**) es la lagaña en el rincón del [ojo](${olho}) después del sueño. Origen **oscuro** (Aulete; Wiktionary *unknown*). **Ramelento** es *ramela* + *-ento*: quien tiene ramela; por extensión, pegajoso / perezoso al despertar. **Remo lento** son dos árboles: [remo](${remo}) ← lat. *rēmus* y *lento* ← lat. *lentus*. El [oído](${orelhaCola}) pega *ramelento* a *remo-lento*. El [étimo](${etimo}) **corta**.

> Fuentes: [ramela](${WIKT_RAMELA}), [remela](${WIKT_REMELA_EN}), [Aulete](${AULETE_REMELA}), [remo](${WIKT_REMO}), [*lentus*](${WIKT_LENTUS}). Método: [etimología](${etimologia}). Cierre: [¡Valeu !!!](${mantra}).

## Tres salas

| Sala | Pieza | Origen | Oficio |
|------|-------|--------|--------|
| **Ramela** | *ramela* / *remela* | Oscuro; cognado gallego | Lagaña |
| **Ramelento** | *ramela* + *-ento* | Derivación portuguesa | Quien tiene ramela |
| **Remo lento** | *rēmus* + *lentus* | Dos árboles latinos | [Remo](${remo}) sin prisa |
| **Folclore cortado** | remela ← *rēmus* / *mucilla* | Forma / muco | Confianza baja |

Despertar con ramela puede **parecer** remar despacio. Eso es oficio, no sangre.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *ramela* ≠ remo pequeño. *ramelento* ≠ *remo lento*. Étimo de *remela* abierto. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildRamelaPost() {
  const { body, contentEn, contentEs } = buildRamelaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-ramela', 311);
  return makePalavra({
    title: 'Inspeção: Ramela — ramelento ≠ remo lento',
    titleEn: 'Inspection: Ramela — ramelento ≠ remo lento (slow oar)',
    titleEs: 'Inspección: Ramela — ramelento ≠ remo lento',
    excerpt:
      'Palavras: ramela / remela (canto do olho; origem obscura) × ramelento (ramela + -ento) ≠ remo lento (rēmus × lentus); Valeu !!!',
    excerptEn:
      'Words: ramela / remela (eye rheum; obscure origin) × ramelento (ramela + -ento) ≠ remo lento (rēmus × lentus); Valeu !!!',
    excerptEs:
      'Palabras: ramela / remela (lagaña; origen oscuro) × ramelento (ramela + -ento) ≠ remo lento (rēmus × lentus); ¡Valeu !!!',
    slug: 'inspecao-palavra-ramela',
    date: '2026-08-24T12:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Ramela · ramelento · remo lento',
    coverImage: COVER,
    sourceUrl: WIKT_REMELA,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRamelaPost,
  buildRamelaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_RAMELA,
  WIKT_REMELA,
  WIKT_REMELA_EN,
  WIKT_RAMELENTO,
  WIKT_REMO,
  WIKT_LENTUS,
  AULETE_REMELA
};
