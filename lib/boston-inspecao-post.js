'use strict';

/**
 * Inspeção Palavras · Boston
 * Eixos: topónimo (Lincolnshire → Massachusetts) · St. Botolph / Botwulf + tūn
 * × cola de orelha com bosta · ≠ estrume ≠ insulto.
 * Pedido: cruza Boston com a palavra Bosta.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/boston-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Boston';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Boston';
const WIKI_LINCS = 'https://en.wikipedia.org/wiki/Boston,_Lincolnshire';
const WIKI_BOTOLPH = 'https://en.wikipedia.org/wiki/Botwulf_of_Thorney';
const WIKT = 'https://en.wiktionary.org/wiki/Boston';

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
  return `Boston.
Não é bosta.
É a vila de Botolph
que atravessou o Atlântico.

O -on que a piada apaga
é o tūn — a vila.
Sem a vila, a orelha
só ouve o estrume.

A cidade fica.
O trocadilho passa.
O étimo corta.

Valeu !!!
mapa no sítio,
sem colar o vocábulo no porto.`;
}

function poemEn() {
  return `Boston.
It is not bosta.
It is Botolph’s town
that crossed the Atlantic.

The -on the joke erases
is the tūn — the town.
Without the town, the ear
only hears the dung.

The city stays.
The pun passes.
The etymon cuts.

Valeu !!!
the map in its place,
without gluing the swear to the harbour.`;
}

function poemEs() {
  return `Boston.
No es bosta.
Es la villa de Botolph
que cruzó el Atlántico.

La -on que el chiste borra
es el tūn — la villa.
Sin la villa, el oído
solo oye el estiércol.

La ciudad queda.
El trocadilho pasa.
El étimo corta.

¡Valeu !!!
el mapa en su sitio,
sin pegar el vocablo al puerto.`;
}

function buildBostonBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-boston.html';
  const bosta = '/posts/post-inspecao-palavra-bosta.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const mexico = '/posts/post-inspecao-palavra-mexico.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const giria = '/posts/post-inspecao-palavra-giria.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[Boston](${self})** — o **topónimo**. Pedido de campo: *cruza Boston com a palavra Bosta*. Objecto = o **nome da cidade** (Massachusetts; a mãe inglesa em Lincolnshire). Par de ofício: **[bosta](${bosta})**.

[A orelha cola](${orelha}) *Boston* em *bosta*. O [étimo](${etimologia}) **corta**. A peça que a piada apaga — o *-on* / *-ton* — é precisamente o inglês antigo *tūn* («vila, recinto»). Sem a vila, a boca só ouve o vocábulo ibérico. O laboratório **devolve a vila**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Boston](${WIKI}), [EN](${WIKI_EN}), [Boston, Lincolnshire](${WIKI_LINCS}), [Botwulf](${WIKI_BOTOLPH}), [Wiktionary · Boston](${WIKT}). **Ficha ≠ guia turístico, ≠ história colonial completa, ≠ ficha de desporto, ≠ licença para insultar a cidade.** Método irmão: [México](${mexico}) (país ≠ golfo / golfe). Tom: [respeito](${respeito}) do mapa; [verdade](${verdade}) do nome. Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

**Gatilho:** *Boston* / *Bóston* / *bostoniano* / *Boston Tea Party* / *Boston Marathon* / *Boston Terrier* / cola *bosta*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Boston** (EN/PT — a cidade) |
| Classe | Topónimo — município |
| Mapa desta ficha | **Boston, Massachusetts** (EUA); a **mãe** é Boston, Lincolnshire (Inglaterra) |
| Gentílico EN | *Bostonian* → PT **bostoniano** / **bostoniana** |
| Étimo (trabalho) | Contracção de **St. Botolph's town** — OE *Botwulfes tūn* (recinto / vila de Botwulf) — confiança: **alta** no traçado geral; detalhe do santo: **média–alta** |
| Tipo BudGanja | Palavra — cidade × [trocadilho](${trocadilho}) de orelha com [bosta](${bosta}) |
| Não é | [bosta](${bosta}) · estrume · insulto · postal de Harvard · ranking de maratona |
| Elo mapa | [México](${mexico}) |
| Elo ofício | [etimologia](${etimologia}) · [relação](${relacao}) · [orelha cola](${orelha}) · [língua portuguesa](${lingua}) |
| Fonte | [Boston](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome da cidade**. A boca pediu o cruzamento para não deixar o vocábulo [bosta](${bosta}) sentar na cadeira do porto.

## 2. Hipóteses e método

**H1:** *Boston* nesta ficha = o **topónimo** (MA, e a vila-mãe em Lincolnshire) — alta.  
**H2:** o étimo trabalha como **St. Botolph's town** / *Botwulfes tūn* — alta no conjunto; o santo é abade inglês do séc. VII, não um étimo de *bosta* — alta.  
**H3:** [bosta](${bosta}) (estrume / gíria ibérica) é **outra palavra**, outro mapa — alta.  
**H4:** a cola BR (*Boston* ≈ *bosta* + nasal) é [trocadilho](${trocadilho}) / paronomásia, **não** parentesco — alta.  
**H5:** o *-ton* / *-on* que a piada corta é o *tūn* («vila»). Apagar a vila é o truque da orelha; o lab **repor** a vila — alta (leitura de ofício).  
**H6:** Boston Tea Party, maratona, Celtics, terrier são **salas vizinhas**, não o étimo — alta.  
**H7:** fecho = [Valeu !!!](${mantra}).

## 3. Duas vilas, um nome

| Sala | O que é | Papel nesta ficha |
|------|---------|-------------------|
| **Boston, Lincolnshire** | Porto e mercado no leste de Inglaterra; St. Botolph's Church («Boston Stump») | A **mãe** do nome |
| **Boston, Massachusetts** | Cidade fundada em 1630 por colonos da Massachusetts Bay; muitos vinham da Lincolnshire | O **mapa** que o português BR mais aponta |
| **Outros Bostons** | Topónimos homónimos (EUA e Commonwealth) | Mesmo lema; **não** alargar o atlas nesta página |

**H-mãe:** a cidade americana **herda o nome** da inglesa. Não herda o vocábulo [bosta](${bosta}).

## 4. Étimo — Botolph + tūn

| Peça | Leitura de trabalho | Confiança |
|------|---------------------|-----------|
| **Botwulf / Botolph** | Santo inglês (séc. VII); abade; a igreja da vila-mãe leva o nome | Alta no padroeiro da vila; média se alguém quiser biografia completa aqui |
| **tūn** | Inglês antigo — recinto, quinta, **vila** (o *-ton* de *Boston*, *Washington*, *Charleston*) | Alta |
| **Boston** | Contracção falada de *Botolph's town* → *Boston* | Alta como tradição onomástica |
| **Folk «Botolph's stone»** | Pedra do santo | Hipótese / lenda de nome — **não** fecha contra *tūn* |

**H-tūn:** no [trocadilho](${trocadilho}) BR, a boca come o *-on* e fica com *bosta*. Esse *-on* é a **vila**. A piada só funciona se se **apagar o povoado**. O ofício desta ficha é recusar o apagamento.

Cognatos de ofício (não de sangue com *bosta*): EN *town* ← o mesmo *tūn*. PT **vila** / **cidade** são outro étimo; o cruzamento é de **mapa**, não de raiz.

## 5. O que a orelha cola — e o étimo corta

Pedido de campo: cruzar com **[bosta](${bosta})**. Método: [a orelha cola](${orelha}); o [étimo](${etimologia}) corta. Irmão de método: [México](${mexico}) (país ≠ golfo).

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Boston** ≈ **bosta** | A cidade «é» o vocábulo | Homofonia aproximada BR (*Bóston* / *bosta*); **não** o mesmo étimo |
| **Boston** = *bosta* + *n* | Aglutinou um *n* no insulto | O *n*/*on* é o *tūn* (vila), não um sufixo de [gíria](${giria}) |
| **«chá de bosta»** | Tea Party virado piada | 1773 é **política colonial** (chá no porto); [bosta](${bosta}) não entra no étimo |
| **Boston Terrier** | O cão «é» o vocábulo | Raça [animal](${animal}) com nome da cidade — outro andar |
| **Maratona / Celtics** | O nome da cidade *é* o desporto | Marca cultural; **≠** étimo |

