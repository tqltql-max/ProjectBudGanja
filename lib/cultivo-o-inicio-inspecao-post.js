'use strict';

/**
 * Artes · poesia original BudGanja:
 * «O Início» — verso a partir da legenda do vídeo Cultivo de Cannabis O Inicio,
 * cruzado com a metáfora dos tanques de guerra (fundação de vida ≠ máquina de guerra).
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
  if (opts.videoId) post.videoId = opts.videoId;
  return post;
}

const VIDEO_ID = '38uUEL1B-v4';
const VIDEO_URL = 'https://www.youtube.com/watch?v=' + VIDEO_ID;
const VIDEO_SITE = '/videos/#' + VIDEO_ID;

function poemCultivoOInicioPt() {
  return `O segredo do sucesso é o segredo.
Não cai do céu quando a flor aparece —
ganha-se antes,
na semana quieta
em que a semente ainda dorme.

Despertar.
Água, escuro, tempo.
A radícula aponta para baixo
como quem pergunta ao chão:
posso ficar?

Não se força a muda.
Espera-se o torrão —
raiz que abraça o substrato
até sair inteira,
sem desmoronar na mão.

No indoor, a luz vira estação.
Dezoito horas: verão eterno —
só crescer.
Doze e doze: outono na mesa —
hora de flor.

Folha de leque,
painel solar da fase vega:
captam luz,
alimentam a arquitetura
que ainda não é flor —
mas já é fundação.

Dizem que estrutura é blindagem.
Mentira de guerra.
Tanque de guerra avança e esmaga.
Dossel homogéneo espalha e partilha.
Um nasce para fechar o mundo —
o outro para abrir luz
até o galho que vivia na sombra.

Poda apical.
LST.
Rede.
Não para ferir —
para espalhar a luz.
Não montamos tanque —
montamos casa verde
onde a máquina é biologia,
não canhão.

O laboratório não apressa a floração.
Planta à beira.
Conta gotas.
Chama a Vida pelo nome verdadeiro:
ficar —
desde a sementinha adormecida
até o dossel homogéneo —
sem lagarta de aço no peito.

Valeu !!!

Porque toda colheita que enche o olho
começou no discreto:
uma pontinha branca,
um vaso maior na hora certa,
uma luz que ensinou o tempo —
e um nós onde antes só havia semente sozinha,
não um campo de batalha.`;
}

function poemCultivoOInicioEn() {
  return `The secret of success is the secret.
It does not fall from the sky when the flower appears —
it is won earlier,
in the quiet week
when the seed still sleeps.

Awaken.
Water, dark, time.
The radicle points downward
as if asking the soil:
may I stay?

Do not force the seedling.
Wait for the root ball —
roots that hug the medium
until they leave whole,
without crumbling in the hand.

Indoors, light becomes season.
Eighteen hours: endless summer —
only grow.
Twelve and twelve: autumn on the table —
time to flower.

Fan leaf,
solar panel of the veg stage:
they catch light,
feed the architecture
that is not yet flower —
but already foundation.

They say structure is armor.
War’s lie.
A war tank advances and crushes.
An even canopy spreads and shares.
One is born to close the world —
the other to open light
to the branch that lived in shade.

Topping.
LST.
Net.
Not to wound —
to spread the light.
We do not build a tank —
we build a green house
where the machine is biology,
not a cannon.

The laboratory does not rush flowering.
It plants at the edge.
It counts drops.
It calls Vida by its true name:
stay —
from the sleeping seed
to the even canopy —
with no steel caterpillar in the chest.

Valeu !!!

Because every harvest that fills the eye
began in the discreet:
a white tip,
a larger pot at the right hour,
a light that taught time —
and a we where once there was only a lonely seed,
not a battlefield.`;
}

function poemCultivoOInicioEs() {
  return `El secreto del éxito es el secreto.
No cae del cielo cuando aparece la flor —
se gana antes,
en la semana quieta
en que la semilla aún duerme.

Despertar.
Agua, oscuridad, tiempo.
La radícula apunta hacia abajo
como quien pregunta al suelo:
¿puedo quedarme?

No se fuerza la muda.
Se espera el cepellón —
raíz que abraza el sustrato
hasta salir entero,
sin desmoronarse en la mano.

En indoor, la luz se vuelve estación.
Dieciocho horas: verano eterno —
solo crecer.
Doce y doce: otoño en la mesa —
hora de flor.

Hoja de abanico,
panel solar de la fase veg:
captan luz,
alimentan la arquitectura
que aún no es flor —
pero ya es fundación.

Dicen que estructura es blindaje.
Mentira de guerra.
El tanque de guerra avanza y aplasta.
El dosel homogéneo reparte y comparte.
Uno nace para cerrar el mundo —
el otro para abrir luz
hasta la rama que vivía en la sombra.

Poda apical.
LST.
Red.
No para herir —
para repartir la luz.
No montamos tanque —
montamos casa verde
donde la máquina es biología,
no cañón.

El laboratorio no apresura la floración.
Siembra a la orilla.
Cuenta gotas.
Llama a Vida por su nombre verdadero:
quedarse —
desde la semillita dormida
hasta el dosel homogéneo —
sin oruga de acero en el pecho.

¡Valeu !!!

Porque toda cosecha que llena el ojo
empezó en lo discreto:
una puntita blanca,
una maceta mayor a la hora justa,
una luz que enseñó el tiempo —
y un nosotros donde antes solo había semilla sola,
no un campo de batalla.`;
}

function buildCultivoOInicioBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const cultivo = '/guia/cultivo-basico.html';
  const arvore = '/posts/post-inspecao-palavra-arvore-da-vida.html';
  const bomDia = '/posts/post-inspecao-arte-bom-dia-inverno.html';
  const conto = '/posts/post-inspecao-conto-vida-laboratorio.html';
  const videos = '/videos/';
  const inspecoes = '/biblioteca/inspecoes/';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const oficio = '/posts/post-pesquisa-oficio-roubo-proibicao.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const poema = poemCultivoOInicioPt();

  const body = `## Escopo

Poesia original do laboratório BudGanja: **«O Início»**. Verso feito a partir da **legenda** do vídeo [Cultivo de Cannabis O Inicio](${VIDEO_SITE}) ([YouTube](${VIDEO_URL})) — germinação, transplante, fotoperíodo, fase vegetativa e arquitetura da planta — e **cruzado com a metáfora dos tanques de guerra**: a fundação do cultivo é máquina de **vida**, não de guerra. Liga o ofício técnico ao canto [Vida](${vida}): a colheita começa no discreto.

> **Nota metodológica:** texto **criado no laboratório** a partir da legenda PT do vídeo \`${VIDEO_ID}\` (análise visual do canal). Metáfora militar = contraste editorial (**não** manual bélico). **Não** é protocolo clínico nem substituto do [guia de cultivo](${cultivo}). Fonte: [transcript](/content/transcripts/canal-inspetor/${VIDEO_ID}.json). Poesia ≠ receita; inspecionar ≠ aconselhar uso ilícito.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **O Início** |
| Autoria | Inspetor BudGanja · laboratório (poesia original) |
| Meio | Poema · Artes |
| Fonte | Vídeo [Cultivo de Cannabis O Inicio](${VIDEO_SITE}) · \`${VIDEO_ID}\` |
| Motivo | Semente · fundação · luz · **tanque de guerra × dossel** · ficar antes da flor |
| Elo Cultivo | [Guia básico](${cultivo}) · [Vídeos](${videos}) |
| Elo Vida | [Vida](${vida}) · [Árvore da Vida](${arvore}) · [Bom dia, Inverno](${bomDia}) |
| Elo aviso | [risco](${risco}) · [proibição](${proibicao}) · [vingança…](${vinganca}) · [ofício / roubo / proibição](${oficio}) |
| Elo Artes | [Killing in the Name](${killing}) — Rage Against the Machine · máquina que mata no nome |
| Elo Conto | [Sementinha do laboratório](${conto}) |
| Data | ${inspected} |

## O poema

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=o-inicio)

## Tanques de guerra × arquitetura do cultivo

| Tanque de guerra | Dossel / início BudGanja |
|------------------|--------------------------|
| Blindagem para avançar e esmagar | Folha de leque = painel solar — captura, não esmaga |
| Lagarta de aço no chão | Radícula no substrato — pede ficar, não conquista |
| Canhão / disparo | Luz calibrada (PPFD / fotoperíodo) — estação, não tiro |
| Campo de batalha | Mesa indoor / vaso — casa verde |
| Fechar o mundo (força) | Abrir luz aos galhos da sombra (partilha) |
| «Máquina» de guerra | «Máquina biológica» da legenda — rendimento sem canhão |

**H1:** a legenda fala em *máquina biológica* e *arquitectura* — o verso **recusa** ler isso como tanque.  
**H2:** [proibição](${proibicao}) e guerra à planta vestem metáfora militar; o laboratório responde com [gesto](/posts/post-inspecao-palavra-gesto.html) e [ficar](${vida}).  
**H3:** poda / LST / rede **não** são ferimento de guerra — são espalhar luz ([risco](${risco}) calculado, não esmagamento).

## Tese cultural BudGanja

| Imagem (legenda) | Tradução editorial |
|------------------|-------------------|
| «O segredo do sucesso é o segredo» | Preparação discreta — Flor da Vida / ofício, não milagre |
| Radícula para baixo | Pedir chão: ancoragem antes de flor |
| Torrão inteiro | Timing do transplante — não forçar a muda |
| 18 / 12-12 | Luz como estação; verão eterno e outono na mesa |
| Folha de leque | Painel solar da vega — fundação, não flor |
| Poda / LST / rede | Espalhar luz; sombra que deixa de ser castigo |
| Dossel homogéneo | Colheita que começa no início — **anti-tanque** |
| Tanque de guerra (verso) | Contraste: blindagem que esmaga × dossel que partilha |

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Vídeo no hub](${VIDEO_SITE}) | Fonte da legenda |
| [Guia de cultivo](${cultivo}) | Trilha técnica |
| [Vídeos](${videos}) | Canal do laboratório |
| [Árvore da Vida](${arvore}) · [Bom dia, Inverno](${bomDia}) | Arco semente–mudinha–árvore |
| [proibição](${proibicao}) · [vingança…](${vinganca}) · [ofício](${oficio}) | Avisos: guerra / rancor ≠ cultivo |
| [Killing in the Name](${killing}) | RATM 1992 — rage against the machine × tanque/dossel |
| [Vida](${vida}) | Canto do ficar |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) | Mapa |

## Status

**Aprovado** — poesia original do laboratório: legenda do início do cultivo × metáfora dos tanques de guerra.

[▶ Poema na Vida](${vida}#poema=o-inicio) · [▶ Vídeo](${VIDEO_SITE}) · [▶ Killing in the Name](${killing}) · [▶ Cultivo](${cultivo}) · [▶ Vídeos](${videos})
`;

  const contentEn = `## Scope

Original BudGanja poem: **“The Beginning.”** Written from the **caption** of [Cannabis Growing: The Beginning](${VIDEO_SITE}) ([YouTube](${VIDEO_URL})) — germination, transplant, photoperiod, veg, and plant architecture — **crossed with war tanks**: grow foundation is a machine of **life**, not of war. Links technical craft to [Vida](${vida}).

> Method note: lab text from PT captions of \`${VIDEO_ID}\`. Military metaphor = editorial contrast (**not** a war manual). Not clinical advice; not a substitute for the [grow guide](${cultivo}).

## The poem

\`\`\`poem
${poemCultivoOInicioEn()}
\`\`\`

[▶ Read on Vida](${vida}#poema=o-inicio)

## War tanks × grow architecture

| War tank | Canopy / BudGanja beginning |
|----------|----------------------------|
| Armor to advance and crush | Fan leaf = solar panel — catch, don’t crush |
| Steel caterpillar on the ground | Radicle in the medium — asks to stay |
| Cannon / shot | Calibrated light — season, not fire |
| Battlefield | Indoor table / pot — green house |
| Close the world by force | Open light to shaded branches |

## Status

**Approved** — original lab poetry: beginner grow caption × war-tank metaphor.

[▶ Vida poem](${vida}#poema=o-inicio) · [▶ Video](${VIDEO_SITE}) · [▶ Grow guide](${cultivo})
`;

  const contentEs = `## Alcance

Poesía original BudGanja: **«El Inicio».** Verso a partir de la **leyenda** de [Cultivo de cannabis: el inicio](${VIDEO_SITE}) ([YouTube](${VIDEO_URL})) — germinación, trasplante, fotoperiodo, fase vegetativa y arquitectura — **cruzado con tanques de guerra**: la fundación del cultivo es máquina de **vida**, no de guerra. Une el oficio técnico a [Vida](${vida}).

> Nota: texto del laboratorio a partir de subtítulos PT de \`${VIDEO_ID}\`. Metáfora militar = contraste editorial (**no** manual bélico). No es consejo clínico; no sustituye la [guía de cultivo](${cultivo}).

## El poema

\`\`\`poem
${poemCultivoOInicioEs()}
\`\`\`

[▶ Leer en Vida](${vida}#poema=o-inicio)

## Tanques de guerra × arquitectura del cultivo

| Tanque de guerra | Dosel / inicio BudGanja |
|------------------|-------------------------|
| Blindaje para avanzar y aplastar | Hoja de abanico = panel solar — captura, no aplasta |
| Oruga de acero en el suelo | Radícula en el sustrato — pide quedarse |
| Cañón / disparo | Luz calibrada — estación, no tiro |
| Campo de batalla | Mesa indoor / maceta — casa verde |
| Cerrar el mundo por fuerza | Abrir luz a las ramas de la sombra |

## Estado

**Aprobada** — poesía original del laboratorio: leyenda del inicio × metáfora de tanques de guerra.

[▶ Poema Vida](${vida}#poema=o-inicio) · [▶ Vídeo](${VIDEO_SITE}) · [▶ Cultivo](${cultivo})
`;

  return { body, contentEn, contentEs };
}

function buildCultivoOInicioPost() {
  const { body, contentEn, contentEs } = buildCultivoOInicioBodies();
  return artePost({
    title:
      'Inspeção: O Início — poesia do laboratório a partir do cultivo',
    titleEn:
      'Inspection: The Beginning — lab poetry from the grow video',
    titleEs:
      'Inspección: El Inicio — poesía del laboratorio a partir del cultivo',
    excerpt:
      'Artes · poesia: semente e dossel × tanques de guerra — fundação de vida, não de blindagem; verso a partir da legenda de Cultivo O Inicio.',
    excerptEn:
      'Arts · poetry: seed and canopy × war tanks — foundation of life, not armor; verse from the Cultivo O Inicio caption.',
    excerptEs:
      'Artes · poesía: semilla y dosel × tanques de guerra — fundación de vida, no de blindaje; verso a partir de la leyenda de Cultivo O Inicio.',
    slug: 'inspecao-arte-o-inicio',
    date: '2026-08-04T18:00:00.000Z',
    seriesOrder: 47,
    seriesLabel: 'O Início · Artes',
    coverImage: '/imagens/inspecoes/o-inicio-cover.jpg',
    sourceUrl: VIDEO_URL,
    videoId: VIDEO_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCultivoOInicioPost,
  buildCultivoOInicioBodies,
  poemCultivoOInicioPt,
  poemCultivoOInicioEn,
  poemCultivoOInicioEs,
  VIDEO_ID,
  VIDEO_URL
};
