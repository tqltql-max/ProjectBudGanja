'use strict';

/**
 * Artes · desenho Asterix e Obelix (Goscinny / Uderzo).
 * Pedido: asterix e obelix desenho.
 * ≠ carácter * ≠ obelisco de pedra ≠ biografia dos autores.
 */

const fs = require('fs');
const path = require('path');

function artePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'artes-cultura',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Artes',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

const WIKI = 'https://pt.wikipedia.org/wiki/Asterix';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Asterix';
const WIKI_OB = 'https://pt.wikipedia.org/wiki/Obelix';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'artes-cultura')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Asterix.
Obelix.
Não pedimos a poção emprestada —
pedimos o ofício de ser aldeia
quando o mapa inteiro se chama Império.

Goscinny. Uderzo. 1959.
Houve um nome colado à estrela de tinta
e outro colado à pedra de milliaire.
Houve um pequeno que pensa
e um grande que carrega o menir
como quem carrega o chão.

O asterisco fica na linha.
O gaulês fica no desenho.
A orelha cola.
O laboratório corta.

Valeu !!!
uma aldeia,
sem beber o frasco no relatório.`;
}

function poemEn() {
  return `Asterix.
Obelix.
We do not borrow the potion —
we ask for the craft of being a village
when the whole map is called Empire.

Goscinny. Uderzo. 1959.
There was a name glued to the ink star
and another glued to the milestone stone.
There was a small one who thinks
and a large one who carries the menhir
as one carries the ground.

The asterisk stays on the line.
The Gaul stays in the drawing.
The ear glues.
The lab cuts.

Valeu !!!
a village,
without drinking the flask in the report.`;
}

function poemEs() {
  return `Asterix.
Obelix.
No pedimos prestada la poción —
pedimos el oficio de ser aldea
cuando el mapa entero se llama Imperio.

Goscinny. Uderzo. 1959.
Hubo un nombre pegado a la estrella de tinta
y otro pegado a la piedra miliaria.
Hubo un pequeño que piensa
y un grande que carga el menhir
como quien carga el suelo.

El asterisco queda en la línea.
El galo queda en el dibujo.
El oído pega.
El laboratorio corta.

