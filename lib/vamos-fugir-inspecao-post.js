'use strict';

/**
 * Artes · canção «Vamos Fugir» (Gilberto Gil + Liminha, 1984).
 * Áudio pedido: Skank / Radiola 2004 — Spotify 7dxK6RSoCWZcb5gobxs1h9.
 * Mapa: Irajá · Marajó · Guaporé · céu azul (céu, não a faixa do Chorão).
 * Sem letra integral.
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

const YT_ID = '6WgTw8UL-1E';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_CLIP = 'https://www.youtube.com/watch?v=fxhrak32GUY';
const SPOTIFY = 'https://open.spotify.com/track/7dxK6RSoCWZcb5gobxs1h9';
const WIKI = 'https://pt.wikipedia.org/wiki/Vamos_Fugir';
const WIKI_GIL = 'https://pt.wikipedia.org/wiki/Ra%C3%A7a_Humana';
const WIKI_SKANK = 'https://pt.wikipedia.org/wiki/Radiola_(%C3%A1lbum)';
const COVER = '/imagens/inspecoes/vamos-fugir-cover.jpg';

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
  return `Vamos Fugir.
Não pedimos a letra emprestada —
pedimos o ofício de sair
sem fingir que o mapa é o destino.

Gil. Liminha. Wailers. Jamaica.
Houve um reggae em 1984
e um convite que não precisa de endereço fechado.
Irajá. Marajó. Guaporé.
Céu azul — o céu,
não a faixa do Chorão.

Skank chegou depois, na radiola.
A génese continua a ser o reggae.
Valeu !!!
com o passo ao sol,
sem transformar fuga em receita.`;
}

function poemEn() {
  return `Vamos Fugir.
We do not borrow the lyric —
we ask for the craft of leaving
without pretending the map is the destination.

Gil. Liminha. Wailers. Jamaica.
There was a reggae in 1984
and an invitation that does not need a locked address.
Irajá. Marajó. Guaporé.
Blue sky — the sky,
not Chorão’s song title.

Skank came later, on the radiola.
Genesis remains the reggae.
Valeu !!!`;
}

function poemEs() {
  return `Vamos Fugir.
No pedimos prestada la letra —
pedimos el oficio de salir
sin fingir que el mapa es el destino.

Gil. Liminha. Wailers. Jamaica.
Hubo un reggae en 1984
y una invitación sin dirección cerrada.
Irajá. Marajó. Guaporé.
Cielo azul — el cielo,
no la canción de Chorão.

Skank llegó después.
La génesis sigue siendo el reggae.
¡Valeu !!!`;
}

function buildVamosFugirBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const self = '/posts/post-inspecao-arte-vamos-fugir.html';
  const marajo = '/posts/post-inspecao-palavra-marajo.html';
  const guapore = '/posts/post-inspecao-palavra-guapore.html';
  const ceuAzul = '/posts/post-inspecao-arte-ceu-azul.html';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const birds = '/posts/post-inspecao-personagem-three-little-birds.html';
  const vevo = '/posts/post-inspecao-canal-vevo.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da canção **[Vamos Fugir](${self})** — composição de **Gilberto Gil** e **Liminha** (*Raça Humana*, **1984**), gravada com **The Wailers**. Pedido de campo: [Spotify](${SPOTIFY}) (\`7dxK6RSoCWZcb5gobxs1h9\`) — essa ID é a versão **[Skank](${WIKI_SKANK})** (*Radiola*, **2004**), não o fonograma de 1984. Pedidos seguintes: *cidade Maraj* · *Guapore* · *Céu Azul música Chorão*. O laboratório **corta**: **[Marajó](${marajo})** e **[Guaporé](${guapore})** estão no **mapa da letra** (topónimos); **céu azul** na canção de Gil é o **céu**; **[Céu Azul](${ceuAzul})** do [Chorão](${chorao}) é **outra obra**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Vamos Fugir](${WIKI}), [Raça Humana](${WIKI_GIL}), [Radiola](${WIKI_SKANK}). Crédito: Gilberto Gil / Arnolpho Lima Filho (Liminha) — Warner 1984; versão Skank — Sony 2004. **Sem afiliação.** **Ficha ≠ letra integral, ≠ biografia de Gil, ≠ catálogo Skank, ≠ campanha comercial.** A circumstância Rider 2004 explica *por que* o Skank gravou; não é vitrine. Distinto de fuga como receita: convite afectivo / reggae, não protocolo de desaparecer.

@youtube ${YT_ID}

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Vamos Fugir** |
| Génese | **Gilberto Gil** · **Liminha** — *Raça Humana* (**1984**), com **The Wailers** |
| Áudio pedido | **Skank** — *Radiola* (**2004**) · [Spotify](${SPOTIFY}) |
| Meio | Canção / reggae (génese) · pop-rock BR (versão 2004) |
| Outras versões citadas | Daúde / Djavan (1997) · Natiruts com Gil (2015) — **ecos**, não âncora |
| Tipo BudGanja | Arte — **obra 1984 primeiro**; Skank = fonograma pedido |
| Elo mapa | [Marajó](${marajo}) · [Guaporé](${guapore}) · Irajá (bairro RJ — nesta ficha) |
| Elo céu | Motivo **céu azul** ≠ faixa [Céu Azul](${ceuAzul}) (CBJR / [Chorão](${chorao})) |
| Elo reggae | [Three Little Birds](${birds}) · [VEVO](${vevo}) (rede, não génese) |
| Elo ofício | [caminho](${caminho}) · [sol](${sol}) · [luz](${luz}) · [alegria](${alegria}) · [Valeu !!!](${mantra}) |
| Fonte | [Vamos Fugir](${WIKI}) · [Spotify Skank](${SPOTIFY}) · [áudio 1984](${YT}) |
| Data | ${inspected} |

**Objecto:** o **convite a sair** e o **mapa BR** que o acompanha. O destino nomeado (Irajá / Marajó / Guaporé / céu) é **exemplo**, não GPS.

## 2. Hierarquia — 1984 × 2004

| Camada | O que é | O que não é |
|--------|---------|-------------|
| **Génese 1984** | Gil + Liminha + Wailers · Jamaica / reggae | A ID Spotify pedida |
| **Skank 2004** | Cover em *Radiola* — **é** o Spotify \`7dxK6RSoCWZcb5gobxs1h9\` | A composição original |
| **Clipe Gil** | [Viajando com os Gil](${YT_CLIP}) — eco visual | Substituição da obra |
| **Liminha** | Co-autor aqui; mais tarde **produtor** de *Música Popular Caiçara* ([Céu Azul](${ceuAzul})) | A mesma faixa |

**H1:** sem **1984**, o Skank não tem o que regravar.  
**H2:** o Spotify pedido **inspeciona-se** como versão viva BR; não apaga o Wailers.  
**H3:** Liminha é **ponte de ofício** com [Céu Azul](${ceuAzul}) — produtor lá, co-autor aqui — **não** cola as duas letras.

## 3. Mapa da letra (topónimos — sem citar verso)

O laboratório **não** cola a letra. Lê o **mapa**:

| Nome na canção | Sala | Corte |
|----------------|------|-------|
| **Irajá** | Bairro da Zona Norte do Rio | Lugar comum / perto — não é ilha |
| **[Marajó](${marajo})** | Ilha / arquipélago (PA) — *não* é «uma cidade» | Pedido *Maraj* |
| **[Guaporé](${guapore})** | Rio (fronteira) **e** município (RS) | Pedido *Guapore* — a canção não escolhe o qual |
| **céu azul** | Céu / [sol](${sol}) / [luz](${luz}) | **≠** título [Céu Azul](${ceuAzul}) do [Chorão](${chorao}) |

**H4:** *cidade Maraj* é lapso de **Marajó**. Marajó **não** é um município único: é ilha + arquipélago (várias sedes; Breves é a mais populosa).  
**H5:** os topónimos dizem «qualquer outro lugar ao sol» — o ofício é **partir juntos**, não inventariar o IBGE.

## 4. Céu azul × Céu Azul (Chorão)

| Forma | Sala |
|-------|------|
| **céu azul** em *Vamos Fugir* | Motivo do céu no destino |
| **[Céu Azul](${ceuAzul})** | Canção CBJR (**2011/12**) — Chorão + Thiago Castanho |
| **Liminha** | Co-escreveu *Vamos Fugir*; produziu o disco onde entra *Céu Azul* |

A orelha cola. O catálogo **corta**.

## 5. Rede

| Recurso | Papel |
|---------|-------|
| [Marajó](${marajo}) · [Guaporé](${guapore}) | Palavras-lugar do mapa |
| [Céu Azul](${ceuAzul}) · [Chorão](${chorao}) · [Só os Loucos Sabem](${loucos}) | Outra sala musical |
| [Three Little Birds](${birds}) | Reggae / Wailers como elo, não como letra |
| [caminho](${caminho}) · [alegria](${alegria}) · [vida](${vidaPalavra}) | Léxico de sair sem receita |

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=vamos-fugir)

## Status

**Aprovado** — génese **Gil + Liminha + Wailers (1984)**; áudio pedido = **Skank 2004** (\`7dxK6RSoCWZcb5gobxs1h9\`); mapa **Irajá / Marajó / Guaporé**; **céu azul ≠ Céu Azul** do Chorão. [Valeu !!!](${mantra})

[▶ Spotify Skank](${SPOTIFY}) · [▶ Áudio 1984](${YT}) · [▶ Clipe Gil](${YT_CLIP}) · [▶ Marajó](${marajo}) · [▶ Guaporé](${guapore}) · [▶ Céu Azul](${ceuAzul}) · [▶ Artes](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**Vamos Fugir** — **Gilberto Gil** and **Liminha** (*Raça Humana*, **1984**, with **The Wailers**). Requested Spotify \`${SPOTIFY}\` is the **Skank** cover (*Radiola*, **2004**), not the 1984 tape.

Place-names in the lyric map: **Irajá**, **[Marajó](${marajo})**, **[Guaporé](${guapore})**. **Blue sky** in this song is the **sky**. **[Céu Azul](${ceuAzul})** (Charlie Brown Jr. / Chorão) is a **different** work. Liminha co-wrote this and later produced the CBJR live album that carries *Céu Azul*.

No full lyric. [Wikipedia](${WIKI}).

@youtube ${YT_ID}

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Vamos Fugir** — **Gilberto Gil** y **Liminha** (*Raça Humana*, **1984**, con **The Wailers**). El Spotify pedido es la versión **Skank** (*Radiola*, **2004**).

Topónimos: **Irajá**, **[Marajó](${marajo})**, **[Guaporé](${guapore})**. El **cielo azul** de esta canción no es **[Céu Azul](${ceuAzul})** de Chorão.

Sin letra íntegra. [Wikipedia](${WIKI}).

@youtube ${YT_ID}

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildVamosFugirPost() {
  const { body, contentEn, contentEs } = buildVamosFugirBodies();
  return artePost({
    title: 'Inspeção: Vamos Fugir — Gil 1984, Skank na radiola, mapa Marajó × Guaporé',
    titleEn: 'Inspection: Vamos Fugir — Gil 1984, Skank on the radiola, Marajó × Guaporé map',
    titleEs: 'Inspección: Vamos Fugir — Gil 1984, Skank en la radiola, mapa Marajó × Guaporé',
    excerpt:
      'Artes: Vamos Fugir (Gil + Liminha, 1984; Skank 2004 no Spotify pedido) — Irajá / Marajó / Guaporé; céu azul ≠ Céu Azul do Chorão; Valeu !!!',
    excerptEn:
      'Arts: Vamos Fugir (Gil + Liminha, 1984; requested Spotify is Skank 2004) — Irajá / Marajó / Guaporé; blue sky ≠ Chorão’s Céu Azul; Valeu !!!',
    excerptEs:
      'Artes: Vamos Fugir (Gil + Liminha, 1984; Spotify pedido = Skank 2004) — Irajá / Marajó / Guaporé; cielo azul ≠ Céu Azul de Chorão; ¡Valeu !!!',
    slug: 'inspecao-arte-vamos-fugir',
    date: '2026-08-23T18:10:00.000Z',
    seriesOrder: pickOrder('inspecao-arte-vamos-fugir', 90),
    seriesLabel: 'Vamos Fugir · Artes',
    coverImage: COVER,
    sourceUrl: WIKI,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildVamosFugirPost,
  buildVamosFugirBodies,
  poemPt,
  poemEn,
  poemEs,
  YT_ID,
  YT,
  YT_CLIP,
  SPOTIFY,
  WIKI,
  COVER
};
