'use strict';

/**
 * Inspeção Palavras · bosta
 * Eixos: estrume ibérico (esp. bosta, origem incerta) · gíria / insulto
 * × cola de orelha com Boston · ≠ merda (lat. merda) ≠ topónimo.
 * Pedido: cruza Boston com a palavra Bosta.
 * Ficha de vocábulo — não dicionário de ofensas, não protocolo de adubo.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/bosta-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/bosta';
const WIKT_EN = 'https://en.wiktionary.org/wiki/bosta';
const WIKT_ES = 'https://es.wiktionary.org/wiki/bosta';

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
  return `Bosta.
É o estrume.
É também a gíria
quando a coisa não presta.

Não é Boston.
A cidade tem um santo
e uma vila no nome.
Aqui o chão é outro.

O corpo larga.
O campo às vezes usa.
A boca às vezes fere.

Valeu !!!
nomear o vocábulo
sem fazer dele arma
e sem colar no mapa.`;
}

function poemEn() {
  return `Bosta.
It is dung.
It is also the slang
when the thing is no good.

It is not Boston.
The city has a saint
and a town in the name.
Here the ground is other.

The body lets go.
The field sometimes uses it.
The mouth sometimes wounds.

Valeu !!!
name the word
without making it a weapon
and without gluing it to the map.`;
}

function poemEs() {
  return `Bosta.
Es el estiércol.
Es también la jerga
cuando la cosa no sirve.

No es Boston.
La ciudad tiene un santo
y una villa en el nombre.
Aquí el suelo es otro.

El cuerpo suelta.
El campo a veces usa.
La boca a veces hiere.

¡Valeu !!!
nombrar el vocablo
sin hacerlo arma
y sin pegarlo al mapa.`;
}

function buildBostaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-bosta.html';
  const boston = '/posts/post-inspecao-palavra-boston.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const giria = '/posts/post-inspecao-palavra-giria.html';
  const intestino = '/posts/post-inspecao-palavra-intestino.html';
  const vomitar = '/posts/post-inspecao-palavra-vomitar.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const mexico = '/posts/post-inspecao-palavra-mexico.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[bosta](${self})** — o **vocábulo** do estrume e, no português BR, da [gíria](${giria}) («que bosta», «uma bosta»). Pedido de campo: *cruza Boston com a palavra Bosta*. Par de ofício: **[Boston](${boston})**.

[A orelha cola](${orelha}) *bosta* em *Boston*. O [étimo](${etimologia}) **corta**. Esta ficha cobre o **chão ibérico** (fezes / estrume / valoração negativa). A cidade fica na irmã. O ofício: **inspeccionar a língua sem celebrar o insulto** e sem transformar estrume em receita de cultivo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · bosta](${WIKT}), [EN](${WIKT_EN}), [ES · bosta](${WIKT_ES}). Étimo **incerto** (via espanhola; substrato ibérico possível) — confiança **baixa–média** na origem última; **alta** no sentido e no uso. **Ficha ≠ dicionário de ofensas, ≠ protocolo de adubo, ≠ gastroenterologia, ≠ chacota de cidade.** Série [Palavras](${hub}). Trabalho com [respeito](${respeito}) e [verdade](${verdade}). Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

**Gatilho:** *bosta* / *bostas* / *que bosta* / *uma bosta* / *estar na bosta* / cola *Boston*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **bosta** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Via **espanhol** *bosta* (estrume, sobretudo de gado); origem última **incerta** (ibérica / pré-romana em discussão) — confiança: sentido **alta**; avô último **baixa–média** |
| Família de uso | *bostas* · *bosteiro* (derivado pejorativo) · locuções *que bosta*, *uma bosta*, *estar na bosta* |
| Tipo BudGanja | Palavra — estrume × [gíria](${giria}) × cola com [Boston](${boston}) |
| Não é | [Boston](${boston}) · lat. *merda* (outro étimo) · tutorial de adubo · laudo do [intestino](${intestino}) |
| Elo corpo | [intestino](${intestino}) (o tubo; não esta palavra) · [vomitar](${vomitar}) (outro gesto de largar) |
| Elo chão | [planta](${planta}) — estrume como matéria de campo, **sem** protocolo nesta página |
| Fonte | [bosta](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo ibérico do **estrume** — e o que a boca BR fez dele (desdém, insulto, interjeição). Não é o nome de Massachusetts.

## 2. Hipóteses e método

**H1:** *bosta* no PT é herdada da via iberorromânica (esp./gal. *bosta*) — alta no empréstimo; média na pré-história.  
**H2:** o sentido-chão é **excremento** (sobretudo de gado, no espanhol clássico da palavra) — alta.  
**H3:** no BR contemporâneo o figurado (**coisa má**, **insulto**, **interjeição**) é **vivo** e não apaga o chão — alta.  
**H4:** [Boston](${boston}) **não** partilha este étimo; a cola é [trocadilho](${trocadilho}) — alta.  
**H5:** *merda* (lat. *merda*), *cocô* / *cocó*, *esterco* (lat. *stercus*) são **vizinhos de ofício**, não o mesmo avô — alta na distinção.  
**H6:** ficha ≠ arma. Nomear o insulto ≠ usá-lo contra pessoa ou cidade — alta (método, como em outras fichas de tabu).  
**H7:** fecho = [Valeu !!!](${mantra}).

## 3. Três andares — sem fundir

| Andar | O que é | Bom × mau |
|-------|---------|-----------|
| **1. Chão** | Fezes / estrume (matéria) | Bom: nomear · Mau: nojo como étimo; tutorial sanitário |
| **2. Campo** | Estrume como matéria que o [chão](${planta}) às vezes recebe | Bom: literacia agrícola **mínima** · Mau: receita de compostagem ou dose |
| **3. Boca** | [Gíria](${giria}): «que bosta», «isso é uma bosta», «estar na bosta» | Bom: termómetro de desdém · Mau: insulto à pessoa / à cidade [Boston](${boston}) |

**H-andares:** o laboratório sobe os três. Não escolhe um só para fingir que os outros não existem. Não celebra o terceiro.

## 4. Étimo — ibérico, não Botolph

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **PT bosta** | Mesmo lema que esp. *bosta* | Alta |
| **ES bosta** | Estiércol (esp. vacuno, nas fontes); também figurado | Alta no sentido; origem última **incerta** |
| **Substrato** | Hipótese pré-romana / ibérica (dicionários marcam dúvida) | Baixa–média — **não** fechar rei |
| **Boston** | *Botolph's town* / *tūn* | **Outra árvore** — ver [Boston](${boston}) |
| **merda** | Lat. *merda* | Vizinha de chão; **não** esta ficha |
| **esterco** | Lat. *stercus* | Vizinho agrícola culto; **não** esta ficha |

**H-incerto:** honrar a dúvida do avô último é [verdade](${verdade}). Inventar um étimo «Boston → bosta» ou «bosta → Boston» é o erro que o cruzamento veio **impedir**.

## 5. O que a orelha cola — e o étimo corta

Pedido: cruzar com **[Boston](${boston})**. Método irmão: [México](${mexico}) (país ≠ golfo).

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **bosta** ≈ **Boston** | A cidade nasceu do vocábulo (ou o contrário) | Homofonia aproximada; [Boston](${boston}) traz *tūn* (vila); *bosta* não |
| **Boston = bosta + n** | Um *n* colado no palavrão | O *n*/*on* é a **vila** na ficha-irmã; aqui não há *tūn* |
| **«Boston é uma bosta»** | Juízo sobre o mapa | Insulto a lugar — a ficha **nomeia** o mecanismo e **recusa** o uso como étimo |
| **estar na bosta** | Estar em Boston | Locução = estar mal / em situação ruim; a aula que diz «tá na bosta» fala **gíria**, não Massachusetts |

