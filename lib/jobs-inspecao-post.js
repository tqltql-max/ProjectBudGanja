'use strict';

/**
 * Inspeção Palavras · Jobs
 * Eixos: EN jobs (trabalhos) · nome próprio (Steve Jobs) · job × programa
 * Ficha de palavra, não biografia nem review da Apple.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildJobsBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-palavra-jobs.html';
  const figura = '/posts/post-inspecao-figura-steve-jobs.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const programa = '/posts/post-inspecao-palavra-programa.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const multitask = '/posts/post-inspecao-palavra-multitask.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wikt = 'https://en.wiktionary.org/wiki/job';
  const wikiJobs = 'https://en.wikipedia.org/wiki/Steve_Jobs';
  const wikiPt = 'https://pt.wikipedia.org/wiki/Steve_Jobs';
  const wikiJobComp = 'https://en.wikipedia.org/wiki/Job_(computing)';
  const wikiProgram = 'https://en.wikipedia.org/wiki/Computer_program';

  const body = `## Escopo

Inspeção editorial da palavra **[Jobs](${self})** — no português do Brasil quase sempre **nome próprio** (Steve Jobs) sentado em cima do inglês **jobs** («trabalhos», plural de *job*). Esta ficha cobre o **objeto lexical**, o **choque de camadas** (emprego × sobrenome × ídolo tech), a camada de **informática** (*job* × [programa](${programa})) e a **correção BudGanja**: ofício com rasto, sem pedestal. Pessoa: [Steve Jobs](${figura}). Elos: [skill](${skill}), [ídolo](${idolo}), [criatividade](${criatividade}), [genial](${genial}), [caminho](${caminho}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · job](${wikt}), [Job (computing)](${wikiJobComp}), [Computer program](${wikiProgram}), [Steve Jobs (EN)](${wikiJobs}), [Steve Jobs (PT)](${wikiPt}), série [Palavras](${hub}). **Ficha ≠ biografia, ≠ review da Apple, ≠ manual de SO.** Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Jobs** (maiúscula no BR) · *jobs* (EN, comum) |
| Camadas | 1) EN *job/jobs* = trabalho / emprego / tarefa · 2) sobrenome anglo · 3) atalho cultural «o Jobs» · 4) informática: unidade de trabalho ≠ [programa](${programa}) |
| Classe | Substantivo próprio (uso BR dominante) · comum EN (*jobs*) |
| Étimo *job* (trabalho) | Inglês *job* «peça de trabalho» (séc. XVI; origem discutida) — confiança: **alta** no sentido, **média** no étimo remoto |
| Étimo *Jobs* (nome) | Sobrenome inglês, patronímico de **Job** (bíblico *Jó* / hebr. *Iyyōb*) — confiança: **alta** (antroponímia); **não** igualar Jó ao fundador |
| Tipo BudGanja | Palavra — trabalhos × nome × culto de fundador |
| Elo ofício | [skill](${skill}) · [gesto](${gesto}) · [caminho](${caminho}) · [Faça o melhor!](${mantra}) |
| Elo culto | [ídolo](${idolo}) · [genial](${genial}) · [criatividade](${criatividade}) |
| Elo língua / tech | [língua portuguesa](${lingua}) · [Grok](${grok}) · [pattern](${pattern}) · [programa](${programa}) |
| Fonte | [job (EN)](${wikt}) · [job (computing)](${wikiJobComp}) · [Steve Jobs](${wikiPt}) |
| Data | ${inspected} |

**O que é o objeto:** não é a vida completa de Steven Paul Jobs (1955–2011) — isso fica na [ficha de pessoa](${figura}). É o **vocábulo** que, no BR, aponta para um homem — e, em inglês, aponta para **os trabalhos**. Inspecionar Jobs = não deixar o pedestal comer a palavra *job*.

## 2. Três camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **jobs** (EN comum) | Trabalhos, empregos, tarefas — *odd jobs*, *job market* | Alta |
| **Job / Jó** | Nome bíblico de prova e persistência — **outra ficha**, outro ofício | Alta (separar) |
| **Jobs** (BR) | Atalho oral: Steve Jobs, Apple, «gênio», keynote, design | Alta (uso vivo) |
| **Choque útil** | O sobrenome do ídolo tech **é** o plural inglês de trabalho | Alta (coincidência onomástica que o lab lê) |
| **Culto** | «Think different» como religião de produto | Alta–média (mapa cultural, não teologia) |

**H1:** no BR, **Jobs** entra primeiro como **pessoa-marca**, não como plural de *job*.  
**H2:** o inglês *jobs* continua a nomear **trabalho** — e o lab recusa apagar essa camada.  
**H3:** [ídolo](${idolo}) avisa quando a admiração come o [gesto](${gesto}): citar Jobs **sem** fazer o próprio ofício.

## 3. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Feed / keynote** | Messias da inovação | Pessoa + empresa + mito editado |
| **CV / hustle** | «Seja como o Jobs» | Identidade comprada; [skill](${skill}) vazio |
| **Ofício** | Design = magia | [Gesto](${gesto}) + [caminho](${caminho}) + recusa + rasto |
| **Palavra EN** | Só o apelido famoso | *jobs* = trabalhos — o chão do ofício |
| **BudGanja** | Ficha de fã | Mapa lexical: emprego × nome × pedestal |

**H-parece:** Jobs = atalho de génio.  
**H-é:** Jobs = **nome** sobre **trabalhos**; génio sem rasto é [ídolo](${idolo}).

**Veredicto contraste:** o que parece = pedestal Apple; o que é = palavra com duas portas (job / Jobs). Entrar pela porta do ofício.

## 4. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Jobs inventou o iPhone, logo é santo» | Crédito de produto ≠ santidade; ver [ídolo](${idolo}) |
| «Quero um job como o Jobs» | *job* = trabalho; Jobs = nome. Não confundir emprego com mito |
| «Criatividade = ser o próximo Jobs» | [Criatividade](${criatividade}) é gesto, não cosplay de turtleneck |
| «Skill de founder» | [Skill](${skill}) pede rasto, não slide de keynote |
| «Faça diferente» (vazio) | Fechar com [Faça o melhor!](${mantra}) **neste** [caminho](${caminho}) |

### Ofício correcto (mapa curto)

1. Se disser **Jobs**, saber se fala de **pessoa** ou de **trabalhos**.  
2. Admirar o feito ([genial](${genial})) sem entregar o [gesto](${gesto}).  
3. Treinar [skill](${skill}) com rasto — não o slogan.  
4. Fechar com [Faça o melhor!](${mantra}).

**Veredicto correção:** **Jobs ≠ manual de vida.** No lab, a palavra vale quando aponta trabalho real — *jobs* — ou quando nomeia um homem **sem** o transformar em relíquia.

## 5. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Atalho de pessoa** | «O Jobs dizia…» | Bom: citar com fonte · Mau: oráculo sem rasto |
| **Elogio de ofício** | «Isso é coisa de Jobs» (cuidado com o detalhe) | Bom: se houver gesto · Mau: magia de marca |
| **Emprego (EN no BR)** | «tenho dois jobs» / *side job* | Bom: nomear trabalho · Mau: glamour de hustle vazio |
| **Ídolo tech** | Keynote, garagem, «stay hungry» | Bom: mapear o mito · Mau: religião de produto |
| **Troca Jó / Jobs** | Confundir o bíblico com o fundador | Mau: misturar provas; manter camadas |

## 6. Anti-culto · Faça o melhor!

| Armadilha | Leitura |
|-----------|---------|
| **Fundador = profeta** | Persona editada; [verdade](${verdade}) pede limite |
| **Cosplay de génio** | Roupa e frase; some o [caminho](${caminho}) |
| **Hustle eterno** | *jobs* no plural como glória — esgota o peito |
| **Nome de ferramenta = Deus** | Ver [Grok](${grok}): intensidade limpa, sem divinizar |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Faça o melhor!](${mantra}) — o melhor **neste** trabalho, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Ser o Jobs» = falso ofício |
| Rede | [skill](${skill}) · [ídolo](${idolo}) · [criatividade](${criatividade}) · [gesto](${gesto}) |

**Veredicto:** Faça o melhor **sem o culto do fundador** — *jobs* como trabalhos; Jobs como nome inspecionado, não altar.

## Hipóteses (síntese)

**H1:** *job* EN = peça de trabalho; *Jobs* BR = atalho de Steve Jobs.  
**H2:** parece messias da inovação; é palavra com camadas — emprego × nome × mito.  
**H3:** elos = [skill](${skill}) · [ídolo](${idolo}) · [criatividade](${criatividade}) · [genial](${genial}).  
**H4:** fecho [Faça o melhor!](${mantra}); ficha ≠ biografia.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Steve Jobs (pessoa)](${figura}) | Casa, iPad 2010, mito do «celular aos 18» |
| [Skill](${skill}) · [Gesto](${gesto}) · [Caminho](${caminho}) | Ofício com rasto |
| [Ídolo](${idolo}) · [Genial](${genial}) | Admirar o feito sem pedestal |
| [Criatividade](${criatividade}) · [Verdade](${verdade}) | Inventar sem mentir o mito |
| [Grok](${grok}) · [pattern](${pattern}) | Nomes tech no solo BR |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Empréstimo e maiúscula |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Fecho sem culto |

## Limites

- Não é biografia de Steve Jobs nem história da Apple.  
- Não julga fãs; mapeia o **vocábulo** e o **culto de fundador**.  
- *Jó* bíblico fica nomeado só para **não colar** as provas.

## Status

**Aprovado** — **Jobs** fichado: EN *jobs* (trabalhos) × nome próprio no BR; anti-pedestal; elos [skill](${skill}) · [ídolo](${idolo}) · [criatividade](${criatividade}); fecho [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Skill](${skill}) · [▶ Ídolo](${idolo}) · [▶ Criatividade](${criatividade}) · [▶ Gesto](${gesto}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **Jobs** — in Brazilian Portuguese mostly a **proper name** (Steve Jobs) sitting on English **jobs** (work, plural of *job*). Covers the **lexical object**, the **layer clash** (employment × surname × tech idol), and the BudGanja correction: craft with a trail, no pedestal. Links: [skill](${skill}), [ídolo](${idolo}), [criatividade](${criatividade}), [Do your best!](${mantra}).

> Method note: [job](${wikt}), [Steve Jobs](${wikiJobs}). **Not a biography, not an Apple review.**

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **Jobs** (BR) · *jobs* (EN common noun) |
| Path | EN *job* “piece of work” × surname from biblical **Job** × Steve Jobs as cultural shortcut |
| Links | [skill](${skill}) · [ídolo](${idolo}) · [gesture](${gesto}) · [path](${caminho}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** messiah of innovation.  
**Is:** a **name** on top of **jobs** (work). Genius without a trail is [ídolo](${idolo}).

## 3. BudGanja correction

**Jobs ≠ life manual.** If you say Jobs, know whether you mean a **person** or **work**. Admire the deed ([genial](${genial})) without handing over the [gesture](${gesto}). Train [skill](${skill}) with a trail. Close with [Do your best!](${mantra}).

## Status

**Approved** — EN *jobs* × proper name in BR; anti-pedestal; links [skill](${skill}) · [ídolo](${idolo}); [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Skill](${skill}) · [▶ Ídolo](${idolo}) · [▶ Gesture](${gesto}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Jobs** — en el portugués de Brasil casi siempre **nombre propio** (Steve Jobs) sobre el inglés **jobs** (trabajos, plural de *job*). Cubre el **objeto léxico**, el **choque de capas** (empleo × apellido × ídolo tech) y la corrección BudGanja: oficio con rastro, sin pedestal. Vínculos: [skill](${skill}), [ídolo](${idolo}), [criatividade](${criatividade}), [¡Haz lo mejor!](${mantra}).

> Nota: [job](${wikt}), [Steve Jobs](${wikiJobs}). **No es biografía ni reseña de Apple.**

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **Jobs** (BR) · *jobs* (EN común) |
| Camino | EN *job* “pieza de trabajo” × apellido de **Job** bíblico × atajo cultural Steve Jobs |
| Vínculos | [skill](${skill}) · [ídolo](${idolo}) · [gesto](${gesto}) · [camino](${caminho}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** mesías de la innovación.  
**Es:** un **nombre** sobre **trabajos**. Genio sin rastro es [ídolo](${idolo}).

## 3. Corrección BudGanja

**Jobs ≠ manual de vida.** Saber si se habla de **persona** o de **trabajo**. Admirar el hecho sin entregar el [gesto](${gesto}). Entrenar [skill](${skill}) con rastro. Cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — EN *jobs* × nombre propio en BR; anti-pedestal; vínculos [skill](${skill}) · [ídolo](${idolo}); [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Skill](${skill}) · [▶ Ídolo](${idolo}) · [▶ Gesto](${gesto}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wikiJobs };
}

function buildJobsPost() {
  const { body, contentEn, contentEs, wikiJobs } = buildJobsBodies();
  let seriesOrder = 118;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-jobs');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 200) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 118 */
  }

  return makePalavra({
    title:
      'Inspeção: Jobs — trabalhos em inglês, nome próprio e ofício sem pedestal',
    titleEn:
      'Inspection: Jobs — English work, proper name, craft without a pedestal',
    titleEs:
      'Inspección: Jobs — trabajos en inglés, nombre propio y oficio sin pedestal',
    excerpt:
      'Palavras: «Jobs» — EN jobs (trabalhos) × Steve Jobs no BR; anti-culto de fundador; elos skill, ídolo e criatividade; Faça o melhor!',
    excerptEn:
      'Words: “Jobs” — EN jobs (work) × Steve Jobs in BR; anti-founder cult; links skill, ídolo and criatividade; Do your best!',
    excerptEs:
      'Palabras: «Jobs» — EN jobs (trabajos) × Steve Jobs en BR; anti-culto de fundador; vínculos skill, ídolo y criatividade; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-jobs',
    date: '2026-08-19T22:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Jobs · palavra',
    coverImage: '/imagens/inspecoes/jobs-palavra-cover.jpg',
    sourceUrl: wikiJobs,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildJobsPost,
  buildJobsBodies
};
