'use strict';

/**
 * Artes ainda em ideia (pri. 3–4): filme / série / livro / HQ.
 * Método: objecto primeiro; corte metodológico; elos já fichados.
 */

const fs = require('fs');
const path = require('path');

function artePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date || '2026-08-24T16:00:00.000Z',
    coverImage: opts.coverImage,
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

function maxOrder(series) {
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const orders = posts.filter((p) => p.series === series).map((p) => Number(p.seriesOrder) || 0);
    return orders.length ? Math.max(...orders) : 0;
  } catch (_) {
    return 0;
  }
}

const HUB = '/biblioteca/inspecoes/#inspecoes-artes';
const VALEU = '/posts/post-inspecao-palavra-valeu.html';
const INSPECTED = '2026-08-24';

const CONFIGS = [
  {
    sugId: 'arte-legiao-urbana',
    slug: 'inspecao-arte-legiao-urbana',
    coverTitle: 'Legião Urbana',
    coverSub: 'discografia · Russo',
    kind: 'banda / discografia',
    title: 'Inspeção: Legião Urbana — discografia e elo com Renato Russo',
    titleEn: 'Inspection: Legião Urbana — discography and link to Renato Russo',
    titleEs: 'Inspección: Legião Urbana — discografía y vínculo con Renato Russo',
    work: 'Legião Urbana (1982–1996)',
    wiki: 'https://pt.wikipedia.org/wiki/Legi%C3%A3o_Urbana',
    h1: 'O objecto é a **banda e o cancioneiro**, não a biografia completa do vocalista (Pessoas, se existir ficha).',
    cut: 'Não fundir com Renato Russo-pessoa; não transformar letra em protocolo de uso.',
    links: [
      ['Renato Russo — se fichado em Pessoas', '/biblioteca/inspecoes/#inspecoes-pessoas-historia'],
      ['Palavra caminho', '/posts/post-inspecao-palavra-caminho.html']
    ],
    excerpt:
      'Artes: Legião Urbana — discografia como objecto; letras de cidade, fé e desencanto. Banda primeiro; Russo em Pessoas se houver ficha. Sem protocolo.',
    excerptEn:
      'Arts: Legião Urbana — discography as object; city, faith and disenchantment. Band first. Not a protocol.',
    excerptEs:
      'Artes: Legião Urbana — discografía como objeto. Banda primero. Sin protocolo.'
  },
  {
    sugId: 'arte-reefer-madness',
    slug: 'inspecao-filme-reefer-madness',
    coverTitle: 'Reefer Madness',
    coverSub: '1936 · propaganda',
    kind: 'filme',
    title: 'Inspeção: Reefer Madness (1936) — propaganda e história da palavra',
    titleEn: 'Inspection: Reefer Madness (1936) — propaganda and word history',
    titleEs: 'Inspección: Reefer Madness (1936) — propaganda e historia de la palabra',
    work: 'Reefer Madness (Tell Your Children, 1936)',
    wiki: 'https://en.wikipedia.org/wiki/Reefer_Madness',
    h1: 'Peça de **pânico moral** — o laboratório inspecciona o filme como arquivo de propaganda, não como documentário de planta.',
    cut: 'Não reproduzir o pânico; cruzar com a palavra marijuana / reefer como rótulo.',
    links: [
      ['marijuana', '/posts/post-inspecao-palavra-marijuana.html'],
      ['maconha', '/posts/post-inspecao-palavra-maconha.html']
    ],
    excerpt:
      'Artes: Reefer Madness (1936) — melodrama de pânico; objecto = propaganda, não botânica. Elo com o léxico marijuana/reefer.',
    excerptEn:
      'Arts: Reefer Madness (1936) — panic melodrama; object = propaganda, not botany.',
    excerptEs:
      'Artes: Reefer Madness (1936) — melodrama de pánico; objeto = propaganda, no botánica.'
  },
  {
    sugId: 'arte-grass-doc',
    slug: 'inspecao-filme-grass',
    coverTitle: 'Grass',
    coverSub: 'Ron Mann · 1999',
    kind: 'documentário',
    title: 'Inspeção: Grass (1999) — documentário de Ron Mann',
    titleEn: 'Inspection: Grass (1999) — Ron Mann documentary',
    titleEs: 'Inspección: Grass (1999) — documental de Ron Mann',
    work: 'Grass (Ron Mann, 1999)',
    wiki: 'https://en.wikipedia.org/wiki/Grass_(1999_film)',
    h1: 'Arquivo de **proibição e cultura** no século XX — narrado com recortes; não é tutorial.',
    cut: 'Documentário ≠ endosso; par crítico com Reefer Madness (o arquivo que Mann desmonta).',
    links: [
      ['Reefer Madness', '/posts/post-inspecao-filme-reefer-madness.html']
    ],
    excerpt:
      'Artes: Grass (1999, Ron Mann) — documentário de arquivo sobre proibição. Objecto = filme; não é guia de uso.',
    excerptEn: 'Arts: Grass (1999) — archival documentary on prohibition. Not a use guide.',
    excerptEs: 'Artes: Grass (1999) — documental de archivo sobre prohibición. No es guía de uso.'
  },
  {
    sugId: 'arte-weeds',
    slug: 'inspecao-serie-weeds',
    coverTitle: 'Weeds',
    coverSub: '2005–2012',
    kind: 'série',
    title: 'Inspeção: Weeds (2005–2012) — série e representação doméstica',
    titleEn: 'Inspection: Weeds (2005–2012) — series and domestic representation',
    titleEs: 'Inspección: Weeds (2005–2012) — serie y representación doméstica',
    work: 'Weeds (Showtime, 2005–2012)',
    wiki: 'https://en.wikipedia.org/wiki/Weeds_(TV_series)',
    h1: 'Comédia dramática suburbana: **viúva, filhos, negócio** — o laboratório lê representação, não logística.',
    cut: 'Ficção ≠ manual de tráfico; erva no título é planta-metáfora de jardim e de mercado.',
    links: [['diamba (palavra)', '/posts/post-inspecao-palavra-diamba.html']],
    excerpt:
      'Artes: Weeds — série suburbana. Objecto = representação doméstica do comércio; não é manual.',
    excerptEn: 'Arts: Weeds — suburban series. Object = domestic representation of trade; not a manual.',
    excerptEs: 'Artes: Weeds — serie suburbana. Objeto = representación doméstica; no es manual.'
  },
  {
    sugId: 'arte-alice-atraves-do-espelho',
    slug: 'inspecao-arte-alice-atraves-do-espelho',
    coverTitle: 'Através do Espelho',
    coverSub: 'Carroll · 1871',
    kind: 'livro',
    title: 'Inspeção: Alice Através do Espelho (Carroll, 1871) — continuação literária',
    titleEn: 'Inspection: Through the Looking-Glass (Carroll, 1871) — literary sequel',
    titleEs: 'Inspección: A través del espejo (Carroll, 1871) — secuela literaria',
    work: 'Through the Looking-Glass (1871)',
    wiki: 'https://en.wikipedia.org/wiki/Through_the_Looking-Glass',
    h1: 'Segunda Alice: **xadrez, espelho, linguagem invertida** — livro primeiro; Disney secundário.',
    cut: 'Não fundir com o livro de 1865 nem com só o filme; o objecto é a sequela literária.',
    links: [
      ['Alice no País das Maravilhas (ficha)', '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html']
    ],
    excerpt:
      'Artes: Através do Espelho (1871) — sequela de Carroll; xadrez e língua. Livro primeiro; par com 1865.',
    excerptEn: 'Arts: Through the Looking-Glass (1871) — Carroll sequel; chess and language. Book first.',
    excerptEs: 'Artes: A través del espejo (1871) — secuela de Carroll. Libro primero.'
  },
  {
    sugId: 'arte-paraisos-artificiais',
    slug: 'inspecao-arte-paraisos-artificiais',
    coverTitle: 'Paraísos Artificiais',
    coverSub: 'Baudelaire',
    kind: 'ensaio',
    title: 'Inspeção: Os Paraísos Artificiais (Baudelaire) — haxixe e modernidade literária',
    titleEn: 'Inspection: Artificial Paradises (Baudelaire) — hashish and literary modernity',
    titleEs: 'Inspección: Los paraísos artificiales (Baudelaire) — hachís y modernidad literaria',
    work: 'Les Paradis artificiels (1860)',
    wiki: 'https://en.wikipedia.org/wiki/Les_Paradis_artificiels',
    h1: 'Baudelaire lê o haxixe e o ópio como **problema da modernidade** — prosa, não receita.',
    cut: 'Texto literário ≠ protocolo; elo com De Quincey (que ele traduz/comenta) e Tosches (muito depois).',
    links: [
      ['De Quincey', '/posts/post-inspecao-arte-confissoes-comedor-opio.html'],
      ['droga (palavra)', '/posts/post-inspecao-palavra-droga.html']
    ],
    excerpt:
      'Artes: Paraísos artificiais (1860) — Baudelaire. Ensaio primeiro; haxixe como tema literário, não protocolo.',
    excerptEn: 'Arts: Artificial Paradises (1860) — Baudelaire. Essay first; not a protocol.',
    excerptEs: 'Artes: Los paraísos artificiales (1860) — Baudelaire. Ensayo primero; no protocolo.'
  },
  {
    sugId: 'arte-easy-rider',
    slug: 'inspecao-filme-easy-rider',
    coverTitle: 'Easy Rider',
    coverSub: '1969 · estrada',
    kind: 'filme',
    title: 'Inspeção: Easy Rider (1969) — estrada, contracultura e mito da liberdade',
    titleEn: 'Inspection: Easy Rider (1969) — road, counterculture and the freedom myth',
    titleEs: 'Inspección: Easy Rider (1969) — carretera, contracultura y mito de la libertad',
    work: 'Easy Rider (Hopper / Fonda / Nicholson, 1969)',
    wiki: 'https://en.wikipedia.org/wiki/Easy_Rider',
    h1: 'Cinema de estrada: **moto, mapa, recusa** — o mito da liberdade é o objecto, não o tanque.',
    cut: 'Não romantizar overdose nem tráfico; elo [caminho](/posts/post-inspecao-palavra-caminho.html).',
    links: [['caminho', '/posts/post-inspecao-palavra-caminho.html']],
    excerpt:
      'Artes: Easy Rider (1969) — filme de estrada e contracultura. Objecto = mito da liberdade; sem glamour de dano.',
    excerptEn: 'Arts: Easy Rider (1969) — road/counterculture. Object = freedom myth; no glamorizing harm.',
    excerptEs: 'Artes: Easy Rider (1969) — carretera y contracultura. Objeto = mito de libertad.'
  },
  {
    sugId: 'arte-dallas-buyers-club',
    slug: 'inspecao-filme-dallas-buyers-club',
    coverTitle: 'Dallas Buyers Club',
    coverSub: '2013 · acesso',
    kind: 'filme',
    title: 'Inspeção: Dallas Buyers Club (2013) — acesso, medicina e burocracia',
    titleEn: 'Inspection: Dallas Buyers Club (2013) — access, medicine and bureaucracy',
    titleEs: 'Inspección: Dallas Buyers Club (2013) — acceso, medicina y burocracia',
    work: 'Dallas Buyers Club (2013)',
    wiki: 'https://en.wikipedia.org/wiki/Dallas_Buyers_Club',
    h1: 'Drama de **acesso a tratamento** (HIV, clubes de compra) — literacia de porta, não receita.',
    cut: 'Ficção baseada em factos ≠ aconselhamento médico; não confundir com Legado canábico.',
    links: [['UNIFESP / biblioteca', '/biblioteca/unifesp/']],
    excerpt:
      'Artes: Dallas Buyers Club (2013) — acesso e burocracia. Filme primeiro; não é protocolo clínico.',
    excerptEn: 'Arts: Dallas Buyers Club (2013) — access and bureaucracy. Not a clinical protocol.',
    excerptEs: 'Artes: Dallas Buyers Club (2013) — acceso y burocracia. No es protocolo clínico.'
  },
  {
    sugId: 'arte-wall-e',
    slug: 'inspecao-filme-wall-e',
    coverTitle: 'WALL-E',
    coverSub: '2008 · lixo',
    kind: 'filme',
    title: 'Inspeção: WALL-E (2008) — consumo, lixo e planeta finito',
    titleEn: 'Inspection: WALL-E (2008) — consumption, waste and a finite planet',
    titleEs: 'Inspección: WALL-E (2008) — consumo, basura y planeta finito',
    work: 'WALL-E (Pixar, 2008)',
    wiki: 'https://en.wikipedia.org/wiki/WALL-E',
    h1: 'Parábola animada do **extrair-fazer-descartar** — o robot que compacta o resto.',
    cut: 'Par com A História das Coisas; não é ficha de derivado de açúcar.',
    links: [['A História das Coisas', '/posts/post-inspecao-arte-a-historia-das-coisas.html']],
    excerpt:
      'Artes: WALL-E (2008) — consumo e lixo. Filme primeiro; par com o livro de Leonard.',
    excerptEn: 'Arts: WALL-E (2008) — consumption and waste. Pair with The Story of Stuff.',
    excerptEs: 'Artes: WALL-E (2008) — consumo y basura. Par con A História das Coisas.'
  },
  {
    sugId: 'arte-tropa-de-elite',
    slug: 'inspecao-filme-tropa-de-elite',
    coverTitle: 'Tropa de Elite',
    coverSub: '2007 · discurso',
    kind: 'filme',
    title: 'Inspeção: Tropa de Elite (2007) — polícia, morro e discurso da guerra às drogas',
    titleEn: 'Inspection: Elite Squad (2007) — police, favela and the war-on-drugs discourse',
    titleEs: 'Inspección: Tropa de Elite (2007) — policía, morro y discurso de la guerra a las drogas',
    work: 'Tropa de Elite (Padilha, 2007)',
    wiki: 'https://pt.wikipedia.org/wiki/Tropa_de_Elite',
    h1: 'O objecto é o **discurso cinematográfico da guerra às drogas** no Rio — não o BOPE como manual.',
    cut: 'Filme ≠ endosso de tropa; ler representação, seletividade e palco. Sem apologia.',
    links: [['maconha', '/posts/post-inspecao-palavra-maconha.html']],
    excerpt:
      'Artes: Tropa de Elite (2007) — polícia e guerra às drogas como discurso. Filme primeiro; sem apologia.',
    excerptEn: 'Arts: Elite Squad (2007) — war-on-drugs discourse. Film first; no apology for force.',
    excerptEs: 'Artes: Tropa de Elite (2007) — discurso de la guerra a las drogas. Sin apología.'
  },
  {
    sugId: 'arte-up-in-smoke',
    slug: 'inspecao-filme-up-in-smoke',
    coverTitle: 'Up in Smoke',
    coverSub: '1978 · estereótipo',
    kind: 'filme',
    title: 'Inspeção: Up in Smoke (1978) — comédia Cheech e Chong e o estereótipo',
    titleEn: 'Inspection: Up in Smoke (1978) — Cheech and Chong comedy and the stereotype',
    titleEs: 'Inspección: Up in Smoke (1978) — comedia Cheech y Chong y el estereotipo',
    work: 'Up in Smoke (1978)',
    wiki: 'https://en.wikipedia.org/wiki/Up_in_Smoke',
    h1: 'Comédia de **estereótipo stoner** — o laboratório inspecciona o palco, não a piada como prova.',
    cut: 'Risos ≠ botânica; par inverso de Reefer Madness (outro palco, mesmo vício de caricatura).',
    links: [['Reefer Madness', '/posts/post-inspecao-filme-reefer-madness.html']],
    excerpt:
      'Artes: Up in Smoke (1978) — comédia e estereótipo. Objecto = palco; não é prova de planta.',
    excerptEn: 'Arts: Up in Smoke (1978) — comedy and stereotype. Object = stage, not plant proof.',
    excerptEs: 'Artes: Up in Smoke (1978) — comedia y estereotipo. Objeto = escenario.'
  },
  {
    sugId: 'arte-fed-up',
    slug: 'inspecao-filme-fed-up',
    coverTitle: 'Fed Up',
    coverSub: '2014 · açúcar',
    kind: 'documentário',
    title: 'Inspeção: Fed Up (2014) — documentário sobre açúcar e indústria',
    titleEn: 'Inspection: Fed Up (2014) — documentary on sugar and industry',
    titleEs: 'Inspección: Fed Up (2014) — documental sobre azúcar e industria',
    work: 'Fed Up (2014)',
    wiki: 'https://en.wikipedia.org/wiki/Fed_Up_(2014_film)',
    h1: 'Documentário de **açúcar e marketing** — par natural da série Derivados (cana, sucos).',
    cut: 'Divulgação ≠ guideline OMS; cruzar com a ficha da cana, sem fundir teses de marca.',
    links: [['Cana-de-açúcar', '/posts/post-inspecao-derivado-cana-de-acucar.html']],
    excerpt:
      'Artes: Fed Up (2014) — açúcar e indústria. Documentário primeiro; elo com derivados de cana.',
    excerptEn: 'Arts: Fed Up (2014) — sugar and industry. Pair with sugarcane derivatives.',
    excerptEs: 'Artes: Fed Up (2014) — azúcar e industria. Vínculo con derivados de caña.'
  },
  {
    sugId: 'arte-super-size-me',
    slug: 'inspecao-filme-super-size-me',
    coverTitle: 'Super Size Me',
    coverSub: '2004 · marca',
    kind: 'documentário',
    title: 'Inspeção: Super Size Me (2004) — corpo, marca e experimento mediático',
    titleEn: 'Inspection: Super Size Me (2004) — body, brand and media experiment',
    titleEs: 'Inspección: Super Size Me (2004) — cuerpo, marca y experimento mediático',
    work: 'Super Size Me (Spurlock, 2004)',
    wiki: 'https://en.wikipedia.org/wiki/Super_Size_Me',
    h1: 'Experimento **mediático** de fast-food — n=1, palco, marca. Método frágil; objecto = o filme.',
    cut: 'Não é RCT; par com Fed Up (açúcar) e WALL-E (excesso). Sem processar a marca no laboratório.',
    links: [
      ['Fed Up', '/posts/post-inspecao-filme-fed-up.html'],
      ['WALL-E', '/posts/post-inspecao-filme-wall-e.html']
    ],
    excerpt:
      'Artes: Super Size Me (2004) — corpo e marca. Documentário-experimento; n=1 ≠ prova clínica.',
    excerptEn: 'Arts: Super Size Me (2004) — body and brand. Media experiment; n=1 ≠ clinical proof.',
    excerptEs: 'Artes: Super Size Me (2004) — cuerpo y marca. Experimento mediático; n=1 ≠ prueba clínica.'
  },
  {
    sugId: 'arte-medo-e-delirio',
    slug: 'inspecao-arte-medo-e-delirio-las-vegas',
    coverTitle: 'Medo e Delírio',
    coverSub: 'Thompson / Gilliam',
    kind: 'livro + filme',
    title: 'Inspeção: Medo e Delírio em Las Vegas (Thompson / Gilliam) — livro e filme',
    titleEn: 'Inspection: Fear and Loathing in Las Vegas (Thompson / Gilliam) — book and film',
    titleEs: 'Inspección: Miedo y asco en Las Vegas (Thompson / Gilliam) — libro y película',
    work: 'Fear and Loathing in Las Vegas (1971; filme 1998)',
    wiki: 'https://en.wikipedia.org/wiki/Fear_and_Loathing_in_Las_Vegas',
    h1: 'Gonzo: **livro primeiro** (Thompson 1971); Gilliam 1998 é adaptação. O objecto dual declara a hierarquia.',
    cut: 'Estilo ≠ protocolo de substâncias; não glamourizar o delírio como método de inspeção.',
    links: [['De Quincey', '/posts/post-inspecao-arte-confissoes-comedor-opio.html']],
    excerpt:
      'Artes: Medo e Delírio — livro Thompson (1971) primeiro; filme Gilliam como adaptação. Sem protocolo.',
    excerptEn: 'Arts: Fear and Loathing — Thompson 1971 book first; Gilliam as adaptation. No protocol.',
    excerptEs: 'Artes: Miedo y asco — libro 1971 primero; Gilliam como adaptación. Sin protocolo.'
  },
  {
    sugId: 'arte-high-maintenance',
    slug: 'inspecao-serie-high-maintenance',
    coverTitle: 'High Maintenance',
    coverSub: 'antologia · entregador',
    kind: 'série',
    title: 'Inspeção: High Maintenance — série antológica do entregador',
    titleEn: 'Inspection: High Maintenance — anthology series of the guy who delivers',
    titleEs: 'Inspección: High Maintenance — serie antológica del repartidor',
    work: 'High Maintenance (web 2012 → HBO)',
    wiki: 'https://en.wikipedia.org/wiki/High_Maintenance',
    h1: 'Antologia: o **entregador** é o fio; cada episódio é um apartamento de Nova Iorque.',
    cut: 'Série ≠ mapa de delivery; o objecto é a forma antológica e a cidade.',
    links: [['Weeds', '/posts/post-inspecao-serie-weeds.html']],
    excerpt:
      'Artes: High Maintenance — antologia do entregador. Objecto = forma e cidade; não é guia logístico.',
    excerptEn: 'Arts: High Maintenance — delivery-guy anthology. Object = form and city; not a logistics guide.',
    excerptEs: 'Artes: High Maintenance — antología del repartidor. Objeto = forma y ciudad.'
  },
  {
    sugId: 'arte-beto-e-de-quadrinhos',
    slug: 'inspecao-arte-beto-e-de',
    coverTitle: 'Beto e Dé',
    coverSub: 'Paiva · quadrinhos',
    kind: 'HQ',
    title: 'Inspeção: Beto e Dé e outros Quadrinhos Canábicos (Daniel Paiva)',
    titleEn: 'Inspection: Beto e Dé and Other Cannabis Comics (Daniel Paiva)',
    titleEs: 'Inspección: Beto e Dé y otros cómics cannábicos (Daniel Paiva)',
    work: 'Beto e Dé e outros quadrinhos canábicos (Daniel Paiva)',
    wiki: 'https://www.brasaeditora.com.br/',
    h1: 'HQ de humor e cena — **distinta** da HQ-documentário Diamba (proibicionismo).',
    cut: 'Dois livros, dois objectos: Beto e Dé (comédia/cena) ≠ Diamba HQ (arquivo do proibicionismo).',
    links: [['Diamba HQ (Paiva)', '/posts/post-inspecao-arte-diamba-hq-paiva.html']],
    excerpt:
      'Artes: Beto e Dé (Paiva) — quadrinhos de cena; distinta da HQ Diamba sobre proibicionismo.',
    excerptEn: 'Arts: Beto e Dé (Paiva) — scene comics; distinct from the Diamba prohibition HQ.',
    excerptEs: 'Artes: Beto e Dé (Paiva) — cómics de escena; distintos de la HQ Diamba.'
  },
  {
    sugId: 'arte-matrix-sequelas',
    slug: 'inspecao-filme-matrix-sequelas',
    coverTitle: 'Matrix sequelas',
    coverSub: 'Reloaded / Revolutions',
    kind: 'filmes',
    title: 'Inspeção: Matrix Reloaded / Revolutions — sequelas e diluição da pergunta',
    titleEn: 'Inspection: The Matrix Reloaded / Revolutions — sequels and dilution of the question',
    titleEs: 'Inspección: Matrix Reloaded / Revolutions — secuelas y dilución de la pregunta',
    work: 'The Matrix Reloaded (2003) · Revolutions (2003)',
    wiki: 'https://en.wikipedia.org/wiki/The_Matrix_(franchise)',
    h1: 'As sequelas **continuam a máquina** — o laboratório pergunta se a pergunta do primeiro filme se dilui.',
    cut: 'Não substitui a ficha de The Matrix (1999); Resurrections fica de fora desta ficha.',
    links: [['The Matrix (ficha)', '/posts/post-inspecao-filme-the-matrix.html']],
    excerpt:
      'Artes: Reloaded / Revolutions — sequelas; a pergunta do primeiro filme e o risco de diluição. Par com Matrix 1999.',
    excerptEn: 'Arts: Reloaded / Revolutions — sequels; dilution risk vs the 1999 question.',
    excerptEs: 'Artes: Reloaded / Revolutions — secuelas; riesgo de dilución frente a 1999.'
  },
  {
    sugId: 'arte-koyaanisqatsi',
    slug: 'inspecao-filme-koyaanisqatsi',
    coverTitle: 'Koyaanisqatsi',
    coverSub: '1982 · desequilíbrio',
    kind: 'filme',
    title: 'Inspeção: Koyaanisqatsi (1982) — vida fora de equilíbrio',
    titleEn: 'Inspection: Koyaanisqatsi (1982) — life out of balance',
    titleEs: 'Inspección: Koyaanisqatsi (1982) — vida fuera de equilibrio',
    work: 'Koyaanisqatsi (Reggio / Glass, 1982)',
    wiki: 'https://en.wikipedia.org/wiki/Koyaanisqatsi',
    h1: 'Ensaio visual hopi: **vida fora de equilíbrio** — imagem e música, quase sem palavra.',
    cut: 'Par com WALL-E e História das Coisas: três palcos do mesmo desajuste (tempo, lixo, cadeia).',
    links: [
      ['WALL-E', '/posts/post-inspecao-filme-wall-e.html'],
      ['A História das Coisas', '/posts/post-inspecao-arte-a-historia-das-coisas.html']
    ],
    excerpt:
      'Artes: Koyaanisqatsi (1982) — vida fora de equilíbrio. Filme-ensaio; par com Leonard e WALL-E.',
    excerptEn: 'Arts: Koyaanisqatsi (1982) — life out of balance. Essay-film; pair with Leonard and WALL-E.',
    excerptEs: 'Artes: Koyaanisqatsi (1982) — vida fuera de equilibrio. Par con Leonard y WALL-E.'
  },
  {
    sugId: 'arte-divertida-mente-2',
    slug: 'inspecao-filme-divertida-mente-2',
    coverTitle: 'Divertida Mente 2',
    coverSub: '2024 · Ansiedade',
    kind: 'filme',
    title: 'Inspeção: Divertida Mente 2 (2024) — Ansiedade e novas emoções',
    titleEn: 'Inspection: Inside Out 2 (2024) — Anxiety and new emotions',
    titleEs: 'Inspección: Intensamente 2 (2024) — Ansiedad y nuevas emociones',
    work: 'Inside Out 2 / Divertida Mente 2 (2024)',
    wiki: 'https://pt.wikipedia.org/wiki/Divertida_Mente_2',
    h1: 'Sequela: **Ansiedade, Inveja, Vergonha, Tédio** entram na sala — eco da ficha 2015, não substituto.',
    cut: 'Não apaga Divertida Mente (2015) nem as palavras-emoção já fichadas; adolescência = novo palco.',
    links: [
      ['Divertida Mente (2015)', '/posts/post-inspecao-filme-divertida-mente.html'],
      ['emoção', '/posts/post-inspecao-palavra-emocao.html']
    ],
    excerpt:
      'Artes: Divertida Mente 2 (2024) — Ansiedade e novas emoções. Sequela; a génese continua na ficha 2015.',
    excerptEn: 'Arts: Inside Out 2 (2024) — Anxiety and new emotions. Sequel; 2015 remains the origin sheet.',
    excerptEs: 'Artes: Intensamente 2 (2024) — Ansiedad. Secuela; 2015 sigue siendo la génesis.'
  }
];