**Veredicto contraste:** a orelha funde; o lab **separa**. Cruzamento = [relação](${relacao}) etiquetada, não fusão.

## 6. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Bosta vem de Boston» | **Não.** Cidade < Botolph + *tūn*. Vocábulo < via *bosta* ibérica |
| «É só palavrão» | O palavrão é o **terceiro andar**. O chão é estrume |
| «É adubo, então a ficha ensina dose» | A ficha **nomeia** a matéria. Protocolo de cultivo = outra sala. [Risco](${risco}) de ler receita onde há só vocábulo |
| «Inspeccionar é xingar» | **Não.** Como noutras fichas de tabu: mapa da língua, não arma |
| «Cruzar com Boston autoriza a piada como origem» | O [trocadilho](${trocadilho}) é o **jogo**. A origem está nas duas fichas, **cortada** |

**Veredicto correção:** **bosta = vocábulo do estrume / da gíria.** Se a boca disse *Boston* no mesmo sopro, abrir esta ficha **e** [Boston](${boston}).

## 7. Vizinhos — mesmo chão, outros avós

| Vocábulo | Avô de trabalho | Papel |
|----------|-----------------|-------|
| **bosta** | Ibérica *bosta* (incerta no último andar) | Esta ficha |
| **merda** | Lat. *merda* | Tabu culto / gíria; **não** fundir |
| **cocô** | Fala infantil / onomatopeia de ofício | Andar da infância |
| **esterco** | Lat. *stercus* | Nome agrícola mais formal |
| **[intestino](${intestino})** | Lat. *intestinum* | O **tubo**; não o dejecto |
| **[vomitar](${vomitar})** | Lat. *vomere* | Largar por outra via |

