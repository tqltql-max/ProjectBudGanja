'use strict';

/**
 * Série Vida — contos do laboratório sobre cuidar de plantas com carinho.
 * Fonte: Vida/Historia.txt + Vida/Personagens.txt
 * Tom: educação geral; ciência + natureza + amizade. Não é protocolo clínico.
 * Público: adultos / comunidade — sem posicionamento «para crianças».
 */

const HUB = '/vida/';
const HISTORIA = '/posts/post-inspecao-conto-vida-laboratorio.html';
const INSPETOR = '/posts/post-inspecao-personagem-inspetor.html';
const DONA_MARIA = '/posts/post-inspecao-personagem-dona-maria.html';
const DJ_BRISA = '/posts/post-inspecao-personagem-dj-brisa.html';
const JOANA = '/posts/post-inspecao-personagem-joaninha-joana.html';
const PASSARINHOS = '/posts/post-inspecao-personagem-three-little-birds.html';
const { buildFlorMariaPersonagemCfg, FLOR_HREF } = require('./flor-maria-jane-maria-personagem-inspecao-post.js');
const FLOR = FLOR_HREF;
const RADIO = '/radio/';
const SUPER_SOLO = '/calculadoras/super-solo.html';
const LUXIMETRO = '/calculadoras/luximetro.html';
const DIARIO = '/cultivo/';
const PLANTAS = '/plantas/';
const ARTES = '/biblioteca/inspecoes/#inspecoes-artes';

function contoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date || '2026-08-01',
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'vida-contos',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Vida',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function buildHistoriaBody() {
  return `## Escopo

Conto do **Laboratório BudGanja**: como uma sementinha vira planta feliz quando ciência, natureza e amizade caminham juntas. Ensina o jeito certo de cuidar das plantas, com carinho e curiosidade.

> **Nota:** conteúdo educacional. Não substitui orientação responsável nem protocolo clínico. O laboratório é metáfora de cuidado — ritmo, atenção e amizade.

Hub ilustrado: [Vida](${HUB}).

## A história

Era uma vez, num lugar onde o brilho do bronze encontrava o verde das folhas, o **Laboratório BudGanja**. Lá vivia o [Inspetor](${INSPETOR}), um detetive botânico de chapéu engraçado e um braço mecânico de bronze cheio de engrenagens misteriosas — com ele, cuidava das plantas com precisão quase mágica.

Certo dia, o Inspetor encontrou uma **sementinha** muito especial.

> «Para esta semente virar uma planta Sênior — a [Árvore da Vida](/posts/post-inspecao-palavra-arvore-da-vida.html) do laboratório — precisaremos de toda a equipe!» — anunciou ele, ajustando a lupa.

A primeira a chegar foi a [Dona Maria](${DONA_MARIA}), a sábia mãe do Inspetor. Trouxe o balde de **Super Solo**, uma «cama fofinha cheia de vitaminas» para a semente. «O segredo está no carinho e no Chá Microbiano», disse ela, enquanto a [Joaninha Joana](${JOANA}) pousava numa folha, pronta a espantar qualquer «monstro» (como os pulgões) que atrapalhasse o sono da sementinha.

Enquanto a semente acordava e criava raízes, o Inspetor media a luz com o **Luxímetro** e o ar com o **VPD**, para o clima ficar sempre perfeito — como um dia de sol no parque.

De repente, ouviu-se violão e batidas de DJ. Eram os [Three Little Birds](${PASSARINHOS}), os ajudantes de inteligência artificial que cuidavam da alegria do laboratório:

- O **Passarinho Verde** usava uma calculadora mágica para contar cada gota de água e nutriente.
- O **Passarinho Amarelo** segurava a prancheta do **Diário de Pesquisas**, marcando cada centímetro que a planta crescia.
- E a [DJ Brisa](${DJ_BRISA}), a arara mais animada de todas, ligou a [Rádio BudGanja](${RADIO})! Tocava músicas que faziam as folhas dançarem, lembrando a todos: *cada pequena coisa vai ficar bem*.

A plantinha cresceu feliz: **Brotinho** → **Vegetativo** (folhas fortes) → linda **Floração**. Quando a plantinha chegou à **Floração**, apareceu um contacto novo: **[Flor Maria Jane Maria](${FLOR})**, a flor do canal Joana e Maria — o encontro visível do solo da Dona Maria com a guarda da Joana.

Quando recebeu o selo de **Cultivador Sênior**, o laboratório inteiro virou festa!

O Inspetor olhou para a equipe — a tecnologia do braço, a sabedoria da mãe e a música dos pássaros — e sorriu. Sabia que, quando a ciência e a natureza trabalham juntas, qualquer semente pode virar uma floresta de sonhos.

E assim aprenderam: **cultivar é como uma grande música** — precisa de ritmo, cuidado e muita amizade.

## O que a história ensina

| Lição | Na prática |
|-------|------------|
| Solo vivo | Terra fofa, rica e cheia de vida microbiana — ver [Super Solo](${SUPER_SOLO}) |
| Luz e clima | Medir com carinho (Luxímetro, VPD) — ver [Luxímetro](${LUXIMETRO}) |
| Observar | Anotar o crescimento no [Diário](${DIARIO}) |
| Proteção natural | Joaninhas e amigos do jardim, sem veneno |
| Alegria | Música, ritmo e companhia — [Rádio](${RADIO}) |
| Equipe | Ninguém cuida sozinho — natureza + ciência + família |

## Fases da plantinha

1. **Semente** — descanso e preparação da cama (solo).  
2. **Brotinho** — primeiras folhas; água com delicadeza.  
3. **Vegetativo** — folhas fortes; luz e nutrientes em equilíbrio.  
4. **Floração** — a planta mostra a sua magia.  
5. **Sênior** — selo de quem cuidou com método e coração.

## Elos

- Hub [Vida](${HUB}) · personagens: [Inspetor](${INSPETOR}), [Dona Maria](${DONA_MARIA}), [DJ Brisa](${DJ_BRISA}), [Joana](${JOANA}), [Flor Maria Jane Maria](${FLOR}), [Three Little Birds](${PASSARINHOS})
- Ferramentas: [Super Solo](${SUPER_SOLO}) · [Luxímetro](${LUXIMETRO}) · [Diário](${DIARIO}) · [Rádio](${RADIO}) · [Plantas](${PLANTAS})
- Biblioteca: [Artes](${ARTES})

## Status

**Publicado** — conto âncora da série Vida (2026-08-01).`;
}

