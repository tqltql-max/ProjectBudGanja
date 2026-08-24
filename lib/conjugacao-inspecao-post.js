'use strict';

/**
 * Inspeção Palavras · conjugação
 * As 3 pessoas (elos) · como ligar · elos e elas · plurais nós / vós / eles
 * Sala partilhada com latim · estudar português pelo projecto · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/conjugacao-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/conjuga%C3%A7%C3%A3o';
const WIKI_CONJUGAR = 'https://pt.wiktionary.org/wiki/conjugar';
const WIKI_PESSOA = 'https://pt.wiktionary.org/wiki/pessoa';
const WIKI_PRONOME = 'https://pt.wiktionary.org/wiki/pronome';
const WIKI_NOS = 'https://pt.wiktionary.org/wiki/n%C3%B3s';
const WIKI_VOS = 'https://pt.wiktionary.org/wiki/v%C3%B3s';
const WIKI_ELES = 'https://pt.wiktionary.org/wiki/eles';
const WIKI_ELAS = 'https://pt.wiktionary.org/wiki/elas';
const WIKI_LAT_CONIUGATIO = 'https://en.wiktionary.org/wiki/coniugatio#Latin';
const WIKI_LAT_CONIUGARE = 'https://en.wiktionary.org/wiki/coniugo#Latin';
const WIKI_LAT_NOS = 'https://en.wiktionary.org/wiki/nos#Latin';
const WIKI_LAT_VOS = 'https://en.wiktionary.org/wiki/vos#Latin';
const WIKI_GRAM = 'https://pt.wikipedia.org/wiki/Conjuga%C3%A7%C3%A3o';
const WIKI_PESSOA_GRAM = 'https://pt.wikipedia.org/wiki/Pessoa_%28gram%C3%A1tica%29';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemConjugacaoPt() {
  return `Três elos.
Quem fala.
Com quem se fala.
De quem se fala.

Branco olha o eu.
Amarelo cuida o tu.
Vermelho alerta o ele.

O plural não inventa pessoa —
abre o mesmo elo.
Eu vira nós.
Tu vira vós.
Ele e ela viram eles e elas.

A orelha cola elos em eles.
O étimo corta:
elos são anéis;
eles e elas são a terceira.

Conjugar é jungir.
Ligar as pessoas
sem fundir as cores.

Valeu !!!
estudamos português
pelo projecto.`;
}

function poemConjugacaoEn() {
  return `Three links.
Who speaks.
Who is spoken to.
Who is spoken of.

White looks at I.
Yellow cares for you.
Red alerts the third.

The plural does not invent a person —
it opens the same link.
I becomes we.
You becomes you-plural.
He and she become they.

The ear glues elos to eles.
The etymon cuts:
elos are rings;
eles and elas are the third person.

To conjugate is to yoke.
Join the persons
without fusing the colors.

Valeu !!!
we study Portuguese
through the project.`;
}

function poemConjugacaoEs() {
  return `Tres eslabones.
Quién habla.
Con quién se habla.
De quién se habla.

Blanco mira el yo.
Amarillo cuida el tú.
Rojo alerta el él.

El plural no inventa persona —
abre el mismo eslabón.
Yo vira nosotros.
Tú vira vosotros.
Él y ella viran ellos y ellas.

El oído pega elos en eles.
El étimo corta:
elos son anillos;
eles y elas son la tercera.

Conjugar es uncir.
Ligar las personas
sin fundir los colores.

¡Valeu !!!
estudiamos portugués
por el proyecto.`;
}

function buildConjugacaoBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-conjugacao.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const elo = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const juntos = '/posts/post-inspecao-palavra-juntos.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const fui = '/posts/post-inspecao-palavra-fui.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const vida = '/vida/';
  const livro = '/livro/#cruzamento';
  const pessoasHist = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção **gramatical** da palavra **[conjugação](${self})** — o ofício de **jungir o verbo às pessoas**. Pedido de campo: *todo ele é composto por 3 elos principais; saber como ligar elas; elos e elas; nós, vós, eles; inspeção gramatical em conjugação de verbos; pessoas; plurais; página partilhável com [latim](${latim}); estudaremos português pelo projecto*.

Esta ficha é a **sala da conjugação**. Cobre os **três elos** (1.ª / 2.ª / 3.ª pessoa), o **cruzamento** com as **3 cores-ofício** do [manual](${livro}) (branco · amarelo · vermelho), o eixo do **número** (singular × plural), o par **eles / elas**, o espécime **[ligar](${ligar})**, e a herança latina (*ego, tū, nōs, vōs…*) na página-irmã [latim](${latim}). Fecho: [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · conjugação](${WIKI}), [conjugar](${WIKI_CONJUGAR}), [pessoa](${WIKI_PESSOA}), [pronome](${WIKI_PRONOME}), [nós](${WIKI_NOS}), [vós](${WIKI_VOS}), [eles](${WIKI_ELES}), [elas](${WIKI_ELAS}), lat. [*coniugātiō*](${WIKI_LAT_CONIUGATIO}), [*coniugāre*](${WIKI_LAT_CONIUGARE}), [*nōs*](${WIKI_LAT_NOS}), [*vōs*](${WIKI_LAT_VOS}), [Wikipédia · conjugação](${WIKI_GRAM}), [pessoa (gramática)](${WIKI_PESSOA_GRAM}). **Ficha ≠ gramática escolar completa, ≠ todos os tempos, ≠ série [Pessoas](${pessoasHist}) (biografias).** Tom: [verdade](${verdade}) do que o verbo segura. Estudar [português](${lingua}) **pelo projecto**.

**Gatilho:** *conjugação* / *conjugar* / *pessoas do verbo* / *nós vós eles* / *elos e elas* / *1ª 2ª 3ª pessoa*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **conjugação** (pl. *conjugações*) |
| Verbo da família | **conjugar** — jungir o verbo à pessoa |
| Classe | Substantivo feminino |
| Étimo | Lat. *coniugātiō* ← *coniugāre* (*con-* + *iugum* «jugo») — confiança: **alta** |
| Família | *conjugado* · *conjugável* · *desconjugado* · lat. *iugum* / *iungere* → [juntos](${juntos}) |
| Tipo BudGanja | Palavra / gramática — os **3 elos** × as **3 cores-ofício** × sala partilhada com [latim](${latim}) |
| Não é | Declinação (nomes) · biografia · [Pessoas](${pessoasHist}) · tabela de todos os tempos |
| Elo mínimo | **[latim](${latim})** — a sala-mãe das pessoas (*ego, tū, nōs, vōs*) |
| Elo de ofício | [língua portuguesa](${lingua}) · [ligar](${ligar}) · [elo de ligação](${elo}) · [juntos](${juntos}) |
| Fonte | [Wikcionário · conjugação](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o nome do **sistema** que liga um verbo a **quem fala, com quem se fala, de quem se fala**. *Coniugāre* é **pôr no mesmo jugo**. Daí os **3 elos principais**. Não é a pessoa humana da série histórica.

## 2. Hipóteses e método

**H1:** *conjugação* herda *coniugāre* — **jungir**, o mesmo ninho de [juntos](${juntos}) (*iungere*). **Alta.**  
**H2:** o sistema inteiro **compõe-se de 3 elos**: 1.ª, 2.ª e 3.ª pessoa. O plural **não inventa** pessoa — **abre** o mesmo elo.  
**H3:** **ligar** as pessoas é cruzar **pessoa × número** (e, na 3.ª, **género**: ele/ela, eles/elas).  
**H4:** [a orelha cola](${orelha}) *elos* em *eles*; o [étimo](${etimo}) corta — *elos* são anéis; *eles* / *elas* são a 3.ª pessoa do plural.  
**H5:** a tabela das pessoas é **latina**; esta página **partilha sala** com [latim](${latim}).  
**H6:** estudar [português](${lingua}) pelo projecto = inspecionar a forma viva (BR *vocês*) sem apagar o *vós* da lousa.  
**H7:** [Valeu !!!](${mantra}) = o melhor recorte *deste* jugo *hoje*.  
**H8:** as **3 cores-ofício** do [manual](${livro}) cruzam os **3 elos** — branco = atenção = 1.ª; amarelo = cuidado = 2.ª; vermelho = perigo = 3.ª. A cor **avisa**; a pessoa **fala**. Não se fundem.

Passos: (1) objecto e étimo; (2) os 3 elos; (3) cruzar com as 3 cores; (4) como ligar; (5) elos e elas; (6) plurais; (7) espécime *ligar* / *amar*; (8) sala do latim; (9) cortes.

## 3. Os 3 elos principais

Pedido: *todo ele é composto por 3 elos principais*. Em gramática, «ele» = o verbo conjugado. Os três elos são as **três pessoas**.

| Elo | Pessoa | Singular | Plural | Cor-ofício | Oficio |
|-----|--------|----------|--------|------------|--------|
| **1.º** | Quem **fala** | **eu** ← lat. *ego* | **nós** ← lat. *nōs* | **Branco** — atenção | O polo de [eu amo a vida](${amo}) |
| **2.º** | Com quem se **fala** | **tu** ← lat. *tū* | **vós** ← lat. *vōs* | **Amarelo** — cuidado | No BR vivo, muitas vezes **você** / **vocês** |
| **3.º** | De quem se **fala** | **ele / ela** ← *ille / illa* | **eles / elas** | **Vermelho** — perigo | O elo que pede género — **elos e elas** |

Nenhum dos três é receita. São **lugares na fala**. O [gesto](${gesto}) do verbo muda de sítio; a [relação](${relacao}) é o *entre*.

## 4. Cruzamento — 3 cores × 3 elos

Pedido: *cruzar as 3 cores do projecto com os 3 elos principais*. As cores vivem no [manual](${livro}); os elos vivem **aqui**. O cruzamento é **mapa de ofício**, não gramática cromática: a cor não conjuga; a pessoa não pinta.

| Cor | Ofício no [manual](${livro}) | Elo | Pessoa | O que o cruzamento inspeciona |
|-----|------------------------------|-----|--------|-------------------------------|
| **Branco** | Atenção — página, gelo, olhar limpo | **1.º** | **eu · nós** | Quem fala precisa de **olhar** — sem fundir-se no outro |
| **Amarelo** | Cuidado — luz de trânsito, ainda dá tempo | **2.º** | **tu · vós** | Com quem se fala pede **medida** — *tu* / *você* é tratamento, não festa |
| **Vermelho** | Perigo — semáforo, alarme, ameaça nua | **3.º** | **ele · ela · eles · elas** | De quem se fala pode estar **ausente**; a orelha cola *elos* em *eles* |

**Regra de ofício:** não fundir. Branco ≠ Alegria. Amarelo ≠ festa. Vermelho ≠ [Raiva](/posts/post-inspecao-palavra-raiva.html) da Riley. 1.ª ≠ biografia da série [Pessoas](${pessoasHist}). O jugo segura **os dois ternários** no mesmo anel.

O plural **abre** o elo e **mantém** a cor: *nós* continua branco; *vós* continua amarelo; *eles / elas* continuam vermelho.

## 5. Como ligar elas

Pedido: *devemos saber como ligar elas*. **Ligar** = cruzar os eixos, não fundir as pessoas.

| Eixo | O que junta | Exemplo |
|------|-------------|---------|
| **Pessoa** | Os 3 elos (1.ª / 2.ª / 3.ª) | *eu ligo* ≠ *tu ligas* ≠ *ela liga* |
| **Número** | Singular ↔ plural **no mesmo elo** | *eu* → *nós*; *tu* → *vós*; *ele/ela* → *eles/elas* |
| **Género** | Só o **3.º elo** (pronome) | *ele liga* / *ela liga* — o verbo BR muitas vezes **não** marca; o pronome marca |
| **Desinência** | A terminação é o [elo de ligação](${elo}) do verbo | *-o, -as, -a, -amos, -ais, -am* em *ligar* |
| **Tratamento BR** | *você(s)* pede forma de **3.ª** | *você liga* · *vocês ligam* — 2.ª de ofício, 3.ª de desinência |

**Regra de ofício:** o plural **abre** o elo; não troca de elo. *Nós* continua 1.ª. *Vós* continua 2.ª. *Eles / elas* continuam 3.ª.

O verbo-espécime desta ficha é **[ligar](${ligar})** — o pedido era *como ligar*. A [conexão](${conexao}) nomeia o efeito; *conjugação* nomeia o **jugo**.

## 6. Elos e elas

Pedido: *elos e elas*. Três peças que a orelha pode fundir:

| Forma | Classe | O que é | Não é |
|-------|--------|---------|-------|
| **elos** | Subst. masc. pl. de *elo* | Anéis da corrente — [elo de ligação](${elo}) | Pronome |
| **eles** | Pronome 3.ª pl. masc. | De quem se fala, no plural masculino | Anéis |
| **elas** | Pronome 3.ª pl. fem. | De quem se fala, no plural feminino | Anéis |

[A orelha cola](${orelha}) *elos* / *eles*. O [étimo](${etimo}) corta. **Ofício:** saber ligar **elas** (o feminino do 3.º elo) **e** os **elos** (os três anéis da conjugação) sem apagar nenhum dos dois.

No laboratório: *juntos com elos* fica em [juntos](${juntos}); *eles e elas* ficam **aqui**, na 3.ª pessoa do plural.

## 7. Plurais — nós, vós, eles

Pedido: *nós · vós · eles · plurais*. São os **três plurais** dos três elos.

| Plural | Latim | PT | Desinência típica (-ar, presente) | Nota BR |
|--------|-------|----|-----------------------------------|---------|
| **nós** | [*nōs*](${WIKI_LAT_NOS}) | 1.ª pl. | *-amos* (*ligamos*) | Forma viva |
| **vós** | [*vōs*](${WIKI_LAT_VOS}) | 2.ª pl. | *-ais* (*ligais*) | Na fala BR, raro; a lousa guarda |
| **eles / elas** | *illī / illae* | 3.ª pl. | *-am* (*ligam*) | *vocês* toma esta desinência |

**Corte:** *nos* (em + os, sem acento) ≠ **nós** (pronome). *vos* átono ≠ **vós**. A página [latim](${latim}) guarda a língua-mãe; esta guarda as **pessoas** que o português herdou.

## 8. Espécime — ligar (e um sopro de amar)

Presente do indicativo de **[ligar](${ligar})** — regular da 1.ª conjugação (-ar). Seis formas, três elos, dois números:

| Pessoa | Singular | Plural |
|--------|----------|--------|
| 1.ª | eu **ligo** | nós **ligamos** |
| 2.ª | tu **ligas** | vós **ligais** |
| 3.ª | ele / ela **liga** | eles / elas **ligam** |

Sopro já fichado: **[eu amo a vida](${amo})** é 1.ª do singular de *amar* — o mesmo jugo *-ar*, outro verbo. Forma irregular de outro ninho: **[fui](${fui})** (1.ª do pretérito de *ir* e de *ser*). A [ação](${acao}) nomeia o acto; a conjugação **marca quem** o faz.

Não se inventaria aqui todos os tempos. O ofício desta sala = **ver os 3 elos** e **saber ligá-los**.

## 9. Sala partilhada com o latim

Pedido: *página pode ser compartilhada com a página de latim*. As duas salas **apontam uma para a outra**.

| Nesta ficha | Na [sala do latim](${latim}) |
|-------------|------------------------------|
| *coniugātiō* / *coniugāre* / *iugum* | *latīnus* ← *Latium* — a língua |
| *ego, tū, ille/illa, nōs, vōs, illī/illae* | latinismos já cortados noutras palavras |
| Pessoas do **verbo português** | A **língua-mãe**; a orelha cola *latido* |
| Estudar [português](${lingua}) pelo projecto | Indexar a raiz sem fingir declinação |

A [sala do latim](${latim}) **não** ensina declinação. Esta ficha **não** ensina todos os tempos. Juntas, mostram o **jugo**: o português conjuga porque o latim jungia.

## 10. Poema de ofício

\`\`\`poem
${poemConjugacaoPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[latim](${latim})** | Sala-irmã — língua-mãe das pessoas; partilhar esta página |
| [língua portuguesa](${lingua}) | O solo onde se estuda pelo projecto |
| [elo de ligação](${elo}) · [juntos](${juntos}) | Anel × estado; *iugum* / *iungere* |
| [ligar](${ligar}) · [conexão](${conexao}) · [relação](${relacao}) | Espécime e nomes do *entre* |
| [eu amo a vida](${amo}) · [fui](${fui}) | 1.ª pessoa já viva no laboratório |
| [étimo](${etimo}) · [etimologia](${etimologia}) · [a orelha cola…](${orelha}) | Método do corte *elos* / *eles* |
| [Guia de Palavras](${guia}) · [Manual](${livro}) · [Vida](${vida}) · [Valeu !!!](${mantra}) | Glossário, cores × elos, chão e fecho |

## Limites

- Não é curso completo de todos os tempos, modos e irregularidades.  
- Não substitui a [sala do latim](${latim}) nem a ficha da [língua portuguesa](${lingua}).  
- **Pessoa gramatical ≠** pessoa da série [Pessoas](${pessoasHist}).  
- *Você / vocês* no BR = tratamento de 2.ª com desinência de 3.ª — mapear, não moralizar.  
- *Nos* / *vos* átonos ≠ **nós** / **vós**.  
- Ficha ≠ terapia de grupo, ≠ slogan [juntos](${juntos}).  
- Cores-ofício ≠ emoções da Riley: o cruzamento **avisa** o lugar da fala; não pinta o verbo.

## Status

**Aprovado na série Palavras** — *conjugação* fichada como os **3 elos** do verbo; **cruzamento** com as **3 cores-ofício** (branco · amarelo · vermelho); plurais **nós / vós / eles·elas**; corte **elos e elas**; espécime **ligar**; sala **partilhada** com [latim](${latim}). Estudamos [português](${lingua}) pelo projecto.

[▶ Palavras](${hub}) · [▶ Cores × elos](${livro}) · [▶ Latim](${latim}) · [▶ Língua portuguesa](${lingua}) · [▶ Ligar](${ligar}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Grammatical inspection of Portuguese **[conjugação](${self})** — yoking the verb to **person**. Field request: the whole system is **3 main links**; **cross the 3 project colors** with those links; how to join them; *elos e elas*; **nós, vós, eles**; persons; plurals; a page **shared with [latim](${latim})**; we study Portuguese through the project. Close: [Valeu !!!](${mantra}).

> Note: [Wiktionary · conjugação](${WIKI}), Lat. [*coniugātiō*](${WIKI_LAT_CONIUGATIO}). **Not** a full grammar, **not** the [People](${pessoasHist}) biography series.

## Object

| Field | Value |
|-------|-------|
| Word | **conjugação** (conjugation) |
| Etymon | Lat. *coniugātiō* ← *coniugāre* (*con-* + *iugum* “yoke”) — high |
| Three links | 1st *eu/nós* · **white / attention** · 2nd *tu/vós* · **yellow / care** · 3rd *ele·ela / eles·elas* · **red / danger** |
| Color cross | Map on the [manual](${livro}) — color warns; person speaks; they do not fuse |
| How to join | Person × number (3rd also gender) · the ending is the ring |
| Ear-glue | *elos* (rings) ≠ *eles/elas* (3rd pl.) |
| Specimen | [ligar](${ligar}) — *eu ligo, tu ligas, ela liga, nós ligamos, vós ligais, eles/elas ligam* |
| Sister room | **[latim](${latim})** — *ego, tū, nōs, vōs* |
| Date | ${inspected} |

\`\`\`poem
${poemConjugacaoEn()}
\`\`\`

## Status

**Approved** — three persons as links; **3 colors × 3 links**; plurals mapped; shared with [Latin](${latim}).

[▶ Words](${hub}) · [▶ Colors × links](${livro}) · [▶ Latim](${latim}) · [▶ Portuguese](${lingua}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección gramatical de **[conjugação](${self})** — uncir el verbo a la **persona**. Pedido: el sistema son **3 eslabones**; **cruzar los 3 colores** del proyecto con esos eslabones; cómo ligarlos; *elos e elas*; **nós, vós, eles**; personas; plurales; página **compartida con [latim](${latim})**; estudiamos portugués por el proyecto. Cierre: [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · conjugação](${WIKI}), lat. [*coniugātiō*](${WIKI_LAT_CONIUGATIO}). **No** es gramática completa ni la serie [Personas](${pessoasHist}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **conjugação** (conjugación) |
| Étimo | Lat. *coniugātiō* ← *coniugāre* (*con-* + *iugum* «yugo») — alta |
| Tres eslabones | 1.ª *eu/nós* · **blanco / atención** · 2.ª *tu/vós* · **amarillo / cuidado** · 3.ª *ele·ela / eles·elas* · **rojo / peligro** |
| Cruce de color | Mapa en el [manual](${livro}) — el color avisa; la persona habla; no se funden |
| Cómo ligar | Persona × número (3.ª también género) |
| Cola de oído | *elos* (anillos) ≠ *eles/elas* (3.ª pl.) |
| Espécimen | [ligar](${ligar}) |
| Sala hermana | **[latim](${latim})** — *ego, tū, nōs, vōs* |
| Fecha | ${inspected} |

\`\`\`poem
${poemConjugacaoEs()}
\`\`\`

## Estado

**Aprobada** — tres personas como eslabones; **3 colores × 3 eslabones**; plurales mapeados; compartida con [latín](${latim}).

[▶ Palabras](${hub}) · [▶ Colores × eslabones](${livro}) · [▶ Latim](${latim}) · [▶ Lengua portuguesa](${lingua}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildConjugacaoPost() {
  const { body, contentEn, contentEs, wiki } = buildConjugacaoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-conjugacao', 293);
  return makePalavra({
    title: 'Inspeção: Conjugação — as 3 pessoas; elos e elas; nós, vós, eles',
    titleEn: 'Inspection: Conjugação — the 3 persons; elos e elas; nós, vós, eles',
    titleEs: 'Inspección: Conjugação — las 3 personas; elos e elas; nós, vós, eles',
    excerpt:
      'Palavras: conjugação ← lat. coniugātiō; 3 elos × 3 cores (branco/eu · amarelo/tu · vermelho/ele); elos ≠ eles/elas; Valeu !!!',
    excerptEn:
      'Words: conjugação ← Lat. coniugātiō; 3 links × 3 colors (white/I · yellow/you · red/he); elos ≠ eles/elas; Valeu !!!',
    excerptEs:
      'Palabras: conjugação ← lat. coniugātiō; 3 eslabones × 3 colores (blanco/yo · amarillo/tú · rojo/él); elos ≠ eles/elas; ¡Valeu !!!',
    slug: 'inspecao-palavra-conjugacao',
    date: '2026-08-24T10:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Conjugação · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildConjugacaoPost,
  buildConjugacaoBodies,
  poemConjugacaoPt,
  poemConjugacaoEn,
  poemConjugacaoEs,
  COVER,
  WIKI
};