**H-vizinhos:** o laboratório não faz sinónimo preguiçoso. Quatro nomes, quatro salas, um ofício de chão.

## 8. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Chão** | «bosta de vaca no pasto» | Bom: matéria · Mau: nojo como definição única |
| **Juízo** | «o filme é uma bosta» | Bom: desdém sobre **coisa** · Mau: humilhar **pessoa** |
| **Interjeição** | «que bosta!» | Bom: termómetro · Mau: virar arma de rua |
| **Estado** | «estar na bosta» | Bom: situação ruim · Mau: colar em [Boston](${boston}) |
| **Trocadilho** | Boston × bosta | Bom: apontar a cola e ler as duas fichas · Mau: origem falsa |

## 9. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[Boston](${boston})** | Par pedido — cidade / *tūn*; **não** este étimo |
| [Trocadilho](${trocadilho}) · [etimologia](${etimologia}) · [orelha cola](${orelha}) | Jogo × corte |
| [Gíria](${giria}) · [respeito](${respeito}) | Andar da fala; limite do insulto |
| [Intestino](${intestino}) · [vomitar](${vomitar}) | Corpo — tubo e gesto; não esta palavra |
| [Planta](${planta}) | Campo — estrume como matéria, sem receita |
| [México](${mexico}) | Método: orelha cola, étimo corta |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hub}) | Solo |
| [Verdade](${verdade}) · [relação](${relacao}) · [risco](${risco}) | Ofício |
| [Valeu !!!](${mantra}) · [eu amo a vida](${amo}) · [Vida](${vidaHub}) | Fecho |

## 10. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=bosta)

## Limites

