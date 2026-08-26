'use strict';

/**
 * Inspeção-cruzamento: Estrada × Automóvel × Bateria × Encruzilhada × Jesus Cristo
 * Objecto = a intersecção (leito, máquina, pulso, X, o que diz «Eu sou o caminho»),
 * não catecismo nem manual de trânsito.
 */

const fs = require('fs');
const path = require('path');
const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/estrada-jesus-cristo-cruzamento-cover.jpg';
const WIKT_JESUS = 'https://pt.wiktionary.org/wiki/Jesus';
const WIKT_CRISTO = 'https://pt.wiktionary.org/wiki/Cristo';
const WIKI_JESUS = 'https://pt.wikipedia.org/wiki/Jesus';
const BIBLE_JOAO = 'https://www.biblegateway.com/passage/?search=Jo%C3%A3o+14%3A6&version=ARC';
const BIBLE_MT = 'https://www.biblegateway.com/passage/?search=Mateus+7%3A13-14&version=ARC';
const BIBLE_EMMAUS = 'https://www.biblegateway.com/passage/?search=Lucas+24%3A13-35&version=ARC';
const BIBLE_DAMASCO = 'https://www.biblegateway.com/passage/?search=Atos+9%3A1-19&version=ARC';

function poemPt() {
  return `A estrada é o leito.
O automóvel move-se a si.
A bateria é o pulso.

A encruzilhada é o X.
Duas vias, uma escolha.

Jesus Cristo
não é o asfalto.
Não é o volante.
Não é a célula.

«Eu sou o caminho.»
Não disse: eu sou a estrada.
O método não é o leito.

A cruz de madeira
e a cruz das vias
partilham o avô crux.
O laboratório relaciona.
Não funde.

Valeu !!!
chegar ao X com pulso
e ainda assim escolher.`;
}

function poemEn() {
  return `The road is the bed.
The car moves itself.
The battery is the pulse.

The crossroads is the X.
Two ways, one choice.

Jesus Christ
is not the asphalt.
Is not the wheel.
Is not the cell.

“I am the way.”
He did not say: I am the road.
The method is not the bed.

The wooden cross
and the cross of the ways
share grandfather crux.
The lab relates.
It does not fuse.

Valeu !!!
reach the X with pulse
and still choose.`;
}

function poemEs() {
  return `La estrada es el lecho.
El automóvil se mueve a sí.
La batería es el pulso.

La encrucijada es la X.
Dos vías, una elección.

Jesucristo
no es el asfalto.
No es el volante.
No es la celda.

«Yo soy el camino.»
No dijo: yo soy la estrada.
El método no es el lecho.

La cruz de madera
y la cruz de las vías
comparten el abuelo crux.
El laboratorio relaciona.
No fusiona.

¡Valeu !!!
llegar a la X con pulso
y aun así elegir.`;
}

function buildCruzamentoBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const estrada = '/posts/post-inspecao-palavra-estrada.html';
  const automovel = '/posts/post-inspecao-palavra-automovel.html';
  const bateria = '/posts/post-inspecao-palavra-bateria.html';
  const encruzilhada = '/posts/post-inspecao-palavra-encruzilhada.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const vidaEnergia = '/posts/post-inspecao-palavra-vida-energia.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mapa = '/posts/post-inspecao-palavra-mapa.html';
  const parabola = '/posts/post-inspecao-palavra-parabola.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const filho = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const doze = '/posts/post-inspecao-expressao-os-doze-apostolos.html';
  const chosen = '/posts/post-inspecao-serie-the-chosen.html';
  const paixao = '/posts/post-inspecao-filme-a-paixao-de-cristo.html';
  const ceia = '/posts/post-inspecao-arte-santa-ceia.html';
  const senna = '/posts/post-inspecao-figura-ayrton-senna.html';
  const delorean = '/posts/post-inspecao-delorean.html';
  const airbag = '/posts/post-inspecao-cruzamento-aaron-beggs-air-bag.html';
  const patinete = '/posts/post-inspecao-patinete-eletrico-criancas.html';
  const objetos = '/objetos/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const vidaHub = '/vida/';
  const meterMarcha = '/posts/post-inspecao-expressao-meter-marcha.html';

  const body = `## Escopo

Inspeção editorial do **cruzamento** **[estrada](${estrada}) × [automóvel](${automovel}) × [bateria](${bateria}) × [encruzilhada](${encruzilhada}) × Jesus Cristo**. O objecto **não** é só a via calçada, nem só a máquina, nem só a célula, nem só o X das vias, nem só o nome sagrado: é o **mapa** onde o leito, o que se move a si, o pulso guardado e o sítio da cruz encontram aquele que, no Evangelho, diz «[Eu sou o caminho, a verdade e a vida](${BIBLE_JOAO})» (João 14:6).

Pedido de campo: *inspeção da palavra estrada, objeto altomovel e bateria, cruzar com encruziliada e jeusus cristo*. O laboratório honra o pedido **sem** fundir asfalto com madeiro, **sem** transformar a [bateria](${bateria}) em Espírito, **sem** catecismo.

> **Nota metodológica:** auditoria independente. Léxico: fichas irmãs [estrada](${estrada}), [automóvel](${automovel}), [bateria](${bateria}), [encruzilhada](${encruzilhada}). Pessoa / nome: [Wikcionário · Jesus](${WIKT_JESUS}), [Cristo](${WIKT_CRISTO}), [Wikipédia · Jesus](${WIKI_JESUS}). Textos citados como **fonte pública da tradição** (não como laudo do laboratório): João 14:6, Mateus 7:13-14, Lucas 24 (Emaús), Actos 9 (Damasco). **Ficha ≠ catecismo, ≠ homilia, ≠ proselitismo, ≠ código de trânsito, ≠ manual de lítio.** Respeito à fé de quem crê; respeito a quem não crê. Distinto de [jesusamado](${jesusamado}) (oralidade), de [The Chosen](${chosen}) (série) e de [A Paixão de Cristo](${paixao}) (filme). Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **Cruzamento** — leito × máquina × pulso × X × nome, não obra única |
| Eixo palavra | **[estrada](${estrada})** — lat. *strata* (via calçada) |
| Eixo objecto 1 | **[automóvel](${automovel})** — *auto* + *móvel* (move-se a si); gatilho *altomovel* |
| Eixo objecto 2 | **[bateria](${bateria})** — fr. *batterie*; lema = célula / acumulador |
| Eixo palavra 2 | **[encruzilhada](${encruzilhada})** — *en-* + *cruz* + *-ilhada*; gatilho *encruziliada* |
| Eixo pessoa / nome | **Jesus Cristo** — hebr. *Yeshua* («YHWH salva») + gr. *Christós* («ungido») |
| Tipo BudGanja | Pessoas — inspeção-cruzamento |
| Contraste | a máquina **move-se a si**; o rumo **escolhe-se**; Ele **diz ser** o [caminho](${caminho}) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

Na fila do laboratório: inspecionar a **via**, os **objectos** que nela andam, o **X** onde se escolhe, e cruzar com o nome que a tradição cristã põe no centro da viagem. Sem este mapa, *estrada* vira só asfalto, *Jesus* vira só exclamação ([jesusamado](${jesusamado})), e a [encruzilhada](${encruzilhada}) afro-brasileira cola no madeiro — o ofício é **separar** para depois **relacionar**.

## Hipóteses e método

**H1:** [estrada](${estrada}) (*strata*) ≠ [caminho](${caminho}) (*camminus*) — leito ≠ método. João 14:6 fala de *caminho / way / via*, não de asfalto.  
**H2:** [automóvel](${automovel}) é *auto-móvil*: anda **sem** cavalo; o rumo ainda pede [gesto](${gesto}) no volante.  
**H3:** [bateria](${bateria}) é pulso **guardado**; [vida / energia](${vidaEnergia}) é outra ficha — **não** fundir célula com alma.  
**H4:** [encruzilhada](${encruzilhada}) e o madeiro partilham o avô *crux*; o laboratório **relaciona** e **corta** a fusão (também corta a fusão com Exu).  
**H5:** fecho = [verdade](${verdade}) + [Valeu !!!](${mantra}) · [eu amo a vida](${amo}) — o melhor recorte *deste* cruzamento *nesta* ficha.

Passos:

1. Fixar os quatro eixos lexicais / de objecto (fichas irmãs).  
2. Fixar o eixo do nome (Jesus + Cristo) com fonte pública.  
3. Ler o cruzamento: leito × máquina × pulso × X × «Eu sou o caminho».  
4. Nomear as estradas da tradição (porta estreita, Emaús, Damasco) **sem** virar sermão.  
5. Declarar limites.

\`\`\`poem
${poemPt()}
\`\`\`

## Eixo 1 — Estrada (o leito)

A [estrada](${estrada}) é *strata*: o que foi estendido, pavimentado. O [caminho](${caminho}) do laboratório é método. Sem esta tesoura, João 14:6 vira slogan de asfalto.

Na tradição citada: a [porta estreita e o caminho apertado](${BIBLE_MT}) (Mateus 7:13-14) — duas vias, uma escolha; a [estrada de Emaús](${BIBLE_EMMAUS}) (Lucas 24) — o leito onde o reconhecimento acontece **a andar**; o [caminho de Damasco](${BIBLE_DAMASCO}) (Actos 9) — a via onde Saulo para. O lab lê **geografia da narrativa**, não prescreve fé.

## Eixo 2 — Automóvel (o que se move a si)

O [automóvel](${automovel}) substitui a tração viva. *Auto-* é **si**, não *alto* (*altomovel*). A máquina anda; o rumo não vem de fábrica. Contraste de ofício: o discípulo, na tradição, **é levado**; o carro **leva-se**. O cruzamento **não** afirma que o cristão é veículo — só marca a diferença entre mover-se a si e ser movido.

Ícones noutro sítio: [DeLorean](${delorean}), [Senna](${senna}), [airbag × Beggs](${airbag}). Esta ficha não os funde.

## Eixo 3 — Bateria (o pulso)

A [bateria](${bateria}) guarda carga e a devolve no [ligar](/posts/post-inspecao-palavra-ligar-desligar.html). Sem ela, o [automóvel](${automovel}) na [estrada](${estrada}) é casca. A metáfora fácil («o Espírito é a bateria») é **tentação de fusão**. O laboratório recusa: a célula inflama ([patinete](${patinete}), [risco](${risco})); a [vida](${vida}) não é Ah. Relacionar pulso com [vida / energia](${vidaEnergia}) **sem** baptizar o lítio.

## Eixo 4 — Encruzilhada (o X)

A [encruzilhada](${encruzilhada}) é o sítio da *cruz* das vias. O [automóvel](${automovel}) chega; a [bateria](${bateria}) ainda pulsa; falta o [gesto](${gesto}) de escolher. «Estar numa encruzilhada» já é português de decisão.

Camada afro-brasileira: no Brasil a encruzilhada é também lugar de culto. Esta ficha **nomeia** e **não ensina**, **não funde** com Gólgota. Quem quiser essa inspeção pede outra ficha.

## Eixo 5 — Jesus Cristo (o nome)

| Peça | Étimo (trabalho) | Ofício nesta ficha |
|------|------------------|-------------------|
| **Jesus** | hebr. *Yeshua* / *Yehoshua* — «YHWH salva» | Nome próprio da tradição |
| **Cristo** | gr. *Christós* — «ungido» ← hebr. *Mashiach* | Título, não apelido de cartão |
| **Gatilho** | *jeusus cristo* | Orelha / teclado; lema **Jesus Cristo** |
| **Não é** | [jesusamado](${jesusamado}) · [filho de deus](${filho}) (expressões) · [The Chosen](${chosen}) · [Paixão](${paixao}) | Outras fichas |

O dito de João 14:6 junta três lemas já no laboratório: [caminho](${caminho}), [verdade](${verdade}), [vida](${vida}). O cruzamento lê: Ele **não** se chama *estrada*. O método não é o leito. A [encruzilhada](${encruzilhada}) (X das vias) e a cruz do madeiro partilham *crux* — [relação](${relacao}) sem fusão.

## Mapa do cruzamento

| Peça material | Peça no mapa do nome | Corte (o que **não** é) |
|---------------|----------------------|-------------------------|
| [Estrada](${estrada}) (*strata*) | Via de Emaús / Damasco / porta estreita | ≠ [caminho](${caminho}) de João 14:6 |
| [Automóvel](${automovel}) (auto-móvil) | Quem anda com as próprias rodas | ≠ ser «levado»; ≠ [DeLorean](${delorean}) |
| [Bateria](${bateria}) (pulso guardado) | Energia para chegar ao X | ≠ Espírito; ≠ [vida](${vida}) |
| [Encruzilhada](${encruzilhada}) (X) | Decisão; avô *crux* | ≠ madeiro; ≠ Exu |
| **Jesus Cristo** | «Eu sou o [caminho](${caminho})» | ≠ asfalto; ≠ volante; ≠ célula |

Tese: a viagem material **chega** ao X com máquina e pulso; a tradição citada **nomeia** um rumo que não se compra no capô. O laboratório inspeciona o mapa; **não** converte o leitor.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [estrada](${estrada}) · [automóvel](${automovel}) · [bateria](${bateria}) · [encruzilhada](${encruzilhada}) | Os quatro eixos — fichas próprias |
| [caminho](${caminho}) · [verdade](${verdade}) · [vida](${vida}) | O trio de João 14:6 já fichado |
| [parábola](${parabola}) · [mapa](${mapa}) · [gesto](${gesto}) | História que compara; pano; escolha |
| [filho de deus](${filho}) · [doze apóstolos](${doze}) | Expressões — não esta ficha |
| [The Chosen](${chosen}) · [Paixão](${paixao}) · [Santa Ceia](${ceia}) | Artes — outros recortes |
| [Objetos](${objetos}) · [Senna](${senna}) · [airbag](${airbag}) | Catálogo e ofícios de [risco](${risco}) |
| [meter marcha](${meterMarcha}) · [Vida](${vidaHub}) · [Valeu !!!](${mantra}) | Depois do X, o gesto; fecho |

## O que esta ficha não é

- **Não** é catecismo, missa, culto nem juízo sobre quem crê ou não crê.  
- **Não** funde Jesus com a [encruzilhada](${encruzilhada}) afro-brasileira.  
- **Não** afirma que a [bateria](${bateria}) é o Espírito Santo.  
- **Não** afirma que a [estrada](${estrada}) é o [caminho](${caminho}) de João 14:6.  
- **Não** é aula de trânsito, mecânica ou lítio.  
- **Não** substitui [The Chosen](${chosen}), [A Paixão](${paixao}) nem [jesusamado](${jesusamado}).  
- Grafias de campo (*altomovel*, *encruziliada*, *jeusus*) ficam como gatilho.

## Veredicto

**Aprovado** como inspeção-cruzamento (Pessoas) — [estrada](${estrada}) × [automóvel](${automovel}) × [bateria](${bateria}) × [encruzilhada](${encruzilhada}) × **Jesus Cristo**: o leito, a máquina que se move a si, o pulso guardado e o X das vias encontram o nome que diz ser o [caminho](${caminho}). O laboratório relaciona *crux* com *crux* **sem** fundir asfalto e madeiro. [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

[▶ Pessoas](${hub}) · [▶ Palavras](${palavras}) · [▶ Estrada](${estrada}) · [▶ Automóvel](${automovel}) · [▶ Bateria](${bateria}) · [▶ Encruzilhada](${encruzilhada}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the **cross** **[estrada](${estrada}) × [automóvel](${automovel}) × [bateria](${bateria}) × [encruzilhada](${encruzilhada}) × Jesus Christ**. The object is the **map** where the paved bed, the self-moving machine, the stored pulse and the X of the ways meet the one who says “[I am the way, the truth and the life](${BIBLE_JOAO})” (John 14:6).

Field request honoured **without** fusing asphalt and timber, **without** baptising the cell as Spirit, **without** catechism. Distinct from [jesusamado](${jesusamado}), [The Chosen](${chosen}) and [The Passion](${paixao}). Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Object | **Cross** — bed × machine × pulse × X × name |
| Person / name | **Jesus Christ** — Heb. *Yeshua* + Gk. *Christós* |
| Contrast | the car **moves itself**; the heading **is chosen**; He **claims to be** the [caminho](${caminho}) |
| Date | ${inspected} |

**H1:** [estrada](${estrada}) (*strata*) ≠ [caminho](${caminho}) — John 14:6 is way, not asphalt.  
**H2:** [bateria](${bateria}) is stored pulse, not soul.  
**H3:** [encruzilhada](${encruzilhada}) and the timber share grandfather *crux* — relate, do not fuse.

\`\`\`poem
${poemEn()}
\`\`\`

## Verdict

**Approved** as a People cross — road × car × battery × crossroads × Jesus Christ. The lab relates *crux* to *crux* without fusing asphalt and timber. [Valeu !!!](${mantra})

[▶ Estrada](${estrada}) · [▶ Encruzilhada](${encruzilhada}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del **cruce** **[estrada](${estrada}) × [automóvel](${automovel}) × [bateria](${bateria}) × [encruzilhada](${encruzilhada}) × Jesucristo**. El objeto es el **mapa** donde el lecho, la máquina que se mueve a sí, el pulso guardado y la X de las vías encuentran a quien dice «[Yo soy el camino, la verdad y la vida](${BIBLE_JOAO})» (Juan 14:6).

Pedido honrado **sin** fusionar asfalto y madero, **sin** catecismo. Distinto de [jesusamado](${jesusamado}), [The Chosen](${chosen}) y [La Pasión](${paixao}). Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Objeto | **Cruce** — lecho × máquina × pulso × X × nombre |
| Persona / nombre | **Jesucristo** — hebr. *Yeshua* + gr. *Christós* |
| Fecha | ${inspected} |

**H1:** [estrada](${estrada}) ≠ [caminho](${caminho}) — Juan 14:6 es camino, no asfalto.  
**H2:** [bateria](${bateria}) es pulso guardado, no alma.  
**H3:** [encruzilhada](${encruzilhada}) y el madero comparten *crux* — relacionar, no fusionar.

\`\`\`poem
${poemEs()}
\`\`\`

## Veredicto

**Aprobado** como cruce (Personas) — estrada × automóvil × batería × encrucijada × Jesucristo. [¡Valeu !!!](${mantra})

[▶ Estrada](${estrada}) · [▶ Encruzilhada](${encruzilhada}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function nextPessoasOrder(posts) {
  const orders = posts
    .filter((p) => p && p.series === 'pessoas-historia')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function buildCruzamentoEstradaJesusPost(seriesOrder) {
  const { body, contentEn, contentEs } = buildCruzamentoBodies();
  let order = seriesOrder;
  if (order == null) {
    try {
      const posts = JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
      );
      const existing = posts.find(
        (p) => p.slug === 'inspecao-cruzamento-estrada-encruzilhada-jesus-cristo'
      );
      order =
        existing && typeof existing.seriesOrder === 'number'
          ? existing.seriesOrder
          : nextPessoasOrder(posts);
    } catch (_) {
      order = 42;
    }
  }

  return figuraPost({
    title: 'Inspeção: Cruzamento — Estrada × Encruzilhada × Jesus Cristo',
    titleEn: 'Inspection: Cross — Estrada × Encruzilhada × Jesus Christ',
    titleEs: 'Inspección: Cruce — Estrada × Encruzilhada × Jesucristo',
    excerpt:
      'Pessoas · cruzamento: estrada (strata) × automóvel × bateria × encruzilhada (crux) × Jesus Cristo — o leito, a máquina, o pulso e o X encontram «Eu sou o caminho»; Valeu !!!',
    excerptEn:
      'People · cross: estrada (strata) × car × battery × encruzilhada (crux) × Jesus Christ — bed, machine, pulse and X meet “I am the way”; Valeu !!!',
    excerptEs:
      'Personas · cruce: estrada (strata) × automóvil × batería × encruzilhada (crux) × Jesucristo — lecho, máquina, pulso y X encuentran «Yo soy el camino»; ¡Valeu !!!',
    slug: 'inspecao-cruzamento-estrada-encruzilhada-jesus-cristo',
    date: '2026-08-24T16:20:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Cruzamento · leito × cruz',
    coverImage: COVER,
    sourceUrl: WIKI_JESUS,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCruzamentoEstradaJesusPost,
  buildCruzamentoBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_JESUS,
  WIKT_CRISTO,
  WIKI_JESUS,
  BIBLE_JOAO
};
