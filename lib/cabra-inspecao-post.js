'use strict';

/**
 * Inspeção Palavras · cabra × abracadabra
 * Lat. capra (fêmea caprina) — a orelha cola c+abra na fórmula.
 * Pedido: Cabra relação com abra → abracadabra.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/cabra-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/cabra';
const WIKT_ABRA = 'https://pt.wiktionary.org/wiki/abra';
const WIKT_ABRIR = 'https://pt.wiktionary.org/wiki/abrir';
const WIKT_LA = 'https://en.wiktionary.org/wiki/capra#Latin';
const WIKT_APERIRE = 'https://en.wiktionary.org/wiki/aperio#Latin';
const WIKI = 'https://pt.wikipedia.org/wiki/Cabra';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts.filter((p) => p.series === 'palavras-origem').map((p) => Number(p.seriesOrder) || 0)
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
  return `Cabra.
Não é abracadabra.

A orelha lê c + abra
e pede o truque.
O étimo corta:
capra era a fêmea
no curral latino.

Abracadabra é fórmula.
Amuleto, palco, cue.
Não o chifre.
Não o leite.

Abra também abre a porta
(aperīre) — terceira casa.
O bode é o par
com outro étimo.

Valeu !!!
o animal no curral,
a sílaba no palco.`;
}

function poemEn() {
  return `Cabra.
Not abracadabra.

The ear reads c + abra
and asks for the trick.
The etymon cuts:
capra was the female
in the Latin yard.

Abracadabra is a formula.
Amulet, stage, cue.
Not the horn.
Not the milk.

Abra also opens the door
(aperīre) — a third house.
The billy goat is the pair
with another etymon.

Valeu !!!
the animal in the yard,
the syllable on stage.`;
}

function poemEs() {
  return `Cabra.
No es abracadabra.

La oreja lee c + abra
y pide el truco.
El étimo corta:
capra era la hembra
en el corral latino.

Abracadabra es fórmula.
Amuleto, palco, cue.
No el cuerno.
No la leche.

Abra también abre la puerta
(aperīre) — tercera casa.
El bode es el par
con otro étimo.

¡Valeu !!!
el animal en el corral,
la sílaba en el palco.`;
}

function buildCabraBodies() {
  const inspected = '2026-08-26';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-cabra.html';
  const bode = '/posts/post-inspecao-palavra-bode.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const abracadabra = '/posts/post-inspecao-palavra-abracadabra.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const palavra = '/posts/post-inspecao-palavra-palavra.html';
  const pessoas = '/posts/post-inspecao-palavra-pessoas.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const animais = '/animais/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[cabra](${self})** e da sua **[relação](${relacao})** com **abra**. Pedido de campo: *inspeçao da labra Cabra relacao com abra*. [A orelha cola](${orelhaCola}) **c + abra** dentro de **cabra**. O [étimo](${etimo}) **corta**. Duas famílias latinas: *capra* (**fêmea caprina**) e *aperīre* (**abrir** → forma **abra**). A [palavra](${palavra}) *cabra* não nasceu do verbo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · cabra](${WIKT}), [*abra*](${WIKT_ABRA}), [*abrir*](${WIKT_ABRIR}), lat. [*capra*](${WIKT_LA}), [*aperiō*](${WIKT_APERIRE}), [Cabra](${WIKI}). Método: [etimologia](${etimologia}) · [latim](${latim}). **Ficha ≠ monografia de caprinocultura, ≠ aula de conjugação de *abrir*, ≠ grimório.** Irmão de curral: [bode](${bode}) (par supletivo — outro étimo). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *Cabra* / *cabra* / *abra* / *abrir* colado na cabra → lema **cabra**. Forma verbal *abra* (abrir) e enseada *abra* ficam **nesta** [relação](${relacao}), sem ficha própria. Fórmula de palco → [abracadabra](${abracadabra}). Macho caprino → [bode](${bode}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **cabra** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | lat. *capra* «cabra, fêmea do caprino» — confiança: **alta** |
| Pedido de campo | *Cabra* **relação** com **abra** — letras dentro, étimos fora |
| Não é | *abra* (← *abrir* / enseada) · [abracadabra](${abracadabra}) · [bode](${bode}) (étimo outro) · EN *goat* (via germânica) |
| Família viva | *cabrito* · *caprino* · *Capra* (género) · *Capricórnio* (*capra* + *cornū*) |
| Par supletivo | **[bode](${bode})** — macho; étimo **incerto**, **não** *capra* |
| Tipo BudGanja | Palavra — animal × orelha *c+abra* × corte *aperīre* |
| Elo seres | [animal](${animal}) · hub [Animais](${animais}) |
| Fonte | [cabra](${WIKT}) · [abra](${WIKT_ABRA}) |
| Data | ${inspected} |

**O que é o objecto:** o nome português da **fêmea caprina**. No Nordeste também pode nomear **uma pessoa** (*cabra da peste*, *cabra macho*) — gíria, não étimo novo. **Abra** não é diminutivo nem raiz escondida: é **outra palavra** que a vista encontra **dentro**.

## 2. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **cabra** | *c* + **abra** (porta / abraço / fórmula) | lat. *capra* — a **fêmea** |
| **abra** (verbo) | Pedaço da cabra | Forma de **[abrir](${WIKT_ABRIR})** ← lat. *aperīre* |
| **abra** (nome) | A mesma porta | Enseada / clareira entre montes — ainda a família de *abrir* |
| **[abracadabra](${abracadabra})** | A cabra no palco | Fórmula / amuleto — começa em *abra-*, **não** em *capra* |
| **abraço** | Abra + o animal | *ad* + *brachium* (braço) — terceira casa |
| **[bode](${bode})** | O macho da mesma raiz | Par **supletivo** — étimo **outro** |
| EN *goat* | Tradução = étimo | Via germânica — **não** desce de *capra* |

**H-letras:** *cabra* contém as letras de *abra* como *cara+alho* contém *alho*: [trocadilho](${trocadilho}) de vista, não genealogia.  
**H-abrir:** *abra* ← *abrir* ← *aperīre* («abrir, descobrir»). A porta **não** gera o chifre.  
**H-fórmula:** [abracadabra](${abracadabra}) é cue de palco; a cabra não entra no triângulo do amuleto.  
**H-par:** bode/cabra = touro/vaca: um ofício, **dois** étimos. Ver [bode](${bode}).

## 3. Duas famílias

| Família | Étimo | Português | Não misturar |
|---------|-------|-----------|--------------|
| **Caprino fêmea** | lat. *capra* | **cabra** · cabrito · caprino · Capricórnio | O *c* não é prefixo de *abra* |
| **Abrir / porta** | lat. *aperīre* | abrir · **abra** · abertura · enseada *abra* | Não é o animal |
| **Palco** | fórmula (origem remota **incerta**) | [abracadabra](${abracadabra}) | Começa igual na boca; outra ficha |
| **Braço** | lat. *brachium* | abraço · braço | *abra-* de *abraço* ≠ *capra* |
| **Macho caprino** | étimo **incerto** | [bode](${bode}) | Par de curral, não de raiz |

A [relação](${relacao}) pede o **entre**: cabra e abra **encontram-se na página**, não na árvore. A orelha cola; o [étimo](${etimo}) corta.

## 4. Rede de sentidos da cabra

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Animal / criação | cabra; cabrito; leite; queijo | Referente — hub [Animais](${animais}); [respeito](${respeito}) |
| Par do curral | cabra / [bode](${bode}) | Dois lemas; um ofício |
| Gíria NE | cabra da peste; cabra macho | Pessoa — [pessoas](${pessoas}) no trato; **não** étimo |
| Insulto | *cabrão* | Derivado de *cabra* — gíria, não porta |
| Céu | Capricórnio | *capra* + *cornū* — chifre, não *abrir* |
| Vista | c + abra | Cola; recusar genealogia |

## 5. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Fichar **cabra** como *capra*; mandar o macho para [bode](${bode}) |
| Bom | Cortar **abra** (*abrir* / enseada) quando a boca junta as letras |
| Bom | Mandar a fórmula para [abracadabra](${abracadabra}) |
| Mau | Inventar que *cabra* vem de *abrir a porta* ou de *abraço* |
| Mau | Fundir cabra, bode e abracadabra num só curral |

Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=cabra)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [bode](${bode}) | Par supletivo — macho, étimo outro |
| [animal](${animal}) · [Animais](${animais}) | Ser vivo e lugar |
| [relação](${relacao}) · [orelha cola](${orelhaCola}) | O entre e a cola *c+abra* |
| [abracadabra](${abracadabra}) | Fórmula que **começa** em *abra-* |
| [trocadilho](${trocadilho}) | Cara+alho: o mesmo ofício de vista |
| [pessoas](${pessoas}) | Quando *cabra* nomeia alguém (gíria) |
| [latim](${latim}) · [língua portuguesa](${lingua}) | *capra* × *aperīre* |
| [Guia](${guia}) · [Palavras](${hub}) | Mapa |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é manual de criação caprina nem de conjugação de *abrir*.  
- Não fecha o étimo remoto de [abracadabra](${abracadabra}).  
- Não funde gíria nordestina com o animal.

## Status

**Aprovado na série Palavras** — *cabra* ← lat. *capra*; **relação** com *abra* (*aperīre*) cortada: letras dentro, étimos fora. [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Bode](${bode}) · [▶ Relação](${relacao}) · [▶ Abracadabra](${abracadabra}) · [▶ Animal](${animal}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **cabra** (“goat”, the female) and its [relation](${relacao}) to **abra**. Field request: inspect *Cabra* in relation to *abra*. [The ear glues](${orelhaCola}) **c + abra** inside **cabra**. The etymon **cuts**. Two Latin families: *capra* (she-goat) and *aperīre* (to open → form **abra**). Sister yard: [bode](${bode}) (billy goat — other etymon). Stage formula: [abracadabra](${abracadabra}).

> [Wiktionary · cabra](${WIKT}), [*abra*](${WIKT_ABRA}), Lat. [*capra*](${WIKT_LA}). Close: [Valeu !!!](${mantra}).

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *cabra* ← *capra*; *abra* ← *aperīre*. Letters inside; etymons apart. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**cabra** (la hembra caprina) y su [relación](${relacao}) con **abra**. Pedido: inspeccionar *Cabra* en relación con *abra*. [La oreja pega](${orelhaCola}) **c + abra** dentro de **cabra**. El étimo **corta**. Dos familias: *capra* y *aperīre* (abrir → forma **abra**). Par del corral: [bode](${bode}) (otro étimo). Fórmula: [abracadabra](${abracadabra}).

> [Wikcionario · cabra](${WIKT}), [*abra*](${WIKT_ABRA}), lat. [*capra*](${WIKT_LA}). Cierre: [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *cabra* ← *capra*; *abra* ← *aperīre*. Letras dentro; étimos aparte. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildCabraPost() {
  const { body, contentEn, contentEs } = buildCabraBodies();
  return makePalavra({
    title: 'Inspeção: Cabra — capra; a orelha cola abra',
    titleEn: 'Inspection: Cabra — capra; the ear glues abra',
    titleEs: 'Inspección: Cabra — capra; la oreja pega abra',
    excerpt:
      'Palavras: cabra ← lat. capra; relação com abra (← abrir / aperīre) — letras dentro, étimos fora; ≠ bode; Valeu !!!',
    excerptEn:
      'Words: cabra ← Lat. capra; relation to abra (← abrir / aperīre) — letters inside, etymons apart; ≠ bode; Valeu !!!',
    excerptEs:
      'Palabras: cabra ← lat. capra; relación con abra (← abrir / aperīre) — letras dentro, étimos aparte; ≠ bode; ¡Valeu !!!',
    slug: 'inspecao-palavra-cabra',
    date: '2026-08-26T12:10:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-cabra', 366),
    seriesLabel: 'Cabra · capra ≠ abra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCabraPost,
  buildCabraBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
