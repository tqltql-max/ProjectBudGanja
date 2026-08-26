'use strict';

/**
 * Inspeção Palavras · feno
 * Lat. fēnum / faenum — erva seca para o curral.
 * Pedido: inspeçao da palabra Feno.
 * Corta: pheno / fenótipo · fino · feno-grego · cheiro de cura.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/feno-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/feno';
const WIKT_LA = 'https://en.wiktionary.org/wiki/faenum#Latin';
const WIKT_GREGO = 'https://pt.wiktionary.org/wiki/feno-grego';
const WIKI = 'https://pt.wikipedia.org/wiki/Feno';
const WIKI_HAY = 'https://en.wikipedia.org/wiki/Hay';
const WIKI_PHENO = 'https://pt.wikipedia.org/wiki/Fen%C3%B3tipo';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts.filter((p) => p.series === 'palavras-origem').map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 800) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Feno.
Não é pheno.

A erva seca
no curral.
Fēnum — o inverno
da boca do bode.

A orelha cola
fino, fenótipo, fenol.
O étimo corta:
não é o que aparece.
É o que secou.

Cheiro a feno na cura
não baptiza a erva.
É aviso de clorofila —
outra sala.

Valeu !!!
o feno no celeiro,
o pheno no mapa.`;
}

function poemEn() {
  return `Feno.
Not pheno.

Dried grass
in the yard.
Fēnum — winter
in the goat’s mouth.

The ear glues
fine, phenotype, phenol.
The etymon cuts:
it is not what appears.
It is what dried.

A hay smell in the cure
does not name the herb.
It is a chlorophyll warning —
another room.

Valeu !!!
hay in the barn,
pheno on the map.`;
}

function poemEs() {
  return `Feno.
No es pheno.

La hierba seca
en el corral.
Fēnum — el invierno
en la boca del bode.

La oreja pega
fino, fenotipo, fenol.
El étimo corta:
no es lo que aparece.
Es lo que secó.

Olor a heno en la cura
no bautiza la hierba.
Es aviso de clorofila —
otra sala.

¡Valeu !!!
el heno en el granero,
el pheno en el mapa.`;
}

function buildFenoBodies() {
  const inspected = '2026-08-26';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-feno.html';
  const bode = '/posts/post-inspecao-palavra-bode.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const erva = '/posts/post-inspecao-palavra-erva.html';
  const racao = '/posts/post-inspecao-derivado-racao.html';
  const polimorfismo = '/posts/post-inspecao-palavra-polimorfismo.html';
  const pipoca = '/posts/post-inspecao-palavra-pipoca.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const cultivo = '/cultivo/';
  const animais = '/animais/';
  const plantas = '/plantas/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[feno](${self})** — a **[erva](${erva}) seca** que o curral guarda para o inverno. Pedido de campo: *inspeçao da palabra Feno*. [A orelha cola](${orelhaCola}) **feno** em **pheno** / [fenótipo](${WIKI_PHENO}), em **fino** e no **cheiro a feno** da cura. O [étimo](${etimo}) **corta**: lat. *fēnum* / *faenum* «feno». Não é o mapa do que **aparece** (*phainō*). Não é [ração](${racao}) extrusada.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · feno](${WIKT}), lat. [*faenum*](${WIKT_LA}), [Feno](${WIKI}), [hay](${WIKI_HAY}), [feno-grego](${WIKT_GREGO}). Método: [etimologia](${etimologia}) · [latim](${latim}). **Ficha ≠ manual de fenação, ≠ receita de cura, ≠ aula de genética.** Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *Feno* / *feno* / *pheno* colado no feno / *hay* → lema **feno**. Fenótipo / pheno hunt → [polimorfismo](${polimorfismo}) (várias formas) — **outra sala**. Feno-grego fica **nesta** [relação](${relacao}) como composto (*faenum graecum*).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **feno** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | lat. *fēnum* / *faenum* «feno, erva seca» — confiança: **alta** |
| Pedido de campo | *Feno* — a boca nomeia a erva seca |
| Não é | *pheno* / fenótipo (*φαίνω*) · *fino* (espessura / qualidade) · [ração](${racao}) industrial · EN *hay* (via germânica) |
| Família viva | *fenar* · *fenação* · *fenal* · **feno-grego** (*faenum graecum*) |
| Tipo BudGanja | Palavra — erva seca × curral × corte pheno/cura |
| Elo seres | [planta](${planta}) · [erva](${erva}) · [animal](${animal}) · [bode](${bode}) |
| Fonte | [feno](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** erva (e leguminosas de prado) **cortada e seca** para guardar. Não é o pasto verde. Não é o kibble. No laboratório: o nome do **celeiro**, não o nome do **fenótipo**.

## 2. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **feno** | Qualquer erva seca / «pheno» do indoor | lat. *fēnum* — forragem seca |
| **pheno** / fenótipo | O mesmo lema (f+eno) | Gr. *φαίνω* «aparecer» — o que se **vê** na [planta](${planta}); ver [polimorfismo](${polimorfismo}) |
| **fino** | Quase a mesma boca | Outro étimo (qualidade / espessura) — **não** erva seca |
| **feno-grego** | Feno da Grécia | *Trigonella foenum-graecum* — «feno grego»; composto, **não** o lema simples |
| **cheiro a feno** (cura) | A flor virou feno | Aviso de **clorofila** / cura incompleta — metáfora, não baptismo |
| **[ração](${racao})** | O mesmo comedouro | Industrial / extrusada — **outra** ficha |
| EN *hay* | Tradução = étimo | Germânico — sentido paralelo, **não** desce de *fēnum* |

**H-pheno:** no indoor, *pheno* é recorte de *phenotype*. A orelha brasileira cola em **feno**. O mapa corta: um é **o que aparece**; o outro é **o que secou**.  
**H-cura:** «cheira a feno» nomeia um **defeito de secagem**, não transforma a flor em *fēnum*. Sem receita de estufa.  
**H-grego:** *feno-grego* leva *feno* no nome e é **semente de tempero** — composto latino, ficha de erva outra.

## 3. Duas famílias

| Família | Étimo | Português | Não misturar |
|---------|-------|-----------|--------------|
| **Erva seca** | lat. *fēnum* / *faenum* | **feno** · fenar · fenação | O celeiro |
| **Aparência** | gr. *φαίνω* | fenótipo · *pheno* · fenómeno | O que se mostra |
| **Feno-grego** | *faenum graecum* | feno-grego / alforva | Temperos — composto |
| **Ração** | lat. *ratiō* «porção» | [ração](${racao}) | Dose industrial |

A [relação](${relacao}) pede o **entre**: feno e pheno **encontram-se na boca**, não na árvore.

## 4. Rede de ofício

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Curral | feno para [bode](${bode}), cavalo, vaca | Hub [Animais](${animais}) — erva, não kibble |
| Prado | Cortar, secar, enfardar | Ofício de fenação — sem manual |
| [Planta](${planta}) | A erva **antes** de ser feno | Hub [Plantas](${plantas}) · [cultivo](${cultivo}) |
| Cura (metáfora) | Cheiro a feno na flor | Aviso — não étimo; não é protocolo |
| Transformação | Verde → seco (como [pipoca](${pipoca}) é milho+calor) | Calor/tempo **medidos** — outro objecto |

## 5. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Fichar **feno** como *fēnum*; mandar *pheno* ao [polimorfismo](${polimorfismo}) / fenótipo |
| Bom | Cortar feno × [ração](${racao}) no comedouro |
| Bom | Ler «cheiro a feno» como aviso, não como nome da planta |
| Mau | Fundir feno, fenótipo e fenol num só sopro |
| Mau | Transformar a ficha em receita de secar flor ou de fenar prado |

Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=feno)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [planta](${planta}) · [erva](${erva}) | O vivo **antes** de secar |
| [animal](${animal}) · [bode](${bode}) · [Animais](${animais}) | Quem come o feno |
| [ração](${racao}) | O comedouro industrial — outra sala |
| [polimorfismo](${polimorfismo}) | Várias formas — casa do *pheno* |
| [pipoca](${pipoca}) | Outra transformação por calor |
| [cultivo](${cultivo}) | Onde a cura se nomeia sem virar manual |
| [latim](${latim}) · [língua portuguesa](${lingua}) | *fēnum* |
| [Guia](${guia}) · [Palavras](${hub}) | Mapa |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina a fenar nem a curar.  
- Não é ficha de *Trigonella* (feno-grego) nem de genética.  
- Não funde *pheno* com *fēnum*.

## Status

**Aprovado na série Palavras** — *feno* ← lat. *fēnum*; *pheno* / fino / ração noutras salas. [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Planta](${planta}) · [▶ Bode](${bode}) · [▶ Ração](${racao}) · [▶ Polimorfismo](${polimorfismo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **feno** (“hay”) — **dried herb** for the yard. Field: inspect *Feno*. [The ear glues](${orelhaCola}) **feno** to **pheno** / [phenotype](${WIKI_PHENO}) and to a **hay smell** in the cure. The etymon **cuts**: Lat. *fēnum*. Not what **appears**. Not [industrial feed](${racao}).

> [Wiktionary](${WIKT}), Lat. [*faenum*](${WIKT_LA}). Close: [Valeu !!!](${mantra}).

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *feno* ← *fēnum*; pheno / feed in other rooms. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**feno** («heno») — **hierba seca** para el corral. Pedido: inspeccionar *Feno*. [La oreja pega](${orelhaCola}) **feno** a **pheno** / [fenotipo](${WIKI_PHENO}) y al **olor a heno** de la cura. El étimo **corta**: lat. *fēnum*. No es lo que **aparece**. No es [ración](${racao}) industrial.

> [Wikcionario](${WIKT}), lat. [*faenum*](${WIKT_LA}). Cierre: [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *feno* ← *fēnum*; pheno / ración en otras salas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildFenoPost() {
  const { body, contentEn, contentEs } = buildFenoBodies();
  return makePalavra({
    title: 'Inspeção: Feno — fēnum; a orelha cola pheno',
    titleEn: 'Inspection: Feno — fēnum; the ear glues pheno',
    titleEs: 'Inspección: Feno — fēnum; la oreja pega pheno',
    excerpt:
      'Palavras: feno ← lat. fēnum (erva seca); ≠ pheno / fenótipo ≠ fino ≠ ração; Valeu !!!',
    excerptEn:
      'Words: feno ← Lat. fēnum (dried herb); ≠ pheno / phenotype ≠ fino ≠ feed; Valeu !!!',
    excerptEs:
      'Palabras: feno ← lat. fēnum (hierba seca); ≠ pheno / fenotipo ≠ fino ≠ ración; ¡Valeu !!!',
    slug: 'inspecao-palavra-feno',
    date: '2026-08-26T13:20:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-feno', 367),
    seriesLabel: 'Feno · fēnum ≠ pheno',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFenoPost,
  buildFenoBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
