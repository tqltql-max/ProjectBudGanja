'use strict';

/**
 * Inspeção Palavras · liberdade
 * Eixos: lat. lībertās · livre / libre · bairro SP · filme Shawshank ·
 * linha DSL «estou livre» · Liberdade cantouou · Ufa!!! · Valeu !!!
 * Pedido: inspeçao em Liberdade · Nos Estamos Libre · liberdaded total.
 * Ficha de vocábulo — não manifesto, não constituição, não catecismo.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/liberdade-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/liberdade';
const WIKT_LA = 'https://en.wiktionary.org/wiki/libertas#Latin';
const WIKI_BAIRRO = 'https://pt.wikipedia.org/wiki/Liberdade_(S%C3%A3o_Paulo)';

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
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Liberdade.
Uma palavra com peso.
Não é o bairro sozinho.
Não é o filme sozinho.
Não é a linha do telefone
quando a voz ficou livre.

Livre é o adjectivo.
Libre é a irmã em espanhol.
Liberdade é o nome.

Cantouou —
a boca repetiu o canto.
Ufa!!! —
o peito largou o ar.

Liberdade total
não é carta branca.
É olhar de novo
todas as salas
e não fundir nenhuma.

Valeu !!!
com respeito —
sem sermão no vocábulo.`;
}

function poemEn() {
  return `Liberdade.
A word with weight.
Not the neighbourhood alone.
Not the film alone.
Not the phone line
when the voice stayed free.

Livre is the adjective.
Libre is the Spanish sister.
Liberdade is the name.

Cantouou —
the mouth repeated the song.
Ufa!!! —
the chest let the air go.

Total freedom
is not a blank cheque.
It is looking again
at every room
and fusing none.

Valeu !!!
with respect —
no sermon on the word.`;
}

function poemEs() {
  return `Liberdade.
Una palabra con peso.
No es el barrio solo.
No es el filme solo.
No es la línea del teléfono
cuando la voz quedó libre.

Livre es el adjetivo.
Libre es la hermana.
Liberdade es el nombre.

Cantouou —
la boca repitió el canto.
¡Ufa!!! —
el pecho soltó el aire.

Libertad total
no es carta blanca.
Es mirar de nuevo
todas las salas
y no fusionar ninguna.

¡Valeu !!!
con respeto —
sin sermón en el vocablo.`;
}

function buildLiberdadeBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-liberdade.html';
  const dsl = '/posts/post-inspecao-palavra-dsl.html';
  const discada = '/posts/post-inspecao-palavra-internet-discada.html';
  const filme = '/posts/post-inspecao-filme-um-sonho-de-liberdade.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const bic = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const clipper = '/posts/post-inspecao-palavra-isqueiro-clipper.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[liberdade](${self})** — lat. *lībertās* («condição de quem é *līber*»). Pedidos de campo no mesmo sopro: *inspeçao em Liberdade* · *Estou Estou Livre* · *Nos Estamos Libre* · *Liberdade Cantouou* · *Ufa!!!* · *liberdaded total* · *reveja o projeto todo e faça o melhor possivel*.

Objecto = o **vocábulo**. Não é tratado de direitos. Não é hino. Não é bairro. Não é filme. Não é a linha [DSL](${dsl}) «livre». O lab honra cada sopro e **corta as salas**. [Respeito](${respeito}) a quem vive a palavra; **sem** manifesto.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · liberdade](${WIKT}), [lībertās](${WIKT_LA}), [Liberdade (São Paulo)](${WIKI_BAIRRO}). **Ficha ≠ constituição, ≠ comício, ≠ software livre, ≠ laudo de prisão.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Ufa!!!](${ufa}) · [Valeu !!!](${mantra}).

**Gatilho:** *liberdade* / *liberdaded* / *livre* / *libre* / *liberdade total* / *liberdade cantou*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **liberdade** (PT) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Lat. *lībertās, -ātis* ← *līber* «livre» — confiança: **alta** |
| Adjectivo irmão | **livre** (PT) · **libre** (ES) — qualidade; não o nome |
| Tipo BudGanja | Palavra — nome × salas que a orelha cola |
| Não é | Bairro SP · [filme Shawshank](${filme}) · linha [DSL](${dsl}) livre · [legal](${legal}) · [Ufa!!!](${ufa}) |
| Data | ${inspected} |
| Fonte | [liberdade](${WIKT}) |

**O que é o objecto:** o **nome** da condição / do espaço de quem não está cativo — no léxico. O lab nomeia; não legisla.

## 2. Sopro de campo — as salas

[A orelha cola](${orelha}); o ofício **corta**.

| Sopro | Sala |
|-------|------|
| **liberdade** | Esta ficha — o vocábulo |
| **livre** | Adjectivo (*estou livre*) — qualidade, não o substantivo |
| **libre** / *Nos Estamos Libre* | Espanhol *libre* + *nosotros estamos libres* (género/número); irmã, não o lema PT |
| **Estou Estou Livre** | Eco do adjectivo; no cobre dos 2000, «a linha está livre» = [DSL](${dsl}) ≠ esta palavra |
| **DLS** | Anagrama de [DSL](${dsl}) — outra ficha |
| **Liberdade Cantouou** | Canto / hino / estádio (*liberdade, liberdade*); o *ouou* é a boca a repetir — honrar o lapso, não partitura |
| **Liberdade (SP)** | Bairro — topónimo japonês-paulistano; **homógrafo**, outro mapa |
| **[Um Sonho de Liberdade](${filme})** | Título BR de *The Shawshank Redemption* — ficha de **Arte**, não desta |
| **liberdade total** | Pedido de olhar **todas** as salas; **não** carta branca para fundir |
| **[Ufa!!!](${ufa})** | Sopro **depois** do aperto — alívio, não sinónimo |
| **[legal](${legal})** / ilícito | Eixo da lei — vizinho; não o mesmo étimo de *līber* |
| **software livre** | Outra sala (licença); não cabe aqui |

**H-sopro:** *Nos Estamos Libre* ≠ «nós somos a liberdade». É o adjectivo em espanhol, no plural, colado ao nome PT.  
**H-DSL:** *estou livre* no telefone = a [discada](${discada}) largou a voz; a [DSL](${dsl}) **fica**. Não é libertas.  
**H-canto:** *cantouou* = o canto **disse** a palavra; a ficha não é o hino.

## 3. Hipóteses

**H1:** *liberdade* PT = lat. *lībertās* — alta.  
**H2:** *livre* (adj.) e *liberdade* (nome) são família; não são a mesma peça.  
**H3:** *libre* ES = a mesma raiz; a boca misturou as línguas — cortar, não corrigir com raiva.  
**H4:** o bairro Liberdade e o filme [Um Sonho de Liberdade](${filme}) **usam** o vocábulo; não o esgotam.  
**H5:** «liberdade total» neste lab = inspeção **completa das salas**, não licença sem [respeito](${respeito}).  
**H6:** [Ufa!!!](${ufa}) vem **depois**; [Faça o seu melhor](${faca}) é o ofício; [Valeu !!!](${mantra}) fecha.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | Bairro = filme = lei = linha | Homógrafos e vizinhanças |
| **Estou livre** | Sempre libertas | Pode ser adjectivo, DSL, ou saída |
| **Cantou** | A ficha é a música | A boca cantou o **nome** |
| **Total** | Sem limite | Sem **fundir** salas |
| **Ufa** | = liberdade | Alívio **depois** do aperto |

## 5. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *liberdade* como vocábulo e apontar a sala certa |
| Bom | Cortar bairro / filme / DSL / *libre* / [Ufa!!!](${ufa}) |
| Bom | [Respeito](${respeito}) a quem reza, canta ou mora a palavra |
| Mau | Manifesto político no lugar da ficha |
| Mau | Fundir *lībertās* com [legal](${legal}) (*lex*) |
| Mau | Tutorial de fuga (isso já está recusado na ficha do [filme](${filme})) |

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Um Sonho de Liberdade](${filme}) | O filme — outra série |
| [DSL](${dsl}) · [internet discada](${discada}) | «Linha livre» — outro ofício |
| [Ufa!!!](${ufa}) | Sopro depois |
| [legal](${legal}) | Lei — vizinho, outro étimo |
| [respeito](${respeito}) · [vida](${vida}) · [língua portuguesa](${lingua}) | Ofício |
| [Isqueiro BIC](${bic}) · [Clipper](${clipper}) | O par de bolso fechado no mesmo dia — outro género |
| [Faça o seu melhor](${faca}) | Pedido *faça o melhor possível* |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é artigo da Constituição nem história do bairro Liberdade.  
- Não comenta o filme além do **corte** de título.  
- Não é manual de DSL.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **liberdade** fichada como *lībertās*; salas cortadas (bairro, filme, DSL, *libre*, canto, Ufa). *Liberdade total* = olhar todas; fundir nenhuma. [Faça o seu melhor](${faca}). [Ufa!!!](${ufa}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Filme](${filme}) · [▶ DSL](${dsl}) · [▶ Ufa!!!](${ufa}) · [▶ Faça o seu melhor](${faca}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **liberdade** — Lat. *lībertās*. Field: *Liberdade*; *Estou Estou Livre*; *Nos Estamos Libre*; *Liberdade Cantouou*; *total freedom*. The object is the **word**. Not a manifesto. Not the São Paulo neighbourhood. Not [The Shawshank Redemption](${filme}). Not a [DSL](${dsl}) “free line”.

## Status

**Approved in Words.** Rooms cut. [Ufa!!!](${ufa}) · [Valeu !!!](${mantra})

[▶ Film](${filme}) · [▶ DSL](${dsl}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **liberdade** — lat. *lībertās*. Pedido: *Liberdade*; *Nos Estamos Libre*; *libertad total*. El objeto es el **vocablo**. No es manifiesto. No es el barrio. No es [el filme](${filme}). No es la línea [DSL](${dsl}).

## Estado

**Aprobada en Palabras.** Salas cortadas. [¡Ufa!!!](${ufa}) · [¡Valeu !!!](${mantra})

[▶ Filme](${filme}) · [▶ DSL](${dsl}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildLiberdadePost() {
  const { body, contentEn, contentEs } = buildLiberdadeBodies();
  const seriesOrder = pickOrder('inspecao-palavra-liberdade', 287);
  return makePalavra({
    title: 'Inspeção: Liberdade — o nome, as salas; ≠ bairro ≠ filme ≠ linha livre',
    titleEn: 'Inspection: Liberdade — the name, the rooms; ≠ neighbourhood ≠ film ≠ free line',
    titleEs: 'Inspección: Liberdade — el nombre, las salas; ≠ barrio ≠ filme ≠ línea libre',
    excerpt:
      'Palavras: liberdade (lībertās); livre/libre; ≠ bairro ≠ Shawshank ≠ DSL; Cantouou · Ufa!!!; Valeu !!!',
    excerptEn:
      'Words: liberdade (lībertās); livre/libre; ≠ neighbourhood ≠ Shawshank ≠ DSL; Ufa!!!; Valeu !!!',
    excerptEs:
      'Palabras: liberdade (lībertās); livre/libre; ≠ barrio ≠ Shawshank ≠ DSL; ¡Ufa!!!; ¡Valeu !!!',
    slug: 'inspecao-palavra-liberdade',
    date: '2026-08-23T19:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Liberdade · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLiberdadePost,
  buildLiberdadeBodies,
  poemPt,
  poemEn,
  poemEs
};
