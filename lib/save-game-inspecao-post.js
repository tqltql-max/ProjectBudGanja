'use strict';

/**
 * Inspeção Palavras · Save Game
 * Eixos: EN save + game no menu BR · salvar / gravar / guardar ·
 * slot × rasto · ≠ Load / New / backspace · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/save-game-palavra-cover.jpg';
const WIKT_SAVE = 'https://en.wiktionary.org/wiki/save#English';
const WIKT_GAME = 'https://en.wiktionary.org/wiki/game#English';
const WIKT_SALVAR = 'https://pt.wiktionary.org/wiki/salvar';
const WIKI = 'https://en.wikipedia.org/wiki/Saved_game';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Save Game.
Duas peças inglesas
no menu brasileiro.

Não é o jogo.
É o rasto do jogo —
o sítio onde a partida
ainda cabe amanhã.

Salve tudo
não pede milagre.
Pede um slot:
gravar o que a mão
já fez de melhor.

Quem sai sem gravar
confia no ar.
Quem grava e sai
deixa uma porta.

Valeu !!!
slot 1 —
o ofício ainda está lá.`;
}

function poemEn() {
  return `Save Game.
Two English pieces
on a Brazilian menu.

It is not the game.
It is the trail of the game —
the place where the match
still fits tomorrow.

Save all
does not ask for a miracle.
It asks for a slot:
to write what the hand
already did at its best.

Whoever leaves without saving
trusts the air.
Whoever saves and leaves
leaves a door.

Valeu !!!
slot 1 —
the craft is still there.`;
}

function poemEs() {
  return `Save Game.
Dos piezas inglesas
en el menú brasileño.

No es el juego.
Es el rastro del juego —
el sitio donde la partida
aún cabe mañana.

Salve tudo
no pide milagro.
Pide un slot:
grabar lo que la mano
ya hizo de mejor.

Quien sale sin grabar
confía en el aire.
Quien graba y sale
deja una puerta.

¡Valeu !!!
slot 1 —
el oficio sigue ahí.`;
}

function buildSaveGameBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-save-game.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const passado = '/posts/post-inspecao-palavra-passado.html';
  const fui = '/posts/post-inspecao-palavra-fui.html';
  const fight = '/posts/post-inspecao-palavra-fight.html';
  const hp = '/posts/post-inspecao-palavra-hp.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const jogos = '/jogos/';
  const mk = '/posts/post-inspecao-jogo-mortal-kombat.html';

  const body = `## Escopo

Inspeção editorial de **[Save Game](${self})** — composto inglês vivo no menu brasileiro: **gravar a partida**. Pedido de campo no mesmo sopro: *salve tudo* / *inspeção da palavra Save Game* / *faça seu melhor*. Não é walkthrough. Não é tutorial de pirataria. Objecto = a **fórmula de menu** e o **ofício de não perder o rasto**.

> **Nota metodológica:** auditoria independente. Fontes: [save](${WIKT_SAVE}), [game](${WIKT_GAME}), [salvar](${WIKT_SALVAR}), [saved game](${WIKI}). **Ficha ≠ manual de save scum, ≠ cópia ilegal, ≠ cloud de marca.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}).

**Gatilho:** *Save Game* / *savegame* / *salve tudo* / *salvar o jogo*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Save Game** (EN; menu / HUD) |
| Irmãs PT | **salvar o jogo** · **gravar o jogo** · **guardar a partida** · oral **salve tudo** |
| Peças | *save* (guardar / resgatar) + *game* (jogo / partida) |
| Étimo (trabalho) | EN *save* ← lat. *salvāre* («pôr a salvo») · EN *game* ← germ. *gaman* («diversão / partida») — confiança: **alta** |
| Família de menu | *New Game* · *Load Game* · *Continue* · *Autosave* · *Checkpoint* · *slot* |
| Tipo BudGanja | Palavra — empréstimo de menu × rasto da partida |
| Não é | o [jogo](${jogos}) em si · [backspace](${backspace}) (apagar) · [fui](${fui}) sem gravar |
| Elo ofício | [Faça o seu melhor](${faca}) — grava-se o que a mão **já fez** |
| Fonte | [saved game](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** um **botão de memória**. O *game* continua a ser o jogo; o *save* é o **ficheiro do rasto** — slot, cartão, nuvem, bateria. Sem save, a partida é só presente. Com save, o [passado](${passado}) da sessão ainda cabe amanhã.

## Hipóteses e método

**H1:** *Save Game* < EN *save* + *game* — fórmula de menu, não frase solta (alta).  
**H2:** no BR a boca diz **salve tudo** / **salva aí**; o ecrã muitas vezes deixa o inglês.  
**H3:** *salvar* (pôr a salvo) e *gravar* (inscrever) são irmãs; o ofício é o mesmo: **não perder**.  
**H4:** [Load Game](${self}) é a porta de volta; **New Game** apaga o começo; **Save** escreve o meio.  
**H5:** [backspace](${backspace}) corrige o rascunho; Save **fixa** o rascunho. Eixos opostos.  
**H6:** [fui](${fui}) sem save é saída no ar; save + saída é porta.  
**H7:** [Faça o seu melhor](${faca}) pede o gesto; Save Game **guarda** o gesto.  
**H8:** fecho = [Valeu !!!](${mantra}).

## Forma e variantes

| Forma | Ofício |
|-------|--------|
| **Save Game** | Canónica de menu EN — pedido de campo |
| savegame / save-game | Grafia colada / hífen — o mesmo objecto |
| *Save* / *Salvar* | Botão curto — ainda é a partida |
| **salve tudo** | Oral BR — gravar o conjunto, não um pixel |
| salvar / gravar / guardar | PT — resgatar × inscrever × pôr de lado |
| Autosave / checkpoint | O jogo grava sozinho — rasto sem o [gesto](${gesto}) do botão |
| slot 1 / slot 2 | Lugar do ficheiro — não é o jogo |

**Veredicto de forma:** o laboratório ficheia **Save Game** (duas peças visíveis) e honra **salve tudo** como voz viva. Não impõe inglês no peito de quem diz *gravar*.

## O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Menu** | Mais um item em inglês | Fórmula de **persistência** |
| **Cloud** | O jogo «está na conta» | Cópia noutro sítio — ainda é rasto, não milagre |
| **Autosave** | Segurança total | Conveniência; o ofício manual continua a valer |
| **Save scum** | Truque de mestre | Reler o [passado](${passado}) até o acaso gostar — limite desta ficha |
| **BudGanja** | Botão de cobardia | **Ofício:** não perder o que [já foi o melhor](${faca}) |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Cortar *Save Game* (menu) × *game* ([partida](${jogos})) × *save* (o rasto) |
| Bom | Distinguir Load / New / Continue / Autosave |
| Bom | Gravar **depois** de [fazer o seu melhor](${faca}) — não em vez de jogar |
| Mau | Transformar a ficha em guia de save scum ou de ficheiro ilegal |
| Mau | Confundir com [backspace](${backspace}) — apagar não é gravar |
| Mau | Sair com [fui](${fui}) e culpar o jogo por não ter slot |

## Save × Load × New × backspace × fui

| Peça | Gesto |
|------|-------|
| **Save Game** | Escrever o meio |
| **Load Game** | Ler o meio de novo |
| **New Game** | Começar sem aquele rasto |
| **[backspace](${backspace})** | Corrigir / apagar o rascunho |
| **[fui](${fui})** | Sair — com ou sem porta |
| **[buguei](${buguei})** | Tranco — o save às vezes é a única ponte |

## O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Skill](${skill}) · [Fight](${fight}) · [HP](${hp}) | Léxico de ecrã / HUD |
| [Mortal Kombat](${mk}) · [Jogos](${jogos}) | O *game* como catálogo — esta ficha é o **botão** |
| [Faça o seu melhor](${faca}) | O gesto que merece slot |
| [passado](${passado}) · [fui](${fui}) · [backspace](${backspace}) | Tempo, saída, apagamento |
| [buguei](${buguei}) | Quando o presente trava |
| [gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) | Ofício |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Empréstimo no solo BR |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina a falsificar ficheiros nem a pirataria.  
- Não é walkthrough nem ranking de «melhor save».  
- Autosave de marca ≠ endosso comercial.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — *Save Game* fichado como *save* + *game*; voz viva **salve tudo**; irmãs Load / New; ofício = rasto, não milagre.

[▶ Palavras](${hub}) · [▶ Skill](${skill}) · [▶ Faça o seu melhor](${faca}) · [▶ Jogos](${jogos}) · [▶ Valeu !!!](${mantra}) · [saved game](${WIKI})
`;

  const contentEn = `## Scope

Inspection of **Save Game** — English menu compound alive in Brazilian Portuguese: persist the match. Field voice: *salve tudo*. Not a walkthrough. Not a piracy sheet. Object = the **menu formula** and the craft of not losing the trail.

Save (Lat. *salvāre*, to keep safe) + game (play / match). Sisters: Load Game, New Game, Continue, Autosave. Opposite of [backspace](${backspace}) (erase). [Fui](${fui}) without a save is leaving on air; save then leave is a door. [Do your best](${faca}) is the gesture; Save Game **keeps** the gesture.

## Status

**Approved in Words** — *save* + *game*; living *salve tudo*; craft = trail, not miracle.

[▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Save Game** — compuesto inglés vivo en el menú brasileño: grabar la partida. Voz de campo: *salve tudo*. No es walkthrough. No es ficha de piratería. Objeto = la **fórmula de menú** y el oficio de no perder el rastro.

Save (lat. *salvāre*) + game (juego / partida). Hermanas: Load, New, Continue, Autosave. Lo contrario de [backspace](${backspace}) (borrar). [Fui](${fui}) sin save es salida en el aire. [Haz tu mejor](${faca}) es el gesto; Save Game **guarda** el gesto.

## Estado

**Aprobada en Palabras** — *save* + *game*; voz viva *salve tudo*; oficio = rastro, no milagro.

[▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildSaveGamePost() {
  const { body, contentEn, contentEs } = buildSaveGameBodies();
  const seriesOrder = pickOrder('inspecao-palavra-save-game', 280);
  return makePalavra({
    title: 'Inspeção: Save Game — gravar a partida; o rasto, não o milagre',
    titleEn: 'Inspection: Save Game — persist the match; the trail, not the miracle',
    titleEs: 'Inspección: Save Game — grabar la partida; el rastro, no el milagro',
    excerpt:
      'Palavras: Save Game = save + game; salve tudo; salvar/gravar/guardar; ≠ Load/New/backspace; Valeu !!!',
    excerptEn:
      'Words: Save Game = save + game; living salve tudo; ≠ Load/New/backspace; Valeu !!!',
    excerptEs:
      'Palabras: Save Game = save + game; salve tudo; ≠ Load/New/backspace; ¡Valeu !!!',
    slug: 'inspecao-palavra-save-game',
    date: '2026-08-23T18:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Save Game · palavra',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSaveGamePost,
  buildSaveGameBodies,
  poemPt,
  poemEn,
  poemEs
};
