'use strict';

/**
 * Produtos nocivos — proteínas e matrizes industriais associadas a dano quando
 * o consumo é inadequado (caseína/leite, glúten/trigo).
 * Tipagem hub: 'derivado' (chip Produtos nocivos).
 */

const { buildGlutenBodies } = require('./gluten-pesquisa-body.js');
const { buildCaseinaBodies } = require('./caseina-pesquisa-body.js');
const { buildLeiteBodies } = require('./leite-pesquisa-body.js');

function nocivoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || '/imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: opts.series,
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel,
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

function buildChocolateBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const cacau = '/plantas/cacau/';
  const cacauInsp = '/posts/post-inspecao-planta-cacau.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const barriga = '/posts/post-inspecao-arte-barriga-de-trigo.html';
  const davis = '/posts/post-inspecao-figura-william-davis.html';
  const analise = '/posts/post-inspecao-derivado-analise-danos-videos.html';
  const palavras = '/guia/palavras.html';
  const inspetor = '/posts/post-inspecao-personagem-inspetor.html';
  const droga = '/posts/post-inspecao-palavra-droga.html';
  const erva = '/posts/post-inspecao-palavra-erva.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const nojinho = '/posts/post-inspecao-palavra-nojinho.html';
  const cannabis = '/posts/post-inspecao-palavra-cannabis.html';
  const artBrouns = '/posts/post-inspecao-artigo-brouns-trigo-obesidade-2013.html';
  const artWieser = '/posts/post-inspecao-artigo-wieser-duas-faces-trigo-2020.html';
  const artHall = '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html';
  const artCasein = '/posts/post-inspecao-artigo-brooke-taylor-caseina-a1-a2-2017.html';
  const artWho = '/posts/post-inspecao-artigo-oms-acucares-livres-2015.html';
  const hubArtigos = '/biblioteca/inspecoes/#inspecoes-artigos';
  const fimLinha = '/posts/post-inspecao-expressao-fim-da-linha.html';
  const cinta = '/posts/post-inspecao-palavra-cinta.html';
  const vidaPal = '/posts/post-inspecao-palavra-vida.html';

  const body = `## Escopo

Inspeção editorial do **chocolate industrial** como **matriz ultraprocessada** que junta — no mesmo produto ou na mesma prateleira — **cacau**, **açúcar**, **farinha / trigo / glúten**, **leite / caseína** e, no discurso cultural, as teses de [*Barriga de Trigo*](${barriga}) / [William Davis](${davis}). É o hub BudGanja que **relaciona tudo o que há deles** na categoria [Produtos nocivos](${hub}) — e liga ao [Guia de Palavras](${palavras}) quando o marketing e o léxico entram na inspeção.

> **Nota metodológica:** auditoria independente. **Não é aconselhamento médico.** O [cacau](${cacau}) (*Theobroma cacao*) como planta/amêndoa tradicional **não** é o vilão; o foco é o **chocolate de fábrica** (açúcar refinado, leite em pó, emulsificantes, farinhas em snacks). Indexar Davis/Lair ≠ endossar cada claim. Sem afiliação com a indústria.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **Chocolate industrial** (matriz) |
| Origem vegetal | [Cacau](${cacau}) — *Theobroma cacao* L. |
| Tipo BudGanja | Produto nocivo — matriz industrial (vários elos) |
| Elos de risco | Açúcar · Farinha/glúten/trigo · Leite/caseína · Aditivos · Discurso (Davis/Lair) |
| Série | Produtos nocivos |
| Data da inspeção | ${inspected} |

## Rede completa — tudo o que se relaciona aqui

| Elo | O que entra no chocolate / snacks | Ficha BudGanja |
|-----|-----------------------------------|----------------|
| **Cacau** | Amêndoa, liquor, manteiga, cacau em pó | [Planta · Cacau](${cacau}) · [Inspeção do fruto](${cacauInsp}) |
| **Açúcar** | Sacarose, xaropes, maltodextrina | [Cana / açúcares livres](${cana}) · [Lair](${lair}) |
| **Farinha / trigo** | Bolachas, wafers, croissants, coberturas | [Glúten / farinha](${gluten}) |
| **Trigo moderno (discurso)** | Volume barato + tese «barriga» | [*Barriga de Trigo*](${barriga}) · [William Davis](${davis}) |
| **Leite** | Leite em pó, sólidos lácteos, caseinatos | [Caseína](${caseina}) |
| **Aditivos** | Lecitina, aromas, gorduras baratas | Rótulo — dose e ultraprocessamento |
| **Confeito casca + núcleo** | Formato M&M's — casca colorida ([fita](${cinta})) + chocolate ([vida](${vidaPal})) | [Fim da linha](${fimLinha}) |
| **Acervo de vídeos** | Quase só Lair neste eixo; amargo elogiado ≠ snack açucarado | [Análise danos × vídeos](${analise}) |

**H1:** literacia de rótulo separa **amêndoa / cacau alto teor** de **barra açucarada de prateleira**.  
**H2:** bolacha «de chocolate» é muitas vezes **trigo/farinha + açúcar + gordura** com perfume de cacau — o mesmo eixo de [glúten](${gluten}) e de [*Barriga de Trigo*](${barriga}).  
**H3:** a mesma rede (açúcar ↔ farinha ↔ leite ↔ cacau) aparece em sobremesas, cereais e snacks infantis.  
**H4:** o chocolate é o sítio onde o laboratório **vê juntos** os produtos nocivos — e onde o marketing usa [emoção](${emocao}) / [alegria](${alegria}) para vender a matriz.

## Do cacau ao produto de risco

| Etapa | O que acontece | Risco editorial |
|-------|----------------|-----------------|
| Fruto / amêndoa | Cultura mesoamericana-amazónica; usos tradicionais | Baixo — contexto e dose |
| Liquor / manteiga de cacau | Processamento culinário | Intermediário |
| Chocolate ao leite / branco industrial | Açúcar + leite + pouco cacau | Elevado |
| Snacks e bolachas «chocolate» | Farinha de **trigo** + açúcar + gordura + aroma | Elevado — rede completa (Davis aplica-se aqui) |
| Coberturas e recheios | Xaropes, gorduras baratas, pouco cacau real | Elevado |

## Cacau — resgatar a planta

Ver a ficha [Cacau](${cacau}) e a [inspeção do fruto](${cacauInsp}): a planta merece contexto cultural e botânico. O desvio industrial documenta-se **aqui**, na [cana](${cana}) e na [análise de vídeos](${analise}) (poucos títulos; elogiam o **amargo**, não o snack).

| Forma | Leitura BudGanja |
|-------|------------------|
| Nibs / cacau 70–100% pouco aditivado | Mais próximo da amêndoa; ainda assim dose |
| Chocolate amargo com lista curta | Intermediário — verificar açúcar |
| Chocolate ao leite / branco | Elevado — açúcar + [caseína](${caseina}) |
| Achocolatado, bombons, snacks | Elevado — matriz ultraprocessada |

## Açúcar — o elo metabólico

O açúcar do chocolate industrial é o mesmo eixo da [cana-de-açúcar](${cana}) (açúcares livres, OMS) e da varredura do [Dr. Lair Ribeiro](${lair}). Sem açúcar (ou com xaropes equivalentes), a maior parte do chocolate de massa não existiria como snack quotidiano.

## Farinha, trigo e Barriga de Trigo

Quando o «chocolate» vem em **bolacha, wafer, bolo ou cereal**, o eixo passa a ser [glúten / farinha refinada](${gluten}) + açúcar + (muitas vezes) leite. A farinha **não** é detalhe: é o volume barato da matriz — o mesmo **trigo moderno** que [William Davis](${davis}) ataca em [*Barriga de Trigo*](${barriga}) (amilopectina A, glicemia, gordura visceral).

| Situação | O que inspeccionar |
|----------|-------------------|
| Barra ao leite sem farinha | Açúcar + caseína (Davis menos directo) |
| Bolacha / wafer «de chocolate» | **Trigo + açúcar + gordura** — elo Davis + glúten |
| Cereal / granola chocolate | Farinha/açúcares + marketing de «energia» |
| «Sem glúten» chocolate snack | Troca farinha por amidos — ainda ultraprocessado ([glúten](${gluten}) já alerta) |

BudGanja **não** adopta a frase máxima do discurso popular sobre o trigo: usa Davis como **discurso cultural** e a ficha [glúten](${gluten}) como eixo de método (celíaca vs matriz industrial).

## Leite — o elo da caseína

Chocolate ao leite, recheios e «creme» de prateleira concentram [caseína](${caseina}) e sólidos lácteos. Quem inspecciona o leite industrial deve olhar também para as barras e snacks — e para o eixo Lair trigo/leite.

## Léxico catalogado — palavras que o chocolate activa

O [Guia de Palavras](${palavras}) e as fichas **Palavras** ajudam a ler o rótulo e o anúncio — não só a química.

| Palavra | Como entra no chocolate | Ficha |
|---------|-------------------------|-------|
| [Inspeção](${inspetor}) / Inspetor | Método: olhar rótulo, dose e rede — não só a embalagem | [Inspetor](${inspetor}) · [Guia](${palavras}) |
| [Caminho](${caminho}) | Do cacau à prateleira: planta → fábrica → snack | [caminho](${caminho}) |
| [Passar](${passar}) | O que **passa** no rótulo (açúcar à frente) e o que **se passou** na industrialização | [passar](${passar}) |
| [Droga](${droga}) | Do «remédio»/conforto ao ilícito no senso comum — paralelo: do cacau medicinal-cultural ao snack viciante de marketing | [droga](${droga}) |
| [Erva](${erva}) | Cacau não é «erva» botânica no sentido de erva daninha; o eufemismo popular de erva/cannabis lembra como o léxico **desliza** | [erva](${erva}) · [cannabis](${cannabis}) |
| [Emoção](${emocao}) / [Alegria](${alegria}) | Marketing: «recompensa», festa, conforto — vende matriz, não amêndoa | [emoção](${emocao}) · [alegria](${alegria}) |
| [Medo](${medo}) / [Nojinho](${nojinho}) | Medo de engordar / nojo a «química» — também usados para vender «versão light» ultraprocessada | [medo](${medo}) · [nojinho](${nojinho}) |
| [Produtos nocivos](${hub}) | Categoria-mãe desta ficha | Hub |
| Fitoterapia / Laboratório | Cacau tradicional ≠ protocolo clínico; laboratório documenta limites | [Guia de Palavras](${palavras}) |

## O que observar nos rótulos

1. **Ordem dos ingredientes** — açúcar ou farinha à frente do cacau = matriz doce, não «fruta».  
2. **% de cacau** — quanto mais baixo, mais espaço para açúcar/leite/gordura.  
3. **Leite em pó / soro / caseinato** — elo directo com [caseína](${caseina}).  
4. **Farinha de trigo** em wafers e bolachas — elo com [glúten](${gluten}) e [*Barriga de Trigo*](${barriga}).  
5. **Gorduras vegetais** baratas no lugar de manteiga de cacau.  
6. **Alegações** («energia», «antioxidante», «alegria») que não apagam ultraprocessamento.  
7. **«Sem glúten»** — verificar se trocou trigo por amidos de alto índice glicémico.

## Artigos científicos inspeccionados (âncoras)

| Artigo | Elo no chocolate | Ficha |
|--------|------------------|-------|
| Brouns et al. 2013 — trigo e obesidade | Contraponto a Davis / bolacha de trigo | [Brouns](${artBrouns}) |
| Wieser et al. 2020 — duas faces do trigo | WRDs vs. marketing anti-trigo | [Wieser](${artWieser}) |
| Hall et al. 2019 — ultraprocessados (RCT) | Matriz de fábrica ↑ kcal e peso | [Hall](${artHall}) |
| Brooke-Taylor et al. 2017 — A1/A2 | Leite / caseína no ao leite | [Brooke-Taylor](${artCasein}) |
| OMS 2015 — açúcares livres | Sacarose e xaropes no rótulo | [OMS](${artWho}) |

Hub: [Artigos científicos](${hubArtigos}).

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — Produtos nocivos · Cap. chocolate (hub completo) |
| Veredicto editorial | O cacau tradicional merece contexto; o **chocolate industrial** é a matriz que **junta** açúcar, farinha/trigo, leite e discurso — inspeccionar a rede, as palavras, os **artigos** e o rótulo, não só a barra. |

## Hub

[Produtos nocivos](${hub}) · [Cacau](${cacau}) · [Açúcar](${cana}) · [Glúten](${gluten}) · [Caseína](${caseina}) · [*Barriga de Trigo*](${barriga}) · [Davis](${davis}) · [Lair](${lair}) · [Análise × vídeos](${analise}) · [Artigos](${hubArtigos}) · [Palavras](${palavras})
`;

  const contentEn = `## Scope

Editorial inspection of **industrial chocolate** as an ultra-processed matrix joining **cacao**, **sugar**, **wheat flour/gluten**, **milk/casein**, and the cultural thesis of [Wheat Belly](${barriga}) / [William Davis](${davis}). Hub under [Harmful products](${hub}); lexicon via the [Words Guide](${palavras}).

> **Method note:** independent audit. **Not medical advice.** [Cacao](${cacau}) as a plant is not the villain; factory chocolate is. Indexing Davis/Lair ≠ endorsing every claim.

## Full relation network

| Link | BudGanja sheet |
|------|----------------|
| Cacao | [Plant](${cacau}) · [Fruit inspection](${cacauInsp}) |
| Sugar | [Sugarcane / free sugars](${cana}) · [Lair](${lair}) |
| Flour / gluten / wheat | [Gluten](${gluten}) · [Wheat Belly](${barriga}) · [Davis](${davis}) |
| Milk / casein | [Casein](${caseina}) |
| Video archive | [Harms × videos](${analise}) |
| Candy-coated format | [End of the line](${fimLinha}) — shell = [tape](${cinta}), core = [life](${vidaPal}) |

## Wheat Belly applies here

Chocolate **cookies/wafers** are often wheat + sugar + fat with cacao perfume — the same modern-wheat axis Davis attacks. BudGanja keeps celiac as the clinical gluten axis and treats Davis as cultural discourse.

## Catalogued words (marketing + method)

| Word | Role on the shelf |
|------|-------------------|
| [Path](${caminho}) / [Pass](${passar}) | Bean → factory → snack; what “passes” on the label |
| [Drug](${droga}) | Comfort → habit narrative (lexical parallel, not pharmacology) |
| [Emotion](${emocao}) / [Joy](${alegria}) | Packaging sells feeling, not the bean |
| [Fear](${medo}) / [Disgust](${nojinho}) | Also used to sell “light” ultra-processed versions |

## Scientific articles

[Brouns 2013](${artBrouns}) · [Wieser 2020](${artWieser}) · [Hall 2019](${artHall}) · [Brooke-Taylor 2017](${artCasein}) · [WHO sugars 2015](${artWho}) · [Articles hub](${hubArtigos})

## Status

**Published** — Harmful products · full chocolate hub.

[▶ Harmful products](${hub}) · [Wheat Belly](${barriga}) · [Articles](${hubArtigos}) · [Words](${palavras})
`;

  const contentEs = `## Alcance

Inspección editorial del **chocolate industrial** como matriz ultraprocesada que junta **cacao**, **azúcar**, **harina/trigo/gluten**, **leche/caseína** y la tesis cultural de [Barriga de Trigo](${barriga}) / [William Davis](${davis}). Hub bajo [Productos nocivos](${hub}); léxico en la [Guía de Palabras](${palavras}).

> **Nota metodológica:** auditoría independiente. **No es consejo médico.** El [cacao](${cacau}) como planta no es el villano. Indexar Davis/Lair ≠ respaldar cada claim.

## Red completa

| Eje | Ficha BudGanja |
|-----|----------------|
| Cacao | [Planta](${cacau}) · [Inspección](${cacauInsp}) |
| Azúcar | [Caña](${cana}) · [Lair](${lair}) |
| Harina / gluten / trigo | [Gluten](${gluten}) · [Barriga de Trigo](${barriga}) · [Davis](${davis}) |
| Leche / caseína | [Caseína](${caseina}) |
| Vídeos | [Daños × vídeos](${analise}) |
| Formato confite | [Fin de la línea](${fimLinha}) — cáscara = [cinta](${cinta}), núcleo = [vida](${vidaPal}) |

## Barriga de Trigo aplica aquí

Galletas/wafers «de chocolate» suelen ser trigo + azúcar + grasa con perfume de cacao — el mismo eje del trigo moderno. BudGanja mantiene la celiaquía como eje clínico del gluten y trata a Davis como discurso cultural.

## Palabras catalogadas

| Palabra | Rol |
|---------|-----|
| [Camino](${caminho}) / [Pasar](${passar}) | Del grano al snack; lo que «pasa» en la etiqueta |
| [Droga](${droga}) | Del consuelo al hábito en el léxico (paralelo, no farmacología) |
| [Emoción](${emocao}) / [Alegría](${alegria}) | El marketing vende sentimiento |
| [Miedo](${medo}) / [Asco](${nojinho}) | También venden versiones «light» ultraprocesadas |

## Artículos científicos

[Brouns 2013](${artBrouns}) · [Wieser 2020](${artWieser}) · [Hall 2019](${artHall}) · [Brooke-Taylor 2017](${artCasein}) · [OMS 2015](${artWho}) · [Hub artículos](${hubArtigos})

## Estado

**Publicada** — Productos nocivos · hub chocolate completo.

[▶ Productos nocivos](${hub}) · [Barriga de Trigo](${barriga}) · [Artículos](${hubArtigos}) · [Palabras](${palavras})
`;

  return { body, contentEn, contentEs };
}

