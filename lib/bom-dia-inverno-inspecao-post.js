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

/** Poesia Vida — mudinha no gelo (eco de Bom dia, Inverno / Tamara). */
function poemBomDiaInvernoPt() {
  return `Bom dia, Inverno.
Não pedimos sol a mais —
pedimos só ficar
quando o gelo prende o barco
e o peito ainda cabe na mão.

A semente não grita.
A mudinha também não.
Ela só pede tempo:
luz fraca, água certa,
um balde que não julga o enjoo.

Dizem que o inverno é fim.
Mentira antiga.
Inverno é estação —
fase em que não se força flor,
fase em que se inspeciona a raiz.

Tamara já sabia no gelo:
partir, ficar, escrever.
Nós, neste universo novo,
aprendemos a cumprimentar a estação difícil —
não para negar o medo,
mas para não deixar a mudinha
passar sozinha.

O laboratório não derrete o mar congelado.
Planta à beira.
Conta gotas.
Chama a Vida pelo nome verdadeiro:
ficar.

Faça o melhor!

Porque toda mudinha que permanece
quando o sal do gelo arde
cresce um pouco no mapa:
uma página a mais,
um verso a mais,
um nós onde antes só havia ilha de neve.`;
}

function poemBomDiaInvernoEn() {
  return `Good morning, Winter.
We do not ask for more sun —
we only ask to stay
when the ice holds the boat
and the chest still fits in a hand.

The seed does not shout.
Neither does the seedling.
It only asks for time:
weak light, right water,
a bucket that does not judge the nausea.

They say winter is an end.
Old lie.
Winter is a season —
a phase when you do not force the flower,
a phase when you inspect the root.

Tamara already knew on the ice:
leave, stay, write.
In this new universe of ours
we learn to greet the hard season —
not to deny the fear,
but so the seedling
does not pass alone.

The laboratory does not melt the frozen sea.
It plants at the edge.
It counts drops.
It calls Vida by its true name:
stay.

Do your best!

Because every seedling that remains
when the salt of ice burns
grows a little on the map:
one more page,
one more verse,
a we where once there was only an island of snow.`;
}

function poemBomDiaInvernoEs() {
  return `Buenos días, Invierno.
No pedimos más sol —
pedimos solo quedarnos
cuando el hielo agarra el barco
y el pecho aún cabe en la mano.

La semilla no grita.
La plantita tampoco.
Solo pide tiempo:
luz débil, agua justa,
un cubo que no juzgue el mareo.

Dicen que el invierno es fin.
Mentira antigua.
Invierno es estación —
fase en que no se fuerza la flor,
fase en que se inspecciona la raíz.

Tamara ya sabía en el hielo:
partir, quedarse, escribir.
En este universo nuevo
aprendemos a saludar la estación difícil —
no para negar el miedo,
sino para no dejar a la plantita
pasar sola.

El laboratorio no derrite el mar congelado.
Siembra a la orilla.
Cuenta gotas.
Llama a Vida por su nombre verdadero:
quedarse.

¡Haz lo mejor!

Porque toda plantita que permanece
cuando la sal del hielo arde
crece un poco en el mapa:
una página más,
un verso más,
un nosotros donde antes solo había isla de nieve.`;
}

