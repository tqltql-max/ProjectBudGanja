'use strict';

/**
 * Inspeção Palavras · letra X
 * 24.ª letra do alfabeto latino; nome PT xis.
 * Pedido: inspeção em X · o x de conexão · ≠ só a rede social.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/letra-x-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/X';
const WIKI = 'https://pt.wikipedia.org/wiki/X';
const WIKT_XIS = 'https://pt.wiktionary.org/wiki/xis';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 360) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `X não é só o site.
X não é só o beijo.
X não é o chili no mapa.

É o xis.
Vinte e quatro.
Em conexão traz o nexo;
em xícara, o chiado;
em exame, o zê do começo.

A incógnita pede nome.
O xis já tem:
letra.

Valeu !!!
cruz no sítio,
sem colar a marca no glifo.`;
}

function poemEn() {
  return `X is not only the site.
X is not only the kiss.
X is not chili on the map.

It is xis.
Twenty-fourth.
In conexão it brings the nexus;
in xícara, the hush;
in exame, the opening z.

The unknown asks for a name.
Xis already has one:
letter.

Valeu !!!
a cross in place,
without gluing the brand to the glyph.`;
}

function poemEs() {
  return `X no es solo el sitio.
X no es solo el beso.
X no es el chile en el mapa.

Es el xis.
Veinticuatro.
En conexão trae el nexo;
en xícara, el siseo;
en exame, la z del arranque.

La incógnita pide nombre.
El xis ya tiene:
letra.

¡Valeu !!!
cruz en su sitio,
sin pegar la marca al glifo.`;
}

function buildLetraXBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-letra-x.html';
  const letraL = '/posts/post-inspecao-palavra-letra-l.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const mexico = '/posts/post-inspecao-palavra-mexico.html';
  const xiaomi = '/posts/post-inspecao-palavra-xiaomi.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const login = '/posts/post-inspecao-palavra-login.html';
  const zero = '/posts/post-inspecao-palavra-zero.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da **[letra X](${self})** — 24.ª letra do alfabeto latino usado no [português](${lingua}). Nome em PT: **xis**. Pedido de campo: *inspeção em X*, no rasto de [conexão](${conexao}) (o **x** do nexo) e depois da [letra L](${letraL}). Objecto: o **glifo** e os **ofícios** do xis — não a marca da rede, não o condimento, não o telemóvel.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · X](${WIKT}), [xis](${WIKT_XIS}), [Wikipédia · X](${WIKI}). **Ficha ≠ tutorial da app, ≠ raio-X clínico, ≠ álgebra escolar completa.** Sem afiliação a plataformas. Tom: uma cruz; as salas ao lado.

**Gatilho:** *inspeção em X* / *xis* / o **x** de *conexão* / o X da barra.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Letra | **X** · **x** |
| Nome PT | **xis** |
| Ordem | 24.ª no alfabeto latino |
| Romano | **X = 10** — número, não a letra a fingir de conta |
| Tipo BudGanja | Palavra-letra — glifo × fonemas × cortes de orelha |
| Irmã de método | [letra L](${letraL}) (haste) · [zero](${zero}) (glifo **0** ≠ **O**) |
| O que **não** é (âncora) | A rede social rebatizada · [Xiaomi](${xiaomi}) · chili / chile (pimenta; ver [México](${mexico})) · classificação etária |
| Fonte | [X](${WIKT}) · [WP](${WIKI}) |
| Data | ${inspected} |

**Objecto:** o **xis**. Quem cola X só na app, só no beijo ou só na pimenta está a ler **uma** sala.

## 2. Salas — o xis corta; a orelha cola

[A orelha cola](${orelhaCola}). O étimo e o ofício **cortam**.

| Sala | O que é | Corte |
|------|---------|-------|
| **Letra** | 24.ª; nome **xis** | Esta ficha |
| **[conexão](${conexao})** | O **x** vem de lat. *connexio* / *nexus* — nexo, não ç de *ação* | Grafia do cano; não é a letra sozinha |
| **Som PT** | Vários ofícios na mesma peça (ver §3) | Uma letra, **vários** sons — não é defeito, é mapa |
| **Romano X** | Dez | Número; irmão do [zero](${zero}) na conta, não no glifo |
| **Incógnita** | *x* da equação — o que ainda não tem nome | Álgebra; o xis **já** tem nome (letra) |
| **Vezes** | × (produto) vs letra **x** | Sinais vizinhos; ofícios distintos |
| **México** | O **x** do náuatle *Mēxihco* | Ficha [México](${mexico}) — país, não o glifo vazio |
| **Xiaomi** | Marca que **começa** por X; étimo 小米 | Ficha [Xiaomi](${xiaomi}) — milheto, não o alfabeto |
| **Rede «X»** | Nome comercial (ex-Twitter, 2023) | **Sala de marca** — não substitui o xis |
| **Raio-X** | Radiação que Röntgen chamou *X* (incógnita) | Física / clínica — outra ficha se o campo pedir |
| **Χ (qui grego)** | Letra grega; rasto em *Xmas* (Christ) | Alfabeto **outro**; não baptizar o latim com o grego sem etiqueta |
| **Beijo / rubrica** | *x* no fim da carta; **X** de quem não assina o nome | Gesto; não é o alfabeto inteiro |
| **[Grok](${grok}) / [Log In](${login})** | Porta e verbo de plataforma | Elos de ecrã; o xis **não** é a senha |

**H1:** X = letra / nome **xis** (alta).  
**H2:** em PT o xis **não** tem um som só (alta).  
**H3:** o x de [conexão](${conexao}) é **nexo** (latim), não o ç de *ação* (alta).  
**H4:** a app X é **homógrafo de marca** — sala ao lado (alta).  
**H5:** *x* da equação é o **sem nome**; o xis da escola **já** se chama xis (alta).  
**H6:** fecho = [Valeu !!!](${mantra}).

## 3. O xis no português — uma letra, vários ofícios

| Grafia | Som de trabalho | Exemplo |
|--------|-----------------|---------|
| **x** | /ʃ/ (como *ch*) | *xícara*, *xadrez*, *mexer*, *baixo*, *caixa* |
| **x** | /ks/ | *táxi*, *nexo*, **conexão**, *complexo*, *tóxico* |
| **x** | /s/ | *máximo*, *próximo*, *experiência* (muitas falas) |
| **x** | /z/ | *exame*, *exemplo*, *existência* (em início / entre vogais, fala BR) |

**H-orelha:** a boca ouve *conexão* com **cs/ks** e ainda assim escreve *conecção* (ç). O xis aqui é **peça de nexo**, não de chiado. Ver [conexão](${conexao}).

**H-México:** o **x** de [México](${mexico}) não é o chili nem o golfe; é o rasto náuatle no mapa. O xis é o mesmo glifo; o país é outra âncora.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Barra** | X = a rede | Homógrafo comercial; o alfabeto é mais velho |
| **Carta** | x = beijo | Um **uso** do glifo; não esgota o xis |
| **Conta** | x = vezes | O times é **×** (ou ·); a letra empresta o desenho |
| **Incógnita** | x = mistério | Mistério **etiquetado**; a letra já tem nome |
| **Chili / chile** | Homógrafo da pimenta náuatle | Condimento ≠ letra; mapa em [México](${mexico}) |
| **Classificação «X»** | O glifo *é* o recinto | Selo de sala; **não** é o objecto desta ficha |

**Veredicto contraste:** parece um ícone só; são **salas**. O ofício é [etiquetar o entre](${orelhaCola}).

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «X é o Twitter» | X **também** é marca; **primeiro** é letra |
| «conexão leva ç» | Leva **x** (*nexus*). Sala: [conexão](${conexao}) |
| «x da matemática não tem nome» | Tem: **xis** / *x*. A incógnita é o **valor**, não o glifo |
| «Xiaomi explica o X» | [Xiaomi](${xiaomi}) explica **pequeno milheto**; o xis explica a 24.ª |

## 6. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Letra L](${letraL}) | Irmã de método — glifo ≠ pessoa ≠ slogan |
| [conexão](${conexao}) | O x do nexo; o pedido veio neste rasto |
| [México](${mexico}) | O **x** náuatle no nome do país; chili = outra sala |
| [Xiaomi](${xiaomi}) · [Grok](${grok}) · [Log In](${login}) | Marca, verbo, porta — **não** o alfabeto |
| [zero](${zero}) | Outro glifo que a orelha cola (0 / O) |
| [língua portuguesa](${lingua}) · [verdade](${verdade}) | Som, grafia, corte |
| [Valeu !!!](${mantra}) | Fecho |

\`\`\`poem
${poemPt()}
\`\`\`

## Limites

- Não é aula completa de fonética nem de álgebra.  
- Não é review da plataforma X.  
- Não é laudo de raio-X.  
- Não fala pela letra grega Χ sem etiqueta.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **X** fichado como **xis** (24.ª); salas cortadas (conexão, som PT, romano 10, incógnita, marca); fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Letra L](${letraL}) · [▶ conexão](${conexao}) · [▶ México](${mexico}) · [▶ Xiaomi](${xiaomi}) · [▶ Valeu !!!](${mantra}) · [X](${WIKI})
`;

  const contentEn = `## Scope

Inspection of the **[letter X](${self})** — 24th in the Latin alphabet; Portuguese name **xis**. Field: *inspeção em X*, after [conexão](${conexao}) (the **x** of *nexus*). Sister method: [letter L](${letraL}).

Not the social app. Not [Xiaomi](${xiaomi}). Not chili. One glyph, several rooms (PT sounds /ʃ ks s z/; Roman 10; algebraic unknown; brand homograph).

\`\`\`poem
${poemEn()}
\`\`\`

**Approved.** [Valeu !!!](${mantra})

[▶ Words](${hub}) · [▶ conexão](${conexao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la **[letra X](${self})** — 24.ª del alfabeto latino; nombre PT **xis**. Pedido: *inspeção em X*, tras [conexão](${conexao}) (la **x** de *nexus*). Método hermano: [letra L](${letraL}).

No es la app. No es [Xiaomi](${xiaomi}). No es el chile. Un glifo, varias salas.

\`\`\`poem
${poemEs()}
\`\`\`

**Aprobado.** [¡Valeu !!!](${mantra})

[▶ Palabras](${hub}) · [▶ conexão](${conexao}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildLetraXPost() {
  const { body, contentEn, contentEs, wiki } = buildLetraXBodies();
  return makePalavra({
    title: 'Inspeção: Letra X — o xis, o nexo, as salas',
    titleEn: 'Inspection: Letter X — xis, nexus, the rooms',
    titleEs: 'Inspección: Letra X — el xis, el nexo, las salas',
    excerpt:
      'Palavras: letra X / xis — 24.ª; som PT vários; x de conexão = nexo; ≠ app ≠ Xiaomi; Valeu !!!',
    excerptEn:
      'Words: letter X / xis — 24th; several PT sounds; x in conexão = nexus; ≠ app ≠ Xiaomi; Valeu !!!',
    excerptEs:
      'Palabras: letra X / xis — 24.ª; varios sonidos PT; x de conexão = nexo; ≠ app ≠ Xiaomi; ¡Valeu !!!',
    slug: 'inspecao-palavra-letra-x',
    date: '2026-08-23T18:40:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-letra-x', 282),
    seriesLabel: 'Letra X · xis',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildLetraXPost, buildLetraXBodies, poemPt, poemEn, poemEs };