function buildLeitePost() {
  const { body, contentEn, contentEs } = buildLeiteBodies();
  return nocivoPost({
    title: 'Inspeção: Leite e derivados — da ordenha à prateleira e o mal à saúde',
    titleEn: 'Inspection: Milk and derivatives — from milking to the shelf and harm to health',
    titleEs: 'Inspección: Leche y derivados — del ordeño al estante y el daño a la salud',
    excerpt:
      'Pesquisa completa: leite, queijo, iogurte, pó, whey e bebidas lácteas — hub da família, cruzado com os 9.798 vídeos do projecto. Irmão da caseína. Não é aconselhamento médico.',
    excerptEn:
      'Full research: milk, cheese, yogurt, powder, whey and dairy drinks — family hub, crossed with the project’s 9,798 videos. Sibling of casein. Not medical advice.',
    excerptEs:
      'Investigación completa: leche, queso, yogur, polvo, suero y bebidas lácteas — hub de la familia, cruzada con los 9.798 vídeos. Hermana de la caseína. No es consejo médico.',
    slug: 'inspecao-derivado-leite',
    date: '2026-09-18T13:00:00.000Z',
    series: 'animais-derivados-risco',
    seriesOrder: 0,
    seriesLabel: 'Leite e derivados · hub',
    coverImage: '/imagens/inspecoes/leite-cover.jpg',
    sourceUrl: '/animais/vaca/',
    body,
    contentEn,
    contentEs
  });
}

