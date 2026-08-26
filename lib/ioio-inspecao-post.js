'use strict';

/**
 * Inspeção Palavras · ioiô
 * Brinquedo (yo-yo). Pedidos: IoIo · peão brinquedos · palavbra Loló → ioiô.
 * Corta: loló (homónimo) × peão-trabalhador × LOL × I/O.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/ioio-palavra-cover.jpg';
const WIKT_IOIO = 'https://pt.wiktionary.org/wiki/ioi%C3%B4';
const WIKI_IOIO = 'https://pt.wikipedia.org/wiki/Ioi%C3%B4';
const WIKT_PIAO = 'https://pt.wiktionary.org/wiki/pi%C3%A3o';
const WIKT_PEAO = 'https://pt.wiktionary.org/wiki/pe%C3%A3o';
const WIKI_PIAO = 'https://pt.wikipedia.org/wiki/Pi%C3%A3o_(brinquedo)';
const CIBER = 'https://ciberduvidas.iscte-iul.pt/consultorio/perguntas/a-introducao-da-palavra-ioioioio-no-portugues/34242';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start) + (orders.length ? 1 : 0);
    if (!orders.length) seriesOrder = start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Chegou IoIo.
Chegou Loló.
O lábio trocou o disco pelo cheiro.
A correção chegou a tempo:
ioiô.

Sobe e desce no fio.
Não é o LOL da tela.
Não é a lua Io.
Não é o I/O da máquina.

Ao lado, o peão.
Gira na ponta.
Não é o peão da fazenda.
Não é o peão do xadrez.
Em Portugal chama-se pião.

Dois brinquedos.
Uma infância.
Um lapso.

Valeu !!!
neste fio,
sem colar o homónimo.`;
}

function poemEn() {
  return `IoIo arrived.
Loló arrived.
The lip swapped the disc for another word.
The correction came in time:
ioiô.

It goes up and down the string.
Not LOL on a screen.
Not the moon Io.
Not machine I/O.

Beside it, the spinning top.
It turns on a point.
Not the ranch hand.
Not the chess pawn.
In Portugal it is pião.

Two toys.
One childhood.
One slip.

Valeu !!!
on this string,
without gluing the homonym.`;
}

function poemEs() {
  return `Llegó IoIo.
Llegó Loló.
El labio cambió el disco por otra palabra.
La corrección llegó a tiempo:
ioiô.

Sube y baja en el hilo.
No es el LOL de la pantalla.
No es la luna Io.
No es el I/O de la máquina.

Al lado, el peón-trompo.
Gira en la punta.
No es el peón del campo.
No es el peón del ajedrez.
En Portugal se llama pião.

Dos juguetes.
Una infancia.
Un lapsus.

Valeu !!!
en este hilo,
sin pegar el homónimo.`;
}

function buildIoioBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-ioio.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const giria = '/posts/post-inspecao-palavra-giria.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const mao = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const emPe = '/posts/post-inspecao-expressao-em-pe.html';
  const pipa = '/posts/post-inspecao-palavra-cola-colar.html';
  const origami = '/origami/barquinho-de-papel/';
  const mindinho = '/posts/post-inspecao-expressao-mindinho.html';
  const patinete = '/posts/post-inspecao-patinete-eletrico-criancas.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const ilegal = '/posts/post-inspecao-palavra-ilegal.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';

  const body = `## Escopo

Inspeção da palavra **[ioiô](${self})** — o **brinquedo** de dois discos e um fio. Pedidos de campo: *objeto IoIo* · *peão brinquedos* · *inspeçao da palavbra Loló*. A boca escreveu **loló**. A correção chegou: **alterar loló para ioiô**. [A orelha cola](${orelhaCola}) as duas. O étimo **corta**. Esta ficha é o **disco no fio**. O peão entra como irmão de quintal. *Loló* fica como **lapso e homónimo** — outra sala, sem modo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · ioiô](${WIKT_IOIO}), [Wikipédia · Ioiô](${WIKI_IOIO}), [Ciberdúvidas · ioiô/ioió](${CIBER}), [pião](${WIKT_PIAO}), [peão](${WIKT_PEAO}), [Pião (brinquedo)](${WIKI_PIAO}). **Ficha ≠ catálogo INMETRO, ≠ manual de truques, ≠ receita de homónimo, ≠ dicionário de inalantes.** Nomear o homónimo ≠ ensinar. Tom: [respeito](${respeito}) da infância; [verdade](${verdade}) do nome.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **ioiô** (PT-BR) |
| Formas vivas | *ioió* (também registada) · *io-iô* (histórica) · campo *IoIo* |
| Classe | Substantivo masculino — brinquedo |
| Étimo (trabalho) | Ing. *yo-yo* (moda 1932–33) → PT *ioiô* / *ioió* — confiança **alta** na via; origem última do ing. discutida ( marca / fala filipina *yóyo* «volta») — **média** |
| Tipo BudGanja | Palavra — objecto de infância × par peão/pião × lapso *loló* |
| Não é | **loló** (outra [gíria](${giria})) · **LOL** · lua **Io** · **I/O** · *dieta ioiô* (metáfora) · peão da fazenda |
| Elo lab | [objectos](${objetos}) · [gesto](${gesto}) · [mão](${mao}) · [pipa](${pipa}) · [em pé](${emPe}) |
| Fonte | [ioiô](${WIKT_IOIO}) · [Ciberdúvidas](${CIBER}) |
| Data | ${inspected} |

**Objecto:** o **disco duplo** que sobe e desce no cordel, na palma. Machado (cit. Ciberdúvidas) já o descrevia como distracção de **1932–33**. Houaiss: dicionarizado no BR pelo menos em **1942**.

## 2. Lapsus do sopro — loló × ioiô

| Pedido | O que a orelha / o olho cola | O que **é** nesta ficha |
|--------|-----------------------------|-------------------------|
| *IoIo* | o brinquedo | **ioiô** — *yo-yo* |
| *Loló* / *palavbra Loló* | quase o mesmo bloco de letras | **Lapso** de ioiô **e** homónimo de outra [gíria](${giria}) BR |
| *peão brinquedos* | o trompo | **peão** / **pião** — gira na ponta; ≠ trabalhador |
| *objeto* | a coisa | [objectos](${objetos}) — meta-lab; aqui o alvo é o ioiô |

**H1:** *ioiô* < *yo-yo* — alta confiança na via inglesa dos anos 1930.  
**H2:** *loló* e *ioiô* colam no **som** (*o-ó*). Não partilham ofício.  
**H3:** a correção de campo (*alterar loló para ioiô*) **é** o veredicto: a ficha ancora no brinquedo.

### Homónimo *loló* — sala fechada

*Loló* (também *cheirinho da loló*) nomeia, noutro mapa BR, uma [gíria](${giria}) da família do **lança-perfume** — objecto de [proibição](${proibicao}) / [ilegal](${ilegal}), não de quintal. O laboratório **corta** aqui:

- esta ficha **não** é a inspeção dessa gíria;
- **não** lista misturas, **não** descreve modo, **não** ensina a fazer nem a usar;
- o [risco](${risco}) dessa sala é real; o ofício dela, se um dia for pedido com nome próprio, fica noutra ficha de literacia — ainda assim sem receita.

**Veredicto:** guardar o gatilho *loló* → *ioiô*. Não promover a grafia do homónimo. Não colar o brinquedo no inalante.

## 3. Outras colas (não misturar)

| Forma | Ofício | Corte |
|-------|--------|-------|
| **ioiô** (brinquedo) | Disco + fio + [mão](${mao}) | Esta âncora |
| **ioiô** (histórico BR) | Alteração de *senhor* / *sinhô* — tratamento antigo | Homónimo de arquivo; **≠** o disco |
| **dieta ioiô** | Sobe e desce (figurado) | Metáfora do movimento; **≠** o objecto |
| **LOL** | Riso em inglês da rede | Outro alfabeto |
| **Io** | Lua de Júpiter | Topónimo de céu |
| **I/O** | Entrada/saída de máquina | Sigla; o campo *IoIo* não é isto |

## 4. Peão / pião — o irmão que gira

O campo pediu **peão brinquedos** no mesmo sopro. No Brasil, **peão** nomeia o trompo. O [Wikcionário · pião](${WIKT_PIAO}) avisa: **não confundir com peão**. Em PT-PT o brinquedo é **pião**; *peão* fica para o trabalhador / o peão de xadrez.

| Sala | Leitura | Não é |
|------|---------|-------|
| **pião** / **peão** (brinquedo) | Corpo afunilado + ponta; corda; gira [em pé](${emPe}) no chão | ≠ fazenda · ≠ xadrez · ≠ rodeio |
| **peão** (ofício) | Trabalhador rural / de obra | Outro *pedo, -ōnis* (lat. «a pé») |
| **peão** (xadrez) | Peça | Jogo de tabuleiro |
| Elo | [gesto](${gesto}) de enrolar e soltar | **≠** [patinete](${patinete}) (locomoção, não este brinquedo) |

**H4:** ioiô sobe-desce no **fio**; peão gira na **ponta**. Dois [objectos](${objetos}), mesma infância, dois étimos.  
**H5:** *peão* brinquedo e *peão* trabalhador são prima de **som** no BR — o lab corta pelo uso: *brinquedos*.

## 5. Infância já fichada

| Elo | Papel | Não é |
|-----|-------|-------|
| [Pipa](${pipa}) | Brinquedo aéreo; o perigo é a linha, não o papel | ≠ ioiô |
| [Barquinho de papel](${origami}) | Dobra na palma | ≠ disco |
| [Mindinho](${mindinho}) | Parlenda da mão | ≠ fio |
| [Patinete](${patinete}) | Locomoção; o eléctrico não é «brinquedo com motor» | ≠ trompo |
| [Em pé](${emPe}) | Postura — o peão *fica* em pé enquanto gira | ≠ o brinquedo inteiro |

**Ficha ≠ norma INMETRO, ≠ truque de palco, ≠ anúncio de marca.** Cordel no dedo e ponta no chão pedem [risco](${risco}) nomeado — sem manual de acidente.

## 6. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| Nomear o brinquedo | Disco no fio | Uma sala: *yo-yo* → *ioiô* |
| Corrigir o sopro | *Loló* → *ioiô* | Guardar o gatilho; fechar o homónimo |
| Nomear o irmão | Peão / pião | Gira; ≠ trabalhador |
| Não fundir | LOL, Io, I/O, dieta | Quatro colas, zero âncoras |

## Poema Vida

\`\`\`poem
${poemPt()}
\`\`\`

## 7. Valeu !!!

O melhor **hoje** é o mapa com o disco no sítio: **ioiô**. *Loló* foi lapso. O **peão** gira ao lado, sem vestir a fazenda. [Valeu !!!](${mantra}) · [eu amo a vida](${vida}) — infância inspecionada; homónimo não ensinado.

## 8. Estado

**Aprovada** — ioiô fichado como brinquedo; *loló* cortado (lapso + homónimo sem modo); peão/pião cortado do trabalhador.

[▶ Palavras](${hub}) · [▶ Orelha cola](${orelhaCola}) · [▶ Objectos](${objetos}) · [▶ Gíria](${giria}) · [▶ Pipa](${pipa}) · [▶ Em pé](${emPe}) · [▶ Valeu !!!](${mantra}) · [▶ Guia](${guia}) · [▶ Hub](${hubAll}) · [▶ Língua](${lingua}) · [▶ Legal](${legal})
`;

  const contentEn = `## Scope

Inspection of Portuguese **[ioiô](${self})** — the **yo-yo**. Field slips: *IoIo* · *peão brinquedos* · *Loló* (corrected to *ioiô*).

[The ear glues](${orelhaCola}) *loló* to *ioiô*. The etymon **cuts**. This sheet is the toy. The spinning top is the sibling. *Loló* as another slang room is **named only to close** — no method.

> **Not an INMETRO catalogue. Not a trick manual. Not an inhalant dictionary.**

## Object

| Field | Value |
|-------|-------|
| Anchor | **ioiô** ← Eng. *yo-yo* (1932–33 fashion) — **high** confidence on the path |
| Slip | *Loló* → **ioiô**; homonym of another BR slang — other room, no how-to |
| Top | **peão** / **pião** — spins on a point; ≠ ranch hand ≠ chess pawn |
| Lab | [objects](${objetos}) · [gesture](${gesto}) · [kite](${pipa}) |
| Date | ${inspected} |

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** the disc on the string. [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Ear glue](${orelhaCola}) · [▶ Objects](${objetos}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[ioiô](${self})** — el **yoyó**. Lapsus: *IoIo* · *peão brinquedos* · *Loló* (corregido a *ioiô*).

[La oreja pega](${orelhaCola}) *loló* a *ioiô*. El étimo **corta**. Esta ficha es el juguete. El trompo es el hermano. *Loló* como otra jerga se **nombra solo para cerrar** — sin modo.

> **No es catálogo INMETRO, ni manual de trucos, ni diccionario de inhalantes.**

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **ioiô** ← ing. *yo-yo* (moda 1932–33) — confianza **alta** en la vía |
| Lapsus | *Loló* → **ioiô**; homónimo de otra jerga BR — otra sala, sin modo |
| Trompo | **peão** / **pião** — gira en la punta; ≠ peón del campo ≠ peón de ajedrez |
| Lab | [objetos](${objetos}) · [gesto](${gesto}) · [cometa](${pipa}) |
| Fecha | ${inspected} |

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** el disco en el hilo. [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Oreja pega](${orelhaCola}) · [▶ Objetos](${objetos}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT_IOIO };
}

function buildIoioPost() {
  const { body, contentEn, contentEs, wiki } = buildIoioBodies();
  const seriesOrder = pickOrder('inspecao-palavra-ioio', 263);
  return makePalavra({
    title: 'Inspeção: ioiô — o brinquedo, o lapso loló e o peão',
    titleEn: 'Inspection: ioiô — the yo-yo, the loló slip, and the spinning top',
    titleEs: 'Inspección: ioiô — el yoyó, el lapsus loló y el trompo',
    excerpt:
      'Palavras: ioiô (yo-yo) — brinquedo ≠ loló ≠ LOL; peão/pião ≠ fazenda; Valeu !!!',
    excerptEn:
      'Words: ioiô (yo-yo) — toy ≠ loló ≠ LOL; peão/pião ≠ ranch; Valeu !!!',
    excerptEs:
      'Palabras: ioiô (yoyó) — juguete ≠ loló ≠ LOL; peão/pião ≠ campo; ¡Valeu !!!',
    slug: 'inspecao-palavra-ioio',
    date: '2026-08-23T13:00:00.000Z',
    seriesOrder,
    seriesLabel: 'ioiô · brinquedo',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildIoioPost, buildIoioBodies, poemPt, poemEn, poemEs };