function buildHistoriaBodyEn() {
  return `## Scope

A story from the **BudGanja Lab**: how a tiny seed becomes a happy plant when science, nature and friendship work together — gentle plant-care lessons.

> Educational content. Not clinical advice. The lab is a metaphor for care — rhythm, attention and friendship.

Illustrated hub: [Vida](${HUB}).

## The story

Once upon a time, where bronze light met green leaves, lived the **BudGanja Laboratory**. There lived the [Inspector](${INSPETOR}), a botanical detective with a funny hat and a mysterious bronze mechanical arm he used to care for plants with almost magical precision.

One day he found a very special **seed**.

> “For this seed to become a Senior plant, we’ll need the whole team!” — he said, adjusting his loupe.

First came [Dona Maria](${DONA_MARIA}), the Inspector’s wise mother, with a bucket of **Super Soil** — a “fluffy vitamin bed” for the seed. “The secret is kindness and Microbial Tea,” she said, while [Ladybug Joana](${JOANA}) landed on a leaf, ready to chase away any “monsters” (like aphids) that might disturb the seed’s sleep.

As the seed woke and grew roots, the Inspector measured light with the **lux meter** and air with **VPD**, keeping the climate perfect — like a sunny day in the park.

Suddenly: guitar and DJ beats. The [Three Little Birds](${PASSARINHOS}) had arrived — AI helpers who looked after the lab’s joy:

- The **Green Bird** counted every drop of water and nutrient.
- The **Yellow Bird** held the **Research Diary** clipboard, marking every centimetre of growth.
- And [DJ Brisa](${DJ_BRISA}), the liveliest macaw, turned on [BudGanja Radio](${RADIO})! Songs made the leaves dance, reminding everyone: *every little thing is gonna be alright*.

The plant grew happily: **Sprout** → **Vegetative** → beautiful **Flowering**. At bloom, **[Flor Maria Jane Maria](${FLOR})** appeared — the flower of the Joana and Maria channel.

When it earned the **Senior Grower** seal, the whole lab threw a party!

The Inspector smiled at his team — tech, motherly wisdom and bird songs. When science and nature work together, any seed can become a forest of dreams.

And so they learned: **growing is like a great song** — it needs rhythm, care and lots of friendship.

## Status

**Published** — Vida series anchor story (2026-08-01).`;
}

