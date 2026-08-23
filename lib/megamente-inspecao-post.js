'use strict';

/**
 * Artes · desenho «Megamente» (DreamWorks, 2010).
 * Pedido de campo: Inpeção no desenho Megamente.
 * Tese: vilão/herói são papéis; o ofício é o gesto quando a capa cai.
 * Sem diálogo colado. Sequela 2024 = eco.
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

const YT_ID = '6CJUQr4Vs40';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://pt.wikipedia.org/wiki/Megamente';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Megamind';

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

function poemMegamentePt() {
  return `Megamente.
Não pedimos a capa emprestada —
pedimos o ofício de escolher
quando o papel acaba
e ainda sobra a cidade.

DreamWorks. McGrath. Metro City.
Houve um azul criado na prisão
e um herói criado no palco.
Houve vitória oca:
sem inimigo, o nome não segura.
Houve um herói falso
que preferiu o poder sem o ofício.

O laboratório conhece essa troca.
Vilão e herói são carimbos.
O gesto é o que fica
quando a capa cai.

Valeu !!!

Porque toda vez que alguém
protege sem ter nascido o escolhido,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma cidade
onde o papel
não é a pessoa.`;
}

function poemMegamenteEn() {
  return `Megamind.
We do not borrow the cape —
we ask for the craft of choosing
when the role ends
and the city is still there.

DreamWorks. McGrath. Metro City.
There was a blue child raised in prison
and a hero raised on the stage.
There was a hollow win:
without an enemy, the name does not hold.
There was a fake hero
who preferred power without the craft.

The laboratory knows that swap.
Villain and hero are stamps.
The gesture is what remains
when the cape falls.

Valeu !!!

Because every time someone
protects without being born the chosen one,
the universe grows a little:
one more verse,
one more canopy,
a city
where the role
is not the person.`;
}

function poemMegamenteEs() {
  return `Megamente.
No pedimos prestada la capa —
pedimos el oficio de elegir
cuando el papel se acaba
y aún queda la ciudad.

DreamWorks. McGrath. Metro City.
Hubo un azul criado en la prisión
y un héroe criado en el escenario.
Hubo victoria hueca:
sin enemigo, el nombre no sostiene.
Hubo un héroe falso
que prefirió el poder sin el oficio.

El laboratorio conoce ese trueque.
Villano y héroe son sellos.
El gesto es lo que queda
cuando cae la capa.

¡Valeu !!!

Porque cada vez que alguien
protege sin haber nacido el elegido,
el universo crece un poco:
un verso más,
un dosel más,
una ciudad
donde el papel
no es la persona.`;
}

function buildMegamenteBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const inspecoes = '/biblioteca/inspecoes/';
  const vida = '/vida/';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const ilegal = '/posts/post-inspecao-palavra-ilegal.html';
  const rick = '/posts/post-inspecao-desenho-rick-and-morty.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const venom = '/posts/post-inspecao-filme-venom.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const moana = '/posts/post-inspecao-filme-moana.html';
  const vevoCanal = '/posts/post-inspecao-canal-vevo.html';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const birds = '/posts/post-inspecao-personagem-three-little-birds.html';
  const radio = '/radio/';
  const elvisId = 'Zx1_6F-nCaw';
  const elvisYt = 'https://www.youtube.com/watch?v=' + elvisId;
  const acdcId = 'pAgnJDJN4VA';
  const acdcYt = 'https://www.youtube.com/watch?v=' + acdcId;
  const jungleId = 'o1tj2zJ2Wvg';
  const jungleYt = 'https://www.youtube.com/watch?v=' + jungleId;
  const poema = poemMegamentePt();

  const body = `## Escopo

Inspeção editorial do desenho **«Megamente»** (*Megamind*, **2010**) — longa de animação da **DreamWorks**, realização de **Tom McGrath**. Pedido de campo: *Inpeção no desenho Megamente*. O **início de tudo** é este **filme**: comédia de super-herói que pergunta o que resta quando o **papel** (vilão / herói) acaba e a cidade ainda pede [gesto](${gesto}). No Brasil o título oficial é **Megamente**; *Megamind* entra como forma original. A sequela *Megamind vs. the Doom Syndicate* (**2024**) e a série *Megamind Rules!* ficam como **eco** — não substituem a génese de 2010.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Megamente](${WIKI}), [Wikipedia · Megamind](${WIKI_EN}), trailer de génese 2010 ([${YT_ID}](${YT})). Crédito: DreamWorks Animation / Paramount / PDI — **sem afiliação**. **Ficha ≠ merch, ≠ jogo THQ, ≠ biografia das vozes.** Personagens ≠ pessoas. **Esta ficha não reproduz diálogo** (direitos) — inspeciona o **mapa** (papéis, vitória oca, herói falso, escolha). O laboratório **não** protocola violência nem «como ser vilão».

Fala viva do pedido: **Megamente**. Lema original: **Megamind**.

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Megamente** (EN: *Megamind*) |
| Meio | Longa · **desenho** · comédia de super-herói |
| Estreia | EUA **5 nov. 2010** · Brasil **3 dez. 2010** |
| Realização | **Tom McGrath** |
| Argumento | Alan J. Schoolcraft · Brent Simons |
| Estúdio | DreamWorks Animation · PDI · Red Hour |
| Núcleo | **Megamente** (voz Will Ferrell / dublagem BR Cláudio Galvan) — Metro City |
| Par / palco | **Metro Man** (Brad Pitt) · **Rosane Rocha** (Tina Fey) · **Criado** (David Cross) · **Hal / Titã** (Jonah Hill) |
| Tipo BudGanja | Arte — **desenho 2010 primeiro**; vilão/herói como **papel**, não como destino |
| Elo Palavras | [caminho](${caminho}) · [gesto](${gesto}) · [verdade](${verdade}) · [vida](${vidaPalavra}) · [legal](${legal}) · [ilegal](${ilegal}) |
| Elo Artes | [Rick and Morty](${rick}) · [Divertida Mente](${divertida}) · [Venom](${venom}) · [Matrix](${matrix}) · [Moana](${moana}) |
| Elo VEVO | [Canal VEVO](${vevoCanal}) — clipes oficiais da banda sonora × clipes já fichados |
| Elo ofício | [Faça o melhor](${faca}) · [Valeu !!!](${mantra}) |
| Fonte | [Wiki BR](${WIKI}) · [EN](${WIKI_EN}) · [trailer 2010](${YT}) |
| Data | ${inspected} |

**O que é o objecto:** o **desenho** que inspeciona o carimbo. Megamente chega azul, cresce na prisão, veste o ofício de vilão porque o palco já tinha um herói. O laboratório pergunta: quando o inimigo some, **quem fica**?

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 2010** (McGrath / DreamWorks / Metro City) — antes de curta *The Button of Doom*, jogos e sequela 2024.  
**H2:** **vilão** e **herói** são **papéis de palco**, não essências. O filme mostra o vazio de vencer o papel sem ter [verdade](${verdade}) por baixo.  
**H3:** o **herói falso** (Hal / Titã) é o aviso: poder sem [ofício](${gesto}) vira destruição. Distinto de [Venom](${venom}) (duas vozes, um volante) — aqui o volante é a **escolha depois da capa**.  
**H4:** paródia de Superman / Lex Luthor é **contexto cultural**, não ficha da DC. Distinto de [Matrix](${matrix}): verificar o que se apresenta como herói.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *deste* papel *hoje*.

Passos: génese → mapa (sem diálogo) → elos → eco poético → status.

## O início de tudo — génese

| Marco | O que importa |
|-------|----------------|
| Título de trabalho | *Master Mind* / *Oobermind* — o nome **Megamind** vence o registo |
| **Tom McGrath** | Realizador (*Madagascar*) — comédia de palco, não teses de BD |
| **5 nov. 2010** | Estreia EUA (3D / IMAX) — **origem** desta ficha |
| **3 dez. 2010** | Estreia Brasil — título **Megamente** |
| Elenco de voz | Ferrell · Pitt · Fey · Hill · Cross — crédito; **não** fichas Pessoas nesta entrega |
| Curta 2011 | *The Button of Doom* — descendente de disco, não génese |
| **2024** | *vs. the Doom Syndicate* / série — **eco** |

> **Hierarquia:** sem o longa **2010**, não há desenho a inspecionar. Trailer, merch e sequela são ecos.

## A obra (mapa — sem reproduzir)

O laboratório **não** cola o guião. Lê o **ofício** do desenho:

| Motivo | Leitura editorial |
|--------|-------------------|
| **Dois recém-chegados** | Um cresce na prisão; o outro no palco — o [caminho](${caminho}) começa no sítio, não no ADN |
| **Vilão de ofício** | O papel aguenta enquanto há herói para falhar contra |
| **Vitória oca** | Sem inimigo, o nome não segura — [verdade](${verdade}) ≠ carimbo |
| **Herói fabricado** | Hal / Titã: força sem [gesto](${gesto}) de cuidado |
| **Escolher proteger** | Não se nasce o escolhido; escolhe-se o ofício — [faça o melhor](${faca}) |
| **Criado** | Companheiro de oficina — o laboratório honra o par, não o merch |
| **Não é** | Manual de vilania · citação de apresentação · página da DC · biografia Pitt/Ferrell |

## Tese cultural BudGanja

O desenho pede **verificar o carimbo**. [Legal](${legal}) / [ilegal](${ilegal}) no laboratório já separam lei e gíria; aqui o par é **herói / vilão** como fatos de palco. A [vida](${vidaPalavra}) da cidade pede [gesto](${gesto}) quando a capa cai — não mais um inimigo para ter identidade.

| Tema no desenho | Tradução editorial |
|-----------------|-------------------|
| Papel de vilão | Identidade emprestada ao inimigo |
| Papel de herói | Palco e fama — Metro Man também é fato |
| Vitória sem ofício | Vazio; o [caminho](${caminho}) pede o que fazer *depois* |
| Titã | Poder sem cuidado |
| Escolha tardia | [Faça o melhor](${faca}) *nesta* cidade, não no mito de origem |

## Clipes VEVO junto desta ficha

A [rede VEVO](${vevoCanal}) é **transporte oficial** do clipe — não génese do desenho. Aqui entram **dois lotes**: a banda sonora do longa (gravadora) e os clipes **já inspeccionados** no canal VEVO, lidos como elos de ofício.

### Banda sonora (oficial *VEVO) — Metro Man / capa preta / cidade

O DVD comenta o carisma de Metro Man à maneira de Elvis. O laboratório **não** cola letra; põe o clipe oficial **ao lado** do trailer.

| Clipe | Canal | Leitura junto do desenho |
|-------|-------|--------------------------|
| *A Little Less Conversation* (JXL remix) | [ElvisPresleyVEVO](${elvisYt}) | Palco do herói-estrela — menos pose, mais [gesto](${gesto}) |
| *Back in Black* | [oficial AC/DC](${acdcYt}) | Voltar de preto — a capa como fato, não como pessoa |
| *Welcome to the Jungle* | [GunsNRosesVEVO](${jungleYt}) | Metro City como selva de papéis |

Embed da **banda sonora** (ElvisPresleyVEVO) — par do trailer acima:

@youtube ${elvisId}

> Hierarquia: o **desenho 2010** continua primeiro. Estes clipes são **eco musical licenciado**. Sem ficha própria de cada canção nesta entrega.

### Já na inspeção do [canal VEVO](${vevoCanal})

| Clipe (ficha Artes / Vida) | Por que fica junto |
|----------------------------|--------------------|
| [Send Me On My Way](${sendMe}) · RustedRootVEVO | [Caminho](${caminho}) depois da capa — «envie-me no meu caminho» como partida de ofício, não fuga |
| [Só os Loucos Sabem](${loucos}) · charliebrownjrVEVO | Recomeço: quem fica vê; Megamente escolhe proteger sem nascer o escolhido |
| [Three Little Birds](${birds}) · BobMarleyVEVO | Ficar na cidade sem pânico — âncora da [Rádio](${radio}) / [VEVO](${vevoCanal}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com o desenho; **não** é guião da DreamWorks.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=megamente)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Canal VEVO](${vevoCanal}) | Rede de clipes oficiais — banda sonora + âncoras do lab |
| [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) · [Three Little Birds](${birds}) | Clipes VEVO já fichados, lidos junto deste desenho |
| [Rick and Morty](${rick}) | Outro **desenho** de ofício (portal × ficar) |
| [Divertida Mente](${divertida}) | Vozes interiores — aqui as vozes são **capas** |
| [Venom](${venom}) | «Nós» no corpo; aqui o «eu» depois do papel |
| [Matrix](${matrix}) | Verificar o que se apresenta como herói |
| [Moana](${moana}) | Outro desenho de escolha (ilha; caminho) |
| [caminho](${caminho}) · [gesto](${gesto}) · [verdade](${verdade}) · [vida](${vidaPalavra}) | Léxico de ficar |
| [legal](${legal}) · [ilegal](${ilegal}) | Carimbos de lei ≠ carimbos de palco |
| [Faça o melhor](${faca}) · [Valeu !!!](${mantra}) | Fecho nesta linha |
| Hub [Artes](${hub}) · [Palavras](${palavras}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Limites

- **Ficha ≠ diálogo integral.**  
- Sem protocolar crime, prisão ou «como vencer o herói».  
- Vozes (Ferrell, Pitt, Fey…) são **crédito**; não abrem filmografia nesta entrega.  
- Distinto do cânone Superman / Lex — paródia, não página DC.

## Status

**Aprovado** — inspeção do **desenho** **Megamente** (DreamWorks, 2010): papéis de vilão/herói × ofício de escolher; clipes [VEVO](${vevoCanal}) da banda sonora e das âncoras do lab **junto** desta ficha; sequela 2024 como eco.

[▶ Trailer 2010](${YT}) · [▶ ElvisPresleyVEVO](${elvisYt}) · [▶ Canal VEVO](${vevoCanal}) · [▶ Poema Vida](${vida}#poema=megamente) · [▶ Rick and Morty](${rick}) · [▶ Faça o melhor](${faca}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the cartoon **Megamind** (BR: **Megamente**, **2010**) — DreamWorks, **Tom McGrath**. Field request: the **drawing**. Villain/hero as **roles**, not destiny. The lab does **not** paste dialogue. 2024 sequel is an echo.

> [Wikipedia](${WIKI_EN}). No affiliation. Characters ≠ people. Genesis trailer: [${YT_ID}](${YT}).

@youtube ${YT_ID}

Soundtrack VEVO (ElvisPresleyVEVO — Metro Man’s Elvis craft):

@youtube ${elvisId}

## Lyric of the plot (motifs, no quotation)

Two arrivals (prison vs stage) · hollow win without an enemy · fake hero who wants power without craft · choosing to protect without being born the chosen one.

## Lab poem

\`\`\`poem
${poemMegamenteEn()}
\`\`\`

[▶ Vida](${vida}#poema=megamente) · [▶ VEVO](${vevoCanal}) · [▶ Do your best](${faca}) · [▶ Valeu !!!](${mantra})

## Status

**Approved** — 2010 DreamWorks cartoon; role vs craft; no pasted script.
`;

  const contentEs = `## Alcance

Inspección del dibujo **Megamind** (BR: **Megamente**, **2010**) — DreamWorks, **Tom McGrath**. Pedido: el **dibujo**. Villano/héroe como **papeles**, no destino. El laboratorio **no** pega diálogo. La secuela 2024 es eco.

> [Wikipedia](${WIKI_EN}). Sin afiliación. Tráiler de génesis: [${YT_ID}](${YT}).

@youtube ${YT_ID}

Banda sonora VEVO (ElvisPresleyVEVO):

@youtube ${elvisId}

## Mapa (sin cita)

Dos llegadas (prisión vs escenario) · victoria hueca sin enemigo · héroe falso que quiere poder sin oficio · elegir proteger sin nacer el elegido.

## Poema del laboratorio

\`\`\`poem
${poemMegamenteEs()}
\`\`\`

[▶ Vida](${vida}#poema=megamente) · [▶ VEVO](${vevoCanal}) · [▶ Haz lo mejor](${faca}) · [▶ ¡Valeu !!!](${mantra})

## Estado

**Aprobada** — dibujo DreamWorks 2010; papel vs oficio; sin pegar el guion.
`;

  return { body, contentEn, contentEs };
}

function buildMegamentePost() {
  const { body, contentEn, contentEs } = buildMegamenteBodies();
  const seriesOrder = pickOrder('inspecao-desenho-megamente', 10);
  return artePost({
    title: 'Inspeção: Megamente — o desenho do papel e o ofício quando a capa cai',
    titleEn: 'Inspection: Megamind — the cartoon of the role and the craft when the cape falls',
    titleEs: 'Inspección: Megamente — el dibujo del papel y el oficio cuando cae la capa',
    excerpt:
      'Artes · desenho 2010: Megamente (DreamWorks / Tom McGrath) — vilão e herói como papéis; vitória oca e escolha de proteger; sem colar o guião.',
    excerptEn:
      'Arts · 2010 cartoon: Megamind (DreamWorks / Tom McGrath) — villain and hero as roles; hollow win and the choice to protect; no pasted script.',
    excerptEs:
      'Artes · dibujo 2010: Megamente (DreamWorks / Tom McGrath) — villano y héroe como papeles; victoria hueca y la elección de proteger; sin pegar el guion.',
    slug: 'inspecao-desenho-megamente',
    date: '2026-08-23T05:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Megamente · Artes',
    coverImage: '/imagens/inspecoes/megamente-cover.jpg',
    sourceUrl: WIKI,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMegamentePost,
  buildMegamenteBodies,
  poemMegamentePt,
  poemMegamenteEn,
  poemMegamenteEs,
  YT_ID,
  YT,
  WIKI,
  WIKI_EN
};
