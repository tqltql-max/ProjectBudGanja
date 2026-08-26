'use strict';

/**
 * Inspeção Palavras · variação
 * Pedido: VRAIÇÃO É NOIS VAIRAÇÃO VALEU!!! · VARIAÇAO LEGAL!!!
 *
 * Lat. variātiō ← variāre ← varius. Bocas de campo = a palavra a variar-se.
 * É nois = é nós (gíria de grupo). Legal !!! = gíria bacana, ≠ lei.
 * ≠ vibração ≠ oração ≠ «variação legal» jurídica · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/variacao-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/varia%C3%A7%C3%A3o';
const WIKT_EN = 'https://en.wiktionary.org/wiki/variation';
const WIKT_LA = 'https://en.wiktionary.org/wiki/variatio#Latin';
const WIKT_VARIUS = 'https://en.wiktionary.org/wiki/varius#Latin';
const WIKT_NOS = 'https://pt.wiktionary.org/wiki/n%C3%B3s';
const WIKT_NOIS = 'https://pt.wiktionary.org/wiki/n%C3%B3is';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts.filter((p) => p.series === 'palavras-origem').map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Variação.
Não é erro.
É a língua a viver.

VRAIÇÃO.
VAIRAÇÃO.
VARIAÇAO.
Três bocas.
A mesma peça.

É nois:
nós, na rua,
a variar juntos.

Legal !!!
é bacana — não é a lei.
Valeu !!!
é o fecho.

A variação é nois.
Inspecionar
não é engessar.`;
}

function poemEn() {
  return `Variação.
Not a mistake.
It is the language living.

VRAIÇÃO.
VAIRAÇÃO.
VARIAÇAO.
Three mouths.
The same piece.

É nois:
we, in the street,
varying together.

Legal !!!
is “cool” — not the statute.
Valeu !!!
is the close.

The variation is us.
To inspect
is not to freeze.`;
}

function poemEs() {
  return `Variação.
No es error.
Es la lengua viviendo.

VRAIÇÃO.
VAIRAÇÃO.
VARIAÇAO.
Tres bocas.
La misma pieza.

É nois:
nosotros, en la calle,
variando juntos.

Legal !!!
es bacán — no es la ley.
¡Valeu !!!
es el cierre.

La variación somos nois.
Inspeccionar
no es engessar.`;
}

function buildVariacaoBodies() {
  const inspected = '2026-08-25';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-variacao.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const boa = '/posts/post-inspecao-palavra-boa.html';
  const cool = '/posts/post-inspecao-palavra-cool-gelado.html';
  const giria = '/posts/post-inspecao-palavra-giria.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const conjugacao = '/posts/post-inspecao-palavra-conjugacao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const polimorfismo = '/posts/post-inspecao-palavra-polimorfismo.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const enter = '/posts/post-inspecao-palavra-enter.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const guia = '/guia/palavras.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[variação](${self})**. Pedido de campo: *VRAIÇÃO É NOIS VAIRAÇÃO VALEU!!!* · *VARIAÇAO LEGAL!!!*.

*Variação* é o nome do **mudar de forma sem deixar de ser a peça**. Do latim *variātiō* ← *variāre* ← *varius* («diverso, mosqueado»). As bocas *VRAIÇÃO*, *VAIRAÇÃO* e *VARIAÇAO* **são** a variação a acontecer na escrita. *É nois* é a [gíria](${giria}) de grupo (*é nós*). *[Legal !!!](${legal})* neste pedido é o calor BR «bacana», **não** o polo jurídico da mesma ficha.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · variação](${WIKT}), EN [*variation*](${WIKT_EN}), lat. [*variātiō*](${WIKT_LA}) / [*varius*](${WIKT_VARIUS}), [*nós*](${WIKT_NOS}), [*nóis*](${WIKT_NOIS}). Método: [etimologia](${etimologia}) · [étimo](${etimo}) · [latim](${latim}). **Ficha ≠ manual de estatística, ≠ protocolo de genética, ≠ parecer de «variação legal» jurídica.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${valeu}).

**Gatilho:** *VRAIÇÃO* / *VAIRAÇÃO* / *VARIAÇAO* / *variação* / *é nois* / *é nós* / *Legal !!!* / *Valeu !!!*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **variação** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Lat. *variātiō* ← *variāre* ← *varius* — confiança: **alta** |
| Bocas de campo | **VRAIÇÃO** · **VAIRAÇÃO** · **VARIAÇAO** |
| Par de grupo | **é nois** (*é nós* — [gíria](${giria}) de pertença) |
| Par de calor | **[Legal !!!](${legal})** — eixo gíria «bacana», ≠ lei |
| Fecho | **[Valeu !!!](${valeu})** · [Boa!!!](${boa}) (variação quente do fecho) |
| Tipo BudGanja | Palavra — mudar de forma × fala viva × ofício |
| Não é | Vibração · oração · [polimorfismo](${polimorfismo}) só-biologia · «variação legal» de diploma |
| Data | ${inspected} |
| Fonte | [variação](${WIKT}) · [*varius*](${WIKT_VARIUS}) |

**O que é o objecto:** o vocábulo que nomeia a **diferença dentro da mesma peça**. No laboratório, as grafias do pedido **demonstram** o étimo: a boca desloca letras e a palavra continua *variação*.

## 2. Latim — *varius* / *variāre*

| Peça | Traçado | Ofício |
|------|---------|--------|
| **varius** | Diverso, mosqueado, inconstante | A qualidade de não ser uma só cor |
| **variāre** | Fazer diverso | O [gesto](${gesto}) de mudar a forma |
| **variātiō** | O acto / o resultado | A âncora PT *variação* |
| EN **variation** | Mesmo sangue | Tema e variações (música, língua, biologia) |
| PT **variável** | Irmã | O que *pode* mudar — não é esta ficha |

**H-peça:** variação **não** é erro até o ofício o declarar. É a língua a [viver](${vidaHub}) — com [verdade](${verdade}) quando se ancora a forma escrita.

## 3. Quatro salas — a mesma peça

| Sala | Leitura | Exemplo | O que estudar |
|------|---------|---------|----------------|
| **A. Léxico** | *variātiō* — mudar de forma | música, língua, número | Secção 4 |
| **B. Bocas** | VRAIÇÃO × VAIRAÇÃO × VARIAÇAO | o pedido de campo | Secção 5 |
| **C. É nois** | *é nós* — o grupo que varia | TMJ, rua, lab | Secção 6 |
| **D. Legal !!!** | Calor «bacana» + [Valeu !!!](${valeu}) | *VARIAÇAO LEGAL!!!* | Secção 7 |

## 4. Sala A — o que a palavra cobre

| Camada | Leitura | Corte |
|--------|---------|-------|
| **Língua** | Mudança de forma / registo | Esta ficha-mãe |
| **Música** | Tema e variações | Metáfora útil; não é partitura |
| **Biologia** | Diversidade intraespecífica | Mandar o detalhe para [polimorfismo](${polimorfismo}) |
| **Número / estatística** | Dispersão | Outra sala — não abrir aqui |
| **Ofício lab** | [Boa!!!](${boa}) ao lado de [Valeu !!!](${valeu}); [cruzar](${relacao}) como variação de [relação](${relacao}) | Nomear a variação **sem** fundir as raízes |

## 5. Sala B — as bocas *são* a variação

| Boca | O que a mão fez | Leitura lab |
|------|-----------------|-------------|
| **variação** | Âncora (ç + ã) | Forma escrita do ofício |
| **VARIAÇAO** | Cai o til | Calor de teclado; a peça reconhece-se |
| **VRAIÇÃO** | O **R** salta para a frente | A orelha ainda cola |
| **VAIRAÇÃO** | O **I** troca de sítio | Outra permuta; mesma raiz |

A [orelha cola](${orelhaCola}) as três no mesmo lema. O étimo explica a cola: *varius* = mosqueado. **Inspecionar a variação não é corrigir a boca até ela morrer.** É ancorar *variação* e deixar o gatilho no glossário.

**Anti-armadilha:** *VRAIÇÃO* ≠ **vibração** (outra raiz: *vibrāre*). *VAIRAÇÃO* ≠ **oração**. A cola de ouvido corta-se aqui.

## 6. Sala C — é nois

*É nois* = *é nós*: pertença de grupo na [gíria](${giria}) BR. A gramática normativa prefere *nós*; a rua diz *nois*. Nesta ficha as duas bocas **não** se cancelam: *nós* ancora; *nois* vive.

| Forma | Ofício |
|-------|--------|
| **é nós** | Norma — o pronome |
| **é nois** | Rua — «somos nós», TMJ, o grupo |
| **variação é nois** | Tese do pedido: **quem fala é a variação** — a língua não é só o dicionário |

**H-grupo:** inspecionar *variação* **com** *é nois* = recusar o desprezo da fala viva. [Respeito](${respeito}) à boca; âncora na escrita.

## 7. Sala D — VARIAÇAO LEGAL !!!

Pedido: *VARIAÇAO LEGAL!!!*. Duas leituras, um corte.

| Leitura | Eixo | Ofício nesta ficha |
|---------|------|---------------------|
| **Legal !!!** gíria | [Legal](${legal}) «bacana» | **Esta** — o calor do pedido |
| **variação legal** jurídica | Polo *legālis* da mesma palavra [legal](${legal}) | **Não** — não é parecer nem «variante lícita» de diploma |
| **Valeu !!!** | Fecho *valēre* | Anda ao lado; [Boa!!!](${boa}) é variação quente do fecho |
| **Cool Gelado** | Derivação da gíria Legal | Não traduzir *Legal !!!* por gelo — [Cool Gelado](${cool}) |

**Veredicto:** *VARIAÇAO LEGAL!!!* neste campo = **variação bacana**, com [Valeu !!!](${valeu}). O polo jurídico de [legal](${legal}) fica na ficha-irmã, sem se fundir.

## 8. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **VRAIÇÃO** | Erro | Gatilho — a variação *na* palavra |
| **É nois** | «Português errado» | [Gíria](${giria}) de grupo; irmã de *é nós* |
| **Legal !!!** | Lei | Eixo bacana da ficha [legal](${legal}) |
| **Variação** | Só estatística / genética | Nome do mudar de forma — várias salas |
| **Corrigir** | Ofício | Ofício = ancorar; não engessar a rua |

## 9. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Ancorar **variação**; indexar as bocas *VRAIÇÃO* / *VAIRAÇÃO* / *VARIAÇAO* |
| Bom | Dizer **é nois** com [respeito](${respeito}) à fala de grupo |
| Bom | Ler *LEGAL!!!* como [Legal](${legal}) gíria; [Valeu !!!](${valeu}) no fecho |
| Mau | Tratar toda a variação como erro |
| Mau | Fundir *Legal !!!* bacana com «conforme a lei» |
| Mau | Colar *variação* em *vibração* ou *oração* |

## 10. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=variacao)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Legal](${legal}) · [Cool Gelado](${cool}) | Calor «bacana» × não misturar com lei / gelo |
| [Valeu !!!](${valeu}) · [Boa!!!](${boa}) | Fecho e a sua variação quente |
| [Gíria](${giria}) · [língua portuguesa](${lingua}) | Fala de grupo; solo da boca |
| [Relação](${relacao}) | *Cruzar* = variação verbal do entre |
| [Polimorfismo](${polimorfismo}) | Sala biológica — não fundir |
| [Conjugação](${conjugacao}) | *Nós* na gramática; *nois* na rua |
| [Enter](${enter}) · [genial](${genial}) | Limiar recente; elogio do feito |
| [Orelha cola](${orelhaCola}) · [étimo](${etimo}) · [latim](${latim}) | Método |
| [Guia](${guia}) · [Vida](${vidaHub}) | Índice e poema |
| [Faça o seu melhor](${faca}) · [eu amo a vida](${amo}) | Fecho |

## Hipóteses (síntese)

**H1:** *variação* < lat. *variātiō* / *varius* (alta).  
**H2:** *VRAIÇÃO* / *VAIRAÇÃO* / *VARIAÇAO* = gatilhos da **mesma** peça — a variação encenada.  
**H3:** *é nois* = *é nós* em [gíria](${giria}); tese: a variação **é** o grupo que fala.  
**H4:** *VARIAÇAO LEGAL!!!* = eixo [Legal](${legal}) «bacana», ≠ polo jurídico.  
**H5:** fecho = [Valeu !!!](${valeu}) · [Boa!!!](${boa}).

## Limites

- Não inventaria todas as variações linguísticas do PB.  
- Não é aula de genética nem de estatística.  
- Não é parecer sobre «variante legal» de norma.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **variação** fichada: *varius*; bocas *VRAIÇÃO* / *VAIRAÇÃO* / *VARIAÇAO*; par **é nois**; calor **[Legal !!!](${legal})**; fecho [Valeu !!!](${valeu}). [Faça o seu melhor](${faca}).

[▶ Palavras](${hub}) · [▶ Legal](${legal}) · [▶ Valeu !!!](${valeu}) · [▶ Gíria](${giria}) · [▶ Boa!!!](${boa}) · [▶ Poema Vida](/vida/#poema=variacao)
`;

  const contentEn = `## Scope

Inspection of Portuguese **variação** — Lat. *variātiō* ← *varius*. Field: *VRAIÇÃO É NOIS VAIRAÇÃO VALEU!!!* · *VARIAÇAO LEGAL!!!*.

The field spellings **are** the variation happening on the page. *É nois* is street *é nós* (it’s us). *[Legal !!!](${legal})* here is BR “cool”, **not** the juridical pole of [legal](${legal}). Close: [Valeu !!!](${valeu}).

## Four rooms

| Room | Reading |
|------|---------|
| **A. Lexicon** | Changing form without leaving the piece |
| **B. Mouths** | VRAIÇÃO × VAIRAÇÃO × VARIAÇAO — same lemma |
| **C. É nois** | The group that speaks — variation *is* us |
| **D. Legal !!!** | Slang warmth; not “lawful variant” |

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *varius*; field mouths; *é nois*; [Legal !!!](${legal}) slang; [Valeu !!!](${valeu}).
`;

  const contentEs = `## Alcance

Inspección de **variação** — lat. *variātiō* ← *varius*. Pedido: *VRAIÇÃO É NOIS VAIRAÇÃO VALEU!!!* · *VARIAÇAO LEGAL!!!*.

Las grafías de campo **son** la variación en la página. *É nois* es *é nós* de calle. *[Legal !!!](${legal})* aquí es «bacán» BR, **no** el polo jurídico. Cierre: [¡Valeu !!!](${valeu}).

## Cuatro salas

| Sala | Lectura |
|------|---------|
| **A. Léxico** | Cambiar de forma sin dejar la pieza |
| **B. Bocas** | VRAIÇÃO × VAIRAÇÃO × VARIAÇAO — el mismo lema |
| **C. É nois** | El grupo que habla — la variación *somos* nois |
| **D. Legal !!!** | Calor de jerga; no «variante lícita» |

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *varius*; bocas de campo; *é nois*; [Legal !!!](${legal}) jerga; [¡Valeu !!!](${valeu}).
`;

  return { body, contentEn, contentEs };
}

function buildVariacaoPost() {
  const { body, contentEn, contentEs } = buildVariacaoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-variacao', 347);
  return makePalavra({
    title: 'Inspeção: Variação — varius; é nois; Legal !!!',
    titleEn: 'Inspection: Variação — varius; é nois; Legal !!!',
    titleEs: 'Inspección: Variação — varius; é nois; Legal !!!',
    excerpt:
      'Palavras: variação ← lat. varius — VRAIÇÃO × VAIRAÇÃO × VARIAÇAO; é nois; Legal !!! (bacana, ≠ lei); Valeu !!!',
    excerptEn:
      'Words: variação ← Lat. varius — VRAIÇÃO × VAIRAÇÃO × VARIAÇAO; é nois; Legal !!! (cool, ≠ law); Valeu !!!',
    excerptEs:
      'Palabras: variação ← lat. varius — VRAIÇÃO × VAIRAÇÃO × VARIAÇAO; é nois; Legal !!! (bacán, ≠ ley); ¡Valeu !!!',
    slug: 'inspecao-palavra-variacao',
    date: '2026-08-25T12:35:00.000Z',
    seriesOrder,
    seriesLabel: 'Variação · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildVariacaoPost,
  buildVariacaoBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKT_LA,
  WIKT_VARIUS,
  WIKT_NOS
};
