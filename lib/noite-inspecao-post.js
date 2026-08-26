'use strict';

/**
 * Inspeção Palavras · noite
 * Eixos: lat. nox · escuro / ciclo · sol × noite · luz artificial ·
 * interruptor · inverno · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildNoiteBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const cultivo = '/guia/cultivo-basico.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const ligarDesligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const inverno = '/posts/post-inspecao-palavra-inverno.html';
  const gelo = '/posts/post-inspecao-palavra-gelo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/noite';
  const wikiLat = 'https://en.wiktionary.org/wiki/nox#Latin';

  const body = `## Escopo

Inspeção editorial da palavra **noite** — o **lado escuro do ciclo**: quando o [sol](${sol}) baixa e a [luz](${luz}) natural rarefaz. No mapa BudGanja: fotoperíodo (escuro necessário no [cultivo](${cultivo})), metáfora de pausa / [medo](${medo}) / descanso, e o momento em que o [interruptor](${interruptor}) ganha ofício ([ligar × desligar](${ligarDesligar})). Esta ficha cobre o **étimo** (lat. *nox*), as **camadas BR**, o par com [sol](${sol}), elos [luz](${luz}), [inverno](${inverno}) e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · noite](${wiki}), [nox (EN)](${wikiLat}), [sol](${sol}), [luz](${luz}), série [Palavras](${hub}). **Ficha ≠ horóscopo nem manual de sono clínico.** Tom: Inspetor BudGanja — noite com ofício ≠ romantizar o buraco.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **noite** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Lat. *nox, noctis* («noite») → PT *noite* — confiança: **alta** |
| Família | *nocturno* · *anoitecer* · *boa noite* · *meia-noite* · *noitada* · *pernoite* |
| Cognatos | esp. *noche* · fr. *nuit* · it. *notte* · ing. *night* · lat. *nox* |
| Tipo BudGanja | Palavra — ciclo × escuro × pausa × fotoperíodo |
| Elo ciclo | [sol](${sol}) — dia × noite |
| Elo claridade | [luz](${luz}) — o que falta ou se acende na noite |
| Elo circuito | [interruptor](${interruptor}) · [ligar × desligar](${ligarDesligar}) — luz artificial quando o sol some |
| Elo vivo | [fogo](${fogo}) · [sinal](${sinal}) · [gesto](${gesto}) · [medo](${medo}) |
| Elo ofício | [verdade](${verdade}) · [caminho](${caminho}) · [risco](${risco}) · [cultivo](${cultivo}) |
| Elo gelo | [inverno](${inverno}) · [gelo](${gelo}) — noites longas |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · noite](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o nome do **período escuro** entre um pôr e um nascer do [sol](${sol}) — e, por extensão, a **pausa**, o **silêncio**, o **medo** e o **descanso**. No lab: metade do fotoperíodo; sem noite, a planta (e o ofício) não cicla.

## 2. Noite × sol × luz × circuito

| Papel | Ficha | Leitura |
|-------|-------|---------|
| **Dia / fonte** | [Sol](${sol}) | Astro — luz natural |
| **Escuro / ciclo** | **Noite** (esta ficha) | Quando o sol baixa |
| **Claridade** | [Luz](${luz}) | Natural de dia; artificial na noite |
| **Peça / verbo** | [Interruptor](${interruptor}) · [Ligar × Desligar](${ligarDesligar}) | Clique que acende a noite |

**Tese:** noite não é só «falta de luz» — é **fase do ciclo**. O circuito lab **responde** à noite; não a apaga do mapa.

## 3. Camadas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Tempo / ciclo** | Após o pôr do sol; boa noite | Alta |
| **Escuro físico** | Pouca ou nenhuma luz natural | Alta |
| **Cultivo** | Escuro obrigatório (fotoperíodo) | Alta (mapa BudGanja) |
| **Afecto** | Medo, descanso, intimidade, festa | Alta |
| **Figurado** | «Noite escura»; «passar a noite» | Alta |
| **Ofício lab** | Pausar, desligar, proteger o escuro | Lab |

**H1:** *noite* < lat. *nox* — escuro do ciclo (alta confiança).  
**H2:** par vivo com [sol](${sol}); [luz](${luz}) artificial entra quando a noite pede clique.  
**H3:** no cultivo, roubar a noite = quebrar o fotoperíodo.

## 4. Distinções úteis

| Par | Diferença |
|-----|-----------|
| **noite** vs **[sol](${sol})** | Escuro do ciclo × astro / dia |
| **noite** vs **[luz](${luz})** | Fase escura × claridade (efeito) |
| **noite** vs **[inverno](${inverno})** | Ciclo diário × estação (noites longas) |
| **noite** vs **[medo](${medo})** | Tempo/escuro × afecto (podem cruzar) |
| **noite** vs **[desligar](${ligarDesligar})** | Fase do céu × gesto no interruptor |

## 5. Rede BudGanja

| Elo | Papel |
|-----|-------|
| [Sol](${sol}) | Par do ciclo — dia × noite |
| [Luz](${luz}) | O que some ou se acende |
| [Interruptor](${interruptor}) · [Ligar × Desligar](${ligarDesligar}) | Ofício na noite artificial |
| [Inverno](${inverno}) · [Gelo](${gelo}) | Noites longas / Tamara |
| [Medo](${medo}) · [Risco](${risco}) | Escuro com mapa, não pânico |
| [Cultivo](${cultivo}) | Escuro como fase — não falha |
| [Valeu !!!](${mantra}) · [poema](${poemMantra}) | Melhor noite **hoje** — inclusive a que se respeita sem luz |

## 6. Valeu !!!

| Campo | Valor |
|-------|-------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **hoje**, inclusive a noite (descanso, escuro, pausa) |
| Veredicto | Noite sem [verdade](${verdade}) = buraco; noite com ofício = ciclo no [caminho](${caminho}). |

**H4:** fecho = [Valeu !!!](${mantra}) — honrar a noite sem romantizar nem apagar o mapa.

## Estado

**Aprovado** — **noite** fichada como fase do ciclo; par com [sol](${sol}); elos [luz](${luz}), circuito e [cultivo](${cultivo}); [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Sol](${sol}) · [▶ Luz](${luz}) · [▶ Interruptor](${interruptor}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **noite** (night) — the dark side of the cycle when the [sun](${sol}) sets and natural [luz](${luz}) thins. Grow photoperiod; pause / [medo](${medo}); when the [interruptor](${interruptor}) earns its craft.

> Sources: [noite](${wiki}), [nox](${wikiLat}), [sol](${sol}), [luz](${luz}). Not a sleep-clinic manual.

## Night × sun × light × circuit

| Role | Sheet |
|------|-------|
| Day / source | [Sol](${sol}) |
| Dark / cycle | **Noite** (this sheet) |
| Clarity | [Luz](${luz}) |
| Device / verb | [Interruptor](${interruptor}) · [ligar × desligar](${ligarDesligar}) |

## Etymon

Lat. *nox, noctis* → PT *noite* — high confidence. Steal the night in the grow = break photoperiod.

## Valeu !!!

Best night **today** — including rest and darkness with craft. Night without [truth](${verdade}) = hole; with method = cycle on the [path](${caminho}).

## Status

**Approved** — noite as cycle phase; pair with [sol](${sol}); links [luz](${luz}) and the circuit.

[▶ Words](${hub}) · [▶ Sol](${sol}) · [▶ Luz](${luz}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **noite** — el lado oscuro del ciclo cuando baja el [sol](${sol}) y escasea la [luz](${luz}) natural. Fotoperiodo; pausa / [medo](${medo}); cuando el [interruptor](${interruptor}) gana oficio.

> Fuentes: [noite](${wiki}), [nox](${wikiLat}), [sol](${sol}), [luz](${luz}). No es manual clínico de sueño.

## Noche × sol × luz × circuito

| Rol | Ficha |
|-----|-------|
| Día / fuente | [Sol](${sol}) |
| Oscuro / ciclo | **Noite** (esta ficha) |
| Claridad | [Luz](${luz}) |
| Pieza / verbo | [Interruptor](${interruptor}) · [ligar × desligar](${ligarDesligar}) |

## Étimo

Lat. *nox, noctis* → PT *noite*. Robar la noche en el cultivo = romper fotoperiodo.

## ¡Valeu !!!

La mejor noche **hoy** — incluso descanso y oscuridad con oficio. Noche sin [verdad](${verdade}) = agujero; con método = ciclo en el [camino](${caminho}).

## Estado

**Aprobada** — noite como fase del ciclo; par con [sol](${sol}); elos [luz](${luz}) y el circuito.

[▶ Palabras](${hub}) · [▶ Sol](${sol}) · [▶ Luz](${luz}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildNoitePost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildNoiteBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 118;
  return makePalavra({
    title: 'Inspeção: Noite — ciclo, escuro e fotoperíodo',
    titleEn: 'Inspection: Noite — cycle, dark and photoperiod',
    titleEs: 'Inspección: Noite — ciclo, oscuridad y fotoperiodo',
    excerpt:
      'Palavras: «noite» (lat. *nox*) — fase escura do ciclo; par com sol; elos luz e interruptor; cultivo; Valeu !!!',
    excerptEn:
      'Words: “noite” (Lat. *nox*) — dark phase of the cycle; pair with sol; links luz and interruptor; grow; Valeu !!!',
    excerptEs:
      'Palabras: «noite» (lat. *nox*) — fase oscura del ciclo; par con sol; vínculos luz e interruptor; cultivo; ¡Valeu !!!',
    slug: 'inspecao-palavra-noite',
    date: '2026-08-04T18:35:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Noite · sol · luz',
    coverImage: '/imagens/inspecoes/noite-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildNoitePost,
  buildNoiteBodies
};
