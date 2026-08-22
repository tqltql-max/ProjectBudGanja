'use strict';

/**
 * Artes · série: The Chosen / Os Escolhidos (2019–).
 * Génese: Evangelhos canónicos; série = dramatização multi-temporada.
 * Recorte: ministério pelos olhos de quem encontrou Jesus.
 * Distinta de A Paixão de Cristo (2004) — outro recorte, outro ecrã.
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

const YT_ID = 'K1-FoFj8Jbo';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://pt.wikipedia.org/wiki/The_Chosen';
const WIKI_EN = 'https://en.wikipedia.org/wiki/The_Chosen_(TV_series)';
const WATCH = 'https://watch.thechosen.tv/';
const SITE = 'https://www.thechosen.tv/';
const APP = 'https://www.thechosen.tv/en-us/app';
const YT_CH = 'https://www.youtube.com/c/TheChosenSeries';
const PLAY = 'https://play.google.com/store/apps/details?id=net.comeandsee.thechosen';
const SITE_BR = 'https://osescolhidos.tv/';
const APP_FICHA = '/posts/post-inspecao-app-the-chosen.html';
const PAIXAO = '/posts/post-inspecao-filme-a-paixao-de-cristo.html';
const SANTA = '/posts/post-inspecao-arte-santa-ceia.html';

function buildBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const filho = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const jesusudavi = '/posts/post-inspecao-expressao-jesusudavi.html';
  const templo = '/posts/post-inspecao-expressao-templo-de-cristo-corpo-e-alma.html';
  const amorFe = '/posts/post-inspecao-arte-amor-e-fe.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const gibson = '/posts/post-inspecao-figura-mel-gibson.html';

  const body = `## Escopo

Inspeção editorial da série **«The Chosen»** — no Brasil e em Portugal, **The Chosen — Os Escolhidos** (**2019–**, em curso). Criada, realizada e coescrita por **Dallas Jenkins** (5&2 Studios). O **início de tudo** é o **texto canónico**: os Evangelhos de Mateus, Marcos, Lucas e João. A série é **dramatização multi-temporada** do ministério — Jesus visto pelos olhos de quem o encontrou — **não** o Evangelho, **não** catecismo, **não** acta do século I.

O piloto *The Shepherd* (24 dez. **2017**, Facebook) testa o recorte. A 1.ª temporada estreia **21 abr. 2019** (VidAngel). Cinco temporadas lançadas; a 6.ª (Paixão / um dia narrativo) anunciada para o fim de **2026**; a 7.ª (fecho) em filmagem.

[A Paixão de Cristo](${PAIXAO}) (2004) tem ficha **própria** — outro recorte (últimas horas), outro ecrã, outro ofício. Não misturar.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · The Chosen](${WIKI}), [Wikipedia (EN)](${WIKI_EN}), trailer oficial (${YT}), [site](${SITE}), [player oficial](${WATCH}). Crédito: Jenkins / Thompson / Swanson / 5&2 / Come and See / Angel (VidAngel) / elenco — **sem afiliação**. Distinto do [Legado](${legado}) canábico. **Dramatização ≠ manual teológico, histórico ou de violência.** Sem proselitismo. Sem vida privada inventada. O laboratório **não** hospeda a série nem aponta cópias piratas.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título BR / PT | **The Chosen — Os Escolhidos** |
| Título original | *The Chosen* |
| Anos | **2019–** (piloto 2017; 1.ª temp. 21 abr. 2019) |
| Génese | **Evangelhos canónicos** — ministério de Jesus; backstories declaradas no genérico |
| Criação / realização | **Dallas Jenkins** |
| Argumento | Dallas Jenkins · Tyler Thompson · Ryan Swanson |
| Música | **Matthew S. Nelson** · **Dan Haseltine** (Jars of Clay) |
| Produção | 5&2 Studios · Come and See Foundation (traduções / financiamento) |
| Temporadas / episódios | **5** lançadas (~40–42 eps nas fontes) · **7** planeadas |
| Tipo BudGanja | Arte — **texto canónico primeiro**; série como dramatização |
| Elenco âncora | Jonathan Roumie (Jesus) · Shahar Isaac (Simão Pedro) · Elizabeth Tabish (Madalena) · Paras Patel (Mateus) · Noah James (André) · George H. Xanthis (João) |
| Elo Palavras / expressões | [filho de deus](${filho}) · [caminho](${caminho}) · [respeito](${respeito}) · [verdade](${verdade}) · [vida](${vida}) · [alma](${alma}) |
| **App oficial (ficha própria)** | [Inspeção: app The Chosen](${APP_FICHA}) — Play \`net.comeandsee.thechosen\` |
| Porta BR | [osescolhidos.tv](${SITE_BR}) — landing; o player é o **app** |
| Ficha irmã (separada) | [A Paixão de Cristo](${PAIXAO}) — filme 2004; **não** misturar |
| Fonte | [Wikipédia](${WIKI}) · [EN](${WIKI_EN}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa nos **Evangelhos**; a série **escolhe um recorte** (ministério, discípulos, o ordinário da Galileia) e declara backstories no genérico.  
**H2:** *Os Escolhidos* no título BR/PT são os que encontram Jesus — não um clube fechado do laboratório.  
**H3:** o modelo **grátis no app/site oficial** (crowdfunding, pay-it-forward, janelas de exclusividade) é **ofício de distribuição**, não milagre nem obrigação de doar.  
**H4:** [A Paixão de Cristo](${PAIXAO}) é **outro recorte** (via-sacra, violência gráfica). The Chosen **não** a substitui; a Paixão **não** absorve a série.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor *desta* dramatização *deste* texto, sem púlpito.

## O início de tudo — o texto e o piloto

Jenkins, depois de *The Resurrection of Gavin Stone* (2017), constata que não havia série multi-temporada sobre Jesus para «maratonar». Escreve o curto *The Shepherd* (Quinta de um amigo em Marengo, Illinois; culto de Natal em Elgin). VidAngel propõe o Facebook como piloto: mais de 15 milhões de visualizações, nas fontes.

Crowdfunding com equity (JOBS Act): ~US$ 11 milhões, mais de 16 mil investidores — nas fontes, o maior crowdfunding de série de TV até então. Temporadas seguintes: pay-it-forward (Angel) e, depois, a **Come and See Foundation** (donativos dedutíveis; traduções). Em **2024–25**, disputa legal com Angel e acordo Amazon MGM (estreia em cinema + 90 dias no Prime Video antes do grátis) **registam-se como facto de ofício** — o laboratório **não** toma partido comercial.

O genérico da 1.ª temporada declara: baseado nas histórias verdadeiras dos Evangelhos; alguns lugares e tempos condensados; backstories e diálogos acrescentados; o espectador é **convidado a ler os Evangelhos**. Consultores de tradições distintas (rabino messiânico, padre católico, académico protestante; na 4.ª, conselheiro judeu ortodoxo) entram como **camada de contexto** — não como cânone.

## A obra — cinco temporadas e o mapa

Não se inventaria cada milagre. Lê-se o **padrão**: Jesus pelos olhos de pescadores, publicano, Madalena, fariseus, romanos — [caminho](${caminho}) de quem é chamado, não biopic de um cartaz.

| Temporada | Recorte (mapa, não spoiler de cada cena) |
|-----------|------------------------------------------|
| 1 (2019) | Chamados na Galileia; Cana; Nicodemos; Samaria |
| 2 (2021) | O grupo cresce; Sermão da Montanha à vista |
| 3 (2022–23) | Doze dois a dois; pães e peixes; o mar |
| 4 (2024) | Último ano do ministério; Lázaro; rumo a Jerusalém |
| 5 (2025) | Semana Santa até à [Santa Ceia](${SANTA}) no ecrã e à prisão |
| 6 (anunciada, fim de 2026) | Paixão / um dia narrativo — **eco futuro**; não objecto fechado aqui |
| 7 (em filmagem) | Fecho anunciado — fora do núcleo desta ficha |

Filmagem: Texas (Pooleville / Weatherford; depois Midlothian) e Utah (set de Jerusalém; Goshen). Crucificação da 6.ª: Matera, Itália, nas fontes. Elenco com diversidade de origens — Jenkins recusou o Jesus «estrela branca de cartaz» como único mapa do século I.

Recepção: audiência global nas centenas de milhões (números de produtores / app **variam** entre análises — o laboratório **não** fecha um censo). Acolhimento forte em meios cristãos; críticas a liberdade dramática, a consultores e a aspectos de produção **registam-se**. O lab **documenta**; **não** julga a fé de quem assiste.

Ecos (fora do núcleo): *The Chosen Adventures* (animação), *The Chosen in the Wild* (Bear Grylls), romances de Jerry B. Jenkins, gráficos, estudos. Esta ficha é a **série**.

## Tese cultural BudGanja

| Tema na série | Tradução editorial |
|---------------|-------------------|
| «Come and see» | Convite — [gesto](${gesto}) de ver, não ordem |
| Os escolhidos | Quem encontra o [caminho](${caminho}); não clube do laboratório |
| [Filho de Deus](${filho}) | Título já fichado como **expressão**; aqui o ecrã é dramatização |
| Ministério no ordinário | Mesa, rede, imposto, coxear — [vida](${vida}) antes do cartaz da cruz |
| Madalena / Pedro / Mateus | Presenças com backstory **declarada** — [respeito](${respeito}), não fofoca evangélica |
| Contraste Paixão 2004 | [A Paixão de Cristo](${PAIXAO}) = últimas horas; esta série = anos de ministério |
| [Santa Ceia](${SANTA}) | Mural de Leonardo = **outra** ficha; a 5.ª temporada é ecrã, não o fresco |
| Grátis no oficial | Ofício de distribuição — **não** domínio público nem licença para pirataria |

O laboratório **não** evangeliza nem «desmente» a fé. Usa a ficha para **separar texto, série, púlpito e sítio onde se assiste**.

## Elenco — crédito, não centro

| Pessoa | Papel | Nota |
|--------|-------|------|
| **Jonathan Roumie** | Jesus | O corpo do recorte; pessoa ≠ figura de culto do laboratório |
| **Shahar Isaac** | Simão Pedro | O pescador chamado — ofício no ecrã |
| **Elizabeth Tabish** | Maria Madalena | Presença de quem fica; não redução a um só episódio |
| **Paras Patel** | Mateus | O publicano — número e mesa |
| **Noah James** | André | Irmão / chamado |
| **George H. Xanthis** | João | Um dos doze no recorte |
| **Dallas Jenkins** | Criação / realização | Autor da **série** — sem ficha Pessoas neste passo |
| **Jim Caviezel** | — | Jesus de [A Paixão de Cristo](${PAIXAO}) — **outro** ecrã |

## Onde assistir (snapshot ${inspected}, Brasil)

O laboratório **indica caminhos legais** e **data o snapshot**. Catálogos mudam; confirmar no player **antes** de assistir. **Não** se aponta site pirata, Telegram, Drive nem «link completo grátis» de terceiros.

**Destaque:** a via âncora é o **[app oficial](${APP_FICHA})** — ficha própria, listing [Play](${PLAY}) (\`net.comeandsee.thechosen\`).

| Caminho | Papel | Nota |
|---------|-------|------|
| **[App The Chosen](${APP_FICHA})** ([Play](${PLAY}) · [hub](${APP})) | Via **oficial gratuita** âncora | Ficha do **aplicativo**; iOS, Android, Roku, Fire TV, Apple TV |
| **[watch.thechosen.tv](${WATCH})** | Player **oficial** no browser | Mesma casa que o app |
| **[osescolhidos.tv](${SITE_BR})** | Landing **The Chosen Brasil** | Porta / FAQ / igrejas — **não** substitui o app |
| **[thechosen.tv](${SITE})** | Site da produção | App, loja, extras — não substitui o player |
| **[YouTube · The Chosen](${YT_CH})** | Trailer, extras, episódios **que a casa publicar** | Completude **varia**; não assumir a série inteira |
| **Prime Video** | Catálogo **pago**; janela de exclusividade nas temporadas novas (S5+ nas fontes: ~90 dias) | Confirmar temporadas no app BR |
| **Netflix** (catálogo BR, nas fontes de 2026) | Catálogo **pago** | Confirmar temporadas no app BR |
| **SBT / +SBT** | Exibição / VOD **variável** | Programação muda — verificar na casa |
| Cinema (Fathom / estreias de temporada) | Janela teatral de alguns blocos | Eco; não é o sítio do dia-a-dia |

**Como escolher:** quem quer **grátis e oficial** começa no **[app](${APP_FICHA})** ou em [watch.thechosen.tv](${WATCH}). Quem chegou por anúncio em [osescolhidos.tv](${SITE_BR}) instala o app — não procura um terceiro site. Quem já paga Netflix ou Prime confirma o catálogo **nessa** conta. Dublagem e legendas em português: verificar no player escolhido.

Temporadas **mais novas** podem estar primeiro no Prime (exclusividade) e só depois no app grátis — isto é **janela comercial**, não censura.

## Vídeo de referência (embed)

Trailer oficial HD (canal The Chosen, 2019) — @youtube ${YT_ID}

| Campo | Valor |
|-------|-------|
| Título | The Chosen \\| Official Trailer HD |
| ID | \`${YT_ID}\` |
| URL | [${YT}](${YT}) |
| Nota | Embed da **dramatização**; a génese é o texto canónico. Assistir a série: [player oficial](${WATCH}) |

## Elos

| Recurso | Papel |
|---------|-------|
| [app The Chosen](${APP_FICHA}) | **Player oficial** — Play / iOS; ficha própria |
| [filho de deus](${filho}) | Expressão — título, oralidade, dignidade; sem proselitismo |
| [caminho](${caminho}) · [gesto](${gesto}) · [respeito](${respeito}) | Chamado, convite, tratamento de povos e textos |
| [verdade](${verdade}) · [vida](${vida}) · [alma](${alma}) · [coração](${coracao}) · [esperança](${esperanca}) | Léxico do ministério sem virar sermão |
| [A Paixão de Cristo](${PAIXAO}) | **Ficha separada** — 2004; últimas horas; [Mel Gibson](${gibson}) noutro sítio |
| [Santa Ceia](${SANTA}) | Mural (Leonardo) — **outra** arte; a 5.ª temporada não o substitui |
| [Amor e Fé](${amorFe}) | Canção — ofício de ficar; não púlpito |
| [jesusamado](${jesusamado}) · [jesusudavi](${jesusudavi}) · [templo de Cristo](${templo}) | Oralidade / fórmula — **não** são a série |
| [Valeu !!!](${mantra}) | O melhor *deste* recorte |

> Abrir esta ficha para a **série**. Abrir [app The Chosen](${APP_FICHA}) para o **player**. Abrir [A Paixão de Cristo](${PAIXAO}) para **esse** filme. Abrir os Evangelhos para o **texto**. Não fundir série, app, filme e púlpito.

## Limites

- Não é catecismo, homilia, harmonia evangélica nem inventário de cada milagre.  
- Backstory de personagem **não** é facto canónico — o genérico declara a liberdade.  
- Não se reproduz violência nem se aponta pirataria.  
- Números de audiência e de idiomas: claims de produtores — **datar e atribuir**.  
- Spin-offs, romances e estudos: ecos.  
- Sem vida privada inventada (elenco, Jenkins).  
- Distinto do [Legado](${legado}) canábico.  
- **Não** é ficha de [A Paixão de Cristo](${PAIXAO}).
- **Não** é ficha do [app](${APP_FICHA}).

## Status

**Aprovado na série Artes (ficha própria)** — *The Chosen / Os Escolhidos* (2019–). Evangelhos primeiro; série como dramatização creditada; **app oficial** com [ficha própria](${APP_FICHA}); irmã [A Paixão de Cristo](${PAIXAO}) noutro sítio.

[▶ Artes](${hub}) · [▶ App oficial (destaque)](${APP_FICHA}) · [▶ Player web](${WATCH}) · [▶ filho de deus](${filho}) · [▶ A Paixão de Cristo (outra ficha)](${PAIXAO}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${WIKI})
`;

  const contentEn = `## Scope

Inspection of **The Chosen** (BR/PT: *Os Escolhidos*, 2019–). Created, directed and co-written by **Dallas Jenkins**. Origin: the **canonical Gospels**. The series is a **multi-season dramatization** of the ministry — Jesus through the eyes of those who met him — not Scripture, not catechism.

This sheet is **only** the series. [The Passion of the Christ](${PAIXAO}) (2004) has its **own** sheet (last hours, another screen).

> [Wikipedia](${WIKI_EN}). Opening titles declare condensed timelines and added backstories. Crowdfunding / free official app is a **distribution craft**, not a miracle. No proselytism. This lab does **not** host the show or point to piracy.

## Where to watch (snapshot ${inspected})

Legal paths only; catalogs change.

| Path | Role |
|------|------|
| **[The Chosen app](${APP_FICHA})** ([Play](${PLAY})) · **[watch.thechosen.tv](${WATCH})** | Official **free** anchor — **app has its own sheet** |
| **[YouTube · The Chosen](${YT_CH})** | Trailer / extras / episodes the house publishes — completeness varies |
| **Prime Video** | Paid; newer seasons may have an exclusivity window (~90 days, S5+) |
| **Netflix** (BR catalog in 2026 sources) | Paid — confirm seasons in the account |
| **SBT / +SBT** | Variable broadcast |

**Start free and official:** the [app](${APP_FICHA}) or [watch.thechosen.tv](${WATCH}). BR landing [osescolhidos.tv](${SITE_BR}) is a door, not the player. Do not use pirate links.

## Status

**Approved in Arts as its own sheet** — Gospels first; series as credited dramatization; **[app sheet](${APP_FICHA})** as the legal watch path.

[▶ app (featured)](${APP_FICHA}) · [▶ official player](${WATCH}) · [▶ son of God](${filho}) · [▶ Passion of the Christ (separate)](${PAIXAO})
`;

  const contentEs = `## Alcance

Inspección de **The Chosen** (*Os Escolhidos*, 2019–). Creada, dirigida y coguionizada por **Dallas Jenkins**. Origen: los **Evangelios canónicos**. La serie es **dramatización** del ministerio — Jesús por los ojos de quien lo encontró — no el texto, no un catecismo.

Esta ficha es **solo** la serie. [A Paixão de Cristo](${PAIXAO}) (2004) tiene ficha **propia**.

> [Wikipedia](${WIKI}). El genérico declara libertades dramáticas. App y web oficiales = vía **legal** gratuita. Sin proselitismo. Sin piratería.

## Dónde ver (snapshot ${inspected})

| Vía | Papel |
|-----|-------|
| **[App The Chosen](${APP_FICHA})** ([Play](${PLAY})) · **[watch.thechosen.tv](${WATCH})** | Ancla **oficial gratuita** — el app tiene ficha propia |
| **[YouTube](${YT_CH})** | Tráiler / extras; la serie completa no se da por sentada |
| **Prime Video** / **Netflix** (catálogo BR en fuentes 2026) | De pago; confirmar temporadas |
| **SBT / +SBT** | Emisión variable |

Empieza en el **[app](${APP_FICHA})** o en el [player oficial](${WATCH}). [osescolhidos.tv](${SITE_BR}) es la puerta BR, no el reproductor.

## Estado

**Aprobado en Artes (ficha propia)** — Evangelios primero; serie como dramatización; **[ficha del app](${APP_FICHA})** como vía legal.

[▶ app (destaque)](${APP_FICHA}) · [▶ player oficial](${WATCH}) · [▶ filho de deus](${filho}) · [▶ Paixão (otra)](${PAIXAO})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildTheChosenPost() {
  const { body, contentEn, contentEs, wiki } = buildBodies();
  return artePost({
    title: 'Inspeção: The Chosen — a série sobre Jesus, os escolhidos e onde assistir',
    titleEn: 'Inspection: The Chosen — the Jesus series, the called, and where to watch',
    titleEs: 'Inspección: The Chosen — la serie sobre Jesús, los elegidos y dónde verla',
    excerpt:
      'Artes · série: The Chosen / Os Escolhidos (2019–, Dallas Jenkins) — Evangelhos primeiro; dramatização do ministério. Onde assistir: **app oficial** (ficha própria), watch.thechosen.tv, Prime e Netflix no catálogo BR. Distinta de A Paixão de Cristo.',
    excerptEn:
      'Arts · series: The Chosen (2019–, Dallas Jenkins) — Gospels first; dramatization of the ministry. Where to watch: **official app** (own sheet), watch.thechosen.tv; Prime and Netflix in the BR catalog. Distinct from The Passion of the Christ.',
    excerptEs:
      'Artes · serie: The Chosen / Os Escolhidos (2019–, Dallas Jenkins) — Evangelios primero; dramatización del ministerio. Dónde ver: **app oficial** (ficha propia), watch.thechosen.tv; Prime y Netflix en el catálogo BR. Distinta de A Paixão de Cristo.',
    slug: 'inspecao-serie-the-chosen',
    date: '2026-08-20T22:40:00.000Z',
    seriesOrder: 80,
    seriesLabel: 'The Chosen · Artes',
    coverImage: 'imagens/inspecoes/the-chosen-cover.jpg',
    sourceUrl: wiki,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTheChosenPost,
  buildBodies,
  YT_ID,
  YT,
  WIKI,
  WIKI_EN,
  WATCH,
  SITE,
  PLAY,
  SITE_BR,
  APP_FICHA
};