function buildCaseinaPost() {
  const { body, contentEn, contentEs } = buildCaseinaBodies();
  return nocivoPost({
    title: 'Inspeção: Caseína — a cola do leite e o mal à saúde',
    titleEn: 'Inspection: Casein — milk’s glue and harm to health',
    titleEs: 'Inspección: Caseína — la cola de la leche y el daño a la salud',
    excerpt:
      'Pesquisa completa: A1/BCM-7, alergia, lactose distinta e laticínios ultraprocessados — cruzada com os 9.798 vídeos do projecto (0 títulos com a palavra caseína). Não é aconselhamento médico.',
    excerptEn:
      'Full research: A1/BCM-7, allergy, lactose as a distinct axis and ultra-processed dairy — crossed with the project’s 9,798 videos (0 titles name casein). Not medical advice.',
    excerptEs:
      'Investigación completa: A1/BCM-7, alergia, lactosa distinta y lácteos ultraprocesados — cruzada con los 9.798 vídeos del proyecto (0 títulos nombran caseína). No es consejo médico.',
    slug: 'inspecao-derivado-caseina',
    date: '2026-09-18T12:00:00.000Z',
    series: 'animais-derivados-risco',
    seriesOrder: 1,
    seriesLabel: 'Caseína · cola · pesquisa',
    coverImage: '/imagens/inspecoes/caseina-cover.jpg',
    sourceUrl: '/animais/vaca/',
    body,
    contentEn,
    contentEs
  });
}