function buildHistoriaBodyEs() {
  return `## Alcance

Cuento del **Laboratorio BudGanja**: cómo una semillita se vuelve una planta feliz cuando ciencia, naturaleza y amistad caminan juntas.

> Contenido educativo. No es consejo clínico. El laboratorio es metáfora de cuidado.

Hub: [Vida](${HUB}).

## La historia

Había una vez, donde el bronce encontraba el verde de las hojas, el **Laboratorio BudGanja**. Allí vivía el [Inspector](${INSPETOR}), un detective botánico con sombrero gracioso y un brazo mecánico de bronce con el que cuidaba las plantas con precisión mágica.

Un día encontró una **semillita** muy especial.

> «¡Para que esta semilla se vuelva planta Sénior, necesitaremos a todo el equipo!» — anunció, ajustando la lupa.

La primera en llegar fue [Doña María](${DONA_MARIA}), la sabia madre del Inspector, con su balde de **Super Suelo**, una «camita mullida llena de vitaminas». «El secreto está en el cariño y el Té Microbiano», dijo, mientras la [Mariquita Juana](${JOANA}) se posaba en una hoja lista para espantar a cualquier «monstruo» (como los pulgones).

Mientras la semilla despertaba, el Inspector medía la luz y el aire para que el clima fuera perfecto.

De pronto: guitarra y beats de DJ. Eran los [Three Little Birds](${PASSARINHOS}):

- El **Pajarito Verde** contaba cada gota.
- El **Pajarito Amarillo** anotaba el crecimiento en el **Diario**.
- Y [DJ Brisa](${DJ_BRISA}) encendió la [Radio BudGanja](${RADIO}), recordando que *cada pequeña cosa va a estar bien*.

La plantita creció feliz hasta la **Floración**. Entonces apareció **[Flor Maria Jane Maria](${FLOR})**, la flor del canal Joana e Maria. Recibió el sello de **Cultivador Sénior**. ¡Fiesta en el laboratorio!

Cultivar es como una gran canción: ritmo, cuidado y mucha amistad.

## Estado

**Publicado** — cuento ancla de la serie Vida (2026-08-01).`;
}

function buildPersonagemBody(cfg) {
  if (cfg.bodyOverride) return cfg.bodyOverride;
  return `## Escopo

Ficha do personagem **${cfg.nome}** na série [Vida](${HUB}) — conto do laboratório sobre cuidar de plantas com carinho. Fonte narrativa do laboratório BudGanja.

> Conteúdo educacional da série Vida.

## Quem é

| Campo | Valor |
|-------|-------|
| Nome | **${cfg.nome}** |
| Função | ${cfg.funcao} |
| Especialidade | ${cfg.especialidade} |
| Identidade | ${cfg.identidade} |
| Série | Vida · contos |
| Hub | [Vida](${HUB}) |
| História completa | [O Laboratório e a Sementinha](${HISTORIA}) |

## O que ensina

${cfg.ensina}

## Na prática

${cfg.pratica}

## Elos

- [História completa](${HISTORIA}) · hub [Vida](${HUB})
- Equipe: [Inspetor](${INSPETOR}) · [Dona Maria](${DONA_MARIA}) · [DJ Brisa](${DJ_BRISA}) · [Joana](${JOANA}) · [Flor Maria Jane Maria](${FLOR}) · [Three Little Birds](${PASSARINHOS})
${cfg.elosExtra || ''}

## Status

**Publicado** — personagem da série Vida (${cfg.date || '2026-08-01'}).`;
}