function linksTable(links) {
  if (!links || !links.length) return '';
  return (
    '\n## Elos\n\n| Recurso | Papel |\n|---------|-------|\n' +
    links.map(([l, h]) => '| [' + l + '](' + h + ') | Complemento |').join('\n') +
    '\n'
  );
}

function buildBody(cfg) {
  return `## Escopo

Inspeção editorial de **${cfg.work}** (${cfg.kind}). ${cfg.h1}

> **Nota metodológica:** auditoria independente. Âncora: [${cfg.wiki}](${cfg.wiki}). Indexar ≠ endossar. ${cfg.cut} Obra protegida: sem citações longas nem pirataria.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **${cfg.work}** |
| Tipo | ${cfg.kind} |
| Tipo BudGanja | Arte — objecto primeiro |
| Data da inspeção | ${INSPECTED} |

## Hipótese

O valor do laboratório está no **palco cultural** (discurso, arquivo, forma), não em copiar o enredo como instrução de uso, cultivo ou delito.

${linksTable(cfg.links)}
## Status

**Aprovado na série Artes.**

[▶ Artes](${HUB}) · [▶ Valeu !!!](${VALEU})
`;
}

function buildEn(cfg) {
  return `## Scope

Editorial inspection of **${cfg.work}**. ${cfg.cut}

Not a protocol. Source: [${cfg.wiki}](${cfg.wiki}).

**Approved in Arts.**

[▶ Arts](${HUB})
`;
}

