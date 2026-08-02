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

const {
  guiaItemsFromTamaraInvernoPalavras,
  TAMARA_INVERNO_PALAVRA_HREFS: ICE
} = require('./tamara-inverno-palavras-posts.js');

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
const BARCO = ICE.barco;
const MAR = ICE.mar;
const GELO = ICE.gelo;
const INVERNO = ICE.inverno;
const INVERNAGEM = ICE.invernagem;
const NAVEGAR = ICE.navegar;
const AGUA = ICE.agua;
const NEVE = ICE.neve;
const CONGELADO = ICE.congelado;
const RISCO = ICE.risco;
const SOLITARIO = ICE.solitario;
const GROENLANDIA = ICE.groenlandia;
const ANZOL = ICE.anzol;
const LIVRO = ICE.livro;
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

/** Lote temático — Guia de Palavras (universo Bom dia, Inverno / Tamara) → fichas de palavra. */
const GUIA_TAMARA_INVERNO_ITEMS = guiaItemsFromTamaraInvernoPalavras().concat([
  {
    id: 'balde',
    word: 'Balde',
    simple:
      'Recipiente com asa — volume e transporte no cultivo; no Q&A Tamara, utensílio da narrativa ártica.',
    simpleEn:
      'Handled bucket — volume and transport in the grow; in Tamara’s Q&A, a tool of the Arctic narrative.',
    simpleEs:
      'Recipiente con asa — volumen y transporte en el cultivo; en el Q&A de Tamara, utensilio de la narrativa ártica.',
    group: 'lexico',
    fromTitle: false,
    href: BALDE
  },
  {
    id: 'enjoo',
    word: 'Enjoo',
    simple:
      'Limite corporal na travessia — elo com nojinho e balde na divulgação *Bom dia, Inverno*.',
    simpleEn:
      'Bodily limit at sea — links to nojinho and balde in the *Bom dia, Inverno* promotion.',
    simpleEs:
      'Límite corporal en la travesía — enlace con nojinho y balde en la divulgación *Bom dia, Inverno*.',
    group: 'lexico',
    fromTitle: false,
    href: NOJINHO
  }
]);

