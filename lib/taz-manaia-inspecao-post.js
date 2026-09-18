'use strict';

/**
 * Inspeção Palavras · Taz Manaia
 * Eixos: lapso Taz-Mania · hipocorístico Taz (Tanzânia × diabo-da-Tasmânia) ·
 * manaia māori · homofonia meneia · relação com Tanzânia
 * Ficha de objecto oral / nome-lapso, não biografia inventada nem etnografia.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/taz-manaia-palavra-cover.jpg';
const WIKI = 'https://en.wikipedia.org/wiki/Taz-Mania';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 260) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildTazManaiaBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-taz-manaia.html';
  const tanzania = '/posts/post-inspecao-palavra-tanzania.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const meneia = '/posts/post-inspecao-palavra-meneia.html';
  const mocambique = '/posts/post-inspecao-palavra-mocambique.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wikiTaz = 'https://en.wikipedia.org/wiki/Taz-Mania';
  const wikiTazPt = 'https://pt.wikipedia.org/wiki/Taz-Mania';
  const wikiDevil = 'https://pt.wikipedia.org/wiki/Diabo-da-tasm%C3%A2nia';
  const wikiTas = 'https://pt.wikipedia.org/wiki/Tasm%C3%A2nia';
  const wikiManaia = 'https://en.wikipedia.org/wiki/Manaia_(mythological_creature)';
  const wiktManaia = 'https://en.wiktionary.org/wiki/manaia';

  const body = `## Escopo

Inspeção editorial da forma **[Taz Manaia](${self})** — nome que a boca do lab colou à [Tanzânia](${tanzania}). Pedido de campo: *Tanzânia inspeção e relação com taz manaia*. O lab **não** encontrou uma figura pública estável com esse nome para ficha de Pessoa. Lê-se um **objecto oral**: **Taz-Mania** (série Warner, 1991–1995) escrito como antropónimo, o hipocorístico **Taz** (Tanzânia × diabo-da-Tasmânia), e o māori **manaia** (mensageiro / guardião na talha). Esta ficha cobre o **lapso**, as **camadas**, a **[relação](${relacao})** com [Tanzânia](${tanzania}) e a **correção**: persona de teclado ≠ biografia. Elos: [meneia](${meneia}) (só homofonia), [respeito](${respeito}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Taz-Mania](${wikiTaz}) ([PT](${wikiTazPt})), [diabo-da-tasmânia](${wikiDevil}), [Tasmânia](${wikiTas}), [Manaia](${wikiManaia}), [Wiktionary · manaia](${wiktManaia}), ficha-irmã [Tanzânia](${tanzania}). **Ficha ≠ biografia, ≠ fandom Warner, ≠ etnografia māori.** O *manaia* nomeia-se com [respeito](${respeito}) — não vira mascote do Taz. Sem afiliação a Warner Bros. nem a iwi.

**Gatilho tipográfico:** *taz manaia* / *Taz Manaia* / *TAZ MANAIA* / *Taz-Mania* / *Tazmania* → esta ficha (série) **e/ou** [Tanzânia](${tanzania}) (país).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Taz Manaia** (lapso de campo) |
| Formas vivas | *Taz-Mania* (título) · *Taz* (personagem / alcunha) · *manaia* (māori) · *Tazmania* (terra fictícia da série) |
| Classe | Antropónimo aparente · lapso · cluster de nomes |
| Étimo (trabalho) | Colagem: **Taz** + **Manaia** ← ouvido de **Taz-Mania** + possível *manaia* māori — confiança da colagem: **alta**; confiança de «é uma pessoa famosa»: **baixa** (sem fonte estável neste lab) |
| Não é | O país [Tanzânia](${tanzania}) · a [Tasmânia](${wikiTas}) · ficha de Pessoa verificada |
| Tipo BudGanja | Palavra — lapso × persona × [relação](${relacao}) |
| Elo país | [Tanzânia](${tanzania}) — o Taz como recorte de *Tanz-* |
| Elo corpo PT | [meneia](${meneia}) — só o som; étimo *menear* ≠ *manaia* |
| Elo ofício | [verdade](${verdade}) · [respeito](${respeito}) · [gesto](${gesto}) |
| Fonte | [Taz-Mania](${wikiTaz}) · [manaia](${wikiManaia}) |
| Data | ${inspected} |

**O que é o objecto:** um **nome que parece pessoa**. No lab: primeiro separar as peças; só depois, se vier fonte, abrir ficha de Pessoa. Até lá, Taz Manaia = **cluster**.

## 2. Quatro peças (não misturar)

| Peça | Leitura | Confiança |
|------|---------|-----------|
| **Taz-Mania** | Série animada Fox Kids / Warner (1991–1995); Taz bagageiro no Hotel Tazmania; terra de céu amarelo inspirada na [Tasmânia](${wikiTas}) | Alta |
| **Taz** | (a) personagem *Tasmanian Devil* · (b) recorte oral de [Tanzânia](${tanzania}) | Alta (a); média (b) |
| **manaia** | Motivo māori: ave-cabeça / corpo humano / cauda de peixe; mensageiro entre mundos; guardião na talha e no pounamu | Alta (existência do motivo); a colagem ao Taz é do **lab**, não da tradição |
| **Taz Manaia** | Grafia com espaço: o hífen de *Taz-Mania* cai e nasce um **apelido** | Alta (mecanismo); baixa (pessoa real) |

**H1:** *taz manaia* no pedido = **Taz-Mania** ouvido como nome próprio.  
**H2:** o **Taz** da [Tanzânia](${tanzania}) e o **Taz** da Tasmânia são **homógrafos**, não o mesmo mapa.  
**H3:** *manaia* māori merece [respeito](${respeito}) — não é gag.  
**H4:** [meneia](${meneia}) (*menear* ← *mão*) é vizinho de ouvido PT, **outro** étimo.

## 3. Taz: duas bocas, um som

| Boca | Mapa | Relação com esta ficha |
|------|------|------------------------|
| **Tanz- → Taz** | África Oriental — [Tanzânia](${tanzania}) | Hipocorístico do país; a [relação](${relacao}) pedida parte daqui |
| **Tasmanian Devil → Taz** | [Tasmânia](${wikiTas}) / Looney Tunes | Personagem da série *Taz-Mania* |
| **Tazmania** | Terra **fictícia** da série (céu amarelo) | Nem Tanzânia nem Tasmânia real |

O [diabo-da-tasmânia](${wikiDevil}) (*Sarcophilus harrisii*) é [animal](${animal}) [selvagem](${selvagem}) **australiano**. A fauna da Tanzânia (Serengeti, etc.) é **outro** catálogo. Colar o redemoinho do Taz ao Kilimanjaro é cartaz, não ofício.

## 4. Manaia: o que o lab não inventa

O **manaia** māori é motivo de talha e joalharia: mensageiro entre o mundo vivo e o dos espíritos; muitas vezes perfil de ave, corpo de pessoa, cauda de peixe. Cognatos polinésios apontam também a «ornar / decorar» (ex. samoano *fa'amānaia*). Há ainda *Manaia* como topónimo na Aotearoa / Nova Zelândia.

| Leitura | Bom no lab | Mau no lab |
|---------|------------|------------|
| Motivo māori | Nomear com [respeito](${respeito}); apontar fonte | Transformar em mascote do Taz ou em «espírito da Tanzânia» |
| Homofonia PT | Notar [meneia](${meneia}) | Fundir *menear* com *manaia* |
| Apelido Manaia | Existe como nome de família / dado em Aotearoa | Conclusão «logo a pessoa do pedido é māori» sem fonte |
| Catalão *manaia* | Soldado romano de Semana Santa (outra língua) | Trazer para o cluster africano |

**Veredicto manaia:** peça **real**, ofício **oceânico**. A [relação](${relacao}) com [Tanzânia](${tanzania}) passa pelo **Taz** (som), não por uma genealogia māori-tanzaniana.

## 5. A relação com Tanzânia

Pedido: *relação com taz manaia*. A palavra **[relação](${relacao})** (lat. *relatĭō*) = o **entre**.

| Entre | Tipo de vínculo | Força |
|-------|-----------------|-------|
| Tanzânia ↔ Taz | Recorte oral do topónimo | Média |
| Taz ↔ Taz-Mania | Personagem / título | Alta |
| Taz-Mania ↔ Taz Manaia | Homofonia + espaço / queda do hífen | Alta |
| Taz Manaia ↔ Tanzânia | Cluster de ouvido que o lab foi pedido a **nomear** | Alta como *pedido*; baixa como *facto de Estado* |
| Manaia ↔ Tanzânia | Nenhum étimo comum | — |

**H-relação:** o país e o lapso **relacionam-se** no ouvido e no teclado. Não se relacionam como Estado e cidadão famoso, até haver fonte. O ofício é **etiquetar o entre** — exactamente o trabalho da ficha [relação](${relacao}).

Método irmão: [Moçambique](${mocambique}) × *esqueiro biq* (país × lapso). Aqui: [Tanzânia](${tanzania}) × *Taz Manaia*.

## 6. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Nome** | Pessoa (dado + apelido) | Colagem *Taz* + *Manaia* |
| **País** | Tanzaniano famoso | Pedido de [relação](${relacao}) com o **país**-palavra |
| **Desenho** | A série explica África | A série habita uma Tasmânia de cartaz (1991) |
| **Guardião** | Taz é o manaia da Tanzânia | Sincretismo do lab; **não** tradição māori nem suaíli |
| **Dança** | *manaia* = [meneia](${meneia}) | Só ouvido PT |

**Veredicto contraste:** parece biografia; é **mapa de lapsos**.

## 7. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Taz Manaia é o nome da Tanzânia» | País = **[Tanzânia](${tanzania})** / *Tanzania* |
| «É o diabo tanzaniano» | Diabo-da-**Tasmânia**; Tanzânia ≠ Tasmânia |
| «Abre ficha de Pessoa» | Sem fonte estável: esta ficha de **palavra** |
| «manaia é trejeito, [meneia](${meneia})» | Homofonia; étimos distintos |
| «Não há relação nenhuma» | Há: ouvido, teclado, hipocorístico **Taz** — [relação](${relacao}) lexical |

**Veredicto correção:** **Taz Manaia = lapso-cluster.** País = [Tanzânia](${tanzania}). Série = *Taz-Mania*. Motivo = *manaia* (com [respeito](${respeito})). Fecho: não inventar vida a um nome.

## 8. Usos

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Pedido de inspeção** | «relação com taz manaia» | Bom: abrir as duas fichas · Mau: fundir |
| **Série** | Taz-Mania | Bom: título com hífen · Mau: achar que é o país |
| **Alcunha** | Taz | Bom: etiquetar se é país ou personagem · Mau: um Taz único |
| **Motivo** | manaia | Bom: talha / guardião māori · Mau: mascote |

## Hipóteses (síntese)

**H1:** *Taz Manaia* = *Taz-Mania* + espaço + possível *manaia*.  
**H2:** o Taz da [Tanzânia](${tanzania}) é recorte; o Taz da série é o diabo-da-Tasmânia.  
**H3:** a [relação](${relacao}) pedida é o **entre** lexical, não biografia.  
**H4:** *manaia* ≠ [meneia](${meneia}).  
**H5:** fecho [Faça o melhor!](${mantra}) — nomear sem inventar pessoa.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Tanzânia](${tanzania}) | O país que o pedido quis relacionar |
| [Relação](${relacao}) | Método do **entre** |
| [Meneia](${meneia}) · [gesto](${gesto}) | Homofonia PT / movimento — outro étimo |
| [Moçambique](${mocambique}) | Irmão de método: país × lapso |
| [Animal](${animal}) · [selvagem](${selvagem}) | Diabo-da-Tasmânia ≠ fauna tanzaniana |
| [Língua portuguesa](${lingua}) | Hífen, espaço, acento *Tanzânia* |
| [Verdade](${verdade}) · [respeito](${respeito}) | Não fabricar celebridade; não esvaziar o manaia |
| [Caminho](${caminho}) | Duas rotas (África / Oceania) — não um só atalho |
| [Faça o melhor!](${mantra}) · [poema Vida](${poemMantra}) | Fecho |

## Limites

- Não atribui vida, nacionalidade nem discografia a «Taz Manaia».  
- Não resume a série Warner nem o cânone Looney Tunes.  
- Não é manual de talha māori nem substitui voz de iwi.  
- Não ensina a Tanzânia — isso está na [ficha do país](${tanzania}).

## Status

**Aprovado** — **Taz Manaia** fichado como lapso-cluster (*Taz-Mania* × Taz × *manaia*); [relação](${relacao}) com [Tanzânia](${tanzania}) nomeada como **entre** de ouvido, não como biografia.

[▶ Palavras](${hub}) · [▶ Tanzânia](${tanzania}) · [▶ Relação](${relacao}) · [▶ Meneia](${meneia}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the field form **Taz Manaia** — glued to **[Tanzânia](${tanzania})** by the request *relation with taz manaia*. This lab found **no stable public biography**. It reads an **oral object**: **Taz-Mania** (Warner, 1991–1995) written as a personal name, the clipping **Taz** (Tanzania × Tasmanian Devil), and Māori **manaia** (guardian / messenger in carving). Links: [relation](${relacao}), [meneia](${meneia}) (PT homophony only), [Do your best!](${mantra}).

> Sources: [Taz-Mania](${wikiTaz}), [Manaia](${wikiManaia}). **Not a biography. Not Māori ethnography.** Name the manaia with [respect](${respeito}).

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **Taz Manaia** |
| Not | the country [Tanzânia](${tanzania}) · a verified Person sheet |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** a famous person from Tanzania.  
**Is:** a **slip-cluster**. Tanzania is the [country sheet](${tanzania}). *Taz-Mania* is a cartoon on a poster Tasmania. *Manaia* is a Māori motif — not a Taz mascot.

## 3. Correction

**Taz Manaia = oral slip.** Country = [Tanzânia](${tanzania}). The [relation](${relacao}) is the lexical *between* (Taz as clipping), not a life story. Close with [Do your best!](${mantra}).

## Status

**Approved** — slip sheet; relation named without inventing a person.

[▶ Words](${hub}) · [▶ Tanzania](${tanzania}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la forma de campo **Taz Manaia** — pegada a **[Tanzânia](${tanzania})** por el pedido *relación con taz manaia*. Este lab **no** halló biografía pública estable. Lee un **objeto oral**: **Taz-Mania** (Warner, 1991–1995) escrito como antropónimo, el recorte **Taz** (Tanzania × demonio de Tasmania) y el **manaia** māori (guardián / mensajero en la talla). Vínculos: [relação](${relacao}), [meneia](${meneia}) (solo homofonía PT), [¡Haz lo mejor!](${mantra}).

> Fuentes: [Taz-Mania](${wikiTaz}), [Manaia](${wikiManaia}). **No es biografía ni etnografía māori.** Nombrar el manaia con [respeito](${respeito}).

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **Taz Manaia** |
| No es | el país [Tanzânia](${tanzania}) · ficha de Persona verificada |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** alguien famoso de Tanzania.  
**Es:** un **lapsus-cluster**. Tanzania es la [ficha del país](${tanzania}). *Taz-Mania* es dibujo en una Tasmania de cartel. *Manaia* es motivo māori — no mascota del Taz.

## 3. Corrección

**Taz Manaia = lapsus oral.** País = [Tanzânia](${tanzania}). La [relação](${relacao}) es el *entre* léxico (Taz como recorte), no una vida. Cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — ficha de lapsus; relación nombrada sin inventar persona.

[▶ Palabras](${hub}) · [▶ Tanzânia](${tanzania}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildTazManaiaPost() {
  const { body, contentEn, contentEs, wiki } = buildTazManaiaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-taz-manaia', 149);
  const post = makePalavra({
    title: 'Inspeção: Taz Manaia — o lapso Taz-Mania, o manaia e a relação com Tanzânia',
    titleEn: 'Inspection: Taz Manaia — the Taz-Mania slip, the manaia, and the relation with Tanzania',
    titleEs: 'Inspección: Taz Manaia — el lapsus Taz-Mania, el manaia y la relación con Tanzania',
    excerpt:
      'Palavras: «Taz Manaia» — lapso de Taz-Mania × Taz × manaia māori; ≠ pessoa verificada; relação lexical com Tanzânia; Faça o melhor!',
    excerptEn:
      'Words: “Taz Manaia” — slip of Taz-Mania × Taz × Māori manaia; ≠ verified person; lexical relation with Tanzania; Do your best!',
    excerptEs:
      'Palabras: «Taz Manaia» — lapsus de Taz-Mania × Taz × manaia māori; ≠ persona verificada; relación léxica con Tanzania; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-taz-manaia',
    date: '2026-08-21T11:05:00.000Z',
    seriesOrder,
    seriesLabel: 'Taz Manaia · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.seriesOrder = seriesOrder;
  return post;
}

module.exports = { buildTazManaiaPost, buildTazManaiaBodies };