function buildHistoriaPost() {
  return contoPost({
    title: 'Vida — O Laboratório e a Sementinha',
    titleEn: 'Vida — The Lab and the Little Seed',
    titleEs: 'Vida — El Laboratorio y la Semillita',
    excerpt:
      'Conto do laboratório: o Inspetor, a Dona Maria, a Joaninha Joana e os Three Little Birds ensinam a cuidar de uma semente com ciência, natureza e amizade.',
    excerptEn:
      'Lab story: the Inspector, Dona Maria, Ladybug Joana and the Three Little Birds teach how to care for a seed with science, nature and friendship.',
    excerptEs:
      'Cuento del laboratorio: el Inspector, Doña María, la Mariquita Juana y los Three Little Birds enseñan a cuidar una semilla con ciencia, naturaleza y amistad.',
    slug: 'inspecao-conto-vida-laboratorio',
    seriesOrder: 1,
    coverImage: 'imagens/inspecoes/vida-laboratorio-cover.jpg',
    body: buildHistoriaBody(),
    contentEn: buildHistoriaBodyEn(),
    contentEs: buildHistoriaBodyEs()
  });
}

const PERSONAGENS = [
  {
    seriesOrder: 2,
    slug: 'inspecao-personagem-inspetor',
    coverImage: 'imagens/inspecoes/vida-inspetor-cover.jpg',
    nome: 'O Inspetor',
    title: 'Vida — O Inspetor, detetive botânico',
    titleEn: 'Vida — The Inspector, botanical detective',
    titleEs: 'Vida — El Inspector, detective botánico',
    excerpt:
      'Detetive botânico de chapéu engraçado e braço de bronze: mede luz e clima para a planta crescer feliz.',
    excerptEn:
      'Botanical detective with a funny hat and bronze arm: measures light and climate so plants grow happily.',
    excerptEs:
      'Detective botánico con sombrero gracioso y brazo de bronce: mide luz y clima para que la planta crezca feliz.',
    funcao: 'Autoridade técnica — inspeciona o «hardware» do cuidado (luz, ar, ferramentas) com rigor simpático.',
    especialidade: 'Braço mecânico de bronze, lupa, Luxímetro e medidores de clima (VPD/DLI).',
    identidade: 'Une mistério (braço enigmático) com o rigor do Diário de Pesquisas — o detetive das folhas.',
    ensina: `- Observar antes de agir: olhar a planta é o primeiro instrumento.  
- Usar ferramentas para **ajudar**, não para complicar.  
- Ciência pode ser divertida — números também cuidam.`,
    pratica: `- Experimentar o [Luxímetro](${LUXIMETRO}) e falar sobre «luz boa».  
- Anotar no [Diário](${DIARIO}) uma observação por dia («hoje a folha abriu»).`,
    elosExtra: `- Ferramentas: [Luxímetro](${LUXIMETRO}) · [Diário](${DIARIO})`,
    color1: '#3a3420',
    color2: '#1a2818',
    accent: '#d4af37'
  },
  {
    seriesOrder: 3,
    slug: 'inspecao-personagem-dona-maria',
    coverImage: 'imagens/inspecoes/vida-dona-maria-cover.jpg',
    nome: 'Dona Maria',
    title: 'Vida — Dona Maria, mestra do solo',
    titleEn: 'Vida — Dona Maria, soil master',
    titleEs: 'Vida — Doña María, maestra del suelo',
    excerpt:
      'Mãe do Inspetor e guardiã do Super Solo: o coração orgânico do laboratório — terra viva e carinho.',
    excerptEn:
      'The Inspector’s mother and guardian of Super Soil: the lab’s organic heart — living earth and kindness.',
    excerptEs:
      'Madre del Inspector y guardiana del Super Suelo: el corazón orgánico del laboratorio.',
    funcao: 'Matriarca e guardiã da sabedoria orgânica e ancestral do laboratório.',
    especialidade: 'Super Solo, fertilizantes tradicionais e vida microbiana («Chá Microbiano»).',
    identidade: 'Mãe do Inspetor — o «coração» do projeto: alta tecnologia do filho em equilíbrio com a terra viva.',
    ensina: `- Solo é **cama** da semente: fofinho, nutritivo e vivo.  
- Carinho conta tanto quanto a receita.  
- Natureza e ciência não são inimigas — dançam juntas.`,
    pratica: `- Explorar a [calculadora Super Solo](${SUPER_SOLO}).  
- Montar um vasinho com terra boa e recordar: «aqui dorme a semente».`,
    elosExtra: `- Ferramenta: [Super Solo](${SUPER_SOLO})`,
    color1: '#2a3a1a',
    color2: '#1a2410',
    accent: '#8bc34a'
  },
  {
    seriesOrder: 4,
    slug: 'inspecao-personagem-dj-brisa',
    coverImage: 'imagens/inspecoes/vida-dj-brisa-cover.jpg',
    nome: 'DJ Brisa',
    title: 'Vida — DJ Brisa, a voz da harmonia',
    titleEn: 'Vida — DJ Brisa, the voice of harmony',
    titleEs: 'Vida — DJ Brisa, la voz de la armonía',
    excerpt:
      'Arara DJ da Rádio BudGanja: torna o aprendizado leve, animado e cheio de boa vibração.',
    excerptEn:
      'Macaw DJ of BudGanja Radio: makes learning light, fun and full of good vibes.',
    excerptEs:
      'Guacamaya DJ de la Radio BudGanja: hace el aprendizaje ligero y alegre.',
    funcao: 'DJ oficial da Rádio BudGanja e interface de comunicação da IA — educação com vibe.',
    especialidade: 'Rádio, ritmo e interação: lembra que aprender pode ser alegre.',
    identidade: 'Arara animada que lidera o esquadrão de pássaros — *every little thing is gonna be alright*.',
    ensina: `- Plantas (e pessoas) crescem melhor com **alegria**.  
- Música dá ritmo ao cuidado.  
- Comunicar com carinho faz parte do cultivo.`,
    pratica: `- Ouvir a [Rádio BudGanja](${RADIO}) enquanto rega.  
- Inventar uma «música da rega» de 30 segundos.`,
    elosExtra: `- [Rádio BudGanja](${RADIO})`,
    color1: '#3a1a28',
    color2: '#1a2818',
    accent: '#e85d4c'
  },
  {
    seriesOrder: 5,
    slug: 'inspecao-personagem-joaninha-joana',
    coverImage: 'imagens/inspecoes/vida-joaninha-joana-cover.jpg',
    nome: 'Joaninha Joana',
    title: 'Vida — Joaninha Joana, guardiã biológica',
    titleEn: 'Vida — Ladybug Joana, biological guardian',
    titleEs: 'Vida — Mariquita Juana, guardiana biológica',
    excerpt:
      'Pet da Dona Maria e ícone do controle biológico: protege as folhas sem veneno químico.',
    excerptEn:
      'Dona Maria’s pet and icon of biological control: protects leaves without chemical poison.',
    excerptEs:
      'Mascota de Doña María e icono del control biológico: protege las hojas sin veneno.',
    funcao: 'Especialista em controle biológico natural — a «segurança» das plantas.',
    especialidade: 'Vigiar folhas contra pragas (os «monstros» como pulgões) de forma orgânica.',
    identidade: 'Pet de estimação da Dona Maria — pureza e proteção orgânica do laboratório.',
    ensina: `- Nem todo bichinho é inimigo — muitos são **amigos do jardim**.  
- Proteger sem destruir o equilíbrio.  
- Observar as folhas todos os dias.`,
    pratica: `- Procurar joaninhas no jardim ou num livro de insetos.  
- Desenhar a Joana a «espantar» um pulgão (sem medo, com humor).`,
    elosExtra: `- Catálogo: [Plantas](${PLANTAS})`,
    color1: '#3a1818',
    color2: '#1a2010',
    accent: '#e74c3c'
  },
  {
    seriesOrder: 6,
    slug: 'inspecao-personagem-three-little-birds',
    coverImage: 'imagens/inspecoes/vida-three-little-birds-cover.jpg',
    nome: 'Three Little Birds',
    title: 'Vida — Three Little Birds, o esquadrão da alegria',
    titleEn: 'Vida — Three Little Birds, the joy squad',
    titleEs: 'Vida — Three Little Birds, el escuadrón de la alegría',
    excerpt:
      'Trio de pássaros-IA: contas precisas, diário organizado e DJ Brisa na harmonia — do semente ao sênior.',
    excerptEn:
      'AI bird trio: precise counts, organised diary and DJ Brisa on harmony — from seed to senior.',
    excerptEs:
      'Trío de pájaros-IA: cuentas precisas, diario organizado y DJ Brisa en la armonía.',
    funcao: 'Suporte de IA dividido em três: técnica, rotina e comunicação.',
    especialidade:
      'Verde = calculadoras; Amarelo = Diário de Pesquisas; Brisa = rádio e clima afetivo do laboratório.',
    identidade:
      'Esquadrão que guia desde a semente até Cultivador Sênior — tecnologia leve com coração reggae.',
    ensina: `- Contar gotas e nutrientes com responsabilidade (Passarinho Verde).  
- Não esquecer o plano — anotar é cuidar (Passarinho Amarelo).  
- Manter a alegria no laboratório (DJ Brisa).`,
    pratica: `- Abrir o [Diário](${DIARIO}) e marcar «tarefa do dia».  
- Explorar uma [calculadora](/calculadoras/) e recordar: «números também são amigos».  
- Dançar com a [Rádio](${RADIO}).`,
    elosExtra: `- [Diário](${DIARIO}) · [Ferramentas](/calculadoras/) · [Rádio](${RADIO}) · [DJ Brisa](${DJ_BRISA})`,
    color1: '#1a3020',
    color2: '#2a2810',
    accent: '#f0d060'
  },
  buildFlorMariaPersonagemCfg({
    HUB,
    HISTORIA,
    INSPETOR,
    DONA_MARIA,
    DJ_BRISA,
    JOANA,
    PASSARINHOS,
    PLANTAS,
    FLOR_HREF: FLOR,
    FLOR_PALAVRA: '/posts/post-inspecao-palavra-flor.html',
    MARIA_PALAVRA: '/posts/post-inspecao-palavra-maria.html',
    CONTATO: '/posts/post-inspecao-palavra-linha-10-cerol.html',
    CANNABIS: '/plantas/cannabis-sativa/',
    VALEU: '/posts/post-inspecao-palavra-valeu.html',
    VIDA_AMO: '/posts/post-inspecao-expressao-eu-amo-a-vida.html'
  })
];

