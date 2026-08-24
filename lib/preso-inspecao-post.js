'use strict';

/**
 * Inspeção Palavras · preso
 * Eixos: particípio de prender · lat. prehendere / prensus ·
 * estado ≠ identidade · prisão / prisioneiro · presa (homógrafo) ·
 * trânsito / parafuso · ≠ escravidão ≠ filme Shawshank.
 * Pedido: inspeção da palavra Preso.
 * Ficha de vocábulo — não parecer jurídico, não tutorial de cela.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/preso-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/preso';
const WIKT_PRENDER = 'https://pt.wiktionary.org/wiki/prender';
const WIKT_LA = 'https://en.wiktionary.org/wiki/prehendere#Latin';

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
  return `Preso.
Não é o nome da pessoa.
É o estado de quem ficou
na mão de outra força.

Prender é o verbo.
Preso é o que ficou
depois do gesto.

Há o parafuso preso.
Há o trânsito preso.
Há a boca presa
quando a palavra não sai.

Há a sala da lei —
e essa sala não é esta ficha.

Liberdade é a irmã.
Não para apagar o vocábulo.
Para não fundir as celas.

Valeu !!!
sem sermão
e sem chave falsa.`;
}

function poemEn() {
  return `Preso.
It is not the person’s name.
It is the state of who stayed
in another force’s hand.

Prender is the verb.
Preso is what remained
after the gesture.

There is the stuck screw.
There is the jammed traffic.
There is the locked mouth
when the word will not come.

There is the room of the law —
and that room is not this sheet.

Freedom is the sister.
Not to erase the word.
To keep the cells unfused.

Valeu !!!
no sermon
and no fake key.`;
}

function poemEs() {
  return `Preso.
No es el nombre de la persona.
Es el estado de quien quedó
en la mano de otra fuerza.

Prender es el verbo.
Preso es lo que quedó
después del gesto.

Hay el tornillo preso.
Hay el tráfico preso.
Hay la boca presa
cuando la palabra no sale.

Hay la sala de la ley —
y esa sala no es esta ficha.

Libertad es la hermana.
No para borrar el vocablo.
Para no fundir las celdas.

¡Valeu !!!
sin sermón
y sin llave falsa.`;
}

function buildPresoBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-preso.html';
  const liberdade = '/posts/post-inspecao-palavra-liberdade.html';
  const filme = '/posts/post-inspecao-filme-um-sonho-de-liberdade.html';
  const escravidao = '/posts/post-inspecao-palavra-escravidao.html';
  const ilegal = '/posts/post-inspecao-palavra-ilegal.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const congelado = '/posts/post-inspecao-palavra-congelado.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[preso](${self})** — particípio / adjectivo (e substantivo) de **prender**, lat. *prehendere* / *prēnsus* («agarrar, tomar»). Pedido de campo: *inspeção da palabra Preso*.

Objecto = o **vocábulo**. Não é código penal. Não é biografia de recluso. Não é o [filme](${filme}). Não é [escravidão](${escravidao}). O lab honra o peso da palavra e **corta as salas**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · preso](${WIKT}), [prender](${WIKT_PRENDER}), [prehendere](${WIKT_LA}). **Ficha ≠ parecer jurídico, ≠ manual de cela, ≠ hino de fuga.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *preso* / *presa* / *prender* / *prisão* / *prisioneiro* / *estou preso* / *ser preso*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **preso** (PT) |
| Classe | Adjectivo / particípio de *prender*; também substantivo («o preso») |
| Étimo (trabalho) | Lat. *prehendere* «agarrar» → part. *prehēnsus* / *prēnsus* → PT *preso* — confiança: **alta** |
| Verbo-mãe | **prender** |
| Feminino / homógrafo | **presa** — adjectivo feminino *e* substantivo «caça / vítima» |
| Tipo BudGanja | Palavra — estado × derivação × salas que a orelha cola |
| Não é | [Liberdade](${liberdade}) · [escravidão](${escravidao}) · [filme Shawshank](${filme}) · [ilegal](${ilegal}) |
| Data | ${inspected} |
| Fonte | [preso](${WIKT}) |

**O que é o objecto:** o nome do **estado de quem ficou tomado**. No léxico, *preso* é o que resta do [gesto](${gesto}) *prender*. O lab nomeia o estado; **não** confunde estado com identidade.

## 2. Derivação — a família à vista

Pedido irmão do lab: *derivação de palabras*. Aqui a árvore é curta e precisa.

| Forma | Papel | Sala |
|-------|-------|------|
| **prender** | Verbo | O gesto — tomar, agarrar, deter |
| **preso / presa** | Particípio / adjectivo | O estado depois do gesto |
| **o preso** | Substantivo | A pessoa nomeada pelo estado — salto semântico a inspecionar |
| **prisão** | Substantivo | O lugar / a pena / o sistema — **outra** peça |
| **prisioneiro** | Substantivo | A pessoa no sistema — vizinho de *o preso* |
| **presídio** | Substantivo | Edifício / regime — não esta ficha |
| **apreender / apreensão** | Prefixo *a-* | Tomar para si (coisa, ideia, bem) |
| **surpreso** | *sur-* + *prendere* | Tomado de súbito — emoção, não cela |
| **desprender** | Prefixo *des-* | Soltar o que estava preso |
| **compreender** | *com-* + *prehendere* | Agarrar com a mente — primo; **outra** sala |
| **empresa** | *in-* + *prehendere* | Empreendimento — primo longe; **não** fundir |

**H-derivação:** o salto perigoso é **particípio → pessoa** («está preso» vira «é um preso»). A [verdade](${verdade}) do lab guarda a diferença.

## 3. Sopro de campo — as salas

| Sopro | Sala |
|-------|------|
| **preso** (adj.) | Esta ficha — estado |
| **o preso** | Pessoa nomeada pelo estado — uso vivo; não essência |
| **presa** | Feminino *ou* caça / vítima — homógrafo |
| **estou preso** | Estado: trânsito, parafuso, boca, afeto, lei — **perguntar qual** |
| **ser preso** | Evento (detenção) — não o mesmo que *estar preso* |
| **prisão** | Lugar / pena — substantivo irmão, ficha futura se o campo pedir |
| **[liberdade](${liberdade})** | Irmã antónima — o nome da condição contrária |
| **[Um Sonho de Liberdade](${filme})** | Filme que **usa** o estado; não o vocábulo |
| **[escravidão](${escravidao})** | Sistema de propriedade sobre pessoas — raiz e crime **outros** |
| **[ilegal](${ilegal}) / [legal](${legal})** | Eixo da *lex* — vizinho; preso pode ser legal |
| **mar [congelado](${congelado})** | Metáfora («mar preso») — gelo, não cela |

**H-ser/estar:** *ser preso* = o acto caiu; *estar preso* = o estado dura. Fundir os dois é falha de ofício.  
**H-presa:** a orelha cola *presa* (adj.) em *presa* (caça). Cortar.  
**H-lei:** preso **não** é sinónimo de [ilegal](${ilegal}). Há preso à espera de julgamento; há detenção legal. A palavra não julga o processo.

## 4. Hipóteses

**H1:** *preso* PT = particípio de *prender* ← lat. *prehendere / prēnsus* — alta.  
**H2:** o substantivo «o preso» é derivação de uso: o estado virou nome de pessoa.  
**H3:** *prisão* e *prisioneiro* são família; não são a mesma peça que *preso*.  
**H4:** [liberdade](${liberdade}) é irmã de contraste — define-se no corte, não no hino.  
**H5:** [escravidão](${escravidao}) **não** é sinónimo: outro étimo, outro crime, outro sistema.  
**H6:** o lab não ensina fuga, não condena, não identitariza. Inspeciona o vocábulo. [Respeito](${respeito}) a quem vive a palavra.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | Preso = criminoso = ilegal | Estado; a lei é outra sala |
| **O preso** | Identidade | Nome de estado substantivado |
| **Presa** | Só o feminino | Também caça |
| **Estou preso** | Sempre cela | Pode ser parafuso, trânsito, afeto |
| **Antónimo** | = [liberdade](${liberdade}) fundida | Irmã; duas fichas |
| **Filme** | A ficha é Shawshank | O [filme](${filme}) **cita** o estado |

## 6. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *preso* como estado e apontar a sala (lei, corpo, fala, via) |
| Bom | Separar *prender* / *preso* / *prisão* / *o preso* |
| Bom | [Respeito](${respeito}) a quem está ou esteve nessa palavra |
| Mau | Tutorial de cela ou de fuga |
| Mau | Fundir com [escravidão](${escravidao}) ou com [ilegal](${ilegal}) |
| Mau | Transformar o vocábulo em essência da pessoa |

## 7. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=preso)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Liberdade](${liberdade}) | Irmã antónima — o nome da outra condição |
| [Um Sonho de Liberdade](${filme}) | O filme — outra série |
| [Escravidão](${escravidao}) | Sistema outro — não fundir |
| [Legal](${legal}) · [ilegal](${ilegal}) | Eixo da lei — vizinho |
| [Congelado](${congelado}) | «Mar preso» — metáfora do gelo |
| [Gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [vida](${vida}) | Ofício |
| [Língua portuguesa](${lingua}) | Solo da derivação |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é artigo do Código Penal nem estatística prisional.  
- Não comenta o filme além do **corte** de título.  
- Não é ficha de *prisão* (o lugar) — só a família.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **preso** fichado como particípio/estado de *prender* (*prehendere*); derivação à vista; salas cortadas (pessoa-essência, presa-caça, escravidão, filme, ilegal). [Liberdade](${liberdade}) fica irmã, não fusão. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Liberdade](${liberdade}) · [▶ Filme](${filme}) · [▶ Escravidão](${escravidao}) · [▶ Poema Vida](/vida/#poema=preso) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **preso** — past participle of *prender*, Lat. *prehendere* / *prēnsus* («to seize»). The object is the **word**: a **state of being held**, not an identity, not a prison manual, not [Shawshank](${filme}), not [slavery](${escravidao}).

Derivation: *prender* → *preso* / *presa*; cousins *prisão*, *prisioneiro*; false friends *presa* (prey), *surpreso*, *compreender*, *empresa*.

Sister sheet: [liberdade](${liberdade}).

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** State ≠ identity. Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **preso** — participio de *prender*, lat. *prehendere* / *prēnsus*. El objeto es el **vocablo**: un **estado de quedar tomado**, no una identidad, no un manual de celda, no [el filme](${filme}), no [esclavitud](${escravidao}).

Derivación: *prender* → *preso* / *presa*; primas *prisão*, *prisioneiro*; homógrafo *presa* (caza).

Ficha hermana: [liberdade](${liberdade}).

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Estado ≠ identidad. Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildPresoPost() {
  const { body, contentEn, contentEs } = buildPresoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-preso', 288);
  return makePalavra({
    title: 'Inspeção: Preso — o estado depois de prender; ≠ identidade ≠ cela ≠ filme',
    titleEn: 'Inspection: Preso — the state after seizing; ≠ identity ≠ cell ≠ film',
    titleEs: 'Inspección: Preso — el estado después de prender; ≠ identidad ≠ celda ≠ filme',
    excerpt:
      'Palavras: preso (prehendere / prēnsus) — particípio de prender; estado ≠ pessoa; derivação prisão/prisioneiro; ≠ escravidão ≠ Shawshank; Valeu !!!',
    excerptEn:
      'Words: preso (prehendere / prēnsus) — participle of prender; state ≠ person; prison/prisoner family; ≠ slavery ≠ Shawshank; Valeu !!!',
    excerptEs:
      'Palabras: preso (prehendere / prēnsus) — participio de prender; estado ≠ persona; familia prisión; ≠ esclavitud ≠ Shawshank; ¡Valeu !!!',
    slug: 'inspecao-palavra-preso',
    date: '2026-08-23T22:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Preso · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPresoPost,
  buildPresoBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
