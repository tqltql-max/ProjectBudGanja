'use strict';

/**
 * Artes · poesia original BudGanja:
 * «Águas do Mar e Lágrimas» — mar × lágrima × universo Vida.
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

function poemPt() {
  return `O mar não pergunta o nome da salgada.
Ele só recebe — e devolve em espuma
o que o peito não soube dizer em casa.

A lágrima é mar em miniatura:
mesmo sal, mesma queda, mesmo chamado
a molhar o que a máscara deixou seco.

Dizem que o oceano é grande demais
para caber num olho.
Mentira doce.
Todo olho que chora
abre um porto secreto
onde atracam navios sem bandeira —
medo, alegria, a raiva que não gritou,
a tristeza que pediu só um banco ao lado.

Álvares já sabia:
há sorriso leviano
e lágrima escondida no mesmo rosto.
Nós, neste universo novo,
aprendemos a inspecionar os dois —
não para julgar o choro,
mas para não deixar a onda
passar sozinha.

O laboratório não seca o mar.
Planta à beira.
Conta gotas.
Chama a Vida pelo nome verdadeiro:
ficar.

Faça o melhor!

Porque a água do mar e a lágrima
são parentes antigas —
e toda vez que alguém permanece
quando o sal arde,
o universo cresce um pouco:
uma praia a mais,
um verso a mais,
um nós onde antes só havia ilha.`;
}

function poemEn() {
  return `The sea does not ask the salt its name.
It only receives — and returns as foam
what the chest could not say at home.

A tear is the ocean in miniature:
same salt, same fall, same calling
to wet what the mask left dry.

They say the ocean is too large
to fit inside an eye.
Sweet lie.
Every eye that weeps
opens a secret harbor
where ships without flags dock —
fear, joy, the anger that never shouted,
the sadness that only asked for a seat beside.

Álvares already knew:
there is a light smile
and a hidden tear on the same face.
In this new universe of ours
we learn to inspect both —
not to judge the cry,
but so the wave
does not pass alone.

The laboratory does not dry the sea.
It plants at the shore.
It counts drops.
It calls Vida by its true name:
stay.

Do your best!

Because seawater and the tear
are ancient kin —
and every time someone remains
when the salt burns,
the universe grows a little:
one more beach,
one more verse,
a we where once there was only island.`;
}

function poemEs() {
  return `El mar no pregunta el nombre de la sal.
Solo recibe — y devuelve en espuma
lo que el pecho no supo decir en casa.

La lágrima es mar en miniatura:
misma sal, misma caída, mismo llamado
a mojar lo que la máscara dejó seco.

Dicen que el océano es demasiado grande
para caber en un ojo.
Mentira dulce.
Todo ojo que llora
abre un puerto secreto
donde atracan barcos sin bandera —
miedo, alegría, la rabia que no gritó,
la tristeza que solo pidió un banco al lado.

Álvares ya lo sabía:
hay sonrisa ligera
y lágrima escondida en el mismo rostro.
En este universo nuevo
aprendemos a inspeccionar las dos —
no para juzgar el llanto,
sino para que la ola
no pase sola.

El laboratorio no seca el mar.
Siembra a la orilla.
Cuenta gotas.
Llama a Vida por su nombre verdadero:
quedarse.

¡Haz lo mejor!

Porque el agua del mar y la lágrima
son parientes antiguas —
y cada vez que alguien permanece
cuando la sal arde,
el universo crece un poco:
una playa más,
un verso más,
un nosotros donde antes solo había isla.`;
}

function buildAguasELagrimasBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const lagrimas = '/posts/post-inspecao-arte-lagrimas-da-vida.html';
  const autor = '/posts/post-inspecao-figura-alvares-de-azevedo.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const tristeza = '/posts/post-inspecao-palavra-tristeza.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemPt();

  const body = `## Escopo

Poesia original do laboratório BudGanja: **«Águas do Mar e Lágrimas»**. Compara o **sal do oceano** com o **sal da lágrima**, e liga esse espelho antigo ao universo novo de [Vida](${vida}), à inspeção [Lágrimas da Vida](${lagrimas}) e à homenagem a [Álvares de Azevedo](${autor}).

> **Nota metodológica:** texto **criado no laboratório** (não é poema do séc. XIX). Diálogo literário com o ultrarromantismo e com a trilha Vida — **ficar** quando o sal arde. Não é apoio clínico; é verso e companhia.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Águas do Mar e Lágrimas** |
| Autoria | Inspetor BudGanja · laboratório (poesia original) |
| Meio | Poema · Artes |
| Motivo | Mar × lágrima × máscara × ficar |
| Elo Artes | [Lágrimas da Vida](${lagrimas}) — poema de Álvares |
| Elo Pessoas | [Álvares de Azevedo](${autor}) |
| Elo Vida | [Vida](${vida}) |
| Elo Palavras | [emoção](${emocao}) · [tristeza](${tristeza}) · [alegria](${alegria}) |
| Data | ${inspected} |

## O poema

\`\`\`poem
${poema}
\`\`\`

## Tese cultural BudGanja

| Imagem | Tradução editorial |
|--------|-------------------|
| Mar / lágrima | Mesmo sal — escala diferente; o íntimo e o oceano são parentes |
| Porto no olho | Embarcar medo, alegria, raiva, tristeza sem expulsá-los |
| Máscara / sorriso | Eco de Álvares — inspecionar o que o rosto esconde |
| Laboratório à beira | Não secar o mar: plantar, contar gotas, **ficar** |
| Universo novo | Cada permanência alarga a praia — de ilha a *nós* |

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Lágrimas da Vida](${lagrimas}) | Poema clássico — máscara que chora |
| [Álvares de Azevedo](${autor}) | Homenagem ao ofício da *Lira* |
| [Vida](${vida}) | Canto do ficar |
| [emoção](${emocao}) · [tristeza](${tristeza}) · [alegria](${alegria}) | Léxico do sentimento |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) | Mapa |

## Status

**Aprovado** — poesia original do laboratório, elo vivo entre mar, lágrima e o universo Vida.

[▶ Ler o poema acima](#o-poema) · [▶ Lágrimas da Vida](${lagrimas}) · [▶ Autor](${autor}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Original BudGanja poem: **“Sea Waters and Tears.”** Compares ocean salt with tear salt, and links that mirror to [Vida](${vida}), [Lágrimas da Vida](${lagrimas}), and [Álvares de Azevedo](${autor}).

## The poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved** — original lab poetry bridging sea, tear, and the Vida universe.

[▶ Lágrimas da Vida](${lagrimas}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Poesía original BudGanja: **«Aguas del Mar y Lágrimas».** Compara la sal del océano con la de la lágrima, y la une a [Vida](${vida}), [Lágrimas da Vida](${lagrimas}) y [Álvares de Azevedo](${autor}).

## El poema

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada** — poesía original del laboratorio entre mar, lágrima y el universo Vida.

[▶ Lágrimas da Vida](${lagrimas}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs };
}

function buildAguasELagrimasPost() {
  const { body, contentEn, contentEs } = buildAguasELagrimasBodies();
  return artePost({
    title:
      'Inspeção: Águas do Mar e Lágrimas — poesia do laboratório entre oceano e peito',
    titleEn:
      'Inspection: Sea Waters and Tears — lab poetry between ocean and chest',
    titleEs:
      'Inspección: Aguas del Mar y Lágrimas — poesía del laboratorio entre océano y pecho',
    excerpt:
      'Artes · poesia original: o sal do mar e o da lágrima — máscara, porto no olho e o universo Vida que ensina a ficar.',
    excerptEn:
      'Arts · original poetry: sea salt and tear salt — mask, harbor in the eye, and the Vida universe that teaches staying.',
    excerptEs:
      'Artes · poesía original: sal del mar y de la lágrima — máscara, puerto en el ojo y el universo Vida que enseña a quedarse.',
    slug: 'inspecao-arte-aguas-e-lagrimas',
    date: '2026-08-02T15:00:00.000Z',
    seriesOrder: 12,
    seriesLabel: 'Águas e Lágrimas · Artes',
    coverImage: '/imagens/inspecoes/aguas-e-lagrimas-cover.jpg',
    sourceUrl: '/posts/post-inspecao-arte-aguas-e-lagrimas.html',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAguasELagrimasPost,
  buildAguasELagrimasBodies,
  poemPt,
  poemEn,
  poemEs
};