function buildGlutenPost() {
  const { body, contentEn, contentEs } = buildGlutenBodies();
  return nocivoPost({
    title: 'Inspeção: Glúten — a cola invisível e o mal à saúde',
    titleEn: 'Inspection: Gluten — the invisible glue and harm to health',
    titleEs: 'Inspección: Gluten — la cola invisible y el daño a la salud',
    excerpt:
      'Pesquisa completa: gliadina, celíaca, farinha branca e ultraprocessados — cruzada com os 9.798 vídeos do projecto (Davis 106 · Lair 14 · Manual do Mundo 1). Não é aconselhamento médico.',
    excerptEn:
      'Full research: gliadin, celiac disease, white flour and ultra-processed foods — crossed with the project’s 9,798 videos (Davis 106 · Lair 14 · Manual do Mundo 1). Not medical advice.',
    excerptEs:
      'Investigación completa: gliadina, celiaquía, harina blanca y ultraprocesados — cruzada con los 9.798 vídeos del proyecto (Davis 106 · Lair 14 · Manual do Mundo 1). No es consejo médico.',
    slug: 'inspecao-derivado-gluten',
    date: '2026-09-18T11:00:00.000Z',
    series: 'plantas-derivados-risco',
    seriesOrder: 4,
    seriesLabel: 'Glúten · cola · pesquisa',
    coverImage: '/imagens/inspecoes/gluten-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/Gl%C3%BAten',
    body,
    contentEn,
    contentEs
  });
}