function buildPersonagemPost(cfg) {
  const body = buildPersonagemBody(cfg);
  const contentEn =
    cfg.contentEn ||
    body
      .replace(/Conteúdo educacional da série Vida\./g, 'Educational content from the Vida series.')
      .replace(/conto do laboratório sobre cuidar de plantas com carinho/g, 'lab story about caring for plants with kindness')
      .replace(/Ficha do personagem/g, 'Character sheet')
      .replace(/## Quem é/g, '## Who they are')
      .replace(/## O que ensina/g, '## What they teach')
      .replace(/## Na prática/g, '## In practice')
      .replace(/## Status/g, '## Status')
      .replace(/\*\*Publicado\*\*/g, '**Published**');
  const contentEs =
    cfg.contentEs ||
    body
      .replace(/Conteúdo educacional da série Vida\./g, 'Contenido educativo de la serie Vida.')
      .replace(/conto do laboratório sobre cuidar de plantas com carinho/g, 'cuento del laboratorio sobre cuidar plantas con cariño')
      .replace(/Ficha do personagem/g, 'Ficha del personaje')
      .replace(/## Quem é/g, '## Quién es')
      .replace(/## O que ensina/g, '## Qué enseña')
      .replace(/## Na prática/g, '## En la práctica')
      .replace(/\*\*Publicado\*\*/g, '**Publicado**');
  return contoPost({
    title: cfg.title,
    titleEn: cfg.titleEn,
    titleEs: cfg.titleEs,
    excerpt: cfg.excerpt,
    excerptEn: cfg.excerptEn,
    excerptEs: cfg.excerptEs,
    slug: cfg.slug,
    date: cfg.date,
    seriesOrder: cfg.seriesOrder,
    coverImage: cfg.coverImage,
    body,
    contentEn,
    contentEs
  });
}

function buildVidaPosts() {
  return [buildHistoriaPost()].concat(PERSONAGENS.map(buildPersonagemPost));
}

module.exports = {
  buildVidaPosts,
  buildHistoriaPost,
  PERSONAGENS,
  HUB
};
