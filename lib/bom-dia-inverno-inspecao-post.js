'use strict';

/**
 * Artes · livro «Bom dia, Inverno» (Tamara Klink) — divulgação editorial
 * cruzada com o léxico do laboratório e a legenda do Q&A.
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

const POST_HREF = '/posts/post-inspecao-arte-bom-dia-inverno.html';
const TAMARA = '/posts/post-inspecao-tamara-klink.html';
const AMYR = '/posts/post-inspecao-amyr-klink.html';
const CAMINHO = '/posts/post-inspecao-palavra-caminho.html';
const PASSAR = '/posts/post-inspecao-palavra-passar.html';
const BALDE = '/posts/post-inspecao-palavra-balde.html';
const GESTO = '/posts/post-inspecao-palavra-gesto.html';
const VERDADE = '/posts/post-inspecao-palavra-verdade.html';
const CRIATIVIDADE = '/posts/post-inspecao-palavra-criatividade.html';
const SIMBIOSE = '/posts/post-inspecao-palavra-simbiose.html';
const ANIMAL = '/posts/post-inspecao-palavra-animal.html';
const EMOCAO = '/posts/post-inspecao-palavra-emocao.html';
const MEDO = '/posts/post-inspecao-palavra-medo.html';
const ALEGRIA = '/posts/post-inspecao-palavra-alegria.html';
const TRISTEZA = '/posts/post-inspecao-palavra-tristeza.html';
const RAIVA = '/posts/post-inspecao-palavra-raiva.html';
const NOJINHO = '/posts/post-inspecao-palavra-nojinho.html';
const COELHO = '/posts/post-inspecao-palavra-coelho.html';
const AGUAS = '/posts/post-inspecao-arte-aguas-e-lagrimas.html';
const LAGRIMAS = '/posts/post-inspecao-arte-lagrimas-da-vida.html';
const ALVARES = '/posts/post-inspecao-figura-alvares-de-azevedo.html';
const CONTO = '/posts/post-inspecao-conto-vida-laboratorio.html';
const GUIA_COB = '/posts/post-inspecao-guia-palavras-cobertura.html';
const VIDA = '/vida/';
const DIARIO = '/vida/diario/';
const ANIMAIS = '/animais/';
const PLANTAS = '/plantas/';
const CULTIVO = '/guia/cultivo-basico.html';
const CALCULADORAS = '/calculadoras/';
const EQUIP = '/equipamentos/';
const RADIO = '/radio/';
const COMUNIDADE = '/comunidade/';
const PESQUISAS = '/biblioteca/pesquisas/';
const UNIFESP = '/biblioteca/unifesp/';
const INSPECOES = '/biblioteca/inspecoes/';
const ARTES = '/biblioteca/inspecoes/#inspecoes-artes';
const LEGADO = '/biblioteca/inspecoes/#inspecoes-pessoas';
const PALAVRAS_HUB = '/biblioteca/inspecoes/#inspecoes-palavras';
const GUIA = '/guia/palavras.html';
const HOME = '/';
const VIDEO_QA = 'https://www.youtube.com/watch?v=V3GSlr5sp7c';
const UOL =
  'https://cultura.uol.com.br/noticias/69371_navegadora-tamara-klink-conta-que-falta-de-apoio-do-pai-a-motivou-buscar-seus-proprios-caminhos.html';
const SITE = 'https://www.tamaraklink.com';
const EDITORA = 'https://www.companhiadasletras.com.br/';

/** Lote temático — Guia de Palavras (universo Bom dia, Inverno / Tamara). */
const GUIA_TAMARA_INVERNO_ITEMS = [
  {
    id: 'barco',
    word: 'Barco',
    simple:
      'Embarcação — no universo Tamara é casa, oficina e corpo da invernagem; elo do livro *Bom dia, Inverno*.',
    simpleEn:
      'Boat — in Tamara’s world: home, workshop and body of the overwintering; link to *Bom dia, Inverno*.',
    simpleEs:
      'Barco — en el universo Tamara: casa, taller y cuerpo de la invernada; enlace con *Bom dia, Inverno*.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'mar',
    word: 'Mar',
    simple:
      'Oceano e horizonte — no laboratório cruza com caminho, Vida e a travessia solitária de Tamara.',
    simpleEn:
      'Ocean and horizon — in the lab it crosses caminho, Vida and Tamara’s solo crossing.',
    simpleEs:
      'Océano y horizonte — en el laboratorio cruza camino, Vida y la travesía solitaria de Tamara.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'gelo',
    word: 'Gelo',
    simple:
      'Água sólida que prende o barco — matéria da invernagem ártica narrada em *Bom dia, Inverno*.',
    simpleEn:
      'Solid water that holds the boat — matter of the Arctic overwintering in *Bom dia, Inverno*.',
    simpleEs:
      'Agua sólida que atrapa el barco — materia de la invernada ártica en *Bom dia, Inverno*.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'inverno',
    word: 'Inverno',
    simple:
      'Estação e título — *Bom dia, Inverno*: cumprimentar o frio sem romantizar o isolamento.',
    simpleEn:
      'Season and title — *Bom dia, Inverno*: greeting the cold without romanticizing isolation.',
    simpleEs:
      'Estación y título — *Bom dia, Inverno*: saludar el frío sin romantizar el aislamiento.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'invernagem',
    word: 'Invernagem',
    simple:
      'Permanecer o inverno inteiro no gelo — feito âncora de Tamara no Ártico; eixo do livro.',
    simpleEn:
      'Staying the whole winter in the ice — Tamara’s Arctic anchor feat; axis of the book.',
    simpleEs:
      'Permanecer todo el invierno en el hielo — hazaña ancla de Tamara en el Ártico; eje del libro.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'navegar',
    word: 'Navegar',
    simple:
      'Conduzir o barco e a própria rota — ofício Klink; no BudGanja liga a caminho e gesto.',
    simpleEn:
      'Steering the boat and one’s route — Klink craft; in BudGanja links to caminho and gesto.',
    simpleEs:
      'Conducir el barco y la propia ruta — oficio Klink; en BudGanja une camino y gesto.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'agua',
    word: 'Água',
    simple:
      'Elemento que o balde carrega e o gelo retém — volume, sede e limite na invernagem.',
    simpleEn:
      'Element the bucket carries and ice retains — volume, thirst and limit in overwintering.',
    simpleEs:
      'Elemento que el balde lleva y el hielo retiene — volumen, sed y límite en la invernada.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'neve',
    word: 'Neve',
    simple:
      'Cobertura branca do Ártico — paisagem e ruído branco da narrativa de Tamara.',
    simpleEn:
      'White Arctic cover — landscape and white noise of Tamara’s narrative.',
    simpleEs:
      'Cubierta blanca del Ártico — paisaje y ruido blanco de la narrativa de Tamara.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'congelado',
    word: 'Congelado',
    simple:
      'Estado do mar preso — o barco deixa de «passar» e passa a *ficar*; elo com Vida.',
    simpleEn:
      'State of the locked sea — the boat stops “passing” and starts *staying*; link to Vida.',
    simpleEs:
      'Estado del mar atrapado — el barco deja de «pasar» y empieza a *quedarse*; enlace con Vida.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'risco',
    word: 'Risco',
    simple:
      'Perigo calculado da travessia e da invernagem — Amyr planeia; Tamara assume o próprio.',
    simpleEn:
      'Calculated danger of crossing and overwintering — Amyr plans; Tamara owns her own.',
    simpleEs:
      'Peligro calculado de la travesía y la invernada — Amyr planifica; Tamara asume el suyo.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'solitario',
    word: 'Solitário',
    simple:
      'Navegar e invernar sozinha — não isolamento romântico: método, medo e escrita.',
    simpleEn:
      'Sailing and overwintering alone — not romantic isolation: method, fear and writing.',
    simpleEs:
      'Navegar e invernar sola — no aislamiento romántico: método, miedo y escritura.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'groenlandia',
    word: 'Groenlândia',
    simple:
      'Palco da invernagem ártica de Tamara — gelo, animais e o livro *Bom dia, Inverno*.',
    simpleEn:
      'Stage of Tamara’s Arctic overwintering — ice, animals and *Bom dia, Inverno*.',
    simpleEs:
      'Escenario de la invernada ártica de Tamara — hielo, animales y *Bom dia, Inverno*.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'anzol',
    word: 'Anzol',
    simple:
      'Ferramenta de pesca na narrativa — gesto concreto de sobrevivência no gelo.',
    simpleEn:
      'Fishing hook in the narrative — concrete survival gesture on the ice.',
    simpleEs:
      'Anzuelo en la narrativa — gesto concreto de supervivencia en el hielo.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'livro',
    word: 'Livro',
    simple:
      'Objecto e ofício — *Bom dia, Inverno* (Companhia das Letras): a invernagem vira página.',
    simpleEn:
      'Object and craft — *Bom dia, Inverno* (Companhia das Letras): overwintering becomes page.',
    simpleEs:
      'Objeto y oficio — *Bom dia, Inverno* (Companhia das Letras): la invernada se hace página.',
    group: 'lexico',
    fromTitle: false,
    href: POST_HREF
  }
];

