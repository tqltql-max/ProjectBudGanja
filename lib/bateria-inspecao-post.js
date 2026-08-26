'use strict';

/**
 * Inspeção objecto · bateria
 * Fr. batterie ← battre «bater».
 * Três salas: artilharia, tambores, célula eléctrica.
 * Pedido de campo: objecto bateria (com automóvel e estrada).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/bateria-objeto-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/bateria';
const WIKT_FR = 'https://en.wiktionary.org/wiki/batterie#French';
const WIKI_PILHA = 'https://pt.wikipedia.org/wiki/Pilha_el%C3%A9trica';
const WIKI_BATERIA = 'https://pt.wikipedia.org/wiki/Bateria_(eletricidade)';

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

function poemPt() {
  return `Bateria.
Do francês batterie.
Bater em conjunto.

Primeiro os canhões.
Depois os tambores.
Depois as células.

No automóvel
é o pulso.
Sem ela, a máquina
é casca no leito.

Não é o Espírito.
É carga guardada.
O cruzamento lê o pulso
sem fundir a metáfora.

Valeu !!!
ligar
sem fingir que a célula
já é a vida.`;
}

function poemEn() {
  return `Bateria.
From French batterie.
To beat together.

First the guns.
Then the drums.
Then the cells.

In the car
it is the pulse.
Without it the machine
is a shell on the bed.

It is not the Spirit.
It is stored charge.
The cross reads the pulse
without fusing the metaphor.

Valeu !!!
to switch on
without pretending the cell
is already life.`;
}

function poemEs() {
  return `Bateria.
Del francés batterie.
Batir juntos.

Primero los cañones.
Después los tambores.
Después las celdas.

En el automóvil
es el pulso.
Sin ella, la máquina
es cáscara en el lecho.

No es el Espíritu.
Es carga guardada.
El cruce lee el pulso
sin fusionar la metáfora.

¡Valeu !!!
ligar
sin fingir que la celda
ya es la vida.`;
}

function buildBateriaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-bateria.html';
  const estrada = '/posts/post-inspecao-palavra-estrada.html';
  const automovel = '/posts/post-inspecao-palavra-automovel.html';
  const encruzilhada = '/posts/post-inspecao-palavra-encruzilhada.html';
  const cruzamento = '/posts/post-inspecao-cruzamento-estrada-encruzilhada-jesus-cristo.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const eletrizante = '/posts/post-inspecao-palavra-eletrizante.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const vidaEnergia = '/posts/post-inspecao-palavra-vida-energia.html';
  const objetos = '/objetos/';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const patinete = '/posts/post-inspecao-patinete-eletrico-criancas.html';
  const violao = '/posts/post-inspecao-palavra-violao.html';
  const canhao = '/posts/post-inspecao-palavra-canhao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial do **objecto [bateria](${self})** — fr. *batterie* ← *battre* («bater»): um **feixe que bate em conjunto**. Pedido de campo: *objeto bateria*, ao lado do [automóvel](${automovel}) e da [estrada](${estrada}). Esta ficha ancora o sentido **eléctrico** (célula / acumulador que dá pulso ao carro). As outras duas salas — **artilharia** e **tambores** — ficam **nomeadas** para não fundir. O cruzamento com [encruzilhada](${encruzilhada}) e Jesus Cristo vive na [ficha-cruzamento](${cruzamento}): a metáfora do pulso **não** afirma que a célula é o Espírito.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · bateria](${WIKT}), fr. [*batterie*](${WIKT_FR}), [Wikipédia · bateria (eletricidade)](${WIKI_BATERIA}), [pilha eléctrica](${WIKI_PILHA}). **Ficha ≠ ficha técnica de lítio, ≠ protocolo de incêndio, ≠ catecismo.** Células inflamam: ver [patinete](${patinete}) e [fogo](${fogo}). Sem afiliação com fabricantes. Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **bateria** (plural *baterias*) — nesta ficha: **acumulador eléctrico** do [automóvel](${automovel}) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | fr. *batterie* ← *battre* «bater» — «conjunto que bate» — confiança: **alta** |
| Família | *bater* · *batida* · *batedor* · *baterista* (outra sala) |
| Cognatos / mapa | esp. *batería* · ing. *battery* · fr. *batterie* · it. *batteria* |
| Tipo BudGanja | Objecto — pulso eléctrico × [automóvel](${automovel}) × [estrada](${estrada}) |
| Catálogo | [Objetos](${objetos}) · lema [objetos](${objetosLema}) |
| Três salas | 1. artilharia ([canhão](${canhao})) · 2. tambores (≠ [violão](${violao})) · 3. **células** (lema desta ficha) |
| Não é | Pilha de controlo remoto (escala) · *baterista* (pessoa) · «bateria cheia» como prova de [vida](${vida}) |
| Elo ofício | [ligar](${ligar}) · [eletrizante](${eletrizante}) · [interruptor](${interruptor}) · [risco](${risco}) · [fogo](${fogo}) |
| Fonte | [bateria](${WIKT}) · [eletricidade](${WIKI_BATERIA}) |
| Data | ${inspected} |

**O que é o objecto:** um **feixe de células** que guarda carga e a devolve quando o [automóvel](${automovel}) pede [ligar](${ligar}). No térmico clássico, arranca o motor; no eléctrico, **é** grande parte do andar. No lab: pulso **guardado**, não milagre.

## 2. Três salas (um étimo, três ofícios)

| Sala | Ofício | Nesta ficha |
|------|--------|-------------|
| **Artilharia** | Conjunto de [canhões](${canhao}) que «batem» juntos | Nomeada — não é o lema |
| **Tambores** | Peças de percussão; o baterista toca a *bateria* | Nomeada — ≠ [violão](${violao}) |
| **Eléctrica** | Células em série / paralelo (Volta: pilha) | **Lema** — pulso do [automóvel](${automovel}) |
| **Fala BR** | «Estou sem bateria» (telemóvel) | Extensão da sala 3 |

O inglês *battery* e o português *bateria* viajam juntos: o **feixe** (artilharia) emprestou o nome à **pilha** (várias células como vários canhões). Confiança: alta no empréstimo; o detalhe Volta / Planté fica como história da sala 3, não como aula de química.

**H1:** um étimo (*battre*) — três ofícios; o pedido de campo pede a **sala eléctrica**.  
**H2:** sem bateria, o [automóvel](${automovel}) na [estrada](${estrada}) é casca.  
**H3:** [vida / energia](${vidaEnergia}) é ficha irmã do pulso vivo; **não** fundir célula com alma.  
**H4:** [patinete](${patinete}) já avisou: lítio ≠ brinquedo; o mesmo aviso cabe no carro.

\`\`\`poem
${poemPt()}
\`\`\`

## 3. No automóvel — o pulso

| Tipo | Ofício | Limite |
|------|--------|--------|
| **Chumbo-ácido (12 V)** | Arranque do térmico; clássico do capô | Não é o tanque de combustível |
| **Lítio (EV / híbrido)** | Tração — a bateria **anda** | [Fogo](${fogo}) e descarte: [risco](${risco}) real |
| **Patinete / telemóvel** | A mesma sala, outra escala | Ficha [patinete](${patinete}) — crianças |
| **Metáfora do cruzamento** | Pulso que deixa seguir na [estrada](${estrada}) até à [encruzilhada](${encruzilhada}) | **Não** é doutrina: ver [cruzamento](${cruzamento}) |

## 4. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [automóvel](${automovel}) · [estrada](${estrada}) | A máquina e o leito que pedem pulso |
| [encruzilhada](${encruzilhada}) · [cruzamento](${cruzamento}) | O X; Jesus Cristo — metáfora sem fusão |
| [ligar / desligar](${ligar}) · [interruptor](${interruptor}) · [eletrizante](${eletrizante}) | Corte, ignição, carga |
| [vida](${vida}) · [vida / energia](${vidaEnergia}) | O pulso vivo — **outra** ficha |
| [patinete](${patinete}) · [fogo](${fogo}) · [risco](${risco}) | Célula, chama, limite |
| [canhão](${canhao}) · [violão](${violao}) | Salas 1 e 2 — não fundir |
| [caminho](${caminho}) · [Objetos](${objetos}) · [Vida](${vidaHub}) · [Valeu !!!](${mantra}) | Método, catálogo, fecho |

## 5. O que esta ficha não é

- **Não** é dimensionamento de Ah, BMS nem tabela de marcas.  
- **Não** é aula de bateria musical nem de artilharia.  
- **Não** afirma que a célula **é** o Espírito, a [vida](${vida}) ou Jesus Cristo — isso seria fundir a metáfora; o [cruzamento](${cruzamento}) declara o corte.  
- **Não** substitui o aviso de [fogo](${fogo}) do [patinete](${patinete}).  
- **Não** ensina a abrir, furar ou improvisar célula.

## 6. Veredicto

**Aprovado** — **bateria** fichada como objecto: fr. *batterie* (*battre*); lema = **célula / acumulador** do [automóvel](${automovel}) na [estrada](${estrada}); salas artilharia e tambores nomeadas e cortadas do eixo; pulso ≠ alma. [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Automóvel](${automovel}) · [▶ Estrada](${estrada}) · [▶ Cruzamento](${cruzamento}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the **object [bateria](${self})** — Fr. *batterie* ← *battre* (“to beat”): a **set that beats together**. Field request: object *bateria* with [automóvel](${automovel}) and [estrada](${estrada}). This sheet anchors the **electrical** sense (cell / accumulator). Artillery and drums are **named** so they are not fused. Metaphor of pulse on the [cross sheet](${cruzamento}) does **not** claim the cell is the Spirit.

> Independent audit. [bateria](${WIKT}). **Not a lithium datasheet, not a catechism.** Fire: see [e-scooter](${patinete}). Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Object | **bateria** — here: car electrical accumulator |
| Etymon | Fr. *batterie* ← *battre* — high |
| Three rooms | artillery · drums · **cells** (this lemma) |
| Date | ${inspected} |

**H1:** one etymon, three crafts; the field asked for the **electrical** room.  
**H2:** without battery the [car](${automovel}) on the [road](${estrada}) is a shell.  
**H3:** [vida / energia](${vidaEnergia}) is a sister sheet — do **not** fuse cell and soul.

\`\`\`poem
${poemEn()}
\`\`\`

## Verdict

**Approved** — bateria as stored pulse of the [automóvel](${automovel}); other rooms named and cut; [cross sheet](${cruzamento}) for Jesus Christ. [Valeu !!!](${mantra})

[▶ Objects](${objetos}) · [▶ Automóvel](${automovel}) · [▶ Estrada](${estrada}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del **objeto [bateria](${self})** — fr. *batterie* ← *battre*: un **haz que bate junto**. Pedido: objeto *bateria* con [automóvel](${automovel}) y [estrada](${estrada}). Esta ficha ancla el sentido **eléctrico**. Artillería y tambores quedan **nombrados**. La metáfora del pulso en el [cruce](${cruzamento}) **no** afirma que la celda sea el Espíritu.

> Auditoría independiente. [bateria](${WIKT}). **Ficha ≠ ficha de litio, ≠ catecismo.** Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Objeto | **bateria** — aquí: acumulador del automóvil |
| Étimo | fr. *batterie* ← *battre* — alta |
| Tres salas | artillería · tambores · **celdas** (lema) |
| Fecha | ${inspected} |

**H1:** un étimo, tres oficios; el campo pidió la sala **eléctrica**.  
**H2:** sin batería el [auto](${automovel}) en la [estrada](${estrada}) es cáscara.  
**H3:** no fusionar celda y alma.

\`\`\`poem
${poemEs()}
\`\`\`

## Veredicto

**Aprobada** — bateria como pulso guardado del [automóvel](${automovel}); Jesucristo en el [cruce](${cruzamento}). [¡Valeu !!!](${mantra})

[▶ Objetos](${objetos}) · [▶ Automóvel](${automovel}) · [▶ Estrada](${estrada}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildBateriaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildBateriaBodies();
  const order = Number.isFinite(seriesOrder)
    ? seriesOrder
    : pickOrder('inspecao-palavra-bateria', 202);
  return makePalavra({
    title: 'Inspeção: Bateria — o pulso do automóvel (≠ tambor ≠ canhão)',
    titleEn: 'Inspection: Bateria — the car’s pulse (≠ drum ≠ cannon)',
    titleEs: 'Inspección: Bateria — el pulso del automóvil (≠ tambor ≠ cañón)',
    excerpt:
      'Objecto: bateria (fr. batterie ← battre) — feixe; lema = célula do automóvel na estrada; salas artilharia/tambores nomeadas; pulso ≠ alma; Valeu !!!',
    excerptEn:
      'Object: bateria (Fr. batterie ← battre) — a set that beats; lemma = car cell on the road; artillery/drums named; pulse ≠ soul; Valeu !!!',
    excerptEs:
      'Objeto: bateria (fr. batterie ← battre) — haz; lema = celda del auto en la estrada; artillería/tambores nombrados; pulso ≠ alma; ¡Valeu !!!',
    slug: 'inspecao-palavra-bateria',
    date: '2026-08-24T16:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Bateria · objecto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildBateriaPost,
  buildBateriaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKI_BATERIA
};
