'use strict';

/**
 * Inspeção Expressões · jogar areia
 * Locução BR: atrapalhar / sabotar / pôr grão no jogo alheio.
 * Irmã de baixar a bola (pátio). Cortes: manual de sabotagem · ventilador · praia.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/jogar-areia-cover.jpg';
const WIKT_JOGAR = 'https://pt.wiktionary.org/wiki/jogar';
const WIKT_AREIA = 'https://pt.wiktionary.org/wiki/areia';
const WIKT_ARENA = 'https://en.wiktionary.org/wiki/arena#Latin';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'expressoes-ditados')
        .map((p) => Number(p.seriesOrder))
        .filter((n) => Number.isFinite(n) && n > 0)
    );
    if (!taken.size) return start;
    seriesOrder = Math.max(...taken) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `O caminho estava limpo.
Alguém fechou a mão
e abriu-a sobre o jogo alheio.
Jogar areia
é o grão que não foi pedido.

Não é a praia.
Não é o ventilador.
Não é o aviso honesto que dói.
É o atrito metido à força
onde o ofício pedia passagem.

Baixar a bola desce o peito.
Jogar areia suja o campo do outro.
Duas salas. O mesmo pátio.

Valeu !!!
com a palma aberta para ajudar,
sem areia no dente da caixa.`;
}

function poemEn() {
  return `The path was clean.
Someone closed the hand
and opened it over the other’s game.
Jogar areia
is the grain nobody asked for.

It is not the beach.
It is not the fan.
It is not the honest warning that hurts.
It is friction forced in
where the craft asked for passage.

To lower the ball brings the chest down.
To throw sand dirties the other’s pitch.
Two rooms. The same yard.

Valeu !!!
with the palm open to help,
without sand in the gearbox.`;
}

function poemEs() {
  return `El camino estaba limpio.
Alguien cerró la mano
y la abrió sobre el juego ajeno.
Jogar areia
es el grano que nadie pidió.

No es la playa.
No es el ventilador.
No es el aviso honesto que duele.
Es el roce metido a la fuerza
donde el oficio pedía paso.

Bajar la pelota baja el pecho.
Tirar arena ensucia el campo del otro.
Dos salas. El mismo patio.

Valeu !!!
con la palma abierta para ayudar,
sin arena en el diente de la caja.`;
}

function buildJogarAreiaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-expressao-jogar-areia.html';
  const bola = '/posts/post-inspecao-expressao-baixar-a-bola.html';
  const mao = '/posts/post-inspecao-expressao-meter-a-mao.html';
  const petisca = '/posts/post-inspecao-expressao-quem-nao-arrisca-nao-petisca.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da expressão **«[jogar areia](${self})»** — locução viva do português do Brasil: **atrapalhar, sabotar, desanimar, pôr grão no jogo alheio**. Pedido de campo: *expressões populares baixar a bola e jogar areia*. Imagem de pátio: areia na engrenagem, areia no caminho, areia no plano que pedia passagem. Irmã de **[baixar a bola](${bola})** (a altitude **própria**). Três cortes: **manual de sabotagem**, **jogar areia no ventilador**, **praia / vôlei** — nomeiam-se; **não** são esta âncora.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · jogar](${WIKT_JOGAR}), [areia](${WIKT_AREIA}), lat. [*arena*](${WIKT_ARENA}). **Ficha ≠ guia de sabotagem, ≠ recado para calar crítica honesta, ≠ manual de briga.** Sem afiliação. Tom: [gesto](${gesto}) inspeccionado com [respeito](${respeito}) — o grão nomeia-se para **não** o ensinar.

**Gatilho:** *jogar areia* / *jogar areia nos planos* / *botar areia* / *não vou jogar areia, mas…* → **jogar areia** (âncora). *Jogar areia no ventilador* → sala **irmã**, outra ficha de sentido.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **jogar areia** |
| Variantes | *jogar areia nos planos* · *botar areia* · *atirar areia* · *jogar areia no jogo* |
| Classe | Locução verbal |
| Peças | **jogar** (lat. *iocare* «brincar / lançar no jogo») + **areia** (lat. *arena* «areia / arena») |
| Núcleo | Atrito — o grão **entra** onde não foi chamado |
| Tipo BudGanja | Expressão — [gesto](${gesto}) × [ação](${acao}) × [risco](${risco}) |
| O que **não** é | Tutorial de sabotagem · ventilador (escândalo) · praia · areia nos olhos como briga · [baixar a bola](${bola}) |
| Elo | [baixar a bola](${bola}) · [respeito](${respeito}) · [risco](${risco}) · [relação](${relacao}) · [quem não arrisca não petisca](${petisca}) |
| Fonte | [jogar](${WIKT_JOGAR}) · [areia](${WIKT_AREIA}) |
| Data | ${inspected} |

**Objecto:** o acto de **lançar grão no ofício alheio**. No laboratório: areia no substrato que não pedia areia, comentário que finge ajuda e trava o vaso, palma que fecha o [caminho](${caminho}) do outro. Nomeia-se o atrito. **Não** se ensina o lançamento.

## 2. Hipóteses e método

**H1:** *jogar* (lat. *iocare*) é lançar **no jogo**; *areia* (lat. *arena*) é o grão — confiança **alta**.  
**H2:** a canónica de pátio é **atrapalhar**: dificultar, desanimar, sabotar o plano alheio.  
**H3:** a imagem física é **areia na engrenagem** — um grão basta para o dente ranger. Relacionar ≠ manual de máquina.  
**H4:** [A orelha cola](${orelhaCola}) *jogar areia* em *jogar areia no ventilador* (espalhar sujeira / escândalo) e em *atirar areia aos olhos* (enganar). A peça *areia* é a mesma; a **sala** muda.  
**H5:** **[baixar a bola](${bola})** desce o peito **próprio**. **Jogar areia** atira no campo **alheio**. Par de pátio; direcções opostas.  
**H6:** crítica honesta, aviso de [risco](${risco}), «não vai dar» dito com [verdade](${verdade}) — **não** são jogar areia. O corte é a **intenção de travar**.  
**H7:** a fórmula *não vou jogar areia, mas…* muitas vezes **já jogou**. A boca nega; a palma fecha.

## 3. Salas (não misturar)

| Sala | Leitura | No lab |
|------|---------|--------|
| **Pátio / sabotagem** | Atrapalhar o plano alheio | Canónica desta ficha |
| **Engrenagem** | Areia no dente da caixa | Imagem física do atrito |
| **Desânimo** | Tirar o gosto do lance | Irmã do travar — ainda pátio |
| **Ventilador** | *jogar areia no ventilador* = espalhar escândalo | **Outra sala** — sujar o ar, não o plano |
| **Olhos** | *atirar areia aos olhos* = enganar | **Outra sala** — véu, não grão no caminho |
| **Praia** | Areia literal / vôlei / futebol de areia | Origem possível da imagem — **não** âncora |
| **Substrato** | Areia no vaso quando a receita pede | Ofício: grão **chamado** ≠ grão **metido** |
| **[Baixar a bola](${bola})** | Descer a altitude própria | Irmã invertida |

## 4. Peças da frase

| Peça | Comum | BudGanja |
|------|-------|----------|
| **Jogar** | Lançar / participar do jogo (lat. *iocare*) | [Gesto](${gesto}) que atira — o mesmo verbo do pátio |
| **Areia** | Grão de sílica (lat. *arena*) | Atrito — o que trava o dente; também a arena do combate |

**≠** *jogar areia no ventilador*: espalhar o que estava quieto — escândalo, não obstáculo.  
**≠** *atirar areia / pó nos olhos*: enganar.  
**≠** areia de **substrato** pedida pela receita: ofício, não sabotagem.  
**≠** [meter a mão](${mao}): a palma que **entra** no próprio ofício × a palma que **atira** no alheio.

## 5. Jogar areia × baixar a bola

| Locução | Direcção | Ofício |
|---------|----------|--------|
| **[jogar areia](${self})** | O grão **entra** no jogo alheio | Atrito / travar |
| **[baixar a bola](${bola})** | A altitude **própria** desce | Humildade / ritmo |

Duas bocas do pátio. Uma suja o campo do vizinho. A outra limpa o peito. Relacionar ≠ fundir.

## 6. O que parece × o que é

| Parece | É |
|--------|---|
| Opinião sincera | Só é areia se a intenção é **travar** |
| Ajuda realista («não vai dar») | [Verdade](${verdade}) com [respeito](${respeito}) ≠ grão no eixo |
| Sinónimo de [baixar a bola](${bola}) | Irmã invertida: uma atira; a outra desce |
| Praia / recreio | Outra sala — areia chamada |
| Direito de sabotar | [Risco](${risco}) sem [respeito](${respeito}) — **não** método |

## 7. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear «isso é jogar areia» quando o atrito disfarça de conselho |
| Bom | Recusar a fórmula *não vou jogar areia, mas…* |
| Bom | Areia no vaso **quando a receita pede** (outra sala — ofício) |
| Bom | Aviso honesto de [risco](${risco}) sem fechar o [caminho](${caminho}) |
| Mau | Atrapalhar o plano alheio para ficar em cima |
| Mau | Desanimar como desporto |
| Mau | Confundir crítica necessária com grão na caixa |
| Mau | Ensinar a sabotagem — esta ficha **não** o faz |

## 8. Limites

- Não ensinamos a sabotar, a espalhar escândalo nem a atirar areia nos olhos.  
- Não é ficha de praia nem de vôlei.  
- [Relação](${relacao}) sem [respeito](${respeito}) não vira método.  
- [Quem não arrisca não petisca](${petisca}) pede risco **próprio** — jogar areia é o risco **imposto** ao outro.

\`\`\`poem
${poemPt()}
\`\`\`

## Veredicto

**Aprovado** na série Expressões — **jogar areia** = o [gesto](${gesto}) que mete grão no [caminho](${caminho}) alheio. Canónica: **atrapalhar o plano**. Irmã: [baixar a bola](${bola}). Fecho: [Valeu !!!](${valeu}) · [eu amo a vida](${amo}) **com a palma aberta**, sem areia no dente da caixa.

[▶ Expressões](${hub}) · [▶ Baixar a bola](${bola}) · [▶ Respeito](${respeito}) · [▶ Risco](${risco}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${valeu}) · [▶ Palavras](${hubPalavras}) · [▶ Guia](${guia}) · [▶ Vida](${vida}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

Brazilian saying **«[jogar areia](${self})»** — throw **sand** into someone else’s plans: hinder, sap, sabotage. Field: *expressões populares baixar a bola e jogar areia*. Patio image: grit in the gearbox. Sister of **[baixar a bola](${bola})** (**your** altitude). Cuts: sabotage how-to, sand-in-the-fan (scandal), beach — named, **not** this âncora.

> Independent audit. [jogar](${WIKT_JOGAR}), [areia](${WIKT_AREIA}), Lat. [*arena*](${WIKT_ARENA}). **Not** a sabotage guide.

## Object

| Field | Value |
|-------|-------|
| Saying | **jogar areia** |
| Pieces | *jogar* (Lat. *iocare*) + *areia* (Lat. *arena*) |
| Lab | Grain forced into another’s craft — named, not taught |
| Not | How-to sabotage · fan/scandal · beach · [baixar a bola](${bola}) |
| Date | ${inspected} |

**H1:** *jogar* = throw into the game; *areia* = grit.  
**H2:** craft canon = getting in the way.  
**H3:** sister of [baixar a bola](${bola}) — opposite direction.  
**H4:** honest [risco](${risco}) with [respeito](${respeito}) is **not** sand.  
**H5:** “I’m not throwing sand, but…” often already did.

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** approved. Palm open. [Valeu !!!](${valeu}) · [eu amo a vida](${amo})

[▶ Sayings](${hub}) · [▶ Baixar a bola](${bola}) · [▶ Respect](${respeito}) · [▶ Gesture](${gesto}) · [▶ Valeu !!!](${valeu})
`;

  const contentEs = `## Alcance

Dicho BR **«[jogar areia](${self})»** — tirar **arena** a los planes ajenos: estorbar, desanimar, sabotear. Pedido: *expressões populares baixar a bola e jogar areia*. Imagen de patio: grano en el engranaje. Hermana de **[baixar a bola](${bola})** (la altitud **propia**). Cortes: manual de sabotaje, arena en el ventilador (escándalo), playa — se nombran; **no** son esta âncora.

> Auditoría independiente. [jogar](${WIKT_JOGAR}), [areia](${WIKT_AREIA}), lat. [*arena*](${WIKT_ARENA}). **No** es guía de sabotaje.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **jogar areia** |
| Piezas | *jogar* (lat. *iocare*) + *areia* (lat. *arena*) |
| Lab | Grano metido en el oficio ajeno — se nombra; no se enseña |
| No es | Tutorial de sabotaje · ventilador · playa · [baixar a bola](${bola}) |
| Fecha | ${inspected} |

**H1:** *jogar* = lanzar al juego; *areia* = grano.  
**H2:** canónica = estorbar.  
**H3:** hermana de [baixar a bola](${bola}) — dirección opuesta.  
**H4:** [risco](${risco}) honesto con [respeito](${respeito}) **no** es arena.  
**H5:** «no voy a tirar arena, pero…» a menudo ya tiró.

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** aprobado. Palma abierta. [¡Valeu !!!](${valeu}) · [eu amo a vida](${amo})

[▶ Expresiones](${hub}) · [▶ Baixar a bola](${bola}) · [▶ Respeto](${respeito}) · [▶ Gesto](${gesto}) · [▶ ¡Valeu !!!](${valeu})
`;

  return { body, contentEn, contentEs, wiki: WIKT_JOGAR };
}

function buildJogarAreiaPost() {
  const { body, contentEn, contentEs, wiki } = buildJogarAreiaBodies();
  return expressaoPost({
    title: 'Inspeção: Jogar areia — o grão no jogo alheio',
    titleEn: 'Inspection: Jogar areia — grit in someone else’s game',
    titleEs: 'Inspección: Jogar areia — el grano en el juego ajeno',
    excerpt:
      'Expressões: jogar areia — atrapalhar o plano alheio; ≠ sabotagem-manual ≠ ventilador ≠ praia; irmã de baixar a bola; Valeu !!!',
    excerptEn:
      'Sayings: jogar areia — hinder someone else’s plan; ≠ sabotage how-to ≠ fan ≠ beach; sister of baixar a bola; Valeu !!!',
    excerptEs:
      'Dichos: jogar areia — estorbar el plan ajeno; ≠ manual de sabotaje ≠ ventilador ≠ playa; hermana de baixar a bola; ¡Valeu !!!',
    slug: 'inspecao-expressao-jogar-areia',
    date: '2026-08-24T14:05:00.000Z',
    seriesOrder: pickOrder('inspecao-expressao-jogar-areia', 46),
    seriesLabel: 'Jogar areia · pátio',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildJogarAreiaPost, buildJogarAreiaBodies, poemPt, poemEn, poemEs };