function q(word) {
  return GUIA + '?q=' + encodeURIComponent(word);
}

function buildBomDiaInvernoBodies() {
  const inspected = '2026-08-02';

  const body = `## Escopo

Divulgação editorial e inspeção-cultura do livro **«Bom dia, Inverno»** de [Tamara Klink](${TAMARA}) (Companhia das Letras) — a invernagem ártica em solitário virada narrativa. O laboratório **não vende o livro**: usa-o como **nó** que liga o [mapa inteiro do BudGanja](${HOME}) — [Vida](${VIDA}), [cultivo](${CULTIVO}), [plantas](${PLANTAS}), [animais](${ANIMAIS}), [Palavras](${PALAVRAS_HUB}), [Artes](${ARTES}), [Legado](${LEGADO}), ferramentas e rede.

> **Nota metodológica:** auditoria independente BudGanja. Fontes: [site Tamara](${SITE}), [Companhia das Letras](${EDITORA}), [UOL Cultura / Roda Viva](${UOL}), [Q&A no YouTube](${VIDEO_QA}) (legendas: 779 palavras únicas catalogadas). Capa adaptada da imagem TV Cultura / UOL. **Sem afiliação**. Divulgar ≠ biografia oficial. Relacionar ≠ fundir eixos (clínico, cultivo, legado exploratório).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Bom dia, Inverno** |
| Autora | [Tamara Klink](${TAMARA}) |
| Tipo | Livro · memoir de invernagem / navegação |
| Editora | Companhia das Letras |
| Feito âncora | Invernagem sozinha no gelo ártico (Groenlândia) |
| Função BudGanja | **Hub cultural** — obra ↔ léxico ↔ legado ↔ Vida |
| Data | ${inspected} |

## Por que este livro amarra o projecto

Tamara **parte**, **fica** no gelo, **escreve**. No [Q&A](${VIDEO_QA}) fala do [balde](${BALDE}), dos [animais](${ANIMAIS}), do barco-casa. No [UOL](${UOL}) transforma o «zero ajuda» do pai ([Amyr](${AMYR})) em [caminho](${CAMINHO}) próprio. Isso é o DNA do laboratório: [gesto](${GESTO}) concreto, [verdade](${VERDADE}) sem pose, [criatividade](${CRIATIVIDADE}) que documenta, [simbiose](${SIMBIOSE}) com o que não é humano, [emoção](${EMOCAO}) inspecionada sem romantizar o medo.

## Hipóteses e método

**H1:** a invernagem é metáfora operacional do laboratório — **ficar** quando não se pode «passar» depressa ([Vida](${VIDA}), [passar](${PASSAR})).  
**H2:** o léxico do Q&A + lote do [Guia](${GUIA}) é a ponte para **todas** as fichas de palavra.  
**H3:** cada secção do site tem um elo legítimo com a obra (tabela abaixo).  
**H4:** Legado (pessoa) e Artes (obra) ficam **juntos sem misturar**.

## Mapa do projecto inteiro

| Área BudGanja | Elo com *Bom dia, Inverno* | Entrada |
|---------------|----------------------------|---------|
| [Home](${HOME}) | Porta: divulgação viva no popup / últimas | Laboratório |
| [Vida](${VIDA}) / [Diário](${DIARIO}) | Ficar no gelo = ficar com método; registar o dia | [conto do laboratório](${CONTO}) |
| [Cultivo](${CULTIVO}) | Estação, espera, observação — inverno como fase | Guia cultivo |
| [Plantas](${PLANTAS}) | Habitat e tempo lento (sem forçar analogia clínica) | Catálogo |
| [Animais](${ANIMAIS}) | Raposas, corvos, focas do Q&A; [animal](${ANIMAL}) · [coelho](${COELHO}) | Hub animais |
| [Calculadoras](${CALCULADORAS}) | Medir volume / risco — o [balde](${BALDE}) pede litros | Ferramentas |
| [Equipamentos](${EQUIP}) | Utensílio e ofício (balde, anzol = gesto técnico) | Equipamentos |
| [Pesquisas](${PESQUISAS}) | Documentar o que se viveu — memoir como relatório vivo | Biblioteca |
| [UNIFESP](${UNIFESP}) | Método, crédito, limite da afirmação | Formação |
| [Inspeções](${INSPECOES}) | Hub-mãe: Artes + Palavras + Legado | Biblioteca |
| [Artes](${ARTES}) | Esta ficha · [Águas…](${AGUAS}) · [Lágrimas…](${LAGRIMAS}) | Cultura |
| [Legado](${LEGADO}) | [Tamara](${TAMARA}) · [Amyr](${AMYR}) | Pessoas |
| [Palavras](${PALAVRAS_HUB}) | Rede abaixo | Léxico |
| [Guia de Palavras](${GUIA}) | Lote temático + cobertura | [cobertura](${GUIA_COB}) |
| [Rádio](${RADIO}) | Presença sonora quando o isolamento aperta | Rede |
| [Comunidade](${COMUNIDADE}) | Partilha sem pressa — o oposto do gelo mudo | Rede |

## Rede de palavras do projecto

### Lote temático (gelo / livro)

| Palavra | Leitura | Elo |
|---------|---------|-----|
| [Barco](${q('Barco')}) | Casa e corpo | Q&A · obra |
| [Mar](${q('Mar')}) | Horizonte e sal | [Águas…](${AGUAS}) · [caminho](${CAMINHO}) |
| [Gelo](${q('Gelo')}) / [Congelado](${q('Congelado')}) | Mar que prende | Invernagem |
| [Inverno](${q('Inverno')}) / [Invernagem](${q('Invernagem')}) | Estação + feito | Título |
| [Navegar](${q('Navegar')}) | Ofício | [gesto](${GESTO}) · Klink |
| [Água](${q('Água')}) · [Balde](${BALDE}) | Volume, enjoo, transporte | Q&A · cultivo |
| [Neve](${q('Neve')}) · [Groenlândia](${q('Groenlândia')}) | Palco | Cronologia |
| [Risco](${q('Risco')}) · [Solitário](${q('Solitário')}) | Perigo com método | [verdade](${VERDADE}) |
| [Anzol](${q('Anzol')}) | Sobrevivência | Narrativa |
| [Livro](${q('Livro')}) | Invernagem → página | Editora |

### Palavras profundas (fichas)

| Palavra | Como o livro a activa |
|---------|------------------------|
| [Caminho](${CAMINHO}) | «Procurar caminhos próprios» após o zero ajuda ([UOL](${UOL})) |
| [Passar](${PASSAR}) | Partir / atravessar — e também **não poder passar** no gelo |
| [Gesto](${GESTO}) | Actos mínimos: regar memória, escrever, puxar anzol, abraçar o balde |
| [Verdade](${VERDADE}) | Nomear o «não» do pai sem apagar o mérito dele |
| [Criatividade](${CRIATIVIDADE}) | Transformar invernagem em literatura |
| [Simbiose](${SIMBIOSE}) | Barco ↔ gelo ↔ animais ↔ corpo |
| [Animal](${ANIMAL}) · [Coelho](${COELHO}) | Companhia não humana; habitat |
| [Emoção](${EMOCAO}) | Campo afectivo da solidão e da partida |
| [Medo](${MEDO}) | Risco real da travessia e do gelo |
| [Alegria](${ALEGRIA}) | «Bom dia» ao inverno — cumprimento, não negação |
| [Tristeza](${TRISTEZA}) | Isolamento sem romantizar a queda |
| [Raiva](${RAIVA}) | Energia do «zero ajuda» convertida em rota |
| [Nojinho](${NOJINHO}) | Limite corporal (enjoo, balde) — inspeção sem vergonha |

### Artes irmãs (água / lágrima / mar)

| Obra / figura | Elo |
|---------------|-----|
| [Águas do Mar e Lágrimas](${AGUAS}) | Mar × sal × ficar |
| [Lágrimas da Vida](${LAGRIMAS}) | Água emocional · [Álvares](${ALVARES}) |
| [Conto do laboratório](${CONTO}) | Narrar o que o laboratório vive |

## Complementaridade (pessoas + fontes)

| Recurso | Papel |
|---------|-------|
| [Tamara · Legado](${TAMARA}) | Pessoa e feitos |
| [Amyr · Legado](${AMYR}) | Pai / ofício / tensão produtiva |
| Esta ficha | Obra em Artes |
| [Guia](${GUIA}) · [cobertura](${GUIA_COB}) | Índice de palavras |
| [Q&A](${VIDEO_QA}) | 779 únicas / 623 conteúdo |
| [UOL](${UOL}) | Roda Viva — caminhos próprios |
| [Site](${SITE}) | Fonte da autora |

## Avaliação BudGanja

### Forças
- Transforma um livro numa **porta de entrada** para o mapa inteiro do site.  
- Cruza léxico temático + palavras profundas + hubs (Vida, cultivo, animais, ferramentas, rede).  
- Mantém nuance Legado × Artes × Palavras.

### Limites
- Não é resenha literária completa.  
- Analogias com cultivo/clínica são **metáfora de método**, não protocolo.  
- Não substitui ler o livro nem ouvir a entrevista.

## Como repetir o método

1. Fixar obra + autora.  
2. Catalogar legenda / entrevista → lote Guia.  
3. Tabela **área do site × elo**.  
4. Tabela **palavra profunda × activação**.  
5. Elos Artes irmãs + Legado.  
6. Status.

## Status

**Aprovado — divulgação + mapa completo** — *Bom dia, Inverno* amarra [Vida](${VIDA}), [cultivo](${CULTIVO}), [plantas](${PLANTAS}), [animais](${ANIMAIS}), [Palavras](${PALAVRAS_HUB}), [Artes](${ARTES}), [Legado](${LEGADO}), [ferramentas](${CALCULADORAS}) e [rede](${COMUNIDADE}) ao léxico do gelo e às fichas de palavra do laboratório.

[▶ Tamara](${TAMARA}) · [▶ Guia](${GUIA}) · [▶ Palavras](${PALAVRAS_HUB}) · [▶ Vida](${VIDA}) · [▶ Animais](${ANIMAIS}) · [▶ Cultivo](${CULTIVO}) · [▶ Q&A](${VIDEO_QA}) · [▶ UOL](${UOL}) · [▶ Artes](${ARTES}) · [▶ Inspeções](${INSPECOES})
`;

  const contentEn = `## Scope

Editorial promotion of **Bom dia, Inverno** by [Tamara Klink](${TAMARA}) as a **hub node** for the whole BudGanja map: [Vida](${VIDA}), grow, plants, animals, Words, Arts, Legacy, tools and community — not a bookshop listing.

> Sources: [tamaraklink.com](${SITE}), Companhia das Letras, [UOL](${UOL}), [Q&A](${VIDEO_QA}) (779 unique caption words). Cover from TV Cultura / UOL. No affiliation.

## Project map (summary)

| Area | Link |
|------|------|
| Stay / diary | [Vida](${VIDA}) · [balde](${BALDE}) · [gesto](${GESTO}) |
| Path / truth | [caminho](${CAMINHO}) · [passar](${PASSAR}) · [verdade](${VERDADE}) |
| Emotion | [emoção](${EMOCAO}) · [medo](${MEDO}) · [alegria](${ALEGRIA}) |
| Habitat | [animais](${ANIMAIS}) · [simbiose](${SIMBIOSE}) · [animal](${ANIMAL}) |
| Arts sisters | [Águas…](${AGUAS}) · [Lágrimas…](${LAGRIMAS}) |
| Legacy | [Tamara](${TAMARA}) · [Amyr](${AMYR}) |
| Guide | [Guia](${GUIA}) thematic ice lexicon |

## Status

**Approved — full-map promotion** — the book opens doors across the lab lexicon and hubs.

[▶ Tamara](${TAMARA}) · [▶ Guide](${GUIA}) · [▶ Words](${PALAVRAS_HUB}) · [▶ Vida](${VIDA}) · [▶ Q&A](${VIDEO_QA})
`;

  const contentEs = `## Alcance

Divulgación editorial de **Bom dia, Inverno** de [Tamara Klink](${TAMARA}) como **nodo** del mapa BudGanja entero: [Vida](${VIDA}), cultivo, plantas, animales, Palabras, Artes, Legado, herramientas y comunidad.

> Fuentes: [tamaraklink.com](${SITE}), Companhia das Letras, [UOL](${UOL}), [Q&A](${VIDEO_QA}). Portada TV Cultura / UOL. Sin afiliación.

## Mapa (resumen)

| Área | Enlace |
|------|--------|
| Quedarse | [Vida](${VIDA}) · [balde](${BALDE}) · [gesto](${GESTO}) |
| Ruta / verdad | [caminho](${CAMINHO}) · [passar](${PASSAR}) · [verdade](${VERDADE}) |
| Emoción | [emoção](${EMOCAO}) · [medo](${MEDO}) · [alegria](${ALEGRIA}) |
| Hábitat | [animais](${ANIMAIS}) · [simbiose](${SIMBIOSE}) |
| Artes hermanas | [Águas…](${AGUAS}) · [Lágrimas…](${LAGRIMAS}) |
| Legado | [Tamara](${TAMARA}) · [Amyr](${AMYR}) |
| Guía | [Guia](${GUIA}) léxico del hielo |

## Estado

**Aprobado — divulgación con mapa completo** — el libro abre puertas a todo el léxico y hubs del laboratorio.

[▶ Tamara](${TAMARA}) · [▶ Guía](${GUIA}) · [▶ Palabras](${PALAVRAS_HUB}) · [▶ Vida](${VIDA}) · [▶ Q&A](${VIDEO_QA})
`;

  return { body, contentEn, contentEs };
}

