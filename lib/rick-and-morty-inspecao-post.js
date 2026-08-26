'use strict';

/**
 * Artes · desenho «Rick and Morty» (Adult Swim, 2013).
 * Channel 101 → Harmon / Roiland → portal e multiverso.
 * Tese BudGanja: infinitas linhas não cancelam o ofício nesta —
 * faça o melhor. Elos: BTTF · Matrix · Alice · teoria das cordas ·
 * loop · Valeu !!!
 */

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

const fs = require('fs');
const path = require('path');

const YT_ID = 'BFTSrbB2wII';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://pt.wikipedia.org/wiki/Rick_and_Morty';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Rick_and_Morty';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemRickAndMortyPt() {
  return `Rick and Morty.
Não pedimos o portal emprestado —
pedimos o ofício de ficar
quando há mil portas
e só uma planta nesta mão.

Harmon. Roiland. Adult Swim.
Houve um festival de curtas
onde Doc e Marty nasciam tortos —
e um desenho que levou o par
a um suburbio e a um número sem fim
de linhas que não se tocam.
Houve um portal verde,
um neto que treme,
um avô que finge que nada importa.
Houve a tentação de chamar destino
ao que é só mais uma dimensão.

O laboratório conhece esse número.
Infinito que parece alívio
e vira fuga.
Teoria que vibra no quadro
e não rega o vaso.
Loop que troca de universo
em vez de pôr condição de paragem.

Ainda assim: esta linha.
Este dia.
Esta gota.
Faça o melhor.
Não o perfeito de outro Rick.
O possível honesto aqui.

Valeu !!!

Porque toda vez que alguém
não troca de universo
quando o ofício aperta,
o universo — este —
cresce um pouco:
um verso a mais,
um dossel a mais,
uma rua onde o portal
não apaga a planta.`;
}

function poemRickAndMortyEn() {
  return `Rick and Morty.
We do not borrow the portal —
we ask for the craft of staying
when there are a thousand doors
and only one plant in this hand.

Harmon. Roiland. Adult Swim.
There was a short-film festival
where Doc and Marty were born crooked —
and a cartoon that took the pair
to a suburb and to a number without end
of lines that do not touch.
There was a green portal,
a grandson who shakes,
a grandfather who pretends nothing matters.
There was the temptation to call destiny
what is only one more dimension.

The laboratory knows that number.
Infinity that looks like relief
and turns into flight.
Theory that vibrates on the blackboard
and does not water the pot.
A loop that swaps universes
instead of setting a stop condition.

And still: this line.
This day.
This drop.
Do your best.
Not the perfect of another Rick.
The honest possible here.

Valeu !!!

Because every time someone
does not swap universes
when the craft tightens,
the universe — this one —
grows a little:
one more verse,
one more canopy,
a street where the portal
does not erase the plant.`;
}

function poemRickAndMortyEs() {
  return `Rick and Morty.
No pedimos prestado el portal —
pedimos el oficio de quedarse
cuando hay mil puertas
y solo una planta en esta mano.

Harmon. Roiland. Adult Swim.
Hubo un festival de cortos
donde Doc y Marty nacían torcidos —
y un dibujo que llevó al par
a un suburbio y a un número sin fin
de líneas que no se tocan.
Hubo un portal verde,
un nieto que tiembla,
un abuelo que finge que nada importa.
Hubo la tentación de llamar destino
a lo que es solo una dimensión más.

El laboratorio conoce ese número.
Infinito que parece alivio
y se vuelve huida.
Teoría que vibra en el pizarrón
y no riega la maceta.
Un loop que cambia de universo
en vez de poner condición de parada.

Aun así: esta línea.
Este día.
Esta gota.
Haz lo mejor.
No lo perfecto de otro Rick.
Lo posible honesto aquí.

¡Valeu !!!

Porque cada vez que alguien
no cambia de universo
cuando el oficio aprieta,
el universo — este —
crece un poco:
un verso más,
un dosel más,
una calle donde el portal
no apaga la planta.`;
}

function buildRickAndMortyBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const inspecoes = '/biblioteca/inspecoes/';
  const vida = '/vida/';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const bttf = '/posts/post-inspecao-filme-de-volta-para-o-futuro.html';
  const delorean = '/posts/post-inspecao-delorean.html';
  const fox = '/posts/post-inspecao-figura-michael-j-fox.html';
  const lloyd = '/posts/post-inspecao-figura-christopher-lloyd.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const moana = '/posts/post-inspecao-filme-moana.html';
  const cordas = '/posts/post-inspecao-palavra-teoria-das-cordas.html';
  const loop = '/posts/post-inspecao-expressao-loop-infinito.html';
  const cientista = '/posts/post-inspecao-expressao-toda-crianca-nasce-cientista.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const poema = poemRickAndMortyPt();

  const body = `## Escopo

Inspeção editorial do desenho animado **«Rick and Morty»** — série de **Adult Swim** (estreia **2 dez. 2013**), criação de **Dan Harmon** e **Justin Roiland**. O **início de tudo** é o **desenho**: sitcom de ficção científica que parte o tempo entre a casa (família Smith, subúrbio) e um **número sem fim de realidades**, atravessadas por **portais**. Pedido de campo: *Rick e Mort* · *desenho* · *multiverso* · *[faça o melhor](${faca})*. Tese BudGanja: o multiverso é **máquina da trama**, não licença para abandonar **esta** linha.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Rick and Morty](${WIKI}), [Wikipedia (EN)](${WIKI_EN}). Crédito: Harmon / Roiland / Williams Street / Adult Swim — **sem afiliação**. **Ficha ≠ guia de binge, ≠ merch, ≠ biografia dos criadores.** Personagens (Rick, Morty, Beth, Jerry, Summer) ≠ pessoas. O laboratório **não** trata o cinismo da série como método de cultivo nem como protocolo clínico. Promo de génese (S1, anúncio 2 dez. 2013): [${YT_ID}](${YT}).

Pedido de ouvido: [a orelha cola o que a boca juntou](${orelha}) — *RikRok* (canção) colou-se a *Rick*; *Mort* a *Morty*. **Objectos distintos.** Esta ficha é o **desenho**.

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Rick and Morty** (BR: o mesmo nome; fala: *Rick e Morty*) |
| Meio | Série · **desenho** adulto · sitcom de ficção científica |
| Estreia | **2 dez. 2013** — Adult Swim (Cartoon Network, EUA) |
| Criação | **Dan Harmon** · **Justin Roiland** |
| Génese (pré-série) | Curta Channel 101 (**2006**): *The Real Animated Adventures of Doc and Mharti* — paródia de [De Volta para o Futuro](${bttf}) |
| Núcleo | **Rick Sanchez** (cientista cínico) e **Morty Smith** (neto) — casa × portal |
| Máquina da trama | **Multiverso** / dimensões (portal; a série nomeia C-137 como marca de *um* Rick) |
| Tipo BudGanja | Arte — **desenho 2013 primeiro**; multiverso como parábola de ofício |
| Elo mantra | [Faça o melhor](${faca}) · [Valeu !!!](${mantra}) — nesta linha, não na perfeita de outro universo |
| Elo Palavras | [teoria das cordas](${cordas}) · [caminho](${caminho}) · [verdade](${verdade}) · [vida](${vidaPalavra}) · [risco](${risco}) · [medo](${medo}) · [gesto](${gesto}) |
| Elo Artes | [De Volta para o Futuro](${bttf}) · [Matrix](${matrix}) · [Alice](${alice}) · [Divertida Mente](${divertida}) · [Moana](${moana}) |
| Elo processo | [loop infinito](${loop}) — trocar de universo ≠ condição de paragem |
| Fonte | [Wikipédia](${WIKI}) · [EN](${WIKI_EN}) · [promo S1](${YT}) |
| Data | ${inspected} |

**Objecto:** o **desenho** que ensina (e esvazia) o infinito. Rick arrasta Morty; o portal multiplica saídas. O laboratório pergunta: quando há mil linhas, **qual fica**?

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 2006–2013** — Channel 101 (Doc/Mharti) → Adult Swim 2 dez. 2013 — antes de merch, citadel-memes ou temporadas tardias.  
**H2:** o **multiverso** é o motor cómico e o risco moral da obra: se existe outra Terra, o abandono desta parece barato. Tese lab: infinitas linhas **não** cancelam [faça o melhor](${faca}) **aqui**.  
**H3:** paródia de [De Volta para o Futuro](${bttf}): Doc/Marty viram Rick/Morty. A ficha honra o **filme 1985** e os [actores](${fox}) / [Lloyd](${lloyd}); o desenho é **outro objecto**.  
**H4:** distinto de [Matrix](${matrix}) (um véu) e de [Alice](${alice}) (uma toca). Aqui o número de tocas **não acaba**. Distinto de [teoria das cordas](${cordas}): metáfora de física ≠ portal de sitcom.  
**H5:** o cinismo de Rick não é método BudGanja. [Toda criança nasce cientista](${cientista}) pede pergunta; o desenho às vezes pede **fuga**. O laboratório lê o desvio.

Passos: génese do desenho → máquina do multiverso → cruzamento com o mantra → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **2006 · Channel 101** | Curta *Doc and Mharti* — Harmon e Roiland; paródia de [BTTF](${bttf}). Sem este curto, o par não tem nome torto. |
| **2012** | Adult Swim encomenda a série (Harmon / Roiland / Starburns). |
| **2 dez. 2013** | Estreia S1 — **origem televisiva**. Sitcom doméstica + sci-fi. |
| Portal | Dispositivo visual (verde) — a porta que o laboratório traduz por **saída fácil** × [caminho](${caminho}). |
| C-137 | Marca diegética de *um* Rick — o desenho **numera** o que o mito chama destino. |
| S1 «Rick Potion #9» | Troca de dimensão depois do desastre — tese nua: **deixar esta Terra**. O lab lê o aviso, não o reproduz. |
| Vozes (eco) | Roiland vozeou Rick e Morty até a recast da S7 (Ian Cardoni / Harry Belden). **Obra continua**; esta ficha **não** é Pessoas. |
| Temporadas seguintes | Ecos — fora do recorte de génese. A ficha não é enciclopédia de episódios. |

> **Hierarquia:** sem Channel 101 e sem a estreia 2013, não há desenho a inspecionar. Memes, jogos e merch são descendentes. [DeLorean](${delorean}) / [BTTF](${bttf}) são o **pai cultural**, não a ficha.

## A obra (síntese)

- Desenho adulto: casa Smith (Jerry, Beth, Summer) × aventura interdimensional.  
- Conflito estável: drama doméstico **versus** avô misantropo que puxa o neto.  
- Máquina: **multiverso** — versões dos mesmos nomes com características diferentes.  
- Tese BudGanja da **génese:** o rádio nerd ouve niilismo engraçado; o laboratório lê o **preço** de trocar de linha.  
- O laboratório **não** reproduz diálogos da série (direitos); inspeciona o **método** (ficar nesta mão) e o mapa de elos.

## Tese cultural BudGanja — multiverso × faça o melhor

| Tema no desenho | Tradução editorial |
|-----------------|-------------------|
| Portal / dimensões | Saída fácil — [caminho](${caminho}) pede **esta** rua |
| Infinitas Terras | [Faça o melhor](${faca}) aponta para **o** melhor concreto, não o absoluto de outro Rick |
| Cinismo de Rick | Fuga disfarçada de génio — [cientista](${cientista}) é pergunta, não desprezo |
| Medo de Morty | [medo](${medo}) · [risco](${risco}) — o corpo que ainda treme é o que fica |
| Trocar de universo | [loop infinito](${loop}) sem *exit* — repetir a fuga |
| Uma família no sofá | [vida](${vidaPalavra}) — o doméstico não é inferior ao cosmos |
| Paródia BTTF | [De Volta para o Futuro](${bttf}) = ofício de voltar; aqui = ofício de **não** descartar a linha |
| Teoria / cordas | [teoria das cordas](${cordas}) = mapa de física; o portal é **gag**, não paper |

## Cruzamento: desenho × ofício

| Rick and Morty | BudGanja |
|----------------|----------|
| Harmon + Roiland, 2013 | Série [Artes](${hub}) · desenho primeiro |
| Channel 101 / Doc-Mharti | Génese; pai = [BTTF](${bttf}) |
| Multiverso | Parábola: infinito ≠ alibi |
| Portal verde | [gesto](${gesto}) de sair — o lab pergunta se era preciso |
| «Nada importa» (eco nerd) | [verdade](${verdade}): importa **esta** planta |
| Recast S7 | A obra segue; Pessoas ≠ desenho |
| Adult Swim | Sem afiliação; crédito declarado |

## Homónimos (não colar)

| Ouvido | Objecto |
|--------|---------|
| **Rick / Morty** | Esta ficha — desenho Adult Swim |
| **RikRok** (Ricardo Ducent) | Outra voz, outra obra (canção). A [orelha](${orelha}) cola; o étimo corta. |
| Shaggy (Scooby-Doo / reggae) | Outros objectos — **não** esta série |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com o desenho; **não** é guião de Adult Swim.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=rick-and-morty)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Faça o melhor](${faca}) · [Valeu !!!](${mantra}) | Mantra: nesta linha, o possível honesto |
| [teoria das cordas](${cordas}) · [loop infinito](${loop}) | Física-metáfora × processo sem saída |
| [De Volta para o Futuro](${bttf}) · [DeLorean](${delorean}) | Pai cultural do par cientista/jovem |
| [Matrix](${matrix}) · [Alice](${alice}) | Um véu / uma toca — aqui o número não acaba |
| [Moana](${moana}) · [Divertida Mente](${divertida}) | Outros desenhos de ofício (ilha; emoção) |
| [caminho](${caminho}) · [vida](${vidaPalavra}) · [verdade](${verdade}) · [gesto](${gesto}) | Léxico de ficar |
| [Toda criança nasce cientista](${cientista}) | Pergunta ≠ cinismo |
| Hub [Artes](${hub}) · [Palavras](${palavras}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção do **desenho** 2013 (Harmon / Roiland / Adult Swim) + cruzamento com multiverso e [faça o melhor](${faca}): infinitas linhas não cancelam o ofício nesta. Referência de génese: promo S1.

[▶ Promo S1](${YT}) · [▶ Poema Vida](${vida}#poema=rick-and-morty) · [▶ Faça o melhor](${faca}) · [▶ BTTF](${bttf}) · [▶ Teoria das cordas](${cordas}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the cartoon **Rick and Morty** — **Adult Swim** series (premiere **2 Dec 2013**), created by **Dan Harmon** and **Justin Roiland**. Drawing first: domestic sitcom × **multiverse** through portals. Field request: Rick and Morty · cartoon · multiverse · [do your best](${faca}). Thesis: infinite lines do **not** cancel craft **here**.

> Method note: [Wikipedia](${WIKI_EN}). No affiliation. This sheet is **not** a binge guide, merch page or creators’ biography. Characters ≠ people. The lab does **not** treat the show’s cynicism as cultivation method. Genesis promo: [${YT_ID}](${YT}). Ear-glue: RikRok (song) ≠ Rick Sanchez.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemRickAndMortyEn()}
\`\`\`

[▶ Vida](${vida}#poema=rick-and-morty) · [▶ Do your best](${faca}) · [▶ Back to the Future](${bttf})

## Status

**Approved** — 2013 cartoon + BudGanja map (stay on this line). Genesis audiovisual: S1 promo.
`;

  const contentEs = `## Alcance

Inspección del dibujo **Rick and Morty** — serie de **Adult Swim** (estreno **2 dic. 2013**), creación de **Dan Harmon** y **Justin Roiland**. Dibujo primero: sitcom doméstica × **multiverso** por portales. Pedido: Rick y Morty · dibujo · multiverso · [haz lo mejor](${faca}). Tesis: las líneas infinitas **no** cancelan el oficio **aquí**.

> Nota: [Wikipedia](${WIKI_EN}). Sin afiliación. Esta ficha **no** es guía de binge ni biografía. Personajes ≠ personas. El laboratorio **no** trata el cinismo de la serie como método de cultivo. Promo de génesis: [${YT_ID}](${YT}). Oído: RikRok (canción) ≠ Rick Sanchez.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemRickAndMortyEs()}
\`\`\`

[▶ Vida](${vida}#poema=rick-and-morty) · [▶ Haz lo mejor](${faca}) · [▶ Back to the Future](${bttf})

## Estado

**Aprobada** — dibujo 2013 + mapa BudGanja (quedarse en esta línea). Audiovisual de génesis: promo S1.
`;

  return { body, contentEn, contentEs };
}