- Não é dicionário de xingamentos nem licença para ofender.  
- Não é protocolo de adubo, compostagem ou sanitário.  
- Não é ficha clínica do [intestino](${intestino}).  
- Não funde com [Boston](${boston}) nem com *merda* / *esterco*.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **bosta** fichada como vocábulo ibérico do **estrume** e da [gíria](${giria}); cola com [Boston](${boston}) recusada como étimo e enviada ao [trocadilho](${trocadilho}); sem celebrar o insulto. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Boston](${boston}) · [▶ Trocadilho](${trocadilho}) · [▶ Gíria](${giria}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **[bosta](${self})** — the word for **dung** and, in BR slang, “crap / worthless / damn.” Field request: *cross Boston with the word Bosta*. Pair: **[Boston](${boston})**.

[The ear glues](${orelha}) *bosta* to *Boston*. The [etymon](${etimologia}) **cuts**. This sheet covers the **Iberian ground**. The city lives on the sister sheet. Office: inspect the language **without celebrating the insult** and without turning manure into a grow protocol.

> Independent audit. Sources: [bosta](${WIKT}), [EN](${WIKT_EN}), [ES](${WIKT_ES}). Ultimate origin **uncertain** (Spanish *bosta*; possible Iberian substrate). Sense and use: **high**. **Sheet ≠ slur dictionary, ≠ fertilizer protocol, ≠ GI clinic.** Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Word | **bosta** (f.) |
| Etymon | via Sp. *bosta* (dung, often cattle) — last ancestor **uncertain** |
| Floors | matter · field (named, not dosed) · [slang](${giria}) |
| Not | [Boston](${boston}) · Lat. *merda* · a how-to |
| Date | ${inspected} |

Three floors, no fusion. The pun with [Boston](${boston}) is a [play on words](${trocadilho}), not a shared grandfather.

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** dung-word ≠ city. Cross = label the gap. [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Boston](${boston}) · [▶ Pun](${trocadilho}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[bosta](${self})** — vocablo del **estiércol** y, en el BR, jerga («qué bosta», «una bosta»). Pedido: *cruza Boston con la palabra Bosta*. Par: **[Boston](${boston})**.

[El oído pega](${orelha}) *bosta* a *Boston*. El [étimo](${etimologia}) **corta**. Esta ficha cubre el **suelo ibérico**. La ciudad vive en la hermana. Oficio: inspeccionar la lengua **sin celebrar el insulto** y sin volver el estiércol receta de cultivo.

> Auditoría independiente. Fuentes: [bosta](${WIKT}), [ES](${WIKT_ES}). Origen último **incierto** (esp. *bosta*). Sentido y uso: **alta**. **Ficha ≠ diccionario de ofensas, ≠ protocolo de abono.** Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **bosta** (f.) |
| Étimo | vía esp. *bosta* — ancestro último **incierto** |
| Pisos | materia · campo (nombrar, no dosificar) · [jerga](${giria}) |
| No es | [Boston](${boston}) · lat. *merda* · tutorial |
| Fecha | ${inspected} |

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** vocablo del estiércol ≠ ciudad. Cruzar = etiquetar el entre. [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Boston](${boston}) · [▶ Trocadilho](${trocadilho}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildBostaPost() {
  const { body, contentEn, contentEs } = buildBostaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-bosta', 295);
  const post = makePalavra({
    title: 'Inspeção: Bosta — estrume e gíria; ≠ Boston',
    titleEn: 'Inspection: Bosta — dung and slang; ≠ Boston',
    titleEs: 'Inspección: Bosta — estiércol y jerga; ≠ Boston',
    excerpt:
      'Palavras: bosta ← via esp. bosta (estrume; étimo último incerto); gíria BR; cola de orelha com Boston recusada; Valeu !!!',
    excerptEn:
      'Words: bosta ← via Sp. bosta (dung; ultimate etymon uncertain); BR slang; ear-glue to Boston refused; Valeu !!!',
    excerptEs:
      'Palabras: bosta ← vía esp. bosta (estiércol; étimo último incierto); jerga BR; cola de oído con Boston rechazada; ¡Valeu !!!',
    slug: 'inspecao-palavra-bosta',
    date: '2026-08-24T12:05:00.000Z',
    seriesOrder,
    seriesLabel: 'Bosta · estrume · gíria',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = WIKT;
  post.content_raw = post.content_raw || body;
  post.excerpt = post.excerpt;
  post.seriesOrder = post.seriesOrder;
  post.seriesLabel = post.seriesLabel;
  return post;
}

module.exports = {
  buildBostaPost,
  buildBostaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