function buildChocolatePost() {
  const { body, contentEn, contentEs } = buildChocolateBodies();
  const analise = '/posts/post-inspecao-derivado-analise-danos-videos.html';
  return nocivoPost({
    title: 'Inspeção: Chocolate industrial — cacau, açúcar, farinha e leite',
    titleEn: 'Inspection: Industrial chocolate — cacao, sugar, flour and milk',
    titleEs: 'Inspección: Chocolate industrial — cacao, azúcar, harina y leche',
    excerpt:
      'Produtos nocivos: chocolate industrial como matriz que junta cacau, açúcar, farinha/trigo/glúten, leite/caseína, Barriga de Trigo (Davis) e o léxico catalogado — hub que relaciona tudo.',
    excerptEn:
      'Harmful products: industrial chocolate as a matrix joining cacao, sugar, flour/wheat/gluten, milk/casein, Wheat Belly (Davis) and the catalogued lexicon — the hub that relates everything.',
    excerptEs:
      'Productos nocivos: chocolate industrial como matriz que junta cacao, azúcar, harina/trigo/gluten, leche/caseína, Barriga de Trigo (Davis) y el léxico catalogado — hub que relaciona todo.',
    slug: 'inspecao-derivado-chocolate',
    date: '2026-08-02T05:30:00.000Z',
    series: 'plantas-derivados-risco',
    seriesOrder: 5,
    seriesLabel: 'Chocolate · nocivo',
    coverImage: '/imagens/inspecoes/chocolate-cover.jpg',
    sourceUrl: '/plantas/cacau/',
    body:
      body.trimEnd() +
      `\n\n## Análise cruzada com o acervo de vídeos\n\nVer [Análise: danos × vídeos catalogados](${analise}) — onde o discurso audiovisual do projecto sustenta (ou não) esta rede.\n`,
    contentEn:
      contentEn.trimEnd() +
      `\n\n## Cross-analysis with the video archive\n\nSee [Analysis: harms × catalogued videos](${analise}).\n`,
    contentEs:
      contentEs.trimEnd() +
      `\n\n## Análisis cruzado con el acervo de vídeos\n\nVer [Análisis: daños × vídeos catalogados](${analise}).\n`
  });
}

function buildAnaliseDanosVideosBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const themes = '/content/channels/lair-video-themes.json';
  const sugarHits = '/content/channels/lair-sugar-hits.json';
  const vSugar = 'UfPawBg7vXc';
  const vFructose = 'rVS2M4wuseE';
  const vSweeteners = 'oGhMcYmy-C4';
  const vGluten = '2qYo3wMHbT0';
  const vGlutenLactose = 'yLOG0fcqYs0';
  const vLeite = 'cID3nNJsgm4';
  const vOleo = 'Z2tvpY8GraE';
  const vChoc = 'g_-gnOKRWhg';

  const body = `## Escopo

Análise editorial que **cruza os danos** da rede **Produtos nocivos** (açúcar, farinha/glúten, leite/caseína, chocolate industrial, óleos) com os **vídeos catalogados em todo o projecto** — Lair, MovReCam, CANABinALL e Inspetor BudGanja.

> **Nota metodológica:** auditoria independente. Classificação por **título** (\`lair-video-themes.json\`, \`lair-sugar-hits.json\`, catálogos \`content/channels/\`). **Não é aconselhamento médico.** **Indexar ≠ endossar.** O discurso Lair é divulgação; as fichas BudGanja (OMS, celíaca, caseína A1) são a camada de método. Sem afiliação com os canais.

## Universo do acervo (vídeos únicos)

| Canal | Vídeos | Papel neste eixo |
|-------|--------|------------------|
| Dr. Lair Ribeiro Oficial | **888** | Quase todo o discurso alimentar / dano metabólico |
| MovReCam | **285** | Cultivo / UNIFESP / cannabis — quase sem açúcar·glúten·leite |
| CANABinALL | **139** | Divulgação científica cannabis — eixo alimentar residual |
| Inspetor BudGanja | **6** | Ainda sem série própria de produtos nocivos em vídeo |
| **Total único** | **~1318** | |

**Achado principal:** o peso do eixo «produtos nocivos» **não** segue o hub de vídeos do site (MovReCam/CANABinALL) — segue o **Lair**.

## Produto → danos no discurso → vídeos → ficha

| Produto | Danos / hipóteses no discurso | Vídeos no catálogo | Ficha BudGanja |
|---------|-------------------------------|--------------------|----------------|
| **Açúcar / frutose / adoçantes** | Açúcares livres (OMS na ficha); diabesidade; frutose; adoçantes e desejo por doce | **10** no tema Lair · **38** hits na varredura (\`lair-sugar-hits.json\`: 20 diabetes/insulina, 16 metabólico) | [Cana](${cana}) · [Lair](${lair}) |
| **Farinha / glúten** | Malefícios do trigo; hipersensibilidade; custo glúten+lactose; celíaca (eixo clínico na ficha) | **14** no bucket trigo·glúten·leite | [Glúten / farinha](${gluten}) |
| **Leite / caseína** | «Mito do leite»; lactose; contraste com leite materno; A1/BCM-7 na ficha (pouco nomeado nos títulos) | Mesmo bucket de **14** | [Caseína](${caseina}) |
| **Chocolate industrial** | Na ficha: matriz açúcar+farinha+leite. Nos vídeos: chocolate **amargo** elogiado | Só **3** títulos claros (pró-amargo) | [Chocolate](${chocolate}) |
| **Óleos / gorduras** | «Veneno do coração»; colesterol; vs «gorduras boas» / coco (claims controversos) | **39** no tema óleos/gorduras | Coco derivado · falta ficha óleo/margarina |
| **Diabetes / metabolismo** | Diabesidade, insulina, glicose | **30** vídeos no tema | Cruza [cana](${cana}) + Lair |
| **Inflamação / intestino** | Inflamação crónica; intestino «segundo cérebro» | **10** inflamação Lair (+ neuroinflamação CANABinALL) | Ponte com [caseína](${caseina}) / [glúten](${gluten}) |
| **Coração** | Doença cardíaca, eixo cérebro-coração | **14** | Cruza óleos + açúcar |

## Temas Lair com mais massa neste eixo

Dados de [\`lair-video-themes.json\`](${themes}):

| Tema | Vídeos |
|------|--------|
| Óleos / gorduras / coco | 39 |
| Diabetes / obesidade / metabolismo | 30 |
| Imunidade / doença (eixo amplo) | 28 |
| Trigo · glúten · laticínios | 14 |
| Coração / cardiologia | 14 |
| Açúcar · frutose · adoçantes | 10 |
| Inflamação / dor | 10 |

Varredura açúcar — tags em [\`lair-sugar-hits.json\`](${sugarHits}) (**38** hits): diabetes/insulina **20** · metabólico **16** · açúcar **2** · adoçante **2** · refrigerante **1**.

## Vídeos âncora (verificáveis)

| Eixo | Título | ID |
|------|--------|-----|
| Açúcar | Truths about Sugar | \`${vSugar}\` |
| Frutose | Fructose the unknown poison | \`${vFructose}\` |
| Adoçantes | Sugar and Sweeteners | \`${vSweeteners}\` |
| Glúten | Effect of gluten on health | \`${vGluten}\` |
| Glúten + lactose | GLÚTEN E LACTOSE e o custo para o seu corpo | \`${vGlutenLactose}\` |
| Leite | O mito do leite | \`${vLeite}\` |
| Óleo / coração | Óleo para cozinhar O veneno do coração | \`${vOleo}\` |
| Chocolate amargo (pró) | POR QUE INGERIR CHOCOLATE AMARGO? | \`${vChoc}\` |

@youtube ${vSugar}

@youtube ${vGluten}

## O que o acervo sustenta bem

1. **Açúcar / frutose / adoçantes / diabesidade** — volume e âncoras claros; alinhado com [cana](${cana}) e OMS na ficha.  
2. **Glúten + leite como par** — vários títulos nomeiam o cruzamento (útil para a série).  
3. **Óleos de cozinha e coração** — discurso denso; falta ficha «óleo/margarina» no site.  
4. **Inflamação / intestino** — ponte mecanística para [caseína](${caseina}) e [glúten](${gluten}).

## O que o acervo NÃO cobre bem

1. **Chocolate industrial açucarado** — os poucos vídeos elogiam o **amargo**; o hub [chocolate](${chocolate}) descreve a matriz ultraprocessada — desalinhamento título↔ficha.  
2. **MovReCam / CANABinALL / Inspetor** — sem trilha alimentar; o hub \`/videos\` não representa este eixo.  
3. **Caseína A1 / BCM-7** — conceito da ficha; títulos falam «leite» e «lactose», quase nunca «caseína».  
4. **Claims fortes** (glicose/cancro, óleo de coco) — manter fronteira divulgação ≠ Legado UNIFESP.

## Veredicto editorial

Para a rede **chocolate · açúcar · farinha · leite**, o projecto já tem fichas com método; o vídeo que as alimenta é **quase só Lair**, com ênfase em açúcar/metabolismo e glúten/leite. O próximo ganho no site é publicar fichas de **refrigerante**, **adoçantes** e **óleos refinados** — onde o catálogo Lair já tem massa — e **não** esperar MovReCam/CANABinALL para este eixo.

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — análise cruzada Produtos nocivos × acervo de vídeos |
| Data | ${inspected} |
| Método | Títulos + JSON de temas/hits; sem transcrição integral |

[▶ Produtos nocivos](${hub}) · [Chocolate](${chocolate}) · [Cana](${cana}) · [Glúten](${gluten}) · [Caseína](${caseina}) · [Lair](${lair})
`;

  const contentEn = `## Scope

Editorial analysis crossing **harms** in the Harmful products network (sugar, flour/gluten, milk/casein, industrial chocolate, oils) with **all catalogued project videos**.

> **Method note:** title-based classification. **Not medical advice.** Indexing ≠ endorsement. Lair is outreach; BudGanja sheets are the method layer.

## Universe

| Channel | Videos | Role |
|---------|--------|------|
| Dr. Lair Ribeiro | **888** | Nearly all food-harm discourse |
| MovReCam | **285** | Cannabis/training — little sugar/gluten/milk |
| CANABinALL | **139** | Scientific cannabis outreach |
| Inspetor | **6** | No harmful-products video series yet |
| **Unique total** | **~1318** | |

**Main finding:** this axis follows **Lair**, not the site video hub.

## Product → harms → videos → sheet

| Product | Video signal | Sheet |
|---------|--------------|-------|
| Sugar / fructose / sweeteners | Strong (38 sugar hits; 30 diabetes theme) | [Sugarcane](${cana}) · [Lair](${lair}) |
| Flour / gluten | Strong (14 wheat/dairy bucket) | [Gluten](${gluten}) |
| Milk / casein | Medium (milk/lactose titles; rarely “casein”) | [Casein](${caseina}) |
| Industrial chocolate | Weak — 3 titles praise **dark** chocolate | [Chocolate](${chocolate}) |
| Oils / fats | High volume (39) | Coconut derivative; soy/margarine sheet missing |

## Verdict

Sheets exist with method; supporting video is almost only Lair. Next site gains: **soft drinks**, **sweeteners**, **refined oils** — where Lair already has mass.

[▶ Harmful products](${hub})
`;

  const contentEs = `## Alcance

Análisis editorial que cruza **daños** de la red Productos nocivos con los **vídeos catalogados** del proyecto.

> **Nota metodológica:** clasificación por título. **No es consejo médico.** Indexar ≠ respaldar.

## Universo

| Canal | Vídeos | Papel |
|-------|--------|-------|
| Dr. Lair Ribeiro | **888** | Casi todo el discurso alimentario de daño |
| MovReCam | **285** | Cannabis/formación — poco azúcar/gluten/leche |
| CANABinALL | **139** | Divulgación científica cannabis |
| Inspetor | **6** | Sin serie propia de productos nocivos en vídeo |
| **Total único** | **~1318** | |

**Hallazgo:** este eje sigue a **Lair**, no al hub de vídeos del sitio.

## Veredicto

Las fichas ya tienen método; el vídeo de apoyo es casi solo Lair. Próximo paso: **refresco**, **edulcorantes** y **aceites refinados**.

[▶ Productos nocivos](${hub})
`;

  return { body, contentEn, contentEs };
}