**Veredicto contraste:** parece um só vocábulo sujo; são **dois mapas**. A [relação](${relacao}) é de orelha, não de avô latino.

## 6. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Boston vem de bosta» | **Não.** Boston < *Botolph's town*. [Bosta](${bosta}) < via ibérica (esp. *bosta*), origem **incerta** e **outra** |
| «É a mesma palavra com um n» | O *n* não é enfeite. É o resto de *tūn* |
| «Cruzar é fundir» | Cruzar é **etiquetar o entre**. Fundir é o erro que esta ficha recusa |
| «A ficha insulta a cidade» | A ficha **inspecciona o trocadilho** e **devolve o topónimo**. Sem púlpito e sem chacota de mapa |
| «Ficha = guia de Boston» | **Não.** Sem itinerário, sem ranking, sem Harvard como diploma |

**Veredicto correção:** **Boston = cidade (vila de Botolph).** Se a boca disse *bosta* no mesmo sopro, abrir esta ficha **e** [bosta](${bosta}).

## 7. Salas vizinhas (não misturar)

| Sala | O que fazer |
|------|-------------|
| **Tea Party (1773)** | Nomear o facto histórico se a boca trouxe *chá*; **não** virar «chá de bosta» |
| **Maratona** | Prova de rua com o nome da cidade; 2013 é notícia, **não** étimo |
| **Boston Terrier** | [Animal](${animal}) — raça com topónimo; ≠ vocábulo [bosta](${bosta}) |
| **Universidades / desporto** | Cultura da cidade; **fora** do objecto lexical desta página |
| **Outros Bostons** | Homónimos; não inventariar o mundo |

