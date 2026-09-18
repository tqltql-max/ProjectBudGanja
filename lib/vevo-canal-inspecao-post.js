'use strict';

/**
 * Inspeção Canais · VEVO — rede de videoclipes oficiais (YouTube) e elo Artes / Rádio.
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
    series: opts.series || 'canal-vevo',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Canais',
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

function buildVevoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const wiki = 'https://en.wikipedia.org/wiki/Vevo';
  const ytHub = 'https://www.youtube.com/@VEVO';
  const site = 'https://www.vevo.com/';
  const seedId = 'HNBCVM4KbUM';
  const seedYt = 'https://www.youtube.com/watch?v=' + seedId;
  const bob = 'https://www.youtube.com/@BobMarleyVEVO';
  const rusted = 'https://www.youtube.com/@RustedRootVEVO';
  const cbjr = 'https://www.youtube.com/@charliebrownjrVEVO';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const birds = '/posts/post-inspecao-personagem-three-little-birds.html';
  const brisa = '/posts/post-inspecao-personagem-dj-brisa.html';
  const radio = '/radio/';
  const vida = '/vida/';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const disney = '/posts/post-inspecao-canal-disneyjr.html';
  const movrecam = '/posts/post-inspecao-canal-movrecam.html';
  const canabinall = '/posts/post-inspecao-canal-canabinall.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';

  const body = `## Escopo

Inspeção editorial da **rede VEVO** — plataforma de **videoclipes oficiais** das grandes gravadoras, alojada sobretudo no YouTube. No laboratório BudGanja **não** é um canal parceiro de aulas (como [MovReCam](${movrecam}) ou [CANABinALL](${canabinall})): é a **infraestrutura de clipes licenciados** que alimenta embeds e faixas da [BudGanja Radio](${radio}) e das fichas [Artes](${artes}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Vevo](${wiki}); hub [YouTube @VEVO](${ytHub}); canais-artista com sufixo **VEVO** (ex. [BobMarleyVEVO](${bob}), [RustedRootVEVO](${rusted}), [charliebrownjrVEVO](${cbjr})). Crédito: Vevo / Universal Music Group / Sony Music / Warner Music e titulares das obras — **sem afiliação**. Ficha ≠ inventário de todos os canais *VEVO nem endosso comercial. **Hierarquia:** a **canção** (Artes) vem primeiro; o canal VEVO é **transporte oficial** do clipe, não génese da obra.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **VEVO** (também Vevo) |
| Tipo | Rede / marca de **videoclipes oficiais** (não um único artista) |
| Hub YouTube | [@VEVO](${ytHub}) |
| Site | [vevo.com](${site}) |
| Lançamento | **8 de dezembro de 2009** (joint venture UMG + Sony; EMI no arranque; Warner em licença posterior) |
| Forma no YouTube | Canais por artista com sufixo **VEVO** + hub de marca |
| Missão (leitura BudGanja) | Garantir **fonte oficial** do clipe quando o laboratório cita ou adapta música |
| Tipo BudGanja | Canal — **rede musical**; elo Artes · Rádio · Vida |
| Vídeo âncora (lab) | [Three Little Birds — BobMarleyVEVO](${seedYt}) |
| Elos Artes | [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) |
| Elos Vida / Rádio | [Three Little Birds](${birds}) · [DJ Brisa](${brisa}) · [Rádio](${radio}) |
| Distinto de | [Disney Jr.](${disney}) (desenhos) · MovReCam / CANABinALL (formação) |
| Fonte de partida | [Wikipedia · Vevo](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o sufixo **VEVO** no handle YouTube sinaliza canal **oficial de gravadora** — clipes licenciados, não fan upload.  
**H2:** no BudGanja, VEVO é **meio** (embed / MP3 derivado); a ficha de **Arte** inspeciona a **obra**; esta ficha de **Canal** inspeciona a **rede**.  
**H3:** *Three Little Birds* (BobMarleyVEVO) é a âncora de laboratório porque cruza [Rádio](${radio}), personagem [Three Little Birds](${birds}) e vibe [DJ Brisa](${brisa}) / [Vida](${vida}).  
**H4:** *Send Me On My Way* e *Só os Loucos Sabem* continuam a ser **Artes primeiro** — VEVO só documenta o transporte audiovisual oficial.

Passos: (1) fixar génese da rede (2009, gravadoras); (2) declarar papel BudGanja (transporte oficial); (3) mapear canais *VEVO já citados no site; (4) âncora + elos; (5) status.

## O que é a VEVO (síntese)

- Serviço multinacional de **streaming de videoclipes** lançado em **2009**, pensado como destino premium de música (parceria com YouTube desde o dia um).  
- Propriedade / licenças históricas: **Universal**, **Sony** (e EMI no arranque); **Warner** entrou depois com conteúdo premium.  
- Depois de 2018, o peso principal passou para a **rede de canais no YouTube** (e plataformas parceiras), mais do que um destino autónomo tipo Hulu.  
- No ecrã do utilizador: canais \`ArtistNameVEVO\` + hub [@VEVO](${ytHub}).

## Relação com o laboratório BudGanja

| Canal / clipe VEVO | Papel no site |
|--------------------|---------------|
| [BobMarleyVEVO](${bob}) · *Three Little Birds* | Faixa na [Rádio](${radio}); eco narrativo em [Three Little Birds](${birds}) / [DJ Brisa](${brisa}) |
| [RustedRootVEVO](${rusted}) · *Send Me On My Way* | Embed e memória audiovisual da ficha [Artes fundadora](${sendMe}); léxico [caminho](${caminho}) / [passar](${passar}) |
| [charliebrownjrVEVO](${cbjr}) · *Só os Loucos Sabem* (ao vivo) | Embed da adaptação ao vivo na ficha [Só os Loucos Sabem](${loucos}) |

> **Hierarquia:** sem a **canção** (álbum, créditos, tese cultural) não há Artes. Sem **VEVO** (ou outro canal oficial) o laboratório perde a referência audiovisual licenciada — mas **não** inventa a obra.

## Vídeo âncora (embed)

@youtube ${seedId}

| Campo | Valor |
|-------|-------|
| Título | Bob Marley & The Wailers — Three Little Birds (Official Music Video) |
| Canal | BobMarleyVEVO |
| ID | \`${seedId}\` |
| URL | [${seedYt}](${seedYt}) |
| Nota | Âncora de **rede VEVO × laboratório**; a obra reggae e o personagem Vida têm fichas próprias |

## Como usar no site

1. Quando uma ficha Artes citar um clipe, preferir o canal **\*VEVO** (ou outro oficial) e declarar que o objecto principal é a **obra**.  
2. Abrir [Rádio](${radio}) para ouvir adaptações locais; não confundir MP3 do site com origem da canção.  
3. Cruzar com [Send Me On My Way](${sendMe}), [Só os Loucos Sabem](${loucos}) e [Three Little Birds](${birds}).  
4. Não misturar VEVO com hubs de formação ([MovReCam](${movrecam}), [CANABinALL](${canabinall})) nem com [Disney Jr.](${disney}).

## Status

**Aprovado** — rede **VEVO** documentada como canal/meta de **videoclipes oficiais** no BudGanja; âncora *Three Little Birds* (BobMarleyVEVO); elos Artes e Rádio/Vida; distinto de canais de extensão e de desenhos.

[▶ @VEVO](${ytHub}) · [▶ Rádio](${radio}) · [▶ Send Me On My Way](${sendMe}) · [▶ Só os Loucos Sabem](${loucos}) · [▶ Three Little Birds](${birds}) · [▶ Canais](${hub})
`;

  const contentEn = `## Scope

Editorial inspection of the **VEVO network** — official **music-video** platform from major labels, mostly on YouTube. In BudGanja it is **not** a partner lecture channel ([MovReCam](${movrecam}), [CANABinALL](${canabinall})): it is the **licensed clip infrastructure** behind [Radio](${radio}) and [Arts](${artes}) embeds.

> **Method note:** independent audit. Sources: [Wikipedia · Vevo](${wiki}); [@VEVO](${ytHub}); artist channels with **VEVO** suffix. Credit: Vevo / labels / rights holders — **no affiliation**. **Hierarchy:** the **song** (Arts) comes first; VEVO is official **transport**, not the work’s genesis.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **VEVO** |
| Type | Official music-video **network** (not one artist) |
| YouTube hub | [@VEVO](${ytHub}) |
| Launch | **8 Dec 2009** (UMG + Sony; EMI early; Warner later) |
| Lab anchor | [Three Little Birds — BobMarleyVEVO](${seedYt}) |
| Arts links | [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) |
| Date | ${inspected} |

## Lab role

| VEVO channel / clip | Site role |
|---------------------|-----------|
| BobMarleyVEVO · *Three Little Birds* | [Radio](${radio}); [Three Little Birds](${birds}) / [DJ Brisa](${brisa}) |
| RustedRootVEVO · *Send Me On My Way* | AV reference for [founding Arts sheet](${sendMe}) |
| charliebrownjrVEVO · *Só os Loucos Sabem* | Live embed on [Só os Loucos Sabem](${loucos}) |

@youtube ${seedId}

## Status

**Approved** — VEVO as official music-video network in BudGanja; anchor *Three Little Birds*; Arts and Radio/Vida links.

[▶ @VEVO](${ytHub}) · [▶ Radio](${radio}) · [▶ Arts](${artes})
`;

  const contentEs = `## Alcance

Inspección editorial de la **red VEVO** — plataforma de **videoclipes oficiales** de las grandes discográficas, alojada sobre todo en YouTube. En BudGanja **no** es un canal de clases ([MovReCam](${movrecam}), [CANABinALL](${canabinall})): es la **infraestructura de clips licenciados** detrás de [Radio](${radio}) y [Artes](${artes}).

> **Nota metodológica:** auditoría independiente. Fuentes: [Wikipedia · Vevo](${wiki}); [@VEVO](${ytHub}); canales con sufijo **VEVO**. Crédito: Vevo / sellos — **sin afiliación**. **Jerarquía:** la **canción** (Artes) primero; VEVO es **transporte** oficial.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **VEVO** |
| Tipo | **Red** de videoclips oficiales |
| Hub YouTube | [@VEVO](${ytHub}) |
| Lanzamiento | **8 dic 2009** |
| Ancla lab | [Three Little Birds — BobMarleyVEVO](${seedYt}) |
| Elos Artes | [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) |
| Fecha | ${inspected} |

@youtube ${seedId}

## Estado

**Aprobada** — red VEVO como canal/meta de videoclips oficiales; ancla *Three Little Birds*; vínculos Artes y Radio/Vida.

[▶ @VEVO](${ytHub}) · [▶ Radio](${radio}) · [▶ Artes](${artes})
`;

  return { body, contentEn, contentEs, seedId, wiki };
}

function buildVevoCanalPost(seriesOrder) {
  const { body, contentEn, contentEs, seedId, wiki } = buildVevoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 13;
  return artePost({
    title: 'Inspeção: canal VEVO — rede de videoclipes oficiais',
    titleEn: 'Inspection: VEVO channel — official music-video network',
    titleEs: 'Inspección: canal VEVO — red de videoclips oficiales',
    excerpt:
      'Canais: VEVO — rede de clipes oficiais no YouTube; âncora Three Little Birds (BobMarleyVEVO); elos Artes e Rádio.',
    excerptEn:
      'Channels: VEVO — official YouTube music-video network; anchor Three Little Birds (BobMarleyVEVO); Arts and Radio links.',
    excerptEs:
      'Canales: VEVO — red de clips oficiales en YouTube; ancla Three Little Birds (BobMarleyVEVO); vínculos Artes y Radio.',
    slug: 'inspecao-canal-vevo',
    date: '2026-08-04T00:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'VEVO · Canais',
    coverImage: '/imagens/inspecoes/vevo-canal-cover.jpg',
    sourceUrl: wiki,
    videoId: seedId,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildVevoCanalPost,
  buildVevoBodies
};
