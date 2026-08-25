'use strict';

/**
 * Inspeção Palavras · teologia
 * Eixos: gr. theós + lógos · estudo do divino · gatilho TEologigiA ·
 * ≠ mitologia ≠ Deus (vocábulo) ≠ catecismo ≠ magia · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/teologia-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/teologia';
const WIKT_EN = 'https://en.wiktionary.org/wiki/theology';
const WIKT_THEOS = 'https://en.wiktionary.org/wiki/%CE%B8%CE%B5%CF%8C%CF%82#Ancient_Greek';
const WIKT_LOGOS = 'https://en.wiktionary.org/wiki/%CE%BB%CF%8C%CE%B3%CE%BF%CF%82#Ancient_Greek';
const WIKI = 'https://pt.wikipedia.org/wiki/Teologia';

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
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Teologia.
Não é o altar.
É o nome do estudo
do que a fé chama Deus.

Theós é o divino.
Lógos é o discurso.
Juntos, a palavra que pede
método — não sermão.

Há mitologia ao lado:
o relato que um povo conta.
Há Deus, o vocábulo.
Há o púlpito, outra sala.

Estudar teologia
não funde o lab com o dogma.
Inspeciona o nome.
Respeita quem crê.

Valeu !!!
com theós no sítio
e sem catecismo de ficha.`;
}

function poemEn() {
  return `Teologia.
It is not the altar.
It is the name of the study
of what faith calls God.

Theós is the divine.
Lógos is the discourse.
Together, the word that asks
for method — not a sermon.

Mythology sits beside it:
the tale a people tells.
Deus is the vocable.
The pulpit is another room.

To study theology
does not fuse the lab with dogma.
It inspects the name.
It respects whoever believes.

Valeu !!!
with theós in place
and no catechism of the sheet.`;
}

function poemEs() {
  return `Teologia.
No es el altar.
Es el nombre del estudio
de lo que la fe llama Dios.

Theós es lo divino.
Lógos es el discurso.
Juntos, la palabra que pide
método — no sermón.

Hay mitología al lado:
el relato que un pueblo cuenta.
Hay Deus, el vocablo.
Hay el púlpito, otra sala.

Estudiar teología
no funde el lab con el dogma.
Inspecciona el nombre.
Respeta a quien cree.

¡Valeu !!!
con theós en su sitio
y sin catecismo de ficha.`;
}

function buildTeologiaBodies() {
  const inspected = '2026-08-25';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-teologia.html';
  const mito = '/posts/post-inspecao-palavra-mitologia.html';
  const cat = '/mitologia/';
  const deus = '/posts/post-inspecao-palavra-deus.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const diabo = '/posts/post-inspecao-palavra-diabo.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const etimo = '/posts/post-inspecao-palavra-etimologia.html';
  const tecno = '/posts/post-inspecao-palavra-tecnologia.html';
  const astro = '/guia/astrologia.html';
  const ticao = '/posts/post-inspecao-padre-ticao.html';
  const cruz = '/posts/post-inspecao-cruzamento-estrada-encruzilhada-jesus-cristo.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';

  const body = `## Escopo

Inspeção editorial da palavra **[teologia](${self})** — gr. θεός *theós* («deus / o divino») + λόγος *lógos* («discurso / estudo»). Pedido de campo: **inspeção da palavra e estudo da TEologigiA**.

A grafia viva *TEologigiA* é o mesmo vocábulo com calor gráfico e um *gi* a mais na boca. A forma âncora é **teologia**. «Estudo da teologia» quase repete o étimo: a palavra **já é** o nome desse estudo. Esta ficha inspeciona o **nome**, não ministra o conteúdo da fé.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · teologia](${WIKT}), [theology](${WIKT_EN}), gr. [*theós*](${WIKT_THEOS}), [*lógos*](${WIKT_LOGOS}), [Wikipédia](${WIKI}). **Ficha ≠ catecismo, ≠ sermão, ≠ prova de Deus, ≠ tratado de seminário, ≠ magia.** Respeito a quem crê; respeito a quem não crê. Série [Palavras](${hub}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

**Gatilho:** *TEologigiA* / *teologia* / *theologia* / *estudo da teologia* / *teólogo*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **teologia** (PT) |
| Gatilho de campo | **TEologigiA** (calor gráfico · *gi* a mais) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | gr. θεολογία *theología* ← *theós* + *lógos* — via lat. *theologia* — confiança: **alta** |
| Cognatos | esp. *teología* · fr. *théologie* · ing. *theology* · it. *teologia* · lat. *theologia* |
| Família | *teólogo* · *teológica* · *teológico* · *teologismo* |
| Tipo BudGanja | Palavra — o nome do **estudo do divino**, não o dogma |
| Não é | [mitologia](${mito}) · [Deus](${deus}) (vocábulo) · catecismo · magia · [ídolo](${idolo}) |
| Data | ${inspected} |
| Fonte | [teologia](${WIKT}) |

**O que é o objecto:** o vocábulo que nomeia o **discurso metódico sobre o divino**. No grego, *theós* aponta o deus; *lógos* aponta o estudo. No lab, teologia é **sala de palavra** — [respeito](${respeito}) à fé viva, [verdade](${verdade}) do étimo, sem púlpito na ficha.

## 2. Theós × mythos × Deus × -logia

Família do segundo membro (*lógos*): o lab já fichou irmãs. O primeiro membro **corta**.

| Forma | Primeiro membro | Ofício | Sala |
|-------|-----------------|--------|------|
| **teologia** | *theós* (o divino) | Estudo / discurso da fé viva | Esta ficha |
| **[mitologia](${mito})** | *mŷthos* (o relato) | Ofício de contar os deuses | Lema de [Mitologia](${cat}) |
| **[etimologia](${etimo})** | *étymon* (sentido verdadeiro) | Ofício de perguntar de onde veio a palavra | Método da série Palavras |
| **[tecnologia](${tecno})** | *tékhnē* (ofício / aparelho) | Ofício dos aparelhos | Lema de /tecnologia/ |
| **[astrologia](${astro})** | *ástron* (astro) | Céu nomeado | Guia, não esta ficha |
| **[Deus](${deus})** | lat. *deus* (céu / Uno) | Vocábulo, não o estudo | Palavra irmã |
| **theologia** | grafia latina / EN culto | A mesma peça | Variante, não outro ofício |

**H1:** *teologia* PT = *theós* + *lógos* — alta.  
**H2:** «estudo da teologia» é quase tautologia honesta — o étimo **já diz** estudo.  
**H3:** [mitologia](${mito}) e teologia partilham *-logia* e **não** o primeiro membro: relato × fé viva.  
**H4:** [Deus](${deus}) é o vocábulo; teologia é o **discurso sobre** esse (e outros) nomes.

## 3. TEologigiA — o que a boca fez

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **teologia** | A «certa» | Âncora escrita |
| **TEologigiA** | Erro | Pedido de campo — maiúsculas de calor + *gi* extra |
| **theologia** | Outra palavra | Grafia latina / inglesa culta da mesma peça |
| **teólogo / teológica** | Outro ofício | Família: quem estuda / o adjectivo |

**Veredicto de forma:** a ficha ancora **teologia**. O gatilho *TEologigiA* entra no glossário como boca de campo.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Altar** | Fichar teologia = pregar | Nomear o estudo; [respeito](${respeito}) a quem crê |
| **Mitologia** | É a mesma coisa com outro nome | *mythos* ≠ *theós* — duas salas, um *-logia* |
| **Deus** | Teologia = a ficha Deus | [Deus](${deus}) é vocábulo; esta é o discurso |
| **Estudo da teologia** | Matéria a mais | O étimo já é o estudo — a ficha não substitui o seminário |
| **Cuidado popular** | Toda a teologia é cátedra | [Padre Ticão](${ticao}) é **pessoa** — teologia popular do cuidado, outra sala |

## 5. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *teologia* como estudo do divino, com [respeito](${respeito}) |
| Bom | Mandar o relato para [mitologia](${mito}), o vocábulo para [Deus](${deus}) |
| Bom | Ler [alma](${alma}) · [esperança](${esperanca}) · [cruzamento](${cruz}) como elos, não como esta ficha |
| Mau | Catecismo ou prova de Deus disfarçados de vocábulo |
| Mau | Fundir mitologia, magia e teologia num só altar |
| Mau | Tutorial de conversão ou de ataque à fé |

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=teologia)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Mitologia](${mito}) · [catálogo](${cat}) | Irmã *mythos* + *lógos* |
| [Deus](${deus}) · [ídolo](${idolo}) · [diabo](${diabo}) | Léxico cortado |
| [Etimologia](${etimo}) · [tecnologia](${tecno}) · [Astrologia](${astro}) | Família *-logia* |
| [Alma](${alma}) · [esperança](${esperanca}) | Afecto — sem púlpito nesta ficha |
| [Padre Ticão](${ticao}) | Pessoa — cuidado popular, não este lema |
| [Cruzamento](${cruz}) | Relato × via — literatura / tradição, ≠ esta palavra |
| [Verdade](${verdade}) · [língua](${lingua}) · [respeito](${respeito}) | Ofício |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [eu amo a vida](${amo}) | Fecho |

## Limites

- Não é aula de seminário, homilia nem prova ou negação de Deus.  
- Não inventaria escolas (sistemática, pastoral, libertação, etc.) além do **nome**.  
- [Padre Ticão](${ticao}) e o [cruzamento](${cruz}) não se inspecionam aqui.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **teologia** fichada como *theós* + *lógos*; gatilho *TEologigiA*; cortes ([mitologia](${mito}), [Deus](${deus}), catecismo, magia). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Mitologia](${mito}) · [▶ Deus](${deus}) · [▶ Catálogo](${cat}) · [▶ Poema Vida](/vida/#poema=teologia) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **teologia** — Gr. *theós* + *lógos*. Field: **the word and the study of TEologigiA**. Living spelling *TEologigiA* is the same vocable (heat + extra *gi*). Anchor: **teologia**. “Study of theology” almost repeats the etymon: the word **already names** that study.

Not catechism. Not a sermon. Not proof of God. Sister: [mitologia](${mito}) (*mŷthos*, not *theós*). Vocable: [Deus](${deus}).

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *theós* + *lógos*; cuts mythology, the word Deus, pulpit. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **teologia** — gr. *theós* + *lógos*. Pedido: **la palabra y el estudio de TEologigiA**. La grafía viva *TEologigiA* es el mismo vocablo. Ancla: **teologia**. «Estudio de la teología» casi repite el étimo.

No es catecismo ni sermón. Hermana: [mitologia](${mito}). Vocablo: [Deus](${deus}).

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *theós* + *lógos*; cortes mitología, vocablo Deus, púlpito. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildTeologiaPost() {
  const { body, contentEn, contentEs } = buildTeologiaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-teologia', 330);
  return makePalavra({
    title: 'Inspeção: Teologia — theós + lógos; estudo do divino; ≠ mitologia ≠ catecismo',
    titleEn: 'Inspection: Teologia — theós + lógos; study of the divine; ≠ mythology ≠ catechism',
    titleEs: 'Inspección: Teologia — theós + lógos; estudio de lo divino; ≠ mitología ≠ catecismo',
    excerpt:
      'Palavras: teologia (theós + lógos) — o nome do estudo do divino; gatilho TEologigiA; ≠ mitologia ≠ Deus ≠ púlpito; Valeu !!!',
    excerptEn:
      'Words: teologia (theós + lógos) — the name of the study of the divine; trigger TEologigiA; ≠ mythology ≠ Deus ≠ pulpit; Valeu !!!',
    excerptEs:
      'Palabras: teologia (theós + lógos) — el nombre del estudio de lo divino; gatillo TEologigiA; ≠ mitología ≠ Deus ≠ púlpito; ¡Valeu !!!',
    slug: 'inspecao-palavra-teologia',
    date: '2026-08-25T06:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Teologia · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTeologiaPost,
  buildTeologiaBodies,
  poemPt,
  poemEn,
  poemEs,
  WIKT,
  COVER
};