function buildAnaliseDanosVideosPost() {
  const { body, contentEn, contentEs } = buildAnaliseDanosVideosBodies();
  return nocivoPost({
    title: 'Análise: danos dos produtos nocivos × vídeos catalogados',
    titleEn: 'Analysis: harmful-product harms × catalogued videos',
    titleEs: 'Análisis: daños de productos nocivos × vídeos catalogados',
    excerpt:
      'Onde o acervo de vídeos do projecto sustenta (ou não) a rede açúcar · farinha · leite · chocolate: quase todo o discurso está no Lair; MovReCam/CANABinALL quase não entram neste eixo.',
    excerptEn:
      'Where the project video archive supports (or not) the sugar · flour · milk · chocolate network: almost all discourse is on Lair; MovReCam/CANABinALL barely enter this axis.',
    excerptEs:
      'Dónde el acervo de vídeos del proyecto sostiene (o no) la red azúcar · harina · leche · chocolate: casi todo el discurso está en Lair; MovReCam/CANABinALL casi no entran en este eje.',
    slug: 'inspecao-derivado-analise-danos-videos',
    date: '2026-08-02T04:30:00.000Z',
    series: 'plantas-derivados-risco',
    seriesOrder: 6,
    seriesLabel: 'Análise · danos × vídeos',
    coverImage: '/imagens/inspecoes/analise-danos-videos-cover.jpg',
    sourceUrl: '/biblioteca/inspecoes/#inspecoes-derivados',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLeitePost,
  buildCaseinaPost,
  buildGlutenPost,
  buildChocolatePost,
  buildAnaliseDanosVideosPost,
  buildLeiteBodies,
  buildCaseinaBodies,
  buildGlutenBodies,
  buildChocolateBodies,
  buildAnaliseDanosVideosBodies,
  PRODUTOS_NOCIVOS_POSTS: [
    buildLeitePost(),
    buildCaseinaPost(),
    buildGlutenPost(),
    buildChocolatePost(),
    buildAnaliseDanosVideosPost()
  ]
};