## 8. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Cidade** | «fui a Boston» | Bom: mapa · Mau: achar que pediu o vocábulo |
| **Gentílico** | bostoniano / bostoniana | Bom: pessoa / cultura · Mau: estereótipo de postal |
| **Trocadilho** | «Boston / bosta» | Bom: nomear a cola e **cortar** · Mau: usar a cidade como insulto |
| **Marca** | Boston Celtics, Boston Tea Party | Bom: etiqueta cultural · Mau: fundir com [bosta](${bosta}) |

## 9. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[Bosta](${bosta})** | Par pedido — estrume / gíria; **não** o topónimo |
| [Trocadilho](${trocadilho}) · [etimologia](${etimologia}) · [orelha cola](${orelha}) | Mecanismo da cola × corte |
| [México](${mexico}) | Irmã de ficha-lugar (orelha ≠ mapa) |
| [Gíria](${giria}) · [animal](${animal}) | Andar da fala; andar do terrier |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hub}) | Solo |
| [Respeito](${respeito}) · [verdade](${verdade}) · [relação](${relacao}) · [caminho](${caminho}) | Ofício |
| [Valeu !!!](${mantra}) · [eu amo a vida](${amo}) · [Vida](${vidaHub}) | Fecho |

## 10. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=boston)

## Limites