function buildBomDiaInvernoPost() {
  const { body, contentEn, contentEs } = buildBomDiaInvernoBodies();
  return artePost({
    title: 'Divulgação: Bom dia, Inverno — Tamara Klink e o léxico do gelo',
    titleEn: 'Promotion: Bom dia, Inverno — Tamara Klink and the lexicon of ice',
    titleEs: 'Divulgación: Bom dia, Inverno — Tamara Klink y el léxico del hielo',
    excerpt:
      'Bom dia, Inverno como hub: Vida, cultivo, plantas, animais, Palavras (gesto, verdade, medo…), Artes, Legado Klink e o léxico do gelo.',
    excerptEn:
      'Bom dia, Inverno as a hub: Vida, grow, plants, animals, Words (gesto, truth, fear…), Arts, Klink Legacy and the ice lexicon.',
    excerptEs:
      'Bom dia, Inverno como hub: Vida, cultivo, plantas, animales, Palabras (gesto, verdad, miedo…), Artes, Legado Klink y el léxico del hielo.',
    slug: 'inspecao-arte-bom-dia-inverno',
    date: '2026-08-02T19:40:00.000Z',
    seriesOrder: 14,
    seriesLabel: 'Bom dia, Inverno · livro',
    coverImage: '/imagens/inspecoes/bom-dia-inverno-cover.jpg',
    sourceUrl: UOL,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  POST_HREF,
  GUIA_TAMARA_INVERNO_ITEMS,
  buildBomDiaInvernoPost,
  buildBomDiaInvernoBodies
};
