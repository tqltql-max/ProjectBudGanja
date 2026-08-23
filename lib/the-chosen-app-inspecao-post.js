'use strict';

/**
 * Artes · app: The Chosen (Come and See Foundation).
 * Objecto = o aplicativo oficial (Play / iOS / CTV), distinto da série e do site BR.
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
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

const PLAY =
  'https://play.google.com/store/apps/details?id=net.comeandsee.thechosen';
const PLAY_BR = PLAY + '&hl=pt_BR';
const IOS = 'https://apps.apple.com/app/the-chosen/id6443956656';
const APP_HUB = 'https://www.thechosen.tv/en-us/app';
const WATCH = 'https://watch.thechosen.tv/';
const SITE_US = 'https://www.thechosen.tv/';
const SITE_BR = 'https://osescolhidos.tv/';
const BLOG_BR = 'https://blog.osescolhidos.tv/';
const EQUIPE = 'https://osescolhidos.tv/nossa-equipe';
const COME = 'https://www.comeandseefoundation.org/';
const PRIV = 'https://www.comeandseefoundation.org/privacy';
const TERMS = 'https://www.comeandseefoundation.org/terms';
const ENCONTRO = 'https://encontrocomthechosen.com.br/';
const SERIE = '/posts/post-inspecao-serie-the-chosen.html';
const PAIXAO = '/posts/post-inspecao-filme-a-paixao-de-cristo.html';
const FILHO = '/posts/post-inspecao-expressao-filho-de-deus.html';
const CAMINHO = '/posts/post-inspecao-palavra-caminho.html';
const GESTO = '/posts/post-inspecao-palavra-gesto.html';
const VERDADE = '/posts/post-inspecao-palavra-verdade.html';
const CELULAR = '/posts/post-inspecao-celular-riscos-criancas.html';
const MANTRA = '/posts/post-inspecao-palavra-valeu.html';
const COVER = 'imagens/inspecoes/the-chosen-app-cover.jpg';

function buildBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';

  const body = `## Escopo

Inspeção editorial do **aplicativo oficial The Chosen** — a via **grátis** âncora para assistir *Os Escolhidos*. O objecto aqui **não é a série** (isso vive na [ficha da dramatização](${SERIE})): é o **app** — pacote Android \`net.comeandsee.thechosen\`, listing na [Google Play](${PLAY_BR}), irmão no [App Store](${IOS}), player no browser em [watch.thechosen.tv](${WATCH}). Desenvolvedor declarado: **Come and See Foundation, Inc.** (no listing: *Come And See* / *Venha e Veja*).

O pedido de campo chegou por duas portas: o landing brasileiro [osescolhidos.tv](${SITE_BR}) (tráfego Google Ads) e o [listing da Play](${PLAY}). Esta ficha **destaca o app**. O site BR é a **porta**; o app é o **player**.

> **Nota metodológica:** auditoria independente. Snapshot ${inspected} do listing [Play · pt_BR](${PLAY_BR}), [política de privacidade Come and See](${PRIV}), [osescolhidos.tv](${SITE_BR}) e a [ficha da série](${SERIE}). **Sem afiliação** com Come and See, 5&2 Studios, Angel ou a operação The Chosen Brasil. Indexar ≠ endossar. Claims de idiomas, downloads e «todas as temporadas» **datam-se e atribuem-se**. O laboratório **não** hospeda a série nem aponta cópias piratas. Sem proselitismo.

![App The Chosen — capa editorial BudGanja](/${COVER})

*Capa editorial do laboratório — o objecto é o aplicativo, não o Evangelho.*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **App The Chosen** (player oficial gratuito) |
| Nome no listing | *The Chosen* · tagline BR: «Assista a Os escolhidos. Cada episódio. Nada é necessário.» |
| Pacote Android | \`net.comeandsee.thechosen\` |
| [Google Play](${PLAY_BR}) | Categoria **Entretenimento** · classificação **Todos** · actualizado **19 ago. 2026** |
| Downloads (Play, snapshot) | **10 mi+** |
| Nota (Play, snapshot) | **4,6** ★ · ~54 mil avaliações (cabeçalho) / ~51 mil (bloco de notas) |
| [App Store](${IOS}) | ID \`6443956656\` · desenvolvedor Come and See Foundation, Inc |
| Publisher | **Come and See Foundation, Inc.** — [comeandseefoundation.org](${COME}) |
| Morada no listing Play | 2601 Oberlin Rd Ste 100, Raleigh, NC 27608, EUA |
| Morada na [privacidade](${PRIV}) | 9540 Federal Drive, Suite 250, Colorado Springs, CO 80921 (NC / CO — **dois documentos**, não um só cartão) |
| Contacto app | [support@comeandseefoundation.org](mailto:support@comeandseefoundation.org) · +1 910-319-9951 · [theapp@comeandseefoundation.org](mailto:theapp@comeandseefoundation.org) |
| Player web (mesmo ofício) | [watch.thechosen.tv](${WATCH}) |
| Porta BR | [osescolhidos.tv](${SITE_BR}) — landing, FAQ, loja, igrejas; **não** substitui o app |
| Ficha irmã (série) | [The Chosen — a dramatização](${SERIE}) |
| Tipo BudGanja | Arte · **distribuição** — o ecrã onde se assiste, não o texto canónico |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja do **app** é o ofício de distribuição: **grátis no oficial**, sem mandar o leitor a Telegram, Drive ou «link completo».  
**H2:** «100% livre de anúncios» (claim do listing) **não** equivale a «zero telemetria» — a ficha de Segurança dos dados da Play declara recolha e partilha.  
**H3:** «Assista a todas as temporadas agora» é **claim de catálogo**; temporadas novas podem ter janela no Prime antes do app (já documentado na [série](${SERIE})). Confirmar **no player**.  
**H4:** [osescolhidos.tv](${SITE_BR}) e o anúncio Google são **funil BR** para o mesmo ofício — não são o aplicativo.  
**H5:** fecho = [Valeu !!!](${MANTRA}) — o melhor *deste* player *desta* casa, sem púlpito e sem pirataria.

**Método:** (1) listing Play; (2) claims vs limites; (3) dados / privacidade; (4) apps irmãos; (5) porta BR; (6) elos e status.

## O que o listing promete (claims a auditar)

Texto da Play (${inspected}), apresentado por *Venha e Veja*:

| Claim no listing | Leitura BudGanja |
|------------------|------------------|
| **100% livre de anúncios**, sem interrupções | Claim de **monetização no player** — não prova ausência de analytics, doação in-app ou partilha de dados |
| **Não é necessário ter uma conta** | Convidado possível; o mesmo texto oferece login Apple / Google / Facebook / e-mail |
| **Sem assinaturas. Sem paywalls.** | Distinto de Netflix/Prime. **Doação** (Come and See / «momentos de doação» no app) **não** é paywall — e **não** é obrigação |
| App em **197** idiomas; programa em **135** (legendas / áudio) | Números de **produtor** — datar; não fechar censo |
| Offline, Chromecast/TV, acessibilidade, busca, YouVersion | Ofício de player — confirmar no aparelho |
| Aftershows, Mesas Redondas Bíblicas, bastidores | Extras **no app**; não são o Evangelho nem catecismo do laboratório |
| «Assista a todas as temporadas agora» | **Catálogo declarado** — S6 anunciada no site BR para **15/11/2026** no Prime; janelas mudam |

O laboratório **não** testa cada SKU de dispositivo. Reviews da Play (Chromecast/Roku a falhar após actualização, mai.–jun. 2026) e a resposta da casa («platform migration») registam-se como **recepção** — não como laudo técnico.

## Segurança dos dados (Play + privacidade)

Snapshot da ficha **Segurança dos dados** na Play (${inspected}) — o que o **desenvolvedor declara**, não uma auditoria forense:

| Declaração Play | Nota |
|-----------------|------|
| Pode **partilhar** com terceiros | Informações pessoais · actividade no app · identificadores do dispositivo |
| Pode **recolher** | Informações pessoais · actividade no app · «e mais 2» (o listing não fecha a lista neste bloco) |
| Trânsito | Dados **encriptados em trânsito** |
| Eliminação | «Pode solicitar a exclusão dos dados» |

A [política Come and See](${PRIV}) cobre o app (Play, App Store, Google TV, Roku, Fire TV, Apple TV) e [watch.thechosen.tv](${WATCH}). Eliminação de conta: menu ≡ → Personal Info → Delete Account (app ou web); prazo declarado ~45 dias após verificação. Contacto legal: legal@comeandseefoundation.org.

**Leitura:** grátis e sem anúncios no *player* **não** torna o app um objecto opaco sem dados. Quem inspecciona o [celular](${CELULAR}) já sabe: instalar é um [gesto](${GESTO}) com custo de privacidade. O laboratório **documenta**; **não** proíbe o download.

## Apps irmãos no mesmo publisher (Play)

No rodapé «Mais de Come And See» (${inspected}):

| Listing | Nota |
|---------|------|
| **The Chosen** (\`net.comeandsee.thechosen\`) | **Esta ficha** — player âncora |
| **The Chosen TV** | App à parte · nota **3,5** ★ no snapshot — **não** misturar com o player principal |
| **The Chosen Lite** | App à parte · nota **4,5** ★ no snapshot — recorte lite; **não** é esta ficha |

Instalar o pacote **errado** é o erro mais banal da loja. Procurar **The Chosen** da *Come And See*, pacote \`net.comeandsee.thechosen\`.

## Porta brasileira — o site aponta para o app

[osescolhidos.tv](${SITE_BR}) (título da home: *The Chosen Brasil*) **não é o player**. No snapshot ${inspected}:

| Bloco no site BR | Papel |
|------------------|-------|
| «Temporadas 1 a 5 · gratuitamente no aplicativo The Chosen» | **Empurra para o app** |
| FAQ 1 | App nas lojas · [watch.thechosen.tv](${WATCH}) · Netflix e Prime (catálogo **pago**, a confirmar) |
| Temporada 6 | Streaming **15/11/26** (Prime, no FAQ); dois episódios finais em cinema, 1.º trim. 2027 |
| Igreja / «antes de todo mundo» | Funil para líderes — eco em [encontrocomthechosen.com.br](${ENCONTRO}) |
| [Nossa equipe](${EQUIPE}) | Operação BR (estratégia, igrejas, conteúdo) — **não** é o elenco da série |
| [Blog](${BLOG_BR}) | Novidades, Guinness, «onde assistir» — marketing, não a ficha da dramatização |
| Google Ads (\`gad_source\`, \`gclid\`) | Ofício de **aquisição paga** até ao landing — o destino útil continua a ser o **app** |

**Como escolher:** quem quer **grátis e oficial** instala o [app na Play](${PLAY_BR}) ou no [App Store](${IOS}), ou abre [watch.thechosen.tv](${WATCH}). Quem chegou por anúncio em [osescolhidos.tv](${SITE_BR}) não precisa de um segundo «site pirata». Dublagem/legendas em português: verificar **no player**.

## Elos

| Recurso | Papel |
|---------|-------|
| [The Chosen — a série](${SERIE}) | Dramatização · Evangelhos primeiro · **outra** ficha |
| [Google Play · The Chosen](${PLAY_BR}) | Listing inspeccionado |
| [watch.thechosen.tv](${WATCH}) | Mesmo ofício no browser |
| [Come and See](${COME}) · [privacidade](${PRIV}) · [termos](${TERMS}) | Casa do app e do grátis |
| [osescolhidos.tv](${SITE_BR}) | Porta BR · anúncio · FAQ — **não** o player |
| [filho de deus](${FILHO}) · [caminho](${CAMINHO}) · [gesto](${GESTO}) · [verdade](${VERDADE}) | Léxico da série, sem sermão |
| [A Paixão de Cristo](${PAIXAO}) | Filme 2004 — **outro** ecrã |
| [Celular e riscos](${CELULAR}) | Aparelho · privacidade · criança |
| [Valeu !!!](${MANTRA}) | O melhor *deste* download *desta* casa |

> Abrir **esta** ficha para o **app**. Abrir [The Chosen (série)](${SERIE}) para a **dramatização**. Abrir os Evangelhos para o **texto**. Não fundir player, série e púlpito.

## Limites

- Não é catecismo, review de cada episódio nem teste de Chromecast em laboratório.  
- Claims de idiomas, downloads e «todas as temporadas»: **datar**.  
- Livre de anúncios ≠ sem dados.  
- The Chosen TV / Lite = **outros** listings.  
- Site BR, blog e anúncio Google ≠ aplicativo.  
- Sem vida privada inventada (equipa BR, Come and See, elenco).  
- Distinto de [A Paixão de Cristo](${PAIXAO}).  
- **Não** se aponta pirataria.

## Status

**Aprovado na série Artes (ficha própria do app)** — *The Chosen* na Play/iOS como via **oficial gratuita** âncora. Série noutro sítio: [The Chosen — dramatização](${SERIE}). Porta BR: [osescolhidos.tv](${SITE_BR}). Come and See creditada; sem afiliação; sem púlpito.

[▶ Artes](${hub}) · [▶ Instalar na Play](${PLAY_BR}) · [▶ App Store](${IOS}) · [▶ Player web](${WATCH}) · [▶ A série (outra ficha)](${SERIE}) · [▶ Valeu !!!](${MANTRA})
`;

  const contentEn = `## Scope

Inspection of the **official The Chosen app** — the free watch path. This sheet is **the app**, not the [series](${SERIE}). Android package \`net.comeandsee.thechosen\`; [Google Play](${PLAY}) listing (snapshot ${inspected}); sister [App Store](${IOS}) listing; browser twin [watch.thechosen.tv](${WATCH}). Publisher: **Come and See Foundation, Inc.**

The Brazilian door [osescolhidos.tv](${SITE_BR}) (including Google Ads traffic) **points to** the app. It is not the player.

> Independent audit. Claims (ad-free, all seasons, language counts) are **dated**. Ad-free playback ≠ no telemetry ([Play Data safety](${PLAY}) + [privacy policy](${PRIV})). No affiliation. No piracy. No proselytism.

## Play snapshot (${inspected})

| Field | Value |
|-------|-------|
| Downloads | **10M+** |
| Rating | **4.6** ★ · ~50k+ reviews |
| Category | Entertainment · Everyone |
| Updated | **19 Aug 2026** |
| Support | support@comeandseefoundation.org |

**Install the right package:** The Chosen by *Come And See*, \`net.comeandsee.thechosen\` — not **The Chosen TV** or **The Chosen Lite**.

## Status

**Approved in Arts as its own app sheet** — official free player. Series: [The Chosen](${SERIE}).

[▶ Play](${PLAY}) · [▶ App Store](${IOS}) · [▶ web player](${WATCH}) · [▶ series (separate)](${SERIE})
`;

  const contentEs = `## Alcance

Inspección del **app oficial The Chosen** — la vía gratis. Esta ficha es **el app**, no la [serie](${SERIE}). Paquete Android \`net.comeandsee.thechosen\`; ficha [Google Play](${PLAY}) (snapshot ${inspected}); hermano en [App Store](${IOS}); gemelo web [watch.thechosen.tv](${WATCH}). Editor: **Come and See Foundation, Inc.**

La puerta brasileña [osescolhidos.tv](${SITE_BR}) **empuja al app**. No es el reproductor.

> Auditoría independiente. Claims (sin anuncios, todas las temporadas, idiomas) se **fechan**. Sin anuncios en el player ≠ sin datos. Sin afiliación. Sin piratería. Sin proselitismo.

## Play (snapshot ${inspected})

| Campo | Valor |
|-------|-------|
| Descargas | **10M+** |
| Nota | **4,6** ★ |
| Actualizado | **19 ago. 2026** |

Instalar el paquete **correcto**: The Chosen de *Come And See* — no TV ni Lite.

## Estado

**Aprobado en Artes (ficha propia del app)** — reproductor oficial gratis. Serie: [The Chosen](${SERIE}).

[▶ Play](${PLAY}) · [▶ App Store](${IOS}) · [▶ player web](${WATCH}) · [▶ serie (otra)](${SERIE})
`;

  return { body, contentEn, contentEs };
}

function buildTheChosenAppPost() {
  const { body, contentEn, contentEs } = buildBodies();
  return artePost({
    title: 'Inspeção: app The Chosen — a via oficial gratuita',
    titleEn: 'Inspection: The Chosen app — the official free watch path',
    titleEs: 'Inspección: app The Chosen — la vía oficial gratuita',
    excerpt:
      'Artes · app: The Chosen (Come and See) — player oficial grátis na Play e no App Store. Listing net.comeandsee.thechosen; sem anúncios no player (claim); dados declarados. Distinto da ficha da série e do site osescolhidos.tv.',
    excerptEn:
      'Arts · app: The Chosen (Come and See) — official free player on Play and the App Store. Package net.comeandsee.thechosen; ad-free playback is a claim; data sharing is declared. Distinct from the series sheet and osescolhidos.tv.',
    excerptEs:
      'Artes · app: The Chosen (Come and See) — reproductor oficial gratis en Play y App Store. Paquete net.comeandsee.thechosen; sin anuncios es claim; datos declarados. Distinto de la ficha de la serie y de osescolhidos.tv.',
    slug: 'inspecao-app-the-chosen',
    date: '2026-08-21T13:10:00.000Z',
    seriesOrder: 81,
    seriesLabel: 'The Chosen · app',
    coverImage: COVER,
    sourceUrl: PLAY,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTheChosenAppPost,
  buildBodies,
  PLAY,
  PLAY_BR,
  IOS,
  APP_HUB,
  WATCH,
  SITE_BR,
  COME,
  PRIV
};
