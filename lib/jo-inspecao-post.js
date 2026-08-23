'use strict';

/**
 * Inspeção Palavras · Jó
 * Eixos: hebr. ʾIyyōḇ · figura / livro · sopro «Deus sois Jo» ·
 * ≠ Jobs (Steve) · ≠ EN job · ≠ João · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/jo-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/J%C3%B3';
const WIKI = 'https://pt.wikipedia.org/wiki/Livro_de_J%C3%B3';
const WIKI_FIG = 'https://pt.wikipedia.org/wiki/J%C3%B3';
const WIKT_EN = 'https://en.wiktionary.org/wiki/Job#English';

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
  return `Jó.
Uma sílaba com acento.
Não é emprego.
Não é o fundador.

É o nome de um homem
no livro que leva o nome.
Fala com Deus.
Não é Deus.

«Deus sois Jo»
é o teclado a juntar
o céu, o vós e o justo.

Valeu !!!
com respeito —
sem sermão sobre a prova.`;
}

function poemEn() {
  return `Jó.
One syllable, with an accent.
Not a job.
Not the founder.

It is a man’s name
in the book that bears the name.
He speaks with God.
He is not God.

“Deus sois Jo”
is the keyboard joining
the sky, the you-plural, and the just.

Valeu !!!
with respect —
no sermon on the trial.`;
}

function poemEs() {
  return `Jó.
Una sílaba con acento.
No es un empleo.
No es el fundador.

Es el nombre de un hombre
en el libro que lleva el nombre.
Habla con Dios.
No es Dios.

«Deus sois Jo»
es el teclado juntando
el cielo, el vos y el justo.

¡Valeu !!!
con respeto —
sin sermón sobre la prueba.`;
}

function buildJoBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-jo.html';
  const deus = '/posts/post-inspecao-palavra-deus.html';
  const biblia = '/posts/post-inspecao-palavra-biblia.html';
  const jobs = '/posts/post-inspecao-palavra-jobs.html';
  const adeus = '/posts/post-inspecao-expressao-adeus.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const chosen = '/posts/post-inspecao-serie-the-chosen.html';

  const body = `## Escopo

Inspeção editorial da palavra **[Jó](${self})** — nome próprio (hebr. *ʾIyyōḇ*) e título do **Livro de Jó** na [Bíblia](${biblia}). Pedidos de campo: *inspeção pala Jó* · *Deus sois Jo* · *Bibiblia*. Objecto: o **vocábulo** e a **figura nomeada**. Não é sermão sobre o sofrimento. Não é teodiceia. [Respeito](${respeito}) ao texto e a quem crê; **sem** catecismo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · Jó](${WIKT}), [Livro de Jó](${WIKI}), [Jó (figura)](${WIKI_FIG}), [Job (EN)](${WIKT_EN}). **Ficha ≠ comentário bíblico, ≠ biografia de Steve [Jobs](${jobs}), ≠ manual de emprego (EN *job*).** Série [Palavras](${hub}).

**Gatilho:** *Jó* / *Jo* / *Job* / *Deus sois Jo* / *paciência de Jó*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Jó** (PT; acento no ó) |
| Formas vivas | *Jo* (teclado) · EN/lat. *Job* · hebr. *ʾIyyōḇ* · gr. *Ἰώβ* |
| Classe | Nome próprio · também título de livro |
| Étimo (trabalho) | Hebraico *אִיּוֹב* — hipóteses («perseguido / o que volta») **em disputa**; confiança no **referente**: **alta**; no étimo miúdo: **baixa–média** |
| Onde vive | [Bíblia](${biblia}) — Ketuvim / livros sapienciais; cânones cristãos |
| Tipo BudGanja | Palavra — nome × livro × cortes de orelha |
| Não é | [Jobs](${jobs}) (Steve / emprego EN) · *João* · *jóia* · o próprio [Deus](${deus}) |
| Fonte | [Livro de Jó](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome** de um homem do relato e o **título** do livro. Jó **fala com** [Deus](${deus}); a ficha **não** cola os dois nomes.

## 2. Sopro de campo — *Deus sois Jo*

A boca juntou três peças. [A orelha cola](${orelhaCola}); o ofício **corta**.

| Peça | Sala |
|------|------|
| **[Deus](${deus})** | Vocábulo do céu latino — ficha já feita |
| **sois** | *vós sois* — tratamento litúrgico / honra (2.ª pl.); **não** é o nome Jó |
| **Jo** | Lapso de teclado de **Jó** (falta o acento) |

**H-sopro:** *Deus sois Jo* ≠ «Deus é Jó». No livro, Jó **interroga** e **responde**; não toma o lugar do nome.  
**H-sois:** *sois* aponta o **vós** (oração, trato antigo); não abre lema próprio nesta página.

## 3. Hipóteses

**H1:** *Jó* PT = a figura / o livro hebraico *ʾIyyōḇ* via lat. *Iob* / *Job* — alta.  
**H2:** o étimo hebraico do nome **não** está fechado — o lab não escolhe rei.  
**H3:** EN *Job* (o livro) e EN *job* (emprego) são **homógrafos ingleses**; no PT o acento **corta** (*Jó* ≠ *job*).  
**H4:** [Jobs](${jobs}) (Steve) é outra âncora — culto de fundador, não o justo do relato.  
**H5:** *João* (evangelista / nome) é outra palavra; a orelha pode colar *Jo-* — o étimo não.  
**H6:** fecho = [Valeu !!!](${mantra}).

## 4. Salas — o que a orelha cola

| Cola | Corte |
|------|-------|
| **[Jobs](${jobs})** / *job* | Emprego ou fundador Apple — **não** este Jó |
| **João** | Outro nome bíblico (graça / João) |
| **jóia** | Objecto / elogio — outra raiz |
| **[Deus](${deus})** | Destinatário do diálogo no livro; **≠** o nome do homem |
| **[Bíblia](${biblia})** | O **estante** onde o livro mora; *Bibiblia* = lapso da estante |
| **Paciência de Jó** | Provérbio PT — usa o nome; **não** é doutrina desta ficha |
| **[The Chosen](${chosen})** | Série; outro recorte dos Evangelhos — **não** o Livro de Jó |

## 5. O livro (só o necessário)

O **Livro de Jó** é poema / diálogo / prólogo-epílogo no cânone. Tema clássico: o justo à prova e a fala com [Deus](${deus}). Esta ficha **não** resume capítulos, **não** escolhe tradução e **não** prega uma moral da prova.

| Uso PT | Ofício no lab |
|--------|----------------|
| «o Livro de Jó» | Título — apontar a [Bíblia](${biblia}) |
| «paciência de Jó» | Provérbio — rasto do nome na rua |
| «pobre como Jó» | Outro rasto oral — não é laudo |

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Deus](${deus}) · [A Deus!!!](${adeus}) | O nome e a despedida — cluster irmão |
| [Bíblia](${biblia}) | O livro-estante; lapso *Bibiblia* |
| [Jobs](${jobs}) | O corte obrigatório (emprego / Steve) |
| [alma](${alma}) · [vida](${vida}) · [verdade](${verdade}) · [respeito](${respeito}) | Ofício |
| [língua portuguesa](${lingua}) | Acento: **Jó** |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é comentário teológico nem juízo sobre o sofrimento de ninguém.  
- Não cita tradução comercial longa.  
- Não funde Jó com [Deus](${deus}) nem com [Jobs](${jobs}).  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — *Jó* fichado como nome / livro (*ʾIyyōḇ*); sopro *Deus sois Jo* cortado em três salas; ≠ Jobs ≠ emprego.

[▶ Palavras](${hub}) · [▶ Deus](${deus}) · [▶ Bíblia](${biblia}) · [▶ Jobs](${jobs}) · [▶ Valeu !!!](${mantra}) · [Livro de Jó](${WIKI})
`;

  const contentEn = `## Scope

Inspection of Portuguese **[Jó](${self})** — Heb. *ʾIyyōḇ*; the figure and the **Book of Job** in the [Bible](${biblia}). Field: *Deus sois Jo* (God + liturgical *sois* + unaccented *Jo*). Not a sermon. Not Steve [Jobs](${jobs}). Not English *job* (employment). He speaks **with** [Deus](${deus}); he is not the name.

## Status

**Approved in Words.** [Valeu !!!](${mantra})

[▶ Deus](${deus}) · [▶ Bible](${biblia}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[Jó](${self})** — heb. *ʾIyyōḇ*; la figura y el **Libro de Job** en la [Biblia](${biblia}). Campo: *Deus sois Jo*. No es sermón. No es Steve [Jobs](${jobs}). No es el *job* inglés. Habla **con** [Deus](${deus}); no es el nombre.

## Estado

**Aprobada en Palabras.** [¡Valeu !!!](${mantra})

[▶ Deus](${deus}) · [▶ Biblia](${biblia}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildJoPost() {
  const { body, contentEn, contentEs } = buildJoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-jo', 283);
  return makePalavra({
    title: 'Inspeção: Jó — o nome, o livro; ≠ Jobs ≠ emprego',
    titleEn: 'Inspection: Jó — the name, the book; ≠ Jobs ≠ a job',
    titleEs: 'Inspección: Jó — el nombre, el libro; ≠ Jobs ≠ empleo',
    excerpt:
      'Palavras: Jó (ʾIyyōḇ) — figura e livro; sopro Deus sois Jo; ≠ Jobs ≠ job ≠ João; Valeu !!!',
    excerptEn:
      'Words: Jó (ʾIyyōḇ) — figure and book; field Deus sois Jo; ≠ Jobs ≠ job; Valeu !!!',
    excerptEs:
      'Palabras: Jó (ʾIyyōḇ) — figura y libro; sopro Deus sois Jo; ≠ Jobs ≠ empleo; ¡Valeu !!!',
    slug: 'inspecao-palavra-jo',
    date: '2026-08-23T18:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Jó · palavra',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildJoPost, buildJoBodies, poemPt, poemEn, poemEs };