function buildRickAndMortyPost() {
  const { body, contentEn, contentEs } = buildRickAndMortyBodies();
  let seriesOrder = 9;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === 'inspecao-desenho-rick-and-morty');
    if (existing && typeof existing.seriesOrder === 'number') seriesOrder = existing.seriesOrder;
  } catch (_) {
    /* keep 9 */
  }
  return artePost({
    title: 'Inspeção: Rick and Morty — o desenho do portal e o ofício nesta linha',
    titleEn: 'Inspection: Rick and Morty — the portal cartoon and the craft on this line',
    titleEs: 'Inspección: Rick and Morty — el dibujo del portal y el oficio en esta línea',
    excerpt:
      'Artes · desenho 2013: Rick and Morty (Harmon / Roiland / Adult Swim) — multiverso e portal; elo BudGanja com faça o melhor: infinitas linhas não cancelam o ofício nesta.',
    excerptEn:
      'Arts · 2013 cartoon: Rick and Morty (Harmon / Roiland / Adult Swim) — multiverse and portal; BudGanja link to do your best: infinite lines do not cancel craft here.',
    excerptEs:
      'Artes · dibujo 2013: Rick and Morty (Harmon / Roiland / Adult Swim) — multiverso y portal; vínculo BudGanja con haz lo mejor: las líneas infinitas no cancelan el oficio aquí.',
    slug: 'inspecao-desenho-rick-and-morty',
    date: '2026-08-23T02:56:00.000Z',
    seriesOrder,
    seriesLabel: 'Rick and Morty · Artes',
    coverImage: '/imagens/inspecoes/rick-and-morty-cover.jpg?v=2',
    sourceUrl: WIKI_EN,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRickAndMortyPost,
  buildRickAndMortyBodies,
  poemRickAndMortyPt,
  poemRickAndMortyEn,
  poemRickAndMortyEs,
  YT_ID,
  YT,
  WIKI,
  WIKI_EN
};
