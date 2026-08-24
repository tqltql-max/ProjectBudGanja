'use strict';

/**
 * Inspeção Palavras · Anúbis
 * Eixos: eg. jnpw / Anpu · gr. Ἄνουβις · chacal · balança de Maat ·
 * primeiro deus do hub /mitologia/ · ≠ Deus ≠ Wepwawet ≠ magia · Valeu !!!
 * Pedido: inspeção em Anubis algum deus + página dedicada a mitologia.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/anubis-palavra-cover.jpg';
const WIKI_PT = 'https://pt.wikipedia.org/wiki/An%C3%BAbis';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Anubis';
const WIKT = 'https://en.wiktionary.org/wiki/Anubis';
const WIKI_MAAT = 'https://pt.wikipedia.org/wiki/Maat';
const WIKI_WEP = 'https://en.wikipedia.org/wiki/Wepwawet';
const WIKI_WOLF = 'https://en.wikipedia.org/wiki/African_wolf';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    const mito = posts.find((p) => p.slug === 'inspecao-palavra-mitologia');
    if (
      existing &&
      Number(existing.seriesOrder) &&
      Number(existing.seriesOrder) !== Number((mito && mito.seriesOrder) || 0)
    ) {
      return Number(existing.seriesOrder);
    }
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
  return `Anúbis.
Não é o vocábulo Deus.
É o chacal que o Egito
pôs à porta do morto.

Jnpw é o nome antigo.
Anúbis é o nome grego.
No lab, o mesmo ofício:
pesar o coração.

Há a balança.
Há a pena de Maat.
Há o cão que não é este.
Há o respeito sem altar.

Não é magia.
Não é Wepwawet.
É algum deus —
o primeiro deste catálogo.

Valeu !!!
com o coração certo
e sem invocar o nome.`;
}

function poemEn() {
  return `Anubis.
He is not the word Deus.
He is the jackal Egypt
set at the dead one’s door.

Jnpw is the old name.
Anubis is the Greek name.
In the lab, the same craft:
weigh the heart.

There is the scale.
There is Maat’s feather.
There is the dog that is not this.
There is respect without an altar.

It is not magic.
It is not Wepwawet.
It is some god —
the first of this catalog.

Valeu !!!
with the right heart
and without invoking the name.`;
}

function poemEs() {
  return `Anubis.
No es el vocablo Deus.
Es el chacal que Egipto
puso a la puerta del muerto.

Jnpw es el nombre antiguo.
Anubis es el nombre griego.
En el lab, el mismo oficio:
pesar el corazón.

Hay la balanza.
Hay la pluma de Maat.
Hay el perro que no es éste.
Hay respeto sin altar.

No es magia.
No es Wepwawet.
Es algún dios —
el primero de este catálogo.

¡Valeu !!!
con el corazón cierto
y sin invocar el nombre.`;
}

function buildAnubisBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-anubis.html';
  const cat = '/mitologia/';
  const mito = '/posts/post-inspecao-palavra-mitologia.html';
  const deus = '/posts/post-inspecao-palavra-deus.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const diabo = '/posts/post-inspecao-palavra-diabo.html';
  const orfeu = '/posts/post-inspecao-palavra-orfeu.html';
  const nectar = '/posts/post-inspecao-expressao-nectar-dos-deuses.html';
  const cao = '/animais/cao/';
  const caoPost = '/posts/post-inspecao-animal-cao.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const astrologia = '/guia/astrologia.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial do nome **[Anúbis](${self})** — mitónimo egípcio que o grego gravou **Ἄνουβις** (*Ánoubis*) e o português herdou como **Anúbis**. Pedido de campo: *inspeção em Anubis algum deus* + *página dedicada a mitologia*.

*Algum deus:* não o vocábulo [Deus](${deus}), não todos os panteões. Um nome. Esta ficha é esse nome. O lema fica em **[mitologia](${mito})**. O catálogo é **[Mitologia](${cat})**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Anúbis](${WIKI_PT}), [Anubis](${WIKI_EN}), [Wikcionário](${WIKT}), [Maat](${WIKI_MAAT}), [Wepwawet](${WIKI_WEP}), [African wolf](${WIKI_WOLF}). **Ficha ≠ culto, ≠ magia, ≠ invocação, ≠ guia de mumificação, ≠ tratado de egiptologia.** [Respeito](${respeito}) ao nome e à tradição que o transmitiu — sem altar. Sem afiliação religiosa.

**Gatilho:** *Anúbis* / *Anubis* / *Anpu* / *Inpu* / *chacal* / *algum deus*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Anúbis** (PT) · **Anubis** (EN / lat. via grego) |
| Classe | Mitónimo / teónimo masculino |
| Étimo (trabalho) | eg. **jnpw** (*Inpw* / *Anpu* / *Inpu*) → gr. **Ἄνουβις** → PT **Anúbis** — confiança: **alta** na via; o sentido exacto de *jnpw* fica **médio** (hipótese «príncipe / criança real» circula; não fechar romance) |
| Tipo BudGanja | Palavra — nome de deus · primeiro do catálogo [Mitologia](${cat}) |
| Ofício no relato | Embalsamador, guarda da necrópole, psicopompo, operador da [balança](${WIKI_MAAT}) |
| Forma | Cabeça de chacal / lobo africano sobre corpo humano |
| Não é | [Deus](${deus}) (vocábulo latino) · [Wepwawet](${WIKI_WEP}) · [diabo](${diabo}) · Hades · [cão](${cao}) da ficha de espécie |
| Data | ${inspected} |
| Fonte | [Anúbis](${WIKI_PT}) |

**O que é o objecto:** o **nome** de um deus do Egito que o laboratório fiche como *algum deus* — o primeiro deste catálogo. Quem embalsama, quem pesa, quem guia — isso é **camada**. O veredicto desta ficha é lexical e de ofício: **Anúbis ≠ Deus ≠ Wepwawet ≠ magia**.

## 2. Camadas — sem fundir

| Camada | Leitura | Confiança | Ofício |
|--------|---------|-----------|--------|
| **Nome PT** | Anúbis — forma portuguesa do teónimo | Alta (uso) | Objecto desta ficha |
| **Eg. jnpw** | Transcrição convencional *Inpw* / *Anpu*. Hieróglifo do chacal deitado | Alta (egiptologia de trabalho) | Nome antigo; o lab não lê hieróglifo como feitiço |
| **Gr. Ἄνουβις** | Forma que o Mediterrâneo fixou | Alta | Via do português |
| **Embalsamamento** | Patrono da mumificação; «o que está sobre a tenda» (epíteto *imy-wt*) | Alta (tradição) | Camada do relato — **não** protocolo |
| **Balança de [Maat](${WIKI_MAAT})** | O coração do morto contra a pena; Anúbis opera / ajusta a balança; Thoth regista | Alta (iconografia) | Eco de [coração](${coracao}) e [verdade](${verdade}) — analogia, não juízo final |
| **Psicopompo** | Guia no Duat (além) | Alta | [Caminho](${caminho}) como passagem; não mapa de invocação |
| **Animal** | Cabeça de canídeo — chacal clássico; hoje o modelo vivo mais citado é o [lobo africano](${WIKI_WOLF}) (*Canis lupaster*), outrora chamado chacal | Alta–média (taxonomia recente) | Elo [cão](${cao}) / [animal](${animal}) — o bicho **não** é o deus |
| **Cultura pop** | Múmia, jogos, revival egípcio | Alta (circulação) | Camada — não fonte do étimo |

**H1:** **Anúbis** no PT é o nome grego de **jnpw** — alta.  
**H2:** o ofício no relato é **cuidar do morto e pesar o coração** — não governar o mundo dos vivos.  
**H3:** *algum deus* no pedido abre o catálogo [Mitologia](${cat}) por **um** nome; os outros ficam para fichas futuras.

## 3. Anúbis × o que a orelha cola

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Anúbis** | «O Deus» do Egito | Um deus — psicopompo / embalsamador; [Osíris](${WIKI_EN}) (senhor do Ocidente) é outra figura |
| **[Deus](${deus})** | O mesmo que Anúbis | Vocábulo latino (céu / Uno na tradição cristã). **Outra sala** |
| **[Wepwawet](${WIKI_WEP})** | O mesmo chacal | Outro canídeo divino — «abridor de caminhos»; **não** fundir |
| **[cão](${cao})** | Anúbis = o animal | A espécie tem ficha própria; o teónimo empresta a cabeça |
| **[diabo](${diabo})** | Deus da morte = adversário | *Diábolos* é o acusador grego; Anúbis **pesa**, não calunia |
| **Hades / Cérbero** | O mesmo inferno | Panteão grego; [Orfeu](${orfeu}) desce lá — **outra** geografia |
| **Ídolo de prateleira** | Fichar = adorar | [Ídolo](${idolo}) é a imagem; esta ficha é o **nome** com [respeito](${respeito}) |

## 4. A balança — o que o lab lê (e o que recusa)

Iconografia estável: o coração do morto numa concha; a pena de [Maat](${WIKI_MAAT}) na outra; Anúbis junto à balança.

| Leitura | Limite |
|---------|--------|
| [Coração](${coracao}) pesado × pena da [verdade](${verdade}) | Analogia de ofício: o lab **pesa** o que inspeciona |
| Anúbis ajusta, não inventa o peso | Método: verificar, não teatralizar o juízo |
| Thoth escreve o resultado | O relatório; não o feitiço |
| **Recusa** | Usar esta ficha como manual de «abrir o Duat», invocação ou necromancia |

## 5. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear Anúbis como *jnpw* / Ἄνουβις e apontar o ofício no relato |
| Bom | Mandar o animal para [cão](${cao}), o lema para [mitologia](${mito}), o vocábulo latino para [Deus](${deus}) |
| Bom | Distinguir Wepwawet, Osíris, Hades |
| Mau | Tutorial de magia ou «como invocar Anúbis» |
| Mau | Fundir com [Deus](${deus}) ou com [diabo](${diabo}) |
| Mau | Tratar a ficha como altar — ver [ídolo](${idolo}) |

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=anubis)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Mitologia](${cat}) | Página dedicada — o catálogo |
| [mitologia](${mito}) | Lema — *mŷthos* + *lógos* |
| [Cão](${cao}) · [inspeção animal](${caoPost}) · [animal](${animal}) | O canídeo; não o deus |
| [Coração](${coracao}) · [verdade](${verdade}) · [caminho](${caminho}) | Balança e passagem |
| [Deus](${deus}) · [ídolo](${idolo}) · [diabo](${diabo}) | Salas cortadas |
| [Orfeu](${orfeu}) · [néctar dos deuses](${nectar}) | Grécia — outro panteão |
| [Astrologia](${astrologia}) | Céu nomeado — sala irmã |
| [Respeito](${respeito}) · [língua](${lingua}) | Ofício |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é curso de egiptologia nem lista de epítetos.  
- Não ensina mumificação, magia nem invocação.  
- O sentido exacto de *jnpw* fica **médio** — não fechar dogma.  
- Wepwawet e Osíris merecem fichas próprias quando o catálogo crescer.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **Anúbis** fichado como *jnpw* → Ἄνουβις; primeiro deus do catálogo [Mitologia](${cat}); salas cortadas (Deus, Wepwawet, diabo, cão, magia). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Catálogo](${cat}) · [▶ Lema](${mito}) · [▶ Cão](${cao}) · [▶ Poema Vida](/vida/#poema=anubis) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the name **Anúbis** / **Anubis** — Egyptian **jnpw** (*Inpw* / *Anpu*) via Gr. **Ἄνουβις**. Field request: *inspect Anubis, some god*, plus a dedicated mythology page.

*Some god:* not the Latin word [Deus](${deus}), not every pantheon. One name. This sheet is that name. The lemma is **[mitologia](${mito})**. The catalog is **[Mitologia](${cat})**.

Not a cult. Not magic. Not an embalming manual. Respect for the name; no altar.

## Object

| Field | Value |
|-------|-------|
| Name | **Anúbis** (PT) · **Anubis** |
| Path | Eg. **jnpw** → Gr. **Ἄνουβις** → PT Anúbis |
| Office in the tale | Embalmer, necropolis guard, psychopomp, operator of [Maat](${WIKI_MAAT})’s scale |
| Form | Jackal / [African wolf](${WIKI_WOLF}) head on a human body |
| ≠ | [Deus](${deus}) · [Wepwawet](${WIKI_WEP}) · [devil](${diabo}) · Hades · the [dog](${cao}) species sheet |

## The scale

The heart against Maat’s feather. Anubis tends the balance; Thoth writes. Lab reading: inspect by **weighing**, do not theatricalize a last judgment, do not turn the sheet into an invocation.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** First god of [Mitologia](${cat}). Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del nombre **Anúbis** / **Anubis** — eg. **jnpw** (*Inpw* / *Anpu*) vía gr. **Ἄνουβις**. Pedido: *inspección en Anubis, algún dios*, y una página dedicada a mitología.

*Algún dios:* no el vocablo latino [Deus](${deus}), no todos los panteones. Un nombre. Esta ficha es ese nombre. El lema es **[mitologia](${mito})**. El catálogo es **[Mitologia](${cat})**.

No es culto. No es magia. No es manual de embalsamamiento. Respeto al nombre; sin altar.

## Objeto

| Campo | Valor |
|-------|-------|
| Nombre | **Anúbis** (PT) · **Anubis** |
| Vía | Eg. **jnpw** → gr. **Ἄνουβις** → PT Anúbis |
| Oficio en el relato | Embalsamador, guarda de la necrópolis, psicopompo, operador de la balanza de [Maat](${WIKI_MAAT}) |
| Forma | Cabeza de chacal / [lobo africano](${WIKI_WOLF}) sobre cuerpo humano |
| ≠ | [Deus](${deus}) · [Wepwawet](${WIKI_WEP}) · [diablo](${diabo}) · Hades · la ficha de [perro](${cao}) |

## La balanza

El corazón contra la pluma de Maat. Anubis atiende la balanza; Thot escribe. Lectura del lab: inspeccionar **pesando**, no teatralizar un juicio final, no convertir la ficha en invocación.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Primer dios de [Mitologia](${cat}). Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildAnubisPost() {
  const { body, contentEn, contentEs } = buildAnubisBodies();
  const seriesOrder = pickOrder('inspecao-palavra-anubis', 330);
  return makePalavra({
    title: 'Inspeção: Anúbis — jnpw, o chacal, a balança; algum deus do catálogo',
    titleEn: 'Inspection: Anubis — jnpw, the jackal, the scale; some god in the catalog',
    titleEs: 'Inspección: Anubis — jnpw, el chacal, la balanza; algún dios del catálogo',
    excerpt:
      'Palavras: Anúbis (jnpw → Ἄνουβις) — chacal que pesa o coração; primeiro deus de /mitologia/; ≠ Deus ≠ magia; Valeu !!!',
    excerptEn:
      'Words: Anubis (jnpw → Ἄνουβις) — jackal who weighs the heart; first god of /mitologia/; ≠ Deus ≠ magic; Valeu !!!',
    excerptEs:
      'Palabras: Anubis (jnpw → Ἄνουβις) — chacal que pesa el corazón; primer dios de /mitologia/; ≠ Deus ≠ magia; ¡Valeu !!!',
    slug: 'inspecao-palavra-anubis',
    date: '2026-08-24T13:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Anúbis · deus',
    coverImage: COVER,
    sourceUrl: WIKI_PT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAnubisPost,
  buildAnubisBodies,
  poemPt,
  poemEn,
  poemEs,
  WIKI_PT,
  COVER
};