¡Valeu !!!
una aldea,
sin beber el frasco en el informe.`;
}

function buildAsterixObelixBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const self = '/posts/post-inspecao-desenho-asterix-e-obelix.html';
  const ast = '/posts/post-inspecao-palavra-asterisco.html';
  const oito = '/posts/post-inspecao-palavra-oito.html';
  const elo = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const elza = '/posts/post-inspecao-desenho-elza-frozen.html';
  const mega = '/posts/post-inspecao-desenho-megamente.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial do **desenho** **[Asterix e Obelix](${self})** — a dupla da banda desenhada de **René Goscinny** (argumento) e **Albert Uderzo** (desenho), a partir de **1959** (*Pilote*). Pedido de campo junto do carácter **[\\*](${ast})**. [A orelha cola](${orelha}) o glifo ao gaulês. O ofício **corta**: esta ficha é a **aldeia e os dois corpos**; o **\\*** fica em [asterisco](${ast}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Asterix](${WIKI}), [EN](${WIKI_EN}), [Obelix](${WIKI_OB}). **Ficha ≠ álbum completo, ≠ receita de poção, ≠ biografia dos autores, ≠ guia de filmes.** Sem diálogo colado. Sem afiliação a Hachette / Les Éditions Albert René. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *Asterix e Obelix* / *desenho asterix* / *obelix* / ouvido *asterisco*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Asterix** (série BD; no BR também *Astérix*) |
| Dupla | **Asterix** (o pequeno) · **Obelix** (o menir) |
| Autores | Goscinny · Uderzo (depois Uderzo só; depois outros ofícios — **não** esta ficha) |
| Estreia | 29 out. **1959** |
| Tipo BudGanja | Artes · **desenho** (linha + aldeia) |
| Elo de nome | Asterix ← [asterisco](${ast}) · Obelix ← obelisco / obelo † |
| Não é | o glifo **\\*** · um menir arqueológico · Império como aula de história |
| Data | ${inspected} |

**O que é o objecto:** dois **papéis desenhados** numa aldeia que resiste ao mapa grande. O laboratório inspeciona o **par** e o **ofício do nome** — não o cânone álbum a álbum.

## 2. Salas (cortar)

| Sala | O que é | Esta ficha? |
|------|---------|-------------|
| **Asterix** | Guerreiro pequeno; astúcia | **Sim** — um corpo do par |
| **Obelix** | Entregador de menires; força | **Sim** — o outro corpo |
| **\\* asterisco** | Glifo | **Não** — [asterisco](${ast}) |
| **Obelisco / obelo †** | Pedra · marca textual | Étimo do **nome**; não o homem |
| **Poção** | Motivo da série | Metáfora de força — **não** receita |
| **Roma** | Império no palco | Cenário; **não** tratado histórico |
| **Filmes / séries** | Adaptações | Ecos; o núcleo é a **BD** |
| **[Elza](${elza}) · [Megamente](${mega})** | Outros desenhos | Irmãos de prateleira, outro recorte |

**H1:** os nomes **brincam** com marcas de página (estrela / obelo). Isso é [gesto](${gesto}) de argumento, não identidade do glifo.  
**H2:** Asterix **não** é o carácter **\\***. Obelix **não** é um obelisco.  
**H3:** a aldeia é o ofício: **ficar** quando o Império mede o mapa.  
**H4:** poção = força de palco. O lab **não** bebe o frasco.

## 3. O par (sem fundir)

| Peça | Ofício no desenho | Corte |
|------|-------------------|-------|
| **Asterix** | Pensa, finta, leva o [caminho](${caminho}) curto | ≠ [asterisco](${ast}) |
| **Obelix** | Carrega a pedra, come, é o chão do par | ≠ monumento |
| **Juntos** | Dupla — um não esgota a ficha | Não virar «só o pequeno» nem «só o forte» |

O [respeito](${respeito}) aqui é não reduzir Obelix a palhaço nem Asterix a mascote. São **dois ofícios** no mesmo vinco.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Asterix** | O carácter \\* | Personagem nomeado **a partir** da estrela |
| **Obelix** | Um obelisco a andar | Personagem nomeado **a partir** da pedra / obelo |
| **Poção** | Manual | Motivo de BD |
| **História romana** | Documentário | Palco humorístico |

## 5. Rede BudGanja

| Ficha | Relação |
|-------|---------|
| [Asterisco](${ast}) | O **\\*** — a estrela de tinta; orelha cola |
| [Oito](${oito}) · [elo de ligação](${elo}) | Tecla e ∞ — **não** a aldeia |
| [Elza](${elza}) · [Megamente](${mega}) | Outros desenhos do hub Artes |
| [Gesto](${gesto}) · [caminho](${caminho}) · [respeito](${respeito}) | Ofício do par |
| [Língua portuguesa](${lingua}) | Fala BR *Asterix* / *Astérix* |
| [Vida](${vida}) | Poema do laboratório |
| [Valeu !!!](${mantra}) | Fechar sem poção no laudo |

## 6. Poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na Vida](${vida}#poema=asterix-e-obelix)

## Limites

- Não resume cada álbum nem cada filme.  
- Não reproduz vinhetas nem falas.  
- Não é aula de latim imperial nem de arqueologia do menir.

## Status

**Aprovado** — desenho **Asterix e Obelix** fichado como **par da BD** (1959); nomes cortados do [asterisco](${ast}) e do obelisco; sem poção de relatório. Fecho [Valeu !!!](${mantra}).

[▶ Artes](${hub}) · [▶ Asterisco](${ast}) · [▶ Elza](${elza}) · [▶ Megamente](${mega}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the **cartoon / bande dessinée** **Asterix and Obelix** (Goscinny & Uderzo, 1959). Field request beside the **[\\*](${ast})** character. The ear glues glyph to Gaul. Craft **cuts**. This sheet = the **village and the pair**. The glyph: [asterisk](${ast}).

> Independent audit. **Not** a potion recipe, **not** a full album index. Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Pair | **Asterix** (small) · **Obelix** (menhir) |
| Names | Asterix ← asterisk · Obelix ← obelisk / obelus |
| Cut | [\\*](${ast}) is not the warrior |
| Date | ${inspected} |

## Verdict

**Approved** — BD pair; names play with page-marks; potion stays on stage.

[▶ Arts](${hub}) · [▶ Asterisk](${ast}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del **dibujo / BD** **Asterix y Obelix** (Goscinny y Uderzo, 1959). Pedido junto al carácter **[\\*](${ast})**. El oído pega el glifo al galo. El oficio **corta**. Esta ficha = la **aldea y la pareja**. El glifo: [asterisco](${ast}).

> Auditoría independiente. **No** receta de poción ni índice de álbumes. Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Pareja | **Asterix** (pequeño) · **Obelix** (menhir) |
| Nombres | Asterix ← asterisco · Obelix ← obelisco / obelo |
| Corte | el [\\*](${ast}) no es el guerrero |
| Fecha | ${inspected} |

## Veredicto

**Aprobado** — pareja de BD; los nombres juegan con marcas de página; la poción se queda en el escenario.

[▶ Artes](${hub}) · [▶ Asterisco](${ast}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, poemPt: poemPt(), poemEn: poemEn(), poemEs: poemEs() };
}

function buildAsterixObelixPost() {
  const { body, contentEn, contentEs } = buildAsterixObelixBodies();
  const seriesOrder = pickOrder('inspecao-desenho-asterix-e-obelix', 12);
  return artePost({
    title: 'Inspeção: Asterix e Obelix — o desenho da aldeia, não o carácter *',
    titleEn: 'Inspection: Asterix and Obelix — the village cartoon, not the * character',
    titleEs: 'Inspección: Asterix y Obelix — el dibujo de la aldea, no el carácter *',
    excerpt:
      'Artes · desenho: Asterix e Obelix (Goscinny / Uderzo, 1959) — par da aldeia; nomes colados a asterisco e obelisco; ≠ glifo *; Valeu !!!',
    excerptEn:
      'Arts · cartoon: Asterix and Obelix (Goscinny / Uderzo, 1959) — village pair; names glued to asterisk and obelisk; ≠ glyph *; Valeu !!!',
    excerptEs:
      'Artes · dibujo: Asterix y Obelix (Goscinny / Uderzo, 1959) — pareja de aldea; nombres pegados a asterisco y obelisco; ≠ glifo *; ¡Valeu !!!',
    slug: 'inspecao-desenho-asterix-e-obelix',
    date: '2026-08-24T01:55:00.000Z',
    seriesOrder,
    seriesLabel: 'Asterix e Obelix · Artes',
    coverImage: '/imagens/inspecoes/asterix-obelix-cover.jpg',
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAsterixObelixPost,
  buildAsterixObelixBodies,
  poemPt,
  poemEn,
  poemEs,
  WIKI,
  WIKI_EN
};