- Não é guia de viagem, vistos, universidades ou desporto.  
- Não fecha a biografia de Botwulf nem o arquivo colonial de 1630.  
- Não é licença para insultar gente, cidade ou mapa.  
- O [trocadilho](${trocadilho}) inspecciona-se; não se promove como étimo.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **Boston** fichada como **cidade** (St. Botolph's town / *tūn*); cola com [bosta](${bosta}) recusada como étimo e enviada ao [trocadilho](${trocadilho}); o *-on* devolvido à vila. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Bosta](${bosta}) · [▶ Trocadilho](${trocadilho}) · [▶ México](${mexico}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **[Boston](${self})** — the **place-name**. Field request: *cross Boston with the word Bosta*. Object = the **city name** (Massachusetts; mother town in Lincolnshire). Pair: **[bosta](${bosta})**.

[The ear glues](${orelha}) *Boston* to Portuguese *bosta* (dung / slang). The [etymon](${etimologia}) **cuts**. The piece the joke deletes — *-on* / *-ton* — is Old English *tūn* (“enclosure, town”). Without the town, the mouth only hears the Iberian word. The lab **puts the town back**.

> Independent audit. Sources: [Boston](${WIKI_EN}), [Lincolnshire](${WIKI_LINCS}), [Botwulf](${WIKI_BOTOLPH}), [Wiktionary](${WIKT}). **Sheet ≠ guidebook, ≠ sports ranking, ≠ licence to insult the city.** Sister method: [México](${mexico}) (country ≠ gulf / golf). Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Anchor | **Boston** — city; mother: Boston, Lincolnshire |
| Etymon | St. **Botolph's town** ← OE *Botwulfes tūn* — **high** confidence on the path |
| Not | [bosta](${bosta}) · manure · slur · Harvard brochure |
| Date | ${inspected} |

**H-tūn:** the BR pun eats the *-on* and leaves *bosta*. That *-on* **is** the town. The joke works only if the settlement is erased.

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** city ≠ dung-word. Cross = label the gap; do not fuse. [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Bosta](${bosta}) · [▶ Pun](${trocadilho}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[Boston](${self})** — el **topónimo**. Pedido: *cruza Boston con la palabra Bosta*. Objeto = el **nombre de la ciudad** (Massachusetts; villa madre en Lincolnshire). Par: **[bosta](${bosta})**.

[El oído pega](${orelha}) *Boston* a *bosta*. El [étimo](${etimologia}) **corta**. La pieza que el chiste borra — *-on* / *-ton* — es el inglés antiguo *tūn* («recinto, villa»). Sin la villa, la boca solo oye el vocablo ibérico. El laboratorio **devuelve la villa**.

> Auditoría independiente. Fuentes: [Boston](${WIKI_EN}), [Lincolnshire](${WIKI_LINCS}), [Botwulf](${WIKI_BOTOLPH}). **Ficha ≠ guía, ≠ ranking deportivo, ≠ licencia para insultar la ciudad.** Método hermano: [México](${mexico}). Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **Boston** — ciudad; madre: Boston, Lincolnshire |
| Étimo | St. **Botolph's town** ← OE *Botwulfes tūn* — confianza **alta** en el trazado |
| No es | [bosta](${bosta}) · estiércol · insulto |
| Fecha | ${inspected} |

**H-tūn:** el trocadilho BR se come la *-on* y deja *bosta*. Esa *-on* **es** la villa.

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** ciudad ≠ vocablo del estiércol. Cruzar = etiquetar el entre; no fundir. [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Bosta](${bosta}) · [▶ Trocadilho](${trocadilho}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildBostonPost() {
  const { body, contentEn, contentEs } = buildBostonBodies();
  const seriesOrder = pickOrder('inspecao-palavra-boston', 294);
  const post = makePalavra({
    title: 'Inspeção: Boston — a vila de Botolph; ≠ bosta',
    titleEn: 'Inspection: Boston — Botolph’s town; ≠ bosta',
    titleEs: 'Inspección: Boston — la villa de Botolph; ≠ bosta',
    excerpt:
      'Palavras: Boston = St. Botolph’s town (tūn); cola de orelha com bosta recusada como étimo; o -on é a vila; Valeu !!!',
    excerptEn:
      'Words: Boston = St. Botolph’s town (tūn); ear-glue to bosta refused as etymon; the -on is the town; Valeu !!!',
    excerptEs:
      'Palabras: Boston = St. Botolph’s town (tūn); cola de oído con bosta rechazada como étimo; la -on es la villa; ¡Valeu !!!',
    slug: 'inspecao-palavra-boston',
    date: '2026-08-24T12:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Boston · cidade · tūn',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = WIKI;
  post.content_raw = post.content_raw || body;
  post.excerpt = post.excerpt;
  post.seriesOrder = post.seriesOrder;
  post.seriesLabel = post.seriesLabel;
  return post;
}

module.exports = {
  buildBostonPost,
  buildBostonBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKI,
  WIKT
};
