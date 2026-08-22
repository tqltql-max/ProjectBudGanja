'use strict';

/**
 * Inspeção Palavras · bode
 * Eixos: caprino macho · étimo incerto · bode expiatório ·
 * gíria BR (estar de bode) · elo preguiça · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/bode-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/bode';
const WIKT_EXPR = 'https://pt.wiktionary.org/wiki/bode_expiat%C3%B3rio';
const WIKI = 'https://pt.wikipedia.org/wiki/Bode';
const WIKI_SCAPEGOAT = 'https://pt.wikipedia.org/wiki/Bode_expiat%C3%B3rio';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildBodeBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-bode.html';
  const preguica = '/posts/post-inspecao-palavra-preguica.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const pato = '/posts/post-inspecao-palavra-pato.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const rasmussen = '/posts/post-inspecao-richard-rasmussen.html';
  const rasmussenCanal = '/posts/post-inspecao-canal-richard-rasmussen.html';
  const rasmussenVideos = '/videos/?channel=rasmussen';
  const animais = '/animais/';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[bode](${self})** — o **macho caprino** (*Capra*), par supletivo de *cabra*, étimo **incerto** (substrato hispânico / pré-romano como hipótese de trabalho), e, no português vivo, também o **bode expiatório** e a gíria BR **estar de bode** / **dar um bode** (irritação). Pedido de campo: relacionar com **[preguiça](${preguica})** — outro [animal](${animal}) que a fala transformou em **estado** e em **figura moral**. Fecho: [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · bode](${WIKT}), [bode expiatório](${WIKT_EXPR}), [Wikipédia · Bode](${WIKI}), [bode expiatório](${WIKI_SCAPEGOAT}). **Ficha de palavra ≠ monografia de caprinocultura.** Sem afiliação comercial de criação. Falso amigo: esp. *bode* = adega (lat. *apotheca*) — **não** é este vocábulo. Fauna em ecrã: [Rasmussen](${rasmussen}) (ex.: caprinos Boer / Kalahari no [arquivo](${rasmussenVideos})) — respeito de ofício, sem fundir o macho com a gíria.

**Gatilho:** *BODE* / *bode* / *bode expiatorio* → lema **bode**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **bode** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Origem **incerta** — substrato pré-romano / hispânico; gal. *bode* — confiança: **média** (forma); **baixa** no étimo exacto |
| Não é | lat. *capra* (é *cabra*) · lat. *caper* / *hircus* (família outra) · esp. *bode* «adega» |
| Família viva | *cabra* (fêmea — par supletivo) · *cabrito* · *caprino* · *bodeagem* (gíria) |
| Tipo BudGanja | Palavra — animal × culpa (expiatório) × humor BR × elo [preguiça](${preguica}) |
| Elo irmão | **[preguiça](${preguica})** — animal → estado → figura de vício |
| Elo seres | [animal](${animal}) · [selvagem](${selvagem}) · hub [Animais](${animais}) · [pato](${pato}) (outro animal-ditado) |
| Elo ofício | [respeito](${respeito}) · [gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) |
| Elo fauna | [Rasmussen](${rasmussen}) · [canal](${rasmussenCanal}) |
| Fonte | [Wikcionário · bode](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o nome do **macho da cabra** — e, por metáfora, quem **leva a culpa** (expiatório) ou o **mau humor** que «dá um bode». No lab: separar **referente biológico**, **rito bíblico calhado** e **gíria de peito**.

## 2. Hipóteses e método

**H1:** *bode* no PT **não** herda *capra* (isso é *cabra*); o par bode/cabra é **supletivo**, como touro/vaca.  
**H2:** *bode expiatório* é **calque** do bode emissário / *scapegoat* (Lv 16) — culpa transferida, não zoologia.  
**H3:** «estar de bode» no BR é **estado de irritação** — cola de orelha com o cheiro/teima do macho; **não** fecha étimo da gíria.  
**H4:** o par **[bode](${self}) × [preguiça](${preguica})** mapeia **projecções**: luxúria/irritação/culpa *versus* acédia/lentidão — cada animal fica animal.

Passos:

1. Fixar forma + étimo (incerto, honesto).  
2. Tabela: caprino / expiatório / gíria / falso amigo.  
3. Corte com [preguiça](${preguica}).  
4. Limites + status.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Substrato pré-romano / hispânico | Forma iberorromance *bode*; gal. *bode* | Média (trabalho) |
| Lat. *capra* | Étimo de **cabra**, não de *bode* | Alta (é outro lema) |
| Lat. *caper* / *hircus* | Família do bode em latim — **não** a forma PT *bode* | Alta (paralelo, não étimo) |
| Esp. *bode* (adega) | *Apotheca* → adega — **falso amigo** | Alta (corte) |
| Onomatopeia do berro | Hipótese popular | Fraca |

**Veredicto etimológico:** origem **não fechada**; não forçar latim *capra*. O que está fechado: o **uso** (macho caprino + expiatório + gíria BR) e o **falso amigo** espanhol.

## 4. Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Animal / criação | bode; cabra; cabrito; caprino Boer | Referente — hub [Animais](${animais}); ecrã [Rasmussen](${rasmussen}) |
| Par supletivo | bode (macho) / cabra (fêmea) | Como touro/vaca — dois étimos, um ofício |
| Rito / culpa | **bode expiatório** | Levítico → calque: alguém paga o [pato](${pato}) do grupo |
| Gíria BR | estar de bode; dar um bode | Irritação / enjoo de peito — **≠** o caprino |
| Imaginário cristão | bode / bode do diabo / luxúria | Figura — sem sermão; par com [preguiça](${preguica}) (acédia) |
| Cheiro / teima | «fede a bode»; teimosia | Qualidades do macho no ditado — não laudo |
| Falso amigo | esp. *bode* (adega) | Outro mapa |

## 5. Elo com [preguiça](${preguica})

Pedido de campo: **bode** relacionado com **preguiça**. O laboratório aceita o par como **mapa**, não como sinónimo.

| Eixo | **bode** | **[preguiça](${preguica})** |
|------|----------|------------------------------|
| Referente vivo | Macho caprino — curral, sertão, pedra | Xenartro — mata, galho, folha |
| Tempo do bicho | Sobe, teima, fareja | Pende, poupa, mastiga devagar |
| Pecado projectado | Luxúria / bode do imaginário | Acédia / «não se mexe» |
| Gíria BR | Irritação («estar de bode») | Relutância («que preguiça») |
| Culpa | **Carrega** a alheia (expiatório) | Acusam quem **não carrega** |
| Corte lab | Animal ≠ mau humor | Ecologia lenta ≠ pecado |

**H5:** quem «está de bode» não é caprino; quem «está com preguiça» não é Folivora. A [verdade](${verdade}) devolve o bicho ao bicho e o peito ao peito.

## 6. Expressões âncora

| Expressão | Sentido | Leitura de ofício |
|-----------|---------|-------------------|
| **bode expiatório** | Quem leva a culpa (e a pena) do grupo | Nomear a transferência — irmão de [pagar o pato](${pato}) |
| **estar de bode** | Irritado, de mau humor (BR) | Estado — inspecionar o peito, não o curral |
| **dar um bode** | Dar um enjoo / uma irritação | Gíria — não zoologia |
| **cabra / cabrito** | Fêmea / cria | Par do lema; não fundir étimos |
| **bode** (ES) | Adega | Falso amigo — recusar |

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[preguiça](${preguica})** | Irmã: animal → estado → figura de vício |
| [animal](${animal}) · [Animais](${animais}) · [selvagem](${selvagem}) | Ser vivo e lugar |
| [pato](${pato}) | Irmão de ditado: pagar o pato ≈ bode expiatório (culpa alheia) |
| [Rasmussen](${rasmussen}) · [canal](${rasmussenCanal}) · [vídeos](${rasmussenVideos}) | Caprinos no arquivo de fauna — [respeito](${respeito}) |
| [gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) | Não descarregar no outro o que é da mão |
| [Valeu !!!](${mantra}) | Ofício: o melhor possível **nesta mão** — sem fazer de ninguém o bode |

### Como ler

1. Entrar pelo **caprino** (esta ficha) ou pela **gíria**.  
2. Se vier pelo expiatório, cruzar [pato](${pato}) (culpa alheia).  
3. Se vier pela [preguiça](${preguica}), ler o **par de projecções**.  
4. Não importar o espanhol *bode* (adega).  
5. Fechar com [Valeu !!!](${mantra}) — ofício ≠ descarregar no outro.  
6. Voltar ao [hub](${hubAll}).

## 8. Avaliação BudGanja

### Forças

- Declara o étimo **incerto** sem forçar *capra*.  
- Separa caprino, expiatório, gíria e falso amigo.  
- Cruza **[preguiça](${preguica})** e [pato](${pato}) sem analogia clínica.

### Limites

- Não é manual de criação caprina.  
- Não fecha a origem da gíria «estar de bode».  
- Não é exegese completa de Lv 16.

## Status

**Aprovado** — **bode** fichado: macho caprino, expiatório, gíria BR, falso amigo espanhol, elo com **[preguiça](${preguica})**. [Valeu !!!](${mantra}) **sem fazer de ninguém o bode**.

[▶ Palavras](${hub}) · [▶ Preguiça](${preguica}) · [▶ Animal](${animal}) · [▶ Pato](${pato}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **bode** — the **billy goat** (*Capra*), suppletive pair of *cabra*, **uncertain** etymon (pre-Roman Hispanic substrate as working hypothesis), plus **scapegoat** (*bode expiatório*) and Brazilian slang **estar de bode** (irritation). Field request: relate to **[preguiça](${preguica})** (sloth / laziness) — another [animal](${animal}) turned into a **state** and a **moral figure**. Close: [Valeu !!!](${mantra}).

> Method note: [Wiktionary · bode](${WIKT}). Word sheet ≠ husbandry monograph. False friend: Spanish *bode* = wine cellar.

## Object

| Field | Value |
|-------|-------|
| Word | **bode** |
| Etymon | Uncertain — not Lat. *capra* (that is *cabra*) |
| Lab type | Animal × scapegoat × BR mood × pair with [preguiça](${preguica}) |
| Links | [preguiça](${preguica}) · [animal](${animal}) · [pato](${pato}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

**Cut:** the goat is not the bad mood; the scapegoat is transferred blame (kin to [pagar o pato](${pato})). Sloth and goat are a **map of projections**.

## Status

**Approved** — goat, scapegoat and slang mapped; pair with [preguiça](${preguica}); Spanish cellar false friend cut.

[▶ Words](${hub}) · [▶ Preguiça](${preguica}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **bode** — el **macho cabrío** (*Capra*), par supletivo de *cabra*, étimo **incierto**, más el **chivo expiatorio** y la jerga BR **estar de bode** (irritación). Pedido de campo: relacionar con **[preguiça](${preguica})** — otro [animal](${animal}) vuelto **estado** y **figura moral**. Cierre: [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · bode](${WIKT}). Ficha ≠ monografía de cría. Falso amigo: esp. *bode* = bodega (*apotheca*) — **no** es este vocablo.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **bode** |
| Étimo | Incierto — no lat. *capra* (eso es *cabra*) |
| Tipo lab | Animal × chivo expiatorio × humor BR × par con [preguiça](${preguica}) |
| Vínculos | [preguiça](${preguica}) · [animal](${animal}) · [pato](${pato}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

**Corte:** el macho no es el mal humor; el chivo expiatorio es culpa transferida (par de [pagar o pato](${pato})). Perezoso y cabra son **mapa de proyecciones**.

## Estado

**Aprobada** — caprino, expiatorio y jerga mapeados; par con [preguiça](${preguica}); falso amigo de la bodega cortado.

[▶ Palabras](${hub}) · [▶ Preguiça](${preguica}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildBodePost() {
  const { body, contentEn, contentEs, wiki } = buildBodeBodies();
  const seriesOrder = pickOrder('inspecao-palavra-bode', 205);
  const post = makePalavra({
    title: 'Inspeção: Bode — o caprino, o expiatório e o mau humor',
    titleEn: 'Inspection: Bode — the billy goat, the scapegoat, and the bad mood',
    titleEs: 'Inspección: Bode — el macho cabrío, el chivo expiatorio y el mal humor',
    excerpt:
      'Palavras: bode — macho caprino (étimo incerto), bode expiatório e gíria BR; elo preguiça; Valeu !!!',
    excerptEn:
      'Words: bode — billy goat (uncertain etymon), scapegoat and BR slang; link preguiça; Valeu !!!',
    excerptEs:
      'Palabras: bode — macho cabrío (étimo incerto), chivo expiatorio y jerga BR; vínculo preguiça; ¡Valeu !!!',
    slug: 'inspecao-palavra-bode',
    date: '2026-08-22T06:18:00.000Z',
    seriesOrder,
    seriesLabel: 'Bode · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.seriesOrder = seriesOrder;
  return post;
}

module.exports = {
  buildBodePost,
  buildBodeBodies
};
