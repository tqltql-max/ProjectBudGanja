'use strict';

/**
 * Inspeção Expressões · fim da linha
 * Ditado / locução BR — fim de percurso, de fita, de vida, de esteira.
 * Caso de laboratório: confeito de chocolate com casca colorida (formato M&M's).
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemFimDaLinhaPt() {
  return `Disseram que a fita acaba
quando o carreto não puxa mais.
Mentira de metade.
A fita acaba quando a mão
deixa de inspecionar o que ainda enrola.

Há um fim de linha no metro —
último cais, porta que abre e não segue.
Há outro na esteira da fábrica:
o confeito sai colorido,
casca intacta, núcleo escondido.

A casca é fita.
O chocolate é vida.
Enquanto a fita segura,
a vida não derrete na mão.
Quando a linha termina,
a casca entrega o que guardava.

Não é sermão de morte.
É ofício de resto:
contar o que ainda cabe neste rolo,
não fingir que a esteira é eterna,
não apertar a planta com a fita
como se o fim justificasse o nó.

Faça o melhor
antes do último cais —
com a fita certa,
com a vida nomeada,
com o confeito inspecionado
e não só comido.`;
}

function poemFimDaLinhaEn() {
  return `They said the tape ends
when the reel will not pull.
Half a lie.
The tape ends when the hand
stops inspecting what still winds.

There is an end of the line at the station —
last platform, a door that opens and does not go on.
There is another on the factory belt:
the candy comes out in color,
shell intact, core hidden.

The shell is tape.
The chocolate is life.
While the tape holds,
life does not melt in the hand.
When the line finishes,
the shell delivers what it kept.

This is not a sermon on death.
It is craft of what remains:
count what still fits on this reel,
do not pretend the belt is eternal,
do not cinch the plant with tape
as if the end excused the knot.

Do your best
before the last platform —
with the right tape,
with life named,
with the candy inspected
and not only eaten.`;
}

function poemFimDaLinhaEs() {
  return `Dijeron que la cinta se acaba
cuando el carrete ya no tira.
Mentira a medias.
La cinta se acaba cuando la mano
deja de inspeccionar lo que aún enrolla.

Hay un fin de línea en el metro —
último andén, puerta que abre y no sigue.
Hay otro en la cinta de la fábrica:
el confite sale de color,
cáscara intacta, núcleo escondido.

La cáscara es cinta.
El chocolate es vida.
Mientras la cinta sujeta,
la vida no se derrite en la mano.
Cuando la línea termina,
la cáscara entrega lo que guardaba.

No es sermón de muerte.
Es oficio de lo que queda:
contar lo que aún cabe en este rollo,
no fingir que la cinta es eterna,
no apretar la planta con la fita
como si el fin justificara el nudo.

Haz lo mejor
antes del último andén —
con la cinta cierta,
con la vida nombrada,
con el confite inspeccionado
y no solo comido.`;
}

function buildFimDaLinhaBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubNocivos = '/biblioteca/inspecoes/#inspecoes-derivados';
  const vidaTrilha = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-expressao-fim-da-linha.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const cinta = '/posts/post-inspecao-palavra-cinta.html';
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
  const cacau = '/plantas/cacau/';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const wiki = 'https://pt.wiktionary.org/wiki/linha';
  const wikiFita = 'https://pt.wiktionary.org/wiki/fita';
  const wikiVida = 'https://pt.wiktionary.org/wiki/vida';
  const wikiMms = 'https://en.wikipedia.org/wiki/M%26M%27s';
  const poema = poemFimDaLinhaPt();

  const body = `## Escopo

Inspeção editorial da locução **«[fim da linha](${self})»** — fim de percurso, de opções, de [fita](${cinta}), de [vida](${vida}) e de **esteira de fábrica**. O caso de laboratório é o **confeito de chocolate com casca colorida** (formato popular **M&M's**): a casca envolve como fita; o núcleo é o chocolate (a [vida](${vida}) que a casca protege até o último gesto). Série Expressões; elos [cinta / fita](${cinta}), palavra [vida](${vida}) / trilha [Vida](${vidaTrilha}), hub [chocolate industrial](${chocolate}); fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente BudGanja. Objecto = a **locução viva** e o **formato** do confeito (casca + núcleo), não a marca. **Sem afiliação com Mars / M&M's.** Ficha ≠ manual de fábrica, ≠ sermão de morte, ≠ aconselhamento médico. Indexar o formato ≠ endossar o snack.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **fim da linha** |
| Tipo | Locução / ditado de oralidade BR — termo · limite · esteira |
| Núcleo semântico | Fim de percurso · resto da [fita](${cinta}) · arco da [vida](${vida}) · último da linha |
| Caso de laboratório | Confeito casca colorida + chocolate (formato M&M's) |
| Tipo BudGanja | Expressão — limite × suporte × vivo |
| Elo fita | [cinta](${cinta}) · [gesto](${gesto}) · [risco](${risco}) · [sinal](${sinal}) |
| Elo vida | [vida](${vida}) · trilha [Vida](${vidaTrilha}) · [caminho](${caminho}) · [passar](${passar}) |
| Elo chocolate | [Chocolate industrial](${chocolate}) · [Cacau](${cacau}) |
| Elo ofício | [Faça o melhor!](${mantra}) · [verdade](${verdade}) · [língua portuguesa](${lingua}) |
| Fontes | [linha](${wiki}) · [fita](${wikiFita}) · [vida](${wikiVida}) · [M&M's (enciclopédia)](${wikiMms}) |
| Data | ${inspected} |

## Caso — formato M&M's (casca + núcleo)

O confeito de chocolate com **casca dura colorida** torna visível a tríade da ficha:

| Peça do confeito | Leitura laboratorial | Elo |
|------------------|----------------------|-----|
| **Casca / cobertura** | Envolve, protege, colore — **fita** que não é o núcleo | [cinta](${cinta}) · [sinal](${sinal}) |
| **Chocolate (núcleo)** | O que a casca guarda até o gesto da boca — **vida** do produto | [vida](${vida}) · [cacau](${cacau}) |
| **Esteira / linha** | Unidades iguais, cores diferentes, mesmo fim: sair da fábrica | *fim da linha* |
| **Slogan popular** | «Derrete na boca, não na mão» — a fita segura a vida até o último cais | [gesto](${gesto}) |
| **Matriz industrial** | Açúcar + cacau + corantes + (muitas vezes) leite | [chocolate industrial](${chocolate}) |

**H1:** a casca é **fita** — envolve sem ser o vivo.  
**H2:** o núcleo é **vida** — o que a fita protege; no lab, também a palavra e a trilha [Vida](${vidaTrilha}).  
**H3:** *fim da linha* nomeia o **último da esteira** e, por metáfora, o último da [fita](${cinta}) e o arco da [vida](${vida}) — sem fundir morte com ofício.

Cores da casca = [sinal](${sinal}), não essência. O vermelho e o amarelo não mudam o chocolate; mudam o olhar. No cultivo, a fita de cor marca a [planta](${planta}) — mesmo ofício: sinal ≠ estrangulamento.

## Fita × vida × linha

| Eixo | No mundo | No BudGanja |
|------|----------|-------------|
| **Fita cassete / filme** | O rolo acaba; o clique do fim | Inspecionar o **resto** — não só o corte |
| **Fita / cinta na planta** | Tutor, marca, adesivo | [Cinta](${cinta}): folga; [risco](${risco}) se o nó mata o caule |
| **Fita-casca do confeito** | Cobertura colorida | Protege o núcleo até o gesto; não é o alimento sozinho |
| **Vida (palavra)** | Facto, tempo, modo de viver | [vida](${vida}) — arco, não sermão |
| **Vida (trilha)** | Poemas, diário, ficar | [Vida](${vidaTrilha}) · [Diário](${diario}) |
| **Linha de transporte** | Última paragem | [caminho](${caminho}) que [passa](${passar}) e pára |
| **Linha de fábrica** | Último da esteira | Caso M&M's — unidade pronta, casca fechada |
| **Linha de texto / EOL** | Fim do verso, quebra de linha | Só vizinha técnica — **não** é o objecto desta ficha |

**Veredicto de eixos:** *fim da linha* não é só morte nem só fábrica. É o **limite inspeccionável** da fita que ainda enrola, da vida que ainda cabe, do confeito que ainda não abriu.

## O que a frase inspeciona

| Peça / tom | Leitura laboratorial | Bom × mau |
|------------|----------------------|-----------|
| **Fim** | Limite — não apagamento imediato | Bom: [verdade](${verdade}) do resto · Mau: fatalismo |
| **Linha** | Percurso, esteira, parentesco, verso | Bom: [caminho](${caminho}) · Mau: «acabou, ponto» |
| **Fita** | O que envolve e mede o restante | Bom: [gesto](${gesto}) · Mau: apertar até matar |
| **Vida** | O núcleo que a fita guarda | Bom: nomear e ficar · Mau: casca sem núcleo |
| **Confeito** | Formato visível da tríade | Bom: inspecionar a matriz · Mau: só a cor da casca |
| **Alegria da prateleira** | Marketing da cor e do crocante | Bom: [alegria](${alegria}) nomeada · Mau: esconder o [chocolate industrial](${chocolate}) |
| **Medo do fim** | «Acabou» como ameaça | Bom: [medo](${medo}) inspeccionado · Mau: parar o ofício |

**H4:** responder ao fim da linha **não** é rancor nem desistência — é [Faça o melhor!](${mantra}) **neste resto de fita**, hoje.

## Forma e variantes

| Forma | Nota |
|-------|------|
| **fim da linha** | Canónica — locução BR |
| «É o fim da linha» | Fecho de opções / de história |
| «Chegámos ao fim da linha» | Transporte · metáfora de esgotamento |
| *end of the line* | Vizinha EN (estação, opções, canção) |
| *fin de trayecto* / *fin de la línea* | Vizinhas ES |
| Formato M&M's / MeM's | Caso de laboratório — casca + chocolate; **não** o nome da ficha |

**Veredicto de forma:** a ficha ancora **fim da linha**; o confeito é **caso**, não título.

## Rede aparentada

| Ficha | Relação |
|-------|---------|
| [Cinta](${cinta}) | Fita / faixa que cinge — suporte com folga |
| [Vida](${vida}) · [Vida (trilha)](${vidaTrilha}) | Palavra e lugar do arco |
| [Chocolate industrial](${chocolate}) · [Cacau](${cacau}) | Matriz do confeito × planta |
| [Caminho](${caminho}) · [passar](${passar}) | Percurso até o último cais |
| [Gesto](${gesto}) · [risco](${risco}) · [sinal](${sinal}) | Aperto, anelamento, cor da casca / da fita |
| [Planta](${planta}) | Onde a fita tutora o vivo |
| [Faça o melhor!](${mantra}) | Ofício no resto da linha |
| [Língua portuguesa](${lingua}) | Solo da locução |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Expressões | [Expressões e Ditados](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Produtos nocivos | [Derivados](${hubNocivos}) · [Chocolate](${chocolate}) |
| Fita | [Cinta](${cinta}) |
| Vida | [palavra](${vida}) · [trilha](${vidaTrilha}) · [Diário](${diario}) |
| Mantra | [Faça o melhor!](${mantra}) |

## O poema

\`\`\`poem
${poema}
\`\`\`

## Limites

- Não é obituário, teologia nem protocolo clínico de fim de vida.  
- Não é catálogo Mars / M&M's nem publicidade de snack.  
- Não confundir *fim da linha* (locução) com só EOL de programação.  
- [Cinta](${cinta}) ≠ *sinta* (*sentir*) ≠ *cinta* (amor, indonésio).  
- A casca colorida **não** resgata o ultraprocessado — ver [chocolate industrial](${chocolate}).  
- O poema é **criação do laboratório**.

## Veredicto

**Aprovado na série Expressões e Ditados populares** — *fim da linha* fichada como locução de **limite inspeccionável**; caso de laboratório = confeito casca + chocolate (formato M&M's); elos [cinta / fita](${cinta}), [vida](${vida}), [chocolate](${chocolate}), [Faça o melhor!](${mantra}).

[▶ Expressões](${hub}) · [▶ Cinta](${cinta}) · [▶ Vida](${vida}) · [▶ Chocolate](${chocolate}) · [▶ Faça o melhor!](${mantra}) · [▶ trilha Vida](${vidaTrilha})
`;

  const contentEn = `## Scope

Editorial inspection of the Brazilian saying **“fim da linha”** (end of the line) — end of a route, of options, of [tape / cinta](${cinta}), of [life](${vida}), and of a **factory belt**. Lab case: **candy-coated chocolate** (popular **M&M's** format): the shell wraps like tape; the core is chocolate ([life](${vida}) the shell keeps until the last gesture). Links [cinta](${cinta}), [vida](${vida}) / trail [Vida](${vidaTrilha}), [industrial chocolate](${chocolate}); close [Do your best!](${mantra}).

> Independent BudGanja audit. Object = the **living phrase** and the **format** (shell + core), not the brand. **No affiliation with Mars / M&M's.** Not a factory manual, not a death sermon, not medical advice.

## Object

| Field | Value |
|-------|-------|
| Saying | **fim da linha** |
| Type | BR oral locution — terminus · limit · belt |
| Lab case | Colored shell + chocolate (M&M's format) |
| Links | [cinta](${cinta}) · [vida](${vida}) · [chocolate](${chocolate}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Reading

**H1:** the candy shell is **tape** — it wraps; it is not the core.  
**H2:** the chocolate is **life** — what the tape protects.  
**H3:** *fim da linha* names the last of the belt, the last of the reel, and the arc of life — without fusing death and craft.  
**H4:** the reply is [Do your best!](${mantra}) **on this remaining tape**, today.

## The poem

\`\`\`poem
${poemFimDaLinhaEn()}
\`\`\`

## Verdict

**Approved** — end-of-the-line saying; M&M's-format case (shell = tape, core = life); [cinta](${cinta}) · [vida](${vida}) · [chocolate](${chocolate}).

[▶ Expressions](${hub}) · [▶ Cinta](${cinta}) · [▶ Vida](${vida}) · [▶ Chocolate](${chocolate}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la locución brasileña **«fim da linha»** (fin de la línea) — fin de trayecto, de opciones, de [cinta / fita](${cinta}), de [vida](${vida}) y de **cinta de fábrica**. Caso de laboratorio: **confite de chocolate con cáscara de color** (formato popular **M&M's**): la cáscara envuelve como cinta; el núcleo es el chocolate (la [vida](${vida}) que la cáscara guarda hasta el último gesto). Vínculos [cinta](${cinta}), [vida](${vida}) / senda [Vida](${vidaTrilha}), [chocolate industrial](${chocolate}); cierre [¡Haz lo mejor!](${mantra}).

> Auditoría independiente. Objeto = la **frase viva** y el **formato** (cáscara + núcleo), no la marca. **Sin afiliación con Mars / M&M's.** No es manual de fábrica ni sermón de muerte.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **fim da linha** |
| Tipo | Locución oral BR — término · límite · cinta |
| Caso lab | Cáscara de color + chocolate (formato M&M's) |
| Vínculos | [cinta](${cinta}) · [vida](${vida}) · [chocolate](${chocolate}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Lectura

**H1:** la cáscara es **cinta** — envuelve; no es el núcleo.  
**H2:** el chocolate es **vida** — lo que la cinta protege.  
**H3:** *fim da linha* nombra el último de la cinta, el último del rollo y el arco de la vida — sin fundir muerte y oficio.  
**H4:** la respuesta es [¡Haz lo mejor!](${mantra}) **en este resto de cinta**, hoy.

## El poema

\`\`\`poem
${poemFimDaLinhaEs()}
\`\`\`

## Veredicto

**Aprobada** — locución de fin de línea; caso formato M&M's (cáscara = cinta, núcleo = vida); [cinta](${cinta}) · [vida](${vida}) · [chocolate](${chocolate}).

[▶ Expresiones](${hub}) · [▶ Cinta](${cinta}) · [▶ Vida](${vida}) · [▶ Chocolate](${chocolate}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildFimDaLinhaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildFimDaLinhaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 14;
  return expressaoPost({
    title:
      'Inspeção: fim da linha — fita, vida e o confeito de chocolate',
    titleEn:
      'Inspection: end of the line — tape, life and candy-coated chocolate',
    titleEs:
      'Inspección: fin de la línea — cinta, vida y el confite de chocolate',
    excerpt:
      'Expressões: «fim da linha» — limite da fita, da vida e da esteira; caso de laboratório = confeito casca colorida + chocolate (formato M&M\'s); elos cinta, vida, chocolate industrial.',
    excerptEn:
      'Sayings: “fim da linha” — limit of the tape, of life and of the belt; lab case = colored shell + chocolate (M&M\'s format); links cinta, vida, industrial chocolate.',
    excerptEs:
      'Dichos: «fim da linha» — límite de la cinta, de la vida y de la línea; caso lab = cáscara de color + chocolate (formato M&M\'s); vínculos cinta, vida, chocolate industrial.',
    slug: 'inspecao-expressao-fim-da-linha',
    date: '2026-08-19T23:50:00.000Z',
    seriesOrder: order,
    seriesLabel: 'fim da linha · expressão',
    coverImage: '/imagens/inspecoes/fim-da-linha-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFimDaLinhaPost,
  buildFimDaLinhaBodies,
  poemFimDaLinhaPt,
  poemFimDaLinhaEn,
  poemFimDaLinhaEs
};
