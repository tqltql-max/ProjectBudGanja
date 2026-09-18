'use strict';

/**
 * Inspeção Palavras · perseguição
 * Eixos: objeto (lat. persequī) · caça × opressão × obsessão ·
 * prosseguir × caminho × risco · EXIT · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPerseguicaoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const prosseguir = '/posts/post-inspecao-palavra-prosseguir.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wiki = 'https://pt.wiktionary.org/wiki/persegui%C3%A7%C3%A3o';
  const wikiVerb = 'https://pt.wiktionary.org/wiki/perseguir';
  const wikiLat = 'https://en.wiktionary.org/wiki/persequor';

  const body = `## Escopo

Inspeção editorial da palavra **perseguição** — substantivo do acto de **perseguir**: caça, opressão política/religiosa, assédio obsessivo, e, no peito, a ideia de ser **seguido** sem trégua. Esta ficha cobre o **objeto** (latim *persequī* / *persequor* ← *per-* + *sequī*), a família (*perseguir*, *perseguido*…), o contraste com [prosseguir](${prosseguir}), e o fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · perseguição](${wiki}), [perseguir](${wikiVerb}), [persequor (EN)](${wikiLat}), série [Palavras](${hub}). **Ficha ≠ relatório de direitos humanos nem diagnóstico clínico.** Tom: Inspetor BudGanja — nomear a perseguição com [verdade](${verdade}) e [respeito](${respeito}); não romantizar o papel de caçador nem o de presa.

**Gatilho tipográfico:** *Perseguiçao* / *perseguiçao* → **perseguição**.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **perseguição** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | *perseguir* + *-ção* ← latim *persequī* / *persequor* («seguir até ao fim, caçar, insistir») ← *per-* + *sequī* («seguir») — confiança: **alta** |
| Família | *perseguir* · *perseguido* · *perseguidor* · *perseguimento* (raro) · *perseguível* |
| Cognatos / paralelos | esp. *persecución* · fr. *persécution* · it. *persecuzione* · ing. *persecution* / *pursuit* · lat. *persecūtio* |
| Tipo BudGanja | Palavra — caça × opressão × obsessão × delírio de ser seguido |
| Elo movimento | [caminho](${caminho}) · [prosseguir](${prosseguir}) · [gesto](${gesto}) · [EXIT](${exit}) |
| Elo peito | [risco](${risco}) · [medo](${medo}) · [alma](${alma}) · [verdade](${verdade}) · [respeito](${respeito}) |
| Elo tempo / vida | [tempo](${tempo}) · [vida](${vidaPalavra}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · perseguição](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o nome do **seguir hostil ou obsessivo** — alguém (ou algo) que não larga o rasto. No lab: separar **caça física**, **opressão histórica**, **assédio** e **medo de ser seguido**; nenhum eixo apaga os outros.

## 2. Hipóteses e método

**H1:** objeto = *persequī* → *perseguir* → *perseguição* (romance; alta confiança).  
**H2:** *per-* intensifica o *seguir* — «seguir **através** / até ao fim» — distinto de [prosseguir](${prosseguir}) (*pro-* = adiante, retoma deliberada).  
**H3:** no BR vivo, *perseguição* cobre caça, política, stalking e paranoia; o ofício é **nomear qual camada** está em jogo.  
**H4:** fecho = [EXIT](${exit}) + [Faça o melhor!](${mantra}) — sair do aperto com método, não com fuga cega.

Passos:

1. Fixar forma + étimo (*per-* + *sequī*).  
2. Tabela de camadas (caça / política / obsessão / peito).  
3. Contraste *perseguição* × *prosseguir*.  
4. Rede BudGanja com URLs reais.  
5. Limites + status.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Lat. *persequor* | *per-* + *sequor* — seguir até ao fim, caçar, insistir | Alta |
| Morfologia PT | *perseguir* + *-ção* (acto / efeito) | Alta |
| Lat. *persecūtio* | Substantivo culto paralelo (via romance / erudita) | Alta–média |
| Confusão com *prosseguir* | Mesma raiz *sequī*, prefixos diferentes | Alta (aviso lab) |

**Veredicto etimológico:** origem **latina clara** (*persequī*); a morfologia portuguesa *-ção* nomeia o **acto**. Cognatos europeus confirmam a via.

## 4. Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Caça / perseguição literal | perseguir a presa; perseguição policial | Movimento no [caminho](${caminho}) — hostil |
| Opressão política / religiosa | perseguição a minorias; asilo | Elo histórico — [respeito](${respeito}) e [verdade](${verdade}) |
| Assédio / stalking | perseguição obsessiva | [Risco](${risco}) concreto — não é metáfora leve |
| Peito / paranoia | «delírio de perseguição»; sentimento de ser seguido | Nomear o medo ([medo](${medo})) sem fechar diagnóstico |
| Figurativo | perseguido por dívidas, culpa, [tempo](${tempo}) | Metáfora viva — não apaga os eixos reais |
| Contraste irmão | [prosseguir](${prosseguir}) | *Pro-* = continuar com ofício; *per-* = seguir até apertar |

## 5. Perseguição × prosseguir × caminho × EXIT

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **[prosseguir](${prosseguir})** | Retomar / continuar | Seguimento **deliberado** no trabalho |
| **perseguição** | Seguir sem trégua (hostil ou obsessivo) | Seguimento que **aperta** |
| **[caminho](${caminho})** | Via / método | Onde se foge ou se escolhe o passo |
| **[EXIT](${exit})** | Saída do aperto | Ofício de sair — salvação com método |
| **[gesto](${gesto})** | Acção concreta | Nomear, pedir ajuda, mudar rota |

**Anti-armadilha:** confundir *prosseguir* com *perseguir* = misturar ofício com caça. Outra: romantizar a perseguição («prova de amor», «destino») = apagar [risco](${risco}).

## 6. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [prosseguir](${prosseguir}) | Irmão lexical (*sequī*) — retoma ≠ caça |
| [caminho](${caminho}) · [gesto](${gesto}) | Onde e como se move |
| [EXIT](${exit}) | Saída do que aperta |
| [risco](${risco}) · [medo](${medo}) | Camadas de perigo e peito |
| [verdade](${verdade}) · [respeito](${respeito}) | Nomear sem glamourizar |
| [alma](${alma}) · [vida](${vidaPalavra}) · [tempo](${tempo}) | Peito e duração |
| [Faça o melhor!](${mantra}) | Ofício no aperto — o melhor possível **hoje** |
| Hub [Palavras](${hub}) · [Inspeções](${hubAll}) | Mapa geral |

### Como ler

1. Entrar pela **palavra** (esta ficha).  
2. Separar: caça · opressão · obsessão · peito.  
3. Se for aperto, cruzar [EXIT](${exit}) e [risco](${risco}).  
4. Não confundir com [prosseguir](${prosseguir}).  
5. Fechar com [Faça o melhor!](${mantra}) — e voltar ao [hub](${hubAll}).

## 7. Avaliação BudGanja

### Forças

- Documenta *persequī* e a morfologia *-ção*.  
- Separa caça, política, stalking e medo.  
- Liga [prosseguir](${prosseguir}), [EXIT](${exit}) e [respeito](${respeito}) sem moralismo barato.

### Limites

- Não é tratado jurídico nem clínico.  
- Não inventaria todas as gírias regionais de «ser perseguido».  
- Casos reais de assédio / violência pedem apoio especializado — fora do escopo da ficha.

## 8. Como repetir o método

1. Fixar forma + étimo (*per-* + *sequī*).  
2. Tabela de camadas sem fundir.  
3. Um contraste lexical ([prosseguir](${prosseguir})) + um elo de saída ([EXIT](${exit})).  
4. Declaração: palavra ≠ relatório de direitos humanos.  
5. Status.

## Status

**Aprovado** — **perseguição** fichada: *persequī*, camadas (caça × opressão × obsessão × peito), contraste com [prosseguir](${prosseguir}), rede com [caminho](${caminho}), [risco](${risco}), [EXIT](${exit}) e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Prosseguir](${prosseguir}) · [▶ EXIT](${exit}) · [▶ Risco](${risco}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **perseguição** (“persecution / pursuit”) — the act of **perseguir**: chase, political/religious oppression, obsessive stalking, and the felt sense of being followed. Covers **object** (Lat. *persequī* / *persequor* ← *per-* + *sequī*), family (*perseguir*…), contrast with [prosseguir](${prosseguir}), and [Do your best!](${mantra}).

> Method note: [Wiktionary · perseguição](${wiki}), [persequor](${wikiLat}). Word sheet ≠ human-rights report or clinical diagnosis. Name with [verdade](${verdade}) and [respeito](${respeito}); do not romanticize hunter or prey.

Typo trigger: *Perseguiçao* → **perseguição**.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **perseguição** |
| Etymon | *perseguir* + *-ção* ← Lat. *persequī* (*per-* + *sequī*) — high confidence |
| Lab type | Chase × oppression × obsession × fear of being followed |
| Links | [prosseguir](${prosseguir}) · [caminho](${caminho}) · [EXIT](${exit}) · [risco](${risco}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Layers

Literal chase · political/religious persecution · stalking · paranoia / “delírio de perseguição” · figurative (debts, guilt, time). Contrast: [prosseguir](${prosseguir}) = deliberate continue; *perseguição* = follow that squeezes.

## 3. Do your best!

Best possible **today**, in the squeeze — with [EXIT](${exit}) as craft exit, not blind flight.

## Status

**Approved** — *persequī* · layers mapped · links to prosseguir, EXIT, risco · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Prosseguir](${prosseguir}) · [▶ EXIT](${exit}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **perseguição** («persecución / persecución de rastro») — acto de **perseguir**: caza, opresión política/religiosa, acoso obsesivo y la sensación de ser seguido. Cubre el **objeto** (lat. *persequī* / *persequor* ← *per-* + *sequī*), la familia (*perseguir*…), el contraste con [prosseguir](${prosseguir}), y [¡Haz lo mejor!](${mantra}).

> Nota metodológica: [Wikcionario · perseguição](${wiki}), [persequor](${wikiLat}). Ficha ≠ informe de derechos humanos ni diagnóstico clínico. Nombrar con [verdade](${verdade}) y [respeito](${respeito}); no romantizar cazador ni presa.

Gatillo tipográfico: *Perseguiçao* → **perseguição**.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **perseguição** |
| Étimo | *perseguir* + *-ção* ← lat. *persequī* (*per-* + *sequī*) |
| Tipo lab | Caza × opresión × obsesión × miedo a ser seguido |
| Vínculos | [prosseguir](${prosseguir}) · [caminho](${caminho}) · [EXIT](${exit}) · [risco](${risco}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Capas

Caza literal · persecución política/religiosa · stalking · paranoia · figurado. Contraste: [prosseguir](${prosseguir}) = continuar deliberado; *perseguição* = seguir que aprieta.

## 3. ¡Haz lo mejor!

Lo mejor posible **hoy**, en el aprieto — con [EXIT](${exit}) como salida de oficio, no huida ciega.

## Estado

**Aprobada** — *persequī* · capas mapeadas · vínculos con prosseguir, EXIT, risco · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Prosseguir](${prosseguir}) · [▶ EXIT](${exit}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPerseguicaoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildPerseguicaoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 108;
  return makePalavra({
    title: 'Inspeção: Perseguição — caça, opressão e o seguir que aperta',
    titleEn: 'Inspection: Perseguição — chase, oppression, and the follow that squeezes',
    titleEs: 'Inspección: Perseguição — caza, opresión y el seguir que aprieta',
    excerpt:
      'Palavras: «perseguição» (lat. *persequī*) — caça × opressão × obsessão; contraste prosseguir; elos caminho, risco, EXIT; Faça o melhor!',
    excerptEn:
      'Words: “perseguição” (Lat. *persequī*) — chase × oppression × obsession; contrast prosseguir; links caminho, risco, EXIT; Do your best!',
    excerptEs:
      'Palabras: «perseguição» (lat. *persequī*) — caza × opresión × obsesión; contraste prosseguir; vínculos caminho, risco, EXIT; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-perseguicao',
    date: '2026-08-03T17:20:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Perseguição · palavra',
    coverImage: '/imagens/inspecoes/perseguicao-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPerseguicaoPost,
  buildPerseguicaoBodies
};