function buildBomDiaInvernoBodies() {
  const inspected = '2026-08-02';

  const body = `## Escopo

Divulgação editorial e inspeção-cultura do [livro](${LIVRO}) **«Bom dia, Inverno»** de [Tamara Klink](${TAMARA}) (Companhia das Letras) — a [invernagem](${INVERNAGEM}) ártica em [solitário](${SOLITARIO}) virada narrativa. O laboratório **não vende o livro**: usa-o como **nó** que liga o [mapa inteiro do BudGanja](${HOME}) — [Vida](${VIDA}), [cultivo](${CULTIVO}), [plantas](${PLANTAS}), [animais](${ANIMAIS}), [Palavras](${PALAVRAS_HUB}), [Artes](${ARTES}), [Legado](${LEGADO}), ferramentas e rede.

> **Nota metodológica:** auditoria independente BudGanja. Fontes: [site Tamara](${SITE}), [Companhia das Letras](${EDITORA}), [UOL Cultura / Roda Viva](${UOL}), [Q&A no YouTube](${VIDEO_QA}) (legendas: 779 palavras únicas catalogadas; lote do gelo **fichado** em Palavras). Capa oficial (foto com drone). **Sem afiliação**. Divulgar ≠ biografia oficial. Relacionar ≠ fundir eixos (clínico, cultivo, legado exploratório).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **[Bom dia, Inverno](${LIVRO})** |
| Autora | [Tamara Klink](${TAMARA}) |
| Tipo | [Livro](${LIVRO}) · memoir de [invernagem](${INVERNAGEM}) / [navegar](${NAVEGAR}) |
| Editora | Companhia das Letras |
| Feito âncora | [Invernagem](${INVERNAGEM}) sozinha no [gelo](${GELO}) ártico ([Groenlândia](${GROENLANDIA})) |
| Função BudGanja | **Hub cultural** — obra ↔ léxico ↔ legado ↔ Vida |
| Data | ${inspected} |

## Por que este livro amarra o projecto

Tamara **parte**, **fica** no [gelo](${GELO}), **escreve**. No [Q&A](${VIDEO_QA}) fala do [balde](${BALDE}), dos [animais](${ANIMAIS}), do [barco](${BARCO})-casa. No [UOL](${UOL}) transforma o «zero ajuda» do pai ([Amyr](${AMYR})) em [caminho](${CAMINHO}) próprio. Isso é o DNA do laboratório: [gesto](${GESTO}) concreto, [verdade](${VERDADE}) sem pose, [criatividade](${CRIATIVIDADE}) que documenta, [simbiose](${SIMBIOSE}) com o que não é humano, [emoção](${EMOCAO}) inspecionada sem romantizar o [medo](${MEDO}).

## Hipóteses e método

**H1:** a [invernagem](${INVERNAGEM}) é metáfora operacional do laboratório — **ficar** quando não se pode «[passar](${PASSAR})» depressa ([Vida](${VIDA})).  
**H2:** o léxico do Q&A + lote do [Guia](${GUIA}) tem **ficha de palavra** para cada termo do gelo (tabela abaixo).  
**H3:** cada secção do site tem um elo legítimo com a obra (mapa do projecto).  
**H4:** Legado (pessoa) e Artes (obra) ficam **juntos sem misturar**.

## Mapa do projecto inteiro

| Área BudGanja | Elo com *Bom dia, Inverno* | Entrada |
|---------------|----------------------------|---------|
| [Home](${HOME}) | Porta: divulgação viva no popup / últimas | Laboratório |
| [Vida](${VIDA}) / [Diário](${DIARIO}) | Ficar no gelo = ficar com método; registar o dia | [conto do laboratório](${CONTO}) |
| [Cultivo](${CULTIVO}) | Estação, espera, observação — [inverno](${INVERNO}) como fase | Guia cultivo |
| [Plantas](${PLANTAS}) | Habitat e tempo lento (sem forçar analogia clínica) | Catálogo |
| [Animais](${ANIMAIS}) | Raposas, corvos, focas do Q&A; [animal](${ANIMAL}) · [coelho](${COELHO}) | Hub animais |
| [Calculadoras](${CALCULADORAS}) | Medir volume / [risco](${RISCO}) — o [balde](${BALDE}) pede litros | Ferramentas |
| [Equipamentos](${EQUIP}) | Utensílio e ofício ([balde](${BALDE}), [anzol](${ANZOL}) = [gesto](${GESTO}) técnico) | Equipamentos |
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

### Lote temático (gelo / livro) — fichas

| Palavra | Leitura | Elo |
|---------|---------|-----|
| [Barco](${BARCO}) | Casa e corpo | Q&A · obra |
| [Mar](${MAR}) | Horizonte e sal | [Águas…](${AGUAS}) · [caminho](${CAMINHO}) |
| [Gelo](${GELO}) / [Congelado](${CONGELADO}) | Mar que prende | [Invernagem](${INVERNAGEM}) |
| [Inverno](${INVERNO}) / [Invernagem](${INVERNAGEM}) | Estação + feito | Título |
| [Navegar](${NAVEGAR}) | Ofício | [gesto](${GESTO}) · Klink |
| [Água](${AGUA}) · [Balde](${BALDE}) | Volume, [enjoo](${NOJINHO}), transporte | Q&A · cultivo |
| [Neve](${NEVE}) · [Groenlândia](${GROENLANDIA}) | Palco | Cronologia |
| [Risco](${RISCO}) · [Solitário](${SOLITARIO}) | Perigo com método | [verdade](${VERDADE}) |
| [Anzol](${ANZOL}) | Sobrevivência | Narrativa |
| [Livro](${LIVRO}) | Invernagem → página | Editora |

### Palavras profundas (fichas)

| Palavra | Como o livro a activa |
|---------|------------------------|
| [Caminho](${CAMINHO}) | «Procurar caminhos próprios» após o zero ajuda ([UOL](${UOL})) |
| [Passar](${PASSAR}) | Partir / atravessar — e também **não poder passar** no [gelo](${GELO}) |
| [Gesto](${GESTO}) | Actos mínimos: regar memória, escrever, puxar [anzol](${ANZOL}), abraçar o [balde](${BALDE}) |
| [Verdade](${VERDADE}) | Nomear o «não» do pai sem apagar o mérito dele |
| [Criatividade](${CRIATIVIDADE}) | Transformar [invernagem](${INVERNAGEM}) em literatura |
| [Simbiose](${SIMBIOSE}) | [Barco](${BARCO}) ↔ [gelo](${GELO}) ↔ [animais](${ANIMAIS}) ↔ corpo |
| [Animal](${ANIMAL}) · [Coelho](${COELHO}) | Companhia não humana; habitat |
| [Emoção](${EMOCAO}) | Campo afectivo da solidão e da partida |
| [Medo](${MEDO}) | [Risco](${RISCO}) real da travessia e do [gelo](${GELO}) |
| [Alegria](${ALEGRIA}) | «Bom dia» ao [inverno](${INVERNO}) — cumprimento, não negação |
| [Tristeza](${TRISTEZA}) | Isolamento sem romantizar a queda |
| [Raiva](${RAIVA}) | Energia do «zero ajuda» convertida em rota |
| [Nojinho](${NOJINHO}) | Limite corporal ([enjoo](${NOJINHO}), [balde](${BALDE})) — inspeção sem vergonha |

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
| Ice lexicon | [barco](${BARCO}) · [gelo](${GELO}) · [invernagem](${INVERNAGEM}) · [livro](${LIVRO}) |
| Stay / diary | [Vida](${VIDA}) · [balde](${BALDE}) · [gesto](${GESTO}) |
| Path / truth | [caminho](${CAMINHO}) · [passar](${PASSAR}) · [verdade](${VERDADE}) |
| Emotion | [emoção](${EMOCAO}) · [medo](${MEDO}) · [alegria](${ALEGRIA}) |
| Habitat | [animais](${ANIMAIS}) · [simbiose](${SIMBIOSE}) · [animal](${ANIMAL}) |
| Arts sisters | [Águas…](${AGUAS}) · [Lágrimas…](${LAGRIMAS}) |
| Legacy | [Tamara](${TAMARA}) · [Amyr](${AMYR}) |
| Guide | [Guia](${GUIA}) — each ice word → palavra sheet |

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
| Léxico del hielo | [barco](${BARCO}) · [gelo](${GELO}) · [invernagem](${INVERNAGEM}) · [livro](${LIVRO}) |
| Quedarse | [Vida](${VIDA}) · [balde](${BALDE}) · [gesto](${GESTO}) |
| Ruta / verdad | [caminho](${CAMINHO}) · [passar](${PASSAR}) · [verdade](${VERDADE}) |
| Emoción | [emoção](${EMOCAO}) · [medo](${MEDO}) · [alegria](${ALEGRIA}) |
| Hábitat | [animais](${ANIMAIS}) · [simbiose](${SIMBIOSE}) |
| Artes hermanas | [Águas…](${AGUAS}) · [Lágrimas…](${LAGRIMAS}) |
| Legado | [Tamara](${TAMARA}) · [Amyr](${AMYR}) |
| Guía | [Guia](${GUIA}) — cada palabra del hielo → ficha |

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
