'use strict';

/**
 * Artes · canção «Anjos (Pra quem tem fé)» — O Rappa.
 * Pedido: expressão para quem tem fé a vida nunca tem fim · musica · o RAPPA.
 * Álbum Nunca Tem Fim... (2013). Sem letra integral. ≠ púlpito ≠ Hungria Amor e Fé.
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
    filename: opts.filename || 'posts/post-' + opts.slug + '.html',
    url: opts.url || '/posts/post-' + opts.slug + '.html',
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

const COVER = '/imagens/inspecoes/anjos-pra-quem-tem-fe-cover.jpg';
const YT_ID = 'BPbCLtBl_g4';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/1UvWx2hgpxlF7HPbwLSmIY';
const WIKI = 'https://pt.wikipedia.org/wiki/Anjos_%28Pra_quem_tem_f%C3%A9%29';
const WIKI_ALBUM = 'https://pt.wikipedia.org/wiki/Nunca_Tem_Fim...';
const WIKI_BAND = 'https://pt.wikipedia.org/wiki/O_Rappa';
const UOL = 'https://musica.uol.com.br/noticias/redacao/2013/05/14/musica-sobre-anjos-e-fe-veio-para-reerguer-o-rappa-diz-falcao.htm';

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
  return `Anjos.
Não pedimos a letra emprestada —
pedimos o ofício de ficar
quando a banda quase acaba
e a boca ainda pede fé.

O Rappa. Rio. Nunca Tem Fim.
Houve um single de 2013
que colou no pátio a locução:
pra quem tem fé,
a vida nunca tem fim.
Houve Falcão no violão para a mãe.
Houve tia doente, empresário, afastamento.
Houve a recusa do púlpito:
anjos do subconsciente,
não ícone no Corcovado.

O laboratório conhece essa cola.
Fé no título ≠ catecismo.
Vida que não acaba ≠ recusar a morte.
É a canção a inspecionar:
união da banda,
respeito a quem crê,
sem transformar o peito em ordem.

Valeu !!!

Porque toda vez que alguém canta
a locução sem a vender como bula,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma rua do Rio
onde ainda cabe fé
sem ser sermão.`;
}

function poemEn() {
  return `Angels.
We do not borrow the lyric —
we ask for the craft of staying
when the band almost ends
and the mouth still asks for faith.

O Rappa. Rio. Nunca Tem Fim.
There was a 2013 single
that glued the saying to the yard:
for those who have faith,
life never has an end.
There was Falcão on guitar for his mother.
There was a sick aunt, a manager, a split.
There was the refusal of the pulpit:
angels of the subconscious,
not an icon on Corcovado.

The laboratory knows that glue.
Faith in the title ≠ catechism.
Life that does not end ≠ refusing death.
It is the song to inspect:
the band’s reunion,
respect for those who believe,
without turning the chest into an order.

Valeu !!!

Because every time someone sings
the saying without selling it as a leaflet,
the universe grows a little:
one more verse,
one more canopy,
a Rio street
where faith still fits
without becoming a sermon.`;
}

function poemEs() {
  return `Ángeles.
No pedimos prestada la letra —
pedimos el oficio de quedarse
cuando la banda casi acaba
y la boca aún pide fe.

O Rappa. Río. Nunca Tem Fim.
Hubo un single de 2013
que pegó en el patio la locución:
pra quem tem fé,
a vida nunca tem fim.
Hubo Falcão en la guitarra para su madre.
Hubo tía enferma, empresario, alejamiento.
Hubo la negativa del púlpito:
ángeles del subconsciente,
no ícono en el Corcovado.

El laboratorio conoce esa cola.
Fe en el título ≠ catecismo.
Vida que no acaba ≠ rechazar la muerte.
Es la canción a inspeccionar:
unión de la banda,
respeto a quien cree,
sin transformar el pecho en orden.

¡Valeu !!!

Porque cada vez que alguien canta
la locución sin venderla como bula,
el universo crece un poco:
un verso más,
un dosel más,
una calle de Río
donde aún cabe fe
sin ser sermón.`;
}

function buildAnjosPraQuemTemFeBodies() {
  const inspected = '2026-08-26';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const self = '/posts/post-inspecao-arte-anjos-pra-quem-tem-fe.html';
  const amorFe = '/posts/post-inspecao-arte-amor-e-fe.html';
  const girassol = '/posts/post-inspecao-arte-girassol.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const under = '/posts/post-inspecao-arte-under-pressure.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const deusAbencoe = '/posts/post-inspecao-expressao-deus-abencoe.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lagrimas = '/posts/post-inspecao-arte-lagrimas-da-vida.html';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const vida = '/vida/';
  const poema = poemPt();

  const body = `## Escopo

Inspeção editorial da canção **«[Anjos (Pra quem tem fé)](${self})»** — **[O Rappa](${WIKI_BAND})**. Pedido de campo: *expressã para quem tem fé a vida nunca tem fim* · *musica* · *o RAPPA*. A locução que a boca colou é o **refrão feito ditado**; o objecto desta ficha é a **canção** que a tornou pátio. Álbum ***[Nunca Tem Fim...](${WIKI_ALBUM})*** (**15 ago. 2013**). Single **14 mai. 2013**. Webclipe oficial no canal da banda. Autoria de trabalho: **Marcelo Falcão** e **Tom Sabóia** (faixa 6 do disco; UOL / Rolling Stone). Distinto de **[Amor e Fé](${amorFe})** (Hungria, 2020). [A orelha cola](${orelhaCola}) *fé* nas duas; o [étimo](/posts/post-inspecao-palavra-etimo.html) da **obra** corta: Rio rap-rock 2013 ≠ Ceilândia acústico 2020.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Anjos](${WIKI}), [álbum](${WIKI_ALBUM}), [O Rappa](${WIKI_BAND}), [UOL · Falcão](${UOL}), webclipe (${YT}), [Spotify](${SPOTIFY}). **Sem afiliação.** O laboratório **não** reproduz a letra integral (direitos). **Fé no título ≠ catecismo:** Falcão recusou a leitura religiosa do refrão (anjos do subconsciente; crítica pública, não púlpito). [Deus abençoe](${deusAbencoe}) é elo de léxico. Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

@youtube ${YT_ID}

**Gatilho:** *para quem tem fé a vida nunca tem fim* / *pra quem tem fé* / *nunca tem fim* / *Anjos o Rappa* → lema **Anjos (Pra quem tem fé)**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Anjos (Pra quem tem fé)** |
| Artista | **O Rappa** (Rio de Janeiro, 1993) |
| Meio | Canção / single (rap rock · reggae · dub) |
| Álbum | ***Nunca Tem Fim...*** — 6.º e último de estúdio (**15 ago. 2013**, Warner) |
| Single | **14 mai. 2013** — 1.º single do disco |
| Duração | ~6:59 (versão completa) |
| Autoria | **Marcelo Falcão** · **Tom Sabóia** (produção: Tom Sabóia / O Rappa) |
| Infobox a cortar | Alguns resumos listam **Marcelo Yuka** — Yuka saiu em **2001**; esta faixa **não** é dele |
| Clipe | Webclipe de estúdio — **13/14 mai. 2013** · canal O Rappa (${YT_ID}) |
| Áudio | [Spotify](${SPOTIFY}) · [YouTube](${YT}) |
| Circulação citada | Billboard Brasil Hot 100 **#26** · Hot Popular **#3** (2013) — número **data** |
| Tipo BudGanja | Arte — canção cuja locução virou ditado de pátio |
| Não é | Catecismo · [Amor e Fé](${amorFe}) · biografia completa da banda · letra colada |
| Elo | [fé](${amorFe}) (léxico) · [vida](${vidaPalavra}) · [esperança](${esperanca}) · [eu amo a vida](${amo}) |
| Data | ${inspected} |

**O que é o objecto:** a **canção** que fez da frase um refrão nacional. No laboratório: inspecionar o **método** (nomear fé sem ordem; recusar o fim como tese de união). A locução vive na boca; a letra fica na obra.

## 2. Hipóteses e método

**H1:** o valor BudGanja começa no **single de 2013** e no álbum que lhe dá o segundo hemistíquio (*Nunca Tem Fim...*).  
**H2:** a locução de campo é **título + álbum colados** — *pra quem tem fé* (canção) × *nunca tem fim* (disco). Relacionar ≠ fundir com [eu amo a vida](${amo}) (amor em 1.ª pessoa).  
**H3:** Falcão, ao UOL (14 mai. 2013): a faixa veio para **reerguer a banda** após afastamento e briga com empresários; fé = voltar a ser amigos. **Não** é hino confessional.  
**H4:** distinto de [Amor e Fé](${amorFe}): outra geração, outro gesto (acústico de ostentação × rap-rock de reunião). A peça *fé* é a mesma; a **sala** muda.  
**H5:** par de rua com [Girassol](${girassol}) (Cidade Negra) e [Só os Loucos Sabem](${loucos}) (CBJr — Falcão citou [Chorão](${chorao}) no luto da época, **sem** transformar a ficha em epitáfio).  
**H6:** o laboratório **respeita** quem tem fé religiosa; **não** adopta doutrina. [Incrível](${incrivel}) cruza *credere* × *fides* no léxico; aqui o objecto é a **canção**.

## 3. Salas (não misturar)

| Sala | O que é | Ficha |
|------|---------|-------|
| **A. Canção** | Anjos (Pra quem tem fé) — O Rappa, 2013 | **Esta** |
| **B. Locução** | *pra quem tem fé, a vida nunca tem fim* — refrão feito ditado | Gatilho; **não** se cola a letra |
| **C. Álbum** | *Nunca Tem Fim...* | Título do disco — eco, não outra faixa |
| **D. Irmã** | [Amor e Fé](${amorFe}) — Hungria | Outra obra, mesma palavra *fé* |
| **E. Vida** | [vida](${vidaPalavra}) · [eu amo a vida](${amo}) · [Lágrimas da Vida](${lagrimas}) | Léxico / fecho / poema — **não** esta âncora |
| **F. Púlpito** | Catecismo / louvor gospel | **Corte** — Falcão recusou a leitura religiosa |

## 4. Génese — o início de tudo

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **1993** | Forma-se **O Rappa** no Rio — contexto, não centro. |
| **2001** | Marcelo Yuka deixa a banda — **não** assina esta faixa. |
| Pré-2013 | Afastamento, empresários, fé de Falcão em voltar a ser amigos (UOL). Tia doente; violão para a mãe. |
| Turnê *Ao Vivo na Rocinha* | Público pede material novo; *Anjos* e *Auto-Reverse* entram no palco **antes** do disco. |
| **5 mai. 2013** | Prévia no canal oficial. |
| **14 mai. 2013** | Single + webclipe de estúdio. Versão curta para rádio. Monetização citada para o tratamento da tia. |
| **15 ago. 2013** | Álbum ***Nunca Tem Fim...*** (Warner) — último de estúdio. |
| **2023** | Tuyo reimagina a faixa como *Prece* (sample) — afterlife, **não** génese. |

> **Hierarquia:** sem o single de **2013**, não há locução a inspecionar neste pedido. A ficha **não** substitui a vida da banda nem ensina fé.

## 5. A obra (síntese)

- Rap rock brasileiro com reggae/dub: voz de Falcão, banda (Xandão, Lauro, Lobato), produção Tom Sabóia.  
- Tese pública do título: **anjos** + **pra quem tem fé**. Tese do disco: **nunca tem fim**. A boca junta as duas.  
- Tese BudGanja: ofício de **ficar** — [esperança](${esperanca}) de reunião, [respeito](${respeito}) a quem crê, [vida](${vidaPalavra}) nomeada sem recusar o luto.  
- O laboratório **não** reproduz a letra; inspeciona o **método** e o mapa de elos.

## 6. Tese cultural BudGanja

| Tema | Tradução editorial |
|------|-------------------|
| **Fé** | [Esperança](${esperanca}) de ofício — confiança que reúne; **não** bula |
| **Anjos** | Imagem do subconsciente (Falcão) — não ícone de altar nesta ficha |
| **Nunca tem fim** | Recusa do encerramento da banda / da vida como tese de pátio — **não** negação da morte |
| Locução de campo | Ditado que o refrão ensinou à rua |
| Par Hungria | [Amor e Fé](${amorFe}) — outra sala da mesma palavra |
| Contraste Under Pressure | [Under Pressure](${under}) — outro aperto; aqui o par é ficar com fé |

## 7. O que parece × o que é

| Parece | É |
|--------|---|
| Louvor gospel | Canção de reunião da banda — Falcão cortou a leitura religiosa |
| A mesma ficha que [Amor e Fé](${amorFe}) | Outra obra, outro gesto |
| Sinónimo de [eu amo a vida](${amo}) | Irmã de pátio: amar a vida × a vida não acaba para quem tem fé |
| Letra a colar | Direitos — inspeciona-se o método |
| Composição de Yuka | Erro de infobox; Yuka já tinha saído |

## 8. Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra d'O Rappa.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=anjos-pra-quem-tem-fe)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Amor e Fé](${amorFe}) | Irmã — outra *fé*, outro artista |
| [Girassol](${girassol}) · [Só os Loucos Sabem](${loucos}) | Rua BR — reggae / skate-rap |
| [vida](${vidaPalavra}) · [eu amo a vida](${amo}) · [esperança](${esperanca}) | Léxico do refrão |
| [incrível](${incrivel}) | *credere* × *fides* — palavra, não canção |
| [Deus abençoe](${deusAbencoe}) | Elo de léxico — **não** púlpito |
| [Chorão](${chorao}) | Contexto de luto citado por Falcão — outra ficha |
| [Lágrimas da Vida](${lagrimas}) | Vida que chora × vida que não acaba — duas artes |
| [coração](${coracao}) · [caminho](${caminho}) · [gesto](${gesto}) · [emoção](${emocao}) | Ofício de ficar |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não cola a letra.  
- Não é catecismo, louvor nem prova de Deus.  
- Não é biografia completa d'O Rappa nem de Yuka.  
- Não funde esta faixa com [Amor e Fé](${amorFe}).

## Status

**Aprovado** na série Artes — **Anjos (Pra quem tem fé)** (O Rappa, 2013); locução de campo *pra quem tem fé, a vida nunca tem fim*; ≠ púlpito ≠ Hungria. [Valeu !!!](${mantra}).

[▶ Spotify](${SPOTIFY}) · [▶ Clipe](${YT}) · [▶ YouTube Music](${YT_MUSIC}) · [▶ Poema Vida](${vida}#poema=anjos-pra-quem-tem-fe) · [▶ Amor e Fé](${amorFe}) · [▶ Vida](${vidaPalavra}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"Anjos (Pra quem tem fé)"** — **O Rappa**. Field: *para quem tem fé a vida nunca tem fim* · *musica* · *o RAPPA*. The saying is the refrain made proverb; this sheet is the **2013 song** (*Nunca Tem Fim...*, Warner). Writers: **Marcelo Falcão** and **Tom Sabóia**. Distinct from [Amor e Fé](${amorFe}) (Hungria). Falcão refused a religious reading of the hook.

> [Wikipedia](${WIKI}). No affiliation. The lab does **not** paste the lyric. Faith in the title is **not** catechism.

@youtube ${YT_ID}

\`\`\`poem
${poemEn()}
\`\`\`

**Status:** approved in Arts. [Valeu !!!](${mantra})

[▶ Spotify](${SPOTIFY}) · [▶ Clip](${YT}) · [▶ Amor e Fé](${amorFe}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«Anjos (Pra quem tem fé)»** — **O Rappa**. Pedido: *para quem tem fé a vida nunca tem fim* · *musica* · *o RAPPA*. La locución es el estribillo hecho dicho; esta ficha es la **canción de 2013** (*Nunca Tem Fim...*). Autores: **Marcelo Falcão** y **Tom Sabóia**. Distinta de [Amor e Fé](${amorFe}). Falcão rechazó la lectura religiosa.

> [Wikipedia](${WIKI}). Sin afiliación. El laboratorio **no** pega la letra. Fe en el título **no** es catecismo.

@youtube ${YT_ID}

\`\`\`poem
${poemEs()}
\`\`\`

**Estado:** aprobada en Artes. [¡Valeu !!!](${mantra})

[▶ Spotify](${SPOTIFY}) · [▶ Clip](${YT}) · [▶ Amor e Fé](${amorFe}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildAnjosPraQuemTemFePost() {
  const { body, contentEn, contentEs } = buildAnjosPraQuemTemFeBodies();
  return artePost({
    title: 'Inspeção: Anjos (Pra quem tem fé) — O Rappa e a locução que a vida não acaba',
    titleEn: 'Inspection: Anjos (Pra quem tem fé) — O Rappa and the saying that life does not end',
    titleEs: 'Inspección: Anjos (Pra quem tem fé) — O Rappa y la locución de que la vida no acaba',
    excerpt:
      'Artes · O Rappa — Anjos (Pra quem tem fé), 2013, Nunca Tem Fim...; locução pra quem tem fé a vida nunca tem fim; ≠ púlpito ≠ Hungria; Valeu !!!',
    excerptEn:
      'Arts · O Rappa — Anjos (Pra quem tem fé), 2013, Nunca Tem Fim...; saying pra quem tem fé a vida nunca tem fim; ≠ pulpit ≠ Hungria; Valeu !!!',
    excerptEs:
      'Artes · O Rappa — Anjos (Pra quem tem fé), 2013, Nunca Tem Fim...; locución pra quem tem fé a vida nunca tem fim; ≠ púlpito ≠ Hungria; ¡Valeu !!!',
    slug: 'inspecao-arte-anjos-pra-quem-tem-fe',
    date: '2026-08-26T09:40:00.000Z',
    seriesOrder: pickOrder('inspecao-arte-anjos-pra-quem-tem-fe', 117),
    seriesLabel: 'Anjos · O Rappa',
    coverImage: COVER,
    sourceUrl: WIKI,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAnjosPraQuemTemFePost,
  buildAnjosPraQuemTemFeBodies,
  poemPt,
  poemEn,
  poemEs,
  YT_ID,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI,
  COVER
};
