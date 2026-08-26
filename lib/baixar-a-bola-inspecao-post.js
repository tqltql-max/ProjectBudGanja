'use strict';

/**
 * Inspeção Expressões · baixar a bola
 * Locução BR: descer o orgulho / o ritmo / a pretensão.
 * Irmã de jogar areia (pátio). Inverso do empinar.
 * Cortes: humilhar como método · bola pra frente · pisar na bola · dar bola.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/baixar-a-bola-cover.jpg';
const WIKT_BAIXAR = 'https://pt.wiktionary.org/wiki/baixar';
const WIKT_BOLA = 'https://pt.wiktionary.org/wiki/bola';
const WIKT_BAIXO = 'https://pt.wiktionary.org/wiki/baixo';

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
  return `A bola subiu demais.
O peito também.
Baixar a bola
é pôr o jogo outra vez no chão.

Não é humilhar.
Não é bola pra frente.
Não é pisar no erro alheio.
É o orgulho que desce
para o ofício caber de novo.

Jogar areia é sujar o campo do outro.
Baixar a bola é limpar a própria altitude.

Valeu !!!
com o ritmo no relvado,
sem empinar o que ainda não deu fruto.`;
}

function poemEn() {
  return `The ball rose too high.
The chest rose with it.
Baixar a bola
is putting the game back on the ground.

It is not humiliation.
It is not “ball forward”.
It is not stepping on someone else’s miss.
It is pride coming down
so the craft can fit again.

To throw sand is to dirty the other’s pitch.
To lower the ball is to clean your own altitude.

Valeu !!!
with the rhythm on the grass,
without puffing up what has not yet borne fruit.`;
}

function poemEs() {
  return `La pelota subió de más.
El pecho también.
Baixar a bola
es poner el juego otra vez en el suelo.

No es humillar.
No es bola pra frente.
No es pisar el error ajeno.
Es el orgullo que baja
para que el oficio quepa de nuevo.

Jugar arena es ensuciar el campo del otro.
Bajar la pelota es limpiar la propia altitud.

Valeu !!!
con el ritmo en el césped,
sin inflar lo que aún no dio fruto.`;
}

function buildBaixarABolaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-expressao-baixar-a-bola.html';
  const areia = '/posts/post-inspecao-expressao-jogar-areia.html';
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
  const alivio = '/posts/post-inspecao-palavra-alivio.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da expressão **«[baixar a bola](${self})»** — locução viva do português do Brasil: **descer o orgulho, o ritmo ou a pretensão**. Pedido de campo: *expressões populares baixar a bola e jogar areia*. Imagem de pátio: a bola que subiu demais (marra, volume, expectativa) precisa voltar ao chão para o jogo continuar. Irmã de **[jogar areia](${areia})** (o grão no campo **alheio**). Inverso do **empinar**. Três cortes: **humilhar como método**, **bola pra frente**, **pisar na bola** — nomeiam-se; **não** são esta âncora.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · baixar](${WIKT_BAIXAR}), [bola](${WIKT_BOLA}), [baixo](${WIKT_BAIXO}). **Ficha ≠ manual de humilhação, ≠ táctica de futebol, ≠ recado para calar quem tem razão.** Sem afiliação a clube. Tom: [gesto](${gesto}) que desce com [respeito](${respeito}).

**Gatilho:** *baixar a bola* / *baixa a bola* / *baixa a bolinha* / *abaixar a bola* → **baixar a bola** (âncora).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **baixar a bola** |
| Variantes | *baixa a bola* · *baixa a bolinha* · *abaixar a bola* · *baixar a bolinha* |
| Classe | Locução verbal |
| Peças | **baixar** (de *baixo* ← lat. *bassus* «baixo») + artigo **a** + **bola** (lat. *bulla* «bolha / esfera») |
| Núcleo | Altitude — o peito **desce** para o ofício caber |
| Tipo BudGanja | Expressão — [gesto](${gesto}) × [ação](${acao}) × [respeito](${respeito}) |
| O que **não** é | Humilhar como âncora · bola pra frente · pisar na bola · dar bola · [meter a mão](${mao}) na bola · [jogar areia](${areia}) |
| Elo | [jogar areia](${areia}) · [respeito](${respeito}) · [alívio](${alivio}) · [gesto](${gesto}) · [Faça o seu melhor](${faca}) |
| Fonte | [baixar](${WIKT_BAIXAR}) · [bola](${WIKT_BOLA}) |
| Data | ${inspected} |

**Objecto:** o acto de **pôr a altitude no chão**. No laboratório: baixar o hype da colheita, o PPFD quando a planta pede, a voz quando o orgulho tapa o ouvido — não esmagar o outro para ficar em cima.

## 2. Hipóteses e método

**H1:** *baixar* (lat. *bassus*) é o [gesto](${gesto}) de **descer**; *bola* é a peça do jogo — confiança **alta**.  
**H2:** a canónica de pátio é **modéstia de ritmo**: menos marra, mesmo ofício. Irmã de [respeito](${respeito}) e de [Faça o seu melhor](${faca}).  
**H3:** a imagem vem do **futebol** — bola alta demais perde o controlo; o jogo vive perto do chão. Relacionar ≠ transformar a ficha em regra de campo.  
**H4:** [A orelha cola](${orelhaCola}) *baixar a bola* em *bola pra frente*, *pisar na bola*, *dar bola*. A peça *bola* é a mesma; a **sala** muda.  
**H5:** **[jogar areia](${areia})** suja o jogo **do outro**. **Baixar a bola** limpa a altitude **própria**. Par de pátio; direcções opostas.  
**H6:** sem [respeito](${respeito}), «baixa a bola» vira [risco](${risco}) de apagar quem só estava certo em voz alta.

## 3. Salas (não misturar)

| Sala | Leitura | No lab |
|------|---------|--------|
| **Pátio / orgulho** | Descer a marra, a pose, o volume | Canónica desta ficha |
| **Ritmo** | Acalmar ânimos / reduzir intensidade | Irmã do [alívio](${alivio}) |
| **Expectativa** | Não inflar o que ainda não deu fruto | Colheita, projecto, promessa |
| **Futebol literal** | Manter a bola baixa no campo | Origem da imagem — **não** é âncora |
| **Humilhação** | Fazer o outro baixar à força | **Corte** — não é método |
| **Bola pra frente** | Seguir depois do tombo | Outra locução |
| **Pisar na bola** | Errar / falhar com alguém | Outra sala — o pé, não a altitude |
| **Dar bola** | Dar atenção (namoro / assunto) | Outra sala |

## 4. Peças da frase

| Peça | Comum | BudGanja |
|------|-------|----------|
| **Baixar** | Tornar baixo / descer | [Gesto](${gesto}) — a altitude que cede |
| **a** | Artigo definido | A bola **desta** pessoa — o peito conhecido |
| **Bola** | Esfera do jogo (lat. *bulla*) | Peça do pátio — orgulho em forma de jogo |

**≠** *bola pra frente*: outra locução (seguir).  
**≠** *pisar na bola*: outra locução (errar).  
**≠** *dar bola* / *não dar bola*: atenção, não altitude.  
**≠** *[meter a mão](${mao}) na bola*: corte de futebol na ficha da mão — **não** esta âncora.

## 5. Baixar a bola × jogar areia

| Locução | Direcção | Ofício |
|---------|----------|--------|
| **[baixar a bola](${self})** | A altitude **própria** desce | Humildade / ritmo |
| **[jogar areia](${areia})** | O grão **entra** no jogo alheio | Atrito / sabotagem |

Duas bocas do pátio. Uma limpa o peito. A outra suja o campo do vizinho. Relacionar ≠ fundir.

## 6. O que parece × o que é

| Parece | É |
|--------|---|
| Ordem para calar quem tem razão | Convite a descer a **pose**, não a [verdade](${verdade}) |
| Humilhação | Sem [respeito](${respeito}) é [risco](${risco}), não método |
| Sinónimo de [jogar areia](${areia}) | Irmã invertida: uma desce; a outra atira |
| Táctica de futebol | Origem da imagem — o ofício é o peito |
| Desistir | Baixar a bola **não** é sair do [caminho](${caminho}) |

## 7. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Baixar a bola quando a marra tapa o ouvido |
| Bom | Reduzir o hype da colheita à medida do vaso |
| Bom | Acalmar o volume para a [relação](${relacao}) caber |
| Bom | *Baixa a bolinha* entre pares, sem palco |
| Mau | Usar «baixa a bola» para apagar quem só estava certo |
| Mau | Humilhar e chamar a isso modéstia |
| Mau | Confundir descer o peito com [jogar areia](${areia}) no outro |

## 8. Limites

- Não ensinamos a humilhar.  
- Não é regra de futebol nem de etiqueta de palco.  
- [Relação](${relacao}) sem [respeito](${respeito}) não vira método.  
- [Quem não arrisca não petisca](${petisca}) pede risco **calculado** — baixar a bola não cancela o lance; cancela a pose.

\`\`\`poem
${poemPt()}
\`\`\`

## Veredicto

**Aprovado** na série Expressões — **baixar a bola** = o [gesto](${gesto}) que desce a altitude para o [caminho](${caminho}) caber. Canónica: **modéstia de ritmo**. Irmã: [jogar areia](${areia}). Fecho: [Valeu !!!](${valeu}) · [eu amo a vida](${amo}) **com o peito no chão**, sem empinar o que ainda não deu fruto.

[▶ Expressões](${hub}) · [▶ Jogar areia](${areia}) · [▶ Respeito](${respeito}) · [▶ Alívio](${alivio}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${valeu}) · [▶ Palavras](${hubPalavras}) · [▶ Guia](${guia}) · [▶ Vida](${vida}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

Brazilian saying **«[baixar a bola](${self})»** — lower the **pride**, the volume, the hype. Field: *expressões populares baixar a bola e jogar areia*. Patio image: the ball rose too high; the game lives near the ground. Sister of **[jogar areia](${areia})** (grit in the **other’s** game). Inverse of puffing up. Cuts: humiliation as method, “ball forward”, stepping on the ball — named, **not** this âncora.

> Independent audit. [baixar](${WIKT_BAIXAR}), [bola](${WIKT_BOLA}). **Not** a humiliation guide or a football playbook.

## Object

| Field | Value |
|-------|-------|
| Saying | **baixar a bola** |
| Pieces | *baixar* (Lat. *bassus*) + *a* + *bola* (Lat. *bulla*) |
| Lab | Lower the hype / the PPFD / the voice when pride blocks the ear |
| Not | Humiliation as âncora · ball-forward · [jogar areia](${areia}) |
| Date | ${inspected} |

**H1:** *baixar* = come down; *bola* = the game-piece.  
**H2:** craft canon = modest rhythm.  
**H3:** sister of [jogar areia](${areia}) — opposite direction.  
**H4:** without [respeito](${respeito}), “baixa a bola” is [risco](${risco}).

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** approved. Pride on the ground. [Valeu !!!](${valeu}) · [eu amo a vida](${amo})

[▶ Sayings](${hub}) · [▶ Jogar areia](${areia}) · [▶ Respect](${respeito}) · [▶ Gesture](${gesto}) · [▶ Valeu !!!](${valeu})
`;

  const contentEs = `## Alcance

Dicho BR **«[baixar a bola](${self})»** — bajar el **orgullo**, el volumen, el hype. Pedido: *expressões populares baixar a bola e jogar areia*. Imagen de patio: la pelota subió de más; el juego vive cerca del suelo. Hermana de **[jogar areia](${areia})** (el grano en el juego **ajeno**). Inverso de inflar. Cortes: humillar como método, bola pra frente, pisar na bola — se nombran; **no** son esta âncora.

> Auditoría independiente. [baixar](${WIKT_BAIXAR}), [bola](${WIKT_BOLA}). **No** es guía de humillación ni táctica de fútbol.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **baixar a bola** |
| Piezas | *baixar* (lat. *bassus*) + *a* + *bola* (lat. *bulla*) |
| Lab | Bajar el hype / el PPFD / la voz cuando el orgullo tapa el oído |
| No es | Humillar como âncora · bola pra frente · [jogar areia](${areia}) |
| Fecha | ${inspected} |

**H1:** *baixar* = bajar; *bola* = la pieza del juego.  
**H2:** canónica = modestia de ritmo.  
**H3:** hermana de [jogar areia](${areia}) — dirección opuesta.  
**H4:** sin [respeito](${respeito}), «baixa a bola» es [risco](${risco}).

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** aprobado. Pecho en el suelo. [¡Valeu !!!](${valeu}) · [eu amo a vida](${amo})

[▶ Expresiones](${hub}) · [▶ Jogar areia](${areia}) · [▶ Respeto](${respeito}) · [▶ Gesto](${gesto}) · [▶ ¡Valeu !!!](${valeu})
`;

  return { body, contentEn, contentEs, wiki: WIKT_BAIXAR };
}

function buildBaixarABolaPost() {
  const { body, contentEn, contentEs, wiki } = buildBaixarABolaBodies();
  return expressaoPost({
    title: 'Inspeção: Baixar a bola — o orgulho que desce ao chão',
    titleEn: 'Inspection: Baixar a bola — pride that comes down to the ground',
    titleEs: 'Inspección: Baixar a bola — el orgullo que baja al suelo',
    excerpt:
      'Expressões: baixar a bola — descer o orgulho / o ritmo; ≠ humilhar ≠ bola pra frente ≠ pisar na bola; irmã de jogar areia; Valeu !!!',
    excerptEn:
      'Sayings: baixar a bola — lower the pride / the pace; ≠ humiliation ≠ ball-forward; sister of jogar areia; Valeu !!!',
    excerptEs:
      'Dichos: baixar a bola — bajar el orgullo / el ritmo; ≠ humillar ≠ bola pra frente; hermana de jogar areia; ¡Valeu !!!',
    slug: 'inspecao-expressao-baixar-a-bola',
    date: '2026-08-24T14:00:00.000Z',
    seriesOrder: pickOrder('inspecao-expressao-baixar-a-bola', 45),
    seriesLabel: 'Baixar a bola · pátio',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildBaixarABolaPost, buildBaixarABolaBodies, poemPt, poemEn, poemEs };
