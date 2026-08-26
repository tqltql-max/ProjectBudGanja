'use strict';

/** Acrescenta sugestões Artes à fila. Uso: node scripts/add-artes-sugestoes.js */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'content', 'inspecoes-sugestoes.json');
const sug = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const items = Array.isArray(sug.items) ? sug.items : [];
const existing = new Set(items.map((x) => x.id));

const neu = [
  {
    id: 'arte-diamba-hq-paiva',
    title: 'Diamba — Histórias do Proibicionismo no Brasil (HQ, Daniel Paiva)',
    titleEn: 'Diamba — Stories of Prohibition in Brazil (comics, Daniel Paiva)',
    titleEs: 'Diamba — Historias del prohibicionismo en Brasil (HQ, Daniel Paiva)',
    tipo: 'arte',
    priority: 2,
    status: 'ideia',
    why: 'HQ documentário sobre criminalização e racismo estrutural — distinguir da antologia Diamba Sarabamba (1986) já inspecionada.',
    whyEn:
      'Documentary comics on criminalization and structural racism — distinct from the 1986 Diamba Sarabamba anthology already inspected.',
    whyEs:
      'HQ documental sobre criminalización y racismo estructural — distinta de la antología Diamba Sarabamba (1986).',
    suggestedSlug: 'inspecao-arte-diamba-hq-paiva',
    seriesHint: 'artes-cultura',
    sources: [
      'https://www.brasaeditora.com.br/produtos/livro-hq-diamba-2ed/',
      '/posts/post-inspecao-arte-diamba-sarabamba.html'
    ],
    notes: 'Livro primeiro (HQ); não confundir com coletânea Ground 1986.'
  },
  {
    id: 'arte-confissoes-comedor-opio',
    title: 'Confissões de um Comedor de Ópio (De Quincey) — génese literária',
    titleEn: 'Confessions of an English Opium-Eater (De Quincey) — literary genesis',
    titleEs: 'Confesiones de un inglés comedor de opio (De Quincey) — génesis literaria',
    tipo: 'arte',
    priority: 2,
    status: 'ideia',
    why: 'Marco literário do ópio; elo natural com A Última Casa de Ópio (Tosches) — sem romantizar uso.',
    whyEn:
      'Literary landmark of opium; natural link to The Last Opium Den (Tosches) — without romanticizing use.',
    whyEs:
      'Hito literario del opio; vínculo natural con A Última Casa de Ópio — sin romantizar el uso.',
    suggestedSlug: 'inspecao-arte-confissoes-comedor-opio',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/Confessions_of_an_English_Opium-Eater',
      '/posts/post-inspecao-arte-a-ultima-casa-de-opio.html'
    ],
    notes: 'Livro primeiro (1821); metáfora ≠ protocolo.'
  },
  {
    id: 'arte-o-mundo-de-sofia',
    title: 'O Mundo de Sofia (Gaarder) — filosofia narrada em escala global',
    titleEn: "Sophie's World (Gaarder) — narrated philosophy at global scale",
    titleEs: 'El mundo de Sofía (Gaarder) — filosofía narrada a escala global',
    tipo: 'arte',
    priority: 2,
    status: 'ideia',
    why: 'Obra-marco de Gaarder (1991); complementar O Dia do Curinga — autor já em Pessoas.',
    whyEn:
      'Gaarder landmark (1991); complements The Solitaire Mystery — author already in People.',
    whyEs:
      'Obra hito de Gaarder (1991); complementa O Dia do Curinga — autor ya en Personas.',
    suggestedSlug: 'inspecao-arte-o-mundo-de-sofia',
    seriesHint: 'artes-cultura',
    sources: [
      'https://pt.wikipedia.org/wiki/O_Mundo_de_Sofia',
      '/posts/post-inspecao-figura-jostein-gaarder.html',
      '/posts/post-inspecao-arte-o-dia-do-curinga.html'
    ],
    notes: 'Livro primeiro; biografia fica em Gaarder.'
  },
  {
    id: 'arte-alice-atraves-do-espelho',
    title: 'Alice Através do Espelho (Carroll, 1871) — continuação literária',
    titleEn: 'Through the Looking-Glass (Carroll, 1871) — literary sequel',
    titleEs: 'A través del espejo (Carroll, 1871) — secuela literaria',
    tipo: 'arte',
    priority: 3,
    status: 'ideia',
    why: 'Segunda obra de Alice — espelho, xadrez e linguagem; par com a ficha do livro de 1865.',
    whyEn: 'Alice sequel — mirror, chess and language; pair with the 1865 book sheet.',
    whyEs: 'Secuela de Alicia — espejo, ajedrez y lenguaje; par con la ficha del libro de 1865.',
    suggestedSlug: 'inspecao-arte-alice-atraves-do-espelho',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/Through_the_Looking-Glass',
      '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html'
    ],
    notes: 'Livro primeiro; Disney secundário se entrar.'
  },
  {
    id: 'arte-botany-of-desire',
    title: 'A Botânica do Desejo (Michael Pollan) — plantas que nos domesticam',
    titleEn: 'The Botany of Desire (Michael Pollan) — plants that domesticate us',
    titleEs: 'La botánica del deseo (Michael Pollan) — plantas que nos domestican',
    tipo: 'arte',
    priority: 2,
    status: 'ideia',
    why: 'Ensaio com capítulo da cannabis/maçã/batata/tulipa — elo Plantas × Artes × História das Coisas.',
    whyEn:
      'Essay with cannabis/apple/potato/tulip chapters — Plants × Arts × Story of Stuff link.',
    whyEs: 'Ensayo con capítulos cannabis/manzana/patata/tulipán — vínculo Plantas × Artes.',
    suggestedSlug: 'inspecao-arte-botanica-do-desejo',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/The_Botany_of_Desire',
      '/plantas/',
      '/posts/post-inspecao-arte-a-historia-das-coisas.html'
    ],
    notes: 'Livro primeiro; doc PBS como eco secundário.'
  },
  {
    id: 'arte-paraisos-artificiais',
    title: 'Os Paraísos Artificiais (Baudelaire) — haxixe e modernidade literária',
    titleEn: 'Artificial Paradises (Baudelaire) — hashish and literary modernity',
    titleEs: 'Los paraísos artificiales (Baudelaire) — hachís y modernidad literaria',
    tipo: 'arte',
    priority: 3,
    status: 'ideia',
    why: 'Ensaio clássico sobre haxixe/ópio na literatura; elo com Palavras (droga) e Tosches — sem glamourizar.',
    whyEn:
      'Classic essay on hashish/opium in literature; link to Words (droga) and Tosches — no glamorizing.',
    whyEs: 'Ensayo clásico sobre hachís/opio; vínculo con Palabras y Tosches — sin glamurizar.',
    suggestedSlug: 'inspecao-arte-paraisos-artificiais',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/Les_Paradis_artificiels',
      '/posts/post-inspecao-palavra-droga.html',
      '/posts/post-inspecao-arte-a-ultima-casa-de-opio.html'
    ],
    notes: 'Texto literário ≠ protocolo de substâncias.'
  },
  {
    id: 'arte-easy-rider',
    title: 'Easy Rider (1969) — estrada, contracultura e mito da liberdade',
    titleEn: 'Easy Rider (1969) — road, counterculture and the freedom myth',
    titleEs: 'Easy Rider (1969) — carretera, contracultura y mito de la libertad',
    tipo: 'arte',
    priority: 3,
    status: 'ideia',
    why: 'Marco do cinema de estrada e da contracultura; elo com caminho/passar.',
    whyEn: 'Landmark road/counterculture film; link to caminho/passar.',
    whyEs: 'Hito del cine de carretera y contracultura; vínculo con caminho/passar.',
    suggestedSlug: 'inspecao-filme-easy-rider',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/Easy_Rider',
      '/posts/post-inspecao-palavra-caminho.html'
    ],
    notes: 'Filme primeiro; não romantizar overdose nem tráfico.'
  },
  {
    id: 'arte-dallas-buyers-club',
    title: 'Dallas Buyers Club (2013) — acesso, medicina e burocracia',
    titleEn: 'Dallas Buyers Club (2013) — access, medicine and bureaucracy',
    titleEs: 'Dallas Buyers Club (2013) — acceso, medicina y burocracia',
    tipo: 'arte',
    priority: 3,
    status: 'ideia',
    why: 'Drama sobre acesso a tratamentos — eco com literacia medicinal (UNIFESP), sem confundir com Legado.',
    whyEn: 'Drama on treatment access — echo with medicinal literacy (UNIFESP); not Legacy.',
    whyEs: 'Drama sobre acceso a tratamientos — eco con literacia medicinal; no es Legado.',
    suggestedSlug: 'inspecao-filme-dallas-buyers-club',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/Dallas_Buyers_Club',
      '/biblioteca/unifesp/'
    ],
    notes: 'Ficção baseada em factos; não é aconselhamento médico.'
  },
  {
    id: 'arte-wall-e',
    title: 'WALL-E (2008) — consumo, lixo e planeta finito',
    titleEn: 'WALL-E (2008) — consumption, waste and a finite planet',
    titleEs: 'WALL-E (2008) — consumo, basura y planeta finito',
    tipo: 'arte',
    priority: 3,
    status: 'ideia',
    why: 'Parábola animada do extrair-fazer-descartar; par com A História das Coisas (Leonard).',
    whyEn: 'Animated parable of take-make-waste; pair with The Story of Stuff (Leonard).',
    whyEs: 'Parábola animada de extraer-hacer-desechar; par con A História das Coisas.',
    suggestedSlug: 'inspecao-filme-wall-e',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/WALL-E',
      '/posts/post-inspecao-arte-a-historia-das-coisas.html'
    ],
    notes: 'Filme primeiro; elo Artes consumo/materiais.'
  },
  {
    id: 'arte-primavera-silenciosa',
    title: 'Primavera Silenciosa (Rachel Carson, 1962) — ensaio fundador ecológico',
    titleEn: 'Silent Spring (Rachel Carson, 1962) — founding ecological essay',
    titleEs: 'Primavera silenciosa (Rachel Carson, 1962) — ensayo ecológico fundador',
    tipo: 'arte',
    priority: 2,
    status: 'ideia',
    why: 'Livro que mudou a literacia ambiental; elo com História das Coisas e derivados de risco.',
    whyEn: 'Book that changed environmental literacy; link to Story of Stuff and risk derivatives.',
    whyEs: 'Libro que cambió la literacia ambiental; vínculo con História das Coisas y derivados.',
    suggestedSlug: 'inspecao-arte-primavera-silenciosa',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/Silent_Spring',
      '/posts/post-inspecao-arte-a-historia-das-coisas.html',
      '/biblioteca/inspecoes/#inspecoes-derivados'
    ],
    notes: 'Livro primeiro; Pessoas Carson opcional depois.'
  },
  {
    id: 'arte-tropa-de-elite',
    title: 'Tropa de Elite (2007) — polícia, morro e discurso da guerra às drogas',
    titleEn: 'Elite Squad (2007) — police, favela and the war-on-drugs discourse',
    titleEs: 'Tropa de Elite (2007) — policía, morro y discurso de la guerra a las drogas',
    tipo: 'arte',
    priority: 3,
    status: 'ideia',
    why: 'Marco do cinema BR sobre Estado e tráfico; contrastar ficção, estigma (Palavras) e Diamba HQ.',
    whyEn: 'BR cinema landmark on State and trafficking; contrast fiction, stigma (Words) and Diamba HQ.',
    whyEs: 'Hito del cine BR sobre Estado y tráfico; contrastar ficción, estigma y Diamba HQ.',
    suggestedSlug: 'inspecao-filme-tropa-de-elite',
    seriesHint: 'artes-cultura',
    sources: [
      'https://pt.wikipedia.org/wiki/Tropa_de_Elite',
      '/posts/post-inspecao-palavra-droga.html'
    ],
    notes: 'Filme primeiro; crítica cultural, não apologia nem glamour de violência.'
  },
  {
    id: 'arte-up-in-smoke',
    title: 'Up in Smoke (1978) — comédia Cheech e Chong e o estereótipo',
    titleEn: 'Up in Smoke (1978) — Cheech and Chong comedy and the stereotype',
    titleEs: 'Up in Smoke (1978) — comedia Cheech y Chong y el estereotipo',
    tipo: 'arte',
    priority: 4,
    status: 'ideia',
    why: 'Marco da comédia canábica US; auditar estereótipo vs literacia (Palavras/maconha).',
    whyEn: 'Landmark US cannabis comedy; audit stereotype vs literacy (Words/maconha).',
    whyEs: 'Hito de la comedia cannábica; auditar estereotipo vs literacia.',
    suggestedSlug: 'inspecao-filme-up-in-smoke',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/Up_in_Smoke',
      '/posts/post-inspecao-palavra-maconha.html'
    ],
    notes: 'Mapear tropos; não romantizar nem endossar uso.'
  },
  {
    id: 'arte-fed-up',
    title: 'Fed Up (2014) — documentário sobre açúcar e indústria',
    titleEn: 'Fed Up (2014) — documentary on sugar and industry',
    titleEs: 'Fed Up (2014) — documental sobre azúcar e industria',
    tipo: 'arte',
    priority: 3,
    status: 'ideia',
    why: 'Elo Artes × Derivados (cana/açúcar) e Lair Ribeiro — consumismo metabólico.',
    whyEn: 'Arts × Derivatives (cane/sugar) and Lair Ribeiro — metabolic consumerism.',
    whyEs: 'Artes × Derivados (caña/azúcar) y Lair Ribeiro — consumismo metabólico.',
    suggestedSlug: 'inspecao-filme-fed-up',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/Fed_Up_(2014_film)',
      '/posts/post-inspecao-derivado-cana-de-acucar.html',
      '/posts/post-inspecao-divulgacao-lair-ribeiro.html'
    ],
    notes: 'Documentário; não é aconselhamento médico.'
  },
  {
    id: 'arte-super-size-me',
    title: 'Super Size Me (2004) — corpo, marca e experimento mediático',
    titleEn: 'Super Size Me (2004) — body, brand and media experiment',
    titleEs: 'Super Size Me (2004) — cuerpo, marca y experimento mediático',
    tipo: 'arte',
    priority: 4,
    status: 'ideia',
    why: 'Documentário-performance sobre fast-food; par com Fed Up e derivados de risco.',
    whyEn: 'Performance documentary on fast food; pair with Fed Up and risk derivatives.',
    whyEs: 'Documental-performance sobre comida rápida; par con Fed Up y derivados.',
    suggestedSlug: 'inspecao-filme-super-size-me',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/Super_Size_Me',
      '/posts/post-inspecao-derivado-cana-de-acucar.html'
    ],
    notes: 'Obra mediática; limites metodológicos do «experimento».'
  },
  {
    id: 'arte-medo-e-delirio',
    title: 'Medo e Delírio em Las Vegas (Thompson / Gilliam) — livro e filme',
    titleEn: 'Fear and Loathing in Las Vegas (Thompson / Gilliam) — book and film',
    titleEs: 'Miedo y asco en Las Vegas (Thompson / Gilliam) — libro y película',
    tipo: 'arte',
    priority: 4,
    status: 'ideia',
    why: 'Gonzo e psicadelia na cultura pop; livro primeiro, filme como adaptação — sem romantizar.',
    whyEn: 'Gonzo and psychedelia; book first, film as adaptation — no romanticizing.',
    whyEs: 'Gonzo y psicodelia; libro primero, película como adaptación — sin romantizar.',
    suggestedSlug: 'inspecao-arte-medo-e-delirio-las-vegas',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/Fear_and_Loathing_in_Las_Vegas',
      'https://en.wikipedia.org/wiki/Fear_and_Loathing_in_Las_Vegas_(film)'
    ],
    notes: 'Hierarquia: livro 1971 → filme 1998.'
  },
  {
    id: 'arte-high-maintenance',
    title: 'High Maintenance — série antológica do entregador',
    titleEn: 'High Maintenance — anthology series of the guy who delivers',
    titleEs: 'High Maintenance — serie antológica del repartidor',
    tipo: 'arte',
    priority: 4,
    status: 'ideia',
    why: 'Série sobre vidas urbanas com cannabis como fio — quotidiano vs estereótipo (Weeds / Up in Smoke).',
    whyEn: 'Urban lives with cannabis as thread — everyday vs stereotype (Weeds / Up in Smoke).',
    whyEs: 'Vidas urbanas con cannabis como hilo — cotidiano vs estereotipo.',
    suggestedSlug: 'inspecao-serie-high-maintenance',
    seriesHint: 'artes-cultura',
    sources: ['https://en.wikipedia.org/wiki/High_Maintenance'],
    notes: 'Vimeo → HBO; não romantizar.'
  },
  {
    id: 'arte-beto-e-de-quadrinhos',
    title: 'Beto e Dé e outros Quadrinhos Canábicos (Daniel Paiva)',
    titleEn: 'Beto e Dé and Other Cannabis Comics (Daniel Paiva)',
    titleEs: 'Beto e Dé y otros cómics cannábicos (Daniel Paiva)',
    tipo: 'arte',
    priority: 3,
    status: 'ideia',
    why: 'Coletânea de tirinhas canábicas BR; elo com a HQ Diamba (mesmo autor) e Palavras/maconha.',
    whyEn: 'Brazilian cannabis strips; link to Diamba HQ (same author) and Words/maconha.',
    whyEs: 'Tiras cannábicas BR; vínculo con HQ Diamba y Palabras/maconha.',
    suggestedSlug: 'inspecao-arte-beto-e-de',
    seriesHint: 'artes-cultura',
    sources: [
      'https://literaturars.com.br/2023/08/30/diamba-historias-do-proibicionismo-no-brasil/'
    ],
    notes: 'Obra gráfica; par com arte-diamba-hq-paiva.'
  },
  {
    id: 'arte-matrix-sequelas',
    title: 'Matrix Reloaded / Revolutions — sequelas e diluição da pergunta',
    titleEn: 'The Matrix Reloaded / Revolutions — sequels and dilution of the question',
    titleEs: 'Matrix Reloaded / Revolutions — secuelas y dilución de la pregunta',
    tipo: 'arte',
    priority: 4,
    status: 'ideia',
    why: 'Como as sequelas tratam o mito de Matrix (1999) e o elo Keanu — obra-âncora vs franquia.',
    whyEn: 'How sequels treat The Matrix (1999) myth and Keanu link — anchor work vs franchise.',
    whyEs: 'Cómo las secuelas tratan el mito de Matrix (1999) y Keanu — obra ancla vs franquicia.',
    suggestedSlug: 'inspecao-filme-matrix-sequelas',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/The_Matrix_Reloaded',
      '/posts/post-inspecao-filme-the-matrix.html',
      '/posts/post-inspecao-figura-keanu-reeves.html'
    ],
    notes: 'Secundário à ficha Matrix 1999.'
  },
  {
    id: 'arte-koyaanisqatsi',
    title: 'Koyaanisqatsi (1982) — vida fora de equilíbrio',
    titleEn: 'Koyaanisqatsi (1982) — life out of balance',
    titleEs: 'Koyaanisqatsi (1982) — vida fuera de equilibrio',
    tipo: 'arte',
    priority: 3,
    status: 'ideia',
    why: 'Ensaio visual sobre velocidade e indústria; elo com História das Coisas e caminho/passar.',
    whyEn: 'Visual essay on speed and industry; link to Story of Stuff and caminho/passar.',
    whyEs: 'Ensayo visual sobre velocidad e industria; vínculo con História das Coisas.',
    suggestedSlug: 'inspecao-filme-koyaanisqatsi',
    seriesHint: 'artes-cultura',
    sources: [
      'https://en.wikipedia.org/wiki/Koyaanisqatsi',
      '/posts/post-inspecao-arte-a-historia-das-coisas.html',
      '/posts/post-inspecao-palavra-caminho.html'
    ],
    notes: 'Filme-ensaio; sem diálogo.'
  }
];

let added = 0;
for (const e of neu) {
  if (existing.has(e.id)) {
    console.log('skip', e.id);
    continue;
  }
  items.push(e);
  existing.add(e.id);
  added += 1;
  console.log('add', e.id);
}

sug.items = items;
sug.updatedAt = new Date().toISOString();
fs.writeFileSync(FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
console.log('OK added', added, 'total', items.length);