function buildEs(cfg) {
  return `## Alcance

Inspección editorial de **${cfg.work}**. ${cfg.cut}

No es protocolo. Fuente: [${cfg.wiki}](${cfg.wiki}).

**Aprobada en Artes.**

[▶ Artes](${HUB})
`;
}

function coverFile(slug) {
  return 'imagens/inspecoes/' + String(slug).replace(/^inspecao-(arte|filme|serie)-/, '') + '-cover.jpg';
}

function buildAll() {
  let next = maxOrder('artes-cultura') + 1;
  return CONFIGS.map((cfg) => {
    const post = artePost({
      title: cfg.title,
      titleEn: cfg.titleEn,
      titleEs: cfg.titleEs,
      excerpt: cfg.excerpt,
      excerptEn: cfg.excerptEn,
      excerptEs: cfg.excerptEs,
      slug: cfg.slug,
      seriesOrder: next,
      seriesLabel: cfg.coverTitle + ' · Artes',
      coverImage: coverFile(cfg.slug),
      sourceUrl: cfg.wiki,
      body: buildBody(cfg),
      contentEn: buildEn(cfg),
      contentEs: buildEs(cfg)
    });
    next += 1;
    return post;
  });
}

const ARTES_FILA_RESTANTE_POSTS = buildAll();

module.exports = {
  ARTES_FILA_RESTANTE_CONFIGS: CONFIGS,
  ARTES_FILA_RESTANTE_POSTS,
  coverFile
};
