'use strict';

/**
 * Inspeção Palavras · preguiça
 * Eixos: pigritia / piger · pecado × animal (bicho-preguiça) ·
 * descanso ≠ vício · elo bode · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/preguica-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/pregui%C3%A7a';
const WIKT_LAT = 'https://en.wiktionary.org/wiki/pigritia';
const WIKI_ANIMAL = 'https://pt.wikipedia.org/wiki/Pregui%C3%A7a';
const WIKI_SIN = 'https://pt.wikipedia.org/wiki/Pregui%C3%A7a_(pecado)';

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

function buildPreguicaBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-preguica.html';
  const bode = '/posts/post-inspecao-palavra-bode.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const nap = '/posts/post-inspecao-palavra-nap.html';
  const colchao = '/posts/post-inspecao-palavra-colchao.html';
  const mama = '/posts/post-inspecao-palavra-mama.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const rasmussen = '/posts/post-inspecao-richard-rasmussen.html';
  const rasmussenCanal = '/posts/post-inspecao-canal-richard-rasmussen.html';
  const eliana = '/posts/post-inspecao-eliana-rodrigues.html';
  const unifesp = '/biblioteca/unifesp/';
  const livroXiv = '/biblioteca/unifesp/livro-xiv.html';
  const animais = '/animais/';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[preguiça](${self})** — lat. *pigritia* ← *piger* («lento, relutante»). O português cola **dois objectos** que o laboratório corta: o **estado** (não querer mexer; pecado capital da acédia) e o **animal** ([bicho-preguiça](${WIKI_ANIMAL}), Folivora). Pedido de campo: relacionar com **[bode](${bode})** — outro [animal](${animal}) que a fala BR transformou em **estado** («estar de bode») e em **figura moral** (luxúria / bode expiatório). Fecho: [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · preguiça](${WIKT}), lat. [*pigritia*](${WIKT_LAT}), [Wikipédia · animal](${WIKI_ANIMAL}), [pecado](${WIKI_SIN}), aula XIV ([Eliana Rodrigues](${eliana}) · [Livro XIV](${livroXiv})). **Ficha de palavra ≠ monografia de Folivora, ≠ sermão contra o descanso, ≠ receita.** Sem afiliação eclesiástica nem zoológica. O [nap](${nap}) e o [colchão](${colchao}) já recusam «parar = preguiça»; esta ficha nomeia o vocábulo que eles recusavam.

**Gatilho:** *preguica* / *PREGUIÇA* / *bicho preguiça* → lema **preguiça**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **preguiça** |
| Classe | Substantivo feminino (também o animal; adj. *preguiçoso*) |
| Étimo (trabalho) | lat. *pigritia* «inércia, relutância» ← *piger* «lento, que não quer» — confiança: **alta** |
| Família verdadeira | *preguiçoso* · *preguiçosamente* · *emperezar* (eco) · esp. *pereza* · fr. *paresse* · it. *pigrizia* |
| Família projectada | **bicho-preguiça** (*Bradypus* / *Choloepus*) — o vício baptizou o mamífero |
| Tipo BudGanja | Palavra — estado × pecado × animal × anti-armadilha do descanso |
| Elo irmão | **[bode](${bode})** — animal que virou estado e figura de culpa |
| Elo descanso | [nap](${nap}) · [colchão](${colchao}) · [mama](${mama}) (fácil ≠ preguiça) |
| Elo seres | [animal](${animal}) · [selvagem](${selvagem}) · hub [Animais](${animais}) |
| Elo aula | [Eliana](${eliana}) · [Livro XIV](${livroXiv}) — chá de formiga «para tirar a preguiça» |
| Fonte | [Wikcionário · preguiça](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o nome latino da **relutância em agir** — e, no Brasil, também o mamífero que **pende da árvore**. No lab: separar **ecologia lenta** de **acusação moral**. O animal não peca; quem baptizou projectou o pecado no dorso.

## 2. Hipóteses e método

**H1:** *preguiça* herda *pigritia* — étimo **latino fechado**; o animal é **capítulo americano** (nome de vício colado num xenartro).  
**H2:** descanso de ofício ([nap](${nap}), [colchão](${colchao}), pausa que devolve o [gesto](${gesto})) **não** é esta palavra — a anti-armadilha já estava no lab; agora tem ficha.  
**H3:** o par **[preguiça](${self}) × [bode](${bode})** é de **método**: dois animais que o português transformou em **estado do corpo** e em **figura de vício**.  
**H4:** o chá de formiga tucandeira na [aula XIV](${livroXiv}) documenta a **magia simpática** («formiga trabalha → tira a preguiça») — literacia cultural, **não** posologia.

Passos:

1. Fixar forma + étimo (*piger* → *pigritia*).  
2. Tabela: estado / pecado / animal / gíria / folk.  
3. Corte com [bode](${bode}) e com o descanso já fichado.  
4. Limites + status.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Lat. *piger* | «Lento, relutante, que não se mexe» | Alta |
| Lat. *pigritia* | Substantivo do estado — via iberorromance → PT *preguiça* | Alta |
| Esp. *pereza* · fr. *paresse* | Cognatos da mesma *pigritia* (não do animal) | Alta |
| Ing. *sloth* | **Paralelo de baptismo** (pecado → animal), **não** cognato | Alta (história) |
| Onomatopeia / «pregar» | Ruído de orelha — *preguiça* não vem de *pregar* | Fraca |

**Veredicto etimológico:** origem **latina (*pigritia*)** como hipótese forte. O **bicho** entra depois, no léxico colonial/naturalista: a Europa viu o xenartro lento e colou-lhe o nome do pecado. Ing. *sloth* fez o mesmo percurso noutro idioma.

## 4. Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Estado quotidiano | «que preguiça!»; «estou com preguiça» | Relutância — inspecionar se é cansaço, medo ou recusa |
| Pecado capital | acédia / preguiça | Figura moral — [pecado](${WIKI_SIN}); **≠** laudo da [alma](${alma}) |
| Animal | bicho-preguiça; *Bradypus* / *Choloepus*; Folivora | Referente — hub [Animais](${animais}); mata [selvagem](${selvagem}) |
| Ecologia | metabolismo lento; pendura; folha | **Ofício da floresta** — não é vício |
| Folk / aula | chá de formiga tucandeira «para tirar a preguiça» | [Livro XIV](${livroXiv}) · [inseto](${inseto}) — magia simpática, sem receita |
| Anti-armadilha | [nap](${nap}) · [colchão](${colchao}) · fácil da [mama](${mama}) | Parar / dormir / o que está à mão **≠** esta palavra |
| Irmão lexical | **[bode](${bode})** | Outro animal → estado + figura de culpa |

## 5. Elo com [bode](${bode})

Dois vocábulos-animal que o português **moralizou** e a gíria BR **incorporou**. O laboratório põe-nos na mesma mesa para **não os fundir**.

| Eixo | **preguiça** | **[bode](${bode})** |
|------|----------------|---------------------|
| Referente vivo | Xenartro da mata (Folivora) | Macho caprino (*Capra*) — curral, sertão |
| Tempo do bicho | Pende; come devagar; poupa energia | Sobe; teima; fareja |
| Pecado projectado | Acédia — «não se mexe» | Luxúria / bode do imaginário cristão |
| Gíria BR | Não querer agir | Irritação — «estar de bode», «dar um bode» |
| Culpa | Acusam quem **não carrega** | [Bode expiatório](${bode}) **carrega** a culpa alheia |
| Falso amigo | Descanso = preguiça | Esp. *bode* (adega) = o caprino |
| Corte lab | Ecologia lenta ≠ pecado | Animal ≠ mau humor |

**H5:** o par não é analogia clínica nem bestiário de púlpito — é **mapa de projecções**. Cada bicho fica bicho; cada estado fica estado; a [verdade](${verdade}) corta a cola.

## 6. Expressões âncora

| Expressão | Sentido | Leitura de ofício |
|-----------|---------|-------------------|
| **que preguiça** | Relutância em começar | Nomear o peso — depois perguntar se é [nap](${nap}) em atraso |
| **bicho-preguiça** | O mamífero | Voltar à mata: Folivora ≠ sermão |
| **preguiçoso** | Quem «não se mexe» (juízo) | Juízo fácil; inspecionar cansaço, medo, recusa |
| **tirar a preguiça** | Folk (chá de formiga, XIV) | Documentar a magia simpática; **não** receitar |
| **fazer de preguiça** | Encolher o [gesto](${gesto}) | Distinto de pausa que **devolve** o gesto |

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[bode](${bode})** | Irmão: animal → estado → figura de culpa |
| [animal](${animal}) · [Animais](${animais}) · [selvagem](${selvagem}) | Ser vivo e mata |
| [nap](${nap}) · [colchão](${colchao}) | Descanso de ofício — o que esta palavra **não** é |
| [gesto](${gesto}) · [verdade](${verdade}) · [alma](${alma}) · [vida](${vidaPalavra}) | Onde se decide se parar é cuidado ou fuga |
| [inseto](${inseto}) · [Eliana](${eliana}) · [Livro XIV](${livroXiv}) · [UNIFESP](${unifesp}) | Formiga tucandeira — «tira a preguiça» |
| [Rasmussen](${rasmussen}) · [canal](${rasmussenCanal}) | Fauna em ecrã — respeito de arquivo, sem fundir com o vício |
| [Valeu !!!](${mantra}) | Ofício: o melhor possível **hoje** — também depois de parar, sem se acusar de preguiça |

### Como ler

1. Entrar pela **palavra** (esta ficha).  
2. Se vier pelo **animal**, não importar o pecado.  
3. Se vier pelo **«que preguiça»**, cruzar [nap](${nap}) / [colchão](${colchao}) antes de julgar.  
4. Se vier pelo **bode**, abrir a [ficha irmã](${bode}) — par de projecções, não sinónimo.  
5. Fechar com [Valeu !!!](${mantra}) — ofício ≠ autoacusação.  
6. Voltar ao [hub](${hubAll}).

## 8. Avaliação BudGanja

### Forças

- Documenta o étimo **latino** e o baptismo **americano** do animal.  
- Separa estado, pecado, xenartro e descanso de ofício.  
- Cruza **[bode](${bode})** sem fundir caprino e Folivora.  
- Ancora a aula XIV (formiga) como folk, não como chá do lab.

### Limites

- Não é guia de espécies (*Bradypus* ≠ *Choloepus* em detalhe).  
- Não é tratado de teologia da acédia.  
- Não inventaria todas as gírias regionais de «preguiça».

## Status

**Aprovado** — **preguiça** fichada: *pigritia*, animal da mata, anti-armadilha do descanso, elo com **[bode](${bode})**. [Valeu !!!](${mantra}) também **sem se acusar**.

[▶ Palavras](${hub}) · [▶ Bode](${bode}) · [▶ Nap](${nap}) · [▶ Animal](${animal}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **preguiça** — Lat. *pigritia* ← *piger* (“slow, reluctant”). Two objects the language glues and the lab cuts: the **state** (not wanting to move; capital sin of sloth/acedia) and the **animal** (sloth, Folivora). Field request: relate to **[bode](${bode})** (“billy goat”) — another [animal](${animal}) that Brazilian speech turned into a **mood** (“estar de bode”) and a **moral figure** (lust / scapegoat). Close: [Valeu !!!](${mantra}).

> Method note: [Wiktionary · preguiça](${WIKT}). Word sheet ≠ Folivora monograph, ≠ sermon against rest. [Nap](${nap}) and [colchão](${colchao}) already refuse “stopping = laziness.”

## Object

| Field | Value |
|-------|-------|
| Word | **preguiça** |
| Etymon | Lat. *pigritia* ← *piger* |
| Lab type | State × sin × animal × rest anti-trap |
| Sibling | **[bode](${bode})** — animal → mood → blame figure |
| Links | [animal](${animal}) · [nap](${nap}) · [selvagem](${selvagem}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

**Cut:** slow forest ecology ≠ moral failure. Rest that returns [gesto](${gesto}) ≠ this word. Goat and sloth are a **map of projections**, not synonyms.

## Status

**Approved** — Latin path documented; animal naming mapped; pair with [bode](${bode}); rest anti-trap explicit.

[▶ Words](${hub}) · [▶ Bode](${bode}) · [▶ Nap](${nap}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **preguiça** — lat. *pigritia* ← *piger* («lento, renuente»). Dos objetos que la lengua pega y el laboratorio corta: el **estado** (no querer moverse; pecado capital) y el **animal** (perezoso, Folivora). Pedido de campo: relacionar con **[bode](${bode})** (macho cabrío) — otro [animal](${animal}) que el habla BR volvió **humor** («estar de bode») y **figura moral** (lujuria / chivo expiatorio). Cierre: [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · preguiça](${WIKT}). Ficha ≠ monografía, ≠ sermón contra el descanso. [Nap](${nap}) y [colchão](${colchao}) ya niegan «parar = pereza».

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **preguiça** |
| Étimo | Lat. *pigritia* ← *piger* |
| Tipo lab | Estado × pecado × animal × anti-trampa del descanso |
| Hermano | **[bode](${bode})** — animal → humor → figura de culpa |
| Vínculos | [animal](${animal}) · [nap](${nap}) · [selvagem](${selvagem}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

**Corte:** ecología lenta ≠ fallo moral. Descanso que devuelve el [gesto](${gesto}) ≠ esta palabra. Cabra y perezoso son **mapa de proyecciones**, no sinónimos.

## Estado

**Aprobada** — vía latina documentada; bautismo del animal mapeado; par con [bode](${bode}); anti-trampa del descanso explícita.

[▶ Palabras](${hub}) · [▶ Bode](${bode}) · [▶ Nap](${nap}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildPreguicaPost() {
  const { body, contentEn, contentEs, wiki } = buildPreguicaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-preguica', 204);
  const post = makePalavra({
    title: 'Inspeção: Preguiça — o estado, o animal e o que não é descanso',
    titleEn: 'Inspection: Preguiça — the state, the animal, and what rest is not',
    titleEs: 'Inspección: Preguiça — el estado, el animal y lo que no es descanso',
    excerpt:
      'Palavras: preguiça (lat. pigritia) — relutância, pecado e bicho-preguiça; descanso ≠ vício; elo bode; Valeu !!!',
    excerptEn:
      'Words: preguiça (Lat. pigritia) — reluctance, sin and the sloth; rest ≠ vice; link bode; Valeu !!!',
    excerptEs:
      'Palabras: preguiça (lat. pigritia) — renuencia, pecado y perezoso; descanso ≠ vicio; vínculo bode; ¡Valeu !!!',
    slug: 'inspecao-palavra-preguica',
    date: '2026-08-22T06:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Preguiça · palavra',
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
  buildPreguicaPost,
  buildPreguicaBodies
};