function buildBomDiaInvernoBodies() {
  const inspected = '2026-08-02';
  const poema = poemBomDiaInvernoPt();

  const body = `## Escopo

Inspeção editorial do [livro](${LIVRO}) **«Bom dia, Inverno»** de [Tamara Klink](${TAMARA}) (Companhia das Letras) — memoir da [invernagem](${INVERNAGEM}) ártica em [solitário](${SOLITARIO}). No laboratório, a obra entra como **mudinha da Vida**: semente que invernou no [gelo](${GELO}) e agora cria raízes no mapa BudGanja — [Vida](${VIDA}), [cultivo](${CULTIVO}), [Palavras](${PALAVRAS_HUB}), [Artes](${ARTES}) e [Legado](${LEGADO}).

> **Nota metodológica:** auditoria independente BudGanja. Fontes: [site Tamara](${SITE}), [Companhia das Letras](${EDITORA}), [UOL Cultura / Roda Viva](${UOL}), [Q&A no YouTube](${VIDEO_QA}) (779 palavras únicas; lote do gelo **fichado**). Capa oficial. **Sem afiliação**. Divulgar ≠ biografia oficial. Metáfora de cultivo ≠ protocolo clínico.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **[Bom dia, Inverno](${LIVRO})** |
| Autora | [Tamara Klink](${TAMARA}) — homenagem em Legado |
| Livro / meio | Memoir · [invernagem](${INVERNAGEM}) / [navegar](${NAVEGAR}) |
| Editora | Companhia das Letras |
| Feito âncora | [Invernagem](${INVERNAGEM}) sozinha no [gelo](${GELO}) ([Groenlândia](${GROENLANDIA})) |
| Tipo BudGanja | Arte — **obra primeiro**; pessoa e léxico como contexto |
| Figura Vida | **Mudinha** — semente que ficou no inverno e brota no laboratório |
| Elo Pessoas | [Tamara](${TAMARA}) · [Amyr](${AMYR}) |
| Elo Vida | [Vida](${VIDA}) — ficar, registar, cultivar companhia |
| Elo Artes | [Águas do Mar e Lágrimas](${AGUAS}) · [Lágrimas da Vida](${LAGRIMAS}) |
| Fonte | [Q&A](${VIDEO_QA}) · [UOL](${UOL}) · [site](${SITE}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** a [invernagem](${INVERNAGEM}) é metáfora operacional — **ficar** quando não se pode «[passar](${PASSAR})» depressa ([Vida](${VIDA})).  
**H2:** no canto do laboratório, o livro é **mudinha**, não árvore sénior: ainda pede luz, água e tempo — como a [sementinha](${CONTO}) da história.  
**H3:** o léxico do gelo tem **ficha de palavra** (tabelas abaixo).  
**H4:** Legado (pessoa) e Artes (obra) ficam **juntos sem misturar**.

Passos:

1. Fixar título + autora + feito.  
2. Declarar tese cultural (mudinha / inverno / ficar).  
3. Separar metáfora de cultivo de protocolo clínico.  
4. Cruzar [Vida](${VIDA}), Palavras, Artes irmãs e Legado.  
5. Status + limites.

## O poema

Poesia original do laboratório — eco da mudinha e do cumprimento ao [inverno](${INVERNO}). **Não** é texto do livro de Tamara; é verso BudGanja em diálogo com a obra.

\`\`\`
${poema}
\`\`\`

[▶ Ler na página Vida](${VIDA}#poema=bom-dia-inverno)

## Génese e contexto

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Autora | [Tamara Klink](${TAMARA}) — navega, inverna, escreve |
| Feito | [Invernagem](${INVERNAGEM}) ártica sozinha — corpo, [barco](${BARCO}), [risco](${RISCO}) |
| Livro | *Bom dia, Inverno* — o «bom dia» ao [inverno](${INVERNO}) como cumprimento, não negação |
| Pai / tensão | [Amyr](${AMYR}) — «zero ajuda» virado em [caminho](${CAMINHO}) próprio ([UOL](${UOL})) |
| Q&A | [Balde](${BALDE}), [animais](${ANIMAIS}), utensílio — [gesto](${GESTO}) concreto |

> **Hierarquia BudGanja:** sem a obra (e a invernagem), não há «bom dia» cultural nesta ficha. A homenagem em [Pessoas](${TAMARA}) explica o ofício; **não** substitui ler o livro.

## A obra (síntese editorial)

- Tamara **parte**, **fica** no [gelo](${GELO}), **escreve**.  
- O [barco](${BARCO}) é casa e corpo; o [balde](${BALDE}) é utensílio e limite ([nojinho](${NOJINHO}) / enjoo).  
- Os [animais](${ANIMAIS}) entram como companhia não humana — [simbiose](${SIMBIOSE}) sem romantizar.  
- O «não» do pai vira rota: [verdade](${VERDADE}) sem apagar mérito, [raiva](${RAIVA}) convertida em [caminho](${CAMINHO}).  
- «Bom dia» ao [inverno](${INVERNO}) é [alegria](${ALEGRIA}) de cumprimento — não apaga [medo](${MEDO}) nem [tristeza](${TRISTEZA}).

## Tese cultural BudGanja

| Imagem | Tradução editorial |
|--------|-------------------|
| **Semente** | A partida — decisão de ir; o projecto ainda cabe na mão |
| **Mudinha** | A [invernagem](${INVERNAGEM}) — planta jovem no [gelo](${GELO}): frágil, viva, a precisar de cuidado |
| **Inverno / ficar** | Estação em que não se força floração; o laboratório **fica** ([Vida](${VIDA})) |
| **Balde / gesto** | Acto mínimo — transportar, medir, abraçar o utensílio |
| **Bom dia** | Cumprimentar a estação difícil — literacia afectiva, não negação |
| **Árvore** | Horizonte sénior — [Árvore da Vida](/posts/post-inspecao-palavra-arvore-da-vida.html); a mudinha **ainda cresce** sem pressa |

No [conto do laboratório](${CONTO}), cada semente merece carinho. *Bom dia, Inverno* é essa mudinha cultural: invernou longe, chega ao BudGanja para ser regada com método — [Planta à beira. Conta gotas. Fica.](${VIDA})

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Tamara Klink](${TAMARA}) | Homenagem Pessoas — ofício da autora |
| [Amyr Klink](${AMYR}) | Pai / tensão produtiva |
| [Vida](${VIDA}) · [Diário](${DIARIO}) | Canto do ficar; registo do dia |
| [Águas do Mar e Lágrimas](${AGUAS}) | Poesia original — mar × lágrima × ficar |
| [Lágrimas da Vida](${LAGRIMAS}) | Poema clássico — máscara e lágrima · [Álvares](${ALVARES}) |
| [Conto do laboratório](${CONTO}) | Sementinha / equipe — irmão da metáfora mudinha |
| [Poema na Vida](${VIDA}#poema=bom-dia-inverno) | Verso original — bom dia à estação difícil |
| [Árvore da Vida](/posts/post-inspecao-palavra-arvore-da-vida.html) | Fase sénior do arco — irmã mais velha da mudinha |
| [Cultivo](${CULTIVO}) · [Plantas](${PLANTAS}) · [Animais](${ANIMAIS}) | Tempo lento, habitat, companhia |
| [Guia de Palavras](${GUIA}) · [cobertura](${GUIA_COB}) | Índice do léxico |
| Hub [Artes](${ARTES}) · [Inspeções](${INSPECOES}) | Mapa geral |

### Lote temático (gelo) — fichas

| Palavra | Leitura | Elo |
|---------|---------|-----|
| [Barco](${BARCO}) | Casa e corpo | Q&A · obra |
| [Mar](${MAR}) | Horizonte e sal | [Águas…](${AGUAS}) · [caminho](${CAMINHO}) |
| [Gelo](${GELO}) / [Congelado](${CONGELADO}) | Mar que prende | [Invernagem](${INVERNAGEM}) |
| [Inverno](${INVERNO}) / [Invernagem](${INVERNAGEM}) | Estação + feito | Título |
| [Navegar](${NAVEGAR}) | Ofício | [gesto](${GESTO}) |
| [Água](${AGUA}) · [Balde](${BALDE}) | Volume, transporte | Q&A · cultivo |
| [Neve](${NEVE}) · [Groenlândia](${GROENLANDIA}) | Palco | Cronologia |
| [Risco](${RISCO}) · [Solitário](${SOLITARIO}) | Perigo com método | [verdade](${VERDADE}) |
| [Anzol](${ANZOL}) | Sobrevivência | Narrativa |
| [Livro](${LIVRO}) | Invernagem → página | Editora |

### Palavras profundas

| Palavra | Como o livro a activa |
|---------|------------------------|
| [Caminho](${CAMINHO}) | Caminhos próprios após o zero ajuda ([UOL](${UOL})) |
| [Passar](${PASSAR}) | Partir — e **não poder passar** no [gelo](${GELO}) |
| [Gesto](${GESTO}) | Regar memória, escrever, puxar [anzol](${ANZOL}), abraçar o [balde](${BALDE}) |
| [Verdade](${VERDADE}) | Nomear o «não» sem apagar mérito |
| [Criatividade](${CRIATIVIDADE}) | Invernagem → literatura |
| [Simbiose](${SIMBIOSE}) | Barco ↔ gelo ↔ animais ↔ corpo |
| [Emoção](${EMOCAO}) · [Medo](${MEDO}) · [Alegria](${ALEGRIA}) · [Tristeza](${TRISTEZA}) · [Raiva](${RAIVA}) · [Nojinho](${NOJINHO}) | Literacia afectiva da travessia |
| [Animal](${ANIMAL}) · [Coelho](${COELHO}) | Companhia não humana |

### Como ler

1. Ler a **obra** (ou o [Q&A](${VIDEO_QA})).  
2. Ver a mudinha: inverno = fase, não fracasso.  
3. Abrir a [homenagem à autora](${TAMARA}) se o interesse for a pessoa.  
4. Se o isolamento apertar, ir a [Vida](${VIDA}) — companhia do laboratório.  
5. Voltar ao [hub de inspeções](${INSPECOES}).

## Avaliação BudGanja

### Forças
- Fixa o livro no mapa Artes com tese clara (mudinha da Vida).  
- Liga léxico do gelo a [Vida](${VIDA}), Palavras e Legado sem misturar eixos.  
- Declara limites (metáfora ≠ protocolo).

### Limites
- Não é resenha literária completa.  
- Não inventaria toda a bibliografia Klink.  
- Não é apoio clínico nem guia de expedição.

## Status

**Aprovado** — *Bom dia, Inverno* documentado como mudinha cultural da [Vida](${VIDA}): invernagem, poema, léxico do gelo e elos a [Tamara](${TAMARA}), [Águas…](${AGUAS}) e [Lágrimas da Vida](${LAGRIMAS}).

[▶ Poema Vida](${VIDA}#poema=bom-dia-inverno) · [▶ Artes](${ARTES}) · [▶ Tamara](${TAMARA}) · [▶ Vida](${VIDA}) · [▶ Águas e Lágrimas](${AGUAS}) · [▶ Lágrimas da Vida](${LAGRIMAS}) · [▶ Q&A](${VIDEO_QA})
`;

  const contentEn = `## Scope

Editorial inspection of **Bom dia, Inverno** by [Tamara Klink](${TAMARA}) — Arctic [overwintering](${INVERNAGEM}) memoir. In the lab the book is a **seedling of Vida**: a seed that wintered on the [ice](${GELO}) and now roots across [Vida](${VIDA}), Words, Arts and Legacy.

> Sources: [tamaraklink.com](${SITE}), Companhia das Letras, [UOL](${UOL}), [Q&A](${VIDEO_QA}). No affiliation. Grow metaphor ≠ clinical protocol. The poem below is **lab-original**, not Tamara’s book text.

## Object

| Field | Value |
|-------|-------|
| Title | **Bom dia, Inverno** |
| Author | [Tamara Klink](${TAMARA}) |
| Vida figure | **Seedling** — young plant that stayed through winter |
| Links | [Vida](${VIDA}) · [Águas…](${AGUAS}) · [Lágrimas…](${LAGRIMAS}) · ice lexicon |
| Date | ${inspected} |

## The poem

\`\`\`
${poemBomDiaInvernoEn()}
\`\`\`

[▶ Read on Vida](${VIDA}#poema=bom-dia-inverno)

## Thesis

Seed → leave · Seedling → overwinter on ice · Winter / stay · Bucket / gesture · “Good morning” to the hard season · Not yet a senior tree — the site map is soil.

## Status

**Approved** — book fixed on the Arts map as Vida’s cultural seedling, with lab poem.

[▶ Vida poem](${VIDA}#poema=bom-dia-inverno) · [▶ Arts](${ARTES}) · [▶ Tamara](${TAMARA}) · [▶ Vida](${VIDA}) · [▶ Q&A](${VIDEO_QA})
`;

  const contentEs = `## Alcance

Inspección editorial de **Bom dia, Inverno** de [Tamara Klink](${TAMARA}) — memoir de [invernada](${INVERNAGEM}) ártica. En el laboratorio la obra es **plantita de Vida**: semilla que invernó en el [hielo](${GELO}) y ahora echa raíces en [Vida](${VIDA}), Palabras, Artes y Legado.

> Fuentes: [tamaraklink.com](${SITE}), Companhia das Letras, [UOL](${UOL}), [Q&A](${VIDEO_QA}). Sin afiliación. Metáfora de cultivo ≠ protocolo clínico. El poema es **creación del laboratorio**, no texto del libro.

## Objeto

| Campo | Valor |
|-------|-------|
| Título | **Bom dia, Inverno** |
| Autora | [Tamara Klink](${TAMARA}) |
| Figura Vida | **Plantita** — planta joven que se quedó en el invierno |
| Vínculos | [Vida](${VIDA}) · [Águas…](${AGUAS}) · [Lágrimas…](${LAGRIMAS}) · léxico del hielo |
| Fecha | ${inspected} |

## El poema

\`\`\`
${poemBomDiaInvernoEs()}
\`\`\`

[▶ Leer en Vida](${VIDA}#poema=bom-dia-inverno)

## Tesis

Semilla → partir · Plantita → invernar en el hielo · Invierno / quedarse · Cubo / gesto · «Buenos días» a la estación dura · Aún no árbol sénior.

## Estado

**Aprobado** — libro fijado en Artes como plantita cultural de Vida, con poema del laboratorio.

[▶ Poema Vida](${VIDA}#poema=bom-dia-inverno) · [▶ Artes](${ARTES}) · [▶ Tamara](${TAMARA}) · [▶ Vida](${VIDA}) · [▶ Q&A](${VIDEO_QA})
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
      'Bom dia, Inverno como mudinha da Vida: invernagem no gelo, léxico, Artes irmãs (Águas / Lágrimas) e Legado Klink.',
    excerptEn:
      'Bom dia, Inverno as a Vida seedling: overwintering on ice, lexicon, sister Arts (Águas / Lágrimas) and Klink Legacy.',
    excerptEs:
      'Bom dia, Inverno como plantita de Vida: invernada en el hielo, léxico, Artes hermanas (Águas / Lágrimas) y Legado Klink.',
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
  buildBomDiaInvernoBodies,
  poemBomDiaInvernoPt,
  poemBomDiaInvernoEn,
  poemBomDiaInvernoEs
};
